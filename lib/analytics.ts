import { createClient } from "@/lib/supabase/server"

export interface ConstatStats {
  totalConstats: number
  validatedConstats: number
  pendingConstats: number
  rejectedConstats: number
  totalRegions: number
  topRegion: { name: string; percentage: number }
}

export interface AccidentOverTime {
  date: string
  accidents: number
}

export interface CarBrandDistribution {
  name: string
  value: number
  color: string
}

export interface AccidentCause {
  name: string
  value: number
  color: string
}

const BRAND_COLORS = {
  Renault: "#ec4899",
  Peugeot: "#eab308",
  Toyota: "#22c55e",
  Dacia: "#a855f7",
  Volkswagen: "#3b82f6",
  Ford: "#f97316",
  Hyundai: "#06b6d4",
  Others: "#64748b",
}

const CAUSE_COLORS = {
  "Rear-end collision": "#ef4444",
  "Side impact": "#f97316",
  "Intersection collision": "#eab308",
  "Lane change accident": "#22c55e",
  "Distracted driving": "#8b5cf6",
  Speeding: "#ec4899",
  "Weather-related accident": "#06b6d4",
  "Parking lot collision": "#64748b",
  "Mechanical failure": "#f59e0b",
  Others: "#6b7280",
}

export async function getConstatStats(): Promise<ConstatStats> {
  const supabase = await createClient()

  // Get total constats
  const { count: totalConstats } = await supabase.from("constats").select("*", { count: "exact", head: true })

  // Get validated constats
  const { count: validatedConstats } = await supabase
    .from("constats")
    .select("*", { count: "exact", head: true })
    .eq("status", "validated")

  // Get pending constats
  const { count: pendingConstats } = await supabase
    .from("constats")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  // Get rejected constats
  const { count: rejectedConstats } = await supabase
    .from("constats")
    .select("*", { count: "exact", head: true })
    .eq("status", "rejected")

  // Get region distribution
  const { data: regionData } = await supabase.from("constats").select("region")

  const regionCounts =
    regionData?.reduce((acc: Record<string, number>, item) => {
      acc[item.region] = (acc[item.region] || 0) + 1
      return acc
    }, {}) || {}

  const totalRegions = Object.keys(regionCounts).length
  const topRegionEntry = Object.entries(regionCounts).sort(([, a], [, b]) => b - a)[0]
  const topRegion = topRegionEntry
    ? {
        name: topRegionEntry[0],
        percentage: Math.round((topRegionEntry[1] / (totalConstats || 1)) * 100),
      }
    : { name: "N/A", percentage: 0 }

  return {
    totalConstats: totalConstats || 0,
    validatedConstats: validatedConstats || 0,
    pendingConstats: pendingConstats || 0,
    rejectedConstats: rejectedConstats || 0,
    totalRegions,
    topRegion,
  }
}

export async function getAccidentsOverTime(days = 30): Promise<AccidentOverTime[]> {
  const supabase = await createClient()

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data } = await supabase
    .from("constats")
    .select("accident_date")
    .gte("accident_date", startDate.toISOString())
    .order("accident_date", { ascending: true })

  // Group by date
  const dateGroups =
    data?.reduce((acc: Record<string, number>, item) => {
      const date = new Date(item.accident_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {}) || {}

  return Object.entries(dateGroups).map(([date, accidents]) => ({
    date,
    accidents,
  }))
}

export async function getCarBrandDistribution(): Promise<CarBrandDistribution[]> {
  const supabase = await createClient()

  const { data } = await supabase.from("constats").select("car_brand")

  const brandCounts =
    data?.reduce((acc: Record<string, number>, item) => {
      acc[item.car_brand] = (acc[item.car_brand] || 0) + 1
      return acc
    }, {}) || {}

  const total = Object.values(brandCounts).reduce((sum, count) => sum + count, 0)

  return Object.entries(brandCounts)
    .map(([name, count]) => ({
      name,
      value: Math.round((count / total) * 100),
      color: BRAND_COLORS[name as keyof typeof BRAND_COLORS] || BRAND_COLORS.Others,
    }))
    .sort((a, b) => b.value - a.value)
}

export async function getAccidentCauses(): Promise<AccidentCause[]> {
  const supabase = await createClient()

  const { data } = await supabase.from("constats").select("accident_cause")

  const causeCounts =
    data?.reduce((acc: Record<string, number>, item) => {
      acc[item.accident_cause] = (acc[item.accident_cause] || 0) + 1
      return acc
    }, {}) || {}

  return Object.entries(causeCounts)
    .map(([name, value]) => ({
      name,
      value,
      color: CAUSE_COLORS[name as keyof typeof CAUSE_COLORS] || CAUSE_COLORS.Others,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5) // Top 5 causes
}
