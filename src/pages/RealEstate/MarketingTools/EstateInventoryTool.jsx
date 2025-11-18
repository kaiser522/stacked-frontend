import React, { useState, useMemo } from "react";

const categories = ["real-estate", "vehicles", "jewelry", "furniture", "financial", "other"];

const categoryLabels = {
    "real-estate": "Real Estate",
    vehicles: "Vehicles",
    jewelry: "Jewelry & Valuables",
    furniture: "Furniture",
    financial: "Financial Assets",
    other: "Other",
};

const categoryBadgeClasses = {
    "real-estate": "bg-blue-500/20 text-blue-400",
    vehicles: "bg-red-500/20 text-red-400",
    jewelry: "bg-purple-500/20 text-purple-400",
    furniture: "bg-amber-500/20 text-amber-400",
    financial: "bg-emerald-500/20 text-emerald-400",
    other: "bg-slate-500/20 text-slate-400",
};

function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export default function EstateInventory() {
    const [assets, setAssets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [expandedAsset, setExpandedAsset] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        value: "",
        condition: "excellent",
        description: "",
        location: "",
        photos: [],
    });
    const [uploadedPhotos, setUploadedPhotos] = useState([]);

    const summary = useMemo(() => {
        const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
        const totalPhotos = assets.reduce((sum, asset) => sum + asset.photos.length, 0);
        const categoriesSet = new Set(assets.map((a) => a.category));
        const highestValueAsset = assets.length > 0 ? assets.reduce((max, asset) => (asset.value > max.value ? asset : max), assets[0]) : null;
        const avgValue = assets.length > 0 ? totalValue / assets.length : 0;
        const assetsWithPhotos = assets.filter((a) => a.photos.length > 0).length;
        const photosPercentage = assets.length > 0 ? Math.round((assetsWithPhotos / assets.length) * 100) : 0;

        return {
            totalAssets: assets.length,
            totalValue,
            totalPhotos,
            categoriesCount: categoriesSet.size,
            highestValue: highestValueAsset?.name || "-",
            avgValue,
            photosPercentage,
        };
    }, [assets]);

    const categoryBreakdown = useMemo(() => {
        const breakdown = {};
        assets.forEach((asset) => {
            if (!breakdown[asset.category]) {
                breakdown[asset.category] = 0;
            }
            breakdown[asset.category] += asset.value;
        });
        return Object.entries(breakdown)
            .map(([category, value]) => ({ category, value }))
            .sort((a, b) => b.value - a.value);
    }, [assets]);

    const filteredAndSortedAssets = useMemo(() => {
        let filtered = currentFilter === "all" ? assets : assets.filter((a) => a.category === currentFilter);
        if (sortBy === "name") {
            filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "value") {
            filtered = [...filtered].sort((a, b) => b.value - a.value);
        }
        return filtered;
    }, [assets, currentFilter, sortBy]);

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedPhotos((prev) => [...prev, event.target.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.category || !formData.value) {
            alert("Please fill in all required fields");
            return;
        }

        const newAsset = {
            id: Date.now(),
            name: formData.name,
            category: formData.category,
            value: parseFloat(formData.value) || 0,
            condition: formData.condition,
            description: formData.description,
            location: formData.location,
            photos: [...uploadedPhotos],
            dateAdded: new Date().toISOString(),
        };

        setAssets([...assets, newAsset]);
        setShowModal(false);
        setFormData({
            name: "",
            category: "",
            value: "",
            condition: "excellent",
            description: "",
            location: "",
            photos: [],
        });
        setUploadedPhotos([]);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this asset?")) {
            setAssets(assets.filter((a) => a.id !== id));
        }
    };

    const handleDownload = () => {
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Estate Inventory - ${new Date().toLocaleDateString()}</title>
  <style>
    body { background: #0f172a; color: #f8fafc; padding: 40px; font-family: Inter, sans-serif; }
    .header { text-align: center; margin-bottom: 40px; }
    .asset { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Estate Inventory</h1>
    <p>Total Value: ${formatCurrency(summary.totalValue)}</p>
  </div>
  ${assets.map((asset) => `<div class="asset"><h3>${asset.name}</h3><p>${formatCurrency(asset.value)}</p></div>`).join("")}
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Estate_Inventory_${new Date().toISOString().split("T")[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-slate-900 rounded-xl p-6 mb-6 border border-slate-800">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Estate Inventory Tool</h1>
                            <p className="text-slate-400">Track and manage estate assets with photo storage and valuation</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white transition hover:bg-teal-600"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Asset
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-slate-800 rounded-xl p-5 text-center border border-slate-700">
                        <div className="text-3xl font-bold text-teal-400 mb-1">{summary.totalAssets}</div>
                        <div className="text-sm text-slate-400">Total Assets</div>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-5 text-center border border-slate-700">
                        <div className="text-3xl font-bold text-teal-400 mb-1">{formatCurrency(summary.totalValue)}</div>
                        <div className="text-sm text-slate-400">Total Estimated Value</div>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-5 text-center border border-slate-700">
                        <div className="text-3xl font-bold text-teal-400 mb-1">{summary.totalPhotos}</div>
                        <div className="text-sm text-slate-400">Photos Attached</div>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-5 text-center border border-slate-700">
                        <div className="text-3xl font-bold text-teal-400 mb-1">{summary.categoriesCount}</div>
                        <div className="text-sm text-slate-400">Categories</div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-4 mb-6 border border-slate-800">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setCurrentFilter("all")}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                currentFilter === "all" ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-300 border border-slate-700"
                            }`}
                        >
                            All Assets
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCurrentFilter(cat)}
                                className={`px-4 py-2 rounded-lg font-medium transition ${
                                    currentFilter === cat ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-300 border border-slate-700"
                                }`}
                            >
                                {categoryLabels[cat]}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">
                                    Asset Inventory (<span>{filteredAndSortedAssets.length}</span>)
                                </h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSortBy(sortBy === "name" ? "value" : "name")}
                                        className="inline-flex items-center gap-1 rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-600"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                        </svg>
                                        Sort by {sortBy === "name" ? "Value" : "Name"}
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        className="inline-flex items-center gap-1 rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-600"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Export
                                    </button>
                                </div>
                            </div>

                            {filteredAndSortedAssets.length === 0 ? (
                                <div className="text-center py-12 text-slate-400">
                                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <p className="text-lg mb-2">No assets added yet</p>
                                    <p className="text-sm">Click "Add Asset" to start building your estate inventory</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredAndSortedAssets.map((asset) => (
                                        <div
                                            key={asset.id}
                                            className={`rounded-xl border-2 p-4 transition cursor-pointer ${
                                                expandedAsset === asset.id
                                                    ? "border-teal-500 bg-slate-800"
                                                    : "border-slate-700 bg-slate-800/50 hover:border-teal-500/50"
                                            }`}
                                            onClick={() => setExpandedAsset(expandedAsset === asset.id ? null : asset.id)}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg mb-1">{asset.name}</h3>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryBadgeClasses[asset.category]}`}>
                                                        {categoryLabels[asset.category]}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-teal-400">{formatCurrency(asset.value)}</div>
                                                    {asset.photos.length > 0 && (
                                                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            {asset.photos.length} photo{asset.photos.length > 1 ? "s" : ""}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {expandedAsset === asset.id && (
                                                <div className="mt-4 pt-4 border-t border-slate-700">
                                                    {asset.description && <p className="text-sm text-slate-300 mb-3">{asset.description}</p>}
                                                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                                                        <div>
                                                            <span className="text-slate-400">Condition:</span>
                                                            <span className="font-medium ml-2 capitalize">{asset.condition}</span>
                                                        </div>
                                                        {asset.location && (
                                                            <div>
                                                                <span className="text-slate-400">Location:</span>
                                                                <span className="font-medium ml-2">{asset.location}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {asset.photos.length > 0 && (
                                                        <div className="mb-3">
                                                            <div className="text-sm font-medium mb-2">Photos:</div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {asset.photos.map((photo, idx) => (
                                                                    <img
                                                                        key={idx}
                                                                        src={photo}
                                                                        alt={`${asset.name} photo ${idx + 1}`}
                                                                        className="w-20 h-20 object-cover rounded-lg border-2 border-slate-700 cursor-pointer hover:border-teal-500 transition"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            window.open(photo, "_blank");
                                                                        }}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="flex gap-2 mt-4">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(asset.id);
                                                            }}
                                                            className="inline-flex items-center gap-1 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                                                        >
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h3 className="text-lg font-semibold mb-4">Value by Category</h3>
                            <div className="space-y-3">
                                {categoryBreakdown.map(({ category, value }) => (
                                    <div key={category} className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryBadgeClasses[category]}`}>
                                            {categoryLabels[category]}
                                        </span>
                                        <span className="font-semibold">{formatCurrency(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Highest Value Item:</span>
                                    <span className="font-semibold">{summary.highestValue}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Average Item Value:</span>
                                    <span className="font-semibold">{formatCurrency(summary.avgValue)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Items with Photos:</span>
                                    <span className="font-semibold">{summary.photosPercentage}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Last Updated:</span>
                                    <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <h3 className="text-lg font-semibold mb-4">Actions</h3>
                            <button
                                onClick={handleDownload}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-4 py-2 font-medium text-slate-100 transition hover:bg-slate-600"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Inventory
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setShowModal(false)}>
                    <div className="w-full max-w-2xl rounded-lg bg-slate-800 p-6 shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-6">Add New Asset</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Asset Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g., Family Home, 2015 Honda Accord"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Category *</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {categoryLabels[cat]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Estimated Value *</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.value}
                                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                        placeholder="0"
                                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Condition</label>
                                    <select
                                        value={formData.condition}
                                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    >
                                        <option value="excellent">Excellent</option>
                                        <option value="good">Good</option>
                                        <option value="fair">Fair</option>
                                        <option value="poor">Poor</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows="3"
                                    placeholder="Additional details about this asset"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Where is this asset located?"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Upload Photos</label>
                                <div
                                    onClick={() => document.getElementById("photoInput").click()}
                                    className="border-2 border-dashed border-slate-700 rounded-lg p-10 text-center cursor-pointer transition hover:border-teal-500 hover:bg-slate-800/50"
                                >
                                    <svg className="w-12 h-12 mx-auto mb-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-sm text-slate-400">Click to upload photos</p>
                                    <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                                </div>
                                <input
                                    type="file"
                                    id="photoInput"
                                    accept="image/*"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={handlePhotoUpload}
                                />
                                {uploadedPhotos.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {uploadedPhotos.map((photo, idx) => (
                                            <img
                                                key={idx}
                                                src={photo}
                                                alt={`Preview ${idx + 1}`}
                                                className="w-20 h-20 object-cover rounded-lg border-2 border-slate-700"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 rounded-lg bg-slate-700 px-4 py-2 font-medium text-slate-100 transition hover:bg-slate-600"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 rounded-lg bg-teal-500 px-4 py-2 font-medium text-white transition hover:bg-teal-600">
                                    Add Asset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

