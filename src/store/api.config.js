import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getStorage } from "../utils/localStorage";

export const apiBaseUrl = import.meta.env.VITE_API_URL || "https://stacked-be-by-upmotion-5pol.onrender.com/api/v1";

export const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders: (headers) => {
    const userToken = getStorage("__login_user_token__");
    if (userToken) {
      headers.set("authorization", `Bearer ${userToken}`);
    }
    return headers;
  },
});
