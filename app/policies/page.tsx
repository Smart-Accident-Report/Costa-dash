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
import { Plus, Search, Filter, Eye, Edit, Shield, Calendar, User, AlertTriangle } from "lucide-react"

// Mock data for policies
const mockPolicies = [
  {
    id: "POL-2024-001",
    clientName: "Amine Bensalem",
    clientId: "CLI-001",
    policyType: "Comprehensive",
    coverage: "All Risk",
    premium: 156000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    region: "Alger",
    vehicle: "Hyundai Accent",
    deductible: 65000,
    renewalDate: "2024-12-31",
  },
  {
    id: "POL-2024-002",
    clientName: "Houda Benali",
    clientId: "CLI-002",
    policyType: "Third Party Plus",
    coverage: "Liability + Theft",
    premium: 104000,
    startDate: "2024-02-15",
    endDate: "2025-02-14",
    status: "active",
    region: "Oran",
    vehicle: "Renault Symbol",
    deductible: 39000,
    renewalDate: "2025-02-14",
  },
  {
    id: "POL-2024-003",
    clientName: "Nassim Cherif",
    clientId: "CLI-003",
    policyType: "Third Party",
    coverage: "Liability Only",
    premium: 78000,
    startDate: "2023-12-10",
    endDate: "2024-12-09",
    status: "renewal_due",
    region: "Constantine",
    vehicle: "Peugeot 301",
    deductible: 26000,
    renewalDate: "2024-12-09",
  },
  {
    id: "POL-2024-004",
    clientName: "Samira Khelifi",
    clientId: "CLI-004",
    policyType: "Comprehensive",
    coverage: "All Risk",
    premium: 182000,
    startDate: "2024-01-05",
    endDate: "2025-01-04",
    status: "active",
    region: "Tizi Ouzou",
    vehicle: "Kia Picanto",
    deductible: 78000,
    renewalDate: "2025-01-04",
  },
  {
    id: "POL-2023-089",
    clientName: "Karim Aït Ali",
    clientId: "CLI-005",
    policyType: "Third Party Plus",
    coverage: "Liability + Fire",
    premium: 117000,
    startDate: "2023-09-18",
    endDate: "2024-09-17",
    status: "expired",
    region: "Annaba",
    vehicle: "Toyota Corolla",
    deductible: 52000,
    renewalDate: "2024-09-17",
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  expired: "bg-red-100 text-red-800",
  renewal_due: "bg-yellow-100 text-yellow-800",
  suspended: "bg-gray-100 text-gray-800",
}

const coverageTypes = ["All Risk", "Liability + Theft", "Liability + Fire", "Liability Only"]

export default function PoliciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [coverageFilter, setCoverageFilter] = useState("all")
  const [selectedPolicy, setSelectedPolicy] = useState<(typeof mockPolicies)[0] | null>(null)

  const filteredPolicies = mockPolicies.filter((policy) => {
    const matchesSearch =
      policy.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.vehicle.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || policy.status === statusFilter
    const matchesCoverage = coverageFilter === "all" || policy.coverage === coverageFilter

    return matchesSearch && matchesStatus && matchesCoverage
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Policy Management</h2>
          <p className="text-muted-foreground">Manage insurance policies and coverage details</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Policy
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
                  placeholder="Search by policy ID, client name, or vehicle..."
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
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="renewal_due">Renewal Due</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={coverageFilter} onValueChange={setCoverageFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Coverage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Coverage</SelectItem>
                  {coverageTypes.map((coverage) => (
                    <SelectItem key={coverage} value={coverage}>
                      {coverage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Policies ({filteredPolicies.length})</CardTitle>
          <CardDescription>Complete list of policies with coverage and renewal information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Policy ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Premium</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Renewal</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPolicies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="font-medium">{policy.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">{policy.clientName}</div>
                          <div className="text-xs text-muted-foreground">{policy.clientId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{policy.vehicle}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm font-medium">{policy.policyType}</div>
                        <div className="text-xs text-muted-foreground">{policy.coverage}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{policy.premium.toLocaleString()} DZD</div>
                      <div className="text-xs text-muted-foreground">
                        Deductible: {policy.deductible.toLocaleString()} DZD
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[policy.status as keyof typeof statusColors]}>
                        {policy.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm">{policy.renewalDate}</div>
                          {policy.status === "renewal_due" && (
                            <div className="flex items-center gap-1 text-xs text-yellow-600">
                              <AlertTriangle className="h-3 w-3" />
                              Due soon
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedPolicy(policy)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Policy Details - {selectedPolicy?.id}</DialogTitle>
                              <DialogDescription>Complete policy information and coverage details</DialogDescription>
                            </DialogHeader>
                            {selectedPolicy && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Policy ID</label>
                                    <p className="text-sm text-muted-foreground">{selectedPolicy.id}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <div className="mt-1">
                                      <Badge
                                        className={statusColors[selectedPolicy.status as keyof typeof statusColors]}
                                      >
                                        {selectedPolicy.status.replace("_", " ")}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Client</label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedPolicy.clientName} ({selectedPolicy.clientId})
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Vehicle</label>
                                    <p className="text-sm text-muted-foreground">{selectedPolicy.vehicle}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Policy Type</label>
                                    <p className="text-sm text-muted-foreground">{selectedPolicy.policyType}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Coverage</label>
                                    <p className="text-sm text-muted-foreground">{selectedPolicy.coverage}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Annual Premium</label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedPolicy.premium.toLocaleString()} DZD
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Deductible</label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedPolicy.deductible.toLocaleString()} DZD
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Policy Period</label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedPolicy.startDate} to {selectedPolicy.endDate}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Region</label>
                                    <p className="text-sm text-muted-foreground">{selectedPolicy.region}</p>
                                  </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                  <Button>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Policy
                                  </Button>
                                  <Button variant="outline">Renew Policy</Button>
                                  <Button variant="outline">Generate Certificate</Button>
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
            <CardTitle className="text-sm font-medium">Total Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPolicies.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPolicies.filter((p) => p.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Renewal Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPolicies.filter((p) => p.status === "renewal_due").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPolicies.reduce((acc, policy) => acc + policy.premium, 0).toLocaleString()} DZD
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
