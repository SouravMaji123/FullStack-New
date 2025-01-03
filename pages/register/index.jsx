
import React, { useState } from "react";
import { register } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form"; // Importing Form component
import "./index.css";
import triangle from "../../assets/Group 2.png";
import Gicon from "../../assets/Google Icon.png";
import topCircle from "../../assets/Ellipse 2.png";
import bottomCircle from "../../assets/Ellipse 1.png";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const errorMessages = {
    name: {
      message: "Name is required",
      isValid: formData.name.length > 0,
      onError: () => setError((error) => ({ ...error, name: true })),
    },
    email: {
      message: "Email is required",
      isValid: formData.email.length > 0,
      onError: () => setError((error) => ({ ...error, email: true })),
    },
    password: {
      message: "Password is required",
      isValid: formData.password.length > 0,
      onError: () => setError((error) => ({ ...error, password: true })),
    },
    confirmPassword: {
      message: "Passwords do not match",
      isValid: formData.confirmPassword === formData.password,
      onError: () => setError((error) => ({ ...error, confirmPassword: true })),
    },
  };



  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter a username",
      value: formData.name,
      onChange: (e) => setFormData({ ...formData, name: e.target.value }),
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      value: formData.email,
      onChange: (e) => setFormData({ ...formData, email: e.target.value }),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      value: formData.password,
      onChange: (e) => setFormData({ ...formData, password: e.target.value }),
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      value: formData.confirmPassword,
      onChange: (e) =>
        setFormData({ ...formData, confirmPassword: e.target.value }),
    },
  ];
  const onSubmit = async (e) => {
    e.preventDefault();
    let isError = false;
    Object.keys(errorMessages).forEach((key) => {
      if (!errorMessages[key].isValid) {
        isError = true;
        errorMessages[key].onError();
      }
    });

    if (!isError) {
        const res = await register(formData);
                    if (res.status === 201) {
                        
                        alert("Registered successfully");
                        navigate("/login");
                    }
                    else {
                        alert("Something went wrong");
                    }
    }
  };

  return (
    <div className="register-page">
      <img src={triangle} alt="Triangle" className="triangle-image" />
      <img src={topCircle} alt="Top Circle" className="top-circle-image" />
      <img
        src={bottomCircle}
        alt="Bottom Circle"
        className="bottom-circle-image"
      />
      <div className="form-container">
        <h2 className="register-title">Register</h2>
        <Form
          formFields={formFields}
          onSubmit={onSubmit}
          error={error}
          errorMessages={errorMessages}
        />
        <button className="google-button">
          <img
            src={Gicon}
            alt="Google"
            className="google-logo"
          />
          Sign Up with Google
        </button>
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log in</span>
        </p>
      </div>
    </div>
  );
}
