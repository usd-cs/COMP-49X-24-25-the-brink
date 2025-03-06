import React, { useState } from 'react'
import './ProfilePage.css' // Ensure the CSS file is updated as well
import SidebarMenu from './SidebarMenu' // Ensure the SidebarMenu component is imported and updated

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
      name: 'First Last',
      company: 'Sample Company Name',
      email: 'sampleemail@sample.com',
      phone: '555.555.5555',
      profileImage: 'https://via.placeholder.com/150'

  });

  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;  // Extract name and value from event
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,  // Update specific field
    }));
  };

  const saveChanges = () => {
    setUser({ ...editedUser});
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setEditedUser({ ...user }); // Reset to original values
    setIsEditing(false);
  };

  return (
    <div className='profile-page'>
      <SidebarMenu />

      <div className='main-content'>
        <div className='profile-card'>
          <img
            src={user.profileImage}
            alt='Profile'
            className='profile-card-image'
          />
          {isEditing? (
            <div className = "edit-from">
              {/*label>Prifile Image URL:</label>
              <input
                  type="text"
                  name="profileImage"
                  value={editedUser.profileImage}
                  onChange={handleChange}
                  className="edit-input"
                */}
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
                className="edit-input"
              />
              <label>Company:</label>
              <input
                type="text"
                name="company"
                value={editedUser.company}
                onChange={handleChange}
                className="edit-input"
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="edit-input"
              />
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
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
          <div className='profile-info'>
            <p><strong>{user.name}</strong></p>
            <p>{user.company}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <button className='edit-profile-button' onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage
