import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const meetingsApi = createApi({
    reducerPath: "meetingsApi",
    baseQuery,
    tagTypes: ["Meeting"],
    endpoints: (build) => ({
        getMeetings: build.query({
            query: () => ({
                url: "/meetings",
                method: "GET",
            }),
            providesTags: ["Meeting"],
        }),

        createMeeting: build.mutation({
            query: (meeting) => ({
                url: "/meetings",
                method: "POST",
                body: meeting,
            }),
            invalidatesTags: ["Meeting"],
        }),
    }),
});

export const { useGetMeetingsQuery, useCreateMeetingMutation } = meetingsApi;
