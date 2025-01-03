//services/auth.js
import axios from "axios";
import { handleApiResponse } from "../helper";
export const register = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/register`, data, {
        headers: {
            'Content-Type': "application/json"
        }
    });

    return res;// todo handleapiresponse case list
}
export const login = async (data) => {
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/login`, data, {
        headers: {
            'Content-Type': "application/json"
        }
    });
    return res;
}