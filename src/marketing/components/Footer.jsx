import { colors } from '../colors';
import { Mail, MapPin } from 'lucide-react';
import logo from '../../assets/landvest-logo.jpeg';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#f8f9fa',
      color: '#2d3748',
      padding: '4rem 0 0',
      marginTop: '4rem',
      width: '100%',
      borderTop: '1px solid #e2e8f0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <div>
            <img src={logo} alt="Landvest Logo" style={{ height: '80px', marginBottom: '1rem' }} />
            <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '0.95rem' }}>
              We develop legally clear, strategically located, and future-ready layouts designed for long-term appreciation and lifestyle growth.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: '600', color: '#1F6F54' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="/" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#1F6F54'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>Home</a>
              <a href="/about" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#1F6F54'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>About Us</a>
              <a href="/projects/ongoing" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#1F6F54'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>Projects</a>
              <a href="/gallery" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#1F6F54'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>Gallery</a>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: '600', color: '#1F6F54' }}>Contact Info</h4>
            <div style={{ color: '#64748b', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} color="#1F6F54" />
                <span>Landvest2026@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} color="#1F6F54" style={{ marginTop: '2px' }} />
                <span>123 Business Street, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '1.5rem',
          paddingBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          color: '#64748b',
          fontSize: '0.9rem'
        }}>
          <p style={{ margin: 0 }}>&copy; 2024 Landvest. All rights reserved.</p>
          <p style={{ margin: 0 }}>Designed & Developed by <a href="https://vividuss.com" target="_blank" rel="noopener noreferrer" style={{ color: '#1F6F54', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#C9A24D'} onMouseLeave={(e) => e.target.style.color = '#1F6F54'}>vividuss.com</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;