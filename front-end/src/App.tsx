import ChatRoom from './components/Chatroom/ChatSidebar';
import VideoSection from './components/VideoSection/VideoSection';
import { AuthContext } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthProvider';
import { ChatCollapseProvider } from './contexts/ChatCollapseProvider';
import { useContext } from 'react';

function App() {
  const { user, isLoading } = useContext(AuthContext);

  return (
    <AuthProvider>
      <ChatCollapseProvider>
        <div className="flex h-screen flex-col bg-zinc-950 md:flex-row">
          <div className="no-scrollbar md:fill-1 w-full">
            <VideoSection />
          </div>
          <div className="no-scrollbar flex-1 overflow-hidden md:flex-none">
            <ChatRoom />
          </div>
        </div>
        {!isLoading && user?.site_username === null && (
          <div className="absolute inset-0 flex items-center justify-center text-amber-50">
            hello
          </div>
        )}
      </ChatCollapseProvider>
    </AuthProvider>
  );
}

export default App;
