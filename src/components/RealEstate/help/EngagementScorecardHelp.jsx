import React from 'react';
import { Award, TrendingUp, Users, Target, BarChart3, Clock, CheckCircle } from 'lucide-react';

const EngagementScorecardHelp = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#34495e] to-[#2c3e50] text-white p-8 rounded-xl mb-8 text-center border border-[#00d4aa]">
                <div className="flex items-center justify-center space-x-3 mb-3">
                    {/* <Award className="w-8 h-8 text-[#00d4aa]" /> */}
                    <h1 className="text-4xl font-bold text-[#00d4aa]">📊Engagement Scorecard</h1>
                </div>
                <p className="text-lg opacity-90">Track and measure client engagement levels</p>
            </div>

            {/* What is Engagement Scorecard */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    What is the Engagement Scorecard?
                </h2>
                <p className="text-[#e1e5e9] mb-4 text-base">
                    The Engagement Scorecard is a comprehensive tool that measures and tracks how actively engaged your clients are with your services. It uses advanced algorithms to calculate engagement scores based on various interaction patterns and behaviors.
                </p>
                <p className="text-[#e1e5e9] text-base">
                    This tool helps you identify which clients need more attention, understand relationship health, and optimize your communication strategies for better client retention and satisfaction.
                </p>
            </div>

            {/* Engagement Metrics */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Engagement Metrics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">87%</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Avg. Engagement</h4>
                        <p className="text-[#b8c5d1] text-sm">Overall client engagement</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">92%</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Response Rate</h4>
                        <p className="text-[#b8c5d1] text-sm">Client communication</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">4.8</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Satisfaction</h4>
                        <p className="text-[#b8c5d1] text-sm">Client satisfaction score</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">23</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Referrals</h4>
                        <p className="text-[#b8c5d1] text-sm">This quarter</p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Understanding Engagement Scores</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Engagement Score:</strong> Overall measure of client interaction and satisfaction (0-100 scale)</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Response Rate:</strong> Percentage of communications that receive client responses</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Satisfaction Score:</strong> Client feedback and satisfaction ratings</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Referral Rate:</strong> Number of referrals generated from satisfied clients</span>
                    </li>
                </ul>
            </div>

            {/* Engagement Factors */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Factors That Influence Engagement
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <h4 className="text-[#00d4aa] font-semibold mb-4">Communication Factors</h4>
                        <ul className="space-y-3">
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Email open and response rates</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Phone call participation</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Meeting attendance and punctuality</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Response time to inquiries</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <h4 className="text-[#00d4aa] font-semibold mb-4">Behavioral Factors</h4>
                        <ul className="space-y-3">
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Property viewing participation</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Document completion speed</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Referral generation</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Social media engagement</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Engagement Levels */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Engagement Levels
                </h2>

                <div className="space-y-4">
                    <div className="bg-[#2c3e50] p-4 rounded-lg border-l-4 border-[#10b981]">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-[#10b981] font-semibold">High Engagement (80-100)</h4>
                            <span className="text-[#10b981] font-bold">42 clients</span>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Clients who are highly responsive, participate actively, and show strong satisfaction</p>
                    </div>

                    <div className="bg-[#2c3e50] p-4 rounded-lg border-l-4 border-[#eab308]">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-[#eab308] font-semibold">Medium Engagement (50-79)</h4>
                            <span className="text-[#eab308] font-bold">28 clients</span>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Clients who engage moderately but may need more attention or have specific concerns</p>
                    </div>

                    <div className="bg-[#2c3e50] p-4 rounded-lg border-l-4 border-[#ef4444]">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-[#ef4444] font-semibold">Low Engagement (0-49)</h4>
                            <span className="text-[#ef4444] font-bold">8 clients</span>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Clients who are not responding well and require immediate attention or intervention</p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4 mt-8">Action Strategies by Level</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#10b981] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#10b981]">High Engagement:</strong> Maintain current service level, request referrals, and consider premium services</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#eab308] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#eab308]">Medium Engagement:</strong> Increase communication frequency, address concerns, and provide additional value</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#ef4444] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#ef4444]">Low Engagement:</strong> Immediate intervention, personal outreach, and service recovery efforts</span>
                    </li>
                </ul>
            </div>

            {/* Engagement Trends */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Engagement Trends & Analytics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <h4 className="text-[#00d4aa] font-semibold mb-4">Monthly Trends</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[#e1e5e9] text-sm">Engagement Score</span>
                                <span className="text-[#10b981] font-medium">+5.2% ↗</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#e1e5e9] text-sm">Response Rate</span>
                                <span className="text-[#10b981] font-medium">+2.8% ↗</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#e1e5e9] text-sm">Satisfaction</span>
                                <span className="text-[#10b981] font-medium">+0.3 ↗</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#e1e5e9] text-sm">Referrals</span>
                                <span className="text-[#10b981] font-medium">+4 ↗</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <h4 className="text-[#00d4aa] font-semibold mb-4">Top Engagement Drivers</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[#e1e5e9] text-sm">Quick Response Time</span>
                                <span className="text-[#00d4aa] font-medium">92% impact</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#e1e5e9] text-sm">Personal Communication</span>
                                <span className="text-[#00d4aa] font-medium">88% impact</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#e1e5e9] text-sm">Market Updates</span>
                                <span className="text-[#00d4aa] font-medium">85% impact</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#e1e5e9] text-sm">Proactive Outreach</span>
                                <span className="text-[#00d4aa] font-medium">78% impact</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Best Practices */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Engagement Scorecard Best Practices
                </h2>

                <div className="bg-[#1e3d59] border-l-4 border-[#00d4aa] p-4 rounded mb-6">
                    <p className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">💡 Pro Tip:</strong> Review your engagement scorecard weekly to identify clients who need attention. Focus on moving medium and low engagement clients to higher levels through targeted communication and service improvements.
                    </p>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Improving Client Engagement</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Regular Communication:</strong> Maintain consistent touchpoints with all clients, regardless of transaction status</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Value-Added Content:</strong> Share market insights, property updates, and relevant information regularly</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Personal Touch:</strong> Customize communications and remember important details about each client</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Proactive Service:</strong> Anticipate client needs and reach out before they have to ask</span>
                    </li>
                </ul>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4 mt-8">Using Engagement Data</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Priority Management:</strong> Focus your time and energy on clients with declining engagement scores</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Service Optimization:</strong> Identify patterns in low engagement to improve your service delivery</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Referral Strategy:</strong> Leverage high-engagement clients for referrals and testimonials</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Performance Tracking:</strong> Monitor engagement trends to measure the effectiveness of your client relationship strategies</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default EngagementScorecardHelp;
