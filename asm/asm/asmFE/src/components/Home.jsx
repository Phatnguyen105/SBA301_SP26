import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import "../styles/common.css";

const Home = () => {
  const { user, isAdmin, isStaff } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Welcome to FU News Management System</h1>
      </div>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Hello, {user.accountName}!</h2>
        <p>
          You are logged in as:{" "}
          <strong>{user.accountRole === 1 ? "Admin" : "Staff"}</strong>
        </p>

        <div style={{ marginTop: "30px" }}>
          <h3>Available Features:</h3>
          <ul style={{ fontSize: "16px", lineHeight: "2" }}>
            {isAdmin() && (
              <>
                <li>Manage System Accounts</li>
                <li>View all news articles</li>
              </>
            )}
            {isStaff() && (
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

        <div style={{ marginTop: "30px" }}>
          {isAdmin() && (
            <Link to="/accounts" className="btn btn-primary">
              Go to Account Management
            </Link>
          )}

          {isStaff() && (
            <>
              <Link to="/news" className="btn btn-primary">
                Go to News Management
              </Link>

              <Link
                to="/categories"
                className="btn btn-success"
                style={{ marginLeft: "10px" }}
              >
                Go to Category Management
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
