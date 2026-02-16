import heroImage from '../../../assets/hero-background.png';
import { colors } from '../../colors';

const Hero = () => {
  return (
    <section
      style={{
        backgroundImage:
          `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        position: 'relative',
        padding: '2rem',
        paddingBottom: '8rem',
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          marginLeft: '3rem',
          marginTop: '6rem',
          textAlign: 'left',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: '600',
            color: colors.background,
            marginBottom: '1rem',
            lineHeight: '1.2',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Secure Your Future with Approved Open Plots
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: colors.background,
            marginBottom: '2rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          Invest in DTCP & RERA approved plots in prime developing corridors.
          <br />
          100% Clear Title • Instant Registration • High Appreciation
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            style={{
              backgroundColor: colors.button,
              color: colors.background,
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            View Projects
          </button>

          <button
            style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: colors.text,
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Talk to Expert
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: colors.background,
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '1000px',
          position: 'absolute',
          bottom: '-75px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            alignItems: 'end',
          }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: colors.text }}>
              Location
            </label>
            <select
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${colors.border}`,
                borderRadius: '5px',
                fontSize: '1rem',
              }}
            >
              <option>Select Location</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: colors.text }}>
              Property Type
            </label>
            <select
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${colors.border}`,
                borderRadius: '5px',
                fontSize: '1rem',
              }}
            >
              <option>All types</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: colors.text }}>
              Budget Range
            </label>
            <input
              type="text"
              placeholder="Any Budget"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${colors.border}`,
                borderRadius: '5px',
                fontSize: '1rem',
              }}
            />
          </div>

          <button
            style={{
              backgroundColor: colors.button,
              color: colors.background,
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
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
    </section>
  );
};

export default Hero;