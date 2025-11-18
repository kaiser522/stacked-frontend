import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ClientImport() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showProFeatures, setShowProFeatures] = useState(false);
    const [showResources, setShowResources] = useState(false);
    const [emailSequences, setEmailSequences] = useState({
        marketUpdates: true,
        propertyInsights: true,
        sellingTips: true,
        seasonalTips: false
    });

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.name.match(/\.(csv|xlsx|xls)$/)) {
            setUploadedFile(file);
        } else {
            alert('Please upload a CSV or Excel file');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
        if (file && file.name.match(/\.(csv|xlsx|xls)$/)) {
            setUploadedFile(file);
        } else {
            toast.error('Please upload a CSV or Excel file');
        }
        }
    };

    const handleUpload = () => {
        // Simulate upload process
        setTimeout(() => {
            setShowSuccess(true);
        }, 2000);
    };

    const handleEmailSequenceChange = (sequence) => {
        setEmailSequences(prev => ({
            ...prev,
            [sequence]: !prev[sequence]
        }));
    };

    const enrollInEmails = () => {
        toast.success('Your leads have been enrolled in the selected email sequences. They will receive regular market updates and valuable insights to keep you top-of-mind.');
    };

    const resources = [
        {
            title: "📊 PropStream - Property Data",
            description: "Access comprehensive property data, owner information, and market analytics",
            link: "https://propstream.com"
        },
        {
            title: "🔍 SkipMatrix - Skip Tracing",
            description: "Professional skip tracing service to find phone numbers and email addresses",
            link: "https://skipmatrix.com"
        },
        {
            title: "📱 CallRail - Call Tracking",
            description: "Track phone calls from your marketing campaigns and measure ROI",
            link: "https://callrail.com"
        },
        {
            title: "📧 Mailchimp - Email Marketing",
            description: "Advanced email marketing platform for larger campaigns and automation",
            link: "https://mailchimp.com"
        },
        {
            title: "🏠 Zillow Premier Agent",
            description: "Generate leads through Zillow's platform and property listings",
            link: "https://zillow.com/agent-resources"
        }
    ];

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1f2e 0%, #16213e 100%)', color: '#e2e8f0' }}>
            <div className="max-w-4xl mx-auto p-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-[#60a5fa] to-[#34d399] bg-clip-text text-transparent">
                        📋 Client Import
                    </h1>
                    <p className="text-xl text-[#94a3b8] mb-4">Import your contact lists and create client profiles</p>
                    <div className="inline-block bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-6 py-2 rounded-full text-sm font-semibold">
                        Pro Plan
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-[rgba(30,41,59,0.8)] border border-[rgba(71,85,105,0.3)] rounded-2xl p-12 backdrop-blur-sm mb-8">
                    <h2 className="text-center mb-8 text-3xl text-[#60a5fa]">Choose Your Lead Source</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div
                            className={`bg-[rgba(71,85,105,0.2)] border border-[rgba(71,85,105,0.3)] rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer hover:border-[rgba(96,165,250,0.5)] hover:-translate-y-1 ${selectedOption === 'propstream' ? 'border-[#60a5fa] bg-[rgba(96,165,250,0.1)]' : ''
                                }`}
                            onClick={() => handleOptionSelect('propstream')}
                        >
                            <div className="text-5xl mb-4">🏠</div>
                            <div className="text-2xl font-bold mb-2 text-[#e2e8f0]">Need Property Data</div>
                            <div className="text-[#94a3b8] text-sm leading-relaxed">
                                I need property owner lists and contact information
                            </div>
                        </div>

                        <div
                            className={`bg-[rgba(71,85,105,0.2)] border border-[rgba(71,85,105,0.3)] rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer hover:border-[rgba(96,165,250,0.5)] hover:-translate-y-1 ${selectedOption === 'skipTrace' ? 'border-[#60a5fa] bg-[rgba(96,165,250,0.1)]' : ''
                                }`}
                            onClick={() => handleOptionSelect('skipTrace')}
                        >
                            <div className="text-5xl mb-4">🔍</div>
                            <div className="text-2xl font-bold mb-2 text-[#e2e8f0]">Need Contact Info</div>
                            <div className="text-[#94a3b8] text-sm leading-relaxed">
                                I have names/addresses but need phone numbers and emails
                            </div>
                        </div>

                        <div
                            className={`bg-[rgba(71,85,105,0.2)] border border-[rgba(71,85,105,0.3)] rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer hover:border-[rgba(96,165,250,0.5)] hover:-translate-y-1 ${selectedOption === 'upload' ? 'border-[#60a5fa] bg-[rgba(96,165,250,0.1)]' : ''
                                }`}
                            onClick={() => handleOptionSelect('upload')}
                        >
                            <div className="text-5xl mb-4">📁</div>
                            <div className="text-2xl font-bold mb-2 text-[#e2e8f0]">Upload Existing List</div>
                            <div className="text-[#94a3b8] text-sm leading-relaxed">
                                I already have a formatted contact list ready
                            </div>
                        </div>
                    </div>
                </div>

                {/* PropStream Section */}
                {selectedOption === 'propstream' && (
                    <div className="bg-gradient-to-r from-[rgba(34,197,94,0.1)] to-[rgba(22,163,74,0.1)] border border-[rgba(34,197,94,0.3)] rounded-2xl p-8 mb-8">
                        <div className="inline-block bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            🏠 Property Data Sources
                        </div>

                        <h3 className="text-2xl font-bold text-[#22c55e] mb-4">Get Property Owner Data for Skip Tracing</h3>

                        <p className="text-[#94a3b8] mb-6 leading-relaxed">
                            You can use any list provider you want, but we recommend PropStream if you need property owner lists pulled to get skip traced. PropStream is one of the leading property databases for real estate investors.
                        </p>

                        <div className="bg-[rgba(30,41,59,0.6)] rounded-lg p-6 mb-6">
                            <h4 className="text-[#60a5fa] font-semibold mb-4">Recommended Process:</h4>
                            <ol className="text-[#94a3b8] leading-relaxed ml-6 space-y-2 list-decimal">
                                <li>Use PropStream (or any list provider) to get property owner data</li>
                                <li>Export your list with names and addresses</li>
                                <li>Upload to SkipMatrix (see option 2) to get phone numbers</li>
                                <li>Download the completed file with contact info</li>
                                <li>Upload the final file here to start dialing</li>
                            </ol>
                        </div>

                        <div className="bg-[rgba(96,165,250,0.1)] border border-[rgba(96,165,250,0.3)] rounded-lg p-6 mb-6">
                            <div className="text-2xl text-[#60a5fa] mb-2">💡</div>
                            <p className="text-[#94a3b8] mb-2">
                                <strong>Your Choice:</strong> Use any list provider
                            </p>
                            <p className="text-[#94a3b8] text-sm">
                                PropStream is just our recommendation. You can use any property data source, lead list provider, or list you already have.
                            </p>
                        </div>

                        <button
                            className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-6 py-3 rounded-xl font-bold hover:from-[#059669] hover:to-[#047857] hover:-translate-y-1 transition-all duration-300"
                            onClick={() => window.open('https://propstream.com', '_blank')}
                        >
                            🏠 Visit PropStream (Recommended)
                        </button>
                    </div>
                )}

                {/* SkipMatrix Section */}
                {selectedOption === 'skipTrace' && (
                    <div className="bg-gradient-to-r from-[rgba(245,158,11,0.1)] to-[rgba(217,119,6,0.1)] border border-[rgba(245,158,11,0.3)] rounded-2xl p-8 mb-8">
                        <div className="inline-block bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            💰 Exclusive Access
                        </div>
                        <h3 className="text-2xl font-bold text-[#f59e0b] mb-4">Get Contact Information with SkipMatrix</h3>

                        <p className="text-[#94a3b8] mb-6 leading-relaxed">
                            SkipMatrix is a professional skip tracing service that finds phone numbers and email addresses for your leads.
                            As a STACKED user, you get access to our exclusive discount code.
                        </p>

                        <div className="bg-[rgba(30,41,59,0.8)] border-2 border-[#f59e0b] rounded-xl p-6 text-center mb-6">
                            <div className="text-[#94a3b8] text-sm mb-2">Use Discount Code:</div>
                            <div className="text-3xl font-bold text-[#f59e0b] tracking-widest mb-2">STACKED</div>
                            <div className="text-[#94a3b8] text-sm">Save on every lookup</div>
                        </div>

                        <div className="bg-[rgba(30,41,59,0.6)] rounded-lg p-6 mb-6">
                            <h4 className="text-[#60a5fa] mb-4 font-semibold">Simple Process:</h4>
                            <ol className="text-[#94a3b8] leading-relaxed ml-6">
                                <li>Click the link below to visit SkipMatrix</li>
                                <li>Sign up and use code "STACKED" for discount</li>
                                <li>Upload your lead list</li>
                                <li>Wait for results (typically 1 business day)</li>
                                <li>Download the enhanced file</li>
                                <li>Come back here and upload to STACKED</li>
                            </ol>
                        </div>

                        <a
                            href="https://skipmatrix.com/signup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-[#f59e0b] border-2 border-[#f59e0b] rounded-xl font-bold hover:bg-[rgba(245,158,11,0.1)] transition-all duration-300"
                        >
                            🔗 Visit SkipMatrix
                        </a>
                    </div>
                )}

                {/* Upload Section */}
                {selectedOption === 'upload' && (
                    <div className="bg-[rgba(71,85,105,0.2)] border border-[rgba(71,85,105,0.3)] rounded-2xl p-8 mb-8">
                        <h3 className="text-2xl font-bold text-[#34d399] mb-4 text-center">📁 Upload Your Contact List</h3>

                        <p className="text-[#94a3b8] text-center mb-6">
                            Upload your CSV or Excel file with contact information to create client profiles
                        </p>

                        <div
                            className="border-2 border-dashed border-[rgba(96,165,250,0.4)] rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-[rgba(96,165,250,0.6)] hover:bg-[rgba(96,165,250,0.05)]"
                            onClick={() => document.getElementById('fileInput').click()}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <div className="text-5xl text-[#60a5fa] mb-4">📄</div>
                            <div className="text-xl font-semibold mb-2">Click to Upload File</div>
                            <div className="text-[#94a3b8] text-sm">CSV or Excel files accepted</div>
                        </div>

                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            accept=".csv,.xlsx,.xls"
                            onChange={handleFileUpload}
                        />

                        {uploadedFile && (
                            <div className="bg-[rgba(30,41,59,0.6)] rounded-lg p-4 mt-6">
                                <div className="font-semibold text-[#34d399] mb-2">
                                    📄 {uploadedFile.name}
                                </div>
                                <div className="text-[#94a3b8] text-sm mb-4">
                                    Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                </div>
                                <button
                                    className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-6 py-3 rounded-xl font-bold hover:from-[#059669] hover:to-[#047857] hover:-translate-y-1 transition-all duration-300"
                                    onClick={handleUpload}
                                >
                                    📋 Create Client Profiles
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Success Message */}
                {showSuccess && (
                    <div className="bg-gradient-to-r from-[rgba(52,211,153,0.1)] to-[rgba(16,185,129,0.1)] border border-[rgba(52,211,153,0.3)] rounded-xl p-8 text-center mb-8">
                        <div className="text-5xl mb-4">✅</div>
                        <h3 className="text-2xl font-bold text-[#34d399] mb-4">Import Complete!</h3>
                        <p className="text-[#94a3b8] mb-6">
                            Your contacts have been imported as client profiles in STACKED CRM
                        </p>
                        <button
                            className="bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white px-8 py-4 rounded-xl font-bold hover:from-[#2563eb] hover:to-[#1e40af] hover:-translate-y-1 transition-all duration-300"
                            onClick={() => setShowProFeatures(true)}
                        >
                            🚀 Configure Pro Features
                        </button>
                    </div>
                )}

                {/* Pro Email Auto-Enroll Section */}
                {showProFeatures && (
                    <div className="bg-gradient-to-r from-[rgba(139,92,246,0.1)] to-[rgba(99,102,241,0.1)] border border-[rgba(139,92,246,0.3)] rounded-2xl p-8 mb-8">
                        <div className="inline-block bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            📧 Pro Feature
                        </div>
                        <h3 className="text-2xl font-bold text-[#8b5cf6] mb-4">Auto-Enroll Email System</h3>

                        <p className="text-[#94a3b8] mb-6 leading-relaxed">
                            Automatically enroll your imported leads into email nurture sequences. Your contacts will receive valuable market updates, property insights, and selling tips to keep you top-of-mind.
                        </p>

                        <div className="bg-[rgba(30,41,59,0.6)] rounded-lg p-6 mb-6">
                            <h4 className="text-[#60a5fa] mb-4 font-semibold">Email Sequence Options:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { key: 'marketUpdates', label: 'Monthly Market Updates' },
                                    { key: 'propertyInsights', label: 'Property Value Insights' },
                                    { key: 'sellingTips', label: 'Selling Tips & Guides' },
                                    { key: 'seasonalTips', label: 'Seasonal Home Care Tips' }
                                ].map(({ key, label }) => (
                                    <label key={key} className="flex items-center text-[#e2e8f0] cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={emailSequences[key]}
                                            onChange={() => handleEmailSequenceChange(key)}
                                            className="mr-3"
                                        />
                                        {label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-6 py-3 rounded-xl font-bold hover:from-[#059669] hover:to-[#047857] hover:-translate-y-1 transition-all duration-300 mr-4"
                                onClick={enrollInEmails}
                            >
                                📧 Auto-Enroll Leads
                            </button>
                            <button
                                className="bg-transparent text-[#f59e0b] border-2 border-[#f59e0b] px-6 py-3 rounded-xl font-bold hover:bg-[rgba(245,158,11,0.1)] transition-all duration-300"
                                onClick={() => setShowResources(true)}
                            >
                                📚 View Resources
                            </button>
                        </div>
                    </div>
                )}

                {/* Recommended Resources Section */}
                {showResources && (
                    <div className="bg-[rgba(71,85,105,0.2)] border border-[rgba(71,85,105,0.3)] rounded-2xl p-8 mb-8">
                        <h3 className="text-2xl font-bold text-[#60a5fa] mb-4 text-center">📚 Recommended Resources</h3>

                        <p className="text-[#94a3b8] text-center mb-6">
                            Tools and services to enhance your real estate business
                        </p>

                        <div className="space-y-4 mb-6">
                            {resources.map((resource, index) => (
                                <div key={index} className="bg-[rgba(30,41,59,0.6)] rounded-lg p-4 border-l-4 border-[#60a5fa]">
                                    <div className="font-semibold text-[#e2e8f0] mb-2">{resource.title}</div>
                                    <div className="text-[#94a3b8] text-sm mb-2">{resource.description}</div>
                                    <a
                                        href={resource.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#60a5fa] text-sm hover:underline"
                                    >
                                        Visit {resource.title.split(' - ')[0]} →
                                    </a>
                                </div>
                            ))}
                        </div>

                        <button className="w-full bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white px-6 py-3 rounded-xl font-bold hover:from-[#2563eb] hover:to-[#1e40af] hover:-translate-y-1 transition-all duration-300">
                            👥 View My Clients
                        </button>
                    </div>
                )}

                {/* Pro Plan Features */}
                <div className="bg-gradient-to-r from-[rgba(139,92,246,0.1)] to-[rgba(99,102,241,0.1)] border border-[rgba(139,92,246,0.3)] rounded-2xl p-8">
                    <h3 className="text-3xl font-bold text-[#8b5cf6] mb-4 text-center">Pro Plan Features</h3>
                    <p className="text-[#94a3b8] mb-8 text-center text-lg">
                        Premium tools for serious real estate professionals
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {[
                            { icon: "🔧", title: "Data Cleaning", desc: "Remove bad numbers automatically" },
                            { icon: "📞", title: "Phone Verification", desc: "Test numbers before importing" },
                            { icon: "⚡", title: "Power Dialer", desc: "Triple-line dialer with local presence" }
                        ].map((feature, index) => (
                            <div key={index} className="text-center p-6">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h4 className="text-[#e2e8f0] mb-2 text-lg font-semibold">{feature.title}</h4>
                                <p className="text-[#94a3b8] text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "📧", title: "Auto-Email System", desc: "Automatic lead nurture sequences" },
                            { icon: "🤖", title: "AI Lead Scoring", desc: "Intelligent priority ranking system" },
                            // { icon: "📊", title: "Advanced Analytics", desc: "Deep performance insights & reporting" }
                        ].map((feature, index) => (
                            <div key={index} className="text-center p-6">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h4 className="text-[#e2e8f0] mb-2 text-lg font-semibold">{feature.title}</h4>
                                <p className="text-[#94a3b8] text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
