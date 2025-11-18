import { useState, useMemo } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/RealEstate/ui/Card";
import { Button } from "../../components/RealEstate/ui/Button";
import { Badge } from "../../components/RealEstate/ui/Badge";
import { Input } from "../../components/RealEstate/ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/RealEstate/ui/Tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/RealEstate/ui/Accordion";

// Import Power Plan Help Components
import DashboardHelp from "../../components/RealEstate/help/DashboardHelp";
import DealPipelineHelp from "../../components/RealEstate/help/DealPipelineHelp";
import DocumentsHelp from "../../components/RealEstate/help/DocumentsHelp";
import DripCampaignHelp from "../../components/RealEstate/help/DripCampaignHelp";
import EngagementScorecardHelp from "../../components/RealEstate/help/EngagementScorecardHelp";
import MarketingHelp from "../../components/RealEstate/help/MarketingHelp";
import OpenHouseToolkitHelp from "../../components/RealEstate/help/OpenHouseToolkitHelp";
import PropertiesHelp from "../../components/RealEstate/help/PropertiesHelp";
import AnalyticsHelp from "../../components/RealEstate/help/AnalyticsHelp";
import CalendarHelp from "../../components/RealEstate/help/CalendarHelp";
import LibraryHelp from "../../components/RealEstate/help/LibraryHelp";
import {
    Search,
    BookOpen,
    Users,
    Building,
    Calendar,
    FileText,
    BarChart3,
    Settings,
    Heart,
    Library,
    CreditCard,
    HelpCircle,
    ChevronRight,
    ExternalLink,
    Clock,
    TrendingUp,
    Database,
    Shield,
    Zap,
    Target,
    Filter,
    Star,
    Crown,
    Home,
    TrendingDown,
    Mail,
    Award,
    Megaphone,
    ClipboardCheck,
} from "lucide-react";

