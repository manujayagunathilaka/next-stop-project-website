"use client"

import { motion } from "framer-motion"
import HeroMap from "./HeroMap"
import { Activity, Wifi, Shield, Zap } from "lucide-react"

export default function Hero() {
    return (
        <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-black py-20 md:py-0">
            {/* 2D Animated Map Background */}
            <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
                <HeroMap />
            </div>

            {/* HUD Overlay Grid - Decorative (DISABLED FOR DEBUGGING) */}
            {/* <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute top-24 left-8 border-l-2 border-t-2 border-white/20 w-16 h-16 rounded-tl-3xl opacity-50" />
                <div className="absolute bottom-8 right-8 border-r-2 border-b-2 border-white/20 w-16 h-16 rounded-br-3xl opacity-50" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 background-size-[100%_2px,3px_100%] pointer-events-none opacity-20" />
            </div> */}

            {/* Content Container */}
            <div className="relative z-50 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Main Content Card */}
                    <div className="lg:col-span-7">
                        <motion.div
                            layoutId="hero-card"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "tween", ease: "linear", duration: 0.5 }}
                            className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group"
                        >
                            {/* Glass Glare */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="flex items-center gap-3 mb-6">
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                </span>
                                <span className="text-primary font-mono text-sm uppercase tracking-widest font-black">
                                    System Operational
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black font-heading text-white mb-4 md:mb-6 leading-tight">
                                Transit Intelligence.
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">
                                    Real-Time Control.
                                </span>
                            </h1>

                            <p className="text-xl text-white font-medium mb-8 max-w-xl leading-relaxed tracking-wide">
                                NextStop provides military-grade precision for public transport.
                                Track, predict, and pay with zero latency.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button className="bg-white text-black hover:bg-gray-100 font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95">
                                    Launch App
                                </button>
                                <button className="px-8 py-3.5 rounded-full border border-white/30 hover:bg-white/10 text-white font-bold backdrop-blur-sm transition-all flex items-center gap-2 hover:border-white/60">
                                    <Wifi size={18} />
                                    Live Demo
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Live Status Modules (Decorative) */}
                    <div className="lg:col-span-5 hidden lg:flex flex-col gap-6">
                        {/* Module 1: Network Load */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl border-l-4 border-l-green-500"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-mono text-sm uppercase tracking-wider font-bold">Network Load</h3>
                                <Activity className="text-green-500" size={18} />
                            </div>
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "45%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-green-500"
                                />
                            </div>
                            <div className="flex justify-between text-xs text-white font-mono font-bold">
                                <span>Optimal</span>
                                <span>45% Capacity</span>
                            </div>
                        </motion.div>

                        {/* Module 2: Active Units */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl border-l-4 border-l-secondary"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-white font-mono text-sm uppercase tracking-wider font-bold">Active Units</h3>
                                <Zap className="text-secondary" size={18} />
                            </div>
                            <div className="text-4xl font-black text-white font-mono mb-1">
                                1,248
                            </div>
                            <p className="text-xs text-white font-mono font-bold">Buses online | +12% from avg</p>
                        </motion.div>

                        {/* Module 3: Security */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl border-l-4 border-l-accent"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-white font-mono text-sm uppercase tracking-wider font-bold">Security Layer</h3>
                                <Shield className="text-accent" size={18} />
                            </div>
                            <div className="text-lg font-black text-white font-mono">
                                AES-256 ENCRYPTED
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom HUD Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/20 py-3 hidden md:flex justify-between px-8 text-xs font-mono text-gray-400 z-20">
                <div className="flex gap-6">
                    <span className="text-white">COORD: 6.9271° N, 79.8612° E</span>
                    <span className="text-white">SERVER: AP-SOUTH-1</span>
                </div>
                <div className="flex gap-6">
                    <span className="text-white">VERSION: 2.4.0-BETA</span>
                    <span className="text-green-500 animate-pulse">● LIVE DATA STREAM</span>
                </div>
            </div>
        </section>
    )
}
