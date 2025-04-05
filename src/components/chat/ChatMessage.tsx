import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User, Sparkles } from 'lucide-react';
import { Message } from '../../lib/gemini';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'bg-gray-50 dark:bg-dark-200' : 'bg-white dark:bg-dark-300'}`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' 
            : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
        }`}>
          {isUser ? <User size={18} /> : <Sparkles size={18} />}
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center mb-1">
          <div className="font-medium dark:text-white">
            {isUser ? 'You' : 'Nova AI'}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formattedTime}
          </div>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {message.content === '...' ? (
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          ) : (
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;