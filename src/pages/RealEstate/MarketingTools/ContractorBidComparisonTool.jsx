import React, { useState, useEffect, useMemo } from "react";

const initialBids = [
    {
        id: 1,
        contractorName: "Gulf Coast Builders",
        totalAmount: 50550,
        timeline: 8,
        startDate: "2025-05-10",
        contactInfo: "info@gulfcoastbuilders.com",
        notes: "Includes warranty. Licensed and insured.",
        lineItems: [
            { category: "Demo & Disposal", amount: 3850 },
            { category: "Electrical Work", amount: 4200 },
            { category: "Plumbing", amount: 3750 },
            { category: "Framing & Drywall", amount: 5200 },
            { category: "Materials", amount: 9800 },
            { category: "Flooring", amount: 7200 },
            { category: "Cabinetry", amount: 8500 },
            { category: "Painting", amount: 3200 },
            { category: "Fixtures", amount: 2800 },
            { category: "Cleanup", amount: 1200 },
            { category: "Permits", amount: 850 },
        ],
    },
    {
        id: 2,
        contractorName: "Superior Renovations",
        totalAmount: 59850,
        timeline: 7,
        startDate: "2025-05-15",
        contactInfo: "(228) 555-0199",
        notes: "Premium materials. Fast timeline.",
        lineItems: [
            { category: "Demo & Disposal", amount: 3600 },
            { category: "Electrical Work", amount: 6150 },
            { category: "Plumbing", amount: 4400 },
            { category: "Framing & Drywall", amount: 5600 },
            { category: "Materials", amount: 13200 },
            { category: "Flooring", amount: 8800 },
            { category: "Cabinetry", amount: 9200 },
            { category: "Painting", amount: 3450 },
            { category: "Fixtures", amount: 3200 },
            { category: "Cleanup", amount: 1400 },
            { category: "Permits", amount: 850 },
        ],
    },
    {
        id: 3,
        contractorName: "Biloxi Home Pros",
        totalAmount: 49550,
        timeline: 9,
        startDate: "2025-05-07",
        contactInfo: "biloxi@homepros.com",
        notes: "Budget-friendly option. Slightly longer timeline.",
        lineItems: [
            { category: "Demo & Disposal", amount: 3950 },
            { category: "Electrical Work", amount: 4350 },
            { category: "Plumbing", amount: 3650 },
            { category: "Framing & Drywall", amount: 5150 },
            { category: "Materials", amount: 8900 },
            { category: "Flooring", amount: 6950 },
            { category: "Cabinetry", amount: 8750 },
            { category: "Painting", amount: 3250 },
            { category: "Fixtures", amount: 2650 },
            { category: "Cleanup", amount: 1100 },
            { category: "Permits", amount: 850 },
        ],
    },
];

