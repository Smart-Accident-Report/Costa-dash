"use client"

import { useAuth } from "@/contexts/auth-context"
import { hasPermission, hasAnyPermission, hasAllPermissions, type Permission } from "@/lib/permissions"
import type { UserRole } from "@/types/agency"

export function usePermissions(roleOverride?: UserRole) {
  const { user } = useAuth()
  const userRole = roleOverride || (user?.role?.toLowerCase() as UserRole) || "viewer"

  return {
    hasPermission: (permission: Permission) => hasPermission(userRole, permission),
    hasAnyPermission: (permissions: Permission[]) => hasAnyPermission(userRole, permissions),
    hasAllPermissions: (permissions: Permission[]) => hasAllPermissions(userRole, permissions),
    userRole,
    isAdmin: userRole === "admin",
    isManager: userRole === "manager" || userRole === "admin",
    isEditor: ["editor", "manager", "admin"].includes(userRole),
    isViewer: ["viewer", "editor", "manager", "admin"].includes(userRole),
    canAccess: (resource: string, action: string) => hasPermission(userRole, { resource, action }),
  }
}
