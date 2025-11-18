import React, { useMemo } from "react";
import Header from "../components/Header";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllAddonsQuery } from "../store/apis/plans.api";

function PricingSummary() {
  const selectedPlan = useSelector((state) => state.plans.selectedPlan);
  const navigate = useNavigate();

  const {
    data: addonsResponse,
    isLoading: addonsLoading,
    error: addonsError
  } = useGetAllAddonsQuery();

  // Create a map of addons by ID for quick lookup
  const addOnDetailsMap = useMemo(() => {
    if (!addonsResponse?.data) return {};

    const addonMap = {};
    addonsResponse.data.forEach(addon => {
      addonMap[addon._id] = addon;
    });
    return addonMap;
  }, [addonsResponse]);

  const getAddOnTitle = (addonId) => {
    const addon = addOnDetailsMap[addonId];
    return addon ? addon.addon_name : 'Loading...';
  };

  const getAddOnPrice = (addonId) => {
    const addon = addOnDetailsMap[addonId];
    return addon ? `${addon.price}` : '';
  };

  const getAddOnDescription = (addonId) => {
    const addon = addOnDetailsMap[addonId];
    return addon ? addon.description : '';
  };

  return (
    <div style={{ backgroundColor: "#1E2A38" }} className="min-h-screen pb-5">
      <Header />

      <div className="rounded-2xl ring ring-[var(--primary-color)] shadow-md text-white max-w-xl p-4 mx-auto">
        {/* Card Header */}
        <div className="pb-4 mb-4">
          <h2 className="text-2xl font-semibold">Pricing Summary</h2>
        </div>

        {/* Card Body */}
        <div className="space-y-4">
          {/* Estimated Amount and Right-Side Heading */}
          <div className="flex justify-between items-center">
            {/* Left: Plan Name */}
            <div className="text-left">
              <h3 className="text-xl font-semibold">
                {selectedPlan?.selectedCard?.originalData?.plan_name || selectedPlan?.selectedCard?.title}
              </h3>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-semibold">Estimated Amount</h3>
              <span className="text-lg font-semibold">
                {selectedPlan?.price}
              </span>
            </div>
          </div>

          {/* Add-On Modules */}
          {Object.keys(selectedPlan?.selectedAddOns || {}).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Included Add-On Modules
              </h3>
              {addonsLoading ? (
                <p className="text-gray-300">Loading add-ons...</p>
              ) : addonsError ? (
                <p className="text-red-400">Error loading add-ons</p>
              ) : (
                <ul className="space-y-3 text-sm text-gray-300">
                  {Object.keys(selectedPlan.selectedAddOns).map((addonId, idx) => (
                    <li
                      key={idx}
                      className="flex items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{getAddOnTitle(addonId)}</div>
                        {getAddOnDescription(addonId) && (
                          <div className="text-xs text-gray-400 mt-1">
                            {getAddOnDescription(addonId)}
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-400 ml-2 whitespace-nowrap">
                        {getAddOnPrice(addonId)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Features List */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Included Features</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              {selectedPlan?.selectedCard?.originalData?.features?.map((featureGroup, groupIndex) => {
                // Check if feature is an object with category/items structure
                if (featureGroup && typeof featureGroup === 'object' && featureGroup.category && featureGroup.items) {
                  return (
                    <React.Fragment key={featureGroup._id || groupIndex}>
                      {/* Main category with checkmark */}
                      <li className="flex items-start pl-2">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full p-1 flex-shrink-0">
                          <FaCheckCircle className="w-6 h-6 text-[var(--primary-color)]" />
                        </span>
                        <span className="leading-loose font-semibold text-white">
                          {featureGroup.category}
                        </span>
                      </li>
                      {/* Sub-items with bullet points */}
                      {featureGroup.items?.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start pl-2">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full p-1 flex-shrink-0">
                            {/* Empty space to align with tick items */}
                          </span>
                          <span className="leading-loose text-gray-300">
                            <span className="text-gray-400">•</span> {item}
                          </span>
                        </li>
                      ))}
                    </React.Fragment>
                  );
                }

                // Fallback: Handle old string-based format for backward compatibility
                const featureStr = typeof featureGroup === 'string' ? featureGroup : '';
                const trimmed = featureStr?.trim() || "";

                if (trimmed.startsWith("--")) {
                  return (
                    <li key={groupIndex} className="pl-10 text-gray-300 list-disc">
                      <span className="text-[var(--primary-color)] text-2xl">&bull;</span>{" "}
                      {trimmed.replace("--", "").trim()}
                    </li>
                  );
                }

                if (trimmed.startsWith("•")) {
                  return (
                    <li key={groupIndex} className="flex items-start pl-2">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full p-1" />
                      <span className="leading-loose">
                        <span className="text-white-500">•</span> {trimmed.replace("•", "").trim()}
                      </span>
                    </li>
                  );
                }

                if (featureStr) {
                  return (
                    <li key={groupIndex} className="flex items-start pl-2">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full p-1">
                        <FaCheckCircle className="w-6 h-6 text-[var(--primary-color)]" />
                      </span>
                      <span className="leading-loose font-semibold text-white">
                        {featureStr}
                      </span>
                    </li>
                  );
                }

                return null;
              })}
            </ul>
          </div>

          <button
            onClick={() => { navigate("/payment") }}
            className="w-full bg-[var(--primary-color)] hover:bg-teal-300 text-black font-semibold py-3 rounded-md transition"
          >
            Get Started
          </button>

          {/* Billing Info */}
          <p className="text-center text-sm text-gray-300 mt-4">
            {selectedPlan?.billingType === "monthly" ? "Monthly" : "Yearly"} billing available
          </p>
        </div>
      </div>
    </div>
  );
}

export default PricingSummary;