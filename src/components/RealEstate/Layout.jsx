import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Building,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  CreditCard,
  Menu,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  Heart,
  Library,
  HelpCircle,
  GraduationCap,
  MessageSquare,
  Mail,
  Phone,
  Upload,
  Megaphone,
  TrendingUp,
  Users2,
  Target,
  BookOpen,
} from "lucide-react";
import logo from "../../assets/logo/logo-1.png";
import { Button } from "./ui/Button";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/user.slice";
import NewFooter from "../NewFooter";
import IntercomChat from "../IntercomChat";

function getUserFromStorage() {
  try {
    const raw = localStorage.getItem("__user__");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return parsed ?? undefined;
  } catch {
    return undefined;
  }
}

function getRoleLabel(role) {
  switch (role) {
    case "admin":
      return "Administrator";
    case "affiliate":
      return "Affiliate Partner";
    case "real_estate":
      return "Real Estate Agent";
    case "others":
      return "Other User";
    default:
      return "User";
  }
}

const navigation = [
  { name: "Dashboard", href: "/realestate/dashboard", icon: Home },
  { name: "Clients", href: "/realestate/clients", icon: Users },
  { name: "Properties", href: "/realestate/properties", icon: Building },
  { name: "Calendar", href: "/realestate/calendar", icon: Calendar },
  { name: "Documents", href: "/realestate/documents", icon: FileText },
  { name: "Analytics", href: "/realestate/analytics", icon: BarChart3 },
  { name: "Library", href: "/realestate/library", icon: Library },
  { name: "Marketing Tools", href: "/realestate/marketing-tools", icon: Megaphone },
  { name: "Quick Referral Tool", href: "/realestate/quick-referral-tool", icon: Users, isPro: false },
  { name: "Team Hub", href: "/realestate/team-hub", icon: Users, isPro: false },
  { name: "Advanced Analytics", href: "/realestate/advanced-analytics", icon: BarChart3, isPro: false },
  { name: "Learning", href: "/realestate/learning-pro", icon: BookOpen, isPro: false },
  { name: "Client Import", href: "/realestate/client-import", icon: Upload, isPro: false },
  { name: "Messages", href: "/realestate/messaging", icon: MessageSquare },
  { name: "Email Inbox", href: "/realestate/email-inbox", icon: Mail },
  { name: "Open House Toolkit", href: "/realestate/open-house-toolkit", icon: Home },
  { name: "Learning", href: "/realestate/new-learning", icon: GraduationCap },
  { name: "Pipeline", href: "/realestate/pipeline", icon: TrendingUp, isPower: false },
  { name: "Drip Campaigns", href: "/realestate/drip-campaign", icon: Target, isPower: false },
  { name: "Client Engagement", href: "/realestate/client-engagement", icon: Users2, isPower: false },
  { name: "Client Upload", href: "/realestate/client-upload", icon: Upload },
  { name: "Pricing", href: "/realestate/pricing", icon: CreditCard },
  { name: "Settings", href: "/realestate/settings", icon: Settings },
  { name: "Help Center", href: "/realestate/help-center", icon: HelpCircle },
];

// const messagingNavigation = [
// { name: "Text Messages", href: "/realestate/messaging", icon: MessageSquare },
// { name: "Voice Calls", href: "/realestate/voice-calls", icon: Phone },
// ];

export default function Layout() {
  const user = getUserFromStorage();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--lighter-dark)]">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 bg-[var(--dark-bg)] shadow-lg transition-all duration-300 ease-in-out flex flex-col
           ${sidebarCollapsed ? "w-20" : "w-48"}
           ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
         `}
      >
        {/* Logo + Collapse Button */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--primary-color)] flex-shrink-0">
          {!sidebarCollapsed && (
            <img
              src={logo}
              alt="logo"
              className="w-[120px] cursor-pointer hover:brightness-110"
              onClick={() => navigate("/realestate/dashboard")}
            />
          )}
          <Button
            size="icon"
            variant="ghost"
            className="p-1 ml-auto"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <ChevronsRight className="w-5 h-5 text-gray-300" />
            ) : (
              <ChevronsLeft className="w-5 h-5 text-gray-300" />
            )}
          </Button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto pr-2">
          {/* Navigation */}
          <nav className="mt-4 px-2">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    end={item.href === "/realestate/${item.href}"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                        ? "bg-[var(--lighter-dark)] text-white border-r-2 border-[var(--primary-color)]"
                        : "text-gray-300 hover:bg-[var(--lighter-dark)]"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    {!sidebarCollapsed && (
                      <div className="flex items-center gap-1">
                        <span>{item.name}</span>
                        {item.isPro && (
                          <span className="bg-[#9B59B6] text-white text-[9px] px-1 py-0 rounded-full font-semibold leading-none">
                            Pro
                          </span>
                        )}
                        {item.isPower && (
                          <span className="bg-[#21D4C6] text-black text-[9px] px-1 py-0 rounded-full font-semibold leading-none">
                            Power
                          </span>
                        )}
                      </div>
                    )}
                  </NavLink>
                </li>
              ))}

              {/* Messaging Section */}
              {/* {!sidebarCollapsed && (
                <li className="pt-4 pb-2">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Messaging
                  </div>
                </li>
              )}
              {messagingNavigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                        ? "bg-[var(--lighter-dark)] text-white border-r-2 border-[var(--primary-color)]"
                        : "text-gray-300 hover:bg-[var(--lighter-dark)]"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    {!sidebarCollapsed && (
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.isPro && (
                          <span className="bg-[#9B59B6] text-white text-xs px-2 py-1 rounded-full font-semibold">
                            Pro
                          </span>
                        )}
                        {item.isPower && (
                          <span className="bg-[#21D4C6] text-black text-xs px-2 py-1 rounded-full font-semibold">
                            Power
                          </span>
                        )}
                      </div>
                    )}
                  </NavLink>
                </li>
              ))} */}

              <li
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[var(--lighter-dark)] rounded-lg cursor-pointer"
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/login", { replace: true });
                }}
              >
                <LogOut className="w-5 h-5" />
                {!sidebarCollapsed && <span>Logout</span>}
              </li>
            </ul>
          </nav>

          {/* Upgrade Section */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-[var(--primary-color)] mt-4">
              <div className="bg-[var(--medium-dark)] rounded-lg p-3">
                <p className="text-center text-sm font-medium text-gray-300">
                  Upgrade
                </p>
                <p className="text-center text-xs text-[var(--primary-color)] mt-1">
                  Unlock advanced features
                </p>
                <Button
                  size="sm"
                  className="w-full mt-2 bg-[var(--primary-color)] hover:bg-teal-300"
                  onClick={() => navigate("/realestate/pricing")}
                >
                  Upgrade Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className="transition-all duration-300 ease-in-out"
        style={{ paddingLeft: sidebarCollapsed ? "5rem" : "12rem" }}
      >
        {/* Header */}
        <header className="bg-[var(--dark-bg)] shadow-sm border-b border-[var(--primary-color)]">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5 text-gray-200" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-300">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-300">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-400">
                  {getRoleLabel(user?.role)}
                </p>
              </div>
              <div className="w-8 h-8 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">JS</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <NewFooter />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Intercom Chat Widget */}
      <IntercomChat enableFin={false} />
    </div>
  );
}
