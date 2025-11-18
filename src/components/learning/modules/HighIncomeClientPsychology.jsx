import React, { useState } from 'react';

const HighIncomeClientPsychology = () => {
    const [assessmentResult, setAssessmentResult] = useState(null);

    const calculateProfile = () => {
        const q1Answers = document.querySelectorAll('input[name="q1"]:checked');
        const q2Answers = document.querySelectorAll('input[name="q2"]:checked');
        const q3Answers = document.querySelectorAll('input[name="q3"]:checked');

        if (q1Answers.length === 0 || q2Answers.length === 0 || q3Answers.length === 0) {
            alert('Please answer all three questions to get your client profile analysis.');
            return;
        }

        const answers = [
            q1Answers[0].value,
            q2Answers[0].value,
            q3Answers[0].value
        ];

        // Count occurrences of each profile type
        const counts = {
            'wealth-builder': 0,
            'lifestyle-seeker': 0,
            'status-conscious': 0
        };

        answers.forEach(answer => {
            counts[answer]++;
        });

        // Determine dominant profile
        let dominantProfile = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

        let profileName, description, approach, keyTactics;

        switch (dominantProfile) {
            case 'wealth-builder':
                profileName = 'The Wealth Builder';
                description = 'This client makes data-driven decisions and focuses on ROI and investment potential.';
                approach = 'Lead with market analysis, investment projections, and strategic value propositions.';
                keyTactics = 'Provide detailed market data, ROI calculations, and investment analysis. Emphasize your track record and results.';
                break;
            case 'lifestyle-seeker':
                profileName = 'The Lifestyle Seeker';
                description = 'This client prioritizes comfort, emotional satisfaction, and quality of life enhancement.';
                approach = 'Focus on how properties enhance their lifestyle and provide emotional satisfaction.';
                keyTactics = 'Use experiential language, emphasize service quality, and create emotional connections to properties.';
                break;
            case 'status-conscious':
                profileName = 'The Status Conscious';
                description = 'This client values prestige, exclusivity, and what their choices say about their social position.';
                approach = 'Emphasize exclusivity, prestige, and social positioning of properties and your services.';
                keyTactics = 'Highlight unique features, prestigious locations, and your connections to exclusive opportunities.';
                break;
        }

        setAssessmentResult({
            profileName,
            description,
            approach,
            keyTactics
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">💎 High-Income Client Psychology Mastery</h1>
                <p className="text-xl text-purple-100">
                    Understanding motivations of affluent buyers and sellers, communication that resonates, and building relationships before they need to move.
                </p>
                <div className="mt-4 bg-purple-500/30 px-4 py-2 rounded-full inline-block">
                    <span className="text-white font-semibold">24 min read • Pro Plan</span>
                </div>
            </div> */}

            <div className="space-y-8">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 mb-8">
                    <p className="text-2xl font-bold text-center text-gray-800">
                        Agents serving high-income clients earn 340% more per transaction on average
                    </p>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <p className="text-white/90 mb-4">
                        Working with high-income clients isn't just about bigger commission checks—it's about understanding a completely different psychology. These clients don't make decisions the same way. They don't respond to the same motivations. And they certainly don't tolerate the same level of service.
                    </p>
                    <p className="text-white/90 mb-6">
                        The agents who successfully serve affluent clients understand that wealth creates different priorities, concerns, and expectations. Master these psychological drivers, and you'll not only earn more per transaction—you'll build a referral network that generates business for decades.
                    </p>

                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 text-center">
                            <div className="w-10 h-10 bg-yellow-500 text-gray-800 rounded-full flex items-center justify-center font-bold mx-auto mb-2">1</div>
                            <h4 className="font-bold text-yellow-400 mb-2">Identify</h4>
                            <p className="text-sm text-white/80">Recognize wealth indicators and psychological profiles of affluent prospects</p>
                        </div>
                        <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 text-center">
                            <div className="w-10 h-10 bg-yellow-500 text-gray-800 rounded-full flex items-center justify-center font-bold mx-auto mb-2">2</div>
                            <h4 className="font-bold text-yellow-400 mb-2">Understand</h4>
                            <p className="text-sm text-white/80">Learn what truly motivates high-income decision making</p>
                        </div>
                        <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 text-center">
                            <div className="w-10 h-10 bg-yellow-500 text-gray-800 rounded-full flex items-center justify-center font-bold mx-auto mb-2">3</div>
                            <h4 className="font-bold text-yellow-400 mb-2">Communicate</h4>
                            <p className="text-sm text-white/80">Adapt your style to match their expectations and preferences</p>
                        </div>
                        <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 text-center">
                            <div className="w-10 h-10 bg-yellow-500 text-gray-800 rounded-full flex items-center justify-center font-bold mx-auto mb-2">4</div>
                            <h4 className="font-bold text-yellow-400 mb-2">Deliver</h4>
                            <p className="text-sm text-white/80">Exceed service expectations to earn referrals and repeat business</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">The Three Wealth Psychology Profiles</h2>
                    <p className="text-white/90 mb-6">
                        High-income clients fall into distinct psychological categories that require different approaches:
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-orange-500/20 border-3 border-orange-500 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-orange-400 mb-2">The Wealth Builder</h3>
                            <p className="text-sm text-white/80 mb-2"><strong>Profile:</strong> Self-made success, business owners, executives</p>
                            <ul className="text-sm text-white/70 space-y-1 ml-5">
                                <li><strong>Motivation:</strong> ROI, investment potential, strategic value</li>
                                <li><strong>Decision style:</strong> Data-driven, thorough analysis</li>
                                <li><strong>Time frame:</strong> Patient but decisive when convinced</li>
                                <li><strong>Communication:</strong> Direct, results-focused</li>
                                <li><strong>Values:</strong> Efficiency, expertise, proven track records</li>
                            </ul>
                            <p className="text-sm text-orange-300 mt-3"><strong>Approach:</strong> Lead with market data and investment analysis</p>
                        </div>

                        <div className="bg-orange-500/20 border-3 border-orange-500 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-orange-400 mb-2">The Lifestyle Seeker</h3>
                            <p className="text-sm text-white/80 mb-2"><strong>Profile:</strong> Inherited wealth, professionals, empty nesters</p>
                            <ul className="text-sm text-white/70 space-y-1 ml-5">
                                <li><strong>Motivation:</strong> Comfort, prestige, emotional satisfaction</li>
                                <li><strong>Decision style:</strong> Emotional, relationship-based</li>
                                <li><strong>Time frame:</strong> Unhurried, process-oriented</li>
                                <li><strong>Communication:</strong> Consultative, personal</li>
                                <li><strong>Values:</strong> Service quality, attention to detail, discretion</li>
                            </ul>
                            <p className="text-sm text-orange-300 mt-3"><strong>Approach:</strong> Focus on lifestyle benefits and personal service</p>
                        </div>

                        <div className="bg-orange-500/20 border-3 border-orange-500 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-orange-400 mb-2">The Status Conscious</h3>
                            <p className="text-sm text-white/80 mb-2"><strong>Profile:</strong> High earners, public figures, social climbers</p>
                            <ul className="text-sm text-white/70 space-y-1 ml-5">
                                <li><strong>Motivation:</strong> Image, exclusivity, social positioning</li>
                                <li><strong>Decision style:</strong> Influenced by others' opinions</li>
                                <li><strong>Time frame:</strong> Varies by social pressure</li>
                                <li><strong>Communication:</strong> Sophisticated, image-conscious</li>
                                <li><strong>Values:</strong> Reputation, exclusivity, social proof</li>
                            </ul>
                            <p className="text-sm text-orange-300 mt-3"><strong>Approach:</strong> Emphasize prestige properties and exclusive access</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Client Psychology Assessment</h2>
                    <p className="text-white/90 mb-4">Use these questions in initial conversations to identify psychological profiles:</p>

                    <div className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-orange-400 mb-4">Quick Psychology Profiling Tool</h3>

                        <div className="bg-white/10 rounded-lg p-4 mb-4">
                            <strong className="text-white">When you think about your ideal home, what matters most?</strong>
                            <div className="mt-3 space-y-2">
                                <label className="flex items-center p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20">
                                    <input type="radio" name="q1" value="wealth-builder" className="mr-3" />
                                    <span className="text-white">The investment potential and future value appreciation</span>
                                </label>
                                <label className="flex items-center p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20">
                                    <input type="radio" name="q1" value="lifestyle-seeker" className="mr-3" />
                                    <span className="text-white">How it makes me feel and enhances my daily life</span>
                                </label>
                                <label className="flex items-center p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20">
                                    <input type="radio" name="q1" value="status-conscious" className="mr-3" />
                                    <span className="text-white">The impression it makes and what it says about me</span>
                                </label>
                            </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-4 mb-4">
                            <strong className="text-white">How do you prefer to make major purchase decisions?</strong>
                            <div className="mt-3 space-y-2">
                                <label className="flex items-center p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20">
                                    <input type="radio" name="q2" value="wealth-builder" className="mr-3" />
                                    <span className="text-white">Analyze all the data and make a logical choice</span>
                                </label>
                                <label className="flex items-center p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20">
                                    <input type="radio" name="q2" value="lifestyle-seeker" className="mr-3" />
                                    <span className="text-white">Trust my gut feeling and work with people I like</span>
                                </label>
                                <label className="flex items-center p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20">
                                    <input type="radio" name="q2" value="status-conscious" className="mr-3" />
                                    <span className="text-white">Consider what others in my position would choose</span>
                                </label>
                            </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-4 mb-4">
                            <strong className="text-white">What's your biggest concern when working with a real estate agent?</strong>
                            <div className="mt-3 space-y-2">
                                <label className="flex items-center p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20">
                                    <input type="radio" name="q3" value="wealth-builder" className="mr-3" />
                                    <span className="text-white">That they don't understand investment fundamentals</span>
                                </label>
                                <label className="flex items-center p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20">
                                    <input type="radio" name="q3" value="lifestyle-seeker" className="mr-3" />
                                    <span className="text-white">That they won't provide the level of service I expect</span>
                                </label>
                                <label className="flex items-center p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20">
                                    <input type="radio" name="q3" value="status-conscious" className="mr-3" />
                                    <span className="text-white">That they don't have access to the right properties or people</span>
                                </label>
                            </div>
                        </div>

                        {assessmentResult && (
                            <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 mb-4">
                                <div className="text-white">
                                    <strong>🎯 Primary Profile: {assessmentResult.profileName}</strong><br /><br />
                                    <strong>Analysis:</strong> {assessmentResult.description}<br /><br />
                                    <strong>Recommended Approach:</strong> {assessmentResult.approach}<br /><br />
                                    <strong>Key Tactics:</strong> {assessmentResult.keyTactics}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={calculateProfile}
                            className="w-full bg-yellow-500 text-gray-800 py-3 px-6 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                        >
                            Analyze Client Profile
                        </button>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Wealth Recognition Indicators</h2>
                    <p className="text-white/90 mb-4">Learn to identify high-income prospects before they tell you their budget:</p>

                    <div className="bg-white/95 text-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Subtle Wealth Signals</h3>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="bg-yellow-100 p-4 rounded-lg">
                                <div className="font-bold text-yellow-600 mb-2">Behavioral Cues</div>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Unhurried decision making</li>
                                    <li>• Focus on quality over price</li>
                                    <li>• Mentions travel or second homes</li>
                                    <li>• Discusses investment portfolios</li>
                                    <li>• References exclusive experiences</li>
                                </ul>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded-lg">
                                <div className="font-bold text-yellow-600 mb-2">Communication Style</div>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Sophisticated vocabulary</li>
                                    <li>• Industry-specific knowledge</li>
                                    <li>• Mentions networking contacts</li>
                                    <li>• Discusses complex transactions</li>
                                    <li>• References advisors/attorneys</li>
                                </ul>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded-lg">
                                <div className="font-bold text-yellow-600 mb-2">Lifestyle References</div>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Private schools for children</li>
                                    <li>• Country club memberships</li>
                                    <li>• Luxury brand preferences</li>
                                    <li>• Charitable involvement</li>
                                    <li>• Professional service teams</li>
                                </ul>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded-lg">
                                <div className="font-bold text-yellow-600 mb-2">Property Preferences</div>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Privacy and security focus</li>
                                    <li>• Custom or architect-designed</li>
                                    <li>• Premium locations/views</li>
                                    <li>• High-end finishes/appliances</li>
                                    <li>• Guest accommodations</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-yellow-100 p-4 rounded-lg mt-4">
                            <p className="text-gray-800 text-sm"><strong>Remember:</strong> True wealth is often understated. The loudest displays of luxury may indicate high income but not necessarily high net worth.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Communication Strategies by Profile</h2>
                    <p className="text-white/90 mb-4">Adapt your communication style to match client psychology:</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4">
                            <h3 className="text-lg font-bold text-green-400 mb-2">For Wealth Builders</h3>
                            <p className="text-white/80 mb-2"><strong>Language Style:</strong> Data-driven, results-focused</p>
                            <div className="bg-white/5 rounded-lg p-3 mb-2">
                                <p className="text-sm italic text-white/90">
                                    "Based on the comparative market analysis, this property shows 23% appreciation over 5 years, outperforming the broader market by 8 percentage points. The cap rate on potential rental income is 6.2%, which aligns with your investment criteria."
                                </p>
                            </div>
                            <p className="text-sm text-white/70"><strong>Key Phrases:</strong></p>
                            <ul className="text-sm text-white/70 ml-5 space-y-1">
                                <li>"ROI analysis shows..."</li>
                                <li>"Market data indicates..."</li>
                                <li>"Strategic positioning..."</li>
                                <li>"Investment fundamentals..."</li>
                            </ul>
                        </div>

                        <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4">
                            <h3 className="text-lg font-bold text-green-400 mb-2">For Lifestyle Seekers</h3>
                            <p className="text-white/80 mb-2"><strong>Language Style:</strong> Emotional, experiential</p>
                            <div className="bg-white/5 rounded-lg p-3 mb-2">
                                <p className="text-sm italic text-white/90">
                                    "Imagine starting your morning with coffee on this terrace, watching the sunrise over the lake. The master suite becomes your private retreat, and the chef's kitchen will make entertaining friends a joy rather than a chore."
                                </p>
                            </div>
                            <p className="text-sm text-white/70"><strong>Key Phrases:</strong></p>
                            <ul className="text-sm text-white/70 ml-5 space-y-1">
                                <li>"How does it feel when..."</li>
                                <li>"Picture yourself..."</li>
                                <li>"This enhances your lifestyle by..."</li>
                                <li>"The experience of living here..."</li>
                            </ul>
                        </div>

                        <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4">
                            <h3 className="text-lg font-bold text-green-400 mb-2">For Status Conscious</h3>
                            <p className="text-white/80 mb-2"><strong>Language Style:</strong> Prestigious, exclusive</p>
                            <div className="bg-white/5 rounded-lg p-3 mb-2">
                                <p className="text-sm italic text-white/90">
                                    "This is one of only three homes in this exclusive enclave, designed by [prestigious architect]. Your neighbors include [notable residents]. The property rarely comes available—the last sale was seven years ago."
                                </p>
                            </div>
                            <p className="text-sm text-white/70"><strong>Key Phrases:</strong></p>
                            <ul className="text-sm text-white/70 ml-5 space-y-1">
                                <li>"Exclusive opportunity..."</li>
                                <li>"Prestigious location..."</li>
                                <li>"Rarely available..."</li>
                                <li>"Distinguished by..."</li>
                            </ul>
                        </div>

                        <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4">
                            <h3 className="text-lg font-bold text-green-400 mb-2">Universal High-Income Language</h3>
                            <p className="text-white/80 mb-2"><strong>Always use:</strong> Sophisticated, respectful tone</p>
                            <ul className="text-sm text-white/70 ml-5 space-y-1">
                                <li>Complex sentence structures</li>
                                <li>Industry-appropriate terminology</li>
                                <li>Reference to quality and craftsmanship</li>
                                <li>Discretion and confidentiality assurance</li>
                                <li>Emphasis on personalized service</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Service Expectations and Standards</h2>
                    <p className="text-white/90 mb-4">High-income clients expect concierge-level service. Here's what that means:</p>

                    <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-yellow-400 mb-4">Elevated Service Standards</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="font-bold text-yellow-400 mb-2">Response Time</h4>
                                <p className="text-sm text-white/80"><strong>Standard clients:</strong> Same day response</p>
                                <p className="text-sm text-white/80"><strong>High-income clients:</strong> Within 2 hours, 1 hour for urgent matters</p>
                                <p className="text-sm text-white/80"><strong>Implementation:</strong> Dedicated phone line, assistant support</p>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="font-bold text-yellow-400 mb-2">Communication Quality</h4>
                                <p className="text-sm text-white/80"><strong>Standard clients:</strong> Professional, informative</p>
                                <p className="text-sm text-white/80"><strong>High-income clients:</strong> Sophisticated, anticipatory</p>
                                <p className="text-sm text-white/80"><strong>Implementation:</strong> Detailed market reports, proactive updates</p>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="font-bold text-yellow-400 mb-2">Privacy & Discretion</h4>
                                <p className="text-sm text-white/80"><strong>Standard clients:</strong> Basic confidentiality</p>
                                <p className="text-sm text-white/80"><strong>High-income clients:</strong> Absolute discretion, NDA if requested</p>
                                <p className="text-sm text-white/80"><strong>Implementation:</strong> Private showings, confidential marketing</p>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="font-bold text-yellow-400 mb-2">Access & Connections</h4>
                                <p className="text-sm text-white/80"><strong>Standard clients:</strong> MLS listings</p>
                                <p className="text-sm text-white/80"><strong>High-income clients:</strong> Off-market opportunities, industry connections</p>
                                <p className="text-sm text-white/80"><strong>Implementation:</strong> Agent networks, exclusive relationships</p>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="font-bold text-yellow-400 mb-2">Problem Resolution</h4>
                                <p className="text-sm text-white/80"><strong>Standard clients:</strong> Coordinate solutions</p>
                                <p className="text-sm text-white/80"><strong>High-income clients:</strong> Handle personally, immediately</p>
                                <p className="text-sm text-white/80"><strong>Implementation:</strong> Direct vendor relationships, 24/7 availability</p>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="font-bold text-yellow-400 mb-2">Transaction Support</h4>
                                <p className="text-sm text-white/80"><strong>Standard clients:</strong> Guide through process</p>
                                <p className="text-sm text-white/80"><strong>High-income clients:</strong> Complete transaction management</p>
                                <p className="text-sm text-white/80"><strong>Implementation:</strong> Attorney coordination, inspection oversight</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Proven Scripts for High-Income Clients */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Proven Scripts for High-Income Clients</h2>

                    <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-xl p-5 mb-5">
                        <div className="text-[#00D4AA] font-bold mb-3">Initial Consultation Approach</div>
                        <div className="bg-white/5 p-4 rounded text-white/90 font-serif italic">
                            "I appreciate you considering me to represent your real estate interests. Before we discuss properties, I'd like to understand your objectives beyond just finding a home.
                            <br /><br />
                            Are you looking at this as a lifestyle enhancement, an investment opportunity, or perhaps both? Understanding your broader goals helps me provide more strategic guidance throughout the process.
                            <br /><br />
                            I also want to assure you that discretion is paramount in my practice. Your privacy and confidentiality are as important to me as they are to you."
                        </div>
                    </div>

                    <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-xl p-5 mb-5">
                        <div className="text-[#00D4AA] font-bold mb-3">Pricing Discussion for Wealth Builders</div>
                        <div className="bg-white/5 p-4 rounded text-white/90 font-serif italic">
                            "Let me walk you through the investment analysis for this property. Based on comparable sales and market trends, we're looking at a purchase price that positions you well for both immediate equity and long-term appreciation.
                            <br /><br />
                            The cap rate assuming rental income is 6.2%, which outperforms most alternative investments in today's market. Additionally, the location and scarcity factor suggest this will appreciate faster than the broader market.
                            <br /><br />
                            From a tax perspective, there are several advantages we should discuss with your accountant, including depreciation benefits and potential 1031 exchange opportunities."
                        </div>
                    </div>

                    <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-xl p-5 mb-5">
                        <div className="text-[#00D4AA] font-bold mb-3">Objection Handling: "Your Commission Seems High"</div>
                        <div className="bg-white/5 p-4 rounded text-white/90 font-serif italic">
                            "I understand you're evaluating the investment in professional representation. My fee structure reflects the comprehensive service level and market access that your transaction requires.
                            <br /><br />
                            This includes off-market opportunity access, white-glove transaction management, and my network of attorneys, inspectors, and contractors who serve discerning clients like yourself.
                            <br /><br />
                            The value I provide typically results in better purchase prices, faster transactions, and fewer complications. Most of my clients find the net result significantly exceeds the fee differential."
                        </div>
                    </div>

                    <div className="bg-[#00D4AA]/10 border-2 border-[#00D4AA] rounded-xl p-5">
                        <div className="text-[#00D4AA] font-bold mb-3">Luxury Property Presentation</div>
                        <div className="bg-white/5 p-4 rounded text-white/90 font-serif italic">
                            "This property represents a rare opportunity in the [prestigious area] market. The architectural significance, combined with the prime location, creates both immediate lifestyle benefits and long-term value protection.
                            <br /><br />
                            What makes this particularly special is [unique feature/history]. Properties of this caliber rarely become available, and when they do, they typically attract multiple sophisticated buyers.
                            <br /><br />
                            I'd be happy to arrange a private showing at your convenience, and I can provide detailed information about the property's provenance and market positioning."
                        </div>
                    </div>
                </div>

                {/* Building Relationships Before They Need You */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Building Relationships Before They Need You</h2>
                    <p className="text-white/90 mb-4">The key to high-income client success is relationship building during non-transaction periods:</p>

                    <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                        <h3 className="text-yellow-400 font-bold mb-4">Strategic Relationship Building</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-[#FF6B35]/10 p-4 rounded-lg text-center">
                                <h4 className="text-[#FF6B35] font-bold mb-2">Country Club Events</h4>
                                <ul className="text-white/90 text-sm text-left ml-5">
                                    <li>Golf tournaments</li>
                                    <li>Charity fundraisers</li>
                                    <li>Social mixers</li>
                                    <li>Member guest events</li>
                                </ul>
                            </div>
                            <div className="bg-[#FFD700]/10 p-4 rounded-lg text-center">
                                <h4 className="text-[#FFD700] font-bold mb-2">Professional Organizations</h4>
                                <ul className="text-white/90 text-sm text-left ml-5">
                                    <li>Executive networking groups</li>
                                    <li>Industry associations</li>
                                    <li>Chamber of Commerce</li>
                                    <li>Board positions</li>
                                </ul>
                            </div>
                            <div className="bg-[#00D4AA]/10 p-4 rounded-lg text-center">
                                <h4 className="text-[#00D4AA] font-bold mb-2">Cultural & Educational</h4>
                                <ul className="text-white/90 text-sm text-left ml-5">
                                    <li>Museum fundraisers</li>
                                    <li>University alumni events</li>
                                    <li>Theater galas</li>
                                    <li>Art gallery openings</li>
                                </ul>
                            </div>
                            <div className="bg-[#FF6B35]/10 p-4 rounded-lg text-center">
                                <h4 className="text-[#FF6B35] font-bold mb-2">Lifestyle Interests</h4>
                                <ul className="text-white/90 text-sm text-left ml-5">
                                    <li>Wine tastings</li>
                                    <li>Luxury travel groups</li>
                                    <li>Private dining clubs</li>
                                    <li>Collector societies</li>
                                </ul>
                            </div>
                            <div className="bg-[#00D4AA]/10 p-4 rounded-lg text-center">
                                <h4 className="text-[#00D4AA] font-bold mb-2">Financial Services</h4>
                                <ul className="text-white/90 text-sm text-left ml-5">
                                    <li>Wealth management seminars</li>
                                    <li>Tax planning workshops</li>
                                    <li>Estate planning events</li>
                                    <li>Investment club meetings</li>
                                </ul>
                            </div>
                            <div className="bg-[#FF6B35]/10 p-4 rounded-lg text-center">
                                <h4 className="text-[#FF6B35] font-bold mb-2">Family-Focused Events</h4>
                                <ul className="text-white/90 text-sm text-left ml-5">
                                    <li>Private school functions</li>
                                    <li>Youth sports leagues</li>
                                    <li>Community foundation events</li>
                                    <li>Religious organization activities</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-yellow-400 font-bold mt-6 mb-3">The Value-First Approach</h3>
                    <div className="bg-white/10 p-5 rounded">
                        <p className="text-white/90"><strong>Instead of:</strong> "I'm a real estate agent, let me know if you need help"</p>
                        <p className="text-white/90"><strong>Try:</strong> "I specialize in [area] real estate market analysis. I'd be happy to share insights about property values in your neighborhood if you're ever curious."</p>
                        <h4 className="text-[#FFD700] font-bold mt-4">Value-Add Strategies:</h4>
                        <ul className="text-white/90 ml-6 list-disc">
                            <li><strong>Market reports:</strong> Quarterly neighborhood analyses</li>
                            <li><strong>Investment insights:</strong> Off-market opportunity alerts</li>
                            <li><strong>Vendor referrals:</strong> Trusted contractor/service provider recommendations</li>
                            <li><strong>Market timing:</strong> Optimal buying/selling windows</li>
                            <li><strong>Property advice:</strong> Renovation ROI guidance</li>
                        </ul>
                    </div>
                </div>

                {/* Advanced Relationship Maintenance */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Advanced Relationship Maintenance</h2>
                    <p className="text-white/90 mb-4">Systematic approaches to staying top-of-mind with high-value prospects:</p>

                    <h3 className="text-yellow-400 font-bold mb-3">The Quarterly Touch System</h3>
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-[#FF6B35]/10 p-4 rounded text-center">
                            <h4 className="text-[#FF6B35] font-bold mb-2">Q1: Market Intelligence</h4>
                            <p className="text-sm text-white/90">Comprehensive market report with forward-looking insights</p>
                        </div>
                        <div className="bg-[#FFD700]/10 p-4 rounded text-center">
                            <h4 className="text-[#FFD700] font-bold mb-2">Q2: Personal Check-in</h4>
                            <p className="text-sm text-white/90">Personal call or lunch to discuss family, business, goals</p>
                        </div>
                        <div className="bg-[#00D4AA]/10 p-4 rounded text-center">
                            <h4 className="text-[#00D4AA] font-bold mb-2">Q3: Exclusive Access</h4>
                            <p className="text-sm text-white/90">First look at premium listings or off-market opportunities</p>
                        </div>
                        <div className="bg-[#FF6B35]/10 p-4 rounded text-center">
                            <h4 className="text-[#FF6B35] font-bold mb-2">Q4: Appreciation</h4>
                            <p className="text-sm text-white/90">Holiday gift or year-end market summary with thanks</p>
                        </div>
                    </div>

                    <h3 className="text-yellow-400 font-bold mb-3">High-Touch Service Delivery</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#FFD700]/10 p-6 rounded-xl">
                            <h4 className="text-[#FFD700] font-bold mb-2">Concierge-Level Standards</h4>
                            <ul className="text-white/90 ml-6 list-disc">
                                <li><strong>Anticipate needs:</strong> Prepare solutions before problems arise</li>
                                <li><strong>Personal attention:</strong> Handle requests personally, not through assistants</li>
                                <li><strong>Flexible scheduling:</strong> Accommodate their calendar, not yours</li>
                                <li><strong>Discretion always:</strong> Never discuss their business with others</li>
                                <li><strong>Quality control:</strong> Personally verify all vendor work</li>
                            </ul>
                        </div>
                        <div className="bg-[#00D4AA]/10 p-6 rounded-xl">
                            <h4 className="text-[#00D4AA] font-bold mb-2">Exclusive Access Benefits</h4>
                            <ul className="text-white/90 ml-6 list-disc">
                                <li><strong>Off-market listings:</strong> Properties before public marketing</li>
                                <li><strong>Pocket listings:</strong> Agent-to-agent exclusive opportunities</li>
                                <li><strong>Pre-market access:</strong> First showing appointments</li>
                                <li><strong>Developer relationships:</strong> Best lots/units in new construction</li>
                                <li><strong>Estate sales:</strong> Family connections for private sales</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Common Mistakes */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Common Mistakes When Serving High-Income Clients</h2>
                    <div className="space-y-4">
                        <div className="bg-[#FF6B35]/20 p-5 rounded-xl">
                            <h4 className="text-[#FF6B35] font-bold mb-2">❌ The "Intimidation" Mistake</h4>
                            <p className="text-white/90"><strong>Error:</strong> Being overly deferential or nervous around wealthy clients</p>
                            <p className="text-white/90"><strong>Fix:</strong> Confident professionalism. They want competence, not fawning.</p>
                        </div>
                        <div className="bg-[#FF6B35]/20 p-5 rounded-xl">
                            <h4 className="text-[#FF6B35] font-bold mb-2">❌ The "Assumption" Mistake</h4>
                            <p className="text-white/90"><strong>Error:</strong> Assuming budget, timeline, or motivations</p>
                            <p className="text-white/90"><strong>Fix:</strong> Ask sophisticated questions to understand their specific situation.</p>
                        </div>
                        <div className="bg-[#FF6B35]/20 p-5 rounded-xl">
                            <h4 className="text-[#FF6B35] font-bold mb-2">❌ The "Overselling" Mistake</h4>
                            <p className="text-white/90"><strong>Error:</strong> Pushing properties or decisions</p>
                            <p className="text-white/90"><strong>Fix:</strong> Consultative approach. Present options and let them decide.</p>
                        </div>
                        <div className="bg-[#FF6B35]/20 p-5 rounded-xl">
                            <h4 className="text-[#FF6B35] font-bold mb-2">❌ The "One-Size-Fits-All" Mistake</h4>
                            <p className="text-white/90"><strong>Error:</strong> Using the same approach for all wealthy clients</p>
                            <p className="text-white/90"><strong>Fix:</strong> Adapt to their specific psychological profile and preferences.</p>
                        </div>
                    </div>
                </div>

                {/* Measuring High-Income Client Success */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Measuring High-Income Client Success</h2>
                    <p className="text-white/90 mb-4">Track these metrics to optimize your affluent client strategy:</p>

                    <div className="bg-white text-[#1e3a5f] rounded-xl p-6">
                        <h3 className="text-2xl font-bold mb-4">High-Income Client Performance Dashboard</h3>
                        <div className="grid md:grid-cols-4 gap-6 mb-6">
                            <div className="text-center p-5 bg-[#FFD700]/10 rounded">
                                <div className="text-3xl font-bold text-[#FFD700]">$847K</div>
                                <div className="text-sm text-[#333]">Average Transaction</div>
                            </div>
                            <div className="text-center p-5 bg-[#FF6B35]/10 rounded">
                                <div className="text-3xl font-bold text-[#FF6B35]">73%</div>
                                <div className="text-sm text-[#333]">Referral Rate</div>
                            </div>
                            <div className="text-center p-5 bg-[#00D4AA]/10 rounded">
                                <div className="text-3xl font-bold text-[#00D4AA]">2.4</div>
                                <div className="text-sm text-[#333]">Transactions per Client</div>
                            </div>
                            <div className="text-center p-5 bg-[#FFD700]/10 rounded">
                                <div className="text-3xl font-bold text-[#FFD700]">18</div>
                                <div className="text-sm text-[#333]">Days to Close</div>
                            </div>
                        </div>
                        <div className="bg-[#FFD700]/10 p-5 rounded">
                            <h4 className="text-[#FFD700] font-bold mb-3">Success Indicators:</h4>
                            <ul className="list-disc ml-6 text-[#1e3a5f]">
                                <li><strong>High referral rates:</strong> Indicates satisfaction and trust</li>
                                <li><strong>Multiple transactions:</strong> Shows ongoing relationship value</li>
                                <li><strong>Fast closings:</strong> Reflects smooth, professional process</li>
                                <li><strong>Premium pricing:</strong> Demonstrates market positioning success</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 30-Day Implementation Plan */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">30-Day Implementation Plan</h2>
                    <p className="text-white/90 mb-4">Your roadmap to attracting and serving high-income clients:</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-[#FFD700]/10 p-6 rounded-xl text-center">
                            <h4 className="text-[#FFD700] font-bold mb-3">Week 1-2: Foundation</h4>
                            <ul className="text-white/90 text-left ml-5 list-disc">
                                <li>Study luxury properties in your market</li>
                                <li>Develop sophisticated marketing materials</li>
                                <li>Practice psychology assessment questions</li>
                                <li>Identify high-income networking opportunities</li>
                            </ul>
                        </div>
                        <div className="bg-[#FF6B35]/10 p-6 rounded-xl text-center">
                            <h4 className="text-[#FF6B35] font-bold mb-3">Week 3-4: Implementation</h4>
                            <ul className="text-white/90 text-left ml-5 list-disc">
                                <li>Attend 2-3 high-end networking events</li>
                                <li>Create value-add market reports</li>
                                <li>Practice scripts with colleagues</li>
                                <li>Establish vendor relationships for concierge service</li>
                            </ul>
                        </div>
                        <div className="bg-[#00D4AA]/10 p-6 rounded-xl text-center">
                            <h4 className="text-[#00D4AA] font-bold mb-3">Ongoing: Optimization</h4>
                            <ul className="text-white/90 text-left ml-5 list-disc">
                                <li>Refine communication based on client feedback</li>
                                <li>Expand professional network systematically</li>
                                <li>Track metrics and adjust approach</li>
                                <li>Build reputation through results</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">🎯 Key Takeaway</h2>
                    <p className="text-green-100 text-lg">
                        Agents serving high-income clients earn 340% more per transaction on average. The key is understanding their psychology and adapting your approach accordingly.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HighIncomeClientPsychology;
