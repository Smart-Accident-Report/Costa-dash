"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei"
import { Loader2 } from "lucide-react"

function AccidentCarModel() {
  const { scene } = useGLTF("https://pub-1b339aca4e574480be9f8c2d6de25d74.r2.dev/car-accident.glb")

  return <primitive object={scene} scale={[2, 2, 2]} position={[0, -1, 0]} rotation={[0, Math.PI / 4, 0]} />
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex items-center gap-2 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Loading 3D Model...</span>
      </div>
    </Html>
  )
}

export default function Accident3DViewer() {
  return (
    <div className="w-full h-64 bg-gray-900 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        <Suspense fallback={<LoadingSpinner />}>
          <AccidentCarModel />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={3} maxDistance={15} />
      </Canvas>
    </div>
  )
}
