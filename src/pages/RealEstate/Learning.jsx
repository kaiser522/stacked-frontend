import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/RealEstate/ui/Card";

// Power Plan Components
import SocialMediaConverts from '../../components/learning/modules/SocialMediaThatConverts';
import ReferralSystemBlueprint from '../../components/learning/modules/ReferralSystemBlueprint';
import LeadNurturingSequences from '../../components/learning/modules/LeadNurturingSequences';
import ClosingTableMastery from '../../components/learning/modules/ClosingTableMastery';
import AdvancedObjectionHandling from '../../components/learning/modules/AdvancedObjectionHandling';

// Featured Course Components
import SOITrainingCourse from '../../components/learning/SOITrainingCourse';
import { Button } from "../../components/RealEstate/ui/Button";
import { Badge } from "../../components/RealEstate/ui/Badge";
import { Progress } from "../../components/RealEstate/ui/Progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/RealEstate/ui/Tabs";
import {
  GraduationCap,
  BookOpen,
  Video,
  FileText,
  CheckCircle,
  Play,
  Clock,
  Star,
  TrendingUp,
  Users,
  Building,
  DollarSign,
  Shield,
  Target,
  Award,
  Calendar,
  BarChart3,
  Heart,
  Settings,
  ExternalLink,
  ChevronRight,
  Bookmark,
  Download,
  Share2,
  Filter,
  Search,
} from "lucide-react";
import { apiBaseUrl } from "../../store/api.config";

const learningCategories = [
  {
    id: "fundamentals",
    name: "Real Estate Fundamentals",
    icon: BookOpen,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    description: "Core concepts and principles of real estate",
  },
  {
    id: "sales",
    name: "Sales & Negotiation",
    icon: TrendingUp,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    description: "Master the art of sales and negotiation",
  },
  {
    id: "marketing",
    name: "Marketing & Lead Generation",
    icon: Target,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    description: "Effective marketing strategies and lead generation",
  },
  {
    id: "legal",
    name: "Legal & Compliance",
    icon: Shield,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    description: "Understanding legal requirements and compliance",
  },
  {
    id: "technology",
    name: "Technology & Tools",
    icon: Settings,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    description: "Modern tools and technology for real estate",
  },
  {
    id: "business",
    name: "Business Development",
    icon: DollarSign,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    description: "Building and growing your real estate business",
  },
];

