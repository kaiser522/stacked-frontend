import React from "react";
import { IoDocument } from "react-icons/io5"; // Ensure you're using this correctly
// Example: import features from a constants file or pass as prop

const QuickActions = ({ features }) => {
  return (
    <div className="bg-[var(--medium-dark)] mt-6 max-w-[1180px] mx-auto rounded-xl shadow-lg">
      {/* Section Header */}
      <h2 className="flex items-center justify-center gap-2 p-5 text-xl font-semibold text-gray-200">
        <IoDocument className="text-[var(--primary-color)]" />
        Quick Actions
      </h2>

      {/* Feature Cards */}
      <div className="p-6">
        <div className="flex flex-wrap justify-center gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="w-64 p-5 rounded-xl bg-[var(--lighter-dark)] text-gray-300 text-center shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-200 cursor-pointer"
              >
                <div className="flex justify-center mb-3">
                  <Icon className="w-8 h-8 text-[var(--primary-color)]" />
                </div>
                <p className="text-base font-medium">{feature.label}</p>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mt-10 mb-6">
          <hr className="border-t border-[var(--primary-color)]/30" />
        </div>

        {/* Enhanced Features Two-Column List */}
        {/* <h3 className="text-center text-gray-300 text-lg font-semibold mb-6">
          Enhanced Features for{" "}
          <span className="text-white font-bold">Starter Stack</span>
        </h3> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 text-gray-300">
          <ul className="list-disc list-inside space-y-3">
            <li>
              <span className="text-white font-medium">Content Library:</span>{" "}
              Quick access to guides and scripts
            </li>
            <li>
              <span className="text-white font-medium">Open House Toolkit:</span>{" "}
              Create open house events and associate clients
            </li>
            <li>
              <span className="text-white font-medium">Client Portal Links:</span>{" "}
              Generate read-only transaction views
            </li>
          </ul>
          <ul className="list-disc list-inside space-y-3">
            <li>
              <span className="text-white font-medium">Task Creation:</span>{" "}
              Directly from client profiles
            </li>
            <li>
              <span className="text-white font-medium">Email Templates:</span>{" "}
              Client-specific merge fields
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default QuickActions;
