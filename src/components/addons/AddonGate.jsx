import React, { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import FullPageLoader from "../loaders/FullPageLoader";
import { useAddonAccessChecker } from "../../hooks/useAddonAccess";

const AddonGate = ({
  addonKey,
  requiredAddons,
  requireAll = false,
  category,
  fallbackPath = "/",
  requireAuth = true,
  children,
}) => {
  const { canAccess, loading, user } = useAddonAccessChecker();
  const location = useLocation();

  const addonKeys = useMemo(() => {
    if (Array.isArray(requiredAddons) && requiredAddons.length > 0) {
      return requiredAddons;
    }
    if (addonKey) {
      return [addonKey];
    }
    return [];
  }, [addonKey, requiredAddons]);

  const hasAccess = useMemo(() => {
    if (!addonKeys.length) {
      return true;
    }
    if (requireAll) {
      return addonKeys.every((key) => canAccess(key, { category }));
    }
    return addonKeys.some((key) => canAccess(key, { category }));
  }, [addonKeys, canAccess, category, requireAll]);

  if (loading) {
    return <FullPageLoader />;
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!hasAccess) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default AddonGate;

