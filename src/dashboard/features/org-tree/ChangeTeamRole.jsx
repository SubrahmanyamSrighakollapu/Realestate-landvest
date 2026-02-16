import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowDown, CheckCircle, Calendar } from 'lucide-react';
import dashboardColors from '../../styles/colors';

const ChangeTeamRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [commissionType, setCommissionType] = useState('Fixed Percentage');
  const [commissionValue, setCommissionValue] = useState('2.50 %');
  const [effectiveDate, setEffectiveDate] = useState('11/01/2023');

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
          <div style={{ marginBottom: '24px' }}>
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
            marginBottom: '20px'
          }}>
            <button 
              onClick={() => navigate('/dashboard/org-tree/upgrade-role')}
              style={{
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
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = dashboardColors.primary;
              e.target.style.color = dashboardColors.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.color = '#374151';
            }}
            >
              <ArrowUp size={18} />
              Upgrade
            </button>
            <button 
            onClick={() => navigate('/dashboard/org-tree/downgrade-role')}
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
              gap: '8px',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              <ArrowDown size={18} />
              Downgrade
            </button>
          </div>

          {/* Warning Message */}
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '32px'
          }}>
            <p style={{ fontSize: '13px', color: '#dc2626', margin: 0 }}>
              Important: Role changes will affect commission rates and team goals. Changes take effect immediately
            </p>
          </div>

          {/* Commission Configuration Section */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>
              Commission Configuration
            </h3>

            {/* Commission Type */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '13px', 
                fontWeight: '500', 
                color: '#374151', 
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
                  color: '#374151', 
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
                  color: '#374151', 
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
            marginBottom: '32px'
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
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.borderColor = '#9ca3af'}
              onMouseLeave={(e) => e.target.style.borderColor = '#d1d5db'}
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
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeTeamRole;
