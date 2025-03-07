import ChatRoom from './components/Chatroom/ChatSidebar';
import VideoSection from './components/VideoSection/VideoSection';
import { AuthProvider } from './contexts/AuthProvider';
import { ChatCollapseProvider } from './contexts/ChatCollapseProvider';

function App() {
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
      </ChatCollapseProvider>
    </AuthProvider>
  );
}

export default App;