function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export default function BidComparison() {
    const [bids, setBids] = useState(initialBids);
    const [projectName, setProjectName] = useState("421 Pine Street - Complete Interior Renovation");
    const [projectType, setProjectType] = useState("Complete Interior Renovation");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        contractorName: "",
        totalAmount: "",
        timeline: "",
        startDate: "",
        contactInfo: "",
        notes: "",
        lineItems: [{ category: "", amount: "" }],
    });

    const analysis = useMemo(() => {
        if (bids.length === 0) return null;
        const amounts = bids.map((b) => b.totalAmount);
        const lowest = Math.min(...amounts);
        const highest = Math.max(...amounts);
        const average = amounts.reduce((a, b) => a + b, 0) / amounts.length;
        const range = highest - lowest;
        const variance = ((range / average) * 100).toFixed(1);
        const lowestBid = bids.find((b) => b.totalAmount === lowest);
        return { lowest, average, range, variance, lowestBid };
    }, [bids]);

    const lowestBid = useMemo(() => {
        if (bids.length === 0) return null;
        return bids.reduce((min, bid) => (bid.totalAmount < min.totalAmount ? bid : min), bids[0]);
    }, [bids]);

    const fastestBid = useMemo(() => {
        if (bids.length === 0) return null;
        return bids.reduce((min, bid) => (bid.timeline < min.timeline ? bid : min), bids[0]);
    }, [bids]);

    const handleAddLineItem = () => {
        setFormData({
            ...formData,
            lineItems: [...formData.lineItems, { category: "", amount: "" }],
        });
    };

    const handleUpdateLineItem = (index, field, value) => {
        const updated = [...formData.lineItems];
        updated[index][field] = value;
        setFormData({ ...formData, lineItems: updated });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const lineItems = formData.lineItems
            .filter((item) => item.category && item.amount)
            .map((item) => ({
                category: item.category,
                amount: parseFloat(item.amount),
            }));

        const newBid = {
            id: Date.now(),
            contractorName: formData.contractorName,
            totalAmount: parseFloat(formData.totalAmount),
            timeline: parseFloat(formData.timeline),
            startDate: formData.startDate,
            contactInfo: formData.contactInfo,
            notes: formData.notes,
            lineItems,
        };

        setBids([...bids, newBid]);
        setShowModal(false);
        setFormData({
            contractorName: "",
            totalAmount: "",
            timeline: "",
            startDate: "",
            contactInfo: "",
            notes: "",
            lineItems: [{ category: "", amount: "" }],
        });
    };

    const handleDeleteBid = (id) => {
        if (window.confirm("Are you sure you want to delete this bid?")) {
            setBids(bids.filter((bid) => bid.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">Contractor Bid Comparison Tool</h1>
                    <p className="text-slate-400">Compare multiple contractor bids side by side to identify the best pricing, timelines, and service quality.</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 mb-4">
                    <h2 className="text-xl font-semibold mb-4">Project Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Project Name</label>
                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                placeholder="e.g., 421 Pine Street Kitchen Remodel"
                                className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Project Type</label>
                            <select
                                value={projectType}
                                onChange={(e) => setProjectType(e.target.value)}
                                className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                            >
                                <option>Complete Interior Renovation</option>
                                <option>Kitchen Renovation</option>
                                <option>Bathroom Remodel</option>
                                <option>Exterior Work</option>
                                <option>Roof Replacement</option>
                                <option>Custom</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 rounded bg-teal-400 px-4 py-2 font-medium text-slate-900 transition hover:bg-teal-300"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Bid
                    </button>
                </div>

                {bids.length === 0 ? (
                    <div className="bg-slate-800 rounded-lg p-12 text-center text-slate-400">
                        <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h3 className="text-xl font-semibold mb-2">No Bids Added Yet</h3>
                        <p>Click "Add New Bid" to start comparing contractor quotes</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {bids.map((bid) => {
                                const isBestPrice = lowestBid && bid.id === lowestBid.id;
                                const isFastest = fastestBid && bid.id === fastestBid.id;
                                return (
                                    <div
                                        key={bid.id}
                                        className={`relative rounded-lg p-4 border-2 ${
                                            isBestPrice
                                                ? "border-emerald-500 bg-emerald-500/10"
                                                : isFastest
                                                ? "border-blue-500 bg-blue-500/10"
                                                : "border-slate-700 bg-slate-800"
                                        }`}
                                    >
                                        {isBestPrice && (
                                            <div className="absolute top-2 right-2 rounded bg-emerald-500 px-2 py-1 text-xs font-semibold text-white">
                                                Lowest Price
                                            </div>
                                        )}
                                        {isFastest && !isBestPrice && (
                                            <div className="absolute top-2 right-2 rounded bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
                                                Fastest
                                            </div>
                                        )}
                                        <h3 className="text-xl font-bold mb-3">{bid.contractorName}</h3>
                                        <div className="mb-4">
                                            <div className="text-3xl font-bold text-teal-300">{formatCurrency(bid.totalAmount)}</div>
                                            <div className="text-sm text-slate-400 mt-1">{bid.timeline} weeks timeline</div>
                                            {bid.startDate && (
                                                <div className="text-sm text-slate-400">Start: {new Date(bid.startDate).toLocaleDateString()}</div>
                                            )}
                                        </div>
                                        {bid.contactInfo && (
                                            <div className="mb-3">
                                                <div className="text-xs text-slate-400">Contact</div>
                                                <div className="text-sm">{bid.contactInfo}</div>
                                            </div>
                                        )}
                                        {bid.notes && (
                                            <div className="mb-3">
                                                <div className="text-xs text-slate-400">Notes</div>
                                                <div className="text-sm">{bid.notes}</div>
                                            </div>
                                        )}
                                        {bid.lineItems && bid.lineItems.length > 0 && (
                                            <div className="mt-4 border-t border-slate-700 pt-3">
                                                <div className="text-sm font-semibold mb-2">Line Items</div>
                                                <div className="space-y-1">
                                                    {bid.lineItems.map((item, idx) => (
                                                        <div key={idx} className="flex justify-between text-sm border-b border-slate-700 pb-1">
                                                            <span>{item.category}</span>
                                                            <span>{formatCurrency(item.amount)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div className="mt-4 border-t border-slate-700 pt-3">
                                            <button
                                                onClick={() => handleDeleteBid(bid.id)}
                                                className="w-full rounded bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                                            >
                                                Delete Bid
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {analysis && (
                            <div className="bg-slate-800 rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">Bid Analysis</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="rounded-md bg-slate-700 p-4">
                                        <div className="text-sm text-slate-400 mb-1">Lowest Bid</div>
                                        <div className="text-2xl font-bold text-emerald-400">{formatCurrency(analysis.lowest)}</div>
                                        <div className="text-sm text-slate-300 mt-1">{analysis.lowestBid.contractorName}</div>
                                    </div>
                                    <div className="rounded-md bg-slate-700 p-4">
                                        <div className="text-sm text-slate-400 mb-1">Average Bid</div>
                                        <div className="text-2xl font-bold text-blue-400">{formatCurrency(Math.round(analysis.average))}</div>
                                        <div className="text-sm text-slate-300 mt-1">Across all bids</div>
                                    </div>
                                    <div className="rounded-md bg-slate-700 p-4">
                                        <div className="text-sm text-slate-400 mb-1">Price Range</div>
                                        <div className="text-2xl font-bold text-purple-400">{formatCurrency(analysis.range)}</div>
                                        <div className="text-sm text-slate-300 mt-1">{analysis.variance}% variance</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="w-full max-w-2xl rounded-lg bg-slate-800 p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Add New Bid</h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1">Contractor Name*</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.contractorName}
                                    onChange={(e) => setFormData({ ...formData, contractorName: e.target.value })}
                                    placeholder="e.g., Gulf Coast Builders"
                                    className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-1">Total Bid Amount*</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.totalAmount}
                                        onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                                        placeholder="50000"
                                        step="0.01"
                                        className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Timeline (weeks)*</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.timeline}
                                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                        placeholder="8"
                                        step="0.5"
                                        className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Contact Info</label>
                                <input
                                    type="text"
                                    value={formData.contactInfo}
                                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                                    placeholder="Email or phone number"
                                    className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Notes</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    rows="3"
                                    placeholder="Any additional details about this bid..."
                                    className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                />
                            </div>

                            <div className="border-t border-slate-600 pt-4">
                                <h3 className="font-semibold mb-3">Line Items (Optional)</h3>
                                {formData.lineItems.map((item, index) => (
                                    <div key={index} className="mb-2 grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            placeholder="Category (e.g., Demo)"
                                            value={item.category}
                                            onChange={(e) => handleUpdateLineItem(index, "category", e.target.value)}
                                            className="rounded border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Amount"
                                            step="0.01"
                                            value={item.amount}
                                            onChange={(e) => handleUpdateLineItem(index, "amount", e.target.value)}
                                            className="rounded border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/60"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddLineItem}
                                    className="mt-2 rounded bg-slate-700 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-600"
                                >
                                    + Add Line Item
                                </button>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 rounded bg-teal-400 px-4 py-2 font-medium text-slate-900 transition hover:bg-teal-300"
                                >
                                    Save Bid
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="rounded bg-slate-700 px-4 py-2 font-medium text-slate-100 transition hover:bg-slate-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

