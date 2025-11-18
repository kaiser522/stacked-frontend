import { ChevronDown, ChevronUp } from "lucide-react";

function ReferralsTable({ referrals, searchTerm, sortConfig, setSortConfig, expandedReferral, setExpandedReferral, handleExport }) {
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const filteredReferrals = referrals.filter(ref =>
        ref.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ref.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ref.plan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedReferrals = [...filteredReferrals].sort((a, b) => {
        if (!sortConfig.key) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const maskEmail = (email) => {
        if (!email) return '';
        const parts = email.split('@');
        if (parts.length !== 2) return email;

        const username = parts[0];
        const domain = parts[1];

        if (username.length <= 4) return email;

        const maskedUsername = username.substring(0, 4) + '****';
        return `${maskedUsername}@${domain}`;
    };
    const maskAccountId = (id) => {
        if (!id) return '';
        if (id.length <= 4) return id;
        
        const lastFour = id.slice(-4);
        const maskedPart = '*'.repeat(id.length - 4);
        return `${maskedPart}${lastFour}`;
      };

    const toggleReferralDetails = (id) => {
        setExpandedReferral(expandedReferral === id ? null : id);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[var(--primary-color)]">Your Referrals</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="hover:bg-[#324250]">
                        <tr>
                            <th className="p-4 cursor-pointer" onClick={() => handleSort('name')}>
                                <div className="flex items-center gap-1">
                                    Name
                                    {sortConfig.key === 'name' && (
                                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th className="p-4 cursor-pointer" onClick={() => handleSort('date')}>
                                <div className="flex items-center gap-1">
                                    Date
                                    {sortConfig.key === 'date' && (
                                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th className="p-4 cursor-pointer" onClick={() => handleSort('plan')}>
                                <div className="flex items-center gap-1">
                                    Plan
                                    {sortConfig.key === 'plan' && (
                                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th className="p-4 cursor-pointer" onClick={() => handleSort('commission')}>
                                <div className="flex items-center gap-1">
                                    Commission
                                    {sortConfig.key === 'commission' && (
                                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th className="p-4 cursor-pointer" onClick={() => handleSort('status')}>
                                <div className="flex items-center gap-1">
                                    Status
                                    {sortConfig.key === 'status' && (
                                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                    )}
                                </div>
                            </th>
                            <th className="p-4">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedReferrals.map(ref => (
                            <>
                                <tr key={ref.id} className="border-b border-[#324250] hover:bg-[#324250]">
                                    <td className="p-4">{ref.name}</td>
                                    <td className="p-4">{new Date(ref.date).toLocaleDateString()}</td>
                                    <td className="p-4">{ref.plan}</td>
                                    <td className="p-4">${ref.commission}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${ref.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' : 'bg-green-900 text-green-300'
                                            }`}>
                                            {ref.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => toggleReferralDetails(ref.id)}
                                            className="text-[var(--primary-color)] hover:text-teal-300"
                                        >
                                            {expandedReferral === ref.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                    </td>
                                </tr>
                                {expandedReferral === ref.id && (
                                    <tr className="bg-slate-900">
                                        <td colSpan="6" className="p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <p className="font-medium">Contact Details</p>
                                                    <p>{maskEmail(ref.email)}</p>
                                                    <p>Account ID: {maskAccountId(ref.id)}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium">Referral Information</p>
                                                    <p>Date Joined: {new Date(ref.date).toLocaleDateString()}</p>
                                                    <p>Plan: {ref.plan}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium">Commission Details</p>
                                                    <p>Amount: ${ref.commission}</p>
                                                    <p>Status: {ref.status}</p>
                                                    {ref.status === 'Pending' && <p>Expected Payout: May 1, 2025</p>}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ReferralsTable