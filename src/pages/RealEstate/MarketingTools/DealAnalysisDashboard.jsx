import React, { useState, useMemo } from "react";

function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export default function DealAnalysisDashboard() {
    const [purchasePrice, setPurchasePrice] = useState(250000);
    const [arv, setArv] = useState(350000);
    const [repairs, setRepairs] = useState(40000);
    const [rent, setRent] = useState(2500);

    const metrics = useMemo(() => {
        const totalInvestment = purchasePrice + repairs;
        const equity = arv - totalInvestment;
        const roi = totalInvestment > 0 ? (equity / totalInvestment) * 100 : 0;
        const capRate = purchasePrice > 0 ? ((rent * 12) / purchasePrice) * 100 : 0;
        const cocReturn = totalInvestment > 0 ? ((rent * 12 - purchasePrice * 0.01) / (totalInvestment * 0.2)) * 100 : 0;

        const arvRatio = arv > 0 ? (purchasePrice / arv) * 100 : 0;
        const repairRatio = arv > 0 ? (repairs / arv) * 100 : 0;
        const rentRatio = purchasePrice > 0 ? (rent / purchasePrice) * 100 : 0;
        const profitMargin = arv > 0 ? (equity / arv) * 100 : 0;

        let score = 0;
        score += Math.min((roi / 40) * 30, 30);
        score += Math.min((equity / 80000) * 25, 25);
        score += Math.min((cocReturn / 15) * 20, 20);
        score += Math.min((capRate / 12) * 15, 15);
        score += Math.min((1 - repairRatio / 20) * 10, 10);
        score = Math.min(Math.round(score), 100);

        const scoreBadge =
            score >= 80 ? "EXCELLENT DEAL" : score >= 60 ? "GOOD DEAL" : score >= 40 ? "FAIR DEAL" : "WEAK DEAL";
        const scoreClass =
            score >= 80 ? "excellent" : score >= 60 ? "good" : score >= 40 ? "fair" : "poor";

        const roiRating = roi >= 25 ? "Excellent" : roi >= 15 ? "Good" : "Fair";
        const marketRating = arvRatio <= 75 ? "Strong" : arvRatio <= 80 ? "Good" : "Weak";
        const riskRating = repairRatio <= 10 ? "Low" : repairRatio <= 15 ? "Low-Medium" : "Medium";

        const gaugeRotation = -90 + (score / 100) * 180;
        const gaugeColor =
            score >= 80 ? "#10b981" : score >= 60 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444";

        return {
            totalInvestment,
            equity,
            roi,
            capRate,
            cocReturn,
            arvRatio,
            repairRatio,
            rentRatio,
            profitMargin,
            score,
            scoreBadge,
            scoreClass,
            roiRating,
            marketRating,
            riskRating,
            gaugeRotation,
            gaugeColor,
        };
    }, [purchasePrice, arv, repairs, rent]);

    const getIndicatorClass = (value, min, max) => {
        if (value >= max) return "bg-emerald-500";
        if (value >= min) return "bg-amber-400";
        return "bg-red-500";
    };

    const getProgressColor = (value, min, max) => {
        if (value >= min && value <= max) return "bg-emerald-500";
        if (value < min) return "bg-red-500";
        return "bg-amber-400";
    };

    const handleDownload = () => {
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Deal Analysis Report</title>
  <style>
    body { background: #0f172a; color: #f8fafc; padding: 40px; font-family: Inter, sans-serif; }
    .header { text-align: center; margin-bottom: 40px; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Deal Analysis Report</h1>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
  </div>
  <div class="card">
    <h2>Overall Deal Score: ${metrics.score}</h2>
    <p>${metrics.scoreBadge}</p>
  </div>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `deal-analysis-${new Date().toISOString().split("T")[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold mb-2">Deal Analysis Dashboard</h1>
                    <p className="text-slate-400">Visual indicators to quickly assess deal strength with performance benchmarks</p>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 mb-6 border border-slate-800">
                    <h2 className="text-xl font-semibold mb-6">Enter Deal Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Purchase Price</label>
                            <input
                                type="number"
                                value={purchasePrice}
                                onChange={(e) => setPurchasePrice(parseFloat(e.target.value) || 0)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">ARV (After Repair Value)</label>
                            <input
                                type="number"
                                value={arv}
                                onChange={(e) => setArv(parseFloat(e.target.value) || 0)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Repair Costs</label>
                            <input
                                type="number"
                                value={repairs}
                                onChange={(e) => setRepairs(parseFloat(e.target.value) || 0)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Monthly Rent</label>
                            <input
                                type="number"
                                value={rent}
                                onChange={(e) => setRent(parseFloat(e.target.value) || 0)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 mb-6 border border-slate-800">
                    <h2 className="text-xl font-semibold mb-6">Key Performance Indicators</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-slate-800 rounded-xl p-5 text-center border-2 border-slate-700 hover:border-teal-500 transition">
                            <div className="text-sm text-slate-400 mb-2">ROI</div>
                            <div className="text-3xl font-bold mb-2">{metrics.roi.toFixed(1)}%</div>
                            <div className="flex items-center justify-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${getIndicatorClass(metrics.roi, 15, 25)}`} />
                                <span className="text-xs text-slate-400">Target: 25%+</span>
                            </div>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-5 text-center border-2 border-slate-700 hover:border-teal-500 transition">
                            <div className="text-sm text-slate-400 mb-2">Instant Equity</div>
                            <div className="text-3xl font-bold mb-2">{formatCurrency(metrics.equity)}</div>
                            <div className="flex items-center justify-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${getIndicatorClass(metrics.equity, 40000, 60000)}`} />
                                <span className="text-xs text-slate-400">Target: $60K+</span>
                            </div>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-5 text-center border-2 border-slate-700 hover:border-teal-500 transition">
                            <div className="text-sm text-slate-400 mb-2">Cash-on-Cash</div>
                            <div className="text-3xl font-bold mb-2">{metrics.cocReturn.toFixed(1)}%</div>
                            <div className="flex items-center justify-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${getIndicatorClass(metrics.cocReturn, 10, 15)}`} />
                                <span className="text-xs text-slate-400">Target: 15%+</span>
                            </div>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-5 text-center border-2 border-slate-700 hover:border-teal-500 transition">
                            <div className="text-sm text-slate-400 mb-2">Cap Rate</div>
                            <div className="text-3xl font-bold mb-2">{metrics.capRate.toFixed(1)}%</div>
                            <div className="flex items-center justify-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${getIndicatorClass(metrics.capRate, 8, 12)}`} />
                                <span className="text-xs text-slate-400">Target: 8%+</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                        <h2 className="text-xl font-semibold mb-6">Overall Deal Score</h2>
                        <div className="text-center">
                            <div className="relative w-64 h-32 mx-auto mb-4">
                                <svg viewBox="0 0 200 120" className="w-full h-full">
                                    <path
                                        d="M 20,100 A 80,80 0 0,1 180,100"
                                        stroke="#334155"
                                        fill="none"
                                        strokeWidth="20"
                                    />
                                    <path
                                        d="M 20,100 A 80,80 0 0,1 180,100"
                                        stroke={metrics.gaugeColor}
                                        fill="none"
                                        strokeWidth="20"
                                        strokeDasharray="251"
                                        strokeDashoffset={251 - (metrics.score / 100) * 251}
                                        strokeLinecap="round"
                                    />
                                    <line
                                        x1="100"
                                        y1="100"
                                        x2="100"
                                        y2="40"
                                        stroke="#f8fafc"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        style={{ transform: `rotate(${metrics.gaugeRotation}deg)`, transformOrigin: "100px 100px" }}
                                    />
                                    <circle cx="100" cy="100" r="8" fill="#f8fafc" />
                                </svg>
                            </div>
                            <div className="text-5xl font-bold mb-3">{metrics.score}</div>
                            <div className="mb-4">
                                <span
                                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border-2 ${
                                        metrics.scoreClass === "excellent"
                                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                                            : metrics.scoreClass === "good"
                                            ? "bg-green-500/20 text-green-400 border-green-500"
                                            : metrics.scoreClass === "fair"
                                            ? "bg-amber-500/20 text-amber-400 border-amber-500"
                                            : "bg-red-500/20 text-red-400 border-red-500"
                                    }`}
                                >
                                    {metrics.scoreBadge}
                                </span>
                            </div>
                            <div className="text-sm text-slate-400 text-left space-y-2">
                                <div className="flex justify-between">
                                    <span>ROI Rating:</span>
                                    <span className="font-semibold text-emerald-400">{metrics.roiRating}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Market Position:</span>
                                    <span className="font-semibold text-emerald-400">{metrics.marketRating}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Risk Level:</span>
                                    <span className="font-semibold text-emerald-400">{metrics.riskRating}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                        <h2 className="text-xl font-semibold mb-6">Performance Benchmarks</h2>
                        <div className="space-y-5">
                            <div className="bg-slate-800 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Purchase to ARV Ratio</span>
                                    <span className="font-semibold text-lg">{metrics.arvRatio.toFixed(0)}%</span>
                                </div>
                                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${getProgressColor(metrics.arvRatio, 65, 75)}`}
                                        style={{ width: `${Math.min((metrics.arvRatio / 100) * 100, 100)}%` }}
                                    />
                                </div>
                                <div className="text-xs text-slate-400 mt-1">Target: 65-75% | Current: Good</div>
                            </div>
                            <div className="bg-slate-800 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Repair to ARV Ratio</span>
                                    <span className="font-semibold text-lg">{metrics.repairRatio.toFixed(0)}%</span>
                                </div>
                                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${getProgressColor(metrics.repairRatio, 0, 15)}`}
                                        style={{ width: `${Math.min((metrics.repairRatio / 20) * 100, 100)}%` }}
                                    />
                                </div>
                                <div className="text-xs text-slate-400 mt-1">Target: &lt;15% | Current: Excellent</div>
                            </div>
                            <div className="bg-slate-800 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Rent to Price Ratio</span>
                                    <span className="font-semibold text-lg">{metrics.rentRatio.toFixed(1)}%</span>
                                </div>
                                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${getProgressColor(metrics.rentRatio * 100, 100, 150)}`}
                                        style={{ width: `${Math.min((metrics.rentRatio * 100 / 150) * 100, 100)}%` }}
                                    />
                                </div>
                                <div className="text-xs text-slate-400 mt-1">Target: 1%+ | Current: Strong</div>
                            </div>
                            <div className="bg-slate-800 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Profit Margin</span>
                                    <span className="font-semibold text-lg">{metrics.profitMargin.toFixed(0)}%</span>
                                </div>
                                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${getProgressColor(metrics.profitMargin, 15, 20)}`}
                                        style={{ width: `${Math.min((metrics.profitMargin / 25) * 100, 100)}%` }}
                                    />
                                </div>
                                <div className="text-xs text-slate-400 mt-1">Target: 15-20% | Current: Excellent</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 mb-6 border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <svg className="w-5 h-5 text-emerald-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Deal Strengths
                            </h3>
                            <div className="space-y-3 text-sm text-slate-300">
                                <div className="flex items-start">
                                    <span className="text-emerald-400 mr-2">✓</span>
                                    <div>
                                        <div className="font-medium text-slate-200">Excellent ROI potential at {metrics.roi.toFixed(1)}%</div>
                                        <div className="text-slate-400">Well above the 25% target for strong deals</div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-emerald-400 mr-2">✓</span>
                                    <div>
                                        <div className="font-medium text-slate-200">Strong instant equity position</div>
                                        <div className="text-slate-400">{formatCurrency(metrics.equity)} in immediate equity meets target threshold</div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-emerald-400 mr-2">✓</span>
                                    <div>
                                        <div className="font-medium text-slate-200">Favorable purchase price</div>
                                        <div className="text-slate-400">{metrics.arvRatio.toFixed(0)}% of ARV provides solid profit margin</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Recommendations
                            </h3>
                            <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4">
                                <div className="text-sm text-slate-300 leading-relaxed">
                                    This is a <span className="font-semibold text-emerald-400">strong deal</span> with excellent ROI and equity potential. Consider negotiating slightly higher rent to improve cash flow metrics above the 10% threshold.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 mb-6 border border-slate-800">
                    <h2 className="text-xl font-semibold mb-6">Comparable Deals Analysis</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-slate-600">
                                <tr className="text-left">
                                    <th className="pb-3">Metric</th>
                                    <th className="pb-3">Your Deal</th>
                                    <th className="pb-3">Market Average</th>
                                    <th className="pb-3">Top 10% Deals</th>
                                    <th className="pb-3">Performance</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300">
                                <tr className="border-b border-slate-700">
                                    <td className="py-3">ROI</td>
                                    <td className="py-3 font-semibold">{metrics.roi.toFixed(1)}%</td>
                                    <td className="py-3">20%</td>
                                    <td className="py-3">35%</td>
                                    <td className="py-3">
                                        <span className="text-emerald-400">▲ Above Top 10%</span>
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-700">
                                    <td className="py-3">Cap Rate</td>
                                    <td className="py-3 font-semibold">{metrics.capRate.toFixed(1)}%</td>
                                    <td className="py-3">8.5%</td>
                                    <td className="py-3">11.0%</td>
                                    <td className="py-3">
                                        <span className="text-emerald-400">▲ Above Average</span>
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-700">
                                    <td className="py-3">CoC Return</td>
                                    <td className="py-3 font-semibold">{metrics.cocReturn.toFixed(1)}%</td>
                                    <td className="py-3">12%</td>
                                    <td className="py-3">15%</td>
                                    <td className="py-3">
                                        <span className="text-red-400">▼ Below Average</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3">Instant Equity</td>
                                    <td className="py-3 font-semibold">{formatCurrency(metrics.equity)}</td>
                                    <td className="py-3">$45,000</td>
                                    <td className="py-3">$65,000</td>
                                    <td className="py-3">
                                        <span className="text-emerald-400">▲ Above Average</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                    <button
                        onClick={handleDownload}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white transition hover:bg-teal-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Analysis Report
                    </button>
                </div>
            </div>
        </div>
    );
}

