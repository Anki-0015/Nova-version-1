import React from 'react';
import { Menu, Moon, Sun, Settings, Sparkles } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import Button from '../ui/Button';

interface HeaderProps {
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  const { darkMode, toggleDarkMode, toggleSidebar } = useSettingsStore();
  
  return (
    <header className="border-b border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-200 p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-300 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-primary-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl dark:text-white">Nova AI Chat</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Advanced AI assistant</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onSettingsClick}
          aria-label="Settings"
        >
          <Settings size={18} />
        </Button>
      </div>
    </header>
  );
};

export default Header;