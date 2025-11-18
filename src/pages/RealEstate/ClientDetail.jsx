import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetClientByIdQuery } from "../../store/apis/clients.api";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Edit, Trash2, Link2, Copy, Paperclip, Home, FileText, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function ClientDetail() {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useGetClientByIdQuery(clientId);

    if (isLoading) return <LoadingSpinner />;
    if (isError)
        return (
            <div className="text-center text-red-500 p-6">
                Failed to load client: {error?.data?.message || "Unknown error"}
            </div>
        );

    const client = data?.data || {};

    // Extract related data from client object
    const clientNotes = client.notes || "";
    const associatedProperties = client.properties || [];
    const clientDocuments = client.documents || [];

    // Generate timeline link for client
    const generateTimelineLink = (client) => {
        const baseUrl = window.location.origin;
        const timelineUrl = `${baseUrl}/realestate/clients/${client._id}/timeline`;
        return timelineUrl;
    };

    // Copy timeline link to clipboard
    const copyTimelineLink = async (client) => {
        try {
            const link = generateTimelineLink(client);
            await navigator.clipboard.writeText(link);
            toast.success("Timeline link copied to clipboard!");
        } catch (error) {
            toast.error("Failed to copy link");
        }
    };

    // Navigate to timeline page
    const goToTimeline = () => {
        navigate(`/realestate/clients/${client._id}/timeline`);
    };

    const statusStyles = {
        active_buyer: "bg-green-600",
        lead: "bg-yellow-500",
        active_seller: "bg-blue-600",
    };

    return (
        <div
            className="text-white p-6"
            style={{
                backgroundColor: "var(--lighter-dark, #1a1a1a)",
                minHeight: "100vh",
            }}
        >
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Clients
                        </button>
                        <h1 className="text-2xl font-bold">Client Details</h1>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(`/realestate/clients/${client._id}/edit`)}
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 rounded-lg transition-colors"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Client
                        </button>
                        <button
                            onClick={() => {
                                if (window.confirm("Are you sure you want to delete this client?")) {
                                    // Handle delete logic here
                                    console.log("Delete client:", client._id);
                                }
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {/* Client Information Card */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-2xl font-bold">
                            {client.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("") || "--"}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{client.name}</h2>
                            <span
                                className={`mt-2 inline-block px-3 py-1 text-sm font-medium rounded-full text-white ${
                                    statusStyles[client.status] || "bg-gray-600"
                                }`}
                            >
                                {client.status?.replace("_", " ").toUpperCase() || "N/A"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[var(--primary-color)] mb-3">Contact Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className="text-white">{client.email || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-400">Phone</p>
                                    <p className="text-white">{client.phone || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[var(--primary-color)] mb-3">Transaction Details</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-400">Last Contact</p>
                                    <p className="text-white">
                                        {client.lastContact 
                                            ? new Date(client.lastContact).toLocaleDateString() 
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-400">Property Address</p>
                                    <p className="text-white">{client.propertyAddress || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Timeline Actions */}
                <div className="border-t border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-[var(--primary-color)] mb-4">Timeline & Progress</h3>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={goToTimeline}
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white rounded-lg transition-colors"
                        >
                            <Calendar className="w-4 h-4" />
                            View Timeline
                        </button>
                        <button
                            onClick={() => copyTimelineLink(client)}
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white rounded-lg transition-colors"
                        >
                            <Copy className="w-4 h-4" />
                            Copy Timeline Link
                        </button>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                        Share the timeline link with your client to keep them updated on their transaction progress.
                    </p>
                </div>
            </div>

            {/* Notes Section */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-[var(--primary-color)] mb-4">Notes</h3>
                <div className="bg-gray-700 p-4 rounded-lg">
                    {clientNotes ? (
                        <p className="text-gray-300">{clientNotes}</p>
                    ) : (
                        <p className="text-gray-400 italic">No notes for this client.</p>
                    )}
                </div>
            </div>

            {/* Associated Properties Section */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-[var(--primary-color)] mb-4">Associated Properties</h3>
                {associatedProperties.length > 0 ? (
                    <div className="space-y-3">
                        {associatedProperties.map((property, index) => (
                            <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <Home className="w-5 h-5 text-[var(--primary-color)]" />
                                    <h4 className="text-white font-medium">{property.address || property.name || `Property ${index + 1}`}</h4>
                                </div>
                                {property.price && (
                                    <p className="text-gray-300 text-sm">Price: ${property.price.toLocaleString()}</p>
                                )}
                                {property.status && (
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                                        property.status === 'active' ? 'bg-green-600' : 
                                        property.status === 'sold' ? 'bg-blue-600' : 
                                        'bg-gray-600'
                                    }`}>
                                        {property.status.toUpperCase()}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-700 p-4 rounded-lg flex items-center gap-3">
                        <Home className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-400 italic">No associated properties found.</p>
                    </div>
                )}
            </div>

            {/* Documents Section */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-[var(--primary-color)] mb-4">Documents</h3>
                {clientDocuments.length > 0 ? (
                    <div className="space-y-3">
                        {clientDocuments.map((document, index) => (
                            <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-[var(--primary-color)]" />
                                        <div>
                                            <h4 className="text-white font-medium">{document.name || document.filename || `Document ${index + 1}`}</h4>
                                            {document.type && (
                                                <p className="text-gray-400 text-sm">{document.type}</p>
                                            )}
                                            {document.uploadDate && (
                                                <p className="text-gray-400 text-xs">
                                                    Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {document.url && (
                                        <a
                                            href={document.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[var(--primary-color)] hover:text-[var(--primary-color)]/80 transition-colors"
                                        >
                                            <Paperclip className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-700 p-4 rounded-lg flex items-center gap-3">
                        <Paperclip className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-400 italic">No documents found.</p>
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[var(--primary-color)] mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                        onClick={() => {
                            // Store email data for compose modal
                            sessionStorage.setItem('openHouseEmailData', JSON.stringify({
                                to: client.email,
                                subject: `Follow-up regarding your real estate transaction`,
                                body: `Hi ${client.name},\n\nI wanted to follow up with you regarding your real estate transaction. Please let me know if you have any questions or if there's anything I can help you with.\n\nBest regards,\n[Your Name]`
                            }));
                            navigate('/realestate/email-inbox?compose=true');
                        }}
                        className="flex items-center justify-center gap-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                        Send Email
                    </button>
                    <button
                        onClick={() => {
                            // Redirect to Twilio dialer
                            navigate('/realestate/voice-calls', { 
                                state: { 
                                    clientPhone: client.phone,
                                    clientName: client.name 
                                } 
                            });
                        }}
                        className="flex items-center justify-center gap-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        <Phone className="w-5 h-5" />
                        Call Client
                    </button>
                    <button
                        onClick={() => {
                            // Redirect to new conversation modal
                            navigate('/realestate/messaging', { 
                                state: { 
                                    newConversation: true,
                                    clientId: client._id,
                                    clientName: client.name,
                                    clientPhone: client.phone
                                } 
                            });
                        }}
                        className="flex items-center justify-center gap-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        <MessageSquare className="w-5 h-5" />
                        Send Text
                    </button>
                    <button
                        onClick={() => navigate(`/realestate/clients/${client._id}/status`)}
                        className="flex items-center justify-center gap-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        <Link2 className="w-5 h-5" />
                        View Status
                    </button>
                </div>
            </div>
        </div>
    );
}
