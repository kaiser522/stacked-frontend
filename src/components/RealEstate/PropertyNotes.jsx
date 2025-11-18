/**
 * PropertyNotes Component
 * 
 * A component for managing property notes with full CRUD operations.
 * Integrates with the backend notes API for real-time data management.
 * 
 * @param {string} userId - The current user's ID
 * @param {string} userRole - The current user's role (admin, real_estate, etc.)
 * @param {string} propertyId - The property ID to fetch notes for
 */
import { useState } from "react";
import {
    StickyNote,
    Plus,
    Edit,
    Trash2,
    User,
    Calendar,
} from "lucide-react";
import { Button } from "./ui/Button";
import {
    useGetPropertyNotesQuery,
    useCreateNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
} from "../../store/apis/notes.api";

const PropertyNotes = ({ userId, userRole, propertyId }) => {
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [newNoteContent, setNewNoteContent] = useState("");
    const [editNoteContent, setEditNoteContent] = useState("");

    // API hooks
    const { data: notesData, isLoading, error, refetch } = useGetPropertyNotesQuery(propertyId, {
        skip: !propertyId,
        // Add polling configuration to prevent unnecessary requests
        pollingInterval: 0, // Disable polling
        refetchOnMountOrArgChange: true, // Changed to true to ensure data loads
        refetchOnFocus: false, // Don't refetch when window regains focus
    });
    const [createNote, { isLoading: isCreating }] = useCreateNoteMutation();
    const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
    const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();

    // Debug logging to see the API response structure
    console.log('PropertyNotes Debug:', {
        propertyId,
        notesData,
        isLoading,
        error,
        notesDataStructure: {
            hasData: !!notesData,
            dataType: typeof notesData,
            dataKeys: notesData ? Object.keys(notesData) : [],
            dataData: notesData?.data,
            dataDataKeys: notesData?.data ? Object.keys(notesData.data) : [],
            dataNotes: notesData?.data?.notes,
            dataNotesLength: notesData?.data?.notes?.length,
        }
    });

    // Try different possible response structures
    let notes = notesData?.data?.notes ||
        notesData?.notes ||
        notesData?.data ||
        [];

    // If we have data but no notes array, try to extract notes from the response
    if (notesData && !Array.isArray(notes)) {
        console.log('Raw notesData:', notesData);
        // Try to find notes in the response
        if (Array.isArray(notesData)) {
            notes = notesData;
        } else if (notesData && typeof notesData === 'object') {
            // Look for any array in the response
            const arrays = Object.values(notesData).filter(val => Array.isArray(val));
            if (arrays.length > 0) {
                notes = arrays[0];
                console.log('Found notes array in response:', notes);
            }
        }
    }



    const handleAddNote = async () => {
        if (!newNoteContent.trim() || !propertyId) return;

        try {
            await createNote({
                propertyId,
                content: newNoteContent.trim(),
            }).unwrap();

            setNewNoteContent("");
            setIsAddingNote(false);
        } catch (error) {
            console.error("Failed to create note:", error);
            // You might want to show a toast notification here
        }
    };

    const handleUpdateNote = async (noteId) => {
        if (!editNoteContent.trim()) return;

        try {
            await updateNote({
                noteId,
                content: editNoteContent.trim(),
                propertyId,
            }).unwrap();

            setEditNoteContent("");
            setEditingNoteId(null);
        } catch (error) {
            console.error("Failed to update note:", error);
            // You might want to show a toast notification here
        }
    };

    const handleDeleteNote = async (noteId) => {
        if (!confirm("Are you sure you want to delete this note?")) return;

        try {
            await deleteNote({ noteId, propertyId }).unwrap();
        } catch (error) {
            console.error("Failed to delete note:", error);
            // You might want to show a toast notification here
        }
    };

    const startEditing = (note) => {
        setEditingNoteId(note._id);
        setEditNoteContent(note.content);
    };

    const cancelEditing = () => {
        setEditingNoteId(null);
        setEditNoteContent("");
    };

    const canEditNote = (note) => {
        // Admin can edit any note
        if (userRole === "admin") return true;
        // Agent can only edit their own notes
        return note.userId === userId;
    };

    const canDeleteNote = (note) => {
        // Admin can delete any note
        if (userRole === "admin") return true;
        // Agent can only delete their own notes
        return note.userId === userId;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Show error if propertyId is missing
    if (!propertyId) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <StickyNote className="w-5 h-5 text-[var(--primary-color)]" />
                    <h3 className="text-lg font-semibold text-gray-200">Notes</h3>
                </div>
                <div className="text-center py-8 text-red-400">
                    <p>Property ID is missing. Cannot load notes.</p>
                </div>
            </div>
        );
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <StickyNote className="w-5 h-5 text-[var(--primary-color)]" />
                    <h3 className="text-lg font-semibold text-gray-200">Notes</h3>
                </div>
                <div className="text-center py-8 text-gray-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)] mx-auto"></div>
                    <p className="mt-2">Loading notes...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <StickyNote className="w-5 h-5 text-[var(--primary-color)]" />
                    <h3 className="text-lg font-semibold text-gray-200">Notes</h3>
                </div>
                <div className="text-center py-8 text-red-400">
                    <p>Failed to load notes. Please try again.</p>
                    <Button
                        onClick={refetch}
                        variant="outline"
                        size="sm"
                        className="mt-2 border-none text-gray-300 ring-1 ring-red-400/70 cursor-pointer hover:ring-red-400"
                    >
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <StickyNote className="w-5 h-5 text-[var(--primary-color)]" />
                    <h3 className="text-lg font-semibold text-gray-200">Notes</h3>
                    <span className="text-sm text-gray-400">({notes.length})</span>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddingNote(true)}
                    className="border-none text-gray-300 ring-1 ring-[var(--primary-color)]/70 cursor-pointer hover:ring-[var(--primary-color)]"
                >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Note
                </Button>
            </div>

            {/* Add Note Form */}
            {isAddingNote && (
                <div className="bg-[var(--lighter-dark)] rounded-lg p-4 border border-[var(--primary-color)]/30">
                    <div className="space-y-3">
                        <textarea
                            value={newNoteContent}
                            onChange={(e) => setNewNoteContent(e.target.value)}
                            placeholder="Add a note about this property..."
                            className="w-full h-24 px-3 py-2 bg-[var(--medium-dark)] border border-[var(--primary-color)]/30 rounded-lg text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none resize-none"
                        />
                        <div className="flex gap-2">
                            <Button
                                onClick={handleAddNote}
                                disabled={!newNoteContent.trim() || isCreating}
                                size="sm"
                            >
                                {isCreating ? "Adding..." : "Add Note"}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsAddingNote(false);
                                    setNewNoteContent("");
                                }}
                                disabled={isCreating}
                                size="sm"
                                className="border-none text-gray-300 ring-1 ring-gray-400/70 cursor-pointer hover:ring-gray-400"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notes List */}
            <div className="space-y-3">
                {notes.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <StickyNote className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No notes yet. Add your first note to get started.</p>
                    </div>
                ) : (
                    notes.map((note) => (
                        <div
                            key={note._id}
                            className="bg-[var(--lighter-dark)] rounded-lg p-4 border border-[var(--primary-color)]/30"
                        >
                            {editingNoteId === note._id ? (
                                // Edit Mode
                                <div className="space-y-3">
                                    <textarea
                                        value={editNoteContent}
                                        onChange={(e) => setEditNoteContent(e.target.value)}
                                        className="w-full h-20 px-3 py-2 bg-[var(--medium-dark)] border border-[var(--primary-color)]/30 rounded-lg text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none resize-none"
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleUpdateNote(note._id)}
                                            disabled={!editNoteContent.trim() || isUpdating}
                                            size="sm"
                                        >
                                            {isUpdating ? "Saving..." : "Save"}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={cancelEditing}
                                            disabled={isUpdating}
                                            size="sm"
                                            className="border-none text-gray-300 ring-1 ring-gray-400/70 cursor-pointer hover:ring-gray-400"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                // View Mode
                                <div>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <User className="w-3 h-3" />
                                            <span>{note.userId.name}</span>
                                            <span>•</span>
                                            <Calendar className="w-3 h-3" />
                                            <span>{formatDate(note.createdAt)}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {canEditNote(note) && (
                                                <button
                                                    onClick={() => startEditing(note)}
                                                    className="p-1 text-gray-400 hover:text-[var(--primary-color)] transition-colors"
                                                    title="Edit note"
                                                >
                                                    <Edit className="w-3 h-3" />
                                                </button>
                                            )}
                                            {canDeleteNote(note) && (
                                                <button
                                                    onClick={() => handleDeleteNote(note._id)}
                                                    disabled={isDeleting}
                                                    className="p-1 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                                                    title="Delete note"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-200 whitespace-pre-wrap">{note.content}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PropertyNotes;
