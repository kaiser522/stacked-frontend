import React, { useState, useEffect } from "react";

export default function QuickReferralTool() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [showAddForm, setShowAddForm] = useState(false);
    const [showGeneratedMessage, setShowGeneratedMessage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentContractor, setCurrentContractor] = useState(null);
    const [generatedMessage, setGeneratedMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [customContractors, setCustomContractors] = useState({});

    const [formData, setFormData] = useState({
        contractorName: "",
        companyName: "",
        phoneNumber: "",
        specialty: "",
        experience: "",
        rating: "",
        services: "",
        specialNotes: ""
    });

    // Pre-defined contractors with messages
    const contractors = {
        fencing: {
            name: "Sarah Martinez",
            company: "Boundary Masters Fencing",
            phone: "(555) 234-5678",
            category: "general",
            rating: "4.8",
            experience: "12 years experience",
            services: "Privacy fencing, chain link, vinyl fencing, gate installation, fence repair",
            message: `Hi! I hope you're loving your new home! 

I wanted to share a fantastic fencing contractor that I highly recommend:

Sarah Martinez - Boundary Masters Fencing
📞 (555) 234-5678

Sarah specializes in privacy fencing, chain link, vinyl fencing, and gate installation. She has 12 years of experience and consistently receives excellent reviews from my clients. She's licensed, insured, and provides free estimates.

Just mention that I referred you - she takes great care of my clients!

Let me know if you need any other contractor recommendations.

Best regards!`
        },
        general: {
            name: "Mike Johnson",
            company: "Premium Home Solutions",
            phone: "(555) 123-4567",
            category: "general",
            rating: "4.9",
            experience: "15+ years experience",
            services: "Kitchen remodels, bathroom renovations, home additions, flooring, drywall",
            message: `Hi! I hope you're settling in well to your new home!

I wanted to share an excellent general contractor that I highly recommend:

Mike Johnson - Premium Home Solutions
📞 (555) 123-4567

Mike specializes in kitchen remodels, bathroom renovations, home additions, and general home improvements. He has over 15 years of experience and consistently delivers high-quality work on time and on budget. He's fully licensed and insured.

Just mention that I referred you - he always takes excellent care of my clients!

Feel free to reach out if you need any other contractor recommendations.

Best regards!`
        },
        electrical: {
            name: "David Chen",
            company: "Pro Electric Services",
            phone: "(555) 345-6789",
            category: "electrical",
            rating: "4.9",
            experience: "20+ years experience",
            services: "Panel upgrades, outlet installation, smart home wiring, lighting, electrical repairs",
            message: `Hi! I hope you're enjoying your new home!

I wanted to share a top-notch electrician that I highly recommend:

David Chen - Pro Electric Services
📞 (555) 345-6789

David is a licensed master electrician with over 20 years of experience. He specializes in panel upgrades, outlet installation, smart home wiring, and all electrical repairs. He's reliable, fairly priced, and does excellent work.

Just mention that I referred you - he always takes great care of my clients!

Let me know if you need any other contractor recommendations.

Best regards!`
        },
        plumbing: {
            name: "Robert Wilson",
            company: "Wilson Plumbing Solutions",
            phone: "(555) 456-7890",
            category: "plumbing",
            rating: "4.7",
            experience: "18 years experience",
            services: "Water heater installation, drain cleaning, pipe repair, bathroom remodeling",
            message: `Hi! I hope everything is going well in your new home!

I wanted to share an excellent plumber that I highly recommend:

Robert Wilson - Wilson Plumbing Solutions
📞 (555) 456-7890

Robert is a master plumber with 18 years of experience. He specializes in water heater installation, drain cleaning, pipe repair, and bathroom remodeling. He's reliable, reasonably priced, and does quality work.

Just mention that I referred you - he always takes excellent care of my clients!

Feel free to reach out if you need any other contractor recommendations.

Best regards!`
        },
        hvac: {
            name: "Jennifer Adams",
            company: "Climate Control Experts",
            phone: "(555) 567-8901",
            category: "hvac",
            rating: "4.8",
            experience: "14 years experience",
            services: "AC installation, furnace repair, duct cleaning, energy efficiency upgrades",
            message: `Hi! I hope you're comfortable in your new home!

I wanted to share an excellent HVAC specialist that I highly recommend:

Jennifer Adams - Climate Control Experts
📞 (555) 567-8901

Jennifer has 14 years of experience and specializes in AC installation, furnace repair, duct cleaning, and energy efficiency upgrades. She's knowledgeable, reliable, and offers competitive pricing.

Just mention that I referred you - she always takes great care of my clients!

Let me know if you need any other contractor recommendations.

Best regards!`
        },
        roofing: {
            name: "Tom Rodriguez",
            company: "TopShield Roofing",
            phone: "(555) 678-9012",
            category: "roofing",
            rating: "4.9",
            experience: "22 years experience",
            services: "Roof replacement, gutter systems, leak repair, roof inspections",
            message: `Hi! I hope you're enjoying your new home!

I wanted to share an excellent roofing contractor that I highly recommend:

Tom Rodriguez - TopShield Roofing
📞 (555) 678-9012

Tom has 22 years of experience and specializes in roof replacement, gutter systems, leak repair, and roof inspections. He's reliable, uses quality materials, and provides excellent warranties on his work.

Just mention that I referred you - he always takes great care of my clients!

Feel free to reach out if you need any other contractor recommendations.

Best regards!`
        },
        landscaping: {
            name: "Maria Gonzalez",
            company: "GreenSpace Landscaping",
            phone: "(555) 789-0123",
            category: "landscaping",
            rating: "4.6",
            experience: "16 years experience",
            services: "Garden design, irrigation systems, hardscaping, tree services, lawn care",
            message: `Hi! I hope you're loving your new home!

I wanted to share an excellent landscaping professional that I highly recommend:

Maria Gonzalez - GreenSpace Landscaping
📞 (555) 789-0123

Maria is a landscape designer with 16 years of experience. She specializes in garden design, irrigation systems, hardscaping, and tree services. She creates beautiful outdoor spaces and is very reasonably priced.

Just mention that I referred you - she always takes great care of my clients!

Let me know if you need any other contractor recommendations.

Best regards!`
        },
        flooring: {
            name: "Carlos Rivera",
            company: "Premier Flooring Solutions",
            phone: "(555) 890-1234",
            category: "flooring",
            rating: "4.7",
            experience: "13 years experience",
            services: "Hardwood installation, tile work, carpet installation, floor refinishing",
            message: `Hi! I hope you're settling in well to your new home!

I wanted to share an excellent flooring specialist that I highly recommend:

Carlos Rivera - Premier Flooring Solutions
📞 (555) 890-1234

Carlos has 13 years of experience and specializes in hardwood installation, tile work, carpet installation, and floor refinishing. He does beautiful work, is very detail-oriented, and offers competitive pricing.

Just mention that I referred you - he always takes great care of my clients!

Feel free to reach out if you need any other contractor recommendations.

Best regards!`
        },
        painting: {
            name: "Lisa Thompson",
            company: "Perfect Paint Professionals",
            phone: "(555) 901-2345",
            category: "painting",
            rating: "4.8",
            experience: "11 years experience",
            services: "Interior painting, exterior painting, color consultation, specialty finishes",
            message: `Hi! I hope you're enjoying your new home!

I wanted to share an excellent painting contractor that I highly recommend:

Lisa Thompson - Perfect Paint Professionals
📞 (555) 901-2345

Lisa has 11 years of experience and specializes in interior painting, exterior painting, color consultation, and specialty finishes. She's very detail-oriented, clean, and offers color expertise to help you choose the perfect colors.

Just mention that I referred you - she always takes great care of my clients!

Let me know if you need any other contractor recommendations.

Best regards!`
        }
    };

    const categories = [
        { key: "all", label: "All" },
        { key: "general", label: "General" },
        { key: "electrical", label: "Electrical" },
        { key: "plumbing", label: "Plumbing" },
        { key: "hvac", label: "HVAC" },
        { key: "roofing", label: "Roofing" },
        { key: "landscaping", label: "Landscaping" },
        { key: "flooring", label: "Flooring" },
        { key: "painting", label: "Painting" }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const generateMessage = () => {
        if (!formData.contractorName || !formData.companyName || !formData.phoneNumber || !formData.specialty || !formData.services) {
            showSuccess('Please fill in all required fields.');
            return;
        }

        const specialtyMap = {
            'general': 'general contractor',
            'electrical': 'electrician',
            'plumbing': 'plumber',
            'hvac': 'HVAC specialist',
            'roofing': 'roofing contractor',
            'landscaping': 'landscaping professional',
            'flooring': 'flooring specialist',
            'painting': 'painting contractor',
            'other': 'contractor'
        };

        const specialtyName = specialtyMap[formData.specialty] || 'contractor';
        const experienceText = formData.experience ? ` with ${formData.experience} years of experience` : '';
        const ratingText = formData.rating ? ` and consistently receives ${formData.rating}-star reviews` : '';

        let notesSection = '';
        if (formData.specialNotes) {
            notesSection = ` ${formData.specialNotes}`;
        }

        const message = `Hi! I hope you're enjoying your new home!

I wanted to share an excellent ${specialtyName} that I highly recommend:

${formData.contractorName} - ${formData.companyName}
📞 ${formData.phoneNumber}

${formData.contractorName} specializes in ${formData.services.toLowerCase()}${experienceText}${ratingText}.${notesSection}

Just mention that I referred you - ${formData.contractorName.split(' ')[0]} always takes great care of my clients!

Feel free to reach out if you need any other contractor recommendations.

Best regards!`;

        setGeneratedMessage(message);
        setShowGeneratedMessage(true);
    };

    const saveContractor = () => {
        if (!formData.contractorName || !formData.companyName || !formData.phoneNumber || !formData.specialty || !formData.services) {
            showSuccess('Please fill in all required fields.');
            return;
        }

        const contractorId = 'custom_' + Date.now();
        const newContractor = {
            name: formData.contractorName,
            company: formData.companyName,
            phone: formData.phoneNumber,
            specialty: formData.specialty,
            experience: formData.experience,
            rating: formData.rating || '4.5',
            services: formData.services,
            notes: formData.specialNotes,
            message: generatedMessage || createAIMessage(formData),
            category: formData.specialty
        };

        setCustomContractors(prev => ({ ...prev, [contractorId]: newContractor }));
        setShowAddForm(false);
        setShowGeneratedMessage(false);
        setFormData({
            contractorName: "",
            companyName: "",
            phoneNumber: "",
            specialty: "",
            experience: "",
            rating: "",
            services: "",
            specialNotes: ""
        });
        showSuccess('Contractor saved successfully!');
    };

    const createAIMessage = (data) => {
        const specialtyMap = {
            'general': 'general contractor',
            'electrical': 'electrician',
            'plumbing': 'plumber',
            'hvac': 'HVAC specialist',
            'roofing': 'roofing contractor',
            'landscaping': 'landscaping professional',
            'flooring': 'flooring specialist',
            'painting': 'painting contractor',
            'other': 'contractor'
        };

        const specialtyName = specialtyMap[data.specialty] || 'contractor';
        const experienceText = data.experience ? ` with ${data.experience} years of experience` : '';
        const ratingText = data.rating ? ` and consistently receives ${data.rating}-star reviews` : '';

        let notesSection = '';
        if (data.specialNotes) {
            notesSection = ` ${data.specialNotes}`;
        }

        return `Hi! I hope you're enjoying your new home!

I wanted to share an excellent ${specialtyName} that I highly recommend:

${data.contractorName} - ${data.companyName}
📞 ${data.phoneNumber}

${data.contractorName} specializes in ${data.services.toLowerCase()}${experienceText}${ratingText}.${notesSection}

Just mention that I referred you - ${data.contractorName.split(' ')[0]} always takes great care of my clients!

Feel free to reach out if you need any other contractor recommendations.

Best regards!`;
    };

    const openModal = (contractorId) => {
        setCurrentContractor(contractorId);
        setShowModal(true);
    };

    const copyMessage = () => {
        const contractor = currentContractor.startsWith('custom_')
            ? customContractors[currentContractor]
            : contractors[currentContractor];

        if (contractor) {
            navigator.clipboard.writeText(contractor.message).then(() => {
                showSuccess('Message copied to clipboard!');
                setShowModal(false);
            });
        }
    };

    const copyContact = (contractorId) => {
        const contractor = contractorId.startsWith('custom_')
            ? customContractors[contractorId]
            : contractors[contractorId];

        if (contractor) {
            const contactText = `${contractor.name} - ${contractor.company}\nPhone: ${contractor.phone}`;
            navigator.clipboard.writeText(contactText).then(() => {
                showSuccess('Contact info copied to clipboard!');
            });
        }
    };

    const deleteContractor = (contractorId) => {
        if (window.confirm('Are you sure you want to delete this contractor?')) {
            setCustomContractors(prev => {
                const newContractors = { ...prev };
                delete newContractors[contractorId];
                return newContractors;
            });
            showSuccess('Contractor deleted successfully!');
        }
    };

    const shareViaEmail = () => {
        const contractor = currentContractor.startsWith('custom_')
            ? customContractors[currentContractor]
            : contractors[currentContractor];

        if (contractor) {
            const subject = `Contractor Referral: ${contractor.company}`;
            const body = encodeURIComponent(contractor.message);
            window.open(`mailto:?subject=${subject}&body=${body}`);
            setShowModal(false);
        }
    };

    const shareViaText = () => {
        const contractor = currentContractor.startsWith('custom_')
            ? customContractors[currentContractor]
            : contractors[currentContractor];

        if (contractor) {
            const message = encodeURIComponent(contractor.message);
            window.open(`sms:?body=${message}`);
            setShowModal(false);
        }
    };

    const showSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    const filteredContractors = () => {
        const allContractors = { ...contractors, ...customContractors };
        let filtered = Object.entries(allContractors);

        // Filter by category
        if (activeCategory !== 'all') {
            filtered = filtered.filter(([_, contractor]) => contractor.category === activeCategory);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(([_, contractor]) =>
                contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contractor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contractor.services.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };

    const renderContractorCard = ([id, contractor]) => (
        <div key={id} className="bg-[#34495e] rounded-lg overflow-hidden transition-all hover:transform hover:-translate-y-1 hover:shadow-lg border border-transparent hover:border-[#5dade2]">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <div className="text-lg font-bold text-white mb-1">{contractor.name}</div>
                        <div className="text-[#5dade2] text-sm mb-1">{contractor.company}</div>
                        <div className="bg-[#2c3e50] text-[#5dade2] px-2 py-1 rounded-full text-xs border border-[#5dade2] inline-block">
                            {(() => {
                                const specialty = contractor.specialty || contractor.category || "";
                                return specialty
                                    ? `${specialty.charAt(0).toUpperCase()}${specialty.slice(1)} Specialist`
                                    : "Specialist";
                            })()}
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#f39c12] text-sm ml-4">
                        ⭐ {contractor.rating}
                    </div>
                </div>
                <div className="text-[#bdc3c7] text-sm mb-4 leading-relaxed">
                    {contractor.services}
                </div>
                <div className="flex justify-between items-center bg-[#2c3e50] p-3 rounded-lg mb-4 text-sm">
                    <div className="text-[#5dade2] font-medium">{contractor.phone}</div>
                    <div className="text-[#bdc3c7]">{contractor.experience}</div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => openModal(id)}
                        className="flex-1 bg-[#5dade2] text-[#2c3e50] py-2 px-4 rounded-lg font-bold hover:bg-[#4fa8d8] transition-colors text-sm"
                    >
                        Share Referral
                    </button>
                    <button
                        onClick={() => copyContact(id)}
                        className="bg-[#34495e] text-[#5dade2] border-2 border-[#5dade2] py-2 px-4 rounded-lg hover:bg-[#5dade2] hover:text-[#2c3e50] transition-all min-w-[50px]"
                    >
                        📋
                    </button>
                    {id.startsWith('custom_') && (
                        <button
                            onClick={() => deleteContractor(id)}
                            className="bg-[#e74c3c] text-white py-2 px-4 rounded-lg hover:bg-[#c0392b] transition-colors min-w-[50px]"
                        >
                            🗑️
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen" style={{ background: '#2c3e50', color: 'white' }}>
            <div className="max-w-[1200px] mx-auto p-8">
                {/* Header */}
                <div className="text-center mb-8 pb-6 border-b border-[#34495e]">
                    <h1 className="text-3xl font-bold text-[#5dade2] mb-2">Quick Referral Tool</h1>
                    <p className="text-[#bdc3c7]">Share trusted contractor information with your clients</p>
                </div>

                {/* Search Section */}
                <div className="bg-[#34495e] rounded-xl p-6 mb-8 text-center">
                    <div className="flex items-center bg-[#2c3e50] rounded-lg p-3 max-w-[500px] mx-auto">
                        <span className="text-[#5dade2] mr-2">🔍</span>
                        <input
                            type="text"
                            placeholder="Search contractors or services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none text-white w-full outline-none"
                        />
                    </div>
                </div>

                {/* Category Navigation */}
                <div className="flex justify-center gap-2 mb-8 flex-wrap">
                    {categories.map(category => (
                        <button
                            key={category.key}
                            onClick={() => setActiveCategory(category.key)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${activeCategory === category.key
                                ? 'bg-[#5dade2] text-[#2c3e50] border-[#5dade2]'
                                : 'bg-[#34495e] text-[#bdc3c7] border-transparent hover:border-[#5dade2]'
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-4 py-2 rounded-lg font-medium bg-[#27ae60] text-white border-2 border-[#27ae60] hover:bg-[#229954] transition-all"
                    >
                        + Add New
                    </button>
                </div>

                {/* Add Contractor Form */}
                {showAddForm && (
                    <div className="bg-[#34495e] rounded-xl mb-8 border-2 border-[#5dade2]">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#2c3e50]">
                                <h3 className="text-xl font-semibold text-[#5dade2]">Add New Contractor</h3>
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="text-[#bdc3c7] hover:text-white text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-[#5dade2] font-medium mb-2 text-sm">Contractor Name *</label>
                                    <input
                                        type="text"
                                        value={formData.contractorName}
                                        onChange={(e) => handleInputChange('contractorName', e.target.value)}
                                        placeholder="John Smith"
                                        className="w-full p-3 bg-[#2c3e50] border-2 border-[#34495e] rounded-lg text-white focus:border-[#5dade2] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#5dade2] font-medium mb-2 text-sm">Company Name *</label>
                                    <input
                                        type="text"
                                        value={formData.companyName}
                                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                                        placeholder="ABC Construction"
                                        className="w-full p-3 bg-[#2c3e50] border-2 border-[#34495e] rounded-lg text-white focus:border-[#5dade2] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#5dade2] font-medium mb-2 text-sm">Phone Number *</label>
                                    <input
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                        placeholder="(555) 123-4567"
                                        className="w-full p-3 bg-[#2c3e50] border-2 border-[#34495e] rounded-lg text-white focus:border-[#5dade2] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#5dade2] font-medium mb-2 text-sm">Specialty/Category *</label>
                                    <select
                                        value={formData.specialty}
                                        onChange={(e) => handleInputChange('specialty', e.target.value)}
                                        className="w-full p-3 bg-[#2c3e50] border-2 border-[#34495e] rounded-lg text-white focus:border-[#5dade2] focus:outline-none"
                                    >
                                        <option value="">Select specialty...</option>
                                        <option value="general">General Contractor</option>
                                        <option value="electrical">Electrical</option>
                                        <option value="plumbing">Plumbing</option>
                                        <option value="hvac">HVAC</option>
                                        <option value="roofing">Roofing</option>
                                        <option value="landscaping">Landscaping</option>
                                        <option value="flooring">Flooring</option>
                                        <option value="painting">Painting</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[#5dade2] font-medium mb-2 text-sm">Years of Experience</label>
                                    <input
                                        type="number"
                                        value={formData.experience}
                                        onChange={(e) => handleInputChange('experience', e.target.value)}
                                        placeholder="10"
                                        className="w-full p-3 bg-[#2c3e50] border-2 border-[#34495e] rounded-lg text-white focus:border-[#5dade2] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#5dade2] font-medium mb-2 text-sm">Rating (1-5)</label>
                                    <select
                                        value={formData.rating}
                                        onChange={(e) => handleInputChange('rating', e.target.value)}
                                        className="w-full p-3 bg-[#2c3e50] border-2 border-[#34495e] rounded-lg text-white focus:border-[#5dade2] focus:outline-none"
                                    >
                                        <option value="">Select rating...</option>
                                        <option value="5.0">5.0 - Excellent</option>
                                        <option value="4.9">4.9 - Excellent</option>
                                        <option value="4.8">4.8 - Very Good</option>
                                        <option value="4.7">4.7 - Very Good</option>
                                        <option value="4.6">4.6 - Good</option>
                                        <option value="4.5">4.5 - Good</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-[#5dade2] font-medium mb-2 text-sm">Services Offered *</label>
                                <textarea
                                    value={formData.services}
                                    onChange={(e) => handleInputChange('services', e.target.value)}
                                    placeholder="Kitchen remodels, bathroom renovations, home additions, flooring installation, drywall repair"
                                    className="w-full p-3 bg-[#2c3e50] border-2 border-[#34495e] rounded-lg text-white focus:border-[#5dade2] focus:outline-none resize-vertical min-h-[80px]"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-[#5dade2] font-medium mb-2 text-sm">Special Notes (Optional)</label>
                                <textarea
                                    value={formData.specialNotes}
                                    onChange={(e) => handleInputChange('specialNotes', e.target.value)}
                                    placeholder="Licensed and insured, offers free estimates, works weekends, emergency services available, etc."
                                    className="w-full p-3 bg-[#2c3e50] border-2 border-[#34495e] rounded-lg text-white focus:border-[#5dade2] focus:outline-none resize-vertical min-h-[80px]"
                                />
                            </div>

                            <div className="flex gap-4 justify-end flex-wrap">
                                <button
                                    onClick={generateMessage}
                                    className="bg-[#5dade2] text-[#2c3e50] px-6 py-3 rounded-lg font-bold hover:bg-[#4fa8d8] transition-colors"
                                >
                                    Generate Referral Message
                                </button>
                                <button
                                    onClick={saveContractor}
                                    className="bg-[#27ae60] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#229954] transition-colors"
                                >
                                    Save Contractor
                                </button>
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="bg-[#34495e] text-[#bdc3c7] border-2 border-[#5dade2] px-6 py-3 rounded-lg font-bold hover:bg-[#5dade2] hover:text-[#2c3e50] transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Generated Message Preview */}
                {showGeneratedMessage && (
                    <div className="bg-[#34495e] rounded-xl mb-8 border-2 border-[#27ae60]">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#2c3e50]">
                                <h3 className="text-xl font-semibold text-[#27ae60]">Generated Referral Message</h3>
                                <button
                                    onClick={() => setShowGeneratedMessage(false)}
                                    className="text-[#bdc3c7] hover:text-white text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="bg-[#2c3e50] p-4 rounded-lg mb-4 border-l-4 border-[#27ae60]">
                                <div className="text-white whitespace-pre-wrap leading-relaxed">
                                    {generatedMessage}
                                </div>
                            </div>
                            <div className="flex gap-4 justify-end flex-wrap">
                                <button
                                    onClick={() => navigator.clipboard.writeText(generatedMessage).then(() => showSuccess('Generated message copied to clipboard!'))}
                                    className="bg-[#5dade2] text-[#2c3e50] px-6 py-3 rounded-lg font-bold hover:bg-[#4fa8d8] transition-colors"
                                >
                                    Copy Message
                                </button>
                                <button
                                    onClick={generateMessage}
                                    className="bg-[#8e44ad] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#7d3c98] transition-colors"
                                >
                                    Regenerate
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contractors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContractors().map(renderContractorCard)}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-3 sm:p-4">
                        <div className="bg-[#34495e] rounded-xl w-full max-w-[700px] relative shadow-xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-[#5dade2]">Share Contractor Referral</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-[#bdc3c7] hover:text-white text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="bg-[#2c3e50] p-3 sm:p-4 rounded-lg mb-4 border-l-4 border-[#5dade2]">
                                <div className="text-white whitespace-pre-wrap leading-relaxed break-words">
                                    {currentContractor && (currentContractor.startsWith('custom_')
                                        ? customContractors[currentContractor]?.message
                                        : contractors[currentContractor]?.message)}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <button
                                    onClick={copyMessage}
                                    className="flex-1 bg-[#5dade2] text-[#2c3e50] py-3 rounded-lg font-bold hover:bg-[#4fa8d8] transition-colors"
                                >
                                    Copy Message
                                </button>
                                <button
                                    onClick={shareViaEmail}
                                    className="flex-1 bg-[#27ae60] text-white py-3 rounded-lg font-bold hover:bg-[#229954] transition-colors"
                                >
                                    Share via Email
                                </button>
                                <button
                                    onClick={shareViaText}
                                    className="flex-1 bg-[#8e44ad] text-white py-3 rounded-lg font-bold hover:bg-[#7d3c98] transition-colors"
                                >
                                    Share via Text
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {successMessage && (
                    <div className="fixed top-5 right-5 bg-[#27ae60] text-white px-6 py-3 rounded-lg z-50 font-medium">
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
