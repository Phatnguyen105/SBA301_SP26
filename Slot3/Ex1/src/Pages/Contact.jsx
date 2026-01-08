// Contact.jsx
function Contact() {
  return (
    <div className="contact-wrapper py-5 py-lg-6">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11">
            <div className="contact-card shadow-sm">
              <div className="text-center mb-4">
                <span className="contact-badge">
                  <span className="contact-badge-icon">💐</span>
                  <span className="contact-badge-text">Liên hệ với chúng tôi</span>
                </span>
              </div>

              <h1 className="display-6 fw-bold text-center mb-3 text-dark">
                Hãy để chúng tôi <span className="text-accent">giúp bạn</span> chọn hoa đẹp nhất
              </h1>

              <p className="lead text-muted text-center mb-5">
                Chúng tôi luôn sẵn sàng tư vấn và hỗ trợ bạn chọn những bó hoa tươi đẹp nhất 
                cho mọi dịp đặc biệt. Liên hệ ngay để nhận được phục vụ tốt nhất!
              </p>

              <div className="row g-4 mb-4">
                <div className="col-md-4">
                  <div className="contact-box h-100 text-center">
                    <div className="contact-icon-pill mb-3 mx-auto">
                      <i className="bi bi-envelope-at" />
                    </div>
                    <h5 className="fw-semibold mb-2 text-dark">Email</h5>
                    <a
                      href="mailto:info@flowershop.com"
                      className="contact-link"
                    >
                      info@flowershop.com
                    </a>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="contact-box h-100 text-center">
                    <div className="contact-icon-pill mb-3 mx-auto">
                      <i className="bi bi-telephone-fill" />
                    </div>
                    <h5 className="fw-semibold mb-2 text-dark">Điện thoại</h5>
                    <a
                      href="tel:+84123456789"
                      className="contact-link"
                    >
                      0123 456 789
                    </a>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="contact-box h-100 text-center">
                    <div className="contact-icon-pill mb-3 mx-auto">
                      <i className="bi bi-geo-alt-fill" />
                    </div>
                    <h5 className="fw-semibold mb-2 text-dark">Địa chỉ</h5>
                    <p className="contact-text mb-0">
                      123 Đường Hoa<br />
                      Quận 1, TP.HCM
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-form-box">
                <h5 className="fw-semibold mb-3 text-dark text-center">Gửi tin nhắn cho chúng tôi</h5>
                <form className="contact-form">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-flower"
                        placeholder="Tên của bạn"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control form-control-flower"
                        placeholder="Email của bạn"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control form-control-flower"
                        placeholder="Số điện thoại"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control form-control-flower"
                        rows="4"
                        placeholder="Nội dung tin nhắn..."
                        required
                      />
                    </div>
                    <div className="col-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-accent px-5 py-2 rounded-pill fw-semibold shadow-sm transition-all"
                      >
                        Gửi tin nhắn
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="contact-cta text-center mt-4">
                <p className="small text-muted mb-0">
                  <i className="bi bi-clock-fill" /> Chúng tôi phản hồi trong vòng 2 giờ làm việc
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-wrapper {
          background: radial-gradient(circle at top, #fff0f5 0, #fff5f8 55%, #ffffff 100%);
          min-height: calc(100vh - 160px);
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          padding: 2.5rem 2.2rem;
          border: 1px solid rgba(255, 107, 157, 0.2);
          backdrop-filter: blur(16px);
        }

        @media (max-width: 576px) {
          .contact-card {
            padding: 2rem 1.4rem;
          }
        }

        .text-accent {
          color: #ff6b9d;
        }

        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
          background: rgba(255, 107, 157, 0.1);
          border: 1px solid rgba(255, 107, 157, 0.2);
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
          padding: 1.5rem 1.2rem;
          border-radius: 18px;
          background: rgba(255, 245, 250, 0.6);
          border: 1px solid rgba(255, 107, 157, 0.15);
          transition: all 0.3s ease;
        }

        .contact-box:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(255, 107, 157, 0.15);
          border-color: rgba(255, 107, 157, 0.3);
        }

        .contact-icon-pill {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: linear-gradient(135deg, #ff6b9d, #ffc1cc);
          color: #0b172a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 10px 24px rgba(255, 107, 157, 0.25);
        }

        .contact-link {
          color: #ff6b9d;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .contact-link:hover {
          color: #0b172a;
          text-decoration: underline;
        }

        .contact-text {
          color: #4a5568;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .contact-form-box {
          padding: 2rem;
          border-radius: 20px;
          background: rgba(255, 245, 250, 0.4);
          border: 1px solid rgba(255, 107, 157, 0.15);
        }

        .form-control-flower {
          border: 1px solid rgba(255, 107, 157, 0.2);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          transition: all 0.3s ease;
        }

        .form-control-flower:focus {
          border-color: #ff6b9d;
          box-shadow: 0 0 0 0.2rem rgba(255, 107, 157, 0.15);
          outline: none;
        }

        .btn-accent {
          background: linear-gradient(135deg, #ff6b9d, #ffc1cc);
          border: none;
          color: #0b172a;
        }

        .btn-accent:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 26px rgba(255, 107, 157, 0.32);
        }

        .transition-all {
          transition: all 0.28s ease;
        }
      `}</style>
    </div>
  )
}

export default Contact