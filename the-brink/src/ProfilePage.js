// src/ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import SidebarMenu from './SidebarMenu';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState({ name: '', phone: '', company: '' });

  // Helper to compute initials
  const getInitials = (fullName) => {
    const parts = fullName.trim().split(' ');
    const first = parts[0]?.charAt(0).toUpperCase() || '';
    const second = parts[1]?.charAt(0).toUpperCase() || '';
    return first + second;
  };

  useEffect(() => {
    if (!user?.email) {
      navigate('/login', { replace: true });
      return;
    }
    fetch(`/api/get-profile?email=${encodeURIComponent(user.email)}`)
      .then((res) => res.json())
      .then((data) => {
        const fullName = `${data.first_name} ${data.last_name}`;
        setProfile({ ...data, name: fullName });
        setEdited({
          name: fullName,
          phone: data.phone || '',
          company: data.company || '',
        });
      })
      .catch((err) => console.error('Error fetching profile:', err));
  }, [user, navigate]);

  if (!profile) return <div>Loading profile…</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    fetch('/api/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: profile.email,
        name: edited.name,
        phone: edited.phone,
        company: edited.company,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update');
        setProfile((prev) => ({ ...prev, ...edited }));
        setIsEditing(false);
      })
      .catch((err) => console.error('Error updating profile:', err));
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <SidebarMenu />

      <div className="main-content">
        <div className="profile-card">
          {/* initials avatar */}
          <div className="profile-avatar">
            {getInitials(profile.name)}
          </div>

          {isEditing ? (
            <div className="edit-form">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={edited.name}
                onChange={handleChange}
                className="edit-input"
              />
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={edited.phone}
                onChange={handleChange}
                className="edit-input"
              />
              <label>Company:</label>
              <input
                type="text"
                name="company"
                value={edited.company}
                onChange={handleChange}
                className="edit-input"
              />
              <div className="button-group">
                <button className="save-button" onClick={saveChanges}>
                  Save
                </button>
                <button className="cancel-button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-info">
              <p><strong>{profile.name}</strong></p>
              <p>{profile.company}</p>
              <p>{profile.email}</p>
              <p>{profile.phone}</p>
              <div className="button-group">
                <button className="edit-profile-button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
                <button className="signout-button" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

