import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/header.css";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const roleLabel = user?.accountRole === 1 ? "Admin" : "Staff";
  const initials = (user?.accountName || "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="df-header" role="banner">
      <div className="df-header-left" onClick={() => navigate("/")}>
        <div className="df-logo" aria-hidden="true">FU</div>
        <div className="df-title">
          <div className="df-title-main">FU News Management</div>
          <div className="df-title-sub">Bảng điều khiển quản trị tin tức</div>
        </div>
      </div>

      <div className="df-header-right" aria-live="polite">
        <div className="df-user">
          <div className="df-avatar" aria-hidden="true">{initials}</div>
          <div className="df-user-info">
            <div className="df-user-name">{user?.accountName}</div>
            <div className={`df-role ${roleLabel.toLowerCase()}`}>{roleLabel}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
