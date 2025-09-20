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
import { Plus, Search, Filter, Eye, Edit, FileText, Calendar, MapPin, Car } from "lucide-react"
import Accident3DViewer from "@/components/accident-3d-viewer"

const mockConstats = [
  {
    id: "CNS-2024-001",
    date: "2024-01-15",
    time: "10:30",
    location: "Rue Didouche Mourad, Alger",
    region: "Alger",
    carBrand: "Renault",
    accidentCause: "Rear-end collision",
    damageAmount: 150000.0,
    status: "validated",
    severity: "moderate",
    vehicleCount: 2,
    description: "Collision arrière lors d'un freinage d'urgence",
  },
  {
    id: "CNS-2024-002",
    date: "2024-01-18",
    time: "14:45",
    location: "Boulevard de l'ANP, Oran",
    region: "Oran",
    carBrand: "Peugeot",
    accidentCause: "Side impact",
    damageAmount: 220000.0,
    status: "validated",
    severity: "major",
    vehicleCount: 2,
    description: "Impact latéral à un carrefour",
  },
  {
    id: "CNS-2024-003",
    date: "2024-01-22",
    time: "09:15",
    location: "Route de Batna, Sétif",
    region: "Sétif",
    carBrand: "Dacia",
    accidentCause: "Intersection collision",
    damageAmount: 85000.0,
    status: "pending",
    severity: "minor",
    vehicleCount: 2,
    description: "Collision à l'intersection",
  },
  {
    id: "CNS-2024-004",
    date: "2024-01-25",
    time: "16:20",
    location: "Avenue de l'ALN, Constantine",
    region: "Constantine",
    carBrand: "Toyota",
    accidentCause: "Lane change accident",
    damageAmount: 120000.0,
    status: "validated",
    severity: "moderate",
    vehicleCount: 2,
    description: "Accident lors d'un changement de voie",
  },
  {
    id: "CNS-2024-005",
    date: "2024-02-03",
    time: "11:00",
    location: "Boulevard Colonel Amirouche, Alger",
    region: "Alger",
    carBrand: "Volkswagen",
    accidentCause: "Parking lot collision",
    damageAmount: 55000.0,
    status: "validated",
    severity: "minor",
    vehicleCount: 2,
    description: "Collision dans un parking",
  },
  {
    id: "CNS-2024-006",
    date: "2024-02-08",
    time: "13:30",
    location: "Rue Larbi Ben M'hidi, Oran",
    region: "Oran",
    carBrand: "Renault",
    accidentCause: "Weather-related accident",
    damageAmount: 180000.0,
    status: "validated",
    severity: "major",
    vehicleCount: 1,
    description: "Accident lié aux conditions météorologiques",
  },
  {
    id: "CNS-2024-007",
    date: "2024-02-12",
    time: "15:45",
    location: "Route de Khemis, Tizi Ouzou",
    region: "Tizi Ouzou",
    carBrand: "Ford",
    accidentCause: "Mechanical failure",
    damageAmount: 250000.0,
    status: "rejected",
    severity: "major",
    vehicleCount: 1,
    description: "Panne mécanique ayant causé l'accident",
  },
  {
    id: "CNS-2024-008",
    date: "2024-02-20",
    time: "08:30",
    location: "Avenue des Martyrs, Béjaïa",
    region: "Béjaïa",
    carBrand: "Hyundai",
    accidentCause: "Distracted driving",
    damageAmount: 98000.0,
    status: "validated",
    severity: "moderate",
    vehicleCount: 2,
    description: "Conduite distraite",
  },
  {
    id: "CNS-2024-009",
    date: "2024-03-05",
    time: "12:15",
    location: "Boulevard du 1er Novembre, Annaba",
    region: "Annaba",
    carBrand: "Peugeot",
    accidentCause: "Speeding",
    damageAmount: 165000.0,
    status: "validated",
    severity: "major",
    vehicleCount: 2,
    description: "Excès de vitesse",
  },
  {
    id: "CNS-2024-010",
    date: "2024-03-10",
    time: "17:00",
    location: "Avenue de l'Indépendance, Oran",
    region: "Oran",
    carBrand: "Dacia",
    accidentCause: "Rear-end collision",
    damageAmount: 72000.0,
    status: "pending",
    severity: "minor",
    vehicleCount: 2,
    description: "Collision arrière",
  },
  {
    id: "CNS-2024-011",
    date: "2024-03-15",
    time: "10:45",
    location: "Route de Médéa, Blida",
    region: "Blida",
    carBrand: "Toyota",
    accidentCause: "Side impact",
    damageAmount: 135000.0,
    status: "validated",
    severity: "moderate",
    vehicleCount: 2,
    description: "Impact latéral",
  },
  {
    id: "CNS-2024-012",
    date: "2024-03-22",
    time: "14:20",
    location: "Avenue Aïssat Idir, Constantine",
    region: "Constantine",
    carBrand: "Renault",
    accidentCause: "Intersection collision",
    damageAmount: 110000.0,
    status: "validated",
    severity: "moderate",
    vehicleCount: 2,
    description: "Collision à l'intersection",
  },
  {
    id: "CNS-2024-013",
    date: "2024-04-02",
    time: "09:30",
    location: "Rue Abane Ramdane, Alger",
    region: "Alger",
    carBrand: "Volkswagen",
    accidentCause: "Lane change accident",
    damageAmount: 142000.0,
    status: "validated",
    severity: "moderate",
    vehicleCount: 2,
    description: "Accident lors d'un changement de voie",
  },
  {
    id: "CNS-2024-014",
    date: "2024-04-08",
    time: "16:15",
    location: "Boulevard Krim Belkacem, Tizi Ouzou",
    region: "Tizi Ouzou",
    carBrand: "Ford",
    accidentCause: "Distracted driving",
    damageAmount: 195000.0,
    status: "validated",
    severity: "major",
    vehicleCount: 2,
    description: "Conduite distraite",
  },
  {
    id: "CNS-2024-015",
    date: "2024-04-12",
    time: "11:45",
    location: "Route de Skikda, Annaba",
    region: "Annaba",
    carBrand: "Hyundai",
    accidentCause: "Weather-related accident",
    damageAmount: 68000.0,
    status: "pending",
    severity: "minor",
    vehicleCount: 1,
    description: "Accident lié aux conditions météorologiques",
  },
  {
    id: "CNS-2024-016",
    date: "2024-04-18",
    time: "13:00",
    location: "Rue Emir Abdelkader, Sétif",
    region: "Sétif",
    carBrand: "Peugeot",
    accidentCause: "Rear-end collision",
    damageAmount: 105000.0,
    status: "validated",
    severity: "moderate",
    vehicleCount: 2,
    description: "Collision arrière",
  },
  {
    id: "CNS-2024-017",
    date: "2024-05-03",
    time: "15:30",
    location: "Avenue Mohamed Boudiaf, Blida",
    region: "Blida",
    carBrand: "Dacia",
    accidentCause: "Parking lot collision",
    damageAmount: 45000.0,
    status: "validated",
    severity: "minor",
    vehicleCount: 2,
    description: "Collision dans un parking",
  },
  {
    id: "CNS-2024-018",
    date: "2024-05-10",
    time: "08:45",
    location: "Boulevard Houari Boumediene, Oran",
    region: "Oran",
    carBrand: "Toyota",
    accidentCause: "Side impact",
    damageAmount: 178000.0,
    status: "validated",
    severity: "major",
    vehicleCount: 2,
    description: "Impact latéral",
  },
  {
    id: "CNS-2024-019",
    date: "2024-05-15",
    time: "12:30",
    location: "Route de Batna, Constantine",
    region: "Constantine",
    carBrand: "Renault",
    accidentCause: "Speeding",
    damageAmount: 210000.0,
    status: "validated",
    severity: "major",
    vehicleCount: 2,
    description: "Excès de vitesse",
  },
  {
    id: "CNS-2024-020",
    date: "2024-05-22",
    time: "14:15",
    location: "Rue de la Révolution, Béjaïa",
    region: "Béjaïa",
    carBrand: "Volkswagen",
    accidentCause: "Mechanical failure",
    damageAmount: 89000.0,
    status: "pending",
    severity: "moderate",
    vehicleCount: 1,
    description: "Panne mécanique",
  },
]

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  validated: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
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
      constat.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      constat.carBrand.toLowerCase().includes(searchTerm.toLowerCase())

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
                  placeholder="Search by ID, location, region, or car brand..."
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
                  <SelectItem value="rejected">Rejected</SelectItem>
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
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Damage Amount</TableHead>
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
                        <div>
                          <div className="text-sm">{constat.location}</div>
                          <div className="text-xs text-muted-foreground">{constat.region}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{constat.carBrand}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{constat.damageAmount.toLocaleString()} DA</span>
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
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Constat Details - {selectedConstat?.id}</DialogTitle>
                              <DialogDescription>Complete information about this accident report</DialogDescription>
                            </DialogHeader>
                            {selectedConstat && (
                              <div className="space-y-6">
                                <div>
                                  <label className="text-sm font-medium mb-2 block">3D Accident Preview</label>
                                  <Accident3DViewer />
                                  <p className="text-xs text-muted-foreground mt-2">
                                    Use mouse to rotate, zoom, and pan around the accident scene
                                  </p>
                                </div>

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
                                  <div>
                                    <label className="text-sm font-medium">Car Brand</label>
                                    <p className="text-sm text-muted-foreground">{selectedConstat.carBrand}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Damage Amount</label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedConstat.damageAmount.toLocaleString()} DA
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Location</label>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedConstat.location}, {selectedConstat.region}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Accident Cause</label>
                                  <p className="text-sm text-muted-foreground">{selectedConstat.accidentCause}</p>
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
            <CardTitle className="text-sm font-medium">Rejected Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockConstats.filter((c) => c.status === "rejected").length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
