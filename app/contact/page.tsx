"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, MapPin, Phone, Send, Info, CheckCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react"

const SUBJECTS = ["General Inquiry", "System Bug Report", "Partnership Proposal", "Investor Relations"]

function SubjectDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    return (
        <div ref={ref} className="relative">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all hover:border-white/20 cursor-pointer"
            >
                <span className="text-sm">{value}</span>
                <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 w-full mt-2 bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/60"
                    >
                        {SUBJECTS.map((s, i) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => { onChange(s); setOpen(false) }}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-3 group
                                    ${value === s
                                        ? "text-blue-400 bg-blue-500/10"
                                        : "text-gray-300 hover:text-white hover:bg-white/5"
                                    }
                                    ${i !== 0 ? "border-t border-white/5" : ""}
                                `}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${value === s ? "bg-blue-400" : "bg-white/10 group-hover:bg-white/30"
                                    }`} />
                                {s}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" })
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMsg, setErrorMsg] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")
        setErrorMsg("")

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong.")
            }

            setStatus("success")
            setForm({ name: "", email: "", subject: "General Inquiry", message: "" })
        } catch (err: unknown) {
            setStatus("error")
            setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.")
        }
    }

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

                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex-grow flex flex-col items-center justify-center text-center gap-4 py-12"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                                        <CheckCircle className="text-green-400" size={36} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Transmission Sent!</h3>
                                    <p className="text-gray-400 max-w-xs">Your message has been received. We&apos;ll get back to you shortly.</p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="mt-4 px-6 py-2.5 rounded-lg border border-white/10 text-white/70 text-sm hover:bg-white/5 transition-colors"
                                    >
                                        Send Another
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6 flex-grow flex flex-col justify-between"
                                >
                                    <div className="space-y-6 flex-grow">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Identity</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="John Doe"
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Frequency (Email)</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="john@example.com"
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Subject</label>
                                            <SubjectDropdown
                                                value={form.subject}
                                                onChange={(v) => setForm(prev => ({ ...prev, subject: v }))}
                                            />
                                        </div>

                                        <div className="space-y-2 flex-grow">
                                            <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Message Payload</label>
                                            <textarea
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                required
                                                rows={5}
                                                placeholder="Type your message..."
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-colors resize-none min-h-[150px]"
                                            />
                                        </div>
                                    </div>

                                    {status === "error" && (
                                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                            <AlertCircle size={16} className="shrink-0" />
                                            {errorMsg}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Transmitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                                Transmit Data
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
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
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-widest">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                        Address — Coming Soon
                                    </span>
                                </div>
                            </div>

                            {/* Digital Signal */}
                            <div className="flex items-start gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                    <Mail className="text-green-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Digital Signal</h3>
                                    <p className="text-gray-400 font-medium mb-3">High-priority signal line.</p>
                                    <a
                                        href="mailto:nexora.io.dev@gmail.com"
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono font-bold tracking-widest hover:bg-green-500/20 transition-colors"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        nexora.io.dev@gmail.com
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
                                    <p className="text-gray-400 font-medium mb-3">Mon-Fri, 9am - 5pm IST</p>
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold uppercase tracking-widest">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                        Phone — Pending Setup
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
