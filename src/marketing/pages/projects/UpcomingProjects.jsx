import React from 'react';
import { Search } from 'lucide-react';
import { colors } from '../../colors';
import MainBgImage from '../../../assets/projects-completed-bg.png';
import gallery1 from '../../../assets/gallery1.png';
import gallery2 from '../../../assets/gallery2.jpg';
import gallery3 from '../../../assets/gallery3.jpg';
import gallery4 from '../../../assets/gallery4.jpg';
import gallery5 from '../../../assets/gallery5.jpg';
import gallery6 from '../../../assets/gallery6.jpg';


const UpcomingProjects = () => {
  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];
  
  const projects = [
    {
      name: 'Greenwood Estates - Phase 2',
      location: 'Shadnagar, Hyderabad',
      status: 'Up Coming',
      plotSizes: '150-400 Sq Yds',
      approval: 'HMDA Approved',
      price: '₹25 Lakhs',
      launchStatus: 'Pre-Launch',
      image: gallery1,
    },
    ...Array(5).fill(null).map((_, i) => ({
      name: 'Greenwood Estates - Phase 2',
      location: 'Shadnagar, Hyderabad',
      status: 'Up Coming',
      plotSizes: '150-400 Sq Yds',
      approval: 'HMDA Approved',
      price: '₹25 Lakhs',
      launchStatus: 'Pre-Launch',
      image: galleryImages[(i + 1) % galleryImages.length],
    })),
  ];

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          position: 'relative',
          height: '500px',
          backgroundImage: `url(${MainBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#ffffff',
        }}
      >
        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(31, 111, 84, 0.75) 0%, rgba(31, 111, 84, 0.45) 100%)',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', padding: '20px' }}>
          <h1
            style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '16px',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
            }}
          >
            Upcoming Projects – Be the First to Invest
          </h1>
          <p
            style={{
              fontSize: '18px',
              maxWidth: '720px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Exclusive pre-launch plotted developments in high-growth corridors. Secure your piece of the future today.
          </p>
        </div>
      </div>

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
            <option>Pre-Launch</option>
            <option>Upcoming</option>
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

      {/* Projects Grid */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px 60px',
        }}
      >
        <p
          style={{
            fontSize: '16px',
            color: colors.textLight,
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          Showing 6 Projects
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '24px',
          }}
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}
            >
              {/* Project Image */}
              <div style={{ position: 'relative' }}>
                <img
                  src={project.image}
                  alt={project.name}
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: '#a855f7', // purple tone for "Up Coming"
                    color: '#ffffff',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  {project.status}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: '20px' }}>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: colors.text,
                    margin: '0 0 8px 0',
                  }}
                >
                  {project.name}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: colors.textLight,
                    margin: '0 0 16px 0',
                  }}
                >
                  {project.location}
                </p>

                {/* Details */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '20px',
                    fontSize: '14px',
                  }}
                >
                  <div>
                    <span style={{ color: colors.textLight }}>Plot Sizes</span>
                    <br />
                    {project.plotSizes}
                  </div>
                  <div>
                    <span style={{ color: colors.textLight }}>Approval</span>
                    <br />
                    {project.approval}
                  </div>
                  <div>
                    <span style={{ color: colors.textLight }}>Starts From</span>
                    <br />
                    {project.price}
                  </div>
                  <div>
                    <span style={{ color: colors.textLight }}>Status</span>
                    <br />
                    {project.launchStatus}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: colors.button, // gold/orange
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Get Early Access
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingProjects;