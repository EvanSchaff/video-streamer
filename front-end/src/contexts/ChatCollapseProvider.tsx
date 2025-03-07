import { ChatCollapseContext } from './ChatCollapseContext';
import React, { useState } from 'react';

interface ChatCollapseProviderProps {
  children: React.ReactNode;
}

export const ChatCollapseProvider: React.FC<ChatCollapseProviderProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <ChatCollapseContext.Provider value={{ isCollapsed, toggleCollapse }}>
      {children}
    </ChatCollapseContext.Provider>
  );
};
