"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

const kpiData = [
  {
    title: "Nbr. total d'utilisateurs",
    value: "1,234",
    change: "+12.5%",
    trend: "up",
    subtitle: "Tendance en hausse ce mois-ci",
    additional: "Inscrits aujourd'hui: 32",
  },
  {
    title: "Nbr. total de scan",
    value: "22,670",
    change: "+32.8%",
    trend: "up",
    subtitle: "Tendance en hausse ce mois-ci",
    additional: "Nbr. de Scan aujourd'hui: 240",
  },
  {
    title: "Campagnes créées",
    value: "24",
    change: "-30%",
    trend: "down",
    subtitle: "Tendance en baisse ce mois-ci",
    additional: "Campagnes actives: 14",
  },
  {
    title: "Nbr. total de clients",
    value: "32",
    change: "-22%",
    trend: "down",
    subtitle: "Tendance en baisse ce mois-ci",
    additional: "Clients Actifs: 26",
  },
]

const inscriptionsData = [
  { day: "Juin 1", inscriptions: 8 },
  { day: "Juin 3", inscriptions: 12 },
  { day: "Juin 5", inscriptions: 18 },
  { day: "Juin 7", inscriptions: 14 },
  { day: "Juin 9", inscriptions: 22 },
  { day: "Juin 11", inscriptions: 10 },
  { day: "Juin 13", inscriptions: 6 },
  { day: "Juin 15", inscriptions: 16 },
  { day: "Juin 17", inscriptions: 19 },
  { day: "Juin 19", inscriptions: 24 },
  { day: "Juin 21", inscriptions: 28 },
  { day: "Juin 23", inscriptions: 20 },
  { day: "Juin 25", inscriptions: 9 },
  { day: "Juin 27", inscriptions: 15 },
  { day: "Juin 30", inscriptions: 21 },
]

const projetsData = [
  { name: "AnyPub", value: 12, color: "#ec4899" },
  { name: "AnyPub+", value: 8, color: "#eab308" },
  { name: "AnyShop", value: 10, color: "#22c55e" },
  { name: "AnyDoc", value: 4, color: "#a855f7" },
]

const projetsActifsData = [
  { name: "AnyPub", value: 12, color: "#ec4899" },
  { name: "AnyPub+", value: 10, color: "#eab308" },
  { name: "AnyShop", value: 8, color: "#22c55e" },
  { name: "AnyDoc", value: 4, color: "#a855f7" },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30derniersjours")

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive accident statistics and insights</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30derniersjours">30 derniers jours</SelectItem>
            <SelectItem value="3derniersmois">3 derniers mois</SelectItem>
            <SelectItem value="6derniersmois">6 derniers mois</SelectItem>
            <SelectItem value="12derniersmois">12 derniers mois</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{kpi.title}</span>
                <div className="flex items-center gap-1">
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {kpi.change}
                  </span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</div>
              <div className="text-xs text-gray-500 mb-3">{kpi.subtitle}</div>
              <div className="text-xs text-gray-600 font-medium">{kpi.additional}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Analytique des inscriptions</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Total d'inscriptions des 30 derniers jours
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                3 derniers mois
              </Badge>
              <Badge className="bg-pink-500 text-white text-xs">30 derniers jours</Badge>
              <Badge variant="outline" className="text-xs">
                7 derniers jours
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inscriptionsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="inscriptions" fill="#ec4899" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Nombre total de projets</CardTitle>
            <CardDescription className="text-sm text-gray-600">Juin 2025 - Juin 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={projetsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {projetsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-900">34</span>
                <span className="text-sm text-gray-600">Projets</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">En hausse de 12.5 % ce mois-ci</span>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Affichage du nombre total de visiteurs sur les 12 derniers mois.
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Nombre total de projets actifs - mixed
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">Juin 2025 - Juin 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projetsActifsData.map((projet, index) => (
                <div key={projet.name} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-16">{projet.name}</span>
                  <div className="flex-1 relative">
                    <div className="h-8 rounded-md overflow-hidden" style={{ backgroundColor: projet.color }}>
                      <div className="h-full flex items-center justify-end pr-3">
                        {index === 0 && (
                          <div className="flex items-center gap-2 text-white text-xs">
                            <span className="bg-white bg-opacity-20 px-2 py-1 rounded">AnyPub</span>
                            <span className="font-medium">12</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm mt-4">
              <span className="text-gray-600">En hausse de 12.5 % ce mois-ci</span>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Affichage du nombre total de visiteurs sur les 12 derniers mois.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
