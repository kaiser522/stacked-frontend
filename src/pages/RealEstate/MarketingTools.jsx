import React, { useMemo, useState } from "react";
import { useAddonAccessChecker } from "../../hooks/useAddonAccess";
import { useNavigate } from "react-router-dom";

export default function MarketingTools() {
    const navigate = useNavigate();
    const categories = ['All Categories', 'Template', 'Social Media', 'Print', 'Email', 'Presentation', 'Forms', 'Power Plan', 'Pro Plan'];
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const { canAccess, loading: addonLoading } = useAddonAccessChecker();


    const materials = useMemo(() => ([
        { iconClass: 'template', icon: '📄', title: 'Professional Listing Flyers', path: '/realestate/marketing-tools/flyers', meta: 'PDF Template', tags: ['listing', 'print ready'], category: 'Template', description: 'Eye-catching property flyers for print and digital.' },
        { iconClass: 'pack', icon: '📱', title: 'Social Media Post Templates', path: '/realestate/marketing-tools/social-media', meta: 'Canva/JPG', tags: ['social media', 'branding'], category: 'Social Media', description: 'Instagram and Facebook ready post templates.' },
        { iconClass: 'form', icon: '📧', title: 'Email Marketing Templates', path: '/realestate/marketing-tools/email-templates', meta: 'HTML/Text', tags: ['email', 'automation'], category: 'Email', description: 'Newsletters, market updates, and follow-ups.' },
        { iconClass: 'template', icon: '🏠', title: 'Coming Soon Door Hangers', path: '/realestate/marketing-tools/door-hangers', meta: 'Print PDF', tags: ['neighborhood', 'prospecting'], category: 'Print', description: 'Door hangers to generate pre-listing interest.' },
        { iconClass: 'guide', icon: '📊', title: 'Market Analysis Reports', path: '/realestate/marketing-tools/market-reports', meta: 'Word/PDF', tags: ['market data', 'reports'], category: 'Presentation', description: 'Charts and graphs to showcase expertise.' },
        { iconClass: 'form', icon: '📝', title: 'Open House Sign-In Forms', path: '/realestate/marketing-tools/open-house-signin', meta: 'PDF Form', tags: ['lead capture', 'open house'], category: 'Forms', description: 'Lead capture forms with contact fields.' },
        { iconClass: 'template', icon: '📮', title: 'Just Sold Postcards', path: '/realestate/marketing-tools/postcards', meta: 'Print Ready', tags: ['direct mail', 'farming'], category: 'Print', description: 'Announcement postcards for recent closings.' },
        { iconClass: 'guide', icon: '📋', title: 'Buyer Consultation Packets', path: '/realestate/marketing-tools/buyer-consultation', meta: 'Document Set', tags: ['buyer', 'consultation'], category: 'Presentation', description: 'Complete buyer meeting materials.' },
        { iconClass: 'pack', icon: '🎯', title: 'Seller Listing Presentations', path: '/realestate/marketing-tools/seller-presentations', meta: 'PowerPoint', tags: ['listing', 'presentation'], category: 'Presentation', description: 'Professional presentations for winning listings.' },
        // Real Estate Addons
        { iconClass: 'addon', icon: '🗓️', title: 'Client Milestone Timeline', path: '/realestate/marketing-tools/addons/client-milestone-timeline', meta: 'Interactive Tool', tags: ['timeline', 'client follow-up'], category: 'Power Plan', description: 'Generate personalized post-closing touchpoints with ready-to-send messages.', requiresAddon: true, addonKey: 'client-milestone-automation' },
        { iconClass: 'addon', icon: '🧮', title: 'Commission Calculator MVP', path: '/realestate/marketing-tools/addons/commission-calculator', meta: 'Interactive Tool', tags: ['commission', 'forecasting'], category: 'Power Plan', description: 'Calculate complex commission scenarios with split, referral, and forecasting insights.', requiresAddon: true, addonKey: 'advanced-commission-calculator' },
        { iconClass: 'addon', icon: '📑', title: 'Listing Presentation Templates', path: '/realestate/marketing-tools/addons/listing-presentation-templates', meta: 'Interactive Tool', tags: ['presentation', 'listing'], category: 'Power Plan', description: 'Build customizable listing presentations with modular sections and marketing plans.', requiresAddon: true, addonKey: 'listing-presentation-templates' },

        // Home Flipper Addons
        { iconClass: 'addon', icon: '🔨', title: 'Contractor Bid Comparison Tool', path: '/realestate/marketing-tools/addons/contractor-bid-comparison-tool', meta: 'Interactive Tool', tags: ['contractor', 'bids', 'comparison'], category: 'Power Plan', description: 'Compare contractor bids side-by-side to make informed decisions on your rehab projects.', requiresAddon: true, addonKey: 'contractor-bid-comparison-tool' },
        { iconClass: 'addon', icon: '📈', title: 'Marketing Campaign Manager', path: '/realestate/marketing-tools/addons/marketing-campaign-manager', meta: 'Interactive Tool', tags: ['marketing', 'campaigns', 'automation'], category: 'Power Plan', description: 'Plan, execute, and track multi-channel marketing campaigns for your properties.', requiresAddon: true, addonKey: 'marketing-campaign-manager' },
        { iconClass: 'addon', icon: '💰', title: 'Rehab Cost Estimator', path: '/realestate/marketing-tools/addons/rehab-cost-estimator', meta: 'Interactive Tool', tags: ['rehab', 'cost', 'estimation'], category: 'Power Plan', description: 'Accurately estimate rehab costs for your fix-and-flip projects.', requiresAddon: true, addonKey: 'rehab-cost-estimator' },

        // Probate Addons
        { iconClass: 'addon', icon: '📋', title: 'Case Status Tracker', path: '/realestate/marketing-tools/addons/case-status-tracker', meta: 'Interactive Tool', tags: ['probate', 'case', 'tracking'], category: 'Power Plan', description: 'Track probate case status and important deadlines throughout the process.', requiresAddon: true, addonKey: 'case-status-tracker' },
        { iconClass: 'addon', icon: '📦', title: 'Estate Inventory Tool', path: '/realestate/marketing-tools/addons/estate-inventory-tool', meta: 'Interactive Tool', tags: ['probate', 'inventory', 'estate'], category: 'Power Plan', description: 'Create and manage detailed inventories of estate assets and property.', requiresAddon: true, addonKey: 'estate-inventory-tool' },
        { iconClass: 'addon', icon: '📊', title: 'Probate Market Tracker', path: '/realestate/marketing-tools/addons/probate-market-tracker', meta: 'Interactive Tool', tags: ['probate', 'market', 'tracking'], category: 'Power Plan', description: 'Track probate properties and market opportunities in your area.', requiresAddon: true, addonKey: 'probate-market-analyzer' },

        // Wholesaler Addons
        { iconClass: 'addon', icon: '💵', title: 'Assignment Fee Calculator', path: '/realestate/marketing-tools/addons/assignment-fee-calculator', meta: 'Interactive Tool', tags: ['wholesale', 'assignment', 'fees'], category: 'Power Plan', description: 'Calculate assignment fees and profit margins for wholesale deals.', requiresAddon: true, addonKey: 'assignment-fee-calculator' },
        { iconClass: 'addon', icon: '📊', title: 'Deal Analysis Calculator', path: '/realestate/marketing-tools/addons/deal-analysis-calculator', meta: 'Interactive Tool', tags: ['wholesale', 'deal', 'analysis'], category: 'Power Plan', description: 'Analyze wholesale deals with comprehensive ROI and profit calculations.', requiresAddon: true, addonKey: 'deal-analysis-dashboard' },
        { iconClass: 'addon', icon: '⚡', title: 'Quick MAO Calculator', path: '/realestate/marketing-tools/addons/quick-mao-calculator', meta: 'Interactive Tool', tags: ['wholesale', 'mao', 'calculator'], category: 'Power Plan', description: 'Quickly calculate Maximum Allowable Offer (MAO) for wholesale properties.', requiresAddon: true, addonKey: 'quick-mao-calculator' },

        // Addons Section
        { iconClass: 'addon', icon: '🎂', title: 'Birthday & Holiday Cards', path: '/realestate/marketing-tools/addons/birthday-holiday-cards', meta: 'React Tool', tags: ['client retention', 'personal touch'], category: 'Power Plan', description: 'Personal greeting cards for client birthdays and holidays.', requiresAddon: true, addonKey: 'birthday-holiday-cards' },
        { iconClass: 'addon', icon: '💰', title: 'Home Worth Quiz Builder', path: '/realestate/marketing-tools/addons/home-worth-quiz', meta: 'React Tool', tags: ['lead generation', 'interactive'], category: 'Power Plan', description: 'Interactive quiz to capture leads and provide home valuations.', requiresAddon: true, addonKey: 'home-worth-quiz' },
        { iconClass: 'addon', icon: '🎬', title: 'Listing Video Script Generator', path: '/realestate/marketing-tools/addons/listing-video-scripts', meta: 'React Tool', tags: ['video marketing', 'scripts'], category: 'Power Plan', description: 'Professional video scripts for property tours and marketing.', requiresAddon: true, addonKey: 'listing-video-scripts' },
        { iconClass: 'addon', icon: '📰', title: 'Newsletter Builder', path: '/realestate/marketing-tools/addons/newsletter-builder', meta: 'React Tool', tags: ['email marketing', 'client nurturing'], category: 'Power Plan', description: 'Professional monthly newsletters to stay top-of-mind with clients.', requiresAddon: true, addonKey: 'newsletter-builder' },
        { iconClass: 'addon', icon: '⭐', title: 'Testimonial Collection', path: '/realestate/marketing-tools/addons/testimonial-collection', meta: 'React Tool', tags: ['social proof', 'reviews'], category: 'Power Plan', description: 'Collect and showcase client testimonials and reviews.', requiresAddon: true, addonKey: 'testimonial-collection' },

        // Pro Plan Section
        { iconClass: 'addon', icon: '🎨', title: 'Brand Watermark & Social Asset Pack', path: '/realestate/marketing-tools/brand-watermark-studio', meta: 'Pro Tool', tags: ['branding', 'social'], category: 'Pro Plan', description: 'Upload images and generate branded assets for multiple platforms.' },
        { iconClass: 'addon', icon: '⬛', title: 'QR Code & Print Pack Studio', path: '/realestate/marketing-tools/qr-code-print-studio', meta: 'Pro Tool', tags: ['qr', 'print'], category: 'Pro Plan', description: 'Generate QR codes and create print-ready layouts and packs.' },
        { iconClass: 'addon', icon: '🎉', title: 'Event Invite Card Designer', path: '/realestate/marketing-tools/event-invite-cards', meta: 'Pro Tool', tags: ['events', 'invites'], category: 'Pro Plan', description: 'Design professional event invite cards for open houses and events.' },
        { iconClass: 'addon', icon: '💧', title: 'Client Reconnect Drip Builder', path: '/realestate/marketing-tools/client-reconnect-drip', meta: 'Pro Tool', tags: ['email', 'drip'], category: 'Pro Plan', description: 'Build personalized email drip sequences for past clients.' },
        { iconClass: 'addon', icon: '💌', title: 'Thank You Note Generator', path: '/realestate/marketing-tools/thank-you-note-generator', meta: 'Pro Tool', tags: ['thank you', 'notes'], category: 'Pro Plan', description: 'Create personalized thank you notes for clients and partners.' },
    ]), []);

    const accessibleMaterials = useMemo(() => {
        if (addonLoading) {
            return materials.filter((material) => !material.requiresAddon);
        }
        return materials.filter((material) => {
            if (!material.requiresAddon) return true;
            return canAccess(material.addonKey || material.path);
        });
    }, [materials, addonLoading, canAccess]);

    const filteredMaterials = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return accessibleMaterials.filter((m) => {
            const matchesCategory = selectedCategory === 'All Categories' || m.category === selectedCategory;
            const matchesSearch = !term ||
                m.title.toLowerCase().includes(term) ||
                (m.description || '').toLowerCase().includes(term) ||
                m.tags.some((t) => t.toLowerCase().includes(term));
            return matchesCategory && matchesSearch;
        });
    }, [accessibleMaterials, searchTerm, selectedCategory]);


    return (
        <div className="min-h-screen bg-[#3A4E5E] text-white">
            <main className="max-w-[1400px] mx-auto px-8 py-8 border-l-4 border-[#21D4C6]">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">Marketing Center</h2>
                        <p className="text-[#A0B0C0] max-w-[600px]">
                            Professional templates and materials to market your listings and grow your real estate business
                        </p>
                    </div>
                    {/* <button className="border-2 border-[#21D4C6] text-[#21D4C6] px-4 py-2 rounded-md font-semibold hover:bg-[#21D4C6] hover:text-black transition">📄 View Templates</button> */}
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                    {[
                        { icon: "📄", label: "Total Templates", value: accessibleMaterials.length },
                        { icon: "⬇️", label: "Downloaded", value: "0" }, // TODO: Implement download tracking
                        { icon: "👥", label: "Times Used", value: "0" }, // TODO: Implement usage tracking
                        { icon: "⭐", label: "Favorites", value: "0" } // TODO: Implement favorites tracking
                    ].map((s, idx) => (
                        <div key={idx} className="bg-[#4A5E6E] rounded-xl p-6 border border-[#5A6E7E]">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#3498db]">{s.icon}</div>
                                <div>
                                    <div className="text-[#A0B0C0] text-sm">{s.label}</div>
                                    <div className="text-3xl font-bold">{s.value}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Featured Templates Section - Commented Out */}
                {/* 
                <section className="bg-[#4A5E6E] rounded-xl p-6 border border-[#5A6E7E] mb-8">
                    <h3 className="text-xl font-semibold mb-6">Featured Templates</h3>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        {[{ badge: "Bestseller", title: "Complete Listing Marketing Package", desc: "Professional flyers, social media posts, and email templates for new listings", meta: ["📄 12 templates", "⭐ 4.9", "👥 1,247"] }, { badge: "Popular", title: "Social Media Content Creator", desc: "Instagram and Facebook post templates for market updates and property showcases", meta: ["📱 20 templates", "⭐ 4.8", "👥 892"] }].map((f, idx) => (
                            <div key={idx} className="relative bg-[#3A4E5E] border-2 border-[#21D4C6] rounded-xl p-6">
                                <span className="absolute top-3 right-3 bg-[#21D4C6] text-black px-3 py-1 rounded-2xl text-xs font-semibold">{f.badge}</span>
                                <h4 className="text-lg font-semibold mb-1">{f.title}</h4>
                                <p className="text-[#A0B0C0] mb-3">{f.desc}</p>
                                <div className="flex items-center gap-4 text-[#A0B0C0] text-sm mb-3 flex-wrap">
                                    {f.meta.map((m, i) => (<span key={i}>{m}</span>))}
                                </div>
                                <button className="bg-[#21D4C6] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#1BC4B6] transition">Download Package</button>
                            </div>
                        ))}
                    </div>
                </section>
                */}

                <section className="mb-8">
                    <div className="mb-4 flex flex-col gap-4">
                        <div className="flex gap-4 flex-col md:flex-row">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0B0C0]">🔍</span>
                                <input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-[#4A5E6E] border-2 border-[#5A6E7E] rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-[#A0B0C0] focus:outline-none focus:border-[#21D4C6]"
                                    placeholder="Search marketing materials..."
                                />
                            </div>
                            {/* <button className="border-2 border-[#5A6E7E] text-[#A0B0C0] px-4 py-3 rounded-xl">🔽 Filter</button> */}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setSelectedCategory(c)}
                                    className={`px-3 py-2 rounded-md text-sm border-2 transition ${selectedCategory === c ? 'bg-[#21D4C6] border-[#21D4C6] text-black' : 'border-[#5A6E7E] text-[#A0B0C0] hover:border-[#21D4C6] hover:text-[#21D4C6]'}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">{filteredMaterials.length} Marketing Materials</h3>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        {filteredMaterials.map((m, idx) => (
                            <div onClick={() => m.path && navigate(m.path)} key={idx} className="bg-[#4A5E6E] border-2 border-[#5A6E7E] rounded-xl p-6 hover:border-[#21D4C6] transition cursor-pointer">
                                <div className="flex gap-4 items-start mb-3">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#3498db]">{m.icon}</div>
                                    <div>
                                        <h4 className="text-lg font-semibold">{m.title}</h4>
                                    </div>
                                </div>
                                <p className="text-[#A0B0C0] mb-4">{m.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="text-[#A0B0C0] text-sm flex items-center gap-2">
                                        <span>⏱️</span>
                                        <span>{m.meta}</span>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); m.path && navigate(m.path); }} className="bg-[#21D4C6] text-black px-3 py-2 rounded-md font-semibold hover:bg-[#1BC4B6] transition text-sm">Open</button>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    {m.tags.map((t, i) => (<span key={i} className="bg-[#3A4E5E] text-[#A0B0C0] text-xs px-2 py-1 rounded">{t}</span>))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}
