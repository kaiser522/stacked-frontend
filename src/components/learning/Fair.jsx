import { useMemo, useState } from "react";

export default function Fair() {
  // Checklist items
  const checklist = [
    {
      id: "c1",
      text: 'Remove all family references: No "perfect for families," "family room," or "great for kids"',
    },
    {
      id: "c2",
      text: "Check photos for bias: Remove images showing only one demographic group",
    },
    {
      id: "c3",
      text: "Audit targeting settings: Never target by age, gender, family status, or ethnicity",
    },
    {
      id: "c4",
      text: 'Review safety language: Replace "safe" with "well-maintained" or "established"',
    },
    {
      id: "c5",
      text: "Remove school references: Don't mention districts, ratings, or proximity",
    },
    {
      id: "c6",
      text: 'Check lifestyle implications: Avoid "young professionals," "retirees," "empty nesters"',
    },
    {
      id: "c7",
      text: "Include Equal Housing logo: Add official EHO logo to all marketing materials",
    },
  ];

  const [checked, setChecked] = useState({});
  const total = checklist.length;
  const done = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  );
  const toggle = (id) => setChecked((s) => ({ ...s, [id]: !s[id] }));
  const pct = Math.round((done / total) * 100);

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-slate-800 to-sky-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 p-8 sm:p-12 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-orange-500 grid place-items-center text-2xl font-bold">
            📊
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Fair-Housing-Safe Marketing
          </h1>
          <div className="inline-block mt-5 px-6 py-2 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Compliance
          </div>
          <p className="mt-4 text-sky-200 max-w-xl mx-auto">
            Ad copy and image guardrails, audience targeting pitfalls, and how
            to handle schools or safety questions.
          </p>
          <div className="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 font-semibold">
            6 min read
          </div>
        </header>

        {/* Warning */}
        <section className="mb-10 sm:mb-12">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-center font-bold text-lg sm:text-xl p-6 rounded-2xl">
            Fair Housing violations can cost $100k+ in fines and lawsuits
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white/10 border-2 border-emerald-400 rounded-xl p-6">
              <h3 className="text-emerald-300 text-2xl font-semibold mb-3">
                ✅ Always Safe to Advertise:
              </h3>
              <ul className="list-disc list-inside text-sky-100 space-y-1">
                <li>Property features and amenities</li>
                <li>Price and financing terms</li>
                <li>Square footage and lot size</li>
                <li>Architectural style</li>
                <li>Location (address or neighborhood)</li>
                <li>Transportation access</li>
              </ul>
            </div>

            <div className="bg-white/10 border-2 border-orange-400 rounded-xl p-6">
              <h3 className="text-orange-300 text-2xl font-semibold mb-3">
                🚨 Never Advertise These:
              </h3>
              <ul className="list-disc list-inside text-sky-100 space-y-1">
                <li>"Perfect for families"</li>
                <li>"Adult community"</li>
                <li>"Safe neighborhood"</li>
                <li>School district quality</li>
                <li>Demographics such as "young professionals"</li>
                <li>Lifestyle preferences</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Compliance Checklist */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Your Marketing Compliance Checklist
          </h2>
          <p className="text-sky-100 mb-6">
            Review every listing, ad, and social post.
          </p>

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

        {/* Safe vs Risky Examples */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Safe vs. Risky Ad Copy Examples
          </h2>
          <p className="text-sky-100 mb-6">
            Real examples of what works and what creates risk.
          </p>

          {/* Living Room */}
          <div className="rounded-2xl p-6 border-2 border-yellow-400 bg-yellow-400/10 mb-6">
            <h3 className="text-2xl font-semibold text-yellow-300">
              Living Room Descriptions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="bg-white/10 rounded-lg p-4 border-l-4 border-emerald-400">
                <div className="font-bold text-emerald-300 mb-2">✅ SAFE:</div>
                <p className="text-sky-100">
                  "Spacious living area with vaulted ceilings and natural light"
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 border-l-4 border-orange-500">
                <div className="font-bold text-orange-400 mb-2">🚨 RISKY:</div>
                <p className="text-sky-100">
                  "Perfect family room for entertaining with kids"
                </p>
              </div>
            </div>
          </div>

          {/* Neighborhood */}
          <div className="rounded-2xl p-6 border-2 border-yellow-400 bg-yellow-400/10 mb-6">
            <h3 className="text-2xl font-semibold text-yellow-300">
              Neighborhood Descriptions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="bg-white/10 rounded-lg p-4 border-l-4 border-emerald-400">
                <div className="font-bold text-emerald-300 mb-2">✅ SAFE:</div>
                <p className="text-sky-100">
                  "Established neighborhood with mature trees and sidewalks"
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 border-l-4 border-orange-500">
                <div className="font-bold text-orange-400 mb-2">🚨 RISKY:</div>
                <p className="text-sky-100">
                  "Safe area popular with young families"
                </p>
              </div>
            </div>
          </div>

          {/* Property Features */}
          <div className="rounded-2xl p-6 border-2 border-yellow-400 bg-yellow-400/10">
            <h3 className="text-2xl font-semibold text-yellow-300">
              Property Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="bg-white/10 rounded-lg p-4 border-l-4 border-emerald-400">
                <div className="font-bold text-emerald-300 mb-2">✅ SAFE:</div>
                <p className="text-sky-100">
                  "Main floor primary suite with walk-in closet"
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 border-l-4 border-orange-500">
                <div className="font-bold text-orange-400 mb-2">🚨 RISKY:</div>
                <p className="text-sky-100">
                  "Perfect for empty nesters who want single-level living"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Handling Client Questions */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            How to Handle Protected Class Questions
          </h2>
          <p className="text-sky-100 mb-6">
            When clients ask about schools, safety, or demographics.
          </p>

          <div className="rounded-2xl p-6 border-2 border-yellow-400 bg-yellow-400/10 mb-6">
            <h3 className="text-2xl font-semibold text-yellow-300">
              When Asked About Schools
            </h3>
            <p className="text-sky-100 italic mt-2">
              "I can't provide school ratings or recommendations, but I can
              share the district website where you can research schools that fit
              your family's needs. Would you like me to send you that link?"
            </p>
          </div>

          <div className="rounded-2xl p-6 border-2 border-emerald-400 bg-emerald-400/10 mb-6">
            <h3 className="text-2xl font-semibold text-emerald-300">
              When Asked About Safety
            </h3>
            <p className="text-sky-100 italic mt-2">
              "I recommend checking crime statistics on the city's website or
              meeting with local police community liaisons. I can also show you
              the security features of properties we tour."
            </p>
          </div>

          <div className="rounded-2xl p-6 border-2 border-orange-500 bg-orange-500/10">
            <h3 className="text-2xl font-semibold text-orange-400">
              When Asked About Demographics
            </h3>
            <p className="text-sky-100 italic mt-2">
              "I focus on helping you find the right property features and
              location. I'd encourage you to visit neighborhoods at different
              times to get a feel for the community yourself."
            </p>
          </div>
        </section>

        {/* Digital Marketing Rules */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Social Media and Digital Advertising Rules
          </h2>
          <p className="text-sky-100 mb-6">
            Platform-specific compliance requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 bg-emerald-400/10">
              <h3 className="text-2xl font-semibold text-emerald-300">
                Facebook/Instagram Targeting
              </h3>
              <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
                <li>✅ Location (zip codes, cities)</li>
                <li>✅ Age 18+ (minimum only)</li>
                <li>✅ Interests (real estate, home improvement)</li>
                <li>🚨 Never target by family status</li>
                <li>🚨 Never exclude age ranges</li>
                <li>🚨 Never target by gender</li>
              </ul>
            </div>

            <div className="rounded-2xl p-6 bg-yellow-400/10">
              <h3 className="text-2xl font-semibold text-yellow-300">
                Google Ads Requirements
              </h3>
              <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
                <li>✅ Geographic targeting only</li>
                <li>✅ Keywords like "homes for sale" or "real estate"</li>
                <li>✅ Property type such as "condo" or "single family"</li>
                <li>🚨 No demographic targeting</li>
                <li>🚨 No interest-based audiences</li>
                <li>🚨 Must include EHO statement</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl p-6 mt-6 border-2 border-yellow-400 bg-yellow-400/10">
            <p className="text-yellow-300 font-bold mb-2">💡 Pro Tip</p>
            <p className="text-sky-100">
              Always use broad, inclusive targeting. Better to reach more people
              than to exclude protected classes.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-8 bg-white/10 rounded-2xl border border-white/20">
          <p className="text-sky-200">
            Stacked • Real Estate CRM • Compliance Mastery Series
          </p>
          <p className="text-slate-300/70 text-sm mt-3">
            This guide provides general information only. Consult with a fair
            housing attorney for specific legal advice.
          </p>
        </footer>
      </div>
    </div>
  );
}
