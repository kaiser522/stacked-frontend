import { Search } from "lucide-react";

export default function SearchInput({ placeholder, name, value, setValue , className }) {
  return (
    <div className="relative flex-grow">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
        size={18}
      />
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-2 bg-[#2D3A48] text-white rounded border border-slate-600 focus:outline-none focus:border-cyan-400 ${className}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name={name}
      />
    </div>
  );
}
