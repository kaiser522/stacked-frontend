import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/UI/Card";
import { Badge } from "../../components/UI/Badge";
import Button from "../../components/Button";
import SearchInput from "../../components/Form/SearchInput";
import {
  useGetPaymentHistoryQuery,
  useGetSubscriptionsQuery,
  useGetDisputesQuery,
  useGetPaymentStatsQuery,
} from "../../store/apis/payment.api";
import { Loader2, ExternalLink, Download } from "lucide-react";

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all, subscriptions, disputes

  // Fetch payment data
  const { data: paymentHistoryData, isLoading: isLoadingPayments } = useGetPaymentHistoryQuery({ limit: 100 });
  const { data: subscriptionsData, isLoading: isLoadingSubscriptions } = useGetSubscriptionsQuery({});
  const { data: disputesData, isLoading: isLoadingDisputes } = useGetDisputesQuery({});
  const { isLoading: isLoadingStats } = useGetPaymentStatsQuery({});

  const payments = useMemo(() => 
    paymentHistoryData?.data?.payments || paymentHistoryData?.payments || [],
    [paymentHistoryData]
  );
  const subscriptions = useMemo(() => 
    subscriptionsData?.data?.subscriptions || subscriptionsData?.subscriptions || [],
    [subscriptionsData]
  );
  const disputes = useMemo(() => 
    disputesData?.data?.disputes || disputesData?.disputes || [],
    [disputesData]
  );

  // Calculate monthly revenue from current month's payments
  const monthlyRevenue = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyPayments = payments.filter((payment) => {
      if (!payment.createdAt) return false;
      const paymentDate = new Date(payment.createdAt);
      return (
        paymentDate.getMonth() === currentMonth &&
        paymentDate.getFullYear() === currentYear &&
        payment.status === "succeeded"
      );
    });

    return monthlyPayments.reduce((sum, payment) => {
      const amount = typeof payment.amount === "string" 
        ? parseFloat(payment.amount.replace(/[^0-9.-]+/g, "")) 
        : payment.amount || 0;
      return sum + amount;
    }, 0);
  }, [payments]);

  // Calculate yearly revenue
  const yearlyRevenue = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();

    const yearlyPayments = payments.filter((payment) => {
      if (!payment.createdAt) return false;
      const paymentDate = new Date(payment.createdAt);
      return (
        paymentDate.getFullYear() === currentYear &&
        payment.status === "succeeded"
      );
    });

    return yearlyPayments.reduce((sum, payment) => {
      const amount = typeof payment.amount === "string" 
        ? parseFloat(payment.amount.replace(/[^0-9.-]+/g, "")) 
        : payment.amount || 0;
      return sum + amount;
    }, 0);
  }, [payments]);

  // Filter transactions based on search and active tab
  const filteredTransactions = useMemo(() => {
    let transactions = [];

    if (activeTab === "subscriptions") {
      transactions = subscriptions.map((sub) => ({
        id: sub.id || sub._id,
        customer: sub.customerEmail || sub.customer?.email || "N/A",
        amount: sub.amount || 0,
        type: "subscription",
        status: sub.status || "active",
        date: sub.createdAt || sub.currentPeriodStart,
        description: sub.planName || sub.plan?.name || "Subscription",
        subscriptionId: sub.id,
      }));
    } else if (activeTab === "disputes") {
      transactions = disputes.map((dispute) => ({
        id: dispute.id || dispute._id,
        customer: dispute.customerEmail || dispute.customer?.email || "N/A",
        amount: dispute.amount || 0,
        type: "dispute",
        status: dispute.status || "needs_response",
        date: dispute.createdAt,
        description: dispute.reason || "Dispute",
        disputeId: dispute.id,
      }));
    } else {
      transactions = payments.map((payment) => ({
        id: payment.id || payment.paymentIntentId || payment._id,
        customer: payment.customerEmail || payment.customer?.email || "N/A",
        amount: payment.amount || 0,
        type: payment.type || "payment",
        status: payment.status || "unknown",
        date: payment.createdAt,
        description: payment.description || payment.planName || "Payment",
      }));
    }

    if (searchTerm) {
      transactions = transactions.filter((txn) =>
        txn.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return transactions.sort((a, b) => {
      const dateA = new Date(a.date || 0);
      const dateB = new Date(b.date || 0);
      return dateB - dateA; // Most recent first
    });
  }, [payments, subscriptions, disputes, activeTab, searchTerm]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "succeeded":
      case "active":
      case "paid":
        return "bg-green-100 text-green-800";
      case "processing":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
      case "canceled":
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "disputed":
      case "needs_response":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "subscription":
        return "bg-blue-100 text-blue-800";
      case "refund":
        return "bg-orange-100 text-orange-800";
      case "dispute":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return "$0.00";
    const numAmount = typeof amount === "string" 
      ? parseFloat(amount.replace(/[^0-9.-]+/g, "")) 
      : amount;
    return `$${numAmount.toFixed(2)}`;
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

  const handleExport = () => {
    const csvContent = [
      ["ID", "Customer", "Amount", "Type", "Status", "Date", "Description"],
      ...filteredTransactions.map((txn) => [
        txn.id,
        txn.customer,
        formatCurrency(txn.amount),
        txn.type,
        txn.status,
        formatDate(txn.date),
        txn.description,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payments-export-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const successfulPaymentsCount = payments.filter(
    (p) => p.status === "succeeded"
  ).length;
  const activeSubscriptionsCount = subscriptions.filter(
    (s) => s.status === "active"
  ).length;
  const disputesCount = disputes.length;

  const isLoading = isLoadingPayments || isLoadingSubscriptions || isLoadingDisputes || isLoadingStats;

  return (
    <div className="space-y-8 bg-[var(--lighter-dark)] p-6 mx-auto">
      <div>
        <h1 className="heading-3 text-[var(--primary-color)]">
          Payments Overview
        </h1>
        <p className="text-[var(--gray)] mt-2">
          Manage transactions, subscriptions, and disputes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="bg-[#324250]">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-[var(--primary-color)]">
                {formatCurrency(monthlyRevenue)}
              </p>
              <p className="text-sm text-[var(--gray)]">
                Total Revenue Monthly
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#324250]">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-[var(--primary-color)]">
                {formatCurrency(yearlyRevenue)}
              </p>
              <p className="text-sm text-[var(--gray)]">Total Revenue Yearly</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#324250]">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-green-600">
                {successfulPaymentsCount}
              </p>
              <p className="text-sm text-[var(--gray)]">Successful Payments</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#324250]">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {activeSubscriptionsCount}
              </p>
              <p className="text-sm text-[var(--gray)]">Active Subscriptions</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#324250]">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{disputesCount}</p>
              <p className="text-sm text-[var(--gray)]">Disputes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex space-x-4">
        <SearchInput
          placeholder="Search by customer email or transaction ID..."
          value={searchTerm}
          setValue={setSearchTerm}
          className="max-w-sm py-3"
        />
        <div className="flex gap-2">
          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            onClick={() => setActiveTab("all")}
            className="py-1"
          >
            All Transactions
          </Button>
          <Button
            variant={activeTab === "subscriptions" ? "default" : "outline"}
            onClick={() => setActiveTab("subscriptions")}
            className="py-1"
          >
            Subscriptions ({activeSubscriptionsCount})
          </Button>
          <Button
            variant={activeTab === "disputes" ? "default" : "outline"}
            onClick={() => setActiveTab("disputes")}
            className="py-1"
          >
            Disputes ({disputesCount})
          </Button>
        </div>
        <Button className="py-1" variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
        <Button
          className="py-1 text-[var(--gray)]"
          onClick={() =>
            window.open("https://dashboard.stripe.com", "_blank")
          }
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Open Stripe Dashboard
        </Button>
      </div>

      {/* Transactions Table */}
      <Card className="bg-[#324250]">
        <CardHeader>
          <CardTitle className="text-[var(--gray)]">
            {activeTab === "all" && "Recent Transactions"}
            {activeTab === "subscriptions" && "Active Subscriptions"}
            {activeTab === "disputes" && "Disputes"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-color)]" />
              <span className="ml-2 text-gray-300">Loading payment data...</span>
            </div>
          ) : filteredTransactions.length > 0 ? (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-[var(--dark-bg)] rounded-lg hover:bg-[#1e2a38c0] transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm text-[var(--gray)]">
                        {transaction.id}
                      </span>
                      <Badge className={getTypeColor(transaction.type)}>
                        {transaction.type}
                      </Badge>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="mt-1">
                      <span className="font-medium text-[var(--gray)]">
                        {transaction.customer}
                      </span>
                      <span className="text-[var(--gray)] ml-2">
                        • {transaction.description}
                      </span>
                    </div>
                    <div className="text-sm text-[var(--gray)]">
                      {formatDate(transaction.date)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[var(--gray)] text-lg">
                      {formatCurrency(transaction.amount)}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              {searchTerm
                ? "No transactions found matching your search"
                : activeTab === "subscriptions"
                ? "No subscriptions found"
                : activeTab === "disputes"
                ? "No disputes found"
                : "No transactions found"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
