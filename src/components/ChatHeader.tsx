import React from 'react';
import { Brain, Settings } from 'lucide-react';

interface ChatHeaderProps {
  onSettingsClick: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="border-b border-gray-200 bg-white p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
          <Brain size={24} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-xl">Gemini AI Chat</h1>
          <p className="text-xs text-gray-500">Powered by Google's Gemini 1.5 Pro</p>
        </div>
      </div>
      <button 
        className="p-2 rounded-full hover:bg-gray-100"
        onClick={onSettingsClick}
        aria-label="Settings"
      >
        <Settings size={20} className="text-gray-600" />
      </button>
    </header>
  );
};

export default ChatHeader;