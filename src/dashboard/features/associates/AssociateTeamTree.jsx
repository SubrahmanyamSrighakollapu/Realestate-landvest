import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { employeeService } from '../../../services/employeeService';
import '../../styles/global.css';

const AssociateTeamTree = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [teamTree, setTeamTree] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeInfo();
    fetchTeamTree();
  }, [id]);

  const fetchEmployeeInfo = async () => {
    try {
      const response = await employeeService.getEmployeeInfo(id);
      if (response.success) {
        setEmployee(response.data);
      }
    } catch (error) {
      console.error('Error fetching employee info:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamTree = async () => {
    try {
      const response = await employeeService.getMyTeamTree();
      if (response.success) {
        setTeamTree(response.data);
      }
    } catch (error) {
      console.error('Error fetching team tree:', error);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'NA';
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const getProfileImage = (profileImage) => {
    if (profileImage) {
      return `https://api.landvestinfra.com${profileImage}`;
    }
    return null;
  };

  const ProfileAvatar = ({ name, profileImage, size = '48px', fontSize = '18px' }) => {
    const imgSrc = getProfileImage(profileImage);
    return imgSrc ? (
      <img src={imgSrc} alt={name} style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover'
      }} />
    ) : (
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: 'var(--dashboard-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: fontSize,
        fontWeight: '600',
        color: 'white'
      }}>
        {getInitials(name)}
      </div>
    );
  };

  if (loading) {
    return <div style={{ padding: '24px' }}>Loading...</div>;
  }

  if (!employee || !teamTree) {
    return <div style={{ padding: '24px' }}>Employee not found</div>;
  }

  const teamMembers = teamTree.children || [];

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
            <ProfileAvatar name={employee.name} profileImage={employee.profileImage} size="100px" fontSize="36px" />
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--dashboard-text)', margin: '0 0 12px 0' }}>
                {employee.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--dashboard-text-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={16} />
                  <span>ID: {employee.code}</span>
                  <span style={{ margin: '0 4px' }}>•</span>
                  <span>{employee.role?.name || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} />
                  <span>{employee.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} />
                  <span>Joined {employee.doj ? new Date(employee.doj).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={16} />
                  <span>Sponsored By: <strong>{employee.sponser?.name || 'N/A'}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* <div style={{
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
          </div> */}
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
              <ProfileAvatar name={teamTree.name} profileImage={teamTree.profileImage} size="48px" fontSize="18px" />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>
                  {teamTree.name}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: 0 }}>{teamTree.role?.name || 'N/A'}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <span style={{ fontSize: '13px', color: 'var(--dashboard-text-light)' }}>{teamTree.code}</span>
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
                <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>{teamMembers.length}</p>
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

          {teamMembers.map((member, index) => {
            const colors = ['#f97316', '#ef4444', '#10b981', '#3b82f6', '#ec4899'];
            const color = colors[index % colors.length];
            return (
            <div key={member._id} style={{ position: 'relative' }}>
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
                  <ProfileAvatar name={member.name} profileImage={member.profileImage} size="40px" fontSize="14px" />
                  <div>
                    <h5 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--dashboard-text)', margin: 0 }}>
                      {member.name}
                    </h5>
                    <p style={{ fontSize: '11px', color: 'var(--dashboard-text-light)', margin: 0 }}>{member.code}</p>
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
                  <span style={{ color: 'var(--dashboard-text-light)' }}>Role</span>
                  <span style={{ fontWeight: '600', color: 'var(--dashboard-text)' }}>{member.role?.name || 'N/A'}</span>
                </div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '500',
                  color: color,
                  backgroundColor: `${color}15`,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  {member.role?.name || 'N/A'}
                </div>
              </div>
            </div>
          );})}
        </div>
      </div>
    </div>
  );
};

export default AssociateTeamTree;
