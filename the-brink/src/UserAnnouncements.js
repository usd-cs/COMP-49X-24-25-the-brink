// src/UserAnnouncements.js
import React, { useEffect, useState } from 'react';
import SidebarMenu from './SidebarMenu';
import './UserAnnouncements.css';

const UserAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [readIds, setReadIds] = useState([]);

  useEffect(() => {
    // pull user info from localStorage
    const stored = localStorage.getItem('user');
    if (!stored) return; // not logged in
    const { id, role } = JSON.parse(stored);

    // fetch with query params so our dev‑stub middleware populates req.user
    fetch(`/api/user/announcements?userId=${id}&role=${role}`)
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(({ announcements, readIds }) => {
        setAnnouncements(announcements || []);
        setReadIds(readIds || []);
      })
      .catch(err => {
        console.error('Error loading announcements:', err);
        setAnnouncements([]);
        setReadIds([]);
      });
  }, []);

  // mark as read
  const markRead = (annId) => {
    const stored = localStorage.getItem('user');
    if (!stored) return;
    const { id, role } = JSON.parse(stored);

    fetch(`/api/user/announcements/${annId}/read?userId=${id}&role=${role}`, {
      method: 'POST'
    })
      .then(() => {
        setReadIds(prev => prev.includes(annId) ? prev : [...prev, annId]);
      })
      .catch(err => console.error('Error marking read:', err));
  };

  return (
    <div className="announcements-container">
      <SidebarMenu />

      <div className="announcements-content">
        <h1 className="announcements-title">Announcements</h1>

        {announcements.length === 0 && (
          <p>No announcements available.</p>
        )}

        {announcements.map((a) => (
          <div
            key={a.id}
            className={`announcement-card ${readIds.includes(a.id) ? 'read' : ''}`}
          >
            <div className="announcement-main">
              <div>
                <h2 className="announcement-heading">{a.title}</h2>
                <p className="announcement-sender">From user #{a.created_by}</p>
                <p className="announcement-text">{a.message}</p>
              </div>
              <div>
                <p className="announcement-date">
                  {new Date(a.created_at).toLocaleString()}
                </p>
                {!readIds.includes(a.id) && (
                  <button onClick={() => markRead(a.id)}>Mark as read</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAnnouncements;


