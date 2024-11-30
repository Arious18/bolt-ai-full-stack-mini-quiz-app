export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface QuizResult {
  id: string;
  userId: string;
  date: string;
  score: number;
  totalQuestions: number;
  answers: UserAnswer[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  results: QuizResult[];
}