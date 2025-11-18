import React, { useState } from 'react';

export default function BirthdayHolidayCards() {
    const [selectedCard, setSelectedCard] = useState('birthday');
    const [cardData, setCardData] = useState({
        birthday: {
            message: 'Happy Birthday!',
            submessage: 'Wishing you a wonderful year ahead filled with joy and happiness!',
            agentName: 'Your Name',
            phone: '(555) 123-4567',
            email: 'your@email.com',
            brokerage: 'Your Real Estate Company',
            colorTheme: 'linear-gradient(135deg, #ff9a8b, #fecfef)'
        },
        christmas: {
            message: 'Merry Christmas!',
            submessage: 'May your holidays be filled with warmth, joy, and wonderful memories with loved ones.',
            agentName: 'Your Name',
            phone: '(555) 123-4567',
            email: 'your@email.com',
            brokerage: 'Your Real Estate Company',
            colorTheme: 'linear-gradient(135deg, #2d5016, #0f2027)'
        },
        newyear: {
            message: 'Happy New Year!',
            submessage: 'Wishing you prosperity, happiness, and success in the year ahead!',
            agentName: 'Your Name',
            phone: '(555) 123-4567',
            email: 'your@email.com',
            brokerage: 'Your Real Estate Company',
            colorTheme: 'linear-gradient(135deg, #667eea, #764ba2)'
        },
        thankyou: {
            message: 'Thank You!',
            submessage: 'It\'s been one year since we worked together. Thank you for trusting me with your real estate needs!',
            agentName: 'Your Name',
            phone: '(555) 123-4567',
            email: 'your@email.com',
            brokerage: 'Your Real Estate Company',
            colorTheme: 'linear-gradient(135deg, #667eea, #764ba2)'
        }
    });

    const colorThemes = {
        birthday: [
            { name: 'Pink Gradient', value: 'linear-gradient(135deg, #ff9a8b, #fecfef)' },
            { name: 'Purple Gradient', value: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Coral Gradient', value: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'Blue Gradient', value: 'linear-gradient(135deg, #4facfe, #00f2fe)' }
        ],
        christmas: [
            { name: 'Green Gradient', value: 'linear-gradient(135deg, #2d5016, #0f2027)' },
            { name: 'Red Gradient', value: 'linear-gradient(135deg, #c31432, #240b36)' },
            { name: 'Teal Gradient', value: 'linear-gradient(135deg, #134e5e, #71b280)' },
            { name: 'Maroon Gradient', value: 'linear-gradient(135deg, #8b0000, #2e8b57)' }
        ],
        newyear: [
            { name: 'Purple Gradient', value: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Gold Gradient', value: 'linear-gradient(135deg, #ffd700, #ff8c00)' },
            { name: 'Violet Gradient', value: 'linear-gradient(135deg, #8e2de2, #4a00e0)' },
            { name: 'Orange Gradient', value: 'linear-gradient(135deg, #ff6b6b, #ee5a24)' }
        ],
        thankyou: [
            { name: 'Purple Gradient', value: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Pink Gradient', value: 'linear-gradient(135deg, #ff9a8b, #fecfef)' },
            { name: 'Mint Gradient', value: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
            { name: 'Peach Gradient', value: 'linear-gradient(135deg, #ffecd2, #fcb69f)' }
        ]
    };

    const updateCardData = (field, value) => {
        setCardData(prev => ({
            ...prev,
            [selectedCard]: {
                ...prev[selectedCard],
                [field]: value
            }
        }));
    };

    const downloadCard = (cardType) => {
        const data = cardData[cardType];
        const cardHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Greeting Card - Print Ready</title>
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
        
        .greeting-card {
            width: 4.5in;
            height: 6.5in;
            background: white;
            border-radius: 15px;
            position: relative;
            box-shadow: none;
            overflow: hidden;
            page-break-inside: avoid;
            font-family: 'Georgia', serif;
            border: 2px solid #ddd;
        }

        .card-front {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
        }

        .card-header {
            padding: 50px 40px 30px;
            text-align: center;
            color: white;
            position: relative;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: ${data.colorTheme};
        }

        .card-message {
            font-size: 28px;
            margin-bottom: 20px;
            font-weight: 600;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }

        .card-submessage {
            font-size: 18px;
            opacity: 0.95;
            font-style: italic;
            line-height: 1.4;
        }

        .card-footer {
            background: rgba(255, 255, 255, 0.95);
            padding: 25px;
            text-align: center;
            color: #333;
            font-size: 16px;
        }

        .agent-name {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 8px;
            font-size: 18px;
        }

        .agent-contact {
            color: #666;
            font-size: 14px;
            line-height: 1.5;
        }

        .decorative-element {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 32px;
            opacity: 0.7;
        }

        @media print {
            body { background: white; }
            .greeting-card { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="greeting-card">
        <div class="card-front">
            <div class="card-header">
                <div class="decorative-element">${cardType === 'birthday' ? '🎂' : cardType === 'christmas' ? '🎄' : cardType === 'newyear' ? '🎊' : '💝'}</div>
                <div class="card-message">${data.message}</div>
                <div class="card-submessage">${data.submessage}</div>
            </div>
            <div class="card-footer">
                <div class="agent-name">${data.agentName}</div>
                <div class="agent-contact">
                    📞 ${data.phone} | ✉️ ${data.email}
                </div>
                <div style="margin-top: 5px; font-size: 10px; color: #888;">
                    ${data.brokerage}
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

        const blob = new Blob([cardHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${cardType}-card.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadAllCards = () => {
        setTimeout(() => downloadCard('birthday'), 100);
        setTimeout(() => downloadCard('christmas'), 300);
        setTimeout(() => downloadCard('newyear'), 500);
        setTimeout(() => downloadCard('thankyou'), 700);
    };

    return (
        <div className="min-h-screen bg-[#3A4E5E] text-white">
            <main className="max-w-[1400px] mx-auto px-8 py-8 border-l-4 border-[#21D4C6]">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">Client Birthday & Holiday Cards</h2>
                        <p className="text-[#A0B0C0] max-w-[600px]">
                            Personal touch cards to stay connected with past clients and build lasting relationships.
                        </p>
                    </div>
                    <button
                        onClick={downloadAllCards}
                        className="bg-[#21D4C6] text-black px-6 py-3 rounded-md font-semibold hover:bg-[#1BC4B6] transition"
                    >
                        Download All Templates
                    </button>
                </div>

                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
                    {/* Card Preview */}
                    <div className="bg-white rounded-xl p-8 min-h-[500px] flex items-center justify-center">
                        <div className="w-[350px] h-[250px] bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden transform scale-90">
                            <div
                                className="w-full h-full flex flex-col"
                                style={{ background: cardData[selectedCard].colorTheme }}
                            >
                                <div className="flex-1 flex flex-col justify-center items-center text-white p-6 relative">
                                    <div className="absolute top-4 right-4 text-2xl opacity-70">
                                        {selectedCard === 'birthday' ? '🎂' :
                                            selectedCard === 'christmas' ? '🎄' :
                                                selectedCard === 'newyear' ? '🎊' : '💝'}
                                    </div>
                                    <div className="text-xl font-semibold mb-3 text-center">
                                        {cardData[selectedCard].message}
                                    </div>
                                    <div className="text-sm opacity-95 italic text-center">
                                        {cardData[selectedCard].submessage}
                                    </div>
                                </div>
                                <div className="bg-white bg-opacity-95 p-4 text-center text-gray-800">
                                    <div className="font-bold text-sm mb-1">{cardData[selectedCard].agentName}</div>
                                    <div className="text-xs text-gray-600">
                                        📞 {cardData[selectedCard].phone} | ✉️ {cardData[selectedCard].email}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {cardData[selectedCard].brokerage}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-[#4A5E6E] rounded-xl p-6 border border-[#5A6E7E]">
                        <h3 className="text-xl font-semibold mb-6 text-[#21D4C6]">Customize Card</h3>

                        {/* Card Type Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-3">Card Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { key: 'birthday', label: 'Birthday', icon: '🎂' },
                                    { key: 'christmas', label: 'Christmas', icon: '🎄' },
                                    { key: 'newyear', label: 'New Year', icon: '🎊' },
                                    { key: 'thankyou', label: 'Thank You', icon: '💝' }
                                ].map(card => (
                                    <button
                                        key={card.key}
                                        onClick={() => setSelectedCard(card.key)}
                                        className={`p-3 rounded-lg border-2 transition ${selectedCard === card.key
                                                ? 'border-[#21D4C6] bg-[#21D4C6] text-black'
                                                : 'border-[#5A6E7E] text-[#A0B0C0] hover:border-[#21D4C6]'
                                            }`}
                                    >
                                        <div className="text-lg mb-1">{card.icon}</div>
                                        <div className="text-sm font-medium">{card.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Main Message</label>
                                <input
                                    type="text"
                                    value={cardData[selectedCard].message}
                                    onChange={(e) => updateCardData('message', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Personal Message</label>
                                <textarea
                                    value={cardData[selectedCard].submessage}
                                    onChange={(e) => updateCardData('submessage', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none h-20 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Agent Name</label>
                                <input
                                    type="text"
                                    value={cardData[selectedCard].agentName}
                                    onChange={(e) => updateCardData('agentName', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                    <input
                                        type="text"
                                        value={cardData[selectedCard].phone}
                                        onChange={(e) => updateCardData('phone', e.target.value)}
                                        className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="text"
                                        value={cardData[selectedCard].email}
                                        onChange={(e) => updateCardData('email', e.target.value)}
                                        className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Company Name</label>
                                <input
                                    type="text"
                                    value={cardData[selectedCard].brokerage}
                                    onChange={(e) => updateCardData('brokerage', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Color Theme</label>
                                <div className="flex gap-2 flex-wrap">
                                    {colorThemes[selectedCard].map((theme, index) => (
                                        <button
                                            key={index}
                                            onClick={() => updateCardData('colorTheme', theme.value)}
                                            className={`w-10 h-10 rounded-lg border-2 transition ${cardData[selectedCard].colorTheme === theme.value
                                                    ? 'border-[#21D4C6]'
                                                    : 'border-gray-400'
                                                }`}
                                            style={{ background: theme.value }}
                                            title={theme.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => downloadCard(selectedCard)}
                                className="w-full bg-[#21D4C6] text-black py-3 rounded-lg font-semibold hover:bg-[#1BC4B6] transition"
                            >
                                Download {selectedCard.charAt(0).toUpperCase() + selectedCard.slice(1)} Card
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#4A5E6E] rounded-xl p-6 border border-[#5A6E7E]">
                    <h3 className="text-lg font-semibold mb-4 text-[#21D4C6]">Usage Tips</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#A0B0C0]">
                        <div>
                            <h4 className="font-medium text-white mb-2">Client Retention</h4>
                            <p>Send birthday cards to maintain relationships with past clients and generate referrals.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-2">Holiday Marketing</h4>
                            <p>Use holiday cards to stay top-of-mind during festive seasons when people think about moving.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-2">Thank You Follow-up</h4>
                            <p>Send anniversary cards to celebrate successful transactions and maintain long-term relationships.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-2">Print & Digital</h4>
                            <p>Cards are optimized for both print and digital sharing via email or social media.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
