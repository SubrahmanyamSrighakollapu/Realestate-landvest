import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { dashboardColors } from '../../styles/colors';
import axios from 'axios';

const ProjectView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.post('https://api.landvestinfra.com/api/v1/admin/projects/list', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        const projectData = response.data.data.find(p => p._id === id);
        setProject(projectData);
      }
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!project) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Project not found</div>;
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '24px' }}>
      {/* Header */}
      <button
        onClick={() => navigate('/dashboard/projects')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: 'transparent',
          border: `1px solid ${dashboardColors.primary}`,
          borderRadius: '6px',
          color: dashboardColors.primary,
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: '24px'
        }}
      >
        <ArrowLeft size={18} />
        Back to Projects
      </button>

      <h1 style={{ fontSize: '28px', fontWeight: '600', color: dashboardColors.primary, marginBottom: '8px' }}>
        {project.title}
      </h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: '#6b7280' }}>
        <MapPin size={18} />
        <span style={{ fontSize: '16px' }}>{project.location}</span>
      </div>

      {/* Hero Image */}
      <img
        src={`https://realestate.vsahasoft.com${project.bannerImage || project.contentImage}`}
        alt={project.title}
        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', marginBottom: '32px' }}
        onError={(e) => e.target.src = 'https://via.placeholder.com/1200x400?text=Project+Image'}
      />

      {/* Online Plot Availability */}
      {project.layouts && project.layouts.length > 0 && (
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: dashboardColors.primary, marginBottom: '16px' }}>
            Online Plot Availability
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {project.layouts.map((layout, idx) => (
              <img
                key={idx}
                src={`https://realestate.vsahasoft.com/${layout.url}`}
                alt={`Layout ${idx + 1}`}
                style={{ width: '100%', borderRadius: '8px', border: `2px solid ${dashboardColors.primary}` }}
                onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Layout'}
              />
            ))}
          </div>
        </div>
      )}

      {/* Project Info */}
      <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: dashboardColors.primary, marginBottom: '16px' }}>
          Project Info
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Plot Sizes</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>{project.plotSize || '150-400 Sq. Yds'}</div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Approval</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: dashboardColors.primary }}>{project.approvedBy || 'HMDA Approved'}</div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Starting Price</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: dashboardColors.primary }}>{project.startingPrice || '₹25 Lakhs'}</div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Total Plots</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>{project.totalPlots || 'N/A'}</div>
          </div>
        </div>
        {project.description && (
          <div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Description</div>
            <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>{project.description}</div>
          </div>
        )}
        {project.highlights && project.highlights.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>Highlights</div>
            {project.highlights.map((highlight, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>{highlight.title}</div>
                <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>{highlight.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Amenities */}
      <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: dashboardColors.primary, marginBottom: '16px' }}>
          Amenities
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {['Gated Community', 'Street Lighting', 'Landscaped Parks', 'Children Play Area', 'Modern Sewage', '24/7 Security'].map((amenity, idx) => (
            <div key={idx} style={{
              padding: '16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: dashboardColors.secondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: dashboardColors.primary,
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                ✓
              </div>
              <span style={{ fontSize: '14px', color: '#374151' }}>{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Project Development */}
      {project.images && project.images.length > 0 && (
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: dashboardColors.primary, marginBottom: '16px' }}>
            Project Development
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {project.images.map((img, idx) => (
              <img
                key={idx}
                src={`https://realestate.vsahasoft.com/${img.url}`}
                alt={`Development ${idx + 1}`}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', border: `2px solid ${dashboardColors.primary}` }}
                onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Image'}
              />
            ))}
          </div>
        </div>
      )}

      {/* Location Highlights */}
      {project.locations && project.locations.length > 0 && (
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: dashboardColors.primary, marginBottom: '16px' }}>
            Location Highlights
          </h2>
          {project.locations.map((location, idx) => (
            <div key={idx} style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>{location.title}</div>
              <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>{location.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectView;
