"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Search, Filter, Eye, Edit, Phone, Mail, MapPin, Car, Calendar, FileText } from "lucide-react"

// Mock data for clients
const mockClients = [
  {
    id: "CLI-001",
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 1 23 45 67 89",
    address: "15 Rue de la Paix, 75001 Paris",
    carBrand: "Peugeot",
    carModel: "308",
    policyNumber: "POL-2024-001",
    region: "Île-de-France",
    status: "active",
    joinDate: "2023-03-15",
    accidentHistory: [
      { id: "CST-2024-001", date: "2024-01-15", location: "Paris 8e", status: "pending" },
      { id: "CST-2023-045", date: "2023-11-20", location: "Paris 15e", status: "closed" },
    ],
  },
  {
    id: "CLI-002",
    name: "Marie Martin",
    email: "marie.martin@email.com",
    phone: "+33 1 34 56 78 90",
    address: "42 Avenue Victor Hugo, 69003 Lyon",
    carBrand: "Renault",
    carModel: "Clio",
    policyNumber: "POL-2024-002",
    region: "Auvergne-Rhône-Alpes",
    status: "active",
    joinDate: "2023-07-22",
    accidentHistory: [{ id: "CST-2024-002", date: "2024-01-14", location: "Lyon 2e", status: "validated" }],
  },
  {
    id: "CLI-003",
    name: "Pierre Durand",
    email: "pierre.durand@email.com",
    phone: "+33 4 56 78 90 12",
    address: "8 Boulevard Canebière, 13001 Marseille",
    carBrand: "Citroën",
    carModel: "C4",
    policyNumber: "POL-2024-003",
    region: "Provence-Alpes-Côte d'Azur",
    status: "suspended",
    joinDate: "2022-12-10",
    accidentHistory: [
      { id: "CST-2024-002", date: "2024-01-14", location: "Lyon 2e", status: "validated" },
      { id: "CST-2023-089", date: "2023-08-15", location: "Marseille", status: "closed" },
      { id: "CST-2023-034", date: "2023-05-03", location: "Nice", status: "closed" },
    ],
  },
  {
    id: "CLI-004",
    name: "Sophie Leroy",
    email: "sophie.leroy@email.com",
    phone: "+33 5 67 89 01 23",
    address: "25 Place du Capitole, 31000 Toulouse",
    carBrand: "Volkswagen",
    carModel: "Golf",
    policyNumber: "POL-2024-004",
    region: "Occitanie",
    status: "active",
    joinDate: "2024-01-05",
    accidentHistory: [{ id: "CST-2024-002", date: "2024-01-14", location: "Lyon 2e", status: "validated" }],
  },
  {
    id: "CLI-005",
    name: "Antoine Bernard",
    email: "antoine.bernard@email.com",
    phone: "+33 2 78 90 12 34",
    address: "33 Quai des Belges, 13001 Marseille",
    carBrand: "BMW",
    carModel: "Serie 3",
    policyNumber: "POL-2024-005",
    region: "Provence-Alpes-Côte d'Azur",
    status: "active",
    joinDate: "2023-09-18",
    accidentHistory: [{ id: "CST-2024-003", date: "2024-01-14", location: "Marseille 1er", status: "draft" }],
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  suspended: "bg-red-100 text-red-800",
  inactive: "bg-gray-100 text-gray-800",
}

const regions = [
  "Île-de-France",
  "Auvergne-Rhône-Alpes",
  "Provence-Alpes-Côte d'Azur",
  "Occitanie",
  "Nouvelle-Aquitaine",
  "Grand Est",
  "Hauts-de-France",
  "Normandie",
  "Bretagne",
  "Pays de la Loire",
  "Centre-Val de Loire",
  "Bourgogne-Franche-Comté",
  "Corse",
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const [selectedClient, setSelectedClient] = useState<(typeof mockClients)[0] | null>(null)

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.carBrand.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    const matchesRegion = regionFilter === "all" || client.region === regionFilter

    return matchesSearch && matchesStatus && matchesRegion
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Client Management</h2>
          <p className="text-muted-foreground">Manage client information and policy details</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
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
                  placeholder="Search by name, email, policy number, or car brand..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Clients ({filteredClients.length})</CardTitle>
          <CardDescription>Complete list of clients with policy and vehicle information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Policy</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {client.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          {client.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {client.carBrand} {client.carModel}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{client.policyNumber}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{client.region}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[client.status as keyof typeof statusColors]}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedClient(client)}>
                          <Eye className="h-4 w-4" />
                        </Button>
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
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClients.filter((c) => c.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClients.filter((c) => c.status === "suspended").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Accidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                mockClients.reduce((acc, client) => acc + client.accidentHistory.length, 0) / mockClients.length
              ).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Details Modal Dialog */}
      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
            <DialogDescription>Complete information for {selectedClient?.name}</DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Name:</span>
                      <span>{selectedClient.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedClient.address}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Policy Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClient.policyNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClient.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined: {selectedClient.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Status:</span>
                      <Badge className={statusColors[selectedClient.status as keyof typeof statusColors]}>
                        {selectedClient.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Vehicle Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    Vehicle Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Vehicle:</span>
                    <span>
                      {selectedClient.carBrand} {selectedClient.carModel}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Accident History */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Accident History ({selectedClient.accidentHistory.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedClient.accidentHistory.length > 0 ? (
                    <div className="space-y-2">
                      {selectedClient.accidentHistory.map((accident) => (
                        <div key={accident.id} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <span className="font-medium">{accident.id}</span>
                            <span className="text-sm text-muted-foreground ml-2">{accident.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{accident.location}</span>
                            <Badge variant="outline">{accident.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No accident history</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
