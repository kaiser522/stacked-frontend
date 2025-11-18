import React, { useState } from 'react';

const NegotiationModule4 = () => {
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 1,
            question: "What is the first step in handling an objection effectively?",
            options: [
                "Immediately provide a counter-argument",
                "Listen and acknowledge the concern",
                "Change the subject to avoid the objection",
                "Dismiss the objection as unimportant"
            ],
            correct: 1
        },
        {
            id: 2,
            question: "Which technique is most effective for reframing a price objection?",
            options: [
                "Lowering your price immediately",
                "Focusing on value and benefits rather than cost",
                "Comparing to higher-priced alternatives",
                "Ignoring the objection completely"
            ],
            correct: 1
        },
        {
            id: 3,
            question: "What does the 'Feel, Felt, Found' technique accomplish?",
            options: [
                "Makes the other party feel guilty",
                "Shows empathy and provides social proof",
                "Forces them to agree with you",
                "Changes the subject entirely"
            ],
            correct: 1
        },
        {
            id: 4,
            question: "When should you use the 'Isolate and Conquer' technique?",
            options: [
                "When you have multiple objections to address",
                "When you want to avoid the objection",
                "When the other party is being unreasonable",
                "When you're running out of time"
            ],
            correct: 0
        },
        {
            id: 5,
            question: "What is the key to turning objections into opportunities?",
            options: [
                "Being more aggressive in your response",
                "Understanding the underlying concern and addressing it",
                "Providing more information than requested",
                "Changing your entire approach"
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
                    <h1 className="text-3xl font-bold text-[#00D4AA] mb-4">Module 4: Objection Handling Mastery</h1>
                    <p className="text-white/90 mb-4">Identify common objections, reframe concerns as opportunities, and turn resistance into agreement using proven frameworks.</p>
                    <div className="flex items-center gap-4 text-sm text-white/70">
                        <span>🕒 40 minutes</span>
                        <span>📚 Advanced Level</span>
                    </div>
                </div>

                {/* Learning Objectives */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Learning Objectives</h2>
                    <p className="text-white/90 mb-4">By the end of this module, you will be able to:</p>
                    <ul className="text-white/80 space-y-2 ml-6">
                        <li>• Identify and categorize different types of objections</li>
                        <li>• Use proven frameworks to handle objections effectively</li>
                        <li>• Turn objections into opportunities for value creation</li>
                        <li>• Master the art of reframing concerns positively</li>
                        <li>• Build confidence in handling difficult objections</li>
                        <li>• Create objection response scripts for common situations</li>
                        <li>• Use objections as signals to adjust your approach</li>
                    </ul>
                </div>

                {/* Understanding Objections */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Understanding Objections</h2>
                    <p className="text-white/90 mb-4">
                        Objections are not rejections - they're requests for more information, clarification, or reassurance. When handled properly, objections can actually strengthen your position and lead to better agreements.
                    </p>

                    <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 mb-6">
                        <h4 className="text-lg font-bold text-[#00D4AA] mb-2">Key Insight: Objections Are Opportunities</h4>
                        <p className="text-white/90">
                            Every objection reveals something about the other party's concerns, priorities, or decision-making process. Use objections as windows into their true interests and motivations.
                        </p>
                    </div>

                    <h3 className="text-xl font-bold text-[#FFD700] mb-3">Types of Objections</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            {
                                type: "Price Objections",
                                description: "Too expensive, budget constraints, value concerns",
                                examples: ["Your price is too high", "We can't afford that", "It's not worth that much"]
                            },
                            {
                                type: "Timing Objections",
                                description: "Not ready to decide, need more time, external pressures",
                                examples: ["We need to think about it", "It's not the right time", "We have other priorities"]
                            },
                            {
                                type: "Trust Objections",
                                description: "Lack of confidence, credibility concerns, past bad experiences",
                                examples: ["I don't know if I can trust you", "We've been burned before", "How do I know you'll deliver?"]
                            },
                            {
                                type: "Authority Objections",
                                description: "Need approval, decision-maker not present, process requirements",
                                examples: ["I need to check with my partner", "My lawyer needs to review this", "I can't make this decision alone"]
                            }
                        ].map((objection, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{objection.type}</h4>
                                <p className="text-white/90 mb-2">{objection.description}</p>
                                <div className="text-white/80 text-sm">
                                    <strong>Common phrases:</strong>
                                    <ul className="ml-4 mt-1">
                                        {objection.examples.map((example, exampleIndex) => (
                                            <li key={exampleIndex}>• "{example}"</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* The LAER Framework */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">The LAER Framework for Objection Handling</h2>
                    <p className="text-white/90 mb-4">This systematic approach helps you handle any objection professionally and effectively.</p>

                    <div className="space-y-4">
                        {[
                            {
                                letter: "L",
                                title: "Listen",
                                description: "Give full attention to the objection without interrupting",
                                techniques: [
                                    "Let them finish completely",
                                    "Ask clarifying questions",
                                    "Show you understand their concern",
                                    "Avoid getting defensive"
                                ]
                            },
                            {
                                letter: "A",
                                title: "Acknowledge",
                                description: "Validate their concern and show empathy",
                                techniques: [
                                    "I can understand why you'd feel that way",
                                    "That's a valid concern",
                                    "I appreciate you sharing that with me",
                                    "Many people have that same concern"
                                ]
                            },
                            {
                                letter: "E",
                                title: "Explore",
                                description: "Dig deeper to understand the real concern behind the objection",
                                techniques: [
                                    "What specifically concerns you about that?",
                                    "Help me understand what would make you feel more comfortable",
                                    "What would need to change for this to work for you?",
                                    "What's most important to you in this decision?"
                                ]
                            },
                            {
                                letter: "R",
                                title: "Respond",
                                description: "Address the concern with facts, alternatives, or solutions",
                                techniques: [
                                    "Provide specific information",
                                    "Offer alternative solutions",
                                    "Share relevant examples or testimonials",
                                    "Create new options that address their concern"
                                ]
                            }
                        ].map((step, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-[#00D4AA] text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        {step.letter}
                                    </div>
                                    <h4 className="text-xl font-bold text-[#00D4AA]">{step.title}</h4>
                                </div>
                                <p className="text-white/90 mb-3">{step.description}</p>
                                <div>
                                    <strong className="text-white/90">Key Techniques:</strong>
                                    <ul className="text-white/80 space-y-1 ml-4 mt-1">
                                        {step.techniques.map((technique, techniqueIndex) => (
                                            <li key={techniqueIndex}>• {technique}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Advanced Objection Techniques */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Advanced Objection Handling Techniques</h2>

                    <div className="space-y-6">
                        {[
                            {
                                technique: "Feel, Felt, Found",
                                description: "Show empathy, provide social proof, and share results",
                                example: "I understand how you feel. Many of my clients felt the same way initially. But what they found was that the long-term benefits far outweighed the initial investment.",
                                when: "When dealing with price or value objections"
                            },
                            {
                                technique: "Isolate and Conquer",
                                description: "Address one objection at a time to avoid overwhelming them",
                                example: "Let's focus on the timing concern first. If we can resolve that, we can address the other points. What specifically about the timeline concerns you?",
                                when: "When facing multiple objections"
                            },
                            {
                                technique: "Reframe the Objection",
                                description: "Turn the objection into a positive or different perspective",
                                example: "You're right to be concerned about the price. That shows you're serious about making a good investment. Let me show you why this price actually represents excellent value.",
                                when: "When the objection is based on misunderstanding"
                            },
                            {
                                technique: "The Assumptive Close",
                                description: "Act as if the objection has been resolved and move forward",
                                example: "Great, so once we resolve the financing details, we can move forward with the inspection. When would you like to schedule that?",
                                when: "When you've addressed the concern and they seem satisfied"
                            },
                            {
                                technique: "The Boomerang",
                                description: "Turn their objection into a reason to move forward",
                                example: "You're absolutely right that this is a big decision. That's exactly why you want to work with someone who has the experience and track record to ensure everything goes smoothly.",
                                when: "When their concern actually supports your position"
                            }
                        ].map((technique, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{technique.technique}</h4>
                                <p className="text-white/90 mb-2">{technique.description}</p>
                                <div className="bg-white/10 rounded-lg p-3 mb-2">
                                    <strong className="text-white/90">Example:</strong>
                                    <p className="text-white/80 italic mt-1">"{technique.example}"</p>
                                </div>
                                <div className="text-white/70 text-sm">
                                    <strong>Best used when:</strong> {technique.when}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Common Real Estate Objections */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Common Real Estate Objections and Responses</h2>

                    <div className="space-y-4">
                        {[
                            {
                                objection: "Your price is too high",
                                response: "I understand price is important to you. Let me show you why this price represents excellent value. Based on recent sales in the area, this property is actually priced below market value. Plus, when you factor in the improvements and the prime location, you're getting a great deal.",
                                followUp: "What specific aspects of the value would you like me to explain further?"
                            },
                            {
                                objection: "We need to think about it",
                                response: "I completely understand wanting to think it over - this is a big decision. What specific aspects would you like to consider? I'm happy to provide any additional information that would help with your decision.",
                                followUp: "What information would help you feel more confident about moving forward?"
                            },
                            {
                                objection: "We can't afford it",
                                response: "I appreciate you being upfront about your budget concerns. Let me show you some creative financing options that might make this work within your budget. There are several ways we can structure this deal.",
                                followUp: "What's your ideal monthly payment, and let's see how we can make that work?"
                            },
                            {
                                objection: "We're not ready to sell/buy",
                                response: "I understand timing is important. What would need to change for you to be ready? Sometimes the best opportunities come when we're not actively looking, and I'd hate for you to miss out on a great deal.",
                                followUp: "What's your ideal timeline, and how can we work within that?"
                            },
                            {
                                objection: "We need to talk to our family/lawyer",
                                response: "That's smart to get input from the important people in your life. What specific concerns do you think they might have? I'd be happy to address those now so you can go to them with complete information.",
                                followUp: "What questions do you think they'll ask, and how can I help you prepare for that conversation?"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <div className="mb-3">
                                    <strong className="text-red-400">Objection:</strong>
                                    <p className="text-white/90 italic">"{item.objection}"</p>
                                </div>
                                <div className="mb-3">
                                    <strong className="text-green-400">Response:</strong>
                                    <p className="text-white/90 italic">"{item.response}"</p>
                                </div>
                                <div>
                                    <strong className="text-blue-400">Follow-up Question:</strong>
                                    <p className="text-white/90 italic">"{item.followUp}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Turning Objections into Opportunities */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Turning Objections into Opportunities</h2>
                    <p className="text-white/90 mb-4">The best negotiators don't just handle objections - they use them to create better deals and stronger relationships.</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                opportunity: "Price Objection → Value Discussion",
                                description: "Use price concerns to highlight value, benefits, and ROI",
                                action: "Create detailed value propositions and comparison analyses"
                            },
                            {
                                opportunity: "Timing Objection → Urgency Creation",
                                description: "Turn timing concerns into reasons to act now",
                                action: "Highlight market conditions, limited availability, or special terms"
                            },
                            {
                                opportunity: "Trust Objection → Credibility Building",
                                description: "Use trust concerns to demonstrate expertise and reliability",
                                action: "Share testimonials, credentials, and track record"
                            },
                            {
                                opportunity: "Authority Objection → Process Understanding",
                                description: "Use decision-making concerns to understand their process",
                                action: "Help them prepare for internal discussions and approvals"
                            }
                        ].map((opportunity, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{opportunity.opportunity}</h4>
                                <p className="text-white/90 mb-2">{opportunity.description}</p>
                                <div className="text-white/80 text-sm">
                                    <strong>Action:</strong> {opportunity.action}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quiz Section */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Knowledge Check</h2>
                    <p className="text-white/90 mb-6">Test your understanding of objection handling:</p>

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
                                    {score.percentage >= 80 ? "Excellent! You've mastered objection handling." :
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
                    <p className="text-white/90 mb-4">You've now mastered the art of handling objections effectively:</p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { title: "LAER Framework", desc: "Listen, Acknowledge, Explore, Respond - the systematic approach to any objection." },
                            { title: "Advanced Techniques", desc: "Feel-Felt-Found, Isolate and Conquer, Reframing, and other proven methods." },
                            { title: "Real Estate Scripts", desc: "Specific responses for common real estate objections and situations." },
                            { title: "Opportunity Creation", desc: "Turning objections into chances to build value and strengthen relationships." }
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
                            Objections are not roadblocks - they're opportunities. When you approach objections with curiosity, empathy, and a problem-solving mindset, you can turn resistance into agreement and build stronger relationships in the process.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NegotiationModule4;
