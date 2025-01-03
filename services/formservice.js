import axios from "axios";
import { addTokenToHeader } from "../helper";

//const API_BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Fetch all forms for a user
 * @param {string} userId - The ID of the user
 * @returns {Promise}
 */
export async function getAllforms(userId) {
  try {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/newform/formbot`, {
      headers,
      params: { userId }, // Pass userId as a query parameter
    });

    if (res.status === 401) {
      handleUnauthorized();
    }
    return res;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

/**
 * Fetch a specific form by ID
 * @param {string} userId - The ID of the user
 * @returns {Promise}
 */
export async function fetchForm(userId) {
  try {
    const headers = addTokenToHeader({ headers: {} }); // Add token to headers
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/newform/formbot/userId`, {
      headers,
      params: { userId }, // Pass userId as a query parameter
    });

    if (res.status === 401) {
      handleUnauthorized();
    }
    return res;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

/**
 * Add a new component to a form
 * @param {string} formId - The ID of the form
 * @param {Object} component - The component to add
 * @returns {Promise}
 */
export async function addComponentToForm(formId, component) {
  try {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/forms/${formId}/components`,
      component,
      { headers }
    );

    if (res.status === 401) {
      handleUnauthorized();
    }
    return res;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

/**
 * Delete a component from a form
 * @param {string} formId - The ID of the form
 * @param {string} componentId - The ID of the component
 * @returns {Promise}
 */
export async function deleteComponent(formId, componentId) {
  try {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/v1/forms/${formId}/components/${componentId}`,
      { headers }
    );

    if (res.status === 401) {
      handleUnauthorized();
    }
    return res;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

/**
 * Generate a shareable link for a form
 * @param {string} formId - The ID of the form
 * @returns {Promise}
 */
export async function generateFormLink(formId) {
  try {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/forms/${formId}/generate-link`,
      {},
      { headers }
    );

    if (res.status === 401) {
      handleUnauthorized();
    }
    return res;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

/**
 * Handle unauthorized errors (401 status)
 */
function handleUnauthorized() {
  localStorage.removeItem("token");
  alert("You're logged out");
  window.location.href = "/login";
}

/**
 * Handle API errors
 * @param {Object} error - The error object
 */
function handleError(error) {
  console.error("API Error:", error);
  if (error.response && error.response.status === 401) {
    handleUnauthorized();
  }
}
