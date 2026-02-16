import { X } from 'lucide-react';
import profileImage from '../../assets/associate-profile.jpg';

const OffCanvasProfile = ({ isOpen, onClose, member }) => {
  if (!isOpen || !member) return null;

  return (
    <>
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1100,
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
      
      <div className="scroll-hidden" style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '380px',
        height: '100vh',
        backgroundColor: 'var(--dashboard-white)',
        boxShadow: '-4px 0 12px rgba(0,0,0,0.15)',
        zIndex: 1200,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        overflowY: 'auto'
      }}>
        <div style={{ padding: '24px' }}>
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              padding: '8px',
              border: 'none',
              background: 'var(--dashboard-tertiary)',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} color="var(--dashboard-text)" />
          </button>

          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <img 
              src={profileImage} 
              alt="Profile" 
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                margin: '0 auto 16px'
              }}
            />
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: 'var(--dashboard-primary)', 
              margin: '0 0 8px 0' 
            }}>
              {member.name || 'Bhoodhana Infra Developers'}
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: 'var(--dashboard-text-light)', 
              margin: '0 0 4px 0' 
            }}>
              {member.role || 'Company'}
            </p>
            <p style={{ 
              fontSize: '14px', 
              color: 'var(--dashboard-text-light)', 
              margin: '0 0 16px 0' 
            }}>
              {member.id || 'BID1000'}
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button style={{
                padding: '8px 24px',
                backgroundColor: '#10b981',
                color: 'var(--dashboard-white)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Active
              </button>
              <button style={{
                padding: '8px 24px',
                backgroundColor: 'var(--dashboard-white)',
                color: '#ef4444',
                border: '1px solid #ef4444',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Inactive
              </button>
            </div>
          </div>

          <div style={{ 
            borderTop: '1px solid var(--dashboard-border)', 
            paddingTop: '24px',
            marginBottom: '24px'
          }}>
            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: 'var(--dashboard-text)', 
              margin: '0 0 16px 0' 
            }}>
              Contact Information
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: 'var(--dashboard-text-light)' }}>Email:</span>
                <span style={{ fontSize: '14px', color: 'var(--dashboard-text)', fontWeight: '500' }}>
                  admin@bhoodhana.com
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: 'var(--dashboard-text-light)' }}>Phone:</span>
                <span style={{ fontSize: '14px', color: 'var(--dashboard-text)', fontWeight: '500' }}>
                  +91 9876543212
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: 'var(--dashboard-text-light)' }}>Joined:</span>
                <span style={{ fontSize: '14px', color: 'var(--dashboard-text)', fontWeight: '500' }}>
                  Jan 2020
                </span>
              </div>
            </div>
          </div>

          <div style={{ 
            borderTop: '1px solid var(--dashboard-border)', 
            paddingTop: '24px'
          }}>
            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: 'var(--dashboard-text)', 
              margin: '0 0 16px 0' 
            }}>
              Performance Metrics
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{
                padding: '16px',
                backgroundColor: '#ede9fe',
                borderRadius: '8px'
              }}>
                <p style={{ fontSize: '12px', color: '#7c3aed', margin: '0 0 8px 0', fontWeight: '500' }}>
                  Team Size
                </p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#7c3aed', margin: 0 }}>
                  {member.team || '156'}
                </p>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#d1fae5',
                borderRadius: '8px'
              }}>
                <p style={{ fontSize: '12px', color: '#059669', margin: '0 0 8px 0', fontWeight: '500' }}>
                  Total Sales
                </p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#059669', margin: 0 }}>
                  {member.sale || '₹1.2Cr'}
                </p>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#fed7d7',
                borderRadius: '8px'
              }}>
                <p style={{ fontSize: '12px', color: '#c53030', margin: '0 0 8px 0', fontWeight: '500' }}>
                  Plots Sold
                </p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#c53030', margin: 0 }}>
                  234
                </p>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#fce7f3',
                borderRadius: '8px'
              }}>
                <p style={{ fontSize: '12px', color: '#db2777', margin: '0 0 8px 0', fontWeight: '500' }}>
                  Commission
                </p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#db2777', margin: 0 }}>
                  {member.comm || '₹1,00,000'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OffCanvasProfile;
