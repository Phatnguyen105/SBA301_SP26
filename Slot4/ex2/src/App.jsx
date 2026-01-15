import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrchidDetails from "./pages/OrchidDetails";
import Login from "./pages/Login";
import Anh from "../public/images/anh.jpg";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Kiểm tra trạng thái đăng nhập từ localStorage khi component mount
  useEffect(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn");
    if (savedLoginState === "true") {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Nếu chưa đăng nhập, hiển thị trang login
  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Nếu đã đăng nhập, hiển thị ứng dụng chính
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <Header onSearchChange={handleSearchChange} onLogout={handleLogout} />

      <main className="main-content flex-fill">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orchid/:id" element={<OrchidDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer avatar={Anh} name="Phat" email="Phat@fpt.edu.vn" />
    </div>
  );
}

export default App;
