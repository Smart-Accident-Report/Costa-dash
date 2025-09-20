"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AgencyRegistration } from "@/components/agency-registration"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Copy } from "lucide-react"
import { toast } from "sonner"

export default function AgencyRegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false)
  const [agencyCode] = useState("COSTA-ASSURANCE-A7B9") // This would come from the registration response
  const router = useRouter()

  const handleRegistrationSuccess = () => {
    setIsRegistered(true)
  }

  const copyAgencyCode = () => {
    navigator.clipboard.writeText(agencyCode)
    toast.success("Code d'agence copié!")
  }

  const goToLogin = () => {
    router.push("/")
  }

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Agence créée avec succès!</CardTitle>
            <CardDescription>Votre espace Costa est maintenant prêt</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Votre code d'agence:</p>
              <div className="flex items-center justify-between bg-white p-3 rounded border">
                <code className="font-mono text-lg font-semibold text-green-600">{agencyCode}</code>
                <Button variant="ghost" size="sm" onClick={copyAgencyCode} className="ml-2">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Partagez ce code avec vos employés pour qu'ils puissent rejoindre votre agence
              </p>
            </div>

            <Button onClick={goToLogin} className="w-full bg-green-600 hover:bg-green-700">
              Accéder au tableau de bord
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <AgencyRegistration onSuccess={handleRegistrationSuccess} />
}
