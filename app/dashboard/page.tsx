"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, LayoutDashboard, Activity, Users, Map as MapIcon, Settings, Bell, Search, Filter, MoreVertical, Battery, Signal, Navigation, AlertTriangle, CheckCircle2, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const DashboardMap = dynamic(() => import("@/components/DashboardMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-[#111] text-gray-500 animate-pulse">
            Loading Satellite Uplink...
        </div>
    ),
})

// --- TYPES ---
type ViewType = 'OVERVIEW' | 'MAP' | 'FLEET' | 'DRIVERS' | 'SETTINGS'
type Theme = 'light' | 'dark'

// --- MOCK DATA ---
const FLEET_DATA = [
    { id: "ND 4957", route: "138 - Pettah", status: "ACTIVE", bat: 85, speed: 42, driver: "S. Perera", location: "Kollupitiya" },
    { id: "ND 5523", route: "120 - Horana", status: "ACTIVE", bat: 62, speed: 38, driver: "M. Fernan", location: "Nugegoda" },
    { id: "NB 3381", route: "177 - Kaduwela", status: "IDLE", bat: 98, speed: 0, driver: "K. Silva", location: "Depot" },
    { id: "NC 1024", route: "100 - Panadura", status: "MAINTENANCE", bat: 12, speed: 0, driver: "-", location: "Workshop" },
    { id: "ND 8892", route: "154 - Kiribathgoda", status: "ACTIVE", bat: 45, speed: 28, driver: "A. Raj", location: "Borella" },
    { id: "NA 4421", route: "138 - Homagama", status: "ACTIVE", bat: 78, speed: 55, driver: "T. De Mel", location: "High Level Rd" },
]

const DRIVER_DATA = [
    { id: "D-01", name: "S. Perera", rating: 4.8, hours: 142, incidents: 0, status: "ON DUTY" },
    { id: "D-02", name: "M. Fernando", rating: 4.5, hours: 120, incidents: 1, status: "ON DUTY" },
    { id: "D-03", name: "K. Silva", rating: 4.9, hours: 165, incidents: 0, status: "BREAK" },
    { id: "D-04", name: "A. Raj", rating: 4.2, hours: 98, incidents: 2, status: "ON DUTY" },
]

