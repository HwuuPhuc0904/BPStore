import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/clientPages/Home/index';
import ProductDetail from './Components/CardProduct/Productdetail';
import LoginPage from './Pages/clientPages/Login/index';
import RegisterPage from './Pages/clientPages/SignUp/index';
import Products from './Pages/clientPages/Products/index';
import FlashSale from './Components/CardSale/FlashSaleCardHorizontal';
import ProfileForm from './Components/User/ProfileForm'; // Sửa chính tả và đường dẫn
import OrderTracking from './Components/User/OrderTracking'; // Sửa đường dẫn
import ProtectedRoute from './ProtectedRoute';
import './index.css';

function Router() {
    return (
        <Routes>
            {/* Route công khai */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wed/sales" element={<FlashSale />} />

            {/* Route cho người dùng đã đăng nhập */}
            <Route path="/user">
                <Route path="odertracking" element={
                    <ProtectedRoute role="USER">
                        <OrderTracking />
                    </ProtectedRoute>
                } />
                <Route path="account" element={
                    <ProtectedRoute role="USER">
                        <ProfileForm />
                    </ProtectedRoute>
                } />
            </Route>

            {/* Route admin (để chỗ để thêm sau) */}
            {/*
            <Route path="/admin" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><AdminHome /></ProtectedRoute>}>
                <Route path="dashboard" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><Dashboard /></ProtectedRoute>} />
                <Route path="user" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><UserManagement /></ProtectedRoute>} />
                <Route path="employee" element={<ProtectedRoute role="ADMIN"><EmployeeManagement /></ProtectedRoute>} />
                <Route path="order/:id" element={<ProtectedRoute role="ADMIN"><AdminOrderDetail /></ProtectedRoute>} />
                <Route path="brand" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><Brands /></ProtectedRoute>} />
                <Route path="addproduct" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><AddProduct /></ProtectedRoute>} />
                <Route path="product" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><ProductsManagement /></ProtectedRoute>} />
                <Route path="category" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><CategoryManagement /></ProtectedRoute>} />
                <Route path="material" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><MaterialManagement /></ProtectedRoute>} />
                <Route path="tag" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><TagManagement /></ProtectedRoute>} />
                <Route path="color" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><ColorManagement /></ProtectedRoute>} />
                <Route path="size" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><SizeManagement /></ProtectedRoute>} />
                <Route path="voucher" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><VoucherManagement /></ProtectedRoute>} />
                <Route path="sales" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><SalesManagement /></ProtectedRoute>} />
                <Route path="history" element={<ProtectedRoute role={["ADMIN", "EMPLOYEE"]}><HistoryTable /></ProtectedRoute>} />
                <Route path="order" element={<ProtectedRoute role="ADMIN"><OrderManagerPage /></ProtectedRoute>} />
            </Route>
            */}
        </Routes>
    );
}

export default Router;