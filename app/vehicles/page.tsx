import { Suspense } from "react"
import { VehiclesTable } from "@/components/vehicles-table"
import { VehiclesTableSkeleton } from "@/components/vehicles-table-skeleton"
import { AddVehicleModal } from "@/components/add-vehicle-modal"

export default function VehiclesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Véhicules</h1>
          <p className="text-muted-foreground">
            Gérez les véhicules de dépannage, leurs horaires de travail et leurs localisations
          </p>
        </div>
        <AddVehicleModal onVehicleAdded={() => window.location.reload()} />
      </div>

      <Suspense fallback={<VehiclesTableSkeleton />}>
        <VehiclesTable />
      </Suspense>
    </div>
  )
}
