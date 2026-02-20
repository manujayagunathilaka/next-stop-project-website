
"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icon missing in Leaflet with Next.js
const icon = L.icon({
    iconUrl: "/marker-icon.png", // We might need to handle this if assets are missing, using a fallback or CDN
    shadowUrl: "/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Since we might not have local assets, let's use CDN for the marker icons for robustness
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
    // Coordinates for Colombo, Sri Lanka
    const position: [number, number] = [6.9271, 79.8612];

    return (
        <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position}>
                <Popup>
                    NextStop Pilot Area <br /> Colombo, Sri Lanka.
                </Popup>
            </Marker>
            {/* Simulation of a bus moving (static for now) */}
            <Marker position={[6.935, 79.855]}>
                <Popup>
                    Bus 124 <br /> Arriving in 2 mins
                </Popup>
            </Marker>
            <Marker position={[6.915, 79.865]}>
                <Popup>
                    Bus 154 <br /> Delayed
                </Popup>
            </Marker>

        </MapContainer>
    );
}
