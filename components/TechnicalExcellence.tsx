"use client"

import { motion } from "framer-motion"
import { Code, Share2, Layers, Shield, Zap, GitBranch, Terminal } from "lucide-react"

export default function TechnicalExcellence() {
    const principles = [
        {
            title: "SOLID Architecture",
            icon: <Layers className="w-5 h-5 text-blue-400" />,
            desc: "Modular design pattern for maximum scalability."
        },
        {
            title: "Observer Pattern",
            icon: <Share2 className="w-5 h-5 text-green-400" />,
            desc: "Real-time state synchronization across clients."
        },
        {
            title: "Mediator Pattern",
            icon: <GitBranch className="w-5 h-5 text-purple-400" />,
            desc: "Decoupled service communication mesh."
        }
    ]

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-stretch gap-16">
                    {/* Left: Description */}
                    <div className="lg:w-1/2 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 w-fit">
                            <Terminal size={14} className="text-white" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white font-bold">System Core</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
                            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Excellence</span>
                        </h2>
                        <p className="text-gray-100 text-lg leading-relaxed mb-8 font-mono font-bold">
                            &gt;&gt; Executing high-performance protocols...<br />
                            &gt;&gt; Optimizing for 99.9% uptime...<br />
                            &gt;&gt; NextStop architecture initialized.
                        </p>

                        <div className="flex flex-col gap-4">
                            {principles.map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-colors flex items-center gap-4"
                                >
                                    <div className="p-2 rounded-lg bg-black/50">{p.icon}</div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">{p.title}</h3>
                                        <p className="text-white/80 text-xs font-medium">{p.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Mock Terminal/Code */}
                    <div className="lg:w-1/2 w-full">
                        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl font-mono text-sm h-full flex flex-col">
                            {/* Window Actions */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 md:bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 md:bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 md:bg-green-500" />
                                <div className="ml-auto text-xs text-white/70 font-bold">nextstop_core.ts</div>
                            </div>

                            {/* Code Content */}
                            <div className="p-6 text-white space-y-2">
                                <div className="flex gap-4">
                                    <span className="text-white/20 select-none">01</span>
                                    <span><span className="text-purple-400">import</span> <span className="text-blue-400">{`{ Observer }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@nextstop/core'</span>;</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-white/20 select-none">02</span>
                                    <span></span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-white/20 select-none">03</span>
                                    <span><span className="text-purple-400">class</span> <span className="text-yellow-400">TrafficController</span> <span className="text-purple-400">implements</span> Observer <span className="text-blue-400">{`{`}</span></span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-white/20 select-none">04</span>
                                    <span className="pl-4"><span className="text-purple-400">async</span> <span className="text-blue-400">update</span>(signal: <span className="text-yellow-400">Signal</span>) <span className="text-blue-400">{`{`}</span></span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-white/20 select-none">05</span>
                                    <span className="pl-8"><span className="text-gray-400">// Real-time optimization</span></span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-white/20 select-none">06</span>
                                    <span className="pl-8"><span className="text-purple-400">if</span> (signal.congestion &gt; <span className="text-orange-400">0.8</span>) <span className="text-blue-400">{`{`}</span></span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-white/20 select-none">07</span>
                                    <span className="pl-12"><span className="text-purple-400">await</span> <span className="text-blue-400">rerouteFleet</span>(signal.location);</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-white/20 select-none">08</span>
                                    <span className="pl-8"><span className="text-blue-400">{`}`}</span></span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-white/20 select-none">09</span>
                                    <span className="pl-4"><span className="text-blue-400">{`}`}</span></span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-white/20 select-none">10</span>
                                    <span><span className="text-blue-400">{`}`}</span></span>
                                </div>
                                <div className="flex gap-4 border-t border-white/5 pt-2 mt-4">
                                    <span className="text-green-500 animate-pulse">➜</span>
                                    <span className="text-white">Compiling modules... <span className="text-green-500">Done (0.42s)</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
