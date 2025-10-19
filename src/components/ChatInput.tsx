import React, { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import styles from './ChatInput.module.css';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  currentLanguage: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  disabled,
  currentLanguage 
}) => {
  const config = useConfig();
  const [input, setInput] = useState('');
  const { isListening, transcript, isSupported, startListening, stopListening } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleVoiceClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(currentLanguage);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={config.placeholder}
          disabled={disabled}
        />
        {config.enableVoice && isSupported && (
          <button
            type="button"
            className={`${styles.voiceButton} ${isListening ? styles.listening : ''}`}
            onClick={handleVoiceClick}
            disabled={disabled}
            title={isListening ? 'Stop recording' : 'Start voice input'}
          >
            {isListening ? '🎙️' : '🎤'}
          </button>
        )}
        <button
          type="submit"
          className={styles.sendButton}
          disabled={disabled || !input.trim()}
          style={{ backgroundColor: config.primaryColor }}
        >
          ➤
        </button>
      </div>
    </form>
  );
};