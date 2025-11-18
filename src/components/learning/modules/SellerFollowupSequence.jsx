import React from 'react';

const SellerFollowupSequence = () => {
    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
                        💰 Seller Follow-up Sequence
                    </h1>
                    <p style={{ fontSize: '1.1em', opacity: '0.95' }}>
                        Automated follow-up campaign for potential sellers with market updates and pricing insights
                    </p>
                </div>
                
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    marginBottom: '30px',
                    fontSize: '1.1em'
                }}>
                    📧 5 emails over 21 days
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
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
                            }}>Initial Follow-up & Value Prop</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 1 - Immediate</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#fffbeb',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #f59e0b'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> Thanks for reaching out! Here's what your home could be worth
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hey [First Name]!</p>
                        <p style={{ marginBottom: '15px' }}>Thanks so much for getting in touch about possibly selling your home at [Address]. I'm excited to help you explore your options!</p>
                        <p style={{ marginBottom: '15px' }}>I know selling a home is a big decision, so I wanted to start by giving you some helpful info right away.</p>
                        <div style={{
                            background: '#fef3c7',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #f59e0b'
                        }}>
                            <strong>📊 Quick Estimate for Your Home:</strong><br/><br/>
                            Based on recent sales in your area, I estimate your home could sell for:<br/>
                            <div style={{
                                fontSize: '1.8em',
                                color: '#d97706',
                                fontWeight: 'bold',
                                margin: '10px 0'
                            }}>
                                $[Price Range]
                            </div>
                            <em>(This is a preliminary estimate - I'll need to see your home in person to give you an accurate number!)</em>
                        </div>
                        <p style={{ marginBottom: '15px' }}><strong>Here's what I'd like to do next:</strong></p>
                        <p style={{ marginBottom: '15px' }}>
                            📅 Schedule a no-pressure consultation where I can:<br/>
                            • Tour your home and see all its amazing features<br/>
                            • Provide a detailed market analysis<br/>
                            • Show you what similar homes have sold for<br/>
                            • Answer all your questions about the selling process<br/>
                            • Give you a strategic pricing recommendation
                        </p>
                        <p style={{ marginBottom: '15px' }}>This consultation is completely free, and there's zero obligation. Even if you're just curious about your home's value or thinking about selling down the road, I'm happy to chat!</p>
                        <p style={{ marginBottom: '15px' }}><strong>I have some availability this week:</strong><br/>
                        [Day/Time Option 1]<br/>
                        [Day/Time Option 2]<br/>
                        [Day/Time Option 3]</p>
                        <p style={{ marginBottom: '15px' }}>Do any of those work for you? Or just let me know what's convenient and I'll make it happen!</p>
                        <p style={{ marginBottom: '15px' }}>Looking forward to meeting you,<br/>[Your Name]<br/>[Phone Number]</p>
                        <a href="#" style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            padding: '12px 25px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            marginTop: '10px',
                            transition: 'opacity 0.3s'
                        }}>Schedule Your Free Consultation</a>
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
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
                            }}>Market Update & Timing</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 4</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#fffbeb',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #f59e0b'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> Is now a good time to sell? (Here's what the data says)
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hi [First Name],</p>
                        <p style={{ marginBottom: '15px' }}>I wanted to follow up and share some insights about the current market - because timing can make a huge difference when selling your home!</p>
                        <p style={{ marginBottom: '15px' }}><strong>Current Market Conditions in [Area]:</strong></p>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '15px',
                            margin: '15px 0'
                        }}>
                            <div style={{
                                background: '#fef3c7',
                                padding: '15px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    fontSize: '1.8em',
                                    fontWeight: 'bold',
                                    color: '#d97706'
                                }}>[X] days</div>
                                <div style={{
                                    color: '#92400e',
                                    fontSize: '0.9em',
                                    marginTop: '5px'
                                }}>Average time on market</div>
                            </div>
                            <div style={{
                                background: '#fef3c7',
                                padding: '15px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    fontSize: '1.8em',
                                    fontWeight: 'bold',
                                    color: '#d97706'
                                }}>[X]%</div>
                                <div style={{
                                    color: '#92400e',
                                    fontSize: '0.9em',
                                    marginTop: '5px'
                                }}>Of list price received</div>
                            </div>
                            <div style={{
                                background: '#fef3c7',
                                padding: '15px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    fontSize: '1.8em',
                                    fontWeight: 'bold',
                                    color: '#d97706'
                                }}>[X]</div>
                                <div style={{
                                    color: '#92400e',
                                    fontSize: '0.9em',
                                    marginTop: '5px'
                                }}>Homes sold this month</div>
                            </div>
                        </div>
                        <p style={{ marginBottom: '15px' }}><strong>What this means for you:</strong><br/>
                        [Brief interpretation - is it a seller's market? Are prices up? Is inventory low? Give them context]</p>
                        <div style={{
                            background: '#fef3c7',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #f59e0b'
                        }}>
                            <strong>Recent Sales in Your Neighborhood:</strong><br/><br/>
                            🏡 [Address 1]: Sold for $[Amount] ([X]% over asking)<br/>
                            🏡 [Address 2]: Sold for $[Amount] in [X] days<br/>
                            🏡 [Address 3]: Sold for $[Amount] with multiple offers<br/><br/>
                            Your home has similar features, which is why I think you could see excellent results!
                        </div>
                        <p style={{ marginBottom: '15px' }}><strong>Why timing matters:</strong><br/>
                        Right now we're seeing [describe current market trend]. If you've been thinking about selling, [give your recommendation about timing based on market conditions].</p>
                        <p style={{ marginBottom: '15px' }}>I'd love to show you a detailed analysis specific to your property. It only takes about 30 minutes, and you'll walk away with a clear understanding of what you could get for your home.</p>
                        <p style={{ marginBottom: '15px' }}>Have you had a chance to think about those consultation times I mentioned? I'm still happy to work around your schedule!</p>
                        <p style={{ marginBottom: '0' }}>Talk soon,<br/>[Your Name]</p>
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
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
                            }}>Success Story & Social Proof</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 8</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#fffbeb',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #f59e0b'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> How I helped [Client] sell for $[X] over asking
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hey [First Name],</p>
                        <p style={{ marginBottom: '15px' }}>I wanted to share a quick success story with you because it reminds me a lot of your situation!</p>
                        <p style={{ marginBottom: '15px' }}>Last month, I worked with [Client Name] who also lives in [similar neighborhood/area]. They were unsure about selling and didn't know if they could get the price they needed.</p>
                        <p style={{ marginBottom: '15px' }}><strong>Here's what happened:</strong></p>
                        <p style={{ marginBottom: '15px' }}>
                            ✅ We listed their home for $[Amount]<br/>
                            ✅ Got [X] offers in the first [X] days<br/>
                            ✅ Sold for $[Amount] - that's $[X] OVER asking!<br/>
                            ✅ Closed in just [X] days
                        </p>
                        <div style={{
                            background: '#fef3c7',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #f59e0b'
                        }}>
                            <strong>What [Client Name] said:</strong><br/><br/>
                            <em>"[Your Name] made the whole process so easy. The photos were amazing, the marketing was everywhere, and we had multiple offers right away. We honestly couldn't believe how much we got for our home!"</em>
                        </div>
                        <p style={{ marginBottom: '15px' }}><strong>How did we do it?</strong></p>
                        <p style={{ marginBottom: '15px' }}>
                            🎯 <strong>Strategic Pricing:</strong> Used market data to price it competitively<br/>
                            📸 <strong>Professional Marketing:</strong> High-quality photos, video tour, and targeted online ads<br/>
                            🏡 <strong>Staging Advice:</strong> Simple updates that made a huge impact<br/>
                            ⚡ <strong>Smart Timing:</strong> Listed when buyer demand was high
                        </p>
                        <p style={{ marginBottom: '15px' }}>I can do the same thing for your home at [Address]. Your property has some great features that buyers are looking for right now, and I think we could see similar results!</p>
                        <p style={{ marginBottom: '15px' }}>Want to hear more about my marketing strategy? Let's set up that consultation - I'll walk you through exactly how I'd sell your home.</p>
                        <p style={{ marginBottom: '15px' }}>Ready when you are!</p>
                        <p style={{ marginBottom: '15px' }}>[Your Name]<br/>[Phone Number]</p>
                        <a href="#" style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            padding: '12px 25px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            marginTop: '10px',
                            transition: 'opacity 0.3s'
                        }}>Let's Talk Strategy</a>
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
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
                            }}>Detailed Market Analysis Offer</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 14</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#fffbeb',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #f59e0b'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> Your free home valuation report is ready
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hi [First Name],</p>
                        <p style={{ marginBottom: '15px' }}>I've put together a comprehensive market analysis for your home at [Address], and I think you're going to want to see this!</p>
                        <p style={{ marginBottom: '15px' }}><strong>📊 What's included in your custom report:</strong></p>
                        <p style={{ marginBottom: '15px' }}>
                            ✓ Detailed pricing analysis based on [X] comparable sales<br/>
                            ✓ Current market trends in your neighborhood<br/>
                            ✓ Estimated selling price range<br/>
                            ✓ Projected timeline for sale<br/>
                            ✓ Renovation recommendations (if applicable)<br/>
                            ✓ Marketing strategy specifically for your property
                        </p>
                        <div style={{
                            background: '#fef3c7',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #f59e0b'
                        }}>
                            <strong>Here's a sneak peek at what I found:</strong><br/><br/>
                            🏘️ <strong>Your Neighborhood Activity:</strong><br/>
                            [X] homes sold in the last 90 days with an average sale price of $[Amount]<br/><br/>
                            📈 <strong>Appreciation:</strong><br/>
                            Home values in your area have increased by [X]% in the past year<br/><br/>
                            ⏱️ <strong>Days on Market:</strong><br/>
                            Similar homes are selling in an average of [X] days<br/><br/>
                            💰 <strong>Your Estimated Value:</strong><br/>
                            Based on my analysis, I believe your home could sell for $[Range]
                        </div>
                        <p style={{ marginBottom: '15px' }}><strong>But here's the thing:</strong> Online estimates and automated valuations can't capture what makes YOUR home special. Things like updates you've made, the condition of your home, and unique features all impact value.</p>
                        <p style={{ marginBottom: '15px' }}>That's why I'd love to come see your property in person. I can give you a much more accurate number and explain exactly how I arrived at it.</p>
                        <p style={{ marginBottom: '15px' }}><strong>I can usually do these consultations:</strong><br/>
                        • Mornings (before 10am)<br/>
                        • Lunch time (12-1pm)<br/>
                        • Evenings (after 5pm)<br/>
                        • Weekends</p>
                        <p style={{ marginBottom: '15px' }}>What works best for you? Just reply with a day and time, and I'll be there!</p>
                        <p style={{ marginBottom: '15px' }}>Looking forward to it,<br/>[Your Name]</p>
                        <a href="#" style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            padding: '12px 25px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            marginTop: '10px',
                            transition: 'opacity 0.3s'
                        }}>Download Your Free Report</a>
                    </div>
                </div>
                
                {/* Email 5 */}
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
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
                        }}>5</div>
                        <div style={{ flexGrow: '1' }}>
                            <div style={{
                                fontSize: '1.4em',
                                color: '#2d3748',
                                marginBottom: '5px'
                            }}>Final Follow-up & Clear CTA</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 21</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#fffbeb',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #f59e0b'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> Still thinking about selling? I'm here to help (no pressure!)
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hey [First Name],</p>
                        <p style={{ marginBottom: '15px' }}>I wanted to check in one more time because I don't want you to miss out on what's happening in the market right now!</p>
                        <p style={{ marginBottom: '15px' }}>I know selling your home is a big decision, and you might still be in the "thinking about it" phase. That's totally okay - I'm not here to pressure you, just to help when you're ready.</p>
                        <p style={{ marginBottom: '15px' }}><strong>Here's what I want you to know:</strong></p>
                        <p style={{ marginBottom: '15px' }}>
                            🏡 Your home at [Address] is in a great location that buyers are actively searching for<br/>
                            💰 Current market conditions are [favorable/strong] for sellers<br/>
                            📈 I believe we could get you [specific price range or value]<br/>
                            ⏱️ The consultation is quick (30-45 min) and there's zero obligation
                        </p>
                        <div style={{
                            background: '#fef3c7',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #f59e0b'
                        }}>
                            <strong>Common concerns I hear from sellers:</strong><br/><br/>
                            <strong>"I don't know if I'm ready to sell yet"</strong><br/>
                            → That's fine! Let's just talk about your options. You can make a decision after you have all the info.<br/><br/>
                            <strong>"I'm not sure I can get the price I need"</strong><br/>
                            → You might be surprised! The market has changed a lot recently. Let me show you the numbers.<br/><br/>
                            <strong>"I don't want to deal with the hassle"</strong><br/>
                            → I handle everything for you. Seriously, I'll make this as easy as possible.<br/><br/>
                            <strong>"What if it doesn't sell?"</strong><br/>
                            → With the right pricing and marketing strategy (which I'll create for you), I'm confident we'll get it sold.
                        </div>
                        <p style={{ marginBottom: '15px' }}><strong>Here's my promise to you:</strong></p>
                        <p style={{ marginBottom: '15px' }}>If we meet and you decide not to sell, that's completely fine. No hard feelings whatsoever. You'll still walk away with valuable information about your home's worth and market conditions.</p>
                        <p style={{ marginBottom: '15px' }}>But if you decide you ARE ready? I'll create a customized plan to get you the best possible price in the shortest amount of time.</p>
                        <p style={{ marginBottom: '15px' }}><strong>So what do you say?</strong></p>
                        <p style={{ marginBottom: '15px' }}>Can we find 30 minutes for a quick consultation? I promise it'll be worth your time!</p>
                        <p style={{ marginBottom: '15px' }}>Just reply to this email or give me a call at [Phone Number]. I'm usually pretty flexible with my schedule.</p>
                        <p style={{ marginBottom: '15px' }}>And if you're not interested right now, no worries at all! Feel free to reach out whenever you're ready - whether that's next month or next year. I'm always here to help.</p>
                        <p style={{ marginBottom: '15px' }}>Take care,<br/>[Your Name]</p>
                        <p style={{ marginBottom: '15px' }}><strong>P.S.</strong> Even if you're just curious about your home's value with no plans to sell, I'm happy to provide that info. Knowledge is power! 💪</p>
                        <a href="#" style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            padding: '12px 25px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            marginTop: '10px',
                            transition: 'opacity 0.3s'
                        }}>Schedule My Free Consultation</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerFollowupSequence;
