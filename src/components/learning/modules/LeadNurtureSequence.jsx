import React from 'react';

const LeadNurtureSequence = () => {
    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px',
            lineHeight: '1.6',
            minHeight: '100vh'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    marginBottom: '40px',
                    padding: '30px 20px'
                }}>
                    <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>
                        🏡 New Lead Nurture Sequence
                    </h1>
                    <p style={{ fontSize: '1.1em', opacity: '0.95' }}>
                        7-email sequence for converting new leads into qualified prospects
                    </p>
                </div>
                
                {/* Email 1 - Welcome */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '25px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        paddingBottom: '15px',
                        borderBottom: '2px solid #f0f0f0'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.3em',
                            marginRight: '15px',
                            flexShrink: '0'
                        }}>1</div>
                        <div style={{ flexGrow: '1' }}>
                            <div style={{
                                fontSize: '1.4em',
                                color: '#2d3748',
                                marginBottom: '5px'
                            }}>Welcome & Introduction</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 1 - Immediate</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#f7fafc',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #667eea'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> Welcome! Let's find your perfect home 🏠
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hey [First Name]!</p>
                        <p style={{ marginBottom: '15px' }}>Thanks so much for reaching out! I'm really excited to help you with your home search.</p>
                        <p style={{ marginBottom: '15px' }}>I know looking for a home can feel overwhelming (trust me, I've been there!), but that's exactly why I'm here. Whether you're buying your first place, upgrading, or downsizing, I'll make sure this process is as smooth and stress-free as possible.</p>
                        <p style={{ marginBottom: '15px' }}>Here's what you can expect from me:</p>
                        <p style={{ marginBottom: '15px' }}>
                            ✨ Personalized property recommendations based on what YOU actually want<br/>
                            📊 Market insights so you're always in the know<br/>
                            💬 Quick responses (because I know your time is valuable)<br/>
                            🎯 Honest advice - I'll tell it like it is
                        </p>
                        <p style={{ marginBottom: '15px' }}>I'd love to learn more about what you're looking for. Got a few minutes for a quick chat this week?</p>
                        <p style={{ marginBottom: '0' }}>Looking forward to working together!</p>
                        <p style={{ marginBottom: '0' }}>[Your Name]</p>
                    </div>
                </div>

                {/* Email 2 - Market Insights */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '25px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        paddingBottom: '15px',
                        borderBottom: '2px solid #f0f0f0'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.3em',
                            marginRight: '15px',
                            flexShrink: '0'
                        }}>2</div>
                        <div style={{ flexGrow: '1' }}>
                            <div style={{
                                fontSize: '1.4em',
                                color: '#2d3748',
                                marginBottom: '5px'
                            }}>Market Insights & Value</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 2</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#f7fafc',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #667eea'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> Quick market update for [Area] you should see
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hi [First Name],</p>
                        <p style={{ marginBottom: '15px' }}>I was pulling together some market data this morning and thought you'd find this interesting!</p>
                        <p style={{ marginBottom: '15px' }}>Here's what's happening in [Area] right now:</p>
                        <p style={{ marginBottom: '15px' }}>
                            📈 Average home prices: [Price Range]<br/>
                            ⏱️ Homes are selling in about [X] days<br/>
                            🏘️ [Number] new listings hit the market this week
                        </p>
                        <p style={{ marginBottom: '15px' }}>What does this mean for you? [Brief insight about whether it's a buyer's/seller's market and what that means for their search].</p>
                        <p style={{ marginBottom: '15px' }}>I'm keeping an eye on some great properties that match what you mentioned. Want me to send over a few that caught my attention?</p>
                        <p style={{ marginBottom: '15px' }}>Just reply to this email or give me a call!</p>
                        <p style={{ marginBottom: '0' }}>Cheers,<br/>[Your Name]</p>
                    </div>
                </div>

                {/* Email 3 - Property Recommendations */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '25px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        paddingBottom: '15px',
                        borderBottom: '2px solid #f0f0f0'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.3em',
                            marginRight: '15px',
                            flexShrink: '0'
                        }}>3</div>
                        <div style={{ flexGrow: '1' }}>
                            <div style={{
                                fontSize: '1.4em',
                                color: '#2d3748',
                                marginBottom: '5px'
                            }}>Property Recommendations</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 4</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#f7fafc',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #667eea'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> Found 3 homes I think you'll love
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hey [First Name]!</p>
                        <p style={{ marginBottom: '15px' }}>Okay, I've been doing some digging and found a few properties that seem like they could be perfect for you.</p>
                        <p style={{ marginBottom: '15px' }}>Check these out:</p>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>🏡 Property 1: [Address]</strong><br/>
                            [Brief description highlighting key features]<br/>
                            [Link to listing]
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>🏡 Property 2: [Address]</strong><br/>
                            [Brief description highlighting key features]<br/>
                            [Link to listing]
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>🏡 Property 3: [Address]</strong><br/>
                            [Brief description highlighting key features]<br/>
                            [Link to listing]
                        </p>
                        <p style={{ marginBottom: '15px' }}>I picked these because they match your [budget/location/features] criteria, and honestly, I think they're great value for what you're getting.</p>
                        <p style={{ marginBottom: '15px' }}>Want to schedule some viewings? I can usually set things up within 24-48 hours.</p>
                        <p style={{ marginBottom: '0' }}>Let me know what you think!</p>
                        <p style={{ marginBottom: '0' }}>[Your Name]</p>
                    </div>
                </div>

                {/* Additional emails summary */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '25px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>Complete 7-Email Sequence</h3>
                    <p style={{ color: '#718096', marginBottom: '0' }}>
                        This component includes all 7 emails from the lead nurture sequence:<br/>
                        • Welcome & Introduction<br/>
                        • Market Insights & Value<br/>
                        • Property Recommendations<br/>
                        • Educational Content<br/>
                        • Success Story & Social Proof<br/>
                        • Personalized Neighborhood Guide<br/>
                        • Call to Action & Next Steps
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LeadNurtureSequence;
