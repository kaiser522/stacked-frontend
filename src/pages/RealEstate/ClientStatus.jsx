import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetClientByIdQuery } from "../../store/apis/clients.api";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FileText, Image, Download, Calendar, MapPin, Clipboard } from "lucide-react";

export default function ClientStatus() {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useGetClientByIdQuery(clientId);
    console.log(data)

    if (isLoading) return <LoadingSpinner />;
    if (isError)
        return (
            <div className="text-center text-red-500 p-6">
                Failed to load client status: {error?.data?.message || "Unknown error"}
            </div>
        );

    const client = data?.data || {};

    // Placeholder progress calculation
    const progress = client?.progressPercentage || 0;
    const timeline = client?.timeline || [];
    const agent = client || {};
    const assignedDocuments = client?.assignedDocuments || [];

    // Helper function to get file icon based on file type
    const getFileIcon = (fileType) => {
        switch (fileType) {
            case 'image':
                return <Image className="w-6 h-6 text-[#5dade2]" />;
            case 'zip':
                return <Clipboard className="w-6 h-6 text-[#f39c12]" />;
            default:
                return <FileText className="w-6 h-6 text-[#5dade2]" />;
        }
    };

    // Helper function to format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="min-h-screen bg-[#2c3e50] text-white">
            {/* Header */}
            <header className="bg-[#2c3e50] border-b border-[#34495e] flex justify-between items-center px-8 py-4">
                {/* <h1 className="text-2xl font-bold flex items-center"> */}
                {/* <span className="inline-block w-5 h-5 bg-white rotate-45 mr-2" /> STACKED */}
                {/* </h1> */}
                <span className="text-[#5dade2] font-bold">Client Portal</span>
            </header>

            {/* Client Info */}
            <section className="bg-[#34495e] m-8 p-8 rounded-lg grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-[#5dade2] mb-4 text-xl font-semibold">{client.name}</h2>
                    <p className="mb-2 text-[#bdc3c7]">
                        <strong>Property:</strong> {client.propertyAddress || "N/A"}
                    </p>
                    <p className="mb-2 text-[#bdc3c7]">
                        <strong>Transaction Type:</strong> {client.transactionType || "N/A"}
                    </p>
                    <p className="mb-2 text-[#bdc3c7]">
                        <strong>Contract Date:</strong> {client.contractDate ? new Date(client.contractDate).toLocaleDateString() : "N/A"}
                    </p>
                    <p className="mb-2 text-[#bdc3c7]">
                        <strong>Expected Closing:</strong> {client.expectedClosing ? new Date(client.expectedClosing).toLocaleDateString() : "N/A"}
                    </p>
                </div>

                <div className="bg-[#2c3e50] border-2 border-[#5dade2] rounded-lg text-center p-6">
                    <div className="w-16 h-16 bg-[#5dade2] rounded-full mx-auto flex items-center justify-center font-bold text-lg text-[#2c3e50] mb-4">
                        {agent.name ? agent.name.split(" ").map((n) => n[0]).join("") : "--"}
                    </div>
                    <h4 className="font-semibold">{agent.name || "Your Agent"}</h4>
                    <p className="text-[#bdc3c7] mb-4">Your Agent</p>
                    <p className="text-[#5dade2] text-sm">{agent.email}</p>
                    <p className="text-[#5dade2] text-sm">{agent.phone}</p>
                </div>
            </section>

            {/* Timeline */}
            <section className="m-8">
                <div className="bg-[#34495e] p-6 rounded-t-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h3 className="text-[#5dade2] text-xl font-semibold">Transaction Progress</h3>
                    <div className="w-full md:w-52">
                        <p className="text-[#bdc3c7] text-sm mb-2">{progress}% Complete</p>
                        <div className="h-2 bg-[#2c3e50] rounded">
                            <div
                                className="h-full bg-[#5dade2] transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-[#34495e] p-8 rounded-b-lg">
                    <div className="relative pl-8">
                        <span className="absolute left-3 top-0 bottom-0 w-0.5 bg-[#5dade2]" />
                        {timeline.map((item, idx) => {
                            const statusClass =
                                item.status === "completed"
                                    ? "bg-[#5dade2] border-[#5dade2]"
                                    : item.status === "active"
                                        ? "bg-[#f39c12] border-[#f39c12]"
                                        : "bg-[#2c3e50] border-[#7f8c8d]";
                            const borderLeft =
                                item.status === "completed"
                                    ? "border-[#5dade2]"
                                    : item.status === "active"
                                        ? "border-[#f39c12]"
                                        : "border-[#7f8c8d]";
                            return (
                                <div key={idx} className="mb-8 relative">
                                    <span className={`absolute -left-4 top-2 w-4 h-4 rounded-full border-2 ${statusClass}`} />
                                    <div className={`bg-[#2c3e50] p-6 rounded-lg border-l-4 ${borderLeft}`}>
                                        <div className="font-semibold text-white mb-1 flex items-center justify-between gap-4 flex-wrap">
                                            <span>{item.title}</span>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${item.status === "completed"
                                                    ? "bg-[#5dade2] text-[#2c3e50]"
                                                    : item.status === "active"
                                                        ? "bg-[#f39c12] text-white"
                                                        : "bg-[#7f8c8d] text-white"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>
                                        <div className="text-[#5dade2] text-sm mb-2">{item.date}</div>
                                        <div className="text-[#bdc3c7] text-sm">{item.description}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Assigned Documents */}
            <section className="m-8">
                <div className="bg-[#34495e] p-6 rounded-lg">
                    <h3 className="text-[#5dade2] text-xl font-semibold mb-6">Your Documents</h3>

                    {assignedDocuments.length > 0 ? (
                        <div className="grid gap-4">
                            {assignedDocuments.map((doc) => (
                                <div key={doc._id} className="bg-[#2c3e50] p-4 rounded-lg border border-[#5dade2]/20 hover:border-[#5dade2]/40 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-3 flex-1">
                                            <div className="flex-shrink-0 mt-1">
                                                {getFileIcon(doc.fileType)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-medium mb-1 truncate">
                                                    {doc.originalFileName}
                                                </h4>
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-[#bdc3c7]">
                                                    <div className="flex items-center space-x-1">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>
                                                            {new Date(doc.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{doc.address}</span>
                                                    </div>
                                                    <span>{formatFileSize(doc.fileSize)}</span>
                                                    {doc.documentType && (
                                                        <span className="bg-[#5dade2]/20 text-[#5dade2] px-2 py-1 rounded-full text-xs">
                                                            {doc.documentType}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 ml-4">
                                            <a
                                                href={doc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-[#5dade2] text-[#2c3e50] px-4 py-2 rounded-md hover:bg-[#4fa8d8] transition-colors flex items-center space-x-2 font-medium"
                                            >
                                                <Download className="w-4 h-4" />
                                                <span>Download</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <FileText className="w-16 h-16 text-[#7f8c8d] mx-auto mb-4" />
                            <p className="text-[#bdc3c7] text-lg">No documents assigned yet</p>
                            <p className="text-[#7f8c8d] text-sm mt-2">
                                Your agent will share relevant documents here as your transaction progresses.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact */}
            <section className="bg-[#34495e] m-8 p-8 rounded-lg text-center">
                <h3 className="text-[#5dade2] text-xl font-semibold mb-4">
                    Questions About Your Transaction?
                </h3>
                <p className="text-[#bdc3c7] mb-6">
                    Your agent is here to help every step of the way.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {agent.email && (
                        <button
                            onClick={() => {
                                // Store email data for compose modal
                                sessionStorage.setItem('openHouseEmailData', JSON.stringify({
                                    to: agent.email,
                                    subject: `Follow-up regarding your real estate transaction`,
                                    body: `Hi ${agent.name || 'there'},\n\nI wanted to follow up with you regarding my real estate transaction. Please let me know if you have any updates or if there's anything I need to do.\n\nThank you,\n${client.name}`
                                }));
                                navigate('/realestate/email-inbox?compose=true');
                            }}
                            className="bg-[#5dade2] text-[#2c3e50] font-bold px-8 py-3 rounded-md hover:bg-[#4fa8d8] transition-colors"
                        >
                            Send Email
                        </button>
                    )}
                    {agent.phone && (
                        <button
                            onClick={() => {
                                // Redirect to Twilio dialer
                                navigate('/realestate/voice-calls', { 
                                    state: { 
                                        clientPhone: agent.phone,
                                        clientName: agent.name || 'Agent'
                                    } 
                                });
                            }}
                            className="bg-[#5dade2] text-[#2c3e50] font-bold px-8 py-3 rounded-md hover:bg-[#4fa8d8] transition-colors"
                        >
                            Call Now
                        </button>
                    )}
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
                        className="bg-[#5dade2] text-[#2c3e50] font-bold px-8 py-3 rounded-md hover:bg-[#4fa8d8] transition-colors"
                    >
                        Send Message
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-8 text-[#7f8c8d] text-sm">
                <p>© {new Date().getFullYear()} Stacked Real Estate CRM. All rights reserved.</p>
                <p className="mt-2">
                    This portal is updated in real-time as your transaction progresses.
                </p>
            </footer>
        </div>
    );
}
