import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomeLayout from "./layouts/HomeLayout";
import AboutLayout from "./layouts/AboutLayout";
import ContactLayout from "./layouts/ContactLayout";
import Login from "./pages/Login";
import OrchidDetails from "./pages/OrchidDetails";
import AdminLayout from "./layouts/AdminLayout";
import AdminRoute from "./route/AdminRoute"; 

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Routes>
      <Route
        element={
          <MainLayout
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        }
      >
        {/* USER */}
        <Route path="/" element={<HomeLayout searchTerm={searchTerm} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutLayout />} />
        <Route path="/contact" element={<ContactLayout />} />
        <Route path="/orchid/:id" element={<OrchidDetails />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        />
      </Route>
    </Routes>
  );
}


export default App;
