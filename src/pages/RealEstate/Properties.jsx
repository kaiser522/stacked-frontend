import { useState } from "react";
import { Building, Heart } from "lucide-react";
import { createPortal } from "react-dom";
import AllProperties from "./AllProperties";
import MyPropertyListing from "./MyPropertyListing";
import MyFavorites from "./MyFavorites";
import PropertyNotes from "../../components/RealEstate/PropertyNotes";

/* ======================= MAIN COMPONENT ======================== */

const Properties = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState("all");

  // Common state for all tabs
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("price-desc");
  const [showNotesForProperty, setShowNotesForProperty] = useState(null);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    beds: "",
    baths: "",
    propertyType: "",
    status: "",
  });

  const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      beds: "",
      baths: "",
      propertyType: "",
      status: "",
    });
    setSearchQuery("");
  };

  const getCurrentComponent = () => {
    const commonProps = {
      searchQuery,
      setSearchQuery,
      viewMode,
      setViewMode,
      showFilters,
      setShowFilters,
      sortBy,
      setSortBy,
      filters,
      setFilters,
      clearFilters,
    };

    switch (activeTab) {
      case "all":
        return (
          <AllProperties
            {...commonProps}
            showNotesForProperty={showNotesForProperty}
            setShowNotesForProperty={setShowNotesForProperty}
          />
        );
      case "my":
        return <MyPropertyListing {...commonProps} />;
      case "favorites":
        return <MyFavorites {...commonProps} />;
      default:
        return <AllProperties {...commonProps} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-[var(--medium-dark)] rounded-xl shadow-sm border border-[var(--primary-color)]/30">
        <div className="flex border-b border-[var(--primary-color)]/30">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === "all"
              ? "text-[var(--primary-color)] border-b-2 border-[var(--primary-color)] bg-[var(--lighter-dark)]"
              : "text-gray-300 hover:text-[var(--primary-color)] hover:bg-[var(--lighter-dark)]"
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Building className="w-4 h-4" />
              All Properties
            </div>
          </button>
          <button
            onClick={() => setActiveTab("my")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === "my"
              ? "text-[var(--primary-color)] border-b-2 border-[var(--primary-color)] bg-[var(--lighter-dark)]"
              : "text-gray-300 hover:text-[var(--primary-color)] hover:bg-[var(--lighter-dark)]"
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Building className="w-4 h-4" />
              My Properties
            </div>
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === "favorites"
              ? "text-[var(--primary-color)] border-b-2 border-[var(--primary-color)] bg-[var(--lighter-dark)]"
              : "text-gray-300 hover:text-[var(--primary-color)] hover:bg-[var(--lighter-dark)]"
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" />
              My Favorites
            </div>
          </button>
        </div>
      </div>

      {/* Render the current component */}
      {getCurrentComponent()}

      {/* Notes Modal */}
      {showNotesForProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--medium-dark)] rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[var(--primary-color)]/30">
              <h2 className="text-xl font-semibold text-gray-200">Property Notes</h2>
              <button
                onClick={() => setShowNotesForProperty(null)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
              <PropertyNotes
                propertyId={showNotesForProperty}
                userId={localStorage.getItem("__user__") ? JSON.parse(localStorage.getItem("__user__"))?.id || JSON.parse(localStorage.getItem("__user__"))?._id : null}
                userRole={localStorage.getItem("__user__") ? JSON.parse(localStorage.getItem("__user__"))?.role : null}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;