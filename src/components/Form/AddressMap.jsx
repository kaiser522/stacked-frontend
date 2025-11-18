import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const AddressMap = ({ onAddressSelect, initialAddress = "" }) => {
    const [address, setAddress] = useState(initialAddress);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    // Debounced search function
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (address.trim().length > 2) {
                searchAddresses(address);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [address]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const searchAddresses = async (query) => {
        if (!query.trim()) return;

        setIsLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
            );
            const data = await response.json();

            setSuggestions(data);
            setShowSuggestions(data.length > 0);
        } catch (error) {
            console.error('Error searching addresses:', error);
            setSuggestions([]);
            setShowSuggestions(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddressChange = (e) => {
        const newAddress = e.target.value;
        setAddress(newAddress);
        setIsSelected(false); // Reset selected state when user types
        onAddressSelect(newAddress, null, null);
    };

    const handleSuggestionClick = (suggestion) => {
        setAddress(suggestion.display_name);
        setShowSuggestions(false);
        setSuggestions([]); // Clear suggestions after selection
        setIsSelected(true); // Mark as selected
        onAddressSelect(suggestion.display_name, suggestion.lat, suggestion.lon);

        // Console log the selected location details
        console.log('📍 Selected Location:', {
            name: suggestion.display_name,
            latitude: suggestion.lat,
            longitude: suggestion.lon,
            coordinates: `${suggestion.lat}, ${suggestion.lon}`
        });

        // Force hide dropdown by removing focus from input
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    return (
        <div className="relative">
            {/* Address Input */}
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Enter property address..."
                    className="w-full border p-3 pl-10 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                    onFocus={() => {
                        // Only show suggestions if we have suggestions and user is actively typing
                        if (suggestions.length > 0 && address.trim().length > 2 && !address.includes(suggestions[0]?.display_name)) {
                            setShowSuggestions(true);
                        }
                    }}
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                {isLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--primary-color)]"></div>
                    </div>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && !isSelected && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                >
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 focus:bg-gray-50 focus:outline-none"
                        >
                            <div className="font-medium text-gray-900 truncate">
                                {suggestion.display_name.split(',')[0]}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                                {suggestion.display_name}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddressMap;
