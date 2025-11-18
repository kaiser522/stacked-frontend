import React from 'react';
import { Building, Search, Heart, Filter, MapPin, DollarSign, Calendar, Users } from 'lucide-react';

const PropertiesHelp = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#34495e] to-[#2c3e50] text-white p-8 rounded-xl mb-8 text-center border border-[#00d4aa]">
                <div className="flex items-center justify-center space-x-3 mb-3">
                    <Building className="w-8 h-8 text-[#00d4aa]" />
                    <h1 className="text-4xl font-bold text-[#00d4aa]">🏠Properties</h1>
                </div>
                <p className="text-lg opacity-90">Search and manage property listings</p>
            </div>

            {/* What is Properties Section */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    What is the Properties Section?
                </h2>
                <p className="text-[#e1e5e9] mb-4 text-base">
                    The Properties section is your comprehensive property management hub where you can view, search, add, edit, and organize all property listings. This section provides three main views to help you manage different aspects of your property portfolio effectively.
                </p>
                <p className="text-[#e1e5e9] text-base">
                    Whether you're browsing the entire market, managing your own listings, or tracking your favorite properties, this section gives you all the tools you need to stay organized and efficient.
                </p>
            </div>

            {/* Three Main Views */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Three Main Views
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    <div className="bg-[#2c3e50] p-5 rounded-lg border-2 border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <h4 className="text-[#00d4aa] mb-2 font-semibold">All Properties</h4>
                        <p className="text-[#b8c5d1] text-sm">Browse the complete market inventory</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border-2 border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <h4 className="text-[#00d4aa] mb-2 font-semibold">My Listings</h4>
                        <p className="text-[#b8c5d1] text-sm">Manage your active property listings</p>
                    </div>

                    <div className="bg-[#2c3e50] p-5 rounded-lg border-2 border-[#485e73] transition-all duration-300 hover:border-[#00d4aa] hover:transform hover:-translate-y-1">
                        <h4 className="text-[#00d4aa] mb-2 font-semibold">Favorites</h4>
                        <p className="text-[#b8c5d1] text-sm">Access your saved favorite properties</p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4 mt-8">View Descriptions</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">All Properties:</strong> Browse the complete market inventory with advanced search and filtering capabilities
                    </li>
                    <li className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">My Listings:</strong> Manage your active property listings, track performance, and handle listing updates
                    </li>
                    <li className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">Favorites:</strong> Access your saved favorite properties for quick reference and client recommendations
                    </li>
                </ul>
            </div>

            {/* Search and Filter Features */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Search and Filter Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Search className="w-5 h-5 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Advanced Search</h4>
                        </div>
                        <ul className="space-y-2 ml-8">
                            <li className="text-[#e1e5e9] text-sm">Search by address, city, or zip code</li>
                            <li className="text-[#e1e5e9] text-sm">Filter by price range, bedrooms, bathrooms</li>
                            <li className="text-[#e1e5e9] text-sm">Property type and square footage filters</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Filter className="w-5 h-5 text-[#00d4aa]" />
                            <h4 className="text-[#00d4aa] font-semibold">Smart Filters</h4>
                        </div>
                        <ul className="space-y-2 ml-8">
                            <li className="text-[#e1e5e9] text-sm">Date listed and market status</li>
                            <li className="text-[#e1e5e9] text-sm">Amenities and special features</li>
                            <li className="text-[#e1e5e9] text-sm">Location-based filtering</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Property Cards Layout */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Property Cards Layout
                </h2>

                <div className="bg-[#2c3e50] p-6 rounded-lg border border-[#485e73] mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-[#00d4aa]" />
                                <span className="text-[#e1e5e9] font-semibold">123 Main Street, City, State</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <DollarSign className="w-4 h-4 text-[#00d4aa]" />
                                <span className="text-[#e1e5e9] font-semibold">$450,000</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-[#00d4aa]" />
                                <span className="text-[#e1e5e9]">Listed 5 days ago</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Building className="w-4 h-4 text-[#00d4aa]" />
                                <span className="text-[#e1e5e9]">3 bed • 2 bath • 1,500 sqft</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-[#00d4aa]" />
                                <span className="text-[#e1e5e9]">Agent: John Smith</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Heart className="w-4 h-4 text-[#00d4aa]" />
                                <span className="text-[#e1e5e9]">Add to Favorites</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Property Card Information</h3>
                <ul className="space-y-2">
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Property Details:</strong> Address, price, bedrooms, bathrooms, square footage</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Listing Information:</strong> Date listed, market status, agent details</span>
                    </li>
                    <li className="text-[#e1e5e9] flex items-start space-x-2">
                        <span className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-[#00d4aa]">Quick Actions:</strong> View details, add to favorites, contact agent</span>
                    </li>
                </ul>
            </div>

            {/* Tips and Best Practices */}
            <div className="bg-[#34495e] p-8 rounded-xl mb-6 shadow-lg border border-[#485e73]">
                <h2 className="text-2xl font-bold text-[#00d4aa] mb-5 border-b-3 border-[#00d4aa] pb-3">
                    Tips and Best Practices
                </h2>

                <div className="bg-[#1e3d59] border-l-4 border-[#00d4aa] p-4 rounded mb-6">
                    <p className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">💡 Pro Tip:</strong> Use the search and filter features to quickly find properties that match your clients' specific criteria. Save time by setting up saved searches for common requirements.
                    </p>
                </div>

                <h3 className="text-xl font-semibold text-[#00d4aa] mb-4">Efficient Property Management</h3>
                <ul className="space-y-3">
                    <li className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">Regular Updates:</strong> Keep your listings current with accurate photos and descriptions
                    </li>
                    <li className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">Market Analysis:</strong> Use the All Properties view to research comparable listings and pricing
                    </li>
                    <li className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">Client Recommendations:</strong> Save interesting properties to Favorites for quick client recommendations
                    </li>
                    <li className="text-[#e1e5e9]">
                        <strong className="text-[#00d4aa]">Performance Tracking:</strong> Monitor your listings' performance in the My Listings view
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PropertiesHelp;
