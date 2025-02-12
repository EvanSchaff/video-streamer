import { useState } from "react";
import { PersonStanding, ArrowRightToLine } from "lucide-react"


const ChatRoom = () => {
  const [messageInputValue, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const colorMap = {
    red: "text-red-500",
    green: "text-green-500",
    blue: "text-blue-500",
    yellow: "text-yellow-500",
    purple: "text-purple-500",
  }

  const sendMessage = () => {
    if (messageInputValue) {
      const message = {
        username: "Frogs",
        color: "red",
        message: messageInputValue
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col w-[340px] h-screen bg-neutral-950">
      <div className="flex flex-shrink-0 items-center flex-row justify-between p-3 border-b border-gray-300"> 
        <button>
          <ArrowRightToLine className="h-6 w-6 text-zinc-400"/>
        </button>
        <h1 className="text-zinc-400 font-semibold">Chat Room</h1>
        <button>
        <PersonStanding className="h-6 w-6 text-zinc-400"/>
        </button>
      </div>

      <div className="flex flex-1 p-4 overflow-y-auto flex-col-reverse border-[#35353B] border-l">
        {messages.slice().reverse().map((message, index) => (
          <div key={index}>
            <div className="text-white">
            <span className={colorMap[message.color] || "text-white"}>{message.username}: </span>{message.message}</div>
          </div>
        ))}
      </div>

    <div className="flex flex-col gap-2 p-3 border-[#35353B] border-l">
      <input
        className="flex-grow outline-gray-500 rounded-lg border p-2"
        type="text"
        value={messageInputValue}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Send a message"
      />
      <button className="ml-auto w-fit px-4 py-1 bg-green-400 rounded-md hover:bg-green-600" onClick={sendMessage}>Chat</button>
    </div>

    </div>
  );
}

export default ChatRoom;