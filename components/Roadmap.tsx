"use client"

import CyberTrack from "./3d/CyberTrack"

export default function Roadmap() {
    return (
        <section className="py-24 bg-background relative overflow-hidden min-h-[80vh] flex items-center">
            {/* 3D Rail Track / Road Background */}
            <div className="absolute inset-0 z-0 opacity-60">
                {/* Placeholder for Rail Scene */}
                <CyberTrack />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Title */}
                    <div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white mb-6 leading-tight">
                            The Road <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Ahead</span>
                        </h2>
                        <p className="text-white text-lg max-w-md">
                            We are building the infrastructure for the next generation of transit.
                        </p>
                    </div>

                    {/* Right: Timeline */}
                    <div className="relative border-l-2 border-primary/30 pl-10 md:pl-8 py-4 space-y-12 ml-4 md:ml-0">
                        {/* Item 1 */}
                        <div className="relative group">
                            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-primary border-4 border-black box-content shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:scale-125 transition-transform" />
                            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">National Integration</h3>
                            <p className="text-white text-lg">Merging bus networks with Sri Lanka Railways API for a unified travel experience.</p>
                        </div>

                        {/* Item 2 */}
                        <div className="relative group">
                            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white border-4 border-black box-content group-hover:scale-125 transition-transform" />
                            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">Universal Tap-to-Pay</h3>
                            <p className="text-white text-lg">One unified card for Bus, Train, and Highway driven by NFC technology.</p>
                        </div>

                        {/* Item 3 */}
                        <div className="relative group">
                            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white/20 border-4 border-black box-content group-hover:scale-125 transition-transform" />
                            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors">Autonomous Pilot</h3>
                            <p className="text-white text-lg">Testing AI-driven traffic management systems within Colombo Port City.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
