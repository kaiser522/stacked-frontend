import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const PlanCard = ({ card, billingType, onClick }) => {
  return (
    <div
      className="bg-[#2D3A48] rounded-2xl p-6 shadow-md text-white cursor-pointer hover:ring ring-[var(--primary-color)]"
      onClick={() => onClick(card)}
    >
      <h3 className="text-xl font-semibold mb-1 text-center text-white">{card?.originalData?.plan_name}</h3>
      <p className="text-lg font-semibold mb-2 flex items-center gap-2">
        <span className="text-[var(--primary-color)]">
          ${billingType === "monthly"
            ? card.rate.monthly?.price
            : card.rate.yearly?.price}
        </span>
        <span className="text-gray-400 text-sm font-medium">
          {billingType === "monthly"
            ? card.rate.monthly?.duration
            : card.rate.yearly?.duration}
        </span>
        {billingType === "yearly" && (
          <span className="text-[var(--primary-color)] text-sm font-semibold ml-2">
            10% off
          </span>
        )}
      </p>
      <p className="text-md text-base font-bold text-gray-200 pt-2 pb-4">
        {card?.subheading}
      </p>

      <ul className="text-sm text-left text-gray-300 space-y-2 max-h-96 overflow-y-auto pr-2">
        {card?.originalData?.features?.map((featureGroup, groupIndex) => {
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

          if (featureStr?.trim().startsWith("--")) {
            // Sub-feature (indented, no icon)
            return (
              <li key={groupIndex} className="pl-10 text-gray-300 list-disc">
                <span className="text-[var(--primary-color)] text-2xl">
                  &bull;
                </span>{" "}
                {featureStr?.replace("--", "").trim()}
              </li>
            );
          }

          // Check if feature starts with bullet point
          if (featureStr?.trim().startsWith("•")) {
            // Sub-feature with bullet - show only bullet, no tick
            return (
              <li key={groupIndex} className="flex items-start pl-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full p-1">
                  {/* Empty space to align with tick items */}
                </span>
                <span className="leading-loose">
                  <span className="text-white-500">•</span> {featureStr?.replace("•", "").trim()}
                </span>
              </li>
            );
          }

          // Main category feature with tick only
          if (featureStr) {
            return (
              <li key={groupIndex} className="flex items-start pl-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full p-1">
                  <FaCheckCircle className="w-6 h-6 text-[var(--primary-color)]" />
                </span>
                <span className="leading-loose">{featureStr}</span>
              </li>
            );
          }

          return null;
        })}
      </ul>
    </div>
  );
};

export default PlanCard;
