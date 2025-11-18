import React, { useState } from 'react';

const MarketCycleStrategy = () => {
    const [marketData, setMarketData] = useState({
        dom: '',
        priceChange: '',
        inventory: '',
        volumeChange: '',
        offers: ''
    });
    const [phaseResult, setPhaseResult] = useState(null);
    const [timingData, setTimingData] = useState({
        annualVolume: '',
        avgPrice: '',
        commissionRate: '',
        timingScenario: 'early-expansion',
        implementationTime: '',
        strategyInvestment: ''
    });
    const [timingResult, setTimingResult] = useState(null);

    const calculateMarketPhase = () => {
        const dom = parseFloat(marketData.dom) || 0;
        const priceChange = parseFloat(marketData.priceChange) || 0;
        const inventory = parseFloat(marketData.inventory) || 0;
        const volumeChange = parseFloat(marketData.volumeChange) || 0;
        const offers = parseFloat(marketData.offers) || 0;

        if (dom === 0 || inventory === 0) {
            alert('Please enter at least Days on Market and Inventory data.');
            return;
        }

        let phaseScores = {
            expansion: 0,
            peak: 0,
            contraction: 0,
            trough: 0
        };

        // Score based on DOM
        if (dom < 20) phaseScores.expansion += 2;
        else if (dom < 40) phaseScores.peak += 2;
        else if (dom < 90) phaseScores.contraction += 2;
        else phaseScores.trough += 2;

        // Score based on price change
        if (priceChange >= 15) phaseScores.peak += 2;
        else if (priceChange >= 5) phaseScores.expansion += 2;
        else if (priceChange >= -5) phaseScores.contraction += 2;
        else phaseScores.trough += 2;

        // Score based on inventory
        if (inventory < 3) phaseScores.expansion += 2;
        else if (inventory < 4) phaseScores.peak += 2;
        else if (inventory < 8) phaseScores.contraction += 2;
        else phaseScores.trough += 2;

        // Score based on volume change
        if (volumeChange >= 10) phaseScores.expansion += 1;
        else if (volumeChange >= 0) phaseScores.peak += 1;
        else if (volumeChange >= -10) phaseScores.contraction += 1;
        else phaseScores.trough += 1;

        // Score based on multiple offers
        if (offers >= 60) phaseScores.expansion += 1;
        else if (offers >= 30) phaseScores.peak += 1;
        else if (offers >= 10) phaseScores.contraction += 1;
        else phaseScores.trough += 1;

        // Determine dominant phase
        let dominantPhase = Object.keys(phaseScores).reduce((a, b) => phaseScores[a] > phaseScores[b] ? a : b);

        let phaseName, description, strategy;

        switch (dominantPhase) {
            case 'expansion':
                phaseName = 'Expansion Phase';
                description = 'Your market is in an expansion phase with strong growth indicators.';
                strategy = 'Focus on volume and efficiency. Streamline processes and build systems to handle increased demand.';
                break;
            case 'peak':
                phaseName = 'Peak Phase';
                description = 'Your market appears to be at or near its peak.';
                strategy = 'Prepare for the shift. Build relationships and position yourself as the expert who can navigate any market.';
                break;
            case 'contraction':
                phaseName = 'Contraction Phase';
                description = 'Your market is in a contraction phase with declining indicators.';
                strategy = 'Emphasize value and expertise. Focus on pricing accuracy and helping clients make informed decisions.';
                break;
            case 'trough':
                phaseName = 'Trough Phase';
                description = 'Your market appears to be at or near its bottom.';
                strategy = 'Invest in relationships and prepare for the next cycle. Build your database and position for the upturn.';
                break;
        }

        setPhaseResult({
            phaseName,
            description,
            strategy,
            scores: phaseScores
        });
    };

    const calculateTimingImpact = () => {
        const annualVolume = parseFloat(timingData.annualVolume) || 0;
        const avgPrice = parseFloat(timingData.avgPrice) || 0;
        const commissionRate = (parseFloat(timingData.commissionRate) || 0) / 100;
        const implementationTime = parseFloat(timingData.implementationTime) || 12;
        const strategyInvestment = parseFloat(timingData.strategyInvestment) || 0;

        if (annualVolume === 0 || avgPrice === 0 || commissionRate === 0) {
            alert('Please enter annual volume, average price, and commission rate.');
            return;
        }

        const baselineRevenue = annualVolume * avgPrice * commissionRate;

        let volumeMultiplier = 1;
        let priceMultiplier = 1;
        let notes = '';

        switch (timingData.timingScenario) {
            case 'early-expansion':
                volumeMultiplier = 1.25; // capture upswing early
                priceMultiplier = 1.02;
                notes = 'Entering expansion early increases deal flow and modestly lifts average price.';
                break;
            case 'peak-exit':
                volumeMultiplier = 0.95; // focus on quality, fewer risky listings
                priceMultiplier = 1.03; // premium positioning
                notes = 'Exiting near peak preserves margins and avoids overexposure as momentum fades.';
                break;
            case 'contraction-focus':
                volumeMultiplier = 0.9; // fewer transactions
                priceMultiplier = 1.0; // focus on value, stable pricing
                notes = 'Contraction focus prioritizes pricing accuracy and durable pipeline health.';
                break;
            case 'trough-investment':
                volumeMultiplier = 1.1; // build pipeline for rebound
                priceMultiplier = 0.98; // value opportunities
                notes = 'Investing during trough builds pipeline and positions for the next expansion.';
                break;
            default:
                break;
        }

        // Ramp over time (triangular ramp like HTML version intent)
        const monthlyBaseline = baselineRevenue / 12;
        const rampFactor = (implementationTime * (implementationTime + 1)) / (2 * 12); // normalized triangular number
        const projectedAnnualized = baselineRevenue * volumeMultiplier * priceMultiplier;
        const projectedTimelineRevenue = monthlyBaseline * (volumeMultiplier * priceMultiplier) * rampFactor;
        const netImpact = projectedTimelineRevenue - strategyInvestment;

        setTimingResult({
            baselineRevenue,
            projectedAnnualized,
            projectedTimelineRevenue,
            netImpact,
            notes
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">📈 Market Cycle Strategy and Timing</h1>
                <p className="text-xl text-purple-100">
                    Master market timing, recognize cycle phases early, and position your business for maximum opportunity in any market condition.
                </p>
                <div className="mt-4 bg-purple-500/30 px-4 py-2 rounded-full inline-block">
                    <span className="text-white font-semibold">26 min read • Pro Plan</span>
                </div>
            </div> */}

            <div className="space-y-8">
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl p-6 mb-8">
                    <p className="text-2xl font-bold text-center text-white">
                        Agents who master market timing earn 45% more in down markets and 67% more in up markets
                    </p>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <p className="text-white/90 mb-4">
                        Most agents are reactive to market changes. They adjust their strategies after the market has already shifted, missing the biggest opportunities and struggling through the hardest periods.
                    </p>
                    <p className="text-white/90 mb-6">
                        The agents who consistently succeed across all market cycles don't just adapt—they anticipate. They recognize early indicators of market shifts and position themselves to capitalize on opportunities while their competitors are still figuring out what happened.
                    </p>

                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-purple-500/20 border border-purple-500 rounded-lg p-4 text-center">
                            <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">1</div>
                            <h4 className="font-bold text-purple-400 mb-2">Recognize</h4>
                            <p className="text-sm text-white/80">Identify current market phase and early shift indicators</p>
                        </div>
                        <div className="bg-purple-500/20 border border-purple-500 rounded-lg p-4 text-center">
                            <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">2</div>
                            <h4 className="font-bold text-purple-400 mb-2">Position</h4>
                            <p className="text-sm text-white/80">Align business strategy with market cycle phase</p>
                        </div>
                        <div className="bg-purple-500/20 border border-purple-500 rounded-lg p-4 text-center">
                            <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">3</div>
                            <h4 className="font-bold text-purple-400 mb-2">Anticipate</h4>
                            <p className="text-sm text-white/80">Prepare for the next phase before it arrives</p>
                        </div>
                        <div className="bg-purple-500/20 border border-purple-500 rounded-lg p-4 text-center">
                            <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">4</div>
                            <h4 className="font-bold text-purple-400 mb-2">Execute</h4>
                            <p className="text-sm text-white/80">Implement phase-specific tactics for maximum impact</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">The Four Market Cycle Phases</h2>
                    <p className="text-white/90 mb-6">
                        Understanding where your market is in the cycle is essential for strategic planning:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-500/20 border-3 border-green-500 rounded-lg p-6 text-center">
                            <div className="text-3xl mb-2">🚀</div>
                            <h3 className="text-lg font-bold text-green-400 mb-2">Expansion Phase</h3>
                            <p className="text-sm text-white/80 mb-2"><strong>Characteristics:</strong></p>
                            <ul className="text-sm text-white/70 space-y-1 ml-5 text-left">
                                <li>Rising prices and sales volume</li>
                                <li>Low inventory levels</li>
                                <li>Multiple offers common</li>
                                <li>Quick sales (under 30 days)</li>
                                <li>High buyer competition</li>
                            </ul>
                            <p className="text-sm text-green-300 mt-3"><strong>Duration:</strong> 2-5 years typically</p>
                            <p className="text-sm text-green-300"><strong>Your Focus:</strong> Volume and efficiency</p>
                        </div>

                        <div className="bg-red-500/20 border-3 border-red-500 rounded-lg p-6 text-center">
                            <div className="text-3xl mb-2">⛰️</div>
                            <h3 className="text-lg font-bold text-red-400 mb-2">Peak Phase</h3>
                            <p className="text-sm text-white/80 mb-2"><strong>Characteristics:</strong></p>
                            <ul className="text-sm text-white/70 space-y-1 ml-5 text-left">
                                <li>Maximum prices reached</li>
                                <li>Sales pace starts slowing</li>
                                <li>Inventory begins increasing</li>
                                <li>First signs of buyer hesitation</li>
                                <li>Media attention on "hot market"</li>
                            </ul>
                            <p className="text-sm text-red-300 mt-3"><strong>Duration:</strong> 6-18 months</p>
                            <p className="text-sm text-red-300"><strong>Your Focus:</strong> Positioning and preparation</p>
                        </div>

                        <div className="bg-orange-500/20 border-3 border-orange-500 rounded-lg p-6 text-center">
                            <div className="text-3xl mb-2">📉</div>
                            <h3 className="text-lg font-bold text-orange-400 mb-2">Contraction Phase</h3>
                            <p className="text-sm text-white/80 mb-2"><strong>Characteristics:</strong></p>
                            <ul className="text-sm text-white/70 space-y-1 ml-5 text-left">
                                <li>Declining prices and volume</li>
                                <li>Rising inventory levels</li>
                                <li>Longer days on market</li>
                                <li>Price reductions common</li>
                                <li>Buyer negotiation power</li>
                            </ul>
                            <p className="text-sm text-orange-300 mt-3"><strong>Duration:</strong> 1-3 years</p>
                            <p className="text-sm text-orange-300"><strong>Your Focus:</strong> Value and expertise</p>
                        </div>

                        <div className="bg-blue-500/20 border-3 border-blue-500 rounded-lg p-6 text-center">
                            <div className="text-3xl mb-2">🏔️</div>
                            <h3 className="text-lg font-bold text-blue-400 mb-2">Trough Phase</h3>
                            <p className="text-sm text-white/80 mb-2"><strong>Characteristics:</strong></p>
                            <ul className="text-sm text-white/70 space-y-1 ml-5 text-left">
                                <li>Prices stabilize at low point</li>
                                <li>Volume remains low</li>
                                <li>High inventory but slowing growth</li>
                                <li>Only motivated buyers active</li>
                                <li>Media reports "market bottom"</li>
                            </ul>
                            <p className="text-sm text-blue-300 mt-3"><strong>Duration:</strong> 6 months - 2 years</p>
                            <p className="text-sm text-blue-300"><strong>Your Focus:</strong> Investment and preparation</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Market Phase Identification System</h2>
                    <p className="text-white/90 mb-4">Use these metrics to accurately identify your current market phase:</p>

                    <div className="bg-white/95 text-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Market Phase Diagnostic Matrix</h3>
                        <div className="grid grid-cols-6 gap-2 text-sm">
                            <div className="bg-gray-800 text-white p-2 rounded font-bold text-center">Metric</div>
                            <div className="bg-green-500 text-white p-2 rounded font-bold text-center">Expansion</div>
                            <div className="bg-red-500 text-white p-2 rounded font-bold text-center">Peak</div>
                            <div className="bg-orange-500 text-white p-2 rounded font-bold text-center">Contraction</div>
                            <div className="bg-blue-500 text-white p-2 rounded font-bold text-center">Trough</div>
                            <div className="bg-gray-800 text-white p-2 rounded font-bold text-center">Current</div>

                            <div className="bg-gray-100 p-2 rounded font-bold"><strong>Median Days on Market</strong></div>
                            <div className="bg-green-100 p-2 rounded text-center"> 20 days</div>
                            <div className="bg-red-100 p-2 rounded text-center">20-40 days</div>
                            <div className="bg-orange-100 p-2 rounded text-center">40-90 days</div>
                            <div className="bg-blue-100 p-2 rounded text-center">90+ days</div>
                            <div className="bg-gray-100 p-2 rounded text-center">Enter data below</div>

                            <div className="bg-gray-100 p-2 rounded font-bold"><strong>Price Change YoY</strong></div>
                            <div className="bg-green-100 p-2 rounded text-center">+5% to +15%</div>
                            <div className="bg-red-100 p-2 rounded text-center">+15%+</div>
                            <div className="bg-orange-100 p-2 rounded text-center">-5% to +5%</div>
                            <div className="bg-blue-100 p-2 rounded text-center">-5% or more</div>
                            <div className="bg-gray-100 p-2 rounded text-center">Enter data below</div>

                            <div className="bg-gray-100 p-2 rounded font-bold"><strong>Inventory Months</strong></div>
                            <div className="bg-green-100 p-2 rounded text-center"> 3 months</div>
                            <div className="bg-red-100 p-2 rounded text-center">3-4 months</div>
                            <div className="bg-orange-100 p-2 rounded text-center">4-8 months</div>
                            <div className="bg-blue-100 p-2 rounded text-center">8+ months</div>
                            <div className="bg-gray-100 p-2 rounded text-center">Enter data below</div>

                            <div className="bg-gray-100 p-2 rounded font-bold"><strong>Sales Volume Change</strong></div>
                            <div className="bg-green-100 p-2 rounded text-center">+10%+ YoY</div>
                            <div className="bg-red-100 p-2 rounded text-center">Flat to +5%</div>
                            <div className="bg-orange-100 p-2 rounded text-center">-10% to flat</div>
                            <div className="bg-blue-100 p-2 rounded text-center">-10%+ YoY</div>
                            <div className="bg-gray-100 p-2 rounded text-center">Enter data below</div>

                            <div className="bg-gray-100 p-2 rounded font-bold"><strong>Multiple Offers</strong></div>
                            <div className="bg-green-100 p-2 rounded text-center">60%+ listings</div>
                            <div className="bg-red-100 p-2 rounded text-center">30-60%</div>
                            <div className="bg-orange-100 p-2 rounded text-center">10-30%</div>
                            <div className="bg-blue-100 p-2 rounded text-center"> 10%</div>
                            <div className="bg-gray-100 p-2 rounded text-center">Enter data below</div>
                        </div>

                        <div className="mt-6">
                            <label className="block mb-2 font-bold text-gray-800">Enter your market data to analyze phase:</label>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    placeholder="Days on Market"
                                    value={marketData.dom}
                                    onChange={(e) => setMarketData({ ...marketData, dom: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg"
                                />
                                <input
                                    type="number"
                                    placeholder="Price Change % (use negative for declines)"
                                    value={marketData.priceChange}
                                    onChange={(e) => setMarketData({ ...marketData, priceChange: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg"
                                />
                                <input
                                    type="number"
                                    placeholder="Months of Inventory"
                                    value={marketData.inventory}
                                    onChange={(e) => setMarketData({ ...marketData, inventory: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg"
                                />
                                <input
                                    type="number"
                                    placeholder="Volume Change % (use negative for declines)"
                                    value={marketData.volumeChange}
                                    onChange={(e) => setMarketData({ ...marketData, volumeChange: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg"
                                />
                                <input
                                    type="number"
                                    placeholder="Multiple Offers %"
                                    value={marketData.offers}
                                    onChange={(e) => setMarketData({ ...marketData, offers: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg md:col-span-2"
                                />
                            </div>

                            <button
                                onClick={calculateMarketPhase}
                                className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-purple-600 transition-colors mt-4"
                            >
                                Analyze My Market Phase
                            </button>

                            {phaseResult && (
                                <div className="bg-purple-100 border border-purple-500 rounded-lg p-4 mt-4">
                                    <div className="text-gray-800">
                                        <strong>📊 Market Analysis Result:</strong><br /><br />
                                        <strong>Phase:</strong> {phaseResult.phaseName}<br />
                                        <strong>Description:</strong> {phaseResult.description}<br />
                                        <strong>Strategy:</strong> {phaseResult.strategy}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">🎯 Key Takeaway</h2>
                    <p className="text-green-100 text-lg">
                        Agents who master market timing earn 45% more in down markets and 67% more in up markets. The key is recognizing phase shifts early and positioning accordingly.
                    </p>
                </div>

                {/* Market Timing Opportunity Calculator */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Market Timing Opportunity Calculator</h2>
                    <p className="text-white/90 mb-4">Quantify the potential impact of different market timing decisions:</p>

                    <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-yellow-400 mb-4">📊 Market Timing Impact Calculator</h3>
                        <p className="text-white/90 mb-4">Calculate the potential revenue impact of timing strategies:</p>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block mb-2 font-bold text-white">Current Annual Sales Volume:</label>
                                <input
                                    type="number"
                                    placeholder="24"
                                    value={timingData.annualVolume}
                                    onChange={(e) => setTimingData({ ...timingData, annualVolume: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />

                                <label className="block mb-2 font-bold text-white mt-4">Average Sale Price:</label>
                                <input
                                    type="number"
                                    placeholder="450000"
                                    value={timingData.avgPrice}
                                    onChange={(e) => setTimingData({ ...timingData, avgPrice: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />

                                <label className="block mb-2 font-bold text-white mt-4">Current Commission Rate (%):</label>
                                <input
                                    type="number"
                                    placeholder="3"
                                    step="0.1"
                                    value={timingData.commissionRate}
                                    onChange={(e) => setTimingData({ ...timingData, commissionRate: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-bold text-white">Market Phase Timing:</label>
                                <select
                                    value={timingData.timingScenario}
                                    onChange={(e) => setTimingData({ ...timingData, timingScenario: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white h-12"
                                >
                                    <option value="early-expansion">Early Expansion Entry</option>
                                    <option value="peak-exit">Peak Exit Strategy</option>
                                    <option value="contraction-focus">Contraction Market Focus</option>
                                    <option value="trough-investment">Trough Investment Strategy</option>
                                </select>

                                <label className="block mb-2 font-bold text-white mt-4">Implementation Timeline (months):</label>
                                <input
                                    type="number"
                                    placeholder="12"
                                    value={timingData.implementationTime}
                                    onChange={(e) => setTimingData({ ...timingData, implementationTime: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />

                                <label className="block mb-2 font-bold text-white mt-4">Investment in Strategy ($):</label>
                                <input
                                    type="number"
                                    placeholder="15000"
                                    value={timingData.strategyInvestment}
                                    onChange={(e) => setTimingData({ ...timingData, strategyInvestment: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />
                            </div>
                        </div>

                        <button
                            onClick={calculateTimingImpact}
                            className="w-full bg-[#00D4AA] text-[#1e3a5f] py-3 px-6 rounded-lg font-bold hover:bg-[#00B894] transition-colors"
                        >
                            Calculate Timing Impact
                        </button>

                        {timingResult && (
                            <div className="mt-6 space-y-4">
                                <div className="bg-purple-500/20 p-5 rounded-lg">
                                    <div className="text-white">
                                        <strong>📈 Timing Impact Analysis:</strong><br />
                                        <strong>Baseline Annual Revenue:</strong> ${timingResult.baselineRevenue.toLocaleString()}<br />
                                        <strong>Projected Annualized Revenue:</strong> ${timingResult.projectedAnnualized.toLocaleString()}<br />
                                        <strong>Timeline Revenue (ramped):</strong> ${timingResult.projectedTimelineRevenue.toLocaleString()}<br />
                                        <strong>Net Impact after Investment:</strong> ${timingResult.netImpact.toLocaleString()}<br />
                                        <strong>Strategy Notes:</strong> {timingResult.notes}
                                    </div>
                                </div>
                                <div className="bg-yellow-500/20 p-5 rounded-lg">
                                    <div className="text-white">
                                        <strong>📋 Recommendations:</strong><br />
                                        Align operations and marketing to your selected timing strategy. Track monthly progress and adjust inputs as your market shifts.
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Success Metrics and KPIs */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Success Metrics and KPIs</h2>
                    <p className="text-white/90 mb-6">Track these metrics to measure your market timing effectiveness:</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white/15 p-6 rounded-xl border-2 border-[#9B59B6]">
                            <h4 className="text-[#9B59B6] font-bold mb-3">Performance Metrics</h4>
                            <ul className="text-white/90 list-disc ml-6">
                                <li><strong>Market share vs. phase:</strong> Track your share in each cycle</li>
                                <li><strong>Revenue per transaction:</strong> Optimize for each phase</li>
                                <li><strong>Lead conversion rates:</strong> By market condition</li>
                                <li><strong>Client satisfaction scores:</strong> Maintain through all cycles</li>
                            </ul>
                        </div>
                        <div className="bg-white/15 p-6 rounded-xl border-2 border-yellow-400">
                            <h4 className="text-[#FFD700] font-bold mb-3">Predictive Indicators</h4>
                            <ul className="text-white/90 list-disc ml-6">
                                <li><strong>Lead indicator accuracy:</strong> How early you spot shifts</li>
                                <li><strong>Strategy transition time:</strong> Speed of adaptation</li>
                                <li><strong>Competitive positioning:</strong> Relative market performance</li>
                                <li><strong>Client retention rates:</strong> Through market cycles</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white text-[#1e3a5f] p-6 rounded-xl">
                        <h4 className="text-[#1e3a5f] font-bold mb-2">Market Timing ROI Analysis:</h4>
                        <p className="text-[#1e3a5f]"><strong>Baseline Performance:</strong> Reactive agents average 15-20 transactions annually</p>
                        <p className="text-[#1e3a5f]"><strong>Cycle-Aware Performance:</strong> Proactive agents average 25-35 transactions annually</p>
                        <p className="text-[#1e3a5f]"><strong>Premium Positioning:</strong> 20-40% higher commission rates through expertise</p>
                        <p className="text-[#1e3a5f]"><strong>Client Retention:</strong> 60% vs 35% for market-timing vs reactive agents</p>
                        <p className="mt-3 text-[#1e3a5f] font-bold">Agents who master market timing typically earn 45-67% more over a complete market cycle.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketCycleStrategy;
