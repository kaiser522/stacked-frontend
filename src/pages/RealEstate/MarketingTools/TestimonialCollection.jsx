import React, { useState } from "react";

export default function TestimonialCollection() {
    const [thankYou, setThankYou] = useState({
        subject: "Thank you for trusting me with your home sale!",
        clientName: "John and Sarah",
        transactionType: "sale",
        result: "a great outcome",
        agentName: "Your Name",
        phone: "(555) 123-4567",
        email: "your@email.com",
    });

    const [followUp, setFollowUp] = useState({
        subject: "Quick favor - 2 minutes to help other families?",
        clientName: "Jennifer",
        timeframe: "three weeks",
        agentName: "Your Name",
        phone: "(555) 123-4567",
        email: "your@email.com",
    });

    const downloadHTML = (content, filename) => {
        const blob = new Blob([content], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadThankYou = () => {
        const html = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>${thankYou.subject}</title></head><body>
        <div style="font-family:Arial, sans-serif; max-width:600px; margin:0 auto; line-height:1.6;">
            <div style="font-weight:bold; color:#2c3e50; margin-bottom: 15px; padding: 10px; background:#f8f9fa; border-left: 4px solid #2ecc71;">${thankYou.subject}</div>
            <div>
                <p>Dear ${thankYou.clientName},</p>
                <p>Congratulations on the successful ${thankYou.transactionType} of your home! It was such a pleasure working with you throughout this process, and I'm thrilled we achieved ${thankYou.result}.</p>
                <p>Your satisfaction is my top priority. If you have a few minutes, I would be incredibly grateful if you could share your experience by leaving a review. Your feedback helps other families find the right agent for their real estate needs.</p>
                <p><strong>Here are a few easy ways to leave a review:</strong></p>
                <ul>
                    <li><a href="#" style="color:#2ecc71;">Google Reviews</a></li>
                    <li><a href="#" style="color:#2ecc71;">Facebook</a></li>
                    <li><a href="#" style="color:#2ecc71;">Zillow</a></li>
                </ul>
                <p>Thank you again for your trust and confidence. Please don't hesitate to reach out if you need anything in the future.</p>
            </div>
            <div style="margin-top:20px; padding-top: 12px; border-top: 1px solid #ddd; color:#666;">
                <p><strong>${thankYou.agentName}</strong><br>
                Licensed Real Estate Professional<br>
                📞 ${thankYou.phone}<br>
                ✉️ ${thankYou.email}</p>
            </div>
        </div>
        </body></html>`;
        downloadHTML(html, "post-closing-thank-you-email.html");
    };

    const downloadForm = () => {
        const html = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Client Experience Survey</title></head><body>
        <div style="font-family:Arial, sans-serif; max-width:600px; margin:0 auto; line-height:1.6;">
            <h3 style="color:#2c3e50; text-align:center;">Client Experience Survey</h3>
            <p style="color:#666; text-align:center;">Your feedback helps us serve you better and helps other families find quality real estate service.</p>
            <form>
                <label>Your Name *</label><br/>
                <input style='width:100%; padding:8px; margin:6px 0;' /><br/>
                <label>Property Address</label><br/>
                <input style='width:100%; padding:8px; margin:6px 0;' /><br/>
                <label>What was the best part of working with us? *</label><br/>
                <textarea style='width:100%; padding:8px; margin:6px 0; min-height:100px;'></textarea><br/>
                <label>Would you recommend our services?</label><br/>
                <select style='width:100%; padding:8px; margin:6px 0;'>
                    <option>Absolutely!</option>
                    <option>Yes, with some reservations</option>
                    <option>Not sure</option>
                    <option>Probably not</option>
                </select>
                <button type='submit' style='margin-top:8px; background:#2ecc71; color:white; padding:10px 16px; border:none; border-radius:6px;'>Submit</button>
            </form>
        </div>
        </body></html>`;
        downloadHTML(html, "testimonial-collection-form.html");
    };

    const downloadFollowUp = () => {
        const html = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>${followUp.subject}</title></head><body>
        <div style="font-family:Arial, sans-serif; max-width:600px; margin:0 auto; line-height:1.6;">
            <div style="font-weight:bold; color:#2c3e50; margin-bottom: 15px; padding: 10px; background:#f8f9fa; border-left: 4px solid #2ecc71;">${followUp.subject}</div>
            <div>
                <p>Hi ${followUp.clientName},</p>
                <p>I hope you're loving your new home! It's been ${followUp.timeframe} since we closed, and I wanted to reach out with a small favor.</p>
                <p>Would you mind taking 2 minutes to leave a quick review? It really helps other families understand what it's like to work with me.</p>
                <ul>
                    <li><a href="#" style="color:#2ecc71;">Google Reviews</a></li>
                    <li><a href="#" style="color:#2ecc71;">Facebook</a></li>
                    <li><a href="#" style="color:#2ecc71;">Zillow</a></li>
                </ul>
                <p>Thanks so much for considering this! And as always, I'm here if you need anything or if you know anyone looking to buy or sell.</p>
            </div>
            <div style="margin-top:20px; padding-top: 12px; border-top: 1px solid #ddd; color:#666;">
                <p><strong>${followUp.agentName}</strong><br>
                Licensed Real Estate Professional<br>
                📞 ${followUp.phone}<br>
                ✉️ ${followUp.email}</p>
            </div>
        </div>
        </body></html>`;
        downloadHTML(html, "follow-up-review-request.html");
    };

    return (
        <div className="min-h-screen bg-[#3A4E5E] text-white">
            <main className="max-w-[1400px] mx-auto px-8 py-8 border-l-4 border-[#21D4C6]">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">Client Testimonial Collection Templates</h2>
                        <p className="text-[#A0B0C0] max-w-[800px]">Professional templates to gather authentic client reviews and testimonials.</p>
                    </div>
                </div>

                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                    {/* Thank You Email */}
                    <div className="bg-[#4A5E6E] rounded-xl p-6 border border-[#5A6E7E]">
                        <h3 className="text-xl font-semibold mb-4 text-[#21D4C6]">Post-Closing Thank You Email</h3>
                        <div className="bg-white text-[#2c3e50] rounded-lg p-4">
                            <div className="font-bold border-l-4 border-[#2ecc71] bg-[#f8f9fa] p-3 mb-3">{thankYou.subject}</div>
                            <div className="text-sm">
                                <p>Dear {thankYou.clientName},</p>
                                <p className="mt-2">Congratulations on the successful {thankYou.transactionType} of your home! It was a pleasure working with you, and I'm thrilled we achieved {thankYou.result}.</p>
                                <p className="mt-2">I would be grateful if you could share your experience by leaving a review to help other families.</p>
                            </div>
                            <div className="text-xs text-gray-600 mt-4 border-t pt-3">
                                <div className="font-bold">{thankYou.agentName}</div>
                                <div>📞 {thankYou.phone} • ✉️ {thankYou.email}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <input className="bg-[#2c3e50] border-2 border-[#5A6E7E] rounded px-2 py-1 text-white" value={thankYou.subject} onChange={(e) => setThankYou({ ...thankYou, subject: e.target.value })} placeholder="Subject" />
                            <input className="bg-[#2c3e50] border-2 border-[#5A6E7E] rounded px-2 py-1 text-white" value={thankYou.clientName} onChange={(e) => setThankYou({ ...thankYou, clientName: e.target.value })} placeholder="Client Name" />
                            <input className="bg-[#2c3e50] border-2 border-[#5A6E7E] rounded px-2 py-1 text-white" value={thankYou.transactionType} onChange={(e) => setThankYou({ ...thankYou, transactionType: e.target.value })} placeholder="Transaction Type" />
                            <input className="bg-[#2c3e50] border-2 border-[#5A6E7E] rounded px-2 py-1 text-white" value={thankYou.result} onChange={(e) => setThankYou({ ...thankYou, result: e.target.value })} placeholder="Result" />
                            <input className="bg-[#2c3e50] border-2 border-[#5A6E7E] rounded px-2 py-1 text-white" value={thankYou.agentName} onChange={(e) => setThankYou({ ...thankYou, agentName: e.target.value })} placeholder="Agent Name" />
                            <input className="bg-[#2c3e50] border-2 border-[#5A6E7E] rounded px-2 py-1 text-white" value={thankYou.phone} onChange={(e) => setThankYou({ ...thankYou, phone: e.target.value })} placeholder="Phone" />
                            <input className="bg-[#2c3e50] border-2 border-[#5A6E7E] rounded px-2 py-1 text-white" value={thankYou.email} onChange={(e) => setThankYou({ ...thankYou, email: e.target.value })} placeholder="Email" />
                        </div>
                        <button onClick={downloadThankYou} className="mt-4 bg-[#21D4C6] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#1BC4B6] transition">Download Email Template</button>
                    </div>

                    {/* Follow-up Email */}
                    <div className="bg-[#4A5E6E] rounded-xl p-6 border border-[#5A6E7E]">
                        <h3 className="text-xl font-semibold mb-4 text-[#21D4C6]">Follow-up Review Request</h3>
                        <div className="bg-white text-[#2c3e50] rounded-lg p-4">
                            <div className="font-bold border-l-4 border-[#2ecc71] bg-[#f8f9fa] p-3 mb-3">{followUp.subject}</div>
                            <div className="text-sm">
                                <p>Hi {followUp.clientName},</p>
                                <p className="mt-2">It's been {followUp.timeframe} since we closed. Would you mind taking 2 minutes to leave a quick review?</p>
                            </div>
                            <div className="text-xs text-gray-600 mt-4 border-t pt-3">
                                <div className="font-bold">{followUp.agentName}</div>
                                <div>📞 {followUp.phone} • ✉️ {followUp.email}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <input className="bg-[#2c3e50] border-2 border-[#5A6E7E] rounded px-2 py-1 text-white" value={followUp.subject} onChange={(e) => setFollowUp({ ...followUp, subject: e.target.value })} placeholder="Subject" />
                            <input className="bg-[#2c3e50] border-2 border-[#5A6E7E] rounded px-2 py-1 text-white" value={followUp.clientName} onChange={(e) => setFollowUp({ ...followUp, clientName: e.target.value })} placeholder="Client Name" />
                            <input className="bg-[#2c3e50] border-2 border-[#5A6E7E] rounded px-2 py-1 text-white" value={followUp.timeframe} onChange={(e) => setFollowUp({ ...followUp, timeframe: e.target.value })} placeholder="Timeframe" />
                            <input className="bg-[#2c3e50] border-2 border-[#5A6E7E] rounded px-2 py-1 text-white" value={followUp.agentName} onChange={(e) => setFollowUp({ ...followUp, agentName: e.target.value })} placeholder="Agent Name" />
                            <input className="bg-[#2c3e50] border-2 border-[#5A6E7E] rounded px-2 py-1 text-white" value={followUp.phone} onChange={(e) => setFollowUp({ ...followUp, phone: e.target.value })} placeholder="Phone" />
                            <input className="bg-[#2c3e50] border-2 border-[#5A6E7E] rounded px-2 py-1 text-white" value={followUp.email} onChange={(e) => setFollowUp({ ...followUp, email: e.target.value })} placeholder="Email" />
                        </div>
                        <button onClick={downloadFollowUp} className="mt-4 bg-[#21D4C6] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#1BC4B6] transition">Download Follow-up Email</button>
                    </div>

                    {/* Review Form */}
                    <div className="bg-[#4A5E6E] rounded-xl p-6 border border-[#5A6E7E] lg:col-span-2">
                        <h3 className="text-xl font-semibold mb-4 text-[#21D4C6]">Online Review Form (Preview)</h3>
                        <div className="bg-white rounded-lg p-6 text-[#2c3e50]">
                            <h3 className="text-center font-semibold text-lg mb-3">Client Experience Survey</h3>
                            <p className="text-center text-sm text-gray-600 mb-4">Your feedback helps us serve you better and helps other families find quality real estate service.</p>
                            <div className="grid gap-3">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Your Name</label>
                                    <input className="w-full border rounded p-2" placeholder="Enter your full name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Property Address</label>
                                    <input className="w-full border rounded p-2" placeholder="Address of property we helped you with" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">What was the best part of working with us?</label>
                                    <textarea className="w-full border rounded p-2 min-h-[100px]" placeholder="Tell us what stood out most about your experience..." />
                                </div>
                            </div>
                        </div>
                        <button onClick={downloadForm} className="mt-4 bg-[#21D4C6] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#1BC4B6] transition">Download Form Template</button>
                    </div>
                </div>
            </main>
        </div>
    );
}


