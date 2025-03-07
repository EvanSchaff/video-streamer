import { Message } from '../../types/message';
import ChatMessage from './ChatMessage';
import React from 'react';

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="no-scrollbar flex flex-grow flex-col-reverse overflow-y-auto border-l border-[#35353B]">
      {messages
        .slice()
        .reverse()
        .map((message, index) => (
          <ChatMessage key={index} index={index} message={message} />
        ))}
    </div>
  );
};

export default ChatMessages;
