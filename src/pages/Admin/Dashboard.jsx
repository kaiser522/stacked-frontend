import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/UI/Card";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import {
  useGetPaymentHistoryQuery,
  useGetMonthlyRevenueQuery,
  useGetSubscriptionsQuery,
} from "../../store/apis/payment.api";
import { useGetAdminStatsQuery } from "../../store/apis/user.api";
import { useGetEmailsQuery } from "../../store/apis/emails.api";
import { useGetDisputesQuery } from "../../store/apis/payment.api";

const Dashboard = () => {
  const navigate = useNavigate();

  // Fetch all dashboard data
  const { data: paymentHistoryData, isLoading: isLoadingPayments } = useGetPaymentHistoryQuery({ limit: 1000 });
  const { data: userStatsData, isLoading: isLoadingUsers } = useGetAdminStatsQuery();
  const { data: emailsData, isLoading: isLoadingEmails } = useGetEmailsQuery({ folder: "inbox", limit: 50 });
  const { data: disputesData, isLoading: isLoadingDisputes } = useGetDisputesQuery({});
  const { data: subscriptionsData, isLoading: isLoadingSubscriptions } = useGetSubscriptionsQuery({});

  const payments = paymentHistoryData?.data?.payments || paymentHistoryData?.payments || [];
  const userStats = userStatsData?.data || userStatsData || {};
  const inboxEmails = emailsData?.emails || [];
  const disputes = disputesData?.data?.disputes || disputesData?.disputes || [];
  const subscriptions = subscriptionsData?.data?.subscriptions || subscriptionsData?.subscriptions || [];

  // Calculate monthly revenue for the last 12 months
  const revenueData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const revenueByMonth = {};

    // Initialize all months with 0
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      revenueByMonth[key] = {
        month: months[date.getMonth()],
        revenue: 0,
      };
    }

    // Calculate revenue for each month
    payments.forEach((payment) => {
      if (payment.status === "succeeded" && payment.createdAt) {
        const paymentDate = new Date(payment.createdAt);
        const key = `${paymentDate.getFullYear()}-${paymentDate.getMonth()}`;
        if (revenueByMonth[key]) {
          const amount = typeof payment.amount === "string"
            ? parseFloat(payment.amount.replace(/[^0-9.-]+/g, ""))
            : payment.amount || 0;
          revenueByMonth[key].revenue += amount;
        }
      }
    });

    // Convert to array and reverse to show oldest to newest
    return Object.values(revenueByMonth).reverse();
  }, [payments]);

  // Calculate current month revenue
  const currentMonthRevenue = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return payments
      .filter((payment) => {
        if (!payment.createdAt || payment.status !== "succeeded") return false;
        const paymentDate = new Date(payment.createdAt);
        return (
          paymentDate.getMonth() === currentMonth &&
          paymentDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, payment) => {
        const amount = typeof payment.amount === "string"
          ? parseFloat(payment.amount.replace(/[^0-9.-]+/g, ""))
          : payment.amount || 0;
        return sum + amount;
      }, 0);
  }, [payments]);

  // Calculate total active users (users with status 'active' or 'online')
  const activeUsersCount = useMemo(() => {
    if (userStats.activeUsers !== undefined) return userStats.activeUsers;
    // Fallback: count users who have been active in last 30 days or have active subscriptions
    return userStats.totalUsers || 0;
  }, [userStats]);

  const totalUsers = userStats.totalUsers || 0;
  const supportEmailsCount = inboxEmails.filter(email => email.status === "inbox").length;
  const openTicketsCount = disputes.filter(dispute => 
    dispute.status === "needs_response" || dispute.status === "warning_needs_response"
  ).length;

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const formatTimeAgo = (date) => {
    if (!date) return "N/A";
    try {
      const now = new Date();
      const past = new Date(date);
      const diffMs = now - past;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "just now";
      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } catch {
      return "N/A";
    }
  };

  // Recent activity from payments, emails, disputes, and subscriptions
  const recentActivity = useMemo(() => {
    const activities = [];

    // Add recent payments
    payments
      .filter((p) => p.status === "succeeded")
      .slice(0, 5)
      .forEach((payment) => {
        activities.push({
          type: "payment",
          message: `User ${payment.customerEmail || "customer"} made a payment of ${formatCurrency(payment.amount)}`,
          time: payment.createdAt,
          color: "bg-green-500",
        });
      });

    // Add recent subscriptions
    subscriptions
      .filter((sub) => sub.status === "active" || sub.status === "trialing")
      .slice(0, 3)
      .forEach((subscription) => {
        activities.push({
          type: "subscription",
          message: `New ${subscription.status === "trialing" ? "trial" : "active"} subscription from ${subscription.customerEmail || "customer"}`,
          time: subscription.createdAt || subscription.currentPeriodStart,
          color: "bg-purple-500",
        });
      });

    // Add recent emails
    inboxEmails.slice(0, 3).forEach((email) => {
      activities.push({
        type: "email",
        message: `New support email from ${email.from}`,
        time: email.createdAt || email.time,
        color: "bg-blue-500",
      });
    });

    // Add recent disputes
    disputes.slice(0, 2).forEach((dispute) => {
      activities.push({
        type: "dispute",
        message: `Payment dispute from ${dispute.customerEmail || "customer"}`,
        time: dispute.createdAt,
        color: "bg-orange-500",
      });
    });

    return activities
      .sort((a, b) => {
        const timeA = new Date(a.time || 0);
        const timeB = new Date(b.time || 0);
        return timeB - timeA;
      })
      .slice(0, 8); // Show more activities
  }, [payments, inboxEmails, disputes, subscriptions]);

  const isLoading = isLoadingPayments || isLoadingUsers || isLoadingEmails || isLoadingDisputes || isLoadingSubscriptions;

  return (
    <div className="min-h-screen bg-[#2D3A48] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-300">Admin Dashboard</h1>
          <p className="text-gray-300 mt-2">
            Welcome to your internal admin dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-[#324250] border-blue-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--primary-color)]">
                    Support Emails
                  </p>
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-color)] mx-auto mt-2" />
                  ) : (
                    <p className="text-2xl text-center font-bold text-gray-300">
                      {supportEmailsCount}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#324250] border-green-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">
                    Active Users
                  </p>
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-green-600 mx-auto mt-2" />
                  ) : (
                    <p className="text-2xl text-center font-bold text-gray-300">
                      {activeUsersCount.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#324250] border-purple-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-400">
                    Revenue (MTD)
                  </p>
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-green-400 mx-auto mt-2" />
                  ) : (
                    <p className="text-2xl text-center font-bold text-gray-300">
                      {formatCurrency(currentMonthRevenue)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#324250] border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center flex-col justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">
                    Open Tickets
                  </p>
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-orange-600 mx-auto mt-2" />
                  ) : (
                    <p className="text-2xl text-center font-bold text-gray-300">
                      {openTicketsCount}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#324250]">
            <CardHeader>
              <CardTitle className="text-gray-200">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-color)]" />
                  <span className="ml-2 text-gray-300">Loading activity...</span>
                </div>
              ) : recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                      <span className="text-sm text-gray-300 flex-1">
                        {activity.message}
                      </span>
                      <span className="text-xs text-gray-300">
                        {formatTimeAgo(activity.time)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No recent activity
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#324250]">
            <CardHeader>
              <CardTitle className="text-gray-200">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-16 flex flex-col"
                  onClick={() => {
                    navigate("/admin/emails");
                  }}
                >
                  <span className="text-sm">Check Emails</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-16 flex flex-col"
                  onClick={() => {
                    navigate("/admin/payments");
                  }}
                >
                  <span className="text-sm">View Payments</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-16 flex flex-col"
                  onClick={() => {
                    navigate("/admin/account-look-up");
                  }}
                >
                  <span className="text-sm">User Lookup</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-16 flex flex-col"
                  onClick={() => {
                    navigate("/admin/news-letters");
                  }}
                >
                  <span className="text-sm">Newsletters</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trends Chart */}
        <div className="mt-7">
          <Card className="bg-[#324250]">
            <CardHeader>
              <CardTitle className="text-gray-200">Revenue Trends</CardTitle>
              <p className="text-sm text-gray-300">
                Monthly revenue over the past 12 months
              </p>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-80">
                  <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-color)]" />
                  <span className="ml-2 text-gray-300">Loading revenue data...</span>
                </div>
              ) : (
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis dataKey="month" stroke="#e1e5ee" fontSize={12} />
                      <YAxis
                        stroke="#e1e5ee"
                        fontSize={12}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        formatter={(value) => [
                          `$${value.toLocaleString()}`,
                          "Revenue",
                        ]}
                        labelStyle={{ color: "#374151" }}
                        contentStyle={{
                          backgroundColor: "#f9fafb",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--primary-color)"
                        strokeWidth={3}
                        dot={{ fill: "#eae5f4", strokeWidth: 2, r: 4 }}
                        activeDot={{
                          r: 6,
                          stroke: "var(--primary-color)",
                          strokeWidth: 1,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
