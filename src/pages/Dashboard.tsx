import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Zap, 
  Target, 
  Award, 
  TrendingUp,
  MapPin,
  MessageSquare,
  PlayCircle,
  Clock,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Star,
  Calendar,
  BarChart3,
  Activity,
  Flame,
  Waves,
  Mountain,
  Wind,
  Bell,
  Settings,
  Download,
  Share2,
  BookOpen,
  GraduationCap,
  Heart,
  Brain,
  Eye,
  Headphones
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const { stats: dashboardStats, modules: dashboardModules, badges: dashboardBadges, recentActivity: dashboardActivity, loading } = useDashboardData();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Preparedness Score", value: dashboardStats.preparednessScore, icon: Target, color: "text-primary", trend: "+5%" },
    { label: "Modules Completed", value: dashboardStats.modulesCompleted, icon: Award, color: "text-success", trend: "+3" },
    { label: "Total Points", value: dashboardStats.totalPoints, icon: Trophy, color: "text-secondary", trend: "+180" },
    { label: "Current Rank", value: dashboardStats.currentRank, icon: TrendingUp, color: "text-primary", trend: "+12" },
    { label: "Study Streak", value: dashboardStats.studyStreak.toString(), icon: Flame, color: "text-orange-500", trend: "days" },
    { label: "Certificates", value: dashboardStats.certificates, icon: GraduationCap, color: "text-blue-500", trend: "+1" },
  ];

  // Map dashboard modules to include icons and routes
  const modules = dashboardModules.length > 0 ? dashboardModules.map(module => ({
    ...module,
    icon: module.title.toLowerCase().includes('earthquake') ? Mountain :
          module.title.toLowerCase().includes('fire') ? Flame :
          module.title.toLowerCase().includes('flood') ? Waves :
          module.title.toLowerCase().includes('tornado') ? Wind : Shield,
    route: "/simulations"
  })) : [
    {
      title: "Campus Earthquake Response",
      description: "Master earthquake safety procedures in school environments",
      progress: 85,
      status: "In Progress",
      icon: Mountain,
      route: "/simulations",
      difficulty: "Intermediate",
      duration: "15 min",
      rating: 4.8,
      participants: 1250
    },
    {
      title: "Fire Evacuation Protocol",
      description: "Learn comprehensive fire safety and evacuation procedures",
      progress: 100,
      status: "Completed",
      icon: Flame,
      route: "/simulations",
      difficulty: "Beginner",
      duration: "20 min",
      rating: 4.6,
      participants: 2100
    },
  ];

  const recentBadges = dashboardBadges.length > 0 ? dashboardBadges : [
    { name: "First Responder", description: "Completed first simulation", color: "bg-primary", earned: "2 days ago" },
    { name: "Safety Star", description: "Perfect score on fire drill", color: "bg-success", earned: "1 week ago" },
    { name: "Quick Learner", description: "Finished 5 modules", color: "bg-secondary", earned: "3 days ago" },
    { name: "Team Player", description: "Helped 3 classmates", color: "bg-blue-500", earned: "1 day ago" },
    { name: "Emergency Expert", description: "Completed all earthquake scenarios", color: "bg-orange-500", earned: "4 days ago" },
  ];

  const upcomingEvents = [
    { title: "Monthly Fire Drill", time: "Tomorrow 10:00 AM", type: "Drill", icon: Flame },
    { title: "Safety Workshop", time: "Friday 2:00 PM", type: "Workshop", icon: BookOpen },
    { title: "Emergency Response Training", time: "Next Monday 9:00 AM", type: "Training", icon: Shield },
  ];

  const performanceData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 72 },
    { month: "Mar", score: 78 },
    { month: "Apr", score: 85 },
    { month: "May", score: 87 },
    { month: "Jun", score: 90 },
  ];

  const recentActivity = dashboardActivity.length > 0 ? dashboardActivity.map(activity => ({
    ...activity,
    icon: activity.action.toLowerCase().includes('completed') ? CheckCircle2 :
          activity.action.toLowerCase().includes('earned') ? Star :
          activity.action.toLowerCase().includes('started') ? PlayCircle : Settings
  })) : [
    { action: "Completed Fire Evacuation Simulation", time: "2 hours ago", icon: CheckCircle2, color: "text-success" },
    { action: "Earned 'Safety Star' badge", time: "1 day ago", icon: Star, color: "text-yellow-500" },
    { action: "Started Earthquake Response Module", time: "2 days ago", icon: PlayCircle, color: "text-primary" },
    { action: "Updated emergency contacts", time: "3 days ago", icon: Settings, color: "text-muted-foreground" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto space-y-8 p-6 pt-24">
        {/* Header with Time and Notifications */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 gradient-text">Your Safety Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Welcome back! {currentTime.toLocaleTimeString()} • Track your disaster preparedness journey
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              {notifications} Notifications
            </Button>
            <Button variant="outline" onClick={() => navigate("/safety-map")}>
              <MapPin className="mr-2 h-4 w-4" />
              Safety Map
            </Button>
            <Button onClick={() => navigate("/chatbot")}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Safety Buddy
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Learning Modules - Takes 2 columns */}
          <div className="xl:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Learning Modules
                    </CardTitle>
                    <CardDescription>Continue your disaster preparedness training</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {modules.map((module, index) => (
                  <Card key={index} className="border hover:border-primary transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
                            <module.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <CardDescription className="line-clamp-1">{module.description}</CardDescription>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {module.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {module.participants.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                {module.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={module.progress === 100 ? "default" : module.progress > 0 ? "secondary" : "outline"}>
                            {module.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {module.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                        <Button 
                          className="w-full" 
                          variant={module.progress === 100 ? "outline" : "default"}
                          onClick={() => navigate(module.route)}
                        >
                          {module.progress === 100 ? "Review & Retry" : module.progress > 0 ? "Continue" : "Start Module"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Performance Trend
                </CardTitle>
                <CardDescription>Your preparedness score over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {performanceData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div 
                        className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t"
                        style={{ height: `${(data.score / 100) * 200}px` }}
                      />
                      <span className="text-xs text-muted-foreground">{data.month}</span>
                      <span className="text-xs font-medium">{data.score}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Takes 2 columns */}
          <div className="xl:col-span-2 space-y-6">
            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                    <div className={`w-12 h-12 rounded-full ${badge.color} flex items-center justify-center text-white shadow-lg`}>
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{badge.earned}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <event.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                      <Badge variant="outline" className="text-xs mt-1">{event.type}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2">
                    <activity.icon className={`h-4 w-4 ${activity.color} flex-shrink-0`} />
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="default" onClick={() => navigate("/simulations")}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Start New Simulation
                </Button>
                <Button className="w-full" variant="secondary" onClick={() => navigate("/safety-map")}>
                  <MapPin className="mr-2 h-4 w-4" />
                  View Safety Zones
                </Button>
                <Button className="w-full" variant="outline" onClick={() => navigate("/chatbot")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask Safety Buddy
                </Button>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Progress
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-destructive/10">
                  <span className="text-sm font-medium">Emergency Services</span>
                  <span className="text-sm font-mono">911</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium">Campus Security</span>
                  <span className="text-sm font-mono">(555) 123-4567</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium">Health Center</span>
                  <span className="text-sm font-mono">(555) 123-4568</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
