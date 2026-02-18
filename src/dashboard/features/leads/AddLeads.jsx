import { useState, useEffect } from 'react';
import { Phone, Car, Users } from 'lucide-react';
import { dashboardColors } from '../../styles/colors';
import { leadService } from '../../../services/leadService';
import { employeeService } from '../../../services/employeeService';
import { toastService } from '../../../services/toastService';

const AddLeads = () => {
  const [sourceType, setSourceType] = useState('social');
  const [sources, setSources] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [buyingPurposes, setBuyingPurposes] = useState([]);
  const [leadStatuses, setLeadStatuses] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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
    budgectFrom: '',
    budgectTo: '',
    buyingPurpose: '',
    advanceAmount: '',
    advanceDate: '',
    nextActionDate: '',
    nextActionType: 'call',
    nextActionNote: '',
    leadStatus: '',
    assignedTo: ''
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (sourceType === 'social') {
      fetchLeadSources();
    }
  }, [sourceType]);

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
      if (leadStatusesRes.success) setLeadStatuses(leadStatusesRes.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.mobile) {
      toastService.error('First Name and Mobile are required');
      return;
    }

    if (sourceType === 'sales' && !formData.sourceEmployee) {
      toastService.error('Source Employee is required for sales source type');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        sourceType: sourceType,
        source: sourceType === 'social' ? formData.source : '',
        sourceEmployee: sourceType === 'sales' ? formData.sourceEmployee : '',
        project: formData.project,
        propertyType: formData.propertyType,
        pricingOption: formData.pricingOption,
        plotNo: formData.plotNo,
        budgectFrom: formData.budgectFrom,
        budgectTo: formData.budgectTo,
        buyingPurpose: formData.buyingPurpose,
        advanceAmount: formData.advanceAmount,
        advanceDate: formData.advanceDate,
        nextActionDate: formData.nextActionDate,
        nextActionType: formData.nextActionType,
        nextActionNote: formData.nextActionNote,
        leadStatus: formData.leadStatus,
        assignedTo: formData.assignedTo
      };

      const response = await leadService.addLead(payload);
      if (response.success) {
        toastService.success('Lead added successfully!');
        // Reset form or navigate
      }
    } catch (error) {
      toastService.error(error.response?.data?.message || 'Failed to add lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: dashboardColors.background }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: dashboardColors.text, margin: '0 0 8px 0' }}>
          Add New Lead
        </h1>
        <p style={{ fontSize: '14px', color: dashboardColors.textLight, margin: 0 }}>
          Welcome back, Admin • Last login: Today at 9:30 AM
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
          </div>
        </div>

        {/* Lead Classification */}
        <div style={{ backgroundColor: dashboardColors.white, padding: '24px', borderRadius: '12px', marginBottom: '20px', border: `1px solid ${dashboardColors.border}` }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: dashboardColors.text, marginBottom: '20px' }}>
            Lead Classification
          </h2>
          
          {/* Source Type */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
              Source Type
            </label>
            <select
              value={sourceType}
              onChange={(e) => { setSourceType(e.target.value); setFormData(prev => ({ ...prev, source: '', sourceEmployee: '' })); }}
              style={{
                width: '50%',
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

          {/* Source Dropdown */}
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
                  width: '50%',
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
                  width: '50%',
                  padding: '10px 12px',
                  border: `1px solid ${dashboardColors.border}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {employees.length > 0 && (
                <div style={{ position: 'relative', width: '50%' }}>
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
          <div style={{ backgroundColor: dashboardColors.white, padding: '24px', borderRadius: '12px', border: `1px solid ${dashboardColors.border}` }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: dashboardColors.text, marginBottom: '20px' }}>
              Next Action
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                  rows={4}
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
            </div>
          </div>
        </div>

        {/* Booking & Payment */}
        <div style={{ backgroundColor: dashboardColors.white, padding: '24px', borderRadius: '12px', marginBottom: '20px', border: `1px solid ${dashboardColors.border}` }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: dashboardColors.text, marginBottom: '20px' }}>
            Booking & Payment
          </h2>
          
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: dashboardColors.text }}>Payment Progress</span>
              <span style={{ fontSize: '13px', color: dashboardColors.textLight }}>₹4,50,000 of ₹8,50,000 paid</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: dashboardColors.tertiary, borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '53%', height: '100%', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ fontSize: '12px', color: dashboardColors.textLight }}>53% completed</span>
              <span style={{ fontSize: '12px', color: dashboardColors.textLight }}>₹3,50,000 remaining</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: dashboardColors.text, marginBottom: '8px' }}>
                Advance Amount Paid
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: dashboardColors.textLight }}>₹</span>
                <input
                  type="text"
                  name="advanceAmount"
                  value={formData.advanceAmount}
                  onChange={handleInputChange}
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
                name="advanceDate"
                value={formData.advanceDate}
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
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
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
            style={{
              padding: '12px 32px',
              backgroundColor: dashboardColors.primary,
              color: dashboardColors.white,
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLeads;
