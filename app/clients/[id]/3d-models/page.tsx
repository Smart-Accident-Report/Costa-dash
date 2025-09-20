"use client"

import { useParams, useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera, Html } from "@react-three/drei"
import { Suspense, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCcw, ZoomIn, Car, Info } from "lucide-react"

// Mock client data (in real app, this would come from API)
const mockClients = [
  {
    id: "CLI-001",
    name: "Jean Dupont",
    carBrand: "Peugeot",
    carModel: "308",
    policyNumber: "POL-2024-001",
    status: "active",
  },
  {
    id: "CLI-002",
    name: "Marie Martin",
    carBrand: "Renault",
    carModel: "Clio",
    policyNumber: "POL-2024-002",
    status: "active",
  },
  {
    id: "CLI-003",
    name: "Pierre Durand",
    carBrand: "Citroën",
    carModel: "C4",
    policyNumber: "POL-2024-003",
    status: "suspended",
  },
]

// 3D Car Model Component
function CarModel({ carBrand, position = [0, 0, 0] }: { carBrand: string; position?: [number, number, number] }) {
  const [hovered, setHovered] = useState(false)

  // Different colors for different car brands
  const getCarColor = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "peugeot":
        return "#1e40af" // blue
      case "renault":
        return "#dc2626" // red
      case "citroën":
        return "#059669" // green
      case "volkswagen":
        return "#7c3aed" // purple
      case "bmw":
        return "#374151" // gray
      default:
        return "#1f2937" // dark gray
    }
  }

  return (
    <group position={position}>
      {/* Car Body */}
      <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} scale={hovered ? 1.1 : 1}>
        <boxGeometry args={[4, 1.5, 2]} />
        <meshStandardMaterial color={getCarColor(carBrand)} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Car Roof */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3, 1, 1.8]} />
        <meshStandardMaterial color={getCarColor(carBrand)} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wheels */}
      <mesh position={[-1.3, -1, 0.8]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[1.3, -1, 0.8]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-1.3, -1, -0.8]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[1.3, -1, -0.8]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* Windows */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[2.8, 0.8, 1.6]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} />
      </mesh>

      {/* Brand Label */}
      <Html position={[0, 2.5, 0]} center>
        <div className="bg-white px-2 py-1 rounded shadow-lg text-sm font-medium">{carBrand}</div>
      </Html>
    </group>
  )
}

// Loading component for 3D scene
function SceneLoader() {
  return (
    <Html center>
      <div className="flex items-center gap-2 text-white">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        Loading 3D Models...
      </div>
    </Html>
  )
}

export default function Client3DModelsPage() {
  const params = useParams()
  const router = useRouter()
  const clientId = params.id as string

  // Find client data
  const client = mockClients.find((c) => c.id === clientId)

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Client Not Found</CardTitle>
            <CardDescription>The requested client could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const statusColors = {
    active: "bg-green-100 text-green-800",
    suspended: "bg-red-100 text-red-800",
    inactive: "bg-gray-100 text-gray-800",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">3D Vehicle Models</h2>
            <p className="text-muted-foreground">Interactive 3D showcase for {client.name}'s vehicle</p>
          </div>
        </div>
      </div>

      {/* Client Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Client Vehicle Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Client Name</label>
              <p className="text-sm font-semibold">{client.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Vehicle</label>
              <p className="text-sm font-semibold">
                {client.carBrand} {client.carModel}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Policy Number</label>
              <p className="text-sm font-semibold">{client.policyNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <Badge className={statusColors[client.status as keyof typeof statusColors]}>{client.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3D Scene */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ZoomIn className="h-5 w-5" />
            Interactive 3D Model
          </CardTitle>
          <CardDescription>Use your mouse to rotate, zoom, and explore the 3D vehicle model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[600px] bg-gradient-to-b from-sky-200 to-sky-50 rounded-lg overflow-hidden">
            <Canvas>
              <Suspense fallback={<SceneLoader />}>
                <PerspectiveCamera makeDefault position={[8, 4, 8]} />
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={5}
                  maxDistance={20}
                />

                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} />

                {/* Environment */}
                <Environment preset="city" />

                {/* Ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                  <planeGeometry args={[20, 20]} />
                  <meshStandardMaterial color="#e5e7eb" />
                </mesh>

                {/* Main Car Model */}
                <CarModel carBrand={client.carBrand} position={[0, 0, 0]} />

                {/* Additional showcase models */}
                <CarModel carBrand="Peugeot" position={[-8, 0, 0]} />
                <CarModel carBrand="Renault" position={[8, 0, 0]} />
                <CarModel carBrand="Citroën" position={[0, 0, -8]} />
              </Suspense>
            </Canvas>
          </div>
        </CardContent>
      </Card>

      {/* Controls Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            3D Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
              <span>
                <strong>Rotate:</strong> Left click + drag
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ZoomIn className="h-4 w-4 text-muted-foreground" />
              <span>
                <strong>Zoom:</strong> Mouse wheel or right click + drag
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-muted-foreground" />
              <span>
                <strong>Pan:</strong> Middle click + drag
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
