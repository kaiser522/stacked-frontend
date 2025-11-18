import React, { useEffect, useState } from "react";
import logo from "../assets/logo/logo-1.png";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/Form/OAuth";
import useNotification from "../components/notifications/useNotification";
import { useLoginMutation, useSignUpMutation } from "../store/apis/auth.api";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import {
  MdLock,
  MdOutlineAlternateEmail,
  MdSupervisedUserCircle,
} from "react-icons/md";
import { getStorage } from "../utils/localStorage";
import useNavigateTo from "../hooks/useNavigateTo";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../store/slices/user.slice";
import { FaUser } from "react-icons/fa";
import PasswordInput from "../components/Form/PasswordInput";
import EmailInput from "../components/Form/EmailInput";

const Login = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState("login"); // 'login' or 'signup'

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only for signup
  const [confirmPassword, setConfirmPassword] = useState("");

  const [login] = useLoginMutation();
  const [signUp] = useSignUpMutation();

  const loginUser = getStorage("__user__", "object");
  const navigate = useNavigate();
  const { getNavigation } = useNavigateTo();
  const notify = useNotification();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleAuth = async () => {
    try {
      if (mode === "login") {
        const response = await login({ email, password });
        if (response?.data?.success) {
          const data = response?.data?.data;
          dispatch(signInSuccess(data));
          notify({ message: "Login successful!", type: "success" });
          getNavigation(data.role);
        } else throw new Error(response?.error?.data?.message);
      } else {
        const response = await signUp({ name, email, password, confirmPassword });
        if (response?.data?.success) {
          notify({
            message: "Signup successful! You can now log in.",
            type: "success",
          });
          setMode("login");
          setName("");
        } else throw new Error(response?.error?.data?.message);
      }
    } catch (error) {
      notify({
        message: error?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (loginUser) getNavigation(loginUser?.role);
  }, [loginUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-800 via-[#1E2A38] to-gray-900 w-full h-full overflow-hidden"></div>
      <div className="fixed top-2 left-4 sm:left-8 z-20 lg:hidden">
        <img
          className="transition-all cursor-pointer duration-300 hover:brightness-110 hover:drop-shadow-[0_0_15px_#ffffff] w-32 h-auto object-contain"
          src={logo}
          alt="logo"
          loading="eager"
          onClick={handleLogoClick}
        />
      </div>

      <div className="relative w-full sm:flex sm:flex-row gap-6 justify-center items-center">
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
          <div className="self-start hidden lg:flex flex-col text-white">
            <img
              className="transition-all cursor-pointer duration-300 hover:brightness-110 hover:drop-shadow-[0_0_15px_#ffffff] w-80 h-auto object-contain"
              src={logo}
              alt="logo"
              loading="eager"
              style={{ maxWidth: "260px" }}
              onClick={handleLogoClick}
            />
            <h1 className="my-3 font-semibold text-5xl">Welcome</h1>
            <p className="pr-3 text-sm opacity-75">
              {mode === "login"
                ? "Sign in to access your account and continue your journey with us."
                : "Create your account to get started! and continue your journey with us."}
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center z-10 px-4 py-6 sm:px-0">
          <div className="p-8 sm:p-12 bg-[var(--lighter-dark)] bg-opacity-95 mx-auto rounded-3xl w-full max-w-md shadow-xl">
            <div className="mb-6">
              <h3 className="font-semibold text-xl tracking-wider text-[var(--gray)]">
                {mode === "login" ? "Login" : "Sign Up"}
              </h3>
            </div>
            <div className="space-y-3">
              {mode === "signup" && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser size={14} className="text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-md pl-10 py-2 px-4 bg-[#324250] border-gray-600 focus:ring-teal-500 placeholder-gray-400 text-white focus:outline-none focus:ring-1"
                      placeholder="Your name"
                    />
                  </div>
                </div>
              )}

              <EmailInput
                name="email"
                value={email}
                onChange={(value) => setEmail(value)}
                label="Email Address"
                id="email"
              />

              <PasswordInput
                name="password"
                value={password}
                onChange={(value) => setPassword(value)}
                label="Password"
                id="Password"
              />
              {mode === "signup" && (
                <PasswordInput
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(value) => setConfirmPassword(value)}
                  label="Confirm Password"
                  id="confirmPassword"
                />
              )}

              <div>
                <button
                  onClick={handleAuth}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-400 focus:outline-none focus:ring-1"
                >
                  {mode === "login" ? "Login" : "Sign Up"}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button
                    onClick={() =>
                      setMode(mode === "login" ? "signup" : "login")
                    }
                    className="text-[var(--gray)] cursor-pointer focus:outline-none"
                  >
                    {mode === "login"
                      ? "New user? Sign up"
                      : "Already have an account? Login"}
                  </button>
                </div>
                {mode === "login" && (
                  <div className="text-sm ml-auto">
                    <a href="#" className="text-[var(--gray)]">
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-16 bg-gray-300"></span>
                <span className="text-gray-400 font-normal">
                  or continue with
                </span>
                <span className="h-px w-16 bg-gray-300"></span>
              </div>

              <OAuth />
            </div>

            <div className="mt-7 text-center text-gray-400 text-xs">
              <span>
                Copyright {new Date().getFullYear()} Stacked. All rights
                reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
