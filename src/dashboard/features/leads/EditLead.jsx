import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, Car, Users, Upload, ArrowLeft } from 'lucide-react';
import { dashboardColors } from '../../styles/colors';
import { leadService } from '../../../services/leadService';
import { employeeService } from '../../../services/employeeService';
import { toastService } from '../../../services/toastService';

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sourceType, setSourceType] = useState('social');
  const [sources, setSources] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [pricingOptions, setPricingOptions] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [buyingPurposes, setBuyingPurposes] = useState([]);
  const [leadStatuses, setLeadStatuses] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPricingMrp, setSelectedPricingMrp] = useState(0);
  const [previousAdvanceAmount, setPreviousAdvanceAmount] = useState(0);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [showAdvanceCard, setShowAdvanceCard] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentCollectionData, setPaymentCollectionData] = useState({
    amount: '',
    date: '',
    note: ''
  });

  const [formData, setFormData] = useState({
    code: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    source: '',
    sourceEmployee: '',
    project: '',
    propertyType: '',
    pricingOption: '',
    plotNo: '',
    requirements: '',
    plotSize: '',
    approvedBy: '',
    facingPreference: '',
    budgectFrom: '',
    budgectTo: '',
    buyingPurpose: '',
    advanceAmount: '',
    advanceDate: '',
    nextPayAmount: '',
    nextPayDate: '',
    nextActionDate: '',
    nextActionType: 'Call',
    nextActionNote: '',
    leadStatus: '',
    assignedTo: ''
  });

  useEffect(() => {
    fetchInitialData();
    fetchLeadData();
  }, [id]);

  useEffect(() => {
    if (sourceType === 'social') {
      fetchLeadSources();
    }
  }, [sourceType]);

  const fetchLeadData = async () => {
    try {
      const response = await leadService.getLeadInfo(id);
      if (response.success) {
        const lead = response.data;
        setSourceType(lead.sourceType);
        setPreviousAdvanceAmount(lead.advanceAmount || 0);
        setSelectedPricingMrp(lead.totalBalance || 0);
        setPaymentHistory(lead.advanceInfo || []);
        
        setExistingImage(lead.selfieImage || '');
        
        // Hide advance card if there's at least one payment record
        if (lead.advanceInfo && lead.advanceInfo.length > 0) {
          setShowAdvanceCard(false);
        }
        
        if (lead.project && lead.project.pricingOptions) {
          setPricingOptions(lead.project.pricingOptions);
        }

        setFormData({
          code: lead.code || '',
          firstName: lead.firstName || '',
          lastName: lead.lastName || '',
          email: lead.email || '',
          mobile: lead.mobile || '',
          source: lead.source?._id || '',
          sourceEmployee: lead.sourceEmployee || '',
          project: lead.project?._id || '',
          propertyType: lead.propertyType?._id || '',
          pricingOption: lead.pricingOption?._id || '',
          plotNo: lead.plotNo || '',
          requirements: lead.requirements || '',
          plotSize: lead.plotSize || '',
          approvedBy: lead.approvedBy || '',
          facingPreference: lead.facingPreference || '',
          budgectFrom: lead.budgectFrom || '',
          budgectTo: lead.budgectTo || '',
          buyingPurpose: lead.buyingPurpose?._id || '',
          advanceAmount: '',
          advanceDate: '',
          nextPayAmount: '',
          nextPayDate: '',
          nextActionDate: lead.nextActionDate ? lead.nextActionDate.slice(0, 16) : '',
          nextActionType: lead.nextActionType || 'Call',
          nextActionNote: lead.nextActionNote || '',
          leadStatus: lead.leadStatus?._id || '',
          assignedTo: lead.assignedTo?._id || ''
        });

        if (lead.sourceEmployee) {
          setEmployeeSearch(`${lead.assignedTo?.code || ''} - ${lead.assignedTo?.name || ''}`);
        }
      }
    } catch (error) {
      toastService.error('Failed to load lead data');
    }
  };

  const fetchInitialData = async () => {
    try {
      const [projectsRes, propertyTypesRes, buyingPurposesRes, leadStatusesRes] = await Promise.all([
        leadService.getProjects(),
        leadService.getPropertyTypes(),
        leadService.getBuyingPurposes(),
        leadService.getLeadStatuses()
      ]);

      if (projectsRes.success) setProjects(projectsRes.data);
      if (propertyTypesRes.success) setPropertyTypes(propertyTypesRes.data);
      if (buyingPurposesRes.success) setBuyingPurposes(buyingPurposesRes.data);
      if (leadStatusesRes.success) setLeadStatuses(leadStatusesRes.data.filter(status => status.status === 'active'));
    } catch (error) {
      toastService.error('Failed to load initial data');
    }
  };

  const fetchLeadSources = async () => {
    try {
      const response = await leadService.getLeadSources();
      if (response.success) {
        setSources(response.data);
      }
    } catch (error) {
      toastService.error('Failed to load lead sources');
    }
  };

  const handleEmployeeSearch = async (search) => {
    setEmployeeSearch(search);
    if (search.length >= 2) {
      try {
        const response = await employeeService.listEmployees(search);
        if (response.success) {
          setEmployees(response.data);
        }
      } catch (error) {
        console.error('Failed to search employees');
      }
    } else {
      setEmployees([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateBalanceAmount = () => {
    const newAdvance = parseFloat(formData.advanceAmount) || 0;
    const totalPaid = previousAdvanceAmount + newAdvance;
    return selectedPricingMrp - totalPaid;
  };

  const calculateProgress = () => {
    if (selectedPricingMrp === 0) return 0;
    const newAdvance = parseFloat(formData.advanceAmount) || 0;
    const totalPaid = previousAdvanceAmount + newAdvance;
    return Math.min((totalPaid / selectedPricingMrp) * 100, 100);
  };

  const handleCollectPayment = async () => {
    if (!paymentCollectionData.amount || !paymentCollectionData.date) {
      toastService.error('Amount and Date are required');
      return;
    }

    try {
      const payload = {
        leadId: id,
        code: formData.code,
        id: selectedPayment._id,
        collectedAmount: paymentCollectionData.amount,
        collectedDate: paymentCollectionData.date,
        note: paymentCollectionData.note
      };

      const response = await leadService.collectPayment(payload);
      if (response.success) {
        toastService.success('Payment collected successfully!');
        setShowPaymentModal(false);
        fetchLeadData(); // Refresh lead data
      } else {
        toastService.error(response.message || 'Failed to collect payment');
      }
    } catch (error) {
      toastService.error(error.response?.data?.message || 'Failed to collect payment');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.mobile) {
      toastService.error('First Name and Mobile are required');
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('id', id);
      formDataToSend.append('code', formData.code);
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('sourceType', sourceType);
      formDataToSend.append('source', sourceType === 'social' ? formData.source : '');
      formDataToSend.append('sourceEmployee', sourceType === 'sales' ? formData.sourceEmployee : '');
      formDataToSend.append('project', formData.project);
      formDataToSend.append('propertyType', formData.propertyType);
      formDataToSend.append('pricingOption', formData.pricingOption);
      formDataToSend.append('plotNo', formData.plotNo);
      formDataToSend.append('requirements', formData.requirements);
      formDataToSend.append('plotSize', formData.plotSize);
      formDataToSend.append('approvedBy', formData.approvedBy);
      formDataToSend.append('facingPreference', formData.facingPreference);
      formDataToSend.append('budgectFrom', formData.budgectFrom);
      formDataToSend.append('budgectTo', formData.budgectTo);
      formDataToSend.append('buyingPurpose', formData.buyingPurpose);
      formDataToSend.append('nextPayAmount', formData.nextPayAmount);
      formDataToSend.append('nextPayDate', formData.nextPayDate);
      formDataToSend.append('nextActionDate', formData.nextActionDate);
      formDataToSend.append('nextActionType', formData.nextActionType);
      formDataToSend.append('nextActionNote', formData.nextActionNote);
      formDataToSend.append('leadStatus', formData.leadStatus);
      formDataToSend.append('assignedTo', formData.assignedTo);

      
      // Append file if exists
      if (selectedFile) {
        formDataToSend.append('selfieImage', selectedFile);
      }

      const response = await leadService.updateLead(formDataToSend);
      if (response.success) {
        toastService.success('Lead updated successfully!');
        navigate('/dashboard/leads/management');
      } else {
        toastService.error(response.message || 'Failed to update lead');
      }
    } catch (error) {
      toastService.error(error.response?.data?.message || 'Failed to update lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: dashboardColors.background }}>
      {/* Back Button */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={() => navigate('/dashboard/leads/management')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: dashboardColors.white,
            border: `1px solid ${dashboardColors.border}`,
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            color: dashboardColors.text
          }}
        >
          <ArrowLeft size={18} />
          Back to Leads Management
        </button>
      </div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: dashboardColors.text, margin: '0 0 8px 0' }}>
          Edit Lead
        </h1>
        <p style={{ fontSize: '14px', color: dashboardColors.textLight, margin: 0 }}>
          Lead Code: {formData.code}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Lead Information */}
        <div style={{ backgroundColor: dashboardColors.white, padding: '24px', borderRadius: '12px', marginBottom: '20px', border: `1px solid ${dashboardColors.border}` }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: dashboardColors.text, marginBottom: '20px' }}>
            Lead Information
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter name"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${dashboardColors.border}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter name"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${dashboardColors.border}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${dashboardColors.border}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                Mobile Number
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value="+91"
                  disabled
                  style={{
                    width: '60px',
                    padding: '10px 12px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: dashboardColors.tertiary,
                    textAlign: 'center'
                  }}
                />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="9876543202"
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                Upload Selfie with client
              </label>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                padding: '16px',
                background: dashboardColors.tertiary,
                border: `1px solid ${dashboardColors.border}`,
                borderRadius: '8px'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  style={{ display: 'none' }}
                  id="selfieUpload"
                />
                <label
                  htmlFor="selfieUpload"
                  style={{
                    padding: '10px 20px',
                    background: dashboardColors.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s'
                  }}
                >
                  Choose File
                </label>
                <div style={{ flex: 1, fontSize: '14px', color: dashboardColors.text }}>
                  {selectedFile ? (
                    <span>{selectedFile.name}</span>
                  ) : existingImage ? (
                    <span>Current: <a href={`https://realestate.vsahasoft.com${existingImage}`} target="_blank" rel="noopener noreferrer" style={{ color: dashboardColors.primary, textDecoration: 'underline', cursor: 'pointer', fontSize: '13px' }}>View File</a></span>
                  ) : (
                    <span style={{ color: '#9ca3af' }}>No file chosen</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Classification */}
        <div style={{ backgroundColor: dashboardColors.white, padding: '24px', borderRadius: '12px', marginBottom: '20px', border: `1px solid ${dashboardColors.border}` }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: dashboardColors.text, marginBottom: '20px' }}>
            Lead Classification
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                Source Type
              </label>
              <select
                value={sourceType}
                onChange={(e) => { setSourceType(e.target.value); setFormData(prev => ({ ...prev, source: '', sourceEmployee: '' })); }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${dashboardColors.border}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: dashboardColors.white
                }}
              >
                <option value="social">Social Media</option>
                <option value="sales">Employee (Sales)</option>
              </select>
            </div>

            {sourceType === 'social' ? (
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                  Source
                </label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: dashboardColors.white
                  }}
                >
                  <option value="">Select Source</option>
                  {sources.map(source => (
                    <option key={source._id} value={source._id}>{source.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                  Employee Code
                </label>
                <input
                  type="text"
                  value={employeeSearch}
                  onChange={(e) => handleEmployeeSearch(e.target.value)}
                  placeholder="Enter employee code"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                {employees.length > 0 && (
                  <div style={{ position: 'relative', width: '100%' }}>
                    <div style={{
                      position: 'absolute',
                      top: '4px',
                      left: 0,
                      right: 0,
                      backgroundColor: dashboardColors.white,
                      border: `1px solid ${dashboardColors.border}`,
                      borderRadius: '6px',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      zIndex: 10,
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                      {employees.map(emp => (
                        <div
                          key={emp._id}
                          onMouseDown={() => {
                            setFormData(prev => ({ ...prev, sourceEmployee: emp._id }));
                            setEmployeeSearch(`${emp.code} - ${emp.name}`);
                            setEmployees([]);
                          }}
                          style={{
                            padding: '10px 12px',
                            cursor: 'pointer',
                            borderBottom: `1px solid ${dashboardColors.border}`,
                            fontSize: '14px'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = dashboardColors.tertiary}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          {emp.code} - {emp.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Property Interest */}
          <div style={{ backgroundColor: dashboardColors.white, padding: '24px', borderRadius: '12px', border: `1px solid ${dashboardColors.border}` }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: dashboardColors.text, marginBottom: '20px' }}>
              Property Interest
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                    Interested Project
                  </label>
                  <select
                    name="project"
                    value={formData.project}
                    disabled
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${dashboardColors.border}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: dashboardColors.tertiary,
                      cursor: 'not-allowed'
                    }}
                  >
                    <option value="">Select Project</option>
                    {projects.map(project => (
                      <option key={project._id} value={project._id}>{project.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${dashboardColors.border}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: dashboardColors.white
                    }}
                  >
                    <option value="">Select Property</option>
                    {propertyTypes.map(type => (
                      <option key={type._id} value={type._id}>{type.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Project Payment Plan - Selected Card (Disabled) */}
              {formData.project && formData.pricingOption && pricingOptions.length > 0 && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                    Project Payment Plan
                  </label>
                  {(() => {
                    const selectedOption = pricingOptions.find(opt => opt.pricingOption._id === formData.pricingOption);
                    return selectedOption ? (
                      <div style={{
                        padding: '16px',
                        border: `1px solid ${dashboardColors.border}`,
                        borderRadius: '8px',
                        backgroundColor: dashboardColors.tertiary,
                        cursor: 'not-allowed',
                        opacity: 0.7
                      }}>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: dashboardColors.text, marginBottom: '4px' }}>
                          {selectedOption.pricingOption.title}
                        </div>
                        <div style={{ fontSize: '13px', color: dashboardColors.textLight }}>
                          Base Price: ₹{selectedOption.mrp.toLocaleString('en-IN')} • {selectedOption.duration} Months • {selectedOption.installment} Installments
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                    Plot Number
                  </label>
                  <input
                    type="text"
                    name="plotNo"
                    value={formData.plotNo}
                    onChange={handleInputChange}
                    placeholder="Enter Plot Number"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${dashboardColors.border}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                    Requirements
                  </label>
                  <input
                    type="text"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="Enter Requirements"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${dashboardColors.border}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                    Plot Size
                  </label>
                  <input
                    type="text"
                    name="plotSize"
                    value={formData.plotSize}
                    onChange={handleInputChange}
                    placeholder="Enter Plot Size"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${dashboardColors.border}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                    Approved By
                  </label>
                  <input
                    type="text"
                    name="approvedBy"
                    value={formData.approvedBy}
                    onChange={handleInputChange}
                    placeholder="Enter Approved By"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${dashboardColors.border}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                    Budget Range
                  </label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: dashboardColors.textLight }}>₹</span>
                      <input
                        type="text"
                        name="budgectFrom"
                        value={formData.budgectFrom}
                        onChange={handleInputChange}
                        placeholder="Min"
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 28px',
                          border: `1px solid ${dashboardColors.border}`,
                          borderRadius: '6px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <span>-</span>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: dashboardColors.textLight }}>₹</span>
                      <input
                        type="text"
                        name="budgectTo"
                        value={formData.budgectTo}
                        onChange={handleInputChange}
                        placeholder="Max"
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 28px',
                          border: `1px solid ${dashboardColors.border}`,
                          borderRadius: '6px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '12px' }}>
                  Purpose of buying
                </label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {buyingPurposes.map(purpose => (
                    <label key={purpose._id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', border: `1px solid ${dashboardColors.border}`, borderRadius: '6px', cursor: 'pointer', flex: 1, minWidth: '200px' }}>
                      <input
                        type="radio"
                        name="buyingPurpose"
                        value={purpose._id}
                        checked={formData.buyingPurpose === purpose._id}
                        onChange={handleInputChange}
                      />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '500' }}>{purpose.name}</div>
                        <div style={{ fontSize: '12px', color: dashboardColors.textLight }}>{purpose.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                  Lead Status
                </label>
                <select
                  name="leadStatus"
                  value={formData.leadStatus}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: dashboardColors.white
                  }}
                >
                  <option value="">Select Status</option>
                  {leadStatuses.map(status => (
                    <option key={status._id} value={status._id}>{status.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Next Action */}
          <div style={{ backgroundColor: dashboardColors.white, padding: '24px', borderRadius: '12px', border: `1px solid ${dashboardColors.border}`, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: dashboardColors.text, marginBottom: '20px' }}>
              Next Action
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="nextActionDate"
                  value={formData.nextActionDate}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '12px' }}>
                  Activity Type
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, nextActionType: 'Call' }))}
                    style={{
                      flex: 1,
                      padding: '16px',
                      border: `2px solid ${formData.nextActionType === 'Call' ? dashboardColors.primary : dashboardColors.border}`,
                      borderRadius: '8px',
                      backgroundColor: formData.nextActionType === 'Call' ? `${dashboardColors.primary}10` : dashboardColors.white,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Phone size={24} color={formData.nextActionType === 'Call' ? dashboardColors.primary : dashboardColors.textLight} />
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>Call</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, nextActionType: 'Visit' }))}
                    style={{
                      flex: 1,
                      padding: '16px',
                      border: `2px solid ${formData.nextActionType === 'Visit' ? dashboardColors.primary : dashboardColors.border}`,
                      borderRadius: '8px',
                      backgroundColor: formData.nextActionType === 'Visit' ? `${dashboardColors.primary}10` : dashboardColors.white,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Car size={24} color={formData.nextActionType === 'Visit' ? dashboardColors.primary : dashboardColors.textLight} />
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>Visit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, nextActionType: 'Meet' }))}
                    style={{
                      flex: 1,
                      padding: '16px',
                      border: `2px solid ${formData.nextActionType === 'Meet' ? dashboardColors.primary : dashboardColors.border}`,
                      borderRadius: '8px',
                      backgroundColor: formData.nextActionType === 'Meet' ? `${dashboardColors.primary}10` : dashboardColors.white,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Users size={24} color={formData.nextActionType === 'Meet' ? dashboardColors.primary : dashboardColors.textLight} />
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>Meet</span>
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                  Notes
                </label>
                <textarea
                  name="nextActionNote"
                  value={formData.nextActionNote}
                  onChange={handleInputChange}
                  placeholder="Any specific requirements or comments..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Payment History */}
              {/* {paymentHistory && paymentHistory.length > 0 && (
                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: `1px solid ${dashboardColors.border}` }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: dashboardColors.text, marginBottom: '12px' }}>
                    Past Payment History
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                    {paymentHistory.map((payment, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '12px',
                          backgroundColor: dashboardColors.tertiary,
                          borderRadius: '6px',
                          border: `1px solid ${dashboardColors.border}`
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: dashboardColors.text }}>
                            Payment {index + 1}
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: dashboardColors.primary }}>
                            ₹{payment.amount?.toLocaleString('en-IN') || '0'}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: dashboardColors.textLight }}>
                          Date: {payment.date ? new Date(payment.date).toLocaleDateString('en-IN') : 'N/A'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Booking & Payment */}
        <div style={{ backgroundColor: dashboardColors.white, padding: '24px', borderRadius: '12px', marginBottom: '20px', border: `1px solid ${dashboardColors.border}` }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: dashboardColors.text, marginBottom: '20px' }}>
            Booking & Payment
          </h2>
          
          {selectedPricingMrp > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: dashboardColors.text }}>Payment Progress</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: dashboardColors.primary }}>
                  ₹{(previousAdvanceAmount + (parseFloat(formData.advanceAmount) || 0)).toLocaleString('en-IN')} of ₹{selectedPricingMrp.toLocaleString('en-IN')} paid
                </span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '12px', 
                backgroundColor: '#f3f4f6', 
                borderRadius: '8px', 
                overflow: 'hidden',
                border: `1px solid ${dashboardColors.border}`,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
              }}>
                <div style={{ 
                  width: `${calculateProgress()}%`, 
                  height: '100%', 
                  background: `linear-gradient(90deg, ${dashboardColors.primary} 0%, ${dashboardColors.button} 100%)`,
                  transition: 'width 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: dashboardColors.primary }}>{calculateProgress().toFixed(1)}% completed</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: dashboardColors.textLight }}>Balance: ₹{calculateBalanceAmount().toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                Total Booking Amount
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: dashboardColors.textLight }}>₹</span>
                <input
                  type="text"
                  value={selectedPricingMrp.toLocaleString('en-IN')}
                  disabled
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 28px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    backgroundColor: dashboardColors.tertiary,
                    cursor: 'not-allowed'
                  }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                Balance Amount
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: dashboardColors.textLight }}>₹</span>
                <input
                  type="text"
                  value={calculateBalanceAmount().toLocaleString('en-IN')}
                  disabled
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 28px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    backgroundColor: dashboardColors.tertiary,
                    cursor: 'not-allowed'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Next Due Date Card - Show only if balance amount > 0 */}
          {calculateBalanceAmount() > 0 && (
            <div style={{ backgroundColor: dashboardColors.tertiary, padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: dashboardColors.text, marginBottom: '16px' }}>
                Next Due Date
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                    Due Amount
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: dashboardColors.textLight }}>₹</span>
                    <input
                      type="number"
                      name="nextPayAmount"
                      value={formData.nextPayAmount}
                      onChange={handleInputChange}
                      placeholder="Enter amount"
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 28px',
                        border: `1px solid ${dashboardColors.border}`,
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        backgroundColor: dashboardColors.white
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                    Payment Date
                  </label>
                  <input
                    type="date"
                    name="nextPayDate"
                    value={formData.nextPayDate}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${dashboardColors.border}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      backgroundColor: dashboardColors.white
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment History Cards */}
          {paymentHistory && paymentHistory.length > 0 && (
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: dashboardColors.text, marginBottom: '16px' }}>
                Payment History
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {paymentHistory.map((payment, index) => (
                  <div
                    key={payment._id || index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      backgroundColor: dashboardColors.white,
                      border: `1px solid ${dashboardColors.border}`,
                      borderRadius: '8px'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: dashboardColors.text, marginBottom: '4px' }}>
                        {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : 'rd'} Installment - ₹{(payment.advanceAmount || payment.nextPayAmount || 0).toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '13px', color: dashboardColors.textLight }}>
                        {payment.advanceDate || payment.nextPayDate ? new Date(payment.advanceDate || payment.nextPayDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'} • Bank Transfer
                      </div>
                    </div>
                    {payment.status === 'paid' ? (
                      <button
                        disabled
                        style={{
                          padding: '8px 20px',
                          backgroundColor: '#10b981',
                          color: dashboardColors.white,
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'not-allowed',
                          opacity: 0.8
                        }}
                      >
                        Paid
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPayment(payment);
                          setPaymentCollectionData({
                            amount: payment.nextPayAmount || '',
                            date: payment.nextPayDate ? payment.nextPayDate.slice(0, 10) : '',
                            note: ''
                          });
                          setShowPaymentModal(true);
                        }}
                        style={{
                          padding: '8px 20px',
                          backgroundColor: '#f59e0b',
                          color: dashboardColors.white,
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Collect Amount
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => navigate('/dashboard/leads/management')}
            style={{
              padding: '12px 32px',
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
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 32px',
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
            {loading ? 'Updating...' : 'Update Lead'}
          </button>
        </div>
      </form>

      {/* Payment Collection Modal */}
      {showPaymentModal && (
        <div
          onClick={() => setShowPaymentModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: dashboardColors.white,
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '600px',
              width: '90%',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: dashboardColors.text, marginBottom: '24px' }}>
              Payment Collection
            </h2>

            {/* <div style={{ backgroundColor: '#e0f2fe', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #0ea5e9' }}>
              <div style={{ fontSize: '13px', color: '#0369a1', marginBottom: '4px' }}>Amount to collect</div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#0c4a6e' }}>Total amount to collect</div>
            </div> */}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                  Amount to Collect
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: dashboardColors.textLight }}>₹</span>
                  <input
                    type="number"
                    value={paymentCollectionData.amount}
                    onChange={(e) => setPaymentCollectionData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="4,50,000"
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 28px',
                      border: `1px solid ${dashboardColors.border}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                  Payment Date
                </label>
                <input
                  type="date"
                  value={paymentCollectionData.date}
                  onChange={(e) => setPaymentCollectionData(prev => ({ ...prev, date: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${dashboardColors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                Note (Optional)
              </label>
              <textarea
                value={paymentCollectionData.note}
                onChange={(e) => setPaymentCollectionData(prev => ({ ...prev, note: e.target.value }))}
                placeholder="Enter any notes or comments..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${dashboardColors.border}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
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
                type="button"
                onClick={handleCollectPayment}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#10b981',
                  color: dashboardColors.white,
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Proceed To collect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditLead;
