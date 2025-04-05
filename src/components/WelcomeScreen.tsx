import React from 'react';
import { Brain, Code, Lightbulb, Image, FileText } from 'lucide-react';

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
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mb-6">
        <Brain size={40} className="text-white" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Welcome to Gemini AI Chat</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Experience the power of Google's advanced AI model. Ask questions, get creative assistance, solve problems, and more.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
        {examples.map((example, index) => (
          <button
            key={index}
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors"
            onClick={() => onExampleClick(example.text)}
          >
            <div className="text-blue-600">{example.icon}</div>
            <span>{example.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;