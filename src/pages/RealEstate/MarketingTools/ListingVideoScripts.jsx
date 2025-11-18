import React, { useState } from 'react';

export default function ListingVideoScripts() {
    const [scriptData, setScriptData] = useState({
        propertyAddress: "123 Oak Street, Beverly Hills, CA",
        propertyType: "3-bedroom, 2.5-bathroom",
        neighborhood: "Beverly Hills",
        listingPrice: "$485,000",
        videoStyle: "Professional Tour",
        agentName: "Sarah Johnson",
        brokerage: "Premium Realty",
        phone: "(555) 123-4567",
        exteriorFeature1: "beautiful landscaping",
        exteriorFeature2: "a welcoming front porch",
        kitchenFeature1: "granite countertops",
        kitchenFeature2: "stainless steel appliances",
        masterFeature1: "walk-in closet"
    });

    const updateScriptData = (field, value) => {
        setScriptData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const downloadScript = () => {
        const scriptHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Script</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: white; 
            color: #333;
            line-height: 1.6;
        }
        .script-container { 
            max-width: 8.5in; 
            margin: 0 auto; 
            background: white;
        }
        .script-header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 3px solid #40e0d0;
            margin-bottom: 30px;
        }
        .script-title {
            font-size: 2rem;
            color: #2c3e50;
            margin-bottom: 10px;
            font-weight: 700;
        }
        .script-section {
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #40e0d0;
            page-break-inside: avoid;
        }
        .script-section-title {
            font-size: 1.3rem;
            color: #2c3e50;
            margin-bottom: 15px;
            font-weight: 600;
        }
        .script-content {
            line-height: 1.8;
            font-size: 1.1rem;
            color: #333;
        }
        .timing-note {
            background: #fff3cd;
            color: #856404;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
            font-style: italic;
            font-size: 0.9rem;
        }
        .cue-note {
            background: #d1ecf1;
            color: #0c5460;
            padding: 8px;
            border-radius: 5px;
            margin: 8px 0;
            font-size: 0.85rem;
            font-style: italic;
        }
        .highlight {
            background: linear-gradient(120deg, #40e0d0 0%, #40e0d0 100%);
            background-repeat: no-repeat;
            background-size: 100% 0.2em;
            background-position: 0 88%;
            font-weight: 600;
        }
        @media print {
            body { margin: 0; padding: 10mm; }
            .script-section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="script-container">
        <div class="script-header">
            <h1 class="script-title">Property Tour Video Script</h1>
            <p><strong>Property:</strong> ${scriptData.propertyAddress}</p>
            <p><strong>Duration:</strong> 2-3 minutes | <strong>Style:</strong> ${scriptData.videoStyle}</p>
        </div>

        <div class="script-section">
            <h2 class="script-section-title">Opening Hook (0:00 - 0:15)</h2>
            <div class="cue-note">[Wide exterior shot of property]</div>
            <div class="script-content">
                Welcome to this stunning <span class="highlight">${scriptData.propertyType}</span> home located in the desirable <span class="highlight">${scriptData.neighborhood}</span> neighborhood. I'm <span class="highlight">${scriptData.agentName}</span> with <span>${scriptData.brokerage}</span>, and I can't wait to show you everything this beautiful property has to offer.
            </div>
            <div class="timing-note">Timing: 15 seconds | Keep energy high and engaging</div>
        </div>

        <div class="script-section">
            <h2 class="script-section-title">Exterior Features (0:15 - 0:45)</h2>
            <div class="cue-note">[Walk around exterior, showing key features]</div>
            <div class="script-content">
                Let's start with the impressive curb appeal. This home features <span class="highlight">${scriptData.exteriorFeature1}</span> and <span class="highlight">${scriptData.exteriorFeature2}</span>. The <span class="highlight">two-car garage</span> provides excellent storage, and you'll love the <span class="highlight">spacious backyard</span> perfect for entertaining.
            </div>
            <div class="timing-note">Timing: 30 seconds | Show each feature as you mention it</div>
        </div>

        <div class="script-section">
            <h2 class="script-section-title">Main Living Areas (0:45 - 1:30)</h2>
            <div class="cue-note">[Enter home, tour living room, dining room, kitchen]</div>
            <div class="script-content">
                Step inside and you're greeted by <span class="highlight">an open floor plan</span> that's perfect for both daily living and entertaining. The living room features <span class="highlight">beautiful hardwood floors</span> and <span class="highlight">large windows</span> that flood the space with natural light.

                The heart of this home is definitely the kitchen, which boasts <span class="highlight">${scriptData.kitchenFeature1}</span>, <span class="highlight">${scriptData.kitchenFeature2}</span>, and <span class="highlight">plenty of cabinet space</span>. This is where memories are made!
            </div>
            <div class="timing-note">Timing: 45 seconds | Move smoothly between rooms</div>
        </div>

        <div class="script-section">
            <h2 class="script-section-title">Bedrooms & Bathrooms (1:30 - 2:15)</h2>
            <div class="cue-note">[Tour bedrooms and bathrooms]</div>
            <div class="script-content">
                Upstairs, you'll find the spacious master suite with <span class="highlight">${scriptData.masterFeature1}</span> and <span class="highlight">ensuite bathroom</span>. The additional bedrooms are perfect for <span class="highlight">family, guests, or a home office</span>.

                All bathrooms have been <span class="highlight">recently updated</span> with modern fixtures and finishes.
            </div>
            <div class="timing-note">Timing: 45 seconds | Highlight storage and natural light</div>
        </div>

        <div class="script-section">
            <h2 class="script-section-title">Closing & Call to Action (2:15 - 2:30)</h2>
            <div class="cue-note">[Return to living room or exterior for closing]</div>
            <div class="script-content">
                This beautiful home at <span class="highlight">${scriptData.propertyAddress}</span> is priced at <span class="highlight">${scriptData.listingPrice}</span> and won't last long in today's market. 

                If you'd like to schedule a private showing or have any questions, give me a call at <span class="highlight">${scriptData.phone}</span> or visit my website. Don't let this amazing opportunity pass you by!
            </div>
            <div class="timing-note">Timing: 15 seconds | Include clear contact information</div>
        </div>

        <div class="script-section">
            <h2 class="script-section-title">Production Notes</h2>
            <div class="script-content">
                <strong>Equipment Needed:</strong> DSLR camera or smartphone with stabilizer, external microphone, good lighting
                <br><br>
                <strong>Best Times to Film:</strong> Golden hour (1 hour before sunset) for exterior shots, well-lit daytime for interior
                <br><br>
                <strong>Key Tips:</strong>
                <ul style="margin-top: 10px; padding-left: 20px;">
                    <li>Keep camera movements smooth and steady</li>
                    <li>Film each room from multiple angles</li>
                    <li>Capture unique features and selling points</li>
                    <li>Ensure good audio quality - consider voice-over in post</li>
                    <li>Include neighborhood shots and local amenities</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>`;

        const blob = new Blob([scriptHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video-script.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-[#3A4E5E] text-white">
            <main className="max-w-[1400px] mx-auto px-8 py-8 border-l-4 border-[#21D4C6]">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">Listing Video Script Generator</h2>
                        <p className="text-[#A0B0C0] max-w-[600px]">
                            Professional video scripts for property tours and marketing videos.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
                    {/* Script Preview */}
                    <div className="bg-white rounded-xl p-6 text-gray-800 shadow-lg">
                        <div className="text-center pb-4 border-b-2 border-[#40e0d0] mb-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Property Tour Video Script</h3>
                            <p><strong>Property:</strong> {scriptData.propertyAddress}</p>
                            <p><strong>Duration:</strong> 2-3 minutes | <strong>Style:</strong> {scriptData.videoStyle}</p>
                        </div>

                        <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#40e0d0]">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">Opening Hook (0:00 - 0:15)</h4>
                                <div className="bg-blue-100 text-blue-800 p-2 rounded text-sm italic mb-2">[Wide exterior shot of property]</div>
                                <p className="text-gray-700">
                                    Welcome to this stunning <span className="bg-yellow-200 font-semibold">{scriptData.propertyType}</span> home located in the desirable <span className="bg-yellow-200 font-semibold">{scriptData.neighborhood}</span> neighborhood. I'm <span className="bg-yellow-200 font-semibold">{scriptData.agentName}</span> with <span>{scriptData.brokerage}</span>, and I can't wait to show you everything this beautiful property has to offer.
                                </p>
                                <div className="bg-yellow-100 text-yellow-800 p-2 rounded text-sm italic mt-2">Timing: 15 seconds | Keep energy high and engaging</div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#40e0d0]">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">Exterior Features (0:15 - 0:45)</h4>
                                <div className="bg-blue-100 text-blue-800 p-2 rounded text-sm italic mb-2">[Walk around exterior, showing key features]</div>
                                <p className="text-gray-700">
                                    Let's start with the impressive curb appeal. This home features <span className="bg-yellow-200 font-semibold">{scriptData.exteriorFeature1}</span> and <span className="bg-yellow-200 font-semibold">{scriptData.exteriorFeature2}</span>. The <span className="bg-yellow-200 font-semibold">two-car garage</span> provides excellent storage, and you'll love the <span className="bg-yellow-200 font-semibold">spacious backyard</span> perfect for entertaining.
                                </p>
                                <div className="bg-yellow-100 text-yellow-800 p-2 rounded text-sm italic mt-2">Timing: 30 seconds | Show each feature as you mention it</div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#40e0d0]">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">Main Living Areas (0:45 - 1:30)</h4>
                                <div className="bg-blue-100 text-blue-800 p-2 rounded text-sm italic mb-2">[Enter home, tour living room, dining room, kitchen]</div>
                                <p className="text-gray-700 mb-2">
                                    Step inside and you're greeted by <span className="bg-yellow-200 font-semibold">an open floor plan</span> that's perfect for both daily living and entertaining. The living room features <span className="bg-yellow-200 font-semibold">beautiful hardwood floors</span> and <span className="bg-yellow-200 font-semibold">large windows</span> that flood the space with natural light.
                                </p>
                                <p className="text-gray-700">
                                    The heart of this home is definitely the kitchen, which boasts <span className="bg-yellow-200 font-semibold">{scriptData.kitchenFeature1}</span>, <span className="bg-yellow-200 font-semibold">{scriptData.kitchenFeature2}</span>, and <span className="bg-yellow-200 font-semibold">plenty of cabinet space</span>. This is where memories are made!
                                </p>
                                <div className="bg-yellow-100 text-yellow-800 p-2 rounded text-sm italic mt-2">Timing: 45 seconds | Move smoothly between rooms</div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#40e0d0]">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">Closing & Call to Action (2:15 - 2:30)</h4>
                                <div className="bg-blue-100 text-blue-800 p-2 rounded text-sm italic mb-2">[Return to living room or exterior for closing]</div>
                                <p className="text-gray-700">
                                    This beautiful home at <span className="bg-yellow-200 font-semibold">{scriptData.propertyAddress}</span> is priced at <span className="bg-yellow-200 font-semibold">{scriptData.listingPrice}</span> and won't last long in today's market.

                                    If you'd like to schedule a private showing or have any questions, give me a call at <span className="bg-yellow-200 font-semibold">{scriptData.phone}</span> or visit my website. Don't let this amazing opportunity pass you by!
                                </p>
                                <div className="bg-yellow-100 text-yellow-800 p-2 rounded text-sm italic mt-2">Timing: 15 seconds | Include clear contact information</div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-[#4A5E6E] rounded-xl p-6 border border-[#5A6E7E]">
                        <h3 className="text-xl font-semibold mb-6 text-[#21D4C6]">Customize Script</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Property Address</label>
                                <input
                                    type="text"
                                    value={scriptData.propertyAddress}
                                    onChange={(e) => updateScriptData('propertyAddress', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Property Type</label>
                                <input
                                    type="text"
                                    value={scriptData.propertyType}
                                    onChange={(e) => updateScriptData('propertyType', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Neighborhood</label>
                                <input
                                    type="text"
                                    value={scriptData.neighborhood}
                                    onChange={(e) => updateScriptData('neighborhood', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Listing Price</label>
                                <input
                                    type="text"
                                    value={scriptData.listingPrice}
                                    onChange={(e) => updateScriptData('listingPrice', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Video Style</label>
                                <select
                                    value={scriptData.videoStyle}
                                    onChange={(e) => updateScriptData('videoStyle', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                >
                                    <option value="Professional Tour">Professional Tour</option>
                                    <option value="Lifestyle Video">Lifestyle Video</option>
                                    <option value="Drone Showcase">Drone Showcase</option>
                                    <option value="Walkthrough">Simple Walkthrough</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Agent Name</label>
                                <input
                                    type="text"
                                    value={scriptData.agentName}
                                    onChange={(e) => updateScriptData('agentName', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Brokerage</label>
                                <input
                                    type="text"
                                    value={scriptData.brokerage}
                                    onChange={(e) => updateScriptData('brokerage', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    value={scriptData.phone}
                                    onChange={(e) => updateScriptData('phone', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Exterior Feature 1</label>
                                <input
                                    type="text"
                                    value={scriptData.exteriorFeature1}
                                    onChange={(e) => updateScriptData('exteriorFeature1', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Exterior Feature 2</label>
                                <input
                                    type="text"
                                    value={scriptData.exteriorFeature2}
                                    onChange={(e) => updateScriptData('exteriorFeature2', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Kitchen Feature 1</label>
                                <input
                                    type="text"
                                    value={scriptData.kitchenFeature1}
                                    onChange={(e) => updateScriptData('kitchenFeature1', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Kitchen Feature 2</label>
                                <input
                                    type="text"
                                    value={scriptData.kitchenFeature2}
                                    onChange={(e) => updateScriptData('kitchenFeature2', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Master Suite Feature</label>
                                <input
                                    type="text"
                                    value={scriptData.masterFeature1}
                                    onChange={(e) => updateScriptData('masterFeature1', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div className="pt-4 space-y-3">
                                <button
                                    onClick={downloadScript}
                                    className="w-full bg-[#21D4C6] text-black py-3 rounded-lg font-semibold hover:bg-[#1BC4B6] transition"
                                >
                                    Download Script
                                </button>
                                <button
                                    onClick={() => window.print()}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    Print Script
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#4A5E6E] rounded-xl p-6 border border-[#5A6E7E]">
                    <h3 className="text-lg font-semibold mb-4 text-[#21D4C6]">Video Production Tips</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#A0B0C0]">
                        <div>
                            <h4 className="font-medium text-white mb-2">Equipment Needed</h4>
                            <p>DSLR camera or smartphone with stabilizer, external microphone, good lighting equipment, and tripod for steady shots.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-2">Best Times to Film</h4>
                            <p>Golden hour (1 hour before sunset) for exterior shots, well-lit daytime for interior shots to showcase natural light.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-2">Camera Movement</h4>
                            <p>Keep camera movements smooth and steady, film each room from multiple angles, and capture unique features and selling points.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-2">Audio Quality</h4>
                            <p>Ensure good audio quality with external microphone, consider voice-over in post-production for better sound control.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
