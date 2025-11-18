import { useState } from "react";

export default function BuyerConsultationAgreement() {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    agreementDate: today,
    agentName: "",
    brokerage: "",
    buyerNames: "",
    commission: "",
    termFrom: "",
    termTo: "",
    additionalTerms: "",
    agentSignatureName: "",
    agentSignature: "",
    agentSignDate: today,
    buyerSignatureName: "",
    buyerSignature: "",
    buyerSignDate: today,
  });

  const [services, setServices] = useState({
    service1: true,
    service2: true,
    service3: true,
    service4: true,
    service5: true,
  });

  const [responsibilities, setResponsibilities] = useState({
    responsibility1: true,
    responsibility2: true,
    responsibility3: true,
    responsibility4: true,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleCheck = (group, key) => {
    if (group === "services") {
      setServices((prev) => ({ ...prev, [key]: !prev[key] }));
    } else {
      setResponsibilities((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const sign = (type) => {
    if (!form[`${type}SignatureName`].trim()) {
      alert("Please enter your full name before signing.");
      return;
    }
    setForm((prev) => ({
      ...prev,
      [`${type}Signature`]: prev[`${type}SignatureName`],
      [`${type}SignDate`]: prev[`${type}SignDate`] || today,
    }));
  };

  const downloadHTML = () => {
    // Get the current component's HTML content
    const componentElement = document.querySelector('.buyer-consultation-agreement');
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
    <title>Buyer Consultation Agreement</title>
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
        .bg-blue-500 {
            background-color: #3b82f6;
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
    a.download = `buyer-consultation-agreement-${form.agreementDate || 'document'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white p-5">
      <div className="max-w-3xl mx-auto buyer-consultation-agreement">
        {/* Header */}
        <div className="text-center mb-8 p-10 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-5 rounded-lg bg-orange-500 flex items-center justify-center text-2xl font-bold">
            📝
          </div>
          <h1 className="text-4xl font-bold text-emerald-400 mb-3">
            Buyer Consultation Agreement
          </h1>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 rounded-xl mb-8 font-bold text-center">
          IMPORTANT LEGAL DISCLAIMER: This template is for informational
          purposes only and does not constitute legal advice. Consult with a
          qualified real estate attorney before use.
        </div>

        {/* Agreement Information */}
        <FormSection title="Agreement Information">
          <div className="grid sm:grid-cols-2 gap-5">
            <FormGroup label="Date:">
              <input
                type="date"
                id="agreementDate"
                value={form.agreementDate}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
              />
            </FormGroup>
            <FormGroup label="Agent:">
              <input
                id="agentName"
                value={form.agentName}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                placeholder="Agent name"
              />
            </FormGroup>
            <FormGroup label="Brokerage:">
              <input
                id="brokerage"
                value={form.brokerage}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                placeholder="Brokerage name"
              />
            </FormGroup>
            <FormGroup label="Buyer(s):">
              <input
                id="buyerNames"
                value={form.buyerNames}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                placeholder="Buyer name(s)"
              />
            </FormGroup>
          </div>
        </FormSection>

        {/* Services */}
        <FormSection title="Services to be Provided">
          {[
            "Property searches based on buyer criteria",
            "Market analysis and comparative market data",
            "Property showings and guidance",
            "Negotiation assistance",
            "Transaction coordination through closing",
          ].map((txt, idx) => {
            const key = `service${idx + 1}`;
            return (
              <label
                key={key}
                className="flex items-center my-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={services[key]}
                  onChange={() => handleCheck("services", key)}
                  className="h-4 w-4 mr-2 accent-emerald-400"
                />
                {txt}
              </label>
            );
          })}
        </FormSection>

        {/* Responsibilities */}
        <FormSection title="Buyer Responsibilities">
          {[
            "Exclusive working relationship during the term specified",
            "Timely communication regarding property preferences",
            "Financial pre-qualification verification",
            "Good faith participation in property viewings",
          ].map((txt, idx) => {
            const key = `responsibility${idx + 1}`;
            return (
              <label
                key={key}
                className="flex items-center my-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={responsibilities[key]}
                  onChange={() => handleCheck("responsibilities", key)}
                  className="h-4 w-4 mr-2 accent-emerald-400"
                />
                {txt}
              </label>
            );
          })}
        </FormSection>

        {/* Agreement Terms */}
        <FormSection title="Agreement Terms">
          <div className="grid sm:grid-cols-2 gap-5">
            <FormGroup label="Commission Structure:">
              <input
                id="commission"
                value={form.commission}
                onChange={handleChange}
                placeholder="To be filled in"
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
              />
            </FormGroup>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mt-5">
            <FormGroup label="Term From:">
              <input
                type="date"
                id="termFrom"
                value={form.termFrom}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
              />
            </FormGroup>
            <FormGroup label="Term To:">
              <input
                type="date"
                id="termTo"
                value={form.termTo}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
              />
            </FormGroup>
          </div>
        </FormSection>

        {/* Additional Terms */}
        <FormSection title="Additional Terms & Conditions">
          <FormGroup label="Additional Notes:">
            <textarea
              id="additionalTerms"
              value={form.additionalTerms}
              onChange={handleChange}
              placeholder="Enter any additional terms..."
              className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
            />
          </FormGroup>
        </FormSection>

        {/* Signatures */}
        <FormSection title="Signatures">
          <div className="grid sm:grid-cols-2 gap-8 mt-6">
            {/* Agent */}
            <SignatureBlock
              type="agent"
              name={form.agentSignatureName}
              signature={form.agentSignature}
              date={form.agentSignDate}
              onChange={handleChange}
              onSign={sign}
            />
            {/* Buyer */}
            <SignatureBlock
              type="buyer"
              name={form.buyerSignatureName}
              signature={form.buyerSignature}
              date={form.buyerSignDate}
              onChange={handleChange}
              onSign={sign}
            />
          </div>
        </FormSection>

        <div className="flex gap-4 justify-center mt-10">
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-emerald-400 text-slate-800 px-6 py-3 rounded-lg font-bold text-lg hover:-translate-y-1 transition"
          >
            Print Agreement
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
    <div className="flex flex-col">
      <label className="text-yellow-400 font-bold mb-2 text-lg">{label}</label>
      {children}
    </div>
  );
}

function SignatureBlock({ type, name, signature, date, onChange, onSign }) {
  return (
    <div>
      <FormGroup label={`${type === "agent" ? "Agent" : "Buyer"} Name:`}>
        <input
          id={`${type}SignatureName`}
          value={name}
          onChange={onChange}
          placeholder="Type your full name"
          className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
        />
      </FormGroup>

      <FormGroup label={`${type === "agent" ? "Agent" : "Buyer"} Signature:`}>
        <div className="border-t-2 border-yellow-400 pt-2 text-center rounded">
          <div
            className={`font-[cursive] text-2xl min-h-[40px] flex items-center justify-center ${signature
              ? "text-emerald-400 border-b border-emerald-400"
              : "text-yellow-400"
              }`}
          >
            {signature || `Click "Sign" to add signature`}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onSign(type)}
          className={`${signature ? "bg-emerald-400" : "bg-yellow-400"
            } text-slate-800 font-bold px-4 py-2 rounded mt-3 text-sm hover:-translate-y-0.5 transition`}
        >
          {signature
            ? "Re-sign"
            : `Sign as ${type === "agent" ? "Agent" : "Buyer"}`}
        </button>
      </FormGroup>

      <FormGroup label="Date:">
        <input
          type="date"
          id={`${type}SignDate`}
          value={date}
          onChange={onChange}
          className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
        />
      </FormGroup>
    </div>
  );
}
