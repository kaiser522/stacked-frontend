import React, { useState } from 'react';

const CompetitiveIntelligence = () => {
    const [marketData, setMarketData] = useState({
        yourSales: '',
        totalMarket: '',
        topCompetitor: '',
        yourPrice: '',
        marketPrice: '',
        growthGoal: ''
    });
    const [positionResult, setPositionResult] = useState(null);

    const calculateMarketPosition = () => {
        const yourSales = parseFloat(marketData.yourSales) || 0;
        const totalMarket = parseFloat(marketData.totalMarket) || 1;
        const topCompetitor = parseFloat(marketData.topCompetitor) || 0;
        const yourPrice = parseFloat(marketData.yourPrice) || 0;
        const marketPrice = parseFloat(marketData.marketPrice) || 1;
        const growthGoal = parseFloat(marketData.growthGoal) || 0;

        if (yourSales === 0 || totalMarket === 0) {
            alert('Please enter your sales volume and total market data.');
            return;
        }

        // Calculate current market share
        const marketShare = (yourSales / totalMarket * 100);
        const competitorShare = (topCompetitor / totalMarket * 100);

        // Calculate price positioning
        const pricePositioning = ((yourPrice - marketPrice) / marketPrice * 100);

        // Calculate growth requirements
        const targetSales = yourSales * (1 + growthGoal / 100);
        const additionalSales = targetSales - yourSales;
        const marketShareGrowth = (additionalSales / totalMarket * 100);

        let positioningStrategy = '';
        let competitiveAdvice = '';

        if (marketShare < 5) {
            positioningStrategy = 'Emerging Player - Focus on niche specialization';
            competitiveAdvice = 'Target underserved market segments and build expertise depth';
        } else if (marketShare < 15) {
            positioningStrategy = 'Growing Competitor - Scale proven strategies';
            competitiveAdvice = 'Identify and replicate what\'s working, expand geographic reach';
        } else if (marketShare < 25) {
            positioningStrategy = 'Market Leader - Defend and expand';
            competitiveAdvice = 'Focus on service quality and market share defense';
        } else {
            positioningStrategy = 'Dominant Player - Innovation and efficiency';
            competitiveAdvice = 'Lead market changes and optimize operations';
        }

        let priceStrategy = '';
        if (pricePositioning > 5) {
            priceStrategy = 'Premium positioning - ensure value justification';
        } else if (pricePositioning < -5) {
            priceStrategy = 'Value positioning - consider premium move opportunities';
        } else {
            priceStrategy = 'Market-aligned pricing - good competitive position';
        }

        setPositionResult({
            marketShare: marketShare.toFixed(1),
            competitorShare: competitorShare.toFixed(1),
            pricePositioning: pricePositioning.toFixed(1),
            positioningStrategy,
            additionalSales: additionalSales.toFixed(1),
            marketShareGrowth: marketShareGrowth.toFixed(1),
            competitiveAdvice,
            priceStrategy
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">📊 Competitive Market Intelligence System</h1>
                <p className="text-xl text-purple-100">
                    Track competitors systematically, identify market opportunities, and position yourself strategically without being negative.
                </p>
                <div className="mt-4 bg-purple-500/30 px-4 py-2 rounded-full inline-block">
                    <span className="text-white font-semibold">21 min read • Pro Plan</span>
                </div>
            </div> */}

            <div className="space-y-8">
                <div className="bg-white/10 rounded-xl p-6">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-6 text-center">
                        <p className="text-white text-xl font-bold">Agents using competitive intelligence gain 28% more market share per year</p>
                    </div>

                    <p className="text-white/90 mb-6">
                        Most agents operate in the dark about their competition. They know names but not strategies. They react instead of anticipate. They compete on price instead of value.
                    </p>

                    <p className="text-white/90 mb-6">
                        The agents who dominate their markets don't just work harder—they work smarter. They understand their competitive landscape as well as a military commander understands a battlefield. They know where opportunities exist, what competitors are doing wrong, and how to position themselves for maximum advantage.
                    </p>

                    <div className="grid md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-4 text-center">
                            <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">1</div>
                            <h4 className="font-bold text-orange-400 mb-2">Identify</h4>
                            <p className="text-sm text-white/80">Map your competitive landscape and define direct vs indirect competitors</p>
                        </div>
                        <div className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-4 text-center">
                            <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">2</div>
                            <h4 className="font-bold text-orange-400 mb-2">Monitor</h4>
                            <p className="text-sm text-white/80">Set up systematic tracking of competitor activities and market share</p>
                        </div>
                        <div className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-4 text-center">
                            <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">3</div>
                            <h4 className="font-bold text-orange-400 mb-2">Analyze</h4>
                            <p className="text-sm text-white/80">Identify patterns, opportunities, and competitive weaknesses</p>
                        </div>
                        <div className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-4 text-center">
                            <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">4</div>
                            <h4 className="font-bold text-orange-400 mb-2">Position</h4>
                            <p className="text-sm text-white/80">Develop strategies that capitalize on competitive gaps</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Competitive Landscape Mapping</h2>
                    <p className="text-white/90 mb-6">Before you can win, you need to understand who you're competing against and how they operate:</p>

                    <h3 className="text-xl font-bold text-yellow-400 mb-4">The Four Competitor Categories</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/10 border-3 border-[#00D4AA] rounded-lg p-6">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-2">Direct Competitors</h3>
                            <p className="text-white/80 mb-2"><strong>Definition:</strong> Agents targeting the same price ranges, areas, and client types</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li>• Similar experience levels</li>
                                <li>• Comparable service offerings</li>
                                <li>• Same geographic focus</li>
                                <li>• Competing for identical listings</li>
                            </ul>
                            <p className="text-white/80"><strong>Strategy:</strong> Head-to-head differentiation required</p>
                        </div>

                        <div className="bg-white/10 border-3 border-[#00D4AA] rounded-lg p-6">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-2">Indirect Competitors</h3>
                            <p className="text-white/80 mb-2"><strong>Definition:</strong> Agents in adjacent markets or price points who could expand into your territory</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li>• Different price ranges but same area</li>
                                <li>• Same price range but adjacent areas</li>
                                <li>• Different business models (teams vs solo)</li>
                                <li>• Emerging or growing market presence</li>
                            </ul>
                            <p className="text-white/80"><strong>Strategy:</strong> Monitor for market expansion signals</p>
                        </div>

                        <div className="bg-white/10 border-3 border-[#00D4AA] rounded-lg p-6">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-2">Aspirational Competitors</h3>
                            <p className="text-white/80 mb-2"><strong>Definition:</strong> Top performers you want to study and eventually surpass</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li>• Higher production levels</li>
                                <li>• Premium market positioning</li>
                                <li>• Strong brand recognition</li>
                                <li>• Systems and strategies worth studying</li>
                            </ul>
                            <p className="text-white/80"><strong>Strategy:</strong> Study and adapt successful approaches</p>
                        </div>

                        <div className="bg-white/10 border-3 border-[#00D4AA] rounded-lg p-6">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-2">Disruptive Competitors</h3>
                            <p className="text-white/80 mb-2"><strong>Definition:</strong> New players with different business models or value propositions</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li>• Discount brokerages</li>
                                <li>• Technology-first companies</li>
                                <li>• Alternative service models</li>
                                <li>• Non-traditional market entrants</li>
                            </ul>
                            <p className="text-white/80"><strong>Strategy:</strong> Anticipate market shifts and adapt</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Systematic Competitor Tracking</h2>
                    <p className="text-white/90 mb-6">Set up systems to monitor competitor activities without being obvious or obsessive:</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-3">Digital Monitoring</h3>
                            <ul className="text-white/80 text-left ml-5">
                                <li>• <strong>Google Alerts:</strong> Competitor names + your city</li>
                                <li>• <strong>Social Media Following:</strong> Professional accounts only</li>
                                <li>• <strong>Website Changes:</strong> Monthly screenshots</li>
                                <li>• <strong>Review Monitoring:</strong> Google/Zillow ratings</li>
                                <li>• <strong>Ad Tracking:</strong> Facebook Ad Library</li>
                            </ul>
                        </div>

                        <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-3">Market Activity</h3>
                            <ul className="text-white/80 text-left ml-5">
                                <li>• <strong>MLS Tracking:</strong> Listing volume and pricing</li>
                                <li>• <strong>Sale Analysis:</strong> Average days on market</li>
                                <li>• <strong>Price Performance:</strong> List-to-sale ratios</li>
                                <li>• <strong>Market Share:</strong> Percentage of area sales</li>
                                <li>• <strong>Geographic Expansion:</strong> New area activity</li>
                            </ul>
                        </div>

                        <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-[#00D4AA] mb-3">Client Intelligence</h3>
                            <ul className="text-white/80 text-left ml-5">
                                <li>• <strong>Past Client Feedback:</strong> Why they chose others</li>
                                <li>• <strong>Lost Lead Analysis:</strong> Competitor advantages</li>
                                <li>• <strong>Referral Sources:</strong> Where they get business</li>
                                <li>• <strong>Service Gaps:</strong> Client complaint patterns</li>
                                <li>• <strong>Pricing Strategies:</strong> Commission structures</li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-yellow-400 mb-4 mt-8">Monthly Competitor Scorecard</h3>
                    <div className="bg-white/95 text-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Competitive Performance Matrix</h3>
                        <div className="grid grid-cols-5 gap-3 mb-4">
                            <div className="bg-[#1e3a5f] text-white p-3 text-center font-bold rounded text-sm">Agent</div>
                            <div className="bg-[#1e3a5f] text-white p-3 text-center font-bold rounded text-sm">Monthly Sales</div>
                            <div className="bg-[#1e3a5f] text-white p-3 text-center font-bold rounded text-sm">Avg DOM</div>
                            <div className="bg-[#1e3a5f] text-white p-3 text-center font-bold rounded text-sm">List/Sale %</div>
                            <div className="bg-[#1e3a5f] text-white p-3 text-center font-bold rounded text-sm">Market Share</div>

                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm font-bold">You</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">8 sales</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">22 days</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">98.2%</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">12.4%</div>

                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">Competitor A</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">12 sales</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">28 days</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">96.8%</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">18.6%</div>

                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">Competitor B</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">6 sales</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">18 days</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">99.1%</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">9.3%</div>

                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">Competitor C</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">10 sales</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">35 days</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">94.5%</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded text-sm">15.5%</div>
                        </div>

                        <div className="bg-orange-500/10 p-5 rounded-lg mt-5">
                            <h4 className="text-orange-500 font-bold mb-3">Key Insights from Data:</h4>
                            <ul className="ml-5 text-gray-800">
                                <li><strong>Opportunity:</strong> Competitor A has high volume but slow sales (pricing issues?)</li>
                                <li><strong>Threat:</strong> Competitor B has fastest sales but lower volume (capacity constraints?)</li>
                                <li><strong>Weakness:</strong> Competitor C has poor pricing accuracy (negotiation weakness?)</li>
                                <li><strong>Your Position:</strong> Strong performance metrics but volume opportunity exists</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Market Share Analysis Calculator</h2>
                    <p className="text-white/90 mb-4">Calculate your competitive position and identify growth opportunities:</p>

                    <div className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-orange-400 mb-4">📊 Market Share Calculator</h3>
                        <p className="text-white/90 mb-4">Enter market data to analyze your competitive position:</p>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block mb-2 font-bold text-white">Your Monthly Sales Volume:</label>
                                <input
                                    type="number"
                                    placeholder="8"
                                    value={marketData.yourSales}
                                    onChange={(e) => setMarketData({ ...marketData, yourSales: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />

                                <label className="block mb-2 font-bold text-white mt-4">Total Market Monthly Sales:</label>
                                <input
                                    type="number"
                                    placeholder="85"
                                    value={marketData.totalMarket}
                                    onChange={(e) => setMarketData({ ...marketData, totalMarket: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />

                                <label className="block mb-2 font-bold text-white mt-4">Top Competitor Sales:</label>
                                <input
                                    type="number"
                                    placeholder="15"
                                    value={marketData.topCompetitor}
                                    onChange={(e) => setMarketData({ ...marketData, topCompetitor: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-bold text-white">Your Average Sale Price:</label>
                                <input
                                    type="number"
                                    placeholder="425000"
                                    value={marketData.yourPrice}
                                    onChange={(e) => setMarketData({ ...marketData, yourPrice: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />

                                <label className="block mb-2 font-bold text-white mt-4">Market Average Sale Price:</label>
                                <input
                                    type="number"
                                    placeholder="395000"
                                    value={marketData.marketPrice}
                                    onChange={(e) => setMarketData({ ...marketData, marketPrice: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />

                                <label className="block mb-2 font-bold text-white mt-4">Your Growth Goal (% increase):</label>
                                <input
                                    type="number"
                                    placeholder="25"
                                    value={marketData.growthGoal}
                                    onChange={(e) => setMarketData({ ...marketData, growthGoal: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />
                            </div>
                        </div>

                        <button
                            onClick={calculateMarketPosition}
                            className="w-full bg-[#00D4AA] text-[#1e3a5f] py-3 px-6 rounded-lg font-bold hover:bg-[#00B894] transition-colors"
                        >
                            Analyze Competitive Position
                        </button>

                        {positionResult && (
                            <div className="mt-6 space-y-4">
                                <div className="bg-orange-500/20 p-5 rounded-lg">
                                    <div className="text-white">
                                        <strong>📊 Your Market Position:</strong><br /><br />
                                        <strong>Market Share:</strong> {positionResult.marketShare}% (vs. top competitor: {positionResult.competitorShare}%)<br />
                                        <strong>Price Positioning:</strong> {positionResult.pricePositioning > 0 ? '+' : ''}{positionResult.pricePositioning}% vs. market average<br />
                                        <strong>Positioning Strategy:</strong> {positionResult.positioningStrategy}
                                    </div>
                                </div>
                                <div className="bg-[#00D4AA]/20 p-5 rounded-lg">
                                    <div className="text-white">
                                        <strong>🎯 Growth Strategy:</strong><br />
                                        <strong>Target:</strong> {positionResult.additionalSales} additional sales needed for {marketData.growthGoal}% growth<br />
                                        <strong>Market Share Impact:</strong> Would increase your share by {positionResult.marketShareGrowth} percentage points<br />
                                        <strong>Recommended Focus:</strong> {positionResult.competitiveAdvice}<br />
                                        <strong>Price Strategy:</strong> {positionResult.priceStrategy}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Competitive Positioning Strategies</h2>
                    <p className="text-white/90 mb-6">How to position yourself against competitors without being negative or unprofessional:</p>

                    <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-lg p-6 mb-6">
                        <div className="text-yellow-400 font-bold mb-3">🎯 The "Unique Advantage" Positioning</div>
                        <div className="bg-white/5 p-5 rounded-lg">
                            <p className="text-white/90 mb-2"><strong>Instead of saying:</strong> "Unlike other agents who..."</p>
                            <p className="text-white/90 mb-3"><strong>Say this:</strong> "My approach focuses specifically on [unique advantage]. This means you get [specific benefit] that helps you [desired outcome]."</p>

                            <p className="text-white/90 mt-4"><strong>Example:</strong><br />
                                "My approach focuses specifically on pre-marketing your home to my network before it goes live on MLS. This means you get early buyer interest that often results in faster sales and multiple offers."</p>
                        </div>
                    </div>

                    <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-lg p-6 mb-6">
                        <div className="text-yellow-400 font-bold mb-3">📊 The "Data-Driven" Positioning</div>
                        <div className="bg-white/5 p-5 rounded-lg">
                            <p className="text-white/90 mb-3"><strong>Strategy:</strong> Let performance metrics speak for you</p>

                            <p className="text-white/90 mb-3"><strong>Example:</strong><br />
                                "My listings sell an average of 6 days faster than the market average, and 97% sell within 2% of asking price. This performance comes from [specific strategies you use]."</p>

                            <p className="text-white/90"><strong>Why it works:</strong> Facts aren't negative—they're just facts. Let your performance differentiate you.</p>
                        </div>
                    </div>

                    <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-lg p-6">
                        <div className="text-yellow-400 font-bold mb-3">🏆 The "Specialized Expertise" Positioning</div>
                        <div className="bg-white/5 p-5 rounded-lg">
                            <p className="text-white/90 mb-3"><strong>Strategy:</strong> Claim specific expertise areas</p>

                            <p className="text-white/90 mb-3"><strong>Examples:</strong></p>
                            <ul className="text-white/90 ml-5">
                                <li>"I specialize in helping families transition from condos to single-family homes"</li>
                                <li>"My expertise is in luxury home marketing in the $800K+ range"</li>
                                <li>"I focus specifically on helping first-time buyers navigate today's market"</li>
                            </ul>

                            <p className="text-white/90 mt-4"><strong>Why it works:</strong> Specialization suggests deeper knowledge and experience.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">🎯 Key Takeaway</h2>
                    <p className="text-green-100 text-lg">
                        Agents using competitive intelligence gain 28% more market share per year. The key is systematic monitoring and ethical positioning based on your unique strengths.
                    </p>
                </div>

                {/* Ethical Market Share Strategies */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Ethical Market Share Strategies</h2>
                    <p className="text-white/90 mb-6">Legitimate strategies for capturing competitor market share through superior service:</p>

                    <h3 className="text-xl font-bold text-[#00D4AA] mb-4">Target Competitor Weaknesses</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-[#FF6B35]/10 p-6 rounded-xl">
                            <h4 className="text-[#FF6B35] font-bold mb-3">If Competitors Are Slow</h4>
                            <ul className="text-white/90 list-disc ml-6">
                                <li>Emphasize your speed and responsiveness</li>
                                <li>Guarantee response times</li>
                                <li>Show average days on market vs theirs</li>
                                <li>Use urgency in your marketing</li>
                            </ul>
                        </div>
                        <div className="bg-yellow-500/10 p-6 rounded-xl">
                            <h4 className="text-[#FFD700] font-bold mb-3">If Competitors Overprice</h4>
                            <ul className="text-white/90 list-disc ml-6">
                                <li>Emphasize pricing accuracy</li>
                                <li>Show list-to-sale ratios</li>
                                <li>Market your pricing methodology</li>
                                <li>Target their expired listings</li>
                            </ul>
                        </div>
                        <div className="bg-[#00D4AA]/10 p-6 rounded-xl">
                            <h4 className="text-[#00D4AA] font-bold mb-3">If Competitors Lack Tech</h4>
                            <ul className="text-white/90 list-disc ml-6">
                                <li>Showcase your technology advantages</li>
                                <li>Offer virtual tours and digital marketing</li>
                                <li>Provide real-time market updates</li>
                                <li>Use data analytics in presentations</li>
                            </ul>
                        </div>
                        <div className="bg-[#FF6B35]/10 p-6 rounded-xl">
                            <h4 className="text-[#FF6B35] font-bold mb-3">If Competitors Are Impersonal</h4>
                            <ul className="text-white/90 list-disc ml-6">
                                <li>Emphasize your personal attention</li>
                                <li>Share client success stories</li>
                                <li>Offer concierge-level service</li>
                                <li>Build relationships, not just transactions</li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#00D4AA] mb-4">The Competitor Client Acquisition Strategy</h3>
                    <p className="text-white/90 mb-6">Ethical approaches to winning clients from competitors:</p>

                    <div className="bg-white/10 p-6 rounded-xl">
                        <h4 className="text-[#FFD700] font-bold mb-3">Past Client Reactivation</h4>
                        <p className="text-white/90 mb-3">Target areas where competitors have been active but clients might be ready to move again:</p>
                        <ul className="text-white/90 list-disc ml-6 mb-4">
                            <li>Identify neighborhoods where competitors sold homes 3-7 years ago</li>
                            <li>Target these areas with "time to move up?" campaigns</li>
                            <li>Offer free market updates to show appreciation</li>
                            <li>Position yourself as the "second move" specialist</li>
                        </ul>

                        <h4 className="text-[#00D4AA] font-bold mb-3">Expired Listing Conversion</h4>
                        <p className="text-white/90 mb-3">When competitors fail to sell listings, position yourself as the solution:</p>
                        <ul className="text-white/90 list-disc ml-6 mb-4">
                            <li>Monitor expired listings from key competitors</li>
                            <li>Wait 30-60 days, then approach with market analysis</li>
                            <li>Show what went wrong and how you'd fix it</li>
                            <li>Focus on pricing strategy and marketing differences</li>
                        </ul>

                        <h4 className="text-[#FFD700] font-bold mb-3">Referral Network Infiltration</h4>
                        <p className="text-white/90 mb-3">Build relationships with the same professionals competitors use:</p>
                        <ul className="text-white/90 list-disc ml-6">
                            <li>Identify their lender and contractor networks</li>
                            <li>Build separate relationships with these professionals</li>
                            <li>Offer superior service to earn recommendations</li>
                            <li>Create exclusive partnerships where possible</li>
                        </ul>
                    </div>
                </div>

                {/* Monthly Competitor Monitoring Checklist */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Monthly Competitor Monitoring Checklist</h2>
                    <p className="text-white/90 mb-6">Stay on top of competitive intelligence with systematic monthly reviews:</p>

                    <div className="bg-[#FF6B35]/10 border-2 border-[#FF6B35] rounded-xl p-6">
                        <h3 className="text-[#FF6B35] font-bold text-xl mb-4">📋 Monthly Intelligence Gathering</h3>
                        <div className="space-y-3">
                            <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                <input type="checkbox" className="mt-1 scale-125" />
                                <div className="flex-1 text-white/90">
                                    <strong>MLS Performance Review:</strong> Pull sales data for top 5 competitors, calculate market share changes
                                </div>
                            </label>
                            <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                <input type="checkbox" className="mt-1 scale-125" />
                                <div className="flex-1 text-white/90">
                                    <strong>Digital Presence Audit:</strong> Screenshot competitor websites, note any changes or improvements
                                </div>
                            </label>
                            <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                <input type="checkbox" className="mt-1 scale-125" />
                                <div className="flex-1 text-white/90">
                                    <strong>Social Media Monitoring:</strong> Review content strategy, engagement levels, and new initiatives
                                </div>
                            </label>
                            <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                <input type="checkbox" className="mt-1 scale-125" />
                                <div className="flex-1 text-white/90">
                                    <strong>Marketing Material Analysis:</strong> Collect new flyers, ads, or promotional materials
                                </div>
                            </label>
                            <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                <input type="checkbox" className="mt-1 scale-125" />
                                <div className="flex-1 text-white/90">
                                    <strong>Pricing Strategy Review:</strong> Analyze list-to-sale ratios and average days on market
                                </div>
                            </label>
                            <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                <input type="checkbox" className="mt-1 scale-125" />
                                <div className="flex-1 text-white/90">
                                    <strong>Service Offering Updates:</strong> Note any new services or business model changes
                                </div>
                            </label>
                            <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                <input type="checkbox" className="mt-1 scale-125" />
                                <div className="flex-1 text-white/90">
                                    <strong>Team Expansion Tracking:</strong> Monitor hiring, partnerships, or capacity changes
                                </div>
                            </label>
                            <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                <input type="checkbox" className="mt-1 scale-125" />
                                <div className="flex-1 text-white/90">
                                    <strong>Client Feedback Gathering:</strong> Ask past prospects why they chose competitors
                                </div>
                            </label>
                            <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                <input type="checkbox" className="mt-1 scale-125" />
                                <div className="flex-1 text-white/90">
                                    <strong>Geographic Expansion Monitoring:</strong> Track any movement into new neighborhoods or price ranges
                                </div>
                            </label>
                            <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                <input type="checkbox" className="mt-1 scale-125" />
                                <div className="flex-1 text-white/90">
                                    <strong>Opportunity Identification:</strong> List 3 specific advantages you can leverage this month
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Competitive Response Strategies */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Competitive Response Strategies</h2>
                    <p className="text-white/90 mb-6">How to respond when competitors make aggressive moves in your market:</p>

                    <h3 className="text-xl font-bold text-[#00D4AA] mb-4">When Competitors Cut Commissions</h3>
                    <div className="bg-yellow-500/10 border-2 border-yellow-400 rounded-xl p-5 mb-6">
                        <div className="text-[#FFD700] font-bold mb-3">🎯 Commission Competition Response</div>
                        <div className="bg-white/5 p-4 rounded text-white/90">
                            <p className="font-bold mb-2"><strong>Don't:</strong> Match their pricing or criticize their strategy</p>
                            <p className="font-bold mb-3"><strong>Do:</strong> Reinforce your value proposition</p>
                            <p className="mt-3"><strong>Script:</strong><br />
                                "I know you might find agents offering lower commissions. Here's what I've learned: the commission rate matters less than the net amount you receive. My focus is on getting you the highest possible sale price, which typically more than makes up for any commission difference. Let me show you how my marketing and negotiation strategies typically result in 3-8% higher sale prices."</p>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#00D4AA] mb-4">When Competitors Launch Aggressive Marketing</h3>
                    <div className="bg-yellow-500/10 border-2 border-yellow-400 rounded-xl p-5 mb-6">
                        <div className="text-[#FFD700] font-bold mb-3">📢 Marketing War Response</div>
                        <div className="bg-white/5 p-4 rounded text-white/90">
                            <p className="font-bold mb-3"><strong>Strategy:</strong> Focus on results, not volume</p>
                            <p className="font-bold mb-3"><strong>Approach:</strong></p>
                            <ul className="list-disc ml-6">
                                <li>Highlight your marketing ROI vs. marketing spend</li>
                                <li>Show quality metrics (time on market, sale price)</li>
                                <li>Focus on targeted marketing vs. mass marketing</li>
                                <li>Emphasize personalized service over broad reach</li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#00D4AA] mb-4">When Competitors Expand Into Your Territory</h3>
                    <div className="bg-yellow-500/10 border-2 border-yellow-400 rounded-xl p-5">
                        <div className="text-[#FFD700] font-bold mb-3">🏠 Territory Defense Strategy</div>
                        <div className="bg-white/5 p-4 rounded text-white/90">
                            <p className="font-bold mb-3"><strong>Immediate Actions:</strong></p>
                            <ul className="list-disc ml-6 mb-4">
                                <li>Increase your presence in the threatened area</li>
                                <li>Contact past clients in that neighborhood</li>
                                <li>Host community events or open houses</li>
                                <li>Partner with local businesses</li>
                                <li>Emphasize your local expertise and relationships</li>
                            </ul>
                            <p className="mt-3"><strong>Long-term Strategy:</strong><br />
                                Create deeper community roots than they can quickly replicate.</p>
                        </div>
                    </div>
                </div>

                {/* Advanced Intelligence Techniques */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Advanced Intelligence Techniques</h2>

                    <h3 className="text-xl font-bold text-[#00D4AA] mb-4">The "Secret Shopper" Approach</h3>
                    <p className="text-white/90 mb-6">Ethical ways to experience competitor service firsthand:</p>
                    <div className="bg-white/10 p-6 rounded-xl mb-6">
                        <ul className="text-white/90 list-disc ml-6">
                            <li><strong>Attend their open houses</strong> as a potential buyer (be honest if asked directly)</li>
                            <li><strong>Request market reports</strong> from their websites using a personal email</li>
                            <li><strong>Follow their social media</strong> to understand their content strategy</li>
                            <li><strong>Ask friends to inquire</strong> about their services and report back</li>
                            <li><strong>Monitor their review responses</strong> to understand their customer service approach</li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-bold text-[#00D4AA] mb-4">Industry Network Intelligence</h3>
                    <p className="text-white/90 mb-6">Gather competitive intelligence through professional relationships:</p>
                    <div className="bg-white/10 p-6 rounded-xl mb-6">
                        <ul className="text-white/90 list-disc ml-6">
                            <li><strong>Lender relationships:</strong> Understand competitor financing strategies</li>
                            <li><strong>Title company insights:</strong> Learn about competitor transaction volumes</li>
                            <li><strong>Inspector feedback:</strong> Gather insights on competitor client management</li>
                            <li><strong>Photographer reports:</strong> Understand competitor marketing approaches</li>
                            <li><strong>Other agent conversations:</strong> Industry events and MLS meetings</li>
                        </ul>
                    </div>

                    <div className="bg-[#FF6B35]/10 border-2 border-[#FF6B35] rounded-xl p-5">
                        <p className="text-[#FF6B35] font-bold mb-2">⚠️ Ethical Boundaries:</p>
                        <p className="text-white/90">Never misrepresent yourself, use deceptive practices, or violate privacy. Competitive intelligence should be gathered through public information and legitimate business interactions only.</p>
                    </div>
                </div>

                {/* Turning Intelligence Into Action */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Turning Intelligence Into Action</h2>
                    <p className="text-white/90 mb-6">Convert competitive insights into concrete business strategies:</p>

                    <h3 className="text-xl font-bold text-[#00D4AA] mb-4">The Monthly Strategy Session</h3>
                    <div className="bg-[#00D4AA]/10 p-6 rounded-xl mb-6">
                        <h4 className="text-[#00D4AA] font-bold mb-3">Third Friday of Every Month (2 Hours)</h4>
                        <p className="font-bold mb-3"><strong>Agenda:</strong></p>
                        <ol className="list-decimal ml-6 text-white/90 mb-4">
                            <li><strong>Review competitive data</strong> from the past month</li>
                            <li><strong>Identify 3 opportunities</strong> based on competitor weaknesses</li>
                            <li><strong>Develop specific action plans</strong> to capitalize on opportunities</li>
                            <li><strong>Update positioning messages</strong> based on market changes</li>
                            <li><strong>Plan next month's intelligence gathering</strong> priorities</li>
                        </ol>
                        <p className="mt-3"><strong>Output:</strong> Written action plan with specific tactics and deadlines</p>
                    </div>

                    <h3 className="text-xl font-bold text-[#00D4AA] mb-4">Competitive Advantage Scorecard</h3>
                    <div className="bg-white text-[#1e3a5f] rounded-xl p-6">
                        <h4 className="text-[#1e3a5f] font-bold mb-4">Rate Yourself vs. Top Competitors (1-10 Scale)</h4>
                        <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                            <div className="font-bold">Category</div>
                            <div className="font-bold text-center">You</div>
                            <div className="font-bold text-center">Competitor A</div>
                            <div className="font-bold text-center">Gap</div>
                            <div>Marketing Quality</div>
                            <div className="text-center">8</div>
                            <div className="text-center">6</div>
                            <div className="text-center text-[#00D4AA]">+2</div>
                            <div>Response Speed</div>
                            <div className="text-center">9</div>
                            <div className="text-center">7</div>
                            <div className="text-center text-[#00D4AA]">+2</div>
                            <div>Pricing Accuracy</div>
                            <div className="text-center">7</div>
                            <div className="text-center">9</div>
                            <div className="text-center text-[#FF6B35]">-2</div>
                            <div>Technology Use</div>
                            <div className="text-center">8</div>
                            <div className="text-center">5</div>
                            <div className="text-center text-[#00D4AA]">+3</div>
                            <div>Market Knowledge</div>
                            <div className="text-center">6</div>
                            <div className="text-center">9</div>
                            <div className="text-center text-[#FF6B35]">-3</div>
                        </div>
                        <p className="mt-3 text-[#FF6B35]"><strong>Focus Areas:</strong> Improve pricing accuracy and deepen market knowledge to eliminate competitive disadvantages.</p>
                    </div>
                </div>

                {/* Long-Term Competitive Strategy */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Long-Term Competitive Strategy</h2>
                    <p className="text-white/90 mb-6">Build sustainable competitive advantages that are difficult to replicate:</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#00D4AA]/10 p-6 rounded-xl">
                            <h4 className="text-[#00D4AA] font-bold mb-3">Relationship Moats</h4>
                            <ul className="text-white/90 list-disc ml-6">
                                <li>Deep community involvement</li>
                                <li>Exclusive professional partnerships</li>
                                <li>Multi-generational client relationships</li>
                                <li>Industry leadership positions</li>
                            </ul>
                        </div>
                        <div className="bg-yellow-500/10 p-6 rounded-xl">
                            <h4 className="text-[#FFD700] font-bold mb-3">Knowledge Moats</h4>
                            <ul className="text-white/90 list-disc ml-6">
                                <li>Specialized market expertise</li>
                                <li>Proprietary data analysis</li>
                                <li>Advanced technology systems</li>
                                <li>Continuous education and certification</li>
                            </ul>
                        </div>
                        <div className="bg-[#FF6B35]/10 p-6 rounded-xl">
                            <h4 className="text-[#FF6B35] font-bold mb-3">System Moats</h4>
                            <ul className="text-white/90 list-disc ml-6">
                                <li>Proven process methodologies</li>
                                <li>Team specialization</li>
                                <li>Scalable service delivery</li>
                                <li>Quality consistency</li>
                            </ul>
                        </div>
                        <div className="bg-[#00D4AA]/10 p-6 rounded-xl">
                            <h4 className="text-[#00D4AA] font-bold mb-3">Brand Moats</h4>
                            <ul className="text-white/90 list-disc ml-6">
                                <li>Strong reputation and recognition</li>
                                <li>Consistent market presence</li>
                                <li>Thought leadership content</li>
                                <li>Community brand association</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompetitiveIntelligence;
