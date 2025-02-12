import ChatRoom from "./components/ChatRoom"
import VideoPlayer from "./components/VideoPlayer"

function App() {

  return (
    <div className="flex flex-row">
      <div className="flex-grow min-w-0">
        <VideoPlayer />
      </div>
      <ChatRoom />

    </div>
  )
}

export default App
