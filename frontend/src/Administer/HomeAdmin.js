import React, { useState } from 'react';
import {
    HomeOutlined,
    ShoppingOutlined,
    CarOutlined,
    AppstoreOutlined,
    DatabaseOutlined,
    UserOutlined,
    GiftOutlined,
    DollarCircleOutlined,
    BarChartOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';

const { SubMenu } = Menu;

const HomeAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleClick = ({ key }) => {
        navigate(key);
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar */}
            <div
                style={{
                    width: collapsed ? 80 : 256,
                    minHeight: '100vh',
                    background: '#001529',
                    transition: 'width 0.3s',
                }}
            >
                <Menu
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    onClick={handleClick}
                    defaultOpenKeys={['orders', 'products', 'inventory', 'customers']}
                >
                    <Menu.Item key="/admin/overview" icon={<HomeOutlined />}>
                       Thông kê
                    </Menu.Item>

                    <SubMenu key="orders" icon={<ShoppingOutlined />} title="Đơn hàng">
                        <Menu.Item key="/admin/orders">Danh sách đơn hàng</Menu.Item>
                        <Menu.Item key="/admin/orders/drafts">Đơn hàng nháp</Menu.Item>
                        <Menu.Item key="/admin/orders/returns">Trả hàng</Menu.Item>
                        <Menu.Item key="/admin/orders/pending">Đơn chưa hoàn tất</Menu.Item>
                    </SubMenu>

                    <Menu.Item key="/admin/shipping" icon={<CarOutlined />}>
                        Vận chuyển
                    </Menu.Item>

                    <SubMenu key="products" icon={<AppstoreOutlined />} title="Sản phẩm">
                        <Menu.Item key="/admin/products/list">Danh sách sản phẩm</Menu.Item>
                        <Menu.Item key="/admin/products/catalogs">Danh mục sản phẩm</Menu.Item>
                        <Menu.Item key="/admin/products/pricing">Bảng giá</Menu.Item>
                        <Menu.Item key="/admin/products/attributes">Thuộc tính</Menu.Item>
                    </SubMenu>

                    <SubMenu key="inventory" icon={<DatabaseOutlined />} title="Quản lý kho">
                        <Menu.Item key="/admin/stock">Tồn kho</Menu.Item>
                        <Menu.Item key="/admin/purchase-orders">Đặt hàng nhập</Menu.Item>
                        <Menu.Item key="/admin/imports">Nhập hàng</Menu.Item>
                        <Menu.Item key="/admin/return-imports">Trả hàng nhập</Menu.Item>
                        <Menu.Item key="/admin/transfers">Chuyển kho</Menu.Item>
                        <Menu.Item key="/admin/suppliers">Nhà cung cấp</Menu.Item>
                    </SubMenu>

                    <SubMenu key="customers" icon={<UserOutlined />} title="Khách hàng">
                        <Menu.Item key="/admin/customers">Khách hàng</Menu.Item>
                        <Menu.Item key="/admin/customers/groups">Nhóm khách hàng</Menu.Item>
                    </SubMenu>

                    <Menu.Item key="/admin/promotions" icon={<GiftOutlined />}>
                        Khuyến mại
                    </Menu.Item>

                    <Menu.Item key="/admin/cashbook" icon={<DollarCircleOutlined />}>
                        Sổ quỹ
                    </Menu.Item>

                    <Menu.Item key="/admin/reports" icon={<BarChartOutlined />}>
                        Báo cáo
                    </Menu.Item>
                </Menu>
            </div>

            {/* Content */}
            <div
                style={{
                    flex: 1,
                    padding: 20,
                }}
            >
                <Outlet />
            </div>
        </div>
    );
};

export default HomeAdmin;
