import React, { useState } from 'react';
import { Button } from './RealEstate/ui/Button';
import twilioService from '../services/twilioService';

const TwilioDebug = () => {
    const [logs, setLogs] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [testUserId, setTestUserId] = useState('agent_1');

    const addLog = (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, { message, type, timestamp }]);
        console.log(`[${type.toUpperCase()}] ${message}`);
    };

    const testConnection = async () => {
        try {
            addLog('Testing Twilio connection...', 'info');
            const client = await twilioService.initialize(testUserId);
            setIsConnected(true);
            addLog(`✅ Connected successfully as ${client.user.identity}`, 'success');
        } catch (error) {
            addLog(`❌ Connection failed: ${error.message}`, 'error');
            setIsConnected(false);
        }
    };

    const testGetConversations = async () => {
        try {
            addLog('Fetching conversations...', 'info');
            const convs = await twilioService.getConversations();
            setConversations(convs);
            addLog(`✅ Found ${convs.length} conversations`, 'success');
            addLog(`Conversations: ${JSON.stringify(convs, null, 2)}`, 'info');
        } catch (error) {
            addLog(`❌ Failed to fetch conversations: ${error.message}`, 'error');
        }
    };

    const testCreateConversation = async () => {
        const phone = prompt('Enter test phone number:');
        const name = prompt('Enter test name:');

        if (!phone || !name) {
            addLog('❌ Phone and name are required', 'error');
            return;
        }

        try {
            addLog(`Creating conversation with ${name} (${phone})...`, 'info');
            const conversation = await twilioService.getOrCreateConversation(phone, name);
            addLog(`✅ Conversation created: ${conversation.sid}`, 'success');

            // Refresh conversations list
            testGetConversations();
        } catch (error) {
            addLog(`❌ Failed to create conversation: ${error.message}`, 'error');
        }
    };

    const testSendMessage = async () => {
        if (conversations.length === 0) {
            addLog('❌ No conversations available. Create one first.', 'error');
            return;
        }

        const conversationSid = conversations[0].sid || conversations[0].conversationSid;
        const message = prompt('Enter test message:');

        if (!message) {
            addLog('❌ Message is required', 'error');
            return;
        }

        try {
            addLog(`Sending message to ${conversationSid}...`, 'info');
            const result = await twilioService.sendMessage(conversationSid, message);
            addLog(`✅ Message sent: ${result.sid}`, 'success');
        } catch (error) {
            addLog(`❌ Failed to send message: ${error.message}`, 'error');
        }
    };

    const testGetMessages = async () => {
        if (conversations.length === 0) {
            addLog('❌ No conversations available. Create one first.', 'error');
            return;
        }

        const conversationSid = conversations[0].sid || conversations[0].conversationSid;

        try {
            addLog(`Getting messages for conversation ${conversationSid}...`, 'info');
            const messages = await twilioService.getConversationMessages(conversationSid);
            addLog(`✅ Messages loaded: ${messages.length} messages`, 'success');
            addLog(`Messages: ${JSON.stringify(messages.slice(-3), null, 2)}`, 'info'); // Show last 3 messages
        } catch (error) {
            addLog(`❌ Failed to get messages: ${error.message}`, 'error');
            if (error.message?.includes('Forbidden')) {
                addLog('🔍 This is likely a token permission issue. Check:', 'info');
                addLog('1. Token includes conversation access grants', 'info');
                addLog('2. User identity matches conversation participant', 'info');
                addLog('3. Conversation exists and user has access', 'info');
            }
        }
    };

    const testTokenPermissions = async () => {
        try {
            addLog('Testing token permissions...', 'info');

            if (!isConnected) {
                addLog('❌ Not connected. Test connection first.', 'error');
                return;
            }

            // Test client info
            addLog(`User Identity: ${twilioService.client?.user?.identity}`, 'info');
            addLog(`Client State: ${twilioService.client?.connectionState}`, 'info');

            // Test conversation access
            if (conversations.length > 0) {
                const conv = conversations[0];
                addLog(`Testing conversation access: ${conv.sid}`, 'info');

                try {
                    const conversation = await twilioService.client.getConversationBySid(conv.sid);
                    addLog(`✅ Can access conversation: ${conversation.sid}`, 'success');
                    addLog(`Participants: ${conversation.participants?.length || 0}`, 'info');
                } catch (convError) {
                    addLog(`❌ Cannot access conversation: ${convError.message}`, 'error');
                }
            }

        } catch (error) {
            addLog(`❌ Token permission test failed: ${error.message}`, 'error');
        }
    };

    const clearLogs = () => {
        setLogs([]);
    };

    const testBackendEndpoints = async () => {
        addLog('Testing backend endpoints directly...', 'info');

        try {
            // Test token endpoint
            const response = await fetch(`http://localhost:5001/api/messages/twilio/token?identity=${testUserId}`);
            const tokenData = await response.json();
            addLog(`Token endpoint: ${response.status} - ${JSON.stringify(tokenData)}`, response.ok ? 'success' : 'error');

            // Test conversations endpoint
            const convResponse = await fetch(`http://localhost:5001/api/messages/twilio/conversations?identity=${testUserId}`);
            const convData = await convResponse.json();
            addLog(`Conversations endpoint: ${convResponse.status} - ${JSON.stringify(convData)}`, convResponse.ok ? 'success' : 'error');

        } catch (error) {
            addLog(`❌ Backend test failed: ${error.message}`, 'error');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-gray-900 text-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Twilio Integration Debug Tool</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Test User ID:</label>
                    <input
                        type="text"
                        value={testUserId}
                        onChange={(e) => setTestUserId(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-800 text-white"
                        placeholder="Enter user ID"
                    />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <Button onClick={testConnection} className="bg-blue-600 hover:bg-blue-700">
                        Test Connection
                    </Button>
                    <Button onClick={testGetConversations} disabled={!isConnected} className="bg-green-600 hover:bg-green-700">
                        Get Conversations
                    </Button>
                    <Button onClick={testCreateConversation} disabled={!isConnected} className="bg-purple-600 hover:bg-purple-700">
                        Create Conversation
                    </Button>
                    <Button onClick={testGetMessages} disabled={!isConnected} className="bg-indigo-600 hover:bg-indigo-700">
                        Test Get Messages
                    </Button>
                    <Button onClick={testSendMessage} disabled={!isConnected} className="bg-orange-600 hover:bg-orange-700">
                        Send Test Message
                    </Button>
                    <Button onClick={testTokenPermissions} disabled={!isConnected} className="bg-red-600 hover:bg-red-700">
                        Test Permissions
                    </Button>
                    <Button onClick={testBackendEndpoints} className="bg-yellow-600 hover:bg-yellow-700">
                        Test Backend
                    </Button>
                    <Button onClick={clearLogs} variant="outline">
                        Clear Logs
                    </Button>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                        Status: <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
                            {isConnected ? 'Connected' : 'Disconnected'}
                        </span>
                    </h3>
                    <p className="text-sm text-gray-400">
                        Conversations: {conversations.length}
                    </p>
                </div>

                <div className="bg-gray-800 rounded p-4 h-64 overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-2">Debug Logs:</h3>
                    {logs.length === 0 ? (
                        <p className="text-gray-400 italic">No logs yet. Start testing!</p>
                    ) : (
                        logs.map((log, index) => (
                            <div key={index} className={`text-sm mb-1 ${log.type === 'error' ? 'text-red-400' :
                                log.type === 'success' ? 'text-green-400' :
                                    'text-gray-300'
                                }`}>
                                <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-4 text-sm text-gray-400">
                    <h4 className="font-semibold mb-2">Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Make sure your backend is running on http://localhost:5001</li>
                        <li>Click "Test Backend" to verify API endpoints</li>
                        <li>Click "Test Connection" to initialize Twilio client</li>
                        <li>Use other buttons to test functionality</li>
                        <li>Check browser console for additional details</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default TwilioDebug;
