import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { dashboardColors } from '../../styles/colors';
import { toastService } from '../../../services/toastService';
import axios from 'axios';

const PermissionsManagement = () => {
  const [roles, setRoles] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
    fetchModules();
  }, []);

  const fetchRoles = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.post('https://realestate.vsahasoft.com/api/v1/admin/roles/list', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setRoles(response.data.data);
      }
    } catch (error) {
      toastService.error('Failed to fetch roles');
    }
  };

  const fetchModules = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.post('https://realestate.vsahasoft.com/api/v1/admin/modules/list', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setModules(response.data.data);
        const initialPermissions = {};
        response.data.data.forEach(module => {
          initialPermissions[module._id] = {
            name: module.name,
            view: false,
            edit: false,
            active: false,
            delete: false,
            download: false
          };
        });
        setPermissions(initialPermissions);
      }
    } catch (error) {
      toastService.error('Failed to fetch modules');
    }
  };

  const handleRoleSelect = async (role) => {
    setSelectedRole(role);
    setShowRoleDropdown(false);
    
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.post('https://realestate.vsahasoft.com/api/v1/admin/role/info', 
        { id: role._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success && response.data.role) {
        const roleData = response.data.role;
        const rolePermissions = {};
        
        modules.forEach(module => {
          const modulePermission = roleData.permissions?.find(p => p.module._id === module._id);
          rolePermissions[module._id] = {
            name: module.name,
            view: modulePermission?.view === 1 || false,
            edit: modulePermission?.edit === 1 || false,
            active: modulePermission?.active === 1 || false,
            delete: modulePermission?.delete === 1 || false,
            download: modulePermission?.download === 1 || false
          };
        });
        setPermissions(rolePermissions);
      }
    } catch (error) {
      toastService.error('Failed to fetch role permissions');
      const initialPermissions = {};
      modules.forEach(module => {
        initialPermissions[module._id] = {
          name: module.name,
          view: false,
          edit: false,
          active: false,
          delete: false,
          download: false
        };
      });
      setPermissions(initialPermissions);
    }
  };

  const handlePermissionToggle = (moduleId, permission) => {
    setPermissions(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [permission]: !prev[moduleId][permission]
      }
    }));
  };

  const handleUpdatePermissions = async () => {
    if (!selectedRole) {
      toastService.error('Please select a role');
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem('authToken');
      const permissionsArray = Object.keys(permissions).map(moduleId => ({
        module: moduleId,
        view: permissions[moduleId].view ? 1 : 0,
        edit: permissions[moduleId].edit ? 1 : 0,
        active: permissions[moduleId].active ? 1 : 0,
        download: permissions[moduleId].download ? 1 : 0,
        delete: permissions[moduleId].delete ? 1 : 0,
        status: 1
      }));

      const payload = {
        name: selectedRole.name,
        code: selectedRole.code,
        parent: selectedRole.parent?._id || null,
        percentage: selectedRole.percentage || 0,
        permissions: permissionsArray
      };

      const response = await axios.post('https://realestate.vsahasoft.com/api/v1/admin/role/update', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toastService.success('Permissions updated successfully');
        fetchRoles();
      }
    } catch (error) {
      toastService.error(error.response?.data?.message || 'Failed to update permissions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '600', color: dashboardColors.secondary, marginBottom: '-50px' }}>
          Permissions Management
        </h1>

        {/* Role Dropdown */}
        <div style={{ marginBottom: '32px', position: 'relative', maxWidth: '400px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            Select Role
          </label>
          <div
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            style={{
              padding: '12px 16px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{ color: selectedRole ? '#374151' : '#9ca3af' }}>
              {selectedRole ? selectedRole.name : 'Choose a role'}
            </span>
            <ChevronDown size={20} color="#6b7280" />
          </div>
          {showRoleDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              marginTop: '4px',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 10,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              {roles.map((role) => (
                <div
                  key={role._id}
                  onClick={() => handleRoleSelect(role)}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f3f4f6'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
                >
                  {role.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Permission Matrix */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>
            Permission Matrix
          </h2>

          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
            gap: '16px',
            padding: '16px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            marginBottom: '8px'
          }}>
            <div style={{ fontWeight: '600', fontSize: '14px', color: '#374151' }}>Module Name</div>
            <div style={{ fontWeight: '600', fontSize: '14px', color: '#374151', textAlign: 'center' }}>View</div>
            <div style={{ fontWeight: '600', fontSize: '14px', color: '#374151', textAlign: 'center' }}>Add/Edit</div>
            <div style={{ fontWeight: '600', fontSize: '14px', color: '#374151', textAlign: 'center' }}>Delete</div>
            <div style={{ fontWeight: '600', fontSize: '14px', color: '#374151', textAlign: 'center' }}>Active/Inactive</div>
            <div style={{ fontWeight: '600', fontSize: '14px', color: '#374151', textAlign: 'center' }}>Download</div>
          </div>

          {/* Table Rows */}
          {modules.map((module, index) => (
            <div
              key={module._id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
                gap: '16px',
                padding: '20px 16px',
                borderBottom: index < modules.length - 1 ? '1px solid #f3f4f6' : 'none',
                alignItems: 'center'
              }}
            >
              <div style={{ fontSize: '14px', color: '#374151' }}>{module.name}</div>
              {['view', 'edit', 'delete', 'active', 'download'].map((permission) => (
                <div key={permission} style={{ display: 'flex', justifyContent: 'center' }}>
                  <input
                    type="checkbox"
                    checked={permissions[module._id]?.[permission] || false}
                    onChange={() => handlePermissionToggle(module._id, permission)}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: dashboardColors.secondary
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          marginTop: '32px'
        }}>
          <button
            style={{
              padding: '12px 48px',
              backgroundColor: '#ffffff',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdatePermissions}
            disabled={loading}
            style={{
              padding: '12px 48px',
              backgroundColor: loading ? '#ccc' : dashboardColors.primary,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#196049')}
            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = dashboardColors.primary)}
          >
            {loading ? 'Updating...' : 'Update Permissions'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionsManagement;
