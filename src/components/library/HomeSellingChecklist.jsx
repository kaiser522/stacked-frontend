import { useEffect, useState } from "react";

export default function HomeSellingChecklist() {
  // ---------------- Categories & Checklist Items ----------------
  const categories = {
    prelisting: [
      "Declutter, donate, and depersonalize spaces.",
      "Complete minor repairs: touch-up paint, fix leaky faucets, replace burnt bulbs.",
      "Deep clean walls, floors, kitchens, and baths; remove odors.",
      "Boost curb appeal: mow, mulch, edge, fresh door hardware and house numbers.",
      "Organize key documents: warranties, manuals, utility averages, HOA rules.",
    ],
    pricing: [
      "Review a Comparative Market Analysis (CMA) with your agent.",
      "Decide pricing approach: market value, under-list, or premium list.",
      "Estimate net proceeds with a seller net sheet (taxes, fees, payoff).",
      "Choose list date and plan around seasonality and readiness.",
      "Stage each room to highlight function and flow; remove excess furniture.",
      "Maximize light: open blinds, replace bulbs with warm daylight.",
      "Neutral touch-ups: paint, linens, and simple decor.",
      "Hire professional photography; consider video, drone, and floor plan.",
    ],
    marketing: [
      "Complete property description emphasizing benefits and recent upgrades.",
      "MLS entry with accurate data; syndicate to major portals.",
      "Install yard sign and directional signs where allowed.",
      "Create social posts and paid boosts; notify sphere via email.",
      "Schedule and promote open house(s) if appropriate.",
    ],
    showings: [
      "Set showing window, instructions, feedback method; install lockbox.",
      "Secure valuables and sensitive items; plan for pets.",
      "Leave lights on and thermostat comfortable; remove strong scents.",
    ],
    contract: [
      "Compare price, timelines, and buyer financing; prepare net sheet.",
      "Evaluate contingencies (inspection, appraisal, financing, home sale).",
      "Clarify deadlines and response times; discuss counteroffer strategy.",
      "Confirm earnest money amount and delivery timeline.",
      "Deposit earnest money and confirm escrow details in writing.",
      "Schedule inspections quickly; negotiate repairs or credits with addendum.",
      "Lender orders appraisal; provide needed access and documents.",
      "Provide HOA/condo docs and disclosures as required by law.",
      "Choose closing/title company and confirm closing disclosure details.",
      "Order mortgage payoff(s) and resolve any liens.",
      "Schedule utilities transfer/stop dates; set up mail forwarding.",
      "Complete final cleaning and trash removal; leave keys, remotes, codes.",
      "Attend final walk-through; confirm agreed repairs are completed.",
    ],
    documents: [
      "Government ID(s) and contact info.",
      "Mortgage statement and payoff details.",
      "Property survey (if available).",
      "Seller disclosure forms and lead paint disclosure (if applicable).",
      "HOA/condo documents, rules, fees, and contact info.",
      "Receipts and warranties for major systems or recent improvements.",
    ],
  };

  const [checked, setChecked] = useState(() => {
    const init = {};
    Object.keys(categories).forEach((cat) => {
      init[cat] = Array(categories[cat].length).fill(false);
    });
    return init;
  });

  // ---------------- Progress Calculation ----------------
  const totalItems = Object.values(categories).reduce(
    (sum, arr) => sum + arr.length,
    0
  );
  const checkedItems = Object.values(checked).reduce(
    (sum, arr) => sum + arr.filter(Boolean).length,
    0
  );
  const percentage = Math.round((checkedItems / totalItems) * 100);

  // ---------------- Helpers ----------------
  const toggleCheck = (cat, idx) => {
    setChecked((prev) => ({
      ...prev,
      [cat]: prev[cat].map((val, i) => (i === idx ? !val : val)),
    }));
  };

  const Checklist = ({ items, cat }) => (
    <div className="space-y-3 mt-4">
      {items.map((text, idx) => {
        const isChecked = checked[cat][idx];
        return (
          <label
            key={idx}
            className={`flex items-start gap-3 rounded-lg p-4 cursor-pointer transition-transform ${
              isChecked
                ? cat === "documents"
                  ? "bg-yellow-300/30 border-l-4 border-yellow-300 translate-x-1"
                  : "bg-emerald-400/30 border-l-4 border-emerald-400 translate-x-1"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <input
              type="checkbox"
              className="mt-1 scale-125 accent-emerald-400"
              checked={isChecked}
              onChange={() => toggleCheck(cat, idx)}
            />
            <div className="flex-1 text-sky-50">
              <strong>{text}</strong>
            </div>
          </label>
        );
      })}
    </div>
  );

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-12 p-10 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-orange-500 grid place-items-center text-2xl font-bold">
            🏠
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Home Selling Checklist
          </h1>
          <div className="inline-block px-6 py-2 mb-4 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Checklist • Updated
          </div>
          <p className="text-sky-200 max-w-2xl mx-auto">
            Complete checklist for sellers covering preparation, staging,
            pricing, marketing, and closing requirements.
          </p>
          <div className="inline-block mt-4 px-6 py-2 rounded-full bg-white/10 font-semibold">
            Complete selling guide
          </div>
        </div>

        {/* How to Use */}
        <section className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h3 className="text-orange-400 text-2xl font-semibold mb-2">
            📝 How to Use This Checklist
          </h3>
          <p className="text-sky-100">
            Tick each box as you prepare your home, launch to market, review
            offers, and move to closing. This comprehensive guide will ensure
            you don’t miss any critical steps in the selling process.
          </p>
        </section>

        {/* Progress Overview */}
        <section className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-4">
            Your Selling Progress
          </h2>
          <div className="w-full bg-black/30 rounded-lg h-6 mb-4 overflow-hidden">
            <div
              className="h-6 bg-gradient-to-r from-emerald-400 to-teal-500 text-xs font-bold text-center text-slate-900"
              style={{ width: `${percentage}%` }}
            >
              {percentage}% Complete
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(categories).map(([cat, arr]) => (
              <div
                key={cat}
                className="p-4 text-center rounded-xl border-2 border-emerald-400 bg-white/10"
              >
                <h4 className="text-emerald-300 font-semibold mb-1 capitalize">
                  {cat.replace(/([A-Z])/g, " $1")}
                </h4>
                <div className="text-2xl font-bold text-yellow-300">
                  {checked[cat].filter(Boolean).length}/{arr.length}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sections */}
        <Section title="Pre-Listing Preparation" cat="prelisting">
          <Checklist items={categories.prelisting} cat="prelisting" />
        </Section>

        <Section title="Pricing Strategy & Staging" cat="pricing">
          <Checklist items={categories.pricing} cat="pricing" />
        </Section>

        <Section title="Marketing Launch" cat="marketing">
          <Checklist items={categories.marketing} cat="marketing" />
        </Section>

        <Section title="Showings" cat="showings">
          <Checklist items={categories.showings} cat="showings" />
        </Section>

        <Section title="Offer Review, Under Contract & Closing" cat="contract">
          <Checklist items={categories.contract} cat="contract" />
        </Section>

        <Section title="Documents to Gather" cat="documents">
          <Checklist items={categories.documents} cat="documents" />
        </Section>

        {/* Success */}
        <div className="my-10 text-center font-bold text-lg rounded-2xl p-8 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900">
          🎉 Ready to Sell Successfully! 🎉
          <div className="text-slate-900/80 font-medium mt-2">
            Follow this checklist to maximize your sale price and ensure a
            smooth transaction.
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center p-6 bg-white/10 rounded-2xl border border-white/20">
          <p className="text-sky-200">
            Stacked • Real Estate CRM • Transaction Mastery Series
          </p>
        </footer>
      </div>
    </div>
  );
}

// ---------- Section Wrapper ----------
function Section({ title, children }) {
  return (
    <section className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20">
      <h2 className="text-3xl font-bold text-emerald-300 mb-2">{title}</h2>
      {children}
    </section>
  );
}
