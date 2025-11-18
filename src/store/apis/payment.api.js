// apis/payment.api.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery,
  tagTypes: ['Payment', 'PaymentIntent'],
  endpoints: (build) => ({
    // Create payment intent
    createPaymentIntent: build.mutation({
      query: (data) => ({
        url: "payments/create-payment-intent",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['PaymentIntent'],
    }),

    // Confirm payment
    confirmPayment: build.mutation({
      query: (data) => ({
        url: "payments/confirm-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Payment'],
    }),

    // Get payment history
    getPaymentHistory: build.query({
      query: (params = {}) => ({
        url: "payments/history",
        method: "GET",
        params,
      }),
      providesTags: ['Payment'],
    }),

    // Get single payment details
    getPaymentDetails: build.query({
      query: (paymentId) => ({
        url: `payments/${paymentId}`,
        method: "GET",
      }),
      providesTags: (result, error, paymentId) => [
        { type: 'Payment', id: paymentId }
      ],
    }),

    // Cancel/refund payment
    refundPayment: build.mutation({
      query: ({ paymentId, ...data }) => ({
        url: `payments/${paymentId}/refund`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { paymentId }) => [
        { type: 'Payment', id: paymentId },
        'Payment'
      ],
    }),

    // Get payment methods (for saved cards, etc.)
    getPaymentMethods: build.query({
      query: () => ({
        url: "payments/methods",
        method: "GET",
      }),
      providesTags: ['PaymentMethod'],
    }),

    // Add payment method
    addPaymentMethod: build.mutation({
      query: (data) => ({
        url: "payments/methods",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['PaymentMethod'],
    }),

    // Delete payment method
    deletePaymentMethod: build.mutation({
      query: (methodId) => ({
        url: `payments/methods/${methodId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['PaymentMethod'],
    }),

    // Webhook endpoint (for handling Stripe webhooks)
    handleWebhook: build.mutation({
      query: (data) => ({
        url: "payments/webhook",
        method: "POST",
        body: data,
      }),
    }),

    // Get payment stats/analytics
    getPaymentStats: build.query({
      query: (params = {}) => ({
        url: "payments/stats",
        method: "GET",
        params,
      }),
      providesTags: ['PaymentStats'],
    }),

    // Get all subscriptions
    getSubscriptions: build.query({
      query: (params = {}) => ({
        url: "payments/subscriptions",
        method: "GET",
        params,
      }),
      providesTags: ['Subscription'],
    }),

    // Get all disputes
    getDisputes: build.query({
      query: (params = {}) => ({
        url: "payments/disputes",
        method: "GET",
        params,
      }),
      providesTags: ['Dispute'],
    }),

    // Get monthly revenue
    getMonthlyRevenue: build.query({
      query: (params = {}) => ({
        url: "payments/revenue/monthly",
        method: "GET",
        params,
      }),
      providesTags: ['PaymentStats'],
    }),

    // Get user subscription (admin only)
    getUserSubscription: build.query({
      query: (userId) => ({
        url: `payments/user/${userId}/subscription`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [
        { type: 'Subscription', id: userId }
      ],
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
  useGetPaymentHistoryQuery,
  useGetPaymentDetailsQuery,
  useRefundPaymentMutation,
  useGetPaymentMethodsQuery,
  useAddPaymentMethodMutation,
  useDeletePaymentMethodMutation,
  useHandleWebhookMutation,
  useGetPaymentStatsQuery,
  useGetSubscriptionsQuery,
  useGetDisputesQuery,
  useGetMonthlyRevenueQuery,
  useGetUserSubscriptionQuery,
} = paymentApi;