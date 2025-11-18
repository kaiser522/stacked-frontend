import React, { useMemo, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export default function BuyerConsultationPackets() {
    const [state, setState] = useState({
        title: "Buyer Consultation Guide",
        subtitle: "Your Complete Home Buying Journey",
        marketArea: "Beverly Hills",
        marketConditions: "The current market is showing strong activity with competitive conditions for buyers. Homes are selling quickly, and multiple offers are common.",
        avgDays: "28 days",
        avgPrice: "$750,000",
        inventory: "Low - Seller's Market",
        rates: "6.5% - 7.0%",
        agentName: "Your Name",
        agentPhone: "(555) 123-4567",
        agentEmail: "your.email@realty.com",
        agentBrokerage: "Your Brokerage Name",
    });

    const Section = ({ title, children }) => (
        <div style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: "1.4rem", color: "#2c3e50", marginBottom: 12, paddingBottom: 8, borderBottom: "3px solid #40e0d0", fontWeight: 700 }}>{title}</h2>
            {children}
        </div>
    );

    const Preview = useMemo(() => (
        <div style={{ background: "white", color: "#333", width: "100%", borderRadius: 15, overflow: "hidden", boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}>
            <div style={{ background: "linear-gradient(135deg, #40e0d0, #36c5b6)", color: "white", padding: "32px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 8 }}>{state.title}</div>
                <div style={{ opacity: 0.9 }}>{state.subtitle}</div>
            </div>
            <div style={{ padding: 24, lineHeight: 1.6 }}>
                <Section title="Welcome to Your Home Buying Journey">
                    <div style={{ background: "linear-gradient(135deg, #40e0d0, #36c5b6)", color: "white", padding: 16, borderRadius: 8, textAlign: "center", margin: "12px 0" }}>
                        <div style={{ fontWeight: 700, marginBottom: 8 }}>Your Dedicated Real Estate Professional</div>
                        <div>I'm here to guide you through every step of the home buying process.</div>
                    </div>
                    <p>Buying a home is one of the most significant decisions you'll make. This comprehensive guide will walk you through the entire process.</p>
                    <div style={{ background: "#f8f9fa", borderLeft: "4px solid #40e0d0", padding: 16, borderRadius: 6, margin: "20px 0" }}>
                        <div style={{ fontWeight: 700, color: "#2c3e50", marginBottom: 6 }}>What to Expect Today</div>
                        <div>During our consultation, we'll discuss your needs, preferences, budget, timeline, and the entire home buying process. By the end of our meeting, you'll have a clear roadmap for finding and purchasing your ideal home.</div>
                    </div>
                </Section>

                {/* Understanding Your Needs */}
                <Section title="Understanding Your Needs">
                    {/* Home Preferences Checklist */}
                    <h3 style={{ fontSize: "1.1rem", color: "#40e0d0", marginTop: 24, marginBottom: 12, fontWeight: 600 }}>Home Preferences</h3>
                    <div style={{ background: "#fff3cd", border: "1px solid #ffeaa7", borderRadius: 8, padding: 16, marginBottom: 24 }}>
                        <div style={{ color: "#856404", fontWeight: 700, marginBottom: 8 }}>Let's Define Your Ideal Home</div>
                        {[
                            "Number of bedrooms and bathrooms needed",
                            "Preferred home style (ranch, two-story, condo, etc.)",
                            "Must-have features (garage, yard, updated kitchen, etc.)",
                            "Nice-to-have features (pool, fireplace, basement, etc.)",
                            "Preferred neighborhoods or school districts",
                            "Commute considerations and proximity to work",
                            "Lifestyle preferences (urban, suburban, rural)",
                        ].map((item) => (
                            <div key={item} style={{ display: "flex", alignItems: "center", marginBottom: 6, color: "#856404" }}>
                                <span style={{ marginRight: 8 }}>☐</span> {item}
                            </div>
                        ))}
                    </div>

                    {/* Budget and Financing */}
                    <h3 style={{ fontSize: "1.1rem", color: "#40e0d0", marginTop: 24, marginBottom: 12, fontWeight: 600 }}>Budget and Financing</h3>
                    <div style={{ background: "#f8f9fa", borderLeft: "4px solid #40e0d0", padding: 16, borderRadius: 6, marginBottom: 16 }}>
                        <div style={{ fontWeight: 700, color: "#2c3e50", marginBottom: 6 }}>Pre-Approval is Key</div>
                        <div>Getting pre-approved for a mortgage is one of the most important first steps. It helps you understand your budget, shows sellers you're serious, and can make your offer more competitive in today's market.</div>
                    </div>
                    <div style={{ background: "#fff3cd", border: "1px solid #ffeaa7", borderRadius: 8, padding: 16 }}>
                        <div style={{ color: "#856404", fontWeight: 700, marginBottom: 8 }}>Financial Preparation Checklist</div>
                        {[
                            "Determine comfortable monthly payment range",
                            "Calculate down payment amount available",
                            "Review credit score and credit report",
                            "Gather financial documents for lender",
                            "Research mortgage lenders and rates",
                            "Understand additional costs (taxes, insurance, HOA)",
                            "Plan for closing costs (2-5% of purchase price)",
                        ].map((item) => (
                            <div key={item} style={{ display: "flex", alignItems: "center", marginBottom: 6, color: "#856404" }}>
                                <span style={{ marginRight: 8 }}>☐</span> {item}
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Home Buying Process */}
                <Section title="The Home Buying Process">
                    {[
                        ["Initial Consultation & Planning", "We discuss your needs, preferences, budget, and timeline. I'll explain the entire process and answer all your questions."],
                        ["Get Pre-Approved for Financing", "Work with a trusted lender to get pre-approved for a mortgage. This determines your budget and strengthens your offers."],
                        ["Home Search & Showings", "I'll set up a custom search based on your criteria and schedule showings for homes that meet your needs."],
                        ["Make an Offer", "When you find \"the one,\" I'll help you craft a competitive offer with appropriate terms and contingencies."],
                        ["Negotiate & Accept", "I'll negotiate on your behalf to get the best possible terms and price for your new home."],
                        ["Home Inspection & Appraisal", "Professional inspection and lender appraisal ensure the home is in good condition and properly valued."],
                        ["Final Walkthrough & Closing", "Final inspection before closing, then sign documents and receive your keys!"],
                    ].map(([title, content], idx) => (
                        <div key={idx} style={{ position: "relative", background: "#f8f9fa", padding: 20, borderRadius: 8, borderLeft: "4px solid #40e0d0", margin: "16px 0" }}>
                            <div style={{ position: "absolute", left: -15, top: 20, background: "#40e0d0", color: "white", width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{idx + 1}</div>
                            <div style={{ fontWeight: 700, color: "#2c3e50", marginBottom: 6, marginLeft: 25 }}>{title}</div>
                            <div style={{ marginLeft: 25 }}>{content}</div>
                        </div>
                    ))}
                </Section>

                {/* Timeline & What to Expect */}
                <Section title="Timeline & What to Expect">
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                {['Phase', 'Timeline', 'Key Activities'].map(h => (<th key={h} style={{ background: '#40e0d0', color: '#fff', padding: 10, border: '1px solid #dee2e6', textAlign: 'left' }}>{h}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Pre-Approval', '1-3 days', 'Submit application, provide documents, receive pre-approval letter'],
                                ['Home Search', '2-8 weeks', 'View properties, attend showings, refine search criteria'],
                                ['Offer & Negotiation', '1-3 days', 'Submit offer, negotiate terms, reach agreement'],
                                ['Under Contract', '30-45 days', 'Inspection, appraisal, finalize financing, clear contingencies'],
                                ['Closing', '1 day', 'Final walkthrough, sign documents, receive keys'],
                            ].map(([phase, timeline, activity], i) => (
                                <tr key={i} style={{ background: i % 2 ? '#f8f9fa' : '#fff' }}>
                                    <td style={{ padding: 10, border: '1px solid #dee2e6' }}><strong>{phase}</strong></td>
                                    <td style={{ padding: 10, border: '1px solid #dee2e6' }}>{timeline}</td>
                                    <td style={{ padding: 10, border: '1px solid #dee2e6' }}>{activity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Section>

                <Section title="Market Insights & Current Conditions">
                    <div style={{ background: "#f8f9fa", borderLeft: "4px solid #40e0d0", padding: 16, borderRadius: 6 }}>
                        <div style={{ fontWeight: 700, color: "#2c3e50", marginBottom: 6 }}>{state.marketArea} Market Update</div>
                        <div>{state.marketConditions}</div>
                    </div>
                    <h3 style={{ fontSize: "1.3rem", color: "#40e0d0", marginTop: 25, marginBottom: 15, fontWeight: 600 }}>Current Market Statistics</h3>
                    <ul style={{ margin: "12px 16px" }}>
                        <li>Average days on market: {state.avgDays}</li>
                        <li>Average sale price: {state.avgPrice}</li>
                        <li>Inventory levels: {state.inventory}</li>
                        <li>Interest rates: {state.rates}</li>
                    </ul>
                </Section>

                {/* My Commitment to You (moved here) */}
                <Section title="My Commitment to You">
                    <div style={{ background: "linear-gradient(135deg, #40e0d0, #36c5b6)", color: "white", padding: 20, borderRadius: 10, textAlign: "center", margin: "20px 0" }}>
                        <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>Your Success is My Priority</div>
                        <div>I'm committed to providing exceptional service, expert guidance, and dedicated support throughout your entire home buying journey.</div>
                    </div>
                    <h3 style={{ fontSize: "1.1rem", color: "#40e0d0", marginBottom: 12, fontWeight: 600 }}>What You Can Expect From Me</h3>
                    <div style={{ background: "#fff3cd", border: "1px solid #ffeaa7", borderRadius: 8, padding: 16 }}>
                        <div style={{ color: "#856404", fontWeight: 700, marginBottom: 8 }}>My Service Promise</div>
                        {[
                            "Prompt communication and regular updates",
                            "Expert market knowledge and pricing guidance",
                            "Access to off-market and coming soon properties",
                            "Professional network of inspectors, lenders, and contractors",
                            "Skilled negotiation to protect your interests",
                            "Support even after closing",
                        ].map((item) => (
                            <div key={item} style={{ display: "flex", alignItems: "center", marginBottom: 6, color: "#856404" }}>
                                <span style={{ marginRight: 8 }}>☐</span> {item}
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title="Next Steps">
                    <div style={{ display: "grid", gap: 12 }}>
                        <div style={{ background: "#f8f9fa", padding: 16, borderRadius: 8, borderLeft: "4px solid #40e0d0" }}>
                            <div style={{ fontWeight: 700, color: "#2c3e50", marginBottom: 6 }}>Today's Action Items</div>
                            <div>Complete buyer consultation, discuss your needs and timeline, begin pre-approval process if needed.</div>
                        </div>
                        <div style={{ background: "#f8f9fa", padding: 16, borderRadius: 8, borderLeft: "4px solid #40e0d0" }}>
                            <div style={{ fontWeight: 700, color: "#2c3e50", marginBottom: 6 }}>This Week</div>
                            <div>Finalize pre-approval, set up property search alerts, schedule first round of showings.</div>
                        </div>
                        <div style={{ background: "#f8f9fa", padding: 16, borderRadius: 8, borderLeft: "4px solid #40e0d0" }}>
                            <div style={{ fontWeight: 700, color: "#2c3e50", marginBottom: 6 }}>Ongoing</div>
                            <div>Regular communication, property showings, market updates, and preparation for making offers.</div>
                        </div>
                    </div>
                </Section>

                <div style={{ background: "linear-gradient(135deg, #3a4a5c, #2c3e50)", color: "white", padding: 24, textAlign: "center", borderRadius: 10, marginTop: 24 }}>
                    <div style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: 6 }}>{state.agentName}</div>
                    <div>Licensed Real Estate Professional</div>
                    <div>📞 {state.agentPhone}</div>
                    <div>✉️ {state.agentEmail}</div>
                    <div>{state.agentBrokerage}</div>
                    <div style={{ marginTop: 15, fontStyle: 'italic', opacity: 0.8 }}>
                        Thank you for choosing me as your real estate professional. I look forward to helping you find your perfect home!
                    </div>
                </div>
            </div>
        </div>
    ), [state]);

    const buildPrintHtml = (contentHtml) => `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Buyer Consultation Packet</title>
<style>
  @page{size:8.5in 11in;margin:12mm}
  body{font-family:Arial,sans-serif;margin:0;padding:0;background:#fff}
  .document-body{padding:40px}
  .document-title{font-size:2.5rem}
  /* Mobile adjustments */
  @media(max-width:1200px){
    .document-body{padding:30px}
  }
  @media(max-width:768px){
    .document-body{padding:20px}
    .document-title{font-size:2rem}
    .section-title{font-size:1.4rem}
    .subsection-title{font-size:1.1rem}
  }
</style>
</head><body style="max-width:100%;overflow-x:hidden;">${contentHtml}</body></html>`;

    const downloadHtml = () => {
        const html = renderToStaticMarkup(Preview);
        const full = buildPrintHtml(html);
        const blob = new Blob([full], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "buyer-consultation-packet.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-[#3A4E5E] text-white">
            <main className="max-w-[1400px] mx-auto px-8 py-8 border-l-4 border-[#21D4C6]">
                {/* Fancy header */}
                <section className="mb-8">
                    <div className="rounded-2xl border-2 border-[#21D4C6] p-6 bg-[#3A4E5E] text-center">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="w-14 h-14 rounded-xl bg-[#21D4C6] text-black flex items-center justify-center text-3xl">📋</div>
                            <h1 className="text-3xl md:text-4xl font-bold">Buyer Consultation Packets</h1>
                        </div>
                        <p className="text-[#A0B0C0] mb-4">Complete buyer meeting materials.</p>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#A0B0C0] mb-4">
                            <span>📋 Document Set</span>
                            <span>📄 Professional Materials</span>
                            <span>🤝 Client Consultation</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                            {["buyer", "consultation", "process"].map((t) => (
                                <span key={t} className="px-4 py-1 rounded-full text-sm bg-[#2f3f4e] border border-[#21D4C6] text-[#21D4C6]">{t}</span>
                            ))}
                        </div>
                        <button onClick={downloadHtml} className="px-6 py-3 bg-[#21D4C6] text-black font-semibold rounded-xl shadow-inner">Download Packet</button>
                    </div>
                </section>
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                    <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden">
                        <div className="p-5 flex justify-center">{Preview}</div>
                    </div>
                    <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] p-5 space-y-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-[#A0B0C0]">Packet Title</label>
                            <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={state.title} onChange={(e) => setState({ ...state, title: e.target.value })} placeholder="Packet Title" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-[#A0B0C0]">Subtitle</label>
                            <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={state.subtitle} onChange={(e) => setState({ ...state, subtitle: e.target.value })} placeholder="Subtitle" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Market Area</label>
                                <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={state.marketArea} onChange={(e) => setState({ ...state, marketArea: e.target.value })} placeholder="Market Area" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Avg Days</label>
                                <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={state.avgDays} onChange={(e) => setState({ ...state, avgDays: e.target.value })} placeholder="Avg Days" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                ["Avg Price", "avgPrice"],
                                ["Inventory", "inventory"],
                                ["Rates", "rates"],
                            ].map(([label, key]) => (
                                <div key={key} className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">{label}</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={state[key]} onChange={(e) => setState({ ...state, [key]: e.target.value })} placeholder={label} />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-[#A0B0C0]">Market Conditions</label>
                            <textarea className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={state.marketConditions} onChange={(e) => setState({ ...state, marketConditions: e.target.value })} placeholder="Market Conditions" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                ["Agent Name", "agentName"],
                                ["Phone", "agentPhone"],
                            ].map(([l, k]) => (
                                <div key={k} className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">{l}</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={state[k]} onChange={(e) => setState({ ...state, [k]: e.target.value })} placeholder={l} />
                                </div>
                            ))}
                            {[
                                ["Email", "agentEmail"],
                                ["Brokerage", "agentBrokerage"],
                            ].map(([l, k]) => (
                                <div key={k} className="col-span-2 flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">{l}</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={state[k]} onChange={(e) => setState({ ...state, [k]: e.target.value })} placeholder={l} />
                                </div>
                            ))}
                        </div>
                        <button onClick={downloadHtml} className="w-full bg-[#21D4C6] text-black font-semibold rounded px-3 py-2">Download HTML</button>
                    </div>
                </div>
            </main>
        </div>
    );
}


