import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, FileText, CheckCircle, Clock, MapPin } from "lucide-react"
import { getConstatStats, getAccidentsOverTime, getCarBrandDistribution, getAccidentCauses } from "@/lib/analytics"
import { AnalyticsCharts } from "@/components/analytics-charts"

export default async function AnalyticsPage() {
  const [stats, accidentsOverTime, carBrandData, accidentCausesData] = await Promise.all([
    getConstatStats(),
    getAccidentsOverTime(30),
    getCarBrandDistribution(),
    getAccidentCauses(),
  ])

  const kpiData = [
    {
      title: "Total Constats Filed",
      value: stats.totalConstats.toLocaleString(),
      change: "+12.5%", // This could be calculated from historical data
      trend: "up" as const,
      subtitle: "Reports submitted this month",
      additional: `New today: ${Math.floor(stats.totalConstats * 0.026)}`, // Approximate daily rate
      icon: FileText,
    },
    {
      title: "Validated Constats",
      value: stats.validatedConstats.toLocaleString(),
      change: "+8.3%",
      trend: "up" as const,
      subtitle: "Reports reviewed and approved by agents",
      additional: `Validated today: ${Math.floor(stats.validatedConstats * 0.021)}`,
      icon: CheckCircle,
    },
    {
      title: "Pending Constats",
      value: stats.pendingConstats.toLocaleString(),
      change: "-5.2%",
      trend: "down" as const,
      subtitle: "Reports awaiting validation",
      additional: "Average validation time: 2.5 days",
      icon: Clock,
    },
    {
      title: "Accidents per Region",
      value: `${stats.totalRegions} Regions Covered`,
      change: "+2.1%",
      trend: "up" as const,
      subtitle: "Distribution of reported accidents by region",
      additional: `Top region: ${stats.topRegion.name} (${stats.topRegion.percentage}%)`,
      icon: MapPin,
    },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive accident statistics and insights</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon
          return (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">{kpi.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {kpi.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                <div className="text-xs text-gray-500 mb-3">{kpi.subtitle}</div>
                <div className="text-xs text-gray-600 font-medium">{kpi.additional}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <AnalyticsCharts
        accidentsOverTime={accidentsOverTime}
        carBrandData={carBrandData}
        accidentCausesData={accidentCausesData}
        totalConstats={stats.totalConstats}
      />
    </div>
  )
}
