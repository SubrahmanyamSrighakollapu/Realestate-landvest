import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import dashboardColors from '../../src/dashboard/styles/colors'; // adjust path
import LoginBgImage from '../../src/assets/login-bg.png'


const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(35); // 35 seconds countdown
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      // After OTP verification, redirect to dashboard
      navigate('/dashboard');
    } else {
      alert('Please enter complete 6-digit OTP');
    }
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url(${LoginBgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(31, 111, 84, 0.8) 0%, rgba(67, 194, 151, 0.5) 100%)',
      }} />

      {/* Centered Verification Card */}
      <div style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        padding: '40px 32px',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        zIndex: 2,
      }}>
        {/* Green Checkmark Circle */}
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 24px',
          backgroundColor: '#10b981',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
        }}>
          <CheckCircle size={40} color="#ffffff" />
        </div>

        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          color: dashboardColors.text,
          margin: '0 0 8px 0',
        }}>
          OTP Verification
        </h1>

        <p style={{
          fontSize: '15px',
          color: dashboardColors.textLight,
          margin: '0 0 32px 0',
        }}>
          Enter the 6-digit OTP sent to your Aadhaar-linked mobile number
        </p>

        {/* Masked Mobile Number Box */}
        <div style={{
          backgroundColor: dashboardColors.primary,
          color: '#ffffff',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          +91-XXXXXX1234
        </div>

        {/* OTP Input Boxes */}
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                autoFocus={index === 0}
                style={{
                  width: '50px',
                  height: '50px',
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: '600',
                  border: `2px solid ${digit ? dashboardColors.primary : dashboardColors.border}`,
                  borderRadius: '8px',
                  outline: 'none',
                  backgroundColor: '#f9fafb',
                  color: dashboardColors.text,
                  transition: 'border-color 0.2s',
                }}
              />
            ))}
          </div>

          {/* Resend Timer */}
          <p style={{
            fontSize: '14px',
            color: dashboardColors.textLight,
            marginBottom: '32px',
          }}>
            Resend OTP in {formatTimer()}
          </p>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={otp.join('').length !== 6}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: dashboardColors.primary,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: otp.join('').length === 6 ? 'pointer' : 'not-allowed',
              opacity: otp.join('').length === 6 ? 1 : 0.6,
              marginBottom: '24px',
            }}
          >
            Verify & Continue
          </button>
        </form>

        {/* Bottom Links */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '14px',
            color: dashboardColors.textLight,
            margin: '0 0 8px 0',
          }}>
            Having trouble? <a href="#" style={{ color: dashboardColors.primary, textDecoration: 'none', fontWeight: '500' }}>Contact Support</a>
          </p>
          <p style={{
            fontSize: '14px',
            color: dashboardColors.textLight,
          }}>
            Don't have an account? <a href="#" onClick={() => navigate('/auth/signup')} style={{ color: dashboardColors.primary, textDecoration: 'none', fontWeight: '600' }}>Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;