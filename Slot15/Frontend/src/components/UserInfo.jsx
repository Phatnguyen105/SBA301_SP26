import React from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * UserInfo component - Hiển thị thông tin người dùng đã đăng nhập
 * Ví dụ của việc sử dụng useAuth hook
 */
function UserInfo() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="user-info d-flex align-items-center gap-2">
      <div className="user-avatar">
        <i className="bi bi-person-circle"></i>
      </div>
      <div className="user-details">
        <p className="user-name mb-0">{user?.fullName || user?.username}</p>
        <small className="text-muted">{user?.email}</small>
      </div>
      <button onClick={logout} className="btn btn-sm btn-outline-danger">
        <i className="bi bi-box-arrow-right"></i> Đăng xuất
      </button>
    </div>
  );
}

export default UserInfo;
