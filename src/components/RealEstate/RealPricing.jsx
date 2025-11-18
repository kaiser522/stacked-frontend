import { Check, Star, Zap, Crown, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import logo from "../../assets/logo/logo-1.png";

const pricingTiers = [
  {
    name: "Starter Stack",
    price: "$40",
    period: "/month",
    description: "Basic foundation to organize clients and transactions",
    features: [
      "Dashboard & Analytics",
      "• Basic dashboard with monthly performance reporting",
      "• Analytics page tracking pipeline, recent activity, goals, and overall performance",
      "Client & Property Management",
      "• Clients page with last contact tracking, client links, and list/board views",
      "• Properties page with CSV import/export capabilities, including filtering options",
      "• Basic CSV client import page (no validation or scrubbing included)",
      "Calendar & Documents",
      "• Calendar section with special client filtering (non-synced)",
      "• Document library with 10 pre-made templates, plus sorting, assigning, and personal upload options",
      "Communication Tools",
      "• Integrated texting, email, calling, and basic dialer",
      "• Email templates and one manual sequence",
      "Learning & Marketing Resources",
      "• Learning pages with organized guides and checklists",
      "• Training section with free featured modules to stay current with the market",
      "• Marketing toolkit and Open House toolkit",
      "Integrations & Connections",
      "• Direct connections to recommended list pulling and skip tracing providers for best pricing",
      "Support & Help",
      "• In-app Help Center explaining each page, how features operate, and troubleshooting guidance",
    ],
    popular: false,
  },
  {
    name: "Power Stack",
    price: "$80",
    period: "/month",
    description: "Boost productivity with visual pipelines and property insights",
    icon: Zap,
    features: [
      "Dashboard & Analytics",
      "• Enhanced analytics dashboard with deeper reporting and insights",
      "• Priority client tracking for high-value leads, we calculate that for you",
      "• Client engagement scorecard that automatically tracks and displays response times from your clients",
      "Client & Property Management",
      "• Client import with built-in data cleaning and verification to reduce time wasted on incorrect numbers",
      "• Stages Pipeline to manage clients through every step of the process, allowing you a clearer visual",
      "Calendar & Documents",
      "• Expanded document library with additional premade templates, ready to fill, download, and save directly to client pages",
      "Communication Tools",
      "• Larger library of email templates with multiple automated sequences (clients are manually enrolled in the sequence, then emails send automatically to handle the follow ups for you)",
      "• Drip campaign builder library for structured, hands-free follow-ups",
      "Learning & Marketing Resources",
      "• Additional learning sections with another featured training set",
      "• Extended library of tools for client and business management",
      "• Additional Marketing tools",
    ],
    popular: true,
  },
  {
    name: "Pro Stack",
    price: "$130",
    period: "/month",
    description: "Grow your business with team collaboration and advanced integrations",
    icon: Crown,
    features: [
      "Dashboard & Analytics",
      "• Advanced analytics with the highest level of reporting and insights",
      "Client & Property Management",
      "• Client import page with built-in client scoring",
      "• Power dialer with integrated email system for faster outreach",
      "• Phone verification and data cleaning to improve accuracy",
      "Calendar & Documents",
      "• Expanded set of premade documents, ready to fill, download, and save",
      "Communication Tools",
      "• Larger library of email templates and sequences",
      "• Intelligent drip sequences with auto-enrollment based on client response times",
      "Learning & Marketing Resources",
      "• Additional learning materials with upgraded, featured training sections",
      "• Expanded library of business tools",
      "• Advanced marketing toolkit with added resources",
      "Collaboration & Referrals",
      "• Referral storage pages to track and manage referrals for clients",
      "• Team collaboration features for seamless teamwork",
    ],
    popular: false,
  },
];

const addOns = [
  {
    name: "Advanced Commission Calculator",
    price: "$18",
    period: "/month",
    description:
      "Manage complex commissions with split, referral, and net commission forecasts",
  },
  {
    name: "Listing Presentation Templates",
    price: "$25",
    period: "/month",
    description:
      "Professional customizable templates for market analysis and marketing strategy. Mobile-friendly for tablet presentations",
  },
  {
    name: "Client Milestone Automation",
    price: "$20",
    period: "/month",
    description:
      "Auto-send congratulations and reminders at key transaction milestones. Personalized follow-up sequences to boost retention and referrals",
  },
  {
    name: "Twilio Voice Integration",
    price: "$15",
    period: "/month",
    description:
      "Advanced calling features with Twilio integration for professional phone management and call tracking",
  },
  {
    name: "Email Template Library Pro",
    price: "$12",
    period: "/month",
    description:
      "Extended library of professional email templates and automated sequences for all transaction stages",
  },
  {
    name: "Document Management Pro",
    price: "$10",
    period: "/month",
    description:
      "Advanced document organization with cloud storage integration and automated document generation",
  },
];

export default function RealPricing() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-300 mb-4">
          Choose Your Perfect Plan
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Professional CRM solutions designed specifically for real estate
          agents to grow their business
        </p>
      </div>

      {/* Main Pricing Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-[var(--lighter-dark)] hover:bg-[var(--medium-dark)] border-none ${
              tier.popular
                ? "ring-1 ring-[var(--primary-color)] scale-105"
                : "hover:ring-1 hover:ring-[var(--primary-color)] focus-within:ring-0"
            }`}
          >
            {tier.popular && (
              <div className="absolute top-0 right-0 bg-[var(--primary-color)] text-white px-3 py-1 text-sm font-medium">
                Most Popular
              </div>
            )}

            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-white font-bold">
                {tier.name}
              </CardTitle>
              <div className="text-center">
                <span className="text-4xl font-bold text-[var(--primary-color)]">
                  {tier.price}
                </span>
                <span className="text-gray-400">{tier.period}</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">{tier.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    {!feature.startsWith('•') && (
                      <CheckCircle className="w-5 h-5 text-[var(--primary-color)] flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="text-white bg-[var(--primary-color)] hover:bg-teal-300"
                size="lg"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add-On Modules */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-300 mb-4">
            Add-On Modules
          </h2>
          <p className="text-lg text-gray-400">
            Enhance your plan with specialized tools for advanced functionality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {addOns.map((addon) => (
            <Card
              key={addon.name}
              className="hover:shadow-lg transition-shadow duration-200 border-none bg-[var(--lighter-dark)] hover:bg-[var(--medium-dark)]"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-gray-300">
                    {addon.name}
                  </CardTitle>
                  <Badge
                    variant="primary"
                    className="bg-gray-500 w-18 font-bold text-[var(--primary-color)]"
                  >
                    Add-on
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-[var(--primary-color)]">
                  {addon.price}
                  <span className="text-sm font-normal text-gray-400">
                    {addon.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">{addon.description}</p>
                <Button
                  variant="secondary"
                  className="w-full text-gray-50 bg-[var(--primary-color)] hover:bg-teal-300"
                >
                  Add to Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
  <div className="bg-gradient-to-r from-[var(--lighter-dark)] to-[var(--medium-dark)] rounded-2xl p-8 text-center text-gray-300">
  <h3 className="text-2xl font-bold mb-4 text-[var(--primary-color)]">
    Ready to Grow Your Real Estate Business?
  </h3>

  <p className="text-xl mb-6 flex flex-wrap items-center justify-center gap-2 text-gray-300">
    <span className="opacity-70">
      Join thousands of successful agents who trust
    </span>

    <img
      src={logo}
      alt="STACKED logo"
      className="h-6 sm:h-8 object-contain"
    />

    <span className="opacity-70">
      to manage their clients and close more deals
    </span>
  </p>

  <div className="flex flex-col sm:flex-row gap-4 justify-center"></div>
</div>
</div>
  );
}
