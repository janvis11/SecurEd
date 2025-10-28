import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Safety Buddy, your AI disaster preparedness assistant. I can help you with:\n\n• Emergency response procedures\n• Safety protocols and best practices\n• Disaster-specific guidance (earthquakes, fires, floods)\n• Campus safety zone information\n\nHow can I help you stay safe today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "What should I do during an earthquake?",
    "Where are the fire exits?",
    "How do I use a fire extinguisher?",
    "What's in an emergency kit?",
    "How do I perform CPR?",
    "What should I do during a tornado?",
    "How do I treat a burn?",
    "What are the evacuation procedures?",
    "How do I use a defibrillator?",
    "What should I do during a power outage?",
    "How do I stop severe bleeding?",
    "What are the lockdown procedures?",
    "How do I help someone who's choking?",
    "What should I do during a flood?",
    "How do I create an emergency plan?",
  ];

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response (in real app, this would call an API)
    setTimeout(() => {
      const response = getSimulatedResponse(inputValue);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const getSimulatedResponse = (question: string): string => {
    const lowerQ = question.toLowerCase();
    
    // Earthquake Safety
    if (lowerQ.includes("earthquake")) {
      return "During an earthquake:\n\n1. **DROP** - Get down on your hands and knees\n2. **COVER** - Take cover under a sturdy desk or table\n3. **HOLD ON** - Hold onto the furniture until shaking stops\n\nStay away from windows, mirrors, and heavy objects that could fall. Don't run outside during shaking. Wait for aftershocks and follow your teacher's evacuation instructions.";
    }
    
    // Fire Safety
    if (lowerQ.includes("fire") && lowerQ.includes("exit")) {
      return "Fire exits are located:\n\n• East Wing - Exit A (near the library)\n• West Wing - Exit B (cafeteria side)\n• Main Building - Exit C (main entrance)\n• North Wing - Exit D (gymnasium)\n\nAll exits are marked with illuminated green signs. Always use the nearest safe exit and never use elevators during a fire emergency.";
    }
    
    if (lowerQ.includes("fire extinguisher")) {
      return "Remember **PASS** for fire extinguisher use:\n\n**P** - Pull the pin\n**A** - Aim at the base of the fire\n**S** - Squeeze the handle\n**S** - Sweep side to side\n\n⚠️ Only attempt to fight small, contained fires. If the fire grows, evacuate immediately and let professionals handle it.";
    }
    
    // Emergency Kit
    if (lowerQ.includes("emergency kit")) {
      return "A basic emergency kit should include:\n\n✅ Water (1 gallon per person per day)\n✅ Non-perishable food\n✅ First aid kit\n✅ Flashlight and extra batteries\n✅ Battery-powered radio\n✅ Whistle (to signal for help)\n✅ Dust masks\n✅ Moist towelettes\n✅ Important documents (copies)\n✅ Emergency contact list";
    }
    
    // CPR
    if (lowerQ.includes("cpr")) {
      return "CPR Steps (for adults):\n\n1. **Check** - Ensure the scene is safe\n2. **Call** - Call 911 or have someone call\n3. **Compress** - Place hands on center of chest, push hard and fast (100-120 compressions per minute)\n4. **Rescue Breaths** - Tilt head back, pinch nose, give 2 breaths\n5. **Repeat** - Continue cycles until help arrives\n\n💡 Remember: Push hard, push fast, and don't stop until help arrives!";
    }
    
    // Tornado Safety
    if (lowerQ.includes("tornado")) {
      return "During a tornado:\n\n1. **Go to the lowest level** - Basement or interior room\n2. **Stay away from windows** - Move to center of building\n3. **Get under something sturdy** - Table or desk\n4. **Cover your head and neck** - Use arms or blanket\n5. **Stay put** - Don't try to outrun a tornado\n\nIf outside: Lie flat in a ditch or low area and cover your head.";
    }
    
    // Burn Treatment
    if (lowerQ.includes("burn")) {
      return "Burn Treatment:\n\n**Minor Burns:**\n• Cool the burn with cool (not cold) water\n• Remove jewelry or tight clothing\n• Cover with sterile, non-adhesive bandage\n• Take over-the-counter pain reliever\n\n**Severe Burns:**\n• Call 911 immediately\n• Don't remove clothing stuck to burn\n• Don't apply ice or butter\n• Cover with clean, dry cloth\n• Keep person warm and still";
    }
    
    // Evacuation Procedures
    if (lowerQ.includes("evacuation")) {
      return "Evacuation Procedures:\n\n1. **Listen** - Follow instructions from authorities\n2. **Take essentials** - Phone, keys, wallet, medications\n3. **Use designated routes** - Follow posted evacuation signs\n4. **Account for everyone** - Check on family/classmates\n5. **Go to assembly point** - Meet at designated safe location\n6. **Stay informed** - Listen to emergency broadcasts\n\nNever use elevators during evacuations!";
    }
    
    // Defibrillator (AED)
    if (lowerQ.includes("defibrillator") || lowerQ.includes("aed")) {
      return "Using an AED (Automated External Defibrillator):\n\n1. **Turn on** the AED and follow voice prompts\n2. **Expose** the person's chest and wipe dry\n3. **Attach** pads to bare chest (one upper right, one lower left)\n4. **Clear** everyone away from the person\n5. **Press** the shock button when prompted\n6. **Resume** CPR immediately after shock\n\nAEDs are designed to be used by anyone - they won't shock unless needed!";
    }
    
    // Power Outage
    if (lowerQ.includes("power outage") || lowerQ.includes("blackout")) {
      return "During a power outage:\n\n**Immediate Actions:**\n• Check if neighbors have power\n• Turn off major appliances to prevent surge\n• Keep refrigerator/freezer doors closed\n• Use flashlights instead of candles\n\n**Safety Tips:**\n• Avoid opening refrigerator unnecessarily\n• Unplug sensitive electronics\n• Keep phone charged with power bank\n• Have emergency supplies ready\n• Stay away from downed power lines";
    }
    
    // Severe Bleeding
    if (lowerQ.includes("bleeding") || lowerQ.includes("blood")) {
      return "Stop Severe Bleeding:\n\n1. **Apply direct pressure** - Use clean cloth or bandage\n2. **Elevate** the injured area above heart level\n3. **Add more layers** if blood soaks through\n4. **Don't remove** original bandage\n5. **Call 911** for severe bleeding\n\n**Tourniquet** (last resort):\n• Apply 2-3 inches above wound\n• Tighten until bleeding stops\n• Note the time applied\n• Never remove once applied";
    }
    
    // Lockdown Procedures
    if (lowerQ.includes("lockdown")) {
      return "Lockdown Procedures:\n\n1. **Lock doors** - Secure all entrances\n2. **Turn off lights** - Make room appear empty\n3. **Move away from windows** - Hide in interior areas\n4. **Silence phones** - Turn off all devices\n5. **Stay quiet** - No talking or movement\n6. **Wait for all-clear** - Don't open doors until authorities say so\n\nFollow teacher's specific instructions and stay calm.";
    }
    
    // Choking
    if (lowerQ.includes("choking")) {
      return "Help Someone Who's Choking:\n\n**Conscious Person:**\n1. **Ask** \"Are you choking?\" - If they can speak, let them cough\n2. **Stand behind** them and wrap arms around waist\n3. **Make fist** with one hand, place above navel\n4. **Grasp fist** with other hand and press inward and upward\n5. **Repeat** until object is expelled or person becomes unconscious\n\n**Unconscious Person:**\n• Call 911 immediately\n• Begin CPR with chest compressions";
    }
    
    // Flood Safety
    if (lowerQ.includes("flood")) {
      return "Flood Safety:\n\n**Before Flood:**\n• Move to higher ground immediately\n• Don't walk through flood waters\n• Turn off electricity at main breaker\n• Move valuables to upper floors\n\n**During Flood:**\n• Stay away from flood waters (6 inches can knock you down)\n• Don't drive through flooded roads\n• Evacuate if told to do so\n• Stay tuned to emergency broadcasts\n\n**After Flood:**\n• Return only when authorities say it's safe\n• Watch for debris and downed power lines";
    }
    
    // Emergency Plan
    if (lowerQ.includes("emergency plan") || lowerQ.includes("plan")) {
      return "Create an Emergency Plan:\n\n**Family Plan:**\n• Choose meeting places (near home and outside neighborhood)\n• Plan evacuation routes from home and school\n• Assign responsibilities to each family member\n• Practice the plan regularly\n\n**Emergency Contacts:**\n• Program emergency numbers in phones\n• Include out-of-town contact\n• Keep written list in multiple places\n\n**Supplies:**\n• 3-day supply of food and water\n• First aid kit and medications\n• Flashlight, radio, extra batteries\n• Important documents in waterproof container";
    }
    
    // Default response
    return "That's a great safety question! I can help you with:\n\n• **Natural Disasters** - Earthquakes, floods, tornadoes\n• **Medical Emergencies** - CPR, first aid, bleeding\n• **Fire Safety** - Evacuation, extinguishers, prevention\n• **Emergency Planning** - Kits, contacts, procedures\n• **Campus Safety** - Lockdowns, exits, protocols\n\nWhat specific safety topic would you like to learn about?";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Safety Buddy</h1>
            <p className="text-muted-foreground text-lg">Your AI disaster preparedness assistant</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>

        {/* Chat Interface */}
        <Card className="border-2">
          <CardHeader className="bg-gradient-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground">
                <Bot className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  Safety Buddy
                  <Badge className="bg-success text-success-foreground">Online</Badge>
                </CardTitle>
                <CardDescription>Always here to help with safety questions</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Messages Area */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground flex-shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-6 pb-4 border-t">
                <p className="text-sm text-muted-foreground mb-3 mt-4">Quick questions:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start text-left h-auto py-2 px-3"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      <MessageSquare className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span className="text-xs">{question}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 border-t bg-muted/30">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about disaster preparedness..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={!inputValue.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send • Safety Buddy provides guidance based on standard safety protocols
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;
