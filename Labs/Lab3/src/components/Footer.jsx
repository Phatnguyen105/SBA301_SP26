import "./Footer.css";

function Footer({ avatar, name, email }) {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h4 className="footer-title">About Us</h4>
            <p className="footer-text">Orchid Store offers premium orchids and flowers for every occasion.</p>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Contact Info</h4>
            <div className="author-info">
              <img
                src={avatar}
                alt="Author avatar"
                className="avatar"
              />
              <div className="author-details">
                <p className="author-name">{name}</p>
                <a href={`mailto:${email}`} className="author-email">{email}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Orchid Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
