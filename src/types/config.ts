export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    language?: string;
  }
  
  export interface ChatState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
  }
  
  export * from './config';