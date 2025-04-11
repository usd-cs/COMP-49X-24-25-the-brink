import React from 'react';
import Sidebar from './SidebarMenu'; // Assuming it's in the same directory
import './UserAnnouncements.css';

const announcements = [
  {
    title: 'Announcement Title',
    sender: 'Who Sent it',
    text: 'Supporting line text of the announcement',
    date: 'xx/xx/xxxx',
  },
  {
    title: 'Announcement Title',
    sender: 'Who Sent it',
    text: 'Supporting line text of the announcement',
    date: 'xx/xx/xxxx',
  },
  {
    title: 'Announcement Title',
    sender: 'Who Sent it',
    text: 'Supporting line text of the announcement',
    date: 'xx/xx/xxxx',
  },
];

const UserAnnouncements = () => {
  return (
    <div className="announcements-container">
      <Sidebar />
      <div className="announcements-content">
        <h1 className="announcements-title">Announcements</h1>
        {announcements.map((a, i) => (
          <div className="announcement-card" key={i}>
            <div className="announcement-main">
              <div>
                <h2 className="announcement-heading">{a.title}</h2>
                <p className="announcement-sender">{a.sender}</p>
                <p className="announcement-text">{a.text}</p>
              </div>
              <p className="announcement-date">Date {a.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAnnouncements;
