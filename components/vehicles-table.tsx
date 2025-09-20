import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Truck, Clock, MapPin, AlertTriangle, Wrench } from "lucide-react"

interface Vehicle {
  id: string
  name: string
  vehicle_type: string
  license_plate: string | null
  location: string
  work_time: string
  custom_hours: { start: string; end: string } | null
  status: string
  created_at: string
  assigned_worker_id: string | null
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "out_of_service":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getWorkTimeDisplay(workTime: string, customHours: { start: string; end: string } | null) {
  switch (workTime) {
    case "day":
      return "Jour (8h-17h)"
    case "night":
      return "Nuit (20h-6h)"
    case "24h":
      return "24h/24"
    case "custom":
      return customHours ? `${customHours.start}-${customHours.end}` : "Personnalisé"
    default:
      return workTime
  }
}

function getWorkTimeIcon(workTime: string) {
  switch (workTime) {
    case "24h":
      return <AlertTriangle className="h-4 w-4 text-orange-600" />
    case "night":
      return <Clock className="h-4 w-4 text-blue-600" />
    case "day":
    case "custom":
    default:
      return <Clock className="h-4 w-4 text-green-600" />
  }
}

function getVehicleTypeIcon(type: string) {
  switch (type) {
    case "tow_truck":
      return <Truck className="h-4 w-4 text-blue-600" />
    case "service_van":
      return <Wrench className="h-4 w-4 text-orange-600" />
    case "emergency_vehicle":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    default:
      return <Truck className="h-4 w-4 text-gray-600" />
  }
}

function getVehicleTypeLabel(type: string) {
  switch (type) {
    case "tow_truck":
      return "Dépanneuse"
    case "service_van":
      return "Véhicule de service"
    case "emergency_vehicle":
      return "Véhicule d'urgence"
    default:
      return type
  }
}

export async function VehiclesTable() {
  const supabase = await createClient()

  // Fetch vehicles data
  const { data: vehicles, error } = await supabase.from("vehicles").select("*").eq("is_active", true).order("name")

  if (error) {
    console.error("Error fetching vehicles:", error)
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
            <p>Erreur lors du chargement des véhicules</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <Truck className="h-8 w-8 mx-auto mb-2" />
            <p>Aucun véhicule trouvé</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Véhicules de Dépannage
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {vehicles.length} véhicule{vehicles.length > 1 ? "s" : ""} actif{vehicles.length > 1 ? "s" : ""} disponible
          {vehicles.length > 1 ? "s" : ""}
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Véhicule</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Plaque</TableHead>
                <TableHead>Horaire de travail</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Localisation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle: Vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getVehicleTypeIcon(vehicle.vehicle_type)}
                      <div>
                        <div className="font-medium">{vehicle.name}</div>
                        <div className="text-sm text-muted-foreground">{getVehicleTypeLabel(vehicle.vehicle_type)}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{getVehicleTypeLabel(vehicle.vehicle_type)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm">{vehicle.license_plate || "Non spécifiée"}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getWorkTimeIcon(vehicle.work_time)}
                      <span>{getWorkTimeDisplay(vehicle.work_time, vehicle.custom_hours)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(vehicle.status)}>
                      {vehicle.status === "active"
                        ? "Actif"
                        : vehicle.status === "maintenance"
                          ? "Maintenance"
                          : vehicle.status === "out_of_service"
                            ? "Hors service"
                            : vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{vehicle.location}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
