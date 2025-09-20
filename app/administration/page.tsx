"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Users,
  Settings,
  Shield,
  Edit,
  Trash2,
  Key,
  Bell,
  Palette,
  Database,
  Globe,
  Mail,
  Eye,
  Building2,
  Send,
  Copy,
  UserPlus,
  Crown,
  Ban,
  CheckCircle,
} from "lucide-react"

const mockWorkers = [
  {
    id: "WRK-001",
    name: "Amine Bensalem",
    email: "amine.bensalem@costa-insurance.dz",
    role: "Admin",
    department: "IT Administration",
    status: "active",
    lastLogin: "2024-01-15 14:30",
    createdAt: "2023-06-15",
    agencyId: "AGY-001",
    agencyName: "Costa Insurance HQ",
    permissions: ["view_all", "edit_all", "delete_all", "manage_users", "admin_access"],
    invitedBy: "System",
    joinedDate: "2023-06-15",
  },
  {
    id: "WRK-002",
    name: "Khaled Mansouri",
    email: "khaled.mansouri@costa-insurance.dz",
    role: "Manager",
    department: "Claims Processing",
    status: "active",
    lastLogin: "2024-01-15 09:15",
    createdAt: "2023-08-22",
    agencyId: "AGY-001",
    agencyName: "Costa Insurance HQ",
    permissions: ["view_all", "edit_all", "manage_team"],
    invitedBy: "Amine Bensalem",
    joinedDate: "2023-08-22",
  },
  {
    id: "WRK-003",
    name: "Samira Khelifi",
    email: "samira.khelifi@costa-insurance.dz",
    role: "Editor",
    department: "Quality Assurance",
    status: "active",
    lastLogin: "2024-01-14 16:45",
    createdAt: "2023-09-10",
    agencyId: "AGY-001",
    agencyName: "Costa Insurance HQ",
    permissions: ["view_all", "edit_assigned"],
    invitedBy: "Khaled Mansouri",
    joinedDate: "2023-09-10",
  },
  {
    id: "WRK-004",
    name: "Nassim Cherif",
    email: "nassim.cherif@costa-insurance.dz",
    role: "Viewer",
    department: "Customer Service",
    status: "suspended",
    lastLogin: "2024-01-10 11:20",
    createdAt: "2023-11-05",
    agencyId: "AGY-001",
    agencyName: "Costa Insurance HQ",
    permissions: ["view_assigned"],
    invitedBy: "Amine Bensalem",
    joinedDate: "2023-11-05",
  },
  {
    id: "WRK-005",
    name: "Houda Benali",
    email: "houda.benali@costa-insurance.dz",
    role: "Editor",
    department: "Risk Assessment",
    status: "pending",
    lastLogin: "Never",
    createdAt: "2024-01-02",
    agencyId: "AGY-001",
    agencyName: "Costa Insurance HQ",
    permissions: ["view_all", "edit_assigned"],
    invitedBy: "Amine Bensalem",
    joinedDate: null,
  },
]

const roleColors = {
  Admin: "bg-purple-100 text-purple-800",
  Manager: "bg-blue-100 text-blue-800",
  Editor: "bg-green-100 text-green-800",
  Viewer: "bg-gray-100 text-gray-800",
}

const statusColors = {
  active: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  suspended: "bg-red-100 text-red-800",
  inactive: "bg-gray-100 text-gray-800",
}

const mockAgency = {
  id: "AGY-001",
  name: "Costa Insurance HQ",
  code: "COSTA-HQ-2024",
  email: "admin@costa-insurance.com",
  phone: "+33 1 23 45 67 89",
  address: "123 Rue de la Paix, 75001 Paris, France",
  website: "https://costa-insurance.com",
  industry: "Insurance",
  size: "51-200 employees",
  createdAt: "2023-06-15",
  subscription: "Premium",
  maxWorkers: 50,
  currentWorkers: 5,
}

