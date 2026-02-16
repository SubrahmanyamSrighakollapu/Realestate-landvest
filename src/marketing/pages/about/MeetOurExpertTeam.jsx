import { Phone, MessageSquare, Mail } from 'lucide-react';
import { colors } from '../../colors';
import team1 from '../../../assets/team-1.jpg';
import team2 from '../../../assets/team-2.jpg';
import team3 from '../../../assets/team-3.jpg';

const teamMembers = [
  {
    name: 'Sarah Jenkins',
    role: 'Senior Investment Advisor',
    experience: '12+ Years Experience',
    image: team1,
  },
  {
    name: 'Michael Chen',
    role: 'Property Development Manager',
    experience: '8+ Years Experience',
    image: team2,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Legal & Compliance Head',
    experience: '10+ Years Experience',
    image: team3,
  },
];

const MeetOurExpertTeam = () => {
  return (
    <section
      style={{
        padding: '3rem 0',
        backgroundColor: colors.backgroundLight,
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2
            style={{
              fontSize: '2.3rem',
              fontWeight: '700',
              color: colors.primary,
              marginBottom: '0.6rem',
            }}
          >
            Meet Our Expert Team
          </h2>
          <p
            style={{
              fontSize: '0.95rem',
              color: colors.textLight,
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            The professionals dedicated to helping you invest with confidence.
            We bring decades of market experience to your doorstep.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              style={{
                backgroundColor: colors.background,
                borderRadius: '14px',
                padding: '1.6rem',
                boxShadow: '0 8px 22px rgba(0,0,0,0.08)',
                border: '1px solid #eef2ee',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '180px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '1.4rem',
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                  }}
                />
              </div>

              <h4
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: colors.primary,
                  marginBottom: '0.3rem',
                }}
              >
                {member.name}
              </h4>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: colors.text,
                  marginBottom: '0.25rem',
                }}
              >
                {member.role}
              </p>

              <p
                style={{
                  fontSize: '0.85rem',
                  color: colors.textLight,
                  marginBottom: '1.1rem',
                }}
              >
                {member.experience}
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1.4rem',
                  marginBottom: '1.4rem',
                }}
              >
                <Phone size={18} color={colors.textLight} />
                <MessageSquare size={18} color={colors.textLight} />
                <Mail size={18} color={colors.textLight} />
              </div>

              <button
                style={{
                  backgroundColor: colors.button,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.55rem 1.6rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(217,119,6,0.25)',
                }}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurExpertTeam;