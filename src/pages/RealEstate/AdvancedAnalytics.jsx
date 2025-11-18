import React, { useState } from "react";

export default function AdvancedAnalytics() {
    const [commissionView, setCommissionView] = useState('By Source');

    // Data for different commission breakdown views
    const commissionData = {
        'By Source': [
            { l: 'Referrals', v: '$145,230', t: '+28.4%' },
            { l: 'Online Marketing', v: '$98,670', t: '+15.2%' },
            { l: 'Social Media', v: '$67,890', t: '+31.5%' },
            { l: 'Open Houses', v: '$36,100', t: '+9.8%' },
        ],
        'By Type': [
            { l: 'Listing Commissions', v: '$198,450', t: '+15.3%' },
            { l: 'Buyer Commissions', v: '$149,440', t: '+8.7%' },
            { l: 'Referral Income', v: '$24,780', t: '+22.1%' },
            { l: 'Dual Agency', v: '$45,220', t: '+34.2%' },
        ],
        'By Month': [
            { l: 'March', v: '$89,450', t: '+42.1%' },
            { l: 'April', v: '$125,220', t: '+18.7%' },
            { l: 'May', v: '$98,890', t: '+12.3%' },
            { l: 'June (Projected)', v: '$134,330', t: '+27.5%' },
        ],
    };

    return (
        <>
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
            <div className="min-h-screen bg-[var(--medium-dark)] text-white">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-[var(--primary-color)]/30">
                    <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center text-[1.8rem] font-extrabold">
                            {/* <span className="mr-2" style={{ color: '#4ecdc4', filter: 'drop-shadow(0 0 10px rgba(78,205,196,0.5))' }}>◆</span> */}
                            <span className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)]/80 bg-clip-text text-transparent">STACKED</span>
                            <span className="ml-2 rounded-full text-[0.8rem] font-extrabold px-2 py-0.5 bg-[var(--primary-color)] text-white">PRO</span>
                        </div>
                        {/* <div className="flex gap-2">
                        {['Dashboard', 'Leads', 'Analytics', 'AI Tools', 'Settings'].map((b, i) => (
                            <button key={b} className={`px-4 py-2 rounded-xl font-semibold relative overflow-hidden border ${i === 2 ? 'border-transparent text-white' : 'border-[var(--primary-color)]/30 text-white/90'} ${i === 2 ? 'bg-[var(--primary-color)] shadow-[0_4px_15px_rgba(45,212,191,0.3)]' : 'bg-white/10 backdrop-blur'} hover:translate-y-[-1px] transition`}>{b}</button>
                        ))}
                    </div> */}
                    </div>
                </header>

                <main className="max-w-[1600px] mx-auto p-6 lg:p-10">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-[var(--primary-color)] via-[var(--primary-color)]/80 to-[var(--primary-color)] bg-clip-text text-transparent animate-[gradient_6s_ease_infinite]">Advanced Analytics Suite</h1>
                        <p className="text-gray-300 text-lg">Professional-grade insights, predictive analytics, and performance optimization</p>
                    </div>

                    {/* Filters */}
                    <section className="rounded-2xl p-6 mb-10 bg-[var(--lighter-dark)] backdrop-blur-xl border border-[var(--primary-color)]/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                        <h3 className="text-xl font-bold mb-6 text-[var(--primary-color)]">🎯 Advanced Filtering & Analysis</h3>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {[
                                { label: 'Date Range', type: 'select', options: ['Last 30 Days', 'Last Quarter', 'Last 6 Months', 'Last Year', 'YTD', 'Custom Range'] },
                                { label: 'Property Type', type: 'select', options: ['All Properties', 'Residential', 'Commercial', 'Luxury ($500K+)', 'Condos/Townhomes', 'New Construction'] },
                                { label: 'Price Range', type: 'input', placeholder: '$100K - $2M' },
                                { label: 'Commission Type', type: 'select', options: ['All Commissions', 'Listing Commission', 'Buyer Commission', 'Dual Agency', 'Referral Commission'] },
                                { label: 'Market Segment', type: 'select', options: ['All Markets', 'First-Time Buyers', 'Move-Up Buyers', 'Luxury Market', 'Investment Properties'] },
                                { label: 'Lead Source', type: 'select', options: ['All Sources', 'Referrals', 'Online Marketing', 'Social Media', 'Open Houses', 'Cold Outreach'] },
                            ].map((f, idx) => (
                                <div key={idx}>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">{f.label}</label>
                                    {f.type === 'input' ? (
                                        <input className="w-full px-3 py-2 rounded-lg border border-[var(--primary-color)]/30 bg-[var(--lighter-dark)] text-white focus:outline-none focus:border-[var(--primary-color)]" placeholder={f.placeholder} />
                                    ) : (
                                        <select className="w-full px-3 py-2 rounded-lg border border-[var(--primary-color)]/30 bg-[var(--lighter-dark)] text-white focus:outline-none focus:border-[var(--primary-color)]">
                                            {f.options.map(o => (<option key={o} className="bg-[var(--medium-dark)]">{o}</option>))}
                                        </select>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Headline Stats */}
                    <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mb-10">
                        {[
                            { icon: '💰', trend: '+18.4%', value: '$347,890', label: 'Total Commission Revenue' },
                            { icon: '🏠', trend: '+12.8%', value: '48', label: 'Properties Transacted' },
                            { icon: '⚡', trend: '+8.2%', value: '73.5%', label: 'Conversion Rate' },
                            { icon: '📈', trend: '+24.1%', value: '$2.8M', label: 'Total Sales Volume' },
                        ].map((s) => (
                            <div key={s.label} className="rounded-2xl p-6 bg-[var(--lighter-dark)] backdrop-blur-xl border border-[var(--primary-color)]/30 relative overflow-hidden transition hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(45,212,191,0.3)]">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-4xl drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]">{s.icon}</div>
                                    <div className="text-xs px-2 py-1 rounded-full font-semibold bg-[var(--primary-color)]/20 text-[var(--primary-color)]">↗ {s.trend}</div>
                                </div>
                                <div className="text-4xl font-extrabold bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)]/80 bg-clip-text text-transparent">{s.value}</div>
                                <div className="text-gray-300">{s.label}</div>
                            </div>
                        ))}
                    </section>

                    {/* AI Insights */}
                    <section className="rounded-2xl p-6 mb-10 border border-[var(--primary-color)]/30 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--primary-color)]/5">
                        <div className="flex items-center gap-3 mb-4"><div className="text-2xl">🤖</div><div className="text-2xl font-bold text-[var(--primary-color)]">AI-Powered Insights</div></div>
                        <ul className="space-y-3">
                            {[
                                'Market Trend Alert: Luxury property demand is up 34% in your area. Consider focusing on listings above $750K for maximum commission potential.',
                                'Seasonal Opportunity: Historical data shows a 28% spike in buyer activity in your market during Q2. Optimize your lead generation now.',
                                'Performance Optimization: Your conversion rate is 15% above market average. Your strongest lead source is referrals (89% conversion).',
                                'Commission Forecast: Based on your current pipeline, projected Q3 commission is $127K (+22% vs Q2). Focus on closing 3 pending luxury listings.'
                            ].map((t, i) => (
                                <li key={i} className="p-4 rounded-lg bg-[var(--lighter-dark)] border-l-4 border-[var(--primary-color)]">{t}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Commission Timeline */}
                    <section className="mb-10">
                        <h3 className="text-xl font-bold mb-4">💰 Detailed Commission Tracking</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="rounded-2xl p-6 bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-xl font-bold text-[var(--primary-color)]">Commission Breakdown Analysis</div>
                                    <div className="flex gap-2">
                                        {['By Source', 'By Type', 'By Month'].map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => setCommissionView(c)}
                                                className={`px-2 py-1 rounded-md text-xs border transition-all duration-200 hover:scale-105 ${commissionView === c
                                                    ? 'bg-[var(--primary-color)] text-white border-transparent shadow-[0_4px_15px_rgba(45,212,191,0.3)]'
                                                    : 'bg-[var(--lighter-dark)] border-[var(--primary-color)]/30 text-[var(--primary-color)] hover:bg-[var(--primary-color)]/10'
                                                    }`}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                    {commissionData[commissionView].map((x, idx) => (
                                        <div
                                            key={x.l}
                                            className="rounded-lg p-4 bg-[var(--medium-dark)] border border-[var(--primary-color)]/20 transition-all duration-300 hover:border-[var(--primary-color)]/50 hover:transform hover:scale-[1.02]"
                                            style={{
                                                animation: `fadeIn 0.3s ease-out ${idx * 0.05}s backwards`
                                            }}
                                        >
                                            <div className="text-gray-300 text-sm mb-1">{x.l}</div>
                                            <div className="text-[var(--primary-color)] text-xl font-extrabold">{x.v}</div>
                                            <div className="text-[var(--primary-color)] text-xs">↗ {x.t}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-[200px] rounded-lg border border-dashed border-[var(--primary-color)]/30 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--primary-color)]/5 flex items-center justify-center text-center">
                                    <div>
                                        <div className="text-[var(--primary-color)] font-semibold">Interactive Commission Distribution Chart</div>
                                        <div className="text-gray-300 text-sm">Showing data for: {commissionView}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl p-6 bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30">
                                <div className="flex items-center gap-3 mb-4"><div>📈</div><div className="text-lg font-bold text-[var(--primary-color)]">Commission Trends</div></div>
                                {[
                                    ['January', '$28,450', 65],
                                    ['February', '$34,220', 78],
                                    ['March', '$42,890', 98],
                                    ['April', '$38,750', 88],
                                    ['May', '$45,120', 100],
                                    ['June (Projected)', '$48,200', 95],
                                ].map(([m, amt, p], i) => (
                                    <div key={i} className="mb-3">
                                        <div className="flex items-center justify-between text-sm mb-1"><span className="text-gray-300">{m}</span><span className="text-[var(--primary-color)] font-bold">{amt}</span></div>
                                        <div className="w-full h-[6px] bg-[var(--lighter-dark)] rounded">
                                            <div className="h-full rounded bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)]/80" style={{ width: `${p}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}


