"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X, Globe, Radio, ChevronRight } from "lucide-react"

export default function Navbar() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("")

    // Helper to set active tab based on route
    const setActiveRoute = (path: string) => {
        if (path === "/") setActiveTab("HOME")
        else if (path === "/proposal") setActiveTab("PROPOSAL")
        else if (path === "/team") setActiveTab("TEAM")
        else if (path === "/contact") setActiveTab("CONTACT")
    }

    // Handle Scroll for Translucency
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Initial Path Check
    useEffect(() => {
        setActiveRoute(pathname)
    }, [pathname])

    const handleNavClick = (name: string) => {
        setActiveTab(name)
        setMobileOpen(false)
    }

    const navItems = [
        { name: "HOME", href: "/" },
        { name: "PROPOSAL", href: "/proposal" },
        { name: "TEAM", href: "/team" },
        { name: "CONTACT", href: "/contact" },
    ]

    // We need a ref for immediate feedback without re-renders blocking the logic
    // Using a simple timeout workaround in the click handler

    // Hide Navbar on specific routes (like the Dashboard)
    if (pathname?.startsWith("/dashboard")) {
        return null
    }

    return (
        <>
            {/* DYNAMIC ISLAND NAV CONTAINER */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none w-full max-w-5xl px-4"
            >
                <div
                    className={`pointer-events-auto flex items-center justify-between p-2 rounded-full border transition-all duration-300 ease-out backdrop-blur-xl
                    ${scrolled
                            ? "bg-black/60 border-white/10 shadow-2xl"
                            : "bg-black/40 border-white/5"
                        }
                    `}
                >
                    {/* 1. BRAND IDENTITY (Compact) */}
                    <Link href="/" className="flex items-center gap-3 px-3 group">
                        <div className="relative p-1.5 rounded-full bg-white border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            <img src="/nextstop-logo.png" alt="NextStop Logo" className="h-4 w-auto" />
                        </div>
                        <span className="hidden sm:block text-sm font-black font-heading tracking-tight text-white leading-none">
                            NEXTSTOP
                        </span>
                    </Link>

                    {/* 2. NAVIGATION LINKS (Dynamic Pill) */}
                    <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => handleNavClick(item.name)}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-bold font-mono transition-all relative z-10 ${activeTab === item.name ? "text-black" : "text-white hover:text-gray-300"
                                    }`}
                            >
                                {activeTab === item.name && (
                                    <motion.span
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-white rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* 3. RIGHT CONTROLS */}
                    <div className="flex items-center gap-3 px-3">

                        {/* Status Ticker (Compact) */}
                        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/10">
                            <Radio size={10} className="text-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">ONLINE</span>
                        </div>

                        {/* CTA Button */}
                        <Link href="/download" className="hidden sm:flex group items-center gap-1 bg-white text-black text-xs font-black px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all">
                            GET APP
                            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 text-white bg-white/10 rounded-full border border-white/20"
                        >
                            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay (Separate from Island) */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed top-24 left-4 right-4 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl z-[9990] flex flex-col gap-2 origin-top"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => {
                                    setMobileOpen(false)
                                    setActiveTab(item.name)
                                }}
                                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white text-white hover:text-black transition-all border border-white/5 group"
                            >
                                <span className="font-bold font-mono tracking-wider">{item.name}</span>
                                <ChevronRight size={16} className="text-white group-hover:text-black transition-colors" />
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
