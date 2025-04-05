import React, { useState } from 'react';
import { Save, Key } from 'lucide-react';

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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Key size={20} className="text-purple-600" />
        <h2 className="text-xl font-semibold">Gemini API Key Configuration</h2>
      </div>
      
      <p className="mb-4 text-gray-600">
        To use this chat application, you need to provide a valid Google Gemini API key.
        You can get one from the <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
            API Key
          </label>
          <div className="relative">
            <input
              type={isVisible ? "text" : "password"}
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your Gemini API key"
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {isVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-blue-600 transition-colors"
        >
          <Save size={18} />
          Save API Key
        </button>
      </form>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Your API key will be stored locally in your browser and is not sent to any server other than Google's API.</p>
      </div>
    </div>
  );
};

export default ApiKeyConfig;