import { useState, useEffect } from "react";

export default function CommissionAgreement() {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    agreementDate: today,
    transactionType: "",
    propertyAddress: "",
    salePrice: "",
    propertyType: "",
    clientNames: "",
    clientType: "",
    agentName: "",
    brokerage: "",
    licenseNumber: "",
    commissionRate: "",
    commissionAmount: "",
    listingSplit: "",
    buyerSplit: "",
    commissionDue: "closing",
    paymentMethod: "escrow",
    additionalFees: "",
    specialTerms: "",
    cancellationPolicy: "",
  });

  const [signatures, setSignatures] = useState({
    agent: { name: "", signed: false, date: today },
    client: { name: "", signed: false, date: today },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleCommissionCalc = () => {
    const price = parseFloat(form.salePrice) || 0;
    const rate = parseFloat(form.commissionRate) || 0;
    if (price > 0 && rate > 0) {
      const amount = (price * rate) / 100;
      setForm((prev) => ({ ...prev, commissionAmount: amount.toFixed(2) }));
    }
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

  useEffect(() => {
    handleCommissionCalc();
  }, [form.salePrice, form.commissionRate]);

  const downloadHTML = () => {
    // Get the current component's HTML content
    const componentElement = document.querySelector('.commission-agreement');
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
    <title>Commission Agreement</title>
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
    a.download = `commission-agreement-${form.agreementDate || 'document'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white p-5">
      <div className="max-w-3xl mx-auto commission-agreement">
        {/* Header */}
        <div className="text-center mb-8 p-10 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-5 rounded-lg bg-orange-500 flex items-center justify-center text-2xl font-bold">
            💰
          </div>
          <h1 className="text-3xl font-bold text-emerald-400 mb-3">
            Commission Agreement
          </h1>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 rounded-xl mb-8 font-bold text-center">
          <strong>IMPORTANT LEGAL DISCLAIMER:</strong> This template is for
          informational purposes only and does not constitute legal advice.
          Consult with a qualified real estate attorney before use.
        </div>

        <form className="space-y-6">
          {/* Agreement Info */}
          <FormSection title="Agreement Information">
            <div className="grid sm:grid-cols-2 gap-5">
              <FormGroup label="Agreement Date:">
                <input
                  id="agreementDate"
                  type="date"
                  value={form.agreementDate}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                  required
                />
              </FormGroup>
              <FormGroup label="Transaction Type:">
                <select
                  id="transactionType"
                  value={form.transactionType}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                  required
                >
                  <option value="">Select type</option>
                  <option value="sale">Sale</option>
                  <option value="purchase">Purchase</option>
                  <option value="lease">Lease</option>
                  <option value="referral">Referral</option>
                </select>
              </FormGroup>
            </div>
          </FormSection>

          {/* Property Info */}
          <FormSection title="Property Information">
            <FormGroup label="Property Address:">
              <input
                id="propertyAddress"
                value={form.propertyAddress}
                onChange={handleChange}
                placeholder="Full property address"
                required
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
              />
            </FormGroup>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormGroup label="Sale/Purchase Price:">
                <input
                  id="salePrice"
                  type="number"
                  min="0"
                  value={form.salePrice}
                  onChange={handleChange}
                  onBlur={handleCommissionCalc}
                  placeholder="0"
                  required
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Property Type:">
                <input
                  id="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  placeholder="Single Family, Condo, etc."
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
            </div>
          </FormSection>

          {/* Client Info */}
          <FormSection title="Client Information">
            <div className="grid sm:grid-cols-2 gap-5">
              <FormGroup label="Client Name(s):">
                <input
                  id="clientNames"
                  value={form.clientNames}
                  onChange={handleChange}
                  placeholder="Full legal name(s)"
                  required
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Client Type:">
                <select
                  id="clientType"
                  value={form.clientType}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                  required
                >
                  <option value="">Select type</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="tenant">Tenant</option>
                  <option value="landlord">Landlord</option>
                </select>
              </FormGroup>
            </div>
          </FormSection>

          {/* Agent & Brokerage Info */}
          <FormSection title="Agent & Brokerage Information">
            <div className="grid sm:grid-cols-2 gap-5">
              <FormGroup label="Agent Name:">
                <input
                  id="agentName"
                  value={form.agentName}
                  onChange={handleChange}
                  placeholder="Agent full name"
                  required
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Brokerage:">
                <input
                  id="brokerage"
                  value={form.brokerage}
                  onChange={handleChange}
                  placeholder="Brokerage name"
                  required
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="License Number:">
                <input
                  id="licenseNumber"
                  value={form.licenseNumber}
                  onChange={handleChange}
                  placeholder="Real estate license #"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
            </div>
          </FormSection>

          {/* Commission Structure */}
          <FormSection title="Commission Structure">
            <div className="bg-emerald-400/10 border-2 border-emerald-400 rounded-lg p-5 mb-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormGroup label="Commission Rate (%):">
                  <input
                    id="commissionRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={form.commissionRate}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                    className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                  />
                </FormGroup>
                <FormGroup label="Commission Amount ($):">
                  <input
                    id="commissionAmount"
                    value={form.commissionAmount}
                    readOnly
                    className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                  />
                </FormGroup>
              </div>
              <FormGroup label="Commission Split:">
                <label className="flex items-center gap-2 my-1">
                  <input
                    type="checkbox"
                    id="listingAgent"
                    className="scale-110"
                  />{" "}
                  Listing Agent Commission
                </label>
                <label className="flex items-center gap-2 my-1">
                  <input
                    type="checkbox"
                    id="buyingAgent"
                    className="scale-110"
                  />{" "}
                  Buyer’s Agent Commission
                </label>
                <label className="flex items-center gap-2 my-1">
                  <input
                    type="checkbox"
                    id="dualAgency"
                    className="scale-110"
                  />{" "}
                  Dual Agency (Full Commission)
                </label>
              </FormGroup>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormGroup label="Listing Agent Split (%):">
                <input
                  id="listingSplit"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={form.listingSplit}
                  onChange={handleChange}
                  placeholder="50.00"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Buyer Agent Split (%):">
                <input
                  id="buyerSplit"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={form.buyerSplit}
                  onChange={handleChange}
                  placeholder="50.00"
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
            </div>
          </FormSection>

          {/* Payment Terms */}
          <FormSection title="Payment Terms">
            <FormGroup label="Commission Due:">
              <select
                id="commissionDue"
                value={form.commissionDue}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
              >
                <option value="closing">At Closing</option>
                <option value="contract">Upon Contract Execution</option>
                <option value="other">Other (specify in notes)</option>
              </select>
            </FormGroup>
            <FormGroup label="Payment Method:">
              <select
                id="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
              >
                <option value="escrow">Through Escrow/Title Company</option>
                <option value="direct">Direct Payment</option>
                <option value="other">Other (specify in notes)</option>
              </select>
            </FormGroup>
          </FormSection>

          {/* Additional Services */}
          <FormSection title="Additional Services & Fees">
            <label className="flex items-center gap-2 my-2">
              <input type="checkbox" id="marketing" className="scale-110" />{" "}
              Marketing and advertising costs included
            </label>
            <label className="flex items-center gap-2 my-2">
              <input type="checkbox" id="photography" className="scale-110" />{" "}
              Professional photography included
            </label>
            <label className="flex items-center gap-2 my-2">
              <input type="checkbox" id="staging" className="scale-110" />{" "}
              Staging consultation included
            </label>
            <label className="flex items-center gap-2 my-2">
              <input
                type="checkbox"
                id="administrative"
                className="scale-110"
              />{" "}
              Administrative fees apply
            </label>
            <FormGroup label="Additional Fees & Services:">
              <textarea
                id="additionalFees"
                value={form.additionalFees}
                onChange={handleChange}
                placeholder="List any additional fees, services, or special arrangements..."
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
              />
            </FormGroup>
          </FormSection>

          {/* Terms */}
          <FormSection title="Terms & Conditions">
            <FormGroup label="Special Terms:">
              <textarea
                id="specialTerms"
                value={form.specialTerms}
                onChange={handleChange}
                placeholder="Enter any special terms..."
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
              />
            </FormGroup>
            <FormGroup label="Cancellation Policy:">
              <textarea
                id="cancellationPolicy"
                value={form.cancellationPolicy}
                onChange={handleChange}
                placeholder="Specify cancellation terms..."
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
              />
            </FormGroup>
          </FormSection>

          {/* Signatures */}
          <FormSection title="Signatures">
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Agent */}
              <div>
                <FormGroup label="Agent Name:">
                  <input
                    value={signatures.agent.name}
                    onChange={(e) =>
                      setSignatures((p) => ({
                        ...p,
                        agent: { ...p.agent, name: e.target.value },
                      }))
                    }
                    placeholder="Type your full name"
                    className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                  />
                </FormGroup>
                <FormGroup label="Agent Signature:">
                  <div className="border-t-2 border-yellow-400 pt-2 text-center">
                    <div
                      className={`min-h-[40px] flex items-center justify-center text-2xl ${signatures.agent.signed
                          ? "text-emerald-400 border-b border-emerald-400"
                          : "text-yellow-400"
                        }`}
                      style={{ fontFamily: "Brush Script MT, cursive" }}
                    >
                      {signatures.agent.signed
                        ? signatures.agent.name
                        : 'Click "Sign" to add signature'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSignature("agent")}
                    className={`mt-2 px-4 py-2 rounded font-bold text-sm transition ${signatures.agent.signed
                        ? "bg-emerald-400 text-slate-800"
                        : "bg-yellow-400 text-slate-800"
                      }`}
                  >
                    {signatures.agent.signed ? "Re-sign" : "Sign as Agent"}
                  </button>
                </FormGroup>
                <FormGroup label="Date:">
                  <input
                    type="date"
                    value={signatures.agent.date}
                    onChange={(e) =>
                      setSignatures((p) => ({
                        ...p,
                        agent: { ...p.agent, date: e.target.value },
                      }))
                    }
                    className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                  />
                </FormGroup>
              </div>

              {/* Client */}
              <div>
                <FormGroup label="Client Name:">
                  <input
                    value={signatures.client.name}
                    onChange={(e) =>
                      setSignatures((p) => ({
                        ...p,
                        client: { ...p.client, name: e.target.value },
                      }))
                    }
                    placeholder="Type your full name"
                    className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                  />
                </FormGroup>
                <FormGroup label="Client Signature:">
                  <div className="border-top border-yellow-400 pt-2 text-center">
                    <div
                      className={`min-h-[40px] flex items-center justify-center text-2xl ${signatures.client.signed
                          ? "text-emerald-400 border-b border-emerald-400"
                          : "text-yellow-400"
                        }`}
                      style={{ fontFamily: "Brush Script MT, cursive" }}
                    >
                      {signatures.client.signed
                        ? signatures.client.name
                        : 'Click "Sign" to add signature'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSignature("client")}
                    className={`mt-2 px-4 py-2 rounded font-bold text-sm transition ${signatures.client.signed
                        ? "bg-emerald-400 text-slate-800"
                        : "bg-yellow-400 text-slate-800"
                      }`}
                  >
                    {signatures.client.signed ? "Re-sign" : "Sign as Client"}
                  </button>
                </FormGroup>
                <FormGroup label="Date:">
                  <input
                    type="date"
                    value={signatures.client.date}
                    onChange={(e) =>
                      setSignatures((p) => ({
                        ...p,
                        client: { ...p.client, date: e.target.value },
                      }))
                    }
                    className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                  />
                </FormGroup>
              </div>
            </div>
          </FormSection>
        </form>

        {/* Print Button */}
        <div className="flex gap-4 justify-center mt-10">
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-emerald-400 text-slate-800 px-6 py-3 rounded-lg font-bold text-lg hover:-translate-y-1 transition"
          >
            Print Commission Agreement
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

/* Reusable UI parts */
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
