import { Edit, Trash2, MoreVertical as MoreVerticalIcon } from "lucide-react";
import Button from "./Button";

const ClientListTable = ({
  clients,
  selectedClient,
  setSelectedClient,
  openDropdown,
  toggleDropdown,
  dropdownRefs,
  handleEdit,
  handleDelete,
  statusStyles,
  onRowClick,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-[var(--medium-dark)] rounded-lg">
        <thead>
          <tr className="bg-[var(--dark-bg)] text-left">
            <th className="px-4 py-3 text-gray-300">Name</th>
            <th className="px-4 py-3 text-gray-300">Email</th>
            <th className="px-4 py-3 text-gray-300">Phone</th>
            <th className="px-4 py-3 text-gray-300">Status</th>
            <th className="px-4 py-3 text-gray-300">Last Contact</th>
            <th className="px-4 py-3 text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              key={client._id}
              className={`border-t border-gray-700 hover:bg-[var(--medium-dark)] transition-colors cursor-pointer ${selectedClient?._id === client._id ? "bg-[var(--primary-color)]/10" : ""
                }`}
              onClick={() => (onRowClick ? onRowClick(client) : setSelectedClient(client))}
            >
              <td className="px-4 py-3 flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 ${selectedClient?._id === client._id
                    ? "ring-2 ring-offset-2 ring-offset-gray-800 ring-white"
                    : ""
                    }`}
                >
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                {client.name}
              </td>
              <td className="px-4 py-3 text-gray-300">{client.email}</td>
              <td className="px-4 py-3 text-gray-300">{client.phone}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full text-white ${statusStyles[client.status] || "bg-gray-600"
                    }`}
                >
                  {client.status.replace("_", " ").toUpperCase()}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-300">
                {client.lastContact ? new Date(client.lastContact).toLocaleDateString() : "N/A"}
              </td>
              <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => toggleDropdown(e, client._id)}
                    className="text-gray-300 hover:bg-gray-800"
                  >
                    <MoreVerticalIcon className="w-4 h-4" />
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientListTable;