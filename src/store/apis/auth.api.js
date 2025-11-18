import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `auth/login`,
        method: "POST",
        body: data,
      }),
    }),

    // google login or register api
    googleLogin: build.mutation({
      query: (data) => ({
        url: `auth/google-login`,
        method: "POST",
        body: data,
      }),
    }),

    signUp: build.mutation({
      query: (data) => ({
        url: `auth/signup`,
        method: "POST",
        body: data,
      }),
    }),

    checkAuth: build.query({
      query: ({type}) => ({
        url: `auth/check?type=${type}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useLazyCheckAuthQuery,
  useSignUpMutation,
} = authApi;
