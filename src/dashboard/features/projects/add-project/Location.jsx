import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import dashboardColors from '../../../styles/colors';
import { projectService } from '../../../../services/projectService';
import { toastService } from '../../../../services/toastService';

const Location = ({ onNext, onPrevious, currentStep, projectData, setProjectData }) => {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleAddLocation = () => {
    if (!currentLocation.title || !currentLocation.description) {
      toastService.error('Please fill both title and description');
      return;
    }

    setLocations([...locations, currentLocation]);
    setCurrentLocation({ title: '', description: '' });
  };

  const handleRemoveLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleSaveAndContinue = async () => {
    if (locations.length === 0) {
      toastService.error('Please add at least one location highlight');
      return;
    }

    if (!projectData._id || !projectData.code) {
      toastService.error('Project data missing');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        id: projectData._id,
        code: projectData.code,
        locations: locations
      };

      const response = await projectService.updateLocations(payload);
      if (response.success) {
        toastService.success('Location highlights updated successfully!');
        onNext();
      }
    } catch (error) {
      toastService.error(error.response?.data?.message || 'Failed to update locations');
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
        Location Highlights
      </h2>
      <p style={{
        fontSize: '14px',
        color: dashboardColors.textLight,
        marginBottom: '32px',
      }}>
        Add nearby landmarks and location advantages
      </p>

      <div style={{
        backgroundColor: dashboardColors.tertiary,
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Add New Location</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '16px', alignItems: 'end' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: dashboardColors.text,
              marginBottom: '6px',
            }}>
              Title
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              value={currentLocation.title}
              onChange={(e) => setCurrentLocation({ ...currentLocation, title: e.target.value })}
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
              marginBottom: '6px',
            }}>
              Description
            </label>
            <input
              type="text"
              placeholder="Enter Description"
              value={currentLocation.description}
              onChange={(e) => setCurrentLocation({ ...currentLocation, description: e.target.value })}
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

          <button
            onClick={handleAddLocation}
            style={{
              padding: '10px 20px',
              backgroundColor: dashboardColors.primary,
              color: dashboardColors.white,
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>

      {locations.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Added Locations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {locations.map((location, index) => (
              <div key={index} style={{
                backgroundColor: dashboardColors.white,
                padding: '16px 20px',
                borderRadius: '8px',
                border: `1px solid ${dashboardColors.border}`,
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px', color: dashboardColors.primary }}>
                    {location.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: dashboardColors.textLight, margin: 0 }}>
                    {location.description}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveLocation(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#ef4444',
                    padding: '8px',
                    marginLeft: '16px'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '24px',
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
          {loading ? 'Saving...' : 'Save & Continue'}
        </button>
      </div>
    </div>
  );
};

export default Location;
