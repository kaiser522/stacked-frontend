import React, { useState } from "react";
import { Plus } from "lucide-react";
import PropertyForm from "../../Form/PropertyForm";

const PropertiesHeader = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-300">
            {" "}
            My Properties Listing
          </h1>
          <p className="text-gray-400 mt-1">
            Search and manage your property listings
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/70 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Close Form" : "Add Property"}
        </button>
      </div>

      {/* Form shows below the header, not over your content */}
      {showForm && (
        <div className="mt-6">
          <PropertyForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default PropertiesHeader;
