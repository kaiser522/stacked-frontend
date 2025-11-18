import React, { useState } from "react";
import { Calendar, Type, AlignLeft } from "lucide-react";

const AddEditNewsLetter = ({ type, data, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: data?.title || "",
    description: data?.description || "",
    scheduledDate: data?.scheduledDate 
      ? new Date(data.scheduledDate).toISOString().slice(0, 16)
      : "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.scheduledDate) {
      newErrors.scheduledDate = "Scheduled date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSave) {
        await onSave(formData);
      }
    } catch (error) {
      console.error("Error saving newsletter:", error);
      alert("Failed to save newsletter. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="bg-[var(--lighter-dark)] p-4">
      <div className="max-w-2xl mx-auto">
        <div className="p-2">
          <p className="text-[var(--white)] mb-4">
            Fill out the form below to create and schedule your newsletter.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-[var(--white)] mb-2"
              >
                <Type className="inline w-4 h-4 mr-1" />
                Newsletter Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors placeholder:text-[var(--gray)] ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter newsletter title..."
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-[var(--white)] mb-2"
              >
                <AlignLeft className="inline w-4 h-4 mr-1" />
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-vertical placeholder:text-[var(--gray)] ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter newsletter description..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Scheduled Date Field */}
            <div>
              <label
                htmlFor="scheduledDate"
                className="block text-sm font-medium text-[var(--white)] mb-2"
              >
                <Calendar className="inline w-4 h-4 mr-1" />
                Scheduled Date
              </label>
              <input
                type="datetime-local"
                id="scheduledDate"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleInputChange}
                min={getMinDate()}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-[var(--gray)] ${
                  errors.scheduledDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.scheduledDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.scheduledDate}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-400 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : type === "edit" ? "Update" : "Create"} Newsletter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditNewsLetter;
