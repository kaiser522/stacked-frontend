import React, { useState, useMemo } from "react";

function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export default function ProbateMarketTracker() {
    const [marketData, setMarketData] = useState({
        marketName: "Cook County, IL",
        trackingPeriod: "",
        totalFilings: 1247,
        yourCases: 154,
        avgEstateValue: 342000,
        competitors: 23,
        month1: 1100,
        month2: 1150,
        month3: 1089,
        month4: 1205,
        month5: 1152,
        month6: 1247,
        casesClosed: 142,
        newLeads: 87,
        conversionRate: 18.5,
        avgRevenue: 5500,
        testateCount: 105,
        intestateCount: 37,
        smallEstateCount: 12,
        comp1Name: "Smith & Associates",
        comp1Share: 18.7,
        comp2Name: "Johnson Law Group",
        comp2Share: 15.2,
        comp3Name: "Williams Estate Services",
        comp3Share: 14.1,
        marketNotes: "Noticed increased competition in high-value estates. Consider focusing on smaller estates where conversion rates are higher.",
    });

    const metrics = useMemo(() => {
        const marketShare = marketData.totalFilings > 0 ? ((marketData.yourCases / marketData.totalFilings) * 100).toFixed(1) : 0;
        const totalRevenue = marketData.casesClosed * marketData.avgRevenue;
        const leadCloseRate = marketData.newLeads > 0 ? ((marketData.casesClosed / marketData.newLeads) * 100).toFixed(1) : 0;
        return { marketShare, totalRevenue, leadCloseRate };
    }, [marketData]);

    const caseTypeBreakdown = useMemo(() => {
        const total = marketData.testateCount + marketData.intestateCount + marketData.smallEstateCount;
        if (total === 0) return null;
        return {
            testate: ((marketData.testateCount / total) * 100).toFixed(1),
            intestate: ((marketData.intestateCount / total) * 100).toFixed(1),
            smallEstate: ((marketData.smallEstateCount / total) * 100).toFixed(1),
        };
    }, [marketData]);

    const monthlyData = useMemo(() => {
        return [
            marketData.month1,
            marketData.month2,
            marketData.month3,
            marketData.month4,
            marketData.month5,
            marketData.month6,
        ];
    }, [marketData]);

    const maxMonthValue = useMemo(() => {
        return Math.max(...monthlyData, 1);
    }, [monthlyData]);

    const handleChange = (field) => (e) => {
        setMarketData({ ...marketData, [field]: e.target.value });
    };

    const handleDownload = () => {
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Probate Market Report - ${marketData.marketName}</title>
  <style>
    body { background: #0f172a; color: #f8fafc; padding: 40px; font-family: Inter, sans-serif; }
    .header { text-align: center; margin-bottom: 40px; }
    .metric { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Probate Market Report</h1>
    <p>${marketData.marketName} - ${marketData.trackingPeriod}</p>
  </div>
  <div class="metric">
    <div>Total Filings: ${marketData.totalFilings.toLocaleString()}</div>
    <div>Your Market Share: ${metrics.marketShare}%</div>
  </div>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Market_Report_${marketData.marketName.replace(/[^a-z0-9]/gi, "_")}_${new Date().toISOString().split("T")[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all fields?")) {
            setMarketData({
                marketName: "Cook County, IL",
                trackingPeriod: "",
                totalFilings: 1247,
                yourCases: 154,
                avgEstateValue: 342000,
                competitors: 23,
                month1: 1100,
                month2: 1150,
                month3: 1089,
                month4: 1205,
                month5: 1152,
                month6: 1247,
                casesClosed: 142,
                newLeads: 87,
                conversionRate: 18.5,
                avgRevenue: 5500,
                testateCount: 105,
                intestateCount: 37,
                smallEstateCount: 12,
                comp1Name: "Smith & Associates",
                comp1Share: 18.7,
                comp2Name: "Johnson Law Group",
                comp2Share: 15.2,
                comp3Name: "Williams Estate Services",
                comp3Share: 14.1,
                marketNotes: "",
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">📊 Probate Market Tracker</h1>
                    <p className="text-slate-400">Manually track your market metrics and competitive position</p>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 mb-6 border border-slate-800">
                    <h2 className="text-xl font-semibold mb-4">Market Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">County/Market Name</label>
                            <input
                                type="text"
                                value={marketData.marketName}
                                onChange={handleChange("marketName")}
                                placeholder="e.g., Cook County, IL"
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Tracking Period</label>
                            <input
                                type="text"
                                value={marketData.trackingPeriod}
                                onChange={handleChange("trackingPeriod")}
                                placeholder="e.g., November 2025 or Q4 2025"
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 mb-6 border border-slate-800">
                    <h2 className="text-xl font-semibold mb-4">Monthly Market Metrics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Total Probate Filings</label>
                            <input
                                type="number"
                                value={marketData.totalFilings}
                                onChange={handleChange("totalFilings")}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Your Cases This Month</label>
                            <input
                                type="number"
                                value={marketData.yourCases}
                                onChange={handleChange("yourCases")}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Avg Estate Value ($)</label>
                            <input
                                type="number"
                                value={marketData.avgEstateValue}
                                onChange={handleChange("avgEstateValue")}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Active Competitors</label>
                            <input
                                type="number"
                                value={marketData.competitors}
                                onChange={handleChange("competitors")}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-slate-800 rounded-xl p-5 text-center border border-slate-700">
                        <div className="text-3xl font-bold text-teal-400 mb-1">{parseInt(marketData.totalFilings).toLocaleString()}</div>
                        <div className="text-sm text-slate-400">Total Filings</div>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-5 text-center border border-slate-700">
                        <div className="text-3xl font-bold text-teal-400 mb-1">
                            {formatCurrency(parseInt(marketData.avgEstateValue)).replace("$", "$")}
                            {parseInt(marketData.avgEstateValue) >= 1000 ? "K" : ""}
                        </div>
                        <div className="text-sm text-slate-400">Avg Estate Value</div>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-5 text-center border border-slate-700">
                        <div className="text-3xl font-bold text-teal-400 mb-1">{metrics.marketShare}%</div>
                        <div className="text-sm text-slate-400">Your Market Share</div>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-5 text-center border border-slate-700">
                        <div className="text-3xl font-bold text-teal-400 mb-1">{parseInt(marketData.yourCases).toLocaleString()}</div>
                        <div className="text-sm text-slate-400">Your Monthly Cases</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h2 className="text-xl font-semibold mb-4">Monthly Filing Trends (Last 6 Months)</h2>
                            <p className="text-sm text-slate-400 mb-4">Enter total filings for each month</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <div key={num}>
                                        <label className="block text-sm font-medium mb-2">
                                            Month {num} {num === 1 ? "(Oldest)" : num === 6 ? "(Latest)" : ""}
                                        </label>
                                        <input
                                            type="number"
                                            value={marketData[`month${num}`]}
                                            onChange={handleChange(`month${num}`)}
                                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="h-64 flex items-end justify-around gap-2 bg-slate-800 rounded-lg p-5">
                                {monthlyData.map((value, index) => {
                                    const height = (value / maxMonthValue) * 100;
                                    return (
                                        <div key={index} className="flex-1 flex flex-col items-center h-full justify-end relative">
                                            <div
                                                className="w-full rounded-t-lg bg-gradient-to-t from-teal-500 to-teal-600 transition-all min-h-[20px] relative"
                                                style={{ height: `${Math.max(height, 8)}%` }}
                                            >
                                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-slate-100 whitespace-nowrap">
                                                    {value.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="mt-2 text-xs text-slate-400 text-center">M{index + 1}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h2 className="text-xl font-semibold mb-4">Your Performance Metrics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Cases Closed This Month</label>
                                    <input
                                        type="number"
                                        value={marketData.casesClosed}
                                        onChange={handleChange("casesClosed")}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">New Leads This Month</label>
                                    <input
                                        type="number"
                                        value={marketData.newLeads}
                                        onChange={handleChange("newLeads")}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Conversion Rate (%)</label>
                                    <input
                                        type="number"
                                        value={marketData.conversionRate}
                                        onChange={handleChange("conversionRate")}
                                        step="0.1"
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Avg Revenue per Case ($)</label>
                                    <input
                                        type="number"
                                        value={marketData.avgRevenue}
                                        onChange={handleChange("avgRevenue")}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 space-y-2">
                                <div className="flex justify-between py-3 border-b border-slate-800">
                                    <span className="text-slate-300">Total Monthly Revenue</span>
                                    <span className="font-bold text-teal-400">{formatCurrency(metrics.totalRevenue)}</span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-slate-300">Lead to Close Rate</span>
                                    <span className="font-bold text-teal-400">{metrics.leadCloseRate}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h2 className="text-xl font-semibold mb-4">Cases by Type</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Testate (With Will)</label>
                                    <input
                                        type="number"
                                        value={marketData.testateCount}
                                        onChange={handleChange("testateCount")}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Intestate (No Will)</label>
                                    <input
                                        type="number"
                                        value={marketData.intestateCount}
                                        onChange={handleChange("intestateCount")}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Small Estate</label>
                                    <input
                                        type="number"
                                        value={marketData.smallEstateCount}
                                        onChange={handleChange("smallEstateCount")}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    />
                                </div>
                            </div>
                            {caseTypeBreakdown && (
                                <div className="mt-6 space-y-3">
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm">Testate (With Will)</span>
                                            <span className="font-semibold">{caseTypeBreakdown.testate}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-teal-500 rounded-full" style={{ width: `${caseTypeBreakdown.testate}%` }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm">Intestate (No Will)</span>
                                            <span className="font-semibold">{caseTypeBreakdown.intestate}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${caseTypeBreakdown.intestate}%` }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm">Small Estate Affidavit</span>
                                            <span className="font-semibold">{caseTypeBreakdown.smallEstate}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${caseTypeBreakdown.smallEstate}%` }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h3 className="text-lg font-semibold mb-4">Top Competitors</h3>
                            <div className="space-y-3">
                                {[1, 2, 3].map((num) => (
                                    <div key={num}>
                                        <label className="block text-sm font-medium mb-2">Competitor #{num} Name</label>
                                        <input
                                            type="text"
                                            value={marketData[`comp${num}Name`]}
                                            onChange={handleChange(`comp${num}Name`)}
                                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60 mb-2"
                                        />
                                        <label className="block text-sm font-medium mb-2">Market Share (%)</label>
                                        <input
                                            type="number"
                                            value={marketData[`comp${num}Share`]}
                                            onChange={handleChange(`comp${num}Share`)}
                                            step="0.1"
                                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h3 className="text-lg font-semibold mb-4">Market Notes</h3>
                            <textarea
                                value={marketData.marketNotes}
                                onChange={handleChange("marketNotes")}
                                rows="6"
                                placeholder="Enter observations about market trends, seasonal patterns, competitive insights, etc."
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                            />
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h3 className="text-lg font-semibold mb-4">Actions</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={handleDownload}
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-3 font-semibold text-white transition hover:bg-teal-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download Report
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-4 py-3 font-medium text-slate-100 transition hover:bg-slate-600"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Reset Form
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

