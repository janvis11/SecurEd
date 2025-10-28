import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Award, 
  Star, 
  Zap, 
  Target, 
  BookOpen, 
  Brain,
  CheckCircle2,
  Lock,
  Flame,
  Crown,
  Medal,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  Play,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getQuestionsByCategory, type QuizQuestion } from "@/data/quizQuestions";

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questions: number;
  duration: number;
  points: number;
  xp: number;
  locked: boolean;
  requiredLevel: number;
  icon: any;
  color: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  earned: boolean;
  progress?: number;
  requirement: string;
}

interface Level {
  level: number;
  title: string;
  xpRequired: number;
  rewards: string[];
}

const Learning = () => {
  const navigate = useNavigate();
  const [userLevel, setUserLevel] = useState(3);
  const [userXP, setUserXP] = useState(1250);
  const [userPoints, setUserPoints] = useState(3240);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const levels: Level[] = [
    { level: 1, title: "Safety Novice", xpRequired: 0, rewards: ["Basic Badge", "Profile Customization"] },
    { level: 2, title: "Alert Learner", xpRequired: 500, rewards: ["Intermediate Quizzes", "Custom Avatar"] },
    { level: 3, title: "Prepared Student", xpRequired: 1000, rewards: ["Advanced Quizzes", "Leaderboard Access"] },
    { level: 4, title: "Safety Expert", xpRequired: 2000, rewards: ["Expert Challenges", "Mentor Badge"] },
    { level: 5, title: "Disaster Master", xpRequired: 3500, rewards: ["Master Badge", "All Content Unlocked"] },
  ];

  const currentLevel = levels.find(l => l.level === userLevel) || levels[0];
  const nextLevel = levels.find(l => l.level === userLevel + 1);
  const levelProgress = nextLevel 
    ? ((userXP - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100
    : 100;

  const quizzes: Quiz[] = [
    {
      id: "earthquake-basics",
      title: "Earthquake Safety Fundamentals",
      description: "Master the basics of earthquake preparedness and response",
      category: "earthquake",
      difficulty: "Beginner",
      questions: 10,
      duration: 15,
      points: 100,
      xp: 50,
      locked: false,
      requiredLevel: 1,
      icon: Target,
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: "fire-response",
      title: "Fire Emergency Response",
      description: "Learn critical fire safety procedures and evacuation protocols",
      category: "fire",
      difficulty: "Beginner",
      questions: 12,
      duration: 18,
      points: 120,
      xp: 60,
      locked: false,
      requiredLevel: 1,
      icon: Flame,
      color: "from-red-500 to-orange-500"
    },
    {
      id: "first-aid",
      title: "Emergency First Aid",
      description: "Essential first aid techniques for disaster situations",
      category: "medical",
      difficulty: "Intermediate",
      questions: 15,
      duration: 20,
      points: 150,
      xp: 80,
      locked: false,
      requiredLevel: 2,
      icon: Shield,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "flood-advanced",
      title: "Advanced Flood Management",
      description: "Complex flood scenarios and rescue operations",
      category: "flood",
      difficulty: "Advanced",
      questions: 20,
      duration: 30,
      points: 250,
      xp: 150,
      locked: userLevel < 3,
      requiredLevel: 3,
      icon: Trophy,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "disaster-coordination",
      title: "Disaster Coordination & Leadership",
      description: "Lead emergency response teams effectively",
      category: "leadership",
      difficulty: "Advanced",
      questions: 25,
      duration: 35,
      points: 300,
      xp: 200,
      locked: userLevel < 4,
      requiredLevel: 4,
      icon: Crown,
      color: "from-purple-500 to-pink-500"
    },
  ];

  const badges: Badge[] = [
    {
      id: "first-quiz",
      name: "First Steps",
      description: "Complete your first quiz",
      icon: Star,
      color: "bg-blue-500",
      earned: true,
      requirement: "Complete 1 quiz"
    },
    {
      id: "perfect-score",
      name: "Perfectionist",
      description: "Score 100% on any quiz",
      icon: Trophy,
      color: "bg-yellow-500",
      earned: true,
      requirement: "Score 100% on a quiz"
    },
    {
      id: "speed-demon",
      name: "Speed Demon",
      description: "Complete a quiz in under 10 minutes",
      icon: Zap,
      color: "bg-orange-500",
      earned: false,
      progress: 65,
      requirement: "Complete quiz in <10 min"
    },
    {
      id: "knowledge-seeker",
      name: "Knowledge Seeker",
      description: "Complete 10 quizzes",
      icon: BookOpen,
      color: "bg-green-500",
      earned: false,
      progress: 40,
      requirement: "Complete 10 quizzes"
    },
    {
      id: "master-learner",
      name: "Master Learner",
      description: "Reach Level 5",
      icon: Crown,
      color: "bg-purple-500",
      earned: false,
      progress: 60,
      requirement: "Reach Level 5"
    },
    {
      id: "helping-hand",
      name: "Helping Hand",
      description: "Help 5 classmates",
      icon: Users,
      color: "bg-pink-500",
      earned: false,
      progress: 20,
      requirement: "Help 5 classmates"
    },
  ];

  const categories = [
    { id: "all", name: "All Quizzes", icon: BookOpen },
    { id: "earthquake", name: "Earthquake", icon: Target },
    { id: "fire", name: "Fire Safety", icon: Flame },
    { id: "flood", name: "Flood", icon: Shield },
    { id: "medical", name: "Medical", icon: Award },
    { id: "leadership", name: "Leadership", icon: Crown },
  ];

  const filteredQuizzes = selectedCategory === "all" 
    ? quizzes 
    : quizzes.filter(q => q.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-700 dark:text-green-300";
      case "Intermediate": return "bg-blue-500/20 text-blue-700 dark:text-blue-300";
      case "Advanced": return "bg-red-500/20 text-red-700 dark:text-red-300";
      default: return "bg-gray-500/20 text-gray-700 dark:text-gray-300";
    }
  };

  const startQuiz = (quiz: Quiz) => {
    if (quiz.locked) {
      toast.error(`This quiz requires Level ${quiz.requiredLevel}. Keep learning to unlock it!`);
      return;
    }
    const questions = getQuestionsByCategory(quiz.category);
    setQuizQuestions(questions);
    setSelectedQuiz(quiz);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return; // Prevent changing answer after submission
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer");
      return;
    }
    
    const currentQ = quizQuestions[currentQuestion];
    if (selectedAnswer === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    if (!selectedQuiz) return;
    
    const earnedXP = selectedQuiz.xp;
    const earnedPoints = selectedQuiz.points;
    
    setUserXP(prev => prev + earnedXP);
    setUserPoints(prev => prev + earnedPoints);
    
    toast.success(`Quiz completed! +${earnedXP} XP, +${earnedPoints} points`);
    
    setQuizStarted(false);
    setSelectedQuiz(null);
  };

  if (quizStarted && selectedQuiz && quizQuestions.length > 0) {
    const currentQ = quizQuestions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">Question {currentQuestion + 1} of {quizQuestions.length}</Badge>
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    <Trophy className="w-3 h-3 mr-1" />
                    Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}
                  </Badge>
                  <Badge variant="secondary">
                    <Clock className="w-3 h-3 mr-1" />
                    {selectedQuiz.duration} min
                  </Badge>
                </div>
              </div>
              <Progress value={((currentQuestion + (showFeedback ? 1 : 0)) / quizQuestions.length) * 100} className="mb-4" />
              <CardTitle>{selectedQuiz.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="text-lg font-semibold mb-6">{currentQ.question}</p>
                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === currentQ.correctAnswer;
                    const showCorrect = showFeedback && isCorrect;
                    const showIncorrect = showFeedback && isSelected && !isCorrect;
                    
                    return (
                      <Button
                        key={idx}
                        variant={isSelected ? "default" : "outline"}
                        className={`w-full justify-start text-left h-auto py-4 transition-all ${
                          showCorrect ? "bg-green-500 hover:bg-green-600 text-white border-green-600" :
                          showIncorrect ? "bg-red-500 hover:bg-red-600 text-white border-red-600" :
                          isSelected ? "bg-primary" : ""
                        }`}
                        onClick={() => handleAnswerSelect(idx)}
                        disabled={showFeedback}
                      >
                        <span className="mr-3 font-bold">{String.fromCharCode(65 + idx)}.</span>
                        <span className="flex-1">{option}</span>
                        {showCorrect && <CheckCircle2 className="w-5 h-5 ml-2" />}
                      </Button>
                    );
                  })}
                </div>

                {showFeedback && (
                  <div className={`mt-6 p-4 rounded-lg ${
                    selectedAnswer === currentQ.correctAnswer 
                      ? "bg-green-500/20 border border-green-500/40" 
                      : "bg-red-500/20 border border-red-500/40"
                  }`}>
                    <p className="font-semibold mb-2">
                      {selectedAnswer === currentQ.correctAnswer ? "✓ Correct!" : "✗ Incorrect"}
                    </p>
                    <p className="text-sm">{currentQ.explanation}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuizStarted(false);
                    setSelectedQuiz(null);
                  }}
                >
                  Exit Quiz
                </Button>
                {!showFeedback ? (
                  <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion}>
                    {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Complete Quiz"}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16 space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Learning Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master disaster preparedness through gamified quizzes, earn badges, and level up your skills
          </p>
        </div>

        {/* User Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Level Card */}
          <Card className="border-primary/20 bg-gradient-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  Level {userLevel}
                </CardTitle>
                <Badge variant="secondary">{currentLevel.title}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress to Level {userLevel + 1}</span>
                  <span className="font-semibold">{Math.round(levelProgress)}%</span>
                </div>
                <Progress value={levelProgress} className="h-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  {nextLevel ? `${nextLevel.xpRequired - userXP} XP to next level` : "Max level reached!"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* XP Card */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-secondary" />
                Experience Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-secondary mb-2">{userXP.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                +150 XP this week
              </p>
            </CardContent>
          </Card>

          {/* Points Card */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary mb-2">{userPoints.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Star className="h-4 w-4" />
                Rank #23 globally
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Badges & Achievements
            </CardTitle>
            <CardDescription>Unlock badges by completing challenges and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`relative group cursor-pointer transition-all duration-300 ${
                    badge.earned ? "hover:scale-110" : "opacity-60"
                  }`}
                >
                  <div className={`${badge.color} rounded-xl p-6 text-white text-center shadow-lg ${
                    !badge.earned && "grayscale"
                  }`}>
                    <badge.icon className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-xs font-semibold">{badge.name}</p>
                    {!badge.earned && badge.progress && (
                      <div className="mt-2">
                        <Progress value={badge.progress} className="h-1" />
                        <p className="text-xs mt-1">{badge.progress}%</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/80 text-white rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center">
                    <p className="text-xs font-semibold mb-1">{badge.name}</p>
                    <p className="text-xs mb-2">{badge.description}</p>
                    <p className="text-xs text-gray-300">{badge.requirement}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="gap-2"
            >
              <category.icon className="h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className={`group relative overflow-hidden border-2 transition-all duration-300 ${
                quiz.locked 
                  ? "opacity-60 cursor-not-allowed" 
                  : "hover:border-primary/50 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
              }`}
            >
              {quiz.locked && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-black/80 rounded-full p-2">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${quiz.color} text-white shadow-lg`}>
                    <quiz.icon className="h-6 w-6" />
                  </div>
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span>{quiz.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{quiz.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span>{quiz.points} pts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    <span>{quiz.xp} XP</span>
                  </div>
                </div>

                {quiz.locked ? (
                  <Button className="w-full" disabled>
                    <Lock className="h-4 w-4 mr-2" />
                    Requires Level {quiz.requiredLevel}
                  </Button>
                ) : (
                  <Button 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-all"
                    onClick={() => startQuiz(quiz)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Quiz
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboard Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Medal className="h-5 w-5 text-primary" />
              Leaderboard
            </CardTitle>
            <CardDescription>Top learners this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { rank: 1, name: "Alex Johnson", points: 5240, avatar: "🏆" },
                { rank: 2, name: "Sarah Chen", points: 4890, avatar: "🥈" },
                { rank: 3, name: "Mike Rodriguez", points: 4650, avatar: "🥉" },
                { rank: 23, name: "You", points: userPoints, avatar: "👤", highlight: true },
              ].map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    user.highlight ? "bg-primary/10 border-2 border-primary" : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{user.avatar}</div>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">Rank #{user.rank}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{user.points.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Learning;
