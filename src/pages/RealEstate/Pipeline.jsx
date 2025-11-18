import React, { useState, useEffect } from "react";
import IntercomChat from "../../components/IntercomChat";

export default function Pipeline() {
    // Default columns data
    const defaultColumns = [
        {
            title: "New Leads",
            count: 4,
            cards: [
                { address: "789 Maple Drive", meta: "Added 2d ago", city: "Houston, TX 77003", price: "$96K", tags: [{ label: "Vacant", color: "indigo" }] },
                { address: "321 Cedar Lane", meta: "Added 3d ago", city: "Houston, TX 77004", price: "$145K", tags: [{ label: "Divorce", color: "purple" }] },
            ],
        },
        {
            title: "Contacted",
            count: 2,
            cards: [
                { address: "456 Pine Avenue", meta: "Contacted 1d ago", city: "Houston, TX 77002", price: "$182K", tags: [{ label: "Rental", color: "green" }] },
            ],
        },
        {
            title: "Appointment",
            count: 1,
            cards: [
                { address: "123 Oak Street", meta: "Meeting Apr 26", city: "Houston, TX 77001", price: "$132K", tags: [{ label: "Payments", color: "red" }] },
            ],
        },
        {
            title: "Offer Made",
            count: 1,
            cards: [
                { address: "555 Elm Court", meta: "Offered Apr 20", city: "Houston, TX 77005", price: "$165K", tags: [{ label: "Inherited", color: "yellow" }] },
            ],
        },
        {
            title: "Contract",
            count: 1,
            cards: [
                { address: "222 Birch Street", meta: "Closing May 5", city: "Houston, TX 77006", price: "$128K", tags: [{ label: "Tired Owner", color: "blue" }] },
            ],
        },
        {
            title: "Closed",
            count: 2,
            cards: [
                { address: "888 Spruce Way", meta: "Closed Apr 18", city: "Houston, TX 77007", price: "$12,500", tags: [] },
            ],
        },
    ];

    // Load columns from localStorage or use default
    const [columns, setColumns] = useState(() => {
        try {
            const savedColumns = localStorage.getItem('pipeline-columns');
            return savedColumns ? JSON.parse(savedColumns) : defaultColumns;
        } catch (error) {
            console.error('Error loading columns from localStorage:', error);
            return defaultColumns;
        }
    });

    const [draggedCard, setDraggedCard] = useState(null);
    const [draggedFromColumn, setDraggedFromColumn] = useState(null);
    const [draggedFromIndex, setDraggedFromIndex] = useState(null);
    const [editingColumn, setEditingColumn] = useState(null);
    const [newColumnTitle, setNewColumnTitle] = useState("");
    const [showAddColumn, setShowAddColumn] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [editingCardData, setEditingCardData] = useState({});
    const [showAddCard, setShowAddCard] = useState(null);
    const [newCardData, setNewCardData] = useState({
        address: "",
        city: "",
        price: "",
        meta: "",
        tags: ""
    });

    // Save columns to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('pipeline-columns', JSON.stringify(columns));
        } catch (error) {
            console.error('Error saving columns to localStorage:', error);
        }
    }, [columns]);

    // Drag and Drop Handlers
    const handleDragStart = (e, card, columnTitle, cardIndex) => {
        setDraggedCard(card);
        setDraggedFromColumn(columnTitle);
        setDraggedFromIndex(cardIndex);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.outerHTML);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e, targetColumnTitle) => {
        e.preventDefault();

        if (!draggedCard || draggedFromColumn === targetColumnTitle) {
            return;
        }

        // Remove card from source column
        const updatedColumns = columns.map(col => {
            if (col.title === draggedFromColumn) {
                return {
                    ...col,
                    cards: col.cards.filter((_, index) => index !== draggedFromIndex),
                    count: col.cards.length - 1
                };
            }
            return col;
        });

        // Add card to target column
        const finalColumns = updatedColumns.map(col => {
            if (col.title === targetColumnTitle) {
                return {
                    ...col,
                    cards: [...col.cards, draggedCard],
                    count: col.cards.length + 1
                };
            }
            return col;
        });

        setColumns(finalColumns);

        // Reset drag state
        setDraggedCard(null);
        setDraggedFromColumn(null);
        setDraggedFromIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedCard(null);
        setDraggedFromColumn(null);
        setDraggedFromIndex(null);
    };

    // Column Management Handlers
    const handleEditColumnTitle = (columnIndex) => {
        setEditingColumn(columnIndex);
        setNewColumnTitle(columns[columnIndex].title);
    };

    const handleSaveColumnTitle = (columnIndex) => {
        if (newColumnTitle.trim()) {
            const updatedColumns = columns.map((col, index) =>
                index === columnIndex ? { ...col, title: newColumnTitle.trim() } : col
            );
            setColumns(updatedColumns);
        }
        setEditingColumn(null);
        setNewColumnTitle("");
    };

    const handleCancelEdit = () => {
        setEditingColumn(null);
        setNewColumnTitle("");
    };

    const handleDeleteColumn = (columnIndex) => {
        if (window.confirm("Are you sure you want to delete this column? All cards in this column will be lost.")) {
            const updatedColumns = columns.filter((_, index) => index !== columnIndex);
            setColumns(updatedColumns);
        }
    };

    const handleAddColumn = () => {
        if (newColumnTitle.trim()) {
            const newColumn = {
                title: newColumnTitle.trim(),
                count: 0,
                cards: []
            };
            setColumns([...columns, newColumn]);
            setNewColumnTitle("");
            setShowAddColumn(false);
        }
    };

    const handleCancelAddColumn = () => {
        setShowAddColumn(false);
        setNewColumnTitle("");
    };

    const _handleResetToDefault = () => {
        if (window.confirm("Are you sure you want to reset the pipeline to default columns? All your custom columns and changes will be lost.")) {
            setColumns(defaultColumns);
            localStorage.removeItem('pipeline-columns');
        }
    };
    const handleEditCard = (columnIndex, cardIndex) => {
        const card = columns[columnIndex].cards[cardIndex];
        setEditingCard(`${columnIndex}-${cardIndex}`);
        setEditingCardData({
            address: card.address,
            city: card.city,
            price: card.price,
            meta: card.meta,
            tags: card.tags.map(tag => tag.label).join(', ')
        });
    };

    const handleSaveCard = (columnIndex, cardIndex) => {
        if (editingCardData.address.trim()) {
            const updatedColumns = columns.map((col, colIdx) => {
                if (colIdx === columnIndex) {
                    return {
                        ...col,
                        cards: col.cards.map((card, cardIdx) => {
                            if (cardIdx === cardIndex) {
                                const tags = editingCardData.tags
                                    ? editingCardData.tags.split(',').map(tag => {
                                        const trimmedTag = tag.trim();
                                        const colorMap = {
                                            'Vacant': 'indigo',
                                            'Divorce': 'purple',
                                            'Rental': 'green',
                                            'Payments': 'red',
                                            'Inherited': 'yellow',
                                            'Tired Owner': 'blue'
                                        };
                                        return {
                                            label: trimmedTag,
                                            color: colorMap[trimmedTag] || 'indigo'
                                        };
                                    }).filter(tag => tag.label)
                                    : [];

                                return {
                                    address: editingCardData.address.trim(),
                                    city: editingCardData.city.trim(),
                                    price: editingCardData.price.trim(),
                                    meta: editingCardData.meta.trim(),
                                    tags: tags
                                };
                            }
                            return card;
                        })
                    };
                }
                return col;
            });
            setColumns(updatedColumns);
        }
        setEditingCard(null);
        setEditingCardData({});
    };

    const handleCancelCardEdit = () => {
        setEditingCard(null);
        setEditingCardData({});
    };

    const handleDeleteCard = (columnIndex, cardIndex) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            const updatedColumns = columns.map((col, colIdx) => {
                if (colIdx === columnIndex) {
                    return {
                        ...col,
                        cards: col.cards.filter((_, idx) => idx !== cardIndex),
                        count: col.cards.length - 1
                    };
                }
                return col;
            });
            setColumns(updatedColumns);
        }
    };

    // Add New Card Handlers
    const handleAddCard = (columnIndex) => {
        setShowAddCard(columnIndex);
        setNewCardData({
            address: "",
            city: "",
            price: "",
            meta: "",
            tags: ""
        });
    };

    const handleSaveNewCard = (columnIndex) => {
        if (newCardData.address.trim()) {
            const tags = newCardData.tags
                ? newCardData.tags.split(',').map(tag => {
                    const trimmedTag = tag.trim();
                    const colorMap = {
                        'Vacant': 'indigo',
                        'Divorce': 'purple',
                        'Rental': 'green',
                        'Payments': 'red',
                        'Inherited': 'yellow',
                        'Tired Owner': 'blue'
                    };
                    return {
                        label: trimmedTag,
                        color: colorMap[trimmedTag] || 'indigo'
                    };
                }).filter(tag => tag.label)
                : [];

            const newCard = {
                address: newCardData.address.trim(),
                city: newCardData.city.trim(),
                price: newCardData.price.trim(),
                meta: newCardData.meta.trim(),
                tags: tags
            };

            const updatedColumns = columns.map((col, colIdx) => {
                if (colIdx === columnIndex) {
                    return {
                        ...col,
                        cards: [...col.cards, newCard],
                        count: col.cards.length + 1
                    };
                }
                return col;
            });
            setColumns(updatedColumns);
        }
        setShowAddCard(null);
        setNewCardData({
            address: "",
            city: "",
            price: "",
            meta: "",
            tags: ""
        });
    };

    const handleCancelAddCard = () => {
        setShowAddCard(null);
        setNewCardData({
            address: "",
            city: "",
            price: "",
            meta: "",
            tags: ""
        });
    };

    const tagClass = (color) => {
        const map = {
            indigo: "bg-indigo-900 text-indigo-100",
            purple: "bg-purple-900 text-purple-100",
            green: "bg-green-900 text-green-100",
            red: "bg-red-900 text-red-100",
            yellow: "bg-yellow-900 text-yellow-100",
            blue: "bg-blue-900 text-blue-100",
        };
        return map[color] || "bg-slate-700 text-slate-100";
    };

    return (
        <div className="space-y-8">
            <IntercomChat enableFin={false} />
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Deal Pipeline</h1>
                    <p className="text-gray-400">Drag-and-drop Kanban view of your deals</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* <button
                        onClick={handleResetToDefault}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                        title="Reset to default columns"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Reset
                    </button> */}
                    <button
                        onClick={() => setShowAddColumn(true)}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Column
                    </button>
                </div>
            </div>

            {/* Kanban */}
            <div className="flex overflow-x-auto pb-4">
                {columns.map((col, colIndex) => (
                    <div
                        key={col.title}
                        className="min-w-[300px] bg-[#475569] rounded-lg mr-4 p-4"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, col.title)}
                    >
                        <div className="flex items-center justify-between mb-4">
                            {editingColumn === colIndex ? (
                                <div className="flex items-center gap-2 flex-1">
                                    <input
                                        type="text"
                                        value={newColumnTitle}
                                        onChange={(e) => setNewColumnTitle(e.target.value)}
                                        className="bg-[#334155] text-white px-2 py-1 rounded text-sm font-medium flex-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveColumnTitle(colIndex);
                                            if (e.key === 'Escape') handleCancelEdit();
                                        }}
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => handleSaveColumnTitle(colIndex)}
                                        className="text-green-400 hover:text-green-300 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between flex-1">
                                    <h3 className="font-medium text-white">{col.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEditColumnTitle(colIndex)}
                                            className="text-gray-400 hover:text-white transition-colors"
                                            title="Edit column title"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteColumn(colIndex)}
                                            className="text-red-400 hover:text-red-300 transition-colors"
                                            title="Delete column"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                            <span className="bg-gray-600 text-xs px-2 py-1 rounded-full text-white ml-2">{col.count}</span>
                        </div>
                        {col.cards.map((card, idx) => {
                            const isEditing = editingCard === `${colIndex}-${idx}`;

                            return (
                                <div
                                    key={idx}
                                    className={`bg-[#334155] rounded-lg p-4 mb-3 border-l-4 border-teal-300 transition-all duration-200 ${draggedCard && draggedFromColumn === col.title && draggedFromIndex === idx
                                        ? 'opacity-50 scale-95'
                                        : isEditing
                                            ? 'ring-2 ring-teal-400'
                                            : 'hover:bg-[#3f4a5a] hover:shadow-lg cursor-move'
                                        }`}
                                    draggable={!isEditing}
                                    onDragStart={!isEditing ? (e) => handleDragStart(e, card, col.title, idx) : undefined}
                                    onDragEnd={handleDragEnd}
                                >
                                    {isEditing ? (
                                        // Edit Mode
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-xs text-gray-400 block mb-1">Address</label>
                                                <input
                                                    type="text"
                                                    value={editingCardData.address || ''}
                                                    onChange={(e) => setEditingCardData({ ...editingCardData, address: e.target.value })}
                                                    className="w-full bg-[#475569] text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-400 block mb-1">City</label>
                                                <input
                                                    type="text"
                                                    value={editingCardData.city || ''}
                                                    onChange={(e) => setEditingCardData({ ...editingCardData, city: e.target.value })}
                                                    className="w-full bg-[#475569] text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-400 block mb-1">Price</label>
                                                <input
                                                    type="text"
                                                    value={editingCardData.price || ''}
                                                    onChange={(e) => setEditingCardData({ ...editingCardData, price: e.target.value })}
                                                    className="w-full bg-[#475569] text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-400 block mb-1">Meta Info</label>
                                                <input
                                                    type="text"
                                                    value={editingCardData.meta || ''}
                                                    onChange={(e) => setEditingCardData({ ...editingCardData, meta: e.target.value })}
                                                    className="w-full bg-[#475569] text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-400 block mb-1">Tags (comma-separated)</label>
                                                <input
                                                    type="text"
                                                    value={editingCardData.tags || ''}
                                                    onChange={(e) => setEditingCardData({ ...editingCardData, tags: e.target.value })}
                                                    placeholder="Vacant, Rental, etc."
                                                    className="w-full bg-[#475569] text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 pt-2">
                                                <button
                                                    onClick={() => handleSaveCard(colIndex, idx)}
                                                    className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancelCardEdit}
                                                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // Display Mode
                                        <>
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="font-medium text-white">{card.address}</div>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => handleEditCard(colIndex, idx)}
                                                        className="text-gray-400 hover:text-white transition-colors p-1"
                                                        title="Edit card"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCard(colIndex, idx)}
                                                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                                                        title="Delete card"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-300 mb-2">{card.city}</div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-wrap gap-1">
                                                    {card.tags.map((t, i) => (
                                                        <span key={i} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${tagClass(t.color)}`}>{t.label}</span>
                                                    ))}
                                                </div>
                                                <div className="text-sm font-medium text-teal-300">{card.price}</div>
                                            </div>
                                            <div className="text-xs text-gray-400 mt-2">{card.meta}</div>
                                        </>
                                    )}
                                </div>
                            );
                        })}

                        {/* Add New Card Interface */}
                        {showAddCard === colIndex ? (
                            <div className="bg-[#334155] rounded-lg p-4 mb-3 border-l-4 border-teal-300 ring-2 ring-teal-400">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1">Address *</label>
                                        <input
                                            type="text"
                                            value={newCardData.address}
                                            onChange={(e) => setNewCardData({ ...newCardData, address: e.target.value })}
                                            placeholder="123 Main Street"
                                            className="w-full bg-[#475569] text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            autoFocus
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1">City</label>
                                        <input
                                            type="text"
                                            value={newCardData.city}
                                            onChange={(e) => setNewCardData({ ...newCardData, city: e.target.value })}
                                            placeholder="Houston, TX 77001"
                                            className="w-full bg-[#475569] text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1">Price</label>
                                        <input
                                            type="text"
                                            value={newCardData.price}
                                            onChange={(e) => setNewCardData({ ...newCardData, price: e.target.value })}
                                            placeholder="$150K"
                                            className="w-full bg-[#475569] text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1">Meta Info</label>
                                        <input
                                            type="text"
                                            value={newCardData.meta}
                                            onChange={(e) => setNewCardData({ ...newCardData, meta: e.target.value })}
                                            placeholder="Added today, Meeting tomorrow, etc."
                                            className="w-full bg-[#475569] text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1">Tags (comma-separated)</label>
                                        <input
                                            type="text"
                                            value={newCardData.tags}
                                            onChange={(e) => setNewCardData({ ...newCardData, tags: e.target.value })}
                                            placeholder="Vacant, Rental, etc."
                                            className="w-full bg-[#475569] text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 pt-2">
                                        <button
                                            onClick={() => handleSaveNewCard(colIndex)}
                                            className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Add Card
                                        </button>
                                        <button
                                            onClick={handleCancelAddCard}
                                            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleAddCard(colIndex)}
                                className="w-full bg-[#334155] hover:bg-[#3f4a5a] rounded-lg p-3 mb-3 border-2 border-dashed border-gray-500 hover:border-teal-300 transition-all duration-200 text-gray-400 hover:text-teal-300 flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Add Card
                            </button>
                        )}

                        {/* Drop zone indicator */}
                        {draggedCard && draggedFromColumn !== col.title && (
                            <div className="border-2 border-dashed border-teal-300 rounded-lg p-4 mb-3 bg-teal-900/20 text-center text-teal-300 text-sm">
                                Drop here to move to {col.title}
                            </div>
                        )}
                    </div>
                ))}

                {/* Add New Column Interface */}
                {showAddColumn && (
                    <div className="min-w-[300px] bg-[#475569] rounded-lg mr-4 p-4 border-2 border-dashed border-teal-300">
                        <div className="flex items-center justify-between mb-4">
                            <input
                                type="text"
                                placeholder="Column title..."
                                value={newColumnTitle}
                                onChange={(e) => setNewColumnTitle(e.target.value)}
                                className="bg-[#334155] text-white px-2 py-1 rounded text-sm font-medium flex-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleAddColumn();
                                    if (e.key === 'Escape') handleCancelAddColumn();
                                }}
                                autoFocus
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleAddColumn}
                                className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Add
                            </button>
                            <button
                                onClick={handleCancelAddColumn}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Analytics Summary */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#334155] rounded-lg p-4">
                    <h3 className="font-medium mb-2 text-white">Deal Stage Distribution</h3>
                    <div className="flex items-center justify-center py-4">
                        <div className="w-24 h-24 rounded-full border-[14px] border-red-500 border-r-green-500 border-b-blue-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-white">
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2" />New Leads: 4</div>
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2" />Contracted: 1</div>
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2" />Closed: 2</div>
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />Other: 4</div>
                    </div>
                </div>
                <div className="bg-[#334155] rounded-lg p-4">
                    <h3 className="font-medium mb-2 text-white">Conversion Rate</h3>
                    <div className="mt-4 flex items-center">
                        <div className="text-3xl font-bold text-teal-300 mr-2">27%</div>
                        <div className="bg-green-900 text-green-100 text-xs px-2 py-1 rounded-full flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                            3.2%
                        </div>
                    </div>
                    <div className="text-sm text-gray-300 mt-2">Lead to Close conversion</div>
                    <div className="relative h-48 bg-[#334155] rounded mt-4">
                        {[40, 65, 50, 70, 85, 60].map((h, i) => (
                            <div key={i} className="absolute bottom-4 w-[12%] bg-teal-300 rounded-t" style={{ left: `${10 + i * 15}%`, height: `${h}%` }} />
                        ))}
                    </div>
                </div>
                <div className="bg-[#334155] rounded-lg p-4">
                    <h3 className="font-medium mb-2 text-white">Pipeline Value</h3>
                    <div className="text-3xl font-bold text-teal-300 mt-4">$848,500</div>
                    <div className="text-sm text-gray-300">Total pipeline value</div>
                </div>
            </div> */}
        </div>
    );
}


