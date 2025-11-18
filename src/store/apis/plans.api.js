import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const plansApi = createApi({
  reducerPath: "plansApi",
  baseQuery,
  tagTypes: ['Plan', 'Addon'],
  endpoints: (build) => ({
    // Get all plans
    getAllPlans: build.query({
      query: () => ({
        url: "plans",
        method: "GET",
      }),
      providesTags: ['Plan'],
    }),

    // Get plans by category
    getPlansByCategory: build.query({
      query: (category) => ({
        url: `plans/category/${category}`,
        method: "GET",
      }),
      providesTags: (result, error, category) => [
        { type: 'Plan', id: category }
      ],
    }),

    // Get plan by ID
    getPlanById: build.query({
      query: (id) => ({
        url: `plans/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: 'Plan', id }
      ],
    }),

    // Get all addons
    getAllAddons: build.query({
      query: () => ({
        url: "addons",
        method: "GET",
      }),
      providesTags: ['Addon'],
    }),

    // Get addons by category
    getAddonsByCategory: build.query({
      query: (category) => ({
        url: `addons/category/${category}`,
        method: "GET",
      }),
      providesTags: (result, error, category) => [
        { type: 'Addon', id: category }
      ],
    }),

    // Get addon by ID
    getAddonById: build.query({
      query: (id) => ({
        url: `addons/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: 'Addon', id }
      ],
    }),
  }),
});

export const {
  useGetAllPlansQuery,
  useGetPlansByCategoryQuery,
  useGetPlanByIdQuery,
  useGetAllAddonsQuery,
  useGetAddonsByCategoryQuery,
  useGetAddonByIdQuery,
} = plansApi;