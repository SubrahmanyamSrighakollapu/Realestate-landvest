import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle } from 'lucide-react';
import dashboardColors from '../../../styles/colors'; // adjust path as needed

const Review = ({ onPrevious, currentStep }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Form states
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Success modal
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      console.log('Selected image:', file.name);
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
      setSelectedImage(e.dataTransfer.files[0]);
      console.log('Dropped image:', e.dataTransfer.files[0].name);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    // Basic validation (you can expand)
    if (!userName.trim() || !description.trim()) {
      alert('Please fill User Name and Description');
      return;
    }

    // Simulate submission
    console.log('Testimonial submitted:', {
      userName,
      date,
      description,
      image: selectedImage?.name,
    });

    // Show success modal
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/dashboard/projects/management'); // or wherever you want
  };

  return (
    <div>
      <h2 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: dashboardColors.primary,
        marginBottom: '8px',
      }}>
        Customer Testimonials
      </h2>
      <p style={{
        fontSize: '14px',
        color: dashboardColors.textLight,
        marginBottom: '32px',
      }}>
        Manage customer reviews and testimonials for your project
      </p>

      {/* Form */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '40px',
      }}>
        {/* User Name */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: dashboardColors.text,
            marginBottom: '8px',
          }}>
            User Name
          </label>
          <input
            type="text"
            placeholder="Enter User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: '80%',
              padding: '10px 14px',
              border: `1px solid ${dashboardColors.border}`,
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        {/* Date */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: dashboardColors.text,
            marginBottom: '8px',
          }}>
            Date
          </label>
          <div style={{
            position: 'relative',
          }}>
            <input
              type="text"
              placeholder="mm/dd/yy"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: '80%',
                padding: '10px 14px 10px 14px',
                border: `1px solid ${dashboardColors.border}`,
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <Calendar
              size={18}
              color={dashboardColors.primary}
              style={{
                position: 'absolute',
                right: '100px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* User Image Upload */}
      <div style={{ marginBottom: '40px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: dashboardColors.text,
          marginBottom: '8px',
        }}>
          User Image
        </label>
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
          onClick={handleImageClick}
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
              👤
            </div>

            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: dashboardColors.text,
              margin: '0 0 4px 0',
            }}>
              User Image
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

          {selectedImage ? (
            <p style={{
              fontSize: '14px',
              color: dashboardColors.primary,
              fontWeight: '500',
              marginTop: '12px',
            }}>
              Selected: {selectedImage.name}
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
      </div>

      {/* Description */}
      <div style={{ marginBottom: '40px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: dashboardColors.text,
          marginBottom: '8px',
        }}>
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Detailed information about your project"
          rows={5}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: `1px solid ${dashboardColors.border}`,
            borderRadius: '8px',
            fontSize: '14px',
            resize: 'vertical',
            outline: 'none',
            minHeight: '100px',
          }}
        />
      </div>

      {/* All Testimonials Section */}
      <div style={{
        backgroundColor: dashboardColors.white,
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '40px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: dashboardColors.text,
            margin: 0,
          }}>
            All Testimonials
          </h3>

          <button style={{
            padding: '10px 20px',
            backgroundColor: dashboardColors.button, // gold/orange
            color: dashboardColors.white,
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}>
            +Add Testimonials
          </button>
        </div>

        {/* Placeholder for testimonials list */}
        <p style={{
          fontSize: '14px',
          color: dashboardColors.textLight,
          textAlign: 'center',
          padding: '20px 0',
        }}>
          No testimonials added yet
        </p>
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '32px',
        borderTop: `1px solid ${dashboardColors.border}`,
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
          onClick={handleSubmit}
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
          Save & Submit
        </button>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: dashboardColors.white,
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            textAlign: 'center',
            maxWidth: '400px',
            width: '90%',
          }}>
            <CheckCircle
              size={64}
              color="#10b981"
              style={{ marginBottom: '16px' }}
            />
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: dashboardColors.text,
              marginBottom: '12px',
            }}>
              Success!
            </h3>
            <p style={{
              fontSize: '14px',
              color: dashboardColors.textLight,
              marginBottom: '24px',
            }}>
              Testimonial added successfully!
            </p>
            <button
              onClick={handleSuccessClose}
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
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;