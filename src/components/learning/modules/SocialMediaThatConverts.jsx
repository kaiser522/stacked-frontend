import React from 'react';

export default function SocialMediaThatConverts() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 p-16 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-lg">
                    <div className="w-16 h-16 bg-[#FF6B35] rounded-xl mx-auto mb-8 flex items-center justify-center text-2xl font-bold">
                        📱
                    </div>
                    <h1 className="text-5xl font-bold mb-5 leading-tight">Social Media That Actually Converts</h1>
                    <div className="bg-[#00D4AA] text-[#1e3a5f] px-6 py-3 rounded-full font-semibold text-lg inline-block mb-8">
                        Power Strategy
                    </div>
                    <p className="text-[#B0C4DE] text-xl max-w-2xl mx-auto mb-10">
                        Content frameworks, posting schedules, and engagement tactics that turn followers into clients.
                    </p>
                    <div className="bg-white/10 px-8 py-4 rounded-full font-semibold inline-block">
                        16 min read
                    </div>
                </div>

                {/* Highlight Box */}
                <div className="bg-gradient-to-r from-[#FF6B35] to-[#E55533] text-white p-8 rounded-3xl text-center text-xl font-bold mb-10">
                    Agents using strategic social media get 47% more referrals and repeat business
                </div>

                {/* Main Content */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <p className="text-[#E6F3FF] text-lg mb-5">
                        Most real estate agents post random property photos and wonder why their social media doesn't generate business.
                        The agents who consistently convert followers into clients know the secret: it's not about showing houses,
                        it's about building relationships and demonstrating expertise.
                    </p>
                    <p className="text-[#E6F3FF] text-lg">
                        This systematic approach transforms your social media from digital business cards into lead generation machines
                        that work around the clock.
                    </p>
                </div>

                {/* Platform Strategies */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <h2 className="text-4xl mb-8 text-[#00D4AA]">Platform-Specific Strategies</h2>
                    <p className="text-[#E6F3FF] text-lg mb-10">Each platform serves a different purpose in your conversion funnel:</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/10 border-2 border-[#00D4AA] rounded-2xl p-8 text-center">
                            <h3 className="text-[#00D4AA] text-2xl mb-5">Facebook</h3>
                            <p className="font-semibold mb-4">Best for: Local community building and referral generation</p>
                            <ul className="text-left text-[#E6F3FF] ml-5 space-y-2">
                                <li>• Neighborhood groups engagement</li>
                                <li>• Market update videos</li>
                                <li>• Client success stories</li>
                                <li>• Local events and sponsorships</li>
                            </ul>
                        </div>

                        <div className="bg-white/10 border-2 border-[#00D4AA] rounded-2xl p-8 text-center">
                            <h3 className="text-[#00D4AA] text-2xl mb-5">Instagram</h3>
                            <p className="font-semibold mb-4">Best for: Lifestyle branding and younger buyers</p>
                            <ul className="text-left text-[#E6F3FF] ml-5 space-y-2">
                                <li>• Behind-the-scenes content</li>
                                <li>• Property lifestyle shots</li>
                                <li>• Stories for daily engagement</li>
                                <li>• Reels for algorithm boost</li>
                            </ul>
                        </div>

                        <div className="bg-white/10 border-2 border-[#00D4AA] rounded-2xl p-8 text-center">
                            <h3 className="text-[#00D4AA] text-2xl mb-5">LinkedIn</h3>
                            <p className="font-semibold mb-4">Best for: Professional referrals and investor clients</p>
                            <ul className="text-left text-[#E6F3FF] ml-5 space-y-2">
                                <li>• Market analysis posts</li>
                                <li>• Industry insights</li>
                                <li>• Professional achievements</li>
                                <li>• B2B networking</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Content Mix */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <h2 className="text-4xl mb-8 text-[#00D4AA]">The Content Mix That Converts</h2>
                    <p className="text-[#E6F3FF] text-lg mb-10">Follow the 70-20-10 rule for maximum engagement and conversion:</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#00D4AA]/10 p-8 rounded-2xl text-center">
                            <h3 className="text-[#00D4AA] text-2xl mb-5">70% Value Content</h3>
                            <ul className="text-left text-[#E6F3FF] ml-5 space-y-2">
                                <li>• Market updates</li>
                                <li>• Home maintenance tips</li>
                                <li>• Buying/selling advice</li>
                                <li>• Local area insights</li>
                            </ul>
                        </div>

                        <div className="bg-[#FFD700]/10 p-8 rounded-2xl text-center">
                            <h3 className="text-[#FFD700] text-2xl mb-5">20% Personal Brand</h3>
                            <ul className="text-left text-[#E6F3FF] ml-5 space-y-2">
                                <li>• Behind-the-scenes</li>
                                <li>• Team introductions</li>
                                <li>• Community involvement</li>
                                <li>• Success celebrations</li>
                            </ul>
                        </div>

                        <div className="bg-[#FF6B35]/10 p-8 rounded-2xl text-center">
                            <h3 className="text-[#FF6B35] text-2xl mb-5">10% Direct Promotion</h3>
                            <ul className="text-left text-[#E6F3FF] ml-5 space-y-2">
                                <li>• New listings</li>
                                <li>• Just sold posts</li>
                                <li>• Client testimonials</li>
                                <li>• Service offerings</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Post Templates */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <h2 className="text-4xl mb-8 text-[#00D4AA]">High-Converting Post Templates</h2>
                    <p className="text-[#E6F3FF] text-lg mb-10">Copy and customize these proven formulas:</p>

                    <div className="space-y-8">
                        <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-2xl p-8">
                            <div className="text-[#00D4AA] font-bold text-xl mb-4">Market Monday Template</div>
                            <div className="bg-white/5 p-5 rounded-xl italic text-[#E6F3FF]">
                                "MARKET MONDAY: What's happening in [Your City] this week?<br /><br />
                                📈 Homes sold last week: [Number]<br />
                                ⏰ Average days on market: [Number] days<br />
                                💰 Median sale price: $[Amount]<br />
                                🏠 New listings: [Number]<br /><br />
                                What does this mean for you? [Brief insight about what buyers/sellers should know]<br /><br />
                                Thinking of buying or selling? Let's chat about how these trends affect your situation. Comment below or DM me!<br /><br />
                                #[YourCity]RealEstate #MarketUpdate #RealEstate"
                            </div>
                        </div>

                        <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-2xl p-8">
                            <div className="text-[#00D4AA] font-bold text-xl mb-4">Tip Tuesday Template</div>
                            <div className="bg-white/5 p-5 rounded-xl italic text-[#E6F3FF]">
                                "TIP TUESDAY: [Specific actionable tip]<br /><br />
                                Here's something I learned after [X] years in real estate: [Brief story or example]<br /><br />
                                The key is [main point]. This can save you [specific benefit - time, money, stress].<br /><br />
                                Have you experienced this? Share your story in the comments!<br /><br />
                                Save this post if you found it helpful 📌<br /><br />
                                #RealEstateTips #HomeBuying #HomeSelling"
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weekly Content Calendar */}
                <div className="bg-[#FFD700]/10 border-2 border-[#FFD700] rounded-2xl p-8 mb-10">
                    <h3 className="text-[#FFD700] text-2xl mb-5">Your 7-Day Content Framework</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="mb-2"><strong>Monday:</strong> Market Monday (stats and trends)</p>
                            <p className="mb-2"><strong>Tuesday:</strong> Tip Tuesday (educational content)</p>
                            <p className="mb-2"><strong>Wednesday:</strong> Behind-the-scenes or team spotlight</p>
                            <p className="mb-2"><strong>Thursday:</strong> Throwback/success story</p>
                        </div>
                        <div>
                            <p className="mb-2"><strong>Friday:</strong> Feature Friday (listing or neighborhood)</p>
                            <p className="mb-2"><strong>Saturday:</strong> Community events or local love</p>
                            <p className="mb-2"><strong>Sunday:</strong> Motivational or personal reflection</p>
                        </div>
                    </div>

                    <div className="bg-[#00D4AA]/10 p-5 rounded-xl mt-5">
                        <p className="text-[#E6F3FF] m-0">
                            <strong>Pro Tip:</strong> Post at consistent times when your audience is most active.
                            Test different times and track engagement to find your sweet spot.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-16 p-10 bg-white/10 rounded-3xl">
                    <p className="text-[#B0C4DE]">Stacked • Real Estate CRM • Power Plan Advanced Training</p>
                </div>
            </div>
        </div>
    );
}
