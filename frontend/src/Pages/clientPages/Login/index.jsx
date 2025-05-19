import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import config from "../../../config";


async function fetchAuthToken(email, password) {
    const API_URL = config.apiUrl + "/api/v1/auth/login";

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            return {
                success: true,
                token: data.token,
                username: data.user.Name,
                role: data.user.Role
            };
        } else {
            return {
                success: false,
                error: data.message || "Email hoặc mật khẩu không hợp lệ"
            };
        }
    } catch (error) {
        return {
            success: false,
            error: "Đăng nhập thất bại: " + error.message
        };
    }
}

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Xóa lỗi trước đó

        const result = await fetchAuthToken(email, password);

        if (result.success) {
            console.log("message: ", "User logged in successfully");
            login(result.token, result.role, result.username);
            navigate("/");
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="flex w-full h-screen bg-gradient-to-br from-violet-50 to-pink-50">
            <div className="w-full flex items-center justify-center ">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-100'
                >
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className='text-5xl font-semibold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent'
                    >
                        Welcome Back
                    </motion.h1>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm mt-2"
                        >
                            {error}
                        </motion.div>
                    )}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className='font-medium text-lg text-gray-500 mt-4'
                    >
                        Welcome back! Please enter your details.
                    </motion.p>
                    <div className='mt-8 space-y-6'>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className='flex flex-col'
                        >
                            <label className='text-lg font-medium text-gray-700'>Email</label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-300'
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className='flex flex-col'
                        >
                            <label className='text-lg font-medium text-gray-700'>Password</label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-300'
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className='flex justify-between items-center'
                        >
                            <div className="flex items-center">
                                <input type="checkbox" id='remember' className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"/>
                                <label className='ml-2 font-medium text-base text-gray-600' htmlFor="remember">Remember for 30 days</label>
                            </div>
                            <button className='font-medium text-base text-violet-600 hover:text-violet-700 transition-colors'>Forgot password</button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className='space-y-4'
                        >
                            <button
                                className='w-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl'
                                onClick={handleLogin}
                            >
                                Sign in
                            </button>
                            <button
                                className='w-full flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
                                    <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
                                    <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
                                    <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
                                </svg>
                                Sign in with Google
                            </button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className='flex justify-center items-center'
                        >
                            <p className='font-medium text-base text-gray-600'>Don't have an account?</p>
                            <Link
                                to='/signup'
                                className='ml-2 font-medium text bulunmaktadır
base text-violet-600 hover:text-violet-700 transition-colors'
                            >
                                Sign up
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}