import React, { act, useEffect, useState } from "react";

export const Tabs = ({ defaultTab, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => setActiveTab(defaultTab), [defaultTab]);

  console.log({ activeTab });
  return (
    <div className="tabs-container">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList = ({ activeTab, setActiveTab, children }) => {
  return (
    <div className="tabs-list flex border-gray-200">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

export const TabsTrigger = ({ value, activeTab, setActiveTab, children }) => {
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`tab-trigger px-4 py-2 font-medium text-sm focus:outline-none min-w-48 ${
        isActive
          ? "border-b-2 border-var[(--primary-color)] text-[var(--primary-color)]"
          : "text-[var(--gray)] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, activeTab, children }) => {
  return activeTab === value ? (
    <div className="tab-content p-4">{children}</div>
  ) : null;
};
