import React from 'react';
import { MapPin } from 'lucide-react';

const PropertyMap = ({ latitude, longitude, address, propertyName }) => {
    // Default coordinates (if none provided)
    const defaultLat = 40.7128;
    const defaultLng = -74.0060;

    const lat = parseFloat(latitude) || defaultLat;
    const lng = parseFloat(longitude) || defaultLng;

    // Create OpenStreetMap URL
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`;

    return (
        <div className="w-full h-80 rounded-lg overflow-hidden border border-[var(--primary-color)]/30">
            <div className="relative w-full h-full">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={mapUrl}
                    title="Property Location"
                    className="rounded-lg"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[var(--primary-color)]" />
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                                {propertyName || 'Property Location'}
                            </h4>
                            <p className="text-xs text-gray-600">
                                {address || 'Address not available'}
                            </p>
                            <p className="text-xs text-gray-500">
                                {lat.toFixed(6)}, {lng.toFixed(6)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyMap;
