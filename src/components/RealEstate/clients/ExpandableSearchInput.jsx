import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

export default function ExpandableSearchInput({
  searchQuery,
  setSearchQuery,
  expanded,
  setExpanded,
  inputRef,
  wrapperRef,
}) {
  return (
    <div className="flex items-center justify-center">
      <div ref={wrapperRef} className="flex items-center">
        {/* Toggle Button */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="group relative h-11 w-11 flex items-center justify-center rounded-lg bg-gray-700 transition-colors overflow-hidden hover:bg-gray-600"
        >
          <Search className="w-5 h-5 text-gray-300 z-10" />
        </button>

        {/* Search Input */}
        <div
          className={`relative ml-2 transition-all duration-300 ease-in-out overflow-hidden ${
            expanded ? "w-64 opacity-100" : "w-0 opacity-0"
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`h-11 w-full bg-gray-700 text-white border border-transparent rounded-lg
              pl-4 pr-8 py-2 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]  ${
                expanded ? "opacity-100" : "opacity-0"
              }`}
          />
          {searchQuery && expanded && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-2.5 text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
