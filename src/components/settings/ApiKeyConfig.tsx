import React, { useState } from 'react';
import { Save, Key } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ApiKeyConfigProps {
  onSave: (apiKey: string) => void;
  currentKey: string | null;
}

const ApiKeyConfig: React.FC<ApiKeyConfigProps> = ({ onSave, currentKey }) => {
  const [apiKey, setApiKey] = useState(currentKey || '');
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSave(apiKey.trim());
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-dark-300 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Key size={20} className="text-primary-600 dark:text-primary-400" />
        <h2 className="text-xl font-semibold dark:text-white">API Key Configuration</h2>
      </div>
      
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        To use this chat application, you need to provide a valid Google Gemini API key.
        You can get one from the <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Google AI Studio</a>.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            API Key
          </label>
          <div className="relative">
            <Input
              type={isVisible ? "text" : "password"}
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              rightIcon={
                <button
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {isVisible ? "Hide" : "Show"}
                </button>
              }
            />
          </div>
        </div>
        
        <Button
          type="submit"
          fullWidth
          leftIcon={<Save size={18} />}
          className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700"
        >
          Save API Key
        </Button>
      </form>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>Your API key will be stored locally in your browser and is not sent to any server other than Google's API.</p>
      </div>
    </div>
  );
};

export default ApiKeyConfig;