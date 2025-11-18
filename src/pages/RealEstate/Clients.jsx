// COMMENTED OUT CURRENT IMPLEMENTATION - RESTORING ORIGINAL
/*
import React, { useEffect, useRef, useState } from "react";
import { Mail, Download, Upload, Link2 } from "lucide-react";
import QuickActions from "../../components/RealEstate/clients/QuickActions";
import ClientDetailPanel from "../../components/RealEstate/clients/ClientDetailPanel";
import ClientListTable from "../../components/RealEstate/clients/ClientListTable";
import ClientBoardView from "../../components/RealEstate/clients/ClientBoardView";
import ClientCalendarView from "../../components/RealEstate/clients/ClientCalendarView";
import ClientHeader from "../../components/RealEstate/clients/ClientHeader";
import ClientViewToggle from "../../components/RealEstate/clients/ClientViewToggle";
import ClientFormModal from "../../components/RealEstate/clients/ClientFormModal";
import {
  useGetAllClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetClientStatsQuery,
} from "../../store/apis/clients.api";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
*/

// ORIGINAL IMPLEMENTATION - RESTORED
import React, { useEffect, useRef, useState } from "react";
import { Mail, Download, Upload, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuickActions from "../../components/RealEstate/clients/QuickActions";
import ClientDetailPanel from "../../components/RealEstate/clients/ClientDetailPanel";
import ClientListTable from "../../components/RealEstate/clients/ClientListTable";
import ClientBoardView from "../../components/RealEstate/clients/ClientBoardView";
import ClientCalendarView from "../../components/RealEstate/clients/ClientCalendarView";
import ClientHeader from "../../components/RealEstate/clients/ClientHeader";
import ClientViewToggle from "../../components/RealEstate/clients/ClientViewToggle";
import ClientFormModal from "../../components/RealEstate/clients/ClientFormModal";
import {
  useGetAllClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetClientStatsQuery,
} from "../../store/apis/clients.api"; 
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";

const features = [
  { label: "Bulk Email Capabilities", icon: Mail },
  { label: "Export Client List", icon: Download },
  { label: "Import Contacts", icon: Upload },
  { label: "Client Portal Link Generation", icon: Link2 },
];

const statusStyles = {
  active_buyer: "bg-green-600",
  lead: "bg-yellow-500",
  active_seller: "bg-blue-600",
};

const statusOptions = ["lead", "active_buyer", "active_seller"];

export default function ClientPage() {
  const [view, setView] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "lead",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const blurTimeout = useRef(null);
  const dropdownRefs = useRef({});

  const queryParams = {
    page: 1,
    limit: 10,
    search: searchQuery,
  };
  
  const queryResult = useGetAllClientsQuery(queryParams);
  const { data, isLoading, error, isFetching, isSuccess, isError } = queryResult;
  
  const statsResult = useGetClientStatsQuery();
  const { data: stats } = statsResult;

  const [createClient] = useCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [deleteClient] = useDeleteClientMutation();

  const clients = data?.data?.clients || [];
  const pagination = data?.data?.pagination || {};

  const navigate = useNavigate();


  useEffect(() => {
    if (expanded && inputRef.current) inputRef.current.focus();
  }, [expanded]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        blurTimeout.current = setTimeout(() => setExpanded(false), 150);
      }
      if (openDropdown !== null) {
        const dropdownRef = dropdownRefs.current[openDropdown];
        if (dropdownRef && !dropdownRef.contains(e.target)) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearTimeout(blurTimeout.current);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (editingClient) {
        await updateClient({
          id: editingClient._id,
          ...formData,
        }).unwrap();
      } else {
        await createClient(formData).unwrap();
      }
      resetForm();
    } catch (err) {
      setFormErrors({
        error: err.data?.message || "An error occurred.",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      status: "lead",
      notes: "",
    });
    setFormErrors({});
    setShowModal(false);
    setEditingClient(null);
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      status: client.status,
      notes: client.notes || "",
    });
    setShowModal(true);
    setOpenDropdown(null);
  };

  const handleDelete = async (clientId) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClient(clientId).unwrap();
        if (selectedClient && selectedClient._id === clientId) {
          setSelectedClient(null);
        }
      } catch (err) {
        toast.error("Failed to delete client: " + (err.data?.message || "Unknown error"))
      }
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (e, clientId) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === clientId ? null : clientId);
  };

  // Navigation to client detail page
  const handleClientClick = (client) => {
    navigate(`/realestate/clients/${client._id}`);
  };

  // Generate timeline link for client
  const generateTimelineLink = (client) => {
    const baseUrl = window.location.origin;
    const timelineUrl = `${baseUrl}/realestate/clients/${client._id}/timeline`;
    return timelineUrl;
  };

  // Copy timeline link to clipboard
  const copyTimelineLink = async (client) => {
    try {
      const link = generateTimelineLink(client);
      await navigator.clipboard.writeText(link);
      toast.success("Timeline link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  if (isLoading || isFetching) {
    return (
      <LoadingSpinner/>
    );
  }
  
  if (isError || error) {
    return (
      <div className="text-white p-6">
        <h2>Error loading clients</h2>
        <p>Error details: {JSON.stringify(error, null, 2)}</p>
      </div>
    );
  }

  return (
    <div
      className="text-white p-6"
      style={{
        backgroundColor: "var(--lighter-dark, #1a1a1a)",
        minHeight: "100vh",
      }}
    >

      {stats?.data && (
        <div className="mb-6 grid grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400">Total Clients</h3>
            <p className="text-2xl font-bold">{stats.data.totalClients}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400">Active Buyers</h3>
            <p className="text-2xl font-bold">{stats.data.activeBuyers}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400">Active Sellers</h3>
            <p className="text-2xl font-bold">{stats.data.activeSellers}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400">Leads</h3>
            <p className="text-2xl font-bold">{stats.data.leads}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <ClientHeader
        clients={clients}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        expanded={expanded}
        setExpanded={setExpanded}
        inputRef={inputRef}
        wrapperRef={wrapperRef}
        resetForm={resetForm}
        setShowModal={setShowModal}
      />

      {/* View Toggle */}
      <ClientViewToggle view={view} setView={setView} />

      {/* Add/Edit Client Modal */}
      <ClientFormModal
        showModal={showModal}
        editingClient={editingClient}
        formData={formData}
        formErrors={formErrors}
        statusOptions={statusOptions}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />

      {/* Clients View */}
      {view === "list" && (
        <ClientListTable
          clients={clients}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          dropdownRefs={dropdownRefs}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          statusStyles={statusStyles}
          onRowClick={handleClientClick}
        />
      )}
      {view === "board" && (
        <ClientBoardView
          clients={clients}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          dropdownRefs={dropdownRefs}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          statusStyles={statusStyles}
          onCardClick={handleClientClick}
        />
      )}
      {view === "calendar" && <ClientCalendarView />}

      <ClientDetailPanel
        selectedClient={selectedClient}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        onClose={() => setSelectedClient(null)}
      />

      <QuickActions features={features} />
    </div>
  );
}