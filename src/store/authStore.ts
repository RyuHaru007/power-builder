import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data - in real app, this would come from API
        const mockUser: User = {
          id: '1',
          email: email,
          firstName: 'John',
          lastName: 'Doe'
        };
        
        set({ user: mockUser, isAuthenticated: true });
      },
      register: async (userData) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In real app, this would make an API call to register
        console.log('User registered:', userData);
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      changePassword: async (oldPassword: string, newPassword: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In real app, this would make an API call
        console.log('Password changed');
        
        // Logout user after password change
        get().logout();
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);