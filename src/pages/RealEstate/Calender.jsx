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
  RefreshCw,
  Settings,
  ExternalLink,
} from "lucide-react";
import { useGetRealEstateUsersQuery } from "../../store/apis/user.api";
import { useGetMeetingsQuery, useCreateMeetingMutation } from "../../store/apis/meetings.api";
import useNotification from "../../components/notifications/useNotification";

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

// const initialEvents = [
//   {
//     id: "1",
//     date: new Date().toISOString().split("T")[0],
//     title: "Team Meeting",
//     color: "bg-blue-500",
//     message: "Daily sync with the team",
//     time: "10:00",
//     agent: "Alex Johnson",
//   },
//   {
//     id: "2",
//     date: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
//     title: "Design Review",
//     color: "bg-green-500",
//     message: "Present new designs",
//     time: "14:30",
//     agent: "Maria Smith",
//   },
// ];

const initialEvents = []; // Events will come from API

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState(initialEvents);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({
    title: "",
    time: "",
    message: "",
    color: "bg-blue-500",
    agent: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState("Not Connected");
  const [connectedCalendars, setConnectedCalendars] = useState([]);

  // Meetings API integration
  const { data: meetingsData = [], isFetching: meetingsLoading } = useGetMeetingsQuery();
  const [createMeeting] = useCreateMeetingMutation();
  const notify = useNotification();

  // Sync meetings to events state whenever fetched
  useEffect(() => {
    if (!meetingsLoading && meetingsData) {
      const list = Array.isArray(meetingsData)
        ? meetingsData
        : Array.isArray(meetingsData?.data)
          ? meetingsData.data
          : meetingsData.meetings || [];

      const mapped = list.map((m) => {
        const agentId = m.agent?._id || m.agent;
        const agentName = m.agent?.name || m.agent?.fullName || "";
        return {
          id: m.id || m._id,
          date: format(new Date(m.date), "yyyy-MM-dd"),
          title: m.title,
          color: m.color || "bg-blue-500",
          message: m.message,
          time: m.time,
          agent: agentId,
          agentName,
        };
      });
      setEvents(mapped);
    }
  }, [meetingsData, meetingsLoading]);

  // Fetch real-estate users for the Agent dropdown
  const {
    data: usersResponse = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useGetRealEstateUsersQuery();


  const usersOptions = useMemo(() => {
    // The API might return an object with a users array or the array itself
    if (!usersResponse) return [];
    if (Array.isArray(usersResponse)) return usersResponse;
    if (Array.isArray(usersResponse?.users)) return usersResponse.users;
    if (Array.isArray(usersResponse?.data)) return usersResponse.data;
    return [];
  }, [usersResponse]);
  // Memoized month calculations
  const { monthStart, _monthEnd, startDate, endDate } = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const _monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(_monthEnd);
    return { monthStart, _monthEnd, startDate, endDate };
  }, [currentMonth]);

  const getDayEvents = (day) => {
    const query = searchQuery.trim().toLowerCase();
    return events.filter((event) => {
      if (event.date !== format(day, "yyyy-MM-dd")) return false;
      if (!query) return true;
      const haystack = `${event.title} ${event.agent || ""} ${event.message}`.toLowerCase();
      return haystack.includes(query);
    });
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
      agent: "",
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

  // Calendar sync functions
  const connectGoogleCalendar = async () => {
    setIsSyncing(true);
    try {
      // Simulate Google Calendar API connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSyncStatus("Connected to Google Calendar");
      setConnectedCalendars(prev => [...prev, { type: 'google', name: 'Google Calendar', status: 'connected' }]);
      notify({ message: "Successfully connected to Google Calendar", type: "success" });
    } catch (error) {
      notify({ message: "Failed to connect to Google Calendar", type: "error" });
    } finally {
      setIsSyncing(false);
    }
  };

  const connectAppleCalendar = async () => {
    setIsSyncing(true);
    try {
      // Simulate Apple Calendar API connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSyncStatus("Connected to Apple Calendar");
      setConnectedCalendars(prev => [...prev, { type: 'apple', name: 'Apple Calendar', status: 'connected' }]);
      notify({ message: "Successfully connected to Apple Calendar", type: "success" });
    } catch (error) {
      notify({ message: "Failed to connect to Apple Calendar", type: "error" });
    } finally {
      setIsSyncing(false);
    }
  };

  const syncCalendars = async () => {
    setIsSyncing(true);
    try {
      // Simulate syncing with external calendars
      await new Promise(resolve => setTimeout(resolve, 3000));
      notify({ message: "Calendars synced successfully", type: "success" });
    } catch (error) {
      notify({ message: "Failed to sync calendars", type: "error" });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCreateOrUpdateEvent = () => {
    const eventData = {
      id: editingEvent?.id || Date.now().toString(),
      date: format(selectedDate, "yyyy-MM-dd"),
      ...form,
    };

    if (!editingEvent) {
      // optimistic update
      setEvents((prev) => [...prev, eventData]);

      createMeeting(eventData)
        .unwrap()
        .then(() => {
          notify({ message: "Event created", type: "success" });
          // Sync with external calendars if connected
          if (connectedCalendars.length > 0) {
            syncCalendars();
          }
        })
        .catch((err) => {
          // rollback optimistic addition
          setEvents((prev) => prev.filter((ev) => ev.id !== eventData.id));

          const msg = err?.data?.message || "Failed to create event";
          notify({ message: msg, type: "error" });
        });
    } else {
      // For update later - currently just update local state
      setEvents((prevEvents) =>
        prevEvents.map((ev) => (ev.id === editingEvent.id ? eventData : ev))
      );
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteEvent = () => {
    if (!editingEvent) return;

    setEvents(events.filter((ev) => ev.id !== editingEvent.id));
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setForm({ title: "", time: "", message: "", color: "bg-blue-500", agent: "" });
    setEditingEvent(null);
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={handleToday}
          className="flex items-center gap-2 bg-[#1BC4B6] hover:bg-[#1BC4B6] hover:cursor-pointer text-white px-4 py-2 rounded-lg transition-colors"
        >
          <CalendarIcon size={18} />
          Today
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg hover:bg-[#3a4d5c] hover:cursor-pointer transition-colors text-[#1BC4B6]"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>

          <h2 className="text-xl font-semibold text-white min-w-[180px] text-center">
            {format(currentMonth, "MMMM yyyy")}
          </h2>

          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg hover:bg-[#3a4d5c] hover:cursor-pointer transition-colors text-[#1BC4B6]"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Calendar Sync Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={connectGoogleCalendar}
            disabled={isSyncing}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors text-sm"
          >
            <ExternalLink size={16} />
            Google
          </button>
          <button
            onClick={connectAppleCalendar}
            disabled={isSyncing}
            className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 text-white rounded-lg transition-colors text-sm"
          >
            <ExternalLink size={16} />
            Apple
          </button>
          {connectedCalendars.length > 0 && (
            <button
              onClick={syncCalendars}
              disabled={isSyncing}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors text-sm"
            >
              <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />
              Sync
            </button>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-[#2a3945] border border-[#3a4d5c] rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16l4-4-4-4m5 8l4-4-4-4"
              />
            </svg>
          </span>
        </div>
        <button
          onClick={() => openNewEventModal(new Date())}
          className="flex items-center gap-2 hover:cursor-pointer bg-[#1BC4B6] hover:bg-[#1BC4B6] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>
    </div>
  );

  const renderSyncStatus = () => (
    <div className="mb-4 p-3 bg-[#2a3945] border border-[#3a4d5c] rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings size={16} className="text-gray-400" />
          <span className="text-sm text-gray-300">Calendar Sync Status:</span>
          <span className={`text-sm font-medium ${connectedCalendars.length > 0 ? 'text-green-400' : 'text-gray-400'}`}>
            {syncStatus}
          </span>
        </div>
        {connectedCalendars.length > 0 && (
          <div className="flex items-center gap-2">
            {connectedCalendars.map((calendar, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-600 text-white text-xs rounded-full"
              >
                {calendar.name}
              </span>
            ))}
          </div>
        )}
      </div>
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
              ${isToday ? "border-[#1BC4B6] border-1" : "border-[#3a4d5c]"}
              hover:bg-[#3a4d5c] cursor-pointer`}
            onClick={() => openNewEventModal(cloneDay)}
            aria-label={`Day ${format(day, "d")}`}
            role="button"
            tabIndex={0}
          >
            <div
              className={`text-sm font-medium mb-1 
              ${isToday ? "text-[#1BC4B6] font-bold" : "text-white"}`}
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
      {renderSyncStatus()}
      {renderDayNames()}
      {renderCells()}

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
                      required
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
                <label className="block text-sm font-medium text-gray-300 mb-1">Agent</label>
                {editingEvent ? (
                  <input
                    type="text"
                    disabled
                    className="w-full bg-[#3a4d5c] border border-[#465866] text-gray-400 rounded-lg px-4 py-2"
                    value={(() => {
                      const found = usersOptions.find((u) => (u._id || u.id) === form.agent);
                      return found ? found.name || found.fullName || found.email : form.agentName || "";
                    })()}
                  />
                ) : (
                  <select
                    className="w-full bg-[#3a4d5c] border border-[#465866] text-white rounded-lg px-4 py-2 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] outline-none transition"
                    value={form.agent}
                    onChange={(e) => setForm({ ...form, agent: e.target.value })}
                  >
                    <option value="" disabled>
                      {usersLoading ? "Loading agents..." : "Select an agent"}
                    </option>

                    {!usersLoading && !usersError &&
                      usersOptions.map((user) => (
                        <option key={user._id || user.id} value={user._id || user.id}>
                          {user.name || user.fullName || user.email}
                        </option>
                      ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Add details about your event"
                  className="w-full bg-[#3a4d5c] border border-[#465866] text-white rounded-lg px-4 py-2 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[#1BC4B6] outline-none transition min-h-[80px] placeholder-gray-400"
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
                className={`px-4 py-2 rounded-lg transition ${form.title.trim() && form.agent && form.time
                  ? "bg-[#1BC4B6] hover:bg-[#1BC4B6] text-white"
                  : "bg-[#3a4d5c] text-gray-500 cursor-not-allowed"
                  }`}
                disabled={!form.title.trim() || !form.agent || !form.time}
              >
                {editingEvent ? (
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
