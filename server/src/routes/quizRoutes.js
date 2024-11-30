import express from 'express';
import { quizController } from '../controllers/quizController.js';

const router = express.Router();

router.post('/results', quizController.submitQuizResult);

export default router;