import { Link } from 'react-router-dom';

export default function CardProductVertical({ product }) {

    return (
        <Link
            to={`/product/${product.id}`}
            className="relative block w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
        >
            {/* hình */}
            <div className="relative">
                <img src="/icons/flashsaleicons.png" className="absolute" alt="" />
                <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="h-80 w-80 object-cover rounded-t-xl"
                />
            </div>

            {/* nội dung */}
            <div className="px-4 py-3 w-80">
        <span className="text-gray-400 mr-3 uppercase text-xs">
          {product.brand}
        </span>
                <p className="text-lg font-bold text-black truncate capitalize">
                    {product.name}
                </p>

                <div className="flex items-center">
                    <p className="text-lg font-semibold text-black my-3">{product.price}</p>
                    <del>
                        <p className="text-sm text-gray-600 ml-2">{product.oldPrice}</p>
                    </del>
                    <div className="ml-auto">
                        {/* icon túi */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor">
                            <path
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                            />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
