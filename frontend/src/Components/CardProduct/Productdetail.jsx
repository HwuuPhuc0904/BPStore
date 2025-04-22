import React, { useState } from 'react';
import { Button, Image, Spin, InputNumber } from 'antd';

function ProductDetail() {
    const [mainImage, setMainImage] = useState('https://via.placeholder.com/400');
    const [quantity, setQuantity] = useState(1);

    const colors = ['Đen', 'Trắng', 'Xanh'];
    const sizes = ['S', 'M', 'L', 'XL'];
    const thumbnailImages = [
        'https://via.placeholder.com/60',
        'https://via.placeholder.com/60/FF0000',
        'https://via.placeholder.com/60/00FF00',
    ];

    return (
        <div className="container mx-auto my-10 px-4 flex flex-col md:flex-row gap-10">
            {/* Left Image */}
            <div className="flex-1 bg-white p-6 rounded shadow">
                <Image
                    src={mainImage}
                    alt="main"
                    width={'100%'}
                    height={400}
                    style={{ objectFit: 'cover' }}
                />
                <div className="flex gap-3 justify-center mt-4">
                    {thumbnailImages.map((img, idx) => (
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
                            onClick={() => setMainImage(img)}
                            preview={false}
                        />
                    ))}
                </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold">Tên sản phẩm</h2>
                <p className="text-gray-500 mt-1">Mã SP: ABC123</p>

                <div className="mt-4">
                    <span className="text-base font-semibold">Giá:</span>{' '}
                    <span className="text-xl font-bold text-blue-600 ml-2">
                        500,000 VNĐ
                    </span>
                </div>

                <div className="mt-5">
                    <p className="font-semibold mb-1">Màu sắc:</p>
                    <div className="flex flex-wrap gap-2">
                        {colors.map((color, i) => (
                            <Button
                                key={i}
                                type="default"
                            >
                                {color}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="mt-5">
                    <p className="font-semibold mb-1">Kích thước:</p>
                    <div className="flex flex-wrap gap-2">
                        {sizes.map((size, i) => (
                            <Button
                                key={i}
                                type="default"
                            >
                                {size}
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

                <Button
                    type="primary"
                    danger
                    className="w-full mt-6"
                >
                    Thêm vào giỏ hàng
                </Button>
            </div>
        </div>
    );
}

export default ProductDetail;