import { useState } from "react";

export default function Offer() {
  // ---- Gap Coverage Calculator ----
  const [purchasePrice, setPurchasePrice] = useState("");
  const [listPrice, setListPrice] = useState("");
  const [market, setMarket] = useState("balanced");
  const [ptype, setPtype] = useState("standard");
  const [gapResult, setGapResult] = useState(null);

  function calculateGap() {
    const p = Number(purchasePrice);
    const l = Number(listPrice);
    if (!p || !l) {
      alert("Please enter both purchase price and list price.");
      return;
    }
    const overAskPercent = ((p - l) / l) * 100;
    let baseGap = 0;
    let risk = "Low";

    if (market === "hot") {
      baseGap = Math.max(15000, p * 0.03);
      risk = "High";
    } else if (market === "balanced") {
      baseGap = Math.max(10000, p * 0.02);
      risk = "Medium";
    } else {
      baseGap = Math.max(5000, p * 0.015);
      risk = "Low";
    }

    if (ptype === "unique") {
      baseGap *= 1.5;
      risk = risk === "Low" ? "Medium" : "High";
    } else if (ptype === "new") {
      baseGap *= 0.7;
    }

    let reasoning = "";
    if (overAskPercent > 10) {
      baseGap *= 1.3;
      reasoning += "Increased due to significant over-ask offer. ";
    } else if (overAskPercent > 5) {
      baseGap *= 1.1;
      reasoning += "Slightly increased due to over-ask offer. ";
    } else if (overAskPercent < 0) {
      baseGap *= 0.8;
      reasoning += "Reduced due to at/under-ask offer. ";
    }

    const maxGap = p * 0.05;
    const rec = Math.min(Math.round(baseGap), maxGap);
    reasoning += `Market conditions (${market}) and property type (${ptype}) suggest ${risk.toLowerCase()} appraisal risk. `;
    if (overAskPercent > 0) {
      reasoning += `Your offer is ${overAskPercent.toFixed(
        1
      )}% over asking price. `;
    }
    reasoning +=
      "This gap coverage should keep the offer competitive while limiting risk.";

    const currency = (n) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n);

    setGapResult({
      recText: `Recommended Gap Coverage: ${currency(rec)}`,
      risk,
      exposure: `${((rec / p) * 100).toFixed(1)}% of purchase price`,
      reasoning,
    });
  }

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-slate-800 to-sky-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 p-8 sm:p-12 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-orange-500 grid place-items-center text-2xl font-bold">
            🎯
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Offer Strategy: Win Without Overpaying
          </h1>
          <div className="inline-block mt-5 px-6 py-2 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Playbook
          </div>
          <p className="mt-4 text-sky-200 max-w-xl mx-auto">
            Build offers that appraise: escalation etiquette, appraisal gaps,
            and smart credits that keep cash in pocket.
          </p>
          <div className="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 font-semibold">
            10 min read
          </div>
        </header>

        {/* Smart Offer Formula */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            The Smart Offer Formula
          </h2>
          <p className="text-sky-100">
            Winning offers are about what sellers value and how you protect the
            buyer. Use escalation psychology, gap strategy, and credits to win
            without waste.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              {
                icon: "📈",
                title: "Smart Escalations",
                text: "Signal strength without exposing your ceiling.",
              },
              {
                icon: "🛡️",
                title: "Gap Protection",
                text: "Win while limiting appraisal risk.",
              },
              {
                icon: "💰",
                title: "Credit Strategy",
                text: "Lower cash-to-close without weakening the offer.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="text-center rounded-2xl border-2 border-emerald-400/50 bg-emerald-400/15 p-6 hover:-translate-y-1 transition"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-400 text-slate-900 text-2xl font-bold grid place-items-center">
                  {s.icon}
                </div>
                <h4 className="text-emerald-300 text-lg font-semibold mb-1">
                  {s.title}
                </h4>
                <p className="text-sky-100 text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Escalation Clause Mastery */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Escalation Clause Mastery
          </h2>
          <p className="text-sky-100">
            A good escalation looks confident and informed. A poor one looks
            desperate. Choose increments, ceilings, and conditions with care.
          </p>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-6">
            The Psychology Behind Escalations
          </h3>
          <div className="rounded-2xl p-6 mt-3 border-l-4 border-yellow-400 bg-yellow-400/10">
            <div className="text-yellow-300 font-bold mb-2">
              The $1,000 Escalation Mistake
            </div>
            <p>
              <strong>Weak:</strong> “Escalate by $1,000 up to $550,000.”
            </p>
            <p>
              <strong>Strong:</strong> “Escalate by $2,500 up to $545,000
              against bona fide conventional or cash offers.”
            </p>
            <p className="mt-2">
              Larger steps show strength, a modest ceiling shows market savvy,
              and conditions show sophistication.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-8">
            The Three-Part Escalation Formula
          </h3>
          <h4 className="text-emerald-300 text-xl font-semibold mt-4">
            1. Choose Your Increment
          </h4>
          <ul className="list-disc list-inside text-sky-100">
            <li>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                $1,000
              </span>{" "}
              reads budget tight
            </li>
            <li>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                $2,500–$5,000
              </span>{" "}
              reads strong
            </li>
            <li>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                $10,000+
              </span>{" "}
              reads cash-rich
            </li>
          </ul>

          <h4 className="text-emerald-300 text-xl font-semibold mt-4">
            2. Set a Strategic Ceiling
          </h4>
          <p className="text-sky-100">
            Keep it 3–5% below the true max to avoid escalation wars.
          </p>

          <h4 className="text-emerald-300 text-xl font-semibold mt-4">
            3. Add Protective Conditions
          </h4>
          <div className="rounded-2xl p-5 mt-2 border-2 border-emerald-400 bg-emerald-400/20 font-mono text-sm">
            <div className="font-sans font-bold text-emerald-300 mb-2">
              Professional Escalation Language
            </div>
            “Purchaser increases price by $3,000 above any bona fide competing
            offer up to $525,000, provided the competing offer is a financially
            qualified conventional or cash offer, and seller furnishes a copy
            within 24 hours of acceptance.”
          </div>

          <div className="rounded-2xl p-6 mt-6 border-2 border-orange-500 bg-orange-500/20">
            <div className="text-orange-400 font-bold mb-2">
              Escalation Pitfalls to Avoid
            </div>
            <ul className="list-disc list-inside text-sky-100">
              <li>
                Don’t escalate against FHA/VA if your buyer is conventional
              </li>
              <li>
                Avoid escalations when there are 10+ offers; lead with best
                price
              </li>
              <li>Require proof of competing offers</li>
              <li>Set an activation deadline (24–48 hours)</li>
            </ul>
          </div>
        </section>

        {/* Appraisal Gap Strategy */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Appraisal Gap Strategy
          </h2>
          <p className="text-sky-100">
            Cover enough to win, cap risk to protect the buyer. Adjust by market
            heat, property type, and how far over ask you go.
          </p>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-6">
            Risk Scenarios
          </h3>
          <div className="rounded-xl overflow-hidden bg-white text-slate-900 mt-3">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left py-3 px-4">Market Scenario</th>
                  <th className="text-left py-3 px-4">Risk</th>
                  <th className="text-left py-3 px-4">Recommended Gap</th>
                  <th className="text-left py-3 px-4">Strategy</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(even)]:bg-black/5">
                <tr>
                  <td className="py-3 px-4">Hot market, 5% over ask</td>
                  <td className="py-3 px-4">High</td>
                  <td className="py-3 px-4">$10–15K max</td>
                  <td className="py-3 px-4">Limited exposure</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Balanced market, at ask</td>
                  <td className="py-3 px-4">Low</td>
                  <td className="py-3 px-4">$5–10K</td>
                  <td className="py-3 px-4">Competitive edge</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Unique property</td>
                  <td className="py-3 px-4">High</td>
                  <td className="py-3 px-4">2–3% of price</td>
                  <td className="py-3 px-4">Scaled protection</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Recent comps strong</td>
                  <td className="py-3 px-4">Low</td>
                  <td className="py-3 px-4">$15–20K</td>
                  <td className="py-3 px-4">Confident coverage</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-8">
            Smart Coverage Structures
          </h3>
          <h4 className="text-emerald-300 text-xl font-semibold mt-4">
            Sliding Scale
          </h4>
          <div className="rounded-2xl p-5 border-2 border-emerald-400 bg-emerald-400/20 font-mono text-sm">
            <div className="font-sans font-bold text-emerald-300 mb-2">
              Language
            </div>
            “If appraisal is below price, Buyer pays the difference up to 2% of
            price (e.g., $10,000 on $500,000), or the shortfall, whichever is
            less.”
          </div>

          <h4 className="text-emerald-300 text-xl font-semibold mt-6">
            Tiered Gap
          </h4>
          <div className="rounded-2xl p-5 border-2 border-emerald-400 bg-emerald-400/20 font-mono text-sm">
            <div className="font-sans font-bold text-emerald-300 mb-2">
              Language
            </div>
            Buyer covers: first $10,000 at 100%; next $10,000 split 50/50 with
            seller; above $20,000 buyer may terminate.
          </div>

          {/* Calculator */}
          <div className="rounded-2xl p-6 mt-8 border-2 border-orange-500 bg-orange-500/10">
            <h3 className="text-2xl font-semibold text-orange-400">
              💡 Gap Coverage Calculator
            </h3>
            <p className="text-sky-100 mt-2">
              Enter offer details for a tailored recommendation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
              <div>
                <label className="block mb-2 font-semibold">
                  Purchase Price
                </label>
                <input
                  type="number"
                  placeholder="500000"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  className="w-full rounded-lg bg-white/15 text-white placeholder-white/70 px-3 py-2 outline-none"
                />
                <label className="block mt-4 mb-2 font-semibold">
                  List Price
                </label>
                <input
                  type="number"
                  placeholder="485000"
                  value={listPrice}
                  onChange={(e) => setListPrice(e.target.value)}
                  className="w-full rounded-lg bg-white/15 text-white placeholder-white/70 px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  Market Conditions
                </label>
                <select
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  className="w-full h-12 rounded-lg bg-white/15 text-white px-3 py-2 outline-none"
                >
                  <option value="hot">Hot Market</option>
                  <option value="balanced">Balanced Market</option>
                  <option value="cool">Cool Market</option>
                </select>

                <label className="block mt-4 mb-2 font-semibold">
                  Property Type
                </label>
                <select
                  value={ptype}
                  onChange={(e) => setPtype(e.target.value)}
                  className="w-full h-12 rounded-lg bg-white/15 text-white px-3 py-2 outline-none"
                >
                  <option value="standard">Standard/Common</option>
                  <option value="unique">Unique/Custom</option>
                  <option value="new">New Construction</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculateGap}
              className="w-full mt-6 rounded-xl bg-emerald-400 text-slate-900 font-bold py-3 hover:scale-[1.02] transition"
            >
              Calculate Recommended Gap Coverage
            </button>

            {gapResult && (
              <div className="mt-5 space-y-3">
                <div className="rounded-lg p-4 bg-emerald-400/20">
                  <div className="font-semibold">💡 {gapResult.recText}</div>
                  <div className="text-sky-100 text-sm mt-1">
                    Risk Level: {gapResult.risk} · Max Exposure:{" "}
                    {gapResult.exposure}
                  </div>
                </div>
                <div className="rounded-lg p-4 bg-yellow-400/20 text-sky-100">
                  <span className="font-semibold">📋 Strategy Reasoning:</span>{" "}
                  {gapResult.reasoning}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Credit Strategies */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Smart Credit Strategies
          </h2>
          <p className="text-sky-100">
            Credits work when they solve the seller’s problem and support
            appraisal. Frame them with purpose.
          </p>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-6">
            The Credit Psychology
          </h3>
          <div className="rounded-2xl p-6 mt-3 border-l-4 border-yellow-400 bg-yellow-400/10">
            <div className="text-yellow-300 font-bold mb-2">
              Rate Buy-Down Credit
            </div>
            <p>
              <strong>Weak:</strong> “$8,000 toward buyer closing costs.”
            </p>
            <p>
              <strong>Strong:</strong> “$8,000 credit to buy down rate, enabling
              faster closing.”
            </p>
            <p className="mt-2">
              Appraisal-friendly price, specific use, and speed benefit to
              seller.
            </p>
          </div>

          <h4 className="text-emerald-300 text-xl font-semibold mt-6">
            Credit Timing
          </h4>
          <ul className="list-disc list-inside text-sky-100">
            <li>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                Initial offer
              </span>{" "}
              integrate into package
            </li>
            <li>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                After inspection
              </span>{" "}
              target specific items
            </li>
            <li>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                After appraisal
              </span>{" "}
              bridge small gaps
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-6">
            Creative Structures
          </h3>
          <div className="rounded-2xl p-5 border-2 border-emerald-400 bg-emerald-400/20 font-mono text-sm">
            <div className="font-sans font-bold text-emerald-300 mb-2">
              Pre-Paid Escrow Credit
            </div>
            “Seller to credit $6,000 to pre-fund taxes and insurance escrow,
            smoothing loan approval.”
          </div>
          <div className="rounded-2xl p-5 mt-4 border-2 border-emerald-400 bg-emerald-400/20 font-mono text-sm">
            <div className="font-sans font-bold text-emerald-300 mb-2">
              Repair Credit Alternative
            </div>
            “In lieu of repairs, buyer requests $4,000 credit to address
            improvements post-closing, avoiding contractor delays and enabling
            customization.”
          </div>
        </section>

        {/* Complete Offer Strategy */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            The Complete Offer Strategy
          </h2>
          <p className="text-sky-100">
            Blend escalation, gap coverage, and credits into one clear package
            that answers the seller’s needs and shields the buyer.
          </p>

          <div className="rounded-2xl p-5 mt-4 border-2 border-emerald-400 bg-emerald-400/20 font-mono text-sm">
            <div className="font-sans font-bold text-emerald-300 mb-2">
              Complete Strategic Offer
            </div>
            <strong>Purchase Price:</strong> $515,000
            <br />
            <strong>Escalation:</strong> +$3,000 up to $535,000 vs bona fide
            conventional/cash
            <br />
            <strong>Appraisal Gap:</strong> Buyer covers up to $12,000 shortfall
            <br />
            <strong>Seller Credit:</strong> $7,000 for rate buy-down to
            accelerate closing
            <br />
            <strong>Inspection:</strong> 7 days; repairs up to $2,000 or
            equivalent credit
            <br />
            <strong>Closing:</strong> 21 days (or earlier at seller convenience)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="rounded-2xl p-6 border-2 border-emerald-400 bg-emerald-400/20">
              <h4 className="text-emerald-300 text-xl font-semibold">
                ✅ Do This
              </h4>
              <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
                <li>Research comps before setting ceilings</li>
                <li>Offer meaningful gap coverage in most markets</li>
                <li>Frame credits as solutions to seller problems</li>
                <li>Add conditions to prevent escalation abuse</li>
                <li>Prefer higher price + credit over lower price</li>
                <li>Include strong pre-approval and funds proof</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 border-2 border-orange-500 bg-orange-500/20">
              <h4 className="text-orange-400 text-xl font-semibold">
                ❌ Avoid This
              </h4>
              <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
                <li>$1,000 escalation steps unless budget is tight</li>
                <li>Unlimited gap coverage or waived appraisals</li>
                <li>Vague “pay all closing costs” credits</li>
                <li>Escalating against weaker financing types</li>
                <li>Waiving inspections on older homes</li>
                <li>Submitting offers with no response deadline</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Advanced Tactics */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Advanced Offer Tactics
          </h2>
          <p className="text-sky-100">
            Use these for an extra edge in ultra-competitive situations.
          </p>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-6">
            The Rent-Back Offer
          </h3>
          <div className="rounded-2xl p-6 mt-3 border-l-4 border-yellow-400 bg-yellow-400/10">
            <div className="text-yellow-300 font-bold mb-2">
              Strategic Rent-Back
            </div>
            <p>
              Instead of $520,000, try $515,000 with a 60-day rent-back at
              $0/day. Sellers gain flexibility, you keep price lower.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-6">
            Contingency Removal Timeline
          </h3>
          <ul className="list-disc list-inside text-sky-100">
            <li>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                Inspection:
              </span>{" "}
              5 days
            </li>
            <li>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                Appraisal:
              </span>{" "}
              14 days
            </li>
            <li>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                Loan approval:
              </span>{" "}
              17 days
            </li>
            <li>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                Closing:
              </span>{" "}
              21 days
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-6">
            Backup Offer Strategy
          </h3>
          <div className="rounded-2xl p-5 mt-2 border-2 border-emerald-400 bg-emerald-400/20 font-mono text-sm">
            <div className="font-sans font-bold text-emerald-300 mb-2">
              Positioning
            </div>
            “If the primary offer fails to close for any reason, this backup
            becomes primary as submitted, with time-sensitive contingencies
            extended proportionally.”
          </div>

          <div className="rounded-2xl p-6 mt-6 border-2 border-orange-500 bg-orange-500/20">
            <div className="text-orange-400 font-bold mb-2">
              ⚠️ Know When to Walk Away
            </div>
            <ul className="list-disc list-inside text-sky-100">
              <li>Gap coverage would exceed 5% of price</li>
              <li>Seller requires inspection waiver on an older home</li>
              <li>Multiple backups signal overheated bidding</li>
              <li>DTI would be stretched by higher pricing</li>
            </ul>
          </div>
        </section>

        {/* Quick Reference + Checklist */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Quick Reference: Offer Strategy Cheat Sheet
          </h2>

          <div className="rounded-xl overflow-hidden bg-white text-slate-900 mt-3">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left py-3 px-4">Market Type</th>
                  <th className="text-left py-3 px-4">Escalation Strategy</th>
                  <th className="text-left py-3 px-4">Gap Coverage</th>
                  <th className="text-left py-3 px-4">Credit Approach</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(even)]:bg-black/5">
                <tr>
                  <td className="py-3 px-4">
                    <strong>Hot Market</strong>
                    <br />
                    Multiple offers expected
                  </td>
                  <td className="py-3 px-4">
                    $5K increments, conservative ceiling
                  </td>
                  <td className="py-3 px-4">$15–20K or 3%</td>
                  <td className="py-3 px-4">Rate buy-down credits</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <strong>Balanced Market</strong>
                    <br />
                    2–3 offers typical
                  </td>
                  <td className="py-3 px-4">
                    $2.5K increments, moderate ceiling
                  </td>
                  <td className="py-3 px-4">$10–15K</td>
                  <td className="py-3 px-4">Closing cost credits</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <strong>Cool Market</strong>
                    <br />
                    Limited competition
                  </td>
                  <td className="py-3 px-4">Minimal or none</td>
                  <td className="py-3 px-4">$5–10K</td>
                  <td className="py-3 px-4">Repair credits</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <strong>Luxury Market</strong>
                    <br />
                    Unique properties
                  </td>
                  <td className="py-3 px-4">% based escalation</td>
                  <td className="py-3 px-4">2–3% of price</td>
                  <td className="py-3 px-4">Flexible terms focus</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-8">
            The 5-Minute Offer Review Checklist
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="rounded-2xl p-6 bg-emerald-400/10">
              <h4 className="text-emerald-300 text-xl font-semibold mb-2">
                Escalation Check
              </h4>
              <ul className="list-disc list-inside text-sky-100">
                <li>Meaningful increments ($2.5K+)</li>
                <li>Ceiling 3–5% below max</li>
                <li>Protective conditions included</li>
                <li>Proof of competing offers required</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 bg-yellow-400/10">
              <h4 className="text-yellow-300 text-xl font-semibold mb-2">
                Gap Coverage Check
              </h4>
              <ul className="list-disc list-inside text-sky-100">
                <li>Coverage matches market risk</li>
                <li>Aligned with recent appraisals</li>
                <li>Reasonable cap in place</li>
                <li>Improves competitiveness</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Case Studies: Winning Offers in Action
          </h2>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-4">
            Case Study 1: The Underdog Victory
          </h3>
          <div className="rounded-2xl p-6 mt-3 border-l-4 border-yellow-400 bg-yellow-400/10">
            <div className="text-yellow-300 font-bold mb-2">The Situation</div>
            <p>
              Listed at $475K with 8 offers; top at $525K cash. Our buyer:
              conventional, $510K max. We offered $505K with $3K steps to $515K,
              $12K gap, $6K moving credit, 45-day free rent-back, 7-day
              inspection, 14-day appraisal.
            </p>
            <p className="mt-2">
              <strong>Result:</strong> Won by solving the seller’s timing
              problem with rent-back.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-6">
            Case Study 2: The Smart Escalation
          </h3>
          <div className="rounded-2xl p-6 mt-3 border-l-4 border-yellow-400 bg-yellow-400/10">
            <div className="text-yellow-300 font-bold mb-2">The Situation</div>
            <p>
              New construction at $650K, builder firm on price. We offered list,
              no escalation, but secured $23K in value via targeted credits and
              flexible selections.
            </p>
            <p className="mt-2">
              <strong>Result:</strong> Builder kept price optics; buyer gained
              tangible upgrades.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-6">
            Case Study 3: The Gap Coverage Save
          </h3>
          <div className="rounded-2xl p-6 mt-3 border-l-4 border-yellow-400 bg-yellow-400/10">
            <div className="text-yellow-300 font-bold mb-2">The Situation</div>
            <p>
              Offered $485K on $460K list; appraisal at $470K. Our $20K gap
              covered the $15K shortfall and we traded the leftover leverage for
              small repairs.
            </p>
            <p className="mt-2">
              <strong>Result:</strong> Closed on time; buyer avoided
              earnest-money risk.
            </p>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Common Offer Mistakes
          </h2>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-4">
            The “Kitchen Sink” Offer
          </h3>
          <div className="rounded-2xl p-6 mt-3 border-2 border-orange-500 bg-orange-500/20">
            <div className="text-orange-400 font-bold mb-2">❌ The Mistake</div>
            <p>
              Stacking every tactic at once reads desperate. Pick the two or
              three that matter most.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-6">
            The “Race to the Bottom” Credit
          </h3>
          <div className="rounded-2xl p-6 mt-3 border-2 border-orange-500 bg-orange-500/20">
            <div className="text-orange-400 font-bold mb-2">❌ The Mistake</div>
            <p>
              “Seller to pay all buyer costs” weakens the offer. Specify purpose
              and mutual benefit.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-yellow-300 mt-6">
            The “Unlimited Risk” Gap
          </h3>
          <div className="rounded-2xl p-6 mt-3 border-2 border-orange-500 bg-orange-500/20">
            <div className="text-orange-400 font-bold mb-2">❌ The Mistake</div>
            <p>
              Never waive appraisal outright. Cap exposure at ~3–5% or a firm
              dollar amount.
            </p>
          </div>
        </section>

        {/* Action Plan */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Your 30-Day Action Plan
          </h2>
          <p className="text-sky-100">
            Build skill, then implement, then refine.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="rounded-2xl p-6 text-center bg-emerald-400/15">
              <h4 className="text-emerald-300 text-xl font-semibold mb-2">
                Week 1–2: Foundation
              </h4>
              <ul className="text-left list-disc list-inside text-sky-100 space-y-1">
                <li>Review sale patterns for escalations</li>
                <li>Draft clause templates</li>
                <li>Study typical appraisal gaps</li>
                <li>Practice gap math</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 text-center bg-yellow-400/15">
              <h4 className="text-yellow-300 text-xl font-semibold mb-2">
                Week 3–4: Implementation
              </h4>
              <ul className="text-left list-disc list-inside text-sky-100 space-y-1">
                <li>Write practice offers</li>
                <li>Role-play objections</li>
                <li>Template your credit asks</li>
                <li>Track win rate and feedback</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 text-center bg-orange-500/15">
              <h4 className="text-orange-400 text-xl font-semibold mb-2">
                Ongoing: Mastery
              </h4>
              <ul className="text-left list-disc list-inside text-sky-100 space-y-1">
                <li>Review trends monthly</li>
                <li>Adjust tactics by results</li>
                <li>Share wins with team</li>
                <li>Refine templates continuously</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-8 bg-white/10 rounded-2xl border border-white/20">
          <p className="text-sky-200">
            Stacked • Real Estate CRM • Offer Strategy Mastery Series
          </p>
        </footer>
      </div>
    </div>
  );
}
