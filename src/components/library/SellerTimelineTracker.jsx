import { useState } from "react";

export default function SellerTimelineTracker() {
  const stages = [
    {
      title: "Pre-Listing Prep",
      timeframe: "1–3 weeks",
      desc: "Repairs, declutter, touch-ups",
    },
    {
      title: "Photography & Media",
      timeframe: "3–7 days",
      desc: "Professional photos and marketing",
    },
    {
      title: "List & Launch",
      timeframe: "Day 0",
      desc: "MLS + portals go live",
    },
    {
      title: "Showings & Open Houses",
      timeframe: "1–3 weeks",
      desc: "Active marketing period",
    },
    {
      title: "Offers & Negotiation",
      timeframe: "1–5 days",
      desc: "Receive and negotiate offers",
    },
    {
      title: "Under Contract",
      timeframe: "30–45 days",
      desc: "Escrow period begins",
    },
    {
      title: "Inspections & Requests",
      timeframe: "5–10 days from acceptance",
      desc: "Buyer inspection period",
    },
    {
      title: "Appraisal",
      timeframe: "1–2 weeks after inspection",
      desc: "Buyer's lender orders appraisal",
    },
    {
      title: "Repairs/Credits Finalized",
      timeframe: "3–7 days after inspection",
      desc: "Complete agreed repairs",
    },
    {
      title: "Clear to Close",
      timeframe: "3 business days before close",
      desc: "CD sent to buyer",
    },
    {
      title: "Closing & Possession",
      timeframe: "1 day",
      desc: "Move-out and transfer keys",
    },
  ];

  const [completed, setCompleted] = useState({});
  const [milestones, setMilestones] = useState([
    { name: "Appraisal received", date: "", notes: "" },
    { name: "Buyer loan approval", date: "", notes: "" },
    { name: "Closing Disclosure sent to buyer", date: "", notes: "" },
    { name: "Move-out date", date: "", notes: "" },
    { name: "Closing date/time", date: "", notes: "" },
    { name: "Keys delivered/possession", date: "", notes: "" },
    { name: "Signed listing agreement", date: "", notes: "" },
    { name: "Media complete", date: "", notes: "" },
    { name: "Listing live (MLS)", date: "", notes: "" },
    { name: "First showing", date: "", notes: "" },
    { name: "Offer received", date: "", notes: "" },
    { name: "Offer accepted", date: "", notes: "" },
    { name: "Earnest money deposited", date: "", notes: "" },
    { name: "Inspection deadline", date: "", notes: "" },
    { name: "Repair agreement signed (if any)", date: "", notes: "" },
    { name: "Appraisal ordered", date: "", notes: "" },
  ]);

  const totalStages = stages.length;
  const stagesDone = Object.values(completed).filter(Boolean).length;
  const pct = Math.round((stagesDone / totalStages) * 100);

  const toggleStage = (i) => {
    setCompleted((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const updateMilestone = (i, field, value) => {
    const copy = [...milestones];
    copy[i][field] = value;
    setMilestones(copy);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-12 p-10 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-orange-500 grid place-items-center text-2xl font-bold">
            📈
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Seller Timeline Tracker
          </h1>
          <div className="inline-block px-6 py-2 mb-4 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Process • New
          </div>
          <p className="text-sky-200 max-w-xl mx-auto">
            Timeline guide for sellers showing preparation, listing, marketing,
            and closing phases with key milestones.
          </p>
          <div className="inline-block mt-4 px-6 py-2 rounded-full bg-white/10 font-semibold">
            10-week process
          </div>
        </div>

        {/* How to Use */}
        <Section>
          <div className="p-6 rounded-xl border-2 border-orange-500 bg-orange-500/20 space-y-3">
            <h3 className="text-orange-400 text-xl font-bold">
              📅 How to Use This Tracker
            </h3>
            <p>
              Check off each stage and record target dates. Timeframes are
              typical estimates and may vary by market.
            </p>
            <p>
              <strong>Tip:</strong> Bold dates are hard deadlines. Work
              backwards from your ideal closing date.
            </p>
          </div>
        </Section>

        {/* Progress */}
        <Section title="Your Selling Progress">
          <div className="bg-black/30 rounded-lg p-1">
            <div
              className="h-6 rounded-md flex items-center justify-center text-sm font-bold text-white transition-all"
              style={{
                width: `${pct}%`,
                background:
                  "linear-gradient(90deg, rgb(52,211,153), rgb(16,185,129))",
              }}
            >
              {pct}% Complete
            </div>
          </div>
          <p className="text-center text-sky-200 mt-3">
            Track your progress through the selling process
          </p>
        </Section>

        {/* Stages */}
        <Section title="Selling Process Stages">
          <p>
            Track your progress through each stage of the home selling process:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {stages.map((s, i) => {
              const isOn = !!completed[i];
              return (
                <div
                  key={i}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition ${
                    isOn
                      ? "bg-emerald-400/30 border-emerald-400"
                      : "bg-white/10 border-white/20 hover:bg-white/15"
                  }`}
                  onClick={() => toggleStage(i)}
                >
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => toggleStage(i)}
                    className="h-5 w-5 accent-emerald-400 mb-3"
                  />
                  <h4 className="text-emerald-300 font-bold text-lg mb-1">
                    {s.title}
                  </h4>
                  <div className="text-yellow-300 font-semibold mb-2">
                    {s.timeframe}
                  </div>
                  <p className="text-sky-100 text-sm">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Visual Timeline (static) */}
        <Section title="10-Week Visual Timeline">
          <p>Gantt-style timeline showing typical process flow:</p>
          <div className="overflow-x-auto mt-6">
            <div className="grid grid-cols-[200px_repeat(10,1fr)_120px] gap-2 font-bold text-sm text-center mb-4">
              <div></div>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="bg-white/10 rounded-md py-2">
                  W{i + 1}
                </div>
              ))}
              <div className="bg-white/10 rounded-md py-2">Target</div>
            </div>

            {stages.map((s, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[200px_repeat(10,1fr)_120px] gap-2 mb-2 items-center"
              >
                <div className="font-bold text-left text-sm bg-white/10 rounded px-2 py-2">
                  {s.title}
                </div>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 rounded ${
                      i === 4 && s.title.includes("List")
                        ? "bg-gradient-to-r from-orange-400 to-red-500"
                        : ""
                    }`}
                  ></div>
                ))}
                <input
                  type="date"
                  className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-sky-200 mt-4">
            <span className="text-emerald-400">■</span> Active period
            &nbsp;&nbsp;
            <span className="text-yellow-300">■</span> Overlaps &nbsp;&nbsp;
            <span className="text-orange-500">■</span> Critical
          </p>
        </Section>

        {/* Milestones */}
        <Section title="Key Milestones & Target Dates">
          <p>Enter your specific dates and notes for each milestone:</p>
          <div className="p-6 rounded-xl border-2 border-yellow-400 bg-yellow-400/10 mt-6 space-y-4">
            <h3 className="text-yellow-400 text-xl font-bold">
              📋 Critical Milestones
            </h3>
            {milestones.map((m, i) => (
              <div
                key={i}
                className="grid sm:grid-cols-3 gap-4 p-4 bg-white/10 rounded-lg items-center"
              >
                <div className="font-bold text-sky-100">{m.name}</div>
                <input
                  type="date"
                  value={m.date}
                  onChange={(e) => updateMilestone(i, "date", e.target.value)}
                  className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm"
                />
                <input
                  type="text"
                  value={m.notes}
                  onChange={(e) => updateMilestone(i, "notes", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                  placeholder="Notes"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Success */}
        <Section>
          <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 text-center font-bold text-lg">
            🏠 Ready to List and Close Successfully! 🎉
            <span className="block mt-2 font-normal text-sm">
              Use this tracker from prep to possession so nothing slips through
              the cracks.
            </span>
          </div>
        </Section>

        {/* Footer */}
        <footer className="text-center p-6 bg-white/10 rounded-2xl border border-white/20 mt-12">
          <p className="text-sky-200">
            Stacked • Real Estate CRM • Transaction Mastery Series
          </p>
        </footer>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-10 p-8 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
      {title && (
        <h2 className="text-3xl font-bold text-emerald-300 mb-4">{title}</h2>
      )}
      {children}
    </section>
  );
}
