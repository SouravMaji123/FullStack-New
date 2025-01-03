//addfolder foldermanager
import React, { useState, useEffect } from "react";
import { getAllFolders, createFolder, addFormToFolder, deleteFolder } from "../../services/newFolder";
import { addform, deleteForm } from "../../services/newForm";
import { decodeToken } from "react-jwt";

const FolderManager = () => {
    const [folders, setFolders] = useState([]);
    const [folderName, setFolderName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(null); // State to store the user ID

    // Extract userId from token on component load
      useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = decodeToken(token);
          if (decoded && decoded.id) {
            setUserId(decoded.id);
          } else {
            alert("Invalid or expired token. Please log in again.");
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect to login page
          }
        } else {
          alert("No token found. Please log in.");
          window.location.href = "/login"; // Redirect to login page
        }
      }, []);

    // useEffect(() => {
    //     fetchFolders();
    // }, []);
    useEffect(() => {
        if (userId) {
          fetchFolders();
        }
      }, [userId]);

    const fetchFolders = async () => {
        try {
            setIsLoading(true);
            const response = await getAllFolders(userId);
            if (response.status === 200) {
                setFolders(response.data.folders);
            }
        } catch (error) {
            console.error("Error fetching folders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateFolder = async () => {
        try {
            const response = await createFolder({ name: folderName },userId);
            if (response.status === 201) {
                setFolders((prevFolders) => [...prevFolders, response.data.folder]);
                setFolderName("");
            }
        } catch (error) {
            console.error("Error creating folder:", error);
        }
    };

    const handleAddForm = async (folderId, formId) => {
        try {
            const formResponse = await addform({ name: "Untitled Form", background: "default" });
            if (formResponse.status === 201) {
                const addResponse = await addFormToFolder(folderId, formResponse.data._id);
                if (addResponse.status === 200) {
                    fetchFolders(); // Refresh folder list to include the new form
                }
            }
        } catch (error) {
            console.error("Error adding form to folder:", error);
        }
    };

    const handleDeleteFolder = async (folderId) => {
        try {
            const response = await deleteFolder(folderId);
            if (response.status === 200) {
                setFolders((prevFolders) => prevFolders.filter((folder) => folder._id !== folderId));
            }
        } catch (error) {
            console.error("Error deleting folder:", error);
        }
    };

    const handleDeleteForm = async (folderId, formId) => {
        try {
            const response = await deleteForm(formId);
            if (response.status === 200) {
                setFolders((prevFolders) =>
                    prevFolders.map((folder) =>
                        folder._id === folderId
                            ? { ...folder, forms: folder.forms.filter((form) => form._id !== formId) }
                            : folder
                    )
                );
            }
        } catch (error) {
            console.error("Error deleting form:", error);
        }
    };

    return (
        <div>
            {/* Create Folder */}
            <div>
                <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="Enter folder name"
                />
                <button onClick={handleCreateFolder}>Create Folder</button>
            </div>

            {/* Loading State */}
            {isLoading && <p>Loading...</p>}

            {/* Folders List */}
            <div>
                {folders.map((folder) => (
                    <div key={folder._id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
                        <h3>
                            {folder.name}
                            <button
                                style={{ marginLeft: "10px", color: "red" }}
                                onClick={() => handleDeleteFolder(folder._id)}
                            >
                                Delete
                            </button>
                        </h3>
                        <button onClick={() => handleAddForm(folder._id)}>Add New Form</button>
                        <ul>
                            {folder.forms.map((form) => (
                                <li key={form._id}>
                                    {form.name}
                                    <button
                                        style={{ marginLeft: "10px", color: "red" }}
                                        onClick={() => handleDeleteForm(folder._id, form._id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FolderManager;
