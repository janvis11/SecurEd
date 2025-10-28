-- Add more disaster scenarios and simulation questions table

-- Create simulation questions table for interactive decisions
CREATE TABLE IF NOT EXISTS public.simulation_questions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_id uuid NOT NULL REFERENCES public.disaster_scenarios(id) ON DELETE CASCADE,
  question_order integer NOT NULL,
  situation_text text NOT NULL,
  question_text text NOT NULL,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  option_d text NOT NULL,
  correct_option text NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
  feedback_correct text,
  feedback_incorrect text,
  points integer DEFAULT 10,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.simulation_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view simulation questions"
  ON public.simulation_questions
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage simulation questions"
  ON public.simulation_questions
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert more diverse disaster scenarios
INSERT INTO public.disaster_scenarios (type, title, description, difficulty_level, region_specific, applicable_regions)
VALUES
  -- Advanced scenarios
  ('tsunami', 'Coastal Tsunami Alert', 'A massive earthquake off the coast has triggered a tsunami warning. You have 20 minutes to evacuate.', 5, true, ARRAY['coastal']),
  ('cyclone', 'Category 4 Cyclone Approaching', 'A severe cyclone is approaching your region with winds exceeding 200 km/h. Immediate shelter is required.', 4, true, ARRAY['coastal', 'tropical']),
  ('earthquake', 'Urban Earthquake Response', 'A 7.5 magnitude earthquake has struck during school hours. Multiple aftershocks expected.', 5, false, NULL),
  ('flood', 'Flash Flood Emergency', 'Unexpected heavy rainfall has caused rapid flooding. Water levels rising quickly in low-lying areas.', 4, false, NULL),
  ('fire', 'Laboratory Fire Outbreak', 'A chemical fire has started in the science lab. Toxic fumes spreading through the building.', 5, false, NULL),
  ('earthquake', 'Night-time Earthquake', 'A moderate earthquake strikes at 2 AM while everyone is sleeping in the dormitory.', 3, false, NULL),
  ('fire', 'Cafeteria Kitchen Fire', 'Cooking oil fire in the school cafeteria during lunch hour. Smoke filling adjacent areas.', 3, false, NULL),
  ('cyclone', 'Tropical Storm Warning', 'A tropical storm is expected within 6 hours. Winds up to 100 km/h predicted.', 2, true, ARRAY['tropical', 'subtropical']),
  ('flood', 'River Overflow Alert', 'The nearby river is above danger level. Evacuation may be necessary within 4 hours.', 3, true, ARRAY['riverside']),
  ('tsunami', 'Tsunami Drill Simulation', 'Practice scenario for coastal tsunami response and evacuation procedures.', 2, true, ARRAY['coastal']);

-- Get scenario IDs for question insertion
DO $$
DECLARE
  earthquake_urban_id uuid;
  tsunami_coastal_id uuid;
  cyclone_cat4_id uuid;
  flood_flash_id uuid;
  fire_lab_id uuid;
  earthquake_basic_id uuid;
