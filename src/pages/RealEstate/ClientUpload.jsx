import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
    Upload,
    Users,
    Building,
    FileText,
    Download,
    Mail,
    Phone,
    CheckCircle,
    AlertCircle,
    ExternalLink,
    Plus,
    Search,
    Filter,
    Eye,
    Edit,
    Trash2,
    Star,
    Clock,
    Calendar,
    MapPin,
    DollarSign,
    Home,
    UserPlus,
    FileCheck,
    FileX,
    ArrowRight,
    Copy,
    Share2,
    PhoneCall,
    PhoneOff
} from 'lucide-react';
import { Button } from '../../components/RealEstate/ui/Button';
import { Badge } from '../../components/RealEstate/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/RealEstate/ui/Card';
import DNCComplianceModal from '../../components/RealEstate/DNCComplianceModal';
import logo from '../../assets/logo/logo-1.png';

const ClientUpload = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [importResults, setImportResults] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // COMMENTED OUT OLD DIALER CODE - REPLACED WITH NEW MAPPING INTERFACE
    // const [showDialer, setShowDialer] = useState(false);
    // const [selectedContact, setSelectedContact] = useState(null);
    // const [dialerNumber, setDialerNumber] = useState('');
    // const [dialerNumber2, setDialerNumber2] = useState('');
    // const [dialerNumber3, setDialerNumber3] = useState('');
    // const [dialerEmail, setDialerEmail] = useState('');
    // const [dialerStatus, setDialerStatus] = useState('Ready to dial');
    // const [isInCall, setIsInCall] = useState(false);
    // const [callNotes, setCallNotes] = useState('');
    // const [selectedTags, setSelectedTags] = useState([]);
    // const [showDNCModal, setShowDNCModal] = useState(false);
    // const [pendingCall, setPendingCall] = useState(null);

    // KEEP THESE STATE VARIABLES FOR THE COMMENTED OUT DIALER INTERFACE
    const [selectedContact, setSelectedContact] = useState(null);
    const [dialerNumber, setDialerNumber] = useState('');
    const [dialerNumber2, setDialerNumber2] = useState('');
    const [dialerNumber3, setDialerNumber3] = useState('');
    const [dialerEmail, setDialerEmail] = useState('');
    const [activePhoneNumber, setActivePhoneNumber] = useState(1);
    const [dialerStatus, setDialerStatus] = useState('Ready to dial');
    const [isInCall, setIsInCall] = useState(false);
    const [callNotes, setCallNotes] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    // NEW STATE FOR COLUMN MAPPING INTERFACE
    const [csvData, setCsvData] = useState([]);
    const [columnHeaders, setColumnHeaders] = useState([]);
    const [showMapping, setShowMapping] = useState(false);
    const [columnMappings, setColumnMappings] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        phone2: '', // Optional second phone
        phone3: '', // Optional third phone
        email: '',
        address: ''
    });
    const [processedLeads, setProcessedLeads] = useState([]);
    const [showValidation, setShowValidation] = useState(false);
    const [showDialer, setShowDialer] = useState(false);
    const [csvPreview, setCsvPreview] = useState('');

    // DIALER CAMPAIGN STATE
    const [contactStatuses, setContactStatuses] = useState(new Map()); // Track status of each contact
    const [calledToday, setCalledToday] = useState(0);
    const [convertedCount, setConvertedCount] = useState(0);
    const [currentContactIndex, setCurrentContactIndex] = useState(0);

    // DNC COMPLIANCE STATE
    const [showDNCModal, setShowDNCModal] = useState(false);
    const [pendingCall, setPendingCall] = useState(null);

    // Contact data from CSV upload
    const [contacts, setContacts] = useState([]);

    const tags = ['No Answer', 'Voicemail', 'Interested', 'Not Interested', 'Callback', 'Wrong Number'];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    // UPDATED CSV PARSING FOR NEW MAPPING INTERFACE
    const parseCSV = (csvText) => {
        const lines = csvText.split('\n').filter(line => line.trim());

        if (lines.length < 2) {
            throw new Error('CSV file must have at least a header row and one data row.');
        }

        // Parse headers
        const headers = parseCSVLine(lines[0]);
        setColumnHeaders(headers);

        // Parse data
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const values = parseCSVLine(lines[i]);
            if (values.length > 0 && values.some(v => v.trim())) {
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });
                data.push(row);
            }
        }

        setCsvData(data);

        // Set preview text (first 500 characters)
        setCsvPreview(csvText.slice(0, 500));

        return { headers, data };
    };

    const parseCSVLine = (line) => {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"' && (i === 0 || line[i - 1] === ',')) {
                inQuotes = true;
            } else if (char === '"' && inQuotes && (i === line.length - 1 || line[i + 1] === ',')) {
                inQuotes = false;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }

        result.push(current.trim());
        return result;
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.match(/\.(csv|xlsx|xls)$/)) {
            toast.error('Please upload a CSV or Excel file only');
            return;
        }

        setUploadedFile(file);

        // Read and parse CSV file
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csvText = e.target.result;
                parseCSV(csvText);
                // Show mapping interface instead of direct import
                setShowMapping(true);
            } catch (error) {
                toast.error('Error reading file: ' + error.message);
            }
        };
        reader.readAsText(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    };

    // NEW MAPPING INTERFACE FUNCTIONS
    const handleColumnMappingChange = (field, value) => {
        setColumnMappings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const processMappedData = () => {
        // Validate required mappings
        const requiredMappings = ['firstName', 'lastName', 'phone'];
        const missingMappings = requiredMappings.filter(key => !columnMappings[key]);

        if (missingMappings.length > 0) {
            toast.error('Please map at least First Name, Last Name, and Phone columns');
            return;
        }

        // Process data with mappings and validation
        const processed = csvData.map((row, index) => {
            const validation = validateLead(row, columnMappings);
            return {
                id: index + 1,
                firstName: row[columnMappings.firstName] || '',
                lastName: row[columnMappings.lastName] || '',
                phone: validation.cleanPhone || row[columnMappings.phone] || '',
                originalPhone: validation.originalPhone,
                phone2: row[columnMappings.phone2] || '', // Optional second phone
                phone3: row[columnMappings.phone3] || '', // Optional third phone
                email: row[columnMappings.email] || '',
                address: row[columnMappings.address] || '',
                selected: true,
                isValid: validation.isValid,
                validation: validation,
                isDuplicate: false // Will be set below
            };
        });

        // Remove duplicates based on phone numbers
        const phoneMap = new Map();
        const duplicatesRemoved = [];
        const duplicates = [];

        processed.forEach(lead => {
            const phoneKey = lead.phone;
            if (phoneKey && phoneKey.length === 10) {
                if (phoneMap.has(phoneKey)) {
                    // Mark as duplicate
                    lead.isDuplicate = true;
                    duplicates.push(lead);
                } else {
                    phoneMap.set(phoneKey, true);
                    duplicatesRemoved.push(lead);
                }
            } else {
                // Keep invalid phone numbers for review
                duplicatesRemoved.push(lead);
            }
        });

        // Update IDs after duplicate removal
        const finalProcessed = duplicatesRemoved.map((lead, index) => ({
            ...lead,
            id: index + 1
        }));

        setProcessedLeads(finalProcessed);
        setShowMapping(false);
        setShowValidation(true);

        // Show summary of processing
        const validCount = finalProcessed.filter(lead => lead.isValid && !lead.isDuplicate).length;
        const invalidCount = finalProcessed.filter(lead => !lead.isValid).length;
        const duplicateCount = duplicates.length;

        if (duplicateCount > 0 || invalidCount > 0) {
            toast.success(`Processing Complete! Valid Records: ${validCount}, Invalid Phone Numbers: ${invalidCount}, Duplicates Removed: ${duplicateCount}. Total Processed: ${finalProcessed.length}`, { duration: 5000 });
        } else {
            toast.success(`Processing Complete! ${validCount} valid records processed.`);
        }
    };

    const validateLead = (row, mappings) => {
        const phone = row[mappings.phone] || '';
        const email = row[mappings.email] || '';
        const firstName = row[mappings.firstName] || '';
        const lastName = row[mappings.lastName] || '';

        // Enhanced phone validation - must be exactly 10 digits
        const cleanPhone = phone.replace(/\D/g, '');
        const phoneValid = /^[0-9]{10}$/.test(cleanPhone);

        // Email validation (basic)
        const emailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        // Name validation
        const nameValid = firstName.trim().length > 0 && lastName.trim().length > 0;

        return {
            isValid: phoneValid && emailValid && nameValid,
            phoneValid,
            emailValid,
            nameValid,
            cleanPhone: cleanPhone,
            originalPhone: phone
        };
    };

    const resetUpload = () => {
        setCsvData([]);
        setColumnHeaders([]);
        setColumnMappings({
            firstName: '',
            lastName: '',
            phone: '',
            phone2: '',
            phone3: '',
            email: '',
            address: ''
        });
        setProcessedLeads([]);
        setShowMapping(false);
        setShowValidation(false);
        setUploadedFile(null);
    };

    // PLACEHOLDER FUNCTIONS REMOVED - REAL FUNCTIONS UNCOMMENTED BELOW

    // COMMENTED OUT OLD DIALER FUNCTIONS
    // const uploadFile = () => {
    //     // Show actual number of contacts imported
    //     setImportResults(contacts.length);
    //     setShowSuccess(true);
    // };

    // const reviewContacts = () => {
    //     alert('Redirecting to contact review page...');
    // };

    // const startDialing = () => {
    //     setShowDialer(true);
    //     if (contacts.length > 0) {
    //         setSelectedContact(contacts[0]);
    //         setDialerNumber(contacts[0].phone);
    //     }
    // };

    // DIALER FUNCTIONS - UNCOMMENTED FOR NEW DIALER INTERFACE
    const selectContact = (contact) => {
        setSelectedContact(contact);
        setDialerNumber(contact.phone || '');
        setDialerNumber2(contact.phone2 || '');
        setDialerNumber3(contact.phone3 || '');
        setDialerEmail(contact.email || '');
        setCallNotes('');
        setSelectedTags([]);
        setActivePhoneNumber(1);
        setDialerStatus('Ready to dial');
        setIsInCall(false);
    };

    const dialKey = (key) => {
        if (isInCall) {
            // Send DTMF tone during call
            setDialerStatus(`Pressed ${key}`);
            setTimeout(() => {
                setDialerStatus('In call...');
            }, 1000);
        } else {
            // Add to dialer display when not in call
            if (activePhoneNumber === 1) {
                setDialerNumber(prev => prev + key);
            } else if (activePhoneNumber === 2) {
                setDialerNumber2(prev => prev + key);
            } else if (activePhoneNumber === 3) {
                setDialerNumber3(prev => prev + key);
            }
        }
    };

    const makeCall = () => {
        if (isInCall || !selectedContact) return;

        // Show DNC compliance modal before making call
        setPendingCall({
            contact: selectedContact,
            phoneNumber: activePhoneNumber === 1 ? dialerNumber : activePhoneNumber === 2 ? dialerNumber2 : dialerNumber3
        });
        setShowDNCModal(true);
    };

    // DNC Compliance handlers
    const handleDNCComplianceAccept = () => {
        if (pendingCall) {
            // Proceed with actual call after DNC compliance acceptance
            setIsInCall(true);
            setDialerStatus('Calling...');

            // Update called today counter
            setCalledToday(prev => prev + 1);

            // Mark contact as called
            const newStatuses = new Map(contactStatuses);
            newStatuses.set(pendingCall.contact.id, {
                status: 'Called',
                timestamp: new Date().toISOString(),
                notes: callNotes,
                tags: selectedTags
            });
            setContactStatuses(newStatuses);

            // Simulate call connection after 2 seconds
            setTimeout(() => {
                setDialerStatus('Connected - In call...');
            }, 2000);
        }
        setPendingCall(null);
        setShowDNCModal(false);
    };

    const handleDNCComplianceClose = () => {
        setShowDNCModal(false);
        setPendingCall(null);
    };

    const hangupCall = () => {
        if (!isInCall) return;

        setIsInCall(false);
        setDialerStatus('Call ended');

        setTimeout(() => {
            setDialerStatus('Ready to dial');
        }, 2000);
    };

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const convertToClient = () => {
        if (!selectedContact) return;

        // Mark contact as converted to client
        const newStatuses = new Map(contactStatuses);
        newStatuses.set(selectedContact.id, {
            status: 'Converted to Client',
            timestamp: new Date().toISOString(),
            notes: callNotes,
            tags: selectedTags,
            isClient: true
        });
        setContactStatuses(newStatuses);

        // Update conversion count
        setConvertedCount(prev => prev + 1);

        // Show success message
        toast.success(`Successfully converted ${selectedContact.firstName} ${selectedContact.lastName} to client! Tags: ${selectedTags.join(', ') || 'None'}, Notes: ${callNotes || 'None'}`, { duration: 4000 });

        // Move to next contact
        moveToNextContact();
    };

    const skipContact = () => {
        if (!selectedContact) return;

        // Mark contact as skipped
        const newStatuses = new Map(contactStatuses);
        newStatuses.set(selectedContact.id, {
            status: 'Skipped',
            timestamp: new Date().toISOString(),
            notes: callNotes,
            tags: selectedTags
        });
        setContactStatuses(newStatuses);

        // Move to next contact
        moveToNextContact();
    };

    const moveToNextContact = () => {
        const validLeads = processedLeads.filter(lead => lead.isValid && !lead.isDuplicate);
        const nextIndex = currentContactIndex + 1;

        if (nextIndex < validLeads.length) {
            setCurrentContactIndex(nextIndex);
            selectContact(validLeads[nextIndex]);
        } else {
            // All contacts processed
            setSelectedContact(null);
            setDialerNumber('');
            setDialerNumber2('');
            setDialerEmail('');
            setCallNotes('');
            setSelectedTags([]);
            setDialerStatus('Campaign Complete!');
            toast.success(`Campaign Complete! All contacts have been processed. Total Contacts: ${validLeads.length}, Called Today: ${calledToday}, Converted to Clients: ${convertedCount}`, { duration: 5000 });
        }
    };

    // const showUpgrade = () => {
    //     alert('Redirecting to upgrade page...');
    // };

    return (
        <div className="min-h-screen bg-[var(--dark-bg)] p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        📋 Client Import
                    </h1>
                    <p className="text-xl text-gray-400 mb-4">Prepare and upload your contact lists</p>
                    <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 text-sm font-semibold">
                        Starter Plan
                    </Badge>
                </div>

                {/* Main Card */}
                <Card className="bg-[rgba(30,41,59,0.8)] border-[rgba(71,85,105,0.3)] backdrop-blur-sm mb-8">
                    <CardContent className="p-12">
                        <h2 className="text-center mb-8 text-[#60a5fa] text-2xl font-bold">
                            Choose Your Lead Source
                        </h2>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div
                                className={`bg-[rgba(71,85,105,0.2)] border border-[rgba(71,85,105,0.3)] rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-[rgba(96,165,250,0.5)] hover:-translate-y-1 ${selectedOption === 'propstream' ? 'border-[#60a5fa] bg-[rgba(96,165,250,0.1)]' : ''
                                    }`}
                                onClick={() => handleOptionSelect('propstream')}
                            >
                                <div className="text-4xl mb-4">🏠</div>
                                <div className="text-lg font-bold text-white mb-2">Need Property Data</div>
                                <div className="text-gray-400 text-sm leading-relaxed">
                                    I need property owner lists and contact information
                                </div>
                            </div>

                            <div
                                className={`bg-[rgba(71,85,105,0.2)] border border-[rgba(71,85,105,0.3)] rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-[rgba(96,165,250,0.5)] hover:-translate-y-1 ${selectedOption === 'skipTrace' ? 'border-[#60a5fa] bg-[rgba(96,165,250,0.1)]' : ''
                                    }`}
                                onClick={() => handleOptionSelect('skipTrace')}
                            >
                                <div className="text-4xl mb-4">🔍</div>
                                <div className="text-lg font-bold text-white mb-2">Need Contact Info</div>
                                <div className="text-gray-400 text-sm leading-relaxed">
                                    I have names/addresses but need phone numbers and emails
                                </div>
                            </div>

                            <div
                                className={`bg-[rgba(71,85,105,0.2)] border border-[rgba(71,85,105,0.3)] rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-[rgba(96,165,250,0.5)] hover:-translate-y-1 ${selectedOption === 'upload' ? 'border-[#60a5fa] bg-[rgba(96,165,250,0.1)]' : ''
                                    }`}
                                onClick={() => handleOptionSelect('upload')}
                            >
                                <div className="text-4xl mb-4">📁</div>
                                <div className="text-lg font-bold text-white mb-2">Upload Existing List</div>
                                <div className="text-gray-400 text-sm leading-relaxed">
                                    I already have a formatted contact list ready
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* PropStream Section */}
                {selectedOption === 'propstream' && (
                    <Card className="bg-gradient-to-r from-[rgba(34,197,94,0.1)] to-[rgba(22,163,74,0.1)] border-[rgba(34,197,94,0.3)] mb-8">
                        <CardContent className="p-8">
                            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 text-sm font-semibold mb-4">
                                🏠 Property Data Sources
                            </Badge>

                            <h3 className="text-[#22c55e] text-xl font-bold mb-4">Get Property Owner Data for Skip Tracing</h3>

                            <p className="text-gray-400 mb-6 leading-relaxed">
                                You can use any list provider you want, but we recommend PropStream if you need property owner lists pulled to get skip traced. PropStream is one of the leading property databases for real estate investors.
                            </p>

                            <div className="bg-[rgba(30,41,59,0.6)] rounded-lg p-6 mb-6">
                                <h4 className="text-[#60a5fa] font-semibold mb-4">Recommended Process:</h4>
                                <ol className="text-gray-400 leading-relaxed ml-6 space-y-2 list-decimal">
                                    <li>Use PropStream (or any list provider) to get property owner data</li>
                                    <li>Export your list with names and addresses</li>
                                    <li>Upload to SkipMatrix (see option 2) to get phone numbers</li>
                                    <li>Download the completed file with contact info</li>
                                    <li>Upload the final file here to start dialing</li>
                                </ol>
                            </div>

                            <div className="bg-[rgba(96,165,250,0.1)] border border-[rgba(96,165,250,0.3)] rounded-lg p-6 mb-6">
                                <div className="text-2xl text-[#60a5fa] mb-2">💡</div>
                                <p className="text-gray-400 mb-2">
                                    <strong>Your Choice:</strong> Use any list provider
                                </p>
                                <p className="text-gray-400 text-sm">
                                    PropStream is just our recommendation. You can use any property data source, lead list provider, or list you already have.
                                </p>
                            </div>

                            <Button
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3"
                                onClick={() => window.open('https://propstream.com', '_blank')}
                            >
                                🏠 Visit PropStream (Recommended)
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* SkipMatrix Section */}
                {selectedOption === 'skipTrace' && (
                    <Card className="bg-gradient-to-r from-[rgba(245,158,11,0.1)] to-[rgba(217,119,6,0.1)] border-[rgba(245,158,11,0.3)] mb-8">
                        <CardContent className="p-8">
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 text-sm font-semibold mb-4">
                                💰 Partner Service
                            </Badge>

                            <h3 className="text-[#f59e0b] text-xl font-bold mb-4">Get Contact Information with SkipMatrix</h3>

                            <p className="text-gray-400 mb-6 leading-relaxed">
                                SkipMatrix is a professional skip tracing service that finds phone numbers and email addresses for your leads.
                                As a STACKED partner, you get access to our exclusive discount code.
                            </p>

                            <div className="bg-[rgba(30,41,59,0.8)] border-2 border-[#f59e0b] rounded-lg p-6 text-center mb-6">
                                <div className="text-gray-400 text-sm mb-2">Use Discount Code:</div>
                                <div className="text-2xl font-bold text-[#f59e0b] tracking-widest mb-2">STACKED</div>
                                <div className="text-gray-400 text-sm">Save on every lookup</div>
                            </div>

                            <div className="bg-[rgba(30,41,59,0.6)] rounded-lg p-6 mb-6">
                                <h4 className="text-[#60a5fa] font-semibold mb-4">Manual Skip Trace Process:</h4>
                                <ol className="text-gray-400 leading-relaxed ml-6 space-y-2 list-decimal">
                                    <li>Click the link below to visit SkipMatrix</li>
                                    <li>Sign up and use code "STACKED" for discount</li>
                                    <li>Manually upload your lead list for skip tracing</li>
                                    <li>Wait for results (typically within a few hours or less)</li>
                                    <li>Download the enhanced file with phone numbers</li>
                                    <li>Come back here and manually upload the completed file</li>
                                </ol>
                            </div>

                            <div className="bg-[rgba(96,165,250,0.1)] border border-[rgba(96,165,250,0.3)] rounded-lg p-6 mb-6">
                                <div className="text-2xl text-[#60a5fa] mb-2">⚠️</div>
                                <p className="text-gray-400 mb-2">
                                    <strong>Starter Plan:</strong> You handle the skip tracing
                                </p>
                                <p className="text-gray-400 text-sm">
                                    We don't automatically skip trace your data. You must upload to SkipMatrix, wait for results, then upload the completed file back here.
                                </p>
                            </div>

                            <Button
                                className="w-full bg-transparent border-2 border-[#f59e0b] text-[#f59e0b] hover:bg-[rgba(245,158,11,0.1)] font-semibold py-3"
                                onClick={() => window.open('https://skipmatrix.com/signup', '_blank')}
                            >
                                🔗 Visit SkipMatrix
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* COMMENTED OUT OLD UPLOAD SECTION - REPLACED WITH NEW HTML-BASED DESIGN */}
                {/* Upload Section */}
                {/* {selectedOption === 'upload' && (
                    <Card className="bg-[rgba(71,85,105,0.2)] border-[rgba(71,85,105,0.3)] mb-8">
                        <CardContent className="p-8">
                            <h3 className="text-[#34d399] text-xl font-bold mb-4 text-center">📁 Upload Your Formatted List</h3>

                            <p className="text-gray-400 text-center mb-6">
                                Upload your properly formatted CSV or Excel file with contact information
                            </p>

                            <div className="bg-[rgba(30,41,59,0.6)] border border-red-500/30 rounded-lg p-6 mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="text-red-400 font-semibold">Required Format - Your CSV must include these columns:</div>
                                </div>
                                <div className="space-y-2 text-sm text-gray-300">
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                        <span><code className="bg-gray-800 px-2 py-1 rounded">first_name</code> - Contact's first name</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                        <span><code className="bg-gray-800 px-2 py-1 rounded">last_name</code> - Contact's last name</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                        <span><code className="bg-gray-800 px-2 py-1 rounded">phone</code> - Phone number in format: 1234567890 (no dashes or spaces)</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                        <span><code className="bg-gray-800 px-2 py-1 rounded">email</code> - Email address (if available)</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                                        <span><code className="bg-gray-800 px-2 py-1 rounded">address</code> - Full street address (optional but recommended)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[rgba(96,165,250,0.1)] border border-blue-500/30 rounded-lg p-6 mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-yellow-400 text-xl">⚠️</div>
                                    <div className="text-white font-semibold">Starter Plan Import: Your data responsibility</div>
                                </div>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span>Format your CSV with exact column names above</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span>Remove duplicates before uploading</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span>Ensure phone numbers are dialable (10 digits)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span>We import exactly what you provide - no cleaning or validation</span>
                                    </li>
                                </ul>
                            </div>

                            <div
                                className={`border-2 border-dashed border-blue-500/50 rounded-lg p-12 text-center cursor-pointer transition-all duration-300 mb-6 ${isDragging ? 'border-blue-400 bg-blue-500/10' : 'hover:border-blue-400 hover:bg-blue-500/5'
                                    }`}
                                onClick={() => document.getElementById('fileInput').click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="text-6xl mb-4 text-gray-400">📄</div>
                                <h3 className="text-xl font-bold text-white mb-2">Click to Upload Formatted File</h3>
                                <p className="text-gray-400">CSV or Excel files only</p>
                            </div>

                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                accept=".csv,.xlsx,.xls"
                                onChange={handleFileInput}
                            />

                            {uploadedFile && !showMapping && (
                                <div className="bg-[rgba(30,41,59,0.6)] rounded-lg p-4 mb-6">
                                    <div className="font-semibold text-[#34d399] mb-2">
                                        📄 {uploadedFile.name}
                                    </div>
                                    <div className="text-gray-400 text-sm mb-2">
                                        Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </div>
                                    <div className="text-[#f59e0b] text-sm leading-relaxed">
                                        ⚠️ Starter Plan: Your file will be imported exactly as-is. Make sure it follows the required format above.
                                    </div>
                                    <Button
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 mt-4"
                                        onClick={() => setShowMapping(true)}
                                    >
                                        📞 Map Columns & Import
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )} */}

                {/* EXACT HTML-BASED UPLOAD INTERFACE - MATCHING PUBLIC/HTML FILE */}
                {selectedOption === 'upload' && (
                    <div className="mb-8">
                        {/* Header Section - Exact match to HTML */}
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-3">
                                📞 Lead Processing Pipeline
                            </h1>
                            <p className="text-gray-400 text-lg max-w-4xl mx-auto">
                                Upload contact data → Validate records → Auto-dial → Qualify interested leads → Schedule appointments
                            </p>
                        </div>

                        {/* Pipeline Steps - Exact match to HTML */}
                        <div className="flex justify-center gap-4 mb-10 flex-wrap">
                            <div className="flex items-center gap-3 px-5 py-3 bg-blue-500/10 border-2 border-blue-500 rounded-full">
                                <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                                <div className="text-white font-semibold">Upload Data</div>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 bg-white/8 border-2 border-white/10 rounded-full">
                                <div className="w-7 h-7 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                                <div className="text-gray-400 font-semibold">Validate Records</div>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 bg-white/8 border-2 border-white/10 rounded-full">
                                <div className="w-7 h-7 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                                <div className="text-gray-400 font-semibold">Dialer</div>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 bg-white/8 border-2 border-white/10 rounded-full">
                                <div className="w-7 h-7 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                                <div className="text-gray-400 font-semibold">Qualified Leads</div>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 bg-white/8 border-2 border-white/10 rounded-full">
                                <div className="w-7 h-7 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                                <div className="text-gray-400 font-semibold">Schedule Appointments</div>
                            </div>
                        </div>

                        {/* Main Content Section - Exact match to HTML */}
                        <div className="max-w-5xl mx-auto">
                            <div className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    📤 Upload Contact Data
                                </h2>

                                {/* Upload Area - Exact match to HTML */}
                                <div
                                    className="border-2 border-dashed border-white/30 rounded-xl p-10 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/5"
                                    onClick={() => document.getElementById('fileInput').click()}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept=".csv"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                    <div className="text-5xl mb-4 text-blue-400">📊</div>
                                    <div className="text-lg font-medium text-white mb-2">Drop your CSV file here or click to browse</div>
                                    <div className="text-gray-400">Supports CSV files with contact information</div>
                                </div>

                                {/* File Preview - Exact match to HTML */}
                                {uploadedFile && (
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="font-semibold text-blue-400">{uploadedFile.name}</div>
                                            <div className="text-gray-400 text-sm">{formatFileSize(uploadedFile.size)}</div>
                                        </div>
                                        <div className="text-xs text-gray-500 bg-black/20 rounded p-2 font-mono">
                                            {csvPreview}
                                        </div>
                                    </div>
                                )}

                                {/* Column Mapping - Exact match to HTML */}
                                {/* {showMapping && (
                                    <div className="mt-6">
                                        <h3 className="text-blue-400 text-lg font-semibold mb-4">Map Your Columns</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">First Name Column:</label>
                                                <select
                                                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
                                                    value={columnMappings.firstName}
                                                    onChange={(e) => handleColumnMappingChange('firstName', e.target.value)}
                                                >
                                                    <option value="">Select column...</option>
                                                    {columnHeaders.map(header => (
                                                        <option key={header} value={header}>{header}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">Last Name Column:</label>
                                                <select
                                                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
                                                    value={columnMappings.lastName}
                                                    onChange={(e) => handleColumnMappingChange('lastName', e.target.value)}
                                                >
                                                    <option value="">Select column...</option>
                                                    {columnHeaders.map(header => (
                                                        <option key={header} value={header}>{header}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">Phone Column:</label>
                                                <select
                                                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
                                                    value={columnMappings.phone}
                                                    onChange={(e) => handleColumnMappingChange('phone', e.target.value)}
                                                >
                                                    <option value="">Select column...</option>
                                                    {columnHeaders.map(header => (
                                                        <option key={header} value={header}>{header}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">Email Column:</label>
                                                <select
                                                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
                                                    value={columnMappings.email}
                                                    onChange={(e) => handleColumnMappingChange('email', e.target.value)}
                                                >
                                                    <option value="">Select column...</option>
                                                    {columnHeaders.map(header => (
                                                        <option key={header} value={header}>{header}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">Address Column:</label>
                                                <select
                                                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
                                                    value={columnMappings.address}
                                                    onChange={(e) => handleColumnMappingChange('address', e.target.value)}
                                                >
                                                    <option value="">Select column...</option>
                                                    {columnHeaders.map(header => (
                                                        <option key={header} value={header}>{header}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 justify-center">
                                            <Button
                                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6"
                                                onClick={resetUpload}
                                            >
                                                🔄 Upload Different File
                                            </Button>
                                            <Button
                                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6"
                                                onClick={processMappedData}
                                            >
                                                ✅ Process Data
                                            </Button>
                                        </div>
                                    </div>
                                )} */}

                                {/* Initial Buttons - Exact match to HTML */}
                                {!uploadedFile && (
                                    <div className="flex gap-4 justify-center mt-6">
                                        <Button
                                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6"
                                            onClick={() => {
                                                // Load sample data functionality
                                                const sampleCSV = `first_name,last_name,phone,phone2,phone3,email,address
John,Smith,5551234567,5559998888,5557776666,john.smith@email.com,123 Main St
Jane,Doe,5559876543,5551112233,5554445566,jane.doe@email.com,456 Oak Ave
Bob,Johnson,5551112222,5553334444,5552223333,bob.johnson@email.com,789 Pine Rd`;
                                                // Simulate file upload with sample data
                                                const fakeFile = new File([sampleCSV], 'sample_leads.csv', { type: 'text/csv' });
                                                setUploadedFile(fakeFile);
                                                parseCSV(sampleCSV);
                                                setShowMapping(true);
                                            }}
                                        >
                                            📋 Load Sample Data
                                        </Button>
                                        <Button
                                            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-3 px-6"
                                            onClick={() => alert('Data Requirements:\n\nRequired Columns:\n• First Name - Contact\'s first name\n• Last Name - Contact\'s last name\n• Phone - Valid US phone number\n\nOptional Columns:\n• Email - Contact\'s email address\n• Address - Contact\'s mailing address')}
                                        >
                                            ❓ Data Requirements
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* NEW COLUMN MAPPING INTERFACE */}
                {showMapping && (
                    <Card className="bg-[rgba(71,85,105,0.2)] border-[rgba(71,85,105,0.3)] mb-8">
                        <CardContent className="p-8">
                            <h3 className="text-[#60a5fa] text-xl font-bold mb-4 text-center">🗺️ Map Your Columns</h3>

                            <p className="text-gray-400 text-center mb-6">
                                Map your CSV columns to the required fields. At minimum, you need First Name, Last Name, and Phone.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">First Name Column *</label>
                                    <select
                                        className="w-full bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] rounded-lg p-3 text-white"
                                        value={columnMappings.firstName}
                                        onChange={(e) => handleColumnMappingChange('firstName', e.target.value)}
                                    >
                                        <option value="">Select column...</option>
                                        {columnHeaders.map(header => (
                                            <option key={header} value={header}>{header}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Last Name Column *</label>
                                    <select
                                        className="w-full bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] rounded-lg p-3 text-white"
                                        value={columnMappings.lastName}
                                        onChange={(e) => handleColumnMappingChange('lastName', e.target.value)}
                                    >
                                        <option value="">Select column...</option>
                                        {columnHeaders.map(header => (
                                            <option key={header} value={header}>{header}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Phone Column *</label>
                                    <select
                                        className="w-full bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] rounded-lg p-3 text-white"
                                        value={columnMappings.phone}
                                        onChange={(e) => handleColumnMappingChange('phone', e.target.value)}
                                    >
                                        <option value="">Select column...</option>
                                        {columnHeaders.map(header => (
                                            <option key={header} value={header}>{header}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Second Phone Column (Optional)</label>
                                    <select
                                        className="w-full bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] rounded-lg p-3 text-white"
                                        value={columnMappings.phone2}
                                        onChange={(e) => handleColumnMappingChange('phone2', e.target.value)}
                                    >
                                        <option value="">Select column...</option>
                                        {columnHeaders.map(header => (
                                            <option key={header} value={header}>{header}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Third Phone Column (Optional)</label>
                                    <select
                                        className="w-full bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] rounded-lg p-3 text-white"
                                        value={columnMappings.phone3}
                                        onChange={(e) => handleColumnMappingChange('phone3', e.target.value)}
                                    >
                                        <option value="">Select column...</option>
                                        {columnHeaders.map(header => (
                                            <option key={header} value={header}>{header}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Email Column (Optional)</label>
                                    <select
                                        className="w-full bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] rounded-lg p-3 text-white"
                                        value={columnMappings.email}
                                        onChange={(e) => handleColumnMappingChange('email', e.target.value)}
                                    >
                                        <option value="">Select column...</option>
                                        {columnHeaders.map(header => (
                                            <option key={header} value={header}>{header}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Address Column (Optional)</label>
                                    <select
                                        className="w-full bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] rounded-lg p-3 text-white"
                                        value={columnMappings.address}
                                        onChange={(e) => handleColumnMappingChange('address', e.target.value)}
                                    >
                                        <option value="">Select column...</option>
                                        {columnHeaders.map(header => (
                                            <option key={header} value={header}>{header}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <Button
                                    className="bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] text-gray-300 hover:bg-[rgba(71,85,105,0.5)] hover:text-white font-semibold py-3 px-6"
                                    onClick={resetUpload}
                                >
                                    🔄 Upload Different File
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6"
                                    onClick={processMappedData}
                                >
                                    ✅ Process Data
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* VALIDATION RESULTS */}
                {showValidation && (
                    <Card className="bg-[rgba(71,85,105,0.2)] border-[rgba(71,85,105,0.3)] mb-8">
                        <CardContent className="p-8">
                            <h3 className="text-[#34d399] text-xl font-bold mb-4 text-center">✅ Data Validation Results</h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-[rgba(30,41,59,0.6)] rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-400">{processedLeads.length}</div>
                                    <div className="text-sm text-gray-400">Total Records</div>
                                </div>
                                <div className="bg-[rgba(30,41,59,0.6)] rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-green-400">{processedLeads.filter(lead => lead.isValid && !lead.isDuplicate).length}</div>
                                    <div className="text-sm text-gray-400">Valid Records</div>
                                </div>
                                <div className="bg-[rgba(30,41,59,0.6)] rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-red-400">{processedLeads.filter(lead => !lead.isValid).length}</div>
                                    <div className="text-sm text-gray-400">Invalid Records</div>
                                </div>
                                <div className="bg-[rgba(30,41,59,0.6)] rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-yellow-400">
                                        {processedLeads.length > 0 ? Math.round((processedLeads.filter(lead => lead.isValid && !lead.isDuplicate).length / processedLeads.length) * 100) : 0}%
                                    </div>
                                    <div className="text-sm text-gray-400">Data Quality</div>
                                </div>
                            </div>

                            {/* Detailed Validation Issues */}
                            {processedLeads.some(lead => !lead.isValid) && (
                                <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-lg p-4 mb-6">
                                    <h4 className="text-red-400 font-semibold mb-3">⚠️ Issues Found:</h4>
                                    <div className="space-y-2">
                                        {processedLeads.filter(lead => !lead.isValid).slice(0, 5).map((lead, index) => (
                                            <div key={lead.id} className="text-sm text-gray-300">
                                                <span className="text-red-400">•</span> {lead.firstName} {lead.lastName} -
                                                <span className="text-red-400 ml-1">
                                                    {!lead.validation.phoneValid ? `Invalid phone: "${lead.originalPhone}"` : ''}
                                                    {!lead.validation.nameValid ? ' Missing name' : ''}
                                                    {!lead.validation.emailValid ? ' Invalid email' : ''}
                                                </span>
                                            </div>
                                        ))}
                                        {processedLeads.filter(lead => !lead.isValid).length > 5 && (
                                            <div className="text-sm text-gray-400">
                                                ... and {processedLeads.filter(lead => !lead.isValid).length - 5} more issues
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="text-center">
                                <Button
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8"
                                    onClick={() => {
                                        setShowDialer(true);
                                        // Initialize dialer with first contact
                                        const validLeads = processedLeads.filter(lead => lead.isValid && !lead.isDuplicate);
                                        if (validLeads.length > 0) {
                                            setCurrentContactIndex(0);
                                            selectContact(validLeads[0]);
                                        }
                                    }}
                                    disabled={processedLeads.filter(lead => lead.isValid && !lead.isDuplicate).length === 0}
                                >
                                    📞 Start Dialing Campaign ({processedLeads.filter(lead => lead.isValid && !lead.isDuplicate).length} valid contacts)
                                </Button>
                                {processedLeads.filter(lead => lead.isValid && !lead.isDuplicate).length === 0 && (
                                    <p className="text-red-400 text-sm mt-2">No valid contacts to dial. Please fix the data issues above.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* DIALER INTERFACE - SHOWS AFTER CLICKING "Start Dialing Campaign" */}
                {showDialer && (
                    <div className="mb-8">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[rgba(71,85,105,0.3)]">
                            <div className="flex items-center gap-6">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                                    Dialer
                                </h1>
                                <Button
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white px-4 py-2 text-sm font-semibold"
                                    onClick={() => alert('Opening billing & usage dashboard...')}
                                >
                                    Billing & Usage
                                </Button>
                            </div>
                            <div className="flex gap-6 text-sm text-gray-400">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-blue-400">{processedLeads.filter(lead => lead.isValid && !lead.isDuplicate).length}</div>
                                    <div>Valid Contacts</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-green-400">{calledToday}</div>
                                    <div>Called Today</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-purple-400">{convertedCount}</div>
                                    <div>Converted</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-orange-400">{Math.max(0, processedLeads.filter(lead => lead.isValid && !lead.isDuplicate).length - currentContactIndex - 1)}</div>
                                    <div>Remaining</div>
                                </div>
                            </div>
                        </div>

                        {/* Main Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Contact List */}
                            <div className="bg-[rgba(30,41,59,0.8)] border border-[rgba(71,85,105,0.3)] rounded-2xl p-6">
                                <div className="mb-4 pb-4 border-b border-[rgba(71,85,105,0.3)]">
                                    <h3 className="text-lg font-semibold text-white">Contact Queue</h3>
                                </div>

                                <div className="space-y-3">
                                    {processedLeads
                                        .filter(lead => lead.isValid && !lead.isDuplicate)
                                        .map((lead) => (
                                            <div
                                                key={lead.id}
                                                className={`bg-[rgba(71,85,105,0.2)] border border-[rgba(71,85,105,0.3)] rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-[rgba(96,165,250,0.5)] hover:-translate-y-0.5 ${selectedContact?.id === lead.id ? 'border-blue-400 bg-[rgba(96,165,250,0.1)]' : ''
                                                    }`}
                                                onClick={() => selectContact(lead)}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="font-semibold text-white">{lead.firstName} {lead.lastName}</div>
                                                    <div className="flex items-center gap-2">
                                                        {contactStatuses.get(lead.id) && (
                                                            <span className="text-xs px-2 py-1 rounded-full bg-gray-600 text-gray-300">
                                                                {contactStatuses.get(lead.id).status}
                                                            </span>
                                                        )}
                                                        <div className={`w-2 h-2 rounded-full ${contactStatuses.get(lead.id)?.isClient ? 'bg-purple-400' :
                                                            contactStatuses.get(lead.id)?.status === 'Called' ? 'bg-yellow-400' :
                                                                contactStatuses.get(lead.id)?.status === 'Skipped' ? 'bg-gray-400' :
                                                                    'bg-green-400'
                                                            }`} title="Contact status"></div>
                                                    </div>
                                                </div>
                                                <div className="font-mono text-blue-400 text-sm mb-1">{lead.phone}</div>
                                                {lead.phone2 && (
                                                    <div className="font-mono text-green-400 text-xs mb-1">Alt 2: {lead.phone2}</div>
                                                )}
                                                {lead.phone3 && (
                                                    <div className="font-mono text-purple-400 text-xs mb-1">Alt 3: {lead.phone3}</div>
                                                )}
                                                {lead.email && (
                                                    <div className="text-xs text-gray-300 mb-1">{lead.email}</div>
                                                )}
                                                {lead.address && (
                                                    <div className="text-xs text-gray-400">{lead.address}</div>
                                                )}
                                                {contactStatuses.get(lead.id)?.notes && (
                                                    <div className="text-xs text-gray-500 mt-2 italic">
                                                        Notes: {contactStatuses.get(lead.id).notes}
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                    {/* Show invalid contacts section if any exist */}
                                    {processedLeads.some(lead => !lead.isValid) && (
                                        <div className="mt-6 pt-4 border-t border-[rgba(71,85,105,0.3)]">
                                            <h4 className="text-red-400 font-semibold mb-3 text-sm">⚠️ Invalid Contacts (Not Dialable)</h4>
                                            <div className="space-y-2">
                                                {processedLeads
                                                    .filter(lead => !lead.isValid)
                                                    .slice(0, 3)
                                                    .map((lead) => (
                                                        <div
                                                            key={lead.id}
                                                            className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-lg p-3 text-xs"
                                                        >
                                                            <div className="font-semibold text-red-400 mb-1">{lead.firstName} {lead.lastName}</div>
                                                            <div className="text-red-300">
                                                                {!lead.validation.phoneValid && `Invalid phone: "${lead.originalPhone}"`}
                                                                {!lead.validation.nameValid && ' Missing name'}
                                                                {!lead.validation.emailValid && ' Invalid email'}
                                                            </div>
                                                        </div>
                                                    ))}
                                                {processedLeads.filter(lead => !lead.isValid).length > 3 && (
                                                    <div className="text-xs text-gray-400 text-center">
                                                        ... and {processedLeads.filter(lead => !lead.isValid).length - 3} more invalid contacts
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Dialer Panel */}
                            <div className="bg-[rgba(30,41,59,0.9)] border border-[rgba(71,85,105,0.4)] rounded-2xl p-6">
                                {/* Dialer Screen */}
                                <div className="bg-black border-2 border-gray-600 rounded-lg p-4 mb-6 text-center shadow-inner">
                                    <div className="font-mono text-xl font-bold text-green-400 tracking-wider mb-2 break-all overflow-hidden">
                                        {activePhoneNumber === 1 ? dialerNumber : activePhoneNumber === 2 ? dialerNumber2 : dialerNumber3}
                                    </div>
                                    <div className="text-sm text-gray-400">{dialerStatus}</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Phone {activePhoneNumber} of 3
                                    </div>
                                </div>

                                {/* Phone Number Selection */}
                                <div className="flex gap-2 mb-4">
                                    <button
                                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${activePhoneNumber === 1
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                            }`}
                                        onClick={() => setActivePhoneNumber(1)}
                                    >
                                        Phone 1
                                    </button>
                                    <button
                                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${activePhoneNumber === 2
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                            }`}
                                        onClick={() => setActivePhoneNumber(2)}
                                    >
                                        Phone 2
                                    </button>
                                    <button
                                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${activePhoneNumber === 3
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                            }`}
                                        onClick={() => setActivePhoneNumber(3)}
                                    >
                                        Phone 3
                                    </button>
                                </div>

                                {/* Keypad */}
                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                                        <button
                                            key={key}
                                            className="bg-gradient-to-br from-gray-600 to-gray-700 border border-gray-800 rounded-full w-16 h-16 text-xl font-bold text-white cursor-pointer transition-all duration-100 hover:from-blue-500 hover:to-blue-600 hover:-translate-y-0.5 active:scale-95 shadow-lg"
                                            onClick={() => dialKey(key)}
                                        >
                                            {key}
                                        </button>
                                    ))}
                                </div>

                                {/* Call Controls */}
                                <div className="flex justify-center gap-6">
                                    <button
                                        className={`w-16 h-16 rounded-full border-none cursor-pointer text-2xl transition-all duration-200 ${isInCall
                                            ? 'bg-red-500 hover:bg-red-600'
                                            : 'bg-green-500 hover:bg-green-600'
                                            } hover:scale-105`}
                                        onClick={isInCall ? hangupCall : makeCall}
                                    >
                                        {isInCall ? <PhoneOff className="w-6 h-6 mx-auto text-white" /> : <PhoneCall className="w-6 h-6 mx-auto text-white" />}
                                    </button>
                                </div>
                            </div>

                            {/* Contact Info Panel */}
                            <div className="bg-[rgba(30,41,59,0.8)] border border-[rgba(71,85,105,0.3)] rounded-2xl p-6">
                                {selectedContact && (
                                    <>
                                        {/* Contact Details */}
                                        <div className="text-center mb-6">
                                            <div className="text-xl font-bold text-white mb-2">{selectedContact.firstName} {selectedContact.lastName}</div>
                                            <div className="font-mono text-blue-400 mb-2">{selectedContact.phone}</div>
                                            {selectedContact.phone2 && (
                                                <div className="font-mono text-green-400 text-sm mb-1">Alt 2: {selectedContact.phone2}</div>
                                            )}
                                            {selectedContact.phone3 && (
                                                <div className="font-mono text-purple-400 text-sm mb-1">Alt 3: {selectedContact.phone3}</div>
                                            )}
                                            {selectedContact.email && (
                                                <div className="text-sm text-gray-300 mb-1">{selectedContact.email}</div>
                                            )}
                                            {selectedContact.address && (
                                                <div className="text-sm text-gray-400 leading-relaxed">
                                                    {selectedContact.address.split(', ').map((line, index) => (
                                                        <div key={index}>{line}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Contact Information Fields */}
                                        <div className="mb-6">
                                            <div className="text-white font-semibold mb-3">Contact Information</div>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-xs text-gray-400 mb-1">Phone Numbers</label>
                                                    <div className="space-y-2">
                                                        <input
                                                            type="text"
                                                            value={dialerNumber}
                                                            onChange={(e) => setDialerNumber(e.target.value)}
                                                            className="w-full bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] rounded-lg p-2 text-white text-sm"
                                                            placeholder="Primary Phone"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={dialerNumber2}
                                                            onChange={(e) => setDialerNumber2(e.target.value)}
                                                            className="w-full bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] rounded-lg p-2 text-white text-sm"
                                                            placeholder="Secondary Phone (Optional)"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={dialerNumber3}
                                                            onChange={(e) => setDialerNumber3(e.target.value)}
                                                            className="w-full bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] rounded-lg p-2 text-white text-sm"
                                                            placeholder="Third Phone (Optional)"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-400 mb-1">Email (Optional)</label>
                                                    <input
                                                        type="email"
                                                        value={dialerEmail}
                                                        onChange={(e) => setDialerEmail(e.target.value)}
                                                        className="w-full bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] rounded-lg p-2 text-white text-sm"
                                                        placeholder="Email Address"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="mb-6">
                                            <div className="text-white font-semibold mb-3">Actions</div>
                                            <div className="space-y-3">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2"
                                                    onClick={convertToClient}
                                                >
                                                    Turn Lead into Client
                                                </Button>
                                                <Button
                                                    className="w-full bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] text-gray-300 hover:bg-[rgba(71,85,105,0.5)] hover:text-white font-semibold py-2"
                                                    onClick={skipContact}
                                                >
                                                    Skip Contact
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Quick Tags */}
                                        <div className="mb-6">
                                            <div className="text-white font-semibold mb-3">Quick Tags</div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {tags.map((tag) => (
                                                    <button
                                                        key={tag}
                                                        className={`px-3 py-2 text-xs rounded-md border transition-all duration-200 ${selectedTags.includes(tag)
                                                            ? 'bg-[rgba(245,158,11,0.2)] border-yellow-500 text-yellow-400'
                                                            : 'bg-[rgba(71,85,105,0.3)] border-[rgba(71,85,105,0.5)] text-gray-400 hover:bg-[rgba(96,165,250,0.2)] hover:border-[rgba(96,165,250,0.4)] hover:text-white'
                                                            }`}
                                                        onClick={() => toggleTag(tag)}
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Call Notes */}
                                        <div>
                                            <div className="text-white font-semibold mb-3">Call Notes</div>
                                            <textarea
                                                className="w-full bg-[rgba(71,85,105,0.3)] border border-[rgba(71,85,105,0.5)] rounded-lg p-3 text-white text-sm resize-none h-20 placeholder-gray-500"
                                                placeholder="Add notes about this call..."
                                                value={callNotes}
                                                onChange={(e) => setCallNotes(e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* COMMENTED OUT OLD SUCCESS MESSAGE - REPLACED WITH VALIDATION RESULTS */}
                {/* Success Message */}
                {/* {showSuccess && !showDialer && (
                    <Card className="bg-gradient-to-r from-[rgba(52,211,153,0.1)] to-[rgba(16,185,129,0.1)] border-[rgba(52,211,153,0.3)] mb-8">
                        <CardContent className="p-8 text-center">
                            <div className="text-4xl mb-4">✅</div>
                            <h3 className="text-[#34d399] text-xl font-bold mb-4">File Uploaded Successfully!</h3>
                            <div className="text-gray-400 mb-4">
                                <strong>{importResults} contacts</strong> imported as-is from your file
                            </div>
                            <p className="text-gray-400 mb-6 text-sm">
                                Your data has been imported exactly as provided. Review your contacts and start dialing when ready.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-[rgba(30,41,59,0.6)] rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">👀</div>
                                    <div className="text-[#60a5fa] font-semibold mb-1">Next Step</div>
                                    <div className="text-white text-sm">Review Your Imported Contacts</div>
                                </div>
                                <div className="bg-[rgba(30,41,59,0.6)] rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">📞</div>
                                    <div className="text-[#60a5fa] font-semibold mb-1">Then</div>
                                    <div className="text-white text-sm">Start Your Dialing Campaign</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Button
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3"
                                    onClick={reviewContacts}
                                >
                                    👀 Review Contacts
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3"
                                    onClick={startDialing}
                                >
                                    📞 Start Dialing
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )} */}

                {/* COMMENTED OUT OLD DIALER INTERFACE - REPLACED WITH MAPPING INTERFACE */}

            </div>

            {/* DNC Compliance Modal */}
            <DNCComplianceModal
                isOpen={showDNCModal}
                onAccept={handleDNCComplianceAccept}
                onClose={handleDNCComplianceClose}
                contact={pendingCall?.contact}
                phoneNumber={pendingCall?.phoneNumber}
            />
        </div>
    );
};

export default ClientUpload;
