export interface AgentWidgetConfig {
    // API Configuration
    apiEndpoint?: string; // Defaults to '/api/chat'
    
    // Appearance
    primaryColor?: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    bubbleIcon?: string; // URL or emoji
    
    // Language
    defaultLanguage?: string; // ISO code like 'en-US', 'hi-IN'
    supportedLanguages?: Array<{
      code: string;
      name: string;
    }>;
    
    // Labels & Text
    welcomeMessage?: string;
    placeholder?: string;
    headerTitle?: string;
    
    // Features
    enableVoice?: boolean;
    enableLanguageSwitcher?: boolean;
    
    // Context
    context?: string; // Business context for the agent
  }
  
  declare global {
    interface Window {
      AgentWidgetConfig?: AgentWidgetConfig;
    }
  }