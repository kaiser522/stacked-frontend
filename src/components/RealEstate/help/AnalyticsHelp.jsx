import React from 'react';
import { BarChart3, TrendingUp, Users, Calendar, Target, Zap, Database, Star } from 'lucide-react';

const AnalyticsHelp = () => {
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
                        {/* <BarChart3 size={40} /> */}
                        📊   Analytics
                    </h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                        Track your business performance and insights
                    </p>
                </div>

                {/* What is Analytics Section */}
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
                        What is the Analytics Section?
                    </h2>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        The Analytics section is your comprehensive business intelligence dashboard that provides deep insights into your real estate performance. It combines contact source analysis, pipeline analytics, activity tracking with smart prioritization, and performance metrics to help you make data-driven decisions and optimize your business strategy.
                    </p>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        This advanced section uses intelligent algorithms to calculate client priority scores, track deal flow through your pipeline, monitor activity completion rates, and analyze which marketing channels deliver the best ROI. Everything updates in real-time to give you an accurate picture of your business health.
                    </p>
                </div>

                {/* Contact Sources Performance */}
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
                        Contact Sources Performance
                    </h2>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        Analyze the effectiveness of your marketing channels and lead generation sources with detailed performance metrics:
                    </p>

                    <div style={{
                        width: '100%',
                        margin: '20px 0',
                        borderCollapse: 'collapse',
                        background: '#2c3e50',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#1e2a36' }}>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: '#00d4aa', fontWeight: 600 }}>Source</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: '#00d4aa', fontWeight: 600 }}>Total Contacts</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: '#00d4aa', fontWeight: 600 }}>Converted</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: '#00d4aa', fontWeight: 600 }}>Conversion Rate</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: '#00d4aa', fontWeight: 600 }}>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>Referrals</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>15</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>8</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>53%</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>$145,000</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>Social Media</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>22</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>5</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>23%</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>$85,000</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>Website</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>18</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>3</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>17%</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>$65,000</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>Open House</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>12</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>4</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>33%</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9', borderBottom: '1px solid #485e73' }}>$95,000</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9' }}>Cold Outreach</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9' }}>8</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9' }}>1</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9' }}>13%</td>
                                    <td style={{ padding: '12px 15px', color: '#e1e5e9' }}>$25,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Understanding Contact Source Metrics</h3>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Total Contacts:</strong> Number of leads generated from each source</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Converted:</strong> How many leads became actual clients or closed deals</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Conversion Rate:</strong> Percentage of leads that converted to business (Converted / Total Contacts × 100)</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Revenue:</strong> Total revenue generated from each source</li>
                    </ul>

                    <div style={{
                        background: '#1e3d59',
                        borderLeft: '4px solid #00d4aa',
                        padding: '15px',
                        margin: '20px 0',
                        borderRadius: '4px',
                        color: '#e1e5e9'
                    }}>
                        <strong style={{ color: '#00d4aa' }}>💡 Marketing Insight:</strong> Referrals show the highest conversion rate (53%), while Cold Outreach has the lowest (13%). Focus more resources on high-performing channels like Referrals and Open House for better ROI.
                    </div>
                </div>

                {/* Pipeline Analytics */}
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
                        Pipeline Analytics
                    </h2>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        Get a comprehensive view of your deal pipeline with three key analytics components:
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
                            borderRadius: '8px',
                            border: '1px solid #485e73'
                        }}>
                            <h4 style={{ color: '#e1e5e9', fontSize: '1.1rem', marginBottom: '15px' }}>Deal Stage Distribution</h4>
                            <p style={{ marginBottom: '15px', color: '#e1e5e9' }}>Visual breakdown showing how many deals are in each stage of your pipeline. The circular chart displays the total number of deals (e.g., 11 deals) and color-coded segments for each stage:</p>
                            <ul style={{ paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>
                                    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', marginRight: '8px', background: '#ef4444', color: 'white' }}>New Leads: 4</span>
                                </li>
                                <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>
                                    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', marginRight: '8px', background: '#3b82f6', color: 'white' }}>Contracted: 1</span>
                                </li>
                                <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>
                                    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', marginRight: '8px', background: '#10b981', color: 'white' }}>Closed: 2</span>
                                </li>
                                <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>
                                    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', marginRight: '8px', background: '#eab308', color: 'white' }}>Other: 4</span>
                                </li>
                            </ul>
                        </div>

                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '1px solid #485e73'
                        }}>
                            <h4 style={{ color: '#e1e5e9', fontSize: '1.1rem', marginBottom: '15px' }}>Conversion Rate</h4>
                            <p style={{ marginBottom: '15px', color: '#e1e5e9' }}>Tracks your lead-to-close conversion percentage with trend indicator:</p>
                            <ul style={{ paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Current Rate:</strong> Shows your overall conversion rate (e.g., 27%)</li>
                                <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Trend:</strong> Green up arrow indicates improvement (e.g., ↑ 3.2%)</li>
                                <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Historical Chart:</strong> Bar graph showing conversion trends over time</li>
                            </ul>
                        </div>

                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '1px solid #485e73'
                        }}>
                            <h4 style={{ color: '#e1e5e9', fontSize: '1.1rem', marginBottom: '15px' }}>Pipeline Value</h4>
                            <p style={{ marginBottom: '15px', color: '#e1e5e9' }}>Total monetary value of all deals in your pipeline broken down by stage:</p>
                            <ul style={{ paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Total Pipeline Value:</strong> Combined value of all active deals ($848,500)</li>
                                <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Offer Stage:</strong> Value of deals where offers have been made ($165K)</li>
                                <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Contract Stage:</strong> Value of deals under contract ($128K)</li>
                                <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Active Pipeline:</strong> Total value of all active opportunities ($555K)</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{
                        background: '#1e3d59',
                        borderLeft: '4px solid #00d4aa',
                        padding: '15px',
                        margin: '20px 0',
                        borderRadius: '4px',
                        color: '#e1e5e9'
                    }}>
                        <strong style={{ color: '#00d4aa' }}>📊 Pipeline Health:</strong> A healthy pipeline has deals in every stage and a conversion rate above 20%. If your conversion rate is trending down, review your follow-up processes and client engagement strategies.
                    </div>
                </div>

                {/* Activity Hub */}
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
                        Activity Hub
                    </h2>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        Stay on top of client interactions and never miss a follow-up with the intelligent Activity Hub. This feature uses a sophisticated priority scoring system to rank clients based on urgency and importance.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '15px',
                        margin: '20px 0'
                    }}>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #00d4aa',
                            border: '1px solid #485e73'
                        }}>
                            <h4 style={{ color: '#00d4aa', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Pending Reminders</h4>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e1e5e9', marginBottom: '5px' }}>12</div>
                            <div style={{ fontSize: '0.8rem', color: '#b8c5d1' }}>Actions needed</div>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #00d4aa',
                            border: '1px solid #485e73'
                        }}>
                            <h4 style={{ color: '#00d4aa', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Today's Activities</h4>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e1e5e9', marginBottom: '5px' }}>47</div>
                            <div style={{ fontSize: '0.8rem', color: '#b8c5d1' }}>Scheduled</div>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #00d4aa',
                            border: '1px solid #485e73'
                        }}>
                            <h4 style={{ color: '#00d4aa', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Urgent Follow-ups</h4>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e1e5e9', marginBottom: '5px' }}>3</div>
                            <div style={{ fontSize: '0.8rem', color: '#b8c5d1' }}>High priority</div>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #00d4aa',
                            border: '1px solid #485e73'
                        }}>
                            <h4 style={{ color: '#00d4aa', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Response Rate</h4>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e1e5e9', marginBottom: '5px' }}>89%</div>
                            <div style={{ fontSize: '0.8rem', color: '#b8c5d1' }}>Client engagement</div>
                        </div>
                    </div>
                </div>

                {/* Priority Scoring System */}
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
                        Priority Scoring System
                    </h2>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        The Activity Hub uses an intelligent point-based system to automatically prioritize your clients. Points accumulate based on various factors, and clients are categorized into three priority levels:
                    </p>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Priority Levels</h3>
                    <div style={{ margin: '20px 0' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', marginRight: '8px', background: '#ef4444', color: 'white' }}>High Priority (80-100 points)</span>
                            <p style={{ marginTop: '8px', color: '#e1e5e9' }}>Clients requiring immediate attention. These are hot leads, time-sensitive situations, or clients you haven't contacted in too long.</p>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', marginRight: '8px', background: '#eab308', color: 'white' }}>Medium Priority (40-79 points)</span>
                            <p style={{ marginTop: '8px', color: '#e1e5e9' }}>Clients needing follow-up soon but not urgent. Regular check-ins and scheduled activities.</p>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', marginRight: '8px', background: '#10b981', color: 'white' }}>Low Priority (10-39 points)</span>
                            <p style={{ marginTop: '8px', color: '#e1e5e9' }}>Routine follow-ups and relationship maintenance. Birthdays, newsletters, general check-ins.</p>
                        </div>
                    </div>
                </div>

                {/* Monthly Performance Chart */}
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
                        Monthly Performance Chart
                    </h2>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        Visual representation of your monthly revenue trends:
                    </p>

                    <div style={{ background: '#2c3e50', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
                        <p style={{ textAlign: 'center', color: '#b8c5d1', marginBottom: '15px' }}>Monthly performance chart would display here</p>
                        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                                <div key={month} style={{ textAlign: 'center', margin: '10px' }}>
                                    <div style={{ color: '#00d4aa', fontWeight: 'bold', marginBottom: '5px' }}>{month}</div>
                                    <div style={{ color: '#e1e5e9' }}>${32 + index * 2}K</div>
                                </div>
                            ))}
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
                        Best Practices for Analytics
                    </h2>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Daily Analytics Routine</h3>
                    <ol style={{ paddingLeft: '20px', counterReset: 'step-counter' }}>
                        <li style={{ counterIncrement: 'step-counter', marginBottom: '15px', paddingLeft: '40px', position: 'relative', color: '#e1e5e9' }}>
                            <span style={{ position: 'absolute', left: 0, top: 0, background: '#00d4aa', color: '#2c3e50', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>1</span>
                            Check Activity Hub for high-priority clients needing immediate attention
                        </li>
                        <li style={{ counterIncrement: 'step-counter', marginBottom: '15px', paddingLeft: '40px', position: 'relative', color: '#e1e5e9' }}>
                            <span style={{ position: 'absolute', left: 0, top: 0, background: '#00d4aa', color: '#2c3e50', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>2</span>
                            Review today's scheduled activities and pending reminders
                        </li>
                        <li style={{ counterIncrement: 'step-counter', marginBottom: '15px', paddingLeft: '40px', position: 'relative', color: '#e1e5e9' }}>
                            <span style={{ position: 'absolute', left: 0, top: 0, background: '#00d4aa', color: '#2c3e50', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>3</span>
                            Address all urgent follow-ups (3 urgent items) before other tasks
                        </li>
                        <li style={{ counterIncrement: 'step-counter', marginBottom: '15px', paddingLeft: '40px', position: 'relative', color: '#e1e5e9' }}>
                            <span style={{ position: 'absolute', left: 0, top: 0, background: '#00d4aa', color: '#2c3e50', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>4</span>
                            Log completed activities to keep the system updated
                        </li>
                        <li style={{ counterIncrement: 'step-counter', marginBottom: '15px', paddingLeft: '40px', position: 'relative', color: '#e1e5e9' }}>
                            <span style={{ position: 'absolute', left: 0, top: 0, background: '#00d4aa', color: '#2c3e50', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>5</span>
                            End day by scheduling tomorrow's follow-ups
                        </li>
                    </ol>

                    <div style={{
                        background: '#1e3d59',
                        borderLeft: '4px solid #00d4aa',
                        padding: '15px',
                        margin: '20px 0',
                        borderRadius: '4px',
                        color: '#e1e5e9'
                    }}>
                        <strong style={{ color: '#00d4aa' }}>Quick Start:</strong> The Analytics section becomes more powerful with data. Focus first on consistent activity logging for 2-3 weeks, then the priority system and conversion tracking will have enough data to provide meaningful insights.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsHelp;
