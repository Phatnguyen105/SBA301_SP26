import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="df-footer" role="contentinfo">
      <div className="df-footer-inner">
        <div>© {new Date().getFullYear()} FU News Management</div>
        <div className="df-footer-links">
          <button
            className="df-link"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
