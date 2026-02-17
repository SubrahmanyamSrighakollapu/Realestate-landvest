import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import logo from '../../assets/landvest-logo.jpeg';

const Navbar = () => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProjectsOpen(false);
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
    transition: 'all 0.2s',
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
          padding: '0 2rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem'
        }}
      >
        {/* LEFT SECTION - Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <img
              src={logo}
              alt="Landvest Logo"
              style={{ height: '60px', width: 'auto' }}
            />
          </Link>
        </div>

        {/* CENTER SECTION - Navigation Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          {['Home', 'About'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              style={navLink}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#E8F5F1';
                e.target.style.color = '#1F6F54';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#374151';
              }}
            >
              {item}
            </Link>
          ))}

          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              style={{
                ...navLink,
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E8F5F1';
                e.currentTarget.style.color = '#1F6F54';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#374151';
              }}
            >
              Projects
              <ChevronDown size={16} />
            </button>

            {isProjectsOpen && (
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
                  zIndex: 1001,
                }}
              >
                {['ongoing', 'completed', 'upcoming'].map((item) => (
                  <Link
                    key={item}
                    to={`/projects/${item}`}
                    onClick={() => setIsProjectsOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1.2rem',
                      fontSize: '0.9rem',
                      color: '#374151',
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = '#f3f4f6')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = 'transparent')
                    }
                  >
                    {item} Projects
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[ 'Gallery'].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              style={navLink}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#E8F5F1';
                e.target.style.color = '#1F6F54';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#374151';
              }}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* RIGHT SECTION - Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <button
            aria-label="Search"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#4b5563',
              padding: '0.5rem',
            }}
          >
            <Search size={18} />
          </button>

          <Link
            to="/auth/signup"
            style={{
              backgroundColor: '#1F6F54',
              color: '#ffffff',
              padding: '0.55rem 1.4rem',
              borderRadius: '5px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Associate Login
          </Link>

          <Link
            to="/contact"
            style={{
              backgroundColor: '#C9A24D',
              color: '#ffffff',
              padding: '0.55rem 1.4rem',
              borderRadius: '5px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;