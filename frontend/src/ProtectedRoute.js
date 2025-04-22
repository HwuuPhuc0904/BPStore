// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Giả sử bạn đã thiết lập AuthContext
//
// const ProtectedRoute = ({ children, role }) => {
//     const { isAuthenticated, userRole } = useAuth();
//
//     if (!isAuthenticated) {
//         return <Navigate to="/login" />;
//     }
//
//     if (role.toUpperCase() && userRole !== role.toUpperCase()) {
//         return <Navigate to="/login" />;
//     }
//
//     return children;
// };
//
// export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { isAuthenticated, userRole } = useAuth();

    // Kiểm tra người dùng đã đăng nhập hay chưa
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Nếu `role` là một mảng, kiểm tra xem `userRole` có nằm trong danh sách vai trò hợp lệ không
    if (Array.isArray(role)) {
        if (!role.map(r => r.toUpperCase()).includes(userRole.toUpperCase())) {
            return <Navigate to="/login" />; // Hoặc một trang lỗi khác
        }
    } else {
        // Nếu `role` là một chuỗi, kiểm tra vai trò khớp
        if (userRole.toUpperCase() !== role.toUpperCase()) {
            return <Navigate to="/login" />;
        }
    }

    return children;
};

export default ProtectedRoute;

