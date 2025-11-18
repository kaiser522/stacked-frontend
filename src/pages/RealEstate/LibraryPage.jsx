// src/pages/LibraryPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Share2, Eye } from "lucide-react";
import FirstTimeBuyerGuide from "../../components/library/FirstTimeBuyerGuide";
import HomeSellingChecklist from "../../components/library/HomeSellingChecklist";
import MarketAnalysisGuide from "../../components/library/MarketAnalysisGuide";
import ClosingProcessChecklist from "../../components/library/ClosingProcessChecklist";
import BuyerTimelineTracker from "../../components/library/BuyerTimelineTracker";
import SellerTimelineTracker from "../../components/library/SellerTimelineTracker";
import PreApprovalChecklist from "../../components/library/PreApprovalChecklist";
import DNCComplianceGuide from "../../components/library/DNCComplianceGuide";

// Add-on Components
import AutomatedOfferCalculator from "../../components/library/AutomatedOfferCalculator";
import CommissionCalculator from "../../components/library/CommissionCalculator";
import CorporateRelocationTracker from "../../components/library/CorporateRelocationTracker";
import EstateSaleChecklist from "../../components/library/EstateSaleChecklist";
import ExpiredListingGuide from "../../components/library/ExpiredListingGuide";

// Pro Plan Components
import DifficultClientToolkit from "../../components/library/DifficultClientToolkit";
import InvestmentPropertyCalculator from "../../components/library/InvestmentPropertyCalculator";
import LeasePurchaseTracker from "../../components/library/LeasePurchaseTracker";
import LuxuryMarketingGuide from "../../components/library/LuxuryMarketingGuide";
import AIMarketAnalysisTool from "../../components/library/AIMarketAnalysisTool";

