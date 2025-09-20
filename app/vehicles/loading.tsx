import { VehiclesTableSkeleton } from "@/components/vehicles-table-skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-9 w-64 bg-muted animate-pulse rounded-md" />
        <div className="h-5 w-96 bg-muted animate-pulse rounded-md mt-2" />
      </div>

      <VehiclesTableSkeleton />
    </div>
  )
}
