import { userModel } from '../models/userModel.js';
import { quizModel } from '../models/quizModel.js';
import { z } from 'zod';

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
});

export const userController = {
  async createUser(req, res) {
    try {
      const user = userSchema.parse(req.body);
      await userModel.create(user);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getUser(req, res) {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserResults(req, res) {
    try {
      const results = await quizModel.getUserResults(req.params.id);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};