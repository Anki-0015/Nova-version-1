import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, disabled = false }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
      <div className="relative flex items-center">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Please configure your API key first..." : "Ask Gemini AI anything..."}
          className="flex-1 resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-12 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 h-12 max-h-40"
          rows={1}
          disabled={isLoading || disabled}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim() || disabled}
          className="absolute right-2 rounded-md p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
        >
          <Send size={20} className={isLoading || disabled ? 'text-gray-400' : 'text-blue-600'} />
        </button>
      </div>
      {disabled && !isLoading && (
        <p className="text-xs text-center mt-2 text-red-500">
          Please configure your Gemini API key in settings to start chatting
        </p>
      )}
    </form>
  );
};

export default ChatInput;