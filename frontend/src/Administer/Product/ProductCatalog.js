import React from 'react';
import {
    PlusOutlined,
    SearchOutlined,
    FilterOutlined,
} from '@ant-design/icons';
import { Button, Input, Table, Tabs, Select, Space, Avatar } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

const columns = [
    {
        title: '',
        dataIndex: 'select',
        width: 48,
        render: () => null, // Checkbox được Table tự thêm khi dùng rowSelection
    },
    {
        title: '',
        dataIndex: 'thumb',
        width: 70,
        render: () => (
            <Avatar
                shape="square"
                size={48}
                style={{ background: '#f5f5f5' }}
                icon={<img alt="" src="https://via.placeholder.com/48x48?text=%20" />}
            />
        ),
    },
    {
        title: 'Danh mục',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Số lượng',
        dataIndex: 'count',
        width: 120,
    },
    {
        title: 'Điều kiện áp dụng',
        dataIndex: 'condition',
        render: (v) => v || '—',
    },
];

const data = [
    {
        key: '1',
        name: 'Tất cả sản phẩm',
        count: 30,
        condition: '',
    },
    {
        key: '2',
        name: 'Sản phẩm mới',
        count: 30,
        condition: '',
    },
    {
        key: '3',
        name: 'Sản phẩm khuyến mãi',
        count: 30,
        condition: '',
    },
    {
        key: '4',
        name: 'Sữa rửa mặt',
        count: 6,
        condition: '',
    },
];

const CatalogList = () => {
    return (
        <div style={{ padding: 20, background: '#fff' }}>
            {/* Tiêu đề + nút thêm */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                }}
            >
                <h2 style={{ fontSize: 24, margin: 0 }}>Danh mục sản phẩm</h2>
                <Button type="primary" icon={<PlusOutlined />}>
                    Thêm danh mục
                </Button>
            </div>

            {/* Card bộ lọc & bảng */}
            <div style={{ borderRadius: 6, border: '1px solid #f0f0f0' }}>
                {/* Tabs (hiện 1 tab) */}
                <Tabs defaultActiveKey="all" items={[{ key: 'all', label: 'Tất cả' }]} />

                {/* Dải bộ lọc */}
                <div style={{ padding: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Input
                        placeholder="Tìm kiếm danh mục sản phẩm"
                        prefix={<SearchOutlined />}
                        style={{ width: 280 }}
                    />

                    <Select placeholder="Loại danh mục" style={{ width: 160 }}>
                        <Option value="manual">Thủ công</Option>
                        <Option value="auto">Tự động</Option>
                    </Select>

                    <Select placeholder="Kênh bán hàng" style={{ width: 160 }}>
                        <Option value="online">Online</Option>
                        <Option value="offline">Offline</Option>
                    </Select>

                    <Button icon={<FilterOutlined />}>Lưu bộ lọc</Button>
                </div>

                {/* Bảng danh mục */}
                <Table
                    rowSelection={{}}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={{ x: true }}
                    style={{ borderTop: '1px solid #f0f0f0' }}
                />
            </div>
        </div>
    );
};

export default CatalogList;
