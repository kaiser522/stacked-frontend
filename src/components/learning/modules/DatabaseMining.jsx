import React, { useState } from 'react';

const DatabaseMining = () => {
    const [leadData, setLeadData] = useState({
        engagementLevel: '',
        monthsSince: '',
        sourceQuality: '',
        budgetRange: '',
        geographicPref: '',
        contactQuality: ''
    });
    const [scoreResult, setScoreResult] = useState(null);

    const calculateLeadScore = () => {
        const engagement = parseFloat(leadData.engagementLevel) || 5;
        const monthsSince = parseFloat(leadData.monthsSince) || 12;
        const sourceQuality = parseFloat(leadData.sourceQuality) || 5;
        const budgetRange = parseFloat(leadData.budgetRange) || 5;
        const geographicPref = parseFloat(leadData.geographicPref) || 5;
        const contactQuality = parseFloat(leadData.contactQuality) || 6;

        // Calculate time decay factor (optimal at 6-18 months)
        let timeFactor;
        if (monthsSince < 3) {
            timeFactor = 2; // Too soon
        } else if (monthsSince >= 3 && monthsSince <= 18) {
            timeFactor = 8; // Optimal range
        } else if (monthsSince > 18 && monthsSince <= 36) {
            timeFactor = 5; // Still good
        } else {
            timeFactor = 2; // Too old
        }

        // Calculate weighted score (out of 100)
        const score = Math.round(
            (engagement * 0.25) +
            (timeFactor * 0.20) +
            (sourceQuality * 0.15) +
            (budgetRange * 0.15) +
            (geographicPref * 0.15) +
            (contactQuality * 0.10)
        ) * 10;

        let priority, strategy, timeline;

        if (score >= 70) {
            priority = 'HIGH PRIORITY';
            strategy = 'Personal phone call + email sequence';
            timeline = 'Contact within 24 hours';
        } else if (score >= 50) {
            priority = 'MEDIUM PRIORITY';
            strategy = 'Multi-channel reactivation campaign';
            timeline = 'Contact within 1 week';
        } else {
            priority = 'LOW PRIORITY';
            strategy = 'Email-only campaign or referral pivot';
            timeline = 'Include in next quarterly campaign';
        }

        setScoreResult({
            score,
            priority,
            strategy,
            timeline,
            expectedResponse: score >= 70 ? '35-50%' : score >= 50 ? '20-35%' : '10-20%'
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">🔍 Database Mining and Conversion Mastery</h1>
                <p className="text-xl text-purple-100">
                    Systematic approaches to reactivating cold leads, analyzing conversion patterns, and turning dormant contacts into active clients.
                </p>
                <div className="mt-4 bg-purple-500/30 px-4 py-2 rounded-full inline-block">
                    <span className="text-white font-semibold">18 min read • Pro Plan</span>
                </div>
            </div> */}

            <div className="space-y-8">
                <div className="bg-white/10 rounded-xl p-6">
                    <div className="bg-gradient-to-r from-[#00D4AA] to-[#00B894] rounded-2xl p-6 mb-6 text-center">
                        <p className="text-white text-xl font-bold">Top agents generate 34% of their business from reactivated database contacts</p>
                    </div>

                    <p className="text-white/90 mb-6">
                        Your CRM database is a goldmine hiding in plain sight. While most agents chase new leads, the smart money focuses on converting the hundreds or thousands of contacts already in their system.
                    </p>

                    <p className="text-white/90 mb-6">
                        The contacts who inquired last year but never bought, past clients who might be ready to move again, and referrals that went cold—these aren't dead leads. They're sleeping assets waiting for the right reactivation strategy.
                    </p>

                    <div className="grid md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 text-center">
                            <div className="bg-[#00D4AA] text-[#1e3a5f] w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">1</div>
                            <h4 className="font-bold text-[#00D4AA] mb-2">Analyze</h4>
                            <p className="text-sm text-white/80">Segment your database by behavior patterns and engagement history</p>
                        </div>
                        <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 text-center">
                            <div className="bg-[#00D4AA] text-[#1e3a5f] w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">2</div>
                            <h4 className="font-bold text-[#00D4AA] mb-2">Prioritize</h4>
                            <p className="text-sm text-white/80">Identify highest-value prospects using predictive scoring</p>
                        </div>
                        <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 text-center">
                            <div className="bg-[#00D4AA] text-[#1e3a5f] w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">3</div>
                            <h4 className="font-bold text-[#00D4AA] mb-2">Reactivate</h4>
                            <p className="text-sm text-white/80">Deploy targeted campaigns based on original lead source and behavior</p>
                        </div>
                        <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 text-center">
                            <div className="bg-[#00D4AA] text-[#1e3a5f] w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">4</div>
                            <h4 className="font-bold text-[#00D4AA] mb-2">Convert</h4>
                            <p className="text-sm text-white/80">Move reactivated leads through systematic nurture to appointment</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Database Segmentation Strategy</h2>
                    <p className="text-white/90 mb-6">Not all cold leads are created equal. Smart segmentation lets you deploy the right message to the right prospects:</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/10 border-3 border-[#00D4AA] rounded-lg p-6">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-2">🔥 Hot Sleepers</h3>
                            <p className="text-white/80 mb-2"><strong>Profile:</strong> High initial engagement, went cold suddenly</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li>• Viewed 10+ properties initially</li>
                                <li>• Responded to multiple emails</li>
                                <li>• Stopped engaging 3-18 months ago</li>
                                <li>• Life change likely interrupted process</li>
                            </ul>
                            <p className="text-white/80"><strong>Reactivation:</strong> Direct, personal approach acknowledging the gap</p>
                        </div>

                        <div className="bg-white/10 border-3 border-[#00D4AA] rounded-lg p-6">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-2">⏰ Timing Mismatch</h3>
                            <p className="text-white/80 mb-2"><strong>Profile:</strong> Engaged but wrong timeline</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li>• Stated 12+ month timeline initially</li>
                                <li>• Maintained some engagement</li>
                                <li>• Opened recent emails sporadically</li>
                                <li>• Timeline may have accelerated</li>
                            </ul>
                            <p className="text-white/80"><strong>Reactivation:</strong> Timeline check-in with market updates</p>
                        </div>

                        <div className="bg-white/10 border-3 border-[#00D4AA] rounded-lg p-6">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-2">🎯 Qualification Failures</h3>
                            <p className="text-white/80 mb-2"><strong>Profile:</strong> Interest but unclear qualification</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li>• Browsed properties but avoided calls</li>
                                <li>• Never provided complete contact info</li>
                                <li>• Showed interest in multiple price ranges</li>
                                <li>• Financing situation unclear</li>
                            </ul>
                            <p className="text-white/80"><strong>Reactivation:</strong> Low-pressure value offering</p>
                        </div>

                        <div className="bg-white/10 border-3 border-[#00D4AA] rounded-lg p-6">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-2">📍 Geographic Shifters</h3>
                            <p className="text-white/80 mb-2"><strong>Profile:</strong> Changed location preferences</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li>• Initially searched specific area</li>
                                <li>• May have expanded or shifted focus</li>
                                <li>• Life circumstances changed</li>
                                <li>• Work or family situation evolved</li>
                            </ul>
                            <p className="text-white/80"><strong>Reactivation:</strong> Area comparison and market updates</p>
                        </div>

                        <div className="bg-white/10 border-3 border-[#00D4AA] rounded-lg p-6">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-2">💰 Price Point Evolvers</h3>
                            <p className="text-white/80 mb-2"><strong>Profile:</strong> Financial situation may have improved</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li>• Searched below current market rates</li>
                                <li>• 6+ months since last engagement</li>
                                <li>• Income growth likely</li>
                                <li>• Rate changes affect affordability</li>
                            </ul>
                            <p className="text-white/80"><strong>Reactivation:</strong> Affordability improvement message</p>
                        </div>

                        <div className="bg-white/10 border-3 border-[#00D4AA] rounded-lg p-6">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-2">🔄 Seasonal Patterns</h3>
                            <p className="text-white/80 mb-2"><strong>Profile:</strong> Timing-sensitive preferences</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li>• Engaged during specific seasons</li>
                                <li>• School-year considerations</li>
                                <li>• Work schedule constraints</li>
                                <li>• Holiday timing preferences</li>
                            </ul>
                            <p className="text-white/80"><strong>Reactivation:</strong> Seasonal timing reminders</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Lead Scoring and Prioritization</h2>
                    <p className="text-white/90 mb-4">Focus your reactivation efforts on contacts most likely to convert with this scoring system:</p>

                    <div className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-orange-400 mb-4">💡 Database Lead Scoring Calculator</h3>
                        <p className="text-white/90 mb-4">Enter contact details to calculate reactivation priority score:</p>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block mb-2 font-bold text-white">Initial Engagement Level (1-10):</label>
                                <input
                                    type="number"
                                    placeholder="7"
                                    max="10"
                                    min="1"
                                    value={leadData.engagementLevel}
                                    onChange={(e) => setLeadData({ ...leadData, engagementLevel: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />

                                <label className="block mb-2 font-bold text-white mt-4">Months Since Last Contact:</label>
                                <input
                                    type="number"
                                    placeholder="8"
                                    value={leadData.monthsSince}
                                    onChange={(e) => setLeadData({ ...leadData, monthsSince: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />

                                <label className="block mb-2 font-bold text-white mt-4">Original Lead Source Quality (1-10):</label>
                                <input
                                    type="number"
                                    placeholder="6"
                                    max="10"
                                    min="1"
                                    value={leadData.sourceQuality}
                                    onChange={(e) => setLeadData({ ...leadData, sourceQuality: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-bold text-white">Budget Range at Inquiry:</label>
                                <select
                                    value={leadData.budgetRange}
                                    onChange={(e) => setLeadData({ ...leadData, budgetRange: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white h-12"
                                >
                                    <option value="3">Under $200K</option>
                                    <option value="5">$200K-400K</option>
                                    <option value="7">$400K-600K</option>
                                    <option value="9">$600K+</option>
                                </select>

                                <label className="block mb-2 font-bold text-white mt-4">Geographic Preference:</label>
                                <select
                                    value={leadData.geographicPref}
                                    onChange={(e) => setLeadData({ ...leadData, geographicPref: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white h-12"
                                >
                                    <option value="5">Your primary market</option>
                                    <option value="3">Adjacent markets</option>
                                    <option value="2">Outside your area</option>
                                </select>

                                <label className="block mb-2 font-bold text-white mt-4">Contact Information Quality:</label>
                                <select
                                    value={leadData.contactQuality}
                                    onChange={(e) => setLeadData({ ...leadData, contactQuality: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white h-12"
                                >
                                    <option value="3">Email only</option>
                                    <option value="6">Email + Phone</option>
                                    <option value="8">Complete contact info</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={calculateLeadScore}
                            className="w-full bg-[#00D4AA] text-[#1e3a5f] py-3 px-6 rounded-lg font-bold hover:bg-[#00B894] transition-colors"
                        >
                            Calculate Reactivation Priority Score
                        </button>

                        {scoreResult && (
                            <div className="mt-6 space-y-4">
                                <div className="bg-[#00D4AA]/20 p-5 rounded-lg">
                                    <div className="text-white">
                                        <strong>🎯 Reactivation Score: {scoreResult.score}/100</strong><br />
                                        <span className="text-xl font-bold" style={{ color: scoreResult.score >= 70 ? '#FF6B35' : scoreResult.score >= 50 ? '#FFD700' : '#00D4AA' }}>{scoreResult.priority}</span>
                                    </div>
                                </div>
                                <div className="bg-yellow-500/20 p-5 rounded-lg">
                                    <div className="text-white">
                                        <strong>📋 Recommended Strategy:</strong><br />
                                        <strong>Approach:</strong> {scoreResult.strategy}<br />
                                        <strong>Timeline:</strong> {scoreResult.timeline}<br />
                                        <strong>Expected Response Rate:</strong> {scoreResult.expectedResponse}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">🎯 Key Takeaway</h2>
                    <p className="text-green-100 text-lg">
                        Agents who systematically mine their database generate 3-5x more repeat business and referrals. The key is consistent, value-driven communication that keeps you top-of-mind.
                    </p>
                </div>

                {/* Reactivation Campaign Templates */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Reactivation Campaign Templates</h2>
                    <p className="text-white/90 mb-6">Proven message frameworks that restart conversations without seeming desperate:</p>

                    <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-xl p-5 mb-5">
                        <div className="text-[#00D4AA] font-bold mb-3">📧 The "Market Update" Reactivation</div>
                        <div className="bg-white/5 p-4 rounded text-white/90 font-serif italic">
                            Subject: Big changes in [Area] since we last spoke<br /><br />
                            Hi [First Name],<br /><br />
                            It's been a while since we connected about your home search in [Area]. I was putting together my quarterly market report and thought you'd find this interesting.<br /><br />
                            Since [timeframe of last contact], we've seen:<br />
                            • [Specific market change #1]<br />
                            • [Specific market change #2]<br />
                            • [Impact on affordability/opportunity]<br /><br />
                            I remember you were interested in [specific detail from their original inquiry]. The good news is [relevant market insight].<br /><br />
                            Has your timeline or situation changed at all? I'd love to catch up and see if there are new opportunities that might interest you.<br /><br />
                            Best,<br />
                            [Your Name]<br /><br />
                            P.S. I've attached the full market report if you want to see the complete picture.
                        </div>
                    </div>

                    <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-xl p-5 mb-5">
                        <div className="text-[#00D4AA] font-bold mb-3">📧 The "Honest Check-In" Approach</div>
                        <div className="bg-white/5 p-4 rounded text-white/90 font-serif italic">
                            Subject: Following up on your [original search area] search<br /><br />
                            Hi [First Name],<br /><br />
                            I was going through my client list and realized it's been [timeframe] since we last spoke about your home search. I wanted to reach out because I know how life can change plans.<br /><br />
                            When we first connected, you were looking for [original criteria]. I'm curious—is that still on your radar, or have things shifted?<br /><br />
                            No pressure either way. If your timeline changed or you decided not to move, I totally understand. But if you're still interested, I'd love to update you on what's available now versus [original timeframe].<br /><br />
                            A quick call or email reply would help me know whether to keep you on my active buyer list or give you a break from the market updates.<br /><br />
                            Hope you're doing well!<br /><br />
                            [Your Name]
                        </div>
                    </div>

                    <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-xl p-5">
                        <div className="text-[#00D4AA] font-bold mb-3">📧 The "New Opportunity" Reactivation</div>
                        <div className="bg-white/5 p-4 rounded text-white/90 font-serif italic">
                            Subject: This reminded me of your search criteria<br /><br />
                            Hi [First Name],<br /><br />
                            I came across something today that reminded me of our conversation about [specific detail from original inquiry].<br /><br />
                            [Specific new opportunity—could be a property, market change, financing option, etc.]<br /><br />
                            I wasn't sure if you were still actively looking, but this seemed like exactly what you described when we first spoke.<br /><br />
                            Want me to send you the details, or has your situation changed since then?<br /><br />
                            Just reply with "yes" or "no longer looking" and I'll know how to help.<br /><br />
                            Best,<br />
                            [Your Name]
                        </div>
                    </div>
                </div>

                {/* Data Analysis for Pattern Recognition */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Data Analysis for Pattern Recognition</h2>
                    <p className="text-white/90">Track these metrics to identify what reactivation strategies work best:</p>

                    <div className="bg-white text-[#1e3a5f] rounded-xl p-6 mt-6">
                        <h3 className="text-2xl font-bold mb-4">📊 Database Mining Performance Dashboard</h3>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-[#00D4AA]/10 rounded">
                                <div className="text-3xl font-bold text-[#00D4AA]">847</div>
                                <div className="text-sm text-[#333]">Total Database Contacts</div>
                            </div>
                            <div className="text-center p-4 bg-[#00D4AA]/10 rounded">
                                <div className="text-3xl font-bold text-[#00D4AA]">23%</div>
                                <div className="text-sm text-[#333]">Reactivation Response Rate</div>
                            </div>
                            <div className="text-center p-4 bg-[#00D4AA]/10 rounded">
                                <div className="text-3xl font-bold text-[#00D4AA]">12%</div>
                                <div className="text-sm text-[#333]">Reactivation to Appointment</div>
                            </div>
                            <div className="text-center p-4 bg-[#00D4AA]/10 rounded">
                                <div className="text-3xl font-bold text-[#00D4AA]">8%</div>
                                <div className="text-sm text-[#333]">Ultimate Conversion Rate</div>
                            </div>
                        </div>

                        <div className="mt-5 bg-[#00D4AA]/10 p-4 rounded text-[#333]">
                            <h4 className="text-[#00D4AA] font-bold mb-3">Key Success Patterns:</h4>
                            <ul className="list-disc ml-6">
                                <li><strong>Optimal reactivation timing:</strong> 6-18 months after last contact</li>
                                <li><strong>Best performing segments:</strong> Hot Sleepers and Timing Mismatches</li>
                                <li><strong>Most effective approach:</strong> Market update with personal touch</li>
                                <li><strong>Response rate by source:</strong> Website leads 31%, social media 18%, referrals 45%</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Advanced Reactivation Strategies */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-6">Advanced Reactivation Strategies</h2>

                    <h3 className="text-xl font-bold text-[#00D4AA]">Multi-Channel Approach</h3>
                    <p className="text-white/90">Don't rely on email alone. Layer your reactivation across multiple touchpoints:</p>

                    <div className="grid md:grid-cols-2 gap-6 my-6">
                        <div className="bg-[#00D4AA]/10 p-6 rounded-xl">
                            <h4 className="text-[#00D4AA] font-bold mb-2">Week 1: Email Foundation</h4>
                            <ul className="text-white/80 list-disc ml-6">
                                <li>Market update with personal reference</li>
                                <li>Track opens and clicks</li>
                                <li>Identify engaged responders</li>
                            </ul>
                        </div>
                        <div className="bg-yellow-500/10 p-6 rounded-xl">
                            <h4 className="text-[#FFD700] font-bold mb-2">Week 2: Social Media Layer</h4>
                            <ul className="text-white/80 list-disc ml-6">
                                <li>LinkedIn connection requests</li>
                                <li>Facebook message for local contacts</li>
                                <li>Instagram story views if connected</li>
                            </ul>
                        </div>
                        <div className="bg-[#FF6B35]/10 p-6 rounded-xl">
                            <h4 className="text-[#FF6B35] font-bold mb-2">Week 3: Direct Outreach</h4>
                            <ul className="text-white/80 list-disc ml-6">
                                <li>Phone calls to high-priority contacts</li>
                                <li>Text messages for mobile-responsive leads</li>
                                <li>Handwritten notes for premium prospects</li>
                            </ul>
                        </div>
                        <div className="bg-[#00D4AA]/10 p-6 rounded-xl">
                            <h4 className="text-[#00D4AA] font-bold mb-2">Week 4: Value Addition</h4>
                            <ul className="text-white/80 list-disc ml-6">
                                <li>Exclusive market reports</li>
                                <li>Home valuation offers</li>
                                <li>Investment opportunity alerts</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-xl p-5">
                        <div className="text-[#00D4AA] font-bold mb-3">📧 The Referral Pivot Message</div>
                        <div className="bg-white/5 p-4 rounded text-white/90 font-serif italic">
                            Subject: Quick favor to ask<br /><br />
                            Hi [First Name],<br /><br />
                            I know your home search timeline shifted, and that's totally fine—life happens!<br /><br />
                            I wanted to ask a quick favor. I imagine you know other people who might be thinking about buying or selling. Since you experienced my level of service firsthand, would you be comfortable referring them to me?<br /><br />
                            I promise to take just as good care of them as I would have taken of you.<br /><br />
                            Even if they're just starting to think about it, I'd appreciate the introduction.<br /><br />
                            Thanks for considering it!<br /><br />
                            [Your Name]
                        </div>
                    </div>
                </div>

                {/* Implementation Action Plan */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Implementation Action Plan</h2>
                    <p className="text-white/90">Your 30-day database mining launch checklist:</p>

                    {[
                        { title: 'Week 1: Database Audit', color: 'yellow' },
                        { title: 'Week 2: Campaign Setup', color: 'yellow' },
                        { title: 'Week 3: Execution', color: 'yellow' },
                        { title: 'Week 4: Optimization', color: 'yellow' }
                    ].map((week, idx) => (
                        <div key={idx} className="bg-yellow-500/10 border-2 border-yellow-400 rounded-xl p-6 mt-6">
                            <h3 className="text-[#FFD700] font-bold text-xl mb-4">{week.title}</h3>
                            <div className="space-y-3">
                                <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                    <input type="checkbox" className="mt-1 scale-125" />
                                    <div className="flex-1 text-white/90">
                                        <strong>Export complete database:</strong> Pull all contacts from your CRM with activity history
                                    </div>
                                </label>
                                <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                    <input type="checkbox" className="mt-1 scale-125" />
                                    <div className="flex-1 text-white/90">
                                        <strong>Segment by engagement level:</strong> Categorize contacts into Hot Sleepers, Timing Mismatch, etc.
                                    </div>
                                </label>
                                <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                    <input type="checkbox" className="mt-1 scale-125" />
                                    <div className="flex-1 text-white/90">
                                        <strong>Score all contacts:</strong> Use the calculator above to prioritize reactivation efforts
                                    </div>
                                </label>
                                <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                    <input type="checkbox" className="mt-1 scale-125" />
                                    <div className="flex-1 text-white/90">
                                        <strong>Clean data quality:</strong> Update incomplete records, remove invalid contacts
                                    </div>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Common Reactivation Mistakes to Avoid */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Common Reactivation Mistakes to Avoid</h2>
                    <div className="space-y-4">
                        <div className="bg-[#FF6B35]/20 border-2 border-[#FF6B35] rounded-xl p-5">
                            <div className="text-[#FF6B35] font-bold mb-2">⚠️ The "Blast Email" Mistake</div>
                            <p className="text-white/90">Sending the same generic message to all cold leads. Different segments need different approaches based on their original behavior and dropout reasons.</p>
                        </div>
                        <div className="bg-[#FF6B35]/20 border-2 border-[#FF6B35] rounded-xl p-5">
                            <div className="text-[#FF6B35] font-bold mb-2">⚠️ The "Too Soon" Mistake</div>
                            <p className="text-white/90">Reactivating leads immediately after they go cold. Wait 3-6 months minimum to avoid seeming pushy or desperate.</p>
                        </div>
                        <div className="bg-[#FF6B35]/20 border-2 border-[#FF6B35] rounded-xl p-5">
                            <div className="text-[#FF6B35] font-bold mb-2">⚠️ The "No Follow-Up" Mistake</div>
                            <p className="text-white/90">Sending one reactivation message and giving up. Most reactivations require 3-7 touchpoints across different channels.</p>
                        </div>
                        <div className="bg-[#FF6B35]/20 border-2 border-[#FF6B35] rounded-xl p-5">
                            <div className="text-[#FF6B35] font-bold mb-2">⚠️ The "All Business" Mistake</div>
                            <p className="text-white/90">Making reactivation purely transactional. Include personal touches that reference their original inquiry or circumstances.</p>
                        </div>
                    </div>
                </div>

                {/* Measuring Success and ROI */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Measuring Success and ROI</h2>
                    <p className="text-white/90">Track these metrics to quantify the value of your database mining efforts:</p>

                    <div className="grid md:grid-cols-2 gap-6 my-6">
                        <div className="bg-white/15 p-6 rounded-xl border-2 border-[#00D4AA]">
                            <h4 className="text-[#00D4AA] font-bold mb-2">Primary Metrics</h4>
                            <ul className="text-white/90 list-disc ml-6">
                                <li><strong>Reactivation response rate:</strong> Target 15-25%</li>
                                <li><strong>Appointment conversion:</strong> Target 8-15%</li>
                                <li><strong>Ultimate close rate:</strong> Target 5-12%</li>
                                <li><strong>Average time to close:</strong> Track for planning</li>
                            </ul>
                        </div>
                        <div className="bg-white/15 p-6 rounded-xl border-2 border-yellow-400">
                            <h4 className="text-[#FFD700] font-bold mb-2">ROI Calculations</h4>
                            <ul className="text-white/90 list-disc ml-6">
                                <li><strong>Campaign cost:</strong> Time + tools + content</li>
                                <li><strong>Revenue per conversion:</strong> Average commission</li>
                                <li><strong>Cost per conversion:</strong> Total cost ÷ closes</li>
                                <li><strong>ROI ratio:</strong> Revenue ÷ investment</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white text-[#1e3a5f] p-6 rounded-xl">
                        <h4 className="text-[#1e3a5f] font-bold mb-2">Sample ROI Analysis:</h4>
                        <p className="text-[#1e3a5f]"><strong>Investment:</strong> 20 hours @ $50/hour = $1,000</p>
                        <p className="text-[#1e3a5f]"><strong>Results:</strong> 500 contacts → 75 responses → 12 appointments → 3 closings</p>
                        <p className="text-[#1e3a5f]"><strong>Revenue:</strong> 3 closings × $8,000 avg commission = $24,000</p>
                        <p className="text-[#1e3a5f]"><strong>ROI:</strong> 2,400% return on investment</p>
                        <p className="mt-3 text-[#1e3a5f] font-bold">Even with conservative conversion rates, database mining typically delivers 500-2,000% ROI.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatabaseMining;
