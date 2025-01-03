import React from "react";
import "./landing.css";
import triangleSVG from "../../assets/SVG.png";
import arcSVG from "../../assets/SVG2.png";
import Formbotlogo from "../../assets/Formbotlogo.png";
import containerImage from "../../assets/Container.png";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate();
  return (
    
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo"><img src={Formbotlogo} alt="Design" className="Formbotlogo" /></div>
        <div className="nav-buttons">
          <button className="signin-button" onClick={() => navigate("/register")}>Sign in</button>
          <button className="create-button" onClick={() => navigate("/register")}>Create a FormBot</button>
        </div>
      </nav>

      {/* Main Section */}
      <div className="main-section">
        <img src={triangleSVG} alt="Triangle Design" className="triangle" />
        <div className="content">
          <h1>Build advanced chatbots visually</h1>
          <p className="Typebot">
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them anywhere on your web/mobile apps and start collecting
            results like magic.
          </p>
          <button className="main-button">Create a FormBot for free</button>
          <img src={containerImage} alt="Container Screenshot" className="container-image" />
        </div>
        <img src={arcSVG} alt="Arc Design" className="arc" />
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-section">
          <h3>FormBot</h3>
          <p>Made with ❤️ by @Sourav Maji</p>
        </div>

        <div className="footer-section">
          <h3>Product</h3>
          <ul>
            <li>Status</li>
            <li>Documentation</li>
            <li>Roadmap</li>
            <li>Pricing</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Community</h3>
          <ul>
            <li>Discord</li>
            <li>GitHub Repository</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>About</li>
            <li>Contact</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
