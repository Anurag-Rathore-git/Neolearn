import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Heart, User } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { useCartStore } from '../../store/useCartStore';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useUserStore();
  const { items } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              NeoLearn
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-indigo-600">
              Courses
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600">
              Contact
            </Link>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/wishlist" className="text-gray-700 hover:text-indigo-600">
                  <Heart className="w-6 h-6" />
                </Link>
                <Link to="/cart" className="text-gray-700 hover:text-indigo-600 relative">
                  <ShoppingCart className="w-6 h-6" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-indigo-600">
                    <User className="w-6 h-6" />
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl hidden group-hover:block">
                    <Link
                      to="/student/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/student/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/my-courses"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-50"
                    >
                      My Courses
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/courses"
                className="text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/student/dashboard"
                    className="text-gray-700 hover:text-indigo-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/student/profile"
                    className="text-gray-700 hover:text-indigo-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-courses"
                    className="text-gray-700 hover:text-indigo-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Courses
                  </Link>
                  <Link
                    to="/cart"
                    className="text-gray-700 hover:text-indigo-600 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart {items.length > 0 && `(${items.length})`}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 hover:text-indigo-600 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-indigo-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 inline-block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}