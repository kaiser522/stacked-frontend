import React, { useState } from "react";

export default function ClientReconnectDrip() {
    const [agentData, setAgentData] = useState({
        agentName: 'Sarah Johnson',
        agentPhone: '(555) 123-4567',
        agentEmail: 'sarah@realty.com',
        brokerage: 'Premium Real Estate'
    });

    const [clientData, setClientData] = useState({
        clientName: '',
        clientEmail: '',
        propertyAddress: '',
        closingDate: '',
        propertyType: '',
        purchasePrice: ''
    });

    const [currentSequence, setCurrentSequence] = useState(null);
    const [isSequenceReady, setIsSequenceReady] = useState(false);

    const updateAgentData = (field, value) => {
        setAgentData(prev => ({ ...prev, [field]: value }));
    };

    const updateClientData = (field, value) => {
        setClientData(prev => ({ ...prev, [field]: value }));
    };

    const generateSequence = () => {
        // Validate required fields
        if (!clientData.clientName || !clientData.clientEmail || !clientData.propertyAddress || !clientData.closingDate) {
            alert('Please fill in all required fields (marked with *)');
            return;
        }

        // Calculate send dates
        const closingDateObj = new Date(clientData.closingDate);
        const sendDates = [
            new Date(closingDateObj.getTime() + (7 * 24 * 60 * 60 * 1000)),   // Week 1
            new Date(closingDateObj.getTime() + (60 * 24 * 60 * 60 * 1000)),  // Month 2
            new Date(closingDateObj.getTime() + (120 * 24 * 60 * 60 * 1000)), // Month 4
            new Date(closingDateObj.getTime() + (180 * 24 * 60 * 60 * 1000)), // Month 6
            new Date(closingDateObj.getTime() + (270 * 24 * 60 * 60 * 1000)), // Month 9
            new Date(closingDateObj.getTime() + (365 * 24 * 60 * 60 * 1000))  // Month 12
        ];

        // Generate personalized emails
        const sequence = createEmailSequence({ ...agentData, ...clientData }, sendDates);
        setCurrentSequence(sequence);
        setIsSequenceReady(true);
    };

    const createEmailSequence = (data, dates) => {
        const firstName = data.clientName.split(' ')[0];
        const propertyShort = data.propertyAddress.split(',')[0];

        return [
            {
                number: 1,
                timing: 'Week 1 - Welcome Check-in',
                date: dates[0].toLocaleDateString(),
                type: 'Relationship',
                subject: `How are you settling into ${propertyShort}?`,
                body: `Hi ${firstName},

I hope you're loving your new ${data.propertyType.toLowerCase() || 'home'} at ${data.propertyAddress}! It's been about a week since we closed, and I wanted to check in to see how everything is going.

Have you had a chance to explore the neighborhood yet? I'd love to hear about your first impressions and any discoveries you've made.

If you have any questions about the area, need recommendations for local services, or just want to share how things are going, please don't hesitate to reach out. I'm here to help even after closing!

Congratulations again on your new home!

Best regards,
${data.agentName}
${data.agentPhone}
${data.agentEmail}
${data.brokerage}`
            },
            {
                number: 2,
                timing: 'Month 2 - Market Update',
                date: dates[1].toLocaleDateString(),
                type: 'Value',
                subject: `Market update for ${propertyShort}`,
                body: `Hi ${firstName},

I wanted to share some great news about your area! The market continues to show strong performance since you purchased your ${data.propertyType.toLowerCase() || 'home'} at ${data.propertyAddress}.

Here's what's happening in your neighborhood:
• Home values are trending upward
• Average days on market: 28 days
• Inventory remains low, creating competitive conditions
• ${data.purchasePrice ? `Your investment at ${data.purchasePrice} is performing well` : 'Your home investment is performing well'}

This market strength means you made a smart decision! The fundamentals remain solid with continued buyer demand.

If you know anyone thinking about buying or selling, this continues to be an excellent time in the market.

Best regards,
${data.agentName}
${data.agentPhone}
${data.agentEmail}
${data.brokerage}`
            },
            {
                number: 3,
                timing: 'Month 4 - Home Maintenance',
                date: dates[2].toLocaleDateString(),
                type: 'Educational',
                subject: `Spring maintenance tips for ${propertyShort}`,
                body: `Hi ${firstName},

Spring is the perfect time for some important home maintenance to protect your investment at ${data.propertyAddress}!

Here's your seasonal maintenance checklist:
🌱 Clean gutters and downspouts
🌱 Service HVAC system
🌱 Check exterior caulking and seals
🌱 Test smoke and carbon monoxide detectors
🌱 Inspect roof for winter damage
🌱 Power wash deck and walkways
${data.propertyType === 'Condominium' ? '🌱 Check with HOA about building maintenance schedules' : '🌱 Fertilize lawn and garden areas'}

${data.propertyType === 'Condominium' ? 'Since you own a condo, focus on interior items and coordinate with your HOA for exterior maintenance.' : 'Taking care of these items now prevents costly repairs later.'}

I have a trusted list of local contractors if you need recommendations for any of these tasks.

Happy spring!

Best regards,
${data.agentName}
${data.agentPhone}
${data.agentEmail}
${data.brokerage}`
            },
            {
                number: 4,
                timing: 'Month 6 - Community Connection',
                date: dates[3].toLocaleDateString(),
                type: 'Local',
                subject: `Summer events near ${data.propertyAddress.split(',')[1]?.trim() || 'your area'}`,
                body: `Hi ${firstName},

Summer is here and your neighborhood is buzzing with great activities! Here are some events happening near ${data.propertyAddress}:

🎪 Local farmers markets every Saturday
🎵 Outdoor concert series at the community center
🚴‍♀️ Neighborhood walking groups and bike rides
📚 Summer reading programs at the library
🎨 Art festivals and craft fairs

These events are wonderful ways to meet neighbors and get more connected to your community. Summer is perfect for exploring everything your area has to offer!

Have you found any favorite local spots yet? I'd love to hear about them!

Enjoy the beautiful weather!

Best regards,
${data.agentName}
${data.agentPhone}
${data.agentEmail}
${data.brokerage}`
            },
            {
                number: 5,
                timing: 'Month 9 - Check-in & Updates',
                date: dates[4].toLocaleDateString(),
                type: 'Relationship',
                subject: `How has your first year at ${propertyShort} been?`,
                body: `Hi ${firstName},

I can't believe it's been 9 months since we got the keys to your ${data.propertyType.toLowerCase() || 'home'} at ${data.propertyAddress}! Time really flies.

I'd love to hear how this year has been for you:
• What's been your favorite thing about the neighborhood?
• Have you completed any home projects or improvements?
• How are you feeling about your investment decision?

Your feedback helps me serve future clients better, and I genuinely care about your experience.

Also, if you know anyone who might be thinking about buying or selling, I'd be honored to help them too. Referrals are the highest compliment!

Looking forward to hearing from you!

Best regards,
${data.agentName}
${data.agentPhone}
${data.agentEmail}
${data.brokerage}`
            },
            {
                number: 6,
                timing: 'Month 12 - Anniversary & Referral',
                date: dates[5].toLocaleDateString(),
                type: 'Referral',
                subject: `Happy 1-year anniversary at ${propertyShort}!`,
                body: `Hi ${firstName},

Happy anniversary! It's been exactly one year since we closed on your ${data.propertyType.toLowerCase() || 'home'} at ${data.propertyAddress}. What a milestone!

I hope this first year has been everything you dreamed it would be. Homeownership is such a wonderful journey, and I'm so grateful I could be part of yours.

As we celebrate this anniversary, I wanted to share something important: the best way to thank a real estate agent is often through referrals. If you know anyone who might be thinking about buying or selling, I'd be honored to help them achieve their real estate goals too.

Your trust and satisfaction mean everything to me, and I'm committed to providing the same level of service to anyone you refer.

Thank you for choosing me as your real estate partner!

Best regards,
${data.agentName}
${data.agentPhone}
${data.agentEmail}
${data.brokerage}`
            }
        ];
    };

    const downloadSequence = () => {
        if (!currentSequence) return;

        const content = currentSequence.map(email =>
            `Email ${email.number}: ${email.timing}
Date: ${email.date}
Type: ${email.type}
Subject: ${email.subject}

${email.body}

---
`
        ).join('\n');

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `client-reconnect-sequence-${clientData.clientName.replace(/\s+/g, '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadCalendar = () => {
        if (!currentSequence) return;

        const calendarContent = currentSequence.map(email =>
            `BEGIN:VEVENT
DTSTART:${new Date(email.date).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${new Date(email.date).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${email.subject}
DESCRIPTION:${email.body.replace(/\n/g, '\\n')}
END:VEVENT`
        ).join('\n');

        const fullCalendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Client Reconnect//Email Sequence//EN
${calendarContent}
END:VCALENDAR`;

        const blob = new Blob([fullCalendar], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `client-reconnect-calendar-${clientData.clientName.replace(/\s+/g, '-')}.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const clearForm = () => {
        setClientData({
            clientName: '',
            clientEmail: '',
            propertyAddress: '',
            closingDate: '',
            propertyType: '',
            purchasePrice: ''
        });
        setCurrentSequence(null);
        setIsSequenceReady(false);
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '20px' }}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10 p-8 rounded-[20px] border-2 border-[#764ba2]" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                    <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-4">
                        <div className="w-15 h-15 rounded-[15px] flex items-center justify-center text-3xl" style={{ background: '#764ba2' }}>💧</div>
                        Client Reconnect Drip Builder
                    </h1>
                    <p className="text-xl mb-5" style={{ color: '#a0b4c3' }}>Create personalized email sequences to nurture past clients and generate referrals.</p>
                    <div className="mt-5">
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(118, 75, 162, 0.2)', color: '#764ba2', border: '1px solid rgba(118, 75, 162, 0.3)' }}>client retention</span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(118, 75, 162, 0.2)', color: '#764ba2', border: '1px solid rgba(118, 75, 162, 0.3)' }}>automated nurturing</span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(118, 75, 162, 0.2)', color: '#764ba2', border: '1px solid rgba(118, 75, 162, 0.3)' }}>referral generation</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 lg:gap-8">
                    {/* Setup Panel */}
                    <div className="bg-[rgba(58,74,92,0.9)] border-2 border-[#764ba2] rounded-[20px] p-6 h-fit lg:sticky lg:top-5">
                        <h3 className="text-2xl font-semibold mb-5 text-center" style={{ color: '#764ba2' }}>Setup Client Sequence</h3>

                        {/* Agent Information */}
                        <div className="bg-[rgba(0,0,0,0.2)] p-5 rounded-lg mb-5 border-l-4 border-[#764ba2]">
                            <div className="text-lg font-semibold mb-4" style={{ color: '#f093fb' }}>Your Information</div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Agent Name</label>
                                <input
                                    type="text"
                                    value={agentData.agentName}
                                    onChange={(e) => updateAgentData('agentName', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#764ba2] focus:outline-none"
                                />
                            </div>

                            <div className="flex gap-2.5 mb-4">
                                <div className="flex-1">
                                    <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Phone</label>
                                    <input
                                        type="text"
                                        value={agentData.agentPhone}
                                        onChange={(e) => updateAgentData('agentPhone', e.target.value)}
                                        className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#764ba2] focus:outline-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Email</label>
                                    <input
                                        type="email"
                                        value={agentData.agentEmail}
                                        onChange={(e) => updateAgentData('agentEmail', e.target.value)}
                                        className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#764ba2] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Brokerage</label>
                                <input
                                    type="text"
                                    value={agentData.brokerage}
                                    onChange={(e) => updateAgentData('brokerage', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#764ba2] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Client Information */}
                        <div className="bg-[rgba(0,0,0,0.2)] p-5 rounded-lg mb-5 border-l-4 border-[#764ba2]">
                            <div className="text-lg font-semibold mb-4" style={{ color: '#f093fb' }}>Client Details</div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Client Name <span className="text-[#e74c3c]">*</span></label>
                                <input
                                    type="text"
                                    value={clientData.clientName}
                                    onChange={(e) => updateClientData('clientName', e.target.value)}
                                    placeholder="John & Sarah Smith"
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#764ba2] focus:outline-none"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Client Email <span className="text-[#e74c3c]">*</span></label>
                                <input
                                    type="email"
                                    value={clientData.clientEmail}
                                    onChange={(e) => updateClientData('clientEmail', e.target.value)}
                                    placeholder="client@email.com"
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#764ba2] focus:outline-none"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Property Address <span className="text-[#e74c3c]">*</span></label>
                                <input
                                    type="text"
                                    value={clientData.propertyAddress}
                                    onChange={(e) => updateClientData('propertyAddress', e.target.value)}
                                    placeholder="123 Oak Street, Beverly Hills, CA"
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#764ba2] focus:outline-none"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Closing Date <span className="text-[#e74c3c]">*</span></label>
                                <input
                                    type="date"
                                    value={clientData.closingDate}
                                    onChange={(e) => updateClientData('closingDate', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#764ba2] focus:outline-none"
                                />
                            </div>

                            <div className="flex gap-2.5 mb-4">
                                <div className="flex-1">
                                    <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Property Type</label>
                                    <select
                                        value={clientData.propertyType}
                                        onChange={(e) => updateClientData('propertyType', e.target.value)}
                                        className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#764ba2] focus:outline-none"
                                    >
                                        <option value="">Select...</option>
                                        <option value="Single Family Home">Single Family</option>
                                        <option value="Condominium">Condominium</option>
                                        <option value="Townhouse">Townhouse</option>
                                        <option value="Multi-Family">Multi-Family</option>
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Purchase Price</label>
                                    <input
                                        type="text"
                                        value={clientData.purchasePrice}
                                        onChange={(e) => updateClientData('purchasePrice', e.target.value)}
                                        placeholder="$485,000"
                                        className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#764ba2] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={generateSequence}
                                className="w-full p-3 bg-[#764ba2] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-[#667eea] hover:-translate-y-0.5"
                            >
                                Generate Personalized Sequence
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="bg-[rgba(0,0,0,0.2)] p-5 rounded-lg mb-5 border-l-4 border-[#764ba2]">
                            <div className="text-lg font-semibold mb-4" style={{ color: '#f093fb' }}>Export Options</div>

                            <button
                                onClick={downloadSequence}
                                disabled={!isSequenceReady}
                                className="w-full p-3 bg-[#2ecc71] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-[#27ae60] hover:-translate-y-0.5 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Download Email Sequence
                            </button>
                            <button
                                onClick={downloadCalendar}
                                disabled={!isSequenceReady}
                                className="w-full p-3 bg-[#2ecc71] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-[#27ae60] hover:-translate-y-0.5 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Download Calendar Schedule
                            </button>
                            <button
                                onClick={clearForm}
                                className="w-full p-3 bg-[#e74c3c] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-[#c0392b] hover:-translate-y-0.5"
                            >
                                Clear Form
                            </button>

                            <div className="mt-4 text-sm text-[#a0b4c3]">
                                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${isSequenceReady ? 'bg-[#2ecc71]' : 'bg-[#f39c12]'}`}></span>
                                {isSequenceReady ? 'Sequence ready for download' : 'Fill in required fields and generate sequence to enable downloads'}
                            </div>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="bg-white rounded-[15px] text-[#333] shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white p-6 sm:p-8 text-center">
                            <h2 className="text-3xl font-bold mb-2">Email Sequence Preview</h2>
                            <p className="text-lg">12-month client nurturing campaign</p>

                            {isSequenceReady && (
                                <div className="bg-[rgba(255,255,255,0.1)] p-4 rounded-lg mt-4 text-left">
                                    <div className="mb-2"><strong>Client:</strong> {clientData.clientName}</div>
                                    <div className="mb-2"><strong>Property:</strong> {clientData.propertyAddress}</div>
                                    <div><strong>Closing Date:</strong> {new Date(clientData.closingDate).toLocaleDateString()}</div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 sm:p-6 lg:p-8 max-h-[70vh] overflow-y-auto">
                            {!isSequenceReady ? (
                                <div className="text-center text-[#666] italic py-16">
                                    <h3 className="text-2xl mb-4">👆 Enter client information above to generate personalized emails</h3>
                                    <p>Fill in the required client details and click "Generate Personalized Sequence" to see custom email content with specific send dates.</p>
                                </div>
                            ) : (
                                currentSequence?.map((email, index) => (
                                    <div key={index} className="bg-[#f8f9fa] rounded-xl mb-6 border-l-5 border-[#764ba2] shadow-lg overflow-hidden">
                                        <div className="bg-[#764ba2] text-white p-4 flex justify-between items-center">
                                            <div className="font-semibold">{email.timing}</div>
                                            <div className="bg-[rgba(255,255,255,0.2)] px-3 py-1 rounded-full text-sm">{email.type}</div>
                                        </div>
                                        <div className="p-5">
                                            <div className="bg-[#e9ecef] p-3 rounded font-bold text-[#2c3e50] mb-4">
                                                Subject: {email.subject}
                                            </div>
                                            <div className="text-[#555] leading-relaxed whitespace-pre-line">
                                                {email.body}
                                            </div>
                                            <div className="mt-4 text-sm text-[#666] font-medium">
                                                Send Date: {email.date}
                                            </div>
                                        </div>
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


