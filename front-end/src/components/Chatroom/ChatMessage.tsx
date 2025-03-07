import { Message } from '../../types/message';
import React from 'react';

interface ChatMessageProps {
  index: number;
  message: Message;
}
const ChatMessage: React.FC<ChatMessageProps> = ({ index, message }) => {
  const colorMap: Record<string, string> = {
    red: 'text-red-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
    yellow: 'text-yellow-500',
    purple: 'text-purple-500',
  };

  return (
    <div key={index} className="p-[2px] pr-3 pl-3 hover:rounded-sm hover:bg-gray-500">
      <div className="leading-8 break-words whitespace-normal text-gray-300">
        <span className={colorMap[message.color] || 'text-white'}>{message.username}: </span>
        <span dangerouslySetInnerHTML={{ __html: message.message }} />
      </div>
    </div>
  );
};

export default ChatMessage;
