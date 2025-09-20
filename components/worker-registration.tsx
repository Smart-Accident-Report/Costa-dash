"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Phone, Key, Building2, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import type { UserRole } from "@/types/agency"

interface WorkerRegistrationProps {
  onSuccess: () => void
  invitationToken?: string
}

export function WorkerRegistration({ onSuccess, invitationToken }: WorkerRegistrationProps) {
  const [activeTab, setActiveTab] = useState(invitationToken ? "invitation" : "agency-code")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agencyCode: "",
    role: "editor" as UserRole,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [agencyInfo, setAgencyInfo] = useState<{ name: string; verified: boolean } | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateAgencyCode = async (code: string) => {
    if (!code.trim()) return

    setIsLoading(true)
    try {
      // Mock API call to validate agency code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (code === "COSTA-ASSURANCE-A7B9") {
        setAgencyInfo({ name: "Costa Assurance", verified: true })
        setErrors((prev) => ({ ...prev, agencyCode: "" }))
      } else {
        setAgencyInfo(null)
        setErrors((prev) => ({ ...prev, agencyCode: "Code d'agence invalide" }))
      }
    } catch (error) {
      setAgencyInfo(null)
      setErrors((prev) => ({ ...prev, agencyCode: "Erreur lors de la vérification" }))
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Le nom complet est requis"
    if (!formData.email.trim()) newErrors.email = "L'email est requis"
    if (!formData.email.includes("@")) newErrors.email = "Email invalide"
    if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis"
    if (!formData.password) newErrors.password = "Le mot de passe est requis"
    if (formData.password.length < 6) newErrors.password = "Le mot de passe doit contenir au moins 6 caractères"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    if (activeTab === "agency-code") {
      if (!formData.agencyCode.trim()) newErrors.agencyCode = "Le code d'agence est requis"
      if (!agencyInfo?.verified) newErrors.agencyCode = "Code d'agence non vérifié"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Mock API call - in real app, this would create the worker account
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Worker registered:", formData)
      onSuccess()
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case "viewer":
        return "Peut consulter les données clients et constats"
      case "editor":
        return "Peut créer et modifier les constats et clients"
      case "manager":
        return "Peut valider les constats et approuver les réclamations"
      case "admin":
        return "Contrôle total du compte agence"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image src="/costa-logo.png" alt="Costa Logo" width={60} height={60} className="rounded-full" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Inscription Employé</CardTitle>
          <CardDescription>Rejoignez votre agence d'assurance sur Costa</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="agency-code" disabled={!!invitationToken}>
                Code d'agence
              </TabsTrigger>
              <TabsTrigger value="invitation">Invitation</TabsTrigger>
            </TabsList>

            <TabsContent value="agency-code" className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="agencyCode" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Code d'agence *
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="agencyCode"
                    value={formData.agencyCode}
                    onChange={(e) => handleInputChange("agencyCode", e.target.value)}
                    placeholder="COSTA-AGENCE-XXXX"
                    className={errors.agencyCode ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => validateAgencyCode(formData.agencyCode)}
                    disabled={isLoading || !formData.agencyCode.trim()}
                  >
                    Vérifier
                  </Button>
                </div>
                {errors.agencyCode && <p className="text-sm text-red-500">{errors.agencyCode}</p>}
                {agencyInfo?.verified && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    Agence trouvée: {agencyInfo.name}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="invitation" className="space-y-6 mt-6">
              {invitationToken ? (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Invitation validée</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">Vous avez été invité à rejoindre Costa Assurance</p>
                </div>
              ) : (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-700">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Invitation requise</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Vous devez être invité par un administrateur d'agence pour utiliser cette option
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nom complet *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Jean Dupont"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="jean.dupont@email.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Téléphone *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+33 6 12 34 56 78"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rôle souhaité</Label>
              <Select value={formData.role} onValueChange={(value: UserRole) => handleInputChange("role", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Visualiseur</SelectItem>
                  <SelectItem value="editor">Éditeur</SelectItem>
                  <SelectItem value="manager">Gestionnaire</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">{getRoleDescription(formData.role)}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Mot de passe *
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading || (activeTab === "agency-code" && !agencyInfo?.verified)}
            >
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
