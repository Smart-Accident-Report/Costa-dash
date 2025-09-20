"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { WorkerRegistration } from "@/components/worker-registration"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function WorkerRegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const invitationToken = searchParams.get("token")

  const handleRegistrationSuccess = () => {
    setIsRegistered(true)
  }

  const goToLogin = () => {
    router.push("/")
  }

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Inscription réussie!</CardTitle>
            <CardDescription>Votre compte employé a été créé avec succès</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                Votre compte est en attente d'approbation par l'administrateur de votre agence. Vous recevrez un email
                de confirmation une fois votre compte activé.
              </p>
            </div>

            <Button onClick={goToLogin} className="w-full bg-blue-600 hover:bg-blue-700">
              Retour à la connexion
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <WorkerRegistration onSuccess={handleRegistrationSuccess} invitationToken={invitationToken || undefined} />
}
