import { useMemo, useState } from "react";

export default function Listing() {
  // Pre-shoot checklist
  const checklist = [
    {
      id: "p1",
      text: "All lights ON: every room, every lamp, under-cabinet, exterior",
    },
    {
      id: "p2",
      text: "Declutter completely: remove 50% more than you think necessary",
    },
    {
      id: "p3",
      text: "Stage for lifestyle: set dining table, add throw pillows, fresh flowers",
    },
    {
      id: "p4",
      text: "Hide personal items: family photos, medications, pet supplies",
    },
    { id: "p5", text: "Open all blinds/curtains: maximize natural light" },
    {
      id: "p6",
      text: "Fresh towels/bedding: make beds perfectly, fold towels uniformly",
    },
    {
      id: "p7",
      text: "Clean all mirrors/glass: windows, sliders, bathroom mirrors",
    },
  ];

  // Shot sequence
  const shots = [
    {
      n: 1,
      title: "Hero Exterior Shot",
      desc: "Best front angle, golden hour preferred",
    },
    { n: 2, title: "Grand Entrance", desc: "Foyer or first interior view" },
    {
      n: 3,
      title: "Main Living Space",
      desc: "Living/great room, widest angle",
    },
    {
      n: 4,
      title: "Kitchen Overview",
      desc: "Full kitchen; include island/peninsula",
    },
    {
      n: 5,
      title: "Primary Bedroom",
      desc: "Staged, wide angle showing space",
    },
    {
      n: 6,
      title: "Primary Bathroom",
      desc: "Best vanity angle; shower/tub if notable",
    },
    {
      n: 7,
      title: "Outdoor Living",
      desc: "Backyard/patio/deck, lifestyle staging",
    },
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
            📸
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Listing Media & Copy That Sells
          </h1>
          <div className="inline-block mt-5 px-6 py-2 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Guide
          </div>
          <p className="mt-4 text-sky-200 max-w-xl mx-auto">
            Shot list, sequencing, and a one-paragraph description formula
            buyers actually read.
          </p>
          <div className="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 font-semibold">
            8 min read
          </div>
        </header>

        {/* Key Stats */}
        <section className="mb-10 sm:mb-12">
          <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 text-center font-bold text-lg sm:text-xl p-6 rounded-2xl">
            Listings with professional photos sell 32% faster and for 15% more
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white/10 border-2 border-emerald-400 rounded-xl p-6">
              <h3 className="text-emerald-300 text-2xl font-semibold mb-3">
                📊 Buyer Behavior Reality
              </h3>
              <ul className="list-disc list-inside text-sky-100 space-y-1">
                <li>89% judge a listing within 15 seconds</li>
                <li>First 3 photos determine continued scrolling</li>
                <li>Most buyers read only the first paragraph</li>
                <li>25+ photos yield 40% more showing requests</li>
              </ul>
            </div>

            <div className="bg-white/10 border-2 border-emerald-400 rounded-xl p-6">
              <h3 className="text-emerald-300 text-2xl font-semibold mb-3">
                💰 What Drives Offers
              </h3>
              <ul className="list-disc list-inside text-sky-100 space-y-1">
                <li>Strong exterior shots for curb appeal</li>
                <li>Bright, wide-angle interiors</li>
                <li>Lifestyle images, not only empty rooms</li>
                <li>Compelling first paragraph copy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Photo Shot List */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Essential Photo Shot List
          </h2>
          <p className="text-sky-100 mb-6">
            This sequence maximizes engagement and showing requests.
          </p>

          <div className="rounded-2xl p-6 border-2 border-emerald-400 bg-emerald-400/10">
            <h3 className="text-2xl font-semibold text-emerald-300">
              Must-Have Shots (In Order)
            </h3>

            <div className="mt-4">
              {shots.map((s) => (
                <div
                  key={s.n}
                  className="flex items-center gap-4 bg-white/10 rounded-xl p-4 mt-3"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-900 font-bold grid place-items-center">
                    {s.n}
                  </div>
                  <div className="text-sky-100">
                    <strong>{s.title}</strong>
                    <br />
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-6 mt-6 border-2 border-yellow-400 bg-yellow-400/10">
            <p className="text-yellow-300 font-bold mb-2">📷 Pro Tip</p>
            <p className="text-sky-100">
              Shoot every room twice: a wide angle of the full space, and a
              detail shot of the best feature.
            </p>
          </div>
        </section>

        {/* Pre-Shoot Checklist */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Pre-Shoot Checklist
          </h2>
          <p className="text-sky-100 mb-6">
            Complete this before the photographer arrives.
          </p>

          {/* Progress */}
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

        {/* One-Paragraph Formula */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            The One-Paragraph Formula
          </h2>
          <p className="text-sky-100 mb-6">
            A structure that prompts showings.
          </p>

          <div className="rounded-2xl p-6 border-2 border-orange-500 bg-orange-500/10 font-mono">
            <h3 className="text-2xl font-semibold text-orange-400">
              The SELL Formula
            </h3>
            <div className="text-sky-100 mt-4 leading-relaxed">
              <strong>S</strong>tyle + Location Hook
              <br />
              <strong>E</strong>motion-driven feature
              <br />
              <strong>L</strong>ifestyle benefit
              <br />
              <strong>L</strong>ogical closer (size, value, timing)
            </div>
          </div>

          <div className="rounded-2xl p-6 mt-6 border-2 border-yellow-400 bg-yellow-400/10">
            <h3 className="text-2xl font-semibold text-yellow-300">
              Before & After Examples
            </h3>

            <div className="bg-white/10 rounded-lg p-4 mt-4 border-l-4 border-orange-500">
              <div className="font-bold text-orange-400 mb-2">❌ WEAK</div>
              <p className="text-sky-100">
                “3 bedroom, 2 bathroom home with updated kitchen and nice
                backyard. Close to schools and shopping. Move-in ready.”
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-4 mt-4 border-l-4 border-emerald-400">
              <div className="font-bold text-emerald-300 mb-2">✅ STRONG</div>
              <p className="text-sky-100">
                “Stunning craftsman in tree-lined Riverside District where
                morning coffee on your wraparound porch becomes a daily ritual.
                The chef’s kitchen with marble countertops and premium
                appliances flows to the family room, creating space for holidays
                and homework alike. With 2,150 sq ft of thoughtful updates and a
                private backyard oasis, this rarely available gem won’t last at
                $425,000.”
              </p>
            </div>
          </div>
        </section>

        {/* Copy Templates by Property Type */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Copy Templates by Property Type
          </h2>
          <p className="text-sky-100 mb-6">Adapt these for different homes.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl p-6 bg-emerald-400/10">
              <h3 className="text-emerald-300 text-xl font-semibold">
                Starter Home
              </h3>
              <p className="text-sky-100 text-sm mt-2">
                “Charming [style] in [neighborhood] where first-time buyers’
                dreams come true. The [standout feature] creates [lifestyle
                benefit], while the [practical feature] eases daily life. At [sq
                ft] and priced at [price], this [USP] is what you’ve been
                waiting for.”
              </p>
            </div>

            <div className="rounded-2xl p-6 bg-yellow-400/10">
              <h3 className="text-yellow-300 text-xl font-semibold">
                Family Home
              </h3>
              <p className="text-sky-100 text-sm mt-2">
                “Impressive [style] in sought-after [neighborhood]. The [main
                living area] becomes command central, while the [outdoor space]
                entertains kids and adults alike. With [beds/baths] and [key
                features], this [sq ft] home delivers the room and function your
                family needs.”
              </p>
            </div>

            <div className="rounded-2xl p-6 bg-orange-500/10">
              <h3 className="text-orange-400 text-xl font-semibold">
                Luxury Home
              </h3>
              <p className="text-sky-100 text-sm mt-2">
                “Exceptional [style] estate in prestigious [neighborhood]. The
                [stunning feature] commands attention, while [high-end amenity]
                elevates daily life. With [impressive stats] and [exclusive
                features], this [sq ft] masterpiece is a rare opportunity in
                [market/price range].”
              </p>
            </div>
          </div>
        </section>

        {/* What Buyers Actually Read */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            What Buyers Actually Read
          </h2>
          <p className="text-sky-100 mb-6">
            Focus effort where attention is highest.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 bg-emerald-400/10">
              <h3 className="text-emerald-300 text-2xl font-semibold">
                Always Read (100%)
              </h3>
              <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
                <li>Price and main stats (bed/bath/sq ft)</li>
                <li>First sentence of description</li>
                <li>Photo captions on first 3 images</li>
                <li>Virtual tour thumbnail</li>
              </ul>
            </div>

            <div className="rounded-2xl p-6 bg-yellow-400/10">
              <h3 className="text-yellow-300 text-2xl font-semibold">
                Sometimes Read (60%)
              </h3>
              <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
                <li>Full first paragraph</li>
                <li>Bullet point features</li>
                <li>School information</li>
                <li>HOA/tax details</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl p-6 bg-orange-500/10 mt-6">
            <h3 className="text-orange-400 text-2xl font-semibold">
              Rarely Read (20%)
            </h3>
            <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
              <li>Long feature lists</li>
              <li>Room dimensions</li>
              <li>Technical specifications</li>
              <li>Agent biography</li>
            </ul>
            <p className="text-sky-100 mt-3">
              <strong>Takeaway:</strong> lead with top selling points in the
              first paragraph and photo captions.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-8 bg-white/10 rounded-2xl border border-white/20">
          <p className="text-sky-200">
            Stacked • Real Estate CRM • Marketing Mastery Series
          </p>
        </footer>
      </div>
    </div>
  );
}
