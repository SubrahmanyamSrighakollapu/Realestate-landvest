import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useRef, useEffect } from 'react';
import idCardTemplate from '../../assets/Real estate ID.jpeg';
import html2canvas from 'html2canvas';

const IDCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.employee;
  const autoDownload = location.state?.autoDownload;
  const cardRef = useRef(null);

  useEffect(() => {
    if (autoDownload && employee) {
      const timer = setTimeout(() => handleDownload(), 500);
      return () => clearTimeout(timer);
    }
  }, [autoDownload, employee]);

  if (!employee) {
    return <div>No employee data available</div>;
  }

  const handleDownload = async () => {
    const element = cardRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: null
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
              <span style={{ color: '#6b7280' }}>{employee.role?.name || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', color: '#374151', minWidth: '140px' }}>MOBILE NUMBER</span>
              <span style={{ margin: '0 8px' }}>:</span>
              <span style={{ color: '#6b7280' }}>{employee.phone}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', color: '#374151', minWidth: '140px' }}>BLOOD GROUP</span>
              <span style={{ margin: '0 8px' }}>:</span>
              <span style={{ color: '#6b7280' }}>{employee.bloodgroup || 'N/A'}</span>
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
