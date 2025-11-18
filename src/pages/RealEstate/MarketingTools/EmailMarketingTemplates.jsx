import React, { useState, useRef } from "react";

/*
  EmailMarketingTemplates.jsx
  ---------------------------
  A full-React replacement for the static HTML file that previously lived in
  `/public/New folder/email_marketing_template.html`.

  Four email templates are provided:
    1) New Listing Announcement
    2) Market Update Newsletter
    3) Lead Follow-up Email
    4) Just Sold Announcement

  Each section contains its own state, edit controls, live preview, and a
  download button. A global "Download All" button generates every template in
  sequence. CSS has been inlined (kept minimal) so the exported HTML files are
  fully self-contained.
*/

const containerStyle = "min-h-screen bg-[#3A4E5E] text-white";
const pageStyle = "max-w-[1400px] mx-auto px-4 py-8";
const cardWrapper = "rounded-xl overflow-hidden border border-[#5A6E7E] bg-[#4A5E6E]";

function HeaderSection({ onBulkDownload }) {
    return (
        <header className="text-center mb-12 p-8 bg-[rgba(0,0,0,0.2)] border-2 border-[#40e0d0] rounded-2xl">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-12 h-12 bg-[#40e0d0] rounded-xl text-2xl">📧</span>
                Real Estate Email Templates
            </h1>
            <p className="text-lg text-[#a0b4c3] mb-4">Professional email templates for real estate agents.</p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[#a0b4c3] mb-4">
                <span className="tag">🏠 Real Estate Focused</span>
                <span className="tag">📱 Mobile Responsive</span>
                <span className="tag">🚀 Lead Generation Ready</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                {[
                    "real estate",
                    "lead generation",
                    "client nurturing",
                ].map((t) => (
                    <span
                        key={t}
                        className="bg-[rgba(64,224,208,0.2)] text-[#40e0d0] px-3 py-1 rounded-full border border-[rgba(64,224,208,0.3)] text-xs"
                    >
                        {t}
                    </span>
                ))}
            </div>

            <button
                onClick={onBulkDownload}
                className="bulk-download bg-[#40e0d0] text-[#2c3e50] font-semibold py-3 px-6 rounded-xl hover:bg-[#36c5b6] transition"
            >
                Download All Templates
            </button>
        </header>
    );
}

export default function EmailMarketingTemplates() {
    // helper to download via selector
    const downloadFromSelector = (selector, filename, delay = 0) => {
        setTimeout(() => {
            const el = document.querySelector(selector);
            if (el) {
                downloadHTML(filename, wrapEmail(el.outerHTML));
            }
        }, delay);
    };

    const bulkDownload = () => {
        downloadFromSelector('[data-template="listing"]', "new-listing-email.html", 100);
        downloadFromSelector('[data-template="market"]', "market-update-email.html", 300);
        downloadFromSelector('[data-template="lead"]', "lead-followup-email.html", 500);
        downloadFromSelector('[data-template="sold"]', "just-sold-email.html", 700);
    };
    return (
        <div className={containerStyle}>
            <main className={pageStyle}>
                <HeaderSection onBulkDownload={bulkDownload} />

                <div className="space-y-16">
                    <ListingTemplate />
                    <MarketUpdateTemplate />
                    <LeadFollowUpTemplate />
                    <JustSoldTemplate />
                </div>
            </main>
        </div>
    );
}

/************************** Utilities **************************/

function downloadHTML(filename, html) {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function wrapEmail(content) {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Email Template</title>${inlineCss}</head><body><div class="email-container">${content}</div></body></html>`;
}

const inlineCss = `
<style>
  body{font-family:Arial,Helvetica,sans-serif;margin:0;background:#f5f5f5;padding:20px;line-height:1.6}
  .email-container{max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,.1)}
  .cta{display:inline-block;background:#40e0d0;color:#fff;padding:12px 25px;border-radius:6px;font-weight:600;text-decoration:none}
  .sig{background:#f8f9fa;padding:15px;border-left:4px solid #40e0d0;border-radius:6px}
</style>`;

/************************** Template 1: New Listing **************************/

function ListingTemplate() {
    const [data, setData] = useState({
        address: "123 Oak Street, Beverly Hills, CA 90210",
        price: "$485,000",
        beds: "3",
        baths: "2.5",
        sqft: "2,100",
        description:
            "Beautiful family home featuring modern updates, spacious living areas, and a stunning backyard perfect for entertaining.",
        agent: "Your Name",
        phone: "(555) 123-4567",
    });

    const previewRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((d) => ({ ...d, [name]: value }));
    };

    const download = () => {
        const html = wrapEmail(previewRef.current.outerHTML);
        downloadHTML("new-listing-email.html", html);
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-4">New Listing Announcement</h3>
            <div className={cardWrapper}>
                <div className="grid md:grid-cols-2">
                    {/* Preview */}
                    <div className="bg-white text-black p-6" ref={previewRef} data-template="listing">
                        <header style={{ background: "linear-gradient(135deg,#40e0d0,#36c5b6)", padding: 20, color: "#fff", textAlign: "center" }}>
                            <h1 style={{ margin: 0, fontSize: 24 }}>🏡 NEW LISTING ALERT</h1>
                            <p style={{ margin: 4, fontSize: 18 }}>{data.price}</p>
                        </header>
                        <main style={{ padding: 20 }}>
                            <h2 style={{ color: "#2c3e50", marginBottom: 10 }}>{data.address}</h2>
                            <div style={{ display: "flex", gap: 15, flexWrap: "wrap", marginBottom: 15 }}>
                                {[
                                    { label: "Bedrooms", value: data.beds },
                                    { label: "Bathrooms", value: data.baths },
                                    { label: "Sq Ft", value: data.sqft },
                                ].map((s) => (
                                    <div key={s.label} style={{ flex: 1, minWidth: 80, textAlign: "center", border: "1px solid #e9ecef", borderRadius: 5, padding: 8 }}>
                                        <div style={{ fontWeight: "bold", color: "#40e0d0" }}>{s.value}</div>
                                        <div style={{ fontSize: 12 }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                            <p style={{ color: "#555", marginBottom: 20 }}>{data.description}</p>
                            <div style={{ textAlign: "center" }}>
                                <a href="#" className="cta">Schedule a Showing</a>
                            </div>
                            <div className="sig" style={{ marginTop: 20 }}>
                                <p style={{ margin: 0, color: "#2c3e50" }}>
                                    <strong>{data.agent}</strong>
                                </p>
                                <p style={{ margin: 0 }}>Licensed Real Estate Agent</p>
                                <p style={{ margin: 0 }}>📞 {data.phone}</p>
                            </div>
                        </main>
                        <footer style={{ background: "#f8f9fa", padding: 15, fontSize: 14, textAlign: "center" }}>
                            © 2024 {data.agent}. Licensed Real Estate Professional.
                        </footer>
                    </div>

                    {/* Controls */}
                    <div className="p-6 space-y-4">
                        {[
                            { label: "Property Address", name: "address" },
                            { label: "Price", name: "price" },
                            { label: "Bedrooms", name: "beds", small: true },
                            { label: "Bathrooms", name: "baths", small: true },
                            { label: "Sq Ft", name: "sqft", small: true },
                            { label: "Description", name: "description", textarea: true },
                            { label: "Agent Name", name: "agent" },
                            { label: "Phone", name: "phone" },
                        ].map((f) => (
                            <div key={f.name} className="space-y-1">
                                <label className="text-sm text-[#a0b4c3]">{f.label}</label>
                                {f.textarea ? (
                                    <textarea
                                        className="w-full p-2 rounded bg-[#2c3e50] text-white border border-[#5a6a7c]"
                                        name={f.name}
                                        value={data[f.name]}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-[#2c3e50] text-white border border-[#5a6a7c]"
                                        name={f.name}
                                        value={data[f.name]}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                        ))}

                        <button onClick={download} className="w-full py-2 bg-[#40e0d0] text-black font-semibold rounded-lg hover:bg-[#36c5b6] transition">
                            Download HTML
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

/************************** Template 2: Market Update **************************/

function MarketUpdateTemplate() {
    const [data, setData] = useState({
        area: "Beverly Hills",
        period: "September 2024",
        price: "$750,000",
        change: "+5.2%",
        days: "28 days",
        insights:
            "The local real estate market continues to show strong activity with increasing buyer interest. Inventory remains competitive, making it an excellent time for sellers to list their properties.",
        agent: "Your Name",
    });

    const previewRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((d) => ({ ...d, [name]: value }));
    };

    const download = () => {
        downloadHTML(
            "market-update-email.html",
            wrapEmail(previewRef.current.outerHTML)
        );
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-4">Market Update Newsletter</h3>
            <div className={cardWrapper}>
                <div className="grid md:grid-cols-2">
                    <div className="bg-white text-black p-6" ref={previewRef} data-template="market">
                        <header style={{ background: "linear-gradient(135deg,#3a4a5c,#2c3e50)", padding: 20, color: "#fff", textAlign: "center" }}>
                            <h1 style={{ margin: 0, fontSize: 24 }}>📊 Market Update</h1>
                            <p style={{ margin: 4 }}>{`${data.area} - ${data.period}`}</p>
                        </header>
                        <main style={{ padding: 20 }}>
                            <h2 style={{ color: "#2c3e50", marginBottom: 10 }}>Market Snapshot</h2>
                            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
                                {[
                                    { label: "Avg. Home Price", value: data.price },
                                    { label: "Price Change", value: data.change },
                                    { label: "Avg. Days on Market", value: data.days },
                                ].map((m) => (
                                    <div key={m.label} style={{ flex: 1, minWidth: 120, background: "#f8f9fa", padding: 15, borderRadius: 6, textAlign: "center" }}>
                                        <div style={{ fontWeight: "bold", color: "#40e0d0", fontSize: 18 }}>{m.value}</div>
                                        <div style={{ fontSize: 12 }}>{m.label}</div>
                                    </div>
                                ))}
                            </div>
                            <h3 style={{ color: "#2c3e50", marginBottom: 8 }}>Market Insights</h3>
                            <p style={{ color: "#555", marginBottom: 20 }}>{data.insights}</p>
                            <div style={{ textAlign: "center" }}>
                                <a href="#" className="cta">Get Your Home Value</a>
                            </div>
                            <div className="sig" style={{ marginTop: 20 }}>
                                <p style={{ margin: 0, color: "#2c3e50" }}>
                                    <strong>{data.agent}</strong>
                                </p>
                                <p style={{ margin: 0 }}>Your Local Real Estate Expert</p>
                            </div>
                        </main>
                        <footer style={{ background: "#f8f9fa", padding: 15, fontSize: 14, textAlign: "center" }}>
                            © 2024 {data.agent}. Licensed Real Estate Professional.
                        </footer>
                    </div>

                    {/* Controls */}
                    <div className="p-6 space-y-4">
                        {[
                            { label: "Market Area", name: "area" },
                            { label: "Time Period", name: "period" },
                            { label: "Avg Price", name: "price" },
                            { label: "Price Change", name: "change" },
                            { label: "Days on Market", name: "days" },
                            { label: "Market Insights", name: "insights", textarea: true },
                            { label: "Agent Name", name: "agent" },
                        ].map((f) => (
                            <div key={f.name} className="space-y-1">
                                <label className="text-sm text-[#a0b4c3]">{f.label}</label>
                                {f.textarea ? (
                                    <textarea
                                        className="w-full p-2 rounded bg-[#2c3e50] text-white border border-[#5a6a7c]"
                                        name={f.name}
                                        value={data[f.name]}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-[#2c3e50] text-white border border-[#5a6a7c]"
                                        name={f.name}
                                        value={data[f.name]}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                        ))}

                        <button onClick={download} className="w-full py-2 bg-[#40e0d0] text-black font-semibold rounded-lg hover:bg-[#36c5b6] transition">
                            Download HTML
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

/************************** Template 3: Lead Follow-up **************************/

function LeadFollowUpTemplate() {
    const [data, setData] = useState({
        source: "Website Inquiry",
        property: "123 Oak Street, Beverly Hills",
        message:
            "Thank you for your interest in the property. I'd love to schedule a time to show you this beautiful home and discuss how it might be perfect for your needs.",
        steps:
            "I can arrange a private showing at your convenience and provide you with a detailed market analysis of the area. I'm also happy to discuss financing options and answer any questions you may have.",
        agent: "Your Name",
        phone: "(555) 123-4567",
    });

    const previewRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((d) => ({ ...d, [name]: value }));
    };

    const download = () => {
        downloadHTML("lead-followup-email.html", wrapEmail(previewRef.current.outerHTML));
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-4">Lead Follow-up Email</h3>
            <div className={cardWrapper}>
                <div className="grid md:grid-cols-2">
                    <div className="bg-white text-black p-6" ref={previewRef} data-template="lead">
                        <header style={{ background: "linear-gradient(135deg,#667eea,#764ba2)", padding: 20, color: "#fff", textAlign: "center" }}>
                            <h1 style={{ margin: 0, fontSize: 24 }}>Thank You for Your Interest!</h1>
                            <p style={{ margin: 4 }}>{data.source}</p>
                        </header>
                        <main style={{ padding: 20 }}>
                            <p style={{ marginBottom: 15, color: "#555" }}>Hi there!</p>
                            <p style={{ marginBottom: 15, color: "#555" }}>{data.message}</p>
                            <div style={{ background: "#f8f9fa", padding: 15, borderRadius: 6, borderLeft: "4px solid #40e0d0", marginBottom: 15 }}>
                                <h3 style={{ color: "#2c3e50", margin: 0 }}>Property: {data.property}</h3>
                            </div>
                            <h3 style={{ color: "#2c3e50", marginBottom: 8 }}>Next Steps</h3>
                            <p style={{ color: "#555", marginBottom: 20 }}>{data.steps}</p>
                            <div style={{ textAlign: "center" }}>
                                <a href="#" className="cta" style={{ background: "#667eea" }}>
                                    Schedule Showing
                                </a>
                            </div>
                            <div className="sig" style={{ marginTop: 20 }}>
                                <p style={{ margin: 0, color: "#2c3e50" }}>
                                    <strong>{data.agent}</strong>
                                </p>
                                <p style={{ margin: 0 }}>Licensed Real Estate Agent</p>
                                <p style={{ margin: 0 }}>📞 {data.phone}</p>
                            </div>
                        </main>
                        <footer style={{ background: "#f8f9fa", padding: 15, fontSize: 14, textAlign: "center" }}>
                            © 2024 {data.agent}. Licensed Real Estate Professional.
                        </footer>
                    </div>

                    {/* Controls */}
                    <div className="p-6 space-y-4">
                        {[
                            { label: "Lead Source", name: "source" },
                            { label: "Property of Interest", name: "property" },
                            { label: "Follow-up Message", name: "message", textarea: true },
                            { label: "Next Steps", name: "steps", textarea: true },
                            { label: "Agent Name", name: "agent" },
                            { label: "Phone", name: "phone" },
                        ].map((f) => (
                            <div key={f.name} className="space-y-1">
                                <label className="text-sm text-[#a0b4c3]">{f.label}</label>
                                {f.textarea ? (
                                    <textarea
                                        className="w-full p-2 rounded bg-[#2c3e50] text-white border border-[#5a6a7c]"
                                        name={f.name}
                                        value={data[f.name]}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-[#2c3e50] text-white border border-[#5a6a7c]"
                                        name={f.name}
                                        value={data[f.name]}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                        ))}

                        <button onClick={download} className="w-full py-2 bg-[#40e0d0] text-black font-semibold rounded-lg hover:bg-[#36c5b6] transition">
                            Download HTML
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

/************************** Template 4: Just Sold **************************/

function JustSoldTemplate() {
    const [data, setData] = useState({
        address: "456 Maple Drive, Beverly Hills, CA",
        price: "$525,000",
        days: "15 days",
        highlight:
            "This beautiful property sold in record time thanks to strategic pricing and exceptional marketing. The sellers were thrilled with the outcome!",
        cta:
            "Thinking of selling your home? Let's discuss how I can help you achieve similar results. Contact me today for a free market evaluation.",
        agent: "Your Name",
        phone: "(555) 123-4567",
    });

    const previewRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((d) => ({ ...d, [name]: value }));
    };

    const download = () => {
        downloadHTML("just-sold-email.html", wrapEmail(previewRef.current.outerHTML));
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-4">Just Sold Announcement</h3>
            <div className={cardWrapper}>
                <div className="grid md:grid-cols-2">
                    <div className="bg-white text-black p-6" ref={previewRef} data-template="sold">
                        <header style={{ background: "linear-gradient(135deg,#f093fb,#f5576c)", padding: 20, color: "#fff", textAlign: "center" }}>
                            <h1 style={{ margin: 0, fontSize: 26 }}>🎉 JUST SOLD!</h1>
                            <p style={{ margin: 4 }}>Another Success Story</p>
                        </header>
                        <main style={{ padding: 20 }}>
                            <h2 style={{ color: "#2c3e50", marginBottom: 15 }}>{data.address}</h2>
                            <div style={{ fontSize: 32, fontWeight: "bold", color: "#f093fb", margin: "15px 0" }}>{data.price}</div>
                            <div style={{ background: "#fff", padding: 12, borderRadius: 6, display: "inline-block", border: "1px solid #e9ecef", marginBottom: 15 }}>
                                <div style={{ fontWeight: "bold", color: "#40e0d0", fontSize: 18 }}>{data.days}</div>
                                <div style={{ fontSize: 12, color: "#666" }}>Days on Market</div>
                            </div>
                            <p style={{ color: "#555", marginBottom: 20 }}>{data.highlight}</p>
                            <div style={{ background: "#fff3cd", border: "1px solid #ffeaa7", borderRadius: 6, padding: 15, marginBottom: 20 }}>
                                <h3 style={{ color: "#856404", margin: 0 }}>🏠 Thinking of Selling?</h3>
                                <p style={{ color: "#856404", margin: 0 }}>{data.cta}</p>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <a href="#" className="cta" style={{ background: "#f093fb" }}>
                                    Get Free Home Evaluation
                                </a>
                            </div>
                            <div className="sig" style={{ marginTop: 20 }}>
                                <p style={{ margin: 0, color: "#2c3e50" }}>
                                    <strong>{data.agent}</strong>
                                </p>
                                <p style={{ margin: 0 }}>Licensed Real Estate Agent</p>
                                <p style={{ margin: 0 }}>📞 {data.phone}</p>
                            </div>
                        </main>
                        <footer style={{ background: "#f8f9fa", padding: 15, fontSize: 14, textAlign: "center" }}>
                            © 2024 {data.agent}. Licensed Real Estate Professional.
                        </footer>
                    </div>

                    {/* Controls */}
                    <div className="p-6 space-y-4">
                        {[
                            { label: "Sold Property Address", name: "address" },
                            { label: "Sale Price", name: "price" },
                            { label: "Days on Market", name: "days" },
                            { label: "Sale Highlight", name: "highlight", textarea: true },
                            { label: "Call to Action", name: "cta", textarea: true },
                            { label: "Agent Name", name: "agent" },
                            { label: "Phone", name: "phone" },
                        ].map((f) => (
                            <div key={f.name} className="space-y-1">
                                <label className="text-sm text-[#a0b4c3]">{f.label}</label>
                                {f.textarea ? (
                                    <textarea
                                        className="w-full p-2 rounded bg-[#2c3e50] text-white border border-[#5a6a7c]"
                                        name={f.name}
                                        value={data[f.name]}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded bg-[#2c3e50] text-white border border-[#5a6a7c]"
                                        name={f.name}
                                        value={data[f.name]}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                        ))}

                        <button onClick={download} className="w-full py-2 bg-[#40e0d0] text-black font-semibold rounded-lg hover:bg-[#36c5b6] transition">
                            Download HTML
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}


