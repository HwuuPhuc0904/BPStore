
import React from "react";
import Topbar from "../Topbar";
import ProductFilter from "../../../Components/Slidebar/ProductFilter";
import ProductGrid from "../../../Components/ProductGrid/index";
import Footer from "../../../Components/Footer";

export default function Products() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar - Fixed at top, full width */}
      <Topbar />
      
      {/* Main content area - Starts below Topbar */}
      <div className="flex flex-1 mt-16">
        {/* Sidebar Filters - Fixed width, full height */}
        {/*<div className="w-64 bg-gray-100">*/}
        {/*  <ProductFilter />*/}
        {/*</div>*/}

        {/* Product Grid - Flexible width */}
        <div className="flex-1 p-4">
          <ProductGrid />
        </div>

      </div>

      {/* Footer - Full width at bottom */}
      <Footer />
    </div>
  );
}