import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout, getUserRole } from '../services/authService';

function Header() {
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const userRole = getUserRole();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link className="text-xl font-semibold text-gray-800 hover:text-blue-600" to="/">
          Clothing Store
        </Link>
        <div className="space-x-6 hidden md:flex">
          {isAuthenticated() && userRole === 'Admin' && (
            <Link className="text-gray-700 hover:text-blue-600" to="/">Dashboard</Link>
          )}
          <Link className="text-gray-700 hover:text-blue-600" to="/products">Products</Link>




          {isAuthenticated() ? (
            <button
              className="text-gray-700 hover:text-blue-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link className="text-gray-700 hover:text-blue-600" to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