const learningMaterials = [
  // Fundamentals
  {
    id: 1,
    title: "Appraisal Packet Checklist",
    category: "Checklist",
    type: "read",
    duration: "4 min",
    difficulty: "Beginner",
    // rating: 4.8,
    // enrolled: 1247,
    completed: false,
    progress: 0,
    description:
      "Everything to hand the appraiser: comp summary, updates, feature sheet, and lot/HOA quirks.",
    instructor: "Sarah Johnson",
    thumbnail: "📐",
    tags: ["market analysis", "property types", "market cycles"],
    route: "/realestate/learning/appraisal-packet-checklist",
    component: "Appraisal",
  },
  {
    id: 2,
    title: "Fair-Housing-Safe Marketing",
    category: "Compliance",
    type: "read",
    duration: "6 min",
    difficulty: "Intermediate",
    // rating: 4.9,
    // enrolled: 892,
    completed: false,
    progress: 0,
    description:
      "Ad copy & image guardrails, audience targeting pitfalls, and how to handle schools/safety questions.",
    instructor: "Michael Chen",
    thumbnail: "📊",
    tags: ["valuation", "CMA", "appraisal"],
    route: "/realestate/learning/fair-housing-safe-marketing",
    component: "Fair",
  },
  {
    id: 3,
    title: "Inspection Credits vs. Repairs",
    category: "Checklist",
    type: "read",
    duration: "6 min",
    difficulty: "Beginner",
    // rating: 4.7,
    // enrolled: 1563,
    completed: false,
    progress: 0,
    description:
      "When credits beat repairs, how to price them, and what lenders/title actually require to close on time.",
    instructor: "David Rodriguez",
    thumbnail: "🔧",
    tags: ["investment", "ROI", "analysis"],
    route: "/realestate/learning/inspection-credits-vs-repairs",
    component: "Inspection",
  },

  // Sales & Negotiation
  {
    id: 4,
    title: "Listing Media & Copy That Sells",
    category: "Guide",
    type: "read",
    duration: "8 min",
    difficulty: "Advanced",
    // rating: 4.9,
    // enrolled: 756,
    completed: false,
    progress: 0,
    description:
      "Shot list, sequencing, and a one-paragraph description formula buyers actually read.",
    instructor: "Lisa Thompson",
    thumbnail: "📸",
    tags: ["negotiation", "closing", "deals"],
    route: "/realestate/learning/listing-media-copy-that-sells",
    component: "Listing",
  },
  {
    id: 5,
    title: "Market Pulse in 5 Minutes",
    category: "Guide",
    type: "read",
    duration: "5 min",
    difficulty: "Intermediate",
    // rating: 4.8,
    // enrolled: 1023,
    completed: false,
    progress: 0,
    description:
      "Read your micro-market fast: months of supply, $/SF trends, and DOM signals you can share with clients.",
    instructor: "Robert Wilson",
    thumbnail: "📊",
    tags: ["objections", "sales", "communication"],
    route: "/realestate/learning/market-pulse-in-5-minutes",
    component: "Market",
  },

  // Marketing & Lead Generation
  {
    id: 6,
    title: "Offer Strategy: Win Without Overpaying",
    category: "Playbook",
    type: "read",
    duration: "10 min",
    difficulty: "Intermediate",
    // rating: 4.7,
    // enrolled: 1345,
    completed: false,
    progress: 0,
    description:
      "Build offers that appraise: escalation etiquette, appraisal gaps, and smart credits that keep cash in pocket.",
    instructor: "Jennifer Lee",
    thumbnail: "🎯",
    tags: ["digital marketing", "social media", "advertising"],
    route: "/realestate/learning/offer-strategy-win-without-overpaying",
    component: "Offer",
  },
  {
    id: 7,
    title: "Pre-Approval Power-Up",
    category: "Guide",
    type: "read",
    duration: "7 min",
    difficulty: "Advanced",
    // rating: 4.9,
    // enrolled: 678,
    completed: false,
    progress: 0,
    description:
      "Payment-anchored approvals, buydowns vs price drops, and what to request from lenders before you write.",
    instructor: "Alex Martinez",
    thumbnail: "✅",
    tags: ["lead generation", "nurturing", "conversion"],
    route: "/realestate/learning/pre-approval-power-up",
    component: "PreApprovalPowerUp",
  },

  // Legal & Compliance
  {
    id: 8,
    title: "Pricing a Listing in 30 Minutes",
    category: "Framework",
    type: "read",
    duration: "9 min",
    difficulty: "Intermediate",
    // rating: 4.6,
    // enrolled: 945,
    completed: false,
    progress: 0,
    description:
      "Pick the right comps, reconcile to a range, and choose a launch strategy that attracts the first best buyer.",
    instructor: "Attorney Maria Garcia",
    thumbnail: "📊",
    tags: ["legal", "compliance", "regulations"],
    route: "/realestate/learning/pricing-a-listing-in-30-minutes",
    component: "PricingIn30Minutes",
  },
  {
    id: 9,
    title: "Transaction Timeline (Offer → Close)",
    category: "Timeline",
    type: "read",
    duration: "12 min",
    difficulty: "Advanced",
    // rating: 4.8,
    // enrolled: 567,
    completed: false,
    progress: 0,
    description:
      "Milestones, documents, and who-does-what-when so clients stay calm and closings stay boring (in a good way).",
    instructor: "Attorney James Brown",
    thumbnail: "📄",
    tags: ["contracts", "documentation", "legal"],
    route: "/realestate/learning/transaction-timeline",
    component: "TransactionTimeline",
  },
  {
    id: 10,
    title: "Skip Tracing to Sales: Complete Lead Management",
    category: "Course",
    type: "course",
    duration: "3.5 hours",
    difficulty: "Intermediate",
    // rating: 4.9,
    // enrolled: 1247,
    completed: false,
    progress: 0,
    description:
      "Master skip tracing fundamentals, data evaluation, outreach strategy, compliance, and lead conversion in this comprehensive 5-module course.",
    instructor: "Lead Generation Expert",
    thumbnail: "🔍",
    tags: ["skip tracing", "lead generation", "compliance", "conversion"],
    route: "/realestate/learning/skip-tracing-course",
    component: "SkipTracingCourse",
  },
];

