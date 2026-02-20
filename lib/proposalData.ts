
export const proposalData = {
    problem: {
        title: "The Problem",
        content: "Sri Lanka's public transportation system is plagued by unpredictability. Commuters face daily uncertainties regarding bus arrival times blocking efficient travel planning. This lack of real-time data leads to wasted time, increased stress, and a reliance on less sustainable private transport options. The current system lacks a centralized, user-friendly platform for tracking and planning journeys.",
    },
    solution: {
        title: "The Solution",
        content: "NextStop is an AI-powered real-time transit ecosystem designed to revolutionize the commuter experience. By leveraging GPS data and advanced production algorithms, NextStop provides accurate arrival times, optimal route suggestions, and crowdedness indicators. Our platform bridges the gap between commuters and the transit network, offering a seamless, predictable, and stress-free travel experience.",
    },
    scope: {
        title: "Project Scope",
        sections: [
            {
                heading: "Functional Scope",
                items: [
                    "Real-time bus tracking using GPS integration.",
                    "AI-driven arrival time predictions.",
                    "Interactive map interface for route visualization.",
                    "User accounts for saving favorite routes and stops.",
                    "Mobile-responsive web application.",
                ],
            },
            {
                heading: "Non-Functional Scope",
                items: [
                    "High availability (99.9% uptime).",
                    "Scalable architecture to handle increasing user load.",
                    "Secure data transmission and storage.",
                    "Fast response times (<200ms for API calls).",
                    "Intuitive and accessible user interface (WCAG compliance).",
                ],
            },
            {
                heading: "Testing Scope",
                items: [
                    "Unit testing for core algorithms.",
                    "Integration testing for API endpoints.",
                    "End-to-end testing for critical user flows.",
                    "User acceptance testing (UAT) with a pilot group.",
                    "Performance testing under load.",
                ]
            },
        ],
    },
    objectives: {
        title: "Main Objectives",
        items: [
            {
                title: "Key Features & Functionalities",
                description: "Deliver a robust tracking system, predictive analytics, and a user-centric journey planner.",
            },
            {
                title: "User Experience (UX) & Design",
                description: "Create a modern, intuitive, and visually appealing interface that simplifies complex transit data.",
            },
            {
                title: "Security & Data Protection",
                description: "Ensure user data privacy and secure handling of location data according to industry standards.",
            },
            {
                title: "Business Impact & Market Advantage",
                description: "Establish NextStop as the market leader in transit tech, driving adoption and potential partnerships with transport authorities.",
            },
        ],
    },
    details: {
        targetAudience: "Daily commuters, students, tourists, and anyone relying on public transport in Sri Lanka.",
        techStack: "Next.js 14, React, Tailwind CSS, Node.js (Serverless), PostgreSQL (Supabase/Neon), Google Maps API / Mapbox.",
        projectBoundaries: "Initially focused on the Western Province bus network, expanding to other regions and transport modes (trains) in future phases.",
    },
    management: {
        title: "Management & Monitoring",
        content: "The system includes an admin panel for monitoring system health, user analytics, and managing transit data updates. We utilize automated monitoring tools to ensure 24/7 reliability.",
    },
    architecture: {
        title: "System Architecture",
        content: "NextStop is built on a modern serverless architecture. The frontend is hosted on Vercel for global edge caching. The backend uses serverless functions for scalability. Data is stored in a distributed SQL database. Real-time updates are pushed via WebSockets.",
    },
    vision: {
        title: "Vision Ahead",
        content: "Our vision is to become the operating system for public mobility in Sri Lanka. Future phases will include ticketing integration, multi-modal trip planning (bus + train + taxi), and partnerships with smart city initiatives.",
    },
    revenue: {
        title: "Revenue Model",
        content: "Freemium model for users (ad-supported free tier, ad-free premium with advanced features). B2B data licensing for urban planners and transport authorities.",
    },
    conclusion: {
        title: "Conclusion",
        content: "NextStop is poised to transform public transit in Sri Lanka. By addressing the critical pain point of uncertainty, we empower commuters and drive a shift towards sustainable shared mobility. With a strong team and cutting-edge technology, NextStop isn't just an app; it's the future of travel.",
    },
};
