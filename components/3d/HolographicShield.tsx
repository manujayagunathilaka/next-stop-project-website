"use client"

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Ring } from '@react-three/drei'
import * as THREE from 'three'

function ShieldMesh() {
    const ref = useRef<THREE.Mesh>(null!)
    const ringRef = useRef<THREE.Mesh>(null!)
    const ringRef2 = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (ref.current) {
            // Shield Rotation
            ref.current.rotation.x = t * 0.2
            ref.current.rotation.y = t * 0.3
        }

        // Pulsing Rings (Signal)
        if (ringRef.current) {
            const scale = (t * 0.5) % 2
            ringRef.current.scale.set(scale + 1.5, scale + 1.5, 1)
            if (Array.isArray(ringRef.current.material)) {
                // handle array
            } else {
                (ringRef.current.material as THREE.Material).opacity = 1 - (scale / 2)
            }
        }
        if (ringRef2.current) {
            const scale = ((t * 0.5) + 1) % 2
            ringRef2.current.scale.set(scale + 1.5, scale + 1.5, 1)
            if (Array.isArray(ringRef2.current.material)) {
                // handle array
            } else {
                (ringRef2.current.material as THREE.Material).opacity = 1 - (scale / 2)
            }
        }
    })

    return (
        <group>
            <Sphere args={[1, 100, 200]} scale={1.8} ref={ref}>
                <MeshDistortMaterial
                    color="#0056b3"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0}
                    metalness={1}
                    wireframe
                />
            </Sphere>

            {/* Signal Rings */}
            <Ring args={[0.8, 0.85, 32]} ref={ringRef}>
                <meshBasicMaterial color="#ff8c00" transparent opacity={0.5} side={THREE.DoubleSide} />
            </Ring>
            <Ring args={[0.8, 0.85, 32]} ref={ringRef2}>
                <meshBasicMaterial color="#ff8c00" transparent opacity={0.5} side={THREE.DoubleSide} />
            </Ring>
        </group>
    )
}

export default function HolographicShield() {
    return (
        <div className="w-full h-full">
            <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <ShieldMesh />
            </Canvas>
        </div>
    )
}
