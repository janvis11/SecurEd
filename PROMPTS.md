# SecurEd Project Prompts

This document contains detailed prompts for generating flowcharts, database schemas, backend architecture, and frontend components for the SecurEd disaster preparedness education platform.

---

## 1. Flowchart Prompt

```
Create a comprehensive flowchart for the SecurEd disaster preparedness education platform with the following components:

### User Journey Flow:
1. **Landing Page Entry**
   - User visits homepage
   - Views features, testimonials, and statistics
   - Decision: Sign up or explore as guest

2. **Authentication Flow**
   - User clicks "Get Started"
   - Redirects to /auth page
   - Options: Sign up with email or social login
   - Email verification process
   - Profile setup (name, school, role)
   - Redirect to dashboard

3. **Dashboard Flow**
   - Display user progress overview
   - Show recent activities and achievements
   - Quick access cards to:
     * Simulations
     * Learning modules
     * Safety map
     * Chatbot
     * SOS emergency

4. **Simulation Flow**
   - User navigates to /simulations
   - Browse available disaster scenarios (Earthquake, Fire, Flood, etc.)
   - Select scenario by difficulty level
   - Pre-simulation briefing
   - Enter 3D simulation environment
   - Real-time decision making:
     * Present scenario challenges
     * User makes choices
     * Immediate feedback on decisions
     * Score calculation
   - Post-simulation summary:
     * Performance metrics
     * Points earned
     * Badges unlocked
     * Areas for improvement
   - Save progress to database
   - Update leaderboard

5. **Learning Module Flow**
   - User navigates to /learning
   - Browse module categories:
     * Earthquake preparedness
     * Fire safety
     * Flood response
     * First aid
     * Emergency communication
   - Select module
   - View interactive content (videos, text, images)
   - Complete quizzes
   - Track progress
   - Earn certificates

6. **Safety Map Flow**
   - User navigates to /safety-map
   - Load interactive Leaflet map
   - Display user's current location
   - Show markers for:
     * Safe zones
     * Evacuation routes
     * Emergency shelters
     * Hospitals
     * Fire stations
     * Police stations
   - Filter by disaster type
   - Get directions to nearest safe location

7. **Heatmap Flow**
   - User navigates to /heatmap
   - Load disaster intensity heatmap
   - Select disaster type and time range
   - Visualize risk zones
   - View historical data
   - Export data for analysis

8. **Chatbot Flow**
   - User navigates to /chatbot or clicks chatbot icon
   - Chat interface loads
   - User types question or selects quick template
   - AI processes query
   - Return contextual response with:
     * Emergency protocols
     * Safety tips
     * Resource links
     * Follow-up suggestions
   - Save chat history

9. **SOS Emergency Flow**
   - User navigates to /sos or emergency button
   - Display emergency contacts
   - Quick dial options
   - Share current location
   - Access emergency protocols
   - Send alert to designated contacts

10. **Gamification Flow**
    - Track user actions across platform
    - Award points for:
      * Completing simulations
      * Finishing modules
      * Daily login
      * Helping others
    - Unlock achievements and badges
    - Update leaderboard rankings
    - Display progress on dashboard

### Technical Flow:
- Frontend makes API calls to Supabase
- Supabase handles authentication, database queries, and real-time updates
- 3D simulations render using Three.js
- Maps render using Leaflet.js
- State management via TanStack Query
- Real-time updates via Supabase subscriptions

Include decision points, error handling, and alternative paths in the flowchart.
```

---

## 2. Database Schema Prompt

