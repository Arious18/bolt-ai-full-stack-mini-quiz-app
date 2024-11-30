import { User, QuizResult } from '../types';

const API_URL = 'http://localhost:3001/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(response.status, error.error || 'Request failed');
  }
  return response.json();
}

export const api = {
  async createUser(user: User): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      return handleResponse<User>(response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Failed to connect to server. Please try again.');
    }
  },

  async submitQuizResult(result: QuizResult): Promise<QuizResult> {
    try {
      const response = await fetch(`${API_URL}/quiz/results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      });
      return handleResponse<QuizResult>(response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Failed to submit quiz results. Please try again.');
    }
  },

  async getUserResults(userId: string): Promise<QuizResult[]> {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/results`);
      return handleResponse<QuizResult[]>(response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Failed to fetch results. Please try again.');
    }
  },
};