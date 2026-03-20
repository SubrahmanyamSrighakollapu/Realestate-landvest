import { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, UserPlus, Search, Filter, Download } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { authService } from '../../../services/authService';
import { organizationService } from '../../../services/organizationService';
import { toastService } from '../../../services/toastService';
import { permissionService } from '../../../services/permissionService';
import { dashboardService } from '../../../services/dashboardService';
import Pagination from '../../components/common/Pagination';
import '../../styles/global.css';

const Associates = () => {
  const [dashboardData, setDashboardData] = useState({
    totalCount: 0,
    activeCount: 0,
    inactiveCount: 0,
    newCount: 0
  });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [associatesData, setAssociatesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [topPerformersData, setTopPerformersData] = useState([]);
  const [associatesStatusData, setAssociatesStatusData] = useState({ 
    activePercentage: 86, 
    inactivePercentage: 14,
    activeCount: 0,
    inactiveCount: 0
  });
  const [newAssociatesData, setNewAssociatesData] = useState([]);
  const [salesOverviewData, setSalesOverviewData] = useState([]);
  const [canDownload, setCanDownload] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchDashboardData();
    fetchAssociatesReport();
    fetchTopPerformers();
    fetchAssociatesStatus();
    fetchNewAssociates();
    fetchSalesOverview();
    fetchRecentActivity();
    const isAdmin = permissionService.isAdmin();
    const downloadPermission = isAdmin || permissionService.canDownload('Associates');
    console.log('Associates Download Permission:', downloadPermission);
    setCanDownload(downloadPermission);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = authService.getToken();
      const response = await axios.post(
        'https://api.landvestinfra.com/api/v1/admin/dashboard/employees',
        { startDate: startDate, endDate: endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchAssociatesReport = async () => {
    try {
      const response = await organizationService.getAssociatesReport(
        1,
        1000,
        startDate,
        endDate,
        0
      );
      if (response.data.success) {
        setAssociatesData(response.data.data);
      }
    } catch (error) {
      toastService.error('Failed to load associates report');
    }
  };

  const handleExport = async () => {
    try {
      const response = await organizationService.getAssociatesReport(
        1,
        1000,
        startDate,
        endDate,
        1
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `associates-report-${new Date().getTime()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toastService.success('Report exported successfully');
    } catch (error) {
      toastService.error('Failed to export report');
    }
  };

  const fetchTopPerformers = async () => {
    try {
      const token = authService.getToken();
      const response = await axios.post(
        'https://api.landvestinfra.com/api/v1/admin/dashboard/associates',
        { startDate: startDate, endDate: endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setTopPerformersData(response.data.data.slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching top performers:', error);
    }
  };

  const fetchAssociatesStatus = async () => {
    try {
      const token = authService.getToken();
      const response = await axios.post(
        'https://api.landvestinfra.com/api/v1/admin/dashboard/associatescount',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setAssociatesStatusData({
          activePercentage: parseFloat(response.data.data.activePercentage),
          inactivePercentage: parseFloat(response.data.data.inactivePercentage),
          activeCount: response.data.data.activeCount,
          inactiveCount: response.data.data.inactiveCount
        });
      }
    } catch (error) {
      console.error('Error fetching associates status:', error);
    }
  };

  const fetchNewAssociates = async () => {
    try {
      const token = authService.getToken();
      const response = await axios.post(
        'https://api.landvestinfra.com/api/v1/admin/dashboard/newassociates',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setNewAssociatesData(response.data.data.map(item => ({
          month: item.month.split(' ')[0],
          value: item.count
        })));
      }
    } catch (error) {
      console.error('Error fetching new associates:', error);
    }
  };

  const fetchSalesOverview = async () => {
    try {
      const token = authService.getToken();
      const response = await axios.post(
        'https://api.landvestinfra.com/api/v1/admin/dashboard/salesoverview',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setSalesOverviewData(response.data.data.map(item => ({
          month: item.month.split(' ')[0],
          active: item.totalCollected
        })));
      }
    } catch (error) {
      console.error('Error fetching sales overview:', error);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const response = await dashboardService.getLatestLeads();
      if (response.success) {
        setRecentActivity(response.data.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  const handleApplyFilter = () => {
    fetchDashboardData();
    fetchAssociatesReport();
    fetchTopPerformers();
    fetchAssociatesStatus();
    fetchNewAssociates();
    fetchSalesOverview();
    fetchRecentActivity();
  };

  const statsCards = [
    { icon: Users, label: 'Total Associates', value: dashboardData.totalCount },
    { icon: UserCheck, label: 'Active Associates', value: dashboardData.activeCount },
    { icon: UserX, label: 'In Active Associates', value: dashboardData.inactiveCount },
    { icon: UserPlus, label: 'New Associates', value: dashboardData.newCount }
  ];

  const topPerformingData = topPerformersData.map(item => ({
    name: item.name,
    value: item.totalAdvance
  }));

  const pieData = [
    { name: 'Active', value: associatesStatusData.activePercentage, color: '#10b981' },
    { name: 'In Active', value: associatesStatusData.inactivePercentage, color: '#ef4444' }
  ];



  const transactions = [
    { id: 'TXN001', name: 'Arun Kumar', project: 'Green Valley - Plot A12', amount: '₹4,50,000', date: '2026-01-25', status: 'Completed' },
    { id: 'TXN002', name: 'Priya Sharma', project: 'Lake View - Plot C18', amount: '₹6,80,000', date: '2026-01-25', status: 'Pending' },
    { id: 'TXN003', name: 'Arun Kumar', project: 'Green Valley - Plot A12', amount: '₹4,50,000', date: '2026-01-25', status: 'Completed' },
    { id: 'TXN004', name: 'Priya Sharma', project: 'Lake View - Plot C18', amount: '₹6,80,000', date: '2026-01-25', status: 'Pending' }
  ];

  return (
    <div>
      {/* Date Filter */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: '14px', color: '#6b7280', marginRight: '8px' }}>Start Date:</label>
          <input
            type="date"
            value={startDate}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: '14px', color: '#6b7280', marginRight: '8px' }}>End Date:</label>
          <input
            type="date"
            value={endDate}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>
        <button
          onClick={handleApplyFilter}
          style={{
            padding: '8px 20px',
            backgroundColor: 'var(--dashboard-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Apply
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {statsCards.map((stat, index) => (
          <div key={index} style={{
            backgroundColor: '#fff',
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
              backgroundColor: 'var(--dashboard-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <stat.icon size={24} color="var(--dashboard-primary)" />
            </div>
            <div>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{stat.label}</p>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: '4px 0 0 0' }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>Analytics Overview</h3>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>Top Performing Associates (Payments)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topPerformingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>Associates Status Overview</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <ResponsiveContainer width="60%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div>
              {pieData.map((item, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color }}></div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{item.name} ({item.value}%)</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginLeft: '20px' }}>
                    {item.name === 'Active' ? `${associatesStatusData.activeCount} Associates` : `${associatesStatusData.inactiveCount} Associates`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>New Associates</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={newAssociatesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>Total Sales Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salesOverviewData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="active" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        {/* <button style={{
          padding: '10px 24px',
          backgroundColor: 'var(--dashboard-primary)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          View All Associates
        </button> */}
      </div>

      {/* <div style={{
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Transaction Report</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              padding: '8px 16px',
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#374151'
            }}>
              <Filter size={16} />
              Filters
            </button>
            <button style={{
              padding: '8px 16px',
              backgroundColor: 'var(--dashboard-primary)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#fff'
            }}>
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '16px', position: 'relative' }}>
          <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search here..."
            style={{
              width: '90%',
              padding: '10px 10px 10px 40px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Associate Name</th>
              <th>Project / Plot</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index}>
                <td>{txn.id}</td>
                <td>{txn.name}</td>
                <td>{txn.project}</td>
                <td>{txn.amount}</td>
                <td>{txn.date}</td>
                <td>
                  <span className={`status-badge ${txn.status === 'Completed' ? 'status-completed' : 'status-pending'}`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '24px' }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>Top Performers</h3>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Sales Value</th>
              </tr>
            </thead>
            <tbody>
              {topPerformersData.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>No data available</td>
                </tr>
              ) : (
                topPerformersData.map((performer, index) => (
                  <tr key={index}>
                    <td>{performer.name}</td>
                    <td>{performer.roleName}</td>
                    <td>₹{performer.totalAdvance.toLocaleString('en-IN')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivity.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#6b7280', textAlign: 'center', padding: '20px' }}>No recent activity</p>
            ) : (
              recentActivity.map((activity, index) => {
                const colors = ['#10b981', '#3b82f6', '#8b5cf6'];
                const timeAgo = new Date(activity.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                return (
                  <div key={activity._id} style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors[index % 3], marginTop: '6px', flexShrink: 0 }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{activity.description}</span>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>{timeAgo}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                        {activity.lead?.firstName} {activity.lead?.lastName} - {activity.lead?.project?.title}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginTop: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Associates Overview</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* <button style={{
              padding: '8px 16px',
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#374151'
            }}>
              <Filter size={16} />
              Filters
            </button> */}
            {canDownload && (
              <button
                onClick={handleExport}
                style={{
                padding: '8px 16px',
                backgroundColor: 'var(--dashboard-primary)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#fff'
              }}>
                <Download size={16} />
                Export
              </button>
            )}
          </div>
        </div>

        <div style={{ marginBottom: '16px', position: 'relative' }}>
          <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search here..."
            style={{
              width: '90%',
              padding: '10px 10px 10px 40px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Associate ID</th>
              <th>Associate Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Leads Count</th>
              <th>Sale Rs</th>
              <th>Total Commission</th>
              <th>Team Size</th>
              <th>Team Sales</th>
            </tr>
          </thead>
          <tbody>
            {associatesData.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', padding: '40px' }}>No data available</td>
              </tr>
            ) : (
              associatesData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((associate) => (
                <tr key={associate._id}>
                  <td>{associate.sno}</td>
                  <td>{associate.code}</td>
                  <td>{associate.name}</td>
                  <td>{associate.role?.name || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${associate.status === 'active' ? 'status-completed' : 'status-pending'}`}>
                      {associate.status === 'active' ? 'Active' : 'InActive'}
                    </span>
                  </td>
                  <td>{associate.leadsCount}</td>
                  <td>₹{associate.saleRs?.toLocaleString('en-IN') || 0}</td>
                  <td>₹{associate.totalCommitioN?.toLocaleString('en-IN') || 0}</td>
                  <td>{associate.teamSize}</td>
                  <td>{associate.teamSales}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalItems={associatesData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
{/* 
      <div style={{
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginTop: '24px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>Plot Availability</h3>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Plot ID</th>
              <th>Project Name</th>
              <th>Location</th>
              <th>Size</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PLT001</td>
              <td>Green Valley</td>
              <td>Sector 21, Hyderabad</td>
              <td>200 sq yd</td>
              <td>₹4,50,000</td>
              <td><span className="status-badge status-completed">Active</span></td>
            </tr>
            <tr>
              <td>PLT002</td>
              <td>Lake View</td>
              <td>Sector 41, Hyderabad</td>
              <td>180 sq yd</td>
              <td>₹6,80,000</td>
              <td><span className="status-badge status-pending">InActive</span></td>
            </tr>
            <tr>
              <td>PLT003</td>
              <td>Green Valley</td>
              <td>Sector 21, Hyderabad</td>
              <td>200 sq yd</td>
              <td>₹4,50,000</td>
              <td><span className="status-badge status-completed">Active</span></td>
            </tr>
            <tr>
              <td>PLT004</td>
              <td>Lake View</td>
              <td>Sector 41, Hyderabad</td>
              <td>180 sq yd</td>
              <td>₹6,80,000</td>
              <td><span className="status-badge status-pending">InActive</span></td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default Associates;
