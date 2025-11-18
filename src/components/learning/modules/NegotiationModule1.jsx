import React, { useState } from 'react';

const NegotiationModule1 = () => {
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 1,
            question: "What makes real estate negotiations unique compared to other types of negotiations?",
            options: [
                "They only involve price discussions",
                "They involve high-value, emotional decisions with multiple parties",
                "They are always adversarial",
                "They don't require preparation"
            ],
            correct: 1
        },
        {
            id: 2,
            question: "What does it mean to 'focus on interests, not positions' in a negotiation?",
            options: [
                "Stick firmly to your initial offer",
                "Understand the underlying reasons behind what people want",
                "Only negotiate on price",
                "Take a competitive approach"
            ],
            correct: 1
        },
        {
            id: 3,
            question: "Which psychological principle explains why providing a market analysis before making an offer can be effective?",
            options: [
                "Scarcity",
                "Reciprocity",
                "Social Proof",
                "Anchoring"
            ],
            correct: 1
        },
        {
            id: 4,
            question: "What is the most effective negotiation style for complex real estate deals?",
            options: [
                "Competing (Win-Lose)",
                "Accommodating (Lose-Win)",
                "Collaborating (Win-Win)",
                "Compromising (Split the difference)"
            ],
            correct: 2
        },
        {
            id: 5,
            question: "In the POWER framework, what does the 'W' represent?",
            options: [
                "Wait for the other party to make the first move",
                "Work Together to find solutions",
                "Win at all costs",
                "Walk away from difficult negotiations"
            ],
            correct: 1
        }
    ];

    const handleAnswerSelect = (questionId, answerIndex) => {
        setQuizAnswers(prev => ({
            ...prev,
            [questionId]: answerIndex
        }));
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach(q => {
            if (quizAnswers[q.id] === q.correct) {
                correct++;
            }
        });
        return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
    };

    const score = calculateScore();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
                {/* Module Header */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h1 className="text-3xl font-bold text-[#00D4AA] mb-4">Module 1: Negotiation Fundamentals</h1>
                    <p className="text-white/90 mb-4">Master the core principles of negotiation, understand psychological motivations, and learn the foundations of successful real estate deal-making.</p>
                    <div className="flex items-center gap-4 text-sm text-white/70">
                        <span>🕒 45 minutes</span>
                        <span>📚 Advanced Level</span>
                    </div>
                </div>

                {/* Learning Objectives */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Learning Objectives</h2>
                    <p className="text-white/90 mb-4">By the end of this module, you will be able to:</p>
                    <ul className="text-white/80 space-y-2 ml-6">
                        <li>• Understand the fundamental principles of win-win negotiation</li>
                        <li>• Identify the key psychological factors that drive decision-making</li>
                        <li>• Recognize different negotiation styles and adapt accordingly</li>
                        <li>• Apply the core framework of preparation, rapport, and influence</li>
                        <li>• Distinguish between positions and underlying interests</li>
                        <li>• Use basic psychological triggers ethically in negotiations</li>
                        <li>• Set proper expectations and objectives before any negotiation</li>
                    </ul>
                </div>

                {/* What Is Negotiation */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">What Is Negotiation?</h2>
                    <p className="text-white/90 mb-4">
                        Negotiation is the process of reaching a mutually acceptable agreement between parties with different needs, wants, and constraints. In real estate, every transaction involves multiple negotiations - price, terms, contingencies, timelines, and conditions.
                    </p>

                    <h3 className="text-xl font-bold text-[#FFD700] mb-3">The Real Estate Negotiation Landscape</h3>
                    <p className="text-white/90 mb-4">Real estate negotiations are unique because they involve:</p>
                    <ul className="text-white/80 space-y-2 ml-6">
                        <li>• <strong>High-value transactions:</strong> Often the largest financial decision people make</li>
                        <li>• <strong>Emotional attachment:</strong> Properties represent homes, dreams, and security</li>
                        <li>• <strong>Multiple parties:</strong> Buyers, sellers, agents, lenders, inspectors, attorneys</li>
                        <li>• <strong>Complex variables:</strong> Price, financing, contingencies, timing, conditions</li>
                        <li>• <strong>Time pressure:</strong> Market conditions and personal situations create urgency</li>
                    </ul>

                    <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 mt-4">
                        <h4 className="text-lg font-bold text-[#00D4AA] mb-2">Key Insight: Beyond Price</h4>
                        <p className="text-white/90">
                            Most people think negotiation is just about price, but successful real estate negotiations focus on creating value through terms, timing, and conditions that benefit all parties. A skilled negotiator can often get their price by being flexible on other terms.
                        </p>
                    </div>
                </div>

                {/* Five Core Principles */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">The Five Core Principles of Successful Negotiation</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "1. Prepare Thoroughly",
                                description: "Research the property, market conditions, comparable sales, and the other party's situation. Knowledge is power in negotiations, and preparation determines 80% of your success."
                            },
                            {
                                title: "2. Focus on Interests, Not Positions",
                                description: "Understand why people want what they want. A seller demanding $300K might need $280K to pay off debts and moving costs. Focus on solving their underlying problem."
                            },
                            {
                                title: "3. Create Value Before Claiming It",
                                description: "Look for ways to expand the pie before dividing it. Can you offer flexible timing, quick closing, or assumption of repairs to create mutual value?"
                            },
                            {
                                title: "4. Build Rapport and Trust",
                                description: "People do business with people they like and trust. Invest time in building genuine relationships before discussing terms."
                            },
                            {
                                title: "5. Always Have Alternatives",
                                description: "Your negotiating power comes from your ability to walk away. Always have backup options and know your BATNA (Best Alternative to a Negotiated Agreement)."
                            },
                            {
                                title: "6. Communicate with Influence",
                                description: "Use psychological principles like reciprocity, social proof, and scarcity ethically to guide the negotiation toward agreement."
                            }
                        ].map((principle, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{principle.title}</h4>
                                <p className="text-white/80">{principle.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Psychology of Decision Making */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">The Psychology Behind Real Estate Decisions</h2>
                    <p className="text-white/90 mb-4">Understanding how people make decisions gives you a significant advantage in negotiations. Here are the key psychological factors that influence real estate decisions:</p>

                    <h3 className="text-xl font-bold text-[#FFD700] mb-3">Emotional vs. Logical Decision Making</h3>
                    <p className="text-white/90 mb-4">Research shows that people make decisions emotionally and then justify them logically. In real estate:</p>
                    <ul className="text-white/80 space-y-2 ml-6 mb-6">
                        <li>• <strong>Sellers:</strong> Emotional attachment to memories, fear of loss, pride in ownership</li>
                        <li>• <strong>Buyers:</strong> Vision of future lifestyle, safety and security needs, status considerations</li>
                        <li>• <strong>Investors:</strong> Greed and fear cycles, analysis paralysis, confirmation bias</li>
                    </ul>

                    <h3 className="text-xl font-bold text-[#FFD700] mb-3">Key Psychological Triggers</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#00D4AA]/20">
                                    <th className="p-3 text-left text-[#00D4AA] font-bold">Psychological Trigger</th>
                                    <th className="p-3 text-left text-[#00D4AA] font-bold">How It Works</th>
                                    <th className="p-3 text-left text-[#00D4AA] font-bold">Real Estate Application</th>
                                    <th className="p-3 text-left text-[#00D4AA] font-bold">Ethical Usage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        trigger: "Reciprocity",
                                        how: "People feel obligated to return favors",
                                        application: "Provide market analysis or helpful information first",
                                        ethical: "Offer genuine value before asking for anything"
                                    },
                                    {
                                        trigger: "Social Proof",
                                        how: "People follow others' behavior",
                                        application: "\"Other investors have found success with similar properties\"",
                                        ethical: "Use truthful examples and testimonials"
                                    },
                                    {
                                        trigger: "Scarcity",
                                        how: "Limited availability increases perceived value",
                                        application: "Multiple offers, limited time frames",
                                        ethical: "Only use when genuinely true"
                                    },
                                    {
                                        trigger: "Anchoring",
                                        how: "First number influences all subsequent negotiations",
                                        application: "Set initial offer strategically",
                                        ethical: "Base anchors on market data"
                                    },
                                    {
                                        trigger: "Loss Aversion",
                                        how: "Fear of losing is stronger than desire to gain",
                                        application: "Frame in terms of what they might lose",
                                        ethical: "Focus on preventing real losses"
                                    }
                                ].map((row, index) => (
                                    <tr key={index} className="border-b border-white/10">
                                        <td className="p-3 text-white font-semibold">{row.trigger}</td>
                                        <td className="p-3 text-white/80">{row.how}</td>
                                        <td className="p-3 text-white/80">{row.application}</td>
                                        <td className="p-3 text-white/80">{row.ethical}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-red-500/20 border-2 border-red-500 rounded-lg p-4 mt-6">
                        <h4 className="text-lg font-bold text-red-400 mb-2">Ethical Considerations</h4>
                        <p className="text-white/90">
                            These psychological principles should be used to create genuine win-win outcomes, not to manipulate or deceive. Your goal is to help all parties make good decisions, not to trick them into bad ones.
                        </p>
                    </div>
                </div>

                {/* Quiz Section */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Knowledge Check</h2>
                    <p className="text-white/90 mb-6">Test your understanding of negotiation fundamentals:</p>

                    <div className="space-y-6">
                        {questions.map((q, index) => (
                            <div key={q.id} className="bg-white/5 rounded-lg p-4">
                                <h4 className="text-lg font-bold text-[#FFD700] mb-3">{index + 1}. {q.question}</h4>
                                <div className="space-y-2">
                                    {q.options.map((option, optionIndex) => (
                                        <label key={optionIndex} className="flex items-center p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20">
                                            <input
                                                type="radio"
                                                name={`question-${q.id}`}
                                                value={optionIndex}
                                                checked={quizAnswers[q.id] === optionIndex}
                                                onChange={() => handleAnswerSelect(q.id, optionIndex)}
                                                className="mr-3"
                                            />
                                            <span className="text-white">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setShowResults(true)}
                            className="bg-[#00D4AA] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00B894] transition-colors"
                        >
                            Check Answers
                        </button>
                    </div>

                    {showResults && (
                        <div className="mt-6 bg-white/10 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-[#00D4AA] mb-4">Quiz Results</h3>
                            <div className="text-center mb-4">
                                <div className="text-3xl font-bold text-[#00D4AA] mb-2">
                                    {score.correct}/{score.total} ({score.percentage}%)
                                </div>
                                <p className="text-white/80">
                                    {score.percentage >= 80 ? "Excellent! You've mastered the fundamentals." :
                                        score.percentage >= 60 ? "Good work! Review the areas you missed." :
                                            "Review the material and try again."}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {questions.map((q, index) => (
                                    <div key={q.id} className={`p-3 rounded-lg ${quizAnswers[q.id] === q.correct ? 'bg-green-500/20' : 'bg-red-500/20'
                                        }`}>
                                        <div className="font-semibold text-white mb-1">
                                            Question {index + 1}: {quizAnswers[q.id] === q.correct ? '✓ Correct' : '✗ Incorrect'}
                                        </div>
                                        <div className="text-white/80">
                                            <strong>Your answer:</strong> {quizAnswers[q.id] !== undefined ? q.options[quizAnswers[q.id]] : 'Not answered'}<br />
                                            <strong>Correct answer:</strong> {q.options[q.correct]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Module Summary */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Module Summary</h2>
                    <p className="text-white/90 mb-4">You've now mastered the fundamental principles of effective negotiation:</p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { title: "Core Principles Mastered", desc: "Preparation, focusing on interests, creating value, building rapport, and maintaining alternatives." },
                            { title: "Psychology Understanding", desc: "How emotions drive decisions and how to use psychological triggers ethically." },
                            { title: "Style Adaptation", desc: "Recognizing different negotiation styles and adapting your approach accordingly." },
                            { title: "POWER Framework", desc: "A systematic approach to structure any negotiation for maximum success." }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{item.title}</h4>
                                <p className="text-white/80">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 mt-6">
                        <h4 className="text-lg font-bold text-[#00D4AA] mb-2">Key Takeaway</h4>
                        <p className="text-white/90">
                            Successful negotiation is not about winning or losing - it's about creating solutions that work for everyone involved. When you focus on understanding interests and building relationships, better deals naturally follow.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NegotiationModule1;
