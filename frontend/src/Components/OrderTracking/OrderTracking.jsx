import React from "react";

export default function OrderTracking() {
    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
            {/* Tabs */}
            <div className="flex space-x-4 border-b mb-6">
                <button className="pb-2 text-red-500 border-b-2 border-red-500 font-semibold">
                    Tất cả
                </button>
                <button className="pb-2 text-gray-600 hover:text-red-500">Chờ thanh toán</button>
                <button className="pb-2 text-gray-600 hover:text-red-500">Vận chuyển</button>
                <button className="pb-2 text-gray-600 hover:text-red-500">Chờ giao hàng</button>
                <button className="pb-2 text-gray-600 hover:text-red-500">Hoàn thành</button>
                <button className="pb-2 text-gray-600 hover:text-red-500">Đã hủy</button>
                <button className="pb-2 text-gray-600 hover:text-red-500">Trả hàng/Hoàn tiền</button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Bạn có thể tìm kiếm theo Tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Order Item */}
            <div className="border rounded-lg p-4 mb-4">
                {/* Shop Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-orange-500 font-semibold">Yêu thích</span>
                        <span className="text-gray-600">Bột chiên giòn Cố Tâm</span>
                        <button className="text-blue-500">Chat</button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Giao hàng thành công</span>
                        <button className="text-blue-500">HOÀN THÀNH</button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex items-center space-x-4 mb-4">
                    <img
                        src="path/to/product-image.jpg"
                        alt="Product"
                        className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                        <p className="font-semibold">
                            Combo Bột Mỹ Cay Cố Tâm (50g bột mỹ + 1 gói mỹ Koreno vị Kim chi)
                        </p>
                        <p className="text-gray-600">x1</p>
                    </div>
                    <p className="text-gray-600">₫9.983</p>
                </div>

                {/* Total Price */}
                <div className="flex justify-end mb-4">
                    <p className="text-gray-600">
                        Thành tiền: <span className="text-red-500 font-semibold">₫18.983</span>
                    </p>
                </div>

                {/* Delivery Info */}
                <div className="text-gray-600 mb-4">
                    <p>Dành giao sản phẩm trước: 30-04-2025</p>
                    <p>Dành giao ngay và nhận 200 Xu</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        Đánh Giá
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                        Liên Hệ Người Bán
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                        Mua Lại
                    </button>
                </div>
            </div>
        </div>
    );
}