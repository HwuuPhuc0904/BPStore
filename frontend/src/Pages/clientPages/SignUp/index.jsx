import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import config from "../../../config";

export default function SignUp() {
    // State for form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [country, setCountry] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Country list with "Việt Nam"
    const countries = [
        "Việt Nam",
        "United States",
        "United Kingdom",
        "Canada",
        "Australia",
        "Japan",
        "South Korea",
        "China",
        "Singapore"
    ];

    // Handle signup submission
    const handleSignUp = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!name || !email || !address || !phone || !password || !confirmPassword || !country || !gender) {
            setError("Please fill in all fields");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        const API_URL = config.apiUrl + "/api/v1/auth/register";

        try {
            setLoading(true);
            setError("");

            // Send request to server with specified payload
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({ name, email, password, phone, address, gender, country })
            });

            console.log("Registration response:", response);

            if (response.status === 200 || response.status === 201) {
                alert("Registration successful! Please login.");
                navigate("/login");
            } else {
                const data = await response.json();
                setError(`Registration failed: ${data.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error("Registration error:", error);

            if (error.response) {
                setError(`Registration failed: ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                setError("Registration failed: No response from server. Please try again later.");
            } else {
                setError("Registration failed: " + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="min-h-screen bg-gradient-to-br from-violet-100 to-pink-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[1000px] flex flex-col lg:flex-row shadow-2xl rounded-3xl overflow-hidden"
            >
                {/* Left side - Form */}
                <div className="w-full lg:w-1/2 bg-white p-8 lg:p-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className='text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent'>
                            Sign Up
                        </h1>
                        <p className='font-medium text-lg text-gray-500 mt-4'>
                            Join our community today!
                        </p>
                    </motion.div>

                    <div className='mt-8 space-y-6'>
                        {/* Form fields with animations */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Name field */}
                            <div className='flex flex-col'>
                                <label className='text-lg font-medium text-gray-700'>Full Name</label>
                                <input
                                    className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200'
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/* Email field */}
                            <div className='flex flex-col'>
                                <label className='text-lg font-medium text-gray-700'>Email</label>
                                <input
                                    className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200'
                                    placeholder="Enter your email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Address field */}
                            <div className='flex flex-col'>
                                <label className='text-lg font-medium text-gray-700'>Address</label>
                                <input
                                    className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200'
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            {/* Phone field */}
                            <div className='flex flex-col'>
                                <label className='text-lg font-medium text-gray-700'>Phone Number</label>
                                <input
                                    className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200'
                                    placeholder="Enter your phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            {/* Country field */}
                            <div className='flex flex-col'>
                                <label className='text-lg font-medium text-gray-700'>Country</label>
                                <select
                                    className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200'
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                >
                                    <option value="">Select your country</option>
                                    {countries.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Gender field */}
                            <div className='flex flex-col'>
                                <label className='text-lg font-medium text-gray-700'>Gender</label>
                                <div className='flex gap-6 mt-2'>
                                    {['male', 'female', 'other'].map((option) => (
                                        <label key={option} className='flex items-center space-x-2 cursor-pointer'>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={option}
                                                checked={gender === option}
                                                onChange={(e) => setGender(e.target.value)}
                                                className='w-5 h-5 text-violet-600 focus:ring-violet-500'
                                            />
                                            <span className='text-gray-700 capitalize'>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Password field */}
                            <div className='flex flex-col'>
                                <label className='text-lg font-medium text-gray-700'>Password</label>
                                <input
                                    className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200'
                                    placeholder="Enter your password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Confirm Password field */}
                            <div className='flex flex-col'>
                                <label className='text-lg font-medium text-gray-700'>Confirm Password</label>
                                <input
                                    className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200'
                                    placeholder="Confirm your password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </motion.div>

                        {/* Error message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl'
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className='space-y-4'
                        >
                            <button
                                className='w-full py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-violet-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg'
                                onClick={handleSignUp}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing up...
                                    </span>
                                ) : "Sign Up"}
                            </button>

                            <button className='w-full py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold text-lg rounded-xl hover:bg-gray-50 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
                                    <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
                                    <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
                                    <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
                                </svg>
                                <span>Sign up with Google</span>
                            </button>
                        </motion.div>

                        {/* Login link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className='text-center mt-6'
                        >
                            <p className='text-gray-600'>
                                Already have an account?{' '}
                                <Link to='/login' className='text-violet-600 font-semibold hover:text-violet-700 transition-colors'>
                                    Login
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Right side - Decorative */}
                <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-violet-600 to-pink-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-64 h-64 rounded-full bg-white/20 backdrop-blur-md"
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-bold mb-4"
                        >
                            Welcome to BPSTORE SVIP
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-white/80"
                        >
                            Join us today and start your journey with amazing features and benefits.
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}