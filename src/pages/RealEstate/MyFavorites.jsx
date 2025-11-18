import { useState, useMemo } from "react";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import MyFavoritesHeader from "../../components/RealEstate/properties/MyFavorites";
import {
    useToggleFavoriteMutation,
    useGetFavoritesByUserIdQuery,
} from "../../store/apis/favorites.api";

/* --------------------------- helpers --------------------------- */

function formatPriceUSD(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

export function getUserIdFromStorage() {
    try {
        const raw = localStorage.getItem("__user__");
        if (!raw) return undefined;
        const parsed = JSON.parse(raw);
        return parsed?.id ?? parsed?._id ?? undefined;
    } catch {
        return undefined;
    }
}

/* ======================= MAIN COMPONENT ======================== */

const MyFavorites = ({
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
    const userId = useMemo(() => getUserIdFromStorage(), []);

    // Favorites from server
    const {
        data: favoritesData,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetFavoritesByUserIdQuery(userId, { skip: !userId });

    // Mutation for toggle
    const [toggleFavorite] = useToggleFavoriteMutation();

    // Build a quick lookup Set of favorited ids from server data
    const serverFavIds = useMemo(() => {
        const favs =
            favoritesData?.data?.favorites || favoritesData?.favorites || [];
        return new Set(
            favs
                .map((f) => f?.propertyId?._id || f?.propertyId?.id || f?.propertyId)
                .filter(Boolean)
                .map(String)
        );
    }, [favoritesData]);

    // Optimistic overrides to prevent flicker: Map<propertyId, boolean>
    const [optimistic, setOptimistic] = useState(new Map());
    const effectiveIsFavorited = (pid) => {
        if (optimistic.has(pid)) return optimistic.get(pid);
        return serverFavIds.has(pid);
    };

    // Convert favorites list to an array of property objects
    const properties = useMemo(() => {
        const favs =
            favoritesData?.data?.favorites || favoritesData?.favorites || [];
        return favs.map((f) => f?.propertyId).filter(Boolean);
    }, [favoritesData]);

    const totalCount = properties.length;

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

    const handleToggleSaved = async (propertyId) => {
        if (!userId) return;
        const pid = String(propertyId);
        const next = !effectiveIsFavorited(pid);

        // optimistic override
        setOptimistic((prev) => {
            const m = new Map(prev);
            m.set(pid, next);
            return m;
        });

        try {
            await toggleFavorite({ userId, propertyId: pid }).unwrap();
            // Clear override and let server truth refresh via invalidation
            setOptimistic((prev) => {
                const m = new Map(prev);
                m.delete(pid);
                return m;
            });
            // Optionally re-fetch (in case your invalidatesTags is not enough)
            // refetch();
        } catch (e) {
            // revert
            setOptimistic((prev) => {
                const m = new Map(prev);
                m.delete(pid);
                return m;
            });
            console.error("Failed to toggle favorite:", e);
        }
    };

    // Apply search and filters to favorites
    const filteredProperties = useMemo(() => {
        const bySearch = (p) => {
            if (!searchQuery?.trim()) return true;
            const q = searchQuery.toLowerCase();
            return (
                p?.address?.toLowerCase().includes(q) ||
                String(p?.price ?? "").includes(q) ||
                p?.type?.toLowerCase().includes(q) ||
                p?.status?.toLowerCase().includes(q)
            );
        };

        const byFilters = (p) => {
            const minPrice = filters.minPrice
                ? parseInt(filters.minPrice)
                : undefined;
            const maxPrice = filters.maxPrice
                ? parseInt(filters.maxPrice)
                : undefined;
            const beds = filters.beds ? parseInt(filters.beds) : undefined;
            const baths = filters.baths ? parseFloat(filters.baths) : undefined;
            const type = filters.propertyType || undefined;
            const status = filters.status || undefined;

            if (minPrice !== undefined && p.price < minPrice) return false;
            if (maxPrice !== undefined && p.price > maxPrice) return false;
            if (beds !== undefined && p.beds < beds) return false;
            if (baths !== undefined && p.baths < baths) return false;
            if (type && p.type !== type) return false;
            if (status && p.status !== status) return false;
            return true;
        };

        const sortField = getSortByField(sortBy);
        const sortOrder = getSortOrder(sortBy);

        const arr = properties.filter((p) => bySearch(p) && byFilters(p));
        arr.sort((a, b) => {
            const av = a?.[sortField] ?? 0;
            const bv = b?.[sortField] ?? 0;
            if (av === bv) return 0;
            return sortOrder === "asc" ? av - bv : bv - av;
        });

        return arr;
    }, [properties, searchQuery, filters, sortBy]);

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
                        Error Loading Favorites
                    </h3>
                    <p className="text-red-600 mb-4">
                        {error?.data?.message || "Failed to load favorites. Try again."}
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
            <MyFavoritesHeader
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
                                placeholder="Search your favorites..."
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
                    const pid = String(property.id || property._id);
                    const isFavorited = effectiveIsFavorited(pid);

                    return (
                        <Link
                            key={pid}
                            to={`/realestate/dashboard/properties/${pid}`}
                            className={`relative bg-[var(--medium-dark)] rounded-xl shadow-sm border border-[var(--primary-color)]/30 hover:shadow-lg transition-all duration-200 cursor-pointer group overflow-hidden ${viewMode === "list" ? "flex" : ""
                                }`}
                        >
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
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleToggleSaved(pid);
                                        }}
                                        className="absolute top-3 right-12 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                        aria-label="Toggle favorite"
                                    >
                                        <Heart
                                            className={`w-4 h-4 ${isFavorited
                                                ? "fill-red-500 text-red-500"
                                                : "text-gray-600"
                                                }`}
                                        />
                                    </button>

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
                        No favorites yet
                    </h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                        Tap the heart on any listing to save it to your favorites.
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
                            Browse Properties
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyFavorites;
