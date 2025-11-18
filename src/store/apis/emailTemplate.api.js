import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const emailTemplateApi = createApi({
  reducerPath: "emailTemplateApi",
  baseQuery,
  tagTypes: ['EmailTemplate'],
  endpoints: (build) => ({
    getAllEmailTemplate: build.query({
      query: () => ({
        url: "/email-templates",
        method: "GET",
      }),
      providesTags: ['EmailTemplate'],
    }),
    sendEmailTemplate: build.mutation({
      query: (templateData) => ({
        url: "/email-templates/send",
        method: "POST",
        body: templateData
      }),
      invalidatesTags: ['EmailTemplate'],
    }),
  }),
});

export const {
  useGetAllEmailTemplateQuery,
  useSendEmailTemplateMutation
} = emailTemplateApi;