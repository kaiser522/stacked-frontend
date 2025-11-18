import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    MessageSquare,
    Send,
    Phone,
    Search,
    MoreVertical,
    User,
    Clock,
    Check,
    CheckCheck,
    Plus,
    Settings,
    Filter,
    Archive,
    Trash2,
    Star,
    Reply,
    Forward,
    Loader
} from 'lucide-react';
import { Button } from '../../components/RealEstate/ui/Button';
import { Badge } from '../../components/RealEstate/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/RealEstate/ui/Card';
import twilioService from '../../services/twilioService';
import UserListModal from '../../components/RealEstate/UserListModal';
// import DNCComplianceModal from '../../components/RealEstate/DNCComplianceModal';

const Messaging = () => {
    const navigate = useNavigate();
    const [selectedClient, setSelectedClient] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteType, setDeleteType] = useState(''); // 'chat' or 'message'
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [twilioClient, setTwilioClient] = useState(null);
    const [error, setError] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [includeOptOut, setIncludeOptOut] = useState(true);
    // const [showDNCModal, setShowDNCModal] = useState(false);
    // const [pendingCall, setPendingCall] = useState(null);

    // Current user ID - you should get this from your auth context or props
    const currentUserId = '6860f00153935e34492ec9fe'; // Replace with actual user ID

    // Real data from Twilio
    const [clients, setClients] = useState([]);
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState(new Map());


    // Initialize Twilio and load conversations
    useEffect(() => {
        const initializeTwilio = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Initialize Twilio client
                const client = await twilioService.initialize(currentUserId);
                setTwilioClient(client);

                // Load existing conversations
                await loadConversations();

            } catch (err) {
                console.error('Failed to initialize Twilio:', err);
                setError('Failed to connect to messaging service');
            } finally {
                setIsLoading(false);
            }
        };

        initializeTwilio();

        // Cleanup on unmount
        return () => {
            twilioService.disconnect();
        };
    }, [currentUserId]);

    const loadConversations = async () => {
        try {
            const twilioConversations = await twilioService.getConversations();
            const conversationsMap = new Map();
            const clientsList = [];

            for (const conv of twilioConversations) {
                conversationsMap.set(conv.sid, conv);

                // Get the last message for each conversation
                let lastMessage = null;
                try {
                    const messages = await twilioService.getConversationMessages(conv.sid);
                    lastMessage = messages[messages.length - 1];
                } catch (err) {
                    console.warn('Could not load messages for conversation:', conv.sid);
                }

                const clientData = twilioService.formatConversationForUI(conv, lastMessage);
                clientsList.push(clientData);
            }

            // Sort conversations by last message time (most recent first)
            clientsList.sort((a, b) => {
                const timeA = new Date(a.lastMessageTime === 'Just now' ? Date.now() : a.lastMessageTime);
                const timeB = new Date(b.lastMessageTime === 'Just now' ? Date.now() : b.lastMessageTime);
                return timeB - timeA; // Most recent first
            });

            setConversations(conversationsMap);
            // console.log('BILAL Client data:', 'clientsList', clientsList);

            setClients(clientsList);
        } catch (err) {
            console.error('Failed to load conversations:', err);
            setError('Failed to load conversations');
        }
    };

    const loadMessagesForClient = async (client) => {
        try {
            const twilioMessages = await twilioService.getConversationMessages(client.conversationSid);
            const formattedMessages = twilioMessages.map(msg =>
                twilioService.formatMessageForUI(msg)
            );
            setMessages(formattedMessages);

            // Set up real-time message listener for this conversation
            const messageListener = (message, eventType) => {
                if (eventType === 'added') {
                    const formattedMessage = twilioService.formatMessageForUI(message);

                    // Check if message already exists to avoid duplicates
                    setMessages(prev => {
                        const exists = prev.some(msg =>
                            msg.twilioMessage?.sid === message.sid ||
                            (msg.content === message.body && msg.timestamp === formattedMessage.timestamp)
                        );

                        if (exists) {
                            console.log('Message already exists, skipping duplicate');
                            return prev;
                        }

                        return [...prev, formattedMessage];
                    });

                    // Update last message in client list and move to top
                    setClients(prev => {
                        const updatedClients = prev.map(c =>
                            c.conversationSid === client.conversationSid
                                ? { ...c, lastMessage: message.body, lastMessageTime: twilioService.formatTimeAgo(new Date()) }
                                : c
                        );

                        // Move the updated conversation to the top
                        const updatedClient = updatedClients.find(c => c.conversationSid === client.conversationSid);
                        const otherClients = updatedClients.filter(c => c.conversationSid !== client.conversationSid);

                        return [updatedClient, ...otherClients];
                    });
                }
            };

            twilioService.addMessageListener(client.conversationSid, messageListener);

            return messageListener;
        } catch (err) {
            console.error('Failed to load messages for client:', err);

            // Set more specific error messages
            let errorMessage = 'Failed to load messages';
            if (err.message?.includes('Forbidden')) {
                errorMessage = 'Permission denied: Cannot access this conversation. Please check your Twilio token permissions.';
            } else if (err.message?.includes('token')) {
                errorMessage = 'Token error: Please refresh the page and try again.';
            } else if (err.message?.includes('network')) {
                errorMessage = 'Network error: Please check your internet connection.';
            }

            setError(errorMessage);
        }
    };

    const filteredClients = clients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.phone.includes(searchQuery);
        const matchesTab = activeTab === 'all' || client.status === activeTab;
        return matchesSearch && matchesTab;
    });

    const handleSendMessage = async () => {
        if (!messageText.trim() || !selectedClient || isSending) return;

        let messageContent = messageText.trim();
        
        // Add opt-out message if enabled
        if (includeOptOut && !messageContent.toLowerCase().includes('stop') && !messageContent.toLowerCase().includes('opt-out')) {
            messageContent += '\n\nReply STOP to opt out of future messages.';
        }
        let tempMessage = null;

        try {
            setIsSending(true);

            // Create the message object for immediate UI display
            tempMessage = {
                id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // More unique temporary ID
                clientId: selectedClient.conversationSid,
                type: 'sent',
                content: messageContent,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                status: 'sending',
                author: twilioService.client?.user?.identity || 'agent_1',
                twilioMessage: null
            };

            // Add message to UI immediately
            setMessages(prev => [...prev, tempMessage]);

            // Clear input immediately
            setMessageText('');

            // Update last message in client list and move to top
            setClients(prev => {
                const updatedClients = prev.map(c =>
                    c.conversationSid === selectedClient.conversationSid
                        ? { ...c, lastMessage: messageContent, lastMessageTime: twilioService.formatTimeAgo(new Date()) }
                        : c
                );

                // Move the updated conversation to the top
                const updatedClient = updatedClients.find(c => c.conversationSid === selectedClient.conversationSid);
                const otherClients = updatedClients.filter(c => c.conversationSid !== selectedClient.conversationSid);

                return [updatedClient, ...otherClients];
            });

            // Send message via Twilio
            const sentMessage = await twilioService.sendMessage(selectedClient.conversationSid, messageContent);

            // Update the message status to delivered
            setMessages(prev => prev.map(msg =>
                msg.id === tempMessage.id
                    ? {
                        ...msg,
                        status: 'delivered',
                        id: sentMessage?.sid || sentMessage?.index || msg.id // Use real message ID if available
                    }
                    : msg
            ));

            console.log('✅ Message sent successfully:', sentMessage);

        } catch (err) {
            console.error('Failed to send message:', err);

            // Update message status to show error
            if (tempMessage) {
                setMessages(prev => prev.map(msg =>
                    msg.id === tempMessage.id
                        ? { ...msg, status: 'error', content: msg.content + ' (Failed to send)' }
                        : msg
                ));
            }

            setError('Failed to send message: ' + err.message);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleClientSelect = async (client) => {
        setSelectedClient(client);
        setMessages([]); // Clear messages while loading
        setError(null); // Clear any previous errors

        try {
            await loadMessagesForClient(client);
        } catch (err) {
            console.error('Failed to load messages for client:', err);
            setError('Failed to load messages for ' + client.name);
        }
    };

    const handleNewConversation = () => {
        setShowUserModal(true);
    };


    const handleUserSelect = async (user) => {
        try {
            setIsLoading(true);
            console.log('Creating conversation with user:', user.name);

            // Check if conversation already exists
            const existingClient = clients.find(c =>
                c.name === user.name ||
                c.phone === user.phone ||
                c.phone === user.email
            );

            if (existingClient) {
                console.log('✅ Found existing conversation, selecting it');
                setSelectedClient(existingClient);
                setMessages([]);
                setError(null);

                try {
                    await loadMessagesForClient(existingClient);
                } catch (err) {
                    console.error('Failed to load messages for existing client:', err);
                    setError('Failed to load messages for ' + existingClient.name);
                }

                setShowUserModal(false);
                return;
            }

            // Try to create conversation with backend first
            let conversation;
            try {
                conversation = await twilioService.getOrCreateConversation(user.id, user.name);
                console.log('✅ Conversation created:', conversation.sid);
            } catch (backendError) {
                console.warn('Backend failed, creating mock conversation:', backendError.message);
                // Create a mock conversation if backend fails
                conversation = {
                    sid: `mock_${user.id}_${Date.now()}`,
                    friendlyName: user.name,
                    uniqueName: user.name,
                    participants: [
                        { identity: currentUserId },
                        { identity: user.id }
                    ],
                    _isMock: true
                };
            }

            // Create a simple client object
            const newClientData = {
                id: conversation.sid,
                name: user.name,
                phone: user.phone || user.email,
                lastMessage: 'Conversation started',
                lastMessageTime: twilioService.formatTimeAgo(new Date()),
                unreadCount: 0,
                status: 'active',
                avatar: twilioService.generateAvatar(user.name),
                conversationSid: conversation.sid,
                twilioConversation: conversation
            };

            // Add to clients list (always add new, don't check for existing)
            setClients(prev => {
                // Remove any existing client with same name to avoid duplicates
                const filteredClients = prev.filter(c => c.name !== user.name);
                return [newClientData, ...filteredClients];
            });

            // Set the selected client immediately
            setSelectedClient(newClientData);
            setMessages([]);
            setError(null);

            // Load messages for the selected client
            try {
                await loadMessagesForClient(newClientData);
                console.log('✅ Messages loaded for:', newClientData.name);
            } catch (err) {
                console.error('Failed to load messages:', err);
                setError('Failed to load messages for ' + newClientData.name);
            }

            // Close the modal
            setShowUserModal(false);

        } catch (err) {
            console.error('Failed to create conversation:', err);
            setError('Failed to create conversation with ' + user.name + ': ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'sending':
                return <Loader className="w-4 h-4 text-yellow-400 animate-spin" />;
            case 'sent':
                return <Check className="w-4 h-4 text-gray-400" />;
            case 'delivered':
                return <CheckCheck className="w-4 h-4 text-blue-400" />;
            case 'read':
                return <CheckCheck className="w-4 h-4 text-green-400" />;
            case 'error':
                return <span className="text-red-400 text-xs">✗</span>;
            default:
                return <Clock className="w-4 h-4 text-gray-400" />;
        }
    };

    // Delete functionality
    const handleDeleteChat = (client) => {
        setDeleteType('chat');
        setDeleteTarget(client);
        setShowDeleteConfirm(true);
    };

    const handleDeleteMessage = (message) => {
        setDeleteType('message');
        setDeleteTarget(message);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        if (deleteType === 'chat') {
            // Delete all messages for this client
            setMessages(prev => prev.filter(msg => msg.clientId !== deleteTarget.id));
            // Remove client from list
            setClients(prev => prev.filter(client => client.id !== deleteTarget.id));
            // Clear selection if this client was selected
            if (selectedClient?.id === deleteTarget.id) {
                setSelectedClient(null);
            }
        } else if (deleteType === 'message') {
            // Delete specific message - use a more specific filter
            setMessages(prev => {
                const filtered = prev.filter(msg => {
                    // Use multiple criteria to ensure we delete the right message
                    const isMatch = msg.id === deleteTarget.id &&
                        msg.content === deleteTarget.content &&
                        msg.timestamp === deleteTarget.timestamp;
                    return !isMatch;
                });
                return filtered;
            });
        }

        // Close confirmation dialog
        setShowDeleteConfirm(false);
        setDeleteType('');
        setDeleteTarget(null);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setDeleteType('');
        setDeleteTarget(null);
    };

    // DNC Compliance handlers - COMMENTED OUT (moved to ClientUpload)
    // const handleCallInitiation = () => {
    //     if (!selectedClient) return;
    //     
    //     setPendingCall({
    //         type: 'call',
    //         contact: {
    //             name: selectedClient.name,
    //             phone: selectedClient.phone,
    //             email: selectedClient.email
    //         }
    //     });
    //     setShowDNCModal(true);
    // };

    // const handleDNCComplianceAccept = () => {
    //     if (pendingCall) {
    //         // Here you would implement the actual calling logic
    //         console.log('DNC compliance accepted, proceeding with call to:', pendingCall.contact.name);
    //         // You can integrate with your calling service here
    //         alert(`Calling ${pendingCall.contact.name} at ${pendingCall.contact.phone}`);
    //     }
    //     setPendingCall(null);
    // };

    // const handleDNCComplianceClose = () => {
    //     setShowDNCModal(false);
    //     setPendingCall(null);
    // };

    return (
        <div className="h-screen bg-[var(--dark-bg)] flex">
            {/* Client List Sidebar */}
            <div className="w-80 bg-[var(--medium-dark)] border-r border-[var(--primary-color)] flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-[var(--primary-color)]">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">Messages</h2>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-[var(--primary-color)] text-[var(--primary-color)]"
                                onClick={handleNewConversation}
                                disabled={isLoading}
                                title="New conversation"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-[var(--primary-color)] text-[var(--primary-color)]">
                                <Settings className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[var(--lighter-dark)] border border-[var(--primary-color)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[var(--primary-color)]">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-1 py-2 text-sm font-medium transition-colors ${activeTab === 'all'
                            ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex-1 py-2 text-sm font-medium transition-colors ${activeTab === 'active'
                            ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`flex-1 py-2 text-sm font-medium transition-colors ${activeTab === 'pending'
                            ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Pending
                    </button>
                </div>

                {/* Client List */}
                <div className="flex-1 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader className="w-6 h-6 animate-spin text-[var(--primary-color)]" />
                            <span className="ml-2 text-gray-400">Loading conversations...</span>
                        </div>
                    ) : error ? (
                        <div className="p-4 text-center">
                            <p className="text-red-400 mb-2">{error}</p>
                            <Button
                                size="sm"
                                onClick={() => window.location.reload()}
                                className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90"
                            >
                                Retry
                            </Button>
                        </div>
                    ) : filteredClients.length === 0 ? (
                        <div className="p-4 text-center text-gray-400">
                            <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>No conversations yet</p>
                            <p className="text-sm">Click + to start a new conversation</p>
                        </div>
                    ) : (
                        filteredClients.map((client) => (
                            <div
                                key={client.id}
                                className={`p-4 border-b border-[var(--primary-color)] transition-colors group ${selectedClient?.id === client.id
                                    ? 'bg-[var(--primary-color)] bg-opacity-20'
                                    : 'hover:bg-[var(--lighter-dark)]'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-semibold cursor-pointer"
                                        onClick={() => handleClientSelect(client)}
                                    >
                                        {client.avatar}
                                    </div>
                                    <div
                                        className="flex-1 min-w-0 cursor-pointer"
                                        onClick={() => handleClientSelect(client)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-white font-medium truncate">{client.name}</h3>
                                            <span className="text-xs text-gray-400">{client.lastMessageTime}</span>
                                        </div>
                                        <p className="text-sm text-gray-400 truncate">{client.lastMessage}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge
                                                variant={client.status === 'active' ? 'default' : client.status === 'pending' ? 'secondary' : 'outline'}
                                                className="text-xs"
                                            >
                                                {/* {client.status} */}
                                            </Badge>
                                            {client.unreadCount > 0 && (
                                                <Badge className="bg-[var(--primary-color)] text-white text-xs">
                                                    {client.unreadCount}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteChat(client);
                                        }}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
                                        title="Delete chat"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedClient ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-[var(--primary-color)] bg-[var(--medium-dark)]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-semibold">
                                        {selectedClient.avatar}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">{selectedClient.name}</h3>
                                        <p className="text-sm text-gray-400">{selectedClient.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
                                        onClick={() => {
                                            if (selectedClient?.phone) {
                                                navigate('/realestate/voice-calls', {
                                                    state: {
                                                        clientPhone: selectedClient.phone,
                                                        clientName: selectedClient.name || 'Client'
                                                    }
                                                });
                                            } else {
                                                toast.error('Phone number not available for this client');
                                            }
                                        }}
                                        title="Call client"
                                    >
                                        <Phone className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-[var(--primary-color)] text-[var(--primary-color)]">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center text-gray-400">
                                        <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                        <p>No messages yet</p>
                                        <p className="text-sm">Start the conversation below</p>
                                    </div>
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex group ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className="relative">
                                            <div
                                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.type === 'sent'
                                                    ? 'bg-[var(--primary-color)] text-white'
                                                    : 'bg-[var(--medium-dark)] text-white'
                                                    }`}
                                            >
                                                <p className="text-sm">{message.content}</p>
                                                <div className={`flex items-center gap-1 mt-1 ${message.type === 'sent' ? 'justify-end' : 'justify-start'
                                                    }`}>
                                                    <span className="text-xs opacity-70">{message.timestamp}</span>
                                                    {message.type === 'sent' && getStatusIcon(message.status)}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteMessage(message)}
                                                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                                                title="Delete message"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-[var(--primary-color)] bg-[var(--medium-dark)]">
                            {/* OPT-OUT Button */}
                            <div className="mb-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={includeOptOut}
                                            onChange={(e) => setIncludeOptOut(e.target.checked)}
                                            className="w-4 h-4 text-[var(--primary-color)] bg-[var(--lighter-dark)] border-[var(--primary-color)] rounded focus:ring-[var(--primary-color)] focus:ring-2"
                                        />
                                        <span className="text-sm text-gray-300">Include default opt-out message</span>
                                    </label>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        if (includeOptOut) {
                                            setMessageText(prev => prev + '\n\nReply STOP to opt out of future messages.');
                                        }
                                    }}
                                    className="border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white text-xs"
                                >
                                    Add OPT-OUT
                                </Button>
                            </div>
                            
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <textarea
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your message..."
                                        className="w-full p-3 bg-[var(--lighter-dark)] border border-[var(--primary-color)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] resize-none"
                                        rows={1}
                                    />
                                </div>
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={!messageText.trim() || isSending}
                                    className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white"
                                >
                                    {isSending ? (
                                        <Loader className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                            <div className="mt-2 text-xs text-gray-400">
                                Messages sent via Twilio • Press Enter to send
                                {includeOptOut && (
                                    <span className="ml-2 text-[var(--primary-color)]">• Opt-out message will be added automatically</span>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Select a client to start messaging</h3>
                            <p className="text-gray-400">Choose a client from the list to begin your conversation</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[var(--medium-dark)] p-6 rounded-xl w-full max-w-md">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                <Trash2 className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    {deleteType === 'chat' ? 'Delete Chat' : 'Delete Message'}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {deleteType === 'chat'
                                        ? 'This will permanently delete the entire conversation'
                                        : 'This will permanently delete this message'
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            {deleteType === 'chat' ? (
                                <div className="flex items-center gap-3 p-3 bg-[var(--dark-bg)] rounded-lg">
                                    <div className="w-8 h-8 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {deleteTarget?.avatar}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{deleteTarget?.name}</p>
                                        <p className="text-sm text-gray-400">{deleteTarget?.phone}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-3 bg-[var(--dark-bg)] rounded-lg">
                                    <p className="text-white text-sm">{deleteTarget?.content}</p>
                                    <p className="text-xs text-gray-400 mt-1">{deleteTarget?.timestamp}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 justify-end">
                            <Button
                                onClick={cancelDelete}
                                variant="outline"
                                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={confirmDelete}
                                className="bg-red-500 hover:bg-red-600 text-white"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* User List Modal */}
            <UserListModal
                isOpen={showUserModal}
                onClose={() => setShowUserModal(false)}
                onSelectUser={handleUserSelect}
            />

            {/* DNC Compliance Modal - COMMENTED OUT (moved to ClientUpload) */}
            {/* <DNCComplianceModal
                isOpen={showDNCModal}
                onClose={handleDNCComplianceClose}
                onAccept={handleDNCComplianceAccept}
                contactInfo={pendingCall?.contact}
            /> */}
        </div>
    );
};

export default Messaging;
