"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Plane, Cylinder, Text } from '@react-three/drei'
import * as THREE from 'three'

function Milestones() {
    const group = useRef<THREE.Group>(null!)

    // Generate milestones
    const count = 10
    const stones = useMemo(() => {
        return new Array(count).fill(0).map((_, i) => ({
            z: -(i * 20), // Spaced out
            side: i % 2 === 0 ? 1 : -1 // Alternating sides
        }))
    }, [])

    useFrame((state, delta) => {
        if (group.current) {
            // Move entire group forward
            group.current.position.z += delta * 15

            // Loop effect: when group moves too far, reset visually or just loop positions?
            // Simpler: Just move local objects if we want infinite. 
            // Let's rely on the grid modulo for ground, but for stones let's loop them locally
        }
    })

    return (
        <group ref={group}>
            {stones.map((s, i) => (
                <group key={i} position={[s.side * 8, 1, s.z]}>
                    {/* Bus Stop Pole */}
                    <Cylinder args={[0.1, 0.1, 4, 8]} position={[0, 2, 0]}>
                        <meshStandardMaterial color="#333" />
                    </Cylinder>
                    {/* Bus Stop Sign */}
                    <Cylinder args={[1.5, 1.5, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
                        <meshStandardMaterial color="#ff8c00" />
                    </Cylinder>
                    <Cylinder args={[1.2, 1.2, 0.25, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0.05]}>
                        <meshStandardMaterial color="#0056b3" />
                    </Cylinder>
                </group>
            ))}
        </group>
    )

}

function Track() {
    const grid = useRef<THREE.GridHelper>(null!)

    useFrame((state, delta) => {
        if (grid.current) {
            grid.current.position.z += delta * 15
            if (grid.current.position.z > 10) {
                grid.current.position.z = 0
            }
        }
    })

    return (
        <group rotation={[0, 0, 0]} position={[0, -2, 0]}>
            {/* Moving Grid */}
            <gridHelper ref={grid} args={[100, 100, 0xff8c00, 0x333333]} position={[0, 0, 0]} />
            <gridHelper args={[100, 100, 0xff8c00, 0x333333]} position={[0, 0, -100]} />

            <Plane args={[100, 200]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -50]}>
                <meshBasicMaterial color="#050505" />
            </Plane>

            {/* Passing Bus Stops */}
            <Milestones />
        </group>
    )
}

export default function CyberTrack() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 5, 10], fov: 60 }} gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}>
                <fog attach="fog" args={['#000000', 5, 50]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Track />
            </Canvas>
        </div>
    )
}
