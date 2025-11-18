import { useEffect, useMemo, useState } from "react";

export default function PreApprovalPowerUp() {
  // ---- Calculator state ----
  const [monthlyPayment, setMonthlyPayment] = useState("2500");
  const [interestRate, setInterestRate] = useState("6.5");
  const [downPct, setDownPct] = useState("20");
  const [taxRate, setTaxRate] = useState("1.0"); // % of value per year
  const [results, setResults] = useState(null); // calc output object

  // Quick helpers
  const n = (v) => Number(v || 0);
  const currency = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(v);

  // Rough auto-estimate of monthly tax+ins based on payment and location (used for the read-only hint field)
  const estMonthlyTaxInsPreview = useMemo(() => {
    const pay = Math.max(n(monthlyPayment), 1);
    const estPrice = pay * 200; // rough starting guess
    const annualTax = (estPrice * n(taxRate)) / 100;
    const annualIns = estPrice * 0.004; // 0.4% insurance
    return Math.round((annualTax + annualIns) / 12);
  }, [monthlyPayment, taxRate]);

  // Core amortization helper: payment -> max loan amount
  const maxLoanForPI = (monthlyPI, ratePercent, years = 30) => {
    const i = n(ratePercent) / 100 / 12;
    const nper = years * 12;
    if (i <= 0) return monthlyPI * nper; // edge-case
    return (monthlyPI * (1 - Math.pow(1 + i, -nper))) / i;
  };

  // Iterate to solve for price that fits payment after taxes+insurance
  const calculate = () => {
    const P = n(monthlyPayment);
    const r = n(interestRate);
    const dp = n(downPct) / 100;
    const tr = n(taxRate) / 100;

    if (!P || !r || !dp) {
      alert("Please fill in monthly payment, interest rate, and down payment.");
      return;
    }

    let price = P * 200; // initial guess
    let finalPrice = 0;

    for (let k = 0; k < 12; k++) {
      const annualTax = price * tr;
      const annualIns = price * 0.004;
      const mtaxins = (annualTax + annualIns) / 12;
      const availPI = P - mtaxins;
      if (availPI <= 0) {
        alert(
          "Monthly payment is too low for estimated taxes/insurance at this location."
        );
        return;
      }
      const loan = maxLoanForPI(availPI, r, 30);
      const newPrice = loan / (1 - dp);
      if (Math.abs(newPrice - price) < 100) {
        finalPrice = newPrice;
        break;
      }
      price = newPrice;
      finalPrice = newPrice;
    }

    // Final monthly TI & PI
    const finalAnnualTax = finalPrice * tr;
    const finalAnnualIns = finalPrice * 0.004;
    const finalTI = (finalAnnualTax + finalAnnualIns) / 12;
    const finalPI = P - finalTI;
    const finalLoan = maxLoanForPI(finalPI, r, 30);

    // Rate sensitivity (+/- 0.5%)
    const lower = r - 0.5;
    const higher = r + 0.5;
    const loanLower = maxLoanForPI(finalPI, lower, 30);
    const loanHigher = maxLoanForPI(finalPI, higher, 30);
    const priceLower = loanLower / (1 - dp);
    const priceHigher = loanHigher / (1 - dp);

    setResults({
      price: finalPrice,
      loan: finalLoan,
      down: finalPrice * dp,
      mtaxins: finalTI,
      mpi: finalPI,
      total: P,
      lowerRate: lower,
      higherRate: higher,
      priceAtLower: priceLower,
      priceAtHigher: priceHigher,
    });
  };

  useEffect(() => {
    // Clear results when inputs change meaningfully
    setResults(null);
  }, [monthlyPayment, interestRate, downPct, taxRate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 p-8 sm:p-12 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-emerald-400 grid place-items-center text-2xl font-bold">
            ✅
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Pre-Approval Power-Up
          </h1>
          <div className="inline-block mt-5 px-6 py-2 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Guide
          </div>
          <p className="mt-4 text-sky-200 max-w-xl mx-auto">
            Payment-anchored approvals, buydowns vs price drops, and what to
            request from lenders before you write.
          </p>
          <div className="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 font-semibold">
            7 min read
          </div>
        </header>

        {/* Intro */}
        <section className="mb-10 sm:mb-12 p-8 bg-white/10 rounded-2xl border border-white/20 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Turn Pre-Approvals Into Winning Weapons
          </h2>
          <p className="text-sky-100">
            It’s not about getting pre-approved—it’s how you structure it. The
            right approach wins offers while keeping buyer cash protected.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              {
                icon: "💪",
                title: "Payment Anchoring",
                text: "Approve to a payment, not a loan amount.",
              },
              {
                icon: "📉",
                title: "Rate Strategy",
                text: "When buydowns beat price drops.",
              },
              {
                icon: "📋",
                title: "Lender Intel",
                text: "5 asks before writing an offer.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="text-center rounded-2xl border-2 border-emerald-400/50 bg-emerald-400/15 p-6 hover:-translate-y-1 transition"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-400 text-slate-900 text-2xl font-bold grid place-items-center">
                  {c.icon}
                </div>
                <h4 className="text-emerald-300 text-lg font-semibold mb-1">
                  {c.title}
                </h4>
                <p className="text-sky-100 text-sm">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Anchoring */}
        <section className="mb-10 sm:mb-12 p-8 bg-white/10 rounded-2xl border border-white/20 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Payment-Anchored Approvals: The Game Changer
          </h2>
          <p className="text-sky-100">
            Approve buyers for a{" "}
            <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
              monthly payment
            </span>{" "}
            they’re comfortable with, then work backwards to max price. When
            rates change, they stay in the game.
          </p>

          <div className="rounded-2xl p-6 mt-4 border-l-4 border-yellow-400 bg-yellow-400/10">
            <div className="text-yellow-300 font-bold mb-2">
              Real Example: The Rate Drop Advantage
            </div>
            <p>
              Pre-approved at $2,695/month. At 7.2% they shop ~$400K; at 6.1%
              the same payment supports ~$438K—+$38K buying power.
            </p>
          </div>

          <div className="rounded-2xl p-5 mt-6 border-2 border-emerald-400 bg-emerald-400/20">
            <div className="font-bold text-emerald-300 mb-2">
              Payment-Anchored Approval Language
            </div>
            <p className="text-sky-100">
              “Buyer is pre-approved for monthly housing payments up to $2,800
              (PITI+HOA), supporting purchase prices up to $485,000 at current
              rates. Funds for down payment and closing verified; capacity
              increases if rates improve.”
            </p>
          </div>

          {/* Calculator */}
          <div className="rounded-2xl p-6 mt-8 border-2 border-orange-500 bg-orange-500/10">
            <h3 className="text-2xl font-semibold text-orange-400">
              🧮 Payment-to-Price Calculator
            </h3>
            <p className="text-sky-100 mt-1">
              Find the max home price based on a comfortable total monthly
              payment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
              <div>
                <label className="block mb-2 font-semibold">
                  Monthly Payment Budget
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg bg-white/15 text-white placeholder-white/70 px-3 py-2 outline-none"
                  placeholder="2500"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                />
                <label className="block mt-4 mb-2 font-semibold">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full rounded-lg bg-white/15 text-white placeholder-white/70 px-3 py-2 outline-none"
                  placeholder="6.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
                <label className="block mt-4 mb-2 font-semibold">
                  Down Payment (%)
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg bg-white/15 text-white placeholder-white/70 px-3 py-2 outline-none"
                  placeholder="20"
                  value={downPct}
                  onChange={(e) => setDownPct(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  State/Location (Property Tax %)
                </label>
                <select
                  className="w-full h-12 rounded-lg bg-white/15 text-white px-3 py-2 outline-none"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                >
                  <option value="1.0">National Average (1.0%)</option>
                  <option value="0.6">Hawaii (0.6%)</option>
                  <option value="0.7">Alabama (0.7%)</option>
                  <option value="0.8">Nevada, Utah (0.8%)</option>
                  <option value="0.9">Arizona, California (0.9%)</option>
                  <option value="1.1">Florida, North Carolina (1.1%)</option>
                  <option value="1.2">Georgia, Virginia (1.2%)</option>
                  <option value="1.3">Ohio, Michigan (1.3%)</option>
                  <option value="1.4">Pennsylvania, Wisconsin (1.4%)</option>
                  <option value="1.5">Minnesota, Iowa (1.5%)</option>
                  <option value="1.6">Kansas, Nebraska (1.6%)</option>
                  <option value="2.0">Texas, Illinois (2.0%)</option>
                  <option value="2.2">New Jersey (2.2%)</option>
                </select>

                <label className="block mt-4 mb-2 font-semibold">
                  Estimated Tax + Insurance (auto)
                </label>
                <input
                  type="number"
                  readOnly
                  value={estMonthlyTaxInsPreview}
                  className="w-full rounded-lg bg-white/5 text-white px-3 py-2 outline-none"
                />
                <div className="text-sky-300/80 text-sm mt-2">
                  💡 Estimated from payment & location—final calc refines it.
                </div>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full mt-6 rounded-xl bg-emerald-400 text-slate-900 font-bold py-3 hover:scale-[1.02] transition"
            >
              Calculate Maximum Home Price
            </button>

            {results && (
              <div className="mt-5 space-y-3">
                <div className="rounded-lg p-4 bg-emerald-400/20">
                  <div className="font-semibold">
                    💡 Maximum Home Price: {currency(results.price)}
                  </div>
                  <div className="text-sky-100 text-sm mt-1">
                    Loan: {currency(results.loan)} · Down:{" "}
                    {currency(results.down)}
                  </div>
                  <div className="text-sky-100 text-sm">
                    Monthly P&I: {currency(results.mpi)} · Taxes/Ins:{" "}
                    {currency(results.mtaxins)} · Total:{" "}
                    {currency(results.total)}
                  </div>
                </div>
                <div className="rounded-lg p-4 bg-yellow-400/20 text-sky-100">
                  <div className="font-semibold">📊 Rate Sensitivity</div>
                  <div className="text-sm mt-1">
                    • At {results.lowerRate.toFixed(1)}%:{" "}
                    {currency(results.priceAtLower)} (
                    {currency(results.priceAtLower - results.price)} more buying
                    power)
                    <br />• At {results.higherRate.toFixed(1)}%:{" "}
                    {currency(results.priceAtHigher)} (
                    {currency(results.price - results.priceAtHigher)} less
                    buying power)
                    <br />
                    <span className="font-semibold">Strategy:</span>{" "}
                    Payment-anchored approvals capture improvements
                    automatically.
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Buydowns vs Price Drops */}
        <section className="mb-10 sm:mb-12 p-8 bg-white/10 rounded-2xl border border-white/20 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Buydowns vs. Price Drops: The Strategic Choice
          </h2>
          <p className="text-sky-100">
            Pick the option that fits ownership timeline, rate environment, and
            appraisal risk.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 rounded-2xl border-2 border-emerald-400 bg-emerald-400/10">
              <h3 className="text-emerald-300 text-2xl font-semibold">
                🎯 Choose Rate Buydowns When:
              </h3>
              <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
                <li>Plan to stay 7+ years</li>
                <li>Rates &gt; 6.5%</li>
                <li>Payment-sensitive or qualifying tight</li>
                <li>Seller wants higher price optics</li>
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-emerald-400/20">
                <strong>Pro Tip:</strong> Permanent buydowns usually beat 2-1
                temporaries over time.
              </div>
            </div>

            <div className="p-6 rounded-2xl border-2 border-yellow-400 bg-yellow-400/10">
              <h3 className="text-yellow-300 text-2xl font-semibold">
                💰 Choose Price Drops When:
              </h3>
              <ul className="list-disc list-inside text-sky-100 mt-2 space-y-1">
                <li>Likely to move within ~5 years</li>
                <li>Rates &lt; 5.5%</li>
                <li>Want maximum equity / lower taxes</li>
                <li>Appraisal concerns or declining market</li>
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-yellow-400/20">
                <strong>Pro Tip:</strong> Lower price = immediate equity + lower
                property tax basis.
              </div>
            </div>
          </div>

          {/* Simple comparison table */}
          <div className="rounded-xl overflow-hidden bg-white text-slate-900 mt-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left py-3 px-4">Strategy</th>
                  <th className="text-left py-3 px-4">Home Price</th>
                  <th className="text-left py-3 px-4">Monthly Payment</th>
                  <th className="text-left py-3 px-4">5-Year Total</th>
                  <th className="text-left py-3 px-4">10-Year Total</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(even)]:bg-black/5">
                <tr>
                  <td className="py-3 px-4">
                    <strong>Baseline</strong>
                    <br />
                    $500K @ 6.5%
                  </td>
                  <td className="py-3 px-4">$500,000</td>
                  <td className="py-3 px-4">$2,528</td>
                  <td className="py-3 px-4">$151,680</td>
                  <td className="py-3 px-4">$303,360</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <strong>Price Drop</strong>
                    <br />
                    $480K @ 6.5%
                  </td>
                  <td className="py-3 px-4">$480,000</td>
                  <td className="py-3 px-4">$2,427</td>
                  <td className="py-3 px-4">$145,620</td>
                  <td className="py-3 px-4">$291,240</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <strong>Rate Buydown</strong>
                    <br />
                    $500K @ 5.5%
                  </td>
                  <td className="py-3 px-4">$500,000</td>
                  <td className="py-3 px-4">$2,271</td>
                  <td className="py-3 px-4">$136,260</td>
                  <td className="py-3 px-4">$272,520</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sky-100 mt-4">
            <strong>The takeaway:</strong> Buydowns tend to win for long-term
            owners; price drops favor shorter horizons or appraisal risk.
          </p>
        </section>

        {/* Lender Intel */}
        <section className="mb-10 sm:mb-12 p-8 bg-white/10 rounded-2xl border border-white/20 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            The 5 Things to Request From Every Lender
          </h2>
          <div className="rounded-2xl p-6 bg-white/5">
            {[
              [
                "1",
                "Rate Lock Timeline & Costs",
                "“What’s your lock period? Cost to extend? Can we lock at application or only after contract?”",
              ],
              [
                "2",
                "Underwriting Timeline Guarantee",
                "“Full UW approval within X days post-contract? What docs do you need upfront?”",
              ],
              [
                "3",
                "Appraisal Waiver Potential",
                "“Likelihood of waiver? What LTVs maximize our chances?”",
              ],
              [
                "4",
                "Credit Score Buffer Analysis",
                "“What’s the minimum score for this rate? How much room before next tier?”",
              ],
              [
                "5",
                "Asset Verification Options",
                "“Can we use bank statements vs full docs to speed approval?”",
              ],
            ].map(([num, title, q]) => (
              <div
                key={num}
                className="flex items-start gap-3 p-3 bg-white/10 rounded-lg mb-3"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-400 text-slate-900 font-bold grid place-items-center">
                  {num}
                </div>
                <div>
                  <strong>{title}</strong>
                  <div className="text-sky-300 text-sm">{q}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-6 mt-6 border-2 border-orange-500 bg-orange-500/20">
            <div className="text-orange-400 font-bold mb-2">🚨 Red Flags</div>
            <ul className="list-disc list-inside text-sky-100 space-y-1">
              <li>No timeline commitments</li>
              <li>Vague on locks / appraisal waivers</li>
              <li>No AUS approval yet</li>
              <li>Reluctant to speak to listing agents</li>
            </ul>
          </div>
        </section>

        {/* Advanced Strategies (brief) */}
        <section className="mb-10 sm:mb-12 p-8 bg-white/10 rounded-2xl border border-white/20 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Advanced Pre-Approval Strategies
          </h2>
          <div className="rounded-2xl p-6 border-l-4 border-yellow-400 bg-yellow-400/10">
            <div className="text-yellow-300 font-bold mb-2">
              Dual-Track Example
            </div>
            <p>
              <strong>Lender A:</strong> Conv 20% down—fastest close for
              competitiveness.
              <br />
              <strong>Lender B:</strong> Conv 10% down—preserves cash to stretch
              price.
              <br />
              <strong>Play:</strong> Lead with A for strength, pivot to B if
              price flexibility is needed.
            </p>
          </div>

          <div className="rounded-2xl p-5 mt-6 border-2 border-emerald-400 bg-emerald-400/20">
            <div className="font-bold text-emerald-300 mb-2">
              Asset Strength Language
            </div>
            <p className="text-sky-100">
              “Buyer has verified liquid assets of $125,000 (savings +
              investments) covering down, costs, and reserves, with capacity for
              competitive terms.”
            </p>
          </div>

          <ul className="list-disc list-inside text-sky-100 mt-6 space-y-1">
            <li>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                W-2:
              </span>{" "}
              VOE within 10 days of closing
            </li>
            <li>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                Self-employed:
              </span>{" "}
              CPA letter on stability
            </li>
            <li>
              <span className="px-2 rounded bg-yellow-400 text-slate-900 font-semibold">
                Commission:
              </span>{" "}
              3-yr average documentation
            </li>
          </ul>
        </section>

        {/* Market-Specific */}
        <section className="mb-10 sm:mb-12 p-8 bg-white/10 rounded-2xl border border-white/20 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Tailoring Approvals to Market Conditions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-xl p-5 bg-orange-500/10">
              <h4 className="text-orange-400 text-xl font-semibold mb-2">
                🔥 Hot Market
              </h4>
              <ul className="list-disc list-inside text-sky-100 space-y-1">
                <li>AUS approval in hand</li>
                <li>Assets verified</li>
                <li>Lock-ready at contract</li>
                <li>Lender reference letter</li>
                <li>Direct UW contact</li>
              </ul>
            </div>
            <div className="rounded-xl p-5 bg-yellow-400/10 border-yellow-400/50">
              <h4 className="text-yellow-300 text-xl font-semibold mb-2">
                ⚖️ Balanced
              </h4>
              <ul className="list-disc list-inside text-sky-100 space-y-1">
                <li>Multiple program options</li>
                <li>Flexible down structures</li>
                <li>Pre-built buydown scenarios</li>
                <li>Clear payment↔price mapping</li>
              </ul>
            </div>
            <div className="rounded-xl p-5 bg-emerald-400/10">
              <h4 className="text-emerald-300 text-xl font-semibold mb-2">
                ❄️ Buyer’s Market
              </h4>
              <ul className="list-disc list-inside text-sky-100 space-y-1">
                <li>Longer locks (90+ days)</li>
                <li>Float-down options</li>
                <li>Maximize seller credits</li>
                <li>Alt programs for unique homes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-10 sm:mb-12 p-8 bg-white/10 rounded-2xl border border-white/20 backdrop-blur">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Quick Reference: Pre-Approval Power-Up Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="rounded-2xl p-6 border-2 border-emerald-400 bg-emerald-400/10">
              <h4 className="text-emerald-300 text-xl font-semibold mb-2">
                ✅ Must-Have Docs
              </h4>
              <ul className="list-disc list-inside text-sky-100 space-y-1">
                <li>AUS approval (not pre-qual)</li>
                <li>Payment-anchored letter</li>
                <li>Asset verification statement</li>
                <li>Rate lock timeline guarantee</li>
                <li>Lender reference contact</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 border-2 border-yellow-400 bg-yellow-400/10">
              <h4 className="text-yellow-300 text-xl font-semibold mb-2">
                🎯 Strategic Questions
              </h4>
              <ul className="list-disc list-inside text-sky-100 space-y-1">
                <li>Max comfortable payment?</li>
                <li>Expected ownership length?</li>
                <li>Prefer lower price or lower rate?</li>
                <li>Speed vs rate importance?</li>
                <li>Plan if rates rise?</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl p-5 mt-6 border-2 border-emerald-400 bg-emerald-400/20">
            <div className="font-bold text-emerald-300 mb-2">
              Power-Up Pre-Approval Template
            </div>
            <p className="text-sky-100">
              “[Buyer Name] is pre-approved for monthly housing payments up to
              $[X], supporting prices up to $[Y] at current rates. [Z]% down
              verified with reserves. AUS acceptance included. Close in
              [timeline] days. Lender: [Name/Phone].”
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-8 bg-white/10 rounded-2xl border border-white/20">
          <p className="text-sky-200">
            Stacked • Real Estate CRM • Buyer Success Series
          </p>
        </footer>
      </div>
    </div>
  );
}
