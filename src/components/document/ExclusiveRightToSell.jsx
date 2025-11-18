import React, { useState, useEffect } from "react";

export default function ExclusiveRightToSell() {
  const today = new Date().toISOString().split("T")[0];
  const sixMonthsLater = new Date();
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
  const sixMonthsDate = sixMonthsLater.toISOString().split("T")[0];

  const [agentName, setAgentName] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [agentSigned, setAgentSigned] = useState(false);
  const [sellerSigned, setSellerSigned] = useState(false);
  const [agentDate, setAgentDate] = useState(today);
  const [sellerDate, setSellerDate] = useState(today);

  const handleSign = (type) => {
    if (type === "agent") {
      if (!agentName.trim()) {
        alert("Please enter your full name before signing.");
        return;
      }
      setAgentSigned(true);
      if (!agentDate) setAgentDate(today);
    } else {
      if (!sellerName.trim()) {
        alert("Please enter your full name before signing.");
        return;
      }
      setSellerSigned(true);
      if (!sellerDate) setSellerDate(today);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadHTML = () => {
    // Get the current component's HTML content
    const componentElement = document.querySelector('.exclusive-right-to-sell');
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
    <title>Exclusive Right to Sell Listing Agreement</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @media print {
            .no-print { display: none !important; }
            body { margin: 0; }
            .page-break { page-break-before: always; }
        }
        /* Ensure exact background colors are preserved */
        .bg-gradient-to-br {
            background: linear-gradient(to bottom right, #1e3a5f, #2d5a87);
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
        .text-\[\#00D4AA\] {
            color: #00D4AA;
        }
        .text-\[\#FFD700\] {
            color: #FFD700;
        }
        .bg-\[\#00D4AA\] {
            background-color: #00D4AA;
        }
        .bg-\[\#FFD700\] {
            background-color: #FFD700;
        }
        .bg-\[\#FF6B35\] {
            background-color: #FF6B35;
        }
        .bg-\[\#E55533\] {
            background-color: #E55533;
        }
        .text-\[\#1e3a5f\] {
            color: #1e3a5f;
        }
        .text-white {
            color: #ffffff;
        }
        .accent-\[\#FFD700\] {
            accent-color: #FFD700;
        }
    </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white p-5">
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
    a.download = `exclusive-right-to-sell-${today || 'document'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white p-5">
      <div className="max-w-3xl mx-auto exclusive-right-to-sell">
        {/* Header */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-10 text-center backdrop-blur-md mb-8">
          <div className="w-16 h-16 bg-[#FF6B35] rounded-lg flex items-center justify-center text-2xl font-bold mx-auto mb-5">
            🏠
          </div>
          <h1 className="text-[2.2em] mb-5 text-[#00D4AA]">
            Exclusive Right to Sell Listing Agreement
          </h1>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-br from-[#FF6B35] to-[#E55533] text-white p-5 rounded-xl mb-8 font-bold text-center">
          <strong>IMPORTANT LEGAL DISCLAIMER:</strong> This template is for
          informational purposes only and does not constitute legal advice.
          Consult with a qualified real estate attorney before use.
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Property & Party Information */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold mb-4 border-b-2 border-[#00D4AA] pb-1">
              Property &amp; Party Information
            </div>
            <div className="flex flex-col mb-5">
              <label className="text-[#FFD700] font-bold mb-2">
                Property Address:
              </label>
              <input
                type="text"
                placeholder="Full property address"
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Seller(s):
                </label>
                <input
                  type="text"
                  placeholder="Seller name(s)"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">Agent:</label>
                <input
                  type="text"
                  placeholder="Listing agent name"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Brokerage:
                </label>
                <input
                  type="text"
                  placeholder="Brokerage name"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                />
              </div>
            </div>
          </div>

          {/* Listing Details */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold mb-4 border-b-2 border-[#00D4AA] pb-1">
              Listing Details
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Listing Price:
                </label>
                <input
                  type="text"
                  placeholder="0"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                  onChange={(e) => {
                    let val = e.target.value.replace(/,/g, "");
                    if (!isNaN(Number(val)) && val !== "") {
                      e.target.value = Number(val).toLocaleString();
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Commission Rate (%):
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  min="0"
                  max="100"
                  step="0.01"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Listing Period From:
                </label>
                <input
                  type="date"
                  defaultValue={today}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Listing Period To:
                </label>
                <input
                  type="date"
                  defaultValue={sixMonthsDate}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                />
              </div>
            </div>
          </div>

          {/* Seller Representations */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold mb-4 border-b-2 border-[#00D4AA] pb-1">
              Seller Representations
            </div>
            {[
              "Legal right to sell the property",
              "Property condition disclosures completed",
              "All material facts disclosed",
            ].map((label, i) => (
              <div className="flex items-center my-2" key={i}>
                <input
                  type="checkbox"
                  defaultChecked
                  className="mr-2 scale-125 accent-[#FFD700]"
                />
                <label>{label}</label>
              </div>
            ))}
          </div>

          {/* Agent Services */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold mb-4 border-b-2 border-[#00D4AA] pb-1">
              Agent Services
            </div>
            {[
              "MLS listing and marketing",
              "Property showings coordination",
              "Marketing materials creation",
              "Negotiation and transaction management",
            ].map((label, i) => (
              <div className="flex items-center my-2" key={i}>
                <input
                  type="checkbox"
                  defaultChecked
                  className="mr-2 scale-125 accent-[#FFD700]"
                />
                <label>{label}</label>
              </div>
            ))}
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold mb-4 border-b-2 border-[#00D4AA] pb-1">
              Terms and Conditions
            </div>
            <div className="flex flex-col">
              <label className="text-[#FFD700] font-bold mb-2">
                Additional Terms &amp; Conditions:
              </label>
              <textarea
                placeholder="Standard terms to be customized per local requirements. Enter any additional terms, conditions, or special agreements..."
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60 min-h-[100px] resize-y"
              />
            </div>
          </div>

          {/* Marketing Strategy */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold mb-4 border-b-2 border-[#00D4AA] pb-1">
              Marketing Strategy
            </div>
            <div className="flex flex-col">
              <label className="text-[#FFD700] font-bold mb-2">
                Marketing Plan:
              </label>
              <textarea
                placeholder="Describe the marketing strategy, including online listings, advertising, open houses, etc."
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60 min-h-[100px] resize-y"
              />
            </div>
          </div>

          {/* Signatures */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold mb-4 border-b-2 border-[#00D4AA] pb-1">
              Signatures
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
              {/* Agent */}
              <div>
                <div className="flex flex-col mb-5">
                  <label className="text-[#FFD700] font-bold mb-2">
                    Agent Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Type your full name"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                  />
                </div>
                <div className="flex flex-col mb-5">
                  <label className="text-[#FFD700] font-bold mb-2">
                    Agent Signature:
                  </label>
                  <div className="border-t-2 border-[#FFD700] pt-2 text-center">
                    <div
                      className={`min-h-[40px] flex items-center justify-center font-[Brush_Script_MT] text-[1.5em] ${agentSigned
                          ? "text-[#00D4AA] border-b border-[#00D4AA]"
                          : "text-[#FFD700]"
                        }`}
                    >
                      {agentSigned
                        ? agentName
                        : 'Click "Sign" to add signature'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSign("agent")}
                    className={`mt-2 px-4 py-2 rounded-md font-bold transition-all duration-300 ${agentSigned
                        ? "bg-[#00D4AA] text-[#1e3a5f]"
                        : "bg-[#FFD700] text-[#1e3a5f] hover:bg-[#FFA500]"
                      }`}
                  >
                    {agentSigned ? "Re-sign" : "Sign as Agent"}
                  </button>
                </div>
                <div className="flex flex-col mt-5">
                  <label className="text-[#FFD700] font-bold mb-2">Date:</label>
                  <input
                    type="date"
                    value={agentDate}
                    onChange={(e) => setAgentDate(e.target.value)}
                    className="bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                  />
                </div>
              </div>

              {/* Seller */}
              <div>
                <div className="flex flex-col mb-5">
                  <label className="text-[#FFD700] font-bold mb-2">
                    Seller Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Type your full name"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                  />
                </div>
                <div className="flex flex-col mb-5">
                  <label className="text-[#FFD700] font-bold mb-2">
                    Seller Signature:
                  </label>
                  <div className="border-t-2 border-[#FFD700] pt-2 text-center">
                    <div
                      className={`min-h-[40px] flex items-center justify-center font-[Brush_Script_MT] text-[1.5em] ${sellerSigned
                          ? "text-[#00D4AA] border-b border-[#00D4AA]"
                          : "text-[#FFD700]"
                        }`}
                    >
                      {sellerSigned
                        ? sellerName
                        : 'Click "Sign" to add signature'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSign("seller")}
                    className={`mt-2 px-4 py-2 rounded-md font-bold transition-all duration-300 ${sellerSigned
                        ? "bg-[#00D4AA] text-[#1e3a5f]"
                        : "bg-[#FFD700] text-[#1e3a5f] hover:bg-[#FFA500]"
                      }`}
                  >
                    {sellerSigned ? "Re-sign" : "Sign as Seller"}
                  </button>
                </div>
                <div className="flex flex-col mt-5">
                  <label className="text-[#FFD700] font-bold mb-2">Date:</label>
                  <input
                    type="date"
                    value={sellerDate}
                    onChange={(e) => setSellerDate(e.target.value)}
                    className="bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="flex gap-4 justify-center mt-5">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-[#00D4AA] text-[#1e3a5f] px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Print Listing Agreement
            </button>
            <button
              type="button"
              onClick={downloadHTML}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Download HTML
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
