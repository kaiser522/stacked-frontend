import React, { useState, useEffect } from 'react';
import { Button } from '../RealEstate/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../RealEstate/ui/Card';
import { Badge } from '../RealEstate/ui/Badge';
import { Progress } from '../RealEstate/ui/Progress';
import {
    Clock,
    BookOpen,
    Star,
    Users,
    CheckCircle,
    Play,
    Lock,
    Award,
    TrendingUp,
    Target,
    DollarSign,
    Zap,
    ChevronRight,
    AlertTriangle,
    Database,
    Settings,
    Tag,
    Mail
} from 'lucide-react';

const SOIModule2 = () => {
    const [completedSections, setCompletedSections] = useState([]);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizResults, setQuizResults] = useState({});
    const [showResults, setShowResults] = useState({});

    const totalSections = 3;
    const totalQuizzes = 3;
    const progress = ((completedSections.length + completedQuizzes.length) / (totalSections + totalQuizzes)) * 100;

    const quizAnswers = {
        1: { 1: 'c', 2: 'b', 3: 'b' },
        2: { 1: 'b', 2: 'b', 3: 'c' },
        3: { 1: 'd', 2: 'b', 3: 'c' }
    };

    const handleSectionComplete = (sectionId) => {
        if (!completedSections.includes(sectionId)) {
            setCompletedSections([...completedSections, sectionId]);
        }
    };

    const handleAnswerSelect = (quizId, questionId, answer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [`${quizId}-${questionId}`]: answer
        });
    };

    const checkQuiz = (quizId) => {
        const questions = document.querySelectorAll(`[data-quiz="${quizId}"] .question`);
        let correct = 0;
        let total = questions.length;

        questions.forEach((question, index) => {
            const questionNum = index + 1;
            const selectedAnswer = selectedAnswers[`${quizId}-${questionNum}`];
            const correctAnswer = quizAnswers[quizId][questionNum];

            if (selectedAnswer === correctAnswer) {
                correct++;
            }
        });

        const percentage = Math.round((correct / total) * 100);
        setQuizResults({
            ...quizResults,
            [quizId]: { correct, total, percentage }
        });
        setShowResults({
            ...showResults,
            [quizId]: true
        });

        if (percentage >= 80) {
            if (!completedQuizzes.includes(quizId)) {
                setCompletedQuizzes([...completedQuizzes, quizId]);
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="text-6xl mb-4">📊</div>
                <h1 className="text-4xl font-bold text-white mb-4">
                    Database Management
                </h1>
                <Badge className="bg-[var(--primary-color)] text-white mb-4">
                    Module 2 of 6
                </Badge>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Organize contacts in your CRM effectively, create smart segmentation strategies, and build automated workflow systems for consistent SOI nurturing.
                </p>
                <div className="flex items-center justify-center space-x-6 mt-6 text-gray-400">
                    <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        40 minutes
                    </span>
                </div>
            </div>

            {/* Progress Tracker */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white">Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">Module Progress</span>
                            <span className="text-white font-semibold">{Math.round(progress)}% Complete</span>
                        </div>
                        <Progress value={progress} className="h-3" />
                        <p className="text-center text-gray-400 text-sm">
                            Complete each section and quiz to progress
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Section 1: CRM Setup Strategy */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white">Section 1: CRM Setup Strategy for SOI Success</CardTitle>
                    <p className="text-gray-400">Estimated Reading Time: 10 minutes</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Your CRM is the engine that powers your SOI success. Most agents treat their CRM as a simple contact list, missing the opportunity to create a sophisticated relationship management system that generates consistent referrals.
                    </p>

                    <div className="bg-[var(--medium-dark)] p-6 rounded-lg border-2 border-[var(--primary-color)]">
                        <h3 className="text-[var(--primary-color)] text-xl font-semibold mb-4">The SOI-Focused CRM Philosophy</h3>
                        <p className="text-gray-300">
                            Your CRM should be organized around relationship strength and business potential, not just chronological contact entry. Every contact should have a clear path for nurturing and a system for tracking relationship quality over time.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-4">Essential CRM Features for SOI Management</h3>
                        <p className="text-gray-300 mb-6">
                            Not all CRMs are created equal for relationship management. Look for these crucial features:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[var(--lighter-dark)] p-6 rounded-lg border-2 border-[var(--primary-color)]">
                                <h4 className="text-[var(--primary-color)] text-lg font-semibold mb-4">Must-Have Features</h4>
                                <ul className="text-gray-300 space-y-2">
                                    <li>• Custom fields for SOI data</li>
                                    <li>• Tagging and segmentation tools</li>
                                    <li>• Automated drip campaigns</li>
                                    <li>• Activity and interaction tracking</li>
                                    <li>• Birthday and anniversary reminders</li>
                                    <li>• Notes and conversation history</li>
                                    <li>• Integration with email and social media</li>
                                </ul>
                            </div>

                            <div className="bg-[var(--lighter-dark)] p-6 rounded-lg border-2 border-yellow-500">
                                <h4 className="text-yellow-500 text-lg font-semibold mb-4">Nice-to-Have Features</h4>
                                <ul className="text-gray-300 space-y-2">
                                    <li>• Social media monitoring</li>
                                    <li>• Task automation workflows</li>
                                    <li>• Referral tracking and attribution</li>
                                    <li>• Pipeline management</li>
                                    <li>• Mobile app synchronization</li>
                                    <li>• Reporting and analytics</li>
                                    <li>• Integration with other tools</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-4">STACKED CRM SOI Configuration</h3>
                        <p className="text-gray-300 mb-6">
                            Here's how to optimize STACKED CRM specifically for SOI management:
                        </p>

                        <div className="overflow-x-auto">
                            <table className="w-full bg-[var(--medium-dark)] rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-[var(--primary-color)]/30">
                                        <th className="text-left p-4 text-[var(--primary-color)] font-semibold">Configuration Area</th>
                                        <th className="text-left p-4 text-[var(--primary-color)] font-semibold">Setup Required</th>
                                        <th className="text-left p-4 text-[var(--primary-color)] font-semibold">SOI Benefit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-600">
                                        <td className="p-4 text-white font-semibold">Custom Fields</td>
                                        <td className="p-4 text-gray-300">SOI Tier, Relationship Type, Referral Potential</td>
                                        <td className="p-4 text-gray-300">Quick categorization and prioritization</td>
                                    </tr>
                                    <tr className="border-b border-gray-600">
                                        <td className="p-4 text-white font-semibold">Tags System</td>
                                        <td className="p-4 text-gray-300">Create 15-20 relationship and interest tags</td>
                                        <td className="p-4 text-gray-300">Smart segmentation for targeted outreach</td>
                                    </tr>
                                    <tr className="border-b border-gray-600">
                                        <td className="p-4 text-white font-semibold">Pipeline Stages</td>
                                        <td className="p-4 text-gray-300">SOI nurturing stages vs transaction stages</td>
                                        <td className="p-4 text-gray-300">Track relationship development progress</td>
                                    </tr>
                                    <tr className="border-b border-gray-600">
                                        <td className="p-4 text-white font-semibold">Email Templates</td>
                                        <td className="p-4 text-gray-300">SOI-specific message templates</td>
                                        <td className="p-4 text-gray-300">Consistent, personalized communication</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-white font-semibold">Automation Rules</td>
                                        <td className="p-4 text-gray-300">Birthday alerts, follow-up reminders</td>
                                        <td className="p-4 text-gray-300">Never miss important touchpoints</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-red-500/20 border-2 border-red-500 p-6 rounded-lg text-center">
                        <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                        <p className="text-red-400 font-semibold text-lg">
                            Common Mistake: Agents import contacts without any organization strategy, creating a chaotic database that becomes harder to manage over time.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            className="bg-[var(--primary-color)] hover:bg-teal-300 text-white"
                            onClick={() => handleSectionComplete(1)}
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Section 1 Complete
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Quiz 1 */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white">Section 1 Quiz</CardTitle>
                    <p className="text-gray-400">Test your understanding of CRM setup strategy</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-white font-semibold mb-3">1. What should be the primary organizing principle for an SOI-focused CRM?</h4>
                            <div className="space-y-2">
                                {[
                                    "Chronological order of contact entry",
                                    "Alphabetical sorting by last name",
                                    "Relationship strength and business potential",
                                    "Geographic location"
                                ].map((option, index) => (
                                    <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="q1"
                                            value={String.fromCharCode(97 + index)}
                                            onChange={() => handleAnswerSelect(1, 1, String.fromCharCode(97 + index))}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-gray-300">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-3">2. Which CRM feature is most essential for SOI management?</h4>
                            <div className="space-y-2">
                                {[
                                    "Advanced reporting capabilities",
                                    "Tagging and segmentation tools",
                                    "Integration with accounting software",
                                    "Video calling features"
                                ].map((option, index) => (
                                    <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="q2"
                                            value={String.fromCharCode(97 + index)}
                                            onChange={() => handleAnswerSelect(1, 2, String.fromCharCode(97 + index))}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-gray-300">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-3">3. What is the biggest mistake agents make when setting up their CRM?</h4>
                            <div className="space-y-2">
                                {[
                                    "Choosing expensive software",
                                    "Importing contacts without organization strategy",
                                    "Using too many custom fields",
                                    "Setting up too many email templates"
                                ].map((option, index) => (
                                    <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="q3"
                                            value={String.fromCharCode(97 + index)}
                                            onChange={() => handleAnswerSelect(1, 3, String.fromCharCode(97 + index))}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-gray-300">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            className="bg-[var(--primary-color)] hover:bg-teal-300 text-white"
                            onClick={() => checkQuiz(1)}
                        >
                            Check Answers
                        </Button>
                    </div>

                    {showResults[1] && (
                        <div className="bg-[var(--medium-dark)] p-4 rounded-lg text-center">
                            <p className="text-white">
                                {quizResults[1]?.percentage >= 80
                                    ? `Excellent! You scored ${quizResults[1]?.correct}/${quizResults[1]?.total} (${quizResults[1]?.percentage}%)`
                                    : `Good effort! You scored ${quizResults[1]?.correct}/${quizResults[1]?.total} (${quizResults[1]?.percentage}%). Review the material and try again.`
                                }
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Section 2: Data Import and Organization */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white">Section 2: Data Import and Organization Systems</CardTitle>
                    <p className="text-gray-400">Estimated Reading Time: 12 minutes</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Importing your SOI audit results into your CRM requires a systematic approach. The goal is to create a clean, organized database that becomes more valuable over time, not more cluttered.
                    </p>

                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-4">The Four-Phase Import Strategy</h3>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xl font-semibold text-white mb-3">Phase 1: Data Cleaning and Preparation</h4>
                                <p className="text-gray-300 mb-4">Before importing anything, clean your data:</p>
                                <ul className="text-gray-300 space-y-2 ml-4">
                                    <li>• <strong>Remove Duplicates:</strong> Use tools like Excel's duplicate removal or Google Sheets to identify duplicates</li>
                                    <li>• <strong>Standardize Formats:</strong> Consistent phone number formats, proper capitalization</li>
                                    <li>• <strong>Validate Information:</strong> Check email addresses, verify phone numbers</li>
                                    <li>• <strong>Complete Missing Data:</strong> Fill in gaps using social media research</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-white mb-3">Phase 2: Strategic Batching</h4>
                                <p className="text-gray-300 mb-4">Import contacts in strategic batches to maintain quality:</p>

                                <div className="bg-[var(--lighter-dark)] p-6 rounded-lg">
                                    <h4 className="text-[var(--primary-color)] text-lg font-semibold mb-4">Recommended Import Order</h4>
                                    <ul className="text-gray-300 space-y-2">
                                        <li>• <strong>Batch 1:</strong> Tier 1 VIP Champions (highest priority setup)</li>
                                        <li>• <strong>Batch 2:</strong> Past clients and professional contacts</li>
                                        <li>• <strong>Batch 3:</strong> Tier 2 Active Network</li>
                                        <li>• <strong>Batch 4:</strong> Tier 3 and 4 contacts</li>
                                    </ul>
                                    <p className="text-[var(--primary-color)] font-semibold mt-4">Why this works: You perfect your system on your most important contacts first</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            className="bg-[var(--primary-color)] hover:bg-teal-300 text-white"
                            onClick={() => handleSectionComplete(2)}
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Section 2 Complete
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Section 3: Custom Field Strategy */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white">Section 3: Custom Field Strategy</CardTitle>
                    <p className="text-gray-400">Estimated Reading Time: 18 minutes</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Design custom fields that support your SOI strategy:
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-[var(--medium-dark)] rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-[var(--primary-color)]/30">
                                    <th className="text-left p-4 text-[var(--primary-color)] font-semibold">Custom Field</th>
                                    <th className="text-left p-4 text-[var(--primary-color)] font-semibold">Purpose</th>
                                    <th className="text-left p-4 text-[var(--primary-color)] font-semibold">Example Values</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-600">
                                    <td className="p-4 text-white font-semibold">SOI Tier</td>
                                    <td className="p-4 text-gray-300">Prioritization level</td>
                                    <td className="p-4 text-gray-300">Tier 1, Tier 2, Tier 3, Tier 4</td>
                                </tr>
                                <tr className="border-b border-gray-600">
                                    <td className="p-4 text-white font-semibold">Relationship Type</td>
                                    <td className="p-4 text-gray-300">Connection category</td>
                                    <td className="p-4 text-gray-300">Past Client, Family, Professional, Friend</td>
                                </tr>
                                <tr className="border-b border-gray-600">
                                    <td className="p-4 text-white font-semibold">Referral Potential</td>
                                    <td className="p-4 text-gray-300">Business opportunity rating</td>
                                    <td className="p-4 text-gray-300">High, Medium, Low</td>
                                </tr>
                                <tr className="border-b border-gray-600">
                                    <td className="p-4 text-white font-semibold">Influence Score</td>
                                    <td className="p-4 text-gray-300">Network connection strength</td>
                                    <td className="p-4 text-gray-300">1-10 scale</td>
                                </tr>
                                <tr className="border-b border-gray-600">
                                    <td className="p-4 text-white font-semibold">Last Personal Contact</td>
                                    <td className="p-4 text-gray-300">Relationship maintenance tracking</td>
                                    <td className="p-4 text-gray-300">Date field</td>
                                </tr>
                                <tr className="border-b border-gray-600">
                                    <td className="p-4 text-white font-semibold">Communication Preference</td>
                                    <td className="p-4 text-gray-300">Preferred contact method</td>
                                    <td className="p-4 text-gray-300">Email, Phone, Text, Social Media</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-white font-semibold">Life Events</td>
                                    <td className="p-4 text-gray-300">Important personal information</td>
                                    <td className="p-4 text-gray-300">New Baby, Job Change, Moving, etc.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-[var(--lighter-dark)] p-6 rounded-lg">
                        <h4 className="text-[var(--primary-color)] text-lg font-semibold mb-4">Data Organization Success Story</h4>
                        <div className="space-y-2 text-gray-300">
                            <p><strong>Agent:</strong> Lisa Rodriguez, 4 years experience</p>
                            <p><strong>Challenge:</strong> 1,200 contacts in chaos - no organization system</p>
                            <p><strong>Solution:</strong> Implemented 4-phase import strategy over 3 weeks</p>
                            <p><strong>Results:</strong></p>
                            <ul className="ml-4 space-y-1">
                                <li>• Identified 67 Tier 1 contacts previously overlooked</li>
                                <li>• Created targeted campaigns for each relationship type</li>
                                <li>• Increased referral contacts by 340% in first 6 months</li>
                                <li>• Reduced time spent on database management by 60%</li>
                            </ul>
                            <p className="text-[var(--primary-color)] font-semibold mt-4">Key Success Factor: Took time to organize properly instead of rushing the import</p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            className="bg-[var(--primary-color)] hover:bg-teal-300 text-white"
                            onClick={() => handleSectionComplete(3)}
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Section 3 Complete
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
                <Button
                    variant="outline"
                    className="border-[var(--primary-color)] text-[var(--primary-color)]"
                >
                    ← Module 1
                </Button>
                <div className="text-center">
                    <p className="text-gray-400">Module 2 of 6 Complete</p>
                </div>
                <Button
                    className="bg-[var(--primary-color)] hover:bg-teal-300 text-white"
                    disabled={progress < 100}
                >
                    Module 3 →
                </Button>
            </div>
        </div>
    );
};

export default SOIModule2;
