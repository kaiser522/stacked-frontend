import React, { useState, useEffect } from 'react';

const LeasePurchaseTracker = () => {
    const [formData, setFormData] = useState({
        propertyAddress: '',
        tenantName: '',
        leaseStart: '',
        optionPeriod: '24 months',
        monthlyRent: '',
        optionFee: '',
        rentCredit: '',
        purchasePrice: ''
    });

    const [financials, setFinancials] = useState({
        optionFeeDisplay: '$5,000',
        rentCreditDisplay: '$300',
        accumulatedCredits: '$0',
        totalEquity: '$5,000',
        purchasePriceDisplay: '$425,000',
        netPurchase: '$420,000'
    });

    const updateFinancials = () => {
        const startDateInput = formData.leaseStart;
        const currentDate = new Date();

        let monthsElapsed = 0;
        if (startDateInput) {
            const startDate = new Date(startDateInput);
            const timeDiff = currentDate.getTime() - startDate.getTime();
            monthsElapsed = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.44)));
        }

        const monthlyCredit = parseFloat(formData.rentCredit) || 300;
        const optionFee = parseFloat(formData.optionFee) || 5000;
        const purchasePrice = parseFloat(formData.purchasePrice) || 425000;

        const accumulatedCredits = monthsElapsed * monthlyCredit;
        const totalEquity = optionFee + accumulatedCredits;
        const netPurchase = purchasePrice - totalEquity;

        setFinancials({
            optionFeeDisplay: '$' + optionFee.toLocaleString(),
            rentCreditDisplay: '$' + monthlyCredit.toLocaleString(),
            accumulatedCredits: '$' + accumulatedCredits.toLocaleString(),
            totalEquity: '$' + totalEquity.toLocaleString(),
            purchasePriceDisplay: '$' + purchasePrice.toLocaleString(),
            netPurchase: '$' + netPurchase.toLocaleString()
        });
    };

    useEffect(() => {
        updateFinancials();
    }, [formData.leaseStart, formData.rentCredit, formData.optionFee, formData.purchasePrice]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-xl p-8 border border-green-500/30">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                        🏡
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Lease-to-Purchase Tracker</h1>
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full inline-block font-semibold">
                        PROCESS
                    </div>
                    <p className="text-gray-300 mt-4 text-lg">
                        Workflow for rent-to-own transactions including option fees, credit requirements, maintenance responsibilities, and conversion timelines.
                    </p>
                </div>

                <div className="bg-red-500 text-white p-6 rounded-xl text-center font-bold text-lg mb-8">
                    Legal Notice: Lease-to-purchase agreements have complex legal implications. Always recommend clients consult with a real estate attorney before proceeding.
                </div>

                <div className="space-y-8">
                    <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-green-400 mb-6">Agreement Structure & Terms</h2>
                        <p className="text-gray-300 mb-6">Document the key terms and structure of the lease-to-purchase agreement to track throughout the process.</p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-green-400 font-bold mb-2">Property Address</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="Property address"
                                    value={formData.propertyAddress}
                                    onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Tenant/Buyer Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="Tenant/buyer name"
                                    value={formData.tenantName}
                                    onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Lease Start Date</label>
                                <input
                                    type="date"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    value={formData.leaseStart}
                                    onChange={(e) => setFormData({ ...formData, leaseStart: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Option Period Length</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="e.g., 24 months"
                                    value={formData.optionPeriod}
                                    onChange={(e) => setFormData({ ...formData, optionPeriod: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Monthly Rent</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="2500"
                                    value={formData.monthlyRent}
                                    onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Option Fee (Non-refundable)</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="5000"
                                    value={formData.optionFee}
                                    onChange={(e) => setFormData({ ...formData, optionFee: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Monthly Rent Credit</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="300"
                                    value={formData.rentCredit}
                                    onChange={(e) => setFormData({ ...formData, rentCredit: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-green-400 font-bold mb-2">Purchase Price</label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white"
                                    placeholder="425000"
                                    value={formData.purchasePrice}
                                    onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Lease-to-Purchase Timeline</h2>
                        <p className="text-gray-300 mb-6">Track key milestones and deadlines throughout the lease-option period.</p>

                        <div className="space-y-4">
                            <div className="flex items-center p-4 bg-white/10 rounded-lg">
                                <div className="bg-yellow-500 text-black w-24 p-2 rounded-lg text-center font-bold mr-4">
                                    Month 1
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-white">Agreement Execution & Move-In</div>
                                    <div className="text-gray-300 text-sm">Sign lease-purchase agreement, collect option fee and first month's rent, tenant moves in</div>
                                </div>
                                <input
                                    type="text"
                                    className="bg-white/10 border border-white/30 rounded-lg p-2 text-white w-24 text-center"
                                    placeholder="Status"
                                />
                            </div>

                            <div className="flex items-center p-4 bg-white/10 rounded-lg">
                                <div className="bg-yellow-500 text-black w-24 p-2 rounded-lg text-center font-bold mr-4">
                                    Month 3
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-white">Credit Counseling Check-In</div>
                                    <div className="text-gray-300 text-sm">Review credit improvement progress and mortgage readiness timeline</div>
                                </div>
                                <input
                                    type="text"
                                    className="bg-white/10 border border-white/30 rounded-lg p-2 text-white w-24 text-center"
                                    placeholder="Status"
                                />
                            </div>

                            <div className="flex items-center p-4 bg-white/10 rounded-lg">
                                <div className="bg-yellow-500 text-black w-24 p-2 rounded-lg text-center font-bold mr-4">
                                    Month 6
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-white">Mid-Term Review</div>
                                    <div className="text-gray-300 text-sm">Assess payment history, property condition, and mortgage qualification progress</div>
                                </div>
                                <input
                                    type="text"
                                    className="bg-white/10 border border-white/30 rounded-lg p-2 text-white w-24 text-center"
                                    placeholder="Status"
                                />
                            </div>

                            <div className="flex items-center p-4 bg-white/10 rounded-lg">
                                <div className="bg-yellow-500 text-black w-24 p-2 rounded-lg text-center font-bold mr-4">
                                    Month 12
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-white">Annual Assessment</div>
                                    <div className="text-gray-300 text-sm">Formal review of agreement terms, credit status, and purchase readiness</div>
                                </div>
                                <input
                                    type="text"
                                    className="bg-white/10 border border-white/30 rounded-lg p-2 text-white w-24 text-center"
                                    placeholder="Status"
                                />
                            </div>

                            <div className="flex items-center p-4 bg-white/10 rounded-lg">
                                <div className="bg-yellow-500 text-black w-24 p-2 rounded-lg text-center font-bold mr-4">
                                    Month 18
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-white">Pre-Purchase Preparation</div>
                                    <div className="text-gray-300 text-sm">Begin mortgage application process, property appraisal, and purchase negotiations</div>
                                </div>
                                <input
                                    type="text"
                                    className="bg-white/10 border border-white/30 rounded-lg p-2 text-white w-24 text-center"
                                    placeholder="Status"
                                />
                            </div>

                            <div className="flex items-center p-4 bg-white/10 rounded-lg">
                                <div className="bg-yellow-500 text-black w-24 p-2 rounded-lg text-center font-bold mr-4">
                                    Month 24
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-white">Option Deadline</div>
                                    <div className="text-gray-300 text-sm">Final deadline to exercise purchase option or agreement expires</div>
                                </div>
                                <input
                                    type="text"
                                    className="bg-white/10 border border-white/30 rounded-lg p-2 text-white w-24 text-center"
                                    placeholder="Status"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-red-400 mb-6">Financial Tracking</h2>
                        <p className="text-gray-300 mb-6">Monitor rent credits, option fees, and accumulated equity throughout the lease period.</p>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white/10 rounded-lg p-4 text-center">
                                <div className="text-red-400 font-bold mb-2">Option Fee Paid</div>
                                <div className="text-2xl font-bold text-red-400">{financials.optionFeeDisplay}</div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4 text-center">
                                <div className="text-red-400 font-bold mb-2">Monthly Rent Credit</div>
                                <div className="text-2xl font-bold text-red-400">{financials.rentCreditDisplay}</div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4 text-center">
                                <div className="text-red-400 font-bold mb-2">Accumulated Credits</div>
                                <div className="text-2xl font-bold text-red-400">{financials.accumulatedCredits}</div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4 text-center">
                                <div className="text-red-400 font-bold mb-2">Total Equity Built</div>
                                <div className="text-2xl font-bold text-red-400">{financials.totalEquity}</div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4 text-center">
                                <div className="text-red-400 font-bold mb-2">Purchase Price</div>
                                <div className="text-2xl font-bold text-red-400">{financials.purchasePriceDisplay}</div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4 text-center">
                                <div className="text-red-400 font-bold mb-2">Net Purchase Amount</div>
                                <div className="text-2xl font-bold text-red-400">{financials.netPurchase}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-green-400 mb-6">Tenant/Buyer Requirements</h2>
                        <p className="text-gray-300 mb-6">Track compliance with credit improvement, maintenance, and purchase preparation requirements.</p>

                        <div className="space-y-6">
                            <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-6">
                                <h3 className="text-red-400 font-bold mb-4">Credit & Financial Requirements</h3>

                                <div className="space-y-4">
                                    <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                        <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                        <div className="text-gray-300">
                                            <strong>Credit Counseling Enrollment</strong><br />
                                            Must enroll in approved credit counseling program within 30 days of lease start
                                        </div>
                                    </label>

                                    <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                        <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                        <div className="text-gray-300">
                                            <strong>Monthly Credit Reports</strong><br />
                                            Provide credit reports quarterly to track improvement progress
                                        </div>
                                    </label>

                                    <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                        <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                        <div className="text-gray-300">
                                            <strong>Savings Plan Documentation</strong><br />
                                            Show evidence of systematic savings for down payment and closing costs
                                        </div>
                                    </label>

                                    <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                        <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                        <div className="text-gray-300">
                                            <strong>Employment Stability</strong><br />
                                            Maintain stable employment and provide income verification as requested
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-xl p-6">
                                <h3 className="text-yellow-400 font-bold mb-4">Property Maintenance Requirements</h3>

                                <div className="space-y-4">
                                    <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                        <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                        <div className="text-gray-300">
                                            <strong>Routine Maintenance</strong><br />
                                            Handle all routine maintenance items under $250 per occurrence
                                        </div>
                                    </label>

                                    <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                        <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                        <div className="text-gray-300">
                                            <strong>Property Insurance</strong><br />
                                            Maintain renter's insurance and provide proof of coverage annually
                                        </div>
                                    </label>

                                    <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                        <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                        <div className="text-gray-300">
                                            <strong>Property Condition</strong><br />
                                            Maintain property in good condition and allow periodic inspections
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-6">
                                <h3 className="text-green-400 font-bold mb-4">Purchase Preparation</h3>

                                <div className="space-y-4">
                                    <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                        <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                        <div className="text-gray-300">
                                            <strong>Mortgage Pre-Qualification</strong><br />
                                            Obtain mortgage pre-qualification 6 months before option deadline
                                        </div>
                                    </label>

                                    <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                        <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                        <div className="text-gray-300">
                                            <strong>Property Appraisal</strong><br />
                                            Coordinate independent appraisal 90 days before purchase deadline
                                        </div>
                                    </label>

                                    <label className="flex items-start p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 transition-all">
                                        <input type="checkbox" className="mr-4 mt-1 scale-125" />
                                        <div className="text-gray-300">
                                            <strong>Final Walkthrough</strong><br />
                                            Complete final property inspection 30 days before closing
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-green-400 mb-6">Important Considerations</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4">
                                <h3 className="text-red-400 font-bold mb-3">Benefits for Buyers</h3>
                                <ul className="text-gray-300 space-y-2">
                                    <li>• <strong>Time to Improve Credit:</strong> Build credit score while living in the home</li>
                                    <li>• <strong>Rent Credits:</strong> Portion of rent goes toward down payment</li>
                                    <li>• <strong>Test Drive:</strong> Experience the home and neighborhood before buying</li>
                                    <li>• <strong>Price Lock:</strong> Purchase price set regardless of market changes</li>
                                </ul>
                            </div>

                            <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-xl p-4">
                                <h3 className="text-yellow-400 font-bold mb-3">Risks for Buyers</h3>
                                <ul className="text-gray-300 space-y-2">
                                    <li>• <strong>Non-Refundable Fees:</strong> Option fee and rent credits lost if not purchased</li>
                                    <li>• <strong>Maintenance Costs:</strong> Often responsible for repairs during lease</li>
                                    <li>• <strong>Market Risk:</strong> Locked into price even if property value decreases</li>
                                    <li>• <strong>Qualification Risk:</strong> May still not qualify for mortgage at purchase time</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeasePurchaseTracker;
