import React from 'react';

const AutomatedOfferCalculator = () => {
    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
            color: 'white',
            lineHeight: '1.6',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
                    }}>🤖</div>
                    <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#00D4AA' }}>AI Offer Calculator</h1>
                    <p style={{ fontSize: '1.1em', marginTop: '10px' }}>Smart offer recommendations based on market data</p>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '30px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{ color: '#00D4AA', fontSize: '1.5em', marginBottom: '15px', borderBottom: '2px solid #00D4AA', paddingBottom: '5px' }}>
                        Property Details
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', margin: '20px 0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1em' }}>Property Address:</label>
                            <input type="text" style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '8px',
                                padding: '12px',
                                color: 'white',
                                fontSize: '1em'
                            }} placeholder="123 Main Street" />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1em' }}>List Price:</label>
                            <input type="text" style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '8px',
                                padding: '12px',
                                color: 'white',
                                fontSize: '1em'
                            }} placeholder="$425,000" />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', margin: '20px 0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1em' }}>Days on Market:</label>
                            <input type="number" style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '8px',
                                padding: '12px',
                                color: 'white',
                                fontSize: '1em'
                            }} placeholder="5" />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1em' }}>Square Feet:</label>
                            <input type="number" style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '8px',
                                padding: '12px',
                                color: 'white',
                                fontSize: '1em'
                            }} placeholder="2000" />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1em' }}>Year Built:</label>
                            <input type="number" style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '8px',
                                padding: '12px',
                                color: 'white',
                                fontSize: '1em'
                            }} placeholder="1995" />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1em' }}>Bedrooms/Bathrooms:</label>
                            <input type="text" style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '8px',
                                padding: '12px',
                                color: 'white',
                                fontSize: '1em'
                            }} placeholder="3 bed / 2.5 bath" />
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
                    <div style={{ color: '#00D4AA', fontSize: '1.5em', marginBottom: '15px', borderBottom: '2px solid #00D4AA', paddingBottom: '5px' }}>
                        Market Conditions
                    </div>

                    <div style={{ margin: '15px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '1.1em' }}>Market Heat Level</span>
                            <span>Moderate</span>
                        </div>
                        <input type="range" style={{
                            width: '100%',
                            height: '8px',
                            borderRadius: '4px',
                            background: 'rgba(255, 255, 255, 0.3)',
                            outline: 'none',
                            WebkitAppearance: 'none'
                        }} min="1" max="5" defaultValue="3" />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#ccc', marginTop: '5px' }}>
                            <span>Cold</span>
                            <span>Moderate</span>
                            <span>Hot</span>
                        </div>
                    </div>

                    <div style={{ margin: '15px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '1.1em' }}>Expected Competition</span>
                            <span>3-4 offers</span>
                        </div>
                        <input type="range" style={{
                            width: '100%',
                            height: '8px',
                            borderRadius: '4px',
                            background: 'rgba(255, 255, 255, 0.3)',
                            outline: 'none',
                            WebkitAppearance: 'none'
                        }} min="1" max="5" defaultValue="3" />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#ccc', marginTop: '5px' }}>
                            <span>1-2 offers</span>
                            <span>3-4 offers</span>
                            <span>5+ offers</span>
                        </div>
                    </div>
                </div>

                <div style={{
                    background: 'linear-gradient(135deg, #00D4AA, #00B894)',
                    color: 'white',
                    padding: '30px',
                    borderRadius: '15px',
                    margin: '20px 0',
                    textAlign: 'center',
                    boxShadow: '0 10px 30px rgba(0, 212, 170, 0.3)'
                }}>
                    <h2>AI RECOMMENDED OFFER</h2>
                    <div style={{ fontSize: '2.5em', fontWeight: 'bold', margin: '15px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        $442,500
                    </div>
                    <div style={{ fontSize: '1.2em', margin: '10px 0' }}>
                        +4.1% over list price
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '15px 0' }}>
                        <span>Confidence Level:</span>
                        <div style={{ width: '200px', height: '20px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: 'linear-gradient(90deg, #FFD700, #FFA500)', borderRadius: '10px', width: '85%' }}></div>
                        </div>
                        <span>85%</span>
                    </div>
                </div>

                <div style={{
                    background: 'rgba(255, 215, 0, 0.1)',
                    border: '1px solid #FFD700',
                    borderRadius: '10px',
                    padding: '20px',
                    margin: '20px 0'
                }}>
                    <h3 style={{ color: '#FFD700', marginBottom: '15px' }}>Strategic Recommendations:</h3>
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255, 215, 0, 0.2)' }}>✓ Strong offer due to high competition expected</li>
                        <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255, 215, 0, 0.2)' }}>✓ Consider escalation clause up to your maximum</li>
                        <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255, 215, 0, 0.2)' }}>✓ Shorten inspection period to 5-7 days</li>
                        <li style={{ padding: '8px 0' }}>✓ Offer quick closing if possible</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AutomatedOfferCalculator;
