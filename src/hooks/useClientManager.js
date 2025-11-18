// hooks/useClientManager.js
import { useState } from "react";

export default function useClientManager(initialClients) {
  const [clients, setClients] = useState(initialClients);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Lead",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [editingClient, setEditingClient] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) errors.phone = "Phone is required";

    const emailExists = clients.some(
      (client) =>
        client.email.toLowerCase() === formData.email.toLowerCase() &&
        (!editingClient || client.id !== editingClient.id)
    );
    if (emailExists) errors.email = "Email already exists";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", status: "Lead", notes: "" });
    setFormErrors({});
    setEditingClient(null);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingClient) {
      const updatedClients = clients.map((client) =>
        client.id === editingClient.id ? { ...client, ...formData } : client
      );
      setClients(updatedClients);
      if (selectedClient?.id === editingClient.id) {
        setSelectedClient(updatedClients.find((c) => c.id === editingClient.id));
      }
    } else {
      const newClient = {
        id: Math.max(...clients.map((c) => c.id), 0) + 1,
        ...formData,
        lastContact: new Date().toISOString().split("T")[0],
      };
      setClients((prev) => [newClient, ...prev]);
    }

    resetForm();
  };

  return {
    clients,
    setClients,
    formData,
    setFormData,
    formErrors,
    editingClient,
    setEditingClient,
    selectedClient,
    setSelectedClient,
    handleSubmit,
    resetForm,
    validateForm,
  };
}
