import React from 'react';

import { useState, useEffect } from 'react';


const UserProfile = () => {
  const [activeView, setActiveView] = useState('information');

  // Slidebar for change options
  const Sidebar = ({setActiveView}) => {
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
              <button onClick={() => setActiveView("information")} className="flex items-center text-gray-700 hover:text-blue-500">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Information
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => setActiveView("changeInformation")} className="flex items-center text-gray-700 hover:text-blue-500">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4z" />
                </svg>
                Change Information
              </button>
            </li>
            <li className="mb-4">
              <button href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Shopping Cart
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };


  const ChangeUserInformation = () => {
    return (
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
    )
  }

  // user information
  const UserInformation = ({ setActiveView }) => {

    const [userInfo, setUserInfo] = useState(null); 
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState("");

    
    // fetch data
    useEffect(() => {
      const fetchUserInformation = async() => {
        setLoading(true)
        setError(null)     
        const token = localStorage.getItem('token') 
        if (!token) {
          setError("Authentication token not found. Please log in.");
          setLoading(false);
          setUserInfo(null); // Clear user info if no token
          return;
        }

        try {
          const response =  await fetch('http://localhost:8080/api/v1/users/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
  
          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              throw new Error('Unauthorized or Forbidden. Please check your login status.');
            }
           throw new Error(`Failed to fetch user information (Status: ${response.status})`);
         }

          const data = await response.json()
          console.log("API Response data.user:", data.user); 

          if (data && data.user) {
            setUserInfo(data.user); 
          } else {
            throw new Error("User data not found in API response structure.");
          }

        }
        catch(e){
          console.error("Failed to fetch user information:", e)
          setError(e.message || "Failed to load user data.")
          setUserInfo(null)
        }
        finally {
          setLoading(false)
        }
      }
      fetchUserInformation()
    }, [])

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading user information...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      );
    }

    if (!userInfo) {
       // This case might happen if there's no token or fetch failed without specific error message
       return (
         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
           <p>Could not load user information.</p>
         </div>
       );
    }

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">User Information</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Use userInfo state here */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
            <p className="text-gray-900 text-base">{userInfo.Name || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
            <p className="text-gray-900 text-base">{userInfo.Email || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
            <p className="text-gray-900 text-base">{userInfo.gender || 'Not Provided'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Birthday</label>
             <p className="text-gray-900 text-base"></p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Language</label>
            <p className="text-gray-900 text-base">{userInfo.language || 'Not Set'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Country</label>
            <p className="text-gray-900 text-base">{userInfo.country || 'Not Set'}</p>
          </div>

          {/* Settings Section - Display based on userInfo */}
          <div className="md:col-span-2 mt-4 border-t pt-4">
            <label className="block text-sm font-medium text-gray-500 mb-2">Settings</label>
            <div className="flex items-center justify-between mb-2 p-3 border rounded-md bg-gray-50">
              <span className="text-gray-700">Email Notifications</span>
              <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${userInfo.email_notifications ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {userInfo.email_notifications ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
              <span className="text-gray-700">Private Account</span>
              <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${userInfo.private_account ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                {userInfo.private_account ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setActiveView('changeInformation')}
          className="mt-8 w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
        >
          Edit Information
        </button>
      </div>
    );
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <Sidebar setActiveView={setActiveView}/>
      
      <div className="flex-1 p-6 overflow-y-auto"> {/* Added overflow-y-auto */}
        {activeView === 'information' && <UserInformation setActiveView={setActiveView} />}
        {activeView === 'changeInformation' && <ChangeUserInformation />}
      </div>

    </div>
  );
};

export default UserProfile;
