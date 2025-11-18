import React, { useState } from 'react';

const NegotiationModule6 = () => {
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 1,
            question: "What is the most important factor in recognizing buying signals?",
            options: [
                "The other party's tone of voice",
                "Their body language and non-verbal cues",
                "How much they talk",
                "Their initial asking price"
            ],
            correct: 1
        },
        {
            id: 2,
            question: "Which closing technique is most effective for hesitant buyers?",
            options: [
                "The assumptive close",
                "The alternative choice close",
                "The urgency close",
                "The trial close"
            ],
            correct: 1
        },
        {
            id: 3,
            question: "What is the key to creating ethical urgency?",
            options: [
                "Making false claims about limited time",
                "Using genuine market conditions and real deadlines",
                "Threatening to walk away immediately",
                "Raising the price to create scarcity"
            ],
            correct: 1
        },
        {
            id: 4,
            question: "When should you use the 'now or never' close?",
            options: [
                "When you're frustrated with the other party",
                "When you have genuine time constraints and limited alternatives",
                "As your first closing attempt",
                "When you want to pressure them into a bad deal"
            ],
            correct: 1
        },
        {
            id: 5,
            question: "What is the most important element of successful closing?",
            options: [
                "Being the most aggressive negotiator",
                "Understanding the other party's needs and addressing them",
                "Having the lowest price",
                "Using the most closing techniques"
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
                    <h1 className="text-3xl font-bold text-[#00D4AA] mb-4">Module 6: Advanced Closing Techniques</h1>
                    <p className="text-white/90 mb-4">Recognize buying signals, create urgency ethically, and use proven closing techniques to secure agreements and move to contract.</p>
                    <div className="flex items-center gap-4 text-sm text-white/70">
                        <span>🕒 35 minutes</span>
                        <span>📚 Advanced Level</span>
                    </div>
                </div>

                {/* Learning Objectives */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Learning Objectives</h2>
                    <p className="text-white/90 mb-4">By the end of this module, you will be able to:</p>
                    <ul className="text-white/80 space-y-2 ml-6">
                        <li>• Recognize buying signals and readiness indicators</li>
                        <li>• Use proven closing techniques effectively</li>
                        <li>• Create ethical urgency without manipulation</li>
                        <li>• Handle last-minute objections and concerns</li>
                        <li>• Move from agreement to signed contracts</li>
                        <li>• Build momentum toward successful closings</li>
                        <li>• Maintain relationships throughout the closing process</li>
                    </ul>
                </div>

                {/* Recognizing Buying Signals */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Recognizing Buying Signals</h2>
                    <p className="text-white/90 mb-4">
                        Buying signals are verbal and non-verbal cues that indicate the other party is ready to move forward. Recognizing these signals helps you time your closing attempts for maximum effectiveness.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-[#FFD700] mb-3">Verbal Buying Signals</h3>
                            <div className="space-y-3">
                                {[
                                    { signal: "Asking About Next Steps", example: "\"What happens after we agree?\"" },
                                    { signal: "Timeline Questions", example: "\"How quickly can we close?\"" },
                                    { signal: "Specific Details", example: "\"What are the exact terms?\"" },
                                    { signal: "Implementation Questions", example: "\"How do we get started?\"" },
                                    { signal: "Conditional Agreement", example: "\"If we can work out X, then...\"" },
                                    { signal: "Reference to Others", example: "\"I need to check with my partner\"" }
                                ].map((item, index) => (
                                    <div key={index} className="bg-green-500/20 border border-green-500 rounded-lg p-3">
                                        <div className="font-semibold text-green-400 mb-1">{item.signal}</div>
                                        <div className="text-white/80 text-sm italic">"{item.example}"</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-[#FFD700] mb-3">Non-Verbal Buying Signals</h3>
                            <div className="space-y-3">
                                {[
                                    { signal: "Leaning Forward", meaning: "Increased interest and engagement" },
                                    { signal: "Nodding Agreement", meaning: "Understanding and acceptance" },
                                    { signal: "Relaxed Posture", meaning: "Comfort with the proposal" },
                                    { signal: "Eye Contact", meaning: "Attention and focus" },
                                    { signal: "Taking Notes", meaning: "Serious consideration" },
                                    { signal: "Asking for Materials", meaning: "Wanting to review details" }
                                ].map((item, index) => (
                                    <div key={index} className="bg-blue-500/20 border border-blue-500 rounded-lg p-3">
                                        <div className="font-semibold text-blue-400 mb-1">{item.signal}</div>
                                        <div className="text-white/80 text-sm">{item.meaning}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Proven Closing Techniques */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Proven Closing Techniques</h2>
                    <p className="text-white/90 mb-4">These techniques help you move from discussion to agreement. Use them naturally and ethically.</p>

                    <div className="space-y-4">
                        {[
                            {
                                technique: "The Assumptive Close",
                                description: "Act as if the decision has been made and move to next steps",
                                example: "Great! So once we get the inspection scheduled, we can move forward with the financing. When would you like to start that process?",
                                when: "When you've addressed their concerns and they seem ready",
                                effectiveness: "High - works well with agreeable personalities"
                            },
                            {
                                technique: "The Alternative Choice Close",
                                description: "Present two positive options and let them choose",
                                example: "Would you prefer to close on the 15th or the 22nd? Both work well for the timeline we discussed.",
                                when: "When they're ready to move forward but need help deciding",
                                effectiveness: "Very High - reduces decision pressure"
                            },
                            {
                                technique: "The Trial Close",
                                description: "Test their readiness with a soft closing question",
                                example: "If we can work out the financing details, does this sound like something you'd be interested in moving forward with?",
                                when: "When you're unsure if they're ready to commit",
                                effectiveness: "High - helps gauge readiness without pressure"
                            },
                            {
                                technique: "The Summary Close",
                                description: "Summarize benefits and ask for agreement",
                                example: "So we've agreed on the price, the timeline works for both of us, and the terms address your main concerns. Does this sound like a deal we can both be happy with?",
                                when: "When you've covered all the main points",
                                effectiveness: "High - reinforces value and gets confirmation"
                            },
                            {
                                technique: "The Urgency Close",
                                description: "Create legitimate urgency based on real factors",
                                example: "I have another showing scheduled for tomorrow, and the seller is expecting multiple offers. If you want to secure this property, we should move quickly.",
                                when: "When there are genuine time constraints or competition",
                                effectiveness: "Medium - only use when truly urgent"
                            },
                            {
                                technique: "The Question Close",
                                description: "Ask a question that implies agreement",
                                example: "What would you like to do next to get this started?",
                                when: "When they're clearly interested but haven't committed",
                                effectiveness: "High - puts the ball in their court naturally"
                            }
                        ].map((technique, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{technique.technique}</h4>
                                <p className="text-white/90 mb-2">{technique.description}</p>

                                <div className="bg-white/10 rounded-lg p-3 mb-2">
                                    <strong className="text-white/90">Example:</strong>
                                    <p className="text-white/80 italic mt-1">"{technique.example}"</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <strong className="text-white/90">Best used when:</strong>
                                        <p className="text-white/80">{technique.when}</p>
                                    </div>
                                    <div>
                                        <strong className="text-white/90">Effectiveness:</strong>
                                        <p className="text-white/80">{technique.effectiveness}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Creating Ethical Urgency */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Creating Ethical Urgency</h2>
                    <p className="text-white/90 mb-4">Urgency can be a powerful motivator, but it must be genuine and ethical. Here's how to create legitimate urgency without manipulation.</p>

                    <div className="space-y-4">
                        {[
                            {
                                source: "Market Conditions",
                                description: "Use real market data to show timing importance",
                                examples: [
                                    "Interest rates are expected to rise next month",
                                    "Inventory is at a 5-year low in this area",
                                    "Similar properties are selling 20% above asking",
                                    "Average days on market is down 30% this quarter"
                                ],
                                ethical: "Always use accurate, current market data"
                            },
                            {
                                source: "Personal Deadlines",
                                description: "Genuine time constraints that affect the deal",
                                examples: [
                                    "Your pre-approval expires in 30 days",
                                    "You have a job relocation deadline",
                                    "Tax benefits expire at year-end",
                                    "Your current lease expires next month"
                                ],
                                ethical: "Only use real, verifiable deadlines"
                            },
                            {
                                source: "Competition",
                                description: "Legitimate competition for the same opportunity",
                                examples: [
                                    "Multiple offers expected by Friday",
                                    "Other investors are actively looking",
                                    "Seller has scheduled additional showings",
                                    "Property is under contract with backup offers"
                                ],
                                ethical: "Only mention if competition is real and verifiable"
                            },
                            {
                                source: "Limited Opportunities",
                                description: "Genuine scarcity of similar opportunities",
                                examples: [
                                    "Only 3 properties in this price range available",
                                    "Seller financing opportunities are rare",
                                    "This type of property rarely comes to market",
                                    "Limited time for this specific deal structure"
                                ],
                                ethical: "Base on actual market conditions, not manufactured scarcity"
                            }
                        ].map((urgency, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{urgency.source}</h4>
                                <p className="text-white/90 mb-3">{urgency.description}</p>

                                <div className="mb-3">
                                    <strong className="text-white/90">Examples:</strong>
                                    <ul className="text-white/80 text-sm space-y-1 ml-4 mt-1">
                                        {urgency.examples.map((example, exampleIndex) => (
                                            <li key={exampleIndex}>• {example}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-2">
                                    <strong className="text-yellow-400 text-sm">Ethical Guideline:</strong>
                                    <p className="text-white/80 text-sm mt-1">{urgency.ethical}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-red-500/20 border-2 border-red-500 rounded-lg p-4 mt-6">
                        <h4 className="text-lg font-bold text-red-400 mb-2">⚠️ Unethical Urgency Tactics to Avoid</h4>
                        <ul className="text-white/90 space-y-1 ml-4">
                            <li>• False claims about limited time or availability</li>
                            <li>• Creating artificial competition or pressure</li>
                            <li>• Using high-pressure tactics to force quick decisions</li>
                            <li>• Misrepresenting market conditions or data</li>
                            <li>• Threatening to walk away unless they decide immediately</li>
                        </ul>
                    </div>
                </div>

                {/* Handling Last-Minute Objections */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Handling Last-Minute Objections</h2>
                    <p className="text-white/90 mb-4">Even when you're ready to close, new objections can arise. Here's how to handle them effectively.</p>

                    <div className="space-y-4">
                        {[
                            {
                                objection: "Price Objection at Closing",
                                response: "I understand your concern about the price. Let me remind you of the value we've discussed - the recent improvements, the prime location, and the favorable financing terms. The total cost of ownership is actually lower than comparable properties.",
                                technique: "Reinforce value and benefits already discussed"
                            },
                            {
                                objection: "Timing Concerns",
                                response: "I can appreciate wanting more time to think it over. However, we've already addressed your main concerns, and the market conditions we discussed are still valid. What specific aspect would you like to consider further?",
                                technique: "Acknowledge but redirect to specific concerns"
                            },
                            {
                                objection: "Need to Consult Others",
                                response: "That's smart to get input from important people. What questions do you think they'll have? I'd be happy to provide any additional information that would help with that conversation.",
                                technique: "Help them prepare for the conversation"
                            },
                            {
                                objection: "Cold Feet",
                                response: "It's natural to feel nervous about a big decision. Let's review what we've agreed on and why this makes sense for your goals. What's making you feel uncertain?",
                                technique: "Acknowledge emotions and address specific concerns"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <div className="mb-3">
                                    <strong className="text-red-400">Common Objection:</strong>
                                    <p className="text-white/90 italic">"{item.objection}"</p>
                                </div>
                                <div className="mb-3">
                                    <strong className="text-green-400">Response:</strong>
                                    <p className="text-white/90 italic">"{item.response}"</p>
                                </div>
                                <div className="text-white/80 text-sm">
                                    <strong>Technique:</strong> {item.technique}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Moving to Contract */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Moving from Agreement to Contract</h2>
                    <p className="text-white/90 mb-4">Once you have agreement, it's crucial to move quickly to formalize the deal and prevent it from falling apart.</p>

                    <div className="space-y-4">
                        {[
                            {
                                step: "Immediate Documentation",
                                description: "Document the key terms immediately",
                                actions: [
                                    "Write down all agreed-upon terms",
                                    "Have both parties initial the summary",
                                    "Take photos of any handshake agreements",
                                    "Send follow-up email confirming terms"
                                ]
                            },
                            {
                                step: "Next Steps Planning",
                                description: "Create clear timeline and responsibilities",
                                actions: [
                                    "Schedule inspection within 48 hours",
                                    "Set financing application deadline",
                                    "Coordinate with attorneys and agents",
                                    "Establish communication protocols"
                                ]
                            },
                            {
                                step: "Momentum Maintenance",
                                description: "Keep the deal moving forward",
                                actions: [
                                    "Regular check-ins and updates",
                                    "Address any new concerns immediately",
                                    "Provide progress reports",
                                    "Celebrate small wins and milestones"
                                ]
                            },
                            {
                                step: "Relationship Building",
                                description: "Strengthen the relationship during the process",
                                actions: [
                                    "Maintain positive communication",
                                    "Be responsive to questions",
                                    "Show appreciation for their business",
                                    "Look for ways to add value"
                                ]
                            }
                        ].map((step, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{step.step}</h4>
                                <p className="text-white/90 mb-3">{step.description}</p>
                                <ul className="text-white/80 text-sm space-y-1 ml-4">
                                    {step.actions.map((action, actionIndex) => (
                                        <li key={actionIndex}>• {action}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quiz Section */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Knowledge Check</h2>
                    <p className="text-white/90 mb-6">Test your understanding of advanced closing techniques:</p>

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
                                    {score.percentage >= 80 ? "Excellent! You've mastered closing techniques." :
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
                    <p className="text-white/90 mb-4">You've now mastered the art of advanced closing techniques:</p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { title: "Buying Signals", desc: "Recognizing verbal and non-verbal cues that indicate readiness to close." },
                            { title: "Closing Techniques", desc: "Proven methods for moving from discussion to agreement." },
                            { title: "Ethical Urgency", desc: "Creating legitimate urgency without manipulation or pressure." },
                            { title: "Last-Minute Objections", desc: "Handling final concerns and maintaining momentum." },
                            { title: "Contract Process", desc: "Moving from agreement to signed contracts efficiently." },
                            { title: "Relationship Building", desc: "Maintaining positive relationships throughout the closing process." }
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
                            Great closers are great listeners. When you can read buying signals, use appropriate closing techniques, and create genuine urgency, you can guide negotiations to successful conclusions while building stronger relationships for future deals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NegotiationModule6;
