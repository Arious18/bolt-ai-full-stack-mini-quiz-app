import { create } from 'zustand';
import { User, QuizResult } from '../types';
import { api } from '../services/api';

interface Store {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  setCurrentUser: (user: User | null) => void;
  addUser: (user: User) => Promise<void>;
  addQuizResult: (userId: string, result: QuizResult) => Promise<void>;
  clearError: () => void;
}

const useStore = create<Store>((set) => ({
  currentUser: null,
  loading: false,
  error: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  clearError: () => set({ error: null }),
  addUser: async (user) => {
    set({ loading: true, error: null });
    try {
      const createdUser = await api.createUser(user);
      set({ currentUser: createdUser, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      });
      throw error;
    }
  },
  addQuizResult: async (userId, result) => {
    set({ loading: true, error: null });
    try {
      await api.submitQuizResult(result);
      const updatedResults = await api.getUserResults(userId);
      set((state) => ({
        currentUser: state.currentUser
          ? { ...state.currentUser, results: updatedResults }
          : null,
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      });
      throw error;
    }
  },
}));