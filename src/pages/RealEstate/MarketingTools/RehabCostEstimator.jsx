import React, { useState, useEffect, useMemo } from "react";

const costCategories = [
    {
        name: "Kitchen Remodel",
        icon: "🍳",
        badge: "COSMETIC",
        items: [
            { label: "New cabinets & countertops", defaultAmount: 8000, checked: true },
            { label: "Appliances (mid-range)", defaultAmount: 3000, checked: true },
            { label: "Backsplash & lighting", defaultAmount: 1500, checked: true },
            { label: "Plumbing fixtures upgrade", defaultAmount: 1200, checked: false },
        ],
    },
    {
        name: "Bathroom Updates",
        icon: "🚿",
        badge: "COSMETIC",
        items: [
            { label: "Vanity, sink & mirror", defaultAmount: 2400, checked: true },
            { label: "Toilet & fixtures", defaultAmount: 800, checked: true },
            { label: "Tub/shower surround", defaultAmount: 3500, checked: false },
            { label: "Tile flooring", defaultAmount: 1800, checked: true },
        ],
    },
    {
        name: "Flooring",
        icon: "🪵",
        badge: "COSMETIC",
        items: [
            { label: "LVP throughout (2000 sqft)", defaultAmount: 6000, checked: true },
            { label: "Carpet in bedrooms", defaultAmount: 2400, checked: false },
            { label: "Hardwood refinishing", defaultAmount: 4000, checked: false },
        ],
    },
    {
        name: "Paint & Finishes",
        icon: "🎨",
        badge: "COSMETIC",
        items: [
            { label: "Interior paint (full house)", defaultAmount: 3000, checked: true },
            { label: "Trim & door replacement", defaultAmount: 2500, checked: false },
            { label: "Light fixtures & ceiling fans", defaultAmount: 1200, checked: false },
        ],
    },
    {
        name: "HVAC & Systems",
        icon: "❄️",
        badge: "SYSTEMS",
        items: [
            { label: "New HVAC system", defaultAmount: 8000, checked: false },
            { label: "Water heater replacement", defaultAmount: 1500, checked: false },
            { label: "Electrical panel upgrade", defaultAmount: 2500, checked: false },
        ],
    },
    {
        name: "Structural & Foundation",
        icon: "🏗️",
        badge: "STRUCTURAL",
        items: [
            { label: "Foundation repair", defaultAmount: 8000, checked: false },
            { label: "Roof replacement", defaultAmount: 12000, checked: false },
            { label: "Structural beam repair", defaultAmount: 5000, checked: false },
        ],
    },
    {
        name: "Exterior",
        icon: "🏡",
        badge: "EXTERIOR",
        items: [
            { label: "Siding replacement", defaultAmount: 10000, checked: false },
            { label: "Windows (all)", defaultAmount: 8000, checked: false },
            { label: "Landscaping & curb appeal", defaultAmount: 3000, checked: false },
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

export default function RehabCostEstimator() {
    const [propertyInfo, setPropertyInfo] = useState({
        address: "",
        clientName: "",
        sqft: 2000,
        condition: "fair",
    });
    const [items, setItems] = useState(() => {
        const initial = {};
        costCategories.forEach((category) => {
            category.items.forEach((item) => {
                initial[item.label] = {
                    checked: item.checked,
                    amount: item.defaultAmount,
                    category: category.name,
                };
            });
        });
        return initial;
    });
    const [contingency, setContingency] = useState(15);
    const [timeline, setTimeline] = useState("6-8 weeks");
    const [difficulty, setDifficulty] = useState("Moderate");
    const [notes, setNotes] = useState("");

    const calculations = useMemo(() => {
        const totals = {
            kitchen: 0,
            bathroom: 0,
            flooring: 0,
            paint: 0,
            systems: 0,
            structural: 0,
            exterior: 0,
        };

        let selectedCount = 0;
        Object.entries(items).forEach(([label, data]) => {
            if (data.checked) {
                const amount = data.amount || 0;
                selectedCount++;
                if (data.category.includes("Kitchen")) totals.kitchen += amount;
                else if (data.category.includes("Bathroom")) totals.bathroom += amount;
                else if (data.category.includes("Flooring")) totals.flooring += amount;
                else if (data.category.includes("Paint")) totals.paint += amount;
                else if (data.category.includes("HVAC") || data.category.includes("Systems")) totals.systems += amount;
                else if (data.category.includes("Structural")) totals.structural += amount;
                else if (data.category.includes("Exterior")) totals.exterior += amount;
            }
        });

        const subtotal = Object.values(totals).reduce((a, b) => a + b, 0);
        const contingencyAmount = subtotal * (contingency / 100);
        const permitsAmount = subtotal * 0.02;
        const total = subtotal + contingencyAmount + permitsAmount;
        const costPerSqft = propertyInfo.sqft > 0 ? total / propertyInfo.sqft : 0;

        return {
            totals,
            subtotal,
            contingencyAmount,
            permitsAmount,
            total,
            costPerSqft,
            selectedCount,
        };
    }, [items, contingency, propertyInfo.sqft]);

    const handleItemChange = (label, field, value) => {
        setItems((prev) => ({
            ...prev,
            [label]: {
                ...prev[label],
                [field]: field === "checked" ? value : parseFloat(value) || 0,
            },
        }));
    };

    const selectTemplate = (type) => {
        const newItems = { ...items };
        costCategories.forEach((category) => {
            category.items.forEach((item, idx) => {
                const key = item.label;
                if (type === "cosmetic") {
                    newItems[key] = {
                        ...newItems[key],
                        checked: idx < 7,
                    };
                } else if (type === "standard") {
                    newItems[key] = {
                        ...newItems[key],
                        checked: idx < 13,
                    };
                } else if (type === "full") {
                    newItems[key] = {
                        ...newItems[key],
                        checked: true,
                    };
                }
            });
        });
        setItems(newItems);
    };

    const loadTemplate = () => {
        if (propertyInfo.condition === "good") selectTemplate("cosmetic");
        else if (propertyInfo.condition === "fair") selectTemplate("standard");
        else selectTemplate("full");
    };

    useEffect(() => {
        loadTemplate();
    }, [propertyInfo.condition]);

    const handleDownload = () => {
        const exportHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Rehab Cost Estimate - ${propertyInfo.address || "Property"}</title>
  <style>
    body { font-family: Inter, sans-serif; background: #f8fafc; padding: 40px; }
    .container { max-width: 900px; margin: 0 auto; background: white; padding: 48px; border-radius: 12px; }
    .header { text-align: center; border-bottom: 3px solid #14b8a6; padding-bottom: 24px; margin-bottom: 32px; }
    h1 { font-size: 2.5rem; font-weight: 700; color: #0f172a; }
    .total-box { background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: white; padding: 32px; border-radius: 12px; text-align: center; margin: 32px 0; }
    .total-value { font-size: 3.5rem; font-weight: 700; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Rehab Cost Estimate</h1>
    </div>
    <div class="total-box">
      <div class="total-value">${formatCurrency(calculations.total)}</div>
    </div>
  </div>
</body>
</html>`;

        const blob = new Blob([exportHTML], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Rehab_Estimate_${propertyInfo.address.replace(/[^a-z0-9]/gi, "_") || "property"}_${new Date().toISOString().split("T")[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-slate-900 rounded-xl p-6 mb-5 border border-slate-800">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Rehab Cost Estimator</h1>
                            <p className="text-slate-400">Quickly calculate renovation and repair costs with smart templates and detailed cost breakdowns</p>
                        </div>
                        <button
                            onClick={handleDownload}
                            className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white transition hover:bg-teal-600"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Estimate
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h2 className="text-xl font-semibold mb-4">Property Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Property Address</label>
                                    <input
                                        type="text"
                                        value={propertyInfo.address}
                                        onChange={(e) => setPropertyInfo({ ...propertyInfo, address: e.target.value })}
                                        placeholder="123 Main St, City, State ZIP"
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Client Name</label>
                                    <input
                                        type="text"
                                        value={propertyInfo.clientName}
                                        onChange={(e) => setPropertyInfo({ ...propertyInfo, clientName: e.target.value })}
                                        placeholder="Client Name"
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Square Footage</label>
                                    <input
                                        type="number"
                                        value={propertyInfo.sqft}
                                        onChange={(e) => setPropertyInfo({ ...propertyInfo, sqft: parseInt(e.target.value) || 0 })}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Property Condition</label>
                                    <select
                                        value={propertyInfo.condition}
                                        onChange={(e) => setPropertyInfo({ ...propertyInfo, condition: e.target.value })}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    >
                                        <option value="good">Good - Minor Updates</option>
                                        <option value="fair">Fair - Moderate Rehab</option>
                                        <option value="poor">Poor - Major Renovation</option>
                                        <option value="gutted">Gutted - Full Rebuild</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h2 className="text-xl font-semibold mb-4">Quick Templates</h2>
                            <p className="text-sm text-slate-400 mb-4">Select a template to auto-populate common renovation items</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button
                                    onClick={() => selectTemplate("cosmetic")}
                                    className="rounded-xl border-2 border-slate-700 bg-slate-800 p-5 text-center transition hover:border-teal-500 hover:-translate-y-1"
                                >
                                    <div className="text-4xl mb-2">🎨</div>
                                    <div className="font-semibold mb-1">Cosmetic Refresh</div>
                                    <div className="text-xs text-slate-400">Paint, flooring, fixtures</div>
                                    <div className="text-teal-400 font-bold mt-2">~$15-20k</div>
                                </button>
                                <button
                                    onClick={() => selectTemplate("standard")}
                                    className="rounded-xl border-2 border-slate-700 bg-slate-800 p-5 text-center transition hover:border-teal-500 hover:-translate-y-1"
                                >
                                    <div className="text-4xl mb-2">🏠</div>
                                    <div className="font-semibold mb-1">Standard Rehab</div>
                                    <div className="text-xs text-slate-400">Kitchen, bath, systems</div>
                                    <div className="text-teal-400 font-bold mt-2">~$35-50k</div>
                                </button>
                                <button
                                    onClick={() => selectTemplate("full")}
                                    className="rounded-xl border-2 border-slate-700 bg-slate-800 p-5 text-center transition hover:border-teal-500 hover:-translate-y-1"
                                >
                                    <div className="text-4xl mb-2">🔨</div>
                                    <div className="font-semibold mb-1">Full Renovation</div>
                                    <div className="text-xs text-slate-400">Complete overhaul</div>
                                    <div className="text-teal-400 font-bold mt-2">~$80-120k</div>
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h2 className="text-xl font-semibold mb-6">Detailed Cost Breakdown</h2>
                            {costCategories.map((category) => (
                                <div key={category.name} className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                        {category.icon} {category.name}
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            category.badge === "COSMETIC" ? "bg-blue-500/20 text-blue-400" :
                                            category.badge === "SYSTEMS" ? "bg-amber-500/20 text-amber-400" :
                                            category.badge === "STRUCTURAL" ? "bg-red-500/20 text-red-400" :
                                            "bg-emerald-500/20 text-emerald-400"
                                        }`}>
                                            {category.badge}
                                        </span>
                                    </h3>
                                    <div className="space-y-2">
                                        {category.items.map((item) => {
                                            const itemData = items[item.label];
                                            return (
                                                <label
                                                    key={item.label}
                                                    className="flex items-center gap-3 rounded-lg bg-slate-800 p-3 cursor-pointer transition hover:bg-slate-700"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={itemData?.checked || false}
                                                        onChange={(e) => handleItemChange(item.label, "checked", e.target.checked)}
                                                        className="w-5 h-5 cursor-pointer"
                                                    />
                                                    <div className="flex-1 flex justify-between items-center">
                                                        <span className="flex-1">{item.label}</span>
                                                        <input
                                                            type="number"
                                                            value={itemData?.amount || 0}
                                                            onChange={(e) => handleItemChange(item.label, "amount", e.target.value)}
                                                            className="w-32 rounded border border-slate-600 bg-slate-900 px-3 py-1 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                                        />
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-teal-500 rounded-2xl p-8 text-center">
                            <div className="text-sm font-medium text-slate-300 mb-2">ESTIMATED TOTAL</div>
                            <div className="text-5xl font-bold text-teal-400 mb-3">{formatCurrency(calculations.total)}</div>
                            <div className="text-sm text-slate-400">{formatCurrency(calculations.costPerSqft)} per sqft</div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h3 className="text-lg font-semibold mb-4">Cost Summary</h3>
                            <div className="space-y-1">
                                <div className="flex justify-between py-3 border-b border-slate-800">
                                    <span className="text-slate-300">Kitchen:</span>
                                    <span className="font-semibold">{formatCurrency(calculations.totals.kitchen)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-800">
                                    <span className="text-slate-300">Bathrooms:</span>
                                    <span className="font-semibold">{formatCurrency(calculations.totals.bathroom)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-800">
                                    <span className="text-slate-300">Flooring:</span>
                                    <span className="font-semibold">{formatCurrency(calculations.totals.flooring)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-800">
                                    <span className="text-slate-300">Paint & Finishes:</span>
                                    <span className="font-semibold">{formatCurrency(calculations.totals.paint)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-800">
                                    <span className="text-slate-300">Systems:</span>
                                    <span className="font-semibold">{formatCurrency(calculations.totals.systems)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-800">
                                    <span className="text-slate-300">Structural:</span>
                                    <span className="font-semibold">{formatCurrency(calculations.totals.structural)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-800">
                                    <span className="text-slate-300">Exterior:</span>
                                    <span className="font-semibold">{formatCurrency(calculations.totals.exterior)}</span>
                                </div>
                                <div className="flex justify-between py-3 pt-4 border-t-2 border-slate-700">
                                    <span className="font-bold text-white">Subtotal:</span>
                                    <span className="font-bold text-teal-400">{formatCurrency(calculations.subtotal)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h3 className="text-lg font-semibold mb-4">Contingency & Fees</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Contingency (%)</label>
                                <input
                                    type="number"
                                    value={contingency}
                                    onChange={(e) => setContingency(parseFloat(e.target.value) || 0)}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Contingency:</span>
                                    <span className="font-semibold">{formatCurrency(calculations.contingencyAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Permits & Fees (est 2%):</span>
                                    <span className="font-semibold">{formatCurrency(calculations.permitsAmount)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h3 className="text-lg font-semibold mb-4">Project Stats</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Items Selected:</span>
                                    <span className="font-semibold">{calculations.selectedCount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Est. Timeline:</span>
                                    <input
                                        type="text"
                                        value={timeline}
                                        onChange={(e) => setTimeline(e.target.value)}
                                        className="w-32 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-sm text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Difficulty:</span>
                                    <select
                                        value={difficulty}
                                        onChange={(e) => setDifficulty(e.target.value)}
                                        className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-sm text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    >
                                        <option>Easy</option>
                                        <option>Moderate</option>
                                        <option>Complex</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows="4"
                                placeholder="Add any special notes, conditions, or observations about the property..."
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

