import { useState, useEffect } from "react";

export default function ComparativeMarketAnalysis() {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    subjectAddress: "",
    subjectSqft: "",
    subjectBeds: "",
    subjectBaths: "",
    subjectYear: "",
    subjectLot: "",
    subjectType: "",
    agentName: "",
    brokerage: "",
    clientName: "",
    datePrep: today,
    lowPrice: "",
    highPrice: "",
    marketConditions: "",
    activeListings: "",
    marketSummary: "",
    recommendations: "",
  });

  const [comps, setComps] = useState([
    {
      address: "",
      price: "",
      date: "",
      sqft: "",
      rooms: "",
      psf: "",
      notes: "",
    },
    {
      address: "",
      price: "",
      date: "",
      sqft: "",
      rooms: "",
      psf: "",
      notes: "",
    },
    {
      address: "",
      price: "",
      date: "",
      sqft: "",
      rooms: "",
      psf: "",
      notes: "",
    },
  ]);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleCompChange = (index, field, value) => {
    setComps((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      if (field === "price" || field === "sqft") {
        const price = parseFloat(updated[index].price) || 0;
        const sqft = parseFloat(updated[index].sqft) || 0;
        updated[index].psf =
          price > 0 && sqft > 0 ? (price / sqft).toFixed(2) : "";
      }
      return updated;
    });
  };

  const priceRange = () => {
    const low = parseFloat(form.lowPrice) || 0;
    const high = parseFloat(form.highPrice) || 0;
    if (low === 0 && high === 0) return "Suggested Price Range: $0 - $0";
    return `Suggested Price Range: $${low.toLocaleString()} - $${high.toLocaleString()}`;
  };

  const downloadHTML = () => {
    // Get the current component's HTML content
    const componentElement = document.querySelector('.comparative-market-analysis');
    if (!componentElement) {
      alert('Unable to find document content');
      return;
    }

    // Create a clean HTML document with exact styling
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comparative Market Analysis</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @media print {
            .no-print { display: none !important; }
            body { margin: 0; }
            .page-break { page-break-before: always; }
        }
        /* Ensure exact background colors are preserved */
        .bg-gradient-to-br {
            background: linear-gradient(to bottom right, #1e293b, #0c4a6e);
        }
        .bg-white\/10 {
            background-color: rgba(255, 255, 255, 0.1);
        }
        .border-white\/20 {
            border-color: rgba(255, 255, 255, 0.2);
        }
        .border-white\/30 {
            border-color: rgba(255, 255, 255, 0.3);
        }
        .text-emerald-400 {
            color: #34d399;
        }
        .text-yellow-400 {
            color: #fbbf24;
        }
        .bg-emerald-400 {
            background-color: #34d399;
        }
        .bg-yellow-400 {
            background-color: #fbbf24;
        }
        .bg-orange-500 {
            background-color: #f97316;
        }
        .bg-red-500 {
            background-color: #ef4444;
        }
        .text-slate-800 {
            color: #1e293b;
        }
        .text-white {
            color: #ffffff;
        }
        .accent-emerald-400 {
            accent-color: #34d399;
        }
    </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white p-5">
    <div class="max-w-3xl mx-auto">
        ${componentElement.innerHTML}
        </div>
        <!-- Disclaimer Section -->
        <div style="background:#1E2A38; border-top:1px solid #334155; padding:16px 24px; width: 100%; margin-top: 40px;">
            <p style="font-size:12px; color:#9CA3AF; text-align:center; line-height:1.6;">
                <strong style="color:#D1D5DB;">Disclaimer:</strong> This template is for business use only and does not
                constitute legal advice. Stacked Technologies, LLC is not a law firm. Users are responsible for
                confirming compliance with all applicable local, state, and federal laws.
            </p>
        </div>
    
</body>
</html>`;

    // Create and download the file
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comparative-market-analysis-${form.datePrep || 'document'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white p-5">
      <div className="max-w-3xl mx-auto comparative-market-analysis">
        {/* Header */}
        <div className="text-center mb-8 p-10 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-5 rounded-lg bg-orange-500 flex items-center justify-center text-2xl font-bold">
            📊
          </div>
          <h1 className="text-3xl font-bold text-emerald-400 mb-3">
            Comparative Market Analysis
          </h1>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 rounded-xl mb-8 font-bold text-center">
          <strong>PROFESSIONAL ANALYSIS:</strong> This CMA is prepared by a
          licensed real estate professional for informational purposes. Market
          conditions may change rapidly.
        </div>

        <form className="space-y-6">
          {/* Subject Property Info */}
          <FormSection title="Subject Property Information">
            <FormGroup label="Property Address:">
              <input
                id="subjectAddress"
                value={form.subjectAddress}
                onChange={handleFormChange}
                placeholder="Full property address"
                required
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
              />
            </FormGroup>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormGroup label="Square Footage:">
                <input
                  id="subjectSqft"
                  type="number"
                  min="0"
                  value={form.subjectSqft}
                  onChange={handleFormChange}
                  placeholder="0"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Bedrooms:">
                <input
                  id="subjectBeds"
                  type="number"
                  min="0"
                  value={form.subjectBeds}
                  onChange={handleFormChange}
                  placeholder="0"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Bathrooms:">
                <input
                  id="subjectBaths"
                  type="number"
                  min="0"
                  step="0.5"
                  value={form.subjectBaths}
                  onChange={handleFormChange}
                  placeholder="0"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Year Built:">
                <input
                  id="subjectYear"
                  type="number"
                  min="1800"
                  max="2025"
                  value={form.subjectYear}
                  onChange={handleFormChange}
                  placeholder="1900"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Lot Size:">
                <input
                  id="subjectLot"
                  value={form.subjectLot}
                  onChange={handleFormChange}
                  placeholder="0.25 acres"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Property Type:">
                <input
                  id="subjectType"
                  value={form.subjectType}
                  onChange={handleFormChange}
                  placeholder="Single Family, Condo, etc."
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
            </div>
          </FormSection>

          {/* Agent & Client Info */}
          <FormSection title="Agent & Client Information">
            <div className="grid sm:grid-cols-2 gap-5">
              <FormGroup label="Prepared By:">
                <input
                  id="agentName"
                  value={form.agentName}
                  onChange={handleFormChange}
                  placeholder="Agent name"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Brokerage:">
                <input
                  id="brokerage"
                  value={form.brokerage}
                  onChange={handleFormChange}
                  placeholder="Brokerage name"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Client Name:">
                <input
                  id="clientName"
                  value={form.clientName}
                  onChange={handleFormChange}
                  placeholder="Client name"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Date Prepared:">
                <input
                  id="datePrep"
                  type="date"
                  value={form.datePrep}
                  onChange={handleFormChange}
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
            </div>
          </FormSection>

          {/* Comparable Sales */}
          <FormSection title="Comparable Sales">
            {comps.map((comp, idx) => (
              <div
                key={idx}
                className="bg-white/5 rounded-lg p-5 my-4 border-l-4 border-yellow-400"
              >
                <div className="text-yellow-400 font-bold text-lg mb-4 border-b border-yellow-200/50 pb-2">
                  Comparable #{idx + 1}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormGroup label="Address:">
                    <input
                      value={comp.address}
                      onChange={(e) =>
                        handleCompChange(idx, "address", e.target.value)
                      }
                      placeholder="Property address"
                      className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                    />
                  </FormGroup>
                  <FormGroup label="Sale Price:">
                    <input
                      type="number"
                      min="0"
                      value={comp.price}
                      onChange={(e) =>
                        handleCompChange(idx, "price", e.target.value)
                      }
                      placeholder="0"
                      className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                    />
                  </FormGroup>
                  <FormGroup label="Sale Date:">
                    <input
                      type="date"
                      value={comp.date}
                      onChange={(e) =>
                        handleCompChange(idx, "date", e.target.value)
                      }
                      className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                    />
                  </FormGroup>
                  <FormGroup label="Square Footage:">
                    <input
                      type="number"
                      min="0"
                      value={comp.sqft}
                      onChange={(e) =>
                        handleCompChange(idx, "sqft", e.target.value)
                      }
                      placeholder="0"
                      className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                    />
                  </FormGroup>
                  <FormGroup label="Beds/Baths:">
                    <input
                      value={comp.rooms}
                      onChange={(e) =>
                        handleCompChange(idx, "rooms", e.target.value)
                      }
                      placeholder="3/2"
                      className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                    />
                  </FormGroup>
                  <FormGroup label="Price per Sq Ft:">
                    <input
                      type="number"
                      readOnly
                      value={comp.psf}
                      className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                    />
                  </FormGroup>
                </div>
                <FormGroup label="Notes & Adjustments:">
                  <textarea
                    value={comp.notes}
                    onChange={(e) =>
                      handleCompChange(idx, "notes", e.target.value)
                    }
                    placeholder="Condition, features, adjustments..."
                    className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
                  />
                </FormGroup>
              </div>
            ))}
          </FormSection>

          {/* Price Analysis */}
          <FormSection title="Price Analysis">
            <div className="bg-emerald-400/10 border-2 border-emerald-400 rounded-lg p-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormGroup label="Recommended Low Price:">
                  <input
                    id="lowPrice"
                    type="number"
                    min="0"
                    value={form.lowPrice}
                    onChange={handleFormChange}
                    placeholder="0"
                    className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                  />
                </FormGroup>
                <FormGroup label="Recommended High Price:">
                  <input
                    id="highPrice"
                    type="number"
                    min="0"
                    value={form.highPrice}
                    onChange={handleFormChange}
                    placeholder="0"
                    className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                  />
                </FormGroup>
              </div>
              <div className="text-emerald-400 font-bold text-xl text-center my-4">
                {priceRange()}
              </div>
              <FormGroup label="Market Conditions & Pricing Strategy:">
                <textarea
                  id="marketConditions"
                  value={form.marketConditions}
                  onChange={handleFormChange}
                  placeholder="Describe market conditions..."
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
                />
              </FormGroup>
            </div>
          </FormSection>

          {/* Active Listings */}
          <FormSection title="Active Listings (Competition)">
            <FormGroup label="Active Competing Properties:">
              <textarea
                id="activeListings"
                value={form.activeListings}
                onChange={handleFormChange}
                placeholder="List active properties..."
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
              />
            </FormGroup>
          </FormSection>

          {/* Market Summary */}
          <FormSection title="Market Summary & Recommendations">
            <FormGroup label="Neighborhood Market Summary:">
              <textarea
                id="marketSummary"
                value={form.marketSummary}
                onChange={handleFormChange}
                placeholder="Describe neighborhood trends..."
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
              />
            </FormGroup>
            <FormGroup label="Recommendations:">
              <textarea
                id="recommendations"
                value={form.recommendations}
                onChange={handleFormChange}
                placeholder="Provide recommendations..."
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
              />
            </FormGroup>
          </FormSection>
        </form>

        {/* Submit / Print */}
        <div className="flex gap-4 justify-center mt-10">
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-emerald-400 text-slate-800 px-6 py-3 rounded-lg font-bold text-lg hover:-translate-y-1 transition"
          >
            Print CMA Report
          </button>
          <button
            type="button"
            onClick={downloadHTML}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:-translate-y-1 transition"
          >
            Download HTML
          </button>
        </div>
      </div>
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <div className="mb-6 p-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
      {title && (
        <div className="text-2xl font-bold text-emerald-400 mb-4 border-b-2 border-emerald-400 pb-1">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-yellow-400 font-bold mb-2 text-lg">{label}</label>
      {children}
    </div>
  );
}
