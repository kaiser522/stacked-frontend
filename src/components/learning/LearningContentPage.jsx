import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, BookOpen, Star, CheckCircle, Play, ChevronRight, Lock } from 'lucide-react';
// Skip Tracing modules are now handled by SkipTracingCourse component
import AppraisalPacketChecklist from './modules/AppraisalPacketChecklist';
import FairHousingSafeMarketing from './modules/FairHousingSafeMarketing';
import InspectionCreditsVsRepairs from './modules/InspectionCreditsVsRepairs';
import ListingMediaCopyThatSells from './modules/ListingMediaCopyThatSells';
import MonthlyMarketUpdates from './modules/MonthlyMarketUpdates';
import OpenHouseFollowup from './modules/OpenHouseFollowup';
import PastClientReactivation from './modules/PastClientReactivation';
import SellerFollowupSequence from './modules/SellerFollowupSequence';
import FirstTimeBuyerSequence from './modules/FirstTimeBuyerSequence';
import LeadNurtureSequence from './modules/LeadNurtureSequence';
import SocialMediaThatConverts from './modules/SocialMediaThatConverts';
import ReferralSystemBlueprint from './modules/ReferralSystemBlueprint';
import LeadNurturingSequences from './modules/LeadNurturingSequences';
import ClosingTableMastery from './modules/ClosingTableMastery';
import AdvancedObjectionHandling from './modules/AdvancedObjectionHandling';
import Market from './Market';
import Offer from './Offer';
import Appraisal from './Appraisal';
import PreApprovalPowerUp from './PreApprovalPowerUp';
import PricingIn30Minutes from './PricingIn30Minutes';
import TransactionTimeline from './TransactionTimeline';
import Fair from './Fair';
import Inspection from './Inspection';
import Listing from './Listing';
import SOITrainingCourse from './SOITrainingCourse';
import SkipTracingCourse from './SkipTracingCourse';
// Pro Plan modules
import HighIncomeClientPsychology from './modules/HighIncomeClientPsychology';
import MarketCycleStrategy from './modules/MarketCycleStrategy';
import CompetitiveIntelligence from './modules/CompetitiveIntelligence';
import CrossSellingRevenue from './modules/CrossSellingRevenue';
import DatabaseMining from './modules/DatabaseMining';
import NegotiationMastery from './modules/NegotiationMastery';

