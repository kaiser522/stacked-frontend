import { useState } from "react";
import {
  MdOutlineAlternateEmail,
  MdLock,
  MdAdminPanelSettings,
} from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import logo from "../../assets/logo/logo-1.png";
import useNotification from "../../components/notifications/useNotification";
import { useLoginMutation } from "../../store/apis/auth.api";
import { setStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const notify = useNotification();

  const [login] = useLoginMutation();

  const handleLogin = async () => {
    try {
      console.log("Login attempt with:", { email, password });
      const response = await login({ email, password });
      if (response?.data && response?.data?.success) {
        const data = response?.data?.data;
        setStorage("__admin_token__", data?.token);
        notify({
          message: "Admin login successful!",
          type: "success",
        });
        navigate("/admin/dashboard");
      } else {
        throw new Error(response?.error?.data?.message);
      }
    } catch (error) {
      notify({
        message: error?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--dark-bg)]">
      {/* Header */}
      <header className="py-2 px-6 bg-[var(--lighter-dark)]">
        <div className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="w-[200px] p-4 cursor-pointer transition-all duration-300 hover:brightness-125 hover:drop-shadow-[0_0_15px_#ffffff]"
          />
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-md bg-[#2d3A48] rounded">
          <div className="p-8 rounded-lg shadow-lg">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3">
                <MdAdminPanelSettings size={36} className="text-white" />
                <h2 className="text-3xl font-bold text-white">Admin Login</h2>
              </div>
              <p className="mt-2 text-gray-400">
                Enter your credentials to access the dashboard
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdOutlineAlternateEmail
                      size={18}
                      className="text-gray-400"
                    />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 block w-full rounded-md py-3 px-4 bg-[#324250] border-gray-600 focus:ring-teal-500 placeholder-gray-400 text-white focus:outline-none focus:ring-1"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdLock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 block w-full rounded-md py-3 px-4 bg-[#324250] border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    style={{ borderColor: "#3dccc7", focusRing: "#3dccc7" }}
                    placeholder="••••••••"
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? (
                      <IoMdEyeOff size={18} />
                    ) : (
                      <IoEye size={18} />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={handleLogin}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500  hover:bg-teal-400 focus:outline-none focus:ring-1"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer
        className="py-4 px-6 text-center text-sm text-gray-400"
        style={{ backgroundColor: "#2d3a48" }}
      >
        © {new Date().getFullYear()} Stacked. All rights reserved.
      </footer>
    </div>
  );
}
