export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const earthquakeQuestions: QuizQuestion[] = [
  {
    id: "eq1",
    question: "What is the first action you should take when you feel an earthquake?",
    options: [
      "Run outside immediately",
      "Drop, Cover, and Hold On",
      "Stand in a doorway",
      "Call emergency services"
    ],
    correctAnswer: 1,
    explanation: "Drop, Cover, and Hold On is the recommended immediate response to protect yourself from falling objects."
  },
  {
    id: "eq2",
    question: "Where is the safest place to be during an earthquake indoors?",
    options: [
      "Near windows",
      "Under a doorway",
      "Under a sturdy desk or table",
      "In the center of the room"
    ],
    correctAnswer: 2,
    explanation: "A sturdy desk or table provides the best protection from falling debris."
  },
  {
    id: "eq3",
    question: "What should you do if you're outdoors during an earthquake?",
    options: [
      "Run into the nearest building",
      "Lie flat on the ground",
      "Move to an open area away from buildings and power lines",
      "Hold onto a tree"
    ],
    correctAnswer: 2,
    explanation: "Moving to an open area keeps you safe from falling debris from buildings and power lines."
  },
  {
    id: "eq4",
    question: "After the shaking stops, what should be your priority?",
    options: [
      "Post on social media",
      "Check for injuries and hazards",
      "Go back to sleep",
      "Start cleaning up"
    ],
    correctAnswer: 1,
    explanation: "Checking for injuries and hazards ensures everyone's safety and prevents further harm."
  },
  {
    id: "eq5",
    question: "What is an aftershock?",
    options: [
      "The main earthquake",
      "A smaller earthquake that follows the main one",
      "A tsunami wave",
      "An electrical shock"
    ],
    correctAnswer: 1,
    explanation: "Aftershocks are smaller earthquakes that can occur after the main earthquake and can still cause damage."
  }
];

export const fireQuestions: QuizQuestion[] = [
  {
    id: "fire1",
    question: "What is the first thing you should do if you discover a fire?",
    options: [
      "Try to put it out yourself",
      "Alert others and activate the fire alarm",
      "Collect your belongings",
      "Take photos"
    ],
    correctAnswer: 1,
    explanation: "Alerting others and activating the alarm ensures everyone knows about the danger immediately."
  },
  {
    id: "fire2",
    question: "When evacuating a burning building, you should:",
    options: [
      "Use the elevator for quick escape",
      "Use the stairs and stay low",
      "Run as fast as possible",
      "Wait for firefighters"
    ],
    correctAnswer: 1,
    explanation: "Stairs are safe during fires (elevators can malfunction), and staying low helps avoid smoke inhalation."
  },
  {
    id: "fire3",
    question: "If your clothes catch fire, you should:",
    options: [
      "Run to find water",
      "Stop, Drop, and Roll",
      "Wave your arms to put it out",
      "Jump up and down"
    ],
    correctAnswer: 1,
    explanation: "Stop, Drop, and Roll smothers the flames by cutting off oxygen supply."
  },
  {
    id: "fire4",
    question: "Before opening a door during a fire, you should:",
    options: [
      "Open it quickly",
      "Kick it open",
      "Feel the door for heat",
      "Wait 5 minutes"
    ],
    correctAnswer: 2,
    explanation: "A hot door indicates fire on the other side. Find an alternative escape route."
  },
  {
    id: "fire5",
    question: "What type of fire extinguisher is used for electrical fires?",
    options: [
      "Water extinguisher",
      "Class A extinguisher",
      "Class C extinguisher",
      "Foam extinguisher"
    ],
    correctAnswer: 2,
    explanation: "Class C extinguishers are specifically designed for electrical fires."
  }
];

export const floodQuestions: QuizQuestion[] = [
  {
    id: "flood1",
    question: "How much water can sweep a car away?",
    options: [
      "6 inches (15 cm)",
      "1 foot (30 cm)",
      "2 feet (60 cm)",
      "3 feet (90 cm)"
    ],
    correctAnswer: 2,
    explanation: "Just 2 feet of rushing water can carry away most vehicles, including SUVs."
  },
  {
    id: "flood2",
    question: "If a flood warning is issued, you should:",
    options: [
      "Wait to see how bad it gets",
      "Move to higher ground immediately",
      "Go swimming",
      "Drive through flooded areas"
    ],
    correctAnswer: 1,
    explanation: "Moving to higher ground immediately gives you the best chance of staying safe."
  },
  {
    id: "flood3",
    question: "What should you do if you're trapped in a building during a flood?",
    options: [
      "Go to the basement",
      "Stay on the ground floor",
      "Go to the highest level",
      "Try to swim out"
    ],
    correctAnswer: 2,
    explanation: "Moving to the highest level keeps you above rising water and makes rescue easier."
  },
  {
    id: "flood4",
    question: "Is it safe to walk through moving floodwater?",
    options: [
      "Yes, if it's shallow",
      "Yes, if you're strong",
      "No, never walk through moving water",
      "Only during daytime"
    ],
    correctAnswer: 2,
    explanation: "Just 6 inches of moving water can knock you down. Never walk through floodwater."
  },
  {
    id: "flood5",
    question: "After a flood, you should:",
    options: [
      "Return home immediately",
      "Drink tap water right away",
      "Wait for official clearance before returning",
      "Touch electrical equipment"
    ],
    correctAnswer: 2,
    explanation: "Wait for authorities to declare it safe. Floodwater can contaminate water supplies and damage infrastructure."
  }
];

