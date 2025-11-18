import React from 'react';

export default function LeadNurturingSequences() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 p-16 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-lg">
                    <div className="w-16 h-16 bg-[#FF6B35] rounded-xl mx-auto mb-8 flex items-center justify-center text-2xl font-bold">
                        📧
                    </div>
                    <h1 className="text-5xl font-bold mb-5 leading-tight">Lead Nurturing Sequences That Convert</h1>
                    <div className="bg-[#00D4AA] text-[#1e3a5f] px-6 py-3 rounded-full font-semibold text-lg inline-block mb-8">
                        Power Strategy
                    </div>
                    <p className="text-[#B0C4DE] text-xl max-w-2xl mx-auto mb-10">
                        Automated email sequences, behavioral triggers, and conversion optimization that turns cold leads into client meetings.
                    </p>
                    <div className="bg-white/10 px-8 py-4 rounded-full font-semibold inline-block">
                        15 min read
                    </div>
                </div>

                {/* Highlight Box */}
                <div className="bg-gradient-to-r from-[#00D4AA] to-[#00B894] text-white p-8 rounded-3xl text-center text-xl font-bold mb-10">
                    Agents using systematic nurturing convert 23% more leads to appointments
                </div>

                {/* Main Content */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <p className="text-[#E6F3FF] text-lg mb-5">
                        Most agents treat lead nurturing like throwing spaghetti at the wall—random emails, sporadic calls, hope for the best.
                        But the top producers know the secret: systematic, behavior-triggered sequences that deliver the right message at exactly the right moment in a prospect's buying journey.
                    </p>
                    <p className="text-[#E6F3FF] text-lg">
                        This isn't about sending more emails. It's about sending smarter emails that respond to what your leads actually do,
                        building trust and positioning yourself as the obvious choice when they're ready to act.
                    </p>
                </div>

                {/* Sequence Flow */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                        <div className="bg-[#00D4AA]/15 p-6 rounded-2xl text-center border-2 border-[#00D4AA]/30 relative">
                            <div className="bg-[#00D4AA] text-[#1e3a5f] w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-4">1</div>
                            <h4 className="text-[#00D4AA] font-bold mb-3">Capture</h4>
                            <p className="text-[#E6F3FF] text-sm">Lead enters your system through listing inquiry, home valuation, or buyer consultation</p>
                        </div>

                        <div className="bg-[#00D4AA]/15 p-6 rounded-2xl text-center border-2 border-[#00D4AA]/30 relative">
                            <div className="bg-[#00D4AA] text-[#1e3a5f] w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-4">2</div>
                            <h4 className="text-[#00D4AA] font-bold mb-3">Qualify</h4>
                            <p className="text-[#E6F3FF] text-sm">Initial sequence determines timeline, motivation, and readiness level</p>
                        </div>

                        <div className="bg-[#00D4AA]/15 p-6 rounded-2xl text-center border-2 border-[#00D4AA]/30 relative">
                            <div className="bg-[#00D4AA] text-[#1e3a5f] w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-4">3</div>
                            <h4 className="text-[#00D4AA] font-bold mb-3">Nurture</h4>
                            <p className="text-[#E6F3FF] text-sm">Targeted content based on behavior and expressed interests</p>
                        </div>

                        <div className="bg-[#00D4AA]/15 p-6 rounded-2xl text-center border-2 border-[#00D4AA]/30 relative">
                            <div className="bg-[#00D4AA] text-[#1e3a5f] w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-4">4</div>
                            <h4 className="text-[#00D4AA] font-bold mb-3">Convert</h4>
                            <p className="text-[#E6F3FF] text-sm">Strategic calls-to-action when engagement signals readiness</p>
                        </div>
                    </div>
                </div>

                {/* Universal Welcome Sequence */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <h2 className="text-4xl mb-8 text-[#00D4AA]">The Universal Welcome Sequence</h2>
                    <p className="text-[#E6F3FF] text-lg mb-10">
                        Every lead gets this 7-day foundation sequence, regardless of source. It builds trust, establishes expertise, and segments leads for specialized follow-up.
                    </p>

                    <div className="space-y-8">
                        <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-2xl p-8">
                            <div className="text-[#00D4AA] font-bold text-xl mb-4">📧 Email 1: Immediate Welcome (Send immediately)</div>
                            <div className="bg-white/5 p-5 rounded-xl italic text-[#E6F3FF]">
                                Subject: Your [Property Address] information is ready<br /><br />
                                Hi [First Name],<br /><br />
                                Thanks for your interest in [specific property/service]. I've attached the details you requested, plus a few additional properties that match your criteria.<br /><br />
                                I'm [Your Name], and I've been helping families find the perfect home in [Area] for [X] years. I know how overwhelming the process can feel, so I'm here to make it as smooth as possible.<br /><br />
                                Quick question: Are you looking to move within the next 6 months, or just getting started with your research?<br /><br />
                                Best,<br />
                                [Your Name]<br />
                                [Direct phone number]<br /><br />
                                P.S. I'll send you some helpful resources over the next few days to guide you through the process.
                            </div>
                        </div>

                        <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-2xl p-8">
                            <div className="text-[#00D4AA] font-bold text-xl mb-4">📧 Email 2: Market Insights (Day 2)</div>
                            <div className="bg-white/5 p-5 rounded-xl italic text-[#E6F3FF]">
                                Subject: What's really happening in [Area] (3-minute read)<br /><br />
                                Hi [First Name],<br /><br />
                                You're probably seeing conflicting news about the real estate market. "Prices are crashing!" vs "It's still a seller's market!"<br /><br />
                                Here's what's actually happening in [Your Area] right now:<br />
                                • Average days on market: [X] days<br />
                                • Homes selling above asking: [X]%<br />
                                • Interest rate impact: [Local insight]<br /><br />
                                [Include 1-2 specific local examples]<br /><br />
                                The bottom line: [Your market summary in 2 sentences]<br /><br />
                                I'll share more insights throughout the week. Reply and let me know what questions you have about the current market.<br /><br />
                                Talk soon,<br />
                                [Your Name]
                            </div>
                        </div>

                        <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-2xl p-8">
                            <div className="text-[#00D4AA] font-bold text-xl mb-4">📧 Email 3: Social Proof (Day 4)</div>
                            <div className="bg-white/5 p-5 rounded-xl italic text-[#E6F3FF]">
                                Subject: How the Johnsons saved $15,000 (true story)<br /><br />
                                Hi [First Name],<br /><br />
                                Last month, I helped the Johnson family find their dream home in [Neighborhood]. But here's the interesting part—they almost walked away from it.<br /><br />
                                The house was listed at $425,000, which felt like a stretch for their budget. But after running the numbers and negotiating some strategic repairs, they got it for $410,000.<br /><br />
                                The key was timing and knowing exactly what to ask for. That $15,000 difference meant they could afford the mortgage comfortably instead of being house-poor.<br /><br />
                                Every situation is different, but there's almost always more room to negotiate than buyers realize. Especially when you know what levers to pull.<br /><br />
                                If you'd like to chat about your specific situation, I'm happy to share what strategies might work for your timeline and budget.<br /><br />
                                Best,<br />
                                [Your Name]
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#FF6B35]/20 border-2 border-[#FF6B35] rounded-2xl p-6 mt-8">
                        <div className="text-[#FF6B35] font-bold mb-4">🎯 Behavioral Triggers After Email 3:</div>
                        <p className="text-[#E6F3FF] mb-2"><strong>High engagement</strong> (opens all emails, clicks links): Move to "Hot Lead" sequence</p>
                        <p className="text-[#E6F3FF] mb-2"><strong>Medium engagement</strong> (opens some emails): Continue standard nurture</p>
                        <p className="text-[#E6F3FF]"><strong>Low engagement</strong> (minimal opens): Move to "Re-engagement" sequence</p>
                    </div>
                </div>

                {/* Specialized Nurture Sequences */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <h2 className="text-4xl mb-8 text-[#00D4AA]">Specialized Nurture Sequences</h2>
                    <p className="text-[#E6F3FF] text-lg mb-10">
                        After the welcome sequence, leads flow into targeted tracks based on their behavior and declared interests:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/10 border-2 border-[#FFD700] rounded-2xl p-8">
                            <h3 className="text-[#FFD700] text-2xl mb-4">🔥 Hot Lead Sequence</h3>
                            <p className="mb-4"><strong>Trigger:</strong> High engagement with welcome sequence</p>
                            <p className="mb-4"><strong>Goal:</strong> Schedule consultation within 7 days</p>
                            <ul className="text-[#E6F3FF] ml-5 space-y-2">
                                <li>• Day 1: Personal video message</li>
                                <li>• Day 2: Calendar booking link with urgency</li>
                                <li>• Day 4: Phone call + follow-up email</li>
                                <li>• Day 6: Final consultation offer</li>
                                <li>• Day 8: Move to standard nurture</li>
                            </ul>
                        </div>

                        <div className="bg-white/10 border-2 border-[#FFD700] rounded-2xl p-8">
                            <h3 className="text-[#FFD700] text-2xl mb-4">🏡 First-Time Buyer Education</h3>
                            <p className="mb-4"><strong>Trigger:</strong> Self-identified first-time buyer</p>
                            <p className="mb-4"><strong>Goal:</strong> Build confidence and expertise trust</p>
                            <ul className="text-[#E6F3FF] ml-5 space-y-2">
                                <li>• Week 1: Pre-approval process guide</li>
                                <li>• Week 2: What to expect during showings</li>
                                <li>• Week 3: Making competitive offers</li>
                                <li>• Week 4: Inspection and closing process</li>
                                <li>• Monthly: Market updates and new listings</li>
                            </ul>
                        </div>

                        <div className="bg-white/10 border-2 border-[#FFD700] rounded-2xl p-8">
                            <h3 className="text-[#FFD700] text-2xl mb-4">💰 Luxury Buyer Nurture</h3>
                            <p className="mb-4"><strong>Trigger:</strong> Interest in homes $500K+</p>
                            <p className="mb-4"><strong>Goal:</strong> Position as luxury market expert</p>
                            <ul className="text-[#E6F3FF] ml-5 space-y-2">
                                <li>• Week 1: Exclusive market report</li>
                                <li>• Week 2: Private showing opportunities</li>
                                <li>• Week 3: Investment potential analysis</li>
                                <li>• Week 4: Luxury amenities guide</li>
                                <li>• Bi-weekly: Off-market opportunities</li>
                            </ul>
                        </div>

                        <div className="bg-white/10 border-2 border-[#FFD700] rounded-2xl p-8">
                            <h3 className="text-[#FFD700] text-2xl mb-4">📅 Long-Term Prospect</h3>
                            <p className="mb-4"><strong>Trigger:</strong> Not moving for 6+ months</p>
                            <p className="mb-4"><strong>Goal:</strong> Stay top-of-mind until ready</p>
                            <ul className="text-[#E6F3FF] ml-5 space-y-2">
                                <li>• Monthly: Neighborhood highlights</li>
                                <li>• Quarterly: Market condition updates</li>
                                <li>• Semi-annually: Rate and affordability changes</li>
                                <li>• Special events: Open houses and community events</li>
                                <li>• Annually: Personal check-in call</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* The Re-Engagement Rescue Sequence */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <h2 className="text-4xl mb-8 text-[#00D4AA]">The Re-Engagement Rescue Sequence</h2>
                    <p className="text-[#E6F3FF] text-lg mb-10">
                        When leads go cold, most agents give up. Smart agents deploy strategic re-engagement campaigns that often resurrect dead leads:
                    </p>

                    <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-2xl p-8">
                        <div className="text-[#00D4AA] font-bold text-xl mb-4">📧 The Break-Up Email (Most effective re-engagement tool)</div>
                        <div className="bg-white/5 p-5 rounded-xl italic text-[#E6F3FF]">
                            Subject: Should I remove you from my list?<br /><br />
                            Hi [First Name],<br /><br />
                            I haven't heard from you in a while, and I don't want to keep bothering you with emails if you're no longer interested in [Area] real estate.<br /><br />
                            Should I remove you from my list?<br /><br />
                            If you're still interested but your timeline changed, just hit reply and let me know. I'm happy to adjust how often I reach out.<br /><br />
                            If I don't hear back, I'll assume you'd prefer not to receive these emails and I'll remove you after [X] days.<br /><br />
                            Either way, no hard feelings!<br /><br />
                            Best,<br />
                            [Your Name]<br /><br />
                            P.S. If you know someone else looking in the area, I'd appreciate the referral.
                        </div>
                    </div>

                    <div className="bg-[#FF6B35]/20 border-2 border-[#FF6B35] rounded-2xl p-6 mt-8">
                        <div className="text-[#FF6B35] font-bold mb-4">📊 Break-Up Email Results (Industry Average):</div>
                        <p className="text-[#E6F3FF] mb-2"><strong>25-30%</strong> reply to stay on list</p>
                        <p className="text-[#E6F3FF] mb-2"><strong>15-20%</strong> provide updated timeline</p>
                        <p className="text-[#E6F3FF] mb-2"><strong>5-10%</strong> generate referrals</p>
                        <p className="text-[#E6F3FF]"><strong>40-50%</strong> unsubscribe (cleaning your list)</p>
                    </div>
                </div>

                {/* Implementation Roadmap */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <h2 className="text-4xl mb-8 text-[#00D4AA]">Implementation Roadmap</h2>
                    <p className="text-[#E6F3FF] text-lg mb-10">Build your nurturing system step by step:</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#00D4AA]/15 p-8 rounded-2xl text-center">
                            <h4 className="text-[#00D4AA] text-xl mb-4">Week 1-2: Foundation</h4>
                            <ul className="text-left text-[#E6F3FF] ml-5 space-y-2">
                                <li>• Set up welcome sequence</li>
                                <li>• Create lead source tracking</li>
                                <li>• Write 5 core email templates</li>
                                <li>• Test basic automation triggers</li>
                            </ul>
                        </div>
                        <div className="bg-[#FFD700]/15 p-8 rounded-2xl text-center">
                            <h4 className="text-[#FFD700] text-xl mb-4">Week 3-4: Specialization</h4>
                            <ul className="text-left text-[#E6F3FF] ml-5 space-y-2">
                                <li>• Build buyer/seller specific tracks</li>
                                <li>• Add behavioral triggers</li>
                                <li>• Create re-engagement sequence</li>
                                <li>• Set up performance tracking</li>
                            </ul>
                        </div>
                        <div className="bg-[#FF6B35]/15 p-8 rounded-2xl text-center">
                            <h4 className="text-[#FF6B35] text-xl mb-4">Month 2+: Optimization</h4>
                            <ul className="text-left text-[#E6F3FF] ml-5 space-y-2">
                                <li>• A/B test subject lines</li>
                                <li>• Refine trigger conditions</li>
                                <li>• Add advanced segmentation</li>
                                <li>• Scale successful sequences</li>
                            </ul>
                        </div>
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
