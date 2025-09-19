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
import { Plus, Search, Filter, Eye, Edit, DollarSign, Calendar, User, FileText, CheckCircle, X } from "lucide-react"

// Mock data for claims
const mockClaims = [
  {
    id: "CLM-2024-001",
    constatId: "CST-2024-001",
    clientName: "Jean Dupont",
    clientId: "CLI-001",
    policyId: "POL-2024-001",
    claimDate: "2024-01-16",
    incidentDate: "2024-01-15",
    status: "pending",
    claimAmount: 3500,
    approvedAmount: 0,
    deductible: 500,
    description: "Rear collision damage to vehicle",
    adjusterName: "Marie Dubois",
    estimatedRepairCost: 3000,
  },
  {
    id: "CLM-2024-002",
    constatId: "CST-2024-002",
    clientName: "Marie Martin",
    clientId: "CLI-002",
    policyId: "POL-2024-002",
    claimDate: "2024-01-15",
    incidentDate: "2024-01-14",
    status: "approved",
    claimAmount: 2200,
    approvedAmount: 1900,
    deductible: 300,
    description: "Side impact damage during lane change",
    adjusterName: "Pierre Leroy",
    estimatedRepairCost: 2200,
  },
  {
    id: "CLM-2024-003",
    constatId: "CST-2024-003",
    clientName: "Antoine Bernard",
    clientId: "CLI-005",
    policyId: "POL-2024-005",
    claimDate: "2024-01-15",
    incidentDate: "2024-01-14",
    status: "under_review",
    claimAmount: 1800,
    approvedAmount: 0,
    deductible: 400,
    description: "Damage from road obstacle",
    adjusterName: "Sophie Martin",
    estimatedRepairCost: 1400,
  },
  {
    id: "CLM-2023-089",
    constatId: "CST-2023-089",
    clientName: "Pierre Durand",
    clientId: "CLI-003",
    policyId: "POL-2024-003",
    claimDate: "2023-08-16",
    incidentDate: "2023-08-15",
    status: "paid",
    claimAmount: 4500,
    approvedAmount: 4300,
    deductible: 200,
    description: "Front-end collision damage",
    adjusterName: "Jean Moreau",
    estimatedRepairCost: 4500,
  },
  {
    id: "CLM-2023-067",
    constatId: "CST-2023-067",
    clientName: "Sophie Leroy",
    clientId: "CLI-004",
    policyId: "POL-2024-004",
    claimDate: "2023-12-10",
    incidentDate: "2023-12-09",
    status: "rejected",
    claimAmount: 2800,
    approvedAmount: 0,
    deductible: 600,
    description: "Damage not covered under policy terms",
    adjusterName: "Antoine Petit",
    estimatedRepairCost: 2800,
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  under_review: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  paid: "bg-purple-100 text-purple-800",
}

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedClaim, setSelectedClaim] = useState<(typeof mockClaims)[0] | null>(null)

  const filteredClaims = mockClaims.filter((claim) => {
    const matchesSearch =
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.constatId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || claim.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Claims Management</h2>
          <p className="text-muted-foreground">Track and manage insurance claims from constats</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Claim
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
                  placeholder="Search by claim ID, client name, or constat ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Claims Table */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Claims ({filteredClaims.length})</CardTitle>
          <CardDescription>Complete list of claims with status and payment information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Constat</TableHead>
                  <TableHead>Claim Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Adjuster</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium">{claim.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">{claim.clientName}</div>
                          <div className="text-xs text-muted-foreground">{claim.clientId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{claim.constatId}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">€{claim.claimAmount.toLocaleString()}</div>
                          {claim.approvedAmount > 0 && (
                            <div className="text-xs text-green-600">
                              Approved: €{claim.approvedAmount.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[claim.status as keyof typeof statusColors]}>
                        {claim.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{claim.adjusterName}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{claim.claimDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedClaim(claim)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Claim Details - {selectedClaim?.id}</DialogTitle>
                              <DialogDescription>Complete claim information and processing details</DialogDescription>
                            </DialogHeader>
                            {selectedClaim && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Claim ID</label>
                                    <p className="text-sm text-muted-foreground">{selectedClaim.id}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <div className="mt-1">
                                      <Badge
                                        className={statusColors[selectedClaim.status as keyof typeof statusColors]}
                                      >
                                        {selectedClaim.status.replace("_", " ")}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Client</label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedClaim.clientName} ({selectedClaim.clientId})
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Related Constat</label>
                                    <p className="text-sm text-muted-foreground">{selectedClaim.constatId}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Policy ID</label>
                                    <p className="text-sm text-muted-foreground">{selectedClaim.policyId}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Adjuster</label>
                                    <p className="text-sm text-muted-foreground">{selectedClaim.adjusterName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Incident Date</label>
                                    <p className="text-sm text-muted-foreground">{selectedClaim.incidentDate}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Claim Date</label>
                                    <p className="text-sm text-muted-foreground">{selectedClaim.claimDate}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Claim Amount</label>
                                    <p className="text-sm text-muted-foreground">
                                      €{selectedClaim.claimAmount.toLocaleString()}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Approved Amount</label>
                                    <p className="text-sm text-muted-foreground">
                                      €{selectedClaim.approvedAmount.toLocaleString()}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Deductible</label>
                                    <p className="text-sm text-muted-foreground">€{selectedClaim.deductible}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Estimated Repair Cost</label>
                                    <p className="text-sm text-muted-foreground">
                                      €{selectedClaim.estimatedRepairCost.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Description</label>
                                  <p className="text-sm text-muted-foreground">{selectedClaim.description}</p>
                                </div>
                                <div className="flex gap-2 pt-4">
                                  <Button>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Claim
                                  </Button>
                                  {selectedClaim.status === "pending" && (
                                    <>
                                      <Button variant="outline">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Approve
                                      </Button>
                                      <Button variant="outline">
                                        <X className="h-4 w-4 mr-2" />
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                  <Button variant="outline">Generate Report</Button>
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
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClaims.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockClaims.filter((c) => c.status === "pending" || c.status === "under_review").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockClaims.filter((c) => c.status === "approved" || c.status === "paid").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{mockClaims.reduce((acc, claim) => acc + claim.approvedAmount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
