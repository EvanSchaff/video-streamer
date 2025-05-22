import sadgeImg from '../assets/sadge.png';
import { Message } from '../types/message';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useChat = () => {
  const [messageInputValue, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

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

      const websocketMessage = {
        color: 'red',
        message: messageInputValue,
      };

      socket?.emit('message', websocketMessage);
    }
  };

  useEffect(() => {
    const serverUrl = 'http://localhost:3000';
    const newSocket = io(serverUrl, {
      transports: ['websocket'],
      reconnection: true,
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('message', (msg: Message) => {
      console.log('Message received from server:', msg);
      setMessages((prev) => [...prev, msg]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return {
    messages,
    messageInputValue,
    setNewMessage,
    sendMessage,
  };
};

export default useChat;

// User logs in
//

// SEND MESSAGE
// On send update array with the message
// then send to websocket server
// authenticate it
// broadcast to all clients or return error
