import React from 'react';

const LuxuryMarketingGuide = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-8 border border-purple-500/30">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                        💎
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Luxury Home Marketing Guide</h1>
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full inline-block font-semibold">
                        GUIDE
                    </div>
                    <p className="text-gray-300 mt-4 text-lg">
                        Advanced marketing strategies for high-end properties including professional photography requirements, luxury staging tips, and affluent buyer targeting.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="bg-white/10 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-green-400 mb-6">Luxury Marketing Strategy</h2>
                        <p className="text-gray-300 mb-6">Marketing luxury properties requires a different approach than traditional homes. Focus on exclusivity, lifestyle, and emotional connection.</p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/5 border-2 border-transparent hover:border-yellow-500 rounded-xl p-6 transition-all hover:-translate-y-1">
                                <h3 className="text-yellow-400 text-xl font-bold mb-4">Exclusivity & Scarcity</h3>
                                <p className="text-gray-300">Create sense of exclusivity through private showings, invitation-only events, and limited marketing exposure to select audiences.</p>
                            </div>

                            <div className="bg-white/5 border-2 border-transparent hover:border-yellow-500 rounded-xl p-6 transition-all hover:-translate-y-1">
                                <h3 className="text-yellow-400 text-xl font-bold mb-4">Lifestyle Marketing</h3>
                                <p className="text-gray-300">Sell the lifestyle and experience, not just the house. Emphasize prestige, privacy, and unique amenities that enhance daily life.</p>
                            </div>

                            <div className="bg-white/5 border-2 border-transparent hover:border-yellow-500 rounded-xl p-6 transition-all hover:-translate-y-1">
                                <h3 className="text-yellow-400 text-xl font-bold mb-4">Quality Over Quantity</h3>
                                <p className="text-gray-300">Target fewer, highly qualified prospects rather than mass market exposure. Focus on high-net-worth individuals and their networks.</p>
                            </div>

                            <div className="bg-white/5 border-2 border-transparent hover:border-yellow-500 rounded-xl p-6 transition-all hover:-translate-y-1">
                                <h3 className="text-yellow-400 text-xl font-bold mb-4">White Glove Service</h3>
                                <p className="text-gray-300">Provide exceptional service throughout the process. Luxury buyers expect personalized attention and seamless experiences.</p>
                            </div>

                            <div className="bg-white/5 border-2 border-transparent hover:border-yellow-500 rounded-xl p-6 transition-all hover:-translate-y-1">
                                <h3 className="text-yellow-400 text-xl font-bold mb-4">Network & Relationships</h3>
                                <p className="text-gray-300">Leverage relationships with other luxury agents, wealth managers, private bankers, and high-end service providers.</p>
                            </div>

                            <div className="bg-white/5 border-2 border-transparent hover:border-yellow-500 rounded-xl p-6 transition-all hover:-translate-y-1">
                                <h3 className="text-yellow-400 text-xl font-bold mb-4">Discretion & Privacy</h3>
                                <p className="text-gray-300">Many luxury buyers value privacy. Offer confidential showings and be prepared to market "off-market" when appropriate.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-green-400 mb-6">Professional Photography & Media Requirements</h2>
                        <p className="text-gray-300 mb-6">Luxury properties demand the highest quality visual presentation across all marketing channels.</p>

                        <div className="space-y-4">
                            <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                <div className="text-gray-300">
                                    <strong>Professional luxury photographer with high-end portfolio</strong><br />
                                    Hire photographers who specialize in luxury properties and understand architectural photography
                                </div>
                            </label>

                            <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                <div className="text-gray-300">
                                    <strong>Twilight/golden hour exterior shots</strong><br />
                                    Capture dramatic exterior photos during magic hour for maximum visual impact
                                </div>
                            </label>

                            <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                <div className="text-gray-300">
                                    <strong>High-resolution images (minimum 3000px wide)</strong><br />
                                    Ensure images are large enough for print materials and high-end marketing pieces
                                </div>
                            </label>

                            <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                <div className="text-gray-300">
                                    <strong>Drone photography for aerial perspectives</strong><br />
                                    Showcase property location, acreage, and surrounding neighborhood from above
                                </div>
                            </label>

                            <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                <div className="text-gray-300">
                                    <strong>3D virtual tours or Matterport scans</strong><br />
                                    Provide immersive experience for out-of-town buyers and initial screening
                                </div>
                            </label>

                            <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                <div className="text-gray-300">
                                    <strong>Professional video walkthrough or cinematic property film</strong><br />
                                    Create emotional connection through storytelling and lifestyle imagery
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-green-400 mb-6">Luxury Staging Strategy</h2>
                        <p className="text-gray-300 mb-6">Professional staging is essential for luxury properties to help buyers envision the lifestyle and maximize perceived value.</p>

                        <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-6 mb-6">
                            <h3 className="text-red-400 font-bold mb-4">Luxury Staging Principles</h3>
                            <div className="text-gray-300 space-y-2">
                                <p><strong>Less is More:</strong> Sophisticated, uncluttered spaces that highlight architecture</p>
                                <p><strong>Quality Over Quantity:</strong> Invest in fewer, high-end pieces rather than budget furniture</p>
                                <p><strong>Lifestyle Focus:</strong> Create aspirational settings that show how spaces can be lived in</p>
                                <p><strong>Art & Accessories:</strong> Use museum-quality art and designer accessories</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                <div className="text-gray-300">
                                    <strong>Hire certified luxury staging professional</strong><br />
                                    Work with stagers who specialize in high-end properties and understand luxury buyer expectations
                                </div>
                            </label>

                            <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                <div className="text-gray-300">
                                    <strong>Maximize natural light and views</strong><br />
                                    Remove window treatments or use sheer panels to showcase views and brightness
                                </div>
                            </label>

                            <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                <div className="text-gray-300">
                                    <strong>Detail shots of luxury finishes and unique features</strong><br />
                                    Highlight craftsmanship, custom elements, and high-end materials
                                </div>
                            </label>

                            <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                <div className="text-gray-300">
                                    <strong>Create defined spaces with clear purposes</strong><br />
                                    Help buyers understand how to use large or unique spaces effectively
                                </div>
                            </label>

                            <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                <div className="text-gray-300">
                                    <strong>Highlight architectural features</strong><br />
                                    Draw attention to coffered ceilings, crown molding, built-ins, and custom millwork
                                </div>
                            </label>

                            <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                <div className="text-gray-300">
                                    <strong>Stage outdoor living spaces</strong><br />
                                    Don't forget patios, pools, gardens, and other outdoor amenities
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-red-400 mb-6">Luxury Pricing Strategy</h2>
                        <p className="text-gray-300 mb-6">Pricing luxury properties requires understanding local luxury market dynamics and buyer psychology.</p>

                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-white/10 rounded-lg p-4 text-center">
                                <h3 className="text-red-400 font-bold mb-2">Aspirational Pricing</h3>
                                <div className="text-2xl font-bold text-yellow-400 mb-2">105-115% of Value</div>
                                <p className="text-gray-300 text-sm">Price above market to create exclusivity, allow for negotiation room</p>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4 text-center">
                                <h3 className="text-red-400 font-bold mb-2">Market Value Pricing</h3>
                                <div className="text-2xl font-bold text-yellow-400 mb-2">95-105% of Value</div>
                                <p className="text-gray-300 text-sm">Price at or slightly above market comparables for quicker sale</p>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4 text-center">
                                <h3 className="text-red-400 font-bold mb-2">Strategic Underpricing</h3>
                                <div className="text-2xl font-bold text-yellow-400 mb-2">85-95% of Value</div>
                                <p className="text-gray-300 text-sm">Price below market to create urgency and multiple offer situations</p>
                            </div>
                        </div>

                        <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4">
                            <h3 className="text-red-400 font-bold mb-3">Luxury Pricing Considerations</h3>
                            <div className="text-gray-300 space-y-2">
                                <p><strong>Comps Are Limited:</strong> Fewer comparable sales make pricing more art than science</p>
                                <p><strong>Longer Marketing Time:</strong> Luxury buyers take more time to decide</p>
                                <p><strong>Seasonal Factors:</strong> Some markets have strong seasonal preferences</p>
                                <p><strong>Global Buyers:</strong> Consider international buyers and currency fluctuations</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Luxury Buyer Personas</h2>
                        <p className="text-gray-300 mb-6">Understanding different types of luxury buyers helps tailor marketing messages and showing experiences.</p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-lg p-4">
                                <h3 className="text-yellow-400 text-lg font-bold mb-3">The Executive</h3>
                                <div className="text-gray-300 text-sm space-y-1">
                                    <p><strong>Profile:</strong> Corporate executives, entrepreneurs</p>
                                    <p><strong>Priorities:</strong> Prestigious location, home office space, entertaining areas</p>
                                    <p><strong>Timeline:</strong> Often relocating for work, may need quick decisions</p>
                                    <p><strong>Approach:</strong> Focus on productivity, status, and convenience</p>
                                </div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4">
                                <h3 className="text-yellow-400 text-lg font-bold mb-3">The Empty Nester</h3>
                                <div className="text-gray-300 text-sm space-y-1">
                                    <p><strong>Profile:</strong> Established professionals, recently retired</p>
                                    <p><strong>Priorities:</strong> Low maintenance, luxury amenities, location</p>
                                    <p><strong>Timeline:</strong> Patient shoppers, not rushed</p>
                                    <p><strong>Approach:</strong> Emphasize lifestyle, ease of living, and experiences</p>
                                </div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4">
                                <h3 className="text-yellow-400 text-lg font-bold mb-3">The Investor</h3>
                                <div className="text-gray-300 text-sm space-y-1">
                                    <p><strong>Profile:</strong> Real estate investors, second home buyers</p>
                                    <p><strong>Priorities:</strong> ROI potential, rental income, appreciation</p>
                                    <p><strong>Timeline:</strong> Analytical, may take time for due diligence</p>
                                    <p><strong>Approach:</strong> Focus on market data, investment potential, cash flow</p>
                                </div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4">
                                <h3 className="text-yellow-400 text-lg font-bold mb-3">The Family Upgrader</h3>
                                <div className="text-gray-300 text-sm space-y-1">
                                    <p><strong>Profile:</strong> Growing families, multigenerational households</p>
                                    <p><strong>Priorities:</strong> Space, privacy, schools, safety</p>
                                    <p><strong>Timeline:</strong> Often contingent on selling current home</p>
                                    <p><strong>Approach:</strong> Highlight family features, privacy, room for growth</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LuxuryMarketingGuide;
