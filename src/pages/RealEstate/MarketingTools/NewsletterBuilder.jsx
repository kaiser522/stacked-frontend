import React, { useState } from "react";

export default function NewsletterBuilder() {
    const [state, setState] = useState({
        newsletterTitle: "The Real Estate Report",
        newsletterDate: "October 2024 Edition",
        featuredTitle: "Beautiful Family Home in Prime Location",
        featuredDescription: "This stunning 4-bedroom, 3-bathroom home features modern updates throughout, including a gourmet kitchen, hardwood floors, and a spacious backyard perfect for entertaining.",
        featuredPrice: "$525,000",
        featuredBeds: "4",
        featuredBaths: "3",
        featuredSqft: "2,400",
        avgPrice: "$485K",
        priceChange: "+5.2%",
        daysMarket: "28",
        totalSales: "147",
        marketInsights: "The local real estate market continues to show strong activity with steady price appreciation. Low inventory levels are creating competitive conditions for buyers, while sellers are seeing excellent results with proper pricing and marketing strategies.",
        tipTitle: "Fall Curb Appeal Boost",
        tipContent: "As we head into fall, simple landscaping updates can make a huge difference in your home's curb appeal. Consider planting colorful mums, cleaning gutters, and power washing walkways to create an inviting first impression for potential buyers.",
        testimonialText: "\"Working with [Agent Name] was an absolute pleasure. They guided us through every step of selling our home and helped us get top dollar in record time. Their marketing strategy and attention to detail made all the difference.\"",
        testimonialAuthor: "- The Johnson Family",
        event1Title: "Fall Festival Downtown",
        event1Details: "October 15th, 10 AM - 4 PM | Main Street | Family-friendly activities, local vendors, and live music",
        agentName: "Your Name",
        agentPhone: "(555) 123-4567",
        agentEmail: "your.email@realty.com",
        agentBrokerage: "Your Brokerage Name",
    });

    const update = (field, value) => setState(prev => ({ ...prev, [field]: value }));

    const downloadNewsletter = () => {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Real Estate Newsletter</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: white; color: #333; line-height: 1.6; }
    .newsletter-container { max-width: 800px; margin: 0 auto; background: white; }
    .newsletter-header { background: linear-gradient(135deg, #3498db, #2980b9); color: white; padding: 40px 30px; text-align: center; }
    .newsletter-title { font-size: 2.2rem; font-weight: bold; margin-bottom: 10px; }
    .newsletter-date { font-size: 1.1rem; opacity: 0.9; }
    .newsletter-body { padding: 30px; }
    .section { margin-bottom: 32px; page-break-inside: avoid; }
    .section-title { font-size: 1.4rem; color: #2c3e50; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 3px solid #3498db; font-weight: 600; }
    .featured-property { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 10px; padding: 20px; margin: 16px 0; border-left: 5px solid #3498db; }
    .property-title { font-size: 1.1rem; font-weight: bold; color: #2c3e50; margin-bottom: 8px; }
    .property-details { display: flex; gap: 12px; margin: 8px 0; flex-wrap: wrap; }
    .property-detail { background: white; padding: 6px 10px; border-radius: 5px; border: 1px solid #ddd; font-size: 0.9rem; color: #666; }
    .market-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin: 16px 0; }
    .stat-card { background: #f8f9fa; padding: 16px; border-radius: 8px; text-align: center; border: 1px solid #e9ecef; }
    .stat-number { font-size: 1.6rem; font-weight: bold; color: #3498db; margin-bottom: 4px; }
    .tip-box { background: linear-gradient(135deg, #3498db, #2980b9); color: white; padding: 18px; border-radius: 10px; margin: 16px 0; }
    .testimonial { background: #e8f5e8; border-left: 4px solid #27ae60; padding: 16px; margin: 16px 0; border-radius: 5px; }
    .newsletter-footer { background: #2c3e50; color: white; padding: 24px; text-align: center; }
    .agent-name { font-weight: bold; font-size: 1.1rem; }
  </style>
</head>
<body>
  <div class="newsletter-container">
    <div class="newsletter-header">
      <h1 class="newsletter-title">${state.newsletterTitle}</h1>
      <p class="newsletter-date">${state.newsletterDate}</p>
    </div>
    <div class="newsletter-body">
      <div class="section">
        <h2 class="section-title">Featured Property</h2>
        <div class="featured-property">
          <div class="property-title">${state.featuredTitle}</div>
          <p>${state.featuredDescription}</p>
          <div class="property-details">
            <div class="property-detail">${state.featuredPrice}</div>
            <div class="property-detail">${state.featuredBeds} Bedrooms</div>
            <div class="property-detail">${state.featuredBaths} Bathrooms</div>
            <div class="property-detail">${state.featuredSqft} Sq Ft</div>
          </div>
        </div>
      </div>
      <div class="section">
        <h2 class="section-title">Market Update</h2>
        <div class="market-stats">
          <div class="stat-card"><div class="stat-number">${state.avgPrice}</div><div>Average Sale Price</div></div>
          <div class="stat-card"><div class="stat-number">${state.priceChange}</div><div>YoY Growth</div></div>
          <div class="stat-card"><div class="stat-number">${state.daysMarket}</div><div>Days on Market</div></div>
          <div class="stat-card"><div class="stat-number">${state.totalSales}</div><div>Homes Sold</div></div>
        </div>
        <p>${state.marketInsights}</p>
      </div>
      <div class="section">
        <h2 class="section-title">Home Seller Tip</h2>
        <div class="tip-box">
          <div style="font-weight:bold; margin-bottom:6px;">${state.tipTitle}</div>
          <div>${state.tipContent}</div>
        </div>
      </div>
      <div class="section">
        <h2 class="section-title">Client Success Story</h2>
        <div class="testimonial">
          <div style="font-style:italic; margin-bottom:8px; color:#2c3e50;">${state.testimonialText}</div>
          <div style="font-weight:bold; color:#27ae60; text-align:right;">${state.testimonialAuthor}</div>
        </div>
      </div>
      <div class="section">
        <h2 class="section-title">Community Events</h2>
        <div>
          <p><strong>${state.event1Title}:</strong> ${state.event1Details}</p>
        </div>
      </div>
    </div>
    <div class="newsletter-footer">
      <div class="agent-name">${state.agentName}</div>
      <div>Licensed Real Estate Professional</div>
      <div>📞 ${state.agentPhone}</div>
      <div>✉️ ${state.agentEmail}</div>
      <div>${state.agentBrokerage}</div>
    </div>
  </div>
</body>
</html>`;

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "newsletter.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-[#3A4E5E] text-white">
            <main className="max-w-[1400px] mx-auto px-8 py-8 border-l-4 border-[#21D4C6]">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">Real Estate Newsletter Builder</h2>
                        <p className="text-[#A0B0C0] max-w-[800px]">Professional monthly newsletters to stay top-of-mind with clients.</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={downloadNewsletter} className="bg-[#21D4C6] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#1BC4B6] transition">Download Newsletter</button>
                        <button onClick={() => window.print()} className="bg-[#667eea] text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 transition">Print</button>
                    </div>
                </div>

                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
                    {/* Preview */}
                    <div className="bg-white rounded-xl overflow-hidden text-[#2c3e50] max-h-[800px]">
                        <div className="bg-gradient-to-r from-[#3498db] to-[#2980b9] text-white p-8 text-center">
                            <h1 className="text-3xl font-bold mb-2">{state.newsletterTitle}</h1>
                            <p className="opacity-90">{state.newsletterDate}</p>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[700px] space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold mb-3 border-b-4 border-[#3498db] pb-2">Featured Property</h2>
                                <div className="bg-[#f8f9fa] border border-[#e9ecef] rounded-lg p-5">
                                    <div className="font-bold text-lg mb-2">{state.featuredTitle}</div>
                                    <p className="text-sm text-gray-700">{state.featuredDescription}</p>
                                    <div className="flex gap-2 flex-wrap mt-3">
                                        <div className="bg-white border rounded px-2 py-1 text-sm">{state.featuredPrice}</div>
                                        <div className="bg-white border rounded px-2 py-1 text-sm">{state.featuredBeds} Bedrooms</div>
                                        <div className="bg-white border rounded px-2 py-1 text-sm">{state.featuredBaths} Bathrooms</div>
                                        <div className="bg-white border rounded px-2 py-1 text-sm">{state.featuredSqft} Sq Ft</div>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <h2 className="text-xl font-semibold mb-3 border-b-4 border-[#3498db] pb-2">Market Update</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3">
                                    <div className="bg-[#f8f9fa] p-4 rounded text-center border"><div className="text-2xl font-bold text-[#3498db]">{state.avgPrice}</div><div className="text-xs text-gray-600">Average Sale Price</div></div>
                                    <div className="bg-[#f8f9fa] p-4 rounded text-center border"><div className="text-2xl font-bold text-[#3498db]">{state.priceChange}</div><div className="text-xs text-gray-600">YoY Growth</div></div>
                                    <div className="bg-[#f8f9fa] p-4 rounded text-center border"><div className="text-2xl font-bold text-[#3498db]">{state.daysMarket}</div><div className="text-xs text-gray-600">Days on Market</div></div>
                                    <div className="bg-[#f8f9fa] p-4 rounded text-center border"><div className="text-2xl font-bold text-[#3498db]">{state.totalSales}</div><div className="text-xs text-gray-600">Homes Sold</div></div>
                                </div>
                                <p className="text-sm text-gray-700">{state.marketInsights}</p>
                            </section>
                            <section>
                                <h2 className="text-xl font-semibold mb-3 border-b-4 border-[#3498db] pb-2">Home Seller Tip</h2>
                                <div className="bg-gradient-to-r from-[#3498db] to-[#2980b9] text-white p-5 rounded-lg">
                                    <div className="font-bold mb-2">{state.tipTitle}</div>
                                    <div className="text-sm">{state.tipContent}</div>
                                </div>
                            </section>
                            <section>
                                <h2 className="text-xl font-semibold mb-3 border-b-4 border-[#3498db] pb-2">Client Success Story</h2>
                                <div className="bg-[#e8f5e8] border-l-4 border-[#27ae60] p-4 rounded">
                                    <div className="italic text-gray-800 mb-2">{state.testimonialText}</div>
                                    <div className="font-bold text-[#27ae60] text-right">{state.testimonialAuthor}</div>
                                </div>
                            </section>
                            <section>
                                <h2 className="text-xl font-semibold mb-3 border-b-4 border-[#3498db] pb-2">Community Events</h2>
                                <p className="text-sm text-gray-700"><strong>{state.event1Title}:</strong> {state.event1Details}</p>
                            </section>
                        </div>
                        <div className="bg-[#2c3e50] text-white p-6 text-center">
                            <div className="font-bold text-lg">{state.agentName}</div>
                            <div className="opacity-80">Licensed Real Estate Professional</div>
                            <div className="opacity-80">📞 {state.agentPhone} • ✉️ {state.agentEmail}</div>
                            <div className="opacity-80">{state.agentBrokerage}</div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-[#4A5E6E] rounded-xl p-6 border border-[#5A6E7E]">
                        <h3 className="text-xl font-semibold mb-6 text-[#21D4C6]">Customize Newsletter</h3>
                        <div className="space-y-4">
                            {[
                                ["newsletterTitle", "Newsletter Title"],
                                ["newsletterDate", "Date/Edition"],
                                ["featuredTitle", "Featured Property Title"],
                            ].map(([key, label]) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium mb-2">{label}</label>
                                    <input value={state[key]} onChange={(e) => update(key, e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none" />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-medium mb-2">Property Description</label>
                                <textarea value={state.featuredDescription} onChange={(e) => update("featuredDescription", e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none h-24" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    ["featuredPrice", "Property Price"],
                                    ["featuredBeds", "Bedrooms"],
                                    ["featuredBaths", "Bathrooms"],
                                    ["featuredSqft", "Square Feet"],
                                ].map(([key, label]) => (
                                    <div key={key}>
                                        <label className="block text-sm font-medium mb-2">{label}</label>
                                        <input value={state[key]} onChange={(e) => update(key, e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none" />
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    ["avgPrice", "Avg Price"],
                                    ["priceChange", "YoY Growth"],
                                    ["daysMarket", "Days on Market"],
                                    ["totalSales", "Total Sales"],
                                ].map(([key, label]) => (
                                    <div key={key}>
                                        <label className="block text-sm font-medium mb-2">{label}</label>
                                        <input value={state[key]} onChange={(e) => update(key, e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none" />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Market Insights</label>
                                <textarea value={state.marketInsights} onChange={(e) => update("marketInsights", e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none h-24" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Tip Title</label>
                                <input value={state.tipTitle} onChange={(e) => update("tipTitle", e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Tip Content</label>
                                <textarea value={state.tipContent} onChange={(e) => update("tipContent", e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none h-24" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Testimonial Text</label>
                                <textarea value={state.testimonialText} onChange={(e) => update("testimonialText", e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none h-24" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Testimonial Author</label>
                                <input value={state.testimonialAuthor} onChange={(e) => update("testimonialAuthor", e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Event Title</label>
                                <input value={state.event1Title} onChange={(e) => update("event1Title", e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Event Details</label>
                                <input value={state.event1Details} onChange={(e) => update("event1Details", e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Agent Name</label>
                                <input value={state.agentName} onChange={(e) => update("agentName", e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                    <input value={state.agentPhone} onChange={(e) => update("agentPhone", e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input value={state.agentEmail} onChange={(e) => update("agentEmail", e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Brokerage</label>
                                <input value={state.agentBrokerage} onChange={(e) => update("agentBrokerage", e.target.value)} className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}


