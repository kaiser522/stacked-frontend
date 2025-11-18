import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Mail,
  CreditCard,
  Newspaper,
  Calendar,
  User,
  Menu,
  LogOut,
  Users,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/user.slice";

const navItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: Home,
  },
  {
    name: "Emails",
    path: "/admin/emails",
    icon: Mail,
  },
  {
    name: "Payments",
    path: "/admin/payments",
    icon: CreditCard,
  },
  {
    name: "Affiliates",
    path: "/admin/affiliates",
    icon: Users,
  },
  {
    name: "NewsLetter",
    path: "/admin/news-letters",
    icon: Newspaper,
  },
  {
    name: "Calendar",
    path: "/admin/calendar",
    icon: Calendar,
  },
  {
    name: "Account Look Up",
    path: "/admin/account-look-up",
    icon: User,
  },
];

const SideBar = ({ collapsed, setCollapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  return (
    <div
      className={`${collapsed ? "w-20" : "w-64"
        } fixed h-full transition-all duration-300`}
    >
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="text-[var(--primary-color)]"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="mt-4">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full px-4 py-3 text-sm transition-all ${isActive
                      ? "bg-[var(--lighter-dark)] text-[var(--primary-color)] border-l-4 border-[var(--primary-color)]"
                      : "text-gray-300 hover:bg-[var(--lighter-dark)]"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            );
          })}
          <li
            className="cursor-pointer flex items-center gap-3 w-full px-4 py-3 text-sm transition-all text-gray-300 hover:bg-[var(--lighter-dark)]"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