// --- Dummy data for library items ---
const initialLibraryItems = [
  {
    id: "firstTimeBuyer",
    category: "buyer guide",
    type: "Guide",
    status: "popular",
    title: "First-Time Buyer Guide",
    description:
      "Comprehensive step-by-step guide for first-time homebuyers covering pre-approval, house hunting, making offers, and closing process.",
    modalContent: {
      title: "First-Time Buyer Guide: Detailed Overview",
      body: `
                <p>This guide provides a thorough walkthrough for individuals looking to purchase their first home. It breaks down the often-complex process into manageable steps.</p>
                <h3>Key Sections:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Understanding Your Finances:</strong> Learn about credit scores, debt-to-income ratios, and saving for a down payment.</li>
                    <li><strong style="color: #f9fafb;">Getting Pre-Approved:</strong> The importance of pre-approval, what documents you'll need, and how it strengthens your offer.</li>
                    <li><strong style="color: #f9fafb;">House Hunting Strategies:</strong> Tips for finding the right property, working with a real estate agent, and understanding your must-haves vs. nice-to-haves.</li>
                    <li><strong style="color: #f9fafb;">Making an Offer:</strong> Crafting a competitive offer, negotiation tactics, and understanding contingencies.</li>
                    <li><strong style="color: #f9fafb;">The Closing Process:</strong> What to expect on closing day, final walkthroughs, and legal considerations.</li>
                </ul>
                <p>This resource is designed to empower first-time buyers with the knowledge they need to navigate the real estate market confidently.</p>
            `,
    },
  },
  {
    id: "sellingChecklist",
    category: "seller checklist",
    type: "Checklist",
    status: "updated",
    title: "Home Selling Checklist",
    description:
      "Complete checklist for sellers covering preparation, staging, pricing, marketing, and closing requirements.",
    modalContent: {
      title: "Home Selling Checklist: Detailed Overview",
      body: `
                <p>Ensure a smooth and successful home sale with this comprehensive checklist. It covers every stage from preparing your home to handing over the keys.</p>
                <h3>Checklist Items:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Pre-Listing Preparation:</strong> Decluttering, repairs, deep cleaning, and curb appeal enhancements.</li>
                    <li><strong style="color: #f9fafb;">Staging Your Home:</strong> Tips for making your home attractive to potential buyers, including depersonalization and optimal furniture arrangement.</li>
                    <li><strong style="color: #f9fafb;">Pricing Strategy:</strong> How to work with your agent to set a competitive price based on market analysis.</li>
                    <li><strong style="color: #f9fafb;">Marketing Your Property:</strong> High-quality photos, virtual tours, open houses, and online listings.</li>
                    <li><strong style="color: #f9fafb;">Managing Offers & Negotiations:</strong> Understanding different offer types and effective negotiation techniques.</li>
                    <li><strong style="color: #f9fafb;">Inspections & Appraisals:</strong> Preparing for and navigating the inspection and appraisal processes.</li>
                    <li><strong style="color: #f9fafb;">Closing Day Requirements:</strong> Final paperwork, utility transfers, and keys handover.</li>
                </ul>
                <p>This checklist is an invaluable tool for sellers to stay organized and informed throughout the selling journey.</p>
            `,
    },
  },
  {
    id: "marketAnalysis",
    category: "market guide",
    type: "Guide",
    status: null,
    title: "Market Analysis Guide",
    description:
      "Learn how to conduct comparative market analysis (CMA) and provide accurate pricing recommendations to clients.",
    modalContent: {
      title: "Market Analysis Guide: Detailed Overview",
      body: `
                <p>This guide teaches real estate professionals the essential skills for conducting a thorough Comparative Market Analysis (CMA). A well-executed CMA is crucial for accurately pricing properties and advising clients.</p>
                <h3>Topics Covered:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Understanding CMA:</strong> What it is, why it's important, and its role in pricing strategies.</li>
                    <li><strong style="color: #f9fafb;">Data Collection:</strong> Identifying comparable properties (comps), sources of market data, and relevant property characteristics.</li>
                    <li><strong style="color: #f9fafb;">Adjusting for Differences:</strong> How to make accurate adjustments for variations in size, features, condition, and location between the subject property and comps.</li>
                    <li><strong style="color: #f9fafb;">Market Trends:</strong> Analyzing current market conditions, including supply and demand, average days on market, and price trends.</li>
                    <li><strong style="color: #f9fafb;">Presenting the CMA:</strong> Effectively communicating your findings and pricing recommendations to clients.</li>
                </ul>
                <p>Mastering market analysis is key to becoming a trusted advisor in the real estate industry.</p>
            `,
    },
  },
  {
    id: "closingProcess",
    category: "process checklist",
    type: "Checklist",
    status: null,
    title: "Closing Process Checklist",
    description:
      "Step-by-step checklist for managing the closing process from contract to keys, ensuring nothing is missed.",
    modalContent: {
      title: "Closing Process Checklist: Detailed Overview",
      body: `
                <p>The closing process can be complex, but this checklist simplifies it, ensuring all necessary steps are taken for a successful transaction.</p>
                <h3>Key Steps:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Contract Execution:</strong> Confirming all parties have signed the purchase agreement.</li>
                    <li><strong style="color: #f9fafb;">Escrow Account Setup:</strong> Depositing earnest money and opening an escrow account.</li>
                    <li><strong style="color: #f9fafb;">Loan Approval & Underwriting:</strong> Monitoring the buyer's loan progress and fulfilling lender requirements.</li>
                    <li><strong style="color: #f9fafb;">Appraisal & Inspection Contingencies:</strong> Addressing any issues arising from the appraisal and home inspection.</li>
                    <li><strong style="color: #f9fafb;">Title Search & Insurance:</strong> Ensuring clear title and obtaining title insurance.</li>
                    <li><strong style="color: #f9fafb;">Final Walkthrough:</strong> Conducting a final inspection of the property before closing.</li>
                    <li><strong style="color: #f9fafb;">Signing Documents:</strong> Guiding clients through the extensive paperwork at the closing table.</li>
                    <li><strong style="color: #f9fafb;">Fund Transfer & Key Handover:</strong> Confirming funds transfer and delivering keys to the new owner.</li>
                </ul>
                <p>This checklist provides peace of mind for both agents and clients during the final stages of a real estate transaction.</p>
            `,
    },
  },
  {
    id: "buyerTimeline",
    category: "buyer process",
    type: "Process",
    status: "new",
    title: "Buyer Timeline Tracker",
    description:
      "Visual timeline tracker showing each stage of the buying process with expected timeframes and milestones.",
    modalContent: {
      title: "Buyer Timeline Tracker: Detailed Overview",
      body: `
                <p>This visual tracker helps buyers understand the typical timeline of a home purchase, from initial thoughts to closing day.</p>
                <h3>Timeline Stages:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Stage 1: Exploration & Preparation</strong> (1-4 weeks): Defining needs, researching neighborhoods, initial financial review.</li>
                    <li><strong style="color: #f9fafb;">Stage 2: Pre-Approval & Agent Search</strong> (1-2 weeks): Securing pre-approval, interviewing and selecting a real estate agent.</li>
                    <li><strong style="color: #f9fafb;">Stage 3: House Hunting</strong> (4-12+ weeks): Viewing properties, market analysis, refining search criteria.</li>
                    <li><strong style="color: #f9fafb;">Stage 4: Offer & Negotiation</strong> (1-2 weeks): Submitting offers, counter-offers, reaching an agreement.</li>
                    <li><strong style="color: #f9fafb;">Stage 5: Under Contract</strong> (4-8 weeks): Home inspection, appraisal, loan underwriting, title search.</li>
                    <li><strong style="color: #f9fafb;">Stage 6: Closing</strong> (1-3 days): Final walkthrough, signing documents, fund transfer, key handover.</li>
                </ul>
                <p>Understanding this timeline helps set realistic expectations and reduces stress for homebuyers.</p>
            `,
    },
  },
  {
    id: "sellerTimeline",
    category: "seller process",
    type: "Process",
    status: "new",
    title: "Seller Timeline Tracker",
    description:
      "Timeline guide for sellers showing preparation, listing, marketing, and closing phases with key milestones.",
    modalContent: {
      title: "Seller Timeline Tracker: Detailed Overview",
      body: `
                <p>This guide outlines the typical timeline for selling a home, from decision to sale, helping sellers anticipate each phase.</p>
                <h3>Timeline Stages:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Stage 1: Decision & Agent Selection</strong> (1-2 weeks): Deciding to sell, researching and hiring a real estate agent.</li>
                    <li><strong style="color: #f9fafb;">Stage 2: Preparation & Staging</strong> (2-6 weeks): Repairs, decluttering, cleaning, staging, professional photography.</li>
                    <li><strong style="color: #f9fafb;">Stage 3: Listing & Marketing</strong> (1-2 weeks): Listing property, launching marketing campaigns (online, open houses).</li>
                    <li><strong style="color: #f9fafb;">Stage 4: Showings & Offers</strong> (Weeks to Months): Conducting showings, receiving and evaluating offers.</li>
                    <li><strong style="color: #f9fafb;">Stage 5: Under Contract</strong> (4-8 weeks): Inspections, appraisals, buyer financing, contingency removals.</li>
                    <li><strong style="color: #f9fafb;">Stage 6: Closing</strong> (1-3 days): Final walkthrough, signing closing documents, fund transfer, key delivery.</li>
                </ul>
                <p>This tracker helps sellers stay organized and on track for a timely and efficient sale.</p>
            `,
    },
  },
  {
    id: "preApproval",
    category: "buyer checklist",
    type: "Checklist",
    status: null,
    title: "Pre-Approval Checklist",
    description:
      "Essential documents and steps for mortgage pre-approval to help buyers prepare for financing.",
    modalContent: {
      title: "Pre-Approval Checklist: Detailed Overview",
      body: `
                <p>Getting pre-approved for a mortgage is a critical first step for homebuyers. This checklist ensures you have all the necessary information and documents ready.</p>
                <h3>Required Documents & Information:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Personal Identification:</strong> Photo ID, Social Security Number.</li>
                    <li><strong style="color: #f9fafb;">Income Verification:</strong> Pay stubs (last 30-60 days), W-2 forms (last two years), tax returns (last two years if self-employed or complex income).</li>
                    <li><strong style="color: #f9fafb;">Asset Information:</strong> Bank statements (checking, savings), investment account statements, retirement account statements.</li>
                    <li><strong style="color: #f9fafb;">Debt Information:</strong> Credit card statements, student loan statements, auto loan statements, other loan agreements.</li>
                    <li><strong style="color: #f9fafb;">Employment History:</strong> Employment verification letters, contact information for employers (past 2 years).</li>
                    <li><strong style="color: #f9fafb;">Other:</strong> Renting history (if applicable), divorce decrees (if applicable).</li>
                </ul>
                <p>Having these items prepared will significantly speed up the pre-approval process and set you up for success in your home search.</p>
            `,
    },
  },
  {
    id: "dncCompliance",
    category: "compliance guide",
    type: "Guide",
    status: "updated",
    title: "DNC Compliance Guide",
    description:
      "Complete guide to Do Not Call regulations, dialer requirements, and texting compliance for real estate professionals.",
    modalContent: {
      title: "DNC Compliance Guide: Detailed Overview",
      body: `
                <p>This comprehensive guide covers all aspects of Do Not Call (DNC) compliance for real estate professionals using calling and texting platforms. Understanding these regulations is critical to avoid massive penalties and protect your business.</p>
                <h3>Key Topics Covered:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">TCPA Regulations:</strong> Understanding the Telephone Consumer Protection Act and its requirements for autodialed calls and text messages.</li>
                    <li><strong style="color: #f9fafb;">National DNC Registry:</strong> How to access, maintain, and scrub against the registry ($67 per area code annually).</li>
                    <li><strong style="color: #f9fafb;">Consent Requirements:</strong> Prior express written consent requirements and documentation standards.</li>
                    <li><strong style="color: #f9fafb;">Time Restrictions:</strong> Federal and state calling time limitations (8 AM - 9 PM recipient's local time).</li>
                    <li><strong style="color: #f9fafb;">Penalty Structure:</strong> Up to $46,517 per violation, with real-world examples and case studies.</li>
                    <li><strong style="color: #f9fafb;">Compliance Checklists:</strong> Daily, monthly, and emergency response procedures.</li>
                    <li><strong style="color: #f9fafb;">Common Violations:</strong> Real scenarios that result in penalties and how to avoid them.</li>
                    <li><strong style="color: #f9fafb;">Established Business Relationship:</strong> Understanding EBR exceptions and requirements.</li>
                </ul>
                <p><strong style="color: #f9fafb;">Critical Warning:</strong> Violations can cost up to $46,517 per illegal call or text. In 2023, a real estate company paid $3.2 million for unsolicited calls without proper consent.</p>
                <p>This guide is essential for any real estate professional using dialers, texting platforms, or making marketing calls to ensure full compliance with federal regulations.</p>
            `,
    },
  },
  // Add-on Items
  {
    id: "automatedOfferCalculator",
    category: "addon calculator",
    type: "Calculator",
    status: "new",
    title: "AI Offer Calculator",
    description:
      "Smart offer recommendations based on market data, property condition, and competition analysis.",
    modalContent: {
      title: "AI Offer Calculator: Detailed Overview",
      body: `
                <p>This advanced calculator uses AI algorithms to provide intelligent offer recommendations based on comprehensive market analysis and property-specific factors.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Market Analysis:</strong> Real-time market heat level and competition assessment</li>
                    <li><strong style="color: #f9fafb;">Property Evaluation:</strong> Condition, desirability, and unique features analysis</li>
                    <li><strong style="color: #f9fafb;">Smart Recommendations:</strong> AI-powered offer suggestions with confidence levels</li>
                    <li><strong style="color: #f9fafb;">Strategic Tips:</strong> Personalized advice for competitive offers</li>
                </ul>
                <p>This tool helps agents make data-driven decisions and present compelling offers to their clients.</p>
            `,
    },
  },
  {
    id: "commissionCalculator",
    category: "addon calculator",
    type: "Calculator",
    status: "new",
    title: "Smart Commission Calculator",
    description:
      "Calculate commissions, splits, and annual projections with advanced brokerage comparison tools.",
    modalContent: {
      title: "Smart Commission Calculator: Detailed Overview",
      body: `
                <p>Comprehensive commission calculation tool with multiple scenarios including single transactions, annual projections, and brokerage split comparisons.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Transaction Calculator:</strong> Single sale commission calculations with custom splits</li>
                    <li><strong style="color: #f9fafb;">Annual Projections:</strong> Income forecasting based on transaction volume</li>
                    <li><strong style="color: #f9fafb;">Split Comparison:</strong> Compare different brokerage structures</li>
                    <li><strong style="color: #f9fafb;">Quick Presets:</strong> Common transaction scenarios for fast calculations</li>
                </ul>
                <p>Essential tool for agents to understand their earning potential and make informed decisions about brokerage relationships.</p>
            `,
    },
  },
  {
    id: "corporateRelocationTracker",
    category: "addon process",
    type: "Process",
    status: "new",
    title: "Corporate Relocation Tracker",
    description:
      "90-day timeline tracker for company-sponsored relocations with contact coordination and expense documentation.",
    modalContent: {
      title: "Corporate Relocation Tracker: Detailed Overview",
      body: `
                <p>Comprehensive 90-day process tracker for managing corporate relocations including multiple stakeholders, temporary housing, and expense reimbursement.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Contact Management:</strong> Organized directory for all parties involved</li>
                    <li><strong style="color: #f9fafb;">Timeline Tracking:</strong> 90-day process with milestone checkpoints</li>
                    <li><strong style="color: #f9fafb;">Expense Documentation:</strong> Detailed tracking for reimbursement</li>
                    <li><strong style="color: #f9fafb;">Progress Monitoring:</strong> Real-time completion tracking</li>
                </ul>
                <p>Essential for managing complex corporate relocations with multiple approvals and extended timelines.</p>
            `,
    },
  },
  {
    id: "estateSaleChecklist",
    category: "addon checklist",
    type: "Checklist",
    status: "new",
    title: "Estate Sale Checklist",
    description:
      "Complete checklist for managing estate sales and property liquidation with legal and financial considerations.",
    modalContent: {
      title: "Estate Sale Checklist: Detailed Overview",
      body: `
                <p>Comprehensive checklist for managing estate sales including legal documentation, property preparation, and financial planning considerations.</p>
                <h3>Key Sections:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Legal Documentation:</strong> Probate documents and estate authorization</li>
                    <li><strong style="color: #f9fafb;">Property Assessment:</strong> Professional appraisal and condition evaluation</li>
                    <li><strong style="color: #f9fafb;">Sale Preparation:</strong> Cleanup, staging, and marketing setup</li>
                    <li><strong style="color: #f9fafb;">Financial Planning:</strong> Tax implications and proceeds distribution</li>
                </ul>
                <p>Critical resource for handling sensitive estate sales with proper legal and financial considerations.</p>
            `,
    },
  },
  {
    id: "expiredListingGuide",
    category: "addon guide",
    type: "Guide",
    status: "new",
    title: "Expired Listing Guide",
    description:
      "Strategic approach to converting expired listings into new opportunities with proven conversion techniques.",
    modalContent: {
      title: "Expired Listing Guide: Detailed Overview",
      body: `
                <p>Strategic guide for approaching expired listings with proven techniques for converting them into new listing opportunities.</p>
                <h3>Key Strategies:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Initial Contact:</strong> Professional approach and value proposition</li>
                    <li><strong style="color: #f9fafb;">Market Analysis:</strong> Comprehensive pricing and positioning strategy</li>
                    <li><strong style="color: #f9fafb;">Marketing Plan:</strong> Enhanced marketing approach for re-listing</li>
                    <li><strong style="color: #f9fafb;">Follow-up Process:</strong> Systematic conversion techniques</li>
                </ul>
                <p>Proven methods for turning expired listings into successful new opportunities with motivated sellers.</p>
            `,
    },
  },
  // Pro Plan Items
  {
    id: "difficultClientToolkit",
    category: "pro plan",
    type: "Toolkit",
    status: "pro",
    title: "Difficult Client Management Toolkit",
    description:
      "Professional scripts, strategies, and documentation tools for handling challenging client situations while protecting yourself legally.",
    modalContent: {
      title: "Difficult Client Management Toolkit: Detailed Overview",
      body: `
                <p>This comprehensive toolkit provides real estate professionals with the scripts, strategies, and documentation tools needed to handle difficult client situations while maintaining professionalism and legal protection.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Professional Scripts:</strong> Word-for-word responses for common difficult scenarios including unrealistic sellers, impossible-to-please buyers, and demanding clients</li>
                    <li><strong style="color: #f9fafb;">Boundary Setting:</strong> Clear guidelines for establishing and maintaining professional boundaries from day one</li>
                    <li><strong style="color: #f9fafb;">De-escalation Techniques:</strong> The LEAP method for calming emotional situations and maintaining relationships</li>
                    <li><strong style="color: #f9fafb;">Documentation Forms:</strong> Incident documentation templates for legal protection</li>
                    <li><strong style="color: #f9fafb;">Termination Process:</strong> Professional guidelines for ending client relationships when necessary</li>
                    <li><strong style="color: #f9fafb;">Legal Protection:</strong> Strategies for protecting yourself legally in difficult situations</li>
                </ul>
                <p><strong style="color: #f9fafb;">Critical Warning:</strong> Always document difficult interactions. What isn't documented didn't happen in legal disputes.</p>
                <p>This toolkit is essential for any real estate professional who wants to handle challenging situations with confidence while protecting their business and reputation.</p>
            `,
    },
  },
  {
    id: "investmentPropertyCalculator",
    category: "pro plan",
    type: "Calculator",
    status: "pro",
    title: "Investment Property Calculator",
    description:
      "ROI analysis tool covering cash flow projections, cap rates, BRRRR strategy, and rental market analysis for investor clients.",
    modalContent: {
      title: "Investment Property Calculator: Detailed Overview",
      body: `
                <p>This advanced calculator helps real estate professionals analyze investment properties and provide comprehensive ROI analysis to investor clients.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Cash Flow Analysis:</strong> Calculate monthly and annual cash flow including all expenses</li>
                    <li><strong style="color: #f9fafb;">Cap Rate Calculator:</strong> Determine capitalization rates for property valuation</li>
                    <li><strong style="color: #f9fafb;">Cash-on-Cash Return:</strong> Calculate return on actual cash invested</li>
                    <li><strong style="color: #f9fafb;">1% Rule Check:</strong> Quick screening tool for cash flow potential</li>
                    <li><strong style="color: #f9fafb;">BRRRR Strategy:</strong> Buy, Rehab, Rent, Refinance, Repeat analysis</li>
                    <li><strong style="color: #f9fafb;">Investment Recommendations:</strong> AI-powered investment quality assessment</li>
                </ul>
                <p>Essential tool for working with investor clients and providing data-driven investment analysis.</p>
            `,
    },
  },
  {
    id: "leasePurchaseTracker",
    category: "pro plan",
    type: "Tracker",
    status: "pro",
    title: "Lease-to-Purchase Tracker",
    description:
      "Workflow for rent-to-own transactions including option fees, credit requirements, maintenance responsibilities, and conversion timelines.",
    modalContent: {
      title: "Lease-to-Purchase Tracker: Detailed Overview",
      body: `
                <p>Comprehensive workflow tracker for managing lease-to-purchase (rent-to-own) transactions from agreement setup through final conversion.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Agreement Structure:</strong> Document key terms including option fees, rent credits, and purchase prices</li>
                    <li><strong style="color: #f9fafb;">Timeline Tracking:</strong> 24-month milestone tracker with status updates</li>
                    <li><strong style="color: #f9fafb;">Financial Monitoring:</strong> Track accumulated rent credits and equity building</li>
                    <li><strong style="color: #f9fafb;">Requirements Checklist:</strong> Credit improvement, maintenance, and purchase preparation tracking</li>
                    <li><strong style="color: #f9fafb;">Risk Assessment:</strong> Benefits and risks analysis for both parties</li>
                    <li><strong style="color: #f9fafb;">Legal Considerations:</strong> Important legal implications and attorney consultation recommendations</li>
                </ul>
                <p><strong style="color: #f9fafb;">Legal Notice:</strong> Lease-to-purchase agreements have complex legal implications. Always recommend clients consult with a real estate attorney before proceeding.</p>
                <p>Essential for managing complex rent-to-own transactions with proper documentation and timeline tracking.</p>
            `,
    },
  },
  {
    id: "luxuryMarketingGuide",
    category: "pro plan",
    type: "Guide",
    status: "pro",
    title: "Luxury Home Marketing Guide",
    description:
      "Advanced marketing strategies for high-end properties including professional photography requirements, luxury staging tips, and affluent buyer targeting.",
    modalContent: {
      title: "Luxury Home Marketing Guide: Detailed Overview",
      body: `
                <p>Comprehensive guide for marketing luxury properties with advanced strategies, professional requirements, and affluent buyer targeting techniques.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Luxury Marketing Strategy:</strong> Exclusivity, lifestyle marketing, and white-glove service approaches</li>
                    <li><strong style="color: #f9fafb;">Professional Photography:</strong> High-end photography requirements including drone shots and 3D tours</li>
                    <li><strong style="color: #f9fafb;">Luxury Staging:</strong> Sophisticated staging principles and professional staging checklists</li>
                    <li><strong style="color: #f9fafb;">Pricing Strategies:</strong> Aspirational, market value, and strategic underpricing approaches</li>
                    <li><strong style="color: #f9fafb;">Buyer Personas:</strong> Executive, empty nester, investor, and family upgrader targeting</li>
                    <li><strong style="color: #f9fafb;">Network Building:</strong> Relationships with wealth managers, private bankers, and luxury service providers</li>
                </ul>
                <p>Essential for real estate professionals working in luxury markets and targeting high-net-worth clients.</p>
            `,
    },
  },
  {
    id: "marketActivityTracker",
    category: "pro plan",
    type: "Analyzer",
    status: "pro",
    title: "AI Market Analysis Tool",
    description:
      "AI-powered market analysis tool that provides intelligent insights based on local market conditions, agent activity, and market observations.",
    modalContent: {
      title: "AI Market Analysis Tool: Detailed Overview",
      body: `
                <p>Advanced AI-powered market analysis tool that provides intelligent insights and recommendations based on local market conditions and agent observations.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li><strong style="color: #f9fafb;">Market Temperature Assessment:</strong> AI analysis of market heat levels and competition</li>
                    <li><strong style="color: #f9fafb;">Inventory Analysis:</strong> Supply and demand assessment with trend indicators</li>
                    <li><strong style="color: #f9fafb;">Buyer Demand Tracking:</strong> Real-time demand analysis and buyer behavior insights</li>
                    <li><strong style="color: #f9fafb;">Price Trend Analysis:</strong> Market direction and pricing strategy recommendations</li>
                    <li><strong style="color: #f9fafb;">Negotiation Power Assessment:</strong> Market conditions favoring buyers or sellers</li>
                    <li><strong style="color: #f9fafb;">Strategic Recommendations:</strong> AI-generated insights for market positioning</li>
                </ul>
                <p>Powerful tool for providing data-driven market insights to clients and making informed business decisions.</p>
            `,
    },
  },
];

