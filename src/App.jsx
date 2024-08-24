import React, { useState } from 'react';
import { useDeleteNoteMutation, useGetNoteQuery } from './redux/Api/NoteApi';

const App = () => {
    const { data: items, error, isLoading } = useGetNoteQuery();
    const [deleteNote] = useDeleteNoteMutation();
    const [selectedItems, setSelectedItems] = useState([]);

    // Handle selecting all items
    const handleSelectAll = () => {
        if (selectedItems.length === items.getNote.length) {
            setSelectedItems([]); // Deselect all if all are already selected
        } else {
            setSelectedItems(items.getNote.map(item => item._id)); // Select all
        }
    };

    // Handle selecting a single item
    const handleSelectItem = (itemId) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(itemId)) {
                return prevSelectedItems.filter((id) => id !== itemId);
            } else {
                return [...prevSelectedItems, itemId];
            }
        });
    };

    const handleDeleteSelected = async () => {
        if (selectedItems.length === 0) return;
        try {
            await deleteNote(selectedItems).unwrap();
            // Optionally refetch or update the items list after deletion
        } catch (error) {
            console.error('Failed to delete items:', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading items: {error.message}</div>;

    return (
        <div>
            <h1>Items List</h1>
            <div>
                <input
                    type="checkbox"
                    checked={selectedItems.length === items?.getNote.length}
                    onChange={handleSelectAll}
                />
                <label>Select All</label>
            </div>
            <ul>
                {items?.getNote.map((item) => (
                    <li key={item._id}>
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item._id)}
                            onChange={() => handleSelectItem(item._id)}
                        />
                        {item.title}
                    </li>
                ))}
            </ul>
            <button onClick={handleDeleteSelected} disabled={selectedItems.length === 0}>
                Delete Selected
            </button>
        </div>
    );
};

export default App;
