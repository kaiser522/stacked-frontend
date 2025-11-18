import DashboardStats from "../../components/RealEstate/DashboardStats";
import RecentActivity from "../../components/RealEstate/RecentActivity";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/RealEstate/ui/Card";
import { Button } from "../../components/RealEstate/ui/Button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const monthlyData = [
  { month: "Jan", listings: 12, sales: 8, revenue: 45000 },
  { month: "Feb", listings: 15, sales: 11, revenue: 62000 },
  { month: "Mar", listings: 18, sales: 14, revenue: 78000 },
  { month: "Apr", listings: 22, sales: 16, revenue: 89000 },
  { month: "May", listings: 25, sales: 19, revenue: 95000 },
  { month: "Jun", listings: 28, sales: 22, revenue: 112000 },
];

const RealEstate = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[var(--medium-dark)] to-[var(--lighter-dark)] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
            <p className="opacity-80">
              Here's what's happening with your real estate business today.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <DashboardStats />

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="bg-[var(--lighter-dark)] border-none">
          <CardHeader>
            <CardTitle className="text-gray-300">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fill: "white" }} />
                <YAxis tick={{ fill: "white" }} />
                <Tooltip
                  formatter={(value, name) => [
                    name === "revenue" ? `$${value.toLocaleString()}` : value,
                    name === "revenue"
                      ? "Revenue"
                      : name === "listings"
                        ? "Listings"
                        : "Sales",

                  ]}

                />
                <Bar dataKey="listings" fill="#3b82f6" name="listings" />
                <Bar dataKey="sales" fill="#10b981" name="sales" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* Revenue Trend */}
      <Card className="bg-[var(--lighter-dark)] border-none">
        <CardHeader>
          <CardTitle className="text-gray-300">Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: "white" }} />
              <YAxis tick={{ fill: "white" }} />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}

              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#1ec8c8"
                strokeWidth={3}
                dot={{ fill: "#1ec8c8", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer  border-[var(--primary-color)] hover:bg-[var(--medium-dark)] bg-[var(--lighter-dark)] ">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-gray-300 text-lg mb-2">Schedule Showing</h3>
            <p className="text-gray-400 text-sm">
              Book property viewings with clients
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer border-[var(--primary-color)]  hover:bg-[var(--medium-dark)] bg-[var(--lighter-dark)] ">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-gray-300 text-lg mb-2">Add New Listing</h3>
            <p className="text-gray-400 text-sm">
              List a new property for sale
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer border-[var(--primary-color)]  hover:bg-[var(--medium-dark)] bg-[var(--lighter-dark)] ">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-gray-300 text-lg mb-2">Send Follow-up</h3>
            <p className="text-gray-400 text-sm">
              Connect with potential clients
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealEstate;
