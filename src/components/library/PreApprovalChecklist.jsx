import { useState } from "react";

export default function PreApprovalChecklist() {
  // Checklist states
  const docItems = [
    "Government photo ID (driver's license or passport)",
    "Social Security number (for credit pull)",
    "Most recent 30 days of pay stubs",
    "Last 2 years W-2s",
    "Self-employed: last 2 years full tax returns + YTD P&L",
    "1099 income: last 2 years 1099s + tax returns",
    "Last 2 months bank/asset statements (all pages)",
    "Retirement/investment statements (if used for down payment)",
    "Source of down payment & closing funds (gift letter if applicable)",
    "Explanation for any large/odd deposits",
    "Landlord info or recent mortgage statement",
    "Divorce decree/child support order (if applicable)",
    "BK/foreclosure discharge papers (if past 7 years)",
    "VA buyers: Certificate of Eligibility (COE)",
    "Green card/visa documents if not a U.S. citizen",
  ];

  const actionItems = [
    "Selected lender(s) and discussed loan options",
    "Completed full loan application and uploaded documents",
    "Determined comfortable monthly payment and max purchase price",
    "Received pre-approval letter from lender",
    "Committed to keeping finances stable during home search",
    "Set reminder to refresh documents if search extends beyond 60 days",
  ];

  const [checkedDocs, setCheckedDocs] = useState({});
  const [checkedActions, setCheckedActions] = useState({});
  const [lenders, setLenders] = useState([
    {
      lender: "",
      rate: "",
      points: "",
      apr: "",
      fees: "",
      lock: "",
      notes: "",
    },
    {
      lender: "",
      rate: "",
      points: "",
      apr: "",
      fees: "",
      lock: "",
      notes: "",
    },
    {
      lender: "",
      rate: "",
      points: "",
      apr: "",
      fees: "",
      lock: "",
      notes: "",
    },
  ]);

  // Progress calculation
  const docsDone = Object.values(checkedDocs).filter(Boolean).length;
  const actionsDone = Object.values(checkedActions).filter(Boolean).length;
  const lendersDone = lenders.filter(
    (l) =>
      [l.lender, l.rate, l.points, l.apr, l.fees, l.lock].filter(
        (x) => x !== ""
      ).length >= 4
  ).length;

  const totalItems = docItems.length + actionItems.length + lenders.length;
  const overallDone = docsDone + actionsDone + lendersDone;
  const pct = Math.round((overallDone / totalItems) * 100);

  // Handlers
  const toggleDoc = (i) => {
    setCheckedDocs((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const toggleAction = (i) => {
    setCheckedActions((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const updateLender = (idx, field, value) => {
    const copy = [...lenders];
    copy[idx][field] = value;
    setLenders(copy);
  };

  const addLender = () => {
    setLenders((prev) => [
      ...prev,
      {
        lender: "",
        rate: "",
        points: "",
        apr: "",
        fees: "",
        lock: "",
        notes: "",
      },
    ]);
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-12 p-10 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-orange-500 grid place-items-center text-2xl font-bold">
            📋
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Pre-Approval Checklist
          </h1>
          <div className="inline-block px-6 py-2 mb-4 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Checklist
          </div>
          <p className="text-sky-200 max-w-xl mx-auto">
            Essential documents and steps for mortgage pre-approval so buyers
            are ready to write strong offers.
          </p>
          <div className="inline-block mt-4 px-6 py-2 rounded-full bg-white/10 font-semibold">
            Pre-approval ready
          </div>
        </div>

        {/* How to Use */}
        <section className="mb-10 p-8 bg-white/10 border border-white/20 rounded-2xl">
          <div className="p-6 rounded-xl border-2 border-orange-500 bg-orange-500/20">
            <h3 className="text-orange-400 text-xl font-bold mb-2">
              📝 How to Use This Checklist
            </h3>
            <p className="text-sky-100">
              Share this list with buyers before showings. Check off items as
              they're gathered. Most lenders refresh income and asset docs every
              30–60 days.
            </p>
          </div>
          <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 font-bold text-center">
            🔒 Security Tip: Never email SSNs or full account numbers
            unencrypted—use your lender's secure portal.
          </div>
        </section>

        {/* Progress Overview */}
        <section className="mb-10 p-8 bg-white/10 border border-white/20 rounded-2xl">
          <h2 className="text-3xl font-bold text-emerald-300 mb-4">
            Your Pre-Approval Progress
          </h2>
          <div className="bg-black/30 rounded-lg p-1">
            <div
              className="h-5 rounded-md flex items-center justify-center text-xs font-bold text-white transition-all"
              style={{
                width: `${pct}%`,
                background:
                  "linear-gradient(90deg, rgb(52,211,153) 0%, rgb(16,185,129) 100%)",
              }}
            >
              {pct}% Complete
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-white/10 border-2 border-emerald-400 rounded-xl text-center">
              <h4 className="text-emerald-400 font-semibold mb-1">Documents</h4>
              <div className="text-2xl font-bold text-yellow-300">
                {docsDone}/{docItems.length}
              </div>
            </div>
            <div className="p-4 bg-white/10 border-2 border-emerald-400 rounded-xl text-center">
              <h4 className="text-emerald-400 font-semibold mb-1">
                Action Steps
              </h4>
              <div className="text-2xl font-bold text-yellow-300">
                {actionsDone}/{actionItems.length}
              </div>
            </div>
            <div className="p-4 bg-white/10 border-2 border-emerald-400 rounded-xl text-center">
              <h4 className="text-emerald-400 font-semibold mb-1">
                Lender Research
              </h4>
              <div className="text-2xl font-bold text-yellow-300">
                {lendersDone}/{lenders.length}
              </div>
            </div>
          </div>
        </section>

        {/* Documents Checklist */}
        <Section title="Documents to Gather">
          <p>
            Collect these essential documents for your pre-approval application:
          </p>
          <div className="p-6 rounded-xl border-2 border-emerald-400 bg-emerald-400/20 space-y-3 mt-6">
            <h3 className="text-emerald-400 text-xl font-bold">
              📄 Required Documents
            </h3>
            {docItems.map((t, i) => {
              const isOn = !!checkedDocs[i];
              return (
                <label
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition ${
                    isOn
                      ? "bg-emerald-400/30 border-l-4 border-emerald-400 translate-x-1"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => toggleDoc(i)}
                    className="mt-1 h-5 w-5 accent-emerald-400"
                  />
                  <span className="text-sky-100 text-sm">{t}</span>
                </label>
              );
            })}
          </div>
        </Section>

        {/* Action Steps */}
        <Section title="Pre-Approval Action Steps">
          <p>Follow these steps to complete your pre-approval process:</p>
          <div className="p-6 rounded-xl border-2 border-yellow-400 bg-yellow-400/10 mt-6 space-y-3">
            <h3 className="text-yellow-400 text-xl font-bold">
              🎯 Essential Actions
            </h3>
            {actionItems.map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-white/10 rounded-lg"
              >
                <div className="w-7 h-7 rounded-full bg-yellow-400 text-slate-900 font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <span className="text-sky-100 text-sm">{t}</span>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-xl border-2 border-emerald-400 bg-emerald-400/20 mt-6 space-y-3">
            <h3 className="text-emerald-400 text-xl font-bold">
              ✅ Track Your Progress
            </h3>
            {actionItems.map((t, i) => {
              const isOn = !!checkedActions[i];
              return (
                <label
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition ${
                    isOn
                      ? "bg-emerald-400/30 border-l-4 border-emerald-400 translate-x-1"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => toggleAction(i)}
                    className="mt-1 h-5 w-5 accent-emerald-400"
                  />
                  <span className="text-sky-100 text-sm">{t}</span>
                </label>
              );
            })}
          </div>
        </Section>

        {/* Lender Comparison */}
        <Section title="Lender Comparison">
          <p>
            Compare multiple lenders to find the best terms for your situation:
          </p>
          <div className="p-6 rounded-xl border-2 border-orange-500 bg-orange-500/20 mt-6 overflow-x-auto">
            <h3 className="text-orange-400 text-xl font-bold mb-4">
              🏦 Compare Your Options
            </h3>
            <div className="min-w-[700px] space-y-3">
              <div className="grid grid-cols-7 gap-3 font-bold text-orange-400 bg-orange-500/30 p-3 rounded-lg">
                <div>Lender</div>
                <div>Rate</div>
                <div>Points</div>
                <div>APR</div>
                <div>Est. Fees</div>
                <div>Lock</div>
                <div>Notes</div>
              </div>
              {lenders.map((l, i) => (
                <div
                  key={i}
                  className="grid grid-cols-7 gap-3 p-3 bg-white/10 rounded-lg"
                >
                  {Object.keys(l).map((field) => (
                    <input
                      key={field}
                      type="text"
                      value={l[field]}
                      onChange={(e) => updateLender(i, field, e.target.value)}
                      className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                      placeholder={field}
                    />
                  ))}
                </div>
              ))}
            </div>
            <button
              onClick={addLender}
              className="mt-4 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg font-bold hover:shadow-lg"
            >
              + Add Another Lender
            </button>
          </div>
        </Section>

        {/* Key Contacts */}
        <Section title="Key Contacts">
          <p>Keep all important contact information in one place:</p>
          <div className="p-6 rounded-xl border-2 border-emerald-400 bg-emerald-400/10 mt-6 space-y-4">
            <h3 className="text-emerald-400 text-xl font-bold">
              📞 Contact Information
            </h3>
            {["Lender", "Agent", "Insurance"].map((role, i) => (
              <div
                key={i}
                className="grid sm:grid-cols-5 gap-3 bg-white/10 p-3 rounded-lg"
              >
                <div className="font-bold text-emerald-400">{role}</div>
                <input
                  className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white"
                  placeholder="Name"
                />
                <input
                  className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white"
                  placeholder="Company"
                />
                <input
                  className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white"
                  placeholder="Phone"
                />
                <input
                  className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white"
                  placeholder="Email"
                />
              </div>
            ))}
            <div className="grid grid-cols-1 bg-white/10 p-3 rounded-lg">
              <label className="font-bold text-emerald-400 mb-2">Notes</label>
              <textarea
                className="bg-white/10 border border-white/20 rounded px-2 py-2 text-white resize-y"
                placeholder="Additional notes..."
              />
            </div>
          </div>
        </Section>

        {/* Success */}
        <Section>
          <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-center font-bold text-lg">
            🎉 Ready to Get Pre-Approved! 🏠
            <span className="block mt-2 font-normal text-sm">
              Complete this checklist to strengthen your offers and show sellers
              you're a serious buyer.
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

// Generic section wrapper
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
