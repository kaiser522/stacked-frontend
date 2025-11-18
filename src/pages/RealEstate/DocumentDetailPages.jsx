import React, { useState, useEffect } from 'react';
import BuyerConsultationAgreement from '../../components/document/BuyerConsultationAgreement';
import ClientSatisfactionSurvey from '../../components/document/ClientSatisfactionSurvey';
import CommissionAgreement from '../../components/document/CommissionAgreement';
import ComparativeMarketAnalysis from '../../components/document/ComparativeMarketAnalysis';
import ExclusiveRightToSell from '../../components/document/ExclusiveRightToSell';
import HomeValuationForm from '../../components/document/HomeValuationForm';
import LeadIntakeForm from '../../components/document/LeadIntakeForm';
import PropertyDisclosureStatement from '../../components/document/PropertyDisclosureStatement';
import PurchaseAgreement from '../../components/document/PurchaseAgreement';
import ReferralRequestForm from '../../components/document/ReferralRequestForm';
// Add-ons imports
import AdvancedCRM from '../../components/document/add-ons/AdvancedCRM';
import ExpenseTracker from '../../components/document/add-ons/ExpenseTracker';
import ConstructionTracker from '../../components/document/add-ons/ConstructionTracker';
import MarketTrends from '../../components/document/add-ons/MarketTrends';
import InvestmentAnalysis from '../../components/document/add-ons/InvestmentAnalysis';
import AssignmentProfitCalculator from '../../components/document/add-ons/AssignmentProfitCalculator';
import RehabCostEstimator from '../../components/document/add-ons/RehabCostEstimator';
import ProbateFeeCalculator from '../../components/document/add-ons/ProbateFeeCalculator';
import EmailTemplates from '../../components/RealEstate/EmailTemplates';
// Pro doc components (HTML templates converted to components)
import SOIDatabaseManager from '../../components/document/pro/SOIDatabaseManager';
import ClientOnboardingChecklist from '../../components/document/pro/ClientOnboardingChecklist';
import OpenHouseFollowUpSystem from '../../components/document/pro/OpenHouseFollowUpSystem';
import AnnualBusinessPlan from '../../components/document/pro/AnnualBusinessPlan';
import WeeklyMonthlyActivityPlanner from '../../components/document/pro/WeeklyMonthlyActivityPlanner';
import { Upload, FileText, MoreVertical, Image, Clipboard, Mail, ArrowLeft, Send, Loader2, X, User, Check, Trash2, RotateCcw, Trash, Download } from 'lucide-react';
import { useGetAllEmailTemplateQuery, useSendEmailTemplateMutation } from '../../store/apis/emailTemplate.api';
import {
  useGetAllDocumentsQuery,
  useUploadDocumentMutation,
  useAssignDocumentToClientMutation,
  useUnassignDocumentMutation,
  useMoveDocumentToTrashMutation,
  useRestoreDocumentFromTrashMutation,
  usePermanentlyDeleteDocumentMutation,
  useGetTrashedDocumentsQuery
} from '../../store/apis/documents.api';
import { useGetAllClientsQuery } from '../../store/apis/clients.api';

const documentPages = [
  { key: 'PurchaseAgreement', title: 'Purchase Agreement', component: <PurchaseAgreement /> },
  { key: 'CommissionAgreement', title: 'Commission Agreement', component: <CommissionAgreement /> },
  { key: 'ExclusiveRightToSell', title: 'Exclusive Right to Sell', component: <ExclusiveRightToSell /> },
  { key: 'ComparativeMarketAnalysis', title: 'Comparative Market Analysis', component: <ComparativeMarketAnalysis /> },
  { key: 'LeadIntakeForm', title: 'Lead Intake Form', component: <LeadIntakeForm /> },
  { key: 'HomeValuationForm', title: 'Home Valuation Form', component: <HomeValuationForm /> },
  { key: 'ReferralRequestForm', title: 'Referral Request Form', component: <ReferralRequestForm /> },
  { key: 'PropertyDisclosureStatement', title: 'Property Disclosure Statement', component: <PropertyDisclosureStatement /> },
  { key: 'BuyerConsultationAgreement', title: 'Buyer Consultation Agreement', component: <BuyerConsultationAgreement /> },
  { key: 'ClientSatisfactionSurvey', title: 'Client Satisfaction Survey', component: <ClientSatisfactionSurvey /> },
];

const addOnPages = [
  { key: 'AdvancedCRM', title: 'Advanced CRM & Sales Pipeline', component: <AdvancedCRM /> },
  { key: 'ExpenseTracker', title: 'Expense & Tax Tracker', component: <ExpenseTracker /> },
  { key: 'ConstructionTracker', title: 'Construction Progress Tracker', component: <ConstructionTracker /> },
  { key: 'MarketTrends', title: 'Market Trends & Analytics', component: <MarketTrends /> },
  { key: 'InvestmentAnalysis', title: 'Investment Property Analysis', component: <InvestmentAnalysis /> },
  { key: 'AssignmentProfitCalculator', title: 'Assignment Profit Calculator', component: <AssignmentProfitCalculator /> },
  { key: 'RehabCostEstimator', title: 'Rehab Cost Estimator', component: <RehabCostEstimator /> },
  { key: 'ProbateFeeCalculator', title: 'Probate Fee Calculator', component: <ProbateFeeCalculator /> },
];

// Pro templates (component-based, no iframes)
const proPages = [
  { key: 'Pro-SOIDatabaseManager', title: 'SOI Database Manager', pro: true, component: <SOIDatabaseManager /> },
  { key: 'Pro-ClientOnboardingChecklist', title: 'Client Onboarding Checklist', pro: true, component: <ClientOnboardingChecklist /> },
  { key: 'Pro-OpenHouseFollowUpSystem', title: 'Open House Follow-Up System', pro: true, component: <OpenHouseFollowUpSystem /> },
  { key: 'Pro-AnnualBusinessPlan', title: 'Annual Business Plan', pro: true, component: <AnnualBusinessPlan /> },
  { key: 'Pro-WeeklyMonthlyActivityPlanner', title: 'Weekly/Monthly Activity Planner', pro: true, component: <WeeklyMonthlyActivityPlanner /> },
];

// Quick lookup to tag add-on pages with a POWER badge in the picker
const addOnKeys = new Set(addOnPages.map(p => p.key));

