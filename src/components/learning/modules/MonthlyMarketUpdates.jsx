import React from 'react';

const MonthlyMarketUpdates = () => {
    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
            padding: '20px',
            lineHeight: '1.6',
            minHeight: '100vh'
        }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    marginBottom: '40px',
                    padding: '30px 20px'
                }}>
                    <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>
                        📊 Monthly Market Updates
                    </h1>
                    <p style={{ fontSize: '1.1em', opacity: '0.95' }}>
                        Regular market insights and property value updates to keep clients engaged and informed
                    </p>
                </div>
                
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    marginBottom: '30px',
                    fontSize: '1.1em'
                }}>
                    📧 Recurring Monthly Email
                </div>
                
                {/* Monthly Email Template */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '35px',
                    marginBottom: '25px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        textAlign: 'center',
                        paddingBottom: '25px',
                        borderBottom: '3px solid #f3f4f6',
                        marginBottom: '25px'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                            color: 'white',
                            padding: '8px 20px',
                            borderRadius: '20px',
                            fontSize: '0.9em',
                            fontWeight: '600',
                            display: 'inline-block',
                            marginBottom: '15px'
                        }}>
                            [MONTH YEAR] EDITION
                        </div>
                        <div style={{
                            fontSize: '2em',
                            color: '#2d3748',
                            marginBottom: '10px'
                        }}>
                            Your Market Update
                        </div>
                        <div style={{
                            color: '#718096',
                            fontSize: '1.1em'
                        }}>
                            [City/Area] Real Estate Insights
                        </div>
                    </div>
                    
                    <div style={{
                        background: '#fdf2f8',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '25px',
                        borderLeft: '4px solid #ec4899'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> [Month] Market Update: What your home is worth now 📈
                    </div>
                    
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hey [First Name]!</p>
                        <p style={{ marginBottom: '15px' }}>Hope you're having a great [month]! Time for your monthly market update. I've got some interesting data to share with you this month.</p>
                        
                        <h3 style={{
                            color: '#2d3748',
                            marginTop: '25px',
                            marginBottom: '15px',
                            fontSize: '1.3em'
                        }}>📊 Market Snapshot for [Area/City]</h3>
                        
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '15px',
                            margin: '20px 0'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #fdf2f8 0%, #fae8ff 100%)',
                                padding: '20px',
                                borderRadius: '10px',
                                textAlign: 'center',
                                border: '2px solid #f9a8d4'
                            }}>
                                <div style={{
                                    fontSize: '2em',
                                    fontWeight: 'bold',
                                    color: '#be185d',
                                    marginBottom: '5px'
                                }}>$[XXX]K</div>
                                <div style={{
                                    color: '#831843',
                                    fontSize: '0.85em',
                                    fontWeight: '600'
                                }}>Median Home Price</div>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    fontSize: '0.85em',
                                    fontWeight: '600',
                                    marginLeft: '8px',
                                    background: '#d1fae5',
                                    color: '#065f46'
                                }}>↑ [X]%</span>
                            </div>
                            <div style={{
                                background: 'linear-gradient(135deg, #fdf2f8 0%, #fae8ff 100%)',
                                padding: '20px',
                                borderRadius: '10px',
                                textAlign: 'center',
                                border: '2px solid #f9a8d4'
                            }}>
                                <div style={{
                                    fontSize: '2em',
                                    fontWeight: 'bold',
                                    color: '#be185d',
                                    marginBottom: '5px'
                                }}>[XX]</div>
                                <div style={{
                                    color: '#831843',
                                    fontSize: '0.85em',
                                    fontWeight: '600'
                                }}>Days on Market</div>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    fontSize: '0.85em',
                                    fontWeight: '600',
                                    marginLeft: '8px',
                                    background: '#fee2e2',
                                    color: '#991b1b'
                                }}>↓ [X] days</span>
                            </div>
                            <div style={{
                                background: 'linear-gradient(135deg, #fdf2f8 0%, #fae8ff 100%)',
                                padding: '20px',
                                borderRadius: '10px',
                                textAlign: 'center',
                                border: '2px solid #f9a8d4'
                            }}>
                                <div style={{
                                    fontSize: '2em',
                                    fontWeight: 'bold',
                                    color: '#be185d',
                                    marginBottom: '5px'
                                }}>[XXX]</div>
                                <div style={{
                                    color: '#831843',
                                    fontSize: '0.85em',
                                    fontWeight: '600'
                                }}>Homes Sold</div>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    fontSize: '0.85em',
                                    fontWeight: '600',
                                    marginLeft: '8px',
                                    background: '#d1fae5',
                                    color: '#065f46'
                                }}>↑ [X]%</span>
                            </div>
                            <div style={{
                                background: 'linear-gradient(135deg, #fdf2f8 0%, #fae8ff 100%)',
                                padding: '20px',
                                borderRadius: '10px',
                                textAlign: 'center',
                                border: '2px solid #f9a8d4'
                            }}>
                                <div style={{
                                    fontSize: '2em',
                                    fontWeight: 'bold',
                                    color: '#be185d',
                                    marginBottom: '5px'
                                }}>[X]%</div>
                                <div style={{
                                    color: '#831843',
                                    fontSize: '0.85em',
                                    fontWeight: '600'
                                }}>Year-over-Year Growth</div>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    fontSize: '0.85em',
                                    fontWeight: '600',
                                    marginLeft: '8px',
                                    background: '#d1fae5',
                                    color: '#065f46'
                                }}>↑ Strong</span>
                            </div>
                        </div>
                        
                        <h3 style={{
                            color: '#2d3748',
                            marginTop: '25px',
                            marginBottom: '15px',
                            fontSize: '1.3em'
                        }}>🏡 Your Home Value Update</h3>
                        
                        <div style={{
                            background: 'linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%)',
                            padding: '25px',
                            borderRadius: '12px',
                            margin: '25px 0',
                            border: '2px solid #e9d5ff'
                        }}>
                            <div style={{
                                fontSize: '0.9em',
                                color: '#7c3aed',
                                fontWeight: '600',
                                marginBottom: '8px'
                            }}>YOUR PROPERTY</div>
                            <div style={{
                                fontSize: '1.1em',
                                color: '#2d3748',
                                fontWeight: '600',
                                marginBottom: '15px'
                            }}>[Client's Address]</div>
                            
                            <div style={{
                                textAlign: 'center',
                                padding: '20px',
                                background: 'white',
                                borderRadius: '8px',
                                marginTop: '15px'
                            }}>
                                <div style={{
                                    fontSize: '0.9em',
                                    color: '#718096',
                                    marginBottom: '8px'
                                }}>Estimated Current Value</div>
                                <div style={{
                                    fontSize: '2.5em',
                                    fontWeight: 'bold',
                                    color: '#be185d'
                                }}>$[XXX,XXX]</div>
                                <div style={{
                                    fontSize: '0.95em',
                                    color: '#059669',
                                    marginTop: '8px',
                                    fontWeight: '600'
                                }}>↑ $[X,XXX] from last month (+[X]%)</div>
                            </div>
                        </div>
                        
                        <p style={{ marginBottom: '15px' }}>Based on recent comparable sales in your neighborhood, your home's value has [increased/remained stable/adjusted]. Here's why:</p>
                        
                        <p style={{ marginBottom: '15px' }}>
                            • <strong>Recent Sales:</strong> [X] homes sold in your area this month, averaging $[XX] per square foot<br/>
                            • <strong>Inventory Levels:</strong> [Low/Moderate/High] - currently [X] active listings in your neighborhood<br/>
                            • <strong>Market Conditions:</strong> [Description of whether it's a seller's/buyer's/balanced market]
                        </p>
                        
                        <h3 style={{
                            color: '#2d3748',
                            marginTop: '25px',
                            marginBottom: '15px',
                            fontSize: '1.3em'
                        }}>💡 What This Means for You</h3>
                        
                        <div style={{
                            background: '#fef3c7',
                            padding: '20px',
                            borderRadius: '10px',
                            margin: '20px 0',
                            borderLeft: '4px solid #f59e0b'
                        }}>
                            <h4 style={{
                                color: '#92400e',
                                marginBottom: '10px'
                            }}>Key Takeaway:</h4>
                            <p style={{ marginBottom: '0' }}>[Provide personalized insight based on market conditions - e.g., "With inventory still low and demand high, it's a great time for sellers. If you've been thinking about listing, current conditions are very favorable." OR "The market is showing signs of cooling, which could be good news if you're looking to buy an investment property."]</p>
                        </div>
                        
                        <h3 style={{
                            color: '#2d3748',
                            marginTop: '25px',
                            marginBottom: '15px',
                            fontSize: '1.3em'
                        }}>🏘️ Neighborhood Highlights</h3>
                        
                        <p style={{ marginBottom: '15px' }}><strong>Recent Comparable Sales Near You:</strong></p>
                        
                        <p style={{ marginBottom: '15px' }}>
                            🏡 <strong>[Nearby Address 1]</strong><br/>
                            Sold for: $[XXX,XXX] | [X] bed/[X] bath | [X,XXX] sq ft<br/>
                            Days on market: [XX] | Sold [above/at/below] asking
                        </p>
                        
                        <p style={{ marginBottom: '15px' }}>
                            🏡 <strong>[Nearby Address 2]</strong><br/>
                            Sold for: $[XXX,XXX] | [X] bed/[X] bath | [X,XXX] sq ft<br/>
                            Days on market: [XX] | Sold [above/at/below] asking
                        </p>
                        
                        <p style={{ marginBottom: '15px' }}>
                            🏡 <strong>[Nearby Address 3]</strong><br/>
                            Sold for: $[XXX,XXX] | [X] bed/[X] bath | [X,XXX] sq ft<br/>
                            Days on market: [XX] | Sold [above/at/below] asking
                        </p>
                        
                        <h3 style={{
                            color: '#2d3748',
                            marginTop: '25px',
                            marginBottom: '15px',
                            fontSize: '1.3em'
                        }}>📈 Market Trends to Watch</h3>
                        
                        <p style={{ marginBottom: '15px' }}><strong>Interest Rates:</strong> Currently averaging [X]% for a 30-year fixed mortgage [up/down X% from last month]</p>
                        
                        <p style={{ marginBottom: '15px' }}><strong>Buyer Activity:</strong> [Description of buyer demand - high/moderate/low and any trends]</p>
                        
                        <p style={{ marginBottom: '15px' }}><strong>Seasonal Outlook:</strong> [What to expect in the coming month based on typical seasonal patterns]</p>
                        
                        <h3 style={{
                            color: '#2d3748',
                            marginTop: '25px',
                            marginBottom: '15px',
                            fontSize: '1.3em'
                        }}>🤔 Thinking About Selling?</h3>
                        
                        <p style={{ marginBottom: '15px' }}>If you've been considering making a move, now might be a great time to explore your options. With your home's current estimated value at $[XXX,XXX], you've gained approximately $[XX,XXX] in equity since you purchased it!</p>
                        
                        <p style={{ marginBottom: '15px' }}>
                            <strong>Here's what I can do for you:</strong><br/>
                            ✓ Provide a detailed, in-person home valuation (free, no obligation)<br/>
                            ✓ Show you exactly what you could net from a sale<br/>
                            ✓ Create a custom marketing plan for your property<br/>
                            ✓ Answer any questions about the selling process
                        </p>
                        
                        <a href="#" style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                            color: 'white',
                            padding: '12px 25px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            marginTop: '10px',
                            transition: 'opacity 0.3s'
                        }}>Get Your Free Home Valuation</a>
                        
                        <h3 style={{
                            color: '#2d3748',
                            marginTop: '25px',
                            marginBottom: '15px',
                            fontSize: '1.3em'
                        }}>💬 Questions?</h3>
                        
                        <p style={{ marginBottom: '15px' }}>Want to dive deeper into any of these numbers? Curious about what renovations might increase your home's value? Just want to chat about the market? I'm always here!</p>
                        
                        <p style={{ marginBottom: '15px' }}>Feel free to reply to this email or give me a call at [Phone Number].</p>
                        
                        <p style={{ marginBottom: '15px' }}>Stay informed and take care!</p>
                        
                        <p style={{ marginBottom: '15px' }}>
                            [Your Name]<br/>
                            [Your Title]<br/>
                            [Phone Number] | [Email]
                        </p>
                        
                        <div style={{
                            textAlign: 'center',
                            marginTop: '30px',
                            paddingTop: '20px',
                            borderTop: '2px solid #f3f4f6',
                            color: '#718096',
                            fontSize: '0.9em'
                        }}>
                            <p style={{ marginBottom: '15px' }}><strong>P.S.</strong> Know anyone thinking about buying or selling? I'd love to help them too! Forward this email or send them my way. 🙏</p>
                            <p style={{ marginTop: '15px', fontSize: '0.85em' }}>
                                You're receiving this because you're a valued client. Want to adjust your email preferences? <a href="#" style={{ color: '#8b5cf6' }}>Click here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyMarketUpdates;
