import React from 'react';

const CommissionCalculator = () => {
    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                        background: '#ff6b6b',
                        borderRadius: '8px',
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '24px'
                    }}>💰</div>
                    <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#4ecdc4' }}>Smart Commission Calculator</h1>
                    <p style={{ fontSize: '1.1em', marginTop: '10px' }}>Calculate commissions, splits, and annual projections</p>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '30px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '5px', marginBottom: '20px' }}>
                        <div style={{ flex: '1', padding: '12px 20px', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: 'bold', background: '#4ecdc4', color: '#333', boxShadow: '0 5px 15px rgba(78, 205, 196, 0.3)' }}>
                            Single Transaction
                        </div>
                        <div style={{ flex: '1', padding: '12px 20px', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: 'bold' }}>
                            Annual Projection
                        </div>
                        <div style={{ flex: '1', padding: '12px 20px', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: 'bold' }}>
                            Split Comparison
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', margin: '20px 0' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '15px', padding: '25px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <h3 style={{ color: '#4ecdc4', fontSize: '1.5em', marginBottom: '15px', borderBottom: '2px solid #4ecdc4', paddingBottom: '5px' }}>
                                Transaction Details
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                                <label style={{ color: '#ffd93d', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1em' }}>Sale Price:</label>
                                <input type="text" style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    color: 'white',
                                    fontSize: '1.1em',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }} placeholder="$525,000" />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                                <label style={{ color: '#ffd93d', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1em' }}>Total Commission Rate:</label>
                                <input type="text" style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    color: 'white',
                                    fontSize: '1.1em',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }} placeholder="6%" />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                                <label style={{ color: '#ffd93d', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1em' }}>Your Side (Buy/Sell):</label>
                                <select style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    color: 'white',
                                    fontSize: '1.1em',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <option value="50">50% (Standard Split)</option>
                                    <option value="100">100% (Dual Agency)</option>
                                    <option value="60">60% (Listing Premium)</option>
                                    <option value="40">40% (Buyer Side)</option>
                                    <option value="custom">Custom %</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                                <label style={{ color: '#ffd93d', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1em' }}>Brokerage Split:</label>
                                <select style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    color: 'white',
                                    fontSize: '1.1em',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <option value="70">70/30 (You/Brokerage)</option>
                                    <option value="80">80/20 (You/Brokerage)</option>
                                    <option value="90">90/10 (You/Brokerage)</option>
                                    <option value="95">95/5 (You/Brokerage)</option>
                                    <option value="100">100/0 (You keep all)</option>
                                    <option value="custom">Custom Split</option>
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', margin: '15px 0' }}>
                                <button style={{
                                    background: 'rgba(255, 107, 107, 0.3)',
                                    border: '1px solid #ff6b6b',
                                    color: 'white',
                                    padding: '10px 15px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontWeight: 'bold'
                                }}>$400K @ 6%</button>
                                <button style={{
                                    background: 'rgba(255, 107, 107, 0.3)',
                                    border: '1px solid #ff6b6b',
                                    color: 'white',
                                    padding: '10px 15px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontWeight: 'bold'
                                }}>$500K @ 6%</button>
                                <button style={{
                                    background: 'rgba(255, 107, 107, 0.3)',
                                    border: '1px solid #ff6b6b',
                                    color: 'white',
                                    padding: '10px 15px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontWeight: 'bold'
                                }}>$750K @ 5.5%</button>
                                <button style={{
                                    background: 'rgba(255, 107, 107, 0.3)',
                                    border: '1px solid #ff6b6b',
                                    color: 'white',
                                    padding: '10px 15px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontWeight: 'bold'
                                }}>$1M @ 5%</button>
                            </div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
                            borderRadius: '15px',
                            padding: '30px',
                            textAlign: 'center',
                            boxShadow: '0 15px 35px rgba(78, 205, 196, 0.3)',
                            position: 'sticky',
                            top: '20px'
                        }}>
                            <h3 style={{ marginBottom: '20px' }}>Your Commission</h3>
                            <div style={{ fontSize: '3em', fontWeight: 'bold', margin: '15px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                                $0
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.3)', fontSize: '1.1em' }}>
                                <span>Sale Price:</span>
                                <span>$0</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.3)', fontSize: '1.1em' }}>
                                <span>Total Commission:</span>
                                <span>$0</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.3)', fontSize: '1.1em' }}>
                                <span>Your Side:</span>
                                <span>$0</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.1)', margin: '10px -15px -15px -15px', borderRadius: '0 0 15px 15px', fontWeight: 'bold', fontSize: '1.2em' }}>
                                <span>After Brokerage Split:</span>
                                <span>$0</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '15px',
                    padding: '25px',
                    margin: '20px 0',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#4ecdc4', fontSize: '1.5em', marginBottom: '15px', borderBottom: '2px solid #4ecdc4', paddingBottom: '5px' }}>
                        Annual Income Projection
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', margin: '20px 0' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                            <h4>Monthly Income</h4>
                            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#ffd93d', margin: '10px 0' }}>$0</div>
                        </div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                            <h4>Annual Income</h4>
                            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#ffd93d', margin: '10px 0' }}>$0</div>
                        </div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                            <h4>Total Volume</h4>
                            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#ffd93d', margin: '10px 0' }}>$0</div>
                        </div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                            <h4>Transactions/Year</h4>
                            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#ffd93d', margin: '10px 0' }}>0</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommissionCalculator;
