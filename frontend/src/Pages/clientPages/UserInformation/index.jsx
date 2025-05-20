import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Switch, Button, Row, Col, Alert, Spin } from 'antd';
import 'antd/dist/reset.css';
import config from '../../../config';

const UserProfile = () => {
  const [activeView, setActiveView] = useState('information');
  const API_URL = config.apiUrl + "/api/v1/users/profile";

  const Sidebar = ({ setActiveView }) => {
    return (
        <div className="w-64 bg-white h-screen p-6 shadow-md">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
            <div>
              <h2 className="text-lg font-semibold">Thông tin người dùng</h2>
            </div>
          </div>
          <nav>
            <ul>
              <li className="mb-4">
                <button onClick={() => setActiveView("information")} className="flex items-center text-gray-700 hover:text-blue-500">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Thông tin
                </button>
              </li>
              <li className="mb-4">
                <button onClick={() => setActiveView("changeInformation")} className="flex items-center text-gray-700 hover:text-blue-500">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4z" />
                  </svg>
                  Thay đổi thông tin
                </button>
              </li>
              <li className="mb-4">
                <button href="#" className="flex items-center text-gray-700 hover:text-blue-500">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  Giỏ hàng
                </button>
              </li>
            </ul>
          </nav>
        </div>
    );
  };

  const { Option } = Select;

  const ChangeUserInformation = () => {
    const [formData, setFormData] = useState({
      username: 'Triệu Lam Mỹ Thott',
      email: 'mynhanngu@gmail.com',
      gender: 'female',
      birthdayMonth: '',
      birthdayDay: '',
      birthdayYear: '',
      language: '',
      country: 'Việt Nam',
      province: '',
      district: '',
      ward: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      emailNotifications: false,
      privateAccount: false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingWards, setLoadingWards] = useState(false);

    const API_URL = config.apiUrl + '/api/v1/users/profile';

    // Lấy danh sách tỉnh/thành phố khi component mount
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

    // Lấy quận/huyện khi người dùng chọn tỉnh
    useEffect(() => {
      if (!formData.province) {
        setDistricts([]);
        setWards([]);
        setFormData(prev => ({ ...prev, district: '', ward: '' }));
        return;
      }

      const fetchDistricts = async () => {
        setLoadingDistricts(true);
        try {
          const response = await fetch(
              `https://provinces.open-api.vn/api/p/${formData.province}?depth=2`
          );
          if (!response.ok) throw new Error('Không thể tải danh sách quận/huyện.');
          const data = await response.json();
          setDistricts(data.districts || []);
          setWards([]);
          setFormData(prev => ({ ...prev, district: '', ward: '' }));
        } catch (err) {
          setError(err.message || 'Lỗi khi tải danh sách quận/huyện.');
        } finally {
          setLoadingDistricts(false);
        }
      };
      fetchDistricts();
    }, [formData.province]);

    // Lấy phường/xã khi người dùng chọn quận
    useEffect(() => {
      if (!formData.district) {
        setWards([]);
        setFormData(prev => ({ ...prev, ward: '' }));
        return;
      }

      const fetchWards = async () => {
        setLoadingWards(true);
        try {
          const response = await fetch(
              `https://provinces.open-api.vn/api/d/${formData.district}?depth=2`
          );
          if (!response.ok) throw new Error('Không thể tải danh sách phường/xã.');
          const data = await response.json();
          setWards(data.wards || []);
          setFormData(prev => ({ ...prev, ward: '' }));
        } catch (err) {
          setError(err.message || 'Lỗi khi tải danh sách phường/xã.');
        } finally {
          setLoadingWards(false);
        }
      };
      fetchWards();
    }, [formData.district]);

    // Xử lý thay đổi giá trị input
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');

      if (formData.newPassword !== formData.confirmPassword) {
        setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
        return;
      }

      const payload = {
        name: formData.username,
        email: formData.email,
        gender: formData.gender,
        birthday: formData.birthdayYear
            ? `${formData.birthdayYear}-${formData.birthdayMonth.toString().padStart(2, '0')}-${formData.birthdayDay.toString().padStart(2, '0')}`
            : null,
        language: formData.language,
        country: formData.country,
        province: formData.province
            ? provinces.find(p => p.code === parseInt(formData.province))?.name || ''
            : '',
        district: formData.district
            ? districts.find(d => d.code === parseInt(formData.district))?.name || ''
            : '',
        ward: formData.ward
            ? wards.find(w => w.code === parseInt(formData.ward))?.name || ''
            : '',
        email_notifications: formData.emailNotifications,
        private_account: formData.privateAccount,
        current_password: formData.currentPassword || undefined,
        new_password: formData.newPassword || undefined,
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
          throw new Error(`Cập nhật thông tin người dùng thất bại (Mã: ${response.status})`);
        }

        setSuccess('Cập nhật thông tin người dùng thành công.');
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
      } catch (err) {
        setError(err.message || 'Cập nhật thông tin người dùng thất bại.');
      }
    };

    // Hàm lọc tùy chọn cho tìm kiếm
    const filterOption = (input, option) => {
      return option.children.toLowerCase().includes(input.toLowerCase());
    };

    return (
        <div className="flex-1 p-6">
          <Card
              title="Hồ sơ người dùng"
              bordered={false}
              style={{ maxWidth: 768, margin: '0 auto', minHeight: '600px' }}
          >
            {error && (
                <Alert
                    type="error"
                    message={error}
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}
            {success && (
                <Alert
                    type="success"
                    message={success}
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}

            <Form component="form" layout="vertical" onSubmitCapture={handleSubmit}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="Tên người dùng" required>
                    <Input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        size="large"
                    />
                  </Form.Item>

                  <Form.Item label="Email" required>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        size="large"
                    />
                  </Form.Item>

                  <Form.Item label="Giới tính">
                    <Select
                        value={formData.gender}
                        placeholder="Chọn giới tính"
                        onChange={value =>
                            setFormData(prev => ({ ...prev, gender: value }))
                        }
                        size="large"
                        allowClear
                    >
                      <Option value="male">Nam</Option>
                      <Option value="female">Nữ</Option>
                      <Option value="other">Khác</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Ngày sinh">
                    <Row gutter={8}>
                      <Col span={8}>
                        <Select
                            placeholder="Tháng"
                            value={formData.birthdayMonth}
                            onChange={value =>
                                setFormData(prev => ({
                                  ...prev,
                                  birthdayMonth: value,
                                }))
                            }
                            size="large"
                            allowClear
                        >
                          {Array.from({ length: 12 }, (_, i) => (
                              <Option key={i + 1} value={`${i + 1}`}>
                                {new Date(0, i).toLocaleString('vi-VN', {
                                  month: 'long',
                                })}
                              </Option>
                          ))}
                        </Select>
                      </Col>
                      <Col span={8}>
                        <Select
                            placeholder="Ngày"
                            value={formData.birthdayDay}
                            onChange={value =>
                                setFormData(prev => ({
                                  ...prev,
                                  birthdayDay: value,
                                }))
                            }
                            size="large"
                            allowClear
                        >
                          {Array.from({ length: 31 }, (_, i) => (
                              <Option key={i + 1} value={`${i + 1}`}>
                                {i + 1}
                              </Option>
                          ))}
                        </Select>
                      </Col>
                      <Col span={8}>
                        <Select
                            placeholder="Năm"
                            value={formData.birthdayYear}
                            onChange={value =>
                                setFormData(prev => ({
                                  ...prev,
                                  birthdayYear: value,
                                }))
                            }
                            size="large"
                            allowClear
                        >
                          {Array.from({ length: 100 }, (_, i) => {
                            const year = 2025 - i;
                            return (
                                <Option key={year} value={`${year}`}>
                                  {year}
                                </Option>
                            );
                          })}
                        </Select>
                      </Col>
                    </Row>
                  </Form.Item>

                  <Form.Item label="Ngôn ngữ">
                    <Select
                        placeholder="Chọn ngôn ngữ"
                        value={formData.language}
                        onChange={value =>
                            setFormData(prev => ({ ...prev, language: value }))
                        }
                        size="large"
                        allowClear
                    >
                      <Option value="English">Tiếng Anh</Option>
                      <Option value="Spanish">Tiếng Tây Ban Nha</Option>
                      <Option value="French">Tiếng Pháp</Option>
                      <Option value="Vietnamese">Tiếng Việt</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Tỉnh/Thành phố">
                    <Select
                        placeholder="Chọn hoặc tìm tỉnh"
                        loading={loadingProvinces}
                        value={formData.province}
                        onChange={value => setFormData(prev => ({ ...prev, province: value }))}
                        size="large"
                        allowClear
                        showSearch
                        filterOption={filterOption}
                        notFoundContent={loadingProvinces ? <Spin size="small" /> : null}
                    >
                      {provinces.map(p => (
                          <Option key={p.code} value={p.code}>
                            {p.name}
                          </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Quận/Huyện">
                    <Select
                        placeholder="Chọn hoặc tìm quận"
                        loading={loadingDistricts}
                        disabled={!formData.province}
                        value={formData.district}
                        onChange={value => setFormData(prev => ({ ...prev, district: value }))}
                        size="large"
                        allowClear
                        showSearch
                        filterOption={filterOption}
                        notFoundContent={loadingDistricts ? <Spin size="small" /> : null}
                    >
                      {districts.map(d => (
                          <Option key={d.code} value={d.code}>
                            {d.name}
                          </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Phường/Xã">
                    <Select
                        placeholder="Chọn hoặc tìm phường"
                        loading={loadingWards}
                        disabled={!formData.district}
                        value={formData.ward}
                        onChange={value => setFormData(prev => ({ ...prev, ward: value }))}
                        size="large"
                        allowClear
                        showSearch
                        filterOption={filterOption}
                        notFoundContent={loadingWards ? <Spin size="small" /> : null}
                    >
                      {wards.map(w => (
                          <Option key={w.code} value={w.code}>
                            {w.name}
                          </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Mật khẩu hiện tại">
                    <Input.Password
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu hiện tại"
                        size="large"
                    />
                  </Form.Item>

                  <Form.Item label="Mật khẩu mới">
                    <Input.Password
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="(4–32 ký tự)"
                        size="large"
                    />
                  </Form.Item>

                  <Form.Item label="Xác nhận mật khẩu">
                    <Input.Password
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Xác nhận mật khẩu mới"
                        size="large"
                    />
                  </Form.Item>

                  <Form.Item
                      label="Thông báo email"
                      valuePropName="checked"
                      style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Switch
                        checked={formData.emailNotifications}
                        onChange={checked =>
                            setFormData(prev => ({ ...prev, emailNotifications: checked }))
                        }
                    />
                  </Form.Item>

                  <Form.Item
                      label="Tài khoản riêng tư"
                      valuePropName="checked"
                      style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Switch
                        checked={formData.privateAccount}
                        onChange={checked =>
                            setFormData(prev => ({ ...prev, privateAccount: checked }))
                        }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    disabled={loadingProvinces || loadingDistricts || loadingWards}
                    size="large"
                >
                  Lưu thay đổi
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
    );
  };

  // User Information
  const UserInformation = ({ setActiveView }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
      const fetchUserInformation = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Không tìm thấy token xác thực. Vui lòng đăng nhập.");
          setLoading(false);
          setUserInfo(null);
          return;
        }
        try {
          const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            },
          });

          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              throw new Error('Không được phép hoặc bị cấm. Vui lòng kiểm tra trạng thái đăng nhập.');
            }
            throw new Error(`Tải thông tin người dùng thất bại (Mã trạng thái: ${response.status})`);
          }

          const data = await response.json();
          console.log("API Response data.user:", data.user);

          if (data && data.user) {
            setUserInfo(data.user);
          } else {
            throw new Error("Không tìm thấy dữ liệu người dùng trong cấu trúc phản hồi API.");
          }
        } catch (e) {
          console.error("Tải thông tin người dùng thất bại:", e);
          setError(e.message || "Tải dữ liệu người dùng thất bại.");
          setUserInfo(null);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Tên</label>
              <p className="text-gray-900 text-base">{userInfo.Name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <p className="text-gray-900 text-base">{userInfo.Email || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Giới tính</label>
              <p className="text-gray-900 text-base">{userInfo.Gender || 'Không cung cấp'}</p>
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
            <div className="md:col-span-2 mt-4 border-t pt-4">
              <label className="block text-sm font-medium text-gray-500 mb-2">Cài đặt</label>
              <div className="flex items-center justify-between mb-2 p-3 border rounded-md bg-gray-50">
                <span className="text-gray-700">Thông báo email</span>
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${userInfo.email_notifications ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {userInfo.email_notifications ? 'Bật' : 'Tắt'}
              </span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                <span className="text-gray-700">Tài khoản riêng tư</span>
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${userInfo.private_account ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                {userInfo.private_account ? 'Bật' : 'Tắt'}
              </span>
              </div>
            </div>
          </div>
          <Button
              type="primary"
              onClick={() => setActiveView('changeInformation')}
              block
              size="large"
              style={{ marginTop: 32 }}
          >
            Chỉnh sửa thông tin
          </Button>
        </div>
    );
  };

  return (
      <div className="flex w-full min-h-screen bg-gray-100">
        <Sidebar setActiveView={setActiveView} />
        <div className="flex-1 p-6 overflow-y-auto">
          {activeView === 'information' && <UserInformation setActiveView={setActiveView} />}
          {activeView === 'changeInformation' && <ChangeUserInformation />}
        </div>
      </div>
  );
};

export default UserProfile;