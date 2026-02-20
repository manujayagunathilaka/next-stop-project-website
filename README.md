<h1 align="center">
  <br/>
  🚍 NextStop
  <br/>
</h1>

<h4 align="center">Sri Lanka's First AI-Powered Real-Time Transit Ecosystem.</h4>
<p align="center"><em>Predictability in Motion.</em></p>

<p align="center">
  <img src="public/nextstop-banner.png" alt="NextStop Banner" width="100%" style="border-radius: 12px;" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

---

## 🚀 Overview

**NextStop** is a modern, high-performance web platform built to revolutionize public transit in Sri Lanka. It serves as a real-time command center for fleet operators — visualizing bus locations, tracking routes, monitoring system health, and delivering AI-driven predictions — all wrapped in a futuristic **Neon Colombo** aesthetic.

Built as a university group project by team **Nexora**, NextStop combines cutting-edge web technologies with a vision for smarter, more connected cities.

---

## ✨ Features

### 🎮 Mission Control Dashboard
- **Live Fleet Tracking** — Real-time map visualization of buses across Colombo via `react-leaflet`
- **Operation Metrics** — Live charts for Revenue, Passenger Volume, and System Health
- **Notification Center** — Toast alerts for critical events (route deviations, high latency, etc.)
- **Day / Night Mode** — Toggle between Light and Dark themes; map tiles adapt automatically

### 🌐 Immersive Landing Page
- **Neon Sri Lanka Map** — SVG map of Sri Lanka with animated neon district highlights
- **Neon Colombo Map** — Stylized city map rendered as an interactive visual backdrop
- **3D Elements** — Holographic shield and CyberTrack visuals powered by `@react-three/fiber`
- **Glassmorphism UI** — Translucent panels, smooth gradients, and blur effects throughout

### 📄 Additional Pages
- **`/proposal`** — Full project proposal including problem statement, solution scope, objectives, tech architecture, business model, and future vision
- **`/team`** — Team showcase with member roles, bios, and GitHub profile links
- **`/download`** — App download / onboarding page
- **`/contact`** — Contact and inquiry form

### 🛠 Engineering Excellence
- **Fully Type-Safe** — Written entirely in TypeScript
- **App Router** — Next.js 15+ App Router with Server & Client Components
- **Framer Motion** — Smooth page transitions and micro-animations
- **Responsive** — Optimized for mobile, tablet, desktop, and 2K monitors

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Maps** | [React Leaflet](https://react-leaflet.js.org/) + Custom SVG Maps |
| **3D Graphics** | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Utilities** | `clsx`, `tailwind-merge` |

---

## ⚡ Getting Started

### Prerequisites
- Node.js **18+**
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/manujayagunathilaka/next-stop-project-website.git
   cd next-stop-project-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   - Landing Page → `http://localhost:3000`
   - Dashboard → `http://localhost:3000/dashboard`
   - Team → `http://localhost:3000/team`
   - Proposal → `http://localhost:3000/proposal`

---

## 📂 Project Structure

```
next-stop/
├── app/                        # Next.js App Router
│   ├── dashboard/              # Fleet management dashboard
│   ├── team/                   # Team showcase page
│   ├── proposal/               # Project proposal page
│   ├── download/               # App download page
│   ├── contact/                # Contact page
│   ├── layout.tsx              # Root layout & global providers
│   └── page.tsx                # Landing page
│
├── components/                 # Reusable UI components
│   ├── 3d/                     # Three.js 3D components
│   │   ├── HolographicShield.tsx
│   │   └── CyberTrack.tsx
│   ├── Hero.tsx                # Hero section with animated map
│   ├── HeroMap.tsx             # SVG Sri Lanka map component
│   ├── ColomboMap.tsx          # Neon Colombo SVG map
│   ├── DashboardMap.tsx        # Live Leaflet fleet map
│   ├── Features.tsx            # Feature highlights section
│   ├── About.tsx               # About section
│   ├── Problem.tsx             # Problem statement section
│   ├── Ecosystem.tsx           # Ecosystem overview
│   ├── Sustainability.tsx      # Sustainability section
│   ├── TechnicalExcellence.tsx # Tech deep-dive section
│   ├── StakeholderImpact.tsx   # Impact section
│   ├── Roadmap.tsx             # Project roadmap
│   ├── Navbar.tsx              # Responsive navigation
│   ├── Footer.tsx              # Site footer
│   └── ui/                     # Shared UI primitives
│
├── lib/
│   ├── teamData.ts             # Team member data
│   └── SriLankaPaths.ts        # SVG path data for Sri Lanka map
│
└── public/                     # Static assets
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ❤️ by <a href="https://github.com/manujayagunathilaka"><strong>K. M. R. Manujaya S. Gunathilaka</strong></a></p>
