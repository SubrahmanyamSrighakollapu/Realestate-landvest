import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { authService } from '../services/authService';
import { toastService } from '../services/toastService';
import LoginBgImage from '../../src/assets/login-bg.png'

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ code: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(formData.code, formData.password);
      if (response.success) {
        toastService.success('Login successful!');
        navigate('/dashboard');
        // Fetch employee info after navigation
        authService.fetchEmployeeInfo(formData.code);
      }
    } catch (err) {
      toastService.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
              src="/src/assets/login-image.png"
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

      {/* Right side - Login form */}
      <div style={{
        flex: 1,
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}>
        <div style={{ maxWidth: '450px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: 'rgba(31, 111, 84, 1)',
              margin: '0 0 12px 0',
            }}>
              Welcome Back
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: 0,
            }}>
              Sign in to continue
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(31, 111, 84, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px 0 0 1px', // softer corners
                  zIndex: 1,
                }}>
                  <User size={20} color="#ffffff" />
                </div>
                <input
                  type="text"
                  placeholder="Employee Code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 65px',
                    border: 'none',
                    backgroundColor: 'rgba(31, 111, 84, 0.15)',
                    borderRadius: '1px',
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(31, 111, 84, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px 0 0 1px',
                  zIndex: 1,
                }}>
                  <Lock size={20} color="#ffffff" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 65px',
                    border: 'none',
                    backgroundColor: 'rgba(31, 111, 84, 0.15)',
                    borderRadius: '1px',
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ textAlign: 'right', marginBottom: '32px' }}>
              <a
                href="#"
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  textDecoration: 'none',
                }}
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: loading ? '#ccc' : 'rgba(31, 111, 84, 1)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '1px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '24px',
              }}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                Don't have an account?{' '}
              </span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/auth/signup');
                }}
                style={{
                  fontSize: '14px',
                  color: 'rgba(31, 111, 84, 1)',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;