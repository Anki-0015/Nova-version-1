import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bot, User } from 'lucide-react';
import { Message } from '../lib/gemini';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="font-medium mb-1">
          {isUser ? 'You' : 'Gemini AI'}
        </div>
        <div className="prose prose-sm max-w-none">
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
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;