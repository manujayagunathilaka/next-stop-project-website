"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Sustainability() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"])

    const pillars = [
        {
            year: "Phase 1",
            title: "Commissions",
            desc: "Small transaction fee on ticket bookings.",
            growth: "30%"
        },
        {
            year: "Phase 2",
            title: "NextStop Pro",
            desc: "Subscription for fleet advanced analytics.",
            growth: "55%"
        },
        {
            year: "Phase 3",
            title: "Data Insights",
            desc: "Urban planning data for NTC & Govt.",
            growth: "85%"
        }
    ]

    return (
        <section ref={containerRef} className="py-32 bg-black relative">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[128px] pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-6xl font-bold font-heading mb-6 text-white">
                        Sustainable <span className="text-secondary drop-shadow-[0_0_15px_rgba(255,140,0,0.6)]">Growth</span>
                    </h2>
                    <p className="text-white text-lg">A robust business model designed for longevity.</p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Timeline Line Base */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 rounded-full md:-translate-x-1/2" />

                    {/* Timeline Line Active (Animated) */}
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-secondary via-primary to-accent shadow-[0_0_15px_rgba(255,140,0,0.5)] rounded-full md:-translate-x-1/2 origin-top"
                    />

                    <div className="space-y-20">
                        {pillars.map((pillar, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: i * 0.2 }}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                            >
                                {/* Content Card */}
                                <div className="w-full md:w-5/12 ml-12 md:ml-0 group">
                                    <div className="relative p-6 md:p-8 rounded-3xl border border-white/10 bg-[#0a0a0a] backdrop-blur-xl hover:bg-black hover:border-secondary/50 transition-all duration-500 hover:-translate-y-1 shadow-xl">
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="text-xs font-mono font-bold text-secondary px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">{pillar.year}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-green-400 font-bold font-mono text-sm shadow-green-500/20 drop-shadow-sm">+{pillar.growth}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">{pillar.title}</h3>
                                        <p className="text-white leading-relaxed group-hover:text-white transition-colors text-sm md:text-base">{pillar.desc}</p>
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="relative z-10 w-8 h-8 rounded-full bg-black border-4 border-secondary shadow-[0_0_20px_rgba(255,140,0,0.8)] md:left-[0.5px] hidden md:flex items-center justify-center shrink-0">
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                </div>

                                {/* Empty Space for symmetry */}
                                <div className="w-full md:w-5/12 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
