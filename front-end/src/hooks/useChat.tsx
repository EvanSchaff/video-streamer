import sadgeImg from '../assets/sadge.png';
import { Message } from '../types/message';
import { useState } from 'react';

const useChat = () => {
  const [messageInputValue, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const paraseEmotes = (message: string) => {
    return message.replace(/:(\w+):/g, (match, emote) => emoteMap[emote] || match);
  };

  const emoteMap: Record<string, string> = {
    sadge: `<img src=${sadgeImg} alt="customEmote" style="display: inline-block; width: 42px; height: 32px; vertical-align: middle;"/>`,
  };

  const sendMessage = () => {
    if (messageInputValue) {
      const message = {
        username: 'Frogs',
        color: 'red',
        message: messageInputValue,
      };
      const updatedMessage = { ...message, message: paraseEmotes(message.message) };
      console.log(updatedMessage);
      setMessages([...messages, updatedMessage]);
      setNewMessage('');
    }
  };

  return {
    messages,
    messageInputValue,
    setNewMessage,
    sendMessage,
  };
};

export default useChat;
