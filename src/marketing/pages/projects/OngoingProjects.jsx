import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import MainBgImage from '../../../assets/ongoing-projects-bg.jpg';
import { colors } from '../../colors';
import { publicProjectService } from '../../../services/publicProjectService';

const OngoingProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await publicProjectService.getProjects();
      if (response.success) {
        const ongoingProjects = response.data.filter(p => p.status === 'ongoing');
        setProjects(ongoingProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section with Background Image */}
      <div className="hero-section" style={{
        position: 'relative',
        height: '400px',
        backgroundImage: `url(${MainBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
      }}>
        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(31, 111, 84, 0.75) 0%, rgba(31, 111, 84, 0.45) 100%)',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', padding: '20px' }}>
          <h1 className="hero-title" style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '16px',
            textShadow: '0 2px 10px rgba(0,0,0,0.4)',
          }}>
            Ongoing Projects – Invest with Confidence
          </h1>
          <p className="hero-subtitle" style={{
            fontSize: '1rem',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Discover premium plotted developments under active construction. Track real-time progress, verify approvals, and invest securely in Hyderabad's fastest-growing corridors.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="filter-bar" style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        margin: '-60px auto 40px',
        maxWidth: '1200px',
        borderRadius: '12px',
        position: 'relative',
        zIndex: 3,
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <input
            type="text"
            placeholder="What are you looking for?"
            style={{
              flex: '1',
              minWidth: '220px',
              padding: '14px 16px',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              fontSize: '15px',
              outline: 'none',
            }}
          />

          <select style={{
            padding: '14px 16px',
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            fontSize: '15px',
            minWidth: '160px',
            backgroundColor: '#fff',
          }}>
            <option>Status</option>
            <option>All</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </select>

          <select style={{
            padding: '14px 16px',
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            fontSize: '15px',
            minWidth: '160px',
            backgroundColor: '#fff',
          }}>
            <option>Location</option>
            <option>All Locations</option>
            <option>Shadnagar</option>
            <option>Chevella</option>
            <option>Ibrahimpatnam</option>
          </select>

          <select style={{
            padding: '14px 16px',
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            fontSize: '15px',
            minWidth: '160px',
            backgroundColor: '#fff',
          }}>
            <option>Budget Range</option>
            <option>Below ₹25 Lakhs</option>
            <option>₹25 - 50 Lakhs</option>
            <option>Above ₹50 Lakhs</option>
          </select>

          <button style={{
            padding: '14px 28px',
            backgroundColor: colors.primary,
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px 60px',
      }}>
        <p style={{
          fontSize: '16px',
          color: colors.textLight,
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          {loading ? 'Loading...' : `Showing ${projects.length} Projects`}
        </p>

        <div className="projects-grid" style={{
          display: 'grid',
          gap: '20px',
        }}>
          {projects.map((project) => (
            <div key={project._id} style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              border: '1px solid #f0f0f0',
              cursor: 'pointer',
            }}>
              {/* Project Image */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={`https://api.landvestinfra.com${project.thumbnnailImage}`}
                  alt={project.title}
                  style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 50%)',
                  height: '80px'
                }} />
                <span style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '24px',
                  fontSize: '12px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}>
                  Ongoing
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: colors.text,
                  margin: '0 0 8px 0',
                  lineHeight: '1.3'
                }}>
                  {project.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: colors.textLight,
                  margin: '0 0 20px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{ color: colors.primary }}>📍</span> {project.location}
                </p>

                {/* Progress Bar */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '13px', color: colors.textLight, fontWeight: '500' }}>Progress</span>
                    <span style={{ fontSize: '13px', color: colors.primary, fontWeight: '600' }}>60% Complete</span>
                  </div>
                  <div style={{
                    height: '8px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: '60%',
                      height: '100%',
                      background: `linear-gradient(90deg, ${colors.primary} 0%, #22c55e 100%)`,
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>

                {/* Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '24px',
                  padding: '16px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div>
                    <span style={{ fontSize: '12px', color: colors.textLight, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Plot Sizes</span>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: colors.text, marginTop: '4px' }}>{project.plotSize}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: colors.textLight, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Approval</span>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: colors.primary, marginTop: '4px' }}>{project.approvedBy}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: colors.textLight, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Starts From</span>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#e74c3c', marginTop: '4px' }}>₹{project.startingPrice}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: colors.textLight, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Plots</span>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: colors.text, marginTop: '4px' }}>{project.totalPlots}</div>
                  </div>
                </div>

                {/* View Details Button */}
                <button 
                  onClick={() => navigate(`/projects/ongoing/${project._id}`)}
                  style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: colors.button,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .projects-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-section {
            height: 450px !important;
          }
          .hero-title {
            font-size: 2.5rem !important;
          }
          .hero-subtitle {
            font-size: 1.1rem !important;
          }
          .filter-bar {
            padding: 24px 40px !important;
            margin: -80px auto 40px !important;
          }
        }
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px !important;
          }
          .hero-section {
            height: 500px !important;
          }
          .hero-title {
            font-size: 42px !important;
          }
          .hero-subtitle {
            font-size: 18px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OngoingProjects;