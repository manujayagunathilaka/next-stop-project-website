"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useState } from "react"

// Fix for default marker icons in Next.js / Leaflet
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

// Custom Icon for Buses
const createBusIcon = (theme: 'light' | 'dark') => new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: theme === 'dark' ? 'hue-rotate-[140deg] invert-[0.1]' : 'hue-rotate-[140deg]'
})

// Colombo Coordinates
const CENTER_LAT = 6.9271
const CENTER_LNG = 79.8612
const ZOOM_LEVEL = 13

// Initial Bus Locations
const INITIAL_LOCATIONS = [
    { id: "ND 4957", lat: 6.9271, lng: 79.8612, route: "138 - Pettah", dir: 1 },
    { id: "ND 5523", lat: 6.8950, lng: 79.8750, route: "120 - Horana", dir: -1 }, // Shifted East
    { id: "NB 3381", lat: 6.9150, lng: 79.8850, route: "154 - Borella", dir: 1 }, // Shifted East
    { id: "NC 1024", lat: 6.8900, lng: 79.9200, route: "138 - Homagama", dir: -1 },
    { id: "ND 8892", lat: 6.9400, lng: 79.8800, route: "177 - Kaduwela", dir: 1 }, // Shifted East
]

export default function DashboardMap({ className, theme = 'dark' }: { className?: string, theme?: 'light' | 'dark' }) {
    const [locations, setLocations] = useState(INITIAL_LOCATIONS)

    useEffect(() => {
        // Fix for Leaflet default icon module resolution
        // @ts-ignore
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconUrl,
            iconRetinaUrl,
            shadowUrl,
        });
    }, [])

    // Simulate Live Movement
    useEffect(() => {
        const interval = setInterval(() => {
            setLocations(prev => prev.map(bus => {
                // Simple random movement logic with "direction"
                let newLat = bus.lat + (Math.random() * 0.001 - 0.0002) * bus.dir;
                let newLng = bus.lng + (Math.random() * 0.001 - 0.0002) * bus.dir;

                // Keep within bounds roughly
                if (Math.abs(newLat - CENTER_LAT) > 0.1) bus.dir *= -1;

                return { ...bus, lat: newLat, lng: newLng }
            }))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className={`${className} ${theme === 'light' ? 'bg-gray-100' : 'bg-[#111]'} relative z-0 transition-colors duration-500`}>
            <MapContainer
                center={[CENTER_LAT, CENTER_LNG]}
                zoom={ZOOM_LEVEL}
                scrollWheelZoom={true}
                className="w-full h-full z-0"
                style={{ background: 'transparent' }}
            >
                {/* Switch between Dark Matter and Positron (Light) based on theme */}
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url={theme === 'dark'
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    }
                />

                {locations.map((bus) => (
                    <Marker key={bus.id} position={[bus.lat, bus.lng]} icon={createBusIcon(theme)}>
                        <Popup className="custom-popup">
                            <div className="p-1">
                                <h3 className="font-bold text-sm">{bus.id}</h3>
                                <p className="text-xs text-gray-500">{bus.route}</p>
                                <div className="mt-1 flex items-center gap-1 text-[10px]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    ACTIVE
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Dynamic Popup Styles */}
            <style jsx global>{`
                .leaflet-popup-content-wrapper {
                    background: ${theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'} !important;
                    backdrop-filter: blur(10px);
                    color: ${theme === 'dark' ? 'white' : 'black'} !important;
                    border: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
                    border-radius: 12px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .leaflet-popup-tip {
                    background: ${theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'} !important;
                }
                .leaflet-container {
                    background: transparent !important;
                }
            `}</style>
        </div>
    )
}
