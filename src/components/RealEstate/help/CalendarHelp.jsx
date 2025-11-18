import React from 'react';
import { Calendar, RefreshCw, Search, Plus, Settings, CheckCircle, AlertTriangle } from 'lucide-react';

const CalendarHelp = () => {
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
                        {/* <Calendar size={40} /> */}
                        📅   Calendar
                    </h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                        Schedule and manage your appointments with seamless calendar sync
                    </p>
                </div>

                {/* What is Calendar Section */}
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
                        What is the Calendar?
                    </h2>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        The Calendar section is your unified scheduling hub that syncs seamlessly with Apple Calendar and Google Calendar. Create, view, and manage all your appointments and events in one place, with automatic two-way synchronization ensuring your schedule is always up-to-date across all your devices.
                    </p>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        The calendar displays events in a monthly view and provides search functionality to quickly find specific events or filter by person's name. Events created in your CRM automatically appear in your connected calendar apps, and events created in Apple Calendar or Google Calendar sync back to your CRM.
                    </p>
                </div>

                {/* Calendar Sync Integration */}
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
                        Calendar Sync Integration
                    </h2>

                    <div style={{
                        background: '#1e3d2f',
                        borderLeft: '4px solid #10b981',
                        padding: '15px',
                        margin: '20px 0',
                        borderRadius: '4px',
                        color: '#e1e5e9'
                    }}>
                        <strong style={{ color: '#10b981' }}>✓ Two-Way Sync Enabled:</strong> Your calendar automatically syncs with Apple Calendar and Google Calendar. Events created in any calendar appear in all connected calendars within minutes.
                    </div>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Supported Calendar Systems</h3>
                    <div style={{ display: 'flex', gap: '10px', margin: '20px 0', flexWrap: 'wrap' }}>
                        <div style={{ padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', border: '1px solid #485e73', display: 'flex', alignItems: 'center', gap: '8px', background: '#4285f4', color: 'white' }}>
                            Google Calendar
                        </div>
                        <div style={{ padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', border: '1px solid #485e73', display: 'flex', alignItems: 'center', gap: '8px', background: '#000', color: 'white' }}>
                            Apple Calendar
                        </div>
                    </div>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>How Sync Works</h3>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Automatic Two-Way Sync:</strong> Events sync in both directions between your CRM and connected calendars</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Real-Time Updates:</strong> Changes made in any calendar appear across all synced calendars within 5-10 minutes</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Event Details Preserved:</strong> Title, date, time, description, and location sync across all platforms</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Multiple Calendars:</strong> You can connect both Google and Apple calendars simultaneously</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Conflict Prevention:</strong> The system prevents duplicate events across synced calendars</li>
                    </ul>

                    <div style={{
                        background: '#1e3d59',
                        borderLeft: '4px solid #00d4aa',
                        padding: '15px',
                        margin: '20px 0',
                        borderRadius: '4px',
                        color: '#e1e5e9'
                    }}>
                        <strong style={{ color: '#00d4aa' }}>💡 Pro Tip:</strong> Once synced, you can use your preferred calendar app on any device—phone, tablet, or computer—and all your real estate appointments will stay synchronized automatically.
                    </div>
                </div>

                {/* Connecting Calendar */}
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
                        Connecting Your Calendar
                    </h2>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Connecting Google Calendar</h3>
                    <ol style={{ paddingLeft: '20px', counterReset: 'step-counter' }}>
                        <li style={{ counterIncrement: 'step-counter', marginBottom: '15px', paddingLeft: '40px', position: 'relative', color: '#e1e5e9' }}>
                            <span style={{ position: 'absolute', left: 0, top: 0, background: '#00d4aa', color: '#2c3e50', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>1</span>
                            Click the "Google" button in the calendar toolbar
                        </li>
                        <li style={{ counterIncrement: 'step-counter', marginBottom: '15px', paddingLeft: '40px', position: 'relative', color: '#e1e5e9' }}>
                            <span style={{ position: 'absolute', left: 0, top: 0, background: '#00d4aa', color: '#2c3e50', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>2</span>
                            Sign in to your Google account when prompted
                        </li>
                        <li style={{ counterIncrement: 'step-counter', marginBottom: '15px', paddingLeft: '40px', position: 'relative', color: '#e1e5e9' }}>
                            <span style={{ position: 'absolute', left: 0, top: 0, background: '#00d4aa', color: '#2c3e50', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>3</span>
                            Grant calendar access permissions to the CRM
                        </li>
                        <li style={{ counterIncrement: 'step-counter', marginBottom: '15px', paddingLeft: '40px', position: 'relative', color: '#e1e5e9' }}>
                            <span style={{ position: 'absolute', left: 0, top: 0, background: '#00d4aa', color: '#2c3e50', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>4</span>
                            Select which Google calendar to sync (if you have multiple)
                        </li>
                        <li style={{ counterIncrement: 'step-counter', marginBottom: '15px', paddingLeft: '40px', position: 'relative', color: '#e1e5e9' }}>
                            <span style={{ position: 'absolute', left: 0, top: 0, background: '#00d4aa', color: '#2c3e50', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>5</span>
                            Wait for the initial sync to complete (usually 1-2 minutes)
                        </li>
                        <li style={{ counterIncrement: 'step-counter', marginBottom: '15px', paddingLeft: '40px', position: 'relative', color: '#e1e5e9' }}>
                            <span style={{ position: 'absolute', left: 0, top: 0, background: '#00d4aa', color: '#2c3e50', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>6</span>
                            Look for "Connected to Google Calendar" status indicator
                        </li>
                    </ol>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Sync Status Indicator</h3>
                    <div style={{
                        background: '#2c3e50',
                        padding: '15px 20px',
                        borderRadius: '8px',
                        margin: '20px 0',
                        border: '1px solid #485e73',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        borderLeft: '4px solid #10b981'
                    }}>
                        <CheckCircle size={20} color="#10b981" />
                        <strong>Calendar Sync Status:</strong> <span style={{ color: '#10b981' }}>Connected to Apple Calendar</span>
                    </div>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        The sync status bar shows your current connection state and which calendar system is active. Green text indicates successful connection and active syncing.
                    </p>

                    <div style={{
                        background: '#3d2f2f',
                        borderLeft: '4px solid #ff6b6b',
                        padding: '15px',
                        margin: '20px 0',
                        borderRadius: '4px',
                        color: '#e1e5e9'
                    }}>
                        <strong style={{ color: '#ff6b6b' }}>⚠️ Important:</strong> You need to remain signed in to your Google or Apple account for continuous syncing. If you sign out, automatic synchronization will stop until you reconnect.
                    </div>
                </div>

                {/* Calendar Features */}
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
                        Calendar Features
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '15px',
                        margin: '20px 0'
                    }}>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '2px solid #485e73',
                            transition: 'all 0.3s ease'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '8px', fontSize: '1.1rem' }}>Monthly View</h4>
                            <p style={{ color: '#b8c5d1', fontSize: '0.9rem', margin: 0 }}>View all events in a clear monthly calendar layout</p>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '2px solid #485e73',
                            transition: 'all 0.3s ease'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '8px', fontSize: '1.1rem' }}>Two-Way Sync</h4>
                            <p style={{ color: '#b8c5d1', fontSize: '0.9rem', margin: 0 }}>Automatic synchronization with Google and Apple calendars</p>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '2px solid #485e73',
                            transition: 'all 0.3s ease'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '8px', fontSize: '1.1rem' }}>Event Search</h4>
                            <p style={{ color: '#b8c5d1', fontSize: '0.9rem', margin: 0 }}>Search for events by name, person, or keywords</p>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '2px solid #485e73',
                            transition: 'all 0.3s ease'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '8px', fontSize: '1.1rem' }}>Color Coding</h4>
                            <p style={{ color: '#b8c5d1', fontSize: '0.9rem', margin: 0 }}>Organize events with different colors for easy identification</p>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '2px solid #485e73',
                            transition: 'all 0.3s ease'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '8px', fontSize: '1.1rem' }}>Quick Navigation</h4>
                            <p style={{ color: '#b8c5d1', fontSize: '0.9rem', margin: 0 }}>Jump to today's date or navigate between months</p>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '2px solid #485e73',
                            transition: 'all 0.3s ease'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '8px', fontSize: '1.1rem' }}>Agent Assignment</h4>
                            <p style={{ color: '#b8c5d1', fontSize: '0.9rem', margin: 0 }}>Assign events to specific agents for team coordination</p>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '2px solid #485e73',
                            transition: 'all 0.3s ease'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '8px', fontSize: '1.1rem' }}>Cross-Device Access</h4>
                            <p style={{ color: '#b8c5d1', fontSize: '0.9rem', margin: 0 }}>View and edit events from any device with your calendar apps</p>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '2px solid #485e73',
                            transition: 'all 0.3s ease'
                        }}>
                            <h4 style={{ color: '#00d4aa', marginBottom: '8px', fontSize: '1.1rem' }}>Event Details</h4>
                            <p style={{ color: '#b8c5d1', fontSize: '0.9rem', margin: 0 }}>Add descriptions and relevant information to events</p>
                        </div>
                    </div>
                </div>

                {/* Adding Events */}
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
                        Adding New Events
                    </h2>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        Click the "Add Event" button to create a new calendar entry. Events created here will automatically sync to your connected Google or Apple calendar.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px',
                        margin: '20px 0'
                    }}>
                        <div style={{
                            background: '#2c3e50',
                            padding: '15px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #00d4aa',
                            border: '1px solid #485e73'
                        }}>
                            <h5 style={{ color: '#00d4aa', fontSize: '0.9rem', marginBottom: '5px' }}>Event Title <span style={{ color: '#ff6b6b' }}>*</span></h5>
                            <p style={{ color: '#b8c5d1', fontSize: '0.8rem', margin: 0 }}>Name of your event or appointment</p>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '15px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #00d4aa',
                            border: '1px solid #485e73'
                        }}>
                            <h5 style={{ color: '#00d4aa', fontSize: '0.9rem', marginBottom: '5px' }}>Date</h5>
                            <p style={{ color: '#b8c5d1', fontSize: '0.8rem', margin: 0 }}>Automatically set to the selected date</p>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '15px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #00d4aa',
                            border: '1px solid #485e73'
                        }}>
                            <h5 style={{ color: '#00d4aa', fontSize: '0.9rem', marginBottom: '5px' }}>Time</h5>
                            <p style={{ color: '#b8c5d1', fontSize: '0.8rem', margin: 0 }}>Start time for your event</p>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '15px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #00d4aa',
                            border: '1px solid #485e73'
                        }}>
                            <h5 style={{ color: '#00d4aa', fontSize: '0.9rem', marginBottom: '5px' }}>Color</h5>
                            <p style={{ color: '#b8c5d1', fontSize: '0.8rem', margin: 0 }}>Choose from available color options</p>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '15px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #00d4aa',
                            border: '1px solid #485e73'
                        }}>
                            <h5 style={{ color: '#00d4aa', fontSize: '0.9rem', marginBottom: '5px' }}>Agent</h5>
                            <p style={{ color: '#b8c5d1', fontSize: '0.8rem', margin: 0 }}>Assign event to a specific agent</p>
                        </div>
                        <div style={{
                            background: '#2c3e50',
                            padding: '15px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #00d4aa',
                            border: '1px solid #485e73'
                        }}>
                            <h5 style={{ color: '#00d4aa', fontSize: '0.9rem', marginBottom: '5px' }}>Description</h5>
                            <p style={{ color: '#b8c5d1', fontSize: '0.8rem', margin: 0 }}>Additional details about the event</p>
                        </div>
                    </div>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Event Color Options</h3>
                    <p style={{ marginBottom: '15px', fontSize: '1rem', color: '#e1e5e9' }}>
                        Choose from the following color palette to organize your events:
                    </p>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '15px 0', alignItems: 'center' }}>
                        {[
                            { color: '#3b82f6', name: 'Blue' },
                            { color: '#10b981', name: 'Green' },
                            { color: '#8b5cf6', name: 'Purple' },
                            { color: '#ef4444', name: 'Red' },
                            { color: '#f59e0b', name: 'Yellow' },
                            { color: '#ec4899', name: 'Pink' },
                            { color: '#6366f1', name: 'Light Blue' },
                            { color: '#6b7280', name: 'Gray' }
                        ].map((colorOption, index) => (
                            <div key={index} style={{
                                width: '25px',
                                height: '25px',
                                borderRadius: '50%',
                                border: '2px solid #485e73',
                                backgroundColor: colorOption.color
                            }} title={colorOption.name} />
                        ))}
                    </div>

                    <div style={{
                        background: '#1e3d59',
                        borderLeft: '4px solid #00d4aa',
                        padding: '15px',
                        margin: '20px 0',
                        borderRadius: '4px',
                        color: '#e1e5e9'
                    }}>
                        <strong style={{ color: '#00d4aa' }}>🎨 Color Coding Tip:</strong> Use consistent colors for different types of events. For example, use blue for client meetings, green for property showings, yellow for team meetings, and red for personal appointments.
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
                        Calendar Best Practices
                    </h2>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Recommended Color System</h3>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Blue:</strong> Client meetings and consultations</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Green:</strong> Property showings and open houses</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Yellow:</strong> Team meetings and training</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Red:</strong> Deadlines and urgent tasks</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Purple:</strong> Marketing events and networking</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Pink:</strong> Personal appointments</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}><strong>Gray:</strong> Administrative tasks</li>
                    </ul>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Event Title Best Practices</h3>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>"Client Meeting - John Smith (Buyer Consultation)"</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>"Property Showing - 123 Main St - Sarah Johnson"</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>"Team Meeting - Weekly Sales Review"</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>"Open House - 456 Oak Ave (2-4 PM)"</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>"Closing - 789 Elm St - Martinez Family"</li>
                    </ul>

                    <div style={{
                        background: '#1e3d59',
                        borderLeft: '4px solid #00d4aa',
                        padding: '15px',
                        margin: '20px 0',
                        borderRadius: '4px',
                        color: '#e1e5e9'
                    }}>
                        <strong style={{ color: '#00d4aa' }}>💡 Consistency Tip:</strong> Using consistent event titles and descriptions helps maintain clarity across all your synced calendars and makes events easier to find later.
                    </div>
                </div>

                {/* Troubleshooting */}
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
                        Troubleshooting Sync Issues
                    </h2>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Events Not Syncing</h3>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Check the sync status bar—ensure it shows "Connected"</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Click the manual "Sync" button to force an immediate sync</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Verify you're still signed in to your Google or Apple account</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Check your internet connection</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Wait 10-15 minutes—some syncs take time</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Try disconnecting and reconnecting your calendar</li>
                    </ul>

                    <h3 style={{ color: '#00d4aa', fontSize: '1.3rem', margin: '25px 0 15px 0' }}>Connection Lost</h3>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Check if you've changed your Google or Apple account password</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Click the calendar button to re-authenticate</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Ensure you're still logged into your Google or Apple account</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Check if calendar permissions were accidentally revoked</li>
                        <li style={{ marginBottom: '8px', color: '#e1e5e9' }}>Try signing out and signing back in to reconnect</li>
                    </ul>

                    <div style={{
                        background: '#1e3d59',
                        borderLeft: '4px solid #00d4aa',
                        padding: '15px',
                        margin: '20px 0',
                        borderRadius: '4px',
                        color: '#e1e5e9'
                    }}>
                        <strong style={{ color: '#00d4aa' }}>Sync Troubleshooting:</strong> Most sync issues resolve themselves within 15 minutes. If problems persist beyond 30 minutes, try disconnecting and reconnecting your calendar or contact support.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarHelp;
