import { Users, UserCheck, UserX, UserPlus, Search, Filter, Download } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/global.css';

const Associates = () => {
  const statsCards = [
    { icon: Users, label: 'Total Associates', value: '247', color: '#3b82f6' },
    { icon: UserCheck, label: 'Active Associates', value: '180', color: '#10b981' },
    { icon: UserX, label: 'In Active Associates', value: '13', color: '#ef4444' },
    { icon: UserPlus, label: 'New Associates', value: '13', color: '#8b5cf6' }
  ];

  const topPerformingData = [
    { name: 'Rajesh', value: 5000 },
    { name: 'Priya', value: 6000 },
    { name: 'Amit', value: 8500 },
    { name: 'Sneha', value: 7200 }
  ];

  const pieData = [
    { name: 'Active', value: 86, color: '#10b981' },
    { name: 'In Active', value: 14, color: '#ef4444' }
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
    { id: 'TXN001', name: 'Rajesh Kumar', project: 'Green Valley - Plot A12', amount: '₹4,50,000', date: '2026-01-25', status: 'Completed' },
    { id: 'TXN002', name: 'Priya Sharma', project: 'Lake View - Plot C18', amount: '₹6,80,000', date: '2026-01-25', status: 'Pending' },
    { id: 'TXN003', name: 'Rajesh Kumar', project: 'Green Valley - Plot A12', amount: '₹4,50,000', date: '2026-01-25', status: 'Completed' },
    { id: 'TXN004', name: 'Priya Sharma', project: 'Lake View - Plot C18', amount: '₹6,80,000', date: '2026-01-25', status: 'Pending' }
  ];

  return (
    <div>
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
              backgroundColor: `${stat.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <stat.icon size={24} color={stat.color} />
            </div>
            <div>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{stat.label}</p>
              <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', margin: '4px 0 0 0' }}>{stat.value}</h3>
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
                  <p style={{ fontSize: '12px', color: '#6b7280', marginLeft: '20px' }}>Remaining - 2 Months</p>
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
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>Active vs Inactive Associates Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="active" fill="#10b981" name="Active Associates" radius={[8, 8, 0, 0]} />
              <Bar dataKey="inactive" fill="#ef4444" name="Inactive Associates" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
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
          View All Associates
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
      </div>

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
              <tr>
                <td>Priya Sharma</td>
                <td>Agent</td>
                <td>₹6,80,000</td>
              </tr>
              <tr>
                <td>Priya Sharma</td>
                <td>Agent</td>
                <td>₹6,80,000</td>
              </tr>
              <tr>
                <td>Priya Sharma</td>
                <td>Agent</td>
                <td>₹6,80,000</td>
              </tr>
              <tr>
                <td>Priya Sharma</td>
                <td>Agent</td>
                <td>₹6,80,000</td>
              </tr>
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
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', marginTop: '6px', flexShrink: 0 }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>Payment Received</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>2 min ago</span>
                </div>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Received ₹6,80,000 for Plot A12 From Priya</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6', marginTop: '6px', flexShrink: 0 }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>New Associate Added</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>1 hour ago</span>
                </div>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Priya Sharma joined as Relationship Manager.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6', marginTop: '6px', flexShrink: 0 }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>Project Updated</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>3 hour ago</span>
                </div>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>New layout uploaded for Sunshine Valley project.</p>
              </div>
            </div>
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
              <td>Rajesh Kumar</td>
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
              <td>Rajesh Kumar</td>
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
      </div>

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
      </div>
    </div>
  );
};

export default Associates;
