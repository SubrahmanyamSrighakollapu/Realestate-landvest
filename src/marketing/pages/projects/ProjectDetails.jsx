import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Home, Navigation, Lightbulb, Trees, Baby, Droplet, Shield } from 'lucide-react';
import { publicProjectService } from '../../../services/publicProjectService';
import project1 from '../../../assets/our-projects-image1.png';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('availability');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const response = await publicProjectService.getProjects();
      if (response.success) {
        const foundProject = response.data.find(p => p._id === id);
        setProject(foundProject);
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!project) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Project not found</div>;
  }

  const tabs = [
    { id: 'availability', label: 'Online Plot Availability' },
    { id: 'info', label: 'Project Info' },
    { id: 'payment', label: 'Payment Options' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Location Highlights' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://api.landvestinfra.com${project.bannerImage || project.thumbnnailImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="project-title" style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '12px' }}>
            {project.title}
          </h1>
          <p className="project-location" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
            📍 {project.location}
          </p>
          <p className="project-desc" style={{ fontSize: '1rem', lineHeight: '1.6', maxWidth: '800px' }}>
            {project.description || 'Curated open plot ventures designed for your future investment. Find the perfect space to build your dreams.'}
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
                  src={project.layouts?.length > 0 ? `https://api.landvestinfra.com/${project.layouts[0].url}` : `https://api.landvestinfra.com${project.thumbnnailImage}`}
                  alt="Plot Layout" 
                  style={{ width: '100%', borderRadius: '8px' }}
                />
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
                {project.description || 'This residential open plot project is thoughtfully planned to offer a perfect balance of nature, connectivity, and future growth. Designed as per approved layout standards, the project ensures clear titles, well-laid internal roads, and long-term value appreciation.'}
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
                  src={`https://api.landvestinfra.com${project.contentImage || project.thumbnnailImage}`}
                  alt="Project" 
                  className="project-info-img"
                  style={{ 
                    width: '280px', 
                    height: '180px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    border: '3px solid #1F6F54'
                  }} 
                />
                <div className="project-info-grid" style={{ 
                  flex: 1, 
                  minWidth: '280px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '30px 40px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '8px' }}>Plot Sizes</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: '600', color: '#333' }}>{project.plotSize} Sq. Yds</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '8px' }}>Approval</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1F6F54' }}>{project.approvedBy}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '8px' }}>Starts From</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#e74c3c' }}>₹{project.startingPrice}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '8px' }}>Total Plots</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: '600', color: '#333' }}>{project.totalPlots} Plots</div>
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
              <p style={{ fontSize: '1.05rem', color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
                Flexible payment plans designed to make your dream plot affordable and accessible.
              </p>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                {project.pricingOptions?.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {project.pricingOptions.map((option, idx) => (
                      <div key={idx} style={{
                        padding: '24px',
                        border: '2px solid #1F6F54',
                        borderRadius: '12px',
                        backgroundColor: '#f9fffe',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(31, 111, 84, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}>
                        <h3 style={{ color: '#1F6F54', marginBottom: '16px', fontSize: '1.3rem', fontWeight: '600' }}>
                          {typeof option.pricingOption === 'object' ? option.pricingOption.title : 'Payment Plan'}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' }}>
                            <span style={{ fontSize: '0.9rem', color: '#666' }}>Price per Sq. Yd</span>
                            <span style={{ fontSize: '1.3rem', fontWeight: '700', color: '#e74c3c' }}>₹{option.mrp?.toLocaleString('en-IN')}</span>
                          </div>
                          {option.duration && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.9rem', color: '#666' }}>Duration</span>
                              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#333' }}>{option.duration} Months</span>
                            </div>
                          )}
                          {option.installment && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.9rem', color: '#666' }}>Installments</span>
                              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#333' }}>{option.installment}</span>
                            </div>
                          )}
                          {option.advancePayment && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                              <span style={{ fontSize: '0.85rem', padding: '4px 12px', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '12px', fontWeight: '500' }}>Advance Payment Available</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div style={{ padding: '20px', border: '2px solid #1F6F54', borderRadius: '8px' }}>
                      <h3 style={{ color: '#1F6F54', marginBottom: '10px' }}>Down Payment</h3>
                      <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>20% at booking</p>
                    </div>
                    <div style={{ padding: '20px', border: '2px solid #1F6F54', borderRadius: '8px' }}>
                      <h3 style={{ color: '#1F6F54', marginBottom: '10px' }}>EMI Options</h3>
                      <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>Up to 24 months</p>
                    </div>
                    <div style={{ padding: '20px', border: '2px solid #1F6F54', borderRadius: '8px' }}>
                      <h3 style={{ color: '#1F6F54', marginBottom: '10px' }}>Bank Loans</h3>
                      <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>Available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Amenities */}
          {activeTab === 'amenities' && (
            <div>
              <h2 style={{ fontSize: '2rem', color: '#1F6F54', marginBottom: '16px' }}>
                Amenities
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
                {project.highlights?.length > 0 ? project.highlights[0].description : 'The project is equipped with modern amenities to enhance quality of life and ensure a secure living environment.'}
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
                      <amenity.Icon size={28} color="#1F6F54" />
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      color: '#333',
                      whiteSpace: 'pre-line'
                    }}>
                      {amenity.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {activeTab === 'highlights' && (
            <div>
              <h2 style={{ fontSize: '2rem', color: '#1F6F54', marginBottom: '16px' }}>
                Project Highlights
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
                Key features and benefits that make this project special.
              </p>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                {project.highlights?.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx}>
                        {/* <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1F6F54', marginBottom: '12px' }}>
                          {highlight.title}
                        </h4> */}
                        <ul style={{ 
                          listStyleType: 'disc', 
                          paddingLeft: '24px', 
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}>
                          {highlight.description.split('\n').filter(item => item.trim()).map((point, pointIdx) => (
                            <li key={pointIdx} style={{ 
                              fontSize: '14px', 
                              color: '#666', 
                              lineHeight: '1.6',
                              paddingLeft: '8px'
                            }}>
                              {point.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>
                      Project highlights will be updated soon.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <h2 style={{ fontSize: '2rem', color: '#1F6F54', marginBottom: '16px' }}>
                Customer Reviews
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
                What our customers say about this project.
              </p>
              {project.testimonials?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {project.testimonials.map((testimonial, idx) => (
                    <div key={idx} style={{
                      backgroundColor: 'white',
                      padding: '24px',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'flex-start'
                    }}>
                      <img
                        src={`https://api.landvestinfra.com${testimonial.userImage}`}
                        alt={testimonial.name}
                        style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #1F6F54', flexShrink: 0 }}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/60?text=User'; }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1F6F54', margin: 0 }}>{testimonial.name}</h4>
                          <span style={{ fontSize: '0.85rem', color: '#888' }}>{new Date(testimonial.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.6', margin: 0 }}>{testimonial.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <p style={{ fontSize: '1rem', color: '#888', margin: 0 }}>No reviews yet for this project.</p>
                </div>
              )}
            </div>
          )}

          {/* Location Highlights */}
          {activeTab === 'location' && (
            <div>
              <h2 style={{ fontSize: '2rem', color: '#1F6F54', marginBottom: '16px' }}>
                Location Highlights
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
                Strategically located with excellent connectivity and proximity to key landmarks.
              </p>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                {project.locations?.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {project.locations.map((location, idx) => (
                      <div key={idx}>
                        {/* <h4 style={{ color: '#1F6F54', marginBottom: '16px', fontSize: '1.2rem', fontWeight: '600' }}>
                          {location.title}
                        </h4> */}
                        <ul style={{ 
                          listStyleType: 'disc', 
                          paddingLeft: '24px', 
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}>
                          {location.description.split('\n').filter(item => item.trim()).map((point, pointIdx) => (
                            <li key={pointIdx} style={{ 
                              fontSize: '1rem', 
                              color: '#555', 
                              lineHeight: '1.6',
                              paddingLeft: '8px'
                            }}>
                              {point.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div>
                      <h4 style={{ color: '#1F6F54', marginBottom: '10px' }}>🏥 Healthcare</h4>
                      <p>Hospitals nearby - 5 km</p>
                    </div>
                    <div>
                      <h4 style={{ color: '#1F6F54', marginBottom: '10px' }}>🏫 Education</h4>
                      <p>Schools & Colleges - 3 km</p>
                    </div>
                    <div>
                      <h4 style={{ color: '#1F6F54', marginBottom: '10px' }}>🛒 Shopping</h4>
                      <p>Shopping Centers - 4 km</p>
                    </div>
                    <div>
                      <h4 style={{ color: '#1F6F54', marginBottom: '10px' }}>✈️ Connectivity</h4>
                      <p>Major Roads & Transport</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .project-title { font-size: 1.8rem !important; }
          .project-location { font-size: 1rem !important; }
          .project-desc { font-size: 0.95rem !important; }
          .project-info-img { width: 100% !important; height: auto !important; }
          .project-info-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;