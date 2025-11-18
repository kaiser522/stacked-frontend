import { useEffect, useMemo, useState } from "react";

export default function BuyerTimelineTracker() {
  // ----- Stages (progress cards) -----
  const stages = [
    {
      id: "stage1",
      title: "Pre-Approval",
      timeframe: "1–3 days",
      desc: "Get mortgage pre-approval letter",
    },
    {
      id: "stage2",
      title: "House Hunting",
      timeframe: "1–6 weeks",
      desc: "Search and view properties",
    },
    {
      id: "stage3",
      title: "Offer & Negotiation",
      timeframe: "1–5 days",
      desc: "Submit and negotiate offer",
    },
    {
      id: "stage4",
      title: "Under Contract",
      timeframe: "30–45 days total",
      desc: "Contract accepted, process begins",
    },
    {
      id: "stage5",
      title: "Inspections",
      timeframe: "5–10 days from acceptance",
      desc: "Home inspection and response",
    },
    {
      id: "stage6",
      title: "Appraisal",
      timeframe: "1–2 weeks after inspection",
      desc: "Property valuation completed",
    },
    {
      id: "stage7",
      title: "Loan Underwriting",
      timeframe: "1–3 weeks (overlaps)",
      desc: "Lender reviews and approves loan",
    },
    {
      id: "stage8",
      title: "Clear to Close & CD",
      timeframe: "3 business days before close",
      desc: "Final loan approval and disclosure",
    },
    {
      id: "stage9",
      title: "Closing Day",
      timeframe: "1 day",
      desc: "Sign papers and get keys!",
    },
  ];

  // ----- Local storage helpers -----
  const LS_CHECKS = "buyerTimeline:checks";
  const LS_MILESTONES = "buyerTimeline:milestones";

  const [checks, setChecks] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_CHECKS);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_CHECKS, JSON.stringify(checks));
    } catch {}
  }, [checks]);

  const completedCount = Object.values(checks).filter(Boolean).length;
  const totalStages = stages.length;
  const percent = Math.round((completedCount / totalStages) * 100);

  // ----- Milestones -----
  const milestoneList = [
    { key: "offerAccepted", label: "Offer Accepted" },
    {
      key: "emdDue",
      label: "Earnest Money Due",
      strong: true,
      notesPh: "Amount & method",
    },
    {
      key: "inspectionDeadline",
      label: "Inspection Deadline",
      strong: true,
      notesPh: "Inspector contact",
    },
    {
      key: "inspectionResponse",
      label: "Inspection Response Due",
      strong: true,
      notesPh: "Key issues found",
    },
    { key: "appraisalOrdered", label: "Appraisal Ordered" },
    {
      key: "appraisalReceived",
      label: "Appraisal Received",
      notesPh: "Appraised value",
    },
    {
      key: "loanApproval",
      label: "Loan Approval",
      notesPh: "Final loan terms",
    },
    {
      key: "cdReceived",
      label: "Closing Disclosure Received",
      strong: true,
      notesPh: "Final numbers",
    },
    {
      key: "finalWalkthrough",
      label: "Final Walk-Through",
      notesPh: "Items to check",
    },
    {
      key: "closing",
      label: "Closing Date/Time",
      strong: true,
      notesPh: "Time & location",
    },
  ];

  const [milestones, setMilestones] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_MILESTONES);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_MILESTONES, JSON.stringify(milestones));
    } catch {}
  }, [milestones]);

  const setMilestoneField = (key, field, value) =>
    setMilestones((m) => ({
      ...m,
      [key]: { ...(m[key] || {}), [field]: value },
    }));

  // ----- Visual timeline (Gantt-style) -----
  const weeks = useMemo(() => Array.from({ length: 10 }, (_, i) => i + 1), []);
  // helper to build a row's week cells
  const row = (activeWeeks = [], overlapWeeks = []) =>
    weeks.map((w) =>
      activeWeeks.includes(w)
        ? "active"
        : overlapWeeks.includes(w)
        ? "overlap"
        : "idle"
    );

  const gantt = [
    { name: "Pre-Approval", cells: row([1]) },
    { name: "House Hunting", cells: row([1, 2, 3, 4, 5, 6]) },
    { name: "Offer & Negotiation", cells: row([6]) },
    { name: "Under Contract", cells: row([7, 8, 9, 10]) },
    { name: "Inspections", cells: row([7]) },
    { name: "Appraisal", cells: row([8]) },
    { name: "Loan Underwriting", cells: row([], [7, 8, 9]) },
    { name: "Clear to Close & CD", cells: row([10]) },
    { name: "Closing", cells: row([10]) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 p-8 sm:p-12 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-orange-500 grid place-items-center text-2xl font-bold">
            📅
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Buyer Timeline Tracker
          </h1>
          <div className="inline-block mt-5 px-6 py-2 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Process Tracker
          </div>
          <p className="mt-4 text-sky-200 max-w-2xl mx-auto">
            Visual timeline tracker showing each stage of the buying process
            with expected timeframes and milestones.
          </p>
          <div className="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 font-semibold">
            10-week process
          </div>
        </header>

        {/* Progress */}
        <section className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-4">
            Your Progress
          </h2>
          <div className="bg-black/30 rounded-lg p-1">
            <div
              className="h-6 rounded-md bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-slate-900 font-bold transition-all"
              style={{ width: `${percent}%` }}
              id="progressBar"
            >
              {percent}% Complete
            </div>
          </div>
          <p className="text-center mt-3 text-sky-200">
            Check off each stage as you complete it
          </p>
        </section>

        {/* How to use */}
        <section className="mb-8">
          <div className="rounded-2xl border-2 border-orange-500 bg-orange-500/20 p-6">
            <h3 className="text-orange-400 text-2xl font-semibold mb-2">
              💡 How to Use This Tracker
            </h3>
            <p>
              Check off each stage as you complete it. Use the timeline to set
              target dates. Timeframes are typical estimates; your local process
              may vary.
            </p>
            <p className="font-semibold">
              <span className="text-white/90">Important:</span> Dates in{" "}
              <strong>bold</strong> are deadlines—make sure you respond the same
              day.
            </p>
          </div>
        </section>

        {/* Stages */}
        <section className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300">
            Buyer Process Stages
          </h2>
          <p className="text-sky-100 mb-5">
            Track your progress through each stage of the home buying process:
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stages.map((s) => {
              const checked = !!checks[s.id];
              return (
                <div
                  key={s.id}
                  className={[
                    "rounded-xl border-2 p-6 text-center transition-transform",
                    checked
                      ? "bg-emerald-400/30 border-emerald-400"
                      : "bg-white/10 border-emerald-400",
                    "hover:-translate-y-1",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    className="scale-150 mb-4 cursor-pointer accent-emerald-400"
                    checked={checked}
                    onChange={(e) =>
                      setChecks((c) => ({ ...c, [s.id]: e.target.checked }))
                    }
                  />
                  <h4 className="text-emerald-300 text-lg font-semibold">
                    {s.title}
                  </h4>
                  <div className="text-yellow-300 font-bold mt-1">
                    {s.timeframe}
                  </div>
                  <p className="text-sky-100 mt-2">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Visual Timeline */}
        <section className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-1">
            10-Week Visual Timeline
          </h2>
          <p className="text-sky-100 mb-4">
            Gantt-style timeline showing typical process flow:
          </p>

          <div className="rounded-xl bg-black/30 p-4 overflow-x-auto">
            {/* header */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: "200px repeat(10, minmax(50px,1fr))",
                gap: "6px",
              }}
            >
              <div />
              {weeks.map((w) => (
                <div
                  key={w}
                  className="text-center font-semibold bg-white/10 rounded-md py-2 text-sm"
                >
                  W{w}
                </div>
              ))}
            </div>

            {/* rows */}
            <div className="mt-3 space-y-2">
              {gantt.map((row, rIdx) => (
                <div
                  key={rIdx}
                  className="grid items-center"
                  style={{
                    gridTemplateColumns: "200px repeat(10, minmax(50px,1fr))",
                    gap: "6px",
                  }}
                >
                  <div className="font-bold bg-white/10 rounded-md py-2 px-3">
                    {row.name}
                  </div>
                  {row.cells.map((state, cIdx) => (
                    <div
                      key={cIdx}
                      className={[
                        "h-10 rounded-md",
                        state === "active"
                          ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                          : state === "overlap"
                          ? "bg-gradient-to-r from-yellow-300 to-orange-400"
                          : "bg-white/5",
                      ].join(" ")}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-center text-sky-200">
            <span className="inline-block w-3 h-3 rounded-sm align-middle mr-1 bg-emerald-400" />
            Primary activity window &nbsp;&nbsp;
            <span className="inline-block w-3 h-3 rounded-sm align-middle mr-1 bg-yellow-300" />
            Overlapping processes
          </p>
        </section>

        {/* Milestones */}
        <section className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-1">
            Key Milestones & Target Dates
          </h2>
          <p className="text-sky-100 mb-5">
            Enter your specific dates and notes for each milestone:
          </p>

          <div className="rounded-2xl border-2 border-yellow-400 bg-yellow-400/10 p-6">
            <h3 className="text-yellow-300 text-2xl font-semibold mb-4">
              📋 Critical Milestones
            </h3>

            <div className="space-y-3">
              {milestoneList.map((m) => {
                const val = milestones[m.key] || {};
                return (
                  <div
                    key={m.key}
                    className="grid items-center gap-3 bg-white/10 rounded-lg p-4"
                    style={{ gridTemplateColumns: "1fr 170px 1fr" }}
                  >
                    <div className="font-bold text-sky-50">
                      {m.strong ? <strong>{m.label}</strong> : m.label}
                    </div>
                    <div>
                      <input
                        type="date"
                        className="w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 text-white text-sm"
                        value={val.date || ""}
                        onChange={(e) =>
                          setMilestoneField(m.key, "date", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder={m.notesPh || "Notes"}
                        className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white text-sm placeholder-white/60"
                        value={val.notes || ""}
                        onChange={(e) =>
                          setMilestoneField(m.key, "notes", e.target.value)
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Success box */}
        <section className="mb-10">
          <div className="text-center font-bold text-lg rounded-2xl p-6 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900">
            Stay on track = Smooth closing + Dream home keys! 🏡
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-8 bg-white/10 rounded-2xl border border-white/20">
          <p className="text-sky-200">
            Stacked • Real Estate CRM • Transaction Mastery Series
          </p>
        </footer>
      </div>
    </div>
  );
}
