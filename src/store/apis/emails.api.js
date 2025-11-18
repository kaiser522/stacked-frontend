import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api.config";

export const emailsApi = createApi({
    reducerPath: "emailsApi",
    baseQuery,
    tagTypes: ["Emails", "EmailStats", "EmailTemplates"],
    endpoints: (builder) => ({
        // Get all emails for a team/user
        getEmails: builder.query({
            query: ({ userId, folder = "inbox", page = 1, limit = 50, search = "" }) => ({
                url: "/emails",
                method: "GET",
                params: {
                    userId,
                    folder,
                    page,
                    limit,
                    search,
                },
            }),
            providesTags: (result, error, arg) => [
                { type: "Emails", id: "LIST" },
                { type: "Emails", id: arg.folder },
            ],
            transformResponse: (response) => ({
                emails: response.data?.emails || [],
                total: response.data?.total || 0,
                unreadCount: response.data?.unreadCount || 0,
            }),
        }),

        // Get a specific email by ID
        getEmailById: builder.query({
            query: (emailId) => ({
                url: `/emails/${emailId}`,
                method: "GET",
            }),
            providesTags: (result, error, emailId) => [
                { type: "Emails", id: emailId },
            ],
        }),

        // Send a new email
        sendEmail: builder.mutation({
            query: (emailData) => ({
                url: "/emails/send",
                method: "POST",
                body: emailData,
            }),
            invalidatesTags: [
                { type: "Emails", id: "LIST" },
                { type: "Emails", id: "sent" },
            ],
        }),

        // Reply to an email
        replyToEmail: builder.mutation({
            query: ({ emailId, replyData }) => ({
                url: `/emails/${emailId}/reply`,
                method: "POST",
                body: replyData,
            }),
            invalidatesTags: [
                { type: "Emails", id: "LIST" },
                { type: "Emails", id: "sent" },
                { type: "Emails", id: "inbox" },
            ],
        }),

        // Forward an email
        forwardEmail: builder.mutation({
            query: ({ emailId, forwardData }) => ({
                url: `/emails/${emailId}/forward`,
                method: "POST",
                body: forwardData,
            }),
            invalidatesTags: [
                { type: "Emails", id: "LIST" },
                { type: "Emails", id: "sent" },
            ],
        }),

        // Mark email as read/unread
        markEmailAsRead: builder.mutation({
            query: ({ emailId, isRead }) => ({
                url: `/emails/${emailId}/read`,
                method: "PATCH",
                body: { isRead },
            }),
            invalidatesTags: (result, error, { emailId }) => [
                { type: "Emails", id: "LIST" },
                { type: "Emails", id: "inbox" },
                { type: "Emails", id: emailId },
            ],
        }),

        // Star/unstar an email
        toggleEmailStar: builder.mutation({
            query: ({ emailId, isStarred }) => ({
                url: `/emails/${emailId}/star`,
                method: "PATCH",
                body: { isStarred },
            }),
            invalidatesTags: (result, error, { emailId }) => [
                { type: "Emails", id: "LIST" },
                { type: "Emails", id: "starred" },
                { type: "Emails", id: emailId },
            ],
        }),

        // Move email to folder (archive, trash, etc.)
        moveEmailToFolder: builder.mutation({
            query: ({ emailId, folder }) => ({
                url: `/emails/${emailId}/move`,
                method: "PATCH",
                body: { folder },
            }),
            invalidatesTags: [
                { type: "Emails", id: "LIST" },
                { type: "Emails", id: "inbox" },
                { type: "Emails", id: "sent" },
                { type: "Emails", id: "archive" },
                { type: "Emails", id: "trash" },
                { type: "Emails", id: "starred" },
            ],
        }),

        // Delete email permanently
        deleteEmail: builder.mutation({
            query: (emailId) => ({
                url: `/emails/${emailId}`,
                method: "DELETE",
            }),
            invalidatesTags: [
                { type: "Emails", id: "LIST" },
                { type: "Emails", id: "trash" },
            ],
        }),

        // Bulk operations
        bulkMarkAsRead: builder.mutation({
            query: ({ emailIds, isRead }) => ({
                url: "/emails/bulk/read",
                method: "PATCH",
                body: { emailIds, isRead },
            }),
            invalidatesTags: [
                { type: "Emails", id: "LIST" },
                { type: "Emails", id: "inbox" },
            ],
        }),

        bulkMoveToFolder: builder.mutation({
            query: ({ emailIds, folder }) => ({
                url: "/emails/bulk/move",
                method: "PATCH",
                body: { emailIds, folder },
            }),
            invalidatesTags: [
                { type: "Emails", id: "LIST" },
                { type: "Emails", id: "inbox" },
                { type: "Emails", id: "sent" },
                { type: "Emails", id: "archive" },
                { type: "Emails", id: "trash" },
                { type: "Emails", id: "starred" },
            ],
        }),

        bulkDelete: builder.mutation({
            query: ({ emailIds }) => ({
                url: "/emails/bulk/delete",
                method: "DELETE",
                body: { emailIds },
            }),
            invalidatesTags: [
                { type: "Emails", id: "LIST" },
                { type: "Emails", id: "trash" },
            ],
        }),

        // Get email statistics
        getEmailStats: builder.query({
            query: ({ userId, dateRange = "30d" }) => ({
                url: "/emails/stats",
                method: "GET",
                params: {
                    userId,
                    dateRange,
                },
            }),
            providesTags: [{ type: "EmailStats", id: "LIST" }],
        }),

        // Get email templates
        getEmailTemplates: builder.query({
            query: ({ userId, category = "all" }) => ({
                url: "/emails/templates",
                method: "GET",
                params: {
                    userId,
                    category,
                },
            }),
            providesTags: [{ type: "EmailTemplates", id: "LIST" }],
        }),

        // Save email template
        saveEmailTemplate: builder.mutation({
            query: (templateData) => ({
                url: "/emails/templates",
                method: "POST",
                body: templateData,
            }),
            invalidatesTags: [{ type: "EmailTemplates", id: "LIST" }],
        }),

        // Update email template
        updateEmailTemplate: builder.mutation({
            query: ({ templateId, templateData }) => ({
                url: `/emails/templates/${templateId}`,
                method: "PUT",
                body: templateData,
            }),
            invalidatesTags: (result, error, { templateId }) => [
                { type: "EmailTemplates", id: "LIST" },
                { type: "EmailTemplates", id: templateId },
            ],
        }),

        // Delete email template
        deleteEmailTemplate: builder.mutation({
            query: (templateId) => ({
                url: `/emails/templates/${templateId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, templateId) => [
                { type: "EmailTemplates", id: "LIST" },
                { type: "EmailTemplates", id: templateId },
            ],
        }),

        // Gmail-specific endpoints
        // Get Gmail inbox (for admin customer service)
        getGmailInbox: builder.query({
            query: ({ folder = "inbox", page = 1, limit = 50, search = "", q = "" }) => ({
                url: "/emails/gmail/inbox",
                method: "GET",
                params: {
                    folder,
                    page,
                    limit,
                    search,
                    q, // Gmail search query
                },
            }),
            providesTags: (result, error, arg) => [
                { type: "Emails", id: "GMAIL_LIST" },
                { type: "Emails", id: arg.folder },
            ],
            transformResponse: (response) => ({
                emails: response.data?.emails || response.data?.messages || [],
                total: response.data?.total || 0,
                unreadCount: response.data?.unreadCount || 0,
                nextPageToken: response.data?.nextPageToken,
            }),
        }),

        // Send email via Gmail
        sendGmailEmail: builder.mutation({
            query: (emailData) => ({
                url: "/emails/gmail/send",
                method: "POST",
                body: emailData,
            }),
            invalidatesTags: [
                { type: "Emails", id: "GMAIL_LIST" },
                { type: "Emails", id: "sent" },
            ],
        }),

        // Reply via Gmail
        replyGmailEmail: builder.mutation({
            query: ({ messageId, replyData }) => ({
                url: `/emails/gmail/${messageId}/reply`,
                method: "POST",
                body: replyData,
            }),
            invalidatesTags: [
                { type: "Emails", id: "GMAIL_LIST" },
                { type: "Emails", id: "sent" },
                { type: "Emails", id: "inbox" },
            ],
        }),

        // Get Gmail message by ID
        getGmailMessage: builder.query({
            query: (messageId) => ({
                url: `/emails/gmail/${messageId}`,
                method: "GET",
            }),
            providesTags: (result, error, messageId) => [
                { type: "Emails", id: messageId },
            ],
        }),

        // Mark Gmail message as read/unread
        markGmailAsRead: builder.mutation({
            query: ({ messageId, isRead }) => ({
                url: `/emails/gmail/${messageId}/read`,
                method: "PATCH",
                body: { isRead },
            }),
            invalidatesTags: (result, error, { messageId }) => [
                { type: "Emails", id: "GMAIL_LIST" },
                { type: "Emails", id: "inbox" },
                { type: "Emails", id: messageId },
            ],
        }),

        // Get Gmail labels
        getGmailLabels: builder.query({
            query: () => ({
                url: "/emails/gmail/labels",
                method: "GET",
            }),
            providesTags: [{ type: "Emails", id: "LABELS" }],
        }),

        // Check Gmail connection status
        checkGmailConnection: builder.query({
            query: () => ({
                url: "/emails/gmail/status",
                method: "GET",
            }),
            providesTags: [{ type: "Emails", id: "STATUS" }],
        }),
    }),
});

export const {
    useGetEmailsQuery,
    useGetEmailByIdQuery,
    useSendEmailMutation,
    useReplyToEmailMutation,
    useForwardEmailMutation,
    useMarkEmailAsReadMutation,
    useToggleEmailStarMutation,
    useMoveEmailToFolderMutation,
    useDeleteEmailMutation,
    useBulkMarkAsReadMutation,
    useBulkMoveToFolderMutation,
    useBulkDeleteMutation,
    useGetEmailStatsQuery,
    useGetEmailTemplatesQuery,
    useSaveEmailTemplateMutation,
    useUpdateEmailTemplateMutation,
    useDeleteEmailTemplateMutation,
    // Gmail endpoints
    useGetGmailInboxQuery,
    useSendGmailEmailMutation,
    useReplyGmailEmailMutation,
    useGetGmailMessageQuery,
    useMarkGmailAsReadMutation,
    useGetGmailLabelsQuery,
    useCheckGmailConnectionQuery,
} = emailsApi;