```
Design a comprehensive PostgreSQL database schema for SecurEd using Supabase with the following requirements:

### Tables and Relationships:

1. **users**
   - id (UUID, primary key, auto-generated)
   - email (VARCHAR, unique, not null)
   - full_name (VARCHAR, not null)
   - avatar_url (TEXT)
   - role (ENUM: 'student', 'teacher', 'admin')
   - school_name (VARCHAR)
   - grade_level (VARCHAR)
   - points (INTEGER, default 0)
   - created_at (TIMESTAMP, default now())
   - updated_at (TIMESTAMP, default now())
   - last_login (TIMESTAMP)

2. **simulations**
   - id (UUID, primary key)
   - title (VARCHAR, not null)
   - description (TEXT)
   - disaster_type (ENUM: 'earthquake', 'fire', 'flood', 'tsunami', 'hurricane', 'tornado')
   - difficulty_level (ENUM: 'beginner', 'intermediate', 'advanced')
   - duration_minutes (INTEGER)
   - max_points (INTEGER)
   - scenario_data (JSONB) - stores 3D scene configuration
   - thumbnail_url (TEXT)
   - is_active (BOOLEAN, default true)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

3. **user_simulations**
   - id (UUID, primary key)
   - user_id (UUID, foreign key -> users.id)
   - simulation_id (UUID, foreign key -> simulations.id)
   - score (INTEGER)
   - completion_percentage (INTEGER)
   - time_taken_seconds (INTEGER)
   - decisions_made (JSONB) - array of user choices
   - feedback (TEXT)
   - completed (BOOLEAN, default false)
   - started_at (TIMESTAMP)
   - completed_at (TIMESTAMP)

4. **learning_modules**
   - id (UUID, primary key)
   - title (VARCHAR, not null)
   - category (VARCHAR)
   - description (TEXT)
   - content (TEXT) - markdown or HTML
   - video_url (TEXT)
   - order_index (INTEGER)
   - estimated_duration_minutes (INTEGER)
   - points_reward (INTEGER)
   - is_published (BOOLEAN, default true)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

5. **user_module_progress**
   - id (UUID, primary key)
   - user_id (UUID, foreign key -> users.id)
   - module_id (UUID, foreign key -> learning_modules.id)
   - progress_percentage (INTEGER, default 0)
   - completed (BOOLEAN, default false)
   - quiz_score (INTEGER)
   - started_at (TIMESTAMP)
   - completed_at (TIMESTAMP)

6. **achievements**
   - id (UUID, primary key)
   - name (VARCHAR, not null)
   - description (TEXT)
   - icon_url (TEXT)
   - badge_type (ENUM: 'bronze', 'silver', 'gold', 'platinum')
   - criteria (JSONB) - conditions to unlock
   - points_reward (INTEGER)
   - created_at (TIMESTAMP)

7. **user_achievements**
   - id (UUID, primary key)
   - user_id (UUID, foreign key -> users.id)
   - achievement_id (UUID, foreign key -> achievements.id)
   - earned_at (TIMESTAMP, default now())
   - UNIQUE(user_id, achievement_id)

8. **leaderboard**
   - id (UUID, primary key)
   - user_id (UUID, foreign key -> users.id)
   - total_points (INTEGER, default 0)
   - simulations_completed (INTEGER, default 0)
   - modules_completed (INTEGER, default 0)
   - rank (INTEGER)
   - school_name (VARCHAR)
   - updated_at (TIMESTAMP)

9. **safety_locations**
   - id (UUID, primary key)
   - name (VARCHAR, not null)
   - location_type (ENUM: 'safe_zone', 'shelter', 'hospital', 'fire_station', 'police_station')
   - latitude (DECIMAL)
   - longitude (DECIMAL)
   - address (TEXT)
   - capacity (INTEGER)
   - contact_phone (VARCHAR)
   - disaster_types (ARRAY of VARCHAR) - which disasters it's relevant for
   - is_active (BOOLEAN, default true)
   - created_at (TIMESTAMP)

10. **disaster_heatmap_data**
    - id (UUID, primary key)
    - disaster_type (VARCHAR)
    - latitude (DECIMAL)
    - longitude (DECIMAL)
    - intensity (DECIMAL) - 0 to 1 scale
    - recorded_at (TIMESTAMP)
    - source (VARCHAR)
    - metadata (JSONB)

11. **emergency_contacts**
    - id (UUID, primary key)
    - user_id (UUID, foreign key -> users.id)
    - contact_name (VARCHAR, not null)
    - relationship (VARCHAR)
    - phone_number (VARCHAR, not null)
    - email (VARCHAR)
    - is_primary (BOOLEAN, default false)
    - created_at (TIMESTAMP)

12. **chat_conversations**
    - id (UUID, primary key)
    - user_id (UUID, foreign key -> users.id)
    - title (VARCHAR)
    - created_at (TIMESTAMP)
    - updated_at (TIMESTAMP)

13. **chat_messages**
    - id (UUID, primary key)
    - conversation_id (UUID, foreign key -> chat_conversations.id)
    - role (ENUM: 'user', 'assistant')
    - content (TEXT, not null)
    - created_at (TIMESTAMP)

14. **government_resources**
    - id (UUID, primary key)
    - title (VARCHAR, not null)
    - description (TEXT)
    - resource_type (ENUM: 'guideline', 'contact', 'document', 'video')
    - url (TEXT)
    - organization (VARCHAR)
    - disaster_types (ARRAY of VARCHAR)
    - is_featured (BOOLEAN, default false)
    - created_at (TIMESTAMP)

15. **notifications**
    - id (UUID, primary key)
    - user_id (UUID, foreign key -> users.id)
    - title (VARCHAR, not null)
    - message (TEXT)
    - notification_type (ENUM: 'achievement', 'reminder', 'alert', 'system')
    - is_read (BOOLEAN, default false)
    - created_at (TIMESTAMP)

### Indexes:
- users(email)
- user_simulations(user_id, simulation_id)
- user_module_progress(user_id, module_id)
- leaderboard(total_points DESC)
- safety_locations(latitude, longitude)
- chat_messages(conversation_id, created_at)

### Row Level Security (RLS):
- Enable RLS on all tables
- Users can only read/write their own data
- Public read access for simulations, learning_modules, achievements, safety_locations, government_resources
- Admin role has full access

### Functions and Triggers:
- update_updated_at_column() - trigger to auto-update updated_at timestamps
- calculate_leaderboard_rank() - function to recalculate rankings
- award_achievement() - function to check and award achievements
- update_user_points() - function to update user points and leaderboard

### Supabase Storage Buckets:
- avatars - user profile pictures
- simulation-assets - 3D models and textures
- module-content - learning module media
- achievement-badges - badge images
```

