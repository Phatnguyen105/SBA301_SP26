import React from 'react';
import { useLoginLogic } from '../hooks/useLoginLogic';
import './Login.css';

function Login() {
  const {
    username,
    password,
    fieldErrors,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
    handleCancel,
  } = useLoginLogic();

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>🔐 Đăng Nhập</h1>
            <p>Vui lòng nhập thông tin tài khoản</p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-circle"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className={`form-control ${fieldErrors.username ? 'is-invalid' : ''}`}
                id="username"
                name="username"
                placeholder="Nhập username"
                value={username}
                onChange={handleInputChange}
                disabled={isLoading}
                autoComplete="username"
              />
              {fieldErrors.username && (
                <div className="invalid-feedback">{fieldErrors.username}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={handleInputChange}
                disabled={isLoading}
                autoComplete="current-password"
              />
              {fieldErrors.password && (
                <div className="invalid-feedback">{fieldErrors.password}</div>
              )}
            </div>

            <div className="button-group">
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang đăng nhập...
                  </>
                ) : (
                  'Đăng Nhập'
                )}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Hủy bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