const LearningContentPage = ({ course, onBack, onComplete }) => {
    const [currentModule, setCurrentModule] = useState(0);
    const [completedModules, setCompletedModules] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);


    useEffect(() => {
        if (course) {
            const saved = localStorage.getItem(`completed_${course.title}`);
            if (saved) {
                setCompletedModules(JSON.parse(saved));
            }
        }
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, [course]);

    useEffect(() => {
        // Scroll to top when current module changes
        window.scrollTo(0, 0);
    }, [currentModule]);

    const handleModuleComplete = (moduleIndex) => {
        if (!completedModules.includes(moduleIndex)) {
            const newCompleted = [...completedModules, moduleIndex];
            setCompletedModules(newCompleted);
            localStorage.setItem(`completed_${course.title}`, JSON.stringify(newCompleted));

            if (newCompleted.length === getModules().length) {
                setIsCompleted(true);
                if (onComplete) onComplete();
            }
        }
    };

    const getModules = () => {
        if (!course) return [];

        const moduleMap = {
            'Skip Tracing Course': [
                { title: 'Complete Skip Tracing Course', content: 'SkipTracingCourse' }
            ],
            'SOI Training Course': [
                { title: 'Complete SOI Training Course', content: 'SOITrainingCourse' }
            ],
            'Appraisal Packet Checklist': [
                { title: 'Complete Guide', content: 'Appraisal' }
            ],
            'Fair-Housing-Safe Marketing': [
                { title: 'Compliance Guide', content: 'Fair' }
            ],
            'Inspection Credits vs. Repairs': [
                { title: 'Strategy Guide', content: 'Inspection' }
            ],
            'Listing Media Copy That Sells': [
                { title: 'Marketing Guide', content: 'Listing' }
            ],
            'Monthly Market Updates': [
                { title: 'Email Sequence Guide', content: 'MonthlyMarketUpdates' }
            ],
            'Open House Follow-up': [
                { title: 'Email Sequence Guide', content: 'OpenHouseFollowup' }
            ],
            'Past Client Reactivation': [
                { title: 'Email Sequence Guide', content: 'PastClientReactivation' }
            ],
            'Seller Follow-up Sequence': [
                { title: 'Email Sequence Guide', content: 'SellerFollowupSequence' }
            ],
            'First-Time Buyer Journey': [
                { title: 'Email Sequence Guide', content: 'FirstTimeBuyerSequence' }
            ],
            'Lead Nurture Sequence': [
                { title: 'Email Sequence Guide', content: 'LeadNurtureSequence' }
            ],
            'Social Media That Converts': [
                { title: 'Complete Social Media Strategy', content: 'SocialMediaThatConverts' }
            ],
            'Referral System Blueprint': [
                { title: 'Complete Referral System', content: 'ReferralSystemBlueprint' }
            ],
            'Lead Nurturing Sequences': [
                { title: 'Complete Nurturing System', content: 'LeadNurturingSequences' }
            ],
            'Closing Table Mastery': [
                { title: 'Complete Closing Guide', content: 'ClosingTableMastery' }
            ],
            'Advanced Objection Handling': [
                { title: 'Complete Objection Handling', content: 'AdvancedObjectionHandling' }
            ],
            'Market Pulse in 5 Minutes': [
                { title: 'Market Analysis Guide', content: 'Market' }
            ],
            'Offer Strategy: Win Without Overpaying': [
                { title: 'Complete Strategy Guide', content: 'Offer' }
            ],
            'Pre-Approval Power-Up': [
                { title: 'Complete Pre-Approval Guide', content: 'PreApprovalPowerUp' }
            ],
            'Pricing a Listing in 30 Minutes': [
                { title: 'Complete Pricing Guide', content: 'PricingIn30Minutes' }
            ],
            'Transaction Timeline': [
                { title: 'Complete Timeline Guide', content: 'TransactionTimeline' }
            ],
            // Pro Plan Courses
            'High-Income Client Psychology': [
                { title: 'Complete Psychology Mastery', content: 'HighIncomeClientPsychology' }
            ],
            'Market Cycle Strategy and Timing': [
                { title: 'Complete Market Timing Guide', content: 'MarketCycleStrategy' }
            ],
            'Competitive Market Intelligence': [
                { title: 'Complete Intelligence System', content: 'CompetitiveIntelligence' }
            ],
            'Cross-Selling Revenue Streams': [
                { title: 'Complete Revenue Strategy', content: 'CrossSellingRevenue' }
            ],
            'Database Mining Mastery': [
                { title: 'Complete Database Strategy', content: 'DatabaseMining' }
            ],
            'Negotiation Mastery Course': [
                { title: 'Complete Negotiation Mastery', content: 'NegotiationMastery' }
            ]
        };

        return moduleMap[course.title] || [{ title: 'Course Content', content: 'DefaultContent' }];
    };

    const modules = getModules();
    const currentModuleData = modules[currentModule];

    if (!course) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white">
            <div className="max-w-6xl mx-auto px-5 py-10">
                {/* Header */}
                <div className="text-center mb-16 p-16 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-lg">
                    <div className="w-16 h-16 bg-[#FF6B35] rounded-lg mx-auto mb-8 flex items-center justify-center text-2xl font-bold">
                        {course.icon}
                    </div>
                    <h1 className="text-5xl font-bold mb-6 leading-tight">{course.title}</h1>
                    <div className="bg-[#00D4AA] text-[#1e3a5f] px-6 py-3 rounded-full font-semibold text-lg inline-block mb-8">
                        Complete Framework
                    </div>
                    <p className="text-xl text-[#B0C4DE] max-w-2xl mx-auto mb-10">
                        {course.desc}
                    </p>
                    <div className="bg-white/10 px-8 py-4 rounded-full inline-block font-semibold">
                        <Clock className="w-5 h-5 inline mr-2" />
                        {course.duration} • {course.level}
                    </div>
                </div>

                {/* Progress Section */}
                <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                    <h2 className="text-4xl font-bold mb-8 text-[#00D4AA]">Your Progress</h2>
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-lg">Modules Completed</span>
                        <span className="text-2xl font-bold text-[#00D4AA]">
                            {completedModules.length}/{modules.length}
                        </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-4 mb-8">
                        <div
                            className="bg-[#00D4AA] h-4 rounded-full transition-all duration-500"
                            style={{ width: `${(completedModules.length / modules.length) * 100}%` }}
                        />
                    </div>

                    {isCompleted && (
                        <div className="bg-green-500/20 border border-green-400 rounded-2xl p-6 text-center">
                            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-green-400 mb-2">Congratulations!</h3>
                            <p className="text-green-200">You've completed all modules in this course.</p>
                        </div>
                    )}
                </div>

                {/* Module Navigation */}
                {modules.length > 1 && (
                    <div className="bg-white/10 rounded-3xl p-12 mb-10 border border-white/20 backdrop-blur-lg">
                        <h2 className="text-4xl font-bold mb-8 text-[#00D4AA]">Course Modules</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {modules.map((module, index) => (
                                (() => {
                                    const isCompletedModule = completedModules.includes(index);
                                    const isCurrent = index === currentModule;
                                    const isLocked = index > 0 && !completedModules.includes(index - 1);
                                    const cardClasses = `p-6 rounded-2xl border-2 transition-all ${isCurrent
                                        ? 'border-[#00D4AA] bg-[#00D4AA]/20'
                                        : isCompletedModule
                                            ? 'border-green-400 bg-green-400/20'
                                            : isLocked
                                                ? 'border-white/10 bg-white/5 opacity-60 cursor-not-allowed'
                                                : 'border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer'
                                        }`;
                                    return (
                                        <div
                                            key={index}
                                            className={cardClasses}
                                            onClick={() => {
                                                if (!isLocked) setCurrentModule(index);
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompletedModule
                                                        ? 'bg-green-400 text-white'
                                                        : isCurrent
                                                            ? 'bg-[#00D4AA] text-[#1e3a5f]'
                                                            : 'bg-white/20 text-white'
                                                        }`}>
                                                        {isLocked ? (
                                                            <Lock className="w-4 h-4" />
                                                        ) : isCompletedModule ? (
                                                            <CheckCircle className="w-5 h-5" />
                                                        ) : (
                                                            <span className="text-sm font-bold">{index + 1}</span>
                                                        )}
                                                    </div>
                                                    <span className="font-semibold">Module {index + 1}</span>
                                                </div>
                                                {isCurrent && (
                                                    <Play className="w-5 h-5 text-[#00D4AA]" />
                                                )}
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-white/70">
                                                <BookOpen className="w-4 h-4" />
                                                <span>Learning Content</span>
                                            </div>
                                        </div>
                                    );
                                })()
                            ))}
                        </div>
                    </div>
                )}

                {/* Current Module Content */}
                <div className="bg-white/10 rounded-3xl p-12 border border-white/20 backdrop-blur-lg">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-4xl font-bold text-[#00D4AA]">
                            {currentModuleData?.title || 'Course Content'}
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-white/70">
                                <Clock className="w-5 h-5" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/70">
                                <Star className="w-5 h-5" />
                                <span>{course.level}</span>
                            </div>
                        </div>
                    </div>

                    {/* Module Content */}
                    <div className="prose prose-lg max-w-none">
                        {/* Skip Tracing and SOI modules are now handled by their respective course components */}
                        {currentModuleData?.content === 'AppraisalPacketChecklist' && <AppraisalPacketChecklist />}
                        {currentModuleData?.content === 'FairHousingSafeMarketing' && <FairHousingSafeMarketing />}
                        {currentModuleData?.content === 'InspectionCreditsVsRepairs' && <InspectionCreditsVsRepairs />}
                        {currentModuleData?.content === 'ListingMediaCopyThatSells' && <ListingMediaCopyThatSells />}
                        {currentModuleData?.content === 'MonthlyMarketUpdates' && <MonthlyMarketUpdates />}
                        {currentModuleData?.content === 'OpenHouseFollowup' && <OpenHouseFollowup />}
                        {currentModuleData?.content === 'PastClientReactivation' && <PastClientReactivation />}
                        {currentModuleData?.content === 'SellerFollowupSequence' && <SellerFollowupSequence />}
                        {currentModuleData?.content === 'FirstTimeBuyerSequence' && <FirstTimeBuyerSequence />}
                        {currentModuleData?.content === 'LeadNurtureSequence' && <LeadNurtureSequence />}
                        {currentModuleData?.content === 'SocialMediaThatConverts' && <SocialMediaThatConverts />}
                        {currentModuleData?.content === 'ReferralSystemBlueprint' && <ReferralSystemBlueprint />}
                        {currentModuleData?.content === 'LeadNurturingSequences' && <LeadNurturingSequences />}
                        {currentModuleData?.content === 'ClosingTableMastery' && <ClosingTableMastery />}
                        {currentModuleData?.content === 'AdvancedObjectionHandling' && <AdvancedObjectionHandling />}
                        {currentModuleData?.content === 'Market' && <Market />}
                        {currentModuleData?.content === 'Offer' && <Offer />}
                        {currentModuleData?.content === 'Appraisal' && <Appraisal />}
                        {currentModuleData?.content === 'PreApprovalPowerUp' && <PreApprovalPowerUp />}
                        {currentModuleData?.content === 'PricingIn30Minutes' && <PricingIn30Minutes />}
                        {currentModuleData?.content === 'TransactionTimeline' && <TransactionTimeline />}
                        {currentModuleData?.content === 'Fair' && <Fair />}
                        {currentModuleData?.content === 'Inspection' && <Inspection />}
                        {currentModuleData?.content === 'Listing' && <Listing />}
                        {currentModuleData?.content === 'SOITrainingCourse' && <SOITrainingCourse />}
                        {currentModuleData?.content === 'SkipTracingCourse' && <SkipTracingCourse />}
                        {/* Pro Plan modules */}
                        {currentModuleData?.content === 'HighIncomeClientPsychology' && <HighIncomeClientPsychology />}
                        {currentModuleData?.content === 'MarketCycleStrategy' && <MarketCycleStrategy />}
                        {currentModuleData?.content === 'CompetitiveIntelligence' && <CompetitiveIntelligence />}
                        {currentModuleData?.content === 'CrossSellingRevenue' && <CrossSellingRevenue />}
                        {currentModuleData?.content === 'DatabaseMining' && <DatabaseMining />}
                        {currentModuleData?.content === 'NegotiationMastery' && <NegotiationMastery />}
                        {currentModuleData?.content === 'DefaultContent' && <DefaultContent course={course} />}
                    </div>

                    {/* Module Actions */}
                    <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/20">
                        <div className="flex items-center gap-4">
                            {/* Only show Mark as Complete for featured courses */}
                            {(course.title === 'Skip Tracing Course' || course.title === 'SOI Training Course' || course.title === 'Negotiation Mastery Course') && (
                                <>
                                    {!completedModules.includes(currentModule) && (
                                        <button
                                            onClick={() => handleModuleComplete(currentModule)}
                                            className="flex items-center gap-2 px-6 py-3 bg-[#00D4AA] text-[#1e3a5f] rounded-xl font-semibold hover:bg-[#00D4AA]/90 transition-colors"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            Mark as Complete
                                        </button>
                                    )}
                                    {completedModules.includes(currentModule) && (
                                        <div className="flex items-center gap-2 text-green-400">
                                            <CheckCircle className="w-5 h-5" />
                                            <span className="font-semibold">Completed</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={onBack}
                                className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to Learning
                            </button>

                            {currentModule < modules.length - 1 && (
                                <button
                                    onClick={() => setCurrentModule(currentModule + 1)}
                                    className="flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-xl hover:bg-[#FF6B35]/90 transition-colors"
                                >
                                    Next Module
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Placeholder component for courses without specific content
const DefaultContent = ({ course }) => <div>{course.title} Content</div>;

export default LearningContentPage;
