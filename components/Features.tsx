"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Zap, EyeOff, Fingerprint } from "lucide-react"
import HolographicShield from "./3d/HolographicShield"
import { useEffect, useState } from "react"

export default function Features() {
    const [minutesSaved, setMinutesSaved] = useState(12450)

    useEffect(() => {
        const interval = setInterval(() => {
            setMinutesSaved(prev => prev + Math.floor(Math.random() * 5))
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section id="features" className="py-24 bg-black relative overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
                        Privacy First. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Always.</span>
                    </h2>
                    <p className="text-gray-100 max-w-xl mx-auto font-medium text-lg">
                        We built NextStop with a "Zero-Knowledge" architecture. We don't know who you are, or where you're going.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 max-w-6xl mx-auto h-auto md:h-[600px]">
                    {/* ITEM 1: MAIN HOLOGRAPHIC (Large Square) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="col-span-1 md:col-span-2 md:row-span-2 relative rounded-3xl border border-white/20 bg-[#0a0a0a] backdrop-blur-xl overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 transition-opacity group-hover:opacity-80" />

                        <div className="absolute top-8 left-8 z-20">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4 border border-primary/30">
                                <Shield className="text-primary w-5 h-5" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Private by Default</h3>
                            <p className="text-white text-sm max-w-[200px] font-medium">Your location data is processed locally on your device. Never uploaded.</p>
                        </div>

                        <div className="absolute inset-0 top-20 scale-125 md:scale-100">
                            <HolographicShield />
                        </div>
                    </motion.div>

                    {/* ITEM 2: LIVE METRICS (Wide) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="col-span-1 md:col-span-2 md:row-span-1 relative rounded-3xl border border-white/20 bg-[#0a0a0a] backdrop-blur-xl p-8 flex flex-col justify-between overflow-hidden group hover:border-white/30 transition-colors"
                    >
                        <div className="absolute top-0 right-0 p-32 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />

                        <div className="flex justify-between items-start z-10">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Data Anonymized</h3>
                                <p className="text-white text-xs uppercase tracking-wider font-bold">Live Global Counter</p>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                LIVE
                            </div>
                        </div>

                        <div className="text-5xl md:text-6xl font-mono font-bold text-white tracking-tight z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            {minutesSaved.toLocaleString()}
                        </div>
                    </motion.div>

                    {/* ITEM 3: NO SIGNUP (Small) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="col-span-1 md:col-start-3 md:row-start-2 relative rounded-3xl border border-white/20 bg-[#0a0a0a] backdrop-blur-xl p-6 flex flex-col justify-center gap-4 hover:bg-white/5 transition-colors group"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                            <Fingerprint className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white">No Signup</h4>
                            <p className="text-gray-100 text-sm leading-relaxed mt-1 font-medium">Just download and ride. No account needed.</p>
                        </div>
                    </motion.div>

                    {/* ITEM 4: ENCRYPTION (Small) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="col-span-1 md:col-start-4 md:row-start-2 relative rounded-3xl border border-white/20 bg-[#0a0a0a] backdrop-blur-xl p-6 flex flex-col justify-center gap-4 hover:bg-white/5 transition-colors group"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                            <Lock className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white">AES-256</h4>
                            <p className="text-gray-100 text-sm leading-relaxed mt-1 font-medium">Military-grade encryption for all data transmission.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
