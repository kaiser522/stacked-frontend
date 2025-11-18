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
    AlertTriangle
} from 'lucide-react';

const SOIModule1 = () => {
    const [completedSections, setCompletedSections] = useState([]);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizResults, setQuizResults] = useState({});
    const [showResults, setShowResults] = useState({});

    const totalSections = 4;
    const totalQuizzes = 4;
    const progress = ((completedSections.length + completedQuizzes.length) / (totalSections + totalQuizzes)) * 100;

    const quizAnswers = {
        1: { 1: 'c', 2: 'c', 3: 'b' },
        2: { 1: 'a', 2: 'c', 3: 'c' },
        3: { 1: 'd', 2: 'b', 3: 'c' },
        'final': { 1: 'c', 2: 'a', 3: 'c', 4: 'c', 5: 'c' }
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
        const quiz = document.querySelector(`[data-quiz="${quizId}"]`);
        const questions = quiz.querySelectorAll('.question');
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

    const handleTeaserAnswer = () => {
        const userAnswer = parseInt(document.getElementById('teaserAnswer')?.value || 0);
        const correctAnswer = 230;

        if (Math.abs(userAnswer - correctAnswer) <= 5) {
            alert(`Excellent! Your SOI has potential for approximately ${correctAnswer} referrals annually!`);
        } else {
            alert(`Not quite. The answer is approximately ${correctAnswer} referrals per year.`);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="text-6xl mb-4">🤝</div>
                <h1 className="text-4xl font-bold text-white mb-4">
                    SOI Fundamentals
                </h1>
                <Badge className="bg-[var(--primary-color)] text-white mb-4">
                    Module 1 of 6
                </Badge>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Define and categorize your sphere of influence, understand relationship mapping, and identify your most valuable contacts for business development.
                </p>
                <div className="flex items-center justify-center space-x-6 mt-6 text-gray-400">
                    <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        45 minutes
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

            {/* Section 1: What is Your SOI? */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white">Section 1: What is Your Sphere of Influence?</CardTitle>
                    <p className="text-gray-400">Estimated Reading Time: 12 minutes</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Your Sphere of Influence (SOI) is the network of people who know you personally and professionally. Unlike cold leads or strangers, these individuals already have an established relationship with you and some level of trust. They represent your most valuable source of referrals and repeat business.
                    </p>

                    <div className="bg-[var(--medium-dark)] p-6 rounded-lg border-2 border-[var(--primary-color)]">
                        <h3 className="text-[var(--primary-color)] text-xl font-semibold mb-4">Key Definition</h3>
                        <p className="text-gray-300">
                            <strong>Sphere of Influence:</strong> Everyone you know who could potentially refer business to you, buy from you again, or influence others to work with you. This includes personal relationships, professional contacts, and past clients.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-4">The Hidden Goldmine in Your Phone</h3>
                        <p className="text-gray-300 mb-4">
                            Most agents underestimate the value of their existing network. Research shows that the average person knows 250-300 people well enough to have their contact information. Among those contacts:
                        </p>

                        <ul className="text-gray-300 space-y-2 ml-4">
                            <li><strong>73% of people</strong> move within 10 years and need real estate services</li>
                            <li><strong>Each person influences</strong> an average of 8-12 other potential buyers/sellers</li>
                            <li><strong>Referral conversions</strong> are 5x higher than cold leads</li>
                            <li><strong>Cost to nurture</strong> existing relationships is 90% less than acquiring new leads</li>
                        </ul>
                    </div>

                    <div className="bg-[var(--lighter-dark)] p-6 rounded-lg">
                        <h4 className="text-[var(--primary-color)] text-lg font-semibold mb-4">Real-World SOI Math</h4>
                        <div className="space-y-2 text-gray-300">
                            <p><strong>Average Agent Contacts:</strong> 300 people in their sphere</p>
                            <p><strong>Annual Transaction Potential:</strong> 300 × 0.05 (5% move yearly) = 15 transactions</p>
                            <p><strong>Referral Multiplier:</strong> 15 × 2.3 (average referrals per transaction) = 34.5 potential deals</p>
                            <p><strong>Revenue Impact:</strong> 34.5 transactions × $8,000 average commission = $276,000 annually</p>
                            <p className="text-[var(--primary-color)] font-semibold">Key Point: This assumes proper SOI nurturing - most agents only capture 10-20% of this potential</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-4">Why Agents Neglect Their SOI</h3>
                        <p className="text-gray-300 mb-4">
                            Despite the clear value, most agents focus on expensive lead generation instead of nurturing existing relationships. Common reasons include:
                        </p>

                        <ul className="text-gray-300 space-y-2 ml-4">
                            <li><strong>Lack of System:</strong> No organized approach to stay in touch</li>
                            <li><strong>Fear of Being Pushy:</strong> Worry about mixing business with personal relationships</li>
                            <li><strong>Impatience:</strong> SOI nurturing takes time - paid leads feel faster</li>
                            <li><strong>Underestimation:</strong> Don't realize the referral potential in their network</li>
                            <li><strong>No Tracking:</strong> Can't measure what they don't monitor</li>
                        </ul>
                    </div>

                    <div className="bg-red-500/20 border-2 border-red-500 p-6 rounded-lg text-center">
                        <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                        <p className="text-red-400 font-semibold text-lg">
                            The #1 mistake agents make: Chasing expensive leads while ignoring the goldmine in their existing relationships.
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
                    <p className="text-gray-400">Test your understanding of SOI fundamentals</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-white font-semibold mb-3">1. What percentage of people move within 10 years, requiring real estate services?</h4>
                            <div className="space-y-2">
                                {['45%', '60%', '73%', '85%'].map((option, index) => (
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
                            <h4 className="text-white font-semibold mb-3">2. How much higher are referral conversion rates compared to cold leads?</h4>
                            <div className="space-y-2">
                                {['2x higher', '3x higher', '5x higher', '10x higher'].map((option, index) => (
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
                            <h4 className="text-white font-semibold mb-3">3. What is the main reason agents neglect their SOI?</h4>
                            <div className="space-y-2">
                                {[
                                    "SOI contacts aren't valuable",
                                    "Lack of organized system to stay in touch",
                                    "Referrals don't convert well",
                                    "It's too expensive to maintain"
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

            {/* Section 2: The Five SOI Categories */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white">Section 2: The Five SOI Categories</CardTitle>
                    <p className="text-gray-400">Estimated Reading Time: 15 minutes</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Not all relationships are equal in terms of business potential. To maximize your SOI effectiveness, you need to categorize contacts based on their relationship type, influence level, and referral potential.
                    </p>

                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-4">The SOI Pyramid Framework</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[var(--lighter-dark)] p-6 rounded-lg border-2 border-[var(--primary-color)]">
                                <h4 className="text-[var(--primary-color)] text-lg font-semibold mb-4">Tier 1: VIP Champions (Top 5%)</h4>
                                <ul className="text-gray-300 space-y-2">
                                    <li>• Past clients who loved working with you</li>
                                    <li>• Close family and friends</li>
                                    <li>• Business partners and colleagues</li>
                                    <li>• Community leaders and influencers</li>
                                    <li><strong>Contact Frequency:</strong> Monthly</li>
                                    <li><strong>Expected Referrals:</strong> 2-5 per year each</li>
                                </ul>
                            </div>

                            <div className="bg-[var(--lighter-dark)] p-6 rounded-lg border-2 border-yellow-500">
                                <h4 className="text-yellow-500 text-lg font-semibold mb-4">Tier 2: Active Network (15%)</h4>
                                <ul className="text-gray-300 space-y-2">
                                    <li>• Recent past clients</li>
                                    <li>• Professional contacts</li>
                                    <li>• Active social connections</li>
                                    <li>• Service providers you use</li>
                                    <li><strong>Contact Frequency:</strong> Quarterly</li>
                                    <li><strong>Expected Referrals:</strong> 1-2 per year each</li>
                                </ul>
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

            {/* Brain Teaser Challenge */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white">SOI Potential Calculator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-300">
                        You complete your SOI audit and discover 312 total contacts. Using the tier system, you categorize them as follows: 18 Tier 1 contacts, 47 Tier 2 contacts, 94 Tier 3 contacts, and 153 Tier 4 contacts. If each Tier 1 contact generates an average of 3.5 referrals annually, Tier 2 generates 1.5, Tier 3 generates 0.7, and Tier 4 generates 0.2, what's your total annual referral potential?
                    </p>

                    <div className="flex items-center space-x-4">
                        <input
                            type="number"
                            id="teaserAnswer"
                            placeholder="Enter total referrals"
                            className="bg-[var(--medium-dark)] border border-[var(--primary-color)] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        />
                        <Button
                            className="bg-[var(--primary-color)] hover:bg-teal-300 text-white"
                            onClick={handleTeaserAnswer}
                        >
                            Calculate My Potential
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
                    ← Course Overview
                </Button>
                <div className="text-center">
                    <p className="text-gray-400">Module 1 of 6 Complete</p>
                </div>
                <Button
                    className="bg-[var(--primary-color)] hover:bg-teal-300 text-white"
                    disabled={progress < 100}
                >
                    Module 2 →
                </Button>
            </div>
        </div>
    );
};

export default SOIModule1;
