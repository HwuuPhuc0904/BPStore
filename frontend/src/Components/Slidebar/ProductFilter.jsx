import React, { useEffect, useMemo, useState } from "react";
import config from "../../config";

const CATEGORY_API_URL = config.apiUrl + "/api/v1/products/category";

export default function ProductFilter({ products = [], onFilterChange }) {
    const [price, setPrice] = useState({ min: "", max: "" });
    const [rating, setRating] = useState(0); // 0-5
    const [categories, setCategories] = useState([]); // State để lưu danh sách danh mục
    const [selectedCategories, setSelectedCategories] = useState({}); // State để lưu trạng thái chọn danh mục

    // Ánh xạ tên danh mục thân thiện với người dùng
    const categoryMapping = {
        "dien-thoai-may-tinh-bang": "Điện Thoại & Máy Tính Bảng",
        "nha-cua-doi-song": "Nhà Cửa & Đời Sống",
        "do-choi-me-be": "Đồ Chơi & Mẹ Bé",
        "thiet-bi-kts-phu-kien-so": "Thiết Bị KTS & Phụ Kiện Số",
        "dien-gia-dung": "Điện Gia Dụng",
        "lam-dep-suc-khoe": "Làm Đẹp & Sức Khỏe",
        "o-to-xe-may-xe-dap": "Ô Tô, Xe Máy & Xe Đạp",
        "thoi-trang-nu": "Thời Trang Nữ",
        "laptop-may-vi-tinh-linh-kien": "Laptop & Linh Kiện",
        "giay-dep-nam": "Giày Dép Nam",
        "thoi-trang-nam": "Thời Trang Nam",
        "giay-dep-nu": "Giày Dép Nữ",
    };

    // Lấy danh sách thương hiệu
    const brandList = useMemo(() => {
        const brands = new Set(products.map((p) => p.Brand).filter(Boolean));
        return Array.from(brands).sort();
    }, [products]);

    const [brand, setBrand] = useState({});
    // Sync brand state when product list changes
    useEffect(() => {
        setBrand((prev) => {
            const next = {};
            brandList.forEach((b) => {
                next[b] = prev[b] ?? false;
            });
            return next;
        });
    }, [brandList]);

    // Sync selectedCategories state when category list changes
    useEffect(() => {
        setSelectedCategories((prev) => {
            const next = {};
            categories.forEach((cat) => {
                next[cat] = prev[cat] ?? false;
            });
            return next;
        });
    }, [categories]);

    const [promo, setPromo] = useState({ sale: false, inStock: false });

    // Gọi API để lấy danh sách danh mục
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(CATEGORY_API_URL, {
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
                if (data && data.categories) {
                    setCategories(data.categories); // Lưu danh sách danh mục
                } else {
                    throw new Error("Invalid category data structure received from API");
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []);

    // Gửi dữ liệu lọc lên component cha
    useEffect(() => {
        if (typeof onFilterChange === "function") {
            // Lấy danh mục duy nhất được chọn (chỉ lấy danh mục đầu tiên nếu nhiều hơn một được chọn)
            const selectedCategory = Object.keys(selectedCategories).find(
                (cat) => selectedCategories[cat]
            );
            onFilterChange({
                price,
                rating,
                brand,
                promo,
                category: selectedCategory, // Gửi danh mục được chọn
            });
        }
    }, [price, rating, brand, promo, selectedCategories, onFilterChange]);

    const handleCheckbox = (setter, key) => ({ target }) =>
        setter((prev) => {
            // Chỉ cho phép chọn một danh mục duy nhất
            if (setter === setSelectedCategories) {
                const next = {};
                Object.keys(prev).forEach((k) => {
                    next[k] = k === key ? target.checked : false;
                });
                return next;
            }
            return { ...prev, [key]: target.checked };
        });

    const resetAll = () => {
        setPrice({ min: "", max: "" });
        setRating(0);
        setBrand((prev) => Object.fromEntries(Object.keys(prev).map((k) => [k, false])));
        setSelectedCategories((prev) =>
            Object.fromEntries(Object.keys(prev).map((k) => [k, false]))
        );
        setPromo({ sale: false, inStock: false });
    };

    const Section = ({ title, children }) => (
        <section className="space-y-2">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-800">
                {title}
            </h3>
            {children}
        </section>
    );

    const Checkbox = ({ label, checked, onChange }) => (
        <label className="flex items-center gap-2 text-sm">
            <input
                type="checkbox"
                className="accent-red-500"
                checked={checked}
                onChange={onChange}
            />
            <span>{label}</span>
        </label>
    );

    return (
        <aside className="flex w-64 flex-col gap-6 overflow-y-auto bg-gray-50 p-4">
            {/* Price range */}
            <Section title="Khoảng giá (₫)">
                <div className="flex items-center gap-2">
                    <input
                        value={price.min}
                        onChange={(e) => setPrice((p) => ({ ...p, min: e.target.value }))}
                        placeholder="Từ"
                        className="w-full rounded-md border p-2 text-sm focus:ring-2 focus:ring-red-500"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                        value={price.max}
                        onChange={(e) => setPrice((p) => ({ ...p, max: e.target.value }))}
                        placeholder="Đến"
                        className="w-full rounded-md border p-2 text-sm focus:ring-2 focus:ring-red-500"
                    />
                </div>
            </Section>

            {/* Rating */}
            <Section title="Đánh giá">
                {[5, 4, 3].map((v) => (
                    <label
                        key={v}
                        className="flex cursor-pointer select-none items-center gap-2 text-sm"
                    >
                        <input
                            type="radio"
                            name="rating"
                            className="accent-yellow-400"
                            checked={rating === v}
                            onChange={() => setRating(v)}
                        />
                        <span className="flex items-center gap-1">
              {Array.from({ length: v }).map((_, i) => (
                  <svg
                      key={i}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 text-yellow-400"
                  >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.31 9.397c-.783-.57-.381-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                  </svg>
              ))}
                            <span className="ml-1">trở lên</span>
            </span>
                    </label>
                ))}
            </Section>

            {/* Category */}
            {categories.length > 0 && (
                <Section title="Danh mục">
                    <div className="space-y-1">
                        {categories.map((cat) => (
                            <Checkbox
                                key={cat}
                                label={categoryMapping[cat] || cat}
                                checked={selectedCategories[cat] ?? false}
                                onChange={handleCheckbox(setSelectedCategories, cat)}
                            />
                        ))}
                    </div>
                </Section>
            )}

            {/* Brand */}
            {brandList.length > 0 && (
                <Section title="Thương hiệu">
                    <div className="space-y-1">
                        {brandList.map((b) => (
                            <Checkbox
                                key={b}
                                label={b}
                                checked={brand[b] ?? false}
                                onChange={handleCheckbox(setBrand, b)}
                            />
                        ))}
                    </div>
                </Section>
            )}

            {/* Promotion & stock */}
            <Section title="Khuyến mãi & Kho hàng">
                <div className="space-y-1">
                    <Checkbox
                        label="Đang giảm giá"
                        checked={promo.sale}
                        onChange={handleCheckbox(setPromo, "sale")}
                    />
                    <Checkbox
                        label="Còn hàng"
                        checked={promo.inStock}
                        onChange={handleCheckbox(setPromo, "inStock")}
                    />
                </div>
            </Section>

            {/* Reset button */}
            <div className="border-t pt-2">
                <button
                    onClick={resetAll}
                    className="w-full rounded-md bg-red-500 py-2 text-sm text-white transition-colors hover:bg-red-600"
                >
                    XÓA TẤT CẢ
                </button>
            </div>
        </aside>
    );
}