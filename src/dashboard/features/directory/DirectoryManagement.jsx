import React, { useState } from 'react';
import { Search, Download, Calendar } from 'lucide-react';
import dashboardColors from '../../styles/colors'; // adjust path
import Pagination from '../../components/common/Pagination';


const DirectoryManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 245;

  // Mock data
  const directoryData = [
    {
      name: 'Jane Doe',
      bid: 'BID-4920',
      role: 'Relationship Mgr',
      status: 'Active',
      joiningDate: 'Jan 12, 2023',
      email: 'jana@gmail.com',
      phone: '+91 9876543212',
      sponsor: 'Michael Scott',
    },
    {
      name: 'Jane Doe',
      bid: 'BID-4921',
      role: 'Broker',
      status: 'Active',
      joiningDate: 'Jan 12, 2024',
      email: 'jana@gmail.com',
      phone: '+91 9876543212',
      sponsor: 'Michael Scott',
    },
    {
      name: 'Jane Doe',
      bid: 'BID-4922',
      role: 'Sales Associate',
      status: 'Inactive',
      joiningDate: 'Jan 12, 2024',
      email: 'jana@gmail.com',
      phone: '+91 9876543212',
      sponsor: '(No Sponsor)',
    },
    {
      name: 'Jane Doe',
      bid: 'BID-4923',
      role: 'Relationship Mgr',
      status: 'Active',
      joiningDate: 'Jan 22, 2024',
      email: 'jana@gmail.com',
      phone: '+91 9876543212',
      sponsor: 'Michael Scott',
    },
    // ... more entries
  ];


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
              Welcome back, Admin • Last login: Today at 9:30 AM
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
          <select style={{
            padding: '10px 14px',
            border: `1px solid ${dashboardColors.border}`,
            borderRadius: '6px',
            fontSize: '14px',
            minWidth: '160px',
          }}>
            <option>All Roles</option>
            {/* Populate from designations API later */}
          </select>

          <select style={{
            padding: '10px 14px',
            border: `1px solid ${dashboardColors.border}`,
            borderRadius: '6px',
            fontSize: '14px',
            minWidth: '140px',
          }}>
            <option>Select Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div style={{
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
          </div>

          <input
            type="text"
            placeholder="Enter Name"
            style={{
              padding: '10px 14px',
              border: `1px solid ${dashboardColors.border}`,
              borderRadius: '6px',
              fontSize: '14px',
              flex: '1',
              minWidth: '180px',
            }}
          />
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
              {directoryData.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div style={{ fontWeight: '500' }}>{item.name}</div>
                    <div style={{ fontSize: '13px', color: dashboardColors.textLight }}>
                      {item.bid}
                    </div>
                  </td>
                  <td>{item.role}</td>
                  <td>
                    <span className={`status-badge ${item.status === 'Active' ? 'status-completed' : 'status-pending'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.joiningDate}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.sponsor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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

export default DirectoryManagement;