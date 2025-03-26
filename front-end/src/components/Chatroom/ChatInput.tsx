import discordLogo from '../../assets/discord_icon_white.png';
import { AuthContext } from '../../contexts/AuthContext';
import useDiscord from '../../hooks/useDiscord';
import { Shield, LogOut } from 'lucide-react';
import React, { useContext, useEffect, useRef } from 'react';

interface ChatInputProps {
  sendMessage: () => void;
  messageInputValue: string;
  setNewMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage, messageInputValue, setNewMessage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { redirectToDiscordAuth, redirectToLogout } = useDiscord();
  const { user, getAvatarURL, isLoading } = useContext(AuthContext);
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        avatarRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false); // Close the menu
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className="flex flex-shrink-0 flex-col gap-2 border-l border-[#35353B] bg-neutral-950 p-3">
      <input
        className="flex-grow rounded-md border bg-neutral-900 p-2 text-gray-500 outline-gray-500"
        type="text"
        value={messageInputValue}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Send a message"
      />
      <div className="flex justify-between">
        {!isLoading &&
          (user ? (
            <div className="relative">
              <img
                ref={avatarRef}
                src={getAvatarURL(user.id, user.avatar)}
                className="w-8 h-8 rounded-full"
                alt="User Avatar"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className="absolute w-30 left-0 bottom-full mb-2 bg-zinc-800 rounded-sm "
                >
                  <div className="flex flex-col p-2 gap-2">
                    <button className="flex p-1 items-center gap-2 text-sm font-medium hover:rounded-sm text-zinc-400 hover:bg-gray-500">
                      <Shield className="h-5 w-5"></Shield>
                      <span>Admin</span>
                    </button>
                    <button
                      className="flex p-1 items-center gap-2 text-sm font-medium hover:rounded-sm text-zinc-400 hover:bg-gray-500"
                      onClick={redirectToLogout}
                    >
                      <LogOut className="h-5 w-5"></LogOut>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              className="flex rounded-md items-center gap-2 font-medium bg-[#5865F2] hover:bg-indigo-600 pl-2 pr-3 py-1"
              onClick={redirectToDiscordAuth}
            >
              <img src={discordLogo} className="w-5 h-4" alt="Discord Logo" />
              <span className="text-[#E0E3FF]">Login</span>
            </button>
          ))}
        <button
          className="ml-auto justify-end w-fit rounded-md bg-green-400 px-3 py-1 font-medium hover:bg-green-600"
          onClick={sendMessage}
        >
          Chat
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
