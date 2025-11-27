import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/authenticateContext";

export default function Navbar() {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert("Logged out successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm p-3 mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold text-info" to="/">Silent Auction</Link>

        <div className="d-flex align-items-center">
          <Link className="nav-link text-light me-3" to="/">Home</Link>
          <Link className="nav-link text-light me-3" to="/items">Bid on Items</Link>

          {currentUser && (
            <>
              <Link className="nav-link text-light me-3" to="/addItem">Add Item</Link>
              <Link className="nav-link text-light me-3" to="/admin">Profile</Link>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline-danger"
              >
                Logout
              </button>
            </>
          )}
          {!currentUser && (
            <>
              <Link className="nav-link text-light me-3" to="/login">Login</Link>
              <Link className="nav-link text-light me-3" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
