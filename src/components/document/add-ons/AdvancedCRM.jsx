import React, { useState, useEffect } from "react";
import IntercomChat from "../../../components/IntercomChat";

export default function AdvancedCRM() {
    const [clients, setClients] = useState([]);
    const [clientCounter, setClientCounter] = useState(0);
    const [formData, setFormData] = useState({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        leadSource: "website",
        clientType: "buyer",
        budget: "",
        timeline: "immediate",
        leadTemp: "warm",
        clientNotes: ""
    });

    // Initialize with sample data
    useEffect(() => {
        const sampleClients = [
            {
                id: 1,
                name: 'John & Mary Smith',
                email: 'smith@email.com',
                phone: '(555) 123-4567',
                source: 'referral',
                type: 'buyer',
                budget: '$400,000 - $500,000',
                timeline: 'short-term',
                temperature: 'hot',
                notes: 'Looking for 3BR in Westside. Pre-approved for $450K.',
                stage: 'showing',
                dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                followUps: 3
            },
            {
                id: 2,
                name: 'Jennifer Davis',
                email: 'jen.davis@email.com',
                phone: '(555) 234-5678',
                source: 'website',
                type: 'seller',
                budget: 'Selling for $650K',
                timeline: 'immediate',
                temperature: 'warm',
                notes: 'Needs to sell quickly due to job relocation.',
                stage: 'qualified',
                dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                followUps: 2
            }
        ];
        setClients(sampleClients);
        setClientCounter(2);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addClient = () => {
        if (!formData.clientName.trim()) {
            alert('Please enter a client name.');
            return;
        }

        const newClient = {
            id: clientCounter + 1,
            name: formData.clientName,
            email: formData.clientEmail,
            phone: formData.clientPhone,
            source: formData.leadSource,
            type: formData.clientType,
            budget: formData.budget,
            timeline: formData.timeline,
            temperature: formData.leadTemp,
            notes: formData.clientNotes,
            stage: 'initial-contact',
            dateAdded: new Date(),
            lastContact: new Date(),
            followUps: 0
        };

        setClients(prev => [...prev, newClient]);
        setClientCounter(prev => prev + 1);
        setFormData({
            clientName: "",
            clientEmail: "",
            clientPhone: "",
            leadSource: "website",
            clientType: "buyer",
            budget: "",
            timeline: "immediate",
            leadTemp: "warm",
            clientNotes: ""
        });
    };

    const moveStage = (clientId, newStage) => {
        setClients(prev => prev.map(client =>
            client.id === clientId
                ? {
                    ...client,
                    stage: newStage,
                    lastContact: new Date(),
                    followUps: client.followUps + 1
                }
                : client
        ));
    };

    const deleteClient = (clientId) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            setClients(prev => prev.filter(client => client.id !== clientId));
        }
    };

    const formatStageName = (stage) => {
        const stages = {
            'initial-contact': 'Initial Contact',
            'qualified': 'Qualified Lead',
            'showing': 'Property Showing',
            'offer': 'Offer Stage',
            'under-contract': 'Under Contract',
            'closed': 'Closed Deal'
        };
        return stages[stage] || stage;
    };

    const updateDashboard = () => {
        const totalLeads = clients.filter(c => c.stage !== 'closed').length;
        const hotLeads = clients.filter(c => c.temperature === 'hot' && c.stage !== 'closed').length;
        const closedDeals = clients.filter(c => c.stage === 'closed').length;
        const conversionRate = clients.length > 0 ? (closedDeals / clients.length) * 100 : 0;

        return { totalLeads, hotLeads, closedDeals, conversionRate };
    };

    const generateAnalytics = () => {
        const sources = {};
        clients.forEach(client => {
            sources[client.source] = (sources[client.source] || 0) + 1;
        });
        const topSource = Object.keys(sources).reduce((a, b) => sources[a] > sources[b] ? a : b, 'N/A');

        return { topSource };
    };

    const dashboard = updateDashboard();
    const analytics = generateAnalytics();

    return (
        <div className="advanced-crm">
            <IntercomChat enableFin={false} />
            <style jsx>{`
        .advanced-crm {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
          color: white;
          line-height: 1.6;
          min-height: 100vh;
          padding: 20px;
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .form-header {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 30px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          text-align: center;
        }
        
        .logo {
          width: 60px;
          height: 60px;
          background: #FF6B35;
          border-radius: 8px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 24px;
        }
        
        h1 {
          font-size: 2.5em;
          margin-bottom: 20px;
          color: #00D4AA;
        }
        
        .disclaimer {
          background: linear-gradient(135deg, #FF6B35, #E55533);
          color: white;
          padding: 20px;
          border-radius: 15px;
          margin-bottom: 30px;
          font-weight: bold;
          text-align: center;
        }
        
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .metric-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 25px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .metric-value {
          font-size: 2.5em;
          font-weight: bold;
          color: #00D4AA;
          margin-bottom: 10px;
        }
        
        .metric-label {
          color: #FFD700;
          font-weight: bold;
          font-size: 0.9em;
        }
        
        .form-section {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-label {
          color: #FFD700;
          font-weight: bold;
          margin-bottom: 8px;
          font-size: 1.1em;
        }
        
        .form-input, .form-select, .form-textarea {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          padding: 12px;
          color: white;
          font-size: 1em;
        }
        
        .form-input::placeholder, .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .form-select option {
          background: #1e3a5f;
          color: white;
        }
        
        .form-textarea {
          min-height: 80px;
          resize: vertical;
        }
        
        .section-title {
          color: #00D4AA;
          font-size: 1.5em;
          margin-bottom: 15px;
          border-bottom: 2px solid #00D4AA;
          padding-bottom: 5px;
        }
        
        .client-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 20px;
          margin: 15px 0;
          border-left: 4px solid #ccc;
          transition: all 0.3s ease;
        }
        
        .client-card.hot { border-left-color: #ff4757; background: rgba(255, 71, 87, 0.1); }
        .client-card.warm { border-left-color: #FFD700; background: rgba(255, 215, 0, 0.1); }
        .client-card.cold { border-left-color: #74b9ff; background: rgba(116, 185, 255, 0.1); }
        .client-card.closed { border-left-color: #00D4AA; background: rgba(0, 212, 170, 0.1); }
        
        .client-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .client-name {
          color: #FFD700;
          font-weight: bold;
          font-size: 1.3em;
        }
        
        .lead-score {
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.8em;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .score-hot { background: #ff4757; color: white; }
        .score-warm { background: #FFD700; color: #1e3a5f; }
        .score-cold { background: #74b9ff; color: white; }
        .score-closed { background: #00D4AA; color: #1e3a5f; }
        
        .pipeline-stage {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 10px 15px;
          border-radius: 8px;
          margin: 10px 0;
        }
        
        .stage-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        
        .stage-btn {
          background: #00D4AA;
          color: #1e3a5f;
          padding: 8px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.8em;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        
        .stage-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(0, 212, 170, 0.3);
        }
        
        .stage-btn.active {
          background: #FFD700;
        }
        
        .add-client-btn {
          background: #00D4AA;
          color: #1e3a5f;
          padding: 15px 30px;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          font-size: 1.1em;
          cursor: pointer;
          margin: 20px auto;
          display: block;
          transition: all 0.3s ease;
        }
        
        .add-client-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 212, 170, 0.3);
        }
        
        .delete-btn {
          background: #ff4757;
          color: white;
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.8em;
          font-weight: bold;
          margin-left: 10px;
          transition: all 0.3s ease;
        }

        .delete-btn:hover {
          background: #ff3838;
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .form-header {
            padding: 20px;
          }
          
          .form-section {
            padding: 20px;
          }
          
          .client-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
          
          .stage-buttons {
            flex-wrap: wrap;
          }
        }
      `}</style>

            <div className="container">
                <div className="form-header">
                    <div className="logo">⚡</div>
                    <h1>Advanced CRM & Sales Pipeline</h1>
                </div>

                <div className="disclaimer">
                    <strong>PROFESSIONAL CRM SYSTEM:</strong> Advanced client relationship management with pipeline tracking, lead scoring, and conversion analytics for real estate professionals.
                </div>

                <div className="dashboard-grid">
                    <div className="metric-card">
                        <div className="metric-value">{dashboard.totalLeads}</div>
                        <div className="metric-label">Total Active Leads</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-value">{dashboard.hotLeads}</div>
                        <div className="metric-label">Hot Prospects</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-value">{dashboard.closedDeals}</div>
                        <div className="metric-label">Closed This Month</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-value">{dashboard.conversionRate.toFixed(1)}%</div>
                        <div className="metric-label">Conversion Rate</div>
                    </div>
                </div>

                <div className="form-section">
                    <div className="section-title">Add New Client/Lead</div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Client Name:</label>
                            <input
                                type="text"
                                className="form-input"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleInputChange}
                                placeholder="Full name"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email:</label>
                            <input
                                type="email"
                                className="form-input"
                                name="clientEmail"
                                value={formData.clientEmail}
                                onChange={handleInputChange}
                                placeholder="email@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone:</label>
                            <input
                                type="tel"
                                className="form-input"
                                name="clientPhone"
                                value={formData.clientPhone}
                                onChange={handleInputChange}
                                placeholder="(000) 000-0000"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Lead Source:</label>
                            <select
                                className="form-select"
                                name="leadSource"
                                value={formData.leadSource}
                                onChange={handleInputChange}
                            >
                                <option value="website">Website</option>
                                <option value="referral">Referral</option>
                                <option value="social-media">Social Media</option>
                                <option value="open-house">Open House</option>
                                <option value="cold-call">Cold Call</option>
                                <option value="zillow">Zillow Lead</option>
                                <option value="facebook">Facebook Lead</option>
                                <option value="google-ads">Google Ads</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Client Type:</label>
                            <select
                                className="form-select"
                                name="clientType"
                                value={formData.clientType}
                                onChange={handleInputChange}
                            >
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                                <option value="both">Both Buyer & Seller</option>
                                <option value="investor">Investor</option>
                                <option value="renter">Renter</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Budget/Price Range:</label>
                            <input
                                type="text"
                                className="form-input"
                                name="budget"
                                value={formData.budget}
                                onChange={handleInputChange}
                                placeholder="$000,000 - $000,000"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Timeline:</label>
                            <select
                                className="form-select"
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleInputChange}
                            >
                                <option value="immediate">Immediate (0-30 days)</option>
                                <option value="short-term">1-3 months</option>
                                <option value="medium-term">3-6 months</option>
                                <option value="long-term">6+ months</option>
                                <option value="exploring">Just exploring</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Lead Temperature:</label>
                            <select
                                className="form-select"
                                name="leadTemp"
                                value={formData.leadTemp}
                                onChange={handleInputChange}
                            >
                                <option value="hot">Hot - Ready to transact</option>
                                <option value="warm">Warm - Actively looking</option>
                                <option value="cold">Cold - Early stage interest</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Initial Notes:</label>
                        <textarea
                            className="form-textarea"
                            name="clientNotes"
                            value={formData.clientNotes}
                            onChange={handleInputChange}
                            placeholder="Initial conversation notes, preferences, concerns..."
                        />
                    </div>

                    <button type="button" className="add-client-btn" onClick={addClient}>
                        Add Client to Pipeline
                    </button>
                </div>

                <div className="form-section">
                    <div className="section-title">Active Pipeline</div>

                    <div>
                        {clients.map(client => (
                            <div key={client.id} className={`client-card ${client.temperature}`}>
                                <div className="client-header">
                                    <div className="client-name">{client.name}</div>
                                    <div>
                                        <span className={`lead-score score-${client.temperature}`}>
                                            {client.temperature}
                                        </span>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteClient(client.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="form-grid">
                                    <div><strong>Type:</strong> {client.type}</div>
                                    <div><strong>Source:</strong> {client.source}</div>
                                    <div><strong>Budget:</strong> {client.budget || 'Not specified'}</div>
                                    <div><strong>Timeline:</strong> {client.timeline}</div>
                                    <div><strong>Contact:</strong> {client.phone}</div>
                                    <div><strong>Email:</strong> {client.email}</div>
                                </div>
                                <div className="pipeline-stage">
                                    <div><strong>Current Stage:</strong> {formatStageName(client.stage)}</div>
                                    <div className="stage-buttons">
                                        <button
                                            className={`stage-btn ${client.stage === 'initial-contact' ? 'active' : ''}`}
                                            onClick={() => moveStage(client.id, 'initial-contact')}
                                        >
                                            Initial
                                        </button>
                                        <button
                                            className={`stage-btn ${client.stage === 'qualified' ? 'active' : ''}`}
                                            onClick={() => moveStage(client.id, 'qualified')}
                                        >
                                            Qualified
                                        </button>
                                        <button
                                            className={`stage-btn ${client.stage === 'showing' ? 'active' : ''}`}
                                            onClick={() => moveStage(client.id, 'showing')}
                                        >
                                            Showing
                                        </button>
                                        <button
                                            className={`stage-btn ${client.stage === 'offer' ? 'active' : ''}`}
                                            onClick={() => moveStage(client.id, 'offer')}
                                        >
                                            Offer
                                        </button>
                                        <button
                                            className={`stage-btn ${client.stage === 'under-contract' ? 'active' : ''}`}
                                            onClick={() => moveStage(client.id, 'under-contract')}
                                        >
                                            Contract
                                        </button>
                                        <button
                                            className={`stage-btn ${client.stage === 'closed' ? 'active' : ''}`}
                                            onClick={() => moveStage(client.id, 'closed')}
                                        >
                                            Closed
                                        </button>
                                    </div>
                                </div>
                                <div style={{ marginTop: '15px' }}>
                                    <strong>Notes:</strong> {client.notes || 'No notes yet'}
                                </div>
                                <div style={{ marginTop: '10px', fontSize: '0.9em', opacity: 0.8 }}>
                                    Added: {client.dateAdded.toLocaleDateString()} | Last Contact: {client.lastContact.toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
