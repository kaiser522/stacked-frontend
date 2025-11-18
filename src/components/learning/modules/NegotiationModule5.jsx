import React, { useState } from 'react';

const NegotiationModule5 = () => {
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 1,
            question: "What is the primary benefit of creative deal structuring?",
            options: [
                "It makes negotiations more complicated",
                "It allows you to overcome obstacles that traditional financing can't",
                "It always results in lower prices",
                "It eliminates the need for due diligence"
            ],
            correct: 1
        },
        {
            id: 2,
            question: "Which deal structure is best for a seller who needs cash but wants to defer taxes?",
            options: [
                "All-cash offer",
                "Seller financing with installment sale",
                "Traditional bank financing",
                "Lease with option to buy"
            ],
            correct: 1
        },
        {
            id: 3,
            question: "What is the main advantage of a lease-option agreement?",
            options: [
                "It eliminates all risk for the buyer",
                "It allows the buyer to control the property while building equity",
                "It guarantees the seller will get full price",
                "It requires no down payment"
            ],
            correct: 1
        },
        {
            id: 4,
            question: "When should you consider a partnership structure?",
            options: [
                "When you want to avoid all responsibility",
                "When the deal is too large for one party or requires specific expertise",
                "When you want to eliminate all risk",
                "When traditional financing is readily available"
            ],
            correct: 1
        },
        {
            id: 5,
            question: "What is the key to successful creative deal structuring?",
            options: [
                "Always getting the lowest price possible",
                "Understanding each party's true needs and constraints",
                "Avoiding all forms of financing",
                "Making the deal as simple as possible"
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
                    <h1 className="text-3xl font-bold text-[#00D4AA] mb-4">Module 5: Creative Deal Structuring</h1>
                    <p className="text-white/90 mb-4">Alternative deal structures, financing options, and creative solutions that help close deals when traditional approaches fail.</p>
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
                        <li>• Identify when creative deal structuring is needed</li>
                        <li>• Understand various alternative financing options</li>
                        <li>• Structure deals that benefit all parties</li>
                        <li>• Overcome common obstacles with creative solutions</li>
                        <li>• Evaluate the risks and benefits of different structures</li>
                        <li>• Present creative deals in a compelling way</li>
                        <li>• Navigate legal and tax implications of alternative structures</li>
                    </ul>
                </div>

                {/* Why Creative Deal Structuring Matters */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Why Creative Deal Structuring Matters</h2>
                    <p className="text-white/90 mb-4">
                        Traditional financing doesn't work for every situation. Creative deal structuring allows you to close deals that would otherwise be impossible, while often providing better outcomes for all parties involved.
                    </p>

                    <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 mb-6">
                        <h4 className="text-lg font-bold text-[#00D4AA] mb-2">The Creative Advantage</h4>
                        <p className="text-white/90">
                            When you can think beyond traditional financing, you open up opportunities that other investors miss. Creative structuring often allows you to get better terms, lower effective costs, and build stronger relationships with sellers.
                        </p>
                    </div>

                    <h3 className="text-xl font-bold text-[#FFD700] mb-3">When to Use Creative Structuring</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { situation: "Seller Needs Cash Flow", solution: "Seller financing, lease-options, or installment sales" },
                            { situation: "Buyer Has Limited Down Payment", solution: "Seller financing, lease-options, or partnership structures" },
                            { situation: "Property Needs Major Repairs", solution: "Repair credits, escrow accounts, or phased closings" },
                            { situation: "Tax Considerations", solution: "1031 exchanges, installment sales, or structured sales" },
                            { situation: "Market Conditions", solution: "Flexible terms, rent-to-own, or creative financing" },
                            { situation: "Unique Property Features", solution: "Specialized financing, partnerships, or creative terms" }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{item.situation}</h4>
                                <p className="text-white/80">{item.solution}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seller Financing Structures */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Seller Financing Structures</h2>
                    <p className="text-white/90 mb-4">When the seller becomes the lender, you can create win-win scenarios that traditional banks can't match.</p>

                    <div className="space-y-4">
                        {[
                            {
                                structure: "Traditional Seller Financing",
                                description: "Seller carries a mortgage for the buyer",
                                benefits: [
                                    "Lower down payment requirements",
                                    "Faster closing process",
                                    "More flexible qualification criteria",
                                    "Potential for better interest rates"
                                ],
                                considerations: [
                                    "Seller must own property free and clear",
                                    "Buyer must qualify for payments",
                                    "Legal documentation required",
                                    "Tax implications for both parties"
                                ],
                                example: "Seller finances $200K at 6% for 30 years with $20K down"
                            },
                            {
                                structure: "Balloon Payment Structure",
                                description: "Lower payments with large final payment",
                                benefits: [
                                    "Lower monthly payments initially",
                                    "Time to arrange permanent financing",
                                    "Seller gets higher interest rate",
                                    "Buyer can improve property value"
                                ],
                                considerations: [
                                    "Must refinance before balloon due",
                                    "Higher risk if property values decline",
                                    "Seller takes on refinancing risk",
                                    "Need exit strategy"
                                ],
                                example: "5-year balloon with 7% interest, refinance or sell before year 5"
                            },
                            {
                                structure: "Interest-Only Payments",
                                description: "Pay only interest for specified period",
                                benefits: [
                                    "Lowest possible payments",
                                    "Maximum cash flow for buyer",
                                    "Seller gets steady income",
                                    "Time to improve property"
                                ],
                                considerations: [
                                    "No principal reduction",
                                    "Higher total cost over time",
                                    "Must have exit strategy",
                                    "Seller takes on more risk"
                                ],
                                example: "Interest-only for 2 years, then convert to amortized payments"
                            }
                        ].map((structure, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{structure.structure}</h4>
                                <p className="text-white/90 mb-3">{structure.description}</p>

                                <div className="grid md:grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <h5 className="font-bold text-green-400 mb-2">Benefits:</h5>
                                        <ul className="text-white/80 text-sm space-y-1">
                                            {structure.benefits.map((benefit, benefitIndex) => (
                                                <li key={benefitIndex}>• {benefit}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-yellow-400 mb-2">Considerations:</h5>
                                        <ul className="text-white/80 text-sm space-y-1">
                                            {structure.considerations.map((consideration, considerationIndex) => (
                                                <li key={considerationIndex}>• {consideration}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-white/10 rounded-lg p-3">
                                    <strong className="text-white/90">Example:</strong>
                                    <p className="text-white/80 italic mt-1">{structure.example}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lease-Option Structures */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Lease-Option (Rent-to-Own) Structures</h2>
                    <p className="text-white/90 mb-4">These structures allow buyers to control property while building equity and credit, while providing sellers with steady income and potential appreciation.</p>

                    <div className="space-y-4">
                        {[
                            {
                                type: "Traditional Lease-Option",
                                description: "Rent with option to purchase at predetermined price",
                                keyElements: [
                                    "Option fee (typically 1-5% of purchase price)",
                                    "Monthly rent (often above market rate)",
                                    "Purchase price locked in at signing",
                                    "Option period (typically 1-3 years)",
                                    "Rent credits toward down payment"
                                ],
                                benefits: [
                                    "Buyer controls property immediately",
                                    "Time to improve credit and save money",
                                    "Seller gets steady income and appreciation",
                                    "Flexibility for both parties"
                                ]
                            },
                            {
                                type: "Lease-Purchase",
                                description: "Binding contract to purchase at end of lease",
                                keyElements: [
                                    "Binding purchase agreement",
                                    "Non-refundable option fee",
                                    "Higher monthly payments",
                                    "Automatic purchase at lease end",
                                    "No backing out without penalty"
                                ],
                                benefits: [
                                    "Guaranteed sale for seller",
                                    "Forced savings for buyer",
                                    "Immediate property control",
                                    "Price protection for both parties"
                                ]
                            },
                            {
                                type: "Subject-to Financing",
                                description: "Take over existing mortgage payments",
                                keyElements: [
                                    "Assumes existing mortgage",
                                    "No new loan qualification",
                                    "Seller remains on title",
                                    "Buyer makes payments directly",
                                    "Due-on-sale clause considerations"
                                ],
                                benefits: [
                                    "No new financing needed",
                                    "Lower transaction costs",
                                    "Faster closing process",
                                    "Maintains existing loan terms"
                                ]
                            }
                        ].map((structure, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{structure.type}</h4>
                                <p className="text-white/90 mb-3">{structure.description}</p>

                                <div className="mb-3">
                                    <h5 className="font-bold text-[#FFD700] mb-2">Key Elements:</h5>
                                    <ul className="text-white/80 text-sm space-y-1 ml-4">
                                        {structure.keyElements.map((element, elementIndex) => (
                                            <li key={elementIndex}>• {element}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h5 className="font-bold text-green-400 mb-2">Benefits:</h5>
                                    <ul className="text-white/80 text-sm space-y-1 ml-4">
                                        {structure.benefits.map((benefit, benefitIndex) => (
                                            <li key={benefitIndex}>• {benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Partnership Structures */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Partnership and Joint Venture Structures</h2>
                    <p className="text-white/90 mb-4">When deals are too large or complex for one party, partnerships can provide the resources and expertise needed for success.</p>

                    <div className="space-y-4">
                        {[
                            {
                                structure: "Equity Partnership",
                                description: "Share ownership and profits based on contribution",
                                scenarios: [
                                    "Large commercial properties",
                                    "Development projects",
                                    "Portfolio acquisitions",
                                    "Properties requiring specialized expertise"
                                ],
                                considerations: [
                                    "Clear partnership agreement required",
                                    "Define roles and responsibilities",
                                    "Exit strategies and buyout provisions",
                                    "Tax implications and reporting"
                                ]
                            },
                            {
                                structure: "Sweat Equity Partnership",
                                description: "One partner provides money, other provides work",
                                scenarios: [
                                    "Fix-and-flip projects",
                                    "Property management partnerships",
                                    "Development with active management",
                                    "Rehab projects requiring expertise"
                                ],
                                considerations: [
                                    "Value sweat equity contributions",
                                    "Track time and effort invested",
                                    "Define success metrics",
                                    "Handle disputes and disagreements"
                                ]
                            },
                            {
                                structure: "Silent Partner Arrangement",
                                description: "One partner provides capital, other manages",
                                scenarios: [
                                    "Investors seeking passive income",
                                    "Active investors needing capital",
                                    "Geographic partnerships",
                                    "Specialized market expertise"
                                ],
                                considerations: [
                                    "Clear management responsibilities",
                                    "Regular reporting requirements",
                                    "Decision-making authority",
                                    "Performance benchmarks"
                                ]
                            }
                        ].map((structure, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{structure.structure}</h4>
                                <p className="text-white/90 mb-3">{structure.description}</p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h5 className="font-bold text-green-400 mb-2">Best For:</h5>
                                        <ul className="text-white/80 text-sm space-y-1">
                                            {structure.scenarios.map((scenario, scenarioIndex) => (
                                                <li key={scenarioIndex}>• {scenario}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-yellow-400 mb-2">Key Considerations:</h5>
                                        <ul className="text-white/80 text-sm space-y-1">
                                            {structure.considerations.map((consideration, considerationIndex) => (
                                                <li key={considerationIndex}>• {consideration}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Creative Solutions for Common Problems */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Creative Solutions for Common Problems</h2>

                    <div className="space-y-4">
                        {[
                            {
                                problem: "Seller Needs Cash but Property Has Issues",
                                solutions: [
                                    "Escrow repair funds at closing",
                                    "Phased closing with inspection periods",
                                    "Seller financing with repair credits",
                                    "Partnership with contractor"
                                ],
                                example: "Set aside $20K in escrow for roof replacement, release funds after completion"
                            },
                            {
                                problem: "Buyer Can't Qualify for Traditional Financing",
                                solutions: [
                                    "Seller financing with co-signer",
                                    "Lease-option to build credit",
                                    "Partnership with qualified investor",
                                    "Subject-to existing financing"
                                ],
                                example: "Lease-option for 2 years while buyer improves credit and saves down payment"
                            },
                            {
                                problem: "Property Overpriced for Market",
                                solutions: [
                                    "Seller financing with lower interest",
                                    "Lease-option with market-based pricing",
                                    "Partnership with profit sharing",
                                    "Creative terms to offset price"
                                ],
                                example: "Higher price with seller financing at below-market interest rate"
                            },
                            {
                                problem: "Timing Issues Between Buy/Sell",
                                solutions: [
                                    "Rent-back agreement to seller",
                                    "Bridge financing arrangements",
                                    "Staged closing process",
                                    "Lease-option during transition"
                                ],
                                example: "Buyer purchases, seller rents back for 6 months to find new home"
                            }
                        ].map((problem, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{problem.problem}</h4>
                                <div className="mb-3">
                                    <h5 className="font-bold text-[#FFD700] mb-2">Creative Solutions:</h5>
                                    <ul className="text-white/80 text-sm space-y-1 ml-4">
                                        {problem.solutions.map((solution, solutionIndex) => (
                                            <li key={solutionIndex}>• {solution}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3">
                                    <strong className="text-white/90">Example:</strong>
                                    <p className="text-white/80 italic mt-1">{problem.example}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legal and Tax Considerations */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Legal and Tax Considerations</h2>
                    <p className="text-white/90 mb-4">Creative structures have important legal and tax implications that must be properly addressed.</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-[#FFD700] mb-3">Legal Requirements</h3>
                            <ul className="text-white/80 space-y-2">
                                <li>• Proper documentation for all agreements</li>
                                <li>• Compliance with lending laws and regulations</li>
                                <li>• Clear title and ownership structures</li>
                                <li>• Due-on-sale clause considerations</li>
                                <li>• State-specific real estate laws</li>
                                <li>• Partnership and LLC agreements</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#FFD700] mb-3">Tax Implications</h3>
                            <ul className="text-white/80 space-y-2">
                                <li>• Installment sale reporting requirements</li>
                                <li>• Depreciation and deduction considerations</li>
                                <li>• 1031 exchange eligibility</li>
                                <li>• Partnership tax reporting</li>
                                <li>• Capital gains vs. ordinary income</li>
                                <li>• State and local tax implications</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-red-500/20 border-2 border-red-500 rounded-lg p-4 mt-6">
                        <h4 className="text-lg font-bold text-red-400 mb-2">⚠️ Important Warning</h4>
                        <p className="text-white/90">
                            Always consult with qualified legal and tax professionals before implementing creative deal structures. The laws and regulations vary by state and can have significant financial implications.
                        </p>
                    </div>
                </div>

                {/* Quiz Section */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Knowledge Check</h2>
                    <p className="text-white/90 mb-6">Test your understanding of creative deal structuring:</p>

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
                                    {score.percentage >= 80 ? "Excellent! You've mastered creative deal structuring." :
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
                    <p className="text-white/90 mb-4">You've now mastered the art of creative deal structuring:</p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { title: "Seller Financing", desc: "Traditional, balloon, and interest-only structures for various situations." },
                            { title: "Lease-Options", desc: "Rent-to-own structures that benefit both buyers and sellers." },
                            { title: "Partnerships", desc: "Equity, sweat equity, and silent partner arrangements." },
                            { title: "Creative Solutions", desc: "Problem-solving approaches for common deal obstacles." },
                            { title: "Legal Considerations", desc: "Important legal and tax implications to address." },
                            { title: "Risk Management", desc: "Evaluating and mitigating risks in creative structures." }
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
                            Creative deal structuring is about finding solutions that work for everyone. When you can think beyond traditional financing and understand each party's true needs and constraints, you can close deals that others can't and build stronger relationships in the process.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NegotiationModule5;
