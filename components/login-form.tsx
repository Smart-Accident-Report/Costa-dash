"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Building2, Users, Crown, Eye, Edit, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function LoginForm() {
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [userType, setUserType] = useState<"agency" | "worker">("agency")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password, userType)
    if (!success) {
      setError("Email ou mot de passe incorrect")
    }
  }

  const demoAccounts = [
    {
      role: "Admin",
      email: "admin@costa.com",
      password: "admin123",
      description: "Accès complet à l'agence",
      icon: Crown,
      color: "bg-purple-100 text-purple-800",
    },
    {
      role: "Manager",
      email: "manager@costa.com",
      password: "manager123",
      description: "Gestion d'équipe et rapports",
      icon: Settings,
      color: "bg-blue-100 text-blue-800",
    },
    {
      role: "Editor",
      email: "editor@costa.com",
      password: "editor123",
      description: "Édition des rapports assignés",
      icon: Edit,
      color: "bg-green-100 text-green-800",
    },
    {
      role: "Viewer",
      email: "viewer@costa.com",
      password: "viewer123",
      description: "Consultation des rapports",
      icon: Eye,
      color: "bg-gray-100 text-gray-800",
    },
  ]

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-3">
              <Image src="/costa-logo.png" alt="Costa Logo" width={40} height={40} className="h-10 w-10" />
              <span className="text-2xl font-bold">costa-dash</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>Connectez-vous à votre tableau de bord costa-dash</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={userType} onValueChange={(value) => setUserType(value as "agency" | "worker")} className="mb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="agency" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Agence
              </TabsTrigger>
              <TabsTrigger value="worker" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Employé
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={userType === "agency" ? "admin@costa.com" : "worker@costa.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder={userType === "agency" ? "admin123" : "worker123"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="text-center text-sm font-medium text-muted-foreground">Comptes de démonstration</div>
            <div className="grid gap-2">
              {demoAccounts.map((account) => {
                const IconComponent = account.icon
                return (
                  <button
                    key={account.role}
                    onClick={() => handleDemoLogin(account.email, account.password)}
                    className="w-full p-3 text-left border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{account.role}</span>
                            <Badge className={account.color} variant="secondary">
                              {account.role}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{account.description}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6 text-center space-y-2">
            <div className="text-sm text-muted-foreground">Pas encore de compte ?</div>
            <div className="flex gap-2 justify-center">
              <Link href="/register/agency">
                <Button variant="outline" size="sm">
                  <Building2 className="h-4 w-4 mr-2" />
                  Créer une agence
                </Button>
              </Link>
              <Link href="/register/worker">
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Rejoindre une agence
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
