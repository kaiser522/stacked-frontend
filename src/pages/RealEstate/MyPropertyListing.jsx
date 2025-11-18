import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import {
    Search,
    MapPin,
    Bed,
    Bath,
    Square,
    Grid,
    List,
    Plus,
    SlidersHorizontal,
    X,
    Eye,
    Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import MyPropertesHeader from "../../components/RealEstate/properties/MyPorpertiesHeader";
import {
    useGetPropertiesByAgentIdQuery,
    useToggleSavedPropertyMutation,
    useUpdatePropertyMutation,
    useDeletePropertyMutation,
} from "../../store/apis/properties.api";

/* --------------------------- helpers --------------------------- */

function formatPriceUSD(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

/* ------------------------ Edit Modal --------------------------- */

function EditPropertyModal({ open, onClose, initial }) {
    const [form, setForm] = useState(() => ({
        address: initial?.address || "",
        price: String(initial?.price ?? ""),
        beds: String(initial?.beds ?? ""),
        baths: String(initial?.baths ?? ""),
        sqft: String(initial?.sqft ?? ""),
        type: initial?.type || "Single Family",
        status: initial?.status || "For Sale",
        image: initial?.image || "",
        yearBuilt: String(initial?.yearBuilt ?? ""),
        description: initial?.description || "",
        features: Array.isArray(initial?.features)
            ? initial.features.join(", ")
            : initial?.features || "",
        agentId:
            typeof initial?.agentId === "object"
                ? initial.agentId?._id || ""
                : initial?.agentId || "",
        clientId:
            typeof initial?.clientId === "object"
                ? initial.clientId?._id || ""
                : initial?.clientId || "",
    }));

    // keep form in sync if "initial" changes while modal is open
    useEffect(() => {
        if (!open) return;
        setForm({
            address: initial?.address || "",
            price: String(initial?.price ?? ""),
            beds: String(initial?.beds ?? ""),
            baths: String(initial?.baths ?? ""),
            sqft: String(initial?.sqft ?? ""),
            type: initial?.type || "Single Family",
            status: initial?.status || "For Sale",
            image: initial?.image || "",
            yearBuilt: String(initial?.yearBuilt ?? ""),
            description: initial?.description || "",
            features: Array.isArray(initial?.features)
                ? initial.features.join(", ")
                : initial?.features || "",
            agentId:
                typeof initial?.agentId === "object"
                    ? initial.agentId?._id || ""
                    : initial?.agentId || "",
            clientId:
                typeof initial?.clientId === "object"
                    ? initial.clientId?._id || ""
                    : initial?.clientId || "",
        });
    }, [open, initial]);

    // lock scroll while open
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    const [updateProperty, { isLoading: saving }] = useUpdatePropertyMutation();

    const handleChange = (e) =>
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (saving) return;

        const payload = {
            address: form.address.trim(),
            price: Number(form.price),
            beds: Number(form.beds),
            baths: Number(form.baths),
            sqft: Number(form.sqft),
            type: form.type,
            status: form.status,
            image: form.image.trim(),
            yearBuilt: Number(form.yearBuilt),
            description: form.description.trim(),
            features: form.features
                ? form.features
                    .split(",")
                    .map((f) => f.trim())
                    .filter(Boolean)
                : [],
        };
        if (form.agentId) payload.agentId = form.agentId.trim();
        if (form.clientId) payload.clientId = form.clientId.trim();

        try {
            await updateProperty({
                id: initial._id || initial.id,
                body: payload,
            }).unwrap();
            toast.success("Property updated");
            onClose(true);
        } catch (err) {
            console.error(err);
            const msg = err?.data?.message || "Something went wrong while updating.";
            toast.error(msg);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[10000]">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => onClose(false)}
            />
            <div
                className="absolute inset-0 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <form
                    onSubmit={handleSubmit}
                    className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]"
                >
                    <h2 className="text-xl font-bold mb-4">Edit Property</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            name="address"
                            placeholder="Address"
                            value={form.address}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            name="price"
                            type="number"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            name="beds"
                            type="number"
                            placeholder="Beds"
                            value={form.beds}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            name="baths"
                            type="number"
                            placeholder="Baths"
                            value={form.baths}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            name="sqft"
                            type="number"
                            placeholder="Sqft"
                            value={form.sqft}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded"
                        />
                        <select
                            name="type"
                            value={form.type}
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
                            value={form.status}
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
                            value={form.yearBuilt}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            name="image"
                            placeholder="Image URL"
                            value={form.image}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <input
                            name="features"
                            placeholder="Features (comma separated)"
                            value={form.features}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <input
                            name="agentId"
                            placeholder="Agent ID"
                            value={form.agentId}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <input
                            name="clientId"
                            placeholder="Client ID"
                            value={form.clientId}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="border p-2 rounded w-full mt-3"
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => onClose(false)}
                            className="px-4 py-2 bg-gray-300 rounded"
                            disabled={saving}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[var(--primary-color)] text-white rounded"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}

/* --------------------- Delete Confirm Modal -------------------- */

function ConfirmDeleteModal({ open, onClose, property }) {
    const [deleteProperty, { isLoading: deleting }] = useDeletePropertyMutation();

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    if (!open) return null;

    const handleYes = async () => {
        try {
            await deleteProperty(property._id || property.id).unwrap();
            toast.success("Property deleted");
            onClose(true);
        } catch (e) {
            console.error(e);
            const msg = e?.data?.message || "Something went wrong while deleting.";
            toast.error(msg);
            onClose(false);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[10000]">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => onClose(false)}
            />
            <div
                className="absolute inset-0 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                    <h3 className="text-lg font-semibold mb-2">Delete property?</h3>
                    <p className="text-sm text-gray-600">
                        This will permanently remove{" "}
                        <span className="font-medium">{property?.address}</span>.
                    </p>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            className="px-4 py-2 bg-gray-200 rounded"
                            onClick={() => onClose(false)}
                            disabled={deleting}
                        >
                            No
                        </button>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded"
                            onClick={handleYes}
                            disabled={deleting}
                        >
                            {deleting ? "Deleting..." : "Yes, delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

/* ======================= MAIN COMPONENT ======================== */

const MyPropertyListing = ({
    searchQuery = "",
    setSearchQuery = () => { },
    viewMode = "grid",
    setViewMode = () => { },
    showFilters = false,
    setShowFilters = () => { },
    sortBy = "price-desc",
    setSortBy = () => { },
    filters = {},
    setFilters = () => { },
    clearFilters = () => { },
    onPropertyClick = () => { }
}) => {
    const [agentId, setAgentId] = useState(null);

    const {
        data: propertiesData,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetPropertiesByAgentIdQuery({
        agentId,
        search: searchQuery,
        status: filters.status || undefined,
        type: filters.propertyType || undefined,
        minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
        minBeds: filters.beds ? parseInt(filters.beds) : undefined,
        sortBy: getSortByField(sortBy),
        sortOrder: getSortOrder(sortBy),
        limit: 1000,
        page: 1,
    });

    const [toggleSaved] = useToggleSavedPropertyMutation();

    const properties = propertiesData?.data.properties || [];
    const totalCount = propertiesData?.total || 0;

    const [editing, setEditing] = useState(null);
    const [deletingState, setDeleting] = useState(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("__user__");
            if (!raw) return;
            const u = JSON.parse(raw);
            setAgentId(u?.agentId || u?._id || u?.id || null);
        } catch {
            setAgentId(null);
        }
    }, []);

    function getSortByField(sortValue) {
        switch (sortValue) {
            case "price-asc":
            case "price-desc":
                return "price";
            case "newest":
                return "createdAt";
            case "sqft-desc":
                return "sqft";
            case "price-per-sqft":
                return "pricePerSqft";
            default:
                return "createdAt";
        }
    }

    function getSortOrder(sortValue) {
        switch (sortValue) {
            case "price-asc":
                return "asc";
            case "price-desc":
            case "newest":
            case "sqft-desc":
                return "desc";
            case "price-per-sqft":
                return "asc";
            default:
                return "desc";
        }
    }

    const handleSearch = (value) => setSearchQuery(value);

    const filteredProperties = useMemo(() => {
        return properties?.filter((property) => {
            const matchesBaths =
                !filters.baths || property.baths >= parseFloat(filters.baths);
            return matchesBaths;
        });
    }, [properties, filters.baths]);

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-96"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-6 bg-gray-200 rounded w-32"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                        Error Loading Properties
                    </h3>
                    <p className="text-red-600 mb-4">
                        {error?.data?.message ||
                            "Failed to load properties. Please try again."}
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <MyPropertesHeader
                totalCount={totalCount}
                onAddClick={() => console.log("Navigate to Add Property page")}
            />

            <div className="bg-[var(--medium-dark)] rounded-xl shadow-sm border-none border-[var(--primary-color)]">
                <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                            <input
                                type="text"
                                placeholder="Enter an address, neighborhood, city, or ZIP code..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="text-gray-300 w-full pl-10 pr-4 py-3 border border-[var(--primary-color)]/20 rounded-lg focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                            />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="text-gray-300 px-4 py-2 border border-[var(--primary-color)]/30 rounded-lg focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                            >
                                <option value="price-desc">Price: High to Low</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="newest">Newest Listed</option>
                                <option value="sqft-desc">Largest First</option>
                                <option value="sqft-asc">Smallest First</option>
                                <option value="price-per-sqft">Price per Sq Ft</option>
                            </select>

                            <div className="flex border border-[var(--primary-color)]/30 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 ${viewMode === "grid"
                                        ? "bg-[var(--primary-color)] text-white"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 border-l border-gray-300 ${viewMode === "list"
                                        ? "bg-[var(--primary-color)] text-white"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="mt-6 pt-6 border-t border-[var(--primary-color)]/70">
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-gray-300 hover:text-[var(--primary-color)] cursor-pointer flex items-center gap-1"
                                >
                                    <X className="w-4 h-4" />
                                    Clear all filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div
                className={
                    viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "space-y-4"
                }
            >
                {filteredProperties.map((property) => {
                    const pid = property.id || property._id;

                    return (
                        <Link
                            key={pid}
                            to={`/realestate/properties/${pid}`}
                            className={`relative bg-[var(--medium-dark)] rounded-xl shadow-sm border border-[var(--primary-color)]/30 hover:shadow-lg transition-all duration-200 cursor-pointer group overflow-hidden ${viewMode === "list" ? "flex" : ""
                                }`}
                        >
                            {/* action buttons */}
                            <div
                                className="absolute top-3 right-3 z-30 flex gap-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <button
                                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                    onClick={() => setEditing(property)}
                                    aria-label="Edit property"
                                >
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button
                                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                    onClick={() => setDeleting(property)}
                                    aria-label="Delete property"
                                >
                                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            {viewMode === "grid" && (
                                <div className="relative">
                                    <img
                                        src={
                                            property.image ||
                                            property.images?.[0] ||
                                            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
                                        }
                                        alt={property.address}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                                    />

                                    <div className="absolute top-3 left-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${property.status === "For Sale"
                                                ? "bg-green-100 text-green-800"
                                                : property.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {property.status}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-3 left-3 flex gap-2">
                                        <span className="px-2 py-1 bg-black/70 text-white text-xs rounded">
                                            <Eye className="w-3 h-3 inline mr-1" />
                                            {property.views || 0}
                                        </span>
                                        <span className="px-2 py-1 bg-black/70 text-white text-xs rounded">
                                            <Calendar className="w-3 h-3 inline mr-1" />
                                            {property.daysOnMarket || 0}d
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                                <div className="space-y-3">
                                    {viewMode === "list" && (
                                        <div className="flex items-center justify-between mb-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${property.status === "For Sale"
                                                    ? "bg-green-100 text-green-800"
                                                    : property.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {property.status}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-bold text-gray-200">
                                            {formatPriceUSD(property.price)}
                                        </div>
                                        <div className="text-sm text-gray-300">
                                            <span className="text-[var(--primary-color)]">$</span>
                                            {property.pricePerSqft ||
                                                Math.round(property.price / property.sqft)}
                                            /sqft
                                        </div>
                                    </div>

                                    <div
                                        className={`flex items-center text-sm text-gray-600 ${viewMode === "list" ? "gap-6" : "gap-4"
                                            }`}
                                    >
                                        <span className="flex text-gray-300 items-center gap-1">
                                            <Bed className="w-4 h-4" />
                                            {property.beds} beds
                                        </span>
                                        <span className="flex text-gray-300 items-center gap-1">
                                            <Bath className="w-4 h-4" />
                                            {property.baths} baths
                                        </span>
                                        <span className="flex text-gray-300 items-center gap-1">
                                            <Square className="w-4 h-4" />
                                            {property.sqft?.toLocaleString()} sqft
                                        </span>
                                        {viewMode === "list" && (
                                            <>
                                                <span className="flex text-gray-300 items-center gap-1">
                                                    <Eye className="w-4 h-4" />
                                                    {property.views || 0} views
                                                </span>
                                                <span className="flex text-gray-300 items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {property.daysOnMarket || 0} days
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-[var(--primary-color)] mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-300 line-clamp-2">
                                            {property.address}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-[var(--primary-color)]/50">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium">
                                            {property.type}
                                        </span>
                                        <span className="text-xs text-gray-300">
                                            Built {property.yearBuilt || "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Empty state */}
            {filteredProperties.length === 0 && !isLoading && (
                <div className="bg-[var(--medium-dark)] rounded-xl shadow-sm border border-[var(--primary-color)] text-center py-16">
                    <MapPin className="w-16 h-16 text-[var(--primary-color)] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                        No properties found
                    </h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                        Try adjusting your search criteria or filters to find more
                        properties, or add a new property to get started.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={clearFilters}
                            className="px-6 py-2 border border-[var(--primary-color)]/70 text-gray-300 rounded-lg hover:bg-[var(--lighter-dark)] cursor-pointer transition-colors"
                        >
                            Clear Filters
                        </button>
                        <button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/70 cursor-pointer text-white px-6 py-2 rounded-lg flex items-center gap-2 justify-center transition-colors">
                            <Plus className="w-4 h-4" />
                            Add Your First Property
                        </button>
                    </div>
                </div>
            )}

            {/* Modals */}
            <EditPropertyModal
                open={Boolean(editing)}
                initial={editing}
                onClose={(changed) => {
                    setEditing(null);
                    if (changed) refetch();
                }}
            />
            <ConfirmDeleteModal
                open={Boolean(deletingState)}
                property={deletingState}
                onClose={(deleted) => {
                    setDeleting(null);
                    if (deleted) refetch();
                }}
            />
        </div>
    );
};

export default MyPropertyListing;
