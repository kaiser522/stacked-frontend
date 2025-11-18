import React, { useState, useEffect } from "react";
import { Search, User, Mail, Phone, CreditCard, Calendar, Package, ExternalLink, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/UI/Card";
import { Badge } from "../../components/UI/Badge";
import Button from "../../components/Button";
import SearchInput from "../../components/Form/SearchInput";
import userService from "../../services/userService";
import { useGetPaymentHistoryQuery, useGetUserSubscriptionQuery } from "../../store/apis/payment.api";
import { useNavigate } from "react-router-dom";

function AccountLookUp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const navigate = useNavigate();

  // Get payment history for selected user
  const { data: paymentData, isLoading: isLoadingPayments } = useGetPaymentHistoryQuery(
    { userId: selectedUser?.id },
    { skip: !selectedUser?.id }
  );

  // Get subscription data for selected user
  const { data: subscriptionData, isLoading: isLoadingSubscription } = useGetUserSubscriptionQuery(
    selectedUser?.id,
    { skip: !selectedUser?.id }
  );

  const payments = paymentData?.data?.payments || paymentData?.payments || [];
  const subscription = subscriptionData?.data?.subscription || subscriptionData?.subscription || null;

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchError("Please enter an email or phone number to search");
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setSelectedUser(null);

    try {
      // Search users by email or phone
      const results = await userService.searchUsers(searchQuery.trim());
      setSearchResults(results || []);
      
      if (!results || results.length === 0) {
        setSearchError("No users found matching your search");
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchError("Failed to search users. Please try again.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    // Fetch additional user details if needed
    try {
      const fullUserData = await userService.getUserById(user.id);
      setSelectedUser(fullUserData);
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Keep the basic user data even if detailed fetch fails
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      online: { color: "bg-green-100 text-green-800", label: "Active" },
      offline: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
      away: { color: "bg-yellow-100 text-yellow-800", label: "Away" },
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      inactive: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
    };
    const statusInfo = statusMap[status] || statusMap.inactive;
    return (
      <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
    );
  };

  const getRoleBadge = (role) => {
    const roleMap = {
      admin: { color: "bg-purple-100 text-purple-800", label: "Admin" },
      agent: { color: "bg-blue-100 text-blue-800", label: "Agent" },
      client: { color: "bg-gray-100 text-gray-800", label: "Client" },
      affiliate: { color: "bg-teal-100 text-teal-800", label: "Affiliate" },
    };
    const roleInfo = roleMap[role] || roleMap.client;
    return (
      <Badge className={roleInfo.color}>{roleInfo.label}</Badge>
    );
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return "$0.00";
    const numAmount = typeof amount === "string" ? parseFloat(amount.replace(/[^0-9.-]+/g, "")) : amount;
    return `$${numAmount.toFixed(2)}`;
  };

  const handleViewCRM = () => {
    if (selectedUser?.role === "real_estate") {
      navigate(`/realestate/dashboard?userId=${selectedUser.id}`);
    } else {
      // For other roles, navigate to appropriate dashboard
      navigate(`/admin/emails?userId=${selectedUser.id}`);
    }
  };

  return (
    <div className="space-y-8 bg-[var(--lighter-dark)] p-6 mx-auto">
      <div>
        <h1 className="heading-3 text-[var(--primary-color)]">
          Account Look Up
        </h1>
        <p className="text-[var(--gray)] mt-2">
          Search for users by email or phone number to view comprehensive account information
        </p>
      </div>

      {/* Search Section */}
      <Card className="bg-[#324250]">
        <CardHeader>
          <CardTitle className="text-[var(--gray)]">Search Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <SearchInput
                placeholder="Enter email address or phone number..."
                value={searchQuery}
                setValue={setSearchQuery}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="w-full"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-6"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
          {searchError && (
            <p className="text-red-400 text-sm mt-2">{searchError}</p>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card className="bg-[#324250]">
          <CardHeader>
            <CardTitle className="text-[var(--gray)]">
              Search Results ({searchResults.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedUser?.id === user.id
                      ? "bg-[var(--primary-color)]/20 border-2 border-[var(--primary-color)]"
                      : "bg-[var(--lighter-dark)] hover:bg-[#2d3a48da]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--primary-color)]/20 flex items-center justify-center text-[var(--primary-color)] font-bold text-lg">
                        {user.avatar || "?"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{user.name || "N/A"}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-300">{user.email || "No email"}</span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-300">{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(user.status)}
                      {getRoleBadge(user.role)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected User Details */}
      {selectedUser && (
        <div className="space-y-6">
          {/* User Overview */}
          <Card className="bg-[#324250]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[var(--gray)]">Account Overview</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewCRM}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View User CRM
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-[var(--primary-color)]/20 flex items-center justify-center text-[var(--primary-color)] font-bold text-2xl">
                      {selectedUser.avatar || "?"}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedUser.name || "N/A"}</h2>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusBadge(selectedUser.status)}
                        {getRoleBadge(selectedUser.role)}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white">{selectedUser.email || "N/A"}</p>
                      </div>
                    </div>
                    {selectedUser.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-400">Phone</p>
                          <p className="text-white">{selectedUser.phone}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">User ID</p>
                        <p className="text-white font-mono text-sm">{selectedUser.id}</p>
                      </div>
                    </div>
                    {selectedUser.lastSeen && (
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-400">Last Seen</p>
                          <p className="text-white">{formatDate(selectedUser.lastSeen)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Subscription Information</h3>
                  {isLoadingSubscription ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="w-4 h-4 animate-spin text-[var(--primary-color)]" />
                      <span className="ml-2 text-gray-300 text-sm">Loading subscription...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-4 bg-[var(--lighter-dark)] rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-4 h-4 text-[var(--primary-color)]" />
                          <p className="text-sm text-gray-400">Current Plan</p>
                        </div>
                        <p className="text-white font-semibold">
                          {subscription?.planName || selectedUser.plan || "No active plan"}
                        </p>
                      </div>
                      <div className="p-4 bg-[var(--lighter-dark)] rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="w-4 h-4 text-[var(--primary-color)]" />
                          <p className="text-sm text-gray-400">Subscription Status</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={
                            subscription?.status === 'active' || subscription?.status === 'trialing'
                              ? "bg-green-100 text-green-800"
                              : subscription?.status === 'canceled' || subscription?.status === 'past_due'
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }>
                            {subscription?.status || selectedUser.subscription?.status || "N/A"}
                          </Badge>
                          {subscription?.cancelAtPeriodEnd && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Cancels at period end
                            </Badge>
                          )}
                        </div>
                      </div>
                      {subscription?.nextBillingDate && (
                        <div className="p-4 bg-[var(--lighter-dark)] rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-[var(--primary-color)]" />
                            <p className="text-sm text-gray-400">Next Billing Date</p>
                          </div>
                          <p className="text-white font-semibold">
                            {formatDate(subscription.nextBillingDate)}
                          </p>
                        </div>
                      )}
                      {subscription?.amount && (
                        <div className="p-4 bg-[var(--lighter-dark)] rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="w-4 h-4 text-[var(--primary-color)]" />
                            <p className="text-sm text-gray-400">Monthly Amount</p>
                          </div>
                          <p className="text-white font-semibold">
                            {formatCurrency(subscription.amount)} {subscription.currency?.toUpperCase() || 'USD'}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card className="bg-[#324250]">
            <CardHeader>
              <CardTitle className="text-[var(--gray)]">Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingPayments ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-color)]" />
                  <span className="ml-2 text-gray-300">Loading payment history...</span>
                </div>
              ) : payments.length > 0 ? (
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <div
                      key={payment.id || payment._id}
                      className="p-4 bg-[var(--lighter-dark)] rounded-lg hover:bg-[#2d3a48da] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-sm text-gray-300">
                              {payment.id || payment.paymentIntentId || payment._id || "N/A"}
                            </span>
                            <Badge
                              className={
                                payment.status === "succeeded"
                                  ? "bg-green-100 text-green-800"
                                  : payment.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {payment.status || "Unknown"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">
                            {payment.description || payment.planName || "Payment"}
                          </p>
                          {payment.createdAt && (
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(payment.createdAt)}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">
                            {formatCurrency(payment.amount)}
                          </p>
                          {payment.currency && payment.currency !== "usd" && (
                            <p className="text-xs text-gray-400 uppercase">{payment.currency}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No payment history found for this user
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default AccountLookUp;
