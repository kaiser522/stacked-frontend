import React, { useState, useEffect } from "react";

export default function InvestmentAnalysis() {
    const [formData, setFormData] = useState({
        propertyAddress: "",
        purchasePrice: 0,
        downPaymentPercent: 20,
        downPaymentAmount: 0,
        loanAmount: 0,
        interestRate: 7.0,
        loanTerm: 30,
        monthlyPI: 0,
        monthlyRent: 0,
        monthlyTaxes: 0,
        monthlyInsurance: 0,
        monthlyHOA: 0,
        monthlyPMI: 0,
        managementPercent: 10,
        monthlyMaintenance: 0,
        vacancyRate: 5,
        otherExpenses: 0,
        // Additional costs for accurate ROI calculation
        rehabCosts: 0,
        closingCosts: 0,
        holdingCosts: 0,
        holdingDays: 0,
        arv: 0, // After Repair Value
        sellingCosts: 0
    });

    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        calculateMetrics();
    }, [formData.purchasePrice, formData.downPaymentPercent, formData.interestRate, formData.loanTerm, formData.monthlyRent, formData.monthlyTaxes, formData.monthlyInsurance, formData.monthlyHOA, formData.monthlyPMI, formData.managementPercent, formData.monthlyMaintenance, formData.vacancyRate, formData.otherExpenses, formData.rehabCosts, formData.closingCosts, formData.holdingCosts, formData.holdingDays, formData.arv, formData.sellingCosts]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateMetrics = () => {
        // Validate inputs
        const purchasePrice = parseFloat(formData.purchasePrice) || 0;
        if (purchasePrice <= 0) return;

        // Calculate derived values with validation
        const downPaymentPercent = Math.max(0, Math.min(100, parseFloat(formData.downPaymentPercent) || 0));
        const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
        const loanAmount = Math.max(0, purchasePrice - downPaymentAmount);

        // Calculate monthly payment using mortgage formula
        const interestRate = Math.max(0, parseFloat(formData.interestRate) || 0);
        const loanTerm = Math.max(1, parseFloat(formData.loanTerm) || 30);
        const monthlyRate = (interestRate / 100) / 12;
        const numPayments = loanTerm * 12;
        
        let monthlyPI = 0;
        if (loanAmount > 0 && numPayments > 0) {
            if (monthlyRate > 0) {
                const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments);
                const denominator = Math.pow(1 + monthlyRate, numPayments) - 1;
                monthlyPI = denominator > 0 ? numerator / denominator : loanAmount / numPayments;
            } else {
                // Zero interest rate - simple division
                monthlyPI = loanAmount / numPayments;
            }
        }

        // Calculate additional costs
        const rehabCosts = Math.max(0, parseFloat(formData.rehabCosts) || 0);
        const closingCosts = Math.max(0, parseFloat(formData.closingCosts) || 0);
        const holdingCosts = Math.max(0, parseFloat(formData.holdingCosts) || 0);
        const holdingDays = Math.max(0, parseFloat(formData.holdingDays) || 0);
        const arv = Math.max(0, parseFloat(formData.arv) || 0);
        const sellingCosts = Math.max(0, parseFloat(formData.sellingCosts) || 0);

        // Calculate Total Invested (for ROI and Cap Rate)
        const totalInvested = purchasePrice + rehabCosts + closingCosts + (holdingCosts > 0 && holdingDays > 0 ? (holdingCosts / 30) * holdingDays : 0);

        // Calculate Cash Invested (for Cash-on-Cash Return)
        const cashInvested = downPaymentAmount + rehabCosts + closingCosts + (holdingCosts > 0 && holdingDays > 0 ? (holdingCosts / 30) * holdingDays : 0);

        // Calculate monthly expenses with validation
        const monthlyRent = Math.max(0, parseFloat(formData.monthlyRent) || 0);
        const managementPercent = Math.max(0, Math.min(100, parseFloat(formData.managementPercent) || 0));
        const vacancyRate = Math.max(0, Math.min(100, parseFloat(formData.vacancyRate) || 0));
        
        const managementFee = monthlyRent * (managementPercent / 100);
        
        const monthlyTaxes = Math.max(0, parseFloat(formData.monthlyTaxes) || 0);
        const monthlyInsurance = Math.max(0, parseFloat(formData.monthlyInsurance) || 0);
        const monthlyHOA = Math.max(0, parseFloat(formData.monthlyHOA) || 0);
        const monthlyPMI = Math.max(0, parseFloat(formData.monthlyPMI) || 0);
        const monthlyMaintenance = Math.max(0, parseFloat(formData.monthlyMaintenance) || 0);
        const otherExpenses = Math.max(0, parseFloat(formData.otherExpenses) || 0);
        
        // Total monthly expenses including PITI (Principal, Interest, Taxes, Insurance, PMI)
        const totalMonthlyExpenses = monthlyPI + monthlyTaxes + monthlyInsurance + monthlyPMI +
            monthlyHOA + managementFee + monthlyMaintenance + otherExpenses;

        // Effective rental income after vacancy (FIXED: Use percentage, not flat subtraction)
        const effectiveRent = monthlyRent * (1 - vacancyRate / 100);

        // Calculate key metrics with division by zero protection
        const monthlyCashFlow = effectiveRent - totalMonthlyExpenses;
        const annualNOI = (effectiveRent * 12) - ((monthlyTaxes + monthlyInsurance + monthlyPMI + monthlyHOA +
            managementFee + monthlyMaintenance + otherExpenses) * 12);
        
        // FIXED: Cap Rate uses Total Invested, not Purchase Price
        const capRate = totalInvested > 0 ? (annualNOI / totalInvested) * 100 : 0;
        
        // FIXED: Cash-on-Cash Return uses Cash Invested, not Down Payment
        const cocReturn = cashInvested > 0 ? ((monthlyCashFlow * 12) / cashInvested) * 100 : 0;
        
        const onePercentRatio = purchasePrice > 0 ? (monthlyRent / purchasePrice) * 100 : 0;
        const dscr = monthlyPI > 0 ? effectiveRent / monthlyPI : (effectiveRent > 0 ? Infinity : 0);

        // FIXED: ROI Calculation - Include all costs
        const netProfit = arv > 0 ? (arv - totalInvested - sellingCosts) : 0;
        const roi = totalInvested > 0 ? (netProfit / totalInvested) * 100 : 0;

        // FIXED: Equity/ARV Spread Calculation - Subtract selling costs
        const equity = arv > 0 ? (arv - totalInvested - sellingCosts) : 0;

        setMetrics({
            downPaymentAmount,
            loanAmount,
            monthlyPI,
            totalMonthlyExpenses,
            monthlyCashFlow,
            annualNOI,
            capRate,
            cocReturn,
            onePercentRatio,
            dscr,
            annualIncome: effectiveRent * 12,
            annualExpenses: (totalMonthlyExpenses - monthlyPI) * 12,
            annualCashFlow: monthlyCashFlow * 12,
            // New metrics
            totalInvested,
            cashInvested,
            roi,
            netProfit,
            equity,
            effectiveRent
        });
    };

    const generateRecommendation = () => {
        if (!metrics) return '';

        if (metrics.monthlyCashFlow > 0 && metrics.capRate >= 8 && metrics.cocReturn >= 12) {
            return '🟢 STRONG BUY: Excellent cash flow and returns. This property meets all key investment criteria.';
        } else if (metrics.monthlyCashFlow > 0 && (metrics.capRate >= 6 || metrics.cocReturn >= 8)) {
            return '🟡 CONSIDER: Positive cash flow with decent returns. Review market conditions and growth potential.';
        } else if (metrics.monthlyCashFlow >= -100 && (metrics.capRate >= 5 || metrics.cocReturn >= 5)) {
            return '🟡 MARGINAL: Break-even or slight negative cash flow. Consider if appreciation potential justifies investment.';
        } else {
            return '🔴 AVOID: Poor cash flow and returns. This investment does not meet minimum criteria.';
        }
    };

    return (
        <div className="investment-analysis">
            <style jsx>{`
        .investment-analysis {
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
                    <h1>Investment Property Analysis</h1>
                </div>

                <div className="disclaimer">
                    <strong>ADVANCED ANALYSIS TOOL:</strong> This calculator provides detailed investment metrics for real estate professionals and investors. Not intended as financial advice.
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
                                <label className="form-label">Purchase Price:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="purchasePrice"
                                    value={formData.purchasePrice}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Down Payment (%):</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="downPaymentPercent"
                                    value={formData.downPaymentPercent}
                                    onChange={handleInputChange}
                                    placeholder="20"
                                    min="0"
                                    max="100"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Down Payment ($):</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={metrics?.downPaymentAmount || 0}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-title">Financing Details</div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Loan Amount:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={metrics?.loanAmount || 0}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Interest Rate (%):</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="interestRate"
                                    value={formData.interestRate}
                                    onChange={handleInputChange}
                                    placeholder="6.5"
                                    min="0"
                                    max="30"
                                    step="0.01"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Loan Term (Years):</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="loanTerm"
                                    value={formData.loanTerm}
                                    onChange={handleInputChange}
                                    placeholder="30"
                                    min="1"
                                    max="50"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Monthly Principal & Interest:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={metrics?.monthlyPI || 0}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-title">Monthly Income & Expenses</div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Monthly Rental Income:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="monthlyRent"
                                    value={formData.monthlyRent}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Property Taxes (Monthly):</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="monthlyTaxes"
                                    value={formData.monthlyTaxes}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Insurance (Monthly):</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="monthlyInsurance"
                                    value={formData.monthlyInsurance}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">HOA Fees (Monthly):</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="monthlyHOA"
                                    value={formData.monthlyHOA}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Property Management (%):</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="managementPercent"
                                    value={formData.managementPercent}
                                    onChange={handleInputChange}
                                    placeholder="10"
                                    min="0"
                                    max="50"
                                    step="0.1"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Maintenance & Repairs (Monthly):</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="monthlyMaintenance"
                                    value={formData.monthlyMaintenance}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Vacancy Rate (%):</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="vacancyRate"
                                    value={formData.vacancyRate}
                                    onChange={handleInputChange}
                                    placeholder="5"
                                    min="0"
                                    max="50"
                                    step="0.1"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Other Monthly Expenses:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="otherExpenses"
                                    value={formData.otherExpenses}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">PMI (Monthly) - If Applicable:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="monthlyPMI"
                                    value={formData.monthlyPMI}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-title">Additional Investment Costs</div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Rehab/Repair Costs:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="rehabCosts"
                                    value={formData.rehabCosts}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

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
                                <label className="form-label">ARV (After Repair Value):</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="arv"
                                    value={formData.arv}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Selling Costs:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="sellingCosts"
                                    value={formData.sellingCosts}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <button type="button" className="calculate-btn" onClick={calculateMetrics}>
                        Calculate Investment Metrics
                    </button>

                    {metrics && (
                        <div className="results-panel">
                            <div className="section-title">Investment Analysis Results</div>

                            <div className="form-grid">
                                <div className="metric-card">
                                    <div className="metric-value">${metrics.monthlyCashFlow.toFixed(2)}</div>
                                    <div className="metric-label">Monthly Cash Flow</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">{metrics.capRate.toFixed(2)}%</div>
                                    <div className="metric-label">Cap Rate</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">{metrics.cocReturn.toFixed(2)}%</div>
                                    <div className="metric-label">Cash-on-Cash Return</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">{metrics.onePercentRatio.toFixed(2)}%</div>
                                    <div className="metric-label">1% Rule Ratio</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">{metrics.dscr.toFixed(2)}</div>
                                    <div className="metric-label">Debt Service Coverage</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">${metrics.totalMonthlyExpenses.toFixed(2)}</div>
                                    <div className="metric-label">Total Monthly Expenses</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">{metrics.roi.toFixed(2)}%</div>
                                    <div className="metric-label">ROI (Return on Investment)</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-value">${metrics.equity.toFixed(2)}</div>
                                    <div className="metric-label">Equity (ARV - Total Invested - Selling Costs)</div>
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="section-title">Annual Summary</div>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Annual Gross Income:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.annualIncome.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Annual Operating Expenses:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.annualExpenses.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Annual Net Operating Income:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.annualNOI.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Annual Cash Flow:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.annualCashFlow.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Total Invested:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.totalInvested.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Cash Invested:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.cashInvested.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Net Profit (if sold at ARV):</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={`$${metrics.netProfit.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="section-title">Investment Recommendation</div>
                                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', marginTop: '15px' }}>
                                    {generateRecommendation()}
                                </div>
                            </div>
                        </div>
                    )}
                </form>

                <button className="print-button" onClick={() => window.print()}>
                    Print Analysis Report
                </button>
            </div>
        </div>
    );
}
