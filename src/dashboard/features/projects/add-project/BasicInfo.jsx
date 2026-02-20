import { useState } from 'react';
import { Upload } from 'lucide-react';
import { projectService } from '../../../../services/projectService';
import { toastService } from '../../../../services/toastService';

const BasicInfo = ({ onNext, onPrevious, currentStep, projectData, setProjectData }) => {
  const [formData, setFormData] = useState({
    title: projectData?.title || '',
    shortTitle: projectData?.shortTitle || '',
    thumbnailTitle: projectData?.thumbnailTitle || '',
    status: projectData?.status || 'active',
    location: projectData?.location || '',
    date: projectData?.date || '',
    approvedBy: projectData?.approvedBy || '',
    startingPrice: projectData?.startingPrice || '',
    plotSize: projectData?.plotSize || '',
    totalPlots: projectData?.totalPlots || '',
    description: projectData?.description || '',
    contentImageCaption: projectData?.contentImageCaption || '',
    metaTitle: projectData?.metaTitle || '',
    metaKeywords: projectData?.metaKeywords || '',
    metaDescription: projectData?.metaDescription || ''
  });

  const [loading, setLoading] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [contentImage, setContentImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (type, file) => {
    // Validate file size (max 250kB)
    const maxSize = 250 * 1024; 
if (file && file.size > maxSize) {
  toastService.error(
    `File size must be less than 250KB. Selected file is ${(file.size / 1024).toFixed(2)}KB`
  );
  return;
}
    
    if (type === 'banner') setBannerImage(file);
    if (type === 'thumbnail') setThumbnailImage(file);
    if (type === 'content') setContentImage(file);
  };

  const handleSaveAndContinue = async () => {
    if (!formData.title) {
      toastService.error('Project title is required');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      if (formData.shortTitle) data.append('shortTitle', formData.shortTitle);
      if (formData.thumbnailTitle) data.append('thumbnailTitle', formData.thumbnailTitle);
      if (formData.location) data.append('location', formData.location);
      if (formData.date) data.append('date', formData.date);
      if (formData.approvedBy) data.append('approvedBy', formData.approvedBy);
      if (formData.startingPrice) data.append('startingPrice', formData.startingPrice);
      if (formData.plotSize) data.append('plotSize', formData.plotSize);
      if (formData.totalPlots) data.append('totalPlots', formData.totalPlots);
      if (formData.description) data.append('description', formData.description);
      if (formData.contentImageCaption) data.append('contentImageCaption', formData.contentImageCaption);
      if (formData.metaTitle) data.append('metaTitle', formData.metaTitle);
      if (formData.metaKeywords) data.append('metaKeywords', formData.metaKeywords);
      if (formData.metaDescription) data.append('metaDescription', formData.metaDescription);
      data.append('status', formData.status);
      
      if (bannerImage) data.append('bannerImage', bannerImage);
      if (thumbnailImage) data.append('thumbnnailImage', thumbnailImage);
      if (contentImage) data.append('contentImage', contentImage);

      const response = await projectService.addProject(data);
      if (response.success) {
        setProjectData({ ...response.data, ...formData });
        toastService.success('Project basic info saved successfully!');
        onNext();
      }
    } catch (error) {
      if (error.response?.status === 413) {
        toastService.error('File size too large. Please reduce image sizes and try again.');
      } else {
        toastService.error(error.response?.data?.message || 'Failed to save project');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--dashboard-primary)', margin: '0 0 8px 0' }}>
          Media Assets
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--dashboard-text-light)', margin: 0 }}>
          Upload banner and thumbnail images for your project listing
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <div style={{
          border: '2px dashed var(--dashboard-border)',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          backgroundColor: 'var(--dashboard-tertiary)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--dashboard-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Upload size={28} color="var(--dashboard-primary)" />
          </div>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', margin: '0 0 8px 0' }}>
            Banner Image
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: '0 0 16px 0' }}>
            {bannerImage ? bannerImage.name : 'Drag & drop or click to upload'}
          </p>
          <input
            type="file"
            id="bannerImageInput"
            accept="image/*"
            onChange={(e) => handleFileUpload('banner', e.target.files[0])}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={() => document.getElementById('bannerImageInput').click()}
            style={{
              padding: '10px 24px',
              backgroundColor: 'var(--dashboard-primary)',
              color: 'var(--dashboard-white)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Choose File
          </button>
        </div>

        <div style={{
          border: '2px dashed var(--dashboard-border)',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          backgroundColor: 'var(--dashboard-tertiary)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--dashboard-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Upload size={28} color="var(--dashboard-primary)" />
          </div>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', margin: '0 0 8px 0' }}>
            Thumbnail Image
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: '0 0 16px 0' }}>
            {thumbnailImage ? thumbnailImage.name : 'Drag & drop or click to upload'}
          </p>
          <input
            type="file"
            id="thumbnailImageInput"
            accept="image/*"
            onChange={(e) => handleFileUpload('thumbnail', e.target.files[0])}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={() => document.getElementById('thumbnailImageInput').click()}
            style={{
              padding: '10px 24px',
              backgroundColor: 'var(--dashboard-primary)',
              color: 'var(--dashboard-white)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Choose File
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--dashboard-primary)', margin: '0 0 8px 0' }}>
          Project Identity
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--dashboard-text-light)', margin: 0 }}>
          Basic information and naming for your project
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '8px' }}>
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter Project Title"
            required
            style={{
              width: '90%',
              padding: '12px',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '8px' }}>
            Short Title
          </label>
          <input
            type="text"
            name="shortTitle"
            value={formData.shortTitle}
            onChange={handleInputChange}
            placeholder="Enter Short Title"
            style={{
              width: '90%',
              padding: '12px',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '8px' }}>
            Thumbnail Title
          </label>
          <input
            type="text"
            name="thumbnailTitle"
            value={formData.thumbnailTitle}
            onChange={handleInputChange}
            placeholder="Enter Thumbnail Title"
            style={{
              width: '90%',
              padding: '12px',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '8px' }}>
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            style={{
              width: '90%',
              padding: '12px',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'var(--dashboard-white)'
            }}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '8px' }}>
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter Location"
            style={{
              width: '90%',
              padding: '12px',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '8px' }}>
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            style={{
              width: '90%',
              padding: '12px',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '8px' }}>
            Approved By
          </label>
          <input
            type="text"
            name="approvedBy"
            value={formData.approvedBy}
            onChange={handleInputChange}
            placeholder="Enter Approver Name"
            style={{
              width: '90%',
              padding: '12px',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '8px' }}>
            Starting Price
          </label>
          <input
            type="text"
            name="startingPrice"
            value={formData.startingPrice}
            onChange={handleInputChange}
            placeholder="Enter Starting Price"
            style={{
              width: '90%',
              padding: '12px',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '8px' }}>
            Plot Size
          </label>
          <input
            type="text"
            name="plotSize"
            value={formData.plotSize}
            onChange={handleInputChange}
            placeholder="Enter Plot Size"
            style={{
              width: '90%',
              padding: '12px',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '8px' }}>
            Total Plots
          </label>
          <input
            type="text"
            name="totalPlots"
            value={formData.totalPlots}
            onChange={handleInputChange}
            placeholder="Enter Total Plots"
            style={{
              width: '90%',
              padding: '12px',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '8px' }}>
          Project Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter Detailed information about your project"
          rows={4}
          style={{
            width: '95%',
            padding: '12px',
            border: '1px solid var(--dashboard-border)',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            resize: 'vertical'
          }}
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--dashboard-primary)', margin: '0 0 8px 0' }}>
          Content Image
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--dashboard-text-light)', marginBottom: '24px' }}>
          Optional image to accompany your project description
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{
            border: '2px dashed var(--dashboard-border)',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            backgroundColor: 'var(--dashboard-tertiary)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--dashboard-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Upload size={28} color="var(--dashboard-primary)" />
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--dashboard-text)', margin: '0 0 8px 0' }}>
              Content Image
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--dashboard-text-light)', margin: '0 0 16px 0' }}>
              {contentImage ? contentImage.name : 'Drag & drop or click to upload'}
            </p>
            <input
              type="file"
              id="contentImageInput"
              accept="image/*"
              onChange={(e) => handleFileUpload('content', e.target.files[0])}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => document.getElementById('contentImageInput').click()}
              style={{
                padding: '10px 24px',
                backgroundColor: 'var(--dashboard-primary)',
                color: 'var(--dashboard-white)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Choose File
            </button>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--dashboard-text)', marginBottom: '8px' }}>
              Image Caption (Optional)
            </label>
            <input
              type="text"
              name="contentImageCaption"
              value={formData.contentImageCaption}
              onChange={handleInputChange}
              placeholder="Enter Image Caption"
              style={{
                width: '90%',
                padding: '12px',
                border: '1px solid var(--dashboard-border)',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid var(--dashboard-border)' }}>
        <button
          onClick={onPrevious}
          disabled={currentStep === 1}
          style={{
            padding: '12px 32px',
            backgroundColor: 'var(--dashboard-white)',
            color: 'var(--dashboard-text)',
            border: '1px solid var(--dashboard-border)',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
            opacity: currentStep === 1 ? 0.5 : 1
          }}
        >
          Previous
        </button>

        <button
          onClick={handleSaveAndContinue}
          disabled={loading}
          style={{
            padding: '12px 32px',
            backgroundColor: 'var(--dashboard-primary)',
            color: 'var(--dashboard-white)',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Saving...' : 'Save & Continue'}
        </button>
      </div>
    </div>
  );
};

export default BasicInfo;