export default function AdministrationPage() {
  const [selectedWorker, setSelectedWorker] = useState<(typeof mockWorkers)[0] | null>(null)
  const [newWorkerRole, setNewWorkerRole] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("")
  const [inviteMessage, setInviteMessage] = useState("")

  const handleInviteWorker = () => {
    console.log("[v0] Inviting worker:", { inviteEmail, inviteRole, inviteMessage })
    // Reset form
    setInviteEmail("")
    setInviteRole("")
    setInviteMessage("")
  }

  const handleRoleChange = (workerId: string, newRole: string) => {
    console.log("[v0] Changing role for worker:", workerId, "to:", newRole)
  }

  const handleSuspendWorker = (workerId: string) => {
    console.log("[v0] Suspending worker:", workerId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Administration</h2>
          <p className="text-muted-foreground">Manage workers, agency settings, and system configuration</p>
        </div>
      </div>

      <Tabs defaultValue="workers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workers">Worker Management</TabsTrigger>
          <TabsTrigger value="agency">Agency Settings</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="workers" className="space-y-4">
          {/* Worker Management Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Worker Management</h3>
              <p className="text-sm text-muted-foreground">
                Manage agency workers and their permissions ({mockAgency.currentWorkers}/{mockAgency.maxWorkers}{" "}
                workers)
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Worker
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Invite New Worker</DialogTitle>
                  <DialogDescription>Send an invitation to join your agency workspace</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="inviteEmail">Email Address</Label>
                    <Input
                      id="inviteEmail"
                      type="email"
                      placeholder="worker@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="inviteRole">Role</Label>
                    <Select value={inviteRole} onValueChange={setInviteRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Viewer">Viewer - View assigned reports only</SelectItem>
                        <SelectItem value="Editor">Editor - Edit assigned reports</SelectItem>
                        <SelectItem value="Manager">Manager - Manage team and all reports</SelectItem>
                        <SelectItem value="Admin">Admin - Full agency access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="inviteMessage">Personal Message (Optional)</Label>
                    <Textarea
                      id="inviteMessage"
                      placeholder="Welcome to our team! We're excited to have you join us."
                      value={inviteMessage}
                      onChange={(e) => setInviteMessage(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Key className="h-4 w-4" />
                      <span className="font-medium">Agency Code:</span>
                      <code className="bg-background px-2 py-1 rounded text-xs">{mockAgency.code}</code>
                      <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(mockAgency.code)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      The worker will need this code to join your agency
                    </p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1" onClick={handleInviteWorker}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Invitation
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Workers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Agency Workers ({mockWorkers.length})</CardTitle>
              <CardDescription>Manage worker accounts, roles, and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Worker</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockWorkers.map((worker) => (
                      <TableRow key={worker.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                              {worker.role === "Admin" ? (
                                <Crown className="h-4 w-4 text-purple-600" />
                              ) : (
                                <Users className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{worker.name}</div>
                              <div className="text-sm text-muted-foreground">{worker.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={roleColors[worker.role as keyof typeof roleColors]}>{worker.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{worker.department}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[worker.status as keyof typeof statusColors]}>
                            {worker.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{worker.lastLogin}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedWorker(worker)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Worker Details - {selectedWorker?.name}</DialogTitle>
                                  <DialogDescription>
                                    View and manage worker information and permissions
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedWorker && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Worker ID</Label>
                                        <p className="text-sm text-muted-foreground">{selectedWorker.id}</p>
                                      </div>
                                      <div>
                                        <Label>Status</Label>
                                        <div className="mt-1">
                                          <Badge
                                            className={statusColors[selectedWorker.status as keyof typeof statusColors]}
                                          >
                                            {selectedWorker.status}
                                          </Badge>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Full Name</Label>
                                        <p className="text-sm text-muted-foreground">{selectedWorker.name}</p>
                                      </div>
                                      <div>
                                        <Label>Email</Label>
                                        <p className="text-sm text-muted-foreground">{selectedWorker.email}</p>
                                      </div>
                                      <div>
                                        <Label>Role</Label>
                                        <div className="mt-1">
                                          <Badge className={roleColors[selectedWorker.role as keyof typeof roleColors]}>
                                            {selectedWorker.role}
                                          </Badge>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Department</Label>
                                        <p className="text-sm text-muted-foreground">{selectedWorker.department}</p>
                                      </div>
                                      <div>
                                        <Label>Invited By</Label>
                                        <p className="text-sm text-muted-foreground">{selectedWorker.invitedBy}</p>
                                      </div>
                                      <div>
                                        <Label>Joined Date</Label>
                                        <p className="text-sm text-muted-foreground">
                                          {selectedWorker.joinedDate || "Pending"}
                                        </p>
                                      </div>
                                    </div>

                                    <div>
                                      <Label>Permissions</Label>
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedWorker.permissions.map((permission) => (
                                          <Badge key={permission} variant="secondary" className="text-xs">
                                            {permission.replace("_", " ")}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                      <Select onValueChange={(value) => handleRoleChange(selectedWorker.id, value)}>
                                        <SelectTrigger className="w-40">
                                          <SelectValue placeholder="Change Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Viewer">Viewer</SelectItem>
                                          <SelectItem value="Editor">Editor</SelectItem>
                                          <SelectItem value="Manager">Manager</SelectItem>
                                          <SelectItem value="Admin">Admin</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <Button variant="outline">
                                        <Key className="h-4 w-4 mr-2" />
                                        Reset Password
                                      </Button>
                                      {selectedWorker.status === "active" ? (
                                        <AlertDialog>
                                          <AlertDialogTrigger asChild>
                                            <Button variant="outline">
                                              <Ban className="h-4 w-4 mr-2" />
                                              Suspend
                                            </Button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>Suspend Worker</AlertDialogTitle>
                                              <AlertDialogDescription>
                                                Are you sure you want to suspend {selectedWorker.name}? They will lose
                                                access to the system until reactivated.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                                              <AlertDialogAction onClick={() => handleSuspendWorker(selectedWorker.id)}>
                                                Suspend Worker
                                              </AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      ) : (
                                        <Button variant="outline">
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Reactivate
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove Worker</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove this worker from your agency? This action cannot be
                                    undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction>Remove Worker</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Worker Statistics */}
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockWorkers.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {mockWorkers.filter((w) => w.status === "active").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {mockWorkers.filter((w) => w.status === "pending").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Administrators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {mockWorkers.filter((w) => w.role === "Admin").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Managers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {mockWorkers.filter((w) => w.role === "Manager").length}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agency" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Agency Information
                </CardTitle>
                <CardDescription>Manage your agency profile and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Agency Name</Label>
                    <Input defaultValue={mockAgency.name} />
                  </div>
                  <div>
                    <Label>Agency Code</Label>
                    <div className="flex gap-2">
                      <Input value={mockAgency.code} readOnly />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(mockAgency.code)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input defaultValue={mockAgency.email} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Phone Number</Label>
                    <Input defaultValue={mockAgency.phone} />
                  </div>
                  <div>
                    <Label>Website</Label>
                    <Input defaultValue={mockAgency.website} />
                  </div>
                </div>
                <div>
                  <Label>Address</Label>
                  <Textarea defaultValue={mockAgency.address} rows={2} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Industry</Label>
                    <Select defaultValue={mockAgency.industry}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                        <SelectItem value="Legal">Legal Services</SelectItem>
                        <SelectItem value="Automotive">Automotive</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Company Size</Label>
                    <Select defaultValue={mockAgency.size}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10 employees">1-10 employees</SelectItem>
                        <SelectItem value="11-50 employees">11-50 employees</SelectItem>
                        <SelectItem value="51-200 employees">51-200 employees</SelectItem>
                        <SelectItem value="200+ employees">200+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">Update Agency Information</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Subscription & Limits
                </CardTitle>
                <CardDescription>Manage your subscription and usage limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">{mockAgency.subscription} Plan</div>
                    <div className="text-sm text-muted-foreground">Active since {mockAgency.createdAt}</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Worker Limit</Label>
                    <span className="text-sm text-muted-foreground">
                      {mockAgency.currentWorkers} / {mockAgency.maxWorkers}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(mockAgency.currentWorkers / mockAgency.maxWorkers) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Storage Used</span>
                    <span className="text-sm text-muted-foreground">2.4 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "24%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Calls (Monthly)</span>
                    <span className="text-sm text-muted-foreground">1,247 / 10,000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "12%" }} />
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    Upgrade Plan
                  </Button>
                  <Button variant="ghost" className="w-full text-sm">
                    View Billing History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>Configure general system preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-save drafts</Label>
                    <p className="text-sm text-muted-foreground">Automatically save constat drafts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email notifications</Label>
                    <p className="text-sm text-muted-foreground">Send email alerts for new constats</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data retention</Label>
                    <p className="text-sm text-muted-foreground">Keep closed constats for 7 years</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-factor authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Session timeout</Label>
                    <p className="text-sm text-muted-foreground">Auto-logout after 30 minutes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Audit logging</Label>
                    <p className="text-sm text-muted-foreground">Log all user actions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New constat alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify reviewers of new submissions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Claim approval alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify agents of claim decisions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>System maintenance alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify users of scheduled maintenance</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>Customize the look and feel of the dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Language</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date Format</Label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Integration
                </CardTitle>
                <CardDescription>Configure database connections and backup settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Primary Database</Label>
                    <p className="text-sm text-muted-foreground">PostgreSQL - Connected</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Backup Database</Label>
                    <p className="text-sm text-muted-foreground">Daily backups at 2:00 AM</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Database className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Integration
                </CardTitle>
                <CardDescription>Configure email service for notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMTP Server</Label>
                    <p className="text-sm text-muted-foreground">smtp.costa-insurance.com</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Templates</Label>
                    <p className="text-sm text-muted-foreground">12 templates configured</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Test Email
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  API Integrations
                </CardTitle>
                <CardDescription>External service integrations and API keys</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>CRM Integration</Label>
                    <p className="text-sm text-muted-foreground">Salesforce API</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Payment Gateway</Label>
                    <p className="text-sm text-muted-foreground">Stripe API</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Key className="h-4 w-4 mr-2" />
                  Manage API Keys
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Integrations
                </CardTitle>
                <CardDescription>Security services and monitoring tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Single Sign-On</Label>
                    <p className="text-sm text-muted-foreground">Azure AD integration</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Security Monitoring</Label>
                    <p className="text-sm text-muted-foreground">Real-time threat detection</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
