import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Target, Search, Users, Shield, TrendingUp } from 'lucide-react';

const SkipTracingModule1 = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [quizScore, setQuizScore] = useState(0);

    const quizQuestions = [
        {
            question: "What is the primary purpose of skip tracing in real estate?",
            options: [
                "To find property values",
                "To locate property owners and decision makers",
                "To research market trends",
                "To calculate commissions"
            ],
            correct: 1
        },
        {
            question: "Which of the following is NOT a common skip tracing data source?",
            options: [
                "Property tax records",
                "Social media profiles",
                "Phone books",
                "Court records"
            ],
            correct: 2
        }
    ];

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleSubmitQuiz = () => {
        if (selectedAnswer !== null) {
            setShowResults(true);
            if (selectedAnswer === quizQuestions[0].correct) {
                setQuizScore(1);
            }
        }
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
                            <span>Skip tracing fundamentals and legal compliance</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Data sources and research techniques</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Contact methods and outreach strategies</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Lead qualification and conversion</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Building your skip tracing system</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00D4AA] mt-1 flex-shrink-0" />
                            <span>Measuring success and ROI</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skip Tracing vs Public Records */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Skip Tracing vs. Public Records Research</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/10 rounded-2xl p-8 border-2 border-[#00D4AA]">
                        <h4 className="text-2xl font-bold text-[#00D4AA] mb-6 flex items-center gap-3">
                            <Search className="w-6 h-6" />
                            Skip Tracing
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Finds current contact information</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Locates decision makers</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Verifies property ownership</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Identifies motivation to sell</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-8 border-2 border-[#FF6B35]">
                        <h4 className="text-2xl font-bold text-[#FF6B35] mb-6 flex items-center gap-3">
                            <Users className="w-6 h-6" />
                            Public Records Research
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Property ownership history</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Legal documents and liens</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Property characteristics</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Market value estimates</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Topics */}
            <div>
                <h3 className="text-3xl font-bold text-white mb-8">Key Topics Covered</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                        <div className="w-12 h-12 bg-[#00D4AA] rounded-lg flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">Legal Compliance</h4>
                        <p className="text-white/70">Understanding TCPA, CAN-SPAM, and state regulations for skip tracing activities.</p>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                        <div className="w-12 h-12 bg-[#FF6B35] rounded-lg flex items-center justify-center mb-4">
                            <Search className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">Data Sources</h4>
                        <p className="text-white/70">Property records, social media, phone directories, and professional databases.</p>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                        <div className="w-12 h-12 bg-[#5dade2] rounded-lg flex items-center justify-center mb-4">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">Conversion Strategies</h4>
                        <p className="text-white/70">Turning skip traced leads into qualified prospects and closed deals.</p>
                    </div>
                </div>
            </div>

            {/* Practical Exercise */}
            <div className="bg-gradient-to-r from-[#FF6B35]/20 to-[#e67e22]/20 rounded-2xl p-8 border border-[#FF6B35]/30">
                <h3 className="text-2xl font-bold text-[#FF6B35] mb-6 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6" />
                    Practical Exercise
                </h3>
                <div className="space-y-6">
                    <div className="bg-white/10 rounded-xl p-6">
                        <h4 className="text-xl font-bold text-white mb-4">Step 1: Choose a Property</h4>
                        <p className="text-white/80 mb-4">Select a property from your local MLS or driving for dollars list.</p>
                        <div className="bg-white/5 rounded-lg p-4">
                            <label className="block text-sm text-white/60 mb-2">Property Address:</label>
                            <input
                                type="text"
                                placeholder="Enter property address..."
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
                            />
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                        <h4 className="text-xl font-bold text-white mb-4">Step 2: Research Owner Information</h4>
                        <p className="text-white/80 mb-4">Use public records to find the owner's name and basic information.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-lg p-4">
                                <label className="block text-sm text-white/60 mb-2">Owner Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter owner name..."
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
                                />
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <label className="block text-sm text-white/60 mb-2">Purchase Date:</label>
                                <input
                                    type="date"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                        <h4 className="text-xl font-bold text-white mb-4">Step 3: Skip Trace Contact Info</h4>
                        <p className="text-white/80 mb-4">Find current phone number and email address for the owner.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-lg p-4">
                                <label className="block text-sm text-white/60 mb-2">Phone Number:</label>
                                <input
                                    type="tel"
                                    placeholder="Enter phone number..."
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
                                />
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <label className="block text-sm text-white/60 mb-2">Email Address:</label>
                                <input
                                    type="email"
                                    placeholder="Enter email address..."
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quiz Section */}
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Knowledge Check</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">{quizQuestions[0].question}</h4>
                        <ul className="space-y-3">
                            {quizQuestions[0].options.map((option, index) => (
                                <li
                                    key={index}
                                    className={`p-4 rounded-lg cursor-pointer transition-all ${selectedAnswer === index
                                        ? 'bg-[#00D4AA]/30 border-2 border-[#00D4AA]'
                                        : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                                        }`}
                                    onClick={() => handleAnswerSelect(index)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 ${selectedAnswer === index
                                            ? 'border-[#00D4AA] bg-[#00D4AA]'
                                            : 'border-white/30'
                                            }`}>
                                            {selectedAnswer === index && (
                                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                            )}
                                        </div>
                                        <span className="text-white">{option}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        onClick={handleSubmitQuiz}
                        disabled={selectedAnswer === null}
                        className="w-full bg-[#00D4AA] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-[#00B894] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Answer
                    </button>

                    {showResults && (
                        <div className="bg-white/10 rounded-xl p-6 text-center">
                            <div className="text-2xl font-bold text-white mb-2">
                                {quizScore > 0 ? 'Correct!' : 'Try Again'}
                            </div>
                            <p className="text-white/80">
                                {quizScore > 0
                                    ? 'Great job! You understand the fundamentals of skip tracing.'
                                    : 'Review the material and try again.'
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Success Box */}
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-400/30">
                <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-400 mb-4">Module Complete!</h3>
                    <p className="text-green-200 text-lg">
                        You've mastered the fundamentals of skip tracing. Ready to move on to data sources and research techniques?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SkipTracingModule1;
