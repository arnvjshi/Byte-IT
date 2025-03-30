"use client"

import { useState } from "react"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"

function Particles({ count = 2000 }) {
  const { theme } = useTheme()
  const mesh = useRef()
  const { size, camera } = useThree()

  const dummy = new THREE.Object3D()
  const particles = new THREE.Object3D()

  // Generate random positions, colors, and scales
  const particlePositions = new Float32Array(count * 3)
  const particleColors = new Float32Array(count * 3)
  const particleSizes = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    particlePositions[i3] = (Math.random() - 0.5) * 10
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 10
    particlePositions[i3 + 2] = (Math.random() - 0.5) * 10

    // Blue-ish colors
    particleColors[i3] = 0.1 + Math.random() * 0.2
    particleColors[i3 + 1] = 0.3 + Math.random() * 0.4
    particleColors[i3 + 2] = 0.7 + Math.random() * 0.3

    particleSizes[i] = Math.random() * 0.5 + 0.1
  }

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.1

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      dummy.position.set(particlePositions[i3], particlePositions[i3 + 1], particlePositions[i3 + 2])

      // Add some movement
      dummy.position.x += Math.sin(time + i * 0.1) * 0.01
      dummy.position.y += Math.cos(time + i * 0.1) * 0.01

      dummy.scale.set(particleSizes[i], particleSizes[i], particleSizes[i])
      dummy.updateMatrix()

      mesh.current.setMatrixAt(i, dummy.matrix)
    }

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={theme === "dark" ? "#4080ff" : "#2060ff"} />
    </instancedMesh>
  )
}

function Scene() {
  const { theme } = useTheme()

  return (
    <>
      <color attach="background" args={[theme === "dark" ? "#0a0a0f" : "#f0f4f8"]} />
      <ambientLight intensity={0.5} />
      <Particles />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </>
  )
}

export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Scene />
    </Canvas>
  )
}

