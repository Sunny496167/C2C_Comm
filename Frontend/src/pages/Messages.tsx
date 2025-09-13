// Messages.tsx
import React, { useState, useEffect, useRef } from "react";
import { Send, User, Users } from "lucide-react";
import io from "socket.io-client";
import GroupCreateModal from "../components/GroupCreateModal";
import { jwtDecode } from "jwt-decode";

// Type definitions
interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

interface Conversation {
  _id: string;
  members: string[];
  name?: string;
}

interface AppUser {
  _id: string;
  firstname: string;
  lastname: string;
  profilePic?: string;
  isLawyer?: boolean;
}

interface CurrentUser {
  _id: string;
  firstname: string;
  lastname: string;
  profilePic?: string;
  isLawyer?: boolean;
  accessToken: string;
}

const Messages: React.FC = () => {
  // State for current user (fetched via token and API)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [contacts, setContacts] = useState<AppUser[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const socket = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch current user from token and API
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const userId = decoded.id;
        fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            setCurrentUser({ ...data, accessToken: token });
          })
          .catch((err) => console.error("Failed to fetch current user:", err));
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    } else {
      console.error("No auth token found");
    }
  }, []);

  // Setup socket connection when currentUser is available
  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:8900");
      socket.current.emit("addUser", currentUser._id);

      socket.current.on("getUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      socket.current.on("getMessage", (newMsg: Message) => {
        if (newMsg.conversationId === selectedConversation) {
          setMessages((prev) => [...prev, newMsg]);
        }
      });

      return () => {
        socket.current?.disconnect();
      };
    }
  }, [currentUser, selectedConversation]);

  // Fetch contacts from the current user's data
  useEffect(() => {
    if (currentUser) {
      const fetchContacts = async () => {
        try {
          const res = await fetch(
            `http://localhost:5000/api/users/${currentUser._id}`,
            {
              headers: { Authorization: `Bearer ${currentUser.accessToken}` },
            }
          );
          if (!res.ok) throw new Error("Failed to fetch user data");
          const userData = await res.json();
          if (!userData.contacts || userData.contacts.length === 0) {
            setContacts([]);
            return;
          }
          const acceptedContacts: AppUser[] = await Promise.all(
            userData.contacts.map(async (contactId: string) => {
              const res = await fetch(
                `http://localhost:5000/api/users/${contactId}`,
                {
                  headers: {
                    Authorization: `Bearer ${currentUser.accessToken}`,
                  },
                }
              );
              if (!res.ok)
                throw new Error(`Failed to fetch contact ${contactId}`);
              const data = await res.json();
              return {
                _id: contactId,
                firstname: data.firstname,
                lastname: data.lastname,
                profilePic: data.profilePic || "",
                isLawyer: data.isLawyer,
              };
            })
          );
          setContacts(acceptedContacts);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      };
      fetchContacts();
    }
  }, [currentUser]);

  // Fetch conversations for the current user
  useEffect(() => {
    if (currentUser) {
      const fetchConversations = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/conversation/${currentUser._id}`,
            {
              headers: { Authorization: `Bearer ${currentUser.accessToken}` },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch conversations");
          const convosData = await response.json();
          setConversations(convosData);
        } catch (error) {
          console.error("Error fetching conversations:", error);
        }
      };
      fetchConversations();
    }
  }, [currentUser]);

  // Fetch messages for the selected conversation
  useEffect(() => {
    if (selectedConversation && currentUser) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/message/${selectedConversation}`,
            {
              headers: { Authorization: `Bearer ${currentUser.accessToken}` },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch messages");
          const msgs = await response.json();
          setMessages(msgs);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [selectedConversation, currentUser]);

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handler to select a contact and fetch/create a one-on-one conversation
  const handleSelectContact = async (contactId: string) => {
    if (!currentUser) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/conversation/find/${currentUser._id}/${contactId}`,
        {
          headers: { Authorization: `Bearer ${currentUser.accessToken}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch/create conversation");
      const conversation = await response.json();
      setSelectedConversation(conversation._id);
    } catch (err) {
      console.error("Error selecting contact:", err);
    }
  };

  // Handler to send a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !currentUser) return;
    const messageData = {
      conversationId: selectedConversation,
      senderId: currentUser._id,
      text: newMessage,
    };
    try {
      const response = await fetch("http://localhost:5000/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify(messageData),
      });
      if (!response.ok) throw new Error("Failed to send message");
      const savedMessage = await response.json();
      setMessages((prev) => [...prev, savedMessage]);
      setNewMessage("");
      const conversation = conversations.find(
        (convo) => convo._id === selectedConversation
      );
      if (!conversation) return;

      const recieverIds = conversation.members.filter(
        (memberId) => memberId !== currentUser._id
      );
      // Emit the message via socket for real‑time update
      socket.current?.emit("sendMessage", {
        senderId: currentUser._id,
        recieverIds, // <-- added this
        text: newMessage,
        conversationId: selectedConversation,
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Handler to create a group conversation
  const handleCreateGroup = async (name: string, selectedUserIds: string[]) => {
    if (!currentUser) return;
    try {
      const response = await fetch(
        "http://localhost:5000/api/conversation/group",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
          body: JSON.stringify({
            name,
            members: [currentUser._id, ...selectedUserIds],
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to create group");
      const newGroup = await response.json();
      setConversations((prev) => [...prev, newGroup]);
      setSelectedConversation(newGroup._id);
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-4">
            {/* Left Sidebar */}
            <div className="col-span-1 border-r border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Contacts</h2>
                <button
                  onClick={() => setShowCreateGroup(true)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg text-blue-600"
                >
                  <Users className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {contacts.length > 0 ? (
                  contacts.map((user) => (
                    <div
                      key={user._id}
                      onClick={() => handleSelectContact(user._id)}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                      <div className="relative">
                        {user.profilePic ? (
                          <img
                            src={user.profilePic}
                            alt={`${user.firstname} ${user.lastname}`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="text-gray-500" size={20} />
                          </div>
                        )}
                        {onlineUsers.some(
                          (onlineUser: any) => onlineUser.userId === user._id
                        ) && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {user.firstname} {user.lastname}
                        </p>
                        <p className="text-sm text-gray-500">
                          {user.isLawyer ? "Doctor" : "Patient"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center">
                    No connected contacts
                  </div>
                )}
              </div>
              <div className="border-t pt-4">
                <h2 className="text-lg font-bold mb-4">Conversations</h2>
                <div className="space-y-2">
                  {conversations.map((convo) => {
                    const isGroup =
                      convo.members.length > 2 || Boolean(convo.name);
                    const otherMembers = convo.members.filter(
                      (m) => m !== currentUser._id
                    );
                    const contactUser = contacts.find(
                      (u) => u._id === otherMembers[0]
                    );
                    return (
                      <div
                        key={convo._id}
                        onClick={() => setSelectedConversation(convo._id)}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                          selectedConversation === convo._id
                            ? "bg-blue-50"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {isGroup ? (
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                        ) : (
                          <div className="relative">
                            {contactUser?.profilePic ? (
                              <img
                                src={contactUser.profilePic}
                                alt={contactUser.firstname}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <User className="text-gray-500" size={20} />
                              </div>
                            )}
                          </div>
                        )}
                        <div>
                          <p className="font-medium">
                            {convo.name ||
                              (contactUser
                                ? `${contactUser.firstname} ${contactUser.lastname}`
                                : "Unknown User")}
                          </p>
                          {isGroup && (
                            <p className="text-sm text-gray-500">
                              {convo.members.length} members
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Chat Area */}
            <div className="col-span-3 h-[calc(100vh-8rem)] flex flex-col">
              {selectedConversation ? (
                <>
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((message) => {
                      const isCurrentUser =
                        message.senderId === currentUser._id;
                      const sender = contacts.find(
                        (u) => u._id === message.senderId
                      );
                      const isGroup =
                        conversations.find(
                          (c) => c._id === selectedConversation
                        )?.members.length > 2;
                      return (
                        <div
                          key={message._id}
                          className={`flex ${
                            isCurrentUser ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              isCurrentUser
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {!isCurrentUser && isGroup && (
                              <div className="flex items-center gap-2 mb-2">
                                {sender?.profilePic ? (
                                  <img
                                    src={sender.profilePic}
                                    alt={sender.firstname}
                                    className="w-6 h-6 rounded-full"
                                  />
                                ) : (
                                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User className="text-gray-500" size={14} />
                                  </div>
                                )}
                                <span className="text-sm font-medium">
                                  {sender?.firstname} {sender?.lastname}
                                </span>
                              </div>
                            )}
                            <p>{message.text}</p>
                            <p className="text-xs opacity-75 mt-1">
                              {new Date(message.createdAt).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        placeholder="Type a message..."
                        className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a conversation to start chatting
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <GroupCreateModal
        users={contacts}
        isOpen={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        onCreate={handleCreateGroup}
      />
    </div>
  );
};

export default Messages;
