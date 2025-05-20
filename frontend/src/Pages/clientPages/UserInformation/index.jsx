import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Switch, Button, Row, Col, Alert, Spin, Checkbox, Modal, Upload, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import config from '../../../config';
import axios from 'axios';
import moment from 'moment'; 

const { Option } = Select;

const UserProfile = () => {
  const [activeView, setActiveView] = useState('information');
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const API_URL = config.apiUrl + "/api/v1/users/profile";
  const IMG_BB_API_KEY = '25d25c1c0ab2bf795c35b58ecaa1b96f';

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
            src={userInfo?.avatar || 'https://via.placeholder.com/48'}
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

  const ChangeUserInformation = () => {
    const [formData, setFormData] = useState({
      username: 'Triệu Lam Mỹ Thott',
      email: 'mynhanngu@gmail.com',
      gender: 'female',
      birthday: moment('1990-01-01', 'YYYY-MM-DD'), // Khởi tạo với giá trị mặc định
      language: '',
      country: 'Việt Nam',
      emailNotifications: false,
      privateAccount: false,
      avatar: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

    const handleDateChange = (date, dateString) => {
      setFormData((prev) => ({
        ...prev,
        birthday: date ? moment(date, 'YYYY-MM-DD') : null,
      }));
    };

    const handleAvatarUpload = ({ file }) => {
      if (file && file instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          setAvatarPreview(reader.result);
          setAvatarFile(file);
          setFormData((prev) => ({ ...prev, avatar: reader.result }));
        };
        reader.readAsDataURL(file);
      } else {
        setError('File không hợp lệ. Vui lòng chọn một ảnh.');
      }
    };

    const uploadImageToImgBB = async (imageFile) => {
      const formData = new FormData();
      formData.append('image', imageFile);
      try {
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`, formData);
    return response.data.data.url;
} catch (err) {
  console.error('Lỗi tải ảnh lên ImgBB:', err);
  setError('Không thể tải ảnh lên. Vui lòng thử lại.');
  return null;
}
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  const token = localStorage.getItem('token');
  if (!token) {
    setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
    return;
  }

  let finalAvatarUrl = formData.avatar;
  if (avatarFile) {
    finalAvatarUrl = await uploadImageToImgBB(avatarFile);
    if (!finalAvatarUrl) return;
  }

  const payload = {
    name: formData.username,
    email: formData.email,
    gender: formData.gender,
    birthday: formData.birthday ? formData.birthday.format('YYYY-MM-DD') : null,
    language: formData.language,
    country: formData.country,
    email_notifications: formData.emailNotifications,
    private_account: formData.privateAccount,
    avatar: finalAvatarUrl || null,
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
    setFormData({
      username: '',
      email: '',
      gender: '',
      birthday: null,
      language: '',
      country: '',
      emailNotifications: false,
      privateAccount: false,
      avatar: '',
    });
    setAvatarFile(null);
    setAvatarPreview('');
    setTimeout(() => setActiveView('information'), 1000);
  } catch (err) {
    setError(err.message || 'Cập nhật thông tin người dùng thất bại.');
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
          <Form.Item label="Ảnh đại diện">
            <Upload
                beforeUpload={() => false}
                onChange={handleAvatarUpload}
                showUploadList={false}
            >
              <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
            </Upload>
            {avatarPreview ? (
                <img
                    src={avatarPreview}
                    alt="Avatar"
                    style={{ width: 100, height: 100, borderRadius: '50%', marginTop: 8, objectFit: 'cover' }}
                />
            ) : (
                <p style={{ marginTop: 8, color: '#888' }}>Chưa chọn ảnh</p>
            )}
          </Form.Item>

          <Form.Item label="Tên người dùng" required>
            <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                size="middle"
                style={{ borderRadius: 6 }}
            />
          </Form.Item>

          <Form.Item label="Email" required>
            <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                size="middle"
                style={{ borderRadius: 6 }}
            />
          </Form.Item>

          <Form.Item label="Giới tính">
            <Select
                value={formData.gender}
                placeholder="Chọn giới tính"
                onChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
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
                value={formData.birthday}
                onChange={handleDateChange}
                format="YYYY-MM-DD"
                placeholder="Chọn ngày sinh"
                size="middle"
                style={{ width: '100%', borderRadius: 6 }}
            />
          </Form.Item>

          <Form.Item label="Ngôn ngữ">
            <Select
                placeholder="Chọn ngôn ngữ"
                value={formData.language}
                onChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
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
                name="country"
                value={formData.country}
                onChange={handleChange}
                size="middle"
                style={{ borderRadius: 6 }}
            />
          </Form.Item>

          <Form.Item label="Thông báo email" valuePropName="checked">
            <Switch
                checked={formData.emailNotifications}
                onChange={(checked) => setFormData((prev) => ({ ...prev, emailNotifications: checked }))}
            />
          </Form.Item>

          <Form.Item label="Tài khoản riêng tư" valuePropName="checked">
            <Switch
                checked={formData.privateAccount}
                onChange={(checked) => setFormData((prev) => ({ ...prev, privateAccount: checked }))}
            />
          </Form.Item>

          <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                block
                size="middle"
                style={{ borderRadius: 6, marginTop: 12 }}
            >
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Card>
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
        setUserInfo(null);
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
          throw new Error('Không tìm thấy dữ liệu người dùng trong cấu trúc phản hồi API.');
        }
      } catch (e) {
        setError(e.message || 'Tải dữ liệu người dùng thất bại.');
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
        <div className="flex items-center mb-6">
          <img
              src={userInfo.avatar || 'https://via.placeholder.com/80'}
              alt="Avatar"
              className="w-20 h-20 rounded-full mr-4 object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{userInfo.Name || 'N/A'}</h2>
            <p className="text-gray-600">{userInfo.Email || 'N/A'}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
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
              <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      userInfo.email_notifications ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
              >
                {userInfo.email_notifications ? 'Bật' : 'Tắt'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
              <span className="text-gray-700">Tài khoản riêng tư</span>
              <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      userInfo.private_account ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}
              >
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

const UserAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    addressDetail: '',
    type: 'Nhà Riêng',
    isDefault: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

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
          throw new Error(`Tải danh sách địa chỉ thất bại (Mã trạng thái: ${response.status})`);
        }

        const data = await response.json();
        if (data && data.user && data.user.addresses) {
          setAddresses(data.user.addresses);
        } else {
          setAddresses([]);
        }
      } catch (e) {
        setError(e.message || 'Tải danh sách địa chỉ thất bại.');
        setAddresses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAddresses();
  }, []);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.province || !formData.district || !formData.ward || !formData.addressDetail) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const fullAddress = `${formData.addressDetail}, ${wards.find((w) => w.code === parseInt(formData.ward))?.name || ''}, ${
        districts.find((d) => d.code === parseInt(formData.district))?.name || ''
    }, ${provinces.find((p) => p.code === parseInt(formData.province))?.name || ''}`;

    const newAddress = {
      name: formData.name,
      phone: formData.phone,
      address: fullAddress,
      isDefault: formData.isDefault,
      type: formData.type,
    };

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ addresses: [...addresses, newAddress] }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Không được phép hoặc bị cấm. Vui lòng kiểm tra trạng thái đăng nhập.');
        }
        throw new Error(`Thêm địa chỉ thất bại (Mã: ${response.status})`);
      }

      setAddresses((prev) => {
        if (formData.isDefault) {
          return prev.map((addr) => ({ ...addr, isDefault: false })).concat(newAddress);
        }
        return [...prev, newAddress];
      });

      setFormData({
        name: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        addressDetail: '',
        type: 'Nhà Riêng',
        isDefault: false,
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

    try {
      const updatedAddresses = [...addresses];
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ addresses: updatedAddresses }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Không được phép hoặc bị cấm. Vui lòng kiểm tra trạng thái đăng nhập.');
        }
        throw new Error(`Cập nhật địa chỉ thất bại (Mã: ${response.status})`);
      }

      setAddresses(updatedAddresses);
    } catch (err) {
      setError(err.message || 'Cập nhật địa chỉ thất bại.');
    }
  };

  const handleSetDefault = async (index) => {
    const updatedAddresses = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ addresses: updatedAddresses }),
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
                  <h3 className="font-semibold">{addr.name}</h3>
                  <p>{addr.phone}</p>
                  <p>{addr.address}</p>
                  {addr.isDefault && <span className="text-red-500">Mặc định</span>}
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
                        disabled={addr.isDefault}
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
                <Form.Item label="Họ và tên">
                  <Input
                      name="name"
                      value={formData.name}
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
                <Form.Item label="Địa chỉ cụ thể">
                  <Input
                      name="addressDetail"
                      value={formData.addressDetail}
                      onChange={handleChange}
                      size="large"
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="mb-4">
              <label>Loại địa chỉ: </label>
              <Button
                  type={formData.type === 'Nhà Riêng' ? 'primary' : 'default'}
                  onClick={() => setFormData((prev) => ({ ...prev, type: 'Nhà Riêng' }))}
                  style={{ marginRight: 8 }}
              >
                Nhà Riêng
              </Button>
              <Button
                  type={formData.type === 'Văn Phòng' ? 'primary' : 'default'}
                  onClick={() => setFormData((prev) => ({ ...prev, type: 'Văn Phòng' }))}
              >
                Văn Phòng
              </Button>
            </div>
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
        throw new Error(`Đổi mật khẩu thất bại (Mã: ${response.status})`);
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
        {activeView === 'changeInformation' && <ChangeUserInformation />}
        {activeView === 'address' && <UserAddress />}
        {activeView === 'changePassword' && <ChangePassword />}
      </div>
    </div>
);
};

export default UserProfile;
