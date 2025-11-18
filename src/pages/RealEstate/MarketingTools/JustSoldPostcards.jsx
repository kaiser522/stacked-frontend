import React, { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Utility to build a full HTML string for printing/downloading
const buildPrintHtml = (bodyHtml) => `<!DOCTYPE html><html><head><meta charset="UTF-8" /><title>Just Sold Postcard</title><style>@page{size:6in 4in;margin:0}body{margin:0;padding:0;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;background:#fff}</style></head><body>${bodyHtml}</body></html>`;

function usePostcardState(initial) {
    const [state, setState] = useState(initial);
    const handle = (key) => (e) => setState({ ...state, [key]: e.target.value });
    return [state, handle, setState];
}

/* ----------------------------- Postcard Layout ----------------------------- */
const Postcard = React.forwardRef(({ state, variant }, ref) => {
    const { gradient, price, address, days, message, agent, phone, extra } = state;
    return (
        <div
            ref={ref}
            className="postcard w-full max-w-[400px] bg-white rounded-md shadow-xl overflow-hidden font-sans"
            style={{ fontFamily: "Arial, sans-serif", minHeight: "250px" }}
        >
            <div className="postcard-front w-full h-full flex flex-col">
                {/* Header */}
                <div
                    className="postcard-header flex flex-col justify-center items-center text-center text-white p-6"
                    style={{ background: gradient }}
                >
                    {variant === "modern" ? (
                        <div className="w-full flex justify-between items-center mb-3">
                            <div className="sold-badge bg-green-600 text-white px-4 py-1 rounded-full uppercase text-xs font-bold">
                                SOLD
                            </div>
                            <div className="bg-white/20 px-2 py-1 rounded text-xs">
                                {days} Days
                            </div>
                        </div>
                    ) : (
                        <div className="sold-badge bg-green-600 text-white px-4 py-1 rounded-full uppercase text-xs font-bold mb-2">
                            {variant === "classic" ? "Just Sold!" : "SOLD"}
                        </div>
                    )}

                    <div className="property-price text-2xl font-bold mb-1 drop-shadow-md">{price}</div>
                    <div className="property-address text-base opacity-95 mb-1">{address}</div>
                    {variant === "classic" && (
                        <div className="sale-details text-xs opacity-90">Sold in {days} Days!</div>
                    )}
                </div>

                {/* Body */}
                <div className="postcard-body bg-white text-center text-[#333] p-4">
                    {variant === "modern" ? (
                        <>
                            <div className="bg-green-100 border-l-4 border-green-600 p-2 rounded mb-2">
                                <div className="text-[13px] font-semibold text-green-900">Market Success Story</div>
                                <div className="text-[11px] text-green-900">{message}</div>
                            </div>
                            <div className="cta-message bg-green-600 text-white py-2 px-3 rounded text-xs font-semibold mb-2">
                                Want similar results? Let's talk!
                            </div>
                        </>
                    ) : variant === "expert" ? (
                        <>
                            <div className="text-left text-[13px] font-semibold text-[#2c3e50] mb-2">Your Neighborhood Expert</div>
                            <div className="text-left text-[11px] text-[#555] mb-2">{message}</div>
                            <div className="cta-message bg-indigo-500 text-white py-2 px-3 rounded text-xs font-semibold mb-2">
                                FREE Market Analysis - Call Today!
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="success-message text-sm font-semibold text-[#2c3e50] mb-2">{message}</div>
                            <div className="cta-message bg-cyan-400 text-white py-2 px-3 rounded text-xs font-semibold mb-2">
                                Thinking of selling? Get your FREE market analysis!
                            </div>
                        </>
                    )}

                    {/* Agent */}
                    <div className="agent-info text-[11px] text-[#666] leading-tight">
                        <div className="agent-name font-bold text-[#2c3e50] text-[13px]">{agent}</div>
                        <div>📞 {phone}</div>
                        <div>{extra || (variant === "modern" ? "Your Local Market Expert" : variant === "expert" ? "Neighborhood Specialist" : "Licensed Real Estate Professional")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
});

/* ------------------------------ Main Component ------------------------------ */
export default function JustSoldPostcards() {
    /* ------------------------------- Templates ------------------------------- */
    const gradients = [
        "linear-gradient(135deg, #f093fb, #f5576c)",
        "linear-gradient(135deg, #40e0d0, #36c5b6)",
        "linear-gradient(135deg, #667eea, #764ba2)",
        "linear-gradient(135deg, #4facfe, #00f2fe)",
    ];

    const [classic, handleClassic] = usePostcardState({
        gradient: gradients[0],
        price: "$485,000",
        address: "123 Oak Street",
        days: "15",
        message: "Another successful sale in your neighborhood!",
        agent: "Your Name",
        phone: "(555) 123-4567",
    });

    const [modern, handleModern] = usePostcardState({
        gradient: gradients[1],
        price: "$675,000",
        address: "456 Maple Drive, Beverly Hills",
        days: "22",
        message: "Sold above asking price with multiple offers!",
        agent: "Your Name",
        phone: "(555) 123-4567",
    });

    const [expert, handleExpert] = usePostcardState({
        gradient: gradients[2],
        price: "$550,000",
        address: "789 Pine Avenue",
        days: "18",
        message: "I know your local market inside and out. Let me help you achieve similar results.",
        agent: "Your Name",
        phone: "(555) 123-4567",
    });

    const downloadHtml = (variant, state) => {
        const html = renderToStaticMarkup(<Postcard state={state} variant={variant} />);
        const blob = new Blob([buildPrintHtml(html)], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${variant}-just-sold-postcard.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const bulkDownload = () => {
        [
            ["classic", classic],
            ["modern", modern],
            ["expert", expert],
        ].forEach(([name, st], idx) => setTimeout(() => downloadHtml(name, st), idx * 300));
    };

    /* ------------------------------ Color Picker ----------------------------- */
    const ColorPicker = ({ value, onChange }) => (
        <div className="flex gap-2 mt-2">
            {gradients.map((g) => (
                <div
                    key={g}
                    onClick={() => onChange(g)}
                    style={{ background: g }}
                    className={`w-[40px] h-[40px] rounded-md cursor-pointer border-4 ${value === g ? "border-cyan-300" : "border-transparent"}`}
                />
            ))}
        </div>
    );

    /* ---------------------------------- JSX ---------------------------------- */
    return (
        <div className="min-h-screen bg-[#3A4E5E] text-white">
            <main className="max-w-[1600px] mx-auto px-8 py-8">
                {/* Header */}
                <header className="text-center mb-12 p-8 bg-black/20 border-2 border-cyan-300 rounded-2xl">
                    <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-3">
                        <span className="inline-flex items-center justify-center w-12 h-12 bg-cyan-300 rounded-xl text-2xl">📮</span>
                        Just Sold Postcards
                    </h1>
                    <p className="text-lg text-[#a0b4c3] mb-4">Announcement postcards for recent closings.</p>
                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[#a0b4c3] mb-4">
                        <span>📮 Print Ready</span>
                        <span>📏 4" x 6" Standard Size</span>
                        <span>🎯 Lead Generation</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                        {["direct mail", "farming", "marketing"].map((t) => (
                            <span key={t} className="tag bg-cyan-300/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-300/30 text-xs">
                                {t}
                            </span>
                        ))}
                    </div>
                    <button
                        onClick={bulkDownload}
                        className="bulk-download bg-cyan-300 text-[#2c3e50] font-semibold py-3 px-6 rounded-xl hover:bg-cyan-200 transition"
                    >
                        Download All Templates
                    </button>
                </header>

                {/* Templates Grid */}
                <div className="grid gap-16 md:grid-cols-2">
                    {/* Classic */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden flex justify-center p-5">
                            <Postcard state={classic} variant="classic" />
                        </div>
                        <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] p-5 space-y-3">
                            <h3 className="text-lg font-semibold mb-3">Classic Just Sold</h3>
                            <label className="text-sm text-[#a0b4c3]">Sale Price</label>
                            <input placeholder="Sale Price" className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={classic.price} onChange={handleClassic("price")} />
                            <label className="text-sm text-[#a0b4c3]">Address</label>
                            <input placeholder="Address" className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={classic.address} onChange={handleClassic("address")} />
                            <label className="text-sm text-[#a0b4c3]">Days on Market</label>
                            <input placeholder="Days" className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={classic.days} onChange={handleClassic("days")} />
                            <label className="text-sm text-[#a0b4c3]">Success Message</label>
                            <textarea placeholder="Success message" className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={classic.message} onChange={handleClassic("message")} />
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#a0b4c3]">Agent Name</label>
                                    <input placeholder="Agent" className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={classic.agent} onChange={handleClassic("agent")} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#a0b4c3]">Phone</label>
                                    <input placeholder="Phone" className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={classic.phone} onChange={handleClassic("phone")} />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-[#A0B0C0] mb-1">Header Color</div>
                                <ColorPicker value={classic.gradient} onChange={(g) => handleClassic("gradient")({ target: { value: g } })} />
                            </div>
                            <button onClick={() => downloadHtml("classic", classic)} className="w-full bg-cyan-400 text-black font-semibold rounded px-3 py-2">
                                Download HTML
                            </button>
                        </div>
                    </div>

                    {/* Modern */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden flex justify-center p-5">
                            <Postcard state={modern} variant="modern" />
                        </div>
                        <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] p-5 space-y-3">
                            <h3 className="text-lg font-semibold mb-3">Modern Success Story</h3>
                            <label className="text-sm text-[#a0b4c3]">Sale Price</label>
                            <input placeholder="Sale Price" className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={modern.price} onChange={handleModern("price")} />
                            <label className="text-sm text-[#a0b4c3]">Address</label>
                            <input placeholder="Address" className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={modern.address} onChange={handleModern("address")} />
                            <label className="text-sm text-[#a0b4c3]">Days on Market</label>
                            <input placeholder="Days" className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={modern.days} onChange={handleModern("days")} />
                            <label className="text-sm text-[#a0b4c3]">Success Message</label>
                            <textarea placeholder="Success message" className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={modern.message} onChange={handleModern("message")} />
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#a0b4c3]">Agent Name</label>
                                    <input placeholder="Agent" className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={modern.agent} onChange={handleModern("agent")} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#a0b4c3]">Phone</label>
                                    <input placeholder="Phone" className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={modern.phone} onChange={handleModern("phone")} />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-[#A0B0C0] mb-1">Header Color</div>
                                <ColorPicker value={modern.gradient} onChange={(g) => handleModern("gradient")({ target: { value: g } })} />
                            </div>
                            <button onClick={() => downloadHtml("modern", modern)} className="w-full bg-cyan-400 text-black font-semibold rounded px-3 py-2">
                                Download HTML
                            </button>
                        </div>
                    </div>

                    {/* Expert */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden flex justify-center p-5">
                            <Postcard state={expert} variant="expert" />
                        </div>
                        <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] p-5 space-y-3">
                            <h3 className="text-lg font-semibold mb-3">Neighborhood Expert</h3>
                            <label className="text-sm text-[#a0b4c3]">Sale Price</label>
                            <input placeholder="Sale Price" className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={expert.price} onChange={handleExpert("price")} />
                            <label className="text-sm text-[#a0b4c3]">Address</label>
                            <input placeholder="Address" className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={expert.address} onChange={handleExpert("address")} />
                            <label className="text-sm text-[#a0b4c3]">Days on Market</label>
                            <input placeholder="Days" className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={expert.days} onChange={handleExpert("days")} />
                            <label className="text-sm text-[#a0b4c3]">Expert Message</label>
                            <textarea placeholder="Expert message" className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={expert.message} onChange={handleExpert("message")} />
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#a0b4c3]">Agent Name</label>
                                    <input placeholder="Agent" className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={expert.agent} onChange={handleExpert("agent")} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#a0b4c3]">Phone</label>
                                    <input placeholder="Phone" className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-3 py-2" value={expert.phone} onChange={handleExpert("phone")} />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-[#A0B0C0] mb-1">Header Color</div>
                                <ColorPicker value={expert.gradient} onChange={(g) => handleExpert("gradient")({ target: { value: g } })} />
                            </div>
                            <button onClick={() => downloadHtml("expert", expert)} className="w-full bg-cyan-400 text-black font-semibold rounded px-3 py-2">
                                Download HTML
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}