BEGIN
  -- Get scenario IDs
  SELECT id INTO earthquake_urban_id FROM disaster_scenarios WHERE title = 'Urban Earthquake Response';
  SELECT id INTO tsunami_coastal_id FROM disaster_scenarios WHERE title = 'Coastal Tsunami Alert';
  SELECT id INTO cyclone_cat4_id FROM disaster_scenarios WHERE title = 'Category 4 Cyclone Approaching';
  SELECT id INTO flood_flash_id FROM disaster_scenarios WHERE title = 'Flash Flood Emergency';
  SELECT id INTO fire_lab_id FROM disaster_scenarios WHERE title = 'Laboratory Fire Outbreak';
  SELECT id INTO earthquake_basic_id FROM disaster_scenarios WHERE title = 'Basic Earthquake Safety';

  -- Urban Earthquake Response Questions
  IF earthquake_urban_id IS NOT NULL THEN
    INSERT INTO simulation_questions (scenario_id, question_order, situation_text, question_text, option_a, option_b, option_c, option_d, correct_option, feedback_correct, feedback_incorrect, points)
    VALUES
      (earthquake_urban_id, 1, 'You are in a classroom on the 3rd floor when violent shaking begins. Books and objects are falling from shelves.', 'What is your FIRST action?', 'Run to the exit immediately', 'Drop, Cover, and Hold On under a desk', 'Stand in the doorway', 'Open windows for fresh air', 'B', 'Correct! Drop, Cover, and Hold On is the safest immediate response during an earthquake.', 'Running during shaking is dangerous. Always Drop, Cover, and Hold On first.', 15),
      (earthquake_urban_id, 2, 'The shaking has stopped. You notice cracks in the walls and the smell of gas.', 'What should you do next?', 'Use your phone to call for help', 'Turn on lights to see better', 'Evacuate immediately using stairs', 'Wait for instructions from authorities', 'C', 'Excellent! Evacuate immediately using stairs (never elevators) when you smell gas or see structural damage.', 'Gas leaks are extremely dangerous. Evacuate immediately and avoid anything that could cause a spark.', 15),
      (earthquake_urban_id, 3, 'During evacuation, you see a classmate trapped under a fallen cabinet in the hallway.', 'What is the best course of action?', 'Try to lift the cabinet alone', 'Leave them and continue evacuating', 'Call for adult help while providing comfort', 'Take a photo to show authorities', 'C', 'Perfect! Get adult help immediately while staying to comfort the person. Never leave injured people alone.', 'Never attempt heavy lifting alone or abandon injured people. Get trained help quickly.', 20),
      (earthquake_urban_id, 4, 'You have safely evacuated to the assembly point. Small aftershocks continue.', 'What should you do while waiting?', 'Go back inside to get your belongings', 'Stay in the open assembly area', 'Gather near the building for shelter', 'Leave campus to go home', 'B', 'Correct! Stay in the designated assembly area away from buildings until given all-clear by authorities.', 'Never re-enter buildings during aftershocks. Stay in designated safe zones.', 10),
      (earthquake_urban_id, 5, 'Hours later, you are at home. Another strong aftershock hits while you are cooking.', 'What is your priority?', 'Save the food from burning', 'Turn off the stove and take cover', 'Run outside immediately', 'Hide in the bathroom', 'B', 'Excellent! Turn off heat sources if safe to do so, then Drop, Cover, and Hold On.', 'Always prioritize safety over property. Turn off hazards then take cover.', 15);
  END IF;

  -- Tsunami Coastal Alert Questions
  IF tsunami_coastal_id IS NOT NULL THEN
    INSERT INTO simulation_questions (scenario_id, question_order, situation_text, question_text, option_a, option_b, option_c, option_d, correct_option, feedback_correct, feedback_incorrect, points)
    VALUES
      (tsunami_coastal_id, 1, 'Tsunami sirens begin blaring. You are in a coastal school 500m from the beach.', 'What is your immediate action?', 'Go to the beach to see the wave', 'Move to the highest floor of the building', 'Evacuate inland to high ground immediately', 'Wait for teachers instructions', 'C', 'Perfect! Evacuate inland and upward immediately. Every second counts in a tsunami.', 'Never wait or move toward the coast during a tsunami warning. Evacuate immediately to high ground.', 20),
      (tsunami_coastal_id, 2, 'While evacuating, you see the ocean water rapidly receding from the shore.', 'What does this indicate?', 'The tsunami has passed', 'The tsunami wave is approaching', 'It is safe to collect stranded fish', 'A false alarm has occurred', 'B', 'Correct! Rapid water recession is a natural tsunami warning sign. The wave is coming soon!', 'Water receding is a critical warning sign. The tsunami wave follows within minutes!', 15),
      (tsunami_coastal_id, 3, 'You reach high ground 3km inland. Some people want to return to get belongings.', 'What should you advise?', 'Return quickly if you run fast', 'Wait at least 30 minutes then go', 'Stay until official all-clear is given', 'Send one person to check', 'C', 'Excellent! Multiple waves can occur hours apart. Only return after official all-clear.', 'Tsunamis have multiple waves over many hours. Never return until authorities declare it safe.', 15),
      (tsunami_coastal_id, 4, 'From high ground, you see the first wave flooding the coastal area. Your phone has signal.', 'What is the best use of your phone?', 'Take photos for social media', 'Call family to confirm safety', 'Record video of the wave', 'Check the news', 'B', 'Perfect! Quickly inform loved ones you are safe, then conserve battery for emergencies.', 'During emergencies, prioritize safety communication over documentation. Conserve battery.', 10),
      (tsunami_coastal_id, 5, 'After 2 hours, water has receded but no official word. People are returning to their homes.', 'Should you follow them?', 'Yes, if many people are going', 'Yes, to check for damage quickly', 'No, wait for official all-clear', 'Yes, but only to main roads', 'C', 'Correct! Subsequent waves can be larger. Always wait for official all-clear before returning.', 'Later tsunami waves can be larger than the first. Never return without official clearance.', 15);
  END IF;

  -- Basic Earthquake Safety (for existing scenario)
  IF earthquake_basic_id IS NOT NULL THEN
    INSERT INTO simulation_questions (scenario_id, question_order, situation_text, question_text, option_a, option_b, option_c, option_d, correct_option, feedback_correct, feedback_incorrect, points)
    VALUES
      (earthquake_basic_id, 1, 'You feel the ground shaking while sitting at your desk in class.', 'What should you do immediately?', 'Run to the door', 'Drop, Cover, and Hold On', 'Stand still and wait', 'Look out the window', 'B', 'Perfect! Drop, Cover, and Hold On is the correct response during earthquake shaking.', 'Never run during an earthquake. Drop, Cover, and Hold On protects you from falling objects.', 10),
      (earthquake_basic_id, 2, 'The shaking stops. Your teacher tells everyone to evacuate.', 'What should you do?', 'Run as fast as possible', 'Walk calmly using stairs only', 'Use the elevator for speed', 'Stay in class until parents arrive', 'B', 'Excellent! Walk calmly and use stairs only. Never use elevators during earthquakes.', 'Elevators can trap you during aftershocks. Always use stairs and move calmly.', 10),
      (earthquake_basic_id, 3, 'You are safely at the assembly point. You forgot your backpack inside.', 'What should you do?', 'Run back quickly to get it', 'Ask a teacher if you can retrieve it', 'Wait for permission to re-enter', 'Forget about it for now', 'C', 'Correct! Never re-enter buildings without official permission. Belongings can be replaced.', 'Never re-enter damaged buildings. Aftershocks can cause collapse. Your life matters most!', 10);
  END IF;

  -- Cyclone Questions
  IF cyclone_cat4_id IS NOT NULL THEN
    INSERT INTO simulation_questions (scenario_id, question_order, situation_text, question_text, option_a, option_b, option_c, option_d, correct_option, feedback_correct, feedback_incorrect, points)
    VALUES
      (cyclone_cat4_id, 1, 'A Category 4 cyclone will hit in 3 hours. You are at home with your family.', 'What is the first priority?', 'Board up all windows', 'Move to an interior room away from windows', 'Charge all electronic devices', 'Prepare emergency food and water', 'B', 'Correct! Moving to an interior room is the first safety priority as the cyclone approaches.', 'Shelter location is most critical. Move to the safest room first, then handle other preparations.', 15),
      (cyclone_cat4_id, 2, 'You hear loud crashes as the cyclone hits. Windows are breaking in other rooms.', 'Where should you shelter?', 'Under a staircase or sturdy table', 'In a bathroom with no windows', 'In a closet on the ground floor', 'All of the above', 'D', 'Excellent! All these locations provide protection from flying debris and structural failure.', 'Multiple safe locations exist. Choose the most interior room away from windows and exterior walls.', 15),
      (cyclone_cat4_id, 3, 'The wind suddenly stops completely. It has been loud for 2 hours.', 'What is happening?', 'The cyclone has passed', 'You are in the eye of the cyclone', 'It is safe to go outside', 'The cyclone has weakened', 'B', 'Perfect! This is the eye of the cyclone. Stay sheltered - the other side will hit soon!', 'The calm eye can last 30-60 minutes before the worst winds resume. Never leave shelter!', 20),
      (cyclone_cat4_id, 4, 'After the cyclone passes, you see downed power lines outside.', 'What should you assume about them?', 'They are safe if not sparking', 'They are all live and dangerous', 'They are safe if in water', 'They are safe after 1 hour', 'B', 'Correct! Always assume all downed power lines are live and extremely dangerous.', 'Downed power lines are deadly even if not sparking. Stay far away and report them.', 10);
  END IF;
END $$;