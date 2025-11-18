// src/components/RealEstate/clients/ClientFormModal.jsx
import { X, User, Mail, Phone, Tag, Save } from "lucide-react";
import Button from "./Button";

export default function ClientFormModal({
  showModal,
  editingClient,
  formData,
  formErrors,
  statusOptions,
  handleInputChange,
  handleSubmit,
  resetForm,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {editingClient ? "Edit Client" : "Add New Client"}
            </h2>
            <button
              onClick={resetForm}
              className="text-[var(--primary-color)]/70 hover:text-[var(--primary-color)] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {formErrors.error && (
            <p className="text-red-400 text-sm mb-4">{formErrors.error}</p>
          )}

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-2" /> Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full bg-gray-700 text-white border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] ${
                  formErrors.name ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Enter client's full name"
              />
              {formErrors.name && (
                <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mail className="w-4 h-4 inline mr-2" /> Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-gray-700 text-white border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] ${
                  formErrors.email ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Enter email address"
              />
              {formErrors.email && (
                <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Phone className="w-4 h-4 inline mr-2" /> Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full bg-gray-700 text-white border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] ${
                  formErrors.phone ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Enter phone number"
              />
              {formErrors.phone && (
                <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Tag className="w-4 h-4 inline mr-2" /> Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.replace("_", " ").toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] resize-none"
                placeholder="Add any additional notes about this client..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-blue-500 hover:bg-blue-400 text-white cursor-pointer"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingClient ? "Update Client" : "Create Client"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}