import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Clock, CheckCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import SOI Module Components
import SOIModule1 from './SOIModule1';
import SOIModule2 from './SOIModule2';
import SOIModule3 from './SOIModule3';
import SOIModule4 from './SOIModule4';
import SOIModule5 from './SOIModule5';
import SOIModule6 from './SOIModule6';

const SOITrainingCourse = () => {
    const navigate = useNavigate();
    const [completedModules, setCompletedModules] = useState(new Set());
    const [prerequisites, setPrerequisites] = useState(new Set());
    const [currentModule, setCurrentModule] = useState(null);

    const modules = [
        {
            id: 1,
            title: "SOI Fundamentals",
            duration: "45 minutes",
            description: "Define and categorize your sphere of influence, understand relationship mapping, and identify your most valuable contacts for business development.",
            isUnlocked: true,
            isCompleted: completedModules.has(1),
            component: SOIModule1
        },
        {
            id: 2,
            title: "Database Management",
            duration: "40 minutes",
            description: "Organize contacts in your CRM effectively, create smart segmentation strategies, and build automated workflow systems for consistent SOI nurturing.",
            isUnlocked: completedModules.has(1),
            isCompleted: completedModules.has(2),
            component: SOIModule2
        },
        {
            id: 3,
            title: "Touch Point Strategy",
            duration: "50 minutes",
            description: "Create systematic communication plans, develop personal branding, and implement the 33-touch system for relationship building.",
            isUnlocked: completedModules.has(2),
            isCompleted: completedModules.has(3),
            component: SOIModule3
        },
        {
            id: 4,
            title: "Content That Converts",
            duration: "35 minutes",
            description: "Learn what to share that generates referrals, create valuable market updates, and avoid common content mistakes.",
            isUnlocked: completedModules.has(3),
            isCompleted: completedModules.has(4),
            component: SOIModule4
        },
        {
            id: 5,
            title: "Events & Gatherings",
            duration: "40 minutes",
            description: "Plan client appreciation events, host networking gatherings, and create memorable experiences that generate referrals.",
            isUnlocked: completedModules.has(4),
            isCompleted: completedModules.has(5),
            component: SOIModule5
        },
        {
            id: 6,
            title: "Referral Generation",
            duration: "30 minutes",
            description: "Master the art of asking for referrals, create referral systems, and track your SOI success metrics.",
            isUnlocked: completedModules.has(5),
            isCompleted: completedModules.has(6),
            component: SOIModule6
        }
    ];

    const workflowSteps = [
        {
            number: 1,
            title: "Audit Your Existing Network",
            description: "Create a comprehensive list of everyone you know - past clients, family, friends, professional contacts, and service providers."
        },
        {
            number: 2,
            title: "Categorize by Relationship Strength",
            description: "Organize contacts into tiers: Tier 1 (VIP Champions), Tier 2 (Active Network), Tier 3 (Acquaintances), Tier 4 (Extended Network)."
        },
        {
            number: 3,
            title: "Set Up CRM with SOI Fields",
            description: "Configure your CRM with custom fields for SOI tier, relationship type, referral potential, and communication preferences."
        },
        {
            number: 4,
            title: "Create Communication Calendar",
            description: "Develop a systematic approach to staying in touch with different tiers using the 33-touch system and personal branding."
        },
        {
            number: 5,
            title: "Develop Content Strategy",
            description: "Create valuable content that positions you as the local expert while providing value to your SOI network."
        },
        {
            number: 6,
            title: "Plan Relationship Events",
            description: "Organize client appreciation events and networking gatherings to strengthen relationships and create referral opportunities."
        },
        {
            number: 7,
            title: "Implement Referral Systems",
            description: "Create systematic approaches to asking for referrals and tracking your SOI success metrics."
        },
        {
            number: 8,
            title: "Track and Optimize",
            description: "Monitor your SOI activities, measure referral generation, and continuously optimize your relationship-building strategies."
        }
    ];

    const prerequisitesList = [
        "STACKED CRM system set up and accessible",
        "Complete contact list from your phone and email",
        "Calendar system for relationship touchpoints",
        "Email marketing platform integration",
        "Social media accounts for personal branding",
        "Event planning resources and budget",
        "Content creation tools and templates",
        "Referral tracking system in place"
    ];

    const resources = [
        {
            title: "📊 SOI Audit Worksheet",
            description: "Comprehensive worksheet to categorize and evaluate your existing network relationships."
        },
        {
            title: "🤝 CRM Setup Guide",
            description: "Step-by-step guide to configure STACKED CRM for optimal SOI relationship management."
        },
        {
            title: "📧 Email Templates",
            description: "Proven email templates for different types of SOI communication and relationship building."
        },
        {
            title: "📞 Touch Point Calendar",
            description: "Systematic calendar template for the 33-touch system and relationship maintenance."
        },
        {
            title: "🎉 Event Planning Kit",
            description: "Complete toolkit for planning client appreciation events and networking gatherings."
        },
        {
            title: "📈 Referral Tracking Sheet",
            description: "Spreadsheet to track referral sources, conversion rates, and SOI success metrics."
        }
    ];

    const benefits = [
        {
            title: "🤝 Leverage Existing Relationships",
            description: "Turn your existing network into a consistent source of referrals and repeat business."
        },
        {
            title: "💰 Higher Conversion Rates",
            description: "SOI referrals convert 5x better than cold leads and cost 90% less to acquire."
        },
        {
            title: "🔄 Predictable Lead Flow",
            description: "Create a systematic approach to generating consistent referrals from your network."
        },
        {
            title: "🏆 Build Your Reputation",
            description: "Position yourself as the go-to real estate professional in your community."
        }
    ];

    const handleModuleToggle = (moduleId) => {
        setCompletedModules(prev => {
            const newSet = new Set(prev);
            if (newSet.has(moduleId)) {
                newSet.delete(moduleId);
                // Lock subsequent modules
                for (let i = moduleId + 1; i <= modules.length; i++) {
                    newSet.delete(i);
                }
            } else {
                newSet.add(moduleId);
            }
            return newSet;
        });
    };

    const handlePrerequisiteToggle = (index) => {
        setPrerequisites(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    const handleModuleClick = (module) => {
        if (module.isUnlocked) {
            // Show the module content within the course
            setCurrentModule(module);
        } else {
            alert('Complete the previous modules to unlock this one!');
        }
    };

    const handleCompleteModule = (moduleId) => {
        setCompletedModules(prev => {
            const newSet = new Set(prev);
            newSet.add(moduleId);
            // Save to localStorage for persistence
            localStorage.setItem('soiTrainingCompleted', JSON.stringify([...newSet]));
            return newSet;
        });
        // Return to course overview
        setCurrentModule(null);
    };

    const handleBackToCourse = () => {
        setCurrentModule(null);
    };

    // Check if user completed a module (this would be called from the module components)
    const markModuleCompleted = (moduleId) => {
        setCompletedModules(prev => {
            const newSet = new Set(prev);
            newSet.add(moduleId);
            // Save to localStorage for persistence
            localStorage.setItem('soiTrainingCompleted', JSON.stringify([...newSet]));
            return newSet;
        });
    };

    // Expose the completion function globally so module components can call it
    useEffect(() => {
        window.markModuleCompleted = markModuleCompleted;
        window.returnToCourse = () => {
            window.location.href = '/realestate/learning/soi-training-course';
        };
        return () => {
            delete window.markModuleCompleted;
            delete window.returnToCourse;
        };
    }, []);

    // Check for completion when component mounts (in case user returns from a module)
    useEffect(() => {
        const checkCompletion = () => {
            // Check if user completed any modules (this could be stored in localStorage or sessionStorage)
            const completed = JSON.parse(localStorage.getItem('soiTrainingCompleted') || '[]');
            if (completed.length > 0) {
                setCompletedModules(new Set(completed));
            }
        };
        checkCompletion();
    }, []);

    const totalModules = modules.length;
    const completedCount = completedModules.size;
    const progressPercentage = (completedCount / totalModules) * 100;

    // If a module is selected, show the module content
    if (currentModule) {
        const ModuleComponent = currentModule.component;
        return (
            <div className="min-h-screen text-white" style={{
                background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                lineHeight: '1.6'
            }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                    {/* Module Header */}
                    <div className="text-center mb-12 p-8 rounded-2xl" style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div className="w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center text-2xl font-bold" style={{ background: '#00D4AA' }}>
                            {currentModule.id}
                        </div>
                        <h1 className="text-4xl font-bold mb-4">Module {currentModule.id}: {currentModule.title}</h1>
                        <div className="inline-block px-6 py-3 rounded-full text-lg font-semibold mb-6" style={{ background: '#00D4AA', color: '#1e3a5f' }}>
                            {currentModule.duration}
                        </div>
                        <p className="text-lg mb-6" style={{ color: '#B0C4DE' }}>
                            {currentModule.description}
                        </p>
                    </div>

                    {/* Module Content */}
                    <div className="mb-12 p-12 rounded-2xl" style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <ModuleComponent />
                    </div>

                    {/* Module Actions */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleBackToCourse}
                            className="flex items-center px-6 py-3 rounded-xl font-semibold transition-all"
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                color: '#B0C4DE',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Course
                        </button>

                        <button
                            onClick={() => handleCompleteModule(currentModule.id)}
                            className="px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #00D4AA, #00B894)',
                                color: 'white',
                                boxShadow: '0 4px 15px rgba(0, 212, 170, 0.3)'
                            }}
                        >
                            Complete Module
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white" style={{
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.6'
        }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                {/* Header Section */}
                <div className="text-center mb-16 p-12 rounded-2xl" style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div className="w-16 h-16 mx-auto mb-8 rounded-lg flex items-center justify-center text-2xl font-bold" style={{ background: '#FF6B35' }}>
                        🤝
                    </div>
                    <h1 className="text-5xl font-bold mb-6">Sphere of Influence to Sales Pipeline</h1>
                    <div className="inline-block px-6 py-3 rounded-full text-lg font-semibold mb-8" style={{ background: '#00D4AA', color: '#1e3a5f' }}>
                        Complete Relationship Management Course
                    </div>
                    <p className="text-lg mb-8" style={{ color: '#B0C4DE', maxWidth: '600px', margin: '0 auto 40px' }}>
                        Transform your existing network into a consistent referral machine. Learn to systematically nurture relationships and convert them into closed transactions.
                    </p>
                    <div className="inline-block px-8 py-4 rounded-full font-semibold" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                        6 modules • 4 hours
                    </div>
                </div>

                {/* Progress Section */}
                <div className="mb-12 p-8 rounded-2xl" style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 className="text-3xl font-bold mb-6" style={{ color: '#00D4AA' }}>Your Progress</h2>
                    <div className="rounded-lg p-1 mb-4" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
                        <div
                            className="h-6 rounded-md flex items-center justify-center text-sm font-bold text-white transition-all"
                            style={{
                                width: `${progressPercentage}%`,
                                background: 'linear-gradient(90deg, #00D4AA, #00B894)'
                            }}
                        >
                            {Math.round(progressPercentage)}% Complete
                        </div>
                    </div>
                    <p className="text-center" style={{ color: '#B0C4DE' }}>Complete each module to unlock the next one</p>
                </div>

                {/* SOI Benefits */}
                <div className="mb-12 p-8 rounded-2xl" style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div className="p-6 rounded-xl mb-8" style={{
                        background: 'rgba(255, 107, 53, 0.2)',
                        border: '2px solid #FF6B35'
                    }}>
                        <h3 className="text-2xl font-bold mb-4" style={{ color: '#FF6B35' }}>🎯 What is Sphere of Influence?</h3>
                        <p className="mb-4" style={{ color: '#E6F3FF' }}>
                            Your Sphere of Influence (SOI) is your network of people who know you personally and professionally. These relationships represent your most valuable source of referrals and repeat business.
                        </p>
                        <p style={{ color: '#E6F3FF' }}>
                            <strong>Perfect for:</strong> Past clients, family, friends, professional contacts, and service providers who can refer business to you.
                        </p>
                    </div>

                    <h3 className="text-2xl font-bold mb-6" style={{ color: '#FFD700' }}>Why SOI Development is a Game-Changer</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="p-6 rounded-xl text-center" style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                <h4 className="text-lg font-semibold mb-3" style={{ color: '#00D4AA' }}>{benefit.title}</h4>
                                <p className="text-sm" style={{ color: '#E6F3FF' }}>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Modules */}
                <div className="mb-12 p-8 rounded-2xl" style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 className="text-3xl font-bold mb-6" style={{ color: '#00D4AA' }}>Course Modules</h2>
                    <p className="mb-8" style={{ color: '#E6F3FF' }}>Master each stage of the relationship management process:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {modules.map((module) => (
                            <div
                                key={module.id}
                                onClick={() => handleModuleClick(module)}
                                className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${module.isUnlocked
                                    ? 'hover:bg-white/15'
                                    : 'opacity-60 cursor-not-allowed'
                                    }`}
                                style={{
                                    background: module.isUnlocked ? 'rgba(255, 255, 255, 0.1)' : 'rgba(100, 100, 100, 0.2)',
                                    border: module.isUnlocked ? '2px solid #00D4AA' : '2px solid #666'
                                }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-2xl">
                                        {module.isCompleted ? '✅' : module.isUnlocked ? '▶' : '🔒'}
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={module.isCompleted}
                                        onChange={() => handleModuleToggle(module.id)}
                                        disabled={!module.isUnlocked}
                                        className="w-5 h-5"
                                        style={{ transform: 'scale(1.5)' }}
                                    />
                                </div>
                                <h4 className="text-lg font-semibold mb-2" style={{ color: '#FFD700' }}>
                                    Module {module.id}: {module.title}
                                </h4>
                                <div className="text-sm mb-3" style={{ color: '#B0C4DE' }}>
                                    {module.duration}
                                </div>
                                <p className="text-sm" style={{ color: '#E6F3FF' }}>
                                    {module.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Complete Workflow */}
                <div className="mb-12 p-8 rounded-2xl" style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 className="text-3xl font-bold mb-6" style={{ color: '#00D4AA' }}>Complete SOI to Sales Workflow</h2>
                    <p className="mb-8" style={{ color: '#E6F3FF' }}>Follow this step-by-step process using STACKED CRM:</p>

                    <div className="space-y-6">
                        {workflowSteps.map((step) => (
                            <div key={step.number} className="flex items-start p-6 rounded-xl" style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderLeft: '4px solid #00D4AA'
                            }}>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold mr-6 flex-shrink-0" style={{
                                    background: '#00D4AA',
                                    color: '#1e3a5f'
                                }}>
                                    {step.number}
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-2" style={{ color: '#FFD700' }}>{step.title}</h4>
                                    <p style={{ color: '#E6F3FF' }}>{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Prerequisites Checklist */}
                <div className="mb-12 p-8 rounded-2xl" style={{
                    background: 'rgba(255, 215, 0, 0.1)',
                    border: '2px solid #FFD700'
                }}>
                    <h3 className="text-2xl font-bold mb-6" style={{ color: '#FFD700' }}>📋 Prerequisites Checklist</h3>
                    <p className="mb-6" style={{ color: '#E6F3FF' }}>Complete these items before starting the course:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {prerequisitesList.map((prereq, index) => (
                            <div key={index} className="flex items-center p-4 rounded-lg" style={{
                                background: 'rgba(255, 255, 255, 0.1)'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={prerequisites.has(index)}
                                    onChange={() => handlePrerequisiteToggle(index)}
                                    className="w-5 h-5 mr-4"
                                    style={{ transform: 'scale(1.3)' }}
                                />
                                <label className="text-sm" style={{ color: '#E6F3FF' }}>{prereq}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tools & Resources */}
                <div className="mb-12 p-8 rounded-2xl" style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 className="text-3xl font-bold mb-6" style={{ color: '#00D4AA' }}>Course Tools & Resources</h2>
                    <p className="mb-8" style={{ color: '#E6F3FF' }}>Downloads and tools you'll use throughout the course:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.map((resource, index) => (
                            <div key={index} className="p-6 rounded-xl text-center" style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                <h4 className="text-lg font-semibold mb-3" style={{ color: '#00D4AA' }}>{resource.title}</h4>
                                <p className="text-sm" style={{ color: '#E6F3FF' }}>{resource.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Warning Box */}
                <div className="mb-12 p-8 rounded-2xl text-center font-bold text-lg" style={{
                    background: 'linear-gradient(135deg, #FF6B35, #E55533)',
                    color: 'white'
                }}>
                    ⚠️ Important: Always maintain authentic relationships and provide genuine value to your network!
                </div>

                {/* Success Message */}
                <div className="mb-12 p-8 rounded-2xl text-center font-bold text-lg" style={{
                    background: 'linear-gradient(135deg, #00D4AA, #00B894)',
                    color: 'white'
                }}>
                    Master this process = Consistent referrals + Predictable income! 🏆
                </div>

                {/* Footer */}
                <div className="text-center p-8 rounded-2xl" style={{
                    background: 'rgba(255, 255, 255, 0.1)'
                }}>
                    <p style={{ color: '#B0C4DE' }}>STACKED • Real Estate CRM • Relationship Management Mastery Series</p>
                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <button
                        onClick={() => navigate('/realestate/learning')}
                        className="flex items-center text-sky-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Learning
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SOITrainingCourse;
