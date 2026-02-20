import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useRef } from 'react';

const IDCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.employee;
  const cardRef = useRef(null);

  if (!employee) {
    return <div>No employee data available</div>;
  }

  const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate(-1)} style={{
          padding: '8px',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}>
          <ArrowLeft size={20} />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', margin: 0 }}>
          ID Card - {employee.name}
        </h2>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh'
      }}>
        <div ref={cardRef} style={{
          position: 'relative',
          width: '400px',
          height: '550px',
          backgroundColor: '#fff',
          borderRadius: '20px',
          border: '12px solid rgba(31, 111, 84, 1)',
          padding: '30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          overflow: 'hidden'
        }}>
          {/* Corner decorations */}
          <div style={{
            position: 'absolute',
            top: '-5px',
            left: '-5px',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #F4D03F 0%, #C9A24D 100%)',
            borderRadius: '0 0 100% 0'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(225deg, #F4D03F 0%, #C9A24D 100%)',
            borderRadius: '0 0 0 100%'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            left: '-5px',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(45deg, #F4D03F 0%, #C9A24D 100%)',
            borderRadius: '0 100% 0 0'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            right: '-5px',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(315deg, #F4D03F 0%, #C9A24D 100%)',
            borderRadius: '100% 0 0 0'
          }}></div>

          {/* Logo and Company Name */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              border: '2px solid #C9A24D',
              borderRadius: '4px',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '28px', fontWeight: '700', color: '#C9A24D' }}>L</span>
              <span style={{ fontSize: '20px', fontWeight: '700', color: 'rgba(31, 111, 84, 1)', marginLeft: '8px' }}>LANDVEST</span>
            </div>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.5px' }}>
              SMART ESTATE BUSINESS
            </div>
            <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '2px' }}>
              HMDA | DTCP| FARMLANDS
            </div>
          </div>

          {/* Profile Image with Initials */}
          <div style={{
            width: '160px',
            height: '160px',
            margin: '0 auto 20px',
            borderRadius: '50%',
            border: '6px solid rgba(31, 111, 84, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(31, 111, 84, 0.1)',
            fontSize: '48px',
            fontWeight: '700',
            color: 'rgba(31, 111, 84, 1)'
          }}>
            {getInitials(employee.name).toUpperCase()}
          </div>

          {/* Employee Name */}
          <h3 style={{
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 24px 0'
          }}>
            {employee.name}
          </h3>

          {/* Employee Details */}
          <div style={{ fontSize: '13px', lineHeight: '2' }}>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', color: '#374151', minWidth: '140px' }}>POSITION</span>
              <span style={{ margin: '0 8px' }}>:</span>
              <span style={{ color: '#6b7280' }}>{employee.role?.name || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', color: '#374151', minWidth: '140px' }}>MOBILE NUMBER</span>
              <span style={{ margin: '0 8px' }}>:</span>
              <span style={{ color: '#6b7280' }}>{employee.phone}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', color: '#374151', minWidth: '140px' }}>BLOOD GROUP</span>
              <span style={{ margin: '0 8px' }}>:</span>
              <span style={{ color: '#6b7280' }}>{employee.bloodgroup || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex' }}>
              <span style={{ fontWeight: '600', color: '#374151', minWidth: '140px' }}>ADDRESS</span>
              <span style={{ margin: '0 8px' }}>:</span>
              <span style={{ color: '#6b7280' }}>{employee.city || 'N/A'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleDownload}
          style={{
            marginTop: '32px',
            padding: '12px 32px',
            backgroundColor: 'rgba(31, 111, 84, 1)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '15px'
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default IDCard;
