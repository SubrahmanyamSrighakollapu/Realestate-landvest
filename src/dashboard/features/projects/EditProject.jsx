import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pencil, Trash2, AlertTriangle } from 'lucide-react';
import dashboardColors from '../../styles/colors';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('Manager');
  const [commissionType, setCommissionType] = useState('Override');
  const [commissionPercentage, setCommissionPercentage] = useState('2');
  const [appliesOn, setAppliesOn] = useState('Net Amount (Post-Tax)');
  const [parentRole, setParentRole] = useState('Company');

  const hierarchyLevels = [
    { level: 1, role: 'Company', percentage: '26%', type: 'Override', avatar: 'C' },
    { level: 2, role: 'Vice president', percentage: '25%', type: 'Override', avatar: 'VP' },
    { level: 3, role: 'Chief Director', percentage: '24%', type: 'Override', avatar: 'CD' },
    { level: 4, role: 'Founder Head', percentage: '23%', type: 'Override', avatar: 'FH' },
    { level: 5, role: 'Team Head', percentage: '22%', type: 'Override', avatar: 'TH' },
    { level: 6, role: 'Seniour Sales Director', percentage: '20%', type: 'Override', avatar: 'SSD' },
    { level: 7, role: 'Sales Director', percentage: '18%', type: 'Override', avatar: 'SD' },
    { level: 8, role: 'Sales Manager', percentage: '16%', type: 'Override', avatar: 'SM' },
    { level: 9, role: 'Deputy sales Manager', percentage: '14%', type: 'Override', avatar: 'DSM' },
    { level: 10, role: 'Assistance sales Manager', percentage: '12%', type: 'Override', avatar: 'ASM' },
    { level: 11, role: 'Relationship Manager', percentage: '10%', type: 'Override', avatar: 'RM' },
    { level: 12, role: 'Relationship Officer', percentage: '7.5%', type: 'Override', avatar: 'RO' },
    { level: 13, role: 'Relationship Advisor', percentage: '5%', type: 'Override', avatar: 'RA' }
  ];

  const totalCommission = hierarchyLevels.reduce((sum, level) => {
    return sum + parseFloat(level.percentage);
  }, 0);

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
            Green Valley Plots
          </h1>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
            <span>Project ID: GVP-2024-001</span>
            <span style={{ 
              backgroundColor: dashboardColors.primary, 
              color: 'white', 
              padding: '4px 16px', 
              borderRadius: '2px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Active
            </span>
            <span style={{ 
              backgroundColor: '#10b981', 
              color: 'white', 
              padding: '4px 16px', 
              borderRadius: '2px',
              fontSize: '12px',
              fontWeight: '500'
            }}>Effective: 12/05/2024</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '40% 60%', gap: '24px' }}>
          {/* Left Side - Commission Hierarchy */}
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                Commission Hierarchy
              </h2>
              <button style={{
                padding: '8px 16px',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                color: dashboardColors.primary,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                +Add Level
              </button>
            </div>

            {/* Hierarchy List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {hierarchyLevels.map((level) => (
                <div key={level.level} style={{
                  backgroundColor: 'white',
                  padding: '16px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#E8F5F1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: dashboardColors.primary,
                      fontWeight: '600',
                      fontSize: '14px',
                      border: `2px solid ${dashboardColors.primary}`
                    }}>
                      {level.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>
                        Level {level.level}
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937' }}>
                        {level.role}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: '18px', 
                      fontWeight: '700', 
                      color: dashboardColors.primary,
                      minWidth: '60px',
                      textAlign: 'right'
                    }}>
                      {level.percentage}
                    </div>
                    <div style={{
                      padding: '4px 12px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#4b5563',
                      minWidth: '80px',
                      textAlign: 'center'
                    }}>
                      {level.type}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6b7280',
                      padding: '4px'
                    }}>
                      <Pencil size={16} />
                    </button>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#ef4444',
                      padding: '4px'
                    }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Configure Role */}
          <div>
            <div style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              position: 'sticky',
              top: '24px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>
                Configure Role: {selectedRole}
              </h3>

              {/* Role Name */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                  Role Name
                </label>
                <select style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none'
                }}>
                  <option>Manager</option>
                  <option>Director</option>
                  <option>Sales Head</option>
                </select>
              </div>

              {/* Hierarchy Level */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                  Hierarchy Level
                </label>
                <select style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none'
                }}>
                  <option>Level 2</option>
                  <option>Level 1</option>
                  <option>Level 3</option>
                </select>
              </div>

              {/* Commission Type */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Commission Type
                </label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="commissionType" 
                      value="Direct"
                      checked={commissionType === 'Direct'}
                      onChange={(e) => setCommissionType(e.target.value)}
                    />
                    <span style={{ fontSize: '14px', color: '#374151' }}>Direct</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="commissionType" 
                      value="Override"
                      checked={commissionType === 'Override'}
                      onChange={(e) => setCommissionType(e.target.value)}
                    />
                    <span style={{ fontSize: '14px', color: '#374151' }}>Override</span>
                  </label>
                </div>
              </div>

              {/* Commission Percentage */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                  Commission Percentage
                </label>
                <input 
                  type="text"
                  value={commissionPercentage}
                  onChange={(e) => setCommissionPercentage(e.target.value)}
                  placeholder="2 %"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Applies On */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                  Applies On
                </label>
                <select 
                  value={appliesOn}
                  onChange={(e) => setAppliesOn(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option>Net Amount (Post-Tax)</option>
                  <option>Gross Amount</option>
                </select>
              </div>

              {/* Parent Role */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                  Parent Role
                </label>
                <select 
                  value={parentRole}
                  onChange={(e) => setParentRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option>Company</option>
                  <option>Manager</option>
                  <option>Director</option>
                </select>
              </div>

              {/* Warning Message */}
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertTriangle size={16} color="#dc2626" />
                <span style={{ fontSize: '13px', color: '#dc2626' }}>
                  Total project commission for all roles is currently 100%.
                </span>
              </div>

              {/* Earnings Preview */}
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>Earnings Preview</span>
                  <span style={{ color: '#6b7280', fontWeight: '400' }}>Sample Sale: ₹10,00,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>Manager gets (3%)</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>₹30,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>Associate gets (5%)</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>₹50,000</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => navigate('/dashboard/projects/management')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: dashboardColors.primary,
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'white',
                  cursor: 'pointer'
                }}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
