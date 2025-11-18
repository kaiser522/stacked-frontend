import React from 'react';
import { BarChart3, TrendingUp, Users, Building, Calendar, FileText, Clock, Target } from 'lucide-react';

const DashboardHelp = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#34495e] to-[#2c3e50] text-white p-8 rounded-xl mb-8 text-center border border-[#00d4aa]">
                <div className="flex items-center justify-center space-x-3 mb-3">
                    {/* <BarChart3 className="w-8 h-8 text-[#00d4aa]" /> */}
                    <h1 className="text-4xl font-bold text-[#00d4aa]">📊 Dashboard</h1>
                </div>
                <p className="text-lg opacity-90">Your real estate business overview and performance center</p>
            </div>

            {/* What is Dashboard */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    What is the Dashboard?
                </h2>
                <p className="text-[#e1e5e9] mb-4 text-base">
                    The Dashboard is your command center, providing a comprehensive overview of your real estate business at a glance. It combines key performance metrics, recent activities, and quick access to all major features in one centralized location.
                </p>
                <p className="text-[#e1e5e9] text-base">
                    Designed for efficiency, the Dashboard helps you stay organized, track your progress, and make informed decisions about your business strategy.
                </p>
            </div>

            {/* Key Metrics Section */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Key Performance Metrics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="flex items-center justify-center mb-3">
                            <Building className="w-8 h-8 text-[#00d4aa]" />
                        </div>
                        <h4 className="text-[#00d4aa] font-semibold text-sm uppercase tracking-wider mb-2">Total Properties</h4>
                        <div className="text-2xl font-bold text-[#e1e5e9] mb-1">24</div>
                        <div className="text-xs text-[#b8c5d1]">Active listings</div>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="flex items-center justify-center mb-3">
                            <Users className="w-8 h-8 text-[#00d4aa]" />
                        </div>
                        <h4 className="text-[#00d4aa] font-semibold text-sm uppercase tracking-wider mb-2">Active Clients</h4>
                        <div className="text-2xl font-bold text-[#e1e5e9] mb-1">18</div>
                        <div className="text-xs text-[#b8c5d1]">In pipeline</div>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="flex items-center justify-center mb-3">
                            <TrendingUp className="w-8 h-8 text-[#00d4aa]" />
                        </div>
                        <h4 className="text-[#00d4aa] font-semibold text-sm uppercase tracking-wider mb-2">Monthly Revenue</h4>
                        <div className="text-2xl font-bold text-[#e1e5e9] mb-1">$45K</div>
                        <div className="text-xs text-[#b8c5d1]">This month</div>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="flex items-center justify-center mb-3">
                            <Target className="w-8 h-8 text-[#00d4aa]" />
                        </div>
                        <h4 className="text-[#00d4aa] font-semibold text-sm uppercase tracking-wider mb-2">Conversion Rate</h4>
                        <div className="text-2xl font-bold text-[#e1e5e9] mb-1">23%</div>
                        <div className="text-xs text-[#b8c5d1]">Lead to close</div>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Understanding Your Metrics</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Total Properties:</strong> All active listings across all views (All Properties, My Listings, Favorites)</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Active Clients:</strong> Clients currently in your pipeline with active deals or ongoing relationships</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Monthly Revenue:</strong> Total commission earned in the current month from closed deals</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Conversion Rate:</strong> Percentage of leads that successfully close as deals</span>
                    </li>
                </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Quick Actions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <Building className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Add Property</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Create new property listings quickly</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <Users className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Add Client</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Register new clients and leads</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <Calendar className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Schedule Meeting</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Book appointments and viewings</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <FileText className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">View Documents</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Access important files and contracts</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <TrendingUp className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Analytics</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Review performance insights</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <Clock className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Recent Activity</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">View latest system updates</p>
                    </div>
                </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Recent Activity Feed
                </h2>

                <div className="space-y-4">
                    <div className="bg-[#2c3e50] p-4 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#00d4aa] rounded-full flex items-center justify-center">
                                <Building className="w-5 h-5 text-[#2c3e50]" />
                            </div>
                            <div>
                                <p className="text-[#e1e5e9] font-medium">New property listing added</p>
                                <p className="text-[#b8c5d1] text-sm">123 Oak Street - 2 hours ago</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#2c3e50] p-4 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#00d4aa] rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-[#2c3e50]" />
                            </div>
                            <div>
                                <p className="text-[#e1e5e9] font-medium">Client meeting scheduled</p>
                                <p className="text-[#b8c5d1] text-sm">Sarah Johnson - Tomorrow 2:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#2c3e50] p-4 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#00d4aa] rounded-full flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-[#2c3e50]" />
                            </div>
                            <div>
                                <p className="text-[#e1e5e9] font-medium">Deal closed successfully</p>
                                <p className="text-[#b8c5d1] text-sm">456 Pine Avenue - $425,000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tips and Best Practices */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Dashboard Best Practices
                </h2>

                <div className="bg-[#1e3d59] border-l-4 border-[#00d4aa] p-4 rounded mb-6">
                    <p className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">💡 Pro Tip:</strong> Check your Dashboard daily to stay on top of your business metrics and identify trends. Use the Quick Actions to streamline your workflow and reduce time spent navigating between sections.
                    </p>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Maximizing Dashboard Efficiency</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Daily Review:</strong> Start each day by checking your metrics and recent activity</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Quick Actions:</strong> Use the dashboard shortcuts for common tasks to save time</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Trend Monitoring:</strong> Watch for changes in your conversion rate and revenue trends</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Activity Tracking:</strong> Stay informed about recent system activities and updates</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardHelp;
