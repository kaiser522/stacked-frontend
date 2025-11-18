import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const documentsApi = createApi({
    reducerPath: "documentsApi",
    baseQuery,
    tagTypes: ["Document"],
    endpoints: (build) => ({
        getAllDocuments: build.query({
            query: () => ({
                url: "/documents",
                method: "GET",
            }),
            providesTags: ["Document"],
        }),
        uploadDocument: build.mutation({
            query: (formData) => ({
                url: "/documents",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Document"],
        }),
        assignDocumentToClient: build.mutation({
            query: ({ documentId, clientId }) => ({
                url: `/documents/${documentId}/assign`,
                method: "POST",
                body: { clientId },
            }),
            invalidatesTags: ["Document"],
        }),
        unassignDocument: build.mutation({
            query: (documentId) => ({
                url: `/documents/${documentId}/unassign`,
                method: "DELETE",
            }),
            invalidatesTags: ["Document"],
        }),
        moveDocumentToTrash: build.mutation({
            query: (documentId) => ({
                url: `/documents/${documentId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Document"],
        }),
        restoreDocumentFromTrash: build.mutation({
            query: (documentId) => ({
                url: `/documents/${documentId}/restore`,
                method: "PUT",
            }),
            invalidatesTags: ["Document"],
        }),
        permanentlyDeleteDocument: build.mutation({
            query: (documentId) => ({
                url: `/documents/${documentId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Document"],
        }),
        getTrashedDocuments: build.query({
            query: () => ({
                url: "/documents/trash",
                method: "GET",
            }),
            providesTags: ["Document"],
        }),
    }),
});

export const {
    useGetAllDocumentsQuery,
    useUploadDocumentMutation,
    useAssignDocumentToClientMutation,
    useUnassignDocumentMutation,
    useMoveDocumentToTrashMutation,
    useRestoreDocumentFromTrashMutation,
    usePermanentlyDeleteDocumentMutation,
    useGetTrashedDocumentsQuery
} = documentsApi;
