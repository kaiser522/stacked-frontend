import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetClientByIdQuery } from "../../store/apis/clients.api";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FileText, Image, Download, Calendar, MapPin, Clipboard, ArrowLeft, Edit, Save, X, Plus, Copy, Mail, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function ClientTimeline() {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useGetClientByIdQuery(clientId);
    
    // Edit mode state
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingStage, setEditingStage] = useState(null);
    const [newDocument, setNewDocument] = useState({ name: '', type: '', url: '' });
    const [showAddDocument, setShowAddDocument] = useState(false);

    if (isLoading) return <LoadingSpinner />;
    if (isError)
        return (
            <div className="text-center text-red-500 p-6">
                Failed to load client timeline: {error?.data?.message || "Unknown error"}
            </div>
        );

    const client = data?.data || {};

    // Default timeline stages (can be edited by agents)
    const [timelineStages, setTimelineStages] = useState([
        {
            id: 1,
            title: "Contract Signed",
            status: "completed",
            date: "April 10, 2025",
            description: "Purchase agreement has been signed by all parties. Initial earnest money deposit has been received."
        },
        {
            id: 2,
            title: "Financing Application",
            status: "completed",
            date: "April 12, 2025",
            description: "Mortgage application submitted to lender. All required documentation has been provided."
        },
        {
            id: 3,
            title: "Home Inspection",
            status: "completed",
            date: "April 18, 2025",
            description: "Professional home inspection completed. Minor issues identified and addressed with seller."
        },
        {
            id: 4,
            title: "Appraisal",
            status: "active",
            date: "April 25, 2025",
            description: "Appraisal has been ordered by your lender. Appraiser will contact you to schedule access to the property."
        },
        {
            id: 5,
            title: "Final Loan Approval",
            status: "pending",
            date: "Expected: May 5, 2025",
            description: "Awaiting final underwriting approval from your lender. This step will be completed after the appraisal."
        },
        {
            id: 6,
            title: "Final Walkthrough",
            status: "pending",
            date: "Expected: May 14, 2025",
            description: "Final walkthrough of the property to ensure it's in the agreed-upon condition before closing."
        },
        {
            id: 7,
            title: "Closing Day",
            status: "pending",
            date: "Expected: May 15, 2025",
            description: "Final closing meeting where you'll sign all documents and receive the keys to your new home!"
        }
    ]);

    // Default documents (can be edited by agents)
    const [documents, setDocuments] = useState([
        {
            id: 1,
            name: "Purchase Agreement",
            type: "Contract",
            url: "#",
            uploadDate: "April 10, 2025"
        },
        {
            id: 2,
            name: "Inspection Report",
            type: "Report",
            url: "#",
            uploadDate: "April 18, 2025"
        },
        {
            id: 3,
            name: "Appraisal Report",
            type: "Report",
            url: "#",
            uploadDate: "April 25, 2025"
        }
    ]);

    // Calculate progress percentage
    const completedStages = timelineStages.filter(stage => stage.status === 'completed').length;
    const progressPercentage = Math.round((completedStages / timelineStages.length) * 100);

    // Handle stage status update
    const handleStageStatusUpdate = (stageId, newStatus) => {
        setTimelineStages(prev => 
            prev.map(stage => 
                stage.id === stageId 
                    ? { ...stage, status: newStatus }
                    : stage
            )
        );
        toast.success(`Stage status updated to ${newStatus}`);
    };

    // Handle stage edit
    const handleStageEdit = (stage) => {
        setEditingStage({ ...stage });
    };

    // Handle stage save
    const handleStageSave = () => {
        if (editingStage) {
            setTimelineStages(prev => 
                prev.map(stage => 
                    stage.id === editingStage.id 
                        ? editingStage
                        : stage
                )
            );
            setEditingStage(null);
            toast.success("Stage updated successfully");
        }
    };

    // Handle stage cancel
    const handleStageCancel = () => {
        setEditingStage(null);
    };

    // Handle document add
    const handleAddDocument = () => {
        if (newDocument.name && newDocument.type) {
            const document = {
                id: documents.length + 1,
                name: newDocument.name,
                type: newDocument.type,
                url: newDocument.url || "#",
                uploadDate: new Date().toLocaleDateString()
            };
            setDocuments(prev => [...prev, document]);
            setNewDocument({ name: '', type: '', url: '' });
            setShowAddDocument(false);
            toast.success("Document added successfully");
        }
    };

    // Handle document delete
    const handleDocumentDelete = (documentId) => {
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
        toast.success("Document removed");
    };

    // Copy message to clipboard
    const copyMessage = async (messageContent) => {
        try {
            await navigator.clipboard.writeText(messageContent);
            toast.success("Message copied to clipboard!");
        } catch (error) {
            toast.error("Failed to copy message");
        }
    };

    // Mock communications data - Replace with actual API call if available
    const communications = [
        {
            id: 1,
            type: "email",
            subject: "Contract Update",
            content: "Hi, I wanted to update you on the contract status. Everything is progressing well and we're on track for the closing date.",
            timestamp: "April 20, 2025 2:30 PM",
            direction: "sent"
        },
        {
            id: 2,
            type: "sms",
            content: "Thanks for the update! Looking forward to closing.",
            timestamp: "April 20, 2025 3:15 PM",
            direction: "received"
        },
        {
            id: 3,
            type: "email",
            subject: "Inspection Report",
            content: "The inspection report has been completed. I've attached it for your review. Please let me know if you have any questions.",
            timestamp: "April 18, 2025 10:00 AM",
            direction: "sent"
        },
        {
            id: 4,
            type: "sms",
            content: "When can we schedule the appraisal?",
            timestamp: "April 22, 2025 9:45 AM",
            direction: "received"
        }
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#2c3e50', color: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', lineHeight: '1.6' }}>
            {/* Header */}
            <div className="flex justify-between items-center px-8 py-4 border-b border-[#34495e]" style={{ backgroundColor: '#2c3e50' }}>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-[#5dade2] hover:text-[#4fa8d8] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                    <div className="text-[#5dade2] font-bold">STACKED</div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-[#5dade2] font-bold">Client Portal</div>
                    <button
                        onClick={() => setIsEditMode(!isEditMode)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#5dade2] text-[#2c3e50] rounded-lg hover:bg-[#4fa8d8] transition-colors font-medium"
                    >
                        <Edit className="w-4 h-4" />
                        {isEditMode ? 'View Mode' : 'Edit Mode'}
                    </button>
                </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 m-8 rounded-lg" style={{ backgroundColor: '#34495e' }}>
                <div>
                    <h2 className="text-[#5dade2] mb-4 text-2xl font-bold">{client.name || "John Doe"}</h2>
                    <p className="mb-2 text-[#bdc3c7]">
                        <strong>Property:</strong> {client.propertyAddress || "123 Main Street"}
                    </p>
                    <p className="mb-2 text-[#bdc3c7]">
                        <strong>Transaction Type:</strong> {client.transactionType || "Purchase"}
                    </p>
                    <p className="mb-2 text-[#bdc3c7]">
                        <strong>Contract Date:</strong> {client.contractDate ? new Date(client.contractDate).toLocaleDateString() : "April 10, 2025"}
                    </p>
                    <p className="mb-2 text-[#bdc3c7]">
                        <strong>Expected Closing:</strong> {client.expectedClosing ? new Date(client.expectedClosing).toLocaleDateString() : "May 15, 2025"}
                    </p>
                </div>

                <div className="text-center p-6 rounded-lg border-2 border-[#5dade2]" style={{ backgroundColor: '#2c3e50' }}>
                    <div className="w-16 h-16 bg-[#5dade2] rounded-full mx-auto flex items-center justify-center font-bold text-lg text-[#2c3e50] mb-4">
                        {client.name ? client.name.split(" ").map((n) => n[0]).join("") : "JS"}
                    </div>
                    <h4 className="font-semibold">{client.name || "Jane Smith"}</h4>
                    <p className="text-[#bdc3c7] mb-4">Your Agent</p>
                    <p className="text-[#5dade2] text-sm">{client.email || "jane.smith@example.com"}</p>
                    <p className="text-[#5dade2] text-sm">{client.phone || "(555) 987-6543"}</p>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="m-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-6 rounded-t-lg" style={{ backgroundColor: '#34495e' }}>
                    <h3 className="text-[#5dade2] text-xl font-semibold">Transaction Progress</h3>
                    <div className="w-full md:w-52">
                        <div className="text-[#bdc3c7] text-sm mb-2">{progressPercentage}% Complete</div>
                        <div className="h-2 rounded" style={{ backgroundColor: '#2c3e50' }}>
                            <div
                                className="h-full transition-all"
                                style={{ 
                                    backgroundColor: '#5dade2',
                                    width: `${progressPercentage}%`
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-b-lg" style={{ backgroundColor: '#34495e' }}>
                    <div className="relative pl-8">
                        <div className="absolute left-3 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#5dade2' }} />
                        
                        {timelineStages.map((stage, index) => (
                            <div key={stage.id} className="mb-8 relative">
                                <div className={`absolute -left-4 top-2 w-4 h-4 rounded-full border-2 ${
                                    stage.status === 'completed' ? 'bg-[#5dade2] border-[#5dade2]' :
                                    stage.status === 'active' ? 'bg-[#f39c12] border-[#f39c12]' :
                                    'bg-[#2c3e50] border-[#7f8c8d]'
                                }`} />
                                
                                <div className={`p-6 rounded-lg border-l-4 ${
                                    stage.status === 'completed' ? 'border-[#5dade2]' :
                                    stage.status === 'active' ? 'border-[#f39c12]' :
                                    'border-[#7f8c8d]'
                                }`} style={{ backgroundColor: '#2c3e50' }}>
                                    
                                    {editingStage && editingStage.id === stage.id ? (
                                        // Edit mode for stage
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#bdc3c7] mb-1">Title</label>
                                                <input
                                                    type="text"
                                                    value={editingStage.title}
                                                    onChange={(e) => setEditingStage({...editingStage, title: e.target.value})}
                                                    className="w-full p-2 rounded bg-[#34495e] text-white border border-[#5dade2]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#bdc3c7] mb-1">Status</label>
                                                <select
                                                    value={editingStage.status}
                                                    onChange={(e) => setEditingStage({...editingStage, status: e.target.value})}
                                                    className="w-full p-2 rounded bg-[#34495e] text-white border border-[#5dade2]"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="active">Active</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#bdc3c7] mb-1">Date</label>
                                                <input
                                                    type="text"
                                                    value={editingStage.date}
                                                    onChange={(e) => setEditingStage({...editingStage, date: e.target.value})}
                                                    className="w-full p-2 rounded bg-[#34495e] text-white border border-[#5dade2]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#bdc3c7] mb-1">Description</label>
                                                <textarea
                                                    value={editingStage.description}
                                                    onChange={(e) => setEditingStage({...editingStage, description: e.target.value})}
                                                    className="w-full p-2 rounded bg-[#34495e] text-white border border-[#5dade2] h-20"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleStageSave}
                                                    className="flex items-center gap-2 px-4 py-2 bg-[#5dade2] text-[#2c3e50] rounded-lg hover:bg-[#4fa8d8] transition-colors"
                                                >
                                                    <Save className="w-4 h-4" />
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleStageCancel}
                                                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // View mode for stage
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="font-semibold text-white text-lg">{stage.title}</div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                                                        stage.status === 'completed' ? 'bg-[#5dade2] text-[#2c3e50]' :
                                                        stage.status === 'active' ? 'bg-[#f39c12] text-white' :
                                                        'bg-[#7f8c8d] text-white'
                                                    }`}>
                                                        {stage.status}
                                                    </span>
                                                    {isEditMode && (
                                                        <div className="flex gap-1">
                                                            <button
                                                                onClick={() => handleStageEdit(stage)}
                                                                className="p-1 text-[#5dade2] hover:text-[#4fa8d8] transition-colors"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <select
                                                                value={stage.status}
                                                                onChange={(e) => handleStageStatusUpdate(stage.id, e.target.value)}
                                                                className="text-xs bg-[#34495e] text-white border border-[#5dade2] rounded px-2 py-1"
                                                            >
                                                                <option value="pending">Pending</option>
                                                                <option value="active">Active</option>
                                                                <option value="completed">Completed</option>
                                                            </select>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-[#5dade2] text-sm mb-2">{stage.date}</div>
                                            <div className="text-[#bdc3c7] text-sm">{stage.description}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Documents Section */}
            <div className="m-8">
                <div className="p-6 rounded-lg" style={{ backgroundColor: '#34495e' }}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[#5dade2] text-xl font-semibold">Documents</h3>
                        {isEditMode && (
                            <button
                                onClick={() => setShowAddDocument(!showAddDocument)}
                                className="flex items-center gap-2 px-4 py-2 bg-[#5dade2] text-[#2c3e50] rounded-lg hover:bg-[#4fa8d8] transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Document
                            </button>
                        )}
                    </div>

                    {showAddDocument && (
                        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#2c3e50' }}>
                            <h4 className="text-white font-medium mb-4">Add New Document</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#bdc3c7] mb-1">Document Name</label>
                                    <input
                                        type="text"
                                        value={newDocument.name}
                                        onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                                        className="w-full p-2 rounded bg-[#34495e] text-white border border-[#5dade2]"
                                        placeholder="Enter document name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#bdc3c7] mb-1">Document Type</label>
                                    <input
                                        type="text"
                                        value={newDocument.type}
                                        onChange={(e) => setNewDocument({...newDocument, type: e.target.value})}
                                        className="w-full p-2 rounded bg-[#34495e] text-white border border-[#5dade2]"
                                        placeholder="e.g., Contract, Report"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#bdc3c7] mb-1">URL (optional)</label>
                                    <input
                                        type="url"
                                        value={newDocument.url}
                                        onChange={(e) => setNewDocument({...newDocument, url: e.target.value})}
                                        className="w-full p-2 rounded bg-[#34495e] text-white border border-[#5dade2]"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={handleAddDocument}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#5dade2] text-[#2c3e50] rounded-lg hover:bg-[#4fa8d8] transition-colors"
                                >
                                    <Save className="w-4 h-4" />
                                    Add Document
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAddDocument(false);
                                        setNewDocument({ name: '', type: '', url: '' });
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {documents.length > 0 ? (
                        <div className="space-y-4">
                            {documents.map((doc) => (
                                <div key={doc.id} className="p-4 rounded-lg border border-[#5dade2]/20 hover:border-[#5dade2]/40 transition-colors" style={{ backgroundColor: '#2c3e50' }}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-[#5dade2]" />
                                            <div>
                                                <h4 className="text-white font-medium">{doc.name}</h4>
                                                <div className="flex items-center gap-4 text-sm text-[#bdc3c7]">
                                                    <span>{doc.type}</span>
                                                    <span>Uploaded: {doc.uploadDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={doc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-[#5dade2] text-[#2c3e50] rounded-lg hover:bg-[#4fa8d8] transition-colors"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download
                                            </a>
                                            {isEditMode && (
                                                <button
                                                    onClick={() => handleDocumentDelete(doc.id)}
                                                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <FileText className="w-16 h-16 text-[#7f8c8d] mx-auto mb-4" />
                            <p className="text-[#bdc3c7] text-lg">No documents available</p>
                            <p className="text-[#7f8c8d] text-sm mt-2">
                                Documents will be added here as your transaction progresses.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Communication Timeline Section */}
            <div className="m-8">
                <div className="p-6 rounded-lg" style={{ backgroundColor: '#34495e' }}>
                    <h3 className="text-[#5dade2] text-xl font-semibold mb-6">Communication Timeline</h3>
                    
                    {communications.length > 0 ? (
                        <div className="space-y-4">
                            {communications.map((comm) => (
                                <div 
                                    key={comm.id} 
                                    className={`p-4 rounded-lg border-l-4 ${
                                        comm.direction === 'sent' 
                                            ? 'border-[#5dade2] bg-[#2c3e50]' 
                                            : 'border-[#f39c12] bg-[#2c3e50]'
                                    }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            {comm.type === 'email' ? (
                                                <Mail className="w-5 h-5 text-[#5dade2]" />
                                            ) : (
                                                <MessageSquare className="w-5 h-5 text-[#f39c12]" />
                                            )}
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white font-medium">
                                                        {comm.type === 'email' ? (comm.subject || 'Email') : 'SMS'}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                                        comm.direction === 'sent' 
                                                            ? 'bg-[#5dade2]/20 text-[#5dade2]' 
                                                            : 'bg-[#f39c12]/20 text-[#f39c12]'
                                                    }`}>
                                                        {comm.direction === 'sent' ? 'Sent' : 'Received'}
                                                    </span>
                                                </div>
                                                <div className="text-[#bdc3c7] text-xs mt-1">{comm.timestamp}</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => copyMessage(comm.type === 'email' ? `${comm.subject}\n\n${comm.content}` : comm.content)}
                                            className="flex items-center gap-2 px-3 py-2 bg-[#34495e] hover:bg-[#3d4f63] text-[#5dade2] rounded-lg transition-colors"
                                            title="Copy message"
                                        >
                                            <Copy className="w-4 h-4" />
                                            <span className="text-sm">Copy</span>
                                        </button>
                                    </div>
                                    <div className="text-[#bdc3c7] text-sm mt-2 whitespace-pre-wrap">
                                        {comm.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <MessageSquare className="w-16 h-16 text-[#7f8c8d] mx-auto mb-4" />
                            <p className="text-[#bdc3c7] text-lg">No communications yet</p>
                            <p className="text-[#7f8c8d] text-sm mt-2">
                                Messages and emails will appear here as you communicate with your client.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Section */}
            <div className="text-center p-8 m-8 rounded-lg" style={{ backgroundColor: '#34495e' }}>
                <h3 className="text-[#5dade2] text-xl font-semibold mb-4">Questions About Your Transaction?</h3>
                <p className="text-[#bdc3c7] mb-6">Your agent is here to help every step of the way.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href={`mailto:${client.email || 'jane.smith@example.com'}`}
                        className="bg-[#5dade2] text-[#2c3e50] font-bold px-8 py-3 rounded-lg hover:bg-[#4fa8d8] transition-colors"
                    >
                        Send Email
                    </a>
                    <a
                        href={`tel:${client.phone || '5559876543'}`}
                        className="bg-[#5dade2] text-[#2c3e50] font-bold px-8 py-3 rounded-lg hover:bg-[#4fa8d8] transition-colors"
                    >
                        Call Now
                    </a>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center py-8 text-[#7f8c8d] text-sm">
                <p>© {new Date().getFullYear()} Stacked Real Estate CRM. All rights reserved.</p>
                <p className="mt-2">This portal is updated in real-time as your transaction progresses.</p>
            </footer>
        </div>
    );
}