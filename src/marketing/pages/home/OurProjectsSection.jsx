import { useState, useEffect } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { colors } from '../../colors';
import { publicProjectService } from '../../../services/publicProjectService';

const OurProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await publicProjectService.getProjects();
      if (response.success) {
        const filteredProjects = response.data
          .filter(p => ['upcoming', 'ongoing', 'completed'].includes(p.status))
          .slice(0, 6);
        setProjects(filteredProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section
      style={{
        padding: '5.5rem 1rem',
        backgroundColor: colors.backgroundLight || '#f9fafb',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.8rem' }}>
          <h2
            style={{
              fontSize: '2.6rem',
              fontWeight: '600',
              color: colors.primary,
              marginBottom: '0.6rem',
            }}
          >
            Our Projects
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: colors.textLight,
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Handpicked open plots with high appreciation potential and
            <br />
            100% legal clarity.
          </p>
        </div>

        <div
          className="projects-grid"
        >
          {loading ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Loading projects...</p>
          ) : projects.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No projects available</p>
          ) : (
            projects.map((project) => (
            <div
              key={project._id}
              className="project-card"
              style={{
                backgroundColor: '#fff',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 6px 18px rgba(0,0,0,0.07)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.07)';
              }}
            >
              <div style={{ height: '250px', overflow: 'hidden' }}>
                <img
                  src={`https://api.landvestinfra.com${project.thumbnnailImage}`}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div style={{ padding: '1.4rem 1.6rem 1.6rem' }}>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: colors.text,
                    marginBottom: '0.35rem',
                  }}
                >
                  {project.title}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: colors.textLight,
                    fontSize: '0.95rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  <MapPin size={15} />
                  {project.location}
                </div>

                <div
                  style={{
                    fontSize: '0.9rem',
                    color: '#6b7280',
                    marginBottom: '1.2rem',
                  }}
                >
                  {project.approvedBy} | {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: colors.primary,
                    }}
                  >
                    ₹{project.startingPrice}
                  </div>

                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#e8f6ef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ArrowUpRight
                      size={20}
                      color={colors.primary}
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          width: 100%;
        }
        .project-card {
          transition: all 0.25s ease;
        }
        @media (min-width: 640px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default OurProjectsSection;