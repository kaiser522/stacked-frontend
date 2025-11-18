import React, { useState, useEffect, useMemo } from "react";
import { getStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import {
  Home,
  Users,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Star,
  StarHalf,
  StarOff,
  Settings,
  Archive,
  Trash2,
  Edit,
  Eye,
  Tag,
  UserPlus,
  FileText,
  Building,
  Bed,
  Bath,
  Square,
} from "lucide-react";
import { Button } from "../../components/RealEstate/ui/Button";
import { Badge } from "../../components/RealEstate/ui/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/RealEstate/ui/Card";
import logo from "../../assets/logo/logo-1.png";
import { apiBaseUrl } from "../../store/api.config";

// Edit Visitor Form Component
const EditVisitorForm = ({ visitor, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    interestLevel: visitor.interestLevel,
    notes: visitor.notes || "",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedVisitor = {
      ...visitor,
      ...formData
    };
    onSave(updatedVisitor);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Interest Level
        </label>
        <select
          value={formData.interestLevel}
          onChange={(e) => handleInputChange('interestLevel', e.target.value)}
          className="w-full p-3 bg-[var(--dark-bg)] border border-[var(--primary-color)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
        >
          <option value="not-set">Not Set</option>
          <option value="very-interested">Very Interested</option>
          <option value="somewhat-interested">Somewhat Interested</option>
          <option value="not-interested">Not Interested</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          rows={4}
          className="w-full p-3 bg-[var(--dark-bg)] border border-[var(--primary-color)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          placeholder="Add any notes about this visitor..."
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

const OpenHouseToolkit = () => {
  const [activeTab, setActiveTab] = useState("setup");
  const [eventData, setEventData] = useState({
    propertyAddress: "456 Oak Avenue, Lapeer, MI 48446",
    openHouseDate: "2025-06-28",
    startTime: "14:00",
    endTime: "17:00",
    propertyType: "Single Family Home",
    priceRange: "$285,000",
    expectedVisitors: 15,
    propertyHighlights:
      "Recently renovated kitchen with granite countertops, hardwood floors throughout, 3 bedrooms, 2 full baths, large backyard with deck, attached 2-car garage.",
  });

  const [checklist, setChecklist] = useState({
    propertyCleaned: true,
    signsPlaced: true,
    marketingMaterials: false,
    digitalSignIn: false,
  });

  const [visitors, setVisitors] = useState([
    {
      id: 1,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 123-4567",
      source: "Online listing",
      timeline: "1-3 months",
      marketingConsent: true,
      interestLevel: "very-interested",
      signInTime: "2:15 PM",
      notes: "Loved the kitchen renovation, asked about schools in the area",
    },
    {
      id: 2,
      firstName: "Mike",
      lastName: "Chen",
      email: "m.chen@email.com",
      phone: "(555) 987-6543",
      source: "Drive by",
      timeline: "Within 30 days",
      marketingConsent: true,
      interestLevel: "very-interested",
      signInTime: "2:45 PM",
      notes: "Currently renting, looking to buy first home",
    },
    {
      id: 3,
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@email.com",
      phone: "(555) 456-7890",
      source: "Referral",
      timeline: "3-6 months",
      marketingConsent: false,
      interestLevel: "somewhat-interested",
      signInTime: "3:20 PM",
      notes: "Interested but needs to sell current home first",
    },
    {
      id: 4,
      firstName: "Robert",
      lastName: "Wilson",
      email: "rob.wilson@email.com",
      phone: "(555) 234-5678",
      source: "Social media",
      timeline: "Just browsing",
      marketingConsent: true,
      interestLevel: "not-interested",
      signInTime: "3:55 PM",
      notes: "Just curious about the neighborhood",
    },
  ]);

  const [signInForm, setSignInForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    source: "Online listing",
    timeline: "1-3 months",
    marketingConsent: false,
  });


  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isSubmittingVisitor, setIsSubmittingVisitor] = useState(false);
  const [visitorMessage, setVisitorMessage] = useState("");
  const [isLoadingVisitors, setIsLoadingVisitors] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [showCountUpdate, setShowCountUpdate] = useState(false);
  const [editingVisitor, setEditingVisitor] = useState(null);
  const [isEditingVisitor, setIsEditingVisitor] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleInputChange = (field, value) => {
    setEventData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChecklistChange = (item) => {
    setChecklist((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // Fetch visitors from API
  const fetchVisitors = async () => {
    setIsLoadingVisitors(true);
    try {
      const userToken = getStorage("__login_user_token__");

      const response = await fetch(`${apiBaseUrl}/visitors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Transform API data to match local visitor structure
        const transformedVisitors = result.data.map((visitor, index) => ({
          id: visitor._id || Date.now() + index,
          firstName: visitor.firstName,
          lastName: visitor.lastName,
          email: visitor.email,
          phone: visitor.phoneNumber,
          source: visitor.howDidYouHear,
          timeline: visitor.timelineToPurchase,
          marketingConsent: visitor.marketingConsent || false,
          interestLevel: visitor.interestLevel || "not-set",
          signInTime: visitor.signInTime || new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          notes: visitor.notes || "",
        }));

        setVisitors(transformedVisitors);
      } else {
        console.error('Error fetching visitors:', result.message);
      }
    } catch (error) {
      console.error('Error fetching visitors:', error);
    } finally {
      setIsLoadingVisitors(false);
    }
  };

  // Fetch events from API
  const fetchEvents = async () => {
    setIsLoadingEvents(true);
    try {
      const userToken = getStorage("__login_user_token__");

      const response = await fetch(`${apiBaseUrl}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setEvents(result.data || []);
      } else {
        console.error('Error fetching events:', result.message);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  // Fetch visitors and events when component mounts
  useEffect(() => {
    fetchVisitors();
    fetchEvents();
  }, []);

  // Export visitors to CSV
  const exportToCSV = () => {
    if (visitors.length === 0) {
      toast.error("No visitors to export");
      return;
    }

    // Define CSV headers
    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Source",
      "Timeline",
      "Interest Level",
      "Sign In Time",
      "Notes",
      "Marketing Consent"
    ];

    // Convert visitors data to CSV format
    const csvData = visitors.map(visitor => [
      visitor.firstName || "",
      visitor.lastName || "",
      visitor.email || "",
      visitor.phone || "",
      visitor.source || "",
      visitor.timeline || "",
      visitor.interestLevel || "",
      visitor.signInTime || "",
      visitor.notes || "",
      visitor.marketingConsent ? "Yes" : "No"
    ]);

    // Combine headers and data
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `visitors_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const createEvent = async () => {
    setIsLoading(true);
    setSaveMessage("");

    try {
      // Format the time to match API requirements (e.g., "02:00 PM")
      const formatTime = (time24) => {
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
      };

      // Convert price range to number (remove $ and commas)
      const priceValue = eventData.priceRange.replace(/[$,]/g, '');

      const eventPayload = {
        propertyAddress: eventData.propertyAddress,
        propertyType: eventData.propertyType,
        openHouseDate: eventData.openHouseDate,
        startTime: formatTime(eventData.startTime),
        endTime: formatTime(eventData.endTime),
        priceRange: parseInt(priceValue),
        expectedVisitors: parseInt(eventData.expectedVisitors),
        propertyHighlights: eventData.propertyHighlights,
      };

      const userToken = getStorage("__login_user_token__");

      const response = await fetch(`${apiBaseUrl}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify(eventPayload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSaveMessage("Event created successfully!");

        // Refresh events list
        fetchEvents();

        // Reset form values to empty/null
        setEventData({
          propertyAddress: "",
          openHouseDate: "",
          startTime: "",
          endTime: "",
          propertyType: "Single Family Home",
          priceRange: "",
          expectedVisitors: "",
          propertyHighlights: "",
        });

        // Reset checklist
        setChecklist({
          propertyCleaned: false,
          signsPlaced: false,
          marketingMaterials: false,
          digitalSignIn: false,
        });
      } else {
        setSaveMessage(`Error: ${result.message || 'Failed to create event'}`);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setSaveMessage('Error: Failed to create event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingVisitor(true);
    setVisitorMessage("");

    if (!signInForm.firstName || !signInForm.lastName || !signInForm.email) {
      setVisitorMessage("Please fill in all required fields (marked with *)");
      setIsSubmittingVisitor(false);
      return;
    }

    try {
      const userToken = getStorage("__login_user_token__");

      const visitorPayload = {
        firstName: signInForm.firstName,
        lastName: signInForm.lastName,
        email: signInForm.email,
        phoneNumber: signInForm.phone,
        howDidYouHear: signInForm.source,
        timelineToPurchase: signInForm.timeline,
        eventId: "EVENT_ID_HERE", // You may want to make this dynamic based on current event
        propertyAddress: eventData.propertyAddress || "456 Oak Avenue, Lapeer, MI 48446",
      };

      const response = await fetch(`${apiBaseUrl}/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify(visitorPayload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setVisitorMessage("Thank you for signing in! Enjoy touring the property.");

        // Reset form
        setSignInForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          source: "Online listing",
          timeline: "1-3 months",
          marketingConsent: false,
        });

        // Refresh visitors list from API
        fetchVisitors();

        setTimeout(() => {
          setVisitorMessage("");
        }, 5000);
      } else {
        setVisitorMessage(`Error: ${result.message || 'Failed to sign in visitor'}`);
      }
    } catch (error) {
      console.error('Error creating visitor:', error);
      setVisitorMessage('Error: Failed to sign in visitor. Please try again.');
    } finally {
      setIsSubmittingVisitor(false);
    }
  };

  const handleInterestLevelChange = (visitorId, level) => {
    setVisitors((prev) =>
      prev.map((visitor) =>
        visitor.id === visitorId
          ? { ...visitor, interestLevel: level }
          : visitor
      )
    );

    // Show visual feedback when someone is marked as very interested
    if (level === "very-interested") {
      setShowCountUpdate(true);
      setTimeout(() => setShowCountUpdate(false), 2000);
    }
  };

  const handleVisitorClick = (visitor) => {
    setSelectedVisitor(visitor);
    setIsVisitorModalOpen(true);
  };

  const closeVisitorModal = () => {
    setSelectedVisitor(null);
    setIsVisitorModalOpen(false);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(false);
    setEditingVisitor(null);
    setIsEditingVisitor(false);
  };

  const handleDeleteEvent = (event) => {
    setEventToDelete(event);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteEvent = async () => {
    if (!eventToDelete) return;

    // Get the correct ID (try _id first, then id)
    const eventId = eventToDelete._id || eventToDelete.id;
    console.log('Deleting event with ID:', eventId);
    console.log('Event object:', eventToDelete);

    if (!eventId) {
      toast.error('Error: Event ID not found');
      return;
    }

    try {
      setIsLoadingEvents(true);
      const response = await fetch(`${apiBaseUrl}/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the event from the local state using the same ID logic
        setEvents(prevEvents => prevEvents.filter(event => {
          const currentEventId = event._id || event.id;
          return currentEventId !== eventId;
        }));
        setShowDeleteConfirm(false);
        setEventToDelete(null);
        console.log('Event deleted successfully');
        // Show success feedback
        toast.success('Event deleted successfully!');
      } else {
        console.error('Failed to delete event');
        console.error('Response status:', response.status);
        console.error('Response text:', await response.text());
        toast.error('Failed to delete event. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Error deleting event. Please try again.');
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const cancelDeleteEvent = () => {
    setShowDeleteConfirm(false);
    setEventToDelete(null);
  };

  const handleEditVisitor = (visitor) => {
    setEditingVisitor(visitor);
    setIsEditingVisitor(true);
  };

  const handleSaveVisitorEdit = async (updatedVisitor) => {
    try {
      // Update visitor in the visitors array
      setVisitors(prev =>
        prev.map(visitor =>
          visitor.id === updatedVisitor.id ? updatedVisitor : visitor
        )
      );

      // Show success feedback
      setShowCountUpdate(true);
      setTimeout(() => setShowCountUpdate(false), 2000);

      // Close editing mode
      setEditingVisitor(null);
      setIsEditingVisitor(false);

      console.log("Visitor updated successfully:", updatedVisitor);
    } catch (error) {
      console.error("Error updating visitor:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingVisitor(null);
    setIsEditingVisitor(false);
  };

  const handleEmailFollowUp = (visitor) => {
    // Create email subject and body based on visitor's interest level
    let subject = "";
    let body = "";

    switch (visitor.interestLevel) {
      case "very-interested":
        subject = `Thank you for your interest in our property - Next Steps`;
        body = `Hi ${visitor.firstName},\n\nThank you for visiting our open house! I was thrilled to hear about your interest in the property.\n\nI'd love to schedule a follow-up call to discuss your specific needs and answer any questions you might have. Are you available for a quick 15-minute call this week?\n\nBest regards,\n[Your Name]`;
        break;
      case "somewhat-interested":
        subject = `Thank you for visiting our open house`;
        body = `Hi ${visitor.firstName},\n\nThank you for taking the time to visit our open house. I hope you found the property interesting!\n\nIf you have any questions or would like to see similar properties in the area, please don't hesitate to reach out. I'm here to help with your home search.\n\nBest regards,\n[Your Name]`;
        break;
      case "not-interested":
        subject = `Thank you for visiting our open house`;
        body = `Hi ${visitor.firstName},\n\nThank you for visiting our open house. I understand this particular property may not have been the right fit for you.\n\nIf you're still looking for a home, I'd be happy to help you find properties that better match your criteria. Please let me know if you'd like to discuss your specific needs.\n\nBest regards,\n[Your Name]`;
        break;
      default:
        subject = `Thank you for visiting our open house`;
        body = `Hi ${visitor.firstName},\n\nThank you for visiting our open house! I hope you enjoyed touring the property.\n\nIf you have any questions or would like to discuss your home search, please don't hesitate to reach out. I'm here to help!\n\nBest regards,\n[Your Name]`;
    }

    // Store the email data for the compose modal
    const emailData = {
      to: visitor.email,
      subject: subject,
      body: body,
      visitorName: `${visitor.firstName} ${visitor.lastName}`
    };

    // Store in sessionStorage to pass to email compose
    sessionStorage.setItem('openHouseEmailData', JSON.stringify(emailData));

    // Redirect to email compose section
    window.location.href = '/realestate/email-inbox?compose=true';

    console.log("Redirecting to email compose for:", visitor.firstName, visitor.lastName);
  };

  const getInterestLevelIcon = (level) => {
    switch (level) {
      case "very-interested":
        return <Star className="w-4 h-4 text-green-400" />;
      case "somewhat-interested":
        return <StarHalf className="w-4 h-4 text-yellow-400" />;
      case "not-interested":
        return <StarOff className="w-4 h-4 text-gray-400" />;
      default:
        return <Tag className="w-4 h-4 text-gray-400" />;
    }
  };

  const getInterestLevelBadge = (level) => {
    switch (level) {
      case "very-interested":
        return (
          <Badge className="bg-green-500/20 text-green-400 text-xs">
            Very Interested
          </Badge>
        );
      case "somewhat-interested":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
            Somewhat Interested
          </Badge>
        );
      case "not-interested":
        return (
          <Badge className="bg-red-500/20 text-red-400 text-xs">
            Not Interested
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-400 text-xs">
            Not Set
          </Badge>
        );
    }
  };

  const stats = useMemo(() => {
    const qualifiedLeads = visitors.filter(v => v.interestLevel === "very-interested");
    const hotProspects = visitors.filter(v =>
      v.interestLevel === "very-interested" && v.timeline === "Within 30 days"
    );


    return {
      totalVisitors: visitors.length,
      qualifiedLeads: qualifiedLeads.length,
      hotProspects: hotProspects.length,
      followUpsDue: visitors.filter(
        (v) =>
          v.interestLevel === "very-interested" ||
          v.interestLevel === "somewhat-interested"
      ).length,
    };
  }, [visitors]);

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* <img src={logo} alt="STACKED" className="w-8 h-8" /> */}
            <h1 className="text-3xl font-bold text-white">
              Open House Toolkit
            </h1>
          </div>
          <p className="text-gray-400">
            Streamline your open house events from setup to lead follow-up
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <Button
            onClick={() => setActiveTab("setup")}
            variant={activeTab === "setup" ? "default" : "outline"}
            className={
              activeTab === "setup"
                ? "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white"
                : "border-[var(--primary-color)] text-[var(--primary-color)]"
            }
          >
            <Home className="w-4 h-4 mr-2" />
            Event Setup
          </Button>
          <Button
            onClick={() => setActiveTab("signin")}
            variant={activeTab === "signin" ? "default" : "outline"}
            className={
              activeTab === "signin"
                ? "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white"
                : "border-[var(--primary-color)] text-[var(--primary-color)]"
            }
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Digital Sign-In
          </Button>
          <Button
            onClick={() => setActiveTab("leads")}
            variant={activeTab === "leads" ? "default" : "outline"}
            className={
              activeTab === "leads"
                ? "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white"
                : "border-[var(--primary-color)] text-[var(--primary-color)]"
            }
          >
            <Users className="w-4 h-4 mr-2" />
            Lead Capture
          </Button>
        </div>

        {/* Event Setup Section */}
        {activeTab === "setup" && (
          <>
            <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Event Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Property Address
                        </label>
                        <input
                          type="text"
                          value={eventData.propertyAddress}
                          onChange={(e) =>
                            handleInputChange("propertyAddress", e.target.value)
                          }
                          className="w-full p-3 bg-[var(--lighter-dark)] border border-[var(--primary-color)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                          placeholder="123 Main St, Anytown, ST 12345"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Open House Date
                        </label>
                        <input
                          type="date"
                          value={eventData.openHouseDate}
                          onChange={(e) =>
                            handleInputChange("openHouseDate", e.target.value)
                          }
                          className="w-full p-3 bg-[var(--lighter-dark)] border border-[var(--primary-color)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Time
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="time"
                            value={eventData.startTime}
                            onChange={(e) =>
                              handleInputChange("startTime", e.target.value)
                            }
                            className="flex-1 p-3 bg-[var(--lighter-dark)] border border-[var(--primary-color)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                          />
                          <span className="flex items-center text-gray-400">
                            to
                          </span>
                          <input
                            type="time"
                            value={eventData.endTime}
                            onChange={(e) =>
                              handleInputChange("endTime", e.target.value)
                            }
                            className="flex-1 p-3 bg-[var(--lighter-dark)] border border-[var(--primary-color)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Property Type
                        </label>
                        <select
                          value={eventData.propertyType}
                          onChange={(e) =>
                            handleInputChange("propertyType", e.target.value)
                          }
                          className="w-full p-3 bg-[var(--lighter-dark)] border border-[var(--primary-color)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        >
                          <option>Single Family Home</option>
                          <option>Condo</option>
                          <option>Townhouse</option>
                          <option>Multi-Family</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Price Range
                        </label>
                        <input
                          type="text"
                          value={eventData.priceRange}
                          onChange={(e) =>
                            handleInputChange("priceRange", e.target.value)
                          }
                          className="w-full p-3 bg-[var(--lighter-dark)] border border-[var(--primary-color)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                          placeholder="$350,000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expected Visitors
                        </label>
                        <input
                          type="number"
                          value={eventData.expectedVisitors}
                          onChange={(e) =>
                            handleInputChange("expectedVisitors", e.target.value)
                          }
                          className="w-full p-3 bg-[var(--lighter-dark)] border border-[var(--primary-color)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                          placeholder="20"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Property Highlights
                  </label>
                  <textarea
                    value={eventData.propertyHighlights}
                    onChange={(e) =>
                      handleInputChange("propertyHighlights", e.target.value)
                    }
                    rows={4}
                    className="w-full p-3 bg-[var(--lighter-dark)] border border-[var(--primary-color)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] resize-none"
                    placeholder="Recently renovated kitchen with granite countertops, hardwood floors throughout, 3 bedrooms, 2 full baths, large backyard with deck, attached 2-car garage."
                  />
                </div>

                <div className="bg-[#4ecdc41a] p-6 rounded-lg mb-6 border-l-4 border-[#4ECDC4]">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    📋 Pre-Event Checklist
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={checklist.propertyCleaned}
                        onChange={() => handleChecklistChange("propertyCleaned")}
                        className="mr-3 w-4 h-4 text-blue-500 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-white cursor-pointer">
                        Property cleaned and staged
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={checklist.signsPlaced}
                        onChange={() => handleChecklistChange("signsPlaced")}
                        className="mr-3 w-4 h-4 text-blue-500 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-white cursor-pointer">
                        Signs and directional markers placed
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={checklist.marketingMaterials}
                        onChange={() =>
                          handleChecklistChange("marketingMaterials")
                        }
                        className="mr-3 w-4 h-4 text-blue-500 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-white cursor-pointer">
                        Marketing materials prepared
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={checklist.digitalSignIn}
                        onChange={() => handleChecklistChange("digitalSignIn")}
                        className="mr-3 w-4 h-4 text-blue-500 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-white cursor-pointer">
                        Digital sign-in form tested
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex mt-6">
                  <Button
                    className="bg-[#4ECDC4] hover:bg-[#4ECDC4]/90 text-white disabled:opacity-50 px-8 py-3 text-lg font-medium rounded-lg"
                    onClick={createEvent}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Event..." : "SAVE EVENT SETUP"}
                  </Button>
                </div>

                {saveMessage && (
                  <div className={`mt-4 p-3 rounded-lg text-sm text-center ${saveMessage.includes("Error")
                    ? "bg-red-500/20 border border-red-500 text-red-400"
                    : "bg-green-500/20 border border-green-500 text-green-400"
                    }`}>
                    {saveMessage}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)] mt-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Your Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingEvents ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-gray-400">Loading events...</div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {events.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        No events found. Create your first event above!
                      </div>
                    ) : (
                      events.map((event) => (
                        <div
                          key={event._id || event.id}
                          onClick={() => handleEventClick(event)}
                          className="flex items-center gap-4 p-4 bg-[var(--lighter-dark)] rounded-lg transition-colors hover:bg-[var(--lighter-dark)]/80 cursor-pointer"
                        >
                          <div className="w-12 h-12 bg-[var(--primary-color)] rounded-lg flex items-center justify-center text-white font-semibold">
                            <Home className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-white font-medium">
                                {event.propertyAddress}
                              </h3>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-[var(--primary-color)]/20 text-[var(--primary-color)] text-xs">
                                  {event.propertyType}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-sm text-gray-400 mb-1">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(event.openHouseDate).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {event.startTime} - {event.endTime}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" />
                                  ${event.priceRange?.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              Expected Visitors: {event.expectedVisitors}
                            </div>
                            {event.propertyHighlights && (
                              <div className="text-xs text-gray-400 mt-2 line-clamp-2">
                                {event.propertyHighlights}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEvent(event);
                              }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}


        {/* Digital Sign-In Section */}
        {activeTab === "signin" && (
          <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Digital Sign-In Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-[var(--lighter-dark)] p-6 rounded-lg mb-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    {/* <img src={logo} alt="STACKED" className="w-[120px] cursor-pointer hover:brightness-110 mt-2" /> */}
                    <h3 className="text-2xl font-semibold text-[var(--primary-color)]">
                      Welcome to Our Open House!
                    </h3>
                  </div>
                  <p className="text-gray-400">
                    Please sign in to receive property information and updates
                  </p>
                </div>

                <form onSubmit={handleSignInSubmit}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={signInForm.firstName}
                          onChange={(e) =>
                            setSignInForm((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          className="w-full p-3 bg-[var(--dark-bg)] border border-[var(--primary-color)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                          placeholder="John"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={signInForm.email}
                          onChange={(e) =>
                            setSignInForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="w-full p-3 bg-[var(--dark-bg)] border border-[var(--primary-color)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                          placeholder="john@example.com"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          How did you hear about this property?
                        </label>
                        <select
                          value={signInForm.source}
                          onChange={(e) =>
                            setSignInForm((prev) => ({
                              ...prev,
                              source: e.target.value,
                            }))
                          }
                          className="w-full p-3 bg-[var(--dark-bg)] border border-[var(--primary-color)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        >
                          <option>Online listing</option>
                          <option>Drive by</option>
                          <option>Referral</option>
                          <option>Social media</option>
                          <option>Newspaper ad</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={signInForm.lastName}
                          onChange={(e) =>
                            setSignInForm((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          className="w-full p-3 bg-[var(--dark-bg)] border border-[var(--primary-color)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                          placeholder="Smith"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={signInForm.phone}
                          onChange={(e) =>
                            setSignInForm((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full p-3 bg-[var(--dark-bg)] border border-[var(--primary-color)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Timeline to Purchase
                        </label>
                        <select
                          value={signInForm.timeline}
                          onChange={(e) =>
                            setSignInForm((prev) => ({
                              ...prev,
                              timeline: e.target.value,
                            }))
                          }
                          className="w-full p-3 bg-[var(--dark-bg)] border border-[var(--primary-color)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        >
                          <option>Within 30 days</option>
                          <option>1-3 months</option>
                          <option>3-6 months</option>
                          <option>6+ months</option>
                          <option>Just browsing</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={signInForm.marketingConsent}
                        onChange={(e) =>
                          setSignInForm((prev) => ({
                            ...prev,
                            marketingConsent: e.target.checked,
                          }))
                        }
                        className="mr-3 w-4 h-4 text-[var(--primary-color)] bg-[var(--dark-bg)] border-[var(--primary-color)] rounded focus:ring-[var(--primary-color)]"
                      />
                      <span className="text-gray-300">
                        I'd like to receive updates about similar properties and
                        market information
                      </span>
                    </label>
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white disabled:opacity-50"
                      disabled={isSubmittingVisitor}
                    >
                      {isSubmittingVisitor ? "Signing In..." : "Sign In to Open House"}
                    </Button>
                  </div>
                </form>

                {visitorMessage && (
                  <div className={`mt-4 p-4 rounded-lg text-center ${visitorMessage.includes("Error")
                    ? "bg-red-500/20 border border-red-500 text-red-400"
                    : "bg-green-500/20 border border-green-500 text-green-400"
                    }`}>
                    {visitorMessage.includes("Error") ? "❌" : "✅"} {visitorMessage}
                  </div>
                )}

                {/* {showSuccess && (
                  <div className="mt-4 p-4 bg-green-500/20 border border-green-500 text-green-400 rounded-lg text-center">
                    ✅ Thank you for signing in! Enjoy touring the property.
                  </div>
                )} */}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lead Capture Section */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[rgba(78,205,196,0.1)] p-5 rounded-lg text-center">
                <div className="text-3xl font-bold text-[#4ECDC4] mb-1">
                  {stats.totalVisitors}
                </div>
                <div className="text-[#b0c4de] text-sm">Total Visitors</div>
              </div>
              {/* <div className="bg-yellow-500/10 p-5 rounded-lg text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  {stats.qualifiedLeads}
                </div>
                <div className="text-gray-400 text-sm">Qualified Leads</div>
              </div> */}
              <div className={`bg-green-500/10 p-5 rounded-lg text-center transition-all duration-500 ${showCountUpdate ? 'ring-2 ring-green-400 ring-opacity-50 bg-green-500/20' : ''}`}>
                <div className="text-3xl font-bold text-green-400 mb-1">
                  {stats.hotProspects}
                </div>
                <div className="text-gray-400 text-sm">Hot Prospects</div>
                {showCountUpdate && (
                  <div className="text-xs text-green-400 mt-1 animate-pulse">
                    ✨ New hot lead added!
                  </div>
                )}
              </div>
              <div className="bg-red-500/10 p-5 rounded-lg text-center">
                <div className="text-3xl font-bold text-red-400 mb-1">
                  {stats.followUpsDue}
                </div>
                <div className="text-gray-400 text-sm">Follow-ups Due</div>
              </div>
            </div>

            {/* Visitors List */}
            <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Recent Visitors
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[var(--primary-color)] text-[var(--primary-color)]"
                      onClick={exportToCSV}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                    {/* <Button
                      size="sm"
                      variant="outline"
                      className="border-[var(--primary-color)] text-[var(--primary-color)]"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Schedule Follow-ups
                    </Button> */}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingVisitors ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-gray-400">Loading visitors...</div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {visitors.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        No visitors found. Start by having visitors sign in!
                      </div>
                    ) : (
                      [...visitors].sort((a, b) => {
                        // Sort by interest level: very-interested first, then somewhat-interested, then not-interested, then not-set
                        const interestOrder = {
                          'very-interested': 1,
                          'somewhat-interested': 2,
                          'not-interested': 3,
                          'not-set': 4
                        };
                        return interestOrder[a.interestLevel] - interestOrder[b.interestLevel];
                      }).map((visitor) => (
                        <div
                          key={visitor.id}
                          onClick={() => handleVisitorClick(visitor)}
                          className="flex items-center gap-4 p-4 bg-[var(--lighter-dark)] rounded-lg transition-colors cursor-pointer hover:bg-[var(--lighter-dark)]/80"
                        >
                          <div className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-semibold">
                            {visitor.firstName[0]}
                            {visitor.lastName[0]}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-white font-medium">
                                {visitor.firstName} {visitor.lastName}
                              </h3>
                              <div className="flex items-center gap-2">
                                {getInterestLevelIcon(visitor.interestLevel)}
                                {getInterestLevelBadge(visitor.interestLevel)}
                              </div>
                            </div>
                            <div className="text-sm text-gray-400 mb-1">
                              {visitor.email} • {visitor.phone} • Timeline:{" "}
                              {visitor.timeline}
                            </div>
                            <div className="text-xs text-gray-500">
                              Signed in at {visitor.signInTime} • Source:{" "}
                              {visitor.source}
                            </div>
                            {visitor.notes && (
                              <div className="text-xs text-gray-400 mt-1 italic">
                                "{visitor.notes}"
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={visitor.interestLevel}
                              onChange={(e) =>
                                handleInterestLevelChange(
                                  visitor.id,
                                  e.target.value
                                )
                              }
                              className="px-2 py-1 bg-[var(--dark-bg)] border border-[var(--primary-color)] rounded text-xs text-white focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                            >
                              <option value="not-set">Set Interest</option>
                              <option value="very-interested">
                                Very Interested
                              </option>
                              <option value="somewhat-interested">
                                Somewhat Interested
                              </option>
                              <option value="not-interested">Not Interested</option>
                            </select>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-500 text-gray-400 hover:text-white hover:border-white transition-colors"
                              onClick={() => handleEmailFollowUp(visitor)}
                              title="Send Follow-up Email"
                            >
                              <Mail className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Visitor Details Modal */}
        {isVisitorModalOpen && selectedVisitor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
            <div className="bg-[var(--medium-dark)] p-6 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Visitor Details</h3>
                <button
                  onClick={closeVisitorModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-semibold text-xl">
                    {selectedVisitor.firstName[0]}
                    {selectedVisitor.lastName[0]}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">
                      {selectedVisitor.firstName} {selectedVisitor.lastName}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      {getInterestLevelIcon(selectedVisitor.interestLevel)}
                      {getInterestLevelBadge(selectedVisitor.interestLevel)}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h5 className="text-sm font-medium text-gray-300 uppercase tracking-wide">Contact Information</h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{selectedVisitor.email}</span>
                    </div>
                    {selectedVisitor.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{selectedVisitor.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-4">
                  <h5 className="text-sm font-medium text-gray-300 uppercase tracking-wide">Event Details</h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-white">Signed in at {selectedVisitor.signInTime}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-white">Source: {selectedVisitor.source}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-white">Timeline: {selectedVisitor.timeline}</span>
                    </div>
                  </div>
                </div>

                {/* Marketing Consent */}
                {/* <div className="space-y-4">
                  <h5 className="text-sm font-medium text-gray-300 uppercase tracking-wide">Marketing</h5>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${selectedVisitor.marketingConsent ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <span className="text-white">
                      {selectedVisitor.marketingConsent ? 'Consented to marketing' : 'No marketing consent'}
                    </span>
                  </div>
                </div> */}

                {/* Notes */}
                {/* {selectedVisitor.notes && (
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-300 uppercase tracking-wide">Notes</h5>
                    <div className="bg-[var(--lighter-dark)] p-4 rounded-lg">
                      <p className="text-white italic">"{selectedVisitor.notes}"</p>
                    </div>
                  </div>
                )} */}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white"
                    onClick={() => {
                      if (selectedVisitor?.email) {
                        handleEmailFollowUp(selectedVisitor);
                      } else {
                        toast.error('Email not available for this visitor');
                      }
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-[var(--primary-color)] text-[var(--primary-color)]"
                    onClick={() => {
                      if (selectedVisitor?.phone) {
                        // Navigate to voice calls page with visitor phone
                        window.location.href = `/realestate/voice-calls?phone=${encodeURIComponent(selectedVisitor.phone)}&name=${encodeURIComponent(`${selectedVisitor.firstName} ${selectedVisitor.lastName}`)}`;
                      } else {
                        toast.error('Phone number not available for this visitor');
                      }
                    }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Event Visitors Modal */}
        {isEventModalOpen && selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--medium-dark)] p-6 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">Event Visitors</h3>
                  <p className="text-gray-400 mt-1">{selectedEvent.propertyAddress}</p>
                </div>
                <button
                  onClick={closeEventModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Event Info */}
                <div className="bg-[var(--lighter-dark)] p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{new Date(selectedEvent.openHouseDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{selectedEvent.startTime} - {selectedEvent.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-white">${selectedEvent.priceRange?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Visitors List */}
                <div className="space-y-3">
                  {visitors.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No visitors found for this event.
                    </div>
                  ) : (
                    [...visitors].sort((a, b) => {
                      // Sort by interest level: very-interested first, then somewhat-interested, then not-interested, then not-set
                      const interestOrder = {
                        'very-interested': 1,
                        'somewhat-interested': 2,
                        'not-interested': 3,
                        'not-set': 4
                      };
                      return interestOrder[a.interestLevel] - interestOrder[b.interestLevel];
                    }).map((visitor) => (
                      <div
                        key={visitor.id}
                        className="flex items-center gap-4 p-4 bg-[var(--lighter-dark)] rounded-lg transition-colors hover:bg-[var(--lighter-dark)]/80"
                      >
                        <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-semibold">
                          {visitor.firstName[0]}{visitor.lastName[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-white font-medium">
                              {visitor.firstName} {visitor.lastName}
                            </h4>
                            <div className="flex items-center gap-2">
                              {getInterestLevelIcon(visitor.interestLevel)}
                              {getInterestLevelBadge(visitor.interestLevel)}
                            </div>
                          </div>
                          <div className="text-sm text-gray-400">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {visitor.email}
                              </span>
                              {visitor.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {visitor.phone}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {visitor.signInTime}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={visitor.interestLevel}
                            onChange={(e) =>
                              handleInterestLevelChange(
                                visitor.id,
                                e.target.value
                              )
                            }
                            className="px-2 py-1 bg-[var(--dark-bg)] border border-[var(--primary-color)] rounded text-xs text-white focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                          >
                            <option value="not-set">Set Interest</option>
                            <option value="very-interested">
                              Very Interested
                            </option>
                            <option value="somewhat-interested">
                              Somewhat Interested
                            </option>
                            <option value="not-interested">Not Interested</option>
                          </select>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-500 text-gray-400 hover:text-white hover:border-white transition-colors"
                            onClick={() => handleEmailFollowUp(visitor)}
                            title="Send Follow-up Email"
                          >
                            <Mail className="w-3 h-3" />
                          </Button>
                          {/* <button
                            onClick={() => handleVisitorClick(visitor)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditVisitor(visitor)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                            title="Edit Visitor"
                          >
                            <Edit className="w-4 h-4" />
                          </button> */}

                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Visitor Modal */}
        {isEditingVisitor && editingVisitor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--medium-dark)] p-6 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Edit Visitor</h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <EditVisitorForm
                visitor={editingVisitor}
                onSave={handleSaveVisitorEdit}
                onCancel={handleCancelEdit}
              />
            </div>
          </div>
        )}

        {/* Delete Event Confirmation Modal */}
        {showDeleteConfirm && eventToDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--medium-dark)] p-6 rounded-xl w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Delete Event</h3>
                <button
                  onClick={cancelDeleteEvent}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-300 mb-4">
                  Are you sure you want to delete this event? This action cannot be undone.
                </p>
                <div className="bg-[var(--lighter-dark)] p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">{eventToDelete.propertyAddress}</h4>
                  <p className="text-sm text-gray-400">
                    {new Date(eventToDelete.openHouseDate).toLocaleDateString()} • {eventToDelete.startTime} - {eventToDelete.endTime}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={cancelDeleteEvent}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDeleteEvent}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  disabled={isLoadingEvents}
                >
                  {isLoadingEvents ? 'Deleting...' : 'Delete Event'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenHouseToolkit;
