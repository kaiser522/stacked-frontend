import React from 'react';
import { Home, Calendar, Users, CheckCircle, MapPin, Clock, Camera, BarChart3 } from 'lucide-react';

const OpenHouseToolkitHelp = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#34495e] to-[#2c3e50] text-white p-8 rounded-xl mb-8 text-center border border-[#00d4aa]">
                <div className="flex items-center justify-center space-x-3 mb-3">
                    {/* <Home className="w-8 h-8 text-[#00d4aa]" /> */}
                    <h1 className="text-4xl font-bold text-[#00d4aa]">🏠Open House Toolkit</h1>
                </div>
                <p className="text-lg opacity-90">Comprehensive tools for successful open house events</p>
            </div>

            {/* What is Open House Toolkit */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    What is the Open House Toolkit?
                </h2>
                <p className="text-[#e1e5e9] mb-4 text-base">
                    The Open House Toolkit is a comprehensive suite of tools designed to help you plan, execute, and follow up on successful open house events. It includes planning checklists, marketing templates, lead capture systems, and performance tracking.
                </p>
                <p className="text-[#e1e5e9] text-base">
                    This toolkit streamlines the entire open house process from initial planning to post-event follow-up, helping you maximize attendance, capture quality leads, and convert prospects into clients.
                </p>
            </div>

            {/* Toolkit Features */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Toolkit Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <Calendar className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Event Planning</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Complete planning tools and checklists for successful open house events.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Pre-event checklists</li>
                            <li>• Marketing planning tools</li>
                            <li>• Timeline management</li>
                            <li>• Vendor coordination</li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <Users className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Lead Capture</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Digital systems for capturing and managing visitor information.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Digital sign-in sheets</li>
                            <li>• QR code registration</li>
                            <li>• Visitor tracking</li>
                            <li>• Contact management</li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <CheckCircle className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Marketing Materials</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Professional marketing templates and promotional materials.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Flyer templates</li>
                            <li>• Social media posts</li>
                            <li>• Email invitations</li>
                            <li>• Directional signs</li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <BarChart3 className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Analytics & Reporting</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Track performance and measure success of your open house events.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Attendance tracking</li>
                            <li>• Lead conversion rates</li>
                            <li>• ROI analysis</li>
                            <li>• Performance reports</li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <Camera className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Photo Management</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Organize and manage photos from open house events.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Event photo storage</li>
                            <li>• Before/after comparisons</li>
                            <li>• Social media sharing</li>
                            <li>• Client galleries</li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <div className="flex items-center space-x-3 mb-4">
                            <Clock className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Follow-up Automation</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm mb-4">
                            Automated follow-up sequences for lead nurturing.
                        </p>
                        <ul className="space-y-2 text-[#e1e5e9] text-sm">
                            <li>• Thank you emails</li>
                            <li>• Follow-up sequences</li>
                            <li>• Nurture campaigns</li>
                            <li>• Appointment scheduling</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Open House Planning Process */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Open House Planning Process
                </h2>

                <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#2c3e50] font-bold text-sm">1</span>
                        </div>
                        <div>
                            <h4 className="text-[#00d4aa] font-semibold mb-2">Pre-Event Planning (1-2 weeks before)</h4>
                            <ul className="space-y-1 text-[#e1e5e9] text-sm">
                                <li>• Set date and time for optimal attendance</li>
                                <li>• Prepare property for showing (staging, cleaning)</li>
                                <li>• Create marketing materials and social media posts</li>
                                <li>• Set up lead capture system and registration</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#2c3e50] font-bold text-sm">2</span>
                        </div>
                        <div>
                            <h4 className="text-[#00d4aa] font-semibold mb-2">Event Day Setup (Morning of event)</h4>
                            <ul className="space-y-1 text-[#e1e5e9] text-sm">
                                <li>• Final property preparation and staging</li>
                                <li>• Set up directional signs and marketing materials</li>
                                <li>• Prepare registration area and lead capture system</li>
                                <li>• Review talking points and property highlights</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#2c3e50] font-bold text-sm">3</span>
                        </div>
                        <div>
                            <h4 className="text-[#00d4aa] font-semibold mb-2">During the Event</h4>
                            <ul className="space-y-1 text-[#e1e5e9] text-sm">
                                <li>• Welcome visitors and collect contact information</li>
                                <li>• Provide property information and answer questions</li>
                                <li>• Take photos and document visitor feedback</li>
                                <li>• Network and build relationships with prospects</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#2c3e50] font-bold text-sm">4</span>
                        </div>
                        <div>
                            <h4 className="text-[#00d4aa] font-semibold mb-2">Post-Event Follow-up (Within 24 hours)</h4>
                            <ul className="space-y-1 text-[#e1e5e9] text-sm">
                                <li>• Send thank you emails to all attendees</li>
                                <li>• Follow up with qualified prospects</li>
                                <li>• Update CRM with lead information</li>
                                <li>• Analyze performance and plan improvements</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Performance Metrics */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Event Performance Metrics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">24</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Avg. Attendance</h4>
                        <p className="text-[#b8c5d1] text-sm">Visitors per open house</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">68%</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Lead Capture Rate</h4>
                        <p className="text-[#b8c5d1] text-sm">Visitors who register</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">12%</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Conversion Rate</h4>
                        <p className="text-[#b8c5d1] text-sm">Leads to clients</p>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] text-center">
                        <div className="text-3xl font-bold text-[#00d4aa] mb-2">$8.2K</div>
                        <h4 className="text-[#e1e5e9] font-semibold mb-1">Avg. ROI</h4>
                        <p className="text-[#b8c5d1] text-sm">Per open house event</p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Key Performance Indicators</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Attendance Rate:</strong> Number of visitors compared to marketing reach and expectations</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Lead Quality:</strong> Percentage of attendees who are qualified prospects vs. casual visitors</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Follow-up Success:</strong> Rate of successful follow-up conversations and appointments</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Event ROI:</strong> Return on investment considering costs vs. leads generated and deals closed</span>
                    </li>
                </ul>
            </div>

            {/* Marketing Strategies */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Open House Marketing Strategies
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <h4 className="text-[#00d4aa] font-semibold mb-4">Digital Marketing</h4>
                        <ul className="space-y-3">
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Social media promotion across platforms</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Email marketing to your database</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Online listing platforms and websites</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Digital advertising campaigns</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73]">
                        <h4 className="text-[#00d4aa] font-semibold mb-4">Traditional Marketing</h4>
                        <ul className="space-y-3">
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Directional signs and banners</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Flyer distribution in neighborhood</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Real estate magazine advertising</span>
                            </li>
                            <li className="text-[#e1e5e9] flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#10b981] mt-1 flex-shrink-0" />
                                <span className="text-sm">Networking and word-of-mouth</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Best Practices */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Open House Best Practices
                </h2>

                <div className="bg-[#1e3d59] border-l-4 border-[#00d4aa] p-4 rounded mb-6">
                    <p className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">💡 Pro Tip:</strong> Success in open houses comes from preparation, presentation, and follow-up. Use the toolkit to streamline your process and focus on building relationships with attendees rather than just selling the property.
                    </p>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Pre-Event Preparation</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Property Preparation:</strong> Ensure the property is clean, well-lit, and properly staged for maximum appeal</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Marketing Campaign:</strong> Launch marketing efforts 1-2 weeks before the event for maximum reach</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Lead Capture Setup:</strong> Prepare registration system and materials for efficient visitor tracking</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Knowledge Preparation:</strong> Review property details, local market data, and prepare talking points</span>
                    </li>
                </ul>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4 mt-8">During the Event</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Visitor Engagement:</strong> Greet each visitor personally and collect contact information</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Property Presentation:</strong> Highlight key features and answer questions knowledgeably</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Documentation:</strong> Take notes on visitor feedback and interest level for follow-up</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Networking:</strong> Build relationships and identify potential clients beyond the current property</span>
                    </li>
                </ul>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4 mt-8">Post-Event Follow-up</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Immediate Follow-up:</strong> Send thank you emails within 24 hours to all attendees</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Lead Nurturing:</strong> Add qualified prospects to your CRM and begin nurture campaigns</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Performance Analysis:</strong> Review attendance, lead quality, and ROI to improve future events</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Continuous Improvement:</strong> Use feedback and data to refine your open house strategy</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default OpenHouseToolkitHelp;
