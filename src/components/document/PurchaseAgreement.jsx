import { useState, useEffect } from "react";

export default function PurchaseAgreement() {
  const today = new Date().toISOString().split("T")[0];
  const inspectionDefault = new Date();
  inspectionDefault.setDate(inspectionDefault.getDate() + 7);
  const closingDefault = new Date();
  closingDefault.setDate(closingDefault.getDate() + 30);

  const [form, setForm] = useState({
    propertyAddress: "",
    purchasePrice: "",
    earnestMoney: "",
    buyerNames: "",
    buyerPhone: "",
    buyerEmail: "",
    sellerNames: "",
    sellerPhone: "",
    sellerEmail: "",
    financingType: "",
    loanAmount: "",
    inspectionDeadline: inspectionDefault.toISOString().split("T")[0],
    closingDate: closingDefault.toISOString().split("T")[0],
    includedItems: "",
    excludedItems: "",
    specialConditions: "",
  });

  const [signatures, setSignatures] = useState({
    buyer: { name: "", signed: false, date: today },
    seller: { name: "", signed: false, date: today },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignature = (role) => {
    if (!signatures[role].name.trim()) {
      alert("Please enter your full name before signing.");
      return;
    }
    setSignatures((prev) => ({
      ...prev,
      [role]: { ...prev[role], signed: true, date: today },
    }));
  };

  // Format currency fields
  const formatCurrency = (fieldId) => {
    const raw = form[fieldId].toString().replace(/,/g, "");
    if (!isNaN(raw) && raw !== "") {
      setForm((prev) => ({
        ...prev,
        [fieldId]: Number(raw).toLocaleString(),
      }));
    }
  };

  const downloadHTML = () => {
    // Get the current component's HTML content
    const componentElement = document.querySelector('.purchase-agreement');
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
    <title>Purchase Agreement</title>
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
    a.download = `purchase-agreement-${form.closingDate || 'document'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white p-5">
      <div className="max-w-3xl mx-auto purchase-agreement">
        {/* Header */}
        <div className="text-center mb-8 p-10 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-5 rounded-lg bg-orange-500 flex items-center justify-center text-2xl font-bold">
            📄
          </div>
          <h1 className="text-3xl font-bold text-emerald-400 mb-3">
            Purchase Agreement
          </h1>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 rounded-xl mb-8 font-bold text-center">
          <strong>IMPORTANT LEGAL DISCLAIMER:</strong> This template is for
          informational purposes only and does not constitute legal advice.
          Consult with a qualified real estate attorney before use.
        </div>

        <form className="space-y-6">
          {/* Property Info */}
          <FormSection title="Property Information">
            <FormGroup label="Property Address:">
              <input
                id="propertyAddress"
                value={form.propertyAddress}
                onChange={handleChange}
                placeholder="Full property address"
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
              />
            </FormGroup>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormGroup label="Purchase Price:">
                <input
                  id="purchasePrice"
                  type="text"
                  value={form.purchasePrice}
                  onChange={handleChange}
                  onBlur={() => formatCurrency("purchasePrice")}
                  placeholder="0"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Earnest Money:">
                <input
                  id="earnestMoney"
                  type="text"
                  value={form.earnestMoney}
                  onChange={handleChange}
                  onBlur={() => formatCurrency("earnestMoney")}
                  placeholder="0"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
            </div>
          </FormSection>

          {/* Buyer Info */}
          <FormSection title="Buyer Information">
            <div className="grid sm:grid-cols-2 gap-5">
              <FormGroup label="Buyer Name(s):">
                <input
                  id="buyerNames"
                  value={form.buyerNames}
                  onChange={handleChange}
                  placeholder="Full legal name(s)"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Phone Number:">
                <input
                  id="buyerPhone"
                  value={form.buyerPhone}
                  onChange={handleChange}
                  placeholder="(000) 000-0000"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Email Address:">
                <input
                  id="buyerEmail"
                  type="email"
                  value={form.buyerEmail}
                  onChange={handleChange}
                  placeholder="buyer@email.com"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
            </div>
          </FormSection>

          {/* Seller Info */}
          <FormSection title="Seller Information">
            <div className="grid sm:grid-cols-2 gap-5">
              <FormGroup label="Seller Name(s):">
                <input
                  id="sellerNames"
                  value={form.sellerNames}
                  onChange={handleChange}
                  placeholder="Full legal name(s)"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Phone Number:">
                <input
                  id="sellerPhone"
                  value={form.sellerPhone}
                  onChange={handleChange}
                  placeholder="(000) 000-0000"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Email Address:">
                <input
                  id="sellerEmail"
                  type="email"
                  value={form.sellerEmail}
                  onChange={handleChange}
                  placeholder="seller@email.com"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
            </div>
          </FormSection>

          {/* Financing */}
          <FormSection title="Financing & Timeline">
            <div className="grid sm:grid-cols-2 gap-5">
              <FormGroup label="Financing Type:">
                <input
                  id="financingType"
                  value={form.financingType}
                  onChange={handleChange}
                  placeholder="Conventional, FHA, VA, Cash..."
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Loan Amount:">
                <input
                  id="loanAmount"
                  type="text"
                  value={form.loanAmount}
                  onChange={handleChange}
                  onBlur={() => formatCurrency("loanAmount")}
                  placeholder="0"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormGroup label="Inspection Deadline:">
                <input
                  id="inspectionDeadline"
                  type="date"
                  value={form.inspectionDeadline}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Closing Date:">
                <input
                  id="closingDate"
                  type="date"
                  value={form.closingDate}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
            </div>
          </FormSection>

          {/* Contingencies */}
          <FormSection title="Contingencies">
            {[
              {
                id: "contingency1",
                label: "Home inspection contingency",
                defaultChecked: true,
              },
              {
                id: "contingency2",
                label: "Financing contingency",
                defaultChecked: true,
              },
              { id: "contingency3", label: "Appraisal contingency" },
              { id: "contingency4", label: "Sale of buyer's current home" },
            ].map((c) => (
              <label key={c.id} className="flex items-center gap-2 my-2">
                <input
                  type="checkbox"
                  id={c.id}
                  defaultChecked={c.defaultChecked}
                  className="scale-110"
                />
                {c.label}
              </label>
            ))}
          </FormSection>

          {/* Inclusions */}
          <FormSection title="Inclusions & Exclusions">
            <FormGroup label="Included Items:">
              <textarea
                id="includedItems"
                value={form.includedItems}
                onChange={handleChange}
                placeholder="List included items..."
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
              />
            </FormGroup>
            <FormGroup label="Excluded Items:">
              <textarea
                id="excludedItems"
                value={form.excludedItems}
                onChange={handleChange}
                placeholder="List excluded items..."
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
              />
            </FormGroup>
          </FormSection>

          {/* Additional Terms */}
          <FormSection title="Additional Terms">
            <FormGroup label="Special Conditions:">
              <textarea
                id="specialConditions"
                value={form.specialConditions}
                onChange={handleChange}
                placeholder="Enter any special conditions..."
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
              />
            </FormGroup>
          </FormSection>

          {/* Signatures */}
          <FormSection title="Signatures">
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Buyer */}
              <SignatureBlock
                role="buyer"
                data={signatures.buyer}
                setSignatures={setSignatures}
              />
              {/* Seller */}
              <SignatureBlock
                role="seller"
                data={signatures.seller}
                setSignatures={setSignatures}
              />
            </div>
          </FormSection>
        </form>

        {/* Print */}
        <div className="flex gap-4 justify-center mt-10">
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-emerald-400 text-slate-800 px-6 py-3 rounded-lg font-bold text-lg hover:-translate-y-1 transition"
          >
            Print Purchase Agreement
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
      <div className="text-2xl font-bold text-emerald-400 mb-4 border-b-2 border-emerald-400 pb-1">
        {title}
      </div>
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

function SignatureBlock({ role, data, setSignatures }) {
  const today = new Date().toISOString().split("T")[0];

  const handleSign = () => {
    if (!data.name.trim()) {
      alert("Please enter your full name before signing.");
      return;
    }
    setSignatures((prev) => ({
      ...prev,
      [role]: { ...prev[role], signed: true, date: today },
    }));
  };

  return (
    <div>
      <FormGroup label={`${role === "buyer" ? "Buyer" : "Seller"} Name:`}>
        <input
          value={data.name}
          onChange={(e) =>
            setSignatures((prev) => ({
              ...prev,
              [role]: { ...prev[role], name: e.target.value },
            }))
          }
          placeholder="Type your full name"
          className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
        />
      </FormGroup>
      <FormGroup label={`${role === "buyer" ? "Buyer" : "Seller"} Signature:`}>
        <div className="border-t-2 border-yellow-400 pt-2 text-center">
          <div
            className={`min-h-[40px] flex items-center justify-center text-2xl ${data.signed
                ? "text-emerald-400 border-b border-emerald-400"
                : "text-yellow-400"
              }`}
            style={{ fontFamily: "Brush Script MT, cursive" }}
          >
            {data.signed ? data.name : 'Click "Sign" to add signature'}
          </div>
        </div>
        <button
          type="button"
          onClick={handleSign}
          className={`mt-2 px-4 py-2 rounded font-bold text-sm transition ${data.signed
              ? "bg-emerald-400 text-slate-800"
              : "bg-yellow-400 text-slate-800"
            }`}
        >
          {data.signed
            ? `Re-sign as ${role}`
            : `Sign as ${role[0].toUpperCase() + role.slice(1)}`}
        </button>
      </FormGroup>
      <FormGroup label="Date:">
        <input
          type="date"
          value={data.date}
          onChange={(e) =>
            setSignatures((prev) => ({
              ...prev,
              [role]: { ...prev[role], date: e.target.value },
            }))
          }
          className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
        />
      </FormGroup>
    </div>
  );
}
