export const probatePlans = [
  {
    title: "Starter Stack",
    rate: {
      monthly: { price: 49, duration: "/month" },
      yearly: { price: 529, duration: "/year" },
    },
    subheading: "Organize leads, make offers, and stay on top of probate basics",
    features: [
     "Probate lead tracker with tagging and organized contact management",
     "Heir & executor contact management",
     "Quick offer calculator using MAO-style formulas",
     "Property condition checklist with detailed inspection notes",
     "Email templates with basic sending (no open tracking)",
     "Google Maps address autocomplete",
     "Interactive property map with auto-detection of city, ZIP, and neighborhood",
     "Mobile-optimized interface for tablets and phones",
    ],
  },
  {
    title: "Power Stack",
    rate: {
      monthly: { price: 79, duration: "/month" },
      yearly: { price: 853, duration: "/year" },
    },
    duration: "/month",
    subheading: "Analyze opportunities faster and track communication more effectively",
    features: [
      "Everything in Starter, plus+",
      "Customizable pipeline stages with drag-and-drop lead flow management",
      "Email open tracking for better communication insights",
      "Deal analyzer with ARV, repair estimates, and net profit calculations",
      "Detailed property info input for beds, baths, square footage and lot size",
      "Nearby schools & services info (GreatSchools + Google Places APIs)",
      "Direct links to public property listing sites",
      "Reporting dashboard with pipeline activity and response time metrics",
    ],
  },
  {
    title: "Pro Stack",
    rate: {
      monthly: { price: 129, duration: "/month" },
      yearly: { price: 1393, duration: "/year" },
    },
    subheading: "Scale your probate deals with buyer matching and legal coordination",
    features: [
      "Everything in Power, plus+",
      "Team collaboration with multi-user shared pipeline access",
      "Granular user permission settings (admin, acquisition, support roles)",
      "Flexible lead assignment rules (manual or round-robin)",
      "Buyer preference matching to auto-tag and match leads",
      "Deal sharing network for inviting buyers, partners, or agents",
      "Estate document templates with fillable PDFs",
      "Upload + view public probate documents (manual from court websites)",
      "Walkability & transit scores (auto-fetched open-source data)",
    ],
  },
];

export const probateAddOns = [
  {
    key: "caseStatusTracker",
    title: "Case Status Tracker",
    description: "Timeline visualization of the probate process",
    price: 19,
    duration: "/month",
    features: [
      "Timeline view of probate milestones",
      "Custom case status stages",
      "Filing/court date reminders",
      "Automatic status change alerts"
    ],
  },
  {
    key: "probateMarketAnalyzer",
    title: "Probate Market Analyzer",
    description: "Analyze trends and market metrics",
    price: 15,
    duration: "/month",
    features: [
      "Filing volume trends by county",
      "Avg. time-to-sale data",
      "Competitive activity heatmaps",
      "Seasonal trend forecasting",
    ],
  },
  {
    key: "estateInventoryTool",
    title: "Estate Inventory Tool",
    description: "Track and catalog estate assets",
    price: 17,
    duration: "/month",
    features: [
      "Track property + personal items in estates",
      "Asset value estimation calculator",
      "Upload + store photos",
      "Organize by category",
      "Export to PDF for reporting",
    ],
  },
];

export const homeFlippersPlans = [
  {
    title: "Starter Stack",
    rate: {
      monthly: { price: 49, duration: "/month" },
      yearly: { price: 529, duration: "/year" },
    },
    subheading: "Get organized, run the numbers, and plan your flips with confidence",
    features: [
      "Property evaluation tool (basic inputs: ARV, repairs, etc.)",
      "Profit & Commission Calculator",
      "Comparable property analyzer (manual comp tool)",
      "Renovation budget tracker** (editable categories: labor, materials and install)",
      "Flip Project Tracker** (Kanban or checklist view per flip phase, trade, or task group)",
      "Email templates + basic send** (no tracking)",
      "Address Autocomplete (Google Maps API integration for faster job/property entry)",
      "Project intake form** (manual entry: client name, type, address, lead source)",
      "Responsive Web Dashboard (optimized for mobile and tablet use)",
    ],
  },
  {
    title: "Power Stack",
    rate: {
      monthly: { price: 79, duration: "/month" },
      yearly: { price: 853, duration: "/year" },
    },
    subheading: "Plan timelines, manage phases, and improve project efficiency",
    features: [
      "Everything in Starter Stack plus+",
      "Custom pipeline stages (e.g. Consult → Site Visit → Contract → Install)",
      "Renovation Timeline Tracker** (assign due dates by install phase or milestone)",
      "ditable material/labor cost database (user-controlled pricing)",
      "Project Reporting Dashboard (track cost vs ROI, timeline delays, and overruns)",
      "Email tracking (see when contractors/sellers open messages)"
    ],
  },
  {
    title: "Pro Stack",
    rate: {
      monthly: { price: 129, duration: "/month" },
      yearly: { price: 1393, duration: "/year" },
    },
    subheading: "Collaborate with teams, streamline payments, and track multi-project ROI",
    features: [
      "Everything in Power Stack plus+",
      "Team collaboration (multi-user access + role-based views)",
      "User permissions (admin, contractor, estimator, etc.)",
      "Lead/project assignment rules (manual or round-robin)",
      "Contractor portal (limited access to assigned tasks only)",
      "Draw schedule manager (track project funding stages + requests)",
      "Flip Comparison Dashboard (view sales, ROI, and budget variance across projects)",
    ],
  },
];

