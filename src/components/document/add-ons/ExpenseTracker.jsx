import React, { useState, useEffect } from "react";

export default function ExpenseTracker() {
    const [formData, setFormData] = useState({
        taxYear: new Date().getFullYear().toString(),
        taxpayerName: "",
        businessStructure: "sole-proprietor",
        businessActivity: "real-estate-agent",
        grossIncome: 0,
        rentalIncome: 0,
        managementFees: 0,
        otherIncome: 0,
        // Vehicle & Travel
        vehicle1: 0,
        miles1: 0,
        travel1: 0,
        parking1: 0,
        // Marketing & Advertising
        advertising2: 0,
        marketing2: 0,
        website2: 0,
        photo2: 0,
        // Professional Services
        legal3: 0,
        accounting3: 0,
        insurance3: 0,
        education3: 0,
        // Office & Equipment
        rent4: 0,
        supplies4: 0,
        equipment4: 0,
        phone4: 0,
        // Property Expenses
        propertyTaxes: 0,
        mortgageInterest: 0,
        depreciation: 0,
        repairs: 0,
        propManagement: 0,
        utilities: 0
    });

    const [mileageDeduction, setMileageDeduction] = useState(0);
    const [taxSummary, setTaxSummary] = useState(null);

    useEffect(() => {
        updateMileageDeduction();
    }, [formData.miles1]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const updateMileageDeduction = () => {
        const miles = parseFloat(formData.miles1) || 0;
        const mileageRate = 0.655; // 2024 IRS rate
        const deduction = Math.max(0, miles * mileageRate); // Ensure non-negative
        setMileageDeduction(deduction);
    };

    const calculateTaxSummary = () => {
        // Helper function to safely parse numbers (handles NaN, empty strings, null, undefined)
        const safeParseFloat = (value) => {
            const parsed = parseFloat(value);
            return isNaN(parsed) ? 0 : parsed;
        };

        // Calculate total income with safe parsing
        const totalIncome = safeParseFloat(formData.grossIncome) +
            safeParseFloat(formData.rentalIncome) +
            safeParseFloat(formData.managementFees) +
            safeParseFloat(formData.otherIncome);

        // Calculate business expenses with safe parsing
        let vehicleExpenses = safeParseFloat(formData.vehicle1) +
            safeParseFloat(formData.travel1) +
            safeParseFloat(formData.parking1) +
            (mileageDeduction || 0);

        let marketingExpenses = safeParseFloat(formData.advertising2) +
            safeParseFloat(formData.marketing2) +
            safeParseFloat(formData.website2) +
            safeParseFloat(formData.photo2);

        let professionalExpenses = safeParseFloat(formData.legal3) +
            safeParseFloat(formData.accounting3) +
            safeParseFloat(formData.insurance3) +
            safeParseFloat(formData.education3);

        let officeExpenses = safeParseFloat(formData.rent4) +
            safeParseFloat(formData.supplies4) +
            safeParseFloat(formData.equipment4) +
            safeParseFloat(formData.phone4);

        let propertyExpenses = safeParseFloat(formData.propertyTaxes) +
            safeParseFloat(formData.mortgageInterest) +
            safeParseFloat(formData.depreciation) +
            safeParseFloat(formData.repairs) +
            safeParseFloat(formData.propManagement) +
            safeParseFloat(formData.utilities);

        const totalExpenses = vehicleExpenses + marketingExpenses + professionalExpenses +
            officeExpenses + propertyExpenses;

        const netIncome = totalIncome - totalExpenses;
        const selfEmploymentTax = Math.max(0, netIncome * 0.1413);
        const estimatedQuarterlyTax = Math.max(0, netIncome * 0.25) / 4;

        setTaxSummary({
            totalIncome,
            totalExpenses,
            netIncome,
            selfEmploymentTax,
            estimatedQuarterlyTax,
            vehicleExpenses,
            marketingExpenses,
            professionalExpenses,
            officeExpenses,
            propertyExpenses,
            effectiveRate: totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0
        });
    };

    const generateRecommendations = () => {
        if (!taxSummary) return '';

        let recommendations = '';

        if (taxSummary.effectiveRate < 30) {
            recommendations += '💡 <strong>Maximize Deductions:</strong> Consider additional deductible expenses like equipment purchases, professional development, and home office deductions.<br><br>';
        }

        if (taxSummary.netIncome > 50000) {
            recommendations += '💼 <strong>Retirement Planning:</strong> Consider retirement plan contributions (SEP-IRA, Solo 401k) to reduce taxable income. You could contribute up to 25% of net self-employment income.<br><br>';
        }

        if (taxSummary.totalExpenses < 10000) {
            recommendations += '🔍 <strong>Review Missed Deductions:</strong> You may be missing potential deductions - vehicle expenses, marketing costs, and professional services.<br><br>';
        }

        if (taxSummary.estimatedQuarterlyTax > 1000) {
            recommendations += `📅 <strong>Quarterly Payments:</strong> Estimated quarterly tax payment: $${taxSummary.estimatedQuarterlyTax.toLocaleString()}. Make payments by Jan 15, Apr 15, Jun 15, and Sep 15.<br><br>`;
        }

        recommendations += '📊 <strong>Record Keeping:</strong> Maintain detailed records and receipts for all business expenses throughout the year.<br><br>';
        recommendations += '🏠 <strong>Home Office:</strong> If you use part of your home exclusively for business, consider the home office deduction.';

        return recommendations;
    };

    const exportData = () => {
        const data = {
            ...formData,
            mileageDeduction,
            taxSummary,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tax_data_${formData.taxYear}_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('Tax data exported successfully!');
    };

    return (
        <div className="expense-tracker">
            <style jsx>{`
        .expense-tracker {
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
        
        .expense-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 20px;
          margin: 15px 0;
          border-left: 4px solid #FFD700;
          transition: all 0.3s ease;
        }
        
        .expense-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .expense-title {
          color: #FFD700;
          font-weight: bold;
          font-size: 1.2em;
        }
        
        .mileage-calculation {
          background: rgba(0, 212, 170, 0.1);
          padding: 10px;
          border-radius: 5px;
          margin-top: 10px;
          font-size: 0.9em;
        }
        
        .calculate-btn {
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
        
        .calculate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
        }
        
        .print-button {
          background: #6c757d;
          color: white;
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
          box-shadow: 0 5px 15px rgba(108, 117, 125, 0.3);
        }
        
        .export-btn {
          background: #17a2b8;
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          margin: 10px;
          transition: all 0.3s ease;
        }
        
        .export-btn:hover {
          background: #138496;
          transform: translateY(-1px);
        }
        
        .tax-summary {
          background: linear-gradient(135deg, #6c5ce7, #a29bfe);
          color: white;
          border-radius: 15px;
          padding: 30px;
          margin: 20px 0;
          font-weight: bold;
        }
        
        .tax-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        
        .tax-item {
          text-align: center;
          padding: 15px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
        }
        
        .tax-value {
          font-size: 1.8em;
          margin-bottom: 5px;
        }
        
        .tax-label {
          font-size: 0.9em;
          opacity: 0.9;
        }
        
        .readonly-field {
          background: rgba(255, 255, 255, 0.05) !important;
          color: #FFD700 !important;
          font-weight: bold;
        }
        
        @media (max-width: 768px) {
          .form-header {
            padding: 20px;
          }
          
          .form-section {
            padding: 20px;
          }
          
          .expense-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
        }
      `}</style>

            <div className="container">
                <div className="form-header">
                    <div className="logo">📊</div>
                    <h1>Real Estate Expense & Tax Tracker</h1>
                </div>

                <div className="disclaimer">
                    <strong>TAX PREPARATION TOOL:</strong> Track business expenses, calculate deductions, and prepare tax documentation for real estate professionals and investors. Consult tax professionals for advice.
                </div>

                <form>
                    <div className="form-section">
                        <div className="section-title">Tax Year Information</div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Tax Year:</label>
                                <select
                                    className="form-select"
                                    name="taxYear"
                                    value={formData.taxYear}
                                    onChange={handleInputChange}
                                >
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Taxpayer Name:</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="taxpayerName"
                                    value={formData.taxpayerName}
                                    onChange={handleInputChange}
                                    placeholder="Full name or business name"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Business Structure:</label>
                                <select
                                    className="form-select"
                                    name="businessStructure"
                                    value={formData.businessStructure}
                                    onChange={handleInputChange}
                                >
                                    <option value="sole-proprietor">Sole Proprietor</option>
                                    <option value="llc">LLC</option>
                                    <option value="corporation">Corporation</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="investor">Real Estate Investor</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Primary Business Activity:</label>
                                <select
                                    className="form-select"
                                    name="businessActivity"
                                    value={formData.businessActivity}
                                    onChange={handleInputChange}
                                >
                                    <option value="real-estate-agent">Real Estate Sales Agent</option>
                                    <option value="real-estate-broker">Real Estate Broker</option>
                                    <option value="property-management">Property Management</option>
                                    <option value="real-estate-investment">Real Estate Investment</option>
                                    <option value="real-estate-development">Real Estate Development</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-title">Business Income</div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Gross Commission Income:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="grossIncome"
                                    value={formData.grossIncome}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Rental Income:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="rentalIncome"
                                    value={formData.rentalIncome}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Property Management Fees:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="managementFees"
                                    value={formData.managementFees}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Other Business Income:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="otherIncome"
                                    value={formData.otherIncome}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-title">Business Expenses</div>

                        <div className="expense-card">
                            <div className="expense-header">
                                <div className="expense-title">Vehicle & Travel Expenses</div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Vehicle Expenses:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="vehicle1"
                                        value={formData.vehicle1}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Business Miles:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="miles1"
                                        value={formData.miles1}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Travel & Meals:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="travel1"
                                        value={formData.travel1}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Parking & Tolls:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="parking1"
                                        value={formData.parking1}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                            </div>
                            <div className="mileage-calculation">
                                Mileage Deduction: ${mileageDeduction.toLocaleString()} ({formData.miles1} miles × $0.655/mile)
                            </div>
                        </div>

                        <div className="expense-card">
                            <div className="expense-header">
                                <div className="expense-title">Marketing & Advertising</div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Advertising Costs:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="advertising2"
                                        value={formData.advertising2}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Marketing Materials:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="marketing2"
                                        value={formData.marketing2}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Website & Online Tools:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="website2"
                                        value={formData.website2}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Photography & Staging:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="photo2"
                                        value={formData.photo2}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="expense-card">
                            <div className="expense-header">
                                <div className="expense-title">Professional Services</div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Legal Fees:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="legal3"
                                        value={formData.legal3}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Accounting Fees:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="accounting3"
                                        value={formData.accounting3}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Insurance Premiums:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="insurance3"
                                        value={formData.insurance3}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Professional Development:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="education3"
                                        value={formData.education3}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="expense-card">
                            <div className="expense-header">
                                <div className="expense-title">Office & Equipment</div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Office Rent:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="rent4"
                                        value={formData.rent4}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Office Supplies:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="supplies4"
                                        value={formData.supplies4}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Equipment & Technology:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="equipment4"
                                        value={formData.equipment4}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone & Internet:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        name="phone4"
                                        value={formData.phone4}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-title">Property-Specific Deductions</div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Property Taxes:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="propertyTaxes"
                                    value={formData.propertyTaxes}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Mortgage Interest:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="mortgageInterest"
                                    value={formData.mortgageInterest}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Depreciation:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="depreciation"
                                    value={formData.depreciation}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Repairs & Maintenance:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="repairs"
                                    value={formData.repairs}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Property Management:</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="propManagement"
                                    value={formData.propManagement}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Utilities (if paid by owner):</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    name="utilities"
                                    value={formData.utilities}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button type="button" className="calculate-btn" onClick={calculateTaxSummary}>
                            Calculate Tax Summary
                        </button>
                        <button type="button" className="export-btn" onClick={exportData}>
                            Export Data
                        </button>
                    </div>

                    {taxSummary && (
                        <div className="tax-summary">
                            <div className="section-title">Tax Calculation Summary</div>

                            <div className="tax-grid">
                                <div className="tax-item">
                                    <div className="tax-value">${taxSummary.totalIncome.toLocaleString()}</div>
                                    <div className="tax-label">Total Business Income</div>
                                </div>
                                <div className="tax-item">
                                    <div className="tax-value">${taxSummary.totalExpenses.toLocaleString()}</div>
                                    <div className="tax-label">Total Deductible Expenses</div>
                                </div>
                                <div className="tax-item">
                                    <div className="tax-value">${taxSummary.netIncome.toLocaleString()}</div>
                                    <div className="tax-label">Net Business Income</div>
                                </div>
                                <div className="tax-item">
                                    <div className="tax-value">${taxSummary.selfEmploymentTax.toLocaleString()}</div>
                                    <div className="tax-label">Estimated Self-Employment Tax</div>
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="section-title">Deduction Breakdown by Category</div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Vehicle & Travel:</label>
                                        <input
                                            type="text"
                                            className="form-input readonly-field"
                                            value={`$${taxSummary.vehicleExpenses.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Marketing & Advertising:</label>
                                        <input
                                            type="text"
                                            className="form-input readonly-field"
                                            value={`$${taxSummary.marketingExpenses.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Professional Services:</label>
                                        <input
                                            type="text"
                                            className="form-input readonly-field"
                                            value={`$${taxSummary.professionalExpenses.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Office & Equipment:</label>
                                        <input
                                            type="text"
                                            className="form-input readonly-field"
                                            value={`$${taxSummary.officeExpenses.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Property Expenses:</label>
                                        <input
                                            type="text"
                                            className="form-input readonly-field"
                                            value={`$${taxSummary.propertyExpenses.toLocaleString()}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Effective Tax Rate:</label>
                                        <input
                                            type="text"
                                            className="form-input readonly-field"
                                            value={`${taxSummary.effectiveRate.toFixed(1)}%`}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="expense-card">
                                    <div className="expense-title">Tax Planning Recommendations</div>
                                    <div
                                        style={{ marginTop: '15px', lineHeight: '1.8' }}
                                        dangerouslySetInnerHTML={{ __html: generateRecommendations() }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </form>

                <button className="print-button" onClick={() => window.print()}>
                    Print Tax Report
                </button>
            </div>
        </div>
    );
}
