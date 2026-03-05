import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import idCardTemplate from '../../assets/Real estate ID.jpeg';
import html2canvas from 'html2canvas';

const IDCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.employee;
  const autoDownload = location.state?.autoDownload;
  const cardRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (autoDownload && employee && imageLoaded) {
      const timer = setTimeout(() => handleDownload(), 500);
      return () => clearTimeout(timer);
    }
  }, [autoDownload, employee, imageLoaded]);

  if (!employee) {
    return <div>No employee data available</div>;
  }

  const getInitials = (name) => {
    if (!name) return 'NA';
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const getProfileImage = () => {
    if (employee?.profileImage) {
      return `https://api.landvestinfra.com${employee.profileImage}`;
    }
    return null;
  };

  const handleDownload = async () => {
    const element = cardRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: null,
        onclone: (clonedDoc) => {
          const images = clonedDoc.querySelectorAll('img');
          images.forEach(img => {
            img.style.display = 'block';
          });
        }
      });

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `IDCard_${employee.name.replace(/\s+/g, '_')}_${employee.code}.png`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        if (autoDownload) {
          setTimeout(() => navigate(-1), 1000);
        }
      });
    } catch (error) {
      console.error('Error generating download:', error);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate(-1)} style={{
          padding: '8px',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}>
          <ArrowLeft size={20} />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', margin: 0 }}>
          ID Card - {employee.name}
        </h2>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh'
      }}>
        <div ref={cardRef} style={{
          position: 'relative',
          width: '400px',
          height: '600px',
          backgroundImage: `url(${idCardTemplate})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '20px',
          overflow: 'hidden'
        }}>
          {/* Profile Image */}
          <div style={{
                position: 'absolute',
    top: '145px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    border: '4px solid white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
          }}>
            {getProfileImage() ? (
              <img 
                src={getProfileImage()} 
                alt="Profile" 
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  console.error('Image load error');
                  setImageLoaded(true);
                }}
                style={{
                  width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '50%'   // 🔥 IMPORTANT
                }} 
              />
            ) : (
              <div style={{
                width: '100%',
        height: '100%',
        borderRadius: '50%',   // 🔥 IMPORTANT
        backgroundColor: 'rgba(31, 111, 84, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        fontWeight: '600',
        color: 'white'
              }}>
                {getInitials(employee.name)}
              </div>
            )}
          </div>

          {/* Employee Name */}
          <div style={{
            position: 'absolute',
            top: '340px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#fff',
              margin: 0,
              textTransform: 'uppercase'
            }}>
              {employee.name}
            </h3>
          </div>

          {/* Employee Details */}
          <div style={{
            position: 'absolute',
            top: '390px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '85%',
            fontSize: '13px',
            lineHeight: '2'
          }}>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', color: '#374151', minWidth: '140px' }}>POSITION</span>
              <span style={{ margin: '0 8px' }}>:</span>
              <span style={{ color: '#6b7280' }}>Property advisor</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', color: '#374151', minWidth: '140px' }}>MOBILE NUMBER</span>
              <span style={{ margin: '0 8px' }}>:</span>
              <span style={{ color: '#6b7280' }}>{employee.phone}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', color: '#374151', minWidth: '140px' }}>BLOOD GROUP</span>
              <span style={{ margin: '0 8px' }}>:</span>
              <span style={{ color: '#6b7280' }}>{employee.bloodGroup || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex' }}>
              <span style={{ fontWeight: '600', color: '#374151', minWidth: '140px' }}>ADDRESS</span>
              <span style={{ margin: '0 8px' }}>:</span>
              <span style={{ color: '#6b7280' }}>{employee.city || 'N/A'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleDownload}
          style={{
            marginTop: '32px',
            padding: '12px 32px',
            backgroundColor: 'rgba(31, 111, 84, 1)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '15px'
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default IDCard;
