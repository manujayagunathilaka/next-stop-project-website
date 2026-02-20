"use client"

import { motion } from "framer-motion"
import { Users, Bus, TrendingUp, ShieldCheck, Clock, BarChart3 } from "lucide-react"

interface ImpactCardProps {
    title: string
    role: string
    stats: string[]
    description: string
    icon: React.ReactNode
    color: string
}

const cards: ImpactCardProps[] = [
    {
        role: "Passengers",
        title: "Peace of Mind",
        stats: ["Real-time ETAs", "Bus Fullness Status", "Digital Payments"],
        description: "No more guessing games. Know exactly when your bus arrives, check seat availability in advance, and pay seamlessly with a tap.",
        icon: <Users className="w-10 h-10" />,
        color: "from-secondary to-orange-600"
    },
    {
        role: "Fleet Owners",
        title: "Maximize Revenue",
        stats: ["Fuel Analytics", "Revenue Optimization", "Predictive Maintenance"],
        description: "Transform your fleet into a smart business. Monitor fuel usage, optimize routes for maximum occupancy, and predict repairs before breakdowns occur.",
        icon: <Bus className="w-10 h-10" />,
        color: "from-primary to-blue-600"
    },
    {
        role: "Authorities (NTC)",
        title: "Data-Driven Control",
        stats: ["Congestion Heatmaps", "Route Optimization", "Digital Infrastructure"],
        description: "Gain a bird's-eye view of the entire transit network. Use real-time data to solve congestion, plan smarter routes, and modernize national infrastructure.",
        icon: <TrendingUp className="w-10 h-10" />,
        color: "from-accent to-cyan-600"
    }
]

export default function StakeholderImpact() {
    return (
        <section className="py-32 bg-black relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-primary/5 to-black opacity-20" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 text-white">
                        Impact Across the <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">Network</span>
                    </h2>
                    <p className="text-white max-w-2xl mx-auto text-lg">
                        Creating value for everyone in the ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {cards.map((card, index) => (
                        <div key={index} className="group min-h-[500px] h-auto perspective-1000 cursor-pointer relative">
                            <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 bg-transparent min-h-[500px]">
                                {/* Front Face */}
                                <div className="absolute inset-0 backface-hidden rounded-3xl glass-panel border border-white/10 p-10 flex flex-col items-center justify-center text-center bg-[#0a0a0a] backdrop-blur-md shadow-2xl">
                                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500`}>
                                        {card.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{card.role}</h3>
                                    <p className="text-white uppercase tracking-[0.2em] text-sm font-bold drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]">{card.title}</p>

                                    <div className="mt-8 text-white text-xs flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-white" />
                                        Hover to reveal
                                        <div className="w-1 h-1 rounded-full bg-white" />
                                    </div>
                                </div>

                                {/* Back Face */}
                                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl glass-panel border border-white/20 p-8 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                    <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-3 w-full text-center">{card.role}</h3>

                                    <p className="text-white text-center text-sm leading-relaxed mb-6">
                                        {card.description}
                                    </p>

                                    <ul className="space-y-3 w-full">
                                        {card.stats.map((stat, i) => (
                                            <li key={i} className="flex items-center gap-3 text-left group/item">
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color} shadow-[0_0_10px_currentColor] group-hover/item:scale-125 transition-transform`} />
                                                <span className="text-white font-medium text-sm">{stat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
