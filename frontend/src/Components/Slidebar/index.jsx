import React from "react";

export default function Sidebar() {
  return (
    <div className="w-1/4 p-4 bg-gray-100">
      <h2 className="font-bold text-lg mb-4">Filters</h2>
      {/* Categories */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Categories</h3>
        <ul>
          <li>T-Shirts</li>
          <li>Shorts</li>
          <li>Shirts</li>
          <li>Hoodies</li>
          <li>Jeans</li>
        </ul>
      </div>
      {/* Price Range */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price</h3>
        <input type="range" min="50" max="200" />
      </div>
      {/* Colors */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Colors</h3>
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
          {/* Add more colors */}
        </div>
      </div>
      {/* Sizes */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Size</h3>
        <ul>
          <li>Small</li>
          <li>Medium</li>
          <li>Large</li>
          <li>XL</li>
        </ul>
      </div>
    </div>
  );
}