const helpArticles = [
    {
        id: 1,
        title: "Dashboard Overview",
        category: "dashboard",
        keywords: ["dashboard", "overview", "recent activity", "stats", "summary"],
        content: {
            purpose: "The Dashboard provides a comprehensive overview of your real estate business at a glance.",
            functionality: "Displays key metrics, recent activities, and quick access to important features. Shows property statistics, client interactions, and upcoming tasks.",
            dataTracking: "Tracks property views, client interactions, recent activities, pending tasks, and performance metrics. Updates in real-time as you use the system.",
            features: [
                "Real-time statistics and metrics",
                "Recent activity feed",
                "Quick action buttons",
                "Performance insights",
                "Upcoming calendar events"
            ]
        }
    },
    {
        id: 2,
        title: "Client Management",
        category: "clients",
        keywords: ["clients", "customer", "contact", "management", "prospects"],
        content: {
            purpose: "Manage all your client relationships, track interactions, and maintain detailed client profiles.",
            functionality: "Create, edit, and organize client information. Track communication history, preferences, and property interests. Manage client status and follow-ups.",
            dataTracking: "Records client interactions, communication history, property preferences, viewing history, and relationship status. Tracks client engagement metrics.",
            features: [
                "Client profile management",
                "Communication tracking",
                "Property preferences",
                "Viewing history",
                "Follow-up reminders",
                "Client categorization"
            ]
        }
    },
    {
        id: 3,
        title: "Property Management",
        category: "properties",
        keywords: ["properties", "listings", "real estate", "homes", "buildings"],
        content: {
            purpose: "Comprehensive property management system for listing, tracking, and managing real estate properties.",
            functionality: "Add, edit, and manage property listings. Track property status, viewings, offers, and market performance. Organize properties by various criteria.",
            dataTracking: "Monitors property views, inquiries, market performance, price changes, and client interactions. Tracks property status and timeline.",
            features: [
                "Property listing creation",
                "Photo and media management",
                "Market analysis",
                "Viewing scheduling",
                "Offer tracking",
                "Property status updates"
            ]
        }
    },
    {
        id: 4,
        title: "Calendar & Scheduling",
        category: "calendar",
        keywords: ["calendar", "schedule", "appointments", "viewings", "meetings"],
        content: {
            purpose: "Manage appointments, property viewings, client meetings, and important deadlines in one centralized calendar.",
            functionality: "Schedule and manage appointments, property viewings, client meetings, and follow-ups. Set reminders and notifications for important events.",
            dataTracking: "Tracks scheduled events, attendance, completion status, and follow-up requirements. Monitors calendar usage and scheduling patterns.",
            features: [
                "Event scheduling",
                "Reminder notifications",
                "Calendar views (day, week, month)",
                "Conflict detection",
                "Integration with client/property data",
                "Mobile synchronization"
            ]
        }
    },
    {
        id: 5,
        title: "Document Management",
        category: "documents",
        keywords: ["documents", "files", "contracts", "paperwork", "storage"],
        content: {
            purpose: "Organize and manage all real estate documents, contracts, and important files in a secure, searchable system.",
            functionality: "Upload, organize, and categorize documents. Create templates, track document status, and manage version control.",
            dataTracking: "Monitors document uploads, downloads, modifications, and access patterns. Tracks document completion status and deadlines.",
            features: [
                "Document upload and storage",
                "File categorization",
                "Template management",
                "Version control",
                "Search and filtering",
                "Secure access control"
            ]
        }
    },
    {
        id: 6,
        title: "Analytics & Reporting",
        category: "analytics",
        keywords: ["analytics", "reports", "statistics", "performance", "metrics"],
        content: {
            purpose: "Gain insights into your business performance through detailed analytics and customizable reports.",
            functionality: "Generate reports on sales performance, client activity, property metrics, and business trends. Create custom dashboards and export data.",
            dataTracking: "Collects comprehensive data on all system activities, user interactions, and business metrics. Provides historical analysis and trend identification.",
            features: [
                "Performance dashboards",
                "Custom report generation",
                "Data visualization",
                "Trend analysis",
                "Export capabilities",
                "Real-time metrics"
            ]
        }
    },
    {
        id: 7,
        title: "Favorites & Bookmarks",
        category: "favorites",
        keywords: ["favorites", "bookmarks", "saved", "wishlist", "starred"],
        content: {
            purpose: "Save and organize your favorite properties, clients, and important items for quick access.",
            functionality: "Mark properties and clients as favorites, organize them into collections, and access them quickly from anywhere in the system.",
            dataTracking: "Tracks favorite selections, organization patterns, and access frequency. Monitors user preferences and saved item interactions.",
            features: [
                "Favorite marking",
                "Collection organization",
                "Quick access",
                "Sharing capabilities",
                "Sync across devices",
                "Backup and restore"
            ]
        }
    },
    {
        id: 8,
        title: "Library & Resources",
        category: "library",
        keywords: ["library", "resources", "templates", "guides", "materials"],
        content: {
            purpose: "Access a comprehensive library of real estate resources, templates, guides, and educational materials.",
            functionality: "Browse and download templates, guides, forms, and educational content. Organize resources by category and track usage.",
            dataTracking: "Monitors resource downloads, usage patterns, and user engagement with educational materials. Tracks learning progress and preferences.",
            features: [
                "Resource categorization",
                "Template downloads",
                "Educational content",
                "Search functionality",
                "Usage tracking",
                "Regular updates"
            ]
        }
    },
    {
        id: 9,
        title: "Settings & Preferences",
        category: "settings",
        keywords: ["settings", "preferences", "profile", "account", "configuration"],
        content: {
            purpose: "Customize your account settings, manage preferences, and configure system behavior to match your workflow.",
            functionality: "Update profile information, manage notification preferences, customize dashboard layout, and configure system settings.",
            dataTracking: "Stores user preferences, settings changes, and configuration data. Tracks customization patterns and feature usage.",
            features: [
                "Profile management",
                "Notification settings",
                "Dashboard customization",
                "Security settings",
                "Integration preferences",
                "Data export options"
            ]
        }
    },
    {
        id: 10,
        title: "Pricing & Billing",
        category: "pricing",
        keywords: ["pricing", "billing", "subscription", "plans", "payment"],
        content: {
            purpose: "Manage your subscription, view billing information, and upgrade or modify your plan as needed.",
            functionality: "View current plan details, manage billing information, upgrade or downgrade plans, and access billing history.",
            dataTracking: "Tracks subscription status, payment history, plan usage, and billing interactions. Monitors feature usage against plan limits.",
            features: [
                "Plan management",
                "Billing history",
                "Payment processing",
                "Usage tracking",
                "Plan comparison",
                "Upgrade/downgrade options"
            ]
        }
    },
    // Power Plan Section
    {
        id: 11,
        title: "Dashboard - Power Plan",
        category: "power-plan",
        keywords: ["dashboard", "overview", "power plan", "analytics", "performance"],
        content: {
            purpose: "Advanced dashboard features available in the Power Plan, providing comprehensive business intelligence and performance tracking.",
            functionality: "Access detailed analytics, custom dashboards, advanced reporting, and real-time performance metrics not available in basic plans.",
            dataTracking: "Tracks advanced metrics, custom KPIs, detailed performance analytics, and provides predictive insights for business growth.",
            features: [
                "Advanced analytics dashboard",
                "Custom performance metrics",
                "Predictive business insights",
                "Enhanced reporting capabilities",
                "Real-time data visualization",
                "Competitive analysis tools"
            ]
        }
    },
    {
        id: 12,
        title: "Deal Pipeline - Power Plan",
        category: "power-plan",
        keywords: ["deal pipeline", "sales funnel", "power plan", "advanced tracking", "forecasting"],
        content: {
            purpose: "Advanced deal pipeline management with sophisticated tracking, forecasting, and automation features exclusive to Power Plan users.",
            functionality: "Manage complex sales pipelines with advanced automation, detailed forecasting, and sophisticated deal progression tracking.",
            dataTracking: "Tracks deal velocity, conversion rates, stage duration, win/loss analysis, and provides predictive pipeline forecasting.",
            features: [
                "Advanced pipeline automation",
                "Sophisticated forecasting models",
                "Deal velocity tracking",
                "Win/loss analysis",
                "Automated follow-up sequences",
                "Advanced reporting and insights"
            ]
        }
    },
    {
        id: 13,
        title: "Documents - Power Plan",
        category: "power-plan",
        keywords: ["documents", "power plan", "advanced features", "automation", "templates"],
        content: {
            purpose: "Enhanced document management with advanced automation, custom templates, and sophisticated workflow capabilities.",
            functionality: "Create custom document templates, automate document generation, track document workflows, and manage complex document approval processes.",
            dataTracking: "Monitors document usage, template effectiveness, approval workflows, and provides insights on document management efficiency.",
            features: [
                "Custom document templates",
                "Automated document generation",
                "Advanced workflow management",
                "Document approval tracking",
                "Version control and history",
                "Integration with external systems"
            ]
        }
    },
    {
        id: 14,
        title: "Drip Campaigns - Power Plan",
        category: "power-plan",
        keywords: ["drip campaigns", "email marketing", "automation", "power plan", "lead nurturing"],
        content: {
            purpose: "Advanced email marketing automation with sophisticated drip campaign capabilities for lead nurturing and client engagement.",
            functionality: "Create complex multi-step email sequences, segment audiences dynamically, and automate personalized follow-up campaigns based on behavior.",
            dataTracking: "Tracks email performance, engagement rates, conversion metrics, campaign effectiveness, and provides detailed analytics on lead nurturing success.",
            features: [
                "Advanced campaign automation",
                "Dynamic audience segmentation",
                "Behavioral trigger campaigns",
                "A/B testing capabilities",
                "Advanced analytics and reporting",
                "Integration with CRM data"
            ]
        }
    },
    {
        id: 15,
        title: "Engagement Scorecard - Power Plan",
        category: "power-plan",
        keywords: ["engagement", "scorecard", "power plan", "client tracking", "analytics"],
        content: {
            purpose: "Comprehensive client engagement tracking with sophisticated scoring algorithms and detailed performance analytics.",
            functionality: "Monitor client engagement levels, track interaction patterns, and provide insights on relationship health and engagement trends.",
            dataTracking: "Tracks all client interactions, calculates engagement scores, monitors relationship health, and provides predictive insights on client retention.",
            features: [
                "Advanced engagement scoring",
                "Client relationship health tracking",
                "Interaction pattern analysis",
                "Predictive retention insights",
                "Custom engagement metrics",
                "Automated alerts and recommendations"
            ]
        }
    },
    {
        id: 16,
        title: "Marketing - Power Plan",
        category: "power-plan",
        keywords: ["marketing", "power plan", "advanced features", "campaigns", "analytics"],
        content: {
            purpose: "Advanced marketing tools with sophisticated campaign management, detailed analytics, and automation capabilities for maximum ROI.",
            functionality: "Create and manage complex marketing campaigns, track detailed performance metrics, and automate marketing workflows for optimal results.",
            dataTracking: "Tracks campaign performance, ROI metrics, lead generation effectiveness, and provides detailed insights on marketing channel optimization.",
            features: [
                "Advanced campaign management",
                "Detailed ROI tracking",
                "Marketing automation workflows",
                "Multi-channel campaign coordination",
                "Advanced analytics and insights",
                "Custom marketing metrics"
            ]
        }
    },
    {
        id: 17,
        title: "Open House Toolkit - Power Plan",
        category: "power-plan",
        keywords: ["open house", "toolkit", "power plan", "advanced features", "event management"],
        content: {
            purpose: "Comprehensive open house management toolkit with advanced features for event planning, lead capture, and follow-up automation.",
            functionality: "Plan and manage open house events with advanced scheduling, automated lead capture, and sophisticated follow-up sequences.",
            dataTracking: "Tracks event attendance, lead capture rates, follow-up effectiveness, and provides insights on open house performance optimization.",
            features: [
                "Advanced event planning tools",
                "Automated lead capture systems",
                "Sophisticated follow-up sequences",
                "Event performance analytics",
                "Integration with CRM systems",
                "Custom event workflows"
            ]
        }
    },
    {
        id: 18,
        title: "Properties - Power Plan",
        category: "power-plan",
        keywords: ["properties", "power plan", "advanced features", "listing management", "analytics"],
        content: {
            purpose: "Enhanced property management with advanced listing features, sophisticated analytics, and automation capabilities for optimal property marketing.",
            functionality: "Manage property listings with advanced features, track detailed performance metrics, and automate marketing and follow-up processes.",
            dataTracking: "Tracks listing performance, view analytics, lead generation from properties, and provides insights on property marketing optimization.",
            features: [
                "Advanced listing management",
                "Detailed performance analytics",
                "Automated marketing workflows",
                "Sophisticated lead tracking",
                "Property-specific insights",
                "Integration with marketing tools"
            ]
        }
    },
    {
        id: 19,
        title: "Analytics - Power Plan",
        category: "power-plan",
        keywords: ["analytics", "power plan", "business intelligence", "performance tracking", "insights"],
        content: {
            purpose: "Advanced business intelligence and performance analytics with sophisticated tracking, forecasting, and optimization insights.",
            functionality: "Access detailed analytics, custom dashboards, advanced reporting, and real-time performance metrics for data-driven business decisions.",
            dataTracking: "Tracks advanced metrics, custom KPIs, detailed performance analytics, and provides predictive insights for business growth and optimization.",
            features: [
                "Advanced business intelligence dashboard",
                "Custom performance metrics and KPIs",
                "Predictive business insights",
                "Enhanced reporting capabilities",
                "Real-time data visualization",
                "Competitive analysis tools"
            ]
        }
    },
    {
        id: 20,
        title: "Calendar - Power Plan",
        category: "power-plan",
        keywords: ["calendar", "power plan", "scheduling", "sync", "appointments"],
        content: {
            purpose: "Advanced calendar management with seamless synchronization, intelligent scheduling, and comprehensive appointment tracking.",
            functionality: "Schedule and manage appointments with automatic sync to Google and Apple calendars, intelligent conflict detection, and advanced scheduling features.",
            dataTracking: "Tracks appointment scheduling, sync status, conflict resolution, and provides insights on scheduling patterns and optimization.",
            features: [
                "Seamless calendar synchronization",
                "Intelligent scheduling and conflict detection",
                "Advanced appointment management",
                "Cross-device accessibility",
                "Automated reminders and notifications",
                "Team scheduling coordination"
            ]
        }
    },
    {
        id: 21,
        title: "Library - Power Plan",
        category: "power-plan",
        keywords: ["library", "power plan", "resources", "guides", "checklists"],
        content: {
            purpose: "Comprehensive resource library with professional guides, checklists, and educational materials for real estate success.",
            functionality: "Access and share professional-grade resources including buyer guides, seller guides, checklists, and market analysis tools.",
            dataTracking: "Tracks resource usage, download patterns, sharing statistics, and provides insights on resource effectiveness and client engagement.",
            features: [
                "Comprehensive resource library",
                "Professional guides and checklists",
                "Easy sharing and distribution",
                "Resource usage analytics",
                "Client education tools",
                "Market analysis resources"
            ]
        }
    }
];

