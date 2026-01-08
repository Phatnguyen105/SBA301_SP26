// About.jsx
function About() {
  return (
    <div className="about-wrapper py-5 py-lg-6">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11">
            <div className="about-card shadow-sm">
              <div className="text-center mb-4">
                <span className="about-badge">
                  <span className="about-badge-icon">🌸</span>
                  <span className="about-badge-text">Về chúng tôi</span>
                </span>
              </div>

              <h1 className="display-6 fw-bold text-center mb-3 text-dark">
                Flower<span className="text-accent">Shop</span> - Cửa hàng hoa tươi đẹp nhất
              </h1>

              <p className="lead text-muted text-center mb-5">
                Với hơn 10 năm kinh nghiệm trong ngành hoa tươi, chúng tôi tự hào mang đến 
                những bó hoa tươi thắm, đẹp mắt và ý nghĩa cho mọi dịp đặc biệt trong cuộc sống.
              </p>

              <div className="row g-4 mt-2 mb-4">
                <div className="col-md-6">
                  <div className="about-section-box h-100">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="about-icon-circle">
                        <i className="bi bi-flower1" />
                      </div>
                      <h5 className="fw-semibold mb-0 text-dark">Hoa tươi mỗi ngày</h5>
                    </div>
                    <p className="small text-muted mb-0">
                      Chúng tôi nhập hoa tươi mỗi ngày từ các vườn hoa uy tín, đảm bảo chất lượng 
                      và độ tươi mới tuyệt đối cho từng bó hoa.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="about-section-box h-100">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="about-icon-circle">
                        <i className="bi bi-heart-fill" />
                      </div>
                      <h5 className="fw-semibold mb-0 text-dark">Tận tâm phục vụ</h5>
                    </div>
                    <p className="small text-muted mb-0">
                      Đội ngũ nhân viên chuyên nghiệp, tư vấn nhiệt tình giúp bạn chọn được 
                      bó hoa phù hợp nhất cho từng dịp đặc biệt.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="about-section-box h-100">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="about-icon-circle">
                        <i className="bi bi-truck" />
                      </div>
                      <h5 className="fw-semibold mb-0 text-dark">Giao hàng nhanh</h5>
                    </div>
                    <p className="small text-muted mb-0">
                      Dịch vụ giao hàng tận nơi nhanh chóng, đảm bảo hoa tươi đến tay khách hàng 
                      trong thời gian ngắn nhất.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="about-section-box h-100">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="about-icon-circle">
                        <i className="bi bi-star-fill" />
                      </div>
                      <h5 className="fw-semibold mb-0 text-dark">Chất lượng đảm bảo</h5>
                    </div>
                    <p className="small text-muted mb-0">
                      Cam kết 100% hoa tươi, đẹp và đúng với hình ảnh. Nếu không hài lòng, 
                      chúng tôi sẽ đổi mới hoàn toàn miễn phí.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-stats row g-3 mb-4">
                <div className="col-6 col-md-3">
                  <div className="stat-box text-center">
                    <div className="stat-number text-accent fw-bold">10+</div>
                    <div className="stat-label text-muted small">Năm kinh nghiệm</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-box text-center">
                    <div className="stat-number text-accent fw-bold">5000+</div>
                    <div className="stat-label text-muted small">Khách hàng hài lòng</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-box text-center">
                    <div className="stat-number text-accent fw-bold">100+</div>
                    <div className="stat-label text-muted small">Loại hoa</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-box text-center">
                    <div className="stat-number text-accent fw-bold">24/7</div>
                    <div className="stat-label text-muted small">Hỗ trợ online</div>
                  </div>
                </div>
              </div>

              <div className="about-highlight mt-4">
                <p className="small mb-0 text-center">
                  <i className="bi bi-quote" /> Chúng tôi tin rằng mỗi bó hoa không chỉ là một món quà, 
                  mà còn là cách thể hiện <span className="fw-semibold">tình cảm chân thành</span> và 
                  <span className="fw-semibold"> sự quan tâm</span> đến những người thân yêu. 
                  Hãy để chúng tôi giúp bạn gửi đi những thông điệp yêu thương qua từng cánh hoa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-wrapper {
          background: radial-gradient(circle at top, #fff0f5 0, #fff5f8 55%, #ffffff 100%);
          min-height: calc(100vh - 160px);
        }

        .about-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          padding: 2.5rem 2.2rem;
          border: 1px solid rgba(255, 107, 157, 0.2);
          backdrop-filter: blur(16px);
        }

        @media (max-width: 576px) {
          .about-card {
            padding: 2rem 1.4rem;
          }
        }

        .text-accent {
          color: #ff6b9d;
        }

        .about-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
          background: rgba(255, 107, 157, 0.1);
          border: 1px solid rgba(255, 107, 157, 0.2);
        }

        .about-badge-icon {
          font-size: 1.1rem;
        }

        .about-badge-text {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #0b172a;
          font-weight: 600;
        }

        .about-section-box {
          background: rgba(255, 245, 250, 0.6);
          border-radius: 18px;
          padding: 1.5rem 1.2rem;
          border: 1px solid rgba(255, 107, 157, 0.15);
          transition: all 0.3s ease;
        }

        .about-section-box:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(255, 107, 157, 0.15);
          border-color: rgba(255, 107, 157, 0.3);
        }

        .about-icon-circle {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ff6b9d, #ffc1cc);
          color: #0b172a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
        }

        .about-stats {
          margin-top: 2rem;
        }

        .stat-box {
          padding: 1.5rem 1rem;
          background: rgba(255, 245, 250, 0.6);
          border-radius: 16px;
          border: 1px solid rgba(255, 107, 157, 0.15);
          transition: all 0.3s ease;
        }

        .stat-box:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(255, 107, 157, 0.15);
        }

        .stat-number {
          font-size: 2rem;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.85rem;
        }

        .about-highlight {
          margin-top: 1.5rem;
          padding: 1.5rem 1.2rem;
          border-radius: 16px;
          background: linear-gradient(
            120deg,
            rgba(255, 107, 157, 0.08),
            rgba(255, 193, 204, 0.08)
          );
          border: 1px dashed rgba(255, 107, 157, 0.4);
        }

        .about-highlight i {
          font-size: 1.5rem;
          color: #ff6b9d;
          opacity: 0.5;
        }
      `}</style>
    </div>
  )
}

export default About