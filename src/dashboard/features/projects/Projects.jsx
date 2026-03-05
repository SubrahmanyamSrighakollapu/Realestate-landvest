import { useState, useEffect } from 'react';
import { Search, Download, Filter, FolderKanban, CheckCircle, XCircle, PlusCircle } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { authService } from '../../../services/authService';
import { dashboardService } from '../../../services/dashboardService';
import '../../styles/global.css';

const Projects = () => {
  const [dashboardData, setDashboardData] = useState({
    totalCount: 0,
    activeCount: 0,
    inactiveCount: 0,
    newCount: 0
  });
  const [topPerformersData, setTopPerformersData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    fetchTopPerformers();
    fetchRecentActivity();
  }, []);

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

  const fetchDashboardData = async () => {
    try {
      const token = authService.getToken();
      const response = await axios.post(
        'https://api.landvestinfra.com/api/v1/admin/dashboard/projects',
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

  const statsCards = [
    { icon: FolderKanban, label: 'Total Projects', value: dashboardData.totalCount },
    { icon: CheckCircle, label: 'Active Projects', value: dashboardData.activeCount },
    { icon: XCircle, label: 'In Active Projects', value: dashboardData.inactiveCount },
    { icon: PlusCircle, label: 'New Projects', value: dashboardData.newCount }
  ];

  const plotAvailabilityData = [
    { name: 'Active', value: 50, color: '#3b82f6', label: 'Active (60%)', sublabel: 'Currently Active Plots' },
    { name: 'Sold', value: 33.3, color: '#ef4444', label: 'Sold (33.3%)', sublabel: 'Sold Plots - 2 months' },
    { name: 'Reserved', value: 16.7, color: '#f59e0b', label: 'Reserved (16.7%)', sublabel: 'Reserved Plots 2 months back' }
  ];

  const revenueData = [
    { project: 'Metro Heights', value: 45000 },
    { project: 'Green Valley', value: 55000 },
    { project: 'Sunset Villas', value: 70000 },
    { project: 'Lake View', value: 62000 }
  ];

  const monthlySalesData = [
    { month: 'Jan', value: 50 },
    { month: 'Feb', value: 65 },
    { month: 'March', value: 70 },
    { month: 'April', value: 55 },
    { month: 'May', value: 30 },
    { month: 'June', value: 45 },
    { month: 'July', value: 65 }
  ];

  const projectCompletionData = [
    { name: 'Metro Heights', plots: 120, sold: 82, color: '#10b981', percentage: 68 },
    { name: 'Green Valley Estate', plots: 120, sold: 82, color: '#f59e0b', percentage: 68 },
    { name: 'Sunset Villas', plots: 120, sold: 82, color: '#3b82f6', percentage: 68 }
  ];

    const newAssociatesData = [
    { month: 'Jan', value: 20 },
    { month: 'Feb', value: 35 },
    { month: 'Mar', value: 45 },
    { month: 'Apr', value: 25 },
    { month: 'May', value: 30 },
    { month: 'Jun', value: 40 }
  ];

  const trendData = [
    { month: 'Jan', active: 150, inactive: 20 },
    { month: 'Feb', active: 160, inactive: 18 },
    { month: 'Mar', active: 170, inactive: 15 },
    { month: 'Apr', active: 175, inactive: 14 },
    { month: 'May', active: 180, inactive: 13 },
    { month: 'Jun', active: 180, inactive: 13 }
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
            max={new Date().toISOString().split('T')[0]}
            value={startDate}
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
          onClick={() => {
            fetchDashboardData();
            fetchTopPerformers();
            fetchRecentActivity();
          }}
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

      {/* <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>Plot Availability</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie data={plotAvailabilityData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ value }) => `${value}%`}>
                  {plotAvailabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {plotAvailabilityData.map((item, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color }}></div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{item.label}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginLeft: '20px', margin: 0 }}>{item.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>Revenue Distribution by Project</h3>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>Contribution to total revenue</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="project" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div> */}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>Monthly Sales Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlySalesData}>
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
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>Project Completion Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {projectCompletionData.map((project, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{project.name}</span>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280' }}>
                    <span>{project.plots} plots</span>
                    <span>{project.sold} sold</span>
                  </div>
                </div>
                <div style={{
                  width: '100%',
                  height: '12px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${project.percentage}%`,
                    height: '100%',
                    backgroundColor: project.color,
                    borderRadius: '6px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button style={{
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
          View All Projects
        </button>
      </div>

      <div style={{
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

      {/* <div style={{
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginTop: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Associates Overview</h3>
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
              width: '100%',
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
              <th>Associate ID</th>
              <th>Associate Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Total Sales</th>
              <th>Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ASC001</td>
              <td>Arun Kumar</td>
              <td>Senior Associate</td>
              <td><span className="status-badge status-completed">Active</span></td>
              <td>34</td>
              <td>₹4,50,000</td>
            </tr>
            <tr>
              <td>ASC002</td>
              <td>Priya Sharma</td>
              <td>Associate</td>
              <td><span className="status-badge status-pending">InActive</span></td>
              <td>64</td>
              <td>₹6,80,000</td>
            </tr>
            <tr>
              <td>ASC003</td>
              <td>Arun Kumar</td>
              <td>Senior Associate</td>
              <td><span className="status-badge status-completed">Active</span></td>
              <td>14</td>
              <td>₹4,50,000</td>
            </tr>
            <tr>
              <td>ASC004</td>
              <td>Priya Sharma</td>
              <td>Associate</td>
              <td><span className="status-badge status-pending">InActive</span></td>
              <td>34</td>
              <td>₹6,80,000</td>
            </tr>
          </tbody>
        </table>
      </div> */}

      {/* <div style={{
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

export default Projects;
