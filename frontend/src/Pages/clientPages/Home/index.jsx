import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
    Bars3Icon,
    XMarkIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import ImageSlider from "../../../Components/ImageSlider";
import InterfaceProduct from "../../../Components/InterfaceProduct";
import config from "../../../config";
import { useAuth } from "../../../AuthContext";

const navigation = [
    { name: "Products", href: "/products" },
    { name: "Features", href: "#" },
    { name: "Marketplace", href: "#" },
    { name: "About me", href: "#" },
];

const flashSaleProducts = [
    {
        ID: 1,
        Name: "Điện thoại Samsung Galaxy A05s",
        MainImage: "https://salt.tikicdn.com/ts/product/e5/d4/5d/ea1dc1442910474d405c978bfafa7a8f.jpg",
        OriginalPrice: 4490000,
        Price: 3990000,
        DiscountPercent: 11,
        RatingAverage: 4.8,
        ReviewCount: 5,
        Brand: "Samsung",
        Stock: 100,
    },
    {
        ID: 2,
        Name: "Tai nghe Bluetooth AirPods Pro",
        MainImage: "https://salt.tikicdn.com/ts/product/a3/b8/6a/d6bd65a7f436803b586d19a7fbdbcc70.jpg",
        OriginalPrice: 5990000,
        Price: 5990000,
        DiscountPercent: 0,
        RatingAverage: 4.9,
        ReviewCount: 10,
        Brand: "Apple",
        Stock: 50,
    },
    {
        ID: 3,
        Name: "Máy lọc không khí Xiaomi",
        MainImage: "https://salt.tikicdn.com/ts/product/b0/6c/2c/5296291621f1c171c85386028bb40541.jpg",
        OriginalPrice: 2990000,
        Price: 2490000,
        DiscountPercent: 17,
        RatingAverage: 4.7,
        ReviewCount: 8,
        Brand: "Xiaomi",
        Stock: 30,
    },
];

const categoryMapping = {
    "dien-thoai-may-tinh-bang": { name: "Điện Thoại & Máy Tính Bảng", src: "/icons/smartphone.png" },
    "nha-cua-doi-song": { name: "Nhà Cửa & Đời Sống", src: "/icons/Home.png" },
    "do-choi-me-be": { name: "Đồ Chơi & Mẹ Bé", src: "/icons/toy.png" },
    "thiet-bi-kts-phu-kien-so": { name: "Thiết Bị KTS & Phụ Kiện Số", src: "/icons/DigitalDevices.png" },
    "dien-gia-dung": { name: "Điện Gia Dụng", src: "/icons/electronics.png" },
    "lam-dep-suc-khoe": { name: "Làm Đẹp & Sức Khỏe", src: "/icons/BeautyHealth.png" },
    "o-to-xe-may-xe-dap": { name: "Ô Tô, Xe Máy & Xe Đạp", src: "/icons/Car.png" },
    "thoi-trang-nu": { name: "Thời Trang Nữ", src: "/icons/ThoiTrangNu.png" },
    "laptop-may-vi-tinh-linh-kien": { name: "Laptop & Linh Kiện", src: "/icons/laptop.png" },
    "giay-dep-nam": { name: "Giày Dép Nam", src: "/icons/GiayDepNam.png" },
    "thoi-trang-nam": { name: "Thời Trang Nam", src: "/icons/clotherman.png" },
    "giay-dep-nu": { name: "Giày Dép Nữ", src: "/icons/GiayDepNu.png" },
};
const getFirstImage = (imagesUrlString) => {
    if (!imagesUrlString) return "";
    const urls = imagesUrlString.split("|");
    return urls[0] || "";
};

const formatPriceVND = (price) => {
    if (!price && price !== 0) return "-";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
};

const CountdownTimer = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const timeDiff = endTime - now;
            if (timeDiff <= 0) {
                setTimeLeft(0);
                return;
            }
            setTimeLeft(timeDiff);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [endTime]);

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const formatTime = (num) => num.toString().padStart(2, "0");

    return (
        <div className="flex items-center gap-2 text-lg font-bold text-red-600">
            <span>Kết thúc sau:</span>
            <span className="bg-red-100 px-2 py-1 rounded">{formatTime(hours)}</span>:
            <span className="bg-red-100 px-2 py-1 rounded">{formatTime(minutes)}</span>:
            <span className="bg-red-100 px-2 py-1 rounded">{formatTime(seconds)}</span>
        </div>
    );
};

