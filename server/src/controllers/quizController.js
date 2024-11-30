import { quizModel } from '../models/quizModel.js';
import { z } from 'zod';

const answerSchema = z.object({
  questionId: z.number(),
  selectedAnswer: z.string(),
  isCorrect: z.boolean(),
});

const resultSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  score: z.number(),
  totalQuestions: z.number(),
  answers: z.array(answerSchema),
});

export const quizController = {
  async submitQuizResult(req, res) {
    try {
      const result = resultSchema.parse(req.body);
      await quizModel.createResult(result);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};