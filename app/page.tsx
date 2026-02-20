"use client"

import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Ecosystem from "@/components/Ecosystem";
import StakeholderImpact from "@/components/StakeholderImpact";
import TechnicalExcellence from "@/components/TechnicalExcellence";
import Sustainability from "@/components/Sustainability";
import Roadmap from "@/components/Roadmap";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-black isolation-isolate relative z-0">
      <Hero />
      <Problem />
      <Ecosystem />
      <StakeholderImpact />
      <Features />
      <TechnicalExcellence />
      <Sustainability />
      <Roadmap />
    </main>
  );
}