---

## 3. Backend Architecture Prompt

```
Design a comprehensive backend architecture for SecurEd using Supabase with the following requirements:

### Supabase Configuration:

1. **Authentication Setup**
   - Email/password authentication
   - Social OAuth providers (Google, GitHub)
   - Email verification flow
   - Password reset functionality
   - JWT token management
   - Session handling
   - Role-based access control (RBAC)

2. **Database Functions**

   **Function: get_user_dashboard_data(user_id UUID)**
   - Returns user profile, progress, recent activities, achievements
   - Aggregates data from multiple tables
   - Optimized for dashboard page load

   **Function: complete_simulation(user_id UUID, simulation_id UUID, score INTEGER, decisions JSONB)**
   - Records simulation completion
   - Updates user points
   - Checks for new achievements
   - Updates leaderboard
   - Returns updated user stats

   **Function: update_leaderboard()**
   - Recalculates all user rankings
   - Updates rank column in leaderboard table
   - Can be called via cron job or trigger

   **Function: get_nearby_safety_locations(lat DECIMAL, lng DECIMAL, radius_km INTEGER, disaster_type VARCHAR)**
   - Returns safety locations within radius
   - Filters by disaster type
   - Sorted by distance

   **Function: award_achievement_if_eligible(user_id UUID, achievement_id UUID)**
   - Checks if user meets achievement criteria
   - Awards achievement if eligible
   - Updates user points
   - Creates notification

3. **Database Triggers**

   **Trigger: on_user_simulation_complete**
   - Fires after INSERT on user_simulations where completed = true
   - Calls update_leaderboard()
   - Checks for achievements

   **Trigger: on_module_complete**
   - Fires after UPDATE on user_module_progress where completed = true
   - Updates user points
   - Checks for achievements

   **Trigger: update_timestamps**
   - Fires before UPDATE on all tables
   - Sets updated_at to current timestamp

4. **Real-time Subscriptions**
   - Leaderboard updates - subscribe to leaderboard table changes
   - Notifications - subscribe to user's notifications
   - Chat messages - subscribe to conversation messages
   - Emergency alerts - broadcast channel for SOS alerts

5. **Storage Policies**
   - Avatars bucket: Users can upload/update their own avatar
   - Simulation assets: Public read, admin write
   - Module content: Public read, admin write
   - Achievement badges: Public read, admin write

6. **Edge Functions (Optional)**

   **Function: ai-chatbot**
   - Endpoint: /functions/v1/ai-chatbot
   - Integrates with OpenAI or similar API
   - Processes user questions
   - Returns contextual disaster preparedness advice
   - Stores conversation in database

   **Function: generate-certificate**
   - Endpoint: /functions/v1/generate-certificate
   - Generates PDF certificate for completed modules
   - Uses user data and completion stats
   - Returns downloadable PDF

   **Function: send-sos-alert**
   - Endpoint: /functions/v1/send-sos-alert
   - Sends SMS/email to emergency contacts
   - Includes user location
   - Logs alert in database

7. **API Endpoints Structure**

   **Authentication:**
   - POST /auth/signup
   - POST /auth/login
   - POST /auth/logout
   - POST /auth/reset-password
   - GET /auth/user

   **Simulations:**
   - GET /simulations - list all simulations
   - GET /simulations/:id - get simulation details
   - POST /simulations/:id/start - start simulation
   - POST /simulations/:id/complete - complete simulation
   - GET /users/:userId/simulations - user's simulation history

   **Learning:**
   - GET /modules - list all modules
   - GET /modules/:id - get module details
   - POST /modules/:id/progress - update progress
   - GET /users/:userId/modules - user's module progress

   **Leaderboard:**
   - GET /leaderboard - get top users
   - GET /leaderboard/school/:schoolName - school-specific leaderboard
   - GET /leaderboard/user/:userId - user's rank

   **Achievements:**
   - GET /achievements - list all achievements
   - GET /users/:userId/achievements - user's achievements

   **Safety:**
   - GET /safety-locations - get safety locations
   - GET /safety-locations/nearby - get nearby locations
   - GET /heatmap-data - get disaster heatmap data

   **Chat:**
   - POST /chat/conversations - create conversation
   - GET /chat/conversations/:id - get conversation
   - POST /chat/messages - send message

   **Emergency:**
   - GET /emergency-contacts - get user's contacts
   - POST /emergency-contacts - add contact
   - POST /sos/alert - send SOS alert

8. **Security Measures**
   - Row Level Security (RLS) enabled on all tables
   - API rate limiting
   - Input validation and sanitization
   - SQL injection prevention
   - XSS protection
   - CORS configuration
   - Secure environment variables

9. **Performance Optimization**
   - Database indexes on frequently queried columns
   - Query optimization with proper JOINs
   - Caching strategy for static data
   - Connection pooling
   - Lazy loading for large datasets
   - Pagination for list endpoints

10. **Monitoring and Logging**
    - Error logging and tracking
    - Performance monitoring
    - API usage analytics
    - User activity tracking
    - Database query performance
    - Real-time alerts for critical errors
```

