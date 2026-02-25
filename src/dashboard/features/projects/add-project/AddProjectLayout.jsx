import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BasicInfo from './BasicInfo';
import Pricing from './Pricing';
import Highlights from './Highlights';
import Location from './Location';
import Layout from './Layout';
import Gallery from './Gallery';
import Review from './Review';

const AddProjectLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projectData, setProjectData] = useState({});

  const steps = [
    { number: 1, label: 'Basic Info', component: BasicInfo, path: '/dashboard/projects/add/basic-info' },
    { number: 2, label: 'Pricing', component: Pricing, path: '/dashboard/projects/add/pricing' },
    { number: 3, label: 'Highlights', component: Highlights, path: '/dashboard/projects/add/highlights' },
    { number: 4, label: 'Location', component: Location, path: '/dashboard/projects/add/location' },
    { number: 5, label: 'Layout', component: Layout, path: '/dashboard/projects/add/layout' },
    { number: 6, label: 'Gallery', component: Gallery, path: '/dashboard/projects/add/gallery' },
    { number: 7, label: 'Review', component: Review, path: '/dashboard/projects/add/review' }
  ];

  // Determine current step from URL
  const getCurrentStep = () => {
    const currentPath = location.pathname;
    const stepIndex = steps.findIndex(step => step.path === currentPath);
    return stepIndex >= 0 ? stepIndex + 1 : 1;
  };

  const currentStep = getCurrentStep();

  // Redirect to basic-info if on base /add route
  useEffect(() => {
    if (location.pathname === '/dashboard/projects/add') {
      navigate('/dashboard/projects/add/basic-info', { replace: true });
    }
  }, [location.pathname, navigate]);

  const CurrentStepComponent = steps[currentStep - 1]?.component || BasicInfo;

  const handleNext = () => {
    if (currentStep < 7) {
      navigate(steps[currentStep].path);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      navigate(steps[currentStep - 2].path);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--dashboard-primary)', margin: '0 0 8px 0' }}>
          Add Projects
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--dashboard-text-light)', margin: 0 }}>
          Manage and monitor all plot projects
        </p>
      </div>

      <div style={{
        backgroundColor: 'var(--dashboard-white)',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        border: '1px solid var(--dashboard-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '56px', position: 'relative' }}>
          {steps.map((step, index) => (
            <div key={step.number} style={{ display: 'flex', alignItems: 'center', flex: index < steps.length - 1 ? 1 : 'none', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: currentStep === step.number ? '#f5bc40' : currentStep > step.number ? 'var(--dashboard-primary)' : '#f3f4f6',
                  color: currentStep >= step.number ? 'var(--dashboard-white)' : '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  boxShadow: currentStep === step.number ? '0 4px 12px rgba(201, 162, 77, 0.4)' : currentStep > step.number ? '0 4px 12px rgba(31, 111, 84, 0.3)' : 'none',
                  border: currentStep === step.number ? '5px solid rgba(247, 244, 240, 0.3)' : currentStep > step.number ? '3px solid rgba(31, 111, 84, 0.2)' : '2px solid #e5e7eb',
                  transition: 'all 0.3s ease'
                }}>
                  {step.number}
                </div>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: currentStep === step.number ? '#f0b22b' : currentStep > step.number ? 'var(--dashboard-primary)' : '#6b7280',
                  whiteSpace: 'nowrap',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div style={{
                  flex: 1,
                  height: '4px',
                  background: currentStep > step.number 
                    ? 'linear-gradient(90deg, var(--dashboard-primary) 0%, var(--dashboard-primary) 100%)' 
                    : '#e5e7eb',
                  margin: '0 20px',
                  marginBottom: '40px',
                  borderRadius: '2px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: currentStep > step.number ? '0 2px 4px rgba(31, 111, 84, 0.2)' : 'none'
                }}>
                  {currentStep > step.number && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      animation: 'shimmer 2s infinite'
                    }}></div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <CurrentStepComponent 
          onNext={handleNext} 
          onPrevious={handlePrevious} 
          currentStep={currentStep}
          projectData={projectData}
          setProjectData={setProjectData}
        />
      </div>
    </div>
  );
};

export default AddProjectLayout;
