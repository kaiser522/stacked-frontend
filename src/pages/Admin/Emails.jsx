import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/UI/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/UI/Tabs";
import { Badge } from "../../components/UI/Badge";
import Button from "../../components/Button";
import Input from "../../components/Form/Input";
import TextAreaInput from "../../components/Form/TextAreaInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/UI/Select";
import { Inbox, Send, Trash2, Tag, RefreshCw, AlertCircle, Loader2 } from "lucide-react";
import Modal from "../../components/Modal";
import SearchInput from "../../components/Form/SearchInput";
import SelectInput from "../../components/Form/SelectInput";
import { transformGmailMessage } from "../../utils/gmailHelper";
import {
  useCheckGmailConnectionQuery,
  useGetGmailInboxQuery,
  useSendGmailEmailMutation,
  useReplyGmailEmailMutation,
  useMarkGmailAsReadMutation,
} from "../../store/apis/emails.api";

const Emails = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [activeTab, setActiveTab] = useState("inbox");
  const [composeModal, setComposeModal] = useState(false);
  const [newEmail, setNewEmail] = useState({
    to: "",
    subject: "",
    content: "",
  });

  // Gmail connection status
  const { data: connectionStatus, isLoading: isLoadingStatus } = useCheckGmailConnectionQuery();
  const isGmailConnected = connectionStatus?.data?.connected || false;
  const gmailEmail = connectionStatus?.data?.email || "stackedcare@gmail.com";

  // Fetch Gmail inbox
  const { 
    data: gmailData, 
    isLoading: isLoadingEmails, 
    refetch: refetchEmails,
    error: gmailError 
  } = useGetGmailInboxQuery({
    folder: activeTab === "trash" ? "trash" : activeTab === "sent" ? "sent" : "inbox",
    limit: 50,
    search: searchTerm,
  });

  const [sendEmailMutation, { isLoading: isSendingEmail }] = useSendGmailEmailMutation();
  const [replyEmailMutation, { isLoading: isReplyingEmail }] = useReplyGmailEmailMutation();
  const [markAsReadMutation] = useMarkGmailAsReadMutation();

  // Transform Gmail messages to our format
  const emails = useMemo(() => {
    const gmailMessages = gmailData?.emails || [];
    return gmailMessages.map((msg) => transformGmailMessage(msg));
  }, [gmailData]);

  const availableTags = [
    { label: "General", value: "general" },
    { label: "Issue", value: "issue" },
    { label: "Billing", value: "billing" },
    { label: "Premium", value: "premium" },
    { label: "Account", value: "account" },
    { label: "Resolved", value: "resolved" },
    { label: "Support", value: "support" },
  ];

  const filteredEmails = emails.filter((email) => {
    const matchesTab = email.status === activeTab;
    const matchesSearch =
      email.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag =
      filterTag === "all" || email.tags.some((tag) => tag.toLowerCase() === filterTag.toLowerCase());
    return matchesTab && matchesSearch && matchesTag;
  });

  const updateEmailStatus = async (emailId, newStatus) => {
    // Map our status to Gmail labels
    const statusMap = {
      inbox: "INBOX",
      sent: "SENT",
      trash: "TRASH",
      closed: "INBOX", // Keep in inbox but could use a custom label
    };

    try {
      // This would need a backend endpoint to modify Gmail labels
      // For now, we'll just update local state
      // TODO: Implement backend endpoint for moving emails between folders
      console.log("Moving email to:", newStatus);
    } catch (error) {
      console.error("Error updating email status:", error);
      alert("Failed to update email status. Please try again.");
    }
  };

  const addTagToEmail = (emailId, tag) => {
    // TODO: Implement Gmail label addition via backend
    console.log("Adding tag to email:", emailId, tag);
  };

  const removeTagFromEmail = (emailId, tag) => {
    // TODO: Implement Gmail label removal via backend
    console.log("Removing tag from email:", emailId, tag);
  };

  const sendEmail = async () => {
    if (!newEmail.to || !newEmail.subject || !newEmail.content) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await sendEmailMutation({
        to: newEmail.to,
        subject: newEmail.subject,
        body: newEmail.content,
        from: gmailEmail,
      }).unwrap();

      setNewEmail({ to: "", subject: "", content: "" });
      setComposeModal(false);
      refetchEmails();
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert(error?.data?.message || "Failed to send email. Please try again.");
    }
  };

  const replyToEmail = (originalEmail) => {
    setNewEmail({
      to: originalEmail.from,
      subject: originalEmail.subject.startsWith("Re:") 
        ? originalEmail.subject 
        : `Re: ${originalEmail.subject}`,
      content: `\n\n--- Original Message ---\nFrom: ${originalEmail.from}\nDate: ${originalEmail.time}\n\n${originalEmail.content}`,
    });
    setComposeModal(true);
  };

  const handleReply = async () => {
    if (!selectedEmail || !newEmail.content) {
      alert("Please enter your reply message");
      return;
    }

    try {
      await replyEmailMutation({
        messageId: selectedEmail.messageId,
        replyData: {
          to: selectedEmail.from,
          subject: newEmail.subject,
          body: newEmail.content,
          threadId: selectedEmail.threadId,
        },
      }).unwrap();

      setNewEmail({ to: "", subject: "", content: "" });
      setComposeModal(false);
      refetchEmails();
      alert("Reply sent successfully!");
    } catch (error) {
      console.error("Error sending reply:", error);
      alert(error?.data?.message || "Failed to send reply. Please try again.");
    }
  };

  const handleMarkAsRead = async (emailId, isRead) => {
    try {
      await markAsReadMutation({
        messageId: emailId,
        isRead: isRead,
      }).unwrap();
      refetchEmails();
    } catch (error) {
      console.error("Error marking email as read:", error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-[var(--gray)]";
    }
  };

  const getTabCount = (status) => {
    return emails.filter((email) => email.status === status).length;
  };

  useEffect(() => {
    if (selectedEmail && !selectedEmail.isRead) {
      handleMarkAsRead(selectedEmail.messageId, true);
    }
  }, [selectedEmail]);

  return (
    <>
      <div className="bg-[var(--lighter-dark)] p-6 mx-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-3 text-[var(--primary-color)]">
                Email Management
              </h1>
              <p className="text-[var(--gray)] mt-2">
                Manage customer service emails from {gmailEmail}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isGmailConnected ? (
                <Badge className="bg-green-100 text-green-800">
                  Gmail Connected
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800 flex items-center gap-2">
                  <AlertCircle size={14} />
                  Gmail Not Connected
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchEmails()}
                disabled={isLoadingEmails}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingEmails ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button type="primary" onClick={() => setComposeModal(true)}>
                Compose Email
              </Button>
            </div>
          </div>

          {/* Gmail Connection Warning */}
          {!isGmailConnected && !isLoadingStatus && (
            <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-4 text-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={20} />
                <strong>Gmail Not Connected</strong>
              </div>
              <p className="text-sm">
                Gmail integration is not connected. Please configure Gmail OAuth on the backend to connect{" "}
                <strong>{gmailEmail}</strong>.
              </p>
            </div>
          )}

          <div className="flex">
            <SearchInput
              value={searchTerm}
              setValue={setSearchTerm}
              placeholder="Search Emails..."
              className="max-w-xl"
            />
            <SelectInput
              placeholder="Tags"
              options={availableTags}
              value={filterTag}
              setValue={setFilterTag}
            />
          </div>

          <Tabs
            defaultTab="inbox"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inbox" className="relative">
                <div className="flex items-center">
                  <Inbox className="w-4 h-4 mr-2" />
                  Inbox
                  <Badge className="ml-2 bg-blue-500 text-white">
                    {getTabCount("inbox")}
                  </Badge>
                </div>
              </TabsTrigger>
              <TabsTrigger value="sent" className="relative">
                <div className="flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Sent
                  <Badge className="ml-2 bg-green-500 text-white">
                    {getTabCount("sent")}
                  </Badge>
                </div>
              </TabsTrigger>
              <TabsTrigger value="trash" className="relative">
                <div className="flex items-center">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Trash
                  <Badge className="ml-2 bg-red-500 text-white">
                    {getTabCount("trash")}
                  </Badge>
                </div>
              </TabsTrigger>
              <TabsTrigger value="closed" className="relative">
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Closed
                  <Badge className="ml-2 bg-gray-500 text-white">
                    {getTabCount("closed")}
                  </Badge>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {isLoadingEmails ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-color)]" />
                  <span className="ml-2 text-gray-300">Loading emails...</span>
                </div>
              ) : gmailError ? (
                <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-400">
                  <p>Failed to load emails. {gmailError?.data?.message || "Please check your Gmail connection."}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Email List */}
                  <Card className="bg-[#324250]">
                    <CardHeader>
                      <CardTitle className="text-[var(--white)]">
                        {activeTab === "inbox" && "Inbox"}
                        {activeTab === "sent" && "Sent Messages"}
                        {activeTab === "trash" && "Trash"}
                        {activeTab === "closed" && "Closed/Resolved"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {filteredEmails.map((email) => (
                          <div
                            key={email.id}
                            className={`p-4 rounded-lg cursor-pointer bg-[var(--lighter-dark)] transition-colors ${
                              selectedEmail?.id === email.id
                                ? "border-2 border-[var(--primary-color)]"
                                : "hover:bg-[#2d3a48da]"
                            } ${!email.isRead ? "font-semibold" : ""}`}
                            onClick={() => setSelectedEmail(email)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-[var(--gray)]">
                                {email.type === "inbound"
                                  ? email.from
                                  : `To: ${email.to}`}
                              </span>
                              <div className="flex items-center space-x-2">
                                {!email.isRead && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                                <Badge className={getPriorityColor(email.priority)}>
                                  {email.priority}
                                </Badge>
                                <span className="text-xs text-[var(--gray)]">
                                  {email.time}
                                </span>
                              </div>
                            </div>
                            <h3 className="font-medium text-[var(--gray)] mb-2">
                              {email.subject}
                            </h3>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {email.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  className="text-xs bg-green-100 text-green-800"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-sm text-[var(--gray)] truncate">
                              {email.snippet || email.content}
                            </p>
                          </div>
                        ))}
                        {filteredEmails.length === 0 && (
                          <div className="text-center py-8 text-[var(--gray)]">
                            No emails found in {activeTab}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Email Detail View */}
                  <Card className="bg-[#324250]">
                    <CardHeader>
                      <CardTitle className="text-[var(--white)]">
                        Email Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedEmail ? (
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-[var(--white)]">
                                  {selectedEmail.subject}
                                </h3>
                                <p className="text-sm text-[var(--gray)]">
                                  {selectedEmail.type === "inbound"
                                    ? `From: ${selectedEmail.from}`
                                    : `To: ${selectedEmail.to}`}
                                </p>
                                <p className="text-xs text-[var(--gray)]">
                                  {selectedEmail.time}
                                </p>
                              </div>
                              <Badge
                                className={getPriorityColor(selectedEmail.priority)}
                              >
                                {selectedEmail.priority}
                              </Badge>
                            </div>

                            <div className="mb-4">
                              <h4 className="text-sm font-medium mb-2 text-[var(--gray)]">
                                Tags:
                              </h4>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {selectedEmail.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs bg-green-100 text-green-800"
                                  >
                                    {tag}
                                    <button
                                      onClick={() =>
                                        removeTagFromEmail(selectedEmail.id, tag)
                                      }
                                      className="ml-1 text-red-500 hover:text-red-700"
                                    >
                                      ×
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                              <Select
                                onValueChange={(tag) =>
                                  addTagToEmail(selectedEmail.id, tag)
                                }
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue placeholder="Add tag" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableTags
                                    .filter(
                                      (tag) =>
                                        !selectedEmail.tags.includes(tag?.value)
                                    )
                                    .map((tag) => (
                                      <SelectItem
                                        key={tag?.label}
                                        value={tag?.value}
                                      >
                                        {tag?.label}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="hover:bg-[#324250] text-gray-200 focus:none ring-1 ring-teal-500 p-4 rounded-lg mb-4">
                              <p className="whitespace-pre-wrap">
                                {selectedEmail.content || selectedEmail.body || selectedEmail.snippet}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {selectedEmail.type === "inbound" &&
                                selectedEmail.status === "inbox" && (
                                  <Button
                                    size="sm"
                                    onClick={() => replyToEmail(selectedEmail)}
                                  >
                                    Reply
                                  </Button>
                                )}

                              {selectedEmail.status === "inbox" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    updateEmailStatus(selectedEmail.id, "closed")
                                  }
                                >
                                  Mark as Closed
                                </Button>
                              )}

                              {selectedEmail.status !== "trash" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    updateEmailStatus(selectedEmail.id, "trash")
                                  }
                                >
                                  Move to Trash
                                </Button>
                              )}

                              {selectedEmail.status === "trash" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    updateEmailStatus(selectedEmail.id, "inbox")
                                  }
                                >
                                  Restore
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-[var(--gray)]">
                          Select an email to view details
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Modal
        isOpen={composeModal}
        onClose={() => {
          setComposeModal(false);
          setNewEmail({ to: "", subject: "", content: "" });
        }}
        title="Compose New Email"
        size="3xl"
      >
        <div className="space-y-4 p-10">
          <div>
            <Input
              type="email"
              label="To"
              placeholder="recipient@example.com"
              value={newEmail.to}
              onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
            />
          </div>
          <div>
            <Input
              placeholder="Email subject"
              label="Subject"
              value={newEmail.subject}
              onChange={(val) => setNewEmail({ ...newEmail, subject: val })}
            />
          </div>
          <div>
            <TextAreaInput
              label="Message"
              placeholder="Write your email message..."
              rows={6}
              value={newEmail.content}
              onChange={(val) => setNewEmail({ ...newEmail, content: val })}
            />
          </div>
          <div className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setComposeModal(false);
                setNewEmail({ to: "", subject: "", content: "" });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={selectedEmail ? handleReply : sendEmail}
              disabled={isSendingEmail || isReplyingEmail}
            >
              {isSendingEmail || isReplyingEmail ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : selectedEmail ? (
                "Send Reply"
              ) : (
                "Send Email"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Emails;
