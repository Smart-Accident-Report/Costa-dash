import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Welcome to Costa</h2>
          <p className="text-muted-foreground">Manage your accident reports and customer data efficiently</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Constat
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Pending
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Constats</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Cases</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,145</div>
            <p className="text-xs text-muted-foreground">92.8% resolution rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Accidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Constats</CardTitle>
            <CardDescription>Latest accident reports submitted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "CST-2024-001", date: "2024-01-15", location: "Alger Centre", status: "pending" },
                { id: "CST-2024-002", date: "2024-01-14", location: "Oran Centre", status: "validated" },
                { id: "CST-2024-003", date: "2024-01-14", location: "Constantine", status: "draft" },
                { id: "CST-2024-004", date: "2024-01-13", location: "Annaba", status: "closed" },
              ].map((constat) => (
                <div key={constat.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{constat.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {constat.date} • {constat.location}
                    </p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      constat.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : constat.status === "validated"
                          ? "bg-green-100 text-green-800"
                          : constat.status === "draft"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {constat.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Create New Constat
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Review Pending Reports
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <CheckCircle className="h-4 w-4 mr-2" />
                Validate Claims
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <AlertTriangle className="h-4 w-4 mr-2" />
                View Urgent Cases
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
