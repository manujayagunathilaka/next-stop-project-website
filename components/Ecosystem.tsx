"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Smartphone, Cloud, Cpu, ArrowUp, Activity } from "lucide-react"

export default function Ecosystem() {
    const [hoveredLayer, setHoveredLayer] = useState<number | null>(null)

    const layers = [
        {
            id: 3,
            label: "APPLICATION LAYER",
            title: "Passenger Experience",
            icon: <Smartphone className="text-white" size={24} />,
            color: "from-blue-500 to-cyan-500",
            desc: "Flutter App • React Web • PWA"
        },
        {
            id: 2,
            label: "CLOUD INFRASTRUCTURE",
            title: "The Brain (AI Core)",
            icon: <Cloud className="text-white" size={24} />,
            color: "from-purple-500 to-indigo-500",
            desc: "Neural Networks • Predictive Engine"
        },
        {
            id: 1,
            label: "HARDWARE EDGE",
            title: "IoT Telemetry Grid",
            icon: <Cpu className="text-white" size={24} />,
            color: "from-orange-500 to-red-500",
            desc: "ESP32 Sensors • GPS • 4G Modems"
        }
    ]

    return (
        <section className="py-24 bg-black relative">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row gap-16 items-center">

                    {/* Left: Description */}
                    <div className="md:w-1/2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
                            <Activity size={14} className="text-green-500" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white font-bold">Full Stack Architecture</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
                            Vertical Integration. <br />
                            <span className="text-white">Hardware to Cloud.</span>
                        </h2>
                        <p className="text-gray-100 text-lg max-w-lg mb-8 font-medium">
                            We own the entire stack. From the soldering on the GPS tracker to the neural network predicting your arrival time.
                        </p>
                    </div>

                    {/* Right: Stack Visual */}
                    <div className="md:w-1/2 w-full flex flex-col items-center gap-4 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[28px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent border-l border-dashed border-white/20" />

                        {layers.map((layer) => (
                            <motion.div
                                key={layer.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                onMouseEnter={() => setHoveredLayer(layer.id)}
                                onMouseLeave={() => setHoveredLayer(null)}
                                className={`relative w-full p-1 rounded-2xl bg-gradient-to-r ${layer.color} transition-all duration-300 ${hoveredLayer === layer.id ? 'scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'opacity-90'}`}
                            >
                                <div className="bg-black/90 backdrop-blur-xl rounded-xl p-6 flex items-center gap-6 h-full relative z-10">
                                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${layer.color} flex items-center justify-center shrink-0 shadow-lg`}>
                                        {layer.icon}
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono text-white uppercase tracking-widest mb-1 font-bold">{layer.label}</div>
                                        <h3 className="text-xl font-bold text-white mb-1">{layer.title}</h3>
                                        <p className="text-white text-xs font-mono font-bold">{layer.desc}</p>
                                    </div>
                                    <div className="ml-auto opacity-20">
                                        <ArrowUp size={20} className="text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
