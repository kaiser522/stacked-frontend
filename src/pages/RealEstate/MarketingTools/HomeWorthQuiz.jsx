import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function HomeWorthQuiz() {
    const [quizData, setQuizData] = useState({
        title: "What's Your Home Worth?",
        subtitle: "Get an instant estimate with our quick 5-question quiz",
        ctaButton: "Get My Home Value Estimate",
        agentName: "Your Name",
        phone: "(555) 123-4567",
        email: "your@email.com",
        marketArea: "Your City"
    });

    const [selectedOptions, setSelectedOptions] = useState({});

    const questions = [
        {
            id: 1,
            text: "What type of property do you own?",
            options: ["Single Family Home", "Condominium", "Townhouse", "Multi-Family Property", "Other"]
        },
        {
            id: 2,
            text: "How many bedrooms does your home have?",
            options: ["1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5+ Bedrooms"]
        },
        {
            id: 3,
            text: "What is the approximate square footage of your home?",
            options: ["Under 1,000 sq ft", "1,000 - 1,500 sq ft", "1,500 - 2,000 sq ft", "2,000 - 3,000 sq ft", "3,000+ sq ft"]
        },
        {
            id: 4,
            text: "What is the condition of your home?",
            options: ["Move-in ready", "Some updates needed", "Major renovations needed", "Recently renovated"]
        }
    ];

    const updateQuizData = (field, value) => {
        setQuizData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const selectOption = (questionId, option) => {
        setSelectedOptions(prev => ({
            ...prev,
            [questionId]: option
        }));
    };

    const submitQuiz = () => {
        const firstName = document.getElementById('firstName')?.value;
        const lastName = document.getElementById('lastName')?.value;
        const email = document.getElementById('email')?.value;
        const phone = document.getElementById('phone')?.value;

        if (!firstName || !lastName || !email) {
            toast.error('Please fill in all required fields to get your home valuation.');
            return;
        }

        toast.success('Thank you! Your home valuation report will be emailed to you within 24 hours. We\'ll also call you soon to discuss your results.');
    };

    const downloadQuiz = () => {
        const quizHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>What's Your Home Worth? - Interactive Quiz</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
        .quiz-container { max-width: 800px; margin: 0 auto; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .quiz-header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 40px 30px; text-align: center; }
        .quiz-title { font-size: 2.2rem; font-weight: bold; margin-bottom: 10px; }
        .quiz-subtitle { font-size: 1.1rem; opacity: 0.9; }
        .quiz-body { padding: 30px; }
        .question { margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px; border-left: 5px solid #764ba2; }
        .question-number { color: #764ba2; font-weight: bold; font-size: 0.9rem; margin-bottom: 8px; }
        .question-text { font-size: 1.1rem; font-weight: 600; color: #2c3e50; margin-bottom: 15px; }
        .quiz-options { display: grid; gap: 10px; }
        .quiz-option { padding: 12px 15px; background: white; border: 2px solid #e9ecef; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; font-size: 0.95rem; }
        .quiz-option:hover { border-color: #764ba2; background: #f0f0ff; }
        .quiz-option.selected { border-color: #764ba2; background: #e8e5ff; color: #764ba2; font-weight: 600; }
        .quiz-input { width: 100%; padding: 12px; border: 2px solid #e9ecef; border-radius: 8px; font-size: 1rem; }
        .quiz-input:focus { outline: none; border-color: #764ba2; }
        .quiz-footer { background: #2c3e50; color: white; padding: 30px; text-align: center; }
        .submit-btn { background: #764ba2; color: white; padding: 15px 40px; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 600; cursor: pointer; }
        .submit-btn:hover { background: #667eea; }
        .lead-form { background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 20px 0; border: 2px solid #764ba2; }
        .lead-form h4 { color: #2c3e50; margin-bottom: 15px; text-align: center; }
        .form-row { display: flex; gap: 15px; margin-bottom: 15px; }
        .form-field { flex: 1; }
        .form-field label { display: block; margin-bottom: 5px; font-weight: 600; color: #2c3e50; font-size: 0.9rem; }
        .form-field input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 0.95rem; }
        .disclaimer { font-size: 0.8rem; color: #666; text-align: center; margin-top: 15px; font-style: italic; }
        @media (max-width: 768px) { 
            .quiz-title { font-size: 1.8rem; } 
            .quiz-body { padding: 20px; } 
            .form-row { flex-direction: column; gap: 10px; } 
        }
    </style>
</head>
<body>
    <div class="quiz-container">
        <div class="quiz-header">
            <h1 class="quiz-title">${quizData.title}</h1>
            <p class="quiz-subtitle">${quizData.subtitle}</p>
        </div>

        <div class="quiz-body">
            ${questions.map((q, idx) => `
                <div class="question">
                    <div class="question-number">Question ${q.id} of ${questions.length}</div>
                    <div class="question-text">${q.text}</div>
                    <div class="quiz-options">
                        ${q.options.map(option => `
                            <div class="quiz-option" onclick="selectOption(this)">${option}</div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}

            <div class="question">
                <div class="question-number">Question 5 of 5</div>
                <div class="question-text">What is your property address?</div>
                <input type="text" class="quiz-input" placeholder="Enter your full address for accurate valuation">
            </div>

            <div class="lead-form">
                <h4>Get Your FREE Home Valuation Report</h4>
                <div class="form-row">
                    <div class="form-field">
                        <label>First Name</label>
                        <input type="text" id="firstName" placeholder="Enter first name">
                    </div>
                    <div class="form-field">
                        <label>Last Name</label>
                        <input type="text" id="lastName" placeholder="Enter last name">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label>Email Address</label>
                        <input type="email" id="email" placeholder="Enter email address">
                    </div>
                    <div class="form-field">
                        <label>Phone Number</label>
                        <input type="tel" id="phone" placeholder="Enter phone number">
                    </div>
                </div>
                <div class="disclaimer">
                    By submitting this form, you agree to receive marketing communications from us. 
                    Your information will never be shared with third parties.
                </div>
            </div>
        </div>

        <div class="quiz-footer">
            <button class="submit-btn" onclick="submitQuiz()">${quizData.ctaButton}</button>
            <div style="margin-top: 20px; font-size: 0.9rem; opacity: 0.8;">
                <p><strong>${quizData.agentName}</strong> • Licensed Real Estate Professional</p>
                <p>📞 ${quizData.phone} • ✉️ ${quizData.email}</p>
            </div>
        </div>
    </div>
    <script>
        function selectOption(option) {
            const siblings = option.parentNode.querySelectorAll('.quiz-option');
            siblings.forEach(sibling => sibling.classList.remove('selected'));
            option.classList.add('selected');
        }
        function submitQuiz() {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            if (!firstName || !lastName || !email) {
                // Note: This is in downloaded HTML, so we'll use a simple alert fallback
                // In a real implementation, you might want to use a custom modal
                alert('Please fill in all required fields to get your home valuation.');
                return;
            }
            alert('Thank you! Your home valuation report will be emailed to you within 24 hours.');
        }
    </script>
</body>
</html>`;

        const blob = new Blob([quizHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'home-worth-quiz.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const generateLeadScript = () => {
        const scriptContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Home Valuation Quiz Follow-up Scripts</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        .script-section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #764ba2; }
        .script-title { color: #2c3e50; font-size: 1.2rem; font-weight: bold; margin-bottom: 10px; }
        .script-content { color: #555; }
        .timing { background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0; font-style: italic; }
    </style>
</head>
<body>
    <h1>Home Valuation Quiz Follow-up Scripts</h1>
    
    <div class="script-section">
        <div class="script-title">Phone Call Script (within 1 hour)</div>
        <div class="timing">Call within 60 minutes of quiz completion for best conversion</div>
        <div class="script-content">
            "Hi [First Name], this is ${quizData.agentName} from [Company]. You just completed our home valuation quiz for your property at [Address]. I wanted to personally follow up and discuss your results. Do you have a quick minute?<br><br>
            
            Based on your answers, I'm seeing an estimated value range of [Range]. However, to give you a precise valuation, I'd need to see the property in person and look at recent comparable sales. Would you be interested in a complimentary, no-obligation market analysis?"
        </div>
    </div>
    
    <div class="script-section">
        <div class="script-title">Thank You Email (immediate auto-response)</div>
        <div class="script-content">
            <strong>Subject:</strong> Your Home Valuation Results - [Address]<br><br>
            
            "Hi [First Name],<br><br>
            
            Thank you for using our home valuation quiz! Based on your responses, here's what we found:<br><br>
            
            🏠 Property Type: [Property Type]<br>
            📊 Estimated Value Range: $[Range]<br>
            📈 Market Trend: [Up/Down/Stable]<br><br>
            
            This is a preliminary estimate based on general market data. For a precise valuation, I'll need to prepare a detailed Comparative Market Analysis (CMA) that looks at recent sales of similar homes in your specific neighborhood.<br><br>
            
            I'll be calling you within the next hour to discuss these results and answer any questions you might have.<br><br>
            
            Best regards,<br>
            ${quizData.agentName}"
        </div>
    </div>
    
    <div class="script-section">
        <div class="script-title">Text Message Follow-up (Day 3)</div>
        <div class="script-content">
            "Hi [First Name], it's ${quizData.agentName}. Just wanted to check if you had any questions about your home valuation report. The market is really active right now - would love to chat about your options. Reply STOP to opt out."
        </div>
    </div>
    
    <div class="script-section">
        <div class="script-title">Week 1 Follow-up Call</div>
        <div class="script-content">
            "Hi [First Name], it's ${quizData.agentName} following up on your home valuation. I've been tracking the market in your area and noticed [specific market insight]. I'd love to schedule a time to walk through your home and provide you with an updated, detailed market analysis. When would be a good time this week?"
        </div>
    </div>
</body>
</html>`;

        const blob = new Blob([scriptContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quiz-follow-up-scripts.html';
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
                        <h2 className="text-4xl font-bold mb-2">What's Your Home Worth? Quiz Builder</h2>
                        <p className="text-[#A0B0C0] max-w-[600px]">
                            Interactive lead generation quiz that captures homeowner information while providing value.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
                    {/* Quiz Preview */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                        <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white p-8 text-center">
                            <h3 className="text-2xl font-bold mb-2">{quizData.title}</h3>
                            <p className="opacity-90">{quizData.subtitle}</p>
                        </div>

                        <div className="p-6">
                            {questions.map((question, idx) => (
                                <div key={question.id} className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-[#764ba2]">
                                    <div className="text-sm font-bold text-[#764ba2] mb-2">
                                        Question {question.id} of {questions.length}
                                    </div>
                                    <div className="font-semibold text-gray-800 mb-3">{question.text}</div>
                                    <div className="space-y-2">
                                        {question.options.map((option, optIdx) => (
                                            <div
                                                key={optIdx}
                                                className={`p-3 rounded-lg border-2 cursor-pointer transition ${selectedOptions[question.id] === option
                                                        ? 'border-[#764ba2] bg-blue-50 text-[#764ba2] font-semibold'
                                                        : 'border-gray-200 hover:border-[#764ba2] hover:bg-blue-50'
                                                    }`}
                                                onClick={() => selectOption(question.id, option)}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-[#764ba2]">
                                <div className="text-sm font-bold text-[#764ba2] mb-2">Question 5 of 5</div>
                                <div className="font-semibold text-gray-800 mb-3">What is your property address?</div>
                                <input
                                    type="text"
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#764ba2] focus:outline-none"
                                    placeholder="Enter your full address for accurate valuation"
                                />
                            </div>

                            <div className="bg-blue-50 border-2 border-[#764ba2] rounded-lg p-6 mb-6">
                                <h4 className="font-bold text-gray-800 mb-4 text-center">Get Your FREE Home Valuation Report</h4>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                                        <input type="text" id="firstName" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter first name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                                        <input type="text" id="lastName" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter last name" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                        <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter email address" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                                        <input type="tel" id="phone" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter phone number" />
                                    </div>
                                </div>
                                <div className="text-xs text-gray-600 text-center italic">
                                    By submitting this form, you agree to receive marketing communications from us.
                                    Your information will never be shared with third parties.
                                </div>
                            </div>

                            <div className="bg-gray-800 text-white p-6 text-center rounded-lg">
                                <button
                                    onClick={submitQuiz}
                                    className="bg-[#764ba2] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#667eea] transition mb-4"
                                >
                                    {quizData.ctaButton}
                                </button>
                                <div className="text-sm opacity-80">
                                    <p><strong>{quizData.agentName}</strong> • Licensed Real Estate Professional</p>
                                    <p>📞 {quizData.phone} • ✉️ {quizData.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-[#4A5E6E] rounded-xl p-6 border border-[#5A6E7E]">
                        <h3 className="text-xl font-semibold mb-6 text-[#21D4C6]">Customize Quiz</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Quiz Title</label>
                                <input
                                    type="text"
                                    value={quizData.title}
                                    onChange={(e) => updateQuizData('title', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Quiz Subtitle</label>
                                <input
                                    type="text"
                                    value={quizData.subtitle}
                                    onChange={(e) => updateQuizData('subtitle', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Call-to-Action Button</label>
                                <input
                                    type="text"
                                    value={quizData.ctaButton}
                                    onChange={(e) => updateQuizData('ctaButton', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Agent Name</label>
                                <input
                                    type="text"
                                    value={quizData.agentName}
                                    onChange={(e) => updateQuizData('agentName', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                    <input
                                        type="text"
                                        value={quizData.phone}
                                        onChange={(e) => updateQuizData('phone', e.target.value)}
                                        className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="text"
                                        value={quizData.email}
                                        onChange={(e) => updateQuizData('email', e.target.value)}
                                        className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Target Market Area</label>
                                <input
                                    type="text"
                                    value={quizData.marketArea}
                                    onChange={(e) => updateQuizData('marketArea', e.target.value)}
                                    className="w-full bg-[#2c3e50] border-2 border-[#5A6E7E] rounded-lg px-3 py-2 text-white focus:border-[#21D4C6] focus:outline-none"
                                />
                            </div>

                            <div className="pt-4 space-y-3">
                                <button
                                    onClick={downloadQuiz}
                                    className="w-full bg-[#21D4C6] text-black py-3 rounded-lg font-semibold hover:bg-[#1BC4B6] transition"
                                >
                                    Download Quiz HTML
                                </button>
                                <button
                                    onClick={generateLeadScript}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                                >
                                    Download Follow-up Scripts
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#4A5E6E] rounded-xl p-6 border border-[#5A6E7E]">
                    <h3 className="text-lg font-semibold mb-4 text-[#21D4C6]">Lead Generation Strategy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#A0B0C0]">
                        <div>
                            <h4 className="font-medium text-white mb-2">Quiz Deployment</h4>
                            <p>Embed on your website, share on social media, use in email campaigns, add to Facebook ads, or send via text message links.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-2">Follow-up Sequence</h4>
                            <p>Immediate: Auto email with preliminary estimate → Within 1 hour: Personal call → Day 1: Detailed CMA report → Day 3: Text check-in → Week 1: In-home consultation call.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-2">Lead Qualification</h4>
                            <p>Quiz responses help pre-qualify leads by property type, condition, and location before the initial conversation.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-2">Value Proposition</h4>
                            <p>Provides immediate value to homeowners while capturing their contact information and property details for follow-up.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
