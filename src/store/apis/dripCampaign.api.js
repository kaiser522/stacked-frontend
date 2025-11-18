import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const dripCampaignApi = createApi({
  reducerPath: "dripCampaignApi",
  baseQuery,
  tagTypes: ["Campaign", "Enrollment", "PlanInfo"],
  endpoints: (builder) => ({
    // Get user's plan info for email automation
    getPlanInfo: builder.query({
      query: () => ({
        url: "/drip-campaigns/plan-info",
        method: "GET",
      }),
      providesTags: ["PlanInfo"],
    }),

    // Get all campaigns
    getCampaigns: builder.query({
      query: (filters = {}) => ({
        url: "/drip-campaigns/campaigns",
        method: "GET",
        params: filters,
      }),
      providesTags: ["Campaign"],
    }),

    // Get single campaign
    getCampaign: builder.query({
      query: (id) => ({
        url: `/drip-campaigns/campaigns/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Campaign", id }],
    }),

    // Create campaign
    createCampaign: builder.mutation({
      query: (campaignData) => ({
        url: "/drip-campaigns/campaigns",
        method: "POST",
        body: campaignData,
      }),
      invalidatesTags: ["Campaign"],
    }),

    // Update campaign
    updateCampaign: builder.mutation({
      query: ({ id, ...campaignData }) => ({
        url: `/drip-campaigns/campaigns/${id}`,
        method: "PUT",
        body: campaignData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Campaign", id },
        "Campaign",
      ],
    }),

    // Delete campaign
    deleteCampaign: builder.mutation({
      query: (id) => ({
        url: `/drip-campaigns/campaigns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Campaign"],
    }),

    // Enroll client manually
    enrollClient: builder.mutation({
      query: (enrollmentData) => ({
        url: "/drip-campaigns/enroll",
        method: "POST",
        body: enrollmentData,
      }),
      invalidatesTags: ["Enrollment", "Campaign"],
    }),

    // Auto-enroll client (Pro plan only)
    autoEnrollClient: builder.mutation({
      query: (enrollmentData) => ({
        url: "/drip-campaigns/enroll/auto",
        method: "POST",
        body: enrollmentData,
      }),
      invalidatesTags: ["Enrollment", "Campaign"],
    }),

    // Get campaign enrollments
    getCampaignEnrollments: builder.query({
      query: (campaignId) => ({
        url: `/drip-campaigns/campaigns/${campaignId}/enrollments`,
        method: "GET",
      }),
      providesTags: (result, error, campaignId) => [
        { type: "Enrollment", id: campaignId },
      ],
    }),

    // Update enrollment status
    updateEnrollmentStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/drip-campaigns/enrollments/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Enrollment"],
    }),
  }),
});

export const {
  useGetPlanInfoQuery,
  useGetCampaignsQuery,
  useGetCampaignQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
  useEnrollClientMutation,
  useAutoEnrollClientMutation,
  useGetCampaignEnrollmentsQuery,
  useUpdateEnrollmentStatusMutation,
} = dripCampaignApi;

