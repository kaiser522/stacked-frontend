import { useMemo, useState } from "react";

export default function Inspection() {
  // Checklist items
  const checklist = [
    {
      id: "i1",
      text: "Categorize all issues: Safety (must repair) vs. Functional (can credit) vs. Cosmetic (easy credit)",
    },
    {
      id: "i2",
      text: "Check loan type requirements: FHA/VA are strict, Conventional is flexible",
    },
    {
      id: "i3",
      text: "Calculate strategic credit amounts: Repair cost + 30–50% for convenience and risk",
    },
    {
      id: "i4",
      text: "Bundle small items: Group minor issues into a single meaningful amount",
    },
    {
      id: "i5",
      text: "Draft professional request: Emphasize seller convenience and closing timeline",
    },
    {
      id: "i6",
      text: "Set response deadline: Give seller 48–72 hours to respond",
    },
    {
      id: "i7",
      text: "Confirm with lender: Ensure credit amount won’t affect loan approval",
    },
  ];

  // Pricing guide
  const priceRows = [
    { issue: "HVAC Service/Tune-up", repair: "$150–300", credit: "$400–600" },
    { issue: "Minor Electrical", repair: "$200–500", credit: "$500–800" },
    { issue: "Plumbing Leaks", repair: "$150–400", credit: "$400–700" },
    { issue: "Appliance Issues", repair: "$200–500", credit: "$400–800" },
    { issue: "Multiple Small Items", repair: "$300–800", credit: "$800–1,500" },
  ];

  const [checked, setChecked] = useState({});
  const total = checklist.length;
  const done = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  );
  const pct = Math.round((done / total) * 100);

  const toggle = (id) => setChecked((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-slate-800 to-sky-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 p-8 sm:p-12 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-orange-500 grid place-items-center text-2xl font-bold">
            🔧
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Inspection Credits vs. Repairs
          </h1>
          <div className="inline-block mt-5 px-6 py-2 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Checklist
          </div>
          <p className="mt-4 text-sky-200 max-w-xl mx-auto">
            When credits beat repairs, how to price them, and what lenders or
            title actually require to close on time.
          </p>
          <div className="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 font-semibold">
            6 min read
          </div>
        </header>

        {/* Quick Decision */}
        <section className="mb-10 sm:mb-12">
          <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 text-white text-center font-bold text-lg sm:text-xl p-6 rounded-2xl">
            Credits win 90% of the time when closing is under 30 days
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Credits */}
            <div className="bg-white/10 border-2 border-emerald-400 rounded-xl p-6 text-left">
              <h3 className="text-emerald-300 text-2xl font-semibold mb-3 text-center">
                ✅ Choose CREDITS When
              </h3>
              <ul className="list-disc list-inside text-sky-100 space-y-1">
                <li>Closing in less than 30 days</li>
                <li>Issues cost under $5,000 total</li>
                <li>Multiple small problems</li>
                <li>Seller is cooperative</li>
                <li>Conventional or cash buyer</li>
              </ul>
            </div>

            {/* Repairs */}
            <div className="bg-white/10 border-2 border-orange-500 rounded-xl p-6 text-left">
              <h3 className="text-orange-300 text-2xl font-semibold mb-3 text-center">
                🔨 Must Use REPAIRS When
              </h3>
              <ul className="list-disc list-inside text-sky-100 space-y-1">
                <li>FHA or VA loan flags safety issues</li>
                <li>Structural or electrical hazards</li>
                <li>Lender requires certification</li>
                <li>Issues affect habitability</li>
                <li>Code violations exist</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Your Post-Inspection Checklist
          </h2>
          <p className="text-sky-100 mb-6">
            Check off each item as you prepare your response.
          </p>

          {/* Progress bar */}
          <div className="bg-black/30 rounded-lg p-1 mb-6">
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

          <div className="rounded-2xl p-6 border-2 border-emerald-400 bg-emerald-400/20">
            <div className="space-y-3">
              {checklist.map((it) => {
                const isOn = !!checked[it.id];
                return (
                  <label
                    key={it.id}
                    className={[
                      "flex items-start gap-3 rounded-xl p-4 cursor-pointer transition-all",
                      "bg-white/10 hover:bg-white/15",
                      isOn
                        ? "translate-x-2 border-l-4 border-emerald-400 bg-emerald-400/30"
                        : "border-l-0",
                    ].join(" ")}
                    onClick={() => toggle(it.id)}
                  >
                    <input
                      type="checkbox"
                      checked={isOn}
                      onChange={() => toggle(it.id)}
                      className="mt-1 h-5 w-5 rounded-md accent-emerald-500"
                    />
                    <span className="text-sky-100">{it.text}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Guide */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Credit Pricing Cheat Sheet
          </h2>
          <p className="text-sky-100 mb-6">
            What to request vs. estimated repair costs.
          </p>

          <div className="rounded-2xl border-2 border-yellow-400 bg-yellow-400/10 p-4 sm:p-6">
            {/* Header row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-semibold">
              <div className="rounded-md px-4 py-3 bg-yellow-400/30 text-yellow-300">
                Common Issue
              </div>
              <div className="rounded-md px-4 py-3 bg-yellow-400/30 text-yellow-300">
                Repair Cost
              </div>
              <div className="rounded-md px-4 py-3 bg-yellow-400/30 text-yellow-300">
                Credit Request
              </div>
            </div>

            {/* Data rows */}
            <div className="mt-3 space-y-3">
              {priceRows.map((r, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  <div className="rounded-md px-4 py-3 bg-white/10 text-sky-100">
                    {r.issue}
                  </div>
                  <div className="rounded-md px-4 py-3 bg-white/10 text-sky-100">
                    {r.repair}
                  </div>
                  <div className="rounded-md px-4 py-3 bg-white/10 text-sky-100">
                    {r.credit}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sky-100 mt-5">
            <strong className="text-yellow-300">Rule of thumb:</strong> add
            30–50% to repair estimates. Credits should account for contractor
            convenience, potential complications, and buyer inconvenience.
          </p>
        </section>

        {/* Scripts */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            What to Actually Say
          </h2>
          <p className="text-sky-100 mb-6">
            Copy and paste these concise scripts.
          </p>

          <div className="rounded-2xl bg-white/5 p-6">
            <h3 className="text-2xl font-semibold text-emerald-300">
              Initial Credit Request
            </h3>
            <div className="mt-3 italic rounded-r-lg border-l-4 border-emerald-400 bg-emerald-400/20 p-4 text-sky-100">
              “Based on the inspection findings, we’re requesting a $1,800
              credit at closing to address the HVAC maintenance and minor
              electrical items. This avoids coordinating contractors and
              potential delays, while giving the buyer flexibility to handle
              these post-closing with preferred professionals.”
            </div>

            <h3 className="text-2xl font-semibold text-yellow-300 mt-6">
              When Seller Counters Low
            </h3>
            <div className="mt-3 italic rounded-r-lg border-l-4 border-emerald-400 bg-emerald-400/20 p-4 text-sky-100">
              “We appreciate the seller’s willingness to work with us. Our
              request reflects current contractor rates and the buyer’s time
              investment. We’d be comfortable meeting in the middle at $1,400 to
              keep this moving.”
            </div>

            <h3 className="text-2xl font-semibold text-orange-400 mt-6">
              When Seller Refuses
            </h3>
            <div className="mt-3 italic rounded-r-lg border-l-4 border-emerald-400 bg-emerald-400/20 p-4 text-sky-100">
              “We understand the seller’s position. These items were identified
              by a licensed inspector and need addressing. If credits aren’t
              acceptable, we’ll need repairs completed with proper permits and
              documentation before closing.”
            </div>
          </div>
        </section>

        {/* Lender Reality Check */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            What Lenders Actually Require
          </h2>
          <p className="text-sky-100 mb-6">
            Don’t guess. Here is what common loan types mandate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 bg-emerald-400/10">
              <h3 className="text-2xl font-semibold text-emerald-300">
                Conventional Loans
              </h3>
              <p className="mt-2 font-semibold text-emerald-300">
                ✅ Almost always allow credits
              </p>
              <p className="text-sky-100">
                Repairs are typically required only for major structural or
                safety issues that affect habitability.
              </p>
            </div>

            <div className="rounded-2xl p-6 bg-orange-500/10">
              <h3 className="text-2xl font-semibold text-orange-400">
                FHA/VA Loans
              </h3>
              <p className="mt-2 font-semibold text-orange-400">
                ⚠️ Repairs often required
              </p>
              <p className="text-sky-100">
                Must repair: peeling paint pre-1978, safety hazards, broken
                windows, electrical issues, non-functioning systems.
              </p>
            </div>
          </div>

          <div className="rounded-2xl p-6 mt-6 border-2 border-yellow-400 bg-yellow-400/10">
            <p className="text-yellow-300 font-bold mb-2">💡 Pro Tip</p>
            <p className="text-sky-100">
              When in doubt, call your lender before submitting credit requests.
              Five minutes now prevents hours of rework later.
            </p>
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
