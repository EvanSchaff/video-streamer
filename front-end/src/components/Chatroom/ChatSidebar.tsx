import { ChatCollapseContext } from '../../contexts/ChatCollapseContext';
import useChat from '../../hooks/useChat';
import useDiscord from '../../hooks/useDiscord';
import ChatRoomHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import { useContext } from 'react';

const ChatRoom = () => {
  const { isCollapsed } = useContext(ChatCollapseContext);
  const { messages, messageInputValue, sendMessage, setNewMessage } = useChat();
  const { redirectToDiscordAuth } = useDiscord();

  return (
    <div
      className={`flex h-full flex-shrink-0 flex-col bg-neutral-950 transition-all duration-500 ease-in-out ${isCollapsed ? 'md:w-0' : 'md:w-[360px]'}`}
    >
      <ChatRoomHeader />

      <ChatMessages messages={messages} />

      <ChatInput
        sendMessage={sendMessage}
        messageInputValue={messageInputValue}
        setNewMessage={setNewMessage}
        redirectToDiscordAuth={redirectToDiscordAuth}
      />
    </div>
  );
};

export default ChatRoom;
