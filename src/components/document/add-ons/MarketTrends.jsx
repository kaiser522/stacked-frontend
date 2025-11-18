import React, { useState, useEffect } from "react";

export default function MarketTrends() {
    const [formData, setFormData] = useState({
        marketArea: "",
        zipCodes: "",
        reportPeriod: "current-quarter",
        propertyTypes: "all",
        reportDate: new Date().toISOString().split('T')[0],
        preparedBy: "",
        // Market metrics
        currentSales: 0,
        previousSales: 0,
        currentPrice: 0,
        previousPrice: 0,
        currentDOM: 0,
        previousDOM: 0,
        currentInventory: 0,
        previousInventory: 0
    });

    const [trends, setTrends] = useState({
        salesChange: 0,
        priceChange: 0,
        domChange: 0,
        inventoryChange: 0
    });

    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {
        calculateTrends();
    }, [formData.currentSales, formData.previousSales, formData.currentPrice, formData.previousPrice, formData.currentDOM, formData.previousDOM, formData.currentInventory, formData.previousInventory]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateTrends = () => {
        const salesChange = formData.previousSales > 0 ?
            ((formData.currentSales - formData.previousSales) / formData.previousSales) * 100 : 0;
        const priceChange = formData.previousPrice > 0 ?
            ((formData.currentPrice - formData.previousPrice) / formData.previousPrice) * 100 : 0;
        const domChange = formData.previousDOM > 0 ?
            ((formData.currentDOM - formData.previousDOM) / formData.previousDOM) * 100 : 0;
        const inventoryChange = formData.previousInventory > 0 ?
            ((formData.currentInventory - formData.previousInventory) / formData.previousInventory) * 100 : 0;

        setTrends({
            salesChange,
            priceChange,
            domChange,
            inventoryChange
        });
    };

    const updateTrendIndicator = (change, inverse = false) => {
        const absChange = Math.abs(change);
        const isPositive = inverse ? change < 0 : change > 0;
        const isNeutral = absChange < 3;

        let arrow, className, sign;

        if (isNeutral) {
            arrow = '→';
            className = 'trend-stable';
            sign = change >= 0 ? '+' : '';
        } else if (isPositive) {
            arrow = '↗';
            className = 'trend-up';
            sign = '+';
        } else {
            arrow = '↘';
            className = 'trend-down';
            sign = '';
        }

        return { arrow, className, sign };
    };

    const generateAnalysis = () => {
        // Calculate market metrics
        const monthsSupply = formData.currentSales > 0 ?
            (formData.currentInventory / (formData.currentSales / 3)) : 0; // Assuming quarterly data
        const absorptionRate = formData.currentInventory > 0 ?
            (formData.currentSales / formData.currentInventory) * 100 : 0;

        // Determine market condition
        let marketCondition;
        if (monthsSupply < 3) {
            marketCondition = "Strong Seller's Market";
        } else if (monthsSupply < 6) {
            marketCondition = "Balanced Market";
        } else {
            marketCondition = "Buyer's Market";
        }

        const psfTrend = formData.currentPrice > 0 ?
            `$${Math.round(formData.currentPrice / 2000)} (estimated)` : '$0 (estimated)';

        const insights = generateInsights(marketCondition, monthsSupply, formData.currentDOM);

        setAnalysis({
            marketCondition,
            monthsSupply,
            absorptionRate,
            psfTrend,
            insights
        });
    };

    const generateInsights = (condition, monthsSupply, dom) => {
        let insights = {
            key: '',
            buyers: '',
            sellers: '',
            predictions: ''
        };

        if (condition === "Strong Seller's Market") {
            insights.key = "Market shows strong seller conditions with limited inventory and competitive pricing. Buyers face multiple offer situations. Properties selling quickly with minimal price reductions.";
            insights.buyers = "Act quickly on desirable properties. Get pre-approved and be prepared to make strong offers. Consider escalation clauses and flexible terms. Expand search criteria if necessary.";
            insights.sellers = "Excellent time to sell with high demand. Price aggressively but competitively. Ensure property is market-ready to capture maximum value. Consider multiple offer scenarios.";
            insights.predictions = "Continued seller-favorable conditions expected short-term. Watch for inventory increases in spring/summer. Price growth may moderate as affordability becomes a concern.";
        } else if (condition === "Balanced Market") {
            insights.key = "Market shows equilibrium between supply and demand. Normal negotiation dynamics. Steady price appreciation with reasonable showing activity.";
            insights.buyers = "Good selection of properties available. Normal due diligence periods. Negotiation opportunities on price and terms. Less urgency but don't delay on preferred properties.";
            insights.sellers = "Price competitively based on recent comps. Ensure strong marketing and presentation. Be prepared for normal negotiation. Consider minor improvements for competitive advantage.";
            insights.predictions = "Stable market conditions likely to continue. Seasonal fluctuations expected. Economic factors will influence direction - monitor interest rates and employment.";
        } else {
            insights.key = "Buyer-favorable market with ample inventory and longer marketing times. Price reductions more common. Buyers have negotiating power.";
            insights.buyers = "Excellent selection and negotiating power. Take time for thorough due diligence. Negotiate on price and terms. Consider properties that have been on market longer.";
            insights.sellers = "Price competitively to attract buyers quickly. Consider strategic improvements. Be flexible on terms and timing. Marketing and staging become more critical.";
            insights.predictions = "Buyer conditions may persist near-term. Monitor for signs of market stabilization. Price adjustments may be necessary to maintain competitiveness.";
        }

        return insights;
    };

    const getTrendDisplay = (change, inverse = false) => {
        const { arrow, className, sign } = updateTrendIndicator(change, inverse);
        return (
            <span className={`trend-indicator ${className}`}>
                {arrow} {sign}{change.toFixed(1)}%
            </span>
        );
    };

    return (
        <div className="market-trends">
            <style jsx>{`
        .market-trends {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
          color: white;
          line-height: 1.6;
          min-height: 100vh;
          padding: 20px;
        }
        
        .container {
          max-width: 1200px;
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
          min-height: 120px;
          resize: vertical;
        }
        
        .section-title {
          color: #00D4AA;
          font-size: 1.5em;
          margin-bottom: 15px;
          border-bottom: 2px solid #00D4AA;
          padding-bottom: 5px;
        }
        
        .trend-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 20px;
          margin: 15px 0;
          border-left: 4px solid #FFD700;
        }
        
        .trend-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .trend-title {
          color: #FFD700;
          font-weight: bold;
          font-size: 1.2em;
        }
        
        .trend-indicator {
          font-size: 1.5em;
          font-weight: bold;
        }
        
        .trend-up { color: #00D4AA; }
        .trend-down { color: #ff4757; }
        .trend-stable { color: #FFD700; }
        
        .data-visualization {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 30px;
          margin: 15px 0;
          text-align: center;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 2px dashed rgba(255, 255, 255, 0.3);
        }
        
        .generate-btn {
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
        
        .generate-btn:hover {
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
          
          .trend-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
        }
      `}</style>

            <div className="container">
                <div className="form-header">
                    <div className="logo">📈</div>
                    <h1>Market Trends & Analytics</h1>
                </div>

                <div className="disclaimer">
                    <strong>PROFESSIONAL MARKET INTELLIGENCE:</strong> Advanced analytics and trend reporting for real estate professionals. Data should be supplemented with local MLS information.
                </div>

                <form>
                    <div className="form-section">
                        <div className="section-title">Market Area Information</div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Primary Market Area:</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="marketArea"
                                    value={formData.marketArea}
                                    onChange={handleInputChange}
                                    placeholder="City, County, or Neighborhood"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">ZIP Codes (comma separated):</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="zipCodes"
                                    value={formData.zipCodes}
                                    onChange={handleInputChange}
                                    placeholder="12345, 12346, 12347"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Report Period:</label>
                                <select
                                    className="form-select"
                                    name="reportPeriod"
                                    value={formData.reportPeriod}
                                    onChange={handleInputChange}
                                >
                                    <option value="current-quarter">Current Quarter</option>
                                    <option value="ytd">Year-to-Date</option>
                                    <option value="12-month">12-Month Trailing</option>
                                    <option value="custom">Custom Date Range</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Property Types:</label>
                                <select
                                    className="form-select"
                                    name="propertyTypes"
                                    value={formData.propertyTypes}
                                    onChange={handleInputChange}
                                >
                                    <option value="all">All Residential</option>
                                    <option value="single-family">Single Family Only</option>
                                    <option value="condo-townhome">Condo/Townhome</option>
                                    <option value="luxury">Luxury Segment</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Report Date:</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    name="reportDate"
                                    value={formData.reportDate}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Prepared By:</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="preparedBy"
                                    value={formData.preparedBy}
                                    onChange={handleInputChange}
                                    placeholder="Agent name"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-title">Market Metrics Input</div>

                        <div className="trend-card">
                            <div className="trend-header">
                                <div className="trend-title">Sales Volume</div>
                                <div className="trend-indicator">
                                    {getTrendDisplay(trends.salesChange)}
                                </div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Current Period Sales:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="currentSales"
                                        value={formData.currentSales}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Previous Period Sales:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="previousSales"
                                        value={formData.previousSales}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="trend-card">
                            <div className="trend-header">
                                <div className="trend-title">Median Sale Price</div>
                                <div className="trend-indicator">
                                    {getTrendDisplay(trends.priceChange)}
                                </div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Current Median Price:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="currentPrice"
                                        value={formData.currentPrice}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Previous Median Price:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="previousPrice"
                                        value={formData.previousPrice}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="trend-card">
                            <div className="trend-header">
                                <div className="trend-title">Days on Market</div>
                                <div className="trend-indicator">
                                    {getTrendDisplay(trends.domChange, true)}
                                </div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Current Average DOM:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="currentDOM"
                                        value={formData.currentDOM}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Previous Average DOM:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="previousDOM"
                                        value={formData.previousDOM}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="trend-card">
                            <div className="trend-header">
                                <div className="trend-title">Inventory Levels</div>
                                <div className="trend-indicator">
                                    {getTrendDisplay(trends.inventoryChange)}
                                </div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Current Active Listings:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="currentInventory"
                                        value={formData.currentInventory}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Previous Active Listings:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="previousInventory"
                                        value={formData.previousInventory}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="generate-btn" onClick={generateAnalysis}>
                        Generate Market Analysis
                    </button>

                    {analysis && (
                        <div className="form-section">
                            <div className="section-title">Market Analysis Summary</div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Market Condition:</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={analysis.marketCondition}
                                        readOnly
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Months of Supply:</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={`${analysis.monthsSupply.toFixed(1)} months`}
                                        readOnly
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Absorption Rate:</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={`${analysis.absorptionRate.toFixed(1)}%`}
                                        readOnly
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Price per Sq Ft Trend:</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={analysis.psfTrend}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="data-visualization">
                                <div style={{ fontSize: '3em', marginBottom: '15px' }}>📊</div>
                                <div style={{ fontSize: '1.2em', marginBottom: '10px' }}>Interactive Chart Would Display Here</div>
                                <small>In production: Sales volume, price trends, and DOM visualization</small>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Key Market Insights:</label>
                                <textarea
                                    className="form-textarea"
                                    value={analysis.insights.key}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Buyer Recommendations:</label>
                                <textarea
                                    className="form-textarea"
                                    value={analysis.insights.buyers}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Seller Recommendations:</label>
                                <textarea
                                    className="form-textarea"
                                    value={analysis.insights.sellers}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Future Market Predictions (Next 6 Months):</label>
                                <textarea
                                    className="form-textarea"
                                    value={analysis.insights.predictions}
                                    readOnly
                                />
                            </div>
                        </div>
                    )}
                </form>

                <button className="print-button" onClick={() => window.print()}>
                    Print Market Report
                </button>
            </div>
        </div>
    );
}
