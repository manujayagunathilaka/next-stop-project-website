"use client"

import React, { useEffect, useState } from 'react';

export default function ColomboMap({ className }: { className?: string }) {
    const [svgContent, setSvgContent] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSvg() {
            try {
                const response = await fetch('/colombo.svg');
                if (response.ok) {
                    let text = await response.text();

                    // Remove existing style tags to ensure our neon theme takes precedence
                    text = text.replace(/<style>[\s\S]*?<\/style>/gi, '');

                    // Hacky but effective: ensure the SVG takes up full width/height
                    text = text.replace('<svg ', '<svg class="w-full h-full" ');

                    setSvgContent(text);
                }
            } catch (error) {
                console.error("Error loading map:", error);
            }
        }
        fetchSvg();
    }, []);

    return (
        <div className={className}>
            <div id="colombo-root" className="w-full h-full bg-black relative overflow-hidden">
                <style jsx global>{`
                    /* COLOMBO MAP NEON THEME - SCOPED to #colombo-root */
                    
                    /* Base Background */
                    #colombo-root .background { fill: #000000 !important; stroke: none; }

                    /* Water Bodies - Deep Blue/Cyan tint */
                    #colombo-root .sea, #colombo-root .lake { 
                        fill: #0f172a !important; 
                        fill-rule: evenodd; 
                        stroke: none; 
                        opacity: 1; 
                    }

                    /* Land Use - Dark, Subtle */
                    #colombo-root .green { fill: #064e3b !important; opacity: 0.2; }
                    #colombo-root .airport { fill: #374151 !important; opacity: 0.5; }
                    #colombo-root .airstrip { stroke: #4b5563 !important; stroke-width: 1; }

                    /* Roads - The Neon Grid */
                    #colombo-root .major_highway { 
                        fill: none; 
                        stroke: #00ffff !important; 
                        stroke-width: 1.2; 
                        stroke-linejoin: round; 
                        stroke-linecap: round;
                        filter: drop-shadow(0 0 2px rgba(6,182,212, 0.8));
                    }
                    
                    #colombo-root .minor_highway { 
                        fill: none; 
                        stroke: #06b6d4 !important; 
                        stroke-width: 0.6; 
                        opacity: 0.7; 
                    }

                    #colombo-root .major_street { 
                        fill: none; 
                        stroke: #374151 !important; 
                        stroke-width: 0.4; 
                        opacity: 0.6; 
                    }

                    #colombo-root .minor_street { 
                        fill: none; 
                        stroke: #1f2937 !important; 
                        stroke-width: 0.2; 
                        opacity: 0.4; 
                    }

                    /* Train Lines - Magenta/Pink */
                    #colombo-root .railroad { 
                        fill: none; 
                        stroke: #db2777 !important; 
                        stroke-width: 0.6; 
                        stroke-dasharray: 1 1;
                        opacity: 0.8;
                    }

                    #colombo-root .border { stroke: #4b5563 !important; stroke-width: 0.5; stroke-dasharray: 2 1; opacity: 0.5; }
                `}</style>

                {svgContent ? (
                    <div
                        className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-cyan-500/50 text-xs animate-pulse">
                        LOADING GRID DATA...
                    </div>
                )}
            </div>
        </div>
    );
}
