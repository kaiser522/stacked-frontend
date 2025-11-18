import React, { useMemo, useState } from "react";

const templates = [
  {
    id: "luxury",
    name: "Luxury Listing",
    description: "Premium properties $1M+",
    icon: "💎",
    badge: "Popular",
    badgeClass: "bg-amber-500 text-white",
    gradient: "bg-gradient-to-br from-blue-900 via-blue-600 to-cyan-400",
  },
  {
    id: "standard",
    name: "Standard Listing",
    description: "Most residential properties",
    icon: "🏡",
    badge: "New",
    badgeClass: "bg-emerald-500 text-white",
    gradient: "bg-gradient-to-br from-emerald-600 via-emerald-500 to-lime-400",
  },
  {
    id: "investment",
    name: "Investment Property",
    description: "Income-producing properties",
    icon: "📊",
    badge: null,
    badgeClass: "",
    gradient: "bg-gradient-to-br from-red-600 via-orange-500 to-amber-300",
  },
];

const baseSections = [
  {
    id: "comps",
    label: "Comparable Sales Analysis",
    description: "Recent sales in the area",
    defaultChecked: true,
  },
  {
    id: "trends",
    label: "Market Trends",
    description: "Local market conditions",
    defaultChecked: true,
  },
  {
    id: "dom",
    label: "Days on Market Analysis",
    description: "Average DOM statistics",
    defaultChecked: true,
  },
  {
    id: "pps",
    label: "Price Per Square Foot",
    description: "Comparative pricing data",
    defaultChecked: true,
  },
  {
    id: "neighborhood",
    label: "Neighborhood Overview",
    description: "Area amenities and features",
    defaultChecked: false,
  },
  {
    id: "marketing-plan",
    label: "Marketing Plan",
    description: "Your comprehensive strategy",
    defaultChecked: false,
  },
];

const baseMarketing = [
  { id: "mls", label: "MLS Listing", defaultChecked: true },
  { id: "photos", label: "Professional Photos", defaultChecked: true },
  { id: "tour", label: "Virtual Tour", defaultChecked: true },
  { id: "social", label: "Social Media Campaign", defaultChecked: true },
  { id: "email", label: "Email Campaign", defaultChecked: false },
  { id: "open-house", label: "Open House Events", defaultChecked: false },
  { id: "print", label: "Print Marketing", defaultChecked: false },
  { id: "ads", label: "Targeted Advertising", defaultChecked: false },
];

const detailPlaceholder = {
  address: "123 Main St",
  listPrice: "$750,000",
  beds: "4",
  baths: "3",
  sqft: "2,500",
  yearBuilt: "2015",
  marketingHeadline: "Maximum Exposure, Premium Results",
  strategyOverview:
    "Comprehensive marketing strategy tailored to your property.",
};

