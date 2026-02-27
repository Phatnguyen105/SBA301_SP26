import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { isAdmin, isStaff } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Management</div>

      <nav className="sidebar-nav">
        <ul>
          {isAdmin && (
            <li>
              <NavLink to="/accounts">Account Management</NavLink>
            </li>
          )}

          {isStaff && (
            <>
              <li>
                <NavLink to="/categories">Category Management</NavLink>
              </li>
              <li>
                <NavLink to="/news">News Management</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
