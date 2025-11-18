import React, { useState, useMemo, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { Dialog } from "@headlessui/react";
import {
  ChevronLeft,
  ChevronRight,
  Trash2,
  Plus,
  X,
  Calendar as CalendarIcon,
  Clock,
  Edit2,
  Loader2,
} from "lucide-react";
import {
  getAllCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "../../services/calendarService";

const colorOptions = [
  { class: "bg-blue-500", name: "Blue" },
  { class: "bg-green-500", name: "Green" },
  { class: "bg-purple-500", name: "Purple" },
  { class: "bg-red-500", name: "Red" },
  { class: "bg-yellow-500", name: "Yellow" },
  { class: "bg-pink-500", name: "Pink" },
  { class: "bg-indigo-500", name: "Indigo" },
  { class: "bg-gray-500", name: "Gray" },
];

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({
    title: "",
    time: "",
    message: "",
    color: "bg-blue-500",
  });

  // Load events from Firebase
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const eventsData = await getAllCalendarEvents();
      // Convert events to format expected by component
      const formattedEvents = eventsData.map((event) => ({
        id: event.id,
        date: format(event.date, "yyyy-MM-dd"),
        title: event.title,
        color: event.color || "bg-blue-500",
        message: event.message || "",
        time: event.time || "",
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error loading calendar events:", error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Memoized month calculations
  const { monthStart, monthEnd, startDate, endDate } = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    return { monthStart, monthEnd, startDate, endDate };
  }, [currentMonth]);

  const getDayEvents = (day) => {
    return events.filter((event) => event.date === format(day, "yyyy-MM-dd"));
  };

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleToday = () => setCurrentMonth(new Date());

  const openNewEventModal = (date) => {
    setSelectedDate(date);
    setForm({
      title: "",
      time: "",
      message: "",
      color: "bg-blue-500",
    });
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const openEditEventModal = (date, event) => {
    setSelectedDate(date);
    setEditingEvent(event);
    setForm({ ...event });
    setIsModalOpen(true);
  };

  const handleCreateOrUpdateEvent = async () => {
    if (!form.title.trim()) return;

    setIsSaving(true);
    try {
      const eventDate = new Date(selectedDate);
      if (form.time) {
        const [hours, minutes] = form.time.split(":");
        eventDate.setHours(parseInt(hours), parseInt(minutes));
      }

      const eventData = {
        date: eventDate,
        title: form.title,
        message: form.message,
        time: form.time,
        color: form.color,
      };

      if (editingEvent) {
        await updateCalendarEvent(editingEvent.id, eventData);
      } else {
        await createCalendarEvent(eventData);
      }

      // Reload events
      await loadEvents();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving calendar event:", error);
      alert("Failed to save event. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!editingEvent) return;

    try {
      await deleteCalendarEvent(editingEvent.id);
      // Reload events
      await loadEvents();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error deleting calendar event:", error);
      alert("Failed to delete event. Please try again.");
    }
  };

  const resetForm = () => {
    setForm({ title: "", time: "", message: "", color: "bg-blue-500" });
    setEditingEvent(null);
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={handleToday}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 hover:cursor-pointer text-white px-4 py-2 rounded-lg transition-colors"
        >
          <CalendarIcon size={18} />
          Today
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg hover:bg-[#3a4d5c] hover:cursor-pointer transition-colors text-teal-400"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>

          <h2 className="text-xl font-semibold text-white min-w-[180px] text-center">
            {format(currentMonth, "MMMM yyyy")}
          </h2>

          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg hover:bg-[#3a4d5c] hover:cursor-pointer transition-colors text-teal-400"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <button
        onClick={() => openNewEventModal(new Date())}
        className="flex items-center gap-2 hover:cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <Plus size={18} />
        Add Event
      </button>
    </div>
  );

  const renderDayNames = () => (
    <div className="grid grid-cols-7 gap-2 mb-2 text-gray-300">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className="text-center text-sm font-medium uppercase tracking-wider"
        >
          {day}
        </div>
      ))}
    </div>
  );

  const renderCells = () => {
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const dayEvents = getDayEvents(cloneDay);
        const isToday = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day}
            className={`relative p-2 h-32 rounded-lg transition-all border
              ${!isCurrentMonth ? "bg-[#2a3945] text-gray-500" : "bg-[#324250]"}
              ${isToday ? "border-teal-500 border-1" : "border-[#3a4d5c]"}
              hover:bg-[#3a4d5c] cursor-pointer`}
            onClick={() => openNewEventModal(cloneDay)}
            aria-label={`Day ${format(day, "d")}`}
            role="button"
            tabIndex={0}
          >
            <div
              className={`text-sm font-medium mb-1 
              ${isToday ? "text-teal-400 font-bold" : "text-white"}`}
            >
              {format(day, "d")}
            </div>

            <div className="space-y-1 overflow-y-auto max-h-20">
              {dayEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className={`text-xs px-2 py-1 rounded text-white ${event.color} truncate flex items-center`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditEventModal(cloneDay, event);
                  }}
                >
                  {event.time && (
                    <span className="font-medium mr-1">
                      {format(parseISO(`2000-01-01T${event.time}`), "h:mm a")}
                    </span>
                  )}
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-gray-400 pl-2">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="space-y-2">{rows}</div>;
  };

  return (
    <div className="bg-[var(--lighter-dark)]  p-6 rounded-2xl max-w-6xl mx-auto">
      {renderHeader()}
      {renderDayNames()}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
          <span className="ml-2 text-gray-300">Loading calendar...</span>
        </div>
      ) : (
        renderCells()
      )}

      {/* Event Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-[#324250] p-6 rounded-2xl shadow-xl w-full max-w-md border border-[#3a4d5c]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Dialog.Title className="text-xl font-bold text-white">
                  {editingEvent ? "Edit Event" : "New Event"}
                </Dialog.Title>
                <p className="text-gray-300 mt-1">
                  {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                </p>
              </div>
              <div className="flex gap-2">
                {editingEvent && (
                  <button
                    onClick={handleDeleteEvent}
                    className="p-2 text-gray-300 hover:text-red-400 rounded-full hover:bg-[#3a4d5c] transition-colors"
                    aria-label="Delete event"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-[#3a4d5c] transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Event title*
                </label>
                <input
                  type="text"
                  placeholder="Team meeting, birthday, etc."
                  className="w-full bg-[#3a4d5c] border border-[#465866] text-white rounded-lg px-4 py-2 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] outline-none transition placeholder-gray-400"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Clock size={16} />
                    </div>
                    <input
                      type="time"
                      className="w-full bg-[#3a4d5c] border border-[#465866] text-white rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] outline-none transition"
                      value={form.time}
                      onChange={(e) =>
                        setForm({ ...form, time: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Color
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {colorOptions.map((color) => (
                      <button
                        key={color.class}
                        type="button"
                        aria-label={color.name}
                        className={`w-6 h-6 rounded-full transition ${color.class
                          } ${form.color === color.class
                            ? "ring-0 ring-offset-2 ring-gray-300"
                            : ""
                          }`}
                        onClick={() => setForm({ ...form, color: color.class })}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Add details about your event"
                  className="w-full bg-[#3a4d5c] border border-[#465866] text-white rounded-lg px-4 py-2 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-teal-500 outline-none transition min-h-[80px] placeholder-gray-400"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-300 hover:text-white rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrUpdateEvent}
                className={`px-4 py-2 rounded-lg transition ${form.title.trim() && !isSaving
                    ? "bg-teal-500 hover:bg-teal-600 text-white"
                    : "bg-[#3a4d5c] text-gray-500 cursor-not-allowed"
                  }`}
                disabled={!form.title.trim() || isSaving}
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                  </span>
                ) : editingEvent ? (
                  <span className="flex items-center gap-2">
                    <Edit2 size={16} /> Update
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus size={16} /> Add Event
                  </span>
                )}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default Calendar;
