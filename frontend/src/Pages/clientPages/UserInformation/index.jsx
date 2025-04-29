import React from 'react';

const UserProfile = () => {
  const Sidebar = () => {
    return (
      <div className="w-64 bg-white h-screen p-6 shadow-md">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
          <div>
            <h2 className="text-lg font-semibold">User Info</h2>
          </div>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Information
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4z" />
                </svg>
                Change Information
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Shopping Cart
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">User profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value="Ben Sherman"
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Email</label>
              <input
                type="email"
                value="ben.sherman@gmail.com"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Gender</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Birthday</label>
              <div className="flex space-x-2">
                <select className="w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>July</option>
                  {[...Array(12).keys()].map((i) => (
                    <option key={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                  ))}
                </select>
                <select className="w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>30</option>
                  {[...Array(31).keys()].map((i) => (
                    <option key={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <select className="w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>1999</option>
                  {[...Array(100).keys()].map((i) => (
                    <option key={i}>{2025 - i}</option>
                  ))}
                </select>
              </div>

              <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Language</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>

              <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Country</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                placeholder=""
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">New Password</label>
              <input
                type="password"
                placeholder="(4–32 alphabets or numerics)"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder=""
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="mt-4 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Email notification</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition-transform"></div>
                  </div>
                </label>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Private Account</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition-transform"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
