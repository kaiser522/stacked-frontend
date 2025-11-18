import React, { useState } from 'react';
import { Camera, CheckCircle, Target, TrendingUp, FileText, Eye, Star, DollarSign } from 'lucide-react';

const ListingMediaCopyThatSells = () => {
    const [completedChecks, setCompletedChecks] = useState([]);

    const handleCheckToggle = (checkId) => {
        setCompletedChecks(prev =>
            prev.includes(checkId)
                ? prev.filter(id => id !== checkId)
                : [...prev, checkId]
        );
    };

    const checklistItems = [
        { id: 'lights', text: 'All lights ON: Every room, every lamp, under-cabinet lighting, exterior lights' },
        { id: 'declutter', text: 'Declutter completely: Remove 50% more than you think necessary' },
        { id: 'stage', text: 'Stage for lifestyle: Set dining table, add throw pillows, fresh flowers' },
        { id: 'hide', text: 'Hide personal items: Family photos, medications, pet supplies' },
        { id: 'blinds', text: 'Open all blinds/curtains: Maximize natural light in every room' },
        { id: 'bedding', text: 'Fresh towels/bedding: Make beds perfectly, fold towels uniformly' },
        { id: 'mirrors', text: 'Clean all mirrors/glass: Windows, sliding doors, bathroom mirrors' }
    ];

    const shotSequence = [
        { number: 1, title: 'Hero Exterior Shot', description: 'Best angle of front of house, golden hour lighting preferred' },
        { number: 2, title: 'Grand Entrance', description: 'Foyer, entryway, or impressive first view inside' },
        { number: 3, title: 'Main Living Space', description: 'Living room or great room, widest angle possible' },
        { number: 4, title: 'Kitchen Overview', description: 'Full kitchen view showing island/peninsula if present' },
        { number: 5, title: 'Primary Bedroom', description: 'Staged with bed made, wide angle showing space' },
        { number: 6, title: 'Primary Bathroom', description: 'Best angle of vanity, shower/tub if impressive' },
        { number: 7, title: 'Outdoor Living', description: 'Backyard, patio, or deck with lifestyle staging' }
    ];

    const copyExamples = [
        {
            type: 'Starter Home',
            template: 'Charming [style] in [neighborhood] where first-time buyers\' dreams come true. The [standout feature] creates [lifestyle benefit], while the [practical feature] handles daily life with ease. At [sq ft] and priced at [price], this [unique selling point] is exactly what you\'ve been waiting for.',
            color: 'text-[#00D4AA]',
            bgColor: 'bg-[#00D4AA]/10'
        },
        {
            type: 'Family Home',
            template: 'Impressive [style] in sought-after [neighborhood] where family memories are made. The [main living area] becomes command central for busy families, while the [outdoor space] provides endless entertainment for kids and adults alike. With [bedrooms/baths] and [key features], this [sq ft] sanctuary delivers the space and style your growing family deserves.',
            color: 'text-[#FFD700]',
            bgColor: 'bg-[#FFD700]/10'
        },
        {
            type: 'Luxury Home',
            template: 'Exceptional [style] estate in prestigious [neighborhood] where luxury living reaches new heights. The [stunning feature] commands attention from the moment you arrive, while [high-end amenity] elevates everyday experiences to resort-level indulgence. With [impressive stats] and [exclusive features], this [sq ft] masterpiece represents a rare opportunity in [market/price range].',
            color: 'text-[#FF6B35]',
            bgColor: 'bg-[#FF6B35]/10'
        }
    ];

    const buyerBehavior = [
        {
            category: 'Always Read (100%)',
            items: [
                'Price and main stats (bed/bath/sq ft)',
                'First sentence of description',
                'Photo captions on first 3 images',
                'Virtual tour thumbnail'
            ],
            color: 'text-[#00D4AA]',
            bgColor: 'bg-[#00D4AA]/10'
        },
        {
            category: 'Sometimes Read (60%)',
            items: [
                'Full first paragraph',
                'Bullet point features',
                'School information',
                'HOA/tax details'
            ],
            color: 'text-[#FFD700]',
            bgColor: 'bg-[#FFD700]/10'
        },
        {
            category: 'Rarely Read (20%)',
            items: [
                'Long feature lists',
                'Room dimensions',
                'Technical specifications',
                'Agent biography'
            ],
            color: 'text-[#FF6B35]',
            bgColor: 'bg-[#FF6B35]/10'
        }
    ];

    return (
        <div className="space-y-12">
            {/* Key Stats */}
            <div className="bg-gradient-to-r from-[#00D4AA] to-[#00B894] rounded-2xl p-8 text-center">
                <TrendingUp className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Listings with professional photos sell 32% faster and for 15% more</h3>
            </div>

            {/* Buyer Behavior Reality */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/10 rounded-2xl p-8 border-2 border-[#00D4AA]">
                    <h3 className="text-2xl font-bold text-[#00D4AA] mb-6 flex items-center gap-3">
                        <Target className="w-6 h-6" />
                        Buyer Behavior Reality:
                    </h3>
                    <ul className="space-y-3 text-white/80">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>89% judge a listing within 15 seconds</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>First 3 photos determine if they keep scrolling</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Most buyers read only the first paragraph</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>25+ photos = 40% more showing requests</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white/10 rounded-2xl p-8 border-2 border-[#00D4AA]">
                    <h3 className="text-2xl font-bold text-[#00D4AA] mb-6 flex items-center gap-3">
                        <DollarSign className="w-6 h-6" />
                        What Drives Offers:
                    </h3>
                    <ul className="space-y-3 text-white/80">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>High-quality exterior shots (curb appeal)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Bright, wide-angle interior photos</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Lifestyle shots (not just empty rooms)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span>Compelling first paragraph copy</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Photo Shot List */}
            <div className="bg-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-8">Essential Photo Shot List</h2>
                <p className="text-white/80 mb-8">This exact sequence maximizes engagement and showing requests:</p>

                <div className="bg-[#00D4AA]/10 rounded-xl p-6 border-2 border-[#00D4AA]">
                    <h3 className="text-xl font-bold text-[#00D4AA] mb-6">Must-Have Shots (In Order)</h3>

                    <div className="space-y-4">
                        {shotSequence.map((shot) => (
                            <div key={shot.number} className="bg-white/10 rounded-lg p-4 flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#00D4AA] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    {shot.number}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">{shot.title}</h4>
                                    <p className="text-white/80 text-sm">{shot.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#FFD700]/10 rounded-xl p-6 border-2 border-[#FFD700] mt-6">
                    <p className="text-[#FFD700] font-bold mb-2">📷 Pro Tip:</p>
                    <p className="text-white/90">Shoot every room twice: one wide angle showing the full space, one detail shot highlighting the best feature.</p>
                </div>
            </div>

            {/* Pre-Shoot Checklist */}
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-[#00D4AA]">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-8">Pre-Shoot Checklist</h2>
                <p className="text-white/80 mb-8">Complete this before the photographer arrives:</p>

                <div className="space-y-4">
                    {checklistItems.map((item) => (
                        <label
                            key={item.id}
                            className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${completedChecks.includes(item.id)
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

            {/* Copy Formula */}
            <div className="bg-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-8">The One-Paragraph Formula</h2>
                <p className="text-white/80 mb-8">This proven structure gets buyers to request showings:</p>

                <div className="bg-[#FF6B35]/20 rounded-xl p-6 border-2 border-[#FF6B35] font-mono">
                    <h3 className="text-xl font-bold text-[#FF6B35] mb-4">The SELL Formula:</h3>
                    <div className="text-white/90 space-y-2">
                        <p><strong>S</strong>tyle + Location Hook</p>
                        <p><strong>E</strong>motion-driven feature</p>
                        <p><strong>L</strong>ifestyle benefit</p>
                        <p><strong>L</strong>ogical closer (size, value, timing)</p>
                    </div>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="bg-white/10 rounded-lg p-4 border-l-4 border-[#FF6B35]">
                        <div className="text-[#FF6B35] font-bold mb-2">❌ WEAK:</div>
                        <p className="text-white/90">"3 bedroom, 2 bathroom home with updated kitchen and nice backyard. Close to schools and shopping. Move-in ready."</p>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4 border-l-4 border-[#00D4AA]">
                        <div className="text-[#00D4AA] font-bold mb-2">✅ STRONG:</div>
                        <p className="text-white/90">"Stunning craftsman in tree-lined Riverside District where morning coffee on your wraparound porch becomes a daily ritual. The chef's kitchen with marble countertops and premium appliances flows seamlessly to the family room, creating the perfect space for hosting holidays and homework sessions alike. With 2,150 sq ft of thoughtfully updated living space and a private backyard oasis, this rarely-available gem won't last long at $425,000."</p>
                    </div>
                </div>
            </div>

            {/* Copy Templates */}
            <div className="bg-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-8">Copy Templates by Property Type</h2>
                <p className="text-white/80 mb-8">Adapt these proven formulas for different homes:</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {copyExamples.map((template, index) => (
                        <div key={index} className={`${template.bgColor} rounded-xl p-6 border-2 border-[#00D4AA]`}>
                            <h3 className={`text-lg font-bold mb-4 ${template.color}`}>{template.type}</h3>
                            <p className="text-white/90 text-sm">{template.template}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* What Buyers Actually Read */}
            <div className="bg-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-[#00D4AA] mb-8">What Buyers Actually Read</h2>
                <p className="text-white/80 mb-8">Focus your energy on these high-impact sections:</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {buyerBehavior.map((category, index) => (
                        <div key={index} className={`${category.bgColor} rounded-xl p-6`}>
                            <h3 className={`text-lg font-bold mb-4 ${category.color}`}>{category.category}</h3>
                            <ul className="space-y-2">
                                {category.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-white/80">
                                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="bg-[#FF6B35]/10 rounded-xl p-6 mt-8">
                    <p className="text-white/90">
                        <strong>Takeaway:</strong> Put your best selling points in the first paragraph and photo captions.
                    </p>
                </div>
            </div>

            {/* Success Box */}
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-400/30 text-center">
                <Camera className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-400 mb-4">Marketing Mastery Complete!</h3>
                <p className="text-green-200 text-lg">
                    You now have the tools to create listings that sell faster and for more money.
                </p>
            </div>
        </div>
    );
};

export default ListingMediaCopyThatSells;
