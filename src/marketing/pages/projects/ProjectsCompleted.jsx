// ProjectsCompleted.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProjectsCompletedBgImage from '../../../assets/projects-completed-bg.png';
import project1 from '../../../assets/our-projects-image1.png';
import project2 from '../../../assets/our-projects-image2.png';
import project3 from '../../../assets/our-projects-image3.png';
import project4 from '../../../assets/our-projects-image4.png';
import project5 from '../../../assets/our-projects-image5.png';
import project6 from '../../../assets/our-projects-image6.png';
import { colors } from '../../colors';

const ProjectsCompleted = () => {
  const navigate = useNavigate();
  const galleryImages = [project1, project2, project3, project4, project5, project6, project1, project2];
  
  const projects = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: "Green Valley Phase",
    location: "Shadnagar, Hyderabad",
    plotSizes: "150-400 Sq Yds",
    approval: "HMDA Approved",
    startingPrice: "₹25 Lakhs",
    imageUrl: galleryImages[i],
  }));

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
        style={{
          backgroundColor: '#ffffff',
          padding: '24px 40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          margin: '-80px auto 40px',
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
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="card-image">
                <img 
                  src={project.imageUrl} 
                  alt={project.name} 
                />
              </div>
              
              <div className="card-content">
                <h3 className="project-name">{project.name}</h3>
                
                <div className="project-location">
                  <span className="location-pin">📍</span> {project.location}
                </div>

                <div className="project-details">
                  <div className="detail-item">
                    <span className="label">Plot Sizes</span>
                    <span>{project.plotSizes}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Approval</span>
                    <span className="approval-badge">{project.approval}</span>
                  </div>
                </div>

                <div className="price-section">
                  <div className="starting-price">
                    Starts From
                    <strong>{project.startingPrice}</strong>
                  </div>
                  <button 
                                      style={{
                                        width: '50%',
                                        padding: '12px',
                                        backgroundColor: colors.button, // gold/orange
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                      }}
                    onClick={() => navigate(`/projects/completed/${project.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .projects-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          color: #333;
        }

        .hero-section {
          position: relative;
          height: 500px;
          min-height: 60vh;
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
          font-size: 3.2rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .hero-content p {
          font-size: 1.35rem;
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
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }

        .project-card {
          border: 1px solid #e8e8e8;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: transform 0.18s, box-shadow 0.18s;
        }

        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.12);
        }

        .card-image img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .card-content {
          padding: 20px;
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

        @media (max-width: 768px) {
          .hero-content h1 { font-size: 2.6rem; }
          .hero-content p  { font-size: 1.15rem; }
          .filter-controls { flex-direction: column; align-items: center; }
          .filter-group { width: 100%; max-width: 360px; }
        }
      `}</style>
    </div>
  );
};

export default ProjectsCompleted;