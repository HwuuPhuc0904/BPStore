import React, { useState } from "react";
import { Link } from "react-router-dom";    
import axios from "axios"
import { useNavigate } from "react-router-dom";



export default function SignUp() {
    // Thêm state cho các trường mới
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Hàm xử lý đăng ký
    const handleSignUp = async (e) => {
        e.preventDefault();
        
        // Kiểm tra mật khẩu nhập lại có khớp không
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (!name || !email || !address || !phone || !password) {
            setError("Please fill in all fields");
            return;
        }



        try {
            setLoading(true);
            setError("");

            // send request to server

            const response = await axios.post("http://localhost:8080/api/v1/auth/register", {
                name,
                email,
                address,
                phone,
                password
            });
            console.log("Registration response:", response);

            if (response.status === 200 || response.status === 201) {
                // Đăng ký thành công
                alert("Registration successful! Please login.");
                // Chuyển hướng đến trang đăng nhập
                navigate("/login");
            } else {
                // Xử lý các trạng thái response khác
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            
            // Xử lý lỗi chi tiết
            if (error.response) {
                // Lỗi từ server với status code
                setError(`Registration failed: ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                // Không nhận được response từ server
                setError("Registration failed: No response from server. Please try again later.");
            } else {
                // Lỗi khi thiết lập request
                setError("Registration failed: " + error.message);
            }
        }
        finally {
        setLoading(false);
        }
    };

    return(
        <div className="flex w-full h-screen">
          <div className="w-full flex items-center justify-center lg:w-1/2">
          <div className='w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
                <h1 className='text-5xl font-semibold'>Sign Up</h1>
                <p className='font-medium text-lg text-gray-500 mt-4'>Sign up for explore with me!</p>
                <div className='mt-8'>
                    {/* Trường nhập Tên */}
                    <div className='flex flex-col'>
                        <label className='text-lg font-medium'>Full Name</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    
                    {/* Trường nhập Email */}
                    <div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Email</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    {/* Trường nhập Địa chỉ */}
                    <div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Address</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    
                    {/* Trường nhập Số điện thoại */}
                    <div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Phone Number</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    
                    {/* Trường nhập Mật khẩu */}
                    <div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Password</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    {/* Trường nhập Xác nhận mật khẩu */}
                    <div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Confirm Password</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Confirm your password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    
                    {/* Hiển thị lỗi nếu có */}
                    {error && (
                        <div className='mt-4 p-3 bg-red-100 text-red-700 rounded-xl'>
                            {error}
                        </div>
                    )}
                    
                    <div className='mt-8 flex flex-col gap-y-4'>
                        <button 
                            className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'
                            onClick={handleSignUp}>
                            Sign Up
                        </button>
                        <button 
                            className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
                                    <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
                                    <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
                                    <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
                                </svg>
                                Sign up with Google
                        </button>
                    </div>
                    <div className='mt-8 flex justify-center items-center'>
                        <p className='font-medium text-base'>Have an account?</p>
                        <Link to='/login' 
                            className='ml-2 font-medium text-base text-violet-500'>Login
                        </Link>
                    </div>
                </div>
            </div>
          </div>
          <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
            <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin"/> 
            <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
          </div>
        </div>
    );
}