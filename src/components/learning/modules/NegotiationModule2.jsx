import React, { useState } from 'react';

const NegotiationModule2 = () => {
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [prerequisites, setPrerequisites] = useState(new Set());

    const questions = [
        {
            id: 1,
            question: "What percentage of negotiation success is typically determined before the actual negotiation begins?",
            options: ["50%", "60%", "70%", "80%"],
            correct: 3
        },
        {
            id: 2,
            question: "What is the most important factor when selecting comparable sales for your analysis?",
            options: [
                "Finding the highest sale prices",
                "Recent sales within similar location and timeframe",
                "Properties sold by the same agent",
                "The exact same square footage"
            ],
            correct: 1
        },
        {
            id: 3,
            question: "Which information source typically provides the most reliable insights into a seller's timeline motivation?",
            options: [
                "Property listing description",
                "Social media posts and professional changes",
                "Property tax records",
                "Neighborhood gossip"
            ],
            correct: 1
        },
        {
            id: 4,
            question: "What does BATNA stand for in negotiation theory?",
            options: [
                "Best Alternative to a Negotiated Agreement",
                "Basic Agreement Terms and Negotiation Approach",
                "Business Analysis for Total Net Assets",
                "Balanced Approach to Negotiation Agreement"
            ],
            correct: 0
        },
        {
            id: 5,
            question: "Which type of leverage is typically most powerful in real estate negotiations?",
            options: [
                "Financial leverage (cash offers)",
                "Information leverage (market knowledge)",
                "Time leverage (patience)",
                "All types working together"
            ],
            correct: 3
        }
    ];

    const prerequisitesList = [
        "Basic understanding of real estate transactions",
        "Experience with at least 2-3 real estate deals",
        "Access to market data and comps tools",
        "Standard purchase agreement templates",
        "Funding sources identified (cash, hard money, etc.)",
        "Calculator and deal analysis tools",
        "Professional business cards and marketing materials",
        "Reference list of comparable properties"
    ];

    const handleAnswerSelect = (questionId, answerIndex) => {
        setQuizAnswers(prev => ({
            ...prev,
            [questionId]: answerIndex
        }));
    };

    const togglePrerequisite = (index) => {
        const newPrerequisites = new Set(prerequisites);
        if (newPrerequisites.has(index)) {
            newPrerequisites.delete(index);
        } else {
            newPrerequisites.add(index);
        }
        setPrerequisites(newPrerequisites);
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
                    <h1 className="text-3xl font-bold text-[#00D4AA] mb-4">Module 2: Pre-Negotiation Preparation</h1>
                    <p className="text-white/90 mb-4">Learn advanced research techniques, strategic planning methods, and how to identify leverage points that give you a competitive advantage in any negotiation.</p>
                    <div className="flex items-center gap-4 text-sm text-white/70">
                        <span>🕒 50 minutes</span>
                        <span>📚 Advanced Level</span>
                    </div>
                </div>

                {/* Learning Objectives */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Learning Objectives</h2>
                    <p className="text-white/90 mb-4">By the end of this module, you will be able to:</p>
                    <ul className="text-white/80 space-y-2 ml-6">
                        <li>• Conduct comprehensive property and market research efficiently</li>
                        <li>• Identify and analyze the other party's motivations and constraints</li>
                        <li>• Set clear negotiation objectives and define your BATNA</li>
                        <li>• Develop multiple negotiation strategies based on different scenarios</li>
                        <li>• Recognize and leverage various sources of negotiating power</li>
                        <li>• Create detailed preparation checklists for different deal types</li>
                        <li>• Use technology and tools to streamline your research process</li>
                    </ul>
                </div>

                {/* The 80/20 Rule */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">The 80/20 Rule of Negotiation Success</h2>
                    <p className="text-white/90 mb-4">
                        The most successful negotiators understand that 80% of negotiation success is determined before you ever sit down at the table. Preparation is not just helpful - it's the foundation of every successful deal.
                    </p>

                    <h3 className="text-xl font-bold text-[#FFD700] mb-3">Why Preparation Matters More in Real Estate</h3>
                    <p className="text-white/90 mb-4">Real estate negotiations are complex because they involve:</p>
                    <ul className="text-white/80 space-y-2 ml-6">
                        <li>• <strong>Multiple data points:</strong> Property value, market conditions, comparable sales, repair costs</li>
                        <li>• <strong>Emotional factors:</strong> Personal history, future plans, financial stress</li>
                        <li>• <strong>Time constraints:</strong> Market timing, financing deadlines, personal situations</li>
                        <li>• <strong>Legal complexities:</strong> Contracts, contingencies, disclosures, local regulations</li>
                        <li>• <strong>Financial variables:</strong> Financing options, tax implications, cash flow considerations</li>
                    </ul>

                    <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 mt-4">
                        <h4 className="text-lg font-bold text-[#00D4AA] mb-2">The Preparation Advantage</h4>
                        <p className="text-white/90">
                            Well-prepared negotiators consistently outperform unprepared ones by 15-30% on deal terms. They also close deals 40% faster and build stronger relationships with counterparts who respect their professionalism.
                        </p>
                    </div>
                </div>

                {/* Property Research Framework */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Comprehensive Property Research Framework</h2>
                    <p className="text-white/90 mb-4">Thorough property research gives you the data foundation needed to negotiate from a position of strength. Here's the systematic approach top investors use:</p>

                    <div className="space-y-6">
                        <div className="bg-white/5 rounded-lg p-4 border-l-4 border-[#00D4AA]">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-3">Phase 1: Basic Property Intelligence</h3>
                            <h4 className="text-md font-bold text-[#FFD700] mb-2">Property Details & History</h4>
                            <ul className="text-white/80 space-y-1 ml-4">
                                <li>• Property type, square footage, lot size, year built</li>
                                <li>• Ownership history - how long current owner has owned it</li>
                                <li>• Purchase price and date of current owner's acquisition</li>
                                <li>• Property tax history and current assessments</li>
                                <li>• Any liens, judgments, or encumbrances</li>
                                <li>• Zoning information and permitted uses</li>
                            </ul>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4 border-l-4 border-[#00D4AA]">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-3">Phase 2: Market Analysis</h3>
                            <h4 className="text-md font-bold text-[#FFD700] mb-2">Comparable Sales Research</h4>
                            <ul className="text-white/80 space-y-1 ml-4">
                                <li>• 3-6 recent sales within 0.5 miles and 6 months</li>
                                <li>• Price per square foot trends in the area</li>
                                <li>• Average days on market for similar properties</li>
                                <li>• Seasonal market patterns and current conditions</li>
                                <li>• Inventory levels and absorption rates</li>
                                <li>• Future development or infrastructure changes</li>
                            </ul>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4 border-l-4 border-[#00D4AA]">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-3">Phase 3: Condition Assessment</h3>
                            <h4 className="text-md font-bold text-[#FFD700] mb-2">Property Condition Intelligence</h4>
                            <ul className="text-white/80 space-y-1 ml-4">
                                <li>• External visual inspection (drive-by or street view)</li>
                                <li>• Age and condition of major systems (roof, HVAC, electrical)</li>
                                <li>• Obvious repair needs or deferred maintenance</li>
                                <li>• Code violations or inspection issues</li>
                                <li>• Environmental concerns or flood zones</li>
                                <li>• Estimated repair and renovation costs</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-bold text-[#00D4AA] mb-3">Research Tools and Resources</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[#00D4AA]/20">
                                        <th className="p-3 text-left text-[#00D4AA] font-bold">Information Type</th>
                                        <th className="p-3 text-left text-[#00D4AA] font-bold">Primary Sources</th>
                                        <th className="p-3 text-left text-[#00D4AA] font-bold">Time Required</th>
                                        <th className="p-3 text-left text-[#00D4AA] font-bold">Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { type: "Property Records", sources: "County assessor, MLS, PropertyRadar", time: "15-30 minutes", cost: "Free - $50/month" },
                                        { type: "Comparable Sales", sources: "MLS, Redfin, Zillow, local agents", time: "30-45 minutes", cost: "Free - $100/month" },
                                        { type: "Market Data", sources: "Local MLS reports, RealtyTrac", time: "20-30 minutes", cost: "$25-75/month" },
                                        { type: "Property Condition", sources: "Google Street View, drive-by", time: "15-30 minutes", cost: "Gas money" },
                                        { type: "Owner Background", sources: "Social media, property history", time: "10-20 minutes", cost: "Free" }
                                    ].map((row, index) => (
                                        <tr key={index} className="border-b border-white/10">
                                            <td className="p-3 text-white font-semibold">{row.type}</td>
                                            <td className="p-3 text-white/80">{row.sources}</td>
                                            <td className="p-3 text-white/80">{row.time}</td>
                                            <td className="p-3 text-white/80">{row.cost}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Understanding the Other Party */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Understanding the Other Party's Position</h2>
                    <p className="text-white/90 mb-4">The most powerful preparation involves understanding the motivations, constraints, and decision-making process of the person across the table. This intelligence shapes your entire strategy.</p>

                    <h3 className="text-xl font-bold text-[#FFD700] mb-3">Seller Motivation Analysis</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {[
                            { title: "Financial Motivations", desc: "Debt obligations, cash flow needs, tax considerations, inheritance situations, divorce proceedings, business liquidity needs" },
                            { title: "Lifestyle Motivations", desc: "Job relocation, family changes, health issues, retirement, downsizing, upgrading to larger home" },
                            { title: "Property-Related Motivations", desc: "Maintenance burden, tenant problems, neighborhood changes, property condition, investment performance" },
                            { title: "Timeline Motivations", desc: "Foreclosure timelines, tax deadlines, moving dates, school schedules, market timing concerns" }
                        ].map((motivation, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{motivation.title}</h4>
                                <p className="text-white/80">{motivation.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-[#FFD700] mb-3">Intelligence Gathering Techniques</h3>
                    <p className="text-white/90 mb-4">Ethical ways to understand the other party's situation:</p>

                    <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-yellow-400 mb-3">Research Methods Checklist</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            {prerequisitesList.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={prerequisites.has(index)}
                                        onChange={() => togglePrerequisite(index)}
                                        className="w-5 h-5 rounded"
                                    />
                                    <span className="text-white/90">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Setting Objectives */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Setting Clear Negotiation Objectives</h2>
                    <p className="text-white/90 mb-4">Without clear objectives, you're negotiating blind. Successful negotiators define multiple levels of acceptable outcomes before any conversation begins.</p>

                    <h3 className="text-xl font-bold text-[#FFD700] mb-3">The Three-Tier Objective System</h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        {[
                            {
                                title: "Tier 1: Dream Outcome",
                                desc: "Your ideal scenario if everything goes perfectly. This is your opening anchor point but not necessarily realistic.",
                                example: "Example: $150K purchase price, seller financing, 30-day close, no inspections"
                            },
                            {
                                title: "Tier 2: Target Outcome",
                                desc: "Realistic goal based on market data and research. This is what you expect to achieve with good negotiation.",
                                example: "Example: $165K purchase price, conventional financing, 45-day close, standard inspections"
                            },
                            {
                                title: "Tier 3: Walk-Away Point",
                                desc: "Minimum acceptable terms. Below this point, the deal doesn't make sense for your investment criteria.",
                                example: "Example: $175K maximum, any reasonable financing, 60-day close, full inspection rights"
                            }
                        ].map((tier, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-[#00D4AA]">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-2">{tier.title}</h4>
                                <p className="text-white/80 mb-2">{tier.desc}</p>
                                <p className="text-white/70 text-sm italic">{tier.example}</p>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-[#FFD700] mb-3">BATNA Development</h3>
                    <p className="text-white/90 mb-4">Your BATNA (Best Alternative to a Negotiated Agreement) is your source of negotiating power. The stronger your alternatives, the more confidently you can negotiate.</p>

                    <div className="bg-white/5 rounded-lg p-4 border-l-4 border-[#00D4AA] mb-4">
                        <h4 className="text-lg font-bold text-[#00D4AA] mb-2">Strong BATNA Elements</h4>
                        <ul className="text-white/80 space-y-1 ml-4">
                            <li>• 2-3 other properties under consideration</li>
                            <li>• Multiple financing options pre-approved</li>
                            <li>• Clear investment criteria and market standards</li>
                            <li>• Time flexibility (not desperate for immediate deal)</li>
                            <li>• Financial capacity to wait for better opportunities</li>
                            <li>• Alternative investment strategies if real estate unavailable</li>
                        </ul>
                    </div>

                    <div className="bg-red-500/20 border-2 border-red-500 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-red-400 mb-2">Weak BATNA Warning Signs</h4>
                        <p className="text-white/90">
                            If you have no alternatives, tight deadlines, limited financing, or emotional attachment to one specific property, you're negotiating from weakness. Strengthen your position before entering important negotiations.
                        </p>
                    </div>
                </div>

                {/* Quiz Section */}
                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Knowledge Check</h2>
                    <p className="text-white/90 mb-6">Test your understanding of pre-negotiation preparation:</p>

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
                                    {score.percentage >= 80 ? "Excellent! You've mastered preparation fundamentals." :
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
                    <p className="text-white/90 mb-4">You've now mastered the critical preparation phase that determines negotiation success:</p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { title: "Research Mastery", desc: "Systematic property research, market analysis, and condition assessment techniques." },
                            { title: "Motivation Analysis", desc: "Understanding the other party's true drivers, constraints, and decision-making factors." },
                            { title: "Strategic Planning", desc: "Setting clear objectives, developing BATNA, and creating multiple scenario strategies." },
                            { title: "Leverage Building", desc: "Identifying and developing multiple sources of negotiating power and influence." }
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
                            Preparation is not just about gathering information - it's about developing strategic options and building confidence that allows you to negotiate from a position of strength. The more prepared you are, the more flexible and creative you can be during the actual negotiation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NegotiationModule2;