const categories = [
    { id: "all", name: "All Articles", icon: BookOpen },
    { id: "dashboard", name: "Dashboard", icon: BarChart3 },
    { id: "clients", name: "Client Management", icon: Users },
    { id: "properties", name: "Properties", icon: Building },
    { id: "calendar", name: "Calendar", icon: Calendar },
    { id: "documents", name: "Documents", icon: FileText },
    { id: "analytics", name: "Analytics", icon: TrendingUp },
    { id: "favorites", name: "Favorites", icon: Heart },
    { id: "library", name: "Library", icon: Library },
    { id: "settings", name: "Settings", icon: Settings },
    { id: "pricing", name: "Pricing", icon: CreditCard },
    { id: "power-plan", name: "Power Plan", icon: Crown },
];

// Power Plan specific categories
const powerPlanCategories = [
    { id: "all-power", name: "All Power Plan", icon: Crown },
    { id: "dashboard-power", name: "Dashboard", icon: BarChart3 },
    { id: "analytics-power", name: "Analytics", icon: TrendingUp },
    { id: "calendar-power", name: "Calendar", icon: Calendar },
    { id: "library-power", name: "Library", icon: BookOpen },
    { id: "deals-power", name: "Deals & Pipeline", icon: TrendingDown },
    { id: "documents-power", name: "Documents", icon: FileText },
    { id: "marketing-power", name: "Marketing", icon: Megaphone },
    { id: "engagement-power", name: "Engagement", icon: Target },
    { id: "properties-power", name: "Properties", icon: Building },
    { id: "openhouse-power", name: "Open House", icon: Home },
    { id: "drip-power", name: "Drip Campaigns", icon: Mail },
];

