import React, { useState } from 'react';
import { Button } from '../RealEstate/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../RealEstate/ui/Card';
import { Badge } from '../RealEstate/ui/Badge';
import { Progress } from '../RealEstate/ui/Progress';
import { Clock, CheckCircle } from 'lucide-react';

const SOIModule5 = () => {
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
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-4xl font-bold text-white mb-4">
                    Events & Gatherings
                </h1>
                <Badge className="bg-[var(--primary-color)] text-white mb-4">
                    Module 5 of 6
                </Badge>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Plan client appreciation events, host networking gatherings, and create memorable experiences that generate referrals.
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
                    </div>
                </CardContent>
            </Card>

            {/* Section 1 */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white">Section 1: Client Appreciation Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Learn how to plan and execute client appreciation events that strengthen relationships and generate referrals.
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
                    <CardTitle className="text-white">Section 2: Networking Gatherings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Host networking events that bring your SOI together and create opportunities for mutual referrals.
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
                    <CardTitle className="text-white">Section 3: Event Follow-up Strategy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300">
                        Master the art of following up after events to maximize referral opportunities and relationship building.
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
                    ← Module 4
                </Button>
                <div className="text-center">
                    <p className="text-gray-400">Module 5 of 6 Complete</p>
                </div>
                <Button
                    className="bg-[var(--primary-color)] hover:bg-teal-300 text-white"
                    disabled={progress < 100}
                >
                    Module 6 →
                </Button>
            </div>
        </div>
    );
};

export default SOIModule5;
