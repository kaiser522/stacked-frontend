import React, { useState, useEffect } from "react";

export default function RehabCostEstimator() {
    const [formData, setFormData] = useState({
        propertyAddress: "",
        squareFootage: 0,
        costPerSqFt: 0,
        // Additional line items
        kitchen: 0,
        bathroom: 0,
        flooring: 0,
        paint: 0,
        electrical: 0,
        plumbing: 0,
        hvac: 0,
        roofing: 0,
        windows: 0,
        doors: 0,
        landscaping: 0,
        other: 0
    });

    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        calculateMetrics();
    }, [formData.squareFootage, formData.costPerSqFt, formData.kitchen, formData.bathroom, formData.flooring, formData.paint, formData.electrical, formData.plumbing, formData.hvac, formData.roofing, formData.windows, formData.doors, formData.landscaping, formData.other]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateMetrics = () => {
        // Validate inputs
        const squareFootage = parseFloat(formData.squareFootage) || 0;
        const costPerSqFt = parseFloat(formData.costPerSqFt) || 0;

        if (squareFootage <= 0 || costPerSqFt <= 0) return;

        // FIXED: Rehab Cost = (Square Footage × Cost Per Sq Ft) + Additional Line Items
        const baseRehabCost = squareFootage * costPerSqFt;

        // Additional line items
        const kitchen = Math.max(0, parseFloat(formData.kitchen) || 0);
        const bathroom = Math.max(0, parseFloat(formData.bathroom) || 0);
        const flooring = Math.max(0, parseFloat(formData.flooring) || 0);
        const paint = Math.max(0, parseFloat(formData.paint) || 0);
        const electrical = Math.max(0, parseFloat(formData.electrical) || 0);
        const plumbing = Math.max(0, parseFloat(formData.plumbing) || 0);
        const hvac = Math.max(0, parseFloat(formData.hvac) || 0);
        const roofing = Math.max(0, parseFloat(formData.roofing) || 0);
        const windows = Math.max(0, parseFloat(formData.windows) || 0);
        const doors = Math.max(0, parseFloat(formData.doors) || 0);
        const landscaping = Math.max(0, parseFloat(formData.landscaping) || 0);
        const other = Math.max(0, parseFloat(formData.other) || 0);

        const additionalItems = kitchen + bathroom + flooring + paint + electrical + plumbing + hvac + roofing + windows + doors + landscaping + other;

        const totalRehabCost = baseRehabCost + additionalItems;

        setMetrics({
            squareFootage,
            costPerSqFt,
            baseRehabCost,
            additionalItems,
            totalRehabCost,
            kitchen,
            bathroom,
            flooring,
            paint,
            electrical,
            plumbing,
            hvac,
            roofing,
            windows,
            doors,
            landscaping,
            other
        });
    };

    return (
        <div className="rehab-estimator">
            <style jsx>{`
        .rehab-estimator {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
          color: white;
          line-height: 1.6;
          min-height: 100vh;
          padding: 20px;
        }
        
        .container {
          max-width: 1000px;
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
        
        .form-input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          padding: 12px;
          color: white;
          font-size: 1em;
        }
        
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .section-title {
          color: #00D4AA;
          font-size: 1.5em;
          margin-bottom: 15px;
          border-bottom: 2px solid #00D4AA;
          padding-bottom: 5px;
        }
        
        .results-panel {
          background: linear-gradient(135deg, #00D4AA, #00B894);
          color: #1e3a5f;
          border-radius: 15px;
          padding: 30px;
          margin: 20px 0;
          font-weight: bold;
        }
        
        .metric-card {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 20px;
          margin: 10px 0;
          text-align: center;
        }
        
        .metric-value {
          font-size: 2em;
          font-weight: bold;
          color: #FFD700;
        }
        
        .metric-label {
          font-size: 0.9em;
          opacity: 0.8;
          margin-top: 5px;
        }
        
        .calculate-btn {
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
        
        .calculate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 212, 170, 0.3);
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
        }
      `}</style>

            <div className="container">
                <div className="form-header">
                    <div className="logo">🔨</div>
                    <h1>Rehab Cost Estimator</h1>
                </div>

                <div className="disclaimer">
                    <strong>REHAB ESTIMATOR:</strong> Calculate total rehab costs using cost per square foot plus additional line items. For real estate professionals and house flippers.
                </div>

                <form>
                    <div className="form-section">
                        <div className="section-title">Property Information</div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Property Address:</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="propertyAddress"
                                    value={formData.propertyAddress}
                                    onChange={handleInputChange}
                                    placeholder="Full property address"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Square Footage:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="squareFootage"
                                    value={formData.squareFootage}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Cost Per Square Foot:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="costPerSqFt"
                                    value={formData.costPerSqFt}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-title">Additional Line Items</div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Kitchen:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="kitchen"
                                    value={formData.kitchen}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Bathroom:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="bathroom"
                                    value={formData.bathroom}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Flooring:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="flooring"
                                    value={formData.flooring}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Paint:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="paint"
                                    value={formData.paint}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Electrical:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="electrical"
                                    value={formData.electrical}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Plumbing:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="plumbing"
                                    value={formData.plumbing}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">HVAC:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="hvac"
                                    value={formData.hvac}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Roofing:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="roofing"
                                    value={formData.roofing}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Windows:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="windows"
                                    value={formData.windows}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Doors:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="doors"
                                    value={formData.doors}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Landscaping:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="landscaping"
                                    value={formData.landscaping}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Other:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="other"
                                    value={formData.other}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <button type="button" className="calculate-btn" onClick={calculateMetrics}>
                        Calculate Rehab Costs
                    </button>

                    {metrics && (
                        <div className="results-panel">
                            <div className="section-title">Rehab Cost Estimate</div>

                            <div className="form-grid">
                                <div className="metric-card">
                                    <div className="metric-value">${metrics.baseRehabCost.toLocaleString()}</div>
                                    <div className="metric-label">Base Cost (Sq Ft × Cost/Sq Ft)</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">${metrics.additionalItems.toLocaleString()}</div>
                                    <div className="metric-label">Additional Line Items</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">${metrics.totalRehabCost.toLocaleString()}</div>
                                    <div className="metric-label">Total Rehab Cost</div>
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="section-title">Cost Breakdown</div>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Square Footage:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={metrics.squareFootage.toLocaleString()}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Cost Per Square Foot:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.costPerSqFt.toFixed(2)}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Base Rehab Cost:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.baseRehabCost.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Kitchen:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.kitchen.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Bathroom:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.bathroom.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Flooring:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.flooring.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Paint:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.paint.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Electrical:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.electrical.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Plumbing:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.plumbing.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">HVAC:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.hvac.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Roofing:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.roofing.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Windows:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.windows.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Doors:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.doors.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Landscaping:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.landscaping.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Other:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.other.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>

                <button className="print-button" onClick={() => window.print()}>
                    Print Estimate Report
                </button>
            </div>
        </div>
    );
}

