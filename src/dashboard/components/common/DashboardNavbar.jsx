import { Bell, Search, User } from 'lucide-react';
import { authService } from '../../../services/authService';
import { useEffect, useState } from 'react';

const DashboardNavbar = ({ sidebarOpen }) => {
  const [employeeInfo, setEmployeeInfo] = useState(null);

  useEffect(() => {
    const info = authService.getEmployeeData();
    setEmployeeInfo(info);
  }, []);
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
        <button style={{
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
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: '8px',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#1F6F54',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>{employeeInfo?.name || 'Admin User'}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>{employeeInfo?.role?.name || 'Administrator'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
