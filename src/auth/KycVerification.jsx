import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import dashboardColors from '../../src/dashboard/styles/colors'; // adjust path
import LoginBgImage from '../../src/assets/login-bg.png';

const KycVerification = ({ onPrevious, onNext }) => {  // ← props are now optional
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [panNumber, setPanNumber] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit');
        return;
      }
      setSelectedFile(file);
      console.log('Selected PAN file:', file.name);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit');
        return;
      }
      setSelectedFile(file);
      console.log('Dropped PAN file:', file.name);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!panNumber.trim() || !selectedFile) {
      alert('Please enter PAN number and upload PAN card');
      return;
    }

    console.log('KYC submitted:', { panNumber, file: selectedFile.name });

    // Safe navigation: use onNext if provided, else fallback to dashboard
    if (onNext) {
      onNext();
    } else {
      navigate('/auth/go-to-dashboard');
    }
  };

  const handleGoBack = () => {
    // Safe back navigation: use onPrevious if provided, else go back in history
    if (onPrevious) {
      onPrevious();
    } else {
      navigate(-1); // browser back
    }
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

      {/* Centered KYC Card */}
      <div style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        padding: '40px 32px',
        maxWidth: '520px',
        width: '100%',
        textAlign: 'center',
        zIndex: 2,
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          color: dashboardColors.text,
          margin: '0 0 8px 0',
        }}>
          Upload Your PAN Card
        </h1>

        <p style={{
          fontSize: '15px',
          color: dashboardColors.textLight,
          margin: '0 0 32px 0',
        }}>
          Complete your KYC verification
        </p>

        {/* Upload Area */}
        <div style={{
          border: `2px dashed ${dashboardColors.border}`,
          borderRadius: '12px',
          padding: '40px 20px',
          marginBottom: '32px',
          backgroundColor: dashboardColors.white,
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: dragActive ? '0 0 0 3px rgba(31,111,84,0.15)' : 'none',
        }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <div style={{ marginBottom: '16px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 12px',
              borderRadius: '50%',
              backgroundColor: dashboardColors.secondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              color: dashboardColors.primary,
            }}>
              ID
            </div>

            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: dashboardColors.text,
              margin: '0 0 4px 0',
            }}>
              Upload PAN Card
            </h3>
            <p style={{
              fontSize: '14px',
              color: dashboardColors.textLight,
              margin: '0 0 8px 0',
            }}>
              PDF, JPG, or PNG (Max 5MB)
            </p>
          </div>

          {selectedFile ? (
            <p style={{
              fontSize: '14px',
              color: dashboardColors.primary,
              fontWeight: '500',
              margin: '12px 0',
            }}>
              Selected: {selectedFile.name}
            </p>
          ) : (
            <button
              type="button"
              style={{
                padding: '10px 24px',
                backgroundColor: dashboardColors.primary,
                color: dashboardColors.white,
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Choose File
            </button>
          )}
        </div>

        {/* PAN Number Input */}
        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: dashboardColors.text,
            marginBottom: '8px',
            textAlign: 'left',
          }}>
            PAN Number
          </label>
          <input
            type="text"
            placeholder="Enter PAN number"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
            maxLength={10}
            style={{
              width: '90%',
              padding: '15px 15px',
              border: 'none',
              backgroundColor: 'rgba(31, 111, 84, 0.15)',
              borderRadius: '8px',
              fontSize: '15px',
              outline: 'none',
              color: '#1f2937',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          />
        </div>

        {/* Bottom Note */}
        <p style={{
          fontSize: '13px',
          color: dashboardColors.textLight,
          marginBottom: '32px',
        }}>
          PAN is required for KYC verification
        </p>

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          <button
            onClick={handleGoBack}  // ← safe handler
            style={{
              flex: 1,
              padding: '14px',
              backgroundColor: dashboardColors.white,
              color: dashboardColors.text,
              border: `1px solid ${dashboardColors.border}`,
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Previous
          </button>

          <button
            onClick={handleSubmit}
            disabled={!panNumber.trim() || !selectedFile}
            style={{
              flex: 1,
              padding: '14px',
              backgroundColor: dashboardColors.primary,
              color: dashboardColors.white,
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: panNumber.trim() && selectedFile ? 'pointer' : 'not-allowed',
              opacity: panNumber.trim() && selectedFile ? 1 : 0.6,
            }}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default KycVerification;