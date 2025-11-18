import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUpdateUserProfileMutation } from "../../store/apis/user.api";
import { useGetAllAddonsQuery } from "../../store/apis/plans.api";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/RealEstate/ui/Card";
import { Button } from "../../components/RealEstate/ui/Button";
import { Badge } from "../../components/RealEstate/ui/Badge";
import {
    User,
    Mail,
    Phone,
    Calendar,
    Shield,
    CreditCard,
    LogOut,
    Edit,
    Save,
    X,
    Eye,
    EyeOff,
    Settings as SettingsIcon,
    Building,
    MapPin,
    Globe,
    Clock,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { logoutUser } from "../../store/slices/user.slice";
import { getStorage } from "../../utils/localStorage";

function getUserIdFromStorage() {
    try {
        const raw = localStorage.getItem("__user__");
        if (!raw) return undefined;
        const parsed = JSON.parse(raw);
        return parsed ?? undefined;
    } catch {
        return undefined;
    }
}

function getRoleLabel(role) {
    switch (role) {
        case "admin":
            return "Administrator";
        case "affiliate":
            return "Affiliate Partner";
        case "real_estate":
            return "Real Estate Agent";
        case "others":
            return "Other User";
        default:
            return "User";
    }
}

function getPlanLabel(role) {
    switch (role) {
        case "real_estate":
            return "Real Estate CRM";
        case "wholesaler":
            return "Wholesaler CRM";
        case "probate":
            return "Probate CRM";
        case "flipper":
            return "Home Flipper CRM";
        default:
            return "CRM Access";
    }
}

const Settings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useMemo(() => getUserIdFromStorage(), []);
    const [updateUserProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();
    
    // Fetch all addons to match with user's selected addons
    const { data: addonsResponse, isLoading: addonsLoading } = useGetAllAddonsQuery();
    
    // Get user's selected addons details
    const userAddons = useMemo(() => {
        if (!user?.selectedAddOns || !addonsResponse?.data) return [];
        
        const addonMap = {};
        addonsResponse.data.forEach(addon => {
            addonMap[addon._id] = addon;
        });
        
        return user.selectedAddOns
            .map(addonId => {
                const addonIdStr = typeof addonId === 'object' ? addonId.toString() : addonId;
                return addonMap[addonIdStr];
            })
            .filter(Boolean);
    }, [user?.selectedAddOns, addonsResponse?.data]);
    
    // Calculate total monthly cost
    const totalMonthlyCost = useMemo(() => {
        const basePlanCost = 79; // Base plan cost
        const addonsCost = userAddons.reduce((sum, addon) => {
            const price = addon.billing_cycle === 'yearly' ? addon.price / 12 : addon.price;
            return sum + price;
        }, 0);
        return basePlanCost + addonsCost;
    }, [userAddons]);

    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        company: user?.company || "",
        address: user?.address || "",
        website: user?.website || "",
    });

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    const handleSave = async () => {
        try {
            const result = await updateUserProfile(formData).unwrap();
            
            // Update local storage with new user data
            const updatedUser = { ...user, ...formData };
            localStorage.setItem("__user__", JSON.stringify(updatedUser));
            
            toast.success("Profile updated successfully");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error?.data?.message || "Failed to update profile. Please try again.");
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            company: user?.company || "",
            address: user?.address || "",
            website: user?.website || "",
        });
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-300">User data not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 text-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-200">Settings</h1>
                    <p className="text-gray-400 mt-1">Manage your account and preferences</p>
                </div>
                <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="border-none text-red-400 ring-1 ring-red-400/70 cursor-pointer hover:ring-red-400 hover:bg-red-400/10"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Information */}
                    <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]/30">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-gray-200 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Profile Information
                            </CardTitle>
                            {!isEditing ? (
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(true)}
                                    className="border-none text-gray-300 ring-1 ring-[var(--primary-color)]/70 cursor-pointer hover:ring-[var(--primary-color)]"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={handleSave}
                                        disabled={isUpdating}
                                        className="border-none text-green-400 ring-1 ring-green-400/70 cursor-pointer hover:ring-green-400 disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        {isUpdating ? 'Saving...' : 'Save'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleCancel}
                                        className="border-none text-gray-300 ring-1 ring-gray-400/70 cursor-pointer hover:ring-gray-400"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                            className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30 rounded-lg text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                        />
                                    ) : (
                                        <p className="text-gray-200">{user.name || "Not provided"}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Email Address
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30 rounded-lg text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                        />
                                    ) : (
                                        <p className="text-gray-200">{user.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                            className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30 rounded-lg text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                        />
                                    ) : (
                                        <p className="text-gray-200">{user.phone || "Not provided"}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Company
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => handleInputChange("company", e.target.value)}
                                            className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30 rounded-lg text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                        />
                                    ) : (
                                        <p className="text-gray-200">{user.company || "Not provided"}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Address
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange("address", e.target.value)}
                                        className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30 rounded-lg text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                    />
                                ) : (
                                    <p className="text-gray-200">{user.address || "Not provided"}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Website
                                </label>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        value={formData.website}
                                        onChange={(e) => handleInputChange("website", e.target.value)}
                                        className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30 rounded-lg text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                    />
                                ) : (
                                    <p className="text-gray-200">{user.website || "Not provided"}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Security */}
                    <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]/30">
                        <CardHeader>
                            <CardTitle className="text-gray-200 flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Account Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter current password"
                                        className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30 rounded-lg text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30 rounded-lg text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    className="w-full px-3 py-2 bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30 rounded-lg text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                />
                            </div>
                            <Button className="w-full">
                                Update Password
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Notification Preferences */}
                    <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]/30">
                        <CardHeader>
                            <CardTitle className="text-gray-200 flex items-center gap-2">
                                <SettingsIcon className="w-5 h-5" />
                                Notification Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-200 font-medium">Email Notifications</p>
                                    <p className="text-gray-400 text-sm">Receive updates via email</p>
                                </div>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="w-4 h-4 text-[var(--primary-color)] bg-[var(--lighter-dark)] border-[var(--primary-color)]/30 rounded focus:ring-[var(--primary-color)] focus:ring-2"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-200 font-medium">SMS Notifications</p>
                                    <p className="text-gray-400 text-sm">Receive updates via SMS</p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-[var(--primary-color)] bg-[var(--lighter-dark)] border-[var(--primary-color)]/30 rounded focus:ring-[var(--primary-color)] focus:ring-2"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-200 font-medium">Marketing Communications</p>
                                    <p className="text-gray-400 text-sm">Receive promotional content</p>
                                </div>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="w-4 h-4 text-[var(--primary-color)] bg-[var(--lighter-dark)] border-[var(--primary-color)]/30 rounded focus:ring-[var(--primary-color)] focus:ring-2"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Account Status */}
                    <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]/30">
                        <CardHeader>
                            <CardTitle className="text-gray-200">Account Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Status</span>
                                <Badge variant="default" className="bg-green-500 text-white">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Active
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Role</span>
                                <span className="text-gray-200">{getRoleLabel(user.role)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Member Since</span>
                                <span className="text-gray-200">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Last Login</span>
                                <span className="text-gray-200">
                                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "N/A"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Current Plan */}
                    <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]/30">
                        <CardHeader>
                            <CardTitle className="text-gray-200 flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Current Plan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Building className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-200 text-lg">
                                    {getPlanLabel(user.role)}
                                </h3>
                                <p className="text-gray-400 text-sm">Professional Plan</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Plan Type</span>
                                    <span className="text-gray-200">Monthly</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Base Plan</span>
                                    <span className="text-gray-200">$79/month</span>
                                </div>
                                {userAddons.length > 0 && (
                                    <>
                                        <div className="border-t border-gray-600 my-2"></div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-400 font-medium">Add-ons:</p>
                                            {userAddons.map((addon) => {
                                                const addonPrice = addon.billing_cycle === 'yearly' 
                                                    ? `$${(addon.price / 12).toFixed(2)}/mo` 
                                                    : `$${addon.price}/mo`;
                                                return (
                                                    <div key={addon._id} className="flex items-center justify-between pl-2">
                                                        <span className="text-gray-300 text-sm">{addon.addon_name}</span>
                                                        <span className="text-gray-200 text-sm">{addonPrice}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="border-t border-gray-600 my-2"></div>
                                    </>
                                )}
                                <div className="flex items-center justify-between font-semibold">
                                    <span className="text-gray-300">Total Monthly</span>
                                    <span className="text-[var(--primary-color)]">${totalMonthlyCost.toFixed(2)}/month</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Next Billing</span>
                                    <span className="text-gray-200">
                                        {user?.subscriptionEndDate 
                                            ? new Date(user.subscriptionEndDate).toLocaleDateString()
                                            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <Button className="w-full" variant="outline">
                                Manage Subscription
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]/30">
                        <CardHeader>
                            <CardTitle className="text-gray-200">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full" variant="outline">
                                <Globe className="w-4 h-4 mr-2" />
                                View Documentation
                            </Button>
                            <Button className="w-full" variant="outline">
                                <Phone className="w-4 h-4 mr-2" />
                                Contact Support
                            </Button>
                            <Button className="w-full" variant="outline">
                                <Clock className="w-4 h-4 mr-2" />
                                View Activity Log
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Settings;
