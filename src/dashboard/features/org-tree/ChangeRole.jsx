import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowDown, CheckCircle } from 'lucide-react';
import dashboardColors from '../../styles/colors';
import { employeeService } from '../../../services/employeeService';
import { projectService } from '../../../services/projectService';
import { toastService } from '../../../services/toastService';

const ChangeRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

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
    setActionType('upgrade');
    setSelectedRole(null);
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
    setActionType('downgrade');
    setSelectedRole(null);
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
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
            Change Team & Role
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
            Select upgrade or downgrade to view available roles
          </p>
        </div>

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
            marginBottom: '24px'
          }}>
            <button 
              onClick={handleUpgrade}
              style={{
                padding: '12px',
                backgroundColor: actionType === 'upgrade' ? dashboardColors.primary : 'white',
                border: actionType === 'upgrade' ? 'none' : '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: actionType === 'upgrade' ? 'white' : '#374151',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <ArrowUp size={18} />
              Upgrade
            </button>
            <button 
              onClick={handleDowngrade}
              style={{
                padding: '12px',
                backgroundColor: actionType === 'downgrade' ? '#ff9800' : 'white',
                border: actionType === 'downgrade' ? 'none' : '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: actionType === 'downgrade' ? 'white' : '#374151',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <ArrowDown size={18} />
              Downgrade
            </button>
          </div>

          {/* Role Selection List */}
          {actionType && (
            <>
              <div style={{ marginBottom: '20px' }}>
                {roles.map((role) => (
                  <label 
                    key={role._id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px',
                      marginBottom: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: selectedRole === role._id ? '#f9fafb' : 'white',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => {
                      if (selectedRole !== role._id) {
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <input
                        type="radio"
                        name="role"
                        value={role._id}
                        checked={selectedRole === role._id}
                        onChange={() => setSelectedRole(role._id)}
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
                          Commission: {role.percentage}%
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
                      Level {role.code}
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
            </>
          )}

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
            <button 
              onClick={handleSave}
              disabled={!selectedRole}
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: selectedRole ? dashboardColors.primary : '#d1d5db',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                color: 'white',
                cursor: selectedRole ? 'pointer' : 'not-allowed',
                opacity: selectedRole ? 1 : 0.6
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeRole;
