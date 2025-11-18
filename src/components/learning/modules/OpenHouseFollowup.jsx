import React from 'react';

const OpenHouseFollowup = () => {
    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
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
                        🏡 Open House Follow-up
                    </h1>
                    <p style={{ fontSize: '1.1em', opacity: '0.95' }}>
                        Automatic follow-up sequence for open house attendees with property details and next steps
                    </p>
                </div>
                
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    marginBottom: '30px',
                    fontSize: '1.1em'
                }}>
                    📧 3 emails over 7 days
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
                            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
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
                            }}>Thank You & Property Details</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 1 - Within 2 hours</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#ecfeff',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #06b6d4'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> Thanks for stopping by [Address] today!
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hi [First Name]!</p>
                        <p style={{ marginBottom: '15px' }}>It was great meeting you at the open house today! Thanks so much for taking the time to check out the property at [Address].</p>
                        <p style={{ marginBottom: '15px' }}>I wanted to follow up while it's still fresh in your mind and share some additional details about the home that you might find helpful.</p>
                        
                        <div style={{
                            background: '#f0f9ff',
                            padding: '20px',
                            borderRadius: '8px',
                            margin: '15px 0'
                        }}>
                            <h3 style={{ color: '#0e7490', marginBottom: '15px' }}>📋 Property Highlights</h3>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px 0',
                                borderBottom: '1px solid #e0f2fe'
                            }}>
                                <span style={{ fontWeight: '600', color: '#0e7490' }}>Address:</span>
                                <span>[Full Address]</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px 0',
                                borderBottom: '1px solid #e0f2fe'
                            }}>
                                <span style={{ fontWeight: '600', color: '#0e7490' }}>Price:</span>
                                <span>$[Price]</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px 0',
                                borderBottom: '1px solid #e0f2fe'
                            }}>
                                <span style={{ fontWeight: '600', color: '#0e7490' }}>Beds/Baths:</span>
                                <span>[X] bed | [X] bath</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px 0',
                                borderBottom: '1px solid #e0f2fe'
                            }}>
                                <span style={{ fontWeight: '600', color: '#0e7490' }}>Square Footage:</span>
                                <span>[X] sq ft</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px 0',
                                borderBottom: '1px solid #e0f2fe'
                            }}>
                                <span style={{ fontWeight: '600', color: '#0e7490' }}>Lot Size:</span>
                                <span>[X] sq ft / [X] acres</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px 0'
                            }}>
                                <span style={{ fontWeight: '600', color: '#0e7490' }}>Year Built:</span>
                                <span>[Year]</span>
                            </div>
                        </div>
                        
                        <p style={{ marginBottom: '15px' }}><strong>Key Features:</strong></p>
                        <p style={{ marginBottom: '15px' }}>
                            ✨ [Feature 1 - e.g., Updated kitchen with granite countertops]<br/>
                            ✨ [Feature 2 - e.g., Master suite with walk-in closet]<br/>
                            ✨ [Feature 3 - e.g., Large backyard perfect for entertaining]<br/>
                            ✨ [Feature 4 - e.g., Recently renovated bathrooms]<br/>
                            ✨ [Feature 5 - e.g., Two-car garage with storage]
                        </p>
                        
                        <div style={{
                            background: '#cffafe',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #06b6d4'
                        }}>
                            <strong>📸 Want to see more?</strong><br/><br/>
                            View the full photo gallery, virtual tour, and property details:<br/>
                            <a href="#" style={{
                                display: 'inline-block',
                                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                                color: 'white',
                                padding: '12px 25px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                marginTop: '10px',
                                transition: 'opacity 0.3s'
                            }}>View Full Listing</a>
                        </div>
                        
                        <p style={{ marginBottom: '15px' }}><strong>What did you think?</strong></p>
                        <p style={{ marginBottom: '15px' }}>I'd love to hear your thoughts! Does this property check the boxes for what you're looking for? Any questions I can answer?</p>
                        <p style={{ marginBottom: '15px' }}>If you'd like to schedule a private showing or want to see it again, just let me know. I'm happy to work around your schedule!</p>
                        
                        <p style={{ marginBottom: '0' }}>Looking forward to hearing from you,<br/>[Your Name]<br/>[Phone Number]</p>
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
                            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
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
                            }}>Additional Info & Similar Properties</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 3</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#ecfeff',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #06b6d4'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> A few more details about [Address] (+ similar homes you might like)
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hey [First Name],</p>
                        <p style={{ marginBottom: '15px' }}>I wanted to circle back and share some additional information about [Address] that might be helpful as you're thinking things over.</p>
                        
                        <p style={{ marginBottom: '15px' }}><strong>🏘️ Neighborhood Info:</strong></p>
                        <p style={{ marginBottom: '15px' }}>
                            • School District: [School District Name] (rated [X]/10)<br/>
                            • Nearby: [List nearby amenities - parks, shopping, restaurants]<br/>
                            • Commute: [X] minutes to [major employment center]<br/>
                            • Walk Score: [X]/100<br/>
                            • Property Taxes: Approximately $[X]/year
                        </p>
                        
                        <p style={{ marginBottom: '15px' }}><strong>💰 Pricing Context:</strong></p>
                        <p style={{ marginBottom: '15px' }}>This home is priced at $[X] per square foot, which is [competitive/below/in line with] the neighborhood average of $[X] per square foot. Similar homes in the area have been selling quickly, typically within [X] days.</p>
                        
                        <div style={{
                            background: '#cffafe',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #06b6d4'
                        }}>
                            <strong>Recent comparable sales:</strong><br/><br/>
                            🏡 [Nearby Address 1]: Sold for $[X] ([X] bed/[X] bath)<br/>
                            🏡 [Nearby Address 2]: Sold for $[X] ([X] bed/[X] bath)<br/>
                            🏡 [Nearby Address 3]: Sold for $[X] ([X] bed/[X] bath)
                        </div>
                        
                        <p style={{ marginBottom: '15px' }}><strong>📅 Next Steps if You're Interested:</strong></p>
                        <p style={{ marginBottom: '15px' }}>If you're thinking about making an offer or want to see the property again, here's what we'd do next:</p>
                        <p style={{ marginBottom: '15px' }}>
                            1. Schedule a second showing (if you'd like)<br/>
                            2. Review the seller's disclosure and inspection reports<br/>
                            3. Discuss your financing (I can connect you with great lenders)<br/>
                            4. Prepare and submit your offer<br/>
                            5. Negotiate and get you the best deal possible!
                        </p>
                        
                        <p style={{ marginBottom: '15px' }}><strong>Other Properties You Might Like:</strong></p>
                        <p style={{ marginBottom: '15px' }}>In case [Address] isn't quite the right fit, I found a few similar properties that match what you're looking for:</p>
                        
                        <p style={{ marginBottom: '15px' }}>
                            🏡 <strong>[Alternative Property 1]</strong><br/>
                            $[Price] | [X] bed/[X] bath | [X] sq ft<br/>
                            Why you might like it: [Brief reason]<br/>
                            <a href="#">View Listing</a>
                        </p>
                        
                        <p style={{ marginBottom: '15px' }}>
                            🏡 <strong>[Alternative Property 2]</strong><br/>
                            $[Price] | [X] bed/[X] bath | [X] sq ft<br/>
                            Why you might like it: [Brief reason]<br/>
                            <a href="#">View Listing</a>
                        </p>
                        
                        <p style={{ marginBottom: '15px' }}>Want to see any of these? I can set up showings this week!</p>
                        
                        <p style={{ marginBottom: '15px' }}>Any questions at all, just reach out. I'm here to help!</p>
                        
                        <p style={{ marginBottom: '0' }}>Best,<br/>[Your Name]</p>
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
                            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
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
                            }}>Final Follow-up & Clear Next Steps</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '0.9em'
                            }}>Day 7</div>
                        </div>
                    </div>
                    <div style={{
                        background: '#ecfeff',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #06b6d4'
                    }}>
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> Still interested in [Address]? Let's make it happen!
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hi [First Name],</p>
                        <p style={{ marginBottom: '15px' }}>Just wanted to check in one more time about the property at [Address] that you saw at the open house last week.</p>
                        
                        <p style={{ marginBottom: '15px' }}><strong>Quick update on the property:</strong><br/>
                        [Current status - e.g., "Still available and generating a lot of interest!" OR "We've received [X] offers" OR "Price just reduced to $[X]"]</p>
                        
                        <div style={{
                            background: '#cffafe',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #06b6d4'
                        }}>
                            <strong>⏰ Here's why timing matters:</strong><br/><br/>
                            Properties in this price range and location are moving fast right now. On average, homes like this are getting offers within [X] days of listing. I'd hate for you to miss out if this is the one!
                        </div>
                        
                        <p style={{ marginBottom: '15px' }}><strong>Where are you at in your search?</strong></p>
                        <p style={{ marginBottom: '15px' }}>I'm curious to know what you're thinking. Are you:</p>
                        <p style={{ marginBottom: '15px' }}>
                            ✓ Ready to move forward with this property?<br/>
                            ✓ Still comparing options?<br/>
                            ✓ Need to see it one more time?<br/>
                            ✓ Have questions or concerns?<br/>
                            ✓ Looking for something different?
                        </p>
                        
                        <p style={{ marginBottom: '15px' }}>Whatever your situation, I'm here to help! No pressure at all - I just want to make sure you have all the information you need to make the best decision.</p>
                        
                        <p style={{ marginBottom: '15px' }}><strong>How I can help you right now:</strong></p>
                        <p style={{ marginBottom: '15px' }}>
                            🏡 Schedule a private showing<br/>
                            💰 Connect you with a lender for pre-approval<br/>
                            📊 Provide a detailed market analysis<br/>
                            📋 Answer any questions about the property<br/>
                            🔍 Help you find other properties that might be a better fit
                        </p>
                        
                        <div style={{
                            background: '#cffafe',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #06b6d4'
                        }}>
                            <strong>Ready to take action?</strong><br/><br/>
                            If you're serious about this property, let's get you pre-approved (if you aren't already) and schedule a time to write up an offer. I can usually get offers submitted within 24 hours!<br/><br/>
                            <a href="#" style={{
                                display: 'inline-block',
                                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                                color: 'white',
                                padding: '12px 25px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                marginTop: '10px',
                                transition: 'opacity 0.3s'
                            }}>Schedule a Call</a>
                        </div>
                        
                        <p style={{ marginBottom: '15px' }}><strong>Not the right fit?</strong><br/>
                        That's okay too! I have access to every listing in the area and can set up a custom search based on exactly what you're looking for. You'll get alerts the moment new properties hit the market.</p>
                        
                        <p style={{ marginBottom: '15px' }}>Either way, I'd love to stay in touch and help you find the perfect home - whether it's this one or another property.</p>
                        
                        <p style={{ marginBottom: '15px' }}>Just reply to this email or give me a call at [Phone Number]. I'm usually available [your typical availability].</p>
                        
                        <p style={{ marginBottom: '15px' }}>Looking forward to hearing from you!</p>
                        
                        <p style={{ marginBottom: '15px' }}>
                            [Your Name]<br/>
                            [Phone Number]<br/>
                            [Email]
                        </p>
                        
                        <p style={{ marginBottom: '0' }}><strong>P.S.</strong> Don't forget - if you want to be added to my VIP buyer list for early access to new listings, just let me know! 🔑</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenHouseFollowup;
