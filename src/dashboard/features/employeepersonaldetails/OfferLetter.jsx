import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import html2canvas from 'html2canvas';

const OfferLetter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.employee;
  const autoDownload = location.state?.autoDownload;

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
    const element = document.getElementById('offer-letter-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `OfferLetter_${employee.name.replace(/\s+/g, '_')}_${employee.code}.png`;
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
          Offer Letter - {employee.name}
        </h2>
        <button
          onClick={handleDownload}
          style={{
            marginLeft: 'auto',
            padding: '10px 24px',
            backgroundColor: 'rgba(31, 111, 84, 1)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Download
        </button>
      </div>

      <div id="offer-letter-content" style={{
        backgroundColor: '#fff',
        padding: '60px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: '0 0 16px 0' }}>
            LANDVEST INFRA
          </h1>
          <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>
            Door No:12-8-42, 2nd Floor, Savithri Mallaah Arcade, Lallaguda,<br />
            Secunderabad, Hyderabad, Telangana-500017
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', fontSize: '13px' }}>
          <div>
            <strong>Ref:</strong> MKT/AO/2247
          </div>
          <div>
            <strong>Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div style={{ marginBottom: '24px', fontSize: '14px', lineHeight: '1.8' }}>
          <p style={{ margin: '0 0 4px 0' }}>To,</p>
          <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>{employee.name}</p>
          <p style={{ margin: '0 0 4px 0' }}>{employee.address || 'N/A'}</p>
          <p style={{ margin: '0 0 4px 0' }}>{employee.city || ''} {employee.state || ''}</p>
        </div>

        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '16px' }}>
          <strong>Dear Mr./Ms. {employee.name}</strong>
        </p>

        <p style={{ fontSize: '13px', lineHeight: '1.8', marginBottom: '16px', textAlign: 'justify' }}>
          This is with reference to your application, the Management is pleased to appoint you as MD to sell the plots/
          farmlands/villas/apartments on the following terms and conditions with effect from {new Date(employee.doj).toLocaleDateString('en-GB')}
        </p>

        <div style={{ fontSize: '13px', lineHeight: '1.8', marginBottom: '24px', textAlign: 'justify' }}>
          <p style={{ marginBottom: '12px' }}>
            <strong>1.</strong> Your engagement is purely on commission basis. You will be paid MD Cadre commission as per the
            company is commission structure. Your services will be under the guidance and control of Mr./Ms. B
            BETHENDRA.MH
          </p>

          <p style={{ marginBottom: '12px' }}>
            <strong>2.</strong> You have to sell plots/farmlands/villas/apartments as per the terms and conditions of the company as
            applicable.
          </p>

          <p style={{ marginBottom: '12px' }}>
            <strong>3.</strong> You can recruit your Marketing Executives upto the cadre of MVP and you will be paid overriding
            commission on team sales.
          </p>

          <p style={{ marginBottom: '12px' }}>
            <strong>4.</strong> All the Marketing Executives recruited or to be recruited by you will continue to work under you. The
            recruitment of them will be done as per your recommendations.
          </p>

          <p style={{ marginBottom: '12px' }}>
            <strong>5.</strong> Your down line executives should have discipline, sincerity and integrity towards the company. Before
            recommending anybody for a particular post, you should interview them personally and should get satisfied
            yourself with his/her credentials and culture.
          </p>

          <p style={{ marginBottom: '12px' }}>
            <strong>6.</strong> You have the absolute right to recommend for suspension of your down line executives in case of
            misbehavior or wrong commitments. If anyone is found misbehaving with others and committing wrong, he/
            she will be suspended immediately and all the future eligible commissions will be stopped without any
            further notice.
          </p>

          <p style={{ marginBottom: '12px' }}>
            <strong>7.</strong> You should achieve the set target fixed by the Management from time to time.
          </p>

          <p style={{ marginBottom: '12px' }}>
            <strong>8.</strong> All the information pertaining to your team performance and commission eligibility will be intimated to
            you from time to time and subsequently the commission payment to your down line executives will be done
            in consultation with you.
          </p>

          <p style={{ marginBottom: '12px' }}>
            <strong>9.</strong> All the commitments to be given to your down line executives in respect of discounts and promotions will
            be done in consultation with you.
          </p>
        </div>

        <div style={{ marginBottom: '40px', fontSize: '13px' }}>
          <p style={{ margin: '0 0 8px 0' }}><strong>With Best Wishes,</strong></p>
          <p style={{ margin: '0 0 8px 0' }}><strong>HASINI ESTATES</strong></p>
          <p style={{ margin: '0' }}><strong>GENERAL MANAGER, (MKTG)</strong></p>
        </div>

        <p style={{ fontSize: '12px', lineHeight: '1.6', marginBottom: '40px', textAlign: 'justify' }}>
          I have read this letter and fully understood the terms and conditions of my engagement and accept the same
          without any reservations.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
          <div>
            <p style={{ margin: '0 0 40px 0' }}><strong>Signature:</strong></p>
            <div style={{ borderBottom: '1px solid #000', width: '200px' }}></div>
          </div>
          <div>
            <p style={{ margin: '0 0 40px 0' }}><strong>Date:</strong></p>
            <div style={{ borderBottom: '1px solid #000', width: '200px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferLetter;
