import { useState } from "react";

export default function MarketAnalysisGuide() {
  // ---------------- State ----------------
  const [steps, setSteps] = useState([false, false, false, false, false]);
  const [property, setProperty] = useState({
    address: "",
    beds: "",
    baths: "",
    sf: "",
    lot: "",
    year: "",
    parking: "",
    condition: "",
  });

  const [comps, setComps] = useState([
    { address: "", sf: "", price: "", psf: "", adj: "" },
    { address: "", sf: "", price: "", psf: "", adj: "" },
    { address: "", sf: "", price: "", psf: "", adj: "" },
  ]);

  const [values, setValues] = useState({ low: "", mid: "", high: "", rec: 0 });
  const [extras, setExtras] = useState({ dom: "", strategy: "" });

  // ---------------- Handlers ----------------
  const toggleStep = (i) => {
    setSteps((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const handlePropChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleCompChange = (i, field, value) => {
    const newComps = [...comps];
    newComps[i][field] = value;

    if (field === "price" || field === "sf") {
      const sf = parseFloat(newComps[i].sf) || 0;
      const price = parseFloat(newComps[i].price) || 0;
      if (sf > 0 && price > 0) {
        newComps[i].psf = Math.round(price / sf);
      }
    }
    setComps(newComps);
  };

  const handleValueChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const calculateRecommendation = () => {
    const mid = parseFloat(values.mid) || 0;
    if (mid > 0) setValues({ ...values, rec: mid });
  };

  // ---------------- Components ----------------
  const Step = ({ num, text, idx }) => (
    <div
      className={`grid items-center gap-4 md:grid-cols-[40px_auto_1fr_auto] grid-cols-[40px_1fr_auto] p-4 rounded-xl transition ${
        steps[idx]
          ? "bg-emerald-400/30 border-l-4 border-emerald-400 translate-x-1"
          : "bg-white/10 hover:bg-white/20"
      }`}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-400 text-slate-900 font-bold">
        {num}
      </div>
      <input
        type="checkbox"
        checked={steps[idx]}
        onChange={() => toggleStep(idx)}
        className="scale-125 accent-emerald-400"
      />
      <div className="text-sky-100 text-sm md:text-base">{text}</div>
      <div
        className={`font-bold text-emerald-400 ${
          steps[idx] ? "opacity-100" : "opacity-0"
        }`}
      >
        ✓ Done
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-12 p-10 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-orange-500 grid place-items-center text-2xl font-bold">
            📊
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Market Analysis Guide
          </h1>
          <div className="inline-block px-6 py-2 mb-4 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Guide
          </div>
          <p className="text-sky-200 max-w-2xl mx-auto">
            Super-simple CMA toolkit for busy agents. Follow the 5 steps, pick
            the right comps, and fill the one-page price sheet.
          </p>
          <div className="inline-block mt-4 px-6 py-2 rounded-full bg-white/10 font-semibold">
            5-step process
          </div>
        </div>

        {/* CMA Quickstart */}
        <Section title="CMA Quickstart — 5 Steps">
          <p>
            Follow these steps to create a professional comparative market
            analysis:
          </p>
          <div className="mt-6 p-6 rounded-xl border-2 border-emerald-400 bg-emerald-400/20 space-y-4">
            <h3 className="text-emerald-400 text-xl font-semibold">
              ✅ Step-by-Step Process
            </h3>
            <Step
              num="1"
              idx={0}
              text={
                <span>
                  <strong>Collect subject basics:</strong> beds, baths, SF, lot,
                  year, parking, condition, updates, HOA, school zone.
                </span>
              }
            />
            <Step
              num="2"
              idx={1}
              text={
                <span>
                  <strong>Define your market:</strong> subdivision/school zone
                  or radius when homes are similar.
                </span>
              }
            />
            <Step
              num="3"
              idx={2}
              text={
                <span>
                  <strong>Pull comps:</strong> 3–6 CLOSED in 90–180 days ±20%
                  SF; add 2–4 actives.
                </span>
              }
            />
            <Step
              num="4"
              idx={3}
              text={
                <span>
                  <strong>Adjust:</strong> SF, beds/baths, garage, basement,
                  lot, condition, time.
                </span>
              }
            />
            <Step
              num="5"
              idx={4}
              text={
                <span>
                  <strong>Price:</strong> give a RANGE and one recommended LIST
                  price; set DOM and review weekly.
                </span>
              }
            />
          </div>
        </Section>

        {/* Subject Property */}
        <Section title="Subject Property Details">
          <p>Enter the basic information for the property you're analyzing:</p>
          <FormGrid property={property} onChange={handlePropChange} />
        </Section>

        {/* Comparable Sales */}
        <Section title="Top 3 Comparable Sales">
          <p>Enter your best comparable sales and make adjustments:</p>
          <CompsTable comps={comps} onChange={handleCompChange} />
        </Section>

        {/* Value Range */}
        <Section title="Indicated Value Range">
          <p>Calculate your value range and recommended list price:</p>
          <ValueRange
            values={values}
            onChange={handleValueChange}
            onCalc={calculateRecommendation}
            extras={extras}
            setExtras={setExtras}
          />
        </Section>

        {/* Tips */}
        <Section title="Pick the Right Comps">
          <TipBox
            title="🎯 Comparable Selection Criteria"
            items={[
              "Same micro-location buyers consider equal",
              "Within ±20% living SF; similar lot utility and age",
              "Closed in 90–180 days (stretch only if thin)",
              "Avoid oddballs: distress sales, busy streets",
            ]}
          />
          <TipBox
            title="📊 Data to Pull"
            items={[
              "Top 3 best comps (address, SF, price, $/SF)",
              "2–4 active/pending competitors",
              "Trend: last 6 months median $/SF change (%)",
            ]}
          />
        </Section>

        {/* Client Sheet */}
        <Section title="Client Price Sheet (Leave-Behind)">
          <p>Professional summary sheet for your clients:</p>
          <ClientSheet
            property={property}
            comps={comps}
            values={values}
            extras={extras}
          />
        </Section>

        {/* Footer */}
        <footer className="text-center p-6 bg-white/10 rounded-2xl border border-white/20 mt-12">
          <p className="text-sky-200">
            Stacked • Real Estate CRM • Transaction Mastery Series
          </p>
        </footer>
      </div>
    </div>
  );
}

// ---------- Reusable Components ----------
function Section({ title, children }) {
  return (
    <section className="mb-10 p-8 bg-white/10 border border-white/20 rounded-2xl">
      <h2 className="text-3xl font-bold text-emerald-300 mb-4">{title}</h2>
      {children}
    </section>
  );
}

function FormGrid({ property, onChange }) {
  const fields = [
    ["address", "Address", "text"],
    ["beds", "Beds", "number"],
    ["baths", "Baths", "number"],
    ["sf", "Living Area (SF)", "number"],
    ["lot", "Lot Size", "text"],
    ["year", "Year Built", "number"],
    ["parking", "Parking", "text"],
    ["condition", "Condition/Updates", "text"],
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-6 mt-6">
      {fields.map(([key, label, type]) => (
        <div key={key} className="flex flex-col">
          <label className="text-orange-400 font-bold mb-2">{label}</label>
          <input
            type={type}
            name={key}
            value={property[key]}
            onChange={onChange}
            className="bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white"
            placeholder={label}
          />
        </div>
      ))}
    </div>
  );
}

function CompsTable({ comps, onChange }) {
  return (
    <div className="overflow-x-auto mt-6 border-2 border-yellow-400 bg-yellow-400/10 rounded-xl p-6">
      <h3 className="text-yellow-400 font-semibold text-xl mb-4">
        📈 Comparable Properties
      </h3>
      <div className="min-w-[700px] space-y-3">
        <div className="grid grid-cols-5 gap-4 font-bold text-yellow-400">
          <div>Address</div>
          <div>SF</div>
          <div>Sold Price</div>
          <div>$/SF</div>
          <div>Adj (+/-)</div>
        </div>
        {comps.map((c, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 bg-white/10 p-3 rounded-lg"
          >
            {["address", "sf", "price", "psf", "adj"].map((f, j) => (
              <input
                key={j}
                type={f === "address" ? "text" : "number"}
                value={c[f]}
                onChange={(e) => onChange(i, f, e.target.value)}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                placeholder={f.toUpperCase()}
                readOnly={f === "psf"}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ValueRange({ values, onChange, onCalc, extras, setExtras }) {
  return (
    <div className="p-6 rounded-xl border-2 border-emerald-400 bg-emerald-400/20 mt-6">
      <h3 className="text-emerald-400 font-semibold text-xl">
        💰 Value Analysis
      </h3>
      <div className="grid sm:grid-cols-3 gap-4 mt-4">
        {["low", "mid", "high"].map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-emerald-400 font-bold mb-1 capitalize">
              {key} Value
            </label>
            <input
              type="number"
              name={key}
              value={values[key]}
              onChange={onChange}
              className="bg-white/20 border-2 border-emerald-400 rounded-lg px-3 py-2 text-white font-bold text-center"
              placeholder="$"
            />
          </div>
        ))}
      </div>
      <button
        onClick={onCalc}
        className="bg-yellow-400 text-slate-900 font-bold rounded-lg px-6 py-2 mt-6 hover:shadow-lg"
      >
        Calculate Recommendation
      </button>
      <div className="mt-6 p-6 border-2 border-yellow-400 bg-yellow-400/20 rounded-xl text-center">
        <h4 className="text-yellow-400 font-semibold mb-2">
          Recommended List Price
        </h4>
        <div className="text-3xl font-bold text-yellow-300">
          {values.rec > 0 ? `$${values.rec.toLocaleString()}` : "—"}
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col">
            <label className="text-slate-900 font-bold">Expected DOM</label>
            <input
              type="number"
              value={extras.dom}
              onChange={(e) => setExtras({ ...extras, dom: e.target.value })}
              className="bg-black/10 border rounded px-3 py-2 text-slate-900"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-slate-900 font-bold">Strategy</label>
            <select
              value={extras.strategy}
              onChange={(e) =>
                setExtras({ ...extras, strategy: e.target.value })
              }
              className="bg-black/10 border rounded px-3 py-2 text-slate-900"
            >
              <option value="">Select strategy</option>
              <option value="aggressive">Aggressive pricing</option>
              <option value="market">Market value</option>
              <option value="premium">Premium positioning</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function TipBox({ title, items }) {
  return (
    <div className="p-6 rounded-xl border-2 border-orange-500 bg-orange-500/20 mt-6">
      <h3 className="text-orange-400 font-semibold text-xl mb-2">{title}</h3>
      <ul className="list-disc list-inside text-sky-100 space-y-1">
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function ClientSheet({ property, comps, values, extras }) {
  return (
    <div className="bg-white text-slate-800 rounded-xl p-8 mt-6 shadow-xl">
      <h2 className="text-center font-bold text-2xl mb-6">
        Comparative Market Analysis
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {Object.entries({
          Address: property.address,
          Beds: property.beds,
          Baths: property.baths,
          "Living Area (SF)": property.sf,
          "Lot Size": property.lot,
          "Year Built": property.year,
          Parking: property.parking,
          Condition: property.condition,
        }).map(([label, val]) => (
          <div
            key={label}
            className="flex justify-between bg-black/5 p-2 rounded"
          >
            <span className="font-bold">{label}:</span>
            <span>{val || "—"}</span>
          </div>
        ))}
      </div>
      <h3 className="font-bold text-lg mb-2">Top 3 Comparable Sales</h3>
      <div className="bg-black/5 p-3 rounded space-y-2 mb-6">
        {comps.map((c, i) => (
          <div key={i} className="grid grid-cols-5 gap-2 text-sm">
            <div>{c.address || "—"}</div>
            <div>{c.sf || "—"} SF</div>
            <div>
              {c.price ? `$${parseInt(c.price).toLocaleString()}` : "—"}
            </div>
            <div>{c.psf || "—"}/SF</div>
            <div>{c.adj || "—"}</div>
          </div>
        ))}
      </div>
      <h3 className="font-bold text-lg mb-2">Value Analysis</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="flex justify-between bg-black/5 p-2 rounded">
          <span>Low Value:</span>
          <span>{values.low || "—"}</span>
        </div>
        <div className="flex justify-between bg-black/5 p-2 rounded">
          <span>Mid Value:</span>
          <span>{values.mid || "—"}</span>
        </div>
        <div className="flex justify-between bg-black/5 p-2 rounded">
          <span>High Value:</span>
          <span>{values.high || "—"}</span>
        </div>
        <div className="flex justify-between bg-yellow-200 p-2 rounded border-2 border-yellow-400 font-bold">
          <span>Recommended List Price:</span>
          <span>
            {values.rec > 0 ? `$${values.rec.toLocaleString()}` : "—"}
          </span>
        </div>
      </div>
      <div className="bg-black/5 p-3 rounded">
        <h4 className="font-bold mb-2">How I Price:</h4>
        <p className="text-slate-600 mb-2">
          We looked at the three most similar recent sales and current
          competition, adjusted for size and condition, and reconciled to a
          value range.
        </p>
        <p className="text-slate-600">
          <strong>Recommendation:</strong> List at the bolded price above based
          on your goals and current activity.
        </p>
      </div>
    </div>
  );
}
