// store/apis/favorites.api.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery,
  tagTypes: ["Favorite", "Property"],
  endpoints: (build) => ({
    // POST /favorites/toggle
    toggleFavorite: build.mutation({
      query: ({ userId, propertyId }) => ({
        url: "/favorites/toggle",
        method: "POST",
        body: { userId, propertyId },
      }),
      // Invalidate favorites and the specific property so UI can refresh badges or counts
      invalidatesTags: (_result, _error, { propertyId }) => [
        "Favorite",
        { type: "Property", id: propertyId },
      ],
      transformResponse: (response) => {
        // Normalizes common shape { isFavorite, favorite? }
        const data = response?.data ?? {};
        return {
          isFavorite: Boolean(data.isFavorite),
          favorite: data.favorite ?? null,
        };
      },
    }),

    // GET /favorites/user/:userId
    getFavoritesByUserId: build.query({
      query: (userId) => ({
        url: `/favorites/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Favorite"],
      transformResponse: (response) => {
        const favorites = response?.data?.favorites ?? [];
        // Returns both raw favorites and a quick lookup array of property ids
        const favoritedIds = favorites.map((f) =>
          typeof f?.propertyId === "object" ? f.propertyId?._id : f?.propertyId
        );
        return { favorites, favoritedIds };
      },
    }),
  }),
});

export const { useToggleFavoriteMutation, useGetFavoritesByUserIdQuery } =
  favoritesApi;
