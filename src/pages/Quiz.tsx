import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import QuizCard from '../components/QuizCard';
import Button from '../components/Button';
import useStore from '../store/useStore';
import { UserAnswer } from '../types';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, addQuizResult } = useStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      isCorrect: answer === currentQuestion.correctAnswer,
    };

    setUserAnswers([...userAnswers, userAnswer]);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowResult(false);
      } else {
        finishQuiz([...userAnswers, userAnswer]);
      }
    }, 1500);
  };

  const finishQuiz = (finalAnswers: UserAnswer[]) => {
    const score = finalAnswers.filter((answer) => answer.isCorrect).length;
    const result = {
      id: crypto.randomUUID(),
      userId: currentUser!.id,
      date: new Date().toISOString(),
      score,
      totalQuestions: questions.length,
      answers: finalAnswers,
    };
    addQuizResult(currentUser!.id, result);
    navigate('/results');
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Programming Quiz
            </h1>
            <p className="text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900">{currentUser.name}</p>
            <p className="text-sm text-gray-600">{currentUser.email}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <QuizCard
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            userAnswer={userAnswers[currentQuestionIndex]}
            showResult={showResult}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;