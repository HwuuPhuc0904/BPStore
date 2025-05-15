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
        <div className="container mx-auto my-10 px-4 flex flex-col md:flex-row gap-10">
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
                    <span className="text-gray-500 line-through text-sm">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.OriginalPrice)}
                    </span>
                    {product.DiscountPercent > 0 && (
                        <span className="text-red-500 text-sm ml-2">(-{product.DiscountPercent}%)</span>
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

                <div className="mt-5">
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
            </div>
        </div>
    );
}

export default ProductDetail;