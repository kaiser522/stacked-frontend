import React, { useState, useRef, useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

const priceLabels = [
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
];

export default function MarketAnalysisReports() {
    /* ----------------------------- Component State ---------------------------- */
    const [state, setState] = useState({
        marketArea: "Beverly Hills",
        reportPeriod: "September 2024",
        avgPrice: "$750K",
        priceChange: "+5.2%",
        daysOnMarket: "28",
        totalSales: "147",
        marketInsights:
            "The Beverly Hills market continues to show strong performance with steady price appreciation. Low inventory levels are driving competitive bidding, resulting in homes selling faster than the regional average.",
        agentName: "Your Name",
        agentPhone: "(555) 123-4567",
        agentEmail: "your.email@realty.com",
        agentBrokerage: "Brokerage Name",
    });

    /* ---------------------------- Reusable Handlers --------------------------- */
    const onChange = (key) => (e) => setState({ ...state, [key]: e.target.value });

    /* --------------------------------- Charts --------------------------------- */
    const priceData = useMemo(
        () => ({
            labels: priceLabels,
            datasets: [
                {
                    label: "Average Price",
                    data: [
                        690000, 705000, 720000, 710000, 725000, 735000, 740000, 745000, 750000, 748000, 752000, 750000,
                    ],
                    borderColor: "#40e0d0",
                    backgroundColor: "rgba(64, 224, 208, 0.1)",
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                },
            ],
        }),
        []
    );

    const salesData = useMemo(
        () => ({
            labels: priceLabels,
            datasets: [
                {
                    label: "Sales Count",
                    data: [12, 8, 6, 10, 14, 18, 16, 19, 15, 17, 13, 11],
                    backgroundColor: "rgba(64, 224, 208, 0.8)",
                    borderColor: "#40e0d0",
                    borderWidth: 1,
                },
            ],
        }),
        []
    );

    const propertyData = useMemo(
        () => ({
            labels: ["Single Family", "Condos", "Townhomes", "Multi-Family"],
            datasets: [
                {
                    data: [65, 20, 10, 5],
                    backgroundColor: ["#40e0d0", "#667eea", "#f093fb", "#4facfe"],
                },
            ],
        }),
        []
    );

    /* -------------------------------- Download -------------------------------- */
    const previewRef = useRef(null);

    const buildPrintHtml = (content) => {
        // Serialize datasets for inline script
        const script = `
            window.addEventListener('DOMContentLoaded', () => {
                const priceLabels = ${JSON.stringify(priceLabels)};
                const priceData = ${JSON.stringify(priceData.datasets[0].data)};
                const salesData = ${JSON.stringify(salesData.datasets[0].data)};
                const propertyData = ${JSON.stringify(propertyData.datasets[0].data)};

                const priceCtx = document.getElementById('priceChart').getContext('2d');
                new Chart(priceCtx, {type: 'line', data: {labels: priceLabels, datasets: [{label: 'Average Price', data: priceData, borderColor: '#40e0d0', backgroundColor: 'rgba(64, 224, 208, 0.1)', borderWidth: 3, fill: true, tension: 0.4}]}, options: {responsive: true, maintainAspectRatio: false, plugins:{legend:{display:false}}, scales:{y:{ticks:{callback:(v)=>'$'+(v/1000)+'K'}}}}});

                const salesCtx = document.getElementById('salesChart').getContext('2d');
                new Chart(salesCtx, {type: 'bar', data: {labels: priceLabels, datasets:[{label:'Sales Count', data: salesData, backgroundColor:'rgba(64,224,208,0.8)', borderColor:'#40e0d0', borderWidth:1}]}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}}}});

                const propertyCtx = document.getElementById('propertyChart').getContext('2d');
                new Chart(propertyCtx, {type:'doughnut', data:{labels:['Single Family','Condos','Townhomes','Multi-Family'], datasets:[{data: propertyData, backgroundColor:['#40e0d0','#667eea','#f093fb','#4facfe']} ]}, options:{responsive:true, maintainAspectRatio:false}});
            });`;

        return `<!DOCTYPE html><html><head><meta charset="UTF-8" /><title>Market Analysis Report</title><style>@page{size:8.5in auto;margin:20px}body{font-family:Arial,sans-serif;margin:0;padding:20px;background:#fff;color:#333;line-height:1.6}</style><script src="https://cdn.jsdelivr.net/npm/chart.js"></script><script>${script}</script></head><body>${content}</body></html>`;
    };

    const downloadReport = () => {
        const html = renderToStaticMarkup(<ReportPreview printing />);
        const blob = new Blob([buildPrintHtml(html)], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "market-analysis-report.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const printReport = () => {
        const html = buildPrintHtml(renderToStaticMarkup(<ReportPreview printing />));
        const printWindow = window.open("", "_blank");
        if (printWindow) {
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };

    /* ------------------------------ Preview Card ------------------------------ */
    const ReportPreview = ({ printing = false }) => (
        <div
            ref={printing ? null : previewRef}
            className="report-preview bg-white rounded-[15px] p-8 text-[#333] shadow-xl min-h-[800px]"
            style={printing ? { maxWidth: "8.5in", margin: "0 auto" } : {}}
        >
            {/* Header */}
            <header className="report-header text-center pb-8 border-b-[3px] border-[#40e0d0] mb-8">
                <h1 className="report-title text-3xl font-bold text-[#2c3e50] mb-2">Market Analysis</h1>
                <p className="report-subtitle text-lg text-[#666] mb-2">
                    {state.marketArea} · {state.reportPeriod}
                </p>
                <div className="report-date text-sm text-[#888]">Generated {new Date().toLocaleDateString()}</div>
            </header>

            {/* Key Metrics */}
            <section className="section mb-10 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                {[
                    { label: "Avg. Price", value: state.avgPrice },
                    { label: "Price Change", value: state.priceChange },
                    { label: "Days on Market", value: state.daysOnMarket },
                    { label: "Total Sales", value: state.totalSales },
                ].map((m) => (
                    <div
                        key={m.label}
                        className="rounded-lg py-6 px-3 flex flex-col items-center justify-center text-white shadow-lg"
                        style={{ background: "linear-gradient(135deg, #40e0d0, #36c5b6)" }}
                    >
                        <div className="text-2xl font-bold text-white mb-1">{m.value}</div>
                        <div className="text-sm opacity-90">{m.label}</div>
                    </div>
                ))}
            </section>

            {/* Insights Box under metrics */}
            <section className="section mb-12">
                <div className="bg-[#fff3cd] border border-[#ffeaa7] rounded-xl p-6">
                    <div className="font-semibold text-[#856404] mb-3 flex items-center gap-2 text-lg">
                        <span>📈</span> Market Insights
                    </div>
                    <p className="text-[#856404] leading-relaxed whitespace-pre-line">{state.marketInsights}</p>
                </div>
            </section>

            {/* Charts */}
            <section className="section mb-12 space-y-12">
                <div>
                    <h2 className="section-title text-xl font-semibold mb-4">Price Trends</h2>
                    <div className="h-[300px]">
                        {printing ? (
                            <canvas id="priceChart" style={{ width: "100%", height: 300 }} />
                        ) : (
                            <Line data={priceData} options={{ responsive: true, maintainAspectRatio: false }} />
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="section-title text-xl font-semibold mb-4">Sales Volume</h2>
                    <div className="h-[300px]">
                        {printing ? (
                            <canvas id="salesChart" style={{ width: "100%", height: 300 }} />
                        ) : (
                            <Bar data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="section-title text-xl font-semibold mb-4">Property Types</h2>
                    <div className="h-[300px] max-w-[300px] mx-auto">
                        {printing ? (
                            <canvas id="propertyChart" style={{ width: "100%", height: 300 }} />
                        ) : (
                            <Doughnut data={propertyData} options={{ responsive: true, maintainAspectRatio: false }} />
                        )}
                    </div>
                </div>
            </section>

            {/* Comparable Sales (moved under charts) */}
            <section className="section mb-12">
                <h2 className="section-title text-xl font-semibold mb-4">Comparable Sales</h2>
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full text-sm comparable-table" style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr className="text-white" style={{ background: '#40e0d0' }}>
                                {['Address', 'Price', 'Beds', 'Baths', 'Sq Ft', '$ / Sq Ft'].map(h => (<th key={h} className="px-4 py-2 text-left font-semibold">{h}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['123 Oak Street', '$485,000', '3', '2.5', '2,100', '$231'],
                                ['456 Maple Drive', '$525,000', '4', '3', '2,400', '$219'],
                                ['789 Pine Avenue', '$595,000', '4', '3.5', '2,650', '$225'],
                            ].map((row, i) => (
                                <tr key={i} className={i % 2 ? "bg-[#f8f9fa]" : "bg-white"}>
                                    {row.map((cell, j) => (<td key={j} className="px-4 py-2 border-b border-[#dee2e6]">{cell}</td>))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Agent Footer */}
            <footer
                className="text-center mt-12 rounded-xl text-white p-8"
                style={{ background: "linear-gradient(135deg, #3a4a5c, #2c3e50)" }}
            >
                <div className="text-xl font-bold mb-1">{state.agentName}</div>
                <div className="text-sm opacity-90 mb-1">Licensed Real Estate Professional</div>
                <div className="text-sm mb-1">📞 {state.agentPhone}</div>
                <div className="text-sm mb-1">✉️ {state.agentEmail}</div>
                <div className="text-sm opacity-90">{state.agentBrokerage}</div>
            </footer>
        </div>
    );

    /* ---------------------------------- JSX ---------------------------------- */
    return (
        <div className="min-h-screen bg-[#3A4E5E] text-white">
            <main className="max-w-[1600px] mx-auto px-8 py-8">
                {/* Header */}
                <header className="header text-center mb-12 p-8 bg-[rgba(0,0,0,0.2)] rounded-2xl border-2 border-[#40e0d0]">
                    <h1 className="text-4xl font-bold flex items-center justify-center gap-4 mb-4">
                        <span className="chart-icon inline-flex items-center justify-center w-14 h-14 bg-[#40e0d0] rounded-xl text-2xl">📈</span>
                        Market Analysis Reports
                    </h1>
                    <p className="text-lg text-[#a0b4c3] mb-4">
                        Generate beautiful market analysis reports for your clients in minutes.
                    </p>
                    <div className="format-info flex flex-wrap items-center justify-center gap-4 text-sm text-[#a0b4c3] mb-4">
                        <span>📄 Printable PDF/HTML</span>
                        <span>🖨️ Letter Size</span>
                        <span>💼 Client Presentation</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                        {["market", "pricing", "reports", "real estate"].map((t) => (
                            <span
                                key={t}
                                className="tag bg-[rgba(64,224,208,0.2)] text-[#40e0d0] px-3 py-1 rounded-full border border-[rgba(64,224,208,0.3)] text-xs"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Main Grid */}
                <div className="main-container grid gap-8" style={{ gridTemplateColumns: "1fr 400px" }}>
                    {/* Preview */}
                    {ReportPreview({})}

                    {/* Controls */}
                    <aside className="controls-panel bg-[rgba(58,74,92,0.8)] border-2 border-[#40e0d0] rounded-2xl p-6 h-fit sticky top-5 space-y-4">
                        <h3 className="panel-title text-center text-xl font-semibold text-[#40e0d0] mb-4">Customize Report</h3>

                        {/* Inputs */}
                        {[
                            { label: "Market Area", key: "marketArea" },
                            { label: "Report Period", key: "reportPeriod" },
                            { label: "Average Price", key: "avgPrice" },
                            { label: "Price Change", key: "priceChange" },
                            { label: "Days on Market", key: "daysOnMarket" },
                            { label: "Total Sales", key: "totalSales" },
                        ].map((inp) => (
                            <div key={inp.key} className="control-group mb-4">
                                <label className="block mb-2 text-[#a0b4c3] text-sm font-medium">{inp.label}</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#2c3e50] border-2 border-[#5a6a7c] rounded px-3 py-2 text-white"
                                    value={state[inp.key]}
                                    onChange={onChange(inp.key)}
                                />
                            </div>
                        ))}

                        {/* Insights */}
                        <div className="control-group mb-4">
                            <label className="block mb-2 text-[#a0b4c3] text-sm font-medium">Market Insights</label>
                            <textarea
                                className="w-full bg-[#2c3e50] border-2 border-[#5a6a7c] rounded px-3 py-2 text-white min-h-[80px]"
                                value={state.marketInsights}
                                onChange={onChange("marketInsights")}
                            />
                        </div>

                        {/* Agent Info */}
                        {[
                            { label: "Agent Name", key: "agentName" },
                            { label: "Phone", key: "agentPhone" },
                            { label: "Email", key: "agentEmail" },
                            { label: "Brokerage", key: "agentBrokerage" },
                        ].map((inp) => (
                            <div key={inp.key} className="control-group mb-4">
                                <label className="block mb-2 text-[#a0b4c3] text-sm font-medium">{inp.label}</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#2c3e50] border-2 border-[#5a6a7c] rounded px-3 py-2 text-white"
                                    value={state[inp.key]}
                                    onChange={onChange(inp.key)}
                                />
                            </div>
                        ))}

                        <button
                            className="download-btn w-full bg-[#40e0d0] text-[#2c3e50] font-semibold py-3 rounded-xl hover:bg-[#36c5b6] transition"
                            onClick={downloadReport}
                        >
                            Download Report
                        </button>
                        <button
                            className="download-btn w-full bg-[#667eea] text-white font-semibold py-3 rounded-xl hover:bg-[#5564d9] transition"
                            onClick={printReport}
                        >
                            Print Report
                        </button>
                    </aside>
                </div>
            </main>
        </div>
    );
}


