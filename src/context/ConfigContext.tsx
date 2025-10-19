import React, { createContext, useContext, ReactNode } from 'react';
import { AgentWidgetConfig } from '../types/config';

const DEFAULT_CONFIG: AgentWidgetConfig = {
  apiEndpoint: '/api/chat',
  primaryColor: '#6366f1',
  position: 'bottom-right',
  bubbleIcon: '💬',
  defaultLanguage: 'en-US',
  supportedLanguages: [
    { code: 'en-US', name: 'English' },
    { code: 'hi-IN', name: 'हिंदी' },
    { code: 'ta-IN', name: 'தமிழ்' },
    { code: 'te-IN', name: 'తెలుగు' },
  ],
  welcomeMessage: 'Hello! How can I help you today?',
  placeholder: 'Type your message...',
  headerTitle: 'Chat Assistant',
  enableVoice: true,
  enableLanguageSwitcher: true,
  context: '',
};

const ConfigContext = createContext<AgentWidgetConfig>(DEFAULT_CONFIG);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const config = { ...DEFAULT_CONFIG, ...window.AgentWidgetConfig };
  
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context;
};