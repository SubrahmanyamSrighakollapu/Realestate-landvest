import { colors } from '../colors';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: colors.text,
      color: colors.background,
      padding: '3rem 0 1rem',
      marginTop: '4rem',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ marginBottom: '1rem', color: colors.secondary }}>RealEstate</h3>
            <p style={{ color: colors.textLight, lineHeight: '1.6' }}>
              Your trusted partner in real estate investments. Building dreams, creating value.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="/" style={{ color: colors.textLight, textDecoration: 'none' }}>Home</a>
              <a href="/about" style={{ color: colors.textLight, textDecoration: 'none' }}>About Us</a>
              <a href="/gallery" style={{ color: colors.textLight, textDecoration: 'none' }}>Gallery</a>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Contact Info</h4>
            <div style={{ color: colors.textLight, lineHeight: '1.6' }}>
              <p>Email: info@realestate.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Business St, City, State 12345</p>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: `1px solid ${colors.border}`,
          paddingTop: '1rem',
          textAlign: 'center',
          color: colors.textLight
        }}>
          <p>&copy; 2024 RealEstate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;