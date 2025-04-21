import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Gradient Graphic T-shirt",
    price: "$145",
    rating: 3.5,
    image: "path/to/image1.jpg",
  },
  {
    id: 2,
    name: "Polo with Tipping Details",
    price: "$180",
    rating: 4.5,
    image: "path/to/image2.jpg",
  },
  // Add more products (e.g., 20+ items for testing pagination)
];

const PRODUCTS_PER_PAGE = 8; // Số sản phẩm hiển thị trên mỗi trang

export default function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán các sản phẩm hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  // Tổng số trang
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="font-bold text-2xl mb-6 text-center">Casual Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-1">{product.price}</p>
              <p className="text-yellow-500 mb-2">{product.rating} ⭐</p>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-white border rounded-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}