import { useState, useEffect } from 'react';
import { Users, UserCheck, TrendingUp, TrendingDown, Search, Download, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/common/Pagination';
import { permissionService } from '../../../services/permissionService';
import { reportService } from '../../../services/reportService';
import { authService } from '../../../services/authService';
import { toastService } from '../../../services/toastService';
import '../../styles/global.css';
import dashboardColors from '../../styles/colors';


const AssociateReports = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [canDownload, setCanDownload] = useState(false);
  const [associates, setAssociates] = useState([]);
  const [filteredAssociates, setFilteredAssociates] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    totalTeamSize: 0,
    totalSales: 0,
    totalCommission: 0
  });
  const [roleGroups, setRoleGroups] = useState([]);
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const isAdmin = permissionService.isAdmin();
    setCanDownload(isAdmin || permissionService.canDownload('Reports'));
    fetchAssociatesReport();
  }, []);

  const fetchAssociatesReport = async () => {
    try {
      const [associatesRes, transactionsRes] = await Promise.all([
        reportService.getAssociatesReport({}),
        reportService.getTransactionReport({})
      ]);
      
      if (associatesRes.success) {
        const loggedInUser = authService.getEmployeeData();
        const filteredData = associatesRes.data.filter(assoc => assoc.code !== loggedInUser?.code);
        
        setAssociates(filteredData);
        setFilteredAssociates(filteredData);
        
        const activeCount = filteredData.filter(a => a.status === 'active').length;
        const totalTeamSize = filteredData.reduce((sum, a) => sum + (a.teamSize || 0), 0);
        
        let totalSales = 0;
        let totalCommission = 0;
        
        if (transactionsRes.success) {
          totalSales = transactionsRes.data.reduce((sum, txn) => 
            sum + (txn.lead?.basePrice || 0), 0
          );
          
          totalCommission = transactionsRes.data
            .filter(txn => txn.status === 'paid')
            .reduce((sum, txn) => sum + (txn.advanceAmount || 0), 0);
        }
        
        setStats({
          total: filteredData.length,
          active: activeCount,
          totalTeamSize,
          totalSales,
          totalCommission
        });
        
        const roleMap = {};
        let totalRoleMembers = 0;
        filteredData.forEach(assoc => {
          const roleName = assoc.role?.name || 'Unknown';
          if (!roleMap[roleName]) {
            roleMap[roleName] = { name: roleName, members: 0 };
          }
          roleMap[roleName].members += 1;
          totalRoleMembers += 1;
        });
        
        const sortedRoles = Object.values(roleMap)
          .sort((a, b) => b.members - a.members)
          .slice(0, 10);
        
        const colors = ['#ef4444', '#10b981', '#8b5cf6', '#f59e0b', '#3b82f6'];
        
        setRoleGroups(sortedRoles.map((role, i) => ({
          ...role,
          percentage: totalRoleMembers > 0 ? (role.members / totalRoleMembers) * 100 : 0,
          color: colors[i % colors.length]
        })));
      }
    } catch (error) {
      toastService.error('Failed to load associates report');
    }
  };

  const handleExport = async () => {
    setExportLoading(true);
    try {
      const response = await reportService.exportAssociatesReport();
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
      toastService.error('Failed to export associates report');
    } finally {
      setExportLoading(false);
    }
  };

  const statsCards = [
    { icon: Users, label: 'Total Associates', value: stats.total.toString(), color: '#3b82f6' },
    { icon: UserCheck, label: 'Active Associates', value: stats.active.toString(), color: '#10b981' },
    { icon: Users, label: 'Total Team Size', value: stats.totalTeamSize.toString(), color: '#8b5cf6' },
    { icon: TrendingUp, label: 'Total Sales', value: `₹${stats.totalSales.toLocaleString('en-IN')}`, color: '#10b981' },
    { icon: TrendingUp, label: 'Total Commission', value: `₹${stats.totalCommission.toLocaleString('en-IN')}`, color: '#f59e0b' },
    { icon: TrendingDown, label: 'Inactive Associates', value: (stats.total - stats.active).toString(), color: '#ef4444' }
  ];

  const activePercentage = stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0;
  const inactivePercentage = stats.total > 0 ? 100 - activePercentage : 0;

  const pieData = stats.total > 0 ? [
    { name: 'Active', value: activePercentage, color: '#10b981' },
    { name: 'In Active', value: inactivePercentage, color: '#ef4444' }
  ] : [];

  const paginatedAssociates = filteredAssociates
    .filter(assoc => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        assoc.code?.toLowerCase().includes(search) ||
        assoc.name?.toLowerCase().includes(search) ||
        assoc.role?.name?.toLowerCase().includes(search) ||
        assoc.phone?.toLowerCase().includes(search) ||
        assoc.sponser?.name?.toLowerCase().includes(search)
      );
    })
    .slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  const filteredTotal = filteredAssociates.filter(assoc => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      assoc.code?.toLowerCase().includes(search) ||
      assoc.name?.toLowerCase().includes(search) ||
      assoc.role?.name?.toLowerCase().includes(search) ||
      assoc.phone?.toLowerCase().includes(search) ||
      assoc.sponser?.name?.toLowerCase().includes(search)
    );
  }).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--dashboard-text)', margin: '0 0 8px 0' }}>
            Associate Reports
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--dashboard-text-light)', margin: 0 }}>
            Analyze team growth, status & hierarchy movement
          </p>
        </div>
        {canDownload && (
          <button 
            onClick={handleExport}
            disabled={exportLoading}
            style={{
            padding: '10px 24px',
            backgroundColor: 'var(--dashboard-primary)',
            color: 'var(--dashboard-white)',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: exportLoading ? 'not-allowed' : 'pointer',
            opacity: exportLoading ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Download size={18} />
            {exportLoading ? 'Exporting...' : 'Export'}
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {statsCards.map((stat, index) => (
          <div key={index} style={{
            backgroundColor: 'var(--dashboard-white)',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: `${stat.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <stat.icon size={24} color={stat.color} />
            </div>
            <div>
              <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: 0 }}>{stat.label}</p>
              <h3 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--dashboard-text)', margin: '4px 0 0 0' }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{
          backgroundColor: 'var(--dashboard-white)',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', marginBottom: '20px' }}>
            Associates Status Overview
          </h3>
          {stats.total === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--dashboard-text-light)' }}>
              <p style={{ fontSize: '14px', margin: 0 }}>No associates data available</p>
            </div>
          ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ value }) => `${value}%`}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {pieData.map((item, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color }}></div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)' }}>
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--dashboard-text-light)', marginLeft: '20px', margin: 0 }}>
                    {item.name === 'Active' ? 'Currently active users' : 'Non Activity - 2 months'}
                  </p>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>

        <div style={{
          backgroundColor: 'var(--dashboard-white)',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', margin: '0 0 4px 0' }}>
              Top 10 Teams by Designation
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: 0 }}>
              Based on percentage of total associates
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--dashboard-text-light)', paddingBottom: '8px', borderBottom: '1px solid var(--dashboard-border)' }}>
              <span>Designation Name</span>
              <span>Members</span>
            </div>
            {(showAllRoles ? roleGroups : roleGroups.slice(0, 3)).map((team, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)' }}>{team.name}</span>
                  <span style={{ fontSize: '13px', color: 'var(--dashboard-text-light)' }}>{team.members} Members ({team.percentage.toFixed(1)}%)</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'var(--dashboard-border)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${team.percentage}%`,
                    height: '100%',
                    backgroundColor: team.color,
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
            ))}
            {roleGroups.length > 3 && (
              <button 
                onClick={() => setShowAllRoles(!showAllRoles)}
                style={{
                alignSelf: 'flex-end',
                padding: '6px 16px',
                backgroundColor: 'transparent',
                color: 'var(--dashboard-primary)',
                border: 'none',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                {showAllRoles ? 'See Less' : 'See More'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--dashboard-white)',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
            <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by ID, Name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '50%',
                padding: '10px 10px 10px 40px',
                border: '1px solid var(--dashboard-border)',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* <div style={{ position: 'relative', minWidth: '180px' }}>
            <Calendar size={18} color="#9ca3af" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Start Date"
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => !e.target.value && (e.target.type = 'text')}
              style={{
                width: '80%',
                padding: '10px 40px 10px 12px',
                border: '1px solid var(--dashboard-border)',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ position: 'relative', minWidth: '180px' }}>
            <Calendar size={18} color="#9ca3af" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="End Date"
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => !e.target.value && (e.target.type = 'text')}
              style={{
                width: '80%',
                padding: '10px 40px 10px 12px',
                border: '1px solid var(--dashboard-border)',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <select style={{
            padding: '10px 16px',
            border: '1px solid var(--dashboard-border)',
            borderRadius: '8px',
            fontSize: '14px',
            minWidth: '160px',
            outline: 'none'
          }}>
            <option>All Sponsors</option>
          </select> */}
        </div>

        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', marginBottom: '16px' }}>
          Associates List
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Designation</th>
                <th>Name</th>
                <th>Date Of Join</th>
                {/* <th>Email</th> */}
                <th>Phone no.</th>
                <th>Sponsored By</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAssociates.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>No associates found</td>
                </tr>
              ) : (
                paginatedAssociates.map((assoc) => (
                  <tr key={assoc._id}>
                    <td>{assoc.code}</td>
                    <td>{assoc.role?.name || 'N/A'}</td>
                    <td>{assoc.name}</td>
                    <td>{assoc.doj ? new Date(assoc.doj).toLocaleDateString('en-GB') : '-'}</td>
                    {/* <td>{assoc.email}</td> */}
                    <td>{assoc.phone}</td>
                    <td>{assoc.sponser?.name || '-'}</td>
                    <td>
                      <button 
                        onClick={() => navigate(`/dashboard/associates/${assoc.code}`, { state: { from: '/dashboard/reports/associates' } })}
                        style={{
                        padding: '6px 12px',
                                                  backgroundColor: dashboardColors.primary,
                                                  color: dashboardColors.white,
                                                  border: 'none',
                                                  borderRadius: '6px',
                                                  fontSize: '13px',
                                                  cursor: 'pointer',
                      }}>
                        View profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredTotal}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default AssociateReports;
