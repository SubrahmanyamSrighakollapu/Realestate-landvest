import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Marketing from "./marketing/Marketing";
import DashboardLayout from "./dashboard/components/dashboard/DashboardLayout";
import Dashboard from "./dashboard/Dashboard";
import Projects from "./dashboard/features/projects/Projects";
import AddProjectLayout from "./dashboard/features/projects/add-project/AddProjectLayout";
import EditProject from "./dashboard/features/projects/EditProject";
import Associates from "./dashboard/features/associates/Associates";
import AddAssociate from "./dashboard/features/associates/AddAssociate";
import AssociateProfile from "./dashboard/features/associates/AssociateProfile";
import AssociateTeamTree from "./dashboard/features/associates/AssociateTeamTree";
import Users from "./dashboard/features/users/Users";
import CreateUser from "./dashboard/features/users/CreateUser";
import OrganizationStructure from "./dashboard/features/org-tree/OrganizationStructure";
import ChangeTeamRole from "./dashboard/features/org-tree/ChangeTeamRole";
import ChangeRole from "./dashboard/features/org-tree/ChangeRole";
import DesignationManagementLayout from "./dashboard/features/designations/DesignationManagement";
import AssociateReports from "./dashboard/features/reports/AssociateReports";
import DirectoryManagement from "./dashboard/features/directory/DirectoryManagement";
import AssociatesManagement from "./dashboard/features/associates/AssociatesManagement";
import ProjectManagement from "./dashboard/features/projects/ProjectManagement";
import DesignationManagement from "./dashboard/features/designations/DesignationManagement";
import TeamAndRoles from "./dashboard/features/org-tree/TeamAndRoles";
import Reports from "./dashboard/features/key-reports/Reports";
import AddLeads from "./dashboard/features/leads/AddLeads";
import LeadsManagement from "./dashboard/features/leads/LeadsManagement";
import EditLead from "./dashboard/features/leads/EditLead";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ApprovalPending from "./auth/ApprovalPending";
import OtpVerification from "./auth/OtpVerification";
import KycVerification from "./auth/KycVerification";
import GoToDashboard from "./auth/GoToDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/approval-pending" element={<ApprovalPending />} />
        <Route path="/auth/otp-verification" element={<OtpVerification />} />
        <Route path="/auth/kyc-verification" element={<KycVerification />} />
        <Route path="/auth/go-to-dashboard" element={<GoToDashboard />} />

        {/* Marketing Routes */}
        <Route path="/*" element={<Marketing />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route
            path="designations"
            element={<DesignationManagementLayout />}
          />
          

          {/* Leads */}
          <Route path="leads/add" element={<AddLeads />} />
          <Route path="leads/management" element={<LeadsManagement />} />
          <Route path="leads/edit/:id" element={<EditLead />} />

          {/* Associates */}
          <Route path="associates" element={<Associates />} />
          <Route path="associates/create" element={<AddAssociate />} />
          <Route path="associates/edit" element={<AddAssociate />} />
          <Route path="associates/:id" element={<AssociateProfile />} />
          <Route path="associates/:id/team-tree" element={<AssociateTeamTree />} />
          <Route
            path="associates/management"
            element={<AssociatesManagement />}
          />

          {/* Projects */}
          <Route path="projects" element={<Projects />} />
          <Route path="projects/add" element={<AddProjectLayout />}>
            <Route index element={<AddProjectLayout />} />
            <Route path="basic-info" element={<AddProjectLayout />} />
            <Route path="pricing" element={<AddProjectLayout />} />
            <Route path="highlights" element={<AddProjectLayout />} />
            <Route path="location" element={<AddProjectLayout />} />
            <Route path="layout" element={<AddProjectLayout />} />
            <Route path="gallery" element={<AddProjectLayout />} />
            <Route path="review" element={<AddProjectLayout />} />
          </Route>
          <Route path="projects/management" element={<ProjectManagement />} />
          <Route path="projects/edit/:id" element={<EditProject />} />

          {/* Directory */}
          <Route path="directory/management" element={<DirectoryManagement />} />

          {/* Designations */}
          <Route path="designations/management" element={<DesignationManagement />} />

          {/* Org Tree */}
          <Route path="org-tree/management" element={<OrganizationStructure />} />
          <Route path="org-tree/teams-and-roles" element={<TeamAndRoles />} />
          <Route path="org-tree/change-role/:id" element={<ChangeRole />} />

          {/* Reports */}
          <Route path="reports/associate-reports" element={<AssociateReports />} />

          {/* Key Reports */}
          <Route path="key-reports/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
