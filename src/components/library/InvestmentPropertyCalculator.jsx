import React, { useState } from 'react';

const InvestmentPropertyCalculator = () => {
    const [formData, setFormData] = useState({
        purchasePrice: '',
        downPayment: 25,
        interestRate: 7.5,
        loanTerm: 30,
        monthlyRent: '',
        vacancyRate: 5,
        managementFee: 8,
        propertyTax: '',
        insurance: '',
        maintenance: '',
        pmi: '', // FIXED: Add PMI field
        // Additional costs for accurate calculations
        rehabCosts: '',
        closingCosts: '',
        holdingCosts: '',
        holdingDays: '',
        arv: '', // After Repair Value
        sellingCosts: ''
    });

    const [results, setResults] = useState(null);

    const calculateInvestment = () => {
        // Helper function to safely parse numbers
        const safeParseFloat = (value, defaultValue = 0) => {
            if (value === '' || value === null || value === undefined) return defaultValue;
            const parsed = parseFloat(value);
            return isNaN(parsed) ? defaultValue : parsed;
        };

        // Parse and validate inputs
        const purchasePrice = safeParseFloat(formData.purchasePrice);
        const monthlyRent = safeParseFloat(formData.monthlyRent);

        if (!purchasePrice || purchasePrice <= 0 || !monthlyRent || monthlyRent <= 0) {
            alert('Please enter valid purchase price and monthly rent to calculate.');
            return;
        }

        // Calculations with validation
        const downPayment = Math.max(0, Math.min(100, safeParseFloat(formData.downPayment, 25)));
        const interestRate = Math.max(0, safeParseFloat(formData.interestRate, 7.5));
        const loanTerm = Math.max(1, safeParseFloat(formData.loanTerm, 30));
        const vacancyRate = Math.max(0, Math.min(100, safeParseFloat(formData.vacancyRate, 5)));
        const managementFee = Math.max(0, Math.min(100, safeParseFloat(formData.managementFee, 8)));
        const propertyTax = Math.max(0, safeParseFloat(formData.propertyTax, 0));
        const insurance = Math.max(0, safeParseFloat(formData.insurance, 0));
        const maintenance = Math.max(0, safeParseFloat(formData.maintenance, 0));
        const pmi = Math.max(0, safeParseFloat(formData.pmi, 0));
        
        const downPaymentAmount = purchasePrice * (downPayment / 100);
        const loanAmount = Math.max(0, purchasePrice - downPaymentAmount);
        const monthlyInterestRate = (interestRate / 100) / 12;
        const numPayments = loanTerm * 12;
        
        // Additional costs
        const rehabCosts = Math.max(0, safeParseFloat(formData.rehabCosts, 0));
        const closingCosts = Math.max(0, safeParseFloat(formData.closingCosts, 0));
        const holdingCosts = Math.max(0, safeParseFloat(formData.holdingCosts, 0));
        const holdingDays = Math.max(0, safeParseFloat(formData.holdingDays, 0));
        const arv = Math.max(0, safeParseFloat(formData.arv, 0));
        const sellingCosts = Math.max(0, safeParseFloat(formData.sellingCosts, 0));

        // Calculate Total Invested (for Cap Rate and ROI)
        const dailyHoldingCost = holdingCosts > 0 && holdingDays > 0 ? holdingCosts / 30 : 0;
        const totalHoldingCost = dailyHoldingCost * holdingDays;
        const totalInvested = purchasePrice + rehabCosts + closingCosts + totalHoldingCost;

        // Calculate Cash Invested (for Cash-on-Cash Return)
        const cashInvested = downPaymentAmount + rehabCosts + closingCosts + totalHoldingCost;

        // Monthly mortgage payment with division by zero protection
        let monthlyPayment = 0;
        if (loanAmount > 0 && numPayments > 0) {
            if (monthlyInterestRate > 0) {
                const numerator = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numPayments);
                const denominator = Math.pow(1 + monthlyInterestRate, numPayments) - 1;
                monthlyPayment = denominator > 0 ? numerator / denominator : loanAmount / numPayments;
            } else {
                monthlyPayment = loanAmount / numPayments;
            }
        }

        // Monthly income and expenses with validation
        // FIXED: Vacancy uses percentage, not flat subtraction
        const effectiveRent = Math.max(0, monthlyRent * (1 - vacancyRate / 100));
        const monthlyManagement = effectiveRent * (managementFee / 100);
        const monthlyTax = propertyTax / 12;
        const monthlyInsurance = insurance / 12;
        const monthlyPMI = pmi / 12; // FIXED: Include PMI

        // FIXED: Total monthly expenses including PITI (Principal, Interest, Taxes, Insurance, PMI)
        const totalMonthlyExpenses = monthlyPayment + monthlyManagement + monthlyTax + monthlyInsurance + monthlyPMI + maintenance;
        const monthlyCashFlow = effectiveRent - totalMonthlyExpenses;

        // Annual figures
        const annualCashFlow = monthlyCashFlow * 12;
        const annualNOI = (effectiveRent * 12) - ((monthlyManagement + monthlyTax + monthlyInsurance + monthlyPMI + maintenance) * 12);

        // FIXED: Key metrics with correct formulas
        // Cash-on-Cash Return uses Cash Invested, not Down Payment
        const cashOnCashReturn = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
        
        // Cap Rate uses Total Invested, not Purchase Price
        const capRate = totalInvested > 0 ? (annualNOI / totalInvested) * 100 : 0;
        
        const onePercentRule = monthlyRent >= (purchasePrice * 0.01);
        const totalCashNeeded = cashInvested;
        
        // FIXED: ROI Calculation - Include all costs
        const netProfit = arv > 0 ? (arv - totalInvested - sellingCosts) : 0;
        const annualROI = totalInvested > 0 ? (netProfit / totalInvested) * 100 : cashOnCashReturn;

        // Generate recommendation
        let recommendation = '';
        if (monthlyCashFlow > 200 && cashOnCashReturn > 10 && onePercentRule) {
            recommendation = '🟢 Excellent Investment - Strong cash flow and returns meet investment criteria.';
        } else if (monthlyCashFlow > 0 && cashOnCashReturn > 6) {
            recommendation = '🟡 Good Investment - Positive returns with moderate cash flow.';
        } else if (monthlyCashFlow > -100 && capRate > 5) {
            recommendation = '🟡 Marginal Investment - Consider if appreciation potential exists.';
        } else {
            recommendation = '🔴 Poor Investment - Negative cash flow and low returns.';
        }

        setResults({
            monthlyCashFlow,
            cashOnCashReturn,
            capRate,
            onePercentRule,
            totalCashNeeded,
            annualROI,
            recommendation
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-xl p-8 border border-blue-500/30">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                        🏗️
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Investment Property Calculator</h1>
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full inline-block font-semibold">
                        GUIDE
                    </div>
                    <p className="text-gray-300 mt-4 text-lg">
                        ROI analysis tool covering cash flow projections, cap rates, BRRRR strategy, and rental market analysis for investor clients.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-green-400 mb-6">Property Information</h2>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-green-400 font-bold mb-2">Purchase Price</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="425000"
                                    value={formData.purchasePrice}
                                    onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) || '' })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Down Payment %</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="25"
                                    max="100"
                                    value={formData.downPayment}
                                    onChange={(e) => setFormData({ ...formData, downPayment: parseFloat(e.target.value) || 25 })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Interest Rate %</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="7.5"
                                    value={formData.interestRate}
                                    onChange={(e) => setFormData({ ...formData, interestRate: parseFloat(e.target.value) || 7.5 })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Loan Term (Years)</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="30"
                                    value={formData.loanTerm}
                                    onChange={(e) => setFormData({ ...formData, loanTerm: parseFloat(e.target.value) || 30 })}
                                />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-green-400 mb-4">Rental Income & Expenses</h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-green-400 font-bold mb-2">Monthly Rent</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="2800"
                                    value={formData.monthlyRent}
                                    onChange={(e) => setFormData({ ...formData, monthlyRent: parseFloat(e.target.value) || '' })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Vacancy Rate %</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="5"
                                    value={formData.vacancyRate}
                                    onChange={(e) => setFormData({ ...formData, vacancyRate: parseFloat(e.target.value) || 5 })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Property Management %</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="8"
                                    value={formData.managementFee}
                                    onChange={(e) => setFormData({ ...formData, managementFee: parseFloat(e.target.value) || 8 })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Annual Property Tax</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="5100"
                                    value={formData.propertyTax}
                                    onChange={(e) => setFormData({ ...formData, propertyTax: parseFloat(e.target.value) || '' })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Annual Insurance</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="1800"
                                    value={formData.insurance}
                                    onChange={(e) => setFormData({ ...formData, insurance: parseFloat(e.target.value) || '' })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Monthly Maintenance</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="200"
                                    value={formData.maintenance}
                                    onChange={(e) => setFormData({ ...formData, maintenance: parseFloat(e.target.value) || '' })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">PMI (Monthly) - If Applicable</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="0"
                                    value={formData.pmi}
                                    onChange={(e) => setFormData({ ...formData, pmi: parseFloat(e.target.value) || '' })}
                                />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-green-400 mb-4 mt-6">Additional Investment Costs</h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-green-400 font-bold mb-2">Rehab/Repair Costs</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="0"
                                    value={formData.rehabCosts}
                                    onChange={(e) => setFormData({ ...formData, rehabCosts: parseFloat(e.target.value) || '' })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Closing Costs</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="0"
                                    value={formData.closingCosts}
                                    onChange={(e) => setFormData({ ...formData, closingCosts: parseFloat(e.target.value) || '' })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Monthly Holding Costs</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="0"
                                    value={formData.holdingCosts}
                                    onChange={(e) => setFormData({ ...formData, holdingCosts: parseFloat(e.target.value) || '' })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Days Held</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="0"
                                    value={formData.holdingDays}
                                    onChange={(e) => setFormData({ ...formData, holdingDays: parseFloat(e.target.value) || '' })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">ARV (After Repair Value)</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="0"
                                    value={formData.arv}
                                    onChange={(e) => setFormData({ ...formData, arv: parseFloat(e.target.value) || '' })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Selling Costs</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="0"
                                    value={formData.sellingCosts}
                                    onChange={(e) => setFormData({ ...formData, sellingCosts: parseFloat(e.target.value) || '' })}
                                />
                            </div>
                        </div>

                        <button
                            onClick={calculateInvestment}
                            className="w-full bg-yellow-500 text-black py-4 rounded-lg font-bold text-lg mt-6 hover:bg-yellow-400 transition-colors"
                        >
                            Calculate Investment Metrics
                        </button>
                    </div>

                    {results && (
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-xl p-6">
                            <h2 className="text-2xl font-bold mb-6">Investment Analysis Results</h2>

                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-white/90 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">${Math.round(results.monthlyCashFlow).toLocaleString()}</div>
                                    <div className="font-bold text-gray-700">Monthly Cash Flow</div>
                                </div>

                                <div className="bg-white/90 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{results.cashOnCashReturn.toFixed(1)}%</div>
                                    <div className="font-bold text-gray-700">Cash-on-Cash Return</div>
                                </div>

                                <div className="bg-white/90 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{results.capRate.toFixed(1)}%</div>
                                    <div className="font-bold text-gray-700">Cap Rate</div>
                                </div>

                                <div className="bg-white/90 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{results.onePercentRule ? 'Yes' : 'No'}</div>
                                    <div className="font-bold text-gray-700">1% Rule Check</div>
                                </div>

                                <div className="bg-white/90 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">${Math.round(results.totalCashNeeded).toLocaleString()}</div>
                                    <div className="font-bold text-gray-700">Total Cash Needed</div>
                                </div>

                                <div className="bg-white/90 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{results.annualROI.toFixed(1)}%</div>
                                    <div className="font-bold text-gray-700">Annual ROI</div>
                                </div>
                            </div>

                            <div className="bg-white/90 rounded-lg p-4">
                                <h3 className="font-bold text-lg mb-2">Investment Recommendation</h3>
                                <div className="text-gray-800 font-semibold">{results.recommendation}</div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white/10 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-green-400 mb-6">Understanding Investment Metrics</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/5 rounded-lg p-4">
                                <h3 className="text-yellow-400 font-bold mb-2">Cash Flow</h3>
                                <p className="text-gray-300">Monthly rental income minus all expenses including mortgage payment. Positive cash flow means the property pays for itself plus extra income.</p>
                            </div>

                            <div className="bg-white/5 rounded-lg p-4">
                                <h3 className="text-yellow-400 font-bold mb-2">Cash-on-Cash Return</h3>
                                <p className="text-gray-300">Annual cash flow divided by total cash invested. Shows the return on your actual cash investment. Target: 8-12%+</p>
                            </div>

                            <div className="bg-white/5 rounded-lg p-4">
                                <h3 className="text-yellow-400 font-bold mb-2">Cap Rate (Capitalization Rate)</h3>
                                <p className="text-gray-300">Net operating income divided by property value. Measures property's earning potential independent of financing. Higher = better return.</p>
                            </div>

                            <div className="bg-white/5 rounded-lg p-4">
                                <h3 className="text-yellow-400 font-bold mb-2">1% Rule</h3>
                                <p className="text-gray-300">Monthly rent should equal at least 1% of purchase price. Quick screening tool - properties meeting this rule often cash flow positive.</p>
                            </div>

                            <div className="bg-white/5 rounded-lg p-4">
                                <h3 className="text-yellow-400 font-bold mb-2">ROI (Return on Investment)</h3>
                                <p className="text-gray-300">Total annual return including cash flow, appreciation, tax benefits, and principal paydown divided by cash invested.</p>
                            </div>

                            <div className="bg-white/5 rounded-lg p-4">
                                <h3 className="text-yellow-400 font-bold mb-2">BRRRR Strategy</h3>
                                <p className="text-gray-300">Buy, Rehab, Rent, Refinance, Repeat. Strategy to recycle capital by refinancing after adding value through renovations.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-green-400 mb-6">Investment Strategy Guidelines</h2>
                        <p className="text-gray-300 mb-6">Key considerations when evaluating and presenting investment opportunities to clients.</p>

                        <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-xl p-6 mb-6">
                            <h3 className="text-yellow-400 font-bold mb-4">What Makes a Good Investment Property</h3>
                            <div className="text-gray-300 space-y-2">
                                <p><strong>Location:</strong> Growing neighborhoods with job growth and amenities</p>
                                <p><strong>Rent-to-Price Ratio:</strong> Meets or exceeds 1% rule for cash flow</p>
                                <p><strong>Condition:</strong> Move-in ready or value-add opportunity with clear rehab plan</p>
                                <p><strong>Market Fundamentals:</strong> Strong rental demand and limited supply</p>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-6 mb-6">
                            <h3 className="text-red-400 font-bold mb-4">Client Consultation Points</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-green-400 font-bold mb-2">Investment Goals Discussion</label>
                                    <textarea
                                        className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                        placeholder="Document client's investment objectives, risk tolerance, and timeline..."
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-green-400 font-bold mb-2">Market Analysis Notes</label>
                                    <textarea
                                        className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                        placeholder="Local rental market conditions, comparable properties, growth trends..."
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-6">
                            <h3 className="text-red-400 font-bold mb-4">Red Flags to Avoid</h3>
                            <div className="text-gray-300 space-y-2">
                                <p><strong>Negative Cash Flow:</strong> Properties requiring monthly contributions</p>
                                <p><strong>Declining Neighborhoods:</strong> Areas with job losses or declining values</p>
                                <p><strong>High Maintenance Properties:</strong> Old buildings needing constant repairs</p>
                                <p><strong>Oversaturated Markets:</strong> Too many rentals competing for tenants</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentPropertyCalculator;
