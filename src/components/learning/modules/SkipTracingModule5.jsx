import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Target, Search, Users, Shield, TrendingUp, Clock, Star, DollarSign, Handshake, Brain } from 'lucide-react';

const SkipTracingModule5 = () => {
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showResults, setShowResults] = useState({});
    const [quizScore, setQuizScore] = useState(0);

    const handleAnswerSelect = (quizNumber, questionNumber, answer) => {
        setQuizAnswers(prev => ({
            ...prev,
            [`${quizNumber}_${questionNumber}`]: answer
        }));
    };

    const handleQuizSubmit = (quizNumber) => {
        const correctAnswers = {
            1: { 1: 'b', 2: 'd', 3: 'c' },
            2: { 1: 'b', 2: 'a', 3: 'c' },
            3: { 1: 'c', 2: 'b', 3: 'a' },
            4: { 1: 'b', 2: 'c', 3: 'a' },
            5: { 1: 'b', 2: 'c', 3: 'b' }
        };

        let score = 0;
        const totalQuestions = 3;

        for (let i = 1; i <= totalQuestions; i++) {
            const userAnswer = quizAnswers[`${quizNumber}_${i}`];
            const correctAnswer = correctAnswers[quizNumber][i];
            if (userAnswer === correctAnswer) {
                score++;
            }
        }

        setShowResults(prev => ({
            ...prev,
            [quizNumber]: true
        }));
        setQuizScore(score);
    };

    return (
        <div className="space-y-12">
            {/* Learning Objectives */}
            <div className="bg-gradient-to-r from-[#00D4AA]/20 to-[#00B894]/20 rounded-2xl p-8 border border-[#00D4AA]/30">
                <h3 className="text-2xl font-bold text-[#00D4AA] mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6" />
                    What You'll Learn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Master the SPARK conversion framework for high-converting conversations</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Advanced scripts and objection handling techniques</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Qualification systems and appointment setting strategies</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Closing techniques and deal structuring</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Building long-term relationships and referral systems</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Scaling your conversion operations</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 1: SPARK Conversion Framework */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Section 1: The SPARK Conversion Framework</h3>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <p className="text-white/80 mb-6">
                        Converting skip traced leads requires a systematic approach that builds trust, uncovers motivation, and guides prospects toward a decision. The SPARK framework provides a proven structure for high-converting conversations.
                    </p>

                    <h4 className="text-2xl font-bold text-[#FFD700] mb-6">The SPARK Method Breakdown</h4>

                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-[#00D4AA]/20 to-[#00B894]/20 rounded-xl p-6 border border-[#00D4AA]/30">
                            <h5 className="text-xl font-bold text-[#00D4AA] mb-4">S - Situation Assessment</h5>
                            <p className="text-white/80 mb-4"><strong>Goal:</strong> Understand their current property situation and circumstances</p>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                                    <span>Property ownership timeline</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                                    <span>Current living arrangement</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                                    <span>Property condition and maintenance issues</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                                    <span>Financial situation indicators</span>
                                </li>
                            </ul>
                            <p className="text-[#00D4AA] font-semibold"><strong>Time Investment:</strong> 2-3 minutes</p>
                        </div>

                        <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-xl p-6 border border-[#FFD700]/30">
                            <h5 className="text-xl font-bold text-[#FFD700] mb-4">P - Problem Discovery</h5>
                            <p className="text-white/80 mb-4"><strong>Goal:</strong> Identify pain points and challenges they're facing</p>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                    <span>Property maintenance costs</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                    <span>Tenant or vacancy issues</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                    <span>Tax burden concerns</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                    <span>Life changes requiring liquidity</span>
                                </li>
                            </ul>
                            <p className="text-[#FFD700] font-semibold"><strong>Time Investment:</strong> 3-4 minutes</p>
                        </div>

                        <div className="bg-gradient-to-r from-[#5dade2]/20 to-[#3498db]/20 rounded-xl p-6 border border-[#5dade2]/30">
                            <h5 className="text-xl font-bold text-[#5dade2] mb-4">A - Aspiration Alignment</h5>
                            <p className="text-white/80 mb-4"><strong>Goal:</strong> Connect their problems to desired outcomes</p>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#5dade2] mt-1 flex-shrink-0" />
                                    <span>What would an ideal solution look like?</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#5dade2] mt-1 flex-shrink-0" />
                                    <span>Timeline preferences and constraints</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#5dade2] mt-1 flex-shrink-0" />
                                    <span>Financial goals and requirements</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#5dade2] mt-1 flex-shrink-0" />
                                    <span>Stress reduction and convenience factors</span>
                                </li>
                            </ul>
                            <p className="text-[#5dade2] font-semibold"><strong>Time Investment:</strong> 2-3 minutes</p>
                        </div>

                        <div className="bg-gradient-to-r from-[#FF6B35]/20 to-[#e67e22]/20 rounded-xl p-6 border border-[#FF6B35]/30">
                            <h5 className="text-xl font-bold text-[#FF6B35] mb-4">R - Resolution Presentation</h5>
                            <p className="text-white/80 mb-4"><strong>Goal:</strong> Present your solution as the bridge to their goals</p>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#FF6B35] mt-1 flex-shrink-0" />
                                    <span>Quick closing timeline benefits</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#FF6B35] mt-1 flex-shrink-0" />
                                    <span>Cash offer advantages</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#FF6B35] mt-1 flex-shrink-0" />
                                    <span>No repair or showing hassles</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#FF6B35] mt-1 flex-shrink-0" />
                                    <span>Certainty and reliability factors</span>
                                </li>
                            </ul>
                            <p className="text-[#FF6B35] font-semibold"><strong>Time Investment:</strong> 3-4 minutes</p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 rounded-xl p-6 border border-purple-500/30">
                            <h5 className="text-xl font-bold text-purple-400 mb-4">K - Commitment Securing</h5>
                            <p className="text-white/80 mb-4"><strong>Goal:</strong> Move from interest to concrete next steps</p>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                                    <span>Schedule property evaluation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                                    <span>Confirm decision-making timeline</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                                    <span>Address final objections</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                                    <span>Set clear expectations</span>
                                </li>
                            </ul>
                            <p className="text-purple-400 font-semibold"><strong>Time Investment:</strong> 2-3 minutes</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SPARK Success Metrics Table */}
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                <h4 className="text-2xl font-bold text-[#FFD700] mb-6">SPARK Framework Success Metrics</h4>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white/10 rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-[#00D4AA]/20">
                                <th className="p-4 text-left text-[#00D4AA] font-bold">Stage</th>
                                <th className="p-4 text-left text-[#00D4AA] font-bold">Key Indicator</th>
                                <th className="p-4 text-left text-[#00D4AA] font-bold">Success Rate</th>
                                <th className="p-4 text-left text-[#00D4AA] font-bold">Next Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-white/20">
                                <td className="p-4 font-semibold text-[#00D4AA]">Situation</td>
                                <td className="p-4">They share property details freely</td>
                                <td className="p-4 text-green-400 font-bold">70-80%</td>
                                <td className="p-4">Continue to Problem</td>
                            </tr>
                            <tr className="border-b border-white/20">
                                <td className="p-4 font-semibold text-[#FFD700]">Problem</td>
                                <td className="p-4">They admit to challenges/frustrations</td>
                                <td className="p-4 text-green-400 font-bold">50-60%</td>
                                <td className="p-4">Continue to Aspiration</td>
                            </tr>
                            <tr className="border-b border-white/20">
                                <td className="p-4 font-semibold text-[#5dade2]">Aspiration</td>
                                <td className="p-4">They describe ideal outcomes</td>
                                <td className="p-4 text-green-400 font-bold">40-50%</td>
                                <td className="p-4">Continue to Resolution</td>
                            </tr>
                            <tr className="border-b border-white/20">
                                <td className="p-4 font-semibold text-[#FF6B35]">Resolution</td>
                                <td className="p-4">They express interest in your solution</td>
                                <td className="p-4 text-green-400 font-bold">30-40%</td>
                                <td className="p-4">Continue to Commitment</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-semibold text-purple-400">Commitment</td>
                                <td className="p-4">They agree to next meeting/evaluation</td>
                                <td className="p-4 text-green-400 font-bold">15-25%</td>
                                <td className="p-4">Schedule appointment</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quiz 1 */}
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">🧠 Section 1 Quiz</h3>
                <p className="text-white/70 mb-6">Test your understanding of the SPARK framework</p>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">1. What is the primary goal of the Situation Assessment stage?</h4>
                        <div className="space-y-3">
                            {[
                                'Present your solution immediately',
                                'Understand their current property situation and circumstances',
                                'Ask for their budget',
                                'Schedule a property visit'
                            ].map((option, index) => (
                                <label key={index} className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all bg-white/5 border-2 border-transparent hover:bg-white/10">
                                    <input
                                        type="radio"
                                        name="quiz1_q1"
                                        value={String.fromCharCode(97 + index)}
                                        onChange={() => handleAnswerSelect(1, 1, String.fromCharCode(97 + index))}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-white">{String.fromCharCode(97 + index).toUpperCase()}. {option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">2. At which stage do you present your solution?</h4>
                        <div className="space-y-3">
                            {[
                                'Situation Assessment',
                                'Problem Discovery',
                                'Aspiration Alignment',
                                'Resolution Presentation'
                            ].map((option, index) => (
                                <label key={index} className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all bg-white/5 border-2 border-transparent hover:bg-white/10">
                                    <input
                                        type="radio"
                                        name="quiz1_q2"
                                        value={String.fromCharCode(97 + index)}
                                        onChange={() => handleAnswerSelect(1, 2, String.fromCharCode(97 + index))}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-white">{String.fromCharCode(97 + index).toUpperCase()}. {option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">3. What's the expected success rate for reaching the Commitment stage?</h4>
                        <div className="space-y-3">
                            {['50-60%', '30-40%', '15-25%', '5-10%'].map((option, index) => (
                                <label key={index} className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all bg-white/5 border-2 border-transparent hover:bg-white/10">
                                    <input
                                        type="radio"
                                        name="quiz1_q3"
                                        value={String.fromCharCode(97 + index)}
                                        onChange={() => handleAnswerSelect(1, 3, String.fromCharCode(97 + index))}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-white">{String.fromCharCode(97 + index).toUpperCase()}. {option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => handleQuizSubmit(1)}
                        className="w-full bg-[#00D4AA] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-[#00B894] transition-colors"
                    >
                        Check Answers
                    </button>

                    {showResults[1] && (
                        <div className="bg-white/10 rounded-xl p-6 text-center">
                            <div className="text-2xl font-bold text-white mb-2">
                                {quizScore >= 2 ? 'Excellent!' : 'Review and Try Again'}
                            </div>
                            <p className="text-white/80">
                                {quizScore >= 2
                                    ? 'You understand the SPARK conversion framework.'
                                    : 'Review the material and try again.'
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Section 2: Advanced Scripts and Objection Handling */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Section 2: Advanced Scripts and Objection Handling</h3>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <p className="text-white/80 mb-6">
                        Mastering proven scripts and objection responses dramatically increases your conversion rates. These frameworks handle the most common scenarios you'll encounter with skip traced leads.
                    </p>

                    <h4 className="text-2xl font-bold text-[#FFD700] mb-6">Opening Script Templates</h4>

                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-[#00D4AA]/20 to-[#00B894]/20 rounded-xl p-6 border border-[#00D4AA]/30">
                            <h5 className="text-xl font-bold text-[#00D4AA] mb-4">High-Value Property Opening (Properties >$300K)</h5>
                            <div className="bg-white/10 rounded-lg p-4 italic border-l-4 border-[#FFD700] mb-4">
                                "Hi [Name], this is [Your Name] with [Company]. I'm a local real estate investor, and I'm calling specifically about your property at [Address]. I've been tracking the market in your area, and I noticed some significant value changes that might interest you as a property owner.
                                <br /><br />
                                Before I share what I've found, can you tell me - are you still the owner of that property on [Street Name]?"
                            </div>
                            <p className="text-white/80 mb-4"><strong>Why this works:</strong></p>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                                    <span>Positions you as a market expert</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                                    <span>Creates curiosity about value changes</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                                    <span>Confirms ownership immediately</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                                    <span>Avoids sounding like a cold caller</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-xl p-6 border border-[#FFD700]/30">
                            <h5 className="text-xl font-bold text-[#FFD700] mb-4">Distressed Property Opening (Properties $200K)</h5>
                            <div className="bg-white/10 rounded-lg p-4 italic border-l-4 border-[#00D4AA] mb-4">
                                "Hi [Name], I'm [Your Name] from [Company]. I'm calling about the property you own at [Address]. I work with property owners in [Area] who sometimes need flexible solutions for their real estate.
                                <br /><br />
                                I'm curious - is that property currently occupied, or are you dealing with any tenant or maintenance situations there?"
                            </div>
                            <p className="text-white/80 mb-4"><strong>Why this works:</strong></p>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                    <span>Acknowledges potential challenges</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                    <span>Positions you as a solution provider</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                    <span>Opens conversation about problems</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                    <span>Shows understanding of investor challenges</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Top 5 Objections and Responses */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Section 3: The Top 5 Objections and Responses</h3>
                <div className="space-y-8">
                    <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                        <h4 className="text-2xl font-bold text-[#FFD700] mb-6">Objection 1: "I'm not interested in selling"</h4>
                        <div className="bg-gradient-to-r from-[#FF6B35]/20 to-[#e67e22]/20 rounded-xl p-6 border border-[#FF6B35]/30">
                            <p className="text-white/80 mb-4"><strong>Response:</strong> "I completely understand, and most property owners I speak with aren't actively thinking about selling when I first call. That's actually normal.
                                <br /><br />
                                The reason I called is that I've noticed some market changes in your area that might affect your property value - both positively and negatively. Whether you're planning to sell now or in the future, this information could be valuable for your planning.
                                <br /><br />
                                Would you be open to hearing what I've observed in your neighborhood over the past few months?"</p>
                            <p className="text-[#FF6B35] font-semibold"><strong>Conversion Rate:</strong> 35-45% continue the conversation</p>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                        <h4 className="text-2xl font-bold text-[#FFD700] mb-6">Objection 2: "How did you get my number?"</h4>
                        <div className="bg-gradient-to-r from-[#00D4AA]/20 to-[#00B894]/20 rounded-xl p-6 border border-[#00D4AA]/30">
                            <p className="text-white/80 mb-4"><strong>Response:</strong> "That's a fair question. I work with property records and market data to identify homeowners in areas where I'm active as an investor. I focus on [Your Area] specifically because I know the market well.
                                <br /><br />
                                I'm not a telemarketer or lead company - I'm a local real estate professional who buys properties directly. I called because I've been tracking your neighborhood and wanted to see if you might be interested in some market information I've gathered.
                                <br /><br />
                                Does that make sense? Would you like to hear what I've noticed about property values in your area?"</p>
                            <p className="text-[#00D4AA] font-semibold"><strong>Conversion Rate:</strong> 40-50% accept the explanation</p>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                        <h4 className="text-2xl font-bold text-[#FFD700] mb-6">Objection 3: "What's your offer?"</h4>
                        <div className="bg-gradient-to-r from-[#5dade2]/20 to-[#3498db]/20 rounded-xl p-6 border border-[#5dade2]/30">
                            <p className="text-white/80 mb-4"><strong>Response:</strong> "I appreciate you asking directly - that tells me you might be open to exploring options. Here's the thing: I never make offers over the phone because every property is unique, and I want to be fair to you.
                                <br /><br />
                                My process is to first understand your situation and timeline, then schedule a brief property evaluation. Based on that, I can present you with a few different options that might work.
                                <br /><br />
                                Before we talk about offers, help me understand - if you were to consider selling, what would your ideal timeline look like?"</p>
                            <p className="text-[#5dade2] font-semibold"><strong>Conversion Rate:</strong> 55-65% engage in timeline discussion</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                            <h4 className="text-xl font-bold text-[#FFD700] mb-4">Objection 4: "I need to think about it"</h4>
                            <div className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 rounded-xl p-6 border border-purple-500/30">
                                <p className="text-white/80 mb-4"><strong>The Think-It-Over Close:</strong></p>
                                <p className="text-white/80 mb-4">"Absolutely, and I'd be concerned if you didn't want to think it over. This is an important decision.
                                    <br /><br />
                                    Help me understand what specifically you'd like to think about - is it the timeline, the process, or do you have questions about how this type of sale works?"</p>
                                <p className="text-purple-400 font-semibold"><strong>Follow-up:</strong> Address their specific concern, then: "Would it help if we scheduled a brief call later this week to discuss those details?"</p>
                            </div>
                        </div>

                        <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                            <h4 className="text-xl font-bold text-[#FFD700] mb-4">Objection 5: "I want to list with a realtor"</h4>
                            <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 rounded-xl p-6 border border-green-500/30">
                                <p className="text-white/80 mb-4"><strong>The Options Response:</strong></p>
                                <p className="text-white/80 mb-4">"That's certainly one option, and realtors can be great for the right situation. Many of my clients actually considered that path initially.
                                    <br /><br />
                                    The difference is that with a realtor, you'll have 3-6 months of showings, negotiations, and uncertainty. With us, you get a guaranteed close in 2-3 weeks with cash in hand.
                                    <br /><br />
                                    Would you like to hear how both options compare for your specific situation?"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Qualification and Appointment Setting */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Section 4: Qualification and Appointment Setting</h3>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <p className="text-white/80 mb-6">
                        Not every lead is worth pursuing equally. Effective qualification ensures you spend time on prospects most likely to convert, while appointment setting creates clear next steps.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/10 rounded-xl p-6 border-2 border-green-400">
                            <h5 className="text-xl font-bold text-green-400 mb-4">✅ Qualified Lead Indicators</h5>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Discusses timeline openly</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Asks about process and terms</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Mentions financial pressure or urgency</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Shows decision-making authority</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Engages in detailed conversation</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6 border-2 border-red-400">
                            <h5 className="text-xl font-bold text-red-400 mb-4">❌ Unqualified Lead Signals</h5>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Vague about timeline or needs</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Wants unrealistic prices</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>No decision-making authority</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Just wants market value estimates</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Hostile or argumentative</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h4 className="text-2xl font-bold text-[#FFD700] mb-6">Appointment Setting Script</h4>
                    <div className="bg-gradient-to-r from-[#00D4AA]/20 to-[#00B894]/20 rounded-xl p-6 border border-[#00D4AA]/30">
                        <div className="bg-white/10 rounded-lg p-4 italic border-l-4 border-[#FFD700]">
                            "Based on what you've told me, I think I might be able to help you with your situation. Here's what I'd like to propose:
                            <br /><br />
                            I can come by the property for about 30 minutes this week to take a look at the condition and give you a realistic assessment of what we could offer. This is completely free and there's no obligation.
                            <br /><br />
                            The best part is that if we can come to an agreement, we can close in 2-3 weeks and you'll have cash in hand. Does that sound like something you'd be interested in exploring?"
                        </div>
                        <p className="text-[#00D4AA] font-semibold mt-4"><strong>Success Rate:</strong> 60-70% of qualified leads accept appointments</p>
                    </div>
                </div>
            </div>

            {/* Brain Teaser Challenge */}
            <div className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 rounded-2xl p-8 border-2 border-purple-400/50">
                <div className="text-center mb-8">
                    <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-purple-400 mb-4">Conversion Mastery Challenge</h3>
                    <p className="text-purple-200 text-lg">Test your mastery of advanced conversion techniques with this complex scenario!</p>
                </div>

                <div className="bg-white/10 rounded-xl p-8 border border-white/20">
                    <h4 className="text-2xl font-bold text-[#FFD700] mb-6">The Million Dollar Conversion Puzzle</h4>
                    <p className="text-white/80 mb-6">
                        <strong>Scenario:</strong> You're working with a skip traced lead for a $2.1 million commercial building. The owner, Sarah Chen, inherited the property 8 months ago and is struggling with management. Here's the complex situation:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-xl p-6 border border-[#FFD700]/30">
                            <h5 className="text-xl font-bold text-[#FFD700] mb-4">The Challenge</h5>
                            <ul className="space-y-2 text-sm">
                                <li>• Property needs $400K in repairs</li>
                                <li>• Current tenant paying below market</li>
                                <li>• Sarah lives 200 miles away</li>
                                <li>• Inherited from estranged father</li>
                                <li>• Wants to sell but fears "giving it away"</li>
                                <li>• Has received 3 lowball offers already</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-[#00D4AA]/20 to-[#00B894]/20 rounded-xl p-6 border border-[#00D4AA]/30">
                            <h5 className="text-xl font-bold text-[#00D4AA] mb-4">Your Opportunity</h5>
                            <ul className="space-y-2 text-sm">
                                <li>• You can close in 3 weeks</li>
                                <li>• Cash offer with no contingencies</li>
                                <li>• Will handle all tenant issues</li>
                                <li>• Can offer flexible closing terms</li>
                                <li>• Your max offer: $1.6M</li>
                                <li>• Competition offers: $1.2M-$1.4M</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#00D4AA]/20 to-[#00B894]/20 rounded-xl p-6 border border-[#00D4AA]/30">
                        <h5 className="text-xl font-bold text-[#00D4AA] mb-4">Master-Level Questions</h5>
                        <ol className="space-y-2 text-sm">
                            <li>1. How do you handle her fear of "giving it away" while staying within your $1.6M budget?</li>
                            <li>2. What's your strategy for addressing the emotional aspect of selling her father's property?</li>
                            <li>3. How do you position your offer against the competition without sounding desperate?</li>
                            <li>4. What closing techniques would you use given the time pressure and distance factor?</li>
                            <li>5. How do you handle potential objections about the $500K difference from market value?</li>
                        </ol>
                    </div>
                </div>
            </div>

            {/* Success Box */}
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-400/30">
                <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-400 mb-4">Course Complete!</h3>
                    <p className="text-green-200 text-lg">
                        Congratulations! You've mastered the complete skip tracing system from fundamentals to advanced conversion strategies. You're now ready to build a successful skip tracing operation.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SkipTracingModule5;
