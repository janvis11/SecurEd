import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RealLifeSimulation from "@/components/RealLifeSimulation";
import { 
  Flame, Waves, Mountain, Wind, AlertTriangle,
  Trophy, Target, Play, Clock, Users, Star, Zap
} from "lucide-react";
import { toast } from "sonner";

interface SimulationEnvironment {
  id: string;
  name: string;
  type: string;
  description: string;
  duration: number;
  difficulty: string;
  environment: string;
  objectives: string[];
  hazards: string[];
  safetyZones: string[];
  equipment: string[];
  rating: number;
  participants: number;
  featured: boolean;
}

interface UserSession {
  scenario_id: string;
  score: number;
  completed: boolean;
  timeElapsed: number;
}

const disasterIcons = {
  earthquake: Mountain,
  fire: Flame,
  flood: Waves,
  cyclone: Wind,
  tsunami: Waves,
};

const Simulations = () => {
  const [environments, setEnvironments] = useState<SimulationEnvironment[]>([]);
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<SimulationEnvironment | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadEnvironments();
    checkUserOptional();
  }, []);

  // Load simulation environments
  const loadEnvironments = async () => {
    try {
      const sampleEnvironments: SimulationEnvironment[] = [
        {
          id: "earthquake-campus",
          name: "Campus Earthquake Response",
          type: "earthquake",
          description: "Experience a realistic earthquake scenario in a school campus environment",
          duration: 15,
          difficulty: "Intermediate",
          environment: "3D School Campus",
          objectives: [
            "Identify safe zones in the classroom",
            "Execute drop, cover, and hold procedure",
            "Navigate to designated assembly area",
            "Account for all students and staff",
            "Communicate with emergency services"
          ],
          hazards: ["Falling ceiling tiles", "Broken glass windows", "Unstable furniture", "Power outages", "Gas leaks"],
          safetyZones: ["Under sturdy desks", "Interior hallways", "Assembly area (sports field)", "Emergency shelter"],
          equipment: ["Emergency radio", "First aid kit", "Flashlight", "Whistle", "Student roster"],
          rating: 4.8,
          participants: 1250,
          featured: true
        },
        {
          id: "fire-evacuation",
          name: "Fire Evacuation Drill",
          type: "fire",
          description: "Practice fire safety procedures in a multi-story building",
          duration: 20,
          difficulty: "Beginner",
          environment: "3D Multi-story Building",
          objectives: ["Activate fire alarm system", "Check for smoke and heat", "Use proper evacuation routes", "Assist mobility-impaired individuals", "Conduct headcount at assembly point"],
          hazards: ["Smoke inhalation", "Fire spread", "Panic and crowding", "Elevator malfunctions", "Blocked exits"],
          safetyZones: ["Designated stairwells", "Assembly area (parking lot)", "Fire-resistant rooms", "Emergency exits"],
          equipment: ["Fire extinguisher", "Smoke detector", "Emergency lighting", "Two-way radio", "Evacuation chair"],
          rating: 4.6,
          participants: 2100,
          featured: true
        },
        {
          id: "flood-rescue",
          name: "Flood Emergency Response",
          type: "flood",
          description: "Navigate flood conditions and rescue operations",
          duration: 25,
          difficulty: "Advanced",
          environment: "3D Flooded Campus",
          objectives: ["Assess flood water levels", "Move to higher ground", "Rescue trapped individuals", "Secure electrical systems", "Coordinate with emergency services"],
          hazards: ["Rising water levels", "Electrical hazards", "Swift water currents", "Contaminated water", "Structural damage"],
          safetyZones: ["Upper floors", "Elevated platforms", "Emergency shelter", "High ground areas"],
          equipment: ["Life jackets", "Rescue ropes", "Waterproof radio", "Emergency supplies", "Rescue boat"],
          rating: 4.9,
          participants: 890,
          featured: false
        },
        {
          id: "tornado-shelter",
          name: "Tornado Shelter Protocol",
          type: "cyclone",
          description: "Practice tornado safety in various campus locations",
          duration: 12,
          difficulty: "Intermediate",
          environment: "3D Campus with Multiple Buildings",
          objectives: ["Identify tornado warning signs", "Move to designated shelter areas", "Protect head and neck", "Stay away from windows", "Wait for all-clear signal"],
          hazards: ["Flying debris", "Structural collapse", "Broken glass", "Power lines down", "Severe weather"],
          safetyZones: ["Interior rooms (no windows)", "Basement areas", "Storm shelters", "Interior hallways"],
          equipment: ["Weather radio", "Emergency blankets", "First aid supplies", "Flashlight", "Whistle"],
          rating: 4.7,
          participants: 1680,
          featured: false
        }
      ];

      setEnvironments(sampleEnvironments);

      // Optional: Mock user sessions if a user is logged in
      if (user) {
        const mockSessions: UserSession[] = [
          { scenario_id: "earthquake-campus", score: 85, completed: true, timeElapsed: 12 },
          { scenario_id: "fire-evacuation", score: 92, completed: true, timeElapsed: 18 }
        ];
        setUserSessions(mockSessions);
      }

    } catch (error: any) {
      toast.error("Failed to load environments: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Optional user check (does not redirect)
  const checkUserOptional = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setUser(user);
  };

  const startSimulation = (environment: SimulationEnvironment) => {
    setSelectedEnvironment(environment);
  };

  const getBestScore = (scenarioId: string) => {
    if (!user) return null; // only show score if logged in
    const sessions = userSessions.filter(s => s.scenario_id === scenarioId);
    if (sessions.length === 0) return null;
    return Math.max(...sessions.map(s => s.score));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-700 dark:text-green-300";
      case "Intermediate": return "bg-blue-500/20 text-blue-700 dark:text-blue-300";
      case "Advanced": return "bg-red-500/20 text-red-700 dark:text-red-300";
      default: return "bg-gray-500/20 text-gray-700 dark:text-gray-300";
    }
  };

  const filteredEnvironments = environments.filter(env => {
    if (filter === "all") return true;
    if (filter === "featured") return env.featured;
    return env.type === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedEnvironment) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <RealLifeSimulation
              environment={selectedEnvironment}
              onComplete={(score, timeElapsed) => {
                console.log(`Simulation completed: ${score} points in ${timeElapsed} seconds`);
                setSelectedEnvironment(null);
                toast.success(`Simulation completed! Score: ${Math.round(score)}`);
              }}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">
              Real-Life Simulations
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience immersive 3D disaster scenarios with realistic environments, objectives, and real-time decision making
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-3xl font-bold">{user ? userSessions.length : 0}</p>
                  </div>
                  <Trophy className="h-12 w-12 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Score</p>
                    <p className="text-3xl font-bold">
                      {user && userSessions.length > 0
                        ? Math.round(
                            userSessions.reduce((acc, s) => acc + s.score, 0) /
                              userSessions.length
                          )
                        : 0}
                    </p>
                  </div>
                  <Target className="h-12 w-12 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="text-3xl font-bold">{environments.length}</p>
                  </div>
                  <AlertTriangle className="h-12 w-12 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Time</p>
                    <p className="text-3xl font-bold">
                      {user ? userSessions.reduce((acc, s) => acc + (s.timeElapsed || 0), 0) : 0}m
                    </p>
                  </div>
                  <Clock className="h-12 w-12 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {["all", "featured", "earthquake", "fire", "flood", "cyclone"].map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                onClick={() => setFilter(filterType)}
                className="capitalize"
              >
                {filterType === "all" ? "All Simulations" : 
                 filterType === "featured" ? "Featured" : filterType}
              </Button>
            ))}
          </div>

          {/* Simulation Environments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEnvironments.map((environment) => {
              const Icon = disasterIcons[environment.type as keyof typeof disasterIcons];
              const bestScore = getBestScore(environment.id);
              const difficultyClass = getDifficultyColor(environment.difficulty);

              return (
                <Card
                  key={environment.id}
                  className="group hover:shadow-2xl transition-all duration-500 border-primary/20 hover:border-primary/40 hover:-translate-y-2"
                >
                  {environment.featured && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <Badge className="bg-gradient-hero text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-hero">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <Badge className={difficultyClass}>
                        {environment.difficulty}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl mb-2">{environment.name}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {environment.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Environment Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="w-4 h-4" />
                        <span>{environment.environment}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{environment.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{environment.participants.toLocaleString()} participants</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{environment.rating}/5.0 rating</span>
                      </div>
                    </div>

                    {/* Objectives Preview */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-muted-foreground">Objectives:</h4>
                      <div className="space-y-1">
                        {environment.objectives.slice(0, 3).map((objective, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span className="line-clamp-1">{objective}</span>
                          </div>
                        ))}
                        {environment.objectives.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{environment.objectives.length - 3} more objectives
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Performance Stats */}
                    {bestScore !== null && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-muted/50 rounded-lg">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span>Best Score: {bestScore}%</span>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      onClick={() => startSimulation(environment)}
                      className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      variant={bestScore !== null ? "outline" : "default"}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {bestScore !== null ? "Retry Simulation" : "Start Simulation"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredEnvironments.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Simulations Available</h3>
              <p className="text-muted-foreground">
                Check back later for new real-life simulation environments
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Simulations;
