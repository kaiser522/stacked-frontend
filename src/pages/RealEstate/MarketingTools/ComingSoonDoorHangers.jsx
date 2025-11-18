import React, { useMemo, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
// We'll dynamically import html2canvas & jsPDF when needed

const gradients = [
    "linear-gradient(135deg, #40e0d0, #36c5b6)",
    "linear-gradient(135deg, #667eea, #764ba2)",
    "linear-gradient(135deg, #f093fb, #f5576c)",
    "linear-gradient(135deg, #4facfe, #00f2fe)",
];

export default function ComingSoonDoorHangers() {
    const [state, setState] = useState({
        header: gradients[0],
        price: "$525,000",
        address: "123 Oak Street",
        beds: "3",
        baths: "2.5",
        sqft: "2,100",
        description: "Beautiful family home in prime location. Contact me for exclusive details!",
        agent: "Your Name",
        phone: "(555) 123-4567",
        badge: "Coming Soon",
    });

    const feature = (value, label) => (
        <div style={{ background: "#f8f9fa", padding: "8px 12px", borderRadius: 5, textAlign: "center", minWidth: 60, border: "1px solid #e9ecef" }}>
            <div style={{ fontWeight: 700, color: "#40e0d0", fontSize: 16 }}>{value}</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>{label}</div>
        </div>
    );

    const previewRef = React.useRef();
    const Preview = useMemo(() => (
        <div ref={previewRef} className="door-hanger" style={{ width: "100%", maxWidth: 280, background: "white", borderRadius: 15, position: "relative", overflow: "hidden", boxShadow: "0 8px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "60px 20px 20px", textAlign: "center", color: "white", background: state.header }}>
                <div style={{ background: "#f093fb", display: "inline-block", padding: "8px 16px", borderRadius: 20, fontWeight: 700, fontSize: 14, marginBottom: 15, textTransform: "uppercase" }}>{state.badge}</div>
                <div style={{ fontSize: 32, fontWeight: 700, textShadow: "2px 2px 4px rgba(0,0,0,0.1)", margin: "8px 0" }}>{state.price}</div>
                <h3 style={{ margin: 0, fontSize: 16 }}>{state.address}</h3>
            </div>
            <div style={{ flex: 1, padding: 20, textAlign: "center", color: "#333", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 15, margin: "10px 0", flexWrap: "wrap" }}>
                    {feature(state.beds, "Beds")}
                    {feature(state.baths, "Baths")}
                    {feature(state.sqft, "Sq Ft")}
                </div>
                <p style={{ fontSize: 14, color: "#555", margin: "12px 0" }}>{state.description}</p>
                <div style={{ background: "#40e0d0", color: "white", padding: 12, borderRadius: 8, fontWeight: 600 }}>Get Notified First! Call or text for exclusive access</div>
                <div style={{ marginTop: 15, paddingTop: 15, borderTop: "1px solid #e9ecef" }}>
                    <div style={{ fontWeight: 700, color: "#2c3e50", fontSize: 16 }}>{state.agent}</div>
                    <div style={{ fontSize: 14, color: "#666" }}>📞 {state.phone}</div>
                </div>
            </div>
        </div>
    ), [state]);

    const buildPrintHtml = (contentHtml) => `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Door Hanger</title>
<style>@page{size:4.25in 11in;margin:0}body{font-family:Arial,sans-serif;margin:0;padding:0;background:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh}.door-hanger{width:4.25in;height:11in;page-break-inside:avoid}</style>
</head><body>${contentHtml}</body></html>`;

    const _downloadHtml = () => {
        const html = renderToStaticMarkup(Preview);
        const full = buildPrintHtml(html);
        const blob = new Blob([full], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "door-hanger.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-[#3A4E5E] text-white">
            <main className="max-w-[1400px] mx-auto px-8 py-8">
                {/* Header */}
                <header className="text-center mb-12 p-8 bg-[rgba(0,0,0,0.2)] border-2 border-[#40e0d0] rounded-2xl">
                    <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 mb-3">
                        <span className="inline-flex items-center justify-center w-12 h-12 bg-[#40e0d0] rounded-xl text-2xl">🏠</span>
                        Coming Soon Door Hangers
                    </h1>
                    <p className="text-lg text-[#a0b4c3] mb-4">Door hangers to generate pre-listing interest.</p>

                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[#a0b4c3] mb-4">
                        <span>🚪 Print PDF</span>
                        <span>📏 4.25" x 11" Standard Size</span>
                        <span>🎯 Lead Generation</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                        {["neighborhood", "prospecting", "marketing"].map((t) => (
                            <span key={t} className="bg-[rgba(64,224,208,0.2)] text-[#40e0d0] px-3 py-1 rounded-full border border-[rgba(64,224,208,0.3)] text-xs">
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Bulk download placeholder (only one template for now) */}
                    <button
                        onClick={() => {
                            const btns = document.querySelectorAll('[data-download="hanger"]');
                            btns.forEach((b, idx) => setTimeout(() => b.click(), idx * 500));
                        }}
                        className="bulk-download bg-[#40e0d0] text-[#2c3e50] font-semibold py-3 px-6 rounded-xl hover:bg-[#36c5b6] transition"
                    >
                        Download All Templates
                    </button>
                </header>

                {/* Templates grid */}
                <div
                    className="grid gap-16"
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))" }}
                >
                    {/* Coming-Soon card */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden">
                            <div className="p-5 flex justify-center">{Preview}</div>
                        </div>
                        <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] p-5 space-y-3">
                            <h3 className="text-lg font-semibold mb-3">Coming Soon Listing</h3>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Price</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={state.price} onChange={(e) => setState({ ...state, price: e.target.value })} placeholder="Price" />
                                </div>
                                <div className="col-span-2 flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Address</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={state.address} onChange={(e) => setState({ ...state, address: e.target.value })} placeholder="Address" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {['Beds', 'Baths', 'Sq Ft'].map((lbl, idx) => (
                                    <div key={lbl} className="flex flex-col gap-1">
                                        <label className="text-sm text-[#A0B0C0]">{lbl}</label>
                                        <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={idx === 0 ? state.beds : idx === 1 ? state.baths : state.sqft} onChange={(e) => setState({ ...state, ...(idx === 0 ? { beds: e.target.value } : idx === 1 ? { baths: e.target.value } : { sqft: e.target.value }) })} placeholder={lbl} />
                                    </div>))}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Description</label>
                                <textarea className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={state.description} onChange={(e) => setState({ ...state, description: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Agent</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={state.agent} onChange={(e) => setState({ ...state, agent: e.target.value })} placeholder="Agent" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Phone</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={state.phone} onChange={(e) => setState({ ...state, phone: e.target.value })} placeholder="Phone" />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-[#A0B0C0] mb-1">Header Color</div>
                                <div className="flex gap-2">
                                    {gradients.map((g) => (
                                        <div key={g} onClick={() => setState({ ...state, header: g })} style={{ background: g, width: 40, height: 40, borderRadius: 8, cursor: "pointer", border: state.header === g ? "3px solid #21D4C6" : "3px solid transparent" }} />
                                    ))}
                                </div>
                            </div>
                            <button data-download="hanger" onClick={() => downloadPdf('coming-soon-door-hanger', previewRef.current)} className="w-full bg-[#21D4C6] text-black font-semibold rounded px-3 py-2 cursor-pointer">Download PDF</button>
                        </div>
                    </div>

                    {/* Just Sold card */}
                    <JustSoldDoorHanger />

                    {/* Neighborhood Expert card */}
                    <NeighborhoodExpertDoorHanger />
                </div>
            </main>
        </div>
    );
}

/***************** Additional Templates *****************/

function JustSoldDoorHanger() {
    const [state, setState] = useState({
        header: "linear-gradient(135deg, #f093fb, #f5576c)",
        price: "$485,000",
        address: "456 Maple Drive",
        days: "15",
        description: "Another successful sale in your neighborhood! Thinking of selling?",
        agent: "Your Name",
        phone: "(555) 123-4567",
        badge: "Just Sold!",
    });

    const previewRef = React.useRef();
    const Preview = useMemo(() => (
        <div ref={previewRef} className="door-hanger" style={{ width: "100%", maxWidth: 280, background: "white", borderRadius: 15, overflow: "hidden", boxShadow: "0 8px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "60px 20px 20px", textAlign: "center", color: "white", background: state.header }}>
                <div style={{ background: "#28a745", display: "inline-block", padding: "8px 16px", borderRadius: 20, fontWeight: 700, fontSize: 14, marginBottom: 15, textTransform: "uppercase" }}>{state.badge}</div>
                <div style={{ fontSize: 32, fontWeight: 700, textShadow: "2px 2px 4px rgba(0,0,0,0.1)", margin: "8px 0" }}>{state.price}</div>
                <h3 style={{ margin: 0, fontSize: 16 }}>{state.address}</h3>
            </div>
            <div style={{ flex: 1, padding: 20, textAlign: "center", color: "#333", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ background: "#fff3cd", padding: 12, borderRadius: 8, margin: "10px 0", border: "1px solid #ffeaa7" }}>
                    <div style={{ fontWeight: "bold", color: "#856404", fontSize: 14 }}>Sold in {state.days} Days!</div>
                    <div style={{ fontSize: 12, color: "#856404" }}>Above asking price</div>
                </div>
                <p style={{ fontSize: 14, color: "#555", margin: "12px 0" }}>{state.description}</p>
                <div style={{ background: "#f093fb", color: "white", padding: 12, borderRadius: 8, fontWeight: 600 }}>Get Your FREE Market Analysis!</div>
                <div style={{ marginTop: 15, paddingTop: 15, borderTop: "1px solid #e9ecef" }}>
                    <div style={{ fontWeight: 700, color: "#2c3e50", fontSize: 16 }}>{state.agent}</div>
                    <div style={{ fontSize: 14, color: "#666" }}>📞 {state.phone}</div>
                </div>
            </div>
        </div>
    ), [state]);

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden">
                <div className="p-5 flex justify-center">{Preview}</div>
            </div>
            <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] p-5 space-y-3">
                <h3 className="text-lg font-semibold mb-3">Just Sold Announcement</h3>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#A0B0C0]">Price</label>
                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={state.price} onChange={(e) => setState({ ...state, price: e.target.value })} placeholder="Price" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#A0B0C0]">Address</label>
                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={state.address} onChange={(e) => setState({ ...state, address: e.target.value })} placeholder="Address" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#A0B0C0]">Days on Market</label>
                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={state.days} onChange={(e) => setState({ ...state, days: e.target.value })} placeholder="Days on Market" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#A0B0C0]">Description</label>
                    <textarea className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={state.description} onChange={(e) => setState({ ...state, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-[#A0B0C0]">Agent</label>
                        <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={state.agent} onChange={(e) => setState({ ...state, agent: e.target.value })} placeholder="Agent" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-[#A0B0C0]">Phone</label>
                        <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={state.phone} onChange={(e) => setState({ ...state, phone: e.target.value })} placeholder="Phone" />
                    </div>
                </div>
                {/* Color picker */}
                <div>
                    <div className="text-sm text-[#A0B0C0] mb-1">Header Color</div>
                    <div className="flex gap-2">
                        {gradients.map((g) => (
                            <div key={g} onClick={() => setState({ ...state, header: g })} style={{ background: g, width: 40, height: 40, borderRadius: 8, cursor: "pointer", border: state.header === g ? "3px solid #21D4C6" : "3px solid transparent" }} />
                        ))}
                    </div>
                </div>

                {/* Download */}
                <button data-download="hanger" onClick={() => downloadPdf('just-sold-door-hanger', previewRef.current)} className="w-full bg-[#21D4C6] text-black font-semibold rounded px-3 py-2 cursor-pointer">Download PDF</button>
            </div>
        </div>
    );
}

function NeighborhoodExpertDoorHanger() {
    const [state, setState] = useState({
        header: "linear-gradient(135deg, #667eea, #764ba2)",
        neighborhood: "Beverly Hills Area",
        avgPrice: "$675K",
        priceChange: "+8.2%",
        daysMarket: "22",
        message: "Your neighborhood is hot! Home values are rising. Want to know what your home is worth?",
        agent: "Your Name",
        phone: "(555) 123-4567",
    });

    const stat = (value, label) => (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "bold", color: "#40e0d0", fontSize: 18 }}>{value}</div>
            <div style={{ fontSize: 11, color: "#666" }}>{label}</div>
        </div>
    );

    const previewRef = React.useRef();
    const Preview = useMemo(() => (
        <div ref={previewRef} className="door-hanger" style={{ width: "100%", maxWidth: 280, background: "white", borderRadius: 15, overflow: "hidden", boxShadow: "0 8px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "60px 20px 20px", textAlign: "center", color: "white", background: state.header }}>
                <div style={{ background: "#17a2b8", display: "inline-block", padding: "8px 16px", borderRadius: 20, fontWeight: 700, fontSize: 14, marginBottom: 15, textTransform: "uppercase" }}>Your Neighborhood Expert</div>
                <h2 style={{ margin: "15px 0 10px 0", fontSize: 18 }}>Market Update</h2>
                <h3 style={{ margin: 0, fontSize: 14 }}>{state.neighborhood}</h3>
            </div>
            <div style={{ flex: 1, padding: 20, textAlign: "center", color: "#333", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", justifyContent: "space-between", margin: "15px 0" }}>
                    {stat(state.avgPrice, "Avg. Price")}
                    {stat(state.priceChange, "YoY Change")}
                    {stat(state.daysMarket, "Days on Market")}
                </div>
                <p style={{ fontSize: 13, color: "#555", margin: "15px 0" }}>{state.message}</p>
                <div style={{ background: "#667eea", color: "white", padding: 12, borderRadius: 8, fontWeight: 600 }}>FREE Home Valuation</div>
                <div style={{ marginTop: 15, paddingTop: 15, borderTop: "1px solid #e9ecef" }}>
                    <div style={{ fontWeight: 700, color: "#2c3e50", fontSize: 16 }}>{state.agent}</div>
                    <div style={{ fontSize: 14, color: "#666" }}>📞 {state.phone}</div>
                </div>
            </div>
        </div>
    ), [state]);

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden">
                <div className="p-5 flex justify-center">{Preview}</div>
            </div>
            <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] p-5 space-y-3">
                <h3 className="text-lg font-semibold mb-3">Neighborhood Expert</h3>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#A0B0C0]">Neighborhood</label>
                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={state.neighborhood} onChange={(e) => setState({ ...state, neighborhood: e.target.value })} placeholder="Neighborhood" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {['Avg Price', 'Price Change', 'Days'].map((lbl, idx) => (
                        <div key={lbl} className="flex flex-col gap-1">
                            <label className="text-sm text-[#A0B0C0]">{lbl}</label>
                            <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={idx === 0 ? state.avgPrice : idx === 1 ? state.priceChange : state.daysMarket} onChange={(e) => setState({ ...state, ...(idx === 0 ? { avgPrice: e.target.value } : idx === 1 ? { priceChange: e.target.value } : { daysMarket: e.target.value }) })} placeholder={lbl} />
                        </div>))}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#A0B0C0]">Message</label>
                    <textarea className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={state.message} onChange={(e) => setState({ ...state, message: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-[#A0B0C0]">Agent</label>
                        <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={state.agent} onChange={(e) => setState({ ...state, agent: e.target.value })} placeholder="Agent" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-[#A0B0C0]">Phone</label>
                        <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={state.phone} onChange={(e) => setState({ ...state, phone: e.target.value })} placeholder="Phone" />
                    </div>
                </div>

                {/* Color picker */}
                <div>
                    <div className="text-sm text-[#A0B0C0] mb-1">Header Color</div>
                    <div className="flex gap-2">
                        {gradients.map((g) => (
                            <div key={g} onClick={() => setState({ ...state, header: g })} style={{ background: g, width: 40, height: 40, borderRadius: 8, cursor: "pointer", border: state.header === g ? "3px solid #21D4C6" : "3px solid transparent" }} />
                        ))}
                    </div>
                </div>

                {/* Download */}
                <button data-download="hanger" onClick={() => downloadPdf('neighborhood-expert-door-hanger', previewRef.current)} className="w-full bg-[#21D4C6] text-black font-semibold rounded px-3 py-2 cursor-pointer">Download PDF</button>
            </div>
        </div>
    );
}

// helper download function shared
async function downloadPdf(fileName, element) {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf")
    ]);

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // pdf size matches hanger: 4.25in x 11in -> in pts (1in=72pt)
    const pdfWidth = 4.25 * 72;
    const pdfHeight = 11 * 72;
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: [pdfWidth, pdfHeight] });
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);
}


