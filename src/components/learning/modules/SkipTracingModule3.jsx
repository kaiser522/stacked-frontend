import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Target, Search, Users, Shield, TrendingUp, Clock, Star, Phone, Mail, MessageSquare, Send } from 'lucide-react';

const SkipTracingModule3 = () => {
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
            1: { 1: 'B', 2: 'C', 3: 'B' },
            2: { 1: 'B', 2: 'C', 3: 'C' },
            3: { 1: 'B', 2: 'C', 3: 'A' },
            4: { 1: 'B', 2: 'C', 3: 'B' },
            5: { 1: 'B', 2: 'B', 3: 'B' },
            6: { 1: 'B' }
        };

        let score = 0;
        const totalQuestions = quizNumber === 6 ? 1 : 3;

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
                            <span>Design and implement multi-channel outreach campaigns</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Create compelling scripts and email templates</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Optimize contact timing for maximum response rates</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Personalize outreach using skip trace data insights</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Handle objections and difficult conversations professionally</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Track and measure outreach campaign performance</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Introduction */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">The Psychology of Skip Traced Lead Outreach</h3>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <p className="text-white/80 mb-6">
                        Skip traced leads represent a unique category of prospects. Unlike cold calls from public records, these individuals have been specifically identified through investigative processes. This creates both opportunities and challenges that require a sophisticated approach.
                    </p>

                    <h4 className="text-2xl font-bold text-[#FFD700] mb-4">Understanding the Skip Traced Lead Mindset</h4>
                    <p className="text-white/80 mb-4">When you contact someone who has been skip traced, several psychological factors are at play:</p>

                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span><strong>Surprise Factor:</strong> They didn't expect to be found or contacted</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span><strong>Privacy Concerns:</strong> They may wonder how you obtained their information</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span><strong>Motivation Indicators:</strong> The fact they were skip traced often indicates distress or urgency</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span><strong>Trust Barriers:</strong> Initial skepticism about your legitimacy and intentions</span>
                        </li>
                    </ul>

                    <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-xl p-6 border border-[#FFD700]/30 mt-6">
                        <h5 className="text-xl font-bold text-[#FFD700] mb-4">Key Insight: The "Found Me" Response</h5>
                        <p className="text-white/80">
                            Many skip traced leads have a "How did you find me?" reaction. This can work in your favor if you handle it professionally, as it demonstrates your resourcefulness and commitment to reaching property owners who need your services.
                        </p>
                    </div>
                </div>
            </div>

            {/* Quiz 1 */}
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">🧠 Knowledge Check: Lead Psychology</h3>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">1. What is the primary psychological advantage of contacting skip traced leads compared to cold calling from public records?</h4>
                        <div className="space-y-3">
                            {[
                                'They are more likely to be home',
                                'They are often in situations requiring solutions',
                                'They have more money to spend',
                                'They are expecting your call'
                            ].map((option, index) => (
                                <label key={index} className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all bg-white/5 border-2 border-transparent hover:bg-white/10">
                                    <input
                                        type="radio"
                                        name="quiz1_q1"
                                        value={String.fromCharCode(65 + index)}
                                        onChange={() => handleAnswerSelect(1, 1, String.fromCharCode(65 + index))}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-white">{String.fromCharCode(65 + index)}. {option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => handleQuizSubmit(1)}
                        className="w-full bg-[#00D4AA] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-[#00B894] transition-colors"
                    >
                        Check Answer
                    </button>

                    {showResults[1] && (
                        <div className="bg-white/10 rounded-xl p-6 text-center">
                            <div className="text-2xl font-bold text-white mb-2">
                                {quizScore >= 1 ? 'Correct!' : 'Try Again'}
                            </div>
                            <p className="text-white/80">
                                Skip traced leads are typically in situations that motivated someone to search for them - distressed properties, inheritance situations, or other circumstances requiring solutions.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Multi-Channel Strategy */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">The Multi-Channel Approach</h3>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <p className="text-white/80 mb-6">
                        Skip traced leads require a strategic, multi-touch approach. Unlike cold calling from public records, these leads often have multiple contact methods available - phone, email, and sometimes social media profiles. The key is creating a coordinated campaign that feels personal, not automated.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white/10 rounded-xl p-6 border-2 border-[#00D4AA] hover:border-[#FFD700] transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <Phone className="w-6 h-6 text-[#00D4AA]" />
                                <h4 className="text-lg font-bold text-[#00D4AA]">Phone-First Strategy</h4>
                            </div>
                            <p className="text-white/80 text-sm">Start with phone calls during optimal times. Phone provides immediate feedback and allows for real-time relationship building. Aim for 3-4 call attempts at different times and days.</p>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6 border-2 border-[#FFD700] hover:border-[#00D4AA] transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-6 h-6 text-[#FFD700]" />
                                <h4 className="text-lg font-bold text-[#FFD700]">Email Follow-Up</h4>
                            </div>
                            <p className="text-white/80 text-sm">Send personalized emails within 24 hours of missed calls. Include property-specific details to demonstrate legitimacy. Use compelling subject lines that reference the property address.</p>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6 border-2 border-[#5dade2] hover:border-[#FFD700] transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <MessageSquare className="w-6 h-6 text-[#5dade2]" />
                                <h4 className="text-lg font-bold text-[#5dade2]">Text Messaging</h4>
                            </div>
                            <p className="text-white/80 text-sm">Use SMS sparingly for callback requests or appointment confirmations. Keep messages brief and professional. Always include your name and company for compliance.</p>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6 border-2 border-[#FF6B35] hover:border-[#00D4AA] transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <Send className="w-6 h-6 text-[#FF6B35]" />
                                <h4 className="text-lg font-bold text-[#FF6B35]">Direct Mail</h4>
                            </div>
                            <p className="text-white/80 text-sm">For high-value prospects, send personalized postcards or letters to reinforce your digital outreach efforts. Include your photo and local market information.</p>
                        </div>
                    </div>

                    <h4 className="text-2xl font-bold text-[#FFD700] mb-6">Channel Performance Metrics</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white/10 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-[#00D4AA]/20">
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Channel</th>
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Response Rate</th>
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Conversion Rate</th>
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Best Use Case</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Phone Calls</td>
                                    <td className="p-4">15-25%</td>
                                    <td className="p-4">2-4%</td>
                                    <td className="p-4">Immediate qualification</td>
                                </tr>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Email</td>
                                    <td className="p-4">8-15%</td>
                                    <td className="p-4">0.5-1.5%</td>
                                    <td className="p-4">Detailed information sharing</td>
                                </tr>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Text Messages</td>
                                    <td className="p-4">20-35%</td>
                                    <td className="p-4">1-2%</td>
                                    <td className="p-4">Appointment setting</td>
                                </tr>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Direct Mail</td>
                                    <td className="p-4">2-5%</td>
                                    <td className="p-4">0.2-0.8%</td>
                                    <td className="p-4">Brand reinforcement</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold">Multi-Channel</td>
                                    <td className="p-4 font-bold text-green-400">35-50%</td>
                                    <td className="p-4 font-bold text-green-400">4-8%</td>
                                    <td className="p-4 font-bold">Maximum coverage</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Quiz 2 */}
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">🧠 Knowledge Check: Multi-Channel Strategy</h3>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">2. According to the performance data, which single channel has the highest response rate?</h4>
                        <div className="space-y-3">
                            {[
                                'Phone Calls',
                                'Email',
                                'Text Messages',
                                'Direct Mail'
                            ].map((option, index) => (
                                <label key={index} className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all bg-white/5 border-2 border-transparent hover:bg-white/10">
                                    <input
                                        type="radio"
                                        name="quiz2_q1"
                                        value={String.fromCharCode(65 + index)}
                                        onChange={() => handleAnswerSelect(2, 1, String.fromCharCode(65 + index))}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-white">{String.fromCharCode(65 + index)}. {option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => handleQuizSubmit(2)}
                        className="w-full bg-[#00D4AA] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-[#00B894] transition-colors"
                    >
                        Check Answer
                    </button>

                    {showResults[2] && (
                        <div className="bg-white/10 rounded-xl p-6 text-center">
                            <div className="text-2xl font-bold text-white mb-2">
                                {quizScore >= 1 ? 'Correct!' : 'Try Again'}
                            </div>
                            <p className="text-white/80">
                                Text messages have the highest single-channel response rate at 20-35%, likely due to their immediate and personal nature.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Timing Strategy */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Optimal Contact Timing</h3>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <p className="text-white/80 mb-6">
                        When you contact skip traced leads can be as important as how you contact them. Here's the proven timing sequence based on industry data and testing:
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                            <div className="bg-[#00D4AA] text-white px-4 py-2 rounded-lg font-bold min-w-[80px] text-center">Day 1</div>
                            <div className="text-white">Initial phone call attempt (10-11 AM or 2-4 PM) + immediate email if no answer</div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                            <div className="bg-[#00D4AA] text-white px-4 py-2 rounded-lg font-bold min-w-[80px] text-center">Day 2</div>
                            <div className="text-white">Second phone call attempt (different time slot) + voicemail if available</div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                            <div className="bg-[#00D4AA] text-white px-4 py-2 rounded-lg font-bold min-w-[80px] text-center">Day 4</div>
                            <div className="text-white">Third phone call + follow-up email with different messaging angle</div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                            <div className="bg-[#00D4AA] text-white px-4 py-2 rounded-lg font-bold min-w-[80px] text-center">Day 7</div>
                            <div className="text-white">Fourth phone attempt + text message (if compliant)</div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                            <div className="bg-[#00D4AA] text-white px-4 py-2 rounded-lg font-bold min-w-[80px] text-center">Day 14</div>
                            <div className="text-white">Final phone attempt + market update email</div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                            <div className="bg-[#00D4AA] text-white px-4 py-2 rounded-lg font-bold min-w-[80px] text-center">Day 30</div>
                            <div className="text-white">Direct mail piece (high-value leads only)</div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                            <div className="bg-[#00D4AA] text-white px-4 py-2 rounded-lg font-bold min-w-[80px] text-center">Day 90</div>
                            <div className="text-white">Move to long-term nurture sequence</div>
                        </div>
                    </div>

                    <h4 className="text-2xl font-bold text-[#FFD700] mb-4">Best Times to Call by Day</h4>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span><strong>Monday:</strong> Avoid 9-10 AM (back-to-work stress). Best: 2-4 PM</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span><strong>Tuesday-Thursday:</strong> Prime calling days. Best: 10-11 AM and 2-4 PM</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span><strong>Friday:</strong> Morning only (8-11 AM). Avoid afternoons</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span><strong>Saturday:</strong> Limited success. Try 10 AM-2 PM for residential properties</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span><strong>Sunday:</strong> Generally avoid, except for urgent situations</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Script Development */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Proven Scripts and Templates</h3>
                <div className="space-y-8">
                    <div className="bg-gradient-to-r from-[#FF6B35]/20 to-[#e67e22]/20 rounded-2xl p-8 border border-[#FF6B35]/30">
                        <h4 className="text-2xl font-bold text-[#FF6B35] mb-4">Opening Phone Script - Pattern Interrupt</h4>
                        <div className="bg-white/10 rounded-xl p-6 border-l-4 border-[#FFD700] italic">
                            "Hi [Name], this is [Your Name] with [Company]. I hope I'm not catching you at a bad time. I'm calling about your property at [Address] - I know this might seem random, but I work with property owners in [Area] and I wanted to see if you'd be open to exploring some options. Do you have just a minute to chat?"
                        </div>
                        <p className="text-white/80 mt-4"><strong>Why it works:</strong> Acknowledges the unexpectedness, shows specific knowledge, and asks for permission.</p>
                    </div>

                    <div className="bg-gradient-to-r from-[#FF6B35]/20 to-[#e67e22]/20 rounded-2xl p-8 border border-[#FF6B35]/30">
                        <h4 className="text-2xl font-bold text-[#FF6B35] mb-4">Voicemail Script - Curiosity Hook</h4>
                        <div className="bg-white/10 rounded-xl p-6 border-l-4 border-[#FFD700] italic">
                            "Hi [Name], this is [Your Name] with [Company]. I'm calling about your property at [Address] in [City]. I've been working with property owners in your area and I came across some information about your property that I thought you'd find interesting. My direct number is [Phone]. That's [Phone]. I'll try you again tomorrow, but feel free to call me back if you'd like to hear what I found. Thanks!"
                        </div>
                        <p className="text-white/80 mt-4"><strong>Why it works:</strong> Creates curiosity without being pushy, provides clear callback information.</p>
                    </div>

                    <div className="bg-gradient-to-r from-[#FF6B35]/20 to-[#e67e22]/20 rounded-2xl p-8 border border-[#FF6B35]/30">
                        <h4 className="text-2xl font-bold text-[#FF6B35] mb-4">Follow-Up Email Template - Value First</h4>
                        <div className="bg-white/10 rounded-xl p-6 border-l-4 border-[#FFD700]">
                            <div className="space-y-2">
                                <p><strong>Subject:</strong> Market update for your [City] property at [Street Address]</p>
                                <p>Hi [Name],</p>
                                <p>I tried reaching you about your property at [Full Address]. I understand you're probably busy, so I wanted to share some recent market activity in your neighborhood that might interest you.</p>
                                <p>In the past 90 days, [specific local market data]. Your property appears to be [specific observation about the property].</p>
                                <p>We work with property owners in [Area] and help them understand their options - whether that's getting a market analysis, connecting with qualified buyers, or exploring other opportunities.</p>
                                <p>Would you be interested in a brief conversation? You can reach me at [Phone] or simply reply to this email.</p>
                                <p>Best regards,<br />[Your Name]<br />[Title and Company]</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#FF6B35]/20 to-[#e67e22]/20 rounded-2xl p-8 border border-[#FF6B35]/30">
                        <h4 className="text-2xl font-bold text-[#FF6B35] mb-4">Text Message Template - Professional and Brief</h4>
                        <div className="bg-white/10 rounded-xl p-6 border-l-4 border-[#FFD700] italic">
                            "Hi [Name], this is [Your Name] from [Company]. I left you a voicemail about your [City] property. Would you prefer I call back at a different time? Text STOP to opt out. Thanks!"
                        </div>
                        <p className="text-white/80 mt-4"><strong>Compliance Note:</strong> Always include opt-out instructions and company identification.</p>
                    </div>
                </div>
            </div>

            {/* Performance Tracking */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Campaign Performance Tracking</h3>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <p className="text-white/80 mb-6">
                        Successful outreach requires systematic tracking and optimization. Here are the key metrics to monitor:
                    </p>

                    <h4 className="text-2xl font-bold text-[#FFD700] mb-6">Essential KPIs</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white/10 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-[#00D4AA]/20">
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Metric</th>
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Target Range</th>
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">How to Calculate</th>
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Optimization Tip</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Contact Rate</td>
                                    <td className="p-4">25-40%</td>
                                    <td className="p-4">Conversations / Attempts</td>
                                    <td className="p-4">Vary call times and days</td>
                                </tr>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Interest Rate</td>
                                    <td className="p-4">15-25%</td>
                                    <td className="p-4">Interested Leads / Contacts</td>
                                    <td className="p-4">Improve script personalization</td>
                                </tr>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Appointment Rate</td>
                                    <td className="p-4">40-60%</td>
                                    <td className="p-4">Appointments / Interested</td>
                                    <td className="p-4">Streamline scheduling process</td>
                                </tr>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Conversion Rate</td>
                                    <td className="p-4">4-8%</td>
                                    <td className="p-4">Deals / Total Leads</td>
                                    <td className="p-4">Focus on lead quality</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Cost Per Lead</td>
                                    <td className="p-4">$15-50</td>
                                    <td className="p-4">Total Cost / Leads Generated</td>
                                    <td className="p-4">Optimize channel mix</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Success Box */}
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-400/30">
                <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-400 mb-4">Module Complete!</h3>
                    <p className="text-green-200 text-lg">
                        You've mastered multi-channel outreach strategies and campaign optimization. Ready to move on to compliance and legal considerations?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SkipTracingModule3;
