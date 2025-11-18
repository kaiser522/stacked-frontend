import { Download, Search } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm, handleExport, activeTab }) {
    return (
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or plan..."
            className="w-full pl-10 pr-4 py-2 bg-[#2D3A48] text-white rounded border border-slate-600 focus:outline-none focus:border-cyan-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={handleExport} 
          className="flex items-center gap-2 bg-[#2D3A48] hover:bg-slate-600 text-white py-2 px-4 rounded transition-colors"
        >
          <Download size={18} />
          Export
        </button>
      </div>
    );
  }

  export default SearchBar