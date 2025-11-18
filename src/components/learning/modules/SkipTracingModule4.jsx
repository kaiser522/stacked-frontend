import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Target, Search, Users, Shield, TrendingUp, Clock, Star, Scale, FileText, Gavel } from 'lucide-react';

const SkipTracingModule4 = () => {
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
            1: { 1: 'b', 2: 'c', 3: 'c' },
            2: { 1: 'b', 2: 'c' },
            3: { 1: 'b', 2: 'c', 3: 'a' },
            4: { 1: 'b', 2: 'c', 3: 'c' },
            5: { 1: 'b', 2: 'c', 3: 'b' }
        };

        let score = 0;
        const totalQuestions = quizNumber === 2 ? 2 : 3;

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
                            <span>Understanding TCPA compliance and violation penalties</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Do Not Call Registry rules and exemptions</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>State-specific compliance requirements</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Documentation and record-keeping best practices</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Compliance monitoring and audit procedures</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Building a legally compliant skip tracing operation</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 1: TCPA Fundamentals */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Section 1: Understanding TCPA Compliance</h3>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <p className="text-white/80 mb-6">
                        The Telephone Consumer Protection Act (TCPA) is the most critical piece of legislation governing skip trace outreach. Violations can result in $500-$1,500 per call in damages, making compliance essential for your business survival.
                    </p>

                    <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-2xl p-8 border-2 border-red-500/50 mb-8">
                        <div className="text-center">
                            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                            <h4 className="text-2xl font-bold text-red-400 mb-4">CRITICAL WARNING</h4>
                            <p className="text-red-200 text-lg font-semibold">
                                TCPA violations can cost $500-$1,500 PER CALL. A single mistake with 100 calls could cost you $150,000 in damages.
                            </p>
                        </div>
                    </div>

                    <h4 className="text-2xl font-bold text-[#FFD700] mb-6">TCPA Key Provisions for Real Estate Investors</h4>

                    <h5 className="text-xl font-bold text-[#00D4AA] mb-4">Cell Phone Protection Rules</h5>
                    <div className="overflow-x-auto mb-8">
                        <table className="w-full border-collapse bg-white/10 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-[#00D4AA]/20">
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Contact Method</th>
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Consent Required</th>
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Violation Penalty</th>
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Risk Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Manual Dialing to Cell</td>
                                    <td className="p-4">No prior consent required</td>
                                    <td className="p-4 text-green-400 font-bold">Low Risk</td>
                                    <td className="p-4">Permitted</td>
                                </tr>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Autodialer to Cell</td>
                                    <td className="p-4">Express written consent</td>
                                    <td className="p-4 text-red-400 font-bold">$500-$1,500</td>
                                    <td className="p-4">Prohibited</td>
                                </tr>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Pre-recorded Messages</td>
                                    <td className="p-4">Express written consent</td>
                                    <td className="p-4 text-red-400 font-bold">$500-$1,500</td>
                                    <td className="p-4">Prohibited</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Text Messages</td>
                                    <td className="p-4">Express written consent</td>
                                    <td className="p-4 text-red-400 font-bold">$500-$1,500</td>
                                    <td className="p-4">Prohibited</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-xl p-6 border border-[#FFD700]/30">
                        <h5 className="text-xl font-bold text-[#FFD700] mb-4">Safe Harbor: Manual Dialing Only</h5>
                        <p className="text-white/80 mb-4"><strong>The Golden Rule:</strong> For skip traced leads without prior consent, only use manual dialing to cell phones. This means:</p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                <span>One person, one phone, dialing one number at a time</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                <span>No auto-dialers, predictive dialers, or bulk calling systems</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                <span>No pre-recorded voicemails or messages</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                <span>No text messaging without consent</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Quiz 1 */}
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">🧠 Section 1 Quiz</h3>
                <p className="text-white/70 mb-6">Test your understanding of TCPA fundamentals</p>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">1. What is the penalty range for TCPA violations per call?</h4>
                        <div className="space-y-3">
                            {['$100-$300', '$500-$1,500', '$1,000-$5,000', '$50-$200'].map((option, index) => (
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
                        <h4 className="text-lg font-semibold text-white mb-4">2. What type of consent is required to use an auto-dialer on cell phones?</h4>
                        <div className="space-y-3">
                            {['Verbal consent', 'Implied consent', 'Express written consent', 'No consent needed'].map((option, index) => (
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
                        <h4 className="text-lg font-semibold text-white mb-4">3. Which method is TCPA-compliant for contacting skip traced cell phone numbers?</h4>
                        <div className="space-y-3">
                            {['Auto-dialer systems', 'Pre-recorded voicemails', 'Manual dialing only', 'Text messaging'].map((option, index) => (
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
                                    ? 'You understand TCPA compliance requirements.'
                                    : 'Review the material and try again.'
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Section 2: DNC Registry Compliance */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Section 2: Do Not Call Registry Compliance</h3>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <p className="text-white/80 mb-6">
                        The National Do Not Call Registry protects consumers from unwanted telemarketing calls. Real estate investors must understand when and how these rules apply to skip trace outreach.
                    </p>

                    <h4 className="text-2xl font-bold text-[#FFD700] mb-6">DNC Registry Rules</h4>

                    <div className="bg-gradient-to-r from-[#00D4AA]/20 to-[#00B894]/20 rounded-xl p-6 border border-[#00D4AA]/30 mb-8">
                        <h5 className="text-xl font-bold text-[#00D4AA] mb-4">DNC-Compliant Opening Script</h5>
                        <div className="bg-white/10 rounded-lg p-4 italic border-l-4 border-[#FFD700] mb-4">
                            "Hi, this is [Your Name] with [Company Name]. I'm a local real estate professional, and I'm calling specifically about your property at [Property Address]. I have some market information that might be valuable to you as the property owner. Do you have a moment to speak, and would this type of information be helpful to you?"
                        </div>

                        <p className="text-white/80 mb-4"><strong>Key Elements:</strong></p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                                <span>Immediate identification</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                                <span>Property-specific reason</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                                <span>Value proposition (information, not sales)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                                <span>Permission to continue</span>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/10 rounded-xl p-6 border-2 border-green-400">
                            <h5 className="text-xl font-bold text-green-400 mb-4">✅ DNC Exemptions</h5>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Established business relationship (18 months)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Prior written consent</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Inquiry about services (3 months)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Commercial relationship</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6 border-2 border-red-400">
                            <h5 className="text-xl font-bold text-red-400 mb-4">❌ DNC Violations</h5>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Cold calls to DNC numbers without exemption</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Failure to honor opt-out requests</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Not maintaining DNC list</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Improper identification</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quiz 2 */}
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">🧠 Section 2 Quiz</h3>
                <p className="text-white/70 mb-6">Test your understanding of DNC compliance</p>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">1. When can you legally call a number on the DNC registry?</h4>
                        <div className="space-y-3">
                            {[
                                'Never - DNC numbers are always off-limits',
                                'Only with established business relationship or inquiry exception',
                                'Anytime for real estate purposes',
                                'Only on weekends'
                            ].map((option, index) => (
                                <label key={index} className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all bg-white/5 border-2 border-transparent hover:bg-white/10">
                                    <input
                                        type="radio"
                                        name="quiz2_q1"
                                        value={String.fromCharCode(97 + index)}
                                        onChange={() => handleAnswerSelect(2, 1, String.fromCharCode(97 + index))}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-white">{String.fromCharCode(97 + index).toUpperCase()}. {option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">2. How long does an "established business relationship" exemption last?</h4>
                        <div className="space-y-3">
                            {['6 months', '12 months', '18 months', '24 months'].map((option, index) => (
                                <label key={index} className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all bg-white/5 border-2 border-transparent hover:bg-white/10">
                                    <input
                                        type="radio"
                                        name="quiz2_q2"
                                        value={String.fromCharCode(97 + index)}
                                        onChange={() => handleAnswerSelect(2, 2, String.fromCharCode(97 + index))}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-white">{String.fromCharCode(97 + index).toUpperCase()}. {option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => handleQuizSubmit(2)}
                        className="w-full bg-[#00D4AA] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-[#00B894] transition-colors"
                    >
                        Check Answers
                    </button>

                    {showResults[2] && (
                        <div className="bg-white/10 rounded-xl p-6 text-center">
                            <div className="text-2xl font-bold text-white mb-2">
                                {quizScore >= 1 ? 'Correct!' : 'Try Again'}
                            </div>
                            <p className="text-white/80">
                                DNC exemptions allow calls with established business relationships (18 months) or inquiry exceptions (3 months).
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Section 3: State-Specific Compliance */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Section 3: State-Specific Compliance Requirements</h3>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <p className="text-white/80 mb-6">
                        Different states have additional compliance requirements beyond federal TCPA and DNC rules. Understanding these variations is crucial for multi-state operations.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/10 rounded-xl p-6 border-2 border-red-400">
                            <h5 className="text-xl font-bold text-red-400 mb-4">⚠️ High-Risk States</h5>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span><strong>California:</strong> Strictest TCPA enforcement, state DNC registry</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span><strong>Florida:</strong> Aggressive TCPA litigation, treble damages</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span><strong>Illinois:</strong> Biometric privacy laws, strict consent</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span><strong>Texas:</strong> State-specific telemarketing laws</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6 border-2 border-green-400">
                            <h5 className="text-xl font-bold text-green-400 mb-4">✅ Lower-Risk States</h5>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Wyoming:</strong> Minimal additional restrictions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Montana:</strong> Standard federal compliance</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>South Dakota:</strong> Business-friendly regulations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>North Dakota:</strong> Limited state restrictions</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-xl p-6 border border-[#FFD700]/30">
                        <h5 className="text-xl font-bold text-[#FFD700] mb-4">State Compliance Checklist</h5>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                <span>Check state DNC registries before calling</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                <span>Review state-specific telemarketing laws</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                <span>Understand consent requirements by state</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                <span>Document compliance procedures by jurisdiction</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Brain Teaser Challenge */}
            <div className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 rounded-2xl p-8 border-2 border-purple-400/50">
                <div className="text-center mb-8">
                    <Scale className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-purple-400 mb-4">Legal Compliance Brain Teaser</h3>
                    <p className="text-purple-200 text-lg">Test your mastery of complex compliance scenarios with this challenging legal puzzle!</p>
                </div>

                <div className="bg-white/10 rounded-xl p-8 border border-white/20">
                    <h4 className="text-2xl font-bold text-[#FFD700] mb-6">The Multi-State Legal Minefield</h4>
                    <p className="text-white/80 mb-6">
                        <strong>Scenario:</strong> You're a real estate investor who operates across multiple states and just received skip trace data for 500 high-value properties. The leads span California, Florida, Texas, and New York. Here's the complex legal situation you're navigating:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-xl p-6 border border-[#FFD700]/30">
                            <h5 className="text-xl font-bold text-[#FFD700] mb-4">California Leads (125 properties)</h5>
                            <ul className="space-y-2 text-sm">
                                <li>• 85 cell phone numbers (no prior contact)</li>
                                <li>• 40 landline numbers</li>
                                <li>• Average property value: $850,000</li>
                                <li>• 15 numbers on National DNC Registry</li>
                                <li>• Your CRM shows postcards sent 8 months ago</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-xl p-6 border border-[#FFD700]/30">
                            <h5 className="text-xl font-bold text-[#FFD700] mb-4">Florida Leads (150 properties)</h5>
                            <ul className="space-y-2 text-sm">
                                <li>• 120 cell phone numbers</li>
                                <li>• 30 landline numbers</li>
                                <li>• 22 numbers on DNC registries</li>
                                <li>• 5 owners previously inquired 4 months ago</li>
                                <li>• Average property value: $425,000</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-xl p-6 border border-red-400/30 mb-8">
                        <h5 className="text-xl font-bold text-red-400 mb-4">Additional Complications</h5>
                        <ul className="space-y-2 text-sm">
                            <li>• Your assistant wants to use a power dialer for "efficiency"</li>
                            <li>• Marketing software auto-sends texts to mobile numbers</li>
                            <li>• Competitor in Florida sued for $2.3M TCPA violations</li>
                            <li>• One California property owner is a federal judge</li>
                            <li>• Business partner suggests "just calling everyone"</li>
                            <li>• $50K marketing budget, need 10 deals this quarter</li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-[#00D4AA]/20 to-[#00B894]/20 rounded-xl p-6 border border-[#00D4AA]/30">
                        <h5 className="text-xl font-bold text-[#00D4AA] mb-4">Master-Level Questions</h5>
                        <ol className="space-y-2 text-sm">
                            <li>1. How many California numbers can you legally call, and what's your strategy?</li>
                            <li>2. Which Florida leads qualify for DNC exemptions and why?</li>
                            <li>3. Your assistant wants to use a power dialer - what do you tell them?</li>
                            <li>4. How do you prioritize these 275 leads while minimizing legal risk?</li>
                            <li>5. What's your documentation strategy for this multi-state campaign?</li>
                        </ol>
                    </div>
                </div>
            </div>

            {/* Success Box */}
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-400/30">
                <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-400 mb-4">Module Complete!</h3>
                    <p className="text-green-200 text-lg">
                        You've mastered legal compliance requirements and can now build a legally compliant skip tracing operation. Ready to move on to lead conversion strategies?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SkipTracingModule4;
