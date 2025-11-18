import React, { useState } from "react";

export default function EventInviteCards() {
    const [eventData, setEventData] = useState({
        title: 'Exclusive Open House',
        subtitle: 'Join us for a private showing',
        type: 'open-house',
        date: 'Saturday, December 14th',
        time: '2:00 PM - 4:00 PM',
        location: '123 Oak Street\nBeverly Hills, CA 90210',
        description: 'Don\'t miss this opportunity to tour this stunning 4-bedroom home in a prime location. Light refreshments will be served.',
        rsvpText: 'RSVP Required',
        rsvpInstructions: 'Call or text to reserve your spot',
        agentName: 'Sarah Johnson',
        agentPhone: '(555) 123-4567',
        agentEmail: 'sarah@realty.com',
        brokerage: 'Premium Real Estate',
        headerColor: 'linear-gradient(135deg, #667eea, #764ba2)',
        eventIcon: '🏠'
    });

    const eventTypePresets = {
        'open-house': {
            title: 'Exclusive Open House',
            subtitle: 'Join us for a private showing',
            description: 'Don\'t miss this opportunity to tour this stunning 4-bedroom home in a prime location. Light refreshments will be served.',
            rsvp: 'RSVP Recommended',
            instructions: 'Call or text for more information',
            icon: '🏠'
        },
        'client-appreciation': {
            title: 'Client Appreciation Event',
            subtitle: 'Thank you for your trust and referrals',
            description: 'Join us for an evening of appreciation with food, drinks, and networking. Bring your friends and family!',
            rsvp: 'RSVP Required',
            instructions: 'Please respond by the date above',
            icon: '🎉'
        },
        'market-update': {
            title: 'Market Update Seminar',
            subtitle: 'Current trends and opportunities',
            description: 'Get the latest insights on local real estate trends, market conditions, and investment opportunities. Q&A session included.',
            rsvp: 'RSVP Required',
            instructions: 'Limited seating - reserve your spot',
            icon: '📈'
        },
        'homebuyer-workshop': {
            title: 'First-Time Buyer Workshop',
            subtitle: 'Your guide to homeownership',
            description: 'Learn about the home buying process, financing options, and tips for first-time buyers. Free workshop with refreshments.',
            rsvp: 'RSVP Required',
            instructions: 'Free event - please register',
            icon: '🎓'
        },
        'community-event': {
            title: 'Community Gathering',
            subtitle: 'Neighbors helping neighbors',
            description: 'Join your local real estate expert and neighbors for an informal community event. Great food and conversation!',
            rsvp: 'RSVP Appreciated',
            instructions: 'Let us know you\'re coming',
            icon: '🌟'
        },
        'listing-launch': {
            title: 'New Listing Launch',
            subtitle: 'Be the first to see this incredible home',
            description: 'Exclusive preview of our newest listing before it hits the market. Professional photography and virtual tour available.',
            rsvp: 'RSVP Required',
            instructions: 'Exclusive invitation - limited spots',
            icon: '🔑'
        }
    };

    const updateEventData = (field, value) => {
        setEventData(prev => ({ ...prev, [field]: value }));
    };

    const updateEventType = (eventType) => {
        const preset = eventTypePresets[eventType];
        if (preset) {
            setEventData(prev => ({
                ...prev,
                title: preset.title,
                subtitle: preset.subtitle,
                description: preset.description,
                rsvpText: preset.rsvp,
                rsvpInstructions: preset.instructions,
                eventIcon: preset.icon,
                type: eventType
            }));
        }
    };

    const changeHeaderColor = (gradient) => {
        setEventData(prev => ({ ...prev, headerColor: gradient }));
    };

    const downloadCard = () => {
        const cardContent = document.getElementById('inviteCard').outerHTML;

        const printHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Invitation</title>
    <style>
        @page {
            size: 5in 7in;
            margin: 0.25in;
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
        
        .invite-card {
            width: 4.5in;
            height: 6.5in;
            background: white;
            border-radius: 20px;
            position: relative;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            overflow: hidden;
            font-family: 'Georgia', serif;
            border: 1px solid #ddd;
        }

        .card-header {
            padding: 40px 30px 30px;
            text-align: center;
            color: white;
            position: relative;
            background: ${eventData.headerColor};
            height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .event-title {
            font-size: 24px;
            margin-bottom: 10px;
            font-weight: 700;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }

        .event-subtitle {
            font-size: 16px;
            opacity: 0.95;
            font-style: italic;
        }

        .decorative-element {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 36px;
            opacity: 0.7;
        }

        .card-body {
            padding: 40px 30px;
            background: white;
            flex: 1;
        }

        .event-details {
            margin-bottom: 30px;
        }

        .detail-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;
            font-size: 16px;
        }

        .detail-icon {
            width: 24px;
            font-size: 18px;
            margin-right: 15px;
            color: #f093fb;
            text-align: center;
        }

        .detail-text {
            color: #2c3e50;
            font-weight: 500;
            line-height: 1.4;
        }

        .event-description {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #f093fb;
            margin: 25px 0;
            line-height: 1.6;
            color: #555;
            font-size: 15px;
        }

        .rsvp-section {
            background: linear-gradient(135deg, #f093fb, #667eea);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            margin: 20px 0;
        }

        .rsvp-text {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .rsvp-details {
            font-size: 14px;
            opacity: 0.9;
        }

        .card-footer {
            background: #2c3e50;
            color: white;
            padding: 20px 30px;
            text-align: center;
            font-size: 14px;
        }

        .agent-info {
            margin-bottom: 5px;
        }

        .agent-name {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 5px;
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
            .invite-card { 
                box-shadow: none; 
                border: 1px solid #ddd;
            }
        }
    </style>
</head>
<body>
    ${cardContent}
</body>
</html>`;

        const blob = new Blob([printHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'event-invitation.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const printCard = () => {
        const printWindow = window.open('', '_blank');
        const cardContent = document.getElementById('inviteCard').outerHTML;

        printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Print Event Invitation</title>
            <style>
                body { font-family: 'Georgia', serif; margin: 20px; }
                .invite-card {
                    width: 5in; height: 7in; background: white; border-radius: 20px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2); overflow: hidden; border: 1px solid #ddd;
                    margin: 0 auto; font-family: 'Georgia', serif;
                }
                .card-header { padding: 40px 30px 30px; text-align: center; color: white; position: relative;
                    background: ${eventData.headerColor}; height: 200px;
                    display: flex; flex-direction: column; justify-content: center;
                }
                .event-title { font-size: 24px; margin-bottom: 10px; font-weight: 700; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); }
                .event-subtitle { font-size: 16px; opacity: 0.95; font-style: italic; }
                .decorative-element { position: absolute; top: 20px; right: 20px; font-size: 36px; opacity: 0.7; }
                .card-body { padding: 40px 30px; background: white; flex: 1; }
                .event-details { margin-bottom: 30px; }
                .detail-item { display: flex; align-items: flex-start; margin-bottom: 15px; font-size: 16px; }
                .detail-icon { width: 24px; font-size: 18px; margin-right: 15px; color: #f093fb; text-align: center; }
                .detail-text { color: #2c3e50; font-weight: 500; line-height: 1.4; }
                .event-description { background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #f093fb;
                    margin: 25px 0; line-height: 1.6; color: #555; font-size: 15px;
                }
                .rsvp-section { background: linear-gradient(135deg, #f093fb, #667eea); color: white; padding: 20px;
                    border-radius: 10px; text-align: center; margin: 20px 0;
                }
                .rsvp-text { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
                .rsvp-details { font-size: 14px; opacity: 0.9; }
                .card-footer { background: #2c3e50; color: white; padding: 20px 30px; text-align: center; font-size: 14px; }
                .agent-info { margin-bottom: 5px; }
                .agent-name { font-weight: bold; font-size: 16px; margin-bottom: 5px; }
                .agent-contact { opacity: 0.9; line-height: 1.4; }
            </style>
        </head>
        <body>
            ${cardContent}
        </body>
        </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '20px' }}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10 p-8 rounded-[20px] border-2 border-[#f093fb]" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                    <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-4">
                        <div className="w-15 h-15 rounded-[15px] flex items-center justify-center text-3xl" style={{ background: '#f093fb' }}>🎉</div>
                        Event Invite Card Designer
                    </h1>
                    <p className="text-xl mb-5" style={{ color: '#a0b4c3' }}>Create professional event invitations for open houses, client events, and community gatherings.</p>
                    <div className="mt-5">
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(240, 147, 251, 0.2)', color: '#f093fb', border: '1px solid rgba(240, 147, 251, 0.3)' }}>client events</span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(240, 147, 251, 0.2)', color: '#f093fb', border: '1px solid rgba(240, 147, 251, 0.3)' }}>open houses</span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(240, 147, 251, 0.2)', color: '#f093fb', border: '1px solid rgba(240, 147, 251, 0.3)' }}>professional invites</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 lg:gap-8">
                    {/* Controls Panel */}
                    <div className="bg-[rgba(58,74,92,0.9)] border-2 border-[#f093fb] rounded-[20px] p-6 h-fit lg:sticky lg:top-5">
                        <h3 className="text-2xl font-semibold mb-5 text-center" style={{ color: '#f093fb' }}>Customize Event Invite</h3>

                        {/* Event Information */}
                        <div className="bg-[rgba(0,0,0,0.2)] p-5 rounded-lg mb-5 border-l-4 border-[#f093fb]">
                            <div className="text-lg font-semibold mb-4" style={{ color: '#f093fb' }}>Event Details</div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Event Title</label>
                                <input
                                    type="text"
                                    value={eventData.title}
                                    onChange={(e) => updateEventData('title', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Event Subtitle</label>
                                <input
                                    type="text"
                                    value={eventData.subtitle}
                                    onChange={(e) => updateEventData('subtitle', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Event Type</label>
                                <select
                                    value={eventData.type}
                                    onChange={(e) => updateEventType(e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none"
                                >
                                    <option value="open-house">Open House</option>
                                    <option value="client-appreciation">Client Appreciation Event</option>
                                    <option value="market-update">Market Update Seminar</option>
                                    <option value="homebuyer-workshop">First-Time Buyer Workshop</option>
                                    <option value="community-event">Community Event</option>
                                    <option value="listing-launch">New Listing Launch</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Date</label>
                                <input
                                    type="text"
                                    value={eventData.date}
                                    onChange={(e) => updateEventData('date', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Time</label>
                                <input
                                    type="text"
                                    value={eventData.time}
                                    onChange={(e) => updateEventData('time', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Location</label>
                                <textarea
                                    value={eventData.location}
                                    onChange={(e) => updateEventData('location', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none resize-vertical min-h-[60px]"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Event Description</label>
                                <textarea
                                    value={eventData.description}
                                    onChange={(e) => updateEventData('description', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none resize-vertical min-h-[60px]"
                                />
                            </div>
                        </div>

                        {/* RSVP Information */}
                        <div className="bg-[rgba(0,0,0,0.2)] p-5 rounded-lg mb-5 border-l-4 border-[#f093fb]">
                            <div className="text-lg font-semibold mb-4" style={{ color: '#f093fb' }}>RSVP Details</div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">RSVP Text</label>
                                <input
                                    type="text"
                                    value={eventData.rsvpText}
                                    onChange={(e) => updateEventData('rsvpText', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">RSVP Instructions</label>
                                <input
                                    type="text"
                                    value={eventData.rsvpInstructions}
                                    onChange={(e) => updateEventData('rsvpInstructions', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Agent Information */}
                        <div className="bg-[rgba(0,0,0,0.2)] p-5 rounded-lg mb-5 border-l-4 border-[#f093fb]">
                            <div className="text-lg font-semibold mb-4" style={{ color: '#f093fb' }}>Your Information</div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Agent Name</label>
                                <input
                                    type="text"
                                    value={eventData.agentName}
                                    onChange={(e) => updateEventData('agentName', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none"
                                />
                            </div>

                            <div className="flex gap-2.5 mb-4">
                                <div className="flex-1">
                                    <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Phone</label>
                                    <input
                                        type="text"
                                        value={eventData.agentPhone}
                                        onChange={(e) => updateEventData('agentPhone', e.target.value)}
                                        className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Email</label>
                                    <input
                                        type="text"
                                        value={eventData.agentEmail}
                                        onChange={(e) => updateEventData('agentEmail', e.target.value)}
                                        className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Brokerage</label>
                                <input
                                    type="text"
                                    value={eventData.brokerage}
                                    onChange={(e) => updateEventData('brokerage', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Design Options */}
                        <div className="bg-[rgba(0,0,0,0.2)] p-5 rounded-lg mb-5 border-l-4 border-[#f093fb]">
                            <div className="text-lg font-semibold mb-4" style={{ color: '#f093fb' }}>Design Options</div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Header Color Theme</label>
                                <div className="flex gap-2.5 mt-2">
                                    {[
                                        { gradient: 'linear-gradient(135deg, #667eea, #764ba2)', name: 'Purple' },
                                        { gradient: 'linear-gradient(135deg, #f093fb, #f5576c)', name: 'Pink' },
                                        { gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)', name: 'Blue' },
                                        { gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)', name: 'Green' },
                                        { gradient: 'linear-gradient(135deg, #fa709a, #fee140)', name: 'Orange' },
                                        { gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)', name: 'Mint' }
                                    ].map((color, index) => (
                                        <div
                                            key={index}
                                            className={`w-10 h-10 rounded-lg cursor-pointer border-3 transition-all ${eventData.headerColor === color.gradient ? 'border-[#f093fb]' : 'border-transparent'
                                                }`}
                                            style={{ background: color.gradient }}
                                            onClick={() => changeHeaderColor(color.gradient)}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-[#a0b4c3] font-medium text-sm">Event Icon</label>
                                <select
                                    value={eventData.eventIcon}
                                    onChange={(e) => updateEventData('eventIcon', e.target.value)}
                                    className="w-full p-2.5 border-2 border-[#5a6a7c] rounded bg-[#2c3e50] text-white text-sm focus:border-[#f093fb] focus:outline-none"
                                >
                                    <option value="🏠">🏠 House</option>
                                    <option value="🎉">🎉 Party</option>
                                    <option value="📈">📈 Market/Business</option>
                                    <option value="🎓">🎓 Education/Workshop</option>
                                    <option value="🌟">🌟 Special Event</option>
                                    <option value="🍾">🍾 Celebration</option>
                                    <option value="🔑">🔑 New Listing</option>
                                    <option value="☕">☕ Coffee/Casual</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={downloadCard}
                            className="w-full p-3 bg-[#f093fb] text-[#2c3e50] border-none rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-[#e085d8] hover:-translate-y-0.5 mb-2"
                        >
                            Download Event Invite
                        </button>
                        <button
                            onClick={printCard}
                            className="w-full p-3 bg-[#f093fb] text-[#2c3e50] border-none rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-[#e085d8] hover:-translate-y-0.5"
                        >
                            Print Invite
                        </button>
                    </div>

                    {/* Preview Panel */}
                    <div className="bg-white rounded-[15px] text-[#333] shadow-2xl overflow-hidden flex justify-center items-center p-4 sm:p-6 lg:p-10 min-h-[400px] lg:min-h-[600px]">
                        <div
                            className="w-full max-w-[500px] bg-white rounded-[20px] relative shadow-2xl overflow-hidden font-serif"
                            id="inviteCard"
                        >
                            <div
                                className="p-10 text-center text-white relative h-[200px] flex flex-col justify-center"
                                style={{ background: eventData.headerColor }}
                            >
                                <div className="absolute top-5 right-5 text-4xl opacity-70">{eventData.eventIcon}</div>
                                <div className="text-2xl mb-2 font-bold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>{eventData.title}</div>
                                <div className="text-base opacity-95 italic">{eventData.subtitle}</div>
                            </div>

                            <div className="p-10 bg-white flex-1">
                                <div className="mb-8">
                                    <div className="flex items-center mb-4 text-base">
                                        <div className="w-6 text-lg mr-4 text-[#f093fb] text-center">📅</div>
                                        <div className="text-[#2c3e50] font-medium">{eventData.date}</div>
                                    </div>
                                    <div className="flex items-center mb-4 text-base">
                                        <div className="w-6 text-lg mr-4 text-[#f093fb] text-center">⏰</div>
                                        <div className="text-[#2c3e50] font-medium">{eventData.time}</div>
                                    </div>
                                    <div className="flex items-start mb-4 text-base">
                                        <div className="w-6 text-lg mr-4 text-[#f093fb] text-center">📍</div>
                                        <div className="text-[#2c3e50] font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: eventData.location.replace(/\n/g, '<br>') }} />
                                    </div>
                                </div>

                                <div className="bg-[#f8f9fa] p-5 rounded-lg border-l-4 border-[#f093fb] my-6 leading-relaxed text-[#555] text-sm">
                                    {eventData.description}
                                </div>

                                <div className="bg-gradient-to-r from-[#f093fb] to-[#667eea] text-white p-5 rounded-lg text-center my-5">
                                    <div className="text-lg font-semibold mb-2">{eventData.rsvpText}</div>
                                    <div className="text-sm opacity-90">{eventData.rsvpInstructions}</div>
                                </div>
                            </div>

                            <div className="bg-[#2c3e50] text-white p-5 text-center text-sm">
                                <div className="mb-1">
                                    <div className="font-bold text-base mb-1">{eventData.agentName}</div>
                                    <div className="opacity-90">Licensed Real Estate Professional</div>
                                    <div className="opacity-90">📞 {eventData.agentPhone} | ✉️ {eventData.agentEmail}</div>
                                    <div className="opacity-90">{eventData.brokerage}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


