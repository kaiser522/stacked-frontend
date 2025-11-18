// hook create to to navigate to different routes

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useNavigateTo = () => {
  const navigate = useNavigate();

  const getNavigation = useCallback((role, status) => {
    if (status === "disabled") return navigate("/pricing");

    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "affiliate":
        navigate("/affiliate/dashboard");
        break;
      case "real_estate":
        navigate("/realestate/dashboard");
        break;
      default:
        navigate("/pricing");
    }
  }, []);
  return {
    getNavigation,
  };
};

export default useNavigateTo;
