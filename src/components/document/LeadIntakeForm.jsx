import React, { useEffect } from "react";

export default function LeadIntakeForm() {
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const firstContact = document.getElementById("firstContactDate");
    const followup = document.getElementById("followupDate");

    if (firstContact) firstContact.value = today;
    if (followup) followup.value = tomorrow.toISOString().split("T")[0];
  }, []);

  const downloadHTML = () => {
    // Get the current component's HTML content
    const componentElement = document.querySelector('.lead-intake-form');
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
    <title>Lead Intake Form</title>
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
    </style>
</head>
<body class="min-h-screen p-5 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white leading-relaxed font-sans">
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
    a.download = `lead-intake-form-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-5 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white leading-relaxed font-sans">
      <div className="max-w-3xl mx-auto lead-intake-form">
        {/* Header */}
        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-10 mb-8 text-center">
          <div className="w-16 h-16 bg-[#FF6B35] rounded-lg mx-auto mb-5 flex items-center justify-center font-bold text-2xl">
            👥
          </div>
          <h1 className="text-4xl font-bold text-[#00D4AA]">
            Lead Intake Form
          </h1>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-br from-[#FF6B35] to-[#E55533] text-white p-5 rounded-xl mb-8 font-bold text-center">
          <strong>CONFIDENTIAL:</strong> This form contains sensitive client
          information. Handle according to privacy policies and regulations.
        </div>

        {/* Form */}
        <form id="leadIntakeForm" className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 space-y-5">
            <div className="text-[#00D4AA] text-xl font-semibold border-b-2 border-[#00D4AA] pb-1.5 mb-4">
              Contact Information
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="text-[#FFD700] font-bold mb-2"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  required
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="text-[#FFD700] font-bold mb-2"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  required
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="text-[#FFD700] font-bold mb-2"
                >
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="(000) 000-0000"
                  required
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
                />
              </div>
              <div className="flex-col flex">
                <label
                  htmlFor="email"
                  className="text-[#FFD700] font-bold mb-2"
                >
                  Email Address:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="email@example.com"
                  required
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="currentAddress"
                className="text-[#FFD700] font-bold mb-2"
              >
                Current Address:
              </label>
              <input
                type="text"
                id="currentAddress"
                placeholder="Current residential address"
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
              />
            </div>
          </div>

          {/* Lead Source & Agent */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 space-y-5">
            <div className="text-[#00D4AA] text-xl font-semibold border-b-2 border-[#00D4AA] pb-1.5 mb-4">
              Lead Source & Agent
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label
                  htmlFor="leadSource"
                  className="text-[#FFD700] font-bold mb-2"
                >
                  Lead Source:
                </label>
                <select
                  id="leadSource"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                >
                  <option value="">Select source</option>
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="social-media">Social Media</option>
                  <option value="open-house">Open House</option>
                  <option value="zillow">Zillow</option>
                  <option value="realtor-com">Realtor.com</option>
                  <option value="coldcall">Cold Call</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="assignedAgent"
                  className="text-[#FFD700] font-bold mb-2"
                >
                  Assigned Agent:
                </label>
                <input
                  type="text"
                  id="assignedAgent"
                  placeholder="Agent name"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="firstContactDate"
                  className="text-[#FFD700] font-bold mb-2"
                >
                  Date of First Contact:
                </label>
                <input
                  type="date"
                  id="firstContactDate"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                />
              </div>
            </div>
          </div>

          {/* Client Type & Goals */}
          <div className="bg-white/10 border border-white/20 backdrop-filter backdrop-blur-lg rounded-xl p-6 space-y-5">
            <div className="text-[#00D4AA] text-xl font-semibold border-b-2 border-[#00D4AA] pb-1.5 mb-4">
              Client Type & Goals
            </div>

            <div className="flex flex-col">
              <label className="text-[#FFD700] font-bold mb-2">
                Client Type:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["buyer", "seller", "both", "investor"].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="clientType"
                      value={type}
                      className="scale-125"
                    />
                    <span className="capitalize">{type.replace("-", " ")}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[#FFD700] font-bold mb-2">Timeline:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="timeline"
                    value="immediate"
                    className="scale-125"
                  />
                  <span>Immediate (0-30 days)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="timeline"
                    value="short-term"
                    className="scale-125"
                  />
                  <span>Short-term (1-3 months)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="timeline"
                    value="medium-term"
                    className="scale-125"
                  />
                  <span>Medium-term (3-6 months)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="timeline"
                    value="long-term"
                    className="scale-125"
                  />
                  <span>Long-term (6+ months)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Property Preferences */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 space-y-5">
            <div className="text-[#00D4AA] text-xl font-semibold border-b-2 border-[#00D4AA] pb-1.5 mb-4">
              Property Preferences (For Buyers)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label
                  htmlFor="priceRange"
                  className="text-[#FFD700] font-bold mb-2"
                >
                  Price Range:
                </label>
                <input
                  type="text"
                  id="priceRange"
                  placeholder="$000,000 - $000,000"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="propertyType"
                  className="text-[#FFD700] font-bold mb-2"
                >
                  Property Type:
                </label>
                <select
                  id="propertyType"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                >
                  <option value="">Select type</option>
                  <option value="single-family">Single Family Home</option>
                  <option value="condo">Condominium</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="multi-family">Multi-Family</option>
                  <option value="land">Land/Lot</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="bedrooms"
                  className="text-[#FFD700] font-bold mb-2"
                >
                  Bedrooms:
                </label>
                <select
                  id="bedrooms"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="bathrooms"
                  className="text-[#FFD700] font-bold mb-2"
                >
                  Bathrooms:
                </label>
                <select
                  id="bathrooms"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="1.5">1.5+</option>
                  <option value="2">2+</option>
                  <option value="2.5">2.5+</option>
                  <option value="3">3+</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="preferredAreas"
                className="text-[#FFD700] font-bold mb-2"
              >
                Preferred Areas/Neighborhoods:
              </label>
              <input
                type="text"
                id="preferredAreas"
                placeholder="List preferred neighborhoods or areas"
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="mustHaveFeatures"
                className="text-[#FFD700] font-bold mb-2"
              >
                Must-Have Features:
              </label>
              <textarea
                id="mustHaveFeatures"
                placeholder="List essential features (garage, pool, etc.)"
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base min-h-[100px] resize-y"
              />
            </div>
          </div>

          {/* Seller Information */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 space-y-5">
            <div className="text-[#00D4AA] text-xl font-semibold border-b-2 border-[#00D4AA] pb-1.5 mb-4">
              Seller Information
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="sellPropertyAddress"
                className="text-[#FFD700] font-bold mb-2"
              >
                Property to Sell Address:
              </label>
              <input
                type="text"
                id="sellPropertyAddress"
                placeholder="Address of property to sell"
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label
                  htmlFor="estimatedValue"
                  className="text-[#FFD700] font-bold mb-2"
                >
                  Estimated Value:
                </label>
                <input
                  type="text"
                  id="estimatedValue"
                  placeholder="$000,000"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="mortgageBalance"
                  className="text-[#FFD700] font-bold mb-2"
                >
                  Mortgage Balance:
                </label>
                <input
                  type="text"
                  id="mortgageBalance"
                  placeholder="$000,000"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="sellingReason"
                className="text-[#FFD700] font-bold mb-2"
              >
                Reason for Selling:
              </label>
              <textarea
                id="sellingReason"
                placeholder="Why are you selling?"
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base min-h-[100px] resize-y"
              />
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 space-y-5">
            <div className="text-[#00D4AA] text-xl font-semibold border-b-2 border-[#00D4AA] pb-1.5 mb-4">
              Financial Information
            </div>

            <div className="flex flex-col">
              <label className="text-[#FFD700] font-bold mb-2">
                Pre-approval Status:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="preapproval"
                    value="preapproved"
                    className="scale-125"
                  />
                  <span>Pre-approved</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="preapproval"
                    value="not-preapproved"
                    className="scale-125"
                  />
                  <span>Not pre-approved</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="preapproval"
                    value="cash-buyer"
                    className="scale-125"
                  />
                  <span>Cash buyer</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="preferredLender"
                className="text-[#FFD700] font-bold mb-2"
              >
                Preferred Lender:
              </label>
              <input
                type="text"
                id="preferredLender"
                placeholder="Name of preferred lender (if any)"
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
              />
            </div>
          </div>

          {/* Communication Preferences */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 space-y-5">
            <div className="text-[#00D4AA] text-xl font-semibold border-b-2 border-[#00D4AA] pb-1.5 mb-4">
              Communication Preferences
            </div>

            <div className="flex flex-col space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" id="contactPhone" />
                <span>Phone</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" id="contactEmail" />
                <span>Email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" id="contactText" />
                <span>Text Message</span>
              </label>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="bestContactTime"
                className="text-[#FFD700] font-bold mb-2"
              >
                Best Time to Contact:
              </label>
              <input
                type="text"
                id="bestContactTime"
                placeholder="Morning, afternoon, evening, specific times"
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 space-y-5">
            <div className="text-[#00D4AA] text-xl font-semibold border-b-2 border-[#00D4AA] pb-1.5 mb-4">
              Additional Information
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="referralSource"
                className="text-[#FFD700] font-bold mb-2"
              >
                How did you hear about us?
              </label>
              <input
                type="text"
                id="referralSource"
                placeholder="Referral details, advertisement, etc."
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder:text-white/60"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#FFD700] font-bold mb-2">
                Previous Real Estate Experience:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="experience"
                    value="first-time"
                    className="scale-125"
                  />
                  <span>First-time buyer/seller</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="experience"
                    value="experienced"
                    className="scale-125"
                  />
                  <span>Experienced</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="additionalNotes"
                className="text-[#FFD700] font-bold mb-2"
              >
                Additional Notes:
              </label>
              <textarea
                id="additionalNotes"
                placeholder="Any additional information, questions, or concerns"
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base min-h-[100px] resize-y"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="followupDate"
                className="text-[#FFD700] font-bold mb-2"
              >
                Follow-up Date:
              </label>
              <input
                type="date"
                id="followupDate"
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
              />
            </div>
          </div>

          {/* Print Button */}
          <div className="flex gap-4 justify-center mt-5">
            <button
              type="button"
              onClick={() => window.print()}
              className="bg-[#00D4AA] text-[#1e3a5f] font-bold text-lg px-6 py-3 rounded-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Print Lead Form
            </button>
            <button
              type="button"
              onClick={downloadHTML}
              className="bg-blue-500 text-white font-bold text-lg px-6 py-3 rounded-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Download HTML
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
