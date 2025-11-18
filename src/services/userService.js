import axios from 'axios';
import { apiBaseUrl } from '../store/api.config';

class UserService {
    constructor() {
        this.baseURL = apiBaseUrl;
    }

    async getUsers(params = {}) {
        try {
            const response = await axios.get(`${this.baseURL}/users`, {
                params: {
                    limit: 50,
                    ...params
                }
            });

            // Handle different response structures
            const users = response.data.data?.users || response.data.users || response.data;

            return users.map(user => ({
                id: user._id || user.id,
                name: user.name || user.fullName || `${user.firstName} ${user.lastName}`.trim(),
                email: user.email,
                phone: user.phone || user.phoneNumber,
                avatar: this.generateAvatar(user.name || user.fullName || `${user.firstName} ${user.lastName}`.trim()),
                status: user.status || 'offline', // online, away, offline
                role: user.role || 'client', // client, agent, admin
                lastSeen: user.lastSeen,
                isOnline: user.isOnline || false
            }));
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async searchUsers(query, params = {}) {
        try {
            const response = await axios.get(`${this.baseURL}/users/search`, {
                params: {
                    q: query,
                    limit: 20,
                    ...params
                }
            });

            const users = response.data.data?.users || response.data.users || response.data;

            return users.map(user => ({
                id: user._id || user.id,
                name: user.name || user.fullName || `${user.firstName} ${user.lastName}`.trim(),
                email: user.email,
                phone: user.phone || user.phoneNumber,
                avatar: this.generateAvatar(user.name || user.fullName || `${user.firstName} ${user.lastName}`.trim()),
                status: user.status || 'offline',
                role: user.role || 'client',
                lastSeen: user.lastSeen,
                isOnline: user.isOnline || false
            }));
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const response = await axios.get(`${this.baseURL}/users/${userId}`);
            const user = response.data.data?.user || response.data.user || response.data;

            return {
                id: user._id || user.id,
                name: user.name || user.fullName || `${user.firstName} ${user.lastName}`.trim(),
                email: user.email,
                phone: user.phone || user.phoneNumber,
                avatar: this.generateAvatar(user.name || user.fullName || `${user.firstName} ${user.lastName}`.trim()),
                status: user.status || 'offline',
                role: user.role || 'client',
                lastSeen: user.lastSeen,
                isOnline: user.isOnline || false
            };
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    generateAvatar(name) {
        if (!name) return '?';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    // Mock data for development - remove when real API is ready
    getMockUsers() {
        return [
            {
                id: '6860f00153935e34492ec9ff',
                name: 'John Smith',
                email: 'john.smith@email.com',
                phone: '+1 (555) 123-4567',
                avatar: 'JS',
                status: 'online',
                role: 'client',
                isOnline: true,
                lastSeen: new Date()
            },
            {
                id: '6860f00153935e34492ec9fg',
                name: 'Sarah Johnson',
                email: 'sarah.johnson@email.com',
                phone: '+1 (555) 234-5678',
                avatar: 'SJ',
                status: 'offline',
                role: 'client',
                isOnline: false,
                lastSeen: new Date(Date.now() - 3600000) // 1 hour ago
            },
            {
                id: '6860f00153935e34492ec9fh',
                name: 'Mike Chen',
                email: 'mike.chen@email.com',
                phone: '+1 (555) 345-6789',
                avatar: 'MC',
                status: 'online',
                role: 'agent',
                isOnline: true,
                lastSeen: new Date()
            },
            {
                id: '6860f00153935e34492ec9fi',
                name: 'Lisa Rodriguez',
                email: 'lisa.rodriguez@email.com',
                phone: '+1 (555) 456-7890',
                avatar: 'LR',
                status: 'away',
                role: 'client',
                isOnline: true,
                lastSeen: new Date(Date.now() - 900000) // 15 minutes ago
            },
            {
                id: '6860f00153935e34492ec9fj',
                name: 'David Thompson',
                email: 'david.thompson@email.com',
                phone: '+1 (555) 567-8901',
                avatar: 'DT',
                status: 'online',
                role: 'client',
                isOnline: true,
                lastSeen: new Date()
            },
            {
                id: '6860f00153935e34492ec9fk',
                name: 'Emma Wilson',
                email: 'emma.wilson@email.com',
                phone: '+1 (555) 678-9012',
                avatar: 'EW',
                status: 'offline',
                role: 'client',
                isOnline: false,
                lastSeen: new Date(Date.now() - 86400000) // 1 day ago
            },
            {
                id: '6860f00153935e34492ec9fl',
                name: 'Robert Brown',
                email: 'robert.brown@email.com',
                phone: '+1 (555) 789-0123',
                avatar: 'RB',
                status: 'away',
                role: 'agent',
                isOnline: true,
                lastSeen: new Date(Date.now() - 1800000) // 30 minutes ago
            }
        ];
    }
}

// Create singleton instance
const userService = new UserService();
export default userService;
