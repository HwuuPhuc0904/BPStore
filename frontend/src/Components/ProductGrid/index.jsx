import React, { useState } from "react";

const products = [
    {
        id: 1,
        name: "Vintage Denim Jacket",
        price: "$89",
        rating: 4.2,
        image: "https://source.unsplash.com/500x500?denim,jacket"
    },
    {
        id: 2,
        name: "Essential Cotton Hoodie",
        price: "$65",
        rating: 4.7,
        image: "https://source.unsplash.com/500x500?hoodie"
    },
    {
        id: 3,
        name: "Classic White Sneakers",
        price: "$120",
        rating: 4.8,
        image: "https://source.unsplash.com/500x500?sneakers"
    },
    {
        id: 4,
        name: "Slim‑Fit Chinos",
        price: "$54",
        rating: 4.3,
        image: "https://source.unsplash.com/500x500?chinos"
    },
    {
        id: 5,
        name: "Graphic Cotton T‑Shirt",
        price: "$29",
        rating: 4.1,
        image: "https://source.unsplash.com/500x500?tshirt,graphic"
    }
  // Add more products (e.g., 20+ items for testing pagination)
];

const PRODUCTS_PER_PAGE = 8; // Số sản phẩm hiển thị trên mỗi trang

export default function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("popular");
  const [priceSortOrder, setPriceSortOrder] = useState("asc");

  const sortProducts = (products, option, priceOrder) => {
    let sortedProducts = [...products];
    if (option === "popular") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (option === "newest") {

      sortedProducts.sort((a, b) => b.id - a.id);
    } else if (option === "best-selling") {

      sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (option === "price") {
      sortedProducts.sort((a, b) => {
        const priceA = parseFloat(a.price.replace("$", ""));
        const priceB = parseFloat(b.price.replace("$", ""));
        return priceOrder === "asc" ? priceA - priceB : priceB - priceA;
      });
    }
    return sortedProducts;
  };

  // Sort the products before pagination
  const sortedProducts = sortProducts(products, sortOption, priceSortOrder);

  // Tính toán các sản phẩm hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  // Tổng số trang
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="font-bold text-2xl mb-6 text-center">Casual Collection</h2>

        {/* Filter Bar */}
          <div className="flex justify-start mb-6 space-x-4">
              <span className="text-lg font-semibold">Sắp xếp theo</span>
              <button
                  onClick={() => {
                      setSortOption("popular");
                      setPriceSortOrder("asc"); // Reset price sort order when switching options
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                      sortOption === "popular" ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                  Phổ Biến
              </button>
              <button
                  onClick={() => {
                      setSortOption("newest");
                      setPriceSortOrder("asc");
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                      sortOption === "newest" ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                  Mới Nhất
              </button>
              <button
                  onClick={() => {
                      setSortOption("best-selling");
                      setPriceSortOrder("asc");
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                      sortOption === "best-selling" ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                  Bán Chạy
              </button>
              <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">Giá</span>
                  <select
                      value={priceSortOrder}
                      onChange={(e) => {
                          setSortOption("price");
                          setPriceSortOrder(e.target.value);
                      }}
                      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                      <option value="asc">Giá: Thấp đến Cao</option>
                      <option value="desc">Giá: Cao đến Thấp</option>
                  </select>
              </div>
          </div>

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