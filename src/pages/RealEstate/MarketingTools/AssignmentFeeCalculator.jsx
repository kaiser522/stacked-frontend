import React, { useState, useMemo } from "react";

function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export default function AssignmentFeeCalculator() {
    const [propertyAddress, setPropertyAddress] = useState("");
    const [purchasePrice, setPurchasePrice] = useState(150000);
    const [assignmentFee, setAssignmentFee] = useState(10000);
    const [endBuyerPrice, setEndBuyerPrice] = useState(165000);
    const [closingCosts, setClosingCosts] = useState(3000);
    const [repairs, setRepairs] = useState(5000);
    const [holdingCosts, setHoldingCosts] = useState(500);
    const [otherCosts, setOtherCosts] = useState(0);

    const calculations = useMemo(() => {
        const totalCosts = purchasePrice + closingCosts + repairs + holdingCosts + otherCosts;
        const grossProfit = endBuyerPrice - totalCosts;
        const netProfit = grossProfit - assignmentFee;
        const roi = purchasePrice > 0 ? (netProfit / purchasePrice) * 100 : 0;
        const profitMargin = endBuyerPrice > 0 ? (netProfit / endBuyerPrice) * 100 : 0;

        return {
            totalCosts,
            grossProfit,
            netProfit,
            roi,
            profitMargin,
        };
    }, [purchasePrice, closingCosts, repairs, holdingCosts, otherCosts, endBuyerPrice, assignmentFee]);

    const breakdown = useMemo(() => {
        const totalInvestment = purchasePrice + closingCosts + repairs + holdingCosts + otherCosts;
        const spread = endBuyerPrice - purchasePrice;
        const assignmentFeePercent = purchasePrice > 0 ? (assignmentFee / purchasePrice) * 100 : 0;
        return {
            totalInvestment,
            spread,
            assignmentFeePercent,
        };
    }, [purchasePrice, closingCosts, repairs, holdingCosts, otherCosts, endBuyerPrice, assignmentFee]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Assignment Fee Calculator</h1>
                    <p className="text-slate-400">Calculate your profit on wholesale assignment deals</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Property Address</label>
                                <input
                                    type="text"
                                    value={propertyAddress}
                                    onChange={(e) => setPropertyAddress(e.target.value)}
                                    placeholder="123 Main Street, City, State ZIP"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h2 className="text-xl font-semibold mb-4">Deal Structure</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Purchase Price (Contract Price)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-slate-400">$</span>
                                        <input
                                            type="number"
                                            value={purchasePrice}
                                            onChange={(e) => setPurchasePrice(parseFloat(e.target.value) || 0)}
                                            className="w-full pl-8 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Assignment Fee</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-slate-400">$</span>
                                        <input
                                            type="number"
                                            value={assignmentFee}
                                            onChange={(e) => setAssignmentFee(parseFloat(e.target.value) || 0)}
                                            className="w-full pl-8 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">End Buyer Price (Sale Price)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-slate-400">$</span>
                                        <input
                                            type="number"
                                            value={endBuyerPrice}
                                            onChange={(e) => setEndBuyerPrice(parseFloat(e.target.value) || 0)}
                                            className="w-full pl-8 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h2 className="text-xl font-semibold mb-4">Costs</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Closing Costs</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-slate-400">$</span>
                                        <input
                                            type="number"
                                            value={closingCosts}
                                            onChange={(e) => setClosingCosts(parseFloat(e.target.value) || 0)}
                                            className="w-full pl-8 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Repairs/Rehab</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-slate-400">$</span>
                                        <input
                                            type="number"
                                            value={repairs}
                                            onChange={(e) => setRepairs(parseFloat(e.target.value) || 0)}
                                            className="w-full pl-8 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Holding Costs (Monthly)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-slate-400">$</span>
                                        <input
                                            type="number"
                                            value={holdingCosts}
                                            onChange={(e) => setHoldingCosts(parseFloat(e.target.value) || 0)}
                                            className="w-full pl-8 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Other Costs</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-slate-400">$</span>
                                        <input
                                            type="number"
                                            value={otherCosts}
                                            onChange={(e) => setOtherCosts(parseFloat(e.target.value) || 0)}
                                            className="w-full pl-8 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h2 className="text-xl font-semibold mb-4">Visual Breakdown</h2>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Purchase Price</span>
                                        <span className="font-semibold">{formatCurrency(purchasePrice)}</span>
                                    </div>
                                    <div className="h-8 bg-slate-800 rounded-lg flex items-center justify-center text-sm font-semibold border-2 border-slate-700">
                                        {formatCurrency(purchasePrice)}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Assignment Fee</span>
                                        <span className="font-semibold text-teal-400">{formatCurrency(assignmentFee)}</span>
                                    </div>
                                    <div className="h-8 bg-teal-500/20 rounded-lg flex items-center justify-center text-sm font-semibold border-2 border-teal-500">
                                        {formatCurrency(assignmentFee)}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>End Buyer Price</span>
                                        <span className="font-semibold">{formatCurrency(endBuyerPrice)}</span>
                                    </div>
                                    <div className="h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-sm font-semibold border-2 border-blue-500">
                                        {formatCurrency(endBuyerPrice)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h2 className="text-xl font-semibold mb-4">Detailed Breakdown</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-slate-800">
                                    <span className="text-slate-300">Purchase Price</span>
                                    <span className="font-medium">{formatCurrency(purchasePrice)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-800">
                                    <span className="text-slate-300">+ Closing Costs</span>
                                    <span className="font-medium text-red-400">+{formatCurrency(closingCosts)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-800">
                                    <span className="text-slate-300">+ Repairs/Rehab</span>
                                    <span className="font-medium text-red-400">+{formatCurrency(repairs)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-800">
                                    <span className="text-slate-300">+ Holding Costs</span>
                                    <span className="font-medium text-red-400">+{formatCurrency(holdingCosts)}</span>
                                </div>
                                {otherCosts > 0 && (
                                    <div className="flex justify-between py-2 border-b border-slate-800">
                                        <span className="text-slate-300">+ Other Costs</span>
                                        <span className="font-medium text-red-400">+{formatCurrency(otherCosts)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between py-2 border-b-2 border-slate-700">
                                    <span className="font-semibold">Total Investment</span>
                                    <span className="font-bold">{formatCurrency(breakdown.totalInvestment)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-800">
                                    <span className="text-slate-300">End Buyer Price</span>
                                    <span className="font-medium">{formatCurrency(endBuyerPrice)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b-2 border-slate-700">
                                    <span className="font-semibold">Gross Profit</span>
                                    <span className="font-bold text-blue-400">{formatCurrency(calculations.grossProfit)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-800">
                                    <span className="text-slate-300">- Assignment Fee</span>
                                    <span className="font-medium text-red-400">-{formatCurrency(assignmentFee)}</span>
                                </div>
                                <div className="flex justify-between py-3 pt-4 border-t-2 border-teal-500">
                                    <span className="font-bold text-lg">Your Net Profit</span>
                                    <span className="font-bold text-2xl text-teal-400">{formatCurrency(calculations.netProfit)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-teal-500 rounded-2xl p-8 text-center">
                            <div className="text-sm font-medium text-slate-300 mb-2">YOUR NET PROFIT</div>
                            <div className="text-5xl font-bold text-teal-400 mb-3">{formatCurrency(calculations.netProfit)}</div>
                            <div className="text-sm text-slate-400">ROI: {calculations.roi.toFixed(1)}%</div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Assignment Fee %</span>
                                    <span className="font-semibold">{breakdown.assignmentFeePercent.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Price Spread</span>
                                    <span className="font-semibold">{formatCurrency(breakdown.spread)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Profit Margin</span>
                                    <span className="font-semibold">{calculations.profitMargin.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Total Investment</span>
                                    <span className="font-semibold">{formatCurrency(breakdown.totalInvestment)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h3 className="text-lg font-semibold mb-4">Deal Analysis</h3>
                            <div className="space-y-3">
                                {calculations.netProfit > 0 ? (
                                    <div className="p-4 rounded-lg bg-emerald-500/20 border border-emerald-500">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-semibold text-emerald-400">Profitable Deal</span>
                                        </div>
                                        <p className="text-sm text-slate-300">This deal shows a positive return on investment.</p>
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-lg bg-red-500/20 border border-red-500">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-semibold text-red-400">Not Profitable</span>
                                        </div>
                                        <p className="text-sm text-slate-300">This deal would result in a loss. Consider renegotiating terms.</p>
                                    </div>
                                )}
                                {calculations.roi > 20 && (
                                    <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500">
                                        <div className="text-sm font-semibold text-blue-400 mb-1">High ROI Deal</div>
                                        <p className="text-xs text-slate-300">ROI exceeds 20% - excellent opportunity!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

