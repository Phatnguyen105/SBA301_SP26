import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/home.css";
const Home = () => {
  const { user, isAdmin, isStaff, loading } = useAuth();

  // ⏳ Chờ AuthContext load dữ liệu từ localStorage
  if (loading) {
    return <div>Loading...</div>;
  }

  // 🔐 Chưa đăng nhập → đá về trang login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page-header">
      <h1>Welcome to FU News Management System</h1>

      <div className="card">
        <h2>Hello, {user.accountName}!</h2>

        <p>
          You are logged in as:{" "}
          <strong>{isAdmin ? "Admin" : "Staff"}</strong>
        </p>

        <div style={{ marginTop: "30px" }}>
          <h3>Available Features:</h3>

          <ul style={{ fontSize: "16px", lineHeight: "2" }}>
            {isAdmin && (
              <>
                <li>Manage System Accounts</li>
                <li>View all news articles</li>
              </>
            )}

            {isStaff && (
              <>
                <li>Manage Categories</li>
                <li>Manage News Articles</li>
                <li>Manage Tags</li>
                <li>View your created news history</li>
                <li>Update your profile</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