const featuredCourses = [
  {
    id: "skip-tracing",
    title: "Skip Tracing to Sales: Complete Lead Management",
    description:
      "Master skip tracing fundamentals, data evaluation, outreach strategy, compliance, and lead conversion in this comprehensive 5-module course.",
    duration: "3.5 hours",
    modules: 5,
    rating: 4.9,
    enrolled: 1247,
    price: "Free",
    originalPrice: "$199",
    badge: "Featured",
    thumbnail: "🔍",
    tags: ["skip tracing", "lead generation", "compliance", "conversion"],
    route: "/realestate/learning/skip-tracing-course",
    component: "SkipTracingCourse",
  },
  {
    id: "soi-training",
    title: "Sphere of Influence to Sales Pipeline",
    description:
      "Transform your existing network into a consistent referral machine. Learn to systematically nurture relationships and convert them into closed transactions.",
    duration: "4 hours",
    modules: 6,
    rating: 4.8,
    enrolled: 892,
    price: "Free",
    originalPrice: "$299",
    badge: "Featured",
    thumbnail: "🤝",
    tags: ["sphere of influence", "referrals", "relationship management", "networking"],
    route: "/realestate/learning/soi-training-course",
    component: "SOITrainingCourse",
  },
];

// Power Plan Advanced Training Materials
const powerPlanMaterials = [
  {
    id: 11,
    title: "Social Media That Actually Converts",
    category: "Power Strategy",
    type: "read",
    duration: "16 min",
    difficulty: "Advanced",
    completed: false,
    progress: 0,
    description:
      "Content frameworks, posting schedules, and engagement tactics that turn followers into clients.",
    instructor: "Social Media Expert",
    thumbnail: "📱",
    tags: ["social media", "content strategy", "engagement", "conversion"],
    route: "/realestate/learning/social-media-that-converts",
    component: "SocialMediaConverts",
  },
  {
    id: 12,
    title: "Referral System Blueprint",
    category: "Power Strategy",
    type: "read",
    duration: "19 min",
    difficulty: "Advanced",
    completed: false,
    progress: 0,
    description:
      "Systematic approach to generating, tracking, and rewarding referrals that builds a self-sustaining business.",
    instructor: "Referral Expert",
    thumbnail: "🔄",
    tags: ["referrals", "relationship building", "client retention", "business growth"],
    route: "/realestate/learning/referral-system-blueprint",
    component: "ReferralSystemBlueprint",
  },
  {
    id: 13,
    title: "Lead Nurturing Sequences That Convert",
    category: "Power Strategy",
    type: "read",
    duration: "15 min",
    difficulty: "Advanced",
    completed: false,
    progress: 0,
    description:
      "Automated email sequences, behavioral triggers, and conversion optimization that turns cold leads into client meetings.",
    instructor: "Email Marketing Expert",
    thumbnail: "📧",
    tags: ["email marketing", "automation", "lead nurturing", "conversion"],
    route: "/realestate/learning/lead-nurturing-sequences",
    component: "LeadNurturingSequences",
  },
  {
    id: 14,
    title: "Closing Table Mastery",
    category: "Power Strategy",
    type: "read",
    duration: "22 min",
    difficulty: "Advanced",
    completed: false,
    progress: 0,
    description:
      "Advanced closing techniques, objection handling, and deal-structuring strategies that maximize success rates.",
    instructor: "Closing Expert",
    thumbnail: "🤝",
    tags: ["closing", "negotiation", "objection handling", "deal structuring"],
    route: "/realestate/learning/closing-table-mastery",
    component: "ClosingTableMastery",
  },
  {
    id: 15,
    title: "Advanced Objection Handling",
    category: "Power Strategy",
    type: "read",
    duration: "18 min",
    difficulty: "Advanced",
    completed: false,
    progress: 0,
    description:
      "Master-level objection handling techniques, psychological frameworks, and response strategies for complex situations.",
    instructor: "Sales Psychology Expert",
    thumbnail: "🎯",
    tags: ["objection handling", "sales psychology", "communication", "persuasion"],
    route: "/realestate/learning/advanced-objection-handling",
    component: "AdvancedObjectionHandling",
  },
];

