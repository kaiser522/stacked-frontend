import { useState, useEffect, useMemo } from "react";
import { DollarSign, Users, Clock, Copy } from "lucide-react";
import ReportsContent from "../components/affiliatedDashboard/ReportsContent";
import ClawbacksTable from "../components/affiliatedDashboard/ClawbacksTable";
import PayoutsTable from "../components/affiliatedDashboard/PayoutTable";
import ReferralsTable from "../components/affiliatedDashboard/ReferralsTable";
import OverviewContent from "../components/affiliatedDashboard/OverviewContent";
import SearchBar from "../components/affiliatedDashboard/SearchBar";
import AffiliateDetails from "../components/affiliatedDashboard/AffiliateDetails";
import MarketingTools from "../components/affiliatedDashboard/MarketingTools";
import IntercomChat from "../components/IntercomChat";
import {
  getAffiliateReferrals,
  getAffiliatePayouts,
  getAffiliateClawbacks,
  getAffiliateProfile,
  calculateEligibleCommissions,
  countNewPaidCustomers,
  meetsActivityTarget,
  getNextPayoutDate,
} from "../services/affiliateService";

// Helper function to get user ID from storage
function getUserIdFromStorage() {
  try {
    const raw = localStorage.getItem("__user__");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return parsed?.id || parsed?._id || undefined;
  } catch {
    return undefined;
  }
}

// Helper function to get user name from storage
function getUserNameFromStorage() {
  try {
    const raw = localStorage.getItem("__user__");
    if (!raw) return "Affiliate";
    const parsed = JSON.parse(raw);
    return parsed?.name || parsed?.email?.split("@")[0] || "Affiliate";
  } catch {
    return "Affiliate";
  }
}

// StatsCard Component
function StatsCard({ icon: Icon, title, value, description }) {
  return (
    <div className="bg-[#2D3A48] hover:bg-[#324250] p-6 rounded-lg shadow-lg transition-colors">
      <div className="w-16 h-16 mb-4 rounded-md flex items-center justify-center border-2 border-[var(--primary-color)]">
        <Icon className="text-[var(--primary-color)]" size={32} />
      </div>
      <h2 className="text-3xl font-bold text-[var(--primary-color)]">{value}</h2>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

// ReferralLink Component
function ReferralLink({ showPopup, affiliateId }) {
  const referralLink = affiliateId 
    ? `https://stacked.com/?ref=${affiliateId}`
    : "https://stacked.com/?ref:yourAffiliateID";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    showPopup();
  };

  return (
    <div className="bg-[#2A3A48] border-[#324250] p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-semibold mb-4 text-[var(--primary-color)]">
        Your Referral Link
      </h2>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-grow hover:bg-[#324250] text-white p-3 rounded border border-[#2D3A48] focus:outline-none focus:border-[var(--primary-color)]"
        />
        <button
          onClick={handleCopy}
          className="bg-[var(--primary-color)] hover:bg-teal-300 text-white py-2 px-4 rounded transition-colors flex items-center gap-2"
        >
          <Copy size={18} />
          Copy Link
        </button>
      </div>
    </div>
  );
}

// NavTabs Component
function NavTabs({ activeTab, setActiveTab }) {
  const tabs = ["overview", "referrals", "payouts", "clawbacks", "reports", "marketing-tools"];

  return (
    <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 font-medium capitalize whitespace-nowrap transition-colors ${
            activeTab === tab
              ? "text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab === "marketing-tools" ? "Marketing Tools" : tab}
        </button>
      ))}
    </div>
  );
}

