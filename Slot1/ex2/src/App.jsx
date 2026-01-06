import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./Components/Header"
import Footer from "./Components/Footer"
import About from "./Pages/About"
import Contact from "./Pages/Contact"

function Home() {
  return (
    <div className="home-wrapper py-5 py-lg-6">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-7 col-lg-8 text-center">
            <span className="home-badge mb-3 d-inline-flex align-items-center gap-2">
              <span className="home-badge-dot" />
              <span className="home-badge-text">Welcome to my space</span>
            </span>

            <h1 className="display-4 fw-bold mb-3 text-dark">
              WELCOME TO MY <span className="text-accent">WEBSITE</span>
            </h1>

            <p className="lead text-muted mb-4">
              Mình là <span className="fw-semibold text-dark">Nguyễn Đăng Hùng Phát</span>, Backend Developer 
              tập trung vào xây dựng hệ thống ổn định, dễ mở rộng và dễ bảo trì.
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
              <span className="badge-soft">Backend Developer</span>
              <span className="badge-soft">Node.js</span>
              <span className="badge-soft">Java &amp; Spring Boot</span>
              <span className="badge-soft">PostgreSQL</span>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3">
              <a
                href="#get-started"
                className="btn btn-accent px-4 py-2 rounded-pill fw-semibold shadow-sm transition-all"
              >
                Get Started
              </a>
              <a
                href="mailto:Phatnguyen111005@gmail.com"
                className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .home-wrapper {
          background: radial-gradient(circle at top, #e6f3ff 0, #f9fbff 55%, #ffffff 100%);
          min-height: calc(100vh - 160px);
        }

        .text-accent {
          color: #16a0ff;
        }

        .home-badge {
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          background: rgba(22, 160, 255, 0.06);
          border: 1px solid rgba(22, 160, 255, 0.18);
        }

        .home-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #16a0ff;
          box-shadow: 0 0 0 6px rgba(22, 160, 255, 0.2);
        }

        .home-badge-text {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #0b172a;
          font-weight: 600;
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

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-fill py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App