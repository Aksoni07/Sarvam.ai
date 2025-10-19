import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import styles from './index.css?inline';

// Function to initialize the widget with Shadow DOM
const initWidget = () => {
  // Create host element
  const hostElement = document.createElement('div');
  hostElement.id = 'sarvam-widget-host';
  document.body.appendChild(hostElement);

  // Attach Shadow DOM
  const shadowRoot = hostElement.attachShadow({ mode: 'open' });

  // Create style element and inject CSS
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  shadowRoot.appendChild(styleElement);

  // Create mount point inside shadow root
  const mountPoint = document.createElement('div');
  mountPoint.id = 'widget-root';
  shadowRoot.appendChild(mountPoint);

  // Mount React app
  const root = ReactDOM.createRoot(mountPoint);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget);
} else {
  initWidget();
}

// Export for manual initialization if needed
export { initWidget };