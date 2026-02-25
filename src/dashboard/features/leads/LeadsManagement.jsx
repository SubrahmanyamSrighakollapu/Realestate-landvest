import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, UserCheck, UserX, UserPlus, Search, Filter, Download
} from 'lucide-react';
import dashboardColors from '../../styles/colors';
import Pagination from '../../components/common/Pagination';
import { leadService } from '../../../services/leadService';
import { TableShimmer, CardShimmer } from '../../../components/loaders/ShimmerLoader';
import { permissionService } from '../../../services/permissionService';
import { toastService } from '../../../services/toastService';

const LeadsManagement = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, new: 0 });
  const [canEdit, setCanEdit] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchLeads();
    const isAdmin = permissionService.isAdmin();
    setCanEdit(isAdmin || permissionService.canEdit('Leads'));
  }, [currentPage]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await leadService.getLeadReports({ exportExcel: 0 });
      if (response.data.success) {
        setLeads(response.data.data);
        setFilteredLeads(response.data.data);
        setTotalItems(response.data.data.length);
        calculateStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const active = data.filter(l => l.status === 'active').length;
    const inactive = data.filter(l => l.status === 'inactive').length;
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    const newLeads = data.filter(l => new Date(l.createdAt) >= tenDaysAgo).length;
    setStats({ total, active, inactive, new: newLeads });
  };

  useEffect(() => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(l => 
        l.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.mobile.includes(searchTerm)
      );
    }

    setFilteredLeads(filtered);
    setTotalItems(filtered.length);
  }, [searchTerm, leads]);

  const getLeadStatusColor = (statusName) => {
    const colors = {
      'Hot': { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
      'Cold': { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
      'Warm': { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
      'In Progress': { bg: '#e0e7ff', text: '#3730a3', border: '#a5b4fc' },
      'Follow up': { bg: '#fce7f3', text: '#831843', border: '#f9a8d4' },
      'Won': { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
      'Lost': { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
      'Closed': { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' }
    };
    return colors[statusName] || { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
  };

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
              Leads Management
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
                onClick={() => navigate('/dashboard/leads/add')}
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
                + Add Lead
              </button>
            )}

            {/* <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: dashboardColors.button,
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
          { icon: Users, label: 'Total Leads', value: stats.total, bg: dashboardColors.secondary },
          { icon: UserCheck, label: 'Active This month', value: stats.active, bg: dashboardColors.secondary },
          { icon: UserX, label: 'InActive This month', value: stats.inactive, bg: dashboardColors.secondary },
          { icon: UserPlus, label: 'New Leads', value: stats.new, bg: dashboardColors.secondary },
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
              placeholder="Search by ID, Name, Email, Mobile..."
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
            Leads Report
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
              onClick={async () => {
                try {
                  const response = await leadService.getLeadReports({ exportExcel: 1 });
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', `leads-report-${new Date().getTime()}.xlsx`);
                  document.body.appendChild(link);
                  link.click();
                  link.remove();
                  window.URL.revokeObjectURL(url);
                  toastService.success('Leads report exported successfully');
                } catch (error) {
                  console.error('Error exporting leads:', error);
                  toastService.error('Failed to export leads report');
                }
              }}
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
          <TableShimmer rows={10} columns={9} />
        ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="dashboard-table" style={{ width: '100%', minWidth: '900px' }}>
            <thead>
              <tr>
                <th>Lead Code</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Source Type</th>
                <th>Lead Status</th>
                {/* <th>Status</th> */}
                {canEdit && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={canEdit ? "8" : "7"} style={{ textAlign: 'center', padding: '40px' }}>Loading...</td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={canEdit ? "8" : "7"} style={{ textAlign: 'center', padding: '40px' }}>No leads found</td>
                </tr>
              ) : (
                filteredLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((lead) => (
                  <tr key={lead._id}>
                    <td>{lead.code}</td>
                    <td>{lead.firstName} {lead.lastName}</td>
                    <td>{lead.email}</td>
                    <td>{lead.mobile}</td>
                    <td style={{ textTransform: 'capitalize' }}>{lead.sourceType}</td>
                    <td>
                      {lead.leadStatus?.name ? (
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: getLeadStatusColor(lead.leadStatus.name).bg,
                          color: getLeadStatusColor(lead.leadStatus.name).text,
                          border: `1px solid ${getLeadStatusColor(lead.leadStatus.name).border}`,
                          display: 'inline-block'
                        }}>
                          {lead.leadStatus.name}
                        </span>
                      ) : 'N/A'}
                    </td>
                    {/* <td>
                      <span className={`status-badge ${lead.status === 'active' ? 'status-completed' : 'status-pending'}`}>
                        {lead.status === 'active' ? '● Active' : '● InActive'}
                      </span>
                    </td> */}
                    {canEdit && (
                      <td>
                        <button
                          onClick={() => navigate(`/dashboard/leads/edit/${lead._id}`)}
                          style={{
      padding: '8px 12px',   
      backgroundColor: dashboardColors.primary,
      color: dashboardColors.white,
      border: 'none',
      borderRadius: '6px',
      fontSize: '12px',
      cursor: 'pointer',
      whiteSpace: 'nowrap',  
    }}
                        >
                          Lead Status
                        </button>
                      </td>
                    )}
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
        />
      </div>
    </div>
  );
};

export default LeadsManagement;
