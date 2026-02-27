import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/header.css";

const Header = () => {
  const { user, logout } = useAuth(); // 👈 lấy logout
  const navigate = useNavigate();

  const roleLabel = user?.accountRole === 1 ? "Admin" : "Staff";
  const initials = (user?.accountName || "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="df-header">
      <div className="df-header-left" onClick={() => navigate("/")}>
        <div className="df-logo">FU</div>
        <div className="df-title">
          <div className="df-title-main">FU News Management</div>
          <div className="df-title-sub">Bảng điều khiển quản trị tin tức</div>
        </div>
      </div>

      <div className="df-header-right">
        <div className="df-user">
          <div className="df-avatar">{initials}</div>
          <div className="df-user-info">
            <div className="df-user-name">{user?.accountName}</div>
            <div className={`df-role ${roleLabel.toLowerCase()}`}>
              {roleLabel}
            </div>
          </div>
        </div>

        {/* 👉 LOGOUT */}
        <button className="df-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
