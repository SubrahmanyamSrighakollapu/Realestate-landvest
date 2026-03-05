import { Bell, Search, User, LogOut, LogOutIcon } from 'lucide-react';
import { authService } from '../../../services/authService';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardNavbar = ({ sidebarOpen }) => {
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const getProfileImage = () => {
    if (employeeInfo?.profileImage) {
      return `https://api.landvestinfra.com${employeeInfo.profileImage}`;
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
    const info = authService.getEmployeeData();
    setEmployeeInfo(info);

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    authService.logout();
    setEmployeeInfo(null);
    navigate('/auth/login');
  };
  return (
    <div style={{
      height: '70px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #e5e7eb',
      position: 'fixed',
      top: 0,
      left: sidebarOpen ? '260px' : '70px',
      right: 0,
      transition: 'left 0.3s ease',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, maxWidth: '500px' }}>
        <Search size={20} color="#6b7280" />
        <input
          type="text"
          placeholder="Search..."
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '15px',
            width: '100%',
            color: '#374151'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        {/* <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          padding: '8px'
        }}>
          <Bell size={22} color="#6b7280" />
          <span style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            width: '8px',
            height: '8px',
            backgroundColor: '#ef4444',
            borderRadius: '50%'
          }}></span>
        </button> */}

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
              borderRadius: '50%',
              backgroundColor: '#1F6F54',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              overflow: 'hidden',
              padding: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(31, 111, 84, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {getProfileImage() ? (
              <img src={getProfileImage()} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={22} color="#fff" />
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
                minWidth: '280px',
                zIndex: 10000,
                overflow: 'hidden',
                border: '1px solid #e5e7eb'
              }}>
              {/* Profile Header with Avatar */}
              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #1F6F54 0%, #166d4f 100%)',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  overflow: 'hidden'
                }}>
                  {getProfileImage() ? (
                    <img src={getProfileImage()} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ fontSize: '24px', fontWeight: '600' }}>{getInitials(employeeInfo?.name)}</div>
                  )}
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '2px' }}>
                  {employeeInfo?.name || 'Admin User'}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.9, fontWeight: '500' }}>
                  {employeeInfo?.code || 'N/A'}
                </div>
              </div>

              {/* Profile Details */}
              <div style={{ padding: '16px' }}>
                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', minWidth: '55px' }}>Email:</span>
                  <span style={{ fontSize: '13px', color: '#111827', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{employeeInfo?.email || 'N/A'}</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', minWidth: '55px' }}>Phone:</span>
                  <span style={{ fontSize: '13px', color: '#111827', fontWeight: '500' }}>{employeeInfo?.phone || 'N/A'}</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', minWidth: '55px' }}>Role:</span>
                  <span style={{ fontSize: '13px', color: '#111827', fontWeight: '500' }}>{employeeInfo?.role?.name || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', minWidth: '55px' }}>Status:</span>
                  <span style={{ 
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    backgroundColor: employeeInfo?.status === 'active' ? '#d1fae5' : '#fee2e2',
                    color: employeeInfo?.status === 'active' ? '#065f46' : '#991b1b',
                    textTransform: 'capitalize'
                  }}>{employeeInfo?.status || 'N/A'}</span>
                </div>
              </div>

              {/* Logout Button */}
              <div style={{ borderTop: '1px solid #e5e7eb', padding: '10px' }}>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#fee2e2',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#dc2626',
                    fontSize: '13px',
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
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10001
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <LogOutIcon
                size={64}
                color="#dc2626"
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
                onClick={confirmLogout}
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
    </div>
  );
};

export default DashboardNavbar;
