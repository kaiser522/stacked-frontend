import React, { useState, useEffect, useMemo } from "react";

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getDaysUntil(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const diff = date - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function CaseStatusTracker() {
    const [currentCase, setCurrentCase] = useState(null);
    const [milestones, setMilestones] = useState([]);
    const [showNewCaseModal, setShowNewCaseModal] = useState(false);
    const [showAddMilestoneModal, setShowAddMilestoneModal] = useState(false);
    const [showEditMilestoneModal, setShowEditMilestoneModal] = useState(false);
    const [showEditCaseModal, setShowEditCaseModal] = useState(false);
    const [editingMilestoneId, setEditingMilestoneId] = useState(null);
    const [caseForm, setCaseForm] = useState({ name: "", number: "", court: "" });
    const [milestoneForm, setMilestoneForm] = useState({ name: "", description: "", date: "" });

    const progress = useMemo(() => {
        if (milestones.length === 0) return { completed: 0, total: 0, percent: 0 };
        const completed = milestones.filter((m) => m.completed).length;
        const total = milestones.length;
        return { completed, total, percent: (completed / total) * 100 };
    }, [milestones]);

    const currentStatus = useMemo(() => {
        const currentItem = milestones.find((item) => item.current);
        if (currentItem) return currentItem.title;
        if (progress.completed === progress.total && progress.total > 0) return "All Complete";
        return "-";
    }, [milestones, progress]);

    const nextDeadline = useMemo(() => {
        const currentItem = milestones.find((item) => item.current);
        if (currentItem) {
            const daysUntil = getDaysUntil(currentItem.date);
            return `${formatDate(currentItem.date)} (${daysUntil} days)`;
        }
        return "-";
    }, [milestones]);

    const handleCreateCase = () => {
        if (!caseForm.name || !caseForm.number) {
            alert("Please enter a case name and case number");
            return;
        }
        setCurrentCase({
            name: caseForm.name,
            number: caseForm.number,
            court: caseForm.court || "N/A",
        });
        setShowNewCaseModal(false);
        setCaseForm({ name: "", number: "", court: "" });
    };

    const handleAddMilestone = () => {
        if (!milestoneForm.name || !milestoneForm.date) {
            alert("Please enter a milestone name and date");
            return;
        }
        const newId = milestones.length > 0 ? Math.max(...milestones.map((m) => m.id)) + 1 : 1;
        const newMilestone = {
            id: newId,
            title: milestoneForm.name,
            description: milestoneForm.description || "",
            date: milestoneForm.date,
            completed: false,
            current: milestones.length === 0,
        };
        const updated = [...milestones, newMilestone].sort((a, b) => new Date(a.date) - new Date(b.date));
        setMilestones(updated);
        setShowAddMilestoneModal(false);
        setMilestoneForm({ name: "", description: "", date: "" });
    };

    const handleEditMilestone = (id) => {
        const milestone = milestones.find((m) => m.id === id);
        if (!milestone) return;
        setEditingMilestoneId(id);
        setMilestoneForm({
            name: milestone.title,
            description: milestone.description,
            date: milestone.date,
        });
        setShowEditMilestoneModal(true);
    };

    const handleSaveMilestoneEdit = () => {
        if (!milestoneForm.name || !milestoneForm.date) {
            alert("Please enter a milestone name and date");
            return;
        }
        setMilestones(
            milestones
                .map((m) =>
                    m.id === editingMilestoneId
                        ? {
                              ...m,
                              title: milestoneForm.name,
                              description: milestoneForm.description,
                              date: milestoneForm.date,
                          }
                        : m
                )
                .sort((a, b) => new Date(a.date) - new Date(b.date))
        );
        setShowEditMilestoneModal(false);
        setEditingMilestoneId(null);
        setMilestoneForm({ name: "", description: "", date: "" });
    };

    const handleDeleteMilestone = () => {
        if (window.confirm("Are you sure you want to delete this milestone?")) {
            setMilestones(milestones.filter((m) => m.id !== editingMilestoneId));
            setShowEditMilestoneModal(false);
            setEditingMilestoneId(null);
        }
    };

    const handleMarkComplete = (id) => {
        setMilestones((prev) => {
            const updated = prev.map((m) => {
                if (m.id === id) {
                    return { ...m, completed: true, current: false };
                }
                return m;
            });
            const nextItem = updated.find((m) => !m.completed && m.id !== id);
            if (nextItem) {
                return updated.map((m) => ({ ...m, current: m.id === nextItem.id }));
            }
            return updated;
        });
    };

    const handleSaveCaseEdit = () => {
        if (!caseForm.name || !caseForm.number) {
            alert("Please enter a case name and case number");
            return;
        }
        setCurrentCase({
            ...currentCase,
            name: caseForm.name,
            number: caseForm.number,
            court: caseForm.court || "N/A",
        });
        setShowEditCaseModal(false);
    };

    const handleDownload = () => {
        if (!currentCase) return;
        const now = new Date();
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${currentCase.name} - Case Tracker</title>
  <style>
    body { background: #0f172a; color: #f8fafc; padding: 40px; font-family: Inter, sans-serif; }
    .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #334155; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${currentCase.name}</h1>
    <div>Case #${currentCase.number} | Generated: ${now.toLocaleDateString()}</div>
  </div>
  <div class="card">
    <h2>Case Timeline</h2>
    ${milestones.map((m) => `<div>${m.title} - ${formatDate(m.date)}</div>`).join("")}
  </div>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `case-tracker-${currentCase.number.replace(/[^a-zA-Z0-9]/g, "-")}-${now.toISOString().split("T")[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4">
            <div className="max-w-5xl mx-auto">
                <div className="bg-slate-900 rounded-xl p-6 mb-6 border border-slate-800">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Case Status Tracker</h1>
                            <p className="text-slate-400">Track probate cases manually through each milestone</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowNewCaseModal(true)}
                                className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 font-medium text-slate-100 transition hover:bg-slate-600"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Case
                            </button>
                            {currentCase && (
                                <button
                                    onClick={handleDownload}
                                    className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 font-medium text-white transition hover:bg-teal-600"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download Tracker
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {!currentCase ? (
                    <div className="bg-slate-900 rounded-xl p-12 text-center border border-slate-800">
                        <svg className="w-32 h-32 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h2 className="text-2xl font-semibold mb-3">No Cases Yet</h2>
                        <p className="text-slate-400 mb-6">Start by creating your first probate case to track its progress through each milestone.</p>
                        <button
                            onClick={() => setShowNewCaseModal(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 font-medium text-white transition hover:bg-teal-600"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Create Your First Case
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="bg-slate-900 rounded-xl p-6 mb-6 border border-slate-800">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-semibold mb-1">{currentCase.name}</h2>
                                    <p className="text-slate-400 text-sm">Case #{currentCase.number}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setCaseForm({ name: currentCase.name, number: currentCase.number, court: currentCase.court });
                                        setShowEditCaseModal(true);
                                    }}
                                    className="inline-flex items-center gap-1 rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-600"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <span className="text-sm text-slate-400">Current Status</span>
                                    <div className="font-semibold text-lg">{currentStatus}</div>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-400">Next Deadline</span>
                                    <div className="font-semibold text-lg">{nextDeadline}</div>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-400">Progress</span>
                                    <div className="font-semibold text-lg">
                                        {progress.completed}/{progress.total} Complete ({Math.round(progress.percent)}%)
                                    </div>
                                </div>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden mt-4">
                                <div
                                    className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-1000"
                                    style={{ width: `${progress.percent}%` }}
                                />
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">Case Timeline</h2>
                                <button
                                    onClick={() => setShowAddMilestoneModal(true)}
                                    className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-600"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Milestone
                                </button>
                            </div>

                            {milestones.length === 0 ? (
                                <div className="text-center text-slate-400 py-8">
                                    No milestones yet. Click "Add Milestone" to get started.
                                </div>
                            ) : (
                                <div className="relative pl-10">
                                    <div
                                        className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-700"
                                        style={{
                                            background: `linear-gradient(to bottom, #14b8a6 0%, #14b8a6 ${progress.percent}%, #475569 ${progress.percent}%, #475569 100%)`,
                                        }}
                                    />
                                    {milestones.map((milestone, index) => {
                                        const daysUntil = getDaysUntil(milestone.date);
                                        let dateBadgeClass = "bg-slate-500/20 text-slate-400";
                                        let dateText = formatDate(milestone.date);

                                        if (milestone.completed) {
                                            dateBadgeClass = "bg-teal-500/20 text-teal-400";
                                        } else if (daysUntil <= 7 && daysUntil > 0) {
                                            dateBadgeClass = "bg-red-500/20 text-red-400";
                                            dateText += ` (${daysUntil} days)`;
                                        } else if (daysUntil <= 30 && daysUntil > 7) {
                                            dateBadgeClass = "bg-amber-500/20 text-amber-400";
                                            dateText += ` (${daysUntil} days)`;
                                        }

                                        return (
                                            <div key={milestone.id} className="relative mb-6">
                                                <div
                                                    className={`absolute left-2 top-2 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm z-10 shadow-lg ${
                                                        milestone.completed
                                                            ? "bg-teal-500 text-white"
                                                            : milestone.current
                                                            ? "bg-amber-500 text-white animate-pulse"
                                                            : "bg-slate-600 text-slate-300"
                                                    }`}
                                                >
                                                    {milestone.completed ? (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <div className="w-2 h-2 rounded-full bg-current" />
                                                    )}
                                                </div>
                                                <div
                                                    className={`ml-10 rounded-lg p-4 border-2 transition ${
                                                        milestone.completed
                                                            ? "bg-teal-500/10 border-teal-500"
                                                            : milestone.current
                                                            ? "bg-amber-500/10 border-amber-500"
                                                            : "bg-slate-800 border-slate-700 border-dashed"
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-semibold text-lg">{milestone.title}</h3>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${dateBadgeClass}`}>
                                                            {dateText}
                                                        </span>
                                                    </div>
                                                    {milestone.description && (
                                                        <p className="text-sm text-slate-400 mb-3">{milestone.description}</p>
                                                    )}
                                                    {!milestone.completed && (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleMarkComplete(milestone.id)}
                                                                className="inline-flex items-center gap-1 rounded bg-slate-700 px-3 py-1 text-xs font-medium text-slate-100 transition hover:bg-slate-600"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                Mark Complete
                                                            </button>
                                                            <button
                                                                onClick={() => handleEditMilestone(milestone.id)}
                                                                className="inline-flex items-center gap-1 rounded bg-slate-700 px-3 py-1 text-xs font-medium text-slate-100 transition hover:bg-slate-600"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                                Edit
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {showNewCaseModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setShowNewCaseModal(false)}>
                    <div className="w-full max-w-md rounded-lg bg-slate-800 p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Create New Case</h2>
                            <button onClick={() => setShowNewCaseModal(false)} className="text-slate-400 hover:text-white">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Case Name *</label>
                                <input
                                    type="text"
                                    value={caseForm.name}
                                    onChange={(e) => setCaseForm({ ...caseForm, name: e.target.value })}
                                    placeholder="e.g., Estate of John Doe"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Case Number *</label>
                                <input
                                    type="text"
                                    value={caseForm.number}
                                    onChange={(e) => setCaseForm({ ...caseForm, number: e.target.value })}
                                    placeholder="e.g., 2024-PR-12345"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Court</label>
                                <input
                                    type="text"
                                    value={caseForm.court}
                                    onChange={(e) => setCaseForm({ ...caseForm, court: e.target.value })}
                                    placeholder="e.g., County Probate Court"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowNewCaseModal(false)}
                                    className="flex-1 rounded-lg bg-slate-700 px-4 py-2 font-medium text-slate-100 transition hover:bg-slate-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateCase}
                                    className="flex-1 rounded-lg bg-teal-500 px-4 py-2 font-medium text-white transition hover:bg-teal-600"
                                >
                                    Create Case
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAddMilestoneModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setShowAddMilestoneModal(false)}>
                    <div className="w-full max-w-md rounded-lg bg-slate-800 p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Add Milestone</h2>
                            <button onClick={() => setShowAddMilestoneModal(false)} className="text-slate-400 hover:text-white">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Milestone Name *</label>
                                <input
                                    type="text"
                                    value={milestoneForm.name}
                                    onChange={(e) => setMilestoneForm({ ...milestoneForm, name: e.target.value })}
                                    placeholder="e.g., Letters Testamentary Issued"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    value={milestoneForm.description}
                                    onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                                    placeholder="Enter milestone description"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Due Date *</label>
                                <input
                                    type="date"
                                    value={milestoneForm.date}
                                    onChange={(e) => setMilestoneForm({ ...milestoneForm, date: e.target.value })}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowAddMilestoneModal(false)}
                                    className="flex-1 rounded-lg bg-slate-700 px-4 py-2 font-medium text-slate-100 transition hover:bg-slate-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddMilestone}
                                    className="flex-1 rounded-lg bg-teal-500 px-4 py-2 font-medium text-white transition hover:bg-teal-600"
                                >
                                    Add Milestone
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditMilestoneModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setShowEditMilestoneModal(false)}>
                    <div className="w-full max-w-md rounded-lg bg-slate-800 p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Edit Milestone</h2>
                            <button onClick={() => setShowEditMilestoneModal(false)} className="text-slate-400 hover:text-white">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Milestone Name *</label>
                                <input
                                    type="text"
                                    value={milestoneForm.name}
                                    onChange={(e) => setMilestoneForm({ ...milestoneForm, name: e.target.value })}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    value={milestoneForm.description}
                                    onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Due Date *</label>
                                <input
                                    type="date"
                                    value={milestoneForm.date}
                                    onChange={(e) => setMilestoneForm({ ...milestoneForm, date: e.target.value })}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={handleDeleteMilestone}
                                    className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setShowEditMilestoneModal(false)}
                                    className="flex-1 rounded-lg bg-slate-700 px-4 py-2 font-medium text-slate-100 transition hover:bg-slate-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveMilestoneEdit}
                                    className="flex-1 rounded-lg bg-teal-500 px-4 py-2 font-medium text-white transition hover:bg-teal-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditCaseModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setShowEditCaseModal(false)}>
                    <div className="w-full max-w-md rounded-lg bg-slate-800 p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Edit Case Details</h2>
                            <button onClick={() => setShowEditCaseModal(false)} className="text-slate-400 hover:text-white">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Case Name *</label>
                                <input
                                    type="text"
                                    value={caseForm.name}
                                    onChange={(e) => setCaseForm({ ...caseForm, name: e.target.value })}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Case Number *</label>
                                <input
                                    type="text"
                                    value={caseForm.number}
                                    onChange={(e) => setCaseForm({ ...caseForm, number: e.target.value })}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Court</label>
                                <input
                                    type="text"
                                    value={caseForm.court}
                                    onChange={(e) => setCaseForm({ ...caseForm, court: e.target.value })}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowEditCaseModal(false)}
                                    className="flex-1 rounded-lg bg-slate-700 px-4 py-2 font-medium text-slate-100 transition hover:bg-slate-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveCaseEdit}
                                    className="flex-1 rounded-lg bg-teal-500 px-4 py-2 font-medium text-white transition hover:bg-teal-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

