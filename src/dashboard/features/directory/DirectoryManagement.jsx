import React, { useState, useEffect } from 'react';
import { Search, Download, Calendar } from 'lucide-react';
import dashboardColors from '../../styles/colors'; // adjust path
import Pagination from '../../components/common/Pagination';
import { employeeService } from '../../../services/employeeService';
import { designationService } from '../../../services/designationService';
import { toastService } from '../../../services/toastService';


const DirectoryManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [directoryData, setDirectoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchEmployees();
    fetchRoles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, nameFilter, selectedRole, selectedStatus, directoryData]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeService.listEmployees('');
      if (response.success) {
        setDirectoryData(response.data || []);
      }
    } catch (error) {
      toastService.error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await designationService.listDesignations('');
      if (response.success) {
        setRoles(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const applyFilters = () => {
    let filtered = directoryData;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (nameFilter) {
      filtered = filtered.filter(item => 
        item.name?.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (selectedRole) {
      filtered = filtered.filter(item => item.role?._id === selectedRole);
    }

    if (selectedStatus) {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }

    setFilteredData(filtered);
  };


  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{
        backgroundColor: dashboardColors.tertiary,
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: dashboardColors.primary,
              margin: 0,
            }}>
              Directory Management
            </h1>
            <p style={{
              fontSize: '14px',
              color: dashboardColors.textLight,
              marginTop: '8px',
            }}>
              Welcome back, {JSON.parse(sessionStorage.getItem('user'))?.name || 'Admin'} • Last login: {new Date(JSON.parse(sessionStorage.getItem('user'))?.lastLogin || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {new Date(JSON.parse(sessionStorage.getItem('user'))?.lastLogin || new Date()).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
            </p>
          </div>

          <div style={{
            flex: '1',
            minWidth: '260px',
            position: 'relative',
            maxWidth: '400px',
          }}>
            <Search
              size={18}
              color={dashboardColors.textLight}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            <input
              type="text"
              placeholder="Search by ID, Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '80%',
                padding: '10px 10px 10px 40px',
                border: `1px solid ${dashboardColors.border}`,
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        backgroundColor: dashboardColors.white,
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '24px',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
        }}>
          <input
            type="text"
            placeholder="Enter Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            style={{
              padding: '10px 14px',
              border: `1px solid ${dashboardColors.border}`,
              borderRadius: '6px',
              fontSize: '14px',
              flex: '1',
              minWidth: '180px',
            }}
          />
          <select 
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{
            padding: '10px 14px',
            border: `1px solid ${dashboardColors.border}`,
            borderRadius: '6px',
            fontSize: '14px',
            minWidth: '160px',
          }}>
            <option value="">All Roles</option>
            {roles.map(role => (
              <option key={role._id} value={role._id}>{role.name}</option>
            ))}
          </select>

          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
            padding: '10px 14px',
            border: `1px solid ${dashboardColors.border}`,
            borderRadius: '6px',
            fontSize: '14px',
            minWidth: '140px',
          }}>
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* <div style={{
            display: 'flex',
            alignItems: 'center',
            border: `1px solid ${dashboardColors.border}`,
            borderRadius: '6px',
            overflow: 'hidden',
            minWidth: '180px',
          }}>
            <input
              type="text"
              placeholder="mm/dd/yy"
              style={{
                padding: '10px 12px',
                border: 'none',
                fontSize: '14px',
                width: '100%',
                outline: 'none',
              }}
            />
            <div style={{ padding: '10px', backgroundColor: dashboardColors.secondary }}>
              <Calendar size={18} color={dashboardColors.primary} />
            </div>
          </div> */}
        </div>
      </div>

      {/* Directory Table Section */}
      <div style={{
        backgroundColor: dashboardColors.white,
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          backgroundColor: dashboardColors.secondary,
          borderRadius: '8px',
          marginBottom: '16px',
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: dashboardColors.primary,
            margin: 0,
          }}>
            Directory
          </h3>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: dashboardColors.primary,
            color: dashboardColors.white,
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}>
            <Download size={16} />
            Export
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="dashboard-table" style={{ width: '100%', minWidth: '900px' }}>
            <thead>
              <tr>
                <th>Identity</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joining Date</th>
                <th>Email</th>
                <th>Phone No.</th>
                <th>Sponsored By</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No employees found</td>
                </tr>
              ) : (
                filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ fontWeight: '500' }}>{item.name || 'N/A'}</div>
                      <div style={{ fontSize: '13px', color: dashboardColors.textLight }}>
                        {item.code || 'N/A'}
                      </div>
                    </td>
                    <td>{item.role?.name || 'N/A'}</td>
                    <td>
                      <span className={`status-badge ${item.status === 'active' ? 'status-completed' : 'status-pending'}`}>
                        {item.status === 'active' ? '● Active' : '● InActive'}
                      </span>
                    </td>
                    <td>{item.doj ? new Date(item.doj).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</td>
                    <td>{item.email || 'N/A'}</td>
                    <td>{item.phone || 'N/A'}</td>
                    <td>{item.sponser?.name || '(No Sponsor)'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DirectoryManagement;