import React from 'react';

const ExpiredListingGuide = () => {
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
                    }}>⏰</div>
                    <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#00D4AA' }}>Expired Listing Guide</h1>
                    <p style={{ fontSize: '1.1em', marginTop: '10px' }}>Strategic approach to converting expired listings into new opportunities</p>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '30px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 style={{ color: '#00D4AA', fontSize: '1.8em', marginBottom: '20px' }}>Initial Contact Strategy</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '20px 0' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #FFD700' }}>
                            <h3 style={{ color: '#FFD700', fontSize: '1.2em', marginBottom: '15px' }}>First Contact Approach</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Research property and market history</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Prepare market analysis and pricing strategy</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Develop personalized value proposition</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Schedule initial consultation meeting</span>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #00D4AA' }}>
                            <h3 style={{ color: '#00D4AA', fontSize: '1.2em', marginBottom: '15px' }}>Value Proposition</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Highlight market expertise and results</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Present competitive market analysis</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Demonstrate marketing and technology advantages</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Showcase client testimonials and success stories</span>
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
                    <h2 style={{ color: '#00D4AA', fontSize: '1.8em', marginBottom: '20px' }}>Market Analysis & Pricing</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '20px 0' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #FF6B35' }}>
                            <h3 style={{ color: '#FF6B35', fontSize: '1.2em', marginBottom: '15px' }}>Market Research</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Analyze recent comparable sales</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Review current market conditions and trends</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Identify property-specific factors affecting value</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Calculate days on market and price adjustments</span>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #4ecdc4' }}>
                            <h3 style={{ color: '#4ecdc4', fontSize: '1.2em', marginBottom: '15px' }}>Pricing Strategy</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Develop competitive pricing recommendation</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Create pricing justification and rationale</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Plan for potential price adjustments</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Prepare market positioning strategy</span>
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
                    <h2 style={{ color: '#00D4AA', fontSize: '1.8em', marginBottom: '20px' }}>Marketing & Presentation</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '20px 0' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #FFD700' }}>
                            <h3 style={{ color: '#FFD700', fontSize: '1.2em', marginBottom: '15px' }}>Marketing Plan</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Develop comprehensive marketing strategy</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Plan professional photography and staging</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Create digital marketing materials</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Schedule open houses and showings</span>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #00D4AA' }}>
                            <h3 style={{ color: '#00D4AA', fontSize: '1.2em', marginBottom: '15px' }}>Presentation Materials</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Prepare listing presentation package</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Create market analysis and pricing report</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Develop marketing timeline and strategy</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Prepare contract and commission structure</span>
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
                    <h2 style={{ color: '#00D4AA', fontSize: '1.8em', marginBottom: '20px' }}>Follow-up & Conversion</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '20px 0' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #ff6b6b' }}>
                            <h3 style={{ color: '#ff6b6b', fontSize: '1.2em', marginBottom: '15px' }}>Follow-up Strategy</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Schedule follow-up calls and meetings</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Provide additional market updates</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Address any concerns or objections</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Maintain regular communication</span>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #4ecdc4' }}>
                            <h3 style={{ color: '#4ecdc4', fontSize: '1.2em', marginBottom: '15px' }}>Conversion Process</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Present listing agreement and terms</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Negotiate commission and marketing fees</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Obtain signed listing agreement</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px 0' }}>
                                <input type="checkbox" style={{ marginRight: '10px', transform: 'scale(1.2)' }} />
                                <span>Begin marketing and listing process</span>
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
                    <h3 style={{ color: '#00D4AA', marginBottom: '15px' }}>Success Tips</h3>
                    <p style={{ fontSize: '1.1em', marginBottom: '15px', color: '#E6F3FF' }}>
                        Expired listings represent motivated sellers who are ready to make changes. Approach with empathy, provide value, and demonstrate how your expertise can help them achieve their goals.
                    </p>
                    <p style={{ fontSize: '1em', color: '#B0C4DE' }}>
                        Focus on understanding their previous experience and addressing their specific needs for a successful re-listing.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExpiredListingGuide;
