import  { useState } from 'react';
import { Search, Plus, Send, Hash, Phone, Video, Settings } from 'lucide-react';




const directChats = [
  {
    id: 1,
    name: "Sarah Chen",
    lastMessage: "Can you share the research paper?",
    time: "2m ago",
    unread: 2,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isGroup: false,
    online: true
  },
  {
    id: 2,
    name: "Michael Torres",
    lastMessage: "The presentation looks great!",
    time: "1h ago",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isGroup: false,
    online: false
  }
];

const groupChats = [
  {
    id: 3,
    name: "Research Team",
    lastMessage: "Meeting scheduled for tomorrow",
    time: "5m ago",
    unread: 5,
    avatar: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    isGroup: true
  },
  {
    id: 4,
    name: "AI Study Group",
    lastMessage: "Don't forget to review the latest AI trends.",
    time: "1d ago",
    unread: 3,
    avatar: "https://thelatch.com.au/wp-content/uploads/2023/04/AI-Group-Chat.jpg?w=900",
    isGroup: true
  }
];

const messages = [
    {
      id: 1,
      content: "Hi! I was wondering if you could share the research paper we discussed yesterday?",
      sender: "Sarah Chen",
      timestamp: "2:30 PM",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 2,
      content: "Of course! Let me find it for you.",
      sender: "You",
      timestamp: "2:31 PM",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 3,
      content: "Here it is! I've also included some additional notes that might be helpful.",
      sender: "You",
      timestamp: "2:32 PM",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  function Messages() {
    const [activeChat, setActiveChat] = useState(directChats[0]);
    const [messageInput, setMessageInput] = useState('');

    return (
      <main className="pt-16 min-h-screen bg-black">
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Sidebar */}
          <div className="w-80 bg-gray-900 flex flex-col border-r border-gray-800">
            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages"
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
  
            {/* Direct Messages */}
            <div className="px-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-gray-400">Direct Messages</h2>
                <button className="text-gray-400 hover:text-white">
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              {directChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={`flex items-center p-2 rounded-md cursor-pointer ${
                    activeChat.id === chat.id ? 'bg-gray-800' : 'hover:bg-gray-800'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-10 h-10 rounded-full"
                    />
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{chat.name}</span>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>

               {/* Group Chats */}
          <div className="px-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-400">Group Chats</h2>
              <button className="text-gray-400 hover:text-white">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            {groupChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`flex items-center p-2 rounded-md cursor-pointer ${
                  activeChat.id === chat.id ? 'bg-gray-800' : 'hover:bg-gray-800'
                }`}
              >
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-gray-900">
                    <Hash className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{chat.name}</span>
                    <span className="text-xs text-gray-400">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

             {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
            <div className="flex items-center">
              <img
                src={activeChat.avatar}
                alt={activeChat.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="ml-3">
                <h2 className="text-white font-medium">{activeChat.name}</h2>
                {!activeChat.isGroup && activeChat.online && (
                  <span className="text-xs text-green-500">Online</span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white">
                <Phone className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Video className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

                 {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start ${
                  message.sender === 'You' ? 'justify-end' : ''
                }`}
              >
                {message.sender !== 'You' && (
                  <img
                    src={message.avatar}
                    alt={message.sender}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                )}
                <div
                  className={`max-w-lg ${
                    message.sender === 'You'
                      ? 'bg-blue-600'
                      : 'bg-gray-800'
                  } rounded-lg px-4 py-2`}
                >
                  {message.sender !== 'You' && (
                    <span className="text-sm text-gray-400 block mb-1">
                      {message.sender}
                    </span>
                  )}
                  <p className="text-white">{message.content}</p>
                  <span className="text-xs text-gray-400 block mt-1">
                    {message.timestamp}
                  </span>
                </div>
                {message.sender === 'You' && (
                  <img
                    src={message.avatar}
                    alt={message.sender}
                    className="w-8 h-8 rounded-full ml-3"
                  />
                )}
              </div>
            ))}
          </div>

              {/* Message Input */}
          <div className="h-20 border-t border-gray-800 p-4">
            <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
              <button className="ml-2 text-blue-500 hover:text-blue-400">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Messages;