function buildPresentationHtml({
  template,
  details,
  sections,
  marketingChannels,
}) {
  const selectedIcon =
    templates.find((item) => item.id === template)?.icon ?? "🏡";
  const year = new Date().getFullYear();
  const generatedDate = new Date().toLocaleDateString();

  const sectionHtml = sections.length
    ? `
    <!-- Presentation Sections -->
    <div class="section">
      <h2 class="section-title">What's Included</h2>
      <ul class="sections-list">
        ${sections.map((section) => `<li>${section}</li>`).join("")}
      </ul>
    </div>
    `
    : "";

  const marketingHtml = marketingChannels.length
    ? `
      <h3 style="font-size: 24px; font-weight: 600; color: #1e40af; margin-top: 32px; margin-bottom: 16px;">Our Marketing Approach</h3>
      <div class="marketing-grid">
        ${marketingChannels
          .map((channel) => `<div class="marketing-item">${channel}</div>`)
          .join("")}
      </div>
      `
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Listing Presentation - ${details.address}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }

    body {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
    }

    .presentation-container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }

    .cover-page {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);
      color: white;
      padding: 80px 60px;
      text-align: center;
    }

    .cover-icon {
      font-size: 80px;
      margin-bottom: 20px;
    }

    .cover-title {
      font-size: 48px;
      font-weight: 800;
      margin-bottom: 10px;
    }

    .cover-address {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 30px;
      opacity: 0.95;
    }

    .cover-price {
      font-size: 56px;
      font-weight: 800;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }

    .cover-details {
      font-size: 18px;
      opacity: 0.9;
    }

    .section {
      padding: 60px;
      border-bottom: 2px solid #e5e7eb;
    }

    .section:last-child {
      border-bottom: none;
    }

    .section-title {
      font-size: 32px;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 3px solid #3b82f6;
    }

    .property-details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-top: 30px;
    }

    .detail-item {
      background: #f8fafc;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #3b82f6;
    }

    .detail-label {
      font-size: 14px;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .detail-value {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
    }

    .marketing-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-top: 24px;
    }

    .marketing-item {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      padding: 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      border: 2px solid #10b981;
    }

    .marketing-item::before {
      content: '✓';
      font-size: 24px;
      font-weight: 700;
      color: #10b981;
      margin-right: 12px;
    }

    .marketing-headline {
      font-size: 28px;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 16px;
    }

    .strategy-text {
      font-size: 16px;
      line-height: 1.6;
      color: #334155;
    }

    .sections-list {
      list-style: none;
      margin-top: 24px;
    }

    .sections-list li {
      padding: 16px;
      margin-bottom: 12px;
      background: #f1f5f9;
      border-radius: 8px;
      font-size: 18px;
      font-weight: 500;
      color: #1e293b;
      border-left: 4px solid #3b82f6;
    }

    .footer {
      background: #0f172a;
      color: white;
      padding: 40px 60px;
      text-align: center;
    }

    .footer-text {
      font-size: 16px;
      opacity: 0.8;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }

      .presentation-container {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="presentation-container">
    <div class="cover-page">
      <div class="cover-icon">${selectedIcon}</div>
      <h1 class="cover-title">Listing Presentation</h1>
      <div class="cover-address">${details.address}</div>
      <div class="cover-price">${details.listPrice}</div>
      <div class="cover-details">${details.beds} Beds • ${details.baths} Baths • ${details.sqft} Sq Ft • Built ${details.yearBuilt}</div>
    </div>

    <div class="section">
      <h2 class="section-title">Property Details</h2>
      <div class="property-details">
        <div class="detail-item">
          <div class="detail-label">Address</div>
          <div class="detail-value">${details.address}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">List Price</div>
          <div class="detail-value">${details.listPrice}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Bedrooms</div>
          <div class="detail-value">${details.beds}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Bathrooms</div>
          <div class="detail-value">${details.baths}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Square Footage</div>
          <div class="detail-value">${details.sqft} sq ft</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Year Built</div>
          <div class="detail-value">${details.yearBuilt}</div>
        </div>
      </div>
    </div>
    ${sectionHtml}
    <div class="section">
      <h2 class="section-title">Marketing Strategy</h2>
      <div class="marketing-headline">${details.marketingHeadline}</div>
      <p class="strategy-text">${details.strategyOverview}</p>
      ${marketingHtml}
    </div>
    <div class="footer">
      <div class="footer-text">
        © ${year} Professional Real Estate Services<br>
        Generated on ${generatedDate}
      </div>
    </div>
  </div>
</body>
</html>`;
}

export default function ListingPresentationTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState("luxury");
  const [propertyDetails, setPropertyDetails] = useState({
    address: "",
    listPrice: "",
    beds: "",
    baths: "",
    sqft: "",
    yearBuilt: "",
    marketingHeadline: "",
    strategyOverview: "",
  });
  const [sectionState, setSectionState] = useState(() =>
    Object.fromEntries(
      baseSections.map((section) => [section.id, section.defaultChecked])
    )
  );
  const [marketingState, setMarketingState] = useState(() =>
    Object.fromEntries(
      baseMarketing.map((item) => [item.id, item.defaultChecked])
    )
  );
  const [generatedHtml, setGeneratedHtml] = useState(null);

  const selectedSections = useMemo(
    () =>
      baseSections
        .filter((section) => sectionState[section.id])
        .map((section) => section.label),
    [sectionState]
  );

  const selectedMarketing = useMemo(
    () =>
      baseMarketing
        .filter((item) => marketingState[item.id])
        .map((item) => item.label),
    [marketingState]
  );

  const previewDetails = useMemo(() => {
    const valueOrPlaceholder = (value, placeholderKey) =>
      value.trim() ? value : detailPlaceholder[placeholderKey];

    return {
      address: valueOrPlaceholder(propertyDetails.address, "address"),
      listPrice: valueOrPlaceholder(propertyDetails.listPrice, "listPrice"),
      beds: valueOrPlaceholder(propertyDetails.beds, "beds"),
      baths: valueOrPlaceholder(propertyDetails.baths, "baths"),
      sqft: valueOrPlaceholder(propertyDetails.sqft, "sqft"),
      yearBuilt: valueOrPlaceholder(propertyDetails.yearBuilt, "yearBuilt"),
      marketingHeadline: valueOrPlaceholder(
        propertyDetails.marketingHeadline,
        "marketingHeadline"
      ),
      strategyOverview: valueOrPlaceholder(
        propertyDetails.strategyOverview,
        "strategyOverview"
      ),
    };
  }, [propertyDetails]);

  const selectedTemplateMeta =
    templates.find((template) => template.id === selectedTemplate) ??
    templates[0];

  const handleDetailChange = (field) => (event) => {
    const { value } = event.target;
    setPropertyDetails((previous) => ({ ...previous, [field]: value }));
  };

  const handleSectionToggle = (id) => (event) => {
    const { checked } = event.target;
    setSectionState((previous) => ({ ...previous, [id]: checked }));
  };

  const handleMarketingToggle = (id) => (event) => {
    const { checked } = event.target;
    setMarketingState((previous) => ({ ...previous, [id]: checked }));
  };

  const handleGenerate = () => {
    const html = buildPresentationHtml({
      template: selectedTemplate,
      details: previewDetails,
      sections: selectedSections,
      marketingChannels: selectedMarketing,
    });
    setGeneratedHtml(html);
    window.alert(`✅ Presentation Generated Successfully!

Your ${selectedTemplateMeta.name.toLowerCase()} presentation for ${
      previewDetails.address
    } is ready.

Click "Download Presentation" to save it as an HTML file.`);
  };

  const handleDownload = () => {
    if (!generatedHtml) {
      window.alert(
        'Please generate a presentation first by clicking "Generate Presentation".'
      );
      return;
    }

    const sanitizedAddress = previewDetails.address.replace(/[^a-z0-9]/gi, "_");
    const filename = `Listing_Presentation_${sanitizedAddress}_${Date.now()}.html`;

    const blob = new Blob([generatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      window.alert(`✅ Download Started!

Your presentation has been saved as:
${filename}

You can open the file in any web browser or share it with your client.`);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            Listing Presentation Templates
          </h1>
          <p className="text-slate-400">
            Create professional, customized listing presentations in minutes
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Select Template</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`group overflow-hidden rounded-xl border-2 transition ${
                      selectedTemplate === template.id
                        ? "border-emerald-500 bg-emerald-950/30"
                        : "border-slate-700 hover:border-blue-500"
                    }`}
                  >
                    <div
                      className={`flex h-36 items-center justify-center text-4xl text-white ${template.gradient}`}
                    >
                      {template.icon}
                    </div>
                    <div className="p-4 text-left">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold text-slate-100">
                          {template.name}
                        </span>
                        {template.badge && (
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${template.badgeClass}`}
                          >
                            {template.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">
                        {template.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>

              <div className="mb-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Property Address
                  </label>
                  <input
                    type="text"
                    value={propertyDetails.address}
                    onChange={handleDetailChange("address")}
                    placeholder="123 Main St"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    List Price
                  </label>
                  <input
                    type="text"
                    value={propertyDetails.listPrice}
                    onChange={handleDetailChange("listPrice")}
                    placeholder="$750,000"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                  />
                </div>
              </div>

              <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Beds
                  </label>
                  <input
                    type="number"
                    value={propertyDetails.beds}
                    onChange={handleDetailChange("beds")}
                    placeholder="4"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Baths
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={propertyDetails.baths}
                    onChange={handleDetailChange("baths")}
                    placeholder="3"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Sq Ft
                  </label>
                  <input
                    type="number"
                    value={propertyDetails.sqft}
                    onChange={handleDetailChange("sqft")}
                    placeholder="2500"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Year Built
                  </label>
                  <input
                    type="number"
                    value={propertyDetails.yearBuilt}
                    onChange={handleDetailChange("yearBuilt")}
                    placeholder="2015"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-2">
                Sections to Include
              </h2>
              <p className="mb-4 text-sm text-slate-400">
                Toggle sections to customize your presentation
              </p>
              <div className="space-y-3">
                {baseSections.map((section) => (
                  <label
                    key={section.id}
                    className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
                  >
                    <span>
                      <span className="block font-medium text-slate-100">
                        {section.label}
                      </span>
                      <span className="text-xs text-slate-400">
                        {section.description}
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={sectionState[section.id]}
                      onChange={handleSectionToggle(section.id)}
                      className="h-5 w-5 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-0"
                    />
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Marketing Strategy</h2>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Marketing Headline
                </label>
                <input
                  type="text"
                  value={propertyDetails.marketingHeadline}
                  onChange={handleDetailChange("marketingHeadline")}
                  placeholder="Maximum Exposure, Premium Results"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                />
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Strategy Overview
                </label>
                <textarea
                  value={propertyDetails.strategyOverview}
                  onChange={handleDetailChange("strategyOverview")}
                  placeholder="Describe your comprehensive marketing approach..."
                  className="min-h-[120px] w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Marketing Channels (select all that apply)
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {baseMarketing.map((item) => (
                    <label
                      key={item.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg bg-slate-800 px-4 py-3 text-sm transition hover:bg-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={marketingState[item.id]}
                        onChange={handleMarketingToggle(item.id)}
                        className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-0"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="sticky top-6 rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Preview</h2>
                <div className="flex gap-2">
                  <span className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium uppercase text-slate-400">
                    Desktop
                  </span>
                  <span className="rounded-lg border border-slate-800 px-3 py-2 text-xs font-medium uppercase text-slate-600">
                    Mobile
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
                <div className="mb-4 text-center">
                  <div className="mb-2 text-3xl" aria-hidden="true">
                    {selectedTemplateMeta.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">
                    {previewDetails.address}
                  </h3>
                  <p className="text-xl font-semibold text-cyan-400">
                    {previewDetails.listPrice}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {previewDetails.beds} beds • {previewDetails.baths} baths •{" "}
                    {previewDetails.sqft} sq ft
                  </p>
                </div>

                <div className="mt-4 border-t border-slate-700 pt-4">
                  <h4 className="text-sm font-semibold text-slate-200">
                    Includes:
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm text-slate-300">
                    {selectedSections.length ? (
                      selectedSections.map((section) => (
                        <li key={section}>✓ {section}</li>
                      ))
                    ) : (
                      <li>Customize sections to see them here</li>
                    )}
                  </ul>
                </div>

                <div className="mt-4 border-t border-slate-700 pt-4">
                  <h4 className="text-sm font-semibold text-slate-200">
                    Marketing:
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm text-slate-300">
                    {selectedMarketing.length ? (
                      selectedMarketing.map((channel) => (
                        <li key={channel}>✓ {channel}</li>
                      ))
                    ) : (
                      <li>Select marketing channels to include them</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Generate Presentation
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download Presentation
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
