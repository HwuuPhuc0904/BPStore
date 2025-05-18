import React from "react";
import Topbar from "../Topbar";
import ProductDetailComponent from "../../../Components/ProductGrid/Productdetail";
import Footer from "../../../Components/Footer";

export default function ProductsDetailPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Topbar />


            <div className="flex flex-1 mt-16">
                <div className="flex-1 p-4">
                    <ProductDetailComponent />
                </div>
            </div>

            <Footer />
        </div>
    );
}
