import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowDown, CheckCircle } from 'lucide-react';
import dashboardColors from '../../styles/colors';
import { employeeService } from '../../../services/employeeService';
import { projectService } from '../../../services/projectService';
import { toastService } from '../../../services/toastService';

const ChangeTeamRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [roleType, setRoleType] = useState('');

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await employeeService.listEmployees();
      if (response.success) {
        const emp = response.data.find(e => e._id === id);
        setEmployee(emp);
      }
    } catch (error) {
      toastService.error('Failed to load employee');
    }
  };

  const handleUpgrade = async () => {
    if (!employee?.role?._id) return;
    setRoleType('upgrade');
    try {
      const response = await projectService.getParentRoles(employee.role._id);
      if (response.success) {
        setRoles(response.data);
      }
    } catch (error) {
      toastService.error('Failed to load upgrade roles');
    }
  };

  const handleDowngrade = async () => {
    if (!employee?.role?._id) return;
    setRoleType('downgrade');
    try {
      const response = await projectService.getChildRoles(employee.role._id);
      if (response.success) {
        setRoles(response.data);
      }
    } catch (error) {
      toastService.error('Failed to load downgrade roles');
    }
  };

  const handleSave = async () => {
    if (!selectedRole) {
      toastService.error('Please select a role');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('code', employee.code);
      formData.append('role', selectedRole);
      
      const response = await employeeService.updateEmployee(formData);
      if (response.success) {
        toastService.success('Role updated successfully');
        navigate('/dashboard/org-tree/teams-and-roles');
      }
    } catch (error) {
      toastService.error('Failed to update role');
    }
  };

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
                  {employee?.role?.name || 'N/A'}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  Commission: {employee?.role?.percentage || 0}%
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
              onClick={handleUpgrade}
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
            onClick={handleDowngrade}
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

          {/* Role Selection */}
          {roles.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '12px' 
              }}>
                Select New Role ({roleType})
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
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
                <option value="">Select Role</option>
                {roles.map(role => (
                  <option key={role._id} value={role._id}>
                    {role.name} - {role.percentage}%
                  </option>
                ))}
              </select>
            </div>
          )}

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
            <button 
              onClick={handleSave}
              style={{
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
