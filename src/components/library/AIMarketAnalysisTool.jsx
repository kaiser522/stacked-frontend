import React, { useState } from 'react';

const AIMarketAnalysisTool = () => {
    const [formData, setFormData] = useState({
        marketArea: '',
        priceRange: '',
        season: '',
        agentActivity: '',
        observations: '',
        rateImpact: ''
    });

    const [analysis, setAnalysis] = useState(null);

    const generateAnalysis = () => {
        const { marketArea, priceRange, season, agentActivity, observations, rateImpact } = formData;

        if (!marketArea || !priceRange || !season || !agentActivity) {
            alert('Please fill in all required fields to generate analysis.');
            return;
        }

        // AI Analysis Logic
        let marketScore = 0;
        let insights = [];

        // Agent Activity Impact
        if (agentActivity === 'very-busy') marketScore += 3;
        else if (agentActivity === 'busy') marketScore += 2;
        else if (agentActivity === 'moderate') marketScore += 1;
        else marketScore -= 1;

        // Observations Impact
        if (observations === 'multiple-offers') marketScore += 3;
        else if (observations === 'quick-sales') marketScore += 2;
        else if (observations === 'normal-activity') marketScore += 1;
        else if (observations === 'price-reductions') marketScore -= 1;
        else if (observations === 'sitting-long') marketScore -= 2;

        // Season Impact
        if (season === 'spring') marketScore += 2;
        else if (season === 'summer') marketScore += 1;
        else if (season === 'fall') marketScore += 0;
        else marketScore -= 1;

        // Interest Rate Impact
        if (rateImpact === 'no-impact') marketScore += 1;
        else if (rateImpact === 'some-impact') marketScore += 0;
        else marketScore -= 2;

        // Generate Analysis Based on Score
        let temp, inventory, demand, trend, competition, timeToSell, negotiation, outlook;

        if (marketScore >= 6) {
            temp = 'Very Hot'; inventory = 'Very Low'; demand = 'Very High'; trend = 'Rising Fast';
            competition = 'Extreme'; timeToSell = 'Days'; negotiation = 'Strong Seller'; outlook = 'Bullish';
            insights.push('Market is extremely competitive with bidding wars common');
            insights.push('Sellers should price aggressively and expect over-asking offers');
            insights.push('Buyers need to act fast and consider escalation clauses');
        } else if (marketScore >= 3) {
            temp = 'Hot'; inventory = 'Low'; demand = 'High'; trend = 'Rising';
            competition = 'High'; timeToSell = 'Fast'; negotiation = 'Seller Favored'; outlook = 'Positive';
            insights.push('Strong seller\'s market with good activity levels');
            insights.push('Properties selling quickly, often with multiple offers');
            insights.push('Good time for sellers to list, buyers should be prepared to compete');
        } else if (marketScore >= 0) {
            temp = 'Balanced'; inventory = 'Moderate'; demand = 'Steady'; trend = 'Stable';
            competition = 'Moderate'; timeToSell = 'Normal'; negotiation = 'Balanced'; outlook = 'Stable';
            insights.push('Market showing balanced conditions between buyers and sellers');
            insights.push('Normal negotiation dynamics with reasonable timeline expectations');
            insights.push('Both buyers and sellers can expect fair market conditions');
        } else {
            temp = 'Cool'; inventory = 'High'; demand = 'Low'; trend = 'Declining';
            competition = 'Low'; timeToSell = 'Slow'; negotiation = 'Buyer Favored'; outlook = 'Cautious';
            insights.push('Market favoring buyers with more negotiation power');
            insights.push('Properties taking longer to sell, price reductions becoming common');
            insights.push('Buyers have more options and leverage in negotiations');
        }

        const insightText = `Based on your inputs for ${marketArea} in the ${priceRange} price range:\n\n${insights.map(insight => '• ' + insight).join('\n')}\n\nConsider this analysis as a starting point for your market strategy.`;

        setAnalysis({
            temp,
            inventory,
            demand,
            trend,
            competition,
            timeToSell,
            negotiation,
            outlook,
            insightText
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-gradient-to-br from-gray-800/20 to-blue-900/20 rounded-xl p-8 border border-blue-500/30">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                        🤖
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">AI Market Analysis Tool</h1>
                    <p className="text-gray-300 text-lg">
                        AI-powered market analysis tool that provides intelligent insights based on local market conditions, agent activity, and market observations.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="bg-blue-500/20 border-2 border-blue-500 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-blue-400 mb-6">Basic Market Info</h2>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-blue-400 font-bold mb-2">Your Market Area:</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="e.g., Downtown Phoenix, Suburbs of Dallas"
                                    value={formData.marketArea}
                                    onChange={(e) => setFormData({ ...formData, marketArea: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-blue-400 font-bold mb-2">Typical Home Price Range:</label>
                                <select
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    value={formData.priceRange}
                                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                                >
                                    <option value="">Select price range</option>
                                    <option value="under-200k">Under $200K</option>
                                    <option value="200k-400k">$200K - $400K</option>
                                    <option value="400k-600k">$400K - $600K</option>
                                    <option value="600k-800k">$600K - $800K</option>
                                    <option value="800k-1m">$800K - $1M</option>
                                    <option value="over-1m">Over $1M</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-blue-400 font-bold mb-2">Current Season/Time:</label>
                                <select
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    value={formData.season}
                                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                                >
                                    <option value="">Select season</option>
                                    <option value="spring">Spring (Mar-May)</option>
                                    <option value="summer">Summer (Jun-Aug)</option>
                                    <option value="fall">Fall (Sep-Nov)</option>
                                    <option value="winter">Winter (Dec-Feb)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-blue-400 font-bold mb-2">How busy are you lately?</label>
                                <select
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    value={formData.agentActivity}
                                    onChange={(e) => setFormData({ ...formData, agentActivity: e.target.value })}
                                >
                                    <option value="">Select activity level</option>
                                    <option value="very-busy">Very busy - lots of showings/offers</option>
                                    <option value="busy">Busy - steady activity</option>
                                    <option value="moderate">Moderate - some activity</option>
                                    <option value="slow">Slow - not much happening</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-blue-400 font-bold mb-2">Recent observations:</label>
                                <select
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    value={formData.observations}
                                    onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                                >
                                    <option value="">What are you seeing?</option>
                                    <option value="multiple-offers">Multiple offers on most listings</option>
                                    <option value="quick-sales">Homes selling within days</option>
                                    <option value="normal-activity">Normal buying/selling activity</option>
                                    <option value="price-reductions">Seeing price reductions</option>
                                    <option value="sitting-long">Homes sitting longer than usual</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-blue-400 font-bold mb-2">Interest rates feeling:</label>
                                <select
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    value={formData.rateImpact}
                                    onChange={(e) => setFormData({ ...formData, rateImpact: e.target.value })}
                                >
                                    <option value="">Select impact</option>
                                    <option value="no-impact">Not affecting my clients much</option>
                                    <option value="some-impact">Causing some hesitation</option>
                                    <option value="major-impact">Major concern for buyers</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={generateAnalysis}
                            className="w-full bg-red-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-400 transition-colors shadow-lg"
                        >
                            Generate AI Market Analysis
                        </button>
                    </div>

                    {analysis && (
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-6">
                            <h2 className="text-2xl font-bold mb-6">AI Market Assessment</h2>

                            <div className="grid md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-white/20 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-yellow-300 mb-2">{analysis.temp}</div>
                                    <div className="font-bold">Market Temperature</div>
                                </div>

                                <div className="bg-white/20 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-yellow-300 mb-2">{analysis.inventory}</div>
                                    <div className="font-bold">Inventory Level</div>
                                </div>

                                <div className="bg-white/20 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-yellow-300 mb-2">{analysis.demand}</div>
                                    <div className="font-bold">Buyer Demand</div>
                                </div>

                                <div className="bg-white/20 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-yellow-300 mb-2">{analysis.trend}</div>
                                    <div className="font-bold">Price Trend</div>
                                </div>
                            </div>

                            <div className="bg-white/20 rounded-lg p-6 mb-6">
                                <h3 className="text-xl font-bold mb-4">Market Indicators</h3>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                                        <span>Competition Level</span>
                                        <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold">{analysis.competition}</span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                                        <span>Time to Sell</span>
                                        <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold">{analysis.timeToSell}</span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                                        <span>Negotiation Power</span>
                                        <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold">{analysis.negotiation}</span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                                        <span>Market Outlook</span>
                                        <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm font-bold">{analysis.outlook}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/20 rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-4">AI Insights & Recommendations</h3>
                                <div className="whitespace-pre-line text-sm">{analysis.insightText}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIMarketAnalysisTool;
