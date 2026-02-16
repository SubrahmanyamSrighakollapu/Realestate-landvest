import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { authService } from '../services/authService';
import { toastService } from '../services/toastService';
import axios from 'axios';
import LoginBgImage from '../../src/assets/login-bg.png'


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    referedBy: '',
    aadharNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const employeeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (employeeRef.current && !employeeRef.current.contains(event.target)) {
        setShowEmployeeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchEmployees = async (search) => {
    try {
      const response = await axios.post('https://realestate.vsahasoft.com/api/v1/admin/employees/list', { search });
      if (response.data.success) {
        setEmployees(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEmployeeSearch = (value) => {
    setEmployeeSearch(value);
    if (value.trim()) {
      fetchEmployees(value);
    } else {
      setEmployees([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toastService.error('Please enter a valid email address');
      return;
    }
    
    if (formData.phone.length !== 10 || !/^\d{10}$/.test(formData.phone)) {
      toastService.error('Phone number must be exactly 10 digits');
      return;
    }
    
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('referedBy', formData.referedBy);
      if (formData.aadharNumber) {
        formDataToSend.append('aadharNumber', formData.aadharNumber);
      }

      const response = await authService.signup(formDataToSend);
      if (response.success) {
        toastService.success('Signup successful!');
        navigate('/auth/otp-verification');
      }
    } catch (err) {
      toastService.error(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left side - Background image + gradient overlay + centered content image */}
      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${LoginBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />

        {/* Gradient overlay on top of background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(31, 111, 84, 0.8) 0%, rgba(67, 194, 151, 0.5) 100%)',
        }} />

        {/* Centered handshake + house image */}
        <div style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          zIndex: 2,
        }}>
          <div style={{ maxWidth: '450px', width: '100%' }}>
            <img
              src="/src/assets/login-image.png"
              alt="Real Estate"
              style={{
                width: '100%',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div style={{
        flex: 1,
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <div style={{ maxWidth: '450px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '600', color: 'rgba(31, 111, 84, 1)', margin: '0 0 12px 0' }}>
              Create Account
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(31, 111, 84, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px 0 0 1px',
                  zIndex: 1
                }}>
                  <User size={20} color="#ffffff" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 65px',
                    border: 'none',
                    backgroundColor: 'rgba(31, 111, 84, 0.15)',
                    borderRadius: '1px',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(31, 111, 84, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px 0 0 1px',
                  zIndex: 1
                }}>
                  <Mail size={20} color="#ffffff" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 65px',
                    border: 'none',
                    backgroundColor: 'rgba(31, 111, 84, 0.15)',
                    borderRadius: '1px',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(31, 111, 84, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px 0 0 1px',
                  zIndex: 1
                }}>
                  <Phone size={20} color="#ffffff" />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData({ ...formData, phone: value });
                  }}
                  maxLength={10}
                  required
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 65px',
                    border: 'none',
                    backgroundColor: 'rgba(31, 111, 84, 0.15)',
                    borderRadius: '1px',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Role Input */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(31, 111, 84, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px 0 0 1px',
                  zIndex: 1
                }}>
                  <User size={20} color="#ffffff" />
                </div>
                <input
                  type="text"
                  placeholder="Role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 65px',
                    border: 'none',
                    backgroundColor: 'rgba(31, 111, 84, 0.15)',
                    borderRadius: '1px',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Sponsored By Dropdown */}
            <div style={{ marginBottom: '20px', position: 'relative' }} ref={employeeRef}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(31, 111, 84, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px 0 0 1px',
                  zIndex: 1
                }}>
                  <User size={20} color="#ffffff" />
                </div>
                <input
                  type="text"
                  placeholder="Sponsored By"
                  value={employeeSearch}
                  onChange={(e) => handleEmployeeSearch(e.target.value)}
                  onFocus={() => setShowEmployeeDropdown(true)}
                  required={!formData.referedBy}
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 65px',
                    border: 'none',
                    backgroundColor: 'rgba(31, 111, 84, 0.15)',
                    borderRadius: '1px',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
                <ChevronDown size={18} style={{ position: 'absolute', right: '15px', color: '#6b7280' }} />
              </div>
              {showEmployeeDropdown && employees.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 10,
                  marginTop: '4px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  {employees.map((emp) => (
                    <div
                      key={emp._id}
                      onMouseDown={() => {
                        setFormData({ ...formData, referedBy: emp.code });
                        setEmployeeSearch(`${emp.name} (${emp.code})`);
                        setShowEmployeeDropdown(false);
                      }}
                      style={{
                        padding: '10px 15px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f3f4f6',
                        fontSize: '14px'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
                    >
                      {emp.name} ({emp.code})
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Aadhar Number (Optional) */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(31, 111, 84, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px 0 0 1px',
                  zIndex: 1
                }}>
                  <User size={20} color="#ffffff" />
                </div>
                <input
                  type="text"
                  placeholder="Aadhar Number (Optional)"
                  value={formData.aadharNumber}
                  onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 65px',
                    border: 'none',
                    backgroundColor: 'rgba(31, 111, 84, 0.15)',
                    borderRadius: '1px',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(31, 111, 84, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px 0 0 1px',
                  zIndex: 1
                }}>
                  <Lock size={20} color="#ffffff" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 65px',
                    border: 'none',
                    backgroundColor: 'rgba(31, 111, 84, 0.15)',
                    borderRadius: '1px',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 2
                  }}
                >
                  {showPassword ? <EyeOff size={18} color="#6b7280" /> : <Eye size={18} color="#6b7280" />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: loading ? '#ccc' : 'rgba(31, 111, 84, 1)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '1px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '24px'
              }}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Already have an account? </span>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('/auth/login'); }}
                style={{ fontSize: '14px', color: 'rgba(31, 111, 84, 1)', textDecoration: 'none', fontWeight: '600' }}
              >
                Log In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;