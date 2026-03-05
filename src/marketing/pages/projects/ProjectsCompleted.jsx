// ProjectsCompleted.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProjectsCompletedBgImage from '../../../assets/projects-completed-bg.png';
import { colors } from '../../colors';
import { publicProjectService } from '../../../services/publicProjectService';

const ProjectsCompleted = () => {
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
        const completedProjects = response.data.filter(p => p.status === 'completed');
        setProjects(completedProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="projects-page">
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1>Explore Our Projects</h1>
          <p>
            Curated open plot ventures designed for your future investment to build your dreams.
            Find the perfect plot to build your dreams.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div
        className="filter-bar"
        style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          margin: '-60px auto 40px',
          maxWidth: '1200px',
          borderRadius: '12px',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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

          <select
            style={{
              padding: '14px 16px',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              fontSize: '15px',
              minWidth: '160px',
              backgroundColor: '#fff',
            }}
          >
            <option>Status</option>
            <option>All</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </select>

          <select
            style={{
              padding: '14px 16px',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              fontSize: '15px',
              minWidth: '160px',
              backgroundColor: '#fff',
            }}
          >
            <option>Location</option>
            <option>All Locations</option>
            <option>Shadnagar</option>
            <option>Chevella</option>
            <option>Ibrahimpatnam</option>
          </select>

          <select
            style={{
              padding: '14px 16px',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              fontSize: '15px',
              minWidth: '160px',
              backgroundColor: '#fff',
            }}
          >
            <option>Budget Range</option>
            <option>Below ₹25 Lakhs</option>
            <option>₹25 - 50 Lakhs</option>
            <option>Above ₹50 Lakhs</option>
          </select>

          <button
            style={{
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

      <section className="projects-grid-section">
        <div className="projects-grid">
          {loading ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Loading...</p>
          ) : projects.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No completed projects found</p>
          ) : (
            projects.map(project => (
            <div key={project._id} className="project-card">
              <div className="card-image" style={{ position: 'relative', overflow: 'hidden' }}>
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
                  backgroundColor: '#22c55e',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '24px',
                  fontSize: '12px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                }}>
                  Completed
                </span>
              </div>
              
              <div className="card-content" style={{ padding: '24px' }}>
                <h3 className="project-name" style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1a3c34',
                  margin: '0 0 8px 0',
                  lineHeight: '1.3'
                }}>{project.title}</h3>
                
                <div className="project-location" style={{
                  color: '#666',
                  margin: '0 0 20px 0',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{ color: '#1F6F54' }}>📍</span> {project.location}
                </div>

                <div className="project-details" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '24px',
                  padding: '16px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div className="detail-item">
                    <span className="label" style={{
                      display: 'block',
                      fontSize: '12px',
                      color: '#777',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '4px'
                    }}>Plot Sizes</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{project.plotSize}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label" style={{
                      display: 'block',
                      fontSize: '12px',
                      color: '#777',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '4px'
                    }}>Approval</span>
                    <span className="approval-badge" style={{
                      fontSize: '14px',
                      color: '#22c55e',
                      fontWeight: '600'
                    }}>{project.approvedBy}</span>
                  </div>
                </div>

                <div className="price-section" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '12px'
                }}>
                  <div className="starting-price" style={{ fontSize: '14px' }}>
                    <span style={{ color: '#777', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Starts From</span>
                    <strong style={{
                      display: 'block',
                      fontSize: '18px',
                      color: '#e74c3c',
                      marginTop: '2px',
                      fontWeight: '700'
                    }}>₹{project.startingPrice}</strong>
                  </div>
                  <button 
                    style={{
                      padding: '12px 20px',
                      backgroundColor: colors.button,
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                    onClick={() => navigate(`/projects/completed/${project._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </section>

      <style>{`
        .projects-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          color: #333;
        }

        .hero-section {
          position: relative;
          height: 400px;
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          margin-bottom: 60px;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          background-image: url(${ProjectsCompletedBgImage});
          background-size: cover;
          background-position: center;
          z-index: 1;
      } 

        .hero-background::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          padding: 0 20px;
        }

        .hero-content h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .hero-content p {
          font-size: 1rem;
          max-width: 760px;
          margin: 0 auto;
          line-height: 1.45;
        }



        .projects-grid-section {
          padding: 50px 20px;
          background: white;
        }

        .projects-grid {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .project-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border: 1px solid #f0f0f0;
          cursor: pointer;
        }

        .card-image img {
          width: 100%;
          height: 240px;
          object-fit: cover;
        }

        .card-content {
          padding: 24px;
        }

        .project-name {
          font-size: 1.45rem;
          margin: 0 0 10px;
          color: #1a3c34;
        }

        .project-location {
          color: #555;
          margin-bottom: 16px;
          font-size: 1rem;
        }

        .location-pin {
          margin-right: 6px;
        }

        .project-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .detail-item {
          flex: 1;
        }

        .detail-item .label {
          display: block;
          font-size: 0.9rem;
          color: #777;
          margin-bottom: 4px;
        }

        .approval-badge {
          color: #27ae60;
          font-weight: 600;
        }

        .price-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
        }

        .starting-price {
          font-size: 1.05rem;
        }

        .starting-price strong {
          display: block;
          font-size: 1.4rem;
          color: #e74c3c;
          margin-top: 2px;
        }

        .view-details-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .view-details-btn:hover {
          background: #2980b9;
        }

        @media (min-width: 640px) {
          .hero-section {
            height: 450px;
          }
          .hero-content h1 { font-size: 2.6rem; }
          .hero-content p  { font-size: 1.15rem; }
          .filter-bar {
            padding: 24px 40px !important;
            margin: -80px auto 40px !important;
          }
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .hero-section {
            height: 500px;
          }
          .hero-content h1 { font-size: 3.2rem; }
          .hero-content p  { font-size: 1.35rem; }
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsCompleted;