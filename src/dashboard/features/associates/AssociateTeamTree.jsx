import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Phone } from 'lucide-react';
import profileImage from '../../assets/associate-profile.jpg';
import '../../styles/global.css';

const AssociateTeamTree = () => {
  const navigate = useNavigate();

  const teamMembers = [
    { name: 'Arun Kumar', id: 'BID1000', sale: '₹1.2Cr', role: 'Senior Associate', color: '#f97316' },
    { name: 'Arun Kumar', id: 'BID1000', sale: '₹1.2Cr', role: 'Senior Associate', color: '#ef4444' },
    { name: 'Arun Kumar', id: 'BID1000', sale: '₹1.2Cr', role: 'Associate', color: '#10b981' },
    { name: 'Arun Kumar', id: 'BID1000', sale: '₹1.2Cr', role: 'Junior Associate', color: '#3b82f6' },
    { name: 'Arun Kumar', id: 'BID1000', sale: '₹1.2Cr', role: 'Sale Director', color: '#ec4899' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate(-1)} style={{
          padding: '8px',
          border: '1px solid var(--dashboard-border)',
          borderRadius: '6px',
          background: 'var(--dashboard-white)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}>
          <ArrowLeft size={20} />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--dashboard-primary)', margin: 0 }}>
          Team Sale Hierarchy
        </h2>
      </div>

      <div style={{
        backgroundColor: 'var(--dashboard-white)',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '40px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <img src={profileImage} alt="Profile" style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover'
            }} />
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--dashboard-text)', margin: '0 0 12px 0' }}>
                Priya Sharma
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--dashboard-text-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={16} />
                  <span>ID: RE-9042</span>
                  <span style={{ margin: '0 4px' }}>•</span>
                  <span>Manager</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} />
                  <span>+91 98765 43210</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} />
                  <span>Joined October 12, 2021</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={16} />
                  <span>Sponsored By: <strong>Vikram Singh</strong></span>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--dashboard-tertiary)',
            padding: '16px 20px',
            borderRadius: '8px',
            minWidth: '220px'
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--dashboard-text)', margin: '0 0 12px 0' }}>
              Assigned Projects (3)
            </h4>
            <div style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', lineHeight: '1.8' }}>
              <div>Emerald Heights (PH1)</div>
              <div>The Green Boulevard (NEW)</div>
              <div>Oasis Residency (FULL)</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', paddingTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
          <div style={{
            backgroundColor: 'var(--dashboard-white)',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '2px solid var(--dashboard-primary)',
            minWidth: '280px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <img src={profileImage} alt="Team Lead" style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                objectFit: 'cover'
              }} />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>
                  Bhoodhana Infra
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: 0 }}>Developers</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <span style={{ fontSize: '13px', color: 'var(--dashboard-text-light)' }}>BID1000</span>
              <span style={{
                fontSize: '12px',
                fontWeight: '500',
                color: 'var(--dashboard-primary)',
                backgroundColor: 'var(--dashboard-secondary)',
                padding: '4px 12px',
                borderRadius: '12px'
              }}>
                Team Lead
              </span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid var(--dashboard-border)'
            }}>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--dashboard-text-light)', margin: '0 0 4px 0' }}>Team</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>26</p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--dashboard-text-light)', margin: '0 0 4px 0' }}>Sale</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>₹1.2Cr</p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--dashboard-text-light)', margin: '0 0 4px 0' }}>Comm</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>₹1,00,000</p>
              </div>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '40px',
              backgroundColor: 'var(--dashboard-border)'
            }}></div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '2px',
            backgroundColor: 'var(--dashboard-border)'
          }}></div>

          {teamMembers.map((member, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '2px',
                height: '40px',
                backgroundColor: 'var(--dashboard-border)'
              }}></div>

              <div style={{
                backgroundColor: 'var(--dashboard-white)',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                border: `2px solid ${member.color}`,
                minWidth: '160px',
                marginTop: '40px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <img src={profileImage} alt={member.name} style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }} />
                  <div>
                    <h5 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>
                      {member.name}
                    </h5>
                    <p style={{ fontSize: '11px', color: 'var(--dashboard-text-light)', margin: 0 }}>{member.id}</p>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  marginBottom: '8px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--dashboard-border)'
                }}>
                  <span style={{ color: 'var(--dashboard-text-light)' }}>Sale</span>
                  <span style={{ fontWeight: '600', color: 'var(--dashboard-text)' }}>{member.sale}</span>
                </div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '500',
                  color: member.color,
                  backgroundColor: `${member.color}15`,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssociateTeamTree;
