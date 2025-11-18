import React from 'react';
import { Megaphone, Target, BarChart3, Users, TrendingUp, Calendar, Share2 } from 'lucide-react';

const MarketingHelp = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#34495e] to-[#2c3e50] text-white p-8 rounded-xl mb-8 text-center border border-[#00d4aa]">
                <div className="flex items-center justify-center space-x-3 mb-3">
                    {/* <Megaphone className="w-8 h-8 text-[#00d4aa]" /> */}
                    <h1 className="text-4xl font-bold text-[#00d4aa]">📢Marketing</h1>
                </div>
                <p className="text-lg opacity-90">Comprehensive marketing tools and campaign management</p>
            </div>

            {/* What is Marketing Section */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    What is the Marketing Section?
                </h2>
                <p className="text-[#e1e5e9] mb-4 text-base">
                    The Marketing section is your comprehensive toolkit for creating, managing, and tracking all your marketing campaigns. It provides tools for email marketing, social media management, lead generation, and performance analytics.
                </p>
                <p className="text-[#e1e5e9] text-base">
                    This section helps you build your brand, generate leads, nurture prospects, and measure the effectiveness of your marketing efforts with detailed analytics and reporting.
                </p>
            </div>

            {/* Marketing Tools */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Marketing Tools & Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <Target className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Campaign Builder</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Create targeted marketing campaigns with customizable templates and automated workflows.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Email campaign creation</li>
                            <li>• Social media scheduling</li>
                            <li>• Landing page builder</li>
                            <li>• A/B testing tools</li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <Users className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Lead Generation</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Capture and nurture leads with automated follow-up sequences and lead scoring.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Lead capture forms</li>
                            <li>• Automated follow-ups</li>
                            <li>• Lead scoring system</li>
                            <li>• CRM integration</li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <BarChart3 className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Analytics & Reporting</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Track campaign performance with detailed analytics and ROI reporting.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Campaign performance metrics</li>
                            <li>• ROI tracking</li>
                            <li>• Conversion analytics</li>
                            <li>• Custom reports</li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <Share2 className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Social Media</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Manage your social media presence across multiple platforms.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Multi-platform posting</li>
                            <li>• Content scheduling</li>
                            <li>• Engagement tracking</li>
                            <li>• Social listening</li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <Calendar className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Content Calendar</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Plan and schedule your marketing content across all channels.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Content planning</li>
                            <li>• Editorial calendar</li>
                            <li>• Automated scheduling</li>
                            <li>• Content templates</li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <TrendingUp className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">SEO & Optimization</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Optimize your online presence for better search visibility.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Keyword research</li>
                            <li>• SEO optimization</li>
                            <li>• Local SEO tools</li>
                            <li>• Performance tracking</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Campaign Performance */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Campaign Performance Dashboard
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">2,847</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Total Leads</h4>
                        <p className="text-[#b8c5d1] text-sm">Generated this month</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">18.5%</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Conversion Rate</h4>
                        <p className="text-[#b8c5d1] text-sm">Lead to client</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">$12.4K</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Marketing ROI</h4>
                        <p className="text-[#b8c5d1] text-sm">Return on investment</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">24</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Active Campaigns</h4>
                        <p className="text-[#b8c5d1] text-sm">Currently running</p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Key Performance Indicators</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Lead Generation:</strong> Number of qualified leads generated from marketing campaigns</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Conversion Rate:</strong> Percentage of leads that convert to clients or closed deals</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Marketing ROI:</strong> Return on investment for marketing spend and effort</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Engagement Metrics:</strong> Email open rates, click-through rates, and social media engagement</span>
                    </li>
                </ul>
            </div>

            {/* Marketing Channels */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Marketing Channels
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <h4 className="text-[#00d4aa] font-semibold mb-4">Digital Channels</h4>
                        <ul className="space-y-3">
                            <li className="text-[#e1e5e9] flex items-center justify-between">
                                <span className="text-sm">Email Marketing</span>
                                <span className="text-[#00d4aa] font-medium">45% of leads</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-center justify-between">
                                <span className="text-sm">Social Media</span>
                                <span className="text-[#00d4aa] font-medium">28% of leads</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-center justify-between">
                                <span className="text-sm">Website/Blog</span>
                                <span className="text-[#00d4aa] font-medium">18% of leads</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-center justify-between">
                                <span className="text-sm">Online Advertising</span>
                                <span className="text-[#00d4aa] font-medium">9% of leads</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <h4 className="text-[#00d4aa] font-semibold mb-4">Traditional Channels</h4>
                        <ul className="space-y-3">
                            <li className="text-[#e1e5e9] flex items-center justify-between">
                                <span className="text-sm">Referrals</span>
                                <span className="text-[#00d4aa] font-medium">High conversion</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-center justify-between">
                                <span className="text-sm">Open Houses</span>
                                <span className="text-[#00d4aa] font-medium">Medium conversion</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-center justify-between">
                                <span className="text-sm">Print Advertising</span>
                                <span className="text-[#00d4aa] font-medium">Low conversion</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-center justify-between">
                                <span className="text-sm">Direct Mail</span>
                                <span className="text-[#00d4aa] font-medium">Variable</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Content Marketing */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Content Marketing Strategy
                </h2>

                <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#2c3e50] font-bold text-sm">1</span>
                        </div>
                        <div>
                            <h4 className="text-[#00d4aa] font-semibold mb-2">Educational Content</h4>
                            <p className="text-[#e1e5e9] text-sm">Create valuable content that educates your audience about real estate, market trends, and the buying/selling process.</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#2c3e50] font-bold text-sm">2</span>
                        </div>
                        <div>
                            <h4 className="text-[#00d4aa] font-semibold mb-2">Local Market Insights</h4>
                            <p className="text-[#e1e5e9] text-sm">Share local market data, neighborhood updates, and community information to establish local expertise.</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#2c3e50] font-bold text-sm">3</span>
                        </div>
                        <div>
                            <h4 className="text-[#00d4aa] font-semibold mb-2">Success Stories</h4>
                            <p className="text-[#e1e5e9] text-sm">Highlight client success stories, testimonials, and case studies to build credibility and trust.</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#2c3e50] font-bold text-sm">4</span>
                        </div>
                        <div>
                            <h4 className="text-[#00d4aa] font-semibold mb-2">Visual Content</h4>
                            <p className="text-[#e1e5e9] text-sm">Use high-quality photos, videos, and virtual tours to showcase properties and services effectively.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Best Practices */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Marketing Best Practices
                </h2>

                <div className="bg-[#1e3d59] border-l-4 border-[#00d4aa] p-4 rounded mb-6">
                    <p className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">💡 Pro Tip:</strong> Focus on building relationships rather than just selling. Provide value through educational content and personalized service to create long-term client relationships and generate referrals.
                    </p>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Effective Marketing Strategies</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Consistent Branding:</strong> Maintain consistent messaging, visual identity, and tone across all marketing channels</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Targeted Messaging:</strong> Segment your audience and tailor messages to specific groups and their needs</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Multi-Channel Approach:</strong> Use multiple marketing channels to reach your audience where they are most active</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Regular Analysis:</strong> Continuously monitor and analyze campaign performance to optimize results</span>
                    </li>
                </ul>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4 mt-8">Content Creation Guidelines</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Value-First Approach:</strong> Always provide value to your audience before asking for anything in return</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Authentic Voice:</strong> Be genuine and authentic in your communications to build trust</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Regular Publishing:</strong> Maintain a consistent publishing schedule to keep your audience engaged</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Quality Over Quantity:</strong> Focus on creating high-quality content rather than frequent low-quality posts</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MarketingHelp;
