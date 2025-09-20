"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Filter, Eye, Edit, FileText, Calendar, MapPin, Users } from "lucide-react"

// Mock data for constats
const mockConstats = [
  {
    id: "CST-2024-001",
    date: "2024-01-15",
    time: "14:30",
    location: "Boulevard Mohamed V, Alger Centre",
    clients: ["Ahmed Benali", "Fatima Khelil"],
    status: "pending",
    severity: "minor",
    vehicleCount: 2,
    description: "Collision arrière lors d'un freinage d'urgence",
  },
  {
    id: "CST-2024-002",
    date: "2024-01-14",
    time: "09:15",
    location: "Place des Martyrs, Oran",
    clients: ["Omar Bouziane", "Nour El Houda"],
    status: "validated",
    severity: "moderate",
    vehicleCount: 2,
    description: "Accrochage lors d'un changement de voie",
  },
  {
    id: "CST-2024-003",
    date: "2024-01-14",
    time: "16:45",
    location: "Avenue de l'ANP, Constantine",
    clients: ["Karim Saadi"],
    status: "draft",
    severity: "minor",
    vehicleCount: 1,
    description: "Dommages causés par un obstacle sur la chaussée",
  },
  {
    id: "CST-2024-004",
    date: "2024-01-13",
    time: "11:20",
    location: "Rue de la République, Annaba",
    clients: ["Yasmine Boudjema", "Tarek Meziane"],
    status: "closed",
    severity: "major",
    vehicleCount: 2,
    description: "Collision frontale à un carrefour",
  },
  {
    id: "CST-2024-005",
    date: "2024-01-12",
    time: "18:00",
    location: "Boulevard Zighout Youcef, Blida",
    clients: ["Lamine Cherif"],
    status: "pending",
    severity: "minor",
    vehicleCount: 1,
    description: "Rayure sur véhicule stationné",
  },
]

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  validated: "bg-green-100 text-green-800",
  closed: "bg-blue-100 text-blue-800",
}

const severityColors = {
  minor: "bg-green-100 text-green-800",
  moderate: "bg-yellow-100 text-yellow-800",
  major: "bg-red-100 text-red-800",
}

export default function ConstatsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [selectedConstat, setSelectedConstat] = useState<(typeof mockConstats)[0] | null>(null)

  const filteredConstats = mockConstats.filter((constat) => {
    const matchesSearch =
      constat.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      constat.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      constat.clients.some((client) => client.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || constat.status === statusFilter
    const matchesSeverity = severityFilter === "all" || constat.severity === severityFilter

    return matchesSearch && matchesStatus && matchesSeverity
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Constats Amiables</h2>
          <p className="text-muted-foreground">Manage accident reports and documentation</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Constat
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, location, or client name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="validated">Validated</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="minor">Minor</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="major">Major</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Constats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Accident Reports ({filteredConstats.length})</CardTitle>
          <CardDescription>Complete list of constats with status and details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Clients</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConstats.map((constat) => (
                  <TableRow key={constat.id}>
                    <TableCell className="font-medium">{constat.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm">{constat.date}</div>
                          <div className="text-xs text-muted-foreground">{constat.time}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{constat.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          {constat.clients.map((client, index) => (
                            <div key={index} className="text-sm">
                              {client}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[constat.status as keyof typeof statusColors]}>
                        {constat.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={severityColors[constat.severity as keyof typeof severityColors]}>
                        {constat.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedConstat(constat)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Constat Details - {selectedConstat?.id}</DialogTitle>
                              <DialogDescription>Complete information about this accident report</DialogDescription>
                            </DialogHeader>
                            {selectedConstat && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Date & Time</label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedConstat.date} at {selectedConstat.time}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <div className="mt-1">
                                      <Badge
                                        className={statusColors[selectedConstat.status as keyof typeof statusColors]}
                                      >
                                        {selectedConstat.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Severity</label>
                                    <div className="mt-1">
                                      <Badge
                                        className={
                                          severityColors[selectedConstat.severity as keyof typeof severityColors]
                                        }
                                      >
                                        {selectedConstat.severity}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Vehicles Involved</label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedConstat.vehicleCount} vehicle(s)
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Location</label>
                                  <p className="text-sm text-muted-foreground">{selectedConstat.location}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Involved Clients</label>
                                  <div className="mt-1 space-y-1">
                                    {selectedConstat.clients.map((client, index) => (
                                      <p key={index} className="text-sm text-muted-foreground">
                                        {client}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Description</label>
                                  <p className="text-sm text-muted-foreground">{selectedConstat.description}</p>
                                </div>
                                <div className="flex gap-2 pt-4">
                                  <Button>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Constat
                                  </Button>
                                  <Button variant="outline">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Generate Report
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Constats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockConstats.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockConstats.filter((c) => c.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Validated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockConstats.filter((c) => c.status === "validated").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Closed Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockConstats.filter((c) => c.status === "closed").length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
