/**
 * RentCast API Service
 * 
 * Integrates RentCast API for live property listings
 * Supports: for sale, for rent, and off-market properties
 * 
 * API Plan: $74/month (1,000 API calls/month)
 * Cache layer included to minimize API calls
 */

const RENTCAST_API_BASE = 'https://api.rentcast.io/v1';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// In-memory cache for API responses
const cache = new Map();

/**
 * Get API key from environment variables
 */
const getApiKey = () => {
  const apiKey = import.meta.env.VITE_RENTCAST_API_KEY;
  if (!apiKey) {
    console.warn('RENTCAST_API_KEY not found in environment variables');
    return null;
  }
  return apiKey;
};

/**
 * Generate cache key from request parameters
 */
const getCacheKey = (endpoint, params) => {
  const paramString = JSON.stringify(params);
  return `${endpoint}:${paramString}`;
};

/**
 * Check if cached data is still valid
 */
const isCacheValid = (cachedData) => {
  if (!cachedData) return false;
  const now = Date.now();
  return (now - cachedData.timestamp) < CACHE_DURATION;
};

/**
 * Make API request to RentCast
 */
const makeRentCastRequest = async (endpoint, params = {}) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('RentCast API key not configured');
  }

  // Check cache first
  const cacheKey = getCacheKey(endpoint, params);
  const cached = cache.get(cacheKey);
  if (isCacheValid(cached)) {
    return cached.data;
  }

  try {
    const queryParams = new URLSearchParams({
      ...params,
    });

    const url = `${RENTCAST_API_BASE}${endpoint}?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `RentCast API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Cache the response
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    console.error('RentCast API error:', error);
    throw error;
  }
};

/**
 * Transform RentCast property to our format
 */
const transformRentCastProperty = (rentCastProp) => {
  return {
    id: rentCastProp.id?.toString(),
    _id: rentCastProp.id?.toString(),
    address: rentCastProp.formattedAddress || `${rentCastProp.addressLine1 || ''}, ${rentCastProp.city || ''}, ${rentCastProp.state || ''} ${rentCastProp.zipCode || ''}`.trim(),
    city: rentCastProp.city || '',
    state: rentCastProp.state || '',
    zipCode: rentCastProp.zipCode || '',
    neighborhood: rentCastProp.neighborhood || '',
    price: rentCastProp.price || 0,
    beds: rentCastProp.bedrooms || 0,
    baths: rentCastProp.bathrooms || 0,
    sqft: rentCastProp.squareFootage || 0,
    lotSize: rentCastProp.lotSize || '',
    yearBuilt: rentCastProp.yearBuilt || null,
    type: rentCastProp.propertyType || 'Unknown',
    status: rentCastProp.listingStatus === 'for_sale' ? 'For Sale' : 
            rentCastProp.listingStatus === 'for_rent' ? 'For Rent' : 
            rentCastProp.listingStatus === 'off_market' ? 'Off Market' : 
            rentCastProp.status || 'Unknown',
    description: rentCastProp.description || '',
    images: rentCastProp.photos || [],
    image: rentCastProp.photos?.[0] || rentCastProp.thumbnail || null,
    coordinates: rentCastProp.latitude && rentCastProp.longitude ? {
      lat: rentCastProp.latitude,
      lng: rentCastProp.longitude,
    } : null,
    latitude: rentCastProp.latitude,
    longitude: rentCastProp.longitude,
    pricePerSqft: rentCastProp.pricePerSquareFoot || null,
    daysOnMarket: rentCastProp.daysOnMarket || 0,
    views: rentCastProp.views || 0,
    // Additional RentCast fields
    rentCastId: rentCastProp.id,
    listingStatus: rentCastProp.listingStatus,
    createdAt: rentCastProp.createdDate || new Date().toISOString(),
    updatedAt: rentCastProp.lastSeen || new Date().toISOString(),
  };
};

/**
 * Search properties using RentCast API
 * 
 * @param {Object} params - Search parameters
 * @param {string} params.city - City name
 * @param {string} params.state - State code (e.g., 'CA')
 * @param {string} params.zipCode - ZIP code
 * @param {string} params.status - 'for_sale', 'for_rent', or 'off_market'
 * @param {number} params.minPrice - Minimum price
 * @param {number} params.maxPrice - Maximum price
 * @param {number} params.minBeds - Minimum bedrooms
 * @param {number} params.maxBeds - Maximum bedrooms
 * @param {number} params.minBaths - Minimum bathrooms
 * @param {number} params.limit - Number of results (max 100)
 * @param {number} params.offset - Pagination offset
 */
export const searchRentCastProperties = async (params = {}) => {
  try {
    const {
      city,
      state,
      zipCode,
      status = 'for_sale', // Default to for_sale
      minPrice,
      maxPrice,
      minBeds,
      maxBeds,
      minBaths,
      limit = 50,
      offset = 0,
      propertyType,
    } = params;

    // Build RentCast API parameters
    const rentCastParams = {
      limit: Math.min(limit, 100), // RentCast max is 100
      offset,
    };

    // Add location filters
    if (city) rentCastParams.city = city;
    if (state) rentCastParams.state = state;
    if (zipCode) rentCastParams.zipCode = zipCode;

    // Add price filters
    if (minPrice) rentCastParams.minPrice = minPrice;
    if (maxPrice) rentCastParams.maxPrice = maxPrice;

    // Add bedroom filters
    if (minBeds) rentCastParams.minBedrooms = minBeds;
    if (maxBeds) rentCastParams.maxBedrooms = maxBeds;

    // Add bathroom filters
    if (minBaths) rentCastParams.minBathrooms = minBaths;

    // Add property type
    if (propertyType) rentCastParams.propertyType = propertyType;

    // Determine endpoint based on status
    let endpoint;
    switch (status) {
      case 'for_sale':
        endpoint = '/listings/sale';
        break;
      case 'for_rent':
        endpoint = '/listings/rental';
        break;
      case 'off_market':
        endpoint = '/properties';
        break;
      default:
        endpoint = '/listings/sale';
    }

    const response = await makeRentCastRequest(endpoint, rentCastParams);

    // Transform RentCast properties to our format
    const properties = Array.isArray(response) 
      ? response.map(transformRentCastProperty)
      : (response.data || response.properties || []).map(transformRentCastProperty);

    return {
      properties,
      total: response.total || properties.length,
      limit: rentCastParams.limit,
      offset: rentCastParams.offset,
    };
  } catch (error) {
    console.error('Error searching RentCast properties:', error);
    throw error;
  }
};

/**
 * Get property details by RentCast ID
 */
export const getRentCastPropertyById = async (propertyId) => {
  try {
    const response = await makeRentCastRequest(`/properties/${propertyId}`);
    return transformRentCastProperty(response);
  } catch (error) {
    console.error('Error fetching RentCast property:', error);
    throw error;
  }
};

/**
 * Clear cache (useful for testing or forced refresh)
 */
export const clearRentCastCache = () => {
  cache.clear();
};

/**
 * Get cache statistics (for monitoring)
 */
export const getCacheStats = () => {
  return {
    size: cache.size,
    entries: Array.from(cache.keys()),
  };
};

export default {
  searchRentCastProperties,
  getRentCastPropertyById,
  clearRentCastCache,
  getCacheStats,
};

