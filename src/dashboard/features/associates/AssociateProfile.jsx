import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, User, Edit, TrendingUp, X, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import profileImage from '../../assets/associate-profile.jpg';
import { employeeService } from '../../../services/employeeService';
import { ProfileShimmer } from '../../../components/loaders/ShimmerLoader';
import { permissionService } from '../../../services/permissionService';
import '../../styles/global.css';

const AssociateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetPasswordData, setResetPasswordData] = useState({
    username: '',
    employeeId: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    fetchEmployeeInfo();
    const isAdmin = permissionService.isAdmin();
    setCanEdit(isAdmin || permissionService.canEdit('Associates'));
  }, [id]);

  const fetchEmployeeInfo = async () => {
    try {
      const response = await employeeService.getEmployeeInfo(id);
      if (response.success) {
        setEmployee(response.data);
      }
    } catch (error) {
      console.error('Error fetching employee info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = (newStatus) => {
    if (employee.status === newStatus) return;
    setPendingStatus(newStatus);
    setShowConfirmModal(true);
  };

  const confirmStatusChange = async () => {
    try {
      const formData = new FormData();
      formData.append('id', employee._id);
      formData.append('code', employee.code);
      formData.append('status', pendingStatus);

      await employeeService.updateEmployee(formData);
      setEmployee({ ...employee, status: pendingStatus });
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  const closeResetPasswordModal = () => {
  setShowResetPasswordModal(false);
  setResetPasswordData({
    username: '',
    employeeId: '',
    newPassword: '',
    confirmPassword: ''
  });
  setShowNewPassword(false);
  setShowConfirmPassword(false);
};

  const monthlySalesData = [
    { month: 'Jan', value: 40 },
    { month: 'Feb', value: 55 },
    { month: 'March', value: 35 },
    { month: 'April', value: 50 },
    { month: 'May', value: 65 },
    { month: 'June', value: 85 }
  ];

  const commissionData = [
    { month: 'Jan', value: 8 },
    { month: 'Feb', value: 6 },
    { month: 'March', value: 10 },
    { month: 'April', value: 7 },
    { month: 'May', value: 9 },
    { month: 'June', value: 11 }
  ];

  if (loading) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => navigate('/dashboard/associates/management')} style={{
            padding: '8px',
            border: '1px solid var(--dashboard-border)',
            borderRadius: '6px',
            background: 'var(--dashboard-white)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}>
            <ArrowLeft size={20} />
          </button>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>Associate Profile</h2>
        </div>
        <ProfileShimmer />
      </div>
    );
  }

  if (!employee) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Employee not found</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate('/dashboard/associates/management')} style={{
          padding: '8px',
          border: '1px solid var(--dashboard-border)',
          borderRadius: '6px',
          background: 'var(--dashboard-white)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}>
          <ArrowLeft size={20} />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>Associate Profile</h2>
      </div>

      <div style={{
        backgroundColor: 'var(--dashboard-white)',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <img src={profileImage} alt="Profile" style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover'
            }} />
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--dashboard-text)', margin: '0 0 12px 0' }}>
                {employee.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--dashboard-text-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={16} />
                  <span>ID: {employee.code}</span>
                  <span style={{ margin: '0 4px' }}>•</span>
                  <span>{employee.role?.name || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} />
                  <span>{employee.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} />
                  <span>Joined {employee.doj ? new Date(employee.doj).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={16} />
                  <span>Sponsored By: {employee.sponser?.name || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
            <div style={{
              backgroundColor: 'var(--dashboard-tertiary)',
              padding: '16px',
              borderRadius: '8px',
              minWidth: '220px'
            }}>
              <h4 style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: '0 0 12px 0' }}>
                Account Status
              </h4>
              <div 
                onClick={() => handleStatusToggle(employee.status === 'active' ? 'inactive' : 'active')}
                style={{
                  position: 'relative',
                  width: '50px',
                  height: '20px',
                  backgroundColor: employee.status === 'active' ? '#10b981' : '#e5e7eb',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px'
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  transform: employee.status === 'active' ? 'translateX(28px)' : 'translateX(0)',
                  transition: 'transform 0.3s'
                }} />
              </div>
              <div style={{ 
                fontSize: '14px', 
                color: employee.status === 'active' ? '#10b981' : '#ef4444',
                fontWeight: '600',
                marginTop: '8px'
              }}>
                {employee.status === 'active' ? '● Active' : '● Inactive'}
              </div>
            </div>

            {/* Buttons Row */}
<div style={{ display: 'flex', gap: '12px' }}>
  {canEdit && (
    <button 
      onClick={() => navigate('/dashboard/associates/edit', { state: { employee, isEdit: true } })}
      style={{
        padding: '10px 20px',
        backgroundColor: 'var(--dashboard-primary)',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        color: 'var(--dashboard-white)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontWeight: '500'
      }}>
      <Edit size={16} />
      Edit Profile
    </button>
  )}

  <button 
    onClick={() => setShowResetPasswordModal(true)}
    style={{
      padding: '10px 20px',
      backgroundColor: 'var(--dashboard-primary)',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      color: 'var(--dashboard-white)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontWeight: '500'
    }}>
    <Lock size={16} />
    Forgot Password
  </button>
</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button 
            onClick={() => navigate(`/dashboard/associates/${id}/team-tree`)}
            style={{
            padding: '10px 20px',
            backgroundColor: 'var(--dashboard-primary)',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            color: 'var(--dashboard-white)',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Team Tree
          </button>
          <select style={{
            padding: '10px 16px',
            border: '1px solid var(--dashboard-border)',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            <option>Select Date</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: 'var(--dashboard-tertiary)', borderRadius: '8px' }}>
            <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: '0 0 8px 0' }}>Total Sales</p>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dashboard-primary)', margin: 0 }}>12 Plots</h3>
            <p style={{ fontSize: '12px', color: 'var(--dashboard-text-light)', margin: '4px 0 0 0' }}>-2 this month</p>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'var(--dashboard-tertiary)', borderRadius: '8px' }}>
            <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: '0 0 8px 0' }}>Total Sales Value</p>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dashboard-primary)', margin: 0 }}>₹2.4 Cr</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <TrendingUp size={14} color="#10b981" />
              <span style={{ fontSize: '12px', color: '#10b981' }}>+8%</span>
            </div>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'var(--dashboard-tertiary)', borderRadius: '8px' }}>
            <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: '0 0 8px 0' }}>Commission Earned</p>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dashboard-primary)', margin: 0 }}>₹12.5 L</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <TrendingUp size={14} color="#10b981" />
              <span style={{ fontSize: '12px', color: '#10b981' }}>+12%</span>
            </div>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'var(--dashboard-tertiary)', borderRadius: '8px' }}>
            <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: '0 0 8px 0' }}>Active Projects</p>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dashboard-primary)', margin: 0 }}>03</h3>
            <p style={{ fontSize: '12px', color: 'var(--dashboard-text-light)', margin: '4px 0 0 0' }}>Peak: 05</p>
          </div>
        </div>
      </div>

      {/* Offer Letter and ID Card Section - Only for Active Associates */}
      {employee.status === 'active' && (
        <div style={{
          backgroundColor: 'var(--dashboard-white)',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Offer Letter Card */}
            <div style={{
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              padding: '20px'
            }}>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--dashboard-text)', margin: '0 0 4px 0' }}>
                Offer Letter
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: '0 0 16px 0' }}>
                Employment offer documentation
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => navigate(`/dashboard/associates/${id}/offer-letter`, { state: { employee } })}
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    backgroundColor: 'var(--dashboard-white)',
                    border: '1px solid var(--dashboard-border)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/dashboard/associates/${id}/offer-letter`, { state: { employee, autoDownload: true } })}
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    backgroundColor: 'var(--dashboard-primary)',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: 'var(--dashboard-white)',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Download
                </button>
              </div>
            </div>

            {/* ID Card */}
            <div style={{
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              padding: '20px'
            }}>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--dashboard-text)', margin: '0 0 4px 0' }}>
                ID Card
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: '0 0 16px 0' }}>
                Professional Employee ID card design
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => navigate(`/dashboard/associates/${id}/id-card`, { state: { employee } })}
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    backgroundColor: 'var(--dashboard-white)',
                    border: '1px solid var(--dashboard-border)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/dashboard/associates/${id}/id-card`, { state: { employee, autoDownload: true } })}
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    backgroundColor: 'var(--dashboard-primary)',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: 'var(--dashboard-white)',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{
          backgroundColor: 'var(--dashboard-white)',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', marginBottom: '16px' }}>Monthly Sales Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          backgroundColor: 'var(--dashboard-white)',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>Commission Growth</h3>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>+8% Increased</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={commissionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          backgroundColor: '#10b981',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Team Ranking Card</h3>
          <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>#3 of 120</div>
          <p style={{ fontSize: '13px', opacity: 0.9, marginBottom: '16px' }}>Ranked 3rd in relationship manager category</p>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '75%', height: '100%', backgroundColor: 'white', borderRadius: '4px' }}></div>
          </div>
          <p style={{ fontSize: '12px', marginTop: '8px', opacity: '0.8' }}>Performance Score</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{
          backgroundColor: 'var(--dashboard-white)',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <User size={20} color="var(--dashboard-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>Personal Details</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Full Name', value: employee.name },
              { label: 'Email Address', value: employee.email },
              { label: 'Primary Contact', value: employee.phone },
              { label: 'Secondary Contact', value: employee.secondphone || 'N/A' },
              { label: 'Location', value: `${employee.city || ''} ${employee.state || ''}`.trim() || 'N/A' },
              { label: 'Address', value: employee.address || 'N/A' }
            ].map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: 'var(--dashboard-text-light)' }}>{item.label}</span>
                <span style={{ fontSize: '14px', color: 'var(--dashboard-text)', fontWeight: '500', textAlign: 'right', maxWidth: '60%' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--dashboard-white)',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', marginBottom: '20px' }}>Professional Profile</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Designation', value: employee.role?.name || 'N/A' },
              { label: 'Employee Type', value: employee.isStaff ? 'Staff' : 'Non-Staff' },
              { label: 'Reporting To', value: employee.sponser?.name || 'N/A' },
              { label: 'Guardian', value: employee.guardian || 'N/A' },
              { label: 'Occupation', value: employee.occupation || 'N/A' },
              { label: 'Bank Account', value: employee.bankaccountnumber || 'N/A' },
              { label: 'Bank Name', value: employee.bankname || 'N/A' },
              { label: 'IFSC', value: employee.ifsc || 'N/A' }
            ].map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: 'var(--dashboard-text-light)' }}>{item.label}</span>
                <span style={{ fontSize: '14px', color: 'var(--dashboard-text)', fontWeight: '500', textAlign: 'right', maxWidth: '60%' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--dashboard-white)',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginTop: '20px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', marginBottom: '20px' }}>Recent Activity Log</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', marginTop: '6px', flexShrink: 0 }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '4px' }}>
                Closed Plot Sale - Emerald Heights
              </div>
              <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: 0 }}>October 24, 2023 · 11:45 AM</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6', marginTop: '6px', flexShrink: 0 }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '4px' }}>
                Updated Client Lead - Oasis Residency
              </div>
              <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: 0 }}>October 22, 2023 · 09:30 AM</p>
            </div>
          </div>
        </div>
      </div>

      {showResetPasswordModal && (
        <div 
          onClick={closeResetPasswordModal}
          style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            position: 'relative'
          }}>
            <X
              size={24}
              onClick={closeResetPasswordModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            />
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--dashboard-primary)', textAlign: 'center', marginBottom: '32px' }}>Reset Password</h3>
            
            {/* Username/Email */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRight: '1px solid #d1d5db'
                }}>
                  <User size={18} color="#6b7280" />
                </div>
                <input
                  type="text"
                  placeholder="User name / Email"
                  value={resetPasswordData.username}
                  onChange={(e) => setResetPasswordData({ ...resetPasswordData, username: e.target.value })}
                  style={{
                    flex: 1,
                    padding: '15px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Employee ID */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRight: '1px solid #d1d5db'
                }}>
                  <Lock size={18} color="#6b7280" />
                </div>
                <input
                  type="text"
                  placeholder="Employee ID"
                  value={resetPasswordData.employeeId}
                  onChange={(e) => setResetPasswordData({ ...resetPasswordData, employeeId: e.target.value })}
                  style={{
                    flex: 1,
                    padding: '15px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* New Password */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRight: '1px solid #d1d5db',
                  flexShrink: 0
                }}>
                  <Lock size={18} color="#6b7280" />
                </div>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={resetPasswordData.newPassword}
                  onChange={(e) => setResetPasswordData({ ...resetPasswordData, newPassword: e.target.value })}
                  style={{
                    flex: 1,
                    padding: '15px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    minWidth: 0,
                    WebkitTextSecurity: showNewPassword ? 'none' : 'disc'
                  }}
                  autoComplete="new-password"
                />
                <div
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  {showNewPassword ? <EyeOff size={18} color="#6b7280" /> : <Eye size={18} color="#6b7280" />}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRight: '1px solid #d1d5db',
                  flexShrink: 0
                }}>
                  <Lock size={18} color="#6b7280" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={resetPasswordData.confirmPassword}
                  onChange={(e) => setResetPasswordData({ ...resetPasswordData, confirmPassword: e.target.value })}
                  style={{
                    flex: 1,
                    padding: '15px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    minWidth: 0,
                    WebkitTextSecurity: showConfirmPassword ? 'none' : 'disc'
                  }}
                  autoComplete="new-password"
                />
                {resetPasswordData.newPassword && resetPasswordData.confirmPassword && resetPasswordData.newPassword === resetPasswordData.confirmPassword && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: '8px',
                    flexShrink: 0
                  }}>
                    <CheckCircle size={18} color="#10b981" />
                  </div>
                )}
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={18} color="#6b7280" /> : <Eye size={18} color="#6b7280" />}
                </div>
              </div>
            </div>

            <button
              onClick={closeResetPasswordModal}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'var(--dashboard-primary)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Reset password
            </button>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Confirm Status Change</h3>
              <X size={20} style={{ cursor: 'pointer' }} onClick={() => setShowConfirmModal(false)} />
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
              Are you sure you want to change the status to <strong style={{ color: pendingStatus === 'active' ? '#10b981' : '#ef4444' }}>{pendingStatus}</strong>?<br/>
              <span style={{ fontSize: '13px' }}>This will {pendingStatus === 'active' ? 'activate' : 'deactivate'} the associate's account.</span>
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'var(--dashboard-primary)',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssociateProfile;
