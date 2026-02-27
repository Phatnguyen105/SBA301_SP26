import React from "react";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-container">
        <p className="footer-text">
          © {new Date().getFullYear()} FU News Management
        </p>
      </div>
    </footer>
  );
};

export default Footer;
