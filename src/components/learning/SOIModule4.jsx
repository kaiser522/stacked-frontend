import React, { useState } from 'react';
import { Button } from '../RealEstate/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../RealEstate/ui/Card';
import { Badge } from '../RealEstate/ui/Badge';
import { Progress } from '../RealEstate/ui/Progress';
import { Clock, CheckCircle } from 'lucide-react';

const SOIModule4 = () => {
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
                <div className="text-6xl mb-4">📝</div>
                <h1 className="text-4xl font-bold text-white mb-4">
                    Content That Converts
                </h1>
                <Badge className="bg-[var(--primary-color)] text-white mb-4">
                    Module 4 of 6
                </Badge>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Learn what to share that generates referrals, create valuable market updates, and avoid common content mistakes.
                </p>
                <div className="flex items-center justify-center space-x-6 mt-6 text-gray-400">
                    <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        35 minutes
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
                    <CardTitle className="text-white">Section 1: Content Strategy for SOI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Discover what type of content your SOI actually wants to see and how to position yourself as the local real estate expert.
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
                    <CardTitle className="text-white">Section 2: Market Update Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Create compelling market updates that provide value to your SOI while positioning you as the local market expert.
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
                    <CardTitle className="text-white">Section 3: Content Mistakes to Avoid</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Learn the common content mistakes that turn off your SOI and how to create content that builds trust and generates referrals.
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

            {/* Navigation */}
            <div className="flex justify-between items-center">
                <Button
                    variant="outline"
                    className="border-[var(--primary-color)] text-[var(--primary-color)]"
                >
                    ← Module 3
                </Button>
                <div className="text-center">
                    <p className="text-gray-400">Module 4 of 6 Complete</p>
                </div>
                <Button
                    className="bg-[var(--primary-color)] hover:bg-teal-300 text-white"
                    disabled={progress < 100}
                >
                    Module 5 →
                </Button>
            </div>
        </div>
    );
};

export default SOIModule4;
