import React from 'react';
import { TrendingDown, Clock, Target, CheckCircle, AlertCircle, Plus, Filter } from 'lucide-react';

const DealPipelineHelp = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#34495e] to-[#2c3e50] text-white p-8 rounded-xl mb-8 text-center border border-[#00d4aa]">
                <div className="flex items-center justify-center space-x-3 mb-3">
                    {/* <TrendingDown className="w-8 h-8 text-[#00d4aa]" /> */}
                    <h1 className="text-4xl font-bold text-[#00d4aa]">📊 Deal Pipeline</h1>
                </div>
                <p className="text-lg opacity-90">Manage your sales funnel and track deal progression</p>
            </div>

            {/* What is Deal Pipeline */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    What is the Deal Pipeline?
                </h2>
                <p className="text-[#e1e5e9] mb-4 text-base">
                    The Deal Pipeline is your visual sales funnel that tracks the progression of deals from initial contact to closing. It uses a Kanban board layout to organize deals by stages, making it easy to see where each deal stands and what actions are needed next.
                </p>
                <p className="text-[#e1e5e9] text-base">
                    This powerful tool helps you manage your sales process, identify bottlenecks, and ensure no opportunities fall through the cracks.
                </p>
            </div>

            {/* Pipeline Stages */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Pipeline Stages
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                    <div className="bg-[#2c3e50] p-5 rounded-lg border-2 border-[#ef4444] transition-all duration-300 hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-2 mb-3">
                            <AlertCircle className="w-5 h-5 text-[#ef4444]" />
                            <h4 className="text-[#ef4444] font-semibold">New Leads</h4>
                        </div>
                        <div className="text-2xl font-bold text-[#e1e5e9] mb-1">4</div>
                        <p className="text-[#b8c5d1] text-sm">Fresh opportunities</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border-2 border-[#3b82f6] transition-all duration-300 hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-2 mb-3">
                            <Clock className="w-5 h-5 text-[#3b82f6]" />
                            <h4 className="text-[#3b82f6] font-semibold">Contracted</h4>
                        </div>
                        <div className="text-2xl font-bold text-[#e1e5e9] mb-1">1</div>
                        <p className="text-[#b8c5d1] text-sm">Under contract</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border-2 border-[#10b981] transition-all duration-300 hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-2 mb-3">
                            <CheckCircle className="w-5 h-5 text-[#10b981]" />
                            <h4 className="text-[#10b981] font-semibold">Closed</h4>
                        </div>
                        <div className="text-2xl font-bold text-[#e1e5e9] mb-1">2</div>
                        <p className="text-[#b8c5d1] text-sm">Successfully closed</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border-2 border-[#eab308] transition-all duration-300 hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-2 mb-3">
                            <Target className="w-5 h-5 text-[#eab308]" />
                            <h4 className="text-[#eab308] font-semibold">Other</h4>
                        </div>
                        <div className="text-2xl font-bold text-[#e1e5e9] mb-1">4</div>
                        <p className="text-[#b8c5d1] text-sm">In progress</p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Understanding Each Stage</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#ef4444] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#ef4444]">New Leads:</strong> Fresh prospects who have shown interest but haven't yet been qualified or contacted</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#3b82f6]">Contracted:</strong> Deals that are under contract and moving toward closing</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#10b981] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#10b981]">Closed:</strong> Successfully completed deals that have closed</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#eab308] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#eab308]">Other:</strong> Deals in various stages of qualification, negotiation, or special circumstances</span>
                    </li>
                </ul>
            </div>

            {/* Deal Card Layout */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Deal Card Information
                </h2>

                <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h4 className="text-[#e1e5e9] font-bold text-lg mb-1">123 Oak Street Property</h4>
                            <p className="text-[#b8c5d1] text-sm">Client: Sarah Johnson</p>
                        </div>
                        <div className="text-right">
                            <div className="text-[#00d4aa] font-bold text-lg">$450,000</div>
                            <div className="text-[#b8c5d1] text-sm">Expected close: Dec 15</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-[#b8c5d1] text-sm">Property Type</p>
                            <p className="text-[#e1e5e9] font-medium">Single Family</p>
                        </div>
                        <div>
                            <p className="text-[#b8c5d1] text-sm">Commission</p>
                            <p className="text-[#e1e5e9] font-medium">$13,500</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-[#eab308]" />
                            <span className="text-[#b8c5d1] text-sm">In this stage for 5 days</span>
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-[#00d4aa] text-[#2c3e50] rounded text-sm font-medium hover:bg-[#00c399]">
                                Update
                            </button>
                            <button className="px-3 py-1 bg-[#485e73] text-[#e1e5e9] rounded text-sm font-medium hover:bg-[#576f85]">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Deal Card Components</h3>
                <ul className="space-y-2">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Property & Client Info:</strong> Property address and client name</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Financial Details:</strong> Property value, commission, and expected closing date</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Progress Tracking:</strong> Time in current stage and next actions needed</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Quick Actions:</strong> Update deal status or view detailed information</span>
                    </li>
                </ul>
            </div>

            {/* Pipeline Management */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Pipeline Management Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Plus className="w-5 h-5 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Add New Deal</h4>
                        </div>
                        <ul className="space-y-2 ml-8">
                            <li className="text-[#e1e5e9] text-sm">Create new deal entries quickly</li>
                            <li className="text-[#e1e5e9] text-sm">Set initial stage and priority</li>
                            <li className="text-[#e1e5e9] text-sm">Add client and property information</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Filter className="w-5 h-5 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Filter & Search</h4>
                        </div>
                        <ul className="space-y-2 ml-8">
                            <li className="text-[#e1e5e9] text-sm">Filter by stage, client, or property</li>
                            <li className="text-[#e1e5e9] text-sm">Search by address or client name</li>
                            <li className="text-[#e1e5e9] text-sm">Sort by value or closing date</li>
                        </ul>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Drag & Drop Functionality</h3>
                <div className="bg-[#2c3e50] p-4 rounded-lg border border-[#485e73]">
                    <p className="text-[#e1e5e9] mb-3">
                        <strong className="text-[#00d4aa]">Easy Stage Updates:</strong> Simply drag deal cards between stages to update their status. This automatically updates the deal timeline and triggers any associated notifications or actions.
                    </p>
                    <ul className="space-y-1 text-[#b8c5d1] text-sm">
                        <li>• Drag cards horizontally between columns to change stages</li>
                        <li>• Vertical reordering within stages for priority management</li>
                        <li>• Automatic timestamp updates when stages change</li>
                    </ul>
                </div>
            </div>

            {/* Analytics and Insights */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Pipeline Analytics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">27%</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Conversion Rate</h4>
                        <p className="text-[#b8c5d1] text-sm">Leads to closed deals</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">45</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Avg. Days to Close</h4>
                        <p className="text-[#b8c5d1] text-sm">From lead to closing</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">$848K</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Pipeline Value</h4>
                        <p className="text-[#b8c5d1] text-sm">Total active deals</p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Key Performance Indicators</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Conversion Rate:</strong> Percentage of leads that successfully close as deals</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Average Days to Close:</strong> Time from initial lead to successful closing</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Pipeline Value:</strong> Total monetary value of all active deals in your pipeline</span>
                    </li>
                </ul>
            </div>

            {/* Best Practices */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Pipeline Best Practices
                </h2>

                <div className="bg-[#1e3d59] border-l-4 border-[#00d4aa] p-4 rounded mb-6">
                    <p className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">💡 Pro Tip:</strong> Review your pipeline daily to identify deals that have been stuck in the same stage for too long. Move deals forward proactively and follow up with clients regularly to maintain momentum.
                    </p>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Effective Pipeline Management</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Regular Updates:</strong> Keep deal information current and move deals forward as they progress</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Stage Consistency:</strong> Use consistent criteria for determining when deals should move to the next stage</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Priority Management:</strong> Order deals within stages by priority or closing date for better focus</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Data Accuracy:</strong> Maintain accurate financial information and timelines for better forecasting</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DealPipelineHelp;
