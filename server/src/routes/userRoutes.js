import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.get('/:id/results', userController.getUserResults);

export default router;