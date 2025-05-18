import React, { useEffect, useMemo, useState } from "react";
import ProductFilter from "./ProductFilter";
import ProductGrid from "../ProductGrid/index";
import config from "../../config";


const API_URL = `${config.apiUrl}/api/v1/products`;

export default function CateDienThoaiMayTinhBang() {
    const [allProducts, setAllProducts] = useState([]);
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetch data once
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `${API_URL}?category=Dien%20thoai%20may%20tinh%20bang&limit=1000`,
                    { headers: { "ngrok-skip-browser-warning": "true" } }
                );
                if (!res.ok) throw new Error(res.statusText);
                const json = await res.json();
                setAllProducts(json.data || []);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // 1️⃣ Apply filters
    const filtered = useMemo(() => {
        const { price = {}, rating, brand = {}, promo = {} } = filters;
        return allProducts.filter((p) => {
            const min = parseInt(price.min, 10) || 0;
            const max = parseInt(price.max, 10) || Infinity;
            if (p.Price < min || p.Price > max) return false;
            if (rating && p.RatingAverage < rating) return false;
            if (Object.values(brand).some(Boolean) && !brand[p.Brand]) return false;
            if (promo.sale && p.DiscountPercent <= 0) return false;
            if (promo.inStock && p.Stock <= 0) return false;
            return true;
        });
    }, [allProducts, filters]);

    // 2️⃣ Paging
    const PAGE_SIZE = PRODUCTS_PER_PAGE;
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paged = filtered.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    // reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    return (
        <div className="min-h-screen bg-gray-100 md:flex">
            <ProductFilter
                products={allProducts}
                onFilterChange={setFilters}
            />
            <ProductGrid
                products={paged}
                loading={loading}
                error={error}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
