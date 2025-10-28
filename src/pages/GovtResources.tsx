import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  FileText, 
  Phone, 
  MapPin, 
  ExternalLink,
  AlertCircle,
  Heart,
  Building2,
  Users,
  BookOpen,
  Download,
  Globe,
  Info
} from "lucide-react";

export default function GovtResources() {
  const emergencyNumbers = [
    { name: "National Emergency", number: "112", icon: <Phone className="w-5 h-5" />, color: "from-red-500 to-orange-500" },
    { name: "Police", number: "100", icon: <Shield className="w-5 h-5" />, color: "from-blue-500 to-cyan-500" },
    { name: "Fire Brigade", number: "101", icon: <AlertCircle className="w-5 h-5" />, color: "from-orange-500 to-red-500" },
    { name: "Ambulance", number: "102", icon: <Heart className="w-5 h-5" />, color: "from-green-500 to-emerald-500" },
    { name: "Disaster Management", number: "1078", icon: <Building2 className="w-5 h-5" />, color: "from-purple-500 to-pink-500" },
  ];

  const govtSchemes = [
    {
      title: "National Disaster Response Fund (NDRF)",
      description: "Financial assistance for relief and rehabilitation during natural disasters",
      ministry: "Ministry of Home Affairs",
      eligibility: "All citizens affected by natural disasters",
      benefits: "Immediate relief, housing assistance, livelihood support",
      link: "https://ndma.gov.in",
      icon: <Shield className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "State Disaster Response Fund (SDRF)",
      description: "State-level fund for immediate relief to disaster-affected people",
      ministry: "State Governments",
      eligibility: "State residents affected by disasters",
      benefits: "Cash assistance, food, shelter, medical aid",
      link: "https://ndma.gov.in/Relief-Rehabilitation-Recovery/SDRF",
      icon: <MapPin className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Prime Minister's National Relief Fund (PMNRF)",
      description: "Relief for families of those killed in natural disasters",
      ministry: "Prime Minister's Office",
      eligibility: "Families of deceased victims",
      benefits: "Financial assistance up to ₹2 lakhs per family",
      link: "https://pmnrf.gov.in",
      icon: <Heart className="w-6 h-6" />,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "National Cyclone Risk Mitigation Project (NCRMP)",
      description: "Infrastructure development in cyclone-prone areas",
      ministry: "Ministry of Home Affairs",
      eligibility: "Coastal states and union territories",
      benefits: "Cyclone shelters, early warning systems, evacuation routes",
      link: "https://ncrmp.gov.in",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "School Safety Programme",
      description: "Making schools disaster-resilient and safe",
      ministry: "Ministry of Education & NDMA",
      eligibility: "All educational institutions",
      benefits: "Structural safety, disaster preparedness training, safety drills",
      link: "https://ndma.gov.in/School-Safety",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500"
    },
  ];

  const resources = [
    {
      title: "National Disaster Management Authority (NDMA)",
      description: "Apex body for disaster management in India",
      link: "https://ndma.gov.in",
      type: "Organization"
    },
    {
      title: "National Disaster Response Force (NDRF)",
      description: "Specialized force for disaster response",
      link: "https://ndrf.gov.in",
      type: "Organization"
    },
    {
      title: "India Meteorological Department (IMD)",
      description: "Weather forecasting and warnings",
      link: "https://mausam.imd.gov.in",
      type: "Information"
    },
    {
      title: "Disaster Management Act, 2005",
      description: "Legal framework for disaster management",
      link: "https://ndma.gov.in/Legal-Institutional/Acts-Rules-Regulations",
      type: "Legal"
    },
    {
      title: "National Disaster Management Plan",
      description: "Comprehensive plan for disaster preparedness",
      link: "https://ndma.gov.in/disaster-management-plans",
      type: "Document"
    },
    {
      title: "State Disaster Management Authorities",
      description: "State-level disaster management bodies",
      link: "https://ndma.gov.in/About-Us/State-Disaster-Management-Authorities",
      type: "Organization"
    },
  ];

  const guidelines = [
    {
      disaster: "Earthquake",
      guidelines: [
        "Drop, Cover, and Hold On during shaking",
        "Stay away from windows and heavy objects",
        "If outdoors, move to open area away from buildings",
        "After shaking stops, check for injuries and damage",
        "Be prepared for aftershocks"
      ],
      icon: <AlertCircle className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      disaster: "Flood",
      guidelines: [
        "Move to higher ground immediately",
        "Avoid walking or driving through floodwater",
        "Turn off utilities if instructed",
        "Keep emergency supplies ready",
        "Follow evacuation orders promptly"
      ],
      icon: <MapPin className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      disaster: "Fire",
      guidelines: [
        "Alert others and activate fire alarm",
        "Evacuate immediately using stairs, not elevators",
        "Stay low to avoid smoke inhalation",
        "Feel doors before opening (check for heat)",
        "Call 101 once you're safe"
      ],
      icon: <AlertCircle className="w-5 h-5" />,
      color: "from-red-500 to-orange-500"
    },
    {
      disaster: "Cyclone",
      guidelines: [
        "Monitor weather updates regularly",
        "Secure loose objects and board up windows",
        "Stock emergency supplies and water",
        "Evacuate to cyclone shelter if advised",
        "Stay indoors during the cyclone"
      ],
      icon: <Globe className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/40">
              <Info className="w-4 h-4 mr-2" />
              Government Resources
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Disaster Management
              <span className="block gradient-text bg-gradient-to-r from-primary via-secondary to-success bg-clip-text" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Information & Schemes
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Access official government schemes, emergency contacts, and disaster management guidelines
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Numbers */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Emergency Contact Numbers</h2>
            <p className="text-muted-foreground">Save these numbers for quick access during emergencies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {emergencyNumbers.map((contact, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2">
                <CardHeader>
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {contact.icon}
                  </div>
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">{contact.number}</div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Government Schemes */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/40">
              <FileText className="w-4 h-4 mr-2" />
              Financial Assistance
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Government Schemes & Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Financial assistance and support programs for disaster-affected individuals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {govtSchemes.map((scheme, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${scheme.color} flex items-center justify-center text-white flex-shrink-0 shadow-md`}>
                      {scheme.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{scheme.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">{scheme.ministry}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">{scheme.description}</CardDescription>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold text-sm">Eligibility:</span>
                      <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-sm">Benefits:</span>
                      <p className="text-sm text-muted-foreground">{scheme.benefits}</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full group" asChild>
                    <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                      Learn More
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/40">
              <BookOpen className="w-4 h-4 mr-2" />
              Safety Guidelines
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Official Safety Guidelines</h2>
            <p className="text-muted-foreground">Follow these government-approved guidelines during disasters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {guidelines.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${guide.color} flex items-center justify-center text-white shadow-md`}>
                      {guide.icon}
                    </div>
                    <CardTitle className="text-xl">{guide.disaster}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {guide.guidelines.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Links */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/40">
              <Download className="w-4 h-4 mr-2" />
              Official Resources
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Important Resources & Links</h2>
            <p className="text-muted-foreground">Access official government portals and documents</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg flex-1">{resource.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{resource.description}</CardDescription>
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Prepared, Stay Safe</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Download official disaster management apps and stay updated with latest alerts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="group">
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Download NDMA App
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Globe className="w-5 h-5 mr-2" />
              Visit NDMA Portal
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
