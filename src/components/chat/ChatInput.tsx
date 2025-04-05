import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

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
    <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-dark-300 p-4 bg-white dark:bg-dark-200">
      <div className="relative flex items-center">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Please configure your API key first..." : "Ask Nova AI anything..."}
          className="flex-1 resize-none rounded-lg border border-gray-300 dark:border-dark-400 bg-white dark:bg-dark-300 px-4 py-2.5 pr-12 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 h-12 max-h-40"
          rows={1}
          autoResize
          disabled={isLoading || disabled}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim() || disabled}
          className="absolute right-2 rounded-md p-1.5"
          variant="ghost"
          size="sm"
        >
          <Send size={20} className={isLoading || disabled ? 'text-gray-400 dark:text-gray-600' : 'text-primary-600 dark:text-primary-400'} />
        </Button>
      </div>
      {disabled && !isLoading && (
        <p className="text-xs text-center mt-2 text-red-500 dark:text-red-400">
          Please configure your API key in settings to start chatting
        </p>
      )}
    </form>
  );
};

export default ChatInput;