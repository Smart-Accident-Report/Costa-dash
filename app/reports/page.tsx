"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Plus,
  Eye,
  BarChart3,
  Users,
  FileOutput,
  Clock,
  CheckCircle,
} from "lucide-react"

// Mock data for generated reports
const mockReports = [
  {
    id: "RPT-2024-001",
    name: "Monthly Constats Summary - January 2024",
    type: "constats",
    period: "2024-01",
    generatedBy: "Marie Dubois",
    generatedAt: "2024-02-01 09:30",
    status: "completed",
    format: "PDF",
    size: "2.4 MB",
    downloads: 12,
  },
  {
    id: "RPT-2024-002",
    name: "Claims Analysis Q1 2024",
    type: "claims",
    period: "2024-Q1",
    generatedBy: "Pierre Leroy",
    generatedAt: "2024-04-02 14:15",
    status: "completed",
    format: "CSV",
    size: "1.8 MB",
    downloads: 8,
  },
  {
    id: "RPT-2024-003",
    name: "Client Accident History - High Risk",
    type: "clients",
    period: "2024-01-01 to 2024-03-31",
    generatedBy: "Sophie Martin",
    generatedAt: "2024-04-05 11:20",
    status: "processing",
    format: "PDF",
    size: "-",
    downloads: 0,
  },
  {
    id: "RPT-2024-004",
    name: "Regional Analysis - Île-de-France",
    type: "regional",
    period: "2024-01-01 to 2024-06-30",
    generatedBy: "Jean Moreau",
    generatedAt: "2024-07-01 16:45",
    status: "completed",
    format: "Excel",
    size: "3.2 MB",
    downloads: 15,
  },
]

const reportTemplates = [
  {
    id: "constats-monthly",
    name: "Monthly Constats Report",
    description: "Summary of all constats for a specific month with status breakdown",
    type: "constats",
    estimatedTime: "2-3 minutes",
  },
  {
    id: "claims-summary",
    name: "Claims Summary Report",
    description: "Detailed analysis of claims with amounts and approval rates",
    type: "claims",
    estimatedTime: "3-5 minutes",
  },
  {
    id: "client-history",
    name: "Client Accident History",
    description: "Individual or bulk client accident history with risk assessment",
    type: "clients",
    estimatedTime: "1-2 minutes",
  },
  {
    id: "regional-analysis",
    name: "Regional Analysis Report",
    description: "Geographic breakdown of accidents and claims by region",
    type: "regional",
    estimatedTime: "4-6 minutes",
  },
  {
    id: "financial-summary",
    name: "Financial Summary",
    description: "Premium collection, claim payouts, and financial performance",
    type: "financial",
    estimatedTime: "2-4 minutes",
  },
]

const statusColors = {
  completed: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
}

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [reportPeriod, setReportPeriod] = useState("")
  const [reportFormat, setReportFormat] = useState("pdf")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports & Export</h2>
          <p className="text-muted-foreground">Generate and manage reports for constats, claims, and analytics</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
              <DialogDescription>Select a report template and configure the parameters</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="template">Report Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a report template" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedTemplate && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {reportTemplates.find((t) => t.id === selectedTemplate)?.description}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="period">Time Period</Label>
                  <Select value={reportPeriod} onValueChange={setReportPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="format">Export Format</Label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                      <SelectItem value="excel">Excel Workbook</SelectItem>
                      <SelectItem value="json">JSON Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {reportPeriod === "custom" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input type="date" id="start-date" />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input type="date" id="end-date" />
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <FileOutput className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline">Preview</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reports">Generated Reports</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Recently generated reports and their download status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Generated By</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{report.name}</div>
                            <div className="text-sm text-muted-foreground">{report.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {report.type === "constats" && <FileText className="h-4 w-4 text-muted-foreground" />}
                            {report.type === "claims" && <BarChart3 className="h-4 w-4 text-muted-foreground" />}
                            {report.type === "clients" && <Users className="h-4 w-4 text-muted-foreground" />}
                            {report.type === "regional" && <Filter className="h-4 w-4 text-muted-foreground" />}
                            <span className="text-sm capitalize">{report.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{report.period}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{report.generatedBy}</div>
                            <div className="text-xs text-muted-foreground">{report.generatedAt}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[report.status as keyof typeof statusColors]}>
                            {report.status === "processing" && <Clock className="h-3 w-3 mr-1" />}
                            {report.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{report.size}</div>
                            <div className="text-xs text-muted-foreground">{report.format}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled={report.status !== "completed"}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
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

          {/* Report Statistics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockReports.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockReports.reduce((acc, r) => acc + r.downloads, 0)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockReports.filter((r) => r.status === "processing").length}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reportTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {template.type === "constats" && <FileText className="h-5 w-5" />}
                    {template.type === "claims" && <BarChart3 className="h-5 w-5" />}
                    {template.type === "clients" && <Users className="h-5 w-5" />}
                    {template.type === "regional" && <Filter className="h-5 w-5" />}
                    {template.type === "financial" && <Download className="h-5 w-5" />}
                    {template.name}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {template.estimatedTime}
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
