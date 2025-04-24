import React, { useState, useEffect } from "react";

const PRODUCTS_PER_PAGE = 20;
const API_URL = "http://localhost:8080/api/v1/products";

export default function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("popular");
  const [priceSortOrder, setPriceSortOrder] = useState("asc");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Add pagination parameters to the API call
        const response = await fetch(`${API_URL}?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.data) {
          setProducts(data.data);
          
          // Handle pagination information from API response
          if (data.pagination) {
            setTotalPages(data.pagination.total_pages);
          }
        } else {
          throw new Error("Invalid data structure received from API");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]); // Fetch when page changes

  // Function to extract first image from ImagesURL string
  const getFirstImage = (imagesUrlString) => {
    if (!imagesUrlString) return "";
    const urls = imagesUrlString.split(", ");
    return urls[0] || "";
  };

  // Sort products based on selected options
  const sortProducts = (products, option, priceOrder) => {
    let sortedProducts = [...products];
    
    if (option === "popular") {
      // No rating in API, using ID as fallback
      sortedProducts.sort((a, b) => a.ID - b.ID);
    } else if (option === "newest") {
      sortedProducts.sort((a, b) => b.ID - a.ID);
    } else if (option === "best-selling") {
      // No sales data in API, using Stock as proxy for popularity
      sortedProducts.sort((a, b) => b.Stock - a.Stock);
    } else if (option === "price") {
      sortedProducts.sort((a, b) => {
        return priceOrder === "asc" ? a.Price - b.Price : b.Price - a.Price;
      });
    }
    
    return sortedProducts;
  };

  // Sort the products
  const sortedProducts = products.length > 0 ? sortProducts(products, sortOption, priceSortOrder) : [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-y-auto">
      <h2 className="font-bold text-2xl mb-6 text-center">Casual Collection</h2>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-start mb-6 gap-4">
        <span className="text-lg font-semibold">Sắp xếp theo</span>
        <button
          onClick={() => {
            setSortOption("popular");
            setPriceSortOrder("asc");
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
        <div className="flex items-center gap-2">
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

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-10">
          <p className="text-red-500 font-semibold text-lg">
            Error loading products: {error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedProducts.map((product) => (
            <div
              key={product.ID}
              className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={getFirstImage(product.ImagesURL)}
                alt={product.Name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-3">
                <h3 className="font-semibold text-base mb-1 line-clamp-2" title={product.Name}>
                  {product.Name}
                </h3>
                <p className="text-gray-700 mb-1">${product.Price.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mb-1">Brand: {product.Brand}</p>
                <p className="text-sm text-gray-500 mb-1">Stock: {product.Stock}</p>
                <button className="w-full bg-blue-500 text-white py-1.5 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && sortedProducts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 font-medium text-lg">No products found</p>
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && sortedProducts.length > 0 && (
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
      )}
    </div>
  );
}