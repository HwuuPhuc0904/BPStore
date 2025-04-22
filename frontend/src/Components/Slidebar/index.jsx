import React, { useState, useEffect } from "react";


export default function Sidebar({ onFilterChange }) {

    const [price, setPrice] = useState({ min: "", max: "" });
    const [shopTypes, setShopTypes] = useState({ mall: false, favorite: false, trend: false });
    const [condition, setCondition] = useState({ used: false, new: false });
    const [payment, setPayment] = useState({ installment: false });
    const [rating, setRating] = useState(0); // 0‑5
    const [services, setServices] = useState({ sale: false, freeship: false, cheap: false, inStock: false });
    const [location, setLocation] = useState({ hanoi: false, hcm: false, hadong: false, hoangmai: false });
    const [brand, setBrand] = useState({ avocado: false, adam: false, coolmate: false, ph: false });
    const [categories, setCategories] = useState({ jacket: false, blazer: false, hoodie: false, jeans: false, trousers: false });
    const [searchCate, setSearchCate] = useState({ tshirt: false, shirt: false, accessory: false, jacketSearch: false });


    useEffect(() => {
        if (typeof onFilterChange === "function") {
            onFilterChange({ price, shopTypes, condition, payment, rating, services, location, brand, categories, searchCate });
        }
    }, [price, shopTypes, condition, payment, rating, services, location, brand, categories, searchCate, onFilterChange]);


    const handleCheckbox = (setter, key) => ({ target }) =>
        setter((prev) => ({ ...prev, [key]: target.checked }));

    const resetAll = () => {
        setPrice({ min: "", max: "" });
        setShopTypes({ mall: false, favorite: false, trend: false });
        setCondition({ used: false, new: false });
        setPayment({ installment: false });
        setRating(0);
        setServices({ sale: false, freeship: false, cheap: false, inStock: false });
        setLocation({ hanoi: false, hcm: false, hadong: false, hoangmai: false });
        setBrand({ avocado: false, adam: false, coolmate: false, ph: false });
        setCategories({ jacket: false, blazer: false, hoodie: false, jeans: false, trousers: false });
        setSearchCate({ tshirt: false, shirt: false, accessory: false, jacketSearch: false });
    };


    const Section = ({ title, children }) => (
        <section className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-800 mb-1 uppercase tracking-wide">{title}</h3>
            {children}
        </section>
    );

    const Checkbox = ({ label, checked, onChange }) => (
        <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-red-500" checked={checked} onChange={onChange} />
            <span>{label}</span>
        </label>
    );


    return (
        <aside className="w-64 bg-gray-50 p-4 flex flex-col gap-6 overflow-y-auto">
            {/* Giá */}
            <Section title="Khoảng giá">
                <div className="flex items-center gap-2">
                    <input
                        value={price.min}
                        onChange={(e) => setPrice((p) => ({ ...p, min: e.target.value }))}
                        placeholder="₫ từ"
                        className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-red-500"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                        value={price.max}
                        onChange={(e) => setPrice((p) => ({ ...p, max: e.target.value }))}
                        placeholder="₫ đến"
                        className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-red-500"
                    />
                </div>
            </Section>

            {/* Loại shop */}
            <Section title="Loại shop">
                <div className="space-y-1">
                    <Checkbox label="Shopee Mall"      checked={shopTypes.mall}      onChange={handleCheckbox(setShopTypes, "mall")} />
                    <Checkbox label="Shop yêu thích"    checked={shopTypes.favorite}  onChange={handleCheckbox(setShopTypes, "favorite")} />
                    <Checkbox label="Shop xu hướng"     checked={shopTypes.trend}     onChange={handleCheckbox(setShopTypes, "trend")} />
                </div>
            </Section>

            {/* Tình trạng */}
            <Section title="Tình trạng">
                <div className="space-y-1">
                    <Checkbox label="Đã sử dụng" checked={condition.used} onChange={handleCheckbox(setCondition, "used")} />
                    <Checkbox label="Mới"         checked={condition.new}  onChange={handleCheckbox(setCondition, "new")} />
                </div>
            </Section>


            {/* Đánh giá */}
            <Section title="Đánh giá">
                {[5, 4, 3].map((v) => (
                    <label key={v} className="flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input type="radio" name="rating" className="accent-yellow-400" checked={rating === v} onChange={() => setRating(v)} />
                        <span className="flex items-center gap-1">
              {Array.from({ length: v }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-yellow-400">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.31 9.397c-.783-.57-.381-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                  </svg>
              ))}
                            <span className="ml-1">trở lên</span>
            </span>
                    </label>
                ))}
            </Section>

            {/* Dịch vụ & KM */}
            <Section title="Dịch vụ & khuyến mãi">
                <div className="space-y-1">
                    <Checkbox label="Đang giảm giá"       checked={services.sale}     onChange={handleCheckbox(setServices, "sale")} />
                    <Checkbox label="Miễn phí vận chuyển" checked={services.freeship} onChange={handleCheckbox(setServices, "freeship")} />
                    <Checkbox label="Giá cứng rẻ"         checked={services.cheap}    onChange={handleCheckbox(setServices, "cheap")} />
                    <Checkbox label="Hàng có sẵn"         checked={services.inStock}  onChange={handleCheckbox(setServices, "inStock")} />
                </div>
            </Section>

            {/*/!* Nơi bán *!/*/}
            {/*<Section title="Nơi bán">*/}
            {/*    <div className="space-y-1">*/}
            {/*        <Checkbox label="Hà Nội"            checked={location.hanoi}    onChange={handleCheckbox(setLocation, "hanoi")} />*/}
            {/*        <Checkbox label="TP. Hồ Chí Minh"   checked={location.hcm}      onChange={handleCheckbox(setLocation, "hcm")} />*/}
            {/*        <Checkbox label="Quận Hà Đông"      checked={location.hadong}   onChange={handleCheckbox(setLocation, "hadong")} />*/}
            {/*        <Checkbox label="Quận Hoàng Mai"    checked={location.hoangmai} onChange={handleCheckbox(setLocation, "hoangmai")} />*/}
            {/*    </div>*/}
            {/*</Section>*/}

            {/* Thương hiệu */}
            <Section title="Thương hiệu">
                <div className="space-y-1">
                    <Checkbox label="AVOCADO"      checked={brand.avocado} onChange={handleCheckbox(setBrand, "avocado")} />
                    <Checkbox label="ADAM STORE"   checked={brand.adam}    onChange={handleCheckbox(setBrand, "adam")} />
                    <Checkbox label="COOLMATE"     checked={brand.coolmate}onChange={handleCheckbox(setBrand, "coolmate")} />
                    <Checkbox label="PH"           checked={brand.ph}      onChange={handleCheckbox(setBrand, "ph")} />
                </div>
            </Section>

            {/* Danh mục */}
            <Section title="Tất cả danh mục">
                <p className="font-medium text-sm">Thời trang nam</p>
                <div className="space-y-1 mt-1">
                    <Checkbox label="Áo khoác"                checked={categories.jacket}   onChange={handleCheckbox(setCategories, "jacket")} />
                    <Checkbox label="Áo vest & blazer"        checked={categories.blazer}   onChange={handleCheckbox(setCategories, "blazer")} />
                    <Checkbox label="Hoodie / len / nỉ"       checked={categories.hoodie}   onChange={handleCheckbox(setCategories, "hoodie")} />
                    <Checkbox label="Quần jeans"              checked={categories.jeans}    onChange={handleCheckbox(setCategories, "jeans")} />
                    <Checkbox label="Quần dài / quần âu"      checked={categories.trousers} onChange={handleCheckbox(setCategories, "trousers")} />
                </div>
            </Section>

            {/* Bộ lọc tìm kiếm theo danh mục */}
            <Section title="Bộ lọc tìm kiếm">
                <p className="font-medium text-sm">Theo danh mục</p>
                <div className="space-y-1 mt-1">
                    <Checkbox label="Áo thun (631K+)"           checked={searchCate.tshirt}       onChange={handleCheckbox(setSearchCate, "tshirt")} />
                    <Checkbox label="Áo sơ mi (162K+)"          checked={searchCate.shirt}        onChange={handleCheckbox(setSearchCate, "shirt")} />
                    <Checkbox label="Phụ kiện thời trang (140K+)" checked={searchCate.accessory}    onChange={handleCheckbox(setSearchCate, "accessory")} />
                    <Checkbox label="Áo khoác (132K+)"          checked={searchCate.jacketSearch} onChange={handleCheckbox(setSearchCate, "jacketSearch")} />
                </div>
            </Section>

            {/* Nút reset */}
            <div className="pt-2 border-t">
                <button onClick={resetAll} className="w-full py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors">
                    XÓA TẤT CẢ
                </button>
            </div>
        </aside>
    );
}
