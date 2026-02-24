import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import logo from '../../assets/landvest-logo.jpeg';

const Navbar = () => {
  const [isDesktopProjectsOpen, setIsDesktopProjectsOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDesktopProjectsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLink = {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#374151',
    textDecoration: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    position: 'relative',
    cursor: 'pointer'
  };

  return (
    <nav
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* LEFT - Logo */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={logo} alt="Landvest Logo" className="navbar-logo" style={{ height: '50px', width: 'auto' }} />
          </Link>
        </div>

        {/* CENTER - Desktop Navigation */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }} className="desktop-nav">
          <div className="desktop-nav">
            {['Home', 'About'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                style={navLink}
                className="nav-item"
              >
                {item}
              </Link>
            ))}

            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                onClick={() => setIsDesktopProjectsOpen(!isDesktopProjectsOpen)}
                style={{ ...navLink, background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                className="nav-item"
              >
                Projects <ChevronDown size={16} />
              </button>

              {isDesktopProjectsOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                    minWidth: '200px',
                    padding: '0.6rem 0',
                    zIndex: 1001
                  }}
                >
                  {['ongoing', 'completed', 'upcoming'].map((item) => (
                    <Link
                      key={item}
                      to={`/projects/${item}`}
                      onClick={() => setIsDesktopProjectsOpen(false)}
                      style={{
                        display: 'block',
                        padding: '0.75rem 1.2rem',
                        fontSize: '0.9rem',
                        color: '#374151',
                        textDecoration: 'none',
                        textTransform: 'capitalize'
                      }}
                    >
                      {item} Projects
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/gallery" style={navLink} className="nav-item">
              Gallery
            </Link>

            <Link to="/contact" style={{ ...navLink, whiteSpace: 'nowrap' }} className="nav-item">
              Contact Us
            </Link>
          </div>
        </div>

        {/* RIGHT - Desktop Button */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }} className="desktop-buttons">
          <Link
            to="/auth/login"
            style={{
              backgroundColor: '#1F6F54',
              color: '#ffffff',
              padding: '0.55rem 1.2rem',
              borderRadius: '5px',
              fontSize: '0.85rem',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Associate Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
        >
          {isMobileMenuOpen ? <X size={24} color="#374151" /> : <Menu size={24} color="#374151" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '1rem' }} className="mobile-menu">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['Home', 'About'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: '0.75rem 1rem', fontSize: '0.95rem', color: '#374151', textDecoration: 'none' }}
              >
                {item}
              </Link>
            ))}

            {/* Mobile Projects */}
            <div>
              <button
                onClick={() => setIsMobileProjectsOpen(!isMobileProjectsOpen)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  fontSize: '0.95rem',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                Projects
                <ChevronDown
                  size={16}
                  style={{
                    transform: isMobileProjectsOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s'
                  }}
                />
              </button>

              {isMobileProjectsOpen && (
                <div style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                  {['ongoing', 'completed', 'upcoming'].map((item) => (
                    <Link
                      key={item}
                      to={`/projects/${item}`}
                      onClick={() => {
                        setIsMobileProjectsOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      style={{
                        display: 'block',
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        color: '#64748b',
                        textDecoration: 'none',
                        textTransform: 'capitalize'
                      }}
                    >
                      {item} Projects
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} style={{  padding: '0.75rem 1rem', 
    fontSize: '0.95rem',
    color: '#374151',
    textDecoration: 'none',
    borderRadius: '6px' }}>
              Gallery
            </Link>

            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} style={{  padding: '0.75rem 1rem', 
    fontSize: '0.95rem',
    color: '#374151',
    textDecoration: 'none',
    borderRadius: '6px' }}>
              Contact Us
            </Link>

            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <Link
                to="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  backgroundColor: '#1F6F54',
                  color: '#ffffff',
                  padding: '0.75rem',
                  borderRadius: '5px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block'
                }}
              >
                Associate Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* YOUR ORIGINAL STYLES KEPT EXACTLY SAME */}
      <style>{`
        .nav-item {
          position: relative;
          transition: color 0.3s ease;
          cursor: pointer;
        }

        .nav-item:hover {
          color: #1F6F54 !important;
        }

        .nav-item::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #1F6F54, #C9A24D);
          transition: all 0.35s ease;
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .nav-item:hover::after {
          width: 70%;
        }

        .nav-item:hover {
          transform: translateY(-2px);
        }

        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; align-items: center; gap: 1.5rem; }
          .desktop-buttons { display: flex !important; align-items: center; gap: 1rem; }
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
          .navbar-logo { height: 65px !important; }
        }

        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .desktop-buttons { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .navbar-logo { height: 40px !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;