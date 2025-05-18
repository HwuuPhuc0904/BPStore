import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Image, Spin, InputNumber } from 'antd';
import config from "../../config";

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [subtotal, setSubtotal] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [similarProducts, setSimilarProducts] = useState([]); // State cho sản phẩm tương tự

    const stripHtmlTags = (str) => {
        if (!str) return str;
        return str.replace(/<\/?p>/g, '');
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${config.apiUrl}/api/v1/products/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (!data.product) throw new Error('Không tìm thấy sản phẩm');
                setProduct(data.product);
                const firstImage = data.product.ImagesURL.split('|')[0];
                setMainImage(firstImage || 'https://via.placeholder.com/400');
                setSubtotal(data.product.Price || 0);
                // Dữ liệu mẫu tĩnh cho sản phẩm tương tự (sẽ được thay bằng API sau)
                setSimilarProducts([
                    {
                        Name: "Điện Thoai Samsung Galaxy A06 (4GB/128GB)",
                        Price: 2250000,
                        RatingAverage: 4.8,
                        ReviewCount: 15,
                        ImagesURL: "https://via.placeholder.com/150",
                        SpecificationsFull: JSON.stringify({
                            Content: {
                                storage: { name: "ROM", value: "128GB" },
                                ram: { name: "RAM", value: "4GB" },
                                gpu: { name: "GPU", value: "Mali-G52" },
                                chipset: { name: "Chipset", value: "MediaTek Helio G85" },
                                display_technology: { name: "Công nghệ màn hình", value: "PLS LCD" },
                                cpu_speed: { name: "Tốc độ CPU", value: "2 nhân 2.0 GHz & 6 nhân 1.8 GHz" },
                            },
                        }),
                        Seller: "Tiki Trading",
                    },
                    {
                        Name: "Điện Thoai Samsung A36 5G (8GB/128GB)",
                        Price: 6937000,
                        RatingAverage: 5.0,
                        ReviewCount: 1,
                        ImagesURL: "https://via.placeholder.com/150",
                        SpecificationsFull: JSON.stringify({
                            Content: {
                                storage: { name: "ROM", value: "128GB" },
                                ram: { name: "RAM", value: "8GB" },
                                gpu: { name: "GPU", value: "Adreno 710" },
                                chipset: { name: "Chipset", value: "Snapdragon 6 Gen 3 8 nhán" },
                                display_technology: { name: "Công nghệ màn hình", value: "Super AMOLED" },
                                cpu_speed: { name: "Tốc độ CPU", value: "2.4 GHz" },
                            },
                        }),
                        Seller: "Hồng Hạnh Mobile",
                    },
                    {
                        Name: "Điện Thoai Samsung Galaxy A03",
                        Price: 6050000,
                        RatingAverage: 5.0,
                        ReviewCount: 1,
                        ImagesURL: "https://via.placeholder.com/150",
                        SpecificationsFull: JSON.stringify({
                            Content: {
                                storage: { name: "ROM", value: "128GB" },
                                ram: { name: "RAM", value: "8GB" },
                                gpu: { name: "GPU", value: "Mali-G68" },
                                chipset: { name: "Chipset", value: "Exynos 1380 (5nm)" },
                                display_technology: { name: "Công nghệ màn hình", value: "Super AMOLED" },
                                cpu_speed: { name: "Tốc độ CPU", value: "2.4GHz, 2GHz, ..." },
                            },
                        }),
                        Seller: "Tiki Trading",
                    },
                ]);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    useEffect(() => {
        if (product) {
            const newSubtotal = quantity * product.Price;
            setSubtotal(newSubtotal);
        }
    }, [quantity, product]);

    if (error) return <div className="text-center py-10">Lỗi: {error}</div>;
    if (loading) return <div className="flex justify-center items-center h-screen"><Spin /></div>;
    if (!product) return <div className="text-center py-10">Không tìm thấy sản phẩm</div>;

    const specs = JSON.parse(product.SpecificationsFull);
    const colors = ['Xanh Bạc', 'Xanh Ngọc', 'Đen tuyền'];
    const capacities = ['4GB/64GB'];

    return (
        <div className="container mx-auto my-10 px-4">
            {/* Top Section: Image and Product Details */}
            <div className="flex flex-col md:flex-row gap-10">
                {/* Left Image */}
                <div className="flex-1 bg-white p-6 rounded shadow">
                    <Image
                        src={mainImage}
                        alt={product.Name}
                        width={'100%'}
                        height={400}
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="flex gap-3 justify-center mt-4">
                        {product.ImagesURL.split('|').map((img, idx) => (
                            <Image
                                key={idx}
                                src={img}
                                width={60}
                                height={60}
                                style={{
                                    border: mainImage === img ? '2px solid #1677ff' : '1px solid #eee',
                                    cursor: 'pointer',
                                    borderRadius: 4,
                                }}
                                onMouseEnter={() => setMainImage(img)}
                                preview={false}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-bold">{product.Name}</h2>
                    <p className="text-gray-500 mt-1">Thương hiệu: {product.Brand}</p>
                    <div className="mt-4 flex items-center">
                        <span className="text-xl font-bold text-red-500 mr-2">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.Price)}
        </span>
                        {product.Price !== product.OriginalPrice && (
                            <>
                <span className="text-gray-500 line-through text-sm">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.OriginalPrice)}
                </span>
                                {product.DiscountPercent > 0 && (
                                    <span className="text-red-500 text-sm ml-2">(-{product.DiscountPercent}%)</span>
                                )}
                            </>
                        )}
                    </div>
                    <div className="mt-2 flex items-center">
                        <span className="text-yellow-500 mr-1">{Array(Math.round(product.RatingAverage)).fill('★').join('')}</span>
                        <span className="text-gray-600">({product.ReviewCount} đánh giá)</span>
                        <span className="text-gray-600 ml-2">Đã bán {product.OrderCount || 0}</span>
                    </div>

                    <div className="mt-5">
                        <p className="font-semibold mb-1">Màu sắc:</p>
                        <div className="flex flex-wrap gap-2">
                            {colors.map((color, i) => (
                                <Button
                                    key={i}
                                    type="default"
                                    style={{ backgroundColor: i === 0 ? '#e0f7fa' : i === 1 ? '#b2dfdb' : '#212121', color: 'black' }}
                                >
                                    {color}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5">
                        <p className="font-semibold mb-1">Dung lượng:</p>
                        <div className="flex flex-wrap gap-2">
                            {capacities.map((capacity, i) => (
                                <Button
                                    key={i}
                                    type="default"
                                    style={{ backgroundColor: '#e0f7fa', color: 'black' }}
                                >
                                    {capacity}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                        <span className="font-semibold">Số lượng:</span>
                        <Button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</Button>
                        <InputNumber
                            min={1}
                            value={quantity}
                            onChange={(val) => setQuantity(val)}
                            style={{ width: 80 }}
                        />
                        <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                    </div>

                    <div className="mt-4">
                        <span className="font-semibold">Tạm tính:</span>
                        <span className="text-xl font-bold text-red-500 ml-2">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}
                        </span>
                    </div>

                    <Button
                        type="primary"
                        danger
                        className="w-full mt-6"
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            </div>

            {/* Specs and Description Section */}
            <div className="mt-6 bg-white p-6 rounded shadow">
                {/* Specifications */}
                <div>
                    <p className="font-semibold">Thông số kỹ thuật:</p>
                    <ul className="list-disc pl-5 mt-2">
                        {Object.values(specs.Content).map((spec, i) => (
                            <li key={i} className="text-sm text-gray-600">
                                {spec.name}: {stripHtmlTags(spec.value)}
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-gray-600 mt-2">
                        Bảo hành: {specs.Operation.warranty_time_period.value} ({specs.Operation.warranty_form.value})
                    </p>
                </div>

                {/* Description */}
                <div className="mt-6">
                    <p className="font-semibold">Mô tả sản phẩm:</p>
                    {showFullDescription ? (
                        <div>
                            <p className="text-gray-700 text-sm whitespace-pre-line">
                                <div dangerouslySetInnerHTML={{ __html: product.Description || 'Chưa có mô tả chi tiết.' }} />
                            </p>
                            <Button
                                type="link"
                                onClick={() => setShowFullDescription(false)}
                                className="mt-2"
                            >
                                Thu gọn
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-700 text-sm whitespace-pre-line">
                                {product.ShortDescription || 'Chưa có mô tả sản phẩm.'}
                            </p>
                            <Button
                                type="link"
                                onClick={() => setShowFullDescription(true)}
                                className="mt-2"
                            >
                                Xem thêm
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Similar Products Comparison Section */}
            <div className="mt-6 bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">So sánh sản phẩm tương tự</h2>
                {similarProducts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {/* Cột sản phẩm hiện tại */}
                            <div className="border p-4 rounded min-w-[200px]">
                                <p className="font-semibold text-center">{product.Name}</p>
                                <Image
                                    src={mainImage}
                                    alt={product.Name}
                                    width="100%"
                                    height={150}
                                    style={{ objectFit: 'contain' }}
                                    className="mt-2"
                                />
                                <Button type="primary" className="w-full mt-2">
                                    Thêm vào giỏ
                                </Button>
                                <p className="text-red-500 font-bold mt-2 text-center">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.Price)}
                                </p>
                                <p className="text-center mt-1">
                                    {product.RatingAverage} ★ ({product.ReviewCount})
                                </p>
                                <p className="text-center mt-1">Nhà bán: {product.Seller || 'N/A'}</p>
                                <p className="text-center mt-1">
                                    ROM: {JSON.parse(product.SpecificationsFull).Content.storage?.value || 'N/A'}
                                </p>
                                <p className="text-center mt-1">
                                    RAM: {JSON.parse(product.SpecificationsFull).Content.ram?.value || 'N/A'}
                                </p>
                                <p className="text-center mt-1">
                                    GPU: {JSON.parse(product.SpecificationsFull).Content.gpu?.value || 'N/A'}
                                </p>
                                <p className="text-center mt-1">
                                    Chipset: {JSON.parse(product.SpecificationsFull).Content.chipset?.value || 'N/A'}
                                </p>
                                <p className="text-center mt-1">
                                    Màn hình: {JSON.parse(product.SpecificationsFull).Content.display_technology?.value || 'N/A'}
                                </p>
                                <p className="text-center mt-1">
                                    Tốc độ CPU: {JSON.parse(product.SpecificationsFull).Content.cpu_speed?.value || 'N/A'}
                                </p>
                            </div>

                            {/* Các cột sản phẩm tương tự */}
                            {similarProducts.map((similarProduct, idx) => {
                                const specs = JSON.parse(similarProduct.SpecificationsFull);
                                const firstImage = similarProduct.ImagesURL;
                                return (
                                    <div key={idx} className="border p-4 rounded min-w-[200px]">
                                        <p className="font-semibold text-center">{similarProduct.Name}</p>
                                        <Image
                                            src={firstImage}
                                            alt={similarProduct.Name}
                                            width="100%"
                                            height={150}
                                            style={{ objectFit: 'contain' }}
                                            className="mt-2"
                                        />
                                        <Button type="primary" className="w-full mt-2">
                                            Thêm vào giỏ
                                        </Button>
                                        <p className="text-red-500 font-bold mt-2 text-center">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(similarProduct.Price)}
                                        </p>
                                        <p className="text-center mt-1">
                                            {similarProduct.RatingAverage} ★ ({similarProduct.ReviewCount})
                                        </p>
                                        <p className="text-center mt-1">Nhà bán: {similarProduct.Seller || 'N/A'}</p>
                                        <p className="text-center mt-1">
                                            ROM: {specs.Content.storage?.value || 'N/A'}
                                        </p>
                                        <p className="text-center mt-1">
                                            RAM: {specs.Content.ram?.value || 'N/A'}
                                        </p>
                                        <p className="text-center mt-1">
                                            GPU: {specs.Content.gpu?.value || 'N/A'}
                                        </p>
                                        <p className="text-center mt-1">
                                            Chipset: {specs.Content.chipset?.value || 'N/A'}
                                        </p>
                                        <p className="text-center mt-1">
                                            Màn hình: {specs.Content.display_technology?.value || 'N/A'}
                                        </p>
                                        <p className="text-center mt-1">
                                            Tốc độ CPU: {specs.Content.cpu_speed?.value || 'N/A'}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <p>Không có sản phẩm tương tự để so sánh.</p>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;