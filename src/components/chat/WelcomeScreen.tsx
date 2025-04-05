import React from 'react';
import { Sparkles, Code, Lightbulb, Image, FileText } from 'lucide-react';
import Button from '../ui/Button';

interface WelcomeScreenProps {
  onExampleClick: (example: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onExampleClick }) => {
  const examples = [
    {
      icon: <Lightbulb size={20} />,
      text: "Explain quantum computing in simple terms",
    },
    {
      icon: <Code size={20} />,
      text: "Write a React component that fetches and displays user data",
    },
    {
      icon: <FileText size={20} />,
      text: "Summarize the key points of climate change research",
    },
    {
      icon: <Image size={20} />,
      text: "Describe how to create effective data visualizations",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="bg-gradient-to-r from-primary-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mb-6">
        <Sparkles size={40} className="text-white" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2 dark:text-white">Welcome to Nova AI Chat</h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        Experience the power of advanced AI. Ask questions, get creative assistance, solve problems, and more.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
        {examples.map((example, index) => (
          <button
            key={index}
            className="flex items-center gap-3 p-4 bg-white dark:bg-dark-300 border border-gray-200 dark:border-dark-400 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-dark-400 transition-colors"
            onClick={() => onExampleClick(example.text)}
          >
            <div className="text-primary-600 dark:text-primary-400">{example.icon}</div>
            <span className="dark:text-gray-300">{example.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;