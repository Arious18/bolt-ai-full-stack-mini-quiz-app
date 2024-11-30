import React from 'react';
import { QuizQuestion, UserAnswer } from '../types';
import Button from './Button';

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (answer: string) => void;
  userAnswer?: UserAnswer;
  showResult?: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  onAnswer,
  userAnswer,
  showResult = false,
}) => {
  return (
    <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex justify-between">
        <span className="text-sm font-medium text-gray-500">
          {question.category}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
          question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
          question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {question.difficulty}
        </span>
      </div>
      
      <h3 className="mb-6 text-xl font-semibold text-gray-800">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option) => (
          <Button
            key={option}
            variant="outline"
            className={`w-full justify-start ${
              showResult && option === question.correctAnswer
                ? 'border-green-500 bg-green-50 text-green-700'
                : showResult && userAnswer?.selectedAnswer === option && option !== question.correctAnswer
                ? 'border-red-500 bg-red-50 text-red-700'
                : ''
            }`}
            onClick={() => onAnswer(option)}
            disabled={showResult}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;