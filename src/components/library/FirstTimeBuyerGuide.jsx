import { useEffect, useMemo, useRef, useState } from "react";

export default function
  FirstTimeBuyerGuide() {
  // ------------------ Constants ------------------
  const PROGRESS_SECTIONS = [
    { id: "step-1", key: "ready", label: "Get Ready" },
    { id: "step-2", key: "preapproval", label: "Pre-Approval" },
    { id: "step-3", key: "hunting", label: "House Hunting" },
    { id: "step-4", key: "offers", label: "Making Offers" },
    { id: "step-5", key: "inspection", label: "Inspections" },
    { id: "step-6", key: "closing", label: "Closing" },
  ];

  const CHECKLISTS = {
    preapproval: [
      "Pay stubs (last 30 days) and W-2s/1099s (last 2 years)",
      "Bank statements (last 60 days)",
      "ID and proof of residence",
      "Employment history and landlord contact (if renting)",
      "Gift letter (if receiving down-payment help)",
    ],
    house: [
      "Roof age and material; HVAC, plumbing, electrical condition",
      "Foundation and drainage; signs of water intrusion",
      "Windows, insulation, and energy efficiency",
      "HOA fees/rules (if any) and property taxes",
      "Neighborhood noise, traffic, and commute time",
    ],
    closing: [
      "Contingencies and timelines agreed",
      "Earnest money delivered on time",
      "Inspection completed and requests negotiated",
      "Appraisal received",
      "Final walk-through scheduled; utilities set to transfer",
    ],
  };

  // ------------------ State ------------------
  const [activeKey, setActiveKey] = useState("ready");

  // checklist states
  const [preApprovalChecks, setPreApprovalChecks] = useState(() =>
    Array(CHECKLISTS.preapproval.length).fill(false)
  );
  const [houseChecks, setHouseChecks] = useState(() =>
    Array(CHECKLISTS.house.length).fill(false)
  );
  const [closingChecks, setClosingChecks] = useState(() =>
    Array(CHECKLISTS.closing.length).fill(false)
  );

  // budget worksheet
  const [budget, setBudget] = useState({
    primaryIncome: "",
    otherIncome: "",
    debts: "",
    utilities: "",
    transportation: "",
    foodInsurance: "",
    savings: "",
    otherExpenses: "",
  });

  const totalIncome = useMemo(() => {
    const { primaryIncome, otherIncome } = budget;
    return Number(primaryIncome || 0) + Number(otherIncome || 0);
  }, [budget]);

  const totalExpenses = useMemo(() => {
    const {
      debts,
      utilities,
      transportation,
      foodInsurance,
      savings,
      otherExpenses,
    } = budget;
    return (
      Number(debts || 0) +
      Number(utilities || 0) +
      Number(transportation || 0) +
      Number(foodInsurance || 0) +
      Number(savings || 0) +
      Number(otherExpenses || 0)
    );
  }, [budget]);

  const targetPayment = useMemo(
    () => Math.round(totalIncome * 0.28) || 0,
    [totalIncome]
  );

  // ------------------ Refs & Observer ------------------
  const sectionRefs = useRef(
    PROGRESS_SECTIONS.reduce((acc, s) => ({ ...acc, [s.id]: null }), {})
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const id = entry.target.getAttribute("id");
            const match = PROGRESS_SECTIONS.find((s) => s.id === id);
            if (match) setActiveKey(match.key);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs.current).forEach(
      (el) => el && observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  // ------------------ Helpers ------------------
  const scrollToId = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    const match = PROGRESS_SECTIONS.find((s) => s.id === id);
    if (match) setActiveKey(match.key);
  };

  const setBudgetField = (k, v) =>
    setBudget((s) => ({ ...s, [k]: v.replace(/[^0-9.-]/g, "") }));

  const Checklist = ({ items, values, onToggle }) => (
    <div className="grid gap-3">
      {items.map((label, idx) => {
        const checked = !!values[idx];
        return (
          <label
            key={idx}
            className={[
              "flex items-start gap-3 rounded-lg p-4 cursor-pointer transition-transform bg-white/10",
              checked
                ? "bg-yellow-300/30 border-l-4 border-yellow-300 translate-x-1"
                : "",
            ].join(" ")}
          >
            <input
              type="checkbox"
              className="mt-1 scale-125 accent-yellow-300"
              checked={checked}
              onChange={(e) => onToggle(idx, e.target.checked)}
            />
            <div className="flex-1 text-sky-50">
              <strong>{label}</strong>
            </div>
          </label>
        );
      })}
    </div>
  );

  const SectionHeader = ({ num, title }) => (
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-800 font-bold grid place-items-center mr-4">
        {num}
      </div>
      <div className="text-emerald-300 text-2xl font-bold">{title}</div>
    </div>
  );

  const NavButtons = ({ prev, next }) => (
    <div className="flex justify-between mt-6">
      <button
        className="bg-emerald-400 text-slate-800 font-bold px-5 py-2 rounded-md shadow transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!prev}
        onClick={() => prev && scrollToId(prev)}
      >
        {prev ? "Previous" : "Previous"}
      </button>
      <button
        className="bg-emerald-400 text-slate-800 font-bold px-5 py-2 rounded-md shadow transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!next}
        onClick={() => next && scrollToId(next)}
      >
        {next ? "Next" : "Next"}
      </button>
    </div>
  );

  // ------------------ UI ------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="text-center mb-12 p-8 sm:p-12 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-orange-500 grid place-items-center text-2xl font-bold">
            🏡
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            First-Time Buyer Guide
          </h1>
          <div className="inline-block mt-5 px-6 py-2 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Guide • Popular
          </div>
          <p className="mt-4 text-sky-200 max-w-3xl mx-auto">
            Comprehensive step-by-step guide for first-time homebuyers covering
            pre-approval, house hunting, making offers, and the closing process.
          </p>
          <div className="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 font-semibold">
            Complete journey
          </div>
        </header>

        {/* Progress Tracker (desktop) */}
        <aside className="hidden md:block fixed top-5 right-5 max-w-xs bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-5 z-50">
          <h4 className="text-emerald-300 text-sm font-semibold mb-3">
            Your Progress
          </h4>
          <div className="space-y-2">
            {PROGRESS_SECTIONS.map((s) => (
              <div key={s.key} className="flex items-center text-sm">
                <span
                  className={[
                    "w-3 h-3 rounded-full mr-2",
                    activeKey === s.key ? "bg-emerald-400" : "bg-white/30",
                  ].join(" ")}
                />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* TOC */}
        <section className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            What's Inside
          </h2>
          <p className="text-sky-100">
            This guide walks you from budgeting and pre-approval to closing day.
            Use the checklists and worksheets to stay organized.
          </p>

          <div className="grid gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "step-1",
                title: "01 - Get Ready: Budget and Credit",
                desc: "Prepare your finances and improve credit",
              },
              {
                id: "step-2",
                title: "02 - Pre-Approval",
                desc: "Get your financing in order",
              },
              {
                id: "step-3",
                title: "03 - House Hunting",
                desc: "Find your perfect home",
              },
              {
                id: "step-4",
                title: "04 - Making Offers",
                desc: "Navigate negotiations successfully",
              },
              {
                id: "step-5",
                title: "05 - Inspections and Appraisal",
                desc: "Protect your investment",
              },
              {
                id: "step-6",
                title: "06 - Underwriting to Close",
                desc: "Finalize your purchase",
              },
              {
                id: "budget-worksheet",
                title: "Budget Worksheet",
                desc: "Calculate your comfortable payment",
              },
              {
                id: "documents",
                title: "Documents You Will See",
                desc: "Know what's coming",
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="text-left bg-white/10 border-2 border-emerald-400 rounded-xl p-5 hover:-translate-y-1 transition"
              >
                <h4 className="text-emerald-300 font-semibold mb-1">
                  {item.title}
                </h4>
                <p className="text-sky-200 text-sm">{item.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Step 1 */}
        <section
          id="step-1"
          ref={(el) => (sectionRefs.current["step-1"] = el)}
          className="mb-8 p-8 rounded-2xl border-2 border-emerald-400 bg-emerald-400/10"
        >
          <SectionHeader num="01" title="Get Ready: Budget and Credit" />
          <p>
            Estimate a comfortable monthly payment (mortgage, taxes, insurance,
            HOA if any). A common target is 25–30% of gross income, but your
            situation may vary.
          </p>
          <p>
            Improve your credit: pay down revolving balances, avoid new credit
            pulls, and correct any errors on your report. A higher score can
            reduce your interest rate.
          </p>
          <p>
            Save for upfront costs: down payment, earnest money, inspections,
            appraisal, and closing costs (often 2–4% of the purchase price).
          </p>

          <div className="rounded-2xl border-2 border-orange-500 bg-orange-500/20 p-5 mt-6">
            <h3 className="text-orange-400 text-2xl font-semibold mb-2">
              💡 Pro Tips for Getting Ready
            </h3>
            <ul className="list-disc ml-6 text-sky-100">
              <li>
                Start saving early — every dollar counts toward your down
                payment
              </li>
              <li>Get a free credit report from annualcreditreport.com</li>
              <li>Consider a first-time homebuyer program in your area</li>
              <li>
                Don't forget to budget for moving costs and immediate repairs
              </li>
            </ul>
          </div>

          <NavButtons prev={null} next="step-2" />
        </section>

        {/* Step 2 */}
        <section
          id="step-2"
          ref={(el) => (sectionRefs.current["step-2"] = el)}
          className="mb-8 p-8 rounded-2xl border-2 border-emerald-400 bg-emerald-400/10"
        >
          <SectionHeader num="02" title="Pre-Approval" />
          <p>
            Choose a lender and get a written pre-approval letter. You will
            share pay stubs, W-2s/1099s, bank statements, and permission to pull
            credit. Pre-approval strengthens your offer and reveals your price
            range.
          </p>
          <p>
            Ask lenders for a Loan Estimate so you can compare rate, APR,
            points, and fees across options. Consider rate locks and how long
            they last.
          </p>

          <div className="rounded-2xl border-2 border-yellow-400 bg-yellow-400/10 p-6 mt-4">
            <h3 className="text-yellow-300 text-2xl font-semibold mb-4">
              📋 Pre-Approval Checklist
            </h3>
            <Checklist
              items={CHECKLISTS.preapproval}
              values={preApprovalChecks}
              onToggle={(i, v) =>
                setPreApprovalChecks((arr) =>
                  arr.map((x, idx) => (idx === i ? v : x))
                )
              }
            />
          </div>

          <NavButtons prev="step-1" next="step-3" />
        </section>

        {/* Step 3 */}
        <section
          id="step-3"
          ref={(el) => (sectionRefs.current["step-3"] = el)}
          className="mb-8 p-8 rounded-2xl border-2 border-emerald-400 bg-emerald-400/10"
        >
          <SectionHeader num="03" title="House Hunting" />
          <p>
            Clarify must-haves vs nice-to-haves. Track commute, schools, and
            neighborhood amenities. Visit at different times of day and review
            seller disclosures.
          </p>
          <p>
            Your agent will set up searches and tours. Keep notes and photos so
            properties do not blur together. Verify HOA rules and fees if
            applicable.
          </p>

          <div className="rounded-2xl border-2 border-yellow-400 bg-yellow-400/10 p-6 mt-4">
            <h3 className="text-yellow-300 text-2xl font-semibold mb-4">
              🏠 House-Hunting Checklist
            </h3>
            <Checklist
              items={CHECKLISTS.house}
              values={houseChecks}
              onToggle={(i, v) =>
                setHouseChecks((arr) =>
                  arr.map((x, idx) => (idx === i ? v : x))
                )
              }
            />
          </div>

          <NavButtons prev="step-2" next="step-4" />
        </section>

        {/* Step 4 */}
        <section
          id="step-4"
          ref={(el) => (sectionRefs.current["step-4"] = el)}
          className="mb-8 p-8 rounded-2xl border-2 border-emerald-400 bg-emerald-400/10"
        >
          <SectionHeader num="04" title="Making Offers" />
          <p>
            Use comparative market data to decide price. Discuss contingencies
            (financing, inspection, appraisal), earnest money, closing timeline,
            and seller concessions.
          </p>
          <p>
            Be responsive during negotiations; deadlines are binding once the
            offer is signed.
          </p>

          <div className="rounded-2xl border-2 border-orange-500 bg-orange-500/20 p-6 mt-4">
            <h3 className="text-orange-400 text-2xl font-semibold mb-2">
              💰 Offer Strategy Tips
            </h3>
            <ul className="list-disc ml-6 text-sky-100">
              <li>Research recent comparable sales in the neighborhood</li>
              <li>Consider market conditions — seller's vs buyer's market</li>
              <li>Don't waive contingencies unless you understand the risks</li>
              <li>Be prepared to act quickly in competitive markets</li>
            </ul>
          </div>

          <NavButtons prev="step-3" next="step-5" />
        </section>

        {/* Step 5 */}
        <section
          id="step-5"
          ref={(el) => (sectionRefs.current["step-5"] = el)}
          className="mb-8 p-8 rounded-2xl border-2 border-emerald-400 bg-emerald-400/10"
        >
          <SectionHeader num="05" title="Inspections and Appraisal" />
          <p>
            Schedule a licensed home inspection quickly. Review the report with
            your agent to decide on repairs or credits. Your lender will order
            an appraisal to confirm value.
          </p>

          <div className="rounded-2xl border-2 border-orange-500 bg-orange-500/20 p-6 mt-4">
            <h3 className="text-orange-400 text-2xl font-semibold mb-2">
              🔍 Inspection Priorities
            </h3>
            <ul className="list-disc ml-6 text-sky-100">
              <li>
                Attend the inspection to ask questions and learn about the home
              </li>
              <li>
                Focus on major systems and safety issues, not cosmetic items
              </li>
              <li>Get quotes for any significant repairs before negotiating</li>
              <li>
                Remember: no house is perfect, prioritize what matters most
              </li>
            </ul>
          </div>

          <NavButtons prev="step-4" next="step-6" />
        </section>

        {/* Step 6 */}
        <section
          id="step-6"
          ref={(el) => (sectionRefs.current["step-6"] = el)}
          className="mb-8 p-8 rounded-2xl border-2 border-emerald-400 bg-emerald-400/10"
        >
          <SectionHeader num="06" title="Underwriting to Close" />
          <p>
            Avoid big financial changes (new debt, job switches) and promptly
            upload any documents the lender requests. You will receive a Closing
            Disclosure at least 3 business days before signing; review it
            carefully.
          </p>
          <p>
            Arrange utilities, final walk-through, and certified funds or wire
            per the title company's instructions.
          </p>

          <div className="rounded-2xl border-2 border-yellow-400 bg-yellow-400/10 p-6 mt-4">
            <h3 className="text-yellow-300 text-2xl font-semibold mb-4">
              🔐 Offer and Closing Checklist
            </h3>
            <Checklist
              items={CHECKLISTS.closing}
              values={closingChecks}
              onToggle={(i, v) =>
                setClosingChecks((arr) =>
                  arr.map((x, idx) => (idx === i ? v : x))
                )
              }
            />
          </div>

          <NavButtons prev="step-5" next="budget-worksheet" />
        </section>

        {/* Budget Worksheet */}
        <section
          id="budget-worksheet"
          className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20"
        >
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Monthly Budget Worksheet
          </h2>
          <p className="text-sky-100">
            Use this interactive worksheet to estimate a comfortable housing
            payment:
          </p>

          <div className="rounded-2xl border-2 border-orange-500 bg-orange-500/20 p-6 mt-4">
            <h3 className="text-orange-400 text-2xl font-semibold">
              💰 Income & Expenses Calculator
            </h3>

            <h4 className="text-emerald-300 font-semibold mt-6 mb-3">Income</h4>
            <div className="grid gap-3">
              <Row
                label="Primary take-home pay"
                value={budget.primaryIncome}
                onChange={(v) => setBudgetField("primaryIncome", v)}
              />
              <Row
                label="Other income"
                value={budget.otherIncome}
                onChange={(v) => setBudgetField("otherIncome", v)}
              />
              <Row
                label="Total monthly income"
                value={String(totalIncome)}
                readOnly
                total
                highlight="emerald"
              />
            </div>

            <h4 className="text-orange-400 font-semibold mt-6 mb-3">
              Expenses
            </h4>
            <div className="grid gap-3">
              <Row
                label="Current debts (loans, cards)"
                value={budget.debts}
                onChange={(v) => setBudgetField("debts", v)}
              />
              <Row
                label="Utilities (avg.)"
                value={budget.utilities}
                onChange={(v) => setBudgetField("utilities", v)}
              />
              <Row
                label="Transportation"
                value={budget.transportation}
                onChange={(v) => setBudgetField("transportation", v)}
              />
              <Row
                label="Food and insurance"
                value={budget.foodInsurance}
                onChange={(v) => setBudgetField("foodInsurance", v)}
              />
              <Row
                label="Savings/investments"
                value={budget.savings}
                onChange={(v) => setBudgetField("savings", v)}
              />
              <Row
                label="Other recurring expenses"
                value={budget.otherExpenses}
                onChange={(v) => setBudgetField("otherExpenses", v)}
              />
              <Row
                label="Total monthly expenses"
                value={String(totalExpenses)}
                readOnly
                total
                highlight="emerald"
              />
            </div>

            <h4 className="text-yellow-300 font-semibold mt-6 mb-3">
              Recommended Housing Payment
            </h4>
            <Row
              label="Target housing payment (≈28% income, or your comfort number)"
              value={String(targetPayment)}
              readOnly
              total
              highlight="yellow"
            />
          </div>
        </section>

        {/* Documents */}
        <section
          id="documents"
          className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20"
        >
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Documents You Will See
          </h2>
          <p className="text-sky-100">
            Familiarize yourself with these important documents you'll encounter
            during the home buying process:
          </p>

          <div className="mt-4 p-5 rounded-lg bg-black/30 text-sky-200 italic">
            Pre-Approval Letter • Purchase Agreement • Seller Disclosures •
            Inspection Report • Appraisal • Loan Estimate • Closing Disclosure •
            Deed and Note
          </div>

          <div className="rounded-2xl border-2 border-orange-500 bg-orange-500/20 p-6 mt-4">
            <h3 className="text-orange-400 text-2xl font-semibold mb-2">
              📄 Document Tips
            </h3>
            <ul className="list-disc ml-6 text-sky-100">
              <li>Keep digital and physical copies of all documents</li>
              <li>Read everything carefully — don't just sign</li>
              <li>Ask questions if you don't understand something</li>
              <li>Your agent and lender are there to explain documents</li>
            </ul>
          </div>
        </section>

        {/* Final Success */}
        <section className="mb-10">
          <div className="text-center font-bold text-lg rounded-2xl p-8 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900">
            🎉 Congratulations on Taking the First Step! 🎉
            <div className="text-slate-900/80 font-medium mt-2">
              You're now equipped to navigate your home buying journey. Work
              with experienced professionals and trust the process!
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-8 bg-white/10 rounded-2xl border border-white/20">
          <p className="text-sky-200">
            Stacked • Real Estate CRM • Transaction Mastery Series
          </p>
        </footer>
      </div>

      {/* Small responsive tweak similar to original */}
      <style>{`
        @media (max-width: 900px) {
          aside { display: none; }
        }
      `}</style>
    </div>
  );
}

/* ---------- Small UI subcomponent for budget rows ---------- */
function Row({
  label,
  value,
  onChange,
  readOnly = false,
  total = false,
  highlight,
}) {
  const border =
    total && highlight === "emerald"
      ? "border-emerald-400 bg-emerald-400/20"
      : total && highlight === "yellow"
        ? "border-yellow-300 bg-yellow-300/20"
        : "border-white/20 bg-white/10";

  const labelColor =
    total && highlight === "yellow"
      ? "text-yellow-300"
      : total && highlight === "emerald"
        ? "text-emerald-300"
        : "text-sky-50";

  return (
    <div
      className={`grid md:grid-cols-[2fr,1fr] grid-cols-1 gap-3 items-center rounded-lg p-3 border ${border}`}
    >
      <div className={`font-medium ${labelColor}`}>{label}</div>
      <input
        type="number"
        inputMode="decimal"
        className={[
          "w-full rounded-md border px-3 py-2 text-right text-white placeholder-white/60",
          readOnly
            ? "bg-white/20 border-white/30 font-bold"
            : "bg-white/10 border-white/30",
        ].join(" ")}
        placeholder="$0"
        value={value}
        onChange={(e) => !readOnly && onChange && onChange(e.target.value)}
        readOnly={readOnly}
      />
    </div>
  );
}
