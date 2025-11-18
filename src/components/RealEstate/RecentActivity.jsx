import { Card, CardContent, CardHeader, CardTitle } from '../RealEstate/ui/Card';
import { Badge } from '../RealEstate/ui/Badge';
import { Clock, User, Home, FileText } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'client',
    title: 'New client inquiry from Sarah Johnson',
    time: '2 hours ago',
    icon: User,
    status: 'new'
  },
  {
    id: 2,
    type: 'listing',
    title: 'Property at 123 Oak St marked as sold',
    time: '4 hours ago',
    icon: Home,
    status: 'completed'
  },
  {
    id: 3,
    type: 'document',
    title: 'Contract signed for 456 Pine Ave',
    time: '6 hours ago',
    icon: FileText,
    status: 'signed'
  },
  {
    id: 4,
    type: 'client',
    title: 'Follow-up scheduled with Mike Davis',
    time: '8 hours ago',
    icon: Clock,
    status: 'scheduled'
  },
  {
    id: 5,
    type: 'listing',
    title: 'New listing added: 789 Maple Dr',
    time: '1 day ago',
    icon: Home,
    status: 'active'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'new':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'signed':
      return 'bg-purple-100 text-purple-800';
    case 'scheduled':
      return 'bg-orange-100 text-orange-800';
    case 'active':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function RecentActivity() {
  return (
    <Card className="bg-[var(--lighter-dark)] border-none">
      <CardHeader>
        <CardTitle className="text-gray-300">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[var(--medium-dark)] transition-colors"
            >
              <div className="bg-gray-200 p-2 rounded-lg">
                <activity.icon className="w-4 h-4 text-[var(--primary-color)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-300 truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
              <Badge className={getStatusColor(activity.status)}>
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
