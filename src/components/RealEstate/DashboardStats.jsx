
import { TrendingUp, TrendingDown, Users, Building, DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../RealEstate/ui/Card';

const stats = [
  {
    title: 'Total Clients',
    value: '248',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Active Listings',
    value: '32',
    change: '+8%',
    trend: 'up',
    icon: Building,
    color: 'bg-green-500'
  },
  {
    title: 'Revenue This Month',
    value: '$84,200',
    change: '+23%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-purple-500'
  },
  {
    title: 'Scheduled Showings',
    value: '18',
    change: '-3%',
    trend: 'down',
    icon: Calendar,
    color: 'bg-orange-500'
  }
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-lg bg-[var(--lighter-dark)] border-none hover:bg-[var(--medium-dark)] transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              {stat.title}
            </CardTitle>
            <div className={`${stat.color} p-2 rounded-lg`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-300">{stat.value}</div>
            <div className="flex items-center mt-1">
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last month
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}