import React, { useState, useEffect } from "react";

export default function ProbateFeeCalculator() {
    const [formData, setFormData] = useState({
        estateName: "",
        estateValue: 0,
        probatePercentage: 3.0 // FIXED: Make percentage editable, default to 3%
    });

    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        calculateMetrics();
    }, [formData.estateValue, formData.probatePercentage]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateMetrics = () => {
        // Validate inputs
        const estateValue = parseFloat(formData.estateValue) || 0;
        const probatePercentage = parseFloat(formData.probatePercentage) || 0;

        if (estateValue <= 0 || probatePercentage <= 0) return;

        // FIXED: Probate Fee = Estate Value × (State Probate Percentage)
        // Percentage is user-editable
        const probateFee = estateValue * (probatePercentage / 100);

        setMetrics({
            estateValue,
            probatePercentage,
            probateFee
        });
    };

    return (
        <div className="probate-calculator">
            <style jsx>{`
        .probate-calculator {
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
        
        .info-box {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 15px;
          margin: 15px 0;
          border-left: 4px solid #FFD700;
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
                    <div className="logo">⚖️</div>
                    <h1>Probate Fee Calculator</h1>
                </div>

                <div className="disclaimer">
                    <strong>PROBATE FEE CALCULATOR:</strong> Calculate probate fees based on estate value and state probate percentage. For probate specialists and estate professionals.
                </div>

                <form>
                    <div className="form-section">
                        <div className="section-title">Estate Information</div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Estate Name:</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="estateName"
                                    value={formData.estateName}
                                    onChange={handleInputChange}
                                    placeholder="Estate name or case number"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Estate Value:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="estateValue"
                                    value={formData.estateValue}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Probate Percentage (%):</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="probatePercentage"
                                    value={formData.probatePercentage}
                                    onChange={handleInputChange}
                                    placeholder="3.0"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                />
                                <div className="info-box">
                                    <small>FIXED: Percentage is now editable. Enter your state's probate percentage rate.</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="calculate-btn" onClick={calculateMetrics}>
                        Calculate Probate Fee
                    </button>

                    {metrics && (
                        <div className="results-panel">
                            <div className="section-title">Probate Fee Calculation</div>

                            <div className="form-grid">
                                <div className="metric-card">
                                    <div className="metric-value">${metrics.probateFee.toLocaleString()}</div>
                                    <div className="metric-label">Probate Fee</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">${metrics.estateValue.toLocaleString()}</div>
                                    <div className="metric-label">Estate Value</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">{metrics.probatePercentage.toFixed(2)}%</div>
                                    <div className="metric-label">Probate Percentage</div>
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="section-title">Calculation Details</div>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Estate Value:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.estateValue.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Probate Percentage:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`${metrics.probatePercentage.toFixed(2)}%`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Probate Fee:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.probateFee.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="info-box">
                                    <strong>Formula:</strong> Probate Fee = Estate Value × (Probate Percentage ÷ 100)
                                    <br />
                                    <strong>Example:</strong> ${metrics.estateValue.toLocaleString()} × ({metrics.probatePercentage.toFixed(2)}% ÷ 100) = ${metrics.probateFee.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    )}
                </form>

                <button className="print-button" onClick={() => window.print()}>
                    Print Fee Calculation Report
                </button>
            </div>
        </div>
    );
}