export const homeFlippersaddOns = [
  {
    title: "Rehab Cost Estimator",
    description: [
      "Room-by-room calculator (kitchen, bath, exterior, etc.)",
      "Material quantity & labor estimator",
      "Local Market Adjustments (auto-adjust rehab estimates by ZIP or metro area)",
      "Save/compare multiple rehab scenarios",
    ],
    price: 19,
    duration: "/month",
    key: "rehabCostEstimator",
  },
  {
    title: "Contractor Bid Comparison Tool",
    description: [
      "Side-by-side visualization of contractor bids",
      "Scope-of-work checklist integration",
      "Timeline and price comparison",
      "Variance Detection (auto-highlight scope or price differences in contractor bids)",
    ],
    price: 15,
    duration: "/month",
    key: "contractorBidTool",
  },
  {
    title: "Marketing Campaign Manager",
    description: [
      "Social media scheduler (IG, FB, TikTok)",
      "Property listing templates (MLS or investor buyers)",
      "Open house and virtual tour event manager",
      "Customizable lead capture forms"
    ],
    price: 17,
    duration: "/month",
    key: "marketingCampaignManager",
  },
];

export const realEstateAgentsAddOns = [
  {
    key: "commissionCalculator",
    title: "Advanced Commission Calculator",
    description: [
      "Manage complex commissions with split, referral, and net commission forecasts",

      // "Split calculations with brokers/teams",
      // "Referral fee calculations",
      // "Net commission forecasting",
    ],
    price: 18,
    duration: "/month",
  },
  {
    key: "presentationTemplates",
    title: "Listing Presentation Templates",
    description: [
      "Professional customizable templates for market analysis and marketing strategy",
      "Mobile-friendly for tablet presentations",
      // "Professional-looking templates they can customize",
      // "Include sections for market analysis, marketing strategy, and agent credentials",
      // "Mobile-friendly formats for presenting on tablets during client meetings",
    ],
    price:25,
    duration: "/month",
  },
  {
    key: "milestoneAutomation",
    title: "Client Milestone Automation",
    description: [
      "Auto-send congratulations and reminders at key transaction milestones",
      "Personalized follow-up sequences to boost retention and referrals",
      // "Anniversary reminders for past clients",
      // "Personalized follow-up sequences based on transaction stage",
      // "This helps with client retention and referrals",
    ],
    price: 20,
    duration: "/month",
  },
];

