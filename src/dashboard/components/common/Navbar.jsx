import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { dashboardColors } from '../../styles/colors';
import { authService } from '../../../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const info = authService.getEmployeeData();
    console.log('Employee Info:', info); // Debug log
    setEmployeeInfo(info);

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/auth/login');
  };

  console.log('Show Dropdown:', showProfileDropdown); // Debug log
  console.log('Employee Info State:', employeeInfo); // Debug log

  return (
    <nav style={{
      backgroundColor: dashboardColors.primary,
      color: 'white',
      padding: '1rem 2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
        <Link to="/dashboard" style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
          RealEstate Dashboard
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Back to Site</Link>
          
          {/* Profile Dropdown */}
          {employeeInfo && (
            <div style={{ position: 'relative' }} ref={profileRef}>
              <div
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <User size={20} />
                <span>{employeeInfo.name}</span>
                <ChevronDown size={16} />
              </div>

              {showProfileDropdown && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                  minWidth: '300px',
                  zIndex: 9999,
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb'
                }}>
                  {/* Profile Header */}
                  <div style={{
                    padding: '16px',
                    backgroundColor: dashboardColors.primary,
                    color: 'white'
                  }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                      {employeeInfo.name}
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>
                      {employeeInfo.code}
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div style={{ padding: '12px 16px', color: '#374151' }}>
                    <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                      <strong>Email:</strong> {employeeInfo.email}
                    </div>
                    <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                      <strong>Phone:</strong> {employeeInfo.phone}
                    </div>
                    <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                      <strong>Role:</strong> {employeeInfo.role?.name || 'N/A'}
                    </div>
                    {employeeInfo.sponser && (
                      <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                        <strong>Sponsor:</strong> {employeeInfo.sponser.name}
                      </div>
                    )}
                    {employeeInfo.aadharNumber && (
                      <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                        <strong>Aadhar:</strong> {employeeInfo.aadharNumber}
                      </div>
                    )}
                    <div style={{ fontSize: '14px' }}>
                      <strong>Status:</strong> <span style={{ 
                        color: employeeInfo.status === 'active' ? '#10b981' : '#ef4444',
                        textTransform: 'capitalize'
                      }}>{employeeInfo.status}</span>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <div style={{ borderTop: '1px solid #e5e7eb' }}>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#dc2626',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;