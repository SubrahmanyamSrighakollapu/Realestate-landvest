import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, Pencil, Trash2 } from 'lucide-react';
import dashboardColors from '../../styles/colors';
import Pagination from '../../components/common/Pagination';
import { employeeService } from '../../../services/employeeService';
import { toastService } from '../../../services/toastService';
import { authService } from '../../../services/authService';
import { reportService } from '../../../services/reportService';


const TeamAndRoles = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [teamMembers, setTeamMembers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    totalSales: 0,
    commissionEarned: 0,
    pendingCommission: 0,
    teamSize: 0
  });
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchTransactionReport();
    const employeeInfo = authService.getEmployeeData();
    if (employeeInfo && employeeInfo.role && employeeInfo.role.name === 'Admin') {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, itemsPerPage, debouncedSearch]);

  const fetchEmployees = async () => {
    try {
      const response = await employeeService.listEmployees({
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearch
      });
      if (response.success) {
        setTeamMembers(response.data || []);
        setTotalItems(response.totalCount ?? (response.data ? response.data.length : 0));
      }
    } catch (error) {
      toastService.error('Failed to load employees');
    }
  };

  const fetchTransactionReport = async () => {
    try {
      const response = await reportService.getTransactionReport();
      if (response.success) {
        const transactions = response.data;
        
        const totalSales = transactions.reduce((sum, txn) => 
          sum + (txn.lead?.basePrice || 0), 0
        );
        
        const commissionEarned = transactions
          .filter(txn => txn.status === 'paid')
          .reduce((sum, txn) => sum + (txn.advanceAmount || 0), 0);
        
        const pendingCommission = transactions
          .filter(txn => txn.status === 'pending')
          .reduce((sum, txn) => sum + (txn.nextPayAmount || 0), 0);
        
        const pendingCount = transactions.filter(txn => txn.status === 'pending').length;
        
        setStats({
          totalSales,
          commissionEarned,
          pendingCommission,
          teamSize: teamMembers.length,
          pendingCount
        });
      }
    } catch (error) {
      toastService.error('Failed to load transaction report');
    }
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
              Team & Roles
            </h1>
            <p style={{
              fontSize: '14px',
              color: dashboardColors.textLight,
              marginTop: '4px',
            }}>
              Manage project associates and manager commissions specifically for the Orchid Gardens development phase.
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

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {[
          { label: 'Total Sales', value: `₹${stats.totalSales.toLocaleString('en-IN')}`, sub: '' },
          { label: 'Commission Earned', value: `₹${stats.commissionEarned.toLocaleString('en-IN')}`, sub: '' },
          { label: 'Pending Commission', value: `₹${stats.pendingCommission.toLocaleString('en-IN')}`, sub: `${stats.pendingCount || 0} transactions awaiting payment` },
          { label: 'Team Size', value: `${teamMembers.length}`, sub: 'Active members' },
        ].map((stat, i) => (
          <div key={i} style={{
            backgroundColor: dashboardColors.white,
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <p style={{
              fontSize: '13px',
              color: dashboardColors.textLight,
              margin: '0 0 8px 0',
            }}>
              {stat.label}
            </p>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '700',
              color: dashboardColors.text,
              margin: '0 0 4px 0',
            }}>
              {stat.value}
            </h3>
            {stat.sub && (
              <p style={{
                fontSize: '12px',
                color: dashboardColors.textLight,
                marginTop: '4px',
              }}>
                {stat.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Associate Roster Table */}
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
            Associate Roster
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
                <th>Name</th>
                <th>Current Role</th>
                <th>Commission %</th>
                <th>Status</th>
                {isAdmin && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {teamMembers.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? "5" : "4"} style={{ textAlign: 'center', padding: '40px' }}>No employees found</td>
                </tr>
              ) : (
                teamMembers.map((member) => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.role?.name || 'N/A'}</td>
                  <td>{member.role?.percentage || 0}%</td>
                  <td>
                    <span className={`status-badge ${member.status === 'active' ? 'status-completed' : 'status-pending'}`}>
                      {member.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  {isAdmin && (
                    <td>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          title="Edit"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: dashboardColors.primary,
                          }}
                          onClick={() => navigate(`/dashboard/org-tree/change-role/${member._id}`)}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          title="Delete"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#ef4444',
                          }}
                          onClick={() => {
                            if (window.confirm(`Remove ${member.name}?`)) {
                              console.log('Delete', member.name);
                            }
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              )))}
            </tbody>
          </table>
        </div>

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

export default TeamAndRoles;