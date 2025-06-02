import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Image, Spin, InputNumber, message } from 'antd';
import config from '../../config';

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [subtotal, setSubtotal] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [similarProducts, setSimilarProducts] = useState([]);

    const stripHtmlTags = (str) => {
        if (!str) return str;
        return str.replace(/<\/?[^>]+(>|$)/g, '');
    };

    const extractColorsFromText = (text) => {
        if (!text) return [];
        const colorKeywords = ['Đỏ', 'Xanh', 'Đen', 'Trắng', 'Vàng', 'Xám', 'Nâu', 'Hồng', 'Tím', 'Cam', 'Bạc', 'Vàng ánh kim', 'Xanh lam', 'Xanh lá'];
        const regex = new RegExp(`\\b(${colorKeywords.join('|')})\\b`, 'gi');
        const matches = text.match(regex) || [];
        return [...new Set(matches)];
    };

    useEffect(() => {
        const fetchProductAndSimilar = async () => {
            setLoading(true);
            try {
                const productResponse = await fetch(`${config.apiUrl}/api/v1/products/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                });
                if (!productResponse.ok) {
                    throw new Error(`HTTP error! Status: ${productResponse.status}`);
                }
                const productData = await productResponse.json();
                if (!productData || !productData.product) {
                    throw new Error('Dữ liệu phản hồi không chứa thông tin sản phẩm');
                }

                let specs = {};
                try {
                    specs = productData.product.SpecificationsFull
                        ? JSON.parse(productData.product.SpecificationsFull)
                        : { Content: {}, Operation: {} };
                } catch (parseError) {
                    console.error('Error parsing SpecificationsFull:', parseError);
                    specs = { Content: {}, Operation: {} };
                }

                setProduct({ ...productData.product, SpecificationsFull: specs });
                const firstImage = productData.product.ImagesURL ? productData.product.ImagesURL.split('|')[0] : null;
                setMainImage(firstImage || productData.product.MainImage || 'https://via.placeholder.com/400');
                setSubtotal(productData.product.Price || 0);
                setQuantity(1); // Đặt số lượng mặc định là 1 khi dữ liệu sản phẩm được tải

                const similarResponse = await fetch(
                    `${config.apiUrl}/api/v1/products?category=${productData.product.Categories}&limit=4`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'ngrok-skip-browser-warning': 'true',
                        },
                    }
                );
                if (!similarResponse.ok) {
                    throw new Error(`HTTP error! Status: ${similarResponse.status}`);
                }
                const similarData = await similarResponse.json();
                setSimilarProducts(similarData.products || []);
            } catch (error) {
                console.error('Error fetching product or similar products:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProductAndSimilar();
    }, [productId]);

    useEffect(() => {
        if (product) {
            const newSubtotal = quantity * (product.Price || 0);
            setSubtotal(newSubtotal);
            // Kiểm tra nếu số lượng vượt quá Stock, hiển thị thông báo và điều chỉnh
            if (quantity > (product.Stock || 0)) {
                message.warning(`Số lượng vượt quá tồn kho (${product.Stock} sản phẩm). Vui lòng chọn lại!`);
                setQuantity(product.Stock || 1);
            }
        }
    }, [quantity, product]);

    const handleAddToCart = () => {
        if (!product) return;
        if (product.Stock === 0) {
            message.error('Sản phẩm đã hết hàng!');
            return;
        }
        if (quantity > product.Stock) {
            message.error(`Số lượng vượt quá tồn kho (${product.Stock} sản phẩm). Vui lòng chọn lại!`);
            setQuantity(product.Stock);
            return;
        }
        message.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
        // Logic thêm vào giỏ hàng ở đây (gửi API hoặc lưu vào state)
    };

    if (error) return <div className="text-center py-10">Lỗi: {error}</div>;
    if (loading) return <div className="flex justify-center items-center h-screen"><Spin /></div>;
    if (!product) return <div className="text-center py-10">Không tìm thấy sản phẩm</div>;

    const specs = product.SpecificationsFull;
    const colorsFromSpecs = specs?.Content?.filter_color?.value ? specs.Content.filter_color.value.split(',') : [];
    const colorsFromName = extractColorsFromText(product.Name);
    const colorsFromDescription = extractColorsFromText(stripHtmlTags(product.Description));
    const productColors = [...new Set([...colorsFromSpecs, ...colorsFromName, ...colorsFromDescription])];
    const productCapacities = specs?.Content?.capacity?.value ? specs.Content.capacity.value.split(',') : [];
    const productSizes = specs?.Content?.filter_ncds_kichthuoc_noichaoam?.value ? specs.Content.filter_ncds_kichthuoc_noichaoam.value.split(',') : [];
    const productWeight = specs?.Content?.product_weight_mb?.value || '';

    const isAddToCartDisabled = product.Stock === 0 || quantity > product.Stock;

    return (
        <div className="container mx-auto my-10 px-4">
            <style>
                {`
                    .product-image-container {
                        max-height: 150px;
                        overflow: hidden;
                    }
                    .ant-image-img {
                        max-height: 150px !important;
                        object-fit: cover !important;
                        width: 100% !important;
                    }
                `}
            </style>
            <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 bg-white p-6 rounded shadow">
                    <Image
                        src={mainImage}
                        alt={product.Name || 'Sản phẩm'}
                        width={'100%'}
                        height={400}
                        style={{objectFit: 'cover'}}
                    />
                    <div className="flex gap-3 justify-center mt-4">
                        {product.ImagesURL && product.ImagesURL.split('|').length > 0 ? (
                            product.ImagesURL.split('|').map((img, idx) => (
                                <Image
                                    key={idx}
                                    src={img || 'https://via.placeholder.com/60'}
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
                            ))
                        ) : (
                            <p className="text-gray-500">Không có hình ảnh thu nhỏ</p>
                        )}
                    </div>
                </div>

                <div className="flex-1 bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-bold">{product.Name || 'Không có tên sản phẩm'}</h2>
                    <p className="text-gray-500 mt-1">Thương hiệu: {product.Brand || 'Không có thông tin'}</p>
                    <div className="mt-4 flex items-center">
                        <span className="text-xl font-bold text-red-500 mr-2">
                            {product.Price
                                ? new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(product.Price)
                                : 'Không có giá'}
                        </span>
                        {product.OriginalPrice && product.Price !== product.OriginalPrice && (
                            <>
                                <span className="text-gray-500 line-through text-sm">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(product.OriginalPrice)}
                                </span>
                                {product.DiscountPercent > 0 && (
                                    <span className="text-red-500 text-sm ml-2">(-{product.DiscountPercent}%)</span>
                                )}
                            </>
                        )}
                    </div>
                    <div className="mt-2 flex items-center">
                        <span className="text-yellow-500 mr-1">
                            {product.RatingAverage ? Array(Math.round(product.RatingAverage)).fill('★').join('') : 'Chưa có đánh giá'}
                        </span>
                        <span className="text-gray-600">({product.ReviewCount || 0} đánh giá)</span>
                        <span className="text-gray-600 ml-2">Đã bán {product.OrderCount || 0}</span>
                    </div>

                    <div className="mt-5">
                        <p className="font-semibold mb-1">Màu sắc:</p>
                        <div className="flex flex-wrap gap-2">
                            {productColors.length > 0 ? (
                                productColors.map((color, i) => (
                                    <Button
                                        key={i}
                                        type="default"
                                        style={{backgroundColor: '#e0f7fa', color: 'black'}}
                                    >
                                        {color.trim()}
                                    </Button>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">Không có thông tin màu sắc</p>
                            )}
                        </div>
                    </div>

                    {productCapacities.length > 0 && (
                        <div className="mt-5">
                            <p className="font-semibold mb-1">Dung lượng:</p>
                            <div className="flex flex-wrap gap-2">
                                {productCapacities.map((capacity, i) => (
                                    <Button
                                        key={i}
                                        type="default"
                                        style={{backgroundColor: '#e0f7fa', color: 'black'}}
                                    >
                                        {capacity.trim()}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {productSizes.length > 0 && (
                        <div className="mt-5">
                            <p className="font-semibold mb-1">Kích thước:</p>
                            <div className="flex flex-wrap gap-2">
                                {productSizes.map((size, i) => (
                                    <Button
                                        key={i}
                                        type="default"
                                        style={{backgroundColor: '#e0f7fa', color: 'black'}}
                                    >
                                        {size.trim()}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {productWeight && (
                        <div className="mt-5">
                            <p className="font-semibold mb-1">Khối lượng:</p>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    type="default"
                                    style={{backgroundColor: '#e0f7fa', color: 'black'}}
                                >
                                    {productWeight} kg
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="mt-5 flex items-center gap-2">
                        <span className="font-semibold">Số lượng:</span>
                        <Button
                            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                            disabled={quantity <= 1}
                        >
                            -
                        </Button>
                        <InputNumber
                            min={1}
                            max={product.Stock || 1000}
                            value={quantity}
                            onChange={(val) => setQuantity(val)}
                            style={{width: 80}}
                        />
                        <Button
                            onClick={() => setQuantity(quantity < (product.Stock || 1000) ? quantity + 1 : quantity)}
                            disabled={quantity >= (product.Stock || 1000)}
                        >
                            +
                        </Button>
                    </div>

                    <div className="mt-4">
                        <span className="font-semibold">Tạm tính:</span>
                        <span className="text-xl font-bold text-red-500 ml-2">
                            {new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(subtotal)}
                        </span>
                    </div>

                    <Button
                        type="primary"
                        danger
                        className="w-full mt-6"
                        disabled={isAddToCartDisabled}
                        onClick={handleAddToCart}
                    >
                        {product.Stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
                    </Button>
                </div>
            </div>

            <div className="mt-6 bg-white p-6 rounded shadow">
                <div>
                    <p className="font-semibold">Thông tin sản phẩm:</p>
                    <ul className="list-disc pl-5 mt-2">
                        {specs?.Content && Object.keys(specs.Content).length > 0 ? (
                            Object.entries(specs.Content).map(([key, spec], i) => (
                                <li key={i} className="text-sm text-gray-600">
                                    {spec.name || key}: {stripHtmlTags(spec.value) || 'Không có giá trị'}
                                </li>
                            ))
                        ) : (
                            <li className="text-sm text-gray-600">Không có thông tin sản phẩm</li>
                        )}
                    </ul>
                    <ul className="list-disc pl-5 mt-2">
                        {specs?.Operation && Object.keys(specs.Operation).length > 0 ? (
                            Object.entries(specs.Operation).map(([key, spec], i) => (
                                <li key={i} className="text-sm text-gray-600">
                                    {spec.name || key}: {stripHtmlTags(spec.value) || 'Không có giá trị'}
                                </li>
                            ))
                        ) : (
                            <li className="text-sm text-gray-600">Không có thông tin vận hành</li>
                        )}
                    </ul>
                    <p className="text-sm text-gray-600 mt-2">Tồn kho: {product.Stock || 'Không có thông tin'}</p>
                    <p className="text-sm text-gray-600 mt-2">Trạng
                        thái: {product.InventoryStatus || 'Không có thông tin'}</p>
                    <p className="text-sm text-gray-600 mt-2">Nhà bán: {product.Seller || 'Không có thông tin'}</p>
                </div>

                <div className="mt-6">
                    <p className="font-semibold">Mô tả sản phẩm:</p>
                    {showFullDescription ? (
                        <div>
                            <p className="text-gray-700 text-sm whitespace-pre-line">
                                <div
                                    dangerouslySetInnerHTML={{__html: product.Description || 'Chưa có mô tả chi tiết.'}}/>
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

            <div className="mt-6 bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">So sánh sản phẩm tương tự</h2>
                {similarProducts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div className="border p-4 rounded min-w-[200px]">
                                <p className="font-semibold text-center">{product.Name || 'Không có tên'}</p>
                                <Image
                                    src={mainImage}
                                    alt={product.Name || 'Sản phẩm'}
                                    width="100%"
                                    height={150}
                                    style={{objectFit: 'contain'}}
                                    className="mt-2"
                                />
                                <Button type="primary" className="w-full mt-2">
                                    Thêm vào giỏ
                                </Button>
                                <p className="text-red-500 font-bold mt-2 text-center">
                                    {product.Price
                                        ? new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(product.Price)
                                        : 'Không có giá'}
                                </p>
                                <p className="text-center mt-1">
                                    {product.RatingAverage || 0} ★ ({product.ReviewCount || 0})
                                </p>
                                <p className="text-center mt-1">Nhà bán: {product.Seller || 'N/A'}</p>
                                {Object.entries(specs.Content || {}).map(([key, spec], i) => (
                                    <p key={i} className="text-center mt-1">
                                        {spec.name || key}: {stripHtmlTags(spec.value) || 'N/A'}
                                    </p>
                                ))}
                            </div>

                            {similarProducts.map((similarProduct, idx) => {
                                let similarSpecs = {};
                                try {
                                    similarSpecs = similarProduct.SpecificationsFull
                                        ? JSON.parse(similarProduct.SpecificationsFull)
                                        : {Content: {}};
                                } catch (parseError) {
                                    console.error('Error parsing similar product specs:', parseError);
                                    similarSpecs = {Content: {}};
                                }
                                const firstImage = similarProduct.ImagesURL
                                    ? similarProduct.ImagesURL.split('|')[0]
                                    : similarProduct.MainImage || 'https://via.placeholder.com/150';
                                return (
                                    <div className="border p-2 rounded min-w-[200px] max-h-[134px] overflow-hidden">
                                        <p className="font-semibold text-center">{similarProduct.Name || 'Không có tên'}</p>
                                        <Image
                                            src={firstImage}
                                            alt={similarProduct.Name || 'Sản phẩm'}
                                            width="100%"
                                            height={150}
                                            style={{
                                                objectFit: 'cover',
                                                maxWidth: '100%',
                                                maxHeight: '150px',
                                                display: 'block'
                                            }}
                                            className="mt-0"
                                        />
                                        />
                                        <Button type="primary" className="w-full mt-2">
                                            Thêm vào giỏ
                                        </Button>
                                        <p className="text-red-500 font-bold mt-2 text-center">
                                            {similarProduct.Price
                                                ? new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(similarProduct.Price)
                                                : 'Không có giá'}
                                        </p>
                                        <p className="text-center mt-1">
                                            {similarProduct.RatingAverage || 0} ★ ({similarProduct.ReviewCount || 0})
                                        </p>
                                        <p className="text-center mt-1">Nhà bán: {similarProduct.Seller || 'N/A'}</p>
                                        {Object.entries(similarSpecs.Content || {}).map(([key, spec], i) => (
                                            <p key={i} className="text-center mt-1">
                                                {spec.name || key}: {stripHtmlTags(spec.value) || 'N/A'}
                                            </p>
                                        ))}
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