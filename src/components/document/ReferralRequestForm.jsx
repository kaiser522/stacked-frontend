import { useState } from "react";

export default function ReferralRequestForm() {
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    referrerPhone: "",
    referralName: "",
    referralEmail: "",
    referralPhone: "",
    relationship: "",
    referralNeed: "",
    timeline: "",
    location: "",
    priceRange: "",
    additionalDetails: "",
    contactMethod: "",
    contactTime: "",
    mentioned: "",
    specialMessage: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handlePhoneChange = (id, value) => {
    let digits = value.replace(/\D/g, "");
    if (digits.length >= 6) {
      digits = digits.replace(/(\d{3})(\d{3})(\d{0,4}).*/, "($1) $2-$3");
    } else if (digits.length >= 3) {
      digits = digits.replace(/(\d{3})(\d{0,3})/, "($1) $2");
    }
    setFormData((prev) => ({ ...prev, [id]: digits }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "referrerName",
      "referrerEmail",
      "referralName",
      "referralNeed",
    ];
    const missing = requiredFields.filter((f) => !formData[f]);
    if (missing.length > 0) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(
      "Thank you for the referral! We will reach out to them soon and keep you updated. We truly appreciate you thinking of us!"
    );
  };

  const downloadHTML = () => {
    // Get the current component's HTML content
    const componentElement = document.querySelector('.referral-request-form');
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
    <title>Referral Request</title>
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
    a.download = `referral-request-form-${formData.referralName || 'document'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white p-5">
      <div className="max-w-3xl mx-auto referral-request-form">
        {/* Header */}
        <div className="bg-white/10 rounded-2xl p-10 mb-8 border border-white/20 backdrop-blur-md text-center">
          <div className="w-16 h-16 bg-[#FF6B35] rounded-lg mx-auto mb-5 flex items-center justify-center text-2xl font-bold">
            🤝
          </div>
          <h1 className="text-4xl font-bold text-[#00D4AA]">
            Referral Request
          </h1>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-br from-[#FF6B35] to-[#E55533] text-white p-5 rounded-xl mb-8 font-bold text-center">
          <strong>REFER A FRIEND:</strong> Know someone looking to buy or sell?
          We'd love to help them too!
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your Information */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold border-b-2 border-[#00D4AA] pb-1 mb-4">
              Your Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Your Name:
                </label>
                <input
                  type="text"
                  id="referrerName"
                  value={formData.referrerName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Your Email:
                </label>
                <input
                  type="email"
                  id="referrerEmail"
                  value={formData.referrerEmail}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Your Phone:
                </label>
                <input
                  type="tel"
                  id="referrerPhone"
                  value={formData.referrerPhone}
                  onChange={(e) =>
                    handlePhoneChange("referrerPhone", e.target.value)
                  }
                  placeholder="(000) 000-0000"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                />
              </div>
            </div>
          </div>

          {/* Person You're Referring */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold border-b-2 border-[#00D4AA] pb-1 mb-4">
              Person You're Referring
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Referral Name:
                </label>
                <input
                  type="text"
                  id="referralName"
                  value={formData.referralName}
                  onChange={handleChange}
                  placeholder="Person's full name"
                  required
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Referral Email:
                </label>
                <input
                  type="email"
                  id="referralEmail"
                  value={formData.referralEmail}
                  onChange={handleChange}
                  placeholder="their@email.com"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Referral Phone:
                </label>
                <input
                  type="tel"
                  id="referralPhone"
                  value={formData.referralPhone}
                  onChange={(e) =>
                    handlePhoneChange("referralPhone", e.target.value)
                  }
                  placeholder="(000) 000-0000"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Relationship to You:
                </label>
                <select
                  id="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                >
                  <option value="">Select relationship</option>
                  <option value="family">Family Member</option>
                  <option value="friend">Friend</option>
                  <option value="coworker">Coworker</option>
                  <option value="neighbor">Neighbor</option>
                  <option value="acquaintance">Acquaintance</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Referral Details */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold border-b-2 border-[#00D4AA] pb-1 mb-4">
              Referral Details
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  What are they looking to do?
                </label>
                <select
                  id="referralNeed"
                  value={formData.referralNeed}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                >
                  <option value="">Select option</option>
                  <option value="buy">Buy a home</option>
                  <option value="sell">Sell a home</option>
                  <option value="both">Buy and sell</option>
                  <option value="rent">Rent a property</option>
                  <option value="investment">Investment property</option>
                  <option value="commercial">Commercial real estate</option>
                  <option value="consultation">General consultation</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Timeline:
                </label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (0-30 days)</option>
                  <option value="short-term">1-3 months</option>
                  <option value="medium-term">3-6 months</option>
                  <option value="long-term">6+ months</option>
                  <option value="exploring">Just exploring options</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Location of Interest:
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, neighborhood, or area"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Price Range (if buying):
                </label>
                <input
                  type="text"
                  id="priceRange"
                  value={formData.priceRange}
                  onChange={handleChange}
                  placeholder="$000,000 - $000,000"
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white placeholder-white/60"
                />
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <label className="text-[#FFD700] font-bold mb-2">
                Additional Details:
              </label>
              <textarea
                id="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                placeholder="Tell us more about their situation..."
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white min-h-[100px] resize-y"
              />
            </div>
          </div>

          {/* Contact Preferences */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold border-b-2 border-[#00D4AA] pb-1 mb-4">
              Contact Preferences
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Best way to contact them:
                </label>
                <select
                  id="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                >
                  <option value="">Select method</option>
                  <option value="phone">Phone call</option>
                  <option value="email">Email</option>
                  <option value="text">Text message</option>
                  <option value="any">Any method is fine</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[#FFD700] font-bold mb-2">
                  Best time to contact:
                </label>
                <select
                  id="contactTime"
                  value={formData.contactTime}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (8AM-12PM)</option>
                  <option value="afternoon">Afternoon (12PM-5PM)</option>
                  <option value="evening">Evening (5PM-8PM)</option>
                  <option value="weekends">Weekends</option>
                  <option value="anytime">Anytime</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <label className="text-[#FFD700] font-bold mb-2">
                Have you mentioned our services to them?
              </label>
              <select
                id="mentioned"
                value={formData.mentioned}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white"
              >
                <option value="">Select answer</option>
                <option value="yes">Yes, they're expecting contact</option>
                <option value="no">No, please mention I referred them</option>
                <option value="surprise">I want to surprise them</option>
              </select>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-md">
            <div className="text-[#00D4AA] text-xl font-bold border-b-2 border-[#00D4AA] pb-1 mb-4">
              Thank You Message
            </div>
            <div className="flex flex-col">
              <label className="text-[#FFD700] font-bold mb-2">
                Special message or notes:
              </label>
              <textarea
                id="specialMessage"
                value={formData.specialMessage}
                onChange={handleChange}
                placeholder="Any special message you'd like us to include..."
                className="bg-white/10 border border-white/30 rounded-lg p-3 text-white min-h-[100px] resize-y"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-[#00D4AA] text-[#1e3a5f] px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Submit Referral
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
