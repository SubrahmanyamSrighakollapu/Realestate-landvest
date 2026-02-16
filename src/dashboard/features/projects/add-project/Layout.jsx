import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import dashboardColors from '../../../styles/colors';
import { projectService } from '../../../../services/projectService';
import { toastService } from '../../../../services/toastService';

const Layout = ({ onNext, onPrevious, currentStep, projectData }) => {
  const fileInputRef = useRef(null);
  const [layouts, setLayouts] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setLayouts(prev => [...prev, ...files]);
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
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      setLayouts(prev => [...prev, ...files]);
    }
  };

  const removeLayout = (index) => {
    setLayouts(prev => prev.filter((_, i) => i !== index));
  };

  const handleClick = () => {
  fileInputRef.current?.click();
};

  const handleSaveAndContinue = async () => {
    if (layouts.length === 0) {
      toastService.error('Please upload at least one layout');
      return;
    }

    if (!projectData?._id || !projectData?.code) {
      toastService.error('Project data is missing');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append('id', projectData._id);
      data.append('code', projectData.code);
      layouts.forEach(layout => {
        data.append('layouts', layout);
      });

      const response = await projectService.updateLayout(data);
      if (response.success) {
        toastService.success('Layout plans uploaded successfully!');
        onNext();
      }
    } catch (error) {
      toastService.error(error.response?.data?.message || 'Failed to upload layouts');
    } finally {
      setLoading(false);
    }
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
        Upload layout plan images to draw plots
      </p>

      {/* Selected Layouts */}
      {layouts.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: dashboardColors.text, marginBottom: '16px' }}>
            Selected Layouts ({layouts.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
            {layouts.map((layout, index) => (
              <div key={index} style={{
                position: 'relative',
                border: `1px solid ${dashboardColors.border}`,
                borderRadius: '8px',
                padding: '12px',
                backgroundColor: dashboardColors.white
              }}>
                <button
                  onClick={() => removeLayout(index)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0
                  }}
                >
                  <X size={14} />
                </button>
                <div style={{
                  width: '100%',
                  height: '100px',
                  backgroundColor: dashboardColors.secondary,
                  borderRadius: '6px',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px'
                }}>
                  📐
                </div>
                <p style={{
                  fontSize: '12px',
                  color: dashboardColors.text,
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {layout.name}
                </p>
                <p style={{
                  fontSize: '11px',
                  color: dashboardColors.textLight,
                  margin: '4px 0 0 0'
                }}>
                  {Math.round(layout.size / 1024)} KB
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

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
          multiple
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

        {layouts.length > 0 ? (
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
            Add More Layouts
          </button>
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
            Choose Files
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
          onClick={handleSaveAndContinue}
          disabled={loading}
          style={{
            padding: '12px 32px',
            backgroundColor: dashboardColors.primary,
            color: dashboardColors.white,
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Uploading...' : 'Save & Continue'}
        </button>
      </div>
    </div>
  );
};

export default Layout;