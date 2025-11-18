import { useState, useMemo, useEffect } from "react";
import {
    Search,
    MapPin,
    Bed,
    Bath,
    Square,
    Heart,
    Grid,
    List,
    Plus,
    SlidersHorizontal,
    X,
    Eye,
    Calendar,
    StickyNote,
} from "lucide-react";
import { Link } from "react-router-dom";
import PropertesHeader from "../../components/RealEstate/properties/PorpertiesHeader";
import { useGetAllPropertiesQuery } from "../../store/apis/properties.api";
import {
    useToggleFavoriteMutation,
    useGetFavoritesByUserIdQuery,
} from "../../store/apis/favorites.api";
import PropertyNotes from "../../components/RealEstate/PropertyNotes";
import { searchRentCastProperties } from "../../services/propertyService";

/* --------------------------- helpers --------------------------- */

function formatPriceUSD(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

/* ======================= MAIN COMPONENT ======================== */

const AllProperties = ({
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
    onPropertyClick = () => { },
    showNotesForProperty = null,
    setShowNotesForProperty = () => { }
}) => {
    const user = useMemo(() => {
        try {
            const raw = localStorage.getItem("__user__");
            if (!raw) return undefined;
            const parsed = JSON.parse(raw);
            return parsed ?? undefined;
        } catch {
            return undefined;
        }
    }, []);

    const userId = user?.id || user?._id;
    const userRole = user?.role;

    // State for RentCast properties
    const [rentCastProperties, setRentCastProperties] = useState([]);
    const [isLoadingRentCast, setIsLoadingRentCast] = useState(false);
    const [useLiveData, setUseLiveData] = useState(true); // Toggle for live data

    // Load properties from backend
    const {
        data: propertiesData,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetAllPropertiesQuery({
        agentId: userId,
        status: filters.status || undefined,
        type: filters.propertyType || undefined,
        minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
        minBeds: filters.beds ? parseInt(filters.beds) : undefined,
        limit: 1000,
        page: 1,
    });

    // Load RentCast properties when filters change
    useEffect(() => {
        const loadRentCastProperties = async () => {
            if (!useLiveData) return;

            // Extract location from search query or use defaults
            const searchLower = searchQuery.toLowerCase().trim();
            const zipMatch = searchLower.match(/\b\d{5}\b/);
            const cityMatch = searchLower.match(/\b([a-z\s]+),?\s*([a-z]{2})\b/i);

            const rentCastParams = {
                status: filters.status === 'For Sale' ? 'for_sale' : 
                       filters.status === 'For Rent' ? 'for_rent' : 
                       filters.status === 'Off Market' ? 'off_market' : 'for_sale',
                limit: 50,
            };

            if (zipMatch) {
                rentCastParams.zipCode = zipMatch[0];
            } else if (cityMatch) {
                rentCastParams.city = cityMatch[1].trim();
                rentCastParams.state = cityMatch[2].toUpperCase();
            } else if (searchQuery) {
                // Try to extract city from search
                rentCastParams.city = searchQuery.split(',')[0].trim();
            }

            if (filters.minPrice) rentCastParams.minPrice = parseInt(filters.minPrice);
            if (filters.maxPrice) rentCastParams.maxPrice = parseInt(filters.maxPrice);
            if (filters.beds) rentCastParams.minBeds = parseInt(filters.beds);
            if (filters.baths) rentCastParams.minBaths = parseFloat(filters.baths);
            if (filters.propertyType) rentCastParams.propertyType = filters.propertyType;

            try {
                setIsLoadingRentCast(true);
                const result = await searchRentCastProperties(rentCastParams);
                setRentCastProperties(result.properties || []);
            } catch (err) {
                console.error('Error loading RentCast properties:', err);
                // Fallback to empty array if RentCast fails
                setRentCastProperties([]);
            } finally {
                setIsLoadingRentCast(false);
            }
        };

        // Debounce RentCast calls
        const timeoutId = setTimeout(() => {
            loadRentCastProperties();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, filters, useLiveData]);

    // Favorites from server (favorites.api.js transformResponse returns { favorites, favoritedIds })
    const { data: favData } = useGetFavoritesByUserIdQuery(userId, {
        skip: !userId,
    });
    const serverFavIds = useMemo(() => {
        const ids = favData?.favoritedIds || [];
        return new Set(ids.map(String));
    }, [favData]);

    // Optimistic overrides: Map<propertyId, boolean>
    const [optimistic, setOptimistic] = useState(new Map());

    const [toggleFavorite] = useToggleFavoriteMutation();

    // Combine backend properties with RentCast properties
    const backendProperties = propertiesData?.data?.properties || [];
    const allProperties = useLiveData && rentCastProperties.length > 0
        ? [...rentCastProperties, ...backendProperties]
        : backendProperties;
    
    const properties = allProperties;

    const handleSearch = (value) => setSearchQuery(value);

    const effectiveIsFavorited = (pid) => {
        if (optimistic.has(pid)) return optimistic.get(pid);
        return serverFavIds.has(pid);
    };

    const handleToggleSaved = async (propertyId) => {
        if (!userId) return;

        // Compute current effective state and the intended next state
        const current = effectiveIsFavorited(propertyId);
        const next = !current;

        // Set optimistic override
        setOptimistic((prev) => {
            const m = new Map(prev);
            m.set(propertyId, next);
            return m;
        });

        try {
            await toggleFavorite({ userId, propertyId }).unwrap();
            // Drop override after server updates cache (RTKQ invalidation refetches)
            setOptimistic((prev) => {
                const m = new Map(prev);
                m.delete(propertyId);
                return m;
            });
        } catch (e) {
            // Revert on error
            setOptimistic((prev) => {
                const m = new Map(prev);
                m.delete(propertyId);
                return m;
            });
            console.error("Failed to toggle favorite:", e);
        }
    };

    const filteredProperties = useMemo(() => {
        if (!properties) return [];

        let filtered = properties.filter((property) => {
            // Search filter
            const searchLower = searchQuery.toLowerCase().trim();
            const matchesSearch = !searchQuery ||
                property.address?.toLowerCase().includes(searchLower) ||
                property.city?.toLowerCase().includes(searchLower) ||
                property.state?.toLowerCase().includes(searchLower) ||
                property.zipCode?.toLowerCase().includes(searchLower) ||
                property.neighborhood?.toLowerCase().includes(searchLower) ||
                property.type?.toLowerCase().includes(searchLower) ||
                property.status?.toLowerCase().includes(searchLower);

            // Baths filter
            const matchesBaths = !filters.baths || property.baths >= parseFloat(filters.baths);

            // Price filters
            const matchesMinPrice = !filters.minPrice || property.price >= parseInt(filters.minPrice);
            const matchesMaxPrice = !filters.maxPrice || property.price <= parseInt(filters.maxPrice);

            // Beds filter
            const matchesBeds = !filters.beds || property.beds >= parseFloat(filters.beds);

            // Property type filter
            const matchesPropertyType = !filters.propertyType || property.type === filters.propertyType;

            // Status filter
            const matchesStatus = !filters.status || property.status === filters.status;

            return matchesSearch && matchesBaths && matchesMinPrice && matchesMaxPrice &&
                matchesBeds && matchesPropertyType && matchesStatus;
        });

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                case "newest":
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case "sqft-desc":
                    return (b.sqft || 0) - (a.sqft || 0);
                case "price-per-sqft": {
                    const aPricePerSqft = a.pricePerSqft || (a.price / (a.sqft || 1));
                    const bPricePerSqft = b.pricePerSqft || (b.price / (b.sqft || 1));
                    return aPricePerSqft - bPricePerSqft;
                }
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

        return filtered;
    }, [properties, searchQuery, filters, sortBy]);

    if (isLoading || isLoadingRentCast) {
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
            <PropertesHeader
                properties={properties}
                filteredProperties={filteredProperties}
                totalCount={filteredProperties.length}
                onAddClick={() => console.log("Navigate to Add Property page")}
                onRefresh={refetch}
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
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`px-4 py-2 border border-[var(--primary-color)]/30 rounded-lg flex items-center gap-2 transition-colors ${
                                    showFilters
                                        ? "bg-[var(--primary-color)] text-white"
                                        : "text-gray-300 hover:bg-[var(--primary-color)]/20"
                                }`}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="text-gray-300 px-4 py-2 border border-[var(--primary-color)]/30 rounded-lg focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none bg-[var(--medium-dark)]"
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
                                        : "text-gray-300 hover:bg-[var(--primary-color)]/20"
                                        }`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 border-l border-[var(--primary-color)]/30 ${viewMode === "list"
                                        ? "bg-[var(--primary-color)] text-white"
                                        : "text-gray-300 hover:bg-[var(--primary-color)]/20"
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="mt-6 pt-6 border-t border-[var(--primary-color)]/70">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Price Range */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Min Price
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.minPrice || ""}
                                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                        className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-300 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Max Price
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.maxPrice || ""}
                                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                        className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-300 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                    />
                                </div>

                                {/* Beds */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Bedrooms
                                    </label>
                                    <select
                                        value={filters.beds || ""}
                                        onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
                                        className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-300 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                    >
                                        <option value="">Any</option>
                                        <option value="1">1+</option>
                                        <option value="2">2+</option>
                                        <option value="3">3+</option>
                                        <option value="4">4+</option>
                                        <option value="5">5+</option>
                                    </select>
                                </div>

                                {/* Baths */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Bathrooms
                                    </label>
                                    <select
                                        value={filters.baths || ""}
                                        onChange={(e) => setFilters({ ...filters, baths: e.target.value })}
                                        className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-300 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                    >
                                        <option value="">Any</option>
                                        <option value="1">1+</option>
                                        <option value="1.5">1.5+</option>
                                        <option value="2">2+</option>
                                        <option value="2.5">2.5+</option>
                                        <option value="3">3+</option>
                                        <option value="4">4+</option>
                                    </select>
                                </div>

                                {/* Property Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Property Type
                                    </label>
                                    <select
                                        value={filters.propertyType || ""}
                                        onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                                        className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-300 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                    >
                                        <option value="">All Types</option>
                                        <option value="Single Family">Single Family</option>
                                        <option value="Condo">Condo</option>
                                        <option value="Townhouse">Townhouse</option>
                                        <option value="Multi-Family">Multi-Family</option>
                                        <option value="Land">Land</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={filters.status || ""}
                                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-300 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                    >
                                        <option value="">All Status</option>
                                        <option value="For Sale">For Sale</option>
                                        <option value="For Rent">For Rent</option>
                                        <option value="Off Market">Off Market</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <button
                                    onClick={() => setUseLiveData(!useLiveData)}
                                    className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                                        useLiveData
                                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                            : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                                    }`}
                                >
                                    {useLiveData ? "✓ Live Data Enabled" : "Live Data Disabled"}
                                </button>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-gray-300 hover:text-[var(--primary-color)] cursor-pointer flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-[var(--primary-color)]/10 transition-colors"
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
                    const pid = String(property.id || property._id);
                    const isFavorited = effectiveIsFavorited(pid);

                    return (
                        <Link
                            key={pid}
                            to={`/realestate/properties/${pid}`}
                            className={`relative bg-[var(--medium-dark)] rounded-xl shadow-sm border border-[var(--primary-color)]/30 hover:shadow-lg transition-all duration-200 cursor-pointer group overflow-hidden ${viewMode === "list" ? "flex" : ""
                                }`}
                        >
                            {/* Action buttons */}
                            <div
                                className="absolute top-3 right-3 z-30 flex gap-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowNotesForProperty(pid);
                                    }}
                                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                    aria-label="View notes"
                                >
                                    <StickyNote className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleToggleSaved(pid);
                                    }}
                                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                    aria-label="Toggle favorite"
                                >
                                    <Heart
                                        className={`w-4 h-4 ${isFavorited
                                            ? "fill-red-500 text-red-500"
                                            : "text-gray-600"
                                            }`}
                                    />
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
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleToggleSaved(pid);
                                                }}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                                                aria-label="Toggle favorite"
                                            >
                                                <Heart
                                                    className={`w-4 h-4 ${isFavorited
                                                        ? "fill-red-500 text-red-500"
                                                        : "text-gray-500"
                                                        }`}
                                                />
                                            </button>
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
        </div>
    );
};

export default AllProperties;
