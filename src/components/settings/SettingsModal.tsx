import React from 'react';
import { X, Moon, Sun, Key } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import Button from '../ui/Button';
import Toggle from '../ui/Toggle';
import ApiKeyConfig from './ApiKeyConfig';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { darkMode, toggleDarkMode, apiKey, saveApiKey } = useSettingsStore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-dark-200 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-300">
          <h2 className="text-xl font-semibold dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-300"
            aria-label="Close"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium dark:text-white">Appearance</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {darkMode ? (
                  <Moon size={20} className="text-primary-600 dark:text-primary-400 mr-2" />
                ) : (
                  <Sun size={20} className="text-primary-600 dark:text-primary-400 mr-2" />
                )}
                <span className="dark:text-white">Dark Mode</span>
              </div>
              <Toggle isChecked={darkMode} onChange={toggleDarkMode} />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium dark:text-white">API Configuration</h3>
            <ApiKeyConfig onSave={saveApiKey} currentKey={apiKey} />
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-dark-300 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;