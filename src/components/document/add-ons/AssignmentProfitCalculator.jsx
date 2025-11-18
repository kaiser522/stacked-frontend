import React, { useState, useEffect } from "react";

export default function AssignmentProfitCalculator() {
    const [formData, setFormData] = useState({
        propertyAddress: "",
        sellerContractPrice: 0,
        buyerContractPrice: 0,
        closingCosts: 0,
        holdingCosts: 0,
        holdingDays: 0,
        marketingCosts: 0
    });

    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        calculateMetrics();
    }, [formData.sellerContractPrice, formData.buyerContractPrice, formData.closingCosts, formData.holdingCosts, formData.holdingDays, formData.marketingCosts]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateMetrics = () => {
        // Validate inputs
        const sellerContractPrice = parseFloat(formData.sellerContractPrice) || 0;
        const buyerContractPrice = parseFloat(formData.buyerContractPrice) || 0;
        
        if (sellerContractPrice <= 0 || buyerContractPrice <= 0) return;

        // Calculate costs
        const closingCosts = Math.max(0, parseFloat(formData.closingCosts) || 0);
        const holdingCosts = Math.max(0, parseFloat(formData.holdingCosts) || 0);
        const holdingDays = Math.max(0, parseFloat(formData.holdingDays) || 0);
        const marketingCosts = Math.max(0, parseFloat(formData.marketingCosts) || 0);

        // FIXED: Calculate holding costs prorated over actual days held
        const dailyHoldingCost = holdingCosts > 0 && holdingDays > 0 ? holdingCosts / 30 : 0;
        const totalHoldingCost = dailyHoldingCost * holdingDays;

        // FIXED: Assignment Fee = Buyer Contract Price - Seller Contract Price
        const assignmentFee = buyerContractPrice - sellerContractPrice;

        // FIXED: Net Profit = Assignment Fee - Closing Costs - Holding Costs - Marketing Costs
        const netProfit = assignmentFee - closingCosts - totalHoldingCost - marketingCosts;

        // Calculate total costs
        const totalCosts = closingCosts + totalHoldingCost + marketingCosts;

        // Profit margin percentage
        const profitMargin = assignmentFee > 0 ? (netProfit / assignmentFee) * 100 : 0;

        setMetrics({
            assignmentFee,
            closingCosts,
            totalHoldingCost,
            marketingCosts,
            totalCosts,
            netProfit,
            profitMargin,
            dailyHoldingCost
        });
    };

    return (
        <div className="assignment-calculator">
            <style jsx>{`
        .assignment-calculator {
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
                    <div className="logo">📊</div>
                    <h1>Assignment Profit Calculator</h1>
                </div>

                <div className="disclaimer">
                    <strong>WHOLESALE CALCULATOR:</strong> Calculate net profit from assignment contracts after all costs. For wholesale real estate professionals.
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
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-title">Contract Prices</div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Seller Contract Price:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="sellerContractPrice"
                                    value={formData.sellerContractPrice}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Buyer Contract Price:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="buyerContractPrice"
                                    value={formData.buyerContractPrice}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-title">Costs</div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Closing Costs:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="closingCosts"
                                    value={formData.closingCosts}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Monthly Holding Costs:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="holdingCosts"
                                    value={formData.holdingCosts}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Days Held:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="holdingDays"
                                    value={formData.holdingDays}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Marketing Costs:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="marketingCosts"
                                    value={formData.marketingCosts}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <button type="button" className="calculate-btn" onClick={calculateMetrics}>
                        Calculate Assignment Profit
                    </button>

                    {metrics && (
                        <div className="results-panel">
                            <div className="section-title">Assignment Profit Analysis</div>

                            <div className="form-grid">
                                <div className="metric-card">
                                    <div className="metric-value">${metrics.assignmentFee.toLocaleString()}</div>
                                    <div className="metric-label">Assignment Fee (Buyer Price - Seller Price)</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">${metrics.netProfit.toLocaleString()}</div>
                                    <div className="metric-label">Net Profit (After All Costs)</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">{metrics.profitMargin.toFixed(2)}%</div>
                                    <div className="metric-label">Profit Margin</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">${metrics.totalCosts.toLocaleString()}</div>
                                    <div className="metric-label">Total Costs</div>
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="section-title">Cost Breakdown</div>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Closing Costs:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.closingCosts.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Holding Costs (Prorated):</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.totalHoldingCost.toLocaleString()} (${metrics.holdingDays} days × $${metrics.dailyHoldingCost.toFixed(2)}/day)`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Marketing Costs:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.marketingCosts.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>

                <button className="print-button" onClick={() => window.print()}>
                    Print Calculation Report
                </button>
            </div>
        </div>
    );
}

