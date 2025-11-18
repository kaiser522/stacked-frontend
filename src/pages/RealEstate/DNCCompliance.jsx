import React, { useState } from 'react';
import {
    Shield,
    AlertTriangle,
    CheckCircle,
    Clock,
    Phone,
    MessageSquare,
    FileText,
    Users,
    Calendar,
    Check,
    X,
    ExternalLink,
    Scale,
    Gavel,
    DollarSign,
    Clock3,
    PhoneCall,
    PhoneOff,
    Mail,
    AlertCircle
} from 'lucide-react';
import { Button } from '../../components/RealEstate/ui/Button';
import { Badge } from '../../components/RealEstate/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/RealEstate/ui/Card';

const DNCCompliance = () => {
    const [completedChecks, setCompletedChecks] = useState(new Set());
    const [showComplianceModal, setShowComplianceModal] = useState(false);

    const toggleCheck = (checkId) => {
        setCompletedChecks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(checkId)) {
                newSet.delete(checkId);
            } else {
                newSet.add(checkId);
            }
            return newSet;
        });
    };

    const complianceChecks = [
        { id: 'dnc-registry', label: 'Access National DNC Registry', description: 'Download lists every 31 days maximum ($67 per area code annually)' },
        { id: 'scrub-lists', label: 'Scrub Contact Lists', description: 'Remove all registered numbers before calling (automated scrubbing recommended)' },
        { id: 'maintain-records', label: 'Maintain Records', description: 'Keep documentation of registry access and list cleaning for 5 years' },
        { id: 'internal-dnc', label: 'Handle Internal DNC', description: 'Maintain your own suppression list of people who requested no contact' },
        { id: 'state-registry', label: 'State Registry Check', description: 'Some states maintain additional DNC registries (Texas, Florida, etc.)' }
    ];

    const monthlyChecks = [
        { id: 'monthly-dnc', label: 'DNC Registry Update', description: 'Download fresh DNC data (required every 31 days)' },
        { id: 'consent-audit', label: 'Consent Audit', description: 'Review consent collection processes and documentation' },
        { id: 'opt-out-analysis', label: 'Opt-Out Analysis', description: 'Analyze opt-out rates and complaint patterns' },
        { id: 'team-training', label: 'Team Training Review', description: 'Update staff on new regulations and best practices' },
        { id: 'tech-testing', label: 'Technology Testing', description: 'Verify compliance tools are functioning correctly' }
    ];

    const dailyChecks = [
        { id: 'daily-dnc', label: 'Verify DNC Scrubbing', description: 'Confirm all lists are scrubbed before campaigns' },
        { id: 'time-zones', label: 'Check Time Zones', description: 'Ensure calls/texts comply with local time restrictions' },
        { id: 'process-optouts', label: 'Process Opt-Outs', description: 'Immediately honor all STOP requests and DNC additions' },
        { id: 'update-records', label: 'Update Records', description: 'Log all communications and consent status changes' },
        { id: 'monitor-complaints', label: 'Monitor Complaints', description: 'Track and investigate any compliance issues' }
    ];

    const timeRestrictions = [
        { day: 'Mon', times: ['6-8 AM', '8AM-9PM', '9PM-12AM'], status: ['prohibited', 'allowed', 'prohibited'] },
        { day: 'Tue', times: ['6-8 AM', '8AM-9PM', '9PM-12AM'], status: ['prohibited', 'allowed', 'prohibited'] },
        { day: 'Wed', times: ['6-8 AM', '8AM-9PM', '9PM-12AM'], status: ['prohibited', 'allowed', 'prohibited'] },
        { day: 'Thu', times: ['6-8 AM', '8AM-9PM', '9PM-12AM'], status: ['prohibited', 'allowed', 'prohibited'] },
        { day: 'Fri', times: ['6-8 AM', '8AM-9PM', '9PM-12AM'], status: ['prohibited', 'allowed', 'prohibited'] },
        { day: 'Sat', times: ['6-8 AM', '8AM-9PM', '9PM-12AM'], status: ['prohibited', 'allowed', 'prohibited'] }
    ];

    const violations = [
        {
            violation: "Texting leads from purchased lists without explicit text consent",
            penalty: "Penalty: $1,500+ per text",
            solution: "Only text contacts who explicitly opted in through your forms or gave written consent"
        },
        {
            violation: "Using autodialers without proper consent records",
            penalty: "Penalty: $500-$1,500 per call",
            solution: "Maintain detailed consent records and use manual dialing when in doubt"
        },
        {
            violation: "Continuing to call after 'add to DNC' request",
            penalty: "Penalty: Up to $46,517 per call",
            solution: "Immediately add to suppression list and confirm no future contact"
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--dark-bg)] p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-[var(--primary-color)] rounded-xl mx-auto mb-6 flex items-center justify-center">
                        <Scale className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        DNC Compliance Guide
                    </h1>
                    <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 text-sm font-semibold mb-6">
                        Legal Compliance
                    </Badge>
                    <p className="text-xl text-gray-400 mb-4">Complete guide to Do Not Call regulations, dialer requirements, and texting compliance for real estate professionals.</p>
                    <div className="bg-[rgba(255,255,255,0.1)] px-6 py-3 rounded-full inline-block">
                        <span className="text-sm font-semibold">25 min read</span>
                    </div>
                </div>

                {/* Warning Box */}
                <Card className="bg-gradient-to-r from-[rgba(245,158,11,0.2)] to-[rgba(217,119,6,0.2)] border-[rgba(245,158,11,0.4)] mb-8">
                    <CardContent className="p-8 text-center">
                        <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                            Violations can cost up to $46,517 per illegal call or text
                        </h2>
                        <p className="text-gray-300 text-lg">
                            The Do Not Call (DNC) registry and related regulations protect consumers from unwanted marketing calls and texts.
                            For real estate professionals using calling and texting platforms, compliance isn't optional—it's critical to avoid
                            massive penalties and protect your business reputation.
                        </p>
                    </CardContent>
                </Card>

                {/* Key Regulations */}
                <Card className="bg-[rgba(30,41,59,0.8)] border-[rgba(71,85,105,0.3)] mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-[var(--primary-color)]">Key Regulations Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-[rgba(59,130,246,0.1)] border-2 border-[var(--primary-color)] rounded-xl p-6 text-center">
                                <Gavel className="w-8 h-8 text-[var(--primary-color)] mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-white mb-2">TCPA (1991)</h3>
                                <p className="text-gray-400 text-sm">Telephone Consumer Protection Act - Regulates autodialed calls, prerecorded messages, and text messages to cell phones</p>
                            </div>
                            <div className="bg-[rgba(59,130,246,0.1)] border-2 border-[var(--primary-color)] rounded-xl p-6 text-center">
                                <FileText className="w-8 h-8 text-[var(--primary-color)] mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-white mb-2">TSR (1995)</h3>
                                <p className="text-gray-400 text-sm">Telemarketing Sales Rule - Governs telemarketing practices and maintains the National DNC Registry</p>
                            </div>
                            <div className="bg-[rgba(59,130,246,0.1)] border-2 border-[var(--primary-color)] rounded-xl p-6 text-center">
                                <Mail className="w-8 h-8 text-[var(--primary-color)] mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-white mb-2">CAN-SPAM (2003)</h3>
                                <p className="text-gray-400 text-sm">Controls commercial email and extends to SMS marketing with consent and opt-out requirements</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Penalty Alert */}
                <Card className="bg-gradient-to-r from-[rgba(245,158,11,0.2)] to-[rgba(217,119,6,0.2)] border-[rgba(245,158,11,0.4)] mb-8">
                    <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">Penalty Structure</h3>
                        <div className="text-4xl font-bold text-yellow-400 text-center mb-4">Up to $46,517</div>
                        <p className="text-gray-300 text-center mb-4">Per violation for TCPA infractions. Multiply this by hundreds of calls and you could face millions in penalties.</p>
                        <p className="text-gray-300 text-center">
                            <strong>Recent Example:</strong> In 2023, a real estate company paid $3.2 million for making unsolicited calls to cell phones without consent.
                        </p>
                    </CardContent>
                </Card>

                {/* DNC Registry Requirements */}
                <Card className="bg-[rgba(30,41,59,0.8)] border-[rgba(71,85,105,0.3)] mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-[var(--primary-color)]">National DNC Registry Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300 mb-6">The National Do Not Call Registry is maintained by the FTC and must be checked regularly:</p>

                        <div className="bg-white rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">DNC Registry Compliance Checklist</h3>
                            {complianceChecks.map((check) => (
                                <div key={check.id} className="flex items-start mb-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                                    <input
                                        type="checkbox"
                                        id={check.id}
                                        checked={completedChecks.has(check.id)}
                                        onChange={() => toggleCheck(check.id)}
                                        className="mr-4 mt-1 transform scale-125"
                                    />
                                    <div>
                                        <label htmlFor={check.id} className="font-semibold text-gray-800 cursor-pointer">
                                            {check.label}
                                        </label>
                                        <p className="text-gray-600 text-sm mt-1">{check.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[rgba(34,197,94,0.1)] border border-green-500 rounded-xl p-6">
                            <h4 className="text-green-400 font-semibold mb-3">Established Business Relationship (EBR) Exception</h4>
                            <p className="text-gray-300">
                                You can call people on the DNC registry if you have an established business relationship within the last 18 months,
                                but you must honor any request to stop calling immediately.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Dialer Requirements */}
                <Card className="bg-[rgba(30,41,59,0.8)] border-[rgba(71,85,105,0.3)] mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-[var(--primary-color)]">Dialer Compliance Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300 mb-6">Automatic dialing systems have strict legal requirements under the TCPA:</p>

                        <div className="bg-[rgba(251,191,36,0.15)] border-2 border-yellow-400 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-yellow-400 mb-4">TCPA Dialer Rules</h3>
                            <div className="space-y-4">
                                {[
                                    { number: 1, title: "Prior Express Written Consent Required", desc: "Must have signed, written consent before using autodialers to call cell phones for marketing" },
                                    { number: 2, title: "Clear Opt-Out Mechanism", desc: "Every call must include instructions on how to stop future calls (usually 'Reply STOP')" },
                                    { number: 3, title: "Caller ID Requirements", desc: "Must display accurate caller identification and callback number" },
                                    { number: 4, title: "Time Restrictions", desc: "Calls only allowed 8 AM to 9 PM recipient's local time" },
                                    { number: 5, title: "Agent Availability", desc: "Live agent must be available within 2 seconds of recipient answering" }
                                ].map((rule) => (
                                    <div key={rule.number} className="flex items-start bg-[rgba(255,255,255,0.1)] p-4 rounded-lg">
                                        <div className="bg-yellow-400 text-gray-800 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                                            {rule.number}
                                        </div>
                                        <div>
                                            <strong className="text-white">{rule.title}</strong>
                                            <p className="text-gray-300 text-sm mt-1">{rule.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Time Restrictions */}
                <Card className="bg-[rgba(30,41,59,0.8)] border-[rgba(71,85,105,0.3)] mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-[var(--primary-color)]">Calling Time Restrictions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300 mb-6">Federal and state laws restrict when you can make telemarketing calls:</p>

                        <div className="bg-[rgba(99,102,241,0.15)] border-2 border-indigo-500 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-indigo-400 mb-4">Federal Time Restrictions</h3>
                            <p className="text-gray-300 mb-4">Calls permitted 8:00 AM - 9:00 PM in recipient's time zone</p>

                            <div className="grid grid-cols-7 gap-2 mb-4">
                                <div className="bg-indigo-500 text-white p-2 text-center rounded font-bold">Time</div>
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="bg-indigo-500 text-white p-2 text-center rounded font-bold">{day}</div>
                                ))}
                            </div>

                            {['6-8 AM', '8AM-9PM', '9PM-12AM'].map((time, timeIndex) => (
                                <div key={time} className="grid grid-cols-7 gap-2 mb-2">
                                    <div className="bg-[rgba(255,255,255,0.1)] p-2 text-center rounded text-sm">{time}</div>
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, dayIndex) => {
                                        const status = timeIndex === 1 ? 'allowed' : 'prohibited';
                                        return (
                                            <div key={day} className={`p-2 text-center rounded text-sm ${status === 'allowed'
                                                    ? 'bg-green-500/30 border border-green-500'
                                                    : 'bg-red-500/30 border border-red-500'
                                                }`}>
                                                {status === 'allowed' ? '✅' : '❌'}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Common Violations */}
                <Card className="bg-[rgba(30,41,59,0.8)] border-[rgba(71,85,105,0.3)] mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-[var(--primary-color)]">Common Violations to Avoid</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300 mb-6">Real-world scenarios that frequently result in penalties:</p>

                        <div className="space-y-6">
                            {violations.map((violation, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
                                        <h4 className="text-red-400 font-bold mb-2">❌ Violation</h4>
                                        <p className="text-gray-300 mb-2">{violation.violation}</p>
                                        <p className="text-red-400 font-bold">{violation.penalty}</p>
                                    </div>
                                    <div className="bg-green-500/20 border border-green-500 rounded-lg p-4">
                                        <h4 className="text-green-400 font-bold mb-2">✅ Solution</h4>
                                        <p className="text-gray-300">{violation.solution}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Compliance Checklists */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Daily Checklist */}
                    <Card className="bg-[rgba(30,41,59,0.8)] border-[rgba(71,85,105,0.3)]">
                        <CardHeader>
                            <CardTitle className="text-lg text-[var(--primary-color)] flex items-center">
                                <Clock className="w-5 h-5 mr-2" />
                                Daily Compliance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {dailyChecks.map((check) => (
                                    <div key={check.id} className="flex items-start p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                                        <input
                                            type="checkbox"
                                            id={check.id}
                                            checked={completedChecks.has(check.id)}
                                            onChange={() => toggleCheck(check.id)}
                                            className="mr-3 mt-1 transform scale-110"
                                        />
                                        <div>
                                            <label htmlFor={check.id} className="font-semibold text-gray-800 text-sm cursor-pointer">
                                                {check.label}
                                            </label>
                                            <p className="text-gray-600 text-xs mt-1">{check.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Monthly Checklist */}
                    <Card className="bg-[rgba(30,41,59,0.8)] border-[rgba(71,85,105,0.3)]">
                        <CardHeader>
                            <CardTitle className="text-lg text-[var(--primary-color)] flex items-center">
                                <Calendar className="w-5 h-5 mr-2" />
                                Monthly Review
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {monthlyChecks.map((check) => (
                                    <div key={check.id} className="flex items-start p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                                        <input
                                            type="checkbox"
                                            id={check.id}
                                            checked={completedChecks.has(check.id)}
                                            onChange={() => toggleCheck(check.id)}
                                            className="mr-3 mt-1 transform scale-110"
                                        />
                                        <div>
                                            <label htmlFor={check.id} className="font-semibold text-gray-800 text-sm cursor-pointer">
                                                {check.label}
                                            </label>
                                            <p className="text-gray-600 text-xs mt-1">{check.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Emergency Response */}
                    <Card className="bg-[rgba(30,41,59,0.8)] border-[rgba(71,85,105,0.3)]">
                        <CardHeader>
                            <CardTitle className="text-lg text-[var(--primary-color)] flex items-center">
                                <AlertCircle className="w-5 h-5 mr-2" />
                                Emergency Response
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🛑</div>
                                    <h4 className="font-bold text-white mb-2">STOP</h4>
                                    <p className="text-gray-300 text-sm">Immediately cease all calling/texting to the complainant</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-2">📋</div>
                                    <h4 className="font-bold text-white mb-2">DOCUMENT</h4>
                                    <p className="text-gray-300 text-sm">Gather all records related to the contact and consent</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-2">⚖️</div>
                                    <h4 className="font-bold text-white mb-2">CONSULT</h4>
                                    <p className="text-gray-300 text-sm">Contact a TCPA attorney immediately for guidance</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="text-center">
                    <Button
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 mr-4"
                        onClick={() => setShowComplianceModal(true)}
                    >
                        <Shield className="w-5 h-5 mr-2" />
                        Acknowledge Compliance
                    </Button>
                    <Button
                        variant="outline"
                        className="border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
                        onClick={() => window.open('https://www.donotcall.gov', '_blank')}
                    >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Visit DNC Registry
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DNCCompliance;
