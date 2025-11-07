import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, Award, Flame, Waves, Mountain, Wind, Trophy, Home } from "lucide-react";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";

interface SimulationQuestion {
  id: string;
  scenario_id: string;
  question_order: number;
  situation_text: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  feedback_correct: string;
  feedback_incorrect: string;
  points: number;
}

const disasterIcons = {
  earthquake: Mountain,
  fire: Flame,
  flood: Waves,
  cyclone: Wind,
  tsunami: Waves,
};

const SimulationPlay = () => {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = location.state?.sessionId;

  const [scenario, setScenario] = useState<any>(null);
  const [questions, setQuestions] = useState<SimulationQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState(Date.now());
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!sessionId || !scenarioId) {
      toast.error("Invalid simulation session");
      navigate("/simulations");
      return;
    }
    
    loadScenario();
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [scenarioId, sessionId]);

  const loadScenario = async () => {
    try {
      const { data: scenarioData, error: scenarioError } = await supabase
        .from("disaster_scenarios")
        .select("*")
        .eq("id", scenarioId)
        .single();

      if (scenarioError) throw scenarioError;

      const { data: questionsData, error: questionsError } = await supabase
        .from("simulation_questions")
        .select("*")
        .eq("scenario_id", scenarioId)
        .order("question_order", { ascending: true });

      if (questionsError) throw questionsError;

      if (!questionsData || questionsData.length === 0) {
        toast.error("No questions available for this scenario");
        navigate("/simulations");
        return;
      }

      setScenario(scenarioData);
      setQuestions(questionsData);
      setTotalPoints(questionsData.reduce((sum, q) => sum + q.points, 0));
    } catch (error: any) {
      toast.error("Failed to load scenario: " + error.message);
      navigate("/simulations");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (option: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(option);
    const currentQ = questions[currentQuestion];
    const correct = option === currentQ.correct_option;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(prev => prev + currentQ.points);
    }

    try {
      await supabase.from("simulation_decisions").insert({
        session_id: sessionId,
        decision_point: `Question ${currentQuestion + 1}`,
        user_choice: `Option ${option}`,
        is_correct: correct,
        points_awarded: correct ? currentQ.points : 0,
        feedback: correct ? currentQ.feedback_correct : currentQ.feedback_incorrect
      });
    } catch (error) {
      console.error("Failed to save decision:", error);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      completeSimulation();
    }
  };

  const completeSimulation = async () => {
    try {
      const finalScore = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;
      
      await supabase
        .from("simulation_sessions")
        .update({
          completed: true,
          completed_at: new Date().toISOString(),
          score: finalScore,
          time_taken: timeElapsed,
          max_score: totalPoints
        })
        .eq("id", sessionId);

      setCompleted(true);
      toast.success(`Simulation completed! Score: ${finalScore}%`);
    } catch (error: any) {
      toast.error("Failed to complete simulation: " + error.message);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 flex items-center justify-center h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 flex items-center justify-center h-[80vh]">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>No Questions Available</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/simulations")}>Back to Simulations</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (completed) {
    const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;
    let rating = "Needs Improvement";
    let ratingColor = "text-destructive";
    
    if (percentage >= 90) {
      rating = "Excellent!";
      ratingColor = "text-success";
    } else if (percentage >= 70) {
      rating = "Good Job!";
      ratingColor = "text-primary";
    } else if (percentage >= 50) {
      rating = "Fair";
      ratingColor = "text-secondary";
    }

    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="border-primary/20 shadow-2xl">
              <CardContent className="pt-12 pb-8 text-center space-y-6">
                <Trophy className="h-24 w-24 text-primary mx-auto animate-bounce" />
                <h1 className="text-4xl font-bold gradient-text">
                  Simulation Complete!
                </h1>
                
                <div className="space-y-6">
                  <div className="bg-gradient-card rounded-lg p-6">
                    <p className="text-6xl font-bold mb-2">{score}</p>
                    <p className="text-muted-foreground">Total Points Earned</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-6">
                    <p className={`text-3xl font-bold ${ratingColor} mb-2`}>
                      {rating}
                    </p>
                    <p className="text-lg text-muted-foreground">
                      {percentage}% Score
                    </p>
                  </div>

                  <div className="flex justify-around text-center border-t pt-6">
                    <div>
                      <p className="text-2xl font-bold">{questions.length}</p>
                      <p className="text-sm text-muted-foreground">Questions</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{formatTime(timeElapsed)}</p>
                      <p className="text-sm text-muted-foreground">Time Taken</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center pt-6">
                  <Button onClick={() => navigate("/simulations")} variant="outline" size="lg">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Simulations
                  </Button>
                  <Button onClick={() => navigate("/dashboard")} size="lg">
                    View Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const Icon = disasterIcons[scenario?.type as keyof typeof disasterIcons] || AlertCircle;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-2xl border-primary/20">
            <CardHeader className="bg-gradient-card">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="text-sm border-primary/40">
                  <Icon className="h-3 w-3 mr-1" />
                  Question {currentQuestion + 1} of {questions.length}
                </Badge>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {formatTime(timeElapsed)}
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <Award className="h-4 w-4" />
                    {score} / {totalPoints} pts
                  </div>
                </div>
              </div>
              
              <Progress value={progress} className="mb-4 h-2" />
              
              <CardTitle className="text-2xl mb-3 flex items-center gap-2">
                <Icon className="h-6 w-6 text-primary" />
                {scenario?.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              <div className="bg-muted/50 rounded-lg p-5 border-l-4 border-primary">
                <p className="text-sm text-muted-foreground mb-2 font-semibold uppercase tracking-wide">Situation</p>
                <p className="text-base mb-3">{currentQ.situation_text}</p>
                <p className="text-lg font-semibold text-foreground">{currentQ.question_text}</p>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'A', text: currentQ.option_a },
                  { key: 'B', text: currentQ.option_b },
                  { key: 'C', text: currentQ.option_c },
                  { key: 'D', text: currentQ.option_d }
                ].map((option) => {
                  const isSelected = selectedAnswer === option.key;
                  const isCorrectAnswer = option.key === currentQ.correct_option;
                  const showAsCorrect = showFeedback && isCorrectAnswer;
                  const showAsWrong = showFeedback && isSelected && !isCorrect;

                  return (
                    <button
                      key={option.key}
                      onClick={() => handleAnswer(option.key)}
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
                      <div className="flex items-start gap-3">
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
                        <div className="flex-1">
                          <span className="text-base">{option.text}</span>
                          {showAsCorrect && <CheckCircle2 className="inline-block ml-2 h-5 w-5 text-success" />}
                          {showAsWrong && <AlertCircle className="inline-block ml-2 h-5 w-5 text-destructive" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <Card className={`border-2 ${isCorrect ? "border-success bg-success/5" : "border-destructive bg-destructive/5"}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="h-7 w-7 text-success mt-1 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-7 w-7 text-destructive mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-lg mb-2">
                          {isCorrect ? `Correct! +${currentQ.points} points` : "Incorrect"}
                        </p>
                        <p className="text-sm leading-relaxed">
                          {isCorrect ? currentQ.feedback_correct : currentQ.feedback_incorrect}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={handleNext}
                      className="w-full mt-6"
                      size="lg"
                    >
                      {currentQuestion < questions.length - 1 ? "Next Question →" : "Complete Simulation ✓"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SimulationPlay;