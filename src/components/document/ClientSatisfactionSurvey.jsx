import { useState, useEffect } from "react";

export default function ClientSatisfactionSurvey() {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    clientName: "",
    email: "",
    transactionDate: today,
    transactionType: "",
    propertyAddress: "",
    positives: "",
    improvements: "",
    comments: "",
    useAgain: "",
    followUp: "yes",
  });

  const [ratings, setRatings] = useState({
    overall: "",
    communication: "",
    expertise: "",
    responsiveness: "",
    professionalism: "",
    recommend: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (name, value) => {
    setRatings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.clientName.trim() || !form.transactionType) {
      alert("Please fill in all required fields.");
      return;
    }
    alert("Thank you for your valuable feedback! We appreciate your time.");
  };

  const downloadHTML = () => {
    // Get the current component's HTML content
    const componentElement = document.querySelector('.client-satisfaction-survey');
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
    <title>Client Satisfaction Survey</title>
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
    a.download = `client-satisfaction-survey-${form.transactionDate || 'document'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white p-5">
      <div className="max-w-3xl mx-auto client-satisfaction-survey">
        {/* Header */}
        <div className="text-center mb-8 p-10 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-5 rounded-lg bg-orange-500 flex items-center justify-center text-2xl font-bold">
            ⭐
          </div>
          <h1 className="text-4xl font-bold text-emerald-400 mb-3">
            Client Satisfaction Survey
          </h1>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 rounded-xl mb-8 font-bold text-center">
          YOUR FEEDBACK MATTERS: Help us improve our service by sharing your
          experience with us.
        </div>

        <form className="space-y-6">
          {/* Client Info */}
          <FormSection title="Client Information">
            <div className="grid sm:grid-cols-2 gap-5">
              <FormGroup label="Client Name:">
                <input
                  id="clientName"
                  value={form.clientName}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                  placeholder="Your name"
                />
              </FormGroup>
              <FormGroup label="Email Address:">
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                  placeholder="email@example.com"
                />
              </FormGroup>
              <FormGroup label="Transaction Date:">
                <input
                  id="transactionDate"
                  type="date"
                  value={form.transactionDate}
                  onChange={handleChange}
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                />
              </FormGroup>
              <FormGroup label="Transaction Type:">
                <select
                  id="transactionType"
                  value={form.transactionType}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                >
                  <option value="">Select type</option>
                  <option value="purchase">Purchase</option>
                  <option value="sale">Sale</option>
                  <option value="lease">Lease</option>
                  <option value="consultation">Consultation</option>
                </select>
              </FormGroup>
            </div>
            <FormGroup label="Property Address:">
              <input
                id="propertyAddress"
                value={form.propertyAddress}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
                placeholder="Property address"
              />
            </FormGroup>
          </FormSection>

          {/* Service Rating */}
          <FormSection title="Service Rating">
            <RatingGroup
              name="overall"
              label="Overall satisfaction with our service:"
              value={ratings.overall}
              onChange={handleRadioChange}
              options={[
                "Excellent",
                "Good",
                "Average",
                "Below Average",
                "Poor",
              ]}
            />
            <RatingGroup
              name="communication"
              label="Communication throughout the process:"
              value={ratings.communication}
              onChange={handleRadioChange}
              options={[
                "Excellent",
                "Good",
                "Average",
                "Below Average",
                "Poor",
              ]}
            />
            <RatingGroup
              name="expertise"
              label="Knowledge and expertise:"
              value={ratings.expertise}
              onChange={handleRadioChange}
              options={[
                "Excellent",
                "Good",
                "Average",
                "Below Average",
                "Poor",
              ]}
            />
            <RatingGroup
              name="responsiveness"
              label="Responsiveness to your needs:"
              value={ratings.responsiveness}
              onChange={handleRadioChange}
              options={[
                "Excellent",
                "Good",
                "Average",
                "Below Average",
                "Poor",
              ]}
            />
            <RatingGroup
              name="professionalism"
              label="Professionalism and integrity:"
              value={ratings.professionalism}
              onChange={handleRadioChange}
              options={[
                "Excellent",
                "Good",
                "Average",
                "Below Average",
                "Poor",
              ]}
            />
          </FormSection>

          {/* Feedback */}
          <FormSection title="Specific Feedback">
            <FormGroup label="What did we do well?">
              <textarea
                id="positives"
                value={form.positives}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
                placeholder="Please share what aspects you were most satisfied with..."
              />
            </FormGroup>
            <FormGroup label="What could we improve?">
              <textarea
                id="improvements"
                value={form.improvements}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
                placeholder="Please share any suggestions..."
              />
            </FormGroup>
            <FormGroup label="Additional Comments:">
              <textarea
                id="comments"
                value={form.comments}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white min-h-[100px] resize-y"
                placeholder="Any other feedback..."
              />
            </FormGroup>
          </FormSection>

          {/* Recommendations */}
          <FormSection title="Recommendations">
            <RatingGroup
              name="recommend"
              label="How likely are you to recommend us to friends and family?"
              value={ratings.recommend}
              onChange={handleRadioChange}
              options={[
                "Very Likely",
                "Likely",
                "Neutral",
                "Unlikely",
                "Very Unlikely",
              ]}
            />
            <FormGroup label="Would you use our services again?">
              <select
                id="useAgain"
                value={form.useAgain}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
              >
                <option value="">Select answer</option>
                <option value="definitely">Definitely</option>
                <option value="probably">Probably</option>
                <option value="maybe">Maybe</option>
                <option value="probably-not">Probably not</option>
                <option value="definitely-not">Definitely not</option>
              </select>
            </FormGroup>
          </FormSection>

          {/* Follow-up */}
          <FormSection title="Follow-up">
            <FormGroup label="May we contact you regarding this feedback?">
              <select
                id="followUp"
                value={form.followUp}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
              >
                <option value="yes">Yes, you may contact me</option>
                <option value="no">No, keep this anonymous</option>
              </select>
            </FormGroup>
            <FormGroup label="Would you like to receive our market updates and newsletters?">
              <select
                id="newsletter"
                value={form.newsletter}
                onChange={handleChange}
                className="bg-white/10 border border-white/30 rounded px-3 py-2 text-white"
              >
                <option value="">Select preference</option>
                <option value="yes">Yes, keep me informed</option>
                <option value="no">No, thank you</option>
              </select>
            </FormGroup>
          </FormSection>
        </form>

        {/* Submit */}
        <div className="flex gap-4 justify-center mt-10">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-emerald-400 text-slate-800 px-6 py-3 rounded-lg font-bold text-lg hover:-translate-y-1 transition"
          >
            Submit Survey
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

/* Reusable components */
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

function RatingGroup({ name, label, value, onChange, options }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white/5 p-4 rounded-lg my-3">
      <div className="text-white font-medium mb-2 sm:mb-0">{label}</div>
      <div className="flex gap-4">
        {options.map((opt, idx) => (
          <label
            key={idx}
            className="flex flex-col items-center text-center text-yellow-400 text-sm"
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={(e) => onChange(name, e.target.value)}
              className="h-4 w-4 mb-1 accent-emerald-400"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
