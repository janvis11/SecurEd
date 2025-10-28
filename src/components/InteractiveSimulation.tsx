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
  Wind
} from "lucide-react";

interface SimulationStep {
  id: string;
  title: string;
  description: string;
  action: string;
  correct: boolean;
  feedback: string;
  icon: React.ReactNode;
  color: string;
}

interface InteractiveSimulationProps {
  scenario: {
    id: string;
    title: string;
    type: string;
    description: string;
    steps: SimulationStep[];
  };
  onComplete?: (score: number) => void;
}

const disasterIcons = {
  earthquake: Mountain,
  fire: Flame,
  flood: Waves,
  cyclone: Wind,
  tsunami: Waves,
};

const InteractiveSimulation = ({ scenario, onComplete }: InteractiveSimulationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !completed) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, completed]);

  const handleAction = (action: string) => {
    if (showFeedback) return;
    
    setSelectedAction(action);
    const step = scenario.steps[currentStep];
    const isCorrect = action === step.action;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentStep < scenario.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setSelectedAction(null);
        setShowFeedback(false);
      } else {
        setCompleted(true);
        setIsPlaying(false);
        onComplete?.(score + (isCorrect ? 10 : 0));
      }
    }, 2000);
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setScore(0);
    setCompleted(false);
    setTimeElapsed(0);
    setSelectedAction(null);
    setShowFeedback(false);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentStep + 1) / scenario.steps.length) * 100;
  const currentStepData = scenario.steps[currentStep];
  const Icon = disasterIcons[scenario.type as keyof typeof disasterIcons] || AlertTriangle;

  if (completed) {
    const percentage = Math.round((score / (scenario.steps.length * 10)) * 100);
    return (
      <Card className="w-full max-w-2xl mx-auto border-primary/20 shadow-2xl">
        <CardHeader className="text-center bg-gradient-card">
          <div className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <CardTitle className="text-2xl text-success">Simulation Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-4xl font-bold text-primary">{score}</div>
          <div className="text-lg text-muted-foreground">Points Earned</div>
          <div className="text-2xl font-bold">{percentage}% Score</div>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatTime(timeElapsed)}
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              {scenario.steps.length} Steps
            </div>
          </div>
          <Button onClick={resetSimulation} className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-primary/20 shadow-2xl">
      <CardHeader className="bg-gradient-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{scenario.title}</CardTitle>
              <p className="text-sm text-muted-foreground">Step {currentStep + 1} of {scenario.steps.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(timeElapsed)}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Target className="w-3 h-3 mr-1" />
              {score} pts
            </Badge>
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="text-lg font-semibold">{currentStepData.title}</div>
          <p className="text-muted-foreground">{currentStepData.description}</p>
        </div>

        <div className="space-y-3">
          {[
            { key: "A", text: "Drop, Cover, and Hold On", icon: <Shield className="w-4 h-4" /> },
            { key: "B", text: "Run to the nearest exit", icon: <Target className="w-4 h-4" /> },
            { key: "C", text: "Stand in a doorway", icon: <AlertTriangle className="w-4 h-4" /> },
            { key: "D", text: "Go outside immediately", icon: <AlertTriangle className="w-4 h-4" /> }
          ].map((option) => {
            const isSelected = selectedAction === option.key;
            const isCorrect = option.key === currentStepData.action;
            const showAsCorrect = showFeedback && isCorrect;
            const showAsWrong = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={option.key}
                onClick={() => handleAction(option.key)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  showAsCorrect
                    ? "border-success bg-success/10 shadow-md"
                    : showAsWrong
                    ? "border-destructive bg-destructive/10 shadow-md"
                    : isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    showAsCorrect
                      ? "bg-success text-success-foreground"
                      : showAsWrong
                      ? "bg-destructive text-destructive-foreground"
                      : isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {option.key}
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    {option.icon}
                    <span className="text-base">{option.text}</span>
                    {showAsCorrect && <CheckCircle2 className="w-5 h-5 text-success" />}
                    {showAsWrong && <AlertTriangle className="w-5 h-5 text-destructive" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className={`p-4 rounded-lg border-2 ${
            selectedAction === currentStepData.action 
              ? "border-success bg-success/5" 
              : "border-destructive bg-destructive/5"
          }`}>
            <div className="flex items-start gap-3">
              {selectedAction === currentStepData.action ? (
                <CheckCircle2 className="w-6 h-6 text-success mt-1 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
              )}
              <div>
                <p className="font-bold text-lg mb-2">
                  {selectedAction === currentStepData.action ? "Correct! +10 points" : "Incorrect"}
                </p>
                <p className="text-sm leading-relaxed">
                  {currentStepData.feedback}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-2">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={completed}
            className="flex-1"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {currentStep === 0 ? "Start" : "Resume"}
              </>
            )}
          </Button>
          <Button
            onClick={resetSimulation}
            variant="outline"
            disabled={isPlaying}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveSimulation;
