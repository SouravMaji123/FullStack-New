import axios from "axios";
import { addTokenToHeader } from "../helper";
export async function getAllforms(id) {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/newform`,id,{
        headers
    });
    if (res.status === 401) {
        localStorage.removeItem("token");
        alert("You're logged out");
        window.location.href = "/login";
    }
    return res;
}

export async function fetchFormById(userId) {
    try {
        const headers = addTokenToHeader({ headers: {} }); // Add token to headers
        const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/user/newform/userId`, 
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



// export const fetchAllFormsById = async (userId) => {
//   const token = localStorage.getItem("token");
//   try {
//     const response = await axios.get(
//       `${import.meta.env.VITE_BASE_URL}/api/v1/forms`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { userId }, // Pass userId as a query parameter if needed
//       }
//     );
//     return response;
//   } catch (error) {
//     console.error("Error fetching forms by user ID:", error);
//     throw error;
//   }
// };


export function addform(data) {
    const headers = addTokenToHeader({ headers: {} });
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/newform`, data, {
        headers
    });
    return res;
}
export function editform(data, id) {
    const headers = addTokenToHeader({ headers: {} });
    const res = axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/user/newform/${id}`, data, {
        headers
    });
    return res;
}
//delete form
export async function deleteForm(formId) {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/user/forms/${formId}`, { headers });
    return res;
}
