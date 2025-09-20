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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  Settings,
  Shield,
  Plus,
  Edit,
  Trash2,
  Key,
  Bell,
  Palette,
  Database,
  Globe,
  Mail,
  Eye,
  UserCheck,
} from "lucide-react"

// Mock data for users
const mockUsers = [
  {
    id: "USR-001",
    name: "Yasmine Boudjema",
    email: "yasmine.boudjema@costa-insurance.com",
    role: "admin",
    department: "IT Administration",
    status: "active",
    lastLogin: "2024-01-15 14:30",
    createdAt: "2023-06-15",
  },
  {
    id: "USR-002",
    name: "Tarek Meziane",
    email: "tarek.meziane@costa-insurance.com",
    role: "agent",
    department: "Claims Processing",
    status: "active",
    lastLogin: "2024-01-15 09:15",
    createdAt: "2023-08-22",
  },
  {
    id: "USR-003",
    name: "Lamine Cherif",
    email: "lamine.cherif@costa-insurance.com",
    role: "reviewer",
    department: "Quality Assurance",
    status: "active",
    lastLogin: "2024-01-14 16:45",
    createdAt: "2023-09-10",
  },
  {
    id: "USR-004",
    name: "Karim Saadi",
    email: "karim.saadi@costa-insurance.com",
    role: "agent",
    department: "Customer Service",
    status: "inactive",
    lastLogin: "2024-01-10 11:20",
    createdAt: "2023-11-05",
  },
  {
    id: "USR-005",
    name: "Nour El Houda",
    email: "nour.elhouda@costa-insurance.com",
    role: "reviewer",
    department: "Risk Assessment",
    status: "active",
    lastLogin: "2024-01-15 13:00",
    createdAt: "2024-01-02",
  },
]

const roleColors = {
  admin: "bg-purple-100 text-purple-800",
  agent: "bg-blue-100 text-blue-800",
  reviewer: "bg-green-100 text-green-800",
}

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  suspended: "bg-red-100 text-red-800",
}

export default function AdministrationPage() {
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)
  const [newUserRole, setNewUserRole] = useState("")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Administration</h2>
          <p className="text-muted-foreground">Manage users, settings, and system configuration</p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* User Management Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">User Management</h3>
              <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Create a new user account with appropriate permissions</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter last name" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="user@costa-insurance.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select value={newUserRole} onValueChange={setNewUserRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agent">Agent</SelectItem>
                          <SelectItem value="reviewer">Reviewer</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="claims">Claims Processing</SelectItem>
                          <SelectItem value="customer">Customer Service</SelectItem>
                          <SelectItem value="quality">Quality Assurance</SelectItem>
                          <SelectItem value="risk">Risk Assessment</SelectItem>
                          <SelectItem value="it">IT Administration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Create User</Button>
                    <Button variant="outline">Send Invitation</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>System Users ({mockUsers.length})</CardTitle>
              <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                              <Users className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={roleColors[user.role as keyof typeof roleColors]}>{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{user.department}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[user.status as keyof typeof statusColors]}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{user.lastLogin}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>User Details - {selectedUser?.name}</DialogTitle>
                                  <DialogDescription>View and manage user information</DialogDescription>
                                </DialogHeader>
                                {selectedUser && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>User ID</Label>
                                        <p className="text-sm text-muted-foreground">{selectedUser.id}</p>
                                      </div>
                                      <div>
                                        <Label>Status</Label>
                                        <div className="mt-1">
                                          <Badge
                                            className={statusColors[selectedUser.status as keyof typeof statusColors]}
                                          >
                                            {selectedUser.status}
                                          </Badge>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Full Name</Label>
                                        <p className="text-sm text-muted-foreground">{selectedUser.name}</p>
                                      </div>
                                      <div>
                                        <Label>Email</Label>
                                        <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                                      </div>
                                      <div>
                                        <Label>Role</Label>
                                        <div className="mt-1">
                                          <Badge className={roleColors[selectedUser.role as keyof typeof roleColors]}>
                                            {selectedUser.role}
                                          </Badge>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Department</Label>
                                        <p className="text-sm text-muted-foreground">{selectedUser.department}</p>
                                      </div>
                                      <div>
                                        <Label>Created</Label>
                                        <p className="text-sm text-muted-foreground">{selectedUser.createdAt}</p>
                                      </div>
                                      <div>
                                        <Label>Last Login</Label>
                                        <p className="text-sm text-muted-foreground">{selectedUser.lastLogin}</p>
                                      </div>
                                    </div>
                                    <div className="flex gap-2 pt-4">
                                      <Button>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit User
                                      </Button>
                                      <Button variant="outline">
                                        <Key className="h-4 w-4 mr-2" />
                                        Reset Password
                                      </Button>
                                      <Button variant="outline">
                                        <UserCheck className="h-4 w-4 mr-2" />
                                        Change Role
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
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

          {/* User Statistics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockUsers.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockUsers.filter((u) => u.status === "active").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Administrators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockUsers.filter((u) => u.role === "admin").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockUsers.filter((u) => u.role === "agent").length}</div>
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
