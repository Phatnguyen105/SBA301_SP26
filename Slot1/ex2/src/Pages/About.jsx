// About.jsx
function About() {
  return (
    <div className="about-wrapper py-5 py-lg-6">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-9">
            <div className="about-card shadow-sm">
              <div className="text-center mb-4">
                <span className="about-badge">
                  <span className="about-badge-icon">👨‍💻</span>
                  <span className="about-badge-text">About Me</span>
                </span>
              </div>

              <h1 className="display-6 fw-bold text-center mb-3 text-dark">
                Backend Developer <span className="text-accent">Portfolio</span>
              </h1>

              <p className="lead text-muted text-center mb-4">
                Xin chào, mình là <span className="fw-semibold text-dark">Phat Nguyen</span> – 
                Backend Developer với niềm đam mê xây dựng hệ thống ổn định, dễ mở rộng 
                và tối ưu hiệu năng.
              </p>

              <div className="row g-4 mt-2">
                <div className="col-md-6">
                  <div className="about-section-box h-100">
                    <h5 className="fw-semibold mb-2 text-dark">Tóm tắt</h5>
                    <p className="small text-muted mb-0">
                      Mình tập trung vào việc thiết kế API rõ ràng, kiến trúc backend gọn gàng,
                      bảo mật tốt, dễ bảo trì. Luôn cố gắng cân bằng giữa kỹ thuật và trải nghiệm người dùng.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="about-section-box h-100">
                    <h5 className="fw-semibold mb-2 text-dark">Kỹ năng chính</h5>
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge-soft">Node.js</span>
                      <span className="badge-soft">Express</span>
                      <span className="badge-soft">Java</span>
                      <span className="badge-soft">Spring Boot</span>
                      <span className="badge-soft">PostgreSQL</span>
                      <span className="badge-soft">REST API</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-highlight mt-4">
                <p className="small mb-0">
                  Mục tiêu của mình là xây dựng những sản phẩm <span className="fw-semibold">đơn giản để dùng</span> 
                  nhưng <span className="fw-semibold">mạnh mẽ phía sau</span>, giúp đội ngũ phát triển vận hành hệ thống 
                  một cách hiệu quả và bền vững.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-wrapper {
          background: radial-gradient(circle at top, #e6f3ff 0, #f9fbff 55%, #ffffff 100%);
          min-height: calc(100vh - 160px);
        }

        .about-card {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 24px;
          padding: 2.5rem 2.2rem;
          border: 1px solid rgba(148, 163, 184, 0.25);
          backdrop-filter: blur(16px);
        }

        @media (max-width: 576px) {
          .about-card {
            padding: 2rem 1.4rem;
          }
        }

        .text-accent {
          color: #16a0ff;
        }

        .about-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
          background: rgba(22, 160, 255, 0.06);
          border: 1px solid rgba(22, 160, 255, 0.18);
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
          background: rgba(248, 250, 252, 0.9);
          border-radius: 18px;
          padding: 1.1rem 1.2rem;
          border: 1px solid rgba(226, 232, 240, 0.9);
        }

        .badge-soft {
          font-size: 0.8rem;
          padding: 0.35rem 0.8rem;
          border-radius: 999px;
          background: rgba(22, 160, 255, 0.06);
          color: #0b172a;
          border: 1px solid rgba(148, 163, 184, 0.4);
          font-weight: 500;
        }

        .about-highlight {
          margin-top: 1.5rem;
          padding: 0.85rem 1rem;
          border-radius: 16px;
          background: linear-gradient(
            120deg,
            rgba(22, 160, 255, 0.06),
            rgba(94, 224, 199, 0.06)
          );
          border: 1px dashed rgba(148, 163, 184, 0.6);
        }
      `}</style>
    </div>
  )
}

export default About