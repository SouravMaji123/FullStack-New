// frontend/services/folderService.js
import axios from "axios";
import { addTokenToHeader } from "../helper";

// Fetch all folders
export async function getAllFolders(userId) {
    // const headers = addTokenToHeader({ headers: {} });
    // const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/newfolder/userId`, { headers });
    // return res;
     try {
        const headers = addTokenToHeader({ headers: {} }); // Add token to headers
        const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/user/newfolder/userId`, 
            {
                headers,
                params: { userId }, // Pass userId as a query parameter
            }
        );

        if (res.status === 401) {
            localStorage.removeItem("token");
            alert("You're logged out");
            window.location.href = "/login";
        }

        return res;
    } catch (error) {
        console.error("Error fetching form by ID:", error);
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            alert("You're logged out");
            window.location.href = "/login";
        }
        throw error; // Re-throw the error for further handling
    } 
}

// Create a new folder
export async function createFolder(data, userId) {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/newfolder/userId`, data, { headers, params: { userId }, });
    return res;
}

// Add a form to a folder
export async function addFormToFolder(folderId, formId) {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/newfolder${folderId}/add-form`, { formId }, { headers });
    return res;
}
//delete folder
export async function deleteFolder(folderId) {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/user/newfolder/:`, { headers,params: { folderId }, });
    return res;
    // try {
    //     const headers = addTokenToHeader({ headers: {} }); // Add token to headers
    //     const res = await axios.get(
    //         `${import.meta.env.VITE_BASE_URL}/api/v1/user/newfolder/folderId`, 
    //         {
    //             headers,
    //             params: { folderId }, // Pass userId as a query parameter
    //         }
    //     );

    //     if (res.status === 401) {
    //         localStorage.removeItem("token");
    //         alert("You're logged out");
    //         window.location.href = "/login";
    //     }

    //     return res;
    // } catch (error) {
    //     console.error("Error fetching form by ID:", error);
    //     if (error.response && error.response.status === 401) {
    //         localStorage.removeItem("token");
    //         alert("You're logged out");
    //         window.location.href = "/login";
    //     }
    //     throw error; // Re-throw the error for further handling
    // } 
}