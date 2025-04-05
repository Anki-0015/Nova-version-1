import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Safety settings to filter out harmful content
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Generation config for the model
const generationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,
};

// Model to use
const modelName = "gemini-1.5-pro";

export type Message = {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: number;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
};

// Local storage keys
const API_KEY_STORAGE_KEY = "nova_api_key";

// Get API key from local storage or environment variables
export function getApiKey(): string | null {
  const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  return storedKey || envKey || null;
}

// Save API key to local storage
export function saveApiKey(apiKey: string): void {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
}

// Check if API key is valid
export function hasValidApiKey(): boolean {
  const apiKey = getApiKey();
  return apiKey !== null && apiKey.trim() !== "";
}

export async function getAIResponse(messages: Message[]): Promise<string> {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      throw new Error("API key is missing. Please configure your API key.");
    }
    
    // Initialize the Gemini API with the API key
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Get the model
    const model = genAI.getGenerativeModel({
      model: modelName,
      safetySettings,
      generationConfig,
    });

    // Format messages for the API
    const formattedHistory = messages.slice(0, -1).map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    // Start a chat session
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig,
      safetySettings,
    });

    // Send the last message and get a response
    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error getting response from AI:", error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return "Error: Invalid or missing API key. Please check your API key configuration.";
      } else if (error.message.includes("quota")) {
        return "Error: API quota exceeded. Please try again later or check your quota.";
      } else if (error.message.includes("network")) {
        return "Error: Network issue. Please check your internet connection and try again.";
      }
    }
    
    return "Sorry, I encountered an error while processing your request. Please try again.";
  }
}

// Generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Create a new conversation
export function createNewConversation(): Conversation {
  const now = Date.now();
  return {
    id: generateId(),
    title: "New Conversation",
    messages: [],
    createdAt: now,
    updatedAt: now
  };
}

// Generate a title for a conversation based on the first message
export async function generateConversationTitle(firstMessage: string): Promise<string> {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      return "New Conversation";
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Generate a very short title (4 words or less) for a conversation that starts with this message: "${firstMessage}"`;
    
    const result = await model.generateContent(prompt);
    const title = result.response.text().trim();
    
    return title || "New Conversation";
  } catch (error) {
    console.error("Error generating title:", error);
    return "New Conversation";
  }
}