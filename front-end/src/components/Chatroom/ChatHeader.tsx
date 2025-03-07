import { ChatCollapseContext } from '../../contexts/ChatCollapseContext';
import { PersonStanding, ArrowRightToLine } from 'lucide-react';
import React, { useContext } from 'react';

const ChatRoomHeader: React.FC = () => {
  const { toggleCollapse } = useContext(ChatCollapseContext);

  return (
    <div className="hidden md:flex md:flex-row md:items-center md:justify-between md:border-b md:border-gray-300 md:p-1 md:whitespace-nowrap">
      <button className="rounded-md p-1 hover:bg-gray-700" onClick={() => toggleCollapse()}>
        <ArrowRightToLine className="h-6 w-6 text-zinc-400" />
      </button>
      <h1 className="font-semibold text-zinc-400">Chat Room</h1>
      <button className="rounded-md p-1 hover:bg-gray-700">
        <PersonStanding className="h-6 w-6 text-zinc-400" />
      </button>
    </div>
  );
};

export default ChatRoomHeader;
