import React, { useState } from 'react';
import { Button } from '../RealEstate/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../RealEstate/ui/Card';
import { Badge } from '../RealEstate/ui/Badge';
import { Progress } from '../RealEstate/ui/Progress';
import { Clock, CheckCircle, Award } from 'lucide-react';

const SOIModule6 = () => {
    const [completedSections, setCompletedSections] = useState([]);
    const progress = (completedSections.length / 3) * 100;

    const handleSectionComplete = (sectionId) => {
        if (!completedSections.includes(sectionId)) {
            setCompletedSections([...completedSections, sectionId]);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="text-6xl mb-4">🎯</div>
                <h1 className="text-4xl font-bold text-white mb-4">
                    Referral Generation
                </h1>
                <Badge className="bg-[var(--primary-color)] text-white mb-4">
                    Module 6 of 6
                </Badge>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Master the art of asking for referrals, create referral systems, and track your SOI success metrics.
                </p>
                <div className="flex items-center justify-center space-x-6 mt-6 text-gray-400">
                    <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        30 minutes
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
                    </div>
                </CardContent>
            </Card>

            {/* Section 1 */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white">Section 1: The Art of Asking for Referrals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Learn proven techniques for asking for referrals in a way that feels natural and builds relationships rather than damaging them.
                    </p>

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

            {/* Section 2 */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white">Section 2: Referral System Creation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Build systematic referral systems that make it easy for your SOI to refer business to you consistently.
                    </p>

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

            {/* Section 3 */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white">Section 3: SOI Success Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Track and measure your SOI success to continuously improve your relationship-building strategies.
                    </p>

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

            {/* Course Completion */}
            {progress === 100 && (
                <Card className="border-2 border-green-500">
                    <CardHeader>
                        <CardTitle className="text-white text-center">🎉 Congratulations!</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <Award className="w-16 h-16 text-green-400 mx-auto" />
                        <p className="text-gray-300 text-lg">
                            You've completed the Sphere of Influence to Sales Pipeline course!
                        </p>
                        <p className="text-gray-300">
                            You now have the knowledge and tools to transform your existing network into a consistent referral machine.
                        </p>
                        <Button className="bg-green-500 hover:bg-green-600 text-white">
                            <Award className="w-4 h-4 mr-2" />
                            Download Certificate
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
                <Button
                    variant="outline"
                    className="border-[var(--primary-color)] text-[var(--primary-color)]"
                >
                    ← Module 5
                </Button>
                <div className="text-center">
                    <p className="text-gray-400">Module 6 of 6 Complete</p>
                </div>
                <Button
                    className="bg-[var(--primary-color)] hover:bg-teal-300 text-white"
                    disabled={progress < 100}
                >
                    Course Complete →
                </Button>
            </div>
        </div>
    );
};

export default SOIModule6;
