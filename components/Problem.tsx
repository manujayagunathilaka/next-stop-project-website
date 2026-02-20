"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { AlertTriangle, Clock } from "lucide-react"

export default function Problem() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const timeWasted = useTransform(scrollYProgress, [0, 0.5], [0, 60])
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
    const y = useTransform(scrollYProgress, [0, 0.3], [100, 0])

    return (
        <section ref={containerRef} className="py-24 bg-black relative overflow-hidden min-h-[80vh] flex items-center justify-center">
            {/* Tech Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <motion.div style={{ y }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 mb-6">
                                <AlertTriangle size={14} className="text-red-500" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400">Inefficiency Detected</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 leading-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                Time is <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Currency.</span>
                                <br />
                                Stop burning it.
                            </h2>

                            <div className="space-y-6 border-l-2 border-white/10 pl-6">
                                <p className="text-white text-xl leading-relaxed max-w-lg font-medium">
                                    The average commuter wastes <span className="text-white font-bold border-b border-red-500">30-60 minutes daily</span> in transit limbo.
                                </p>
                                <p className="text-gray-100 text-lg font-medium">
                                    That's <span className="text-red-500 font-bold font-mono text-xl">240 hours</span> of life lost to inefficiency every single year.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Clock Animation - Digital HUD Style */}
                    <div className="lg:w-1/2 flex justify-center">
                        <div className="relative group">
                            {/* Spinning Rings */}
                            <div className="absolute inset-0 border-2 border-dashed border-red-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                            <div className="absolute -inset-4 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                            <div className="relative w-72 h-72 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.2)] group-hover:shadow-[0_0_80px_rgba(220,38,38,0.4)] transition-shadow duration-500">
                                <Clock className="text-red-500 mb-4 opacity-80" size={32} />

                                <span className="text-red-500/60 text-xs font-mono tracking-[0.3em] mb-2 uppercase">Daily Loss</span>
                                <div className="flex items-baseline gap-1">
                                    <motion.div className="text-7xl font-bold font-mono text-white tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                                        <TimeDisplay value={timeWasted} />
                                    </motion.div>
                                    <span className="text-xl font-bold text-white/80">mins</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function TimeDisplay({ value }: { value: any }) {
    const ref = useRef<HTMLSpanElement>(null)

    // Subscribe to value updates to update standard DOM element
    value.on("change", (latest: number) => {
        if (ref.current) {
            ref.current.textContent = Math.round(latest).toString().padStart(2, '0')
        }
    })

    return <span ref={ref}>00</span>
}
