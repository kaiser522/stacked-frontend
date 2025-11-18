import React from 'react';

const CorporateRelocationTracker = () => {
    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
            color: 'white',
            lineHeight: '1.6',
            minHeight: '100vh'
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '60px',
                    padding: '60px 40px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: '#FF6B35',
                        borderRadius: '8px',
                        margin: '0 auto 30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '24px'
                    }}>🏢</div>
                    <h1 style={{ fontSize: '3.2em', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2' }}>
                        Corporate Relocation Tracker
                    </h1>
                    <div style={{
                        background: '#00D4AA',
                        color: '#1e3a5f',
                        padding: '12px 24px',
                        borderRadius: '25px',
                        fontWeight: '600',
                        fontSize: '1.1em',
                        display: 'inline-block',
                        marginBottom: '30px'
                    }}>PROCESS</div>
                    <p style={{ fontSize: '1.3em', color: '#B0C4DE', maxWidth: '700px', margin: '0 auto 40px' }}>
                        Timeline for company-sponsored relocations including corporate contact coordination, temporary housing, and expense reimbursement documentation.
                    </p>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '15px 30px',
                        borderRadius: '30px',
                        display: 'inline-block',
                        fontWeight: '600'
                    }}>90-day process</div>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '50px',
                    marginBottom: '40px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 style={{ fontSize: '2.5em', marginBottom: '30px', color: '#00D4AA' }}>Relocation Process Overview</h2>
                    <p style={{ fontSize: '1.1em', marginBottom: '20px', color: '#E6F3FF' }}>
                        Corporate relocations involve multiple stakeholders and extended timelines. This tracker ensures nothing falls through the cracks during the 90-day process.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', margin: '30px 0' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid #00D4AA', borderRadius: '15px', padding: '20px', textAlign: 'center' }}>
                            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#FFD700', margin: '10px 0' }}>0</div>
                            <div style={{ color: '#00D4AA', fontWeight: 'bold' }}>Tasks Complete</div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid #00D4AA', borderRadius: '15px', padding: '20px', textAlign: 'center' }}>
                            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#FFD700', margin: '10px 0' }}>32</div>
                            <div style={{ color: '#00D4AA', fontWeight: 'bold' }}>Total Tasks</div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid #00D4AA', borderRadius: '15px', padding: '20px', textAlign: 'center' }}>
                            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#FFD700', margin: '10px 0' }}>90</div>
                            <div style={{ color: '#00D4AA', fontWeight: 'bold' }}>Days Remaining</div>
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(255, 107, 53, 0.2)',
                        border: '2px solid #FF6B35',
                        borderRadius: '15px',
                        padding: '25px',
                        margin: '30px 0'
                    }}>
                        <h3 style={{ color: '#FF6B35', marginTop: '0' }}>Corporate Relocation Key Points</h3>
                        <p style={{ fontSize: '1.1em', marginBottom: '20px', color: '#E6F3FF' }}>
                            <strong>Multiple Approvals:</strong> HR, relocation company, and employee all involved<br />
                            <strong>Expense Documentation:</strong> Detailed tracking required for reimbursement<br />
                            <strong>Extended Timeline:</strong> Allow 60-90 days from start to move-in<br />
                            <strong>Temporary Housing:</strong> Often needed during transition period
                        </p>
                    </div>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '50px',
                    marginBottom: '40px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 style={{ fontSize: '2.5em', marginBottom: '30px', color: '#00D4AA' }}>Key Contacts & Coordination</h2>
                    <p style={{ fontSize: '1.1em', marginBottom: '20px', color: '#E6F3FF' }}>
                        Maintain organized contact information for all parties involved in the corporate relocation.
                    </p>

                    <div style={{
                        background: 'rgba(0, 212, 170, 0.2)',
                        border: '2px solid #00D4AA',
                        borderRadius: '15px',
                        padding: '30px',
                        margin: '30px 0'
                    }}>
                        <h3 style={{ color: '#00D4AA', marginTop: '0' }}>Contact Directory</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '20px 0' }}>
                            <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '20px' }}>
                                <div style={{ color: '#00D4AA', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.1em' }}>Relocating Employee</div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                                    <div style={{ color: '#B0C4DE', fontSize: '0.9em', marginBottom: '5px' }}>Employee Name</div>
                                    <input type="text" style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.9em'
                                    }} placeholder="Full name" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                                    <div style={{ color: '#B0C4DE', fontSize: '0.9em', marginBottom: '5px' }}>Personal Phone</div>
                                    <input type="text" style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.9em'
                                    }} placeholder="Personal phone" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                                    <div style={{ color: '#B0C4DE', fontSize: '0.9em', marginBottom: '5px' }}>Personal Email</div>
                                    <input type="email" style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.9em'
                                    }} placeholder="Personal email" />
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '20px' }}>
                                <div style={{ color: '#00D4AA', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.1em' }}>HR Contact</div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                                    <div style={{ color: '#B0C4DE', fontSize: '0.9em', marginBottom: '5px' }}>HR Representative</div>
                                    <input type="text" style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.9em'
                                    }} placeholder="HR contact name" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                                    <div style={{ color: '#B0C4DE', fontSize: '0.9em', marginBottom: '5px' }}>Company</div>
                                    <input type="text" style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.9em'
                                    }} placeholder="Company name" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                                    <div style={{ color: '#B0C4DE', fontSize: '0.9em', marginBottom: '5px' }}>Phone & Email</div>
                                    <input type="text" style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.9em'
                                    }} placeholder="Contact information" />
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '20px' }}>
                                <div style={{ color: '#00D4AA', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.1em' }}>Relocation Company</div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                                    <div style={{ color: '#B0C4DE', fontSize: '0.9em', marginBottom: '5px' }}>Company Name</div>
                                    <input type="text" style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.9em'
                                    }} placeholder="Atlas, United, etc." />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                                    <div style={{ color: '#B0C4DE', fontSize: '0.9em', marginBottom: '5px' }}>Coordinator</div>
                                    <input type="text" style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.9em'
                                    }} placeholder="Coordinator name" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                                    <div style={{ color: '#B0C4DE', fontSize: '0.9em', marginBottom: '5px' }}>Phone & Email</div>
                                    <input type="text" style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.9em'
                                    }} placeholder="Contact information" />
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '20px' }}>
                                <div style={{ color: '#00D4AA', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.1em' }}>Temporary Housing</div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                                    <div style={{ color: '#B0C4DE', fontSize: '0.9em', marginBottom: '5px' }}>Corporate Housing Company</div>
                                    <input type="text" style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.9em'
                                    }} placeholder="Temporary housing provider" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                                    <div style={{ color: '#B0C4DE', fontSize: '0.9em', marginBottom: '5px' }}>Property Address</div>
                                    <input type="text" style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.9em'
                                    }} placeholder="Temporary housing address" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                                    <div style={{ color: '#B0C4DE', fontSize: '0.9em', marginBottom: '5px' }}>Check-in/Check-out</div>
                                    <input type="text" style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.9em'
                                    }} placeholder="Dates" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '50px',
                    marginBottom: '40px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 style={{ fontSize: '2.5em', marginBottom: '30px', color: '#00D4AA' }}>Phase 1: Initial Setup & Planning</h2>
                    <p style={{ fontSize: '1.1em', marginBottom: '20px', color: '#E6F3FF' }}>
                        First 30 days - establish timeline, gather requirements, and coordinate with all parties.
                    </p>

                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        padding: '25px',
                        margin: '20px 0',
                        borderLeft: '4px solid #FFD700'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ color: '#FFD700', fontSize: '1.3em', fontWeight: 'bold' }}>Days 1-30: Foundation & Planning</div>
                            <div style={{
                                background: 'rgba(255, 215, 0, 0.2)',
                                color: '#FFD700',
                                padding: '6px 12px',
                                borderRadius: '15px',
                                fontSize: '0.9em',
                                fontWeight: 'bold'
                            }}>Weeks 1-4</div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', margin: '15px 0', padding: '15px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', transition: 'all 0.3s ease' }}>
                            <input type="checkbox" style={{ marginRight: '15px', transform: 'scale(1.3)', marginTop: '2px' }} />
                            <div style={{ flex: '1' }}>
                                <div style={{ fontWeight: 'bold', color: '#E6F3FF', marginBottom: '5px' }}>Initial client consultation and needs assessment</div>
                                <div style={{ color: '#B0C4DE', fontSize: '0.95em' }}>Meet with employee to understand housing needs, timeline, and preferences</div>
                            </div>
                            <input type="date" style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                color: 'white',
                                fontSize: '0.9em',
                                width: '140px',
                                marginLeft: '15px'
                            }} />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', margin: '15px 0', padding: '15px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', transition: 'all 0.3s ease' }}>
                            <input type="checkbox" style={{ marginRight: '15px', transform: 'scale(1.3)', marginTop: '2px' }} />
                            <div style={{ flex: '1' }}>
                                <div style={{ fontWeight: 'bold', color: '#E6F3FF', marginBottom: '5px' }}>Coordinate with HR and relocation company</div>
                                <div style={{ color: '#B0C4DE', fontSize: '0.95em' }}>Establish communication channels and confirm relocation policy details</div>
                            </div>
                            <input type="date" style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                color: 'white',
                                fontSize: '0.9em',
                                width: '140px',
                                marginLeft: '15px'
                            }} />
                        </div>
                    </div>
                </div>

                <div style={{
                    textAlign: 'center',
                    marginTop: '60px',
                    padding: '40px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px'
                }}>
                    <p style={{ color: '#B0C4DE' }}>Stacked • Real Estate CRM • Transaction Mastery Series</p>
                </div>
            </div>
        </div>
    );
};

export default CorporateRelocationTracker;
