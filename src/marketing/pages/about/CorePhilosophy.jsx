import { Eye, Target } from 'lucide-react';
import { colors } from '../../colors';
import rajeshKumar from '../../../assets/rajesh-kumar.jpg';

const CorePhilosophy = () => {
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
              fontSize: '2.2rem',
              fontWeight: '700',
              color: colors.primary,
              marginBottom: '0.4rem',
            }}
          >
            Core Philosophy
          </h2>
          <p
            style={{
              color: colors.primary,
              fontSize: '0.95rem',
            }}
          >
            Our guiding principles that drive every square foot of development.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem',
          }}
        >
          <div
            style={{
              backgroundColor: colors.background,
              borderRadius: '12px',
              padding: '2.2rem',
              border: `1px solid ${colors.primary}`,
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.2rem',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: `1.5px solid ${colors.primary}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Eye size={20} color={colors.primary} />
              </div>

              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: colors.text,
                }}
              >
                Our Vision
              </h3>
            </div>

            <p
              style={{
                color: colors.textLight,
                lineHeight: '1.7',
                fontSize: '0.95rem',
              }}
            >
              To be the region's most trusted developer, fostering long-term wealth
              creation for our clients through strategic land acquisition and
              sustainable community development. We aim to redefine land ownership
              as a secure, transparent, and accessible journey for everyone.
            </p>
          </div>

          <div
            style={{
              backgroundColor: colors.background,
              borderRadius: '12px',
              padding: '2.2rem',
              border: `1px solid ${colors.primary}`,
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.2rem',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: `1.5px solid ${colors.primary}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Target size={20} color={colors.primary} />
              </div>

              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: colors.text,
                }}
              >
                Our Mission
              </h3>
            </div>

            <p
              style={{
                color: colors.textLight,
                lineHeight: '1.7',
                fontSize: '0.95rem',
              }}
            >
              To ensure 100% legal clarity and zero-compromise quality in every
              project. We are on a mission to eliminate the complexities of real
              estate transactions by providing end-to-end support, ethical
              practices, and clear titles that give our customers absolute peace
              of mind.
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: colors.background,
            borderRadius: '12px',
            padding: '2.2rem 2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            border: `1px solid ${colors.primary}`,
            boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
            flexWrap: 'wrap',
          }}
        >
          <img
            src={rajeshKumar}
            alt="Rajesh Kumar"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center 15%'
            }}
          />

          <div style={{ flex: 1 }}>
            <p
              style={{
                color: colors.text,
                lineHeight: '1.7',
                marginBottom: '1rem',
                fontSize: '0.95rem',
                fontWeight: '500',
              }}
            >
              "Real estate is not just about trading land; it's about building
              trust. We promise only what we can deliver, and we deliver more
              than what we promise."
            </p>

            <h4
              style={{
                color: colors.primary,
                fontWeight: '600',
                marginBottom: '0.15rem',
              }}
            >
              Rajesh Kumar
            </h4>
            <p
              style={{
                fontSize: '0.9rem',
                color: colors.textLight,
              }}
            >
              Founder & Managing Director
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorePhilosophy;