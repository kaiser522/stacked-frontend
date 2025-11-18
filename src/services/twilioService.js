import { Client as ConversationsClient } from '@twilio/conversations';
import axios from 'axios';
import userService from './userService';
import { apiBaseUrl } from '../store/api.config';

class TwilioService {
    constructor() {
        this.client = null;
        this.conversations = new Map();
        this.messageListeners = new Map();
        this.baseURL = apiBaseUrl;
    }

    async initialize(userId) {
        try {
            console.log('Initializing Twilio client for user:', userId);

            // Get token from backend
            const response = await axios.get(`${this.baseURL}/messages/twilio/token?identity=${userId}`);

            console.log('Token response:', response.data);

            // Extract token from response (handle different response structures)
            const token = response.data.token || response.data.data?.token || response.data;

            // Initialize Twilio Conversations client
            this.client = await ConversationsClient.create(token);
            console.log('Twilio client created successfully');
            console.log('Client user identity:', this.client.user.identity);

            // Listen for new conversations
            this.client.on('conversationAdded', (conversation) => {
                console.log('New conversation added:', conversation.sid);
                this.setupConversationListeners(conversation);
            });

            // Listen for conversation updates
            this.client.on('conversationUpdated', (conversation) => {
                console.log('Conversation updated:', conversation.sid);
            });

            // Listen for token expiration
            this.client.on('tokenExpired', () => {
                console.warn('Twilio token expired - need to refresh');
            });

            return this.client;
        } catch (error) {
            console.error('Error initializing Twilio client:', error);
            throw error;
        }
    }

    async getOrCreateConversation(participantUserId, participantName) {
        try {
            console.log('Creating/getting conversation for:', participantUserId, participantName);

            // First try to get existing conversation
            const user = localStorage.getItem('__user__');
            const userData = JSON.parse(user);

            // Try to find existing conversation first
            try {
                const existingConversations = await this.getConversations();
                const existingConv = existingConversations.find(conv => {
                    const participants = conv.participants || [];
                    return participants.some(p => p.identity === participantUserId) &&
                        participants.some(p => p.identity === userData?.id);
                });

                if (existingConv) {
                    console.log('✅ Found existing conversation:', existingConv.sid);
                    return existingConv;
                }
            } catch (err) {
                console.log('Could not check existing conversations, proceeding with creation');
            }

            // Create new conversation with consistent naming
            const requestData = {
                userA: userData?.id,
                userB: participantUserId,
                uniqueName: `conv_${userData?.id}_${participantUserId}`,  // Consistent naming pattern
                timestamp: Date.now()
            };

            const response = await axios.post(`${this.baseURL}/messages/twilio/conversation`, requestData);

            // Extract conversationSid from response structure
            const conversationSid = response.data.data?.conversationSid || response.data.conversationSid;

            if (!conversationSid) {
                throw new Error('No conversation SID returned from backend');
            }

            // Try to get conversation from Twilio client with retry logic
            let conversation = this.conversations.get(conversationSid);

            if (!conversation) {
                try {
                    // First attempt - immediate access
                    conversation = await this.client.getConversationBySid(conversationSid);
                    console.log('✅ Got conversation immediately:', conversationSid);
                } catch (clientError) {
                    console.warn('⚠️ Client access failed, conversation may need time to sync:', clientError.message);

                    // If client access fails, wait a bit and try again
                    if (clientError.message?.includes('Forbidden') || clientError.code === 20403) {
                        console.log('🔄 Waiting for conversation to sync...');
                        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds

                        try {
                            conversation = await this.client.getConversationBySid(conversationSid);
                            console.log('✅ Got conversation after retry:', conversationSid);
                        } catch (retryError) {
                            console.warn('⚠️ Still cannot access via client, creating mock conversation for UI');
                            // Create a mock conversation object for UI purposes
                            conversation = {
                                sid: conversationSid,
                                friendlyName: participantName,
                                uniqueName: participantName,
                                participants: [
                                    { identity: JSON.parse(user)?.id },
                                    { identity: participantUserId }
                                ],
                                _isBackendOnly: true // Flag to indicate this needs backend API
                            };
                        }
                    } else {
                        throw clientError;
                    }
                }

                this.conversations.set(conversationSid, conversation);

                // Only set up listeners if we have a real Twilio conversation object
                if (!conversation._isBackendOnly) {
                    this.setupConversationListeners(conversation);
                }
            }

            return conversation;
        } catch (error) {
            console.error('Error getting or creating conversation:', error);
            throw error;
        }
    }

    async getConversations() {
        try {
            const user = localStorage.getItem('__user__');
            // Backend requires identity query parameter
            const identity = JSON.parse(user)?.id;
            const response = await axios.get(`${this.baseURL}/messages/twilio/conversations`, {
                params: { identity, limit: 50 }
            });

            // Extract conversations from response structure (assuming sendResponse wrapper)
            return response.data.data || response.data.conversations || response.data;
        } catch (error) {
            console.error('Error fetching conversations:', error);
            throw error;
        }
    }

    async getConversationMessages(conversationSid) {
        try {
            console.log('Getting messages for conversation:', conversationSid);
            const user = localStorage.getItem('__user__');
            console.log('Current user identity:', JSON.parse(user)?.id);

            // Check if this conversation is backend-only
            const cachedConversation = this.conversations.get(conversationSid);
            if (cachedConversation?._isBackendOnly) {
                console.log('🔄 Using backend API for backend-only conversation');
                const response = await axios.get(`${this.baseURL}/messages/twilio/conversation/${conversationSid}/messages`);
                const backendMessages = response.data.data || response.data.messages || response.data;
                console.log('Messages loaded via backend:', backendMessages.length);
                return backendMessages;
            }

            // Try Twilio client first
            try {
                const conversation = await this.client.getConversationBySid(conversationSid);
                console.log('Conversation loaded:', conversation.sid);
                console.log('Conversation participants:', conversation.participants?.length);

                const messages = await conversation.getMessages();
                console.log('Messages loaded via client:', messages.items.length);
                return messages.items;
            } catch (clientError) {
                console.warn('Client failed, trying backend API:', clientError.message);

                // If client fails, try backend API
                if (clientError.message?.includes('Forbidden') || clientError.code === 20403) {
                    const response = await axios.get(`${this.baseURL}/messages/twilio/conversation/${conversationSid}/messages`);
                    const backendMessages = response.data.data || response.data.messages || response.data;
                    console.log('Messages loaded via backend fallback:', backendMessages.length);

                    // Mark this conversation as backend-only for future requests
                    if (cachedConversation) {
                        cachedConversation._isBackendOnly = true;
                    }

                    return backendMessages;
                }

                throw clientError;
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                code: error.code,
                status: error.status,
                conversationSid
            });

            throw error;
        }
    }

    async sendMessage(conversationSid, messageContent) {
        try {
            const cachedConversation = this.conversations.get(conversationSid);
            const user = localStorage.getItem('__user__');
            // If this is a backend-only conversation, use backend API
            if (cachedConversation?._isBackendOnly) {
                console.log('🔄 Sending message via backend API for backend-only conversation');
                const response = await axios.post(`${this.baseURL}/messages/twilio/conversation/${conversationSid}/messages`, {
                    author: JSON.parse(user)?.id,
                    body: messageContent
                });
                return response.data.data || response.data;
            }

            // Try Twilio client first
            try {
                const conversation = cachedConversation || await this.client.getConversationBySid(conversationSid);
                const message = await conversation.sendMessage(messageContent);
                console.log('✅ Message sent via client:', message.sid);
                return message;
            } catch (clientError) {
                console.warn('Client send failed, trying backend API:', clientError.message);

                // If client fails, try backend API
                if (clientError.message?.includes('Forbidden') || clientError.code === 20403) {
                    const response = await axios.post(`${this.baseURL}/messages/twilio/conversation/${conversationSid}/messages`, {
                        author: JSON.parse(user)?.id,
                        body: messageContent
                    });

                    // Mark conversation as backend-only
                    if (cachedConversation) {
                        cachedConversation._isBackendOnly = true;
                    }

                    console.log('✅ Message sent via backend API');
                    return response.data.data || response.data;
                }

                throw clientError;
            }
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    setupConversationListeners(conversation) {
        // Listen for new messages
        conversation.on('messageAdded', (message) => {
            const listeners = this.messageListeners.get(conversation.sid) || [];
            listeners.forEach(listener => listener(message, 'added'));
        });

        // Listen for message updates
        conversation.on('messageUpdated', (message) => {
            const listeners = this.messageListeners.get(conversation.sid) || [];
            listeners.forEach(listener => listener(message, 'updated'));
        });

        // Listen for participant updates
        conversation.on('participantJoined', (participant) => {
            console.log('Participant joined:', participant.identity);
        });

        conversation.on('participantLeft', (participant) => {
            console.log('Participant left:', participant.identity);
        });
    }

    addMessageListener(conversationSid, callback) {
        if (!this.messageListeners.has(conversationSid)) {
            this.messageListeners.set(conversationSid, []);
        }
        this.messageListeners.get(conversationSid).push(callback);
    }

    removeMessageListener(conversationSid, callback) {
        const listeners = this.messageListeners.get(conversationSid);
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    formatMessageForUI(twilioMessage) {
        const user = localStorage.getItem('__user__');
        return {
            id: twilioMessage?.sid || twilioMessage?.index || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            clientId: twilioMessage?.conversationSid,
            type: twilioMessage?.author === JSON.parse(user)?.id ? 'sent' : 'received',
            content: twilioMessage?.body,
            timestamp: twilioMessage?.dateCreated?.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }),
            status: 'delivered',
            author: twilioMessage?.author,
            twilioMessage: twilioMessage
        };
    }

    formatConversationForUI(conversation, lastMessage = null) {
        const user = localStorage.getItem('__user__');
        const participants = conversation.participants || [];
        const otherParticipant = participants.find(p => p.identity !== JSON.parse(user)?.id);

        // Extract clean name from uniqueName (remove conv_ prefix and user IDs)
        let displayName = conversation.uniqueName || otherParticipant?.identity || 'Unknown';
        if (displayName.startsWith('conv_')) {
            // For conversations with conv_ prefix, try to get a better name
            displayName = conversation.friendlyName || otherParticipant?.identity || 'Unknown';
        }

        return {
            id: conversation.sid,
            name: displayName,
            phone: otherParticipant?.identity || '',
            lastMessage: lastMessage?.body || 'No messages yet',
            lastMessageTime: lastMessage?.createdAt ? this.formatTimeAgo(new Date(lastMessage.createdAt)) : 'Never',
            unreadCount: conversation.unreadMessagesCount || 0,
            status: 'active',
            avatar: this.generateAvatar(conversation.friendlyName || otherParticipant?.identity),
            conversationSid: conversation.sid,
            twilioConversation: conversation
        };
    }

    generateAvatar(name) {
        if (!name) return '?';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    formatTimeAgo(date) {
        if (!date) return 'Never';

        const now = new Date();
        const messageDate = new Date(date);
        const diffInMs = now - messageDate;
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInWeeks = Math.floor(diffInDays / 7);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);

        // Handle negative time (future dates)
        if (diffInMs < 0) {
            return 'Just now';
        }

        // Less than 1 minute
        if (diffInSeconds < 60) {
            return diffInSeconds <= 5 ? 'Just now' : `${diffInSeconds} sec ago`;
        }

        // Less than 1 hour
        if (diffInMinutes < 60) {
            return diffInMinutes === 1 ? '1 min ago' : `${diffInMinutes} min ago`;
        }

        // Less than 1 day
        if (diffInHours < 24) {
            return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
        }

        // Less than 1 week
        if (diffInDays < 7) {
            return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
        }

        // Less than 1 month
        if (diffInWeeks < 4) {
            return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
        }

        // Less than 1 year
        if (diffInMonths < 12) {
            return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
        }

        // More than 1 year
        return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
    }

    disconnect() {
        if (this.client) {
            this.client.removeAllListeners();
            this.conversations.clear();
            this.messageListeners.clear();
            this.client = null;
        }
    }
}

// Create singleton instance
const twilioService = new TwilioService();
export default twilioService;