export const cycloneQuestions: QuizQuestion[] = [
  {
    id: "cyclone1",
    question: "What is the 'eye' of a cyclone?",
    options: [
      "The most dangerous part",
      "The calm center with clear skies",
      "The outer edge",
      "The starting point"
    ],
    correctAnswer: 1,
    explanation: "The eye is the calm center, but the strongest winds are in the eyewall surrounding it."
  },
  {
    id: "cyclone2",
    question: "When should you evacuate before a cyclone?",
    options: [
      "When the cyclone arrives",
      "When authorities issue evacuation orders",
      "After the storm passes",
      "Never evacuate"
    ],
    correctAnswer: 1,
    explanation: "Follow evacuation orders immediately. Waiting can put you in extreme danger."
  },
  {
    id: "cyclone3",
    question: "What should you do during the calm 'eye' of the cyclone?",
    options: [
      "Go outside to assess damage",
      "Stay indoors - the storm isn't over",
      "Start cleanup",
      "Leave your shelter"
    ],
    correctAnswer: 1,
    explanation: "The eye is temporary. The other side of the eyewall will bring more dangerous winds."
  },
  {
    id: "cyclone4",
    question: "Which room is safest during a cyclone?",
    options: [
      "Room with large windows",
      "Interior room without windows",
      "Upstairs bedroom",
      "Garage"
    ],
    correctAnswer: 1,
    explanation: "Interior rooms without windows protect you from flying debris and broken glass."
  },
  {
    id: "cyclone5",
    question: "What is storm surge?",
    options: [
      "Heavy rainfall",
      "Strong winds",
      "Abnormal rise in sea level",
      "Lightning strikes"
    ],
    correctAnswer: 2,
    explanation: "Storm surge is the abnormal rise in sea level that can cause severe coastal flooding."
  }
];

export const medicalQuestions: QuizQuestion[] = [
  {
    id: "med1",
    question: "What does CPR stand for?",
    options: [
      "Cardiac Pressure Relief",
      "Cardiopulmonary Resuscitation",
      "Chest Pressure Recovery",
      "Cardiac Pulse Restoration"
    ],
    correctAnswer: 1,
    explanation: "CPR stands for Cardiopulmonary Resuscitation, a life-saving technique."
  },
  {
    id: "med2",
    question: "What is the correct ratio for chest compressions to rescue breaths in CPR?",
    options: [
      "15:2",
      "20:2",
      "30:2",
      "40:2"
    ],
    correctAnswer: 2,
    explanation: "The recommended ratio is 30 chest compressions to 2 rescue breaths."
  },
  {
    id: "med3",
    question: "How should you treat a minor burn?",
    options: [
      "Apply ice directly",
      "Apply butter",
      "Cool with running water for 10-20 minutes",
      "Pop any blisters"
    ],
    correctAnswer: 2,
    explanation: "Cool running water helps reduce pain and prevents the burn from worsening."
  },
  {
    id: "med4",
    question: "What should you do if someone is choking and can't cough or speak?",
    options: [
      "Give them water",
      "Perform the Heimlich maneuver",
      "Pat their back gently",
      "Wait for them to cough it up"
    ],
    correctAnswer: 1,
    explanation: "The Heimlich maneuver (abdominal thrusts) can dislodge the obstruction."
  },
  {
    id: "med5",
    question: "What is the recovery position used for?",
    options: [
      "Broken bones",
      "Unconscious but breathing person",
      "Heart attack victims",
      "Choking victims"
    ],
    correctAnswer: 1,
    explanation: "The recovery position keeps the airway open for an unconscious but breathing person."
  }
];

export const leadershipQuestions: QuizQuestion[] = [
  {
    id: "lead1",
    question: "What is the most important quality of a disaster response leader?",
    options: [
      "Being the loudest",
      "Staying calm under pressure",
      "Being the fastest",
      "Being the strongest"
    ],
    correctAnswer: 1,
    explanation: "Staying calm helps you make better decisions and keeps others calm too."
  },
  {
    id: "lead2",
    question: "During an evacuation, a leader should:",
    options: [
      "Leave first",
      "Push others aside",
      "Help others and ensure everyone is accounted for",
      "Take all the supplies"
    ],
    correctAnswer: 2,
    explanation: "A good leader ensures everyone's safety and helps those who need assistance."
  },
  {
    id: "lead3",
    question: "What should you do if someone panics during an emergency?",
    options: [
      "Ignore them",
      "Yell at them",
      "Speak calmly and give clear instructions",
      "Leave them behind"
    ],
    correctAnswer: 2,
    explanation: "Calm, clear communication helps people regain control and follow safety procedures."
  },
  {
    id: "lead4",
    question: "Why is teamwork important in disaster management?",
    options: [
      "It's not important",
      "It helps accomplish tasks faster and more efficiently",
      "It's only for show",
      "It slows things down"
    ],
    correctAnswer: 1,
    explanation: "Teamwork allows people to use their strengths and accomplish more together."
  },
  {
    id: "lead5",
    question: "What should a leader do after a disaster?",
    options: [
      "Take all the credit",
      "Blame others for problems",
      "Help with recovery and support team members",
      "Disappear"
    ],
    correctAnswer: 2,
    explanation: "Good leaders continue to support their team during recovery and rebuilding."
  }
];

export const getQuestionsByCategory = (category: string): QuizQuestion[] => {
  switch (category.toLowerCase()) {
    case 'earthquake':
      return earthquakeQuestions;
    case 'fire':
      return fireQuestions;
    case 'flood':
      return floodQuestions;
    case 'cyclone':
      return cycloneQuestions;
    case 'medical':
      return medicalQuestions;
    case 'leadership':
      return leadershipQuestions;
    default:
      return earthquakeQuestions;
  }
};
