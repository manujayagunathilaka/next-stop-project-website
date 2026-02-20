"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send, Info } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black pt-24 pb-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[128px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] opacity-20 bg-[length:100%_4px,6px_100%]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
                        <Info size={14} className="text-white" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 font-bold">Communication Link</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black font-heading text-white mb-6 tracking-tight">
                        Establish <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Connection.</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto font-medium">
                        Initiate a secure channel with the Nexora team. Whether for partnership inquiries, system reports, or general feedback.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group h-full flex flex-col"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />

                        <h2 className="text-2xl font-bold text-white mb-8 font-heading">Transmission Form</h2>

                        <form className="space-y-6 flex-grow flex flex-col justify-between">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Identity</label>
                                    <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Frequency (Email)</label>
                                    <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Subject</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors appearance-none">
                                    <option className="bg-black">General Inquiry</option>
                                    <option className="bg-black">System Bug Report</option>
                                    <option className="bg-black">Partnership Proposal</option>
                                    <option className="bg-black">Investor Relations</option>
                                </select>
                            </div>

                            <div className="space-y-2 flex-grow">
                                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Message Payload</label>
                                <textarea rows={5} placeholder="Type your message..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors resize-none h-full min-h-[150px]" />
                            </div>

                            <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group mt-4">
                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                Transmit Data
                            </button>
                        </form>
                    </motion.div>

                    {/* Checkpoints Info - Unified Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group h-full flex flex-col"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 opacity-50" />

                        <h2 className="text-2xl font-bold text-white mb-8 font-heading">Communication Channels</h2>

                        <div className="space-y-8 flex-grow flex flex-col justify-center">
                            {/* Operations Base */}
                            <div className="flex items-start gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                    <MapPin className="text-blue-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Operations Base</h3>
                                    <p className="text-gray-400 font-medium leading-relaxed">
                                        Nexora HQ<br />
                                        123 Innovation Drive, Colombo 03<br />
                                        Sri Lanka
                                    </p>
                                </div>
                            </div>

                            {/* Digital Signal */}
                            <div className="flex items-start gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                    <Mail className="text-green-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Digital Signal</h3>
                                    <p className="text-gray-400 font-medium mb-1">High-priority signal line.</p>
                                    <a href="mailto:hello@nextstop.lk" className="text-white font-bold hover:text-green-400 transition-colors border-b border-white/20 hover:border-green-400 pb-0.5">
                                        hello@nextstop.lk
                                    </a>
                                </div>
                            </div>

                            {/* Voice Comms */}
                            <div className="flex items-start gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                                    <Phone className="text-purple-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Voice Comms</h3>
                                    <p className="text-gray-400 font-medium mb-1">Mon-Fri, 9am - 5pm IST</p>
                                    <a href="tel:+94112345678" className="text-white font-bold hover:text-purple-400 transition-colors border-b border-white/20 hover:border-purple-400 pb-0.5">
                                        +94 11 234 5678
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
