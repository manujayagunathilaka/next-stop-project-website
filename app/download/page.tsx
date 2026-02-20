"use client"

import { motion } from "framer-motion"
import { Apple, Smartphone, Download, CheckCircle, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function DownloadPage() {
    const [progress, setProgress] = useState(0)

    // Synthentic "download/install" progress simulation for effect
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100;
                }
                return prev + Math.floor(Math.random() * 15)
            })
        }, 800)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Tech Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 p-32 bg-purple-500/10 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="w-24 h-24 mx-auto bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        <Download size={40} className="text-white animate-pulse" />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black font-heading text-white mb-6 uppercase tracking-tight">
                        Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">System Install</span>
                    </h1>

                    <p className="text-gray-300 text-lg max-w-2xl mx-auto font-mono mb-8">
                        &gt; Establishing secure connection...<br />
                        &gt; Select your operating environment below.
                    </p>
                </motion.div>

                {/* Progress Simulation */}
                <div className="max-w-md mx-auto mb-16 relative">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-green-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear" }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-mono text-gray-500">
                        <span>INSTALL_WIZARD_V2.4.0</span>
                        <span className="text-green-500">{progress}% COMPLETE</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
                    {/* iOS Button */}
                    <a href="#" className="group relative overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 flex items-center gap-4 text-left">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center p-2">
                                <img src="/appstore.svg" alt="App Store" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Download on the</div>
                                <div className="text-xl font-bold text-white leading-none">App Store</div>
                            </div>
                            <div className="ml-auto">
                                <Download size={20} className="text-white/30 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </a>

                    {/* Android Button */}
                    <a href="#" className="group relative overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 flex items-center gap-4 text-left">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center p-2">
                                <img src="/playstore.svg" alt="Google Play" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Get it on</div>
                                <div className="text-xl font-bold text-white leading-none">Google Play</div>
                            </div>
                            <div className="ml-auto">
                                <Download size={20} className="text-white/30 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </a>
                </div>

                {/* Fleet Owner Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-4xl mx-auto border-t border-white/10 pt-12"
                >
                    <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="text-left">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                                        For Fleet Owners
                                    </span>
                                </div>
                                <h2 className="text-3xl font-bold font-heading text-white mb-2">Manage Your Entire Fleet</h2>
                                <p className="text-gray-300 max-w-md">
                                    Experience real-time tracking, route optimization, and driver analytics. Try the live admin dashboard demo.
                                </p>
                            </div>

                            <Link href="/dashboard" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                Live Admin Demo
                                <Loader2 size={18} className="animate-spin" /> {/* Replacing arrow with activity/loader icon for 'live' feel or just arrow */}
                            </Link>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="text-xs text-gray-500 font-mono">
                        System Requirements: iOS 15.0+ or Android 10.0+<br />
                        Secure Hash: SHA-256 Verified
                    </p>
                </div>

            </div>
        </div>
    )
}
