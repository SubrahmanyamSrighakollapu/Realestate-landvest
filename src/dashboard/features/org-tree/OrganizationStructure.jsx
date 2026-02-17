import { Search } from 'lucide-react';
import { useState } from 'react';
import profileImage from '../../assets/associate-profile.jpg';
import OffCanvasProfile from './OffCanvasProfile';
import '../../styles/global.css';

const OrganizationStructure = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

  const handleCardClick = (member) => {
    setSelectedMember(member);
    setIsOffCanvasOpen(true);
  };

  const handleCloseOffCanvas = () => {
    setIsOffCanvasOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };
  const topLevelMembers = [
    { name: 'Arun Kumar', id: 'BID1000', role: 'Regional Manager', team: 26, sale: '₹1.2Cr', comm: '₹1,00,000', color: '#f97316' },
    { name: 'Arun Kumar', id: 'BID1000', role: 'Regional Manager', team: 26, sale: '₹1.2Cr', comm: '₹1,00,000', color: '#f97316' },
    { name: 'Arun Kumar', id: 'BID1000', role: 'Regional Manager', team: 26, sale: '₹1.2Cr', comm: '₹1,00,000', color: '#f97316' }
  ];

  const secondLevelMembers = [
    { name: 'Sunita Reddy', id: 'BID1000', role: 'Senior Manager', team: 26, sale: '₹1.2Cr', comm: '₹1,00,000', color: '#3b82f6' },
    { name: 'Sunita Reddy', id: 'BID1000', role: 'Senior Manager', team: 26, sale: '₹1.2Cr', comm: '₹1,00,000', color: '#3b82f6' },
    { name: 'Sunita Reddy', id: 'BID1000', role: 'Senior Manager', team: 26, sale: '₹1.2Cr', comm: '₹1,00,000', color: '#3b82f6' }
  ];

  const thirdLevelMembers = [
    { name: 'Sunita Reddy', id: 'BID1000', role: 'Senior Manager', team: 26, sale: '₹1.2Cr', comm: '₹1,00,000', color: '#8b5cf6' },
    { name: 'Sunita Reddy', id: 'BID1000', role: 'Senior Manager', team: 26, sale: '₹1.2Cr', comm: '₹1,00,000', color: '#8b5cf6' },
    { name: 'Sunita Reddy', id: 'BID1000', role: 'Senior Manager', team: 26, sale: '₹1.2Cr', comm: '₹1,00,000', color: '#8b5cf6' }
  ];

  const fourthLevelMembers = [
    { name: 'Sunita Reddy', id: 'BID1000', role: 'Senior Manager', team: 26, sale: '₹1.2Cr', comm: '₹1,00,000', color: '#8b5cf6' },
    { name: 'Sunita Reddy', id: 'BID1000', role: 'Senior Manager', team: 26, sale: '₹1.2Cr', comm: '₹1,00,000', color: '#8b5cf6' },
    { name: 'Sunita Reddy', id: 'BID1000', role: 'Senior Manager', team: 26, sale: '₹1.2Cr', comm: '₹1,00,000', color: '#8b5cf6' }
  ];

  const MemberCard = ({ member, showConnector = false }) => (
    <div 
      onClick={() => handleCardClick(member)}
      style={{ position: 'relative', flex: '0 0 auto', minWidth: '200px', cursor: 'pointer' }}>
      {showConnector && (
        <div style={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          height: '30px',
          backgroundColor: 'var(--dashboard-border)'
        }}></div>
      )}
      <div style={{
        backgroundColor: 'var(--dashboard-white)',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        borderTop: `3px solid ${member.color}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <img src={profileImage} alt={member.name} style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover'
          }} />
          <div style={{ flex: 1 }}>
            <h5 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>
              {member.name}
            </h5>
            <p style={{ fontSize: '11px', color: 'var(--dashboard-text-light)', margin: 0 }}>{member.id}</p>
          </div>
        </div>
        <div style={{
          fontSize: '11px',
          fontWeight: '500',
          color: member.color,
          backgroundColor: `${member.color}15`,
          padding: '4px 8px',
          borderRadius: '6px',
          textAlign: 'center',
          marginBottom: '12px'
        }}>
          {member.role}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          paddingTop: '12px',
          borderTop: '1px solid var(--dashboard-border)'
        }}>
          <div>
            <p style={{ fontSize: '10px', color: 'var(--dashboard-text-light)', margin: '0 0 4px 0' }}>Team</p>
            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>{member.team}</p>
          </div>
          <div>
            <p style={{ fontSize: '10px', color: 'var(--dashboard-text-light)', margin: '0 0 4px 0' }}>Sale</p>
            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>{member.sale}</p>
          </div>
          <div>
            <p style={{ fontSize: '10px', color: 'var(--dashboard-text-light)', margin: '0 0 4px 0' }}>Comm</p>
            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>{member.comm}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <OffCanvasProfile 
        isOpen={isOffCanvasOpen} 
        onClose={handleCloseOffCanvas} 
        member={selectedMember} 
      />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--dashboard-primary)', margin: '0 0 8px 0' }}>
            Organization Structure
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--dashboard-text-light)', margin: 0 }}>
            Visualize hierarchy, performance & team insights
          </p>
        </div>
        <div style={{ position: 'relative', minWidth: '300px' }}>
          <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by ID, Name..."
            style={{
              width: '80%',
              padding: '10px 10px 10px 40px',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      <div style={{ overflowX: 'auto', paddingBottom: '40px' }}>
        <div style={{ minWidth: '1200px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px', position: 'relative' }}>
            <div 
              onClick={() => handleCardClick({ name: 'Bhoodhana Infra', role: 'Developers', id: 'BID1000', team: 26, sale: '₹1.2Cr', comm: '₹1,00,000' })}
              style={{
              backgroundColor: 'var(--dashboard-white)',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderTop: '3px solid var(--dashboard-primary)',
              minWidth: '280px',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <img src={profileImage} alt="CEO" style={{
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
                  Company
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
                bottom: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '2px',
                height: '30px',
                backgroundColor: 'var(--dashboard-border)'
              }}></div>
            </div>
          </div>

          <div style={{ position: 'relative', marginBottom: '50px' }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '16.66%',
              right: '16.66%',
              height: '2px',
              backgroundColor: 'var(--dashboard-border)'
            }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', paddingTop: '30px' }}>
              {topLevelMembers.map((member, index) => (
                <MemberCard key={index} member={member} showConnector={true} />
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', marginBottom: '50px' }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '8.33%',
              right: '8.33%',
              height: '2px',
              backgroundColor: 'var(--dashboard-border)'
            }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', paddingTop: '30px' }}>
              {secondLevelMembers.map((member, index) => (
                <MemberCard key={index} member={member} showConnector={true} />
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', marginBottom: '50px' }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '8.33%',
              right: '8.33%',
              height: '2px',
              backgroundColor: 'var(--dashboard-border)'
            }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', paddingTop: '30px' }}>
              {thirdLevelMembers.map((member, index) => (
                <MemberCard key={index} member={member} showConnector={true} />
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '8.33%',
              right: '8.33%',
              height: '2px',
              backgroundColor: 'var(--dashboard-border)'
            }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', paddingTop: '30px' }}>
              {fourthLevelMembers.map((member, index) => (
                <MemberCard key={index} member={member} showConnector={true} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationStructure;
