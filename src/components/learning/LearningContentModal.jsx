import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Clock, Star } from 'lucide-react';

const LearningContentModal = ({ isOpen, onClose, course }) => {
    const [currentModule, setCurrentModule] = useState(0);
    const [completedModules, setCompletedModules] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && course) {
            // Load completed modules from localStorage
            const saved = localStorage.getItem(`completed_${course.title}`);
            if (saved) {
                setCompletedModules(JSON.parse(saved));
            }
        }
    }, [isOpen, course]);

    const handleClose = () => {
        setCurrentModule(0);
        onClose();
    };

    const handleModuleComplete = (moduleIndex) => {
        const newCompleted = [...completedModules, moduleIndex];
        setCompletedModules(newCompleted);
        localStorage.setItem(`completed_${course.title}`, JSON.stringify(newCompleted));
    };

    const handleNextModule = () => {
        if (currentModule < getModules().length - 1) {
            setCurrentModule(currentModule + 1);
        }
    };

    const handlePrevModule = () => {
        if (currentModule > 0) {
            setCurrentModule(currentModule - 1);
        }
    };

    const getModules = () => {
        if (!course) return [];

        // Map course titles to their corresponding modules
        const moduleMap = {
            'Skip Tracing Course': [
                { title: 'Module 1: Skip Tracing Fundamentals', file: 'skip tracing module 1.html' },
                { title: 'Module 2: Data Sources & Research', file: 'skip tracing module 2.html' },
                { title: 'Module 3: Contact Methods & Outreach', file: 'skip tracing module 3.html' },
                { title: 'Module 4: Compliance & Legal Considerations', file: 'skip tracing module 4.html' },
                { title: 'Module 5: Lead Conversion Strategies', file: 'skip tracing module 5.html' }
            ],
            'SOI Training Course': [
                { title: 'Module 1: Building Your Sphere', file: 'soi_module_1.html' },
                { title: 'Module 2: Relationship Management', file: 'soi_module_2.html' },
                { title: 'Module 3: Referral Systems', file: 'soi_module_3.html' },
                { title: 'Module 4: Networking Strategies', file: 'soi_module_4.html' },
                { title: 'Module 5: Follow-up Systems', file: 'soi_module_5.html' },
                { title: 'Module 6: Conversion Techniques', file: 'soi_module_6.html' }
            ],
            'Appraisal Packet Checklist': [
                { title: 'Complete Guide', file: 'first_time_buyer_guide.html' }
            ],
            'Fair-Housing-Safe Marketing': [
                { title: 'Marketing Compliance Guide', file: 'manual_email_templates.html' }
            ],
            'Inspection Credits vs. Repairs': [
                { title: 'Inspection Guide', file: 'closing_process_checklist.html' }
            ],
            'Listing Media Copy That Sells': [
                { title: 'Copywriting Guide', file: 'listing_video_scripts.html' }
            ],
            'Market Pulse in 5 Minutes': [
                { title: 'Market Analysis', file: 'market_analysis_guide.html' }
            ],
            'Offer Strategy: Win Without Overpaying': [
                { title: 'Strategy Guide', file: 'Automated Offer Calculator  (1).html' }
            ],
            'Pre-Approval Power-Up': [
                { title: 'Pre-Approval Guide', file: 'preapproval_checklist.html' }
            ],
            'Pricing a Listing in 30 Minutes': [
                { title: 'Pricing Guide', file: 'home_selling_checklist.html' }
            ],
            'Transaction Timeline': [
                { title: 'Timeline Guide', file: 'buyer_timeline_tracker.html' }
            ],
            'Social Media That Converts': [
                { title: 'Social Media Guide', file: 'social_media_that_converts.html' }
            ],
            'Referral System Blueprint': [
                { title: 'Referral System', file: 'referral_system_blueprint.html' }
            ],
            'Lead Nurturing Sequences': [
                { title: 'Lead Nurturing', file: 'lead_nurturing_sequences.html' }
            ],
            'Closing Table Mastery': [
                { title: 'Closing Mastery', file: 'closing_table_mastery.html' }
            ],
            'Advanced Objection Handling': [
                { title: 'Objection Handling', file: 'advanced_objection_handling.html' }
            ]
        };

        return moduleMap[course.title] || [{ title: 'Course Content', file: 'first_time_buyer_guide.html' }];
    };

    const modules = getModules();
    const currentModuleData = modules[currentModule];

    if (!isOpen || !course) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--dark-bg)] rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--primary-color)]">
                    <div className="flex items-center gap-4">
                        <div className="text-3xl">{course.icon}</div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{course.title}</h2>
                            <p className="text-gray-400">{course.desc}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="p-4 border-b border-[var(--primary-color)]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className="text-sm text-[var(--primary-color)]">
                            {completedModules.length}/{modules.length} modules completed
                        </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-[var(--primary-color)] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(completedModules.length / modules.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Module Navigation */}
                {modules.length > 1 && (
                    <div className="p-4 border-b border-[var(--primary-color)]">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handlePrevModule}
                                disabled={currentModule === 0}
                                className="flex items-center gap-2 px-4 py-2 bg-[var(--medium-dark)] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--lighter-dark)] transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </button>

                            <div className="flex items-center gap-2">
                                {modules.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-3 h-3 rounded-full ${index === currentModule
                                            ? 'bg-[var(--primary-color)]'
                                            : completedModules.includes(index)
                                                ? 'bg-green-500'
                                                : 'bg-gray-600'
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNextModule}
                                disabled={currentModule === modules.length - 1}
                                className="flex items-center gap-2 px-4 py-2 bg-[var(--medium-dark)] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--lighter-dark)] transition-colors"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Content Area */}
                <div className="p-6">
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {currentModuleData?.title || 'Course Content'}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                <span>Module {currentModule + 1} of {modules.length}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                <span>{course.level}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Frame */}
                    <div className="bg-white rounded-lg overflow-hidden" style={{ height: '60vh' }}>
                        <iframe
                            src={`/${currentModuleData?.file || 'first_time_buyer_guide.html'}`}
                            className="w-full h-full border-0"
                            title={currentModuleData?.title || 'Course Content'}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-4">
                            {!completedModules.includes(currentModule) && (
                                <button
                                    onClick={() => handleModuleComplete(currentModule)}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <Star className="w-4 h-4" />
                                    Mark as Complete
                                </button>
                            )}
                            {completedModules.includes(currentModule) && (
                                <div className="flex items-center gap-2 text-green-400">
                                    <Star className="w-4 h-4" />
                                    <span>Completed</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Close
                            </button>
                            {currentModule < modules.length - 1 && (
                                <button
                                    onClick={handleNextModule}
                                    className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color)]/90 transition-colors"
                                >
                                    Next Module
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningContentModal;
