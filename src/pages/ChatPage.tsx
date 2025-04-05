import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAIResponse } from '../lib/gemini';
import { useChatStore } from '../store/chatStore';
import { useSettingsStore } from '../store/settingsStore';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import WelcomeScreen from '../components/chat/WelcomeScreen';
import SettingsModal from '../components/settings/SettingsModal';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    getCurrentConversation, 
    createConversation, 
    addMessage, 
    isLoading, 
    setLoading 
  } = useChatStore();
  
  const { apiKey } = useSettingsStore();
  
  const currentConversation = getCurrentConversation();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !apiKey) return;
    
    // Create a new conversation if none exists
    if (!currentConversation) {
      createConversation();
    }
    
    // Add user message to chat
    addMessage({ role: 'user', content });
    
    // Add temporary loading message
    addMessage({ role: 'model', content: '...' });
    
    setLoading(true);
    
    try {
      // Get response from AI
      const messages = [...(currentConversation?.messages || []), { id: '', role: 'user', content, timestamp: Date.now() }];
      const response = await getAIResponse(messages);
      
      // Replace loading message with actual response
      const conversation = getCurrentConversation();
      if (conversation) {
        const updatedMessages = [...conversation.messages];
        updatedMessages.pop(); // Remove loading message
        
        // Add AI response
        addMessage({ role: 'model', content: response });
      }
    } catch (error) {
      console.error('Error in chat:', error);
      
      // Replace loading message with error
      const conversation = getCurrentConversation();
      if (conversation) {
        const updatedMessages = [...conversation.messages];
        updatedMessages.pop(); // Remove loading message
        
        // Add error message
        addMessage({ 
          role: 'model', 
          content: 'Sorry, I encountered an error. Please try again.' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    handleSendMessage(example);
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header onSettingsClick={handleSettingsClick} />
        
        <main className="flex-1 overflow-y-auto">
          {!currentConversation || currentConversation.messages.length === 0 ? (
            <WelcomeScreen onExampleClick={handleExampleClick} />
          ) : (
            <div className="max-w-4xl mx-auto">
              {currentConversation.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </main>
        
        <div className="sticky bottom-0 max-w-4xl w-full mx-auto">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading} 
            disabled={!apiKey} 
          />
        </div>
      </div>
      
      {showSettings && <SettingsModal onClose={handleCloseSettings} />}
    </div>
  );
};

export default ChatPage;