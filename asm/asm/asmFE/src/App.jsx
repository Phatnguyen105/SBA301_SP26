import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import AccountManagement from "./components/AccountManagement";
import CategoryManagement from "./components/CategoryManagement";
import NewsManagement from "./components/NewsManagement";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/accounts"
              element={
                <PrivateRoute requiredRole={1}>
                  <AccountManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <PrivateRoute requiredRole={2}>
                  <CategoryManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/news"
              element={
                <PrivateRoute requiredRole={2}>
                  <NewsManagement />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
