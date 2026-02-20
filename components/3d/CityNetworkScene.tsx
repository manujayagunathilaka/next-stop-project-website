"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Tube, Box, useScroll } from '@react-three/drei'
import * as THREE from 'three'

function CityMap() {
    const busRef = useRef<THREE.Group>(null!)

    // Define the Route Path (Simple winding path through "blocks")
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(-40, 0, -40),
            new THREE.Vector3(-10, 0, -40),
            new THREE.Vector3(-10, 0, -10),
            new THREE.Vector3(20, 0, -10),
            new THREE.Vector3(20, 0, 20),
            new THREE.Vector3(40, 0, 20),
            new THREE.Vector3(40, 0, 40),
        ], false, 'catmullrom', 0.5)
    }, [])

    // Generate "Buildings" (Dark blocks around the path)
    const buildings = useMemo(() => {
        const blocks: { pos: [number, number, number], args: [number, number, number] }[] = []
        for (let x = -50; x <= 50; x += 10) {
            for (let z = -50; z <= 50; z += 10) {
                // Simple collision avoidance with path (crude)
                // If close to path nodes, skip
                if (Math.abs(x - -10) < 6 && Math.abs(z - -25) < 20) continue;
                if (Math.abs(x - 20) < 6 && Math.abs(z - 5) < 20) continue;

                // Random height buildings
                const h = Math.random() * 8 + 2
                blocks.push({
                    pos: [x, h / 2, z],
                    args: [8, h, 8]
                })
            }
        }
        return blocks
    }, [])

    useFrame((state) => {
        if (busRef.current) {
            // Animate Bus along curve
            const t = (state.clock.getElapsedTime() * 0.1) % 1
            const position = curve.getPointAt(t)
            const tangent = curve.getTangentAt(t)

            busRef.current.position.copy(position)
            busRef.current.lookAt(position.clone().add(tangent))
        }
    })

    return (
        <group rotation={[Math.PI / 8, Math.PI / 4, 0]}>

            {/* The Route (Glowing Path) */}
            <Tube args={[curve, 64, 0.4, 8, false]}>
                <meshStandardMaterial color="#ff8c00" emissive="#ff8c00" emissiveIntensity={2} toneMapped={false} />
            </Tube>

            {/* The Bus */}
            <group ref={busRef}>
                {/* Bus Body */}
                <Box args={[1.5, 1, 3]} position={[0, 1, 0]}>
                    <meshStandardMaterial color="#ffffff" emissive="#0056b3" emissiveIntensity={0.5} />
                </Box>
                {/* Headlights */}
                <pointLight position={[0, 1, 2]} intensity={2} distance={10} color="#fff" />
                <pointLight position={[0, 1, -2]} intensity={1} distance={5} color="#ff0000" />
            </group>

            {/* City Buildings */}
            {buildings.map((b, i) => (
                <Box key={i} args={b.args} position={b.pos}>
                    <meshStandardMaterial color="#0a0a0a" transparent opacity={0.9} />
                    <lineSegments>
                        <edgesGeometry args={[new THREE.BoxGeometry(...b.args)]} />
                        <lineBasicMaterial color="#1f2937" />
                    </lineSegments>
                </Box>
            ))}

            {/* Ground/Grid */}
            <gridHelper args={[200, 40, 0x1f2937, 0x0a0a0a]} position={[0, 0.1, 0]} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[500, 500]} />
                <meshBasicMaterial color="#000" />
            </mesh>
        </group>
    )
}

export default function CityNetworkScene() {
    return (
        <div className="w-full h-full bg-black/40">
            <Canvas camera={{ position: [0, 40, 40], fov: 45 }} gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}>
                <fog attach="fog" args={['#000', 20, 100]} />
                <ambientLight intensity={0.2} />
                <CityMap />
            </Canvas>
        </div>
    )
}
