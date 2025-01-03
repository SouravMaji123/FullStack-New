//addform
import React, { useState, useEffect } from "react";
import { fetchFormById, addform } from "../../services/newForm";
import { decodeToken } from "react-jwt"; // To decode the JWT token
import { useNavigate } from "react-router-dom"; // For navigation

const FormManager = () => {
  const [forms, setForms] = useState([]); // State to store the list of forms
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [userId, setUserId] = useState(null); // State to store the user ID
  const navigate = useNavigate(); // For navigating to the FormBuilder page

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

  // Fetch forms for the user when userId is set
  useEffect(() => {
    if (userId) {
      fetchForms();
    }
  }, [userId]);

  const fetchForms = async () => {
    try {
      setIsLoading(true);
      const response = await fetchFormById(userId); // Fetch forms by user ID
      if (response.status === 200) {
        setForms(response.data.forms); // Assuming `response.data.forms` contains the forms list
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewForm = async () => {
    try {
      const formData = { name: "Untitled Form", background: "default", userId }; // Include userId in form data
      const response = await addform(formData);
      if (response.status === 201) {
        setForms((prevForms) => [...prevForms, response.data]); // Add the new form to the list
        alert("New form created!");
      }
    } catch (error) {
      console.error("Error creating form:", error);
      alert("Failed to create form");
    }
  };

  const handleFormClick = (formId) => {
    navigate(`/formbuilder`); // Navigate to the FormBuilder page with the form ID
  };

  return (
    <div>
      {/* New Form Button */}
      <button onClick={createNewForm} disabled={!userId}>
        New Form
      </button>

      {/* Loading State */}
      {isLoading && <p>Loading...</p>}

      {/* Forms List */}
      <div>
        {forms.length > 0 ? (
          forms.map((form) => (
            <div
              key={form._id} // Use unique identifier for the key
              style={{
                border: "1px solid #ddd",
                margin: "10px",
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleFormClick(form._id)} // Handle click to navigate
            >
              <h3>{form.name}</h3>
              <p>Background: {form.background}</p>
            </div>
          ))
        ) : (
          <p>No forms available. Click "New Form" to create one.</p>
        )}
      </div>
    </div>
  );
};

export default FormManager;




