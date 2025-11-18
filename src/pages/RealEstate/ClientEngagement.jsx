import React, { useMemo } from "react";

export default function ClientEngagement() {
    const overview = useMemo(() => ([
        { key: "avg", icon: "⚡", number: "2.4h", label: "Avg Response Time", change: "+15% faster this month", variant: "avg" },
        { key: "high", icon: "🔥", number: 3, label: "Highly Engaged (80+)", change: "+2 from last week", variant: "high" },
        { key: "medium", icon: "📈", number: 4, label: "Moderate Engagement (50-79)", change: "Stable", variant: "medium" },
        { key: "low", icon: "❄️", number: 2, label: "Low Engagement (<50)", change: "Needs attention", variant: "low" },
    ]), []);

    const clients = useMemo(() => ([
        { id: 1, name: "Sarah & Mike Johnson", type: "buyer", score: 92, openRate: 95, avgResp: "1.2h", lastOpen: "2 hours ago", total: 28, replies: 26, activity: "Opened property listing email" },
        { id: 2, name: "Lisa Rodriguez", type: "seller", score: 88, openRate: 89, avgResp: "3.1h", lastOpen: "5 hours ago", total: 35, replies: 31, activity: "Replied to market update" },
        { id: 3, name: "Thompson Family", type: "both", score: 84, openRate: 78, avgResp: "4.5h", lastOpen: "1 day ago", total: 22, replies: 18, activity: "Viewed financing options email" },
        { id: 4, name: "David Chen", type: "buyer", score: 71, openRate: 68, avgResp: "8.2h", lastOpen: "12 hours ago", total: 19, replies: 13, activity: "Opened neighborhood guide" },
        { id: 5, name: "Maria Gonzalez", type: "seller", score: 65, openRate: 72, avgResp: "1.2d", lastOpen: "2 days ago", total: 15, replies: 9, activity: "Viewed home staging tips" },
        { id: 6, name: "Robert Williams", type: "buyer", score: 58, openRate: 55, avgResp: "2.1d", lastOpen: "3 days ago", total: 24, replies: 8, activity: "Opened mortgage rate update" },
        { id: 7, name: "Jennifer Taylor", type: "seller", score: 42, openRate: 41, avgResp: "4.8d", lastOpen: "1 week ago", total: 17, replies: 3, activity: "Opened market analysis (no reply)" },
        { id: 8, name: "Anderson Group", type: "both", score: 34, openRate: 28, avgResp: "No replies", lastOpen: "2 weeks ago", total: 12, replies: 0, activity: "No recent engagement" },
        { id: 9, name: "Kevin Martinez", type: "buyer", score: 76, openRate: 82, avgResp: "6.4h", lastOpen: "8 hours ago", total: 16, replies: 12, activity: "Asked about viewing schedule" },
    ]), []);

    const sortedClients = useMemo(() => clients.sort((a, b) => b.score - a.score), [clients]);

    function level(score) {
        if (score >= 80) return { className: "engagement-high", color: "#10b981", label: "Highly Engaged", status: "status-active" };
        if (score >= 50) return { className: "engagement-medium", color: "#f59e0b", label: "Moderately Engaged", status: "status-moderate" };
        return { className: "engagement-low", color: "#ef4444", label: "Low Engagement", status: "status-cold" };
    }

    return (
        <div className="space-y-6">
            <div className="bg-[#1e2332] border-b border-[#2a3441] -mx-6 -mt-6 px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-[#ccd6f6]">Client Engagement Scorecard</h1>
                <div className="flex items-center gap-3">
                    <select className="bg-[#2a3441] border border-[#364153] rounded px-3 py-2 text-[#8892b0]">
                        <option>Last 30 Days</option>
                        <option>Last 7 Days</option>
                        <option>Last 90 Days</option>
                    </select>
                    <button className="bg-[#64ffda] text-[#0a192f] rounded px-4 py-2 font-semibold">Export Report</button>
                </div>
            </div>

            <div className="bg-[linear-gradient(135deg,rgba(100,255,218,0.1),rgba(100,255,218,0.05))] border border-[#64ffda] rounded-xl p-5 text-center">
                <div className="text-[#64ffda] font-semibold mb-1">📧 Email Tracking System</div>
                <div className="text-[#8892b0] text-sm">This scorecard automatically tracks email opens, reply rates, and response times from your email platform. Scores update in real-time based on client engagement patterns.</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {overview.map(o => (
                    <div key={o.key} className="relative bg-[#2a3441] border border-[#364153] rounded-xl p-6">
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: variantBg(o.variant), color: variantColor(o.variant) }}>{o.icon}</div>
                        <div className="text-3xl font-bold text-[#ccd6f6] mb-1">{o.number}</div>
                        <div className="text-[#8892b0] text-sm font-medium">{o.label}</div>
                        <div className="text-xs mt-1" style={{ color: variantColor(o.variant) }}>{o.change}</div>
                    </div>
                ))}
            </div>

            <div className="bg-[#2a3441] border border-[#364153] rounded-xl p-4 flex flex-wrap gap-5 items-center">
                <div className="text-[#ccd6f6] font-semibold">Client Engagement Rankings</div>
            </div>

            <div className="bg-[#2a3441] border border-[#364153] rounded-xl p-5 flex flex-wrap gap-6">
                <LegendItem color="#10b981" text="High Engagement: Opens 80%+ emails, replies within 4 hours" />
                <LegendItem color="#f59e0b" text="Moderate: Opens 50-79% emails, replies within 24 hours" />
                <LegendItem color="#ef4444" text="Low: Opens <50% emails, slow/no replies" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {sortedClients.map(c => {
                    const lv = level(c.score);
                    return (
                        <div key={c.id} className="relative bg-[#2a3441] border border-[#364153] rounded-xl p-6 overflow-hidden" style={{ boxShadow: "0 0 0 0 transparent" }}>
                            <div className="absolute inset-x-0 top-0 h-1" style={{ background: lv.color }} />
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="text-white font-semibold text-lg">{c.name}</div>
                                    <span className="inline-block px-2 py-0.5 rounded bg-[rgba(100,255,218,0.1)] text-[#64ffda] text-xs uppercase tracking-wide">{c.type}</span>
                                </div>
                                <div className="relative w-16 h-16 rounded-full flex items-center justify-center text-white font-bold" style={{ background: `conic-gradient(${lv.color} ${c.score * 3.6}deg, #364153 0)` }}>
                                    <div className="absolute inset-1 rounded-full" style={{ background: "#2a3441" }} />
                                    <span className="relative z-10">{c.score}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 my-4">
                                <Metric value={`${c.openRate}%`} label="Open Rate" color={lv.color} />
                                <Metric value={c.avgResp} label="Avg Response" color={lv.color} />
                            </div>
                            <div className="bg-[rgba(100,255,218,0.05)] rounded p-3">
                                <DetailRow label="Emails Sent" value={c.total} />
                                <DetailRow label="Replies Received" value={c.replies} />
                                <DetailRow label="Last Email Opened" value={c.lastOpen} />
                                <DetailRow label="Engagement Level" value={<span>{lv.label}<span className={`inline-block w-2 h-2 rounded-full ml-2 ${lv.status}`} /></span>} />
                            </div>
                            <div className="text-[#8892b0] text-xs mt-3 border-t border-[#364153] pt-3"><strong>Latest Activity:</strong> {c.activity}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function LegendItem({ color, text }) {
    return (
        <div className="flex items-center gap-2 text-sm" style={{ color: "#ccd6f6" }}>
            <span className="w-3 h-3 rounded-full" style={{ background: color }} />
            <span className="text-[#8892b0]">{text}</span>
        </div>
    );
}

function Metric({ value, label, color }) {
    return (
        <div className="text-center">
            <div className="text-xl font-bold" style={{ color }}>{value}</div>
            <div className="text-[10px] uppercase tracking-wide text-[#8892b0]">{label}</div>
        </div>
    );
}

function DetailRow({ label, value }) {
    return (
        <div className="flex items-center justify-between text-sm mb-1 last:mb-0">
            <span className="text-[#8892b0]">{label}</span>
            <span className="text-[#ccd6f6] font-medium">{value}</span>
        </div>
    );
}

function variantBg(variant) {
    switch (variant) {
        case "high": return "rgba(16,185,129,0.1)";
        case "medium": return "rgba(245,158,11,0.1)";
        case "low": return "rgba(239,68,68,0.1)";
        case "avg": return "rgba(100,255,218,0.1)";
        default: return "rgba(255,255,255,0.08)";
    }
}

function variantColor(variant) {
    switch (variant) {
        case "high": return "#10b981";
        case "medium": return "#f59e0b";
        case "low": return "#ef4444";
        case "avg": return "#64ffda";
        default: return "#8892b0";
    }
}


