"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, AlertTriangle, Clock } from "lucide-react"

// Mock accident data for Algeria
const accidentData = [
  {
    id: "CST-2024-001",
    location: "Alger Centre",
    coordinates: { lat: 36.7538, lng: 3.0588 },
    severity: "minor",
    date: "2024-01-15",
    time: "14:30",
    status: "pending",
  },
  {
    id: "CST-2024-002",
    location: "Oran",
    coordinates: { lat: 35.6969, lng: -0.6331 },
    severity: "moderate",
    date: "2024-01-14",
    time: "09:15",
    status: "validated",
  },
  {
    id: "CST-2024-003",
    location: "Constantine",
    coordinates: { lat: 36.3650, lng: 6.6147 },
    severity: "minor",
    date: "2024-01-14",
    time: "16:45",
    status: "draft",
  },
  {
    id: "CST-2024-004",
    location: "Annaba",
    coordinates: { lat: 36.9000, lng: 7.7500 },
    severity: "major",
    date: "2024-01-13",
    time: "11:20",
    status: "closed",
  },
  {
    id: "CST-2024-005",
    location: "Blida",
    coordinates: { lat: 36.4700, lng: 2.8300 },
    severity: "minor",
    date: "2024-01-12",
    time: "18:00",
    status: "pending",
  },
]

const severityColors = {
  minor: "bg-yellow-100 text-yellow-800",
  moderate: "bg-orange-100 text-orange-800",
  major: "bg-red-100 text-red-800",
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  validated: "bg-green-100 text-green-800",
  draft: "bg-gray-100 text-gray-800",
  closed: "bg-blue-100 text-blue-800",
}

export function AccidentMap() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Accident Map
        </CardTitle>
        <CardDescription className="text-xs">
          Recent accidents across Algeria
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3">
        {/* Simple map representation */}
        <div className="relative bg-gray-50 rounded-lg h-32 mb-3 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
            {/* Algeria outline representation */}
            <div className="absolute top-2 left-4 w-16 h-20 bg-gray-200 rounded-sm opacity-30"></div>
            
            {/* Accident markers */}
            {accidentData.map((accident, index) => {
              const positions = [
                { top: "20%", left: "25%" }, // Alger
                { top: "35%", left: "15%" }, // Oran
                { top: "45%", left: "30%" }, // Constantine
                { top: "50%", left: "35%" }, // Annaba
                { top: "40%", left: "20%" }, // Blida
              ]
              
              const position = positions[index] || { top: "50%", left: "50%" }
              
              return (
                <div
                  key={accident.id}
                  className={`absolute w-3 h-3 rounded-full border-2 border-white ${
                    accident.severity === "major" 
                      ? "bg-red-500" 
                      : accident.severity === "moderate"
                      ? "bg-orange-500"
                      : "bg-yellow-500"
                  }`}
                  style={position}
                  title={`${accident.location} - ${accident.severity}`}
                />
              )
            })}
          </div>
        </div>
        
        {/* Accident list */}
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {accidentData.slice(0, 3).map((accident) => (
            <div key={accident.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  accident.severity === "major" 
                    ? "bg-red-500" 
                    : accident.severity === "moderate"
                    ? "bg-orange-500"
                    : "bg-yellow-500"
                }`} />
                <span className="font-medium truncate">{accident.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Badge 
                  variant="secondary" 
                  className={`text-xs px-1 py-0 ${severityColors[accident.severity as keyof typeof severityColors]}`}
                >
                  {accident.severity}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary stats */}
        <div className="mt-3 pt-2 border-t border-gray-200">
          <div className="flex justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              <span>Total: {accidentData.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Last 7 days</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
