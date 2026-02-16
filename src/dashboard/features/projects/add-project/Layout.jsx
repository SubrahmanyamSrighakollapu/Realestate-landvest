import React, { useRef, useState } from 'react';
import dashboardColors from '../../../styles/colors'; // adjust path as needed

const Layout = ({ onNext, onPrevious, currentStep }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // You can preview or upload here later
      console.log('Selected file:', file.name);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      console.log('Dropped file:', e.dataTransfer.files[0].name);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <h2 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: dashboardColors.primary,
        marginBottom: '8px',
      }}>
        Layout Plan
      </h2>
      <p style={{
        fontSize: '14px',
        color: dashboardColors.textLight,
        marginBottom: '32px',
      }}>
        Upload a layout plan image to draw plots
      </p>

      {/* Upload Area */}
      <div style={{
        border: `2px dashed ${dashboardColors.border}`,
        borderRadius: '12px',
        padding: '60px 20px',
        textAlign: 'center',
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
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <div style={{
          marginBottom: '16px',
        }}>
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
            📐
          </div>

          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: dashboardColors.text,
            margin: '0 0 4px 0',
          }}>
            Layout Plan
          </h3>
          <p style={{
            fontSize: '14px',
            color: dashboardColors.textLight,
            margin: '0 0 8px 0',
          }}>
            Drag & drop or click to upload
          </p>
          <p style={{
            fontSize: '13px',
            color: dashboardColors.textLight,
          }}>
            Recommended: 2014×513 px
          </p>
        </div>

        {selectedFile ? (
          <p style={{
            fontSize: '14px',
            color: dashboardColors.primary,
            fontWeight: '500',
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
              marginTop: '12px',
            }}
          >
            Choose File
          </button>
        )}
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '32px',
        borderTop: `1px solid ${dashboardColors.border}`,
        marginTop: '40px',
      }}>
        <button
          onClick={onPrevious}
          style={{
            padding: '12px 32px',
            backgroundColor: dashboardColors.white,
            color: dashboardColors.text,
            border: `1px solid ${dashboardColors.border}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          Previous
        </button>

        <button
          onClick={onNext}
          style={{
            padding: '12px 32px',
            backgroundColor: dashboardColors.primary,
            color: dashboardColors.white,
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default Layout;