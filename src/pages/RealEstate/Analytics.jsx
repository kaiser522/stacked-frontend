import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import {
  BarChart,
  Users,
  DollarSign,
  CheckCircle,
  Calendar,
  FileText,
  TrendingUp,
  Download,
  Pencil,
} from "lucide-react";
import { getUserIdFromStorage } from "./MyFavorites";
import { useGetRealEstateUsersQuery, useUpdateGoalProgressMutation } from "../../store/apis/user.api";

const Analytics = () => {
  const [dateFilter, setDateFilter] = useState("30d");
  const [selectedRow, setSelectedRow] = useState(null);

  // Activity Hub states
  const [showPriorityDetails, setShowPriorityDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("reminders");
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'call',
    title: '',
    description: '',
    client: '',
    property: '',
    status: 'pending'
  });
  const [reminders, setReminders] = useState([
    {
      id: 1,
      client: "Sarah Johnson",
      priority: "high",
      score: 91,
      message: "No contact in 14 days - Last viewed $450K listing",
      breakdown: "No contact 14d (+30) • Hot lead (+25) • High-value (×1.4)",
      time: "14 days ago",
      property: "📍 Main St",
      completed: false
    },
    {
      id: 2,
      client: "Jennifer Adams",
      priority: "high",
      score: 87,
      message: "Pre-approval expires in 5 days",
      breakdown: "Pre-approval expiring (+35) • VIP client (×1.5) • Hot lead (+25)",
      time: "Expires Jun 5",
      property: "🏦 Pre-approved",
      completed: false
    },
    {
      id: 3,
      client: "Mike & Lisa Chen",
      priority: "medium",
      score: 52,
      message: "Follow up on yesterday's showing",
      time: "1 day ago",
      property: "📍 Oak Street",
      completed: false
    },
    {
      id: 4,
      client: "Maria Rodriguez",
      priority: "low",
      score: 22,
      message: "Birthday follow-up opportunity",
      time: "Birthday today",
      property: "🎂 Past client",
      completed: false
    }
  ]);
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "call",
      title: "Phone Call",
      description: "Called Sarah Johnson about the Main Street property",
      client: "Sarah Johnson",
      property: "📍 Main St",
      time: "2 hours ago",
      status: "Completed"
    },
    {
      id: 2,
      type: "email",
      title: "Email Sent",
      description: "Sent market update to Mike Chen",
      client: "Mike Chen",
      property: "🏢 Downtown",
      time: "4 hours ago",
      status: "Opened"
    }
  ]);

  const userId = useMemo(() => getUserIdFromStorage(), []);

  const { data: usersData, refetch: refetchUsers } = useGetRealEstateUsersQuery();
  const [updateGoalProgress, { isLoading: isUpdatingGoals }] = useUpdateGoalProgressMutation();
  const user = usersData?.data?.find((user) => user._id === userId);
  console.log(user);

  // Transform goalProgress data to match the expected format
  const goals = useMemo(() => {
    if (!user?.goalProgress) return [];

    return user.goalProgress.map(goal => {
      let current, total;
      // Protect against division by zero
      const percentage = goal.targetValue > 0 
        ? Math.round((goal.currentValue / goal.targetValue) * 100)
        : 0;

      switch (goal.goalType) {
        case 'annual_revenue':
          current = `$${(goal.currentValue / 1000).toFixed(0)}${goal.unit}`;
          total = `$${(goal.targetValue / 1000).toFixed(0)}${goal.unit}`;
          break;
        default:
          current = `${goal.currentValue} ${goal.unit}`;
          total = `${goal.targetValue} ${goal.unit}`;
      }

      return {
        title: goal.title,
        value: percentage,
        current,
        total,
        goalType: goal.goalType,
        currentValue: goal.currentValue,
        targetValue: goal.targetValue,
        unit: goal.unit,
      };
    });
  }, [user?.goalProgress]);

  // Store initial goals data when component mounts to prevent changes during modal
  const [initialGoals, setInitialGoals] = useState([]);


  // Editable states - use a more stable approach
  const [goalsState, setGoalsState] = useState([]);
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const isModalOpenRef = useRef(false);

  // Use refs to store input values to prevent external changes
  const inputValuesRef = useRef({});
  const inputRefs = useRef({});

  // Update initialGoals when goals data changes, but only when not editing
  useEffect(() => {
    if (goals.length > 0) {
      // Only update initialGoals if we're not currently editing
      if (initialGoals.length === 0 || !isEditingGoals) {
        setInitialGoals(goals);
      }
    }
  }, [goals, initialGoals.length, isEditingGoals]);


  const [sources, setSources] = useState([
    {
      source: "Referrals",
      contacts: 15,
      converted: 8,
      rate: "53%",
      revenue: "$145,000",
    },
    {
      source: "Social Media",
      contacts: 22,
      converted: 5,
      rate: "23%",
      revenue: "$85,000",
    },
    {
      source: "Website",
      contacts: 18,
      converted: 3,
      rate: "17%",
      revenue: "$65,000",
    },
    {
      source: "Open House",
      contacts: 12,
      converted: 4,
      rate: "33%",
      revenue: "$95,000",
    },
    {
      source: "Cold Outreach",
      contacts: 8,
      converted: 1,
      rate: "13%",
      revenue: "$25,000",
    },
  ]);

  // Modal toggles
  const [isGoalsEditOpen, setIsGoalsEditOpen] = useState(false);
  const [isSourcesEditOpen, setIsSourcesEditOpen] = useState(false);

  // Handle modal state and body scroll prevention
  useEffect(() => {
    if (isGoalsEditOpen || isSourcesEditOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isGoalsEditOpen, isSourcesEditOpen]);

  // Initialize goalsState only when modal opens using stable initial data
  useEffect(() => {
    if (isGoalsEditOpen && initialGoals.length > 0 && !isEditingGoals) {
      // Use initialGoals which is stable and won't change during modal
      const goalsCopy = initialGoals.map(goal => ({ ...goal }));
      setGoalsState(goalsCopy);

      // Initialize ref values to prevent external changes
      inputValuesRef.current = {};
      inputRefs.current = {};
      goalsCopy.forEach((goal, idx) => {
        inputValuesRef.current[`current-${idx}`] = goal.currentValue;
        inputValuesRef.current[`target-${idx}`] = goal.targetValue;
      });

      setIsEditingGoals(true);
      isModalOpenRef.current = true;
    } else if (!isGoalsEditOpen) {
      setIsEditingGoals(false);
      isModalOpenRef.current = false;
      inputValuesRef.current = {};
    }
  }, [isGoalsEditOpen, initialGoals.length]); // Use initialGoals instead of goals

  const handleExport = () => {
    toast.info("Export functionality coming soon");
  };

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    console.log("Row clicked:", rowData);
  };

  // Activity Hub handlers
  const handlePriorityToggle = () => {
    setShowPriorityDetails(!showPriorityDetails);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleReminderAction = (reminderId, action) => {
    if (action === "complete") {
      setReminders(prev => prev.map(reminder =>
        reminder.id === reminderId
          ? { ...reminder, completed: true }
          : reminder
      ));
    } else if (action === "call") {
      // Redirect to voice calls with client data
      const reminder = reminders.find(r => r.id === reminderId);
      if (reminder) {
        sessionStorage.setItem('callClientData', JSON.stringify({
          name: reminder.client,
          phone: "555-0123", // This would come from actual client data
          property: reminder.property
        }));
        window.location.href = '/realestate/voice-calls';
      }
    } else if (action === "email") {
      // Redirect to email compose with client data
      const reminder = reminders.find(r => r.id === reminderId);
      if (reminder) {
        sessionStorage.setItem('openHouseEmailData', JSON.stringify({
          clientName: reminder.client,
          subject: `Follow-up: ${reminder.message}`,
          message: `Hi ${reminder.client.split(' ')[0]},\n\n${reminder.message}\n\nBest regards,\n[Your Name]`
        }));
        window.location.href = '/realestate/email-inbox?compose=true';
      }
    }
  };

  const handleAddActivity = () => {
    setShowAddActivityModal(true);
  };

  const handleSettings = () => {
    setShowSettingsModal(true);
  };

  const handleAddActivitySubmit = () => {
    if (newActivity.title && newActivity.description && newActivity.client) {
      const activity = {
        id: activities.length + 1,
        type: newActivity.type,
        title: newActivity.title,
        description: newActivity.description,
        client: newActivity.client,
        property: newActivity.property,
        time: "Just now",
        status: newActivity.status
      };

      setActivities(prev => [activity, ...prev]);
      setNewActivity({
        type: 'call',
        title: '',
        description: '',
        client: '',
        property: '',
        status: 'pending'
      });
      setShowAddActivityModal(false);
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handleCloseModals = () => {
    setShowAddActivityModal(false);
    setShowSettingsModal(false);
  };

  const handleSaveGoals = async () => {
    if (!userId || !goalsState.length) return;

    try {
      const goalProgress = goalsState.map(goal => ({
        goalType: goal.goalType,
        title: goal.title,
        currentValue: goal.currentValue,
        targetValue: goal.targetValue,
        unit: goal.unit,
      }));

      await updateGoalProgress({ userId, goalProgress }).unwrap();

      // Update the initialGoals with the new values so they persist
      setInitialGoals(goalsState);

      // Refetch the latest data from the server
      await refetchUsers();

      setIsGoalsEditOpen(false);
    } catch (error) {
      console.error('Failed to update goals:', error);
      toast.error('Failed to update goals. Please try again.');
    }
  };

  // Stable input handlers to prevent value changes during scroll
  const handleCurrentValueChange = useCallback((idx, value) => {
    if (!isEditingGoals) return; // Prevent updates when not editing

    const numValue = Number(value);
    if (isNaN(numValue)) return; // Prevent invalid values

    // Store in ref to prevent external changes
    inputValuesRef.current[`current-${idx}`] = numValue;

    setGoalsState(prev => {
      const updated = [...prev];
      if (updated[idx]) {
        const targetValue = inputValuesRef.current[`target-${idx}`] || updated[idx].targetValue;
        updated[idx] = {
          ...updated[idx],
          currentValue: numValue,
          value: Math.round((numValue / targetValue) * 100)
        };
      }
      return updated;
    });
  }, [isEditingGoals]);

  const handleTargetValueChange = useCallback((idx, value) => {
    if (!isEditingGoals) return; // Prevent updates when not editing

    const numValue = Number(value);
    if (isNaN(numValue)) return; // Prevent invalid values

    // Store in ref to prevent external changes
    inputValuesRef.current[`target-${idx}`] = numValue;

    setGoalsState(prev => {
      const updated = [...prev];
      if (updated[idx]) {
        const currentValue = inputValuesRef.current[`current-${idx}`] || updated[idx].currentValue;
        updated[idx] = {
          ...updated[idx],
          targetValue: numValue,
          value: Math.round((currentValue / numValue) * 100)
        };
      }
      return updated;
    });
  }, [isEditingGoals]);

  // Get current value from input ref (uncontrolled approach)
  const getCurrentValue = useCallback((idx) => {
    const inputRef = inputRefs.current[`current-${idx}`];
    return inputRef ? inputRef.value : (inputValuesRef.current[`current-${idx}`] ?? '');
  }, []);

  const getTargetValue = useCallback((idx) => {
    const inputRef = inputRefs.current[`target-${idx}`];
    return inputRef ? inputRef.value : (inputValuesRef.current[`target-${idx}`] ?? '');
  }, []);

  const metricCards = [
    {
      title: "Total Contacts",
      value: "145",
      change: "+12 this month",
      icon: Users,
    },
    {
      title: "Active Deals",
      value: "8",
      change: "$2.1M total value",
      icon: DollarSign,
    },
    {
      title: "Tasks Completed",
      value: "28",
      change: "93% completion rate",
      icon: CheckCircle,
    },
    {
      title: "Monthly Revenue",
      value: "$48,500",
      change: "+15% from last month",
      icon: TrendingUp,
    },
  ];

  const pipelineData = [
    {
      client: "Johnson Family",
      type: "Buyer",
      stage: "Under Contract",
      value: "$485,000",
      status: "active",
    },
    {
      client: "Sarah Martinez",
      type: "Seller",
      stage: "Listed",
      value: "$350,000",
      status: "pending",
    },
    {
      client: "Mike Chen",
      type: "Buyer",
      stage: "Searching",
      value: "$650,000",
      status: "pending",
    },
    {
      client: "Lisa Rodriguez",
      type: "Seller",
      stage: "Pre-Market",
      value: "$425,000",
      status: "pending",
    },
  ];

  const recentActivity = [
    {
      date: "Today",
      activity: "Email Sent",
      contact: "Sarah Johnson",
      status: "Opened",
      statusType: "completed",
    },
    {
      date: "Today",
      activity: "Phone Call",
      contact: "Mike Chen",
      status: "Completed",
      statusType: "completed",
    },
    {
      date: "Yesterday",
      activity: "Task",
      contact: "Lisa Rodriguez",
      status: "Done",
      statusType: "completed",
    },
    {
      date: "Jun 20",
      activity: "Appointment",
      contact: "Thompson Family",
      status: "Scheduled",
      statusType: "pending",
    },
  ];

  const monthlyData = [
    { month: "Jan", value: "32K" },
    { month: "Feb", value: "41K" },
    { month: "Mar", value: "38K" },
    { month: "Apr", value: "45K" },
    { month: "May", value: "39K" },
    { month: "Jun", value: "49K" },
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium uppercase";
    switch (status) {
      case "active":
        return `${baseClasses} bg-green-500/20 text-green-400`;
      case "pending":
        return `${baseClasses} bg-yellow-500/20 text-yellow-400`;
      case "completed":
        return `${baseClasses} bg-blue-500/20 text-blue-400`;
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-400`;
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--dark-bg)] text-white">
      <div className="w-full overflow-y-auto" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#475569 #1e293b'
      }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: #1e293b;
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb {
            background: #475569;
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: #64748b;
          }
        `}</style>
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-5 bg-[var(--dark-bg)] border-b border-slate-700">
          <h1 className="text-2xl font-semibold text-gray-300">Analytics</h1>
          <div className="flex items-center gap-4">
            <select
              className="bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-md"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-[var(--primary-color)] text-slate-900 px-4 py-2 rounded-md font-medium"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {metricCards.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="bg-[var(--medium-dark)] rounded-xl p-6 border border-transparent hover:border-[var(--primary-color)] transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-medium text-slate-300">
                      {metric.title}
                    </div>
                    <div className="w-8 h-8 bg-[var(--primary-color)] rounded-md flex items-center justify-center">
                      <Icon className="w-4 h-4 text-slate-900" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-1">{metric.value}</div>
                  <div className="text-xs text-slate-400">{metric.change}</div>
                </div>
              );
            })}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {/* Active Pipeline */}
            <div className="bg-[var(--medium-dark)] rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-5">Active Pipeline</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left py-3 text-sm font-medium text-slate-400">
                        Client
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-slate-400">
                        Type
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-slate-400">
                        Stage
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-slate-400">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pipelineData.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-600 hover:bg-[var(--lighter-dark)] text-center cursor-pointer"
                        onClick={() => handleRowClick(item)}
                      >
                        <td className="py-3 text-sm">{item.client}</td>
                        <td className="py-3 text-sm">{item.type}</td>
                        <td className="py-3">
                          <span className={getStatusBadge(item.status)}>
                            {item.stage}
                          </span>
                        </td>
                        <td className="py-3 text-sm">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[var(--medium-dark)] rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-5">Recent Activity</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left py-3 text-sm font-medium text-slate-400">
                        Date
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-slate-400">
                        Activity
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-slate-400">
                        Contact
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-slate-400">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-600 text-center hover:bg-[var(--lighter-dark)] cursor-pointer"
                        onClick={() => handleRowClick(item)}
                      >
                        <td className="py-3 text-sm">{item.date}</td>
                        <td className="py-3 text-sm">{item.activity}</td>
                        <td className="py-3 text-sm">{item.contact}</td>
                        <td className="py-3">
                          <span className={getStatusBadge(item.statusType)}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Goals Progress */}
          <div className="bg-[var(--medium-dark)] rounded-xl p-6 mb-5">
            <h2 className="text-lg font-semibold mb-5 flex justify-between items-center">
              Goals Progress
              <button
                onClick={() => setIsGoalsEditOpen(true)}
                className="text-slate-400 hover:text-white text-sm flex items-center gap-1"
              >
                <Pencil className="w-4 h-4" /> Edit
              </button>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {goals.length > 0 ? goals.map((goal, index) => (
                <div key={index} className="bg-[var(--dark-bg)] rounded-lg p-5">
                  <div className="text-sm text-slate-400 mb-3">
                    {goal.title}
                  </div>
                  <div className="text-xl font-bold mb-3">{goal.value}%</div>
                  <div className="w-full bg-slate-600 rounded-full h-1.5 mb-2">
                    <div
                      className="bg-[var(--primary-color)] h-1.5 rounded-full"
                      style={{ width: `${goal.value}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-400">
                    {goal.current} of {goal.total}
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center text-slate-400 py-8">
                  No goals data available
                </div>
              )}
            </div>
          </div>

          {/* Contact Sources */}
          <div className="bg-[var(--medium-dark)] rounded-xl p-6 mb-5">
            <h2 className="text-lg font-semibold mb-5 flex justify-between items-center">
              Contact Sources Performance
              <button
                onClick={() => setIsSourcesEditOpen(true)}
                className="text-slate-400 hover:text-white text-sm flex items-center gap-1"
              >
                <Pencil className="w-4 h-4" /> Edit
              </button>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-3 text-sm font-medium text-slate-400">
                      Source
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-slate-400">
                      Total Contacts
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-slate-400">
                      Converted
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-slate-400">
                      Conversion Rate
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-slate-400">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sources.map((src, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-600 hover:bg-[var(--lighter-dark)] text-center cursor-pointer"
                      onClick={() => handleRowClick(src)}
                    >
                      <td className="py-3 text-sm font-medium">{src.source}</td>
                      <td className="py-3 text-sm">{src.contacts}</td>
                      <td className="py-3 text-sm">{src.converted}</td>
                      <td className="py-3 text-sm">{src.rate}</td>
                      <td className="py-3 text-sm">{src.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* NEW: Analytics Dashboard */}
          <div className="bg-[var(--medium-dark)] rounded-xl p-6 mb-5">
            <h2 className="text-xl font-bold mb-4">Pipeline Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[var(--dark-bg)] rounded-lg p-4">
                <h3 className="font-medium mb-2">Deal Stage Distribution</h3>
                <div className="flex items-center justify-center py-4">
                  <div className="w-24 h-24 rounded-full border-4 border-red-500 border-r-green-500 border-b-blue-500 border-l-yellow-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold">11</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>New Leads: 4</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Contracted: 1</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Closed: 2</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Other: 4</span>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--dark-bg)] rounded-lg p-4">
                <h3 className="font-medium mb-2">Conversion Rate</h3>
                <div className="mt-4 flex items-center">
                  <div className="text-3xl font-bold text-[var(--primary-color)] mr-2">27%</div>
                  <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                    3.2%
                  </div>
                </div>
                <div className="text-sm text-slate-400 mt-2">Lead to Close conversion</div>
                <div className="mt-4 h-16 bg-[var(--medium-dark)] rounded-lg p-2 relative">
                  <div className="absolute bottom-2 w-3 bg-[var(--primary-color)] rounded-sm" style={{ height: '40%', left: '10%' }}></div>
                  <div className="absolute bottom-2 w-3 bg-[var(--primary-color)] rounded-sm" style={{ height: '65%', left: '25%' }}></div>
                  <div className="absolute bottom-2 w-3 bg-[var(--primary-color)] rounded-sm" style={{ height: '50%', left: '40%' }}></div>
                  <div className="absolute bottom-2 w-3 bg-[var(--primary-color)] rounded-sm" style={{ height: '70%', left: '55%' }}></div>
                  <div className="absolute bottom-2 w-3 bg-[var(--primary-color)] rounded-sm" style={{ height: '85%', left: '70%' }}></div>
                  <div className="absolute bottom-2 w-3 bg-[var(--primary-color)] rounded-sm" style={{ height: '60%', left: '85%' }}></div>
                </div>
              </div>

              <div className="bg-[var(--dark-bg)] rounded-lg p-4">
                <h3 className="font-medium mb-2">Pipeline Value</h3>
                <div className="text-3xl font-bold text-[var(--primary-color)] mt-4">$848,500</div>
                <div className="text-sm text-slate-400">Total pipeline value</div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Offer Stage:</span>
                    <span className="text-[var(--primary-color)]">$165K</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Contract Stage:</span>
                    <span className="text-[var(--primary-color)]">$128K</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Active Pipeline:</span>
                    <span className="text-[var(--primary-color)]">$555K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Performance */}
          <div className="bg-[var(--medium-dark)] rounded-xl p-6 mb-5">
            <h2 className="text-lg font-semibold mb-5">
              Monthly Performance Summary
            </h2>
            <div className="bg-[var(--dark-bg)] rounded-lg p-10 text-center">
              <div className="text-slate-400 mb-4">
                Monthly performance chart would display here
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-5">
                {monthlyData.map((month, index) => (
                  <div key={index} className="text-center">
                    <div className="text-lg font-bold text-[var(--primary-color)]">
                      {month.month}
                    </div>
                    <div className="text-slate-400 text-sm">${month.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NEW: Activity Hub Section */}
          <div className="bg-[var(--medium-dark)] rounded-xl p-6 mb-5">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Activity Hub</h2>
                <p className="text-slate-400">Stay on top of client interactions and never miss a follow-up</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSettings}
                  className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  ⚙️ Settings
                </button>
                <button
                  onClick={handleAddActivity}
                  className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-slate-900 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  ➕ Add Activity
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[var(--dark-bg)] rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[var(--primary-color)] mb-1">12</div>
                <div className="text-sm text-slate-400">Pending Reminders</div>
              </div>
              <div className="bg-[var(--dark-bg)] rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[var(--primary-color)] mb-1">47</div>
                <div className="text-sm text-slate-400">Today's Activities</div>
              </div>
              <div className="bg-[var(--dark-bg)] rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[var(--primary-color)] mb-1">3</div>
                <div className="text-sm text-slate-400">Urgent Follow-ups</div>
              </div>
              <div className="bg-[var(--dark-bg)] rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[var(--primary-color)] mb-1">89%</div>
                <div className="text-sm text-slate-400">Response Rate</div>
              </div>
            </div>

            {/* Priority Scoring Info */}
            <div className="bg-[var(--dark-bg)] rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[var(--primary-color)]">📊 How Priority is Calculated</h3>
                <button
                  onClick={handlePriorityToggle}
                  className="text-slate-400 hover:text-white text-sm border border-slate-600 hover:border-[var(--primary-color)] px-3 py-1 rounded"
                >
                  {showPriorityDetails ? 'Hide Details ▲' : 'Show Details ▼'}
                </button>
              </div>
              {showPriorityDetails && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-red-400 mb-3">🔴 High Priority (80-100 points)</h4>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li><strong className="text-white">No contact 10+ days:</strong> +30 points</li>
                      <li><strong className="text-white">Hot lead (viewed 3+ properties):</strong> +25 points</li>
                      <li><strong className="text-white">Pre-approval expiring (≤7 days):</strong> +35 points</li>
                      <li><strong className="text-white">Under contract with deadline:</strong> +40 points</li>
                      <li><strong className="text-white">Missed appointment follow-up:</strong> +30 points</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-400 mb-3">🟡 Medium Priority (40-79 points)</h4>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li><strong className="text-white">No contact 5-9 days:</strong> +15 points</li>
                      <li><strong className="text-white">Showing follow-up needed:</strong> +20 points</li>
                      <li><strong className="text-white">Document pending:</strong> +15 points</li>
                      <li><strong className="text-white">Market update requested:</strong> +10 points</li>
                      <li><strong className="text-white">Scheduling needed:</strong> +15 points</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-green-400 mb-3">🟢 Low Priority (10-39 points)</h4>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li><strong className="text-white">Regular check-in:</strong> +5 points</li>
                      <li><strong className="text-white">Newsletter/marketing:</strong> +5 points</li>
                      <li><strong className="text-white">Birthday/anniversary:</strong> +10 points</li>
                      <li><strong className="text-white">General follow-up:</strong> +5 points</li>
                      <li><strong className="text-white">Referral opportunity:</strong> +12 points</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Smart Reminders */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Smart Reminders</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* High Priority */}
                <div className="bg-[var(--dark-bg)] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-600">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="font-semibold">High Priority</span>
                    <span className="bg-slate-600 text-slate-300 text-xs px-2 py-1 rounded-full ml-auto">
                      {reminders.filter(r => r.priority === 'high' && !r.completed).length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {reminders.filter(r => r.priority === 'high' && !r.completed).map(reminder => (
                      <div key={reminder.id} className="bg-slate-700 rounded-lg p-3 border-l-4 border-red-500">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-[var(--primary-color)]">{reminder.client}</span>
                          <span className="text-xs bg-[var(--primary-color)]/20 text-[var(--primary-color)] px-2 py-1 rounded">
                            {reminder.score} pts
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-2">{reminder.message}</p>
                        {reminder.breakdown && (
                          <p className="text-xs text-slate-400 mb-3">{reminder.breakdown}</p>
                        )}
                        <div className="flex justify-between items-center text-xs text-slate-400 mb-3">
                          <span>{reminder.time}</span>
                          <span>{reminder.property}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleReminderAction(reminder.id, 'call')}
                            className="flex-1 bg-[var(--primary-color)] text-slate-900 px-3 py-1 rounded text-xs font-medium hover:bg-[var(--primary-color)]/90"
                          >
                            Call
                          </button>
                          <button
                            onClick={() => handleReminderAction(reminder.id, 'email')}
                            className="flex-1 bg-slate-600 text-white px-3 py-1 rounded text-xs hover:bg-slate-500"
                          >
                            Email
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medium Priority */}
                <div className="bg-[var(--dark-bg)] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-600">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="font-semibold">Medium Priority</span>
                    <span className="bg-slate-600 text-slate-300 text-xs px-2 py-1 rounded-full ml-auto">
                      {reminders.filter(r => r.priority === 'medium' && !r.completed).length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {reminders.filter(r => r.priority === 'medium' && !r.completed).map(reminder => (
                      <div key={reminder.id} className="bg-slate-700 rounded-lg p-3 border-l-4 border-yellow-500">
                        <div className="font-semibold text-[var(--primary-color)] mb-2">{reminder.client}</div>
                        <p className="text-sm text-slate-300 mb-2">{reminder.message}</p>
                        <div className="flex justify-between items-center text-xs text-slate-400 mb-3">
                          <span>{reminder.time}</span>
                          <span>{reminder.property}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleReminderAction(reminder.id, 'call')}
                            className="flex-1 bg-[var(--primary-color)] text-slate-900 px-3 py-1 rounded text-xs font-medium hover:bg-[var(--primary-color)]/90"
                          >
                            Follow Up
                          </button>
                          <button
                            onClick={() => handleReminderAction(reminder.id, 'email')}
                            className="flex-1 bg-slate-600 text-white px-3 py-1 rounded text-xs hover:bg-slate-500"
                          >
                            Schedule
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Low Priority */}
                <div className="bg-[var(--dark-bg)] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-600">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="font-semibold">Low Priority</span>
                    <span className="bg-slate-600 text-slate-300 text-xs px-2 py-1 rounded-full ml-auto">
                      {reminders.filter(r => r.priority === 'low' && !r.completed).length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {reminders.filter(r => r.priority === 'low' && !r.completed).map(reminder => (
                      <div key={reminder.id} className="bg-slate-700 rounded-lg p-3 border-l-4 border-green-500">
                        <div className="font-semibold text-[var(--primary-color)] mb-2">{reminder.client}</div>
                        <p className="text-sm text-slate-300 mb-2">{reminder.message}</p>
                        <div className="flex justify-between items-center text-xs text-slate-400 mb-3">
                          <span>{reminder.time}</span>
                          <span>{reminder.property}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleReminderAction(reminder.id, 'email')}
                            className="flex-1 bg-[var(--primary-color)] text-slate-900 px-3 py-1 rounded text-xs font-medium hover:bg-[var(--primary-color)]/90"
                          >
                            Send Card
                          </button>
                          <button
                            onClick={() => handleReminderAction(reminder.id, 'call')}
                            className="flex-1 bg-slate-600 text-white px-3 py-1 rounded text-xs hover:bg-slate-500"
                          >
                            Call
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-[var(--dark-bg)] rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Activity Feed</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleTabChange('timeline')}
                    className={`px-3 py-1 rounded text-xs ${activeTab === 'timeline' ? 'bg-slate-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                  >
                    Timeline
                  </button>
                  <button
                    onClick={() => handleTabChange('list')}
                    className={`px-3 py-1 rounded text-xs ${activeTab === 'list' ? 'bg-slate-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                  >
                    List
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {activities.map(activity => (
                  <div key={activity.id} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${activity.type === 'call' ? 'bg-[var(--primary-color)] text-slate-900' :
                        activity.type === 'email' ? 'bg-blue-500' :
                          'bg-purple-500'
                      }`}>
                      {activity.type === 'call' ? '📞' : activity.type === 'email' ? '📧' : '📅'}
                    </div>
                    <div className="flex-1 bg-slate-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-white">{activity.title}</span>
                        <span className="text-xs text-slate-400">{activity.time}</span>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">{activity.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[var(--primary-color)]">{activity.client}</span>
                          <span className="text-xs text-orange-400">{activity.property}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${activity.status === 'Completed' ? 'bg-[var(--primary-color)]/20 text-[var(--primary-color)]' :
                            activity.status === 'Opened' ? 'bg-green-500/20 text-green-400' :
                              'bg-yellow-500/20 text-yellow-400'
                          }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          {/* <div className="text-center py-4 text-slate-400 text-sm">
            <div className="flex items-center justify-center gap-2">
              <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <span className="ml-2">Scroll for more content</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Goals Modal */}
      {isGoalsEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-hidden" style={{ width: '100vw', height: '100vh' }}>
          <div className="bg-[var(--medium-dark)] p-4 sm:p-6 rounded-xl w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Edit Goals</h3>
            <div className="space-y-4 sm:space-y-6">
              {goalsState.map((goal, idx) => (
                <div key={`${goal.goalType}-${idx}`} className="bg-[var(--dark-bg)] rounded-lg p-3 sm:p-4">
                  <label className="block text-sm sm:text-base text-slate-400 mb-3 font-medium">
                    {goal.title}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm text-slate-500 mb-1 sm:mb-2">Current Value</label>
                      <input
                        type="number"
                        ref={(el) => {
                          if (el) {
                            inputRefs.current[`current-${idx}`] = el;
                            el.value = inputValuesRef.current[`current-${idx}`] ?? goal.currentValue;
                          }
                        }}
                        className="w-full px-3 py-2 sm:py-3 rounded-md bg-slate-700 text-white text-sm sm:text-base border border-slate-600 focus:border-[var(--primary-color)] focus:outline-none transition-colors"
                        key={`current-${goal.goalType}-${idx}`}
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-slate-500 mb-1 sm:mb-2">Target Value</label>
                      <input
                        type="number"
                        ref={(el) => {
                          if (el) {
                            inputRefs.current[`target-${idx}`] = el;
                            el.value = inputValuesRef.current[`target-${idx}`] ?? goal.targetValue;
                          }
                        }}
                        onChange={(e) => handleTargetValueChange(idx, e.target.value)}
                        className="w-full px-3 py-2 sm:py-3 rounded-md bg-slate-700 text-white text-sm sm:text-base border border-slate-600 focus:border-[var(--primary-color)] focus:outline-none transition-colors"
                        key={`target-${goal.goalType}-${idx}`}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-3 flex items-center justify-between">
                    <span>Progress: {goal.value}%</span>
                    <div className="w-16 sm:w-20 bg-slate-600 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-[var(--primary-color)] h-1.5 sm:h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(goal.value, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 sm:mt-8">
              <button
                onClick={() => setIsGoalsEditOpen(false)}
                className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-slate-600 rounded-md text-white text-sm sm:text-base font-medium hover:bg-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGoals}
                disabled={isUpdatingGoals}
                className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-[var(--primary-color)] rounded-md text-slate-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--primary-color)]/90 transition-colors text-sm sm:text-base"
              >
                {isUpdatingGoals ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sources Modal */}
      {isSourcesEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-hidden" style={{ width: '100vw', height: '100vh' }}>
          <div className="bg-[var(--medium-dark)] p-4 sm:p-6 rounded-xl w-full max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Edit Contact Sources</h3>
            <div className="space-y-4 sm:space-y-6">
              {sources.map((src, idx) => (
                <div key={idx} className="bg-[var(--dark-bg)] rounded-lg p-3 sm:p-4">
                  <label className="block text-sm sm:text-base text-slate-400 mb-2 sm:mb-3 font-medium">
                    {src.source}
                  </label>
                  <input
                    type="number"
                    value={src.contacts}
                    onChange={(e) => {
                      const updated = [...sources];
                      updated[idx].contacts = Number(e.target.value);
                      setSources(updated);
                    }}
                    className="w-full px-3 py-2 sm:py-3 rounded-md bg-slate-700 text-white text-sm sm:text-base border border-slate-600 focus:border-[var(--primary-color)] focus:outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 sm:mt-8">
              <button
                onClick={() => setIsSourcesEditOpen(false)}
                className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-slate-600 rounded-md text-white text-sm sm:text-base font-medium hover:bg-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsSourcesEditOpen(false)}
                className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-[var(--primary-color)] rounded-md text-slate-900 font-medium hover:bg-[var(--primary-color)]/90 transition-colors text-sm sm:text-base"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Activity Modal */}
      {showAddActivityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--medium-dark)] p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Activity</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Activity Type</label>
                <select
                  value={newActivity.type}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-[var(--primary-color)] focus:outline-none"
                >
                  <option value="call">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                  <option value="showing">Property Showing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-[var(--primary-color)] focus:outline-none"
                  placeholder="e.g., Follow-up call with Sarah"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description *</label>
                <textarea
                  value={newActivity.description}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-[var(--primary-color)] focus:outline-none"
                  rows={3}
                  placeholder="Describe what happened or what was discussed..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Client Name *</label>
                <input
                  type="text"
                  value={newActivity.client}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, client: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-[var(--primary-color)] focus:outline-none"
                  placeholder="e.g., Sarah Johnson"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Property (Optional)</label>
                <input
                  type="text"
                  value={newActivity.property}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, property: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-[var(--primary-color)] focus:outline-none"
                  placeholder="e.g., 123 Main St"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                <select
                  value={newActivity.status}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-[var(--primary-color)] focus:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCloseModals}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddActivitySubmit}
                className="px-4 py-2 bg-[var(--primary-color)] text-slate-900 rounded-lg hover:bg-[var(--primary-color)]/90 transition-colors"
              >
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--medium-dark)] p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Activity Hub Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Default Activity Type</label>
                <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-[var(--primary-color)] focus:outline-none">
                  <option value="call">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Reminder Frequency</label>
                <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-[var(--primary-color)] focus:outline-none">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Priority Thresholds</label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">High Priority</span>
                    <input
                      type="number"
                      defaultValue="80"
                      className="w-20 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Medium Priority</span>
                    <input
                      type="number"
                      defaultValue="40"
                      className="w-20 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications"
                  className="w-4 h-4 text-[var(--primary-color)] bg-slate-700 border-slate-600 rounded focus:ring-[var(--primary-color)]"
                />
                <label htmlFor="notifications" className="ml-2 text-sm text-slate-300">
                  Enable email notifications for high priority reminders
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCloseModals}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseModals}
                className="px-4 py-2 bg-[var(--primary-color)] text-slate-900 rounded-lg hover:bg-[var(--primary-color)]/90 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
