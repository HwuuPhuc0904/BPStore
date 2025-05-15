import React from 'react';
import { Routes, Route,Navigate  } from 'react-router-dom';
import Home from './Pages/clientPages/Home/index';
import ProductsDetailPage from './Pages/clientPages/ProductsDetail';
import LoginPage from './Pages/clientPages/Login/index';
import RegisterPage from './Pages/clientPages/SignUp/index';
import Products from './Pages/clientPages/Products/index';
import FlashSale from './Components/CardSale/FlashSaleCardHorizontal';
import OrderTracking from './Components/OrderTracking/OrderTracking';
import ProtectedRoute from './ProtectedRoute';
import UserProfile from './Pages/clientPages/UserInformation/index'
import './index.css';
import HomeAdmin from "./Administer/HomeAdmin";
import ProductList from "./Administer/Product/ProductList";
import CatalogList from "./Administer/Product/ProductCatalog"
import UserList from "./Administer/User/UserList";

function Router() {
    return (
        <Routes>
            {/* Route công khai */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:productId" element={<ProductsDetailPage  />} />
            <Route path="/wed/sales" element={<FlashSale />} />

            <Route path="/admin" element={<HomeAdmin />} >
                {/*hiển thị trang đầu tiên*/}
                {/*<Route index element={<Navigate to="products/list" replace />} />*/}
                <Route path="products/list" element={<ProductList />} />
                <Route path="products/catalogs" element={<CatalogList />} />
                <Route path="user/list" element={<UserList />} />
            </Route>

            {/* Route cho người dùng đã đăng nhập */}
            <Route path="/user">
                <Route path="odertracking" element={
                    <ProtectedRoute role="user">
                        <OrderTracking />
                    </ProtectedRoute>
                } />
                <Route path="information" element={
                    <ProtectedRoute role="user">
                        <UserProfile />
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