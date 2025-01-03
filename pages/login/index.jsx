import React from "react";
import Form from "../../components/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import "./index.css";
import group2 from "../../assets/Group 2.png";
import ellipse2 from "../../assets/Ellipse 2.png";
import ellipse1 from "../../assets/Ellipse 1.png";
import Gicon from "../../assets/Google Icon.png";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({
        email: false,
        password: false,
    });

    const formFields = [
        {
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            value: formData.email,
            onChange: (e) => {
                setFormData({ ...formData, email: e.target.value });
            },
        },
        {
            name: "password",
            type: "password",
            placeholder: "Enter your password",
            value: formData.password,
            onChange: (e) => {
                setFormData({ ...formData, password: e.target.value });
            },
        },
    ];

    const errorMessages = {
        email: {
            message: "Email is required",
            isValid: formData.email.length > 0,
            onError: () => {
                setError((error) => ({ ...error, email: true }));
            },
        },
        password: {
            message: "Password is required",
            isValid: formData.password.length > 0,
            onError: () => {
                setError((error) => ({ ...error, password: true }));
            },
        },
    };

    const onSubmit = async (e) => {
        let isError = false;
        e.preventDefault();
        Object.keys(errorMessages).forEach((key) => {
            if (!errorMessages[key].isValid) {
                isError = true;
                errorMessages[key].onError();
            }
        });
        if (!isError) {
            try {
                const res = await login(formData);
                if (res.status === 200) {
                    alert("Logged in successfully");
                    const token = res.data.token;
                    localStorage.setItem("token", token);
                    navigate("/dashboard");
                } else {
                    alert("Something went wrong");
                }
            } catch (e) {
                if (e.response && e.response.status === 400) {
                    alert("Invalid email or password");
                }
            }
        }
    };

    return (
        <div className="login-page">
            <img src={group2} alt="Triangle" className="triangle" />
            <img src={ellipse2} alt="Right Circle" className="right-circle" />
            <img src={ellipse1} alt="Bottom Circle" className="bottom-circle" />
            <div className="form-container">
                <Form
                    error={error}
                    formFields={formFields}
                    onSubmit={onSubmit}
                    errorMessages={errorMessages}
                />
                <div className="additional-options">
                    <button className="google-login">
                        <img src={Gicon} alt="Google Icon" className="google-logo" />
                        Sign in with Google
                    </button>
                    <p className="register-option">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="register-link"
                        >
                            Register now
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
