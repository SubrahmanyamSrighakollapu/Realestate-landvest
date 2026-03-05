import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toastService } from '../../../services/toastService';
import dashboardColors from '../../styles/colors';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (files) => {
    const maxSize = 2 * 1024 * 1024;
    const validFiles = [];

    Array.from(files).forEach(file => {
      if (file.size > maxSize) {
        toastService.error(`${file.name} exceeds 2MB limit`);
        return;
      }
      if (!file.type.startsWith('image/')) {
        toastService.error(`${file.name} is not an image`);
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      const newImages = validFiles.map(file => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        name: file.name
      }));
      setImages(prev => [...prev, ...newImages]);
      toastService.success(`${validFiles.length} image(s) uploaded successfully!`);
    }
  };

  const handleRemoveImage = (id) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) URL.revokeObjectURL(image.preview);
      return prev.filter(img => img.id !== id);
    });
  };

  const handleSave = async () => {
    if (images.length === 0) {
      toastService.error('Please upload at least one image');
      return;
    }

    setUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toastService.success('Gallery images saved successfully!');
    } catch (error) {
      toastService.error('Failed to save gallery images');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: dashboardColors.primary, margin: '0 0 8px 0' }}>
          Gallery Management
        </h2>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
          Upload and manage gallery images for your website
        </p>
      </div>

      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '32px'
      }}>
        <div style={{
          border: '2px dashed var(--dashboard-border)',
          borderRadius: '12px',
          padding: '60px 40px',
          textAlign: 'center',
          backgroundColor: 'var(--dashboard-tertiary)',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.style.borderColor = dashboardColors.primary;
          e.currentTarget.style.backgroundColor = 'rgba(31, 111, 84, 0.05)';
        }}
        onDragLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--dashboard-border)';
          e.currentTarget.style.backgroundColor = 'var(--dashboard-tertiary)';
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.style.borderColor = 'var(--dashboard-border)';
          e.currentTarget.style.backgroundColor = 'var(--dashboard-tertiary)';
          handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => document.getElementById('galleryInput').click()}
        >
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--dashboard-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <Upload size={36} color={dashboardColors.primary} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: dashboardColors.text, margin: '0 0 8px 0' }}>
            Upload Gallery Images
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 16px 0' }}>
            Drag and drop images here, or click to browse
          </p>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
            Supports: JPG, PNG, GIF (Max 2MB per image)
          </p>
          <input
            type="file"
            id="galleryInput"
            accept="image/*"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {images.length > 0 && (
        <div style={{
          backgroundColor: '#fff',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: dashboardColors.text, margin: '0 0 24px 0' }}>
            Uploaded Images ({images.length})
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {images.map((image) => (
              <div key={image.id} style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img
                  src={image.preview}
                  alt={image.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />
                <button
                  onClick={() => handleRemoveImage(image.id)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(239, 68, 68, 0.9)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.9)'}
                >
                  <X size={18} color="white" />
                </button>
                <div style={{
                  padding: '12px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {image.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div style={{
          backgroundColor: '#fff',
          padding: '60px 40px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: 'var(--dashboard-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <ImageIcon size={48} color="#9ca3af" />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#6b7280', margin: '0 0 8px 0' }}>
            No Images Uploaded
          </h3>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
            Upload images to get started with your gallery
          </p>
        </div>
      )}

      {images.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={() => setImages([])}
            style={{
              padding: '12px 32px',
              backgroundColor: '#fff',
              color: '#6b7280',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
          <button
            onClick={handleSave}
            disabled={uploading}
            style={{
              padding: '12px 32px',
              backgroundColor: uploading ? '#9ca3af' : dashboardColors.primary,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: uploading ? 'not-allowed' : 'pointer'
            }}
          >
            {uploading ? 'Saving...' : 'Save Gallery'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
