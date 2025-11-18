import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import SideBar from "../components/admin/SideBar";
import { clearStorage, getStorage, setStorage } from "./localStorage";
import { useLazyCheckAuthQuery } from "../store/apis/auth.api";
import IntercomChat from "../components/IntercomChat";

// Development mode bypass - automatically enabled in development mode
const DEV_MODE_BYPASS = import.meta.env.DEV; // Automatically true when running `npm run dev`

const ProtectedRoute = ({ type = "" }) => {
  const navigate = useNavigate();
  const [sideBarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDevModeReady, setIsDevModeReady] = useState(false);

  const loginUserToken = getStorage("__login_user_token__");
  const [checkAuth, { data, isError }] = useLazyCheckAuthQuery();

  // Setup test user data in dev mode if not already set
  useEffect(() => {
    if (DEV_MODE_BYPASS && !loginUserToken) {
      // Create test user data based on route type
      const testUser = {
        id: `test-${type || "user"}-id`,
        _id: `test-${type || "user"}-id`,
        name: type === "admin" ? "Test Admin" : type === "affiliate" ? "Test Affiliate" : "Test User",
        email: type === "admin" ? "admin@test.com" : type === "affiliate" ? "affiliate@test.com" : "user@test.com",
        role: type || "real_estate",
        token: "dev-test-token",
      };
      setStorage("__login_user_token__", "dev-test-token");
      setStorage("__user__", testUser, "object");
      setIsDevModeReady(true);
      return;
    }
    setIsDevModeReady(true);
  }, [DEV_MODE_BYPASS, loginUserToken, type]);

  useEffect(() => {
    // Skip auth check in dev mode
    if (DEV_MODE_BYPASS) {
      return;
    }

    const checkIsAuthenticated = async () => {
      try {
        const res = await checkAuth({ type }).unwrap();
        if (!res?.success) {
          clearStorage();
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Auth error:", error);
        clearStorage();
        navigate("/login", { replace: true });
      }
    };

    if (loginUserToken) {
      checkIsAuthenticated();
    }
  }, [loginUserToken, DEV_MODE_BYPASS, checkAuth, type, navigate]);

  // Wait for dev mode setup to complete
  if (DEV_MODE_BYPASS && !isDevModeReady) {
    return (
      <div className="min-h-screen bg-[var(--dark-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
          <p className="text-gray-300">Setting up test mode...</p>
        </div>
      </div>
    );
  }

  // In dev mode, allow access if we have a token (even if it's test data)
  if (!DEV_MODE_BYPASS && !loginUserToken) return <Navigate to="/login" replace />;

  if (type === "admin") {
    return (
      <div className="min-h-screen bg-[var(--lighter-dark)] flex">
        <SideBar
          collapsed={sideBarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <div
          className={`bg-[var(--dark-bg)] flex-1 min-h-screen p-6 ${
            sideBarCollapsed ? "ml-20" : "ml-64"
          } transition-all duration-300`}
        >
          <Outlet />
        </div>
        <IntercomChat enableFin={false} />
      </div>
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
