import AddOnCard from "./AddOnCard";
import Button from "../Button";
import { FaCheckCircle } from "react-icons/fa";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSelectedPlansForSummary } from "../../store/slices/plans.slice";

const PricingModal = ({
  type,
  selectedCard,
  billingType,
  selectedAddOns,
  addOns,
  onAddOnToggle,
  getUpdatedPrice,
  onClose,
  navigateToSummary,
}) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleContinue = () => {
    const selectedPlan = {
      selectedCard,
      billingType,
      selectedAddOns,
      price: getUpdatedPrice(),
      type,
    };
    dispatch(setSelectedPlansForSummary(selectedPlan));
    navigateToSummary();
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 opacity-80 z-10 backdrop-blur-md"></div>
      <div className="fixed inset-0 z-20 flex items-center justify-center p-2 sm:p-4">
        <div
          ref={modalRef}
          className="bg-[#2D3A48] rounded-2xl p-3 sm:p-4 md:p-6 max-w-5xl w-full text-white shadow-xl flex flex-col lg:flex-row gap-4 md:gap-6 max-h-[90vh] overflow-hidden"
        >
          {/* Main Content Section */}
          <div className="w-full lg:w-2/3 flex flex-col min-h-0">
            <div className="flex-shrink-0">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{selectedCard.title}</h3>
              <p className="text-base sm:text-lg font-semibold mb-2 flex flex-wrap items-center gap-2">
                <span className="text-[var(--primary-color)]">{getUpdatedPrice()}</span>
                <span className="text-gray-400 text-sm font-medium">
                  {billingType === "monthly"
                    ? selectedCard.rate.monthly.duration
                    : selectedCard.rate.yearly.duration}
                </span>
                {billingType === "yearly" && (
                  <span className="text-[var(--primary-color)] text-sm font-semibold">
                    10% off
                  </span>
                )}
              </p>
              <p className="text-sm sm:text-base text-gray-200 pb-3 sm:pb-5 pt-3 sm:pt-7">
                {selectedCard.subheading}
              </p>
            </div>

            {/* Features List - Scrollable */}
            <div className="flex-1 min-h-0">
              <ul
                className="text-xs sm:text-sm text-left text-gray-300 space-y-1 sm:space-y-2 h-full overflow-y-auto pr-1 sm:pr-2"
                style={{ scrollbarWidth: "thin", msOverflowStyle: "auto" }}
              >
                {(selectedCard.originalData?.features || selectedCard.features || []).map((featureGroup, groupIndex) => {
                  // Check if feature is an object with category/items structure
                  if (featureGroup && typeof featureGroup === 'object' && featureGroup.category && featureGroup.items) {
                    return (
                      <React.Fragment key={featureGroup._id || groupIndex}>
                        {/* Main category with checkmark */}
                        <li className="flex items-start gap-1 sm:gap-2 p-1 sm:p-2">
                          <span className="w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center rounded-full mt-[-1px] sm:mt-[-2px] p-1 flex-shrink-0">
                            <FaCheckCircle className="w-3 h-3 sm:w-6 sm:h-6 text-[var(--primary-color)]" />
                          </span>
                          <span className="text-xs sm:text-sm leading-relaxed font-semibold text-white">
                            {featureGroup.category}
                          </span>
                        </li>
                        {/* Sub-items with bullet points */}
                        {featureGroup.items?.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-1 sm:gap-2 p-1 sm:p-2">
                            <span className="w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center rounded-full mt-[-1px] sm:mt-[-2px] p-1 flex-shrink-0">
                              {/* Empty space to align with tick items */}
                            </span>
                            <span className="text-xs sm:text-sm leading-relaxed text-gray-300">
                              <span className="text-gray-400">•</span> {item}
                            </span>
                          </li>
                        ))}
                      </React.Fragment>
                    );
                  }

                  // Fallback: Handle old string-based format for backward compatibility
                  const featureStr = typeof featureGroup === 'string' ? featureGroup : '';

                  if (featureStr?.trim().startsWith("--")) {
                    // Sub-feature (indented, no icon)
                    return (
                      <li key={groupIndex} className="pl-6 sm:pl-10 text-gray-300 list-disc p-1 sm:p-2">
                        <span className="text-[var(--primary-color)] text-lg sm:text-2xl">
                          &bull;
                        </span>{" "}
                        <span className="text-xs sm:text-sm">{featureStr.replace("--", "").trim()}</span>
                      </li>
                    );
                  }

                  // Check if feature starts with bullet point
                  if (featureStr?.trim().startsWith("•")) {
                    // Sub-feature with bullet - show only bullet, no tick
                    return (
                      <li key={groupIndex} className="flex items-start gap-1 sm:gap-2 p-1 sm:p-2">
                        <span className="w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center rounded-full mt-[-1px] sm:mt-[-2px] p-1 flex-shrink-0">
                          {/* Empty space to align with tick items */}
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed">
                          <span className="text-white-500">•</span> {featureStr.replace("•", "").trim()}
                        </span>
                      </li>
                    );
                  }

                  // Main category feature with tick only
                  if (featureStr) {
                    return (
                      <li key={groupIndex} className="flex items-start gap-1 sm:gap-2 p-1 sm:p-2">
                        <span className="w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center rounded-full mt-[-1px] sm:mt-[-2px] p-1 flex-shrink-0">
                          <FaCheckCircle className="w-3 h-3 sm:w-6 sm:h-6 text-[var(--primary-color)]" />
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed">{featureStr}</span>
                      </li>
                    );
                  }

                  return null;
                })}
              </ul>
            </div>

            {/* Continue Button */}
            <div className="flex-shrink-0 flex justify-center mt-3 sm:mt-5">
              <Button variant="outline" onClick={handleContinue} className="w-full sm:w-auto">
                Continue
              </Button>
            </div>
          </div>

          {/* Add-Ons Section */}
          <div className="w-full lg:w-1/2 bg-[#1E2A38] p-3 sm:p-4 md:p-6 rounded-lg shadow-lg text-white flex flex-col gap-3 sm:gap-4 md:gap-6 hover:ring ring-[var(--primary-color)] min-h-0">
            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 flex-shrink-0">
              Customize with your Add-On Modules
            </h3>
            <div className="flex-1 min-h-0 overflow-y-auto space-y-3 sm:space-y-4">
              {addOns.map((addon) => (
                <AddOnCard
                  key={addon.key}
                  addon={addon}
                  selected={selectedAddOns[addon.key]}
                  onToggle={() => onAddOnToggle(addon.key)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingModal;
