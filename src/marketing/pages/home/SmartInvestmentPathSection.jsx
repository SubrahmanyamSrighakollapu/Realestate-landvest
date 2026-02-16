import { Shield, Clock, MapPin, TrendingUp } from 'lucide-react';

const SmartInvestmentPathSection = () => {
  return (
    <section style={{
      padding: '6rem 2rem',
      backgroundColor: '#f8fffe',
      width: '100%',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 700, color: '#1F6F54', marginBottom: '1rem' }}>
          Your Smart Investment Path
        </h2>
        <p style={{ color: '#6B7C73', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          A proven 4-step strategy designed for security and high appreciation.<br/>
          We guide you through every milestone.
        </p>
      </div>

      <div style={{
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '10rem',
        alignItems: 'center',
        justifyItems: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          border: '3px solid #1F6F54',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 10,
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '10px',
            backgroundColor: '#1F6F54',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.8rem'
          }}>
            <Shield size={24} color="white" />
          </div>
          <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#1F6F54' }}>
            Smart<br/>Investment
          </h3>
          <span style={{ fontSize: '1rem', color: '#6B7C73', marginTop: '0.3rem' }}>
            Core Strategy
          </span>
        </div>

        <div style={{
          backgroundColor: '#FFFEF4',
          padding: '2rem',
          borderRadius: '5px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          position: 'relative',
          width: '350px',
          minHeight: '180px',
          justifySelf: 'end'
        }}>
          <div style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#B8860B'
          }}>01</div>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: '#B8860B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <Shield size={20} color="white" />
          </div>
          <h4 style={{ margin: '0 0 0.6rem', fontWeight: 700, color: '#333', fontSize: '1.1rem' }}>Secure Start</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#6B7C73', lineHeight: 1.4 }}>
            Begin your investment journey with legally verified and trusted properties.
          </p>
        </div>

        <div style={{
          backgroundColor: '#F0FFF4',
          padding: '2rem',
          borderRadius: '5px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          position: 'relative',
          width: '350px',
          minHeight: '180px',
          justifySelf: 'start'
        }}>
          <div style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#1F6F54'
          }}>02</div>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: '#1F6F54',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <Clock size={20} color="white" />
          </div>
          <h4 style={{ margin: '0 0 0.6rem', fontWeight: 700, color: '#333', fontSize: '1.1rem' }}>Smart Timing</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#6B7C73', lineHeight: 1.4 }}>
            Invest at the right stage to maximize future value and growth potential.
          </p>
        </div>

        <div style={{
          backgroundColor: '#FFEBEB',
          padding: '2rem',
          borderRadius: '5px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          position: 'relative',
          width: '350px',
          minHeight: '180px',
          justifySelf: 'end'
        }}>
          <div style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#DC2626'
          }}>04</div>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: '#DC2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <TrendingUp size={20} color="white" />
          </div>
          <h4 style={{ margin: '0 0 0.6rem', fontWeight: 700, color: '#333', fontSize: '1.1rem' }}>Growth Focused</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#6B7C73', lineHeight: 1.4 }}>
            Build long-term wealth with plots designed for steady market appreciation.
          </p>
        </div>

        <div style={{
          backgroundColor: '#EEF1FF',
          padding: '2rem',
          borderRadius: '5px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          position: 'relative',
          width: '350px',
          minHeight: '180px',
          justifySelf: 'start'
        }}>
          <div style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#4F46E5'
          }}>03</div>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: '#4F46E5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <MapPin size={20} color="white" />
          </div>
          <h4 style={{ margin: '0 0 0.6rem', fontWeight: 700, color: '#333', fontSize: '1.1rem' }}>Prime Location</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#6B7C73', lineHeight: 1.4 }}>
            Choose locations with high demand, connectivity, and development potential.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SmartInvestmentPathSection;