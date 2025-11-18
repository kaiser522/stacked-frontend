import React from 'react';
import { Library, Search, Download, Eye, Share2, BookOpen, FileText, CheckSquare, TrendingUp } from 'lucide-react';

const LibraryHelp = () => {
    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: 1.6,
            color: '#e1e5e9',
            backgroundColor: '#2c3e50',
            minHeight: '100vh'
        }}>
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '40px 20px'
            }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)',
                    color: 'white',
                    padding: '30px',
                    borderRadius: '12px',
                    marginBottom: '30px',
                    textAlign: 'center',
                    border: '1px solid #00d4aa'
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        marginBottom: '10px',
                        fontWeight: 700,
                        color: '#00d4aa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                    }}>
                        {/* <Library size={40} /> */}
                        📚  Library
                    </h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                        Guides & Checklists for Real Estate Success
                    </p>
                </div>

                {/* What is Library Section */}
                <div style={{
                    background: '#34495e',
                    padding: '30px',
                    borderRadius: '12px',
                    marginBottom: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    border: '1px solid #485e73'
                }}>
                    <h2 style={{
                        color: '#00d4aa',
                        fontSize: '1.8rem',
                        marginBottom: '20px',
                        borderBottom: '3px solid #00d4aa',
                        paddingBottom: '10px'
                    }}>
                        What is the Library?
                    </h2>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        The Library is your comprehensive resource center containing professional guides, checklists, process documents, and market analysis tools designed specifically for real estate professionals. This collection includes everything from first-time buyer guides to complex market analysis templates, helping you provide expert service to your clients while streamlining your own processes.
                    </p>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        Each resource can be downloaded, viewed online, or shared with clients and colleagues, making it easy to access the information you need when you need it.
                    </p>
                </div>

                {/* Library Categories */}
                <div style={{
                    background: '#34495e',
                    padding: '30px',
                    borderRadius: '12px',
                    marginBottom: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    border: '1px solid #485e73'
                }}>
                    <h2 style={{
                        color: '#00d4aa',
                        fontSize: '1.8rem',
                        marginBottom: '20px',
                        borderBottom: '3px solid #00d4aa',
                        paddingBottom: '10px'
                    }}>
                        Library Categories
                    </h2>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        The Library is organized into six main categories to help you find the right resources quickly:
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '15px',
                        margin: '20px 0'
                    }}>
                        <div style={{
                            background: '#2c3e50',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '2px solid #00d4aa',
                            textAlign: 'center',
                            transition: 'all 0.3s ease',
                            // background: '#1e3d59'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '5px', fontSize: '1rem' }}>All Resources</h4>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '2px solid #485e73',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '5px', fontSize: '1rem' }}>Buyer Guides</h4>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '2px solid #485e73',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '5px', fontSize: '1rem' }}>Seller Guides</h4>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '2px solid #485e73',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '5px', fontSize: '1rem' }}>Checklists</h4>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '2px solid #485e73',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '5px', fontSize: '1rem' }}>Process Guides</h4>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '2px solid #485e73',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '5px', fontSize: '1rem' }}>Market Reports</h4>
                        </div>
                    </div>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Category Descriptions</h3>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>All Resources:</strong> Complete view of all available materials across all categories</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Buyer Guides:</strong> Educational materials and timelines for homebuyers</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Seller Guides:</strong> Resources for sellers including preparation and marketing strategies</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Checklists:</strong> Step-by-step checklists for various real estate processes</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Process Guides:</strong> Timeline trackers and procedural documentation</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Market Reports:</strong> Analysis tools and market research templates</li>
                    </ul>
                </div>

                {/* Search Functionality */}
                <div style={{
                    background: '#34495e',
                    padding: '30px',
                    borderRadius: '12px',
                    marginBottom: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    border: '1px solid #485e73'
                }}>
                    <h2 style={{
                        color: '#00d4aa',
                        fontSize: '1.8rem',
                        marginBottom: '20px',
                        borderBottom: '3px solid #00d4aa',
                        paddingBottom: '10px'
                    }}>
                        Search Functionality
                    </h2>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        Use the search bar to quickly find specific resources by keyword, topic, or content type:
                    </p>

                    <div style={{
                        background: '#2c3e50',
                        padding: '20px',
                        borderRadius: '8px',
                        margin: '20px 0',
                        border: '1px solid #485e73'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Search size={20} color="#00d4aa" />
                            <input
                                type="text"
                                placeholder="Search library..."
                                style={{
                                    flex: 1,
                                    padding: '12px 15px',
                                    background: '#34495e',
                                    border: '1px solid #485e73',
                                    borderRadius: '6px',
                                    color: '#e1e5e9',
                                    fontSize: '1rem'
                                }}
                                readOnly
                            />
                        </div>
                    </div>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Search Tips</h3>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Use specific keywords like "closing," "pre-approval," or "marketing"</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Search by client type: "buyer," "seller," "first-time"</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Look for resource types: "checklist," "guide," "tracker"</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Search results update in real-time as you type</li>
                    </ul>
                </div>

                {/* Available Resources */}
                <div style={{
                    background: '#34495e',
                    padding: '30px',
                    borderRadius: '12px',
                    marginBottom: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    border: '1px solid #485e73'
                }}>
                    <h2 style={{
                        color: '#00d4aa',
                        fontSize: '1.8rem',
                        marginBottom: '20px',
                        borderBottom: '3px solid #00d4aa',
                        paddingBottom: '10px'
                    }}>
                        Available Resources
                    </h2>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        The Library contains professional-grade resources designed for real estate success:
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px',
                        margin: '20px 0'
                    }}>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '12px',
                            border: '1px solid #485e73',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#00d4aa',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '15px',
                                    flexShrink: 0
                                }}>
                                    <FileText size={20} color="#2c3e50" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ color: '#e1e5e9', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>First-Time Buyer Guide</div>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', background: '#3498db', color: 'white' }}>GUIDE</span>
                                        <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', background: '#f39c12', color: 'white' }}>popular</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ color: '#b8c5d1', fontSize: '0.9rem', marginBottom: '15px', lineHeight: 1.5 }}>
                                Comprehensive step-by-step guide for first-time homebuyers covering pre-approval, house hunting, making offers, and closing process.
                            </div>
                        </div>

                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '12px',
                            border: '1px solid #485e73',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#00d4aa',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '15px',
                                    flexShrink: 0
                                }}>
                                    <CheckSquare size={20} color="#2c3e50" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ color: '#e1e5e9', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>Home Selling Checklist</div>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', background: '#27ae60', color: 'white' }}>CHECKLIST</span>
                                        <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', background: '#e67e22', color: 'white' }}>updated</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ color: '#b8c5d1', fontSize: '0.9rem', marginBottom: '15px', lineHeight: 1.5 }}>
                                Complete checklist for sellers covering preparation, staging, pricing, marketing, and closing requirements.
                            </div>
                        </div>

                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '12px',
                            border: '1px solid #485e73',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#00d4aa',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '15px',
                                    flexShrink: 0
                                }}>
                                    <TrendingUp size={20} color="#2c3e50" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ color: '#e1e5e9', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>Market Analysis Guide</div>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', background: '#3498db', color: 'white' }}>GUIDE</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ color: '#b8c5d1', fontSize: '0.9rem', marginBottom: '15px', lineHeight: 1.5 }}>
                                Learn how to conduct comparative market analysis (CMA) and provide accurate pricing recommendations to clients.
                            </div>
                        </div>

                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '12px',
                            border: '1px solid #485e73',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#00d4aa',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '15px',
                                    flexShrink: 0
                                }}>
                                    <CheckSquare size={20} color="#2c3e50" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ color: '#e1e5e9', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>Closing Process Checklist</div>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', background: '#27ae60', color: 'white' }}>CHECKLIST</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ color: '#b8c5d1', fontSize: '0.9rem', marginBottom: '15px', lineHeight: 1.5 }}>
                                Step-by-step checklist for managing the closing process from contract to keys, ensuring nothing is missed.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resource Actions */}
                <div style={{
                    background: '#34495e',
                    padding: '30px',
                    borderRadius: '12px',
                    marginBottom: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    border: '1px solid #485e73'
                }}>
                    <h2 style={{
                        color: '#00d4aa',
                        fontSize: '1.8rem',
                        marginBottom: '20px',
                        borderBottom: '3px solid #00d4aa',
                        paddingBottom: '10px'
                    }}>
                        Resource Actions
                    </h2>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        Each resource offers three main actions to help you use and distribute the materials effectively:
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        margin: '20px 0'
                    }}>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '1px solid #485e73'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                <Download size={24} color="#00d4aa" />
                                <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: 0 }}>Download</h3>
                            </div>
                            <p style={{ color: '#b8c5d1', fontSize: '0.9rem', margin: 0 }}>Downloads the resource as a PDF file to your device. Downloaded files can be printed for physical distribution to clients, saved to your local files for offline access, customized with your branding, or shared via email or other file-sharing methods.</p>
                        </div>

                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '1px solid #485e73'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                <Eye size={24} color="#00d4aa" />
                                <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: 0 }}>View</h3>
                            </div>
                            <p style={{ color: '#b8c5d1', fontSize: '0.9rem', margin: 0 }}>Opens the resource in your browser for online viewing. This allows you to preview content before downloading or sharing, access resources on any device without storage requirements, navigate through multi-page documents easily, and view the most up-to-date version of the resource.</p>
                        </div>

                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '1px solid #485e73'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                <Share2 size={24} color="#00d4aa" />
                                <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: 0 }}>Share</h3>
                            </div>
                            <p style={{ color: '#b8c5d1', fontSize: '0.9rem', margin: 0 }}>Provides multiple sharing options for distributing resources to clients and colleagues including direct links, social media sharing to Facebook, WhatsApp, and Twitter, and link sharing for email or messaging.</p>
                        </div>
                    </div>
                </div>

                {/* Best Practices */}
                <div style={{
                    background: '#34495e',
                    padding: '30px',
                    borderRadius: '12px',
                    marginBottom: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    border: '1px solid #485e73'
                }}>
                    <h2 style={{
                        color: '#00d4aa',
                        fontSize: '1.8rem',
                        marginBottom: '20px',
                        borderBottom: '3px solid #00d4aa',
                        paddingBottom: '10px'
                    }}>
                        Best Practices for Using the Library
                    </h2>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Client Education Strategy</h3>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Staged Delivery:</strong> Provide resources at appropriate transaction stages rather than overwhelming clients upfront</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Personalized Selection:</strong> Choose resources that match your client's specific situation and experience level</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Follow-up Discussions:</strong> Use resources as conversation starters and reference materials during meetings</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Value Positioning:</strong> Explain how each resource benefits the client's specific transaction goals</li>
                    </ul>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Professional Development</h3>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Stay Current:</strong> Regularly review updated resources to maintain current market knowledge</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Process Standardization:</strong> Use checklists and guides to ensure consistent service delivery</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Client Confidence:</strong> Well-informed agents using professional resources build greater client trust</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Competitive Advantage:</strong> Comprehensive resources differentiate your service from competitors</li>
                    </ul>

                    <div style={{
                        background: '#1e3d59',
                        borderLeft: '4px solid #00d4aa',
                        padding: '15px',
                        margin: '20px 0',
                        borderRadius: '4px',
                        color: '#e1e5e9'
                    }}>
                        <strong style={{ color: '#00d4aa' }}>Pro Tip:</strong> Bookmark the Library section and check for new resources monthly to ensure you're always offering clients the most current and comprehensive materials available.
                    </div>
                </div>

                {/* Legal Disclaimers */}
                <div style={{
                    background: '#34495e',
                    padding: '30px',
                    borderRadius: '12px',
                    marginBottom: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    border: '1px solid #485e73'
                }}>
                    <h2 style={{
                        color: '#00d4aa',
                        fontSize: '1.8rem',
                        marginBottom: '20px',
                        borderBottom: '3px solid #00d4aa',
                        paddingBottom: '10px'
                    }}>
                        Legal Disclaimers and Usage
                    </h2>

                    <div style={{
                        background: '#d2691e',
                        borderLeft: '4px solid #ff6b35',
                        padding: '15px',
                        margin: '20px 0',
                        borderRadius: '4px',
                        color: 'white'
                    }}>
                        <strong style={{ color: 'white' }}>IMPORTANT LEGAL DISCLAIMER:</strong> These resources are for business use only and do not constitute legal advice. Stacked Technologies, LLC is not a law firm. Users are responsible for confirming compliance with all applicable local, state, and federal laws.
                    </div>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Professional Use Guidelines</h3>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Educational Purpose:</strong> Resources are designed for client education and process guidance</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Local Law Compliance:</strong> Always verify information aligns with local real estate laws and regulations</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Professional Review:</strong> Consider having legal or compliance professionals review resources before client distribution</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Market Specificity:</strong> Supplement generic information with local market conditions and practices</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LibraryHelp;
