
"use client"
import { motion } from "framer-motion";
import { proposalData } from "@/lib/proposalData";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, Target, Shield, Zap, BarChart, Server, Layers, Users, Map, DollarSign, Flag } from "lucide-react";

export default function ProposalPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none fixed">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[120px]" />
            </div>

            {/* Header */}
            <Section className="relative z-10 text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                        Project Proposal
                    </h1>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        A comprehensive overview of NextStop: The future of intelligent transit.
                    </p>
                </motion.div>
            </Section>

            {/* Problem & Solution */}
            <Section className="relative z-10 grid md:grid-cols-2 gap-8 mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className="h-full bg-red-500/5 border-red-500/10">
                        <h2 className="text-3xl font-heading font-bold mb-4 text-red-400 flex items-center gap-3">
                            <span className="p-2 bg-red-500/10 rounded-lg"><Zap className="w-6 h-6" /></span>
                            {proposalData.problem.title}
                        </h2>
                        <p className="text-white/70 leading-relaxed text-lg">
                            {proposalData.problem.content}
                        </p>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="h-full bg-emerald-500/5 border-emerald-500/10">
                        <h2 className="text-3xl font-heading font-bold mb-4 text-emerald-400 flex items-center gap-3">
                            <span className="p-2 bg-emerald-500/10 rounded-lg"><CheckCircle2 className="w-6 h-6" /></span>
                            {proposalData.solution.title}
                        </h2>
                        <p className="text-white/70 leading-relaxed text-lg">
                            {proposalData.solution.content}
                        </p>
                    </Card>
                </motion.div>
            </Section>

            {/* Objectives */}
            <Section className="relative z-10 mb-20">
                <h2 className="text-4xl font-heading font-bold mb-12 text-center">
                    <span className="text-primary">{proposalData.objectives.title}</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {proposalData.objectives.items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="h-full"
                        >
                            <Card className="h-full hover:border-primary/50 transition-colors">
                                <div className="mb-4">
                                    {idx === 0 && <Target className="w-8 h-8 text-blue-400" />}
                                    {idx === 1 && <Layers className="w-8 h-8 text-purple-400" />}
                                    {idx === 2 && <Shield className="w-8 h-8 text-green-400" />}
                                    {idx === 3 && <BarChart className="w-8 h-8 text-orange-400" />}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Scope of Work */}
            <Section className="relative z-10 mb-20">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="md:w-1/3 sticky top-32">
                        <h2 className="text-4xl font-heading font-bold mb-6 text-accent">
                            {proposalData.scope.title}
                        </h2>
                        <p className="text-white/60 mb-6">
                            A detailed breakdown of what is included in the initial launch of NextStop.
                        </p>
                    </div>
                    <div className="md:w-2/3 space-y-8">
                        {proposalData.scope.sections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
                            >
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    {idx === 0 && <div className="w-2 h-8 bg-blue-500 rounded-full" />}
                                    {idx === 1 && <div className="w-2 h-8 bg-purple-500 rounded-full" />}
                                    {idx === 2 && <div className="w-2 h-8 bg-pink-500 rounded-full" />}
                                    {section.heading}
                                </h3>
                                <ul className="space-y-4">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                                            <span className="text-white/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Technical Details Grid */}
            <Section className="relative z-10 mb-20">
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg"><Users className="w-6 h-6 text-blue-400" /></div>
                            <h3 className="text-xl font-bold">Target Audience</h3>
                        </div>
                        <p className="text-white/70">{proposalData.details.targetAudience}</p>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-lg"><Server className="w-6 h-6 text-purple-400" /></div>
                            <h3 className="text-xl font-bold">Tech Stack</h3>
                        </div>
                        <p className="text-white/70">{proposalData.details.techStack}</p>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-orange-500/10 rounded-lg"><Map className="w-6 h-6 text-orange-400" /></div>
                            <h3 className="text-xl font-bold">Project Boundaries</h3>
                        </div>
                        <p className="text-white/70">{proposalData.details.projectBoundaries}</p>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-500/10 rounded-lg"><DollarSign className="w-6 h-6 text-green-400" /></div>
                            <h3 className="text-xl font-bold">{proposalData.revenue.title}</h3>
                        </div>
                        <p className="text-white/70">{proposalData.revenue.content}</p>
                    </Card>
                </div>
            </Section>

            {/* Management & Vision */}
            <Section className="relative z-10 mb-20 bg-white/5 rounded-3xl p-8 md:p-12 border border-white/5">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6 text-primary">{proposalData.management.title}</h2>
                        <p className="text-white/70 leading-relaxed text-lg">{proposalData.management.content}</p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6 text-secondary">{proposalData.vision.title}</h2>
                        <p className="text-white/70 leading-relaxed text-lg">{proposalData.vision.content}</p>
                    </div>
                </div>
            </Section>

            {/* Architecture */}
            <Section className="relative z-10 mb-24">
                <Card className="bg-gradient-to-br from-white/5 to-white/0 border-white/10 overflow-hidden">
                    <div className="p-8 md:p-12 text-center">
                        <h2 className="text-3xl font-heading font-bold mb-6">{proposalData.architecture.title}</h2>
                        <p className="text-xl text-white/70 max-w-4xl mx-auto">{proposalData.architecture.content}</p>
                    </div>
                </Card>
            </Section>


            {/* Conclusion */}
            <Section className="relative z-10 text-center mb-12">
                <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary via-accent to-secondary mb-8">
                    <div className="bg-black/80 rounded-full px-8 py-3 backdrop-blur-xl flex items-center">
                        <Flag className="w-6 h-6 text-white mr-3" />
                        <span className="font-bold text-white tracking-widest uppercase">NextStop</span>
                    </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">{proposalData.conclusion.title}</h2>
                <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                    {proposalData.conclusion.content}
                </p>
            </Section>

        </main>
    );
}
