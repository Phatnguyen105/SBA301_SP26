// Contact.jsx
function Contact() {
  return (
    <div className="contact-wrapper py-5 py-lg-6">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-8">
            <div className="contact-card shadow-sm">
              <div className="text-center mb-4">
                <span className="contact-badge">
                  <span className="contact-badge-icon">✉️</span>
                  <span className="contact-badge-text">Get In Touch</span>
                </span>
              </div>

              <h1 className="display-6 fw-bold text-center mb-3 text-dark">
                Let&apos;s build something <span className="text-accent">great</span> together
              </h1>

              <p className="lead text-muted text-center mb-4">
                Có ý tưởng hay dự án muốn trao đổi? Hãy gửi email, mình sẽ phản hồi sớm nhất có thể.
              </p>

              <div className="contact-box mb-4">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <div className="contact-icon-pill">
                    <i className="bi bi-envelope-at" />
                  </div>
                  <div>
                    <div className="small text-muted">Email</div>
                    <a
                      href="mailto:Phatnguyen111005@gmail.com"
                      className="contact-link"
                    >
                      Phatnguyen111005@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-cta text-center">
                <a
                  href="mailto:Phatnguyen111005@gmail.com?subject=Project%20Inquiry"
                  className="btn btn-accent px-4 py-2 rounded-pill fw-semibold shadow-sm transition-all"
                >
                  Send Message
                </a>
                <p className="small text-muted mt-3 mb-0">
                  Mình ưu tiên phản hồi trong vòng 24h cho các yêu cầu hợp tác.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-wrapper {
          background: radial-gradient(circle at top, #e6f3ff 0, #f9fbff 55%, #ffffff 100%);
          min-height: calc(100vh - 160px);
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 24px;
          padding: 2.5rem 2.2rem;
          border: 1px solid rgba(148, 163, 184, 0.25);
          backdrop-filter: blur(16px);
        }

        @media (max-width: 576px) {
          .contact-card {
            padding: 2rem 1.4rem;
          }
        }

        .text-accent {
          color: #16a0ff;
        }

        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
          background: rgba(22, 160, 255, 0.06);
          border: 1px solid rgba(22, 160, 255, 0.18);
        }

        .contact-badge-icon {
          font-size: 1.1rem;
        }

        .contact-badge-text {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #0b172a;
          font-weight: 600;
        }

        .contact-box {
          padding: 1.2rem 1.3rem;
          border-radius: 16px;
          background: rgba(248, 250, 252, 0.9);
          border: 1px solid rgba(226, 232, 240, 0.9);
        }

        .contact-icon-pill {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #16a0ff, #5ee0c7);
          color: #0b172a;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 10px 24px rgba(22, 160, 255, 0.25);
        }

        .contact-link {
          color: #16a0ff;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .contact-link:hover {
          color: #0b172a;
          text-decoration: underline;
        }

        .btn-accent {
          background: linear-gradient(135deg, #16a0ff, #5ee0c7);
          border: none;
          color: #0b172a;
        }

        .btn-accent:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 26px rgba(22, 160, 255, 0.32);
        }
      `}</style>
    </div>
  )
}

export default Contact