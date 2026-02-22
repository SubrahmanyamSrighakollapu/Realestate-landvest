import React, { useState, useEffect } from 'react';
import dashboardColors from '../../styles/colors';
import { Search } from 'lucide-react';
import { designationService } from '../../../services/designationService';
import { toastService } from '../../../services/toastService';

const DesignationManagement = () => {
  const [designations, setDesignations] = useState([]);
  const [parentRoles, setParentRoles] = useState([]);
  const [searchParent, setSearchParent] = useState('');
  const [showParentDropdown, setShowParentDropdown] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newPercent, setNewPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDesignations();
  }, []);

  useEffect(() => {
    if (searchParent) {
      fetchParentRoles(searchParent);
    }
  }, [searchParent]);

  const fetchDesignations = async () => {
    try {
      const response = await designationService.listDesignations('');
      if (response.success) {
        setDesignations(response.data);
      }
    } catch (error) {
      console.error('Error fetching designations:', error);
    }
  };

  const fetchParentRoles = async (search = '') => {
    try {
      const response = await designationService.listDesignations(search);
      if (response.success) {
        setParentRoles(response.data);
      }
    } catch (error) {
      console.error('Error fetching parent roles:', error);
    }
  };

  const handleSave = async () => {
    if (!newCode.trim() || !newName.trim()) {
      toastService.error('Please fill Designation Code and Name');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: newName.trim(),
        code: newCode.trim(),
        parent: selectedParent?._id || null,
        percentage: newPercent,
        permissions: []
      };

      await designationService.addDesignation(payload);
      toastService.success('Designation added successfully!');
      
      setNewCode('');
      setNewName('');
      setNewPercent(0);
      setSelectedParent(null);
      setSearchParent('');
      
      fetchDesignations();
    } catch (error) {
      console.error('Error adding designation:', error);
      toastService.error(error.response?.data?.message || 'Failed to add designation');
    } finally {
      setLoading(false);
    }
  };

  const handlePercentChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setNewPercent(Math.max(0, Math.min(100, value)));
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{
        backgroundColor: dashboardColors.tertiary,
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: dashboardColors.primary,
              margin: 0,
            }}>
              Designation Management
            </h1>
            <p style={{
              fontSize: '14px',
              color: dashboardColors.textLight,
              marginTop: '8px',
            }}>
              Welcome back, Admin • Last login: Today at 9:30 AM
            </p>
          </div>

          <div style={{
            flex: '1',
            minWidth: '260px',
            position: 'relative',
            maxWidth: '400px',
          }}>
            <input
              type="text"
              placeholder="Search by ID, Name..."
              style={{
                width: '80%',
                padding: '10px 10px 10px 40px',
                border: `1px solid ${dashboardColors.border}`,
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <Search
              size={18}
              color={dashboardColors.textLight}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '24px',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        <div style={{
          flex: '1',
          minWidth: '340px',
          backgroundColor: dashboardColors.white,
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: dashboardColors.text,
            marginBottom: '16px',
          }}>
            All Designations ({designations.length})
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {designations.map((desig) => {
              const acronym = desig.name
                .split(' ')
                .map(word => word[0]?.toUpperCase() || '')
                .join('')
                .slice(0, 3);
              
              return (
                <div key={desig._id} style={{
                  display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    backgroundColor: '#fff', // light grey background
    borderRadius: '14px',
    border: '1px solid #E5E7EB',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                       width: '42px',
        height: '42px',
        borderRadius: '50%',
        backgroundColor: '#D1FAE5',
        color: '#065F46',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: '600',
                    }}>
                      {acronym}
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: dashboardColors.text }}>
                        {desig.name}
                      </div>
                      <div style={{ fontSize: '13px', color: dashboardColors.textLight }}>
                        Code: {desig.code}
                      </div>
                      {/* <span style={{
                        display: 'inline-block',
                        marginTop: '4px',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: desig.status === 'active' ? '#d4edda' : '#f8d7da',
                        color: desig.status === 'active' ? '#155724' : '#721c24'
                      }}>
                        ● {desig.status === 'active' ? 'Active' : 'Inactive'}
                      </span> */}
                    </div>
                  </div>
                  <div style={{
                     backgroundColor: '#fff',
      padding: '4px 10px',
      borderRadius: '10px',
      fontSize: '13px',
      fontWeight: '600',
      color: '#374151',
          border: '1px solid #E5E7EB',

                  }}>
                    {desig.percentage}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{
          flex: '1',
          minWidth: '340px',
          backgroundColor: dashboardColors.white,
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: dashboardColors.text,
            marginBottom: '8px',
          }}>
            Add Designation
          </h2>
          <p style={{
            fontSize: '14px',
            color: dashboardColors.textLight,
            marginBottom: '24px',
          }}>
            Configure role details and commission rules
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: dashboardColors.text,
                marginBottom: '6px',
              }}>
                Designation Code
              </label>
              <input
                type="text"
                placeholder="Enter Designation Code"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                style={{
                  width: '90%',
                  padding: '10px 14px',
                  border: `1px solid ${dashboardColors.border}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  textTransform: 'uppercase',
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
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
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
                Parent Name
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search parent role"
                  value={selectedParent ? selectedParent.name : searchParent}
                  onChange={(e) => {
                    setSearchParent(e.target.value);
                    setSelectedParent(null);
                    setShowParentDropdown(true);
                  }}
                  onFocus={() => setShowParentDropdown(true)}
                  style={{
                    width: '90%',
                    padding: '10px 14px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                {showParentDropdown && parentRoles.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: '10%',
                    backgroundColor: 'white',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    marginTop: '4px',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 10,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    {parentRoles.map((role) => (
                      <div
                        key={role._id}
                        onClick={() => {
                          setSelectedParent(role);
                          setSearchParent(role.name);
                          setShowParentDropdown(false);
                        }}
                        style={{
                          padding: '10px 14px',
                          cursor: 'pointer',
                          borderBottom: `1px solid ${dashboardColors.border}`,
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = dashboardColors.secondary}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                      >
                        {role.name} - ({role.code})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: dashboardColors.text,
                marginBottom: '6px',
              }}>
                Commission Percentage
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={newPercent}
                  onChange={handlePercentChange}
                  style={{
                    width: '90%',
                    padding: '10px 14px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={newPercent}
                    onChange={(e) => setNewPercent(parseFloat(e.target.value))}
                    style={{
                      flex: '1',
                      accentColor: dashboardColors.primary,
                      height: '6px',
                    }}
                  />
                  <span style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: dashboardColors.primary,
                    minWidth: '50px',
                    textAlign: 'right',
                  }}>
                    {newPercent.toFixed(1)} %
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
              <button style={{
                padding: '10px 24px',
                backgroundColor: dashboardColors.white,
                border: `1px solid ${dashboardColors.border}`,
                borderRadius: '6px',
                fontSize: '14px',
                color: dashboardColors.text,
                cursor: 'pointer',
              }}>
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                style={{
                  padding: '10px 24px',
                  backgroundColor: loading ? '#ccc' : dashboardColors.primary,
                  color: dashboardColors.white,
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignationManagement;
