import { useState } from 'react';
import { Users, UserCheck, TrendingUp, TrendingDown, Search, Download, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Pagination from '../../components/common/Pagination';
import '../../styles/global.css';

const AssociateReports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 245;

  const statsCards = [
    { icon: Users, label: 'Total Associates', value: '247', color: '#3b82f6' },
    { icon: UserCheck, label: 'Active This month', value: '180', color: '#10b981' },
    { icon: Users, label: 'Top Performers', value: '13', color: '#8b5cf6' },
    { icon: TrendingUp, label: 'Top Performers', value: '13', color: '#10b981' },
    { icon: TrendingUp, label: 'Upscale Count', value: '45', color: '#10b981' },
    { icon: TrendingDown, label: 'Downscale Count', value: '16', color: '#ef4444' }
  ];

  const pieData = [
    { name: 'Active', value: 60, color: '#10b981' },
    { name: 'In Active', value: 40, color: '#ef4444' }
  ];

  const topTeams = [
    { name: 'Platinum Group', members: 150, color: '#ef4444', percentage: 100 },
    { name: 'Platinum Group', members: 100, color: '#10b981', percentage: 67 },
    { name: 'Platinum Group', members: 80, color: '#8b5cf6', percentage: 53 }
  ];

  const associates = [
    { id: 'BID1001', designation: 'Senior Manager', name: 'Priya Sharma', date: '2026-01-25', email: 'rajesh@gmail.com', phone: '+91 98765 43210', sponsor: 'Priya Sharma' },
    { id: 'BID1002', designation: 'Associate', name: 'Priya Sharma', date: '2026-01-25', email: 'rajesh@gmail.com', phone: '+91 98765 43210', sponsor: 'Priya Sharma' },
    { id: 'BID1003', designation: 'Senior Manager', name: 'Rajesh Kumar', date: '2026-01-25', email: 'rajesh@gmail.com', phone: '+91 98765 43210', sponsor: 'Rajesh Kumar' },
    { id: 'BID1004', designation: 'Associate', name: 'Priya Sharma', date: '2026-01-25', email: '-', phone: '+91 98765 43210', sponsor: 'Priya Sharma' }
  ];

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
        <button style={{
          padding: '10px 24px',
          backgroundColor: 'var(--dashboard-primary)',
          color: 'var(--dashboard-white)',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Download size={18} />
          Export
        </button>
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
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
            <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by ID, Name..."
              style={{
                width: '80%',
                padding: '10px 10px 10px 40px',
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
          </select>
        </div>

        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', marginBottom: '16px' }}>
          Associates List
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Bid-ID</th>
                <th>Designation</th>
                <th>Name</th>
                <th>Date Of Join</th>
                <th>Email</th>
                <th>Phone no.</th>
                <th>Sponsored By</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {associates.map((assoc, index) => (
                <tr key={index}>
                  <td>{assoc.id}</td>
                  <td>{assoc.designation}</td>
                  <td>{assoc.name}</td>
                  <td>{assoc.date}</td>
                  <td>{assoc.email}</td>
                  <td>{assoc.phone}</td>
                  <td>{assoc.sponsor}</td>
                  <td>
                    <button style={{
                      padding: '6px 16px',
                      backgroundColor: 'var(--dashboard-primary)',
                      color: 'var(--dashboard-white)',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}>
                      View profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AssociateReports;
