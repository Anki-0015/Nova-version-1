import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Conversation, Message, generateId, createNewConversation, generateConversationTitle } from '../lib/gemini';

interface ChatState {
  conversations: Conversation[];
  currentConversationId: string | null;
  isLoading: boolean;
  
  // Actions
  setCurrentConversation: (id: string | null) => void;
  createConversation: () => string;
  deleteConversation: (id: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateConversationTitle: (id: string, title: string) => void;
  setLoading: (isLoading: boolean) => void;
  
  // Selectors
  getCurrentConversation: () => Conversation | null;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      currentConversationId: null,
      isLoading: false,
      
      setCurrentConversation: (id) => {
        set({ currentConversationId: id });
      },
      
      createConversation: () => {
        const newConversation = createNewConversation();
        set((state) => ({
          conversations: [newConversation, ...state.conversations],
          currentConversationId: newConversation.id
        }));
        return newConversation.id;
      },
      
      deleteConversation: (id) => {
        set((state) => {
          const newConversations = state.conversations.filter(c => c.id !== id);
          const newCurrentId = state.currentConversationId === id
            ? (newConversations.length > 0 ? newConversations[0].id : null)
            : state.currentConversationId;
            
          return {
            conversations: newConversations,
            currentConversationId: newCurrentId
          };
        });
      },
      
      addMessage: async (messageData) => {
        const { currentConversationId, conversations } = get();
        
        if (!currentConversationId) return;
        
        const message: Message = {
          id: generateId(),
          ...messageData,
          timestamp: Date.now()
        };
        
        // Update the conversation with the new message
        set((state) => {
          const updatedConversations = state.conversations.map(conv => {
            if (conv.id === currentConversationId) {
              // If this is the first message, generate a title
              const isFirstMessage = conv.messages.length === 0 && message.role === 'user';
              
              if (isFirstMessage) {
                // We'll update the title later asynchronously
                generateConversationTitle(message.content)
                  .then(title => {
                    get().updateConversationTitle(currentConversationId, title);
                  })
                  .catch(() => {
                    // If title generation fails, keep the default title
                  });
              }
              
              return {
                ...conv,
                messages: [...conv.messages, message],
                updatedAt: Date.now()
              };
            }
            return conv;
          });
          
          return { conversations: updatedConversations };
        });
        
        return message;
      },
      
      updateConversationTitle: (id, title) => {
        set((state) => ({
          conversations: state.conversations.map(conv => 
            conv.id === id ? { ...conv, title } : conv
          )
        }));
      },
      
      setLoading: (isLoading) => {
        set({ isLoading });
      },
      
      getCurrentConversation: () => {
        const { currentConversationId, conversations } = get();
        if (!currentConversationId) return null;
        return conversations.find(c => c.id === currentConversationId) || null;
      }
    }),
    {
      name: 'nova-chat-storage',
      partialize: (state) => ({ 
        conversations: state.conversations,
        currentConversationId: state.currentConversationId
      }),
    }
  )
);