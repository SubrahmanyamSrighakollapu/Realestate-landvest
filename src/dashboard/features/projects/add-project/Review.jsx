import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, X, Upload } from 'lucide-react';
import dashboardColors from '../../../styles/colors';
import { projectService } from '../../../../services/projectService';
import { toastService } from '../../../../services/toastService';

const Review = ({ onPrevious, currentStep, projectData, isEdit }) => {
  const navigate = useNavigate();
  const userImageRef = useRef(null);
  const fileRef = useRef(null);

  const [userName, setUserName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (projectData?.testimonials?.length > 0) {
      setTestimonials(projectData.testimonials);
    }
  }, [projectData]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

const handleDrop = (e, type) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);

  const droppedFile = e.dataTransfer.files?.[0];
  if (!droppedFile) return;

  if (!validateFileSize(droppedFile, type === 'userImage' ? 'User Image' : 'File')) {
    return;
  }

  if (type === 'userImage') setUserImage(droppedFile);
  else if (type === 'file') setFile(droppedFile);
};

  const handleAddTestimonial = () => {
    if (!userName.trim()) {
      toastService.error('User name is required');
      return;
    }
    if (!date) {
      toastService.error('Date is required');
      return;
    }
    if (!description.trim()) {
      toastService.error('Description is required');
      return;
    }

    const testimonial = {
      name: userName,
      date,
      description,
      userImage,
      file
    };

    setTestimonials(prev => [...prev, testimonial]);
    
    // Clear form
    setUserName('');
    setDate('');
    setDescription('');
    setUserImage(null);
    setFile(null);
    
    toastService.success('Testimonial added! Click Submit to save all testimonials.');
  };

  const removeTestimonial = (index) => {
    setTestimonials(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (testimonials.length === 0) {
      toastService.error('Please add at least one testimonial');
      return;
    }

    if (!projectData?._id || !projectData?.code) {
      toastService.error('Project data is missing');
      return;
    }

    setLoading(true);
    try {
      for (const testimonial of testimonials) {
        const data = new FormData();
        data.append('id', projectData._id);
        data.append('code', projectData.code);
        data.append('name', testimonial.name);
        data.append('date', testimonial.date);
        data.append('description', testimonial.description);
        if (testimonial.userImage) data.append('userImage', testimonial.userImage);
        if (testimonial.file) data.append('file', testimonial.file);

        await projectService.updateTestimonials(data);
      }
      
      setShowSuccess(true);
    } catch (error) {
      toastService.error(error.response?.data?.message || 'Failed to submit testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/dashboard/projects/management');
  };


  // const MAX_SIZE = 250 * 1024; // 250KB

  const validateFileSize = (file, label) => {
    if (!file) return false;

    // if (file.size > MAX_SIZE) {
    //   toastService.error(
    //     `${label} must be less than 250KB. Selected file is ${(file.size / 1024).toFixed(2)}KB`
    //   );
    //   return false;
    // }

    return true;
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
        marginBottom: '24px',
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: dashboardColors.text,
            marginBottom: '8px',
          }}>
            User Name *
          </label>
          <input
            type="text"
            placeholder="Enter User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: '90%',
              padding: '10px 14px',
              border: `1px solid ${dashboardColors.border}`,
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: dashboardColors.text,
            marginBottom: '8px',
          }}>
            Date *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              width: '90%',
              padding: '10px 14px',
              border: `1px solid ${dashboardColors.border}`,
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* File Uploads */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* User Image */}
        <div>
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
            borderRadius: '8px',
            padding: '30px 20px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, 'userImage')}
            onClick={() => userImageRef.current?.click()}
          >
            <input
              ref={userImageRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
  const selectedFile = e.target.files[0];
  if (validateFileSize(selectedFile, 'User Image')) {
    setUserImage(selectedFile);
  }
}}
              style={{ display: 'none' }}
            />
            <Upload size={24} color={dashboardColors.primary} style={{ margin: '0 auto 8px' }} />
            <p style={{ fontSize: '13px', color: dashboardColors.textLight, margin: 0 }}>
              {userImage ? userImage.name : 'Click or drag image'}
            </p>
          </div>
        </div>

        {/* File (Video/Image) */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: dashboardColors.text,
            marginBottom: '8px',
          }}>
            File (Video/Image)
          </label>
          <div style={{
            border: `2px dashed ${dashboardColors.border}`,
            borderRadius: '8px',
            padding: '30px 20px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, 'file')}
            onClick={() => fileRef.current?.click()}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              onChange={(e) => {
  const selectedFile = e.target.files[0];
  if (validateFileSize(selectedFile, 'File')) {
    setFile(selectedFile);
  }
}}
              style={{ display: 'none' }}
            />
            <Upload size={24} color={dashboardColors.primary} style={{ margin: '0 auto 8px' }} />
            <p style={{ fontSize: '13px', color: dashboardColors.textLight, margin: 0 }}>
              {file ? file.name : 'Click or drag video/image'}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: dashboardColors.text,
          marginBottom: '8px',
        }}>
          Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter testimonial description"
          rows={4}
          style={{
            width: '98%',
            padding: '12px 16px',
            border: `1px solid ${dashboardColors.border}`,
            borderRadius: '8px',
            fontSize: '14px',
            resize: 'vertical',
            outline: 'none',
          }}
        />
      </div>

      {/* Add Testimonial Button */}
      <div style={{ marginBottom: '40px', textAlign: 'right' }}>
        <button
          onClick={handleAddTestimonial}
          style={{
            padding: '10px 24px',
            backgroundColor: dashboardColors.button,
            color: dashboardColors.white,
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          + Add Testimonial
        </button>
      </div>

      {/* All Testimonials Section */}
      <div style={{
        backgroundColor: dashboardColors.white,
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '40px',
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: dashboardColors.text,
          marginBottom: '16px',
        }}>
          All Testimonials ({testimonials.length})
        </h3>

        {testimonials.length === 0 ? (
          <p style={{
            fontSize: '14px',
            color: dashboardColors.textLight,
            textAlign: 'center',
            padding: '20px 0',
          }}>
            No testimonials added yet
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{
                border: `1px solid ${dashboardColors.border}`,
                borderRadius: '8px',
                padding: '16px',
                position: 'relative',
              }}>
                <button
                  onClick={() => removeTestimonial(index)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <strong style={{ fontSize: '14px' }}>Name:</strong> {testimonial.name}
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px' }}>Date:</strong> {testimonial.date}
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <strong style={{ fontSize: '14px' }}>Description:</strong> {testimonial.description}
                  </div>
                  {testimonial.userImage && (
                    <div>
                      <strong style={{ fontSize: '14px' }}>User Image:</strong> {typeof testimonial.userImage === 'string' ? testimonial.userImage : testimonial.userImage.name}
                    </div>
                  )}
                  {testimonial.file && (
                    <div>
                      <strong style={{ fontSize: '14px' }}>File:</strong> {typeof testimonial.file === 'string' ? testimonial.file : testimonial.file.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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
          disabled={testimonials.length === 0 || loading}
          style={{
            padding: '12px 32px',
            backgroundColor: dashboardColors.primary,
            color: dashboardColors.white,
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: testimonials.length === 0 || loading ? 'not-allowed' : 'pointer',
            opacity: testimonials.length === 0 || loading ? 0.5 : 1
          }}
        >
          {loading ? 'Submitting...' : 'Submit'}
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
              Project {isEdit ? 'updated' : 'created'} Successfully!
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
