import { useMemo, useState } from "react";

export default function Market() {
  // ----- Calculator state -----
  const [active, setActive] = useState("");
  const [sales, setSales] = useState("");
  const [domNow, setDomNow] = useState("");
  const [domPrev, setDomPrev] = useState("");
  const [psfNow, setPsfNow] = useState("");
  const [psfPrev, setPsfPrev] = useState("");
  const [result, setResult] = useState(null);

  function calcPulse() {
    const a = Number(active);
    const s = Number(sales);
    const dN = Number(domNow);
    const dP = Number(domPrev);
    const pN = Number(psfNow);
    const pP = Number(psfPrev);

    if (!a || !s || !dN || !pN) {
      alert("Please fill in all required fields for accurate market analysis.");
      return;
    }

    const mos = s ? a / s : 0;
    const domTrend = dP ? ((dN - dP) / dP) * 100 : 0;
    const psfTrend = pP ? ((pN - pP) / pP) * 100 : 0;

    let marketType = "Balanced Market";
    let marketTone = "text-yellow-300";
    let tagBg = "bg-yellow-400/20";
    let icon = "⚖️";
    if (mos < 3) {
      marketType = "Seller's Market";
      marketTone = "text-orange-400";
      tagBg = "bg-orange-500/20";
      icon = "🔥";
    } else if (mos > 6) {
      marketType = "Buyer's Market";
      marketTone = "text-emerald-300";
      tagBg = "bg-emerald-400/20";
      icon = "❄️";
    }

    let trend = "stable";
    let trendIcon = "➡️";
    if (domTrend < -10 && psfTrend > 1) {
      trend = "heating up";
      trendIcon = "📈";
    } else if (domTrend > 10 && psfTrend < 1) {
      trend = "cooling down";
      trendIcon = "📉";
    }

    let clientMessage = "";
    if (marketType === "Seller's Market") {
      clientMessage =
        trend === "heating up"
          ? "Excellent time to list. Price confidently and expect competitive offers."
          : trend === "cooling down"
            ? "Still favorable for sellers, but early cooling signs. List soon and price with precision."
            : "Strong seller conditions. Price to move within the first week.";
    } else if (marketType === "Balanced Market") {
      clientMessage =
        trend === "heating up"
          ? "Leaning toward sellers. Good moment to act decisively."
          : trend === "cooling down"
            ? "Tilting toward buyers. Sellers should stay competitive; buyers gain leverage."
            : "Normal negotiation. Price at market value and expect reasonable timelines.";
    } else {
      clientMessage =
        trend === "heating up"
          ? "Improving for sellers, but buyers still hold options. Move when the fit is right."
          : trend === "cooling down"
            ? "Buyer-favorable. Take time, negotiate terms, and watch for reductions."
            : "Buyer leverage. Broader selection and room to negotiate.";
    }

    setResult({
      mos,
      domTrend,
      psfTrend,
      marketType,
      marketTone,
      tagBg,
      icon,
      trend,
      trendIcon,
      clientMessage,
    });
  }

  // ----- Static content -----
  const metrics = [
    {
      icon: "📦",
      title: "Months of Supply",
      text: "Active listings ÷ monthly sales. The clean read on balance.",
    },
    {
      icon: "💰",
      title: "$/SF Trend",
      text: "90-day price per square foot direction beats raw averages.",
    },
    {
      icon: "⏱️",
      title: "Days on Market",
      text: "Speed indicator. Rising = cooling, falling = heating.",
    },
  ];

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-slate-800 to-sky-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 p-8 sm:p-12 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-emerald-400 grid place-items-center text-2xl font-bold">
            📊
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Market Pulse in 5 Minutes
          </h1>
          <div className="inline-block mt-5 px-6 py-2 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Guide
          </div>
          <p className="mt-4 text-sky-200 max-w-xl mx-auto">
            Read your micro-market fast: months of supply, $/SF trends, and DOM
            signals you can share with clients.
          </p>
          <div className="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 font-semibold">
            5 min read
          </div>
        </header>

        {/* Only 3 metrics */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            The Only 3 Metrics That Matter
          </h2>
          <p className="text-sky-100">
            Skip the clutter. Track these to understand any micro-market and
            speak clearly with clients.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {metrics.map((m) => (
              <div
                key={m.title}
                className="text-center rounded-2xl border-2 border-emerald-400/50 bg-emerald-400/15 p-6 hover:-translate-y-1 transition"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-400 text-slate-900 text-2xl font-bold grid place-items-center">
                  {m.icon}
                </div>
                <h4 className="text-emerald-300 text-lg font-semibold mb-1">
                  {m.title}
                </h4>
                <p className="text-sky-100 text-sm">{m.text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-6 mt-6 border-l-4 border-yellow-400 bg-yellow-400/10">
            <div className="text-yellow-300 font-bold mb-2">
              5-Minute Market Pulse Example
            </div>
            <p>
              <strong>Metro area:</strong> Phoenix suburbs, $400–600K price
              range
            </p>
            <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
              <li>
                <strong>Months of Supply:</strong> 2.1 (down from 3.2 last
                month)
              </li>
              <li>
                <strong>$/SF Trend:</strong> $285 avg (up 3% from 90 days ago)
              </li>
              <li>
                <strong>DOM:</strong> 18 days avg (down from 28 last month)
              </li>
            </ul>
            <p className="mt-3">
              <strong>Instant read:</strong> seller’s market strengthening. Low
              inventory, rising prices, faster sales.
            </p>
          </div>
        </section>

        {/* Market conditions */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Decode Market Conditions in Seconds
          </h2>
          <p className="text-sky-100">
            Ranges that classify any market and guide your advice.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="rounded-2xl p-6 border-2 border-orange-500 bg-orange-500/10 text-center hover:-translate-y-1 transition">
              <h3 className="text-orange-400 text-2xl font-semibold">
                🔥 Seller's Market
              </h3>
              <p>
                <strong>Months of Supply:</strong> 0–3
              </p>
              <p>
                <strong>DOM Trend:</strong> Decreasing
              </p>
              <p>
                <strong>$/SF Trend:</strong> Increasing
              </p>
              <div className="mt-4 p-3 rounded-lg bg-orange-500/20">
                <strong>Tell Clients:</strong> Multiple offers likely. Price
                assertively.
              </div>
            </div>

            <div className="rounded-2xl p-6 border-2 border-yellow-400 bg-yellow-400/10 text-center hover:-translate-y-1 transition">
              <h3 className="text-yellow-300 text-2xl font-semibold">
                ⚖️ Balanced Market
              </h3>
              <p>
                <strong>Months of Supply:</strong> 4–6
              </p>
              <p>
                <strong>DOM Trend:</strong> Stable
              </p>
              <p>
                <strong>$/SF Trend:</strong> Stable
              </p>
              <div className="mt-4 p-3 rounded-lg bg-yellow-400/20">
                <strong>Tell Clients:</strong> Normal negotiation. Price at
                market value.
              </div>
            </div>

            <div className="rounded-2xl p-6 border-2 border-emerald-400 bg-emerald-400/10 text-center hover:-translate-y-1 transition">
              <h3 className="text-emerald-300 text-2xl font-semibold">
                ❄️ Buyer's Market
              </h3>
              <p>
                <strong>Months of Supply:</strong> 6+
              </p>
              <p>
                <strong>DOM Trend:</strong> Increasing
              </p>
              <p>
                <strong>$/SF Trend:</strong> Decreasing
              </p>
              <div className="mt-4 p-3 rounded-lg bg-emerald-400/20">
                <strong>Tell Clients:</strong> More leverage. Expect reductions.
              </div>
            </div>
          </div>
        </section>

        {/* Quick reference table */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Quick Reference: Market Signals
          </h2>
          <p className="text-sky-100 mb-6">Keep this for fast reads.</p>

          <div className="rounded-xl overflow-hidden bg-white text-slate-900">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left py-3 px-4">Market Signal</th>
                  <th className="text-left py-3 px-4">Seller's</th>
                  <th className="text-left py-3 px-4">Balanced</th>
                  <th className="text-left py-3 px-4">Buyer's</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(even)]:bg-black/5">
                <tr>
                  <td className="py-3 px-4 font-semibold">Months of Supply</td>
                  <td className="py-3 px-4">0–3</td>
                  <td className="py-3 px-4">4–6</td>
                  <td className="py-3 px-4">6+</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Average DOM</td>
                  <td className="py-3 px-4">0–30 days</td>
                  <td className="py-3 px-4">30–60 days</td>
                  <td className="py-3 px-4">60+ days</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">$/SF Direction</td>
                  <td className="py-3 px-4">Rising 2%+ monthly</td>
                  <td className="py-3 px-4">Stable ±1%</td>
                  <td className="py-3 px-4">Declining 2%+</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">
                    New Listings vs Sales
                  </td>
                  <td className="py-3 px-4">Sales &gt; New Listings</td>
                  <td className="py-3 px-4">Sales = New Listings</td>
                  <td className="py-3 px-4">New Listings &gt; Sales</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Price Reductions</td>
                  <td className="py-3 px-4">&lt;10% of listings</td>
                  <td className="py-3 px-4">10–20% of listings</td>
                  <td className="py-3 px-4">&gt;20% of listings</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Calculator */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Instant Market Pulse Calculator
          </h2>
          <p className="text-sky-100 mb-6">
            Enter your numbers for an instant read.
          </p>

          <div className="rounded-2xl p-6 border-2 border-orange-500 bg-orange-500/10">
            <h3 className="text-2xl font-semibold text-orange-400">
              📊 Calculate Your Market Pulse
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
              <div>
                <label className="block mb-2 font-semibold">
                  Active Listings
                </label>
                <input
                  type="number"
                  placeholder="245"
                  value={active}
                  onChange={(e) => setActive(e.target.value)}
                  className="w-full rounded-lg bg-white/15 text-white placeholder-white/70 px-3 py-2 outline-none"
                />
                <label className="block mt-4 mb-2 font-semibold">
                  Monthly Sales (last 30 days)
                </label>
                <input
                  type="number"
                  placeholder="89"
                  value={sales}
                  onChange={(e) => setSales(e.target.value)}
                  className="w-full rounded-lg bg-white/15 text-white placeholder-white/70 px-3 py-2 outline-none"
                />
                <label className="block mt-4 mb-2 font-semibold">
                  Current Average DOM
                </label>
                <input
                  type="number"
                  placeholder="25"
                  value={domNow}
                  onChange={(e) => setDomNow(e.target.value)}
                  className="w-full rounded-lg bg-white/15 text-white placeholder-white/70 px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  DOM 90 Days Ago
                </label>
                <input
                  type="number"
                  placeholder="35"
                  value={domPrev}
                  onChange={(e) => setDomPrev(e.target.value)}
                  className="w-full rounded-lg bg-white/15 text-white placeholder-white/70 px-3 py-2 outline-none"
                />
                <label className="block mt-4 mb-2 font-semibold">
                  Current $/SF Average
                </label>
                <input
                  type="number"
                  placeholder="285"
                  value={psfNow}
                  onChange={(e) => setPsfNow(e.target.value)}
                  className="w-full rounded-lg bg-white/15 text-white placeholder-white/70 px-3 py-2 outline-none"
                />
                <label className="block mt-4 mb-2 font-semibold">
                  $/SF 90 Days Ago
                </label>
                <input
                  type="number"
                  placeholder="275"
                  value={psfPrev}
                  onChange={(e) => setPsfPrev(e.target.value)}
                  className="w-full rounded-lg bg-white/15 text-white placeholder-white/70 px-3 py-2 outline-none"
                />
              </div>
            </div>

            <button
              onClick={calcPulse}
              className="w-full mt-6 rounded-xl bg-emerald-400 text-slate-900 font-bold py-3 hover:scale-[1.02] transition"
            >
              Get Market Pulse Reading
            </button>

            {result && (
              <div className="mt-5 space-y-3">
                <div className="rounded-lg p-4 bg-emerald-400/20">
                  <div className={`font-semibold ${result.marketTone}`}>
                    {result.icon} {result.marketType}
                  </div>
                  <div className="text-sky-100 mt-1">
                    Months of Supply: <strong>{result.mos.toFixed(2)}</strong> |
                    DOM trend: <strong>{result.domTrend.toFixed(1)}%</strong> |
                    $/SF trend: <strong>{result.psfTrend.toFixed(1)}%</strong>
                  </div>
                  <div className="mt-1">
                    <span
                      className={`inline-block px-2 py-1 rounded ${result.tagBg}`}
                    >
                      {result.trendIcon} {result.trend}
                    </span>
                  </div>
                </div>
                <div className="rounded-lg p-4 bg-yellow-400/20 text-sky-100">
                  {result.clientMessage}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Trend analysis */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Reading Trend Signals
          </h2>
          <p className="text-sky-100">
            Raw numbers show position. Trends show direction. Watch the
            momentum.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="rounded-2xl p-6 bg-white/10">
              <h4 className="text-orange-400 text-xl font-semibold">
                🔥 Heating Up Signals
              </h4>
              <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
                <li>DOM dropping 20%+ month over month</li>
                <li>New listings selling in the first week</li>
                <li>$/SF rising 2%+ over 90 days</li>
                <li>Months of supply under 2.5</li>
                <li>More multiple-offer stories</li>
                <li>Price reductions under 8%</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 bg-white/10">
              <h4 className="text-emerald-300 text-xl font-semibold">
                ❄️ Cooling Down Signals
              </h4>
              <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
                <li>DOM increasing 20%+ month over month</li>
                <li>Active inventory climbing weekly</li>
                <li>$/SF flat or declining over 90 days</li>
                <li>Months of supply above 4.0</li>
                <li>Price reductions above 15%</li>
                <li>New listings sitting without showings</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl p-6 mt-6 border-l-4 border-yellow-400 bg-yellow-400/10">
            <div className="text-yellow-300 font-bold mb-2">
              Trend Shift Example: Catching the Turn
            </div>
            <p>
              <strong>February:</strong> 1.8 MOS, 15 DOM, $295/SF
            </p>
            <p>
              <strong>March:</strong> 2.1 MOS, 18 DOM, $298/SF
            </p>
            <p>
              <strong>April:</strong> 2.7 MOS, 25 DOM, $301/SF
            </p>
            <p className="mt-2">
              <strong>Read:</strong> cooling despite rising prices. DOM up 67%
              in 60 days.
            </p>
            <p>
              <strong>Action:</strong> sellers price firmly now; buyers can wait
              for choice.
            </p>
          </div>
        </section>

        {/* Client scripts */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            What to Tell Clients
          </h2>
          <p className="text-sky-100">
            Direct, useful language you can adapt on the spot.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl p-6 border-2 border-emerald-400 bg-emerald-400/20 italic">
              <div className="font-bold not-italic text-emerald-300 mb-2">
                Seller's Market Script
              </div>
              “We’re in a strong seller’s market with only [X] months of
              inventory and homes selling [X]% faster than 90 days ago. The risk
              isn’t pricing low, it’s pricing past the momentum. Let’s capture
              multiple offers early.”
            </div>

            <div className="rounded-2xl p-6 border-2 border-emerald-400 bg-emerald-400/20 italic">
              <div className="font-bold not-italic text-emerald-300 mb-2">
                Buyer's Market Script
              </div>
              “With [X] months of supply and longer DOM, you have leverage. We
              can take time, compare options, and negotiate terms that fit you.”
            </div>

            <div className="rounded-2xl p-6 border-2 border-emerald-400 bg-emerald-400/20 italic">
              <div className="font-bold not-italic text-emerald-300 mb-2">
                Market Shift Script
              </div>
              “Early shift signals are in. Prices may be stable, but homes are
              taking [X] more days to sell than last month. Sellers should move
              promptly; buyers may see more choice.”
            </div>
          </div>
        </section>

        {/* Data sources */}
        <section className="mb-10 sm:mb-12 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Where to Get Your Data
          </h2>
          <p className="text-sky-100">
            Free and low-cost sources that cover most needs.
          </p>

          <h3 className="text-xl font-semibold text-emerald-300 mt-4">
            Free Sources
          </h3>
          <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
            <li>
              <span className="px-2 py-0.5 rounded bg-yellow-400 text-slate-900 font-semibold">
                Your MLS
              </span>{" "}
              most complete local data, updated daily
            </li>
            <li>
              <span className="px-2 py-0.5 rounded bg-yellow-400 text-slate-900 font-semibold">
                Realtor.com Market Trends
              </span>{" "}
              national and metro-level snapshots
            </li>
            <li>
              <span className="px-2 py-0.5 rounded bg-yellow-400 text-slate-900 font-semibold">
                Zillow Market Reports
              </span>{" "}
              monthly summaries by area
            </li>
            <li>
              <span className="px-2 py-0.5 rounded bg-yellow-400 text-slate-900 font-semibold">
                Local Government
              </span>{" "}
              permits and assessor data
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-emerald-300 mt-5">
            Paid Sources (Worth It)
          </h3>
          <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
            <li>
              <span className="px-2 py-0.5 rounded bg-yellow-400 text-slate-900 font-semibold">
                Altos Research
              </span>{" "}
              weekly updates and micro-market reads
            </li>
            <li>
              <span className="px-2 py-0.5 rounded bg-yellow-400 text-slate-900 font-semibold">
                RealtyTrac
              </span>{" "}
              foreclosure and distressed data
            </li>
            <li>
              <span className="px-2 py-0.5 rounded bg-yellow-400 text-slate-900 font-semibold">
                MarketStats by ShowingTime
              </span>{" "}
              showing activity and buyer interest
            </li>
          </ul>

          <div className="rounded-2xl p-6 mt-6 border-2 border-emerald-400 bg-emerald-400/10">
            <h4 className="text-emerald-300 text-lg font-semibold">
              💡 Pro Tip: The 5-Minute Weekly Routine
            </h4>
            <p className="text-sky-100 mt-2">Every Monday morning:</p>
            <ol className="list-decimal list-inside text-sky-100 mt-2 space-y-1">
              <li>Pull last 7 days of sales from MLS</li>
              <li>Count active listings in your price ranges</li>
              <li>Calculate months of supply for each area</li>
              <li>Note any DOM or $/SF shifts</li>
            </ol>
            <p className="text-sky-100 mt-3">
              Stays sharper than monthly reports alone.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-8 bg-white/10 rounded-2xl border border-white/20">
          <p className="text-sky-200">
            Stacked • Real Estate CRM • Market Intelligence Series
          </p>
        </footer>
      </div>
    </div>
  );
}
