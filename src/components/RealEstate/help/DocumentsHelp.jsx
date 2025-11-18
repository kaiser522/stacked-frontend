import React from 'react';
import { FileText, Upload, Download, Search, Folder, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const DocumentsHelp = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#34495e] to-[#2c3e50] text-white p-8 rounded-xl mb-8 text-center border border-[#00d4aa]">
                <div className="flex items-center justify-center space-x-3 mb-3">
                    {/* <FileText className="w-8 h-8 text-[#00d4aa]" /> */}
                    <h1 className="text-4xl font-bold text-[#00d4aa]">📄Documents</h1>
                </div>
                <p className="text-lg opacity-90">Organize and manage all your real estate documents</p>
            </div>

            {/* What is Documents Section */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    What is the Documents Section?
                </h2>
                <p className="text-[#e1e5e9] mb-4 text-base">
                    The Documents section is your centralized file management system for all real estate-related documents. It provides secure storage, easy organization, and quick access to contracts, forms, photos, and other important files.
                </p>
                <p className="text-[#e1e5e9] text-base">
                    This section helps you maintain organized records, share documents with clients, and ensure all necessary paperwork is properly stored and accessible when needed.
                </p>
            </div>

            {/* Document Categories */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Document Categories
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <Folder className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Contracts</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Purchase agreements, listing contracts, and legal documents</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <FileText className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Forms</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Disclosure forms, inspection reports, and applications</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <Upload className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Photos</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Property photos, marketing images, and visual documentation</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <CheckCircle className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Templates</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Reusable document templates and standard forms</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <Clock className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Archives</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Historical documents and completed transaction files</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <AlertCircle className="w-6 h-6 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Important</h4>
                        </div>
                        <p className="text-[#b8c5d1] text-sm">Critical documents requiring special attention</p>
                    </div>
                </div>
            </div>

            {/* Document Management Features */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Document Management Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Upload className="w-5 h-5 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Upload Documents</h4>
                        </div>
                        <ul className="space-y-2 ml-8">
                            <li className="text-[#e1e5e9] text-sm">Drag and drop file uploads</li>
                            <li className="text-[#e1e5e9] text-sm">Support for PDF, images, and Office documents</li>
                            <li className="text-[#e1e5e9] text-sm">Bulk upload multiple files at once</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Search className="w-5 h-5 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Search & Filter</h4>
                        </div>
                        <ul className="space-y-2 ml-8">
                            <li className="text-[#e1e5e9] text-sm">Search by filename or content</li>
                            <li className="text-[#e1e5e9] text-sm">Filter by document type or date</li>
                            <li className="text-[#e1e5e9] text-sm">Advanced search with multiple criteria</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Folder className="w-5 h-5 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Organization</h4>
                        </div>
                        <ul className="space-y-2 ml-8">
                            <li className="text-[#e1e5e9] text-sm">Create custom folders and subfolders</li>
                            <li className="text-[#e1e5e9] text-sm">Tag documents for easy categorization</li>
                            <li className="text-[#e1e5e9] text-sm">Link documents to specific properties or clients</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Download className="w-5 h-5 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Sharing & Access</h4>
                        </div>
                        <ul className="space-y-2 ml-8">
                            <li className="text-[#e1e5e9] text-sm">Generate secure sharing links</li>
                            <li className="text-[#e1e5e9] text-sm">Control access permissions</li>
                            <li className="text-[#e1e5e9] text-sm">Email documents directly to clients</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Document Status Tracking */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Document Status Tracking
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] text-center">
                        <div className="flex items-center justify-center mb-3">
                            <Clock className="w-8 h-8 text-[#eab308]" />
                        </div>
                        <h4 className="text-[#eab308] font-semibold text-sm uppercase tracking-wider mb-2">Pending</h4>
                        <div className="text-2xl font-bold text-[#e1e5e9] mb-1">12</div>
                        <div className="text-xs text-[#b8c5d1]">Awaiting review</div>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] text-center">
                        <div className="flex items-center justify-center mb-3">
                            <CheckCircle className="w-8 h-8 text-[#10b981]" />
                        </div>
                        <h4 className="text-[#10b981] font-semibold text-sm uppercase tracking-wider mb-2">Approved</h4>
                        <div className="text-2xl font-bold text-[#e1e5e9] mb-1">45</div>
                        <div className="text-xs text-[#b8c5d1]">Ready for use</div>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border border-[#485e73] text-center">
                        <div className="flex items-center justify-center mb-3">
                            <AlertCircle className="w-8 h-8 text-[#ef4444]" />
                        </div>
                        <h4 className="text-[#ef4444] font-semibold text-sm uppercase tracking-wider mb-2">Expired</h4>
                        <div className="text-2xl font-bold text-[#e1e5e9] mb-1">3</div>
                        <div className="text-xs text-[#b8c5d1]">Need renewal</div>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Document Status Types</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#eab308] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#eab308]">Pending:</strong> Documents that have been uploaded but not yet reviewed or approved</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#10b981] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#10b981]">Approved:</strong> Documents that have been reviewed and are ready for use</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#ef4444] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#ef4444]">Expired:</strong> Documents that have passed their expiration date and need renewal</span>
                    </li>
                </ul>
            </div>

            {/* Document Security */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Document Security & Compliance
                </h2>

                <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] mb-6">
                    <h4 className="text-[#00d4aa] font-semibold mb-4">Security Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h5 className="text-[#e1e5e9] font-medium mb-2">Data Encryption</h5>
                            <p className="text-[#b8c5d1] text-sm">All documents are encrypted both in transit and at rest</p>
                        </div>
                        <div>
                            <h5 className="text-[#e1e5e9] font-medium mb-2">Access Control</h5>
                            <p className="text-[#b8c5d1] text-sm">Granular permissions control who can view or edit documents</p>
                        </div>
                        <div>
                            <h5 className="text-[#e1e5e9] font-medium mb-2">Audit Trail</h5>
                            <p className="text-[#b8c5d1] text-sm">Complete log of all document access and modifications</p>
                        </div>
                        <div>
                            <h5 className="text-[#e1e5e9] font-medium mb-2">Backup & Recovery</h5>
                            <p className="text-[#b8c5d1] text-sm">Automatic backups ensure document safety and recovery</p>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Compliance Features</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Retention Policies:</strong> Automatic document retention and deletion based on compliance requirements</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Version Control:</strong> Track document versions and maintain change history</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Digital Signatures:</strong> Support for legally binding electronic signatures</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Compliance Reporting:</strong> Generate reports for regulatory compliance and audits</span>
                    </li>
                </ul>
            </div>

            {/* Best Practices */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Document Management Best Practices
                </h2>

                <div className="bg-[#1e3d59] border-l-4 border-[#00d4aa] p-4 rounded mb-6">
                    <p className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">💡 Pro Tip:</strong> Organize documents immediately upon upload by creating clear folder structures and using descriptive filenames. This saves time later and ensures nothing gets lost in the system.
                    </p>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Effective Document Organization</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Consistent Naming:</strong> Use standardized naming conventions for all documents</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Folder Structure:</strong> Create logical folder hierarchies by property, client, or transaction type</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Tagging System:</strong> Use tags to categorize documents for easy searching and filtering</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Regular Cleanup:</strong> Periodically review and archive outdated documents</span>
                    </li>
                </ul>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4 mt-8">Document Sharing Guidelines</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Secure Links:</strong> Always use secure sharing links with expiration dates for sensitive documents</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Access Permissions:</strong> Set appropriate permissions to control who can view, edit, or download documents</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Client Communication:</strong> Notify clients when documents are shared and provide context about their purpose</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DocumentsHelp;
