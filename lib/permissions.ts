import type { UserRole } from "@/types/agency"

export interface Permission {
  resource: string
  action: string
}

export const PERMISSIONS = {
  // Client management
  CLIENTS_VIEW: { resource: "clients", action: "view" },
  CLIENTS_CREATE: { resource: "clients", action: "create" },
  CLIENTS_EDIT: { resource: "clients", action: "edit" },
  CLIENTS_DELETE: { resource: "clients", action: "delete" },

  // Constat management
  CONSTATS_VIEW: { resource: "constats", action: "view" },
  CONSTATS_CREATE: { resource: "constats", action: "create" },
  CONSTATS_EDIT: { resource: "constats", action: "edit" },
  CONSTATS_DELETE: { resource: "constats", action: "delete" },
  CONSTATS_VALIDATE: { resource: "constats", action: "validate" },
  CONSTATS_APPROVE: { resource: "constats", action: "approve" },

  // Agency management
  AGENCY_VIEW: { resource: "agency", action: "view" },
  AGENCY_EDIT: { resource: "agency", action: "edit" },
  AGENCY_WORKERS_VIEW: { resource: "agency", action: "workers_view" },
  AGENCY_WORKERS_MANAGE: { resource: "agency", action: "workers_manage" },
  AGENCY_SETTINGS: { resource: "agency", action: "settings" },

  // Reports and analytics
  REPORTS_VIEW: { resource: "reports", action: "view" },
  REPORTS_EXPORT: { resource: "reports", action: "export" },
  ANALYTICS_VIEW: { resource: "analytics", action: "view" },
} as const

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  viewer: [PERMISSIONS.CLIENTS_VIEW, PERMISSIONS.CONSTATS_VIEW, PERMISSIONS.REPORTS_VIEW],
  editor: [
    PERMISSIONS.CLIENTS_VIEW,
    PERMISSIONS.CLIENTS_CREATE,
    PERMISSIONS.CLIENTS_EDIT,
    PERMISSIONS.CONSTATS_VIEW,
    PERMISSIONS.CONSTATS_CREATE,
    PERMISSIONS.CONSTATS_EDIT,
    PERMISSIONS.REPORTS_VIEW,
  ],
  manager: [
    PERMISSIONS.CLIENTS_VIEW,
    PERMISSIONS.CLIENTS_CREATE,
    PERMISSIONS.CLIENTS_EDIT,
    PERMISSIONS.CONSTATS_VIEW,
    PERMISSIONS.CONSTATS_CREATE,
    PERMISSIONS.CONSTATS_EDIT,
    PERMISSIONS.CONSTATS_VALIDATE,
    PERMISSIONS.CONSTATS_APPROVE,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.AGENCY_VIEW,
    PERMISSIONS.AGENCY_WORKERS_VIEW,
  ],
  admin: [
    // Admin has all permissions
    ...Object.values(PERMISSIONS),
  ],
}

export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || []
  return rolePermissions.some((p) => p.resource === permission.resource && p.action === permission.action)
}

export function hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(userRole, permission))
}

export function hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(userRole, permission))
}

export function getRoleDisplayName(role: UserRole): string {
  const roleNames = {
    viewer: "Visualiseur",
    editor: "Éditeur",
    manager: "Gestionnaire",
    admin: "Administrateur",
  }
  return roleNames[role] || role
}

export function getRoleDescription(role: UserRole): string {
  const descriptions = {
    viewer: "Peut consulter les données clients et constats",
    editor: "Peut créer et modifier les constats et clients",
    manager: "Peut valider les constats et approuver les réclamations",
    admin: "Contrôle total du compte agence",
  }
  return descriptions[role] || ""
}

export function getRoleBadgeColor(role: UserRole): string {
  const colors = {
    viewer: "bg-gray-100 text-gray-800",
    editor: "bg-blue-100 text-blue-800",
    manager: "bg-orange-100 text-orange-800",
    admin: "bg-green-100 text-green-800",
  }
  return colors[role] || "bg-gray-100 text-gray-800"
}
