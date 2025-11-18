const AddOnCard = ({ addon, selected, onToggle }) => (
  <div className="bg-[#324456] p-4 rounded-lg flex items-center justify-between gap-4 max-h-64">
    <div className="flex-1 overflow-hidden">
      <h4 className="text-base p-2 font-semibold">{addon.title}</h4>

      {/* Scrollable description box */}
      <div className="text-sm p-2 text-gray-300 space-y-1 overflow-y-scroll max-h-28 pr-2">
        {Array.isArray(addon.description) ? (
          addon.description.map((point, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-[var(--primary-color)]">*</span>
              <span>{point}</span>
            </div>
          ))
        ) : (
          <p>{addon.description}</p>
        )}
      </div>
    </div>

    <div className="text-right flex flex-col justify-between items-end h-full">
      <p className="font-bold text-sm">
        <span className="text-[var(--primary-color)]">{addon.price}</span>
        <span className="text-gray-400 text-[10px]"> {addon.duration}</span>
      </p>
      <label className="relative inline-flex items-center cursor-pointer mt-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-[var(--primary-color)] transition duration-300"></div>
        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-4 transition duration-300"></div>
      </label>
    </div>
  </div>
);
export default AddOnCard