const RatingStars = ({ rating }) => (
    <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
            <span
                key={i}
                className={`text-xs md:text-sm ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}
            >
                ★
            </span>
        ))}
    </div>
);

const FlashSaleCard = ({ product }) => (
    <Link
        to={`/product/${product.ID}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg"
    >
        <img
            src={getFirstImage(product.MainImage)}
            alt={product.Name}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
        />
        <div className="flex flex-grow flex-col gap-1 p-4 pb-5">
            <h3
                className="line-clamp-2 text-base font-semibold text-gray-800"
                title={product.Name}
            >
                {product.Name}
            </h3>
            <div className="flex flex-col text-sm">
                {product.Price !== product.OriginalPrice && product.OriginalPrice > 0 && (
                    <span className="text-gray-400 line-through">
                        {formatPriceVND(product.OriginalPrice)}
                    </span>
                )}
                <span className="font-bold text-red-600">
                    {formatPriceVND(product.Price)}
                </span>
                {product.Price !== product.OriginalPrice && product.DiscountPercent > 0 && (
                    <span className="text-xs text-red-500">(-{product.DiscountPercent}% OFF)</span>
                )}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
                <RatingStars rating={product.RatingAverage} /> ({product.ReviewCount})
            </div>
            <p className="text-xs text-gray-500">Brand: {product.Brand}</p>
            <p className="text-xs text-gray-500">Stock: {product.Stock}</p>
            <button
                className="mt-auto rounded-lg bg-indigo-600 py-2 text-xs font-semibold text-white shadow-md transition-colors hover:bg-indigo-700"
                type="button"
            >
                Xem chi tiết
            </button>
        </div>
    </Link>
);

const SkeletonCard = () => (
    <div className="animate-pulse flex flex-col overflow-hidden rounded-2xl bg-gray-100 p-4 shadow-sm">
        <div className="mb-4 h-48 w-full rounded-lg bg-gray-200" />
        <div className="h-3 w-3/4 rounded bg-gray-200 mb-2" />
        <div className="h-3 w-1/2 rounded bg-gray-200 mb-2" />
        <div className="h-3 w-1/4 rounded bg-gray-200" />
    </div>
);

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryError, setCategoryError] = useState(null);
    const { isAuthenticated, logout, username } = useAuth();
    const navigate = useNavigate();

    const endTime = new Date("May 18, 2025 20:09:00 GMT+0700");

    const fallbackCategories = [
        { name: "Đồ điện tử", src: "/logo.png" },
        { name: "Điện thoại", src: "/logo.png" },
        { name: "Nhà bếp", src: "/logo.png" },
        { name: "Quần áo", src: "/logo.png" },
        { name: "Mỹ Phẩm", src: "/logo.png" },
        { name: "Sách", src: "/logo.png" },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${config.apiUrl}/api/v1/products?page=1&limit=10`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "ngrok-skip-browser-warning": "true",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const productList = data.data || [];
                setProducts(productList);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            setCategoryLoading(true);
            try {
                const response = await fetch(
                    `${config.apiUrl}/api/v1/products/category`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "ngrok-skip-browser-warning": "true",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("API categories response:", data);
                const categoryList = (data.categories || []).map(slug => ({
                    name: categoryMapping[slug]?.name || slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
                    src: categoryMapping[slug]?.src || "/logo.png",
                }));
                setCategories(categoryList);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setCategoryError(err.message);
            } finally {
                setCategoryLoading(false);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    const NavLink = ({ item }) => (
        <Link
            to={item.href}
            className="text-sm font-semibold text-gray-700 transition-colors hover:text-indigo-600 md:text-base"
        >
            {item.name}
        </Link>
    );

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="relative min-h-screen w-full bg-gray-50 text-gray-800">
            <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm bg-white/70 shadow-sm">
                <nav
                    aria-label="Global"
                    className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8"
                >
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="logo" className="h-8 w-auto"/>
                        <span className="hidden text-lg font-bold md:block">BPSTORE</span>
                    </div>

                    <div className="hidden items-center gap-8 md:flex">
                        {navigation.map((item) => (
                            <NavLink key={item.name} item={item}/>
                        ))}
                    </div>

                    <div className="hidden items-center gap-4 md:flex">
                        {isAuthenticated ? (
                            <>
                                <span className="text-sm font-semibold text-gray-700">
                                    Hi, {username || "User"}
                                </span>
                                <Link
                                    to="/user/information"
                                    className="text-sm font-semibold transition-colors hover:text-indigo-600"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="rounded-lg bg-red-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/signup"
                                    className="text-sm font-semibold transition-colors hover:text-indigo-600"
                                >
                                    Signup
                                </Link>
                                <Link
                                    to="/login"
                                    className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-indigo-700"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="flex items-center md:hidden"
                    >
                        <Bars3Icon className="h-6 w-6"/>
                    </button>
                </nav>

                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
                    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"/>
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-80 overflow-y-auto bg-white px-6 py-6">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-lg font-bold">Menu</span>
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <XMarkIcon className="h-6 w-6"/>
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            {navigation.map((item) => (
                                <NavLink key={item.name} item={item}/>
                            ))}
                            <div className="mt-4 flex flex-col gap-4">
                                {isAuthenticated ? (
                                    <>
                                        <span className="text-sm font-semibold text-gray-700">
                                            Hi, {username || "User"}
                                        </span>
                                        <Link
                                            to="/user/information"
                                            className="font-semibold text-indigo-600"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="font-semibold text-red-600"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/signup" className="font-semibold text-indigo-600">
                                            Signup
                                        </Link>
                                        <Link to="/login" className="font-semibold text-indigo-600">
                                            Log in
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            <section
                className="relative isolate flex h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4 pt-20 text-center text-white">
                <div className="z-10 flex flex-col items-center gap-6 max-w-2xl">
                    <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
                        Trải nghiệm mua hàng <span className="inline-block bg-white/20 px-2">không giới hạn</span>
                    </h1>
                    <p className="text-sm sm:text-lg md:text-xl">
                        Mua sắm mọi lúc, mọi nơi, mọi thiết bị với ShopSmart – nền tảng thương mại điện tử tối ưu cho
                        bạn.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            to="/signup"
                            className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-indigo-700 shadow-md transition hover:shadow-lg"
                        >
                            Bắt đầu ngay
                        </Link>
                        <a
                            href="#flash-sale"
                            className="flex items-center gap-1 text-sm font-semibold hover:underline"
                        >
                            Khám phá thêm <ChevronRightIcon className="h-4 w-4"/>
                        </a>
                    </div>
                </div>
                <div
                    aria-hidden
                    className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
                />
                <div
                    aria-hidden
                    className="absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
                />
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:grid-cols-3">
                    {[
                        {
                            icon: "/icons/freeship.svg",
                            title: "Freeship",
                            desc: "Săn mã Freeship Shopee hôm nay - Voucher Freeship Xtra siêu ưu đãi trên toàn quốc.",
                        },
                        {
                            icon: "/icons/payicons.svg",
                            title: "Thanh toán tiện dụng",
                            desc: "Trải nghiệm thanh toán dễ dàng với nhiều phương thức thanh toán khác nhau.",
                        },
                        {
                            icon: "/icons/returnicons.svg",
                            title: "Đổi trả hàng dễ dàng",
                            desc: "Dễ dàng đổi trả với người bán, yên tâm mua sắm không lo rủi ro.",
                        },
                    ].map((item) => (
                        <div key={item.title} className="flex flex-col items-center text-center">
                            <span
                                className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 p-3 ring-4 ring-indigo-100">
                                <img src={item.icon} alt="icon" className="h-8 w-8"/>
                            </span>
                            <h3 className="mb-2 text-lg font-extrabold text-gray-800 md:text-2xl">
                                {item.title}
                            </h3>
                            <p className="max-w-xs text-sm text-gray-500 md:text-base">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <ImageSlider/>

            <section className="mx-auto mt-8 max-w-7xl px-4">
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                    {categoryLoading ? (
                        Array.from({length: 6}).map((_, i) => (
                            <div
                                key={i}
                                className="animate-pulse flex flex-col items-center gap-2 rounded-lg bg-gray-100 p-4"
                            >
                                <div className="h-12 w-12 rounded-full bg-gray-200"/>
                                <div className="h-4 w-3/4 rounded bg-gray-200"/>
                            </div>
                        ))
                    ) : categoryError ? (
                        <p className="text-center text-red-500 col-span-full">
                            {categoryError}. Hiển thị danh mục mặc định.
                        </p>
                    ) : categories.length > 0 ? (
                        categories.map((cat) => (
                            <InterfaceProduct
                                key={cat.name}
                                name={cat.name}
                                src={cat.src}
                            />
                        ))
                    ) : (
                        fallbackCategories.map((cat) => (
                            <InterfaceProduct
                                key={cat.name}
                                name={cat.name}
                                src={cat.src}
                            />
                        ))
                    )}
                </div>
            </section>

            <section className="mx-auto mt-8 max-w-7xl px-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-extrabold md:text-2xl">
                        Flash Sale Hôm Nay
                    </h2>
                    <a
                        href="#flash-sale"
                        className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline"
                    >
                        Xem thêm <ChevronRightIcon className="h-4 w-4"/>
                    </a>
                </div>
                <CountdownTimer endTime={endTime}/>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
                    {flashSaleProducts.map((product) => (
                        <FlashSaleCard key={product.ID} product={product}/>
                    ))}
                </div>
            </section>

            <section id="flash-sale" className="mt-16 bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">
                        Chỉ trong hôm nay – Nhanh tay mua sắm!
                    </h2>
                    <CountdownTimer endTime={endTime}/>
                    {error && (
                        <p className="text-center text-red-500">{error}</p>
                    )}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                        {loading
                            ? Array.from({length: 10}).map((_, i) => <SkeletonCard key={i}/>)
                            : products.map((product) => (
                                <FlashSaleCard key={product.ID} product={product}/>
                            ))}
                    </div>
                </div>
            </section>

            <footer className="border-t bg-gray-50 py-10">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 md:flex-row md:justify-between">
                    <Link to="/" className="flex items-center gap-2 font-bold">
                        <img src="/logo.png" alt="logo" className="h-8 w-auto"/> BPSTORE
                    </Link>
                    <ul className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
                        <li>
                            <a href="#" className="transition-colors hover:text-indigo-600">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition-colors hover:text-indigo-600">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition-colors hover:text-indigo-600">
                                Licensing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition-colors hover:text-indigo-600">
                                Contact
                            </a>
                        </li>
                    </ul>
                    <span className="text-xs text-gray-400">
                        © {new Date().getFullYear()} BPSTORE. All rights reserved.
                    </span>
                </div>
            </footer>
        </div>
    );
}