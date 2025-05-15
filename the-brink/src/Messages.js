// src/Messages.js
import React, { useState } from "react";
import "./Messages.css";
import SidebarMenu from "./SidebarMenu";

// Helper to get initials from a name
const getInitials = (fullName) => {
  const parts = fullName.split(" ");
  const first = parts[0]?.charAt(0).toUpperCase() || "";
  const second = parts[1]?.charAt(0).toUpperCase() || "";
  return first + second;
};

const chats = [
  {
    id: 1,
    name: "Haley Fallon",
    company: "Classical Charter Schools",
    date: "2/20/25",
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
    messages: [
      {
        id: 1,
        text: "Hi Steven! I am following up here to check on...",
        sentByUser: false,
      },
    ],
  },
];

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
    };
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="messages-page">
       <SidebarMenu />
 
      <div className="main-content">
        <div className="messages-header">
          <h1>Messages</h1>
        </div>

        <div className="messages-container">
          {/* Chat list */}
          <div className="messages-sidebar">
            <h2 className="sidebar-title">Messages</h2>
            <div className="conversation-list">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`conversation ${
                    activeChat?.id === chat.id ? "active" : ""
                  }`}
                  onClick={() => handleSelectChat(chat)}
                >
                  <div className="user-avatar">
                    {getInitials(chat.name)}
                  </div>
                  <div className="conversation-details">
                    <strong>{chat.name}</strong>
                    <p className="company-name">{chat.company}</p>
                  </div>
                  <span className="message-date">{chat.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="chat-area">
            {activeChat ? (
              <>
                <h2 className="chat-title">{activeChat.name}</h2>
                <p className="company-name">{activeChat.company}</p>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${msg.sentByUser ? "right" : "left"}`}
                  >
                    <div className="user-avatar">
                      {msg.sentByUser
                        ? getInitials("You")
                        : getInitials(activeChat.name)}
                    </div>
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
                  />
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

