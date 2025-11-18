import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function SellerListingPresentations() {
    /* ----------------------- state ----------------------- */
    const [form, setForm] = useState({
        agentName: "Sarah Johnson",
        agentPhone: "(555) 123-4567",
        agentEmail: "sarah@realty.com",
        agentBrokerage: "Premium Realty Group",
        homesListed: "47",
        homesSold: "44",
        avgDaysMarket: "23",
        priceToListRatio: "98.5%",
        marketAvgPrice: "$485K",
        marketChange: "+6.8%",
        marketInventory: "2.8",
        trackRecordInsights:
            "My 93% success rate and average sale price of 98.5% of list price demonstrates my ability to price homes correctly and market them effectively. Most of my listings sell within 30 days, which means less stress and faster results for you.",
    });

    /* ----------------------- chart ----------------------- */
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");
        chartInstanceRef.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: [
                    "Oct 23",
                    "Nov 23",
                    "Dec 23",
                    "Jan 24",
                    "Feb 24",
                    "Mar 24",
                    "Apr 24",
                    "May 24",
                    "Jun 24",
                    "Jul 24",
                    "Aug 24",
                    "Sep 24",
                ],
                datasets: [
                    {
                        label: "Average Sale Price",
                        data: [
                            445000,
                            452000,
                            458000,
                            448000,
                            462000,
                            468000,
                            475000,
                            472000,
                            485000,
                            488000,
                            482000,
                            485000,
                        ],
                        borderColor: "#40e0d0",
                        backgroundColor: "rgba(64, 224, 208, 0.1)",
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: "#40e0d0",
                        pointBorderColor: "#36c5b6",
                        pointBorderWidth: 2,
                        pointRadius: 6,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        ticks: {
                            callback: (v) => "$" + v / 1000 + "K",
                            color: "#666",
                        },
                        grid: { color: "#e9ecef" },
                    },
                    x: {
                        ticks: { color: "#666" },
                        grid: { color: "#e9ecef" },
                    },
                },
            },
        });

        return () => chartInstanceRef.current?.destroy();
    }, []);

    /* ----------------------- helpers ----------------------- */
    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const previewRef = useRef(null);

    const downloadHTML = () => {
        if (!previewRef.current) return;

        const customCSS = `
            .presentation-icon{width:60px;height:60px;background:#40e0d0;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:30px}
            .stat-card{background:linear-gradient(135deg,#40e0d0,#36c5b6);color:#fff;padding:25px;border-radius:15px;text-align:center;box-shadow:0 8px 20px rgba(64,224,208,.3)}
            .stat-number{font-size:2.5rem;font-weight:bold;margin-bottom:5px}
            .stat-label{font-size:1rem;opacity:.9}
            .marketing-item{background:#f8f9fa;padding:20px;border-radius:10px;border:1px solid #e9ecef;transition:transform .2s ease,box-shadow .2s ease}
            .marketing-item:hover{transform:translateY(-2px);box-shadow:0 4px 15px rgba(64,224,208,.2)}
            .success-story{background:#f8f9fa;border-left:5px solid #40e0d0;border-radius:10px;padding:20px;margin:20px 0}
            .success-number{font-size:1.5rem;font-weight:bold;color:#40e0d0;margin-bottom:5px}
            .success-label{font-size:0.8rem;color:#666}
            .tag{background:rgba(64,224,208,.2);color:#40e0d0;padding:5px 12px;border-radius:15px;font-size:.85rem;border:1px solid rgba(64,224,208,.3);display:inline-block;margin:2px}
        `;

        const chartScript = `(() => {
            const ctx = document.getElementById('downloadChart')?.getContext('2d');
            if(!ctx) return;
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Oct 23','Nov 23','Dec 23','Jan 24','Feb 24','Mar 24','Apr 24','May 24','Jun 24','Jul 24','Aug 24','Sep 24'],
                    datasets: [{
                        label: 'Average Sale Price',
                        data: [445000,452000,458000,448000,462000,468000,475000,472000,485000,488000,482000,485000],
                        borderColor: '#40e0d0',
                        backgroundColor: 'rgba(64,224,208,0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                    }]
                },
                options: { plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio:false }
            });
        })();`;

        // clone preview HTML and replace chart canvas id to avoid duplication
        const cloned = previewRef.current.cloneNode(true);
        const canvas = cloned.querySelector('canvas');
        if (canvas) canvas.id = 'downloadChart';

        const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Seller Listing Presentation</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>${customCSS}</style>
</head>
<body class="bg-[#3A4E5E] text-white p-8">${cloned.outerHTML}
<script>${chartScript}</script>
</body>
</html>`;

        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'seller_listing_presentation.html';
        a.click();
        URL.revokeObjectURL(url);
    };

    const printReport = () => {
        if (!previewRef.current) return;

        const customCSS = `
            .presentation-icon{width:60px;height:60px;background:#40e0d0;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:30px}
            .stat-card{background:linear-gradient(135deg,#40e0d0,#36c5b6);color:#fff;padding:25px;border-radius:15px;text-align:center;box-shadow:0 8px 20px rgba(64,224,208,.3)}
            .stat-number{font-size:2.5rem;font-weight:bold;margin-bottom:5px}
            .stat-label{font-size:1rem;opacity:.9}
            .marketing-item{background:#f8f9fa;padding:20px;border-radius:10px;border:1px solid #e9ecef;transition:transform .2s ease,box-shadow .2s ease}
            .marketing-item:hover{transform:translateY(-2px);box-shadow:0 4px 15px rgba(64,224,208,.2)}
            .success-story{background:#f8f9fa;border-left:5px solid #40e0d0;border-radius:10px;padding:20px;margin:20px 0}
            .success-number{font-size:1.5rem;font-weight:bold;color:#40e0d0;margin-bottom:5px}
            .success-label{font-size:0.8rem;color:#666}
            .tag{background:rgba(64,224,208,.2);color:#40e0d0;padding:5px 12px;border-radius:15px;font-size:.85rem;border:1px solid rgba(64,224,208,.3);display:inline-block;margin:2px}
        `;

        const chartScript = `(() => {
            const ctx = document.getElementById('downloadChart')?.getContext('2d');
            if(!ctx) return;
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Oct 23','Nov 23','Dec 23','Jan 24','Feb 24','Mar 24','Apr 24','May 24','Jun 24','Jul 24','Aug 24','Sep 24'],
                    datasets: [{
                        label: 'Average Sale Price',
                        data: [445000,452000,458000,448000,462000,468000,475000,472000,485000,488000,482000,485000],
                        borderColor: '#40e0d0',
                        backgroundColor: 'rgba(64,224,208,0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                    }]
                },
                options: { plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio:false }
            });
        })();`;

        const cloned = previewRef.current.cloneNode(true);
        const canvas = cloned.querySelector('canvas');
        if (canvas) canvas.id = 'downloadChart';

        const html = `<!DOCTYPE html><html><head><title>Seller Listing Presentation</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>${customCSS}</style></head><body class="bg-[#3A4E5E] text-white p-8">${cloned.outerHTML}
        <script>${chartScript}</script></body></html>`;

        const w = window.open("", "_blank");
        if (!w) return;
        w.document.write(html);
        w.document.close();
        w.focus();
        w.print();
    };

    /* ----------------------- jsx ----------------------- */
    return (
        <div className="min-h-screen bg-[#3A4E5E] text-white">
            {/* custom styles copied from original html for quick parity */}
            <style>{`
                .presentation-icon{width:60px;height:60px;background:#40e0d0;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:30px}
                .stat-card{background:linear-gradient(135deg,#40e0d0,#36c5b6);color:#fff;padding:25px;border-radius:15px;text-align:center;box-shadow:0 8px 20px rgba(64,224,208,.3)}
                .stat-number{font-size:2.5rem;font-weight:bold;margin-bottom:5px}
                .stat-label{font-size:1rem;opacity:.9}
                .marketing-item{background:#f8f9fa;padding:20px;border-radius:10px;border:1px solid #e9ecef;transition:transform .2s ease,box-shadow .2s ease}
                .marketing-item:hover{transform:translateY(-2px);box-shadow:0 4px 15px rgba(64,224,208,.2)}
                .success-story{background:#f8f9fa;border-left:5px solid #40e0d0;border-radius:10px;padding:20px;margin:20px 0}
                .success-number{font-size:1.5rem;font-weight:bold;color:#40e0d0;margin-bottom:5px}
                .success-label{font-size:0.8rem;color:#666}
                .tag{background:rgba(64,224,208,.2);color:#40e0d0;padding:5px 12px;border-radius:15px;font-size:.85rem;border:1px solid rgba(64,224,208,.3);display:inline-block;margin:2px}
                .marketing-grid{grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:15px}
                .success-metrics{grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:10px}
                .comparable-table{border-collapse:collapse;width:100%}
                .comparable-table th, .comparable-table td{padding:8px 12px;text-align:left;border-bottom:1px solid #e0e0e0}
                .comparable-table th{font-weight:bold;background:linear-gradient(135deg,#40e0d0,#36c5b6);color:#fff}
                .comparable-table tr:last-child td{border-bottom:none}
            `}</style>
            <main className="max-w-[1400px] mx-auto px-8 py-8 border-l-4 border-[#21D4C6]">
                {/* header block */}
                <div className="text-center bg-black/20 border-2 border-[#40e0d0] rounded-2xl p-6 mb-8">
                    <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
                        <span className="presentation-icon">🏠</span>
                        Seller Listing Presentations
                    </h2>
                    <p className="text-lg text-[#a0b4c3] mb-4">Professional presentations for winning listings.</p>
                    <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm text-[#a0b4c3] format-info">
                        <span>📊 PowerPoint Ready</span>
                        <span>📄 Word/PDF Compatible</span>
                        <span>🎯 Client Presentations</span>
                    </div>
                    <div className="space-x-2">
                        <span className="tag">listing</span>
                        <span className="tag">presentation</span>
                        <span className="tag">real estate</span>
                    </div>
                </div>
                <div className="grid md:grid-cols-[1fr_400px] gap-8">
                    {/* preview */}
                    <div ref={previewRef} className="bg-white text-gray-900 rounded-2xl p-8 overflow-y-auto">
                        {/* header */}
                        <div className="border-b-4 border-[#40e0d0] pb-8 mb-8 text-center">
                            <h1 className="text-4xl font-bold mb-2">Why Choose Me as Your Listing Agent?</h1>
                            <p className="text-lg mb-2">Professional Marketing & Proven Results</p>
                            <p className="text-sm text-gray-500">September 2024</p>
                        </div>
                        {/* track record */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-200 pb-2">My Track Record</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div className="stat-card">
                                    <div className="stat-number">{form.homesListed}</div>
                                    <div className="stat-label">Homes Listed This Year</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-number">{form.homesSold}</div>
                                    <div className="stat-label">Successfully Sold</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-number">{form.avgDaysMarket}</div>
                                    <div className="stat-label">Average Days on Market</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-number">{form.priceToListRatio}</div>
                                    <div className="stat-label">Price to List Ratio</div>
                                </div>
                            </div>
                            <div className="bg-[#fff3cd] border border-[#ffeaa7] rounded-lg p-4 text-[#856404]">
                                <div className="font-semibold mb-2">🏆 Why These Numbers Matter</div>
                                {form.trackRecordInsights}
                            </div>
                        </section>
                        {/* market section */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-200 pb-2">Current Market Conditions</h2>
                            <div className="bg-[#f8f9fa] border rounded-lg p-4 mb-6">
                                <h3 className="font-semibold text-center text-lg mb-4">12-Month Home Sale Trends in Your Area</h3>
                                <div className="relative h-[300px]">
                                    <canvas ref={chartRef}></canvas>
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="stat-card">
                                    <div className="stat-number">{form.marketAvgPrice}</div>
                                    <div className="stat-label">Average Sale Price</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-number">{form.marketChange}</div>
                                    <div className="stat-label">YoY Price Growth</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-number">{form.marketInventory}</div>
                                    <div className="stat-label">Months of Inventory</div>
                                </div>
                            </div>
                        </section>
                        {/* marketing plan */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-200 pb-2">My Comprehensive Marketing Plan</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 marketing-grid">
                                {[
                                    { icon: "📸", title: "Professional Photography", desc: "High-quality photos and virtual staging that showcase your home's best features and attract more buyers online." },
                                    { icon: "🌐", title: "Digital Marketing", desc: "Targeted social media campaigns, premium listing sites (Zillow, Realtor.com), and search engine optimization." },
                                    { icon: "🎬", title: "Video Tours & Drone", desc: "Professional walkthrough videos and aerial drone footage to give buyers a complete view of your property." },
                                    { icon: "🏠", title: "Open Houses & Showings", desc: "Strategic open house events and private showings coordinated to maximize exposure to qualified buyers." },
                                    { icon: "📊", title: "Market Analysis", desc: "Detailed comparative market analysis to price your home competitively and position it for a quick sale." },
                                    { icon: "🤝", title: "Agent Network", desc: "Exclusive agent previews and strong broker relationships that bring qualified buyers to your property first." },
                                ].map(({ icon, title, desc }) => (
                                    <div key={title} className="marketing-item">
                                        <div className="marketing-icon mb-2">{icon}</div>
                                        <div className="marketing-title mb-1 font-semibold">{title}</div>
                                        <div className="marketing-desc text-sm text-gray-600">{desc}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        {/* success stories */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-200 pb-2">Recent Success Stories</h2>
                            {[{
                                title: "123 Maple Street - Sold in 14 Days",
                                desc: "Beautiful colonial home in popular neighborhood. Through strategic pricing and targeted marketing, we received multiple offers and sold for $8,000 above asking price.",
                                metrics: [
                                    { num: "14", label: "Days on Market" },
                                    { num: "$485K", label: "Final Price" },
                                    { num: "102%", label: "of List Price" },
                                    { num: "4", label: "Offers Received" },
                                ],
                            },
                            {
                                title: "456 Oak Avenue - Luxury Home Sale",
                                desc: "Upscale property with unique features. Our comprehensive marketing strategy attracted serious buyers, resulting in a premium sale above market value.",
                                metrics: [
                                    { num: "21", label: "Days on Market" },
                                    { num: "$675K", label: "Final Price" },
                                    { num: "101%", label: "of List Price" },
                                    { num: "3", label: "Offers Received" },
                                ],
                            }].map(({ title, desc, metrics }) => (
                                <div key={title} className="success-story">
                                    <h4 className="font-semibold text-lg mb-2">{title}</h4>
                                    <p className="text-sm text-gray-700 mb-4">{desc}</p>
                                    <div className="grid sm:grid-cols-4 gap-3 success-metrics">
                                        {metrics.map(({ num, label }) => (
                                            <div key={label} className="success-metric text-center bg-white border border-gray-200 rounded-md p-3">
                                                <div className="success-number">{num}</div>
                                                <div className="success-label">{label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>
                        {/* comparable sales */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-200 pb-2">Comparable Sales Analysis</h2>
                            <p className="mb-4 text-gray-700">Recent sales in your neighborhood that help determine your home's optimal listing price:</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border border-gray-200 comparable-table">
                                    <thead>
                                        <tr>
                                            {['Address', 'Sale Price', 'Beds', 'Baths', 'Sq Ft', '$/Sq Ft', 'Days on Market'].map(h => (<th key={h} className="px-3 py-2 text-left">{h}</th>))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            ['789 Pine Street', '$485,000', '3', '2.5', '2,200', '$220', '18'],
                                            ['321 Elm Drive', '$462,000', '3', '2', '2,050', '$225', '25'],
                                            ['654 Birch Lane', '$498,000', '4', '2.5', '2,350', '$212', '12'],
                                        ].map((row, idx) => (
                                            <tr key={idx} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                                {row.map((cell, i) => (
                                                    <td key={i} className="px-3 py-2 border-b border-gray-200">{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        {/* footer */}
                        <footer className="bg-gradient-to-r from-[#3a4a5c] to-[#2c3e50] text-white rounded-lg p-6 text-center mt-12">
                            <h3 className="text-xl font-bold mb-1">{form.agentName}</h3>
                            <p>Licensed Real Estate Professional</p>
                            <p>📞 {form.agentPhone}</p>
                            <p>✉️ {form.agentEmail}</p>
                            <p>{form.agentBrokerage}</p>
                            <p className="italic opacity-80 mt-4">"Ready to sell your home for top dollar? Let's discuss your goals and create a customized marketing strategy."</p>
                        </footer>
                    </div>

                    {/* controls */}
                    <div className="bg-[#4A5E6E]/80 border-2 border-[#40e0d0] rounded-2xl p-6 h-fit sticky top-8 space-y-4">
                        <h3 className="text-center text-xl font-semibold text-[#40e0d0]">Customize Presentation</h3>
                        {[
                            { label: "Agent Name", id: "agentName" },
                            { label: "Phone Number", id: "agentPhone" },
                            { label: "Email Address", id: "agentEmail" },
                            { label: "Brokerage Name", id: "agentBrokerage" },
                            { label: "Homes Listed This Year", id: "homesListed" },
                            { label: "Homes Successfully Sold", id: "homesSold" },
                            { label: "Avg Days on Market", id: "avgDaysMarket" },
                            { label: "Price to List Ratio", id: "priceToListRatio" },
                            { label: "Market Avg Price", id: "marketAvgPrice" },
                            { label: "YoY Price Growth", id: "marketChange" },
                            { label: "Months of Inventory", id: "marketInventory" },
                        ].map(({ label, id }) => (
                            <div key={id} className="space-y-1">
                                <label htmlFor={id} className="text-[#a0b4c3] text-sm font-medium">
                                    {label}
                                </label>
                                <input
                                    id={id}
                                    type="text"
                                    value={form[id]}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-md bg-[#2c3e50] border-2 border-[#5a6a7c] text-white focus:outline-none focus:border-[#40e0d0]"
                                />
                            </div>
                        ))}
                        {/* textarea */}
                        <div className="space-y-1">
                            <label htmlFor="trackRecordInsights" className="text-[#a0b4c3] text-sm font-medium">
                                Track Record Message
                            </label>
                            <textarea
                                id="trackRecordInsights"
                                value={form.trackRecordInsights}
                                onChange={handleChange}
                                className="w-full min-h-[80px] px-3 py-2 rounded-md bg-[#2c3e50] border-2 border-[#5a6a7c] text-white focus:outline-none focus:border-[#40e0d0]"
                            />
                        </div>
                        {/* actions */}
                        <button
                            onClick={downloadHTML}
                            className="w-full py-3 rounded-lg font-semibold bg-[#40e0d0] text-[#2c3e50] hover:bg-[#36c5b6] transition-all"
                        >
                            Download HTML
                        </button>
                        <button
                            onClick={printReport}
                            className="w-full py-3 rounded-lg font-semibold bg-[#667eea] hover:bg-[#556cd6] transition-all"
                        >
                            Print Report
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}


