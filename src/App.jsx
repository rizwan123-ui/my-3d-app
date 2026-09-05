import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'

function ConfigurableSphere({ color, wireframe, roughness }) {
  return (
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        roughness={roughness}
        metalness={0.2}
      />
    </mesh>
  )
}

export default function App() {
  const [color, setColor] = useState('#2563eb')
  const [wireframe, setWireframe] = useState(false)
  const [roughness, setRoughness] = useState(0.3)

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0f172a', color: '#fff', display: 'flex' }}>
      {/* 3D Canvas */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <ConfigurableSphere color={color} wireframe={wireframe} roughness={roughness} />
            </Stage>
            <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={true} />
          </Suspense>
        </Canvas>
      </div>

      {/* Configurator Controls Panel */}
      <div style={{ width: '280px', padding: '24px', background: '#1e293b', borderLeft: '1px solid #334155' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>3D Configurator</h2>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: '100%', height: '40px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Roughness ({roughness})</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={roughness}
            onChange={(e) => setRoughness(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            id="wireframe"
            checked={wireframe}
            onChange={(e) => setWireframe(e.target.checked)}
          />
          <label htmlFor="wireframe" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>Wireframe Mode</label>
        </div>
      </div>
    </div>
  )
}