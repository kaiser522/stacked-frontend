import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const clientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery,
  tagTypes: ["Client", "ClientStats"],
  endpoints: (build) => ({
    // Send affiliate sign-up email
    sendAffiliateSignUpEmail: build.mutation({
      query: (data) => ({
        url: "/clients/send-affiliate-email",
        method: "POST",
        body: data,
      }),
    }),

    // Create a new client
    createClient: build.mutation({
      query: (client) => ({
        url: "/clients",
        method: "POST",
        body: client,
      }),
      invalidatesTags: ["Client"],
    }),

    // Get all clients
    getAllClients: build.query({
      query: ({ status, page = 1, limit = 10, search = "" } = {}) => ({
        url: "/clients",
        method: "GET",
        params: { status, page, limit, search },
      }),
      providesTags: ["Client"],
    }),

    // Get client by ID
    getClientById: build.query({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Client", id }],
    }),

    // Update client
    updateClient: build.mutation({
      query: ({ id, ...client }) => ({
        url: `/clients/${id}`,
        method: "PUT",
        body: client,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Client", id }, "Client"],
    }),

    // Update last contact
    updateLastContact: build.mutation({
      query: (id) => ({
        url: `/clients/${id}/contact`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Client", id }, "Client"],
    }),

    // Delete client
    deleteClient: build.mutation({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),

    // Get client stats
    getClientStats: build.query({
      query: () => ({
        url: "/clients/stats/overview",
        method: "GET",
      }),
      providesTags: ["ClientStats"],
    }),
  }),
});

export const {
  useSendAffiliateSignUpEmailMutation,
  useCreateClientMutation,
  useGetAllClientsQuery,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useUpdateLastContactMutation,
  useDeleteClientMutation,
  useGetClientStatsQuery,
} = clientsApi;