const DocumentManagementSystem = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showEmailTemplates, setShowEmailTemplates] = useState(false);
  const [selectedEmailCategory, setSelectedEmailCategory] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: '',
    content: '',
    variables: {},
  });
  const [selectedDocPage, setSelectedDocPage] = useState(null);
  const [selectedAddOnPage, setSelectedAddOnPage] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    file: null,
    documentType: '',
    address: '',
    source: '',
    assignee: ''
  });
  const [showAssignDropdown, setShowAssignDropdown] = useState(null);
  const [assigningDocumentClient, setAssigningDocumentClient] = useState(null);
  const [showEmailTemplatesView, setShowEmailTemplatesView] = useState(false);
  const [showTrashView, setShowTrashView] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(null);
  const [showMoveToTrashModal, setShowMoveToTrashModal] = useState(null);
  const [showRestoreConfirmModal, setShowRestoreConfirmModal] = useState(null);
  const [movingToTrashDocId, setMovingToTrashDocId] = useState(null);
  const [restoringDocId, setRestoringDocId] = useState(null);

  // Fetch email templates using RTK Query
  const {
    data: emailTemplatesResponse,
    isLoading: templatesLoading,
    error: templatesError,
    refetch: refetchTemplates
  } = useGetAllEmailTemplateQuery();

  // Send email template mutation
  const [sendEmailTemplate, { isLoading: sending }] = useSendEmailTemplateMutation();

  // Upload document mutation
  const [uploadDocument, { isLoading: uploading }] = useUploadDocumentMutation();

  // Assign document to client mutation
  const [assignDocumentToClient] = useAssignDocumentToClientMutation();

  // Unassign document mutation
  const [unassignDocument, { isLoading: isUnassigning }] = useUnassignDocumentMutation();

  // Trash-related mutations
  const [moveDocumentToTrash, { isLoading: isMovingToTrash }] = useMoveDocumentToTrashMutation();
  const [restoreDocumentFromTrash, { isLoading: isRestoring }] = useRestoreDocumentFromTrashMutation();
  const [permanentlyDeleteDocument, { isLoading: isDeleting }] = usePermanentlyDeleteDocumentMutation();

  // Fetch clients
  const { data: clientsResponse, isLoading: clientsLoading } = useGetAllClientsQuery();

  // Fetch trashed documents
  const { data: trashedDocumentsResponse, isLoading: trashedDocsLoading, refetch: refetchTrashedDocs } = useGetTrashedDocumentsQuery();


  console.log('clientsResponse', clientsResponse)

  const emailTemplates = emailTemplatesResponse?.data || {};

  // Fetch documents via RTK Query
  const { data: documentsResponse, isLoading: docsLoading } = useGetAllDocumentsQuery();

  const documents = documentsResponse?.data || [];
  const clients = clientsResponse?.data?.clients || [];
  const trashedDocuments = trashedDocumentsResponse?.data || [];

  const filteredDocuments = documents.filter((doc) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "contracts" && doc.documentType === "pdf") return true;
    if (activeCategory === "photos" && doc.documentType === "photos") return true;
    if (activeCategory === "inspection-reports" && doc.documentType === "zip") return true;
    return false;
  });

  const emailCategories = Object.keys(emailTemplates);

  const getTemplatesByCategory = (category) => {
    return emailTemplates[category] || [];
  };

  const getSourceBadgeClass = (source) => {
    if (source === 'Dropbox') return 'bg-blue-600/10 text-blue-400';
    if (source === 'Google Drive') return 'bg-amber-600/10 text-amber-400';
    return '';
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image':
        return <Image className="w-8 h-8 text-amber-400" />;
      case 'zip':
        return <Clipboard className="w-8 h-8 text-gray-400" />;
      default:
        return <FileText className="w-8 h-8 text-blue-400" />;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadForm(prev => ({ ...prev, file }));
  };

  const handleUploadFormChange = (field, value) => {
    setUploadForm(prev => ({ ...prev, [field]: value }));
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();

    if (!uploadForm.file) {
      setError('Please select a file to upload');
      return;
    }

    if (!uploadForm.documentType || !uploadForm.address) {
      setError('Please fill in all required fields');
      return;
    }

    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', uploadForm.file);
      formData.append('documentType', uploadForm.documentType);
      formData.append('address', uploadForm.address);
      if (uploadForm.source) formData.append('source', uploadForm.source);
      if (uploadForm.assignee) formData.append('assignee', uploadForm.assignee);

      await uploadDocument(formData).unwrap();

      setSuccessMessage('Document uploaded successfully!');
      setShowUploadModal(false);
      setUploadForm({
        file: null,
        documentType: '',
        address: '',
        source: '',
        assignee: ''
      });

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err?.data?.message || 'Failed to upload document. Please try again.');
    }
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setUploadForm({
      file: null,
      documentType: '',
      address: '',
      source: '',
      assignee: ''
    });
    setError(null);
  };

  // Helper function to get client name by ID
  const getClientNameById = (clientId) => {
    console.log('clientId', clientId)
    const client = clients.find(c => c._id === clientId._id);
    console.log('client', client)
    return client ? client.name : 'Unknown Client';
  };

  const handleAssignToClient = async (documentId, clientId) => {
    const assignmentKey = `${documentId}-${clientId}`;
    setAssigningDocumentClient(assignmentKey);
    try {
      console.log('Assigning document:', documentId, 'to client:', clientId);
      const result = await assignDocumentToClient({ documentId, clientId }).unwrap();
      console.log('Assignment result:', result);

      const clientName = getClientNameById(clientId);
      setSuccessMessage(`Document assigned to ${clientName} successfully!`);
      setShowAssignDropdown(null);

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error assigning document:', error);
      setError(error?.data?.message || 'Failed to assign document to client');
    } finally {
      setAssigningDocumentClient(null);
    }
  };

  const toggleAssignDropdown = (documentId) => {
    setShowAssignDropdown(showAssignDropdown === documentId ? null : documentId);
  };

  const handleUnassignDocument = async (documentId) => {
    setAssigningDocumentClient(documentId);
    try {
      console.log('Unassigning document:', documentId);
      await unassignDocument(documentId).unwrap();

      setSuccessMessage('Document unassigned successfully!');
      setShowAssignDropdown(null);

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error unassigning document:', error);
      setError(error?.data?.message || 'Failed to unassign document');
    } finally {
      setAssigningDocumentClient(null);
    }
  };

  // API-based trash handlers
  const handleMoveToTrash = async (documentId) => {
    setMovingToTrashDocId(documentId);
    try {
      await moveDocumentToTrash(documentId).unwrap();
      setSuccessMessage('Document moved to trash successfully!');
      setShowAssignDropdown(null);
      setShowMoveToTrashModal(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error moving document to trash:', error);
      setError(error?.data?.message || 'Failed to move document to trash');
    } finally {
      setMovingToTrashDocId(null);
    }
  };

  const handleRestoreFromTrash = async (documentId) => {
    setRestoringDocId(documentId);
    try {
      await restoreDocumentFromTrash(documentId).unwrap();
      setSuccessMessage('Document restored successfully!');
      setShowRestoreConfirmModal(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error restoring document:', error);
      setError(error?.data?.message || 'Failed to restore document');
    } finally {
      setRestoringDocId(null);
    }
  };

  const handlePermanentlyDelete = async (documentId) => {
    try {
      await permanentlyDeleteDocument(documentId).unwrap();
      setSuccessMessage('Document permanently deleted!');
      setShowDeleteConfirmModal(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error permanently deleting document:', error);
      setError(error?.data?.message || 'Failed to permanently delete document');
    }
  };

  const handleDownloadDocument = (doc) => {
    try {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = doc.url;
      link.download = doc.originalFileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccessMessage('Document download started!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error downloading document:', error);
      setError('Failed to download document. Please try again.');
    }
  };

  const captureDocumentContent = () => {
    const templateContainer = document.querySelector('.document-template-container');
    if (!templateContainer) {
      throw new Error('Unable to find document content');
    }

    // Create a deep clone of the container
    const clonedContainer = templateContainer.cloneNode(true);

    // Function to sync input values between original and cloned elements
    const syncInputValues = (originalContainer, clonedContainer) => {
      const originalInputs = originalContainer.querySelectorAll('input, textarea, select');
      const clonedInputs = clonedContainer.querySelectorAll('input, textarea, select');

      originalInputs.forEach((originalInput, index) => {
        if (clonedInputs[index]) {
          const clonedInput = clonedInputs[index];

          if (originalInput.type === 'checkbox' || originalInput.type === 'radio') {
            clonedInput.checked = originalInput.checked;
          } else {
            clonedInput.value = originalInput.value;
          }

          // Also update the display value for text inputs
          if (originalInput.type === 'text' || originalInput.type === 'email' || originalInput.type === 'tel' || originalInput.type === 'number') {
            clonedInput.setAttribute('value', originalInput.value);
          }
        }
      });
    };

    // Sync regular inputs
    syncInputValues(templateContainer, clonedContainer);

    // Handle iframe-embedded content (like WeeklyMonthlyActivityPlanner)
    const iframeContainers = templateContainer.querySelectorAll('.pro-scope');
    const clonedIframeContainers = clonedContainer.querySelectorAll('.pro-scope');

    iframeContainers.forEach((iframeContainer, containerIndex) => {
      if (clonedIframeContainers[containerIndex]) {
        syncInputValues(iframeContainer, clonedIframeContainers[containerIndex]);
      }
    });

    // Update any contenteditable elements
    const originalEditable = templateContainer.querySelectorAll('[contenteditable="true"]');
    const clonedEditable = clonedContainer.querySelectorAll('[contenteditable="true"]');

    originalEditable.forEach((originalEl, index) => {
      if (clonedEditable[index]) {
        clonedEditable[index].innerHTML = originalEl.innerHTML;
      }
    });

    // Force all inputs to update their display values
    const allOriginalInputs = templateContainer.querySelectorAll('input, textarea, select');
    allOriginalInputs.forEach(input => {
      // Trigger events to ensure any JavaScript handlers update the display
      input.dispatchEvent(new Event('change', { bubbles: true }));
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('blur', { bubbles: true }));
    });

    // Get the final content with all values properly set
    const updatedContent = clonedContainer.innerHTML;

    return updatedContent;
  };

  // Enhanced capture function specifically for iframe content
  const captureIframeContent = () => {
    const templateContainer = document.querySelector('.document-template-container');
    if (!templateContainer) {
      throw new Error('Unable to find document content');
    }

    // Get the current HTML content
    let htmlContent = templateContainer.innerHTML;

    // Find all pro-scope containers and update their input values
    const proScopeContainers = templateContainer.querySelectorAll('.pro-scope');
    proScopeContainers.forEach(container => {
      const inputs = container.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        // Update the HTML content with current values
        if (input.type === 'checkbox' || input.type === 'radio') {
          if (input.checked) {
            htmlContent = htmlContent.replace(
              new RegExp(`(<input[^>]*name="${input.name}"[^>]*)(>|\\s)`, 'gi'),
              `$1 checked$2`
            );
          }
        } else {
          // For text inputs, update the value attribute
          const valueRegex = new RegExp(`(<input[^>]*name="${input.name}"[^>]*value=")[^"]*(")`, 'gi');
          if (valueRegex.test(htmlContent)) {
            htmlContent = htmlContent.replace(valueRegex, `$1${input.value}$2`);
          } else {
            // If no value attribute exists, add it
            const inputRegex = new RegExp(`(<input[^>]*name="${input.name}"[^>]*)(>|\\s)`, 'gi');
            htmlContent = htmlContent.replace(inputRegex, `$1 value="${input.value}"$2`);
          }
        }
      });
    });

    return htmlContent;
  };

  const handleDownloadDocumentTemplate = (templateKey) => {
    try {
      // Small delay to ensure all React state changes are rendered
      setTimeout(() => {
        try {
          // Force all inputs to update their values before capture
          const allInputs = document.querySelectorAll('.document-template-container input, .document-template-container textarea, .document-template-container select');
          allInputs.forEach(input => {
            // Trigger change events to ensure React state is updated
            input.dispatchEvent(new Event('change', { bubbles: true }));
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('blur', { bubbles: true }));
          });

          // Additional delay to ensure all updates are processed
          setTimeout(() => {
            try {
              // Force a final sync of all input values
              const templateContainer = document.querySelector('.document-template-container');
              if (templateContainer) {
                // Force all inputs to show their current values
                const allInputs = templateContainer.querySelectorAll('input, textarea, select');
                allInputs.forEach(input => {
                  // Ensure the input shows its current value
                  if (input.type === 'text' || input.type === 'email' || input.type === 'tel' || input.type === 'number') {
                    input.setAttribute('value', input.value);
                  }
                });
              }

              // Try enhanced iframe content capture first, fallback to regular capture
              let documentContent;
              try {
                documentContent = captureIframeContent();
              } catch (error) {
                console.log('Falling back to regular capture:', error);
                documentContent = captureDocumentContent();
              }

              // Create a clean HTML document with proper styling
              const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${templateKey} Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @media print {
            .no-print { display: none !important; }
            body { 
                margin: 0; 
                background: linear-gradient(to bottom right, #1e293b, #0c4a6e) !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .page-break { page-break-before: always; }
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
        /* Ensure exact background colors are preserved */
        .bg-gradient-to-br {
            background: linear-gradient(to bottom right, #1e293b, #0c4a6e) !important;
        }
        .bg-white\/10 {
            background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .border-white\/20 {
            border-color: rgba(255, 255, 255, 0.2) !important;
        }
        .border-white\/30 {
            border-color: rgba(255, 255, 255, 0.3) !important;
        }
        .text-emerald-400 {
            color: #34d399 !important;
        }
        .text-yellow-400 {
            color: #fbbf24 !important;
        }
        .bg-emerald-400 {
            background-color: #34d399 !important;
        }
        .bg-yellow-400 {
            background-color: #fbbf24 !important;
        }
        .bg-orange-500 {
            background-color: #f97316 !important;
        }
        .bg-red-500 {
            background-color: #ef4444 !important;
        }
        .text-slate-800 {
            color: #1e293b !important;
        }
        .text-white {
            color: #ffffff !important;
        }
        .accent-emerald-400 {
            accent-color: #34d399 !important;
        }
    </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white p-5">
    <div class="max-w-3xl mx-auto">
        ${documentContent}
    </div>
    
    <!-- Disclaimer Section -->
    <div style="background:#1E2A38; border-top:1px solid #334155; padding:16px 24px; width: 100%; margin-top: 40px;">
        <p style="font-size:12px; color:#9CA3AF; text-align:center; line-height:1.6;">
            <strong style="color:#D1D5DB;">Disclaimer:</strong> This template is for business use only and does not
            constitute legal advice. Stacked Technologies, LLC is not a law firm. Users are responsible for
            confirming compliance with all applicable local, state, and federal laws.
        </p>
    </div>
</body>
</html>`;

              // Create and download the file
              const blob = new Blob([htmlContent], { type: 'text/html' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${templateKey}-document-${new Date().toISOString().split('T')[0]}.html`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);

              setSuccessMessage('Document template downloaded successfully!');
              setTimeout(() => setSuccessMessage(null), 3000);
            } catch (error) {
              console.error('Error downloading document template:', error);
              setError('Failed to download document template. Please try again.');
            }
          }, 200); // Additional delay for iframe content
        } catch (error) {
          console.error('Error downloading document template:', error);
          setError('Failed to download document template. Please try again.');
        }
      }, 100); // Small delay to ensure React state is updated
    } catch (error) {
      console.error('Error downloading document template:', error);
      setError('Failed to download document template. Please try again.');
    }
  };

  const handlePrintDocumentTemplate = (templateKey) => {
    try {
      // Small delay to ensure all React state changes are rendered
      setTimeout(() => {
        try {
          // Force all inputs to update their values before capture
          const allInputs = document.querySelectorAll('.document-template-container input, .document-template-container textarea, .document-template-container select');
          allInputs.forEach(input => {
            // Trigger change events to ensure React state is updated
            input.dispatchEvent(new Event('change', { bubbles: true }));
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('blur', { bubbles: true }));
          });

          // Additional delay to ensure all updates are processed
          setTimeout(() => {
            try {
              // Force a final sync of all input values
              const templateContainer = document.querySelector('.document-template-container');
              if (templateContainer) {
                // Force all inputs to show their current values
                const allInputs = templateContainer.querySelectorAll('input, textarea, select');
                allInputs.forEach(input => {
                  // Ensure the input shows its current value
                  if (input.type === 'text' || input.type === 'email' || input.type === 'tel' || input.type === 'number') {
                    input.setAttribute('value', input.value);
                  }
                });
              }

              // Try enhanced iframe content capture first, fallback to regular capture
              let documentContent;
              try {
                documentContent = captureIframeContent();
              } catch (error) {
                console.log('Falling back to regular capture:', error);
                documentContent = captureDocumentContent();
              }

              // Create a new window for printing
              const printWindow = window.open('', '_blank', 'width=800,height=600');

              // Create the print content with proper styling
              const printContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Print ${templateKey} Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @media print {
            .no-print { display: none !important; }
            body { 
                margin: 0; 
                background: linear-gradient(to bottom right, #1e293b, #0c4a6e) !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .page-break { page-break-before: always; }
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
        /* Ensure exact background colors are preserved */
        .bg-gradient-to-br {
            background: linear-gradient(to bottom right, #1e293b, #0c4a6e) !important;
        }
        .bg-white\/10 {
            background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .border-white\/20 {
            border-color: rgba(255, 255, 255, 0.2) !important;
        }
        .border-white\/30 {
            border-color: rgba(255, 255, 255, 0.3) !important;
        }
        .text-emerald-400 {
            color: #34d399 !important;
        }
        .text-yellow-400 {
            color: #fbbf24 !important;
        }
        .bg-emerald-400 {
            background-color: #34d399 !important;
        }
        .bg-yellow-400 {
            background-color: #fbbf24 !important;
        }
        .bg-orange-500 {
            background-color: #f97316 !important;
        }
        .bg-red-500 {
            background-color: #ef4444 !important;
        }
        .text-slate-800 {
            color: #1e293b !important;
        }
        .text-white {
            color: #ffffff !important;
        }
        .accent-emerald-400 {
            accent-color: #34d399 !important;
        }
    </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white p-5">
    <div class="max-w-3xl mx-auto">
        ${documentContent}
    </div>
    
    <!-- Disclaimer Section -->
    <div style="background:#1E2A38; border-top:1px solid #334155; padding:16px 24px; width: 100%; margin-top: 40px;">
        <p style="font-size:12px; color:#9CA3AF; text-align:center; line-height:1.6;">
            <strong style="color:#D1D5DB;">Disclaimer:</strong> This template is for business use only and does not
            constitute legal advice. Stacked Technologies, LLC is not a law firm. Users are responsible for
            confirming compliance with all applicable local, state, and federal laws.
        </p>
    </div>
</body>
</html>`;

              printWindow.document.write(printContent);
              printWindow.document.close();

              // Wait for content to load, then trigger print
              printWindow.onload = () => {
                printWindow.focus();
                printWindow.print();
                printWindow.close();
              };

              setSuccessMessage('Print dialog opened successfully!');
              setTimeout(() => setSuccessMessage(null), 3000);
            } catch (error) {
              console.error('Error printing document template:', error);
              setError('Failed to print document template. Please try again.');
            }
          }, 200); // Additional delay for iframe content
        } catch (error) {
          console.error('Error printing document template:', error);
          setError('Failed to print document template. Please try again.');
        }
      }, 100); // Small delay to ensure React state is updated
    } catch (error) {
      console.error('Error printing document template:', error);
      setError('Failed to print document template. Please try again.');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAssignDropdown && !event.target.closest('.dropdown-container')) {
        setShowAssignDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAssignDropdown]);


  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setEmailForm({
      to: '',
      subject: template.subject,
      content: template.content,
      variables: template.variables.reduce((acc, variable) => {
        acc[variable] = '';
        return acc;
      }, {})
    });
    setError(null);
    setSuccessMessage(null);
  };

  const handleVariableChange = (variable, value) => {
    setEmailForm(prev => ({
      ...prev,
      variables: {
        ...prev.variables,
        [variable]: value
      }
    }));
  };

  const processTemplate = (text, variables) => {
    let processed = text;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processed = processed.replace(regex, value || `{{${key}}}`);
    });
    return processed;
  };

  const handleSendEmail = async () => {
    if (!emailForm.to || !selectedTemplate) {
      setError('Please fill in the recipient email address');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailForm.to)) {
      setError('Please enter a valid email address');
      return;
    }

    setError(null);
    setSuccessMessage(null);

    try {
      await sendEmailTemplate({
        templateId: selectedTemplate.id,
        recipientEmail: emailForm.to,
        variables: emailForm.variables
      });

      setSuccessMessage('Email sent successfully!');
      // Reset form after successful send
      setTimeout(() => {
        setSelectedTemplate(null);
        setEmailForm({ to: '', subject: '', content: '', variables: {} });
        setSuccessMessage(null);
      }, 2000);
    } catch (err) {
      // Handle different error formats
      let errorMessage = 'Failed to send email. Please try again.';

      if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      setError(errorMessage);
      console.error('Error sending email:', err);
    }
  };

  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
    setEmailForm({ to: '', subject: '', content: '', variables: {} });
    setError(null);
    setSuccessMessage(null);
  };

  const handleBackToCategories = () => {
    setSelectedEmailCategory(null);
    setError(null);
    setSuccessMessage(null);
  };

  const handleBackToDocuments = () => {
    setShowEmailTemplates(false);
    setSelectedEmailCategory(null);
    setSelectedTemplate(null);
    setError(null);
    setSuccessMessage(null);
  };

  // Error display component
  const ErrorMessage = ({ message, onClose }) => (
    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <p className="text-red-400 text-sm">{message}</p>
        {onClose && (
          <button onClick={onClose} className="text-red-400 hover:text-red-300 ml-2">
            ×
          </button>
        )}
      </div>
    </div>
  );

  // Success message component
  const SuccessMessage = ({ message, onClose }) => (
    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <p className="text-green-400 text-sm">{message}</p>
        {onClose && (
          <button onClick={onClose} className="text-green-400 hover:text-green-300 ml-2">
            ×
          </button>
        )}
      </div>
    </div>
  );

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="w-6 h-6 animate-spin text-teal-400" />
      <span className="ml-2 text-gray-400">Loading...</span>
    </div>
  );

  // Email Template Composition View
  if (showEmailTemplates && selectedTemplate) {
    return (
      <div className="min-h-screen p-4 bg-slate-800 text-slate-100 font-sans">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={handleBackToTemplates}
              className="mr-4 p-2 hover:bg-slate-700 rounded-md"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{selectedTemplate.title}</h1>
              <p className="text-gray-400">Compose and send email</p>
            </div>
          </div>

          {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
          {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />}

          {/* Email Composition Form */}
          <div className="bg-slate-700 rounded-lg p-6">
            {/* Variables Section */}
            {selectedTemplate.variables && selectedTemplate.variables.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Template Variables</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTemplate.variables.map(variable => (
                    <div key={variable}>
                      <label className="block text-sm font-medium mb-2 capitalize">{variable.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                      <input
                        type="text"
                        value={emailForm.variables[variable] || ''}
                        onChange={(e) => handleVariableChange(variable, e.target.value)}
                        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md focus:outline-none focus:border-teal-400"
                        placeholder={`Enter ${variable}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Email Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">To *</label>
                <input
                  type="email"
                  value={emailForm.to}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md focus:outline-none focus:border-teal-400"
                  placeholder="recipient@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={processTemplate(emailForm.subject, emailForm.variables)}
                  className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md focus:outline-none focus:border-teal-400"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message Preview</label>
                <textarea
                  value={processTemplate(emailForm.content, emailForm.variables)}
                  rows={12}
                  className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md focus:outline-none focus:border-teal-400"
                  readOnly
                />
              </div>
            </div>

            {/* Send Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSendEmail}
                disabled={!emailForm.to || sending}
                className="bg-teal-400 text-slate-800 rounded-md px-6 py-2 font-medium hover:bg-teal-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Email Templates List View (by category)
  if (showEmailTemplates && selectedEmailCategory) {
    const categoryTemplates = getTemplatesByCategory(selectedEmailCategory);

    return (
      <div className="min-h-screen p-4 bg-slate-800 text-slate-100 font-sans">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={handleBackToCategories}
              className="mr-4 p-2 hover:bg-slate-700 rounded-md"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{selectedEmailCategory}</h1>
              <p className="text-gray-400">Choose a template to customize and send</p>
            </div>
          </div>

          {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

          {/* Templates List */}
          <div className="space-y-4">
            {categoryTemplates.map((template, index) => (
              <div
                key={template.id || index}
                className="bg-[var(--dark-bg)] rounded-lg p-4 hover:bg-slate-600 cursor-pointer transition-colors"
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">Subject: {template.subject}</p>
                    <p className="text-sm text-gray-300 line-clamp-3">
                      {template.content.substring(0, 200)}...
                    </p>
                    {template.variables && template.variables.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-400 mb-1">Variables:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.variables.map(variable => (
                            <span
                              key={variable}
                              className="inline-block bg-slate-600 text-xs px-2 py-1 rounded"
                            >
                              {variable}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <Mail className="w-5 h-5 text-[var(--primary-color)]" />
                  </div>
                </div>
              </div>
            ))}

            {categoryTemplates.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-50 text-[var(--primary-color)]" />
                <p>No templates found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Email Categories View
  if (showEmailTemplates) {
    const displayError = templatesError?.data?.message || templatesError?.message || error;

    return (
      <div className="min-h-[600px] p-4 bg-[var(--dark-bg)] text-slate-100 font-sans">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={handleBackToDocuments}
              className="mr-4 p-2 hover:bg-slate-700 hover:text-[var(--primary-color)] rounded-md"
            >
              <ArrowLeft className="w-5 h-5 " />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Email Templates</h1>
              <p className="text-gray-400">Choose a category to get started</p>
            </div>
            <button
              onClick={() => refetchTemplates()}
              disabled={templatesLoading}
              className="bg-slate-600 text-slate-100 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-500 disabled:opacity-50"
            >
              {templatesLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Refresh'}
            </button>
          </div>

          {displayError && <ErrorMessage message={displayError} onClose={() => setError(null)} />}

          {templatesLoading ? (
            <LoadingSpinner />
          ) : (
            /* Email Categories */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emailCategories.map(category => {
                const categoryTemplates = getTemplatesByCategory(category);
                const categoryName = category.replace(' Templates', '');

                return (
                  <div
                    key={category}
                    className="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 cursor-pointer transition-colors"
                    onClick={() => setSelectedEmailCategory(category)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Mail className="w-8 h-8 text-teal-400" />
                      <span className="text-sm text-gray-400">{categoryTemplates.length} templates</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{categoryName}</h3>
                    <p className="text-sm text-gray-400">
                      {category.includes('Lead') && 'Templates for initial contact and follow-up with potential clients'}
                      {category.includes('Buyer') && 'Communication templates for working with home buyers'}
                      {category.includes('Seller') && 'Templates for listing consultations and seller communication'}
                      {category.includes('Transaction') && 'Templates for managing active transactions and offers'}
                      {category.includes('Follow') && 'Post-transaction and relationship maintenance templates'}
                      {category.includes('Seasonal') && 'Holiday and seasonal marketing templates'}
                      {!['Lead', 'Buyer', 'Seller', 'Transaction', 'Follow', 'Seasonal'].some(keyword => category.includes(keyword)) && 'Professional email templates for your business needs'}
                    </p>
                  </div>
                );
              })}

              {emailCategories.length === 0 && !templatesLoading && (
                <div className="col-span-2 text-center text-gray-400 py-8">
                  <Mail className="w-12 h-12 mx-auto mb-4  text-[var(--primary-color)]" />
                  <p>No email templates found.</p>
                  <button
                    onClick={() => refetchTemplates()}
                    className="mt-4 bg-teal-400 text-slate-800 rounded-md px-4 py-2 text-sm font-medium hover:bg-teal-300"
                  >
                    Retry Loading
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show Email Templates View
  if (showEmailTemplatesView) {
    return (
      <div className="min-h-screen bg-[var(--dark-bg)]">
        <div className="p-4">
          <button
            onClick={() => setShowEmailTemplatesView(false)}
            className="ml-2 mt-2 p-2 bg-[var(--primary-color)] text-slate-800 rounded-md hover:bg-[var(--primary-color)]/90 flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Documents</span>
          </button>
        </div>
        <EmailTemplates />
      </div>
    );
  }

  // Show Trash View
  if (showTrashView) {
    return (
      <div className="min-h-[400px] p-4 bg-[var(--dark-bg)] text-slate-100 font-sans">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setShowTrashView(false)}
            className="mr-4 p-2 hover:bg-slate-700 rounded-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center">
              <Trash2 className="w-6 h-6 mr-2 text-red-400" />
              Trash
            </h1>
            <p className="text-gray-400">Manage deleted documents</p>
          </div>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 bg-green-600/10 border border-green-600/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <p className="text-green-400 text-sm">{successMessage}</p>
              <button onClick={() => setSuccessMessage(null)} className="text-green-400 hover:text-green-300 ml-2">
                ×
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-600/10 border border-red-600/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <p className="text-red-400 text-sm">{error}</p>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300 ml-2">
                ×
              </button>
            </div>
          </div>
        )}

        {/* Trashed Documents List */}
        <div className="bg-[var(--medium-dark)] rounded-lg p-4 space-y-2">
          {trashedDocsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-teal-400" />
            </div>
          ) : trashedDocuments.length > 0 ? (
            trashedDocuments.map((doc) => (
              <div key={doc._id} className="flex items-center bg-[var(--lighter-dark)] hover:bg-[var(--medium-dark)] rounded-md p-4">
                <div className="file-icon mr-4">
                  {getFileIcon(doc.fileType)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-slate-300 line-through">{doc.originalFileName}</span>
                    {doc.source && (
                      <span className={`flex items-center text-xs font-medium px-1.5 py-0.5 rounded-full ml-2 ${getSourceBadgeClass(doc.source)}`}>
                        {doc.source}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    Deleted {new Date(doc.trashedAt || doc.updatedAt).toLocaleDateString()} • {doc.address}
                    {doc.assignedClient && (
                      <span className="ml-2 text-teal-400">
                        • Was assigned to {getClientNameById(doc.assignedClient)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDownloadDocument(doc)}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-600/20 border border-blue-600/30 rounded-md hover:bg-blue-600/30 transition-colors"
                    title="Download Document"
                  >
                    <Download className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-blue-400 font-medium">Download</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowRestoreConfirmModal(doc._id);
                    }}
                    disabled={restoringDocId === doc._id}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-600/20 border border-green-600/30 rounded-md hover:bg-green-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {restoringDocId === doc._id ? (
                      <Loader2 className="w-4 h-4 text-green-400 animate-spin" />
                    ) : (
                      <RotateCcw className="w-4 h-4 text-green-400" />
                    )}
                    <span className="text-sm text-green-400 font-medium">
                      {restoringDocId === doc._id ? 'Restoring...' : 'Restore'}
                    </span>
                  </button>
                  {/* <button
                    onClick={() => setShowDeleteConfirmModal(doc._id)}
                    disabled={isDeleting}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-600/20 border border-red-600/30 rounded-md hover:bg-red-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? (
                      <Loader2 className="w-4 h-4 text-red-400 animate-spin" />
                    ) : (
                      <Trash className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-sm text-red-400 font-medium">
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </span>
                  </button> */}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              <Trash2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No documents in trash.</p>
            </div>
          )}
        </div>

        {/* Restore Confirmation Modal - Inside Trash View */}
        {showRestoreConfirmModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[var(--medium-dark)] rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center mr-3">
                  <RotateCcw className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">Restore Document</h3>
                  <p className="text-sm text-gray-400">Document will be restored to main view</p>
                </div>
              </div>

              <p className="text-slate-200 mb-6">
                Are you sure you want to restore this document? It will be moved back to your main documents view and will be accessible again.
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowRestoreConfirmModal(null)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-slate-100 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleRestoreFromTrash(showRestoreConfirmModal);
                  }}
                  disabled={restoringDocId === showRestoreConfirmModal}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {restoringDocId === showRestoreConfirmModal ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RotateCcw className="w-4 h-4 mr-2" />
                  )}
                  {restoringDocId === showRestoreConfirmModal ? 'Restoring...' : 'Restore Document'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main Documents View
  return (
    <div className="min-h-[400px] p-4 bg-[var(--dark-bg)] text-slate-100 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-gray-400">Manage and link your cloud files</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowTrashView(true)}
            className="ring ring-red-500/50 text-red-400 rounded-md px-4 py-2 text-sm font-medium hover:bg-red-500/10 hover:text-red-300 flex items-center space-x-1"
          >
            <Trash2 className="w-5 h-5" />
            <span>Trash</span>
            {trashedDocuments.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">
                {trashedDocuments.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowEmailTemplatesView(true)}
            className="ring ring-[var(--primary-color)] text-[var(--primary-color)] rounded-md px-4 py-2 text-sm font-medium hover:bg-[var(--primary-color)] hover:text-gray-800 flex items-center space-x-1"
          >
            <Mail className="w-5 h-5" />
            <span>Email Templates</span>
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-[var(--primary-color)] text-slate-800 rounded-md px-4 py-2 text-sm font-medium hover:bg-[var(--primary-color)]/90 flex items-center space-x-1"
          >
            <Upload className="w-5 h-5" />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-4 bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-400 text-sm">{successMessage}</p>
            <button onClick={() => setSuccessMessage(null)} className="text-green-400 hover:text-green-300 ml-2">
              ×
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-red-400 text-sm">{error}</p>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300 ml-2">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeCategory === 'all'
            ? 'bg-[var(--medium-dark)] text-teal-400'
            : 'bg-[var(--lighter-dark)]  text-slate-100 hover:bg-[var(--medium-dark)] '
            }`}
        >
          All Documents
        </button>
        <button
          onClick={() => setActiveCategory('contracts')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeCategory === 'contracts'
            ? 'bg-[var(--medium-dark)] text-teal-400'
            : 'bg-[var(--lighter-dark)]  text-slate-100 hover:bg-[var(--medium-dark)] '
            }`}
        >
          Contracts
        </button>
        <button
          onClick={() => setActiveCategory('photos')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeCategory === 'photos'
            ? 'bg-[var(--medium-dark)] text-teal-400'
            : 'bg-[var(--lighter-dark)]  text-slate-100 hover:bg-[var(--medium-dark)] '
            }`}
        >
          Photos
        </button>
        <button
          onClick={() => setActiveCategory('inspection-reports')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeCategory === 'inspection-reports'
            ? 'bg-[var(--medium-dark)] text-teal-400'
            : 'bg-[var(--lighter-dark)]  text-slate-100 hover:bg-[var(--medium-dark)] '
            }`}
        >
          Inspection Reports
        </button>
      </div>

      {/* Cloud File Linking Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Property Documents</h2>

        {/* Cloud-Linked Files List */}
        <div className="bg-[var(--medium-dark)] rounded-lg p-4 space-y-2">
          {docsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-teal-400" />
            </div>
          ) : filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <div key={doc._id} className="flex items-center bg-[var(--lighter-dark)] hover:bg-[var(--medium-dark)] rounded-md p-2">
                <div className="file-icon mr-2">
                  {getFileIcon(doc.fileType)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <a href={doc.url} target="_blank" rel="noreferrer" className="text-slate-100 underline-offset-2 hover:underline">{doc.originalFileName}</a>
                    {doc.source && (
                      <span className={`flex items-center text-xs font-medium px-1.5 py-0.5 rounded-full ml-2 ${getSourceBadgeClass(doc.source)}`}>
                        {doc.source}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    Added {new Date(doc.createdAt).toLocaleDateString()} • {doc.address}
                    {doc.assignedClient && (
                      <span className="ml-2 text-teal-400">
                        • Assigned to {getClientNameById(doc.assignedClient)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative dropdown-container">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownloadDocument(doc)}
                      className="text-gray-400 hover:text-blue-400 p-1 transition-colors"
                      title="Download Document"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    {doc.assignedClient ? (
                      <button
                        onClick={() => toggleAssignDropdown(doc._id)}
                        className="flex items-center space-x-2 px-3 py-1 bg-teal-400/10 border border-teal-400/20 rounded-md hover:bg-teal-400/20 transition-colors"
                      >
                        <User className="w-4 h-4 text-teal-400" />
                        <span className="text-sm text-teal-400 font-medium">
                          {getClientNameById(doc.assignedClient)}
                        </span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setShowMoveToTrashModal(doc._id)}
                          disabled={movingToTrashDocId === doc._id}
                          className="text-gray-400 hover:text-red-400 p-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move to Trash"
                        >
                          {movingToTrashDocId === doc._id ? (
                            <Loader2 className="w-5 h-5 animate-spin text-red-400" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleAssignDropdown(doc._id)}
                          className="text-gray-400 hover:text-teal-300 p-1"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Assignment Dropdown */}
                  {showAssignDropdown === doc._id && (
                    <div className="absolute right-0 top-8 bg-[var(--medium-dark)] border border-slate-600 rounded-md shadow-lg z-10 min-w-48">
                      <div className="p-2">
                        {doc.assignedClient ? (
                          <div className="text-xs text-gray-400 mb-2 px-2">Reassign Document</div>
                        ) : (
                          <div className="text-xs text-gray-400 mb-2 px-2">Assign to Client</div>
                        )}
                        {clientsLoading ? (
                          <div className="flex justify-center py-2">
                            <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
                          </div>
                        ) : clients.length > 0 ? (
                          clients.map((client) => (
                            <button
                              key={client._id}
                              onClick={() => handleAssignToClient(doc._id, client._id)}
                              disabled={assigningDocumentClient === `${doc._id}-${client._id}`}
                              className="w-full text-left px-2 py-2 text-sm text-slate-100 hover:bg-[var(--lighter-dark)] rounded flex items-center space-x-2 disabled:opacity-50"
                            >
                              {assigningDocumentClient === `${doc._id}-${client._id}` ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <User className="w-4 h-4" />
                              )}
                              <div>
                                <div className="font-medium">{client.name}</div>
                                <div className="text-xs text-gray-400">{client.email}</div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="text-center text-gray-400 py-2 text-sm">
                            No clients found
                          </div>
                        )}
                        {doc.assignedClient && (
                          <div className="border-t border-slate-600 mt-2 pt-2">
                            <div className="text-xs text-gray-400 px-2 mb-1">Current Assignment</div>
                            <div className="px-2 py-1 text-sm text-green-400 flex items-center space-x-2 mb-2">
                              <Check className="w-4 h-4" />
                              <span>Assigned to {getClientNameById(doc.assignedClient)}</span>
                            </div>
                            <button
                              onClick={() => handleUnassignDocument(doc._id)}
                              disabled={assigningDocumentClient === doc._id || isUnassigning}
                              className="w-full text-left px-2 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded flex items-center space-x-2 disabled:opacity-50"
                            >
                              {assigningDocumentClient === doc._id || isUnassigning ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                              <span>Unassign Document</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              No documents found in this category.
            </div>
          )}
        </div>
      </div>
      {/* Unified Document Templates Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Document Templates & Professional Tools</h2>
        <div className="flex flex-wrap gap-3 mb-6">
          {[...documentPages, ...addOnPages, ...proPages].map((doc) => (
            <button
              key={doc.key}
              className={`relative px-4 py-2 rounded-md text-sm font-medium border transition-all ${selectedDocPage === doc.key ? 'bg-teal-400 text-slate-900 border-teal-400' : 'bg-[var(--lighter-dark)] text-slate-100 border-slate-700 hover:bg-[var(--medium-dark)]'}`}
              onClick={() => setSelectedDocPage(doc.key)}
            >
              {doc.title}
              {doc.pro && (
                <span className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 rounded bg-fuchsia-500 text-white border border-fuchsia-300">PRO</span>
              )}
              {!doc.pro && addOnKeys.has(doc.key) && (
                <span className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-black border border-amber-300">POWER</span>
              )}
            </button>
          ))}
        </div>
        <div className="bg-[var(--medium-dark)] rounded-lg p-4">
          {selectedDocPage && (
            <div>
              {/* Document Actions */}
              <div className="flex justify-end gap-3 mb-4">
                <button
                  onClick={() => handleDownloadDocumentTemplate(selectedDocPage)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-md hover:bg-blue-600/30 transition-colors"
                >
                  <Download className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400 font-medium">Download</span>
                </button>
                <button
                  onClick={() => handlePrintDocumentTemplate(selectedDocPage)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600/20 border border-green-600/30 rounded-md hover:bg-green-600/30 transition-colors"
                >
                  <FileText className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">Print</span>
                </button>
              </div>
              {/* Document Content */}
              <div className="document-template-container">
                {[...documentPages, ...addOnPages, ...proPages].find((doc) => doc.key === selectedDocPage)?.component}
              </div>
            </div>
          )}
          {!selectedDocPage && (
            <div className="text-center text-gray-400 py-8">
              Select a document template or professional tool to view.
            </div>
          )}
        </div>
      </div>


      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[var(--medium-dark)] rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-100">Upload Document</h3>
              <button
                onClick={closeUploadModal}
                className="text-gray-400 hover:text-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-100 mb-2">
                  File *
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-slate-600 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
                  required
                />
                {uploadForm.file && (
                  <p className="text-sm text-gray-400 mt-1">
                    Selected: {uploadForm.file.name}
                  </p>
                )}
              </div>

              {/* Document Type */}
              <div>
                <label className="block text-sm font-medium text-slate-100 mb-2">
                  Document Type *
                </label>
                <select
                  value={uploadForm.documentType}
                  onChange={(e) => handleUploadFormChange('documentType', e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-slate-600 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                >
                  <option value="">Select document type</option>
                  <option value="pdf">Pdf</option>
                  <option value="zip">Zip</option>
                  <option value="photos">Photo</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-slate-100 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={uploadForm.address}
                  onChange={(e) => handleUploadFormChange('address', e.target.value)}
                  placeholder="123 Main St, City, State"
                  className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-slate-600 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>

              {/* Source */}
              <div>
                <label className="block text-sm font-medium text-slate-100 mb-2">
                  Source
                </label>
                <input
                  type="text"
                  value={uploadForm.source}
                  onChange={(e) => handleUploadFormChange('source', e.target.value)}
                  placeholder="e.g., County Records, MLS, etc."
                  className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-slate-600 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Assignee */}
              <div>
                <label className="block text-sm font-medium text-slate-100 mb-2">
                  Assign to Client
                </label>
                <select
                  value={uploadForm.assignee}
                  onChange={(e) => handleUploadFormChange('assignee', e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-slate-600 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="">Select a client (optional)</option>
                  {clientsLoading ? (
                    <option value="" disabled>Loading clients...</option>
                  ) : clients.length > 0 ? (
                    clients.map((client) => (
                      <option key={client._id} value={client._id}>
                        {client.name} - {client.email}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No clients found</option>
                  )}
                </select>
                {uploadForm.assignee && (
                  <p className="text-sm text-teal-400 mt-1">
                    Document will be assigned to: {clients.find(c => c._id === uploadForm.assignee)?.name}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-400 text-sm">{error}</div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="text-green-400 text-sm">{successMessage}</div>
              )}

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeUploadModal}
                  className="flex-1 px-4 py-2 bg-gray-600 text-slate-100 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-4 py-2 bg-[var(--primary-color)] text-slate-800 rounded-md hover:bg-[var(--primary-color)]/90 disabled:opacity-50 flex items-center justify-center"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : (
                    'Upload'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permanent Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[var(--medium-dark)] rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center mr-3">
                <Trash className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">Permanently Delete Document</h3>
                <p className="text-sm text-gray-400">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-slate-200 mb-6">
              Are you sure you want to permanently delete this document? This action cannot be undone and the document will be completely removed from your system.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirmModal(null)}
                className="flex-1 px-4 py-2 bg-gray-600 text-slate-100 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePermanentlyDelete(showDeleteConfirmModal)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Trash className="w-4 h-4 mr-2" />
                )}
                {isDeleting ? 'Deleting...' : 'Delete Forever'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Move to Trash Confirmation Modal */}
      {showMoveToTrashModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[var(--medium-dark)] rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-600/20 rounded-full flex items-center justify-center mr-3">
                <Trash2 className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">Move to Trash</h3>
                <p className="text-sm text-gray-400">Document will be moved to trash</p>
              </div>
            </div>

            <p className="text-slate-200 mb-6">
              Are you sure you want to move this document to trash? You can restore it later from the trash view.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowMoveToTrashModal(null)}
                className="flex-1 px-4 py-2 bg-gray-600 text-slate-100 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleMoveToTrash(showMoveToTrashModal);
                }}
                disabled={movingToTrashDocId === showMoveToTrashModal}
                className="flex-1 px-4 py-2 bg-[#1EB8BA] text-white rounded-md hover:bg-[#1EB8BA] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {movingToTrashDocId === showMoveToTrashModal ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                {movingToTrashDocId === showMoveToTrashModal ? 'Moving...' : 'Move to Trash'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DocumentManagementSystem;

