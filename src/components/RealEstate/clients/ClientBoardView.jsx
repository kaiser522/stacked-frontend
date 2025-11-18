import Button from "./Button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";

export default function ClientBoardView({
  clients,
  selectedClient,
  setSelectedClient,
  openDropdown,
  toggleDropdown,
  dropdownRefs,
  handleEdit,
  handleDelete,
  statusStyles,
  onCardClick,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clients.map((client) => (
        <div
          key={client._id}
          className={`bg-[var(--medium-dark)] border rounded-lg p-4 space-y-3 transition-all cursor-pointer ${selectedClient?._id === client._id
            ? "border-[var(--primary-color)]"
            : "border-gray-700 hover:border-gray-600"
            }`}
          onClick={() => (onCardClick ? onCardClick(client) : setSelectedClient(client))}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 ${selectedClient?._id === client._id
                  ? "ring-2 ring-offset-2 ring-offset-gray-800 ring-white"
                  : ""
                  }`}
              >
                {client.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-semibold">{client.name}</p>
                <p className="text-xs text-gray-400">{client.email}</p>
              </div>
            </div>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => toggleDropdown(e, client._id)}
                className="text-gray-300 hover:bg-gray-800 -mr-2 -mt-1"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              {openDropdown === client._id && (
                <div
                  ref={(el) => (dropdownRefs.current[client._id] = el)}
                  className="absolute right-0 mt-1 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20"
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleEdit(client)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      <Edit className="w-4 h-4 mr-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(client._id)}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                    >
                      <Trash2 className="w-4 h-4 mr-3" /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full text-white ${statusStyles[client.status] || "bg-gray-600"
                }`}
            >
              {client.status}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Last Contact: {client.lastContact}
          </p>
        </div>
      ))}
    </div>
  );
}
