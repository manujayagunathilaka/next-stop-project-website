
"use client"
import { motion } from "framer-motion";
import { teamData, groupName } from "@/lib/teamData";
import { Section } from "@/components/ui/Section";
import { Github } from "lucide-react";
import React from 'react';
// import Image from "next/image"; // Commented out image import for now as we don't have images



export default function TeamPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px]" />
            </div>

            <Section className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                        Meet <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{groupName}</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        The visionary minds behind NextStop. We are a collective of developers, designers, and dreamers building the future of transit.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamData.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md h-full transition-all duration-300 hover:bg-black/30 hover:border-primary/30 hover:-translate-y-2 flex flex-col items-center">
                                <div className="relative mb-6 w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center">
                                    {/* Placeholder for Image if real images aren't present */}
                                    <div className="text-white/40 font-heading text-4xl">
                                        {member.name.charAt(0)}
                                    </div>
                                </div>

                                <div className="text-center w-full">
                                    <h3 className="text-2xl font-bold font-heading mb-1 text-white group-hover:text-primary transition-colors">{member.name}</h3>
                                    <p className="text-primary/80 font-medium mb-4 text-sm uppercase tracking-wide">{member.role}</p>
                                    <p className="text-white/60 text-sm leading-relaxed mb-6 h-20 overflow-hidden text-ellipsis px-4">
                                        {member.bio}
                                    </p>

                                    <div className="flex justify-center border-t border-white/10 pt-4 w-full">
                                        {member.github && (
                                            <a
                                                href={member.github}
                                                className="p-2 bg-white/5 hover:bg-primary/20 hover:text-primary rounded-full text-white/70 transition-colors"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="GitHub Profile"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </main>
    );
}
