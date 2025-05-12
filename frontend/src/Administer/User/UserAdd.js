import React, { useState } from 'react';
import { Button, Input, Select, Space, Radio, DatePicker, Row, Col } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddCustomer = () => {
    const [formData, setFormData] = useState({
        ho: '',
        ten: '',
        email: '',
        phone: '',
        birthDate: null,
        gender: 'Nam',
        province: null,
        district: null,
        ward: null,
        address: '',
        note: '',
        tag: '',
    });

    const provinces = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ'];
    const districts = {
        'Hà Nội': ['Quận Ba Đình', 'Quận Hoàn Kiếm', 'Quận Hai Bà Trưng'],
        'TP. Hồ Chí Minh': ['Quận 1', 'Quận 3', 'Quận 5'],
        'Đà Nẵng': ['Huyện Hòa Vang', 'Quận Hải Châu'],
        'Hải Phòng': ['Quận Hồng Bàng', 'Quận Ngô Quyền'],
        'Cần Thơ': ['Quận Ninh Kiều', 'Quận Bình Thủy'],
    };
    const wards = {
        'Quận Ba Đình': ['Phường Phúc Xá', 'Phường Trúc Bạch'],
        'Quận 1': ['Phường Bến Nghé', 'Phường Tân Định'],
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        // Thêm logic xử lý submit tại đây
    };

    return (
        <div style={{ padding: 20, background: '#fff', borderRadius: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <Button icon={<LeftOutlined />} style={{ marginRight: 8 }} />
                <h2 style={{ fontSize: 20, margin: 0 }}>Thêm mới khách hàng</h2>
            </div>

            <div style={{ padding: 16, background: '#fafafa', borderRadius: 4 }}>
                <h3 style={{ fontSize: 16, marginBottom: 16 }}>Thông tin cơ bản</h3>
                <Row gutter={16}>
                    <Col span={12}>
                        <div style={{ marginBottom: 16 }}>
                            <label>Họ</label>
                            <Input
                                placeholder="Nhập họ"
                                value={formData.ho}
                                onChange={(e) => handleChange('ho', e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label>Email</label>
                            <Input
                                placeholder="Nhập email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label>Ngày sinh</label>
                            <DatePicker
                                placeholder="dd/MM/yyyy"
                                style={{ width: '100%' }}
                                value={formData.birthDate}
                                onChange={(date) => handleChange('birthDate', date)}
                                format="DD/MM/YYYY"
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{ marginBottom: 16 }}>
                            <label>Tên</label>
                            <Input
                                placeholder="Nhập tên"
                                value={formData.ten}
                                onChange={(e) => handleChange('ten', e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label>Số điện thoại</label>
                            <Input
                                placeholder="Nhập số điện thoại"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                addonAfter={<Select defaultValue="Việt Nam" style={{ width: 80 }} />}
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label>Giới tính</label>
                            <Radio.Group
                                value={formData.gender}
                                onChange={(e) => handleChange('gender', e.target.value)}
                            >
                                <Radio value="Nam">Nam</Radio>
                                <Radio value="Nữ">Nữ</Radio>
                                <Radio value="Khác">Khác</Radio>
                            </Radio.Group>
                        </div>
                    </Col>
                </Row>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        <input type="checkbox" /> Nhận email quảng cáo
                    </label>
                </div>
            </div>

            <div style={{ padding: 16, background: '#fafafa', borderRadius: 4, marginTop: 16 }}>
                <h3 style={{ fontSize: 16, marginBottom: 16 }}>Địa chỉ nhận hàng</h3>
                <Row gutter={16}>
                    <Col span={12}>
                        <div style={{ marginBottom: 16 }}>
                            <label>Họ</label>
                            <Input
                                placeholder="Nhập họ"
                                value={formData.ho}
                                onChange={(e) => handleChange('ho', e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label>Quốc gia</label>
                            <Select
                                placeholder="Vietnam"
                                value={formData.province || 'Vietnam'}
                                onChange={(value) => handleChange('province', value)}
                                style={{ width: '100%' }}
                            >
                                <Option value="Vietnam">Vietnam</Option>
                            </Select>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label>Tỉnh/Thành phố</label>
                            <Select
                                placeholder="Chọn Tỉnh/Thành phố"
                                value={formData.province}
                                onChange={(value) => handleChange('province', value)}
                                style={{ width: '100%' }}
                            >
                                {provinces.map((province) => (
                                    <Option key={province} value={province}>
                                        {province}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label>Địa chỉ cụ thể</label>
                            <Input
                                placeholder="Nhập địa chỉ"
                                value={formData.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{ marginBottom: 16 }}>
                            <label>Tên</label>
                            <Input
                                placeholder="Nhập tên"
                                value={formData.ten}
                                onChange={(e) => handleChange('ten', e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label>Postal/Zipcode</label>
                            <Input
                                placeholder="Nhập Postal/Zipcode"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label>Quận/Huyện</label>
                            <Select
                                placeholder="Chọn Quận/Huyện"
                                value={formData.district}
                                onChange={(value) => handleChange('district', value)}
                                style={{ width: '100%' }}
                                disabled={!formData.province}
                            >
                                {formData.province && districts[formData.province].map((district) => (
                                    <Option key={district} value={district}>
                                        {district}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label>Phường/Xã</label>
                            <Select
                                placeholder="Chọn Phường/Xã"
                                value={formData.ward}
                                onChange={(value) => handleChange('ward', value)}
                                style={{ width: '100%' }}
                                disabled={!formData.district}
                            >
                                {formData.district && wards[formData.district].map((ward) => (
                                    <Option key={ward} value={ward}>
                                        {ward}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Col>
                </Row>
            </div>

            <div style={{ padding: 16, background: '#fafafa', borderRadius: 4, marginTop: 16 }}>
                <h3 style={{ fontSize: 16, marginBottom: 16 }}>Ghi chú</h3>
                <div style={{ marginBottom: 16 }}>
                    <label>Ghi chú</label>
                    <Input.TextArea
                        placeholder="Nhập ghi chú"
                        value={formData.note}
                        onChange={(e) => handleChange('note', e.target.value)}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Tag</label>
                    <Space>
                        <Input
                            placeholder="Tìm kiếm hoặc thêm mới tag"
                            value={formData.tag}
                            onChange={(e) => handleChange('tag', e.target.value)}
                        />
                        <Button>Danh sách tag</Button>
                    </Space>
                </div>
            </div>

            <div style={{ marginTop: 16, textAlign: 'right' }}>
                <Button style={{ marginRight: 8 }}>Hủy</Button>
                <Button type="primary">Lưu</Button>
            </div>
        </div>
    );
};

export default AddCustomer;