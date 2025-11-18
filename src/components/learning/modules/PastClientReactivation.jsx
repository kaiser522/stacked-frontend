import React from 'react';

const PastClientReactivation = () => {
    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
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
                        🔄 Past Client Reactivation
                    </h1>
                    <p style={{ fontSize: '1.1em', opacity: '0.95' }}>
                        Re-engage previous clients with personalized content and referral opportunities
                    </p>
                </div>
                
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    marginBottom: '30px',
                    fontSize: '1.1em'
                }}>
                    📧 4 emails over 10 days
                </div>
                
                {/* Email 1 */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '25px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        paddingBottom: '15px',
                        borderBottom: '2px solid #f0f0f0'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
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
                            }}>Friendly Check-In</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 1</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#f7fafc',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #3b82f6'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> How's life in your home been treating you?
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hey [First Name]!</p>
                        <p style={{ marginBottom: '15px' }}>I hope this email finds you well! I was thinking about you the other day and realized it's been [TIME PERIOD] since we closed on your place at [Address]. Time flies, right?</p>
                        <p style={{ marginBottom: '15px' }}>I wanted to reach out and see how everything's been going. Are you still loving the neighborhood? Have you done any fun updates or projects?</p>
                        <p style={{ marginBottom: '15px' }}>I always love hearing from past clients - you're not just a transaction to me, you're part of my real estate family! 😊</p>
                        <div style={{
                            background: '#eff6ff',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #3b82f6'
                        }}>
                            <strong>Quick favor:</strong> If you've been happy with your home and the service I provided, I'd be incredibly grateful if you could leave a quick review. It really helps other buyers and sellers know what to expect when working with me.<br/><br/>
                            <a href="#" style={{
                                display: 'inline-block',
                                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                                color: 'white',
                                padding: '12px 25px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                marginTop: '10px',
                                transition: 'opacity 0.3s'
                            }}>Leave a Review</a>
                        </div>
                        <p style={{ marginBottom: '15px' }}>Also, I'm always here if you need anything - whether it's contractor recommendations, market updates, or just to chat about real estate!</p>
                        <p style={{ marginBottom: '15px' }}>How have you been?</p>
                        <p style={{ marginBottom: '0' }}>Best,<br/>[Your Name]</p>
                    </div>
                </div>
                
                {/* Email 2 */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '25px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        paddingBottom: '15px',
                        borderBottom: '2px solid #f0f0f0'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
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
                            }}>Market Update & Value</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 3</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#f7fafc',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #3b82f6'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> You won't believe what's happening in your neighborhood 📈
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hi [First Name],</p>
                        <p style={{ marginBottom: '15px' }}>I just pulled some market data for your area and thought you'd find this interesting!</p>
                        <p style={{ marginBottom: '15px' }}><strong>Your Neighborhood Update ([Neighborhood]):</strong></p>
                        <p style={{ marginBottom: '15px' }}>
                            🏘️ <strong>[X] homes sold in the last 3 months</strong><br/>
                            Average sale price: $[Amount]<br/>
                            That's up [X]% from this time last year!
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            📊 <strong>Your estimated home value:</strong><br/>
                            Based on recent sales, your home at [Address] is estimated to be worth around $[Range]. That means you've gained approximately $[Amount] in equity since you bought it!
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            ⏱️ <strong>Market conditions:</strong><br/>
                            Homes are selling in an average of [X] days - [interpretation of whether this is fast/slow and what it means].
                        </p>
                        <div style={{
                            background: '#eff6ff',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #3b82f6'
                        }}>
                            <strong>What does this mean for you?</strong><br/><br/>
                            Even if you're not thinking about selling right now, it's always good to know where you stand. Your home is likely your biggest investment, and I want to make sure you're in the loop!<br/><br/>
                            Want a more detailed analysis of your specific property? Just reply and I'll put together a comprehensive market report for you - no obligation, just valuable info!
                        </div>
                        <p style={{ marginBottom: '15px' }}>The market has been pretty wild lately, so if you ever want to chat about what's happening or have questions, I'm always here.</p>
                        <p style={{ marginBottom: '15px' }}>Hope you're doing great!</p>
                        <p style={{ marginBottom: '0' }}>[Your Name]</p>
                    </div>
                </div>
                
                {/* Email 3 */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '25px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        paddingBottom: '15px',
                        borderBottom: '2px solid #f0f0f0'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
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
                            }}>Referral Request</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 6</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#f7fafc',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #3b82f6'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> Quick question - know anyone looking to buy or sell?
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hey [First Name],</p>
                        <p style={{ marginBottom: '15px' }}>Hope you're having a great week!</p>
                        <p style={{ marginBottom: '15px' }}>I wanted to reach out because I'm looking to help more people have the same positive experience you had when we worked together.</p>
                        <p style={{ marginBottom: '15px' }}>Do you happen to know anyone who's thinking about buying or selling a home? Maybe a friend, family member, coworker, or neighbor?</p>
                        <div style={{
                            background: '#eff6ff',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #3b82f6'
                        }}>
                            <strong>Why refer someone to me?</strong><br/><br/>
                            🏆 I'll treat them with the same care and attention I gave you<br/>
                            💼 They'll get expert guidance through the entire process<br/>
                            🎁 As a thank you, I'll send you [gift/bonus/incentive] for every referral that closes<br/>
                            💙 You'll be helping someone you care about with one of life's biggest decisions
                        </div>
                        <p style={{ marginBottom: '15px' }}>Referrals are the highest compliment I can receive, and they're honestly how I've built my entire business. I don't take them lightly - when someone refers a friend or family member to me, I make sure to go above and beyond.</p>
                        <p style={{ marginBottom: '15px' }}><strong>It's easy to refer someone:</strong><br/>
                        Just reply to this email with their name and contact info (make sure they're expecting my call!), or forward this email to anyone you think might benefit from my services.</p>
                        <p style={{ marginBottom: '15px' }}>I promise to take excellent care of them!</p>
                        <p style={{ marginBottom: '15px' }}>Thanks so much for considering it,<br/>[Your Name]</p>
                        <p style={{ marginBottom: '0' }}>P.S. Even if you don't know anyone right now, feel free to keep me in mind for the future. I'm always here to help!</p>
                    </div>
                </div>
                
                {/* Email 4 */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '25px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        paddingBottom: '15px',
                        borderBottom: '2px solid #f0f0f0'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
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
                        }}>4</div>
                        <div style={{ flexGrow: '1' }}>
                            <div style={{
                                fontSize: '1.4em',
                                color: '#2d3748',
                                marginBottom: '5px'
                            }}>Stay in Touch & Resources</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 10</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#f7fafc',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #3b82f6'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> Some helpful resources for homeowners (+ I'm here if you need me)
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hi [First Name],</p>
                        <p style={{ marginBottom: '15px' }}>I wanted to share a few resources that might be helpful for you as a homeowner:</p>
                        <p style={{ marginBottom: '15px' }}><strong>🔧 My Trusted Vendor List:</strong><br/>
                        Over the years, I've built relationships with reliable contractors, handymen, plumbers, electricians, and more. If you ever need someone, just ask! I'm happy to share contacts.</p>
                        <p style={{ marginBottom: '15px' }}><strong>📊 Free Home Valuations:</strong><br/>
                        Want to know what your home is worth? I can pull a detailed market analysis anytime - just takes me 15 minutes and it's completely free.</p>
                        <p style={{ marginBottom: '15px' }}><strong>💡 Home Improvement Advice:</strong><br/>
                        Thinking about renovations? I can tell you which improvements actually add value and which ones don't give you a good return on investment.</p>
                        <p style={{ marginBottom: '15px' }}><strong>📰 Market Updates:</strong><br/>
                        I send out quarterly market updates to past clients. Want to be added to that list? Just let me know!</p>
                        <div style={{
                            background: '#eff6ff',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #3b82f6'
                        }}>
                            <strong>Common homeowner questions I can help with:</strong><br/><br/>
                            "What's my home worth?"<br/>
                            "Should I refinance?"<br/>
                            "Is now a good time to sell?"<br/>
                            "What improvements should I make?"<br/>
                            "Can you recommend a contractor?"<br/>
                            "What are the tax implications of selling?"<br/><br/>
                            Literally anything real estate related - I'm here for you!
                        </div>
                        <p style={{ marginBottom: '15px' }}><strong>Also, remember:</strong></p>
                        <p style={{ marginBottom: '15px' }}>
                            🏡 If you're ever thinking about selling or buying again, give me a call first! I'd love to work with you again.<br/><br/>
                            👨‍👩‍👧‍👦 If you know anyone who needs real estate help, I'd be honored to work with your referrals.<br/><br/>
                            ☕ If you're ever in the area, let's grab coffee and catch up!
                        </p>
                        <p style={{ marginBottom: '15px' }}>You're not just a past client - you're part of my real estate family, and I'm always here if you need anything.</p>
                        <p style={{ marginBottom: '15px' }}>Take care and talk soon!</p>
                        <p style={{ marginBottom: '15px' }}>
                            [Your Name]<br/>
                            [Phone Number]<br/>
                            [Email]
                        </p>
                        <a href="#" style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                            color: 'white',
                            padding: '12px 25px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            marginTop: '10px',
                            transition: 'opacity 0.3s'
                        }}>Get Your Free Home Valuation</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PastClientReactivation;