export const realEstateAgentPlans = [
  {
    key: "starter",
    title: "Starter Stack",
    subheading: "Basic foundation to organize clients and transactions",
    rate: {
      monthly: { price: 40, duration: "/month" },
      yearly: { price: 432, duration: "/year" }, // 35 * 12
    },
    features: [
      "Client database management (contacts, properties, notes, calendar)",
      "Simple transaction timeline",
      "Basic email templates (send + templates)",
      "Task mangement system",
      "Document storage and file attachments",
      "Built-in content library (guides, email scripts, checklists)",
      "Open house toolkit (event setup, digital sign-in form, lead capture)",
      "Client portal (read-only transaction view via shareable link)",
    ],
  },
  {
    key: "power",
    title: "Power Stack",
    subheading:
      "Boost productivity with visual pipelines and property insights",
    rate: {
      monthly: { price: 80, duration: "/month" },
      yearly: { price: 864, duration: "/year" }, // 10 % of for yearly subscription
    },
    features: [
      "Everything in Starter, plus+",
      "Visual pipeline (Kanban-style deal tracker)",
      "Email tracking (basic open tracking)",
      "Customizable task workflows",
      "Attach and organize cloud-based files (Google Drive, Dropbox supported)",
      "Basic analytics dashboard (pipeline stats)",
      "Smart Property Insights:",
      "--Address autocomplete (Google Places API)",
      "--Map and pin display (Google Maps API)",
      "--Nearby schools info (GreatSchools API)",
      "Drip campaign builder (email sequence templates + auto scheduling)",
      "Lead capture forms (customizable, embed or shareable link — auto-add to pipeline)",
      "Activity feed + smart reminders (track contact actions & inactivity alerts)",
      "Client Scorecard (simple 1–100 heat scale based on agent input)",
    ],
  },
  {
    key: "pro",
    title: "Pro Stack",
    subheading:
      "Grow your business with team collaboration and advanced integrations",
    rate: {
      monthly: { price: 130, duration: "/month" },
      yearly: { price: 1404, duration: "/year" }, //
    },
    features: [
      "Everything in Power, plus+",
      "Team collaboration",
      "API integration (connect to 3rd-party tools with no-code options)",
      "Advanced reporting (commission tracking, team stats)",
      "Client status portal (read-only client view)",
      "Client portal upgrades (personalized notes, task previews, contact info visible to clients)",
      "Chrome lead capture extension or bookmarklet (save leads from Zillow/Facebook manually into CRM)",
    ],
  },
];

export const wholesalersPlans = [
  {
    key: "starter",
    title: "Starter Stack",
    subheading: "Essential tools for tracking off-market leads and making quick offers",
    rate: {
      monthly: { price: 45, duration: "/month" },
      yearly: { price: 486, duration: "/year" }, 
    },
    features: [
      "Off-market lead tracker with clean list and grid views",
      "Seller motivation notes (tags + notes to qualify leads)",
      "Quick offer calculator",
      "Mobile-friendly web access",
      "Email templates with basic sending (no open tracking)"
    ],
  },
  {
    key: "power",
    title: "Power Stack",
    subheading: "Boost productivity and close more with custom pipelines + comps",
    rate: {
      monthly: { price: 75, duration: "/month" },
      yearly: { price: 810, duration: "/year" }, // 65 * 12
    },
    features: [
      "Email open tracking to monitor seller engagement",
      "Fully customizable pipeline stages with drag-and-drop Kanban view",
      "ROI analyzer (ARV, rehab, purchase, assignment fee)",
      "Pre-filled document templates (LOIs, wholesale contracts, assignment forms)",
      "Property comps powered by integrated market data APIs",
    ],
  },
  {
    key: "pro",
    title: "Pro Stack",
    subheading: "For teams and serious wholesalers who need full collaboration and dispo tools",
    rate: {
      monthly: { price: 99, duration: "/month" },
      yearly: { price: 1069, duration: "/year" }, // 99 * 12
    },
    features: [
      "Everything in Power, plus+",
      "Team collaboration with multi-user access and shared lead management",
      "Granular user permissions (admin, acquisitions and dispositions)",
      "Lead assignment rules",
      "Buyer database management (tags, follow-ups, contact tracking)",
      "Deal sharing network to invite buyers or wholesalers for streamlined offers",
      "Bulk SMS texting with quota limits and integration options"
    ],
  },
];

export const wholesalersAddOns = [
  {
    key: "assignmentFeeCalculator",
    title: "Assignment Fee Calculator",
    description: [
      "Interactive sliders to customize offer components",
      "Visual profit breakdown",
      "Downloadable/shareable PDF reports",
      "Saves previous calculations for review"
    ],
    price: 19,
    duration: "/month",
  },
  {
    key: "dealAnalysisDashboard",
    title: "Deal Analysis Dashboard",
    description: [
      "Visual red/yellow/green indicators to quickly assess deal strength",
      "Compares against past deals and performance benchmarks",
      "Optional market trend overlays for better context"
    ],
    price: 17,
    duration: "/month",
  },
  {
    key: "QuickMAOCalculator",
    title: "Quick MAO Calculator",
    description: [
      "Easy-to-use interface for rapid max allowable offer",
      "Save and reuse seller inputs",
    ],
    price: 12,
    duration: "/month",
  },
];
