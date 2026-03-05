import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import dashboardColors from '../../styles/colors';
import { employeeService } from '../../../services/employeeService';
import { designationService } from '../../../services/designationService';
import { toastService } from '../../../services/toastService';

const AddAssociate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employee, isEdit } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [sponsors, setSponsors] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [searchSponsor, setSearchSponsor] = useState('');
  const [showSponsorDropdown, setShowSponsorDropdown] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [loadingRoles, setLoadingRoles] = useState(false);
  
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    role: employee?.role?._id || '',
    password: '',
    sponser: employee?.sponser?._id || '',
    secondphone: employee?.secondphone || '',
    guardian: employee?.guardian || '',
    occupation: employee?.occupation || '',
    dob: employee?.dob ? employee.dob.split('T')[0] : '',
    doj: employee?.doj ? employee.doj.split('T')[0] : '',
    bankaccountnumber: employee?.bankaccountnumber || '',
    bankname: employee?.bankname || '',
    ifsc: employee?.ifsc || '',
    branch: employee?.branch || '',
    address: employee?.address || '',
    city: employee?.city || '',
    state: employee?.state || '',
    country: employee?.country || '',
    pincode: employee?.pincode || '',
    panNumber: employee?.panNumber || '',
    aadharNumber: employee?.aadharNumber || '',
    passportNumber: employee?.passportNumber || '',
    bloodGroup: employee?.bloodGroup || '',
    isStaff: employee?.isStaff || false
  });

  const [files, setFiles] = useState({
    panProof: null,
    aadharProof: null,
    residentialProof: null,
    profileImage: null
  });

  const [existingFiles, setExistingFiles] = useState({
    panProof: employee?.panProof || '',
    aadharProof: employee?.aadharProof || '',
    residentialProof: employee?.residentialProof || '',
    profileImage: employee?.profileImage || ''
  });

  useEffect(() => {
    if (isEdit && employee) {
      setSelectedSponsor(employee.sponser);
      setSearchSponsor(employee.sponser?.name || '');
      setAadhaarNumber(employee.aadharNumber || '');
      if (employee.sponser?.role?._id) {
        fetchRolesBySponsor(employee.sponser.role._id);
      }
    }
  }, []);

  useEffect(() => {
    if (searchSponsor) {
      fetchSponsors(searchSponsor);
    } else {
      setSponsors([]);
      setShowSponsorDropdown(false);
    }
  }, [searchSponsor]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const fetchRoles = async () => {
    try {
      const response = await designationService.listDesignations('');
      if (response.success) {
        setDesignations(response.data);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchRolesBySponsor = async (sponsorRoleId) => {
    setLoadingRoles(true);
    try {
      const response = await designationService.getChildRoles(sponsorRoleId);
      if (response.success) {
        const filteredRoles = response.data.filter(role => role._id !== sponsorRoleId);
        setDesignations(filteredRoles);
      }
    } catch (error) {
      console.error('Error fetching roles by sponsor:', error);
      toastService.error('Failed to fetch roles');
    } finally {
      setLoadingRoles(false);
    }
  };

  const fetchSponsors = async (search = '') => {
    try {
      const response = await employeeService.listEmployees(search);
      if (response.success) {
        setSponsors(response.data);
      }
    } catch (error) {
      console.error('Error fetching sponsors:', error);
    }
  };

  const sendOTP = () => {
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      toastService.error('Enter valid 12-digit Aadhaar number');
      return;
    }
    setOtpSent(true);
    setTimer(60);
  };

  const verifyOTP = () => {
    if (otp?.length === 6) {
      setAadhaarVerified(true);
      toastService.success('Aadhaar verified');
    } else {
      toastService.error('Enter 6-digit OTP');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotalFileSize = (newFile, newFileType) => {
    let total = 0;
    if (newFileType === 'panProof' || files.panProof) total += (newFileType === 'panProof' ? newFile : files.panProof).size;
    if (newFileType === 'aadharProof' || files.aadharProof) total += (newFileType === 'aadharProof' ? newFile : files.aadharProof).size;
    if (newFileType === 'residentialProof' || files.residentialProof) total += (newFileType === 'residentialProof' ? newFile : files.residentialProof).size;
    if (newFileType === 'profileImage' || files.profileImage) total += (newFileType === 'profileImage' ? newFile : files.profileImage).size;
    return total;
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (fileList[0]) {
      const MAX_TOTAL_SIZE = 5 * 1024 * 1024; // 5MB
      const totalSize = calculateTotalFileSize(fileList[0], name);
      
      if (totalSize > MAX_TOTAL_SIZE) {
        toastService.error(
          `Total file size cannot exceed 5MB. Current total: ${(totalSize / (1024 * 1024)).toFixed(2)}MB`
        );
        return;
      }
      
      setFiles(prev => ({ ...prev, [name]: fileList[0] }));
      toastService.success('File uploaded successfully!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.role) {
      toastService.error('Please fill all required fields');
      return;
    }

    if (!isEdit && !formData.password) {
      toastService.error('Password is required');
      return;
    }

    const MAX_TOTAL_SIZE = 5 * 1024 * 1024;
    const totalSize = calculateTotalFileSize(null, null);
    if (totalSize > MAX_TOTAL_SIZE) {
      toastService.error(`Total file size cannot exceed 5MB. Current: ${(totalSize / (1024 * 1024)).toFixed(2)}MB`);
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      
      if (isEdit) {
        data.append('id', employee._id);
        data.append('code', employee.code);
      }
      
      Object.keys(formData).forEach(key => {
        if (formData[key] || key === 'isStaff') {
          data.append(key, formData[key]);
        }
      });

      if (files.panProof) data.append('panProof', files.panProof);
      if (files.aadharProof) data.append('aadharProof', files.aadharProof);
      if (files.residentialProof) data.append('residentialProof', files.residentialProof);
      if (files.profileImage) data.append('profileImage', files.profileImage);

      if (isEdit) {
        const response = await employeeService.updateEmployee(data);
        if (response.success) {
          toastService.success('Associate updated successfully!');
          navigate('/dashboard/associates/management');
        } else {
          toastService.error(response.message || 'Failed to update associate');
        }
      } else {
        const response = await employeeService.addEmployee(data);
        if (response.success) {
          toastService.success('Associate added successfully!');
          navigate('/dashboard/associates/management');
        } else {
          toastService.error(response.message || 'Failed to add associate');
        }
      }
    } catch (error) {
      toastService.error(error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'add'} associate`);
    } finally {
      setLoading(false);
    }
  };

  const inputBase = {
    width: '100%',
    padding: '10px 14px',
    border: `1px solid ${dashboardColors.border}`,
    borderRadius: '6px',
    fontSize: '15px',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: 500,
    color: dashboardColors.text,
  };

  return (
    <>
      <style>{`
        .card {
          background: white;
          border: 1px solid ${dashboardColors.border};
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
          padding: 24px;
          margin-bottom: 32px;
        }
        .card h2 {
          margin: 0 0 20px 0;
          font-size: 19px;
          font-weight: 600;
          color: #111827;
        }
        .btn-green {
          background: ${dashboardColors.primary};
          color: white;
          border: none;
          padding: 10px 22px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.18s;
        }
        .btn-green:hover:not(:disabled) {
          opacity: 0.93;
        }
        .btn-green:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }
        .btn-cancel {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
          padding: 10px 22px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
        }
        .btn-cancel:hover {
          background: #e5e7eb;
        }
        .file-btn {
          display: inline-block;
          padding: 9px 18px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          min-width: 110px;
        }
        .file-residential { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
        .file-pan         { background: #f3e8ff; color: #6b21a8; border: 1px solid #c084fc; }
        .file-aadhaar     { background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
        .file-btn:hover   { opacity: 0.92; }
        .file-upload-container {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: ${dashboardColors.tertiary};
          border: 1px solid ${dashboardColors.border};
          border-radius: 8px;
          margin-bottom: 16px;
        }
        .file-upload-btn {
          padding: 10px 20px;
          background: ${dashboardColors.primary};
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .file-upload-btn:hover {
          opacity: 0.9;
        }
        .file-info {
          flex: 1;
          font-size: 14px;
          color: ${dashboardColors.text};
        }
        .existing-file-link {
          color: ${dashboardColors.primary};
          text-decoration: underline;
          cursor: pointer;
          font-size: 13px;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        backgroundColor: dashboardColors.background,
        padding: '40px 20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <button onClick={() => navigate('/dashboard/associates/management')} style={{
              padding: '8px',
              border: `1px solid ${dashboardColors.border}`,
              borderRadius: '6px',
              background: dashboardColors.white,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 500, color:dashboardColors.primary, margin: '0 0 8px 0' }}>
                {isEdit ? 'Edit Associate' : 'Add New Associate'}
              </h1>
              <p style={{ color: '#4b5563', margin: 0 }}>
                {isEdit ? 'Update associate details' : 'Fill in the details to register a new associate'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* AADHAAR VERIFICATION */}
            <div className="card">
              <h2>Aadhaar Verification</h2>
              <p style={{ color: '#6b7280', margin: '0 0 20px 0', fontSize: '15px' }}>
                Complete the Aadhaar Verification to begin the onboarding process
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label style={labelStyle}>Aadhaar</label>
                  <input
                    type="text"
                    maxLength={12}
                    placeholder="Enter Aadhaar number"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    style={inputBase}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Enter OTP</label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="••••••"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      disabled={!otpSent || aadhaarVerified}
                      style={{
                        ...inputBase,
                        flex: '1 1 auto',
                        ...(aadhaarVerified ? { backgroundColor: '#f0fdf4', borderColor: '#16a34a' } : {}),
                      }}
                    />
                    <button
                      type="button"
                      onClick={verifyOTP}
                      disabled={!otpSent || aadhaarVerified}
                      className="btn-green"
                      style={{ minWidth: '120px', ...(aadhaarVerified ? { background: '#16a34a' } : {}) }}
                    >
                      {aadhaarVerified ? 'Verified' : 'Verify OTP'}
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  type="button"
                  onClick={sendOTP}
                  disabled={otpSent && timer > 0}
                  className="btn-green"
                >
                  Send OTP
                </button>

                {otpSent && timer > 0 && (
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>
                    Remaining time: {timer}s
                  </span>
                )}
              </div>
            </div>

            {/* BASIC DETAILS */}
            <div className="card">
              <h2>Basic Details</h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div>
                  <label style={labelStyle}>Sponsored By</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="Search sponsor"
                      value={selectedSponsor ? selectedSponsor.name : searchSponsor}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSearchSponsor(value);
                        setSelectedSponsor(null);
                        setFormData(prev => ({ ...prev, sponser: '' }));
                        if (value) {
                          setShowSponsorDropdown(true);
                        } else {
                          setShowSponsorDropdown(false);
                          setSponsors([]);
                        }
                      }}
                      onFocus={() => {
                        if (searchSponsor) {
                          setShowSponsorDropdown(true);
                        }
                      }}
                      onBlur={() => {
                        setTimeout(() => setShowSponsorDropdown(false), 200);
                      }}
                      style={inputBase}
                    />
                    {showSponsorDropdown && sponsors.length > 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        border: `1px solid ${dashboardColors.border}`,
                        borderRadius: '6px',
                        marginTop: '4px',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        zIndex: 10,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}>
                        {sponsors.map((sponsor) => (
                          <div
                            key={sponsor._id}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setSelectedSponsor(sponsor);
                              setSearchSponsor(sponsor.name);
                              setShowSponsorDropdown(false);
                              setFormData(prev => ({ ...prev, sponser: sponsor._id, role: '' }));
                              // Fetch roles based on selected sponsor's role
                              if (sponsor.role?._id) {
                                fetchRolesBySponsor(sponsor.role._id);
                              }
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
                            {sponsor.name} ({sponsor.code})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Designation *</label>
                  <select name="role" value={formData.role} onChange={handleChange} style={inputBase} required>
                    <option value="">Select Designation</option>
                    {designations.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input type="text" name="name" placeholder="Enter Full Name" value={formData.name} onChange={handleChange} style={inputBase} required />
                </div>

                <div>
                  <label style={labelStyle}>Father's / Husband's Name</label>
                  <input type="text" name="guardian" placeholder="Enter Father's/Husband's Name" value={formData.guardian} onChange={handleChange} style={inputBase} />
                </div>

                <div>
                  <label style={labelStyle}>Occupation</label>
                  <input type="text" name="occupation" placeholder="Enter Occupation" value={formData.occupation} onChange={handleChange} style={inputBase} />
                </div>

                <div>
                  <label style={labelStyle}>Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={inputBase} />
                </div>

                <div>
                  <label style={labelStyle}>Date of Joining</label>
                  <input type="date" name="doj" value={formData.doj} onChange={handleChange} style={inputBase} />
                </div>

                <div>
                  <label style={labelStyle}>Blood Group</label>
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} style={inputBase}>
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Password {!isEdit && '*'}</label>
                  <input 
                    type="password" 
                    name="password" 
                    placeholder={isEdit ? 'Leave blank to keep current password' : 'Enter Password'} 
                    value={formData.password} 
                    onChange={handleChange} 
                    style={inputBase} 
                    required={!isEdit} 
                  />
                </div>

                <div>
                  <label style={labelStyle}>Is Staff</label>
                  <div style={{ display: 'flex', gap: '20px', paddingTop: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="isStaff" 
                        checked={formData.isStaff === true}
                        onChange={() => setFormData(prev => ({ ...prev, isStaff: true }))}
                      />
                      <span>Yes</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="isStaff" 
                        checked={formData.isStaff === false}
                        onChange={() => setFormData(prev => ({ ...prev, isStaff: false }))}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* BANK DETAILS */}
            <div className="card">
              <h2>Bank Details</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div>
                  <label style={labelStyle}>Bank Account Number</label>
                  <input type="text" name="bankaccountnumber" placeholder="Enter Bank Account Number" value={formData.bankaccountnumber} onChange={handleChange} style={inputBase} />
                </div>

                <div>
                  <label style={labelStyle}>Bank Name</label>
                  <input type="text" name="bankname" placeholder="Enter Bank Name" value={formData.bankname} onChange={handleChange} style={inputBase} />
                </div>

                <div>
                  <label style={labelStyle}>IFSC Code</label>
                  <input type="text" name="ifsc" placeholder="Enter IFSC Code" value={formData.ifsc} onChange={handleChange} style={inputBase} />
                </div>

                <div>
                  <label style={labelStyle}>Branch</label>
                  <input type="text" name="branch" placeholder="Enter Branch" value={formData.branch} onChange={handleChange} style={inputBase} />
                </div>
              </div>
            </div>

            {/* CONTACT DETAILS */}
            <div className="card">
              <h2>Contact Details</h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" name="email" placeholder="Enter Email Address" value={formData.email} onChange={handleChange} style={inputBase} required />
                </div>

                <div>
                  <label style={labelStyle}>Primary Phone Number *</label>
                  <input type="tel" name="phone" placeholder="Enter Primary Phone Number" value={formData.phone} onChange={handleChange} style={inputBase} required />
                </div>

                <div>
                  <label style={labelStyle}>Secondary Phone Number</label>
                  <input type="tel" name="secondphone" placeholder="Enter Secondary Phone Number" value={formData.secondphone} onChange={handleChange} style={inputBase} />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Address for Communication</label>
                  <textarea
                    rows={3}
                    name="address"
                    placeholder="Enter the full Address for Communication..."
                    value={formData.address}
                    onChange={handleChange}
                    style={{
                      ...inputBase,
                      resize: 'vertical',
                      minHeight: '90px',
                    }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>City</label>
                  <input type="text" name="city" placeholder="Enter City" value={formData.city} onChange={handleChange} style={inputBase} />
                </div>

                <div>
                  <label style={labelStyle}>State</label>
                  <input type="text" name="state" placeholder="Enter State" value={formData.state} onChange={handleChange} style={inputBase} />
                </div>

                <div>
                  <label style={labelStyle}>Country</label>
                  <input type="text" name="country" placeholder="Enter Country" value={formData.country} onChange={handleChange} style={inputBase} />
                </div>

                <div>
                  <label style={labelStyle}>Pincode</label>
                  <input type="text" name="pincode" placeholder="Enter Pincode" value={formData.pincode} onChange={handleChange} style={inputBase} />
                </div>
              </div>
            </div>

            {/* IDENTITY & DOCUMENTS */}
            <div className="card">
              <h2>Identity & Documents</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div>
                  <label style={labelStyle}>PAN Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    placeholder="Enter PAN Number"
                    maxLength={10}
                    style={{ ...inputBase, textTransform: 'uppercase' }}
                    value={formData.panNumber}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Aadhaar Number</label>
                  <input
                    type="text"
                    name="aadharNumber"
                    placeholder="Enter Aadhaar Number"
                    maxLength={12}
                    value={formData.aadharNumber}
                    onChange={handleChange}
                    style={inputBase}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Passport Number</label>
                  <input
                    type="text"
                    name="passportNumber"
                    placeholder="Enter Passport Number"
                    value={formData.passportNumber}
                    onChange={handleChange}
                    style={inputBase}
                  />
                </div>
              </div>

                            <div style={{ marginBottom: '32px' }}>
                <label style={labelStyle}>Profile Image</label>
                <div className="file-upload-container">
                  <input type="file" id="profileImage" name="profileImage" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                  <label htmlFor="profileImage" className="file-upload-btn">
                    Choose File
                  </label>
                  <div className="file-info">
                    {files.profileImage ? (
                      <span>{files.profileImage.name}</span>
                    ) : existingFiles.profileImage ? (
                      <span>Current: <a href={`https://api.landvestinfra.com${existingFiles.profileImage}`} target="_blank" rel="noopener noreferrer" className="existing-file-link">View File</a></span>
                    ) : (
                      <span style={{ color: '#9ca3af' }}>No file chosen</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <label style={labelStyle}>Residential Proof<br/><small style={{ fontWeight: 400, color: '#6b7280' }}>
                    (Upload electricity bill, rental agreement, etc.)
                  </small></label>
                  <div className="file-upload-container">
                    <input type="file" id="residentialProof" name="residentialProof" style={{ display: 'none' }} onChange={handleFileChange} />
                    <label htmlFor="residentialProof" className="file-upload-btn">
                      Choose File
                    </label>
                    <div className="file-info">
                      {files.residentialProof ? (
                        <span>{files.residentialProof.name}</span>
                      ) : existingFiles.residentialProof ? (
                        <span>Current: <a href={`https://api.landvestinfra.com${existingFiles.residentialProof}`} target="_blank" rel="noopener noreferrer" className="existing-file-link">View File</a></span>
                      ) : (
                        <span style={{ color: '#9ca3af' }}>No file chosen</span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>PAN Card<br/><small style={{ fontWeight: 400, color: '#6b7280' }}>
                    Upload clear copy of PAN card
                  </small></label>
                  <div className="file-upload-container">
                    <input type="file" id="panCard" name="panProof" style={{ display: 'none' }} onChange={handleFileChange} />
                    <label htmlFor="panCard" className="file-upload-btn">
                      Choose File
                    </label>
                    <div className="file-info">
                      {files.panProof ? (
                        <span>{files.panProof.name}</span>
                      ) : existingFiles.panProof ? (
                        <span>Current: <a href={`https://api.landvestinfra.com${existingFiles.panProof}`} target="_blank" rel="noopener noreferrer" className="existing-file-link">View File</a></span>
                      ) : (
                        <span style={{ color: '#9ca3af' }}>No file chosen</span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Aadhaar Card<br/><small style={{ fontWeight: 400, color: '#6b7280' }}>
                    Upload clear copy of Aadhaar card
                  </small></label>
                  <div className="file-upload-container">
                    <input type="file" id="aadhaarCard" name="aadharProof" style={{ display: 'none' }} onChange={handleFileChange} />
                    <label htmlFor="aadhaarCard" className="file-upload-btn">
                      Choose File
                    </label>
                    <div className="file-info">
                      {files.aadharProof ? (
                        <span>{files.aadharProof.name}</span>
                      ) : existingFiles.aadharProof ? (
                        <span>Current: <a href={`https://api.landvestinfra.com${existingFiles.aadharProof}`} target="_blank" rel="noopener noreferrer" className="existing-file-link">View File</a></span>
                      ) : (
                        <span style={{ color: '#9ca3af' }}>No file chosen</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '40px' }}>
              <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard/associates/management')}>
                Cancel
              </button>
              <button type="submit" className="btn-green" style={{ padding: '10px 36px' }} disabled={loading}>
                {loading ? 'Saving...' : (isEdit ? 'Update Associate' : 'Save Associate')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAssociate;
