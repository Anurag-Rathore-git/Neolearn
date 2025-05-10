import React, { useState, useEffect, useRef } from 'react';
import { Brain, Bell, User, Search, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../store/useUserStore';

export function DashboardHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [
    { id: 1, text: 'New course recommendation', time: '5m ago' },
    { id: 2, text: 'Assignment due tomorrow', time: '1h ago' },
    { id: 3, text: 'New message from instructor', time: '2h ago' },
  ];

  const studentMenuItems = [
    { label: 'Dashboard', href: '/student/dashboard' },
    { label: 'My Courses', href: '/student/my-courses' },
    { label: 'Schedule', href: '/student/schedule' },
    { label: 'Doubts', href: '/student/doubts-support' },
    { label: 'Notes', href: '/student/notes' },
    { label: 'Analytics', href: '/student/analytics' },
  ];

  const instructorMenuItems = [
    { label: 'Dashboard', href: '/instructor/dashboard' },
    { label: 'Course Management', href: '/instructor/course-management' },
    { label: 'Students', href: '/instructor/students' },
    { label: 'Analytics', href: '/instructor/analytics' },
    { label: 'Messages', href: '/instructor/messages' },
  ];

  const menuItems = user?.role === 'instructor' ? instructorMenuItems : studentMenuItems;
  const basePath = user?.role === 'instructor' ? '/instructor' : '/student';

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={`${basePath}/dashboard`} className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">NeoLearn</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search courses, assignments, and more..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border border-gray-100 z-50">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    >
                      <p className="text-sm text-gray-900">{notification.text}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2 px-4">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100 z-50">
                  <Link
                    to={`${basePath}/profile`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowProfile(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to={`${basePath}/settings`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowProfile(false)}
                  >
                    Settings
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-50">
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}