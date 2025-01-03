import React, { useState, useEffect } from "react";
import {
  fetchForm,
  addComponentToForm,
  deleteComponent,
  generateFormLink,
} from "../../services/formservice";
import "./index.css";

const FormBuilder = () => {
  const [formComponents, setFormComponents] = useState([]);
  const [formName, setFormName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const loadForm = async () => {
      const data = await fetchForm();
      setFormComponents(data.components || []);
      setFormName(data.title || "");
      setLink(data.link || "");
    };

    loadForm();
  }, []);

  const handleAddComponent = async (type) => {
    const newComponent = {
      type,
      content: "",
      placeholder: type === "text" ? "Enter text here..." : "",
    };
    const updatedForm = await addComponentToForm(newComponent);
    setFormComponents(updatedForm.components);
  };

  const handleDeleteComponent = async (index) => {
    const updatedForm = await deleteComponent(index);
    setFormComponents(updatedForm.components);
  };

  const handleGenerateLink = async () => {
    const generatedLink = await generateFormLink();
    setLink(generatedLink);
  };

  return (
    <div className="form-builder">
      {/* Left Pane */}
      <div className="left-pane">
        <input
          type="text"
          className="form-name-input"
          placeholder="Enter form name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />

        <div className="section">
          <h4>Bubbles</h4>
          <button onClick={() => handleAddComponent("text")}>Text</button>
          <button onClick={() => handleAddComponent("image")}>Image</button>
          <button onClick={() => handleAddComponent("video")}>Video</button>
          <button onClick={() => handleAddComponent("gif")}>GIF</button>
        </div>

        <div className="section">
          <h4>Inputs</h4>
          <button onClick={() => handleAddComponent("text-input")}>Text</button>
          <button onClick={() => handleAddComponent("number")}>Number</button>
          <button onClick={() => handleAddComponent("email")}>Email</button>
          <button onClick={() => handleAddComponent("phone")}>Phone</button>
          <button onClick={() => handleAddComponent("date")}>Date</button>
          <button onClick={() => handleAddComponent("rating")}>Rating</button>
          <button onClick={() => handleAddComponent("button")}>Button</button>
        </div>
      </div>

      {/* Right Pane */}
      <div className="right-pane">
        <div className="form-header">
          <button className="copy-link" onClick={handleGenerateLink}>
            {link ? "Link Copied!" : "Generate Link"}
          </button>
        </div>

        <div className="start-bubble">Start</div>

        {formComponents.map((component, index) => (
          <div key={index} className="form-component">
            <h4>
              {component.type.charAt(0).toUpperCase() + component.type.slice(1)}{" "}
              {index + 1}
            </h4>
            {component.placeholder && (
              <input
                type="text"
                placeholder={component.placeholder}
                value={component.content || ""}
              />
            )}
            <button
              className="delete-button"
              onClick={() => handleDeleteComponent(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormBuilder;


