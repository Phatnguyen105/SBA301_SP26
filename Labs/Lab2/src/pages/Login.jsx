import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = '123456';

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username không được để trống';
    } else if (username.length < 3) {
      newErrors.username = 'Username phải có ít nhất 3 ký tự';
    }

    if (!password.trim()) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Kiểm tra validation
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Kiểm tra thông tin đăng nhập
    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Đăng nhập thành công - giả lập delay
      setTimeout(() => {
        localStorage.setItem('lab2_username', username);
        localStorage.setItem('lab2_isLoggedIn', 'true');
        setLoading(false);
        navigate('/', { replace: true });
      }, 500);
    } else {
      // Đăng nhập thất bại
      setErrors({
        general: 'Username hoặc mật khẩu không chính xác'
      });
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setErrors({});
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>🔐 Đăng Nhập</h1>
            <p>Vui lòng nhập thông tin tài khoản</p>
          </div>

          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                id="username"
                placeholder="Nhập username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="button-group">
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
                disabled={loading}
              >
                Hủy bỏ
              </button>
            </div>
          </form>

          <div className="login-footer">
            <p>Demo: username: <strong>admin</strong>, password: <strong>123456</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
