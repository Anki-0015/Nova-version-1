import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getApiKey, saveApiKey as saveApiKeyToStorage } from '../lib/gemini';

interface SettingsState {
  darkMode: boolean;
  apiKey: string | null;
  showSidebar: boolean;
  
  toggleDarkMode: () => void;
  saveApiKey: (key: string) => void;
  toggleSidebar: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => {
      // Check if system prefers dark mode
      const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Initialize dark mode based on system preference
      const initialDarkMode = prefersDarkMode;
      
      // Apply dark mode to document if needed
      if (initialDarkMode) {
        document.documentElement.classList.add('dark');
      }
      
      return {
        darkMode: initialDarkMode,
        apiKey: getApiKey(),
        showSidebar: true,
        
        toggleDarkMode: () => {
          set((state) => {
            const newDarkMode = !state.darkMode;
            
            // Update the document class
            if (newDarkMode) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
            
            return { darkMode: newDarkMode };
          });
        },
        
        saveApiKey: (key) => {
          saveApiKeyToStorage(key);
          set({ apiKey: key });
        },
        
        toggleSidebar: () => {
          set((state) => ({ showSidebar: !state.showSidebar }));
        }
      };
    },
    {
      name: 'nova-settings-storage',
      partialize: (state) => ({ 
        darkMode: state.darkMode,
        apiKey: state.apiKey,
        showSidebar: state.showSidebar
      }),
    }
  )
);