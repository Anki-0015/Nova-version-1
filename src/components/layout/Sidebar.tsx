import React from 'react';
import { PlusCircle, Trash2, MessageSquare, LogOut } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { useSettingsStore } from '../../store/settingsStore';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';

const Sidebar: React.FC = () => {
  const { conversations, currentConversationId, createConversation, setCurrentConversation, deleteConversation } = useChatStore();
  const { showSidebar } = useSettingsStore();
  const { user, logout } = useAuthStore();
  
  if (!showSidebar) return null;
  
  return (
    <aside className="w-64 h-screen flex flex-col bg-white dark:bg-dark-200 border-r border-gray-200 dark:border-dark-300">
      <div className="p-4">
        <Button 
          fullWidth 
          leftIcon={<PlusCircle size={18} />}
          onClick={() => createConversation()}
        >
          New Chat
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {conversations.length > 0 ? (
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
              Recent Conversations
            </h3>
            <ul className="space-y-1">
              {conversations.map((conversation) => (
                <li key={conversation.id}>
                  <div className={`
                    flex items-center justify-between px-2 py-2 rounded-md text-sm
                    ${currentConversationId === conversation.id 
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-300'}
                  `}>
                    <button
                      className="flex items-center flex-1 min-w-0 overflow-hidden"
                      onClick={() => setCurrentConversation(conversation.id)}
                    >
                      <MessageSquare size={16} className="flex-shrink-0 mr-2" />
                      <span className="truncate">{conversation.title}</span>
                    </button>
                    <button
                      className="ml-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conversation.id);
                      }}
                      aria-label="Delete conversation"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
            <MessageSquare size={24} className="mx-auto mb-2 opacity-50" />
            <p>No conversations yet</p>
            <p className="text-sm">Start a new chat to begin</p>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-dark-300">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-400 mr-2">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate dark:text-gray-200">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          fullWidth 
          leftIcon={<LogOut size={16} />}
          onClick={logout}
        >
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;