import { useEffect, useState } from 'react';
import heroImage from '../../../assets/hero-background.png';
import { colors } from '../../colors';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      style={{
        backgroundImage:
          `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '60vh',
        position: 'relative',
        padding: '2rem 1rem',
        paddingBottom: '6rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          marginLeft: '0',
          textAlign: 'left',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s ease-out',
          padding: '0 1rem',
        }}
        className="hero-content"
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            color: colors.background,
            marginBottom: '1rem',
            lineHeight: '1.2',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
          className="hero-title"
        >
          Secure Your Future with Approved Open Plots
        </h1>

        <p
          style={{
            fontSize: '1rem',
            color: colors.background,
            marginBottom: '2rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          }}
          className="hero-subtitle"
        >
          Invest in DTCP & RERA approved plots in prime developing corridors.
          <br />
          100% Clear Title • Instant Registration • High Appreciation
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            style={{
              backgroundColor: colors.button,
              color: colors.background,
              padding: '0.85rem 1.75rem',
              border: 'none',
              borderRadius: '5px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            View Projects
          </button>

          <button
            style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: colors.text,
              padding: '0.85rem 1.75rem',
              border: 'none',
              borderRadius: '5px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Talk to Expert
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: colors.background,
          padding: '1.5rem',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          width: 'calc(100% - 2rem)',
          maxWidth: '1000px',
          position: 'absolute',
          bottom: '-75px',
          left: '50%',
          transform: isLoaded ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(30px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 1s ease-out 0.3s',
        }}
        className="hero-search"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            alignItems: 'end',
          }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: colors.text, fontSize: '0.9rem' }}>
              Location
            </label>
            <select
              style={{
                width: '100%',
                padding: '0.7rem',
                border: `1px solid ${colors.border}`,
                borderRadius: '5px',
                fontSize: '0.95rem',
              }}
            >
              <option>Select Location</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: colors.text, fontSize: '0.9rem' }}>
              Property Type
            </label>
            <select
              style={{
                width: '100%',
                padding: '0.7rem',
                border: `1px solid ${colors.border}`,
                borderRadius: '5px',
                fontSize: '0.95rem',
              }}
            >
              <option>All types</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: colors.text, fontSize: '0.9rem' }}>
              Budget Range
            </label>
            <input
              type="text"
              placeholder="Any Budget"
              style={{
                width: '90%',
                padding: '0.7rem',
                border: `1px solid ${colors.border}`,
                borderRadius: '5px',
                fontSize: '0.95rem',
              }}
            />
          </div>

          <button
            style={{
              backgroundColor: colors.button,
              color: colors.background,
              padding: '0.7rem 1.5rem',
              border: 'none',
              borderRadius: '5px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Search Plots
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hero-content {
            margin-left: 3rem !important;
          }
          .hero-title {
            font-size: 3rem !important;
          }
          .hero-subtitle {
            font-size: 1.1rem !important;
          }
        }
        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.75rem !important;
          }
          .hero-subtitle {
            font-size: 0.9rem !important;
          }
          .hero-search {
            bottom: -300px !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;