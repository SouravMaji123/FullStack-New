import React, { useState, useEffect } from "react";
import { fetchForm } from "../../services/formservice"; // Importing fetchForm service
import { useParams } from "react-router-dom"; // To access formId from the route
import "./formbot.css"; // Assuming a CSS file for styles

const FormBot = () => {
  const { formId } = useParams(); // Extracting formId from the route
  const [formComponents, setFormComponents] = useState([]); // Form components
  const [messages, setMessages] = useState([]); // Chat messages
  const [inputValue, setInputValue] = useState(""); // Current input value
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the form components when the page loads
  useEffect(() => {
    const fetchFormComponents = async () => {
      try {
        const response = await fetchForm(formId);
        setFormComponents(response.data.components);
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (formId) fetchFormComponents();
  }, [formId]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", content: inputValue },
      ]);
      setInputValue("");
    }
  };

  // Render bubble components
  const renderBubble = (component) => {
    switch (component.type) {
      case "text":
        return <p>{component.content}</p>;
      case "image":
        return <img src={component.content} alt="Bubble" />;
      case "video":
        return (
          <video controls>
            <source src={component.content} type="video/mp4" />
          </video>
        );
      case "gif":
        return <img src={component.content} alt="GIF Bubble" />;
      default:
        return null;
    }
  };

  // Render input components
  const renderInput = (component) => {
    switch (component.type) {
      case "text_input":
        return (
          <input
            type="text"
            placeholder={component.placeholder || "Enter text"}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        );
      case "number_input":
        return (
          <input
            type="number"
            placeholder={component.placeholder || "Enter number"}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        );
      case "email_input":
        return (
          <input
            type="email"
            placeholder={component.placeholder || "Enter email"}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        );
      case "phone_input":
        return (
          <input
            type="tel"
            placeholder={component.placeholder || "Enter phone"}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        );
      case "date_input":
        return (
          <input
            type="date"
            placeholder={component.placeholder || "Enter date"}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        );
      case "rating_input":
        return (
          <div>
            <p>Rate: </p>
            {/* Placeholder for rating input, e.g., star rating */}
          </div>
        );
      case "button":
        return (
          <button onClick={handleSendMessage}>
            {component.placeholder || "Submit"}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-bot">
      <div className="chat-area">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.type === "user" ? "user" : "bot"}`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          formComponents.map((component, index) => (
            <div key={index} className="form-component">
              {component.type.includes("input")
                ? renderInput(component)
                : renderBubble(component)}
            </div>
          ))
        )}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default FormBot;

