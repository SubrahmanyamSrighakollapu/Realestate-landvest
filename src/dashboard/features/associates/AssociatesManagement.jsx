import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, UserCheck, UserX, UserPlus, Search, Filter, Download, ChevronUp, ChevronDown
} from 'lucide-react';
import dashboardColors from '../../styles/colors';
import Pagination from '../../components/common/Pagination';
import { employeeService } from '../../../services/employeeService';
import { designationService } from '../../../services/designationService';
import { organizationService } from '../../../services/organizationService';
import { toastService } from '../../../services/toastService';
import { TableShimmer, CardShimmer } from '../../../components/loaders/ShimmerLoader';
import { permissionService } from '../../../services/permissionService';

const AssociatesManagement = () => {
  const navigate = useNavigate();
  const [associates, setAssociates] = useState([]);
  const [filteredAssociates, setFilteredAssociates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, new: 0 });
  const [canEdit, setCanEdit] = useState(false);
  const [dojSort, setDojSort] = useState('desc');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleExport = async () => {
    try {
      const response = await organizationService.getAssociatesReport(
        1,
        1000,
        '',
        '',
        1
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `associates-report-${new Date().getTime()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toastService.success('Associates report exported successfully');
    } catch (error) {
      console.error('Error exporting associates:', error);
      toastService.error('Failed to export associates report');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchRoles();
    fetchStats();
    const isAdmin = permissionService.isAdmin();
    setCanEdit(isAdmin || permissionService.canEdit('Associates'));
  }, []);

  // Whenever search term or role filter changes, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedRole]);

  // Fetch page data whenever currentPage, itemsPerPage, debouncedSearch, or selectedRole changes
  useEffect(() => {
    fetchAssociates();
  }, [currentPage, itemsPerPage, debouncedSearch, selectedRole]);

  const fetchAssociates = async () => {
    setLoading(true);
    try {
      const response = await employeeService.listEmployees({
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearch,
        role: selectedRole
      });
      if (response.success) {
        setAssociates(response.data || []);
        setTotalItems(response.totalCount ?? (response.data ? response.data.length : 0));
      }
    } catch (error) {
      console.error('Error fetching associates:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await employeeService.listEmployees({ page: 1, limit: 10000 });
      if (response.success && response.data) {
        calculateStats(response.data, response.totalCount);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
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

  const calculateStats = (data, totalCountFromApi) => {
    const total = totalCountFromApi || data.length;
    const active = data.filter(a => a.status === 'active').length;
    const inactive = data.filter(a => a.status === 'inactive').length;
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    const newUsers = data.filter(a => new Date(a.doj) >= tenDaysAgo).length;
    setStats({ total, active, inactive, new: newUsers });
  };

  useEffect(() => {
    let filtered = [...associates];

    if (selectedDate) {
      filtered = filtered.filter(a => {
        if (!a.doj) return false;
        const dojDate = new Date(a.doj).toISOString().split('T')[0];
        return dojDate === selectedDate;
      });
    }

    filtered.sort((a, b) => {
      const dateA = a.doj ? new Date(a.doj) : new Date(0);
      const dateB = b.doj ? new Date(b.doj) : new Date(0);
      return dojSort === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredAssociates(filtered);
  }, [selectedDate, associates, dojSort]);

  return (
    <div style={{ padding: '24px' }}>
      {/* Header Section */}
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
              Associates Management
            </h1>
            <p style={{
              fontSize: '14px',
              color: dashboardColors.textLight,
              marginTop: '8px',
            }}>
              Welcome back, {JSON.parse(sessionStorage.getItem('user'))?.name || 'Admin'} • Last login: {new Date(JSON.parse(sessionStorage.getItem('user'))?.lastLogin || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {new Date(JSON.parse(sessionStorage.getItem('user'))?.lastLogin || new Date()).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {canEdit && (
              <button
                onClick={() => navigate('/dashboard/associates/create')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: dashboardColors.primary,
                  color: dashboardColors.white,
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                <UserPlus size={18} />
                + Add Associate
              </button>
            )}

            {/* <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: dashboardColors.button, // gold-ish
                color: dashboardColors.white,
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              <Download size={18} />
              Bulk Import/Export
            </button> */}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <CardShimmer count={4} />
      ) : (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {[
          { icon: Users, label: 'Total Associates', value: stats.total, bg: dashboardColors.secondary },
          { icon: UserCheck, label: 'Active This month', value: stats.active, bg: dashboardColors.secondary },
          { icon: UserX, label: 'InActive This month', value: stats.inactive, bg: dashboardColors.secondary },
          { icon: UserPlus, label: 'New Associates', value: stats.new, bg: dashboardColors.secondary },
        ].map((stat, i) => (
          <div key={i} style={{
            backgroundColor: dashboardColors.white,
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: stat.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <stat.icon size={24} color={dashboardColors.primary} />
            </div>
            <div>
              <p style={{ fontSize: '13px', color: dashboardColors.textLight, margin: 0 }}>
                {stat.label}
              </p>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: dashboardColors.text, margin: '4px 0 0 0' }}>
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Filters & Search */}
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
          marginBottom: '16px',
        }}>
          <div style={{ flex: '1', minWidth: '220px', position: 'relative' }}>
            <Search size={18} color={dashboardColors.textLight} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
            }} />
            <input
              type="text"
              placeholder="Search by ID, Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '70%',
                padding: '10px 10px 10px 40px',
                border: `1px solid ${dashboardColors.border}`,
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          <select 
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{
            padding: '10px 14px',
            border: `1px solid ${dashboardColors.border}`,
            borderRadius: '6px',
            fontSize: '14px',
            minWidth: '140px',
          }}>
            <option value="">All Roles</option>
            {roles.map(role => (
              <option key={role._id} value={role._id}>{role.name}</option>
            ))}
          </select>

          {/* <select
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
            padding: '10px 14px',
            border: `1px solid ${dashboardColors.border}`,
            borderRadius: '6px',
            fontSize: '14px',
            minWidth: '140px',
          }}>
            <option>Select Date</option>
          </select> */}
        </div>

        {/* Transaction Report Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          padding: '12px 16px',
          backgroundColor: dashboardColors.secondary,
          borderRadius: '8px',
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: dashboardColors.primary,
            margin: 0,
          }}>
            Associates List
          </h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              backgroundColor: dashboardColors.white,
              border: `1px solid ${dashboardColors.border}`,
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
            }}>
              <Filter size={16} />
              Filters
            </button> */}
            <button 
              onClick={handleExport}
              style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              backgroundColor: dashboardColors.button,
              color: dashboardColors.white,
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
            }}>
              <Download size={16} />
              Bulk Export
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <TableShimmer rows={10} columns={7} />
        ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="dashboard-table" style={{ width: '100%', minWidth: '900px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Associate Name</th>
                <th>Role</th>
                <th>Sponsored By</th>
                <th>Mobile Number</th>
                <th>Status</th>
                <th>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Date Of Join
                    <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                      onClick={() => setDojSort(prev => prev === 'desc' ? 'asc' : 'desc')}
                    >
                      <ChevronUp size={13} color={dojSort === 'asc' ? dashboardColors.primary : '#9ca3af'} style={{ marginBottom: '-3px' }} />
                      <ChevronDown size={13} color={dojSort === 'desc' ? dashboardColors.primary : '#9ca3af'} />
                    </div>
                  </div>
                </th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>Loading...</td>
                </tr>
              ) : filteredAssociates.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>No associates found</td>
                </tr>
              ) : (
                filteredAssociates.map((assoc) => (
                  <tr key={assoc._id}>
                    <td>{assoc.code}</td>
                    <td>{assoc.name}</td>
                    <td>{assoc.role?.name || 'N/A'}</td>
                    <td>{assoc.sponser?.name || 'N/A'}</td>
                    <td>{assoc.phone}</td>
                    <td>
                      <span className={`status-badge ${assoc.status === 'active' ? 'status-completed' : 'status-pending'}`}>
                        {assoc.status === 'active' ? '● Active' : '● InActive'}
                      </span>
                    </td>
                    <td>{assoc.doj ? new Date(assoc.doj).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/dashboard/associates/${assoc.code}`)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: dashboardColors.primary,
                          color: dashboardColors.white,
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '13px',
                          cursor: 'pointer',
                        }}
                      >
                        View profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default AssociatesManagement;