const HelpCenter = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedPowerPlanCategory, setSelectedPowerPlanCategory] = useState("all-power");
    const [selectedArticle, setSelectedArticle] = useState(null);

    // Function to render Power Plan components
    const renderPowerPlanComponent = (articleId) => {
        switch (articleId) {
            case 11:
                return <DashboardHelp />;
            case 12:
                return <DealPipelineHelp />;
            case 13:
                return <DocumentsHelp />;
            case 14:
                return <DripCampaignHelp />;
            case 15:
                return <EngagementScorecardHelp />;
            case 16:
                return <MarketingHelp />;
            case 17:
                return <OpenHouseToolkitHelp />;
            case 18:
                return <PropertiesHelp />;
            case 19:
                return <AnalyticsHelp />;
            case 20:
                return <CalendarHelp />;
            case 21:
                return <LibraryHelp />;
            default:
                return null;
        }
    };

    const filteredArticles = useMemo(() => {
        let filtered = helpArticles;

        // Exclude Power Plan articles from regular articles section
        filtered = filtered.filter(article => article.category !== "power-plan");

        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(article => article.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(query) ||
                article.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
                article.content.purpose.toLowerCase().includes(query) ||
                article.content.functionality.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [searchQuery, selectedCategory]);

    // Filter Power Plan articles based on selected Power Plan category
    const filteredPowerPlanArticles = useMemo(() => {
        let filtered = helpArticles.filter(article => article.category === "power-plan");

        // Filter by Power Plan category
        if (selectedPowerPlanCategory !== "all-power") {
            // Map Power Plan category IDs to article filtering logic
            const categoryMap = {
                "dashboard-power": (article) => article.id === 11, // Dashboard
                "analytics-power": (article) => article.id === 19, // Analytics
                "calendar-power": (article) => article.id === 20, // Calendar
                "library-power": (article) => article.id === 21, // Library
                "deals-power": (article) => article.id === 12, // Deal Pipeline
                "documents-power": (article) => article.id === 13, // Documents
                "marketing-power": (article) => article.id === 16, // Marketing
                "engagement-power": (article) => article.id === 15, // Engagement Scorecard
                "properties-power": (article) => article.id === 18, // Properties
                "openhouse-power": (article) => article.id === 17, // Open House Toolkit
                "drip-power": (article) => article.id === 14, // Drip Campaign
            };

            const filterFunction = categoryMap[selectedPowerPlanCategory];
            if (filterFunction) {
                filtered = filtered.filter(filterFunction);
            }
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(query) ||
                article.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
                article.content.purpose.toLowerCase().includes(query) ||
                article.content.functionality.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [searchQuery, selectedPowerPlanCategory]);

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
    };

    const handleBackToList = () => {
        setSelectedArticle(null);
    };

    if (selectedArticle) {
        // Check if it's a Power Plan article (ID 11-21)
        const isPowerPlanArticle = selectedArticle.id >= 11 && selectedArticle.id <= 21;

        if (isPowerPlanArticle) {
            return (
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleBackToList}
                                className="text-gray-400 hover:text-white"
                            >
                                <ChevronRight className="w-4 h-4 rotate-180 mr-2" />
                                Back to Articles
                            </Button>
                            <Badge variant="secondary" className="bg-yellow-600 text-white">
                                <Crown className="w-3 h-3 mr-1" />
                                Power Plan
                            </Badge>
                        </div>
                    </div>

                    {/* Render Power Plan Component */}
                    {renderPowerPlanComponent(selectedArticle.id)}
                </div>
            );
        }

        // Regular article display for non-Power Plan articles
        return (
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBackToList}
                            className="text-gray-400 hover:text-white"
                        >
                            <ChevronRight className="w-4 h-4 rotate-180 mr-2" />
                            Back to Articles
                        </Button>
                        <Badge variant="secondary">{selectedArticle.category}</Badge>
                    </div>
                </div>

                {/* Article Content */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <HelpCircle className="w-6 h-6 text-[var(--primary-color)]" />
                            <span>{selectedArticle.title}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Purpose */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                                <Target className="w-5 h-5 mr-2 text-[var(--primary-color)]" />
                                Purpose
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {selectedArticle.content.purpose}
                            </p>
                        </div>

                        {/* Functionality */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                                <Zap className="w-5 h-5 mr-2 text-[var(--primary-color)]" />
                                Functionality
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {selectedArticle.content.functionality}
                            </p>
                        </div>

                        {/* Data Tracking */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                                <Database className="w-5 h-5 mr-2 text-[var(--primary-color)]" />
                                Data Tracking
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {selectedArticle.content.dataTracking}
                            </p>
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                                <Star className="w-5 h-5 mr-2 text-[var(--primary-color)]" />
                                Key Features
                            </h3>
                            <ul className="space-y-2">
                                {selectedArticle.content.features.map((feature, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                        <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Help Center</h1>
                    <p className="text-gray-400 mt-2">
                        Find answers to your questions and learn how to use our features effectively
                    </p>
                </div>
                <Button
                    variant="outline"
                    className="border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all"
                    onClick={() => {
                        window.location.href = 'mailto:stackedcare@gmail.com';
                    }}
                >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                </Button>
            </div>

            {/* Search Bar */}
            <Card>
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            placeholder="Search for help articles (e.g., 'dashboard recent activity', 'client management')"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-[var(--medium-dark)] border-[var(--primary-color)] text-white placeholder-gray-400"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Categories */}
            {/* <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className={`${selectedCategory === category.id
                            ? "bg-[var(--primary-color)] text-white"
                            : "border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
                            }`}
                    >
                        <category.icon className="w-4 h-4 mr-2" />
                        {category.name}
                    </Button>
                ))}
            </div> */}

            {/* Results */}
            {/* <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                        {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'} Found
                    </h2>
                    {searchQuery && (
                        <p className="text-gray-400 text-sm">
                            Showing results for "{searchQuery}"
                        </p>
                    )}
                </div>

                {filteredArticles.length === 0 ? (
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">No articles found</h3>
                            <p className="text-gray-400">
                                Try adjusting your search terms or browse by category
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredArticles.map((article) => (
                            <Card
                                key={article.id}
                                className="cursor-pointer hover:bg-[var(--medium-dark)] transition-colors duration-200 border-[var(--primary-color)]"
                                onClick={() => handleArticleClick(article)}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-white text-lg">{article.title}</CardTitle>
                                        <Badge variant="secondary" className="text-xs">
                                            {article.category}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300 text-sm" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {article.content.purpose}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-1">
                                            {article.keywords.slice(0, 3).map((keyword, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs bg-[var(--lighter-dark)] text-gray-400 px-2 py-1 rounded"
                                                >
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div> */}

            {/* Power Plan Categories */}
            <div className="mb-6">
                <h3 className="text-white text-lg font-semibold mb-3">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                    {powerPlanCategories.map((category) => (
                        <Button
                            key={category.id}
                            variant={selectedPowerPlanCategory === category.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedPowerPlanCategory(category.id)}
                            className={`flex items-center space-x-2 ${selectedPowerPlanCategory === category.id
                                ? "bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                                : "border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
                                }`}
                        >
                            <category.icon className="w-4 h-4" />
                            <span>{category.name}</span>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Power Plan Articles Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                        <Crown className="w-6 h-6 text-[var(--primary-color)]" />
                        <span>Pro Plan Articles</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-300 mb-6">
                        Access comprehensive help guides for all Power Plan features. Click on any article to view detailed information and step-by-step instructions.
                    </p>



                    {filteredPowerPlanArticles.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {filteredPowerPlanArticles.map((article) => (
                                <Card
                                    key={article.id}
                                    className="cursor-pointer hover:bg-[var(--medium-dark)] transition-colors duration-200 border-[var(--primary-color)] h-full flex flex-col"
                                    onClick={() => handleArticleClick(article)}
                                >
                                    <CardHeader className="flex-shrink-0">
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-white text-lg leading-tight">{article.title}</CardTitle>
                                            <Badge variant="secondary" className="bg-[var(--primary-color)] text-white flex-shrink-0 ml-2">
                                                <Crown className="w-3 h-3 mr-1" />
                                                Pro Plan
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col">
                                        <p className="text-gray-300 text-sm flex-1" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {article.content.purpose}
                                        </p>
                                        <div className="mt-4 flex items-end justify-between">
                                            <div className="flex flex-wrap gap-1 flex-1">
                                                {article.keywords.slice(0, 3).map((keyword, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-xs bg-[var(--lighter-dark)] text-gray-400 px-2 py-1 rounded"
                                                    >
                                                        {keyword}
                                                    </span>
                                                ))}
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-white text-lg font-semibold mb-2">No Pro Plan Articles Found</h3>
                            <p className="text-gray-400">Try selecting a different category or clearing your search.</p>
                        </div>
                    )}

                    {/* <div className="mt-6 p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                            <Crown className="w-5 h-5 text-yellow-500" />
                            <h4 className="text-white font-semibold">Upgrade to Power Plan</h4>
                        </div>
                        <p className="text-gray-300 text-sm">
                            Unlock all these advanced features and more with our Power Plan subscription. Get access to comprehensive help guides, advanced analytics, and premium support.
                        </p>
                        <Button
                            variant="default"
                            size="sm"
                            className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white"
                            onClick={() => window.open('/pricing', '_blank')}
                        >
                            <Crown className="w-4 h-4 mr-2" />
                            Upgrade Now
                        </Button>
                    </div> */}
                </CardContent>
            </Card>

            {/* Quick Help Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-white">Quick Help</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="getting-started">
                            <AccordionTrigger className="text-white hover:text-[var(--primary-color)]">
                                Getting Started
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                <div className="space-y-2">
                                    <p>Welcome to the Real Estate CRM! Here's how to get started:</p>
                                    <ol className="list-decimal list-inside space-y-1 ml-4">
                                        <li>Complete your profile in Settings</li>
                                        <li>Add your first client in the Clients section</li>
                                        <li>Create property listings in Properties</li>
                                        <li>Schedule viewings using the Calendar</li>
                                        <li>Track your progress with Analytics</li>
                                    </ol>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="common-issues">
                            <AccordionTrigger className="text-white hover:text-[var(--primary-color)]">
                                Common Issues
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                <div className="space-y-2">
                                    <p>Frequently encountered issues and solutions:</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Can't upload documents? Check file size and format</li>
                                        <li>Calendar not syncing? Verify your timezone settings</li>
                                        <li>Client data not saving? Ensure you're connected to the internet</li>
                                        <li>Analytics not updating? Data refreshes every 15 minutes</li>
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="tips-tricks">
                            <AccordionTrigger className="text-white hover:text-[var(--primary-color)]">
                                Tips & Tricks
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                <div className="space-y-2">
                                    <p>Maximize your productivity with these tips:</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Use keyboard shortcuts for faster navigation</li>
                                        <li>Set up automated reminders for follow-ups</li>
                                        <li>Create templates for common documents</li>
                                        <li>Use the search function to quickly find information</li>
                                        <li>Customize your dashboard for your workflow</li>
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
};

export default HelpCenter;
