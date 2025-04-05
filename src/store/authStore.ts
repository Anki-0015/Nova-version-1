import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Mock user database for demo purposes
const MOCK_USERS: Record<string, { id: string; email: string; name: string; password: string }> = {};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          const normalizedEmail = email.toLowerCase();
          const user = Object.values(MOCK_USERS).find(u => u.email === normalizedEmail);
          
          if (!user || user.password !== password) {
            throw new Error('Invalid email or password');
          }
          
          const { password: _, ...userWithoutPassword } = user;
          
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred during login',
            isLoading: false
          });
        }
      },
      
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          const normalizedEmail = email.toLowerCase();
          
          // Check if user already exists
          if (Object.values(MOCK_USERS).some(u => u.email === normalizedEmail)) {
            throw new Error('User with this email already exists');
          }
          
          // Create new user
          const id = Math.random().toString(36).substring(2, 15);
          const newUser = { id, name, email: normalizedEmail, password };
          
          // Add to mock database
          MOCK_USERS[id] = newUser;
          
          const { password: _, ...userWithoutPassword } = newUser;
          
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred during registration',
            isLoading: false
          });
        }
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      },
      
      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'nova-auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);