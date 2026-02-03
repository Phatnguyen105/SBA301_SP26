import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccountService from "../services/AccountService";
import "../styles/login.css"; // file CSS mới

const Login = () => {
  const [credentials, setCredentials] = useState({
    accountEmail: "",
    accountPassword: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    if (!credentials.accountEmail.trim()) {
      return "Vui lòng nhập email.";
    }
    // simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.accountEmail)) {
      return "Email không hợp lệ.";
    }
    if (!credentials.accountPassword) {
      return "Vui lòng nhập mật khẩu.";
    }
    if (credentials.accountPassword.length < 6) {
      return "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const clientError = validate();
    if (clientError) {
      setError(clientError);
      return;
    }

    setLoading(true);
    try {
      const response = await AccountService.login({
        accountEmail: credentials.accountEmail.trim(),
        accountPassword: credentials.accountPassword,
      });

      // preserve remember preference in localStorage if needed
      if (credentials.remember) {
        try {
          localStorage.setItem("savedEmail", credentials.accountEmail.trim());
        } catch {
          // ignore localStorage errors silently
        }
      } else {
        try {
          localStorage.removeItem("savedEmail");
        } catch {}
      }

      // call auth context login with response (keeps original logic)
      login(response);

      // Redirect based on role (keeps original logic)
      if (response?.accountRole === 1) {
        navigate("/accounts");
      } else {
        navigate("/news");
      }
    } catch (err) {
      // friendly error message, fallback if response shape differs
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Đăng nhập thất bại. Vui lòng kiểm tra thông tin và thử lại.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // load saved email if exists
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("savedEmail");
      if (saved) {
        setCredentials((prev) => ({ ...prev, accountEmail: saved, remember: true }));
      }
    } catch {}
  }, []);

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="brand">
          <div className="logo" aria-hidden="true">FU</div>
          <h1 className="brand-title">FU News Management</h1>
          <p className="brand-sub">Quản lý tin tức nội bộ</p>
        </div>

        <form className="login-card" onSubmit={handleSubmit} noValidate>
          <h2 className="card-title">Đăng nhập</h2>

          <div role="status" aria-live="polite" className="status-row">
            {error && <div className="alert alert-danger" aria-atomic="true">{error}</div>}
          </div>

          <label className="form-label" htmlFor="accountEmail">Email</label>
          <input
            id="accountEmail"
            name="accountEmail"
            type="email"
            className="form-input"
            value={credentials.accountEmail}
            onChange={handleChange}
            autoComplete="email"
            required
            aria-required="true"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="field-hint">Nhập email công ty của bạn</div>

          <label className="form-label" htmlFor="accountPassword">Mật khẩu</label>
          <div className="password-row">
            <input
              id="accountPassword"
              name="accountPassword"
              type={showPassword ? "text" : "password"}
              className="form-input"
              value={credentials.accountPassword}
              onChange={handleChange}
              autoComplete="current-password"
              required
              aria-required="true"
            />
            <button
              type="button"
              className="btn-toggle"
              onClick={() => setShowPassword((s) => !s)}
              aria-pressed={showPassword}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>

          <div className="options-row">
            <label className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={credentials.remember}
                onChange={handleChange}
              />
              <span>Ghi nhớ email</span>
            </label>
            <button
              type="button"
              className="link-btn"
              onClick={() => navigate("/forgot-password")}
            >
              Quên mật khẩu
            </button>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? (
              <span className="btn-loading" aria-hidden="true">
                <span className="spinner" /> Đang đăng nhập...
              </span>
            ) : (
              "Đăng nhập"
            )}
          </button>

          <div className="divider" aria-hidden="true">hoặc</div>

          <div className="signup-row">
            <span>Chưa có tài khoản?</span>
            <button type="button" className="link-btn" onClick={() => navigate("/register")}>
              Đăng ký
            </button>
          </div>
        </form>

        <footer className="login-footer">
          <small>© {new Date().getFullYear()} FU News. Bản quyền thuộc về FU.</small>
        </footer>
      </div>
    </div>
  );
};

export default Login;
