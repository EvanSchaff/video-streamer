import { createContext } from 'react';

interface ChatCollapseContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const defaultValues: ChatCollapseContextType = {
  isCollapsed: false,
  toggleCollapse: () => {},
};

export const ChatCollapseContext = createContext<ChatCollapseContextType>(defaultValues);
