
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function Card({ children, className, hoverEffect = true }: CardProps) {
    // If we want motion, we need to make this a client component or wrap it. 
    // For simplicity in this server/client mix, let's keep it simple div for now, 
    // or use a client wrapper if we really need consistent animation.
    // Actually, let's use a simple div with Tailwind classes for glassmorphism to be safe in Server Components,
    // typically we'd use 'use client' if using motion directly.

    return (
        <div
            className={cn(
                "glass-panel p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md",
                hoverEffect && "transition-all duration-300 hover:bg-black/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
                className
            )}
        >
            {children}
        </div>
    );
}
