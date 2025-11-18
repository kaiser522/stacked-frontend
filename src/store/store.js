// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import plansReducer from "./slices/plans.slice";
import userReducer from "./slices/user.slice";
import { userApi } from "./apis/user.api";
import { authApi } from "./apis/auth.api";
import { paymentApi } from "./apis/payment.api";
import { plansApi } from "./apis/plans.api";
import { clientsApi } from "./apis/clients.api";
import { propertiesApi } from "./apis/properties.api";
import { emailTemplateApi } from "./apis/emailTemplate.api";
import { favoritesApi } from "./apis/favorites.api";
import { notesApi } from "./apis/notes.api";
import { meetingsApi } from "./apis/meetings.api";
import { emailsApi } from "./apis/emails.api";
import { documentsApi } from "./apis/documents.api";
import { dripCampaignApi } from "./apis/dripCampaign.api";
import { affiliateApi } from "./apis/affiliate.api";


const middlewares = [
  userApi.middleware,
  authApi.middleware,
  paymentApi.middleware,
  plansApi.middleware,
  clientsApi.middleware,
  propertiesApi.middleware,
  emailTemplateApi.middleware,
  favoritesApi.middleware,
  notesApi.middleware,
    meetingsApi.middleware,
    emailsApi.middleware,
    documentsApi.middleware,
    dripCampaignApi.middleware,
    affiliateApi.middleware,
];

export const store = configureStore({
  reducer: {
    plans: plansReducer,
    users: userReducer,

    // API reducers
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [plansApi.reducerPath]: plansApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    [emailTemplateApi.reducerPath]: emailTemplateApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [meetingsApi.reducerPath]: meetingsApi.reducer,
    [emailsApi.reducerPath]: emailsApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    [dripCampaignApi.reducerPath]: dripCampaignApi.reducer,
    [affiliateApi.reducerPath]: affiliateApi.reducer,

  },

  // Middlewares
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});
