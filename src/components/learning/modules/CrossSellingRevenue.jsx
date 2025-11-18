import React, { useState } from 'react';

const CrossSellingRevenue = () => {
    const [revenueData, setRevenueData] = useState({
        annualTransactions: '',
        avgCommission: '',
        pastClients: '',
        participationRate: '',
        avgCrossSell: '',
        timeline: ''
    });
    const [revenueResult, setRevenueResult] = useState(null);

    const calculateRevenue = () => {
        const transactions = parseFloat(revenueData.annualTransactions) || 0;
        const avgCommission = parseFloat(revenueData.avgCommission) || 0;
        const pastClients = parseFloat(revenueData.pastClients) || 0;
        const participationRate = parseFloat(revenueData.participationRate) || 0;
        const avgCrossSell = parseFloat(revenueData.avgCrossSell) || 0;
        const timeline = parseFloat(revenueData.timeline) || 12;

        if (transactions === 0 || avgCommission === 0) {
            alert('Please enter your transaction volume and commission data.');
            return;
        }

        // Calculate current annual revenue
        const currentRevenue = transactions * avgCommission;

        // Calculate cross-sell potential
        const totalClientBase = pastClients + transactions; // Include new clients
        const participatingClients = Math.round(totalClientBase * (participationRate / 100));
        const annualCrossSellRevenue = participatingClients * avgCrossSell;

        // Calculate implementation timeline effects
        const monthlyRampUp = annualCrossSellRevenue / 12;
        const timelineRevenue = (monthlyRampUp * timeline * (timeline + 1)) / 24; // Gradual ramp

        // Calculate percentage increase
        const revenueIncrease = (annualCrossSellRevenue / currentRevenue * 100);

        let strategy = '';
        let priority = '';

        if (participationRate < 25) {
            strategy = 'Focus on building stronger client relationships before introducing services';
            priority = 'Relationship deepening and trust building';
        } else if (participationRate < 40) {
            strategy = 'Good foundation - expand service offerings and improve presentation';
            priority = 'Service diversification and partner development';
        } else {
            strategy = 'Strong participation - optimize highest-value services and scale';
            priority = 'Revenue maximization and systematic expansion';
        }

        setRevenueResult({
            currentRevenue,
            annualCrossSellRevenue,
            revenueIncrease: revenueIncrease.toFixed(1),
            participatingClients,
            totalClientBase,
            timelineRevenue,
            strategy,
            priority
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">💰 Cross-Selling Additional Revenue Streams</h1>
                <p className="text-xl text-purple-100">
                    Property management referrals, investment consulting, relocation services, and ancillary partnerships that multiply your income per client.
                </p>
                <div className="mt-4 bg-purple-500/30 px-4 py-2 rounded-full inline-block">
                    <span className="text-white font-semibold">19 min read • Pro Plan</span>
                </div>
            </div> */}

            <div className="space-y-8">
                <div className="bg-white/10 rounded-xl p-6">
                    <div className="bg-gradient-to-r from-[#00D4AA] to-[#00B894] rounded-2xl p-6 mb-6 text-center">
                        <p className="text-white text-xl font-bold">Agents with diversified revenue streams earn 180% more per client relationship</p>
                    </div>

                    <p className="text-white/90 mb-6">
                        Most agents think their job ends when the transaction closes. But the smartest agents know that closing day is actually the beginning of a longer, more profitable relationship.
                    </p>

                    <p className="text-white/90 mb-6">
                        Every client you serve has ongoing real estate-related needs beyond just buying and selling. They need property management, investment advice, relocation assistance, and dozens of other services. The question isn't whether these opportunities exist—it's whether you're positioned to capture the revenue they generate.
                    </p>

                    <div className="grid md:grid-cols-5 gap-4 mb-8">
                        <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 text-center">
                            <div className="bg-[#00D4AA] text-[#1e3a5f] w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-2 text-sm">1</div>
                            <h4 className="font-bold text-[#00D4AA] mb-2">Identify</h4>
                            <p className="text-sm text-white/80">Map client needs beyond transactions</p>
                        </div>
                        <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 text-center">
                            <div className="bg-[#00D4AA] text-[#1e3a5f] w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-2 text-sm">2</div>
                            <h4 className="font-bold text-[#00D4AA] mb-2">Partner</h4>
                            <p className="text-sm text-white/80">Build revenue-sharing relationships</p>
                        </div>
                        <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 text-center">
                            <div className="bg-[#00D4AA] text-[#1e3a5f] w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-2 text-sm">3</div>
                            <h4 className="font-bold text-[#00D4AA] mb-2">Position</h4>
                            <p className="text-sm text-white/80">Become the trusted advisor for all needs</p>
                        </div>
                        <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 text-center">
                            <div className="bg-[#00D4AA] text-[#1e3a5f] w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-2 text-sm">4</div>
                            <h4 className="font-bold text-[#00D4AA] mb-2">Present</h4>
                            <p className="text-sm text-white/80">Introduce services naturally</p>
                        </div>
                        <div className="bg-[#00D4AA]/20 border-2 border-[#00D4AA] rounded-lg p-4 text-center">
                            <div className="bg-[#00D4AA] text-[#1e3a5f] w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-2 text-sm">5</div>
                            <h4 className="font-bold text-[#00D4AA] mb-2">Profit</h4>
                            <p className="text-sm text-white/80">Generate recurring revenue streams</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">High-Revenue Cross-Sell Opportunities</h2>
                    <p className="text-white/90 mb-6">These services generate the highest returns and strongest client relationships:</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/10 border-3 border-yellow-500 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-2">Property Management Referrals</h3>
                            <p className="text-white/80 mb-3"><strong>Revenue Potential:</strong> $2,000-8,000/year per property</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li><strong>Target Clients:</strong> Investors, relocating owners, inherited properties</li>
                                <li><strong>Commission Split:</strong> 20-50% of monthly fees</li>
                                <li><strong>Timing:</strong> During purchase or before relocation</li>
                                <li><strong>Value Add:</strong> Passive income protection for owners</li>
                            </ul>
                            <p className="text-white/80"><strong>Approach:</strong> "Have you considered the rental potential of your current home?"</p>
                        </div>

                        <div className="bg-white/10 border-3 border-yellow-500 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-2">Mortgage & Refinance Services</h3>
                            <p className="text-white/80 mb-3"><strong>Revenue Potential:</strong> $500-2,500 per loan</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li><strong>Target Clients:</strong> Recent buyers, rate-sensitive owners</li>
                                <li><strong>Commission Split:</strong> 25-50% of loan officer fee</li>
                                <li><strong>Timing:</strong> Rate changes, equity buildup, major purchases</li>
                                <li><strong>Value Add:</strong> Ongoing financial optimization</li>
                            </ul>
                            <p className="text-white/80"><strong>Approach:</strong> "Let me analyze your current loan terms vs. today's market."</p>
                        </div>

                        <div className="bg-white/10 border-3 border-yellow-500 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-2">Real Estate Investment Consulting</h3>
                            <p className="text-white/80 mb-3"><strong>Revenue Potential:</strong> $5,000-25,000 per project</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li><strong>Target Clients:</strong> High-income earners, business owners</li>
                                <li><strong>Commission Split:</strong> Direct consulting fees</li>
                                <li><strong>Timing:</strong> Tax planning seasons, market opportunities</li>
                                <li><strong>Value Add:</strong> Wealth building through real estate</li>
                            </ul>
                            <p className="text-white/80"><strong>Approach:</strong> "Have you explored real estate as part of your investment portfolio?"</p>
                        </div>

                        <div className="bg-white/10 border-3 border-yellow-500 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-2">Relocation Services</h3>
                            <p className="text-white/80 mb-3"><strong>Revenue Potential:</strong> $3,000-15,000 per relocation</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li><strong>Target Clients:</strong> Corporate employees, military families</li>
                                <li><strong>Commission Split:</strong> Referral fees from destination agents</li>
                                <li><strong>Timing:</strong> Job changes, life transitions</li>
                                <li><strong>Value Add:</strong> Stress-free moving coordination</li>
                            </ul>
                            <p className="text-white/80"><strong>Approach:</strong> "If your job ever takes you elsewhere, I have trusted partners nationwide."</p>
                        </div>

                        <div className="bg-white/10 border-3 border-yellow-500 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-2">Insurance & Protection Services</h3>
                            <p className="text-white/80 mb-3"><strong>Revenue Potential:</strong> $200-1,500 per policy annually</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li><strong>Target Clients:</strong> All homeowners and investors</li>
                                <li><strong>Commission Split:</strong> 10-30% of annual premiums</li>
                                <li><strong>Timing:</strong> Purchase, policy renewals, life changes</li>
                                <li><strong>Value Add:</strong> Asset protection optimization</li>
                            </ul>
                            <p className="text-white/80"><strong>Approach:</strong> "Let me connect you with someone who can optimize your coverage."</p>
                        </div>

                        <div className="bg-white/10 border-3 border-yellow-500 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-2">Home Services & Maintenance</h3>
                            <p className="text-white/80 mb-3"><strong>Revenue Potential:</strong> $500-5,000 per project</p>
                            <ul className="text-white/80 ml-5 mb-3">
                                <li><strong>Target Clients:</strong> New homeowners, sellers preparing to list</li>
                                <li><strong>Commission Split:</strong> 5-15% of project costs</li>
                                <li><strong>Timing:</strong> Post-closing, pre-listing, seasonal maintenance</li>
                                <li><strong>Value Add:</strong> Trusted contractor network</li>
                            </ul>
                            <p className="text-white/80"><strong>Approach:</strong> "I work with the best contractors in town for any home improvements."</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Revenue Potential Calculator</h2>
                    <p className="text-white/90 mb-4">Calculate the income potential of adding cross-sell services to your business:</p>

                    <div className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-orange-400 mb-4">💡 Cross-Sell Revenue Calculator</h3>
                        <p className="text-white/90 mb-4">Enter your current business metrics to see revenue expansion potential:</p>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block mb-2 font-bold text-white">Annual Transactions Closed:</label>
                                <input
                                    type="number"
                                    placeholder="24"
                                    value={revenueData.annualTransactions}
                                    onChange={(e) => setRevenueData({ ...revenueData, annualTransactions: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />

                                <label className="block mb-2 font-bold text-white mt-4">Average Commission per Transaction:</label>
                                <input
                                    type="number"
                                    placeholder="8000"
                                    value={revenueData.avgCommission}
                                    onChange={(e) => setRevenueData({ ...revenueData, avgCommission: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />

                                <label className="block mb-2 font-bold text-white mt-4">Past Clients in Database:</label>
                                <input
                                    type="number"
                                    placeholder="150"
                                    value={revenueData.pastClients}
                                    onChange={(e) => setRevenueData({ ...revenueData, pastClients: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-bold text-white">Cross-Sell Participation Rate (%):</label>
                                <input
                                    type="number"
                                    placeholder="35"
                                    max="100"
                                    value={revenueData.participationRate}
                                    onChange={(e) => setRevenueData({ ...revenueData, participationRate: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />

                                <label className="block mb-2 font-bold text-white mt-4">Average Cross-Sell Revenue per Client:</label>
                                <input
                                    type="number"
                                    placeholder="2500"
                                    value={revenueData.avgCrossSell}
                                    onChange={(e) => setRevenueData({ ...revenueData, avgCrossSell: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />

                                <label className="block mb-2 font-bold text-white mt-4">Implementation Timeline (months):</label>
                                <input
                                    type="number"
                                    placeholder="6"
                                    value={revenueData.timeline}
                                    onChange={(e) => setRevenueData({ ...revenueData, timeline: e.target.value })}
                                    className="w-full p-3 border-2 border-purple-500 rounded-lg bg-white/15 text-white"
                                />
                            </div>
                        </div>

                        <button
                            onClick={calculateRevenue}
                            className="w-full bg-[#00D4AA] text-[#1e3a5f] py-3 px-6 rounded-lg font-bold hover:bg-[#00B894] transition-colors"
                        >
                            Calculate Revenue Expansion Potential
                        </button>

                        {revenueResult && (
                            <div className="mt-6 space-y-4">
                                <div className="bg-[#00D4AA]/20 p-5 rounded-lg">
                                    <div className="text-white">
                                        <strong>💰 Revenue Expansion Analysis:</strong><br />
                                        <strong>Current Annual Revenue:</strong> ${revenueResult.currentRevenue.toLocaleString()}<br />
                                        <strong>Projected Cross-Sell Revenue:</strong> ${revenueResult.annualCrossSellRevenue.toLocaleString()} annually<br />
                                        <strong>Revenue Increase:</strong> {revenueResult.revenueIncrease}% above current income<br />
                                        <strong>Participating Clients:</strong> {revenueResult.participatingClients} out of {revenueResult.totalClientBase} total
                                    </div>
                                </div>
                                <div className="bg-yellow-500/20 p-5 rounded-lg">
                                    <div className="text-white">
                                        <strong>📋 Implementation Strategy:</strong><br />
                                        <strong>Timeline Revenue:</strong> ${revenueResult.timelineRevenue.toLocaleString()} in first {revenueData.timeline} months<br />
                                        <strong>Strategy Focus:</strong> {revenueResult.strategy}<br />
                                        <strong>Priority Area:</strong> {revenueResult.priority}<br />
                                        <strong>Next Steps:</strong> Start with highest-value clients and most natural service fit
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">🎯 Key Takeaway</h2>
                    <p className="text-green-100 text-lg">
                        Top agents generate 40-60% of their income from non-commission sources. The key is building systematic relationships and offering genuine value that enhances the client experience.
                    </p>
                </div>

                {/* Strategic Partnership Development */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Strategic Partnership Development</h2>
                    <p className="text-white/90 mb-6">Build revenue-sharing partnerships that benefit both parties and clients:</p>

                    <div className="bg-yellow-500/10 border-2 border-yellow-400 rounded-xl p-5 mb-5">
                        <div className="text-[#FFD700] font-bold mb-3">Property Management Partnership Structure</div>
                        <div className="bg-white/5 p-4 rounded text-white/90">
                            <p className="font-bold mb-2">Partnership Terms:</p>
                            <ul className="list-disc ml-6 mb-3">
                                <li>25% ongoing commission split on monthly management fees</li>
                                <li>$500 flat fee for each successful referral placement</li>
                                <li>Priority handling for your client referrals</li>
                                <li>Monthly performance reports on managed properties</li>
                                <li>Co-marketing opportunities for investment properties</li>
                            </ul>
                            <p className="mt-3"><strong>Client Value Proposition:</strong><br />
                                "I've partnered with the top property management company in town to ensure your investment property is professionally managed. You'll receive monthly reports, guaranteed rent collection, and maintenance coordination—all while I stay involved to protect your interests."</p>
                        </div>
                    </div>

                    <div className="bg-yellow-500/10 border-2 border-yellow-400 rounded-xl p-5 mb-5">
                        <div className="text-[#FFD700] font-bold mb-3">Mortgage Referral Partnership Structure</div>
                        <div className="bg-white/5 p-4 rounded text-white/90">
                            <p className="font-bold mb-2">Partnership Terms:</p>
                            <ul className="list-disc ml-6 mb-3">
                                <li>50% split of loan officer commission on referrals</li>
                                <li>Guaranteed 48-hour response time for your clients</li>
                                <li>Quarterly rate review service for past clients</li>
                                <li>Co-branded marketing materials</li>
                                <li>Joint educational seminars on financing topics</li>
                            </ul>
                            <p className="mt-3"><strong>Client Value Proposition:</strong><br />
                                "I work exclusively with [Lender Name] because they provide the same level of service I do. They'll not only handle your current loan but also monitor rates to ensure you're always getting the best terms available."</p>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#00D4AA] mb-4">Cross-Sell Timing Matrix</h3>
                    <div className="bg-white text-[#1e3a5f] rounded-xl p-6">
                        <h3 className="text-2xl font-bold mb-4">When to Introduce Each Service</h3>
                        <div className="grid grid-cols-5 gap-2 mb-4">
                            <div className="bg-[#1e3a5f] text-white p-3 text-center font-bold rounded">Service</div>
                            <div className="bg-[#1e3a5f] text-white p-3 text-center font-bold rounded">During Transaction</div>
                            <div className="bg-[#1e3a5f] text-white p-3 text-center font-bold rounded">At Closing</div>
                            <div className="bg-[#1e3a5f] text-white p-3 text-center font-bold rounded">30 Days Post</div>
                            <div className="bg-[#1e3a5f] text-white p-3 text-center font-bold rounded">Quarterly</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded"><strong>Property Management</strong></div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">If buying investment</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Mention for future</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">If relocating</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Portfolio review</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded"><strong>Refinancing</strong></div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Rate comparison</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Future rate monitoring</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Rate check offer</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Market updates</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded"><strong>Investment Consulting</strong></div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">If qualified buyer</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Portfolio discussion</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Market opportunities</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Investment reviews</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded"><strong>Insurance Review</strong></div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Coverage requirements</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Policy optimization</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Coverage adequacy</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Annual reviews</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded"><strong>Home Services</strong></div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Inspection items</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Contractor list</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Maintenance plan</div>
                            <div className="bg-[#00D4AA]/10 p-3 text-center rounded">Seasonal services</div>
                        </div>
                        <div className="mt-4 bg-[#00D4AA]/10 p-4 rounded text-[#1e3a5f]">
                            <p className="font-bold">Key Principle: Never make cross-selling feel salesy. Position all services as value-adds that benefit the client's long-term real estate success.</p>
                        </div>
                    </div>
                </div>

                {/* Natural Introduction Scripts */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Natural Introduction Scripts</h2>
                    <p className="text-white/90 mb-6">How to present additional services without seeming pushy:</p>

                    <div className="bg-yellow-500/10 border-2 border-yellow-400 rounded-xl p-5 mb-5">
                        <div className="text-[#FFD700] font-bold mb-3">Property Management Introduction</div>
                        <div className="bg-white/5 p-4 rounded text-white/90">
                            <p className="font-bold mb-2">During Purchase:</p>
                            <p>"This property has great rental potential if your situation ever changes. I work with a property management company that specializes in this area—they typically get 15-20% higher rents than average because of their marketing and tenant screening process."</p>
                            <p className="mt-3 font-bold">When Relocating:</p>
                            <p>"Have you considered keeping this house as a rental? The market fundamentals are strong here, and I have a property management partner who can handle everything. Many of my clients have built significant wealth this way."</p>
                        </div>
                    </div>

                    <div className="bg-yellow-500/10 border-2 border-yellow-400 rounded-xl p-5 mb-5">
                        <div className="text-[#FFD700] font-bold mb-3">Investment Consulting Introduction</div>
                        <div className="bg-white/5 p-4 rounded text-white/90">
                            <p className="font-bold mb-2">High-Income Clients:</p>
                            <p>"Now that you've secured your primary residence, have you explored real estate as part of your investment portfolio? I work with clients to identify cash-flowing properties and development opportunities."</p>
                            <p className="mt-3 font-bold">Tax Season Timing:</p>
                            <p>"Are you looking for additional tax advantages this year? Real estate investment offers several benefits that might complement your other investments. I'd be happy to show you some properties that fit your financial profile."</p>
                        </div>
                    </div>

                    <div className="bg-yellow-500/10 border-2 border-yellow-400 rounded-xl p-5">
                        <div className="text-[#FFD700] font-bold mb-3">Refinancing Introduction</div>
                        <div className="bg-white/5 p-4 rounded text-white/90">
                            <p className="font-bold mb-2">Rate Changes:</p>
                            <p>"With rates moving the way they have, it might make sense to review your current loan terms. I work with a lender who specializes in optimization—they can run the numbers to see if refinancing makes sense."</p>
                            <p className="mt-3 font-bold">Equity Building:</p>
                            <p>"Your home's appreciated nicely since you bought it. That equity could potentially help you secure better loan terms or fund other investments. Want me to have my lender partner run some scenarios?"</p>
                        </div>
                    </div>
                </div>

                {/* Revenue Share Structures */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Revenue Share Structures</h2>
                    <p className="text-white/90 mb-6">Fair and sustainable partnership models that benefit everyone:</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white/10 p-6 rounded-xl border-2 border-[#00D4AA]">
                            <h4 className="text-[#00D4AA] font-bold mb-3">Referral-Based Model</h4>
                            <ul className="text-white/90 list-disc ml-6 mb-3">
                                <li><strong>Property Management:</strong> 20-30% of monthly fees</li>
                                <li><strong>Mortgage Services:</strong> $300-800 per loan</li>
                                <li><strong>Insurance Policies:</strong> 10-25% of annual premium</li>
                                <li><strong>Home Services:</strong> 5-15% of project cost</li>
                            </ul>
                            <p className="mt-3"><strong>Pros:</strong> Simple tracking, immediate payment, easy to calculate</p>
                            <p><strong>Cons:</strong> One-time payments for ongoing relationships</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl border-2 border-[#00D4AA]">
                            <h4 className="text-[#00D4AA] font-bold mb-3">Revenue-Sharing Model</h4>
                            <ul className="text-white/90 list-disc ml-6 mb-3">
                                <li><strong>Property Management:</strong> 25% ongoing split</li>
                                <li><strong>Investment Consulting:</strong> 30-50% of fees</li>
                                <li><strong>Insurance Services:</strong> 20% ongoing premiums</li>
                                <li><strong>Mortgage Services:</strong> 40% of loan officer fee</li>
                            </ul>
                            <p className="mt-3"><strong>Pros:</strong> Ongoing income, aligned incentives, deeper partnerships</p>
                            <p><strong>Cons:</strong> More complex tracking, delayed payments</p>
                        </div>
                    </div>

                    <div className="bg-[#FF6B35]/20 border-2 border-[#FF6B35] rounded-xl p-5">
                        <div className="text-[#FF6B35] font-bold mb-3">⚠️ Legal and Compliance Considerations</div>
                        <ul className="text-white/90 list-disc ml-6">
                            <li><strong>RESPA Compliance:</strong> Ensure all referral arrangements comply with Real Estate Settlement Procedures Act</li>
                            <li><strong>State Licensing:</strong> Some services may require additional licenses in your state</li>
                            <li><strong>Disclosure Requirements:</strong> Always disclose financial relationships to clients</li>
                            <li><strong>Written Agreements:</strong> Document all partnership terms and fee structures</li>
                            <li><strong>Insurance Coverage:</strong> Verify your E&O policy covers referral activities</li>
                        </ul>
                    </div>
                </div>

                {/* Implementation Action Plan */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Implementation Action Plan</h2>
                    <p className="text-white/90 mb-6">Your 90-day roadmap to building multiple revenue streams:</p>

                    {[
                        { title: 'Phase 1: Foundation (Days 1-30)', color: 'orange' },
                        { title: 'Phase 2: Partnership Development (Days 31-60)', color: 'orange' },
                        { title: 'Phase 3: Launch and Optimization (Days 61-90)', color: 'orange' }
                    ].map((phase, idx) => (
                        <div key={idx} className="bg-[#FF6B35]/10 border-2 border-[#FF6B35] rounded-xl p-6 mt-6">
                            <h3 className="text-[#FF6B35] font-bold text-xl mb-4">{phase.title}</h3>
                            <div className="space-y-3">
                                <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                    <input type="checkbox" className="mt-1 scale-125" />
                                    <div className="flex-1 text-white/90">
                                        <strong>Service Audit:</strong> List all services your current clients might need beyond transactions
                                    </div>
                                </label>
                                <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                    <input type="checkbox" className="mt-1 scale-125" />
                                    <div className="flex-1 text-white/90">
                                        <strong>Partner Research:</strong> Identify 3-5 potential partners in each high-value service area
                                    </div>
                                </label>
                                <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                    <input type="checkbox" className="mt-1 scale-125" />
                                    <div className="flex-1 text-white/90">
                                        <strong>Legal Review:</strong> Consult attorney about compliance requirements and partnership structures
                                    </div>
                                </label>
                                <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                    <input type="checkbox" className="mt-1 scale-125" />
                                    <div className="flex-1 text-white/90">
                                        <strong>Client Database Analysis:</strong> Identify past clients who might benefit from additional services
                                    </div>
                                </label>
                                <label className="flex items-start gap-3 p-4 rounded bg-white/10 hover:bg-white/15 transition">
                                    <input type="checkbox" className="mt-1 scale-125" />
                                    <div className="flex-1 text-white/90">
                                        <strong>Revenue Projections:</strong> Calculate potential income from each service stream
                                    </div>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Advanced Cross-Selling Strategies */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Advanced Cross-Selling Strategies</h2>

                    <h3 className="text-xl font-bold text-[#00D4AA] mb-4">The Client Journey Revenue Map</h3>
                    <p className="text-white/90 mb-6">Identify every touchpoint where additional services create value:</p>

                    <div className="bg-white/10 p-6 rounded-xl mb-6">
                        <h4 className="text-[#FFD700] font-bold mb-3">Pre-Purchase Phase</h4>
                        <ul className="text-white/90 list-disc ml-6 mb-4">
                            <li><strong>Pre-approval:</strong> Loan optimization and rate shopping</li>
                            <li><strong>House hunting:</strong> Investment property identification</li>
                            <li><strong>Offer preparation:</strong> Insurance quoting for accurate budgeting</li>
                        </ul>
                        <h4 className="text-[#FFD700] font-bold mb-3">Transaction Phase</h4>
                        <ul className="text-white/90 list-disc ml-6 mb-4">
                            <li><strong>Under contract:</strong> Home warranty and protection plans</li>
                            <li><strong>Inspection period:</strong> Contractor network for repairs/improvements</li>
                            <li><strong>Appraisal:</strong> Property management evaluation for rental potential</li>
                        </ul>
                        <h4 className="text-[#FFD700] font-bold mb-3">Post-Closing Phase</h4>
                        <ul className="text-white/90 list-disc ml-6">
                            <li><strong>Month 1:</strong> Home services and maintenance planning</li>
                            <li><strong>Month 3:</strong> Insurance review and optimization</li>
                            <li><strong>Month 6:</strong> Refinancing analysis and investment planning</li>
                            <li><strong>Annual:</strong> Portfolio review and market opportunity assessment</li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-bold text-[#00D4AA] mb-4">The High-Value Client Focus</h3>
                    <p className="text-white/90 mb-6">Prioritize cross-selling efforts based on client lifetime value potential:</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-[#FF6B35]/10 p-6 rounded-xl text-center">
                            <h4 className="text-[#FF6B35] font-bold mb-3">Tier 1: Premium Clients</h4>
                            <p className="text-sm mb-2"><strong>Profile:</strong> $500K+ transactions, multiple properties, high income</p>
                            <p className="text-sm mb-2"><strong>Focus:</strong> Investment consulting, property management, wealth services</p>
                            <p className="text-sm"><strong>Revenue Potential:</strong> $10K-50K annually</p>
                        </div>
                        <div className="bg-yellow-500/10 p-6 rounded-xl text-center">
                            <h4 className="text-[#FFD700] font-bold mb-3">Tier 2: Core Clients</h4>
                            <p className="text-sm mb-2"><strong>Profile:</strong> $200-500K transactions, stable income, growth potential</p>
                            <p className="text-sm mb-2"><strong>Focus:</strong> Refinancing, insurance, home services</p>
                            <p className="text-sm"><strong>Revenue Potential:</strong> $2K-8K annually</p>
                        </div>
                        <div className="bg-[#00D4AA]/10 p-6 rounded-xl text-center">
                            <h4 className="text-[#00D4AA] font-bold mb-3">Tier 3: Standard Clients</h4>
                            <p className="text-sm mb-2"><strong>Profile:</strong> Under $200K transactions, first-time buyers</p>
                            <p className="text-sm mb-2"><strong>Focus:</strong> Basic insurance, maintenance referrals</p>
                            <p className="text-sm"><strong>Revenue Potential:</strong> $500-2K annually</p>
                        </div>
                    </div>
                </div>

                {/* Measuring Cross-Sell Success */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Measuring Cross-Sell Success</h2>
                    <p className="text-white/90 mb-6">Track these metrics to optimize your additional revenue streams:</p>

                    <div className="bg-white text-[#1e3a5f] rounded-xl p-6">
                        <h3 className="text-2xl font-bold mb-4">Cross-Sell Performance Dashboard</h3>
                        <div className="grid md:grid-cols-4 gap-6 mb-6">
                            <div className="text-center p-5 bg-[#00D4AA]/10 rounded">
                                <div className="text-3xl font-bold text-[#00D4AA]">43%</div>
                                <div className="text-sm text-[#333]">Client Participation Rate</div>
                            </div>
                            <div className="text-center p-5 bg-yellow-500/10 rounded">
                                <div className="text-3xl font-bold text-[#FFD700]">$3,200</div>
                                <div className="text-sm text-[#333]">Avg Additional Revenue</div>
                            </div>
                            <div className="text-center p-5 bg-[#FF6B35]/10 rounded">
                                <div className="text-3xl font-bold text-[#FF6B35]">2.7</div>
                                <div className="text-sm text-[#333]">Services per Client</div>
                            </div>
                            <div className="text-center p-5 bg-[#00D4AA]/10 rounded">
                                <div className="text-3xl font-bold text-[#00D4AA]">$76K</div>
                                <div className="text-sm text-[#333]">Annual Cross-Sell Income</div>
                            </div>
                        </div>
                        <div className="bg-[#00D4AA]/10 p-5 rounded">
                            <h4 className="text-[#00D4AA] font-bold mb-3">Success Benchmarks:</h4>
                            <ul className="list-disc ml-6 text-[#1e3a5f]">
                                <li><strong>Participation rate above 35%:</strong> Good client receptivity to additional services</li>
                                <li><strong>Average revenue over $2,500:</strong> Effective service mix and pricing</li>
                                <li><strong>Multiple services per client:</strong> Strong trusted advisor positioning</li>
                                <li><strong>Growing annual income:</strong> Compound effect of relationship building</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Common Cross-Selling Mistakes */}
                <div className="bg-white/10 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-[#00D4AA] mb-4">Common Cross-Selling Mistakes</h2>
                    <div className="space-y-4">
                        <div className="bg-[#FF6B35]/20 border-2 border-[#FF6B35] rounded-xl p-5">
                            <div className="text-[#FF6B35] font-bold mb-2">❌ The "Too Early" Mistake</div>
                            <p className="text-white/90 mb-2"><strong>Error:</strong> Presenting services before establishing trust and credibility</p>
                            <p className="text-white/90"><strong>Fix:</strong> Focus on transaction excellence first, then introduce additional services naturally</p>
                        </div>
                        <div className="bg-[#FF6B35]/20 border-2 border-[#FF6B35] rounded-xl p-5">
                            <div className="text-[#FF6B35] font-bold mb-2">❌ The "Sales Pitch" Mistake</div>
                            <p className="text-white/90 mb-2"><strong>Error:</strong> Making additional services feel like sales presentations</p>
                            <p className="text-white/90"><strong>Fix:</strong> Position services as solutions to problems clients actually have</p>
                        </div>
                        <div className="bg-[#FF6B35]/20 border-2 border-[#FF6B35] rounded-xl p-5">
                            <div className="text-[#FF6B35] font-bold mb-2">❌ The "Poor Partner" Mistake</div>
                            <p className="text-white/90 mb-2"><strong>Error:</strong> Referring to partners who don't meet your service standards</p>
                            <p className="text-white/90"><strong>Fix:</strong> Thoroughly vet all partners and monitor client satisfaction continuously</p>
                        </div>
                        <div className="bg-[#FF6B35]/20 border-2 border-[#FF6B35] rounded-xl p-5">
                            <div className="text-[#FF6B35] font-bold mb-2">❌ The "One-Size-Fits-All" Mistake</div>
                            <p className="text-white/90 mb-2"><strong>Error:</strong> Offering the same services to every client regardless of their situation</p>
                            <p className="text-white/90"><strong>Fix:</strong> Customize service recommendations based on client needs and profile</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrossSellingRevenue;

