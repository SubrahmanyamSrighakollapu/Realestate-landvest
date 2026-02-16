import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Home, Navigation, Lightbulb, Trees, Baby, Droplet, Shield } from 'lucide-react';
import project1 from '../../../assets/our-projects-image1.png';

const ProjectDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('availability');

  const tabs = [
    { id: 'availability', label: 'Online Plot Availability' },
    { id: 'info', label: 'Project Info' },
    { id: 'payment', label: 'Payment Options' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'development', label: 'Project Development' },
    { id: 'location', label: 'Location Highlights' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${project1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        padding: '0 40px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '12px' }}>
            Green Valley Phase
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
            📍 Shadnagar, Hyderabad
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px' }}>
            Curated open plot ventures designed for your future investment. Find the perfect space to build your dreams.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section style={{
        borderBottom: '2px solid #e0e0e0',
        backgroundColor: 'white',
        position: 'sticky',
        top: '72px',
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: '0',
          overflowX: 'auto'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 24px',
                border: 'none',
                background: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: activeTab === tab.id ? '#1F6F54' : '#666',
                borderBottom: activeTab === tab.id ? '3px solid #1F6F54' : '3px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: '50px 20px', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Online Plot Availability */}
          {activeTab === 'availability' && (
            <div>
              <h2 style={{ fontSize: '2rem', color: '#1F6F54', marginBottom: '16px' }}>
                Online Plot Availability
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
                Check real-time availability of plots across various sizes and facing options. Our interactive layout helps you easily identify available, booked, and sold plots, making your selection process transparent and hassle-free.
              </p>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <img 
                  src={project1} 
                  alt="Plot Layout" 
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </div>

              {/* Project Info Section */}
              <div style={{ marginTop: '50px' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#1F6F54', marginBottom: '12px' }}>
                  Project Info
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '25px', lineHeight: '1.6' }}>
                  This residential open plot project is thoughtfully planned to offer a perfect balance of nature, connectivity, and future growth. Designed as per approved layout standards, the project ensures clear titles, well-laid internal roads, and long-term value appreciation.
                </p>
                <div style={{
                  backgroundColor: 'white',
                  padding: '30px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  display: 'flex',
                  gap: '40px',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap'
                }}>
                  <img 
                    src={project1} 
                    alt="Project" 
                    style={{ 
                      width: '280px', 
                      height: '180px', 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      border: '3px solid #1F6F54'
                    }} 
                  />
                  <div style={{ 
                    flex: 1, 
                    minWidth: '300px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '30px 40px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '8px' }}>Plot Sizes</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: '600', color: '#333' }}>150 - 400 Sq. Yds</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '8px' }}>Approval</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1F6F54' }}>HMDA Approved</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '8px' }}>Starts From</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#e74c3c' }}>₹25 Lakhs</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '8px' }}>Availability Plots</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: '600', color: '#333' }}>15 Plots</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities Section */}
              <div style={{ marginTop: '50px' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#1F6F54', marginBottom: '12px' }}>
                  Amenities
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '25px', lineHeight: '1.6' }}>
                  The project is equipped with modern amenities to enhance quality of life and ensure a secure living environment.
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px'
                }}>
                  {[
                    { Icon: Home, name: 'Gated community' },
                    { Icon: Navigation, name: 'Blacktop internal roads' },
                    { Icon: Lightbulb, name: 'Street lighting' },
                    { Icon: Trees, name: 'Landscaped parks &\ngreen spaces' },
                    { Icon: Baby, name: "Children's play area" },
                    { Icon: Droplet, name: 'Modern sewage\nfacilities' },
                    { Icon: Shield, name: '24/7 security provisions' }
                  ].map((amenity, idx) => (
                    <div key={idx} style={{
                      backgroundColor: 'white',
                      padding: '25px 20px',
                      borderRadius: '10px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '15px'
                    }}>
                      <div style={{
                        width: '65px',
                        height: '65px',
                        borderRadius: '50%',
                        backgroundColor: '#E8F5F1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #1F6F54'
                      }}>
                        <amenity.Icon size={28} color="#1F6F54" strokeWidth={2} />
                      </div>
                      <div style={{ 
                        fontSize: '0.9rem', 
                        color: '#333', 
                        fontWeight: '500',
                        lineHeight: '1.4',
                        whiteSpace: 'pre-line'
                      }}>
                        {amenity.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Development Section */}
              <div style={{ marginTop: '50px' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#1F6F54', marginBottom: '12px' }}>
                  Project Development
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '25px', lineHeight: '1.6' }}>
                  The project is being developed in phases with a focus on quality infrastructure and timely execution. All developments comply with approved layout standards, ensuring a well-planned layout and sustainable growth for the future.
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px'
                }}>
                  {[project1, project1, project1, project1].map((img, idx) => (
                    <div key={idx} style={{
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      border: '3px solid #1F6F54'
                    }}>
                      <img src={img} alt={`Development ${idx + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Highlights Section */}
              <div style={{ marginTop: '50px' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#1F6F54', marginBottom: '12px' }}>
                  Location Highlights
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '25px', lineHeight: '1.6' }}>
                  Strategically located in a fast-developing area, the project offers excellent connectivity and growth potential.
                </p>
                <div style={{
                  backgroundColor: 'white',
                  padding: '30px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '30px',
                  alignItems: 'center'
                }}>
                  <div>
                    {[
                      'Close to main highways and arterial roads',
                      'Proximity to schools, colleges, and hospitals',
                      'Easy access to IT hubs, industrial zones, and business centers',
                      'Peaceful surroundings with high appreciation prospects'
                    ].map((highlight, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: '#1F6F54',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>
                          ✓
                        </div>
                        <div style={{ fontSize: '0.95rem', color: '#333', lineHeight: '1.5' }}>
                          {highlight}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <img src={project1} alt="Location" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px', border: '3px solid #1F6F54' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project Info */}
          {activeTab === 'info' && (
            <div>
              <h2 style={{ fontSize: '2rem', color: '#1F6F54', marginBottom: '16px' }}>
                Project Info
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
                This residential open plot project is thoughtfully planned to offer a perfect balance of nature, connectivity, and future growth. Designed as per approved layout standards, the project ensures clear titles, well-laid internal roads, and long-term value appreciation.
              </p>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '30px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img src={project1} alt="Project" style={{ width: '180px', height: '140px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div>
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '0.9rem', color: '#777', marginBottom: '4px' }}>Plot Sizes</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>150 - 400 Sq. Yds</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#777', marginBottom: '4px' }}>Approval</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1F6F54' }}>HMDA Approved</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#777', marginBottom: '4px' }}>Starts From</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#e74c3c' }}>₹25 Lakhs</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#777', marginBottom: '4px' }}>Availability Plots</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>15 Plots</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Options */}
          {activeTab === 'payment' && (
            <div>
              <h2 style={{ fontSize: '2rem', color: '#1F6F54', marginBottom: '16px' }}>
                Payment Options
              </h2>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.6' }}>
                  Flexible payment plans available. Contact us for detailed payment structure.
                </p>
              </div>
            </div>
          )}

          {/* Amenities */}
          {activeTab === 'amenities' && (
            <div>
              <h2 style={{ fontSize: '2rem', color: '#1F6F54', marginBottom: '16px' }}>
                Amenities
              </h2>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                {['24/7 Security', 'Water Supply', 'Street Lights', 'Gated Community', 'Park', 'Wide Roads'].map(amenity => (
                  <div key={amenity} style={{ padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                    ✓ {amenity}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Development */}
          {activeTab === 'development' && (
            <div>
              <h2 style={{ fontSize: '2rem', color: '#1F6F54', marginBottom: '16px' }}>
                Project Development
              </h2>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.6' }}>
                  Development progress and timeline information will be updated here.
                </p>
              </div>
            </div>
          )}

          {/* Location Highlights */}
          {activeTab === 'location' && (
            <div>
              <h2 style={{ fontSize: '2rem', color: '#1F6F54', marginBottom: '16px' }}>
                Location Highlights
              </h2>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.6', marginBottom: '20px' }}>
                  Strategically located in Shadnagar, Hyderabad with excellent connectivity and growth potential.
                </p>
                <ul style={{ fontSize: '1.05rem', color: '#555', lineHeight: '2', paddingLeft: '20px' }}>
                  <li>15 minutes from ORR</li>
                  <li>Close to IT corridor</li>
                  <li>Near educational institutions</li>
                  <li>Excellent public transport connectivity</li>
                </ul>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
