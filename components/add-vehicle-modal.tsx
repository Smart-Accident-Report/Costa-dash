"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Loader2 } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"
import { useToast } from "@/hooks/use-toast"

interface AddVehicleModalProps {
  onVehicleAdded: () => void
}

export function AddVehicleModal({ onVehicleAdded }: AddVehicleModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    vehicle_type: "tow_truck",
    license_plate: "",
    location: "",
    work_time: "day",
    custom_hours: { start: "", end: "" },
    status: "active",
  })
  const { toast } = useToast()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const vehicleData = {
        ...formData,
        custom_hours:
          formData.work_time === "custom" && formData.custom_hours.start && formData.custom_hours.end
            ? formData.custom_hours
            : null,
      }

      const { error } = await supabase.from("vehicles").insert([vehicleData])

      if (error) throw error

      toast({
        title: "Véhicule ajouté",
        description: "Le véhicule a été ajouté avec succès.",
      })

      setFormData({
        name: "",
        vehicle_type: "tow_truck",
        license_plate: "",
        location: "",
        work_time: "day",
        custom_hours: { start: "", end: "" },
        status: "active",
      })
      setOpen(false)
      onVehicleAdded()
    } catch (error) {
      console.error("Error adding vehicle:", error)
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout du véhicule.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un véhicule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau véhicule</DialogTitle>
          <DialogDescription>Remplissez les informations du véhicule de dépannage.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                placeholder="Dépanneuse Alpha"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle_type" className="text-right">
                Type
              </Label>
              <Select
                value={formData.vehicle_type}
                onValueChange={(value) => setFormData({ ...formData, vehicle_type: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tow_truck">Dépanneuse</SelectItem>
                  <SelectItem value="service_van">Véhicule de service</SelectItem>
                  <SelectItem value="emergency_vehicle">Véhicule d'urgence</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="license_plate" className="text-right">
                Plaque
              </Label>
              <Input
                id="license_plate"
                value={formData.license_plate}
                onChange={(e) => setFormData({ ...formData, license_plate: e.target.value })}
                className="col-span-3"
                placeholder="DEP-001-MA"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Localisation
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="col-span-3"
                placeholder="Casablanca"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="work_time" className="text-right">
                Horaire
              </Label>
              <Select
                value={formData.work_time}
                onValueChange={(value) => setFormData({ ...formData, work_time: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Jour (8h-17h)</SelectItem>
                  <SelectItem value="night">Nuit (20h-6h)</SelectItem>
                  <SelectItem value="24h">24h/24</SelectItem>
                  <SelectItem value="custom">Personnalisé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.work_time === "custom" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Heures</Label>
                <div className="col-span-3 flex gap-2">
                  <Input
                    type="time"
                    value={formData.custom_hours.start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        custom_hours: { ...formData.custom_hours, start: e.target.value },
                      })
                    }
                    placeholder="Début"
                  />
                  <Input
                    type="time"
                    value={formData.custom_hours.end}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        custom_hours: { ...formData.custom_hours, end: e.target.value },
                      })
                    }
                    placeholder="Fin"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Statut
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="out_of_service">Hors service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Ajouter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
