import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout({ searchTerm, onSearchChange }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header searchText={searchTerm} onSearchChange={onSearchChange} />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
