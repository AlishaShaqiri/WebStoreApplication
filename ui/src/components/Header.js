import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout, getUserRole } from '../services/authService';
import { FaSignOutAlt, FaUserCircle, FaHome, FaTshirt, FaShoppingCart } from 'react-icons/fa';
import logo from "../assets/logo-color.png";

function Header() {
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const userRole = getUserRole();

  // Get cart items from local storage (or from your global state)
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and Brand Name */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900 hover:text-primary transition-all flex items-center space-x-2"
        >
          <img
            src={logo} // Replace with your logo URL
            alt="Elegant Store Logo"
            className="w-32"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {isAuthenticated() && userRole === 'Admin' && (
            <Link
              to="/"
              className="text-gray-700 hover:text-primary flex items-center space-x-2 transition-all"
            >
              <FaHome className="text-lg" />
              <span>Dashboard</span>
            </Link>
          )}
          <Link
            to="/products"
            className="text-gray-700 hover:text-primary flex items-center space-x-2 transition-all"
          >
            <FaTshirt className="text-lg" />
            <span>Products</span>
          </Link>

          {/* Cart Icon with Item Count */}
          <Link
            to="/cart"
            className="text-gray-700 hover:text-primary flex items-center space-x-2 transition-all relative"
          >
            <FaShoppingCart className="text-lg" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {cartItemCount}
              </span>
            )}
            <span>Cart</span>
          </Link>

          {/* Login/Logout Button */}
          {isAuthenticated() ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-primary flex items-center space-x-2 transition-all"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="text-gray-700 hover:text-primary flex items-center space-x-2 transition-all"
            >
              <FaUserCircle className="text-lg" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-700 hover:text-primary transition-all"
            onClick={() => alert('Toggle mobile menu here')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;