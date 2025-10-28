-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'student', 'faculty', 'coordinator');

-- Create enum for disaster types
CREATE TYPE public.disaster_type AS ENUM ('earthquake', 'fire', 'flood', 'cyclone', 'tsunami');

-- Create enum for drill status
CREATE TYPE public.drill_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  institution_id UUID,
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create institutions table
CREATE TABLE public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- school, college, university
  district TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key for profiles
ALTER TABLE public.profiles ADD CONSTRAINT fk_institution 
  FOREIGN KEY (institution_id) REFERENCES public.institutions(id) ON DELETE SET NULL;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create disaster_scenarios table
CREATE TABLE public.disaster_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type public.disaster_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
  region_specific BOOLEAN DEFAULT FALSE,
  applicable_regions TEXT[], -- array of districts/states
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create simulation_sessions table
CREATE TABLE public.simulation_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  scenario_id UUID REFERENCES public.disaster_scenarios(id) ON DELETE CASCADE NOT NULL,
  score INTEGER DEFAULT 0,
  max_score INTEGER DEFAULT 100,
  time_taken INTEGER, -- in seconds
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create simulation_decisions table
CREATE TABLE public.simulation_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.simulation_sessions(id) ON DELETE CASCADE NOT NULL,
  decision_point TEXT NOT NULL,
  user_choice TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  points_awarded INTEGER DEFAULT 0,
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create drills table
CREATE TABLE public.drills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  scenario_id UUID REFERENCES public.disaster_scenarios(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  status public.drill_status DEFAULT 'scheduled',
  target_departments TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create drill_participation table
CREATE TABLE public.drill_participation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drill_id UUID REFERENCES public.drills(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  participated BOOLEAN DEFAULT FALSE,
  response_time INTEGER, -- in seconds
  safety_score INTEGER CHECK (safety_score BETWEEN 0 AND 100),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(drill_id, user_id)
);

-- Create preparedness_scores table
CREATE TABLE public.preparedness_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  overall_score INTEGER DEFAULT 0 CHECK (overall_score BETWEEN 0 AND 100),
  earthquake_score INTEGER DEFAULT 0,
  fire_score INTEGER DEFAULT 0,
  flood_score INTEGER DEFAULT 0,
  quiz_points INTEGER DEFAULT 0,
  simulation_points INTEGER DEFAULT 0,
  drill_points INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create badges table
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_url TEXT,
  points_required INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_badges table
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Create safety_zones table
CREATE TABLE public.safety_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- assembly_point, fire_exit, medical_station, shelter
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  capacity INTEGER,
  floor_number INTEGER,
  building_name TEXT,
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disaster_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulation_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drill_participation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preparedness_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_zones ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for institutions
CREATE POLICY "Anyone can view institutions"
  ON public.institutions FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage institutions"
  ON public.institutions FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for disaster_scenarios
CREATE POLICY "Anyone can view scenarios"
  ON public.disaster_scenarios FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage scenarios"
  ON public.disaster_scenarios FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for simulation_sessions
CREATE POLICY "Users can view own sessions"
  ON public.simulation_sessions FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create own sessions"
  ON public.simulation_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON public.simulation_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for simulation_decisions
CREATE POLICY "Users can view own decisions"
  ON public.simulation_decisions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.simulation_sessions
      WHERE simulation_sessions.id = simulation_decisions.session_id
      AND simulation_sessions.user_id = auth.uid()
    )
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Users can insert own decisions"
  ON public.simulation_decisions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.simulation_sessions
      WHERE simulation_sessions.id = simulation_decisions.session_id
      AND simulation_sessions.user_id = auth.uid()
    )
  );

-- RLS Policies for drills
CREATE POLICY "Users can view drills"
  ON public.drills FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins and coordinators can manage drills"
  ON public.drills FOR ALL
  USING (
    public.has_role(auth.uid(), 'admin') 
    OR public.has_role(auth.uid(), 'coordinator')
  );

-- RLS Policies for drill_participation
CREATE POLICY "Users can view own participation"
  ON public.drill_participation FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert own participation"
  ON public.drill_participation FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own participation"
  ON public.drill_participation FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for preparedness_scores
CREATE POLICY "Users can view own scores"
  ON public.preparedness_scores FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert own scores"
  ON public.preparedness_scores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scores"
  ON public.preparedness_scores FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for badges
CREATE POLICY "Anyone can view badges"
  ON public.badges FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage badges"
  ON public.badges FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_badges
CREATE POLICY "Users can view all user badges"
  ON public.user_badges FOR SELECT
  USING (TRUE);

CREATE POLICY "System can award badges"
  ON public.user_badges FOR INSERT
  WITH CHECK (TRUE);

-- RLS Policies for safety_zones
CREATE POLICY "Anyone can view safety zones"
  ON public.safety_zones FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage safety zones"
  ON public.safety_zones FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_preparedness_scores_updated_at
  BEFORE UPDATE ON public.preparedness_scores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default disaster scenarios
INSERT INTO public.disaster_scenarios (type, title, description, difficulty_level, region_specific) VALUES
('earthquake', 'School Earthquake Drill', 'Practice earthquake safety procedures in a school setting', 1, FALSE),
('fire', 'Laboratory Fire Emergency', 'Handle a fire emergency in a science laboratory', 2, FALSE),
('flood', 'Campus Flood Evacuation', 'Navigate safely during a flood situation', 2, TRUE),
('cyclone', 'Coastal Storm Preparedness', 'Prepare for and respond to a cyclone warning', 3, TRUE);

-- Insert default badges
INSERT INTO public.badges (name, description, points_required) VALUES
('Safety Novice', 'Completed your first simulation', 0),
('Earthquake Expert', 'Mastered all earthquake scenarios', 500),
('Fire Safety Champion', 'Perfect score in all fire drills', 500),
('Flood Navigator', 'Successfully completed all flood scenarios', 500),
('Preparedness Pro', 'Achieved 90%+ overall preparedness score', 1000),
('Drill Master', 'Participated in 10+ drills', 300),
('Quick Responder', 'Consistently fast response times', 400);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User')
  );
  
  -- Insert default role as student
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student');
  
  -- Initialize preparedness score
  INSERT INTO public.preparedness_scores (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();