export default function DashboardPage() {
    const [currentView, setCurrentView] = useState<ViewType>('OVERVIEW')
    const [currentTime, setCurrentTime] = useState<Date | null>(null)
    const [notifications, setNotifications] = useState(3)
    const [theme, setTheme] = useState<Theme>('dark')
    const [toasts, setToasts] = useState<Array<{ id: number, message: string, type: 'success' | 'error' | 'warning' | 'info' }>>([])
    const [showNotifications, setShowNotifications] = useState(false)
    const [notificationHistory, setNotificationHistory] = useState<Array<{ id: number, message: string, type: 'success' | 'error' | 'warning' | 'info' }>>([])

    // Trigger Random Notifications
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance every 8s
                const msgs = [
                    { m: "New Passenger Connected", t: 'success' },
                    { m: "Bus ND 4957 High Latency", t: 'warning' },
                    { m: "Route 177 Deviation Detected", t: 'error' },
                    { m: "Driver shift ended: S. Perera", t: 'info' },
                    { m: "System Backup Completed", t: 'success' },
                    { m: "Bus ND 5523 Critical Battery", t: 'error' },
                ] as const;
                const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
                addToast(randomMsg.m, randomMsg.t);
            }
        }, 8000)
        return () => clearInterval(interval)
    }, [])

    const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
        const id = Date.now()
        const newNotification = { id, message, type };
        setToasts(prev => [...prev, newNotification])
        setNotificationHistory(prev => [...prev, newNotification].slice(-20)) // Keep last 20
        setNotifications(prev => prev + 1)
    }

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    // Clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // Theme Management
    useEffect(() => {
        const root = document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }

        // Cleanup on unmount to restore dark mode (NextStop default)
        return () => root.classList.add('dark')
    }, [theme])

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white flex overflow-hidden font-sans transition-colors duration-300">

            {/* --- SIDEBAR --- */}
            <aside className="w-20 lg:w-64 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#050505] flex flex-col transition-all duration-300 z-50">
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-gray-200 dark:border-white/5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center dark:bg-white dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        <img src="/nextstop-logo.png" alt="Logo" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="ml-3 font-heading font-black text-lg hidden lg:block tracking-tight text-gray-900 dark:text-white">
                        NEXTSTOP<span className="text-gray-500 text-xs align-top ml-1">ADMIN</span>
                    </span>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-8 px-2 lg:px-4 space-y-2">
                    <NavButton
                        active={currentView === 'OVERVIEW'}
                        icon={<LayoutDashboard size={20} />}
                        label="Overview"
                        onClick={() => setCurrentView('OVERVIEW')}
                    />
                    <NavButton
                        active={currentView === 'MAP'}
                        icon={<MapIcon size={20} />}
                        label="Live Map"
                        onClick={() => setCurrentView('MAP')}
                    />
                    <NavButton
                        active={currentView === 'FLEET'}
                        icon={<Navigation size={20} />}
                        label="Fleet Status"
                        onClick={() => setCurrentView('FLEET')}
                    />
                    <NavButton
                        active={currentView === 'DRIVERS'}
                        icon={<Users size={20} />}
                        label="Drivers"
                        onClick={() => setCurrentView('DRIVERS')}
                    />
                    <NavButton
                        active={currentView === 'SETTINGS'}
                        icon={<Settings size={20} />}
                        label="Settings"
                        onClick={() => setCurrentView('SETTINGS')}
                    />
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-gray-200 dark:border-white/5 space-y-2">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 dark:hover:text-white transition-all w-full"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        <span className="hidden lg:block font-mono text-sm">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>

                    <Link href="/" className="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-red-500/70 hover:text-red-500 transition-all group w-full">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden lg:block font-mono text-sm">Exit Dashboard</span>
                    </Link>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-gray-50 dark:bg-black selection:bg-blue-500/20">

                {/* Toast Container */}
                <div className="absolute top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none p-4">
                    <AnimatePresence>
                        {toasts.map(toast => (
                            <Toast
                                key={toast.id}
                                message={toast.message}
                                type={toast.type}
                                onClose={() => removeToast(toast.id)}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Top Header */}
                <header className="h-20 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-8 bg-white/80 dark:bg-black/50 backdrop-blur-md z-40 sticky top-0 transition-colors duration-300">
                    <div>
                        <h2 className="text-xl font-bold font-heading text-gray-900 dark:text-white">{
                            currentView === 'OVERVIEW' ? 'Mission Control' :
                                currentView === 'MAP' ? 'Real-Time Surveillance' :
                                    currentView === 'FLEET' ? 'Fleet Management' :
                                        currentView === 'DRIVERS' ? 'Personnel' : 'System Config'
                        }</h2>
                        <p className="text-xs text-gray-500 font-mono hidden md:block">
                            {currentTime ? (
                                <>{currentTime.toLocaleDateString()} — {currentTime.toLocaleTimeString()}</>
                            ) : (
                                <span className="opacity-0">Loading...</span>
                            )}
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Search Bar */}
                        <div className="hidden md:flex items-center bg-gray-100 dark:bg-white/5 rounded-full px-4 py-2 border border-gray-200 dark:border-white/10 focus-within:border-blue-500 dark:focus-within:border-white/30 transition-colors w-64">
                            <Search size={14} className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search units, drivers..."
                                className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600"
                            />
                        </div>

                        {/* Status Pill */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/20 border border-green-500/20 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] font-mono text-green-700 dark:text-green-400 font-bold tracking-wider">ONLINE</span>
                        </div>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <Bell size={20} />
                                {notifications > 0 && (
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-black" />
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 top-12 w-80 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 back"
                                    >
                                        <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                                            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Notifications</h3>
                                            <button onClick={() => setNotificationHistory([])} className="text-xs text-blue-500 hover:underline">Clear all</button>
                                        </div>
                                        <div className="max-h-[300px] overflow-y-auto">
                                            {notificationHistory.length === 0 ? (
                                                <div className="p-8 text-center text-gray-500 text-xs">No new notifications</div>
                                            ) : (
                                                notificationHistory.slice().reverse().map((note) => (
                                                    <div key={note.id} className="p-3 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex gap-3">
                                                        <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${note.type === 'error' ? 'bg-red-500' :
                                                            note.type === 'warning' ? 'bg-yellow-500' :
                                                                note.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                                                            }`} />
                                                        <div>
                                                            <p className="text-xs font-medium text-gray-900 dark:text-gray-200 leading-snug">{note.message}</p>
                                                            <p className="text-[10px] text-gray-500 mt-1">{new Date(note.id).toLocaleTimeString()}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* User Avatar */}
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 border-2 border-white dark:border-white/10 shadow-md" />
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentView}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            {currentView === 'OVERVIEW' && <OverviewView />}
                            {currentView === 'MAP' && <MapView theme={theme} />}
                            {currentView === 'FLEET' && <FleetView />}
                            {currentView === 'DRIVERS' && <DriversView />}
                            {currentView === 'SETTINGS' && <SettingsView theme={theme} setTheme={setTheme} />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}

// --- SUB-COMPONENTS ---

// --- TOAST COMPONENT ---
function Toast({ message, type, onClose }: { message: string, type: 'success' | 'error' | 'warning' | 'info', onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md pointer-events-auto min-w-[300px]
                ${type === 'success' ? 'bg-green-100 dark:bg-green-900/80 border-green-200 dark:border-green-500/30' :
                    type === 'error' ? 'bg-red-100 dark:bg-red-900/80 border-red-200 dark:border-red-500/30' :
                        type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/80 border-yellow-200 dark:border-yellow-500/30' :
                            'bg-white dark:bg-[#111]/80 border-gray-200 dark:border-white/10'
                }`}
        >
            <div className={`p-2 rounded-full 
                ${type === 'success' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                    type === 'error' ? 'bg-red-500/20 text-red-700 dark:text-red-400' :
                        type === 'warning' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
                            'bg-blue-500/20 text-blue-700 dark:text-blue-400'
                }`}>
                {type === 'success' ? <CheckCircle2 size={18} /> :
                    type === 'error' ? <AlertTriangle size={18} /> :
                        type === 'warning' ? <AlertTriangle size={18} /> :
                            <Bell size={18} />}
            </div>
            <div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white capitalize">{type} Alert</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">{message}</p>
            </div>
            <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <div className="sr-only">Close</div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </motion.div>
    )
}

function NavButton({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${active
                ? "bg-black dark:bg-white text-white dark:text-black font-bold shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
        >
            <div className="relative z-10 flex items-center gap-4 justify-center lg:justify-start w-full lg:w-auto">
                {icon}
                <span className="hidden lg:block text-sm">{label}</span>
            </div>
            {active && (
                <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-black dark:bg-white z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
        </button>
    )
}

// 1. OVERVIEW
function OverviewView() {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value="$12,450" change="+12%" icon={<Activity className="text-green-500 dark:text-green-400" />} />
                <StatCard title="Active Fleet" value="48/52" change="92%" icon={<Navigation className="text-blue-500 dark:text-blue-400" />} />
                <StatCard title="Total Passengers" value="8,240" change="+5%" icon={<Users className="text-purple-500 dark:text-purple-400" />} />
                <StatCard title="System Health" value="98.5%" change="Stable" icon={<Activity className="text-yellow-500 dark:text-yellow-400" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* MAIN CHART AREA */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Weekly Ridership Bar Chart */}
                    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Weekly Passenger Volume</h3>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white">Week</span>
                                <span className="px-3 py-1 text-xs rounded-full bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer">Month</span>
                            </div>
                        </div>
                        {/* CSS-only Bar Chart simulation */}
                        <div className="h-64 flex items-end justify-between gap-4 px-2">
                            {[45, 72, 58, 85, 62, 95, 78].map((h, i) => (
                                <div key={i} className="w-full bg-gray-100 dark:bg-white/5 rounded-t-lg relative group overflow-hidden h-full flex items-end">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 dark:from-blue-900/50 dark:to-blue-500 rounded-t-lg group-hover:from-blue-500 group-hover:to-cyan-300 transition-all relative"
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white bg-black/80 px-2 py-1 rounded border border-white/20 z-10">
                                            {h * 124}
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono">
                            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                        </div>
                    </div>

                    {/* Revenue Line Chart Simulation */}
                    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Revenue Trend</h3>
                            <div className="text-green-500 font-bold text-sm flex items-center gap-1">
                                +14.2% <Activity size={12} />
                            </div>
                        </div>
                        <div className="h-48 relative w-full flex items-end overflow-hidden">
                            {/* SVG Line Chart */}
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="gradientRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <motion.path
                                    d="M0,150 C50,140 100,100 150,110 C200,120 250,80 300,70 C350,60 400,90 450,80 C500,70 550,40 600,20 L600,200 L0,200 Z"
                                    fill="url(#gradientRevenue)"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 2 }}
                                />
                                <motion.path
                                    d="M0,150 C50,140 100,100 150,110 C200,120 250,80 300,70 C350,60 400,90 450,80 C500,70 550,40 600,20"
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Right Column: Activity & Drivers */}
                <div className="space-y-8">
                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl p-6 h-fit shadow-sm">
                        <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Live Alerts</h3>
                        <div className="space-y-4">
                            {[
                                { msg: "Bus NC 1024 reported engine fault", type: "error", time: "2m ago" },
                                { msg: "Route 138 congestion alert", type: "warning", time: "15m ago" },
                                { msg: "Driver Check-in: S. Perera", type: "success", time: "24m ago" },
                                { msg: "Payment Gateway Synced", type: "success", time: "1h ago" },
                                { msg: "Unit ND 8892 deviated from route", type: "warning", time: "1h 12m ago" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors border-b border-gray-100 dark:border-white/5 last:border-0">
                                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${item.type === 'error' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                                        item.type === 'warning' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'
                                        }`} />
                                    <div>
                                        <p className="text-sm font-medium leading-tight text-gray-900 dark:text-gray-200">{item.msg}</p>
                                        <p className="text-[10px] text-gray-500 mt-1 font-mono uppercase tracking-wide">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-2 text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-all">
                            VIEW ALL LOGS
                        </button>
                    </div>

                    {/* Top Driver Mini-Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-black border border-blue-100 dark:border-blue-500/20 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Users size={16} className="text-blue-500 dark:text-blue-400" />
                            <h3 className="font-bold text-sm text-blue-900 dark:text-blue-100">Top Performing Driver</h3>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-blue-500" />
                            <div>
                                <p className="font-bold text-lg leading-none text-gray-900 dark:text-white">K. Silva</p>
                                <p className="text-xs text-blue-600/70 dark:text-blue-300/70 font-mono mt-1">ID: D-03 • 98% Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, change, icon }: any) {
    return (
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:border-gray-300 dark:hover:border-white/20 transition-colors group shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-xl text-gray-900 dark:text-white group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${change.includes('+') ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400'}`}>
                    {change}
                </span>
            </div>
            <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</h4>
            <div className="text-2xl font-black font-mono text-gray-900 dark:text-white">{value}</div>
        </div>
    )
}

// 2. LIVE MAP
function MapView({ theme }: { theme: 'light' | 'dark' }) {
    return (
        <div className="h-full w-full rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden relative group">
            {/* Map Container - Pass Theme */}
            <DashboardMap className="w-full h-full" theme={theme} />

            {/* Overlay UI */}
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md border border-gray-200 dark:border-white/10 p-4 rounded-xl space-y-2 z-10 w-64 shadow-lg">
                <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Fleet Filters</h4>
                <div className="flex items-center justify-between text-sm text-gray-900 dark:text-white">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /> Active</span>
                    <span className="font-mono">42</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-900 dark:text-white">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Idle</span>
                    <span className="font-mono">6</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-900 dark:text-white">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" /> Maintenance</span>
                    <span className="font-mono">4</span>
                </div>
            </div>
        </div>
    )
}

// 3. FLEET
function FleetView() {
    return (
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col h-full shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Vehicle Status</h3>
                <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                    + Add Vehicle
                </button>
            </div>
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs uppercase font-mono sticky top-0 backdrop-blur-md">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Route</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Driver</th>
                            <th className="p-4">Location</th>
                            <th className="p-4 text-right">Battery</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-sm text-gray-900 dark:text-white">
                        {FLEET_DATA.map((bus) => (
                            <tr key={bus.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                <td className="p-4 font-mono font-bold">{bus.id}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">{bus.route}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold border ${bus.status === 'ACTIVE' ? 'bg-green-100 dark:bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400' :
                                        bus.status === 'MAINTENANCE' ? 'bg-red-100 dark:bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400' :
                                            'bg-yellow-100 dark:bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-400'
                                        }`}>
                                        {bus.status}
                                    </span>
                                </td>
                                <td className="p-4 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-white/10" />
                                    {bus.driver}
                                </td>
                                <td className="p-4 text-gray-500 dark:text-gray-400 font-mono">{bus.location}</td>
                                <td className="p-4 text-right font-mono text-xs">
                                    <div className="flex items-center justify-end gap-2">
                                        {bus.bat}%
                                        <div className="w-16 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500" style={{ width: `${bus.bat}%` }} />
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// 4. DRIVERS
function DriversView() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DRIVER_DATA.map((driver) => (
                <div key={driver.id} className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:border-gray-300 dark:hover:border-white/30 transition-all group shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-black border border-gray-100 dark:border-white/20" />
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${driver.status === 'ON DUTY' ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                            }`}>
                            {driver.status}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{driver.name}</h3>
                    <p className="text-xs text-gray-500 font-mono mb-4">ID: {driver.id}</p>

                    <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/5">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Rating</span>
                            <span className="font-bold flex items-center gap-1 text-gray-900 dark:text-white">
                                {driver.rating} <span className="text-yellow-500">★</span>
                            </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Hours Logged</span>
                            <span className="font-mono text-gray-900 dark:text-white">{driver.hours}h</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Incidents</span>
                            <span className={`font-bold ${driver.incidents > 0 ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'}`}>{driver.incidents}</span>
                        </div>
                    </div>

                    <button className="w-full mt-6 py-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-sm font-bold border border-gray-100 dark:border-white/5 text-gray-900 dark:text-white transition-all">
                        View Profile
                    </button>
                </div>
            ))}
        </div>
    )
}

// 5. SETTINGS
function SettingsView({ theme, setTheme }: { theme: 'light' | 'dark', setTheme: (t: 'light' | 'dark') => void }) {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">System Configuration</h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">Dark Mode</p>
                            <p className="text-xs text-gray-500">Force system-wide dark theme</p>
                        </div>
                        <div
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${theme === 'dark' ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${theme === 'dark' ? 'right-1' : 'left-1'}`} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">Real-Time Data Stream</p>
                            <p className="text-xs text-gray-500">Connect to WebSocket API</p>
                        </div>
                        <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                            <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-md" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between opacity-50">
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">Maintenance Mode</p>
                            <p className="text-xs text-gray-500">Disable passenger app access</p>
                        </div>
                        <div className="w-12 h-6 bg-gray-200 dark:bg-white/10 rounded-full relative cursor-not-allowed">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-white/50 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-6 text-center">
                <AlertTriangle className="text-red-500 mx-auto mb-4" size={32} />
                <h3 className="text-red-500 font-bold mb-2">Danger Zone</h3>
                <p className="text-red-600/70 dark:text-red-400/60 text-sm mb-4">Actions here can cause irreversible data loss.</p>
                <div className="flex justify-center gap-4">
                    <button className="px-4 py-2 bg-red-500 text-white dark:text-black font-bold rounded-lg hover:bg-red-600 dark:hover:bg-red-400 transition-colors">
                        Reset System
                    </button>
                </div>
            </div>
        </div>
    )
}
