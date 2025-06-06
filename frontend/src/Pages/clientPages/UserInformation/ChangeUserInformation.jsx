import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, Alert, Spin } from 'antd';
import moment from 'moment';
import DatePicker from 'antd/es/date-picker';

const { Option } = Select;

const ChangeUserInformation = ({ API_URL, setActiveView }) => {
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Role: 'user',
        IsActive: true,
        EmailVerified: false,
        Birthday: null,
        Language: '',
        Country: '',
        Gender: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
                return;
            }
            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.user) {
                        setFormData({
                            Name: data.user.Name || '',
                            Email: data.user.Email || '',
                            Role: data.user.Role || 'user',
                            IsActive: data.user.IsActive !== undefined ? data.user.IsActive : true,
                            EmailVerified: data.user.EmailVerified !== undefined ? data.user.EmailVerified : false,
                            Birthday: data.user.Birthday ? moment(data.user.Birthday, 'YYYY-MM-DD') : null,
                            Language: data.user.Language || '',
                            Country: data.user.Country || 'Việt Nam',
                            Gender: data.user.Gender || '',
                        });
                    }
                } else {
                    setError('lỗi ko tải đc thông tin user.');
                }
            } catch (err) {
                setError('Lỗi tải thông tin useruser: ' + err.message);
            }
        };
        fetchUserInfo();
    }, [API_URL]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            Birthday: date,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
            setLoading(false);
            return;
        }

        if (!formData.Name || !formData.Email) {
            setError('Vui lòng điền đầy đủ tên và email.');
            setLoading(false);
            return;
        }

        if (formData.Birthday) {
            const birthDate = moment(formData.Birthday).toDate();
            const today = new Date();
            if (birthDate > today) {
                setError('Ngày sinh không thể trong tương lai.');
                setLoading(false);
                return;
            }
        }

        const payload = {
            Name: formData.Name,
            Email: formData.Email,
            Role: formData.Role,
            IsActive: formData.IsActive,
            EmailVerified: formData.EmailVerified,
            Birthday: formData.Birthday ? moment(formData.Birthday).format('YYYY-MM-DD') : null,
            Language: formData.Language,
            Country: formData.Country,
            Gender: formData.Gender,
        };

        try {
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    throw new Error('Không được phép hoặc bị cấm. Vui lòng kiểm tra trạng thái đăng nhập.');
                }
                const errorData = await response.json();
                throw new Error(errorData.message || `Cập nhật thông tin người dùng thất bại (Mã: ${response.status})`);
            }

            setSuccess('Cập nhật thông tin người dùng thành công.');
            setTimeout(() => setActiveView('information'), 1000);
        } catch (err) {
            setError(err.message || 'Cập nhật thông tin người dùng thất bại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 p-4">
            <Card
                title="Chỉnh sửa hồ sơ"
                bordered={false}
                style={{ maxWidth: 500, margin: '0 auto', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
                {error && (
                    <Alert type="error" message={error} showIcon style={{ marginBottom: 12 }} />
                )}
                {success && (
                    <Alert type="success" message={success} showIcon style={{ marginBottom: 12 }} />
                )}

                <Form component="form" layout="vertical" onSubmitCapture={handleSubmit}>
                    <Form.Item label="Tên người dùng" required>
                        <Input
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            size="middle"
                            style={{ borderRadius: 6 }}
                        />
                    </Form.Item>

                    <Form.Item label="Email" required>
                        <Input
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            size="middle"
                            style={{ borderRadius: 6 }}
                        />
                    </Form.Item>

                    <Form.Item label="Giới tính">
                        <Select
                            value={formData.Gender}
                            placeholder="Chọn giới tính"
                            onChange={(value) => setFormData((prev) => ({ ...prev, Gender: value }))}
                            size="middle"
                            style={{ borderRadius: 6 }}
                            allowClear
                        >
                            <Option value="male">Nam</Option>
                            <Option value="female">Nữ</Option>
                            <Option value="other">Khác</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Ngày sinh (YYYY-MM-DD)">
                        <DatePicker
                            value={formData.Birthday}
                            onChange={handleDateChange}
                            format="YYYY-MM-DD"
                            placeholder="Chọn ngày sinh"
                            size="middle"
                            style={{ width: '100%', borderRadius: 6 }}
                            disabledDate={(current) => current && current > moment().endOf('day')}
                        />
                    </Form.Item>

                    <Form.Item label="Ngôn ngữ">
                        <Select
                            placeholder="Chọn ngôn ngữ"
                            value={formData.Language}
                            onChange={(value) => setFormData((prev) => ({ ...prev, Language: value }))}
                            size="middle"
                            style={{ borderRadius: 6 }}
                            allowClear
                        >
                            <Option value="English">Tiếng Anh</Option>
                            <Option value="Spanish">Tiếng Tây Ban Nha</Option>
                            <Option value="French">Tiếng Pháp</Option>
                            <Option value="Vietnamese">Tiếng Việt</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Quốc gia">
                        <Input
                            name="Country"
                            value={formData.Country}
                            onChange={handleChange}
                            size="middle"
                            style={{ borderRadius: 6 }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="middle"
                            style={{ borderRadius: 6, marginTop: 12 }}
                            disabled={loading}
                        >
                            {loading ? <Spin size="small" /> : 'Lưu thay đổi'}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ChangeUserInformation;