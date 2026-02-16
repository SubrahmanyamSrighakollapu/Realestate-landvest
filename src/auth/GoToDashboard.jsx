import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const GoToDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{
        flex: 1,
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <div style={{ maxWidth: '450px', width: '100%', textAlign: 'center' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: 'rgba(31, 111, 84, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px'
          }}>
            <CheckCircle size={60} color="rgba(31, 111, 84, 1)" />
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '600', color: 'rgba(31, 111, 84, 1)', margin: '0 0 16px 0' }}>
            We're verifying your details!
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '48px' }}>
            This may take a few minutes. You'll be notified once it's done.
          </p>

          <button
            onClick={() => navigate('/dashboard')}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: 'rgba(31, 111, 84, 1)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoToDashboard;
