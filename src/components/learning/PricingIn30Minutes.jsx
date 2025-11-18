import { useMemo, useState } from "react";

export default function PricingIn30Minutes() {
  // ---------- Calculator state ----------
  const [comp1, setComp1] = useState("");
  const [comp2, setComp2] = useState("");
  const [comp3, setComp3] = useState("");
  const [comp4, setComp4] = useState("");
  const [condition, setCondition] = useState("similar"); // better | similar | needs-work
  const [market, setMarket] = useState("balanced"); // hot | balanced | cool
  const [calc, setCalc] = useState(null);

  const currency = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(v);

  const validComps = useMemo(() => {
    const vals = [
      Number(comp1 || 0),
      Number(comp2 || 0),
      Number(comp3 || 0),
      Number(comp4 || 0),
    ].filter((v) => v > 0);
    return vals;
  }, [comp1, comp2, comp3, comp4]);

  const compute = () => {
    if (!(Number(comp1) > 0) || !(Number(comp2) > 0)) {
      alert("Please enter at least the first two comp values.");
      return;
    }

    const minComp = Math.min(...validComps);
    const maxComp = Math.max(...validComps);
    const avgComp = validComps.reduce((s, v) => s + v, 0) / validComps.length;

    let adjusted = avgComp;
    let note = "No condition adjustment needed";
    if (condition === "better") {
      adjusted = avgComp * 1.03;
      note = "Adjusted up 3% for superior condition";
    } else if (condition === "needs-work") {
      adjusted = avgComp * 0.95;
      note = "Adjusted down 5% for condition issues";
    }

    const rangeMin = Math.round(adjusted * 0.975);
    const rangeMax = Math.round(adjusted * 1.025);

    let recommended = Math.round((rangeMin + rangeMax) / 2);
    let strategy = "Balanced Strategy: Price in middle of range";
    let timeline = "2-4 weeks";
    let icon = "🎯";

    if (market === "hot") {
      recommended = rangeMin;
      strategy = "Magnet Strategy: Price at low end to create urgency";
      timeline = "1-2 weeks";
      icon = "⚡";
    } else if (market === "cool") {
      recommended = Math.round(adjusted);
      strategy =
        "Conservative Strategy: Price at market value for steady activity";
      timeline = "4-8 weeks";
      icon = "🎯";
    }

    setCalc({
      rangeMin,
      rangeMax,
      strategy,
      timeline,
      icon,
      recommended,
      note,
      avg: Math.round(avgComp),
      count: validComps.length,
    });
    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 p-8 sm:p-12 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-orange-500 grid place-items-center text-2xl font-bold">
            📊
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Pricing a Listing in 30 Minutes
          </h1>
          <div className="inline-block mt-5 px-6 py-2 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Framework
          </div>
          <p className="mt-4 text-sky-200 max-w-xl mx-auto">
            Pick the right comps, reconcile to a range, and choose a launch
            strategy that attracts the first best buyer.
          </p>
          <div className="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 font-semibold">
            9 min read
          </div>
        </header>

        {/* Intro */}
        <section className="mb-10 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            The Pricing Formula That Works
          </h2>
          <p className="text-sky-100">
            You’re not hunting a “perfect” price—you’re choosing a{" "}
            <em>strategic</em> price that creates the response you want.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              [
                "1",
                "Pick the Right Comps",
                "Use the ones buyers will actually compare to your listing.",
              ],
              [
                "2",
                "Reconcile to a Range",
                "Turn comp data into a defendable price band.",
              ],
              [
                "3",
                "Choose Launch Strategy",
                "Price to create your desired market response.",
              ],
            ].map(([n, t, d]) => (
              <div
                key={n}
                className="text-center rounded-2xl border-2 border-emerald-400/50 bg-emerald-400/15 p-6"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-400 text-slate-900 text-xl font-bold grid place-items-center">
                  {n}
                </div>
                <h4 className="text-emerald-300 text-lg font-semibold">{t}</h4>
                <p className="text-sky-100 text-sm mt-1">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step 1 */}
        <section className="mb-10 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Step 1: The Comp Selection Secret
          </h2>
          <p className="text-sky-100">
            Think like a buyer. Pick properties that will shape
            perception—“move-in ready,” “needs work,” or “in between.”
          </p>
          <div className="mt-5 p-5 rounded-2xl border-l-4 border-yellow-400 bg-yellow-400/10">
            <div className="text-yellow-300 font-bold mb-2">
              Real Example: Suburban Colonial Challenge
            </div>
            <p className="text-sky-100">
              Buyers categorize emotionally first. Use comps that mirror how
              your home will be bucketed in their minds.
            </p>
          </div>

          <div className="mt-5 p-5 rounded-xl bg-white/5">
            <p>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                Comp 1 – The “Twin”:
              </span>{" "}
              closest match; baseline.
            </p>
            <p>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                Comp 2 – The “Upgrade”:
              </span>{" "}
              shows ceiling with improvements.
            </p>
            <p>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                Comp 3 – The “Baseline”:
              </span>{" "}
              confirms floor.
            </p>
            <p>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                Comp 4 – The “Wild Card”:
              </span>{" "}
              different style; same buyer pool/price point.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-10 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Step 2: From Comps to Range
          </h2>
          <p className="text-sky-100">
            Build a defendable band—evidence + consistent, plain-English
            adjustments.
          </p>

          <div className="rounded-xl overflow-hidden bg-white text-slate-900 mt-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left py-3 px-4">Property</th>
                  <th className="text-left py-3 px-4">Sale Price</th>
                  <th className="text-left py-3 px-4">$/SF</th>
                  <th className="text-left py-3 px-4">Key Advantage</th>
                  <th className="text-left py-3 px-4">Key Disadvantage</th>
                  <th className="text-left py-3 px-4">Net Adjustment</th>
                  <th className="text-left py-3 px-4">Indicated Value</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(even)]:bg-black/5">
                <tr>
                  <td className="py-3 px-4">Comp 1 (Twin)</td>
                  <td className="py-3 px-4">$515,000</td>
                  <td className="py-3 px-4">$216</td>
                  <td className="py-3 px-4">Better lot</td>
                  <td className="py-3 px-4">Smaller garage</td>
                  <td className="py-3 px-4">+$8,000</td>
                  <td className="py-3 px-4">$523,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Comp 2 (Upgrade)</td>
                  <td className="py-3 px-4">$545,000</td>
                  <td className="py-3 px-4">$232</td>
                  <td className="py-3 px-4">Full renovation</td>
                  <td className="py-3 px-4">Busy street</td>
                  <td className="py-3 px-4">-$15,000</td>
                  <td className="py-3 px-4">$530,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Comp 3 (Baseline)</td>
                  <td className="py-3 px-4">$485,000</td>
                  <td className="py-3 px-4">$198</td>
                  <td className="py-3 px-4">Move-in ready</td>
                  <td className="py-3 px-4">Needs updates</td>
                  <td className="py-3 px-4">+$25,000</td>
                  <td className="py-3 px-4">$510,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Comp 4 (Wild Card)</td>
                  <td className="py-3 px-4">$525,000</td>
                  <td className="py-3 px-4">$220</td>
                  <td className="py-3 px-4">Architectural charm</td>
                  <td className="py-3 px-4">Smaller bedrooms</td>
                  <td className="py-3 px-4">+$5,000</td>
                  <td className="py-3 px-4">$530,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center font-bold text-lg rounded-xl p-5 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900">
            Indicated Range: $510,000 – $530,000
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-10 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Strategic Launch Positioning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              [
                "🎯",
                "The Bullseye Strategy",
                "$520K (mid-range)",
                "Balanced markets, flexible timelines.",
              ],
              [
                "⚡",
                "The Magnet Strategy",
                "$509K (below range)",
                "Hot markets, speed prioritized.",
              ],
              [
                "💎",
                "The Aspirational Strategy",
                "$529K (top of range)",
                "Unique homes, patient sellers.",
              ],
            ].map(([ic, t, p, b]) => (
              <div
                key={t}
                className="text-center rounded-2xl border-2 border-white/30 hover:border-emerald-400 p-6 bg-white/10"
              >
                <div className="text-4xl mb-2">{ic}</div>
                <h4 className="text-xl font-semibold mb-1">{t}</h4>
                <p className="font-semibold">{p}</p>
                <p className="text-sky-100 text-sm mt-2">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Calculator */}
        <section className="mb-10 p-8 bg-orange-500/20 border-2 border-orange-500 rounded-2xl">
          <h3 className="text-2xl font-semibold text-orange-400">
            🧮 Simple Pricing Calculator
          </h3>
          <p className="text-sky-100 mt-1">
            Enter comps to get an instant recommendation.
          </p>

          <div className="mt-5 rounded-xl bg-white/10 p-5">
            <h4 className="text-emerald-300 font-semibold mb-3">
              Enter 2–4 Recent Comparable Sales
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold">
                  Comp 1 (most similar)
                </label>
                <input
                  className="calc-input"
                  type="number"
                  placeholder="500000"
                  value={comp1}
                  onChange={(e) => setComp1(e.target.value)}
                />
                <label className="block mt-3 mb-1 font-semibold">Comp 2</label>
                <input
                  className="calc-input"
                  type="number"
                  placeholder="485000"
                  value={comp2}
                  onChange={(e) => setComp2(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">
                  Comp 3 (optional)
                </label>
                <input
                  className="calc-input"
                  type="number"
                  placeholder="515000"
                  value={comp3}
                  onChange={(e) => setComp3(e.target.value)}
                />
                <label className="block mt-3 mb-1 font-semibold">
                  Comp 4 (optional)
                </label>
                <input
                  className="calc-input"
                  type="number"
                  placeholder=""
                  value={comp4}
                  onChange={(e) => setComp4(e.target.value)}
                />
              </div>
            </div>

            <h4 className="text-emerald-300 font-semibold mt-5 mb-2">
              Your Home’s Condition vs. Comps
            </h4>
            <div className="space-y-2">
              {[
                ["better", "✨ Better condition than most comps"],
                ["similar", "🏠 Similar condition to comps"],
                ["needs-work", "🔧 Needs more work than comps"],
              ].map(([val, label]) => (
                <label
                  key={val}
                  className="flex items-center gap-2 p-2 rounded hover:bg-white/10 cursor-pointer"
                >
                  <input
                    type="radio"
                    className="scale-110"
                    checked={condition === val}
                    onChange={() => setCondition(val)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <h4 className="text-emerald-300 font-semibold mt-5 mb-2">
              Current Market Conditions
            </h4>
            <div className="space-y-2">
              {[
                ["hot", "🔥 Hot (fast sales, multiple offers)"],
                ["balanced", "🌡️ Balanced (2–4 weeks to sell)"],
                ["cool", "❄️ Cool (longer time, buyer’s market)"],
              ].map(([val, label]) => (
                <label
                  key={val}
                  className="flex items-center gap-2 p-2 rounded hover:bg-white/10 cursor-pointer"
                >
                  <input
                    type="radio"
                    className="scale-110"
                    checked={market === val}
                    onChange={() => setMarket(val)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <button onClick={compute} className="calc-button mt-4">
              Get My Pricing Strategy
            </button>

            <div id="results" className={calc ? "block" : "hidden"}>
              <h4 className="text-emerald-300 font-semibold mt-4 mb-3">
                Your Pricing Strategy
              </h4>
              <div className="text-slate-900 font-bold text-lg rounded-xl p-5 bg-gradient-to-r from-emerald-400 to-teal-500">
                {calc && (
                  <>
                    Estimated Value Range: {currency(calc.rangeMin)} –{" "}
                    {currency(calc.rangeMax)}
                  </>
                )}
              </div>
              <div className="mt-3 rounded-lg p-4 bg-emerald-400/20">
                {calc && (
                  <>
                    <div className="font-semibold">
                      {calc.icon} {calc.strategy}
                    </div>
                    <div className="text-2xl text-emerald-300 font-extrabold">
                      Recommended Launch Price: {currency(calc.recommended)}
                    </div>
                    <div className="text-sky-200 text-sm mt-1">{calc.note}</div>
                  </>
                )}
              </div>
              <div className="mt-3 rounded-lg p-4 bg-yellow-400/20">
                {calc && (
                  <>
                    <strong>📅 Expected Timeline:</strong> {calc.timeline}
                    <br />
                    <strong>💡 Why this price:</strong> Based on {calc.count}{" "}
                    comps averaging {currency(calc.avg)}, adjusted for your
                    home’s condition and the current market.
                    <br />
                    <strong>🎬 Next Steps:</strong> Track first-week showings.
                    If interest is light, consider a 2–3% adjustment.
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Script */}
        <section className="mb-10 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Your 60-Second Pricing Script
          </h2>
          <div className="italic text-base rounded-2xl p-6 border-2 border-emerald-400 bg-emerald-400/20">
            “I analyzed four key sales buyers will naturally compare to your
            home. After specific, plain-English adjustments, you fit a [X]–[Y]
            range. Given today’s conditions, I’d launch at [Z] because [reason].
            That should generate [response] within [timeframe].”
          </div>
        </section>

        {/* Objections */}
        <section className="mb-10 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Handling Common Pricing Objections
          </h2>
          <div className="p-5 rounded-2xl border-l-4 border-yellow-400 bg-yellow-400/10 mb-4">
            <div className="text-yellow-300 font-bold mb-1">
              “Why not price higher and see what happens?”
            </div>
            <p className="text-sky-100">
              Overpricing costs the motivated early buyers. Homes that start too
              high typically net less after reductions.
            </p>
          </div>
          <div className="p-5 rounded-2xl border-l-4 border-yellow-400 bg-yellow-400/10 mb-4">
            <div className="text-yellow-300 font-bold mb-1">
              “Our neighbor got more.”
            </div>
            <p className="text-sky-100">
              Show the differences (features, timing, condition) and the
              last-30-days shift.
            </p>
          </div>
          <div className="p-5 rounded-2xl border-l-4 border-yellow-400 bg-yellow-400/10">
            <div className="text-yellow-300 font-bold mb-1">
              “Let’s try high for two weeks.”
            </div>
            <p className="text-sky-100">
              Week-1 buyers judge and move on; a later reduction signals
              distress. Start strategic; adjust quickly if needed.
            </p>
          </div>
        </section>

        {/* Final challenge */}
        <section className="mb-10 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-4">
            🏆 Master the Framework
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              [
                "✓",
                "Think Like a Buyer",
                "Comps must pass the eye test first.",
              ],
              [
                "✓",
                "Defend Every Number",
                "Explain your range in plain English.",
              ],
              [
                "✓",
                "Match Strategy to Market",
                "Price to create the response you want.",
              ],
            ].map(([ic, t, d]) => (
              <div
                key={t}
                className="text-center rounded-2xl border-2 border-emerald-400/50 bg-emerald-400/15 p-6"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-400 text-slate-900 text-xl font-bold grid place-items-center">
                  {ic}
                </div>
                <h4 className="text-emerald-300 text-lg font-semibold">{t}</h4>
                <p className="text-sky-100 text-sm mt-1">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-8 bg-white/10 rounded-2xl border border-white/20">
          <p className="text-sky-200">
            Stacked • Real Estate CRM • Pricing Mastery Series
          </p>
        </footer>
      </div>
    </div>
  );
}

/* Tailwind-friendly inputs */
const inputBase = `
w-full rounded-lg bg-white/15 text-white placeholder-white/70 px-3 py-2 outline-none
`;
