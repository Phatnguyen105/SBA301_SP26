function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-soft mt-auto pt-5 pb-4">
      <div className="container">
        <div className="row align-items-start text-center text-md-start gy-4">
          {/* Avatar + Tên */}
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-center align-items-md-start">
              <img
                src="https://phatnguyenstorage.blob.core.windows.net/avacuaphat/Ava.jpg"
                alt="Phat Nguyen"
                className="rounded-circle mb-3 shadow-sm footer-avatar"
                width="100"
                height="100"
                loading="lazy"
              />
              <h5 className="mb-1 fw-semibold text-dark">© Phat Nguyen</h5>
              <p className="text-muted mb-0 small">Backend Developer</p>
            </div>
          </div>

          {/* Liên hệ */}
          <div className="col-md-4">
            <h5 className="mb-3 fw-semibold footer-section-title">Liên hệ</h5>
            <p className="text-muted small mb-2">
              Luôn sẵn sàng trao đổi về cơ hội hợp tác và dự án mới.
            </p>
            <a
              href="mailto:Phatnguyen111005@gmail.com"
              className="footer-link d-inline-flex align-items-center gap-2"
              title="Gửi email cho Phat Nguyen"
            >
              <i className="bi bi-envelope-fill" />
              <span className="text-truncate">Phatnguyen111005@gmail.com</span>
            </a>
          </div>

          {/* Social links */}
          <div className="col-md-4">
            <h5 className="mb-3 fw-semibold footer-section-title">Follow me</h5>
            <p className="text-muted small mb-3">
              Kết nối để cập nhật những dự án và chia sẻ mới nhất.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="#" className="footer-icon-btn" aria-label="GitHub">
                <i className="bi bi-github" />
              </a>
              <a href="#" className="footer-icon-btn" aria-label="LinkedIn">
                <i className="bi bi-linkedin" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 pt-4 footer-bottom">
          <small className="text-muted">
            © {year} <span className="fw-semibold text-dark">Phat Nguyen</span>. All rights reserved.
          </small>
        </div>
      </div>

      <style jsx>{`
        .footer-soft {
          background: linear-gradient(
            180deg,
            rgba(236, 245, 255, 0.98),
            rgba(250, 252, 255, 1)
          );
          border-top: 1px solid rgba(148, 163, 184, 0.15);
        }

        .footer-avatar {
          border: 3px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
        }

        .footer-section-title {
          color: #0b172a;
          letter-spacing: 0.02em;
        }

        .footer-link {
          color: #16a0ff;
          text-decoration: none;
          font-weight: 500;
          padding: 0.3rem 0.6rem;
          border-radius: 999px;
          background: rgba(22, 160, 255, 0.04);
          border: 1px solid rgba(22, 160, 255, 0.12);
          transition: all 0.25s ease;
        }

        .footer-link:hover {
          background: rgba(22, 160, 255, 0.12);
          border-color: rgba(22, 160, 255, 0.4);
          color: #0b172a;
          transform: translateY(-1px);
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
        }

        .footer-link i {
          font-size: 1rem;
        }

        .footer-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.28);
          color: #111827;
          font-size: 1.25rem;
          transition: all 0.25s ease;
        }

        .footer-icon-btn:hover {
          background: linear-gradient(135deg, #16a0ff, #5ee0c7);
          color: #0b172a;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 12px 26px rgba(22, 160, 255, 0.3);
        }

        .footer-bottom {
          border-top: 1px dashed rgba(148, 163, 184, 0.35);
        }
      `}</style>
    </footer>
  )
}

export default Footer