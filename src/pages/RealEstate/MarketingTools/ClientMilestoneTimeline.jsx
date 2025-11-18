import React, { useEffect, useMemo, useState } from "react";

const milestoneTemplates = [
    {
        name: "Contract Signed",
        daysOffset: 0,
        baseDate: "contract",
        template: `Congratulations on your new home, [Client Name]! 🎉

I'm so excited for this next chapter in your life. Your journey to homeownership officially begins today, and I'll be here every step of the way to make sure everything goes smoothly.

What to expect next:
• I'll keep you updated on all important dates and deadlines
• Feel free to reach out anytime with questions
• We'll work together to make closing day stress-free

Looking forward to handing you those keys!

Best regards`,
    },
    {
        name: "Closing Day",
        daysOffset: 0,
        baseDate: "closing",
        template: `Welcome home, [Client Name]! 🏡

Today is the day! Congratulations on closing on your new home. This is such an exciting milestone, and I'm honored to have been part of your journey.

A few helpful resources as you settle in:
• Keep all your closing documents in a safe place
• Update your address with important institutions
• Consider setting up home insurance and utilities

I'll check in with you in a few weeks to see how you're settling in. In the meantime, don't hesitate to reach out if you need anything at all.

Congratulations again!

Warm regards`,
    },
    {
        name: "30-Day Check-in",
        daysOffset: 30,
        baseDate: "closing",
        template: `Hi [Client Name],

I hope you're settling into your new home beautifully! It's been about a month since closing, and I wanted to check in and see how everything is going.

How are you enjoying your new space? Have you:
• Found your favorite room yet?
• Met any neighbors?
• Discovered any great local spots?

If you have any questions about home maintenance or need recommendations for local services, I'm always here to help. I also love hearing success stories, so feel free to share how you're making the house your own!

Looking forward to hearing from you.

Best`,
    },
    {
        name: "6-Month Check-in",
        daysOffset: 180,
        baseDate: "closing",
        template: `Hi [Client Name],

Can you believe it's been six months already? Time flies when you're making a house a home! I hope you're absolutely loving your space.

I'm reaching out to:
• See how everything is going with the home
• Answer any questions that may have come up
• Offer any support or recommendations you might need

This is also a great time to think about any home improvements or updates you've been considering. If you need trusted contractor recommendations or have questions about maximizing your home's value, I'm always happy to help.

Hope all is well!

Best regards`,
    },
    {
        name: "1-Year Anniversary",
        daysOffset: 365,
        baseDate: "closing",
        template: `Happy Anniversary, [Client Name]! 🎊

I can't believe it's been a full year since you got the keys to your home! This is such a special milestone, and I hope this past year has been filled with wonderful memories.

As you reflect on your first year:
• What's been your favorite part about the home?
• Any improvements or changes you've made?
• How has the neighborhood been?

Now is also a great time to review your home's value and equity. If you're curious about how your investment has grown or have any questions about your home, I'm here to help.

Thank you for letting me be part of your homeownership journey. Here's to many more happy years in your home!

Cheers`,
    },
];

const statusClasses = {
    upcoming: "bg-blue-500",
    pending: "bg-amber-400",
    completed: "bg-emerald-500",
};

const statusText = {
    upcoming: "Upcoming milestone",
    pending: "Action needed - send this message",
    completed: "Completed milestone",
};

