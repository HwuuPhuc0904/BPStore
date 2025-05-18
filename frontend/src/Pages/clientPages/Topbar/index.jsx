import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuNav from "./menunav";
import { useAuth } from "../../../AuthContext";

export default function Topbar() {
  const [isOpen, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
      <nav className="w-full mx-auto fixed bg-gray-100 z-30 py-2 md:px-0 duration-200 shadow-md">
        <div className="px-2 navtop relative max-w-6xl mx-auto flex justify-between place-items-center py-1.5">
          <div className="burger flex items-center">
            <button onClick={handleOpen}>
              <svg
                  className="w-7 h-7 text-cusblack"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                />
              </svg>
            </button>
            <h3 className="text-md mr-2 font-semibold ml-3 text-cusblack">
              BPSTORE
            </h3>
          </div>
          
          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <span className="text-sm font-medium text-gray-600 px-3 py-1 bg-gray-200 rounded-full">
                Hi, {username || 'User'}
              </span>
            )}
          </div>
          
          <div className="profile flex items-center place-items-center space-x-2">
            <Link to="/">
              <div className="w-8 relative flex items-center h-8 rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200">
                <svg
                    className="w-6 h-6 text-cusblack m-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0.0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </Link>
            
            {/* Order tracking - only show if authenticated */}
            {isAuthenticated && (
              <Link to="/user/odertracking">
                <div className="w-8 relative flex items-center h-8 rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200">
                  <svg
                      className="w-6 h-6 text-cusblack m-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0.0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </Link>
            )}
            
            <Link to="/wishlist">
              <div className="w-8 relative flex items-center h-8 rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200">
                <svg
                    className="w-6 m-auto h-6 text-cusblack"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0.0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </Link>
            
            {/* User account button */}
            {isAuthenticated ? (
              <>
                <Link to="/user/information">
                  <div className="w-8 relative flex items-center h-8 rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200">
                    <svg
                        className="w-6 m-auto h-6 text-cusblack"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0.0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </Link>
                
                {/* Logout button */}
                <button 
                  onClick={handleLogout}
                  className="w-8 relative flex items-center h-8 rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200"
                  title="Logout"
                >
                  <svg 
                    className="w-6 m-auto h-6 text-cusblack" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <Link to="/login">
                <div className="flex items-center px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">
                  <span className="mr-1 font-medium">Login</span>
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
              </Link>
            )}
          </div>
        </div>
        <MenuNav handleOpen={handleOpen} isOpen={isOpen} />
      </nav>
  );
}