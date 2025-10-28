import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Target,
  Shield,
  Flame,
  Waves,
  Mountain,
  Wind,
  Eye,
  Volume2,
  VolumeX,
  Settings,
  Maximize2
} from "lucide-react";

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
}

interface RealLifeSimulationProps {
  environment: SimulationEnvironment;
  onComplete?: (score: number, timeElapsed: number) => void;
}

const disasterIcons = {
  earthquake: Mountain,
  fire: Flame,
  flood: Waves,
  cyclone: Wind,
  tsunami: Waves,
};

const RealLifeSimulation = ({ environment, onComplete }: RealLifeSimulationProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentObjective, setCurrentObjective] = useState(0);
  const [completedObjectives, setCompletedObjectives] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isCompleted]);

  useEffect(() => {
    setCompletedObjectives(new Array(environment.objectives.length).fill(false));
  }, [environment.objectives.length]);

  const handleObjectiveComplete = (objectiveIndex: number) => {
    if (completedObjectives[objectiveIndex]) return;
    
    const newCompleted = [...completedObjectives];
    newCompleted[objectiveIndex] = true;
    setCompletedObjectives(newCompleted);
    
    const pointsEarned = 100 / environment.objectives.length;
    setScore(prev => prev + pointsEarned);
    
    if (objectiveIndex < environment.objectives.length - 1) {
      setCurrentObjective(objectiveIndex + 1);
    } else {
      setIsCompleted(true);
      setIsPlaying(false);
      onComplete?.(score + pointsEarned, timeElapsed);
    }
  };

  const resetSimulation = () => {
    setCurrentObjective(0);
    setScore(0);
    setIsCompleted(false);
    setTimeElapsed(0);
    setCompletedObjectives(new Array(environment.objectives.length).fill(false));
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (completedObjectives.filter(Boolean).length / environment.objectives.length) * 100;
  const Icon = disasterIcons[environment.type as keyof typeof disasterIcons] || AlertTriangle;

  if (isCompleted) {
    const finalScore = Math.round(score);
    return (
      <Card className="w-full max-w-4xl mx-auto border-primary/20 shadow-2xl">
        <CardHeader className="text-center bg-gradient-card">
          <div className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <CardTitle className="text-3xl text-success">Simulation Complete!</CardTitle>
          <p className="text-muted-foreground">You've successfully completed the {environment.name} simulation</p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-card rounded-lg p-6">
              <div className="text-4xl font-bold text-primary mb-2">{finalScore}</div>
              <div className="text-muted-foreground">Final Score</div>
            </div>
            <div className="bg-gradient-card rounded-lg p-6">
              <div className="text-4xl font-bold text-secondary mb-2">{formatTime(timeElapsed)}</div>
              <div className="text-muted-foreground">Time Taken</div>
            </div>
            <div className="bg-gradient-card rounded-lg p-6">
              <div className="text-4xl font-bold text-success mb-2">{environment.objectives.length}</div>
              <div className="text-muted-foreground">Objectives Completed</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What You Learned:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {environment.objectives.map((objective, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-success/10">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-sm">{objective}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={resetSimulation} size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button onClick={() => window.location.href = '/simulations'} variant="outline" size="lg">
              Back to Simulations
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-6xl mx-auto border-primary/20 shadow-2xl ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <CardHeader className="bg-gradient-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">{environment.name}</CardTitle>
              <p className="text-muted-foreground">{environment.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(timeElapsed)}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Target className="w-3 h-3 mr-1" />
              {Math.round(score)} pts
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <Progress value={progress} className="h-3" />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>Progress: {completedObjectives.filter(Boolean).length}/{environment.objectives.length}</span>
          <span>Objective {currentObjective + 1} of {environment.objectives.length}</span>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D Environment View */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg h-96 overflow-hidden">
              {/* Animated Instruction Video/Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white w-full h-full">
                  {/* Animated instruction based on current objective */}
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                    <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                      <Icon className="w-24 h-24 text-primary animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{environment.environment}</h3>
                    
                    {/* Animated instruction text */}
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 max-w-md animate-fade-in">
                      <p className="text-lg font-semibold mb-2">Current Action:</p>
                      <p className="text-base opacity-90">{environment.objectives[currentObjective]}</p>
                      
                      {/* Visual animation indicators */}
                      <div className="mt-4 flex justify-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary animate-ping"></div>
                        <div className="w-3 h-3 rounded-full bg-secondary animate-ping delay-100"></div>
                        <div className="w-3 h-3 rounded-full bg-success animate-ping delay-200"></div>
                      </div>
                    </div>
                    
                    {/* Instruction-specific animations */}
                    {environment.objectives[currentObjective].toLowerCase().includes('fire') && (
                      <div className="absolute top-10 right-10">
                        <Flame className="w-16 h-16 text-orange-500 animate-pulse" />
                      </div>
                    )}
                    {environment.objectives[currentObjective].toLowerCase().includes('earthquake') && (
                      <div className="absolute bottom-10 left-10">
                        <Mountain className="w-16 h-16 text-yellow-500 animate-bounce" />
                      </div>
                    )}
                    {environment.objectives[currentObjective].toLowerCase().includes('flood') && (
                      <div className="absolute top-10 left-10">
                        <Waves className="w-16 h-16 text-blue-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Environment Controls */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Button size="sm" variant="secondary">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="secondary">
                  <Settings className="w-4 h-4 mr-1" />
                  Settings
                </Button>
              </div>
              
              {/* Current Objective Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Current Objective:</h4>
                <p className="text-white/90 text-sm">{environment.objectives[currentObjective]}</p>
                <Button 
                  size="sm" 
                  className="mt-3"
                  onClick={() => handleObjectiveComplete(currentObjective)}
                >
                  Complete Objective
                </Button>
              </div>
            </div>
          </div>

          {/* Simulation Info Panel */}
          <div className="space-y-4">
            {/* Objectives List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Objectives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {environment.objectives.map((objective, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      completedObjectives[index] 
                        ? 'bg-success/10 border border-success/20' 
                        : index === currentObjective 
                        ? 'bg-primary/10 border border-primary/20' 
                        : 'bg-muted/50'
                    }`}
                  >
                    {completedObjectives[index] ? (
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    ) : (
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        index === currentObjective ? 'border-primary bg-primary/20' : 'border-muted-foreground'
                      }`} />
                    )}
                    <span className="text-sm">{objective}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Safety Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Safety Zones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {environment.safetyZones.map((zone, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <Shield className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm">{zone}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Equipment Available */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Equipment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {environment.equipment.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <Target className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={isCompleted}
            size="lg"
            className="flex-1 max-w-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause Simulation
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {currentObjective === 0 ? "Start Simulation" : "Resume"}
              </>
            )}
          </Button>
          <Button
            onClick={resetSimulation}
            variant="outline"
            disabled={isPlaying}
            size="lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealLifeSimulation;
