import React from 'react';
import { Button, Input, Table, Dropdown, Space, Tag, Select } from 'antd';
import { PlusOutlined, DownloadOutlined, UploadOutlined, FilterOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const columns = [
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Có thể bán',
        dataIndex: 'stock',
    },
    {
        title: 'Loại',
        dataIndex: 'type',
    },
    {
        title: 'Nhãn hiệu',
        dataIndex: 'brand',
    },
    {
        title: 'Ngày khởi tạo',
        dataIndex: 'createdAt',
    },
];

const data = [
    {
        key: '1',
        name: 'Kem dưỡng da Nivea',
        stock: 100,
        type: 'Chăm sóc da',
        brand: 'Nivea',
        createdAt: '02/05/2025',
    },
    // Thêm nhiều dữ liệu nếu cần
];

const ProductList = () => {
    return (
        <div style={{ padding: 20, background: '#fff' }}>
            <h2 style={{ fontSize: '20px', marginBottom: 16 }}>Danh sách sản phẩm</h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <Space wrap>
                    <Button icon={<DownloadOutlined />}>Xuất file</Button>
                    <Button icon={<UploadOutlined />}>Nhập file</Button>
                </Space>
                <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#1677ff' }}>
                    Thêm sản phẩm
                </Button>
            </div>

            <Space wrap style={{ marginBottom: 16 }}>
                <Search placeholder="Tìm kiếm theo mã sản phẩm" style={{ width: 220 }} />
                <Select placeholder="Kênh bán hàng" style={{ width: 160 }}>
                    <Option value="online">Online</Option>
                    <Option value="offline">Offline</Option>
                </Select>
                <Select placeholder="Loại sản phẩm" style={{ width: 160 }}>
                    <Option value="skincare">Chăm sóc da</Option>
                    <Option value="makeup">Trang điểm</Option>
                </Select>
                <Select placeholder="Tag" style={{ width: 160 }}>
                    <Option value="hot">Hot</Option>
                    <Option value="new">Mới</Option>
                </Select>
                <Button icon={<FilterOutlined />}>Bộ lọc khác</Button>
                <Button>Lưu bộ lọc</Button>
            </Space>

            <Table
                rowSelection={{}}
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
                bordered
            />
        </div>
    );
};

export default ProductList;
