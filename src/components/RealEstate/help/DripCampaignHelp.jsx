import React from 'react';
import { Mail, Send, Users, BarChart3, Clock, Target, Plus } from 'lucide-react';

const DripCampaignHelp = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#34495e] to-[#2c3e50] text-white p-8 rounded-xl mb-8 text-center border border-[#00d4aa]">
                <div className="flex items-center justify-center space-x-3 mb-3">
                    {/* <Mail className="w-8 h-8 text-[#00d4aa]" /> */}
                    <h1 className="text-4xl font-bold text-[#00d4aa]">📧Drip Campaigns</h1>
                </div>
                <p className="text-lg opacity-90">Automated email marketing for lead nurturing</p>
            </div>

            {/* What are Drip Campaigns */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    What are Drip Campaigns?
                </h2>
                <p className="text-[#e1e5e9] mb-4 text-base">
                    Drip campaigns are automated email sequences designed to nurture leads and maintain relationships with clients over time. They send a series of pre-written emails at predetermined intervals to guide prospects through your sales funnel.
                </p>
                <p className="text-[#e1e5e9] text-base">
                    These campaigns help you stay top-of-mind with potential clients, provide valuable information, and build trust while automating your follow-up process.
                </p>
            </div>

            {/* Campaign Types */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Campaign Types
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <Users className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">New Lead Nurturing</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Welcome new leads and introduce them to your services with a series of educational emails.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Welcome message and introduction</li>
                            <li>• Local market insights</li>
                            <li>• Success stories and testimonials</li>
                            <li>• Call-to-action for consultation</li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <Target className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Buyer Education</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Educate potential buyers about the home buying process and market conditions.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Home buying process overview</li>
                            <li>• Financing and pre-approval tips</li>
                            <li>• Market trends and insights</li>
                            <li>• Property search strategies</li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <BarChart3 className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Seller Preparation</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Guide sellers through the process of preparing their home for sale.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Home staging tips</li>
                            <li>• Pricing strategies</li>
                            <li>• Marketing preparation</li>
                            <li>• Negotiation insights</li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <Clock className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Follow-up Sequences</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Maintain relationships with past clients and generate referrals.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Post-transaction follow-up</li>
                            <li>• Market updates and insights</li>
                            <li>• Referral requests</li>
                            <li>• Holiday and seasonal messages</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Campaign Performance */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Campaign Performance Metrics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">24.5%</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Open Rate</h4>
                        <p className="text-[#b8c5d1] text-sm">Average across all campaigns</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">3.8%</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Click Rate</h4>
                        <p className="text-[#b8c5d1] text-sm">Link clicks per email</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">12</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Active Campaigns</h4>
                        <p className="text-[#b8c5d1] text-sm">Currently running</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">1,247</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Total Subscribers</h4>
                        <p className="text-[#b8c5d1] text-sm">Across all campaigns</p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Understanding Performance Metrics</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Open Rate:</strong> Percentage of recipients who open your emails (industry average: 20-25%)</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Click Rate:</strong> Percentage of recipients who click links in your emails (industry average: 2-3%)</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Conversion Rate:</strong> Percentage of email recipients who take desired action (schedule meeting, request info)</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Unsubscribe Rate:</strong> Percentage of recipients who opt out (keep below 2%)</span>
                    </li>
                </ul>
            </div>

            {/* Campaign Creation */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Creating Effective Drip Campaigns
                </h2>

                <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#2c3e50] font-bold text-sm">1</span>
                        </div>
                        <div>
                            <h4 className="text-[#00d4aa] font-semibold mb-2">Define Your Goal</h4>
                            <p className="text-[#e1e5e9] text-sm">Determine what you want to achieve with your campaign - lead nurturing, education, or relationship building.</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#2c3e50] font-bold text-sm">2</span>
                        </div>
                        <div>
                            <h4 className="text-[#00d4aa] font-semibold mb-2">Create Email Sequence</h4>
                            <p className="text-[#e1e5e9] text-sm">Write 3-7 emails that provide value and guide recipients toward your desired action.</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#2c3e50] font-bold text-sm">3</span>
                        </div>
                        <div>
                            <h4 className="text-[#00d4aa] font-semibold mb-2">Set Timing</h4>
                            <p className="text-[#e1e5e9] text-sm">Schedule emails with appropriate intervals - daily for urgent campaigns, weekly for educational content.</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#2c3e50] font-bold text-sm">4</span>
                        </div>
                        <div>
                            <h4 className="text-[#00d4aa] font-semibold mb-2">Segment Your Audience</h4>
                            <p className="text-[#e1e5e9] text-sm">Target specific groups based on their interests, behavior, or stage in the buying process.</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#2c3e50] font-bold text-sm">5</span>
                        </div>
                        <div>
                            <h4 className="text-[#00d4aa] font-semibold mb-2">Test and Optimize</h4>
                            <p className="text-[#e1e5e9] text-sm">Monitor performance and adjust subject lines, content, and timing based on results.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Best Practices */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Drip Campaign Best Practices
                </h2>

                <div className="bg-[#1e3d59] border-l-4 border-[#00d4aa] p-4 rounded mb-6">
                    <p className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">💡 Pro Tip:</strong> Focus on providing value in every email. Educational content, market insights, and helpful tips will keep your audience engaged and build trust over time.
                    </p>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Content Strategy</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Educational Focus:</strong> Provide valuable information that helps recipients make informed decisions</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Personal Touch:</strong> Use personalization to make emails feel relevant and targeted</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Clear Calls-to-Action:</strong> Include specific next steps for recipients to take</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Consistent Branding:</strong> Maintain your professional image across all communications</span>
                    </li>
                </ul>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4 mt-8">Timing and Frequency</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Optimal Timing:</strong> Send emails on Tuesday-Thursday between 10 AM and 2 PM for best engagement</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Frequency Balance:</strong> Don't overwhelm recipients - space emails appropriately (weekly or bi-weekly)</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Respect Preferences:</strong> Always provide easy unsubscribe options and honor opt-out requests</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DripCampaignHelp;
