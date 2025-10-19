import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { ChatWindow } from './ChatWindow';
import styles from './Widget.module.css';

export const Widget: React.FC = () => {
  const config = useConfig();
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const getPositionClass = () => {
    switch (config.position) {
      case 'bottom-left':
        return styles.bottomLeft;
      case 'top-right':
        return styles.topRight;
      case 'top-left':
        return styles.topLeft;
      default:
        return styles.bottomRight;
    }
  };

  return (
    <div className={`${styles.widget} ${getPositionClass()}`}>
      {isOpen ? (
        <div className={styles.chatContainer}>
          <ChatWindow onClose={toggleWidget} />
        </div>
      ) : (
        <button
          className={styles.bubble}
          onClick={toggleWidget}
          style={{ backgroundColor: config.primaryColor }}
          title="Open chat"
        >
          <span className={styles.bubbleIcon}>{config.bubbleIcon}</span>
        </button>
      )}
    </div>
  );
};