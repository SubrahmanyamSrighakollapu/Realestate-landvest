export const permissionService = {
  // Get all permissions from sessionStorage
  getPermissions: () => {
    const user = sessionStorage.getItem('user');
    if (!user) return [];
    const userData = JSON.parse(user);
    return userData.rolePermissions || [];
  },

  // Check if user is Admin
  isAdmin: () => {
    const user = sessionStorage.getItem('user');
    if (!user) return false;
    const userData = JSON.parse(user);
    return userData.role?.name === 'Admin';
  },

  // Check if user has permission for a specific module and action
  hasPermission: (moduleName, action) => {
    // Admin bypasses permission checks for Leads module
    if (moduleName === 'Leads' && permissionService.isAdmin()) {
      return true;
    }
    
    const permissions = permissionService.getPermissions();
    const modulePermission = permissions.find(p => p.module?.name === moduleName);
    
    if (!modulePermission) return false;
    
    // action can be: 'view', 'edit', 'delete', 'download', 'active'
    return modulePermission[action] === 1;
  },

  // Check if user can view a module
  canView: (moduleName) => {
    return permissionService.hasPermission(moduleName, 'view');
  },

  // Check if user can edit a module
  canEdit: (moduleName) => {
    return permissionService.hasPermission(moduleName, 'edit');
  },

  // Check if user can delete from a module
  canDelete: (moduleName) => {
    return permissionService.hasPermission(moduleName, 'delete');
  },

  // Check if user can download from a module
  canDownload: (moduleName) => {
    return permissionService.hasPermission(moduleName, 'download');
  },

  // Check if user can activate/deactivate in a module
  canActivate: (moduleName) => {
    return permissionService.hasPermission(moduleName, 'active');
  }
};
