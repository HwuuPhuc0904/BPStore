import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../config";

const PRODUCTS_PER_PAGE = 20;
const API_URL = config.apiUrl + "/api/v1/products";


function Pagination({ currentPage, totalPages, onPageChange }) {
  // Build a smart page list: 1 … (n-2)(n-1)n … last
  const getPageList = () => {
    const delta = 2; // how many pages to show around the current page
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  const pages = getPageList();

  const go = (p) => {
    if (p < 1 || p > totalPages || p === currentPage) return;
    onPageChange(p);
    // Scroll to top whenever we change page for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
      <div className="flex justify-center items-center gap-2 flex-wrap mt-8">
        <button
            onClick={() => go(1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-lg ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          &laquo;
        </button>
        <button
            onClick={() => go(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-lg ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          Trước
        </button>

        {pages.map((p, idx) =>
            p === "..." ? (
                <span key={idx} className="px-3 py-1 select-none">…</span>
            ) : (
                <button
                    key={p}
                    onClick={() => go(p)}
                    className={`px-3 py-1 rounded-lg ${
                        p === currentPage ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {p}
                </button>
            )
        )}

        <button
            onClick={() => go(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-lg ${
                currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          Tiếp
        </button>
        <button
            onClick={() => go(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-lg ${
                currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          &raquo;
        </button>
      </div>
  );
}

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
        const apiUrlWithParams = `${API_URL}?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`;
        const response = await fetch(apiUrlWithParams, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.data) {
          setProducts(data.data);
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
  }, [currentPage]);

  const getFirstImage = (imagesUrlString) => {
    if (!imagesUrlString) return "";
    const urls = imagesUrlString.split(", ");
    return urls[0] || "";
  };

  const formatPriceVND = (price) => {
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${formattedPrice}đ`;
  };

  // Render rating stars
  const renderRatingStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // round to 0.5
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(
            <span key={i} className="text-yellow-500">
            ★
          </span>
        );
      } else if (i - 0.5 <= roundedRating) {
        stars.push(
            <span key={i} className="text-yellow-500">
            ☆
          </span>
        );
      } else {
        stars.push(
            <span key={i} className="text-gray-300">
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  const sortProducts = (products, option, priceOrder) => {
    let sortedProducts = [...products];

    if (option === "popular") {
      sortedProducts.sort((a, b) => a.ID - b.ID);
    } else if (option === "newest") {
      sortedProducts.sort((a, b) => b.ID - a.ID);
    } else if (option === "best-selling") {
      sortedProducts.sort((a, b) => b.Stock - a.Stock);
    } else if (option === "price") {
      sortedProducts.sort((a, b) => {
        return priceOrder === "asc" ? a.Price - b.Price : b.Price - a.Price;
      });
    }
    
    return sortedProducts;
  };

  const sortedProducts = products.length > 0 ? sortProducts(products, sortOption, priceSortOrder) : [];

  return (
      <div className="p-6 bg-gray-100 min-h-screen overflow-y-auto">
        <h2 className="font-bold text-2xl mb-6 text-center">Products Shop</h2>

        {/* Sort bar */}
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

        {/* Loading */}
        {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )}

        {/* Error */}
        {error && (
            <div className="text-center py-10">
              <p className="text-red-500 font-semibold text-lg">Error loading products: {error}</p>
              <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Thử Lại
              </button>
            </div>
        )}

        {/* Product grid */}
        {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {sortedProducts.map((product) => (
                  <Link
                      to={`/product/${product.ID}`}
                      key={product.ID}
                      className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-[500px] w-full"
                  >
                    <img
                        src={getFirstImage(product.MainImage)}
                        alt={product.Name}
                        className="w-full h-[200px] object-cover rounded-t-lg"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex flex-col" style={{ minHeight: "180px" }}>
                        <h3 className="font-semibold text-base mb-1 line-clamp-2" title={product.Name}>
                          {product.Name}
                        </h3>
                        <div className="mb-1">
                          <p className="text-gray-500 line-through text-sm">
                            {formatPriceVND(product.OriginalPrice)}
                          </p>
                          <p className="text-gray-700 font-bold">{formatPriceVND(product.Price)}</p>
                          {product.DiscountPercent > 0 && (
                              <span className="text-red-500 text-sm">(-{product.DiscountPercent}%)</span>
                          )}
                        </div>
                        <div className="flex items-center mb-1">
                          <div className="flex">{renderRatingStars(product.RatingAverage)}</div>
                          <span className="text-sm text-gray-500 ml-2">({product.ReviewCount})</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Brand: {product.Brand}</p>
                        <p className="text-sm text-gray-500 mb-1">Stock: {product.Stock}</p>
                      </div>
                      <button className="w-full bg-blue-500 text-white py-1.5 rounded-lg hover:bg-blue-600 transition-colors text-sm mt-auto">
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </Link>
              ))}
            </div>
        )}

        {!loading && !error && sortedProducts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 font-medium text-lg">Không tìm thấy sản phẩm</p>
            </div>
        )}


        {!loading && !error && sortedProducts.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>
  );
}
