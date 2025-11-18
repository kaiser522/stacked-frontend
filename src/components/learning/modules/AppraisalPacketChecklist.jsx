import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, FileText, Home, Wrench, DollarSign } from 'lucide-react';

const AppraisalPacketChecklist = () => {
    const [completedItems, setCompletedItems] = useState([]);
    const [progress, setProgress] = useState(0);

    const handleItemToggle = (itemId) => {
        setCompletedItems(prev => {
            const newCompleted = prev.includes(itemId) 
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId];
            
            const totalItems = 20; // Total number of checklist items
            setProgress((newCompleted.length / totalItems) * 100);
            return newCompleted;
        });
    };

    const checklistItems = [
        // Required Documents
        { id: 'contract', text: 'Purchase Contract: Fully executed contract with all addenda and amendments', category: 'required' },
        { id: 'mls', text: 'MLS Listing: Current listing with all photos and complete feature list', category: 'required' },
        { id: 'survey', text: 'Property Survey: Recent survey showing lot lines, easements, encroachments', category: 'required' },
        { id: 'hoa', text: 'HOA Documents: Declaration, bylaws, budget, management contact info', category: 'required' },
        { id: 'tax', text: 'Recent Tax Records: Current year property tax assessment and bill', category: 'required' },
        
        // Improvement Documentation
        { id: 'receipts', text: 'Renovation Receipts: All invoices for major updates (HVAC, roof, flooring, etc.)', category: 'improvements' },
        { id: 'permits', text: 'Permit Records: Building permits for additions, electrical, plumbing work', category: 'improvements' },
        { id: 'appliances', text: 'Appliance List: Make, model, year of all included appliances with receipts', category: 'improvements' },
        { id: 'warranties', text: 'Warranty Information: HVAC, roof, appliance warranties still in effect', category: 'improvements' },
        
        // Comparable Sales Analysis
        { id: 'comps', text: 'Recent Comps: 3-6 similar homes sold within 90 days in same neighborhood', category: 'comps' },
        { id: 'active', text: 'Active Listings: Currently for sale properties that compete with subject', category: 'comps' },
        { id: 'pending', text: 'Pending Sales: Under contract properties that show market activity', category: 'comps' },
        { id: 'trends', text: 'Market Trends: Neighborhood price trends, days on market, absorption rate', category: 'comps' },
        
        // Final Steps
        { id: 'email', text: 'Email packet 24 hours ahead: Send all documents to appraiser before appointment', category: 'final' },
        { id: 'access', text: 'Prepare property access: Unlock all areas, turn on lights, open blinds', category: 'final' },
        { id: 'features', text: 'Create feature highlight sheet: One-page list of major upgrades and unique features', category: 'final' },
        { id: 'confirm', text: 'Confirm appointment details: Time, date, contact info, any access requirements', category: 'final' },
        { id: 'backup', text: 'Print backup copies: Have physical copies of all key documents available', category: 'final' }
    ];

    const getCategoryIcon = (category) => {
        switch(category) {
            case 'required': return <FileText className="w-5 h-5" />;
            case 'improvements': return <Wrench className="w-5 h-5" />;
            case 'comps': return <DollarSign className="w-5 h-5" />;
            case 'final': return <CheckCircle className="w-5 h-5" />;
            default: return <FileText className="w-5 h-5" />;
        }
    };

    const getCategoryColor = (category) => {
        switch(category) {
            case 'required': return 'text-[#00D4AA]';
            case 'improvements': return 'text-[#FFD700]';
            case 'comps': return 'text-[#FF6B35]';
            case 'final': return 'text-[#5dade2]';
            default: return 'text-[#00D4AA]';
        }
    };

    const getCategoryTitle = (category) => {
        switch(category) {
            case 'required': return '📋 Required Documents';
            case 'improvements': return '📝 Improvement Documentation';
            case 'comps': return '🏘️ Comparable Sales Analysis';
            case 'final': return '✅ Final Preparation Steps';
            default: return 'Documents';
        }
    };

    const groupedItems = checklistItems.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <div className="space-y-12">
            {/* Warning Box */}
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#E55533] rounded-2xl p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Incomplete appraisal packets cause 40% of low valuations</h3>
            </div>

            {/* Results Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/10 rounded-2xl p-8 border-2 border-[#00D4AA]">
                    <h3 className="text-2xl font-bold text-[#00D4AA] mb-6 flex items-center gap-3">
                        <CheckCircle className="w-6 h-6" />
                        Complete Packet Results:
                    </h3>
                    <ul className="space-y-3 text-white/80">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Appraisal matches contract price 89% of time</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Faster turnaround (7-10 days vs 14+)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Fewer revision requests</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Appraiser confidence in valuation</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Smoother closing process</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-8 border-2 border-[#FF6B35]">
                    <h3 className="text-2xl font-bold text-[#FF6B35] mb-6 flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6" />
                        Missing Info Consequences:
                    </h3>
                    <ul className="space-y-3 text-white/80">
                        <li className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>Low appraisal (appraiser can't find value)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>Delayed reports and revisions</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>Missed unique property features</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>Deal falls through at financing</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>Renegotiation stress</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Progress Tracker */}
            <div className="bg-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-6">Your Packet Progress</h2>
                <div className="w-full bg-white/20 rounded-full h-6 mb-4">
                    <div 
                        className="bg-[#00D4AA] h-6 rounded-full transition-all duration-500 flex items-center justify-center text-white font-bold"
                        style={{ width: `${progress}%` }}
                    >
                        {Math.round(progress)}% Complete
                    </div>
                </div>
                <p className="text-center text-white/70">Check off items below to track your progress</p>
            </div>

            {/* Interactive Checklist */}
            <div className="space-y-8">
                {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} className="bg-white/10 rounded-2xl p-8 border-2 border-[#00D4AA]">
                        <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${getCategoryColor(category)}`}>
                            {getCategoryIcon(category)}
                            {getCategoryTitle(category)}
                        </h3>
                        
                        <div className="space-y-4">
                            {items.map((item) => (
                                <label
                                    key={item.id}
                                    className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                                        completedItems.includes(item.id)
                                            ? 'bg-[#00D4AA]/30 border-l-4 border-[#00D4AA] transform translate-x-2'
                                            : 'bg-white/5 hover:bg-white/10'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={completedItems.includes(item.id)}
                                        onChange={() => handleItemToggle(item.id)}
                                        className="w-6 h-6 text-[#00D4AA] bg-transparent border-2 border-[#00D4AA] rounded focus:ring-[#00D4AA] focus:ring-2"
                                    />
                                    <span className="text-white/90 font-medium">{item.text}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Special Property Considerations */}
            <div className="bg-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-8">Special Property Considerations</h2>
                <p className="text-white/80 mb-8">Include these details for unique properties:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#FFD700]/10 rounded-xl p-6 border-2 border-[#FFD700]">
                        <h3 className="text-xl font-bold text-[#FFD700] mb-4 flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            Single Family Homes
                        </h3>
                        <ul className="space-y-2 text-white/80">
                            <li>• Lot irregularities (corner, cul-de-sac, flag lot)</li>
                            <li>• Easements, right-of-ways, restrictions</li>
                            <li>• Outbuildings, pools, detached garages</li>
                            <li>• Landscaping, fencing, irrigation systems</li>
                            <li>• Recent exterior improvements (roof, siding, windows)</li>
                        </ul>
                    </div>
                    
                    <div className="bg-[#FFD700]/10 rounded-xl p-6 border-2 border-[#FFD700]">
                        <h3 className="text-xl font-bold text-[#FFD700] mb-4 flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            Condos & Townhomes
                        </h3>
                        <ul className="space-y-2 text-white/80">
                            <li>• HOA fee breakdown and what's included</li>
                            <li>• Building amenities (pool, gym, concierge)</li>
                            <li>• Parking arrangements (assigned, deeded, rental)</li>
                            <li>• Storage units included or available</li>
                            <li>• Recent building assessments or upcoming projects</li>
                            <li>• Pet policies and restrictions</li>
                        </ul>
                    </div>
                    
                    <div className="bg-[#FFD700]/10 rounded-xl p-6 border-2 border-[#FFD700]">
                        <h3 className="text-xl font-bold text-[#FFD700] mb-4 flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            Rural & Unique Properties
                        </h3>
                        <ul className="space-y-2 text-white/80">
                            <li>• Well and septic system details and recent inspections</li>
                            <li>• Outbuildings, barns, workshops with square footage</li>
                            <li>• Fencing, gates, agricultural features</li>
                            <li>• Water rights, mineral rights disclosures</li>
                            <li>• Access road maintenance agreements</li>
                            <li>• Zoning restrictions and permitted uses</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Success Box */}
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-400/30 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-400 mb-4">Complete packet = Higher appraised value + Faster closing</h3>
                <p className="text-green-200 text-lg">
                    You've mastered the appraisal packet checklist. Your clients will thank you for the smooth closings!
                </p>
            </div>
        </div>
    );
};

export default AppraisalPacketChecklist;
