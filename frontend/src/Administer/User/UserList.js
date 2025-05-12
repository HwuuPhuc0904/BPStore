import React, { useState } from 'react';
import { Button, Input, Table, Select, Space, message } from 'antd';
import { PlusOutlined, DownloadOutlined, UploadOutlined, FilterOutlined } from '@ant-design/icons';

const { Search } = Input;

const columns = [
    {
        title: '',
        dataIndex: 'checkbox',
        render: () => <input type="checkbox" style={{ margin: 0 }} />,
        width: 50,
    },
    {
        title: 'Thông tin',
        dataIndex: 'name',
        render: (text) => (
            <Space>
        <span style={{ display: 'inline-block', width: 24, height: 24, backgroundColor: '#ff6f61', color: 'white', borderRadius: '50%', textAlign: 'center', lineHeight: '24px', fontSize: 12 }}>
          {text.charAt(0)}
        </span>
                {text}
            </Space>
        ),
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Điện thoại',
        dataIndex: 'phone',
    },
    {
        title: 'Đơn hàng',
        dataIndex: 'orders',
    },
    {
        title: 'Đơn hàng gần nhất',
        dataIndex: 'lastOrder',
        render: (text) => (text ? '...' : '--'),
    },
    {
        title: 'Tổng chi tiêu',
        dataIndex: 'totalSpend',
    },
];

const initialData = [
    {
        key: '1',
        name: 'Nguyễn Đình Bách',
        email: 'bachvip@fpt.edu.vn',
        phone: '+0938421931',
        orders: 0,
        lastOrder: null,
        totalSpend: '0đ',
        group: 'loyal', // Nhóm khách hàng
        status: 'Đang hoạt động',
        tags: ['tag1'],
    },
];

const UserList = () => {
    const [filteredData, setFilteredData] = useState(initialData);
    const [groupFilter, setGroupFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [tagFilter, setTagFilter] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleFilter = () => {
        let result = [...initialData];

        if (searchText) {
            result = result.filter((item) =>
                item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                item.email.toLowerCase().includes(searchText.toLowerCase()) ||
                item.phone.includes(searchText)
            );
        }

        if (groupFilter) {
            result = result.filter((item) => item.group === groupFilter);
        }

        if (statusFilter) {
            result = result.filter((item) => item.status === statusFilter);
        }

        if (tagFilter) {
            result = result.filter((item) => item.tags.includes(tagFilter));
        }

        setFilteredData(result.length > 0 ? result : []);
        if (result.length === 0) {
            message.info('Không có kết quả tìm kiếm');
        }
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    return (
        <div style={{ padding: 20, background: '#fff' }}>
            <h2 style={{ fontSize: 20, marginBottom: 16 }}>Khách hàng</h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <Space wrap>
                    <Button icon={<DownloadOutlined />}>Xuất file</Button>
                    <Button icon={<UploadOutlined />}>Nhập file</Button>
                </Space>
                <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#1677ff' }}>
                    Thêm khách hàng
                </Button>
            </div>

            <Space wrap style={{ marginBottom: 16, alignItems: 'center' }}>
                <div style={{ padding: '8px 16px', borderBottom: '2px solid #1677ff', fontWeight: 600 }}>Tất cả</div>
                <Search placeholder="Tìm kiếm khách hàng" onSearch={handleSearch} style={{ width: 220 }} />
                <Select
                    placeholder="Nhóm khách hàng"
                    style={{ width: 160 }}
                    onChange={(value) => setGroupFilter(value)}
                    allowClear
                >
                    <Select.Option value="loyal">Khách hàng thân thiết</Select.Option>
                    <Select.Option value="ads">Nhân quảng cáo</Select.Option>
                </Select>
                <Select
                    placeholder="Trạng thái"
                    style={{ width: 160 }}
                    onChange={(value) => setStatusFilter(value)}
                    allowClear
                >
                    <Select.Option value="hasAccount">Có tài khoản</Select.Option>
                    <Select.Option value="noAccount">Chưa có tài khoản</Select.Option>
                    <Select.Option value="invited">Đã gửi lời mời đăng ký</Select.Option>
                </Select>
                <Select
                    placeholder="Đã được tag với"
                    style={{ width: 160 }}
                    onChange={(value) => setTagFilter(value)}
                    allowClear
                >
                    <Select.Option value="tag1">Tag 1</Select.Option>
                </Select>
                <Button icon={<FilterOutlined />} onClick={handleFilter}>Lọc</Button>
            </Space>

            <Table
                rowSelection={{}}
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    pageSize: 20,
                    showSizeChanger: true,
                    pageSizeOptions: ['20', '50', '100'],
                    showTotal: (total) => `Tổng ${total} khách hàng`,
                }}
                bordered
            />
        </div>
    );
};

export default UserList;