// // store/apis/properties.api.js
// import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "../api.config";

// export const propertiesApi = createApi({
//   reducerPath: "propertiesApi",
//   baseQuery,
//   tagTypes: ["Property", "PropertyStats"],
//   endpoints: (build) => ({
//     // Get all properties with filters and pagination
//     getAllProperties: build.query({
//       query: ({
//         status,
//         type,
//         page = 1,
//         limit = 10,
//         search = "",
//         minPrice,
//         maxPrice,
//         minBeds,
//         maxBeds,
//         sortBy = "createdAt",
//         sortOrder = "desc"
//       } = {}) => {
//         const params = new URLSearchParams();

//         if (status) params.append('status', status);
//         if (type) params.append('type', type);
//         if (page) params.append('page', page.toString());
//         if (limit) params.append('limit', limit.toString());
//         if (search) params.append('search', search);
//         if (minPrice) params.append('minPrice', minPrice.toString());
//         if (maxPrice) params.append('maxPrice', maxPrice.toString());
//         if (minBeds) params.append('minBeds', minBeds.toString());
//         if (maxBeds) params.append('maxBeds', maxBeds.toString());
//         if (sortBy) params.append('sortBy', sortBy);
//         if (sortOrder) params.append('sortOrder', sortOrder);

//         return {
//           url: `/properties?${params.toString()}`,
//           method: "GET",
//         };
//       },
//       providesTags: ["Property"],
//     }),

//     // Get property by ID
//     getPropertyById: build.query({
//       query: (id) => ({
//         url: `/properties/${id}`,
//         method: "GET",
//       }),
//       providesTags: (result, error, id) => [{ type: "Property", id }],
//     }),

//     // Toggle saved status
//     toggleSavedProperty: build.mutation({
//       query: (id) => ({
//         url: `/properties/${id}/toggle-saved`,
//         method: "PATCH",
//       }),
//       invalidatesTags: ["Property"],
//     }),

//     // Get property statistics
//     getPropertyStats: build.query({
//       query: () => ({
//         url: "/properties/stats/overview",
//         method: "GET",
//       }),
//       providesTags: ["PropertyStats"],
//     }),

//     // Get saved properties
//     getSavedProperties: build.query({
//       query: ({ page = 1, limit = 10 } = {}) => ({
//         url: "/properties/saved",
//         method: "GET",
//         params: { page, limit },
//       }),
//       providesTags: ["Property"],
//     }),
//   }),
// });

// export const {
//   useGetAllPropertiesQuery,
//   useGetPropertyByIdQuery,
//   useToggleSavedPropertyMutation,
//   useGetPropertyStatsQuery,
//   useGetSavedPropertiesQuery,
// } = propertiesApi;

// store/apis/properties.api.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const propertiesApi = createApi({
  reducerPath: "propertiesApi",
  baseQuery,
  tagTypes: ["Property", "PropertyStats"],
  endpoints: (build) => ({
    // Get all properties with filters and pagination
    getAllProperties: build.query({
      query: ({
        agentId,
        status,
        type,
        page = 1,
        limit = 10,
        search = "",
        minPrice,
        maxPrice,
        minBeds,
        maxBeds,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = {}) => {
        const params = new URLSearchParams();

        if (agentId) params.append("agentId", agentId);
        if (status) params.append("status", status);
        if (type) params.append("type", type);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (minPrice !== undefined) params.append("minPrice", String(minPrice));
        if (maxPrice !== undefined) params.append("maxPrice", String(maxPrice));
        if (minBeds !== undefined) params.append("minBeds", String(minBeds));
        if (maxBeds !== undefined) params.append("maxBeds", String(maxBeds));
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);

        return {
          url: `/properties?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Property"],
    }),

    // Get property by ID
    getPropertyById: build.query({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Property", id }],
    }),

    // Toggle saved status
    toggleSavedProperty: build.mutation({
      query: (id) => ({
        url: `/properties/${id}/toggle-saved`,
        method: "PATCH",
      }),
      invalidatesTags: ["Property"],
    }),

    // Update property (PUT /properties/:id)
    updateProperty: build.mutation({
      query: ({ id, body }) => ({
        url: `/properties/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        "Property",
        { type: "Property", id },
      ],
    }),

    // Delete property (DELETE /properties/:id)
    deleteProperty: build.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, id) => [
        "Property",
        { type: "Property", id },
      ],
    }),

    // Get property statistics
    getPropertyStats: build.query({
      query: () => ({
        url: "/properties/stats/overview",
        method: "GET",
      }),
      providesTags: ["PropertyStats"],
    }),

    // Get saved properties
    getSavedProperties: build.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: "/properties/saved",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Property"],
    }),

    // Get properties by Agent ID
    getPropertiesByAgentId: build.query({
      query: ({
        agentId,
        status,
        type,
        page = 1,
        limit = 10,
        search = "",
        minPrice,
        maxPrice,
        minBeds,
        maxBeds,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = {}) => {
        const params = new URLSearchParams();

        if (status) params.append("status", status);
        if (type) params.append("type", type);
        if (page) params.append("page", String(page));
        if (limit) params.append("limit", String(limit));
        if (search) params.append("search", search);
        if (minPrice !== undefined) params.append("minPrice", String(minPrice));
        if (maxPrice !== undefined) params.append("maxPrice", String(maxPrice));
        if (minBeds !== undefined) params.append("minBeds", String(minBeds));
        if (maxBeds !== undefined) params.append("maxBeds", String(maxBeds));
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);

        return {
          url: `/properties/agent/${agentId}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Property"],
    }),

    // Create property (POST /properties)
    createProperty: build.mutation({
      query: (body) => ({
        url: "/properties",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Property"],
    }),

    // Upload properties from CSV (POST /properties/upload-csv)
    uploadPropertiesFromCSV: build.mutation({
      query: (formData) => ({
        url: "/properties/upload-csv",
        method: "POST",
        body: formData,
        // Don't set Content-Type header - let browser set it with boundary for FormData
        formData: true,
      }),
      invalidatesTags: ["Property", "PropertyStats"],
    }),
  }),
});

export const {
  useGetAllPropertiesQuery,
  useGetPropertyByIdQuery,
  useToggleSavedPropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useGetPropertyStatsQuery,
  useGetSavedPropertiesQuery,
  useGetPropertiesByAgentIdQuery,
  useCreatePropertyMutation,
  useUploadPropertiesFromCSVMutation,
} = propertiesApi;
