import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Shield, Users, Target, Eye } from 'lucide-react';

const FairHousingSafeMarketing = () => {
    const [completedChecks, setCompletedChecks] = useState([]);

    const handleCheckToggle = (checkId) => {
        setCompletedChecks(prev => 
            prev.includes(checkId) 
                ? prev.filter(id => id !== checkId)
                : [...prev, checkId]
        );
    };

    const complianceChecks = [
        { id: 'family-refs', text: 'Remove all family references: No "perfect for families," "family room," or "great for kids"' },
        { id: 'photos-bias', text: 'Check photos for bias: Remove images showing only one demographic group' },
        { id: 'audit-targeting', text: 'Audit targeting settings: Never target by age, gender, family status, or ethnicity' },
        { id: 'safety-language', text: 'Review safety language: Replace "safe" with "well-maintained" or "established"' },
        { id: 'school-refs', text: 'Remove school references: Don\'t mention districts, ratings, or proximity' },
        { id: 'lifestyle-impl', text: 'Check lifestyle implications: Avoid "young professionals," "retirees," "empty nesters"' },
        { id: 'eho-logo', text: 'Include Equal Housing logo: Add official EHO logo to all marketing materials' }
    ];

    const safeExamples = [
        {
            category: 'Living Room Descriptions',
            safe: 'Spacious living area with vaulted ceilings and natural light',
            risky: 'Perfect family room for entertaining with kids'
        },
        {
            category: 'Neighborhood Descriptions',
            safe: 'Established neighborhood with mature trees and sidewalks',
            risky: 'Safe area popular with young families'
        },
        {
            category: 'Property Features',
            safe: 'Main floor primary suite with walk-in closet',
            risky: 'Perfect for empty nesters who want single-level living'
        }
    ];

    const clientQuestions = [
        {
            question: 'When Asked About Schools:',
            response: '"I can\'t provide school ratings or recommendations, but I can share the district website where you can research schools that fit your family\'s needs. Would you like me to send you that link?"',
            color: 'text-[#FFD700]'
        },
        {
            question: 'When Asked About Safety:',
            response: '"I recommend checking crime statistics on the city\'s website or meeting with local police community liaisons. I can also show you the security features of properties we tour."',
            color: 'text-[#00D4AA]'
        },
        {
            question: 'When Asked About Demographics:',
            response: '"I focus on helping you find the right property features and location. I\'d encourage you to visit neighborhoods at different times to get a feel for the community yourself."',
            color: 'text-[#FF6B35]'
        }
    ];

    const digitalMarketingRules = [
        {
            platform: 'Facebook/Instagram Targeting',
            safe: [
                'Location (zip codes, cities)',
                'Age 18+ (minimum only)',
                'Interests (real estate, home improvement)'
            ],
            avoid: [
                'Never target by family status',
                'Never exclude age ranges',
                'Never target by gender'
            ],
            color: 'text-[#00D4AA]'
        },
        {
            platform: 'Google Ads Requirements',
            safe: [
                'Geographic targeting only',
                'Keywords: "homes for sale," "real estate"',
                'Property type: "condo," "single family"'
            ],
            avoid: [
                'No demographic targeting',
                'No interest-based audiences',
                'Must include EHO statement'
            ],
            color: 'text-[#FFD700]'
        }
    ];

    return (
        <div className="space-y-12">
            {/* Warning Box */}
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#E55533] rounded-2xl p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Fair Housing violations can cost $100k+ in fines and lawsuits</h3>
            </div>

            {/* Safe vs Risky Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/10 rounded-2xl p-8 border-2 border-[#00D4AA]">
                    <h3 className="text-2xl font-bold text-[#00D4AA] mb-6 flex items-center gap-3">
                        <CheckCircle className="w-6 h-6" />
                        Always Safe to Advertise:
                    </h3>
                    <ul className="space-y-3 text-white/80">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Property features & amenities</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Price, financing terms</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Square footage, lot size</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Architectural style</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Location (address/neighborhood)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Transportation access</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-8 border-2 border-[#FF6B35]">
                    <h3 className="text-2xl font-bold text-[#FF6B35] mb-6 flex items-center gap-3">
                        <XCircle className="w-6 h-6" />
                        Never Advertise These:
                    </h3>
                    <ul className="space-y-3 text-white/80">
                        <li className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>"Perfect for families"</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>"Adult community"</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>"Safe neighborhood"</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>School district quality</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>Demographics ("young professionals")</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                            <span>Lifestyle preferences</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Compliance Checklist */}
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-[#00D4AA]">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-6">Your Marketing Compliance Checklist</h2>
                <p className="text-white/80 mb-8">Review every listing, ad, and social media post:</p>
                
                <div className="space-y-4">
                    {complianceChecks.map((check) => (
                        <label
                            key={check.id}
                            className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                                completedChecks.includes(check.id)
                                    ? 'bg-[#00D4AA]/30 border-l-4 border-[#00D4AA] transform translate-x-2'
                                    : 'bg-white/5 hover:bg-white/10'
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={completedChecks.includes(check.id)}
                                onChange={() => handleCheckToggle(check.id)}
                                className="w-6 h-6 text-[#00D4AA] bg-transparent border-2 border-[#00D4AA] rounded focus:ring-[#00D4AA] focus:ring-2"
                            />
                            <span className="text-white/90 font-medium">{check.text}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Safe vs Risky Examples */}
            <div className="bg-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-8">Safe vs. Risky Ad Copy Examples</h2>
                <p className="text-white/80 mb-8">Real examples of what works and what gets you in trouble:</p>
                
                <div className="space-y-8">
                    {safeExamples.map((example, index) => (
                        <div key={index} className="bg-[#FFD700]/10 rounded-xl p-6 border-2 border-[#FFD700]">
                            <h3 className="text-xl font-bold text-[#FFD700] mb-6">{example.category}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/10 rounded-lg p-4 border-l-4 border-[#00D4AA]">
                                    <div className="text-[#00D4AA] font-bold mb-2">✅ SAFE:</div>
                                    <p className="text-white/90">"{example.safe}"</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4 border-l-4 border-[#FF6B35]">
                                    <div className="text-[#FF6B35] font-bold mb-2">🚨 RISKY:</div>
                                    <p className="text-white/90">"{example.risky}"</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Handling Client Questions */}
            <div className="bg-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-8">How to Handle Protected Class Questions</h2>
                <p className="text-white/80 mb-8">When clients ask about schools, safety, or demographics:</p>
                
                <div className="space-y-6">
                    {clientQuestions.map((qa, index) => (
                        <div key={index} className="bg-[#FFD700]/10 rounded-xl p-6 border-2 border-[#FFD700]">
                            <h3 className={`text-xl font-bold mb-4 ${qa.color}`}>{qa.question}</h3>
                            <p className="text-white/90 italic">"{qa.response}"</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Digital Marketing Rules */}
            <div className="bg-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-8">Social Media & Digital Advertising Rules</h2>
                <p className="text-white/80 mb-8">Platform-specific compliance requirements:</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {digitalMarketingRules.map((rule, index) => (
                        <div key={index} className="bg-white/10 rounded-xl p-6">
                            <h3 className={`text-xl font-bold mb-6 ${rule.color}`}>{rule.platform}</h3>
                            
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-green-400 mb-3">✅ Safe Targeting:</h4>
                                <ul className="space-y-2">
                                    {rule.safe.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-white/80">
                                            <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold text-red-400 mb-3">🚨 Avoid:</h4>
                                <ul className="space-y-2">
                                    {rule.avoid.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-white/80">
                                            <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="bg-[#FFD700]/10 rounded-xl p-6 border-2 border-[#FFD700] mt-8">
                    <p className="text-[#FFD700] font-bold mb-2">💡 Pro Tip:</p>
                    <p className="text-white/90">Always use broad, inclusive targeting. It's better to reach too many people than to accidentally exclude protected classes.</p>
                </div>
            </div>

            {/* Success Box */}
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-400/30 text-center">
                <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-400 mb-4">Compliance Mastery Complete!</h3>
                <p className="text-green-200 text-lg">
                    You're now equipped to create marketing materials that attract buyers while staying compliant with Fair Housing laws.
                </p>
            </div>
        </div>
    );
};

export default FairHousingSafeMarketing;
