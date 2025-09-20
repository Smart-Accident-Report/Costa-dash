"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { AuthUser } from "@/types/agency"
import { hasPermission, hasAnyPermission, type Permission } from "@/lib/permissions"
import type { UserRole } from "@/types/agency"

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string, userType?: "agency" | "worker") => Promise<boolean>
  logout: () => void
  isLoading: boolean
  switchAgency: (agencyId: string) => Promise<boolean>
  refreshUserData: () => Promise<void>
  hasPermission: (permission: Permission) => boolean
  hasAnyPermission: (permissions: Permission[]) => boolean
  canAccess: (resource: string, action: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("costa-user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        if (parsedUser.agency && parsedUser.role) {
          setUser(parsedUser)
        } else {
          // Clear invalid user data
          localStorage.removeItem("costa-user")
        }
      } catch (error) {
        console.error("[v0] Error parsing saved user data:", error)
        localStorage.removeItem("costa-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, userType: "agency" | "worker" = "agency"): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Mock authentication - in real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUsers = [
        // Agency Admin
        {
          email: "admin@costa.com",
          password: "admin123",
          userData: {
            id: "USR-001",
            name: "Marie Dubois",
            email: "admin@costa.com",
            role: "Admin",
            avatar: "/costa-logo.png",
            agency: {
              id: "AGY-001",
              name: "Costa Insurance HQ",
              businessRegistrationNumber: "123456789",
              email: "admin@costa.com",
              phone: "+33 1 23 45 67 89",
              country: "france",
              region: "Île-de-France",
              agencyCode: "COSTA-HQ-2024",
              createdAt: "2023-06-15T00:00:00Z",
              subscription: "premium",
            },
            isAgencyAdmin: true,
            department: "IT Administration",
            permissions: ["view_all", "edit_all", "delete_all", "manage_users", "admin_access"],
            joinedDate: "2023-06-15",
            lastLogin: new Date().toISOString(),
          } as AuthUser,
        },
        // Manager
        {
          email: "manager@costa.com",
          password: "manager123",
          userData: {
            id: "USR-002",
            name: "Pierre Leroy",
            email: "manager@costa.com",
            role: "Manager",
            avatar: "/costa-logo.png",
            agency: {
              id: "AGY-001",
              name: "Costa Insurance HQ",
              businessRegistrationNumber: "123456789",
              email: "admin@costa.com",
              phone: "+33 1 23 45 67 89",
              country: "france",
              region: "Île-de-France",
              agencyCode: "COSTA-HQ-2024",
              createdAt: "2023-06-15T00:00:00Z",
              subscription: "premium",
            },
            isAgencyAdmin: false,
            department: "Claims Processing",
            permissions: ["view_all", "edit_all", "manage_team"],
            joinedDate: "2023-08-22",
            lastLogin: new Date().toISOString(),
          } as AuthUser,
        },
        // Editor
        {
          email: "editor@costa.com",
          password: "editor123",
          userData: {
            id: "USR-003",
            name: "Sophie Martin",
            email: "editor@costa.com",
            role: "Editor",
            avatar: "/costa-logo.png",
            agency: {
              id: "AGY-001",
              name: "Costa Insurance HQ",
              businessRegistrationNumber: "123456789",
              email: "admin@costa.com",
              phone: "+33 1 23 45 67 89",
              country: "france",
              region: "Île-de-France",
              agencyCode: "COSTA-HQ-2024",
              createdAt: "2023-06-15T00:00:00Z",
              subscription: "premium",
            },
            isAgencyAdmin: false,
            department: "Quality Assurance",
            permissions: ["view_all", "edit_assigned"],
            joinedDate: "2023-09-10",
            lastLogin: new Date().toISOString(),
          } as AuthUser,
        },
        // Viewer
        {
          email: "viewer@costa.com",
          password: "viewer123",
          userData: {
            id: "USR-004",
            name: "Jean Moreau",
            email: "viewer@costa.com",
            role: "Viewer",
            avatar: "/costa-logo.png",
            agency: {
              id: "AGY-001",
              name: "Costa Insurance HQ",
              businessRegistrationNumber: "123456789",
              email: "admin@costa.com",
              phone: "+33 1 23 45 67 89",
              country: "france",
              region: "Île-de-France",
              agencyCode: "COSTA-HQ-2024",
              createdAt: "2023-06-15T00:00:00Z",
              subscription: "premium",
            },
            isAgencyAdmin: false,
            department: "Customer Service",
            permissions: ["view_assigned"],
            joinedDate: "2023-11-05",
            lastLogin: new Date().toISOString(),
          } as AuthUser,
        },
      ]

      const matchedUser = mockUsers.find((u) => u.email === email && u.password === password)

      if (matchedUser) {
        console.log(
          "[v0] User authenticated successfully:",
          matchedUser.userData.name,
          "Role:",
          matchedUser.userData.role,
        )
        setUser(matchedUser.userData)
        localStorage.setItem("costa-user", JSON.stringify(matchedUser.userData))
        setIsLoading(false)
        return true
      }

      console.log("[v0] Authentication failed for email:", email)
      setIsLoading(false)
      return false
    } catch (error) {
      console.error("[v0] Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  const switchAgency = async (agencyId: string): Promise<boolean> => {
    if (!user) return false

    setIsLoading(true)

    try {
      // Mock API call to switch agency context
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In a real app, this would fetch the user's role and permissions for the new agency
      console.log("[v0] Switching to agency:", agencyId)

      // Update user context with new agency
      const updatedUser = {
        ...user,
        agency: {
          ...user.agency,
          id: agencyId,
        },
      }

      setUser(updatedUser)
      localStorage.setItem("costa-user", JSON.stringify(updatedUser))
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("[v0] Agency switch error:", error)
      setIsLoading(false)
      return false
    }
  }

  const refreshUserData = async (): Promise<void> => {
    if (!user) return

    try {
      // Mock API call to refresh user data
      await new Promise((resolve) => setTimeout(resolve, 300))

      console.log("[v0] Refreshing user data for:", user.name)

      // In a real app, this would fetch updated user data from the server
      const refreshedUser = {
        ...user,
        lastLogin: new Date().toISOString(),
      }

      setUser(refreshedUser)
      localStorage.setItem("costa-user", JSON.stringify(refreshedUser))
    } catch (error) {
      console.error("[v0] User data refresh error:", error)
    }
  }

  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false
    const userRole = (user.role?.toLowerCase() as UserRole) || "viewer"
    return hasPermission(userRole, permission)
  }

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false
    const userRole = (user.role?.toLowerCase() as UserRole) || "viewer"
    return hasAnyPermission(userRole, permissions)
  }

  const canAccess = (resource: string, action: string): boolean => {
    if (!user) return false
    return checkPermission({ resource, action })
  }

  const logout = () => {
    console.log("[v0] User logged out:", user?.name)
    setUser(null)
    localStorage.removeItem("costa-user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        switchAgency,
        refreshUserData,
        hasPermission: checkPermission,
        hasAnyPermission: checkAnyPermission,
        canAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
