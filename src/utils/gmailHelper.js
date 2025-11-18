/**
 * Gmail Integration Service
 * 
 * This service provides helper functions for Gmail integration.
 * 
 * BACKEND REQUIREMENTS:
 * 
 * The following backend endpoints need to be implemented to support Gmail integration:
 * 
 * 1. GET /api/v1/emails/gmail/status
 *    - Check if Gmail OAuth is connected
 *    - Returns: { connected: boolean, email: string }
 * 
 * 2. GET /api/v1/emails/gmail/inbox
 *    - Fetch emails from Gmail inbox
 *    - Query params: folder, page, limit, search, q
 *    - Returns: Gmail API messages formatted for frontend
 * 
 * 3. POST /api/v1/emails/gmail/send
 *    - Send email via Gmail API
 *    - Body: { to, subject, body, from }
 *    - Returns: { success: boolean, messageId: string }
 * 
 * 4. POST /api/v1/emails/gmail/:messageId/reply
 *    - Reply to a Gmail message
 *    - Body: { to, subject, body, threadId }
 *    - Returns: { success: boolean, messageId: string }
 * 
 * 5. GET /api/v1/emails/gmail/:messageId
 *    - Get full Gmail message details
 *    - Returns: Full Gmail message object
 * 
 * 6. PATCH /api/v1/emails/gmail/:messageId/read
 *    - Mark message as read/unread
 *    - Body: { isRead: boolean }
 *    - Returns: { success: boolean }
 * 
 * 7. GET /api/v1/emails/gmail/labels
 *    - Get Gmail labels
 *    - Returns: Array of label objects
 * 
 * BACKEND OAUTH SETUP:
 * 
 * 1. Create Gmail API credentials in Google Cloud Console
 * 2. Enable Gmail API
 * 3. Set up OAuth 2.0 flow
 * 4. Store refresh tokens securely
 * 5. Implement token refresh mechanism
 * 
 * The backend should handle:
 * - OAuth authorization flow
 * - Token storage and refresh
 * - Gmail API calls
 * - Message formatting/transformation
 */

export const formatGmailDate = (dateString) => {
  if (!dateString) return "Unknown date";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  } catch {
    return dateString;
  }
};

// Helper to decode base64 in browser
const decodeBase64 = (base64String) => {
  try {
    // Use atob for browser base64 decoding
    if (typeof atob !== "undefined") {
      return atob(base64String.replace(/-/g, "+").replace(/_/g, "/"));
    }
    // Fallback for Node.js environments
    if (typeof Buffer !== "undefined") {
      return Buffer.from(base64String, "base64").toString();
    }
    return "";
  } catch {
    return "";
  }
};

export const extractGmailBody = (payload) => {
  if (!payload) return "";

  // If body has data directly
  if (payload.body?.data) {
    return decodeBase64(payload.body.data);
  }

  // If body is in parts
  if (payload.parts) {
    // Find text/plain part
    const textPart = payload.parts.find((p) => p.mimeType === "text/plain");
    if (textPart?.body?.data) {
      return decodeBase64(textPart.body.data);
    }

    // Fallback to text/html
    const htmlPart = payload.parts.find((p) => p.mimeType === "text/html");
    if (htmlPart?.body?.data) {
      return decodeBase64(htmlPart.body.data);
    }
  }

  return "";
};

export const extractGmailHeaders = (headers) => {
  if (!headers || !Array.isArray(headers)) return {};
  
  const headerMap = {};
  headers.forEach((header) => {
    if (header.name && header.value) {
      headerMap[header.name.toLowerCase()] = header.value;
    }
  });
  
  return headerMap;
};

export const transformGmailMessage = (msg) => {
  const headers = extractGmailHeaders(msg.payload?.headers);
  const body = extractGmailBody(msg.payload);
  const labels = msg.labelIds || [];

  const from = headers.from || "";
  const to = headers.to || "";
  const subject = headers.subject || "";
  const date = headers.date || "";

  // Determine status/folder
  let status = "inbox";
  if (labels.includes("SENT")) status = "sent";
  else if (labels.includes("TRASH")) status = "trash";
  else if (labels.includes("INBOX")) status = "inbox";

  // Determine priority
  let priority = "medium";
  const subjectLower = subject.toLowerCase();
  const bodyLower = body.toLowerCase();
  if (
    subjectLower.includes("urgent") ||
    subjectLower.includes("asap") ||
    bodyLower.includes("urgent")
  ) {
    priority = "high";
  } else if (subjectLower.includes("thanks") || subjectLower.includes("thank you")) {
    priority = "low";
  }

  // Extract tags from labels
  const systemLabels = ["INBOX", "SENT", "TRASH", "UNREAD", "STARRED", "IMPORTANT"];
  const tags = labels
    .filter((label) => !systemLabels.includes(label))
    .map((label) => label.toLowerCase().replace(/_/g, " "));

  return {
    id: msg.id,
    messageId: msg.id,
    from: from,
    to: to,
    subject: subject,
    content: body,
    body: body,
    time: formatGmailDate(date),
    status: status,
    tags: tags.length > 0 ? tags : ["General"],
    priority: priority,
    type: status === "sent" ? "outbound" : "inbound",
    isRead: !labels.includes("UNREAD"),
    snippet: msg.snippet || "",
    threadId: msg.threadId,
    labelIds: labels,
  };
};

