import React, { useState } from 'react';

const NegotiationModule3 = () => {
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 1,
            question: "What is the most important element of building rapport in negotiations?",
            options: [
                "Being the most talkative person in the room",
                "Finding genuine common ground and shared interests",
                "Always agreeing with the other party",
                "Showing off your expertise immediately"
            ],
            correct: 1
        },
        {
            id: 2,
            question: "Which communication technique is most effective for understanding the other party's true motivations?",
            options: [
                "Asking leading questions",
                "Using open-ended questions that encourage sharing",
                "Making assumptions based on their appearance",
                "Talking more than listening"
            ],
            correct: 1
        },
        {
            id: 3,
            question: "What does 'mirroring' in negotiation communication refer to?",
            options: [
                "Copying their exact words",
                "Matching their energy level and communication style",
                "Agreeing with everything they say",
                "Using the same negotiation tactics they use"
            ],
            correct: 1
        },
        {
            id: 4,
            question: "Which psychological trigger is most powerful for building trust?",
            options: [
                "Scarcity",
                "Reciprocity",
                "Social proof",
                "Authority"
            ],
            correct: 1
        },
        {
            id: 5,
            question: "What is the best way to handle someone who is being aggressive or hostile?",
            options: [
                "Match their aggression to show strength",
                "Stay calm, acknowledge their concerns, and redirect to interests",
                "Walk away immediately",
                "Threaten to end the negotiation"
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
                    <h1 className="text-3xl font-bold text-[#00D4AA] mb-4">Module 3: Communication & Influence Tactics</h1>
                    <p className="text-white/90 mb-4">Advanced communication strategies, reading body language, building rapport, and using psychological triggers to influence outcomes.</p>
                    <div className="flex items-center gap-4 text-sm text-white/70">
                        <span>🕒 55 minutes</span>
                        <span>📚 Advanced Level</span>
                    </div>
                </div>

                {/* Learning Objectives */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Learning Objectives</h2>
                    <p className="text-white/90 mb-4">By the end of this module, you will be able to:</p>
                    <ul className="text-white/80 space-y-2 ml-6">
                        <li>• Master advanced communication techniques for building rapport</li>
                        <li>• Read and interpret body language and non-verbal cues</li>
                        <li>• Use psychological triggers ethically to influence outcomes</li>
                        <li>• Handle difficult personalities and emotional situations</li>
                        <li>• Create compelling presentations that support your position</li>
                        <li>• Build trust and credibility throughout the negotiation</li>
                        <li>• Adapt your communication style to different personality types</li>
                    </ul>
                </div>

                {/* Building Rapport */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Building Rapport and Trust</h2>
                    <p className="text-white/90 mb-4">
                        Rapport is the foundation of successful negotiations. People do business with people they like and trust. Here's how to build genuine connections that lead to better outcomes.
                    </p>

                    <h3 className="text-xl font-bold text-[#FFD700] mb-3">The RAPPORT Framework</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {[
                            { letter: "R", title: "Research Common Ground", desc: "Find shared interests, experiences, or connections before the meeting" },
                            { letter: "A", title: "Ask Engaging Questions", desc: "Show genuine interest in their situation, goals, and challenges" },
                            { letter: "P", title: "Practice Active Listening", desc: "Give full attention, reflect back what you hear, and ask follow-up questions" },
                            { letter: "P", title: "Provide Value First", desc: "Offer helpful information, insights, or assistance before asking for anything" },
                            { letter: "O", title: "Observe and Adapt", desc: "Match their communication style, energy level, and pace" },
                            { letter: "R", title: "Respect Their Position", desc: "Acknowledge their concerns and validate their perspective" },
                            { letter: "T", title: "Take Time to Connect", desc: "Don't rush into business - invest in relationship building" }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-[#00D4AA] text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        {item.letter}
                                    </div>
                                    <h4 className="text-lg font-bold text-[#00D4AA]">{item.title}</h4>
                                </div>
                                <p className="text-white/80">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Communication Techniques */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Advanced Communication Techniques</h2>

                    <h3 className="text-xl font-bold text-[#FFD700] mb-3">The Art of Questioning</h3>
                    <div className="space-y-4 mb-6">
                        <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-lg font-bold text-[#00D4AA] mb-2">Open-Ended Questions</h4>
                            <p className="text-white/90 mb-2">These encourage sharing and reveal motivations:</p>
                            <ul className="text-white/80 space-y-1 ml-4">
                                <li>• "What's most important to you in this transaction?"</li>
                                <li>• "What would an ideal outcome look like for you?"</li>
                                <li>• "What concerns do you have about this process?"</li>
                                <li>• "How did you come to the decision to sell/buy?"</li>
                            </ul>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-lg font-bold text-[#00D4AA] mb-2">Clarifying Questions</h4>
                            <p className="text-white/90 mb-2">These help you understand their position better:</p>
                            <ul className="text-white/80 space-y-1 ml-4">
                                <li>• "When you say 'flexible on timing,' what does that mean to you?"</li>
                                <li>• "Can you help me understand your reasoning behind that price?"</li>
                                <li>• "What would need to change for this to work for you?"</li>
                            </ul>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-lg font-bold text-[#00D4AA] mb-2">Hypothetical Questions</h4>
                            <p className="text-white/90 mb-2">These explore possibilities without commitment:</p>
                            <ul className="text-white/80 space-y-1 ml-4">
                                <li>• "If we could find a way to address your timeline concerns, would that change your position?"</li>
                                <li>• "What if we structured the financing differently?"</li>
                                <li>• "How would you feel about a shorter inspection period?"</li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#FFD700] mb-3">Active Listening Techniques</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { title: "Reflective Listening", desc: "Repeat back what you heard to confirm understanding: 'So you're saying that timing is your biggest concern?'" },
                            { title: "Paraphrasing", desc: "Restate their message in your own words to show you understand: 'It sounds like you need to close by the end of the month.'" },
                            { title: "Summarizing", desc: "Periodically summarize key points to ensure alignment: 'Let me make sure I understand your position...'" },
                            { title: "Empathetic Responses", desc: "Acknowledge their feelings and concerns: 'I can understand why that would be frustrating.'" }
                        ].map((technique, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{technique.title}</h4>
                                <p className="text-white/80">{technique.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Body Language and Non-Verbals */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Reading Body Language and Non-Verbals</h2>
                    <p className="text-white/90 mb-4">Understanding non-verbal cues gives you insights into the other party's true feelings and intentions.</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-[#FFD700] mb-3">Positive Signals</h3>
                            <div className="space-y-3">
                                {[
                                    { signal: "Open Posture", meaning: "Arms uncrossed, leaning forward, facing you directly" },
                                    { signal: "Mirroring", meaning: "Subconsciously copying your gestures and posture" },
                                    { signal: "Nodding", meaning: "Agreement or understanding, especially with eye contact" },
                                    { signal: "Relaxed Facial Expression", meaning: "Genuine smiles, relaxed jaw, natural eye contact" }
                                ].map((item, index) => (
                                    <div key={index} className="bg-green-500/20 border border-green-500 rounded-lg p-3">
                                        <div className="font-semibold text-green-400">{item.signal}</div>
                                        <div className="text-white/80 text-sm">{item.meaning}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-[#FFD700] mb-3">Concerning Signals</h3>
                            <div className="space-y-3">
                                {[
                                    { signal: "Closed Posture", meaning: "Arms crossed, leaning away, avoiding eye contact" },
                                    { signal: "Fidgeting", meaning: "Tapping, leg bouncing, or other nervous movements" },
                                    { signal: "Facial Tension", meaning: "Tight jaw, furrowed brow, forced smiles" },
                                    { signal: "Defensive Gestures", meaning: "Hands in pockets, turning away, creating barriers" }
                                ].map((item, index) => (
                                    <div key={index} className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                                        <div className="font-semibold text-red-400">{item.signal}</div>
                                        <div className="text-white/80 text-sm">{item.meaning}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Psychological Triggers */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Ethical Use of Psychological Triggers</h2>
                    <p className="text-white/90 mb-4">These principles can guide negotiations toward agreement when used ethically and responsibly.</p>

                    <div className="space-y-4">
                        {[
                            {
                                trigger: "Reciprocity",
                                description: "People feel obligated to return favors",
                                application: "Provide market analysis, helpful information, or small concessions first",
                                example: "Before making your offer, share a detailed market report showing recent sales in the area"
                            },
                            {
                                trigger: "Social Proof",
                                description: "People follow others' behavior",
                                application: "Use testimonials, case studies, and examples of similar successful deals",
                                example: "Share how other investors have successfully used similar strategies in the same market"
                            },
                            {
                                trigger: "Scarcity",
                                description: "Limited availability increases perceived value",
                                application: "Highlight genuine time constraints or limited opportunities",
                                example: "Mention that you have limited time to make offers due to other commitments"
                            },
                            {
                                trigger: "Authority",
                                description: "People defer to experts and credible sources",
                                application: "Share your expertise, credentials, and track record",
                                example: "Reference your years of experience and successful deals in the area"
                            },
                            {
                                trigger: "Commitment and Consistency",
                                description: "People want to act consistently with their commitments",
                                application: "Get small agreements that lead to larger ones",
                                example: "Start with agreement on basic terms before moving to price"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{item.trigger}</h4>
                                <p className="text-white/90 mb-2"><strong>How it works:</strong> {item.description}</p>
                                <p className="text-white/80 mb-2"><strong>Application:</strong> {item.application}</p>
                                <p className="text-white/70 text-sm italic"><strong>Example:</strong> {item.example}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-4 mt-6">
                        <h4 className="text-lg font-bold text-yellow-400 mb-2">⚠️ Ethical Guidelines</h4>
                        <ul className="text-white/90 space-y-1 ml-4">
                            <li>• Always be truthful and transparent</li>
                            <li>• Focus on creating genuine value for all parties</li>
                            <li>• Never manipulate or deceive</li>
                            <li>• Build long-term relationships, not short-term wins</li>
                            <li>• Use these principles to help people make good decisions</li>
                        </ul>
                    </div>
                </div>

                {/* Handling Difficult Personalities */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Handling Difficult Personalities</h2>
                    <p className="text-white/90 mb-4">Not every negotiation will be smooth. Here's how to handle challenging situations and personalities.</p>

                    <div className="space-y-4">
                        {[
                            {
                                type: "The Aggressive Negotiator",
                                characteristics: "Intimidating, demanding, tries to dominate",
                                strategies: [
                                    "Stay calm and professional",
                                    "Don't take it personally",
                                    "Focus on facts and data",
                                    "Set clear boundaries",
                                    "Use 'I' statements to express your position"
                                ]
                            },
                            {
                                type: "The Emotional Negotiator",
                                characteristics: "Makes decisions based on feelings, gets upset easily",
                                strategies: [
                                    "Acknowledge their emotions",
                                    "Show empathy and understanding",
                                    "Give them time to process",
                                    "Focus on how the deal benefits them emotionally",
                                    "Be patient and supportive"
                                ]
                            },
                            {
                                type: "The Indecisive Negotiator",
                                characteristics: "Can't make decisions, constantly changes mind",
                                strategies: [
                                    "Help them clarify their priorities",
                                    "Break decisions into smaller parts",
                                    "Provide clear options with pros/cons",
                                    "Set deadlines for decisions",
                                    "Offer to help them think through the implications"
                                ]
                            },
                            {
                                type: "The Suspicious Negotiator",
                                characteristics: "Doesn't trust anyone, questions everything",
                                strategies: [
                                    "Be completely transparent",
                                    "Provide documentation and proof",
                                    "Offer third-party verification",
                                    "Build trust gradually",
                                    "Address their concerns directly"
                                ]
                            }
                        ].map((personality, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{personality.type}</h4>
                                <p className="text-white/90 mb-3"><strong>Characteristics:</strong> {personality.characteristics}</p>
                                <div>
                                    <strong className="text-white/90">Strategies:</strong>
                                    <ul className="text-white/80 space-y-1 ml-4 mt-1">
                                        {personality.strategies.map((strategy, strategyIndex) => (
                                            <li key={strategyIndex}>• {strategy}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quiz Section */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Knowledge Check</h2>
                    <p className="text-white/90 mb-6">Test your understanding of communication and influence tactics:</p>

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
                                    {score.percentage >= 80 ? "Excellent! You've mastered communication tactics." :
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
                    <p className="text-white/90 mb-4">You've now mastered advanced communication and influence techniques:</p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { title: "Rapport Building", desc: "The RAPPORT framework for building genuine connections and trust." },
                            { title: "Communication Mastery", desc: "Advanced questioning, listening, and presentation techniques." },
                            { title: "Non-Verbal Reading", desc: "Understanding body language and emotional cues." },
                            { title: "Ethical Influence", desc: "Using psychological triggers responsibly to guide negotiations." },
                            { title: "Difficult Situations", desc: "Strategies for handling challenging personalities and emotions." },
                            { title: "Adaptation Skills", desc: "Flexibility to adjust your approach based on the other party." }
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
                            Great negotiators are great communicators. When you can build rapport, read non-verbals, and adapt your style to different personalities, you create an environment where mutually beneficial agreements become natural outcomes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NegotiationModule3;
