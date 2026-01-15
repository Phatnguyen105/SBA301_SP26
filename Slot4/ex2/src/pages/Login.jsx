import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra input
    if (!email || !password) {
      setError('Vui lòng nhập email và password');
      return;
    }

    if (!email.includes('@')) {
      setError('Email không hợp lệ');
      return;
    }

    // Lưu thông tin đăng nhập vào localStorage
    localStorage.setItem('user', JSON.stringify({ email, password }));
    localStorage.setItem('isLoggedIn', 'true');

    // Gọi callback và chuyển hướng đến trang chủ
    onLoginSuccess();
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng Nhập</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
