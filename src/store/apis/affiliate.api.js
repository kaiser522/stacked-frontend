import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const affiliateApi = createApi({
  reducerPath: "affiliateApi",
  baseQuery,
  tagTypes: ['Affiliate', 'Payout'],
  endpoints: (build) => ({
    // Calculate eligible payout for an affiliate
    calculateEligiblePayout: build.mutation({
      query: ({ affiliateId, referrals }) => ({
        url: "affiliates/calculate-eligible-payout",
        method: "POST",
        body: { affiliateId, referrals },
      }),
    }),

    // Create Stripe Connect account for affiliate
    createConnectAccount: build.mutation({
      query: ({ affiliateId, email, country = 'US' }) => ({
        url: `affiliates/${affiliateId}/create-connect-account`,
        method: "POST",
        body: { email, country },
      }),
      invalidatesTags: ['Affiliate'],
    }),

    // Process affiliate payout
    processPayout: build.mutation({
      query: ({ affiliateId, amount, commissionIds, eligibleCommissions, stripeConnectAccountId }) => ({
        url: "affiliates/process-payout",
        method: "POST",
        body: { affiliateId, amount, commissionIds, eligibleCommissions, stripeConnectAccountId },
      }),
      invalidatesTags: ['Payout', 'Affiliate'],
    }),
  }),
});

export const {
  useCalculateEligiblePayoutMutation,
  useCreateConnectAccountMutation,
  useProcessPayoutMutation,
} = affiliateApi;

