// Messages.js
import React, { useState } from "react";
import "./Messages.css";
import SidebarMenu from "./SidebarMenu";

const chats = [
  {
    id: 1,
    name: "Haley Fallon",
    company: "Classical Charter Schools",
    date: "2/20/25",
    avatar: "https://via.placeholder.com/40",
    messages: [
      {
        id: 1,
        text: "Hey again Steven, I hope this email finds you well.",
        sentByUser: false,
      },
    ],
  },
  {
    id: 2,
    name: "Kara Della Vecchia",
    company: "Success Academy Charter Schools (NY)",
    date: "2/19/25",
    avatar: "https://via.placeholder.com/40",
    messages: [
      {
        id: 1,
        text: "Hi Steven! I am following up here to check on...",
        sentByUser: false,
      },
    ],
  },
];


    // State for selected conversation
    const Messages = () => {
      const [activeChat, setActiveChat] = useState(null);
      const [messages, setMessages] = useState([]);
      const [newMessage, setNewMessage] = useState("");
    
      const handleSelectChat = (chat) => {
        setActiveChat(chat);
        setMessages(chat.messages || []);
      };
    
      const handleSendMessage = () => {
        if (newMessage.trim() === "") return;
        const newMsg = {
          id: Date.now(),
          text: newMessage,
          sentByUser: true,
          avatar: "https://via.placeholder.com/40",
        };
        setMessages((prev) => [...prev, newMsg]);
        setNewMessage("");
      };
    
     
    

      return (
        
        <div className="messages-page">
            <div className="sidebar"><SidebarMenu /></div>

            {/* Header */}
            <div className="main-content">
                <div className="messages-header">
                     <h1>Messages</h1>
                </div>

                <div className="messages-container">
                    {/* Sidebar - Chat List */}
                    <div className="messages-sidebar">
                        <h2 className="sidebar-title">Messages</h2>
                        <div className="conversation-list">
                            {chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    className={`conversation ${activeChat?.id === chat.id ? "active" : ""}`}
                                    onClick={() => handleSelectChat(chat)}
                                >
                                    <img src={chat.avatar} alt={chat.name} className="user-avatar" />
                                    <div className="conversation-details">
                                        <strong>{chat.name}</strong>
                                        <p className="company-name">{chat.company}</p>
                                        <p className="last-message">{chat.lastMessage}</p>
                                    </div>
                                    <span className="message-date">{chat.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="chat-area">
                      {activeChat ? (
                        <>
                          <h2 className="chat-title">{activeChat.name}</h2>
                          <p className="company-name">{activeChat.company}</p>

                          {messages.map((msg) => (
                            <div key={msg.id} className="message left">
                              <img
                                src={msg.avatar || activeChat.avatar}
                                alt="User"
                                className="user-avatar"
                              />
                              <div className="message-bubble">{msg.text}</div>
                            </div>
                          ))}


                          <div className="message-input-container">
                            <textarea
                              placeholder="Type a message..."
                              className="message-input"
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSendMessage();
                                }
                              }}
                            ></textarea>
                          </div>
                        </>
                      ) : (
                        <div className="no-conversation">
                          <p>No conversation selected.</p>
                        </div>
                      )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Messages;
