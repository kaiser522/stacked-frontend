import React, { useState, useEffect } from "react";

export default function ConstructionTracker() {
    const [formData, setFormData] = useState({
        projectAddress: "",
        builder: "",
        buyerName: "",
        startDate: "",
        estimatedCompletion: "",
        contractPrice: 0,
        projectStatus: "pre-construction",
        projectNotes: "",
        nextWalkthrough: "",
        projectManager: ""
    });

    const [milestones, setMilestones] = useState([
        {
            id: 1,
            title: "Site Preparation & Foundation",
            scheduled: "",
            actual: "",
            notes: "",
            status: "pending"
        },
        {
            id: 2,
            title: "Framing & Roofing",
            scheduled: "",
            actual: "",
            notes: "",
            status: "pending"
        },
        {
            id: 3,
            title: "Plumbing, Electrical & HVAC Rough-In",
            scheduled: "",
            actual: "",
            notes: "",
            status: "pending"
        },
        {
            id: 4,
            title: "Insulation & Drywall",
            scheduled: "",
            actual: "",
            notes: "",
            status: "pending"
        },
        {
            id: 5,
            title: "Interior Finishes & Flooring",
            scheduled: "",
            actual: "",
            notes: "",
            status: "pending"
        },
        {
            id: 6,
            title: "Final Inspections & Certificate of Occupancy",
            scheduled: "",
            actual: "",
            notes: "",
            status: "pending"
        }
    ]);

    const [daysElapsed, setDaysElapsed] = useState(0);
    const [daysRemaining, setDaysRemaining] = useState(0);
    const [overallProgress, setOverallProgress] = useState(0);

    useEffect(() => {
        calculateDays();
        updateOverallProgress();
    }, [formData.startDate, formData.estimatedCompletion, milestones]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMilestoneChange = (milestoneId, field, value) => {
        setMilestones(prev => prev.map(milestone =>
            milestone.id === milestoneId
                ? { ...milestone, [field]: value }
                : milestone
        ));
    };

    const calculateDays = () => {
        if (!formData.startDate || !formData.estimatedCompletion) return;

        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.estimatedCompletion);
        const today = new Date();

        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const elapsed = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
        const remaining = Math.max(0, totalDays - elapsed);

        setDaysElapsed(Math.max(0, elapsed));
        setDaysRemaining(remaining);
    };

    const updateOverallProgress = () => {
        const completedMilestones = milestones.filter(m => m.status === 'completed').length;
        const totalMilestones = milestones.length;
        const progressPercent = (completedMilestones / totalMilestones) * 100;
        setOverallProgress(progressPercent);
    };

    const markComplete = (milestoneId) => {
        const today = new Date().toISOString().split('T')[0];
        handleMilestoneChange(milestoneId, 'actual', today);
        handleMilestoneChange(milestoneId, 'status', 'completed');
    };

    const updateMilestoneStatus = (milestoneId) => {
        const milestone = milestones.find(m => m.id === milestoneId);
        if (!milestone) return;

        let newStatus = 'pending';
        if (milestone.actual) {
            newStatus = 'completed';
            if (milestone.scheduled && new Date(milestone.actual) > new Date(milestone.scheduled)) {
                newStatus = 'delayed';
            }
        } else if (milestone.scheduled) {
            const today = new Date().toISOString().split('T')[0];
            if (milestone.scheduled < today) {
                newStatus = 'delayed';
            }
        }

        handleMilestoneChange(milestoneId, 'status', newStatus);
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            'completed': 'status-completed',
            'in-progress': 'status-in-progress',
            'pending': 'status-pending',
            'delayed': 'status-delayed'
        };

        const statusText = {
            'completed': 'Completed',
            'in-progress': 'In Progress',
            'pending': 'Pending',
            'delayed': 'Delayed'
        };

        return (
            <span className={`status-badge ${statusClasses[status] || 'status-pending'}`}>
                {statusText[status] || 'Pending'}
            </span>
        );
    };

    const getMilestoneCardClass = (milestone) => {
        if (milestone.status === 'completed') return 'milestone-card completed';
        if (milestone.status === 'delayed') return 'milestone-card delayed';
        if (milestone.status === 'in-progress') return 'milestone-card in-progress';
        return 'milestone-card';
    };

    return (
        <div className="construction-tracker">
            <style jsx>{`
        .construction-tracker {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
          color: white;
          line-height: 1.6;
          min-height: 100vh;
          padding: 20px;
        }
        
        .container {
          max-width: 1100px;
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
        
        .milestone-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 20px;
          margin: 15px 0;
          border-left: 4px solid #ccc;
          transition: all 0.3s ease;
        }
        
        .milestone-card.completed {
          border-left-color: #00D4AA;
          background: rgba(0, 212, 170, 0.1);
        }
        
        .milestone-card.in-progress {
          border-left-color: #FFD700;
          background: rgba(255, 215, 0, 0.1);
        }
        
        .milestone-card.delayed {
          border-left-color: #ff4757;
          background: rgba(255, 71, 87, 0.1);
        }
        
        .milestone-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .milestone-title {
          color: #FFD700;
          font-weight: bold;
          font-size: 1.2em;
        }
        
        .status-badge {
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.8em;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .status-completed { background: #00D4AA; color: #1e3a5f; }
        .status-in-progress { background: #FFD700; color: #1e3a5f; }
        .status-pending { background: #6c757d; color: white; }
        .status-delayed { background: #ff4757; color: white; }
        
        .progress-bar {
          width: 100%;
          height: 20px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          overflow: hidden;
          margin: 15px 0;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00D4AA, #00B894);
          border-radius: 10px;
          transition: width 0.5s ease;
          position: relative;
        }
        
        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.8em;
          font-weight: bold;
          color: white;
        }
        
        .update-btn {
          background: #00D4AA;
          color: #1e3a5f;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          margin: 10px 5px;
          transition: all 0.3s ease;
        }
        
        .update-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 3px 10px rgba(0, 212, 170, 0.3);
        }
        
        .print-button {
          background: #FFD700;
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
        
        .print-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
        }
        
        @media (max-width: 768px) {
          .form-header {
            padding: 20px;
          }
          
          .form-section {
            padding: 20px;
          }
          
          .milestone-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
        }
      `}</style>

            <div className="container">
                <div className="form-header">
                    <div className="logo">🏗️</div>
                    <h1>New Construction Progress Tracker</h1>
                </div>

                <div className="disclaimer">
                    <strong>CONSTRUCTION MANAGEMENT TOOL:</strong> Track new construction milestones, timelines, and deliverables for buyers and agents. Coordinate with builders and contractors.
                </div>

                <form>
                    <div className="form-section">
                        <div className="section-title">Project Information</div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Project Name/Address:</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="projectAddress"
                                    value={formData.projectAddress}
                                    onChange={handleInputChange}
                                    placeholder="Property address or project name"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Builder/Contractor:</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="builder"
                                    value={formData.builder}
                                    onChange={handleInputChange}
                                    placeholder="Builder company name"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Buyer(s):</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="buyerName"
                                    value={formData.buyerName}
                                    onChange={handleInputChange}
                                    placeholder="Buyer name(s)"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Construction Start Date:</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Estimated Completion:</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    name="estimatedCompletion"
                                    value={formData.estimatedCompletion}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Contract Price:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="contractPrice"
                                    value={formData.contractPrice}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-title">Overall Progress</div>

                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${overallProgress}%` }}
                            >
                                <div className="progress-text">{Math.round(overallProgress)}%</div>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Project Status:</label>
                                <select
                                    className="form-select"
                                    name="projectStatus"
                                    value={formData.projectStatus}
                                    onChange={handleInputChange}
                                >
                                    <option value="pre-construction">Pre-Construction</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="substantially-complete">Substantially Complete</option>
                                    <option value="final-walkthrough">Final Walkthrough</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Days Elapsed:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={daysElapsed}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Estimated Days Remaining:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={daysRemaining}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-title">Construction Milestones</div>

                        {milestones.map(milestone => (
                            <div key={milestone.id} className={getMilestoneCardClass(milestone)}>
                                <div className="milestone-header">
                                    <div className="milestone-title">{milestone.id}. {milestone.title}</div>
                                    {getStatusBadge(milestone.status)}
                                </div>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Scheduled Date:</label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={milestone.scheduled}
                                            onChange={(e) => {
                                                handleMilestoneChange(milestone.id, 'scheduled', e.target.value);
                                                updateMilestoneStatus(milestone.id);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Actual Completion:</label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={milestone.actual}
                                            onChange={(e) => {
                                                handleMilestoneChange(milestone.id, 'actual', e.target.value);
                                                updateMilestoneStatus(milestone.id);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Notes:</label>
                                    <textarea
                                        className="form-textarea"
                                        value={milestone.notes}
                                        onChange={(e) => handleMilestoneChange(milestone.id, 'notes', e.target.value)}
                                        placeholder="Updates, issues, or special notes..."
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="update-btn"
                                    onClick={() => markComplete(milestone.id)}
                                >
                                    Mark Complete
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="form-section">
                        <div className="section-title">Project Summary</div>

                        <div className="form-group">
                            <label className="form-label">Overall Project Notes:</label>
                            <textarea
                                className="form-textarea"
                                name="projectNotes"
                                value={formData.projectNotes}
                                onChange={handleInputChange}
                                placeholder="General notes, change orders, delays, or other important information..."
                            />
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Next Scheduled Walkthrough:</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    name="nextWalkthrough"
                                    value={formData.nextWalkthrough}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Project Manager Contact:</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="projectManager"
                                    value={formData.projectManager}
                                    onChange={handleInputChange}
                                    placeholder="Name and phone number"
                                />
                            </div>
                        </div>
                    </div>
                </form>

                <button className="print-button" onClick={() => window.print()}>
                    Print Progress Report
                </button>
            </div>
        </div>
    );
}
