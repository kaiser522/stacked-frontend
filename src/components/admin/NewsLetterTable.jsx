import React from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  FileText,
  Send,
  Trash2,
  Edit,
} from "lucide-react";

export default function NewslettersTable({
  newsletters,
  searchTerm,
  sortConfig,
  setSortConfig,
  expandedNewsletter,
  setExpandedNewsletter,
  toggleModal,
  handleStatusChange,
}) {
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredNewsletters = newsletters.filter(
    (newsletter) =>
      newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newsletter.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newsletter.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNewsletters = [...filteredNewsletters].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    if (sortConfig.key === "scheduledDate" || sortConfig.key === "createdDate") {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    if (sortConfig.key === "recipients") {
      aVal = parseInt(aVal) || 0;
      bVal = parseInt(bVal) || 0;
    }

    if (aVal < bVal) return sortConfig.direction === "ascending" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  const toggleNewsletterDetails = (id) => {
    setExpandedNewsletter(expandedNewsletter === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "draft":
        return "bg-gray-900 text-[var(--gray)]";
      case "scheduled":
        return "bg-blue-900 text-blue-300";
      case "sent":
        return "bg-green-900 text-green-300";
      case "pending":
        return "bg-yellow-900 text-yellow-300";
      default:
        return "bg-gray-900 text-[var(--gray)]";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text, maxLength = 60) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure to delete the newsletter?")) {
      console.log("Deleting");
    }
  };

  return (
    <div className="overflow-auto">
      <table className="w-full text-left">
        <thead className="hover:bg-[#324250]">
          <tr>
            {["title", "description", "scheduledDate", "status"].map((col) => (
              <th
                key={col}
                className="p-4 cursor-pointer"
                onClick={() => handleSort(col)}
              >
                <div className="flex items-center gap-1 text-[var(--primary-color)] capitalize">
                  {col.replace(/([A-Z])/g, " $1")}
                  {sortConfig.key === col &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </div>
              </th>
            ))}
            <th className="p-4 text-[var(--primary-color)]">Details</th>
            <th className="p-4 text-[var(--primary-color)]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedNewsletters.map((newsletter) => (
            <React.Fragment key={newsletter.id}>
              <tr className="border-b border-[#324250] hover:bg-[#324250]">
                <td className="p-4 text-[var(--gray)] font-medium">
                  {newsletter.title}
                </td>
                <td className="p-4 text-[var(--gray)]">
                  {truncateText(newsletter.description)}
                </td>
                <td className="p-4 text-[var(--gray)]">
                  {formatDateTime(newsletter.scheduledDate)}
                </td>
                <td className="p-4 text-[var(--gray)]">
                  <select
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(newsletter.status)} bg-transparent outline-none`}
                    value={newsletter.status}
                    onChange={(e) =>
                      handleStatusChange(newsletter.id, e.target.value)
                    }
                  >
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="sent">Sent</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td className="p-4 text-[var(--gray)]">
                  <button
                    onClick={() => toggleNewsletterDetails(newsletter.id)}
                    className="text-[var(--primary-color)] hover:text-teal-300"
                  >
                    {expandedNewsletter === newsletter.id ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </td>
                <td className="flex gap-4 items-center justify-center p-4">
                  <button onClick={() => toggleModal("edit")}>
                    <Edit className="text-[var(--primary-color)]" size={18} />
                  </button>
                  <button onClick={handleDelete}>
                    <Trash2 className="text-red-600" size={18} />
                  </button>
                </td>
              </tr>

              {expandedNewsletter === newsletter.id && (
                <tr className="bg-[var(--lighter-dark)]">
                  <td colSpan="6" className="p-4">
                    <div className="grid text-gray-300 grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-bold mb-2 flex items-center gap-1 text-white">
                          <FileText size={16} />
                          Newsletters Details
                        </p>
                        <p className="mb-1">
                          <strong>Title:</strong> {newsletter.title}
                        </p>
                        <p className="mb-1">
                          <strong>Description:</strong> {newsletter.description}
                        </p>
                        <p>
                          <strong>Created:</strong>{" "}
                          {formatDate(newsletter.createdDate)}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold mb-2 flex items-center gap-1 text-[var(--gray)]">
                          <Calendar size={16} />
                          Scheduling Info
                        </p>
                        <p className="mb-1">
                          <strong>Scheduled:</strong>{" "}
                          {formatDateTime(newsletter.scheduledDate)}
                        </p>
                        <p className="mb-1">
                          <strong>Status:</strong> {newsletter.status}
                        </p>
                        {newsletter.sentDate && (
                          <p>
                            <strong>Sent:</strong>{" "}
                            {formatDateTime(newsletter.sentDate)}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="font-bold mb-2 flex items-center gap-1 text-[var(--gray)]">
                          <Send size={16} />
                          Delivery Info
                        </p>
                        <p className="mb-1">
                          <strong>Recipients:</strong>{" "}
                          {newsletter.recipients?.toLocaleString() || 0}
                        </p>
                        {newsletter.csvFile && (
                          <p className="mb-1">
                            <strong>CSV File:</strong> {newsletter.csvFile}
                          </p>
                        )}
                        {newsletter.openRate && (
                          <p className="mb-1">
                            <strong>Open Rate:</strong> {newsletter.openRate}%
                          </p>
                        )}
                        {newsletter.clickRate && (
                          <p>
                            <strong>Click Rate:</strong> {newsletter.clickRate}%
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
