import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, Clock, Calendar, CheckCircle, Search, Pencil, Trash2, AlertTriangle 
} from 'lucide-react';
import axios from 'axios';
import dashboardColors from '../../styles/colors';
import Pagination from '../../components/common/Pagination';
import { projectService } from '../../../services/projectService';
import { toastService } from '../../../services/toastService';

const ProjectManagement = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalCount: 0,
    activeCount: 0,
    inactiveCount: 0,
    newCount: 0
  });
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProjects();
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.post(
        'https://api.landvestinfra.com/api/v1/admin/dashboard/projects',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await projectService.listProjects();
      if (response.success) {
        const activeProjects = response.data.filter(p => p.status !== 'inactive');
        setProjects(activeProjects);
      }
    } catch (error) {
      toastService.error('Failed to load projects');
    }
  };

  const handleDelete = async (projectId) => {
    setDeleteLoading(projectId);
    try {
      const data = new FormData();
      data.append('id', projectId);
      data.append('status', 'inactive');

      const response = await projectService.updateProject(data);
      if (response.success) {
        toastService.success('Project deleted successfully!');
        fetchProjects();
        fetchDashboardData();
        setShowDeleteModal(false);
        setProjectToDelete(null);
      }
    } catch (error) {
      toastService.error(error.response?.data?.message || 'Failed to delete project');
    } finally {
      setDeleteLoading(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing':
        return '#28A745';
      case 'completed':
        return '#007BFF';
      case 'upcoming':
        return '#FD7E14';
      default:
        return dashboardColors.primary;
    }
  };

  // ✅ FILTER LOGIC
  const filteredProjects =
    statusFilter === 'all'
      ? projects
      : projects.filter(
          (proj) => proj.status?.toLowerCase() === statusFilter
        );

  // ✅ PAGINATION ON FILTERED DATA
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: dashboardColors.tertiary,
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: dashboardColors.primary,
                margin: 0,
              }}
            >
              Projects Management
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: dashboardColors.textLight,
                marginTop: "4px",
              }}
            >
              Manage and monitor all plot projects
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard/projects/add")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              backgroundColor: dashboardColors.primary,
              color: dashboardColors.white,
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            + Add New project
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {[
          { icon: Building, label: "Total Projects", value: dashboardData.totalCount },
          { icon: Clock, label: "Active Projects", value: dashboardData.activeCount },
          { icon: Calendar, label: "Inactive Projects", value: dashboardData.inactiveCount },
          {
            icon: CheckCircle,
            label: "New Projects",
            value: dashboardData.newCount,
          },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              backgroundColor: dashboardColors.white,
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: dashboardColors.secondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <stat.icon size={24} color={dashboardColors.primary} />
            </div>
            <div>
              <p
                style={{
                  fontSize: "13px",
                  color: dashboardColors.textLight,
                  margin: 0,
                }}
              >
                {stat.label}
              </p>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: dashboardColors.text,
                  margin: "4px 0 0 0",
                }}
              >
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div
        style={{
          backgroundColor: dashboardColors.white,
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: "1", minWidth: "260px", position: "relative" }}>
            <Search
              size={18}
              color={dashboardColors.textLight}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <input
              type="text"
              placeholder="Search by ID, Name..."
              style={{
                width: "70%",
                padding: "10px 10px 10px 40px",
                border: `1px solid ${dashboardColors.border}`,
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: "10px 14px",
              border: `1px solid ${dashboardColors.border}`,
              borderRadius: "6px",
              fontSize: "14px",
              minWidth: "160px",
            }}
          >
            <option value="all">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Projects Table Section */}
      <div
        style={{
          backgroundColor: dashboardColors.white,
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: dashboardColors.secondary,
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: dashboardColors.primary,
              margin: 0,
            }}
          >
            Projects
          </h3>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            className="dashboard-table"
            style={{ width: "100%", minWidth: "1000px" }}
          >
            <thead>
              <tr>
                <th>Pro-ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Plots</th>
                <th>Sold</th>
                <th>Blocked</th>
                <th>Available</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>
                    No projects found
                  </td>
                </tr>
              ) : (
                paginatedProjects.map((proj) => (
                  <tr key={proj._id}>
                    <td>{proj.code}</td>
                    <td>{proj.title}</td>
                    <td>
                      <span
                        style={{
                          color: getStatusColor(proj.status),
                          fontWeight: '500',
                        }}
                      >
                        {proj.status}
                      </span>
                    </td>
                    <td>
                      {proj.date
                        ? new Date(proj.date).toLocaleDateString('en-IN')
                        : 'N/A'}
                    </td>
                    <td>{proj.totalPlots || 0}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          title="Edit"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: dashboardColors.primary,
                          }}
                          onClick={() => navigate(`/dashboard/projects/add/basic-info`, { state: { projectId: proj._id, isEdit: true } })}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          title="Delete"
                          disabled={deleteLoading === proj._id}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: deleteLoading === proj._id ? 'not-allowed' : 'pointer',
                            color: '#ef4444',
                            opacity: deleteLoading === proj._id ? 0.5 : 1
                          }}
                          onClick={() => {
                            setProjectToDelete(proj);
                            setShowDeleteModal(true);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredProjects.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: dashboardColors.white,
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            maxWidth: '400px',
            width: '90%',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <AlertTriangle
                size={64}
                color="#ef4444"
                style={{ marginBottom: '16px' }}
              />
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: dashboardColors.text,
                marginBottom: '12px',
              }}>
                Delete Project?
              </h3>
              <p style={{
                fontSize: '14px',
                color: dashboardColors.textLight,
                margin: 0,
              }}>
                Are you sure you want to delete <strong>{projectToDelete?.title}</strong>? This action cannot be undone.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setProjectToDelete(null);
                }}
                disabled={deleteLoading}
                style={{
                  padding: '10px 24px',
                  backgroundColor: dashboardColors.white,
                  color: dashboardColors.text,
                  border: `1px solid ${dashboardColors.border}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: deleteLoading ? 'not-allowed' : 'pointer',
                  opacity: deleteLoading ? 0.5 : 1
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(projectToDelete._id)}
                disabled={deleteLoading}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#ef4444',
                  color: dashboardColors.white,
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: deleteLoading ? 'not-allowed' : 'pointer',
                  opacity: deleteLoading ? 0.6 : 1
                }}
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;