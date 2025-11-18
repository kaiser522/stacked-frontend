import { Filter, Plus, Search, X } from "lucide-react";
import Button from "./Button";
import ExpandableSearchInput from "./ExpandableSearchInput";

export default function ClientHeader({
  clients,
  searchQuery,
  setSearchQuery,
  expanded,
  setExpanded,
  inputRef,
  wrapperRef,
  resetForm,
  setShowModal,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold">Clients</h1>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <ExpandableSearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          expanded={expanded}
          setExpanded={setExpanded}
          inputRef={inputRef}
          wrapperRef={wrapperRef}
        />
        <Button
          variant="outline"
          className="h-11 flex items-center justify-center p-3 flex-shrink-0 border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <Filter className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="h-11 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white flex items-center px-4 text-sm flex-shrink-0"
        >
          <Plus className="mr-2" />
          Add Client
        </Button>
      </div>
    </div>
  );
}
