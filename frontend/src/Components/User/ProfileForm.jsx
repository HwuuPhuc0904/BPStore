import React from "react";

export default function ProfileForm() {
    return (
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
            {/* Tiêu đề */}
            <h2 className="text-xl font-bold mb-2">Hồ Sơ Của Tôi</h2>
            <p className="text-gray-600 mb-6">
                Quản lý thông tin hồ sơ để bảo mật tài khoản
            </p>

            {/* Form */}
            <div className="space-y-4">
                {/* Tên đăng nhập */}
                <div className="flex items-center">
                    <label className="w-1/4 text-gray-700 font-semibold">Tên đăng nhập</label>
                    <p className="w-3/4 text-gray-600">739m_o_qzo</p>
                </div>

                {/* Tên */}
                <div className="flex items-center">
                    <label className="w-1/4 text-gray-700 font-semibold">Tên</label>
                    <input
                        type="text"
                        placeholder="--"
                        className="w-3/4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email */}
                <div className="flex items-center">
                    <label className="w-1/4 text-gray-700 font-semibold">Email</label>
                    <div className="w-3/4 flex items-center">
                        <p className="text-gray-600 mr-2">***********@gmail.com</p>
                        <button className="text-blue-500 hover:underline">Thay Đổi</button>
                    </div>
                </div>

                {/* Số điện thoại */}
                <div className="flex items-center">
                    <label className="w-1/4 text-gray-700 font-semibold">Số điện thoại</label>
                    <div className="w-3/4 flex items-center">
                        <p className="text-gray-600 mr-2">*********04</p>
                        <button className="text-blue-500 hover:underline">Thay Đổi</button>
                    </div>
                </div>

                {/* Giới tính */}
                <div className="flex items-center">
                    <label className="w-1/4 text-gray-700 font-semibold">Giới tính</label>
                    <div className="w-3/4 flex space-x-4">
                        <label className="flex items-center">
                            <input type="radio" name="gender" value="Nam" className="mr-2" defaultChecked />
                            Nam
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="gender" value="Nữ" className="mr-2" />
                            Nữ
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="gender" value="Khác" className="mr-2" />
                            Khác
                        </label>
                    </div>
                </div>

                {/* Ngày sinh */}
                <div class="flex items-center">
                    <label class="w-1/4 text-gray-700 font-semibold">Ngày sinh</label>
                    <div class="w-3/4 flex space-x-2">
                        <select
                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>**</option>
                            {[...Array(31)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <select
                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>**</option>
                            {[...Array(12)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <select
                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>****</option>
                            {[...Array(100)].map((_, i) => {
                                const year = 2025 - i;
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                {/* Nút Lưu */}
                <div className="flex justify-end">
                    <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
}