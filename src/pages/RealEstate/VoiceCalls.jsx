import React, { useState, useEffect, useRef } from 'react';
import {
    Phone,
    PhoneCall,
    PhoneIncoming,
    PhoneOutgoing,
    PhoneOff,
    Search,
    MoreVertical,
    Clock,
    Calendar,
    User,
    Plus,
    Settings,
    Filter,
    Archive,
    Trash2,
    Star,
    Video,
    Mic,
    MicOff,
    Volume2,
    VolumeX,
    Loader
} from 'lucide-react';
import { Button } from '../../components/RealEstate/ui/Button';
import { Badge } from '../../components/RealEstate/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/RealEstate/ui/Card';
import twilioVoiceService from '../../services/twilioVoiceService';
import { toast } from 'react-hot-toast';

const VoiceCalls = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [isCallActive, setIsCallActive] = useState(false);
    const [currentCall, setCurrentCall] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeakerOn, setIsSpeakerOn] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);
    const [callHistory, setCallHistory] = useState([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [incomingCall, setIncomingCall] = useState(null);
    const callDurationInterval = useRef(null);
    const currentUserId = localStorage.getItem('__user__') ? JSON.parse(localStorage.getItem('__user__'))?.id : null;

    // Initialize Twilio Voice service
    useEffect(() => {
        const initializeVoice = async () => {
            if (!currentUserId) {
                setIsInitializing(false);
                return;
            }

            try {
                setIsInitializing(true);
                await twilioVoiceService.initialize(currentUserId);

                // Set up event listeners
                twilioVoiceService.addEventListener('registered', () => {
                    console.log('Voice device registered');
                    setIsInitializing(false);
                });

                twilioVoiceService.addEventListener('incoming', (call) => {
                    console.log('Incoming call:', call);
                    setIncomingCall(call);
                    toast.success('Incoming call!');
                });

                twilioVoiceService.addEventListener('callAccepted', (call) => {
                    console.log('Call accepted:', call);
                    setIsCallActive(true);
                    startCallTimer();
                });

                twilioVoiceService.addEventListener('callDisconnected', (call) => {
                    console.log('Call disconnected:', call);
                    setIsCallActive(false);
                    setCurrentCall(null);
                    setIncomingCall(null);
                    stopCallTimer();
                    loadCallHistory();
                });

                twilioVoiceService.addEventListener('callError', (error) => {
                    console.error('Call error:', error);
                    toast.error('Call error: ' + (error.message || 'Unknown error'));
                    setIsCallActive(false);
                    setCurrentCall(null);
                    stopCallTimer();
                });

                // Load call history
                await loadCallHistory();
            } catch (error) {
                console.error('Failed to initialize Twilio Voice:', error);
                toast.error('Failed to initialize voice service');
                setIsInitializing(false);
            }
        };

        initializeVoice();

        return () => {
            twilioVoiceService.disconnect();
            stopCallTimer();
        };
    }, [currentUserId]); // eslint-disable-line react-hooks/exhaustive-deps

    const loadCallHistory = async () => {
        try {
            setIsLoadingHistory(true);
            const calls = await twilioVoiceService.getCallHistory();
            setCallHistory(calls.map(formatCallForUI));
        } catch (error) {
            console.error('Failed to load call history:', error);
            toast.error('Failed to load call history');
        } finally {
            setIsLoadingHistory(false);
        }
    };

    const formatCallForUI = (call) => {
        const date = new Date(call.startTime);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = diffMs / (1000 * 60 * 60);
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        let dateStr = '';
        if (diffHours < 24) {
            dateStr = `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (diffDays < 2) {
            dateStr = `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            dateStr = date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        const duration = call.duration ? formatDuration(call.duration) : '0:00';
        const name = call.to || call.from || 'Unknown';
        const phone = call.to || call.from || '';

        return {
            id: call.callSid,
            callSid: call.callSid,
            clientName: name,
            phoneNumber: phone,
            type: call.direction === 'outbound-api' || call.direction === 'outbound-dial' ? 'outgoing' : 'incoming',
            duration: duration,
            date: dateStr,
            status: call.status === 'completed' ? 'completed' : call.status === 'no-answer' ? 'missed' : 'declined',
            avatar: getInitials(name),
        };
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getInitials = (name) => {
        if (!name) return '?';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const startCallTimer = () => {
        setCallDuration(0);
        callDurationInterval.current = setInterval(() => {
            setCallDuration(prev => prev + 1);
        }, 1000);
    };

    const stopCallTimer = () => {
        if (callDurationInterval.current) {
            clearInterval(callDurationInterval.current);
            callDurationInterval.current = null;
        }
        setCallDuration(0);
    };

    const formatTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const contacts = [
        {
            id: 1,
            name: 'Sarah Johnson',
            phone: '+1 (555) 123-4567',
            status: 'active',
            avatar: 'SJ',
            lastContact: '2 hours ago'
        },
        {
            id: 2,
            name: 'Mike Chen',
            phone: '+1 (555) 234-5678',
            status: 'active',
            avatar: 'MC',
            lastContact: '1 day ago'
        },
        {
            id: 3,
            name: 'Lisa Rodriguez',
            phone: '+1 (555) 345-6789',
            status: 'pending',
            avatar: 'LR',
            lastContact: '3 days ago'
        },
        {
            id: 4,
            name: 'David Thompson',
            phone: '+1 (555) 456-7890',
            status: 'closed',
            avatar: 'DT',
            lastContact: '1 week ago'
        }
    ];

    const filteredCalls = callHistory.filter(call => {
        const matchesSearch = call.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            call.phoneNumber.includes(searchQuery);
        const matchesTab = activeTab === 'all' || call.status === activeTab;
        return matchesSearch && matchesTab;
    });

    const handleMakeCall = async (contact) => {
        try {
            const phoneNumber = contact.phone || contact.phoneNumber;
            if (!phoneNumber) {
                toast.error('Phone number is required');
                return;
            }

            toast.loading('Initiating call...', { id: 'calling' });
            
            const callData = await twilioVoiceService.makeCall(phoneNumber);
            
            setCurrentCall({
                name: contact.name || contact.clientName || phoneNumber,
                phone: phoneNumber,
                avatar: contact.avatar || getInitials(contact.name || phoneNumber),
                callSid: callData.callSid,
            });

            setIsCallActive(true);
            startCallTimer();
            toast.success('Call initiated', { id: 'calling' });
        } catch (error) {
            console.error('Error making call:', error);
            toast.error('Failed to make call: ' + (error.message || 'Unknown error'), { id: 'calling' });
        }
    };

    const handleEndCall = async () => {
        try {
            const callSid = currentCall?.callSid || twilioVoiceService.getActiveCall()?.parameters?.CallSid;
            
            if (callSid) {
                await twilioVoiceService.hangupCall(callSid);
            } else {
                await twilioVoiceService.hangupCall();
            }

            setIsCallActive(false);
            setCurrentCall(null);
            setIsMuted(false);
            setIsSpeakerOn(false);
            stopCallTimer();
            
            // Reload call history
            await loadCallHistory();
        } catch (error) {
            console.error('Error ending call:', error);
            toast.error('Failed to end call');
        }
    };

    const handleAnswerCall = async (call) => {
        try {
            await twilioVoiceService.answerCall(call);
            setCurrentCall({
                name: 'Incoming Call',
                phone: call.parameters.From || 'Unknown',
                avatar: 'IC',
                callSid: call.parameters.CallSid,
            });
            setIsCallActive(true);
            setIncomingCall(null);
            startCallTimer();
        } catch (error) {
            console.error('Error answering call:', error);
            toast.error('Failed to answer call');
        }
    };

    const handleRejectCall = async (call) => {
        try {
            await twilioVoiceService.rejectCall(call);
            setIncomingCall(null);
            toast.success('Call rejected');
        } catch (error) {
            console.error('Error rejecting call:', error);
            toast.error('Failed to reject call');
        }
    };

    const handleToggleMute = async () => {
        try {
            if (isMuted) {
                await twilioVoiceService.unmuteCall();
            } else {
                await twilioVoiceService.muteCall();
            }
            setIsMuted(!isMuted);
        } catch (error) {
            console.error('Error toggling mute:', error);
            toast.error('Failed to toggle mute');
        }
    };

    const getCallIcon = (type) => {
        switch (type) {
            case 'outgoing':
                return <PhoneOutgoing className="w-4 h-4 text-green-400" />;
            case 'incoming':
                return <PhoneIncoming className="w-4 h-4 text-blue-400" />;
            default:
                return <Phone className="w-4 h-4 text-gray-400" />;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return <Badge className="bg-green-500/20 text-green-400 text-xs">Completed</Badge>;
            case 'missed':
                return <Badge className="bg-red-500/20 text-red-400 text-xs">Missed</Badge>;
            case 'declined':
                return <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">Declined</Badge>;
            default:
                return <Badge className="bg-gray-500/20 text-gray-400 text-xs">{status}</Badge>;
        }
    };

    if (isInitializing) {
        return (
            <div className="min-h-screen bg-[var(--dark-bg)] flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-12 h-12 animate-spin text-[var(--primary-color)] mx-auto mb-4" />
                    <p className="text-gray-300">Initializing voice service...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--dark-bg)] p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Voice Calls</h1>
                        <p className="text-gray-400">Make and receive calls with your clients using Twilio</p>
                        {twilioVoiceService.isDeviceReady() && (
                            <Badge className="bg-green-500/20 text-green-400 text-xs mt-2">Voice Service Ready</Badge>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="border-[var(--primary-color)] text-[var(--primary-color)]">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </Button>
                        <Button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            New Call
                        </Button>
                    </div>
                </div>

                {/* Incoming Call Overlay */}
                {incomingCall && !isCallActive && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-[var(--medium-dark)] rounded-xl p-8 max-w-md w-full mx-4">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-4">
                                    IC
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Incoming Call</h3>
                                <p className="text-gray-400 mb-6">{incomingCall.parameters?.From || 'Unknown'}</p>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        onClick={() => handleRejectCall(incomingCall)}
                                        variant="destructive"
                                        size="lg"
                                        className="w-16 h-16 rounded-full p-0"
                                    >
                                        <PhoneOff className="w-6 h-6" />
                                    </Button>
                                    <Button
                                        onClick={() => handleAnswerCall(incomingCall)}
                                        className="bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full p-0"
                                        size="lg"
                                    >
                                        <Phone className="w-6 h-6" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Active Call Overlay */}
                {isCallActive && currentCall && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-[var(--medium-dark)] rounded-xl p-8 max-w-md w-full mx-4">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-4">
                                    {currentCall.avatar}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{currentCall.name}</h3>
                                <p className="text-gray-400 mb-6">{currentCall.phone}</p>

                                <div className="text-2xl font-mono text-white mb-6">{formatTimer(callDuration)}</div>

                                <div className="flex justify-center gap-4 mb-6">
                                    <Button
                                        onClick={handleToggleMute}
                                        variant={isMuted ? "destructive" : "outline"}
                                        size="lg"
                                        className="w-12 h-12 rounded-full p-0"
                                    >
                                        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                                    </Button>
                                    <Button
                                        onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                                        variant={isSpeakerOn ? "default" : "outline"}
                                        size="lg"
                                        className="w-12 h-12 rounded-full p-0"
                                    >
                                        {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                                    </Button>
                                </div>

                                <Button
                                    onClick={handleEndCall}
                                    variant="destructive"
                                    size="lg"
                                    className="w-16 h-16 rounded-full p-0"
                                >
                                    <PhoneOff className="w-6 h-6" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Call History */}
                    <div className="lg:col-span-2">
                        <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-white">Call History</CardTitle>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="border-[var(--primary-color)] text-[var(--primary-color)]">
                                            <Filter className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="outline" className="border-[var(--primary-color)] text-[var(--primary-color)]">
                                            <Archive className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Search and Tabs */}
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search calls..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-[var(--lighter-dark)] border border-[var(--primary-color)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                        />
                                    </div>

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
                                            onClick={() => setActiveTab('completed')}
                                            className={`flex-1 py-2 text-sm font-medium transition-colors ${activeTab === 'completed'
                                                ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                                                : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            Completed
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('missed')}
                                            className={`flex-1 py-2 text-sm font-medium transition-colors ${activeTab === 'missed'
                                                ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                                                : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            Missed
                                        </button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {isLoadingHistory ? (
                                    <div className="flex items-center justify-center p-8">
                                        <Loader className="w-6 h-6 animate-spin text-[var(--primary-color)]" />
                                        <span className="ml-2 text-gray-400">Loading call history...</span>
                                    </div>
                                ) : filteredCalls.length === 0 ? (
                                    <div className="text-center p-8 text-gray-400">
                                        <Phone className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                        <p>No call history yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {filteredCalls.map((call) => (
                                            <div
                                                key={call.id}
                                                className="flex items-center gap-4 p-4 bg-[var(--lighter-dark)] rounded-lg hover:bg-[var(--primary-color)] hover:bg-opacity-10 transition-colors"
                                            >
                                            <div className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-semibold">
                                                {call.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-white font-medium">{call.clientName}</h3>
                                                    <div className="flex items-center gap-2">
                                                        {getCallIcon(call.type)}
                                                        <span className="text-sm text-gray-400">{call.duration}</span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-400">{call.phoneNumber}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-gray-500">{call.date}</span>
                                                    {getStatusBadge(call.status)}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-[var(--primary-color)] text-[var(--primary-color)]"
                                                    onClick={() => handleMakeCall(call)}
                                                >
                                                    <Phone className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-gray-500 text-gray-400"
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Contacts */}
                    <div>
                        <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]">
                            <CardHeader>
                                <CardTitle className="text-white">Quick Contacts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {contacts.map((contact) => (
                                        <div
                                            key={contact.id}
                                            className="flex items-center gap-3 p-3 bg-[var(--lighter-dark)] rounded-lg hover:bg-[var(--primary-color)] hover:bg-opacity-10 transition-colors"
                                        >
                                            <div className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-semibold">
                                                {contact.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-white font-medium truncate">{contact.name}</h3>
                                                <p className="text-sm text-gray-400 truncate">{contact.phone}</p>
                                                <p className="text-xs text-gray-500">{contact.lastContact}</p>
                                            </div>
                                            <Button
                                                size="sm"
                                                className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white"
                                                onClick={() => handleMakeCall(contact)}
                                            >
                                                <Phone className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Twilio Integration Info */}
                <div className="mt-8">
                    <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]">
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <Phone className="w-12 h-12 text-[var(--primary-color)] mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Twilio Voice Integration</h3>
                                <p className="text-gray-400 mb-4">
                                    All calls are routed through Twilio with direct billing to your account.
                                    No charges pass through our platform.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <Button variant="outline" className="border-[var(--primary-color)] text-[var(--primary-color)]">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Configure Twilio
                                    </Button>
                                    <Button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white">
                                        View Billing
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default VoiceCalls;
