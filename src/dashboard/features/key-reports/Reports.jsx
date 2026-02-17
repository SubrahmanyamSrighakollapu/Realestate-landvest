import { Users, DollarSign, UserCheck, Wallet, Search, Filter, Download } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../../styles/global.css';

const Reports = () => {
  const statsCards = [
    { icon: Users, label: 'New Joined', value: '147', color: '#3b82f6' },
    { icon: DollarSign, label: 'Total Sales', value: '₹50,000', color: '#10b981' },
    { icon: UserCheck, label: 'Active Associates', value: '13', color: '#8b5cf6' },
    { icon: Wallet, label: 'Total Commission', value: '₹50,000', color: '#f59e0b' }
  ];

  const distributionData = [
    { name: 'Active', value: 60, color: '#3b82f6', label: 'Active (60%)', sublabel: 'Currently Active' },
    { name: 'Sold', value: 23.2, color: '#ef4444', label: 'Sold (33.2%)', sublabel: 'Sold - 2 months' },
    { name: 'Inactive', value: 16.7, color: '#f59e0b', label: 'Inactive (16.7%)', sublabel: 'Inactive 2 months back' }
  ];

  const salesPerformanceData = [
    { month: 'Jan', value: 30 },
    { month: 'Feb', value: 35 },
    { month: 'March', value: 55 },
    { month: 'April', value: 45 },
    { month: 'May', value: 50 },
    { month: 'June', value: 48 }
  ];

  const newJoineesData = [
    { month: 'Jan', value: 20 },
    { month: 'Feb', value: 35 },
    { month: 'March', value: 45 },
    { month: 'April', value: 25 },
    { month: 'May', value: 30 },
    { month: 'June', value: 40 }
  ];

  const topTeams = [
    { name: 'Platinum Group', members: 150, color: '#ef4444', percentage: 100 },
    { name: 'Platinum Group', members: 100, color: '#10b981', percentage: 67 },
    { name: 'Platinum Group', members: 80, color: '#8b5cf6', percentage: 53 }
  ];

  const topPerformers = [
    { rank: 'ASC001', name: 'Arun Kumar', role: 'Senior Associate', sales: '₹4,50,000', plots: 34, status: 'Active' },
    { rank: 'ASC002', name: 'Priya Sharma', role: 'Associate', sales: '₹6,80,000', plots: 64, status: 'InActive' },
    { rank: 'ASC003', name: 'Arun Kumar', role: 'Senior Associate', sales: '₹4,50,000', plots: 14, status: 'Active' },
    { rank: 'ASC004', name: 'Priya Sharma', role: 'Associate', sales: '₹6,80,000', plots: 34, status: 'InActive' }
  ];

  const newJoinees = [
    { bid: 'ASC001', name: 'Arun Kumar', role: 'Senior Associate', project: 'Metro Heights', date: '2026-01-25', sponsor: 'Priya Sharma', status: 'Active' },
    { bid: 'ASC001', name: 'Arun Kumar', role: 'Senior Associate', project: 'Metro Heights', date: '2026-01-25', sponsor: 'Priya Sharma', status: 'Active' },
    { bid: 'ASC001', name: 'Arun Kumar', role: 'Senior Associate', project: 'Metro Heights', date: '2026-01-25', sponsor: 'Priya Sharma', status: 'Active' },
    { bid: 'ASC001', name: 'Arun Kumar', role: 'Senior Associate', project: 'Metro Heights', date: '2026-01-25', sponsor: 'Priya Sharma', status: 'Active' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--dashboard-primary)', margin: '0 0 8px 0' }}>
            Reports & Analytics
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--dashboard-text-light)', margin: 0 }}>
            Real-time insights across projects
          </p>
        </div>
        <select style={{
          padding: '10px 16px',
          border: '1px solid var(--dashboard-border)',
          borderRadius: '8px',
          fontSize: '14px',
          minWidth: '160px',
          outline: 'none'
        }}>
          <option>Select Date</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
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
            Associate Distribution
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={distributionData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ value }) => `${value}%`}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {distributionData.map((item, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color }}></div>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)' }}>{item.label}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--dashboard-text-light)', marginLeft: '20px', margin: 0 }}>{item.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--dashboard-white)',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>
              Sales performance
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '4px 12px',
                backgroundColor: 'transparent',
                border: '1px solid var(--dashboard-border)',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer',
                color: 'var(--dashboard-text)'
              }}>
                Over all
              </button>
              <button style={{
                padding: '4px 12px',
                backgroundColor: 'var(--dashboard-primary)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer',
                color: 'var(--dashboard-white)'
              }}>
                Monthly
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={salesPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{
          backgroundColor: 'var(--dashboard-white)',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', margin: '0 0 4px 0' }}>
              New Joinees
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: 0 }}>
              Top Performing Associates (Payments)
            </p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={newJoineesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          backgroundColor: 'var(--dashboard-white)',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', margin: '0 0 4px 0' }}>
              Top 10 Performers
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: 0 }}>
              Based on total team size
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--dashboard-text-light)', paddingBottom: '8px', borderBottom: '1px solid var(--dashboard-border)' }}>
              <span>Designation Name</span>
              <span>150 Members</span>
            </div>
            {topTeams.map((team, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)' }}>{team.name}</span>
                  <span style={{ fontSize: '13px', color: 'var(--dashboard-text-light)' }}>{team.members} Members</span>
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
            <button style={{
              alignSelf: 'flex-end',
              padding: '6px 16px',
              backgroundColor: 'transparent',
              color: 'var(--dashboard-primary)',
              border: 'none',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              See More
            </button>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>
            Top Performers
          </h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              padding: '8px 16px',
              backgroundColor: 'var(--dashboard-white)',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--dashboard-text)'
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
              color: 'var(--dashboard-white)'
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
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Role</th>
              <th>Sales value</th>
              <th>Plots sold</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {topPerformers.map((performer, index) => (
              <tr key={index}>
                <td>{performer.rank}</td>
                <td>{performer.name}</td>
                <td>{performer.role}</td>
                <td>{performer.sales}</td>
                <td>{performer.plots}</td>
                <td>
                  <span className={`status-badge ${performer.status === 'Active' ? 'status-completed' : 'status-pending'}`}>
                    {performer.status}
                  </span>
                </td>
                <td>
                  <button style={{
                    padding: '4px 8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: 'var(--dashboard-text-light)'
                  }}>
                    ⋮
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        backgroundColor: 'var(--dashboard-white)',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>
            New Joinees
          </h3>
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
            color: 'var(--dashboard-white)'
          }}>
            <Download size={16} />
            Export
          </button>
        </div>

        <div style={{ marginBottom: '16px', position: 'relative' }}>
          <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search here..."
            style={{
              width: '100%',
              padding: '10px 10px 10px 40px',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>BID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Project</th>
              <th>Joining Date</th>
              <th>Sponsored By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {newJoinees.map((joinee, index) => (
              <tr key={index}>
                <td>{joinee.bid}</td>
                <td>{joinee.name}</td>
                <td>{joinee.role}</td>
                <td>{joinee.project}</td>
                <td>{joinee.date}</td>
                <td>{joinee.sponsor}</td>
                <td>
                  <span className="status-badge status-completed">
                    {joinee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
