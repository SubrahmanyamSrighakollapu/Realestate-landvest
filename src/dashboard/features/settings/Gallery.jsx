import { useState, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Trash2, Filter, AlertTriangle } from 'lucide-react';
import { toastService } from '../../../services/toastService';
import { galleryService } from '../../../services/galleryService';
import dashboardColors from '../../styles/colors';
import Pagination from '../../components/common/Pagination';

const CATEGORIES = ['Site Layout', 'Open Plots', 'Infrastructure', 'Videos'];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [images, setImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchGalleryImages();
  }, [currentPage, filterCategory]);

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const response = await galleryService.listImages(currentPage, itemsPerPage, filterCategory);
      if (response.success) {
        setGalleryImages(response.data);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
      }
    } catch (error) {
      toastService.error('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (files) => {
    if (!selectedCategory) {
      toastService.error('Please select a category first');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    const validFiles = [];
    const oversizedFiles = [];

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toastService.error(`${file.name} is not a valid image or video`);
        return;
      }
      if (file.size > maxSize) {
        oversizedFiles.push(file.name);
        return;
      }
      validFiles.push(file);
    });

    if (oversizedFiles.length > 0) {
      toastService.error(`${oversizedFiles.length} file(s) exceed 5MB limit`);
    }

    if (validFiles.length > 0) {
      const newImages = validFiles.map(file => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        name: file.name
      }));
      setImages(prev => [...prev, ...newImages]);
      toastService.success(`${validFiles.length} file(s) added`);
    }
  };

  const handleRemoveImage = (id) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) URL.revokeObjectURL(image.preview);
      return prev.filter(img => img.id !== id);
    });
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      toastService.error('Please add at least one file');
      return;
    }

    if (!selectedCategory) {
      toastService.error('Please select a category');
      return;
    }

    // Check total collective size
    const totalSize = images.reduce((sum, img) => sum + img.file.size, 0);
    const maxTotalSize = 5 * 1024 * 1024; // 5MB total
    
    if (totalSize > maxTotalSize) {
      const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
      toastService.error(`Total file size (${totalSizeMB}MB) exceeds 5MB limit`);
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('category', selectedCategory);
      images.forEach(img => {
        formData.append('images', img.file);
      });

      const response = await galleryService.uploadImages(formData);
      if (response.success) {
        toastService.success('Images uploaded successfully!');
        setImages([]);
        setSelectedCategory('');
        fetchGalleryImages();
      }
    } catch (error) {
      toastService.error(error.response?.data?.message || 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedImages.length === 0) {
      toastService.error('Please select images to delete');
      return;
    }
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const ids = selectedImages.join(',');
      const response = await galleryService.deleteImages(ids);
      if (response.success) {
        toastService.success('Images deleted successfully!');
        setSelectedImages([]);
        setShowDeleteModal(false);
        fetchGalleryImages();
      }
    } catch (error) {
      toastService.error('Failed to delete images');
    }
  };

  const toggleImageSelection = (id) => {
    setSelectedImages(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: dashboardColors.primary, margin: '0 0 8px 0' }}>
          Gallery Management
        </h2>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
          Upload and manage gallery images by category
        </p>
      </div>

      {/* Upload Section */}
      <div style={{
        backgroundColor: '#fff',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '32px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: dashboardColors.text, margin: '0 0 24px 0' }}>
          Upload New Images
        </h3>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
            Select Category *
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${dashboardColors.border}`,
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          >
            <option value="">Choose a category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div style={{
          border: '2px dashed var(--dashboard-border)',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          backgroundColor: 'var(--dashboard-tertiary)',
          cursor: selectedCategory ? 'pointer' : 'not-allowed',
          opacity: selectedCategory ? 1 : 0.5,
          transition: 'all 0.2s'
        }}
        onDragOver={(e) => {
          if (!selectedCategory) return;
          e.preventDefault();
          e.currentTarget.style.borderColor = dashboardColors.primary;
        }}
        onDragLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--dashboard-border)';
        }}
        onDrop={(e) => {
          if (!selectedCategory) return;
          e.preventDefault();
          e.currentTarget.style.borderColor = 'var(--dashboard-border)';
          handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => selectedCategory && document.getElementById('galleryInput').click()}
        >
          <Upload size={48} color={dashboardColors.primary} style={{ margin: '0 auto 16px' }} />
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: dashboardColors.text, margin: '0 0 8px 0' }}>
            {selectedCategory ? `Upload ${selectedCategory === 'Videos' ? 'Videos' : 'Images'} to ${selectedCategory}` : 'Select a category first'}
          </h4>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
            Drag and drop or click to browse
          </p>
          <input
            type="file"
            id="galleryInput"
            accept="image/*,video/*"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            style={{ display: 'none' }}
            disabled={!selectedCategory}
          />
        </div>

        {images.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: dashboardColors.text, margin: '0 0 16px 0' }}>
              Ready to Upload ({images.length})
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              {images.map((image) => (
                <div key={image.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', backgroundColor: '#000' }}>
                  {image.file.type.startsWith('video/') ? (
                    <video src={image.preview} controls style={{ width: '100%', height: '120px', objectFit: 'contain', backgroundColor: '#000' }} />
                  ) : (
                    <img src={image.preview} alt={image.name} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                  )}
                  <button
                    onClick={() => handleRemoveImage(image.id)}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#ef4444',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <X size={14} color="white" />
                  </button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setImages([])}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#fff',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Clear
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                style={{
                  padding: '10px 24px',
                  backgroundColor: dashboardColors.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  opacity: uploading ? 0.6 : 1
                }}
              >
                {uploading ? 'Uploading...' : `Upload ${selectedCategory === 'Videos' ? 'Videos' : 'Images'}`}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Gallery Section */}
      <div style={{
        backgroundColor: '#fff',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: dashboardColors.text, margin: 0 }}>
            Gallery Images ({totalCount})
          </h3>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} color="#6b7280" />
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  padding: '8px 16px',
                  border: `1px solid ${dashboardColors.border}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {selectedImages.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Trash2 size={16} />
                Delete ({selectedImages.length})
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>Loading...</div>
        ) : galleryImages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <ImageIcon size={64} color="#9ca3af" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280', margin: '0 0 8px 0' }}>
              No Images Found
            </h4>
            <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
              Upload images to get started
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {galleryImages.map((image) => (
                <div
                  key={image._id}
                  onClick={() => toggleImageSelection(image._id)}
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: selectedImages.includes(image._id) ? '0 0 0 3px ' + dashboardColors.primary : '0 2px 8px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {image.category === 'Videos' ? (
                    <video
                      src={`https://api.landvestinfra.com/${image.file}`}
                      controls
                      style={{ width: '100%', height: '200px', objectFit: 'cover', backgroundColor: '#000' }}
                    />
                  ) : (
                    <img
                      src={`https://api.landvestinfra.com/${image.file}`}
                      alt={image.category}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{
                    padding: '12px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {image.category}
                  </div>
                  {selectedImages.includes(image._id) && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: dashboardColors.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalItems={totalCount}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <AlertTriangle
                size={64}
                color="#ef4444"
                style={{ marginBottom: '16px' }}
              />
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Confirm Deletion
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                Are you sure you want to delete {selectedImages.length} image(s)?<br/>
                <span style={{ fontSize: '13px', color: '#ef4444' }}>This action cannot be undone.</span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#fff',
                  color: '#111827',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#ef4444',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
