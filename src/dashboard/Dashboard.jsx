import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Associates from "./features/associates/Associates";
import Projects from "./features/projects/Projects";
import Users from "./features/users/Users";
import { dashboardColors } from "./styles/colors";
import { UserPlus, Users as UsersIcon, UserCheck } from 'lucide-react';
import { permissionService } from '../services/permissionService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("associates");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [canEditLeads, setCanEditLeads] = useState(false);
  const [canEditAssociates, setCanEditAssociates] = useState(false);

  useEffect(() => {
    const isAdmin = permissionService.isAdmin();
    setCanEditLeads(isAdmin || permissionService.canEdit('Leads'));
    setCanEditAssociates(isAdmin || permissionService.canEdit('Associates'));
  }, []);

  const tabs = [
    { id: "associates", label: "Associates", component: Associates },
    { id: "projects", label: "Projects", component: Projects },
    { id: "users", label: "Users", component: Users },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div>
      <div
        style={{
          backgroundColor: dashboardColors.tertiary,
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: dashboardColors.primary,
                margin: 0,
              }}
            >
              Dashboard
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: dashboardColors.textLight,
                marginTop: "8px",
              }}
            >
              Welcome back, {JSON.parse(sessionStorage.getItem('user'))?.name || 'Admin'} • Last login: {new Date(JSON.parse(sessionStorage.getItem('user'))?.lastLogin || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {new Date(JSON.parse(sessionStorage.getItem('user'))?.lastLogin || new Date()).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {canEditLeads && (
              <button
                onClick={() => navigate('/dashboard/leads/add')}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  backgroundColor: dashboardColors.primary,
                  color: dashboardColors.white,
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                <UserCheck size={18} />
                Add Lead
              </button>
            )}

            {canEditAssociates && (
              <button
                onClick={() => navigate('/dashboard/associates/create')}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  backgroundColor: dashboardColors.primary,
                  color: dashboardColors.white,
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                <UserPlus size={18} />
                Add Associate
              </button>
            )}

            <button
              onClick={() => navigate('/dashboard/users/create')}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                backgroundColor: dashboardColors.primary,
                color: dashboardColors.white,
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              <UsersIcon size={18} />
              Create User
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          borderBottom: `2px solid ${dashboardColors.border}`,
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, // 👈 key change
                padding: "14px 0",
                background: "none",
                border: "none",
                fontSize: "16px",
                fontWeight: "500",
                textAlign: "center", // 👈 center text
                color:
                  activeTab === tab.id
                    ? dashboardColors.primary
                    : dashboardColors.textLight,
                cursor: "pointer",
                borderBottom:
                  activeTab === tab.id
                    ? `3px solid ${dashboardColors.primary}`
                    : "3px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div>{ActiveComponent && <ActiveComponent />}</div>
    </div>
  );
};

export default Dashboard;
