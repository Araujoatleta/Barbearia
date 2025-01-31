import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Scissors, Calendar, MessageSquare, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#1c1c1c] border-b-2 border-[#2c2c2c]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Scissors className="h-8 w-8 text-[#c4a47c]" />
            <span className="text-2xl font-bold text-white">LUXURY<span className="text-[#c4a47c]">CUTS</span></span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-gray-300 hover:text-[#c4a47c] transition-colors duration-300">
              Services
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/appointments" className="flex items-center space-x-2 text-gray-300 hover:text-[#c4a47c] transition-colors duration-300">
                  <Calendar className="h-5 w-5" />
                  <span>Appointments</span>
                </Link>
                <Link to="/chat" className="flex items-center space-x-2 text-gray-300 hover:text-[#c4a47c] transition-colors duration-300">
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat</span>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-300 hover:text-[#c4a47c] transition-colors duration-300">
                    <User className="h-5 w-5" />
                    <span>{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-[#2c2c2c] rounded-md shadow-lg py-1 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3c3c3c] hover:text-[#c4a47c]">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#3c3c3c] hover:text-[#c4a47c] flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login" className="btn-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;