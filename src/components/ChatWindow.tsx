import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useChat } from '../hooks/useChat';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import styles from './ChatWindow.module.css';

interface ChatWindowProps {
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const config = useConfig();
  const { messages, isLoading, sendMessage } = useChat(config.apiEndpoint);
  const [currentLanguage, setCurrentLanguage] = useState(config.defaultLanguage || 'en-US');

  const handleSendMessage = (message: string) => {
    sendMessage(message, config.context || '', currentLanguage);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} style={{ backgroundColor: config.primaryColor }}>
        <div className={styles.headerContent}>
          <h3 className={styles.title}>{config.headerTitle}</h3>
          {config.enableLanguageSwitcher && config.supportedLanguages && (
            <select
              className={styles.languageSelect}
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
            >
              {config.supportedLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <button
          className={styles.closeButton}
          onClick={onClose}
          title="Close chat"
        >
          ✕
        </button>
      </div>
      
      <MessageList 
        messages={messages} 
        isLoading={isLoading}
        currentLanguage={currentLanguage}
      />
      
      <ChatInput 
        onSend={handleSendMessage} 
        disabled={isLoading}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};