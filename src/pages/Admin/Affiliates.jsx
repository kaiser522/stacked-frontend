import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/UI/Card";
import Button from "../../components/Button";
import SearchInput from "../../components/Form/SearchInput";
import Input from "../../components/Form/Input";
import Modal from "../../components/Modal";
import useNotification from "../../components/notifications/useNotification";
import {
  getAllAffiliates,
  getAffiliateReferrals,
  getAffiliatePayouts,
  getAffiliateClawbacks,
  countNewPaidCustomers,
  meetsActivityTarget,
  getAffiliateProfile,
  createAffiliateProfile,
} from "../../services/affiliateService";
import { useCalculateEligiblePayoutMutation, useCreateConnectAccountMutation, useProcessPayoutMutation } from "../../store/apis/affiliate.api";
import { Users, DollarSign, AlertCircle, CheckCircle, Clock, Plus, Link2, Copy, ExternalLink, CreditCard } from "lucide-react";

const Affiliates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [affiliates, setAffiliates] = useState([]);
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  const [affiliateData, setAffiliateData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [eligiblePayoutData, setEligiblePayoutData] = useState(null);
  const [newLink, setNewLink] = useState({
    handle: "",
    campaign: "",
  });
  const [campaignLink, setCampaignLink] = useState({
    campaign: "",
    utmSource: "",
    utmMedium: "affiliate",
    utmCampaign: "",
  });
  const notify = useNotification();
  const [calculateEligiblePayout, { isLoading: isCalculatingPayout }] = useCalculateEligiblePayoutMutation();
  const [createConnectAccount, { isLoading: isCreatingAccount }] = useCreateConnectAccountMutation();
  const [processPayout, { isLoading: isProcessingPayout }] = useProcessPayoutMutation();
  
  // Base URL for affiliate links
  const BASE_URL = "https://get-stacked.com";

  useEffect(() => {
    loadAffiliates();
  }, []);

  const loadAffiliates = async () => {
    try {
      setIsLoading(true);
      const data = await getAllAffiliates();
      setAffiliates(data || []);
    } catch (error) {
      console.error("Error loading affiliates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAffiliateDetails = async (affiliateId) => {
    try {
      setIsLoadingDetails(true);
      const [referrals, payouts, clawbacks, profile] = await Promise.all([
        getAffiliateReferrals(affiliateId),
        getAffiliatePayouts(affiliateId),
        getAffiliateClawbacks(affiliateId),
        getAffiliateProfile(affiliateId),
      ]);

      // Calculate activity metrics
      const now = new Date();
      const currentMonthCount = countNewPaidCustomers(referrals, now.getFullYear(), now.getMonth() + 1);
      const meetsTarget = meetsActivityTarget(referrals, now.getFullYear(), now.getMonth() + 1);

      setAffiliateData({
        referrals: referrals || [],
        payouts: payouts || [],
        clawbacks: clawbacks || [],
        currentMonthCount,
        meetsTarget,
        profile: profile || null,
      });
    } catch (error) {
      console.error("Error loading affiliate details:", error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Generate base affiliate link
  const generateBaseLink = (affiliateId, handle = null) => {
    const affiliateHandle = handle || affiliateData?.profile?.handle || affiliateId;
    return `${BASE_URL}/partners/${affiliateHandle}?ref=${affiliateId}`;
  };

  // Generate campaign link with UTM parameters
  const generateCampaignLink = (affiliateId, campaignData) => {
    const handle = campaignData.utmSource || affiliateData?.profile?.handle || affiliateId;
    const params = new URLSearchParams({
      ref: affiliateId,
      utm_source: handle,
      utm_medium: campaignData.utmMedium || "affiliate",
      utm_campaign: campaignData.utmCampaign || campaignData.campaign || "default",
    });
    return `${BASE_URL}/partners/${handle}?${params.toString()}`;
  };

  // Save handle to affiliate profile
  const handleSaveHandle = async () => {
    if (!selectedAffiliate || !newLink.handle) {
      notify({ message: "Please enter a handle", type: "error" });
      return;
    }

    try {
      await createAffiliateProfile({
        userId: selectedAffiliate.id,
        handle: newLink.handle,
        name: selectedAffiliate.name,
        email: selectedAffiliate.email,
      });
      
      notify({ message: "Handle saved successfully", type: "success" });
      setShowLinkModal(false);
      setNewLink({ handle: "", campaign: "" });
      loadAffiliateDetails(selectedAffiliate.id);
    } catch (error) {
      console.error("Error saving handle:", error);
      notify({ message: "Failed to save handle", type: "error" });
    }
  };

  // Copy link to clipboard
  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    notify({ message: "Link copied to clipboard!", type: "success" });
  };

  // Get all affiliate links for display
  const getAllAffiliateLinks = () => {
    if (!selectedAffiliate) return [];
    
    const links = [];
    const handle = affiliateData?.profile?.handle || selectedAffiliate.id;
    
    // Base link
    links.push({
      id: "base",
      name: "Base Referral Link",
      link: generateBaseLink(selectedAffiliate.id, handle),
      type: "base",
    });

    // Campaign links from profile (if stored)
    if (affiliateData?.profile?.campaignLinks) {
      affiliateData.profile.campaignLinks.forEach((campaign, index) => {
        links.push({
          id: `campaign-${index}`,
          name: campaign.name || campaign.campaign || `Campaign ${index + 1}`,
          link: generateCampaignLink(selectedAffiliate.id, campaign),
          type: "campaign",
          campaign: campaign,
        });
      });
    }

    return links;
  };

  const handleSelectAffiliate = (affiliate) => {
    setSelectedAffiliate(affiliate);
    loadAffiliateDetails(affiliate.id);
    setEligiblePayoutData(null);
  };

  // Calculate eligible payout
  const handleCalculateEligiblePayout = async () => {
    if (!selectedAffiliate || !affiliateData?.referrals) {
      notify({ message: "Please select an affiliate first", type: "error" });
      return;
    }

    try {
      const result = await calculateEligiblePayout({
        affiliateId: selectedAffiliate.id,
        referrals: affiliateData.referrals,
      }).unwrap();

      if (result.success) {
        setEligiblePayoutData(result.data);
        setShowPayoutModal(true);
      }
    } catch (error) {
      console.error("Error calculating eligible payout:", error);
      notify({ message: error?.data?.message || "Failed to calculate eligible payout", type: "error" });
    }
  };

  // Process payout
  const handleProcessPayout = async () => {
    if (!eligiblePayoutData || !selectedAffiliate) {
      notify({ message: "No eligible payout data", type: "error" });
      return;
    }

    if (!eligiblePayoutData.meetsMinimum) {
      notify({ message: "Payout amount must be at least $150", type: "error" });
      return;
    }

    try {
      const stripeConnectAccountId = affiliateData?.profile?.stripeConnectAccountId || null;
      
      const result = await processPayout({
        affiliateId: selectedAffiliate.id,
        amount: eligiblePayoutData.eligibleAmount,
        commissionIds: eligiblePayoutData.eligibleCommissions.map(c => c.id),
        eligibleCommissions: eligiblePayoutData.eligibleCommissions,
        stripeConnectAccountId: stripeConnectAccountId,
      }).unwrap();

      if (result.success) {
        notify({ message: "Payout processing initiated successfully", type: "success" });
        setShowPayoutModal(false);
        setEligiblePayoutData(null);
        loadAffiliateDetails(selectedAffiliate.id);
      }
    } catch (error) {
      console.error("Error processing payout:", error);
      notify({ message: error?.data?.message || "Failed to process payout", type: "error" });
    }
  };

  const filteredAffiliates = affiliates.filter((affiliate) =>
    affiliate.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    affiliate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    affiliate.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEarnings = affiliateData?.payouts
    ?.filter((p) => p.status === "Completed" || p.status === "Paid")
    .reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

  const pendingCommissions = affiliateData?.referrals
    ?.filter((r) => r.status === "pending").length || 0;

  if (isLoading) {
    return (
      <div className="space-y-8 bg-[var(--lighter-dark)] p-6 mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
          <p className="text-gray-300">Loading affiliates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-[var(--lighter-dark)] p-6 mx-auto">
      <div>
        <h1 className="heading-3 text-[var(--primary-color)]">
          Affiliate Management
        </h1>
        <p className="text-[var(--gray)] mt-2">
          View and manage all affiliate accounts, referrals, payouts, and clawbacks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Affiliates List */}
        <div className="lg:col-span-1">
          <Card className="bg-[#324250]">
            <CardHeader>
              <CardTitle className="text-gray-200">Affiliates</CardTitle>
              <SearchInput
                placeholder="Search affiliates..."
                value={searchTerm}
                setValue={setSearchTerm}
                className="mt-4"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredAffiliates.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    No affiliates found
                  </p>
                ) : (
                  filteredAffiliates.map((affiliate) => (
                    <div
                      key={affiliate.id}
                      onClick={() => handleSelectAffiliate(affiliate)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedAffiliate?.id === affiliate.id
                          ? "bg-[var(--primary-color)] text-slate-900"
                          : "bg-[var(--dark-bg)] hover:bg-[#1e2a38] text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-slate-900" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {affiliate.name || affiliate.email || "Unknown"}
                          </p>
                          <p className="text-sm opacity-75">
                            {affiliate.email || affiliate.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Affiliate Details */}
        <div className="lg:col-span-2">
          {!selectedAffiliate ? (
            <Card className="bg-[#324250]">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">
                  Select an affiliate from the list to view details
                </p>
              </CardContent>
            </Card>
          ) : isLoadingDetails ? (
            <Card className="bg-[#324250]">
              <CardContent className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
                <p className="text-gray-400">Loading affiliate details...</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-[#324250]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-8 h-8 text-[var(--primary-color)]" />
                      <div>
                        <p className="text-xs text-gray-400">Total Earnings</p>
                        <p className="text-xl font-bold text-gray-200">
                          ${totalEarnings.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#324250]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Total Referrals</p>
                        <p className="text-xl font-bold text-gray-200">
                          {affiliateData?.referrals?.length || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#324250]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-8 h-8 text-yellow-400" />
                      <div>
                        <p className="text-xs text-gray-400">Pending</p>
                        <p className="text-xl font-bold text-gray-200">
                          {pendingCommissions}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#324250]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      {affiliateData?.meetsTarget ? (
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      ) : (
                        <AlertCircle className="w-8 h-8 text-red-400" />
                      )}
                      <div>
                        <p className="text-xs text-gray-400">This Month</p>
                        <p className="text-xl font-bold text-gray-200">
                          {affiliateData?.currentMonthCount || 0}/2
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Affiliate Links Management */}
              <Card className="bg-[#324250]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-200">Affiliate Links</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowLinkModal(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Set Handle
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowCampaignModal(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Campaign Link
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getAllAffiliateLinks().map((linkItem) => (
                      <div
                        key={linkItem.id}
                        className="p-4 bg-[var(--lighter-dark)] rounded-lg border border-gray-700"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Link2 className="w-4 h-4 text-[var(--primary-color)]" />
                              <span className="font-medium text-gray-200">{linkItem.name}</span>
                              {linkItem.type === "campaign" && (
                                <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">
                                  Campaign
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <input
                                type="text"
                                value={linkItem.link}
                                readOnly
                                className="flex-1 bg-[#1e2a38] text-gray-300 text-sm p-2 rounded border border-gray-600 font-mono"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCopyLink(linkItem.link)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(linkItem.link, "_blank")}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                            {linkItem.type === "campaign" && linkItem.campaign && (
                              <div className="mt-2 text-xs text-gray-400">
                                Campaign: {linkItem.campaign.utmCampaign || linkItem.campaign.campaign || "N/A"}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {getAllAffiliateLinks().length === 0 && (
                      <div className="text-center py-8 text-gray-400">
                        <Link2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No affiliate links created yet</p>
                        <p className="text-sm mt-2">Set a handle and create campaign links to get started</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Quick Link Info */}
                  <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <p className="text-sm text-gray-300">
                      <strong className="text-blue-400">30-Day Last-Click Attribution:</strong> Customers have 30 days from clicking the link to make their first purchase for the affiliate to receive credit.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Status */}
              {affiliateData && (
                <Card className="bg-[#324250]">
                  <CardHeader>
                    <CardTitle className="text-gray-200">Activity Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`p-4 rounded-lg border-l-4 ${
                      affiliateData.meetsTarget
                        ? 'bg-green-900/30 border-green-500'
                        : affiliateData.currentMonthCount === 1
                        ? 'bg-yellow-900/30 border-yellow-500'
                        : 'bg-red-900/30 border-red-500'
                    }`}>
                      <p className="text-sm text-gray-300">
                        <strong className="text-white">Current Month Activity:</strong> {affiliateData.currentMonthCount} new paid customer{affiliateData.currentMonthCount !== 1 ? 's' : ''}
                        {affiliateData.meetsTarget ? (
                          <span className="text-green-400 ml-2">✓ Target met (2+ required)</span>
                        ) : (
                          <span className="text-yellow-400 ml-2">⚠ Need {2 - affiliateData.currentMonthCount} more to meet target</span>
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Referrals Table */}
              <Card className="bg-[#324250]">
                <CardHeader>
                  <CardTitle className="text-gray-200">Referrals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="p-3 text-sm text-gray-400">Customer</th>
                          <th className="p-3 text-sm text-gray-400">Plan</th>
                          <th className="p-3 text-sm text-gray-400">Date</th>
                          <th className="p-3 text-sm text-gray-400">Commission</th>
                          <th className="p-3 text-sm text-gray-400">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {affiliateData?.referrals?.slice(0, 10).map((ref) => (
                          <tr key={ref.id} className="border-b border-gray-700">
                            <td className="p-3 text-sm text-gray-300">
                              {ref.name || ref.email || "N/A"}
                            </td>
                            <td className="p-3 text-sm text-gray-300">
                              {ref.plan || "N/A"}
                            </td>
                            <td className="p-3 text-sm text-gray-300">
                              {ref.chargeDate instanceof Date
                                ? ref.chargeDate.toLocaleDateString()
                                : new Date(ref.chargeDate).toLocaleDateString()}
                            </td>
                            <td className="p-3 text-sm text-gray-300">
                              ${ref.commission || 0}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  ref.status === "paid"
                                    ? "bg-green-900 text-green-300"
                                    : "bg-yellow-900 text-yellow-300"
                                }`}
                              >
                                {ref.status || "pending"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {affiliateData?.referrals?.length === 0 && (
                      <p className="text-gray-400 text-center py-8">
                        No referrals found
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Stripe Connect Account Status */}
              {selectedAffiliate && (
                <Card className="bg-[#324250]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-200 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[var(--primary-color)]" />
                        Stripe Connect Account
                      </CardTitle>
                      {!affiliateData?.profile?.stripeConnectAccountId && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            try {
                              const result = await createConnectAccount({
                                affiliateId: selectedAffiliate.id,
                                email: selectedAffiliate.email || affiliateData?.profile?.email,
                                country: 'US',
                              }).unwrap();

                              if (result.success) {
                                // Save account ID to affiliate profile
                                await createAffiliateProfile({
                                  userId: selectedAffiliate.id,
                                  ...(affiliateData?.profile || {}),
                                  stripeConnectAccountId: result.data.accountId,
                                });
                                
                                window.open(result.data.onboardingUrl, '_blank');
                                notify({ 
                                  message: 'Onboarding link opened. Affiliate should complete setup in the new window.', 
                                  type: 'success' 
                                });
                                
                                // Reload affiliate details to show updated status
                                loadAffiliateDetails(selectedAffiliate.id);
                              }
                            } catch (error) {
                              console.error("Error creating Connect account:", error);
                              notify({ 
                                message: error?.data?.message || "Failed to create Connect account", 
                                type: "error" 
                              });
                            }
                          }}
                          disabled={isCreatingAccount}
                        >
                          {isCreatingAccount ? "Creating..." : "Create Connect Account"}
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {affiliateData?.profile?.stripeConnectAccountId ? (
                      <div className="p-3 bg-green-900/30 border border-green-500/30 rounded">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-green-300 text-sm">
                            Connect account set up: {affiliateData.profile.stripeConnectAccountId.substring(0, 12)}...
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        Stripe Connect account not set up. Create an account to enable automatic payouts.
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Eligible Payout Section */}
              {affiliateData?.referrals && affiliateData.referrals.length > 0 && (
                <Card className="bg-[#324250] border-2 border-[var(--primary-color)]/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-200 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[var(--primary-color)]" />
                        Eligible Payout
                      </CardTitle>
                      <Button
                        size="sm"
                        onClick={handleCalculateEligiblePayout}
                        disabled={isCalculatingPayout}
                      >
                        {isCalculatingPayout ? "Calculating..." : "Review & Process Payout"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {eligiblePayoutData ? (
                      <div className="space-y-3">
                        <div className="p-4 bg-[var(--lighter-dark)] rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400">Eligible Amount</span>
                            <span className={`text-2xl font-bold ${
                              eligiblePayoutData.meetsMinimum 
                                ? "text-[var(--primary-color)]" 
                                : "text-yellow-400"
                            }`}>
                              ${eligiblePayoutData.eligibleAmount.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Commissions</span>
                            <span className="text-gray-300">{eligiblePayoutData.commissionCount}</span>
                          </div>
                          {!eligiblePayoutData.meetsMinimum && (
                            <div className="mt-2 p-2 bg-yellow-900/30 border border-yellow-500/30 rounded text-sm text-yellow-300">
                              Minimum $150 required for payout. Current: ${eligiblePayoutData.eligibleAmount.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        Click "Review & Process Payout" to calculate eligible commissions
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Payouts Table */}
              <Card className="bg-[#324250]">
                <CardHeader>
                  <CardTitle className="text-gray-200">Payouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="p-3 text-sm text-gray-400">Date</th>
                          <th className="p-3 text-sm text-gray-400">Amount</th>
                          <th className="p-3 text-sm text-gray-400">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {affiliateData?.payouts?.slice(0, 10).map((payout) => (
                          <tr key={payout.id} className="border-b border-gray-700">
                            <td className="p-3 text-sm text-gray-300">
                              {payout.payoutDate instanceof Date
                                ? payout.payoutDate.toLocaleDateString()
                                : new Date(payout.payoutDate).toLocaleDateString()}
                            </td>
                            <td className="p-3 text-sm text-gray-300">
                              ${payout.amount || 0}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  payout.status === "Completed" || payout.status === "Paid"
                                    ? "bg-green-900 text-green-300"
                                    : "bg-yellow-900 text-yellow-300"
                                }`}
                              >
                                {payout.status || "pending"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {affiliateData?.payouts?.length === 0 && (
                      <p className="text-gray-400 text-center py-8">
                        No payouts found
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Clawbacks Table */}
              <Card className="bg-[#324250]">
                <CardHeader>
                  <CardTitle className="text-gray-200">Clawbacks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="p-3 text-sm text-gray-400">Date</th>
                          <th className="p-3 text-sm text-gray-400">Customer</th>
                          <th className="p-3 text-sm text-gray-400">Amount</th>
                          <th className="p-3 text-sm text-gray-400">Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {affiliateData?.clawbacks?.slice(0, 10).map((cb) => (
                          <tr key={cb.id} className="border-b border-gray-700">
                            <td className="p-3 text-sm text-gray-300">
                              {cb.createdAt instanceof Date
                                ? cb.createdAt.toLocaleDateString()
                                : new Date(cb.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-3 text-sm text-gray-300">
                              {cb.name || cb.email || "N/A"}
                            </td>
                            <td className="p-3 text-sm text-gray-300">
                              ${cb.amount || 0}
                            </td>
                            <td className="p-3 text-sm text-gray-300">
                              {cb.reason || "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {affiliateData?.clawbacks?.length === 0 && (
                      <p className="text-gray-400 text-center py-8">
                        No clawbacks found
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Set Handle Modal */}
      <Modal
        isOpen={showLinkModal}
        onClose={() => {
          setShowLinkModal(false);
          setNewLink({ handle: "", campaign: "" });
        }}
        title="Set Affiliate Handle"
        size="md"
      >
        <div className="space-y-4 p-6">
          <div>
            <Input
              label="Custom Handle (Username)"
              placeholder="e.g., johnsmith"
              value={newLink.handle}
              onChange={(e) => setNewLink({ ...newLink, handle: e.target.value })}
              helpText="This will be used in the URL: get-stacked.com/partners/{handle}"
            />
            {newLink.handle && (
              <div className="mt-2 p-3 bg-[var(--lighter-dark)] rounded border border-gray-600">
                <p className="text-xs text-gray-400 mb-1">Preview Link:</p>
                <p className="text-sm text-gray-300 font-mono break-all">
                  {generateBaseLink(selectedAffiliate?.id, newLink.handle)}
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setShowLinkModal(false);
                setNewLink({ handle: "", campaign: "" });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveHandle}>
              Save Handle
            </Button>
          </div>
        </div>
      </Modal>

      {/* Create Campaign Link Modal */}
      <Modal
        isOpen={showCampaignModal}
        onClose={() => {
          setShowCampaignModal(false);
          setCampaignLink({ campaign: "", utmSource: "", utmMedium: "affiliate", utmCampaign: "" });
        }}
        title="Create Campaign Link"
        size="md"
      >
        <div className="space-y-4 p-6">
          <div>
            <Input
              label="Campaign Name"
              placeholder="e.g., social-media, email-blast, blog-post"
              value={campaignLink.campaign}
              onChange={(e) => setCampaignLink({ ...campaignLink, campaign: e.target.value, utmCampaign: e.target.value })}
              helpText="Used for tracking which promotion method works best"
            />
          </div>
          <div>
            <Input
              label="UTM Source (Optional)"
              placeholder="e.g., instagram, email, blog"
              value={campaignLink.utmSource}
              onChange={(e) => setCampaignLink({ ...campaignLink, utmSource: e.target.value })}
              helpText="Defaults to affiliate handle if left empty"
            />
          </div>
          <div>
            <Input
              label="UTM Medium"
              placeholder="affiliate"
              value={campaignLink.utmMedium}
              onChange={(e) => setCampaignLink({ ...campaignLink, utmMedium: e.target.value })}
              helpText="Usually 'affiliate' for affiliate links"
            />
          </div>
          {campaignLink.campaign && (
            <div className="mt-4 p-3 bg-[var(--lighter-dark)] rounded border border-gray-600">
              <p className="text-xs text-gray-400 mb-1">Preview Campaign Link:</p>
              <p className="text-sm text-gray-300 font-mono break-all">
                {generateCampaignLink(selectedAffiliate?.id, campaignLink)}
              </p>
            </div>
          )}
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setShowCampaignModal(false);
                setCampaignLink({ campaign: "", utmSource: "", utmMedium: "affiliate", utmCampaign: "" });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                try {
                  const handle = campaignLink.utmSource || affiliateData?.profile?.handle || selectedAffiliate?.id;
                  const campaignLinkData = {
                    campaign: campaignLink.campaign,
                    utmSource: handle,
                    utmMedium: campaignLink.utmMedium,
                    utmCampaign: campaignLink.utmCampaign || campaignLink.campaign,
                  };

                  // Save campaign link to affiliate profile
                  const currentProfile = affiliateData?.profile || {};
                  const existingCampaigns = currentProfile.campaignLinks || [];
                  
                  await createAffiliateProfile({
                    userId: selectedAffiliate.id,
                    ...currentProfile,
                    campaignLinks: [...existingCampaigns, campaignLinkData],
                  });

                  notify({ message: "Campaign link created successfully", type: "success" });
                  setShowCampaignModal(false);
                  setCampaignLink({ campaign: "", utmSource: "", utmMedium: "affiliate", utmCampaign: "" });
                  loadAffiliateDetails(selectedAffiliate.id);
                } catch (error) {
                  console.error("Error creating campaign link:", error);
                  notify({ message: "Failed to create campaign link", type: "error" });
                }
              }}
            >
              Create Link
            </Button>
          </div>
        </div>
      </Modal>

      {/* Process Payout Modal */}
      <Modal
        isOpen={showPayoutModal}
        onClose={() => {
          setShowPayoutModal(false);
        }}
        title="Review & Process Payout"
        size="lg"
      >
        {eligiblePayoutData && (
          <div className="space-y-6 p-6">
            <div className="bg-[var(--lighter-dark)] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Affiliate</span>
                <span className="text-gray-200 font-semibold">
                  {selectedAffiliate?.name || selectedAffiliate?.email || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Eligible Amount</span>
                <span className={`text-2xl font-bold ${
                  eligiblePayoutData.meetsMinimum 
                    ? "text-[var(--primary-color)]" 
                    : "text-yellow-400"
                }`}>
                  ${eligiblePayoutData.eligibleAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Commissions Included</span>
                <span className="text-gray-200">{eligiblePayoutData.commissionCount}</span>
              </div>
            </div>

            {!eligiblePayoutData.meetsMinimum && (
              <div className="p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-300 font-semibold">Minimum Threshold Not Met</span>
                </div>
                <p className="text-yellow-200 text-sm">
                  The minimum payout amount is $150. Current eligible amount: ${eligiblePayoutData.eligibleAmount.toFixed(2)}.
                  Payout cannot be processed until the minimum is reached.
                </p>
              </div>
            )}

            {eligiblePayoutData.eligibleCommissions.length > 0 && (
              <div>
                <h4 className="text-gray-200 font-semibold mb-3">Commissions Included:</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {eligiblePayoutData.eligibleCommissions.map((comm) => (
                    <div key={comm.id} className="flex items-center justify-between p-3 bg-[var(--lighter-dark)] rounded">
                      <div>
                        <p className="text-gray-200 text-sm">{comm.customer}</p>
                        <p className="text-gray-400 text-xs">
                          {new Date(comm.chargeDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-gray-200 font-semibold">${comm.commission.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-600">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPayoutModal(false);
                }}
                disabled={isProcessingPayout}
              >
                Cancel
              </Button>
              <Button
                onClick={handleProcessPayout}
                disabled={!eligiblePayoutData?.meetsMinimum || isProcessingPayout}
              >
                {isProcessingPayout ? "Processing..." : "Process Payout"}
              </Button>
            </div>

            {affiliateData?.profile?.stripeConnectAccountId ? (
              <div className="p-3 bg-green-900/20 border border-green-500/30 rounded text-xs text-gray-300">
                <p className="font-semibold mb-1 text-green-300">✓ Stripe Connect Enabled:</p>
                <p>
                  Payout will be automatically transferred to the affiliate's Stripe Connect account.
                  Transfer typically takes 2-7 business days to reach their bank account.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded text-xs text-gray-300">
                <p className="font-semibold mb-1 text-yellow-300">⚠ Manual Processing Required:</p>
                <p>
                  Stripe Connect account not set up. Payout record will be created, but you'll need to process the transfer manually via Stripe Dashboard or set up Connect account first.
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Affiliates;