function AffiliateDashboard({ name }) {
  const userId = useMemo(() => getUserIdFromStorage(), []);
  const affiliateName = name || getUserNameFromStorage();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [expandedReferral, setExpandedReferral] = useState(null);
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [isViewingMarketingTool, setIsViewingMarketingTool] = useState(false);
  
  // Firebase data states
  const [referrals, setReferrals] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [clawbacks, setClawbacks] = useState([]);
  const [affiliateProfile, setAffiliateProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from Firebase
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load all affiliate data in parallel
        const [referralsData, payoutsData, clawbacksData, profileData] = await Promise.all([
          getAffiliateReferrals(userId),
          getAffiliatePayouts(userId),
          getAffiliateClawbacks(userId),
          getAffiliateProfile(userId),
        ]);

        setReferrals(referralsData || []);
        setPayouts(payoutsData || []);
        setClawbacks(clawbacksData || []);
        setAffiliateProfile(profileData);
      } catch (err) {
        console.error("Error loading affiliate data:", err);
        // Don't show error if it's just missing indexes - collections will be empty initially
        if (err.code === 'failed-precondition') {
          console.warn("Firestore indexes not yet created. Collections will be empty until data is added.");
          setReferrals([]);
          setPayouts([]);
          setClawbacks([]);
          setAffiliateProfile(null);
        } else {
          setError("Failed to load affiliate data. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [userId]);

  // Calculate stats from referrals
  const stats = useMemo(() => {
    const totalEarnings = payouts
      .filter(p => p.status === "Completed" || p.status === "Paid")
      .reduce((sum, p) => sum + (p.amount || 0), 0);
    
    const pendingCommissions = calculateEligibleCommissions(referrals);
    const activeReferrals = referrals.filter(r => r.status === "paid" || r.status === "pending").length;
    
    // Check activity target for current month
    const now = new Date();
    const currentMonthCount = countNewPaidCustomers(referrals, now.getFullYear(), now.getMonth() + 1);
    const meetsTarget = meetsActivityTarget(referrals, now.getFullYear(), now.getMonth() + 1);

    return {
      totalEarnings,
      pendingCommissions,
      activeReferrals,
      currentMonthCount,
      meetsTarget,
    };
  }, [referrals, payouts]);

  const downloadCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }
    
    let csvContent = "";
    const headers = Object.keys(data[0]);
    csvContent += headers.join(",") + "\n";
    data.forEach((item) => {
      const row = headers.map((header) => {
        let value = item[header];
        if (value instanceof Date) {
          value = value.toLocaleDateString();
        }
        if (typeof value === "string" && value.includes(",")) {
          value = `"${value}"`;
        }
        return value || "";
      });
      csvContent += row.join(",") + "\n";
    });
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExport = (data, filename) => {
    downloadCSV(data, filename);
  };

  const showPopup = () => {
    setShowCopyPopup(true);
    setTimeout(() => setShowCopyPopup(false), 2000);
  };

  // Filter referrals and clawbacks based on search term
  const filteredReferrals = useMemo(() => {
    if (!searchTerm) return referrals;
    const term = searchTerm.toLowerCase();
    return referrals.filter(ref =>
      ref.name?.toLowerCase().includes(term) ||
      ref.email?.toLowerCase().includes(term) ||
      ref.plan?.toLowerCase().includes(term)
    );
  }, [referrals, searchTerm]);

  const filteredClawbacks = useMemo(() => {
    if (!searchTerm) return clawbacks;
    const term = searchTerm.toLowerCase();
    return clawbacks.filter(cb =>
      cb.name?.toLowerCase().includes(term) ||
      cb.email?.toLowerCase().includes(term) ||
      cb.plan?.toLowerCase().includes(term)
    );
  }, [clawbacks, searchTerm]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1E2A38] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
          <p className="text-gray-300">Loading affiliate data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1E2A38] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[var(--primary-color)] hover:bg-teal-300 text-white py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#1E2A38] p-6 flex items-center justify-center ${!isViewingMarketingTool ? 'text-white' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Hide dashboard elements when viewing a marketing tool detail */}
        {!isViewingMarketingTool && (
          <>
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-2 text-[var(--primary-color)]">
                Welcome, {affiliateName}
              </h1>
              <p className="text-gray-300">
                Manage your referrals and earnings here.
              </p>
            </header>

            {showCopyPopup && (
              <div className="fixed bottom-4 right-4 bg-teal-500 text-white px-4 py-2 rounded shadow-lg z-50">
                Link copied!
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatsCard
                icon={DollarSign}
                title="Total Earnings"
                value={`$${stats.totalEarnings.toLocaleString()}`}
                description="Total Paid Earnings"
              />
              <StatsCard
                icon={Users}
                title="Active Referrals"
                value={stats.activeReferrals}
                description="Active Referrals"
              />
              <StatsCard
                icon={Clock}
                title="Pending Commissions"
                value={`$${stats.pendingCommissions.toLocaleString()}`}
                description="Eligible for Payout"
              />
            </div>

            {/* Activity Target Status */}
            {stats.currentMonthCount !== undefined && (
              <div className={`mb-6 p-4 rounded-lg border-l-4 ${
                stats.meetsTarget 
                  ? 'bg-green-900/30 border-green-500' 
                  : stats.currentMonthCount === 1
                  ? 'bg-yellow-900/30 border-yellow-500'
                  : 'bg-red-900/30 border-red-500'
              }`}>
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Current Month Activity:</strong> {stats.currentMonthCount} new paid customer{stats.currentMonthCount !== 1 ? 's' : ''} 
                  {stats.meetsTarget ? (
                    <span className="text-green-400 ml-2">✓ Target met (2+ required)</span>
                  ) : (
                    <span className="text-yellow-400 ml-2">⚠ Need {2 - stats.currentMonthCount} more to meet target</span>
                  )}
                </p>
              </div>
            )}

            <AffiliateDetails/>
            <ReferralLink showPopup={showPopup} affiliateId={userId} />
          </>
        )}

        {/* Hide nav tabs when viewing tool detail */}
        {!isViewingMarketingTool && (
          <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {(activeTab === "referrals" || activeTab === "clawbacks") && (
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleExport={() =>
              handleExport(
                activeTab === "referrals" ? filteredReferrals : filteredClawbacks,
                `${activeTab}-report.csv`
              )
            }
            activeTab={activeTab}
          />
        )}

        {activeTab === "marketing-tools" ? (
          <MarketingTools onToolSelect={setIsViewingMarketingTool} />
        ) : (
          <div className="bg-[#2A3A48] rounded-lg shadow-lg p-6">
            {activeTab === "overview" && (
              <OverviewContent referrals={referrals} />
            )}
            {activeTab === "referrals" && (
              <ReferralsTable
                referrals={filteredReferrals}
                searchTerm={searchTerm}
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
                expandedReferral={expandedReferral}
                setExpandedReferral={setExpandedReferral}
                handleExport={() =>
                  handleExport(filteredReferrals, "referrals-report.csv")
                }
              />
            )}
            {activeTab === "payouts" && (
              <PayoutsTable
                payouts={payouts}
                handleExport={() =>
                  handleExport(payouts, "payouts-report.csv")
                }
              />
            )}
            {activeTab === "clawbacks" && (
              <ClawbacksTable
                clawbacks={filteredClawbacks}
                searchTerm={searchTerm}
                handleExport={() =>
                  handleExport(filteredClawbacks, "clawbacks-report.csv")
                }
              />
            )}
            {activeTab === "reports" && (
              <ReportsContent
                referrals={referrals}
                payouts={payouts}
                handleExport={handleExport}
              />
            )}
          </div>
        )}
      </div>
      <IntercomChat enableFin={false} />
    </div>
  );
}

export default AffiliateDashboard;
