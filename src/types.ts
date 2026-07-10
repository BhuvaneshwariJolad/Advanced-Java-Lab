export interface Topic {
  id: string;
  title: string;
  description: string;
  keyConcepts: string[];
  detailedContent: string;
  codeExample: string;
  complexityTable?: Record<string, string>[];
}

export interface Lab {
  id: number;
  title: string;
  topic: string;
  objective: string;
  problemStatement: string;
  tasks: string[];
  expectedOutput: string;
  sampleInputOutput: {
    input: string;
    output: string;
  };
  starterCode: string;
  solutionCode: string;
  instructorHints: string[];
  testCases: string[];
}

export interface QuizQuestion {
  id: number;
  labId: number;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index in options
  explanation: string;
}

export interface QuizScore {
  labId: number;
  topic: string;
  score: number;
  total: number;
  completedAt: string;
}

export interface SubmissionTemplate {
  fileName: string;
  content: string;
}
