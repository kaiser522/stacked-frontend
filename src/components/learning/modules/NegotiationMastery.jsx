import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Clock, CheckCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import Negotiation Module Components
import NegotiationModule1 from './NegotiationModule1';
import NegotiationModule2 from './NegotiationModule2';
import NegotiationModule3 from './NegotiationModule3';
import NegotiationModule4 from './NegotiationModule4';
import NegotiationModule5 from './NegotiationModule5';
import NegotiationModule6 from './NegotiationModule6';

const NegotiationMastery = () => {
    const navigate = useNavigate();
    const [completedModules, setCompletedModules] = useState(new Set());
    const [prerequisites, setPrerequisites] = useState(new Set());
    const [currentModule, setCurrentModule] = useState(null);

    // Load completed modules from localStorage on component mount
    useEffect(() => {
        const saved = localStorage.getItem('completed_negotiation_modules');
        if (saved) {
            setCompletedModules(new Set(JSON.parse(saved)));
        }
    }, []);

    const modules = [
        {
            id: 1,
            title: "Negotiation Fundamentals",
            duration: "45 minutes",
            description: "Core principles of negotiation, understanding motivations, and the psychology behind decision-making in real estate transactions.",
            isUnlocked: true,
            isCompleted: completedModules.has(1),
            component: NegotiationModule1
        },
        {
            id: 2,
            title: "Pre-Negotiation Preparation",
            duration: "50 minutes",
            description: "Research techniques, setting objectives, identifying leverage points, and developing your negotiation strategy before the conversation.",
            isUnlocked: completedModules.has(1),
            isCompleted: completedModules.has(2),
            component: NegotiationModule2
        },
        {
            id: 3,
            title: "Communication & Influence Tactics",
            duration: "55 minutes",
            description: "Advanced communication strategies, reading body language, building rapport, and using psychological triggers to influence outcomes.",
            isUnlocked: completedModules.has(2),
            isCompleted: completedModules.has(3),
            component: NegotiationModule3
        },
        {
            id: 4,
            title: "Objection Handling Mastery",
            duration: "40 minutes",
            description: "Identify common objections, reframe concerns as opportunities, and turn resistance into agreement using proven frameworks.",
            isUnlocked: completedModules.has(3),
            isCompleted: completedModules.has(4),
            component: NegotiationModule4
        },
        {
            id: 5,
            title: "Creative Deal Structuring",
            duration: "45 minutes",
            description: "Alternative deal structures, financing options, and creative solutions that help close deals when traditional approaches fail.",
            isUnlocked: completedModules.has(4),
            isCompleted: completedModules.has(5),
            component: NegotiationModule5
        },
        {
            id: 6,
            title: "Advanced Closing Techniques",
            duration: "35 minutes",
            description: "Recognize buying signals, create urgency ethically, and use proven closing techniques to secure agreements and move to contract.",
            isUnlocked: completedModules.has(5),
            isCompleted: completedModules.has(6),
            component: NegotiationModule6
        }
    ];

    const workflowSteps = [
        {
            number: 1,
            title: "Research & Preparation Phase",
            description: "Gather property information, market data, seller motivations, and comparable sales. Set your negotiation objectives and identify potential concession points."
        },
        {
            number: 2,
            title: "Build Rapport & Discovery",
            description: "Establish connection with the other party, understand their true motivations, timeline, and constraints through strategic questioning."
        },
        {
            number: 3,
            title: "Present Your Position",
            description: "Make your initial offer with confidence, provide supporting rationale, and frame the proposal in terms of mutual benefit."
        },
        {
            number: 4,
            title: "Handle Counteroffers & Objections",
            description: "Listen actively, acknowledge concerns, reframe objections positively, and present alternative solutions that address their needs."
        },
        {
            number: 5,
            title: "Find Creative Solutions",
            description: "Explore win-win alternatives, adjust terms and conditions, consider seller financing or lease options to bridge gaps."
        },
        {
            number: 6,
            title: "Create Urgency & Momentum",
            description: "Use ethical urgency techniques, highlight market conditions, and create compelling reasons to act decisively."
        },
        {
            number: 7,
            title: "Secure Agreement & Close",
            description: "Recognize buying signals, use appropriate closing techniques, and guide the conversation toward signed contracts."
        },
        {
            number: 8,
            title: "Follow Through & Relationship Building",
            description: "Ensure smooth transaction execution, maintain positive relationships, and create opportunities for future deals and referrals."
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

    const handleModuleComplete = (moduleId) => {
        if (!completedModules.has(moduleId)) {
            const newCompleted = new Set(completedModules);
            newCompleted.add(moduleId);
            setCompletedModules(newCompleted);
            // Save to localStorage
            localStorage.setItem('completed_negotiation_modules', JSON.stringify([...newCompleted]));
        }
        // Navigate back to course overview after completing a module
        setCurrentModule(null);

        // Scroll to Course Modules section after a short delay to ensure the component has rendered
        setTimeout(() => {
            const modulesSection = document.getElementById('course-modules-section');
            if (modulesSection) {
                modulesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
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

    const startModule = (module) => {
        setCurrentModule(module);
    };

    const backToCourse = () => {
        setCurrentModule(null);
    };

    // If a module is selected, show the module content
    if (currentModule) {
        const ModuleComponent = currentModule.component;
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white">
                <div className="max-w-6xl mx-auto px-5 py-10">
                    {/* Module Header */}
                    <div className="text-center mb-16 p-16 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-lg">
                        <div className="w-16 h-16 bg-[#FF6B35] rounded-lg mx-auto mb-8 flex items-center justify-center text-2xl font-bold">
                            🎯
                        </div>
                        <h1 className="text-5xl font-bold mb-6 leading-tight">{currentModule.title}</h1>
                        <div className="bg-[#00D4AA] text-[#1e3a5f] px-6 py-3 rounded-full font-semibold text-lg inline-block mb-8">
                            Advanced Negotiation Training
                        </div>
                        <p className="text-xl text-[#B0C4DE] max-w-2xl mx-auto mb-10">
                            {currentModule.description}
                        </p>
                        <div className="bg-white/10 px-8 py-4 rounded-full inline-block font-semibold">
                            <Clock className="w-5 h-5 inline mr-2" />
                            {currentModule.duration} • Advanced Level
                        </div>
                    </div>

                    {/* Module Content */}
                    <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                        <ModuleComponent />
                    </div>

                    {/* Module Actions */}
                    <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/20">
                        <button
                            onClick={backToCourse}
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Course
                        </button>

                        <div className="flex items-center gap-4">
                            {!completedModules.has(currentModule.id) && (
                                <button
                                    onClick={() => handleModuleComplete(currentModule.id)}
                                    className="flex items-center gap-2 px-6 py-3 bg-[#00D4AA] text-[#1e3a5f] rounded-xl font-semibold hover:bg-[#00D4AA]/90 transition-colors"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    Mark as Complete
                                </button>
                            )}
                            {completedModules.has(currentModule.id) && (
                                <div className="flex items-center gap-2 text-green-400">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-semibold">Completed</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white">
            <div className="max-w-6xl mx-auto px-5 py-10">
                {/* Course Header */}
                <div className="text-center mb-16 p-16 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-lg">
                    <div className="w-16 h-16 bg-[#FF6B35] rounded-lg mx-auto mb-8 flex items-center justify-center text-2xl font-bold">
                        🎯
                    </div>
                    <h1 className="text-5xl font-bold mb-6 leading-tight">Negotiation Mastery</h1>
                    <div className="bg-[#00D4AA] text-[#1e3a5f] px-6 py-3 rounded-full font-semibold text-lg inline-block mb-8">
                        Advanced Deal Closing Course
                    </div>
                    <p className="text-xl text-[#B0C4DE] max-w-2xl mx-auto mb-10">
                        Master the art of negotiation in real estate. Learn proven strategies, psychology tactics, and frameworks to close more deals at better terms.
                    </p>
                    <div className="bg-white/10 px-8 py-4 rounded-full inline-block font-semibold">
                        <Clock className="w-5 h-5 inline mr-2" />
                        4.5 hours • 6 modules • Advanced Level
                    </div>
                </div>

                {/* Course Benefits */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <h2 className="text-4xl font-bold mb-8 text-[#00D4AA]">Why Negotiation Skills Transform Your Business</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: "💰", title: "Increase Profit Margins", desc: "Negotiate better purchase prices, terms, and conditions that directly impact your bottom line." },
                            { icon: "🤝", title: "Build Stronger Relationships", desc: "Create win-win scenarios that foster long-term partnerships with sellers, buyers, and partners." },
                            { icon: "⚡", title: "Close Deals Faster", desc: "Navigate objections smoothly and move negotiations toward agreement more efficiently." },
                            { icon: "🎯", title: "Handle Difficult Situations", desc: "Confidently manage challenging negotiations, hostile parties, and complex deal structures." }
                        ].map((benefit, index) => (
                            <div key={index} className="bg-white/5 rounded-xl p-6 text-center border border-[#00D4AA]">
                                <div className="w-16 h-16 bg-yellow-500 text-gray-800 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#00D4AA] mb-3">{benefit.title}</h3>
                                <p className="text-white/80">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Modules */}
                <div id="course-modules-section" className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <h2 className="text-4xl font-bold mb-8 text-[#00D4AA]">Course Modules</h2>
                    <p className="text-xl text-white/90 mb-8">Master each aspect of advanced negotiation:</p>

                    <div className="space-y-6">
                        {modules.map((module, index) => (
                            <div
                                key={module.id}
                                className={`bg-white/5 rounded-2xl p-6 border-2 transition-all duration-300 ${module.isUnlocked
                                    ? 'border-[#00D4AA] hover:border-[#FFD700] hover:bg-white/10'
                                    : 'border-gray-500 opacity-60'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${module.isCompleted
                                            ? 'bg-green-500 text-white'
                                            : module.isUnlocked
                                                ? 'bg-[#00D4AA] text-white'
                                                : 'bg-gray-500 text-white'
                                            }`}>
                                            {module.isCompleted ? '✓' : module.id}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                                            <p className="text-white/80 mb-2">{module.description}</p>
                                            <div className="flex items-center gap-4 text-sm text-white/70">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {module.duration}
                                                </span>
                                                {!module.isUnlocked && <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Locked</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        {!module.isUnlocked ? (
                                            <div className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                                                <Lock className="w-5 h-5" />
                                                Locked
                                            </div>
                                        ) : module.isCompleted ? (
                                            <div className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5" />
                                                Completed
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => startModule(module)}
                                                className="bg-[#00D4AA] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#00B894] transition-colors flex items-center gap-2"
                                            >
                                                <Play className="w-5 h-5" />
                                                Start Module
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Complete Negotiation Process */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <h2 className="text-4xl font-bold mb-8 text-[#00D4AA]">Complete Negotiation Process</h2>
                    <p className="text-xl text-white/90 mb-8">Follow this proven negotiation framework:</p>

                    <div className="space-y-6">
                        {workflowSteps.map((step, index) => (
                            <div key={index} className="bg-white/5 rounded-xl p-6 border-l-4 border-[#00D4AA]">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#00D4AA] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                                        {step.number}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-[#FFD700] mb-2">{step.title}</h4>
                                        <p className="text-white/80">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Prerequisites Checklist */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <h2 className="text-4xl font-bold mb-8 text-[#00D4AA]">Prerequisites Checklist</h2>
                    <p className="text-xl text-white/90 mb-8">Complete these items before starting the course:</p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {prerequisitesList.map((prerequisite, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                                <input
                                    type="checkbox"
                                    checked={prerequisites.has(index)}
                                    onChange={() => togglePrerequisite(index)}
                                    className="w-6 h-6 rounded"
                                />
                                <span className="text-white/90 text-lg">{prerequisite}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Tools & Resources */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <h2 className="text-4xl font-bold mb-8 text-[#00D4AA]">Course Tools & Resources</h2>
                    <p className="text-xl text-white/90 mb-8">Downloads and tools you'll use throughout the course:</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "📊 Negotiation Prep Worksheet", desc: "Comprehensive checklist to prepare for any negotiation, including research points and strategy planning." },
                            { title: "🗣️ Script Library", desc: "Proven negotiation scripts, phrases, and responses for common situations and objections." },
                            { title: "🎯 Objection Response Guide", desc: "Database of common objections with multiple tested responses and reframe techniques." },
                            { title: "🤝 Deal Structure Templates", desc: "Creative financing and deal structure templates including seller financing, lease options, and partnerships." },
                            { title: "📈 Market Data Cheat Sheet", desc: "Quick reference for gathering and presenting market data to support your negotiation position." },
                            { title: "🎬 Role-Play Scenarios", desc: "Practice scenarios with common negotiation challenges, complete with suggested approaches and outcomes." }
                        ].map((resource, index) => (
                            <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/20">
                                <h4 className="text-lg font-bold text-[#00D4AA] mb-3">{resource.title}</h4>
                                <p className="text-white/80">{resource.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Warning and Success Messages */}
                <div className="space-y-6">
                    <div className="bg-red-500/20 border-2 border-red-500 rounded-3xl p-8">
                        <h3 className="text-2xl font-bold text-red-400 mb-4">⚠️ Important</h3>
                        <p className="text-white/90 text-lg">Always negotiate ethically and honestly. Build long-term relationships, not short-term wins!</p>
                    </div>

                    <div className="bg-green-500/20 border-2 border-green-500 rounded-3xl p-8">
                        <h3 className="text-2xl font-bold text-green-400 mb-4">🎯 Success Formula</h3>
                        <p className="text-white/90 text-lg">Master these skills = Better deals + Higher profits + Stronger relationships! 🏆</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NegotiationMastery;