"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import { sriLankaDistricts } from "./SriLankaPaths"

import ColomboMap from "./ColomboMap"

export default function HeroMap() {
    const [isMobile, setIsMobile] = useState(false)
    const [zoomed, setZoomed] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)

        const timer = setTimeout(() => setZoomed(true), 2000)
        return () => {
            clearTimeout(timer)
            window.removeEventListener("resize", checkMobile)
        }
    }, [])

    // Desktop: Scale 15, x: 3000, y: -3375
    // Mobile: Scale 6, x: 1200, y: -1350 (Calculated based on target offset (-200, +225))
    const zoomProps = isMobile
        ? { scale: 6, x: 1200, y: -1350 }
        : { scale: 15, x: 3000, y: -3375 }

    return (
        <div className="w-full h-full bg-black relative overflow-hidden font-sans">
            {/* Base Grid (Faint) */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Container for the Zoom Animation */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ scale: 0.8, x: 0, y: 0 }}
                animate={{
                    scale: zoomed ? zoomProps.scale : 0.8,
                    x: zoomed ? zoomProps.x : 0,
                    y: zoomed ? zoomProps.y : 0
                }}
                transition={{ duration: 6, ease: "easeInOut" }}
            >
                <div className="relative w-[1000px] h-[1000px]">

                    {/* SRI LANKA MAP (Detailed Districts) */}
                    <motion.svg
                        width="1000" height="1000" viewBox="0 0 1000 1000"
                        className="absolute top-0 left-0 overflow-visible"
                        animate={{ opacity: zoomed ? 0 : 1 }} // Fade out country map completely
                        transition={{ duration: 2, delay: 2 }}
                    >
                        {sriLankaDistricts.map((district) => (
                            <motion.path
                                key={district.id}
                                d={district.d}
                                fill={district.id === "LK11" ? "#00ffff" : "#0f172a"}
                                stroke={district.id === "LK11" ? "#00ffff" : "#1e40af"}
                                strokeWidth={district.id === "LK11" ? "2" : "1"}
                            />
                        ))}
                    </motion.svg>

                    {/* COLOMBO DETAILED MAP (Revealed on Zoom) */}
                    {/* Positioned over Colombo district area */}
                    <motion.div
                        className="absolute w-[200px] h-[150px] overflow-visible"
                        style={{ top: '650px', left: '200px' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: zoomed ? 1 : 0 }}
                        transition={{ duration: 2, delay: 3 }}
                    >
                        <ColomboMap className="w-full h-full" />
                    </motion.div>

                </div>
            </motion.div>

            {/* Overlay UI */}
            <div className="absolute top-24 left-24 z-10 pointer-events-none hidden md:block">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 4 }}
                    className="bg-black/90 backdrop-blur-xl border border-cyan-500/30 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
                        <span className="text-sm font-bold text-cyan-100 tracking-[0.2em]">COLOMBO GRID</span>
                    </div>
                    <div className="text-4xl font-mono text-white font-bold tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        OPTIMIZED
                    </div>
                    <div className="flex items-center justify-between mt-2 gap-8">
                        <div>
                            <div className="text-cyan-500/50 text-[10px] font-bold tracking-widest mb-1">TRAFFIC FLOW</div>
                            <div className="text-xl text-cyan-400 font-mono">98%</div>
                        </div>
                        <div>
                            <div className="text-magenta-500/50 text-[10px] text-fuchsia-500/50 font-bold tracking-widest mb-1">CONGESTION</div>
                            <div className="text-xl text-fuchsia-400 font-mono">LOW</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
