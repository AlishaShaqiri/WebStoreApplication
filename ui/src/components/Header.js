import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout, getUserRole } from '../services/authService';
import { FaSignOutAlt, FaUserCircle, FaHome, FaTshirt } from 'react-icons/fa';

function Header() {
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const userRole = getUserRole();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 flex items-center space-x-2">
          <FaTshirt className="text-blue-600" />
          <span>Clothing Store</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated() && userRole === 'Admin' && (
            <Link className="text-gray-700 hover:text-blue-600 flex items-center space-x-1" to="/">
              <FaHome />
              <span>Dashboard</span>
            </Link>
          )}
          <Link className="text-gray-700 hover:text-blue-600 flex items-center space-x-1" to="/products">
            <FaTshirt />
            <span>Products</span>
          </Link>

          {isAuthenticated() ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          ) : (
            <Link className="text-gray-700 hover:text-blue-600 flex items-center space-x-1" to="/login">
              <FaUserCircle />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <button
            className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
            onClick={() => alert('Toggle mobile menu here')}
          >
            <FaUserCircle className="text-xl" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
