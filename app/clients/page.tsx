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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Eye, Edit, Phone, Mail, MapPin, Car, FileText, Calendar } from "lucide-react"

// Mock data for clients
const mockClients = [
  {
    id: "CLI-001",
    name: "Karim Benali",
    email: "karim.benali@email.com",
    phone: "+213 551 23 45 67",
    address: "Rue Didouche Mourad, 16000 Alger",
    carBrand: "Renault",
    carModel: "Symbol",
    policyNumber: "POL-2024-001",
    region: "Alger",
    status: "active",
    joinDate: "2023-03-15",
    accidentHistory: [{ id: "CST-2024-001", date: "2024-01-15", location: "Alger Centre", status: "pending" }],
  },
  {
    id: "CLI-002",
    name: "Nadia Bensalem",
    email: "nadia.bensalem@email.com",
    phone: "+213 661 34 56 78",
    address: "Boulevard de l'ALN, 31000 Oran",
    carBrand: "Peugeot",
    carModel: "208",
    policyNumber: "POL-2024-002",
    region: "Oran",
    status: "active",
    joinDate: "2023-07-22",
    accidentHistory: [{ id: "CST-2024-002", date: "2024-01-14", location: "Oran Es Senia", status: "validated" }],
  },
  {
    id: "CLI-003",
    name: "Hocine Mansouri",
    email: "hocine.mansouri@email.com",
    phone: "+213 771 45 67 89",
    address: "Rue Larbi Ben M'hidi, 25000 Constantine",
    carBrand: "Hyundai",
    carModel: "i10",
    policyNumber: "POL-2024-003",
    region: "Constantine",
    status: "suspended",
    joinDate: "2022-12-10",
    accidentHistory: [
      { id: "CST-2024-003", date: "2024-01-10", location: "Constantine Centre", status: "validated" },
      { id: "CST-2023-089", date: "2023-08-15", location: "Constantine", status: "closed" },
    ],
  },
  {
    id: "CLI-004",
    name: "Samira Khelifi",
    email: "samira.khelifi@email.com",
    phone: "+213 541 67 89 01",
    address: "Avenue Abane Ramdane, 15000 Tizi Ouzou",
    carBrand: "Volkswagen",
    carModel: "Polo",
    policyNumber: "POL-2024-004",
    region: "Tizi Ouzou",
    status: "active",
    joinDate: "2024-01-05",
    accidentHistory: [{ id: "CST-2024-004", date: "2024-02-01", location: "Tizi Ouzou", status: "draft" }],
  },
  {
    id: "CLI-005",
    name: "Yacine Cherif",
    email: "yacine.cherif@email.com",
    phone: "+213 791 78 90 12",
    address: "Cours de la Révolution, 23000 Annaba",
    carBrand: "Dacia",
    carModel: "Logan",
    policyNumber: "POL-2024-005",
    region: "Annaba",
    status: "active",
    joinDate: "2023-09-18",
    accidentHistory: [{ id: "CST-2024-005", date: "2024-01-20", location: "Annaba Port", status: "pending" }],
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  suspended: "bg-red-100 text-red-800",
  inactive: "bg-gray-100 text-gray-800",
}

const regions = [
  "Alger",
  "Oran",
  "Constantine",
  "Tizi Ouzou",
  "Annaba",
  "Blida",
  "Batna",
  "Djelfa",
  "Sétif",
  "Sidi Bel Abbès",
  "Biskra",
  "Tébessa",
  "El Oued",
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedClient(client)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Client Profile - {selectedClient?.name}</DialogTitle>
                              <DialogDescription>Complete client information and accident history</DialogDescription>
                            </DialogHeader>
                            {selectedClient && (
                              <Tabs defaultValue="profile" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="profile">Profile</TabsTrigger>
                                  <TabsTrigger value="history">Accident History</TabsTrigger>
                                </TabsList>
                                <TabsContent value="profile" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">Full Name</label>
                                      <p className="text-sm text-muted-foreground">{selectedClient.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Client ID</label>
                                      <p className="text-sm text-muted-foreground">{selectedClient.id}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Email</label>
                                      <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Phone</label>
                                      <p className="text-sm text-muted-foreground">{selectedClient.phone}</p>
                                    </div>
                                    <div className="col-span-2">
                                      <label className="text-sm font-medium">Address</label>
                                      <p className="text-sm text-muted-foreground">{selectedClient.address}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Vehicle</label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedClient.carBrand} {selectedClient.carModel}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Policy Number</label>
                                      <p className="text-sm text-muted-foreground">{selectedClient.policyNumber}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Region</label>
                                      <p className="text-sm text-muted-foreground">{selectedClient.region}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Status</label>
                                      <div className="mt-1">
                                        <Badge
                                          className={statusColors[selectedClient.status as keyof typeof statusColors]}
                                        >
                                          {selectedClient.status}
                                        </Badge>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Join Date</label>
                                      <p className="text-sm text-muted-foreground">{selectedClient.joinDate}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Total Accidents</label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedClient.accidentHistory.length} incidents
                                      </p>
                                    </div>
                                  </div>
                                </TabsContent>
                                <TabsContent value="history" className="space-y-4">
                                  <div className="rounded-md border">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Constat ID</TableHead>
                                          <TableHead>Date</TableHead>
                                          <TableHead>Location</TableHead>
                                          <TableHead>Status</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {selectedClient.accidentHistory.map((accident) => (
                                          <TableRow key={accident.id}>
                                            <TableCell className="font-medium">{accident.id}</TableCell>
                                            <TableCell>
                                              <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                {accident.date}
                                              </div>
                                            </TableCell>
                                            <TableCell>
                                              <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                {accident.location}
                                              </div>
                                            </TableCell>
                                            <TableCell>
                                              <Badge
                                                className={
                                                  accident.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : accident.status === "validated"
                                                      ? "bg-green-100 text-green-800"
                                                      : accident.status === "draft"
                                                        ? "bg-gray-100 text-gray-800"
                                                        : "bg-blue-100 text-blue-800"
                                                }
                                              >
                                                {accident.status}
                                              </Badge>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            )}
                            <div className="flex gap-2 pt-4">
                              <Button>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Client
                              </Button>
                              <Button variant="outline">
                                <FileText className="h-4 w-4 mr-2" />
                                Generate Report
                              </Button>
                            </div>
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
    </div>
  )
}
