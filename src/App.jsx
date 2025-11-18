import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FullPageLoader from "./components/loaders/FullPageLoader";
import AddonGate from "./components/addons/AddonGate";

import Login from "./pages/Login";
import PaymentPage from "./pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Route guards
import ProtectedRoute from "./utils/ProtectedRoute";

// Lazy loaded pages
const LandingPage = lazy(() => import("./pages/Landing"));
const PrivacyPolicy = lazy(() => import("./pages/Privacy-Policy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const Pricing = lazy(() => import("./pages/Pricing"));
const RealEstate = lazy(() => import("./pages/Pricepackages/RealEstate"));
const Wholesalers = lazy(() => import("./pages/Pricepackages/Wholesalers"));
const Probate = lazy(() => import("./pages/Pricepackages/Probate"));
const HomeFlippers = lazy(() => import("./pages/Pricepackages/HomeFlippers"));
const PricingSummary = lazy(() => import("./pages/PricingSummary"));
const AffiliateDashboard = lazy(() => import("./pages/AffiliatedDashboard"));

// Admin
const AdminLogin = lazy(() => import("./pages/Admin/Login"));
const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AdminEmails = lazy(() => import("./pages/Admin/Emails"));
const AdminPayments = lazy(() => import("./pages/Admin/Payments"));
const AdminNewsLetters = lazy(() => import("./pages/Admin/NewsLetters"));
const AdminCalendar = lazy(() => import("./pages/Admin/Calendar"));
const AccountLookUp = lazy(() => import("./pages/Admin/AccountLookUp"));
const AdminAffiliates = lazy(() => import("./pages/Admin/Affiliates"));

// Real Estate
const RealDashboard = lazy(() => import("./components/RealEstate/Layout"));
const RealIndex = lazy(() => import("./pages/RealEstate/RealEstate"));
const RealPageNotFound = lazy(() => import("./pages/RealEstate/NotFound"));
const RealPricing = lazy(() => import("./components/RealEstate/RealPricing"));
const RealCients = lazy(() => import("./pages/RealEstate/Clients"));
const RealProperties = lazy(() => import("./pages/RealEstate/Properties"));
const RealPropertyDetails = lazy(() =>
  import("./pages/RealEstate/PropertyDetails")
);
const RealCalendar = lazy(() => import("./pages/RealEstate/Calender"));
const RealDocument = lazy(() =>
  import("./pages/RealEstate/DocumentDetailPages")
);
const RealAnalytics = lazy(() => import("./pages/RealEstate/Analytics"));
const RealLibrary = lazy(() => import("./pages/RealEstate/LibraryPage"));
const RealLearning = lazy(() => import("./pages/RealEstate/Learning"));
import Appraisal from "./components/learning/Appraisal";
import Fair from "./components/learning/Fair";
import Inspection from "./components/learning/Inspection";
import Listing from "./components/learning/Listing";
import Market from "./components/learning/Market";
import Offer from "./components/learning/Offer";
import PreApprovalPowerUp from "./components/learning/PreApprovalPowerUp";
import PricingIn30Minutes from "./components/learning/PricingIn30Minutes";
import TransactionTimeline from "./components/learning/TransactionTimeline";
import SkipTracingCourse from "./components/learning/SkipTracingCourse";
import SOITrainingCourse from "./components/learning/SOITrainingCourse";
const RealSettings = lazy(() => import("./pages/RealEstate/Settings"));
const RealHelpCenter = lazy(() => import("./pages/RealEstate/HelpCenter"));
const RealMessaging = lazy(() => import("./pages/RealEstate/Messaging"));
const RealEmailInbox = lazy(() => import("./pages/RealEstate/EmailInbox"));
const TwilioDebug = lazy(() => import("./components/TwilioDebug"));
const RealVoiceCalls = lazy(() => import("./pages/RealEstate/VoiceCalls"));
const RealOpenHouseToolkit = lazy(() => import("./pages/RealEstate/OpenHouseToolkit"));
const RealClientUpload = lazy(() => import("./pages/RealEstate/ClientUpload"));
const RealClientDetail = lazy(() => import("./pages/RealEstate/ClientDetail"));
const RealClientStatus = lazy(() => import("./pages/RealEstate/ClientStatus"));
const RealClientTimeline = lazy(() => import("./pages/RealEstate/ClientTimeline"));
const RealMarketingTools = lazy(() => import("./pages/RealEstate/MarketingTools"));
const DNCCompliance = lazy(() => import("./pages/RealEstate/DNCCompliance"));
const MT_SocialMediaTemplates = lazy(() => import("./pages/RealEstate/MarketingTools/SocialMediaTemplates"));
const MT_ProfessionalListingFlyers = lazy(() => import("./pages/RealEstate/MarketingTools/ProfessionalListingFlyers"));
const MT_EmailMarketingTemplates = lazy(() => import("./pages/RealEstate/MarketingTools/EmailMarketingTemplates"));
const MT_ComingSoonDoorHangers = lazy(() => import("./pages/RealEstate/MarketingTools/ComingSoonDoorHangers"));
const MT_MarketAnalysisReports = lazy(() => import("./pages/RealEstate/MarketingTools/MarketAnalysisReports"));
const MT_OpenHouseToolkit = lazy(() => import("./pages/RealEstate/MarketingTools/OpenHouseToolkit"));
const MT_JustSoldPostcards = lazy(() => import("./pages/RealEstate/MarketingTools/JustSoldPostcards"));
const MT_BuyerConsultationPackets = lazy(() => import("./pages/RealEstate/MarketingTools/BuyerConsultationPackets"));
const MT_SellerListingPresentations = lazy(() => import("./pages/RealEstate/MarketingTools/SellerListingPresentations"));
const MT_ClientMilestoneTimeline = lazy(() => import("./pages/RealEstate/MarketingTools/ClientMilestoneTimeline"));
const MT_CommissionCalculator = lazy(() => import("./pages/RealEstate/MarketingTools/CommissionCalculator"));
const MT_ListingPresentationTemplates = lazy(() => import("./pages/RealEstate/MarketingTools/ListingPresentationTemplates"));
const MT_ContractorBidComparisonTool = lazy(() => import("./pages/RealEstate/MarketingTools/ContractorBidComparisonTool"));
const MT_MarketingCampaignManager = lazy(() => import("./pages/RealEstate/MarketingTools/MarketingCampaignManager"));
const MT_RehabCostEstimator = lazy(() => import("./pages/RealEstate/MarketingTools/RehabCostEstimator"));
const MT_CaseStatusTracker = lazy(() => import("./pages/RealEstate/MarketingTools/CaseStatusTracker"));
const MT_EstateInventoryTool = lazy(() => import("./pages/RealEstate/MarketingTools/EstateInventoryTool"));
const MT_ProbateMarketTracker = lazy(() => import("./pages/RealEstate/MarketingTools/ProbateMarketTracker"));
const MT_AssignmentFeeCalculator = lazy(() => import("./pages/RealEstate/MarketingTools/AssignmentFeeCalculator"));
const MT_DealAnalysisCalculator = lazy(() => import("./pages/RealEstate/MarketingTools/DealAnalysisCalculator"));
const MT_QuickMAOCalculator = lazy(() => import("./pages/RealEstate/MarketingTools/QuickMAOCalculator"));
const RealNewLearning = lazy(() => import("./pages/RealEstate/NewLearning"));
const RealTeamHub = lazy(() => import("./pages/RealEstate/TeamHub"));
const RealAdvancedAnalytics = lazy(() => import("./pages/RealEstate/AdvancedAnalytics"));
const RealLearningPro = lazy(() => import("./pages/RealEstate/LearningPro"));
const RealClientImport = lazy(() => import("./pages/RealEstate/ClientImport"));
const MT_Addon_BirthdayHolidayCards = lazy(() => import("./pages/RealEstate/MarketingTools/BirthdayHolidayCards"));
const MT_Addon_HomeWorthQuiz = lazy(() => import("./pages/RealEstate/MarketingTools/HomeWorthQuiz"));
const MT_Addon_ListingVideoScripts = lazy(() => import("./pages/RealEstate/MarketingTools/ListingVideoScripts"));
const MT_Addon_NewsletterBuilder = lazy(() => import("./pages/RealEstate/MarketingTools/NewsletterBuilder"));
const MT_Addon_TestimonialCollection = lazy(() => import("./pages/RealEstate/MarketingTools/TestimonialCollection"));
const MT_Pro_BrandWatermarkStudio = lazy(() => import("./pages/RealEstate/MarketingTools/BrandWatermarkStudio"));
const MT_Pro_QRCodePrintStudio = lazy(() => import("./pages/RealEstate/MarketingTools/QRCodePrintStudio"));
const MT_Pro_EventInviteCards = lazy(() => import("./pages/RealEstate/MarketingTools/EventInviteCards"));
const MT_Pro_ClientReconnectDrip = lazy(() => import("./pages/RealEstate/MarketingTools/ClientReconnectDrip"));
const MT_Pro_ThankYouNoteGenerator = lazy(() => import("./pages/RealEstate/MarketingTools/ThankYouNoteGenerator"));
const MT_Pro_QuickReferralTool = lazy(() => import("./pages/RealEstate/MarketingTools/QuickReferralTool"));
const RealPipeline = lazy(() => import("./pages/RealEstate/Pipeline"));
const RealDripCampaign = lazy(() => import("./pages/RealEstate/DripCampaignBuilder"));
const RealClientEngagement = lazy(() => import("./pages/RealEstate/ClientEngagement"));

function App() {
  const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  
  if (!stripePublishableKey) {
    console.error('VITE_STRIPE_PUBLISHABLE_KEY is not set. Stripe integration will not work.');
  }
  
  const stripePromise = loadStripe(stripePublishableKey || '');
  return (
    <Router>
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/wholesalers" element={<Wholesalers />} />
          <Route path="/probate" element={<Probate />} />
          <Route path="/home-flippers" element={<HomeFlippers />} />
          <Route path="/pricing-summary" element={<PricingSummary />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <PaymentPage />
              </Elements>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute type="admin" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="emails" element={<AdminEmails />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="affiliates" element={<AdminAffiliates />} />
            <Route path="news-letters" element={<AdminNewsLetters />} />
            <Route path="calendar" element={<AdminCalendar />} />
            <Route path="account-look-up" element={<AccountLookUp />} />
          </Route>

          {/* Real Estate Dashboard Routes */}
          <Route
            path="/realestate"
            element={<ProtectedRoute type="real_estate" />}
          >
            <Route element={<RealDashboard />}>
              <Route path="dashboard" element={<RealIndex />} />
              <Route path="clients" element={<RealCients />} />
              <Route path="clients/:clientId" element={<RealClientDetail />} />
              <Route path="clients/:clientId/status" element={<RealClientStatus />} />
              <Route path="clients/:clientId/timeline" element={<RealClientTimeline />} />
              <Route path="properties" element={<RealProperties />} />
              <Route
                path="properties/:propertyId"
                element={<RealPropertyDetails />}
              />
              <Route path="calendar" element={<RealCalendar />} />
              <Route path="documents" element={<RealDocument />} />
              <Route path="pricing" element={<RealPricing />} />
              <Route path="analytics" element={<RealAnalytics />} />
              <Route path="library" element={<RealLibrary />} />
              <Route path="learning" element={<RealLearning />} />
              <Route path="team-hub" element={<RealTeamHub />} />
              <Route path="advanced-analytics" element={<RealAdvancedAnalytics />} />
              <Route path="learning-pro" element={<RealLearningPro />} />
              <Route path="client-import" element={<RealClientImport />} />
              <Route path="new-learning" element={<RealNewLearning />} />
              <Route path="pipeline" element={<RealPipeline />} />
              <Route path="drip-campaign" element={<RealDripCampaign />} />
              <Route path="client-engagement" element={<RealClientEngagement />} />
              <Route path="learning/appraisal-packet-checklist" element={<Appraisal />} />
              <Route path="learning/fair-housing-safe-marketing" element={<Fair />} />
              <Route path="learning/inspection-credits-vs-repairs" element={<Inspection />} />
              <Route path="learning/listing-media-copy-that-sells" element={<Listing />} />
              <Route path="learning/market-pulse-in-5-minutes" element={<Market />} />
              <Route path="learning/offer-strategy-win-without-overpaying" element={<Offer />} />
              <Route path="learning/pre-approval-power-up" element={<PreApprovalPowerUp />} />
              <Route path="learning/pricing-a-listing-in-30-minutes" element={<PricingIn30Minutes />} />
              <Route path="learning/transaction-timeline" element={<TransactionTimeline />} />
              <Route path="learning/skip-tracing-course" element={<SkipTracingCourse />} />
              <Route path="learning/soi-training-course" element={<SOITrainingCourse />} />
              <Route path="messaging" element={<RealMessaging />} />
              <Route path="twilio-debug" element={<TwilioDebug />} />
              <Route path="email-inbox" element={<RealEmailInbox />} />
              <Route path="voice-calls" element={<RealVoiceCalls />} />
              <Route
                path="open-house-toolkit"
                element={<RealOpenHouseToolkit />}
              />
              <Route path="client-upload" element={<RealClientUpload />} />
              <Route path="marketing-tools" element={<RealMarketingTools />} />
              <Route path="marketing-tools/social-media" element={<MT_SocialMediaTemplates />} />
              <Route path="marketing-tools/flyers" element={<MT_ProfessionalListingFlyers />} />
              <Route path="marketing-tools/email-templates" element={<MT_EmailMarketingTemplates />} />
              <Route path="marketing-tools/door-hangers" element={<MT_ComingSoonDoorHangers />} />
              <Route path="marketing-tools/market-reports" element={<MT_MarketAnalysisReports />} />
              <Route path="marketing-tools/open-house-signin" element={<MT_OpenHouseToolkit />} />
              <Route path="marketing-tools/postcards" element={<MT_JustSoldPostcards />} />
              <Route path="marketing-tools/buyer-consultation" element={<MT_BuyerConsultationPackets />} />
              <Route path="marketing-tools/seller-presentations" element={<MT_SellerListingPresentations />} />
              <Route
                path="marketing-tools/addons/client-milestone-timeline"
                element={
                  <AddonGate
                    addonKey="client-milestone-timeline"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_ClientMilestoneTimeline />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/commission-calculator"
                element={
                  <AddonGate
                    addonKey="commission-calculator"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_CommissionCalculator />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/listing-presentation-templates"
                element={
                  <AddonGate
                    addonKey="listing-presentation-templates"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_ListingPresentationTemplates />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/contractor-bid-comparison-tool"
                element={
                  <AddonGate
                    addonKey="contractor-bid-comparison-tool"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_ContractorBidComparisonTool />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/marketing-campaign-manager"
                element={
                  <AddonGate
                    addonKey="marketing-campaign-manager"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_MarketingCampaignManager />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/rehab-cost-estimator"
                element={
                  <AddonGate
                    addonKey="rehab-cost-estimator"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_RehabCostEstimator />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/case-status-tracker"
                element={
                  <AddonGate
                    addonKey="case-status-tracker"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_CaseStatusTracker />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/estate-inventory-tool"
                element={
                  <AddonGate
                    addonKey="estate-inventory-tool"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_EstateInventoryTool />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/probate-market-tracker"
                element={
                  <AddonGate
                    addonKey="probate-market-tracker"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_ProbateMarketTracker />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/assignment-fee-calculator"
                element={
                  <AddonGate
                    addonKey="assignment-fee-calculator"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_AssignmentFeeCalculator />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/deal-analysis-calculator"
                element={
                  <AddonGate
                    addonKey="deal-analysis-calculator"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_DealAnalysisCalculator />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/quick-mao-calculator"
                element={
                  <AddonGate
                    addonKey="quick-mao-calculator"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_QuickMAOCalculator />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/birthday-holiday-cards"
                element={
                  <AddonGate
                    addonKey="birthday-holiday-cards"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_Addon_BirthdayHolidayCards />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/home-worth-quiz"
                element={
                  <AddonGate
                    addonKey="home-worth-quiz"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_Addon_HomeWorthQuiz />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/listing-video-scripts"
                element={
                  <AddonGate
                    addonKey="listing-video-scripts"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_Addon_ListingVideoScripts />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/newsletter-builder"
                element={
                  <AddonGate
                    addonKey="newsletter-builder"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_Addon_NewsletterBuilder />
                  </AddonGate>
                }
              />
              <Route
                path="marketing-tools/addons/testimonial-collection"
                element={
                  <AddonGate
                    addonKey="testimonial-collection"
                    category="real-estate"
                    fallbackPath="/realestate/marketing-tools"
                  >
                    <MT_Addon_TestimonialCollection />
                  </AddonGate>
                }
              />
              <Route path="marketing-tools/brand-watermark-studio" element={<MT_Pro_BrandWatermarkStudio />} />
              <Route path="marketing-tools/qr-code-print-studio" element={<MT_Pro_QRCodePrintStudio />} />
              <Route path="marketing-tools/event-invite-cards" element={<MT_Pro_EventInviteCards />} />
              <Route path="marketing-tools/client-reconnect-drip" element={<MT_Pro_ClientReconnectDrip />} />
              <Route path="marketing-tools/thank-you-note-generator" element={<MT_Pro_ThankYouNoteGenerator />} />
              <Route path="quick-referral-tool" element={<MT_Pro_QuickReferralTool />} />
              <Route path="dnc-compliance" element={<DNCCompliance />} />
              <Route path="settings" element={<RealSettings />} />
              <Route path="help-center" element={<RealHelpCenter />} />
              <Route path="*" element={<RealPageNotFound />} />
            </Route>
          </Route>

          {/* Affiliate Dashboard */}
          <Route
            path="/affiliate"
            element={<ProtectedRoute type="affiliate" />}
          >
            <Route
              path="/affiliate/dashboard"
              element={<AffiliateDashboard name="Jhon Smith" />}
            />
          </Route>

          {/* Fallback 404 */}
          <Route
            path="*"
            element={
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold">Page Not Found</h2>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
