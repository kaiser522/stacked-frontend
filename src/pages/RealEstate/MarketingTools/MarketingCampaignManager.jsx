import React, { useState, useEffect, useMemo } from "react";

const initialCampaigns = [
    {
        id: 1,
        name: "Spring Listings Promo",
        type: "listing",
        status: "active",
        property: "421 Pine Street, Biloxi, MS",
        startDate: "2025-05-01",
        endDate: "2025-05-31",
        channels: ["facebook", "instagram"],
        reach: 3200,
        engagement: 4.5,
        leads: 8,
        conversions: 2,
    },
    {
        id: 2,
        name: "Open House Weekend",
        type: "openhouse",
        status: "scheduled",
        property: "1508 Beach Boulevard, Gulfport, MS",
        startDate: "2025-05-15",
        endDate: "2025-05-16",
        channels: ["facebook", "instagram", "linkedin"],
        reach: 0,
        engagement: 0,
        leads: 0,
        conversions: 0,
    },
    {
        id: 3,
        name: "Customer Testimonials",
        type: "testimonial",
        status: "active",
        property: "",
        startDate: "2025-05-01",
        endDate: "2025-06-30",
        channels: ["facebook", "linkedin"],
        reach: 2800,
        engagement: 5.2,
        leads: 5,
        conversions: 1,
    },
    {
        id: 4,
        name: "Elm Street Success Story",
        type: "sold",
        status: "completed",
        property: "872 Elm Street, Biloxi, MS",
        startDate: "2025-04-15",
        endDate: "2025-04-20",
        channels: ["facebook", "instagram"],
        reach: 4100,
        engagement: 6.1,
        leads: 10,
        conversions: 3,
    },
    {
        id: 5,
        name: "Summer Market Preview",
        type: "custom",
        status: "draft",
        property: "",
        startDate: "2025-06-01",
        endDate: "2025-06-30",
        channels: ["facebook", "instagram", "linkedin", "twitter"],
        reach: 0,
        engagement: 0,
        leads: 0,
        conversions: 0,
    },
];

const statusClasses = {
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500",
    scheduled: "bg-blue-500/10 text-blue-400 border-blue-500",
    draft: "bg-slate-500/10 text-slate-400 border-slate-500",
    completed: "bg-purple-500/10 text-purple-400 border-purple-500",
};

const channelColors = {
    facebook: "bg-blue-500",
    instagram: "bg-pink-500",
    linkedin: "bg-blue-400",
    twitter: "bg-blue-300",
};

function formatDateRange(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return `${days} days`;
}