// --- Notification Component ---
const Notification = ({ message, show }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Allow fade-out animation
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div
      className={`fixed top-5 right-5 bg-stacked-primary text-stacked-black px-5 py-4 rounded-lg font-medium transition-transform duration-300 z-[3000]
            ${isVisible ? "translate-x-0" : "translate-x-[400px]"}`}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {message}
    </div>
  );
};

// --- Modal Component ---
const Modal = ({ isOpen, onClose, title, body }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-[var(--dark-bg)] text-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-4xl max-h-[85vh] overflow-y-auto relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-[var(--primary-color)] hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div
          className="text-sm md:text-base text-gray-300 leading-relaxed prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </div>,
    document.body
  );
};

// --- LibraryCard Component ---
const LibraryCard = ({ item, openComponent, downloadResource, shareResource }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "new":
        return "bg-[var(--medium-dark)] text-blue-300";
      case "updated":
        return "bg-[var(--medium-dark)] text-green-600";
      case "popular":
        return "bg-[var(--medium-dark)] text-yellow-300";
      default:
        return "hidden";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "Guide":
        return (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-5 h-5  text-white"
          >
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V4.804z" />
          </svg>
        );
      case "Checklist":
        return (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-5 h-5 text-white"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "Process":
        return (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-5 h-5 text-white"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-[var(--dark-bg)] rounded-xl p-6 transition-all duration-200 border border-transparent cursor-pointer hover:translate-y-[-2px] hover:border-stacked-primary hover:shadow-lg hover:shadow-stacked-primary/[0.1]"
      onClick={() => openComponent(item.id)}
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center mr-4">
          {getIcon(item.type)}
        </div>
        <div>
          <div className="text-lg font-semibold text-white">{item.title}</div>
        </div>
        <div className="text-xs text-[var(--primary-color)] bg-[var(--medium-dark)] px-2 py-1 rounded uppercase font-medium ml-auto">
          {item.type}
        </div>
        {item.status && (
          <span
            className={`text-[10px] px-2 py-0.5 rounded ml-2 font-semibold ${getStatusBadgeClass(
              item.status
            )}`}
          >
            {item.status}
          </span>
        )}
      </div>
      <p className="text-gray-400 leading-normal mb-5">{item.description}</p>
      <div className="flex gap-2">
        <button
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all duration-200 bg-[var(--primary-color)] text-stacked-black hover:bg-stacked-primary-dark"
          onClick={(e) => {
            e.stopPropagation();
            downloadResource(item.title);
          }}
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Download
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all duration-200 bg-transparent text-gray-300 border border-[var(--primary-color)] hover:bg-stacked-border hover:text-stacked-white"
          onClick={(e) => {
            e.stopPropagation();
            openComponent(item.id);
          }}
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all duration-200 bg-transparent text-gray-300 border border-[var(--primary-color)] hover:bg-stacked-border hover:text-stacked-white"
          onClick={(e) => {
            e.stopPropagation();
            shareResource(item.title);
          }}
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
};

// --- LibraryGrid Component ---
const LibraryGrid = ({ items, openComponent, downloadResource, shareResource }) => {
  if (items.length === 0) {
    return (
      <div className="text-center text-stacked-text-light text-lg mt-10">
        No resources found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => (
        <LibraryCard
          key={item.id}
          item={item}
          openComponent={openComponent}
          downloadResource={downloadResource}
          shareResource={shareResource}
        />
      ))}
    </div>
  );
};

// --- Library Page Component ---
const componentMap = {
  firstTimeBuyer: FirstTimeBuyerGuide,
  sellingChecklist: HomeSellingChecklist,
  marketAnalysis: MarketAnalysisGuide,
  closingProcess: ClosingProcessChecklist,
  buyerTimeline: BuyerTimelineTracker,
  sellerTimeline: SellerTimelineTracker,
  preApproval: PreApprovalChecklist,
  dncCompliance: DNCComplianceGuide,
  // Add-on Components
  automatedOfferCalculator: AutomatedOfferCalculator,
  commissionCalculator: CommissionCalculator,
  corporateRelocationTracker: CorporateRelocationTracker,
  estateSaleChecklist: EstateSaleChecklist,
  expiredListingGuide: ExpiredListingGuide,
  // Pro Plan Components
  difficultClientToolkit: DifficultClientToolkit,
  investmentPropertyCalculator: InvestmentPropertyCalculator,
  leasePurchaseTracker: LeasePurchaseTracker,
  luxuryMarketingGuide: LuxuryMarketingGuide,
  marketActivityTracker: AIMarketAnalysisTool,
};

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePlan, setActivePlan] = useState("starter"); // New state for plan tabs
  const [filteredItems, setFilteredItems] = useState(initialLibraryItems);
  const [notification, setNotification] = useState({
    message: "",
    show: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalContent, setCurrentModalContent] = useState(null);
  const [activeComponentId, setActiveComponentId] = useState(null);

  useEffect(() => {
    let items = initialLibraryItems;

    // Filter by plan level first
    if (activePlan === "starter") {
      items = items.filter((item) => !item.category.includes("addon") && !item.category.includes("pro plan"));
    } else if (activePlan === "power") {
      items = items.filter((item) => item.category.includes("addon"));
    } else if (activePlan === "pro") {
      items = items.filter((item) => item.category.includes("pro plan"));
    }

    // Filter by category/type
    if (activeCategory !== "all") {
      items = items.filter((item) => {
        // For Pro Plan and Power Plan, check the type field
        if (activePlan === "pro" || activePlan === "power") {
          return item.type.toLowerCase().includes(activeCategory.toLowerCase()) ||
            item.category.toLowerCase().includes(activeCategory.toLowerCase());
        }
        // For Starter Plan, check the category field
        return item.category.includes(activeCategory);
      });
    }

    // Filter by search term
    if (searchTerm) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredItems(items);
  }, [searchTerm, activeCategory, activePlan]);

  const showNotification = (message) => {
    setNotification({ message, show: true });
    setTimeout(() => {
      setNotification({ message: "", show: false });
    }, 3000);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // openModal function removed as View now opens component directly

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentModalContent(null);
  };

  const downloadResource = async (resourceName) => {
    // Enhanced file mapping with all available files
    const titleToFileMap = {
      "First-Time Buyer Guide": "first_time_buyer_guide.html",
      "Home Selling Checklist": "home_selling_checklist.html",
      "Market Analysis Guide": "market_analysis_guide.html",
      "Closing Process Checklist": "closing_process_checklist.html",
      "Buyer Timeline Tracker": "buyer_timeline_tracker.html",
      "Seller Timeline Tracker": "seller_timeline_tracker.html",
      "Pre-Approval Checklist": "preapproval_checklist.html",
      "DNC Compliance Guide": "dnc_compliance_guide_fixed.html",
      "AI Offer Calculator": "Automated Offer Calculator  (1).html",
      "Smart Commission Calculator": "commission_calculator (1).html",
      "Corporate Relocation Tracker": "corporate_relocation_tracker (1).html",
      "Estate Sale Checklist": "estate_sale_checklist (1).html",
      "Expired Listing Guide": "expired_listing_guide (1).html",
      // Pro Plan Items
      "Difficult Client Management Toolkit": "difficult_client_toolkit.html",
      "Investment Property Calculator": "investment_property_calculator.html",
      "Lease-to-Purchase Tracker": "lease_purchase_tracker.html",
      "Luxury Home Marketing Guide": "luxury_marketing_guide.html",
      "AI Market Analysis Tool": "market_activity_tracker.html",
    };

    const fileName = titleToFileMap[resourceName];

    if (!fileName) {
      console.error(`No file mapped for resource: ${resourceName}`);
      showNotification(`Unable to download "${resourceName}"`);
      return;
    }

    try {
      // Fetch the file content
      const response = await fetch(`/${fileName}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${fileName}`);
      }

      let content = await response.text();

      // Add compliance banner to the content (matching the style from first_time_buyer_guide.html)
      const complianceBanner = `
    <div style="background:#1E2A38; border-top:1px solid #334155; padding:16px 24px;">
        <div style="max-width:72rem; margin:0 auto;">
            <p style="font-size:12px; color:#9CA3AF; text-align:center; line-height:1.6;">
                <strong style="color:#D1D5DB;">Disclaimer:</strong> This template is for business use only and does not
                constitute legal advice. Stacked Technologies, LLC is not a law firm. Users are responsible for
                confirming compliance with all applicable local, state, and federal laws.
            </p>
        </div>
    </div>
      `;

      // Check if compliance banner already exists, if not add it before closing body tag
      if (!content.includes('Stacked Technologies, LLC is not a law firm')) {
        content = content.replace(/<\/body>/i, complianceBanner + '</body>');
      }

      // Create and download the modified file
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showNotification(`Downloading "${resourceName}" with compliance banner...`);
    } catch (error) {
      console.error('Download error:', error);
      showNotification(`Error downloading "${resourceName}". Please try again.`);
    }
  };

  const generateDNCHTMLContent = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DNC Compliance Guide - Real Estate Professionals</title>
    <style>
        * {
            box-sizing: border-box;
        }
        html {
            background-color: #0f172a !important;
            background: #0f172a !important;
        }
        body {
            background-color: #0f172a !important;
            background: #0f172a !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .modal {
            background: #0b1220;
            border: 1px solid rgba(148,163,184,0.15);
            border-radius: 16px;
            padding: 32px;
            color: #e5e7eb;
            box-shadow: 0 20px 40px rgba(0,0,0,0.45);
        }
        .header-simple { text-align: center; margin-bottom: 24px; }
        .icon-circle {
            width: 64px; height: 64px; border-radius: 16px; margin: 0 auto 16px auto;
            background: linear-gradient(135deg, #06b6d4, #10b981);
            display:flex; align-items:center; justify-content:center; color:#fff; font-size:28px; font-weight:700;
        }
        .title-gradient {
            font-size: 40px; font-weight: 800; margin: 0 0 12px 0;
            background: linear-gradient(90deg,#60a5fa,#34d399);
            -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .chip {
            display:inline-block; padding:10px 16px; border-radius:9999px; font-weight:600;
            background: linear-gradient(135deg,#6366f1,#8b5cf6); color:#fff; margin-bottom:12px;
        }
        .muted { color: #9ca3af; }
        .read-pill { display:inline-block; margin-top:8px; padding:10px 16px; border-radius:12px; background:#111827; color:#cbd5e1; font-weight:700; }
        .header h1 {
            font-size: 2.5rem;
            margin: 0 0 10px 0;
        }
        .header .badge {
            background: rgba(255,255,255,0.2);
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-block;
            margin: 10px 0;
        }
        .warning-box {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin: 30px 0;
            text-align: center;
        }
        .warning-box h2 {
            font-size: 1.8rem;
            margin: 0 0 15px 0;
        }
        .section {
            background: white !important;
            padding: 30px;
            border-radius: 10px;
            margin: 20px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .section h2 {
            color: #4a5568;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .regulations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .regulation-card {
            background: #f7fafc !important;
            border: 2px solid #667eea;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .regulation-card h3 {
            color: #667eea;
            margin: 0 0 10px 0;
        }
        .penalty-box {
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            margin: 20px 0;
        }
        .penalty-amount {
            font-size: 3rem;
            font-weight: bold;
            color: #d97706;
            margin: 10px 0;
        }
        .checklist {
            background: #f0fff4 !important;
            border-left: 4px solid #48bb78;
            padding: 20px;
            margin: 15px 0;
        }
        .checklist-item {
            margin: 10px 0;
            padding: 10px;
            background: white !important;
            border-radius: 5px;
        }
        .checklist-item strong {
            color: #2d3748;
        }
        .rules-list {
            background: #fef5e7 !important;
            border: 2px solid #f6ad55;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .rule-item {
            background: rgba(255,255,255,0.7) !important;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            display: flex;
            align-items: flex-start;
        }
        .rule-number {
            background: #f6ad55;
            color: #2d3748;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
        }
        .time-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
            margin: 20px 0;
        }
        .time-header {
            background: #667eea;
            color: white;
            padding: 10px;
            text-align: center;
            border-radius: 5px;
            font-weight: bold;
        }
        .time-cell {
            padding: 10px;
            text-align: center;
            border-radius: 5px;
            font-size: 0.9rem;
        }
        .time-allowed {
            background: rgba(72, 187, 120, 0.3);
            border: 1px solid #48bb78;
        }
        .time-prohibited {
            background: rgba(245, 101, 101, 0.3);
            border: 1px solid #f56565;
        }
        .violation-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        .violation-box {
            padding: 20px;
            border-radius: 10px;
        }
        .violation-red {
            background: rgba(245, 101, 101, 0.2);
            border: 2px solid #f56565;
        }
        .violation-green {
            background: rgba(72, 187, 120, 0.2);
            border: 2px solid #48bb78;
        }
        .violation-box h4 {
            margin: 0 0 10px 0;
            font-size: 1.1rem;
        }
        .checklists-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .checklist-card {
            background: white !important;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .emergency-item {
            text-align: center;
            padding: 20px;
            background: #f7fafc !important;
            border-radius: 10px;
            margin: 10px 0;
        }
        .emergency-icon {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #2d3748 !important;
            color: white;
            border-radius: 10px;
        }
        @media (max-width: 768px) {
            .violation-grid, .checklists-grid {
                grid-template-columns: 1fr;
            }
            .regulations-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container modal">
      <div class="header-simple">
        <div class="icon-circle">⚖️</div>
        <h1 class="title-gradient">DNC Compliance Guide</h1>
        <div class="chip">Legal Compliance</div>
        <p class="muted">Complete guide to Do Not Call regulations, dialer requirements, and texting compliance for real estate professionals.</p>
        <div class="read-pill">25 min read</div>
      </div>

    <div class="warning-box">
        <h2>⚠️ Critical Warning</h2>
        <p><strong>Violations can cost up to $46,517 per illegal call or text</strong></p>
        <p>The Do Not Call (DNC) registry and related regulations protect consumers from unwanted marketing calls and texts. For real estate professionals using calling and texting platforms, compliance isn't optional—it's critical to avoid massive penalties and protect your business reputation.</p>
    </div>

    <div class="section">
        <h2>Key Regulations Overview</h2>
        <div class="regulations-grid">
            <div class="regulation-card">
                <h3>⚖️ TCPA (1991)</h3>
                <p>Telephone Consumer Protection Act - Regulates autodialed calls, prerecorded messages, and text messages to cell phones</p>
            </div>
            <div class="regulation-card">
                <h3>📄 TSR (1995)</h3>
                <p>Telemarketing Sales Rule - Governs telemarketing practices and maintains the National DNC Registry</p>
            </div>
            <div class="regulation-card">
                <h3>📧 CAN-SPAM (2003)</h3>
                <p>Controls commercial email and extends to SMS marketing with consent and opt-out requirements</p>
            </div>
        </div>
    </div>

    <div class="penalty-box">
        <h2>💰 Penalty Structure</h2>
        <div class="penalty-amount">Up to $46,517</div>
        <p>Per violation for TCPA infractions. Multiply this by hundreds of calls and you could face millions in penalties.</p>
        <p><strong>Recent Example:</strong> In 2023, a real estate company paid $3.2 million for making unsolicited calls to cell phones without consent.</p>
    </div>

    <div class="section">
        <h2>National DNC Registry Requirements</h2>
        <p>The National Do Not Call Registry is maintained by the FTC and must be checked regularly:</p>
        
        <div class="checklist">
            <h3>DNC Registry Compliance Checklist</h3>
            <div class="checklist-item">
                <strong>Access National DNC Registry</strong><br>
                Download lists every 31 days maximum ($67 per area code annually)
            </div>
            <div class="checklist-item">
                <strong>Scrub Contact Lists</strong><br>
                Remove all registered numbers before calling (automated scrubbing recommended)
            </div>
            <div class="checklist-item">
                <strong>Maintain Records</strong><br>
                Keep documentation of registry access and list cleaning for 5 years
            </div>
            <div class="checklist-item">
                <strong>Handle Internal DNC</strong><br>
                Maintain your own suppression list of people who requested no contact
            </div>
            <div class="checklist-item">
                <strong>State Registry Check</strong><br>
                Some states maintain additional DNC registries (Texas, Florida, etc.)
            </div>
        </div>

        <div style="background: #f0fff4; border: 1px solid #48bb78; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: #48bb78; margin: 0 0 10px 0;">✅ Established Business Relationship (EBR) Exception</h4>
            <p>You can call people on the DNC registry if you have an established business relationship within the last 18 months, but you must honor any request to stop calling immediately.</p>
        </div>
    </div>

    <div class="section">
        <h2>Dialer Compliance Requirements</h2>
        <p>Automatic dialing systems have strict legal requirements under the TCPA:</p>
        
        <div class="rules-list">
            <h3>TCPA Dialer Rules</h3>
            <div class="rule-item">
                <div class="rule-number">1</div>
                <div>
                    <strong>Prior Express Written Consent Required</strong><br>
                    Must have signed, written consent before using autodialers to call cell phones for marketing
                </div>
            </div>
            <div class="rule-item">
                <div class="rule-number">2</div>
                <div>
                    <strong>Clear Opt-Out Mechanism</strong><br>
                    Every call must include instructions on how to stop future calls (usually 'Reply STOP')
                </div>
            </div>
            <div class="rule-item">
                <div class="rule-number">3</div>
                <div>
                    <strong>Caller ID Requirements</strong><br>
                    Must display accurate caller identification and callback number
                </div>
            </div>
            <div class="rule-item">
                <div class="rule-number">4</div>
                <div>
                    <strong>Time Restrictions</strong><br>
                    Calls only allowed 8 AM to 9 PM recipient's local time
                </div>
            </div>
            <div class="rule-item">
                <div class="rule-number">5</div>
                <div>
                    <strong>Agent Availability</strong><br>
                    Live agent must be available within 2 seconds of recipient answering
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Calling Time Restrictions</h2>
        <p>Federal and state laws restrict when you can make telemarketing calls:</p>
        
        <div style="background: #f7fafc; border: 2px solid #667eea; padding: 20px; border-radius: 10px;">
            <h3 style="color: #667eea; margin: 0 0 15px 0;">Federal Time Restrictions</h3>
            <p>Calls permitted 8:00 AM - 9:00 PM in recipient's time zone</p>
            
            <div class="time-grid">
                <div class="time-header">Time</div>
                <div class="time-header">Mon</div>
                <div class="time-header">Tue</div>
                <div class="time-header">Wed</div>
                <div class="time-header">Thu</div>
                <div class="time-header">Fri</div>
                <div class="time-header">Sat</div>
                
                <div class="time-cell">6-8 AM</div>
                <div class="time-cell time-prohibited">❌</div>
                <div class="time-cell time-prohibited">❌</div>
                <div class="time-cell time-prohibited">❌</div>
                <div class="time-cell time-prohibited">❌</div>
                <div class="time-cell time-prohibited">❌</div>
                <div class="time-cell time-prohibited">❌</div>
                
                <div class="time-cell">8AM-9PM</div>
                <div class="time-cell time-allowed">✅</div>
                <div class="time-cell time-allowed">✅</div>
                <div class="time-cell time-allowed">✅</div>
                <div class="time-cell time-allowed">✅</div>
                <div class="time-cell time-allowed">✅</div>
                <div class="time-cell time-allowed">✅</div>
                
                <div class="time-cell">9PM-12AM</div>
                <div class="time-cell time-prohibited">❌</div>
                <div class="time-cell time-prohibited">❌</div>
                <div class="time-cell time-prohibited">❌</div>
                <div class="time-cell time-prohibited">❌</div>
                <div class="time-cell time-prohibited">❌</div>
                <div class="time-cell time-prohibited">❌</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Common Violations to Avoid</h2>
        <p>Real-world scenarios that frequently result in penalties:</p>
        
        <div class="violation-grid">
            <div class="violation-box violation-red">
                <h4>❌ Violation</h4>
                <p>Texting leads from purchased lists without explicit text consent</p>
                <p><strong>Penalty: $1,500+ per text</strong></p>
            </div>
            <div class="violation-box violation-green">
                <h4>✅ Solution</h4>
                <p>Only text contacts who explicitly opted in through your forms or gave written consent</p>
            </div>
        </div>
        
        <div class="violation-grid">
            <div class="violation-box violation-red">
                <h4>❌ Violation</h4>
                <p>Using autodialers without proper consent records</p>
                <p><strong>Penalty: $500-$1,500 per call</strong></p>
            </div>
            <div class="violation-box violation-green">
                <h4>✅ Solution</h4>
                <p>Maintain detailed consent records and use manual dialing when in doubt</p>
            </div>
        </div>
        
        <div class="violation-grid">
            <div class="violation-box violation-red">
                <h4>❌ Violation</h4>
                <p>Continuing to call after 'add to DNC' request</p>
                <p><strong>Penalty: Up to $46,517 per call</strong></p>
            </div>
            <div class="violation-box violation-green">
                <h4>✅ Solution</h4>
                <p>Immediately add to suppression list and confirm no future contact</p>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Compliance Checklists</h2>
        
        <div class="checklists-grid">
            <div class="checklist-card">
                <h3>⏰ Daily Compliance</h3>
                <div class="checklist-item">
                    <strong>Verify DNC Scrubbing</strong><br>
                    Confirm all lists are scrubbed before campaigns
                </div>
                <div class="checklist-item">
                    <strong>Check Time Zones</strong><br>
                    Ensure calls/texts comply with local time restrictions
                </div>
                <div class="checklist-item">
                    <strong>Process Opt-Outs</strong><br>
                    Immediately honor all STOP requests and DNC additions
                </div>
                <div class="checklist-item">
                    <strong>Update Records</strong><br>
                    Log all communications and consent status changes
                </div>
                <div class="checklist-item">
                    <strong>Monitor Complaints</strong><br>
                    Track and investigate any compliance issues
                </div>
            </div>
            
            <div class="checklist-card">
                <h3>📅 Monthly Review</h3>
                <div class="checklist-item">
                    <strong>DNC Registry Update</strong><br>
                    Download fresh DNC data (required every 31 days)
                </div>
                <div class="checklist-item">
                    <strong>Consent Audit</strong><br>
                    Review consent collection processes and documentation
                </div>
                <div class="checklist-item">
                    <strong>Opt-Out Analysis</strong><br>
                    Analyze opt-out rates and complaint patterns
                </div>
                <div class="checklist-item">
                    <strong>Team Training Review</strong><br>
                    Update staff on new regulations and best practices
                </div>
                <div class="checklist-item">
                    <strong>Technology Testing</strong><br>
                    Verify compliance tools are functioning correctly
                </div>
            </div>
            
            <div class="checklist-card">
                <h3>🚨 Emergency Response</h3>
                <div class="emergency-item">
                    <div class="emergency-icon">🛑</div>
                    <h4>STOP</h4>
                    <p>Immediately cease all calling/texting to the complainant</p>
                </div>
                <div class="emergency-item">
                    <div class="emergency-icon">📋</div>
                    <h4>DOCUMENT</h4>
                    <p>Gather all records related to the contact and consent</p>
                </div>
                <div class="emergency-item">
                    <div class="emergency-icon">⚖️</div>
                    <h4>CONSULT</h4>
                    <p>Contact a TCPA attorney immediately for guidance</p>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <h3>Important Resources</h3>
        <p>• <a href="https://www.donotcall.gov" style="color: #90cdf4;">National Do Not Call Registry</a></p>
        <p>• <a href="https://www.ftc.gov" style="color: #90cdf4;">Federal Trade Commission</a></p>
        <p>• <a href="https://www.fcc.gov" style="color: #90cdf4;">Federal Communications Commission</a></p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #4a5568;">
        <p><strong>Disclaimer:</strong> This guide is for informational purposes only and does not constitute legal advice. Always consult with a qualified attorney for specific legal guidance regarding compliance requirements.</p>
        <p><em>Generated on ${new Date().toLocaleDateString()} - Real Estate Compliance Guide</em></p>
    </div>
    </div>
</body>
</html>
    `;
  };

  const downloadHTMLContent = (content, filename) => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareResource = (resourceName) => {
    const titleToFileMap = {
      "First-Time Buyer Guide": "first_time_buyer_guide.html",
      "Home Selling Checklist": "home_selling_checklist.html",
      "Market Analysis Guide": "market_analysis_guide.html",
      "Closing Process Checklist": "closing_process_checklist.html",
      "Buyer Timeline Tracker": "buyer_timeline_tracker.html",
      "Seller Timeline Tracker": "seller_timeline_tracker.html",
      "Pre-Approval Checklist": "preapproval_checklist.html",
      "DNC Compliance Guide": "dnc_compliance_guide_fixed.html",
      "AI Offer Calculator": "Automated Offer Calculator  (1).html",
      "Smart Commission Calculator": "commission_calculator (1).html",
      "Corporate Relocation Tracker": "corporate_relocation_tracker (1).html",
      "Estate Sale Checklist": "estate_sale_checklist (1).html",
      "Expired Listing Guide": "expired_listing_guide (1).html",
      // Pro Plan Items
      "Difficult Client Management Toolkit": "difficult_client_toolkit.html",
      "Investment Property Calculator": "investment_property_calculator.html",
      "Lease-to-Purchase Tracker": "lease_purchase_tracker.html",
      "Luxury Home Marketing Guide": "luxury_marketing_guide.html",
      "AI Market Analysis Tool": "market_activity_tracker.html",
    };

    const fileName = titleToFileMap[resourceName];
    if (!fileName) {
      showNotification(`Unable to share "${resourceName}"`);
      return;
    }

    const fileUrl = `${window.location.origin}/${fileName}`;
    const encodedUrl = encodeURIComponent(fileUrl);

    const modalBody = `
      <p class="mb-4">Share this resource using the options below:</p>
      <div class="flex flex-col gap-3">
        <a href="${fileUrl}" target="_blank" rel="noopener noreferrer" class="text-[var(--primary-color)] underline">Open Link</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">Share on Facebook</a>
        <a href="https://api.whatsapp.com/send?text=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="text-green-400 underline">Share on WhatsApp</a>
        <a href="https://twitter.com/intent/tweet?url=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="text-sky-400 underline">Share on Twitter</a>
      </div>
    `;

    setCurrentModalContent({
      title: `Share "${resourceName}"`,
      body: modalBody,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 flex-1 bg-stacked-dark-bg min-h-screen text-stacked-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-300">
          Guides & Checklists
        </h2>
        <div className="flex items-center bg-[var(--dark-bg)] rounded-lg px-4 py-2 w-72">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 20 20"
            className="text-[var(--primary-color)]"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search library..."
            className="bg-transparent border-none text-gray-300 outline-none w-full ml-2 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Plan Level Tabs */}
      <div className="mb-6">
        <div className="bg-[var(--dark-bg)] rounded-xl p-1.5 inline-flex gap-1.5">
          <button
            onClick={() => {
              setActivePlan("starter");
              setActiveCategory("all");
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activePlan === "starter"
              ? "bg-[var(--primary-color)] text-stacked-black shadow-lg shadow-[var(--primary-color)]/30"
              : "bg-transparent text-gray-300 hover:bg-[var(--medium-dark)] hover:text-white"
              }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-base">🚀</span>
              <div className="flex flex-col items-start">
                <span>Starter Plan</span>
                <span className={`text-[10px] ${activePlan === "starter" ? "text-stacked-black/70" : "text-gray-500"}`}>
                  {initialLibraryItems.filter(item => !item.category.includes("addon") && !item.category.includes("pro plan")).length} resources
                </span>
              </div>
            </div>
          </button>
          <button
            onClick={() => {
              setActivePlan("power");
              setActiveCategory("all");
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activePlan === "power"
              ? "bg-[var(--primary-color)] text-stacked-black shadow-lg shadow-[var(--primary-color)]/30"
              : "bg-transparent text-gray-300 hover:bg-[var(--medium-dark)] hover:text-white"
              }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-base">⚡</span>
              <div className="flex flex-col items-start">
                <span>Power Plan</span>
                <span className={`text-[10px] ${activePlan === "power" ? "text-stacked-black/70" : "text-gray-500"}`}>
                  {initialLibraryItems.filter(item => item.category.includes("addon")).length} tools
                </span>
              </div>
            </div>
          </button>
          <button
            onClick={() => {
              setActivePlan("pro");
              setActiveCategory("all");
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activePlan === "pro"
              ? "bg-[var(--primary-color)] text-stacked-black shadow-lg shadow-[var(--primary-color)]/30"
              : "bg-transparent text-gray-300 hover:bg-[var(--medium-dark)] hover:text-white"
              }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-base">👑</span>
              <div className="flex flex-col items-start">
                <span>Pro Plan</span>
                <span className={`text-[10px] ${activePlan === "pro" ? "text-stacked-black/70" : "text-gray-500"}`}>
                  {initialLibraryItems.filter(item => item.category.includes("pro plan")).length} tools
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Plan Description */}
        <div className="mt-3 text-sm text-gray-400">
          {activePlan === "starter" && (
            <p>Essential guides and checklists to get you started in real estate</p>
          )}
          {activePlan === "power" && (
            <p>Advanced calculators and specialized tools for power users</p>
          )}
          {activePlan === "pro" && (
            <p>Professional-grade tools and AI-powered analytics for serious agents</p>
          )}
        </div>
      </div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-5 mb-8 border-b border-gray-500">
        <div
          className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "all"
            ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
            : "text-gray-300 hover:text-stacked-white"
            }`}
          onClick={() => handleCategoryChange("all")}
        >
          All {activePlan === "starter" ? "Resources" : activePlan === "power" ? "Tools" : "Tools"}
        </div>

        {/* Starter Stack Categories */}
        {activePlan === "starter" && (
          <>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "buyer"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("buyer")}
            >
              Buyer Guides
            </div>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "seller"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("seller")}
            >
              Seller Guides
            </div>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "checklist"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("checklist")}
            >
              Checklists
            </div>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "process"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("process")}
            >
              Process Guides
            </div>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "market"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("market")}
            >
              Market Reports
            </div>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "compliance"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("compliance")}
            >
              Compliance
            </div>
          </>
        )}

        {/* Power Plan Categories */}
        {activePlan === "power" && (
          <>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "calculator"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("calculator")}
            >
              Calculators
            </div>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "guide"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("guide")}
            >
              Guides
            </div>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "process"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("process")}
            >
              Process Trackers
            </div>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "checklist"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("checklist")}
            >
              Checklists
            </div>
          </>
        )}

        {/* Pro Plan Categories */}
        {activePlan === "pro" && (
          <>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "Toolkit"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("Toolkit")}
            >
              Toolkits
            </div>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "Calculator"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("Calculator")}
            >
              Calculators
            </div>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "Tracker"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("Tracker")}
            >
              Trackers
            </div>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "Guide"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("Guide")}
            >
              Guides
            </div>
            <div
              className={`py-3 px-0 cursor-pointer font-medium transition-all duration-200 ${activeCategory === "Analyzer"
                ? "text-[var(--primary-color)] border-b-2 border-stacked-primary"
                : "text-gray-300 hover:text-stacked-white"
                }`}
              onClick={() => handleCategoryChange("Analyzer")}
            >
              AI Tools
            </div>
          </>
        )}
      </div>

      <LibraryGrid
        items={filteredItems}
        openComponent={setActiveComponentId}
        downloadResource={downloadResource}
        shareResource={shareResource}
      />

      <Notification message={notification.message} show={notification.show} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentModalContent?.title}
        body={currentModalContent?.body}
      />
      {activeComponentId && (
        <div className="fixed inset-0 z-[3000] bg-black/70 flex items-center justify-center px-2 overflow-y-auto">
          <div className="relative bg-[var(--dark-bg)] rounded-xl shadow-2xl p-4 max-w-5xl w-full max-h-[95vh] overflow-y-auto animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-[var(--primary-color)] hover:text-white text-2xl z-10"
              onClick={() => setActiveComponentId(null)}
              aria-label="Close"
            >
              <X />
            </button>
            {React.createElement(componentMap[activeComponentId])}
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
