import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (build) => ({
    // send affiliate email
    sendAffiliateEmail: build.mutation({
      query: (data) => ({
        url: "clients/send-affiliate-email",
        method: "POST",
        body: data,
      }),
    }),

    // fetch real estate users (agents)
    getRealEstateUsers: build.query({
      query: () => ({
        url: "/users/real-estate",
        method: "GET",
      }),
    }),

    // update goal progress
    updateGoalProgress: build.mutation({
      query: ({ userId, goalProgress }) => ({
        url: `/users/${userId}/goal-progress`,
        method: "PUT",
        body: { goalProgress },
      }),
    }),

    // Get admin stats (total users, active users, etc.)
    getAdminStats: build.query({
      query: () => ({
        url: "/users/admin/stats",
        method: "GET",
      }),
    }),

    // Get all users (for admin)
    getAllUsers: build.query({
      query: (params = {}) => ({
        url: "/users",
        method: "GET",
        params: {
          limit: 1000,
          ...params,
        },
      }),
    }),

    // Update user profile
    updateUserProfile: build.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSendAffiliateEmailMutation,
  useGetRealEstateUsersQuery,
  useUpdateGoalProgressMutation,
  useGetAdminStatsQuery,
  useGetAllUsersQuery,
  useUpdateUserProfileMutation,
} = userApi;
