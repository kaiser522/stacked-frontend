import React, { useMemo, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const gradients = [
    "linear-gradient(135deg, #40e0d0, #36c5b6)",
    "linear-gradient(135deg, #667eea, #764ba2)",
    "linear-gradient(135deg, #f093fb, #f5576c)",
    "linear-gradient(135deg, #4facfe, #00f2fe)",
];

export default function ProfessionalListingFlyers() {
    const [listing, setListing] = useState({
        header: gradients[0],
        price: "$525,000",
        address: "123 Oak Street",
        beds: "3",
        baths: "2.5",
        sqft: "2,100",
        description: "Beautiful updated home with modern finishes, spacious layout, and prime location. Move-in ready!",
        agent: "Your Name",
        phone: "(555) 123-4567",
    });

    const [sold, setSold] = useState({
        header: gradients[2],
        price: "$485,000",
        address: "456 Maple Drive",
        days: "15",
        description: "Another successful sale in your neighborhood! Thinking of selling?",
        agent: "Your Name",
        phone: "(555) 123-4567",
    });

    const [market, setMarket] = useState({
        header: gradients[1],
        neighborhood: "Beverly Hills Area",
        month: "March 2024",
        avgPrice: "$675K",
        priceChange: "+8.2%",
        days: "22",
        message: "Your neighborhood is hot! Home values are rising. Want to know what your home is worth?",
        agent: "Your Name",
        phone: "(555) 123-4567",
    });

    const featureBox = (value, label) => (
        <div style={{ background: "#f8f9fa", padding: 6, borderRadius: 5, minWidth: 50, textAlign: "center" }}>
            <div style={{ fontWeight: "bold", color: "#40e0d0", fontSize: 14 }}>{value}</div>
            <div style={{ fontSize: 9, color: "#666", marginTop: 2 }}>{label}</div>
        </div>
    );

    const statBox = (value, label) => (
        <div style={{ background: "#f8f9fa", padding: 8, borderRadius: 5, textAlign: "center" }}>
            <div style={{ fontWeight: "bold", color: "#40e0d0", fontSize: 12 }}>{value}</div>
            <div style={{ fontSize: 8, color: "#666", marginTop: 2 }}>{label}</div>
        </div>
    );

    const ListingFlyer = useMemo(() => (
        <div style={{ width: 280, height: 360, background: "white", borderRadius: 15, overflow: "hidden", boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}>
            <div style={{ padding: 20, textAlign: "center", color: "white", background: listing.header }}>
                <div style={{ background: "rgba(255,255,255,0.2)", display: "inline-block", padding: "6px 12px", borderRadius: 15, fontSize: 12, fontWeight: 700 }}>FOR SALE</div>
                <div style={{ fontSize: 28, fontWeight: 700, margin: "10px 0", textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}>{listing.price}</div>
                <h3 style={{ margin: 0, fontSize: 14 }}>{listing.address}</h3>
            </div>
            <div style={{ padding: 20, color: "#333" }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                    {featureBox(listing.beds, "Beds")}
                    {featureBox(listing.baths, "Baths")}
                    {featureBox(listing.sqft, "Sq Ft")}
                </div>
                <p style={{ fontSize: 11, color: "#555", lineHeight: 1.3 }}>{listing.description}</p>
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #e9ecef" }}>
                    <div style={{ fontWeight: 700, color: "#2c3e50", fontSize: 14 }}>{listing.agent}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>📞 {listing.phone}</div>
                    <div style={{ fontSize: 10, color: "#666" }}>Licensed Real Estate Agent</div>
                </div>
            </div>
        </div>
    ), [listing]);

    const SoldFlyer = useMemo(() => (
        <div style={{ width: 280, height: 360, background: "white", borderRadius: 15, overflow: "hidden", boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}>
            <div style={{ padding: 20, textAlign: "center", color: "white", background: sold.header }}>
                <div style={{ background: "#28a745", display: "inline-block", padding: "6px 12px", borderRadius: 15, fontSize: 12, fontWeight: 700 }}>SOLD!</div>
                <div style={{ fontSize: 28, fontWeight: 700, margin: "10px 0", textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}>{sold.price}</div>
                <h3 style={{ margin: 0, fontSize: 14 }}>{sold.address}</h3>
            </div>
            <div style={{ padding: 20, color: "#333" }}>
                <div style={{ background: "#fff3cd", border: "1px solid #ffeaa7", borderRadius: 6, padding: 10, margin: "10px 0" }}>
                    <div style={{ fontWeight: 700, color: "#856404", fontSize: 12 }}>Sold in {sold.days} Days!</div>
                    <div style={{ fontSize: 10, color: "#856404" }}>Above asking price</div>
                </div>
                <p style={{ fontSize: 11, color: "#555", lineHeight: 1.3 }}>{sold.description}</p>
                <div style={{ background: "#40e0d0", color: "white", padding: 8, borderRadius: 5, fontWeight: 600, fontSize: 11, margin: "10px 0" }}>
                    <div style={{ marginBottom: 3 }}>Get Your FREE Market Analysis!</div>
                    <div style={{ fontSize: 10 }}>Find out what your home is worth</div>
                </div>
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #e9ecef" }}>
                    <div style={{ fontWeight: 700, color: "#2c3e50", fontSize: 14 }}>{sold.agent}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>📞 {sold.phone}</div>
                    <div style={{ fontSize: 10, color: "#666" }}>Licensed Real Estate Agent</div>
                </div>
            </div>
        </div>
    ), [sold]);

    const MarketFlyer = useMemo(() => (
        <div style={{ width: 280, height: 360, background: "white", borderRadius: 15, overflow: "hidden", boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}>
            <div style={{ padding: 20, textAlign: "center", color: "white", background: market.header }}>
                <div style={{ background: "#17a2b8", display: "inline-block", padding: "6px 12px", borderRadius: 15, fontSize: 12, fontWeight: 700 }}>MARKET UPDATE</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>{market.neighborhood}</div>
                <div style={{ fontSize: 12, opacity: 0.9, marginTop: 5 }}>{market.month}</div>
            </div>
            <div style={{ padding: 20, color: "#333" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 10 }}>
                    {statBox(market.avgPrice, "Avg. Price")}
                    {statBox(market.priceChange, "YoY Change")}
                    {statBox(market.days, "Days on Market")}
                </div>
                <p style={{ fontSize: 11, color: "#555", lineHeight: 1.3 }}>{market.message}</p>
                <div style={{ background: "#40e0d0", color: "white", padding: 8, borderRadius: 5, fontWeight: 600, fontSize: 11, margin: "10px 0" }}>
                    <div style={{ marginBottom: 3 }}>FREE Home Valuation</div>
                    <div style={{ fontSize: 10 }}>Call for your personalized report</div>
                </div>
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #e9ecef" }}>
                    <div style={{ fontWeight: 700, color: "#2c3e50", fontSize: 14 }}>{market.agent}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>📞 {market.phone}</div>
                    <div style={{ fontSize: 10, color: "#666" }}>Your Local Real Estate Expert</div>
                </div>
            </div>
        </div>
    ), [market]);

    const buildPrintHtml = (contentHtml) => `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Flyer - Print Ready</title>
<style>
  @page { size: 8.5in 11in; margin: 0; }
  html, body { height: 100%; }
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  .center { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
</style>
</head><body><div class="center">${contentHtml}</div></body></html>`;

    const downloadTemplate = (type) => {
        let htmlContent = "";
        if (type === "listing") htmlContent = renderToStaticMarkup(ListingFlyer);
        if (type === "sold") htmlContent = renderToStaticMarkup(SoldFlyer);
        if (type === "market") htmlContent = renderToStaticMarkup(MarketFlyer);
        const full = buildPrintHtml(htmlContent);
        const blob = new Blob([full], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${type}-flyer.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-[#3A4E5E] text-white">
            <main className="max-w-[1400px] mx-auto px-8 py-8 border-l-4 border-[#21D4C6]">
                {/* Page Header - mirrors the HTML header */}
                <section className="mb-8">
                    <div className="rounded-2xl border-2 border-[#21D4C6] p-6 bg-[#3A4E5E]">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="w-14 h-14 rounded-xl bg-[#21D4C6] text-black flex items-center justify-center text-3xl">📄</div>
                            <h1 className="text-3xl md:text-4xl font-bold">Professional Flyer Generator Hub</h1>
                        </div>
                        <p className="text-center text-[#A0B0C0] mb-4">Eye-catching property flyers for print and digital.</p>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#A0B0C0] mb-4">
                            <span>🖨️ Print PDF</span>
                            <span>⚠️ 8.5&quot; x 11&quot; Standard Size</span>
                            <span>🎯 Lead Generation</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                            {['listing', 'print ready', 'marketing'].map(t => (
                                <span key={t} className="px-4 py-1 rounded-full text-sm bg-[#2f3f4e] border border-[#21D4C6] text-[#21D4C6]">{t}</span>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <button onClick={() => ['listing', 'sold', 'market'].forEach(downloadTemplate)} className="px-6 py-3 bg-[#21D4C6] text-black font-semibold rounded-xl shadow-inner">Download All Flyers</button>
                        </div>
                    </div>
                </section>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden">
                        <div className="p-5 bg-[#3A4E5E]"><h3 className="text-lg font-semibold">Property Listing Flyer</h3></div>
                        <div className="p-5 flex justify-center">{ListingFlyer}</div>
                        <div className="p-5 bg-[#3A4E5E] space-y-3">
                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Price</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={listing.price} onChange={(e) => setListing({ ...listing, price: e.target.value })} placeholder="Property Price" />
                                </div>
                                <div className="col-span-2 flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Address</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={listing.address} onChange={(e) => setListing({ ...listing, address: e.target.value })} placeholder="Property Address" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Beds</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={listing.beds} onChange={(e) => setListing({ ...listing, beds: e.target.value })} placeholder="Bedrooms" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Baths</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={listing.baths} onChange={(e) => setListing({ ...listing, baths: e.target.value })} placeholder="Bathrooms" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Sq Ft</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={listing.sqft} onChange={(e) => setListing({ ...listing, sqft: e.target.value })} placeholder="Sq Ft" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Description</label>
                                <textarea className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={listing.description} onChange={(e) => setListing({ ...listing, description: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Agent Name</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={listing.agent} onChange={(e) => setListing({ ...listing, agent: e.target.value })} placeholder="Agent Name" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Phone</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={listing.phone} onChange={(e) => setListing({ ...listing, phone: e.target.value })} placeholder="Phone" />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-[#A0B0C0] mb-1">Header Color</div>
                                <div className="flex gap-2">
                                    {gradients.map((g) => (
                                        <div key={g} onClick={() => setListing({ ...listing, header: g })} style={{ background: g, width: 40, height: 40, borderRadius: 8, cursor: "pointer", border: listing.header === g ? "3px solid #21D4C6" : "3px solid transparent" }} />
                                    ))}
                                </div>
                            </div>
                            <button onClick={() => downloadTemplate("listing")} className="w-full bg-[#21D4C6] text-black font-semibold rounded px-3 py-2">Download</button>
                        </div>
                    </div>

                    <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden">
                        <div className="p-5 bg-[#3A4E5E]"><h3 className="text-lg font-semibold">Just Sold Flyer</h3></div>
                        <div className="p-5 flex justify-center">{SoldFlyer}</div>
                        <div className="p-5 bg-[#3A4E5E] space-y-3">
                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Price</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={sold.price} onChange={(e) => setSold({ ...sold, price: e.target.value })} placeholder="Sold Price" />
                                </div>
                                <div className="col-span-2 flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Address</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={sold.address} onChange={(e) => setSold({ ...sold, address: e.target.value })} placeholder="Property Address" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Days on Market</label>
                                <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={sold.days} onChange={(e) => setSold({ ...sold, days: e.target.value })} placeholder="Days on Market" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Description</label>
                                <textarea className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={sold.description} onChange={(e) => setSold({ ...sold, description: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Agent Name</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={sold.agent} onChange={(e) => setSold({ ...sold, agent: e.target.value })} placeholder="Agent Name" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Phone</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={sold.phone} onChange={(e) => setSold({ ...sold, phone: e.target.value })} placeholder="Phone" />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-[#A0B0C0] mb-1">Header Color</div>
                                <div className="flex gap-2">
                                    {gradients.map((g) => (
                                        <div key={g} onClick={() => setSold({ ...sold, header: g })} style={{ background: g, width: 40, height: 40, borderRadius: 8, cursor: "pointer", border: sold.header === g ? "3px solid #21D4C6" : "3px solid transparent" }} />
                                    ))}
                                </div>
                            </div>
                            <button onClick={() => downloadTemplate("sold")} className="w-full bg-[#21D4C6] text-black font-semibold rounded px-3 py-2">Download</button>
                        </div>
                    </div>

                    <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden">
                        <div className="p-5 bg-[#3A4E5E]"><h3 className="text-lg font-semibold">Market Update Flyer</h3></div>
                        <div className="p-5 flex justify-center">{MarketFlyer}</div>
                        <div className="p-5 bg-[#3A4E5E] space-y-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Neighborhood</label>
                                <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={market.neighborhood} onChange={(e) => setMarket({ ...market, neighborhood: e.target.value })} placeholder="Neighborhood Name" />
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Avg Price</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={market.avgPrice} onChange={(e) => setMarket({ ...market, avgPrice: e.target.value })} placeholder="Avg Price" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">YoY Change</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={market.priceChange} onChange={(e) => setMarket({ ...market, priceChange: e.target.value })} placeholder="YoY Change" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Days</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={market.days} onChange={(e) => setMarket({ ...market, days: e.target.value })} placeholder="Days on Market" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Message</label>
                                <textarea className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2 w-full" value={market.message} onChange={(e) => setMarket({ ...market, message: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Agent Name</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={market.agent} onChange={(e) => setMarket({ ...market, agent: e.target.value })} placeholder="Agent Name" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Phone</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={market.phone} onChange={(e) => setMarket({ ...market, phone: e.target.value })} placeholder="Phone" />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-[#A0B0C0] mb-1">Header Color</div>
                                <div className="flex gap-2">
                                    {gradients.map((g) => (
                                        <div key={g} onClick={() => setMarket({ ...market, header: g })} style={{ background: g, width: 40, height: 40, borderRadius: 8, cursor: "pointer", border: market.header === g ? "3px solid #21D4C6" : "3px solid transparent" }} />
                                    ))}
                                </div>
                            </div>
                            <button onClick={() => downloadTemplate("market")} className="w-full bg-[#21D4C6] text-black font-semibold rounded px-3 py-2">Download</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
