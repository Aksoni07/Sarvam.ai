import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useConfig } from '../context/ConfigContext';
import styles from './MessageList.module.css';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  currentLanguage: string;
}

export const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  isLoading,
  currentLanguage 
}) => {
  const config = useConfig();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { speak, isSpeaking } = useSpeechSynthesis();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSpeak = (text: string, lang: string) => {
    speak(text, lang);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={styles.container}>
      {messages.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.welcomeIcon}>👋</div>
          <p className={styles.welcomeMessage}>{config.welcomeMessage}</p>
        </div>
      )}
      
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${styles.message} ${
            message.role === 'user' ? styles.userMessage : styles.assistantMessage
          }`}
        >
          <div className={styles.messageContent}>
            <div className={styles.messageText}>{message.content}</div>
            <div className={styles.messageFooter}>
              <span className={styles.timestamp}>{formatTime(message.timestamp)}</span>
              {message.role === 'assistant' && config.enableVoice && (
                <button
                  className={styles.speakButton}
                  onClick={() => handleSpeak(message.content, message.language || currentLanguage)}
                  title="Listen to message"
                >
                  🔊
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className={`${styles.message} ${styles.assistantMessage}`}>
          <div className={styles.messageContent}>
            <div className={styles.loadingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};