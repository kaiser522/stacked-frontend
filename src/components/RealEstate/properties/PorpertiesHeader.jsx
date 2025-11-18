import React, { useState } from "react";
import { Plus, Upload, Download, X, AlertCircle, CheckCircle } from "lucide-react";
import PropertyForm from "../../Form/PropertyForm";

const PropertiesHeader = ({ properties = [], filteredProperties = [], onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const handleImportCSV = () => {
    setShowImportModal(true);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      alert('Please select a CSV file only.');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      return;
    }

    setUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('csvFile', file);

      console.log('Uploading file:', file.name, 'Size:', file.size);

      const response = await fetch('http://localhost:5001/api/v1/properties/upload-csv', {
        method: 'POST',
        body: formData,
        headers: {
          // Don't set Content-Type header - let browser set it with boundary for FormData
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your auth token here
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Check if response has content before trying to parse JSON
      const contentType = response.headers.get('content-type');
      let result;

      if (contentType && contentType.includes('application/json')) {
        try {
          result = await response.json();
        } catch (jsonError) {
          console.error('JSON parsing error:', jsonError);
          setUploadResult({
            success: false,
            message: 'Server returned invalid response format'
          });
          return;
        }
      } else {
        // Handle non-JSON responses (like HTML error pages)
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse);
        setUploadResult({
          success: false,
          message: `Server error: ${response.status} ${response.statusText}`
        });
        return;
      }

      if (response.ok) {
        setUploadResult({
          success: true,
          data: result.data,
          message: result.message
        });

        // Refresh properties after successful upload
        if (onRefresh && typeof onRefresh === 'function') {
          setTimeout(() => {
            onRefresh();
          }, 1000); // Small delay to ensure server has processed the upload
        }
      } else {
        setUploadResult({
          success: false,
          message: result.message || `Upload failed: ${response.status} ${response.statusText}`
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult({
        success: false,
        message: `Network error: ${error.message}`
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCloseImportModal = () => {
    setShowImportModal(false);
    setUploadResult(null);
  };

  const handleExportClick = () => {
    // Use filtered properties if available, otherwise use all properties
    const propertiesToExport = filteredProperties.length > 0 ? filteredProperties : properties;

    if (propertiesToExport.length === 0) {
      alert('No properties to export!');
      return;
    }

    setShowExportModal(true);
  };

  const handleConfirmExport = () => {
    // Use filtered properties if available, otherwise use all properties
    const propertiesToExport = filteredProperties.length > 0 ? filteredProperties : properties;

    // Define CSV headers
    const headers = [
      'Address',
      'City',
      'State',
      'Zip Code',
      'Price',
      'Beds',
      'Baths',
      'Square Feet',
      'Property Type',
      'Status',
      'Year Built',
      'Price per Sq Ft',
      'Views',
      'Days on Market',
      'Neighborhood',
      'Description'
    ];

    // Convert properties to CSV rows
    const csvRows = propertiesToExport.map(property => [
      property.address || '',
      property.city || '',
      property.state || '',
      property.zipCode || '',
      property.price || '',
      property.beds || '',
      property.baths || '',
      property.sqft || '',
      property.type || '',
      property.status || '',
      property.yearBuilt || '',
      property.pricePerSqft || Math.round((property.price || 0) / (property.sqft || 1)) || '',
      property.views || 0,
      property.daysOnMarket || 0,
      property.neighborhood || '',
      property.description || ''
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...csvRows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);

    // Set filename based on whether it's filtered or all properties
    const isFiltered = filteredProperties.length > 0 && filteredProperties.length !== properties.length;
    const filename = isFiltered
      ? `properties_filtered_${filteredProperties.length}_items_${new Date().toISOString().split('T')[0]}.csv`
      : `properties_all_${propertiesToExport.length}_items_${new Date().toISOString().split('T')[0]}.csv`;

    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success message
    const message = isFiltered
      ? `Exported ${filteredProperties.length} filtered properties to CSV`
      : `Exported ${propertiesToExport.length} properties to CSV`;
    alert(message);

    setShowExportModal(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-300">Properties</h1>
          <p className="text-gray-400 mt-1">
            Search and manage property listings
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleImportCSV}
            className="bg-[var(--medium-dark)] hover:bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30 text-[var(--primary-color)] px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import CSV
          </button>
          <button
            onClick={handleExportClick}
            className="bg-[var(--medium-dark)] hover:bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30 text-[var(--primary-color)] px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/70 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {showForm ? "Close Form" : "Add Property"}
          </button>
        </div>
      </div>

      {/* Form shows below the header, not over your content */}
      {showForm && (
        <div className="mt-6">
          <PropertyForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {/* Export Confirmation Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--medium-dark)] rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-200">Confirm Export</h2>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-300 mb-2">
                {filteredProperties.length > 0 && filteredProperties.length !== properties.length
                  ? `Export ${filteredProperties.length} filtered properties to CSV?`
                  : `Export ${properties.length} properties to CSV?`
                }
              </p>
              <p className="text-gray-400 text-sm">
                The file will be downloaded to your default download folder.
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 border border-[var(--primary-color)]/30 text-[var(--primary-color)] rounded-lg hover:bg-[var(--lighter-dark)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExport}
                className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/70 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import CSV Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--medium-dark)] rounded-lg max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-200">Import Properties from CSV</h2>
              <button
                onClick={handleCloseImportModal}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!uploadResult ? (
              <div className="mb-6">
                <div className="bg-[var(--lighter-dark)] border-2 border-dashed border-[var(--primary-color)]/30 rounded-lg p-6 text-center mb-4">
                  <Upload className="w-12 h-12 text-[var(--primary-color)] mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">Upload your CSV file</p>
                  <p className="text-gray-400 text-sm mb-4">
                    File must be CSV format and less than 10MB
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="csvFileInput"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="csvFileInput"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${uploading
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/70 text-white'
                      }`}
                  >
                    <Upload className="w-4 h-4" />
                    {uploading ? 'Uploading...' : 'Choose CSV File'}
                  </label>
                </div>

                <div className="bg-[var(--lighter-dark)] rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">Required CSV Columns:</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                    <div>• address</div>
                    <div>• price</div>
                    <div>• beds</div>
                    <div>• baths</div>
                    <div>• sqft</div>
                    <div>• type</div>
                    <div>• yearBuilt</div>
                    <div>• status (optional)</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                {uploadResult.success ? (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <h3 className="text-green-400 font-semibold">Upload Successful!</h3>
                    </div>
                    <p className="text-gray-300 mb-2">{uploadResult.message}</p>
                    {uploadResult.data && (
                      <div className="text-sm text-gray-400">
                        <p>• Total processed: {uploadResult.data.totalProcessed}</p>
                        <p>• Successfully imported: {uploadResult.data.successCount}</p>
                        <p>• Errors: {uploadResult.data.errorCount}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <h3 className="text-red-400 font-semibold">Upload Failed</h3>
                    </div>
                    <p className="text-gray-300">{uploadResult.message}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCloseImportModal}
                className="px-4 py-2 border border-[var(--primary-color)]/30 text-[var(--primary-color)] rounded-lg hover:bg-[var(--lighter-dark)] transition-colors"
              >
                {uploadResult ? 'Close' : 'Cancel'}
              </button>
              {uploadResult && (
                <button
                  onClick={() => {
                    setUploadResult(null);
                    document.getElementById('csvFileInput').value = '';
                  }}
                  className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/70 text-white rounded-lg transition-colors"
                >
                  Upload Another File
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesHeader;
