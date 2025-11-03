# SecurEd - Disaster Preparedness Education Platform

SecurEd is an AI-powered disaster preparedness and response education system designed for schools and colleges. The platform provides immersive simulations, interactive learning modules, and real-time guidance to help students master emergency response protocols.

## Features

### AI-Powered Simulations
- Immersive 3D virtual disaster drills with real-time decision making
- Multiple disaster scenarios: Earthquakes, Fires, Floods, and more
- Instant feedback and performance analytics
- Realistic environment simulations using Three.js

### Safety Buddy Chatbot
- 24/7 AI assistant for disaster-related questions
- Context-aware guidance and emergency protocols
- Multi-language support
- Real-time response system

### Gamified Learning
- Points, badges, and achievement system
- Student leaderboards and progress tracking
- Interactive quizzes and assessments
- Certification upon completion

### Safety Map & Heatmap
- Interactive maps showing safe zones and evacuation routes
- Real-time disaster heatmap visualization
- Location-based emergency resources
- Integration with Leaflet.js for mapping

### Learning Resources
- Comprehensive disaster preparedness modules
- Government resources and guidelines
- Video tutorials and documentation
- Downloadable emergency checklists

### SOS Emergency System
- Quick access emergency contact system
- Real-time alert notifications
- Location sharing capabilities
- Emergency protocol guides

## Tech Stack

### Frontend
- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **Routing**: React Router DOM 6.30
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: TailwindCSS 3.4 with animations
- **3D Graphics**: Three.js with React Three Fiber
- **Maps**: Leaflet.js with heatmap support
- **Charts**: Recharts
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime subscriptions
- **Storage**: Supabase Storage for media files
- **API**: RESTful API with Supabase client

### Key Libraries
- `@react-three/fiber` & `@react-three/drei` - 3D simulations
- `leaflet` & `leaflet.heat` - Interactive maps
- `recharts` - Data visualization
- `cmdk` - Command palette
- `sonner` - Toast notifications
- `date-fns` - Date formatting

## Project Structure

```
securEd/
├── public/
│   ├── favicon.svg          # Application icon
│   ├── models/              # 3D models for simulations
│   ├── placeholder.svg      # Placeholder images
│   └── robots.txt
├── src/
│   ├── assets/              # Images and static assets
│   ├── components/
│   │   ├── 3d/             # Three.js 3D components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── InteractiveSimulation.tsx
│   │   ├── Navigation.tsx
│   │   └── RealLifeSimulation.tsx
│   ├── data/               # Static data and configurations
│   ├── hooks/              # Custom React hooks
│   ├── integrations/
│   │   └── supabase/       # Supabase client and types
│   ├── lib/                # Utility functions
│   ├── pages/
│   │   ├── Index.tsx       # Landing page
│   │   ├── Dashboard.tsx   # User dashboard
│   │   ├── Simulations.tsx # Simulation selection
│   │   ├── SimulationPlay.tsx # Active simulation
│   │   ├── Learning.tsx    # Learning modules
│   │   ├── GovtResources.tsx # Government resources
│   │   ├── SafetyMap.tsx   # Interactive safety map
│   │   ├── Heatmap.tsx     # Disaster heatmap
│   │   ├── Chatbot.tsx     # AI chatbot interface
│   │   ├── Auth.tsx        # Authentication
│   │   └── sos.tsx         # Emergency SOS
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```


## Database Schema

The application uses Supabase with the following main tables:

- **users** - User profiles and authentication
- **simulations** - Disaster simulation scenarios
- **user_progress** - Student progress tracking
- **achievements** - Badges and achievements
- **leaderboard** - Gamification scores
- **resources** - Learning materials
- **emergency_contacts** - SOS contact information
- **safety_locations** - Map markers and safe zones


## Acknowledgments

- Built with React and Vite
- UI components from shadcn/ui
- 3D graphics powered by Three.js
- Maps by Leaflet
- Backend by Supabase

---
<img width="1345" height="600" alt="Screenshot 2025-10-29 191149" src="https://github.com/user-attachments/assets/781c8d23-bef0-4f05-9f66-cade71536ba4" />
<img width="1344" height="596" alt="Screenshot 2025-10-29 191539" src="https://github.com/user-attachments/assets/0bc193d4-9e68-49d3-a6ab-600c21e65d3a" />
<img width="1348" height="599" alt="Screenshot 2025-10-29 191456" src="https://github.com/user-attachments/assets/4909e898-0f91-477b-9daa-dd1c4b249993" />
<img width="1341" height="596" alt="Screenshot 2025-10-29 191600" src="https://github.com/user-attachments/assets/4df5c80d-ebe8-4327-b980-f204c0d761c9" />




**SecurEd** - Empowering communities through disaster preparedness education.
