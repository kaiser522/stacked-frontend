import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Target, Search, Users, Shield, TrendingUp, Clock, Star } from 'lucide-react';

const SkipTracingModule2 = () => {
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
            2: { 1: 'c', 2: 'c', 3: 'b' },
            3: { 1: 'b', 2: 'c', 3: 'a' },
            4: { 1: 'b', 2: 'c', 3: 'c' },
            final: { 1: 'b', 2: 'b', 3: 'c', 4: 'c', 5: 'c' }
        };

        let score = 0;
        const totalQuestions = quizNumber === 'final' ? 5 : 3;

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
                            <span>Understanding skip trace report structure and data interpretation</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Evaluating data quality and confidence scores</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Lead prioritization and organization strategies</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Quality control and common mistakes to avoid</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Advanced data analysis techniques</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Building systematic lead management processes</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 1: Understanding Skip Trace Reports */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Section 1: Understanding Skip Trace Reports</h3>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20 mb-8">
                    <p className="text-white/80 mb-6">
                        Once you submit properties for skip tracing, you'll receive detailed reports with various data points and confidence scores. Understanding how to read and interpret these reports is crucial for successful outreach.
                    </p>

                    <h4 className="text-2xl font-bold text-[#FFD700] mb-4">Typical Skip Trace Report Structure</h4>

                    <div className="bg-white/10 rounded-xl p-6 mb-6">
                        <h5 className="text-xl font-bold text-[#00D4AA] mb-4">Header Information</h5>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span><strong>Subject Information:</strong> Name, age range, aliases</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span><strong>Search Criteria:</strong> Property address, last known information</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span><strong>Report Date:</strong> When the search was completed</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span><strong>Overall Confidence Score:</strong> Summary assessment of data quality</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span><strong>Records Found:</strong> Total number of data points discovered</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-[#00D4AA]/20 to-[#00B894]/20 rounded-xl p-6 border border-[#00D4AA]/30">
                        <h5 className="text-xl font-bold text-[#00D4AA] mb-4">📋 Sample Report Header</h5>
                        <div className="space-y-2">
                            <p><strong>Subject:</strong> Jennifer Marie Rodriguez (Age: 42-47)</p>
                            <p><strong>Property:</strong> 2847 Pine Valley Drive, Austin, TX 78745</p>
                            <p><strong>Search Date:</strong> March 15, 2025</p>
                            <p><strong>Overall Confidence:</strong> 78% - High Quality Data</p>
                            <p><strong>Total Records:</strong> 23 data points found</p>
                        </div>
                    </div>
                </div>

                {/* Contact Information Table */}
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <h4 className="text-2xl font-bold text-[#FFD700] mb-6">Contact Information Section</h4>
                    <p className="text-white/80 mb-6">This is typically the most important section for real estate investors:</p>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white/10 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-[#00D4AA]/20">
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Contact Type</th>
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Information</th>
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Confidence</th>
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Last Verified</th>
                                    <th className="p-4 text-left text-[#00D4AA] font-bold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Primary Phone</td>
                                    <td className="p-4">(512) 555-0123</td>
                                    <td className="p-4 text-green-400 font-bold">92%</td>
                                    <td className="p-4">Feb 2025</td>
                                    <td className="p-4">Active - Mobile</td>
                                </tr>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Secondary Phone</td>
                                    <td className="p-4">(512) 555-0456</td>
                                    <td className="p-4 text-yellow-400 font-bold">67%</td>
                                    <td className="p-4">Dec 2024</td>
                                    <td className="p-4">Landline</td>
                                </tr>
                                <tr className="border-b border-white/20">
                                    <td className="p-4">Email</td>
                                    <td className="p-4">j.rodriguez.tx@gmail.com</td>
                                    <td className="p-4 text-green-400 font-bold">85%</td>
                                    <td className="p-4">Jan 2025</td>
                                    <td className="p-4">Active</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Current Address</td>
                                    <td className="p-4">1429 Oak Hill Blvd, Austin, TX</td>
                                    <td className="p-4 text-green-400 font-bold">89%</td>
                                    <td className="p-4">Mar 2025</td>
                                    <td className="p-4">Homeowner</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Quiz 1 */}
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">🧠 Section 1 Quiz</h3>
                <p className="text-white/70 mb-6">Test your understanding of skip trace report structure</p>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">1. What is typically the most important section of a skip trace report for real estate investors?</h4>
                        <div className="space-y-3">
                            {['Background data section', 'Contact information section', 'Source information section', 'Demographics section'].map((option, index) => (
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
                        <h4 className="text-lg font-semibold text-white mb-4">2. What does it mean when data is marked as "Verified" in a skip trace report?</h4>
                        <div className="space-y-3">
                            {['One source confirms the information', 'Two sources confirm the information', 'Three or more sources confirm the information', 'The information was manually checked'].map((option, index) => (
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
                        <h4 className="text-lg font-semibold text-white mb-4">3. Which element is most important when evaluating phone numbers in a skip trace report?</h4>
                        <div className="space-y-3">
                            {['The area code', 'The length of the number', 'Confidence score and verification date', 'Whether it\'s a business number'].map((option, index) => (
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
                                {quizScore >= 2 ? 'Great Job!' : 'Review and Try Again'}
                            </div>
                            <p className="text-white/80">
                                {quizScore >= 2
                                    ? 'You understand the fundamentals of skip trace reports.'
                                    : 'Review the material and try again.'
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Section 2: Evaluating Data Quality */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Section 2: Evaluating Data Quality and Confidence Scores</h3>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <p className="text-white/80 mb-6">
                        Not all skip trace data is equally reliable. Learning to evaluate data quality will help you prioritize your efforts and achieve higher success rates.
                    </p>

                    <h4 className="text-2xl font-bold text-[#FFD700] mb-6">Understanding Confidence Score Methodology</h4>
                    <p className="text-white/80 mb-6">Confidence scores are calculated based on multiple factors:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/10 rounded-xl p-6 border-2 border-[#00D4AA]">
                            <div className="flex items-center gap-3 mb-4">
                                <h5 className="text-xl font-bold text-[#00D4AA]">Excellent (85-100%)</h5>
                                <span className="bg-[#00D4AA] text-white px-3 py-1 rounded-full text-sm font-bold">Priority A</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Action:</strong> Call immediately</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Success Rate:</strong> 15-30%</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Timeline:</strong> Within 2 hours</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Method:</strong> Phone first, email backup</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6 border-2 border-[#FFD700]">
                            <div className="flex items-center gap-3 mb-4">
                                <h5 className="text-xl font-bold text-[#FFD700]">Good (70-84%)</h5>
                                <span className="bg-[#FFD700] text-[#1e3a5f] px-3 py-1 rounded-full text-sm font-bold">Priority B</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Action:</strong> Call within 24 hours</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Success Rate:</strong> 10-20%</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Timeline:</strong> Same or next day</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Method:</strong> Phone and email</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/10 rounded-xl p-6 border-2 border-[#FF6B35]">
                            <h5 className="text-xl font-bold text-[#FF6B35] mb-4">❌ Phone Number Red Flags</h5>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Disconnected or non-working numbers</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Google Voice or VOIP services</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Business lines instead of personal</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Numbers with wrong area codes</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Recently ported numbers</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Sequential or fake-looking patterns</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6 border-2 border-[#00D4AA]">
                            <h5 className="text-xl font-bold text-[#00D4AA] mb-4">✅ Quality Indicators</h5>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Multiple database confirmations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Recent verification dates</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Cross-referenced sources</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Active line status</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Consistent data patterns</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span>Geographic alignment</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Lead Prioritization */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Section 3: Lead Prioritization and Organization</h3>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                    <p className="text-white/80 mb-6">
                        With skip trace data in hand, organizing and prioritizing your leads systematically is crucial for maximizing your time and conversion rates.
                    </p>

                    <h4 className="text-2xl font-bold text-[#FFD700] mb-6">The ABCD Lead Classification System</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/10 rounded-xl p-6 border-2 border-[#00D4AA]">
                            <h5 className="text-xl font-bold text-[#00D4AA] mb-4">A-Tier Leads (85-100%)</h5>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Contact Window:</strong> Within 2-4 hours</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Call Attempts:</strong> 5-7 attempts over 3 days</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Expected Conversion:</strong> 15-30%</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Methods:</strong> Phone → Email → Text → Mail</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6 border-2 border-[#FFD700]">
                            <h5 className="text-xl font-bold text-[#FFD700] mb-4">B-Tier Leads (70-84%)</h5>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Contact Window:</strong> Within 24-48 hours</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Call Attempts:</strong> 3-5 attempts over 5 days</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Expected Conversion:</strong> 8-18%</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Methods:</strong> Phone → Email → Mail</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-xl p-6 border border-[#FFD700]/30">
                        <h5 className="text-xl font-bold text-[#FFD700] mb-4">💡 The 10-20-70 Rule</h5>
                        <p className="text-white/80 mb-4">Successful investors typically allocate their calling time as follows:</p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                <span><strong>10% of time</strong> on A-tier leads (highest conversion)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                <span><strong>20% of time</strong> on B-tier leads (good ROI)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                                <span><strong>70% of time</strong> on C & D-tier leads (volume plays)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Success Box */}
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-400/30">
                <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-400 mb-4">Module Complete!</h3>
                    <p className="text-green-200 text-lg">
                        You've mastered skip trace data evaluation and lead prioritization. Ready to move on to outreach strategies?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SkipTracingModule2;
