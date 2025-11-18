import React, { useState, useEffect, useMemo } from "react";
import { Search, Plus, Loader2 } from "lucide-react";
import Button from "../../components/Button";
import SearchInput from "../../components/Form/SearchInput";
import Modal from "../../components/Modal";
import AddEditNewsLetter from "../../components/admin/AddEditNewLetter";
import NewslettersTable from "../../components/admin/NewsLetterTable";
import { Card, CardContent } from "../../components/UI/Card";
import {
  getAllNewsletters,
  getNewsletterStats,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
} from "../../services/newsletterService";

export default function Newsletter() {
  const [newsletters, setNewsletters] = useState([]);
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    avgOpenRate: 0,
    sentThisMonth: 0,
    scheduled: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const [modalConfig, setModalConfig] = useState({
    open: false,
    type: "add",
  });
  const [expandedNewsletter, setExpandedNewsletter] = useState(null);

  // Load newsletters on mount
  useEffect(() => {
    loadNewsletters();
  }, []);

  const loadNewsletters = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [newslettersData, statsData] = await Promise.all([
        getAllNewsletters(),
        getNewsletterStats(),
      ]);
      setNewsletters(newslettersData || []);
      setStats(statsData || stats);
    } catch (err) {
      console.error("Error loading newsletters:", err);
      setError("Failed to load newsletters. Please try again.");
      setNewsletters([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const newsletter = newsletters.find((n) => n.id === id);
      if (!newsletter) return;

      await updateNewsletter(id, { status: newStatus });
      
      // Update local state
      const updated = newsletters.map((n) =>
        n.id === id ? { ...n, status: newStatus } : n
      );
      setNewsletters(updated);
      
      // Reload stats
      const statsData = await getNewsletterStats();
      setStats(statsData || stats);
    } catch (err) {
      console.error("Error updating newsletter status:", err);
      alert("Failed to update newsletter status. Please try again.");
    }
  };

  const handleSaveNewsletter = async (newsletterData) => {
    try {
      if (modalConfig.type === "edit" && expandedNewsletter?.id) {
        await updateNewsletter(expandedNewsletter.id, newsletterData);
      } else {
        await createNewsletter({
          ...newsletterData,
          status: newsletterData.scheduledDate ? "Scheduled" : "Draft",
          recipients: 0,
          csvFile: null,
          openRate: null,
          clickRate: null,
        });
      }
      
      // Reload newsletters
      await loadNewsletters();
      
      // Close modal
      setModalConfig({ open: false, type: "add" });
      setExpandedNewsletter(null);
    } catch (err) {
      console.error("Error saving newsletter:", err);
      alert("Failed to save newsletter. Please try again.");
    }
  };

  const toggleModal = (type, newsletter = null) => {
    setExpandedNewsletter(newsletter);
    setModalConfig({
      open: !modalConfig.open,
      type: type,
    });
  };

  // Filter newsletters based on search
  const filteredNewsletters = useMemo(() => {
    if (!searchQuery) return newsletters;
    const query = searchQuery.toLowerCase();
    return newsletters.filter(
      (nl) =>
        nl.title?.toLowerCase().includes(query) ||
        nl.description?.toLowerCase().includes(query)
    );
  }, [newsletters, searchQuery]);

  return (
    <>
      <div className="space-y-8 bg-[var(--lighter-dark)] p-6 mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="heading-3 font-bold text-[var(--primary-color)]">
              Newsletters
            </h1>
            <p className="text-[var(--gray)] mt-2">
              Create, schedule, and manage email newsletters
            </p>
          </div>
          <div className="flex items-center gap-4">
            <SearchInput
              value={searchQuery}
              setValue={setSearchQuery}
              placeholder="Search..."
            />
            <Button className="text-white" onClick={() => toggleModal("add")}>
              <Plus size={18} className="text-[var(--white)]" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-[#324250]">
            <CardContent className="p-6 text-center">
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-color)] mx-auto" />
              ) : (
                <>
                  <p className="text-2xl font-bold text-[var(--primary-color)]">
                    {stats.totalSubscribers.toLocaleString()}
                  </p>
                  <p className="text-sm text-[var(--gray)]">Total Subscribers</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card className="bg-[#324250]">
            <CardContent className="p-6 text-center">
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-green-600 mx-auto" />
              ) : (
                <>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.avgOpenRate.toFixed(1)}%
                  </p>
                  <p className="text-sm text-[var(--gray)]">Avg Open Rate</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card className="bg-[#324250]">
            <CardContent className="p-6 text-center">
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-purple-600 mx-auto" />
              ) : (
                <>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.sentThisMonth}
                  </p>
                  <p className="text-sm text-[var(--gray)]">Sent This Month</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card className="bg-[#324250]">
            <CardContent className="p-6 text-center">
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-orange-600 mx-auto" />
              ) : (
                <>
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.scheduled}
                  </p>
                  <p className="text-sm text-[var(--gray)]">Scheduled</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-color)]" />
            <span className="ml-2 text-gray-300">Loading newsletters...</span>
          </div>
        ) : (
          <NewslettersTable
            newsletters={filteredNewsletters}
            searchTerm={searchQuery}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            expandedNewsletter={expandedNewsletter}
            setExpandedNewsletter={setExpandedNewsletter}
            toggleModal={toggleModal}
            handleStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* Modal for add/edit news letter */}
      <Modal
        isOpen={modalConfig?.open}
        onClose={() => {
          setModalConfig({ open: false, type: "add" });
          setExpandedNewsletter(null);
        }}
        title={
          modalConfig?.type === "edit"
            ? "Edit News Letter"
            : "Create NewsLetter"
        }
        size="3xl"
      >
        <AddEditNewsLetter
          type={modalConfig?.type}
          data={modalConfig?.type === "edit" ? expandedNewsletter : null}
          onSave={handleSaveNewsletter}
          onClose={() => {
            setModalConfig({ open: false, type: "add" });
            setExpandedNewsletter(null);
          }}
        />
      </Modal>
    </>
  );
}
