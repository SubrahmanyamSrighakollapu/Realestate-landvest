import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2 } from 'lucide-react';
import dashboardColors from '../../../styles/colors';
import { projectService } from '../../../../services/projectService';
import { toastService } from '../../../../services/toastService';

const Pricing = ({ onNext, onPrevious, currentStep, projectData, setProjectData, isEdit }) => {
  const [pricingOptions, setPricingOptions] = useState([]);
  const [pricingData, setPricingData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newPricing, setNewPricing] = useState({
    title: '',
    name: '',
    basePrice: false,
    mrp: false,
    duration: false,
    installment: false,
    advancePayment: false,
    terms: false,
    status: 'active'
  });

  useEffect(() => {
    fetchPricingList();
  }, []);

  useEffect(() => {
    if (projectData?.pricingOptions?.length > 0 && pricingOptions.length > 0) {
      const existingData = {};
      pricingOptions.forEach(option => {
        existingData[option._id] = {
          pricingOption: option._id,
          mrp: '',
          basePrice: '',
          duration: '',
          installment: '',
          advancePayment: false,
          terms: false
        };
      });
      projectData.pricingOptions.forEach(item => {
        const optionId = typeof item.pricingOption === 'object' ? item.pricingOption._id : item.pricingOption;
        existingData[optionId] = {
          pricingOption: optionId,
          mrp: item.mrp || '',
          basePrice: item.basePrice || '',
          duration: item.duration || '',
          installment: item.installment || '',
          advancePayment: item.advancePayment || false,
          terms: item.terms || false
        };
      });
      setPricingData(existingData);
    }
  }, [projectData?.pricingOptions, pricingOptions]);

  const fetchPricingList = async () => {
    try {
      const response = await projectService.getPricingList();
      if (response.success) {
        setPricingOptions(response.data);
        const initialData = {};
        response.data.forEach(option => {
          initialData[option._id] = {
            pricingOption: option._id,
            mrp: '',
            basePrice: '',
            duration: '',
            installment: '',
            advancePayment: false,
            terms: false
          };
        });
        setPricingData(initialData);
      }
    } catch (error) {
      toastService.error('Failed to load pricing options');
    }
  };

  const handleInputChange = (optionId, field, value) => {
    setPricingData(prev => ({
      ...prev,
      [optionId]: { ...prev[optionId], [field]: value }
    }));
  };

  const handleEditPricing = (option) => {
    setEditMode(true);
    setNewPricing({
      _id: option._id,
      code: option.code,
      title: option.title,
      name: option.name,
      basePrice: option.basePrice,
      mrp: option.mrp,
      duration: option.duration,
      installment: option.installment,
      advancePayment: option.advancePayment,
      terms: option.terms,
      sort: option.sort,
      status: option.status
    });
    setShowModal(true);
  };

  const handleUpdatePricing = async () => {
    if (!newPricing.title || !newPricing.name) {
      toastService.error('Title and Name are required');
      return;
    }

    setLoading(true);
    try {
      const response = await projectService.updatePricingOption(newPricing);
      if (response.success) {
        toastService.success('Pricing option updated successfully!');
        setShowModal(false);
        setEditMode(false);
        setNewPricing({
          title: '',
          name: '',
          basePrice: false,
          mrp: false,
          duration: false,
          installment: false,
          advancePayment: false,
          terms: false,
          status: 'active'
        });
        fetchPricingList();
      }
    } catch (error) {
      toastService.error(error.response?.data?.message || 'Failed to update pricing option');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPricing = async () => {
    if (!newPricing.title || !newPricing.name) {
      toastService.error('Title and Name are required');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...newPricing,
        sort: pricingOptions.length + 1
      };

      const response = await projectService.addPricing(payload);
      if (response.success) {
        toastService.success('Pricing option added successfully!');
        setShowModal(false);
        setNewPricing({
          title: '',
          name: '',
          basePrice: false,
          mrp: false,
          duration: false,
          installment: false,
          advancePayment: false,
          terms: false,
          status: 'active'
        });
        fetchPricingList();
      }
    } catch (error) {
      toastService.error(error.response?.data?.message || 'Failed to add pricing option');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndContinue = async () => {
    if (!projectData._id || !projectData.code) {
      toastService.error('Project data missing');
      return;
    }

    setLoading(true);
    try {
      const pricingOptionsArray = Object.values(pricingData).filter(
        item => item.basePrice || item.mrp
      );

      const payload = {
        id: projectData._id,
        code: projectData.code,
        pricingOptions: pricingOptionsArray
      };

      const response = await projectService.updatePricing(payload);
      if (response.success) {
        toastService.success('Pricing updated successfully!');
        onNext();
      }
    } catch (error) {
      toastService.error(error.response?.data?.message || 'Failed to update pricing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: dashboardColors.primary,
            margin: '0 0 8px 0',
          }}>
            Pricing Options
          </h2>
          <p style={{
            fontSize: '14px',
            color: dashboardColors.textLight,
            margin: 0,
          }}>
            Configure pricing plans and payment terms for your project
          </p>
        </div>
        <button
          onClick={() => {
            setEditMode(false);
            setNewPricing({
              title: '',
              name: '',
              basePrice: false,
              mrp: false,
              duration: false,
              installment: false,
              advancePayment: false,
              terms: false,
              status: 'active'
            });
            setShowModal(true);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: dashboardColors.primary,
            color: dashboardColors.white,
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Plus size={18} />
          Add Pricing
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        marginBottom: '40px',
      }}>
        {pricingOptions.map((option, index) => {
          const data = pricingData[option._id] || {};
          const colors = [
            { border: dashboardColors.primary, bg: dashboardColors.secondary },
            { border: '#f97316', bg: '#fff7ed' },
            { border: '#8b5cf6', bg: '#f3e8ff' },
            { border: '#10b981', bg: '#d1fae5' }
          ];
          const color = colors[index % colors.length];

          return (
            <div key={option._id} style={{
              border: `2px solid ${color.border}`,
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: dashboardColors.white,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}>
              <div style={{
                backgroundColor: color.bg,
                padding: '16px',
                textAlign: 'center',
                borderBottom: `1px solid ${color.border}`,
                position: 'relative'
              }}>
                <button
                  onClick={() => handleEditPricing(option)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: dashboardColors.primary,
                    padding: '4px'
                  }}
                >
                  <Edit2 size={18} />
                </button>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: dashboardColors.primary,
                  margin: 0,
                }}>
                  {option.title}
                </h3>
                <span style={{
                  fontSize: '14px',
                  color: dashboardColors.textLight,
                }}>
                  {option.name}
                </span>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {option.basePrice && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: dashboardColors.text,
                      marginBottom: '6px',
                    }}>
                      Base Price
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Base Price"
                      value={data.basePrice || ''}
                      onChange={(e) => handleInputChange(option._id, 'basePrice', e.target.value)}
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
                )}

                {option.mrp && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: dashboardColors.text,
                      marginBottom: '6px',
                    }}>
                      MRP
                    </label>
                    <input
                      type="text"
                      placeholder="Enter MRP"
                      value={data.mrp || ''}
                      onChange={(e) => handleInputChange(option._id, 'mrp', e.target.value)}
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
                )}

                {option.duration && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: dashboardColors.text,
                      marginBottom: '6px',
                    }}>
                      Duration (Days)
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Duration"
                      value={data.duration || ''}
                      onChange={(e) => handleInputChange(option._id, 'duration', e.target.value)}
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
                )}

                {option.installment && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: dashboardColors.text,
                      marginBottom: '6px',
                    }}>
                      No Of Installments
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Installments"
                      value={data.installment || ''}
                      onChange={(e) => handleInputChange(option._id, 'installment', e.target.value)}
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
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {option.advancePayment && (
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: dashboardColors.text }}>
                      <input
                        type="checkbox"
                        checked={data.advancePayment || false}
                        onChange={(e) => handleInputChange(option._id, 'advancePayment', e.target.checked)}
                      />
                      Advance payment required
                    </label>
                  )}

                  {option.terms && (
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: dashboardColors.text }}>
                      <input
                        type="checkbox"
                        checked={data.terms || false}
                        onChange={(e) => handleInputChange(option._id, 'terms', e.target.checked)}
                      />
                      Terms & Condition
                    </label>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: isEdit ? 'space-between' : 'flex-end',
        paddingTop: '24px',
        borderTop: `1px solid ${dashboardColors.border}`,
      }}>
        {isEdit && (
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
        )}

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

      {/* Add Pricing Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: dashboardColors.white,
            borderRadius: '12px',
            padding: '32px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: dashboardColors.primary, margin: 0 }}>
                {editMode ? 'Edit Pricing Option' : 'Add New Pricing Option'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: dashboardColors.textLight
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: dashboardColors.text, marginBottom: '6px' }}>
                  Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Option A"
                  value={newPricing.title}
                  onChange={(e) => setNewPricing({ ...newPricing, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: dashboardColors.text, marginBottom: '6px' }}>
                  Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Gold Plan"
                  value={newPricing.name}
                  onChange={(e) => setNewPricing({ ...newPricing, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: dashboardColors.text, marginBottom: '12px' }}>
                  Field Configuration
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: dashboardColors.text }}>
                    <input
                      type="checkbox"
                      checked={newPricing.basePrice}
                      onChange={(e) => setNewPricing({ ...newPricing, basePrice: e.target.checked })}
                    />
                    Base Price
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: dashboardColors.text }}>
                    <input
                      type="checkbox"
                      checked={newPricing.mrp}
                      onChange={(e) => setNewPricing({ ...newPricing, mrp: e.target.checked })}
                    />
                    MRP
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: dashboardColors.text }}>
                    <input
                      type="checkbox"
                      checked={newPricing.duration}
                      onChange={(e) => setNewPricing({ ...newPricing, duration: e.target.checked })}
                    />
                    Duration
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: dashboardColors.text }}>
                    <input
                      type="checkbox"
                      checked={newPricing.installment}
                      onChange={(e) => setNewPricing({ ...newPricing, installment: e.target.checked })}
                    />
                    Installment
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: dashboardColors.text }}>
                    <input
                      type="checkbox"
                      checked={newPricing.advancePayment}
                      onChange={(e) => setNewPricing({ ...newPricing, advancePayment: e.target.checked })}
                    />
                    Advance Payment
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: dashboardColors.text }}>
                    <input
                      type="checkbox"
                      checked={newPricing.terms}
                      onChange={(e) => setNewPricing({ ...newPricing, terms: e.target.checked })}
                    />
                    Terms & Conditions
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: dashboardColors.text, marginBottom: '6px' }}>
                  Status
                </label>
                <select
                  value={newPricing.status}
                  onChange={(e) => setNewPricing({ ...newPricing, status: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: dashboardColors.white
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: dashboardColors.white,
                    color: dashboardColors.text,
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={editMode ? handleUpdatePricing : handleAddPricing}
                  disabled={loading}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: dashboardColors.primary,
                    color: dashboardColors.white,
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  {loading ? 'Saving...' : editMode ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