function formatDisplayDate(date) {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function normalizeDate(date) {
    const next = new Date(date);
    next.setHours(0, 0, 0, 0);
    return next;
}

export default function ClientMilestoneTimeline() {
    const [formData, setFormData] = useState({
        clientName: "",
        contractDate: "",
        closingDate: "",
    });
    const [timeline, setTimeline] = useState(null);
    const [copiedIndex, setCopiedIndex] = useState(null);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setFormData((prev) => ({ ...prev, contractDate: prev.contractDate || today }));
    }, []);

    useEffect(() => {
        if (copiedIndex === null) return undefined;
        const timer = setTimeout(() => setCopiedIndex(null), 2000);
        return () => clearTimeout(timer);
    }, [copiedIndex]);

    const handleChange = (field) => (event) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const clientName = formData.clientName.trim();
        const contractDate = formData.contractDate ? new Date(formData.contractDate) : null;
        const closingDate = formData.closingDate ? new Date(formData.closingDate) : null;

        if (!clientName || !contractDate || !closingDate || Number.isNaN(contractDate) || Number.isNaN(closingDate)) {
            return;
        }

        const today = normalizeDate(new Date());

        const milestones = milestoneTemplates.map((milestone) => {
            const base = milestone.baseDate === "contract" ? contractDate : closingDate;
            const milestoneDate = normalizeDate(new Date(base));
            milestoneDate.setDate(milestoneDate.getDate() + milestone.daysOffset);

            let status = "upcoming";
            if (milestoneDate <= today) {
                status = "pending";
            }

            return {
                ...milestone,
                date: milestoneDate,
                status,
                template: milestone.template.replace(/\[Client Name\]/g, clientName),
            };
        });

        setTimeline({
            clientName,
            contractDate,
            closingDate,
            milestones,
        });
    };

    const handleToggleComplete = (index) => {
        setTimeline((prev) => {
            if (!prev) return prev;
            const today = normalizeDate(new Date());
            const milestones = prev.milestones.map((milestone, idx) => {
                if (idx !== index) return milestone;

                if (milestone.status === "completed") {
                    const fallbackStatus = milestone.date <= today ? "pending" : "upcoming";
                    return { ...milestone, status: fallbackStatus };
                }

                return { ...milestone, status: "completed" };
            });

            return { ...prev, milestones };
        });
    };

    const handleCopy = async (text, index) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
        } catch (error) {
            console.error("Unable to copy template", error);
        }
    };

    const handleReset = () => {
        const today = new Date().toISOString().split("T")[0];
        setTimeline(null);
        setFormData({
            clientName: "",
            contractDate: today,
            closingDate: "",
        });
    };

    const timelineSummary = useMemo(() => {
        if (!timeline) return null;
        return {
            contractDisplay: formatDisplayDate(timeline.contractDate),
            closingDisplay: formatDisplayDate(timeline.closingDate),
        };
    }, [timeline]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">Client Milestone Timeline</h1>
                    <p className="text-slate-400 text-lg">
                        Track important dates and never miss a client touchpoint
                    </p>
                </header>

                {!timeline && (
                    <section className="space-y-6">
                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-2">Client Information</h2>
                            <p className="text-slate-400 mb-6">
                                Enter your client details to generate their milestone timeline
                            </p>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="clientName" className="block text-sm font-medium text-slate-300 mb-2">
                                        Client Name *
                                    </label>
                                    <input
                                        id="clientName"
                                        type="text"
                                        required
                                        value={formData.clientName}
                                        onChange={handleChange("clientName")}
                                        placeholder="Enter client name"
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contractDate" className="block text-sm font-medium text-slate-300 mb-2">
                                        Contract Signed Date *
                                    </label>
                                    <input
                                        id="contractDate"
                                        type="date"
                                        required
                                        value={formData.contractDate}
                                        onChange={handleChange("contractDate")}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="closingDate" className="block text-sm font-medium text-slate-300 mb-2">
                                        Closing Date *
                                    </label>
                                    <input
                                        id="closingDate"
                                        type="date"
                                        required
                                        value={formData.closingDate}
                                        onChange={handleChange("closingDate")}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Generate Timeline
                                </button>
                            </form>
                        </div>

                        <div className="rounded-2xl border border-blue-600/40 bg-blue-950/60 p-6 shadow-inner">
                            <div className="flex items-start gap-3">
                                <svg className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold mb-2">How It Works</h3>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        Enter your client's name and key dates. We'll generate a complete timeline showing when to reach out,
                                        what to say, and provide ready-to-use message templates. Mark each milestone as complete as you go
                                        to track your progress and maintain strong client relationships.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {timeline && timelineSummary && (
                    <section className="space-y-6">
                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">{timeline.clientName}</h2>
                                    <p className="text-sm text-slate-400">Milestone Timeline</p>
                                </div>
                                <button
                                    onClick={handleReset}
                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-400 hover:text-slate-100"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    New Client
                                </button>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-800 pt-4 sm:grid-cols-2">
                                <div>
                                    <span className="text-sm text-slate-400">Contract Signed</span>
                                    <div className="mt-1 font-semibold text-slate-100">{timelineSummary.contractDisplay}</div>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-400">Closing Date</span>
                                    <div className="mt-1 font-semibold text-slate-100">{timelineSummary.closingDisplay}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-2">Milestone Timeline</h2>
                            <p className="text-slate-400 mb-6">
                                Follow this timeline to maintain consistent client communication
                            </p>

                            <div className="space-y-6">
                                {timeline.milestones.map((milestone, index) => {
                                    const isCompleted = milestone.status === "completed";
                                    const indicatorClass = statusClasses[milestone.status];
                                    const isPending = milestone.status === "pending";

                                    return (
                                        <div
                                            key={milestone.name}
                                            className={`relative rounded-xl border border-slate-700 bg-slate-800/80 p-5 transition ${isCompleted ? "opacity-60 border-emerald-500/60" : "hover:border-blue-500"} `}
                                        >
                                            {index < timeline.milestones.length - 1 && (
                                                <div className="absolute left-5 top-12 bottom-[-12px] w-px bg-slate-700" />
                                            )}
                                            <div className={`absolute left-4 top-5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 ${indicatorClass}`} />

                                            <div className="pl-8">
                                                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
                                                    <div className="flex-1">
                                                        <span className="inline-block rounded-md bg-slate-900 px-3 py-1 text-sm font-semibold text-blue-400">
                                                            {formatDisplayDate(milestone.date)}
                                                        </span>

                                                        <div className="mt-3 flex items-center gap-3">
                                                            <span className={`inline-flex h-2.5 w-2.5 rounded-full ${indicatorClass}`} />
                                                            <h3 className="text-lg font-semibold text-slate-100">{milestone.name}</h3>
                                                        </div>

                                                        <p className={`mt-2 text-sm ${isCompleted ? "text-emerald-400" : isPending ? "text-amber-400" : "text-slate-400"}`}>
                                                            {statusText[milestone.status]}
                                                        </p>

                                                        <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">
                                                            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
                                                                <span>MESSAGE TEMPLATE</span>
                                                            </div>
                                                            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-200">
                                                                {milestone.template}
                                                            </pre>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleCopy(milestone.template, index)}
                                                                className={`mt-3 inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition ${
                                                                    copiedIndex === index
                                                                        ? "bg-emerald-500 text-white"
                                                                        : "bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white"
                                                                }`}
                                                            >
                                                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    {copiedIndex === index ? (
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                                    ) : (
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                    )}
                                                                </svg>
                                                                {copiedIndex === index ? "Copied!" : "Copy Template"}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleComplete(index)}
                                                        className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition ${
                                                            isCompleted
                                                                ? "border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-400"
                                                                : "border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
                                                        }`}
                                                    >
                                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        {isCompleted ? "Completed" : "Mark Complete"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

