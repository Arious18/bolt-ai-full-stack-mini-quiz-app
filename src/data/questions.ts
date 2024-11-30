import { QuizQuestion } from '../types';

export const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the output of console.log(typeof typeof 1)?",
    options: ["number", "string", "undefined", "object"],
    correctAnswer: "string",
    category: "JavaScript",
    difficulty: "medium"
  },
  {
    id: 2,
    question: "In React, what hook is used for side effects?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: "useEffect",
    category: "React",
    difficulty: "easy"
  },
  // Add more questions here...
  {
    id: 100,
    question: "What is the time complexity of binary search?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    correctAnswer: "O(log n)",
    category: "Algorithms",
    difficulty: "medium"
  }
];