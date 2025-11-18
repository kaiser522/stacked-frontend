import React, { useMemo, useState, useEffect } from "react";
import IntercomChat from "../../components/IntercomChat";
import toast from "react-hot-toast";
import {
  useGetPlanInfoQuery,
  useGetCampaignsQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
  useEnrollClientMutation,
  useAutoEnrollClientMutation,
  useGetCampaignEnrollmentsQuery,
} from "../../store/apis/dripCampaign.api";
import { useGetAllClientsQuery } from "../../store/apis/clients.api";

export default function DripCampaignBuilder() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [importModal, setImportModal] = useState(false);
  const [enrollModal, setEnrollModal] = useState(false);
  const [viewEnrolledModal, setViewEnrolledModal] = useState(false);
  const [campaignFormData, setCampaignFormData] = useState({
    name: "",
    description: "",
    type: "custom",
    status: "draft",
    emails: [],
  });

  // Fetch plan info
  const { data: planInfo, isLoading: planLoading } = useGetPlanInfoQuery();
  const planLevel = planInfo?.data?.planLevel || "starter";
  const canAutoSend = planInfo?.data?.canAutoSend || false;
  const canAutoEnroll = planInfo?.data?.canAutoEnroll || false;

  // Fetch campaigns
  const { data: campaignsData, isLoading: campaignsLoading, refetch: refetchCampaigns } = useGetCampaignsQuery({});
  const campaigns = campaignsData?.data || [];

  // Fetch clients for enrollment
  const { data: clientsData } = useGetAllClientsQuery({ limit: 1000 });
  const clients = clientsData?.data?.clients || [];

  // Mutations
  const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();
  const [updateCampaign, { isLoading: isUpdating }] = useUpdateCampaignMutation();
  const [deleteCampaign] = useDeleteCampaignMutation();
  const [enrollClient, { isLoading: isEnrolling }] = useEnrollClientMutation();
  const [autoEnrollClient] = useAutoEnrollClientMutation();

  // Fetch enrollments for selected campaign
  const { data: enrollmentsData } = useGetCampaignEnrollmentsQuery(
    selectedCampaign?._id || selectedCampaign?.id || null,
    { skip: !selectedCampaign || !viewEnrolledModal }
  );
  const enrollments = enrollmentsData?.data || [];

  // Helper to parse timing string to delayDays/delayHours
  const parseTiming = (timing) => {
    if (timing === "Send immediately" || timing.includes("immediately")) {
      return { delayDays: 0, delayHours: 0 };
    }
    const daysMatch = timing.match(/(\d+)\s*days?/i);
    const hoursMatch = timing.match(/(\d+)\s*hours?/i);
    return {
      delayDays: daysMatch ? parseInt(daysMatch[1]) : 0,
      delayHours: hoursMatch ? parseInt(hoursMatch[1]) : 0,
    };
  };

  // Handler functions
  const handleUseTemplate = (campaign) => {
    setSelectedCampaign(campaign);
    setEnrollModal(true);
  };

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    // Transform backend email format to form format
    const emails = (campaign.emails || []).map((email) => ({
      title: email.title,
      desc: email.desc || "",
      timing: email.timing || `Send after ${email.delayDays || 0} days`,
      content: email.content,
      subject: email.subject || email.title,
      fields: email.fields || [],
    }));
    
    setCampaignFormData({
      name: campaign.name || campaign.title || "",
      description: campaign.description || campaign.desc || "",
      type: campaign.type || "custom",
      status: campaign.status || "draft",
      emails: emails.length > 0 ? emails : [...defaultSequence],
    });
    setEditModal(true);
  };

  const handlePreviewCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setPreviewModal(true);
  };

  const handleImportTemplates = () => {
    setImportModal(true);
  };

  const handleCreateCampaign = async () => {
    if (!campaignFormData.name) {
      toast.error("Please enter a campaign name");
      return;
    }

    try {
      // Transform sequence to email format
      const emails = campaignFormData.emails.map((email, index) => {
        const timing = parseTiming(email.timing || "Send immediately");
        return {
          order: index + 1,
          title: email.title,
          subject: email.subject || email.title,
          content: email.content,
          timing: email.timing || "Send immediately",
          delayDays: timing.delayDays,
          delayHours: timing.delayHours,
          fields: email.fields || [],
        };
      });

      await createCampaign({
        ...campaignFormData,
        emails,
      }).unwrap();

      toast.success("Campaign created successfully!");
      setModalOpen(false);
      setCampaignFormData({ name: "", description: "", type: "custom", status: "draft", emails: [] });
      refetchCampaigns();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create campaign");
    }
  };

  const handleUpdateCampaign = async () => {
    const campaignId = selectedCampaign?._id || selectedCampaign?.id;
    if (!campaignId) return;

    try {
      const emails = campaignFormData.emails.map((email, index) => {
        const timing = parseTiming(email.timing || "Send immediately");
        return {
          order: index + 1,
          title: email.title,
          subject: email.subject || email.title,
          content: email.content,
          timing: email.timing || "Send immediately",
          delayDays: timing.delayDays,
          delayHours: timing.delayHours,
          fields: email.fields || [],
        };
      });

      await updateCampaign({
        id: campaignId,
        ...campaignFormData,
        emails,
      }).unwrap();

      toast.success("Campaign updated successfully!");
      setEditModal(false);
      setSelectedCampaign(null);
      refetchCampaigns();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update campaign");
    }
  };

  const handleDeleteCampaign = async (campaign) => {
    const campaignId = campaign._id || campaign.id;
    if (!campaignId || !window.confirm("Are you sure you want to delete this campaign?")) return;

    try {
      await deleteCampaign(campaignId).unwrap();
      toast.success("Campaign deleted successfully!");
      refetchCampaigns();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete campaign");
    }
  };

  const handleEnrollClient = async (formData) => {
    const campaignId = selectedCampaign?._id || selectedCampaign?.id;
    if (!campaignId) return;

    try {
      await enrollClient({
        campaignId: campaignId,
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone || "",
        customizations: formData.emailCustomizations || {},
      }).unwrap();

      toast.success(`${formData.name} enrolled successfully!${canAutoSend ? " Emails will send automatically." : " You'll need to send emails manually."}`);
      setEnrollModal(false);
      setSelectedCampaign(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to enroll client");
    }
  };

  const handleViewEnrolled = (campaign) => {
    setSelectedCampaign(campaign);
    setViewEnrolledModal(true);
  };

  // Calculate stats from campaigns
  const quickStats = useMemo(() => {
    const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
    const totalEnrollments = enrollments.length;
    return [
      { value: activeCampaigns.toString(), label: "Active Campaigns" },
      { value: totalEnrollments.toString(), label: "Total Enrollments" },
      { value: canAutoSend ? "✓" : "—", label: "Auto-Send" },
      { value: canAutoEnroll ? "✓" : "—", label: "Auto-Enroll" },
    ];
  }, [campaigns, enrollments, canAutoSend, canAutoEnroll]);

  const defaultSequence = [
    {
      title: "Welcome Email",
      desc: "Introduction and value proposition",
      timing: "Send immediately",
      content: "Hi [CLIENT_NAME],\n\nWelcome! I'm [AGENT_NAME] from [COMPANY_NAME]. I'm excited to help you with your real estate journey.\n\nI'll be sending you valuable market insights and property recommendations tailored to your needs.\n\nBest regards,\n[AGENT_NAME]",
      fields: ["CLIENT_NAME", "AGENT_NAME", "COMPANY_NAME"],
      subject: "Welcome!",
    },
    {
      title: "Market Insights",
      desc: "Local market trends and data",
      timing: "Send after 2 days",
      content: "Hi [CLIENT_NAME],\n\nHere are the latest market insights for [MARKET_AREA]:\n\n• Average home price: [AVERAGE_PRICE]\n• Days on market: [DAYS_ON_MARKET]\n• Market trend: [MARKET_TREND]\n\nLet me know if you'd like to discuss any of these insights!\n\n[AGENT_NAME]",
      fields: ["CLIENT_NAME", "MARKET_AREA", "AVERAGE_PRICE", "DAYS_ON_MARKET", "MARKET_TREND", "AGENT_NAME"],
      subject: "Market Insights for [MARKET_AREA]",
    },
  ];

  return (
    <div className="space-y-6">
      <IntercomChat enableFin={false} />
      
      {/* Plan Info Banner */}
      {planInfo && (
        <div className={`p-4 rounded-lg border ${planLevel === "pro" ? "bg-blue-500/10 border-blue-500/30" : planLevel === "power" ? "bg-teal-500/10 border-teal-500/30" : "bg-yellow-500/10 border-yellow-500/30"}`}>
          <div className="flex items-center gap-3">
            <div className="text-xl">
              {planLevel === "pro" ? "⭐" : planLevel === "power" ? "⚡" : "📌"}
            </div>
            <div>
              <h3 className="text-white font-semibold">
                {planLevel === "pro" ? "Pro Plan" : planLevel === "power" ? "Power Plan" : "Starter Plan"}
              </h3>
              <p className="text-slate-300 text-sm">
                {planLevel === "pro"
                  ? "Auto-enroll + Auto-send enabled"
                  : planLevel === "power"
                  ? "Manual enroll + Auto-send enabled"
                  : "Manual enroll + Manual send"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <h1 className="text-2xl font-semibold text-white">Drip Campaign Builder</h1>
        <div className="relative w-80 hidden md:block">
          <input className="w-full bg-[#2d3748] border border-[#4a5568] rounded-lg pl-10 pr-3 py-2 text-white" placeholder="Search campaigns..." />
          <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-3">
          <button onClick={() => {
            setCampaignFormData({ name: "", description: "", type: "custom", status: "draft", emails: [...defaultSequence] });
            setModalOpen(true);
          }} className="px-4 py-2 rounded bg-teal-300 text-slate-900 font-semibold">➕ Create Campaign</button>
          <button onClick={handleImportTemplates} className="px-4 py-2 rounded bg-[#2d3748] text-white border border-[#4a5568]">📥 Import Templates</button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((s, i) => (
          <div key={i} className="bg-[#2d3748] border border-[#4a5568] rounded-xl p-6">
            <div className="text-2xl font-bold text-teal-300 mb-1">{s.value}</div>
            <div className="text-slate-300 text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Loading state */}
      {campaignsLoading && (
        <div className="text-center py-12 text-white">Loading campaigns...</div>
      )}

      {/* Campaigns grid */}
      {!campaignsLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {campaigns.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-300">
              No campaigns yet. Create your first campaign to get started!
            </div>
          ) : (
            campaigns.map((campaign) => {
              const emailCount = campaign.emails?.length || 0;
              const icon = campaign.type === "lead_nurture" ? "🏡" : campaign.type === "buyer_journey" ? "🔄" : campaign.type === "seller_followup" ? "💰" : "📧";
              
              return (
                <div key={campaign._id} className="bg-[#2d3748] border border-[#4a5568] rounded-xl overflow-hidden">
                  <div className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-teal-300 text-slate-900 flex items-center justify-center text-lg font-semibold">{icon}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{campaign.name}</h3>
                      <p className="text-slate-300 text-sm mb-2">{campaign.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                        <span>📧 {emailCount} emails</span>
                        <span className={`px-2 py-0.5 rounded text-white ${campaign.status === "active" ? "bg-green-600" : campaign.status === "draft" ? "bg-yellow-600" : campaign.status === "paused" ? "bg-red-600" : "bg-slate-600"}`}>
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-[#4a5568] flex flex-wrap gap-2">
                    <button onClick={() => handleUseTemplate(campaign)} className="px-3 py-2 rounded bg-teal-300 text-slate-900 font-semibold text-sm">👤 Enroll Client</button>
                    <button onClick={() => handleEditCampaign(campaign)} className="px-3 py-2 rounded bg-[#2d3748] text-white border border-[#4a5568] text-sm">Edit</button>
                    <button onClick={() => handleViewEnrolled(campaign)} className="px-3 py-2 rounded bg-[#2d3748] text-white border border-[#4a5568] text-sm">
                      View Enrolled ({enrollments.filter(e => e.campaignId === campaign._id || e.campaignId === campaign.id).length})
                    </button>
                    <button onClick={() => handlePreviewCampaign(campaign)} className="px-3 py-2 rounded bg-[#2d3748] text-white border border-[#4a5568] text-sm">Preview</button>
                    <button onClick={() => handleDeleteCampaign(campaign)} className="px-3 py-2 rounded bg-red-600 text-white text-sm">Delete</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Create Campaign Modal */}
      {modalOpen && (
        <CreateCampaignModal
          formData={campaignFormData}
          setFormData={setCampaignFormData}
          onClose={() => {
            setModalOpen(false);
            setCampaignFormData({ name: "", description: "", type: "custom", status: "draft", emails: [] });
          }}
          onSubmit={handleCreateCampaign}
          isLoading={isCreating}
        />
      )}

      {/* Edit Campaign Modal */}
      {editModal && selectedCampaign && (
        <CreateCampaignModal
          formData={campaignFormData}
          setFormData={setCampaignFormData}
          onClose={() => {
            setEditModal(false);
            setSelectedCampaign(null);
          }}
          onSubmit={handleUpdateCampaign}
          isLoading={isUpdating}
          isEdit={true}
        />
      )}

      {/* Preview Modal */}
      {previewModal && selectedCampaign && (
        <PreviewModal
          campaign={selectedCampaign}
          onClose={() => {
            setPreviewModal(false);
            setSelectedCampaign(null);
          }}
        />
      )}

      {/* Enroll Client Modal */}
      {enrollModal && selectedCampaign && (
        <EnrollClientModal
          campaign={selectedCampaign}
          clients={clients}
          canAutoSend={canAutoSend}
          onClose={() => {
            setEnrollModal(false);
            setSelectedCampaign(null);
          }}
          onEnroll={handleEnrollClient}
          isLoading={isEnrolling}
        />
      )}

      {/* View Enrolled Clients Modal */}
      {viewEnrolledModal && selectedCampaign && (
        <ViewEnrolledModal
          campaign={selectedCampaign}
          enrollments={enrollments}
          onClose={() => {
            setViewEnrolledModal(false);
            setSelectedCampaign(null);
          }}
        />
      )}
    </div>
  );
}

// Create Campaign Modal Component
function CreateCampaignModal({ formData, setFormData, onClose, onSubmit, isLoading, isEdit = false }) {
  const handleAddEmail = () => {
    setFormData({
      ...formData,
      emails: [
        ...formData.emails,
        {
          title: `Step ${formData.emails.length + 1}`,
          desc: "Custom email",
          timing: "Send immediately",
          content: "",
          subject: "",
          fields: [],
        },
      ],
    });
  };

  const handleUpdateEmail = (index, updates) => {
    const newEmails = [...formData.emails];
    newEmails[index] = { ...newEmails[index], ...updates };
    setFormData({ ...formData, emails: newEmails });
  };

  const handleRemoveEmail = (index) => {
    setFormData({
      ...formData,
      emails: formData.emails.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-5 z-50" onClick={onClose}>
      <div className="bg-[#2d3748] rounded-xl p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-[#2d3748] pb-2">
          <h2 className="text-white text-lg sm:text-xl font-semibold">{isEdit ? "Edit Campaign" : "Create New Drip Campaign"}</h2>
          <button className="text-slate-300 hover:text-white transition-colors" onClick={onClose}>✕</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-white text-sm sm:text-base">Campaign Name *</label>
            <input
              className="w-full bg-[#1a1f2e] border border-[#4a5568] rounded-lg px-3 py-2 text-white text-sm sm:text-base focus:ring-2 focus:ring-teal-300 focus:border-transparent outline-none"
              placeholder="Enter campaign name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm sm:text-base">Campaign Type</label>
            <select
              className="w-full bg-[#1a1f2e] border border-[#4a5568] rounded-lg px-3 py-2 text-white text-sm sm:text-base focus:ring-2 focus:ring-teal-300 focus:border-transparent outline-none"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="custom">Custom</option>
              <option value="lead_nurture">Lead Nurture</option>
              <option value="buyer_journey">Buyer Journey</option>
              <option value="seller_followup">Seller Follow-up</option>
              <option value="market_updates">Market Updates</option>
              <option value="client_reactivation">Client Reactivation</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-white text-sm sm:text-base">Description</label>
            <textarea
              className="w-full bg-[#1a1f2e] border border-[#4a5568] rounded-lg px-3 py-2 text-white text-sm sm:text-base min-h-[80px] sm:min-h-[100px] focus:ring-2 focus:ring-teal-300 focus:border-transparent outline-none resize-none"
              placeholder="Describe your campaign purpose and goals"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm sm:text-base">Status</label>
            <select
              className="w-full bg-[#1a1f2e] border border-[#4a5568] rounded-lg px-3 py-2 text-white text-sm sm:text-base focus:ring-2 focus:ring-teal-300 focus:border-transparent outline-none"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
          </div>
          <div>
            <div className="text-white font-medium mb-2 text-sm sm:text-base">Email Sequence</div>
            <div className="border border-[#4a5568] rounded-lg p-3 sm:p-4 space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
              {formData.emails.map((email, index) => (
                <div key={index} className="bg-[#1a1f2e] border border-[#4a5568] rounded p-3">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-teal-300 text-slate-900 font-semibold flex items-center justify-center text-sm flex-shrink-0">{index + 1}</div>
                    <div className="flex-1">
                      <input
                        type="text"
                        className="w-full bg-[#2d3748] border border-[#4a5568] rounded px-2 py-1 text-white text-sm mb-2"
                        placeholder="Email title"
                        value={email.title}
                        onChange={(e) => handleUpdateEmail(index, { title: e.target.value })}
                      />
                      <input
                        type="text"
                        className="w-full bg-[#2d3748] border border-[#4a5568] rounded px-2 py-1 text-white text-sm mb-2"
                        placeholder="Email subject"
                        value={email.subject}
                        onChange={(e) => handleUpdateEmail(index, { subject: e.target.value })}
                      />
                      <select
                        className="w-full bg-[#2d3748] border border-[#4a5568] rounded px-2 py-1 text-white text-sm mb-2"
                        value={email.timing}
                        onChange={(e) => handleUpdateEmail(index, { timing: e.target.value })}
                      >
                        <option value="Send immediately">Send immediately</option>
                        <option value="Send after 1 day">Send after 1 day</option>
                        <option value="Send after 2 days">Send after 2 days</option>
                        <option value="Send after 3 days">Send after 3 days</option>
                        <option value="Send after 5 days">Send after 5 days</option>
                        <option value="Send after 7 days">Send after 7 days</option>
                        <option value="Send after 14 days">Send after 14 days</option>
                      </select>
                      <textarea
                        className="w-full bg-[#2d3748] border border-[#4a5568] rounded px-2 py-1 text-white text-sm min-h-[100px]"
                        placeholder="Email content"
                        value={email.content}
                        onChange={(e) => handleUpdateEmail(index, { content: e.target.value })}
                      />
                      <button
                        onClick={() => handleRemoveEmail(index)}
                        className="mt-2 text-red-400 text-xs hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                className="w-full border-2 border-dashed border-[#4a5568] rounded p-3 sm:p-4 text-slate-300 hover:text-teal-300 hover:border-teal-300 text-sm sm:text-base transition-colors"
                onClick={handleAddEmail}
              >
                ➕ Add Another Email Step
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t border-[#4a5568]">
            <button className="px-4 py-2 rounded bg-[#2d3748] text-white border border-[#4a5568] hover:bg-[#374151] transition-colors text-sm sm:text-base" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-teal-300 text-slate-900 font-semibold hover:bg-teal-200 transition-colors text-sm sm:text-base disabled:opacity-50"
              onClick={onSubmit}
              disabled={isLoading || !formData.name}
            >
              {isLoading ? "Saving..." : isEdit ? "Update Campaign" : "Create Campaign"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Preview Modal Component
function PreviewModal({ campaign, onClose }) {
  const emails = campaign.emails || [];
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-5 z-50" onClick={onClose}>
      <div className="bg-[#2d3748] rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">Preview: {campaign.name || campaign.title}</h2>
          <button className="text-slate-300" onClick={onClose}>✕</button>
        </div>
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-teal-300 font-semibold mb-2">Campaign Overview</h3>
            <p className="text-white mb-2">{campaign.description || campaign.desc}</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-teal-300/20 text-teal-300 px-2 py-1 rounded text-sm">📧 {emails.length} emails</span>
              <span className={`px-2 py-1 rounded text-sm ${campaign.status === "active" ? "bg-green-600" : campaign.status === "draft" ? "bg-yellow-600" : campaign.status === "paused" ? "bg-red-600" : "bg-slate-600"}`}>
                {campaign.status}
              </span>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-teal-300 font-semibold mb-2">Email Sequence Preview</h3>
            <div className="space-y-4">
              {emails.length === 0 ? (
                <div className="text-slate-300 text-center py-8">No emails configured for this campaign</div>
              ) : (
                emails.map((email, i) => (
                  <div key={i} className="bg-[#1a1f2e] rounded p-4 border-l-4 border-teal-300">
                    <div className="text-white font-medium mb-2">{email.title}</div>
                    <div className="text-slate-300 text-sm mb-2">{email.subject}</div>
                    <div className="text-teal-300 text-xs font-semibold mb-3">{email.timing}</div>
                    <div className="bg-black/20 rounded p-3 border border-[#4a5568]">
                      <div className="text-slate-300 text-sm whitespace-pre-wrap">{email.content}</div>
                    </div>
                    {email.fields && email.fields.length > 0 && (
                      <div className="mt-3">
                        <div className="text-slate-400 text-xs mb-2">Customizable fields:</div>
                        <div className="flex flex-wrap gap-1">
                          {email.fields.map((field, fieldIndex) => (
                            <span key={fieldIndex} className="bg-teal-300/20 text-teal-300 px-2 py-1 rounded text-xs">
                              {field.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enroll Client Modal Component
function EnrollClientModal({ campaign, clients, canAutoSend, onClose, onEnroll, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    clientId: "",
  });

  const handleClientSelect = (clientId) => {
    const client = clients.find((c) => c._id === clientId);
    if (client) {
      setFormData({
        name: client.name || "",
        email: client.email || "",
        phone: client.phone || "",
        clientId: client._id,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in required fields (Name and Email)");
      return;
    }
    onEnroll(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-5 z-50" onClick={onClose}>
      <div className="bg-[#2d3748] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">Enroll Client in Campaign</h2>
          <button className="text-slate-300 hover:text-white" onClick={onClose}>✕</button>
        </div>

        <div className="bg-teal-300/10 border border-teal-300/30 rounded-lg p-4 mb-6">
          <h3 className="text-white font-semibold mb-1">{campaign.name}</h3>
          <p className="text-slate-300 text-sm">{campaign.description}</p>
          {canAutoSend && (
            <div className="mt-2 text-teal-300 text-sm">✓ Emails will send automatically</div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {clients.length > 0 && (
            <div>
              <label className="block mb-1 text-white text-sm">Select Existing Client</label>
              <select
                className="w-full bg-[#1a1f2e] border border-[#4a5568] rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-teal-300 focus:border-transparent outline-none"
                onChange={(e) => handleClientSelect(e.target.value)}
                value={formData.clientId}
              >
                <option value="">Or enter new client details</option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name} ({client.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-white text-sm">Full Name *</label>
              <input
                type="text"
                required
                className="w-full bg-[#1a1f2e] border border-[#4a5568] rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-teal-300 focus:border-transparent outline-none"
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-1 text-white text-sm">Email Address *</label>
              <input
                type="email"
                required
                className="w-full bg-[#1a1f2e] border border-[#4a5568] rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-teal-300 focus:border-transparent outline-none"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-white text-sm">Phone Number</label>
            <input
              type="tel"
              className="w-full bg-[#1a1f2e] border border-[#4a5568] rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-teal-300 focus:border-transparent outline-none"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[#4a5568]">
            <button type="button" className="px-4 py-2 rounded bg-[#2d3748] text-white border border-[#4a5568] hover:bg-[#374151] transition-colors" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-teal-300 text-slate-900 font-semibold hover:bg-teal-200 transition-colors disabled:opacity-50" disabled={isLoading}>
              {isLoading ? "Enrolling..." : "Enroll Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// View Enrolled Clients Modal Component
function ViewEnrolledModal({ campaign, enrollments, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-5 z-50" onClick={onClose}>
      <div className="bg-[#2d3748] rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">Enrolled Clients: {campaign.name || campaign.title}</h2>
          <button className="text-slate-300" onClick={onClose}>✕</button>
        </div>
        <div className="space-y-2">
          {enrollments.length === 0 ? (
            <div className="text-center py-8 text-slate-300">No enrolled clients yet</div>
          ) : (
            enrollments.map((enrollment) => {
              const sentEmails = enrollment.emailsSent?.filter((e) => e.status === "sent").length || 0;
              const totalEmails = enrollment.emailsSent?.length || 0;
              
              return (
                <div key={enrollment._id || enrollment.id} className="bg-[#1a1f2e] border border-[#4a5568] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{enrollment.clientName}</h3>
                      <p className="text-slate-300 text-sm">{enrollment.clientEmail}</p>
                      {enrollment.clientPhone && <p className="text-slate-300 text-sm">{enrollment.clientPhone}</p>}
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-1 rounded text-xs ${enrollment.status === "active" ? "bg-green-600" : enrollment.status === "paused" ? "bg-yellow-600" : "bg-slate-600"}`}>
                        {enrollment.status}
                      </div>
                      <div className="text-slate-300 text-sm mt-2">
                        {sentEmails}/{totalEmails} emails sent
                      </div>
                      <div className="text-slate-400 text-xs mt-1">
                        {enrollment.enrollmentType === "auto" ? "Auto-enrolled" : "Manually enrolled"}
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-400 text-xs mt-2">
                    Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
