// Messages.js
import React, { useState } from "react";
import "./Messages.css";
import SidebarMenu from "./SidebarMenu";

const Messages = () => {
    // Sample chat data
    const chats = [
        {
            id: 1,
            name: "Haley Fallon",
            company: "Classical Charter Schools",
            lastMessage: "Hey again Steven, I hope this email...",
            fullMessage: "Hey again Steven, I hope this email finds you well. I wanted to follow up...",
            date: "2/20/25",
            avatar: "https://via.placeholder.com/40",
            sentByUser: false
        },
        {
            id: 2,
            name: "Kara Della Vecchia",
            company: "Success Academy Charter Schools (NY)",
            lastMessage: "Hi Steven! I am following up here t...",
            fullMessage: "Hi Steven! I am following up here to check on...",
            date: "2/19/25",
            avatar: "https://via.placeholder.com/40",
            sentByUser: true
        }
    ];

    // State for selected conversation
    const [activeChat, setActiveChat] = useState(null);

    return (
        
        <div className="messages-page">
            <SidebarMenu />

            {/* Header */}
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
                                onClick={() => setActiveChat(chat)}
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

                            {/* Messages */}
                            <div className={`message ${activeChat.sentByUser ? "right" : "left"}`}>
                                <img src={activeChat.avatar} alt="User" className="user-avatar" />
                                <div className="message-bubble">{activeChat.fullMessage}</div>
                            </div>

                            {/* Message Input */}
                            <div className="message-input-container">
                                <textarea placeholder="Type a message..." className="message-input"></textarea>
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
    );
};

export default Messages;
