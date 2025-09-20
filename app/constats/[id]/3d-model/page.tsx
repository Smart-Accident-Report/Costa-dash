"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF, Html, Text } from "@react-three/drei"
import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Car accident model component
function CarAccidentModel() {
  const { scene } = useGLTF("/models/car-accident.glb")
  try {
    return <primitive object={scene} scale={[2, 2, 2]} position={[0, -1, 0]} />
  } catch (error) {
    console.error("[v0] Error loading 3D model:", error)
    return (
      <Text position={[0, 0, 0]} fontSize={0.5} color="red" anchorX="center" anchorY="middle">
        Modèle 3D non disponible
      </Text>
    )
  }
}

// Loading component
function ModelLoader() {
  return (
    <Html center>
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-sm text-gray-600">Chargement du modèle 3D...</span>
      </div>
    </Html>
  )
}

// Damage markers component
function DamageMarkers() {
  const markers = [
    { position: [1.5, 0.5, 1], label: "Impact avant", severity: "Élevé" },
    { position: [-1.2, 0.3, 0.5], label: "Rayure latérale", severity: "Moyen" },
    { position: [0, 0.8, -2], label: "Pare-brise fissuré", severity: "Faible" },
  ]

  return (
    <>
      {markers.map((marker, index) => (
        <Html key={index} position={marker.position}>
          <div className="bg-red-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            <div className="font-semibold">{marker.label}</div>
            <div className="text-xs opacity-90">Gravité: {marker.severity}</div>
          </div>
        </Html>
      ))}
    </>
  )
}

export default function AccidentModel3DPage({ params }: { params: { id: string } }) {
  const [showDamageMarkers, setShowDamageMarkers] = useState(true)
  const { scene } = useGLTF("/models/car-accident.glb")

  // Mock accident data
  const accidentData = {
    id: params.id,
    date: "15 Mars 2024",
    location: "Avenue des Champs-Élysées, Paris",
    vehicleModel: "Peugeot 308",
    driverName: "Marie Dubois",
    damageEstimate: "€3,500",
    status: "En cours d'expertise",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/constats">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour aux constats
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Modèle 3D - Constat {params.id}</h1>
                <p className="text-sm text-gray-500">Visualisation de l'accident</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setShowDamageMarkers(!showDamageMarkers)}>
                {showDamageMarkers ? "Masquer" : "Afficher"} les dégâts
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 3D Viewer */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="h-[600px] relative">
                <Canvas
                  camera={{ position: [5, 3, 5], fov: 50 }}
                  style={{ background: "linear-gradient(to bottom, #87CEEB, #f0f8ff)" }}
                >
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <pointLight position={[-10, -10, -5]} intensity={0.5} />

                  <Suspense fallback={<ModelLoader />}>
                    <primitive object={scene} scale={[2, 2, 2]} position={[0, -1, 0]} />
                    {showDamageMarkers && <DamageMarkers />}
                  </Suspense>

                  <Environment preset="city" />
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={2}
                    maxDistance={20}
                  />
                </Canvas>

                {/* Controls overlay */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>🖱️ Clic gauche + glisser: Rotation</div>
                    <div>🖱️ Clic droit + glisser: Déplacement</div>
                    <div>⚙️ Molette: Zoom</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accident Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations de l'accident</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <p className="text-sm text-gray-900">{accidentData.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Lieu</label>
                  <p className="text-sm text-gray-900">{accidentData.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Véhicule</label>
                  <p className="text-sm text-gray-900">{accidentData.vehicleModel}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conducteur</label>
                  <p className="text-sm text-gray-900">{accidentData.driverName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Estimation des dégâts</label>
                  <p className="text-sm font-semibold text-red-600">{accidentData.damageEstimate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Statut</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {accidentData.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Points de dégâts identifiés</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-red-900">Impact avant</p>
                    <p className="text-xs text-red-600">Gravité: Élevé</p>
                  </div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-orange-900">Rayure latérale</p>
                    <p className="text-xs text-orange-600">Gravité: Moyen</p>
                  </div>
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Pare-brise fissuré</p>
                    <p className="text-xs text-yellow-600">Gravité: Faible</p>
                  </div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
