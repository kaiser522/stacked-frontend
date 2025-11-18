import React, { useState, useEffect } from 'react';
import {
    X,
    Search,
    User,
    Loader,
    MessageSquare,
    Phone,
    Mail
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useGetAllClientsQuery } from '../../store/apis/clients.api';

const UserListModal = ({ isOpen, onClose, onSelectUser }) => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Query parameters for fetching clients
    const queryParams = {
        page: 1,
        limit: 100, // Get more clients for the modal
        search: '', // We'll handle search locally for now
    };

    // Use RTK Query to fetch clients
    const { data, isLoading, error, refetch } = useGetAllClientsQuery(queryParams);
    const clients = data?.data?.clients || [];

    useEffect(() => {
        // Transform clients data to user format and filter based on search query
        const transformedUsers = clients.map(client => ({
            id: client._id || client.id,
            name: client.name || `${client.firstName} ${client.lastName}`.trim(),
            email: client.email,
            phone: client.phone || client.phoneNumber,
            avatar: generateAvatar(client.name || `${client.firstName} ${client.lastName}`.trim()),
            status: client.status === 'active' ? 'online' : 'offline',
            role: 'client', // All from clients API are clients
            lastSeen: client.lastContact || client.updatedAt,
            isOnline: client.status === 'active'
        }));

        // Filter users based on search query
        const filtered = transformedUsers.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.phone?.includes(searchQuery)
        );

        setFilteredUsers(filtered);
    }, [clients, searchQuery]);

    const generateAvatar = (name) => {
        if (!name) return '?';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const handleUserSelect = (user) => {
        onSelectUser(user);
        onClose();
        setSearchQuery('');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'away': return 'bg-yellow-500';
            case 'offline': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'agent': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'client': return 'bg-green-500/20 text-green-400 border-green-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--medium-dark)] rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-[var(--primary-color)]">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            Start New Conversation with Client
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-[var(--lighter-dark)] rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search clients by name, email, or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[var(--lighter-dark)] border border-[var(--primary-color)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        />
                    </div>
                </div>

                {/* User List */}
                <div className="flex-1 overflow-y-auto p-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader className="w-6 h-6 animate-spin text-[var(--primary-color)]" />
                            <span className="ml-2 text-gray-400">Loading clients...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <p className="text-red-400 mb-4">
                                {error?.data?.message || error?.message || 'Failed to load clients'}
                            </p>
                            <Button
                                onClick={refetch}
                                size="sm"
                                className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90"
                            >
                                Retry
                            </Button>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="text-center py-8">
                            <User className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
                            <p className="text-gray-400">
                                {searchQuery ? 'No clients found matching your search' : 'No clients available'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => handleUserSelect(user)}
                                    className="p-4 bg-[var(--lighter-dark)] rounded-lg hover:bg-[var(--primary-color)]/10 transition-colors cursor-pointer border border-transparent hover:border-[var(--primary-color)]/30"
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Avatar */}
                                        <div className="relative">
                                            <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-semibold">
                                                {user.avatar}
                                            </div>
                                            {/* Status indicator */}
                                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user.status)} rounded-full border-2 border-[var(--medium-dark)]`}></div>
                                        </div>

                                        {/* User Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-white font-medium truncate">{user.name}</h3>
                                                <Badge className={`text-xs ${getRoleColor(user.role)}`}>
                                                    {user.role}
                                                </Badge>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    <span className="truncate">{user.email}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Phone className="w-3 h-3" />
                                                    <span>{user.phone}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status */}
                                        <div className="text-right">
                                            <span className={`text-xs capitalize ${user.status === 'online' ? 'text-green-400' :
                                                user.status === 'away' ? 'text-yellow-400' :
                                                    'text-gray-400'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-[var(--primary-color)] text-center">
                    <p className="text-sm text-gray-400">
                        Select a client to start a new conversation
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserListModal;
