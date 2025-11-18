import { useState } from "react";

export default function HomeValuationForm() {
  const [formData, setFormData] = useState({
    propertyAddress: "",
    propertyType: "",
    squareFootage: "",
    bedrooms: "",
    bathrooms: "",
    yearBuilt: "",
    lotSize: "",
    garage: false,
    pool: false,
    fireplace: false,
    deck: false,
    finishedBasement: false,
    updatedKitchen: false,
    improvements: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactTime: "anytime",
    reason: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length >= 3) {
      value = value.replace(/(\d{3})(\d{0,3})/, "($1) $2");
    }
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "propertyAddress",
      "propertyType",
      "firstName",
      "lastName",
      "email",
      "phone",
    ];
    const missing = requiredFields.filter((f) => !formData[f]);
    if (missing.length > 0) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(
      "Thank you! Your home valuation request has been submitted. We will contact you within 24 hours with your complimentary market analysis."
    );
    // Reset if needed
    // setFormData({...initial state...});
  };

  const downloadHTML = () => {
    // Get the current component's HTML content
    const componentElement = document.querySelector('.home-valuation-form');
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
    <title>Home Valuation Request</title>
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
    a.download = `home-valuation-form-${formData.propertyAddress || 'document'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white p-5">
      <div className="max-w-3xl mx-auto home-valuation-form">
        {/* Header */}
        <div className="bg-white/10 rounded-2xl p-10 mb-8 border border-white/20 backdrop-blur-md text-center">
          <div className="w-16 h-16 bg-[#FF6B35] rounded-lg mx-auto mb-5 flex items-center justify-center text-2xl font-bold">
            💰
          </div>
          <h1 className="text-4xl font-bold text-[#00D4AA]">
            Home Valuation Request
          </h1>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-br from-[#FF6B35] to-[#E55533] text-white p-5 rounded-xl mb-8 font-bold text-center">
          <strong>FREE HOME VALUATION:</strong> Get your property's current
          market value with a professional comparative market analysis.
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Info */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold border-b-2 border-[#00D4AA] pb-1 mb-4">
              Property Information
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-[#FFD700] font-bold mb-2">
                Property Address:
              </label>
              <input
                type="text"
                id="propertyAddress"
                placeholder="Full property address"
                required
                value={formData.propertyAddress}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base placeholder-white/60"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Property Type:
                </label>
                <select
                  id="propertyType"
                  required
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                >
                  <option value="">Select type</option>
                  <option value="single-family">Single Family Home</option>
                  <option value="condo">Condominium</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="multi-family">Multi-Family</option>
                  <option value="manufactured">Manufactured Home</option>
                  <option value="land">Land/Vacant Lot</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Square Footage:
                </label>
                <input
                  type="number"
                  id="squareFootage"
                  placeholder="0"
                  min="0"
                  value={formData.squareFootage}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Bedrooms:
                </label>
                <select
                  id="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6+">6+</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Bathrooms:
                </label>
                <select
                  id="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="3.5">3.5</option>
                  <option value="4+">4+</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Year Built:
                </label>
                <input
                  type="number"
                  id="yearBuilt"
                  placeholder="1990"
                  min="1800"
                  max="2025"
                  value={formData.yearBuilt}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Lot Size:
                </label>
                <input
                  type="text"
                  id="lotSize"
                  placeholder="0.25 acres or 10,000 sq ft"
                  value={formData.lotSize}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                />
              </div>
            </div>
          </div>

          {/* Property Features */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold border-b-2 border-[#00D4AA] pb-1 mb-4">
              Property Features
            </div>

            <div className="flex flex-col space-y-3">
              {[
                { id: "garage", label: "Garage" },
                { id: "pool", label: "Pool" },
                { id: "fireplace", label: "Fireplace" },
                { id: "deck", label: "Deck/Patio" },
                { id: "finishedBasement", label: "Finished Basement" },
                { id: "updatedKitchen", label: "Updated Kitchen" },
              ].map((item) => (
                <label key={item.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={formData[item.id]}
                    onChange={handleChange}
                    className="scale-110"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>

            <div className="flex flex-col mt-5">
              <label className="text-[#FFD700] font-bold mb-2">
                Recent Improvements or Renovations:
              </label>
              <textarea
                id="improvements"
                placeholder="List any recent improvements, renovations, or upgrades..."
                value={formData.improvements}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base min-h-[100px] resize-y"
              ></textarea>
            </div>
          </div>

          {/* Condition & Timeline */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold border-b-2 border-[#00D4AA] pb-1 mb-4">
              Property Condition &amp; Timeline
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Overall Condition:
                </label>
                <select
                  id="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                >
                  <option value="">Select condition</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="needs-work">Needs Work</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Timeline to Sell:
                </label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediately</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="just-curious">Just curious about value</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold border-b-2 border-[#00D4AA] pb-1 mb-4">
              Contact Information
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Email Address:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="email@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="(000) 000-0000"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
                />
              </div>
            </div>

            <div className="flex flex-col mt-5">
              <label className="text-[#FFD700] font-bold mb-2">
                Best Time to Contact:
              </label>
              <select
                id="contactTime"
                value={formData.contactTime}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
              >
                <option value="anytime">Anytime</option>
                <option value="morning">Morning (8AM-12PM)</option>
                <option value="afternoon">Afternoon (12PM-5PM)</option>
                <option value="evening">Evening (5PM-8PM)</option>
                <option value="weekends">Weekends only</option>
              </select>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold border-b-2 border-[#00D4AA] pb-1 mb-4">
              Additional Information
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-[#FFD700] font-bold mb-2">
                Reason for Valuation:
              </label>
              <select
                id="reason"
                value={formData.reason}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base"
              >
                <option value="">Select reason</option>
                <option value="selling">Planning to sell</option>
                <option value="refinancing">Refinancing</option>
                <option value="taxes">Tax purposes</option>
                <option value="divorce">Divorce settlement</option>
                <option value="estate">Estate planning</option>
                <option value="curiosity">Just curious</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[#FFD700] font-bold mb-2">
                Additional Comments or Questions:
              </label>
              <textarea
                id="comments"
                placeholder="Any specific questions or additional information you'd like to share..."
                value={formData.comments}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white text-base min-h-[100px] resize-y"
              ></textarea>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-[#00D4AA] text-[#1e3a5f] px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Request Free Home Valuation
            </button>
            <button
              type="button"
              onClick={downloadHTML}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Download HTML
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
