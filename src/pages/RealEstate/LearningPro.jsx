import React, { useState, useEffect, useMemo } from "react";
import LearningContentPage from '../../components/learning/LearningContentPage';
import toast from "react-hot-toast";

export default function LearningPro() {
    const [activeCategory, setActiveCategory] = useState("All Content");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showLearningContent, setShowLearningContent] = useState(false);

    const categories = [
        "All Content",
        "Pro Plan",
        "Power Plan",
        "Starter Stack",
        "Lead Generation",
        "CRM Features",
        "Sales Process",
        "Marketing",
        "Analytics"
    ];

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        setShowLearningContent(true);
    };

    const handleBackToLearning = () => {
        setShowLearningContent(false);
        setSelectedCourse(null);
    };

    // All content from NewLearning.jsx - Pro content at top
    const allContentCards = useMemo(() => ([
        // Pro Plan Courses (Purple - Advanced) - AT TOP
        { icon: "💎", level: "Advanced", duration: "24 min", title: "High-Income Client Psychology", desc: "Understanding motivations of affluent buyers and sellers, communication that resonates, and building relationships before they need to move.", tags: ["psychology", "high-income", "pro plan"], color: "purple" },
        { icon: "📈", level: "Advanced", duration: "26 min", title: "Market Cycle Strategy and Timing", desc: "Master market timing, recognize cycle phases early, and position your business for maximum opportunity in any market condition.", tags: ["market timing", "strategy", "pro plan"], color: "purple" },
        { icon: "📊", level: "Advanced", duration: "21 min", title: "Competitive Market Intelligence", desc: "Track competitors systematically, identify market opportunities, and position yourself strategically without being negative.", tags: ["competitive intelligence", "market analysis", "pro plan"], color: "purple" },
        { icon: "💰", level: "Advanced", duration: "18 min", title: "Cross-Selling Revenue Streams", desc: "Diversify your income through strategic partnerships, additional services, and value-added offerings that increase client lifetime value.", tags: ["revenue", "cross-selling", "pro plan"], color: "purple" },
        { icon: "🔍", level: "Advanced", duration: "22 min", title: "Database Mining Mastery", desc: "Transform your past client database into a goldmine of referrals, repeat business, and market intelligence.", tags: ["database", "referrals", "pro plan"], color: "purple" },

        // Power Plan Courses (Orange - Intermediate)
        { icon: "💬", level: "Intermediate", duration: "18 min", title: "Advanced Objection Handling", desc: "Master-level objection handling techniques, psychological frameworks, and response strategies for complex situations.", tags: ["objection handling", "psychology", "power plan"], color: "orange" },
        { icon: "🏆", level: "Intermediate", duration: "22 min", title: "Closing Table Mastery", desc: "Advanced closing techniques, objection handling, and deal-structuring strategies that maximize success rates.", tags: ["closing", "negotiation", "power plan"], color: "orange" },
        { icon: "📧", level: "Intermediate", duration: "1 hour", title: "Lead Nurturing Sequences", desc: "Automated email sequences that nurture leads through the entire sales funnel.", tags: ["email marketing", "automation", "power plan"], color: "orange" },
        { icon: "🔄", level: "Intermediate", duration: "1.5 hours", title: "Referral System Blueprint", desc: "Systematic approach to building a referral-based business that generates consistent leads.", tags: ["referrals", "system", "power plan"], color: "orange" },
        { icon: "📱", level: "Intermediate", duration: "1 hour", title: "Social Media That Converts", desc: "Create engaging social media content that generates leads and builds your brand.", tags: ["social media", "marketing", "power plan"], color: "orange" },

        // Starter Stack Courses (Blue - Basic)
        { icon: "📐", level: "Basic", duration: "4 min", title: "Appraisal Packet Checklist", desc: "Everything to hand the appraiser: comp summary, updates, feature sheet, and lot/HOA quirks.", tags: ["checklist", "appraisal", "starter stack"], color: "blue" },
        { icon: "📊", level: "Intermediate", duration: "6 min", title: "Fair-Housing-Safe Marketing", desc: "Ad copy & image guardrails, audience targeting pitfalls, and how to handle schools/safety questions.", tags: ["compliance", "marketing", "starter stack"], color: "blue" },
        { icon: "🔧", level: "Basic", duration: "6 min", title: "Inspection Credits vs. Repairs", desc: "When credits beat repairs, how to price them, and what lenders/title actually require to close on time.", tags: ["checklist", "inspection", "starter stack"], color: "blue" },
        { icon: "📸", level: "Intermediate", duration: "8 min", title: "Listing Media Copy That Sells", desc: "Write compelling property descriptions that attract buyers and showcase your expertise.", tags: ["marketing", "copywriting", "starter stack"], color: "blue" },
        { icon: "📈", level: "Basic", duration: "5 min", title: "Market Pulse in 5 Minutes", desc: "Quick market analysis techniques to stay informed and provide valuable insights to clients.", tags: ["market analysis", "research", "starter stack"], color: "blue" },
        { icon: "💰", level: "Intermediate", duration: "12 min", title: "Offer Strategy: Win Without Overpaying", desc: "Strategic approaches to making competitive offers while protecting your clients' interests.", tags: ["negotiation", "strategy", "starter stack"], color: "blue" },
        { icon: "🏦", level: "Basic", duration: "10 min", title: "Pre-Approval Power-Up", desc: "Guide clients through the pre-approval process and leverage it for stronger offers.", tags: ["financing", "process", "starter stack"], color: "blue" },
        { icon: "⏰", level: "Basic", duration: "15 min", title: "Pricing a Listing in 30 Minutes", desc: "Efficient pricing strategies to quickly and accurately price properties for the market.", tags: ["pricing", "valuation", "starter stack"], color: "blue" },
        { icon: "📋", level: "Basic", duration: "20 min", title: "Transaction Timeline", desc: "Complete timeline management from contract to closing with all necessary steps.", tags: ["timeline", "process", "starter stack"], color: "blue" },
    ]), []);

    const featuredCourses = [
        {
            icon: "🎯",
            // Title must match keys used in LearningContentPage moduleMap
            title: "Negotiation Mastery Course",
            displayTitle: "Negotiation Mastery: Advanced Deal Closing",
            description: "Master the art of negotiation in real estate. Learn proven strategies, psychology tactics, and frameworks to close more deals at better terms.",
            duration: "4.5 hours",
            modules: "6 modules",
            rating: "4.9",
            enrollments: "1156",
            price: "Free",
            originalPrice: "$399",
            badge: "Pro Plan",
            level: "Advanced",
            desc: "Advanced negotiation mastery for better deals and stronger relationships."
        },
        {
            icon: "🔍",
            // Title must match keys used in LearningContentPage moduleMap
            title: "Skip Tracing Course",
            displayTitle: "Skip Tracing to Sales: Complete Lead Management",
            description: "Master skip tracing fundamentals, data evaluation, outreach strategy, compliance, and lead conversion in this comprehensive 5-module course.",
            duration: "3.5 hours",
            modules: "5 modules",
            rating: "4.9",
            enrollments: "1247",
            price: "Free",
            originalPrice: "$199",
            badge: "Featured",
            level: "Intermediate",
            desc: "Comprehensive skip tracing system from data to conversion."
        },
        {
            icon: "🤝",
            // Title must match keys used in LearningContentPage moduleMap
            title: "SOI Training Course",
            displayTitle: "Sphere of Influence to Sales Pipeline",
            description: "Transform your existing network into a consistent referral machine. Learn to systematically nurture relationships and convert them into closed transactions.",
            duration: "4 hours",
            modules: "6 modules",
            rating: "4.8",
            enrollments: "892",
            price: "Free",
            originalPrice: "$299",
            badge: "Featured",
            level: "Intermediate",
            desc: "Turn your sphere into a predictable referral engine."
        }
    ];

    const filteredCards = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return allContentCards.filter((c) => {
            const matchesSearch = !term ||
                c.title.toLowerCase().includes(term) ||
                c.desc.toLowerCase().includes(term) ||
                c.tags.join(" ").toLowerCase().includes(term);
            if (!matchesSearch) return false;
            if (activeCategory === "All Content") return true;
            if (activeCategory === "Pro Plan") return c.color === "purple";
            if (activeCategory === "Power Plan") return c.color === "orange";
            if (activeCategory === "Starter Stack") return c.color === "blue";
            if (activeCategory === "Lead Generation") return c.tags.some(t => t.includes("lead"));
            if (activeCategory === "CRM Features") return c.tags.some(t => t.includes("crm") || t.includes("dashboard") || t.includes("calendar") || t.includes("search"));
            return true;
        });
    }, [allContentCards, activeCategory, searchTerm]);

    // Show learning content page if a course is selected
    if (showLearningContent && selectedCourse) {
        return (
            <LearningContentPage
                course={selectedCourse}
                onBack={handleBackToLearning}
                onComplete={() => {
                    toast.success('Congratulations! You have completed this course.');
                    handleBackToLearning();
                }}
            />
        );
    }

    const featuredItems = [
        {
            title: "🎯 New Course",
            heading: "Advanced Lead Nurturing Strategies",
            description: "Learn proven techniques to convert more leads into clients"
        },
        {
            title: "📈 Updated",
            heading: "Stacked CRM 2025 Features",
            description: "Discover the latest tools and automation capabilities"
        },
        {
            title: "🏆 Popular",
            heading: "First 90 Days Success Plan",
            description: "Complete roadmap for new real estate professionals"
        }
    ];

    const progressData = [
        { track: "Pro Plan Track", type: "Advanced Strategies", progress: 45, status: "45%" },
        { track: "Power Plan Track", type: "Intermediate Skills", progress: 78, status: "78%" },
        { track: "Starter Stack Track", type: "Foundation Skills", progress: 100, status: "✓" }
    ];

    const renderCard = (card, index) => (
        <div
            key={`${card.title}-${index}`}
            className="bg-[#34495e] rounded-lg overflow-hidden border border-transparent hover:border-[#5dade2] transition cursor-pointer"
            onClick={() => handleCourseClick(card)}
        >
            <div className={`relative h-36 flex items-center justify-center text-3xl ${card.color === "blue" ? "bg-gradient-to-r from-[#3498db] to-[#2980b9]" :
                card.color === "orange" ? "bg-gradient-to-r from-[#f39c12] to-[#e67e22]" :
                    "bg-gradient-to-r from-[#9B59B6] to-[#8E44AD]"
                }`}>
                <div className="absolute top-2 left-2 text-xs bg-white/90 text-[#2c3e50] px-2 py-1 rounded font-bold">{card.level}</div>
                <div className="absolute bottom-2 left-2 text-xs bg-black/30 text-white px-2 py-1 rounded">{card.duration}</div>
                <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded font-bold ${card.color === "blue" ? "bg-blue-500 text-white" :
                    card.color === "orange" ? "bg-orange-500 text-white" :
                        "bg-purple-500 text-white"
                    }`}>
                    {card.color === "blue" ? "Starter" : card.color === "orange" ? "Power" : "Pro"}
                </div>
                {card.icon}
            </div>
            <div className="p-4">
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-[#bdc3c7] text-sm mb-3">{card.desc}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                    {card.tags.slice(0, 3).map((t, i) => (
                        <span key={i} className={`text-xs px-2 py-1 rounded border ${card.level === "Basic" ? "border-[#27ae60] text-[#27ae60]" :
                            card.level === "Intermediate" ? "border-[#f39c12] text-[#f39c12]" :
                                "border-[#9B59B6] text-[#9B59B6]"
                            }`}>{t}</span>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-[#bdc3c7] text-sm flex items-center gap-2">
                        <span>⭐</span>
                        <span>{card.level === "Advanced" ? "Expert Level" : "Beginner Friendly"}</span>
                    </div>
                    <button
                        className="bg-[#5dade2] text-[#2c3e50] px-3 py-1 rounded text-sm font-semibold hover:opacity-90"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCourseClick(card);
                        }}
                    >
                        Access
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header + Search + Categories */}
            <div className="bg-[#2c3e50] rounded-xl p-6 border border-[#34495e]">
                <div className="flex flex-col items-center gap-4">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-[#5dade2] mb-2">STACKED Learning Pro</h1>
                        <p className="text-[#bdc3c7]">Complete learning library with Pro content prioritized and advanced courses</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="flex items-center bg-[#34495e] rounded-lg px-3 py-2 border border-[#5dade2] w-full md:w-[36rem]">
                            <span className="mr-2">🔍</span>
                            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search courses and tutorials..." className="bg-transparent placeholder:text-[#bdc3c7] outline-none text-white w-full" />
                        </div>
                        <span className="bg-[#9B59B6] text-white px-3 py-2 rounded font-bold text-sm whitespace-nowrap">Pro Plan</span>
                    </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setActiveCategory(c)}
                            className={`px-5 py-2 rounded-lg border ${activeCategory === c ? "bg-[#5dade2] text-[#2c3e50] border-[#5dade2]" : "bg-[#34495e] text-[#bdc3c7] border-transparent hover:border-[#5dade2]"}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Courses */}
            <section className="bg-[#2c3e50] rounded-xl p-6 border-2 border-[#5dade2]">
                <h2 className="text-white text-2xl font-bold mb-6">Featured Courses</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {featuredCourses.map((course, idx) => (
                        <div key={idx} className="bg-[#34495e] rounded-lg p-6 border border-[#5dade2] hover:border-[#f39c12] transition-colors">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="text-3xl">{course.icon}</div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-white font-bold text-lg">{course.displayTitle || course.title}</h3>
                                        <span className="bg-[#5dade2] text-[#2c3e50] px-2 py-1 rounded text-xs font-semibold">{course.badge}</span>
                                    </div>
                                    <p className="text-[#bdc3c7] text-sm mb-4">{course.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                <div className="flex items-center gap-2 text-[#bdc3c7]">
                                    <span>🕒</span>
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#bdc3c7]">
                                    <span>📚</span>
                                    <span>{course.modules}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#bdc3c7]">
                                    <span>⭐</span>
                                    <span>{course.rating}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#bdc3c7]">
                                    <span>👥</span>
                                    <span>{course.enrollments}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-white font-semibold">{course.price}</span>
                                    <span className="text-[#bdc3c7] line-through text-sm">{course.originalPrice}</span>
                                </div>
                                <button
                                    className="bg-[#5dade2] text-[#2c3e50] px-4 py-2 rounded font-semibold hover:bg-[#4a9fd1] transition-colors"
                                    onClick={() => handleCourseClick(course)}
                                >
                                    Start Course
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Progress Section */}
            <div className="bg-[#34495e] rounded-xl p-8 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-[#5dade2]">Your Learning Progress</h3>
                    <div className="text-[#bdc3c7] text-sm">15 of 22 courses completed</div>
                </div>
                {progressData.map((item, index) => (
                    <div key={index} className="bg-[#2c3e50] p-4 rounded-lg mb-4 flex justify-between items-center">
                        <div>
                            <div className="font-bold">{item.track}</div>
                            <div className="text-[#bdc3c7] text-sm">{item.type}</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-48 h-2 bg-[#34495e] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#5dade2] rounded-full transition-all duration-500"
                                    style={{ width: `${item.progress}%` }}
                                />
                            </div>
                            <span className={`font-bold ${item.progress === 100 ? 'text-[#5dade2]' : 'text-[#f39c12]'}`}>
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Sections */}
            {activeCategory === "All Content" || activeCategory === "Pro Plan" ? (
                <div className="mb-12">
                    <div className="bg-[#34495e] rounded-xl p-8 mb-8 text-center">
                        <h2 className="text-3xl font-bold text-[#5dade2] mb-2">💎 Pro Plan - Advanced Strategies</h2>
                        <p className="text-[#bdc3c7]">Master advanced real estate strategies and high-income client psychology</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allContentCards.filter(card => card.color === "purple").map((card, index) => renderCard(card, index))}
                    </div>
                </div>
            ) : null}

            {activeCategory === "All Content" || activeCategory === "Power Plan" ? (
                <div className="mb-12">
                    <div className="bg-[#34495e] rounded-xl p-8 mb-8 text-center">
                        <h2 className="text-3xl font-bold text-[#5dade2] mb-2">⚡ Power Plan - Intermediate Skills</h2>
                        <p className="text-[#bdc3c7]">Advanced closing techniques, objection handling, and lead nurturing strategies</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allContentCards.filter(card => card.color === "orange").map((card, index) => renderCard(card, index))}
                    </div>
                </div>
            ) : null}

            {activeCategory === "All Content" || activeCategory === "Starter Stack" ? (
                <div className="mb-12">
                    <div className="bg-[#34495e] rounded-xl p-8 mb-8 text-center">
                        <h2 className="text-3xl font-bold text-[#5dade2] mb-2">📚 Starter Stack - Foundation Skills</h2>
                        <p className="text-[#bdc3c7]">Master the fundamentals of real estate and essential checklist strategies</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allContentCards.filter(card => card.color === "blue").map((card, index) => renderCard(card, index))}
                    </div>
                </div>
            ) : null}

            {/* Filtered Content */}
            {activeCategory !== "All Content" && activeCategory !== "Pro Plan" && activeCategory !== "Power Plan" && activeCategory !== "Starter Stack" && (
                <div className="bg-[#2c3e50] rounded-xl p-6">
                    <div className="text-[#5dade2] text-lg font-semibold mb-4">Filtered Content</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filteredCards.map((c, idx) => renderCard(c, idx))}
                    </div>
                </div>
            )}
        </div>
    );
}
