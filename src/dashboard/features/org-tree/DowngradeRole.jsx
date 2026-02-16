import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowDown, CheckCircle, Calendar } from 'lucide-react';
import dashboardColors from '../../styles/colors';

const DowngradeRole = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(null);
  const [commissionType, setCommissionType] = useState('Fixed Percentage');
  const [commissionValue, setCommissionValue] = useState('2.50 %');
  const [effectiveDate, setEffectiveDate] = useState('11/01/2023');

  const roles = [
    { id: 1, name: 'Sale Director', description: 'Enhanced commission structure', level: 'Level 7' },
    { id: 2, name: 'Senior Sale Director', description: 'Enhanced commission structure', level: 'Level 8' },
    { id: 3, name: 'Team Head', description: 'Enhanced commission structure', level: 'Level 9' },
    { id: 4, name: 'Founder Head', description: 'Enhanced commission structure', level: 'Level 10' },
    { id: 5, name: 'Chief director', description: 'Enhanced commission structure', level: 'Level 11' },
    { id: 6, name: 'Vice president', description: 'Enhanced commission structure', level: 'Level 12' },
    { id: 7, name: 'Company', description: 'Enhanced commission structure', level: 'Level 13' }
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
            Change Team & Role
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
            Improved design with upgrade/downgrade buttons and dropdown role selector
          </p>
        </div>

        {/* Main Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
            Change Team & Role
          </h2>

          {/* Assigned Role Section */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '12px' 
            }}>
              Assigned Role
            </label>
            <div style={{
              backgroundColor: '#E8F5F1',
              border: `2px solid ${dashboardColors.primary}`,
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                  Sales Manager
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  Standard sales commissions
                </div>
              </div>
              <CheckCircle size={24} color={dashboardColors.primary} />
            </div>
          </div>

          {/* Upgrade/Downgrade Buttons */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '16px',
            marginBottom: '24px'
          }}>
            <button style={{
              padding: '12px',
              backgroundColor: 'white',
              border: '2px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <ArrowUp size={18} />
              Upgrade
            </button>
            <button 
              onClick={() => navigate(-1)}
              style={{
                padding: '12px',
                backgroundColor: '#ff9800',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <ArrowDown size={18} />
              Downgrade
            </button>
          </div>

          {/* Role Selection List */}
          <div style={{ marginBottom: '20px' }}>
            {roles.map((role) => (
              <label 
                key={role.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  marginBottom: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedRole === role.id ? '#f9fafb' : 'white',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => {
                  if (selectedRole !== role.id) {
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={selectedRole === role.id}
                    onChange={() => setSelectedRole(role.id)}
                    style={{ 
                      width: '18px', 
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: dashboardColors.primary
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937', marginBottom: '2px' }}>
                      {role.name}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
                      {role.description}
                    </div>
                  </div>
                </div>
                <div style={{
                  padding: '4px 12px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280'
                }}>
                  {role.level}
                </div>
              </label>
            ))}
          </div>

          {/* Warning Message */}
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px'
          }}>
            <p style={{ fontSize: '13px', color: '#dc2626', margin: 0 }}>
              Important: Role changes will affect commission rates and team goals. Changes take effect immediately
            </p>
          </div>

          {/* Commission Configuration Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
              Commission Configuration
            </h3>

            {/* Commission Type */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '13px', 
                fontWeight: '500', 
                color: '#6b7280', 
                marginBottom: '8px' 
              }}>
                Commission Type
              </label>
              <select 
                value={commissionType}
                onChange={(e) => setCommissionType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              >
                <option>Fixed Percentage</option>
                <option>Tiered Commission</option>
                <option>Flat Rate</option>
              </select>
            </div>

            {/* Value and Effective From */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '13px', 
                  fontWeight: '500', 
                  color: '#6b7280', 
                  marginBottom: '8px' 
                }}>
                  Value
                </label>
                <select 
                  value={commissionValue}
                  onChange={(e) => setCommissionValue(e.target.value)}
                  style={{
                    width: '90%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                >
                  <option>2.50 %</option>
                  <option>3.00 %</option>
                  <option>3.50 %</option>
                  <option>4.00 %</option>
                </select>
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '13px', 
                  fontWeight: '500', 
                  color: '#6b7280', 
                  marginBottom: '8px' 
                }}>
                  Effective From
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text"
                    value={effectiveDate}
                    onChange={(e) => setEffectiveDate(e.target.value)}
                    style={{
                      width: '90%',
                      padding: '12px',
                      paddingRight: '40px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <Calendar 
                    size={18} 
                    color="#6b7280"
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Projected Earnings */}
          <div style={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                  Projected Earnings
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  Est. Monthly Payout
                </div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: dashboardColors.primary }}>
                ₹15,000
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button 
              onClick={() => navigate('/dashboard/org-tree/teams-and-roles')}
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: 'white',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                color: '#374151',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button style={{
              flex: 1,
              padding: '14px',
              backgroundColor: dashboardColors.primary,
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '500',
              color: 'white',
              cursor: 'pointer'
            }}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DowngradeRole;
