import { Shield, Zap, Trophy, Map, MessageSquare, Target, Play, Star, Users, Clock, Award, ChevronRight, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import InteractiveSimulation from "@/components/InteractiveSimulation";
import heroImage from "@/assets/hero-disaster-prep.jpg";
import earthquakeIcon from "@/assets/earthquake-icon.jpg";
import fireIcon from "@/assets/fire-icon.jpg";
import floodIcon from "@/assets/flood-icon.jpg";
import avatar1 from "@/assets/avatar-1.svg";
import avatar2 from "@/assets/avatar-2.svg";
import avatar3 from "@/assets/avatar-3.svg";
import { useState, useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Simulations",
      description: "Immersive virtual disaster drills with real-time decision making and instant feedback",
      color: "from-orange-500 to-red-500",
      stats: "10+ Scenarios",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Safety Buddy Chatbot",
      description: "24/7 AI assistant for disaster-related questions and guidance",
      color: "from-blue-500 to-cyan-500",
      stats: "24/7 Available",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Gamified Learning",
      description: "Earn points, badges, and climb leaderboards while mastering safety protocols",
      color: "from-yellow-500 to-orange-500",
      stats: "1000+ Students",
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Smart Campus Maps",
      description: "Interactive maps showing safe zones, exits, and evacuation routes",
      color: "from-green-500 to-emerald-500",
      stats: "Real-time Updates",
    },
  ];
  
  const scenarios = [
    {
      title: "Earthquake Safety",
      image: earthquakeIcon,
      description: "Learn to drop, cover, and hold on",
      difficulty: "Beginner",
      duration: "5 min",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Fire Response",
      image: fireIcon,
      description: "Master evacuation and fire safety",
      difficulty: "Intermediate",
      duration: "8 min",
      icon: <Shield className="w-6 h-6" />,
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Flood Preparedness",
      image: floodIcon,
      description: "Navigate to higher ground safely",
      difficulty: "Advanced",
      duration: "10 min",
      icon: <Target className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const stats = [
    { label: "Active Students", value: "2,500+", icon: <Users className="w-5 h-5" /> },
    { label: "Simulations Completed", value: "15,000+", icon: <Trophy className="w-5 h-5" /> },
    { label: "Schools Using Platform", value: "150+", icon: <Shield className="w-5 h-5" /> },
    { label: "Average Response Time", value: "2.3s", icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/40" />
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-pulse-glow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/20 rounded-full animate-pulse-glow delay-1000"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-success/20 rounded-full animate-pulse-glow delay-2000"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/10 rounded-full animate-pulse-glow delay-3000"></div>
        </div>
        
        <div className="relative z-20 container mx-auto px-4 text-center">
          <div className={`max-w-5xl mx-auto space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/40">
                <Sparkles className="w-4 h-4 mr-2" />
                Trusted by 150+ Schools
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Disaster Preparedness
              <span className="block gradient-text bg-gradient-to-r from-primary via-secondary to-success bg-clip-text" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Reimagined for Education
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AI-powered simulations, gamified learning, and real-time guidance to build a culture of safety in schools and colleges
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="default" 
                size="xl"
                className="bg-gradient-hero hover:shadow-glow transition-all duration-300 group"
                onClick={() => navigate("/dashboard")}
              >
                <Shield className="mr-2 group-hover:animate-pulse" />
                Start Learning
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="border-2 hover:bg-primary/10 transition-all duration-300 group"
                onClick={() => navigate("/simulations")}
              >
                <Play className="mr-2 group-hover:scale-110 transition-transform" />
                Try Simulation
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/40">
              <Award className="w-4 h-4 mr-2" />
              Platform Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for
              <span className="block gradient-text">Modern Safety Education</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to build disaster preparedness competency with cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {feature.stats}
                  </Badge>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed group-hover:text-foreground/80 transition-colors">
                    {feature.description}
                  </CardDescription>
                  
                  <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Learn More</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Scenarios Section */}
      <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/40">
              <Play className="w-4 h-4 mr-2" />
              Interactive Learning
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interactive Scenarios
              <span className="block gradient-text">Practice Real-World Emergencies</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Practice responding to real-world emergencies in safe, virtual environments with immersive 3D simulations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarios.map((scenario, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/30"
                onClick={() => navigate("/simulations")}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={scenario.image} 
                    alt={scenario.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Always visible play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/95 group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <Play className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Difficulty badge */}
                  <div className="absolute top-3 left-3">
                    <Badge 
                      className={`bg-gradient-to-r ${scenario.color} text-white border-0 shadow-md text-xs px-2 py-1`}
                    >
                      {scenario.difficulty}
                    </Badge>
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-foreground text-xs px-2 py-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {scenario.duration}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${scenario.color} text-white shadow-md`}>
                      {scenario.icon}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {scenario.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm leading-relaxed group-hover:text-foreground/80 transition-colors">
                    {scenario.description}
                  </CardDescription>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-3 h-3 mr-1" />
                      <span className="text-xs font-semibold">Start Simulation</span>
                      <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          {/* CTA for simulations */}
          <div className="text-center mt-16">
            <Button 
              size="lg" 
              className="bg-gradient-hero hover:shadow-glow transition-all duration-300 group"
              onClick={() => navigate("/simulations")}
            >
              <Target className="mr-2 group-hover:animate-pulse" />
              Explore All Simulations
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Live Simulation Preview Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/40">
              <Play className="w-4 h-4 mr-2" />
              Try It Now
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience Interactive Learning
              <span className="block gradient-text">Try Our Earthquake Simulation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get a hands-on preview of our interactive disaster preparedness training. Practice real-world emergency responses in a safe, virtual environment.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <InteractiveSimulation
              scenario={{
                id: "earthquake-preview",
                title: "Earthquake Safety Response",
                type: "earthquake",
                description: "Learn proper earthquake safety procedures through interactive decision-making",
                steps: [
                  {
                    id: "step1",
                    title: "Initial Response",
                    description: "You're in a classroom when an earthquake starts. What should you do first?",
                    action: "A",
                    correct: true,
                    feedback: "Correct! During an earthquake, you should immediately drop, cover, and hold on. This protects you from falling objects and provides stability.",
                    icon: <Shield className="w-4 h-4" />,
                    color: "from-yellow-500 to-orange-500"
                  },
                  {
                    id: "step2",
                    title: "During Shaking",
                    description: "The shaking is getting stronger. Where should you position yourself?",
                    action: "A",
                    correct: true,
                    feedback: "Excellent! Stay under the desk and hold on tight. Avoid doorways as they're not necessarily the strongest part of a building.",
                    icon: <Target className="w-4 h-4" />,
                    color: "from-orange-500 to-red-500"
                  },
                  {
                    id: "step3",
                    title: "After Shaking Stops",
                    description: "The shaking has stopped. What's your next action?",
                    action: "B",
                    correct: true,
                    feedback: "Perfect! Wait for aftershocks to subside, then follow your teacher's evacuation instructions. Don't run outside during shaking.",
                    icon: <CheckCircle2 className="w-4 h-4" />,
                    color: "from-green-500 to-emerald-500"
                  }
                ]
              }}
              onComplete={(score) => {
                console.log(`Simulation completed with score: ${score}`);
              }}
            />
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              This is just a preview. Access the full library of simulations with detailed feedback and progress tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-hero hover:shadow-glow transition-all duration-300 group"
                onClick={() => navigate("/simulations")}
              >
                <Target className="mr-2 group-hover:animate-pulse" />
                Access Full Library
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 hover:bg-primary/10 transition-all duration-300 group"
                onClick={() => navigate("/dashboard")}
              >
                <Shield className="mr-2 group-hover:scale-110 transition-transform" />
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to start learning and preparing your campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle>Enroll</CardTitle>
              <CardDescription className="mt-2">Create an account for your school or join as a student.</CardDescription>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle>Practice</CardTitle>
              <CardDescription className="mt-2">Run interactive simulations tailored to your campus layout.</CardDescription>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle>Improve</CardTitle>
              <CardDescription className="mt-2">Track performance, earn badges, and improve readiness over time.</CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/40">
              <Star className="w-4 h-4 mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Educators Say
              <span className="block gradient-text">Real Impact, Real Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Real stories from schools using Alert Buddy Campus to transform their safety education
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Ms. Lopez",
                  role: "Principal, Riverside High",
                  avatar: avatar1,
                  quote: "The simulations helped our staff run an evacuation drill that revealed improvements we hadn't considered. Highly recommended.",
                  rating: 5,
                  highlight: "Improved evacuation efficiency by 40%"
                },
                {
                  name: "Mr. Ahmad",
                  role: "Safety Coordinator, Greenfield College",
                  avatar: avatar2,
                  quote: "Students engaged more with the gamified modules than our traditional training sessions.",
                  rating: 5,
                  highlight: "95% student engagement rate"
                },
                {
                  name: "Dr. Chen",
                  role: "Director, Campus Safety",
                  avatar: avatar3,
                  quote: "Clear guidance, quick response scenarios, and meaningful analytics — everything we needed to modernize our drills.",
                  rating: 5,
                  highlight: "Reduced training time by 60%"
                }
              ].map((testimonial, index) => (
                <Card 
                  key={index} 
                  className={`group relative overflow-hidden p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/30 ${
                    index === currentTestimonial ? 'ring-2 ring-primary/20 scale-105' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300" 
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-lg group-hover:text-primary transition-colors">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <blockquote className="text-base leading-relaxed mb-6 group-hover:text-foreground/90 transition-colors">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        {testimonial.highlight}
                      </Badge>
                      <div className="text-4xl text-primary/20 group-hover:text-primary/40 transition-colors">
                        "
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-12">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse-glow"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse-glow delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse-glow delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8 text-primary-foreground">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-white/40 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Join the Safety Revolution
            </Badge>
            
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Ready to Build a
              <span className="block">Safer Campus?</span>
            </h2>
            
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of students and educators already learning with our platform. Start your safety journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                variant="secondary" 
                size="xl"
                className="bg-white text-primary hover:bg-white/90 hover:shadow-2xl transition-all duration-300 group"
                onClick={() => navigate("/dashboard")}
              >
                <Shield className="mr-2 group-hover:animate-pulse" />
                Get Started Now
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="xl"
                className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300 group"
                onClick={() => navigate("/simulations")}
              >
                <Play className="mr-2 group-hover:scale-110 transition-transform" />
                Try Free Demo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="pt-16 border-t border-white/20">
              <p className="text-sm opacity-80 mb-6">Trusted by leading educational institutions</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="text-lg font-semibold">Riverside High School</div>
                <div className="text-lg font-semibold">Greenfield College</div>
                <div className="text-lg font-semibold">Metro University</div>
                <div className="text-lg font-semibold">Safety First Academy</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background border-t border-border/40 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Shield className="h-6 w-6 text-primary" />
                <span className="gradient-text">SecurEd</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Empowering educational institutions with AI-powered disaster preparedness and safety education.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Platform</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div><a href="/simulations" className="hover:text-primary transition-colors">Simulations</a></div>
                <div><a href="/safety-map" className="hover:text-primary transition-colors">Safety Maps</a></div>
                <div><a href="/chatbot" className="hover:text-primary transition-colors">AI Assistant</a></div>
                <div><a href="/dashboard" className="hover:text-primary transition-colors">Dashboard</a></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Resources</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div><a href="#" className="hover:text-primary transition-colors">Documentation</a></div>
                <div><a href="#" className="hover:text-primary transition-colors">API Reference</a></div>
                <div><a href="#" className="hover:text-primary transition-colors">Help Center</a></div>
                <div><a href="#" className="hover:text-primary transition-colors">Community</a></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Contact</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>support@secured.edu</div>
                <div>+1 (555) 123-4567</div>
                <div>24/7 Emergency Support</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 SecurEd. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
