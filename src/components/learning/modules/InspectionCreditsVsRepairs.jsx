import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Wrench, DollarSign, Calculator, FileText } from 'lucide-react';

const InspectionCreditsVsRepairs = () => {
    const [completedChecks, setCompletedChecks] = useState([]);

    const handleCheckToggle = (checkId) => {
        setCompletedChecks(prev => 
            prev.includes(checkId) 
                ? prev.filter(id => id !== checkId)
                : [...prev, checkId]
        );
    };

    const checklistItems = [
        { id: 'categorize', text: 'Categorize all issues: Safety (must repair) vs. Functional (can credit) vs. Cosmetic (easy credit)' },
        { id: 'loan-type', text: 'Check loan type requirements: FHA/VA are strict, Conventional is flexible' },
        { id: 'calculate', text: 'Calculate strategic credit amounts: Repair cost + 30-50% for convenience/risk' },
        { id: 'bundle', text: 'Bundle small items: Don\'t itemize every $50 repair—group into meaningful amounts' },
        { id: 'draft', text: 'Draft professional request: Emphasize seller convenience and closing timeline' },
        { id: 'deadline', text: 'Set response deadline: Give seller 48-72 hours to respond' },
        { id: 'lender', text: 'Confirm with lender: Make sure credit amount won\'t affect loan approval' }
    ];

    const pricingGuide = [
        { issue: 'HVAC Service/Tune-up', repairCost: '$150-300', creditRequest: '$400-600' },
        { issue: 'Minor Electrical', repairCost: '$200-500', creditRequest: '$500-800' },
        { issue: 'Plumbing Leaks', repairCost: '$150-400', creditRequest: '$400-700' },
        { issue: 'Appliance Issues', repairCost: '$200-500', creditRequest: '$400-800' },
        { issue: 'Multiple Small Items', repairCost: '$300-800', creditRequest: '$800-1,500' }
    ];

    const scripts = [
        {
            title: 'Initial Credit Request:',
            content: 'Based on the inspection findings, we\'re requesting a $1,800 credit at closing to address the HVAC maintenance and minor electrical items. This allows the seller to avoid coordinating contractors and potential delays, while giving the buyer flexibility to handle these post-closing with their preferred professionals.',
            color: 'text-[#00D4AA]'
        },
        {
            title: 'When Seller Counters Low:',
            content: 'We appreciate the seller\'s willingness to work with us. Our request accounts for current contractor rates and the buyer\'s time investment. We\'d be happy to meet in the middle at $1,400 to keep this deal moving forward.',
            color: 'text-[#FFD700]'
        },
        {
            title: 'When Seller Refuses:',
            content: 'We understand the seller\'s position. However, these items were identified by a licensed inspector and need addressing. If credits aren\'t acceptable, we\'ll need the seller to complete repairs with proper permits and documentation before closing.',
            color: 'text-[#FF6B35]'
        }
    ];

    const lenderRequirements = [
        {
            type: 'Conventional Loans',
            description: 'Almost always allow credits',
            details: 'Only require repairs for major structural or safety issues that affect habitability.',
            color: 'text-[#00D4AA]',
            bgColor: 'bg-[#00D4AA]/10',
            borderColor: 'border-[#00D4AA]'
        },
        {
            type: 'FHA/VA Loans',
            description: 'Repairs often required',
            details: 'Must repair: peeling paint (pre-1978), safety hazards, broken windows, electrical issues, non-functioning systems.',
            color: 'text-[#FF6B35]',
            bgColor: 'bg-[#FF6B35]/10',
            borderColor: 'border-[#FF6B35]'
        }
    ];

    return (
        <div className="space-y-12">
            {/* Decision Box */}
            <div className="bg-gradient-to-r from-[#00D4AA] to-[#00B894] rounded-2xl p-8 text-center">
                <CheckCircle className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Credits win 90% of the time when closing is under 30 days</h3>
            </div>

            {/* Choose Credits vs Repairs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/10 rounded-2xl p-8 border-2 border-[#00D4AA] text-center">
                    <h3 className="text-2xl font-bold text-[#00D4AA] mb-6 flex items-center justify-center gap-3">
                        <CheckCircle className="w-6 h-6" />
                        Choose CREDITS When:
                    </h3>
                    <ul className="space-y-3 text-white/80 text-left">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Closing in less than 30 days</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Issues cost under $5,000 total</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Multiple small problems</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Seller is cooperative</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Conventional or cash buyer</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-8 border-2 border-[#FF6B35] text-center">
                    <h3 className="text-2xl font-bold text-[#FF6B35] mb-6 flex items-center justify-center gap-3">
                        <Wrench className="w-6 h-6" />
                        Must Use REPAIRS When:
                    </h3>
                    <ul className="space-y-3 text-white/80 text-left">
                        <li className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>FHA/VA loan flags safety issues</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>Structural or electrical hazards</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>Lender requires certification</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>Issues affect habitability</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>Code violations exist</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Interactive Checklist */}
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-[#00D4AA]">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-6">Your Post-Inspection Checklist</h2>
                <p className="text-white/80 mb-8">Check off each item as you go through your inspection response:</p>
                
                <div className="space-y-4">
                    {checklistItems.map((item) => (
                        <label
                            key={item.id}
                            className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                                completedChecks.includes(item.id)
                                    ? 'bg-[#00D4AA]/30 border-l-4 border-[#00D4AA] transform translate-x-2'
                                    : 'bg-white/5 hover:bg-white/10'
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={completedChecks.includes(item.id)}
                                onChange={() => handleCheckToggle(item.id)}
                                className="w-6 h-6 text-[#00D4AA] bg-transparent border-2 border-[#00D4AA] rounded focus:ring-[#00D4AA] focus:ring-2"
                            />
                            <span className="text-white/90 font-medium">{item.text}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Credit Pricing Guide */}
            <div className="bg-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-8">Credit Pricing Cheat Sheet</h2>
                <p className="text-white/80 mb-8">What to actually request vs. estimated repair costs:</p>
                
                <div className="bg-white/95 text-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-[#1e3a5f] text-white">
                            <tr>
                                <th className="p-4 text-left font-semibold">Common Issue</th>
                                <th className="p-4 text-left font-semibold">Repair Cost</th>
                                <th className="p-4 text-left font-semibold">Credit Request</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pricingGuide.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="p-4">{item.issue}</td>
                                    <td className="p-4">{item.repairCost}</td>
                                    <td className="p-4 font-semibold text-[#00D4AA]">{item.creditRequest}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="mt-6 p-4 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]">
                    <p className="text-white/90">
                        <strong>Rule of thumb:</strong> Add 30-50% to repair estimates. Credits should cover contractor convenience, potential complications, and buyer inconvenience.
                    </p>
                </div>
            </div>

            {/* Scripts */}
            <div className="bg-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-8">What to Actually Say</h2>
                <p className="text-white/80 mb-8">Copy and paste these proven scripts:</p>
                
                <div className="space-y-6">
                    {scripts.map((script, index) => (
                        <div key={index} className="bg-white/10 rounded-xl p-6">
                            <h3 className={`text-xl font-bold mb-4 ${script.color}`}>{script.title}</h3>
                            <div className="bg-[#00D4AA]/20 rounded-lg p-4 border-l-4 border-[#00D4AA]">
                                <p className="text-white/90 italic">"{script.content}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lender Requirements */}
            <div className="bg-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-8">What Lenders Actually Require</h2>
                <p className="text-white/80 mb-8">Don't guess—here's what different loan types actually mandate:</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {lenderRequirements.map((lender, index) => (
                        <div key={index} className={`${lender.bgColor} rounded-xl p-6 border-2 ${lender.borderColor}`}>
                            <h3 className={`text-xl font-bold mb-4 ${lender.color}`}>{lender.type}</h3>
                            <p className="text-white/90 font-semibold mb-2">{lender.description}</p>
                            <p className="text-white/80">{lender.details}</p>
                        </div>
                    ))}
                </div>
                
                <div className="bg-[#FFD700]/10 rounded-xl p-6 border-2 border-[#FFD700] mt-8">
                    <p className="text-[#FFD700] font-bold mb-2">💡 Pro Tip:</p>
                    <p className="text-white/90">When in doubt, call your lender BEFORE submitting credit requests. Five minutes now saves hours of problems later.</p>
                </div>
            </div>

            {/* Success Box */}
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-400/30 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-400 mb-4">Inspection Strategy Mastery Complete!</h3>
                <p className="text-green-200 text-lg">
                    You now know when to use credits vs. repairs and how to structure them for maximum success.
                </p>
            </div>
        </div>
    );
};

export default InspectionCreditsVsRepairs;