const Learning = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedPowerPlanMaterial, setSelectedPowerPlanMaterial] = useState(null);
  const [viewingPowerPlanContent, setViewingPowerPlanContent] = useState(false);
  const [learningData, setLearningData] = useState({});
  const [userProgress, setUserProgress] = useState({
    totalCourses: 10, // Back to original count for main materials
    completedCourses: 0,
    totalHours: 0,
    certificates: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch learning data from API
  useEffect(() => {
    const fetchLearningData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/learning`);
        const result = await response.json();

        if (result?.success) {
          const dataMap = {};
          result?.data?.forEach(item => {
            if (item._id) {
              dataMap[item._id] = {
                rating: item.rating || 0,
                students: item.students || 0
              };
            }
          });
          console.log(dataMap);
          setLearningData(dataMap);
        }
      } catch (error) {
        console.error('Error fetching learning data:', error);
      }
    };

    fetchLearningData();
  }, []);

  // Helper function to get rating and students count
  const getMaterialStats = (component) => {
    const stats = learningData[component] || {};
    return {
      rating: stats.rating || 0,
      students: stats.students || 0
    };
  };

  const filteredMaterials = useMemo(() => {
    let filtered = learningMaterials;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (material) => material.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (material) =>
          material.title.toLowerCase().includes(query) ||
          material.description.toLowerCase().includes(query) ||
          material.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleMaterialClick = (material) => {
    setSelectedMaterial(material);
  };

  const handleBackToList = () => {
    setSelectedMaterial(null);
  };

  const handlePowerPlanMaterialClick = (material) => {
    setSelectedPowerPlanMaterial(material);
  };

  const handleBackToPowerPlanList = () => {
    setSelectedPowerPlanMaterial(null);
    setViewingPowerPlanContent(false);
  };

  const handleStartLearning = (material) => {
    // Check if it's a Power Plan material
    if (material.category === "Power Strategy") {
      // Set state to show the Power Plan content
      setViewingPowerPlanContent(true);
      return;
    }

    if (material.route) {
      navigate(material.route);
    }
    // Optionally update progress or save state here
  };

  // Render Power Plan content when "Start Learning" is clicked
  if (selectedPowerPlanMaterial && viewingPowerPlanContent) {
    // Render the appropriate Power Plan component based on the material
    const renderPowerPlanComponent = () => {
      switch (selectedPowerPlanMaterial.component) {
        case 'SocialMediaConverts':
          return <SocialMediaConverts />;
        case 'ReferralSystemBlueprint':
          return <ReferralSystemBlueprint />;
        case 'LeadNurturingSequences':
          return <LeadNurturingSequences />;
        case 'ClosingTableMastery':
          return <ClosingTableMastery />;
        case 'AdvancedObjectionHandling':
          return <AdvancedObjectionHandling />;
        default:
          return (
            <div className="text-center py-12">
              <p className="text-gray-400">Component not found</p>
            </div>
          );
      }
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToPowerPlanList}
              className="text-gray-400 hover:text-white"
            >
              <ChevronRight className="w-4 h-4 rotate-180 mr-2" />
              Back to Power Plan Training
            </Button>
            <Badge variant="secondary">{selectedPowerPlanMaterial.category}</Badge>
          </div>
        </div>

        {/* Power Plan Component */}
        {renderPowerPlanComponent()}
      </div>
    );
  }

  if (selectedPowerPlanMaterial) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToPowerPlanList}
              className="text-gray-400 hover:text-white"
            >
              <ChevronRight className="w-4 h-4 rotate-180 mr-2" />
              Back to Power Plan Training
            </Button>
            <Badge variant="secondary">{selectedPowerPlanMaterial.category}</Badge>
          </div>
        </div>

        {/* Power Plan Material Detail */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{selectedPowerPlanMaterial.thumbnail}</div>
                <div>
                  <CardTitle className="text-white text-2xl">
                    {selectedPowerPlanMaterial.title}
                  </CardTitle>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Description
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {selectedPowerPlanMaterial.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[var(--medium-dark)] p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-400 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Duration</span>
                </div>
                <p className="text-white font-semibold">
                  {selectedPowerPlanMaterial.duration}
                </p>
              </div>
              <div className="bg-[var(--medium-dark)] p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-400 mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Type</span>
                </div>
                <p className="text-white font-semibold capitalize">
                  {selectedPowerPlanMaterial.type}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedPowerPlanMaterial.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                className="bg-[var(--primary-color)] hover:bg-teal-300 text-white"
                onClick={() => handleStartLearning(selectedPowerPlanMaterial)}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle SOI Training Course navigation
  if (location.pathname === '/realestate/learning/soi-training-course') {
    return <SOITrainingCourse />;
  }

  if (selectedMaterial) {
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
              Back to Learning
            </Button>
            <Badge variant="secondary">{selectedMaterial.category}</Badge>
          </div>
        </div>

        {/* Material Detail */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{selectedMaterial.thumbnail}</div>
                <div>
                  <CardTitle className="text-white text-2xl">
                    {selectedMaterial.title}
                  </CardTitle>
                  {/* <p className="text-gray-400 mt-2">
                    by {selectedMaterial.instructor}
                  </p> */}
                </div>
              </div>
              {/* <div className="text-right">
                <div className="flex items-center space-x-2 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-white">{getMaterialStats(selectedMaterial.component).rating}</span>
                </div>
                <p className="text-gray-400 text-sm">
                  {getMaterialStats(selectedMaterial.component).students} students enrolled
                </p>
              </div> */}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Description
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {selectedMaterial.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[var(--medium-dark)] p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-400 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Duration</span>
                </div>
                <p className="text-white font-semibold">
                  {selectedMaterial.duration}
                </p>
              </div>
              {/* <div className="bg-[var(--medium-dark)] p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-400 mb-2">
                  <Target className="w-4 h-4" />
                  <span className="text-sm">Difficulty</span>
                </div>
                <p className="text-white font-semibold">
                  {selectedMaterial.difficulty}
                </p>
              </div> */}
              <div className="bg-[var(--medium-dark)] p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-400 mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Type</span>
                </div>
                <p className="text-white font-semibold capitalize">
                  {selectedMaterial.type}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedMaterial.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                className="bg-[var(--primary-color)] hover:bg-teal-300 text-white"
                onClick={() => handleStartLearning(selectedMaterial)}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
              {/* <Button
                variant="outline"
                className="border-[var(--primary-color)] text-[var(--primary-color)]"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Save for Later
              </Button> */}
              {/* <Button
                variant="outline"
                className="border-[var(--primary-color)] text-[var(--primary-color)]"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button> */}
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
          <h1 className="text-3xl font-bold text-white">Learning Center</h1>
          <p className="text-gray-400 mt-2">
            Enhance your real estate skills with our comprehensive learning
            materials
          </p>
        </div>
        {/* <Button
          variant="outline"
          className="border-[var(--primary-color)] text-[var(--primary-color)]"
        >
          <Award className="w-4 h-4 mr-2" />
          View Certificates
        </Button> */}
      </div>
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[var(--medium-dark)]">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Courses</p>
                <p className="text-white text-xl font-semibold">
                  {userProgress.totalCourses}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--medium-dark)]">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-white text-xl font-semibold">
                  {userProgress.completedCourses}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--medium-dark)]">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Hours Learned</p>
                <p className="text-white text-xl font-semibold">
                  {userProgress.totalHours}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* <Card className="bg-[var(--medium-dark)]">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Certificates</p>
                <p className="text-white text-xl font-semibold">
                  {userProgress.certificates}
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
      {/* Featured Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Featured Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-[var(--lighter-dark)] p-6 rounded-lg border border-[var(--primary-color)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{course.thumbnail}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {course.description}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-[var(--primary-color)] text-white">
                    {course.badge}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {course.modules} modules
                  </span>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    {course.rating}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.enrolled}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-semibold">
                      {course.price}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      {course.originalPrice}
                    </span>
                  </div>
                  <Button
                    className="bg-[var(--primary-color)] hover:bg-teal-300 text-white"
                    onClick={() => {
                      // Navigate to the specific course
                      navigate(course.route);
                    }}
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search learning materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[var(--medium-dark)] border border-[var(--primary-color)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 text-sm">Filter:</span>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
          className={
            selectedCategory === "all"
              ? "bg-[var(--primary-color)] text-white"
              : "border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
          }
        >
          All Categories
        </Button>
        {Array.from(new Set(learningMaterials.map((m) => m.category))).map(
          (cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={
                selectedCategory === cat
                  ? "bg-[var(--primary-color)] text-white"
                  : "border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
              }
            >
              {cat}
            </Button>
          )
        )}
      </div>
      {/* Unified Learning Materials */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {[...filteredMaterials, ...powerPlanMaterials].length} Learning Materials
          </h2>
          {searchQuery && (
            <p className="text-gray-400 text-sm">
              Showing results for "{searchQuery}"
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...filteredMaterials, ...powerPlanMaterials].map((material) => (
            <Card
              key={material.id}
              className="cursor-pointer hover:bg-[var(--medium-dark)] transition-colors duration-200 border-[var(--primary-color)]"
              onClick={() => {
                if (material.category === "Power Strategy") {
                  handlePowerPlanMaterialClick(material);
                } else {
                  handleMaterialClick(material);
                }
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{material.thumbnail}</div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        {material.title}
                      </CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p
                  className="text-gray-300 text-sm mb-4"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {material.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {material.duration}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {material.type}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {material.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-[var(--lighter-dark)] text-gray-400 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learning;
