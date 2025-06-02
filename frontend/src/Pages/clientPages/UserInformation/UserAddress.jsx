import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Form, Input, Modal, Row, Select, Spin, Checkbox, message } from 'antd';
import config from '../../../config';

const { Option } = Select;

const UserAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [formData, setFormData] = useState({
        recipient_name: '',
        phone: '',
        alternate_phone: '',
        street_address: '',
        company_name: '',
        email: '',
        province_code: '',
        district_code: '',
        ward_code: '',
        province_name: '',
        district_name: '',
        ward_name: '',
        delivery_notes: '',
        isDefault: false,
        address_type: 'shipping',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingWards, setLoadingWards] = useState(false);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [showUpdateAddressForm, setShowUpdateAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [form] = Form.useForm();

    const ADDRESS_API_URL = config.apiUrl + '/api/v1/users/addresses';

    const resetFormData = () => {
        const initialData = {
            recipient_name: '',
            phone: '',
            alternate_phone: '',
            street_address: '',
            company_name: '',
            email: '',
            province_code: '',
            district_code: '',
            ward_code: '',
            province_name: '',
            district_name: '',
            ward_name: '',
            delivery_notes: '',
            isDefault: false,
            address_type: 'shipping',
        };
        setFormData(initialData);
        form.resetFields();
        form.setFieldsValue(initialData);
        setDistricts([]);
        setWards([]);
    };

    useEffect(() => {
        const fetchProvinces = async () => {
            setLoadingProvinces(true);
            try {
                const response = await fetch('https://provinces.open-api.vn/api/p/', {
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Không thể tải danh sách tỉnh/thành phố. Mã lỗi: ${response.status}`);
                }
                const data = await response.json();
                if (!data || !Array.isArray(data)) {
                    throw new Error('Dữ liệu tỉnh/thành phố không hợp lệ.');
                }
                setProvinces(data);
                console.log('Loaded Provinces:', data);
            } catch (err) {
                setError(err.message || 'Lỗi khi tải danh sách tỉnh/thành phố. Vui lòng kiểm tra kết nối mạng.');
                setProvinces([]);
                console.error('Error fetching provinces:', err);
            } finally {
                setLoadingProvinces(false);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (!formData.province_code) {
            setDistricts([]);
            setWards([]);
            setFormData((prev) => ({ ...prev, district_code: '', ward_code: '', district_name: '', ward_name: '' }));
            return;
        }

        const fetchDistricts = async () => {
            setLoadingDistricts(true);
            try {
                const response = await fetch(`https://provinces.open-api.vn/api/p/${formData.province_code}?depth=2`);
                if (!response.ok) throw new Error(`Không thể tải danh sách quận/huyện. Mã lỗi: ${response.status}`);
                const data = await response.json();
                if (!data.districts || !Array.isArray(data.districts)) {
                    throw new Error('Dữ liệu quận/huyện không hợp lệ.');
                }
                setDistricts(data.districts);
                const district = data.districts.find((d) => String(d.code) === String(formData.district_code));
                if (district) {
                    setFormData((prev) => ({ ...prev, district_name: district.name }));
                } else {
                    setFormData((prev) => ({ ...prev, district_code: '', district_name: '' }));
                }
            } catch (err) {
                setError(err.message || 'Lỗi khi tải danh sách quận/huyện. Vui lòng thử lại.');
                setDistricts([]);
            } finally {
                setLoadingDistricts(false);
            }
        };
        fetchDistricts();
    }, [formData.province_code]);

    useEffect(() => {
        if (!formData.district_code) {
            setWards([]);
            setFormData((prev) => ({ ...prev, ward_code: '', ward_name: '' }));
            return;
        }

        const fetchWards = async () => {
            setLoadingWards(true);
            try {
                const response = await fetch(`https://provinces.open-api.vn/api/d/${formData.district_code}?depth=2`);
                if (!response.ok) throw new Error(`Không thể tải danh sách phường/xã. Mã lỗi: ${response.status}`);
                const data = await response.json();
                if (!data.wards || !Array.isArray(data.wards)) {
                    throw new Error('Dữ liệu phường/xã không hợp lệ.');
                }
                setWards(data.wards);
                const ward = data.wards.find((w) => String(w.code) === String(formData.ward_code));
                if (ward) {
                    setFormData((prev) => ({ ...prev, ward_name: ward.name }));
                } else {
                    setFormData((prev) => ({ ...prev, ward_code: '', ward_name: '' }));
                }
            } catch (err) {
                setError(err.message || 'Lỗi khi tải danh sách phường/xã. Vui lòng thử lại.');
                setWards([]);
            } finally {
                setLoadingWards(false);
            }
        };
        fetchWards();
    }, [formData.district_code]);

    const fetchUserAddresses = async () => {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token') || localStorage.getItem('access_token');
        if (!token) {
            setError('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.');
            setLoading(false);
            setAddresses([]);
            return;
        }

        if (token.split('.').length !== 3) {
            setError('Token không hợp lệ. Vui lòng đăng nhập lại.');
            setLoading(false);
            setAddresses([]);
            return;
        }

        try {
            const response = await fetch(ADDRESS_API_URL, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
            });

            console.log('Fetch Addresses Response Status:', response.status);
            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 401 || response.status === 403) {
                    throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
                }
                throw new Error(errorData.message || `Tải địa chỉ thất bại. Mã lỗi: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched Addresses:', data);
            setAddresses(data || []);
        } catch (e) {
            setError(e.message || 'Tải địa chỉ thất bại. Vui lòng kiểm tra kết nối hoặc thử lại sau.');
            setAddresses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserAddresses();
    }, []);

    const handleDeleteAddress = async (addressId) => {
        const token = localStorage.getItem('token') || localStorage.getItem('access_token');
        if (!token) {
            setError('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.');
            return;
        }

        if (token.split('.').length !== 3) {
            setError('Token không hợp lệ. Vui lòng đăng nhập lại.');
            return;
        }

        try {
            const response = await fetch(`${ADDRESS_API_URL}/${addressId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
            });

            console.log('Delete Address Response Status:', response.status);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Xóa địa chỉ thất bại. Mã lỗi: ${response.status}`);
            }

            setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
            message.success('Xóa địa chỉ thành công!');
        } catch (err) {
            setError(err.message || 'Xóa địa chỉ thất bại. Vui lòng thử lại.');
        }
    };

    const handleSubmit = async (values) => {
        setError('');

        if (!values.recipient_name || !values.phone || !values.street_address || !formData.province_code || !formData.district_code || !formData.ward_code) {
            setError('Vui lòng điền đầy đủ thông tin bắt buộc (tên, số điện thoại, địa chỉ, tỉnh/quận/phường).');
            return;
        }

        if (loadingProvinces) {
            setError('Đang tải danh sách tỉnh/thành phố. Vui lòng đợi...');
            return;
        }

        if (provinces.length === 0) {
            setError('Không thể tải danh sách tỉnh/thành phố. Vui lòng thử lại sau.');
            return;
        }

        const phoneRegex = /^[0-9]+$/;
        if (!phoneRegex.test(values.phone)) {
            setError('Số điện thoại chỉ được chứa các ký tự số.');
            return;
        }

        if (values.alternate_phone && !phoneRegex.test(values.alternate_phone)) {
            setError('Số điện thoại phụ chỉ được chứa các ký tự số.');
            return;
        }

        const province = provinces.find((p) => String(p.code) === String(formData.province_code));
        if (!province) {
            setError(`Không tìm thấy tỉnh/thành phố với mã ${formData.province_code}. Vui lòng kiểm tra lại.`);
            console.log('Provinces:', provinces);
            console.log('Province Code:', formData.province_code);
            return;
        }

        const district = districts.find((d) => String(d.code) === String(formData.district_code));
        if (!district) {
            setError(`Không tìm thấy quận/huyện với mã ${formData.district_code}. Vui lòng kiểm tra lại.`);
            return;
        }

        const ward = wards.find((w) => String(w.code) === String(formData.ward_code));
        if (!ward) {
            setError(`Không tìm thấy phường/xã với mã ${formData.ward_code}. Vui lòng kiểm tra lại.`);
            return;
        }

        const token = localStorage.getItem('token') || localStorage.getItem('access_token');
        if (!token) {
            setError('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.');
            return;
        }

        if (token.split('.').length !== 3) {
            setError('Token không hợp lệ. Vui lòng đăng nhập lại.');
            return;
        }

        let userId = null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            userId = payload.user_id || payload.id || payload.userId;
            if (!userId) {
                throw new Error('Không tìm thấy user_id trong token.');
            }
        } catch (e) {
            console.error('Lỗi khi decode token:', e);
            setError('Không thể xác thực tài khoản. Vui lòng đăng nhập lại.');
            return;
        }

        const newAddress = {
            recipient_name: values.recipient_name,
            phone: values.phone.replace(/\D/g, ''),
            street_address: values.street_address,
            company_name: values.company_name || null,
            alternate_phone: values.alternate_phone ? values.alternate_phone.replace(/\D/g, '') : null,
            email: values.email || null,
            delivery_notes: values.delivery_notes || null,
            country: values.country || 'Việt Nam',
            province_code: String(formData.province_code),
            province_name: province.name,
            district_code: String(formData.district_code),
            district_name: district.name,
            ward_code: String(formData.ward_code),
            ward_name: ward.name,
            address_type: values.address_type || 'shipping',
            is_default: Boolean(values.isDefault),
            latitude: null,
            longitude: null,
        };

        console.log('Data sent to API:', newAddress);

        try {
            const method = editingAddress ? 'PUT' : 'POST';
            const url = editingAddress ? `${ADDRESS_API_URL}/${editingAddress.id}` : ADDRESS_API_URL;

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify(newAddress),
            });

            console.log('Submit Address Response Status:', response.status);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Thao tác địa chỉ thất bại. Mã lỗi: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response Data:', data);

            if (editingAddress) {
                setAddresses((prev) => {
                    const updatedAddresses = prev.map((addr) => (addr.id === editingAddress.id ? data : addr));
                    console.log('Updated Addresses:', updatedAddresses);
                    return updatedAddresses;
                });
                message.success('Cập nhật địa chỉ thành công!');
            } else {
                setAddresses((prev) => {
                    if (values.isDefault) {
                        return prev.map((addr) => ({ ...addr, is_default: false })).concat(data);
                    }
                    return [...prev, data];
                });
                message.success('Thêm địa chỉ thành công!');
            }

            await fetchUserAddresses();
            resetFormData();
            setShowAddAddressForm(false);
            setShowUpdateAddressForm(false);
            setEditingAddress(null);
            setError('');
        } catch (err) {
            setError(err.message || 'Thao tác địa chỉ thất bại. Vui lòng thử lại.');
        }
    };

    const handleUpdateAddress = async (index) => {
        const address = addresses[index];
        if (!address) return;
        setEditingAddress(address);

        const updatedFormData = {
            recipient_name: address.recipient_name || '',
            phone: address.phone || '',
            alternate_phone: address.alternate_phone || '',
            street_address: address.street_address || '',
            company_name: address.company_name || '',
            email: address.email || '',
            province_code: address.province_code || '',
            district_code: address.district_code || '',
            ward_code: address.ward_code || '',
            province_name: address.province_name || '',
            district_name: address.district_name || '',
            ward_name: address.ward_name || '',
            delivery_notes: address.delivery_notes || '',
            isDefault: address.is_default || false,
            address_type: address.address_type || 'shipping',
        };

        setFormData(updatedFormData);
        form.setFieldsValue(updatedFormData);

        if (address.province_code) {
            setLoadingDistricts(true);
            try {
                const response = await fetch(`https://provinces.open-api.vn/api/p/${address.province_code}?depth=2`);
                if (response.ok) {
                    const data = await response.json();
                    setDistricts(data.districts || []);
                    const district = data.districts.find((d) => String(d.code) === String(address.district_code));
                    if (district) {
                        setFormData((prev) => ({ ...prev, district_name: district.name }));
                    } else {
                        setFormData((prev) => ({ ...prev, district_code: '', district_name: '' }));
                    }
                } else {
                    throw new Error('Không thể tải danh sách quận/huyện.');
                }
            } catch (err) {
                setError('Lỗi khi tải danh sách quận/huyện. Vui lòng thử lại.');
                setDistricts([]);
            } finally {
                setLoadingDistricts(false);
            }
        }

        if (address.district_code) {
            setLoadingWards(true);
            try {
                const response = await fetch(`https://provinces.open-api.vn/api/d/${address.district_code}?depth=2`);
                if (response.ok) {
                    const data = await response.json();
                    setWards(data.wards || []);
                    const ward = data.wards.find((w) => String(w.code) === String(address.ward_code));
                    if (ward) {
                        setFormData((prev) => ({ ...prev, ward_name: ward.name }));
                    } else {
                        setFormData((prev) => ({ ...prev, ward_code: '', ward_name: '' }));
                    }
                } else {
                    throw new Error('Không thể tải danh sách phường/xã.');
                }
            } catch (err) {
                setError('Lỗi khi tải danh sách phường/xã. Vui lòng thử lại.');
                setWards([]);
            } finally {
                setLoadingWards(false);
            }
        }

        setShowUpdateAddressForm(true);
    };

    const handleSetDefault = async (index) => {
        const token = localStorage.getItem('token') || localStorage.getItem('access_token');
        if (!token) {
            setError('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.');
            return;
        }

        if (token.split('.').length !== 3) {
            setError('Token không hợp lệ. Vui lòng đăng nhập lại.');
            return;
        }

        const addressToUpdate = addresses[index];
        if (!addressToUpdate) return;
        const currentDefault = addresses.find((addr) => addr.is_default && addr.id !== addressToUpdate.id);

        try {
            const updateResponse = await fetch(`${ADDRESS_API_URL}/${addressToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify({ ...addressToUpdate, is_default: true }),
            });

            console.log('Set Default Response Status:', updateResponse.status);
            if (!updateResponse.ok) {
                const errorData = await updateResponse.json();
                throw new Error(errorData.message || `Cập nhật địa chỉ mặc định thất bại. Mã lỗi: ${updateResponse.status}`);
            }

            if (currentDefault) {
                const resetResponse = await fetch(`${ADDRESS_API_URL}/${currentDefault.id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                    body: JSON.stringify({ ...currentDefault, is_default: false }),
                });

                if (!resetResponse.ok) {
                    const errorData = await resetResponse.json();
                    throw new Error(errorData.message || `Đặt lại địa chỉ mặc định thất bại. Mã lỗi: ${resetResponse.status}`);
                }
            }

            setAddresses((prev) =>
                prev.map((addr) => ({
                    ...addr,
                    is_default: addr.id === addressToUpdate.id,
                }))
            );
            message.success('Đã đặt địa chỉ làm mặc định!');
        } catch (err) {
            setError(err.message || 'Cập nhật địa chỉ mặc định thất bại. Vui lòng thử lại.');
        }
    };

    const filterOption = (input, option) => {
        return option?.children?.toLowerCase().includes(input.toLowerCase()) || false;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin tip="Đang tải danh sách địa chỉ..." />
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Địa chỉ của tôi</h1>
                <Button
                    type="primary"
                    danger
                    onClick={() => {
                        setEditingAddress(null);
                        resetFormData();
                        setShowAddAddressForm(true);
                    }}
                >
                    + Thêm địa chỉ mới
                </Button>
            </div>

            {error && (
                <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />
            )}

            {addresses.length === 0 ? (
                <p>Chưa có địa chỉ nào được thêm.</p>
            ) : (
                addresses.map((addr) => {
                    if (!addr) return null;
                    return (
                        <div key={addr.id} className="border p-4 mb-4 rounded-lg relative">
                            <h3 className="font-semibold">Tên: {addr.recipient_name || 'Chưa cập nhật'}</h3>
                            <p>SĐT: {addr.phone || 'Chưa cập nhật'}</p>
                            {addr.company_name && <p>Công ty: {addr.company_name}</p>}
                            {addr.email && <p>Email: {addr.email}</p>}
                            <p>Địa chỉ chi tiết: {addr.street_address || 'Chưa cập nhật'}</p>
                            <p>
                                Địa chỉ:{' '}
                                {[addr.street_address, addr.ward_name, addr.district_name, addr.province_name]
                                    .filter(Boolean)
                                    .join(', ') || 'Chưa cập nhật'}
                            </p>
                            {addr.delivery_notes && <p>Ghi chú giao hàng: {addr.delivery_notes}</p>}
                            {addr.is_default && <span className="text-red-500">Mặc định</span>}
                            <div className="mt-2 flex gap-2">
                                <Button
                                    type="link"
                                    onClick={() => handleUpdateAddress(addresses.findIndex((a) => a.id === addr.id))}
                                    style={{ padding: 0 }}
                                >
                                    Cập nhật
                                </Button>
                                <Button
                                    type="link"
                                    onClick={() => handleSetDefault(addresses.findIndex((a) => a.id === addr.id))}
                                    style={{ padding: 0 }}
                                    disabled={addr.is_default}
                                >
                                    Thiết lập mặc định
                                </Button>
                                <Button
                                    type="link"
                                    danger
                                    onClick={() => handleDeleteAddress(addr.id)}
                                    style={{ padding: 0 }}
                                >
                                    Xóa địa chỉ
                                </Button>
                            </div>
                        </div>
                    );
                })
            )}

            <Modal
                title={editingAddress ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
                open={showAddAddressForm || showUpdateAddressForm}
                onCancel={() => {
                    setShowAddAddressForm(false);
                    setShowUpdateAddressForm(false);
                    setEditingAddress(null);
                    resetFormData();
                }}
                footer={null}
                width={600}
            >
                {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}
                <Form
                    form={form}
                    initialValues={{
                        recipient_name: '',
                        phone: '',
                        alternate_phone: '',
                        street_address: '',
                        company_name: '',
                        email: '',
                        province_name: '',
                        district_name: '',
                        ward_name: '',
                        delivery_notes: '',
                        isDefault: false,
                        address_type: 'shipping',
                    }}
                    onFinish={handleSubmit}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                label="Tên người nhận"
                                name="recipient_name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Số điện thoại phụ (tùy chọn)" name="alternate_phone">
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Tên công ty (tùy chọn)" name="company_name">
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Email (tùy chọn)" name="email">
                                <Input type="email" size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Địa chỉ chi tiết"
                                name="street_address"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết!' }]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Tỉnh/Thành phố"
                                name="province_name"
                                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
                            >
                                <Select
                                    placeholder="Chọn tỉnh/thành phố"
                                    loading={loadingProvinces}
                                    onChange={(value, option) => {
                                        const province = provinces.find((p) => p.name === value);
                                        const updatedFormData = {
                                            ...formData,
                                            province_code: province ? String(province.code) : '',
                                            province_name: value,
                                            district_code: '',
                                            district_name: '',
                                            ward_code: '',
                                            ward_name: '',
                                        };
                                        setFormData(updatedFormData);
                                        form.setFieldsValue(updatedFormData);
                                        console.log('Selected Province:', { code: province?.code, name: value });
                                    }}
                                    size="large"
                                    showSearch
                                    filterOption={filterOption}
                                    notFoundContent={loadingProvinces ? <Spin size="small" /> : null}
                                >
                                    {provinces.map((p) => (
                                        <Option key={p.code} value={p.name}>
                                            {p.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Quận/Huyện"
                                name="district_name"
                                rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
                            >
                                <Select
                                    placeholder="Chọn quận/huyện"
                                    loading={loadingDistricts}
                                    disabled={!formData.province_code}
                                    onChange={(value, option) => {
                                        const district = districts.find((d) => d.name === value);
                                        const updatedFormData = {
                                            ...formData,
                                            district_code: district ? String(district.code) : '',
                                            district_name: value,
                                            ward_code: '',
                                            ward_name: '',
                                        };
                                        setFormData(updatedFormData);
                                        form.setFieldsValue(updatedFormData);
                                    }}
                                    size="large"
                                    showSearch
                                    filterOption={filterOption}
                                    notFoundContent={loadingDistricts ? <Spin size="small" /> : null}
                                >
                                    {districts.map((d) => (
                                        <Option key={d.code} value={d.name}>
                                            {d.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Phường/Xã"
                                name="ward_name"
                                rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
                            >
                                <Select
                                    placeholder="Chọn phường/xã"
                                    loading={loadingWards}
                                    disabled={!formData.district_code}
                                    onChange={(value, option) => {
                                        const ward = wards.find((w) => w.name === value);
                                        const updatedFormData = {
                                            ...formData,
                                            ward_code: ward ? String(ward.code) : '',
                                            ward_name: value,
                                        };
                                        setFormData(updatedFormData);
                                        form.setFieldsValue(updatedFormData);
                                    }}
                                    size="large"
                                    showSearch
                                    filterOption={filterOption}
                                    notFoundContent={loadingWards ? <Spin size="small" /> : null}
                                >
                                    {wards.map((w) => (
                                        <Option key={w.code} value={w.name}>
                                            {w.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Ghi chú giao hàng (tùy chọn)" name="delivery_notes">
                                <Input.TextArea
                                    size="large"
                                    placeholder="Ví dụ: Gọi trước khi giao hàng, Nhà có chó"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="isDefault" valuePropName="checked">
                        <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" danger>
                            Hoàn thành
                        </Button>
                        <Button
                            style={{ marginLeft: 8 }}
                            onClick={() => {
                                setShowAddAddressForm(false);
                                setShowUpdateAddressForm(false);
                                setEditingAddress(null);
                                resetFormData();
                            }}
                        >
                            Trở Lại
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserAddress;