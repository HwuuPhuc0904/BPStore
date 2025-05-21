import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, Row, Col, Alert, Spin, Checkbox, Modal } from 'antd';
import 'antd/dist/reset.css';
import config from '../../../config';
import ChangeUserInformation from '../UserInformation/ChangeUserInformation';

const { Option } = Select;

const UserProfile = () => {
  const [activeView, setActiveView] = useState('information');
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const API_URL = config.apiUrl + '/api/v1/users/profile';

  const Sidebar = ({ setActiveView }) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
      const fetchUserInfo = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
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
            if (data && data.user) setUserInfo(data.user);
          }
        } catch (err) {
          console.error('Lỗi tải thông tin người dùng:', err);
        }
      };
      fetchUserInfo();
    }, []);

    return (
        <div className="w-64 bg-white h-screen p-6 shadow-md">
          <div className="flex items-center mb-8">
            <img
                src={'https://via.placeholder.com/48'}
                alt="Avatar"
                className="w-12 h-12 rounded-full mr-3 object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{userInfo?.Name || 'Thông tin người dùng'}</h2>
            </div>
          </div>
          <nav>
            <ul>
              <li className="mb-4">
                <button
                    onClick={() => setActiveView('information')}
                    className="flex items-center text-gray-700 hover:text-blue-500"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Hồ sơ
                </button>
              </li>
              <li className="mb-4">
                <button
                    onClick={() => setActiveView('address')}
                    className="flex items-center text-gray-700 hover:text-blue-500"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Địa chỉ
                </button>
              </li>
              <li className="mb-4">
                <button
                    onClick={() => setActiveView('changePassword')}
                    className="flex items-center text-gray-700 hover:text-blue-500"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Đổi mật khẩu
                </button>
              </li>
            </ul>
          </nav>
        </div>
    );
  };

  const UserInformation = ({ setActiveView }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
      const fetchUserInformation = async () => {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
          setLoading(false);
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

          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              throw new Error('Không được phép hoặc bị cấm. Vui lòng kiểm tra trạng thái đăng nhập.');
            }
            throw new Error(`Tải thông tin người dùng thất bại (Mã trạng thái: ${response.status})`);
          }

          const data = await response.json();
          if (data && data.user) {
            setUserInfo(data.user);
          } else {
            throw new Error('Không tìm thấy dữ liệu người dùng.');
          }
        } catch (e) {
          setError(e.message || 'Tải dữ liệu người dùng thất bại.');
        } finally {
          setLoading(false);
        }
      };
      fetchUserInformation();
    }, []);

    if (loading) {
      return (
          <div className="flex justify-center items-center h-64">
            <Spin tip="Đang tải thông tin người dùng..." />
          </div>
      );
    }

    if (error) {
      return (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Lỗi:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
      );
    }

    if (!userInfo) {
      return (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
            <p>Không thể tải thông tin người dùng.</p>
          </div>
      );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Thông tin người dùng</h1>
          <div className="flex items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">{userInfo.Name || 'N/A'}</h2>
              <p className="text-gray-600">{userInfo.Email || 'N/A'}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Giới tính</label>
              <p className="text-gray-900 text-base">
                {userInfo.Gender === 'male' ? 'Nam' :
                    userInfo.Gender === 'female' ? 'Nữ' :
                        userInfo.Gender === 'other' ? 'Khác' :
                            'Không cung cấp'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Ngày sinh</label>
              <p className="text-gray-900 text-base">{userInfo.Birthday || 'Không cung cấp'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Ngôn ngữ</label>
              <p className="text-gray-900 text-base">{userInfo.Language || 'Chưa thiết lập'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Quốc gia</label>
              <p className="text-gray-900 text-base">{userInfo.Country || 'Chưa thiết lập'}</p>
            </div>
          </div>
          <Button
              type="primary"
              onClick={() => setActiveView('changeInformation')}
              block
              size="large"
              style={{marginTop: 32}}
          >
            Chỉnh sửa thông tin
          </Button>
        </div>
    );
  };

  const UserAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [formData, setFormData] = useState({
      recipient_name: '',
      phone: '',
      alternate_phone: '',
      street_address: '',
      province: '',
      district: '',
      ward: '',
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

    const ADDRESS_API_URL = config.apiUrl + '/api/v1/users/addresses';

    useEffect(() => {
      const fetchProvinces = async () => {
        setLoadingProvinces(true);
        try {
          const response = await fetch('https://provinces.open-api.vn/api/p/');
          if (!response.ok) throw new Error('Không thể tải danh sách tỉnh/thành phố.');
          const data = await response.json();
          setProvinces(data);
        } catch (err) {
          setError(err.message || 'Lỗi khi tải danh sách tỉnh/thành phố.');
        } finally {
          setLoadingProvinces(false);
        }
      };
      fetchProvinces();
    }, []);

    useEffect(() => {
      if (!formData.province) {
        setDistricts([]);
        setWards([]);
        setFormData((prev) => ({ ...prev, district: '', ward: '' }));
        return;
      }

      const fetchDistricts = async () => {
        setLoadingDistricts(true);
        try {
          const response = await fetch(`https://provinces.open-api.vn/api/p/${formData.province}?depth=2`);
          if (!response.ok) throw new Error('Không thể tải danh sách quận/huyện.');
          const data = await response.json();
          setDistricts(data.districts || []);
          setWards([]);
          setFormData((prev) => ({ ...prev, district: '', ward: '' }));
        } catch (err) {
          setError(err.message || 'Lỗi khi tải danh sách quận/huyện.');
        } finally {
          setLoadingDistricts(false);
        }
      };
      fetchDistricts();
    }, [formData.province]);

    useEffect(() => {
      if (!formData.district) {
        setWards([]);
        setFormData((prev) => ({ ...prev, ward: '' }));
        return;
      }

      const fetchWards = async () => {
        setLoadingWards(true);
        try {
          const response = await fetch(`https://provinces.open-api.vn/api/d/${formData.district}?depth=2`);
          if (!response.ok) throw new Error('Không thể tải danh sách phường/xã.');
          const data = await response.json();
          setWards(data.wards || []);
          setFormData((prev) => ({ ...prev, ward: '' }));
        } catch (err) {
          setError(err.message || 'Lỗi khi tải danh sách phường/xã.');
        } finally {
          setLoadingWards(false);
        }
      };
      fetchWards();
    }, [formData.district]);

    useEffect(() => {
      const fetchUserAddresses = async () => {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
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

          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              throw new Error('Không được phép hoặc bị cấm. Vui lòng kiểm tra trạng thái đăng nhập.');
            }
            throw new Error(`Tải danh sách địa chỉ thất bại (Mã trạng thái: ${response.status})`);
          }

          const data = await response.json();
          setAddresses(data || []);
        } catch (e) {
          setError(e.message || 'Tải danh sách địa chỉ thất bại.');
          setAddresses([]);
        } finally {
          setLoading(false);
        }
      };
      fetchUserAddresses();
    }, []);

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.recipient_name || !formData.phone || !formData.street_address || !formData.province || !formData.district || !formData.ward) {
        setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
        return;
      }

      const newAddress = {
        address_type: formData.address_type,
        is_default: formData.isDefault,
        recipient_name: formData.recipient_name,
        phone: formData.phone,
        alternate_phone: formData.alternate_phone || null,
        street_address: formData.street_address,
        ward_code: formData.ward,
        district_code: formData.district,
        province_code: formData.province,
        country: formData.country || 'Việt Nam',
        delivery_notes: formData.delivery_notes || null,
      };

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
        return;
      }

      try {
        const response = await fetch(ADDRESS_API_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify(newAddress),
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error('Không được phép hoặc bị cấm. Vui lòng kiểm tra trạng thái đăng nhập.');
          }
          throw new Error(`Thêm địa chỉ thất bại (Mã: ${response.status})`);
        }

        const data = await response.json();
        setAddresses((prev) => {
          if (formData.isDefault) {
            return prev.map((addr) => ({ ...addr, is_default: false })).concat(data);
          }
          return [...prev, data];
        });

        setFormData({
          recipient_name: '',
          phone: '',
          alternate_phone: '',
          street_address: '',
          province: '',
          district: '',
          ward: '',
          delivery_notes: '',
          isDefault: false,
          address_type: 'shipping',
        });
        setShowAddAddressForm(false);
        setError('');
      } catch (err) {
        setError(err.message || 'Thêm địa chỉ thất bại.');
      }
    };

    const handleUpdateAddress = async (index) => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
        return;
      }

      const addressToUpdate = addresses[index];
      try {
        const response = await fetch(`${ADDRESS_API_URL}/${addressToUpdate.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify(addressToUpdate),
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error('Không được phép hoặc bị cấm. Vui lòng kiểm tra trạng thái đăng nhập.');
          }
          throw new Error(`Cập nhật địa chỉ thất bại (Mã: ${response.status})`);
        }

        const updatedAddress = await response.json();
        setAddresses((prev) =>
            prev.map((addr, i) => (i === index ? updatedAddress : addr))
        );
      } catch (err) {
        setError(err.message || 'Cập nhật địa chỉ thất bại.');
      }
    };

    const handleSetDefault = async (index) => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
        return;
      }

      const updatedAddresses = addresses.map((addr, i) => ({
        ...addr,
        is_default: i === index,
      }));

      try {
        const response = await fetch(ADDRESS_API_URL, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify(updatedAddresses),
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error('Không được phép hoặc bị cấm. Vui lòng kiểm tra trạng thái đăng nhập.');
          }
          throw new Error(`Cập nhật địa chỉ mặc định thất bại (Mã: ${response.status})`);
        }

        setAddresses(updatedAddresses);
      } catch (err) {
        setError(err.message || 'Cập nhật địa chỉ mặc định thất bại.');
      }
    };

    const filterOption = (input, option) => {
      return option.children.toLowerCase().includes(input.toLowerCase());
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
                onClick={() => setShowAddAddressForm(true)}
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
              addresses.map((addr, index) => (
                  <div key={index} className="border p-4 mb-4 rounded-lg relative">
                    <h3 className="font-semibold">Tên: {addr.recipient_name || 'Chưa cập nhật'}</h3>
                    <p>SĐT: {addr.phone || 'Chưa cập nhật'}</p>
                    <p>Địa chỉ chi tiết: {addr.street_address || 'Chưa cập nhật'}</p>
                    <p>Địa chỉ: {`${addr.street_address || ''}, ${addr.ward_name || ''}, ${addr.district_name || ''}, ${addr.province_name || ''}` || 'Chưa cập nhật'}</p>
                    {addr.delivery_notes && <p>Ghi chú giao hàng: {addr.delivery_notes}</p>}
                    {addr.is_default && <span className="text-red-500">Mặc định</span>}
                    <div className="mt-2 flex gap-2">
                      <Button
                          type="link"
                          onClick={() => handleUpdateAddress(index)}
                          style={{ padding: 0 }}
                      >
                        Cập nhật
                      </Button>
                      <Button
                          type="link"
                          onClick={() => handleSetDefault(index)}
                          style={{ padding: 0 }}
                          disabled={addr.is_default}
                      >
                        Thiết lập mặc định
                      </Button>
                    </div>
                  </div>
              ))
          )}

          <Modal
              title="Thêm địa chỉ mới"
              open={showAddAddressForm}
              onCancel={() => setShowAddAddressForm(false)}
              footer={null}
              width={500}
          >
            {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}
            <Form onFinish={handleSubmit}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item label="Tên người nhận">
                    <Input
                        name="recipient_name"
                        value={formData.recipient_name}
                        onChange={handleChange}
                        size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Số điện thoại">
                    <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Số điện thoại phụ (tùy chọn)">
                    <Input
                        name="alternate_phone"
                        value={formData.alternate_phone}
                        onChange={handleChange}
                        size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Địa chỉ chi tiết">
                    <Input
                        name="street_address"
                        value={formData.street_address}
                        onChange={handleChange}
                        size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Tỉnh/Thành phố">
                    <Select
                        placeholder="Chọn tỉnh/thành phố"
                        loading={loadingProvinces}
                        value={formData.province}
                        onChange={(value) => setFormData((prev) => ({ ...prev, province: value }))}
                        size="large"
                        showSearch
                        filterOption={filterOption}
                        notFoundContent={loadingProvinces ? <Spin size="small" /> : null}
                    >
                      {provinces.map((p) => (
                          <Option key={p.code} value={p.code}>
                            {p.name}
                          </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Quận/Huyện">
                    <Select
                        placeholder="Chọn quận/huyện"
                        loading={loadingDistricts}
                        disabled={!formData.province}
                        value={formData.district}
                        onChange={(value) => setFormData((prev) => ({ ...prev, district: value }))}
                        size="large"
                        showSearch
                        filterOption={filterOption}
                        notFoundContent={loadingDistricts ? <Spin size="small" /> : null}
                    >
                      {districts.map((d) => (
                          <Option key={d.code} value={d.code}>
                            {d.name}
                          </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Phường/Xã">
                    <Select
                        placeholder="Chọn phường/xã"
                        loading={loadingWards}
                        disabled={!formData.district}
                        value={formData.ward}
                        onChange={(value) => setFormData((prev) => ({ ...prev, ward: value }))}
                        size="large"
                        showSearch
                        filterOption={filterOption}
                        notFoundContent={loadingWards ? <Spin size="small" /> : null}
                    >
                      {wards.map((w) => (
                          <Option key={w.code} value={w.code}>
                            {w.name}
                          </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Ghi chú giao hàng (tùy chọn)">
                    <Input.TextArea
                        name="delivery_notes"
                        value={formData.delivery_notes}
                        onChange={handleChange}
                        size="large"
                        placeholder="Ví dụ: Gọi trước khi giao hàng, Nhà có chó"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Checkbox
                    checked={formData.isDefault}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isDefault: e.target.checked }))}
                >
                  Đặt làm địa chỉ mặc định
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" danger>
                  Hoàn thành
                </Button>
                <Button
                    style={{ marginLeft: 8 }}
                    onClick={() => setShowAddAddressForm(false)}
                >
                  Trở Lại
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
    );
  };

  const ChangePassword = () => {
    const [formData, setFormData] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      setLoading(true);

      if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
        setError('Vui lòng điền đầy đủ tất cả các trường.');
        setLoading(false);
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
        setLoading(false);
        return;
      }

      if (formData.newPassword.length < 4 || formData.newPassword.length > 32) {
        setError('Mật khẩu mới phải có độ dài từ 4 đến 32 ký tự.');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
        setLoading(false);
        return;
      }

      const payload = {
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
      };

      try {
        const response = await fetch(config.apiUrl + '/api/v1/users/change-password', {
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
          throw new Error(errorData.message || `Đổi mật khẩu thất bại (Mã: ${response.status})`);
        }

        setSuccess('Đổi mật khẩu thành công.');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } catch (err) {
        setError(err.message || 'Đổi mật khẩu thất bại.');
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className="flex-1 p-6">
          <Card title="Đổi mật khẩu" bordered={false} style={{ maxWidth: 768, margin: '0 auto', minHeight: '600px' }}>
            {error && (
                <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />
            )}
            {success && (
                <Alert type="success" message={success} showIcon style={{ marginBottom: 16 }} />
            )}

            <Form component="form" layout="vertical" onSubmitCapture={handleSubmit}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="Mật khẩu hiện tại" required>
                    <Input.Password
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu hiện tại"
                        size="large"
                    />
                  </Form.Item>

                  <Form.Item label="Mật khẩu mới" required>
                    <Input.Password
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="(4–32 ký tự)"
                        size="large"
                    />
                  </Form.Item>

                  <Form.Item label="Xác nhận mật khẩu" required>
                    <Input.Password
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Xác nhận mật khẩu mới"
                        size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    disabled={loading}
                    size="large"
                >
                  {loading ? <Spin size="small" /> : 'Lưu thay đổi'}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
    );
  };

  return (
      <div className="flex w-full min-h-screen bg-gray-100">
        <Sidebar setActiveView={setActiveView} />
        <div className="flex-1 p-6 overflow-y-auto">
          {activeView === 'information' && <UserInformation setActiveView={setActiveView} />}
          {activeView === 'changeInformation' && <ChangeUserInformation API_URL={API_URL} setActiveView={setActiveView} />}
          {activeView === 'address' && <UserAddress />}
          {activeView === 'changePassword' && <ChangePassword />}
        </div>
      </div>
  );
};

export default UserProfile;