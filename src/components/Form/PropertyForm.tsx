import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useCreatePropertyMutation } from "../../store/apis/properties.api";
import AddressMap from "./AddressMap";

type Props = { onClose: () => void };

/* ---------- helpers ---------- */

function getUserId(): string | undefined {
  try {
    const raw = localStorage.getItem("__user__");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return parsed?.id ?? parsed?._id ?? undefined;
  } catch {
    return undefined;
  }
}

function sanitizePayload(data: any, coordinates?: { lat: number | null; lng: number | null }) {
  const toNumber = (v: string) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  return {
    address: data.address?.trim(),
    price: toNumber(data.price),
    beds: toNumber(data.beds),
    baths: toNumber(data.baths),
    sqft: toNumber(data.sqft),
    type: data.type,
    status: data.status,
    image: data.image?.trim(),
    yearBuilt: toNumber(data.yearBuilt),
    description: data.description?.trim(),
    location: {
      name: data.address?.trim(),
      latitude: coordinates?.lat,
      longitude: coordinates?.lng
    },
    features:
      data.features
        ?.split(",")
        .map((f: string) => f.trim()),
    //     .filter((f: string) => f.length) || [],
    // coordinates: coordinates?.lat && coordinates?.lng ? {
    //   lat: coordinates.lat,
    //   lng: coordinates.lng
    // } : undefined,
    agentId: getUserId(),
  };
}

/* ---------- component ---------- */

const PropertyForm: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    address: "",
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    type: "Single Family",
    status: "For Sale",
    image: "",
    yearBuilt: "",
    description: "",
    features: "",
  });

  const [coordinates, setCoordinates] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });

  const [createProperty, { isLoading }] = useCreatePropertyMutation();

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    setFormData({ ...formData, address });
    setCoordinates({ lat, lng });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    // Validate that an address has been selected
    if (!formData.address.trim()) {
      alert("Please select a property address using the map.");
      return;
    }

    try {
      const payload = sanitizePayload(formData, coordinates);
      console.log("payload", payload);

      if (!payload.agentId) {
        alert("Could not determine the current user. Please sign in again.");
        return;
      }

      await createProperty(payload).unwrap();
      alert("Property created successfully");
      onClose();
    } catch (err: any) {
      const msg =
        err?.data?.message || err?.error || "Failed to create property.";
      alert(msg);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit}
          className="relative z-[10001] bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">Add Property</h2>

          {/* Address Map Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Address *
            </label>
            <AddressMap
              onAddressSelect={handleAddressSelect}
              initialAddress={formData.address}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              name="beds"
              type="number"
              placeholder="Beds"
              value={formData.beds}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              name="baths"
              type="number"
              placeholder="Baths"
              value={formData.baths}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              name="sqft"
              type="number"
              placeholder="Sqft"
              value={formData.sqft}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option>Single Family</option>
              <option>Condo</option>
              <option>Townhouse</option>
              <option>Luxury Home</option>
              <option>Apartment</option>
            </select>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option>For Sale</option>
              <option>Sold</option>
              <option>Pending</option>
              <option>Off Market</option>
            </select>
            <input
              name="yearBuilt"
              type="number"
              placeholder="Year Built"
              value={formData.yearBuilt}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="features"
              placeholder="Features (comma separated)"
              value={formData.features}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-3"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--primary-color)] text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default PropertyForm;
