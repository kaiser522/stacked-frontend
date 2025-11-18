import React, { useState, useEffect } from "react";

export default function PropertyDisclosureStatement() {
  const today = new Date().toISOString().split("T")[0];
  const [propertyAddress, setPropertyAddress] = useState("");
  const [sellerNames, setSellerNames] = useState("");
  const [disclosureDate, setDisclosureDate] = useState(today);

  const [structural, setStructural] = useState("");
  const [structuralDetails, setStructuralDetails] = useState("");
  const [repairs, setRepairs] = useState("");
  const [repairsDetails, setRepairsDetails] = useState("");

  const [water, setWater] = useState("");
  const [waterDetails, setWaterDetails] = useState("");
  const [plumbing, setPlumbing] = useState("");
  const [plumbingDetails, setPlumbingDetails] = useState("");

  const [electrical, setElectrical] = useState("");
  const [electricalDetails, setElectricalDetails] = useState("");
  const [hvac, setHvac] = useState("");
  const [hvacDetails, setHvacDetails] = useState("");

  const [environmental, setEnvironmental] = useState("");
  const [environmentalDetails, setEnvironmentalDetails] = useState("");
  const [testing, setTesting] = useState("");
  const [testingDetails, setTestingDetails] = useState("");

  const [additionalDisclosures, setAdditionalDisclosures] = useState("");

  const [sellerSignatureName, setSellerSignatureName] = useState("");
  const [sellerSigned, setSellerSigned] = useState(false);
  const [sellerSignDate, setSellerSignDate] = useState(today);

  const handleSignSeller = () => {
    if (!sellerSignatureName.trim()) {
      alert("Please enter your full name before signing.");
      return;
    }
    setSellerSigned(true);
    if (!sellerSignDate) setSellerSignDate(today);
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadHTML = () => {
    // Get the current component's HTML content
    const componentElement = document.querySelector('.property-disclosure-statement');
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
    <title>Property Disclosure Statement</title>
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
    a.download = `property-disclosure-statement-${disclosureDate || 'document'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    setDisclosureDate(today);
    setSellerSignDate(today);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white p-5">
      <div className="max-w-3xl mx-auto property-disclosure-statement">
        {/* Header */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-10 text-center backdrop-blur-md mb-8">
          <div className="w-16 h-16 bg-[#FF6B35] rounded-lg flex items-center justify-center text-2xl font-bold mx-auto mb-5">
            📋
          </div>
          <h1 className="text-[2.2em] mb-5 text-[#00D4AA]">
            Property Disclosure Statement
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
          {/* Property Information */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold mb-4 border-b-2 border-[#00D4AA] pb-1">
              Property Information
            </div>
            <div className="flex flex-col mb-5">
              <label className="text-[#FFD700] font-bold mb-2">
                Property Address:
              </label>
              <input
                type="text"
                required
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                placeholder="Full property address"
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Seller Name(s):
                </label>
                <input
                  type="text"
                  required
                  value={sellerNames}
                  onChange={(e) => setSellerNames(e.target.value)}
                  placeholder="Full legal name(s)"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Date of Disclosure:
                </label>
                <input
                  type="date"
                  required
                  value={disclosureDate}
                  onChange={(e) => setDisclosureDate(e.target.value)}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                />
              </div>
            </div>
          </div>

          {/* Disclosure Sections */}
          {[
            {
              title: "Structural & Foundation",
              items: [
                {
                  id: "structural",
                  question:
                    "Are you aware of any structural defects or issues with the foundation?",
                  value: structural,
                  setValue: setStructural,
                  details: structuralDetails,
                  setDetails: setStructuralDetails,
                  placeholder: "If yes, please explain in detail...",
                },
                {
                  id: "repairs",
                  question:
                    "Have there been any repairs to the foundation, basement, or structural elements?",
                  value: repairs,
                  setValue: setRepairs,
                  details: repairsDetails,
                  setDetails: setRepairsDetails,
                  placeholder: "If yes, describe repairs and dates...",
                },
              ],
            },
            {
              title: "Water & Plumbing",
              items: [
                {
                  id: "water",
                  question:
                    "Are you aware of any water damage, flooding, or leaks?",
                  value: water,
                  setValue: setWater,
                  details: waterDetails,
                  setDetails: setWaterDetails,
                  placeholder:
                    "If yes, provide details including dates and remediation...",
                },
                {
                  id: "plumbing",
                  question:
                    "Are you aware of any issues with plumbing systems?",
                  value: plumbing,
                  setValue: setPlumbing,
                  details: plumbingDetails,
                  setDetails: setPlumbingDetails,
                  placeholder: "If yes, describe plumbing issues...",
                },
              ],
            },
            {
              title: "Electrical & HVAC",
              items: [
                {
                  id: "electrical",
                  question:
                    "Are you aware of any electrical system problems or code violations?",
                  value: electrical,
                  setValue: setElectrical,
                  details: electricalDetails,
                  setDetails: setElectricalDetails,
                  placeholder: "If yes, describe electrical issues...",
                },
                {
                  id: "hvac",
                  question:
                    "Are you aware of any heating, ventilation, or air conditioning problems?",
                  value: hvac,
                  setValue: setHvac,
                  details: hvacDetails,
                  setDetails: setHvacDetails,
                  placeholder: "If yes, describe HVAC issues...",
                },
              ],
            },
            {
              title: "Environmental & Health",
              items: [
                {
                  id: "environmental",
                  question:
                    "Are you aware of any environmental hazards (asbestos, lead paint, mold, radon, etc.)?",
                  value: environmental,
                  setValue: setEnvironmental,
                  details: environmentalDetails,
                  setDetails: setEnvironmentalDetails,
                  placeholder: "If yes, specify type and provide details...",
                },
                {
                  id: "testing",
                  question:
                    "Has the property been tested for any environmental hazards?",
                  value: testing,
                  setValue: setTesting,
                  details: testingDetails,
                  setDetails: setTestingDetails,
                  placeholder:
                    "If yes, specify what testing was done and results...",
                },
              ],
            },
          ].map((section, idx) => (
            <div
              key={idx}
              className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md mb-6"
            >
              <div className="text-[#00D4AA] text-xl font-bold mb-4 border-b-2 border-[#00D4AA] pb-1">
                {section.title}
              </div>
              {section.items.map((item, j) => (
                <div
                  key={j}
                  className="bg-white/5 border-l-4 border-[#FFD700] rounded-lg p-4 mb-4"
                >
                  <div className="text-[#FFD700] font-bold mb-2 text-[1.05em]">
                    {item.question}
                  </div>
                  <div className="flex flex-wrap gap-5 my-2">
                    {["yes", "no", "unknown"].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={item.id}
                          value={opt}
                          checked={item.value === opt}
                          onChange={(e) => item.setValue(e.target.value)}
                          className="scale-125 accent-[#FFD700]"
                        />
                        <span>
                          {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                  <textarea
                    placeholder={item.placeholder}
                    value={item.details}
                    onChange={(e) => item.setDetails(e.target.value)}
                    className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60 min-h-[100px] resize-y w-full"
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Additional Disclosures */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md mb-6">
            <div className="text-[#00D4AA] text-xl font-bold mb-4 border-b-2 border-[#00D4AA] pb-1">
              Additional Disclosures
            </div>
            <div className="flex flex-col">
              <label className="text-[#FFD700] font-bold mb-2">
                Other Material Facts or Defects:
              </label>
              <textarea
                placeholder="Please disclose any other material facts or defects that could affect the property's value or desirability..."
                value={additionalDisclosures}
                onChange={(e) => setAdditionalDisclosures(e.target.value)}
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60 min-h-[100px] resize-y"
              />
            </div>
          </div>

          {/* Seller Certification */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold mb-4 border-b-2 border-[#00D4AA] pb-1">
              Seller Certification
            </div>
            <div className="flex flex-col mb-5">
              <label className="text-[#FFD700] font-bold mb-2">
                Seller Name:
              </label>
              <input
                type="text"
                placeholder="Type your full name"
                value={sellerSignatureName}
                onChange={(e) => setSellerSignatureName(e.target.value)}
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
                    ? sellerSignatureName
                    : 'Click "Sign" to add signature'}
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignSeller}
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
                value={sellerSignDate}
                onChange={(e) => setSellerSignDate(e.target.value)}
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white"
              />
            </div>
            <div className="flex flex-col mt-6 p-5 bg-white/5 rounded-lg">
              <p className="text-sm leading-relaxed">
                I certify that the information provided in this disclosure
                statement is true and complete to the best of my knowledge as of
                the date signed. I understand that this disclosure statement is
                designed to assist the buyer in making an informed decision and
                that I may be liable for any material misrepresentation or
                omission.
              </p>
            </div>
          </div>

          {/* Print Button */}
          <div className="flex gap-4 justify-center mt-5">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-[#00D4AA] text-[#1e3a5f] px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Print Disclosure Statement
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
