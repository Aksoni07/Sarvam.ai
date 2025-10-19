import React from 'react';
import { ConfigProvider } from './context/ConfigContext';
import { Widget } from './components/Widget';

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <Widget />
    </ConfigProvider>
  );
};

export default App;