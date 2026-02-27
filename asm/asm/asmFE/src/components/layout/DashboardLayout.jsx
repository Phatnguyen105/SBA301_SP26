import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar"; // ✅ IMPORT
import "../../styles/common.css";

const DashboardLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="dashboard-container">
      <Header />

      <div className="dashboard-body">
        {/* ✅ SIDEBAR DUY NHẤT */}
        <Sidebar />

        {/* 👉 CONTENT */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
