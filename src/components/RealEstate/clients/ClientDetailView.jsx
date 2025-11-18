
import { X, Edit, Trash2, Mail, Phone, Calendar, Home, Paperclip } from "lucide-react";
import Button from "./Button"; 

const statusStyles = {
  "Active Buyer": "bg-green-600",
  "Active Seller": "bg-blue-600",
  Lead: "bg-yellow-500 text-black",
};

const ClientDetailView = ({ client, onEdit, onDelete, onClose }) => {
  if (!client) return null;
 console.log(client)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-[var(--medium-dark)] border border-gray-700 rounded-lg p-6 relative animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
          {client.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-white">{client.name}</h2>
          <span
            className={`mt-1 inline-block px-2 py-1 text-xs font-medium rounded-full text-white ${
              statusStyles[client.status] || "bg-gray-600"
            }`}
          >
            {client.status}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-8 pb-6 border-b border-gray-700">
        <Button
          onClick={() => onEdit(client)}
          className="flex-1 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white"
        >
          <Edit className="w-4 h-4 mr-2" /> Edit Client
        </Button>
        <Button
          onClick={() => onDelete(client._id)}
          variant="outline"
          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </Button>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
        {/* Left Column: Contact & Notes */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">
              Contact Information
            </h3>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-[var(--primary-color)]" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-[var(--primary-color)]" />
              <span>{client.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-[var(--primary-color)]" />
              <span>Last Contact: {formatDate(client.lastContact)}</span>
            </div>
          </div>
          {/* Notes */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-200">Notes</h3>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 max-h-40 overflow-y-auto">
              <p className="text-sm whitespace-pre-wrap">
                {client.notes || "No notes for this client."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Associated Info */}
        <div className="space-y-6">
          {[
            { title: "Associated Properties", icon: Home },
            { title: "Documents", icon: Paperclip },
          ].map((section) => (
            <div className="space-y-2" key={section.title}>
              <h3 className="text-lg font-semibold text-gray-200">
                {section.title}
              </h3>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 text-center text-gray-400">
                <section.icon className="mx-auto mb-2 text-gray-500" size={28} />
                <p className="text-sm">No {section.title.toLowerCase()} found.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ClientDetailView;
