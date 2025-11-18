import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const notesApi = createApi({
    reducerPath: "notesApi",
    baseQuery,
    tagTypes: ["Note", "PropertyNotes"],
    // Optimized caching configuration to prevent unnecessary API calls
    endpoints: (build) => ({
        // Create a new note
        createNote: build.mutation({
            query: (noteData) => ({
                url: "/notes",
                method: "POST",
                body: noteData,
            }),
            invalidatesTags: (result, error, { propertyId }) => [
                { type: "PropertyNotes", id: propertyId }
            ],
        }),

        // Get all notes for a specific property
        getPropertyNotes: build.query({
            query: (propertyId) => ({
                url: `/notes/property/${propertyId}`,
                method: "GET",
            }),
            providesTags: (result, error, propertyId) => [
                { type: "PropertyNotes", id: propertyId }
            ],
            // Add caching configuration to prevent unnecessary requests
            keepUnusedDataFor: 300, // Keep data for 5 minutes
            refetchOnMountOrArgChange: false, // Don't refetch on mount if data exists
            refetchOnFocus: false, // Don't refetch when window regains focus
        }),

        // Get a specific note
        getNote: build.query({
            query: (noteId) => ({
                url: `/notes/${noteId}`,
                method: "GET",
            }),
            providesTags: (result, error, noteId) => [
                { type: "Note", id: noteId }
            ],
        }),

        // Update a note
        updateNote: build.mutation({
            query: ({ noteId, ...updateData }) => ({
                url: `/notes/${noteId}`,
                method: "PUT",
                body: updateData,
            }),
            invalidatesTags: (result, error, { noteId, propertyId }) => [
                { type: "PropertyNotes", id: propertyId }
            ],
        }),

        // Delete a note
        deleteNote: build.mutation({
            query: ({ noteId, propertyId }) => ({
                url: `/notes/${noteId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { propertyId }) => [
                { type: "PropertyNotes", id: propertyId }
            ],
        }),

        // Get all notes for the authenticated user
        getUserNotes: build.query({
            query: (params = {}) => ({
                url: "/notes/user/all",
                method: "GET",
                params,
            }),
            providesTags: ["Note"],
        }),
    }),
});

export const {
    useCreateNoteMutation,
    useGetPropertyNotesQuery,
    useGetNoteQuery,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
    useGetUserNotesQuery,
} = notesApi;
