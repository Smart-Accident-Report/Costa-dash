"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { LoginForm } from "./login-form"

type AuthMode = "selection" | "agency-login" | "worker-login"

export function AuthSelection() {
  const [mode, setMode] = useState<AuthMode>("selection")

  if (mode === "agency-login" || mode === "worker-login") {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => setMode("selection")} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <LoginForm userType={mode === "agency-login" ? "agency" : "worker"} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Image src="/costa-logo.png" alt="Costa Logo" width={80} height={80} className="mx-auto mb-4 rounded-full" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">costa-dash</h1>
          <p className="text-gray-600">Choisissez votre type de connexion</p>
        </div>

        <div className="grid gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setMode("agency-login")}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Building2 className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle className="text-xl">Administrateur d'agence</CardTitle>
              <CardDescription>Connectez-vous en tant qu'administrateur de votre agence d'assurance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700">Connexion Agence</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setMode("worker-login")}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Employé / Agent</CardTitle>
              <CardDescription>Connectez-vous en tant qu'employé ou agent d'assurance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Connexion Employé</Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Pas encore inscrit?{" "}
            <a href="/register/agency" className="text-green-600 hover:underline font-medium">
              Créer une agence
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
