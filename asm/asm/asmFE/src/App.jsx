import { Routes, Route } from "react-router-dom";

import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import AccountManagement from "./components/pages/AccountManagement";
import CategoryManagement from "./components/pages/CategoryManagement";
import NewsManagement from "./components/pages/NewsManagement";

import DashboardLayout from "./components/layout/DashboardLayout";
import RequireRole from "./guards/RequireRole";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/accounts"
          element={
            <RequireRole allowAdmin>
              <AccountManagement />
            </RequireRole>
          }
        />

        <Route
          path="/categories"
          element={
            <RequireRole allowStaff>
              <CategoryManagement />
            </RequireRole>
          }
        />

        <Route
          path="/news"
          element={
            <RequireRole allowStaff>
              <NewsManagement />
            </RequireRole>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
