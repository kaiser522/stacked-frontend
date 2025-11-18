import { useMemo, useState } from "react";

export default function Appraisal() {
  const requiredDocs = {
    title: "📋 Required Documents",
    color: "emerald",
    items: [
      {
        id: "contract",
        label:
          "Purchase Contract: Fully executed contract with all addenda and amendments",
      },
      {
        id: "mls",
        label:
          "MLS Listing: Current listing with all photos and complete feature list",
      },
      {
        id: "survey",
        label:
          "Property Survey: Recent survey showing lot lines, easements, encroachments",
      },
      {
        id: "hoa",
        label:
          "HOA Documents: Declaration, bylaws, budget, management contact info",
      },
      {
        id: "tax",
        label:
          "Recent Tax Records: Current year property tax assessment and bill",
      },
    ],
  };

  const improvements = {
    title: "📝 Improvement Documentation",
    color: "yellow",
    items: [
      {
        id: "receipts",
        label:
          "Renovation Receipts: All invoices for major updates (HVAC, roof, flooring, etc.)",
      },
      {
        id: "permits",
        label:
          "Permit Records: Building permits for additions, electrical, plumbing work",
      },
      {
        id: "appliances",
        label:
          "Appliance List: Make, model, year of all included appliances with receipts",
      },
      {
        id: "warranty",
        label:
          "Warranty Information: HVAC, roof, appliance warranties still in effect",
      },
    ],
  };

  const comps = {
    title: "🏘️ Comparable Sales Analysis",
    color: "orange",
    items: [
      {
        id: "recent-comps",
        label:
          "Recent Comps: 3–6 similar homes sold within 90 days in same neighborhood",
      },
      {
        id: "active",
        label:
          "Active Listings: Currently for sale properties that compete with subject",
      },
      {
        id: "pending",
        label:
          "Pending Sales: Under contract properties that show market activity",
      },
      {
        id: "trends",
        label:
          "Market Trends: Neighborhood price trends, days on market, absorption rate",
      },
    ],
  };

  const preVisit = {
    title: "Before Appraiser Arrives",
    color: "emerald",
    items: [
      {
        id: "email",
        label:
          "Email packet 24 hours ahead: Send all documents to appraiser before appointment",
      },
      {
        id: "access",
        label:
          "Prepare property access: Unlock all areas, turn on lights, open blinds",
      },
      {
        id: "feature",
        label:
          "Create feature highlight sheet: One page with major upgrades and unique features",
      },
      {
        id: "confirm",
        label:
          "Confirm appointment details: Time, date, contact info, access requirements",
      },
      {
        id: "print",
        label:
          "Print backup copies: Physical copies of all key documents available",
      },
    ],
  };

  const allItems = useMemo(
    () => [
      ...requiredDocs.items,
      ...improvements.items,
      ...comps.items,
      ...preVisit.items,
    ],
    []
  );

  const [checked, setChecked] = useState({});
  const total = allItems.length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  const toggle = (id) => {
    setChecked((s) => ({ ...s, [id]: !s[id] }));
  };

  const SectionBlock = ({ section }) => {
    const colors = {
      emerald: {
        header: "text-emerald-300",
        bgAlt: "bg-emerald-400/20",
        border: "border-emerald-400",
        checkedBg: "bg-emerald-400/30",
      },
      yellow: {
        header: "text-yellow-300",
        bgAlt: "bg-yellow-400/20",
        border: "border-yellow-400",
        checkedBg: "bg-yellow-400/30",
      },
      orange: {
        header: "text-orange-300",
        bgAlt: "bg-orange-400/20",
        border: "border-orange-400",
        checkedBg: "bg-orange-400/30",
      },
    }[section.color];

    return (
      <div
        className={`rounded-2xl p-6 sm:p-8 ${colors.bgAlt} border ${colors.border}`}
      >
        <h3 className={`text-2xl font-semibold mb-4 ${colors.header}`}>
          {section.title}
        </h3>
        <div className="space-y-3">
          {section.items.map((it) => {
            const isOn = !!checked[it.id];
            return (
              <label
                key={it.id}
                className={`flex items-start gap-3 rounded-xl p-4 cursor-pointer transition-all bg-white/10 hover:bg-white/15 ${isOn
                  ? `translate-x-2 border-l-4 ${colors.checkedBg} border-emerald-400`
                  : "border-l-0"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={isOn}
                  onChange={() => toggle(it.id)}
                  className="mt-1 h-5 w-5 rounded-md accent-emerald-500"
                />
                <span className="text-sky-100">{it.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-slate-800 to-sky-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 p-8 sm:p-12 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-orange-500 grid place-items-center text-2xl font-bold">
            📐
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Appraisal Packet Checklist
          </h1>
          <div className="inline-block mt-5 px-6 py-2 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Checklist
          </div>
          <p className="mt-4 text-sky-200 max-w-xl mx-auto">
            Everything to hand the appraiser: comp summary, updates, feature
            sheet, and lot or HOA quirks.
          </p>
          <div className="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 font-semibold">
            4 min read
          </div>
        </header>

        {/* Progress */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-5">
            Your Packet Progress
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
          <p className="text-center text-sky-200 mt-3">
            Check off items below to track your progress
          </p>
        </section>

        {/* Essential Documents */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Essential Documents Checklist
          </h2>
          <p className="text-sky-100 mb-6">
            Gather these items before the appraisal appointment.
          </p>

          <SectionBlock section={requiredDocs} />
          <div className="h-6" />
          <SectionBlock section={improvements} />
          <div className="h-6" />
          <SectionBlock section={comps} />
        </section>

        {/* Final Steps */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            {preVisit.title}
          </h2>
          <p className="text-sky-100 mb-6">
            Complete these final preparation steps.
          </p>
          <SectionBlock section={preVisit} />

          <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 text-white text-center font-bold text-lg sm:text-xl p-6 rounded-2xl mt-6">
            Complete packet = Higher appraised value + Faster closing
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
