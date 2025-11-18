import React, { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function GenericLeadProcessor() {
    const [step, setStep] = useState(1);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [mappings, setMappings] = useState({ firstName: "", lastName: "", phone: "", email: "", address: "" });
    const [processedLeads, setProcessedLeads] = useState([]);
    const [validLeads, setValidLeads] = useState([]);
    const [qualifiedLeads, setQualifiedLeads] = useState([]);
    const fileInputRef = useRef(null);

    const stats = useMemo(() => {
        const total = processedLeads.length;
        const valid = processedLeads.filter(l => l.isValid).length;
        return { total, valid, invalid: total - valid, quality: total ? Math.round((valid / total) * 100) : 0 };
    }, [processedLeads]);

    function parseCSV(text) {
        const lines = text.split(/\r?\n/).filter(l => l.trim());
        if (lines.length < 2) return { headers: [], rows: [] };
        const headers = parseCSVLine(lines[0]);
        const rows = lines.slice(1).map(line => parseCSVLine(line)).filter(arr => arr.length && arr.some(v => v.trim()));
        return { headers, rows };
    }

    function parseCSVLine(line) {
        const result = [];
        let current = "";
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === '"') {
                inQuotes = !inQuotes;
            } else if (ch === ',' && !inQuotes) {
                result.push(current.trim());
                current = "";
            } else {
                current += ch;
            }
        }
        result.push(current.trim());
        return result;
    }

    function onFileChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.name.toLowerCase().endsWith(".csv")) {
            toast.error("Please upload a CSV file");
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            const { headers: h, rows: r } = parseCSV(String(ev.target?.result || ""));
            setHeaders(h);
            setRows(r);
            setStep(1);
        };
        reader.readAsText(file);
    }

    function autoSelectMappings() {
        const map = { firstName: "first", lastName: "last", phone: "phone", email: "email", address: "address" };
        const next = { ...mappings };
        Object.entries(map).forEach(([key, token]) => {
            const idx = headers.findIndex(h => h.toLowerCase().includes(token));
            next[key] = idx >= 0 ? headers[idx] : "";
        });
        setMappings(next);
    }

    function processData() {
        const hIndex = (name) => headers.findIndex(h => h === name);
        const idx = {
            firstName: hIndex(mappings.firstName),
            lastName: hIndex(mappings.lastName),
            phone: hIndex(mappings.phone),
            email: hIndex(mappings.email),
            address: hIndex(mappings.address),
        };
        if (idx.firstName < 0 || idx.lastName < 0 || idx.phone < 0) {
            toast.error("Please map at least First Name, Last Name, and Phone columns");
            return;
        }
        const processed = rows.map((vals, i) => {
            const firstName = vals[idx.firstName] || "";
            const lastName = vals[idx.lastName] || "";
            const phone = vals[idx.phone] || "";
            const email = idx.email >= 0 ? (vals[idx.email] || "") : "";
            const address = idx.address >= 0 ? (vals[idx.address] || "") : "";
            const phoneValid = /^(\d{10})$/.test(phone.replace(/\D/g, "").slice(-10));
            const emailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            const nameValid = firstName.trim() && lastName.trim();
            return { id: i + 1, firstName, lastName, phone, email, address, selected: true, isValid: !!(phoneValid && emailValid && nameValid) };
        });
        setProcessedLeads(processed);
        setStep(2);
    }

    function proceedToDialer() {
        const chosen = processedLeads.filter(l => l.selected && l.isValid);
        if (!chosen.length) {
            toast.error("No valid leads selected.");
            return;
        }
        setValidLeads(chosen);
        setStep(3);
    }

    function simulateDialer() {
        // create interest subset
        const shuffled = [...validLeads].sort(() => 0.5 - Math.random());
        const interestedCount = Math.max(1, Math.round(shuffled.length * 0.15));
        const interested = shuffled.slice(0, interestedCount).map(l => ({
            ...l,
            interestLevel: Math.random() > 0.5 ? "High" : "Medium",
            bestCallTime: ["Morning", "Afternoon", "Evening"][Math.floor(Math.random() * 3)],
            priority: Math.random() > 0.6 ? "High" : "Medium",
            notes: ["Requested more info", "Interested in pricing", "Ready to schedule", "Follow up needed"][Math.floor(Math.random() * 4)],
            selectedForScheduling: true,
        }));
        setQualifiedLeads(interested);
        setStep(4);
    }

    function exportCSV(filename, rows) {
        const headers = Object.keys(rows[0] || {});
        const csv = [headers, ...rows.map(r => headers.map(h => String(r[h] ?? "")))]
            .map(line => line.map(f => `"${f.replace(/"/g, '""')}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text mb-2">📞 Lead Processing Pipeline</h1>
                <p className="text-slate-300">Upload contact data → Validate records → Auto-dial → Qualify leads → Schedule appointments</p>
            </div>

            {/* Steps */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                {["Upload Data", "Validate Records", "Auto Dialer", "Results", "Qualified"].map((label, i) => {
                    const n = i + 1; const active = step === n; const completed = step > n;
                    return (
                        <div key={n} className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm ${active ? "border-blue-500 bg-blue-500/10 text-white" : completed ? "border-emerald-500 bg-emerald-500/10 text-white" : "border-white/10 bg-white/10 text-slate-300"}`}>
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${active ? "bg-gradient-to-br from-blue-500 to-blue-700" : completed ? "bg-gradient-to-br from-emerald-500 to-emerald-700" : "bg-slate-600"}`}>{n}</span>
                            <span className={`${active || completed ? "text-white" : "text-slate-300"}`}>{label}</span>
                        </div>
                    );
                })}
            </div>

            {/* Step 1: Upload */}
            {step === 1 && (
                <div className="bg-white/10 border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">📤 Upload Contact Data</h2>
                    <div onClick={() => fileInputRef.current?.click()} className="text-center border-2 border-dashed border-white/30 rounded-xl p-10 cursor-pointer hover:border-blue-500 hover:bg-blue-500/5">
                        <div className="text-4xl mb-2 text-blue-300">📊</div>
                        <div className="mb-1">Drop your CSV file here or click to browse</div>
                        <div className="text-slate-300 text-sm">Supports CSV files with contact information</div>
                    </div>
                    <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={onFileChange} />
                    {!!headers.length && (
                        <div className="mt-6">
                            <h3 className="text-blue-400 font-semibold mb-3">Map Your Columns</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {[["First Name", "firstName"], ["Last Name", "lastName"], ["Phone", "phone"], ["Email", "email"], ["Address", "address"]].map(([label, key]) => (
                                    <div key={key} className="flex flex-col">
                                        <label className="text-slate-300 text-sm mb-1">{label} Column</label>
                                        <select value={mappings[key]} onChange={e => setMappings(s => ({ ...s, [key]: e.target.value }))} className="bg-white/10 border border-white/20 rounded px-3 py-2">
                                            <option value="">Select column...</option>
                                            {headers.map(h => (<option key={h} value={h}>{h}</option>))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-3 justify-center mt-4">
                                <button onClick={autoSelectMappings} className="px-4 py-2 rounded bg-emerald-600 text-white">Auto Map</button>
                                <button onClick={processData} className="px-4 py-2 rounded bg-blue-600 text-white">✅ Process Data</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Step 2: Validate */}
            {step === 2 && (
                <div className="bg-white/10 border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">✅ Validate Contact Records</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <Stat label="Total Records" value={stats.total} color="text-blue-300" />
                        <Stat label="Valid Records" value={stats.valid} color="text-emerald-400" />
                        <Stat label="Invalid Records" value={stats.invalid} color="text-red-400" />
                        <Stat label="Data Quality" value={`${stats.quality}%`} />
                    </div>
                    <div className="overflow-hidden rounded-lg border border-white/10">
                        <div className="grid grid-cols-6 gap-3 px-4 py-2 bg-white/10 text-slate-300 text-sm font-semibold sticky top-0">
                            <div>Select</div><div>Contact</div><div>Phone</div><div>Email</div><div>Address</div><div>Status</div>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            {processedLeads.map(l => (
                                <div key={l.id} className="grid grid-cols-6 gap-3 px-4 py-3 border-b border-white/10 items-center">
                                    <div><input type="checkbox" checked={l.selected} onChange={() => setProcessedLeads(prev => prev.map(p => p.id === l.id ? { ...p, selected: !p.selected } : p))} /></div>
                                    <div>{l.firstName} {l.lastName}</div>
                                    <div>{l.phone}</div>
                                    <div>{l.email || 'N/A'}</div>
                                    <div>{l.address || 'N/A'}</div>
                                    <div><span className={`px-3 py-1 rounded-full text-xs font-bold ${l.isValid ? "bg-emerald-900/40 text-emerald-300 border border-emerald-700/50" : "bg-red-900/40 text-red-300 border border-red-700/50"}`}>{l.isValid ? "Valid" : "Invalid"}</span></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-slate-300 text-sm">{processedLeads.filter(l => l.selected).length} selected • {processedLeads.filter(l => l.selected && l.isValid).length} valid for calling</div>
                        <div className="flex gap-2">
                            <button onClick={() => exportCSV('invalid_records.csv', processedLeads.filter(l => !l.isValid))} className="px-3 py-2 rounded bg-cyan-600 text-white">💾 Export Invalid</button>
                            <button onClick={proceedToDialer} className="px-3 py-2 rounded bg-blue-600 text-white">📞 Send Valid to Auto Dialer</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Dialer Ready */}
            {step === 3 && (
                <div className="bg-white/10 border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">📞 Auto Dialer Ready</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <Stat label="Valid Leads" value={validLeads.length} color="text-blue-300" />
                        <Stat label="Estimated Calls" value={validLeads.length * 3} color="text-indigo-300" />
                        <Stat label="Hours Campaign" value={Math.ceil(validLeads.length / 100)} color="text-emerald-300" />
                        <Stat label="Expected Answers" value={Math.round(validLeads.length * 0.3)} color="text-cyan-300" />
                    </div>
                    <div className="flex justify-center gap-3">
                        <button onClick={() => exportCSV('valid_leads.csv', validLeads)} className="px-4 py-2 rounded bg-cyan-600 text-white">💾 Export Valid Leads</button>
                        <button onClick={simulateDialer} className="px-4 py-2 rounded bg-blue-600 text-white">🎮 Start Auto Dialer</button>
                    </div>
                </div>
            )}

            {/* Step 4: Results + Qualified */}
            {step === 4 && (
                <div className="space-y-6">
                    <div className="bg-white/10 border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-4">📈 Campaign Results</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            <Stat label="Calls Made" value={Math.round(validLeads.length * 2.5)} color="text-blue-300" />
                            <Stat label="Answered" value={Math.round(validLeads.length * 0.75)} color="text-emerald-300" />
                            <Stat label="Interested" value={qualifiedLeads.length} color="text-green-300" />
                            <Stat label="Want Appointments" value={Math.round(qualifiedLeads.length * 0.6)} color="text-cyan-300" />
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => exportCSV('call_results.csv', validLeads)} className="px-4 py-2 rounded bg-cyan-600 text-white">💾 Export Call Results</button>
                        </div>
                    </div>
                    <div className="bg-white/10 border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-4">📅 Qualified Leads - Ready to Schedule</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            <Stat label="Qualified Leads" value={qualifiedLeads.length} color="text-blue-300" />
                            <Stat label="High Priority" value={qualifiedLeads.filter(l => l.priority === 'High').length} color="text-emerald-300" />
                            <Stat label="Medium Priority" value={qualifiedLeads.filter(l => l.priority !== 'High').length} color="text-yellow-300" />
                            <Stat label="Avg Callback Time" value="24h" />
                        </div>
                        <div className="overflow-hidden rounded-lg border border-white/10">
                            <div className="grid grid-cols-6 gap-3 px-4 py-2 bg-white/10 text-slate-300 text-sm font-semibold sticky top-0">
                                <div>Select</div><div>Contact</div><div>Phone</div><div>Interest</div><div>Best Time</div><div>Priority</div>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {qualifiedLeads.map(l => (
                                    <div key={l.id} className="grid grid-cols-6 gap-3 px-4 py-3 border-b border-white/10 items-center">
                                        <div><input type="checkbox" checked={l.selectedForScheduling} onChange={() => setQualifiedLeads(prev => prev.map(p => p.id === l.id ? { ...p, selectedForScheduling: !p.selectedForScheduling } : p))} /></div>
                                        <div>{l.firstName} {l.lastName}<br /><small className="text-slate-300">{l.notes}</small></div>
                                        <div>{l.phone}</div>
                                        <div><span className={`px-3 py-1 rounded-full text-xs font-bold ${l.interestLevel === 'High' ? "bg-emerald-900/40 text-emerald-300 border border-emerald-700/50" : "bg-red-900/40 text-red-300 border border-red-700/50"}`}>{l.interestLevel}</span></div>
                                        <div>{l.bestCallTime}</div>
                                        <div><span className={`px-3 py-1 rounded-full text-xs font-bold ${l.priority === 'High' ? "bg-emerald-900/40 text-emerald-300 border border-emerald-700/50" : "bg-red-900/40 text-red-300 border border-red-700/50"}`}>{l.priority}</span></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <div className="text-slate-300 text-sm">{qualifiedLeads.filter(l => l.selectedForScheduling).length} leads selected for scheduling</div>
                            <div className="flex gap-2">
                                <button onClick={() => exportCSV('qualified_leads.csv', qualifiedLeads)} className="px-3 py-2 rounded bg-cyan-600 text-white">💾 Export Qualified</button>
                                <button className="px-3 py-2 rounded bg-emerald-600 text-white">📅 Send to Calendar System</button>
                                <button className="px-3 py-2 rounded bg-blue-600 text-white">📞 Start Scheduling Calls</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Stat({ label, value, color }) {
    return (
        <div className="bg-white/10 rounded-lg p-4 text-center border border-white/10">
            <div className={`text-2xl font-bold mb-1 ${color || "text-white"}`}>{value}</div>
            <div className="text-slate-300 text-sm">{label}</div>
        </div>
    );
}


