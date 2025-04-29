import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { isAuthenticated, userRole } = useAuth();

    // Kiểm tra nếu người dùng chưa đăng nhập
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Kiểm tra nếu userRole hoặc role bị thiếu
    if (!userRole || !role) {
        return <Navigate to="/unauthorized" />;
    }

    // Xử lý quyền truy cập dựa trên vai trò
    if (Array.isArray(role)) {
        if (role.length === 0) {
            return children; // Cho phép truy cập nếu không có vai trò nào được chỉ định
        }
        if (!role.map(r => r.toUpperCase()).includes(userRole.toUpperCase())) {
            return <Navigate to="/unauthorized" />;
        }
    } else {
        if (userRole.toUpperCase() !== role.toUpperCase()) {
            return <Navigate to="/unauthorized" />;
        }
    }

    return children;
};

export default ProtectedRoute;