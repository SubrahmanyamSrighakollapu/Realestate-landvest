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
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
          {steps.map((step, index) => (
            <div key={step.number} style={{ display: 'flex', alignItems: 'center', flex: index < steps.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: currentStep === step.number ? 'rgba(255, 153, 0, 1)' : currentStep > step.number ? 'var(--dashboard-primary)' : '#e5e7eb',
                  color: currentStep >= step.number ? 'var(--dashboard-white)' : '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  {step.number}
                </div>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: currentStep === step.number ? 'rgba(255, 153, 0, 1)' : currentStep > step.number ? 'var(--dashboard-primary)' : '#9ca3af',
                  whiteSpace: 'nowrap'
                }}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div style={{
                  flex: 1,
                  height: '2px',
                  backgroundColor: currentStep > step.number ? 'var(--dashboard-primary)' : '#e5e7eb',
                  margin: '0 16px',
                  marginBottom: '32px'
                }}></div>
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
