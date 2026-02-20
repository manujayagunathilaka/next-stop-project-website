
"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic";
import { Section } from "./ui/Section";

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white/50">Loading Map...</div>
});

export default function About() {
    return (
        <section id="about" className="relative overflow-hidden">
            {/* Background - using Section wrapper logic but custom for full width background if needed, 
                 but keeping it consistent with other sections. 
                 Using Section component to enforce width consistency. 
             */}
            <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left scale-110 z-0 pointer-events-none" />

            <Section className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-3 py-1 mb-4 rounded-full border border-secondary/20 bg-secondary/10 text-secondary text-sm font-medium">
                            Our Mission
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
                            Revolutionizing Sri Lanka&apos;s <br />
                            <span className="text-secondary">Public Transit</span>
                        </h2>
                        <p className="text-white/70 mb-6 leading-relaxed">
                            NextStop is developed for the <span className="text-white font-bold">National Transport Commission (NTC)</span> and Private Bus Associations to solve the chronic unpredictability of the current system.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Real-time GPS tracking for every bus",
                                "AI-driven arrival times (95% accuracy)",
                                "Automated passenger counting",
                                "Multilingual voice assistance (Sinhala/Tamil)"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/80">
                                    <span className="w-2 h-2 rounded-full bg-secondary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button className="text-sm font-bold text-secondary hover:text-white transition-colors underline decoration-secondary underline-offset-4">
                            Read Full Proposal &rarr;
                        </button>
                    </motion.div>
                </div>

                <div className="w-full md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl h-[400px]"
                    >
                        <Map />

                        {/* Floating Stats Overlay */}
                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur border border-white/10 p-4 rounded-lg z-[400]">
                            <div className="text-xs text-secondary mb-1">Active Buses</div>
                            <div className="text-2xl font-bold font-mono">1,248</div>
                        </div>
                    </motion.div>
                </div>
            </Section>
        </section>
    )
}
