import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import profileImage from '../../assets/associate-profile.jpg';
import OffCanvasProfile from './OffCanvasProfile';
import { organizationService } from '../../../services/organizationService';
import { toastService } from '../../../services/toastService';
import '../../styles/global.css';

const OrganizationStructure = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [orgData, setOrgData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrgTree();
  }, []);

  const fetchOrgTree = async () => {
    setLoading(true);
    try {
      const response = await organizationService.getOrgTree();
      if (response.success) {
        setOrgData(response.data);
      }
    } catch (error) {
      toastService.error('Failed to load organization tree');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (member) => {
    setSelectedMember(member);
    setIsOffCanvasOpen(true);
  };

  const handleCloseOffCanvas = () => {
    setIsOffCanvasOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  const MemberCard = ({ member, showConnector = false, color = '#3b82f6' }) => (
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
        borderTop: `3px solid ${color}`
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
            <p style={{ fontSize: '11px', color: 'var(--dashboard-text-light)', margin: 0 }}>{member.code}</p>
          </div>
        </div>
        <div style={{
          fontSize: '11px',
          fontWeight: '500',
          color: color,
          backgroundColor: `${color}15`,
          padding: '4px 8px',
          borderRadius: '6px',
          textAlign: 'center',
          marginBottom: '12px'
        }}>
          {member.role?.name || 'N/A'}
        </div>
      </div>
    </div>
  );

  const renderTree = (nodes, level = 0) => {
    if (!nodes || nodes.length === 0) return null;

    const colors = ['#f97316', '#3b82f6', '#8b5cf6', '#10b981'];
    const color = colors[level % colors.length];

    return (
      <div style={{ position: 'relative', marginBottom: '50px' }}>
        {level > 0 && (
          <div style={{
            position: 'absolute',
            top: '0',
            left: '16.66%',
            right: '16.66%',
            height: '2px',
            backgroundColor: 'var(--dashboard-border)'
          }}></div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', paddingTop: level > 0 ? '30px' : '0' }}>
          {nodes.map((node, index) => (
            <div key={node._id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <MemberCard member={node} showConnector={level > 0} color={color} />
              {node.children && node.children.length > 0 && renderTree(node.children, level + 1)}
            </div>
          ))}
        </div>
      </div>
    );
  };

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
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
        ) : (
          <div style={{ minWidth: '1200px' }}>
            {orgData.length > 0 && renderTree(orgData)}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationStructure;
