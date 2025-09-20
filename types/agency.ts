export interface Agency {
  id: string
  name: string
  businessRegistrationNumber?: string
  email: string
  phone: string
  country: string
  region: string
  logo?: string
  agencyCode: string
  createdAt: string
  subscription: "free" | "monthly" | "annual"
}

export interface Worker {
  id: string
  name: string
  email: string
  phone: string
  role: "viewer" | "editor" | "manager" | "admin"
  agencyId: string
  avatar?: string
  createdAt: string
  isActive: boolean
}

export type UserRole = "viewer" | "editor" | "manager" | "admin"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  agency: Agency
  isAgencyAdmin: boolean
}
