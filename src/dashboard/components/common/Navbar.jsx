import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { User, LogOut, LogOutIcon } from 'lucide-react';
import { dashboardColors } from '../../styles/colors';
import { authService } from '../../../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const profileRef = useRef(null);

  const getProfileImage = () => {
    if (employeeInfo?.profileImage) {
      return `https://realestate.vsahasoft.com${employeeInfo.profileImage}`;
    }
    return null;
  };

  const getInitials = (name) => {
    if (!name) return 'NA';
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  useEffect(() => {
    const loadEmployeeInfo = () => {
      const info = authService.getEmployeeData();
      setEmployeeInfo(info);
    };

    loadEmployeeInfo();

    // Listen for storage changes (in case data is updated)
    window.addEventListener('storage', loadEmployeeInfo);

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('storage', loadEmployeeInfo);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setEmployeeInfo(null);
    setShowLogoutModal(false);
    navigate('/auth/login');
  };

  return (
    <nav style={{
      backgroundColor: dashboardColors.primary,
      color: 'white',
      padding: '1rem 2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      overflow: 'visible'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
        <Link to="/dashboard" style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
          RealEstate Dashboard
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Back to Site</Link>
          
          {/* Profile Dropdown */}
          {employeeInfo && (
            <div style={{ position: 'relative', zIndex: 1001 }} ref={profileRef}>
              <button
                onClick={(e) => { 
                  e.preventDefault();
                  e.stopPropagation();
                  setShowProfileDropdown(!showProfileDropdown);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  border: 'none',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transition: 'all 0.2s',
                  color: 'white',
                  overflow: 'hidden',
                  padding: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {getProfileImage() ? (
                  <img src={getProfileImage()} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <User size={22} />
                )}
              </button>

              {showProfileDropdown && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  right: 0,
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  minWidth: '320px',
                  zIndex: 10000,
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  animation: 'fadeIn 0.2s ease-in-out'
                }}>
                  {/* Profile Header with Avatar */}
                  <div style={{
                    padding: '24px',
                    background: `linear-gradient(135deg, ${dashboardColors.primary} 0%, #5a67d8 100%)`,
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      border: '3px solid rgba(255,255,255,0.3)',
                      overflow: 'hidden'
                    }}>
                      {getProfileImage() ? (
                        <img src={getProfileImage()} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ fontSize: '32px', fontWeight: '600' }}>{getInitials(employeeInfo.name)}</div>
                      )}
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>
                      {employeeInfo.name}
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.9, fontWeight: '500' }}>
                      {employeeInfo.code}
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div style={{ padding: '20px' }}>
                    <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', color: '#6b7280', minWidth: '60px' }}>Email:</span>
                      <span style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>{employeeInfo.email}</span>
                    </div>
                    <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', color: '#6b7280', minWidth: '60px' }}>Phone:</span>
                      <span style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>{employeeInfo.phone}</span>
                    </div>
                    <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', color: '#6b7280', minWidth: '60px' }}>Role:</span>
                      <span style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>{employeeInfo.role?.name || 'N/A'}</span>
                    </div>
                    {employeeInfo.sponser && (
                      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', color: '#6b7280', minWidth: '60px' }}>Sponsor:</span>
                        <span style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>{employeeInfo.sponser.name}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', color: '#6b7280', minWidth: '60px' }}>Status:</span>
                      <span style={{ 
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        backgroundColor: employeeInfo.status === 'active' ? '#d1fae5' : '#fee2e2',
                        color: employeeInfo.status === 'active' ? '#065f46' : '#991b1b',
                        textTransform: 'capitalize'
                      }}>{employeeInfo.status}</span>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <div style={{ borderTop: '1px solid #e5e7eb', padding: '12px' }}>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        backgroundColor: '#fee2e2',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#dc2626',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#fecaca';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fee2e2';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10001,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            maxWidth: '400px',
            width: '90%',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <LogOutIcon
                size={64}
                color="#f59e0b"
                style={{ marginBottom: '16px' }}
              />
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '12px',
              }}>
                Confirm Logout
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: 0,
              }}>
                Are you sure you want to logout from your account?
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  padding: '10px 24px',
                  backgroundColor: 'white',
                  color: '#111827',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
