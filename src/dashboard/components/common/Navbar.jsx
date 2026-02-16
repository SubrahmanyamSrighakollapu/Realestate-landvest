import { Link } from 'react-router-dom';
import { dashboardColors } from '../../styles/colors';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: dashboardColors.primary,
      color: 'white',
      padding: '1rem 2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
        <Link to="/dashboard" style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
          RealEstate Dashboard
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Back to Site</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;