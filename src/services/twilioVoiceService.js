import * as Twilio from '@twilio/voice-sdk';
import axios from 'axios';
import { apiBaseUrl } from '../store/api.config';

class TwilioVoiceService {
    constructor() {
        this.device = null;
        this.activeCall = null;
        this.baseURL = apiBaseUrl;
        this.callListeners = [];
    }

    async initialize(userId) {
        try {
            console.log('Initializing Twilio Voice device for user:', userId);

            // Get voice token from backend
            const response = await axios.get(`${this.baseURL}/voice/token`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const token = response.data.data?.token || response.data.token;
            if (!token) {
                throw new Error('No token received from backend');
            }

            // Initialize Twilio Device
            this.device = new Twilio.Device(token, {
                logLevel: 1, // 0 = silent, 1 = errors, 2 = warnings, 3 = info, 4 = debug
                codecPreferences: ['opus', 'pcmu'],
            });

            // Set up device event listeners
            this.setupDeviceListeners();

            console.log('Twilio Voice device initialized successfully');
            return this.device;
        } catch (error) {
            console.error('Error initializing Twilio Voice device:', error);
            throw error;
        }
    }

    setupDeviceListeners() {
        if (!this.device) return;

        // Device ready
        this.device.on('registered', () => {
            console.log('Twilio Device registered and ready');
            this.notifyListeners('registered', null);
        });

        // Device error
        this.device.on('error', (error) => {
            console.error('Twilio Device error:', error);
            this.notifyListeners('error', error);
        });

        // Incoming call
        this.device.on('incoming', (call) => {
            console.log('Incoming call:', call);
            this.activeCall = call;
            this.setupCallListeners(call);
            this.notifyListeners('incoming', call);
        });
    }

    setupCallListeners(call) {
        // Call accepted
        call.on('accept', () => {
            console.log('Call accepted');
            this.notifyListeners('callAccepted', call);
        });

        // Call disconnected
        call.on('disconnect', () => {
            console.log('Call disconnected');
            this.activeCall = null;
            this.notifyListeners('callDisconnected', call);
        });

        // Call error
        call.on('error', (error) => {
            console.error('Call error:', error);
            this.notifyListeners('callError', error);
        });

        // Call status changed
        call.on('status', (status) => {
            console.log('Call status:', status);
            this.notifyListeners('callStatus', { call, status });
        });
    }

    async makeCall(phoneNumber, params = {}) {
        try {
            if (!this.device) {
                throw new Error('Device not initialized. Call initialize() first.');
            }

            console.log('Making call to:', phoneNumber);

            // Use backend API to initiate call (for better control and logging)
            const response = await axios.post(
                `${this.baseURL}/voice/call`,
                {
                    to: phoneNumber,
                    from: params.from || null,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            const callData = response.data.data;
            console.log('Call initiated:', callData);

            // For browser-based calling, we can also use device.connect()
            // But using backend API is more reliable for production
            return callData;
        } catch (error) {
            console.error('Error making call:', error);
            throw error;
        }
    }

    async makeBrowserCall(phoneNumber, params = {}) {
        try {
            if (!this.device) {
                throw new Error('Device not initialized. Call initialize() first.');
            }

            console.log('Making browser call to:', phoneNumber);

            // Connect using Twilio Device (browser-based calling)
            const call = await this.device.connect({
                params: {
                    To: phoneNumber,
                    ...params,
                },
            });

            this.activeCall = call;
            this.setupCallListeners(call);

            return {
                callSid: call.parameters.CallSid,
                status: call.status(),
                direction: 'outbound',
            };
        } catch (error) {
            console.error('Error making browser call:', error);
            throw error;
        }
    }

    async answerCall(call) {
        try {
            if (!call) {
                throw new Error('No call to answer');
            }

            call.accept();
            this.activeCall = call;
            this.setupCallListeners(call);

            return call;
        } catch (error) {
            console.error('Error answering call:', error);
            throw error;
        }
    }

    async rejectCall(call) {
        try {
            if (!call) {
                throw new Error('No call to reject');
            }

            call.reject();
            if (this.activeCall === call) {
                this.activeCall = null;
            }

            return true;
        } catch (error) {
            console.error('Error rejecting call:', error);
            throw error;
        }
    }

    async hangupCall(callSid = null) {
        try {
            // If callSid provided, use backend API to end call
            if (callSid) {
                await axios.post(
                    `${this.baseURL}/voice/call/${callSid}/end`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
            }

            // Also disconnect active browser call if exists
            if (this.activeCall) {
                this.activeCall.disconnect();
                this.activeCall = null;
            }

            return true;
        } catch (error) {
            console.error('Error hanging up call:', error);
            throw error;
        }
    }

    async muteCall() {
        try {
            if (!this.activeCall) {
                throw new Error('No active call to mute');
            }

            this.activeCall.mute(true);
            return true;
        } catch (error) {
            console.error('Error muting call:', error);
            throw error;
        }
    }

    async unmuteCall() {
        try {
            if (!this.activeCall) {
                throw new Error('No active call to unmute');
            }

            this.activeCall.mute(false);
            return true;
        } catch (error) {
            console.error('Error unmuting call:', error);
            throw error;
        }
    }

    async getCallHistory(phoneNumber = null, limit = 50) {
        try {
            const response = await axios.get(`${this.baseURL}/voice/calls`, {
                params: {
                    phoneNumber,
                    limit,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            return response.data.data || [];
        } catch (error) {
            console.error('Error fetching call history:', error);
            throw error;
        }
    }

    async getCallDetails(callSid) {
        try {
            const response = await axios.get(`${this.baseURL}/voice/call/${callSid}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            return response.data.data;
        } catch (error) {
            console.error('Error fetching call details:', error);
            throw error;
        }
    }

    // Event listener management
    addEventListener(event, callback) {
        if (!this.callListeners[event]) {
            this.callListeners[event] = [];
        }
        this.callListeners[event].push(callback);
    }

    removeEventListener(event, callback) {
        if (this.callListeners[event]) {
            const index = this.callListeners[event].indexOf(callback);
            if (index > -1) {
                this.callListeners[event].splice(index, 1);
            }
        }
    }

    notifyListeners(event, data) {
        if (this.callListeners[event]) {
            this.callListeners[event].forEach(callback => callback(data));
        }
    }

    disconnect() {
        if (this.activeCall) {
            this.activeCall.disconnect();
            this.activeCall = null;
        }

        if (this.device) {
            this.device.destroy();
            this.device = null;
        }

        this.callListeners = [];
    }

    getActiveCall() {
        return this.activeCall;
    }

    isDeviceReady() {
        return this.device !== null && this.device.isReady;
    }
}

// Create singleton instance
const twilioVoiceService = new TwilioVoiceService();
export default twilioVoiceService;