---

## 4. Frontend Architecture Prompt

```
Design a comprehensive frontend architecture for SecurEd using React, TypeScript, and modern web technologies with the following requirements:

### Project Structure and Organization:

1. **Component Architecture**

   **Atomic Design Pattern:**
   - Atoms: Button, Input, Badge, Avatar, Icon
   - Molecules: Card, Form Field, Navigation Item, Achievement Badge
   - Organisms: Navigation Bar, Simulation Card Grid, Leaderboard Table, Chat Interface
   - Templates: Page layouts with consistent structure
   - Pages: Full page components

2. **Page Components**

   **Landing Page (Index.tsx)**
   - Hero section with animated background
   - Feature showcase with icons and descriptions
   - Statistics section (users, schools, simulations)
   - Testimonials carousel
   - Call-to-action buttons
   - Responsive design with mobile-first approach
   - Smooth scroll animations
   - SEO optimized meta tags

   **Dashboard (Dashboard.tsx)**
   - User profile card with avatar and stats
   - Progress overview with circular progress bars
   - Recent activities timeline
   - Quick access cards to main features
   - Achievement showcase (latest badges)
   - Personalized recommendations
   - Real-time notifications bell
   - Responsive grid layout

   **Simulations (Simulations.tsx)**
   - Grid of simulation cards
   - Filter by disaster type and difficulty
   - Search functionality
   - Completion status indicators
   - Star ratings and reviews
   - Hover effects with preview
   - Skeleton loading states
   - Pagination or infinite scroll

   **Simulation Play (SimulationPlay.tsx)**
   - Full-screen 3D environment using Three.js
   - React Three Fiber for React integration
   - Interactive 3D models and animations
   - Decision-making UI overlays
   - Timer and score display
   - Progress bar
   - Pause/resume functionality
   - Exit confirmation dialog
   - Post-completion summary modal

   **Learning (Learning.tsx)**
   - Module category tabs
   - Module cards with progress indicators
   - Video player integration
   - Interactive content viewer
   - Quiz component with multiple choice
   - Progress tracking
   - Certificate download button
   - Bookmark functionality

   **Safety Map (SafetyMap.tsx)**
   - Leaflet map integration
   - User location marker
   - Safety location markers with custom icons
   - Marker clustering for dense areas
   - Filter panel for location types
   - Search bar for addresses
   - Directions functionality
   - Legend and map controls
   - Responsive map sizing

   **Heatmap (Heatmap.tsx)**
   - Leaflet heatmap layer
   - Disaster type selector
   - Time range slider
   - Intensity legend
   - Data export button
   - Toggle between map and chart view
   - Animation of historical data

   **Chatbot (Chatbot.tsx)**
   - Chat message list with auto-scroll
   - Message input with send button
   - Quick reply templates
   - Typing indicator
   - Message timestamps
   - User and bot message styling
   - Emoji support
   - Chat history persistence
   - Voice input option (optional)

   **SOS Emergency (sos.tsx)**
   - Emergency contact list
   - Quick dial buttons with large touch targets
   - Location sharing toggle
   - Emergency protocol accordion
   - Alert history
   - Add/edit contact form
   - Prominent visual design with red accents

3. **Shared Components**

   **Navigation (Navigation.tsx)**
   - Responsive navbar with mobile menu
   - Logo and branding
   - Navigation links with active states
   - User profile dropdown
   - Notifications dropdown
   - Theme toggle (light/dark mode)
   - Search bar
   - Sticky header on scroll

   **InteractiveSimulation (InteractiveSimulation.tsx)**
   - Reusable 3D simulation component
   - Props for scenario configuration
   - Event handlers for user interactions
   - Performance optimized rendering
   - Loading states

   **RealLifeSimulation (RealLifeSimulation.tsx)**
   - Alternative simulation view
   - Video-based or image-based scenarios
   - Decision tree navigation
   - Feedback system

4. **UI Component Library (shadcn/ui)**
   - Button with variants (default, destructive, outline, ghost)
   - Card with header, content, footer
   - Dialog/Modal for confirmations
   - Toast notifications using Sonner
   - Form components with validation
   - Tabs for content organization
   - Accordion for collapsible content
   - Progress bars and spinners
   - Tooltip for helpful hints
   - Badge for status indicators
   - Avatar with fallback
   - Dropdown menus
   - Command palette (Cmd+K)

5. **State Management**

   **TanStack Query (React Query)**
   - Query hooks for data fetching
   - Mutation hooks for data updates
   - Automatic caching and refetching
   - Optimistic updates
   - Error handling and retry logic

   **Example Hooks:**
   ```typescript
   useQuery(['user', userId], () => fetchUser(userId))
   useQuery(['simulations'], fetchSimulations)
   useQuery(['leaderboard'], fetchLeaderboard)
   useMutation(completeSimulation)
   useMutation(updateProgress)
   ```

   **Local State:**
   - useState for component-level state
   - useReducer for complex state logic
   - Context API for theme and auth state

6. **Routing Structure**
   ```
   / - Landing page
   /auth - Authentication (login/signup)
   /dashboard - User dashboard
   /simulations - Simulation list
   /simulations/:scenarioId - Active simulation
   /learning - Learning modules
   /govt-resources - Government resources
   /safety-map - Interactive safety map
   /heatmap - Disaster heatmap
   /chatbot - AI chatbot
   /sos - Emergency SOS
   /profile - User profile settings
   /leaderboard - Global leaderboard
   /* - 404 Not Found page
   ```

7. **Styling and Theming**

   **TailwindCSS Configuration:**
   - Custom color palette (primary, secondary, accent)
   - Dark mode support with next-themes
   - Responsive breakpoints
   - Custom animations
   - Typography plugin for content
   - Container queries

   **CSS Variables:**
   - Theme colors in HSL format
   - Consistent spacing scale
   - Border radius values
   - Shadow definitions

8. **3D Graphics (Three.js)**

   **React Three Fiber Setup:**
   - Canvas component for 3D scenes
   - Camera controls (OrbitControls)
   - Lighting setup (ambient, directional, point lights)
   - 3D model loading (GLTF/GLB format)
   - Animations and physics
   - Performance monitoring
   - Responsive canvas sizing

   **Example Simulation Scenes:**
   - Earthquake: Building shaking, objects falling
   - Fire: Flames, smoke particles, evacuation
   - Flood: Rising water, floating objects

9. **Maps Integration (Leaflet)**

   **Leaflet Configuration:**
   - Tile layer (OpenStreetMap or custom)
   - Marker icons for different location types
   - Popup content for markers
   - Heatmap layer for disaster intensity
   - Geolocation API for user position
   - Routing integration (optional)

10. **Forms and Validation**

    **React Hook Form + Zod:**
    - Type-safe form validation
    - Error message display
    - Async validation for unique fields
    - Multi-step forms
    - File upload handling

11. **Performance Optimization**
    - Code splitting with React.lazy()
    - Route-based code splitting
    - Image optimization and lazy loading
    - Memoization with useMemo and useCallback
    - Virtual scrolling for long lists
    - Debouncing search inputs
    - Service worker for offline support (PWA)

12. **Accessibility (a11y)**
    - Semantic HTML elements
    - ARIA labels and roles
    - Keyboard navigation support
    - Focus management
    - Screen reader compatibility
    - Color contrast compliance (WCAG AA)
    - Alt text for images

13. **Error Handling**
    - Error boundaries for component errors
    - Toast notifications for user-facing errors
    - Retry mechanisms for failed requests
    - Fallback UI for loading and error states
    - 404 page for invalid routes

14. **Testing Strategy**
    - Unit tests for utility functions
    - Component tests with React Testing Library
    - Integration tests for user flows
    - E2E tests with Playwright or Cypress
    - Accessibility tests

15. **Build and Deployment**
    - Vite for fast development and building
    - Environment variable management
    - Production optimizations (minification, tree-shaking)
    - Source maps for debugging
    - CI/CD pipeline integration
    - Hosting on Vercel, Netlify, or similar

16. **Progressive Web App (PWA) Features**
    - Service worker for offline functionality
    - App manifest for install prompt
    - Push notifications for alerts
    - Background sync for data updates
    - Cache strategies for assets

17. **Internationalization (i18n) - Optional**
    - Multi-language support
    - RTL layout support
    - Date and number formatting
    - Translation management

18. **Analytics and Monitoring**
    - Google Analytics or similar
    - User behavior tracking
    - Error tracking (Sentry)
    - Performance monitoring (Web Vitals)
    - A/B testing setup
```

---

## Usage Instructions

These prompts can be used with:
- AI diagram generators (Mermaid, Lucidchart, Draw.io)
- Database design tools (dbdiagram.io, DrawSQL)
- Architecture documentation tools
- Code generation AI assistants
- Team collaboration and planning

Each prompt is designed to be comprehensive and can be customized based on specific project requirements.
