import { useState } from "react";
import { Megaphone, FileText, TrendingUp, HelpCircle, DollarSign, Mail, Video, Users, BookOpen, MessageSquare, BarChart3, FileCheck } from "lucide-react";
import StaticHtmlEmbed from "../common/StaticHtmlEmbed";

const marketingTools = [
  {
    id: "competitor-comparison",
    title: "Competitor Comparison Chart",
    description: "Side-by-side comparison showing why Stacked is the clear choice",
    icon: BarChart3,
    category: "Sales Tools",
    htmlFile: "/competitor_comparison_chart.html",
    tags: ["comparison", "conversion", "sales"],
  },
  {
    id: "faq-cheat-sheet",
    title: "FAQ Cheat Sheet",
    description: "Quick answers to objections and common questions",
    icon: HelpCircle,
    category: "Sales Tools",
    htmlFile: "/faq_cheat_sheet.html",
    tags: ["objections", "q&a", "support"],
  },
  {
    id: "how-you-get-paid",
    title: "How You Get Paid",
    description: "Payout information, schedule, and payment methods",
    icon: DollarSign,
    category: "Program Info",
    htmlFile: "/how_you_get_paid_section.html",
    tags: ["payouts", "commissions", "payment"],
  },
  {
    id: "program-rules",
    title: "Program Rules",
    description: "Complete affiliate program rules and commission structure",
    icon: FileCheck,
    category: "Program Info",
    htmlFile: "/Program Rules.html",
    tags: ["rules", "commissions", "terms"],
  },
  {
    id: "email-swipes",
    title: "Email Swipe Files",
    description: "Done-for-you email sequences that convert prospects",
    icon: Mail,
    category: "Marketing Content",
    htmlFile: "/stacked_email_swipes.html",
    tags: ["email", "sequences", "copy"],
  },
  {
    id: "traffic-generation",
    title: "Traffic Generation Training",
    description: "Proven strategies to drive targeted traffic",
    icon: TrendingUp,
    category: "Training",
    htmlFile: "/traffic_generation_training.html",
    tags: ["traffic", "outreach", "lead-gen"],
  },
  {
    id: "tax-compliance",
    title: "Tax & Compliance Documentation",
    description: "Required forms and compliance steps for payouts",
    icon: FileText,
    category: "Program Info",
    htmlFile: "/updated_tax_compliance_docs.html",
    tags: ["tax", "w-9", "compliance"],
  },
  {
    id: "video-scripts",
    title: "Video Script Templates",
    description: "30-second TikTok & Instagram scripts ready to record",
    icon: Video,
    category: "Marketing Content",
    htmlFile: "/video_script_templates.html",
    tags: ["video", "social", "scripts"],
  },
  {
    id: "welcome-packet",
    title: "Welcome Packet",
    description: "Complete onboarding guide for new affiliates",
    icon: BookOpen,
    category: "Getting Started",
    htmlFile: "/Welcome_Packet.html",
    tags: ["onboarding", "guide", "start"],
  },
  {
    id: "marketing-toolkit",
    title: "Affiliate Marketing Toolkit",
    description: "Complete marketing toolkit for affiliates",
    icon: Megaphone,
    category: "Marketing Content",
    htmlFile: "/Affiliate Marketing Toolkit.html",
    tags: ["toolkit", "resources", "marketing"],
  },
  {
    id: "affiliate-playbook",
    title: "Affiliate Playbook",
    description: "Complete playbook for affiliate success",
    icon: BookOpen,
    category: "Training",
    htmlFile: "/affiliate_playbook.html",
    tags: ["playbook", "strategy", "guide"],
  },
  {
    id: "support-sla",
    title: "Affiliate Support SLA",
    description: "Support service level agreements and expectations",
    icon: MessageSquare,
    category: "Program Info",
    htmlFile: "/affiliate_support_sla.html",
    tags: ["support", "sla", "help"],
  },
];

const categories = ["All", "Sales Tools", "Marketing Content", "Training", "Program Info", "Getting Started"];

export default function MarketingTools({ onToolSelect }) {
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTools = marketingTools.filter((tool) => {
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch = 
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    if (onToolSelect) onToolSelect(true);
  };

  const handleBackToTools = () => {
    setSelectedTool(null);
    if (onToolSelect) onToolSelect(false);
  };

  if (selectedTool) {
    return (
      <div className="min-h-screen bg-[#1E2A38] pb-20">
        <div className="w-full max-w-[95vw] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <button
            onClick={handleBackToTools}
            className="mb-6 mt-6 flex items-center gap-2 text-[var(--primary-color)] hover:text-teal-300 transition-colors font-medium text-lg"
          >
            ← Back to Marketing Tools
          </button>
          <div className="bg-[#2A3A48] rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-[var(--primary-color)] mb-2">
              {selectedTool.title}
            </h2>
            <p className="text-gray-300">{selectedTool.description}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto mb-6 relative" style={{ paddingBottom: '120px', minHeight: '400px' }}>
            <div className="p-4 sm:p-6 lg:p-8 w-full">
              <StaticHtmlEmbed 
                src={encodeURI(selectedTool.htmlFile)} 
                className="w-full"
              />
            </div>
            {/* Spacer to prevent Intercom chat overlap */}
            <div className="h-20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E2A38] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-[var(--primary-color)]">
            Marketing Tools
          </h1>
          <p className="text-slate-300">
            Everything you need to promote Stacked and grow your affiliate business
          </p>
        </header>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search marketing tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2A3A48] border border-[#324250] text-white p-3 rounded-lg focus:outline-none focus:border-[var(--primary-color)]"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[var(--primary-color)] text-white"
                    : "bg-[#2A3A48] text-slate-300 hover:bg-[#324250]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => handleToolSelect(tool)}
                className="bg-[#2A3A48] border border-[#324250] rounded-lg p-6 hover:border-[var(--primary-color)] hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-[var(--primary-color)]/20 p-3 rounded-lg group-hover:bg-[var(--primary-color)]/30 transition-colors">
                    <Icon className="text-[var(--primary-color)]" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[var(--primary-color)] transition-colors">
                      {tool.title}
                    </h3>
                    <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                      {tool.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <span className="text-[var(--primary-color)] text-sm font-medium group-hover:underline">
                    View Tool →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No tools found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

