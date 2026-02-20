"use client"

import { Mail, Phone, MapPin, Github, Twitter, Linkedin, ArrowRight } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Footer() {
    const pathname = usePathname()

    if (pathname?.startsWith("/dashboard")) {
        return null
    }

    return (
        <footer className="py-20 bg-black border-t border-white/10 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-[-50%] right-[-20%] w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[128px]" />
            </div>

            <div className="container px-4 relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <a href="/" className="flex items-center gap-2 mb-6">
                            <span className="text-2xl font-bold font-heading tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">NextStop</span>
                        </a>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                            Constructing the digital nervous system for Sri Lanka's public transport network.
                        </p>
                        <div className="flex gap-4">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-primary transition-colors border border-white/5">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-mono text-sm uppercase tracking-wider">Product</h4>
                        <ul className="space-y-4 text-sm text-gray-300 font-medium">
                            {["Features", "Ecosystem", "Hardware", "Security", "Pricing"].map((link, i) => (
                                <li key={i}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 font-mono text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-300 font-medium">
                            {["About Nexora", "Team", "Proposal", "Careers", "Contact"].map((link, i) => (
                                <li key={i}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-mono text-sm uppercase tracking-wider">Stay Updated</h4>
                        <p className="text-gray-400 text-sm mb-4 font-medium">Join our dev newsletter for system updates.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-primary/50 w-full"
                            />
                            <button className="bg-primary hover:bg-primary/80 text-white rounded-lg px-3 flex items-center justify-center transition-colors">
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono font-bold">
                    <p>&copy; 2026 Group Nexora. All code open-sourced.</p>
                    <div className="flex gap-6">
                        <span>v2.4.0-BETA</span>
                        <span>SERVER: ONLINE</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