export default function MarketingCampaign() {
    const [campaigns, setCampaigns] = useState(initialCampaigns);
    const [activeTab, setActiveTab] = useState("overview");
    const [showModal, setShowModal] = useState(false);
    const [showMetricsModal, setShowMetricsModal] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        property: "",
        startDate: "",
        endDate: "",
        channels: [],
        reach: 0,
        engagement: 0,
        leads: 0,
        conversions: 0,
        goal: "",
    });

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        if (showModal && !formData.startDate) {
            setFormData((prev) => ({
                ...prev,
                startDate: today,
                endDate: nextWeek.toISOString().split("T")[0],
            }));
        }
    }, [showModal]);

    const metrics = useMemo(() => {
        const active = campaigns.filter((c) => c.status === "active").length;
        const totalReach = campaigns.reduce((sum, c) => sum + c.reach, 0);
        const totalEngagement = campaigns.reduce((sum, c) => sum + c.engagement, 0) / campaigns.length || 0;
        const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
        return { active, totalReach, totalEngagement, totalLeads };
    }, [campaigns]);

    const filteredCampaigns = useMemo(() => {
        if (filterStatus === "all") return campaigns;
        return campaigns.filter((c) => c.status === filterStatus);
    }, [campaigns, filterStatus]);

    const recentCampaigns = useMemo(() => {
        return campaigns.slice(0, 3);
    }, [campaigns]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.channels.length === 0) {
            alert("Please select at least one channel");
            return;
        }

        if (editingCampaign) {
            setCampaigns(
                campaigns.map((c) =>
                    c.id === editingCampaign.id
                        ? {
                              ...c,
                              ...formData,
                              reach: parseInt(formData.reach) || 0,
                              engagement: parseFloat(formData.engagement) || 0,
                              leads: parseInt(formData.leads) || 0,
                              conversions: parseInt(formData.conversions) || 0,
                          }
                        : c
                )
            );
        } else {
            const newCampaign = {
                id: campaigns.length + 1,
                ...formData,
                status: "draft",
                reach: parseInt(formData.reach) || 0,
                engagement: parseFloat(formData.engagement) || 0,
                leads: parseInt(formData.leads) || 0,
                conversions: parseInt(formData.conversions) || 0,
            };
            setCampaigns([newCampaign, ...campaigns]);
        }

        setShowModal(false);
        setShowMetricsModal(false);
        setEditingCampaign(null);
        setFormData({
            name: "",
            type: "",
            property: "",
            startDate: "",
            endDate: "",
            channels: [],
            reach: 0,
            engagement: 0,
            leads: 0,
            conversions: 0,
            goal: "",
        });
    };

    const handleChannelToggle = (channel) => {
        setFormData((prev) => ({
            ...prev,
            channels: prev.channels.includes(channel)
                ? prev.channels.filter((c) => c !== channel)
                : [...prev.channels, channel],
        }));
    };

    const handleEditMetrics = (campaign) => {
        setEditingCampaign(campaign);
        setFormData({
            name: campaign.name,
            type: campaign.type,
            property: campaign.property,
            startDate: campaign.startDate,
            endDate: campaign.endDate,
            channels: campaign.channels,
            reach: campaign.reach,
            engagement: campaign.engagement,
            leads: campaign.leads,
            conversions: campaign.conversions,
            goal: "",
        });
        setShowMetricsModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this campaign?")) {
            setCampaigns(campaigns.filter((c) => c.id !== id));
        }
    };

    const handleLaunch = (id) => {
        setCampaigns(campaigns.map((c) => (c.id === id ? { ...c, status: "active" } : c)));
    };

    const handleUseTemplate = (templateType) => {
        const templates = {
            listing: {
                name: "New Listing Campaign",
                type: "listing",
                channels: ["facebook", "instagram"],
            },
            openhouse: {
                name: "Open House Event",
                type: "openhouse",
                channels: ["facebook", "instagram", "linkedin"],
            },
            sold: {
                name: "Just Sold Campaign",
                type: "sold",
                channels: ["facebook", "instagram"],
            },
        };

        const template = templates[templateType];
        if (template) {
            setFormData((prev) => ({
                ...prev,
                name: template.name,
                type: template.type,
                channels: template.channels,
            }));
            setShowModal(true);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-900 text-slate-100">
            <div className="hidden md:block w-60 bg-slate-800">
                <div className="p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-300 flex items-center justify-center text-slate-800 font-bold">HF</div>
                    <div className="ml-3 font-bold text-lg">Home Flippers</div>
                </div>
                <div className="mt-6">
                    <div className="flex items-center px-4 py-3 text-slate-300 cursor-pointer hover:bg-slate-700">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </div>
                    <div className="flex items-center px-4 py-3 bg-slate-700 text-teal-400 border-l-4 border-teal-400">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                        Marketing
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-auto">
                <div className="p-4 flex justify-between items-center border-b border-slate-700">
                    <div>
                        <h1 className="text-2xl font-bold">Marketing Campaign Manager</h1>
                        <p className="text-slate-400 text-sm mt-1">Plan, launch, and manually track your marketing campaigns</p>
                    </div>
                    <button
                        onClick={() => {
                            setShowModal(true);
                            setEditingCampaign(null);
                            setFormData({
                                name: "",
                                type: "",
                                property: "",
                                startDate: "",
                                endDate: "",
                                channels: [],
                                reach: 0,
                                engagement: 0,
                                leads: 0,
                                conversions: 0,
                                goal: "",
                            });
                        }}
                        className="inline-flex items-center gap-2 rounded bg-teal-400 px-4 py-2 font-medium text-slate-900 transition hover:bg-teal-300"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        New Campaign
                    </button>
                </div>

                <div className="p-4 overflow-auto">
                    <div className="flex border-b border-slate-700 mb-4 flex-wrap">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`px-4 py-2 ${activeTab === "overview" ? "text-teal-400 border-b-2 border-teal-400" : "text-slate-400"}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("campaigns")}
                            className={`px-4 py-2 ${activeTab === "campaigns" ? "text-teal-400 border-b-2 border-teal-400" : "text-slate-400"}`}
                        >
                            Active Campaigns
                        </button>
                        <button
                            onClick={() => setActiveTab("templates")}
                            className={`px-4 py-2 ${activeTab === "templates" ? "text-teal-400 border-b-2 border-teal-400" : "text-slate-400"}`}
                        >
                            Templates
                        </button>
                        <button
                            onClick={() => setActiveTab("analytics")}
                            className={`px-4 py-2 ${activeTab === "analytics" ? "text-teal-400 border-b-2 border-teal-400" : "text-slate-400"}`}
                        >
                            Analytics
                        </button>
                    </div>

                    {activeTab === "overview" && (
                        <div>
                            <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 mb-6">
                                <div className="flex items-start">
                                    <svg className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-blue-300 mb-1">Manual Tracking System</h3>
                                        <p className="text-sm text-slate-300">
                                            This tool does not connect to social media platforms or track campaigns automatically. You'll need to manually enter all campaign performance data (reach, engagement, leads, and conversions) as you track them from your social media accounts.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                    <div className="text-slate-400 text-sm">Active Campaigns</div>
                                    <div className="text-3xl font-bold mt-2">{metrics.active}</div>
                                    <div className="text-emerald-400 text-sm mt-1">↑ 2 this month</div>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                    <div className="text-slate-400 text-sm">Total Reach</div>
                                    <div className="text-3xl font-bold mt-2">{(metrics.totalReach / 1000).toFixed(1)}K</div>
                                    <div className="text-emerald-400 text-sm mt-1">↑ 18% vs last month</div>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                    <div className="text-slate-400 text-sm">Engagement Rate</div>
                                    <div className="text-3xl font-bold mt-2">{metrics.totalEngagement.toFixed(1)}%</div>
                                    <div className="text-emerald-400 text-sm mt-1">↑ 0.5% vs last month</div>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                    <div className="text-slate-400 text-sm">Leads Generated</div>
                                    <div className="text-3xl font-bold mt-2">{metrics.totalLeads}</div>
                                    <div className="text-emerald-400 text-sm mt-1">↑ 8 this month</div>
                                </div>
                            </div>

                            <div className="bg-slate-800 rounded-lg p-4 mb-6">
                                <h3 className="font-semibold mb-4">Recent Campaigns</h3>
                                <div className="space-y-3">
                                    {recentCampaigns.map((campaign) => (
                                        <div key={campaign.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-teal-400 transition">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-lg">{campaign.name}</h4>
                                                    {campaign.property && <p className="text-sm text-slate-400 mt-1">{campaign.property}</p>}
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusClasses[campaign.status]}`}>
                                                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                                                <div>
                                                    <div className="text-slate-400 text-xs">Reach</div>
                                                    <div className="font-semibold">{campaign.reach.toLocaleString()}</div>
                                                </div>
                                                <div>
                                                    <div className="text-slate-400 text-xs">Engagement</div>
                                                    <div className="font-semibold">{campaign.engagement}%</div>
                                                </div>
                                                <div>
                                                    <div className="text-slate-400 text-xs">Leads</div>
                                                    <div className="font-semibold">{campaign.leads}</div>
                                                </div>
                                                <div>
                                                    <div className="text-slate-400 text-xs">Conversions</div>
                                                    <div className="font-semibold">{campaign.conversions || 0}</div>
                                                </div>
                                                <div>
                                                    <div className="text-slate-400 text-xs">Duration</div>
                                                    <div className="font-semibold text-sm">{formatDateRange(campaign.startDate, campaign.endDate)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "campaigns" && (
                        <div>
                            <div className="mb-4">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="text-sm rounded border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="draft">Draft</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                {filteredCampaigns.map((campaign) => (
                                    <div key={campaign.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-teal-400 transition">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-lg">{campaign.name}</h4>
                                                {campaign.property && <p className="text-sm text-slate-400 mt-1">{campaign.property}</p>}
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusClasses[campaign.status]}`}>
                                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3 text-sm">
                                            <div>
                                                <div className="text-slate-400 text-xs">Reach</div>
                                                <div className="font-semibold">{campaign.reach.toLocaleString()}</div>
                                            </div>
                                            <div>
                                                <div className="text-slate-400 text-xs">Engagement</div>
                                                <div className="font-semibold">{campaign.engagement}%</div>
                                            </div>
                                            <div>
                                                <div className="text-slate-400 text-xs">Leads</div>
                                                <div className="font-semibold">{campaign.leads}</div>
                                            </div>
                                            <div>
                                                <div className="text-slate-400 text-xs">Conversions</div>
                                                <div className="font-semibold">{campaign.conversions || 0}</div>
                                            </div>
                                            <div>
                                                <div className="text-slate-400 text-xs">Duration</div>
                                                <div className="font-semibold text-sm">{formatDateRange(campaign.startDate, campaign.endDate)}</div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-1">
                                                {campaign.channels.map((ch) => (
                                                    <div key={ch} className={`w-6 h-6 rounded-full ${channelColors[ch]} flex items-center justify-center text-white text-xs font-bold`}>
                                                        {ch.charAt(0).toUpperCase()}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditMetrics(campaign)}
                                                    className="rounded bg-slate-700 px-3 py-1 text-xs font-medium text-slate-100 transition hover:bg-slate-600"
                                                >
                                                    Edit Metrics
                                                </button>
                                                {campaign.status === "draft" && (
                                                    <button
                                                        onClick={() => handleLaunch(campaign.id)}
                                                        className="rounded bg-teal-400 px-3 py-1 text-xs font-medium text-slate-900 transition hover:bg-teal-300"
                                                    >
                                                        Launch
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(campaign.id)}
                                                    className="rounded bg-red-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "templates" && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Campaign Templates</h2>
                            <p className="text-slate-400 mb-6">Start with a pre-built template to launch campaigns faster</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                    <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-md mb-3 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold mb-2">New Listing Campaign</h4>
                                    <p className="text-sm text-slate-400 mb-3">Multi-channel campaign for new property listings with automated posts</p>
                                    <button
                                        onClick={() => handleUseTemplate("listing")}
                                        className="w-full rounded bg-teal-400 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-teal-300"
                                    >
                                        Use Template
                                    </button>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                    <div className="h-32 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-md mb-3 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold mb-2">Open House Event</h4>
                                    <p className="text-sm text-slate-400 mb-3">Promote open house events with countdown posts and reminders</p>
                                    <button
                                        onClick={() => handleUseTemplate("openhouse")}
                                        className="w-full rounded bg-teal-400 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-teal-300"
                                    >
                                        Use Template
                                    </button>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                    <div className="h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-md mb-3 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold mb-2">Just Sold Celebration</h4>
                                    <p className="text-sm text-slate-400 mb-3">Celebrate successful sales and build social proof</p>
                                    <button
                                        onClick={() => handleUseTemplate("sold")}
                                        className="w-full rounded bg-teal-400 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-teal-300"
                                    >
                                        Use Template
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "analytics" && (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-slate-800 rounded-lg p-4">
                                    <h3 className="font-semibold mb-4">Campaign Performance</h3>
                                    <div className="space-y-3">
                                        {campaigns.slice(0, 3).map((campaign) => {
                                            const progress = 85;
                                            return (
                                                <div key={campaign.id}>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>{campaign.name}</span>
                                                        <span className="text-teal-400">{progress}%</span>
                                                    </div>
                                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                                        <div className="h-full bg-teal-400 transition-all" style={{ width: `${progress}%` }} />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4">
                                    <h3 className="font-semibold mb-4">Channel Performance</h3>
                                    <div className="space-y-3">
                                        {["facebook", "instagram", "linkedin"].map((channel) => (
                                            <div key={channel} className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <div className={`w-8 h-8 rounded-full ${channelColors[channel]} flex items-center justify-center mr-3`}>
                                                        <span className="text-white text-xs font-bold">{channel.charAt(0).toUpperCase()}</span>
                                                    </div>
                                                    <span className="capitalize">{channel}</span>
                                                </div>
                                                <span className="font-semibold">5.2K</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {(showModal || showMetricsModal) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => {
                    setShowModal(false);
                    setShowMetricsModal(false);
                    setEditingCampaign(null);
                }}>
                    <div className="w-full max-w-2xl rounded-lg bg-slate-800 p-6 shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">{showMetricsModal ? "Update Campaign Metrics" : "Create New Campaign"}</h2>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setShowMetricsModal(false);
                                    setEditingCampaign(null);
                                }}
                                className="text-slate-400 hover:text-white"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {showMetricsModal && editingCampaign && (
                            <div className="mb-4 rounded bg-slate-700 p-3">
                                <div className="text-sm text-slate-400">Campaign:</div>
                                <div className="font-semibold">{editingCampaign.name}</div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!showMetricsModal && (
                                <>
                                    <div>
                                        <label className="block text-sm mb-2">Campaign Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g., Spring Listings 2025"
                                            className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-2">Campaign Type</label>
                                        <select
                                            required
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                        >
                                            <option value="">Select type...</option>
                                            <option value="listing">New Listing</option>
                                            <option value="openhouse">Open House</option>
                                            <option value="sold">Just Sold</option>
                                            <option value="testimonial">Testimonial</option>
                                            <option value="custom">Custom</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-2">Property Address (Optional)</label>
                                        <input
                                            type="text"
                                            value={formData.property}
                                            onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                                            placeholder="421 Pine Street, Biloxi, MS"
                                            className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm mb-2">Start Date</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.startDate}
                                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                                className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm mb-2">End Date</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.endDate}
                                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                                className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-2">Channels</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {["facebook", "instagram", "linkedin", "twitter"].map((channel) => (
                                                <label key={channel} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.channels.includes(channel)}
                                                        onChange={() => handleChannelToggle(channel)}
                                                        className="mr-2"
                                                    />
                                                    <span className="capitalize">{channel}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-2">Campaign Goal</label>
                                        <textarea
                                            value={formData.goal}
                                            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                            rows="3"
                                            placeholder="Describe what you want to achieve with this campaign..."
                                            className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="border-t border-slate-600 pt-4">
                                <h3 className="text-sm font-semibold mb-3 text-teal-400">Campaign Metrics (Manual Entry)</h3>
                                <p className="text-xs text-slate-400 mb-3">Enter your campaign performance data manually as you track it</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs mb-1">Reach</label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.reach}
                                            onChange={(e) => setFormData({ ...formData, reach: e.target.value })}
                                            placeholder="0"
                                            min="0"
                                            className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs mb-1">Engagement Rate (%)</label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.engagement}
                                            onChange={(e) => setFormData({ ...formData, engagement: e.target.value })}
                                            placeholder="0"
                                            min="0"
                                            max="100"
                                            step="0.1"
                                            className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs mb-1">Leads Generated</label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.leads}
                                            onChange={(e) => setFormData({ ...formData, leads: e.target.value })}
                                            placeholder="0"
                                            min="0"
                                            className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs mb-1">Conversions</label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.conversions}
                                            onChange={(e) => setFormData({ ...formData, conversions: e.target.value })}
                                            placeholder="0"
                                            min="0"
                                            className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setShowMetricsModal(false);
                                        setEditingCampaign(null);
                                    }}
                                    className="flex-1 rounded bg-slate-700 px-4 py-2 font-medium text-slate-100 transition hover:bg-slate-600"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 rounded bg-teal-400 px-4 py-2 font-medium text-slate-900 transition hover:bg-teal-300">
                                    {showMetricsModal ? "Save Metrics" : "Create Campaign"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

