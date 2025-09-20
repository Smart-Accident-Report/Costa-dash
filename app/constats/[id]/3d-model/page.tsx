"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCcw, ZoomIn, ZoomOut, Move3D } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for the specific constat
const getConstatById = (id: string) => {
  const mockConstats = [
    {
      id: "CST-2024-001",
      date: "2024-01-15",
      time: "14:30",
      location: "Avenue des Champs-Élysées, Paris 8e",
      clients: ["Jean Dupont", "Marie Martin"],
      status: "pending",
      severity: "minor",
      vehicleCount: 2,
      description: "Collision arrière lors d'un freinage d'urgence",
      damageDescription: "Dommages au pare-chocs arrière et phares avant",
    },
    {
      id: "CST-2024-002",
      date: "2024-01-14",
      time: "09:15",
      location: "Place Bellecour, Lyon 2e",
      clients: ["Pierre Durand", "Sophie Leroy"],
      status: "validated",
      severity: "moderate",
      vehicleCount: 2,
      description: "Accrochage lors d'un changement de voie",
      damageDescription: "Rayures sur les portières et rétroviseur endommagé",
    },
  ]
  return mockConstats.find((c) => c.id === id) || mockConstats[0]
}

function AccidentCarModel() {
  const { scene } = useGLTF("/models/car-accident.glb")
  const meshRef = useRef<any>()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return <primitive ref={meshRef} object={scene} scale={[2, 2, 2]} position={[0, -1, 0]} />
}

function DamageMarkers() {
  return (
    <>
      {/* Front damage marker */}
      <Html position={[2, 0.5, 1]} center>
        <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg">Impact frontal</div>
      </Html>

      {/* Side damage marker */}
      <Html position={[-1.5, 0.3, 0]} center>
        <div className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg">
          Rayures latérales
        </div>
      </Html>

      {/* Rear damage marker */}
      <Html position={[0, 0.5, -2]} center>
        <div className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg">
          Pare-chocs endommagé
        </div>
      </Html>
    </>
  )
}

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  validated: "bg-green-100 text-green-800",
  closed: "bg-blue-100 text-blue-800",
}

const severityColors = {
  minor: "bg-green-100 text-green-800",
  moderate: "bg-yellow-100 text-yellow-800",
  major: "bg-red-100 text-red-800",
}

export default function Constat3DModelPage() {
  const params = useParams()
  const constatId = params.id as string
  const constat = getConstatById(constatId)
  const [controlsEnabled, setControlsEnabled] = useState(true)

  const resetCamera = () => {
    // This would reset the camera position in a real implementation
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/constats">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Constats
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">3D Accident Model</h1>
                <p className="text-muted-foreground">Constat {constat.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={statusColors[constat.status as keyof typeof statusColors]}>{constat.status}</Badge>
              <Badge className={severityColors[constat.severity as keyof typeof severityColors]}>
                {constat.severity}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D Viewer */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Move3D className="h-5 w-5" />
                      3D Vehicle Model
                    </CardTitle>
                    <CardDescription>Interactive 3D view of the damaged vehicle</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={resetCamera}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setControlsEnabled(!controlsEnabled)}>
                      {controlsEnabled ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[600px] bg-gradient-to-b from-sky-100 to-sky-50 rounded-lg overflow-hidden">
                  <Canvas camera={{ position: [5, 3, 5], fov: 50 }} shadows>
                    <Suspense
                      fallback={
                        <Html center>
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                            <p className="text-sm text-muted-foreground">Loading 3D model...</p>
                          </div>
                        </Html>
                      }
                    >
                      <ambientLight intensity={0.6} />
                      <directionalLight
                        position={[10, 10, 5]}
                        intensity={1}
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                      />
                      <pointLight position={[-10, -10, -10]} intensity={0.3} />

                      <AccidentCarModel />
                      <DamageMarkers />

                      <Environment preset="city" />

                      <OrbitControls
                        enabled={controlsEnabled}
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={3}
                        maxDistance={15}
                      />

                      {/* Ground plane */}
                      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
                        <planeGeometry args={[20, 20]} />
                        <meshStandardMaterial color="#f0f0f0" />
                      </mesh>
                    </Suspense>
                  </Canvas>
                </div>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Controls:</strong> Click and drag to rotate • Scroll to zoom • Right-click and drag to pan
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Accident Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Accident Details</CardTitle>
                <CardDescription>Information about this incident</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Date & Time</label>
                  <p className="text-sm text-muted-foreground">
                    {constat.date} at {constat.time}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <p className="text-sm text-muted-foreground">{constat.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Involved Parties</label>
                  <div className="mt-1 space-y-1">
                    {constat.clients.map((client, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        {client}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <p className="text-sm text-muted-foreground">{constat.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Damage Assessment</label>
                  <p className="text-sm text-muted-foreground">{constat.damageDescription}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Damage Markers</CardTitle>
                <CardDescription>Key damage points on the vehicle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Impact frontal - Severe damage</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Rayures latérales - Moderate damage</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Pare-chocs endommagé - Minor damage</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
