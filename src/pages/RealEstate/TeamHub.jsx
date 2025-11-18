import React, { useState } from "react";
import toast from "react-hot-toast";

export default function TeamHub() {
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [showMemberDetails, setShowMemberDetails] = useState(null);
    const [teamMembers, setTeamMembers] = useState([
        { id: 1, name: 'Sarah Johnson (You)', email: 'sarah@realestate.com', status: 'Active Pro Subscription', isOwner: true },
        { id: 2, name: 'Mike Rodriguez', email: 'mike@realestate.com', status: 'Active Pro Subscription', isOwner: false },
        { id: 3, name: 'Lisa Chen', email: 'lisa@realestate.com', status: 'Active Pro Subscription', isOwner: false }
    ]);
    const [activities, setActivities] = useState([
        { who: 'MR', text: 'Mike Rodriguez shared the downtown condo listing with the team', time: '2 hours ago' },
        { who: 'LC', text: "Lisa Chen's Pro subscription verified - collaboration access granted", time: '1 day ago' },
        { who: 'SJ', text: 'Sarah Johnson invited James Wilson to join the team', time: '2 days ago' },
        { who: '⚠️', text: "Tom Anderson's collaboration access suspended - subscription lapsed", time: '3 days ago' }
    ]);

    const handleInviteMember = () => {
        if (inviteEmail && inviteEmail.includes('@')) {
            const newActivity = {
                who: 'SJ',
                text: `Sarah Johnson sent a team invitation to ${inviteEmail}`,
                time: 'Just now'
            };
            setActivities([newActivity, ...activities]);
            setInviteEmail('');
            setShowInviteModal(false);
            toast.success(`Invitation sent to ${inviteEmail}! They'll receive an email with instructions to join your team.`);
        } else {
            toast.error('Please enter a valid email address');
        }
    };

    const handleViewMember = (member) => {
        setShowMemberDetails(member);
    };

    const handleRemoveMember = (memberId, memberName) => {
        if (window.confirm(`Are you sure you want to remove ${memberName} from your team? They will lose access to all shared resources.`)) {
            setTeamMembers(teamMembers.filter(m => m.id !== memberId));
            const newActivity = {
                who: 'SJ',
                text: `Sarah Johnson removed ${memberName} from the team`,
                time: 'Just now'
            };
            setActivities([newActivity, ...activities]);
            toast.success(`${memberName} has been removed from the team.`);
        }
    };

    return (
        <div className="min-h-screen bg-[#2c3e50] text-white">
            <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#2c3e50] border-b border-[#34495e] pb-4 mb-6">
                    <div className="flex items-center text-2xl font-bold">
                        {/* <span className="inline-block w-[25px] h-[25px] mr-3 rounded-[3px]" style={{ background: 'linear-gradient(45deg, #5dade2 0%, #5dade2 50%, transparent 50%)' }} /> */}
                        STACKED CRM Pro - Team Hub
                    </div>
                    <div className="flex items-center gap-4 bg-[#34495e] px-4 py-3 rounded-lg">
                        <div className="flex items-center gap-2 text-[#5dade2] font-medium">
                            <span>🤝</span>
                            <span>{teamMembers.length}</span> team members
                        </div>
                        <button
                            onClick={() => setShowInviteModal(true)}
                            className="bg-[#27ae60] hover:bg-[#229954] text-white font-bold px-4 py-2 rounded-md transition-all hover:scale-105 active:scale-95"
                        >
                            + Invite Member
                        </button>
                    </div>
                </div>

                {/* Hero */}
                <section className="bg-[#34495e] rounded-2xl p-6 text-center mb-6">
                    <h1 className="text-3xl font-bold text-[#5dade2] mb-3">Unlimited Team Collaboration</h1>
                    <p className="text-[#bdc3c7] max-w-3xl mx-auto">Collaborate with unlimited team members - each person just needs their own Stacked CRM account</p>
                </section>

                {/* Verification Info */}
                <section className="rounded-2xl p-6 mb-6 border-2 border-[#f39c12] bg-[#34495e]">
                    <h2 className="text-2xl font-bold text-[#f39c12] text-center mb-6">How Team Verification Works</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {["Invite Anyone", "Account Verification", "Instant Collaboration", "Ongoing Monitoring"].map((t, i) => (
                            <div key={t} className="bg-[#2c3e50] rounded-lg p-4 text-center">
                                <div className="w-8 h-8 rounded-full bg-[#f39c12] text-[#2c3e50] font-bold flex items-center justify-center mx-auto mb-3">{i + 1}</div>
                                <h4 className="font-semibold mb-2">{t}</h4>
                                <p className="text-[#bdc3c7] text-sm">{i === 0 ? 'Send collaboration invites to unlimited team members via email' : i === 1 ? 'System automatically verifies each member has an active Pro subscription' : i === 2 ? 'Verified members gain immediate access to shared deals and team features' : 'Access is automatically revoked if subscription lapses'}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Members */}
                <section className="rounded-2xl p-6 mb-6 border-2 border-[#5dade2] bg-[#34495e]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[#5dade2] text-xl font-bold">Your Team Members</h2>
                        <button
                            onClick={() => setShowInviteModal(true)}
                            className="bg-[#27ae60] hover:bg-[#229954] text-white font-bold px-4 py-2 rounded-md transition-all hover:scale-105 active:scale-95"
                        >
                            + Invite New Member
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {teamMembers.map((m) => (
                            <div key={m.id} className="bg-[#2c3e50] rounded-lg p-5 border-2 border-[#27ae60] transition-all hover:shadow-lg hover:shadow-[#5dade2]/20">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2 text-sm font-medium"><span className="inline-block w-2 h-2 rounded-full bg-[#27ae60]" />Verified Pro User</div>
                                    <div className="flex items-center gap-2 text-[#bdc3c7]">
                                        <button
                                            onClick={() => handleViewMember(m)}
                                            className="hover:text-[#5dade2] transition-all hover:scale-125 active:scale-95"
                                            title="View member details"
                                        >
                                            👁️
                                        </button>
                                        {!m.isOwner && (
                                            <button
                                                onClick={() => handleRemoveMember(m.id, m.name)}
                                                className="hover:text-[#e74c3c] transition-all hover:scale-125 active:scale-95"
                                                title="Remove member"
                                            >
                                                🚫
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="font-bold">{m.name}</div>
                                    <div className="text-[#bdc3c7] text-sm">{m.email}</div>
                                    <div className="inline-block mt-2 text-xs font-bold bg-[#27ae60] text-white px-2 py-1 rounded-[12px]">{m.status}</div>
                                </div>
                                <div className="text-[#bdc3c7] text-xs">
                                    <strong>Collaboration Access:</strong>
                                    <ul className="mt-1 space-y-1">
                                        <li>✅ Full team collaboration</li>
                                        <li>✅ Can view all shared deals</li>
                                        <li>✅ Team dashboard access</li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features */}
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    {[
                        { icon: '🤝', title: 'Shared Deal Pipeline', desc: 'Collaborate on deals, assign tasks, and track progress together in real-time.' },
                        { icon: '📊', title: 'Team Performance Dashboard', desc: 'View combined team metrics and collaborative statistics.' },
                        { icon: '🔄', title: 'Smart Lead Distribution', desc: 'Distribute leads among team members based on availability and specialization.' },
                        { icon: '🔒', title: 'Automatic Access Control', desc: 'Real-time subscription monitoring controls secure access.' }
                    ].map((f) => (
                        <div key={f.title} className="bg-[#34495e] rounded-2xl p-6 border border-transparent hover:border-[#5dade2] transition-transform hover:-translate-y-0.5">
                            <div className="text-4xl mb-3">{f.icon}</div>
                            <div className="text-[#5dade2] font-bold text-lg mb-2">{f.title}</div>
                            <div className="text-[#bdc3c7]">{f.desc}</div>
                        </div>
                    ))}
                </section>

                {/* Activity Feed */}
                <section className="bg-[#34495e] rounded-2xl p-6">
                    <h3 className="text-[#5dade2] text-xl font-bold mb-4">Recent Team Activity</h3>
                    <div className="space-y-3">
                        {activities.map((a, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-[#2c3e50] rounded-lg transition-all hover:bg-[#34495e]">
                                <div className="w-10 h-10 rounded-full bg-[#5dade2] text-[#2c3e50] font-bold flex items-center justify-center text-sm">{a.who}</div>
                                <div className="flex-1">
                                    <div className="mb-1">{a.text}</div>
                                    <div className="text-[#bdc3c7] text-xs">{a.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Invite Modal */}
                {showInviteModal && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowInviteModal(false)}>
                        <div className="bg-[#34495e] rounded-2xl p-8 max-w-md w-full border-2 border-[#5dade2]" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-2xl font-bold text-[#5dade2] mb-4">Invite Team Member</h2>
                            <p className="text-[#bdc3c7] mb-6">Send an invitation to collaborate. They'll need an active Stacked CRM Pro subscription to join.</p>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleInviteMember()}
                                    placeholder="colleague@example.com"
                                    className="w-full px-4 py-3 rounded-lg bg-[#2c3e50] border border-[#5dade2]/30 text-white focus:outline-none focus:border-[#5dade2] transition-colors"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleInviteMember}
                                    className="flex-1 bg-[#27ae60] hover:bg-[#229954] text-white font-bold px-6 py-3 rounded-lg transition-all hover:scale-105 active:scale-95"
                                >
                                    Send Invitation
                                </button>
                                <button
                                    onClick={() => setShowInviteModal(false)}
                                    className="flex-1 bg-[#e74c3c] hover:bg-[#c0392b] text-white font-bold px-6 py-3 rounded-lg transition-all hover:scale-105 active:scale-95"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Member Details Modal */}
                {showMemberDetails && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowMemberDetails(null)}>
                        <div className="bg-[#34495e] rounded-2xl p-8 max-w-lg w-full border-2 border-[#5dade2]" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-2xl font-bold text-[#5dade2] mb-6">Team Member Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[#bdc3c7] text-sm">Name</label>
                                    <div className="text-xl font-bold">{showMemberDetails.name}</div>
                                </div>
                                <div>
                                    <label className="text-[#bdc3c7] text-sm">Email</label>
                                    <div className="text-lg">{showMemberDetails.email}</div>
                                </div>
                                <div>
                                    <label className="text-[#bdc3c7] text-sm">Status</label>
                                    <div className="inline-block mt-1 text-sm font-bold bg-[#27ae60] text-white px-3 py-1 rounded-full">{showMemberDetails.status}</div>
                                </div>
                                <div>
                                    <label className="text-[#bdc3c7] text-sm mb-2 block">Permissions</label>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <span className="text-[#27ae60]">✅</span>
                                            <span>Full team collaboration access</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-[#27ae60]">✅</span>
                                            <span>Can view all shared deals and contacts</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-[#27ae60]">✅</span>
                                            <span>Team dashboard and analytics access</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-[#27ae60]">✅</span>
                                            <span>Can share and assign deals</span>
                                        </li>
                                        {showMemberDetails.isOwner && (
                                            <li className="flex items-center gap-2">
                                                <span className="text-[#f39c12]">👑</span>
                                                <span className="text-[#f39c12] font-bold">Team Owner</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowMemberDetails(null)}
                                className="w-full mt-6 bg-[#5dade2] hover:bg-[#4a9bca] text-white font-bold px-6 py-3 rounded-lg transition-all hover:scale-105 active:scale-95"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


