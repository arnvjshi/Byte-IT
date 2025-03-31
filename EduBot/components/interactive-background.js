import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useThree } from "@react-three/fiber"
import { MathUtils } from "three"
import * as THREE from "three"

const particleCount = 300
const particleSize = 0.02

export default function InteractiveBackground() {
  const mesh = useRef()
  const particlesMesh = useRef()
  const { mouse, viewport } = useThree()
  
  // Generate particles data
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * 10 - 5
      const y = Math.random() * 10 - 5
      const z = Math.random() * 10 - 5
      
      // Assign random speed values for each particle
      const vx = Math.random() * 0.01 - 0.005
      const vy = Math.random() * 0.01 - 0.005
      const vz = Math.random() * 0.01 - 0.005
      
      // Random initial rotation
      const rotationSpeed = Math.random() * 0.01

      temp.push({ x, y, z, vx, vy, vz, rotationSpeed })
    }
    return temp
  }, [])
  
  // Create geometry with particles
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = particles[i].x
      positions[i3 + 1] = particles[i].y
      positions[i3 + 2] = particles[i].z
      
      // Blue gradient colors
      colors[i3] = 0
      colors[i3 + 1] = 0.3 + Math.random() * 0.3
      colors[i3 + 2] = 0.5 + Math.random() * 0.5
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    return geometry
  }, [particles])

  useFrame((state, delta) => {
    if (!mesh.current || !particlesMesh.current) return
    
    // Gentle rotation of the main mesh
    mesh.current.rotation.x += delta * 0.05
    mesh.current.rotation.y += delta * 0.075
    
    // Follow mouse movements with slight delay
    mesh.current.position.x = MathUtils.lerp(
      mesh.current.position.x,
      mouse.x * viewport.width * 0.125,
      0.03
    )
    mesh.current.position.y = MathUtils.lerp(
      mesh.current.position.y,
      mouse.y * viewport.height * 0.125,
      0.03
    )
    
    // Update particles
    const positions = particlesMesh.current.geometry.attributes.position.array
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Update position based on velocity
      positions[i3] += particles[i].vx
      positions[i3 + 1] += particles[i].vy
      positions[i3 + 2] += particles[i].vz
      
      // Boundaries check with wrapping
      if (positions[i3] > 5) positions[i3] = -5
      else if (positions[i3] < -5) positions[i3] = 5
      
      if (positions[i3 + 1] > 5) positions[i3 + 1] = -5
      else if (positions[i3 + 1] < -5) positions[i3 + 1] = 5
      
      if (positions[i3 + 2] > 5) positions[i3 + 2] = -5
      else if (positions[i3 + 2] < -5) positions[i3 + 2] = 5
      
      // Apply slight attraction toward mouse position
      const dx = mouse.x * viewport.width * 0.25 - positions[i3]
      const dy = mouse.y * viewport.height * 0.25 - positions[i3 + 1]
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 2) {
        positions[i3] += dx * 0.001
        positions[i3 + 1] += dy * 0.001
      }
    }
    
    particlesMesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group ref={mesh}>
      {/* Central glowing orb */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="#1e40af" 
          emissive="#3b82f6"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      
      {/* Particle system */}
      <points ref={particlesMesh} geometry={particlesGeometry}>
        <pointsMaterial 
          size={particleSize} 
          vertexColors 
          transparent 
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>
      
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#2563eb" 
          transparent={true} 
          opacity={0.05} 
        />
      </mesh>
    </group>
  )
}