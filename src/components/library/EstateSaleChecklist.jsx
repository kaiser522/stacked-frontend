import React from 'react';

const EstateSaleChecklist = () => {
    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
            color: 'white',
            lineHeight: '1.6',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '40px',
                    marginBottom: '30px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: '#FF6B35',
                        borderRadius: '8px',
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '24px'
                    }}>🏠</div>
                    <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#00D4AA' }}>Estate Sale Checklist</h1>
                    <p style={{ fontSize: '1.1em', marginTop: '10px' }}>Complete checklist for managing estate sales and property liquidation</p>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '30px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 style={{ color: '#00D4AA', fontSize: '1.8em', marginBottom: '20px' }}>Pre-Sale Preparation</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '20px 0' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #FFD700' }}>
                            <h3 style={{ color: '#FFD700', fontSize: '1.2em', marginBottom: '15px' }}>Legal Documentation</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Death certificate and probate documents</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Estate executor authorization</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Property title and ownership verification</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Tax records and property assessments</span>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #00D4AA' }}>
                            <h3 style={{ color: '#00D4AA', fontSize: '1.2em', marginBottom: '15px' }}>Property Assessment</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Professional property appraisal</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Home inspection and condition report</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Market analysis and comparable sales</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Utility and maintenance records</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '30px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 style={{ color: '#00D4AA', fontSize: '1.8em', marginBottom: '20px' }}>Sale Preparation</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '20px 0' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #FF6B35' }}>
                            <h3 style={{ color: '#FF6B35', fontSize: '1.2em', marginBottom: '15px' }}>Property Cleanup</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Remove personal belongings and furniture</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Deep cleaning and staging preparation</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Repair any obvious damage or issues</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Landscaping and curb appeal improvements</span>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #FFD700' }}>
                            <h3 style={{ color: '#FFD700', fontSize: '1.2em', marginBottom: '15px' }}>Marketing Preparation</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Professional photography and virtual tours</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>MLS listing and marketing materials</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Open house scheduling and preparation</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Digital marketing and social media promotion</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '30px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 style={{ color: '#00D4AA', fontSize: '1.8em', marginBottom: '20px' }}>Financial & Legal</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '20px 0' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #4ecdc4' }}>
                            <h3 style={{ color: '#4ecdc4', fontSize: '1.2em', marginBottom: '15px' }}>Financial Planning</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Estate tax implications and planning</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Capital gains tax considerations</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Proceeds distribution planning</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Estate attorney consultation</span>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #ff6b6b' }}>
                            <h3 style={{ color: '#ff6b6b', fontSize: '1.2em', marginBottom: '15px' }}>Legal Requirements</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Probate court approval for sale</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Beneficiary consent and signatures</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Title search and clearance</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Estate sale authorization documents</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '30px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 style={{ color: '#00D4AA', fontSize: '1.8em', marginBottom: '20px' }}>Sale Execution</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '20px 0' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #00D4AA' }}>
                            <h3 style={{ color: '#00D4AA', fontSize: '1.2em', marginBottom: '15px' }}>Offer Management</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Review and evaluate all offers</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Coordinate with estate attorney on terms</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Negotiate contract terms and conditions</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Obtain all required signatures and approvals</span>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #FFD700' }}>
                            <h3 style={{ color: '#FFD700', fontSize: '1.2em', marginBottom: '15px' }}>Closing Process</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Coordinate with title company and escrow</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Prepare estate sale documentation</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Arrange final walkthrough and inspection</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Complete closing and fund distribution</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    background: 'rgba(0, 212, 170, 0.2)',
                    border: '2px solid #00D4AA',
                    borderRadius: '15px',
                    padding: '25px',
                    margin: '30px 0',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#00D4AA', marginBottom: '15px' }}>Important Notes</h3>
                    <p style={{ fontSize: '1.1em', marginBottom: '15px', color: '#E6F3FF' }}>
                        Estate sales require special handling due to legal and emotional complexities. Always work with qualified professionals including estate attorneys, tax advisors, and experienced real estate agents.
                    </p>
                    <p style={{ fontSize: '1em', color: '#B0C4DE' }}>
                        This checklist ensures all critical steps are completed for a successful estate sale transaction.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EstateSaleChecklist;
