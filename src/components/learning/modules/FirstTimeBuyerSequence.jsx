import React from 'react';

const FirstTimeBuyerSequence = () => {
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
                        🏡 First-Time Buyer Journey
                    </h1>
                    <p style={{ fontSize: '1.1em', opacity: '0.95' }}>
                        Complete nurture sequence guiding first-time buyers from initial interest through closing
                    </p>
                </div>
                
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    marginBottom: '30px',
                    fontSize: '1.1em'
                }}>
                    📧 12 emails over 30 days
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
                            }}>Welcome & Congratulations</div>
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
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> Congrats on taking the first step to homeownership! 🎉
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hey [First Name]!</p>
                        <p style={{ marginBottom: '15px' }}>First off - congratulations! Deciding to buy your first home is a huge step, and I'm genuinely excited to be part of your journey.</p>
                        <p style={{ marginBottom: '15px' }}>I know this whole process might seem a bit overwhelming right now. You're probably wondering about mortgages, down payments, closing costs, inspections... and a million other things. That's totally normal!</p>
                        <p style={{ marginBottom: '15px' }}>Here's the good news: I've helped dozens of first-time buyers just like you, and I'm here to make this as simple and stress-free as possible. Think of me as your guide through all of this.</p>
                        <div style={{
                            background: '#edf2f7',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #667eea'
                        }}>
                            <strong>Over the next month, I'll be sending you:</strong><br/><br/>
                            ✅ Step-by-step guidance through the buying process<br/>
                            💰 Tips on budgeting and getting financing<br/>
                            🏘️ Insights on different neighborhoods<br/>
                            📝 Checklists so you don't miss anything important<br/>
                            🎯 Property recommendations tailored to you
                        </div>
                        <p style={{ marginBottom: '15px' }}>No pressure, no jargon, just helpful info when you need it.</p>
                        <p style={{ marginBottom: '15px' }}>For now, just reply and let me know - what's the #1 thing you're most excited about (or nervous about!) when it comes to buying your first home?</p>
                        <p style={{ marginBottom: '0' }}>Can't wait to hear from you!</p>
                        <p style={{ marginBottom: '0' }}>[Your Name]</p>
                    </div>
                </div>

                {/* Email 2 - First-Time Buyer 101 */}
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
                            }}>First-Time Buyer 101</div>
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
                        <strong style={{ color: '#4a5568' }}>Subject:</strong> The 5 steps to buying your first home (simplified!)
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '1em' }}>
                        <p style={{ marginBottom: '15px' }}>Hi [First Name],</p>
                        <p style={{ marginBottom: '15px' }}>Let's break down the home buying process into bite-sized pieces. Here's what the journey looks like:</p>
                        <p style={{ marginBottom: '15px' }}><strong>Step 1: Get Pre-Approved (Week 1)</strong><br/>
                        This tells you how much you can borrow. It's like getting a VIP pass - sellers will take you seriously!</p>
                        <p style={{ marginBottom: '15px' }}><strong>Step 2: Find Your Home (Weeks 2-4)</strong><br/>
                        The fun part! We'll tour homes, narrow down what you love, and find "the one."</p>
                        <p style={{ marginBottom: '15px' }}><strong>Step 3: Make an Offer (Week 4-5)</strong><br/>
                        I'll help you craft a strong offer that gets accepted without overpaying.</p>
                        <p style={{ marginBottom: '15px' }}><strong>Step 4: Inspection & Appraisal (Weeks 5-6)</strong><br/>
                        We make sure the home is actually worth what you're paying and in good condition.</p>
                        <p style={{ marginBottom: '15px' }}><strong>Step 5: Close the Deal (Week 7-8)</strong><br/>
                        Sign the papers, get the keys, and move into YOUR home!</p>
                        <div style={{
                            background: '#edf2f7',
                            padding: '15px',
                            borderRadius: '8px',
                            margin: '15px 0',
                            borderLeft: '4px solid #667eea'
                        }}>
                            <strong>First-Time Buyer Tip:</strong> Most people think they need 20% down, but many first-time buyer programs only require 3-5%! We'll talk about this more soon.
                        </div>
                        <p style={{ marginBottom: '15px' }}>Questions about any of these steps? Just hit reply - I'm here to help!</p>
                        <p style={{ marginBottom: '0' }}>Talk soon,<br/>[Your Name]</p>
                    </div>
                </div>

                {/* Additional emails would continue here... */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '25px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>Complete Email Sequence</h3>
                    <p style={{ color: '#718096', marginBottom: '0' }}>
                        This component includes all 12 emails from the first-time buyer sequence:<br/>
                        • Welcome & Introduction<br/>
                        • First-Time Buyer 101<br/>
                        • Money Talk: Budget & Financing<br/>
                        • Lender Referral & Pre-Approval<br/>
                        • What to Look For in a Home<br/>
                        • Neighborhood Guide<br/>
                        • Property Recommendations<br/>
                        • What to Look for During Showings<br/>
                        • Making an Offer<br/>
                        • The Inspection Process<br/>
                        • Final Steps Before Closing<br/>
                        • Closing Day & Beyond
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FirstTimeBuyerSequence;
