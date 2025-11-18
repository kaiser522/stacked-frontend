import React, { useState } from "react";

export default function ThankYouNoteGenerator() {
    const [noteData, setNoteData] = useState({
        recipientName: 'John and Sarah Smith',
        relationship: 'clients',
        thankReason: 'trusting me with the sale of your beautiful home',
        greeting: 'Dear John and Sarah,',
        mainMessage: `I wanted to take a moment to express my heartfelt gratitude for trusting me with the sale of your beautiful home. Working with you throughout this process has been such a pleasure, and I'm thrilled we achieved such a wonderful outcome together.

Your confidence in my abilities means the world to me, and I hope I exceeded your expectations every step of the way. It's clients like you who make my job so rewarding.`,
        closingMessage: 'Please don\'t hesitate to reach out if you need anything in the future. I\'m always here to help, and I\'d be honored to assist your friends and family with their real estate needs as well.',
        signOff: 'With sincere gratitude,',
        agentName: 'Sarah Johnson',
        agentPhone: '(555) 123-4567',
        agentEmail: 'sarah@realty.com',
        brokerage: 'Premium Real Estate'
    });

    const [selectedTemplate, setSelectedTemplate] = useState('closing');

    const templates = {
        closing: {
            icon: '🏠',
            reason: 'trusting me with the sale of your beautiful home',
            greeting: 'Dear {name},',
            message: `I wanted to take a moment to express my heartfelt gratitude for trusting me with the sale of your beautiful home. Working with you throughout this process has been such a pleasure, and I'm thrilled we achieved such a wonderful outcome together.

Your confidence in my abilities means the world to me, and I hope I exceeded your expectations every step of the way. It's clients like you who make my job so rewarding.`,
            closing: `Please don't hesitate to reach out if you need anything in the future. I'm always here to help, and I'd be honored to assist your friends and family with their real estate needs as well.`
        },
        referral: {
            icon: '🤝',
            reason: 'referring your friends to my services',
            greeting: 'Dear {name},',
            message: `Thank you so much for referring your friends to me! There is no greater compliment than when satisfied clients like you recommend my services to people you care about.

Your trust and confidence in my abilities mean everything to me. I promise to take excellent care of anyone you refer and provide them with the same level of service and dedication that you experienced.`,
            closing: `Referrals from wonderful clients like you are the foundation of my business. Thank you for thinking of me and for your continued trust.`
        },
        showing: {
            icon: '👁️',
            reason: 'taking the time to view the property with me',
            greeting: 'Dear {name},',
            message: `Thank you for taking the time to view the property with me today. I hope you found the showing informative and that the home met your expectations.

I enjoyed learning more about what you're looking for in your next home, and I'm excited to help you find the perfect property that matches all your needs and desires.`,
            closing: `If you have any questions about today's property or would like to schedule additional showings, please don't hesitate to reach out. I'm here to make your home buying journey as smooth as possible.`
        },
        listing: {
            icon: '📋',
            reason: 'choosing me to represent you in selling your home',
            greeting: 'Dear {name},',
            message: `Thank you for choosing me to represent you in the sale of your home. I'm honored that you've entrusted me with such an important transaction and milestone in your life.

I'm committed to providing you with exceptional service and marketing your property to achieve the best possible outcome. You can count on my expertise, dedication, and attention to detail throughout this process.`,
            closing: `I look forward to working with you and achieving your real estate goals. Together, we'll make this a successful and positive experience.`
        },
        meeting: {
            icon: '☕',
            reason: 'taking the time to meet with me today',
            greeting: 'Dear {name},',
            message: `Thank you for taking the time to meet with me today. I truly enjoyed our conversation and learning more about your real estate goals and timeline.

The information you shared will help me better assist you in finding the right property and ensuring a smooth transaction. I'm excited about the opportunity to work together.`,
            closing: `I'll be following up with the information we discussed and will keep you updated on any properties that match your criteria. Please feel free to reach out with any questions in the meantime.`
        },
        partner: {
            icon: '🤝',
            reason: 'your partnership and collaboration',
            greeting: 'Dear {name},',
            message: `Thank you for your excellent partnership and collaboration on our recent transaction. Working with professionals like you makes my job so much easier and more enjoyable.

Your expertise, communication, and commitment to client service truly made a difference in achieving a successful outcome. I look forward to many more opportunities to work together.`,
            closing: `Please don't hesitate to reach out if you need anything from me, and I hope we can continue to refer business to each other in the future.`
        }
    };

    const updateNoteData = (field, value) => {
        setNoteData(prev => ({ ...prev, [field]: value }));
    };

    const selectTemplate = (templateKey) => {
        setSelectedTemplate(templateKey);
        const template = templates[templateKey];

        setNoteData(prev => ({
            ...prev,
            thankReason: template.reason,
            greeting: template.greeting.replace('{name}', prev.recipientName),
            mainMessage: template.message,
            closingMessage: template.closing
        }));
    };

    const getCharacterCount = () => {
        return noteData.mainMessage.length;
    };

    const getCharacterCountColor = () => {
        const count = getCharacterCount();
        if (count > 500) return 'text-[#e74c3c]';
        if (count > 400) return 'text-[#f39c12]';
        return 'text-[#a0b4c3]';
    };

    const downloadNote = () => {
        const noteContent = document.getElementById('noteCard').outerHTML;

        const printHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You Note</title>
    <style>
        @page {
            size: 8.5in 11in;
            margin: 0.75in;
        }
        
        body { 
            font-family: 'Georgia', serif; 
            margin: 0; 
            padding: 0; 
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        
        .note-card {
            width: 6in;
            min-height: 4.5in;
            background: white;
            border-radius: 15px;
            position: relative;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            overflow: hidden;
            font-family: 'Georgia', serif;
            border: 2px solid #e9ecef;
        }

        .note-header {
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            color: white;
            padding: 25px 30px;
            text-align: center;
            position: relative;
        }

        .note-title {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 5px;
        }

        .note-subtitle {
            font-size: 14px;
            opacity: 0.9;
        }

        .decorative-accent {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 24px;
            opacity: 0.7;
        }

        .note-body {
            padding: 40px 35px;
            line-height: 1.8;
            font-size: 16px;
            color: #2c3e50;
            background: #fafafa;
        }

        .greeting {
            margin-bottom: 20px;
            font-weight: 600;
            color: #2c3e50;
        }

        .note-content {
            margin-bottom: 25px;
            text-align: justify;
        }

        .closing {
            margin-top: 30px;
            text-align: left;
        }

        .signature-line {
            margin-top: 15px;
            margin-bottom: 5px;
            font-weight: 600;
            color: #2c3e50;
        }

        .note-footer {
            background: #2c3e50;
            color: white;
            padding: 20px 35px;
            text-align: center;
            font-size: 13px;
        }

        .agent-contact {
            opacity: 0.9;
            line-height: 1.4;
        }

        @media print {
            body { 
                background: white; 
                margin: 0;
            }
            .note-card { 
                box-shadow: none; 
                border: 1px solid #ddd;
            }
        }
    </style>
</head>
<body>
    ${noteContent}
</body>
</html>`;

        const blob = new Blob([printHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'thank-you-note.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const printNote = () => {
        const printWindow = window.open('', '_blank');
        const noteContent = document.getElementById('noteCard').outerHTML;

        printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Print Thank You Note</title>
            <style>
                body { font-family: 'Georgia', serif; margin: 20px; }
                .note-card {
                    width: 6in; min-height: 4.5in; background: white; border-radius: 15px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.15); overflow: hidden; border: 2px solid #e9ecef;
                    margin: 0 auto; font-family: 'Georgia', serif;
                }
                .note-header { background: linear-gradient(135deg, #2ecc71, #27ae60); color: white; padding: 25px 30px; text-align: center; position: relative; }
                .note-title { font-size: 22px; font-weight: 700; margin-bottom: 5px; }
                .note-subtitle { font-size: 14px; opacity: 0.9; }
                .decorative-accent { position: absolute; top: 15px; right: 20px; font-size: 24px; opacity: 0.7; }
                .note-body { padding: 40px 35px; line-height: 1.8; font-size: 16px; color: #2c3e50; background: #fafafa; }
                .greeting { margin-bottom: 20px; font-weight: 600; color: #2c3e50; }
                .note-content { margin-bottom: 25px; text-align: justify; }
                .closing { margin-top: 30px; text-align: left; }
                .signature-line { margin-top: 15px; margin-bottom: 5px; font-weight: 600; color: #2c3e50; }
                .note-footer { background: #2c3e50; color: white; padding: 20px 35px; text-align: center; font-size: 13px; }
                .agent-contact { opacity: 0.9; line-height: 1.4; }
            </style>
        </head>
        <body>
            ${noteContent}
        </body>
        </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    const copyToClipboard = () => {
        const textContent = `${noteData.greeting}

${noteData.mainMessage}

${noteData.closingMessage}

${noteData.signOff}
${noteData.agentName}
${noteData.agentPhone}
${noteData.agentEmail}
${noteData.brokerage}`;

        navigator.clipboard.writeText(textContent).then(() => {
            alert('Thank you note text copied to clipboard!');
        });
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)', color: 'white', padding: '20px' }}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10 p-8 rounded-[20px] border-2 border-[#2ecc71]" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                    <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-4">
                        <div className="w-15 h-15 rounded-[15px] flex items-center justify-center text-3xl" style={{ background: '#2ecc71' }}>💌</div>
                        Thank You Note Generator
                    </h1>
                    <p className="text-xl mb-5" style={{ color: '#a0b4c3' }}>Create personalized thank you notes for clients, referrals, and business partners.</p>
                    <div className="mt-5">
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(46, 204, 113, 0.2)', color: '#2ecc71', border: '1px solid rgba(46, 204, 113, 0.3)' }}>client appreciation</span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(46, 204, 113, 0.2)', color: '#2ecc71', border: '1px solid rgba(46, 204, 113, 0.3)' }}>relationship building</span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(46, 204, 113, 0.2)', color: '#2ecc71', border: '1px solid rgba(46, 204, 113, 0.3)' }}>professional notes</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 lg:gap-8">
                    {/* Controls Panel */}
                    <div className="bg-[rgba(58,74,92,0.9)] border-2 border-[#2ecc71] rounded-[20px] p-6 h-fit lg:sticky lg:top-5">
                        <h3 className="text-2xl font-semibold mb-5 text-center" style={{ color: '#2ecc71' }}>Create Thank You Note</h3>

                        {/* Note Templates */}
                        <div className="bg-[rgba(0,0,0,0.2)] p-5 rounded-lg mb-5 border-l-4 border-[#2ecc71]">
                            <div className="text-lg font-semibold mb-4" style={{ color: '#58d68d' }}>Quick Templates</div>

                            <div className="grid grid-cols-2 gap-2.5 mb-5">
                                {[
                                    { key: 'closing', name: 'Post-Closing' },
                                    { key: 'referral', name: 'Referral' },
                                    { key: 'showing', name: 'After Showing' },
                                    { key: 'listing', name: 'New Listing' },
                                    { key: 'meeting', name: 'After Meeting' },
                                    { key: 'partner', name: 'Business Partner' }
                                ].map(template => (
                                    <button
                                        key={template.key}
                                        onClick={() => selectTemplate(template.key)}
                                        className={`p-2.5 rounded-lg text-sm text-center transition-all ${selectedTemplate === template.key
                                            ? 'bg-[#2ecc71] text-white border-[#2ecc71]'
                                            : 'bg-[rgba(46,204,113,0.2)] text-[#2ecc71] border-2 border-[rgba(46,204,113,0.3)] hover:bg-[rgba(46,204,113,0.3)] hover:border-[#2ecc71]'
                                            }`}
                                    >
                                        {template.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recipient Information */}
                        <div className="bg-[rgba(0,0,0,0.2)] p-5 rounded-lg mb-5 border-l-4 border-[#2ecc71]">
                            <div className="text-lg font-semibold mb-4" style={{ color: '#58d68d' }}>Recipient Details</div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Recipient Name</label>
                                <input
                                    type="text"
                                    value={noteData.recipientName}
                                    onChange={(e) => updateNoteData('recipientName', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#2ecc71] focus:outline-none"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Relationship/Context</label>
                                <select
                                    value={noteData.relationship}
                                    onChange={(e) => updateNoteData('relationship', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#2ecc71] focus:outline-none"
                                >
                                    <option value="clients">Clients</option>
                                    <option value="referral-source">Referral Source</option>
                                    <option value="prospects">Prospects</option>
                                    <option value="partners">Business Partners</option>
                                    <option value="colleagues">Colleagues</option>
                                    <option value="vendors">Vendors/Service Providers</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Specific Reason for Thanks</label>
                                <input
                                    type="text"
                                    value={noteData.thankReason}
                                    onChange={(e) => updateNoteData('thankReason', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#2ecc71] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Note Content */}
                        <div className="bg-[rgba(0,0,0,0.2)] p-5 rounded-lg mb-5 border-l-4 border-[#2ecc71]">
                            <div className="text-lg font-semibold mb-4" style={{ color: '#58d68d' }}>Message Content</div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Opening Greeting</label>
                                <input
                                    type="text"
                                    value={noteData.greeting}
                                    onChange={(e) => updateNoteData('greeting', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#2ecc71] focus:outline-none"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Main Message</label>
                                <textarea
                                    value={noteData.mainMessage}
                                    onChange={(e) => updateNoteData('mainMessage', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#2ecc71] focus:outline-none resize-vertical min-h-[80px]"
                                />
                                <div className={`text-xs text-right mt-1 ${getCharacterCountColor()}`}>
                                    Character count: {getCharacterCount()}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Closing Statement</label>
                                <textarea
                                    value={noteData.closingMessage}
                                    onChange={(e) => updateNoteData('closingMessage', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#2ecc71] focus:outline-none resize-vertical min-h-[80px]"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Sign-off</label>
                                <select
                                    value={noteData.signOff}
                                    onChange={(e) => updateNoteData('signOff', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#2ecc71] focus:outline-none"
                                >
                                    <option value="With sincere gratitude,">With sincere gratitude,</option>
                                    <option value="Warmest regards,">Warmest regards,</option>
                                    <option value="With appreciation,">With appreciation,</option>
                                    <option value="Thank you again,">Thank you again,</option>
                                    <option value="Gratefully yours,">Gratefully yours,</option>
                                    <option value="Best regards,">Best regards,</option>
                                </select>
                            </div>
                        </div>

                        {/* Agent Information */}
                        <div className="bg-[rgba(0,0,0,0.2)] p-5 rounded-lg mb-5 border-l-4 border-[#2ecc71]">
                            <div className="text-lg font-semibold mb-4" style={{ color: '#58d68d' }}>Your Information</div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Your Name</label>
                                <input
                                    type="text"
                                    value={noteData.agentName}
                                    onChange={(e) => updateNoteData('agentName', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#2ecc71] focus:outline-none"
                                />
                            </div>

                            <div className="flex gap-2.5 mb-4">
                                <div className="flex-1">
                                    <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Phone</label>
                                    <input
                                        type="text"
                                        value={noteData.agentPhone}
                                        onChange={(e) => updateNoteData('agentPhone', e.target.value)}
                                        className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#2ecc71] focus:outline-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Email</label>
                                    <input
                                        type="text"
                                        value={noteData.agentEmail}
                                        onChange={(e) => updateNoteData('agentEmail', e.target.value)}
                                        className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#2ecc71] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Brokerage</label>
                                <input
                                    type="text"
                                    value={noteData.brokerage}
                                    onChange={(e) => updateNoteData('brokerage', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#2ecc71] focus:outline-none"
                                />
                            </div>
                        </div>

                        <button
                            onClick={downloadNote}
                            className="w-full p-3 bg-[#2ecc71] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-[#27ae60] hover:-translate-y-0.5 mb-2"
                        >
                            Download Thank You Note
                        </button>
                        <button
                            onClick={printNote}
                            className="w-full p-3 bg-[#2ecc71] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-[#27ae60] hover:-translate-y-0.5 mb-2"
                        >
                            Print Note
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className="w-full p-3 bg-[#2ecc71] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-[#27ae60] hover:-translate-y-0.5"
                        >
                            Copy Text
                        </button>
                    </div>

                    {/* Preview Panel */}
                    <div className="bg-white rounded-[15px] text-[#333] shadow-2xl overflow-hidden flex justify-center items-center p-4 sm:p-6 lg:p-10 min-h-[400px] lg:min-h-[600px]">
                        <div
                            className="w-full max-w-[600px] bg-white rounded-[15px] relative shadow-2xl overflow-hidden font-serif border-2 border-[#e9ecef]"
                            id="noteCard"
                        >
                            <div className="bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white p-6 text-center relative">
                                <div className="absolute top-4 right-5 text-2xl opacity-70">{templates[selectedTemplate]?.icon || '💝'}</div>
                                <div className="text-2xl font-bold mb-1">Thank You</div>
                                <div className="text-sm opacity-90">A heartfelt message of appreciation</div>
                            </div>

                            <div className="p-10 leading-relaxed text-base text-[#2c3e50] bg-[#fafafa]">
                                <div className="mb-5 font-semibold text-[#2c3e50]">{noteData.greeting}</div>

                                <div className="mb-6 text-justify" dangerouslySetInnerHTML={{ __html: noteData.mainMessage.replace(/\n/g, '<br>') }} />

                                <div className="mb-6 text-justify" dangerouslySetInnerHTML={{ __html: noteData.closingMessage.replace(/\n/g, '<br>') }} />

                                <div className="mt-8 text-left">
                                    <div>{noteData.signOff}</div>
                                    <div className="mt-4 font-semibold text-[#2c3e50]">{noteData.agentName}</div>
                                </div>
                            </div>

                            <div className="bg-[#2c3e50] text-white p-5 text-center text-sm">
                                <div className="opacity-90 mb-1">Licensed Real Estate Professional</div>
                                <div className="opacity-90 mb-1">📞 {noteData.agentPhone} | ✉️ {noteData.agentEmail}</div>
                                <div className="opacity-90">{noteData.brokerage}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


