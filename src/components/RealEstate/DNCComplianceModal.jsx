import React, { useState } from 'react';
import {
    Shield,
    AlertTriangle,
    CheckCircle,
    X,
    Phone,
    MessageSquare,
    Clock,
    FileText,
    Scale,
    Gavel,
    DollarSign,
    Check,
    ExternalLink
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

const DNCComplianceModal = ({ isOpen, onClose, onAccept, contact, phoneNumber }) => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [readGuide, setReadGuide] = useState(false);

    const handleAccept = () => {
        if (acceptedTerms && readGuide) {
            onAccept();
            onClose();
        }
    };

    const compliancePoints = [
        {
            icon: <Shield className="w-5 h-5" />,
            title: "DNC Registry Compliance",
            description: "I confirm that I have checked the National Do Not Call Registry and scrubbed my contact list within the last 31 days."
        },
        {
            icon: <Clock className="w-5 h-5" />,
            title: "Time Restrictions",
            description: "I will only call between 8:00 AM and 9:00 PM in the recipient's local time zone."
        },
        {
            icon: <FileText className="w-5 h-5" />,
            title: "Consent Requirements",
            description: "I have proper written consent for autodialed calls to cell phones or will use manual dialing."
        },
        {
            icon: <MessageSquare className="w-5 h-5" />,
            title: "Opt-Out Compliance",
            description: "I will immediately honor any request to stop calling and add the number to my suppression list."
        }
    ];

    const penalties = [
        { violation: "TCPA Violations", amount: "Up to $46,517 per call" },
        { violation: "DNC Registry Violations", amount: "Up to $43,792 per call" },
        { violation: "Text Message Violations", amount: "Up to $1,500 per text" }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--medium-dark)] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-[var(--primary-color)]">
                {/* Header */}
                <div className="p-6 border-b border-[var(--primary-color)] bg-gradient-to-r from-[rgba(59,130,246,0.1)] to-[rgba(16,185,129,0.1)]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[var(--primary-color)] rounded-xl flex items-center justify-center">
                                <Scale className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">DNC Compliance Acknowledgment</h2>
                                <p className="text-gray-400">Legal requirements for calling and texting</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-[var(--lighter-dark)] rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Contact Info */}
                {contact && (
                    <div className="p-6 border-b border-[var(--primary-color)] bg-[rgba(30,41,59,0.5)]">
                        <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-semibold">
                                {contact.firstName?.charAt(0) || '?'}
                            </div>
                            <div>
                                <div className="text-white font-medium">{contact.firstName} {contact.lastName}</div>
                                <div className="text-blue-400 font-mono">{phoneNumber}</div>
                                {contact.email && (
                                    <div className="text-gray-400 text-sm">{contact.email}</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Warning */}
                <div className="p-6 border-b border-[var(--primary-color)]">
                    <div className="bg-gradient-to-r from-[rgba(245,158,11,0.2)] to-[rgba(217,119,6,0.2)] border border-yellow-400 rounded-xl p-6 text-center">
                        <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-yellow-400 mb-2">
                            ⚠️ Legal Compliance Required
                        </h3>
                        <p className="text-gray-300 mb-4">
                            You are about to initiate a call that must comply with federal and state Do Not Call regulations.
                            Violations can result in penalties of up to $46,517 per illegal call.
                        </p>
                        <div className="text-yellow-400 font-bold text-lg">
                            You are personally responsible for compliance
                        </div>
                    </div>
                </div>

                {/* Compliance Points */}
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Compliance Requirements</h3>
                    <div className="space-y-4">
                        {compliancePoints.map((point, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-[rgba(30,41,59,0.5)] rounded-lg border border-[var(--primary-color)]/30">
                                <div className="text-[var(--primary-color)] mt-1">
                                    {point.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-white mb-1">{point.title}</h4>
                                    <p className="text-gray-300 text-sm">{point.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Penalties */}
                <div className="p-6 border-t border-[var(--primary-color)]">
                    <h3 className="text-lg font-semibold text-white mb-4">Potential Penalties</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {penalties.map((penalty, index) => (
                            <div key={index} className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-center">
                                <DollarSign className="w-8 h-8 text-red-400 mx-auto mb-2" />
                                <div className="text-red-400 font-bold text-sm">{penalty.violation}</div>
                                <div className="text-white font-semibold">{penalty.amount}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legal Resources */}
                <div className="p-6 border-t border-[var(--primary-color)]">
                    <h3 className="text-lg font-semibold text-white mb-4">Legal Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[rgba(99,102,241,0.15)] border border-indigo-500 rounded-lg p-4">
                            <h4 className="text-indigo-400 font-semibold mb-2">Government Resources</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                                <li>• FTC DNC Registry: donotcall.gov</li>
                                <li>• FCC TCPA Rules</li>
                                <li>• State DNC Registries</li>
                            </ul>
                        </div>
                        <div className="bg-[rgba(168,85,247,0.15)] border border-purple-500 rounded-lg p-4">
                            <h4 className="text-purple-400 font-semibold mb-2">Legal Support</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                                <li>• TCPA Defense Attorneys</li>
                                <li>• NAR Legal Hotline</li>
                                <li>• Compliance Consultants</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Acknowledgment */}
                <div className="p-6 border-t border-[var(--primary-color)] bg-[rgba(30,41,59,0.5)]">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="readGuide"
                                checked={readGuide}
                                onChange={(e) => setReadGuide(e.target.checked)}
                                className="mt-1 transform scale-125"
                            />
                            <label htmlFor="readGuide" className="text-gray-300 cursor-pointer">
                                I have read and understand the DNC compliance requirements and legal obligations.
                            </label>
                        </div>

                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="acceptedTerms"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                className="mt-1 transform scale-125"
                            />
                            <label htmlFor="acceptedTerms" className="text-gray-300 cursor-pointer">
                                I acknowledge that I am personally responsible for compliance with all applicable laws and regulations,
                                and that I will be liable for any violations.
                            </label>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 border-t border-[var(--primary-color)] flex gap-4 justify-end">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                        Cancel Call
                    </Button>
                    <Button
                        onClick={() => window.open('/realestate/dnc-compliance', '_blank')}
                        variant="outline"
                        className="border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
                    >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Full Guide
                    </Button>
                    <Button
                        onClick={handleAccept}
                        disabled={!acceptedTerms || !readGuide}
                        className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept & Proceed
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DNCComplianceModal;
