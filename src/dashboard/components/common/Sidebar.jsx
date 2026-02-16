import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FolderKanban, Network, FileText, Award, BookOpen, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import { dashboardColors } from "../../styles/colors";
import logo from '../../../assets/landvest-logo.png';



const Sidebar = ({ isOpen, setIsOpen }) => {
  const [orgTreeOpen, setOrgTreeOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Associates', path: '/dashboard/associates/management' },
    { icon: FolderKanban, label: 'Projects', path: '/dashboard/projects/management' },
    { 
      icon: Network, 
      label: 'Org Tree', 
      path: '/dashboard/org-tree',
      subItems: [
        { label: 'Org Management', path: '/dashboard/org-tree/management' },
        { label: 'Teams & Roles', path: '/dashboard/org-tree/teams-and-roles' }
      ]
    },
    { icon: FileText, label: 'Reports', path: '/dashboard/reports/associate-reports' },
    { icon: Award, label: 'Designation', path: '/dashboard/designations/management' },
    { icon: BookOpen, label: 'Directory', path: '/dashboard/directory/management' },
    { icon: BarChart3, label: 'Key Reports', path: '/dashboard/key-reports/reports' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{
      width: isOpen ? '260px' : '70px',
      height: '100vh',
      backgroundColor: dashboardColors.secondary,
      position: 'fixed',
      left: 0,
      top: 0,
      transition: 'width 0.3s ease',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: '20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isOpen ? 'space-between' : 'center',
        minHeight: '70px'
      }}>
        {isOpen && (
  <img
    src={logo}
    alt="Logo"
    style={{
      height: '100px',
      objectFit: 'contain'
    }}
  />
)}
        <button onClick={() => setIsOpen(!isOpen)} style={{
          background: 'none',
          border: 'none',
          color: dashboardColors.primary,
          cursor: 'pointer',
          padding: '5px',
          display: 'flex',
          alignItems: 'center'
        }}>
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }}>
        {menuItems.map((item, index) => (
          <div key={index}>
            <Link
              to={item.subItems ? '#' : item.path}
              onClick={(e) => {
                if (item.subItems) {
                  e.preventDefault();
                  setOrgTreeOpen(!orgTreeOpen);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: isOpen ? '12px 20px' : '12px 0',
                justifyContent: isOpen ? 'space-between' : 'center',
                color: isActive(item.path) ? '#C9A24D' : dashboardColors.primary,
                textDecoration: 'none',
                backgroundColor: isActive(item.path) ? 'rgba(201,162,77,0.1)' : 'transparent',
                borderLeft: isActive(item.path) ? '4px solid #C9A24D' : '4px solid transparent',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                fontWeight:600
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <item.icon size={22} />
                {isOpen && <span style={{ fontSize: '15px' }}>{item.label}</span>}
              </div>
              {isOpen && item.subItems && (
                orgTreeOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />
              )}
            </Link>

            {item.subItems && orgTreeOpen && isOpen && (
              <div style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                {item.subItems.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    style={{
                      display: 'block',
                      padding: '10px 20px 10px 57px',
                      color: isActive(subItem.path) ? '#C9A24D' : dashboardColors.primary,
                      textDecoration: 'none',
                      fontSize: '14px',
                      backgroundColor: isActive(subItem.path) ? 'rgba(201,162,77,0.1)' : 'transparent',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(subItem.path)) {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(subItem.path)) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
