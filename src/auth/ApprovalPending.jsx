import LoginBgImage from '../assets/login-bg.png';
import ApprovalGif from '../../src/assets/approval pending gif.gif';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../assets/login-image.png';


const ApprovalPending = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left side - Background image + gradient overlay + centered content image */}
      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${LoginBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />

        {/* Gradient overlay on top of background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(31, 111, 84, 0.8) 0%, rgba(67, 194, 151, 0.5) 100%)',
        }} />

        {/* Centered handshake + house image */}
        <div style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          zIndex: 2,
        }}>
          <div style={{ maxWidth: '450px', width: '100%' }}>
            <img
              src={LoginImage}
              alt="Real Estate"
              style={{
                width: '100%',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Right side - Approval Pending Card */}
      <div style={{
        flex: 1,
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          border: '2px solid rgba(31, 111, 84, 1)',
          borderRadius: '8px',
          padding: '60px 40px',
          textAlign: 'center'
        }}>
          <img
            src={ApprovalGif}
            alt="Approval Pending"
            style={{
              width: '450px',
              height: '300px',
              margin: '0 auto',
              display: 'block'
            }}
          />
          
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 16px 0'
          }}>
            Under Review
          </h2>
          
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.6',
            margin: '0 0 30px 0'
          }}>
            Your account registration is currently under review by our admin team. We appreciate your patience!
          </p>
          
          <div
          onClick={() => navigate('/contact')}
          style={{
            backgroundColor: 'rgba(31, 111, 84, 1)',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '4px',
            fontSize: '15px',
            fontWeight: '500',
            cursor: 'pointer',
           
          }}>
            Contact Admin
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalPending;
