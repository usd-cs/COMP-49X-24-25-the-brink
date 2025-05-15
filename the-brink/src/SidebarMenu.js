import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SidebarMenu.css';

const SidebarMenu = () => {
  const navigate = useNavigate();
  const stored = localStorage.getItem('user');
  const parsedUser = stored ? JSON.parse(stored) : {};
  const [profile, setProfile] = useState({
    firstName: parsedUser.firstName || '',
    lastName: parsedUser.lastName  || '',
    email:     parsedUser.email     || '',
    company:   '',
    phone:     '',
    profileImage: ''
  });
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Fetch extra profile fields
  useEffect(() => {
    if (!profile.email) return;
    fetch(`/api/get-profile?email=${encodeURIComponent(profile.email)}`)
      .then(res => res.json())
      .then(data => {
        const firstInitial = (data.first_name || 'D')[0].toUpperCase();
        const avatarUrl = `/avatars/${firstInitial}-Avatar.png`;
        setProfile(p => ({
          ...p,
          firstName:    data.first_name,
          lastName:     data.last_name,
          company:      data.company  || 'N/A',
          phone:        data.phone    || 'N/A',
          profileImage: avatarUrl
        }));
      })
      .catch(console.error);
  }, [profile.email]);

  // Close when clicking outside
  useEffect(() => {
    const onClickOutside = e => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  const role = parsedUser.role;
  const announcementsLink =
    role === 'admin' ? '/admin-announcements' : '/user-announcements';

  const initials = (
    (profile.firstName[0] || '').toUpperCase() +
    (profile.lastName[0]  || '').toUpperCase()
  );

  return (
    <div ref={menuRef}>
      <button
        className="menu-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        ☰ Menu
      </button>

      {open && (
        <div className="menu-panel">
          <div className="menu-header">
            <div className="profile-initials">{initials || '??'}</div>
            <p className="profile-name">{profile.firstName} {profile.lastName}</p>
            <p className="profile-company">{profile.company}</p>
          </div>
          <ul className="menu-links">
            <li><Link onClick={()=>setOpen(false)} to="/founder-status">Applications</Link></li>
            <li><Link onClick={()=>setOpen(false)} to="/resources">Resources</Link></li>
            <li><Link onClick={()=>setOpen(false)} to="/profile">Profile</Link></li>
            <li><Link onClick={()=>setOpen(false)} to="/messages">Messages</Link></li>
            <li><Link onClick={()=>setOpen(false)} to={announcementsLink}>Announcements</Link></li>
            <li><Link onClick={()=>setOpen(false)} to="/competitions">Competitions</Link></li>
            <li><Link onClick={()=>setOpen(false)} to="/dashboard">Dashboard</Link></li>
          </ul>
          <button className="signout-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;

