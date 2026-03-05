import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { dashboardColors } from '../../styles/colors';
import axios from 'axios';
import Pagination from '../../components/common/Pagination';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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
    setLoading(true);
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.post('https://api.landvestinfra.com/api/v1/admin/projects/list', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Total Projects', value: dashboardData.totalCount, subtext: 'All projects' },
    { label: 'Active Projects', value: dashboardData.activeCount, subtext: 'Currently selling' },
    { label: 'Inactive Projects', value: dashboardData.inactiveCount, subtext: 'Not active' },
    { label: 'New Projects', value: dashboardData.newCount, subtext: 'Recently added' }
  ];

  const filteredProjects = projects.filter(project =>
    project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrevious = () => {
    setCarouselIndex(prev => Math.max(0, prev - 3));
  };

  const handleNext = () => {
    setCarouselIndex(prev => Math.min(filteredProjects.length - 3, prev + 3));
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '600', color: dashboardColors.primary, marginBottom: '24px' }}>
        Projects
      </h1>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {stats.map((stat, index) => (
          <div key={index} style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>{stat.subtext}</div>
          </div>
        ))}
      </div>

      {/* Date Filters */}
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
      </div>

      {/* Showing Projects Section */}
      <h2 style={{ fontSize: '20px', fontWeight: '600', color: dashboardColors.primary, marginBottom: '20px' }}>
        Showing Projects
      </h2>

      {/* Project Cards Carousel */}
      <div style={{ position: 'relative', marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '24px', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ width: '100%', textAlign: 'center', padding: '40px' }}>Loading...</div>
          ) : (
            filteredProjects.slice(carouselIndex, carouselIndex + 3).map((project) => (
              <div key={project._id} style={{
                flex: '0 0 calc(33.333% - 16px)',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s'
              }}>
                <img
                  src={`https://api.landvestinfra.com${project.contentImage || project.bannerImage}`}
                  alt={project.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'}
                />
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: dashboardColors.primary, marginBottom: '4px' }}>
                    {project.title}
                  </h3>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>📍</span> {project.location}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>Plot Sizes</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                        {project.plotSize || '150-400 Sq. Yds'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>Approval</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                        {project.approvedBy ? 'HMDA Approved' : 'Approved'}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>Starts From</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: dashboardColors.primary }}>
                      {project.startingPrice || '₹25 Lakhs'}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/dashboard/projects/view/${project._id}`)}
                    style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: "#C9A24D",
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Carousel Navigation */}
        {!loading && filteredProjects.length > 3 && (
          <>
            <button
              onClick={handlePrevious}
              disabled={carouselIndex === 0}
              style={{
                position: 'absolute',
                left: '-50px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                cursor: carouselIndex === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                opacity: carouselIndex === 0 ? 0.5 : 1
              }}
            >
              <ChevronLeft size={25} color= {dashboardColors.primary} />
            </button>
            <button
              onClick={handleNext}
              disabled={carouselIndex >= filteredProjects.length - 3}
              style={{
                position: 'absolute',
                right: '-50px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                cursor: carouselIndex >= filteredProjects.length - 3 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                opacity: carouselIndex >= filteredProjects.length - 3 ? 0.5 : 1
              }}
            >
              <ChevronRight size={20} color= {dashboardColors.primary} />
            </button>
          </>
        )}
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 12px 12px 48px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
      </div>

      {/* Projects Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table className="dashboard-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Project</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Location</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Total Plots</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Sold</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Available</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Revenue</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((project, index) => (
              <tr key={project._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{project.title}</td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>{project.location}</td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{project.totalPlots || '-'}</td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>-</td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>-</td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>₹10.5L</td>
                <td style={{ padding: '16px' }}>
  <span
    style={{
      padding: '6px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      textTransform: 'capitalize',
      backgroundColor:
        project.status === 'ongoing'
          ? '#d1fae5'
          : project.status === 'upcoming'
          ? '#fef9c3'
          : '#fee2e2',
      color:
        project.status === 'ongoing'
          ? '#065f46'
          : project.status === 'upcoming'
          ? '#854d0e'
          : '#991b1b'
    }}
  >
    {project.status}
  </span>
</td>
                <td style={{ padding: '16px' }}>
                  <button
                    onClick={() => navigate(`/dashboard/projects/view/${project._id}`)}
                    style={{
                    padding: '6px 16px',
                    backgroundColor: dashboardColors.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
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
  );
};

export default Projects;
