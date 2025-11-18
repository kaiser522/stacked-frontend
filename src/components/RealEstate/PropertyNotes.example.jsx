import React from 'react';
import PropertyNotes from './PropertyNotes';

/**
 * Example usage of PropertyNotes component with API integration
 * 
 * This example shows how to use the PropertyNotes component
 * with the new backend API integration.
 */
const PropertyNotesExample = () => {
    // Example user data (in real app, this would come from auth context)
    const userId = "user123";
    const userRole = "real_estate"; // or "admin", "affiliate", "others"
    const propertyId = "property456";

    return (
        <div className="p-6 bg-[var(--medium-dark)] rounded-lg">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">
                Property Notes Example
            </h2>

            {/* PropertyNotes component with API integration */}
            <PropertyNotes
                userId={userId}
                userRole={userRole}
                propertyId={propertyId}
            />
        </div>
    );
};

export default PropertyNotesExample;
