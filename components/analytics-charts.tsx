"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp } from "lucide-react"
import type { AccidentOverTime, CarBrandDistribution, AccidentCause } from "@/lib/analytics"

interface AnalyticsChartsProps {
  accidentsOverTime: AccidentOverTime[]
  carBrandData: CarBrandDistribution[]
  accidentCausesData: AccidentCause[]
  totalConstats: number
}

export function AnalyticsCharts({
  accidentsOverTime,
  carBrandData,
  accidentCausesData,
  totalConstats,
}: AnalyticsChartsProps) {
  const [timeRange, setTimeRange] = useState("30days")

  return (
    <>
      {/* Accidents Over Time Chart */}
      <Card className="bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Accidents Over Time</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Reported accidents in the last 30 days
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                3 months
              </Badge>
              <Badge className="bg-pink-500 text-white text-xs">30 days</Badge>
              <Badge variant="outline" className="text-xs">
                7 days
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accidentsOverTime} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="accidents" fill="#ec4899" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Car Brand Distribution */}
        <Card className="bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Distribution of Accidents by Car Brand
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">Breakdown by vehicle manufacturer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4 relative">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={carBrandData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {carBrandData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-900">100%</span>
                <span className="text-sm text-gray-600">Total</span>
              </div>
            </div>
            <div className="space-y-2">
              {carBrandData.map((brand) => (
                <div key={brand.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: brand.color }}></div>
                    <span className="text-gray-700">{brand.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{brand.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Accident Causes */}
        <Card className="bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Top Accident Causes</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Most common reasons for reported accidents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accidentCausesData.map((cause, index) => (
                <div key={cause.name} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-20">{cause.name}</span>
                  <div className="flex-1 relative">
                    <div className="h-8 bg-gray-100 rounded-md overflow-hidden">
                      <div
                        className="h-full rounded-md flex items-center justify-end pr-3 transition-all duration-300"
                        style={{
                          backgroundColor: cause.color,
                          width: `${(cause.value / Math.max(...accidentCausesData.map((c) => c.value))) * 100}%`,
                        }}
                      >
                        <span className="text-white text-xs font-medium">{cause.value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm mt-4 pt-4 border-t">
              <span className="text-gray-600">Total constats analyzed: {totalConstats.toLocaleString()}</span>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
