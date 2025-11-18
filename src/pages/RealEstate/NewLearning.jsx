import React, { useEffect, useMemo, useState } from "react";
import LearningContentPage from '../../components/learning/LearningContentPage';
import toast from "react-hot-toast";

export default function Learning() {
    const categories = [
        "All Content",
        "Starter Stack",
        "Power Plan",
        "Pro Plan",
        "Lead Generation",
        "CRM Features",
    ];

    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const [progressAnimated, setProgressAnimated] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showLearningContent, setShowLearningContent] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setProgressAnimated(true), 300);
        return () => clearTimeout(t);
    }, []);

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        setShowLearningContent(true);
    };

    const handleBackToLearning = () => {
        setShowLearningContent(false);
        setSelectedCourse(null);
    };

    const essentialCards = useMemo(() => ([
        // Starter Stack Courses (Blue - Original)
        { icon: "📐", level: "Basic", duration: "4 min", title: "Appraisal Packet Checklist", desc: "Everything to hand the appraiser: comp summary, updates, feature sheet, and lot/HOA quirks.", tags: ["checklist", "appraisal", "starter stack"], color: "blue" },
        { icon: "📊", level: "Intermediate", duration: "6 min", title: "Fair-Housing-Safe Marketing", desc: "Ad copy & image guardrails, audience targeting pitfalls, and how to handle schools/safety questions.", tags: ["compliance", "marketing", "starter stack"], color: "blue" },
        { icon: "🔧", level: "Basic", duration: "6 min", title: "Inspection Credits vs. Repairs", desc: "When credits beat repairs, how to price them, and what lenders/title actually require to close on time.", tags: ["checklist", "inspection", "starter stack"], color: "blue" },
        { icon: "📸", level: "Intermediate", duration: "8 min", title: "Listing Media Copy That Sells", desc: "Write compelling property descriptions that attract buyers and showcase your expertise.", tags: ["marketing", "copywriting", "starter stack"], color: "blue" },
        { icon: "📈", level: "Basic", duration: "5 min", title: "Market Pulse in 5 Minutes", desc: "Quick market analysis techniques to stay informed and provide valuable insights to clients.", tags: ["market analysis", "research", "starter stack"], color: "blue" },
        { icon: "💰", level: "Intermediate", duration: "12 min", title: "Offer Strategy: Win Without Overpaying", desc: "Strategic approaches to making competitive offers while protecting your clients' interests.", tags: ["negotiation", "strategy", "starter stack"], color: "blue" },
        { icon: "🏦", level: "Basic", duration: "10 min", title: "Pre-Approval Power-Up", desc: "Guide clients through the pre-approval process and leverage it for stronger offers.", tags: ["financing", "process", "starter stack"], color: "blue" },
        { icon: "⏰", level: "Basic", duration: "15 min", title: "Pricing a Listing in 30 Minutes", desc: "Efficient pricing strategies to quickly and accurately price properties for the market.", tags: ["pricing", "valuation", "starter stack"], color: "blue" },
        { icon: "📋", level: "Basic", duration: "20 min", title: "Transaction Timeline", desc: "Complete timeline management from contract to closing with all necessary steps.", tags: ["timeline", "process", "starter stack"], color: "blue" },

        // New Courses (Orange - Power Plan)
        { icon: "💬", level: "Intermediate", duration: "18 min", title: "Advanced Objection Handling", desc: "Master-level objection handling techniques, psychological frameworks, and response strategies for complex situations.", tags: ["objection handling", "psychology", "power plan"], color: "orange" },
        { icon: "🏆", level: "Intermediate", duration: "22 min", title: "Closing Table Mastery", desc: "Advanced closing techniques, objection handling, and deal-structuring strategies that maximize success rates.", tags: ["closing", "negotiation", "power plan"], color: "orange" },
        { icon: "📧", level: "Intermediate", duration: "1 hour", title: "Lead Nurturing Sequences", desc: "Automated email sequences that nurture leads through the entire sales funnel.", tags: ["email marketing", "automation", "power plan"], color: "orange" },
        { icon: "🔄", level: "Intermediate", duration: "1.5 hours", title: "Referral System Blueprint", desc: "Systematic approach to building a referral-based business that generates consistent leads.", tags: ["referrals", "system", "power plan"], color: "orange" },
        { icon: "📱", level: "Intermediate", duration: "1 hour", title: "Social Media That Converts", desc: "Create engaging social media content that generates leads and builds your brand.", tags: ["social media", "marketing", "power plan"], color: "orange" },
        // { icon: "🔍", level: "Intermediate", duration: "2 hours", title: "Skip Tracing Course", desc: "Master the art of finding and connecting with property owners through advanced skip tracing techniques.", tags: ["skip tracing", "lead generation", "power plan"], color: "orange" },
        // { icon: "🤝", level: "Intermediate", duration: "1.5 hours", title: "SOI Training Course", desc: "Build and maintain your Sphere of Influence for consistent referral business.", tags: ["referrals", "networking", "power plan"], color: "orange" },

        // // Drip Campaign Email Sequences (Orange - Power Plan)
        // { icon: "📊", level: "Intermediate", duration: "15 min", title: "Monthly Market Updates", desc: "Regular market insights and property value updates to keep clients engaged and informed.", tags: ["email marketing", "client retention", "power plan"], color: "orange" },
        // { icon: "🏡", level: "Intermediate", duration: "12 min", title: "Open House Follow-up", desc: "Automatic follow-up sequence for open house attendees with property details and next steps.", tags: ["email marketing", "follow-up", "power plan"], color: "orange" },
        // { icon: "🔄", level: "Intermediate", duration: "18 min", title: "Past Client Reactivation", desc: "Re-engage previous clients with personalized content and referral opportunities.", tags: ["email marketing", "referrals", "power plan"], color: "orange" },
        // { icon: "💰", level: "Intermediate", duration: "20 min", title: "Seller Follow-up Sequence", desc: "Automated follow-up campaign for potential sellers with market updates and pricing insights.", tags: ["email marketing", "seller leads", "power plan"], color: "orange" },
        // { icon: "🏡", level: "Intermediate", duration: "25 min", title: "First-Time Buyer Journey", desc: "Complete nurture sequence guiding first-time buyers from initial interest through closing.", tags: ["email marketing", "buyer education", "power plan"], color: "orange" },
        // { icon: "📧", level: "Intermediate", duration: "10 min", title: "Lead Nurture Sequence", desc: "7-email sequence for converting new leads into qualified prospects.", tags: ["email marketing", "lead conversion", "power plan"], color: "orange" },

        // Pro Plan Courses (Purple - Advanced)
        { icon: "💎", level: "Advanced", duration: "24 min", title: "High-Income Client Psychology", desc: "Understanding motivations of affluent buyers and sellers, communication that resonates, and building relationships before they need to move.", tags: ["psychology", "high-income", "pro plan"], color: "purple" },
        { icon: "📈", level: "Advanced", duration: "26 min", title: "Market Cycle Strategy and Timing", desc: "Master market timing, recognize cycle phases early, and position your business for maximum opportunity in any market condition.", tags: ["market timing", "strategy", "pro plan"], color: "purple" },
        { icon: "📊", level: "Advanced", duration: "21 min", title: "Competitive Market Intelligence", desc: "Track competitors systematically, identify market opportunities, and position yourself strategically without being negative.", tags: ["competitive intelligence", "market analysis", "pro plan"], color: "purple" },
        { icon: "💰", level: "Advanced", duration: "18 min", title: "Cross-Selling Revenue Streams", desc: "Diversify your income through strategic partnerships, additional services, and value-added offerings that increase client lifetime value.", tags: ["revenue", "cross-selling", "pro plan"], color: "purple" },
        { icon: "🔍", level: "Advanced", duration: "22 min", title: "Database Mining Mastery", desc: "Transform your past client database into a goldmine of referrals, repeat business, and market intelligence.", tags: ["database", "referrals", "pro plan"], color: "purple" },
    ]), []);

    const allCards = useMemo(() => essentialCards, [essentialCards]);

    const filteredCards = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return allCards.filter((c) => {
            const matchesSearch = !term ||
                c.title.toLowerCase().includes(term) ||
                c.desc.toLowerCase().includes(term) ||
                c.tags.join(" ").toLowerCase().includes(term);
            if (!matchesSearch) return false;
            if (activeCategory === "All Content") return true;
            if (activeCategory === "Starter Stack") return c.color === "blue";
            if (activeCategory === "Power Plan") return c.color === "orange";
            if (activeCategory === "Pro Plan") return c.color === "purple";
            if (activeCategory === "Lead Generation") return c.tags.some(t => t.includes("lead"));
            if (activeCategory === "CRM Features") return c.tags.some(t => t.includes("crm") || t.includes("dashboard") || t.includes("calendar") || t.includes("search"));
            return true;
        });
    }, [allCards, activeCategory, searchTerm]);



    const featuredCourses = [
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
        },
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
        }
    ];

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

    return (
        <div className="space-y-8">
            {/* Header + Search + Categories */}
            <div className="bg-[#2c3e50] rounded-xl p-6 border border-[#34495e]">
                <div className="flex flex-col items-center gap-4">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-[#5dade2] mb-2">Accelerate Your Real Estate Success</h1>
                        <p className="text-[#bdc3c7]">Essential and intermediate learning materials with progress tracking and enhanced features</p>
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




            {/* Filtered Content */}
            <section className="bg-[#2c3e50] rounded-xl p-6">
                <div className="text-[#5dade2] text-lg font-semibold mb-4">Content</div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredCards.map((c, idx) => (
                        <div
                            key={`${c.title}-${idx}`}
                            className="bg-[#34495e] rounded-lg overflow-hidden border border-transparent hover:border-[#5dade2] transition cursor-pointer"
                            onClick={() => handleCourseClick(c)}
                        >
                            <div className={`relative h-36 flex items-center justify-center text-3xl ${c.color === "blue" ? "bg-gradient-to-r from-[#3498db] to-[#2980b9]" :
                                c.color === "orange" ? "bg-gradient-to-r from-[#f39c12] to-[#e67e22]" :
                                    "bg-gradient-to-r from-[#9B59B6] to-[#8E44AD]"
                                }`}>
                                <div className="absolute top-2 left-2 text-xs bg-white/90 text-[#2c3e50] px-2 py-1 rounded font-bold">{c.level}</div>
                                <div className="absolute bottom-2 left-2 text-xs bg-black/30 text-white px-2 py-1 rounded">{c.duration}</div>
                                <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded font-bold ${c.color === "blue" ? "bg-blue-500 text-white" :
                                    c.color === "orange" ? "bg-orange-500 text-white" :
                                        "bg-purple-500 text-white"
                                    }`}>
                                    {c.color === "blue" ? "Starter" : c.color === "orange" ? "Power" : "Pro"}
                                </div>
                                {c.icon}
                            </div>
                            <div className="p-4">
                                <h3 className="text-white font-semibold mb-2">{c.title}</h3>
                                <p className="text-[#bdc3c7] text-sm mb-3">{c.desc}</p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {c.tags.slice(0, 3).map((t, i) => (
                                        <span key={i} className={`text-xs px-2 py-1 rounded border ${c.level === "Basic" ? "border-[#27ae60] text-[#27ae60]" :
                                            c.level === "Intermediate" ? "border-[#f39c12] text-[#f39c12]" :
                                                "border-[#9B59B6] text-[#9B59B6]"
                                            }`}>{t}</span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-[#bdc3c7] text-sm flex items-center gap-2">
                                        <span>⭐</span>
                                        <span>{c.level === "Advanced" ? "Expert Level" : "Beginner Friendly"}</span>
                                    </div>
                                    <button
                                        className="bg-[#5dade2] text-[#2c3e50] px-3 py-1 rounded text-sm font-semibold hover:opacity-90"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCourseClick(c);
                                        }}
                                    >
                                        Access
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
}


